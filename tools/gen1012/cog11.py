# -*- coding: utf-8 -*-
"""11. Sınıf Coğrafya ders notları → js/data/content/cog-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Coğrafyanın Doğası", "Unit 1: The Nature of Geography", [
O("k1", "1.1", "Mekânsal sorunlar ve coğrafyanın katkısı", "Spatial problems and the contribution of geography", r"""
# Mekân ve Mekânsal Sorun

**Mekân:** İnsanların doğal çevreyle etkileşime girerek anlam ve kimlik yüklediği; fiziksel, sosyal, ekonomik ve kültürel süreçlerin bir araya geldiği **dinamik** yeryüzü parçası. Zamanla değişir ve dönüşür.

**Mekânsal sorun:** Yerel, bölgesel ya da küresel ölçekte ortaya çıkan fiziksel, sosyal, ekonomik ve çevresel problemler — çevre kirliliği, **plansız kentleşme**, **arazinin yanlış kullanımı**, su yetersizliği.

**Coğrafi yaklaşım:** Olayları nicel/nitel özellikleriyle birlikte **konum** bilgisiyle ele alır; **dağılış ilkesi**, bağlantılar ve örüntüler sayesinde sorunun **nerede ve neden** ortaya çıktığını bütüncül olarak inceler.

# Ders Kitabı Örnek Olayları

| Örnek | Neden | Çözüm / coğrafyanın katkısı |
|---|---|---|
| **Konya Ovası – obruklar** | Aşırı yer altı suyu çekimi; karstik kayaçların çözünmesi, tavan çökmesi | Yapay zekâ tabanlı **duyarlılık haritaları**, su kullanımının denetimi |
| **Iğdır – hava kirliliği** | Dağlarla çevrili çukur konum, **sıcaklık terselmesi (inversiyon)** | Temiz Hava Eylem Planları, yakıt denetimi |
| **Bursa Ovası – arazinin yanlış kullanımı** | Sanayi ve hızlı kentleşmenin tarım alanlarını daraltması | **Büyük Ova Koruma Alanı** ilanı, denetim |
| **Kuraklık ve kırsal göç** | Tarım ve yaylacılığın zarar görmesi → kırdan kente göç | Uzaktan algılama, **erken uyarı sistemleri** |
| **Sünger şehirler** | Geçirimsiz yüzeyler nedeniyle kentsel sel | "Gri altyapı" yerine **yeşil altyapı**: suyu emen, depolayan yüzeyler |
| **Atık yönetimi** | Düzensiz depolama | **CBS** ile uygun depolama alanı seçimi, biyogaz tesisleri |
| **Müsilaj (Marmara)** | Besin elementi (azot, fosfor) artışı, ani ısınma, zayıf akıntı, arıtılmamış atıklar → fitoplankton patlaması; çözünmüş oksijen azalır, toplu balık ölümleri | Uydu görüntüleri ve CBS ile yoğunlaşma alanlarının haritalanması, **arıtma tesisi yer seçimi** |
""",
  [("Iğdır'da hava kirliliğinin kış aylarında artmasının coğrafi nedeni nedir?", "Iğdır **çukur bir ovadır** ve çevresi dağlarla çevrilidir. Kışın soğuk hava çukurda birikir, üstte daha sıcak hava katmanı oluşur (**inversiyon**). Dikey hava hareketi durduğu için kirleticiler dağılamaz."),
   ("Sünger şehir yaklaşımının gri altyapıdan farkı nedir?", "Gri altyapı suyu kanallarla **hızla uzaklaştırır**; sünger şehir ise yeşil alanlar, geçirimli zeminler ve göletlerle suyu **emip depolar**, taşkın riskini azaltır ve yer altı suyunu besler.")],
  ["Mekân dinamiktir; mekânsal sorunlar yerelden küresele.", "Örnekler: Konya obrukları, Iğdır inversiyonu, Bursa Ovası, müsilaj.", "Coğrafya: nerede, neden, CBS ile çözüm."]),
]),
U("u2", "2. Ünite: Mekânsal Bilgi Teknolojileri", "Unit 2: Spatial Information Technologies", [
O("k1", "2.1", "Web tabanlı CBS uygulamaları", "Web-based GIS applications", r"""
# Web Tabanlı CBS

Önceleri yalnızca uzmanların kullandığı masaüstü CBS, **bulut bilişim** ve internet teknolojileriyle **tarayıcı üzerinden** kullanılabilir hâle geldi.

**Bileşenler:**
- **Kullanıcı (istemci):** Telefon, tablet, bilgisayar.
- **Genel ağ (internet):** Kullanıcı ile sunucu arasındaki veri akışı.
- **Sunucu ve bulut:** Verinin depolandığı ve çözümlendiği arka plan.

**Veri katmanları:**
- **Raster:** Hücrelerden (piksel) oluşan veri — uydu görüntüsü, yükselti modeli.
- **Vektör:** Nokta (kuyu), çizgi (yol, akarsu), alan (il sınırı) verisi.
- **Öz nitelik tablosu:** Vektör öğelerin sayısal ve sözel bilgileri; kullanıcı **sorgulama** yapabilir.

# Çözümleme Zinciri
1. **Birleştirme** — farklı verileri bütünleştirme
2. **Çakıştırma** — katmanları üst üste bindirip ilişkileri görme
3. **Sorgulama** — ölçüte uyan verileri filtreleme (ör. "nüfusu 1 milyonun üzerindeki iller")
4. **Genelleştirme** — ölçeğe göre ayrıntıyı azaltma
5. **Sembolleştirme** — renk ve simgelerle görselleştirme

# Hikâye Haritaları ve Yaşayan Atlaslar
Metin, fotoğraf, video ve haritayı tek akışta birleştirir; coğrafi bilgiyi **demokratikleştirir** ve karar destek süreçlerini güçlendirir.

