# -*- coding: utf-8 -*-
"""10. Sınıf Biyoloji Detaylı Konu Anlatım Notları → js/data/content/biy-10.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema: Enerji", "Theme 1: Energy", [
O("k1", "1.1", "Canlılık için enerjinin önemi ve ATP", "The importance of energy for life and ATP", r"""
# Enerji ve Canlılık

Enerji, **iş yapabilme** ya da bir değişikliğe neden olma kapasitesidir. Hareket, üreme, büyüme, doku onarımı, vücut ısısının korunması, sinirsel iletim ve aktif taşıma gibi yaşamsal faaliyetler için **sürekli enerji** gerekir; bu enerji **besinlerden** karşılanır.

- Enerji yok olmaz, **bir formdan diğerine dönüşür** (enerjinin korunumu).
- Bitkilerde **ışık enerjisi → kimyasal enerji** (besinlerin bağları); tüketicilerde bu enerji besin zinciriyle aktarılır.
- Tüm canlılarda besinlerdeki kimyasal enerji sonunda **ATP**'ye dönüştürülerek kullanılır.
- Kış uykusundaki hayvanlar (ayı, yarasa, kirpi) depoladıkları besinlerin enerjisiyle hayatta kalır.

# ATP (Adenozin Trifosfat)

| Özellik | Açıklama |
|---|---|
| **Yapısı** | **Adenin** (azotlu baz) + **riboz** (şeker) + **3 fosfat** |
| **Bağlar** | Adenin–riboz: glikozit · riboz–fosfat: ester · fosfatlar arası: **yüksek enerjili fosfat bağları** |
| **Taşınma** | Hücre zarından **geçemez**; her hücre kendi ATP'sini üretir |
| **Depolanma** | **Depolanmaz**; anlık üretilip tüketilir |

Adenin + riboz = **adenozin** → +P = **AMP** → +P = **ADP** → +P = **ATP**

$$ADP + P_i + \text{enerji} \rightleftharpoons ATP + H_2O$$
- **Fosforilasyon:** ADP'ye fosfat eklenerek ATP sentezi (su açığa çıkar).
- **Defosforilasyon (hidroliz):** ATP → ADP + $P_i$ + enerji.

### ATP döngüsü
Yıkım tepkimeleri çoğunlukla **ekzergonik** (enerji verir), yapım tepkimeleri **endergonik** (enerji ister). ATP, enerjiyi ekzergonik tepkimelerden endergoniklere taşır; sinirsel iletim, kas kasılması, aktif taşımada kullanılır.
""",
  [("ATP neden bir hücreden diğerine aktarılamaz ve neden depolanmaz?",
    "ATP hücre zarından **geçemeyecek** büyüklükte ve yüklü bir moleküldür; bu yüzden her hücre kendi ATP'sini sentezler. Kararsız yüksek enerjili bağlar içerdiği için **anlık** üretilip tüketilir; uzun süreli depo yağ ve glikojen/nişastadır.")],
  ["ATP = adenin + riboz + 3 fosfat.", "Fosforilasyon: ADP + Pi → ATP (+ su); defosforilasyon tersi.", "ATP zardan geçmez, depolanmaz."]),

O("k2", "1.2", "Fotosentez: pigmentler, ışıklı tepkimeler ve Calvin döngüsü", "Photosynthesis: pigments, light reactions and the Calvin cycle", r"""
# Fotosentez

Klorofil taşıyan canlılarda **ışık enerjisiyle inorganik maddelerden organik madde** sentezlenmesidir. Bitkiler (tam parazitler hariç), algler, öglena, siyanobakteriler, mor kükürt bakterileri fotosentez yapar (**fotoototrof**). Ekosistemlerde besin ve enerji akışının temelidir.

# Işık ve Pigmentler

- Işık **foton**lardan oluşur; dalga boyu kısaldıkça **enerjisi artar**. Görünür ışık 380–750 nm.
- Bir cismin rengi **yansıttığı** dalga boyudur.
- **Klorofil**: mor, mavi ve kırmızı ışığı çok soğurur; **yeşili yansıtır** → yapraklar yeşil.
- **Yardımcı pigmentler** (karoten, ksantofil, likopen) farklı dalga boylarını soğurup klorofile aktarır ve klorofili fazla ışıktan korur.

# 1. Işığın Kullanıldığı Tepkimeler

**Yeri:** kloroplastın **granumları** (prokaryotlarda içe katlanmış zar).
- Işık klorofili uyarır; klorofil yüksek enerjili elektron kaybeder → elektronlar **ETS**'ye geçer, enerjileriyle **ATP** sentezlenir.
- **Fotoliz:** $H_2O \xrightarrow{ışık} 2e^- + 2H^+ + \frac12 O_2$
- Klorofilin kaybettiği elektronlar sudan karşılanır; $H^+$'lar **$NADP^+$** tarafından tutularak **NADPH** oluşur; $O_2$ atmosfere verilir.

