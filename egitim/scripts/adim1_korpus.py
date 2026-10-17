"""Adım 1 — Konu anlatımlarını eğitim korpusuna çevirir.

Girdi : js/data/content/*.js (uygulamanın hazır notları)
Çıktı : veri/korpus.jsonl        her kazanım bir satır
        veri/tohum.jsonl         notlardaki elle yazılmış örnek sorular (eğitime girer)
        veri/test_insan.jsonl    elle yazılmış örneklerden ayrılan test soruları (eğitime GİRMEZ)
        veri/test_kazanimlari.json  üretilen test sorularının alınacağı kazanımlar
"""
import json
import random
import re
from collections import defaultdict
from pathlib import Path

from ortak import DERSLER, TR, VERI, ayarlar, baslat, html_temizle, jsonl_yaz, log


def icerik_oku(klasor):
    kazanimlar = []
    dosyalar = sorted(Path(klasor).glob("*.js"))
    if not dosyalar:
        raise SystemExit(f"İçerik bulunamadı: {klasor}  (ayarlar.json → icerik_klasoru)")
    for f in dosyalar:
        s = f.read_text(encoding="utf-8")
        m = re.search(r'App\.data\.content\[\s*"([^"]+)"\s*\]\s*=\s*', s)
        if not m:
            log("Atlandı (biçim tanınmadı):", f.name)
            continue
        anahtar = m.group(1)
        sinif, ders = anahtar.split("/")
        govde = s[m.end():].strip().rstrip(";").strip()
        try:
            uniteler = json.loads(govde)
        except json.JSONDecodeError as e:
            log("Atlandı (JSON hatası):", f.name, e)
            continue
        for u in uniteler:
            for k in u.get("outcomes", []):
                c = k.get("content") or {}
                if not TR(c.get("anlatim")).strip():
                    continue
                kazanimlar.append({
                    "anahtar": f"{sinif}/{ders}/{u['id']}/{k['id']}",
                    "sinif": sinif,
                    "ders": ders,
                    "ders_adi": DERSLER.get(ders, ders),
                    "unite": TR(u.get("name")),
                    "baslik": TR(k.get("title")),
                    "kod": k.get("code") or "",
                    "anlatim": html_temizle(TR(c.get("anlatim"))),
                    "ornekler": [{"soru": html_temizle(TR(o.get("soru"))), "cozum": html_temizle(TR(o.get("cozum")))}
                                 for o in (c.get("ornekler") or []) if TR(o.get("soru")).strip()],
                    "ozet": [html_temizle(TR(x)) for x in (c.get("ozet") or [])],
                })
    return kazanimlar


def yol(k):
    return f"{k['sinif']}. Sınıf › {k['ders_adi']} › {k['unite']} › {k['baslik']}"


def main():
    baslat("adim1_korpus")
    a = ayarlar()
    rng = random.Random(2026)
    kaz = icerik_oku(a["icerik_klasoru"])
    for k in kaz:
        k["yol"] = yol(k)
    jsonl_yaz(VERI / "korpus.jsonl", kaz)

    # Elle yazılmış örnekleri derse göre dengeli şekilde test / eğitim olarak ayır
    tum = [(k, i) for k in kaz for i in range(len(k["ornekler"]))]
    ders_grubu = defaultdict(list)
    for k, i in tum:
        ders_grubu[k["ders"]].append((k, i))
    for g in ders_grubu.values():
        rng.shuffle(g)
    hedef = min(a["insan_test_sorusu"], len(tum) // 5)
    test = set()
    while len(test) < hedef:
        ilerledi = False
        for g in ders_grubu.values():
            if g and len(test) < hedef:
                k, i = g.pop()
                test.add((k["anahtar"], i))
                ilerledi = True
        if not ilerledi:
            break

    tohum, test_insan = [], []
    for k, i in tum:
        o = k["ornekler"][i]
        kayit = {"anahtar": k["anahtar"], "ders": k["ders"], "sinif": k["sinif"], "yol": k["yol"],
                 "soru": o["soru"], "cozum": o["cozum"]}
        (test_insan if (k["anahtar"], i) in test else tohum).append(kayit)
    jsonl_yaz(VERI / "tohum.jsonl", tohum)
    jsonl_yaz(VERI / "test_insan.jsonl", test_insan)

    # Üretilen sorulardan test yapılacak kazanımlar (her dersten dengeli)
    kaz_grubu = defaultdict(list)
    for k in kaz:
        kaz_grubu[k["ders"]].append(k["anahtar"])
    for g in kaz_grubu.values():
        rng.shuffle(g)
    secilen = []
    while len(secilen) < min(a["test_icin_ayrilan_kazanim"], len(kaz)):
        for g in kaz_grubu.values():
            if g and len(secilen) < a["test_icin_ayrilan_kazanim"]:
                secilen.append(g.pop())
        if not any(kaz_grubu.values()):
            break
    (VERI / "test_kazanimlari.json").write_text(json.dumps(sorted(secilen), ensure_ascii=False, indent=1), encoding="utf-8")

    karakter = sum(len(k["anlatim"]) for k in kaz)
    log(f"{len(kaz)} kazanım okundu ({len(set(k['ders'] for k in kaz))} ders, {karakter:,} karakter anlatım).")
    log(f"Elle yazılmış örnek: {len(tum)} → eğitime {len(tohum)}, teste {len(test_insan)}.")
    log(f"Üretilen test sorusu alınacak kazanım: {len(secilen)}.")


if __name__ == "__main__":
    main()
