# Sürüm doğrulaması ve kapsamı

Bu belge otomasyonun kapsamını tanımlar. Bir ekranın açılması, o ekrandaki bütün olası girdilerin veya gerçek donanımın doğrulandığı anlamına gelmez. Sürüme ait yürütme sonuçları GitHub Actions günlükleri ve test çıktılarındadır.

1.47 ek kontrolleri: `npm run type-check`, `npm run test:v147`, `npm run test:v147-ui`. Yeni modüller checkJs ile denetlenir; dinamik eski `App` sınırı genel bir tür bildirimidir ve tüm eski kodun tip güvenliği iddiası yoktur. Almancada dört seviyenin üç etkinliği, İngilizce kayıt ayrımı ve doğru `de-DE` ses etiketi; favori sabitleme/yeniden yükleme ve taslak koruma; beş sensör kanalının etiketli simülasyonu, JSON birim/kaynak bilgisi ve hareket olayı test girdisi; geç mikrofon izninin kapatılması; üç panelde bozuk kayıtların korunup uyarıyla dışlanması ve eski sayfa yüklemesinin yeni sayfayı bozmaması; kapatılan araştırma penceresinin geç aktarım açmaması; küre seçimi, zoom/pan/reset ve holograma giriş/çıkış test edilir. Bunlar kalibre edilmiş gerçek sensör/Almanca telaffuz doğruluğu veya her fiziksel cihazın sertifikasyonu değildir.

## Tekrarlanabilir kontroller

```sh
npm run lint
npm test
npm run build
node tools/audit-web.mjs --full
# Firefox ve WebKit kuruluysa:
UI_ENGINE=firefox node tools/audit-web.mjs --full
UI_ENGINE=webkit node tools/audit-web.mjs --full
```

Tarayıcı testleri Playwright 1.62.1 kullanır. Windows'ta varsayılan Chromium kanalı Edge'dir. CI Firefox'u Linux'ta, WebKit'i macOS'ta çalıştırır. PowerShell'de ortam değişkeni için `$env:UI_ENGINE='firefox'` kullanılır. Ayrıntılı JSON ve günlükler `dist/qa/<motor>/` altına yazılır. Testler izole profiller kullanır; kişisel kayıtlar üzerinde çalışmaz.

| Kontrol | Doğrulanan kapsam |
|---|---|
| Birim ve içerik testleri | Adaptif zorluk, gerekçe/eminlik, ipuçları, öneri, öğretmen rubriği, araştırma grupları, QR paket doğrulaması, 808 kazanım, sensör hesapları, sesli grafik matematiği, düello puanı, Bilgi Evreni kenarları |
| Tüm özellik ekranları | Araç kataloğu, 82 deney, 9 oyun ve konu/test alt ekranlarının açılışı; JS hataları |
| Kullanılabilirlik | Bütün katalog sayfaları; 320/768/1440 px; açık/koyu tema, yatay taşma ve bağlamsal yardım |
| Menü ve Bilgi Evreni | Bütün bağımsız araçların menüde bulunması; arama, klavye, dil; konu/ünite/durum filtreleri, seçili konu bağlantıları, dönüş düğmesi, 320–1280 px, WebGL yokken liste |
| Öğrenme akışları | Adaptif test, ipucu ve profil güncellemesi; kartlar; araştırma QR turu; öğretmen geri bildirimi; kademeli soru/yazılı üretimi; çevrimdışı aktarım ve hata bulma etkinlikleri |
| Yeni büyük araçlar | Kontrollü ivmeölçer olaylarıyla periyot; grafik betimleme ve desteklenen motorlarda ses API'si; düzeltme turu; iki düello sonucu QR metniyle eşleştirme, puan/yanlış/rozet kayıtları; 3B konu seçimi |
| Deney/oyun etkileşimleri | 82 deneyde 2B parametre sınırları, seçimler, oynatma/durdurma/sıfırlama; dokuz oyunda başlatma ve ilk kullanılabilir eylem |
| Veri güvenliği | Hatalı yedek mutasyon öncesi reddedilir; IndexedDB tüm depolar tek transaction; klonlama hatasında geri alma; localStorage kota hatasında önceki veriyi geri koyma; geçersiz/tekrarlı kimlikler |
| Yaşam döngüsü | Eski sayfanın gecikmiş sonucu/hatası/temizliği yeni sayfayı bozmamalı; sayfa terk edildikten sonra gelen kamera/mikrofon izninde akış kapatılmalı; geçersiz fizik parametreleri ölçüm başlatmamalı |
| Windows/Linux paketi | Gerçek Electron açılışı, app:// köprüsü, izole IndexedDB, bütün katalog/deney/oyun ekranları ve kalıcı pratik işlemi; iki pencere genişliği |
| Android emülatörü | APK kurulum/açılış, tanıtım turu, klavye, Araçlar araması, çevrimdışı üç görevli pratik ve sonuç; zorunlu kontrol bulunamadığında başarısızlık |

## Sınırlar

