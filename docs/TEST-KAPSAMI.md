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
