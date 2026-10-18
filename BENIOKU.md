# KampüsAI — Kurulum ve Kullanım

Ders programı, konu anlatımı, TYT-AYT deneme takibi, konu sonu testleri, yanlış defteri, odak sayacı,
YKS geri sayımı ve hedef netler, yapay zekâyla haftalık plan, benzer soru üretme, Feynman modu, ders hatırlatıcıları, "Bugün" ekranı, hata türü analizi, Sokratik mod ve yapay zeka asistanı.
**Windows**, **Android** ve **iPhone** için uygulama olarak gelir. Yapay zeka iki kaynaktan çalışır:

| Kaynak | Nerede çalışır | Ücret | Fotoğraf |
|---|---|---|---|
| **Hazır sunucu** (varsayılan) | KampüsAI'ın Cloudflare sunucusu üzerinden Gemini; **hiçbir ayar gerekmez** | Ücretsiz kota, tüm kullanıcılar paylaşır | Tek model hem okur hem çözer |
| **Yerel (Ollama)** | Bilgisayarındaki modeller; telefon da evdeki Wi-Fi'dan bunları kullanabilir | Ücretsiz, veriler cihazda kalır | Gemma 4 hem okur hem çözer |
| **İnternet (Gemini)** | Google'ın sunucuları; her yerde çalışır | Ücretsiz katman (dakikalık/günlük sınırlı) | Tek model hem okur hem çözer |
| **İnternet (OpenAI-uyumlu)** | OpenRouter, Groq, OpenAI, DeepSeek… | Servise göre | Modele göre |

**Otomatik** modda (varsayılan) bilgisayardaki Ollama hazırsa o, değilse internet servisi kullanılır.
Hangisi kullanılırsa kullanılsın asistan denemelerine, programına, notlarına ve üzerinde çalıştığın konuların
anlatımlarına bakarak yanıt verir (tamamladığın, test çözdüğün, not aldığın ya da Feynman'la anlattığın kazanımlar).

## 1. Kurulum

Kurulum dosyaları GitHub'daki deponun **Releases** sayfasındadır (her güncellemede otomatik derlenir).

- **Windows:** `KampusAI-Kurulum-….exe` dosyasını indirip çalıştır.
  Windows "bilgisayarınızı korudu" derse **Ek bilgi → Yine de çalıştır** (uygulama imzasız olduğu için çıkar).
- **Android:** `KampusAI-….apk` dosyasını telefondan indirip aç. İlk seferde "bilinmeyen kaynaklardan yükleme" izni istenir.
  Yeni sürüm eskisinin üzerine kurulur; verilerin silinmez.
- **iPhone:** Safari'de `https://<kullanıcı-adı>.github.io/ders-asistani/` adresini aç → **Paylaş** → **Ana Ekrana Ekle**.
  İlk açılıştan sonra internet olmadan da açılır (yapay zeka için internet gerekir).

## 2. Yapay zekayı bağlamak

Hazır sunucu kuruluysa (bkz. bölüm 7) uygulama açılır açılmaz yapay zekâ çalışır; aşağıdakiler isteğe bağlıdır.

### Kendi Gemini anahtarınla — her cihazda
1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) adresinde Google hesabınla **API anahtarı oluştur**.
2. Uygulamada **Ayarlar → Yapay zeka ayarları → İnternet** sekmesine anahtarı yapıştır → **Bağlantıyı test et** → **Kaydet**.
3. Model "Otomatik" kalabilir (en yeni Flash modeli seçilir).

> Ücretsiz katmanda Google gönderilen içerikleri ürünlerini geliştirmek için kullanabilir. Kişisel verilerin gitmesini istemediğin
> sorularda yazı kutusundaki 🗄 (Verilerim) düğmesini kapatabilir ya da yerel modu kullanabilirsin.

