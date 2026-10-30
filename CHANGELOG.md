# Sürüm notları

## 1.61.0 — Glassmorphism

- Web/PWA, Android ve masaüstü için ortak cam tasarım katmanı.
- Açık/koyu temada yarı saydam yüzeyler, kenar ışığı ve statik arka plan renkleri.
- Mobilde sınırlı blur; düşük GPU, yüksek karşıtlık ve azaltılmış saydamlık için sade görünüm.
- Üç tarayıcı motorunda tasarım, kontrast ve araç yerleşimi kontrolleri.
- [Ayrıntılar](docs/GLASSMORPHISM.md).

## 1.60.0 — Belge, ödev, not ve sözlü prova

- Kaynak bölümlerine bağlı belge çalışma paketi: yerel PDF/DOCX/TXT/MD okuma, özet, kavramlar, kartlar ve test.
- Elle/fotoğraftan ödev taslağı, teslim tarihi, adımlar, tamamlanma ve düzenleme.
- Defter fotoğrafından düzenlenebilir metin; genel notlar ve mevcut konu notuna ekleme.
- Kaynaktan sözlü prova; sesli/yazılı yanıt, üç ölçütlü geri bildirim ve geçmiş.
- Konu notundan defter aktarımına hızlı geçişte gecikmeli otomatik kaydın eklenen metni ezmesi düzeltildi.
- Görünür doğruluk uyarıları. Çevrendeki Fizik ve Canlı AR Çözüm kaldırıldı; ortak laboratuvar AR motoru korundu.
- [Kullanım, gizlilik, kaynaklar ve sınırlar](docs/CALISMA-ALANI.md).

## 1.59.0 — 2026-10-30

- Menünün altındaki mükerrer öğrenci profili ve Ayarlar düğmesi kaldırıldı; üst profil kartı ve Ayarlar ekranı yenilendi.
- Akıllı menü, sabitlenenler ve son kullanılan araçlar için kısayollar, kişiselleştirilebilir ana panel ve beş renk teması eklendi.
- AI aşamalarına model seçimi eklendi. Zor sorularda, manuel seçim yapılmadıysa, daha güçlü bulut modeline yönlendirme eklendi; model yoksa mevcut seçeneklere geri dönülür.
- Sohbet kod bloklarını kopyalama ve gönderilmemiş metni yalnızca cihazda tutan taslak kurtarma eklendi.
- PDF/ODF/TXT belgesinden çalışma paketi, yerel öğrenci portfolyosu ve AI sunum taslağı eklendi.
- Davet kodlu ortak not odaları (7 günlük kullanılmama süresi, eşzamanlı düzenleme çakışma denetimi); kişisel notlar ve kayıtlar odalara otomatik gönderilmez.
- Yeni ağır belge/portfolyo/sunum/oda modülü ilk açılışta değil, ihtiyaç halinde yüklenir.


## 1.58.0 — 2026-10-30

- Android/WebView açılışında beyaz veya siyah boş ekran yerine HTML ilk çiziminden itibaren KampüsAI markalı karşılama ekranı gösterilir. Uygulama hazır olduğunda hafifletilmiş nöral çekirdek animasyonuna geçilir; WebView başlangıçta gizli görünüyorsa ilk görünür an beklenir.
- Yapay zekâ yanıtı beklenirken yeni mor/camgöbeği yörüngeli animasyon, aşama, model adı ve süre sayacı görünür. Metin akarken animasyon korunur.
- Mobilde yanıt akışı en fazla yaklaşık 11 kez/saniye yeniden çizilir. Süre sayacı yalnız kendi metnini günceller, bütün mesajı yeniden oluşturmaz.
- Açılış animasyonunda pahalı süs katmanları telefonda azaltıldı, mobil sohbet kartlarında gereksiz bulanıklıklar kaldırıldı; düşük hareket tercihleri desteklenir.
- Sesli öğretmen küresi mobilde daha düşük tuval çözünürlüğü ve yaklaşık 30 FPS çizim bütçesi kullanır. Mevcut ders/veri kayıtları ve yapay zekâ sağlayıcıları değiştirilmedi.


## 1.56.0 — 2026-10-29