**Kullanım alanları:** ulaşım (anlık trafik), turizm, güvenlik, ormancılık (yangın takibi), sağlık, tarım, şehir planlama, **afet yönetimi** (deprem sonrası hasar tespiti).

# Ders Kitabı Uygulamaları
- **Göksu Havzası (2000–2020):** Tarım arazileri ve sulak alanlar azaldı, yapılaşma arttı.
- **Kahramanmaraş depremleri (2023):** Tapu Parsel Sorgulama (KML) ve **MTA Yer Bilimleri Harita Görüntüleyici** ile yüzey kırıkları, diri faylar ve heyelan set gölleri haritalandı.
- **TÜİK verileri:** İllere göre hanehalkı büyüklüğü, toplam doğurganlık hızı ve kentsel gelişim analizleri.
""",
  [("Deprem riski yüksek ve nüfusu yoğun yerleşmeleri belirlemek için hangi CBS işlemi kullanılır?", "**Çakıştırma**: diri fay haritası ile nüfus yoğunluğu katmanı üst üste bindirilir; ardından **sorgulama** ile fay hattına yakın ve yoğun nüfuslu alanlar seçilir."),
   ("Akarsu, il sınırı ve kuyu verileri hangi vektör türleriyle gösterilir?", "Akarsu → **çizgi**, il sınırı → **alan (poligon)**, kuyu → **nokta**.")],
  ["Web CBS: istemci + internet + sunucu/bulut.", "Raster piksel; vektör nokta-çizgi-alan; öz nitelik tablosu.", "Zincir: birleştirme, çakıştırma, sorgulama, genelleştirme, sembolleştirme."]),
]),
U("u3", "3. Ünite: Doğal Sistemler ve Süreçler", "Unit 3: Natural Systems and Processes", [
O("k1", "3.1", "Su kaynakları ve hidrolojik döngü", "Water resources and the hydrological cycle", r"""
# Suyun Dağılışı

Yeryüzünün yaklaşık **%71**'i sularla kaplıdır.
- Suyun **%97,5**'i tuzlu, **%2,5**'i tatlıdır.
- Tatlı suyun **%68,7**'si buzullarda, **%30,1**'i yer altında, yalnızca **%1,2**'si göl, akarsu ve diğer yüzey sularındadır.

**Hidrolojik döngü:** Buharlaşma → yoğuşma → yağış → yüzeysel akış / sızma → terleme. Döngü hidrosferin sürekliliğini sağlar. Suyu inceleyen alt dal: **hidrografya**.

# Okyanuslar ve Denizler
- 5 okyanus: **Büyük (Pasifik), Atlas, Hint, Kuzey Buz (Arktik), Güney**.
- **İç deniz** (karalar içine sokulmuş: Akdeniz, Karadeniz), **kenar deniz** (okyanus kenarında: Japon Denizi, Karayip).
- Sıcaklık **enlem** ve **okyanus akıntılarına** göre değişir: Gulf Stream (Golfstrim) **sıcak**, Labrador **soğuk** akıntıdır.

# Göller
Oluşumuna göre:
| Tür | Örnek |
|---|---|
| Tektonik | Van (aynı zamanda volkanik set), Tuz, Burdur, Eğirdir |
| Volkanik (krater/kaldera) | Nemrut Krater Gölü |
| Karstik | Salda, Avlan |
| Buzul | Kaçkar ve Uludağ buzul gölleri |
| Set (heyelan, alüvyal, volkanik) | Tortum, Sera, Abant (heyelan); Marmara (alüvyal); Van (volkanik set) |
| Relikt (kalıntı) | Hazar Denizi; Türkiye'de Küçükçekmece ve Büyükçekmece kıyı set gölleri |

**Gideğeni olan göller tatlı** (Beyşehir, Eğirdir), **gideğeni olmayanlar tuzlu, sodalı veya acı** (Tuz Gölü, Van Gölü).

# Akarsular
- Bölümleri: **kaynak**, orta çığır, **ağız** (taban seviyesi).
- **Debi (akım):** Saniyede geçen su miktarı (m³/sn).
- **Rejim:** Akımın yıl içindeki değişimi. **Düzenli** (Amazon, Kongo — yıl boyu yağış) / **düzensiz** (Ganj — muson; Türkiye akarsuları).
- **Havza:** Akarsuyun suyunu topladığı alan. **Açık havza** denize ulaşır, **kapalı havza** ulaşmaz (Konya, Van, Tuz Gölü havzaları).
""",
  [("Tatlı su toplam suyun %2,5'i ise, göl ve akarsulardaki su toplam suyun yaklaşık yüzde kaçıdır?", "Yüzey suları tatlı suyun %1,2'sidir: $0{,}025 \times 0{,}012 = 0{,}0003$ → toplam suyun yaklaşık **%0,03**'ü. Kullanılabilir yüzey suyu çok kısıtlıdır."),
   ("Van Gölü neden sodalıdır?", "Van Gölü **gideğensiz (kapalı havza)** bir göldür; suyunu sadece buharlaşmayla kaybeder. Volkanik araziden gelen çözünmüş maddeler birikir, su **sodalı** olur.")],
  ["Tatlı su %2,5; çoğu buzul ve yer altında.", "Gideğenli göl tatlı, gideğensiz tuzlu/sodalı.", "Debi m³/sn; rejim düzenli-düzensiz; açık-kapalı havza."]),
O("k2", "3.2", "Sınıraşan sular, buzullar, sulak alanlar ve yer altı suları", "Transboundary waters, glaciers, wetlands and groundwater", r"""
# Sınıraşan ve Sınır Oluşturan Sular
- **Sınıraşan:** Bir ülkede doğup başka ülkelere ulaşan sular — **Fırat, Dicle**, Nil, İndus, Tuna.
- **Sınır oluşturan:** İki ülke arasında doğal sınır oluşturan sular — **Meriç** (Türkiye–Yunanistan), **Arpaçay** (Türkiye–Ermenistan), **Aras** (kısmen).

