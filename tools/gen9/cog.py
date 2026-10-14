# -*- coding: utf-8 -*-
"""9. Sınıf Coğrafya Konu Anlatım Notları (PDF) → js/data/content/cog-9.js"""
from common import O, U, write

units = []

# ---------------------------------------------------------------- 1. ÜNİTE
units.append(U("u1", "1. Ünite: Coğrafyanın Doğası", "Unit 1: The Nature of Geography", [
O("k1", "1.1.1",
  "Coğrafya biliminin konusu ve bölümleri",
  "The subject and branches of geography",
  r"""
# Coğrafya Biliminin Konusu

- **Doğal ortam:** İnsan etkisi olmadan oluşmuş, insan ve insani unsurların dışında kalan yer. Beş temel ortamdan oluşur: **taş küre (litosfer), hava küre (atmosfer), su küre (hidrosfer), buz küre (kriyosfer) ve yaşam küre (biyosfer)**. Bu ortamlar etkileşim hâlindedir; doğal ortamdaki değişimlere **doğa olayı** denir.
- **Beşerî ortam:** İnsanın sosyal, kültürel ve ekonomik faaliyetleri sonucunda doğal ortam üzerine inşa ettiği yaşam alanı.
- **Coğrafi ortam:** Doğal ve beşerî ortamın birlikteliğinden oluşan **en geniş yaşam alanı**; doğa ile insan arasında sürekli etkileşim vardır.
- **Coğrafya:** Doğa olayları ile insan faaliyetleri arasındaki **etkileşimi** inceleyen bilimdir. Kelime Yunanca **"geo" (yer)** ve **"graphein" (tasvir etmek)** kelimelerinden gelir.

# Coğrafyanın Bölümleri

### Fiziki Coğrafya — doğal olay ve süreçler
| Alt dal | İnceleme alanı |
|---|---|
| **Jeomorfoloji** | Yer şekilleri, oluşum süreçleri ve dağılışı (jeoloji, jeofizik vb. ile etkileşimli) |
| **Klimatoloji** | Atmosfer, hava olayları, iklim tipleri ve dağılışı (meteoroloji ile etkileşimli) |
| **Hidrografya** | Denizler, göller, akarsular; akıntı, dalga vb. |
| **Biyocoğrafya** | Bitki ve hayvan topluluklarının özellikleri ve dağılışı |
| **Toprak coğrafyası** | Toprakların oluşumu, özellikleri ve dağılışı (pedoloji, mineraloji) |

### Beşerî Coğrafya — insan faaliyetlerinin mekândaki dağılımı
| Alt dal | İnceleme alanı |
|---|---|
| **Nüfus coğrafyası** | Nüfusun özellikleri, dağılışı, hareketleri, nüfus politikaları |
| **Yerleşme coğrafyası** | Yerleşmelerin gelişimi, tipleri, mesken tipleri |
| **Siyasi coğrafya** | Siyasi olayların mekâna bağlı değişiklikleri |
| **Sosyal coğrafya** | Sosyal ilişkiler, kimlikler ve eşitsizlikler |
| **Kültürel coğrafya** | Dil, din, giyim, yemek, müzik, mimari |
| **Ekonomik coğrafya** | Sanayi, ticaret, tarım, hayvancılık, turizm, madencilik |

**Coğrafyada kullanılan teknikler:** haritalama, uzaktan algılama, niceleme (istatistik) yöntemleri, **Coğrafi Bilgi Sistemleri (CBS)**.
""",
  [],
  ["Doğal ortamın 5 küresi: **litosfer, atmosfer, hidrosfer, kriyosfer, biyosfer**.",
   "Coğrafi ortam = doğal ortam + beşerî ortam.",
   "Geo = yer, graphein = tasvir etmek.",
   "Fiziki: jeomorfoloji, klimatoloji, hidrografya, biyocoğrafya, toprak · Beşerî: nüfus, yerleşme, siyasi, sosyal, kültürel, ekonomik."]),

O("k2", "1.1.2",
  "Niçin coğrafya öğrenmeliyiz?",
  "Why should we learn geography?",
  r"""
# Niçin Coğrafya Öğrenmeliyiz?

Günümüzde doğal kaynakların yıllık tüketimi, Dünya ekosisteminin bir yılda ürettiği kaynaklardan **daha fazladır**. Bu durum insanlık ve Dünya için büyük bir tehdittir.

Coğrafya bilgisine sahip insanlar doğal ortamdaki unsurları, doğa olaylarını ve insan faaliyetleriyle etkileşimini **bütünsel** görebilir. Coğrafi bakış açısına sahip insan:
- Risk ve fırsatları **analiz eder**,
- Doğal ortamın **sınırlılıklarını** görür,
- **Haritaları** kullanır,
- Olayları **yerel, bölgesel ve küresel** ölçekte kavrar.

Coğrafya bilgisi **sürdürülebilir bir Dünya** için gereklidir ve **vatanseverlik bilincinin** oluşmasında rol oynar.

### Coğrafyanın Cevap Aradığı Sorular
**Ne? Nerede? Ne zaman? Neden orada? Neden önemli?** Bulunduğu ortamın özellikleri neler? Doğal ve beşerî ortamlarla nasıl bir ilişkisi var?
""",
  [],
  ["Kaynak tüketimi, ekosistemin yıllık üretimini **aşıyor**.",
   "Coğrafi bakış: risk-fırsat analizi, harita kullanımı, yerel-küresel ölçek.",
   "Temel sorular: **Ne? Nerede? Ne zaman? Neden orada? Neden önemli?**"]),

O("k3", "1.1.3",
  "Coğrafya biliminin gelişimi",
  "The development of geography",
  r"""
# Coğrafya Biliminin Gelişimi

Coğrafya dünyanın en eski bilimlerinden biridir. Kavram ilk kez **Eratosthenes** tarafından kullanılmıştır.

| Dönem | Etkili gelişmeler | Önemli isimler |
|---|---|---|
| **Eski Çağ** | Gezilen yerlerin tasviri ve haritalanması; kentlerin kurulması, ticaret, yazının icadı. Dünya'nın şekli, boyutları, koordinat sistemi ve yönler ele alındı. | Tales, Herodot, Aristoteles, Eratosthenes, Strabon, Batlamyus |
| **Orta Çağ** | İpek Yolu ve Baharat Yolu ticareti, büyük göçler. Namaz vakitleri, hac yolları gibi ihtiyaçlar coğrafyaya ilgiyi artırdı. | Harizmi, Biruni, İbni Haldun, Muhammed İdrisi, İbni Battuta, Mesudi |
| **Yeni Çağ** | Rönesans, reform ve sömürgecilik hareketleri | Kristof Kolomb, Macellan, Piri Reis, Ortelius, Kâtip Çelebi, Evliya Çelebi |
| **Yakın Çağ** | Fransız İhtilali, Sanayi Devrimi, bilim ve teknoloji. Sebep-sonuç ilişkileri ele alındı; coğrafyanın yöntemleri ve bölümleri bugünkü şeklini aldı. | Von Humboldt, Carl Ritter, Friedrich Ratzel |
| **Cumhuriyet Dönemi** | Türkiye'de modern coğrafya çalışmaları | Besim Darkot, Faik Sabri Duran, Reşat İzbırak, Sırrı Erinç |

Günümüzde coğrafya; doğal ve beşerî sistemlerdeki unsurları, işleyişi ve etkileşimi inceleyen, **mekânsal dağılışı** ortaya koyan, **neden-sonuç** ilişkilerini sorgulayan ve birçok alt dalı olan bir bilimdir.
""",
  [],
  ["Coğrafya kavramını ilk kullanan: **Eratosthenes**.",
   "Orta Çağ: Müslüman bilginler (Biruni, İbni Haldun, İdrisi…).",
   "Yeni Çağ: **Piri Reis**, Kâtip Çelebi, Evliya Çelebi · Yakın Çağ: Humboldt, Ritter, Ratzel."]),
]))

