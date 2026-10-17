"""Adım 2 — Konu anlatımlarından eğitim verisi üretir (öğretmen model: Ollama).

Üretilen örnek türleri
  test      : her kazanım için YKS tarzı çoktan seçmeli soru + adım adım çözüm.
              Her soru ikinci, bağımsız bir çözümle doğrulanır; iki cevap
              uyuşmazsa soru atılır (yanlış çözümle eğitmemek için).
  kavram    : öğrencinin konu hakkında sorabileceği sorular + öğretmen yanıtı
  sokratik  : ipucuyla yönlendiren çok adımlı öğretmen modu diyalogları
  analiz    : uydurma (sentetik) deneme sonuçlarıyla "netlerim nasıl, ne
              çalışayım?" soruları; yanıttaki sayılar veride yoksa atılır
  + birleştirme sırasında: fotoğraftan okunan soru biçimi ve konu notu
    bağlamlı (RAG) biçim — ek model çağrısı gerektirmez

Yarıda kesilirse kaldığı yerden devam eder (aynı komutu tekrar çalıştırın).

Kullanım
  python adim2_veri_uret.py                 tümü
  python adim2_veri_uret.py --sinir 10      yalnızca 10 kazanım (deneme)
  python adim2_veri_uret.py --birlestir     yalnızca birleştir (model çağırmaz)
"""
import argparse
import json
import random
import re
import threading
import time
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed

from ortak import (BULUT, SAYISAL, SIK_HARFLERI, BulutHatasi, SOKRATIK, URETILEN, VERI, OllamaHatasi, ayarlar, baslat, cevap_harfi,
                   etiket_deseni, etiketle_bol,
                   etiket, fotograf_blogu, jsonl_ekle, jsonl_oku, jsonl_yaz, log, model_hazirla, ollama_modeller,
                   ollama_sohbet, rastgele_tarih, sistem_istemi, veri_bolumu)

KILIT = threading.Lock()


class BulutKolAtla(Exception):
    """Bulut kapandı: bu görev bulut kolunda değil, tam paralel yerel kolda üretilsin."""
# Üretim biçimi değişince eski üretilmiş veri yeniden kullanılmasın diye artırılır
VERI_SURUMU = "3"


def surum_kontrol():
    isaret = URETILEN / "surum.txt"
    if URETILEN.exists() and any(URETILEN.glob("*.jsonl")):
        eski = isaret.read_text(encoding="utf-8").strip() if isaret.exists() else "1"
        if eski != VERI_SURUMU:
            yedek = VERI / f"uretilen_eski_v{eski}_{time.strftime('%Y%m%d_%H%M')}"
            URETILEN.rename(yedek)
            log(f"Önceki üretim (sürüm {eski}) yeni biçimle uyumsuz; kenara alındı: {yedek.name}")
    URETILEN.mkdir(parents=True, exist_ok=True)
    isaret.write_text(VERI_SURUMU, encoding="utf-8")

# ---------------------------------------------------------------- İstemler

YAZAR_SISTEM = ("Sen Türkiye'de lise öğrencilerine ders veren, YKS (TYT-AYT) soru tarzını çok iyi bilen deneyimli bir "
                "öğretmen ve soru yazarısın. Yalnızca sana verilen konu notundaki bilgilere dayanırsın; emin olmadığın "
                "bilgiyi yazmazsın. Türkçe yazarsın.")


def not_metni(k):
    ozet = "\n".join("- " + x for x in k["ozet"]) if k["ozet"] else ""
    return f"KONU: {k['yol']}\n\nKONU NOTU:\n{k['anlatim']}" + (f"\n\nHAP BİLGİ:\n{ozet}" if ozet else "")


def test_istemi(k, adet, harfler):
    dil = ("Sorular ve şıklar İngilizce (YDT tarzı), çözüm açıklaması Türkçe olsun."
           if k["ders"] == "ingilizce" else "Her şey Türkçe olsun.")
    zorluk = ["kolay", "orta", "zor", "orta", "zor"][:adet]
    return f"""{not_metni(k)}

GÖREV: Bu konudan {adet} adet özgün, çoktan seçmeli soru yaz.
- {k['sinif']}. sınıf düzeyinde, YKS'de çıkabilecek tarzda olsun. Zorluklar sırasıyla: {", ".join(zorluk)}.
- Her sorunun 5 şıkkı (A–E) ve YALNIZCA BİR doğru cevabı olsun. Çeldiriciler mantıklı ama kesin yanlış olsun.
- Doğru cevaplar sırasıyla şu şıklarda olsun: {", ".join(harfler)}.
- Yalnızca konu notundaki bilgiyi kullan; nottaki örnek soruları kopyalama.
- Çözümü öğrenciye anlatır gibi adım adım, kısa ve net yaz. Matematiksel ifadeleri LaTeX ile yaz ($...$). Gerekiyorsa
  yanlış şıkların neden yanlış olduğunu da kısaca belirt. Çözümün son satırı tam olarak şöyle olsun: **Doğru cevap: X**
- {dil}

Her soruyu TAM OLARAK şu biçimde yaz (başka hiçbir şey ekleme):
<SORU>soru kökü</SORU>
<A>şık</A>
<B>şık</B>
<C>şık</C>
<D>şık</D>
<E>şık</E>
<CEVAP>harf</CEVAP>
<COZUM>adım adım çözüm</COZUM>"""


ZORLUKLAR = ["kolay", "orta", "zor", "orta", "zor"]