- Yapay zekâ yanıtları ve gecikmiş sensör izinleri birçok UI testinde açıkça etiketli kontrollü test girdileridir. Bunlar canlı modelin doğruluğunu veya fiziksel sensörün kalibrasyonunu kanıtlamaz. Canlı servis/model kontrolleri ayrıca değerlendirilmelidir.
- WebKit testi gerçek iPhone/iPad testi veya yerel iOS paketi sertifikasyonu değildir. iOS dağıtımı web/PWA üzerinden yapılır. Kamera, mikrofon, AR, hologram ve el takibinin fiziksel cihaz doğrulaması ayrıca gerekir.
- Windows üzerinde WebKit derlemesi AudioContext sunmayabilir. Böyle bir ortamda metin/klavye geri dönüşü doğrulanır; ses çalındığı iddia edilmez.
- Yerel depolama geri alma testi yakalanabilir yazma hatalarını kapsar. localStorage birden çok anahtarda transaction sağlamaz; güç kesintisine karşı atomiklik iddiası yoktur. IndexedDB içe aktarma tek transaction kullanır.
- Ekran/parametre taraması tüm oyun seviyelerini, tüm olası sayı birleşimlerini veya her üreticiye ait donanımı kapsamaz.

## 1.48 Keşif Atölyeleri

`discovery-check.mjs`: sayısal fizik, MNA, Kepler/J2000 referansı, güvenli ifade ayrıştırma, rubrik ve veri şemaları. `discovery-signal-check.mjs`: gerçek AudioWorklet kodunun denetimli ses örnekleri. `discovery-ui-check.mjs`: dokuz rota, 320/768/1440 genişlik, sensörden rapora aktarım, AI önerisinin onay kapısı, kontrollü sensör/yönelim/kamera fixture’ları ve kaynak temizliği. Yeni hesaplama çekirdeği `tsconfig.discovery.json` strict kapısındadır. Fiziksel iki telefon ses zamanlama doğruluğu, gerçek afet ölçümü veya çevrimiçi modelin OCR başarısı bu testlerle doğrulanmış sayılmaz.

## 1.50.0 mikrofon ve yeni araç regresyonları

`audio-check.mjs`: Android izin çifti, medya hata sınıfları, kısıt geri dönüşü, geç izin/iptal, tek mikrofon akışı, kayıt geri dönüşü ve native oturum kimliği. `audio-ui-check.mjs`: yerel mikrofon testi, meşgul/izin/eksik aygıt, askıdaki ses bağlamı, sesli ekran kapat/aç, eski AI yanıtı, bozuk pH/vatandaş kayıtları, geciken ekran okuması, eşzamanlı kamera izinleri ve QR/CSV doğrulaması. Bunlar kontrollü girdilerdir. `v149-ui-check` ve ses testleri üç tarayıcılı tam denetime dahil; Android kurulumunda manifest izinleri ayrıca doğrulanır. Fiziksel cihazın sürücüsü, işletim sistemi ayarı ve konuşma tanıma doğruluğu bu testlerin kapsamı dışındadır.

`audio-browser-check.mjs` Chromium’da yapay sinyali gerçek Web Audio ve MediaRecorder üzerinden geçirir, gerçek kodlanmış ses blobunu kontrollü transkripsiyon adaptörüne verir. Fiziksel mikrofon ve çevrimiçi transkripsiyon kullanılmaz.

## 1.50 birleşik sürüm doğrulaması

Mikrofon onarımları ve menü/favori geliştirmeleri aynı sürümde teslim edilir. `npm run test:v150` kategori eşlemesini, eski favorileri, kişisel şablon doğrulamasını, sınırları ve sıralamayı doğrular. `npm run test:v150-ui` gerçek tarayıcıda kategori süzme, şablon oluşturma/düzenleme/silme, arama, kalıcılık, taslak koruma ve 320–1440 piksel genişlikleri sınar. Tam çoklu motor denetimine dahildir.

Donanım izinleri ve ses sağlayıcısı testlerinde kontrollü örnekler ile gerçek ses kayıt API testi ayrı tutulur. Fiziksel mikrofonların ve her telefon modelinin tamamı sertifikalandırılmış değildir. Android manifest izni ve paket açılışı CI emülatör testine tabidir; iOS doğrulaması web motoru/PWA kapsamındadır.

## 1.52 animasyon kontrolleri

`npm run test:motion-ui`: gerçek Web Animations API ile kart girişleri, sekme göstergesinin konum değiştirmesi, tıklama katmanının işlevleri engellememesi, hızlı gezinme sonunda animasyonların temizlenmesi, işletim sistemi ve uygulama hareket azaltma tercihleri, 320–1440 px yatay taşma kontrolü. Görsel hareket animasyon desteklenmediğinde içeriği gizlemez; bilimsel grafik ve sensör döngülerine müdahale etmez. Tam tarayıcı denetimine dahildir.

`npm run test:appearance-ui`: renk tercihinin kalıcılığı, arka planı durdurma/sade seçim, okuma modunun düğme ve Escape ile geri dönüşü, açık menünün üstten kapanması ve 24/48/80px sistem alt boşluğunda Ayarlar'ın gerçek hit-test ile erişimi. Hedefler 320×640 dahil mobil/tablet boyutlarında kontrol edilir. Fiziksel telefon modellerinin tamamının sertifikalandırıldığı iddia edilmez.