- Gerçekçi ses: anahtar varsa uzun anlatımlar ElevenLabs, OpenAI ya da Gemini bulut sesiyle okunur; ilk cümle ayrı istenir, sonraki iki parça çalarken hazırlanır. Hata ya da kotada cihaz sesine geçilir, servis 10 dakika denenmez. Ayar: Erişilebilirlik › Gerçekçi ses.
- Sesli öğretmen, yapay zekâ cevabı gelirken tamamlanan cümleleri okur (`App.speech.stream`); Sustur hem okumayı hem isteği keser.
- Açılış animasyonu yeniden yazıldı: nöral çekirdek, ızgara, tarama ışığı, şok dalgası, parçacıklar ve hologram geçişi (1,75 sn).
- Sesli öğretmen küresi canvas'ta durumlara göre canlanır; düğmelerde dokunuş ışıması ve telefonda 10 ms titreşim (Erişilebilirlik › Dokunuş titreşimi).
- Telefonda performans: sonsuz gölge/filtre animasyonları ve kürenin mikrofon gölgesi transform/opacity'ye taşındı; kalan sabit bulanıklıklar kapatıldı.
- Yeni testler: `test:tts`, `test:voice-ui`.


## 1.55.0 — 2026-10-29

- Açık tema yüzey hiyerarşisi, metin/durum kontrastı ve giriş sınırları iyileştirildi; açılış 1,65 saniyelik yumuşak geçişle yenilendi.
- Derslerde yerel SVG görsellerine gecikmeli oluşturma, tutarlı açıklamalar ve yakınlaştırmalı inceleme eklendi.
- Test/yazılı üretiminde kompakt prompt, akıştan doğrulanan geçici soru önizlemesi ve sınırlı çıktı bütçeleri. Son doğrulama ve iptal/kayıt yalıtımı korunur.
- Üst üste pencerelerde Escape/odak ve erken kapatma zamanlayıcısı düzeltildi. WebKit viewport uyarısı giderildi.
- Ölçümler ve sınırlar: [ön yayın raporu](docs/ON-YAYIN-1.55.md).


## 1.54.0 — 2026-10-29

- Android açılış testinde dış UiAutomation süreç çöküşünün uygulamaya mal edilmesi düzeltildi. Uygulama, yeniden başlatılmış süreç ve bağlı WebView çöküşleri testi durdurmaya devam eder; dış hatalar ayrı raporlanır.

- Konu anlatımında rehber kartının iki sütunlu masaüstü düzenine üçüncü öğe olarak eklenip metni 250 piksele sıkıştırması düzeltildi. Yardım dersin ana alanında gösterilir.
- Diğer ızgaralı araçlarda yardım kartı kendi satırını kaplar. Okuma modundan çıkışta klavye odağı korunurken sayfa başlığa sıçramaz.
- Fütüristik açılış: altıgen HUD çizimi, perspektif halka ve logo belirimi. 1,45 saniyede temizlenir; dokunma/klavyeyle geçilir, hareket azaltmada gösterilmez. Animasyon dinleyicileri kapatılırken temizlenir.
- Beş ders, masaüstü eşik genişlikleri, sütun sırası, yardım yüksekliği ve okuma konumu testleri eklendi. Son dil/sensör/oyun/deney modülleri çoklu motor regresyonuna dahil edildi.


## 1.53.0 — 2026-10-29

- Her platformun uygulama açılışında kısa logo/yörünge animasyonu. Yalnız belge açılışında oynar; dokunma veya klavyeyle geçilir, en geç 1.05 saniyede temizlenir. Hareket azaltma açıkken gösterilmez; uygulama başlangıcı animasyonu beklemez.

- Yalnız görsel tasarım: nötr koyu ve kırık beyaz açık tema, tutarlı mor–mavi vurgu, sakin arka planlar.
- Kart, düğme, başlık, menü, AI çalışma alanı, boş durum ve grafik tema renkleri ortak tasarım değişkenlerinde birleştirildi.
- Atmosfer tercihi, yüksek karşıtlık, hareket azaltma, okuma modu ve mobil güvenli alanlar korunur. Yeni bağımlılık veya işlev eklenmedi.
- Açık/koyu temalarda 18 yerleşim senaryosu ve temel metin renkleri için 4.5:1 kontrast sınaması eklendi.


## 1.52.0 — 2026-10-29

