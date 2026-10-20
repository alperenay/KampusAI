"""Gerçek YKS sorularıyla model testi (sorular: yks_ayikla.py → veri/yks/sorular.jsonl).

Şekilli sorular (grafik, tablo, şekil, altı çizili ifade) modele FOTOĞRAF olarak, diğerleri yazı olarak sorulur.
Puanlama ÖSYM gibi: net = doğru − yanlış / 4. Şık okunamayan cevap boş sayılır.

Modeller:
  ollama:<ad>   bu bilgisayardaki Ollama modeli (ör. ollama:gemma4:e4b)
  bulut:<ad>    KampüsAI sunucusu üzerinden Google modeli (ör. bulut:gemini-3.5-flash-lite, bulut:gemma-4-26b-a4b-it)

Kullanım:
  python yks_test.py                                  # varsayılan: gemma4:e4b tüm yıllar + bulut modelleri 2026
  python yks_test.py --model ollama:gemma4:e4b --yil 2026
  python yks_test.py --hesap        # matematik: hesap aracıyla ve araçsız karşılaştırma (rapor/yks_hesap_raporu.md)
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

from hesap import ARAC, hesapla
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


BASLIK = {"Content-Type": "application/json", "X-DA-App": "yks-test", "User-Agent": "KampusAI-YKS-Test/1.0"}
OLLAMA_SINIR = 8192        # düşünen model uzun matematik çözümlerinde 3000'i aşıyordu (cevap yarım kalıyordu)


def istek(url, govde=None, zaman_asimi=300):
    """POST (govde varsa) ya da GET; ağ/SSL kesintilerinde birkaç kez yeniden dener."""
    for deneme in range(5):
        req = urllib.request.Request(url, data=json.dumps(govde).encode("utf-8") if govde is not None else None,
                                     method="POST" if govde is not None else "GET", headers=BASLIK)
        try:
            with urllib.request.urlopen(req, timeout=zaman_asimi) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError:
            raise
        except (urllib.error.URLError, ConnectionError, TimeoutError) as e:
            if deneme == 4:
                raise
            log(f"  ağ hatası, yeniden deneniyor: {repr(e)[:100]}")
            time.sleep(10 * (deneme + 1))


def tekrar_sorulmali(r):
    """Hata nedeniyle boş kalan ya da sınıra takılıp yarım kalan cevaplar yeniden sorulur."""
    return r["harf"] is None and (not r.get("token") or r.get("token", 0) >= 2990)


def soru_metni(s):
    if s["gorsel"]:
        return "Fotoğraftaki soruyu çöz."
    return s["metin"]


HESAP_TALIMAT = (" Bir hesap gerektiğinde (toplama, çarpma, kesir, üs, kök, trigonometri) sonucu kafadan bulma; "
                 "hesapla aracını çağır ve aracın verdiği sonucu kullan.")


def sor_ollama(model, s, adres, arac=False):
    mesaj = {"role": "user", "content": soru_metni(s)}
    if s["gorsel"]:
        mesaj["images"] = [base64.b64encode((VERI / "yks" / s["gorsel"]).read_bytes()).decode()]
    t0 = time.time()
    mesajlar = [{"role": "system", "content": SISTEM + (HESAP_TALIMAT if arac else "")}, mesaj]
    govde = {"model": model, "stream": False, "keep_alive": "30m", "messages": mesajlar,
             "options": {"temperature": 0.2, "num_ctx": 12288, "num_predict": OLLAMA_SINIR}}
    if arac:
        govde["tools"] = [ARAC]
    tok, cagri = 0, 0
    for _ in range(12):                                   # en fazla 12 tur araç çağrısı
        r = istek(adres.rstrip("/") + "/api/chat", govde)
        tok += r.get("eval_count", 0)
        m = r.get("message") or {}
        cagrilar = m.get("tool_calls") or []
        if not arac or not cagrilar:
            return m.get("content", ""), time.time() - t0, tok, cagri
        mesajlar.append({"role": "assistant", "content": m.get("content", ""), "tool_calls": cagrilar})
        for c in cagrilar:
            f = c.get("function") or {}
            argm = f.get("arguments") or {}
            if isinstance(argm, str):
                try: argm = json.loads(argm)
                except ValueError: argm = {"ifade": argm}
            cagri += 1
            mesajlar.append({"role": "tool", "tool_name": f.get("name", "hesapla"),
                             "content": hesapla(argm.get("ifade", "")) if f.get("name") == "hesapla" else "Bilinmeyen araç"})
    return m.get("content", ""), time.time() - t0, tok, cagri


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
    adlar = [m["name"].replace("models/", "") for m in istek(SUNUCU + "/models", zaman_asimi=30).get("models", [])]
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
        izinli = {m["name"].replace("models/", "") for m in istek(SUNUCU + "/models", zaman_asimi=30).get("models", [])}
        if ad not in izinli:
            log(f"{ad} KampüsAI sunucusunda henüz açık değil (güncelleme yayınlanınca açılır); atlandı.")
            return None
    dosya = RAPOR / "yks_cevaplar" / (re.sub(r"[^\w.-]+", "_", model_ad) + ".jsonl")
    dosya.parent.mkdir(parents=True, exist_ok=True)
    son = {r["id"]: r for r in jsonl_oku(dosya)}                 # aynı soru tekrar sorulduysa son cevap geçerli
    biten = {i for i, r in son.items() if not (tekrar_sorulmali(r) and r.get("token", 0) < OLLAMA_SINIR - 10)}
    kalan = [s for s in sorular if s["id"] not in biten]
    log(f"=== {model_ad}: {len(sorular)} soru (önceden {len(sorular) - len(kalan)} yanıt var)")
    a = ayarlar()
    yerel = tur in ("ollama", "ollama-hesap")
    if yerel:
        ollama_ac()
        model_hazirla(ad)

    def tek(s):
        cagri = 0
        try:
            if yerel:
                yanit, sure, tok, cagri = sor_ollama(ad, s, a["ollama_adres"], arac=(tur == "ollama-hesap"))
            else:
                yanit, sure, tok = sor_bulut(ad, s)
        except Exception as e:
            yanit, sure, tok = "", 0, 0
            log(f"  {s['id']}: hata {repr(e)[:150]}")
        harf = cevap_harfi(yanit)
        return {"id": s["id"], "harf": harf, "cevap": s["cevap"], "dogru": harf == s["cevap"], "sure": round(sure, 1),
                "token": tok, "gorsel": bool(s["gorsel"]), "arac": cagri, "yanit": yanit[-1500:]}

    bas = time.time()
    with ThreadPoolExecutor(max_workers=paralel if yerel else 1) as havuz:
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


def rapor_yaz(sonuclar, sorular, dosya_adi="yks_raporu.md"):
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
    (RAPOR / dosya_adi).write_text("\n".join(satir) + "\n", encoding="utf-8")
    log("Rapor:", RAPOR / dosya_adi)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--model", action="append", help="ollama:<ad> ya da bulut:<ad>")
    p.add_argument("--yil", type=int, action="append")
    p.add_argument("--paralel", type=int, default=2)
    p.add_argument("--rapor", default="yks_raporu.md", help="rapor dosyasının adı (rapor/ altında)")
    p.add_argument("--hesap", action="store_true", help="2026 matematik sorularını hesap aracıyla çöz ve araçsız sonuçla karşılaştır")
    arg = p.parse_args()
    baslat("yks_test")
    sorular = jsonl_oku(VERI / "yks" / "sorular.jsonl")
    if not sorular:
        raise SystemExit("veri/yks/sorular.jsonl yok. Önce yks_ayikla.py'yi çalıştırın.")
    if arg.hesap:
        mat = [s for s in sorular if s["yil"] == 2026 and s["bolum"] in ("TEM", "MAT")]
        log(f"Hesap aracı denemesi: {len(mat)} matematik sorusu (2026 TYT Temel Matematik + AYT Matematik)")
        sonuclar = {}
        for model_ad in ("ollama:gemma4:e4b", "ollama-hesap:gemma4:e4b"):
            r = calistir(model_ad, mat, arg.paralel)        # araçsız sonuç önceki testten hazır: yeniden sorulmaz
            ids = {s["id"] for s in mat}
            son = {k["id"]: k for k in jsonl_oku(r[1])}
            sonuclar[r[0]] = [k for i, k in son.items() if i in ids]
        rapor_yaz(sonuclar, sorular, "yks_hesap_raporu.md")
        h = sonuclar["ollama-hesap:gemma4:e4b"]
        log(f"Araç kullanılan soru: {sum(1 for k in h if k.get('arac'))}/{len(h)}, toplam çağrı {sum(k.get('arac', 0) for k in h)}")
        return
    plan = [(m, None) for m in arg.model] if arg.model else VARSAYILAN
    sonuclar = {}
    for model_ad, yil in plan:
        yillar = set(arg.yil or ([yil] if yil else []))
        secili = [s for s in sorular if not yillar or s["yil"] in yillar]
        r = calistir(model_ad, secili, arg.paralel)
        if r:
            ad, dosya = r
            ids = {s["id"] for s in secili}
            son = {k["id"]: k for k in jsonl_oku(dosya)}
            sonuclar[ad] = [k for i, k in son.items() if i in ids]
            rapor_yaz(sonuclar, sorular, arg.rapor)


if __name__ == "__main__":
    main()
