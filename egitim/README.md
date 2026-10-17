# KampüsAI — kendi yapay zekamızı eğitme kiti

Bu klasör, uygulamadaki konu anlatımlarından eğitim verisi üretir, Google'ın açık modeli **Gemma 4 E4B**'yi bu veriyle
eğitir (QLoRA ince ayar) ve sonucu iki şekilde paketler:

- **Herkes için** (`dagitim/`): llama.cpp ile çalışan ~2,5 GB'lık GGUF model + fotoğraf/ses projektörü. Telefon
  (6–8 GB RAM) ve bilgisayar uygulaması bunu bir kez indirip **internetsiz** çalıştırır. "Yayınla" adımı bu
  dosyaları Hugging Face'e yükler.
- **Bu bilgisayar için:** Ollama'ya `kampusai` adıyla yüklenir; uygulama yüklü görünce otomatik kullanır.

İsteğe bağlı **Pro sürüm** (menü 10): aynı veriyle Gemma 4 12B eğitilir (`kampusai-pro`). Yalnızca güçlü ekran
kartlı bilgisayarlar için; telefonda çalışmaz.

## Neden bu kararlar?

| Karar | Neden |
|---|---|
| Ana model Gemma 4 **E4B** | Telefonda ve sıradan bilgisayarda çalışan, fotoğraf ve sesi de anlayan en güçlü açık model. Herkes kullanabilsin diye |
| 12B yalnızca isteğe bağlı Pro | Daha güçlü ama telefona sığmaz; ekran kartı ister |
| Kazanım başına 4 test + 3 kavram sorusu, 400 deneme analizi, %50 öğretmen modu | ~5.000–6.000 eğitim örneği |
| Sayısal derslerde **düşünerek doğrulama** | Matematik/fizik/kimya sorularındaki hesap hatalarını çok daha iyi yakalar |
| Ollama: 4 paralel istek + flash attention + 8-bit önbellek | Veri üretimi 2–3 kat hızlı |
| 2 epoch + **en iyi ara kaydı seçme** | Ezberlemeye başlamadan önceki en iyi nokta kullanılır |
| Görsel/ses katmanları eğitilmez | Temel modelin projektörü uyumlu kalır; fotoğraf ve ses yetenekleri korunur |
| İsteğe bağlı, ücretsiz bulut öğretmen: NVIDIA Build **gpt-oss-120b** | 11 dersin test sorularını 120B'lik model yazar, bilgisayardaki farklı model doğrular |

Tahmini süre: veri üretimi ~6–10 saat, eğitim ~1–2 saat, paketleme ~1 saat (deneme adımı kesin süreyi söyler).

## Hızlı başlangıç (Windows, NVIDIA ekran kartı)

`KampusAI-Egitim.bat` menüsünü açın ya da kısayollara doğrudan çift tıklayın (`1-KURULUM.bat`, `2-DENEME.bat`,
`7-GECE-MODU.bat`, `8-KONTROL.bat`). Sırayla:

1. **Kurulum**: Python 3.12, PyTorch (CUDA 12.8), Unsloth ve gereken Ollama modelleri (`qwen3.5:9b`,
   `gemma4:e4b`, `qwen3-vl:8b`) kurulur. Bir kerelik, internet hızına göre 30–60 dk sürer.
   (İsteğe bağlı) **9) Bulut anahtarı**: aşağıdaki "Bulut öğretmen" bölümüne bakın.
2. **Deneme**: 20 kazanımla küçük bir veri ve 30 adımlık eğitim. Kurulumun gerçekten çalıştığını gösterir ve tam
   eğitimin ne kadar süreceğini tahmin eder.
3. **Gece modu**: veri üretimi → eğitim → paketleme (Ollama + dağıtım dosyaları) → test. Yatmadan önce başlatın.
4. **Yayınla** (menü 11): test raporunu beğendiyseniz modeli Hugging Face'e yükler; uygulama oradan indirir.

Gece modundan önce:
- Ayarlar → Sistem → Güç: uyku modunu "Hiçbir zaman" yapın. Betikler çalışırken uykuyu kendileri de engeller.
- Windows Update'i bir haftalığına duraklatın (gece yeniden başlatma eğitimi keser).
- Pencereyi kapatmayın. Kesilirse aynı seçenek **kaldığı yerden** devam eder.

