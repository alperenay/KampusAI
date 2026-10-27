# KampüsAI kullanım kılavuzu

[Ana sayfa](../README.md) · [İndir](https://github.com/alperenay/KampusAI/releases/latest) · [Web'de aç](https://alperenay.github.io/KampusAI/)

## İlk kullanım

1. Uygulamayı aç, sınıfını seç ve **Konu Anlatımı** bölümünden bir konuya gir.
2. Konuyu incele, test çöz veya **Hap Kartlar** ile tekrar yap.
3. **Bugün** ve **Tekrar** ekranlarından çalışma önerilerini takip et.
4. Deneme sonuçlarını ve programını ekle; **Üstbiliş Karnesi** ile haftanı incele.

Tüm özelliklere menüdeki **Tüm araçlar** sayfasından ulaşabilirsin. Sık kullandığın araçları yıldızla sabitle.

**Kullanım Rehberi** ilk gün adımlarını ve bölümlere ayrılmış ekran turunu sunar. Ayarlar'daki tanıtım seçeneği de bu rehberi açar. Turda bölüm seçebilir, geri/ileri gidebilir veya Esc / Geç ile çıkabilirsin. Güncelleme yapan mevcut kullanıcıya tur zorla yeniden gösterilmez. Araç ekranlarının üstündeki **Bu ekranı nasıl kullanırım?** alanı amaca uygun kısa yönlendirme ve ilgili araç bağlantılarını içerir.

## Yeni çevrimdışı pratikler

**Pratik → Bilgiyi Başka Yerde Kullan:** Doğru orantı, yüzde, doğrusal ilişki, net kuvvet–ivme, kütlece yüzde derişim veya tek karakterde kalıtım kavramlarından birini seç. Üç görev aynı kavramı denklem, grafik/tablo ve günlük yaşam bağlamında sorgular. Her yanıttan sonra açıklamayı oku; sonuçta bağlamlara göre ilk yanıtlarını gör. Grafiklerin altında erişilebilir veri tablosu vardır.

**Pratik → Çözümdeki Hatayı Bul:** Matematik, fizik, kimya, biyoloji veya karışık pratik seç. Kasıtlı hata içeren çözümde **ilk** yanlış adımı ve hatanın nedenini işaretle. Sonraki satırlar ilk hatayı sürdürüyor olabilir. Sonuç ekranı adım seçimini ve gerekçeyi ayrı gösterir. Bunlar uygulama için yazılmış örneklerdir; canlı AI çıktısı veya öğretmen onaylı soru olarak sunulmaz.

İki etkinlik de AI bağlantısı gerektirmez. Yanıtlar cihazda kaydedilir; sayfa yenilendiğinde son kaydedilmiş görevden devam edilir. Normal test, adaptif skor, Hap Kartlar ve araştırma kayıtları değişmez. Taslaklar ve sonuçlar mevcut `meta` deposunda ayrı kimliklerle saklanır; genel yedeklemeye ve kullanıcı etkinleştirdiyse mevcut eşitlemeye dahildir. QR araştırma/ödev aktarımı bu yeni kayıtları otomatik taşımaz.

Başlangıç paketi 18 bağlam görevi ve 12 hata örneği içerir. Aynı sorular tekrar görülebilir. Üç alıştırmanın sonucu, bilimsel olarak kalibre edilmiş aktarım testi veya genel başarı/öğrenme kanıtı değildir; önceki soruların geri bildiriminden de etkilenebilir.

## Yapay zekâ

**Ayarlar → Yapay zekâ ayarları** üzerinden bağlantını seç.

| Seçenek | Gerekenler |
|---|---|
| Hazır internet servisi | İnternet bağlantısı; ortak kota dolduğunda daha sonra yeniden dene. |
| Kendi servis anahtarın | Gemini veya desteklenen OpenAI uyumlu sağlayıcının API anahtarı. |
| Cihaza indirilen model | Desteklenen Windows/Linux/Android uygulaması, yeterli bellek ve ilk indirme için internet. |
| Ollama | Kendi bilgisayarında çalışan Ollama; telefondan kullanım için uygulamadaki bilgisayar eşleştirmesi. |

iPhone'da tarayıcı sürümü kullanılır; cihaz içi model kurulumu sunulmaz. Modelin fotoğraf ve ses yetenekleri seçilen sağlayıcıya bağlıdır.

Asistana soru yazabilir veya fotoğraf yükleyebilirsin. **Verilerim** açıkken ilgili çalışma kayıtların yanıta bağlam olarak eklenebilir. İnternet modunda bu içerikler seçili servise gönderilir. Ayrıntılar: [Gizlilik](GIZLILIK.md).

## Tekrar ve test

- Testte cevabını, gerekçeni ve eminliğini belirt. İhtiyaç duyarsan kademeli ipuçlarını aç.
- **Tekrar** ekranı yanlışları, kartları, tekrar zamanı gelen konuları ve hatalı işaretlediğin AI yanıtlarını birleştirir.
- Hap Kartlar'da **Çalışmaya başla** takvimi günceller; **Kartları incele** takvimi değiştirmez.
- Karne uygulama içi göstergeler sunar; resmî not veya psikolojik değerlendirme değildir.

## Yedekleme ve sorunlar

**Ayarlar → Verilerini yedekle** ile güncellemeden veya cihaz değiştirmeden önce yedek al. İsteğe bağlı cihaz eşitlemesini aynı bölümdeki eşitleme seçeneklerinden yönet.

Bağlantı sorunu varsa seçili servisi ve interneti kontrol et. Yerel model açılamıyorsa daha küçük modeli dene. Kamerayı kullanamıyorsan görsel dosyası seç; QR okuyamıyorsan kod yapıştırma veya dosya aktarımını kullan.

Kurulum dosyalarını yalnız [resmî sürümlerden](https://github.com/alperenay/KampusAI/releases/latest) indir. İşletim sistemi bir uyarı verirse dosyanın kaynağını ve yayımcı bilgisini kontrol et.
