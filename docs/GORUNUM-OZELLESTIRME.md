# Görünümü özelleştirme

**Ayarlar → Görünümü özelleştir** veya üst çubuktaki **hızlı ayarlar → Görünümü özelleştir** üzerinden açılır. Ayarlardaki **12 renk paleti** kısayolu da aynı panelin renkler bölümünü açar. Seçimler anında uygulanır; ayrıca kaydet düğmesine basmak gerekmez.

## Seçenekler

| Bölüm | Seçenekler |
|---|---|
| Renkler | Kozmik, Buz, Orman, Gün batımı, Gül, Gece mavisi, Turkuaz, Kehribar, Lavanta, Grafit, Vişne, Zeytin |
| Arka plan | Kampüs moru, Okyanus, Kutup ışığı, Şafak, Gül bahçesi, Buzul, Bulutsu veya Sade; üç yoğunluk ve ışık hareketi anahtarı |
| Arayüz stili | Cam, Minimal, Yumuşak, Çizgisel, Kâğıt |
| Yerleşim | Üç kart köşesi ve üç kart boşluğu seçimi; sıkı görünümde dokunma hedefleri küçültülmez |
| Arayüz yazısı | Sistem, Hümanist, Yuvarlak, Serif, Eş aralıklı |
| Ders okuma | Bağımsız yazı tipi; 16/17/19/21 px; üç satır aralığı ve metin genişliği; normal/geniş harf aralığı |
| Hareket | Akıcı, Hafif veya Kapalı; dokunma parıltısını ve başlangıç animasyonunu ayrı kapatma |
| Efektler | Standart/hafif/kapalı cam bulanıklığı; kart gölgelerini kapatma |

Yazı tipleri internetten indirilmez; cihazda bulunan sistem fontları ve yedek font zincirleri kullanılır. Bu yüzden aynı seçenek farklı cihazlarda birebir aynı fontu göstermeyebilir. Formüller KaTeX, kod blokları eş aralıklı font kullanmaya devam eder. Ders ayarları arayüzün bütün yazılarını büyütmek yerine ders metnine uygulanır; genel yazı büyütme hâlâ Erişilebilirlik bölümündedir.

**Varsayılan görünüme dön**, yalnız görsel seçenekleri sıfırlar. Açık/koyu mod, erişilebilirlik ayarları, öğrenci profili, ders ilerlemesi ve diğer kayıtlar korunur.

## Öncelik ve performans

- Yüksek karşıtlık açıkken kişisel vurgu/yüzey renkleri uygulanmaz.
- Disleksi fontu, kişisel arayüz ve okuma fontundan; erişilebilir geniş aralıklar, kişisel satır/harf aralığından önceliklidir.
- İşletim sisteminde veya Erişilebilirlik bölümünde hareket azaltma açıksa kişisel “Akıcı” seçimi bunu geçersiz kılmaz.
- “Hafif”, kısa ve opaklık ağırlıklı geçişler kullanır; sürekli arka plan hareketi ve dokunma parıltısı durur. “Kapalı” dekoratif UI animasyonlarını durdurur. Eğitim simülasyonlarının zaman akışını değiştirmez.
- Azaltılmış saydamlık ve düşük GPU tercihleri bulanıklığı durdurur. Kart başına blur eklenmez. Standart cam modunda mevcut masaüstü 16 px / mobil 8 px sınırı, hafif camda 6 px kullanılır.
- Üst çubuk Adım 1'deki şeffaf görünümünü korur. Kişiselleştirme penceresi mobil durum/gezinme çubukları için güvenli alanları kullanır.

## Veri ve mimari

`js/core/appearance-config.js`, izin verilen değerleri ve paletleri tek yerde tanımlar. Aynı kod, HTML başlığında **ilk çizimden önce** ve uygulama içindeki ayar panelinde kullanılır; kayıtlı renk/stil/font için sonradan tema sıçraması önlenir. CSS değişkenleri `css/customization.css` katmanında uygulanır.

Ana değişkenler: `--custom-accent`, `--custom-accent-hover`, `--custom-accent-text`, `--custom-accent-soft`, `--custom-font`, `--custom-reading-font`, `--reading-size`, `--reading-line`, `--reading-width`, `--reading-tracking`, `--ui-card-padding` ve mevcut `--glass-frame-blur`/`--glass-shadow` değişkenleri. Rastgele kullanıcı CSS'i veya dış font URL'si kabul edilmez.

Yeni tercihler mevcut `App.prefs` ile `appearanceOptions` altında saklanır. Önceki `v159Theme`, `appearanceAtmosphere`, `appearanceAmbientMotion` anahtarları okunmaya ve güncellenmeye devam eder; eski beş renk seçimi ve `App.visualThemes` giriş noktaları korunur. Yedekten geri yükleme ve aynı kaynaktaki sekmelerin depolama değişiklikleri de uygulanır. Depolama engelliyse seçimler oturum belleğinde çalışır; yenilemeden sonra kalıcılık garanti edilmez.

```js
App.appearance.update({
  palette: 'teal', style: 'clean', font: 'system', readingFont: 'serif',
  readingSize: 'large', motion: 'gentle', shadows: false
});
```

Kontroller: `npm run test:appearance-settings`, `npm run test:customization-ui`, mevcut `test:appearance-ui`, `test:glass-ui`, `test:polish-ui` ve `node tools/v159-ui-check.mjs`. Arayüz sınaması `UI_ENGINE=chromium`, `firefox` veya `webkit` ile çalıştırılır. Bu kontroller fiziksel her Android/iPhone/GPU modeli üzerinde yapılmış cihaz testi anlamına gelmez.
