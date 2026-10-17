"""Gerçek YKS sorularıyla model testi (sorular: yks_ayikla.py → veri/yks/sorular.jsonl).

Şekilli sorular (grafik, tablo, şekil, altı çizili ifade) modele FOTOĞRAF olarak, diğerleri yazı olarak sorulur.
Puanlama ÖSYM gibi: net = doğru − yanlış / 4. Şık okunamayan cevap boş sayılır.

Modeller:
  ollama:<ad>   bu bilgisayardaki Ollama modeli (ör. ollama:gemma4:e4b)
  bulut:<ad>    KampüsAI sunucusu üzerinden Google modeli (ör. bulut:gemini-3.5-flash-lite, bulut:gemma-4-26b-a4b-it)

Kullanım:
  python yks_test.py                                  # varsayılan: gemma4:e4b tüm yıllar + bulut modelleri 2026
  python yks_test.py --model ollama:gemma4:e4b --yil 2026
Kesilirse kaldığı yerden devam eder (rapor/yks_cevaplar/). Sonuç: rapor/yks_raporu.md
"""
import argparse
import base64
import json
import re
import time
import urllib.error
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

from ortak import RAPOR, VERI, ayarlar, baslat, cevap_harfi, jsonl_ekle, jsonl_oku, log, model_hazirla, ollama_ac

SUNUCU = "https://ders-asistani.alperenayleon-67a.workers.dev/v1beta"
SISTEM = ("Sen KampüsAI'sın: Türkiye'de YKS'ye hazırlanan lise öğrencilerine yardım eden bir öğretmensin. "
          "Soruyu dikkatle, adım adım çöz. Cevabının en sonunda doğru şıkkı tam olarak şu biçimde yaz: "
          "**Doğru cevap: X**")
BOLUM_ADI = {"TÜR": "TYT Türkçe", "SOS": "TYT Sosyal", "TEM": "TYT Temel Matematik", "FEN": "TYT Fen",
             "TDE-SB1": "AYT Edebiyat-Sosyal-1", "SB2": "AYT Sosyal-2", "MAT": "AYT Matematik"}
# Süre için yalnızca en yeni sınav (2026 TYT + AYT, 291 soru); tüm modeller aynı sorularda karşılaştırılır.
# Diğer yıllar için: python yks_test.py --model ollama:gemma4:e4b --yil 2024
VARSAYILAN = [("ollama:gemma4:e4b", 2026), ("bulut:gemini-otomatik-hizli", 2026), ("bulut:gemma-4-26b-a4b-it", 2026)]


def istek(url, govde, zaman_asimi=300):
    req = urllib.request.Request(url, data=json.dumps(govde).encode("utf-8"), method="POST",
                                 headers={"Content-Type": "application/json", "X-DA-App": "yks-test"})
    with urllib.request.urlopen(req, timeout=zaman_asimi) as r:
        return json.loads(r.read().decode("utf-8"))


def soru_metni(s):
    if s["gorsel"]:
        return "Fotoğraftaki soruyu çöz."
    return s["metin"]


def sor_ollama(model, s, adres):
    mesaj = {"role": "user", "content": soru_metni(s)}
    if s["gorsel"]:
        mesaj["images"] = [base64.b64encode((VERI / "yks" / s["gorsel"]).read_bytes()).decode()]
    t0 = time.time()
    r = istek(adres.rstrip("/") + "/api/chat", {"model": model, "stream": False, "keep_alive": "30m",
                                                "messages": [{"role": "system", "content": SISTEM}, mesaj],
                                                "options": {"temperature": 0.2, "num_ctx": 8192, "num_predict": 3000}})
    return (r.get("message") or {}).get("content", ""), time.time() - t0, r.get("eval_count", 0)


_son_bulut = [0.0]


