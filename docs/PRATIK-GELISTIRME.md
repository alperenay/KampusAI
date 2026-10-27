# Çevrimdışı pratikler ve kullanım rehberi — 1.44

## Katmanlar

- `js/data/practice-bank.js`: İki dilli özgün başlangıç içeriği. Altı kavram × üç bağlam; dört derste 12 kasıtlı hatalı örnek. Doğru yanıt, açıklama, ilk hata ve gerekçe anahtarları açıkça sürümlenir. Paket insan öğretmen tarafından onaylanmış gibi etiketlenmez.
- `js/modules/practice.js`: Saf oturum, girdi doğrulama, soru/şık sırası ve sonuç hesapları. `practice:draft:<mode>:<topic>` / `practice:result:<sessionId>` kimlikli `meta` kayıtları mevcut veri şemasını kullanır. Tamamlamanın tekrar çağrılması aynı sonucu iki kez saymaz. Yeni bir oturumun taslağı eski bir sonuç tarafından silinmez.
- `js/modules/practice-ui.js`: `#/aktarim` ve `#/hata-avcisi`; seçim, üç görev, yanıt sonrası açıklama, sonuç ve son çalışmalar. Doğru adım ama yanlış gerekçe tam doğru sayılmaz. Serbest metne otomatik doğruluk verilmez.
- `js/modules/page-guide.js`: Araç kataloğu ile eşleşen sayfa yolu, açılır kullanım bilgisi ve ilişkili araçlar. `#/rehber`, ilk gün adımları ve turun bölüm girişlerini sunar.
- `js/modules/tour.js`: İlk kurulum davranışı korunur. Bölüm seçimi, hedef vurgusu, devam etme, klavye odağı ve çıkış vardır. Tur sırasında kamera izni veya AI üretimi kendiliğinden başlatılmaz.
- `css/v144.css`: Mevcut tema değişkenleriyle form, başlık, dokunma hedefi, dar ekran ve odak düzenlemeleri. Yazdırmada bağlamsal yardım gizlenir.

## İçerik ve puan sınırları

Bir görev, yalnız ilk kaydedilen yanıtıyla değerlendirilir. Sonraki göreve geçmeden önce geri bildirim verilir; dolayısıyla üç görev, bağımsız deneysel ön/son test değildir. Bağlamlar sabit sırada gelir ve eş zorlukta oldukları iddia edilmez. Küçük ve tekrar kullanılabilen bankadan genellenmiş öğrenme artışı çıkarılmaz.

Kalıtım soruları basit Mendel modeli ve belirtilen baskınlık varsayımını kullanır. Ekolojik enerji örneğindeki %10, soruda belirtilen varsayımdır. Fizik sorularında net kuvvet ve SI birimleri; derişimde toplam çözelti kütlesi kullanılır.

## Doğrulama

`npm run test:practice`: içerik anahtarları, altı kavram, dört ders, eksik/geçersiz girdiler, bozuk sürüm, taslak, yazma hatası, tekrar kayıt ve veri deposu izolasyonu.

`npm run test:practice-ui`: gerçek tarayıcıda çevrimdışı çözme, yenileme/devam, yazma hatasını yeniden deneme, iki dil/tema, 320–1440 px düzenler ve bütün tur adımları. Fiziksel Android/iOS cihaz veya canlı AI doğrulaması yerine geçmez.

Eski çalışma, araştırma, öğretmen QR, üretim ve tüm araç açılış sınamaları da dağıtımdan önce çalıştırılır.