# 2. Işığın Kullanılmadığı Tepkimeler (Calvin Döngüsü)

**Yeri:** kloroplastın **stroması**.
- Işık doğrudan gerekmez ama ışıklı evrenin **ATP ve NADPH**'ı gerekir; **enzimlerle** yürür (yüksek sıcaklıkta yavaşlar).
- $CO_2$ indirgenir → 3 karbonlu **PGAL** → glikoz ve diğer organik maddeler (yağ asidi, amino asit, vitamin…).
- Açığa çıkan $NADP^+$, ADP ve $P_i$ granuma döner. Fazla glikoz **nişasta** olarak depolanır.

| | Işıklı tepkimeler | Calvin döngüsü |
|---|---|---|
| Yer | Granum (tilakoit) | Stroma |
| Kullanılan | Işık, $H_2O$, ADP, $NADP^+$ | $CO_2$, ATP, NADPH |
| Üretilen | ATP, NADPH, $O_2$ | Glikoz (PGAL), ADP, $NADP^+$ |
""",
  [("Fotosentezde açığa çıkan oksijen hangi molekülden gelir? Nasıl kanıtlanmıştır?",
    "**Sudan** (fotoliz). Robert Hill ve sonraki araştırmacılar ağır oksijen izotopuyla işaretlenmiş su kullanınca işaretli oksijenin açığa çıktığını göstermiştir."),
   ("Calvin döngüsü neden \"ışıktan bağımsız\" ama yine de karanlıkta uzun süre devam edemez?",
    "Işığı doğrudan kullanmaz ama ışıklı evrede üretilen **ATP ve NADPH**'a ihtiyaç duyar; bunlar tükenince döngü durur.")],
  ["Klorofil mor-mavi-kırmızıyı soğurur, yeşili yansıtır.", "Işıklı evre granumda: fotoliz, ATP, NADPH, $O_2$.", "Calvin stromada: $CO_2$ → PGAL → glikoz."]),

O("k3", "1.3", "Fotosentez hızını etkileyen faktörler", "Factors affecting the rate of photosynthesis", r"""
# Minimum Kuralı

Fotosentez hızı birçok faktöre bağlıdır; **miktarı en az olan faktör** hızı belirler.

| Faktör | Etkisi |
|---|---|
| **Işık şiddeti** | Işıksız fotosentez olmaz; şiddet arttıkça hız artar, bir noktadan sonra **sabitlenir** (başka faktör sınırlar) |
| **Işığın dalga boyu** | Mor, mavi, kırmızıda en hızlı; **yeşilde en düşük**; kızılötesi, morötesi, X ışınında sıfır |
| **$CO_2$ miktarı** | Havada ≈ %0,03; arttıkça hız belli bir değere kadar artar. $KOH$, $NaOH$, $Ca(OH)_2$ gibi $CO_2$ tutucular hızı düşürür |
| **Sıcaklık** | Enzimler nedeniyle optimum ≈ 33 °C; 35 °C üstünde enzimler bozulur, hız düşer |
| **Su** | $O_2$, elektron ve $H$ kaynağı; azalırsa hız düşer |
| **Mineraller** | **Mg** (klorofil yapısı), **Fe** (klorofil sentezi, ETS), **P** (ATP, nükleik asit), **N** (amino asit, nükleik asit) |
| **pH** | Enzimlerin çalıştığı aralık; asit yağmurları olumsuz etkiler |

### Engelmann deneyi (1883)
İpliksi alge prizmadan ışık düşürüldüğünde oksijen arayan bakteriler en çok **mor-mavi ve kırmızı** ışık alan bölgelerde kümelenmiştir → klorofil bu dalga boylarını kullanır.
""",
  [("Işık şiddeti artırıldığı hâlde fotosentez hızı artmıyorsa sebebi ne olabilir?",
    "Minimum kuralı: başka bir faktör (ör. **$CO_2$** ya da **sıcaklık**) sınırlayıcı olmuştur. O faktör artırılmadıkça hız artmaz.")],
  ["En az bulunan faktör hızı belirler (minimum kuralı).", "Yeşil ışıkta hız en düşük.", "Mg klorofilin yapısında; optimum sıcaklık ≈ 33 °C."]),

O("k4", "1.4", "Fotosentezde kullanılan ve üretilen maddeler", "Substances used and produced in photosynthesis", r"""
# Genel Denklem

$$6CO_2 + 12H_2O \xrightarrow{ışık,\ klorofil} C_6H_{12}O_6 + 6O_2 + 6H_2O$$
Sadeleştirilmiş: $6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2$

- **$CO_2$ tek karbon kaynağıdır.**
- **Hidrojen kaynağı:** bitki, alg, öglena, siyanobakteride **$H_2O$**; mor kükürt bakterilerinde **$H_2S$** (yan ürün kükürt, $O_2$ çıkmaz).
- Oksijenin kaynağı **sudur** (Hill).

