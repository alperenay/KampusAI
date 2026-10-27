# Geliştirme

[Ana sayfa](../README.md)

## Başlangıç

Node.js 22 veya üzeriyle proje kökünde:

```sh
npm run lint
npm test
npm run build
```

Web çıktısı `dist/web` klasörüne yazılır. Yerel web kullanımı için `Baslat.bat` çalıştırılabilir.

## Klasörler

| Klasör | İçerik |
|---|---|
| `js/`, `css/`, `assets/` | Ortak web arayüzü ve içerikler |
| `desktop/` | Electron masaüstü uygulaması |
| `mobile/` | Capacitor ve Android köprüleri |
| `server/` | Cloudflare Worker ve isteğe bağlı eşitleme |
| `tools/` | Doğrulama ve paketleme araçları |
| `docs/` | Kullanım, gizlilik ve geliştirme belgeleri |
| `egitim/` | Uygulamadan ayrı, isteğe bağlı model deney araçları |

Modüller ortak `App` alanını kullanır. Kalıcı kayıtlar IndexedDB, küçük tercihler localStorage üzerinden yönetilir. Arayüz HTML/CSS/JavaScript'tir.

## Tarayıcı testleri

Playwright ve Chromium/Edge gerektirir:

```sh
npm run test:v142-ui
npm run test:study-ui
npm run test:research-ui
npm run test:teacher-review-ui
npm run test:generation-ui
npm run test:all-features-ui
```

Senaryolar sabit AI verileri kullanır; canlı model doğruluğunu veya fiziksel kamera/mikrofonu doğrulamaz. Raporlar `dist/qa` altında oluşur.

## Yayın

Ana dala gönderilen uygulama değişiklikleri GitHub Actions üzerinden web, Windows, Android ve Linux paketlerini oluşturur. Sürüm numarası `package.json` ve `.github/workflows/build.yml` içinde aynı tutulur. Yalnız Markdown değişiklikleri paket derlemesini tetiklemez.

Hazır internet servisi için `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` ve `GEMINI_API_KEY`; Android imzası için `ANDROID_KEYSTORE_B64` ve `ANDROID_KEYSTORE_PASS` GitHub Secrets içinde tutulur. Değerleri kaynak koda ekleme.

Yeni özellik veya düzeltmede ilgili kontrolü çalıştır, mevcut veri/yedek biçimleriyle uyumluluğu koru ve değişikliği kısa bir açıklamayla gönder. Dış bileşenlerin lisans dosyalarını ve uygulamadaki kaynak bildirimlerini koru.
