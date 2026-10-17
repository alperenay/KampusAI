"""Adım 6 — Modeli herkesin indirebileceği yerlere yükler (yalnızca siz çalıştırınca).

1. Hugging Face (ücretsiz, herkese açık): dagitim/ klasöründeki GGUF model + projektör + manifest.
   Telefon ve bilgisayar uygulaması modeli buradan indirir.
   Gerekenler: huggingface.co hesabı ve "Write" yetkili bir erişim anahtarı (Settings → Access Tokens).
   Anahtar ilk çalıştırmada sorulur ve egitim\\hf_anahtari.txt dosyasına kaydedilir (GitHub'a gitmez).
2. ollama.com (isteğe bağlı): güçlü bilgisayarı olan kullanıcılar "ollama pull <kullanıcı>/kampusai"
   ile indirebilir. Gerekenler: ollama.com hesabı, bu bilgisayarda "ollama signin" ve ayarlar.json →
   "ollama_kullanici".

Kullanım:  python adim6_yayinla.py            [--sadece-hf | --sadece-ollama]
"""
import argparse
import json
import subprocess
import sys

from adim4_ollama import ollama_exe
from ortak import DAGITIM, KIT, ayarlar, baslat, log

KART = """---
license: apache-2.0
base_model: {temel}
language:
- tr
tags:
- gemma4
- education
- yks
- gguf
---

# KampüsAI

Lise öğrencileri ve YKS (TYT-AYT) hazırlığı için Türkçe yapay zeka öğretmeni. KampüsAI uygulamasının
cihaz üzerinde (internetsiz) çalışan modelidir.

- **Temel model:** [{temel_hf}](https://huggingface.co/{temel_hf}) (Apache 2.0)
- **Yöntem:** 9-12. sınıf müfredatından üretilen ve doğrulanan Türkçe soru-çözüm, konu anlatımı, öğretmen
  modu ve deneme analizi verisiyle QLoRA ince ayarı. Görsel/ses katmanları değiştirilmedi.
- **Çalıştırma:** llama.cpp uyumlu GGUF. Fotoğraf ve ses için `*-mmproj.gguf` dosyasıyla birlikte kullanın.

## Dosyalar

{dosyalar}

## Sınırlamalar

Model hata yapabilir; özellikle uzun hesaplarda çözümü kontrol edin. Sınav ve not kararları için tek
kaynak olarak kullanmayın.
"""


def hf_anahtari():
    yol = KIT / "hf_anahtari.txt"
    if yol.exists() and yol.read_text(encoding="utf-8").strip():
        return yol.read_text(encoding="utf-8").strip()
    print("\nHugging Face erişim anahtarı gerekiyor (huggingface.co → Settings → Access Tokens → "
          "New token, türü: Write).")
    anahtar = input("Anahtarı yapıştırın (boş bırakırsanız Hugging Face adımı atlanır): ").strip()
    if anahtar:
        yol.write_text(anahtar, encoding="utf-8")
    return anahtar


def hf_yukle(a):
    manifestler = sorted(DAGITIM.glob("*.json"))
    if not manifestler:
        raise SystemExit("dagitim/ boş. Önce 5) Ollama'ya yükle adımını çalıştırın.")
    anahtar = hf_anahtari()
    if not anahtar:
        log("Hugging Face atlandı.")
        return
    from huggingface_hub import HfApi
    api = HfApi(token=anahtar)
    kullanici = api.whoami()["name"]
    depo = a.get("hf_depo") or f"{kullanici}/kampusai"
    api.create_repo(depo, repo_type="model", exist_ok=True, private=False)
    satir, temel = [], a["temel_model"]
    for m in manifestler:
        bilgi = json.loads(m.read_text(encoding="utf-8"))
        temel = bilgi.get("temel_model", temel)
        for d in bilgi["dosyalar"]:
            satir.append(f"| `{d['ad']}` | {d['tur']} | {d['boyut'] / 2**30:.2f} GB | sürüm {bilgi['surum']} |")
    temel_hf = temel.replace("unsloth/", "google/")
    kart = KART.format(temel=temel_hf, temel_hf=temel_hf,
                       dosyalar="| Dosya | Tür | Boyut | Sürüm |\n|---|---|---|---|\n" + "\n".join(satir))
    (DAGITIM / "README.md").write_text(kart, encoding="utf-8")
    log(f"Hugging Face'e yükleniyor: {depo} (birkaç GB, internet hızına bağlı)...")
    api.upload_folder(folder_path=str(DAGITIM), repo_id=depo, repo_type="model",
                      allow_patterns=["*.gguf", "*.json", "README.md"],
                      commit_message="KampüsAI modeli güncellendi")
    log(f"✓ Yayında: https://huggingface.co/{depo}")
    for m in manifestler:
        for d in json.loads(m.read_text(encoding="utf-8"))["dosyalar"]:
            log(f"  indirme adresi: https://huggingface.co/{depo}/resolve/main/{d['ad']}")
    (KIT / "yayin.json").write_text(json.dumps({"hf_depo": depo}, ensure_ascii=False, indent=1), encoding="utf-8")


def ollama_yukle(a):
    kullanici = (a.get("ollama_kullanici") or "").strip()
    if not kullanici:
        log("ollama.com atlandı (ayarlar.json → \"ollama_kullanici\" boş). İsteğe bağlıdır.")
        return
    ad = a["ollama_model_adi"]
    hedef = f"{kullanici}/{ad}"
    exe = ollama_exe()
    for komut in ([exe, "cp", ad, hedef], [exe, "push", hedef]):
        log("$", " ".join(komut))
        if subprocess.run(komut).returncode != 0:
            log("ollama.com'a yüklenemedi. Bu bilgisayarda 'ollama signin' yaptınız mı?")
            return
    log(f"✓ Yayında: https://ollama.com/{hedef}  (kurulum: ollama pull {hedef})")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--sadece-hf", action="store_true")
    p.add_argument("--sadece-ollama", action="store_true")
    arg = p.parse_args()
    baslat("adim6_yayinla")
    a = ayarlar()
    if not arg.sadece_ollama:
        hf_yukle(a)
    if not arg.sadece_hf:
        ollama_yukle(a)


if __name__ == "__main__":
    sys.exit(main())