# Tarihsel Çalışmalar

| Bilim insanı | Bulgu |
|---|---|
| **van Helmont** | Bitkinin kütle artışının (yanlış olarak) yalnızca sudan geldiği |
| **Priestley** | Bitkilerin havayı "düzelttiği", oksijen verdiği |
| **Ingenhousz** | Işığın ve **yeşil kısımların** gerekli olduğu |
| **Robert Hill** | Oksijenin kaynağının **su** olduğu |
| **Melvin Calvin** | Karbonun izlediği yol — Calvin döngüsü (1961 Nobel) |

### Deney fikri
Yaprak ışıkta bırakılıp iyot çözeltisiyle test edilirse **nişasta** (mavi-mor renk) görülür; karanlıkta tutulan ya da alüminyumla kapatılan kısımda görülmez.
""",
  [("Mor kükürt bakterileri fotosentez yaparken neden oksijen üretmez?",
    "Hidrojen kaynağı olarak su yerine **$H_2S$** kullanırlar; yan ürün olarak oksijen değil **kükürt** oluşur.")],
  ["$CO_2$ tek karbon kaynağı; $O_2$ sudan gelir.", "Mor kükürt bakterileri $H_2S$ kullanır.", "Iyot testi ile nişasta gösterilir."]),

O("k5", "1.5", "Kemosentez", "Chemosynthesis", r"""
# Işıksız Besin Sentezi

Bazı **prokaryotlar** inorganik maddeleri **oksitleyerek** açığa çıkan kimyasal enerjiyle $CO_2$ ve $H_2O$'dan organik madde sentezler. Bu canlılara **kemoototrof** denir.

- Oksitlenen maddeler: $H_2S$, $H_2$, $NH_3$, nitrit ($NO_2^-$), $Fe^{2+}$, kükürt.
- Yaşadıkları yerler: derin deniz **hidrotermal bacaları** (çevresinde karides, yengeç, midye ekosistemleri), bataklık dipleri, çöplükler, lağım çamuru.
- Bulundukları ekosistemin **üreticisi**dirler.
- Klorofil yoktur, ışık kullanmazlar → **gece-gündüz** her zaman gerçekleşebilir.

| | Fotosentez | Kemosentez |
|---|---|---|
| Enerji kaynağı | Işık | İnorganik maddelerin oksidasyonu |
| Klorofil | Var | Yok |
| Canlılar | Bitki, alg, bazı bakteriler | Yalnızca bazı prokaryotlar |
""",
  [("Güneş ışığı ulaşmayan derin okyanus tabanında nasıl bir ekosistem kurulabilir?",
    "Hidrotermal bacalardaki **kemosentetik bakteriler** $H_2S$ gibi maddeleri oksitleyerek organik madde üretir; üretici oldukları için onlarla beslenen karides, yengeç ve midyeler yaşayabilir.")],
  ["Kemosentez: kimyasal enerjiyle organik madde sentezi.", "Yalnız prokaryotlar; ışık ve klorofil gerekmez.", "Hidrotermal baca ekosistemlerinin üreticisi."]),

O("k6", "1.6", "Sindirim çeşitleri ve canlılarda sindirim yapıları", "Types of digestion and digestive structures", r"""
# Sindirim

Besinlerin hücrenin kullanabileceği **monomerlere** parçalanmasıdır.

| Hücre içi sindirim | Hücre dışı sindirim |
|---|---|
| Hücre içinde, genellikle **lizozomlarda** | Hücre dışında, **sindirim kanalı/boşluğunda** enzimlerle |
| Protistler, süngerler | Çoğu hayvan |

# Beslenmeye Göre Adaptasyonlar

| Yapı | Etçil | Otçul |
|---|---|---|
| **Dişler** | Kesici ve **köpek dişleri** gelişmiş | **Azı dişleri** geniş, öğütmeye uygun |
| **Mide** | Tek bölmeli, genişleyebilir (köpek) | Geviş getirenlerde **4 bölmeli**: işkembe, börkenek, kırkbayır, şirden |
| **Bağırsak** | Kısa | Uzun |

> Geviş getirenlerin midesindeki **simbiyotik mikroorganizmalar** selülozu sindiren enzimleri üretir.
""",
  [("Koyun selülozu nasıl sindirebilir?", "Kendisi selüloz sindiren enzim üretmez; dört bölmeli midesindeki **mikroorganizmaların** ürettiği enzimler sayesinde (mutualizm) sindirir.")],
  ["Hücre içi (lizozom) / hücre dışı (sindirim kanalı).", "Etçil: köpek dişi; otçul: geniş azı dişi.", "Geviş getirenlerde 4 bölmeli mide ve mikroorganizmalar."]),

O("k7", "1.7", "İnsanda sindirim, emilim ve taşınma", "Digestion, absorption and transport in humans", r"""
# İnsan Sindirim Sistemi