def tek_soru_istemi(k, zorluk, harf, onceki):
    """Her çağrıda TEK soru: küçük modeller çok soruluk katı biçimde etiketleri karıştırıp
    çıktının ortasında plan yapmaya başlıyor; tek soru ve düz biçim çok daha güvenilir."""
    dil = ("Soru ve şıklar İngilizce (YDT tarzı), çözüm açıklaması Türkçe olsun."
           if k["ders"] == "ingilizce" else "Her şey Türkçe olsun.")
    farkli = ("\n- Şu sorulardan FARKLI bir konuyu/yönü sorsun:\n" + "\n".join("  • " + o[:160] for o in onceki)) if onceki else ""
    return f"""{not_metni(k)}

GÖREV: Bu konudan 1 adet özgün, {zorluk} zorlukta, çoktan seçmeli soru yaz.
- {k['sinif']}. sınıf düzeyinde, YKS'de çıkabilecek tarzda olsun.
- 5 şık (A–E) ve YALNIZCA BİR doğru cevap olsun. Doğru cevap {harf} şıkkı olsun. Çeldiriciler mantıklı ama kesin yanlış olsun.
- Yalnızca konu notundaki bilgiyi kullan; nottaki örnek soruları kopyalama.{farkli}
- Çözümü öğrenciye anlatır gibi adım adım, kısa ve net yaz; matematiksel ifadeleri LaTeX ile ($...$) yaz.
- {dil}

YALNIZCA aşağıdaki biçimde yaz. Önce/sonra açıklama, plan ya da not EKLEME:
SORU: <soru kökü>
A) <şık>
B) <şık>
C) <şık>
D) <şık>
E) <şık>
CEVAP: <harf>
ÇÖZÜM:
<adım adım çözüm>
**Doğru cevap: <harf>**"""


def ayristir_satir(metin):
    """Düz biçimi ayrıştırır: SORU: … / A) … E) … / CEVAP: X / ÇÖZÜM: …"""
    metin = re.sub(r"<think>.*?</think>", "", metin or "", flags=re.S)
    ms = re.search(r"^\W*SORU\W*[:：]\s*", metin, flags=re.M | re.I)
    mc = re.search(r"^\W*(?:DO[ĞG]RU\s+)?CEVAP\W*[:：]\W*\(?([A-E])\b", metin, flags=re.M | re.I)
    mz = re.search(r"^\W*[ÇC][ÖO]Z[ÜU]M\W*[:：]?\s*$|^\W*[ÇC][ÖO]Z[ÜU]M\W*[:：]\s*", metin, flags=re.M | re.I)
    if not (ms and mc and mz) or not (ms.end() <= mc.start() <= mz.start()):
        return None
    govde = metin[ms.end():mc.start()]
    sik = {m.group(1).upper(): m.group(2).strip() for m in
           re.finditer(r"^\s*\**\(?([A-E])\s*[\)\.:]\**\s*(.+?)\s*$", govde, flags=re.M)}
    ilk = re.search(r"^\s*\**\(?A\s*[\)\.:]", govde, flags=re.M)
    soru = (govde[:ilk.start()] if ilk else "").strip().lstrip("*").strip()
    cozum = metin[mz.end():].strip().lstrip("*").strip()
    son = re.search(r"\**\s*Do[ğg]ru cevap\s*[:：]\s*\**\s*\(?[A-E]\)?\s*\**", cozum, flags=re.I)
    if son:
        cozum = cozum[:son.end()].strip()   # sonrasındaki gevezeliği at
    if not soru or len(sik) != 5 or not cozum:
        return None
    return {"soru": soru, "siklar": {h: sik[h] for h in SIK_HARFLERI}, "cevap": mc.group(1).upper(), "cozum": cozum}


def tek_soru_ayristir(metin):
    s = ayristir_satir(metin)
    if s:
        if len(set(v.strip().lower() for v in s["siklar"].values())) < 5:
            return None
        if cevap_harfi(s["cozum"]) not in (None, s["cevap"]):
            return None
        if "Doğru cevap" not in s["cozum"]:
            s["cozum"] = s["cozum"].rstrip() + f"\n\n**Doğru cevap: {s['cevap']}**"
        return s
    eski = ayristir_sorular(metin)          # model yine de etiketli yazdıysa
    return eski[0] if eski else None


def dogrulama_istemi(s):
    siklar = "\n".join(f"{h}) {s['siklar'][h]}" for h in SIK_HARFLERI)
    return (f"{s['soru']}\n\n{siklar}\n\nBu soruyu dikkatlice, adım adım ve kısa çöz. "
            "En sonda yalnızca doğru şıkkın harfini şu biçimde yaz: <CEVAP>X</CEVAP>")


NIYETLER = [
    "konuyu baştan, sade bir dille anlatmasını isteyen",
    "iki kavramın farkını soran",
    "bir kuralın ya da olayın NEDEN öyle olduğunu soran",
    "günlük hayattan bir örnek isteyen",
    "kafası karışmış, bir noktayı yanlış anlamış (yanılgısını öğretmen nazikçe düzeltmeli)",
    "bu konunun YKS'de nasıl sorulduğunu ve nelere dikkat etmesi gerektiğini soran",
    "kısa bir özet / ezber taktiği isteyen",
    "nottaki bir terimin ne demek olduğunu soran",
]


