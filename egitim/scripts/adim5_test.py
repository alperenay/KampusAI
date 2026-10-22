"""Adım 5 — Modelleri eğitimde hiç görülmemiş sorularla karşılaştırır.

Test setleri
  test_uretilen : doğrulanmış çoktan seçmeli sorular (eğitime alınmadı) → şık doğruluğu
  test_insan    : notlardaki elle yazılmış örnek sorular (eğitime alınmadı) → hakem model
                  yanıtı referans çözümle karşılaştırır: DOĞRU (1) / KISMEN (0,5) / YANLIŞ (0)
Hakem hangi modelin yanıtını değerlendirdiğini bilmez.

Çıktı: rapor/test_raporu.md, rapor/sonuclar.json
Yanıtlar rapor/cevaplar/ altında saklanır; yeni model eklenince yalnızca o model test edilir.

Kullanım
  python adim5_test.py                 ayarlar.json'daki tüm modeller
  python adim5_test.py --hizli         her setten 30 soru (hızlı kontrol)
  python adim5_test.py --model kampusai --model qwen3.5:9b
"""
import argparse
from pathlib import Path
import hashlib
import json
import re
import time
from collections import defaultdict

from ortak import (DERSLER, RAPOR, VERI, OllamaHatasi, ayarlar, cevap_harfi, etiket, jsonl_ekle, jsonl_oku, log, ollama_ac,
                   baslat, model_hazirla, model_yuklu_mu, ollama_istek, ollama_sohbet, sistem_istemi)

HAKEM_SISTEM = ("Sen tarafsız bir HAKEM öğretmensin. Bir öğrenci sorusuna verilen yanıtı, öğretmenin referans "
                "çözümüyle karşılaştırırsın. Üslup ve uzunluğa değil, sonucun ve bilginin doğruluğuna bakarsın.")


def hakem_istemi(soru, referans, yanit):
    return f"""SORU:
{soru}

REFERANS ÇÖZÜM (doğru kabul et):
{referans}

DEĞERLENDİRİLECEK YANIT:
{yanit[:4000]}

Değerlendir: Yanıt, referanstaki sonuca/bilgiye ulaşıyor mu?
- DOGRU: sonuç ve temel bilgi doğru (farklı ama doğru bir yol da olabilir)
- KISMEN: kısmen doğru, eksik ya da küçük bir hata var
- YANLIS: sonuç yanlış, konu dışı ya da yanlış bilgi içeriyor
Önce bir cümleyle gerekçeni yaz, sonra kararını şu biçimde ver: <KARAR>DOGRU</KARAR>"""


def acik_id(t):
    return "acik:" + t["anahtar"] + ":" + hashlib.md5(t["soru"].encode("utf-8")).hexdigest()[:8]


def bosalt(model):
    try:
        ollama_istek("/api/generate", {"model": model, "keep_alive": 0})
    except OllamaHatasi:
        pass