**Sindirim kanalı:** ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs

**Yardımcı organlar:**
| Organ | Görevi |
|---|---|
| Tükürük bezleri | **Amilaz** (nişasta sindirimi başlar) |
| Karaciğer | **Safra** üretir (yağları emülsiyonlaştırır, enzim değildir) |
| Safra kesesi | Safrayı depolar |
| Pankreas | Sindirim enzimleri + **bikarbonat** |

# Bölümlere Göre Sindirim

| Bölüm | Olay |
|---|---|
| **Ağız** | Mekanik (çiğneme) + kimyasal (amilaz → nişasta) |
| **Mide** | Asidik ortam, **pepsin** → protein sindirimi başlar |
| **İnce bağırsak** | Karbonhidrat, protein ve yağ sindirimi **tamamlanır**; **villus ve mikrovilluslarla** emilim |
| **Kalın bağırsak** | **Su** ve bazı vitaminlerin emilimi, dışkı oluşumu |

# Emilim ve Taşınma

Monomerler (glikoz, amino asit, yağ asidi, gliserol) ince bağırsaktan **kana veya lenfe** geçer, dolaşımla hücrelere taşınır ve **hücresel solunumla** ATP'ye dönüşür.

> Sindirim → emilim → taşıma → hücresel solunum zincirinin bir halkası aksarsa enerji üretimi bozulur.
""",
  [("Safra salgısı bir enzim midir? Yağ sindirimine katkısı nedir?",
    "Hayır, safra **enzim değildir**. Yağları küçük damlacıklara ayırır (**emülsiyon**); böylece lipaz enziminin etki yüzeyi artar.")],
  ["Nişasta ağızda, protein midede başlar; hepsi ince bağırsakta biter.", "Emilim villus ve mikrovilluslarla artar.", "Kalın bağırsakta su emilir."]),

O("k8", "1.8", "Hücresel solunum", "Cellular respiration", r"""
# Hücresel Solunum

Besinlerdeki kimyasal enerjinin **ATP**'ye dönüştürülmesi.

# Oksijenli Solunum

| Evre | Yeri | Ürünler |
|---|---|---|
| **1. Glikoliz** | Sitoplazma | Glikoz → **2 pirüvat**; net **2 ATP**, 2 NADH. Oksijen gerekmez, tüm canlılarda ortak |
| **2. Krebs (sitrik asit) döngüsü** | Mitokondri **matriksi** | Pirüvat → asetil-CoA ($CO_2$ + NADH); döngüde $CO_2$, NADH, $FADH_2$, ATP |
| **3. ETS** | Mitokondri **iç zarı** | NADH ve $FADH_2$'nin elektronları taşınır; **oksidatif fosforilasyon** ile çok sayıda ATP |

- **Son elektron alıcısı oksijendir**: $O_2 + H^+ + e^- \rightarrow H_2O$
- Toplam net verim ≈ **30–32 ATP** / glikoz.

$$C_6H_{12}O_6 + 6O_2 \rightarrow 6CO_2 + 6H_2O + \text{ATP}$$

# Oksijensiz Solunum

Bazı prokaryotlarda son elektron alıcısı **nitrat, sülfat** gibi inorganik maddelerdir. ETS kısmen çalışır; ATP verimi oksijenliden **düşüktür**.
""",
  [("ETS'de oksijen olmasa ne olur?", "Son elektron alıcısı olmadığı için elektron akışı durur, NADH yeniden $NAD^+$'ya dönüşemez; Krebs ve ETS durur. Hücre (uygunsa) fermantasyona geçer."),
   ("Glikozdaki karbon atomları oksijenli solunumda hangi molekülle dışarı atılır?", "**$CO_2$** ile (pirüvatın asetil-CoA'ya dönüşmesinde ve Krebs döngüsünde).")],
  ["Glikoliz (sitoplazma) → Krebs (matriks) → ETS (iç zar).", "Son elektron alıcısı $O_2$ → su.", "Net ≈ 30–32 ATP."]),

O("k9", "1.9", "Besinlerin solunuma katılma yolları ve enerji-metabolizma ilişkisi", "How nutrients enter respiration; energy and metabolism", r"""
# Besinlerin Solunuma Katılması

| Besin | Yol |
|---|---|
| **Karbonhidrat** | Glikoz doğrudan **glikolize**; fruktoz, galaktoz glikoliz ara ürünlerine dönüşür |
| **Yağ** | **Gliserol** glikoliz ara ürününe dönüşür; **yağ asitleri** beta-oksidasyonla **asetil-CoA** olur → Krebs |
| **Protein** | Amino asitler **deaminasyon** (amino grubu ayrılır) sonrası pirüvat, asetil-CoA, Krebs ara ürünlerine dönüşür |

