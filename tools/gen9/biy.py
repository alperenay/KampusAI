# -*- coding: utf-8 -*-
"""9. Sınıf Biyoloji Kazanım Odaklı Konu Anlatım Notları (PDF) → js/data/content/biy-9.js"""
from common import O, U, write

units = []

# ---------------------------------------------------------------- 1. TEMA: YAŞAM
units.append(U("u1", "1. Tema: Yaşam", "Theme 1: Life", [
O("k1", "1.1",
  "Biyolojideki gelişmelerin insan hayatına katkılarını sorgular ve biyoloji biliminin tarihsel gelişimindeki dönüm noktalarını analiz eder.",
  "Questions how advances in biology contribute to human life and analyses turning points in its history.",
  r"""
# Biyolojinin Önemi ve Dönüm Noktaları

**Biyoloji:** Canlıların yapılarını, işlevlerini, birbirleriyle ve çevreleriyle etkileşimlerini inceleyen doğa bilimidir. **Sağlık, tarım, çevre ve ekonomi** alanlarının temelini oluşturur.

### Tarihsel Dönüm Noktaları
| Yıl | Kişi / gelişme | Katkı |
|---|---|---|
| 1389–1459 | **Akşemseddin** | Hastalık etmenlerinin bulaşma yollarını (mikrop düşüncesi) öne sürdü. |
| 1665 | **Robert Hooke** | Mikroskobun öncülünü geliştirdi; *Micrographia*'da ilk hücre gözlemini yayımladı. |
| 1838 | **Hücre teorisi** (Schleiden & Schwann) | Organizmaların hücrelerden oluştuğunu ortaya koydu. |
| 1865 | **Gregor Mendel** | Kalıtım kurallarını bezelyelerle belirledi. |
| 1928 | **Alexander Fleming** | Penisilini (ilk antibiyotik) keşfetti. |
| 1953 | **DNA çift sarmalı** (Watson, Crick, Franklin) | Genetik materyalin saklanma biçimi çözüldü. |
| 2012 / 2021 | **CRISPR-Cas** ve **mRNA aşıları** | Gen düzenleme ve yeni nesil aşı teknolojileri. |
""",
  [],
  ["Biyoloji: sağlık, tarım, çevre ve ekonominin temeli.",
   "Akşemseddin → **mikrop** düşüncesi · Hooke → ilk **hücre** gözlemi · Fleming → **penisilin**.",
   "Hücre teorisi **1838** (Schleiden & Schwann); DNA çift sarmalı **1953**."]),

O("k2", "1.2",
  "Bilimsel araştırma süreçlerinde bilimin doğasını yorumlar ve bilimsel yöntem basamaklarını uygular.",
  "Interprets the nature of science in research and applies the steps of the scientific method.",
  r"""
# Bilimin Doğası ve Bilimsel Yöntem

### Bilimin Doğasının Temel Özellikleri
- Bilimsel bilgiler **kesin, mutlak ve değişmez değildir**; yeni kanıtlarla değişebilir.
- Bilim **kültürel ve sosyal yapıdan bağımsız** düşünülemez.
- **Öznellik** barındırabilir; bilim insanlarının bakış açıları süreci etkileyebilir.
- **Teoriler** (neden açıklar) ve **kanunlar** (nasıl gerçekleştiğini söyler) farklı yapılardır; aralarında **hiyerarşik bir dönüşüm yoktur** (teori kanuna dönüşmez).

### Bilimsel Yöntem Basamakları
1. **Gözlem yapma:** Duyu organları ve araçlarla **nitel** veya **nicel** veri toplama.
2. **Problemi belirleme:** "Neden?", "Nasıl?" sorularıyla durumun netleştirilmesi.
3. **Veri toplama:** Güvenilir kaynaklardan bilgi derlenmesi.
4. **Hipotez oluşturma:** Gözlemlere dayalı, **test edilebilir geçici çözüm**.
5. **Tahminde bulunma:** Hipotezden çıkarılan sonuç ("Eğer … ise …").
6. **Deney tasarlama:** Kontrollü deneyle **bağımsız değişkenin bağımlı değişken** üzerindeki etkisi test edilir.
7. **Analiz ve sonuç:** Bulgular hipotezi destekliyorsa raporlanır; desteklemiyorsa hipotez değiştirilir.
""",
  [("Bir öğrenci farklı sıcaklıklardaki suda tohumların çimlenme süresini ölçüyor. Bu deneyde bağımsız ve bağımlı değişken nedir?",
    "**Bağımsız değişken:** suyun sıcaklığı (deneyi yapanın değiştirdiği). **Bağımlı değişken:** çimlenme süresi (ölçülen sonuç).")],
  ["Bilimsel bilgi **değişebilir**; teori ve kanun farklıdır, teori kanuna dönüşmez.",
   "Hipotez = **test edilebilir** geçici çözüm.",
   "Kontrollü deney: **bağımsız** değişkenin **bağımlı** değişkene etkisi."]),

O("k3", "1.3",
  "Bilimsel araştırmaların bilim etiğine uygunluğu hakkında bilgi toplar ve etik dışı davranışları yorumlar.",
  "Gathers information on research ethics and interprets unethical behaviour.",
  r"""
# Bilim Etiği

Araştırmalarda uyulması gereken etik ilkeler:

- **Gönüllü onam:** Katılımcıların bilgilendirilerek onaylarının alınması.
- **Gizlilik:** Katılımcı bilgilerinin korunması.
- **Hayvan haklarına saygı.**
- **Veri uydurmama (fabrikasyon).**
- **Sonuçları değiştirmeme (falsifikasyon).**
- **Başkasının fikrini izinsiz kullanmama (intihal).**
- **Kaynak göstermek zorunludur.**
""",
  [],
  ["Fabrikasyon = veri **uydurma**; falsifikasyon = sonuçları **değiştirme**; intihal = **izinsiz alıntı**.",
   "Gönüllü onam, gizlilik ve kaynak gösterme zorunludur."]),

O("k4", "1.4",
  "Çevrenizdeki canlıların özelliklerini bilimsel olarak gözlemler ve ortak özellikleri sınıflandırır.",
  "Observes living things scientifically and classifies their common characteristics.",
  r"""
# Canlıların Ortak Özellikleri

1. **Hücresel yapı:** Tüm canlılar hücre ya da hücrelerden oluşur.
   - **Prokaryot hücre:** Çekirdek ve zarlı organel **yoktur** (bakteriler, arkeler).
   - **Ökaryot hücre:** Belirgin çekirdek ve zarlı organeller **vardır** (amip, öglena, bitki, hayvan, mantar).
2. **Organizasyon:** Atom → Molekül → Organel → Hücre → Doku → Organ → Sistem → Organizma.
3. **Beslenme:**
   - **Ototrof (üretici):** Besinini kendi üretir (fotosentez/kemosentez; bitkiler).
   - **Heterotrof (tüketici):** Besinini hazır alır (hayvanlar, mantarlar).
   - **Hem ototrof hem heterotrof:** Işıkta fotosentez yapar, karanlıkta hazır beslenir (öglena).
4. **Enerji üretimi ve metabolizma:** Enerji **ATP**'den karşılanır (hücresel solunum). Metabolizma = yapım + yıkım tepkimelerinin tümü.
   - **Anabolizma (yapım):** Küçük moleküllerden büyük molekül sentezi (protein sentezi, fotosentez). ATP harcanır, **su açığa çıkar**.
   - **Katabolizma (yıkım):** Büyük moleküllerin hidrolizle parçalanması (sindirim, solunum). **Su kullanılır**.
5. **Boşaltım:** Metabolik atıkların, fazla su ve tuzların uzaklaştırılarak iç dengenin korunması.
6. **Büyüme ve gelişme:** Tek hücrelilerde hacim/kütle artışı; çok hücrelilerde hücre bölünmesiyle hücre sayısı ve hacim artışı (büyüme). Yapıların olgunlaşması **gelişmedir**.
7. **Üreme:** Neslin devamı için birey oluşturma (eşeyli/eşeysiz). **Bireyin yaşamı için zorunlu değildir.**
8. **Uyarılara tepki:** Çevresel değişikliklere yanıt (ayçiçeğinin güneşe yönelmesi).
9. **Homeostazi:** İç dengenin (sıcaklık, su, pH) kararlı tutulması.
10. **Varyasyon ve adaptasyon:** Varyasyon tür içi genetik çeşitlilik; adaptasyon hayatta kalma avantajı sağlayan kalıtsal uyum.

### Virüslerin Durumu
Virüsler **hücresel yapıya sahip değildir**, metabolizmaları yoktur, dış ortamda **kristalleşirler** ve kendi başlarına enzim sentezleyemezler. Yalnızca canlı hücre içinde çoğalabildikleri için **canlı ile cansız arasında geçiş formu** kabul edilirler.
""",
  [],
  ["Prokaryot: çekirdek ve zarlı organel **yok**; ökaryot: **var**.",
   "Anabolizma: yapım, ATP harcanır, **su açığa çıkar**; katabolizma: yıkım, **su kullanılır**.",
   "Üreme, birey için zorunlu değil **tür** için zorunludur.",
   "Virüs: hücresel yapı ve metabolizma yok → **canlı-cansız arası**."]),

O("k5", "1.5",
  "İnorganik moleküllerin (su ve mineraller) canlı yaşamı üzerindeki önemi hakkında bilimsel çıkarım yapar.",
  "Makes scientific inferences about the importance of inorganic molecules (water and minerals) for life.",
  r"""
# İnorganik Moleküller

Genellikle **karbon (C) içermeyen**, hücre zarından doğrudan geçebilen, **sindirime uğramayan**, **enerji vermeyen** ve hücrelerin yapısına katılan moleküllerdir.

### Suyun Yapısı ve Önemi
Su molekülü iki hidrojen ve bir oksijenin **kovalent** bağlanmasıyla oluşur. Oksijenin elektronegatifliği yüksek olduğundan **polar** yapıdadır.

- **İyi çözücüdür:** Madde taşınmasını ve metabolik tepkimeleri sağlar.
- **Kohezyon ve adezyon:** Su moleküllerinin birbirini çekmesi **kohezyon** (yüzey gerilimi oluşturur), farklı maddelere tutunması **adezyondur**. Bitkilerde suyun yukarı taşınmasında etkilidir.
- **Yüksek ısı kapasitesi:** Ani sıcaklık değişimlerini engeller, vücut sıcaklığını dengeler.
- **Buzun yoğunluğu:** Su donduğunda hacmi genişler, yoğunluğu azalır; buz suyun üstünde yüzer ve **su altındaki yaşamı korur**.

### Mineraller
Canlılar tarafından **sentezlenemeyen**, su ve besinlerle dışarıdan alınan inorganik maddelerdir.

| Mineral | Görevi | Eksikliğinde |
|---|---|---|
| **Demir (Fe)** | Hemoglobin yapısına katılır, oksijen taşır | **Anemi** (kansızlık) |
| **Kalsiyum (Ca)** | Kemik ve diş yapısı, kas kasılması, kan pıhtılaşması | — |
| **İyot (I)** | Tiroksin hormonu üretimi | **Guatr** |
| **Sodyum (Na) ve Potasyum (K)** | Sinirsel iletim, su-elektrolit dengesi | — |
| **Fosfor (P)** | ATP, DNA, RNA ve kemik yapısı | — |
| **Magnezyum (Mg)** | Klorofilin yapısı, enzimlerin çalışması | — |
| **Flor (F)** | Diş sağlığı | — |
""",
  [],
  ["İnorganik moleküller: **sindirilmez, enerji vermez**, zardan doğrudan geçer.",
   "Su polardır; yüksek ısı kapasitesi vücut sıcaklığını dengeler.",
   "Buz suda yüzer → su altındaki yaşam korunur.",
   "Fe eksikliği → **anemi**; I eksikliği → **guatr**; Mg → **klorofil**."]),

O("k6", "1.6",
  "Karbohidratların yapısını ve çeşitlerini sınıflandırır.",
  "Classifies the structure and types of carbohydrates.",
  r"""
# Organik Moleküller ve Karbohidratlar

**Organik moleküller** yapılarında C, H, O bulunduran bileşiklerdir. Büyük yapılı olanlar (**polimerler**), küçük birimlerin (**monomerlerin**) **dehidrasyon** sentezi ile üretilir; sindirimleri **hidroliz** ile gerçekleşir.

**Karbohidratlar** C, H ve O'dan oluşur; **ilk sırada kullanılan enerji kaynağıdır** ve yapıya katılır.

### 1. Monosakkaritler (Tek Şekerler) — sindirime uğramaz
- **5 karbonlu (pentoz):** Riboz (RNA ve ATP yapısında), deoksiriboz (DNA yapısında). Enerji vermezler.
- **6 karbonlu (heksoz):** Glikoz (kan şekeri, temel yakıt), fruktoz (meyve şekeri), galaktoz (süt şekeri). Kapalı formülleri aynıdır (C₆H₁₂O₆); **yapısal izomerdirler**.

### 2. Disakkaritler (İkili Şekerler)
İki monosakkaritin dehidrasyonuyla (**glikozit bağı** kurularak, **su açığa çıkarak**) oluşur. Hücre zarından doğrudan geçemezler.
- Glikoz + Glikoz → **Maltoz** (arpa şekeri) + H₂O
- Glikoz + Fruktoz → **Sükroz/Sakkaroz** (çay şekeri) + H₂O
- Glikoz + Galaktoz → **Laktoz** (süt şekeri) + H₂O

### 3. Polisakkaritler (Çoklu Şekerler)
Çok sayıda glikozun glikozit bağlarıyla bağlanmasıyla oluşur.
- **Depo:** **Nişasta** (bitkiler), **glikojen** (hayvan, mantar, bakteri).
- **Yapısal:** **Selüloz** (bitki hücre duvarı; insan sindiremez ama lifli gıda olarak bağırsak sağlığı için önemlidir), **kitin** (eklembacaklıların dış iskeleti ve mantar çeperi; azot içerir, eriyen cerrahi ipliklerde kullanılır).
""",
  [("Laktoz sindirildiğinde hangi monosakkaritler oluşur? Bu sırada su harcanır mı, açığa mı çıkar?",
    "Laktoz hidrolizle **glikoz ve galaktoza** ayrılır. Hidroliz olduğu için **1 su harcanır**.")],
  ["Polimer **dehidrasyonla** oluşur (su açığa çıkar), **hidrolizle** sindirilir (su harcanır).",
   "Maltoz = G + G · Sükroz = G + **fruktoz** · Laktoz = G + **galaktoz**.",
   "Nişasta bitkide, **glikojen** hayvan ve mantarda depo; selüloz ve **kitin** yapısal."]),

O("k7", "1.6",
  "Lipitlerin yapısını ve çeşitlerini sınıflandırır.",
  "Classifies the structure and types of lipids.",
  r"""
# Lipitler (Yağlar)

C, H ve O içerirler; bazılarında N ve P de bulunabilir. **Suda çözünmezler**, apolar (hidrofobik) özelliktedirler. **Polimer değildirler.**

- **Yağ asitleri:**
  - **Doymuş:** C atomları arasında **tek bağ**; genellikle hayvansal, oda sıcaklığında **katı** (tereyağı).
  - **Doymamış:** **Çift bağ** içerir; genellikle bitkisel, **sıvı** (zeytinyağı).
  - Sıvı bitkisel yağların hidrojenle doyurulmasıyla **margarin** elde edilir.
- **Trigliseritler (nötral yağlar):** **1 gliserol + 3 yağ asidinin** ester bağlarıyla birleşmesi (dehidrasyon). **3 su açığa çıkar.** Enerji deposudur; ısı yalıtımı ve mekanik koruma sağlar.
- **Fosfolipitler:** Hücre zarlarının temel bileşeni. **1 gliserol + 2 yağ asidi + 1 fosfat grubu.** Baş kısmı **hidrofilik**, kuyruk kısmı **hidrofobiktir**.
- **Steroitler:** Halkasal yapılı lipitler. **Kolesterol** zar akışkanlığını düzenler; cinsiyet hormonları ve **D vitamininin** öncülüdür.
""",
  [],
  ["Lipitler suda çözünmez ve **polimer değildir**.",
   "Doymuş: tek bağ, katı, hayvansal · Doymamış: çift bağ, sıvı, bitkisel.",
   "Trigliserit = 1 gliserol + **3** yağ asidi → **3 su** açığa çıkar.",
   "Fosfolipit: hidrofilik baş, hidrofobik kuyruk → **hücre zarı**."]),

O("k8", "1.6",
  "Proteinlerin yapısını ve görevlerini açıklar.",
  "Explains the structure and functions of proteins.",
  r"""
# Proteinler

Yapılarında **C, H, O, N** ve sıklıkla **S (kükürt)** bulunur. DNA'daki genetik şifreye göre **ribozomda** sentezlenirler.

### Yapı Taşı: Amino Asit
Merkezi karbona bağlı **amino grubu (–NH₂)**, **karboksil grubu (–COOH)**, bir hidrojen ve değişken **radikal grup (–R)** içerir.
- Doğada **20 çeşit** amino asit vardır.
- Vücutta üretilemeyip besinle alınması gerekenlere **esansiyel (zorunlu) amino asit** denir.

### Peptit Bağı
İki amino asit arasında **su açığa çıkarak** kurulan bağdır. **n** amino asit birleşirse **n − 1** peptit bağı kurulur ve **n − 1** su açığa çıkar.

### Görevleri
Hücrede yapı ve onarım, **enzim** ve **hormon** yapısına katılım, bağışıklık (**antikor**), oksijen taşınması (**hemoglobin**).

**Denatürasyon:** Yüksek sıcaklık, pH ve basınç gibi etkenlerle proteinin **üç boyutlu yapısının bozulmasıdır**.
""",
  [("50 amino asitten oluşan bir polipeptit sentezlenirken kaç peptit bağı kurulur ve kaç su açığa çıkar?",
    "n − 1 = 50 − 1 = **49 peptit bağı** kurulur ve **49 su** açığa çıkar.")],
  ["Amino asit: **–NH₂ + –COOH + H + R**; 20 çeşit.",
   "n amino asit → **n − 1** peptit bağı, **n − 1** su.",
   "Denatürasyon: sıcaklık/pH ile **üç boyutlu yapının bozulması**."]),

O("k9", "1.6",
  "pH ve sıcaklığın enzim aktivitesine etkisini açıklar ve deney analizini yapar.",
  "Explains the effect of pH and temperature on enzyme activity and analyses experiments.",
  r"""
# Enzimler

**Biyolojik katalizörlerdir.** Tepkimelerin **aktivasyon enerjisini düşürerek** hızlandırırlar; tepkime sonunda **harcanmazlar** ve tekrar kullanılabilirler.

### Yapısı
- Yalnızca proteinden oluşanlar: **basit enzim**.
- Protein kısım (**apoenzim**) + yardımcı kısım içerenler: **bileşik enzim (holoenzim)**.
  - Yardımcı kısım **mineralse kofaktör**, **vitaminse koenzim** adını alır.

### Özellikleri
- **Substrata özgüdürler.** Aktif bölgeye **anahtar-kilit** veya **indüklenmiş uyum** modeliyle bağlanırlar.
- Takım hâlinde çalışabilirler.

### Çalışmalarını Etkileyen Faktörler
- **Sıcaklık:** **Optimum** sıcaklıkta hız en yüksektir; çok yüksek sıcaklıkta protein yapısı bozulur (**denatüre olur**) ve enzim çalışmaz.
- **pH:** Her enzimin uygun pH aralığı vardır. **Pepsin** midede asidik ortamda (**pH 2**), **tripsin** bağırsakta bazik ortamda (**pH 8**) çalışır.
- **Enzim ve substrat miktarı:** Artış, belli bir **doygunluk** noktasına kadar tepkimeyi hızlandırır.
- **Su miktarı:** Ortamdaki su oranı **%15'in altına** düşerse enzimler çalışmaz.
""",
  [],
  ["Enzim: aktivasyon enerjisini **düşürür**, tepkimede **harcanmaz**.",
   "Kofaktör = **mineral**; koenzim = **vitamin**.",
   "Pepsin **pH 2**, tripsin **pH 8**; aşırı sıcaklık → denatürasyon.",
   "Su %15'in altında → enzim çalışmaz."]),

O("k10", "1.6",
  "Nükleik asitlerin ve vitaminlerin yapısını ve görevlerini açıklar.",
  "Explains the structure and roles of nucleic acids and vitamins.",
  r"""
# Nükleik Asitler

Genetik bilgiyi **depolayan ve aktaran** makromoleküllerdir. Yapı taşları **nükleotittir**.

**Bir nükleotit = 1 fosfat + 5 karbonlu şeker (pentoz) + azotlu organik baz**

| | **DNA** | **RNA** |
|---|---|---|
| Zincir | **Çift sarmal** | **Tek iplik** |
| Şeker | **Deoksiriboz** | **Riboz** |
| Bazlar | A, **T**, G, C | A, **U**, G, C |
| Eşleşme | A = T, G ≡ C | — |
| Görev | Hücrenin **yönetici** molekülü | **Protein sentezi** (mRNA, tRNA, rRNA) |

# Vitaminler

**Düzenleyici** organik moleküllerdir. **Sindirime uğramazlar** ve **enerji vermezler**. Enzimlerin **koenzimi** olarak görev yaparlar.

- **Yağda çözünenler (A, D, E, K):** Karaciğerde **depolanabilir**; eksiklikleri **geç** ortaya çıkar.
- **Suda çözünenler (B grubu ve C):** **Depolanmaz**, fazlası idrarla atılır; **günlük alınmalıdır**.
""",
  [],
  ["Nükleotit = **fosfat + pentoz + azotlu baz**.",
   "DNA: çift sarmal, deoksiriboz, **timin**; RNA: tek iplik, riboz, **urasil**.",
   "Vitaminler sindirilmez, enerji vermez; **A, D, E, K** yağda, **B ve C** suda çözünür."]),

O("k11", "1.7–1.8",
  "Organik bileşiklerin ayıraçlarla tayinini ve sıcaklık/pH'nin katalaz aktivitesine etkisini inceler.",
  "Identifies organic compounds with reagents and investigates how temperature/pH affect catalase.",
  r"""
# Besinlerin Belirlenmesi

| Besin | Ayıraç | Sonuç (renk) |
|---|---|---|
| **Nişasta** | İyot / Lugol çözeltisi | **Mavi-mor** |
| **Glikoz** (indirgen şeker) | Benedict veya Fehling (ısıtılarak) | **Kiremit kırmızısı** |
| **Protein** | Biüret ayıracı | **Mor** |
| **Yağ** | Sudan III / Sudan kırmızısı | **Kırmızı-turuncu** |

# Katalaz Enzimi Deneyleri

**Katalaz**, zehirli **hidrojen peroksiti (H₂O₂)** **su ve oksijene** (O₂ gazı kabarcıkları) dönüştürür.

- Uygun sıcaklık (yaklaşık **37 °C**) ve optimum pH koşullarında kabarcık çıkışı **en fazladır**.
- **Aşırı ısı** enzimi bozar; kabarcık çıkışı durur.
""",
  [("Bir besine Benedict çözeltisi eklenip ısıtıldığında kiremit kırmızısı renk oluşuyor, Biüret ile renk değişmiyor. Besin hakkında ne söylenebilir?",
    "Kiremit kırmızısı → **indirgen şeker (glikoz)** vardır. Biüret ile mor renk oluşmadığı için **protein yoktur**.")],
  ["Nişasta + iyot → **mavi-mor**; glikoz + Benedict → **kiremit kırmızısı**.",
   "Protein + Biüret → **mor**; yağ + Sudan III → **kırmızı-turuncu**.",
   "Katalaz: **H₂O₂ → su + O₂**; 37 °C'de en hızlı."]),
]))