- Akan ışık şeritleri: mor, okyanus, kutup ışığı veya sade görünüm; yerel renk ve arka plan hareket tercihi. Arka plan yalnız ana çalışma ekranlarında görünür; okuma ve deneyleri örtmez.
- Menü kategorileri simgeli, belirgin kutulara ayrıldı. Mobil menü uygulamanın mevcut açık/koyu tema renklerini kullanan opak yüzeyde; üstte ek Ayarlar ve kapat düğmesi var. Kenardan kenara Android güvenli alanları alt/üst düğmeleri sistem çubuklarından uzak tutar.
- Konu anlatımında Menüleri gizle: menüleri/ders araçlarını gizleyen okuma modu, sabit Menüleri göster ve Escape ile geri dönüş.

- Mobil alt menüde seçili sekmeyi izleyen renkli ışık ve esnek geçiş.
- Görünür kart ve başlıklarda sınırlı, kademeli belirme; fareyle kart yükselmesi ve tıklama halkası.
- Hareket azaltma (sistem/uygulama), arka plan durdurma, hızlı gezinmede temizleme ve eski tarayıcıda statik geri dönüş.
- Dekoratif katmanlar tıklamaları engellemez, öğrenme verisini veya form içeriğini değiştirmez. En fazla 18 görünür öğe hareketlendirilir; yeni bağımlılık eklenmez.


## 1.51.0 — 2026-10-28

### Dil öğrenme (İngilizce ve Almanca)
- Tek pratik motoru (`language-practice.js`) iki dili aynı akışla çalıştırır: `#/konusma/pratik` (English) ve `#/konusma/de` (Deutsch). İngilizce yapay zekâ konuşma pratiği (`#/konusma`) ayrıca sürer.
- Her dilde ve her seviyede (A1–B2) 20 kelime, 5 gramer kuralı, 4 diyalog, 2 çok adımlı rol oyunu (kafe, okul, istasyon, doktor, grup projesi, şikâyet, münazara, burs mülakatı) ve 4 dinle-yaz cümlesi var (`js/data/languages-ext.js`).
- Altı etkinlik var: kelimeler, kelime testi, gramer, diyalog, rol oyunu ve dinle-yaz. Kelime testinde çeldiriciler aynı seviyeden gelir. Seçenek sırası tohumlu karıştırmayla belirlenir; doğru şık hep aynı yerde olmaz. Dinle-yaz sözcük sözcük karşılaştırılır.
- İlk yanıtlar dil başına ayrı saklanır; seviye ilerleme çubuğu gösterilir.

### Seslendirme
- Sesler kaliteye göre sıralanır; Natural, Neural, Enhanced ve Premium sesler önce gelir. Kullanıcı Erişilebilirlik panelinden ses seçip deneyebilir.
- Uzun metinler cümle sınırlarından 220 karaktere kadar parçalara bölünür ve aralarda kısa duraklamalar olur. Türkçede birim ve kısaltmalar okunur hâle gelir (m/s, km, °C, %, vb., örn.).
- Android'de yüklü en yüksek kaliteli ses seçilir; yeni `ttsSpeak3` köprüsü ses sırasını da alır. Podcast'in iki konuşmacısı ayrı seslerle konuşur, ses tonu daha az kaydırılır ve konuşmacılar arasında doğal bir ara verilir.

### Yapay zekâ soru üretimi
- İlk önizleme partisinden sonra kolay, orta ve zor partiler bulut sağlayıcılarda paralel istenir. Tek iş parçacıklı yerel modelde sırayla üretilir.
- Konu testinde tamamlanan havuz 21 gün saklanır (`meta "qpool:*"`). Konu yeniden açılınca test beklemeden başlar; arka planda 3 yeni soru eklenir (en çok 30). Araştırma modu bu önbelleği kullanmaz.
- İstem değişiklikleri:
  - Orta sorular iki adımlı ya da tablo/grafik yorumu ister.
  - Zor sorular gerçek hayat bağlamında çok adımlıdır.
  - Çeldiriciler yaygın kavram yanılgılarından gelir.
  - Çözüm en çok 3 numaralı adım olarak yazılır.

### Bilgiyi Başka Yerde Kullan ve Çözümdeki Hatayı Bul
- 6 yeni disiplinlerarası aktarım ailesi: ortalama sürat, özkütle, üstel büyüme, olasılık, harita ölçeği, elektrik enerjisi. Her biri denklem, grafik/tablo ve günlük yaşam bağlamında sorulur; kuralı ve başka hangi alanlarda kullanıldığı gösterilir.
- 12 yeni hata analizi eklendi; her biri adı konmuş bir kavram yanılgısına dayanır. Geri bildirimde adım adım çözümleme yer alır: doğru adım, ilk hata ve hatadan türeyen adımlar.