> Enerji için öncelik **karbonhidrat**, sonra **yağ**, en son **protein** (proteinlerin öncelikli görevi yapı ve işlevdir).

# Enerji ve Metabolizma

**Metabolizma = anabolizma (yapım, endergonik) + katabolizma (yıkım, ekzergonik)**. ATP, yıkımdan elde edilen enerjiyi yapım tepkimelerine aktarır.

| Besin (1 g) | Enerji |
|---|---|
| Karbonhidrat | ≈ 4 kcal (17 kJ) |
| Protein | ≈ 4 kcal (17 kJ) |
| Yağ | ≈ **9 kcal** (38 kJ) |

Yağlar en yüksek enerji yoğunluğuna sahiptir → uzun süreli depo. Dengesiz beslenme obezite, diyabet, malnütrisyon gibi sorunlara yol açabilir.
""",
  [("Bir öğrenci günde 300 g karbonhidrat, 80 g protein, 70 g yağ alıyor. Yaklaşık kaç kcal enerji alır?",
    "$300\\cdot4 + 80\\cdot4 + 70\\cdot9 = 1200 + 320 + 630 = 2150$ kcal.")],
  ["Yağ asitleri → asetil-CoA → Krebs.", "Amino asitler önce deaminasyon.", "Yağ 9 kcal/g; karbonhidrat ve protein 4 kcal/g."]),

O("k10", "1.10", "Fermantasyon", "Fermentation", r"""
# Fermantasyon

Oksijen yokluğunda glikolizden sonra pirüvatın tam oksitlenmeden dönüştürülmesidir.
- **Krebs ve ETS çalışmaz.**
- Amaç: **$NAD^+$'yı yenileyip glikolizin sürmesini** sağlamak.
- Net kazanç yalnızca glikolizin **2 ATP**'si.

| | Etil alkol fermantasyonu | Laktik asit fermantasyonu |
|---|---|---|
| **Canlılar** | Maya mantarları, bazı bitki hücreleri | Omurgalı kas hücreleri (yoğun egzersiz), *Lactobacillus* gibi bakteriler |
| **Ürün** | Pirüvat → asetaldehit (**$CO_2$ çıkar**) → **etil alkol** | Pirüvat → **laktik asit** ($CO_2$ çıkmaz) |
| **Kullanım** | Ekmek mayalanması (CO₂ kabartır), bira, şarap | Yoğurt, kefir, turşu, peynir |

> Kaslarda biriken laktik asit yorgunluk ve ağrı hissine katkıda bulunur.
""",
  [("Mayalı hamur sıcak ortamda neden kabarır?", "Maya mantarları **etil alkol fermantasyonu** yapar; açığa çıkan **$CO_2$** gazı hamuru kabartır. Sıcaklık enzimleri hızlandırır.")],
  ["Fermantasyon: oksijensiz, net 2 ATP.", "Etil alkol: maya, $CO_2$ çıkar.", "Laktik asit: kas ve yoğurt bakterileri, $CO_2$ çıkmaz."]),
]),
U("u2", "2. Tema: Ekoloji", "Theme 2: Ecology", [
O("k1", "2.1", "Ekosistemin cansız ve canlı bileşenleri", "Abiotic and biotic components of an ecosystem", r"""
# Ekoloji ve Ekosistem

**Ekoloji:** canlıların birbirleri ve çevreleriyle ilişkilerini inceler. **Ekosistem:** bir bölgedeki canlıların tamamı + etkileşimde oldukları cansız çevre.

# Cansız (Abiyotik) Bileşenler

| Bileşen | Etkisi / örnek |
|---|---|
| **Işık** | Fotosentez; ışık süresi (fotoperiyot) çiçeklenme, göç, kış uykusu, üremeyi etkiler |
| **Sıcaklık** | Enzim ve protein işleyişi; çöl tilkisi büyük kulaklı, kutup tilkisi küçük kulaklı |
| **Su** | Taşıma, sindirim, fotosentez, ısı düzenleme; sarı sabır su depolar, kanguru sıçanı kuru tohumlarla yaşar |
| **Toprak** | Humus, mineraller, su, hava; bitkiler tutunur, köstebek ve solucan barınır |
| **pH** | Her canlının optimum pH'ı vardır; kirlilik ve asit yağmurları değiştirir |

# Canlı (Biyotik) Bileşenler

| Grup | Açıklama |
|---|---|
| **Üreticiler** (ototrof) | Fotosentez/kemosentezle organik madde üretir; besin zincirinin ilk halkası |
| **Tüketiciler** (heterotrof) | Otçul, etçil, hepçil |
| **Ayrıştırıcılar** (saprotrof) | Bakteri ve mantarlar; ölü organik maddeyi inorganik maddeye çevirir, madde döngüsünü sağlar |