# ---------------------------------------------------------------- 2. TEMA: ORGANİZASYON
units.append(U("u2", "2. Tema: Organizasyon", "Theme 2: Organisation", [
O("k1", "2.1",
  "Hücre alt birimlerini ve bu birimlerin işlevleri arasındaki ilişkiyi çözümleyerek açıklar.",
  "Analyses and explains cell components and how their functions are related.",
  r"""
# Hücre ve Alt Birimleri

| Yapı | Görevi |
|---|---|
| **Hücre zarı** | **Akıcı-mozaik** zar modeli; fosfolipit çift katman, kolesterol ve taşıma proteinleri. **Seçici geçirgendir.** |
| **Sitoplazma** | Hücre içi tepkimelerin gerçekleştiği, organelleri barındıran yarı akışkan sıvı. |
| **Çekirdek** | Kalıtsal materyali (**DNA**) barındırır; **nükleer porlarla** madde alışverişi. **Çekirdekçik** ribozom alt birimlerini üretir. |
| **Endoplazmik retikulum (ER)** | Madde taşınması. **Granüllü ER** ribozom taşır, **protein** sentezler; **düz ER** **lipit** sentezi ve zehirli maddelerin etkisizleştirilmesi. |
| **Golgi aygıtı** | **Paketleme ve salgılama** merkezi; glikoprotein, lipoprotein üretir, salgı kofulları oluşturur. |
| **Lizozom** | **Hücre içi sindirim**; hidrolitik enzimler içerir. Gelişmiş bitkilerde **yoktur**. |
| **Kofullar** | Besin, depo, salgı ve **kontraktil** (fazla suyu dışarı atan) kofullar. |
| **Mitokondri** | **Oksijenli solunumla ATP** üretir. Kendi **DNA, RNA ve ribozomu** vardır, bölünebilir. |
| **Kloroplast** | **Fotosentez** yapar; stroma, grana ve klorofil içerir. Kendi DNA'sı vardır. Diğer plastitler: **kromoplast** (renkli), **lökoplast** (renksiz, depo). |
| **Ribozom** | **Zarsızdır**, protein sentezler. |
| **Sentrozom** | Hayvan hücrelerinde **iğ ipliklerini** oluşturur. |
""",
  [],
  ["Hücre zarı: **akıcı-mozaik**, seçici geçirgen.",
   "Granüllü ER → **protein**; düz ER → **lipit**; Golgi → **paketleme-salgı**.",
   "Mitokondri ve kloroplast: **kendi DNA'sı** var, bölünebilir.",
   "Lizozom gelişmiş bitkilerde yok; sentrozom hayvan hücresinde."]),

O("k2", "2.2–2.3",
  "Hücre zarından madde geçişlerini sınıflandırır ve pasif geçiş deneylerini yorumlar.",
  "Classifies transport across the cell membrane and interprets passive transport experiments.",
  r"""
# Hücre Zarından Madde Geçişleri

| | **Pasif taşıma** | **Aktif taşıma** |
|---|---|---|
| Enerji | Harcanmaz | **ATP harcanır** |
| Yön | **Çoktan aza** | **Azdan çoğa** |

### Pasif Taşıma Çeşitleri
- **Basit difüzyon:** Küçük, gaz ve yağda çözünen moleküllerin fosfolipit tabakasından doğrudan geçişi.
- **Kolaylaştırılmış difüzyon:** Büyük veya polar moleküllerin (glikoz, amino asit) **taşıyıcı ve kanal proteinleri** yardımıyla çoktan aza geçişi (ATP harcanmaz).
- **Ozmoz:** **Suyun** seçici geçirgen zardan **çözünen madde yoğunluğunun fazla olduğu** (suyun az olduğu) tarafa doğru geçişi.

### Ortam Çeşitleri
- **İzotonik:** Hücreyle aynı yoğunlukta; **net su geçişi olmaz**.
- **Hipertonik:** Hücreden daha yoğun; hücre su kaybederek büzüşür (**plazmoliz**).
- **Hipotonik:** Hücreden az yoğun; hücre su alarak şişer (bitki hücresi **turgor** olur, hayvan hücresi patlayabilir — **hemoliz**).

### Aktif Taşıma ve Kütlesel Geçişler
- Küçük moleküllerin **azdan çoğa** taşınması (ATP ve taşıyıcı protein şart).
- Büyük moleküllerin hücre içine alınması **endositoz** (fagositoz ve pinositoz), dışarı atılması **ekzositoz**.
""",
  [("Bir bitki hücresi tuzlu suya konulursa ne gözlenir?",
    "Tuzlu su **hipertonik** ortamdır. Hücre ozmozla su kaybeder ve sitoplazması büzüşür → **plazmoliz**.")],
  ["Pasif: enerji yok, **çoktan aza**; aktif: **ATP**, **azdan çoğa**.",
   "Hipertonik → **plazmoliz**; hipotonik → **turgor** (hayvan hücresinde hemoliz).",
   "Büyük molekül içeri **endositoz**, dışarı **ekzositoz**."]),

O("k3", "2.4",
  "Canlıları sınıflandırma ölçütlerine göre sınıflandırır ve ikili adlandırma kuralını uygular.",
  "Classifies organisms using classification criteria and applies binomial nomenclature.",
  r"""
# Sınıflandırma ve İkili Adlandırma

Sınıflandırma bilimine **taksonomi** denir. Günümüzde akrabalık ilişkilerini esas alan **doğal (filogenetik) sınıflandırma** kullanılır.

### İkili Adlandırma (Binominal Nomenklatür)
Tür adları **iki kelimeden** oluşur ve **italik** yazılır. Örnek: *Pinus nigra* (karaçam).
- **Birinci kelime cins adıdır**, ilk harfi **büyük** yazılır.
- **İkinci kelime tamamlayıcı addır**, **küçük** harfle yazılır. İkisi birlikte tür adını belirtir.

### Taksonomik Basamaklar (Genelden Özele)
**Âlem → Şube → Sınıf → Takım → Aile (Familya) → Cins → Tür**

- Âlemden türe gidildikçe **birey sayısı azalır**, **ortak özellik ve gen benzerliği artar**.
""",
  [("*Felis catus* (kedi) ve *Felis silvestris* (yaban kedisi) hakkında ne söylenebilir?",
    "İkisinin cins adı aynıdır (*Felis*) → **aynı cinste** yer alırlar; tamamlayıcı adları farklı olduğu için **farklı türlerdir**.")],
  ["Tür adı: **Cins** (büyük harf) + **tamamlayıcı ad** (küçük harf), italik.",
   "Âlem → Şube → Sınıf → Takım → Aile → Cins → **Tür**.",
   "Türe doğru: birey sayısı **azalır**, benzerlik **artar**."]),

O("k4", "2.5",
  "Canlıların üst âlemlerde gruplandırılmasına neden olan özellikleri ile ilgili çıkarım yapar.",
  "Makes inferences about the features used to group organisms into domains.",
  r"""
# Üç Üst Âlem (Domain) Sistemi

Canlılar hücresel yapı ve moleküler verilere göre **üç domainde** incelenir: **Bakteriler, Arkeler ve Ökaryotlar**.

- **Bakteriler ve arkeler prokaryottur.**
  - Bakterilerin hücre duvarı **peptidoglikan** içerir.
  - **Arkeler** sıcak su kaynakları, tuzlalar gibi **ekstrem** koşullarda yaşayabilir; genetik olarak ökaryotlara yakın özellikleri vardır.

### Ökaryotlar Âlemleri
| Âlem | Özellikler | Örnekler |
|---|---|---|
| **Protista** | Tek veya çok hücreli ökaryotlar | Amip, öglena, paramesyum, algler |
| **Mantarlar** | **Kitin** hücre duvarı, heterotrof (**çürükçül**) | Şapkalı mantar, maya mantarı |
| **Bitkiler** | **Selüloz** hücre duvarı, kloroplast, fotosentez | Damarlı/damarsız, tohumlu/tohumsuz |
| **Hayvanlar** | Hücre duvarı **yok**, holozoik beslenme | Omurgasızlar; omurgalılar (balık, amfibi, sürüngen, kuş, memeli) |
""",
  [],
  ["Üç domain: **Bakteriler, Arkeler, Ökaryotlar**.",
   "Bakteri duvarı **peptidoglikan**; arkeler **ekstrem** ortamlarda.",
   "Mantar duvarı **kitin**, bitki duvarı **selüloz**, hayvanda hücre duvarı yok."]),

O("k5", "2.6",
  "Biyoçeşitliliği oluşturan unsurlar hakkında bilimsel çıkarım yapar ve Türkiye'nin biyoçeşitliliğini yorumlar.",
  "Makes inferences about the components of biodiversity and interprets Türkiye's biodiversity.",
  r"""
# Biyoçeşitlilik

Biyoçeşitlilik üç düzeyde incelenir: **genetik çeşitlilik, tür çeşitliliği ve ekosistem çeşitliliği**.

- **Endemik tür:** Dünyada **yalnızca belirli bir bölgede** yaşayan/yetişen yerli türlerdir (Ankara çiğdemi, Van ters lalesi, Akdeniz foku).
- **Türkiye'nin önemi:** Anadolu **üç farklı bitki coğrafyasının** kesişim noktasındadır. İklim çeşitliliği, yer şekilleri ve kıtalar arası köprü konumu nedeniyle bitki ve hayvan türleri bakımından çok zengindir.
- **Nuh'un Gemisi Ulusal Biyolojik Çeşitlilik Veri Tabanı:** Ülkemizdeki bitki ve hayvan envanterinin kayıt altına alındığı ve izlendiği ulusal sistemdir.
""",
  [],
  ["Biyoçeşitlilik: **genetik, tür, ekosistem** çeşitliliği.",
   "Endemik = yalnızca o bölgeye özgü (Ankara çiğdemi, Van ters lalesi).",
   "Türkiye **üç bitki coğrafyasının** kesişiminde; veri tabanı: **Nuh'un Gemisi**."]),
]))

from _ek135 import uygula135  # noqa: E402
uygula135(units, "biy")

write("biy-9.js", "9/biyoloji", "9. Sınıf Biyoloji — kazanım odaklı konu anlatım notları",
      "kullanıcının verdiği \"9. Sınıf Biyoloji Kazanım Odaklı Eksiksiz Konu Anlatım Notları\" (2 tema).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Kaynaktaki küçük yazım hataları düzeltildi; örnek soruların bir kısmı eklendi.")
