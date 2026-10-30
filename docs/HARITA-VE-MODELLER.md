# Harita ve model geliştirmeleri — 6. adım

## Dünya küresi
NASA Blue Marble 8192×4096 kaynağından 4096×2048 WebP üretildi (yaklaşık 849 KiB). Büyük ekranlarda daha ayrıntılı yüzey; mobil, düşük bellek ve düşük kalite tercihlerinde mevcut 2K doku kullanılır. 4K dosyası açılamazsa 2K denenir. Yüksek kalite küre 160×112 segmentlidir; düşük kalite/mobil 72×48 kalır. Anizotropik filtre GPU kapasitesiyle sınırlanır. Mevcut atmosfer halesi, ülke/başkent/POI, gece-gündüz, orbit ve bilgi kartları korunur.

Kaynak: https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/
Dosya: https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_8192.png
Kredi ve kullanım açıklaması: assets/globe/README.md. Tarihsel bileşik görüntüdür; canlı uydu verisi değildir.

## 3B ders modelleri
Kütüphane 10 modelden 14 modele çıktı. Yeni özgün, prosedürel çizimler:
- Alveol: hava kesesi ve kılcal damar ağı.
- Nefron: glomerül ve böbrek tüpü.
- NaCl: dönüşümlü iyonların sonlu kübik örgü kesiti. Molekül olarak sunulmaz.
- Paralel levhalı kondansatör: iki levha ve yönlü elektrik alan çizgileri.

Bütün modeller mevcut parça seçimi, açıklama, parçalarına ayırma, orbit ve desteklenen hologram kontrollerini kullanır. Bunlar ölçekli tıbbi/anatomik rekonstrüksiyon veya nicel alan simülasyonu değildir. Kimya renkleri temsilidir; kenar iyonlarının komşuluk sayısı sonsuz kristalle aynı değildir.

## Yaşayan Tarih Haritası
Mevcut yerel ülke geometrisinden coğrafi altlık, yedi günümüz koordinatlı referans şehri, klavye ile şehir seçimi, şehir katmanı, dönem seçici, 1–4× merkezden yakınlaştırma ve sıfırlama eklendi. Sürgü ile seçilen yıl ve gösterilen kaynaklı kesit ayrımı korunur. Günümüz ülke çizgileri tarihsel egemenlik sınırları olarak okunmamalıdır.

Yeni 1839 Tanzimat kesiti özgün kısa özetle eklendi: https://islamansiklopedisi.org.tr/tanzimat . İstanbul odak poligonu imparatorluk sınırı değildir. Önceki beş kesit ve tüm kaynak bağlantıları korunur. Coğrafi altlık yüklenemezse şematik harita çalışır; sayfadan ayrıldıktan sonra geç yükleme DOM'a yazmaz.

## Kontroller
`npm run test:maps-models-ui`: dört gerçek WebGL sahnesinin parçaları/seçimi, tarih seçimi, şehir/klavye, yakınlaştırma, mobil/tablet/masaüstü düzenleri. `test:discovery-ui` mevcut dönem, kaynaklı rapor ve diğer keşif araçlarının regresyonunu kontrol eder. Bu testler fiziksel AR kamera/hologram cihaz testinin yerine geçmez.