> Ayrıştırıcılar olmasaydı organik madde birikir, üreticiler mineral bulamaz ve ekosistem çökerdi.
""",
  [("Bir ekosistemden tüm ayrıştırıcılar kaldırılırsa uzun vadede ne olur?",
    "Ölü canlılar ve atıklar ayrışmaz; **mineraller toprağa dönmez**, üreticiler besin üretemez ve zincir boyunca ekosistem çöker.")],
  ["Abiyotik: ışık, sıcaklık, su, toprak, pH.", "Biyotik: üretici, tüketici, ayrıştırıcı.", "Ayrıştırıcılar madde döngüsünü sağlar."]),

O("k2", "2.2", "Popülasyon dinamikleri ve komünitedeki etkileşimler", "Population dynamics and community interactions", r"""
# Organizasyon Düzeyleri

organizma → **popülasyon** (aynı türün bir alandaki bireyleri) → **komünite** (aynı alandaki farklı popülasyonlar) → ekosistem → biyosfer

# Popülasyon Dinamikleri

| Kavram | Açıklama |
|---|---|
| **Yoğunluk** | Birim alan/hacimdeki birey sayısı |
| **Büyüklük değişimi** | (doğum + içe göç) − (ölüm + dışa göç) |
| **Taşıma kapasitesi** | Ortamın destekleyebileceği en fazla birey sayısı |
| **Çevre direnci** | Artışı sınırlayan faktörler: kaynak yetersizliği, hastalık, parazit, rekabet, avcılık, iklim |

# Komünitedeki Etkileşimler

| Etkileşim | Taraflar | Örnek |
|---|---|---|
| **Rekabet** | (−/−) | Aynı besin, alan, ışık için |
| **Av–avcı** | (+/−) | Avcı artınca av azalır, sonra avcı da azalır (salınımlı denge) |
| **Mutualizm** | (+/+) | Baklagil–*Rhizobium*, liken |
| **Kommensalizm** | (+/0) | Köpekbalığı–remora |
| **Parazitizm** | (+/−) | Tenya, uyuz paraziti |

# Süksesyon

Bir komünitenin zamanla başka bir komüniteye dönüşmesi.
- **Primer:** Hiç canlı olmayan alanda (kaya, soğumuş lav) başlar; öncü canlılar likenlerdir.
- **Sekonder:** Önceden canlı olan bozulmuş alanda (yangın sonrası **kızılçam ormanı**; eski biyokütleye 20–25 yılda ulaşabilir).
""",
  [("Bir popülasyonda yılda 120 doğum, 40 içe göç, 90 ölüm ve 30 dışa göç oluyor. Popülasyon nasıl değişir?",
    "$(120 + 40) - (90 + 30) = 40$ → **40 birey artar**."),
   ("Lav akıntısının kapladığı adada başlayan süksesyon hangi türdür?", "Önceden canlı ve toprak olmadığı için **primer süksesyon**.")],
  ["Değişim = (doğum + içe göç) − (ölüm + dışa göç).", "Mutualizm +/+, kommensalizm +/0, parazitizm +/−.", "Primer süksesyon cansız alanda, sekonder bozulmuş alanda."]),

O("k3", "2.3", "Ekosistemde madde ve enerji akışı", "Matter and energy flow in ecosystems", r"""
# Enerji Tek Yönlü, Madde Döngüsel

**Güneş → üreticiler → tüketiciler**; her basamakta enerji **ısı olarak kaybolur**. Madde ise ayrıştırıcılar sayesinde **geri döner**.

| Kavram | Açıklama |
|---|---|
| **Besin zinciri** | Üreticiden tüketicilere doğrusal ilişki; her basamak bir **trofik düzey** |
| **Besin ağı** | Kesişen zincirler; doğayı daha iyi yansıtır |
| **Biyokütle piramidi** | Her düzeydeki toplam canlı kütlesi |
| **Enerji piramidi** | Her basamakta ≈ **%10** enerji aktarılır, %90 ısıyla kaybolur → her zaman tepeye doğru daralır; en fazla 4–5 trofik düzey |

# Biyolojik Birikim

**Ağır metaller, DDT** gibi parçalanmayan zehirli maddeler besin zincirinde **üst basamaklara doğru artan** derişimde birikir. En çok **tepe avcılar** etkilenir (yumurta kabuğu incelmesi, üreme bozuklukları).
""",
  [("Üreticilerin 10 000 kJ enerjisi varsa 3. trofik düzeye (ikincil tüketici) yaklaşık ne kadar ulaşır?",
    "Üretici → birincil tüketici: 1000 kJ → ikincil tüketici: **100 kJ** (%10 kuralı)."),
   ("DDT'nin en yüksek derişimi neden kartallarda ölçülür?", "DDT parçalanmaz ve yağ dokusunda birikir; her basamakta çok sayıda canlı tüketildiği için derişim **tepe avcıda** en yüksektir (biyolojik birikim).")],
  ["Enerji tek yönlü akar, madde döngüseldir.", "Her basamakta ≈ %10 enerji aktarılır.", "Biyolojik birikim tepe avcıyı en çok etkiler."]),

O("k4", "2.4", "Madde döngüleri: su, karbon, azot", "Biogeochemical cycles: water, carbon, nitrogen", r"""
# Su Döngüsü