def kavram_istemi(k, adet, rng):
    niyet = rng.sample(NIYETLER, adet)
    liste = "\n".join(f"{i + 1}. {n} bir öğrenci" for i, n in enumerate(niyet))
    dil = " Öğrenci İngilizce bir konu soruyor olabilir; yanıt yine Türkçe olsun, örnek cümleler İngilizce." if k["ders"] == "ingilizce" else ""
    return f"""{not_metni(k)}

GÖREV: Bu konu hakkında öğrencilerin bir yapay zeka öğretmene yazabileceği {adet} farklı mesaj ve her birine
verilecek ideal yanıtı yaz. Öğrenciler:
{liste}

- Öğrenci mesajları gerçekçi olsun: kısa, samimi, bazen günlük dille ("hocam", "anlamadım", "ya şunu" gibi).
- Yanıtlar "KampüsAI" adlı sabırlı bir öğretmenin ağzından olsun: doğrudan konuya gir, Markdown kullan
  (kalın, liste), gerekirse LaTeX ($...$). Gereksiz uzatma; sonunda gerekirse kısa bir kontrol sorusu sor.
- Yalnızca konu notundaki bilgiye dayan; notta olmayan bilgi uydurma.{dil}

TAM OLARAK şu biçimde yaz (her öğrenci için bir çift):
<OGRENCI_MESAJI>öğrencinin mesajı</OGRENCI_MESAJI>
<YANIT>öğretmenin yanıtı</YANIT>"""


def sokratik_istemi(k, s):
    siklar = "\n".join(f"{h}) {s['siklar'][h]}" for h in SIK_HARFLERI)
    return f"""{not_metni(k)}

SORU:
{s['soru']}
{siklar}
Doğru cevap: {s['cevap']}
Çözüm: {s['cozum']}

GÖREV: Bir öğrenci ile "öğretmen modu"ndaki bir yapay zeka öğretmen arasında bu soru üzerine geçen gerçekçi bir
konuşma yaz. Öğretmen modunun kuralları:
{SOKRATIK}

- Konuşma öğrencinin soruyu (şıklarıyla) göndermesiyle başlasın.
- Öğrenci en az bir kez yanlış bir adım atsın; öğretmen hatayı söylemeden bir soruyla fark ettirsin.
- Toplam 3–5 öğretmen mesajı olsun. Sonunda ya öğrenci doğru cevabı bulsun ve öğretmen kısa bir özetle onaylasın,
  ya da öğrenci "çözümü göster" desin ve öğretmen tam çözümü doğru şıkla versin.

TAM OLARAK şu biçimde yaz, sırayla:
<OGRENCI>…</OGRENCI>
<OGRETMEN>…</OGRETMEN>
<OGRENCI>…</OGRENCI>
<OGRETMEN>…</OGRETMEN>
…"""


# ---------------------------------------------------------------- Sentetik deneme verisi

TYT = [("Türkçe", 40), ("Sosyal Bilimler", 20), ("Temel Matematik", 40), ("Fen Bilimleri", 20)]
AYT = {
    "sayısal": [("Matematik", 40), ("Fizik", 14), ("Kimya", 13), ("Biyoloji", 13)],
    "eşit ağırlık": [("Matematik", 40), ("Türk Dili ve Edebiyatı", 24), ("Tarih-1", 10), ("Coğrafya-1", 6)],
    "sözel": [("Türk Dili ve Edebiyatı", 24), ("Tarih-1", 10), ("Coğrafya-1", 6), ("Tarih-2", 11),
              ("Coğrafya-2", 11), ("Felsefe Grubu", 12), ("Din Kültürü", 6)],
}
YAYINLAR = ["Özdebir", "3D", "Limit", "Bilgi Sarmal", "Apotemi", "Okyanus", "Yayın Denizi", "Hız ve Renk", "Kurum", "Okul"]
AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
GUNLER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]


def num(x, d=2):
    s = f"{round(x, d):.{d}f}".rstrip("0").rstrip(".")
    return s.replace(".", ",")


def tarih(d):
    return f"{d.day} {AYLAR[d.month - 1]} {d.year}"


def deneme_uret(rng, tur, dersler, seviye, gun, sira):
    satirlar, per = [], {}
    toplam = 0.0
    for ad, q in dersler:
        oran = max(0.05, min(0.97, rng.gauss(seviye.get(ad, 0.5), 0.08)))
        d = int(round(q * oran))
        kalan = q - d
        y = min(kalan, int(round(kalan * rng.uniform(0.3, 0.75))))
        b = q - d - y
        net = d - y / 4
        per[ad] = (d, y, b, net, q)
        toplam += net
        satirlar.append(f"- {ad}: {d} doğru, {y} yanlış, {b} boş → {num(net)} net ({q} soruda)")
    ad = f"{rng.choice(YAYINLAR)} {tur} Deneme {sira}"
    metin = f"Deneme: {ad} ({tur}, {tarih(gun)})\n" + "\n".join(satirlar) + f"\nToplam net: {num(toplam)}"
    return {"ad": ad, "tarih": gun, "per": per, "toplam": toplam, "metin": metin}