# ---------------------------------------------------------------- 2. ÜNİTE
units.append(U("u2", "2. Ünite: Mekânsal Bilgi Teknolojileri", "Unit 2: Spatial Information Technologies", [
O("k1", "2.1.1",
  "Mekânın sembolik dili: harita, harita elemanları ve harita türleri",
  "The symbolic language of space: maps, map elements and map types",
  r"""
# Harita

**Harita:** Dünya'nın veya başka bir gök cisminin tamamına ya da bir bölümüne ait coğrafi unsurların **belirli bir oranda küçültülerek**, **kuş bakışı** görünümle **düzlem** üzerine çizilmesidir.

### Bir Çizimin Harita Sayılması İçin
- **Kuş bakışı** (dik açı) görünümle çizilmeli,
- **Ölçek** kullanılmalı (ölçeksiz çizimlere **kroki** denir),
- **Düzlem** üzerine çizilmeli (kâğıt, kabartma yüzey veya ekran).

**Harita elemanları:** başlık, çerçeve, coğrafi koordinatlar, harita işaretleri (**lejant**), yön oku ve **ölçek**.

### Harita Türleri (Kullanım Amacına Göre)
- **Genel haritalar:** fiziki, siyasi, topoğrafya haritaları vb.
- **Tematik haritalar:** jeoloji, jeomorfoloji, iklim, toprak, bitki örtüsü, nüfus, ulaşım, turizm, ekonomi haritaları vb.
""",
  [],
  ["Harita: **küçültülmüş, kuş bakışı, düzlem** üzerine çizim; ölçeksizse **kroki**.",
   "Lejant = harita işaretlerinin açıklaması.",
   "Genel haritalar (fiziki, siyasi) · tematik haritalar (iklim, nüfus…)."]),

O("k2", "2.1.1",
  "Coğrafi koordinatlar, yerel saat ve saat dilimleri",
  "Geographic coordinates, local time and time zones",
  r"""
# Coğrafi Koordinatlar

- **Enlem:** Bir noktanın **Ekvator'a** uzaklığının yerin merkeziyle yaptığı açı değeri. Derece (°), dakika (′), saniye (″) ile ifade edilir.
- **Boylam:** Bir noktanın **başlangıç meridyenine** uzaklığının yerin merkeziyle yaptığı açı değeri.
- **GPS (Küresel Konumlandırma Sistemi):** Uydular aracılığıyla bir yerin coğrafi koordinatlarını belirleyen sistem.

# Yerel Saat, Ulusal Saat, Saat Dilimleri

- **Yerel saat:** Güneş'in ufuk düzleminde en yüksek noktaya ulaştığı öğle vaktine (**12.00**) göre ayarlanan saat.
- **Ulusal (ortak) saat:** Ülke sınırları içindeki bir meridyenin yerel saatinin ortak saat olarak kullanılması. **Türkiye'de 45° doğu meridyeninin** yerel saati kullanılır (**+3 saat dilimi**).
- **Uluslararası saat dilimleri:** Dünya **15'er derecelik** aralıklarla **24 saat dilimine** ayrılmıştır. **Tarih değiştirme çizgisi 180° meridyenidir.**
""",
  [("Türkiye neden +3 saat dilimini kullanır?",
    "Her saat dilimi 15° genişliktedir. Türkiye ortak saat olarak **45° doğu meridyeninin** yerel saatini kullanır: 45 ÷ 15 = **3** → başlangıç meridyeninden **3 saat ileri**.")],
  ["Enlem → **Ekvator'a** uzaklık; boylam → **başlangıç meridyenine** uzaklık.",
   "24 saat dilimi, her biri **15°**.",
   "Türkiye: **45° doğu** meridyeni, **+3**; tarih değiştirme çizgisi **180°**."]),

O("k3", "2.1.1",
  "Projeksiyon yöntemleri, ölçek ve haritalama teknikleri",
  "Projection methods, scale and mapping techniques",
  r"""
# Projeksiyon Yöntemleri

Küre şeklindeki Dünya'nın düzleme aktarılırken oluşan **bozulmaları** en aza indirmek için kullanılır.
- **Silindirik projeksiyon:** **Ekvator** çevresinde bozulma az, kutuplara doğru artar.
- **Konik projeksiyon:** **Orta kuşakta** bozulma azdır.
- **Düzlem projeksiyon:** Özellikle **kutup** bölgelerinin gösteriminde kullanılır.

# Ölçek

Harita çiziminde kullanılan **küçültme oranıdır**.
- **Kesir ölçek:** 1/100.000 gibi gösterilir; **pay her zaman 1**, birim **cm**'dir.
- **Çizgi ölçek:** Grafik olarak gösterilir; harita büyütülüp küçültüldüğünde ölçek de değiştiği için tercih edilir.

| | **Büyük ölçekli harita** | **Küçük ölçekli harita** |
|---|---|---|
| Küçültme oranı | Az | Fazla |
| Ayrıntı | Fazla | Az |
| Gösterilen alan | Dar | Geniş |

# Haritalama Teknikleri
- **Korokromatik:** renk/desenle alan gösterimi
- **Koroplet:** sayısal değerlere göre dereceli renklendirme
- **İzoplet (izometrik):** eşit değer hatları (izohips, izoterm, izobar vb.)
- **Noktalama:** nokta sembollerle miktar gösterimi
- **Oransal sembol:** boyutu değere göre değişen semboller
- **Akış haritaları:** hareketin miktarı ve yönü
- **Kartogram**
""",
  [("1/100.000 ölçekli bir haritada iki şehir arası 5 cm ölçülüyor. Gerçek uzaklık kaç km'dir?",
    "Haritada 1 cm = 100.000 cm = **1 km**. 5 cm × 1 km = **5 km**.")],
  ["Silindirik → Ekvator'da az bozulma; konik → orta kuşak; düzlem → **kutuplar**.",
   "Büyük ölçek: **dar alan, çok ayrıntı**; küçük ölçek: **geniş alan, az ayrıntı**.",
   "İzoplet = **eşit değer hatları** (izohips, izoterm, izobar)."]),

O("k4", "2.1.2",
  "Türkiye'nin coğrafi konumu",
  "Türkiye's geographic location",
  r"""
# Türkiye'nin Coğrafi Konumu

- Türkiye, **36°–42° kuzey enlemleri** ile **26°–45° doğu boylamları** arasında yer alır.
- **Asya ve Avrupa** kıtalarının kesişim noktasındadır.
- **Üç tarafı denizlerle** çevrilidir: Karadeniz, Akdeniz, Ege.
- **Boğazlar** (İstanbul ve Çanakkale) stratejik önem taşır.
- **Jeopolitik konumu** nedeniyle tarih boyunca önemli bir geçiş noktası olmuştur.
""",
  [],
  ["Türkiye: **36°–42° K enlemleri**, **26°–45° D boylamları**.",
   "Asya-Avrupa kesişimi; üç tarafı deniz; boğazlar stratejik."]),

O("k5", "2.1.3",
  "Mekânsal bilgi teknolojilerinin bileşenleri",
  "Components of spatial information technologies",
  r"""
# Mekânsal Bilgi Teknolojileri

Coğrafi verilerin **toplanması, depolanması, analiz edilmesi ve görselleştirilmesi** için kullanılan teknolojilerdir.

### Temel Bileşenler
- **Coğrafi Bilgi Sistemleri (CBS)**
- **Uzaktan algılama** (uydu ve hava fotoğrafları)
- **GPS**
- **Mekânsal veri tabanları**
- **Dijital haritalama** sistemleri
""",
  [],
  ["Mekânsal bilgi teknolojileri: veri **toplama, depolama, analiz, görselleştirme**.",
   "Bileşenler: **CBS, uzaktan algılama, GPS**, mekânsal veri tabanı, dijital haritalama."]),
]))

