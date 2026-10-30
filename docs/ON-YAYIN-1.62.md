# KampüsAI 1.62.0 — Yayın adayı doğrulaması

Durum: yerel web build/deploy kontrolleri tamamlandı; GitHub yayını başlatılacak.
Bu dosya yerel doğrulama kapsamını kaydeder. Uzak CI/native sonuçları sürüm
sayfası ve GitHub Actions kaydıyla ayrıca doğrulanır.

## Tamamlanan kapsam

Yedi adım: şeffaf header; modüler müfredat JSON/şablon paketi; ayrıntılı görünüm
kişiselleştirmesi; sunum üretiminin kaldırılması ve tek Dokümanlar alanı;
birleşik bilim/sensör laboratuvarı; 4K küre, 14 model ve gelişmiş tarih haritası;
184 olaylı zaman çizelgesi ve Hakkında/Kaynakça güncellemesi.

Zaman çizelgesinin 24 yeni kaydı kaynaklı bağlam/gelişme/sonuç dosyası içerir.
Eski 160 kaydın kartı dönem, yakın kronoloji ve kaynak okuma araçlarıyla genişletildi;
her eski olayın yeniden doğrulanmış akademik dosyası bulunduğu iddia edilmez.
Olay indeksleri korunmuştur. Ayrıntılı okuma penceresi ve metin içi arama vardır.
Sınavdan ayrılınca zamanlayıcı ve bekleyen arama temizlenir.

## Yerel doğrulama

| Motor | Başarılı test grubu | Başarısız |
| --- | ---: | ---: |
| chromium | 35 | 0 |
| firefox | 35 | 0 |
| webkit | 35 | 0 |

Toplam **105/105** genel arayüz test grubu başarılıdır. Raporlar:
`dist/qa/{chromium,firefox,webkit}/audit-summary.json`.
Son zamanlayıcı düzeltmesinden sonra `timeline-ui-check` üç motorda ayrıca tekrar geçti.

- `npm test`: adaptif test, günlük öneri, QR, gerekçe/eminlik, öğretmen,
  araştırma, soru üretimi, veri, doküman ve laboratuvar birim kontrolleri başarılı.
- `test:curriculum-dataset` ve altı MEB parser testi başarılı.
- Lint ve mevcut TypeScript 5.9.3 ile iki tsconfig denetimi başarılı.
  İlk npm type-check denemesi paket kayıt servisine ağ erişemediği için kurulamadı;
  aynı TypeScript denetimleri yerelde önceden bulunan derleyiciyle çalıştırıldı.
- Gerçek WebGL'de dört yeni sahne, 184 olay kartı, modal, kaynak arama,
  82 mevcut deneyin parametre sınırları ve diğer bütün menü rotaları kontrol edildi.
- 60 menü aracında ek konsol denetimi: uygulama kaynaklı istisna/uyarı ve eksik
  yerel asset bulunmadı. Yerel Ollama keşfinin `/ollama/api/version` için aldığı
  404 ve testte kapalı dış ağ istekleri ayrıca raporlandı; bunlar gizlenmedi.
- Yeni modüllerde bölüm değişimi, gecikmiş izin, geç 3B yükleme ve arka plan
  kaynak temizliği test edildi. Araştırma ve normal öğrenci verisi ayrımı korundu.

## Derleme ve dağıtım sınırları

Web derlemesi: `node tools/build-web.mjs dist/web --version 1.62.0`.
Sürüm, `js/version.js`, package.json ve CI APP_VERSION alanında 1.62.0 ile eşleşir.
Çıktı PWA ve Electron/Capacitor'ın ortak web katmanıdır; `dist/web` HTTPS statik
sunucuya kök dosyalar korunarak yüklenebilir. ZIP'i file:// ile açmak PWA kurulumunun
veya izinlerin tam çalışacağını garanti etmez.

Yerel pakette Cloudflare adresi gömülmemiştir (`App.config.serverUrl` boş).
Gerçek yayın için mevcut CI sunucu çıktısı `DA_SERVER_URL` olarak derlemeye verilir;
API anahtarı istemciye gömülmez. Model ağırlığı veya özel anahtar pakete eklenmez.

Fiziksel Android/iOS sensör, kamera/AR, bildirim, gerçek ses çıkışı ve canlı AI
sağlayıcı doğruluğu otomatik tarayıcı testleriyle onaylanmış değildir. Native EXE/APK/
DEB/AppImage derlemesi, imzası ve kurulum smoke kontrolleri mevcut CI'da ayrıca
çalışmalıdır. WebKit bu Windows test ortamında gerçek ses çıkışı sunmadığında
sessiz/metin geri dönüşü kontrol edilir. “Tamamen hatasız” garantisi verilmez.

Müfredat paketi ayrı şablon/kalite kapılarıyla hazırlanmıştır; tüm MEB konu ve
kazanım metinleri eksiksiz yayımlanmış sayılmaz. Kaynak lisansı ve inceleme durumları
`curriculum/` kapsam raporunda tutulur.

`Baslat.bat` kullanıcının önceki değişikliğidir ve bu çalışma tarafından değiştirilmedi.
Önceki `docs/GUVENLIK-INCELEMESI-1.60.md` dosyası da kapsam dışı bırakılmıştır.
