"""Adım 4 — Eğitilmiş modeli Ollama'ya "kampusai" adıyla yükler.

1. LoRA adaptörü temel modelle birleştirilir.
2. Ollama'nın kendi içe aktarma özelliğiyle q4_K_M olarak sıkıştırılır (derleme gerekmez).
   Bu yol çalışmazsa Unsloth'un GGUF dışa aktarımı denenir.
3. Sohbet şablonu Ollama'daki resmi gemma4:e4b modelinden kopyalanır (yanlış şablon,
   eğitilmiş modellerin kötü yanıt vermesinin en sık nedenidir).
4. Kısa bir deneme sorusu sorulur.
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

from ortak import CIKTI, OllamaHatasi, ayarlar, baslat, log, model_hazirla, ollama_bosalt, ollama_istek, ollama_sohbet, sistem_istemi


def ollama_exe():
    yol = shutil.which("ollama")
    if yol:
        return yol
    aday = Path(os.environ.get("LOCALAPPDATA", "")) / "Programs" / "Ollama" / "ollama.exe"
    if aday.exists():
        return str(aday)
    raise SystemExit("ollama komutu bulunamadı. Ollama kurulu mu?")


def calistir(komut, cwd=None):
    log("$", " ".join(komut))
    r = subprocess.run(komut, cwd=cwd, text=True, encoding="utf-8", errors="replace")
    return r.returncode == 0


def sablon_satirlari(temel):
    """Resmi modelin Modelfile'ından FROM/LICENSE dışındaki yönergeleri (TEMPLATE, PARAMETER, RENDERER, PARSER) alır."""
    mf = ollama_istek("/api/show", {"model": temel}).get("modelfile", "")
    satirlar, icinde, blok = [], False, []
    for s in mf.splitlines():
        if icinde:
            blok.append(s)
            if s.rstrip().endswith('"""'):
                satirlar.append("\n".join(blok))
                icinde, blok = False, []
            continue
        kelime = s.split(" ", 1)[0].upper()
        if kelime in ("TEMPLATE", "PARAMETER", "RENDERER", "PARSER"):
            if s.count('"""') == 1:
                icinde, blok = True, [s]
            else:
                satirlar.append(s)
    return satirlar


def modelfile_yaz(klasor, kaynak, satirlar):
    metin = f"FROM {kaynak}\n" + "\n".join(satirlar) + "\n"
    (Path(klasor) / "Modelfile").write_text(metin, encoding="utf-8")
    return Path(klasor) / "Modelfile"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ara-dosyalari-tut", action="store_true", help="birleştirilmiş 16-bit modeli silme")
    arg = p.parse_args()
    baslat("adim4_ollama")
    a = ayarlar()
    lora = CIKTI / "lora"
    if not (lora / "adapter_config.json").exists():
        raise SystemExit("cikti/lora yok. Önce adım 3'ü (eğitim) tamamlayın.")
    ad, temel = a["ollama_model_adi"], a["temel_ollama_model"]
    exe = ollama_exe()

    model_hazirla(temel)
    satirlar = sablon_satirlari(temel)
    log(f"Şablon yönergeleri {temel} modelinden alındı ({len(satirlar)} satır).")

    ollama_bosalt()
    from unsloth import FastModel
    model, tokenizer = FastModel.from_pretrained(str(lora), max_seq_length=int(a["max_uzunluk"]), load_in_4bit=True)

    basarili = False
    birlesik = CIKTI / "birlesik"
    try:
        log("Model birleştiriliyor (16-bit; birkaç dakika, 12B için ~25 GB geçici disk)...")
        model.save_pretrained_merged(str(birlesik), tokenizer, save_method="merged_16bit")
        mf = modelfile_yaz(birlesik, ".", satirlar)
        basarili = calistir([exe, "create", ad, "-q", a["nicemleme"], "-f", str(mf)], cwd=str(birlesik))
        if not basarili:
            log("Ollama doğrudan içe aktaramadı; GGUF yolu deneniyor.")
    except Exception as e:
        log("Birleştirme/İçe aktarma hatası:", repr(e), "→ GGUF yolu deneniyor.")

    if not basarili:
        gguf = CIKTI / "gguf"
        model.save_pretrained_gguf(str(gguf), tokenizer, quantization_method=a["nicemleme"].lower())
        dosyalar = sorted([f for f in gguf.rglob("*.gguf") if "mmproj" not in f.name.lower()], key=lambda f: f.stat().st_size)
        if not dosyalar:
            raise SystemExit("GGUF dosyası üretilemedi.")
        mf = modelfile_yaz(dosyalar[-1].parent, "./" + dosyalar[-1].name, satirlar)
        basarili = calistir([exe, "create", ad, "-f", str(mf)], cwd=str(dosyalar[-1].parent))
        if not basarili:
            raise SystemExit("Ollama'ya yüklenemedi. Yukarıdaki hata mesajını Claude'a gönderin.")

    if not arg.ara_dosyalari_tut:
        shutil.rmtree(birlesik, ignore_errors=True)

    log(f"'{ad}' Ollama'ya yüklendi. Deneme sorusu soruluyor...")
    try:
        yanit, ist = ollama_sohbet(ad, [{"role": "system", "content": sistem_istemi()},
                                        {"role": "user", "content": "$2x + 3 = 11$ ise $x$ kaçtır?"}], sicaklik=0.2, max_token=400)
        print("\n----- kampusai yanıtı -----\n" + yanit + "\n---------------------------\n")
        hiz = ist["token"] / ist["sure"] if ist["sure"] else 0
        log(f"Hız: {hiz:.0f} token/sn. Doğru sonuç (4) yanıtta {'VAR' if re.search(r'(?<![0-9])4(?![0-9])', yanit) else 'YOK — kontrol edin'}.")
        bilgi = ollama_istek("/api/show", {"model": ad})
        log("Yetenekler:", ", ".join(bilgi.get("capabilities", [])) or "bilinmiyor")
    except OllamaHatasi as e:
        log("Deneme sorusu başarısız:", e)
    goz = a.get("goz_model")
    if goz:
        try:
            model_hazirla(goz)
            log(f"Fotoğraf okuma (göz) modeli hazır: {goz}. Uygulama yüklü görünce otomatik kullanır.")
        except SystemExit as e:
            log("Göz modeli indirilemedi (önemli değil, eski göz modeli kullanılır):", e)
    log("Uygulama 'kampusai' modelini yüklü görünce otomatik kullanır (Ayarlar → Yapay zeka).")


if __name__ == "__main__":
    sys.exit(main())
