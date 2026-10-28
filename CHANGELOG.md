# Sürüm notları

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
