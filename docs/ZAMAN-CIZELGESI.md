# Genişletilmiş zaman çizelgesi

`#/zaman`, `#/zaman/liste`, `#/zaman/sinav` aynı olay havuzunu kullanır. Önceki 160 kaydın indeksleri korunarak 24 yeni olay eklendi: toplam 184. Bilim/uzay tarihi, insan hakları ve Web'in gelişimi yeni içerik alanlarıdır. Olay yılı kesirleri yalnız mevcut veri düzenindeki sıralama içindir; kesin tarih değildir. Sınav aynı yıl içindeki iki olayı karşılaştırmaz.

## Veri sözleşmesi
Eski dizi alanları değişmez: `[yıl, başlık, dönem, tür, özet, konum?]`. İsteğe bağlı yedinci alan `detail` bağlam (`background`), gelişme (`development`), sonuç/yorum sınırı (`consequences`), kaynak inceleme sorusu (`question`), tarih notu (`dateNote`) ve `{title,url}` kaynak dizisi (`sources`) içerir. Yeni içerik `js/data/tarih-ek.js` içinde modülerdir.

24 yeni dosya kaynak bağlantılı ayrıntılı anlatı içerir. Eski 160 özet için bağımsız olay bazlı kaynak doğrulaması yapılmış gibi gösterilmez: dönem bağlamı, komşu kronoloji, kanıt inceleme sorusu ve genel MEB başvurusu sunulur; eksik doğrulama açıkça belirtilir. Bu ayrım, her eski kayda özgü ayrıntılı akademik metin hazırlandığı anlamına gelmez.

## Etkileşim
Olayı açınca bağlam, gelişme, sonuçlar, kaynaklar ve yakın kronoloji kartları görünür. Ayrıntılı okuma düğmesi odaklanmış modal açar; Escape ile kapanır. Önceki/sonraki ve komşu olay düğmeleri çalışır. Arama yeni ayrıntı metinlerini de kapsar. Metinler HTML olarak çalıştırılmaz; dış bağlantılar HTTPS ile sınırlandırılır. Olay metinleri özgün özetlerdir; kaynak sayfalardan uzun pasajlar kopyalanmamıştır.

## Kaynaklar
- NASA, 60 Moments in NASA History: https://www.nasa.gov/specials/timeline/index.html
- NASA, Yuri Gagarin: https://science.nasa.gov/resource/yuri-gagarin-first-human-in-space/
- CERN, The birth of the Web: https://home.cern/science/computing/the-birth-of-the-web
- Birleşmiş Milletler, History of the Declaration: https://www.un.org/en/about-us/udhr/history-of-the-declaration
- Nobel Prize, Marie Curie: https://www.nobelprize.org/womenwhochangedscience/stories/marie-curie.

`npm run test:timeline-ui` 184 kartı, 24 kaynaklı dosyayı, içerik aramasını, ayrıntı penceresini ve üç ekran genişliğinde kaynakça/sınav görünümlerini kontrol eder. Sonuçlar `dist/qa/<motor>/timeline-report.json` altındadır.