# ---------------------------------------------------------------- 3. ÜNİTE
units.append(U("u3", "3. Ünite: Doğal Sistemler ve Süreçler", "Unit 3: Natural Systems and Processes", [
O("k1", "3.1.1",
  "Hava olayları ve hava elemanları",
  "Weather events and weather elements",
  r"""
# Hava Olayları

**Hava olayları:** Belirli bir yer ve zamanda gerçekleşen sıcaklık, rüzgâr, nem, sis, yağış gibi hava koşullarıdır.
- **Meteoroloji:** Hava olaylarını ve bunları oluşturan süreçleri inceler; **meteorolog** hava tahmini yapar.
- **Klimatoloji:** Fiziki coğrafyanın alt dalı; iklim sistemini inceler. **Klimatolog** iklim özelliklerini ve dağılışını açıklar.
- **İklim:** Bir bölgedeki hava olaylarının **uzun süreli ortalamalarının** ve uç değerlerinin genel durumudur.

### Atmosfer
Hava olaylarının gerçekleştiği gaz karışımıdır: **azot (%78)**, **oksijen (%21)** ve diğer gazlar. Zararlı ışınları emer, meteorları engeller, aşırı ısınma/soğumayı önler, yaşam için uygun koşullar sağlar.

| Hava elemanı | Tanım | Ölçüm aracı (birim) |
|---|---|---|
| **Sıcaklık** | Taneciklerin ortalama kinetik enerjisinin ölçüsü; Güneş'e doğrudan maruz kalmayan, yerden **1,5–2 m** yükseklikte ölçülür | Termometre (°C) |
| **Basınç** | Atmosfer gazlarının birim yüzeye uyguladığı kuvvet. Standart: 45° enlemi, deniz seviyesi, 15 °C'ta **1013 mb** | Barometre (mb, hPa) |
| **Rüzgâr** | **Yüksek basınçtan alçak basınca** doğru yatay hava hareketi | Anemometre (m/sn, km/sa) |
| **Nem** | Atmosferdeki su buharı | Higrometre |
| **Yağış** | Doyma noktasında yoğuşma → sis, bulut, yağış | Plüviyometre (mm) |
""",
  [],
  ["Hava durumu **kısa süreli**, iklim **uzun süreli ortalama**.",
   "Atmosfer: **%78 azot, %21 oksijen**.",
   "Rüzgâr **yüksekten alçak basınca** eser; standart basınç **1013 mb**.",
   "Barometre-basınç · anemometre-rüzgâr · higrometre-nem · plüviyometre-yağış."]),

O("k2", "3.1.2",
  "İklim sistemi ve iklimi etkileyen faktörler",
  "The climate system and factors affecting climate",
  r"""
# İklim Sistemi

İklim sistemi; **atmosfer, hidrosfer, litosfer, biyosfer ve kriyosfer** arasındaki karmaşık etkileşimlerden oluşur.

- **Güneş enerjisi** sistemin temel enerji kaynağıdır.
- **Dünya'nın şekli (geoit), eksen eğikliği, dönme ve dolanma** hareketleri iklim sistemini etkiler.
- **Yerel iklim özelliklerini belirleyen faktörler:** karasallık-denizellik, okyanus akıntıları, topoğrafik faktörler (yükselti, **bakı**, dağların uzanışı).
""",
  [],
  ["İklim sistemi = atmosfer + hidrosfer + litosfer + biyosfer + kriyosfer.",
   "Temel enerji kaynağı: **Güneş**.",
   "Yerel iklim: karasallık-denizellik, okyanus akıntıları, yükselti, bakı, dağların uzanışı."]),

O("k3", "3.1.3",
  "İklim türleri",
  "Climate types",
  r"""
# İklim Türleri

İklim türleri **sıcaklık ve yağış** özelliklerine göre sınıflandırılır. Her iklim tipinin kendine özgü sıcaklık, **yağış rejimi**, **bitki örtüsü** ve toprak özellikleri vardır.

**Başlıca iklim tipleri:** Ekvatoral, savan (tropikal), muson, çöl, Akdeniz, okyanus, karasal, step (bozkır), tundra ve kutup iklimleri.
""",
  [],
  ["İklim tipleri **sıcaklık ve yağışa** göre ayrılır.",
   "Ekvatoral, savan, muson, çöl, Akdeniz, okyanus, karasal, step, tundra, kutup."]),

O("k4", "3.1.4",
  "İklim sisteminde yaşanan değişiklikler",
  "Changes in the climate system",
  r"""
# Küresel İklim Değişikliği

İnsan faaliyetleri (**fosil yakıt** kullanımı, **ormansızlaşma**, sanayi) sonucu **sera gazlarının** artmasıyla atmosferin ısınmasıdır.

### Sonuçları
- Sıcaklık artışı
- Buzulların erimesi ve **deniz seviyesinin yükselmesi**
- **Ekstrem hava olaylarının** artması
- Biyoçeşitlilik kaybı
- Tarımsal verimde değişiklikler

**Kentsel ısı adası etkisi** de yerel sıcaklık artışına neden olur.
""",
  [],
  ["Neden: fosil yakıt, ormansızlaşma, sanayi → **sera gazı artışı**.",
   "Sonuç: buzul erimesi, deniz seviyesi yükselmesi, ekstrem hava olayları, biyoçeşitlilik kaybı.",
   "Kentlerde **ısı adası** etkisi."]),
]))

