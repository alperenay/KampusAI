"""ÖSYM YKS kitapçıklarından (PDF) soruları ve cevap anahtarını ayıklar — yalnızca TEST içindir.

Sorular ÖSYM'nin telif hakkı altındadır: çıktı yalnızca bu bilgisayarda kalır (veri/yks/ — GitHub'a gönderilmez),
eğitimde ya da uygulamada kullanılmaz.

Her soru için:
  - metin   : sorunun düz yazısı (filigran ayıklanmış)
  - gorsel  : şekil, grafik, tablo ya da altı çizili ifade varsa sorunun ekran görüntüsü (PNG). Model bu soruyu
              öğrencinin çektiği fotoğraf gibi görür.
  - cevap   : cevap anahtarındaki doğru şık

Kullanım:  python yks_ayikla.py <pdf klasörü> [çıktı klasörü]
           (klasördeki "2026 tyt.pdf", "2025 ayt.pdf" gibi tüm dosyalar)
"""
import json
import re
import sys
from pathlib import Path

import pdfplumber

BOLUMLER = {
    "TYT": [("TÜR", "Türkçe"), ("SOS", "Sosyal Bilimler"), ("TEM", "Temel Matematik"), ("FEN", "Fen Bilimleri")],
    "AYT": [("TDE-SB1", "Türk Dili ve Edebiyatı-Sosyal Bilimler-1"), ("SB2", "Sosyal Bilimler-2"),
            ("MAT", "Matematik"), ("FEN", "Fen Bilimleri")],
}
SAYFA_KODU = re.compile(r"^(\d{4})-(TYT|AYT)/([A-ZÇĞİÖŞÜ0-9-]+)$")
SORU_NO = re.compile(r"^(\d{1,2})\.$")


def duz(obj):
    """Filigran (eğik yazı) karakterlerini ele."""
    if obj.get("object_type") != "char":
        return True
    m = obj.get("matrix") or (1, 0, 0, 1, 0, 0)
    return abs(m[1]) < 0.01 and abs(m[2]) < 0.01


def cevap_anahtari(pdf, sinav):
    """Son sayfalardaki tabloyu okur: {bölüm_kodu: {soru_no: harf}}"""
    for sayfa in reversed(pdf.pages[-3:]):
        s = sayfa.filter(duz)
        metin = s.extract_text() or ""
        if "TESTİ" not in metin or not re.search(r"\b1\.\s+[A-E]\b", metin):
            continue
        kelimeler = s.extract_words()
        ciftler = []
        for i, w in enumerate(kelimeler[:-1]):
            m = SORU_NO.match(w["text"])
            if m and re.fullmatch(r"[A-E]", kelimeler[i + 1]["text"]) and abs(kelimeler[i + 1]["top"] - w["top"]) < 3:
                ciftler.append((w["x0"], int(m.group(1)), kelimeler[i + 1]["text"]))
        # Sütunlara ayır: x konumlarındaki büyük boşluklar
        xs = sorted({round(x) for x, _, _ in ciftler})
        sinirlar, onceki = [], None
        for x in xs:
            if onceki is not None and x - onceki > 40:
                sinirlar.append((onceki + x) / 2)
            onceki = x
        anahtar = {}
        for x, no, harf in ciftler:
            sutun = sum(1 for b in sinirlar if x > b)
            kod = BOLUMLER[sinav][sutun][0] if sutun < len(BOLUMLER[sinav]) else f"S{sutun}"
            anahtar.setdefault(kod, {})[no] = harf
        return anahtar
    raise SystemExit("Cevap anahtarı bulunamadı")


