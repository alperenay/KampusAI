# KampüsAI — kendi yapay zekamızı eğitme kiti

Bu klasör, uygulamadaki konu anlatımlarından eğitim verisi üretir, Google'ın açık modeli **Gemma 4 12B**'yi bu veriyle
eğitir (QLoRA ince ayar), sonucu Ollama'ya **`kampusai`** adıyla yükler ve eski modellerle karşılaştırır.
12B ekran kartına sığmazsa kit kendiliğinden **Gemma 4 E4B**'ye geçer.
Uygulama, `kampusai` bilgisayarda yüklüyse onu otomatik olarak ana model yapar. Fotoğraf okuma için de
`qwen3-vl:8b` yüklüyse onu kullanır.

## Neden bu ayarlar? (RTX 5070 · 12 GB için en güçlü kurulum)

| Karar | Neden |
|---|---|
| Gemma 4 **12B** | 12 GB'a sığan en güçlü Gemma; E4B'nin ~3 katı. Sığmazsa otomatik E4B |
| Kazanım başına 4 test + 3 kavram sorusu, 400 deneme analizi, %50 öğretmen modu | ~5.000–6.000 eğitim örneği |
| Sayısal derslerde **düşünerek doğrulama** | Matematik/fizik/kimya sorularındaki hesap hatalarını çok daha iyi yakalar |
| Ollama: 4 paralel istek + flash attention + 8-bit önbellek | Veri üretimi 2–3 kat hızlı |
| 2 epoch + **en iyi ara kaydı seçme** | Ezberlemeye başlamadan önceki en iyi nokta kullanılır |
| Göz modeli `qwen3-vl:8b` | Fotoğraftan yazı okumada açık modeller arasında en iyilerden |

Tahmini süre: veri üretimi ~6–10 saat, eğitim ~2–4 saat (deneme adımı kesin süreyi söyler).

## Hızlı başlangıç (Windows, NVIDIA ekran kartı)

`KampusAI-Egitim.bat` dosyasına çift tıklayın ve sırayla:

1. **Kurulum**: Python 3.12, PyTorch (CUDA 12.8) ve Unsloth kurulur. Bir kerelik, 20–40 dk sürer.
2. **Deneme**: 20 kazanımla küçük bir veri ve 30 adımlık eğitim. Kurulumun gerçekten çalıştığını gösterir ve tam
   eğitimin ne kadar süreceğini tahmin eder.
3. **Gece modu**: veri üretimi → eğitim → Ollama'ya yükleme → test. Yatmadan önce başlatın.

Gece modundan önce:
- Ayarlar → Sistem → Güç: uyku modunu "Hiçbir zaman" yapın. Betikler çalışırken uykuyu kendileri de engeller.
- Windows Update'i bir haftalığına duraklatın (gece yeniden başlatma eğitimi keser).
- Pencereyi kapatmayın. Kesilirse aynı seçenek **kaldığı yerden** devam eder.