İlerleme `rapor\gunluk\` klasöründeki dosyalarda görülür.

### Bulut öğretmen (isteğe bağlı, ücretsiz)

1. [build.nvidia.com](https://build.nvidia.com) adresinde ücretsiz hesap açın (kart istemez). Herhangi bir modelin
   sayfasında **"Get API Key"** ile anahtar oluşturun (`nvapi-` ile başlar). Hesap 1.000 ücretsiz istek kredisiyle
   gelir; bu, 536 kazanımın test sorularının hepsine yeter.
2. Menüden **9) Bulut anahtarı** seçeneğini seçip anahtarı yapıştırın. Anahtar `bulut_anahtari.txt` dosyasında
   durur ve GitHub'a gönderilmez. Kit anahtarı hemen dener.
3. Kredi biterse, anahtar hatalıysa ya da bulut üst üste 3 kez yanıt vermezse kit kendiliğinden bilgisayardaki
   modele geçer. Gece hiçbir şey durmaz.

Anahtar girmezseniz her şey bilgisayarınızda üretilir.

## Adımlar ve dosyalar

| Adım | Betik | Ne yapar | Çıktı |
|---|---|---|---|
| 1 | `adim1_korpus.py` | `js/data/content` notlarını okur, test sorularını ayırır | `veri/korpus.jsonl`, `veri/test_*.jsonl` |
| 2 | `adim2_veri_uret.py` | Öğretmen modelle (Ollama `qwen3.5:9b`; anahtar girildiyse test sorularında bulut `gpt-oss-120b`) soru-çözüm, kavram, öğretmen modu ve deneme analizi örnekleri üretir; her test sorusunu bağımsız ikinci bir çözümle doğrular | `veri/egitim.jsonl`, `veri/istatistik.json` |
| 3 | `adim3_egit.py` | Gemma 4 E4B'yi 4-bit QLoRA ile eğitir, her 100 adımda ara kayıt alır, en iyisini seçer | `cikti/lora/`, `rapor/egitim_gunlugu.json` |
| 4 | `adim4_ollama.py` | Modeli birleştirir; Ollama'ya `kampusai` adıyla yükler; llama.cpp ile q4_K_M GGUF + projektör + manifest üretir | Ollama modeli, `dagitim/` |
| 5 | `adim5_test.py` | `kampusai`, eğitilmemiş `gemma4:e4b` ve `qwen2.5:14b`'yi eğitimde hiç görülmemiş sorularla karşılaştırır | `rapor/test_raporu.md` |
| 6 | `adim6_yayinla.py` | (Elle) `dagitim/`'i Hugging Face'e, isteğe bağlı ollama.com'a yükler | Herkese açık indirme adresleri |

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
| `temel_model` | `unsloth/gemma-4-E4B-it` | Eğitilen model (herkes için) |
| `profiller.pro` | Gemma 4 12B | Menü 10 ile eğitilen isteğe bağlı Pro sürüm |
| `hf_depo` | boş → `<kullanıcı>/kampusai` | Yayınlanacak Hugging Face deposu |
| `ollama_kullanici` | boş | ollama.com kullanıcı adınız (isteğe bağlı yayın) |
| `goz_model` | `qwen3-vl:8b` | Ollama'ya yükleme adımında indirilen fotoğraf okuma modeli |
| `epoch` | 2 | Verinin üzerinden kaç kez geçileceği |
| `max_uzunluk` | 2048 | Bir örneğin en fazla token sayısı (12 GB ekran kartı için) |
| `karsilastirilacak_modeller` | kampusai, gemma4:e4b, qwen2.5:14b | Testte karşılaştırılan modeller |

## Sorun giderme

- **"PyTorch ekran kartını görmüyor":** NVIDIA sürücüsünü güncelleyin, sonra menüden Kurulum'u tekrar çalıştırın.
- **Eğitimde "CUDA out of memory":** `ayarlar.json` → `max_uzunluk` 1536 yapın, oyun/tarayıcı gibi programları
  kapatıp tekrar çalıştırın (ara kayıtlar korunur). Pro sürümde olursa 12B bu karta sığmıyordur; ana model yeterli.
- **GGUF dönüştürme başarısız:** Kit önce llama.cpp'nin hazır Windows sürümünü, olmazsa Unsloth'u dener. İkisi de
  olmazsa `rapor\gunluk\adim4_ollama.txt` dosyasını Claude'a gösterin.
- **Veri üretimi çok yavaş:** `paralel_istek` değerini düşürüp yükseltmeyi deneyin. Ollama'nın tamamen
  ekran kartında çalıştığını `ollama ps` ile kontrol edin.
- **Windows'ta Unsloth kurulamıyor:** WSL (Ubuntu) içinde aynı betikler `python3` ile çalışır.

## Lisanslar

Gemma 4 ve Qwen 3.5 Apache 2.0 lisanslıdır. Eğitim verisi, uygulamanın kendi konu anlatımlarından ve açık
lisanslı bir modelin çıktılarından üretilir. Notlarda yayınevi kitaplarından birebir alınmış metin varsa,
dağıtımdan önce kendi cümlelerinizle yeniden yazın.