# ---------------------------------------------------------------- 4. ÜNİTE
units.append(U("u4", "4. Ünite: Beşerî Sistemler ve Süreçler", "Unit 4: Human Systems and Processes", [
O("k1", "4.1.1",
  "Nüfusun tarihsel değişimi ve geleceği",
  "Historical change and future of population",
  r"""
# Nüfus Dinamikleri

**Nüfus dinamiği:** Nüfus özelliklerinin zaman içindeki değişimi, mekândaki dağılışı ve nüfus hareketleridir. Sağlık, eğitim, ekonomik büyüme, gıda güvenliği, kentleşme ve doğal kaynak yönetimi üzerinde belirleyicidir.

# Nüfusun Tarihsel Değişimi

| Sıçrama | Ne zaman? | Nedeni ve sonuçları |
|---|---|---|
| **Birinci** | Yaklaşık 1 milyon yıl önce | **Alet yapımı**; beslenme iyileşti, vahşi hayvanlarla mücadele kolaylaştı. |
| **İkinci (Neolitik dönem)** | Yaklaşık 10 bin yıl önce | **Tarım ve yerleşik hayat**; gıdaya erişim kolaylaştı, ilk şehirler kuruldu. Nüfus 150–300 milyona ulaştı. |
| **Üçüncü** | Sanayi Devrimi ve sonrası | Tıp, beslenme ve sağlık koşulları iyileşti; ölüm oranları düştü, ortalama ömür uzadı. 1800'lerde **1 milyar**, 1927'de **2 milyar**; 1950'den sonra hızlı artış. |

**Nüfus projeksiyonu:** Mevcut eğilimlere göre yapılan nüfus tahminleridir. UNFPA'ya göre **2100** yılında dünya nüfusunun **9–13 milyar** arasında olması beklenmektedir.
""",
  [],
  ["1. sıçrama **alet yapımı**, 2. sıçrama **tarım** (Neolitik), 3. sıçrama **Sanayi Devrimi**.",
   "1800'ler 1 milyar, 1927 2 milyar.",
   "2100 tahmini: **9–13 milyar** (UNFPA)."]),

O("k2", "4.1.2",
  "Nüfusun dağılışı ve hareketleri",
  "Population distribution and movements",
  r"""
# Nüfusun Dağılışı

Nüfus yeryüzünde **eşit dağılmamıştır**.
- **Doğal faktörler:** iklim, yer şekilleri, su kaynakları, toprak verimliliği.
- **Beşerî faktörler:** sanayi, ulaşım, tarihsel süreçler, ekonomik fırsatlar.
- **Nüfus yoğunluğu:** Birim alana (km²) düşen kişi sayısı.

# Göç

İnsanların **sürekli veya geçici** olarak yer değiştirmesidir.
- **İtici faktörler:** savaş, işsizlik, afet.
- **Çekici faktörler:** iş imkânı, eğitim, güvenlik.
""",
  [("Yüzölçümü 800 km², nüfusu 40.000 olan bir ilçenin nüfus yoğunluğu nedir?",
    "Nüfus yoğunluğu = nüfus ÷ alan = 40.000 ÷ 800 = **50 kişi/km²**.")],
  ["Dağılışı doğal (iklim, yer şekli, su, toprak) ve beşerî (sanayi, ulaşım) faktörler belirler.",
   "Nüfus yoğunluğu = **nüfus ÷ alan**.",
   "Göç: **itici** (savaş, işsizlik, afet) ve **çekici** (iş, eğitim, güvenlik) faktörler."]),

O("k3", "4.1.3",
  "Demografik dönüşüm süreci ve nüfus piramitleri",
  "The demographic transition and population pyramids",
  r"""
# Demografik Dönüşüm

Yüksek doğum ve ölüm oranlarından **düşük doğum ve ölüm oranlarına** geçiş sürecidir.

1. Yüksek doğum – yüksek ölüm
2. Yüksek doğum – düşük ölüm → **hızlı nüfus artışı**
3. Düşük doğum – düşük ölüm → **yavaş artış / durağanlık**

# Nüfus Piramidi

Nüfusun **yaş ve cinsiyet** yapısını gösteren grafiktir.
- **Geniş tabanlı** piramit → **genç ve hızlı artan** nüfus.
- **Dar tabanlı, üst kısmı geniş** piramit → **yaşlı** nüfus.

**Önemli göstergeler:** bağımlı nüfus (**0–14 ve 65+ yaş**), ortanca yaş, genç ve yaşlı nüfus oranları.
""",
  [],
  ["Demografik dönüşüm: yüksek doğum-ölüm → **düşük doğum-ölüm**.",
   "Geniş taban = **genç** nüfus; dar taban = **yaşlı** nüfus.",
   "Bağımlı nüfus: **0–14** ve **65+** yaş."]),

O("k4", "4.1.4",
  "Nüfus politikaları",
  "Population policies",
  r"""
# Nüfus Politikaları

Devletlerin nüfusun **miktarı, yapısı ve dağılışı** üzerinde etki yaratmak amacıyla uyguladığı politikalardır.

- Nüfus artışını **teşvik eden (pronatalist)** veya **sınırlayan (antinatalist)** politikalar uygulanabilir.
- Eğitim, sağlık, aile planlaması, göç yönetimi ve yaşlılık politikaları bu kapsamdadır.
- **Türkiye'de** nüfus artış hızının yavaşlaması ve yaşlı nüfus oranının artması nedeniyle **aktif yaşlanma** ve **nitelikli nüfus** politikaları önem kazanmıştır.
""",
  [],
  ["Pronatalist = **artışı teşvik**; antinatalist = **artışı sınırlama**.",
   "Türkiye: artış hızı yavaşlıyor, yaşlı oranı artıyor → aktif yaşlanma, nitelikli nüfus."]),
]))

