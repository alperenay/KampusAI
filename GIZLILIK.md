# KampüsAI Gizlilik ve Kişisel Verilerin Korunması Notu

Son güncelleme: 26 Ekim 2026 · Sürüm 1.38.0 geliştirme

KampüsAI, lise öğrencileri için ücretsiz ve açık kaynaklı bir YKS çalışma uygulamasıdır. Kullanıcılarının çoğu 18 yaşından küçük olduğu için uygulama **mümkün olan en az veriyle** çalışacak şekilde tasarlandı. Bu not, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) temel ilkeleri gözetilerek hazırlanmıştır.

## Kısaca

- Hesap açılmaz. E-posta, telefon, T.C. kimlik numarası, okul numarası istenmez.
- Kayıtların (denemeler, testler, yanlış defteri, program, notlar, isteğe bağlı adın) **yalnızca kendi cihazında** saklanır.
- Cihaza indirilen yapay zekâ ile çalışırken hiçbir veri cihazdan çıkmaz.
- Reklam, üçüncü taraf analiz/izleme aracı veya veri satışı yoktur. Çalışma önerileri ve öğrenme göstergeleri uygulamanın kendi eğitim kayıtlarından hesaplanır.

## Veri nereye gider?

| Durum | Ne gönderilir | Nereye | Saklanır mı |
| --- | --- | --- | --- |
| Cihazdaki yapay zekâ (Gemma 4) | Hiçbir şey | — | — |
| Eşleştirilmiş bilgisayar / Ollama | Soru, fotoğraf | Kullanıcının kendi bilgisayarı (aynı Wi-Fi) | Yalnızca o bilgisayarda |
| İnternet modu | Soru, fotoğraf; "Verilerim" açıksa soruyla ilgili kayıtlar | KampüsAI sunucusu (Cloudflare) üzerinden Google Gemini | KampüsAI sunucusu içeriği kaydetmez. Google'ın ücretsiz katman koşulları geçerlidir |
| Kota sayacı (internet modu) | Rastgele cihaz numarası, IP adresi | KampüsAI sunucusu | Yalnızca soru sayısı; her gün silinir |
| Cihazlar arası eşitleme (isteğe bağlı) | Eşitlenen kayıtlar | KampüsAI sunucusu, 12 karakterlik rastgele koda bağlı | Kullanıcı silene kadar. HTTPS ile aktarılır |
| Deneylerde AR, Hologram ve El ile kontrol (kamera) | Hiçbir şey: görüntü yalnızca ekranda arka plan ya da cihazda yüz ve el konumunu bulmak için kullanılır | — | Hayır; görüntü kaydedilmez, çıkınca kamera kapanır |
| Yazılı Sınavlar | Hiçbir şey; cevaplar ve puanlar yalnızca cihazda saklanır. Yalnızca "Yapay zekâ puanlasın" ya da "Yapay zekâyla yeni yazılı hazırla" seçilirse soru, ölçüt ve cevap metni seçili yapay zekâya gider | Seçili yapay zekâ (yalnızca isteğe bağlı) | Cevap taslakları ve puanlar cihazda |
| İngilizce Konuşma Pratiği | Sesin yazıya çevrilmesi: Android uygulamasında telefonun ses tanıması (İngilizce dil paketi indirildiyse internetsiz), tarayıcıda tarayıcının ses tanıma hizmeti, Windows uygulamasında ses kaydı. Değerlendirme için söylediğin cümle ve öğretmenin sorusu | Telefonun/tarayıcının ses tanıma hizmeti; Windows'ta ve değerlendirmede seçili yapay zekâ | Ses kaydı saklanmaz; yalnızca puanlar, düzeltmeler ve "Benim cümlelerim" cihazda |
| Canlı AR Çözüm (kamera) | Yalnızca kadrajdaki soru bölgesinin kırpılmış görüntüsü; kameranın geri kalanı cihazda işlenir | Seçili yapay zekâ (cihazdaki model ya da internet) | Görüntü ve çözüm kaydedilmez; çıkınca kamera kapanır |
| Çevrendeki Fiziği Bul | Çektiğin ya da yüklediğin sahne fotoğrafı (ya da yazdığın sahne tarifi) | Seçili yapay zekâ | Fotoğraf kaydedilmez; üretilen soru yalnızca cihazda |
| Konuşan Kavramlar | Kavrama sorduğun soru; "Doğal ses" açıksa cevap metni ses için Google Gemini'ye (kendi anahtarınla) | Seçili yapay zekâ; doğal seste Google Gemini | Konuşma kaydedilmez |
| Formül Defteri | Hiçbir şey; formüller uygulamanın içindedir | — | Yıldızladıkların yalnızca cihazda |
| Yapay zekâ cevaplarına 👍 / 👎 ve "Soru hatalı" | Hiçbir şey; kayıt (soru, cevap, hata türü, yazdığın düzeltme) yalnızca cihazda tutulur. Yalnızca sen "Dışa aktar" dersen bir dosyaya yazılır | — | Cihazda; Ayarlar › Yapay zeka › Geri bildirimlerim sayfasından silinebilir |
| 3B Modeller, 3B Dünya Küresi | Hiçbir şey; tüm veri uygulamanın içindedir | — | Hayır |
| Konu Podcast'i, Hologram öğretmen | Hiçbir şey (sesli okuma cihazda); yalnızca "Yapay zekâyla daha doğal yap" seçilirse konu metni ve sesli öğretmende soru, seçili yapay zekâya gider | Seçili yapay zekâ | Podcast metni yalnızca cihazda saklanır |
| Videodan Çalış (YouTube bağlantısı) | Video bağlantısı ve istem | KampüsAI sunucusu üzerinden Google Gemini (ya da kendi Gemini anahtarın) | Hazırlanan özet yalnızca cihazda saklanır |
| Öğretmene gönderilen özet | Zayıf/unutulan konu kodları, ders bazında sayılar, isteğe bağlı takma ad | QR veya kodla doğrudan öğretmenin cihazına | Yalnızca öğretmenin cihazında |

