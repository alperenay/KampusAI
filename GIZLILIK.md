# KampüsAI Gizlilik ve Kişisel Verilerin Korunması Notu

Son güncelleme: 17 Ekim 2026 · Sürüm 1.14.1

KampüsAI, lise öğrencileri için ücretsiz ve açık kaynaklı bir YKS çalışma uygulamasıdır. Kullanıcılarının çoğu 18 yaşından küçük olduğu için uygulama **mümkün olan en az veriyle** çalışacak şekilde tasarlandı. Bu not, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) temel ilkeleri gözetilerek hazırlanmıştır.

## Kısaca

- Hesap açılmaz. E-posta, telefon, T.C. kimlik numarası, okul numarası istenmez.
- Kayıtların (denemeler, testler, yanlış defteri, program, notlar, isteğe bağlı adın) **yalnızca kendi cihazında** saklanır.
- Cihaza indirilen yapay zekâ ile çalışırken hiçbir veri cihazdan çıkmaz.
- Reklam, analiz/izleme aracı, veri satışı ya da profilleme yoktur.

## Veri nereye gider?

| Durum | Ne gönderilir | Nereye | Saklanır mı |
| --- | --- | --- | --- |
| Cihazdaki yapay zekâ (Gemma 4) | Hiçbir şey | — | — |
| Eşleştirilmiş bilgisayar / Ollama | Soru, fotoğraf | Kullanıcının kendi bilgisayarı (aynı Wi-Fi) | Yalnızca o bilgisayarda |
| İnternet modu | Soru, fotoğraf; "Verilerim" açıksa soruyla ilgili kayıtlar | KampüsAI sunucusu (Cloudflare) üzerinden Google Gemini | KampüsAI sunucusu içeriği kaydetmez. Google'ın ücretsiz katman koşulları geçerlidir |
| Kota sayacı (internet modu) | Rastgele cihaz numarası, IP adresi | KampüsAI sunucusu | Yalnızca soru sayısı; her gün silinir |
| Cihazlar arası eşitleme (isteğe bağlı) | Eşitlenen kayıtlar | KampüsAI sunucusu, 12 karakterlik rastgele koda bağlı | Kullanıcı silene kadar. HTTPS ile aktarılır |
| Deneylerde AR, Hologram ve El ile kontrol (kamera) | Hiçbir şey: görüntü yalnızca ekranda arka plan ya da cihazda yüz ve el konumunu bulmak için kullanılır | — | Hayır; görüntü kaydedilmez, çıkınca kamera kapanır |
| 3B Modeller, 3B Dünya Küresi | Hiçbir şey; tüm veri uygulamanın içindedir | — | Hayır |
| Konu Podcast'i, Hologram öğretmen | Hiçbir şey (sesli okuma cihazda); yalnızca "Yapay zekâyla daha doğal yap" seçilirse konu metni ve sesli öğretmende soru, seçili yapay zekâya gider | Seçili yapay zekâ | Podcast metni yalnızca cihazda saklanır |
| Videodan Çalış (YouTube bağlantısı) | Video bağlantısı ve istem | KampüsAI sunucusu üzerinden Google Gemini (ya da kendi Gemini anahtarın) | Hazırlanan özet yalnızca cihazda saklanır |
| Öğretmene gönderilen özet | Zayıf/unutulan konu kodları, ders bazında sayılar, isteğe bağlı takma ad | QR veya kodla doğrudan öğretmenin cihazına | Yalnızca öğretmenin cihazında |

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