# ---------------------------------------------------------------- 5. ÜNİTE
units.append(U("u5", "5. Ünite: Ekonomik Faaliyetler ve Etkileri", "Unit 5: Economic Activities and Their Effects", [
O("k1", "5.1.1",
  "Ekonomik faaliyetleri etkileyen doğal faktörler",
  "Natural factors affecting economic activities",
  r"""
# Ekonomik Faaliyetler

**Ekonomik faaliyet:** İnsanların hayatlarını sürdürmek, gelir elde etmek ve refah seviyelerini yükseltmek için yaptıkları çalışmalardır; **üretim, dağıtım ve tüketim** süreçlerini kapsar.

# Doğal Faktörler

| Faktör | Etkisi |
|---|---|
| **Coğrafi konum** | Ticaret yollarına, doğal kaynaklara ve pazarlara yakınlık avantaj sağlar. Türkiye'nin boğazlara ve kıtalar arası konumu **enerji taşımacılığında** stratejik önemdedir. |
| **İklim** | Tarım ürünlerinin türü ve verimi, turizm, enerji üretimi (güneş, rüzgâr, hidroelektrik) |
| **Topoğrafya** | Tarım arazilerinin dağılışı, ulaşım güzergâhları, liman ve havalimanı yer seçimi, turizm potansiyeli |
| **Su kaynakları** | Balıkçılık, hidroelektrik, sulama, deniz ulaşımı, bazı sanayi tesisleri |
| **Toprak** | Tarımın temeli; seramik, kiremit, tuğla için ham madde |
| **Bitki örtüsü** | Hayvancılık; kereste, kâğıt, mobilya ham maddesi; turizm ve rekreasyon |
| **Madenler ve enerji kaynakları** | Sanayi tesislerinin kuruluş yeri (ör. demir-çelik tesislerinin **kömür yataklarına yakın** kurulması) |
""",
  [],
  ["Ekonomik faaliyet: **üretim, dağıtım, tüketim**.",
   "Doğal faktörler: konum, iklim, topoğrafya, su, toprak, bitki örtüsü, madenler.",
   "Demir-çelik tesisleri **kömür yataklarına** yakın kurulur."]),

O("k2", "5.1.2",
  "Ekonomik faaliyetleri etkileyen beşerî faktörler",
  "Human factors affecting economic activities",
  r"""
# Beşerî Faktörler

- **Nüfus:** Miktar, artış hızı, yaş yapısı ve eğitim düzeyi. Ekonomik büyüme ile nüfus artışı **dengeli** olmalıdır.
- **İş gücü:** Varlığı ve maliyeti önemlidir. Gelişmiş ülkeler üretimin bir kısmını **iş gücü maliyetinin düşük** olduğu ülkelere kaydırır.
- **Sermaye:** Tesislerin kuruluşu, devamlılığı ve gelişmesi için gereklidir. **Çok uluslu şirketler** sermaye hareketliliğini artırır.
- **Teknoloji:** Üretim, dağıtım ve tüketimi hızlandırır. **Dört sanayi devrimi** (buhar, elektrik, elektronik, dijital) maliyetleri düşürmüş, hız ve kaliteyi artırmıştır.
- **Ulaşım:** Ham maddenin fabrikaya, ürünün pazara ulaşmasında kritik rol oynar. Gelişmiş limanlar sanayi ve ticaret merkezleriyle örtüşür.
- **Devlet politikaları:** Ekonomiye müdahale düzeyi, teşvikler, hukuki ve siyasi istikrar **yabancı sermaye** girişini etkiler.
""",
  [],
  ["Beşerî faktörler: **nüfus, iş gücü, sermaye, teknoloji, ulaşım, devlet politikaları**.",
   "Dört sanayi devrimi: **buhar, elektrik, elektronik, dijital**.",
   "Düşük iş gücü maliyeti üretimi çeker; istikrar yabancı sermayeyi çeker."]),
]))

