# Sayısal Asistan kurulumu ve kullanım

## 1.40: uygulama içinden indir, cihazda çalıştır

Windows/Linux ve Android uygulamasında **Sayısal Asistan → Modeli bu cihaza indir** seçilir. Model yaklaşık 3,29 GB; kurulum sırasında parçalarla birleşik model için yaklaşık 7 GB boş alan, kullanımda en az 8 GB RAM önerilir. İndirme kesilirse devam eder; iki parça ve birleşik dosya SHA256 ile doğrulanır. **Ollama, Python, adres veya bağlantı kodu gerekmez.** İndirme bitince model diskte bekler, ilk soruda uygulamanın llama.cpp motoruyla açılır. Metinle soru çözümü indirmeden sonra internetsizdir.

**Çalışma şekli**: Otomatik indirilmiş STEM modelini seçer; Bu cihaz yalnız yerel çalışır; Kendi bilgisayarım/sunucum önceki kimlik doğrulamalı bağlantıyı korur. **İnternet** seçeneği henüz kullanıma açık değildir: aynı özel modeli barındıran bir çıkarım sunucusu bağlı değildir. Başka model/Gemini özel modelmiş gibi kullanılmaz; bu seçenek soru veya fotoğraf göndermez. Mevcut genel asistanın internet/Gemini modu ayrı olarak çalışmaya devam eder. Cloudflare geçidi tek başına bu 3B özel modeli çalıştırmaz; kullanıcı tarafından yetkilendirilmiş bir çıkarım hedefi gerekir.

Çevrimdışı **fotoğraf okuma**, Ayarlar → Yapay zeka bölümünden ayrıca indirilen mevcut **Gemma görsel modelini** kullanır; çözümü özel STEM modeli üretir. Gemma indirilmemişse soru yazılarak çözülebilir. Okunan metin düzenlenmeden otomatik çözülmez. OCR/görsel okuma ile STEM doğruluğu ayrı yeteneklerdir. Model hâlâ doğrudan vision desteklemez. Bellek kullanımını azaltmak için iki yerel motor aynı anda çalıştırılmaz.

STEM dosyaları Gemma'dan ayrı `sayisal-model` klasöründe tutulur. **Modeli kaldır** yalnız STEM dosyalarını siler. Genel asistan, profil, araştırma ve öğretmen verileri bu modül tarafından değiştirilmez. Web/PWA ve iPhone sürümünde bağımsız yerel çıkarım henüz yoktur; indirme kartı desteklenmeyen platformlarda gösterilmez. Android derlemesi/emülatör testi fiziksel telefon üzerinde 3,29 GB model performansını doğrulamakla eşdeğer değildir.

Model ağırlıkları değişmedi; 1.39.0 sürümündeki hash ile sabitlenmiş iki parça kullanılır. Ticari olmayan Qwen araştırma lisansı ve model kartındaki **21/48, temiz temel 30/48** sınırı geçerlidir. Gerçek Windows cihaz motoru testi Ollama/Python olmadan eğitimli GGUF'yi açıp akışlı yanıt aldı; indirme/bozulma testleri ve tarayıcı köprü testleri sentetik fixture kullanır, model doğruluğu iddiası değildir.

## Önceki kurulum: isteğe bağlı kendi bilgisayarına bağlantı

KampüsAI 1.39.0'da ana menüde **Ders Programı'nın yanındaki Sayısal Asistan** açılır. Matematik, Fizik, Kimya veya Biyoloji seçilir; soru yazılır ya da kamera/galeriden fotoğraf alınır. **Görseldeki metni oku** yalnız OCR yapar. Metni kontrol edip düzelttikten sonra **Adım adım çöz** seçilir. Akış tamamlandığında çözüm kartları ve KaTeX formülleri gösterilir; iptal ve sayfa değişimi devam eden isteği keser.

## Çalışma biçimi

Özel Qwen türevi bir **metin modelidir**. Görseli CPU'da EasyOCR okur; model fotoğrafı veya geometri şekillerini doğrudan görmez. Görsel/sonuçlar sunucu tarafından dosyaya, araştırma kayıtlarına veya kişisel test profiline yazılmaz. Fotoğraf yalnız kullanıcının seçtiği sunucuya gönderilir. OCR hataları, özellikle el yazısı, kesir, kök ve şekillerde mümkündür. Görselden üretilen metin otomatik çözdürülmez.

Sunucu aynı anda bir OCR veya çözüm isteği işler; OCR CPU kullanır, modelde bağlam 4.096 ve yanıt 768 token ile sınırlandırılır, Ollama bekleme süresi 60 saniyedir. İptal, boyut sınırlaması, bozuk akış ve eksik model durumları açık hatayla sonuçlanır. Başka bir modele veya buluta sessiz geçiş yapılmaz. Diğer asistan, adaptif test, Hap Kartlar ve öğretmen/araştırma modlarının motor ayarları değiştirilmez.

## Bilgisayarda kurulum