### Oyunlar
- **Sayı Doğrusu Avcısı:** tahmin edilen değere ne kadar yakın dokunulduğuna göre puan; klavyeyle de oynanır.
- **Birim Avcısı:** SI birimlerinde seri çarpanı.
- **Sırala!:** 10 farklı veri seti.

### Laboratuvar ve deneyler
- **Grafiği dinle:** Duraklat, Devam et ve Durdur kontrolleri eklendi. Ses bağlamı askıya alınıp sürdürüldüğü için tepe ve dip sesleri kaymaz. Sayfadan çıkınca çalma durur.
- **Sensör ölçümü:**
  - Yeni kanallar: doğrusal ivme (yer çekimi çıkarılmış) ve yönelim/eğim açısı.
  - Metrikler: örnekleme hızı, ortalama, standart sapma, RMS, en küçük/en büyük, tepeden tepeye ve baskın frekans ile periyot.
  - Görünümler: zaman grafiği, büyüklük grafiği ve histogram.
- **pH ölçer:**
  - Renk skalasıyla analog kadran ve ibre, dijital LCD ekran ve kararlılık lambası.
  - HOLD düğmesi değeri sabitler.
  - Bilinen çözeltilerle bir ya da iki noktalı kalibrasyon yapılabilir.
- **Ekosistem Kavanozu:**
  - Kartal ikinci avcı olarak eklendi; ayrıca mevsimsel ot büyümesi, salgın olayı ve tilki ölüm hızı ayarı var.
  - Dengeye uzaklık ve Shannon çeşitlilik indeksi gösterilir.
  - Kavanoz yüksek çözünürlükte çiziliyor: çizilmiş hayvanlar, mevsime göre gökyüzü.
  - Kartal ve mevsimler kapalıyken model 1.49 ile aynıdır.
- **Rehberler:** Telefon Fizik Atölyesi, Çiz Çalışsın ve Canlanan Ders Kitabı'na adım adım "Nasıl kullanılır?" rehberi eklendi (`onboarding.js`). Rehber, bitirilene ya da kapatılana kadar ilk girişte açılır.

### Windows
- Ollama, ayrık (detached) olmadan ve gizli tek bir konsolla başlatılır. Böylece açılışta ekran kartı taraması sırasında yaklaşık 20 cmd penceresinin yanıp sönmesi giderildi.

### Testler
- `tools/v151-check.mjs`: 11 sınama. Bu sınamalar üç hatayı yakaladı ve düzeltildi:
  - Tohumlu karıştırmada doğru şık hep aynı konuma düşüyordu.
  - Baskın frekans hesabında sistematik sapma vardı.
  - Çeşitlilik indeksi tek türde −0 veriyordu.
- `tools/v151-ui-check.mjs`: gerçek tarayıcıda 11 sınama.
- Güncellenen sınamalar:
  - `practice-check`: yeni ailelerin yanıtları bağımsız olarak yeniden hesaplanıyor.
  - `research-check`: kalıcı önbellek denetleniyor; araştırma cihazının yalnızca kendi deposuna yazdığı doğrulanıyor.
  - `v147-check`: genişleyen Almanca içerik.

## 1.50.0 — 2026-10-28

- Mikrofon onarımları ve yeni çalışma alanı tek sürümde yayınlanır.
- Yan menü ve araç kataloğu ortak sekiz kategoriye ayrıldı; tüm büyük özellikler erişilebilir. Küçük mobil ekranlarda kategori şeridi yatay kaydırılır; arama sonucu alt menünün arkasında kalmaz.
- AI favorileri: 12 hazır başlangıç, 12 sabitleme, 20 kişisel şablon, arama, düzenleme ve sıralama. Kişisel metinler bu cihazda saklanır; seçim otomatik istek göndermez.