# ---------------------------------------------------------------- 6. ÜNİTE
units.append(U("u6", "6. Ünite: Afetler ve Sürdürülebilir Çevre", "Unit 6: Disasters and a Sustainable Environment", [
O("k1", "6.1.1",
  "Tehlike, risk ve afet kavramları",
  "Hazard, risk and disaster",
  r"""
# Tehlike, Risk ve Afet

- **Tehlike:** Belirli bir zaman ve yerde ortaya çıkarak insan hayatını, mal varlığını, beşerî faaliyetleri ve doğal çevreyi **olumsuz etkileme potansiyeli** olan olaylar (deprem, sel, volkan, yangın, salgın vb.).
- **Risk:** Bir olayın belirli koşullarda meydana gelme **ihtimali** ile doğurabileceği can, mal, ekonomik ve çevresel **kayıp olasılığı**.
  - **Risk = Tehlike × Maruziyet × Güvenlik açığı**
- **Afet:** Tehlikeli olaylara maruz kalınmasıyla olağan hayatı bozan, can ve mal kaybına yol açan, **insanların baş etme kapasitesini aşarak dış yardım gerektiren** olaylar.
- **Ekstrem doğa olayı:** Doğanın akışı içindeki bir olayın aşırı veya sıra dışı şekilde gerçekleşmesi (ör. **1960 Şili depremi, 9,5** büyüklüğünde).

### Örnek İlişki
Aşırı yağış → **sel tehlikesi** · Vadi tabanına yerleşme → **risk artışı** · Taşkın + zayıf yapı + tahliye planı eksikliği → **afet**
""",
  [("Aynı büyüklükteki deprem, A şehrinde az, B şehrinde çok hasara yol açıyor. Bunun nedeni ne olabilir?",
    "Tehlike (deprem) aynıdır; fark **riskin** diğer bileşenlerindedir. B şehrinde **maruziyet** (yoğun nüfus, fay hattına yakınlık) ve **güvenlik açığı** (dayanıksız yapılar, hazırlık eksikliği) daha yüksektir.")],
  ["**Risk = Tehlike × Maruziyet × Güvenlik açığı**.",
   "Afet: baş etme kapasitesini aşar, **dış yardım** gerektirir.",
   "Tehlike her zaman afete dönüşmez; hazırlık riski azaltır."]),

O("k2", "6.1.2",
  "Afet türleri",
  "Types of disasters",
  r"""
# Afet Türleri

Afetler oluşum nedenine, hızına ve etki alanına göre sınıflandırılır:

| Tür | Örnekler |
|---|---|
| **Doğa kaynaklı** | Deprem, sel, taşkın, heyelan, çığ, volkanik patlama, tsunami, fırtına, tayfun, orman yangını, kuraklık |
| **İnsan kaynaklı (teknoloji kökenli)** | Maden kazaları, ulaşım kazaları, endüstriyel kazalar, nükleer kazalar |
| **Karma / sosyal** | Savaş, salgın hastalık, kitlesel göç |

Son yıllarda **küresel iklim değişikliği**, doğal kaynakların aşırı kullanımı ve nüfus hareketleri nedeniyle afetlerin **sıklığı ve şiddeti artmaktadır**.
""",
  [],
  ["Doğa kaynaklı (deprem, sel, heyelan…), insan kaynaklı (endüstriyel, nükleer kaza…), karma (savaş, salgın, göç).",
   "İklim değişikliği afetlerin sıklığını ve şiddetini artırıyor."]),

O("k3", "6.1.3",
  "Bütüncül afet yönetimi",
  "Integrated disaster management",
  r"""
# Bütüncül Afet Yönetimi

Afet **öncesi, sırası ve sonrasını** kapsayan planlı ve koordineli süreçtir.

### Bileşenleri
- Risk analizi
- **Erken uyarı** sistemleri
- Hazırlık ve müdahale yetenekleri
- **Zarar azaltma**
- İyileştirme ve yeniden yapılandırma

**Çoklu tehlike erken uyarı sistemleri**, afet eğitimleri, **acil durum çantası** hazırlığı ve **mekânsal planlama** riski azaltmada kritik öneme sahiptir.

**"Yeşil Vatan"** yaklaşımı, orman yangınları gibi afetlere karşı bütüncül koruma anlayışını ifade eder.
""",
  [],
  ["Afet yönetimi: **öncesi, sırası, sonrası**.",
   "Erken uyarı, afet eğitimi, acil durum çantası, mekânsal planlama riski azaltır.",
   "Yeşil Vatan: orman yangınlarına karşı bütüncül koruma."]),
]))