def sor_bulut(model, s):
    parcalar = []
    if s["gorsel"]:
        parcalar.append({"inlineData": {"mimeType": "image/png",
                                        "data": base64.b64encode((VERI / "yks" / s["gorsel"]).read_bytes()).decode()}})
    parcalar.append({"text": soru_metni(s)})
    govde = {"contents": [{"role": "user", "parts": parcalar}], "systemInstruction": {"parts": [{"text": SISTEM}]},
             "generationConfig": {"temperature": 0.2}}
    if "flash" in model and "lite" not in model:
        govde["generationConfig"]["thinkingConfig"] = {"thinkingLevel": "low"}   # uygulamadaki ayarın aynısı
    for deneme in range(6):
        bekle = 5.5 - (time.time() - _son_bulut[0])            # sunucu sınırı: dakikada 12 istek
        if bekle > 0:
            time.sleep(bekle)
        _son_bulut[0] = time.time()
        t0 = time.time()
        try:
            r = istek(f"{SUNUCU}/models/{model}:generateContent", govde)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 503) and deneme < 5:
                time.sleep(20 * (deneme + 1))
                continue
            raise
        parts = (((r.get("candidates") or [{}])[0].get("content") or {}).get("parts")) or []
        metin = "".join(p.get("text", "") for p in parts if not p.get("thought"))
        return metin, time.time() - t0, (r.get("usageMetadata") or {}).get("candidatesTokenCount", 0)
    raise RuntimeError("bulut yanıt vermedi")


def gemini_sec(hiz):
    """Uygulamanın otomatik seçtiği modeli bul (hızlı: Flash-Lite, akıllı: Flash)."""
    with urllib.request.urlopen(SUNUCU + "/models", timeout=30) as r:
        adlar = [m["name"].replace("models/", "") for m in json.loads(r.read()).get("models", [])]
    ver = lambda n: float((re.search(r"gemini-(\d+(?:\.\d+)?)", n) or [0, 0])[1])
    aday = [n for n in adlar if re.match(r"^gemini-[\d.]+-flash", n) and not re.search(r"preview|exp|tts|image|live", n)]
    aday = [n for n in aday if ("lite" in n) == (hiz == "hizli")]
    return max(aday, key=ver) if aday else None


def calistir(model_ad, sorular, paralel):
    tur, ad = model_ad.split(":", 1)
    if tur == "bulut" and ad.startswith("gemini-otomatik"):
        ad = gemini_sec("hizli" if ad.endswith("hizli") else "akilli")
        if not ad:
            log("Sunucuda uygun Gemini modeli bulunamadı; atlandı.")
            return None
        model_ad = "bulut:" + ad
    if tur == "bulut":
        with urllib.request.urlopen(SUNUCU + "/models", timeout=30) as r:
            izinli = {m["name"].replace("models/", "") for m in json.loads(r.read()).get("models", [])}
        if ad not in izinli:
            log(f"{ad} KampüsAI sunucusunda henüz açık değil (güncelleme yayınlanınca açılır); atlandı.")
            return None
    dosya = RAPOR / "yks_cevaplar" / (re.sub(r"[^\w.-]+", "_", model_ad) + ".jsonl")
    dosya.parent.mkdir(parents=True, exist_ok=True)
    biten = {r["id"] for r in jsonl_oku(dosya)}
    kalan = [s for s in sorular if s["id"] not in biten]
    log(f"=== {model_ad}: {len(sorular)} soru (önceden {len(sorular) - len(kalan)} yanıt var)")
    a = ayarlar()
    if tur == "ollama":
        ollama_ac()
        model_hazirla(ad)

    def tek(s):
        try:
            if tur == "ollama":
                yanit, sure, tok = sor_ollama(ad, s, a["ollama_adres"])
            else:
                yanit, sure, tok = sor_bulut(ad, s)
        except Exception as e:
            yanit, sure, tok = "", 0, 0
            log(f"  {s['id']}: hata {repr(e)[:150]}")
        harf = cevap_harfi(yanit)
        return {"id": s["id"], "harf": harf, "cevap": s["cevap"], "dogru": harf == s["cevap"], "sure": round(sure, 1),
                "token": tok, "gorsel": bool(s["gorsel"]), "yanit": yanit[-1500:]}

    bas = time.time()
    with ThreadPoolExecutor(max_workers=paralel if tur == "ollama" else 1) as havuz:
        for i, r in enumerate(havuz.map(tek, kalan)):
            jsonl_ekle(dosya, r)
            if (i + 1) % 25 == 0 or i + 1 == len(kalan):
                gecen = time.time() - bas
                log(f"  {i + 1}/{len(kalan)}  kalan ~{(len(kalan) - i - 1) * gecen / (i + 1) / 60:.0f} dk")
    return model_ad, dosya


def ozet(kayitlar):
    d = sum(1 for r in kayitlar if r["harf"] and r["dogru"])
    y = sum(1 for r in kayitlar if r["harf"] and not r["dogru"])
    b = len(kayitlar) - d - y
    return d, y, b, d - y / 4