### Yerel (Ollama) — bilgisayarda
[Ollama](https://ollama.com) kurulu olmalı. Komut istemine (cmd) şunları yaz:

```
ollama pull gemma4:e4b
ollama pull bge-m3
```

| Model | Görevi |
|---|---|
| `gemma4:e4b` | **Beyin ve göz**: soruları yanıtlar, konuları açıklar, fotoğraftaki soruyu okuyup çözer |
| `bge-m3` | **Hafıza**: denemelerini, programını, notlarını ve konu anlatımlarını bulup beyne verir |

Neden Gemma 4? Eğitimde hiç görülmemiş 215 soruluk testte çoktan seçmelide %89,5 doğru, saniyede ~180 token
(önceki varsayılan qwen2.5:14b: %64, ~31 token/sn). Fotoğrafı da kendisi okuduğu için ayrı bir "göz" modeli
gerekmez; ekran kartında model değişmediği için fotoğraflı sorular çok daha hızlı yanıtlanır.

Windows uygulaması Ollama kapalıysa açılışta kendisi başlatmayı dener.

### Telefonda bilgisayardaki modelleri kullanmak (QR kod)
1. Bilgisayarda KampüsAI uygulamasını aç → **Ayarlar → Yapay zeka ayarları → Telefon bağlantısı** → kutuyu işaretle.
   Windows Güvenlik Duvarı sorarsa **Özel ağlar**'a izin ver. Ekranda bir **QR kod** çıkar.
2. Telefondaki uygulamada **Ayarlar → Yapay zeka ayarları → Yerel (Ollama) → QR kodla bilgisayara bağlan** → kodu okut. Bu kadar.
   (İstersen adresi ve 6 haneli kodu elle de yazabilirsin.)

Telefon ve bilgisayar aynı Wi-Fi'da olmalı. Evden çıkınca (otomatik modda) telefon kendiliğinden Gemini'ye geçer.
iPhone'daki web uygulaması güvenlik kısıtı nedeniyle bilgisayara bağlanamaz; orada internet servisi kullanılır.

## 3. Asistanı kullanmak

- Soruyu yazıp Enter'a bas. Yanıt yazılırken ■ düğmesiyle durdurabilirsin.
- **Fotoğraf:** 🖼 düğmesiyle seç (telefonda kamera da açılır), panodan yapıştır (Ctrl+V) ya da kutuya sürükle.
- **Verilerim (🗄):** açıkken asistan denemelerine, programına ve notlarına bakarak yanıt verir.
  Her yanıtın altında hangi kayıtların kullanıldığı ve hangi modellerin çalıştığı görünür.
- Sohbetler sol menüde **Sohbetler** altında saklanır; yedek dosyasına da dahildir.
- Bir yanıtın altındaki 🔖 düğmesi soruyu ve çözümü **Yanlış Defteri**'ne ekler.
- **Sesli öğretmen:** Yazı kutusundaki 🎙 düğmesi. Konuşursun, asistan sesli cevap verir, sonra yeniden dinler.
  Düğmeler ekranın altında: **Bitir** (sohbeti kaydedip kapatır), ortada duruma göre **Gönder / Sustur / Vazgeç / Devam et**
  ve **Duraklat** (mikrofonu kapatır). Küreye dokunmak ortadaki düğmeyle aynı işi yapar; telefonun geri tuşu da kapatır.

### Menü ve arama

- Sol menü üç gruba ayrılır: **Çalış** (konular, kartlar, yanlışlar, deneyler, çözüm kontrolü, program),
  **Takip** (denemeler, simülasyon, harita, kök analiz, puan, rapor) ve **Araçlar**. Grup başlığına tıklayınca
  açılır/kapanır; kapalı bir grupta bekleyen iş (ör. tekrar zamanı gelen yanlışlar) başlıkta nokta olarak görünür.
- **Arama:** üst çubuktaki arama kutusu ya da **Ctrl+K** (Mac'te ⌘K) veya **/** tuşu. Konu adları, sayfalar,
  sohbetler ve eylemler ("tema değiştir", "deneme ekle", "yedek al") aranır; Türkçe karakter yazmak gerekmez
  (*sarkac* → *sarkaç*). Sonuç yoksa soruyu tek tuşla asistana sorarsın.
- Tema, dil ve yedek alma üst çubuktaki ay/güneş düğmesinin altında toplanır.

### Telefonda kullanım
- Altta **Asistan, Bugün, Konular, Denemeler** sekmeleri ve tüm bölümler için **Menü** var; klavye açılınca sekmeler gizlenir.
- Pencereler (ayarlar, onaylar) alttan açılır; **Kaydet / Vazgeç** gibi düğmeler en altta durur, başlığı aşağı çekince kapanır.
- Konu sayfasında altta **Önceki · Test · Anlat · Tamamla · Sonraki** kısayolları; deneme simülasyonunda önceki/sonraki hep altta.

## 3a. Çalışma araçları

- **Konu sonu testi:** Konu Anlatımı'nda her kazanımın sayfasında *10 soruluk test başlat* — yapay zekâ o konudan
  10 soruluk, 5 şıklı bir test hazırlar. Bitirince puan ve çözümler görünür; yanlış ve boş bıraktığın sorular
  kendiliğinden Yanlış Defteri'ne eklenir.
- **Benzer soru üretme:** Yanlış Defteri'ndeki her soruda, konu sonu testinde yanlış yaptığın sorularda ve sohbette
  (yanıtın altındaki katman simgesi) *Benzer soru üret* var. Yapay zekâ aynı yöntemle çözülen ama sayıları ve kalıbı
  farklı 3 yeni soru yazar; fotoğraflı sorularda fotoğrafı da okur. Şıkka basınca doğru cevap ve çözüm hemen görünür,
  yanlışların deftere eklenir. *3 yeni soru daha* ile devam edebilirsin.
- **Bana anlat (Feynman modu):** Her kazanım sayfasında *Anlatmaya başla*. Konuyu hiç bilmeyen birine anlatır gibi
  kendi cümlelerinle yaz (tarayıcı destekliyorsa *Sesle anlat* ile konuşarak da olur). Yapay zekâ anlatımını doğruluk,
  kapsam, açıklık ve örnek açısından 100 üzerinden puanlar; doğru anlattıklarını, eksiklerini ve kavram yanılgılarını
  gösterir, zayıf kısımları sade bir dille yeniden anlatır ve kendine sorman için sorular verir. *Anlatımımı düzelt*
  ile tekrar denediğinde puanın ne kadar arttığı ve tüm denemelerinin gelişimi görünür.
- **Hap Kartları:** Konu anlatımlarındaki hap bilgiler ve çözümlü örnekler kendiliğinden çalışma kartına dönüşür
  (internet ve yapay zekâ gerekmez). Hap bilgide kalın yazılan kısım, formül ya da cümlenin sonu gizlenir; hatırla,
  kartı çevir, *Bilmedim / Zor / Bildim* de. Kartlar unutmaya başlamadan hemen önce geri gelir
  (1 → 3 → 7 → 16 → 35 → 75 → 150 gün). Tamamladığın ve testini çözdüğün konular desteye kendiliğinden eklenir,
  konu sayfasından elle de eklenebilir. Telefonda çevirdikten sonra sola kaydır = Bilmedim, sağa = Bildim.
  Kart sonuçları Kök Eksik Analizi'ne ve Bugün planına katılır.
- **Deney Laboratuvarı:** Kaydırıcılarla oynanan fizik ve matematik deneyleri: eğik atış, ivmeli hareket grafikleri,
  sarkaç, yay–kütle, dalga, iki kaynaklı girişim, mercek ışın çizimi, fonksiyon grafikleri (teğet ve türev ile) ve
  birim çember. İlgili konu sayfalarında (ör. 11. sınıf atışlar, 10. sınıf parabol) kendiliğinden görünür.
- **Yanlış Defteri:** Sorular aralıklı tekrarla geri gelir (1 → 3 → 7 → 16 gün). *Bildim* dedikçe seyrekleşir,
  4 kez bilince "öğrenildi" olur. *Soru ekle* ile kitaptan fotoğraf çekip kendi sorunu da ekleyebilirsin.
  Sol menüdeki sayı, bugün tekrar etmen gereken soru sayısıdır.
- **Odak Sayacı (Pomodoro):** 25 dk odak → 5 dk mola, her 4 turda 15 dk uzun mola (süreler değiştirilebilir).
  Hangi derse çalıştığını seç; günlük/haftalık süreler ve ders ders dağılım tutulur. Başka sayfaya geçince
  sayaç üst çubukta görünmeye devam eder.
- **YKS geri sayımı ve hedef netler:** Ana ekranda YKS'ye kalan gün görünür. Deneme Takibi'nde *Hedefleri düzenle*
  ile TYT/AYT toplam ya da ders ders hedef net gir; son 3 denemenin ortalamasıyla karşılaştırılır ve haftada kaç net
  artırman gerektiği hesaplanır. (2027 sınav tarihi ÖSYM açıklayana kadar tahminidir; tarihi buradan değiştirebilirsin.)
- **Yapay zekâyla haftalık plan:** Ders Programı → Programım → *Yapay zekâyla plan*. Çalışma saatlerini ve
  odak sınavı seç; denemelerindeki zayıf derslere göre bir hafta hazırlanır, önizleyip *Programıma uygula* dersin.
- **Ders hatırlatıcıları:** Ders Programı → Programım → *Hatırlatıcı* (ya da Ayarlar → Ders hatırlatıcıları).
  Programındaki her ders bloğunun saatinde (istersen 5/10/15 dk önce) bildirim gelir; bildirime dokununca Odak Sayacı
  o dersle açılır, Android'de bildirimdeki *Odak sayacını başlat* sayacı hemen başlatır. Android'de uygulama kapalıyken
  de gelir; bilgisayarda ve tarayıcıda uygulama açıkken (küçültülmüş olsa da) gelir. Mola blokları için bildirim gelmez.
- **Bugün ekranı:** Sol menüde *Bugün*. Şu an hangi dersin olduğu (bitmesine kalan süre, tek dokunuşla odak sayacı),
  sıradaki ders, günün akışı, tekrar zamanı gelen yanlışlar, odak süresi ve seri, YKS sayacı, bugün bakman önerilen konu
  (en düşük test sonucun ya da en çok yanlış yaptığın kazanım) ve en sık hata türün tek ekranda.
- **Hazır konu anlatımları (9–12. sınıf):** 9. sınıfın dokuz dersinin tamamında ve 10, 11, 12. sınıfların
  neredeyse tüm derslerinde (Türk Dili ve Edebiyatı, Matematik, Fizik, Kimya, Biyoloji, Tarih / İnkılap Tarihi,
  Coğrafya, Felsefe, Din Kültürü, İngilizce) ünite/tema ve kazanım listesi, konu anlatımı, örnek sorular ve hap
  bilgiler uygulamanın içinde hazır gelir; yapay zekâ gerekmez, çevrimdışı da açılır. Notları düzenlemek için
  üreticileri değiştirip çalıştır: 9. sınıf `tools/gen9/` (`python3 kim.py` → `js/data/content/kim-9.js`),
  10–12. sınıf `tools/gen1012/` (`python3 kim11.py` → `js/data/content/kim-11.js`).
- **Yapay zekâyla konu içeriği:** Hazır içeriği olmayan derslerde (şu an 11. sınıf İngilizce ve 12. sınıf Felsefe)
  ders açılınca konu listesi (üniteler ve kazanımlar), kazanım açılınca konu anlatımı, 3 çözümlü örnek ve hap bilgiler
  yapay zekâyla hazırlanır. Bir kez hazırlanır, kaydedilir ve diğer cihazlara eşitlenir; konu sonu testi, Feynman modu
  ve asistan bu içerikleri de kullanır. *Yeniden oluştur* ile tazelenebilir. Yapay zekâ hata yapabilir; önemli
  bilgileri ders kitabıyla karşılaştır. Bir ders sonradan hazır notlara geçerse eski yapay zekâ içerikleri ve ön koşul
  haritası kendiliğinden devre dışı kalır.
- **Hata türü analizi:** Yanlış Defteri'nin başında. Her yanlışın türü — kavram yanılgısı, bilgi eksikliği, işlem
  hatası, dikkatsizlik, süre yetmemesi — konu sonu testinden sonra seçtiğin yanlış şıka bakılarak yapay zekâyla
  belirlenir ya da karttaki *Hata türü?* düğmesinden sen seçersin. Dağılım, ders bazında kırılım ve en sık hatan için
  öneri gösterilir; asistan da bunu bilerek yanıt verir.
- **Sokratik mod (öğretmen modu):** Yazı kutusundaki pusula düğmesi. Açıkken asistan cevabı hemen vermez; tek tek
  ipuçları ve sorularla çözümü senin bulmanı sağlar. Yanıtın altındaki *İpucu ver* / *Çözümü göster* düğmeleriyle ilerlersin.
- **Kök eksik analizi:** Sol menüde *Kök Eksik Analizi*. Zorlandığın bir konunun asıl kaynağını bulur: her kazanımın
  hangi kazanımlara dayandığı bir ön koşul haritasında tutulur (9. sınıf için elle hazırlandı, dersler arası bağlar dahil —
  ör. fizikte vektörler → matematikte Pisagor; diğer dersler için harita yapay zekâyla çıkarılıp kaydedilir ve
  dersin kazanım listesi değişirse yeniden çıkarılması istenir).
  Konu sonu testleri, Feynman puanları, çözüm kontrolleri ve açık yanlışlardan her konu için bir hâkimiyet puanı
  hesaplanır. Zayıf bir konunun ön koşullarında da zayıflık varsa en temeldeki konu "kök eksik" olarak gösterilir;
  ön koşullar sağlamsa "sorun konunun kendisinde", hiç denenmemişse "önce bunları dene" denir. Konu sayfasında
  *Ön koşullar* kartı, düşük puanlı test sonucunda kök ipucu var; *Bugün* ekranı da zayıf konunun kökünü önerir.
- **Çözümümü kontrol et:** Sol menüde ya da konu sayfasında. Kâğıda yaptığın çözümün fotoğrafını yüklersin; yapay
  zekâ çözümü baştan vermez, adımlarını tek tek kontrol eder: hatanın hangi adımda olduğunu, sonraki adımların bu
  hatayı taşıdığını, hata türünü (kavram, bilgi, işlem, dikkat, süre) ve cevabı söylemeden bir ipucunu gösterir.
  Doğru devam ancak *Doğrusunu göster* denince açılır. Sonuç tek dokunuşla hata türüyle yanlış defterine eklenir,
  konu seçildiyse kök eksik analizine katılır. Bilgisayardaki yerel modelde el yazısı önce görme modeliyle satır
  satır yazıya dökülür, sonra ana model kontrol eder.
- **Sesli Feynman:** Feynman sayfasında *Konuşarak* sekmesi. Konuyu yazmak yerine sesli anlatırsın; konuşma yazıya
  dökülür. Android uygulamasında telefonun ses tanıma motoru kullanılır (Türkçe dil paketi yüklüyse internet
  gerekmez); Chrome'da tarayıcının ses tanıması; Windows uygulamasında ses kaydedilir ve yapay zekâ (KampüsAI
  sunucusu ya da Gemini) yazıya çevirir. Değerlendirmede ayrıca konuşma analizi gelir: süre, kelime sayısı,
  tempo (kelime/dakika) ve dolgu sözcükleri ("ııı", "şey", "yani"…). İlk kullanımda mikrofon izni istenir.
- **Erişilebilirlik:** Üst çubuktaki insan simgesi (ya da Ayarlar → *Erişilebilirlik*). Yazı boyutu (büyük, çok büyük),
  disleksi dostu yazı tipi (OpenDyslexic, uygulamanın içinde), geniş satır/harf aralığı, okuma cetveli, yüksek
  karşıtlık ve hareketleri azaltma. Konu anlatımı, örnekler, hap bilgiler, asistan yanıtları ve Feynman
  açıklamalarında *Dinle* düğmesi metni paragraf paragraf sesli okur (formüller okunabilir hâle getirilir,
  okunan paragraf vurgulanır); okuma hızı ayarlanabilir. Ekran okuyucular için simgeli düğmeler etiketlidir,
  *İçeriğe geç* bağlantısı vardır. Türkçe ses, cihazın dil ve konuşma ayarlarından eklenebilir.
- **Tanıtım turu:** Uygulamayı ilk kez açınca 20 adımlık canlı bir tur her özelliği gerçek sayfalar üzerinde gösterir.
  Güncelleme yapan eski kullanıcılara gösterilmez; istenirse Ayarlar → *Tanıtımı yeniden izle*.

## 4. Verileri cihazlar arasında taşımak

**Otomatik eşitleme (önerilen):** Ayarlar → **Cihazlar arası eşitleme** → ilk cihazda *Eşitlemeyi başlat*.
Çıkan 12 haneli kodu diğer cihazda yazıp **Bağlan**'a bas ya da QR kodunu okut. Bundan sonra denemeler, program, notlar,
sohbetler, testler, yanlış defteri, Feynman denemeleri, odak süreleri ve hedefler cihazlar arasında kendiliğinden eşitlenir.
Kodu bilen herkes verilere erişebilir; kimseyle paylaşma. API anahtarları eşitlenmez.

**Elle taşıma:** Her cihaz kendi verisini saklar. Taşımak için: eski cihazda sağ üstteki **Yedekle** → oluşan dosyayı yeni cihaza gönder →
yeni cihazda **Ayarlar → İçe aktar**. (Tarayıcıda `Baslat.bat` ile kullandığın sürümden uygulamaya geçerken de böyle.)
API anahtarları yedeğe girmez; her cihazda ayrıca girilir.

## 5. Sorun giderme

| Belirti | Çözüm |
|---|---|
| "Yapay zekâ bağlı değil" | Ayarlar'dan Gemini anahtarı gir ya da bilgisayarda Ollama'yı başlat. |
| "Ollama'ya ulaşılamadı" | Ollama uygulamasını aç (sistem tepsisinde lama simgesi). |
| Telefonda "Bilgisayardaki yapay zekâya ulaşılamadı" | Bilgisayar açık mı, KampüsAI uygulaması çalışıyor mu, Telefon bağlantısı açık mı, iki cihaz aynı Wi-Fi'da mı? |
| "Bağlantı kodu yanlış" | Bilgisayardaki Telefon bağlantısı sekmesindeki kodu tekrar yaz. |
| "… anahtarı geçersiz" | Anahtarı aistudio.google.com'dan yeniden kopyala. |
| "Kullanım sınırına ulaşıldı" | Ücretsiz katman sınırı; biraz bekle ya da Ayarlar'dan başka model seç. |
| "… modeli yüklü değil" | Belirtilen `ollama pull …` komutunu çalıştır. |
| İlk yerel yanıt çok geç geliyor | Model ilk kullanımda belleğe yükleniyor; sonraki yanıtlar hızlıdır. |

## 6. Tarayıcıda kullanmak (uygulamasız)

Klasördeki **`Baslat.bat`** dosyasına çift tıkla; site `http://localhost:8765` adresinde açılır ve Ollama'ya aracılık eder.
macOS / Linux için `./baslat.sh`.

## 7. Hazır sunucuyu kurmak (bir kez, uygulamayı dağıtan kişi)

Sunucu `server/worker.js` dosyasıdır ve her derlemede GitHub Actions tarafından Cloudflare'e yüklenir.
Gemini anahtarı yalnızca Cloudflare'de gizli değişken olarak durur; uygulamada ve repoda yoktur.

1. [dash.cloudflare.com](https://dash.cloudflare.com) adresinde ücretsiz hesap aç; **Workers & Pages** sayfasını bir kez aç
   (ücretsiz `….workers.dev` adresin oluşur). Aynı sayfada sağdaki **Account ID**'yi kopyala.
2. **My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"** şablonu → **Create Token** → anahtarı kopyala.
3. GitHub'da repo → **Settings → Secrets and variables → Actions → New repository secret** ile üç değer ekle:
   `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `GEMINI_API_KEY`.
4. Yeni bir derleme başlat (Actions → Derle ve yayınla → Run workflow). Sunucu yayınlanır ve adresi uygulamalara kendiliğinden yazılır.

Sunucu yalnızca Flash modellerine izin verir ve IP başına dakikalık istek sınırı uygular (`server/wrangler.toml`).
Kullanıcı sayısı artıp ücretsiz kota yetmezse Google AI Studio'da faturalandırmayı açmak sınırları yükseltir (ücretli).

## Teknik not

- Saf HTML, CSS ve JavaScript; uygulama kodu tek: Windows sürümü **Electron** (`desktop/`), Android sürümü **Capacitor** (`mobile/`),
  iPhone sürümü **PWA** (`manifest.webmanifest`, `sw.js`) ile paketlenir. Derleme `.github/workflows/build.yml` ile GitHub'da yapılır.
- QR eşleştirme `js/modules/pairing.js` (qrcode-generator MIT, jsQR Apache-2.0; `assets/vendor/qr`).
- Yapay zeka kodu `js/ai/`: `engine.js` motor seçimi, `ollama.js` yerel bağlantı, `cloud.js` Gemini ve OpenAI-uyumlu servisler,
  `vision.js` göz, `rag.js` hafıza (vektör + kelime araması), `pipeline.js` hepsini birleştiren akış.
- Veriler IndexedDB'de tutulur; vektörler de orada önbelleğe alınır (model başına), yalnızca değişen kayıtlar yeniden hesaplanır.
- Matematik gösterimi için KaTeX'in yerel kopyası (`assets/vendor/katex`, MIT lisansı) kullanılır.