- Android WebView mikrofon erişiminde RECORD_AUDIO yanında gerekli MODIFY_AUDIO_SETTINGS izni eklendi; kurulu APK testine izin kontrolü kondu.
- Mikrofon erişimi için ortak servis: izin, bulunamayan aygıt, meşgul/sürücü, güvenli bağlantı ve desteklenmeyen ayar hataları ayrıldı; uygun ayar hatasında varsayılan kayıtla yeniden denenir.
- Web Speech için ikinci mikrofon akışı açılması kaldırıldı. Ses tanıma hizmeti kullanılamadığında uygun mevcut AI sağlayıcısıyla kayıt/yazıya çevirme yolu kullanılabilir.
- Eski/iptal edilmiş ses oturumlarının yeni oturumu değiştirmesi ve geç gelen izinle kayıt başlaması önlendi. Kapatma/duraklatma artık ses kaydını AI’ye göndermeden iptal eder.
- AI Ayarları ve Sesli Öğretmen içine yalnız yerel seviye gösteren mikrofon testi eklendi. Askıya alınmış Web Audio bağlamları yeniden çalıştırılır.
- pH kamerasında eşzamanlı izin yanıtlarının yeni akışı kapatması, bozuk beyaz referans/geçmiş kayıtları ve eski görsel yüklemeleri düzeltildi.
- Vatandaş bilimi ve meslek ekranlarının geciken okumaları mevcut sayfadan yalıtıldı. Geçersiz ölçüm verileri görüntüden ayrılır; saklı hatalı satırlar `invalidItems` içinde korunur.
- Vatandaş bilimi QR’ında tarih, değer ve koordinat çifti doğrulaması; CSV hücrelerinde formül enjeksiyonu koruması eklendi. Kalibrasyon ve tahmin sınırları açıklandı.
- WebKit’te boyut gözlemcisi içinden anında canvas ölçüsü değiştirilmesinin döngü oluşturması, işlemi sonraki çizim karesine taşıyarak giderildi.
- Erişilebilirlikte hatalı kök ifadesinin metin ayrıştırmayı kilitlemesi giderildi. 1.49 ekran testlerinin WebKit zamanlama kontrolü düzeltildi.
- 1.49’un beş yeni özelliği ve mikrofon senaryoları üç tarayıcılı tam regresyon hattına alındı. Kaynak sürüm numarası da yayın numarasıyla eşitlendi.


## 1.49.0 — 2026-10-28

Beş yeni modül. Hepsi internetsiz çalışır; ölçümler ve sonuçlar yalnızca cihazda saklanır.

### Kırmızı Lahana pH Ölçer (`#/ph`, `js/modules/ph-metre.js`)
- Kaynak: canlı kamera (arka kamera, mümkünse beyaz dengesi sabitlenir), fotoğraf (dokunulan noktadan örnekleme) ya da elle seçilen renk.
- Örnek bölgenin ortalaması alınır, sRGB doğrusal ışığa çevrilir. Beyaz kâğıttan alınan referansla von Kries beyaz dengesi uygulanır; referans yoksa gri dünya varsayımı kullanılır.
- Renk CIELAB'a dönüştürülür. Seyreltmeden etkilenmemesi için açıklık (L*) yok sayılır; yalnızca ton açısı h = atan2(b*, a*) kullanılır.
- 14 noktalı antosiyanin skalası, ton açısında tekdüze azalan bir eğri olarak kuruldu. Ölçülen ton bu eğride komşu iki nokta arasında aradeğerlenir.
- Güven aralığı = 0,5 + yerel eğim (pH/°) × ton belirsizliği (atan(3/doygunluk)) × 2. Skala dışı ton için +1, beyaz referans yoksa +0,4 eklenir.
- Gri, beyaz ve karanlık görüntüde ölçüm reddedilir.
- Sonuç 16 evsel maddeyle eşleştirilir. Tehlikeli maddeler (çamaşır suyu, lavabo açıcı, amonyak) işaretlenir; çamaşır suyu ile asit karıştırmama uyarısı gösterilir.
- Kayıtlar `meta "ph:log"` altında tutulur.