İlerleme `rapor\gunluk\` klasöründeki dosyalarda görülür.

## Adımlar ve dosyalar

| Adım | Betik | Ne yapar | Çıktı |
|---|---|---|---|
| 1 | `adim1_korpus.py` | `js/data/content` notlarını okur, test sorularını ayırır | `veri/korpus.jsonl`, `veri/test_*.jsonl` |
| 2 | `adim2_veri_uret.py` | Öğretmen modelle (Ollama, `qwen3.5:9b`) soru-çözüm, kavram, öğretmen modu ve deneme analizi örnekleri üretir; her test sorusunu bağımsız ikinci bir çözümle doğrular | `veri/egitim.jsonl`, `veri/istatistik.json` |
| 3 | `adim3_egit.py` | Gemma 4 12B'yi 4-bit QLoRA ile eğitir, her 100 adımda ara kayıt alır, en iyisini seçer | `cikti/lora/`, `rapor/egitim_gunlugu.json` |
| 4 | `adim4_ollama.py` | Modeli birleştirir, q4_K_M olarak sıkıştırır, Ollama'ya `kampusai` adıyla yükler | Ollama modeli |
| 5 | `adim5_test.py` | `kampusai`, eğitilmemiş `gemma4:12b` ve `qwen2.5:14b`'yi eğitimde hiç görülmemiş sorularla karşılaştırır | `rapor/test_raporu.md` |

## Veri kalitesi önlemleri

- **Yanlış çözüm filtresi:** Her çoktan seçmeli soru, cevabı gösterilmeden ikinci kez çözdürülür. İki cevap
  uyuşmazsa soru atılır.
- **Uydurma sayı filtresi:** Deneme analizi yanıtlarında, öğrenci verisinde geçmeyen net değerleri varsa yanıt atılır.
- **Test ayrımı:** 120 elle yazılmış örnek ve 100 kazanımdan birer üretilmiş soru eğitime hiç girmez; yalnızca
  testte kullanılır.
- **Aynı istem:** Eğitim örnekleri, uygulamanın gerçekte gönderdiği sistem istemiyle (`js/ai/pipeline.js`)
  birebir aynıdır.
- Yine de **ekipçe kontrol edin**: `veri/egitim.jsonl` içinden rastgele 100–200 örneğe göz atın. Hatalı bir kalıp
  görürseniz (ör. bir derste sürekli yanlış bilgi) o dersin üretimini silip yeniden üretebiliriz.

## Ayarlar (`ayarlar.json`)

| Alan | Varsayılan | Açıklama |
|---|---|---|
| `ogretmen_model` | `qwen3.5:9b` | Veriyi üreten model (Apache 2.0 lisanslı; çıktısıyla model eğitmek serbest) |
| `paralel_istek` | 4 | Ollama'ya aynı anda gönderilen istek. Ekran kartı belleği yetmezse 2 yapın |
| `dogrulama_dusunme` | `sayisal` | `sayisal`: yalnızca mat/fizik/kimyada düşünerek doğrula · `true`: hepsinde · `false`: hiçbirinde (en hızlı) |
| `kazanim_basina_test_sorusu` | 4 | Kazanım başına üretilen çoktan seçmeli soru |
| `kazanim_basina_kavram_sorusu` | 3 | Kazanım başına öğrenci sorusu + yanıt |
| `temel_model` | `unsloth/gemma-4-12b-it` | Eğitilen model |
| `yedek_temel_model` | `unsloth/gemma-4-E4B-it` | 12B sığmazsa kullanılan model (telefonlara da sığar) |
| `goz_model` | `qwen3-vl:8b` | Ollama'ya yükleme adımında indirilen fotoğraf okuma modeli |
| `epoch` | 2 | Verinin üzerinden kaç kez geçileceği |
| `max_uzunluk` | 2048 | Bir örneğin en fazla token sayısı (12 GB ekran kartı için) |
| `karsilastirilacak_modeller` | kampusai, gemma4:12b, qwen2.5:14b | Testte karşılaştırılan modeller |

## Sorun giderme

- **"PyTorch ekran kartını görmüyor":** NVIDIA sürücüsünü güncelleyin, sonra menüden Kurulum'u tekrar çalıştırın.
- **Eğitimde "CUDA out of memory":** Denemede olursa kit kendiliğinden E4B'ye geçer. Tam eğitimde olursa
  `ayarlar.json` → `max_uzunluk` 1536 yapın, oyun/tarayıcı gibi programları kapatıp tekrar çalıştırın.
- **Telefon için ayrıca E4B istiyorsanız:** 12B eğitimi bittikten sonra `temel_model`'i `yedek_temel_model` ile,
  `ollama_model_adi`'nı `kampusai-mini` ile değiştirip "4) Eğit" ve "5) Yükle"yi çalıştırın (veri yeniden üretilmez).
- **Veri üretimi çok yavaş:** `paralel_istek` değerini düşürüp yükseltmeyi deneyin. Ollama'nın tamamen
  ekran kartında çalıştığını `ollama ps` ile kontrol edin.
- **Windows'ta Unsloth kurulamıyor:** WSL (Ubuntu) içinde aynı betikler `python3` ile çalışır.

## Lisanslar

Gemma 4 ve Qwen 3.5 Apache 2.0 lisanslıdır. Eğitim verisi, uygulamanın kendi konu anlatımlarından ve açık
lisanslı bir modelin çıktılarından üretilir. Notlarda yayınevi kitaplarından birebir alınmış metin varsa,
dağıtımdan önce kendi cümlelerinizle yeniden yazın.