def ogrenci_uret(rng):
    from datetime import timedelta
    bugun = rastgele_tarih(rng)
    alan = rng.choice(list(AYT))
    seviye = {ad: rng.uniform(0.25, 0.85) for ad, _ in TYT + sum(AYT.values(), [])}
    egilim = rng.uniform(-0.03, 0.05)          # deneme başına gelişme
    denemeler = {"TYT": [], "AYT": []}
    n_tyt = rng.randint(2, 6)
    ayt_var = rng.random() < 0.6
    for tur, adet, dersler in (("TYT", n_tyt, TYT), ("AYT", rng.randint(1, 4) if ayt_var else 0, AYT[alan])):
        for i in range(adet):
            gun = bugun - timedelta(days=7 * (adet - i) + rng.randint(0, 3))
            sv = {k: v + egilim * i for k, v in seviye.items()}
            denemeler[tur].append(deneme_uret(rng, tur, dersler, sv, gun, i + 1))
    satir = [f"Bugün: {bugun.day} {AYLAR[bugun.month - 1]} {bugun.year}, {GUNLER[bugun.weekday()]}."]
    for tur, liste in denemeler.items():
        if not liste:
            satir.append(f"{tur}: henüz deneme girilmemiş.")
            continue
        top = [x["toplam"] for x in liste]
        en = max(liste, key=lambda x: x["toplam"])
        son = liste[-1]
        fark = (f" (öncekine göre {'+' if son['toplam'] - liste[-2]['toplam'] >= 0 else ''}"
                f"{num(son['toplam'] - liste[-2]['toplam'])})") if len(liste) > 1 else ""
        satir.append(f"{tur} denemeleri: {len(liste)} adet ({tarih(liste[0]['tarih'])} – {tarih(son['tarih'])}). "
                     f"Ortalama {num(sum(top) / len(top), 1)} net, en yüksek {num(en['toplam'])} ({en['ad']}). "
                     f"Son deneme: {son['ad']} — {num(son['toplam'])} net{fark}.")
        satir.append(f"Son {min(5, len(liste))} deneme sırasıyla: " +
                     "; ".join(f"{tarih(x['tarih'])} {num(x['toplam'])}" for x in liste[-5:]) + ".")
        ort = []
        for ad in liste[0]["per"]:
            vals = [x["per"][ad][3] for x in liste]
            q = liste[0]["per"][ad][4]
            m = sum(vals) / len(vals)
            ort.append((ad, m, q, m / q))
        satir.append("Ders ortalamaları: " + ", ".join(f"{a} {num(m, 1)}/{q} (%{round(p * 100)})" for a, m, q, p in ort) + ".")
        zayif = min(ort, key=lambda x: x[3])
        satir.append(f"Oransal olarak en zayıf ders: {zayif[0]} (%{round(zayif[3] * 100)}).")
    haftalik = rng.choice([0, 0, 600, 900, 1200, 1500])
    satir.append("Haftalık planlanan çalışma: " + (f"{haftalik // 60} sa" if haftalik else "yok") + ".")
    kayitlar = [x["metin"] for x in (denemeler["TYT"] + denemeler["AYT"])][-6:]
    return {"bugun": bugun, "alan": alan, "ayt_var": ayt_var, "genel": "\n".join(satir), "kayitlar": kayitlar}


ANALIZ_SORULARI = [
    "Netlerim nasıl gidiyor?", "son denemem nasıldı", "En zayıf dersim hangisi, ne yapmalıyım?",
    "Bu hafta neye odaklanayım?", "TYT netlerimi nasıl artırırım?", "denemelerime göre bana bir çalışma planı yapar mısın",
    "Matematik netim neden düşük sence?", "Son iki denemeyi karşılaştırır mısın?", "Gelişiyor muyum yoksa yerimde mi sayıyorum?",
    "Hangi derse daha çok zaman ayırmalıyım?", "Boş bıraktığım sorular çok mu?", "Yanlışlarım netimi ne kadar düşürüyor?",
]
AYT_SORULARI = ["AYT netlerim nasıl?", "AYT'de hangi derse yüklenmeliyim?", "AYT denemelerime göre durumum ne?"]


def sayilar_veride_mi(yanit, veri):
    """Yanıttaki ondalıklı sayılar ve 'X net' ifadeleri veride geçiyor mu? (uydurma sayı filtresi)"""
    veri_say = set(re.findall(r"\d+(?:,\d+)?", veri))
    for m in re.finditer(r"(\d+,\d+)|(\d+)\s*net", yanit):
        s = m.group(1) or m.group(2)
        if m.group(2) and int(s) < 10:
            continue  # "2-3 net artırmak" gibi küçük hedefler öneridir, veri değil
        if s not in veri_say:
            return False, s
    return True, None


# ---------------------------------------------------------------- Görevler

def ayristir_sorular(metin):
    out = []
    gorulen = set()
    for b in etiketle_bol(metin, "SORU"):
        soru = etiket(b, "SORU")
        if not soru:
            continue
        siklar = {h: etiket(b, h) for h in SIK_HARFLERI}
        cevap = (etiket(b, "CEVAP") or "").strip().upper()[:1]
        cozum = etiket(b, "COZUM")
        if not all(siklar.values()) or cevap not in SIK_HARFLERI or not cozum:
            continue
        if len(set(v.strip().lower() for v in siklar.values())) < 5:
            continue  # aynı şıktan iki tane
        anahtar = re.sub(r"\W+", "", soru.lower())[:200]
        if anahtar in gorulen:
            continue  # model aynı soruyu tekrar yazmış
        gorulen.add(anahtar)
        if cevap_harfi(cozum) not in (None, cevap):
            continue  # çözümün sonundaki cevap etiketle çelişiyor
        if "Doğru cevap" not in cozum:
            cozum = cozum.rstrip() + f"\n\n**Doğru cevap: {cevap}**"
        out.append({"soru": soru, "siklar": siklar, "cevap": cevap, "cozum": cozum})
    return out


def ham_kaydet(gid, model, metin, ist, bulunan, istenen):
    """Ayrıştırılamayan / eksik çıktıyı saklar (sorunun nedenini sonradan görebilmek için)."""
    with KILIT:
        jsonl_ekle(URETILEN / "ham.jsonl", {"id": gid, "model": model, "bulunan": bulunan, "istenen": istenen,
                                            "token": (ist or {}).get("token"), "metin": (metin or "")[:30000]})