### Çevrimdışı Vatandaş Bilimi Ağı (`#/vatandas`, `js/modules/vatandas.js`)
- **Gürültü:** Mikrofon RMS → dBFS → dB SPL. Varsayılan fark +100 dB; bir başvuru ses ölçerle kalibre edilebilir. Kaydedilen değer 10 saniyelik eşdeğer seviye Leq = 10·log10(ortalama 10^(L/10)).
- **Işık kirliliği:** Gökyüzüne tutulan kameranın doğrusal parlaklığı, pozlama süresi ve ISO ile normalleştirilir; B = Y / (t·ISO/100). Ardından m ≈ K − 2,5·log10(B) kadir/açısaniye² ve Bortle sınıfı (1–9) hesaplanır. Pozlama bilgisi vermeyen kameralarda değer "göreli" olarak işaretlenir.
- Her ölçüme konum (enlem/boylam, 5 ondalık) ve zaman damgası eklenir. Konum alınamazsa kayıt yine tutulur ama haritada görünmez.
- **Ağ:** Sınıf Modu QR altyapısına yeni bir `"vb"` paket türü eklendi. Satır biçimi [tür, değer×10, enlem×1e5, boylam×1e5, dakika]; en çok 200 satır; deflate ile sıkıştırılır ve çok kareli QR olarak aktarılır. `sinif-modu.js` doğrulaması bu türü sınır denetimleriyle kabul eder.
- Birleştirmede mükerrer kayıtlar (tür, değer, ~1 m konum, dakika) temizlenir.
- **Isı haritası:** Ters uzaklık ağırlıklı (IDW, p = 2) ızgara kullanılır. Boylam cos(enlem) ile düzeltilir. Gürültü ve ışık ayrı katmanlardır; harita 100 m ölçek çubuğu taşır ve veriler CSV olarak dışa aktarılabilir.

### Ekosistem Kavanozu (`#/ekosistem`, `js/modules/ekosistem.js`)
- Ot–tavşan–tilki modeli:
  - dG/dt = rG(1 − G/K) − cGR
  - dR/dt = αR(1 − R/κG) − βRF (Lotka–Volterra; taşıma kapasitesi ot miktarına bağlı)
  - dF/dt = δRF − γF
- Çözücü 4. dereceden Runge–Kutta. Değer adım başına %40'tan fazla değişecekse ya da sonuç sonlu değilse adım yarıya bölünür. Popülasyonlar negatif olamaz; 0,5 bireyin altına düşen tür tükenmiş sayılır.
- Kontroller: 1×/5×/10× hız; tilkileri çıkarma (avcılık), tilki ve tavşan ekleme; kuraklık (r × 0,25, K × 0,5); ot sınırı ve av başarısı (β) kaydırıcıları.
- Gösterim: zaman grafiği, tavşan–tilki faz grafiği, olay günlüğü ve tahmin soruları.

### Kazanım Odaklı Meslek Haritası (`#/meslek`, `js/data/meslek-harita.js`, `js/modules/meslek.js`)
- Kariyer Keşfi'ndeki 53 mesleğin her biri için ders ağırlıkları ve "anahtar kelime → nerede kullanılır" eşlemeleri yazıldı. 808 kazanımda 865'ten fazla doğrudan eşleşme var.
- İlgililik = ders ağırlığı × (başlıkta anahtar kelime geçiyorsa 3, geçmiyorsa 1).
- Uyum = (Σ ilgililik·hâkimiyet + 50k) / (Σ ilgililik(çalışılan) + k), k = 0,15 × Σ ilgililik. Bu küçültme sayesinde az veriyle kesin sonuç verilmez.
- RIASEC envanteri doldurulduysa uyum %70 kazanım + %30 ilgi olarak hesaplanır. Alan süzgeci: SAY, EA, SÖZ, DİL, TYT.
- Meslek sayfası: gelişim rotası (zayıf ya da başlanmamış, doğrudan kullanılan kazanımlar, sınıf sırasıyla) ve ders ders kullanım listesi.
- Kazanım sayfası "Bu konu hangi meslekte?" sorusunu yanıtlar. Konu anlatımının yan sütununa bağlantı eklendi.

### Disleksi Dostu Mod (`js/modules/hece.js`, `js/modules/a11y.js`)
- Erişilebilirlik panelinde tek düğme: OpenDyslexic yazı tipi, geniş aralıklar, okuma cetveli, hece renklendirme ve okunan kelime vurgusu.
- **Türkçe hece kural motoru** (her hecede tek ünlü):
  - Ünsüzsüz ünlüler arasından bölünür.
  - Tek ünsüz sonraki heceye geçer.
  - İki ünsüz arasından bölünür.
  - Üç ya da daha fazla ünsüzde yalnız sonuncusu sonraki heceye geçer.
  - Sözcük başı ve sonu öbekleri korunur: prog-ram, e-lekt-rik, tren.
