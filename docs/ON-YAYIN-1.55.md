# 1.55 ön yayın doğrulaması

Bu sürüm mevcut mimariyi ve kayıt biçimlerini korur.

- Açılış: 1,65 saniye; sonlu parıltı ve yumuşak bitiş. Dokunma/klavye ile geçiş, sistem/uygulama hareket azaltma, zamanlayıcı ve olay dinleyicisi temizliği doğrulanır.
- Açık tema: primary/secondary/elevated yüzey katmanları. Test edilen ana metin ≥7:1, diğer metin/rozet/düğme/placeholder ≥4,5:1 ve giriş sınırları ≥3:1. Bu, her özel grafik öğesinin AAA sertifikası değildir.
- Ders görselleri: mevcut yerel SVG çizim aileleri gerektiğinde oluşturulur. Açıklama/kavramsal çağrı kutuları, yakınlaştırma, klavye ve iki parmakla büyütme vardır. Dış varlık indirilmez. Biyoloji açıklamalarındaki evrensel ATP verimi/enzim sıcaklığı genellemeleri kaldırılmıştır; bkz. [OpenStax hücresel enerji](https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation), [enzimler](https://openstax.org/books/biology-2e/pages/6-5-enzymes).
- AI üretimi: kompakt prompt, artımlı JSON nesnesi önizleme, sağlayıcıya uygun çıktı bütçesi. Önizleme geçicidir; nihai şema doğrulaması geçmeden test/sınav kaydedilmez. İptal/yeniden denemede önizleme sıfırlanır. Çıktı bütçesi yalnız yerel modelde ve OpenAI-uyumlu servislerde (OpenRouter, Groq…) uygulanır; Gemini ve api.openai.com'a verilmez, çünkü orada düşünme jetonları da bütçeden düşer ve JSON yarıda kesilebilir. Gerekçe seçenekleri ve ipuçları isteğe bağlıdır: eksik geldiğinde parti reddedilmez, serbest gerekçe ve genel ipuçları kullanılır.
- Kontrollü aynı içerik örneğinde soru promptu 770 → 598 karakter (%22 azalma). Bu token veya gerçek servis hız ölçümü değildir. Gerçek yerel Ollama bağlantısı reddedildiğinden model/kuantizasyon değişikliği yapılmadı; gerçek TTFT/kalite kazancı iddia edilmez. Başarılı çıkarım denemesi istatistikleri artık TTFT ve toplam süreyi kaydeder.
- Modal odak tuzağı, yalnız üst pencerenin Escape ile kapanması ve erken kapatmada zamanlayıcı temizliği eklendi. WebKit'in tanımadığı viewport direktifi kaldırıldı; mevcut visualViewport/native adjustResize yolu sınanır.

## Yeniden çalıştırma

`npm test`, `npm run lint`, `npm run type-check`, `npm run build`.

Yeni kontroller: `test:inference`, `test:inference-ui`, `test:lecture-visuals-ui`, `test:prerelease-ui`. Tüm tarayıcı denetimi: `test:audit-web`; Chromium, Firefox ve WebKit desteklenir. Ön yayın akışında servis durumları, sensörler ve AI yanıtları açıkça kontrollü örneklerdir. Fiziksel cihazların veya canlı model cevaplarının tamamı sınanmış sayılmaz.