**Buharlaşma** (okyanus, göl, toprak) + **terleme** (bitkiler) → **yoğuşma** (bulut) → **yağış** → yüzey akışı ve yeraltı suyu. Döngüyü **Güneş enerjisi** sürdürür.

# Karbon Döngüsü

- **Fotosentez:** atmosferdeki $CO_2$ organik maddeye bağlanır.
- **Solunum, yanma, ayrışma:** $CO_2$ atmosfere döner.
- **Okyanuslar** büyük karbon yutağıdır.
- Fosil yakıt kullanımı ve **ormansızlaşma** atmosferik $CO_2$'yi artırır → iklim değişikliği.

# Azot Döngüsü

| Basamak | Ne olur? | Canlı |
|---|---|---|
| **Fiksasyon (bağlama)** | $N_2$ → amonyum/nitrat | *Rhizobium*, *Azotobacter*, yıldırım |
| **Amonifikasyon** | Organik azot → amonyak | Ayrıştırıcılar |
| **Nitrifikasyon** | Amonyum → nitrit → **nitrat** | Nitrifikasyon bakterileri |
| **Özümleme** | Bitkiler nitrat/amonyum alır → protein, nükleik asit | Bitkiler |
| **Denitrifikasyon** | Nitrat → $N_2$ (atmosfere) | Denitrifikasyon bakterileri |

> Canlılar atmosferdeki $N_2$'yi doğrudan kullanamaz; bağlanması gerekir.
""",
  [("Baklagiller neden toprağı azotça zenginleştirir?", "Köklerindeki nodüllerde yaşayan **Rhizobium** bakterileri atmosferdeki $N_2$'yi bağlayarak bitkinin kullanabileceği forma çevirir (mutualizm).")],
  ["Su döngüsünü Güneş sürdürür.", "Karbon: fotosentezle bağlanır; solunum, yanma, ayrışmayla döner.", "Azot: fiksasyon → nitrifikasyon → özümleme → denitrifikasyon."]),

O("k5", "2.5", "Ekolojik sürdürülebilirlik ve onu kısıtlayan durumlar", "Ecological sustainability and threats to it", r"""
# Ekolojik Sürdürülebilirlik

Doğal kaynakların ve **ekosistem hizmetlerinin** (temiz hava, su, toprak, iklim düzenleme, tozlaşma, besin üretimi) gelecek nesillerin de ihtiyaçlarını karşılayacak biçimde kullanılması ve korunması.

# Sürdürülebilirliği Kısıtlayan Durumlar

| Sorun | Neden / sonuç |
|---|---|
| **Habitat kaybı/parçalanması** | Orman kesimi, kentleşme, yol, baraj → popülasyonlar izole olur |
| **Hava kirliliği** | Fosil yakıt, sanayi ($SO_2$, $NO_x$, partikül) |
| **Ozon incelmesi** | CFC gazları → UV-B artışı, cilt kanseri, katarakt |
| **Asit yağmurları** | $SO_2$, $NO_x$ → göl ve orman asitlenmesi |
| **Su kirliliği** | Evsel, tarımsal, endüstriyel atık → **ötrofikasyon** (aşırı besin → alg patlaması → oksijen tükenmesi → balık ölümü) |
| **Toprak kirliliği** | Ağır metal, pestisit, plastik |
| **Radyoaktif kirlilik** | Nükleer kaza ve atıklar |
| **İklim değişikliği** | Sera gazları ($CO_2$, $CH_4$, $N_2O$) → buzul erimesi, deniz seviyesi yükselmesi |
| **Erozyon** | Toprağın su/rüzgârla taşınması |
| **Orman yangınları** | Habitat kaybı, karbon salınımı |
| **Biyoçeşitlilik kaybı** | Endemik türler özellikle risk altında |
""",
  [("Bir göle tarlalardan aşırı gübre karışırsa olayların sırası nedir?",
    "Azot-fosfor artar → **alg patlaması** → algler ölünce ayrıştırıcılar çoğalır ve **oksijeni tüketir** → balık ölümleri. Bu sürece **ötrofikasyon** denir.")],
  ["Ekosistem hizmetleri: hava, su, toprak, tozlaşma…", "Ötrofikasyon: aşırı besin → alg → oksijen tükenmesi.", "CFC ozonu, $SO_2$/$NO_x$ asit yağmurunu oluşturur."]),

O("k6", "2.6", "Ekolojik ayak izinin küçültülmesi", "Reducing the ecological footprint", r"""
# Ekolojik Ayak İzi

