"""Adım 3 — Gemma 4 E4B'yi KampüsAI verisiyle eğitir (QLoRA, Unsloth).

Girdi : veri/egitim.jsonl
Çıktı : cikti/lora/               eğitilmiş LoRA adaptörü (küçük, ~100-200 MB)
        cikti/ara_kayitlar/       her 50 adımda ara kayıt (kesilirse buradan devam eder)
        rapor/egitim_gunlugu.json kayıp (loss) değerleri — sunum grafiği için

Kullanım
  python adim3_egit.py              tam eğitim (kesildiyse kaldığı yerden devam)
  python adim3_egit.py --deneme     30 adımlık kısa deneme (kurulum çalışıyor mu?)
  python adim3_egit.py --sifirdan   ara kayıtları silip baştan başla
"""
import argparse
import dataclasses
import json
import random
import re
import shutil
import sys
import time

from ortak import CIKTI, KIT, PROFIL, RAPOR, VERI, ayarlar, baslat, jsonl_oku, log, model_yukle, ollama_bosalt

YEDEGE_GECILDI = 3   # çıkış kodu: model sığmadı, ayarlar küçük modele çevrildi → aynı adımı tekrar çalıştırın

USER_ISARET = "<|turn>user\n"
MODEL_ISARET = "<|turn>model\n"


def sistemi_birlestir(mesajlar):
    """Şablon 'system' rolünü desteklemezse sistem metnini ilk kullanıcı mesajının başına ekler."""
    if not mesajlar or mesajlar[0]["role"] != "system":
        return mesajlar
    sis, kalan = mesajlar[0]["content"], [dict(m) for m in mesajlar[1:]]
    if kalan and kalan[0]["role"] == "user":
        kalan[0]["content"] = sis + "\n\n" + kalan[0]["content"]
    return kalan


def bellek_hatasi(e):
    return "out of memory" in str(e).lower() or type(e).__name__ == "OutOfMemoryError"