def yanitla(model, soru):
    bas = time.time()
    metin, ist = ollama_sohbet(model, [{"role": "system", "content": sistem_istemi()}, {"role": "user", "content": soru}],
                               sicaklik=0.0, max_token=1500)
    return {"yanit": metin, "token": ist["token"], "sure": ist["sure"] or (time.time() - bas)}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--hizli", action="store_true")
    p.add_argument("--model", action="append")
    p.add_argument("--hakem", help="açık uçlu cevapları puanlayan model (adaylardan biri olmamalı)")
    p.add_argument("--rapor", default="test_raporu.md", help="rapor dosyasının adı (rapor/ altında)")
    p.add_argument("--indir", action="store_true", help="yüklü olmayan modelleri Ollama'dan indir")
    arg = p.parse_args()
    baslat("adim5_test")
    a = ayarlar()
    ollama_ac()
    modeller = arg.model or a["karsilastirilacak_modeller"]
    mc = jsonl_oku(VERI / "test_uretilen.jsonl")
    acik = jsonl_oku(VERI / "test_insan.jsonl") + jsonl_oku(VERI / "test_geri_bildirim.jsonl")  # uygulamadan gelen hata bildirimleri (geri_bildirim.py)
    if not mc and not acik:
        raise SystemExit("Test seti yok. Önce adım 1 ve 2'yi çalıştırın.")
    if arg.hizli:
        mc, acik = mc[::max(1, len(mc) // 30)][:30], acik[::max(1, len(acik) // 30)][:30]  # dersler dengeli kalsın
    hakem = arg.hakem or a["hakem_model"]
    if arg.indir:
        for m in modeller:
            model_hazirla(m)
    if acik:
        model_hazirla(hakem)
    if a["temel_ollama_model"] in modeller:
        model_hazirla(a["temel_ollama_model"])

    klasor = RAPOR / "cevaplar"
    sonuc = {}
    for model in modeller:
        if not model_yuklu_mu(model):
            log(f"ATLANDI: '{model}' yüklü değil.")
            continue
        dosya = klasor / (re.sub(r"[^\w.-]", "_", model) + ".jsonl")
        onceki = {r["id"]: r for r in jsonl_oku(dosya)}
        log(f"=== {model}: {len(mc)} çoktan seçmeli + {len(acik)} açık uçlu soru (önceden {len(onceki)} yanıt var)")
        for i, t in enumerate(mc):
            tid = f"mc:{t['anahtar']}"
            if tid in onceki:
                continue
            r = yanitla(model, t["soru"])
            r.update(id=tid, ders=t["ders"], harf=cevap_harfi(r["yanit"]), dogru=t["cevap"])
            r["puan"] = 1.0 if r["harf"] == t["cevap"] else 0.0
            jsonl_ekle(dosya, r)
            onceki[tid] = r
            if (i + 1) % 20 == 0:
                log(f"  çoktan seçmeli {i + 1}/{len(mc)}")
        for i, t in enumerate(acik):
            tid = acik_id(t)
            if tid in onceki:
                continue
            r = yanitla(model, t["soru"])
            r.update(id=tid, ders=t["ders"])
            onceki[tid] = r
            jsonl_ekle(dosya, r)
            if (i + 1) % 20 == 0:
                log(f"  açık uçlu {i + 1}/{len(acik)}")
        bosalt(model)
        sonuc[model] = {"dosya": dosya, "kayit": onceki}

    # Hakem (tüm modellerin yanıtları toplandıktan sonra; ekran kartında tek model kalsın diye)
    if acik:
        log(f"=== Hakem ({hakem}) açık uçlu yanıtları değerlendiriyor")
        soru_ref = {acik_id(t): t for t in acik}
        for model, s in sonuc.items():
            degisti = False
            for tid, r in s["kayit"].items():
                if not tid.startswith("acik:") or tid not in soru_ref:
                    continue
                if "puan" in r and r.get("hakem", a["hakem_model"]) == hakem:   # aynı hakemle zaten puanlandı
                    continue
                t = soru_ref[tid]
                k, _ = ollama_sohbet(hakem, [{"role": "system", "content": HAKEM_SISTEM},
                                             {"role": "user", "content": hakem_istemi(t["soru"], t["cozum"], r["yanit"])}],
                                     sicaklik=0.0, max_token=400)
                karar = (etiket(k, "KARAR") or "").upper()
                r["karar"] = karar
                r["puan"] = 1.0 if "DOGRU" in karar else 0.5 if "KISMEN" in karar else 0.0
                r["hakem"] = hakem
                degisti = True
            if degisti:  # puanlarla birlikte yeniden yaz
                s["dosya"].unlink(missing_ok=True)
                for r in s["kayit"].values():
                    jsonl_ekle(s["dosya"], r)
        bosalt(hakem)

    # Rapor
    mc_ids = {f"mc:{t['anahtar']}" for t in mc}
    acik_ids = set(soru_ref) if acik else set()
    ozet = {}
    for model, s in sonuc.items():
        kay = s["kayit"]
        m = [kay[i] for i in mc_ids if i in kay]
        o = [kay[i] for i in acik_ids if i in kay and "puan" in kay[i]]
        ders = defaultdict(list)
        for r in m + o:
            ders[r["ders"]].append(r["puan"])
        tok = sum(r["token"] for r in m + o)
        sure = sum(r["sure"] for r in m + o)
        ozet[model] = {
            "coktan_secmeli": round(100 * sum(r["puan"] for r in m) / len(m), 1) if m else None,
            "acik_uclu": round(100 * sum(r["puan"] for r in o) / len(o), 1) if o else None,
            "hiz_token_sn": round(tok / sure, 1) if sure else None,
            "ort_yanit_token": round(tok / max(1, len(m + o))),
            "dersler": {DERSLER.get(d, d): round(100 * sum(v) / len(v), 1) for d, v in sorted(ders.items())},
            "soru_sayisi": [len(m), len(o)],
        }
    RAPOR.mkdir(parents=True, exist_ok=True)
    (RAPOR / (Path(arg.rapor).stem + "_sonuclar.json" if arg.rapor != "test_raporu.md" else "sonuclar.json")).write_text(json.dumps(ozet, ensure_ascii=False, indent=1), encoding="utf-8")

    sat = ["# KampüsAI model karşılaştırması", "",
           f"Sorular eğitimde hiç kullanılmadı. Çoktan seçmeli: {len(mc)} soru (şık doğruluğu). "
           f"Açık uçlu: {len(acik)} soru (hakem: {hakem}, kör değerlendirme).", "",
           "| Model | Çoktan seçmeli (%) | Açık uçlu (%) | Hız (token/sn) | Ort. yanıt uzunluğu |",
           "|---|---|---|---|---|"]
    for model, z in ozet.items():
        sat.append(f"| {model} | {z['coktan_secmeli']} | {z['acik_uclu']} | {z['hiz_token_sn']} | {z['ort_yanit_token']} |")
    dersler = sorted({d for z in ozet.values() for d in z["dersler"]})
    sat += ["", "## Ders bazında (iki setin ortalaması, %)", "", "| Ders | " + " | ".join(ozet) + " |",
            "|---|" + "---|" * len(ozet)]
    for d in dersler:
        sat.append(f"| {d} | " + " | ".join(str(z["dersler"].get(d, "–")) for z in ozet.values()) + " |")
    sat += ["", "Not: Hakem model, değerlendirilen modellerden biriyle aynı aileden olabilir; küçük farkları "
                "kesin sonuç olarak yorumlamayın. Çoktan seçmeli sonuçlar hakemden bağımsızdır."]
    (RAPOR / arg.rapor).write_text("\n".join(sat) + "\n", encoding="utf-8")
    print("\n".join(sat))


if __name__ == "__main__":
    main()