def gorev_test(a, k, adet, rng, bulut_kolu=False):
    if bulut_kolu and not BULUT.etkin(k["ders"]):
        raise BulutKolAtla()
    sorular, ureticiler, tok = [], set(), 0
    for i in range(adet):
        harf = rng.choice(SIK_HARFLERI)
        mesajlar = [{"role": "system", "content": YAZAR_SISTEM},
                    {"role": "user", "content": tek_soru_istemi(k, ZORLUKLAR[i % 5], harf, [x["soru"] for x in sorular])}]
        soru, metin, ist, uretici = None, "", {"token": 0}, a["ogretmen_model"]
        if BULUT.etkin(k["ders"]):
            # Soruyu daha güçlü bulut modeli yazar; doğrulamayı yine yereldeki farklı model yapar
            try:
                metin, ist = BULUT.sohbet(mesajlar, sicaklik=0.7, max_token=4000)
                soru, uretici = tek_soru_ayristir(metin), BULUT.model_adi()
            except BulutHatasi as e:
                log(f"  bulut ({k['anahtar']}): {e} → yerel model")
        for deneme in range(2 if not soru else 0):   # biçim tutmazsa bir kez daha dene
            metin, ist = ollama_sohbet(a["ogretmen_model"], mesajlar, sicaklik=0.7 + 0.1 * deneme, max_token=2500)
            uretici = a["ogretmen_model"]
            soru = tek_soru_ayristir(metin)
            if soru:
                break
        tok += ist.get("token", 0)
        if not soru:
            ham_kaydet(f"test:{k['anahtar']}#{i}", uretici, metin, ist, 0, 1)
            continue
        anahtar = re.sub(r"\W+", "", soru["soru"].lower())[:200]
        if any(re.sub(r"\W+", "", x["soru"].lower())[:200] == anahtar for x in sorular):
            continue
        soru["uretici"] = uretici
        ureticiler.add(uretici)
        sorular.append(soru)
    # Sayısal derslerde doğrulama "düşünerek" yapılır: daha yavaş ama hesap hatalı soruları çok daha iyi yakalar
    ayar = a.get("dogrulama_dusunme", False)
    dusun = ayar is True or (ayar == "sayisal" and k["ders"] in SAYISAL)
    for s_ in sorular:
        v, ist2 = ollama_sohbet(a["ogretmen_model"], [{"role": "user", "content": dogrulama_istemi(s_)}],
                                sicaklik=0.0, dusunme=dusun, max_token=6000 if dusun else 2000)
        tok += ist2["token"]
        if dusun and cevap_harfi(v) is None:
            # Düşünme bütçesi bitti, cevap yazılamadı: soruyu atmak yerine düşünmeden bir kez daha çöz
            v, ist2 = ollama_sohbet(a["ogretmen_model"], [{"role": "user", "content": dogrulama_istemi(s_)}],
                                    sicaklik=0.0, dusunme=False, max_token=2000)
            tok += ist2["token"]
        s_["dogrulama"] = cevap_harfi(v)
        s_["gecti"] = s_["dogrulama"] == s_["cevap"]
    return {"id": "test:" + k["anahtar"], "anahtar": k["anahtar"], "sorular": sorular,
            "uretici": ", ".join(sorted(ureticiler)) or a["ogretmen_model"], "token": tok}


def gorev_kavram(a, k, adet, rng):
    metin, ist = ollama_sohbet(a["ogretmen_model"], [{"role": "system", "content": YAZAR_SISTEM},
                                                     {"role": "user", "content": kavram_istemi(k, adet, rng)}],
                               sicaklik=0.8, max_token=1300 * adet + 600)
    ciftler = []
    for b in etiketle_bol(metin, "OGRENCI_MESAJI"):
        s, y = etiket(b, "OGRENCI_MESAJI"), etiket(b, "YANIT")
        if s and not y:   # model kapanışı yanlış yazmış olabilir: </OGRENCI_YANIT>, </YANİT> ya da hiç
            m = re.search(r"<\s*YAN[Iİı]T\s*>\s*(.*)", b, flags=re.S | re.I)
            if m:
                y = re.sub(r"\s*<\s*/[^>]*>\s*$", "", m.group(1)).strip()
        if s and y and len(y) > 40:
            ciftler.append({"soru": s, "yanit": y})
    if len(ciftler) < adet:
        ham_kaydet("kavram:" + k["anahtar"], a["ogretmen_model"], metin, ist, len(ciftler), adet)
    return {"id": "kavram:" + k["anahtar"], "anahtar": k["anahtar"], "ciftler": ciftler[:adet], "token": ist["token"]}


def gorev_sokratik(a, k, s):
    metin, ist = ollama_sohbet(a["ogretmen_model"], [{"role": "system", "content": YAZAR_SISTEM},
                                                     {"role": "user", "content": sokratik_istemi(k, s)}],
                               sicaklik=0.7, max_token=3500)
    sira = [(m.group(1).upper(), m.group(2).strip()) for m in
            re.finditer(r"\**<\s*(" + etiket_deseni("OGRENCI") + "|" + etiket_deseni("OGRETMEN") + r")\s*>\**\s*(.*?)\s*\**<\s*/\s*\1\s*>\**",
                        metin, flags=re.S | re.I)]
    diyalog = []
    for rol, t in sira:
        r = "user" if re.sub(r"[^A-Z]", "", rol.upper().replace("Ö", "O").replace("Ğ", "G").replace("İ", "I")).startswith("OGRENC") else "assistant"
        if not t:
            continue
        if diyalog and diyalog[-1]["role"] == r:
            diyalog[-1]["content"] += "\n\n" + t
        else:
            diyalog.append({"role": r, "content": t})
    gecerli = (len(diyalog) >= 4 and diyalog[0]["role"] == "user" and diyalog[-1]["role"] == "assistant"
               and sum(1 for d in diyalog if d["role"] == "assistant") >= 2)
    return {"id": "sokratik:" + k["anahtar"], "anahtar": k["anahtar"], "diyalog": diyalog if gecerli else [],
            "token": ist["token"]}