# ---------------------------------------------------------------- 7. ÜNİTE
units.append(U("u7", "7. Ünite: Bölgeler, Ülkeler ve Küresel Bağlantılar", "Unit 7: Regions, Countries and Global Connections", [
O("k1", "7.1.1",
  "Bölge belirleme kriterleri ve bölge türleri",
  "Criteria for defining regions and types of regions",
  r"""
# Bölge

**Bölge:** Yeryüzünün doğal ve beşerî unsurlar bakımından **kendi içinde benzerlik gösteren** parçalarıdır. Bölge belirleme kriterleri **fiziki** (yer şekilleri, iklim, bitki örtüsü vb.) veya **beşerî** (nüfus, yerleşme, sanayi, tarım, turizm vb.) olabilir.

### Şekilsel Bölge
Doğal veya beşerî özellikleriyle diğer alanlardan ayrılan bölgelerdir. **Belirli bir merkezi yoktur**; bölgedeki her yer aynı özelliğe sahiptir.
- **Doğal şekilsel bölge:** yer şekilleri, iklim, su, toprak, bitki ve afet bölgeleri (Akdeniz iklim bölgesi, Orta Toroslar dağlık bölgesi).
- **Beşerî şekilsel bölge:** ham madde, üretim, sanayi, nüfus, yerleşme, kültür bölgeleri (Türkiye'nin pamuk üretim bölgeleri, Türk kültür bölgesi).

### İşlevsel (Fonksiyonel) Bölge
Bir **çekirdek (merkez)** ve onu çevreleyen alandan oluşur; ekonomik ve kültürel yönden etkileşim gösterir. Etkileşim yoğunluğu **merkezden uzaklaştıkça azalır**.
- Örnekler: **metropoliten alanlar**, liman hinterlandları (**Rotterdam Limanı**), gazete tiraj alanları.
""",
  [],
  ["Şekilsel bölge: **merkezi yok**, her yer aynı özellikte.",
   "İşlevsel bölge: **merkez + çevre**; etkileşim merkezden uzaklaştıkça azalır.",
   "Örnek: Akdeniz iklim bölgesi (doğal şekilsel), Rotterdam hinterlandı (işlevsel)."]),

O("k2", "7.1.2",
  "Kriterlere göre bölge sınırları",
  "Region boundaries according to criteria",
  r"""
# Kriterlere Göre Bölge Sınırları

- Bölge sınırı **kullanılan kritere** göre belirlenir; kriterin özelliği bölgenin dağılış alanını ve sınır **netliğini** etkiler.
- **Net sınırlar:** siyasi sınırlar, büyükşehir belediye sınırları.
- **Geçişli, belirsiz sınırlar:** iklim bölgeleri, bitki örtüsü geçişleri.
- Doğal kriterlere göre oluşturulan bölgelerde genellikle **geçiş alanları** bulunur; beşerî kriterlere göre oluşturulan bazı bölgelerde sınırlar daha nettir.
""",
  [],
  ["Siyasi ve idari sınırlar **net**; iklim ve bitki örtüsü sınırları **geçişli**.",
   "Doğal kriterli bölgelerde **geçiş alanları** bulunur."]),

O("k3", "7.1.3",
  "Bölge sınırlarında değişim",
  "Changes in regional boundaries",
  r"""
# Bölge Sınırlarında Değişim

Bölge sınırları **sabit değildir**. Şu faktörler sınırları değiştirebilir:
- İklim değişikliği
- Teknolojik gelişmeler
- Ekonomik dönüşümler
- Siyasi kararlar
- Göç ve kentleşme

**Örnekler:** sanayi bölgelerinin kayması, tarım alanlarının daralması, yeni turizm bölgelerinin ortaya çıkması, siyasi sınır değişiklikleri.

Bu nedenle bölgeler **dinamik** yapılardır ve zaman içinde yeniden tanımlanabilir.
""",
  [],
  ["Bölge sınırları **dinamiktir**, zamanla değişir.",
   "Etkenler: iklim değişikliği, teknoloji, ekonomi, siyasi kararlar, göç ve kentleşme."]),
]))

write("cog-9.js", "9/cografya", "9. Sınıf Coğrafya — konu anlatım notları",
      "kullanıcının verdiği \"9. Sınıf Coğrafya Ders Kitabı – Konu Anlatım Notları\" (7 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Örnek soruların bir kısmı kazanımı uygulamak için eklendi.")
