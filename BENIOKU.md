# Ders Asistanı — Kurulum ve Kullanım

Ders programı, konu anlatımı, TYT-AYT deneme takibi ve yapay zeka asistanı.
**Windows**, **Android** ve **iPhone** için uygulama olarak gelir. Yapay zeka iki kaynaktan çalışır:

| Kaynak | Nerede çalışır | Ücret | Fotoğraf |
|---|---|---|---|
| **Yerel (Ollama)** | Bilgisayarındaki modeller; telefon da evdeki Wi-Fi'dan bunları kullanabilir | Ücretsiz, veriler cihazda kalır | qwen2.5vl okur, qwen2.5:14b çözer |
| **İnternet (Gemini)** | Google'ın sunucuları; her yerde çalışır | Ücretsiz katman (dakikalık/günlük sınırlı) | Tek model hem okur hem çözer |
| **İnternet (OpenAI-uyumlu)** | OpenRouter, Groq, OpenAI, DeepSeek… | Servise göre | Modele göre |

**Otomatik** modda (varsayılan) bilgisayardaki Ollama hazırsa o, değilse internet servisi kullanılır.
Hangisi kullanılırsa kullanılsın asistan denemelerine, programına, notlarına ve konu anlatımlarına bakarak yanıt verir.

## 1. Kurulum

Kurulum dosyaları GitHub'daki deponun **Releases** sayfasındadır (her güncellemede otomatik derlenir).

- **Windows:** `DersAsistani-Kurulum-….exe` dosyasını indirip çalıştır.
  Windows "bilgisayarınızı korudu" derse **Ek bilgi → Yine de çalıştır** (uygulama imzasız olduğu için çıkar).
- **Android:** `DersAsistani-….apk` dosyasını telefondan indirip aç. İlk seferde "bilinmeyen kaynaklardan yükleme" izni istenir.
  Yeni sürüm eskisinin üzerine kurulur; verilerin silinmez.
- **iPhone:** Safari'de `https://<kullanıcı-adı>.github.io/ders-asistani/` adresini aç → **Paylaş** → **Ana Ekrana Ekle**.
  İlk açılıştan sonra internet olmadan da açılır (yapay zeka için internet gerekir).

## 2. Yapay zekayı bağlamak

### İnternet (Gemini) — her cihazda
1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) adresinde Google hesabınla **API anahtarı oluştur**.
2. Uygulamada **Ayarlar → Yapay zeka ayarları → İnternet** sekmesine anahtarı yapıştır → **Bağlantıyı test et** → **Kaydet**.
3. Model "Otomatik" kalabilir (en yeni Flash modeli seçilir).

> Ücretsiz katmanda Google gönderilen içerikleri ürünlerini geliştirmek için kullanabilir. Kişisel verilerin gitmesini istemediğin
> sorularda yazı kutusundaki 🗄 (Verilerim) düğmesini kapatabilir ya da yerel modu kullanabilirsin.

