"""Adım 2b — Öz-damıtma (v2 eğitim verisi).

İlk eğitimde (v1) cevapları küçük öğretmen model (qwen3.5:9b) yazmıştı; cevaplar kısa olduğu için eğitilen
model adım adım düşünmeyi bıraktı ve eğitilmemiş Gemma'nın gerisinde kaldı (test: %84 / %89).

v2'de aynı sorulara cevabı eğitilecek modelin kendisi (gemma4:e4b) yazar:
  - test soruları   : Gemma uygulamanın gerçek istemiyle adım adım çözer; YALNIZCA doğru şıkkı bulduysa alınır
  - kavram soruları : Gemma'nın cevabı alınır (yarım kalan ya da çok kısa olanlar atılır)
  - deneme analizi  : öğrenci verisinde olmayan sayı uyduran cevaplar atılır
  - sokratik, tohum : v1'deki gibi kalır (biçimi öğretmek için)
Böylece model kendi düşünme gücünü kaybetmeden müfredatı, YKS tarzını ve uygulamanın biçimini öğrenir.

Girdi : veri/egitim.jsonl (v1)          Çıktı : veri/egitim_v2.jsonl, veri/istatistik_v2.json
Kesilirse kaldığı yerden devam eder (veri/v2_uretilen.jsonl).
"""
import json
import random
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

from ortak import VERI, ayarlar, baslat, cevap_harfi, jsonl_ekle, jsonl_oku, jsonl_yaz, log, model_hazirla, ollama_sohbet

MAX_TOKEN = 1200
TEST_TURLERI = {"test", "test_baglam", "test_foto"}
YENIDEN = TEST_TURLERI | {"kavram", "kavram_baglam", "analiz"}


def sayilar_veride_mi(yanit, veri):
    """Yanıttaki ondalıklı sayılar ve 'X net' ifadeleri veride geçiyor mu? (adim2'deki filtreyle aynı)"""
    from adim2_veri_uret import sayilar_veride_mi as f
    return f(yanit, veri)


def uret(model, i, kayit):
    mesajlar = kayit["messages"]
    girdi = [m for m in mesajlar if m["role"] != "assistant"]
    if girdi[-1]["role"] != "user":
        return {"i": i, "durum": "atla"}
    tur = kayit["tur"]
    dogru = cevap_harfi(mesajlar[-1]["content"]) if tur in TEST_TURLERI else None
    if tur in TEST_TURLERI and not dogru:
        return {"i": i, "durum": "harf_yok"}
    toplam = 0
    for deneme, sicaklik in enumerate((0.3, 0.7)):
        metin, ist = ollama_sohbet(model, girdi, sicaklik=sicaklik, max_token=MAX_TOKEN)
        toplam += ist.get("token", 0)
        if ist.get("token", 0) >= MAX_TOKEN - 5 or len(metin) < 60:
            durum = "yarim"
            continue
        if tur in TEST_TURLERI:
            harf = cevap_harfi(metin)
            if harf != dogru:
                durum = "yanlis"
                continue
            if not re.search(r"do[ğg]ru\s*(cevap|yan[ıi]t)", metin, flags=re.I):
                metin = metin.rstrip() + f"\n\n**Doğru cevap: {dogru}**"
        if tur == "analiz":
            sistem = next((m["content"] for m in mesajlar if m["role"] == "system"), "")
            temiz, _ = sayilar_veride_mi(metin, sistem + "\n" + girdi[-1]["content"])
            if not temiz:
                durum = "uydurma_sayi"
                continue
        return {"i": i, "durum": "tamam", "metin": metin, "token": toplam}
    return {"i": i, "durum": durum, "token": toplam}


def main():
    baslat("adim2b_ozdamitma")
    a = ayarlar()
    model = a.get("ozdamitma_modeli") or a["temel_ollama_model"]
    v1 = jsonl_oku(VERI / "egitim.jsonl")
    if not v1:
        raise SystemExit("veri/egitim.jsonl yok. Önce veri üretimini (adım 3) çalıştırın.")
    model_hazirla(model)
    kayit_yolu = VERI / "v2_uretilen.jsonl"
    biten = {r["i"]: r for r in jsonl_oku(kayit_yolu)}
    isler = [(i, k) for i, k in enumerate(v1) if k.get("tur") in YENIDEN and i not in biten]
    log(f"Öz-damıtma: {model} {len(isler)} örneğe kendi cevabını yazacak (önceden biten {len(biten)}).")
    bas, n, tok = time.time(), 0, 0
    with ThreadPoolExecutor(max_workers=int(a.get("paralel_istek", 4))) as havuz:
        isler_f = [havuz.submit(uret, model, i, k) for i, k in isler]
        for f in as_completed(isler_f):
            try:
                r = f.result()
            except Exception as e:
                log("  hata:", repr(e)[:200])
                continue
            jsonl_ekle(kayit_yolu, r)
            biten[r["i"]] = r
            n += 1
            tok += r.get("token", 0)
            if n % 50 == 0 or n == len(isler):
                gecen = time.time() - bas
                log(f"  {n}/{len(isler)}  ~{tok / max(gecen, 1):.0f} token/sn  kalan ~{(len(isler) - n) * gecen / n / 60:.0f} dk")

    yeni, say, atilan = [], {}, {}
    for i, k in enumerate(v1):
        tur = k.get("tur")
        if tur in YENIDEN:
            r = biten.get(i)
            if not r or r["durum"] != "tamam":
                atilan[r["durum"] if r else "uretilmedi"] = atilan.get(r["durum"] if r else "uretilmedi", 0) + 1
                continue
            mesajlar = [m for m in k["messages"] if m["role"] != "assistant"] + [{"role": "assistant", "content": r["metin"]}]
            yeni.append({"tur": tur, "messages": mesajlar})
        else:
            yeni.append(k)
        say[tur] = say.get(tur, 0) + 1
    random.Random(3407).shuffle(yeni)
    jsonl_yaz(VERI / "egitim_v2.jsonl", yeni)
    ist = {"egitim_ornegi": len(yeni), "tur": say, "atilan": atilan, "model": model}
    (VERI / "istatistik_v2.json").write_text(json.dumps(ist, ensure_ascii=False, indent=1), encoding="utf-8")
    log("v2 verisi hazır:", json.dumps(ist, ensure_ascii=False))
    if len(yeni) < 1500:
        raise SystemExit("v2 verisi çok az çıktı; eğitime geçilmedi. Günlüğü Claude'a gösterin.")


if __name__ == "__main__":
    sys.exit(main())
