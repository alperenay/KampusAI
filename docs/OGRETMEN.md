# Öğretmen ve QR aktarımı

[Ana sayfa](../README.md) · [Araştırma modu](ARASTIRMA.md)

## Çevrimdışı ödev

1. **Tüm araçlar → Sınıf Modu → Yeni ödev** ekranını aç.
2. Kazanımları ve soruları seç; cevap anahtarını kontrol et.
3. Ödevi QR ile paylaş. Büyük ödevler birden fazla QR karesine bölünür.
4. Öğrenci **Sınıf Modu** üzerinden QR'ı alır ve testi çözer.
5. Öğrencinin sonuç QR'ını öğretmen cihazına aktar. Sonuçlar ödev listesinde görünür; CSV dışa aktarılabilir.

Kamera yerine kod yapıştırma yolu da kullanılabilir. Ödev ve sonuç paylaşımı internet gerektirmez; yeni soruları AI ile üretmek seçili modelin çalışmasını gerektirir.

## Gerekçe değerlendirmesi

1. Öğrenci test sonucundaki **Gerekçelerimi öğretmene gönder** düğmesini kullanır.
2. Öğretmen **Öğretmen gerekçe değerlendirmesi** ekranından QR, kod veya dosyayı alır.
3. Kavramsal doğruluk, cevapla mantıksal bağlantı ve açıklık/yeterlilik ölçütlerini ayrı ayrı **0–2** puanlar.
4. Geri bildirimi QR/kod/dosya ile öğrenciye gönderir. Öğrenci aynı ekrandan içeri alır.
5. **Kaydet** öncesinde her gerekli ölçütü doldur. Aynı öğrenciye yeni değerlendirme kaydedilirse sürüm numarası artar; eski/çelişkili geri bildirim kabul edilmez.

Bu ekranların üstündeki **Adım adım kullanım** alanında aynı akış uygulama içinde de açıklanır. Çok parçalı QR aktarımında bütün kareleri tamamla. Araştırma ve öğretmen paketleri JSON dosyasıyla veya manuel kodla alınabilir; çevrimdışı Sınıf Modu'nda kamera yerine **Kamera yok / açılmıyor: kodu yapıştır** kullanılır. Sınıf tablosunun dışa aktarımı CSV'dir.

Geçersiz kayıt uyarısı görürsen kayıtlar otomatik silinmez. Ayarlar'dan yedek al; özgün aktarım paketini kontrol et. Ödev bulunamadı ekranı, bilinmeyen veya doğrulanamayan ödeve erişildiğini belirtir; ödev QR'ını yeniden al. Ayrıntılar: [Yeni araçlar ve veri uyarıları](YENI-ARACLAR.md).

Normal testin öğrenme göstergeleri güncellenir; araştırmanın özgün A/B sonucu korunur. Serbest metin gerekçeleri öğretmen incelemesinden önce otomatik doğru sayılmaz. Aynı geri bildirimin ikinci kez alınması puanı tekrar artırmaz.

## Paylaşım sınırları

İki cihazın da güncel sürümü kullanması gerekir. Paylaşılan paketler şifreli veya imzalı değildir; QR sağlama toplamı kimlik doğrulamaz. Sınıf Modu yüksek güvenlikli sınav sistemi değildir. Kişisel verileri ve araştırma izinlerini paylaşım öncesinde değerlendir.
