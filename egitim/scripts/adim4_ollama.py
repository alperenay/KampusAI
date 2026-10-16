"""Adım 4 — Eğitilmiş modeli paketler.

1. LoRA adaptörü temel modelle birleştirilir.
2. Bu bilgisayardaki Ollama'ya "kampusai" adıyla yüklenir (sohbet şablonu resmi gemma4 modelinden
   kopyalanır; yanlış şablon, eğitilmiş modellerin kötü yanıt vermesinin en sık nedenidir).
3. Herkese dağıtılacak paket hazırlanır (dagitim/ klasörü): llama.cpp ile çalışan sıkıştırılmış GGUF
   model + fotoğraf/ses projektörü (mmproj) + sürüm ve sağlama bilgisi (manifest). Telefon ve
   bilgisayar uygulaması bu dosyaları indirip internetsiz çalıştırır.
4. Kısa bir deneme sorusu sorulur.
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.request
import zipfile
from pathlib import Path

from ortak import CIKTI, DAGITIM, KIT, OllamaHatasi, ayarlar, baslat, log, model_hazirla, model_yukle, ollama_ac, ollama_bosalt, ollama_istek, ollama_sohbet, sistem_istemi


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


def indir(url, hedef):
    req = urllib.request.Request(url, headers={"User-Agent": "KampusAI-Egitim/1.0"})
    with urllib.request.urlopen(req, timeout=600) as r, open(hedef, "wb") as f:
        shutil.copyfileobj(r, f, 1 << 20)


def llamacpp_hazirla():
    """llama.cpp'nin hazır Windows sürümünü (derleme gerekmez) ve dönüştürme betiğini indirir."""
    kok = KIT / "araclar" / "llama.cpp"
    isaret = kok / "hazir.txt"
    if isaret.exists():
        return kok
    shutil.rmtree(kok, ignore_errors=True)
    kok.mkdir(parents=True)
    req = urllib.request.Request("https://api.github.com/repos/ggml-org/llama.cpp/releases/latest",
                                 headers={"User-Agent": "KampusAI-Egitim/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        surum = json.loads(r.read().decode("utf-8"))
    etiket_ad = surum["tag_name"]
    varliklar = surum.get("assets", [])
    paket = (next((v for v in varliklar if re.search(r"bin-win-cpu-x64\.zip$", v["name"])), None)
             or next((v for v in varliklar if re.search(r"win.*x64.*\.zip$", v["name"]) and "cuda" not in v["name"].lower()), None))
    if not paket:
        raise RuntimeError("llama.cpp Windows paketi bulunamadı")
    log(f"llama.cpp {etiket_ad} indiriliyor ({paket['name']})...")
    indir(paket["browser_download_url"], kok / "bin.zip")
    zipfile.ZipFile(kok / "bin.zip").extractall(kok / "bin")
    indir(f"https://github.com/ggml-org/llama.cpp/archive/refs/tags/{etiket_ad}.zip", kok / "src.zip")
    zipfile.ZipFile(kok / "src.zip").extractall(kok / "src")
    isaret.write_text(etiket_ad, encoding="utf-8")
    return kok


def gguf_llamacpp(birlesik, hedef, nicem):
    """Birleştirilmiş modeli llama.cpp ile GGUF'a çevirir ve sıkıştırır. Dönen: (model, mmproj|None)"""
    kok = llamacpp_hazirla()
    betik = next(kok.joinpath("src").rglob("convert_hf_to_gguf.py"))
    quantize = next((f for f in kok.joinpath("bin").rglob("*") if f.name.lower() in ("llama-quantize.exe", "llama-quantize")), None)
    if not quantize:
        raise RuntimeError("llama-quantize bulunamadı")
    hedef.mkdir(parents=True, exist_ok=True)
    f16 = hedef / "model-f16.gguf"
    if not calistir([sys.executable, str(betik), str(birlesik), "--outfile", str(f16), "--outtype", "f16"]):
        raise RuntimeError("convert_hf_to_gguf başarısız")
    cikti = hedef / f"model-{nicem}.gguf"
    if not calistir([str(quantize), str(f16), str(cikti), nicem.upper()]):
        raise RuntimeError("llama-quantize başarısız")
    f16.unlink(missing_ok=True)
    mmproj = hedef / "mmproj-f16.gguf"
    if not calistir([sys.executable, str(betik), str(birlesik), "--mmproj", "--outfile", str(mmproj), "--outtype", "f16"]):
        log("Görsel/ses projektörü (mmproj) dönüştürülemedi; hazır olanı indirilecek.")
        mmproj = None
    return cikti, mmproj


def mmproj_indir(kaynak, hedef):
    """Eğitimde görsel/ses katmanlarına dokunmadığımız için temel modelin projektörü uyumludur."""
    from huggingface_hub import HfApi, hf_hub_download
    adlar = [f for f in HfApi().list_repo_files(kaynak) if "mmproj" in f.lower() and f.endswith(".gguf")]
    if not adlar:
        raise RuntimeError(f"{kaynak} içinde mmproj yok")
    oncelik = lambda f: 0 if re.search(r"(?<!b)f16", f.lower()) else 1 if "bf16" in f.lower() else 2
    secim = sorted(adlar, key=lambda f: (oncelik(f), f))[0]
    yol = hf_hub_download(kaynak, secim)
    shutil.copyfile(yol, hedef)
    return hedef


def sha256(yol):
    h = hashlib.sha256()
    with open(yol, "rb") as f:
        for parca in iter(lambda: f.read(1 << 20), b""):
            h.update(parca)
    return h.hexdigest()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ara-dosyalari-tut", action="store_true", help="birleştirilmiş 16-bit modeli silme")
    arg = p.parse_args()
    baslat("adim4_ollama")
    a = ayarlar()
    ollama_ac()
    lora = CIKTI / "lora"
    if not (lora / "adapter_config.json").exists():
        raise SystemExit(f"{lora} yok. Önce adım 3'ü (eğitim) tamamlayın.")
    ad, temel = a["ollama_model_adi"], a["temel_ollama_model"]
    nicem = a["nicemleme"]
    exe = ollama_exe()

    model_hazirla(temel)
    satirlar = sablon_satirlari(temel)
    log(f"Şablon yönergeleri {temel} modelinden alındı ({len(satirlar)} satır).")

    ollama_bosalt()
    from unsloth import FastModel
    model, tokenizer = model_yukle(FastModel, model_name=str(lora), max_seq_length=int(a["max_uzunluk"]), load_in_4bit=True)

    # 1) Birleştir
    birlesik = CIKTI / "birlesik"
    birlesti = False
    try:
        log("Model birleştiriliyor (16-bit; birkaç dakika ve 15-25 GB geçici disk)...")
        model.save_pretrained_merged(str(birlesik), tokenizer, save_method="merged_16bit")
        birlesti = True
    except Exception as e:
        log("Birleştirme hatası:", repr(e)[:300])

    # 2) Bilgisayardaki Ollama için
    ollama_tamam = False
    if birlesti:
        mf = modelfile_yaz(birlesik, ".", satirlar)
        ollama_tamam = calistir([exe, "create", ad, "-q", nicem, "-f", str(mf)], cwd=str(birlesik))
        if not ollama_tamam:
            log("Ollama doğrudan içe aktaramadı; GGUF dosyasından yüklenecek.")

    # 3) Herkese dağıtılacak GGUF (telefon ve bilgisayar uygulaması llama.cpp ile çalıştırır)
    gguf_klasor = CIKTI / "gguf"
    model_gguf, mmproj = None, None
    if birlesti:
        try:
            model_gguf, mmproj = gguf_llamacpp(birlesik, gguf_klasor, nicem)
        except Exception as e:
            log("llama.cpp ile dönüştürme olmadı:", repr(e)[:300], "→ Unsloth ile deneniyor.")
    if not model_gguf:
        model.save_pretrained_gguf(str(gguf_klasor), tokenizer, quantization_method=nicem.lower())
        dosyalar = sorted([f for f in gguf_klasor.rglob("*.gguf") if "mmproj" not in f.name.lower()], key=lambda f: f.stat().st_size)
        if not dosyalar:
            raise SystemExit("GGUF dosyası üretilemedi. Yukarıdaki hata mesajını Claude'a gönderin.")
        model_gguf = dosyalar[-1]
        mmproj = next((f for f in gguf_klasor.rglob("*.gguf") if "mmproj" in f.name.lower()), None)

    if not ollama_tamam:
        mf = modelfile_yaz(model_gguf.parent, "./" + model_gguf.name, satirlar)
        if not calistir([exe, "create", ad, "-f", str(mf)], cwd=str(model_gguf.parent)):
            raise SystemExit("Ollama'ya yüklenemedi. Yukarıdaki hata mesajını Claude'a gönderin.")

    # 4) Dağıtım paketi: model + projektör + manifest
    DAGITIM.mkdir(parents=True, exist_ok=True)
    dag_ad = a["dagitim_adi"]
    hedef_model = DAGITIM / f"{dag_ad}-{nicem}.gguf"
    shutil.move(str(model_gguf), hedef_model)
    hedef_mmproj = None
    if a.get("mmproj_kaynak"):
        hedef_mmproj = DAGITIM / f"{dag_ad}-mmproj.gguf"
        try:
            if mmproj and Path(mmproj).exists():
                shutil.move(str(mmproj), hedef_mmproj)
            else:
                mmproj_indir(a["mmproj_kaynak"], hedef_mmproj)
        except Exception as e:
            log("Projektör (mmproj) hazırlanamadı; model yalnızca metinle çalışır:", repr(e)[:200])
            hedef_mmproj = None
    manifest = {
        "ad": dag_ad,
        "surum": time.strftime("%Y.%m.%d"),
        "temel_model": a["temel_model"],
        "nicemleme": nicem,
        "sohbet_sablonu": "gemma-4",
        "dosyalar": [{"tur": t, "ad": f.name, "boyut": f.stat().st_size, "sha256": sha256(f)}
                     for t, f in (("model", hedef_model), ("mmproj", hedef_mmproj)) if f],
    }
    (DAGITIM / f"{dag_ad}.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    boyut = sum(d["boyut"] for d in manifest["dosyalar"]) / 2**30
    log(f"Dağıtım paketi hazır: {DAGITIM}  ({boyut:.1f} GB; {', '.join(d['ad'] for d in manifest['dosyalar'])})")

    if not arg.ara_dosyalari_tut:
        shutil.rmtree(birlesik, ignore_errors=True)
        shutil.rmtree(gguf_klasor, ignore_errors=True)

    # 5) Deneme
    log(f"'{ad}' Ollama'ya yüklendi. Deneme sorusu soruluyor...")
    try:
        yanit, ist = ollama_sohbet(ad, [{"role": "system", "content": sistem_istemi()},
                                        {"role": "user", "content": "$2x + 3 = 11$ ise $x$ kaçtır?"}], sicaklik=0.2, max_token=400)
        print("\n----- " + ad + " yanıtı -----\n" + yanit + "\n---------------------------\n")
        hiz = ist["token"] / ist["sure"] if ist["sure"] else 0
        log(f"Hız: {hiz:.0f} token/sn. Doğru sonuç (4) yanıtta {'VAR' if re.search(r'(?<![0-9])4(?![0-9])', yanit) else 'YOK — kontrol edin'}.")
        bilgi = ollama_istek("/api/show", {"model": ad})
        log("Ollama'daki yetenekler:", ", ".join(bilgi.get("capabilities", [])) or "bilinmiyor")
    except OllamaHatasi as e:
        log("Deneme sorusu başarısız:", e)
    goz = a.get("goz_model")
    if goz:
        try:
            model_hazirla(goz)
            log(f"Fotoğraf okuma (göz) modeli hazır: {goz}.")
        except SystemExit as e:
            log("Göz modeli indirilemedi (önemli değil, eski göz modeli kullanılır):", e)
    log(f"Uygulama '{ad}' modelini bu bilgisayarda yüklü görünce otomatik kullanır. "
        "Herkese dağıtmak için menüden 'Yayınla'yı çalıştırın.")


if __name__ == "__main__":
    sys.exit(main())
