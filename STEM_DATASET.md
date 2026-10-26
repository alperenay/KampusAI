# Sayısal Asistan: veri temizliği ve eğitim kaydı

Bu çalışma kullanıcıya ait Qwen2.5-3B-Instruct türevinin devam eğitimidir. **Built with Qwen.** Model ağırlıkları Qwen RESEARCH LICENSE koşullarına tabidir; ticari kullanım izni içermez. Özgün veri ve model yerinde korunur; yeni çıktılar `egitim/veri`, `egitim/cikti`, `egitim/dagitim` altında ayrı sürümlerdir ve Git'e eklenmez.

## Veri yaklaşımı

- Özgün dosya: 24.000 kayıt; 3.807 tam farklı kayıt, 20.193 tam tekrar. SHA256: `6406f70db743eafdd52f3addd9c8b72af315f1941c228e21154907299a98b90c`.
- Yeni müfredat üreticisi: dört derste 72 farklı formül/kavram ailesi. Sayı değişimleri ayrı konu sayılmaz. Çözümler başka bir modelden üretilmez; açık varsayımlar, hesaplanan hedefler ve SymPy ile ikinci aritmetik kontrol kullanılır.
- Özgün becerilerden 217 örnek soru ve cevap birlikte ayrıştırılarak yeniden doğrulanır. Aynı kavram ve parametrelerin farklı cümleleri birleştirilir; aile başına en çok 48 örnek tutulur. Desteklenmeyen ayrıştırma kalıpları yanlış ilan edilmeden dışarıda bırakılır.
- Net kuvvet, başlangıç hızı, çift zincirli DNA'nın tamamı, sınırlayıcı bileşen ve hücre ölümü gibi belirsiz varsayımlar açıklaştırılır. Türev, denklem kökleri ve ters yönde fizik hesapları korunur.
- Son eğitim kümesi 2.127 örnektir. 32 doğrulama ve 48 nihai test sorusu **tamamen farklı kavram/formül ailelerindendir**; eğitim/erken durdurmaya nihai test verilmez. Ek 12 eksik-girdi örneği, okunamayan görseller ve eksik sayılar için sonuç uydurmayı reddetmeyi öğretir.
- Daha az satır bilinçli seçimdir: tekrar hacmi yerine kavram çeşitliliği, hesap doğruluğu ve tekrarlanabilirlik hedeflenir. Zorluk etiketleri kalibre edilmiş psikometrik ölçüm değildir. Üretilen metinlerin tamamının pedagojik doğruluğu bağımsız uzman incelemesinden geçmiş sayılmaz.

## Tekrarlama

```powershell
python egitim/scripts/stem_dataset.py --source "../SoruAsistani/dataset_gelismis.jsonl" --out egitim/veri/stem-v2
python egitim/scripts/stem_curate.py --source "../SoruAsistani/dataset_gelismis.jsonl" --curriculum egitim/veri/stem-v2 --out egitim/veri/stem-v2-final
python egitim/scripts/stem_dataset.py --out egitim/veri/stem-v2-final --verify
python tools/stem-data-check.py
python tools/stem-evaluation-check.py
```

Özgün özel dosya yoksa ilk üretici `--source` olmadan da yeni müfredatı oluşturur. Sonraki kullanıcılar özel özgün veriyi indirmiş sayılmaz. Tam yeniden üretim için aynı kaynak ağırlıkları, tokenizer, özel veri özeti ve yazılım sürümleri gerekir.

## Eğitim ve seçim

RTX 5070 12 GB üzerinde BF16, attention projeksiyonlarında LoRA r=16/alpha=32, gradient checkpointing, etkin batch=8 ve yalnız asistan yanıtına uygulanan loss kullanılır. PAD konumları loss dışında tutulur. Hiçbir örnek sessizce kesilmez; 1.024 token sınırını aşan örnek eğitimi açık hatayla durdurur.

İlk aşama yeni müfredatta iki epoch çalışır ve doğrulama loss'u en düşük checkpoint'i korur. İkinci aşama doğrulanmış özgün becerileri de içeren son kümeyi bir epoch işler. Ara checkpoint'ler, adaptörler, birleştirilmiş modeller ve günlükler ayrı saklanır. Özgün Safetensors SHA256: `ba2762aa99372c73874b6a59fd59eb1a01c02531ea9842190013439987099da9`.

```powershell
python egitim/scripts/stem_train.py --base ../SoruAsistani/qwen_gelismis_model --data egitim/veri/stem-v2 --out egitim/cikti/stem-v2 --epochs 2
python egitim/scripts/stem_train.py --base egitim/cikti/stem-v2/merged --data egitim/veri/stem-v2-final --out egitim/cikti/stem-v2-final --epochs 1 --batch-size 2
```

Gerçek sonuçlar eğitim raporları ve yayınlanan model kartında belirtilir. Bu belge bir eğitimin tamamlandığını tek başına kanıtlamaz.

## Başarı ölçümünün sınırı

`stem_evaluate.py`, gerçek Ollama yanıtındaki **açık Sonuç satırının sayısal değerini** bağımsız hedefle karşılaştırır; kesir, negatif sayı ve bilimsel gösterim desteklenir. Aradaki bir işlemde doğru sayının geçmesi başarı sayılmaz. Bu metrik hem sonucun doğruluğunu hem çıktı protokolüne uyumu ölçer; çözümün bütün mantıksal adımlarının doğruluğunu veya gerçek sınav başarısını kanıtlamaz. Aritmetik başarı, OCR kalitesi ve kullanıcı arayüzü testleri birbirinden ayrı raporlanır.

Bu metin modeli görsel mimariye dönüştürmez. Fotoğrafı CPU'da EasyOCR okur; öğrenci metni denetledikten sonra özel model çözer. Kesir, şekil, el yazısı ve çok düşük çözünürlük için OCR doğruluğu garanti edilmez.