Bir birey ya da toplumun kaynak tüketimi ve atık üretiminin, Dünya'nın bu kaynakları **yenileme kapasitesine** oranıdır. Küresel ortalama ayak izi, Dünya'nın taşıma kapasitesini **aşmıştır**.

# Küçültme Yolları

| Alan | Örnek |
|---|---|
| **Enerji** | LED, yalıtım, verimli cihaz; güneş/rüzgâr |
| **Ulaşım** | Toplu taşıma, yürüme, bisiklet |
| **Beslenme** | Et tüketimini azaltmak, yerel ve mevsimsel ürün |
| **İsraf** | Gıda israfını önlemek, ambalajı azaltmak |
| **Döngüsel kullanım** | Geri dönüşüm, yeniden kullanım |
| **Tüketim** | Uzun ömürlü ürün, az tüketim |
""",
  [("Okula özel araçla gitmek yerine bisikletle gitmek ayak izini nasıl etkiler?", "Fosil yakıt tüketimi ve $CO_2$ salımı azalır → **karbon ayak izi**, dolayısıyla ekolojik ayak izi küçülür.")],
  ["Ayak izi = tüketim ve atık / yenileme kapasitesi.", "Enerji, ulaşım, beslenme, israf, geri dönüşüm.", "Küresel ayak izi kapasiteyi aşmış durumda."]),

O("k7", "2.7", "Doğal kaynakların ve biyoçeşitliliğin korunması", "Conserving natural resources and biodiversity", r"""
# Koruma Stratejileri

- **Milli parklar** ve yaban hayatı koruma alanları
- **Ramsar Sözleşmesi** ile sulak alanların korunması (ör. **Sultan Sazlığı**)
- Endemik ve nesli tehlikedeki türlerin izlenmesi: **Akdeniz foku**, **alageyik**
- **Habitat restorasyonu**
- Sürdürülebilir avcılık ve **balıkçılık kotaları**
- Uluslararası sözleşmeler: **Biyolojik Çeşitlilik Sözleşmesi**, **CITES** (nesli tehlikedeki türlerin ticareti)
- Eğitim ve bilinçlendirme

### Türkiye'den örnekler
Tek Tek Dağları, Yumurtalık Lagünü gibi alanlarda **fotokapanlarla** popülasyon izleme yapılır; koruma önlemlerinin etkinliği ölçülür.
""",
  [("Fotokapan kullanmak koruma çalışmalarına nasıl katkı sağlar?", "Hayvanları rahatsız etmeden tür varlığı, birey sayısı ve davranış verisi toplanır; böylece önlemlerin işe yarayıp yaramadığı ölçülür.")],
  ["Milli park, Ramsar (sulak alan), CITES.", "Endemik türler: Akdeniz foku, alageyik.", "İzleme (fotokapan) önlemlerin etkinliğini ölçer."]),

O("k8", "2.8", "Atık yönetimi", "Waste management", r"""
# Atık Yönetimi Hiyerarşisi (öncelik sırasıyla)

1. **Önleme**
2. **Azaltma**
3. **Yeniden kullanma**
4. **Geri dönüşüm**
5. **Enerji geri kazanımı**
6. **Bertaraf** (düzenli depolama)

### Uygulamalar
- **Kaynakta ayrıştırma:** cam, kâğıt, plastik, metal, organik, tehlikeli atık
- **Kompost:** organik atıkları toprağa geri kazandırma
- **Tehlikeli atıklar** (pil, elektronik, kimyasal) ayrı toplanmalı
- **Sıfır Atık** politikaları, belediye çalışmaları ve bireysel alışkanlıklar

> Doğru atık yönetimi kirliliği azaltır, kaynakları korur ve ekolojik ayak izini küçültür.
""",
  [("Bir plastik şişeyi geri dönüşüme atmak ile hiç almamak arasında hangisi hiyerarşide daha önceliklidir?", "**Önleme** (hiç almamak/yeniden kullanılabilir şişe kullanmak); geri dönüşüm hiyerarşide daha aşağıdadır.")],
  ["Önleme > azaltma > yeniden kullanma > geri dönüşüm > enerji > bertaraf.", "Kaynakta ayrıştırma verimi artırır.", "Pil ve elektronik tehlikeli atıktır."]),
]),
]

from _ek136 import uygula136; uygula136(units, "biy10")

write("biy-10.js", "10/biyoloji", "10. Sınıf Biyoloji — detaylı konu anlatım notları",
      "kullanıcının verdiği \"10. Sınıf Biyoloji Detaylı Konu Anlatım Notları\" (Enerji ve Ekoloji temaları).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır (1.5–1.6 sindirim ayrı kazanımlara bölündü). Örnek sorular eklendi.")