**Türkiye akarsularının özellikleri:**
- Akış hızları **yüksek**, boyları **kısa**, debileri **düşük**.
- **Denge profiline ulaşmamışlardır** (ortalama yükselti fazla).
- **Hidroelektrik potansiyeli yüksek**tir.
- Rejimleri **düzensiz**dir; yük taşımacılığına **elverişli değildir**.

# Buzullar
Yeryüzündeki **en büyük tatlı su rezervi**. Antarktika, Grönland, Alpler, Himalayalar. İklim değişikliğiyle erimeleri **deniz seviyesini yükseltir**. Türkiye'de Ağrı, Erciyes, Cilo-Sat ve Kaçkar dağlarında küçük buzullar vardır.

# Sulak Alanlar ve Ramsar Sözleşmesi
**Ramsar Sözleşmesi (1971, İran):** Uluslararası öneme sahip sulak alanların korunması. Türkiye'de **14 Ramsar alanı** vardır: Kızılırmak Deltası, Göksu Deltası, Sultan Sazlığı, Burdur Gölü, Seyfe Gölü, Manyas (Kuş) Gölü, Gediz Deltası vb.

**Önemi:** Biyoçeşitlilik, göçmen kuşlar, taşkın kontrolü, yer altı suyunun beslenmesi, karbon depolama.

# Yer Altı Suları
Yağış sularının **geçirimli** tabakalardan sızıp **geçirimsiz** tabaka üzerinde birikmesiyle oluşur; bu su taşıyan katmana **akifer** denir.

| Kaynak türü | Özellik |
|---|---|
| **Karstik (voklüz)** | Kalker arazide, mağara ağzından çıkar (Toroslar) |
| **Artezyen** | İki geçirimsiz tabaka arasındaki basınçlı su; sondajla kendiliğinden fışkırır |
| **Yamaç (vadi)** | Yamacın kesilmesiyle yüzeye çıkar |
| **Fay kaynağı** | Fay hatları boyunca; genelde sıcak ve mineralli (Pamukkale) |
| **Gayzer** | Volkanik alanlarda aralıklarla fışkıran sıcak su (İzlanda, Yellowstone) |

Akiferler göl ve akarsuların kurumasını geciktirir (Sapanca Gölü, Çad Gölü örnekleri).
""",
  [("Türkiye akarsularının hidroelektrik potansiyelinin yüksek, ulaşıma elverişliliğinin düşük olması hangi ortak nedene dayanır?", "Türkiye'nin **ortalama yükseltisinin fazla ve engebeli** olması: eğim fazla olduğundan akış hızı yüksektir (enerji ↑) ama yatak düzensiz ve debi düşüktür (ulaşım ↓).")],
  ["Sınıraşan: Fırat, Dicle; sınır oluşturan: Meriç, Arpaçay.", "Türkiye akarsuları hızlı, kısa, düzensiz rejimli, HES potansiyeli yüksek.", "Ramsar 1971; Türkiye'de 14 alan; akiferler."]),
O("k3", "3.3", "Türkiye'de su kaynaklarının etkileri ve Mavi Vatan", "Effects of water resources in Türkiye; Blue Homeland", r"""
# Deniz Yetki Alanları

| Alan | Açıklama |
|---|---|
| **İç sular** | Esas hattın kara tarafındaki sular (körfez, liman); tam egemenlik |
| **Kara suları** | Esas hattan itibaren **12 deniz mili**ne kadar egemenlik alanı. Türkiye: **Karadeniz ve Akdeniz'de 12, Ege'de 6** deniz mili |
| **Bitişik bölge** | Kara sularının ötesinde gümrük, sağlık, göç denetimi |
| **Kıta sahanlığı** | Deniz tabanı ve toprak altı kaynakları üzerinde haklar |
| **Münhasır Ekonomik Bölge (MEB)** | 200 deniz miline kadar su kolonu ve deniz tabanındaki kaynaklar üzerinde ekonomik haklar |

**Mavi Vatan:** Türkiye'nin deniz yetki alanlarındaki hak ve menfaatlerini savunan doktrin.

# Su Yönetimi ve Su Kültürü
- **Stratejik su yönetimi:** Tatlı su kaynaklarının geleceğini **sürdürülebilirlik** ilkesine göre güvence altına almak.
- **Su kültürü:** Toplumun suyla kurduğu bağ ve tasarruf bilinci (çeşmeler, vakıf su yapıları, sarnıçlar).

# Su Kaynaklarının Etkileri
| Boyut | Örnek |
|---|---|
| **Çevresel** | Ekosistem, iklim dengesi, biyoçeşitlilik |
| **Ekonomik** | Sulama, sanayi, **HES**, turizm, balıkçılık — **GAP** ile sulanan alanlar ve enerji üretimi arttı |
| **Politik** | Sınıraşan suların paylaşımı, uluslararası anlaşmalar, su güvenliği |
| **Sosyokültürel** | Medeniyetlerin su kenarında kurulması (Mezopotamya, Nil), yerleşme dokusu, sağlık |

**Eğirdir Gölü Eylem Planı:** Aşırı su kullanımı, kirlilik ve iklim değişikliğiyle seviyesi düşen göl için Tarım ve Orman Bakanlığı'nın su verimliliği ve ekosistem koruma planı.
""",
  [("Türkiye'nin Ege'de kara sularını 6 mil olarak uygulamasının nedeni nedir?", "Ege'de adaların Türkiye kıyılarına çok yakın olması nedeniyle 12 mil uygulaması Ege'yi büyük ölçüde kapatabilir; Türkiye **hakkaniyet** ilkesi ve **açık deniz** erişimi için Ege'de 6 mili savunur.")],
  ["Kara suları: Karadeniz-Akdeniz 12, Ege 6 mil.", "MEB 200 mile kadar ekonomik haklar; Mavi Vatan.", "Su: çevresel, ekonomik (GAP), politik, sosyokültürel etkiler."]),
]),
U("u4", "4. Ünite: Beşerî Sistemler ve Süreçler", "Unit 4: Human Systems and Processes", [
O("k1", "4.1", "Yerleşmelerin mekânsal organizasyonu", "Spatial organization of settlements", r"""
# Mekânsal Desen