def gorev_analiz(a, n):
    rng = random.Random(9000 + n)
    o = ogrenci_uret(rng)
    if not o["ayt_var"] and rng.random() < 0.15:
        soru = rng.choice(AYT_SORULARI)          # verisi olmayan soru: "henüz AYT denemen yok" demeli
    elif o["ayt_var"] and rng.random() < 0.3:
        soru = rng.choice(AYT_SORULARI)
    else:
        soru = rng.choice(ANALIZ_SORULARI)
    veri = veri_bolumu(o["genel"], o["kayitlar"])
    sistem = sistem_istemi(o["bugun"]) + "\n\n" + veri
    ek = ("\n\n(YAZIM NOTU — öğrenciye gösterilmez: Yanıtında yalnızca yukarıdaki verilerde geçen sayıları aynen kullan, "
          "yeni sayı hesaplama ya da tahmin etme. Veride olmayan bir şey sorulursa olmadığını açıkça söyle ve deneme "
          "girmesini öner. Somut, uygulanabilir öneriler ver (hangi ders, hangi tür çalışma, haftada kaç saat gibi). "
          "Samimi ve motive edici ol ama abartma. Markdown kullan, kısa tut.)")
    yanit, ist = ollama_sohbet(a["ogretmen_model"], [{"role": "system", "content": sistem + ek},
                                                     {"role": "user", "content": soru}], sicaklik=0.6, max_token=2000)
    temiz, sorunlu = sayilar_veride_mi(yanit, veri)
    return {"id": f"analiz:{n}", "tarih": o["bugun"].isoformat(), "sistem": sistem, "soru": soru, "yanit": yanit,
            "gecti": temiz and len(yanit) > 80, "sorunlu_sayi": sorunlu, "token": ist["token"]}


# ---------------------------------------------------------------- Çalıştırıcı

def ollama_bekle(sure=600):
    """Ollama yanıt vermiyorsa (yeniden başlıyor, bellek doldu vb.) en fazla 10 dk bekler.
    Tek bir isteğin kopması tüm gece çalışmasını durdurmasın diye."""
    bas = time.time()
    while time.time() - bas < sure:
        try:
            ollama_modeller()
            return True
        except OllamaHatasi:
            log("Ollama yanıt vermiyor, bekleniyor...")
            time.sleep(20)
    return False


def calistir(a, gorevler, dosya, etiket_ad, tur=1, paralel=None):
    """gorevler: [(id, fonksiyon)] — biten id'ler atlanır, sonuçlar dosyaya eklenir.
    Hata veren görevler aşamanın sonunda bir kez daha denenir (gece kimse yeniden başlatmayacak)."""
    biten = {r["id"] for r in jsonl_oku(dosya)}
    kalan = [(i, f) for i, f in gorevler if i not in biten]
    if not kalan:
        log(f"{etiket_ad}: hepsi daha önce üretilmiş ({len(gorevler)}).")
        return
    log(f"{etiket_ad}: {len(kalan)} görev (önceden biten {len(gorevler) - len(kalan)}).")
    bas = time.time()
    tamam = hata = token = atlanan = 0
    with ThreadPoolExecutor(max_workers=max(1, int(paralel or a["paralel_istek"]))) as havuz:
        isler = {havuz.submit(f): i for i, f in kalan}
        for fut in as_completed(isler):
            gid = isler[fut]
            try:
                r = fut.result()
                with KILIT:
                    jsonl_ekle(dosya, r)
                tamam += 1
                token += r.get("token", 0)
            except OllamaHatasi as e:
                hata += 1
                with KILIT:
                    jsonl_ekle(URETILEN / "hatalar.jsonl", {"id": gid, "hata": str(e), "zaman": time.time()})
                if "yüklü değil" in str(e) or ("ulaşılamadı" in str(e) and not ollama_bekle()):
                    log("DURDU:", e)
                    havuz.shutdown(cancel_futures=True)
                    raise SystemExit(1)
            except BulutKolAtla:
                atlanan += 1
                continue
            except Exception as e:  # beklenmeyen ayrıştırma hataları tek görevi düşürür
                hata += 1
                with KILIT:
                    jsonl_ekle(URETILEN / "hatalar.jsonl", {"id": gid, "hata": repr(e), "zaman": time.time()})
            n = tamam + hata
            if n % 10 == 0 or n == len(kalan):
                gecen = time.time() - bas
                kalan_sure = gecen / n * (len(kalan) - n)
                log(f"  {etiket_ad}: {n}/{len(kalan)}  hata {hata}  ~{token / max(gecen, 1):.0f} token/sn  "
                    f"kalan ~{kalan_sure / 60:.0f} dk")
    if hata and tur == 1:
        log(f"{etiket_ad}: {hata} görev hata verdi, bir kez daha deneniyor.")
        calistir(a, gorevler, dosya, etiket_ad, tur=2, paralel=paralel)


# ---------------------------------------------------------------- Birleştirme

KULLANICI_ONEKLERI = ["", "", "", "Bu soruyu çözer misin?\n\n", "Şu soruyu adım adım çözebilir misin?\n\n",
                      "hocam bunu anlamadım\n\n", "Bu sorunun cevabı ne, nasıl çözülüyor?\n\n"]
