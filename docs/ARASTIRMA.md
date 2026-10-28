# Araştırma modu

[Ana sayfa](../README.md) · [Öğretmen kılavuzu](OGRETMEN.md)

Araştırma modu, aynı soru bankası üzerinde **ipucu** veya **adaptif akış** seçeneklerinden birini karşılaştırmak için kullanılır. Bir oturumda tek özellik değiştirilir.

## Oturum akışı

1. **Tüm araçlar → Araştırma modu → Oturum oluştur** yolunu aç.
2. Kazanımı, karşılaştırılacak özelliği ve 10–30 soruluk bankayı belirle.
3. Soruları, cevapları, gerekçeleri ve ipuçlarını incele; taslağı onayla.
4. Oturumu QR, kod veya dosya ile paylaş. Öğrenciler sabit takma katılımcı koduyla katılır.
5. Öğrenciler testi tamamlayıp sonuç paketini öğretmene aktarır.
6. Öğretmen grup tablosunu inceler; ham sonuçları JSON olarak dışa aktarabilir.

Ekrandaki **Adım adım kullanım** aynı akışı uygulama içinde gösterir. Kamera çalışmıyorsa **İçe aktar** alanına bütün kodları yapıştır veya araştırma aktarım JSON dosyasını seç. Eksik QR kareleri tamamlanmadan oturum/sonuç içe aktarılmış sayılmaz. Kontrol/deney grubu farkını örneklem sayısıyla birlikte yorumla; ön test, son test ve araştırma tasarımı olmadan öğrenme etkisi kanıtlandığı sonucuna varma.

Liste, oturum şemasını ve özgün sonuç vektörlerini doğrular; özetleri bu yanıtlardan yeniden hesaplar. Geçersiz kayıtlar uyarıyla görüntüleme dışında bırakılır, silinmez. Önce yedek alıp özgün paketi kontrol et. Kayıtlar normal test, sınıf ödevi ve Almanca pratik kayıtlarından ayrı tutulur.

## Veri ve puanlama

- Aynı oturum ve katılımcı kodu aynı gruba atanır; grup büyüklüklerinin eşitliği garanti edilmez.
- Cevap, gerekçe, eminlik, ipucu kullanımı ve süreler tutulur.
- Serbest gerekçe otomatik doğru sayılmaz; öğretmen değerlendirmesi ayrı kayıttır.
- Araştırma kayıtları `research`, öğretmen değerlendirmeleri `reviews` deposundadır. Otomatik bulut eşitlemesine girmez; açık yerel yedeğe dahildir.
- Normal test sonuçlarıyla araştırma sonuçları birbirine karıştırılmaz.

## Yorum sınırları

Grupların farklı sorular görmesi, başlangıç düzeyi ve çalışma süresi karşılaştırmayı etkileyebilir. Uygulama içi puanlar doğrulanmış psikometrik ölçek veya öğrenme etkisi kanıtı değildir. Bilimsel araştırmada uygun izin, onam ve bağımsız ölçüm düzeni gerekir.

`KAIR1` paketleri bozulma kontrolü içerir; şifreleme veya katılımcı/öğretmen kimlik doğrulaması sağlamaz. Aynı kodla bir tamamlanmış sonuç kabul edilir; yarım testin kaldığı sorudan sürdürülmesi desteklenmez.
