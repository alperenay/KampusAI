# Cam tasarım sistemi

Ortak `css/glass.css` katmanı Web/PWA, Android WebView ve Electron Windows/Linux arayüzlerine uygulanır. İşlevler ve kayıt biçimleri değiştirilmez.

- Açık/koyu tema: yarı saydam yüzey, yumuşak kenar ışığı, ince kenarlık ve statik arka plan ışıkları.
- Mevcut atmosfer renkleri korunur. Sade atmosfer seçimi arka plan ışıklarını azaltır.
- Gezinme ve pencerelerde masaüstünde 16px, mobilde 8px bulanıklık. Mobil üst çubukta ve kartlarda tekrar eden blur yoktur.
- Ders metinleri, formlar ve grafikler sabit okunabilirlik yüzeylerini korur. Yeni animasyon veya sürekli gölge/filtre animasyonu eklenmez.
- Düşük GPU modu, yüksek karşıtlık, sistemin azaltılmış saydamlık tercihi ve backdrop-filter desteklemeyen tarayıcılar için sade görünüm vardır. Yazdırmada efektler kaldırılır.
- Safe-area, klavye açılması, menü yüksekliği ve gezinme davranışlarına müdahale edilmez.

Doğrulama: `npm run test:glass-ui`, `npm run test:polish-ui`, `node tools/usability-ui-check.mjs`, `npm run test:appearance-ui`, `npm run test:lesson-layout-ui`. `UI_ENGINE=firefox` veya `webkit` ile diğer motorlar seçilir.

Tarayıcı motoru ve ekran boyutu testleri fiziksel her Android/iOS/GPU modelinde performans sertifikası değildir. CSS efektini desteklemeyen cihazlarda düz yüzey kullanılır.
