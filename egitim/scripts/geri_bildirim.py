"""Uygulamadaki yapay zekâ geri bildirimlerini (👍 / 👎 / "Soru hatalı") eğitim kitine aktarır.

Uygulamada: Ayarlar › Yapay zekâ › Yapay zekâ geri bildirimlerim › Dışa aktar (JSONL).
İndirilen dosyaları egitim/veri/geri_bildirim/ klasörüne koyup bu betiği çalıştırın:

    python geri_bildirim.py

Çıktılar
  veri/test_geri_bildirim.jsonl  👎 / hatalı bulunup "doğrusu" yazılmış örnekler → adım 5'te açık uçlu teste eklenir
                                 (hakem model, modelin yeni cevabını öğrencinin yazdığı doğruyla karşılaştırır)
  veri/iyi_ornekler.jsonl        👍 alan sohbet cevapları → istenirse ince ayar verisine eklenebilir (otomatik eklenmez)
  rapor/geri_bildirim_ozeti.md   hata türlerinin ve derslerin dağılımı
Aynı kayıt birden çok dosyada olsa da bir kez alınır."""
import glob
import hashlib
import json
from collections import Counter

from ortak import RAPOR, VERI, baslat, jsonl_oku, jsonl_yaz, log

HATA_ADI = {"bilgi": "Yanlış bilgi / çözüm", "hesap": "Hesap hatası", "anlamadi": "Soruyu yanlış anladı", "eksik": "Eksik",
            "mufredat": "Müfredat dışı", "cevap": "Cevap anahtarı yanlış", "iki-dogru": "Birden fazla doğru şık",
            "dogru-yok": "Doğru şık yok", "anlasilmiyor": "Soru anlaşılmıyor", "konu-disi": "Konu dışı", "diger": "Diğer"}


def main():
    baslat("geri_bildirim")
    klasor = VERI / "geri_bildirim"
    klasor.mkdir(parents=True, exist_ok=True)
    kayitlar, gorulen = [], set()
    for yol in sorted(glob.glob(str(klasor / "*.jsonl"))):
        for r in jsonl_oku(yol):
            if r.get("kaynak") != "kampusai-uygulama" or not r.get("soru"):
                continue
            kimlik = hashlib.sha1((str(r.get("tur")) + "|" + str(r.get("soru")) + "|" + str(r.get("model_cevabi"))).encode("utf-8")).hexdigest()[:16]
            if kimlik in gorulen:
                continue
            gorulen.add(kimlik)
            r["_id"] = kimlik
            kayitlar.append(r)
    if not kayitlar:
        raise SystemExit(f"Kayıt yok. Uygulamadan dışa aktardığınız .jsonl dosyalarını {klasor} klasörüne koyun.")

    test, iyi = [], []
    for r in kayitlar:
        kaz = r.get("kazanim") or ""
        parca = kaz.split("/")
        sinif, ders = (parca[0], parca[1]) if len(parca) >= 2 else ("", "")
        if r.get("puan") in ("down", "wrong") and (r.get("dogrusu") or "").strip():
            soru = r["soru"]
            if r.get("secenekler"):
                soru += "\n" + "\n".join(f"{'ABCDE'[i]}) {s}" for i, s in enumerate(r["secenekler"][:5]))
            test.append({"anahtar": "gb:" + r["_id"], "ders": ders, "sinif": sinif, "yol": kaz, "soru": soru,
                         "cozum": r["dogrusu"].strip(), "kaynak": "geri-bildirim", "hata": r.get("hata")})
        elif r.get("puan") == "up" and r.get("tur") == "chat" and r.get("model_cevabi"):
            iyi.append({"messages": [{"role": "user", "content": r["soru"]}, {"role": "assistant", "content": r["model_cevabi"]}],
                        "kaynak": "geri-bildirim-iyi", "model": r.get("model")})
    jsonl_yaz(VERI / "test_geri_bildirim.jsonl", test)
    jsonl_yaz(VERI / "iyi_ornekler.jsonl", iyi)

    puan = Counter(r.get("puan") for r in kayitlar)
    hata = Counter(r.get("hata") for r in kayitlar if r.get("hata"))
    ders = Counter((r.get("kazanim") or "/?").split("/")[1] if "/" in (r.get("kazanim") or "") else "sohbet" for r in kayitlar)
    RAPOR.mkdir(parents=True, exist_ok=True)
    satirlar = ["# Uygulama geri bildirim özeti", "", f"Toplam kayıt: {len(kayitlar)}",
                f"- 👍 iyi cevap: {puan.get('up', 0)}", f"- 👎 hatalı cevap: {puan.get('down', 0)}", f"- Hatalı test sorusu: {puan.get('wrong', 0)}", "",
                "## Hata türleri", ""] + [f"- {HATA_ADI.get(k, k)}: {v}" for k, v in hata.most_common()] + \
               ["", "## Ders / kaynak", ""] + [f"- {k}: {v}" for k, v in ders.most_common()] + \
               ["", f"Teste eklenen (doğrusu yazılmış) örnek: {len(test)} → veri/test_geri_bildirim.jsonl",
                f"İyi örnek (ince ayar için aday): {len(iyi)} → veri/iyi_ornekler.jsonl", ""]
    (RAPOR / "geri_bildirim_ozeti.md").write_text("\n".join(satirlar), encoding="utf-8")
    log(f"{len(kayitlar)} kayıt: teste {len(test)}, iyi örnek {len(iyi)}. Özet: {RAPOR / 'geri_bildirim_ozeti.md'}")


if __name__ == "__main__":
    main()