Ollama ve Python 3.12 gerekir. [Sürüm sayfasındaki](https://github.com/alperenay/ders-asistani/releases/tag/v1.39.0) **KampusAI-STEM-Kurulum-1.39.0.zip** dosyasını indirip ayrı bir klasöre çıkarın. Küçük kurulum paketi servis kodunu, lisansı ve doğrulanmış indirme manifestini içerir. Kurucu, yaklaşık **3,29 GB Q8 modeli iki parçadan indirir**, her parçayı ve birleşik modeli SHA256 ile doğrulayıp Ollama'ya kaydeder. Modelin kendisi küçük ZIP'in içinde değildir. Parçalar, birleşik model ve Ollama kopyası için yaklaşık **11 GB boş disk alanı** ayırın.

Paket klasöründe PowerShell:

```powershell
python install-stem-model.py
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-stem.txt
.\.venv\Scripts\python.exe stem_service.py --prepare-ocr
.\.venv\Scripts\python.exe stem_service.py --show-code
.\.venv\Scripts\python.exe stem_service.py
```

Ollama kurulu fakat kapalıysa önce uygulamasını açın veya ayrı bir terminalde `ollama serve` çalıştırın. İlk OCR hazırlığı resmi EasyOCR ağırlıklarını indirir; sonraki okumalar için internet gerekmez. PyTorch kurulumu işletim sistemine göre büyük bir indirme gerektirebilir. CUDA zorunlu değildir; CPU çıkarımının hızı donanıma bağlıdır. Kaynak depodan kurulumda model komutu `python tools/install-stem-model.py --manifest stem-model-manifest.json`, servis komutlarının yolu `server/stem_service.py`, gereksinimler `server/requirements-stem.txt` olur.

Uygulamada **Bilgisayar bağlantısı** bölümüne `http://127.0.0.1:8766` adresini ve `--show-code` çıktısını yazıp **Kaydet ve kontrol et** seçin. Kod yalnız cihazda saklanır; uygulama yedeğine ve QR aktarımına girmez. Varsayılan kod dosyası kullanıcı ana dizinindeki `.kampusai/stem/connection-code.txt` dosyasıdır. Kodu paylaşacağınız kişiler bu sunucuyu kullanabilir; herkese açık depoya veya ekran görüntüsüne koymayın.

Linux/macOS için sanal ortam komutu `python3 -m venv .venv`, çalıştırıcı `.venv/bin/python` olur; Ollama model içe aktarma komutu aynıdır.

## Web, Windows/Linux, Android ve iPhone

- **Aynı bilgisayar:** Yerel servis + Ollama ile Windows/Linux uygulaması veya uyumlu tarayıcı kullanılır. Modeli web uygulamasına gömmek veya uygulamanın her açılışında indirmek gerekmez.
- **Telefon/tablet:** Model ağırlığı tarayıcıya/telefona zorla yüklenmez. Kendi bilgisayarınızdaki veya yönettiğiniz HTTPS sunucudaki servise bağlanırsınız. Android/iOS için bu modülde bağımsız yerel model çalıştırma uygulanmamıştır.
- **Aynı güvenilir yerel ağ:** Servisi bilinçli olarak `--host 0.0.0.0` ile açıp bilgisayarın LAN adresini kullanabilirsiniz. Tarayıcıdaki yerel ağ izni gerekebilir. HTTPS sayfa → HTTP LAN bağlantısı bazı tarayıcılarda engellenir; uyumlu yerel sayfa veya yönettiğiniz HTTPS sunucu kullanın. Windows güvenlik duvarında yalnız özel ağa izin verin; internet port yönlendirmesi yapmayın.
- **Uzak HTTPS sunucusu:** `STEM_ALLOWED_ORIGINS` izin verilen uygulama kökenlerini virgülle ayırır. Mevcut varsayılanlar GitHub Pages, Electron ve Capacitor kökenlerini kapsar. İstemcinin sunucu adresi HTTPS olmalıdır. Yeni hesap veya ücretli sunucu bu geliştirmede satın alınmaz.

GitHub'daki uygulama ve model paketi herkese açıktır; **ücretsiz, herkese barındırılmış model çıkarımı sağlanmaz**. Her kullanıcı kendi bilgisayarı veya yetkilendirilmiş sunucusuyla çalışır. Standart uygulamadaki mevcut diğer AI seçenekleri ayrı kalır.

## Lisans ve bilimsel kapsam

**Built with Qwen.** Qwen2.5-3B-Instruct ve türev ağırlıkları [Qwen RESEARCH LICENSE](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct/blob/main/LICENSE) koşullarındadır: araştırma/değerlendirme amaçlı, ticari olmayan kullanım. Lisans ve değişiklik bildirimi model paketine dahildir. Bunun bütün ticari kullanımlara açık bir model olduğu iddia edilmez.

[Veri ve eğitim yöntemi](STEM_DATASET.md), model kartı ve ölçüm raporu; gerçek eğitim ile sentetik kullanıcı arayüzü testlerini ayırır. Küçük, deterministik sorulardaki başarı bir gerçek sınav, bütün müfredat veya uzman doğruluğu iddiası değildir. Fotoğraflı sorularda OCR ile çözüm başarısı ayrıca değerlendirilmelidir.

## Kontroller

```powershell
npm run lint
npm test
npm run test:stem-ui
python tools/stem-service-check.py
python tools/stem-data-check.py
python tools/stem-evaluation-check.py
python tools/stem-ocr-check.py
```

Son komut gerçek EasyOCR ağırlıkları ve CPU kullanır. Servis sözleşme ve UI testleri HTTP/OCR için açık fixture'lar kullanır; bunlar gerçek model başarısı yerine geçmez. UI kontrolleri 320–1440 px ve iki temayı, dört dersi, KaTeX'i, iptali, kamera akışının kapatılmasını ve normal profil/araştırma verisinin değişmemesini kapsar. Fiziksel telefon kamerası ve Safari/WebKit ayrıca cihaz üzerinde sınanmalıdır.