GOZ_MODELLERI = ["qwen3-vl:8b", "qwen3-vl:8b", "qwen2.5vl:7b", "gemma4:e4b"]   # uygulamada "göz" olabilecek modeller
FOTO_METINLERI = ["", "", "Bu soruyu çöz", "çözer misin", "Bunu nasıl çözerim?", "bu soruyu anlamadım"]


def soru_metni(s):
    return s["soru"] + "\n\n" + "\n".join(f"{h}) {s['siklar'][h]}" for h in SIK_HARFLERI)


def konu_kaydi(k):
    parca = [k["anlatim"]]
    if k["ozet"]:
        parca.append("Hap bilgi:\n" + "\n".join("- " + x for x in k["ozet"]))
    return f"Konu anlatımı — {k['yol']}" + (f" ({k['kod']})" if k["kod"] else "") + ":\n" + "\n\n".join(parca)


def genel_ozet_bos(gun):
    return (f"Bugün: {gun.day} {AYLAR[gun.month - 1]} {gun.year}, {GUNLER[gun.weekday()]}.\n"
            "TYT: henüz deneme girilmemiş.\nAYT: henüz deneme girilmemiş.")


def birlestir(a):
    rng = random.Random(7)
    kaz = {k["anahtar"]: k for k in jsonl_oku(VERI / "korpus.jsonl")}
    test_kaz = set(json.loads((VERI / "test_kazanimlari.json").read_text(encoding="utf-8")))
    egitim, test_uretilen = [], []
    say = Counter()
    atilan = Counter()

    def ekle(tur, mesajlar):
        egitim.append({"tur": tur, "messages": mesajlar})
        say[tur] += 1

    def sistem(baglam=None):
        gun = rastgele_tarih(rng)
        s = sistem_istemi(gun)
        if baglam:
            s += "\n\n" + veri_bolumu(genel_ozet_bos(gun), [baglam])
        return s

    # Test soruları
    for r in jsonl_oku(URETILEN / "test.jsonl"):
        k = kaz.get(r["anahtar"])
        if not k:
            continue
        gecen = [s for s in r["sorular"] if s.get("gecti")]
        atilan["test_dogrulanamadi"] += len(r["sorular"]) - len(gecen)
        if r["anahtar"] in test_kaz and gecen:
            s = gecen.pop(0)
            test_uretilen.append({"anahtar": r["anahtar"], "ders": k["ders"], "sinif": k["sinif"],
                                  "soru": soru_metni(s), "cevap": s["cevap"], "cozum": s["cozum"]})
        for s in gecen:
            r_ = rng.random()
            if r_ < a["fotograf_bicimi_orani"]:
                kullanici = (rng.choice(FOTO_METINLERI) or "Fotoğraftaki soruyu çöz.") + "\n\n" + fotograf_blogu(soru_metni(s), rng.choice(GOZ_MODELLERI))
                tur = "test_foto"
            elif r_ < a["fotograf_bicimi_orani"] + a["konu_baglami_orani"] * 0.5:
                ekle("test_baglam", [{"role": "system", "content": sistem(konu_kaydi(k))},
                                     {"role": "user", "content": rng.choice(KULLANICI_ONEKLERI) + soru_metni(s)},
                                     {"role": "assistant", "content": s["cozum"]}])
                continue
            else:
                kullanici = rng.choice(KULLANICI_ONEKLERI) + soru_metni(s)
                tur = "test"
            ekle(tur, [{"role": "system", "content": sistem()}, {"role": "user", "content": kullanici},
                       {"role": "assistant", "content": s["cozum"]}])

    # Kavram soruları
    for r in jsonl_oku(URETILEN / "kavram.jsonl"):
        k = kaz.get(r["anahtar"])
        if not k:
            continue
        for c in r["ciftler"]:
            baglam = konu_kaydi(k) if rng.random() < a["konu_baglami_orani"] else None
            ekle("kavram_baglam" if baglam else "kavram",
                 [{"role": "system", "content": sistem(baglam)}, {"role": "user", "content": c["soru"]},
                  {"role": "assistant", "content": c["yanit"]}])

    # Sokratik diyaloglar
    for r in jsonl_oku(URETILEN / "sokratik.jsonl"):
        if not r["diyalog"]:
            atilan["sokratik_bicim"] += 1
            continue
        ekle("sokratik", [{"role": "system", "content": sistem() + "\n\n" + SOKRATIK}] + r["diyalog"])

    # Deneme analizleri
    for r in jsonl_oku(URETILEN / "analiz.jsonl"):
        if not r.get("gecti"):
            atilan["analiz_uydurma_sayi"] += 1
            continue
        ekle("analiz", [{"role": "system", "content": r["sistem"]}, {"role": "user", "content": r["soru"]},
                        {"role": "assistant", "content": r["yanit"]}])

    # Elle yazılmış örnekler (notlardaki çözümlü örnekler)
    for t in jsonl_oku(VERI / "tohum.jsonl"):
        ekle("tohum", [{"role": "system", "content": sistem()}, {"role": "user", "content": t["soru"]},
                       {"role": "assistant", "content": t["cozum"]}])

    rng.shuffle(egitim)
    jsonl_yaz(VERI / "egitim.jsonl", egitim)
    jsonl_yaz(VERI / "test_uretilen.jsonl", test_uretilen)
    harf = Counter(t["cevap"] for t in test_uretilen)
    ist = {"egitim_ornegi": len(egitim), "tur": dict(say), "atilan": dict(atilan),
           "test_uretilen": len(test_uretilen), "test_cevap_dagilimi": dict(sorted(harf.items())),
           "test_insan": len(jsonl_oku(VERI / "test_insan.jsonl"))}
    (VERI / "istatistik.json").write_text(json.dumps(ist, ensure_ascii=False, indent=1), encoding="utf-8")
    log("Birleştirildi:", json.dumps(ist, ensure_ascii=False))
    if len(egitim) < 1500:
        log("UYARI: eğitim örneği az (<1500). Tam üretim tamamlanmadıysa adım 2'yi tekrar çalıştırın.")
    return ist