def yedege_gec(a):
    """12B ekran kartına sığmadıysa ayarlar.json'u yedek modele (E4B) çevirir. Dosyanın biçimini korur."""
    yol = KIT / "ayarlar.json"
    metin = yol.read_text(encoding="utf-8")
    eski_ollama = a["temel_ollama_model"]
    metin = re.sub(r'("temel_model"\s*:\s*)"[^"]*"', lambda m: m.group(1) + json.dumps(a["yedek_temel_model"]), metin)
    metin = re.sub(r'("temel_ollama_model"\s*:\s*)"[^"]*"', lambda m: m.group(1) + json.dumps(a["yedek_temel_ollama_model"]), metin)
    metin = metin.replace(json.dumps(eski_ollama), json.dumps(a["yedek_temel_ollama_model"]))
    json.loads(metin)
    yol.write_text(metin, encoding="utf-8")
    log(f"ayarlar.json güncellendi: temel model artık {a['yedek_temel_model']}.")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--deneme", action="store_true")
    p.add_argument("--sifirdan", action="store_true")
    arg = p.parse_args()
    baslat("adim3_egitim")
    a = ayarlar()

    veri_yolu = VERI / "egitim.jsonl"
    satirlar = jsonl_oku(veri_yolu)
    if not satirlar:
        raise SystemExit("veri/egitim.jsonl yok. Önce adım 2'yi (veri üretimi) çalıştırın.")
    if len(satirlar) < 1500 and not arg.deneme:
        log(f"UYARI: yalnızca {len(satirlar)} örnek var; veri üretimi tamamlanmamış olabilir.")

    ollama_bosalt()  # ekran kartındaki Ollama modellerini boşalt

    import torch
    if not torch.cuda.is_available():
        raise SystemExit("PyTorch ekran kartını görmüyor. 'Kurulum' adımını tekrar çalıştırın.")
    gpu = torch.cuda.get_device_properties(0)
    log(f"Ekran kartı: {gpu.name} · {gpu.total_memory / 2**30:.1f} GB")

    from unsloth import FastModel, is_bf16_supported
    from unsloth.chat_templates import get_chat_template, train_on_responses_only
    from datasets import Dataset
    from trl import SFTConfig, SFTTrainer

    max_len = int(a["max_uzunluk"])
    yedek_var = a.get("yedek_temel_model") and a["yedek_temel_model"] != a["temel_model"]
    log("Temel model yükleniyor:", a["temel_model"], "(ilk seferde indirilir, birkaç GB)")
    try:
        model, tokenizer = model_yukle(
            FastModel, model_name=a["temel_model"], max_seq_length=max_len, load_in_4bit=True, full_finetuning=False, dtype=None)
    except Exception as e:
        if bellek_hatasi(e) and yedek_var:
            log("Model ekran kartı belleğine sığmadı:", repr(e)[:200])
            yedege_gec(a)
            return YEDEGE_GECILDI
        raise
    model = FastModel.get_peft_model(
        model,
        finetune_vision_layers=False,      # görme katmanlarına dokunma: fotoğrafları ayrı "göz" modeli okur
        finetune_language_layers=True,
        finetune_attention_modules=True,
        finetune_mlp_modules=True,
        r=int(a["lora_r"]), lora_alpha=int(a["lora_r"]), lora_dropout=0, bias="none", random_state=3407)
    tokenizer = get_chat_template(tokenizer, chat_template="gemma-4")

    def yaz(mesajlar):
        return tokenizer.apply_chat_template(mesajlar, tokenize=False, add_generation_prompt=False).removeprefix("<bos>")

    try:
        ornek = yaz(satirlar[0]["messages"])
        donustur = lambda m: m
    except Exception as e:
        log("Şablon sistem rolünü kabul etmedi, sistem metni kullanıcı mesajına eklenecek:", e)
        donustur = sistemi_birlestir
        ornek = yaz(donustur(satirlar[0]["messages"]))

    metinler = [yaz(donustur(r["messages"])) for r in satirlar]
    tok = getattr(tokenizer, "tokenizer", tokenizer)
    uzunluk = [len(tok(t, add_special_tokens=False)["input_ids"]) for t in metinler]
    cift = [(t, n) for t, n in zip(metinler, uzunluk) if n <= max_len]
    tut = [t for t, _ in cift]
    log(f"{len(tut)} örnek eğitime alınıyor ({len(metinler) - len(tut)} tanesi {max_len} tokeni aştığı için çıkarıldı). "
        f"Ortalama uzunluk {sum(uzunluk) / len(uzunluk):.0f} token.")

    if arg.deneme:
        # Denemede en uzun 20 örnek MUTLAKA bulunur: bellek sınırı gece değil, şimdi ortaya çıksın
        sirali = sorted(cift, key=lambda x: -x[1])
        kalan = sirali[20:]
        random.Random(1).shuffle(kalan)
        secilen = [t for t, _ in sirali[:20] + kalan[:180]]
        egitim = Dataset.from_dict({"text": secilen})
        degerlendirme = Dataset.from_dict({"text": [t for t, _ in kalan[180:200]] or secilen[:5]})
        log(f"Deneme: en uzun örnek {sirali[0][1]} token.")
    else:
        ds = Dataset.from_dict({"text": tut}).train_test_split(test_size=0.03, seed=3407)
        egitim, degerlendirme = ds["train"], ds["test"]

    ara = CIKTI / ("deneme_kayitlar" if arg.deneme else "ara_kayitlar")
    if arg.sifirdan or arg.deneme:
        shutil.rmtree(ara, ignore_errors=True)
    devam = ara.exists() and any(ara.glob("checkpoint-*"))

    bf16 = is_bf16_supported()
    alanlar = {f.name for f in dataclasses.fields(SFTConfig)}
    ayar = dict(
        dataset_text_field="text",
        per_device_train_batch_size=int(a["batch"]),
        per_device_eval_batch_size=1,
        gradient_accumulation_steps=int(a["gradyan_biriktirme"]),
        learning_rate=float(a["ogrenme_hizi"]),
        warmup_ratio=0.03,
        lr_scheduler_type="linear",
        optim="adamw_8bit",
        weight_decay=0.01,
        logging_steps=5,
        save_strategy="no" if arg.deneme else "steps",
        save_steps=int(a["kayit_adimi"]),
        save_total_limit=3,
        eval_strategy="steps",
        eval_steps=15 if arg.deneme else int(a["kayit_adimi"]),
        # Eğitim sonunda en düşük doğrulama kaybına sahip ara kayıt kullanılır (aşırı ezberlemeye karşı)
        load_best_model_at_end=not arg.deneme,
        metric_for_best_model="eval_loss",
        greater_is_better=False,
        output_dir=str(ara),
        report_to="none",
        seed=3407,
        bf16=bf16,
        fp16=not bf16,
        dataset_num_proc=1,            # Windows'ta çoklu işlem sorun çıkarıyor
    )
    if arg.deneme:
        ayar["max_steps"] = 30
    else:
        ayar["num_train_epochs"] = float(a["epoch"])
    ayar["max_length" if "max_length" in alanlar else "max_seq_length"] = max_len
    ayar = {k: v for k, v in ayar.items() if k in alanlar}

    try:
        trainer = SFTTrainer(model=model, tokenizer=tokenizer, train_dataset=egitim, eval_dataset=degerlendirme,
                             args=SFTConfig(**ayar))
    except TypeError:  # yeni TRL sürümlerinde parametrenin adı processing_class
        trainer = SFTTrainer(model=model, processing_class=tokenizer, train_dataset=egitim, eval_dataset=degerlendirme,
                             args=SFTConfig(**ayar))
    if USER_ISARET in ornek and MODEL_ISARET in ornek:
        trainer = train_on_responses_only(trainer, instruction_part=USER_ISARET, response_part=MODEL_ISARET)
        log("Yalnızca öğretmen yanıtları üzerinden öğrenilecek (öğrenci mesajları maskelendi).")
    else:
        log("UYARI: sohbet işaretleri bulunamadı; tüm metin üzerinden eğitilecek.")

    toplam = len(egitim) * (1 if arg.deneme else float(a["epoch"])) / (int(a["batch"]) * int(a["gradyan_biriktirme"]))
    log(f"Eğitim başlıyor: ~{int(ayar.get('max_steps') or toplam)} adım. "
        + ("Not: E4B'de başlangıç kaybının 10-15 civarı olması normaldir; " if "E4B" in a["temel_model"].upper() or "E2B" in a["temel_model"].upper() else "")
        + "Önemli olan kaybın düşmesidir.")
    if devam:
        log("Önceki ara kayıt bulundu, kaldığı yerden devam ediliyor:", ara)
    bas = time.time()
    try:
        trainer.train(resume_from_checkpoint=True if devam else None)
    except Exception as e:
        if not bellek_hatasi(e):
            raise
        log("EKRAN KARTI BELLEĞİ YETMEDİ:", repr(e)[:200])
        if arg.deneme and yedek_var:
            yedege_gec(a)
            return YEDEGE_GECILDI
        if PROFIL == "pro":
            raise SystemExit("12B (Pro) bu ekran kartına sığmadı. Ana model (E4B) zaten herkes için yeterli; "
                             "Pro sürüm isteğe bağlıdır.")
        raise SystemExit("Bellek yetmedi. ayarlar.json → max_uzunluk değerini 1536 yapıp tekrar çalıştırın "
                         "(ara kayıtlar korunur). Çalışan diğer programları (oyun, tarayıcı) kapatın.")
    sure = (time.time() - bas) / 60
    log(f"Eğitim bitti: {sure:.0f} dakika.")

    RAPOR.mkdir(parents=True, exist_ok=True)
    gunluk = [x for x in trainer.state.log_history if "loss" in x or "eval_loss" in x]
    (RAPOR / ("deneme_gunlugu.json" if arg.deneme else "egitim_gunlugu.json")).write_text(
        json.dumps({"sure_dk": round(sure, 1), "ornek": len(egitim), "gunluk": gunluk}, indent=1), encoding="utf-8")

    if arg.deneme:
        kayip = [x["loss"] for x in gunluk if "loss" in x]
        if kayip:
            log(f"Deneme kaybı: {kayip[0]:.2f} → {kayip[-1]:.2f}")
        hiz = sure * 60 / 30
        tam = len(tut) * 0.97 * float(a["epoch"]) / (int(a["batch"]) * int(a["gradyan_biriktirme"]))
        bellek = torch.cuda.max_memory_reserved() / 2**30
        log(f"DENEME BAŞARILI ({a['temel_model']}). En yüksek bellek {bellek:.1f} GB. "
            f"Adım başına ~{hiz:.1f} sn → tam eğitim tahmini ~{hiz * tam / 60:.0f} dakika (veri tam üretildiğinde).")
        shutil.rmtree(ara, ignore_errors=True)
        return

    hedef = CIKTI / "lora"
    model.save_pretrained(str(hedef))
    tokenizer.save_pretrained(str(hedef))
    log("LoRA adaptörü kaydedildi:", hedef)
    log("Sıradaki adım: Ollama'ya yükle.")


if __name__ == "__main__":
    sys.exit(main())