Konut, yol, meydan gibi unsurların **düzeni, yoğunluğu ve dağılım biçimi**. "Ne? Nerede? Nasıl yerleşmiş?" sorularına cevap verir.

| Desen | Özellik | Neden / örnek |
|---|---|---|
| **Dağınık** | Evler birbirinden uzak, tarla kenarlarında | Engebeli arazi, bol yağış, her yerde su — **Karadeniz kıyıları**, Rize Pokut Yaylası |
| **Toplu** | Evler birbirine yakın, bir merkez etrafında | Su kaynağı az ve belli noktada, düz ova — **İç Anadolu**, Göreme |
| **Kümelenmiş** | Sıkışık, düzensiz yoğunlaşma | Savunma, sınırlı alan — **Safranbolu** |
| **Çizgisel** | Vadi ya da yol boyunca uzanır | **Amasya** (Yeşilırmak vadisi), Kars Kümbetli |
| **Radyal (ışınsal)** | Merkezden dışa yayılan yollar | **Aydın Atça**, İtalya **Palmanova** |
| **Izgara (dama tahtası)** | Birbirini dik kesen sokaklar, planlı | **Barselona**, afet sonrası kurulan köyler |

**Mekânsal organizasyon ilkeleri:** fonksiyonel ayrışma (konut, ticaret, sanayi), erişilebilirlik, **merkezilik ve hiyerarşi**, doğal çevreye uyum, sosyal-kültürel yapıya uygunluk.

# Afete Dirençli Yerleşmeler
- **Bursa Nilüfer:** Planlı büyüme, geniş yeşil alanlar, **mikrobölgeleme**, yapı denetimi.
- **Rotterdam:** **Yeşil çatılar**, "**Room for the River**" (nehre alan bırak) programı, su meydanları ve taşkın yataklarıyla sel önleme.
""",
  [("Karadeniz'de dağınık, İç Anadolu'da toplu yerleşme görülmesinin nedenini açıklayınız.", "Karadeniz'de **yağış bol, su her yerde bulunur** ve arazi engebelidir; evler tarlaların yanına dağılır. İç Anadolu'da **su kaynakları azdır** ve belirli noktalarda toplanır; ova düzdür, evler su kaynağı çevresinde toplanır.")],
  ["Desenler: dağınık, toplu, kümelenmiş, çizgisel, radyal, ızgara.", "Su ve yer şekilleri deseni belirler.", "Afete dirençli kent: mikrobölgeleme, yeşil altyapı."]),
O("k2", "4.2", "Yerleşmelerin etki alanları", "Spheres of influence of settlements", r"""
# Mekânsal Etki

Bir yerleşmenin yerel, bölgesel ya da küresel düzeyde çevresine yaptığı **fiziksel, sosyal ve ekonomik etkilerin** bütünü.

**Etki alanını belirleyen faktörler:** konum, ulaşım bağlantıları, sosyal (eğitim, sağlık hizmetleri), kültürel, ekonomik, siyasi ve idari faktörler.

| Etki düzeyi | Özellik | Örnek |
|---|---|---|
| **Yerel** | Yakın çevreye hizmet; tarım-hayvancılık ön planda | Şirince, Kadirli, Bayburt |
| **Bölgesel** | Bölge genelinde hizmet (üniversite, hastane, ticaret) | Eskişehir, Samsun, Erzurum, Kiev |
| **Küresel (dünya şehri)** | Finans, diplomasi, ticaret merkezi | İstanbul, New York, Londra, Şanghay, Tokyo |

# Örnek Karşılaştırma: Detroit – Paris
| Detroit | Paris |
|---|---|
| **Otomotiv sanayisi** ile büyüdü; **ızgara** planlı | Tarihsel gelişimle şekillendi; **Seine** etrafında dairesel/halkalı plan |
| Sanayinin gerilemesiyle nüfus kaybı ve kentsel çöküntü yaşadı | **Turizm, kültür, moda ve diplomasi** odaklı küresel metropol |
""",
  [("İstanbul'u küresel etkiye sahip bir yerleşme yapan özellikler nelerdir?", "Asya ile Avrupa arasındaki **konumu**, büyük **havalimanları ve limanları**, **finans ve ticaret** merkezi olması, uluslararası kuruluşlara ve etkinliklere ev sahipliği, tarihî ve kültürel mirasıyla **turizm** çekiciliği.")],
  ["Etki alanı: yerel, bölgesel, küresel.", "Belirleyiciler: konum, ulaşım, ekonomi, hizmetler.", "Detroit sanayi-ızgara; Paris kültür-turizm."]),
]),
U("u5", "5. Ünite: Ekonomik Faaliyetler ve Etkileri", "Unit 5: Economic Activities and Their Effects", [
O("k1", "5.1", "Tarım ve gıda güvencesi", "Agriculture and food security", r"""
# Tarım

Bitkisel ve hayvansal ürünlerin yetiştirilmesi. Gıda sağlar, **sanayiye ham madde** verir, istihdam yaratır.

