# Keşif Atölyeleri — 1.48.0

Sol menü → **Pratik → Keşif Atölyeleri · 9 araç**. Araçların her biri Tüm Araçlar ve menü aramasında da bulunur; yıldızla sabitlenebilir. Önceki test, öğretmen, sınıf, araştırma ve laboratuvar kayıtlarının şemaları değiştirilmedi. Yeni küçük tercihler `discovery:` önekiyle ayrı saklanır.

## 1. Bana Öğret

1. Kazanım ara, listeden seç ve kontrol listesine ekle (en fazla beş).
2. Konuyu kendi cümlelerinle anlat; istersen Sesle anlat düğmesini kullan.
3. Öğrenme arkadaşının takip sorusunu yanıtla. Bu karakter bazen yanlış bir düşünceyi soru olarak ortaya koyar; açıklamanı gerekçelendirmen amaçlanır.
4. Oturumu değerlendir: kapsam listesi, kavram yanılgıları ve sonraki çalışma önerilerini incele.
5. Diyaloğu indirebilir veya yeni oturum açabilirsin. Yerel diyalog kaldığın cihazda saklanır.

Liste uygulamanın mevcut müfredat kimliklerinden gelir; yeni ve doğrulanmamış MEB kazanım kodları üretilmez. AI’nin “kapsandı” işareti, öğrenci anlatımında birebir bulunan alıntı gerektirir. Bu denetim **anlamsal doğruluğu garanti etmez**. Geri bildirim biçimlendiricidir, resmî not değildir. AI mevcut sağlayıcıya/seçili modele bağlıdır; ses tanıma cihazın hizmetini kullanabilir. [MEB programları](https://tymm.meb.gov.tr/ogretim-programlari).

## 2. Telefon Fizik Atölyesi

- **Ses uçuş süresi:** iki cihaz arası mesafeyi gir. Her cihaz aynı darbeyi algılasın. A’daki son darbeyi geçici QR/kod olarak paylaş; B tara veya kodu yapıştır. Kod beş dakika geçerlidir. B−A saat farkını ve toplam zaman belirsizliğini bağımsız kalibrasyonla gir. Algoritma kodu tarama anını sesin geliş anı saymaz.
- **Önemli ölçüm sınırı:** telefon saatleri ve ses giriş gecikmeleri QR ile eşzamanlanmaz. Varsayılan 100 ms belirsizlik kısa mesafeyi ölçmeye yetmez; uygulama belirsizlik uçuş süresine eşit/büyükse hesabı reddeder. Hata sınırı %10 üzerindeyse sonuç güvenilir sayılmaz. Bu donanımla metrolojik ses hızı doğrulaması yapılmış değildir.
- **Yankı:** aynı darbenin doğrudan ve yansıyan tepelerini doğrula; `d=cΔt/2`. Darbe detektörü 800 Hz yüksek geçiren süzgeç ve uyarlanır eşik kullanır, 15 ms baskılama aralığı vardır; daha kısa yankılar ayrılamaz. İki tepe tek başına aynı sesin yankısını kanıtlamaz. Otomatik hoparlör gecikmesi kalibrasyonu yoktur.
- **Şimşek:** görülen ışık ile duyulan ses arasını ms olarak gir; `d≈cΔt`. Fırtına güvenliği amacıyla kullanılmaz.
- **Doppler:** bilinen kaynak tonu f₀ ve ölçülen frekansı kullan. Mikrofon baskın FFT frekansını ve kutu genişliğini gösterir; harmoniklerin temel tonla karıştırılmadığını denetle. Durgun gözlemci/hareketli kaynak için tam radyal formül ve düşük hız yaklaşımı ayrı sunulur. [UNSW modeli](https://www.animations.physics.unsw.edu.au/jw/doppler.htm).
- **Sarkaç:** güvenli düzeneğin x ekseni salınımını en az üç döngü kaydet. Yukarı sıfır geçişlerinden periyot, ardından `g=4π²L/T²` hesaplanır. Telefonu düşürme/savurma gerektirmez.
- **Asansör:** z ekseni düşeye sabitken durgun başlangıç kalibrasyonu al. Trapez integrasyonu başlangıç hızını sıfır varsayar; çift integrasyon sürüklenmesi nedeniyle yer değiştirme yaklaşık eğitim sonucudur.

Ölçümler 30–60 saniye ve 6000 örnekle sınırlıdır. **Etiketli örnek veri** açıkça simülasyondur. JSON dışa aktarımı ve **Bilimsel rapora aktar** gerçek/elle/simülasyon kaynağını korur. Tarayıcıda kamera/mikrofon için HTTPS veya localhost gerekir; destek yoksa elle veri kullanılabilir.

## 3. Titreşimli Grafik

`x^2-4` veya `sin(x)` yaz → Grafiği çiz → parmağınla eğriyi izle. Klavye okları ve x alanı aynı keşfi sağlar. Eğri kısa, kök/ekstremum çift, y ekseni uzun titreşimle belirtilir. İsteğe bağlı ses ve sürekli metin alternatifi vardır. Titreşim şiddeti web API’sinden ayarlanamaz; özellikle iOS’ta titreşim bulunmayabilir. İfade ayrıştırıcı `eval` kullanmaz; çarpım `*`, trigonometrik açı radyandır. Ekstremum işareti sayısal bir adaydır.

## 4. Bilimsel Deney Raporu

1. Fizik/sismograf ekranından veriyi aktar veya sensör JSON dosyası yükle. Beş kanallı sensör paketlerinde x bileşeni alınır; vektör büyüklüğü sessizce varsayılmaz.
2. Deney adı, hipotez, yöntem, birim ve veri kaynağını kontrol et. Elle veri `x,değer` biçiminde, ondalık noktayla girilir (2–4000 satır).
3. Yalnız doğrusal ilişki bekleniyorsa doğrusal uyum seç; aksi halde ham veri kullan.
4. Karşılaştırılacak deneysel ve kuramsal değeri gir. Hata `|Ve−Vt|/|Vt|×100`; kuramsal sıfır için yüzde hata tanımsızdır.
5. Hata kaynaklarını ve **kendi sonucunu** yaz. Yazım rubriği kanıt/kuram/belirsizlik/iyileştirme sözcük göstergelerini arar; bilimsel doğruluk veya öğrenci başarısı ölçmez.
6. Raporu hazırla → **PDF olarak yazdır / kaydet** → sistem penceresinde PDF olarak kaydet. Önizlemedeki grafik görüntüsü ve tam ham tablo çıktıya dahil edilir. Doğrudan otomatik PDF indirme yerine cihazın yazdırma altyapısı kullanılır; JSON ayrıca indirilebilir.

## 5. Sismograf Atölyesi

Cihazda üç ekseni kaydet; yüksek geçiren süzgeci ve olay eşiğini değiştir. Gerçek örnekleme hızı ölçülür, 50 Hz altı açıkça bildirilir. Web API’si cihazın hızını 50 Hz üzerine zorlayamaz. Filtre ve grafik kaydın tamamından, sınırlandırılmış 6000 örnek üzerinden üretilir.

P/S eğitim örneğinde paketlerin tasarlanmış zamanları verilir. Gerçek cihazda görülen olaylar **eşik olayıdır**; P/S dalga tanısı, deprem büyüklüğü, erken uyarı ve bina/parsel tehlikesi değildir. Üç istasyon oyunu düzlemsel daire kesişimi ile artığı gösterir; gerçek deprem konumlandırma servisi değildir.

Yerel GeoJSON, Kuzey/Doğu Anadolu zonları için bu proje tarafından çizilmiş **şematik** çizgilerdir; resmî diri fay verisi değildir. [MTA haritaları](https://www.mta.gov.tr/v3.0/hizmetler/yenilenmis-diri-fay-haritalari). Afet çantası işaretleri cihazda saklanır; kısa listeyi ailenin gereksinimleriyle tamamla. [AFAD rehberi](https://www.afad.gov.tr/afet-ve-acil-durum-cantasi-nasil-hazirlanmali).

## 6. Gökyüzü Modu

Enlem/boylam ve **UTC** zaman gir → hesapla. Konum izni isteğe bağlıdır. Altı Güneş sistemi cismi (Güneş ve beş gezegen), sekiz yıldız, ufuk altı/üstü bilgisi ve ortalama Ay evresi çevrimdışı hesaplanır. Grafikte azimut kuzeyden doğuya artar. Konumun zaman dilimi yerine boylam kullanılır; ortalama güneş saati ayrıca etiketlenir.

[JPL Table 1](https://ssd.jpl.nasa.gov/planets/approx_pos.html) Kepler elemanları ve hızları 1800–2050 aralığında kullanılır. J2000 yıldız/ekliptiği, basit yıldız zamanı ve yaklaşık Ay döngüsü vardır; presesyon, atmosfer kırılması, ışık zamanı ve yüksek hassasiyetli Ay konumu yoktur. Teleskop veya navigasyon aracı değildir; VSOP87 uygulandığı iddia edilmez. Cihaz yönelim verisi mümkünse platformun pusula/jiroskop birleşimidir. Mutlak kuzey yoksa gösterge **göreli yönelim** olarak belirtilir; ayrı bir kalibre manyetometre füzyon algoritması değildir.

## 7. Çiz, Çalışsın

Çiz/fotoğraf yükle → yerel kenar/kontur analizi veya isteğe bağlı AI yorumlama → JSON şemasını düzenle → **Modeli onayla ve çalıştır**.

- Devre: ideal gerilim kaynağı, direnç, sabit dirençli lamba ve açık/kapalı anahtar; topraklı düğüm gerilimleri MNA ile çözülür. Tekil/açıkta düğümler hata verir. Elektron hareketi nitel animasyondur; hız ölçekli yük taşıyıcı modeli değildir.
- Serbest cisim: vektör toplamı ve `a=ΣF/m`; yüzey bilgisi verildiğinde eksik normal kuvvet için uyarı. Çizimden tüm kuvvetlerin zorunlu olarak tanınması garanti edilmez.
- Optik: Snell, tam iç yansıma, ince mercek/küresel ayna görüntü bağıntıları ve paraksiyel ışın çizimi. Eğri yüzeylerin genel optik geometrisi tanınmaz.
- Rampa: çizilmiş çoklu çizgi boyunca noktasal kılavuz hareketi ve potansiyel/kinetik enerji; ayrıca 1B iki cisim çarpışması. İsteğe bağlı `loopRadius` metre cinsindedir; `2.5R` eşiği rampa yüksekliğinden bağımsız yarıçapla hesaplanır. Keyfî poligonlarla genel 2B rijit cisim/yuvarlanma/döngü temas çözücüsü değildir.

AI sembol/değer/bağlantı önerir; okunmayan alanlar null kalır ve öğrenci tarafından tamamlanır. Yerel kontur analizi tek başına sembolleri veya devre topolojisini tanıdığını iddia etmez.


## 8. Yaşayan Tarih Haritası

1071–1923 sürgüsünü değiştir → en son kaynaklı dönem kesitini gör → bölgeye dokun veya Enter ile dosyayı aç. 16 kaynaklı dönem kesiti, 18 şehir referansı, ticaret ağı temsilleri ve döneme bağlı sefer yönelimleri vardır. Olay araması, tür/yıl filtresi, karşılaştırma, yerel çalışma listesi ve JSON dışa aktarma için [1.64 kılavuzunu](SURUM-1.64.md) kullan. Kesitler arasında tarih dışı sınır interpolasyonu yapılmaz; her yıl için resmî tarih atlası doğruluğu iddia edilmez. Haritadaki şekiller egemenlik sınırı veya modern hak iddiası değildir.

Bilgi kaynakları her dönem/rota kartının yanında yer alır: TDV İslâm Ansiklopedisi (Malazgirt, Osmanlılar, İstanbul’un fethi, Viyana, Lozan) ve [UNESCO İpek Yolları](https://www.unesco.org/en/silkroads). Metinler kısa özgün özetlerdir; harita görselleri veya telifli atlas geometrileri alınmadı. Mevcut ayrıntılı tarih çizelgesine bağlantı korunur.

## Geliştirici doğrulaması

`npm run test:discovery`, `npm run test:discovery-ui`, `npm run type-check`, `npm test`, `npm run lint`, `npm run build`.

Sayısal çekirdek ayrıca `tsconfig.discovery.json` ile **strict** kontrol edilir. UI modülleri mevcut App sınırındaki JavaScript tip kontrolüne dahildir; bütün eski kod tabanının strict TypeScript olduğu iddia edilmez. AI cevapları, sensör olayları, darbe işlemcisi ve görüntü takip testlerinde denetlenebilir fixture’lar kullanılır. Fiziksel iki telefonla akustik kalibrasyon, gerçek P/S sismoloji, tüm telefon sensörleri veya gerçek OCR doğruluğu bu otomatik testlerden çıkarılamaz.