### Yerel (Ollama) — bilgisayarda
[Ollama](https://ollama.com) kurulu olmalı. Komut istemine (cmd) şunları yaz:

```
ollama pull qwen2.5:14b
ollama pull bge-m3
ollama pull qwen2.5vl:7b
```

| Model | Görevi |
|---|---|
| `qwen2.5:14b` | **Beyin**: soruları yanıtlar, konuları açıklar, soruları çözer |
| `bge-m3` | **Hafıza**: denemelerini, programını, notlarını ve konu anlatımlarını bulup beyne verir |
| `qwen2.5vl:7b` | **Göz**: fotoğraftaki soruyu okur; çözümü beyin yapar |

Windows uygulaması Ollama kapalıysa açılışta kendisi başlatmayı dener.

### Telefonda bilgisayardaki modelleri kullanmak
1. Bilgisayarda Ders Asistanı uygulamasını aç → **Ayarlar → Yapay zeka ayarları → Telefon bağlantısı** → kutuyu işaretle.
   Windows Güvenlik Duvarı sorarsa **Özel ağlar**'a izin ver.
2. Ekranda bir adres (ör. `http://192.168.1.20:8770/ollama`) ve 6 haneli **bağlantı kodu** görünür.
3. Telefondaki uygulamada **Ayarlar → Yapay zeka ayarları → Yerel (Ollama)** sekmesine adresi ve kodu yaz → **Kaydet**.

Telefon ve bilgisayar aynı Wi-Fi'da olmalı. Evden çıkınca (otomatik modda) telefon kendiliğinden Gemini'ye geçer.
iPhone'daki web uygulaması güvenlik kısıtı nedeniyle bilgisayara bağlanamaz; orada internet servisi kullanılır.

## 3. Asistanı kullanmak

- Soruyu yazıp Enter'a bas. Yanıt yazılırken ■ düğmesiyle durdurabilirsin.
- **Fotoğraf:** 🖼 düğmesiyle seç (telefonda kamera da açılır), panodan yapıştır (Ctrl+V) ya da kutuya sürükle.
- **Verilerim (🗄):** açıkken asistan denemelerine, programına ve notlarına bakarak yanıt verir.
  Her yanıtın altında hangi kayıtların kullanıldığı ve hangi modellerin çalıştığı görünür.
- Sohbetler sol menüde **Sohbetler** altında saklanır; yedek dosyasına da dahildir.

## 4. Verileri cihazlar arasında taşımak

Her cihaz kendi verisini saklar. Taşımak için: eski cihazda sağ üstteki **Yedekle** → oluşan dosyayı yeni cihaza gönder →
yeni cihazda **Ayarlar → İçe aktar**. (Tarayıcıda `Baslat.bat` ile kullandığın sürümden uygulamaya geçerken de böyle.)
API anahtarları yedeğe girmez; her cihazda ayrıca girilir.

## 5. Sorun giderme

| Belirti | Çözüm |
|---|---|
| "Yapay zekâ bağlı değil" | Ayarlar'dan Gemini anahtarı gir ya da bilgisayarda Ollama'yı başlat. |
| "Ollama'ya ulaşılamadı" | Ollama uygulamasını aç (sistem tepsisinde lama simgesi). |
| Telefonda "Bilgisayardaki yapay zekâya ulaşılamadı" | Bilgisayar açık mı, Ders Asistanı uygulaması çalışıyor mu, Telefon bağlantısı açık mı, iki cihaz aynı Wi-Fi'da mı? |
| "Bağlantı kodu yanlış" | Bilgisayardaki Telefon bağlantısı sekmesindeki kodu tekrar yaz. |
| "… anahtarı geçersiz" | Anahtarı aistudio.google.com'dan yeniden kopyala. |
| "Kullanım sınırına ulaşıldı" | Ücretsiz katman sınırı; biraz bekle ya da Ayarlar'dan başka model seç. |
| "… modeli yüklü değil" | Belirtilen `ollama pull …` komutunu çalıştır. |
| İlk yerel yanıt çok geç geliyor | Model ilk kullanımda belleğe yükleniyor; sonraki yanıtlar hızlıdır. |

## 6. Tarayıcıda kullanmak (uygulamasız)

Klasördeki **`Baslat.bat`** dosyasına çift tıkla; site `http://localhost:8765` adresinde açılır ve Ollama'ya aracılık eder.
macOS / Linux için `./baslat.sh`.

## Teknik not

- Saf HTML, CSS ve JavaScript; uygulama kodu tek: Windows sürümü **Electron** (`desktop/`), Android sürümü **Capacitor** (`mobile/`),
  iPhone sürümü **PWA** (`manifest.webmanifest`, `sw.js`) ile paketlenir. Derleme `.github/workflows/build.yml` ile GitHub'da yapılır.
- Yapay zeka kodu `js/ai/`: `engine.js` motor seçimi, `ollama.js` yerel bağlantı, `cloud.js` Gemini ve OpenAI-uyumlu servisler,
  `vision.js` göz, `rag.js` hafıza (vektör + kelime araması), `pipeline.js` hepsini birleştiren akış.
- Veriler IndexedDB'de tutulur; vektörler de orada önbelleğe alınır (model başına), yalnızca değişen kayıtlar yeniden hesaplanır.
- Matematik gösterimi için KaTeX'in yerel kopyası (`assets/vendor/katex`, MIT lisansı) kullanılır.