- Renklendirme yalnızca içerik alanlarına uygulanır. Formül, kod, form öğesi ve düğmeler atlanır.
- Dinamik sayfalar için MutationObserver yalnızca yeni eklenen düğümleri işler. Metin içeriği (textContent) değişmez; kapatınca DOM eski hâline döner.
- **Sesli okuma:** `speechSynthesis` sözcük sınırı olaylarındaki karakter konumu, bloğun metin düğümlerinde bir Range'e çevrilir (aynı sözcüğün kaçıncı geçişi olduğu sayılır). Vurgu CSS Custom Highlight API ile yapılır, DOM değişmez.

### Testler
- `tools/v149-check.mjs` (19 sınama):
  - pH: renk dönüşümleri ve 4 ışık koşulunda (sıcak, soğuk, loş, normal) gürültülü tolerans matrisi; en kötü sapma ≤ 0,8 pH.
  - Vatandaş bilimi: dB/Leq, Bortle, QR paketinin gidiş-dönüşü, mükerrer kayıt temizleme, IDW.
  - Ekosistem: dengeye yakınsama; 10⁶ popülasyonda ve sert parametrelerde NaN veya negatif değer olmaması; nesil tükenmesi; kuraklık; RK4 yakınsaması.
  - Meslek: eşleme bütünlüğü, az veride küçültme, sıralama.
  - Hece: 25 sözcüklük kural seti (yabancı kökenli ve birleşik sözcükler dâhil) ve noktalamanın korunması.
- `tools/v149-ui-check.mjs` (7 sınama, gerçek tarayıcı):
  - Beş özelliğin uçtan uca akışları, QR'ı yapıştırarak birleştirme.
  - Disleksi modunda metnin değişmemesi ve okunan kelime aralığı.
  - 390 ve 1280 px'de taşma olmaması; sayfa hatası olmaması.
- Yeni modüller `tsconfig.check.json` tip denetimine eklendi.

## 1.48.0 — 2026-10-28

- **Bana Öğret:** mevcut kazanım kimliklerine bağlı ters öğretme diyaloğu, sesle giriş, metin kanıtı denetlenen kapsam listesi ve yapılandırılmış biçimlendirici AI geri bildirimi.
- **Telefon Fizik Atölyesi:** örnek zamanlı AudioWorklet darbe algılama, süreli QR/kod aktarımı, belirsizlik kontrollü akustik hesap, yankı/şimşek, Doppler, sarkaç ve düşey kinematik.
- **Titreşimli Grafik:** güvenli ifade ayrıştırıcı, dokunma/klavye gezinmesi, ayrık titreşim örüntüleri ve metin/ses alternatifi.
- **Bilimsel Deney Raporu:** kaynak etiketli sensör/elle veri, doğrusal uyum, hata yüzdesi, öğrenci sonucu rubriği ve sistem PDF yazdırma çıktısı.
- **Sismograf Atölyesi:** üç eksenli kayıt, yüksek geçiren filtre, ölçülen örnekleme hızı, eşik olayları, eğitim P/S sinyali, üç istasyon oyunu ve afet çantası.
- **Gökyüzü Modu:** çevrimdışı JPL Kepler yaklaşımı, ufuk koordinatları, yıldızlar, Ay evresi ve isteğe bağlı cihaz yönelimi.
- **Çiz, Çalışsın:** yerel kenar/kontur analizi, onay gerektiren AI model önerisi; MNA devre, serbest cisim, Snell/ince mercek/ayna, rampa enerji ve 1B çarpışma araçları.
- **Canlanan Ders Kitabı:** OCR denklem önerisi, kamera üstü grafik, katsayı kontrolleri ve güven eşiğiyle sınırlı 2B öteleme takibi.
- **Yaşayan Tarih Haritası:** beş kaynaklı şematik kesit, 1071–1923 sürgüsü, ticaret/sefer yönelimleri ve dönem dosyaları.
- **Entegrasyon:** menüde Keşif Atölyeleri, tüm araçlarda dokuz ayrı giriş, sensörden rapora kaynak koruyan aktarım, sayfa/izin yaşam döngüsü temizliği.
- **Doğrulama:** bilimsel çekirdek için strict tip kontrolü; matematik, şema, sensör/AI fixture’ları, PDF ve responsive arayüz testleri CI kapılarına eklendi.

Ölçüm, veri ve model sınırları: [Keşif Atölyeleri kılavuzu](docs/KESIF-ATOLYELERI.md). Gerçek cihaz eşzamanlaması, doğrulanmış P/S tanısı, genel rijit cisim motoru, kesin tarih sınırları veya metrik dünya AR’si sağlandığı iddia edilmez.