| Kavram | Tanım |
|---|---|
| **Gıda güvencesi** | Herkesin her zaman yeterli, güvenli ve besleyici gıdaya **ekonomik ve fiziksel olarak erişebilmesi**. Boyutları: bulunabilirlik, erişilebilirlik, kullanım (kalite), istikrar. |
| **Gıda güvenliği** | Gıdadaki **fiziksel, kimyasal, biyolojik** zararların giderilmesi için alınan önlemler. |
| **Tedarik zinciri** | Ham maddeden tüketiciye kadar geçen süreçler. |
| **Gıda israfı** | Dünyada üretilen gıdanın yaklaşık **üçte biri** kaybolur ya da israf edilir. Gelişmekte olan ülkelerde **depolama-altyapı eksikliği**, gelişmiş ülkelerde **tüketim aşamasındaki savurganlık** öne çıkar. |

> Güvence = **erişim**; güvenlik = **sağlıklı ve zararsız** olma. Sık karıştırılır!

# Türkiye'de Tarımsal Üretim
- **Tahıllar:** buğday, arpa, mısır, çeltik
- **Baklagiller:** mercimek, nohut, fasulye
- **Endüstri bitkileri:** pamuk, şeker pancarı, çay, ayçiçeği, tütün
- **İhracatta öne çıkanlar:** fındık (dünya lideri), kuru incir, kuru kayısı, üzüm, zeytin, turunçgiller
""",
  [("Bir ülkede yeterli gıda üretildiği hâlde yoksul kesimin gıdaya ulaşamaması hangi kavramla ilgili bir sorundur?", "**Gıda güvencesi** (erişilebilirlik boyutu) sorunudur; gıda vardır ama ekonomik olarak erişilemez.")],
  ["Gıda güvencesi: erişim; gıda güvenliği: zararsızlık.", "Gıdanın yaklaşık 1/3'ü israf olur.", "Türkiye: fındıkta lider; tahıl, baklagil, endüstri bitkileri."]),
O("k2", "5.2", "Sürdürülebilir tarım ve tarımda teknoloji", "Sustainable agriculture and agricultural technology", r"""
# Sürdürülebilir Tarım

Doğal kaynakları koruyarak, çevreye zarar vermeden ve **gelecek nesillerin ihtiyaçlarını tehlikeye atmadan** üretim. Çevresel, ekonomik ve sosyal ölçütlere dayanır.

# Tarım 1.0 → 4.0
| Evre | Özellik |
|---|---|
| Tarım 1.0 | İnsan ve hayvan gücü |
| Tarım 2.0 | **Makineleşme**, kimyasal gübre ve ilaç (Yeşil Devrim) |
| Tarım 3.0 | **Hassas tarım**, GPS destekli makineler |
| Tarım 4.0 | **Dronlar, uydu görüntüleri, yapay zekâ, büyük veri, nesnelerin interneti (IoT)**, sensörler |

# Yenilikçi Tarım Sistemleri
- **Organik tarım:** Sentetik kimyasal yerine doğal gübre ve **biyolojik mücadele**.
- **İyi Tarım Uygulamaları (İTU):** Çevre, insan ve hayvan sağlığını gözeten, **izlenebilir** üretim.
- **Hidroponik (topraksız) tarım:** Besin çözeltisiyle, kapalı ortamda, **su tasarruflu** üretim.
- **Agrivoltaik:** Aynı arazide hem tarım hem **güneş enerjisi** üretimi.
- **Dikey tarım:** Çok katlı kapalı alanlarda yüksek verimli üretim; kentlerde arazi tasarrufu.
- **Damla sulama:** Salma sulamaya göre su kaybını büyük ölçüde azaltır.
""",
  [("Kurak bir bölgede su tasarrufu sağlayan iki tarım uygulaması öneriniz.", "**Damla sulama** (suyu doğrudan köke verir) ve **hidroponik tarım** (suyu döngüde kullanır). Ayrıca sensörlü (Tarım 4.0) sulama ile toprak nemine göre sulama yapılabilir.")],
  ["Sürdürülebilir tarım: gelecek nesilleri gözetir.", "Tarım 4.0: dron, yapay zekâ, IoT.", "Organik, İTU, hidroponik, agrivoltaik, dikey tarım."]),
O("k3", "5.3", "Stratejik ve kritik madenler", "Strategic and critical minerals", r"""
# Temel Kavramlar
- **Maden:** Yer kabuğunda doğal yollarla oluşan, ekonomik değeri olan mineral.
- **Rezerv:** Henüz çıkarılmamış toplam miktar.
- **Tenör:** Cevher içindeki **maden oranı** (yüksek tenör → işletme kârlı).
- **Stratejik maden:** **Millî güvenlik, savunma** ve ekonomik istikrar için hayati.
- **Kritik maden:** Sanayinin temel girdisi; **tedarik riski** yüksek.

# Türkiye'de Başlıca Madenler

| Maden | Kullanım | Türkiye'deki yerleri |
|---|---|---|
| **Bor** | Cam, seramik, deterjan, savunma, roket yakıtı, ileri teknoloji | Dünya rezervlerinin yaklaşık **%73'ü** → **dünya lideri**. Eskişehir-**Kırka**, Kütahya-**Emet**, Balıkesir-**Bigadiç**, Bursa-**Kestelek** |
| **Krom** | **Paslanmaz çelik** | Elazığ (Guleman), Muğla, Denizli |
| **Kobalt, nikel** | **Batarya**, elektrikli araç | Manisa, Eskişehir |
| **Demir** | Demir-çelik sanayi | Sivas (Divriği), Malatya (Hekimhan) |
| **Boksit** | **Alüminyum** | Konya-**Seydişehir** |
| **Nadir toprak elementleri** | Elektronik, mıknatıs | Eskişehir-Beylikova |
| **Lityum** | Batarya | Bor atıklarından üretim çalışmaları |
""",
  [("Bor madeninin stratejik kabul edilmesinin nedenleri nelerdir?", "Savunma sanayisi, enerji (roket yakıtı, nükleer kalkan), ileri teknoloji ve cam-seramik gibi geniş kullanım alanı vardır; Türkiye'nin dünya rezervlerinin yaklaşık **%73**'üne sahip olması ona **küresel pazar gücü** kazandırır.")],
  ["Rezerv: çıkarılmamış miktar; tenör: maden oranı.", "Bor: Türkiye dünya lideri (Kırka, Emet, Bigadiç).", "Krom paslanmaz çelik; boksit alüminyum (Seydişehir)."]),
O("k4", "5.4", "Enerji kaynakları, koridor rolü ve sanayileşme", "Energy, Türkiye's corridor role and industrialization", r"""
# Enerji Kaynakları
| Yenilenemeyen | Yenilenebilir |
|---|---|
| Kömür, petrol, doğal gaz, nükleer (uranyum) | Güneş, rüzgâr, hidroelektrik, **jeotermal**, biyokütle, dalga |

