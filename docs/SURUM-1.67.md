# KampüsAI 1.67.0

## Görünüm ve sanal deneyler
Sanal deneyler ayrı başlık, çizimli kartlar ve Deneyi başlat eylemiyle sunulur. Klavye odağı, azaltılmış hareket, açık/koyu temalar ve 320 px ekranlar korunur. pH listesinde 17 seçenek vardır: su; dört HCl, iki HNO3, bir HBr, dört NaOH, iki KOH, bir LiOH derişimi; NaCl ve KCl. Bunlar 25 °C için ideal seyreltik, tam ayrışan çözeltilerdir. Zayıf asitler ve gıda sıvıları, ayrı denge modeli kurulmadan uydurma değerlerle listeye eklenmedi. Nötr tuzlarda hidroliz yok sayılır. Model yalnız eğitim içindir.

## AI
Otomatik seçilmiş model her soruda yeniden seçilmez. Karmaşık soru profili artık model listesi ağ çağrısı başlatmaz. Çalışan model kalıcı tercihte korunur; manuel seçim önceliklidir. İlk kurulumda paralel sorgular tek model keşfini paylaşır. Ayarlar kontrolü, hız/servis değişikliği ve model hatası hâlâ liste yenileyebilir. Yedek modele başarılı geçiş sonraki soruda hatırlanır. API anahtarı yeni bir kalıcı alana kopyalanmaz.

Bu değişiklik ağ ve model seçme maliyetini azaltır; sağlayıcı yoğunluğu, kota, bağlantı ve yanıt karmaşıklığı süreyi etkilemeye devam eder. Kesin doğruluk veya sabit yanıt süresi garantisi yoktur. JSON, akış, iptal ve kısmi yanıt korumaları korunur.

## Doğrulama kapsamı
Birim testleri gerçek model kalitesiyle karıştırılmaz. Çoklu tarayıcı testleri fiziksel tüm cihazlarda sensör ölçümü veya native iOS sertifikasyonu değildir. CI sürüm paketlerini ve açılış akışlarını ayrıca denetler.

### Gerçek servis örnek ölçümü
31 Ekim 2026, temiz yerel tarayıcı profili + yayımdaki servis: Merhaba 1179 ms; 2x+3=11 2390 ms; net kuvvet karşılaştırması 2095 ms; kişisel program sorgusu 1132 ms. Dört soruda yalnız bir model-listesi isteği görüldü; yanıt modeli gemini-3.5-flash-lite olarak kaldı. Denklem yanıtı x=4 ve net kuvvet/hız ayrımı kontrol edildi. Bunlar dört örneğin toplam süreleridir; kontrollü geniş doğruluk çalışması veya sağlayıcı gecikme garantisi değildir.

Tanıtım turunun kaydırma bekleyişinde, arka plan sekmelerinde durabilen requestAnimationFrame döngüsünden bağımsız 1,5 saniyelik sonlandırma ve frame temizliği eklendi.