def rapor_yaz(sonuclar, sorular):
    sid = {s["id"]: s for s in sorular}
    satir = ["# Gerçek YKS sorularıyla model testi", "",
             "Sorular ÖSYM'nin yayımladığı TYT ve AYT kitapçıklarından alındı; eğitimde hiç kullanılmadı. "
             "Şekilli sorular modele fotoğraf olarak soruldu. Net = doğru − yanlış/4 (şık okunamayan cevap boş sayıldı).", ""]
    ortak = set.intersection(*[{r["id"] for r in k} for k in sonuclar.values()]) if sonuclar else set()
    if len(sonuclar) > 1:
        satir.append(f"Karşılaştırma tablosu, tüm modellerin cevapladığı {len(ortak)} ortak soru üzerindendir.")
        satir.append("")
    satir += ["## Genel", "", "| Model | Soru | Doğru | Yanlış | Boş | Net | Doğruluk | Yazılı sorularda | Fotoğraflı sorularda | Ort. süre |",
              "|---|---|---|---|---|---|---|---|---|---|"]
    for ad, tum in sonuclar.items():
        kayit = [r for r in tum if r["id"] in ortak]
        d, y, b, net = ozet(kayit)
        yz = [r for r in kayit if not r["gorsel"]]
        gr = [r for r in kayit if r["gorsel"]]
        oran = lambda L: f"%{100 * sum(r['dogru'] for r in L) / len(L):.1f}" if L else "-"
        sure = sum(r["sure"] for r in kayit) / max(1, len(kayit))
        satir.append(f"| {ad} | {len(kayit)} | {d} | {y} | {b} | {net:.2f} | {oran(kayit)} | {oran(yz)} | {oran(gr)} | {sure:.1f} sn |")
    satir += ["", "## Sınav ve test bazında net", ""]
    gruplar = sorted({(sid[r["id"]]["yil"], sid[r["id"]]["sinav"], sid[r["id"]]["bolum"]) for k in sonuclar.values() for r in k},
                     key=lambda g: (-g[0], g[1], list(BOLUM_ADI).index(g[2]) if g[2] in BOLUM_ADI else 9))
    adlar = list(sonuclar)
    satir += ["| Yıl | Test | Soru | " + " | ".join(adlar) + " |", "|---|---|---|" + "---|" * len(adlar)]
    for yil, sinav, bolum in gruplar:
        hucre, n = [], 0
        for ad in adlar:
            L = [r for r in sonuclar[ad] if (sid[r["id"]]["yil"], sid[r["id"]]["sinav"], sid[r["id"]]["bolum"]) == (yil, sinav, bolum)]
            n = max(n, len(L))
            hucre.append(f"{ozet(L)[3]:.2f}" if L else "-")
        ad_b = BOLUM_ADI.get(bolum, bolum) if not (sinav == "AYT" and bolum == "FEN") else "AYT Fen"
        satir.append(f"| {yil} | {ad_b} | {n} | " + " | ".join(hucre) + " |")
    satir += ["", "Not: ÖSYM soruları telif hakkı altındadır; yalnızca bu testte kullanıldı, eğitime ve uygulamaya girmedi."]
    (RAPOR / "yks_raporu.md").write_text("\n".join(satir) + "\n", encoding="utf-8")
    log("Rapor:", RAPOR / "yks_raporu.md")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--model", action="append", help="ollama:<ad> ya da bulut:<ad>")
    p.add_argument("--yil", type=int, action="append")
    p.add_argument("--paralel", type=int, default=2)
    arg = p.parse_args()
    baslat("yks_test")
    sorular = jsonl_oku(VERI / "yks" / "sorular.jsonl")
    if not sorular:
        raise SystemExit("veri/yks/sorular.jsonl yok. Önce yks_ayikla.py'yi çalıştırın.")
    plan = [(m, None) for m in arg.model] if arg.model else VARSAYILAN
    sonuclar = {}
    for model_ad, yil in plan:
        yillar = set(arg.yil or ([yil] if yil else []))
        secili = [s for s in sorular if not yillar or s["yil"] in yillar]
        r = calistir(model_ad, secili, arg.paralel)
        if r:
            ad, dosya = r
            ids = {s["id"] for s in secili}
            sonuclar[ad] = [k for k in jsonl_oku(dosya) if k["id"] in ids]
            rapor_yaz(sonuclar, sorular)


if __name__ == "__main__":
    main()