# Türkiye: Enerji Koridoru
Türkiye, enerji zengini **Hazar–Orta Doğu–Rusya** ile enerji tüketen **Avrupa** arasında köprüdür.

| Hat | Tür | Güzergâh |
|---|---|---|
| **Bakü–Tiflis–Ceyhan (BTC)** | Petrol | Azerbaycan → Gürcistan → Ceyhan |
| **Kerkük–Yumurtalık** | Petrol | Irak → Yumurtalık |
| **Bakü–Tiflis–Erzurum** | Doğal gaz | Azerbaycan → Erzurum |
| **TANAP** | Doğal gaz | Azerbaycan → Türkiye → Avrupa (TAP ile) |
| **Mavi Akım** | Doğal gaz | Rusya → Samsun (Karadeniz altından) |
| **Türk Akım** | Doğal gaz | Rusya → Kıyıköy (Trakya) → Avrupa |

# Sanayileşmenin Mekânsal Etkileri
**Sanayi:** Ham maddenin işlenerek mamul maddeye dönüştürülmesi.

**Kuruluş yeri faktörleri:** ham madde, enerji, su, ulaşım, pazar, iş gücü, sermaye, devlet politikaları.

- **Endüstri 4.0:** siber-fiziksel sistemler, **akıllı fabrikalar**, robotlar.
- **Etkileri:** göçü tetikler, **kentleşmeyi hızlandırır**, istihdam yaratır; ancak hava, su ve toprak **kirliliği** oluşturabilir.
- **Yeşil OSB:** Enerji verimli, atık yönetimi güçlü, yenilenebilir enerji kullanan organize sanayi bölgeleri.
""",
  [("Türkiye'nin 'enerji koridoru' olmasının ekonomik ve siyasi katkıları nelerdir?", "**Ekonomik:** Transit geçiş ücretleri, enerji arz güvenliği, yatırım ve istihdam. **Siyasi:** Avrupa'nın enerji güvenliğinde kilit rol, bölgesel diplomatik etki artışı.")],
  ["Yenilenebilir: güneş, rüzgâr, HES, jeotermal, biyokütle.", "Hatlar: BTC, TANAP, Türk Akım, Mavi Akım.", "Sanayi kentleşmeyi hızlandırır; Yeşil OSB."]),
]),
U("u6", "6. Ünite: Afetler ve Sürdürülebilir Çevre", "Unit 6: Disasters and Sustainable Environment", [
O("k1", "6.1", "Gezegen sınırları", "Planetary boundaries", r"""
# Antroposen

Sanayi Devrimi ile insanın doğa üzerindeki baskısı arttı; **Holosen**'in dengeli koşulları geride kalarak insan etkisinin baskın olduğu **Antroposen** (insan çağı) kavramı ortaya atıldı.

**Gezegen sınırı:** Dünya ekosisteminde **ani ve geri dönülmez** değişimleri önlemek için aşılmaması gereken güvenli çevresel eşikler (Rockström ve ark., 2009).

# Dokuz Gezegen Sınırı
1. İklim değişikliği
2. Biyosfer bütünlüğü (biyoçeşitlilik kaybı)
3. Biyojeokimyasal döngüler (**azot ve fosfor** akışı)
4. Okyanus asitlenmesi
5. Tatlı su kullanımı
6. Arazi sistemi değişikliği (ormansızlaşma)
7. Atmosferik aerosol yükü
8. Stratosferik **ozon** incelmesi
9. Yeni varlıklar (**kimyasallar, plastikler**)

> Son değerlendirmelere göre dokuz sınırın **altısı aşılmış** durumdadır; ozon tabakası ise Montreal Protokolü sayesinde iyileşme eğilimindedir.

# Ekolojik Açık ve Limit Aşım Günü
**Küresel Ayak İzi Ağı (GFN):** İnsanlığın yıllık doğal kaynak tüketimi, Dünya'nın bir yılda yenileyebileceğinden fazladır. **Limit aşım günü** (Earth Overshoot Day), o yıl için yenilenebilir kaynakların tükendiği gündür; son yıllarda **temmuz sonu**na denk gelmektedir.
""",
  [("Limit aşım gününün her yıl daha erken gelmesi ne anlama gelir?", "İnsanlığın tüketiminin Dünya'nın yenileme kapasitesini **giderek daha fazla aştığını**, yani **ekolojik açığın büyüdüğünü** gösterir.")],
  ["Antroposen: insan etkisinin baskın olduğu dönem.", "9 gezegen sınırı; ozon iyileşiyor, çoğu aşıldı.", "Limit aşım günü: ekolojik açık göstergesi."]),
O("k2", "6.2", "Küresel iklim değişikliği ve uyum", "Global climate change and adaptation", r"""
# Nedenler ve Etkiler
**Sera gazları:** karbondioksit (CO₂), metan (CH₄), diazot monoksit (N₂O), florlu gazlar → **sera etkisinin güçlenmesi** → küresel ısınma.