# ---------------------------------------------------------------- Ana akış

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--sinir", type=int, default=0, help="yalnızca ilk N kazanım (deneme)")
    p.add_argument("--birlestir", action="store_true", help="model çağırmadan yalnızca birleştir")
    arg = p.parse_args()
    baslat("adim2_veri")
    a = ayarlar()
    if not (VERI / "korpus.jsonl").exists():
        raise SystemExit("Önce adım 1'i çalıştırın (korpus yok).")
    if arg.birlestir:
        birlestir(a)
        return

    surum_kontrol()
    model = a["ogretmen_model"]
    try:
        model_hazirla(model)
    except OllamaHatasi as e:
        raise SystemExit(f"{e}\nOllama açık mı? (görev çubuğunda lama simgesi)")

    kaz = jsonl_oku(VERI / "korpus.jsonl")
    if arg.sinir:
        rng0 = random.Random(1)
        gruplar = defaultdict(list)
        for k in kaz:
            gruplar[k["ders"]].append(k)
        kaz = []
        while len(kaz) < arg.sinir and any(gruplar.values()):
            for g in gruplar.values():
                if g and len(kaz) < arg.sinir:
                    kaz.append(g.pop(rng0.randrange(len(g))))
    test_kaz = set(json.loads((VERI / "test_kazanimlari.json").read_text(encoding="utf-8")))
    log(f"Öğretmen model: {model} · {len(kaz)} kazanım · paralel {a['paralel_istek']}")
    if BULUT.etkin():
        b = BULUT.ayar()[0]
        try:
            bm = BULUT.model_adi()
        except BulutHatasi as e:
            bm = f"(seçilemedi: {e})"
        log(f"Bulut öğretmen AÇIK: {bm} → {', '.join(b.get('dersler') or [])} soruları (dakikada {b.get('dakikada_istek', 5)} istek)")
    else:
        log("Bulut öğretmen kapalı (bulut_anahtari.txt yok) — tüm veri bilgisayarda üretilecek.")

    nt, nk = a["kazanim_basina_test_sorusu"], a["kazanim_basina_kavram_sorusu"]
    yerel, bulut = [], []
    for k in kaz:
        adet = nt + (1 if k["anahtar"] in test_kaz else 0)   # test kazanımında bir soru teste ayrılır
        bulutta = BULUT.etkin(k["ders"])
        g = ("test:" + k["anahtar"], lambda k=k, adet=adet, b=bulutta: gorev_test(a, k, adet, random.Random(k["anahtar"]), bulut_kolu=b))
        (bulut if bulutta else yerel).append(g)
    kol = None
    if bulut:
        # Bulut kolu (dakikada birkaç istek) yerel üretimle aynı anda çalışır; ekran kartı boşta beklemez
        kol = threading.Thread(target=calistir, args=(a, bulut, URETILEN / "test.jsonl", "Test soruları (bulut)"),
                               kwargs={"paralel": int(BULUT.ayar()[0].get("paralel", 2))}, daemon=True)
        kol.start()
    calistir(a, yerel, URETILEN / "test.jsonl", "Test soruları")
    calistir(a, [("kavram:" + k["anahtar"], lambda k=k: gorev_kavram(a, k, nk, random.Random("k" + k["anahtar"])))
                 for k in kaz], URETILEN / "kavram.jsonl", "Kavram soruları")
    if kol:
        kol.join()
        log(f"Bulut kolu bitti ({BULUT.token:,} token kullanıldı).")
    # Bulut bir sorun yüzünden yarıda kaldıysa kalan sayısal kazanımları yerel model üretir
    if bulut:
        # Bulut kapandıysa bulut kolunun atladığı görevler burada tam paralel, yerel modelle üretilir
        kalan = [(i, (lambda k=k, adet=adet: gorev_test(a, k, adet, random.Random(k["anahtar"]))))
                 for k in kaz for adet in [nt + (1 if k["anahtar"] in test_kaz else 0)] for i in ["test:" + k["anahtar"]]]
        calistir(a, kalan, URETILEN / "test.jsonl", "Test soruları (kalan, yerel)")

    n_analiz = a["deneme_analizi_sayisi"] if not arg.sinir else max(5, arg.sinir // 2)
    calistir(a, [(f"analiz:{n}", lambda n=n: gorev_analiz(a, n)) for n in range(n_analiz)],
             URETILEN / "analiz.jsonl", "Deneme analizleri")

    # Sokratik: doğrulanmış bir test sorusu olan kazanımların bir kısmı (test kazanımları hariç)
    testler = {r["anahtar"]: r for r in jsonl_oku(URETILEN / "test.jsonl")}
    rng = random.Random(5)
    kume = [k for k in kaz if k["anahtar"] not in test_kaz and any(s.get("gecti") for s in testler.get(k["anahtar"], {}).get("sorular", []))]
    rng.shuffle(kume)
    kume = kume[:max(1, int(len(kaz) * a["sokratik_oran"]))]
    calistir(a, [("sokratik:" + k["anahtar"],
                  lambda k=k: gorev_sokratik(a, k, next(s for s in testler[k["anahtar"]]["sorular"] if s.get("gecti"))))
                 for k in kume], URETILEN / "sokratik.jsonl", "Sokratik diyaloglar")

    birlestir(a)


if __name__ == "__main__":
    main()