def sorular(pdf, sinav, yil, cikti, anahtar):
    kayitlar = []
    gorsel_klasoru = cikti / "gorseller"
    gorsel_klasoru.mkdir(parents=True, exist_ok=True)
    for sn, sayfa in enumerate(pdf.pages):
        s = sayfa.filter(duz)
        kelimeler = s.extract_words()
        kod = next((SAYFA_KODU.match(w["text"]) for w in kelimeler[:6] if SAYFA_KODU.match(w["text"])), None)
        if not kod or kod.group(2) != sinav:
            continue
        bolum = kod.group(3)
        orta = sayfa.width / 2
        adaylar = [w for w in kelimeler if SORU_NO.match(w["text"]) and w["top"] > 60]
        # Soru numarası sütunun en solundadır: her sütunda en küçük x'e yakın olanlar
        secilen = []
        for sol in (True, False):
            grup = [w for w in adaylar if (w["x0"] < orta) == sol]
            if not grup:
                continue
            kenar = min(w["x0"] for w in grup)
            secilen += [dict(w, sol=sol) for w in grup if w["x0"] - kenar < 8]
        # Sayfa altındaki tam genişlik çizgi (alt bilgi) sorunun parçası değildir
        altlar = [l["top"] for l in sayfa.lines + sayfa.rects
                  if (l["x1"] - l["x0"]) > sayfa.width * 0.7 and l["top"] > sayfa.height * 0.75]
        alt = (min(altlar) - 2) if altlar else sayfa.height - 45
        for w in secilen:
            ayni = sorted([v for v in secilen if v["sol"] == w["sol"] and v["top"] > w["top"] + 5], key=lambda v: v["top"])
            bitis = (ayni[0]["top"] - 3) if ayni else alt
            x0, x1 = (20, orta - 2) if w["sol"] else (orta + 2, sayfa.width - 20)
            kutu = (x0, max(0, w["top"] - 3), x1, bitis)
            parca = sayfa.crop(kutu)
            metin = (parca.filter(duz).extract_text() or "").strip()
            no = int(SORU_NO.match(w["text"]).group(1))
            if re.search(r"^\d+\.\s*(Bu testte|Cevaplar[ıi]n[ıi]z[ıi])", metin):
                continue      # testin başındaki açıklama maddeleri
            cizgi = [l for l in parca.lines + parca.rects if (l["x1"] - l["x0"]) > 15 or (l["bottom"] - l["top"]) > 15]
            sekil = bool(parca.images or parca.curves or cizgi)
            kimlik = f"{yil}-{sinav}-{bolum}-{no:02d}"
            gorsel = None
            if sekil:
                gorsel = f"gorseller/{kimlik}.png"
                parca.to_image(resolution=150).save(str(cikti / gorsel))
            kayitlar.append({"id": kimlik, "yil": int(yil), "sinav": sinav, "bolum": bolum, "no": no, "sayfa": sn + 1,
                             "metin": metin, "gorsel": gorsel, "cevap": anahtar.get(bolum, {}).get(no)})
    return kayitlar


def main():
    if len(sys.argv) > 1:
        kaynak = Path(sys.argv[1])
    else:   # Masaüstündeki YKS klasörü (OneDrive'lı ya da değil)
        ev = Path.home()
        adaylar = [ev / "OneDrive" / "Masaüstü" / "YKS", ev / "OneDrive" / "Desktop" / "YKS", ev / "Desktop" / "YKS",
                   ev / "Masaüstü" / "YKS"]
        kaynak = next((k for k in adaylar if k.exists()), None)
        if not kaynak:
            raise SystemExit("YKS klasörü bulunamadı. Masaüstünde 'YKS' klasörü oluşturup PDF'leri içine koyun.")
    print("PDF klasörü:", kaynak)
    cikti = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parents[1] / "veri" / "yks"
    cikti.mkdir(parents=True, exist_ok=True)
    hepsi = []
    for dosya in sorted(kaynak.rglob("*.pdf")):
        m = re.search(r"(\d{4})\s*(tyt|ayt)", dosya.name, flags=re.I)
        if not m:
            continue
        yil, sinav = m.group(1), m.group(2).upper()
        with pdfplumber.open(dosya) as pdf:
            anahtar = cevap_anahtari(pdf, sinav)
            kayit = sorular(pdf, sinav, yil, cikti, anahtar)
        eksik = [k["id"] for k in kayit if not k["cevap"]]
        beklenen = sum(len(v) for v in anahtar.values())
        print(f"{dosya.name}: {len(kayit)} soru (anahtarda {beklenen}), şekilli {sum(1 for k in kayit if k['gorsel'])}, "
              f"cevabı eşleşmeyen {len(eksik)} {eksik[:5]}")
        hepsi += kayit
    with open(cikti / "sorular.jsonl", "w", encoding="utf-8") as f:
        for k in hepsi:
            f.write(json.dumps(k, ensure_ascii=False) + "\n")
    print("Toplam", len(hepsi), "soru →", cikti / "sorular.jsonl")


if __name__ == "__main__":
    main()