- Küresel ortalama sıcaklık sanayi öncesine göre yaklaşık **1,1–1,3 °C** arttı; **2024** yılı ilk kez yıllık ortalamada **1,5 °C** eşiğini aştı.
- Türkiye **Akdeniz havzasında** olduğu için iklim değişikliğine karşı kırılgandır: kötümser senaryolarda yüzyıl sonuna kadar sıcaklıkların **4–6 °C** artması, bazı bölgelerde yağışların belirgin azalması öngörülür.
- Etkiler: kuraklık, orman yangınları, sel, buzul erimesi, deniz seviyesi yükselmesi, tarımsal verim kaybı, **iklim göçü**.

# Uluslararası Anlaşmalar
| Anlaşma | Yıl | İçerik |
|---|---|---|
| **Rio Zirvesi** | 1992 | **BM İklim Değişikliği Çerçeve Sözleşmesi (UNFCCC)** kabul edildi |
| **Kyoto Protokolü** | 1997 | Gelişmiş ülkelere **bağlayıcı** emisyon azaltım yükümlülüğü |
| **Paris Anlaşması** | 2015 | Isınmayı **2 °C'nin oldukça altında**, mümkünse **1,5 °C** ile sınırlama |

**Türkiye:** Paris Anlaşması'nı **2021**'de onayladı; 2030'a kadar referans senaryoya göre **%41** emisyon azaltımı ve **2053 net sıfır emisyon** hedefi.

# Uyum ve Yeşil Beceriler
- **Azaltım (mitigation):** Emisyonu azaltmak — yenilenebilir enerji, enerji verimliliği, ağaçlandırma.
- **Uyum (adaptation):** Etkilere hazırlanmak — kuraklığa dayanıklı tohum, sel önlemi, erken uyarı.
- **Yeşil beceriler:** Sürdürülebilir ve kaynak verimli ekonomi için teknik ve çevre yönetimi becerileri.
- **Kirlilik sığınağı hipotezi:** Gelişmiş ülkelerin kirletici sanayilerini çevre kuralları **esnek** ülkelere taşıması.
""",
  [("Bir belediyenin yağmur suyu hasadı ve kuraklığa dayanıklı bitkiler kullanması azaltım mı, uyum mu?", "**Uyum** stratejisidir; iklim değişikliğinin etkilerine (kuraklık) hazırlanmayı amaçlar. Güneş paneli kurmak ise **azaltım** olurdu.")],
  ["Sera gazları: CO₂, CH₄, N₂O.", "Rio 1992, Kyoto 1997, Paris 2015 (1,5–2 °C).", "Türkiye: 2053 net sıfır; azaltım vs uyum."]),
O("k3", "6.3", "Türkiye'de suyun sürdürülebilir kullanımı", "Sustainable water use in Türkiye", r"""
# Su Ayak İzi
Tüketilen mal ve hizmetlerin üretiminde harcanan **toplam su** miktarı.

| Bileşen | Açıklama |
|---|---|
| **Yeşil su** | Bitkilerin kullandığı **yağmur suyu** (toprak nemi) |
| **Mavi su** | Yüzey ve yer altı kaynaklarından **çekilen** su |
| **Gri su** | Kirlenen suyu kabul edilebilir düzeye getirmek için gereken tatlı su |

**Türkiye'de sektörel dağılım:** su ayak izinin yaklaşık **%89'u tarım**, %7'si evsel, %4'ü sanayi kaynaklıdır. Tarımsal suyun büyük kısmı tahıl ve yem bitkilerinde harcanır.

# Falkenmark Su Stres İndeksi
Kişi başına yıllık kullanılabilir su miktarına göre:

| m³/kişi/yıl | Durum |
|---|---|
| > 1700 | Su stresi yok |
| 1000–1700 | **Su stresi** |
| 500–1000 | Su kıtlığı |
| < 500 | Mutlak kıtlık |

Türkiye'de kişi başına kullanılabilir su yaklaşık **1300 m³** → **su stresi yaşayan** ülke. Nüfus artışı ve iklim değişikliğiyle bu değerin 2050'lerde daha da düşmesi beklenir.

**Çözümler:** damla/yağmurlama sulama, kayıp-kaçakların azaltılması, gri suyun geri kazanımı, su tasarruflu ürün desenine geçiş, yağmur suyu hasadı.
""",
  [("Kişi başına yıllık 900 m³ suya sahip bir ülke hangi kategoridedir?", "500–1000 m³ arası → **su kıtlığı** çeken ülke.")],
  ["Su ayak izi: yeşil, mavi, gri su.", "Türkiye'de su ayak izinin ~%89'u tarım.", "Türkiye ~1300 m³ → su stresi."]),
]),
U("u7", "7. Ünite: Bölgeler, Ülkeler ve Küresel Bağlantılar", "Unit 7: Regions, Countries and Global Connections", [
O("k1", "7.1", "Türkiye'nin kültürel hinterlandı", "Türkiye's cultural hinterland", r"""
# Kültürel Hinterland

Bir ülkenin **kültürel olarak etkileşim** içinde olduğu coğrafi alan. Türkiye'nin konumu ve tarihî geçmişi nedeniyle geniş bir hinterlandı vardır.

**Bölgeler:** Balkanlar, Kafkasya, Türkistan (Orta Asya), Orta Doğu, Kuzey Afrika ve **KKTC**.

**Ortak unsurlar:** Osmanlı ve Selçuklu döneminden kalma mimari (cami, köprü, han, hamam, türbe), dil, din, gelenekler, mutfak, müzik.
- Örnek eserler: Mostar Köprüsü (Bosna-Hersek), Mehmet Paşa Sokoloviç Köprüsü (Vişegrad), Ahmet Yesevi Türbesi (Kazakistan).