## Gerekçe, eminlik ve araştırma kayıtları

Normal konu testlerinde gerekçe metni/seçimi, eminlik, ipucu basamakları ve soruda geçen süre test sonucuyla birlikte saklanır; isteğe bağlı cihaz eşitlemesi açıksa mevcut test kayıtlarıyla birlikte eşitlenir. Öğretmene gönderilen sınıf özetinde son değerlendirilmiş testlerin soru sayısı ve ipucusuz doğruluk oranı da bulunabilir; serbest gerekçe metni bu özete eklenmez.

Araştırma oturumları ve sonuçları ayrı yerel depodadır ve otomatik bulut eşitlemesine girmez. QR/kod/yerel dosya aktarımı yalnızca kullanıcı eylemiyle yapılır; takma katılımcı kodu, cevaplar, gerekçe indisleri, eminlik, ipucu ve süre izleri taşınır. Ad, sohbet, fotoğraf ve serbest gerekçe metni bu aktarıma eklenmez. Kodlar şifreli veya imzalı değildir; katılımcı kodları başka kayıtlarla ilişkilendirilebilir. Araştırma kayıtları genel yerel yedek dosyasına dahildir. **Araştırma modu → Araştırma verilerini sil** yalnızca bu cihazdaki araştırma kayıtlarını siler; daha önce başka cihaza aktarılan kopyalar o cihazdan ayrıca silinmelidir.

## Haklarım

- **Erişim ve taşıma:** Ayarlar → Verilerini yedekle → Dışa aktar ile tüm verilerini bir dosya olarak alabilirsin.
- **Silme:** Ayarlar → "Tüm verileri sil" cihazdaki verileri siler. Eşitleme açıksa Ayarlar → Cihazlar arası eşitleme → "Sunucudaki verimi sil" sunucudaki kopyayı tamamen siler.
- **Vazgeçme:** İnternet modu ve eşitleme isteğe bağlıdır; Ayarlar'dan istediğin an kapatılabilir.

## ÖSYM soruları ve telif

Geçmiş YKS soruları yalnızca yapay zekâ modelini proje ekibinin bilgisayarında ölçmek için kullanılmıştır. Telif hakkı ÖSYM'ye ait olduğundan bu sorular uygulamaya, eğitim verisine ve kaynak koda konmamıştır; raporda yalnızca sonuç tabloları yer alır.

## Yapay zekâ hakkında uyarı

Yapay zekâ hata yapabilir. Cevap notlara dayandığında kaynağı [K1] gibi etiketlerle gösterilir. Önemli bilgileri ders kitabından veya öğretmeninden kontrol et.

## İletişim

Sorular ve silme talepleri için: GitHub'da [alperenay/ders-asistani](https://github.com/alperenay/ders-asistani/issues) üzerinden bildirim açabilirsiniz.