# Kültürel Diplomasi Kurumları
| Kurum | Görev |
|---|---|
| **TİKA** | Kalkınma yardımları, Türk-İslam eserlerinin restorasyonu |
| **Yunus Emre Enstitüsü** | Yurt dışında Türkçe eğitimi ve kültür tanıtımı |
| **TÜRKSOY** | Türk dünyasında ortak kültür ve sanat faaliyetleri |
| **YTB** | Yurt dışındaki Türkler ve akraba topluluklarla ilişkiler |
| **Türk Devletleri Teşkilatı (TDT)** | Türk dünyasıyla siyasi-ekonomik iş birliği |
""",
  [("TİKA'nın Balkanlarda Osmanlı köprülerini restore etmesi hangi kavramla ilişkilidir?", "**Kültürel hinterland** ve **kültürel diplomasi** ile ilişkilidir; ortak mirası koruyarak bölgeyle bağları güçlendirir.")],
  ["Hinterland: Balkanlar, Kafkasya, Orta Asya, Orta Doğu, K. Afrika, KKTC.", "Ortak mimari, dil, din, gelenek.", "TİKA, YEE, TÜRKSOY, YTB."]),
O("k2", "7.2", "Örnek ülkeler: Hollanda, Almanya, Mısır, Avustralya, Rusya, Suudi Arabistan", "Case countries", r"""
# Tarım: Hollanda
- Batı Avrupa'da, Kuzey Denizi kıyısında; **Ren ve Maas** deltasında.
- Toprakların önemli kısmı deniz seviyesinde ya da altında; denizden kazanılan **polder** arazileri yaygın.
- **Ilıman okyanusal** iklim.
- Küçük yüzölçümüne rağmen **ABD'den sonra dünyanın en büyük ikinci tarım ihracatçısı** (değer olarak).
- **Süt hayvancılığı**, yüksek teknolojili **seracılık** (domates, salatalık, biber) ve **çiçekçilikte** (lale) dünya lideri.
- Başarının temeli: dikey tarım, hidroponik, **Wageningen Üniversitesi** Ar-Ge çalışmaları.

# Sanayi: Almanya – Mısır
| Almanya | Mısır |
|---|---|
| **Erken** sanayileşti | Sanayileşmesi **geç** başladı |
| **Ruhr Havzası**'nın kömür ve demiri ağır sanayiyi başlattı | **Nil** vadisi ve deltası nüfusun yoğunlaştığı alan; **Süveyş Kanalı** stratejik gelir kaynağı |
| Otomotiv, makine, kimya — **ileri teknoloji** | Tekstil, gıda, inşaat — **düşük katma değer** |
| Nitelikli iş gücü, güçlü **mesleki eğitim** | Nitelikli iş gücü ve **sermaye yetersiz** |
| Hamburg Limanı, **Kiel Kanalı** | Yüksek nüfus, düşük verimlilik |

# Madencilik: Avustralya
- Güney Yarım Küre'de, büyük yüzölçümlü ülke.
- **Eski jeolojik yapı** → zengin **demir cevheri, boksit, altın, lityum, kömür, nikel** rezervleri; demir cevheri, boksit ve lityum üretiminde dünyanın önde gelen ülkesidir.
- **Açık ocak** madenciliği, **otonom** kamyonlar, yapay zekâ destekli otomasyon.

# Enerji: Rusya – Suudi Arabistan
| Rusya | Suudi Arabistan |
|---|---|
| Dünyanın **en büyük yüzölçümlü** ülkesi | Arap Yarımadası'nda, **çöl iklimi** |
| Zengin **doğal gaz** (dünyanın en büyük rezervlerinden) ve petrol | Dünyanın en büyük **petrol** rezerv ve ihracatçılarından |
| Avrupa'nın enerji arzında kilit rol; boru hatları, **Trans-Sibirya** demir yolu | Ekonomi petrol gelirine bağlı; **OPEC**'in lider üyesi; çeşitlendirme hedefi (Vizyon 2030) |

> **Ünite özeti:** Coğrafi konum, iklim ve doğal kaynaklar ülkelerin tarım, madencilik, enerji ve sanayi gelişimini belirler; sürdürülebilir kalkınma için bu kaynaklar çevre bilinciyle yönetilmelidir.
""",
  [("Hollanda'nın küçük yüzölçümüne rağmen tarımda dünya devi olmasının nedenleri nelerdir?", "**Teknoloji ve Ar-Ge** (seracılık, hidroponik, dikey tarım), **verimli delta toprakları** ve polderler, ılıman okyanusal iklim, gelişmiş **lojistik** (Rotterdam Limanı) ve Avrupa pazarına yakınlık."),
   ("Almanya ile Mısır'ın sanayileşme düzeyleri arasındaki farkın iki nedenini yazınız.", "Almanya **erken sanayileşmiş**, Ruhr'un kömür-demir kaynaklarını kullanmış ve **nitelikli iş gücü** yetiştirmiştir. Mısır geç sanayileşmiş, **sermaye ve teknoloji eksikliği** nedeniyle düşük katma değerli sektörlerde kalmıştır.")],
  ["Hollanda: polder, sera, çiçek, Wageningen.", "Almanya erken-ileri; Mısır geç-düşük katma değer.", "Avustralya maden; Rusya doğal gaz; S. Arabistan petrol (OPEC)."]),
]),
]

write("cog-11.js", "11/cografya", "11. Sınıf Coğrafya — ayrıntılı ders notları",
      "kullanıcının verdiği \"11. Sınıf Coğrafya Ayrıntılı Ders Notları\" (7 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Küresel sıcaklık artışı güncel veriye göre düzeltildi (yaklaşık 1,1–1,3 °C; 2024'te yıllık 1,5 °C aşıldı); Türkiye projeksiyonu senaryoya bağlı verildi. Göl türleri, deniz yetki alanları ve enerji hatları tablolarla genişletildi.")
