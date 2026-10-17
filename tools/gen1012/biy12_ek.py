# -*- coding: utf-8 -*-
"""12. Sınıf Biyoloji — ek not paketi ("12. Sınıf Biyoloji Ders Notu": 1. Ünite Genden Proteine,
2. Ünite Canlılarda Enerji Dönüşümleri) ile genişletilen kazanımlar. biy12.py bunları ilgili
ünitelerin sonuna ekler; mevcut kazanım kimlikleri değişmez. Kaynaktaki bilimsel olarak
desteklenmeyen GDO iddiaları aktarılmadı; konu tartışmalı yönleriyle dengeli anlatıldı."""
from _c import O

EK = {
"u1": [
O("k4", "1.4", "DNA hesaplamaları, replikasyonun ayrıntıları ve santral dogma", "DNA calculations, replication details and the central dogma", r"""
# Nükleotitten Kromozoma
**Azotlu baz < nükleozit (baz + şeker, glikozit bağı) < nükleotit (+ fosfat, fosfoester bağı) < gen < DNA < kromozom**
- Bir zincirdeki nükleotitler **fosfodiester** bağlarıyla bağlanır (şeker–fosfat omurgası).
- Uçlar: **5′ uçta fosfat**, **3′ uçta hidroksil (–OH)** grubu.
- Nükleik asitlerde **peptit bağı ve aminoasit bulunmaz**.

# Çift Zincirli DNA'da Hesaplama Kuralları
| Kural | Açıklama |
|---|---|
| $A = T$, $G = C$ | Tamamlayıcı baz eşleşmesi |
| $A + G = T + C$ | **Pürin = pirimidin** |
| $\dfrac{A+G}{T+C} = 1$ | Her DNA'da sabit |
| $\dfrac{A+T}{G+C}$ | **Türe özgüdür** (türler arası farklılık gösterir) |
| **Toplam nükleotit** | $= 2 \times$ (bir zincirdeki nükleotit) = fosfat = şeker = baz sayısı |
| **H bağı sayısı** | $= 2A + 3G$ = toplam nükleotit sayısı + G (ya da C) sayısı |
| **Fosfodiester bağı** | $=$ toplam nükleotit $- 2$ (doğrusal çift zincir) |

**Örnek:** 200 nükleotitli çift zincirli bir DNA'da 30 adenin varsa → $T = 30$, $G = C = \dfrac{200-60}{2} = 70$; H bağı $= 2(30) + 3(70) = 270$.

# Replikasyonun Ayrıntıları
| | Prokaryot | Ökaryot |
|---|---|---|
| DNA | **Halkasal**, sitoplazmada | **Doğrusal**, çok uzun; çekirdek (+ mitokondri, kloroplast) |
| Başlama noktası (orijin) | **Tek** | **Çok sayıda** — uzun DNA'nın kısa sürede eşlenmesi için |
| Yön | İki yönlü | Her orijinden iki yönlü (replikasyon kabarcıkları) |

- **Helikaz** zincirleri açar → **DNA polimeraz** yalnızca **3′ ucuna** nükleotit ekler; bu yüzden sentez **5′ → 3′** yönünde, kalıp ise **3′ → 5′** yönünde okunur.
- **Öncü zincir** kesintisiz; **geri kalan (gecikmeli) zincir** kısa **Okazaki parçaları** hâlinde sentezlenir, parçaları **DNA ligaz** birleştirir.
- **Meselson–Stahl deneyi:** ¹⁵N ortamında üretilen DNA (ağır) ¹⁴N ortamına alınınca 1. kuşakta tümü **melez** (¹⁵N/¹⁴N), 2. kuşakta yarısı melez yarısı **hafif** → **yarı korunumlu** eşlenme. Santrifüjde ağır dipte, melez ortada, hafif üstte bant yapar.
- Sitoplazmasında DNA eşlenmesi görülen hücre **prokaryottur** (ökaryotun sitoplazmasında serbest DNA bulunmaz).

# Santral Dogma ve Polizom
- **Francis Crick (1958):** Bilgi akışı **DNA → RNA → protein** yönündedir; tersine (proteinden RNA'ya) akış olmaz. İstisna: retrovirüslerde ters transkripsiyon.
| Olay | Kullanılan monomer | Nerede (ökaryot) | Hangi hücrede |
|---|---|---|---|
| **Replikasyon** | A, T, G, C nükleotitleri | Çekirdek, mitokondri, kloroplast | Yalnızca **bölünecek** hücrede (sinir hücresinde görülmez) |
| **Transkripsiyon** | A, U, G, C nükleotitleri | Çekirdek, mitokondri, kloroplast | Protein sentezleyen tüm hücrelerde |
| **Translasyon** | **Aminoasitler** | **Ribozom** | Protein sentezleyen tüm hücrelerde |
- Replikasyon hatası **kalıtsal** olabilir; transkripsiyon–translasyon hataları kalıtılmaz, yalnızca hatalı protein üretir.
- **Polizom (poliribozom):** Bir mRNA'ya **birden çok ribozomun** tutunmasıyla aynı proteinin kısa sürede çok sayıda kopyası üretilir.
- **tRNA:** En az 20 çeşit; yapısında **zayıf H bağı** içeren tek RNA çeşidi. **rRNA:** hücrede en bol bulunan RNA.
- **Bir gen–bir polipeptit hipotezi:** Her polipeptit zinciri bir gen tarafından şifrelenir. Bir **protein** bir ya da birden çok polipeptitten oluşur ve kendine özgü 3 boyutlu yapısı vardır (polipeptit ip yumağı ise protein ondan örülmüş hırkadır).
""",
  [("Çift zincirli bir DNA'da 400 nükleotit ve 120 sitozin bulunmaktadır. Adenin sayısı ve H bağı sayısı kaçtır?", "$G = C = 120$ → $A + T = 400 - 240 = 160$ → $A = 80$. H bağı $= 2(80) + 3(120) = 160 + 360 =$ **520** (ya da 400 + 120 = 520)."),
   ("¹⁵N içeren bir DNA ¹⁴N ortamında 2 kez eşlenirse oluşan DNA'ların kaçı melez olur?", "2 eşlemede 4 DNA oluşur. Yarı korunumlu eşlenmede eski iki zincir iki farklı DNA'da kalır → **2 melez (¹⁵N/¹⁴N), 2 hafif (¹⁴N/¹⁴N)**.")],
  ["A=T, G=C; pürin = pirimidin; (A+T)/(G+C) türe özgü.", "H bağı = 2A + 3G; DNA polimeraz 5′→3′ sentezler, Okazaki parçaları + ligaz.", "Santral dogma: DNA→RNA→protein; polizom aynı proteinden çok kopya üretir."]),
O("k5", "1.5", "Genetik mühendisliği uygulamaları: gen tedavisi, DNA parmak izi, transgenik canlılar, klonlama", "Applications of genetic engineering", r"""
# Kavramlar
- **Genetik mühendisliği:** Genlerin izolasyonu, çoğaltılması, dizilenmesi, farklı canlıların genlerinin birleştirilmesi ve **gen aktarımı** ile uğraşan dal.
- **Biyoteknoloji:** DNA teknolojisi ve mühendislik yöntemleriyle **yeni ürün ya da organizma** elde etme veya canlının genetik yapısını istenen yönde değiştirme.
- **Gen klonlama:** Bir genin çok sayıda kopyasının oluşturulması; tek hücreden çoğaltılan, genetik yapısı aynı hücrelere **klon** denir.

# Gen Tedavisi (Gen Terapisi)
Bozuk genin işlevini **sağlam bir genle** yerine koyma. Örnek basamaklar:
1. Normal gen klonlanır ve **zararsız hâle getirilmiş bir virüse (vektör)** yerleştirilir.
2. Hastanın **kemik iliği** hücreleri bu virüsle enfekte edilir.
3. Virüs normal geni hücrenin DNA'sına katar.
4. Değiştirilmiş hücreler hastaya geri verilir.
→ Bazı bağışıklık yetmezlikleri, hemofili, kalıtsal körlük türleri ve kanser tedavilerinde kullanılmaktadır (CRISPR temelli tedaviler de onaylanmaya başlamıştır).

# DNA Parmak İzi
Her bireyin DNA'sındaki **tekrarlanan, protein kodlamayan dizilerin** uzunlukları kişiye özgüdür (tek yumurta ikizleri hariç).
| Basamak | İşlem |
|---|---|
| 1 | DNA örneği (kan, kıl, tükürük, deri) alınır, **restriksiyon enzimleriyle** kesilir |
| 2 | Tekrarlanan bölgeler **PCR** ile çoğaltılır (ısıya dayanıklı DNA polimeraz) |
| 3 | Parçalar **jel elektroforezinde** büyüklüklerine göre ayrılır (küçük parçalar daha uzağa gider) |
| 4 | Boyanan bantlar UV ışıkta görüntülenir → **bant profili = DNA parmak izi** |
**Kullanım alanları:** adli olaylar (suçlunun bulunması), **babalık testleri**, kimlik tespiti (afetler), hastalık tanısı, nesli tükenen türlerin korunması, tarım ürünlerinin orijin tespiti.

# Tarımda Gen Aktarımı
- Bitkilere böceklere, kuraklığa, tuza, soğuğa, virüslere ve yabani ot ilaçlarına **direnç** kazandırılabilir; ürün kalitesi ve verim artırılabilir.
- **Agrobacterium tumefaciens** bakterisinin **Ti plazmidi** gen aktarımında **vektör** olarak kullanılır: istenen gen + seçici (antibiyotik direnç) geni plazmide eklenir → bakteri yaralı yaprak dokusuna bulaştırılır → gen bitki hücresine geçer → hücreler **doku kültüründe** antibiyotik ve hormonlu ortamda tam bitkiye dönüştürülür.
- **Altın pirinç:** Nergis ve bakteri genleri aktarılarak **beta-karoten (A vitamini öncüsü)** üreten pirinç; A vitamini eksikliğiyle mücadele.
- **Bt mısır/pamuk:** Bacillus thuringiensis toksin geniyle böceklere dayanıklı bitkiler.

# Hayvanlarda Gen Aktarımı ve Klonlama
- Büyüme hormonu geni aktarılan **iri fareler**; kas gelişimini artıran gen aktarılmış sığır ve koyunlar (**transgenik** hayvanlar); ilaç (insan proteini) üreten keçiler.
- **Dolly (1996, ilk klonlanan memeli):**
  1. Ergin bir koyunun **meme (vücut) hücresi** alınır, besince fakir ortamda **G₀** evresine sokulur.
  2. İkinci bir koyunun **yumurta hücresinin çekirdeği çıkarılır**.
  3. Meme hücresinin çekirdeği çekirdeksiz yumurtaya aktarılır, **elektrik akımıyla** kaynaştırılır ve bölünme uyarılır.
  4. Erken embriyo **üçüncü (taşıyıcı) koyunun** rahmine yerleştirilir.
  5. Doğan kuzu, **çekirdeğin alındığı koyunla genetik olarak özdeştir** (mitokondri DNA'sı yumurtayı veren koyundandır).
""",
  [("Bir babalık testinde çocuğun DNA bantlarının nasıl bir dağılım göstermesi beklenir?", "Çocuğun **her bandı ya anneden ya da babadan** gelmelidir. Annede bulunmayan bantların tamamı **olası babada** bulunuyorsa babalık doğrulanır."),
   ("Dolly'nin genetik olarak hangi koyuna benzediğini gerekçesiyle açıklayınız.", "**Meme hücresinin çekirdeğinin alındığı** koyuna benzer; çünkü kalıtım bilgisinin neredeyse tamamı **çekirdek DNA'sındadır**. Yumurtayı veren koyundan yalnızca **sitoplazmik (mitokondriyal) DNA** gelir, taşıyıcı annenin genetik katkısı yoktur.")],
  ["Gen tedavisi: virüs vektörüyle sağlam gen aktarımı.", "DNA parmak izi: restriksiyon → PCR → elektroforez → bant profili.", "Agrobacterium Ti plazmidi; altın pirinç; Dolly: çekirdek aktarımıyla klonlama."]),
O("k6", "1.6", "GDO, biyogüvenlik ve biyoetik", "GMOs, biosafety and bioethics", r"""
# Genetiği Değiştirilmiş Organizmalar (GDO)
Gen dizilimi değiştirilen ya da kendi türünde bulunmayan bir özellik **gen aktarımıyla** kazandırılan canlılardır (transgenik organizmalar).

# Olası Yararlar
- **Verim artışı**; zararlılara, hastalıklara, kuraklığa, tuzluluğa ve dona dayanıklılık → **açlıkla mücadele**.
- **Besin değerinin zenginleştirilmesi** (altın pirinç), raf ömrünün uzatılması, olgunlaşmanın düzenlenmesi.
- Daha az böcek ilacı kullanımı (Bt bitkileri).
- **Tıp ve sanayi:** bakterilere ürettirilen **insülin**, büyüme hormonu, aşılar, pıhtılaşma faktörleri; biyoyakıt, atık temizleyen mikroorganizmalar.

# Olası Riskler ve Tartışmalar
| Alan | Endişe |
|---|---|
| **Çevre** | Aktarılan genin yabani akrabalara geçmesi (**gen kaçışı**), hedef dışı böceklerin zarar görmesi, **biyoçeşitlilik kaybı**, dirençli zararlı ve yabani otların ortaya çıkması |
| **Sağlık** | Olası **alerjen** etkiler, antibiyotik direnç işaretçi genleri; uzun vadeli etkilerin izlenmesi gerekliliği |
| **Ekonomi ve toplum** | Tohumların **patentli** olması, çiftçinin her yıl tohum satın almak zorunda kalması, gıda üretiminin **birkaç büyük şirketin** denetimine girmesi |
| **Güvenlik** | Teknolojinin **biyolojik silah** amaçlı kötüye kullanılma riski |

> Bilimsel kuruluşlar (DSÖ, Ulusal Bilim Akademileri), onay almış GDO'lu gıdaların geleneksel karşılıklarından **daha riskli olduğuna dair kanıt bulunmadığını** belirtir; ancak her ürünün **ayrı ayrı değerlendirilmesi** ve izlenmesi gerekir. İnternette yayılan bazı iddialar (ör. GDO'lu besinlerin birkaç kuşakta kısırlık yaptığı) **bilimsel olarak doğrulanmamıştır**.

# Türkiye'de Durum
**5977 sayılı Biyogüvenlik Kanunu (2010):** GDO'lu bitkilerin **üretimi yasaktır**; ithalat ve kullanım (ör. yem) **Biyogüvenlik Kurulu** iznine bağlıdır ve etiketleme zorunludur.

# Biyogüvenlik ve Biyoetik
- **Biyogüvenlik:** İnsan, hayvan, bitki sağlığını, çevreyi ve biyolojik çeşitliliği korumak için **GDO ve ürünleriyle ilgili faaliyetlerin güvenli yürütülmesi**.
- **Biyoetik:** Biyoteknoloji ve tıptaki gelişmelerin **insan onuru, özgürlüğü ve canlı yaşamı** açısından doğurduğu etik sorunları inceleyen disiplin.
  - Sorular: İnsan klonlaması kabul edilebilir mi? Embriyo üzerinde gen düzenlemesi yapılmalı mı? Genetik bilgiler sigorta ve işverenlerle paylaşılabilir mi? Hayvan deneylerinin sınırı ne olmalı?
  - Genel ilkeler: **zarar vermeme, yarar sağlama, özerklik (bilgilendirilmiş onam), adalet**; kişisel genetik verilerin gizliliği.
""",
  [("GDO'lu bitkilerin olası ekolojik risklerinden ikisini açıklayınız.", "1) **Gen kaçışı:** aktarılan direnç geninin polen yoluyla **yabani akrabalara** geçip dirençli yabani otlar oluşturması. 2) Bt toksininin **hedef dışı** (yararlı) böceklere zarar vererek **biyoçeşitliliği** azaltması."),
   ("Biyogüvenlik ile biyoetik arasındaki fark nedir?", "**Biyogüvenlik** GDO faaliyetlerinin sağlık ve çevre açısından **güvenli yürütülmesine yönelik önlem ve kurallardır**. **Biyoetik** ise bu teknolojilerin **ahlaki açıdan** neye, ne ölçüde izin verilmesi gerektiğini tartışır.")],
  ["GDO: gen aktarımıyla yeni özellik kazanmış canlı.", "Yarar: verim, dayanıklılık, besin değeri, ilaç üretimi; risk: gen kaçışı, biyoçeşitlilik, şirket bağımlılığı.", "Türkiye: GDO'lu bitki üretimi yasak (5977 sayılı kanun); biyoetik ilkeleri."]),
],

"u2": [
O("k3", "2.3", "Metabolizma, ATP ve fosforilasyon çeşitleri", "Metabolism, ATP and types of phosphorylation", r"""
# Metabolizma
Hücredeki **yapım, yıkım ve dönüşüm** tepkimelerinin tümü.
| Özümleme (**anabolizma**, asimilasyon) | Yadımlama (**katabolizma**, disimilasyon) |
|---|---|
| Küçük moleküllerden büyük moleküller yapılır; **enerji harcanır** (endergonik) | Büyük moleküller parçalanır; **enerji açığa çıkar** (ekzergonik) |
| Fotosentez, kemosentez, protein–nükleik asit–yağ–polisakkarit sentezi | Hücresel solunum, fermantasyon, sindirim (hidroliz) |

# ATP (Adenozin trifosfat)
**Adenin + riboz + 3 fosfat.** Son iki fosfat arasındaki bağlar **yüksek enerjili** bağlardır.
$$ATP + H_2O \rightleftharpoons ADP + P_i + \text{enerji}$$
- ATP sentezine **fosforilasyon**, ATP'nin yıkılmasına **defosforilasyon** denir.
- **Tüm canlılar** ATP üretir; ATP **depolanamaz**, sürekli üretilip tüketilir (bir insan günde kendi ağırlığına yakın ATP döngüsü yapar).
- ATP genellikle **üretildiği hücrede** kullanılır; hücre dışına çıkmaz (bitkilerde arkadaş hücreden kalburlu boru hücresine geçiş gibi özel durumlar dışında).
- Üretim yerleri: **sitoplazma, mitokondri, kloroplast** (prokaryotlarda sitoplazma ve hücre zarı).

# Fosforilasyon Çeşitleri
| Çeşit | Enerji kaynağı | Nerede | Canlılar |
|---|---|---|---|
| **Substrat düzeyinde fosforilasyon** | Yüksek enerjili bir substrattan ADP'ye **doğrudan fosfat aktarımı**; ETS yok | Glikoliz (sitoplazma), Krebs döngüsü | **Tüm canlılar** |
| **Oksidatif fosforilasyon** | Besinlerden koparılan elektronların **ETS**'de taşınması (kemiozmoz) | Mitokondri iç zarı (kristalar); prokaryotta hücre zarı | Oksijenli ve oksijensiz solunum yapanlar |
| **Fotofosforilasyon** | **Işık enerjisi** (klorofil + ETS) | Kloroplast **tilakoit zarı** | Fotosentez yapanlar |
| **Kemofosforilasyon** (kemosentetik) | **İnorganik maddelerin oksidasyonu** | Hücre zarı | Bazı bakteri ve arkeler |

# Kemiozmotik Hipotez (Peter Mitchell, 1961)
"**Zarın iki yüzü arasındaki proton (H⁺) derişim farkı ATP sentezini sağlar.**" Elektronların ETS'de akarken bıraktığı enerjiyle H⁺ iyonları bir bölmeye pompalanır; H⁺ iyonları **ATP sentaz** kanalından geri akarken enzim bir türbin gibi döner ve **ADP + Pᵢ → ATP** oluşur.
| | Mitokondri | Kloroplast |
|---|---|---|
| H⁺ pompalandığı yer | **Zarlar arası boşluk** | **Tilakoit boşluğu** |
| ATP'nin oluştuğu yer | **Matriks** | **Stroma** |
""",
  [("Fotofosforilasyon ile substrat düzeyinde fosforilasyonu iki yönden karşılaştırınız.", "**Enerji kaynağı:** fotofosforilasyonda **ışık**, substrat düzeyinde **yüksek enerjili bir organik molekül**. **ETS:** fotofosforilasyonda **görev yapar**, substrat düzeyinde **görev yapmaz**. Ayrıca substrat düzeyinde fosforilasyon tüm canlılarda görülür."),
   ("Mitokondride ATP sentaz enzimi H⁺ iyonlarını hangi yönde geçirir?", "**Zarlar arası boşluktan matrikse** doğru (yüksek derişimden düşük derişime); bu akış ATP sentezini sağlar.")],
  ["Anabolizma: yapım, enerji harcar; katabolizma: yıkım, enerji verir.", "ATP: adenin + riboz + 3 fosfat; depolanmaz.", "4 fosforilasyon: substrat düzeyi, oksidatif, foto-, kemo-; kemiozmoz + ATP sentaz."]),
O("k4", "2.4", "Fotosentezin ayrıntıları ve fotosentez hızını etkileyen faktörler", "Photosynthesis in detail and limiting factors", r"""
# Fotosentez Yapan Canlılar ve Yapılar
Bitkiler, algler, öglena, **siyanobakteriler**, mor ve yeşil kükürt bakterileri. Fotosentezin büyük kısmı **okyanuslardaki fitoplanktonlar** tarafından yapılır.
- **Klorofil:** C, H, O, N ve **Mg** içerir; Fe yapısında yoktur ama **sentezi için gereklidir** (enzim kofaktörü). Ökaryotlarda kloroplastta, prokaryotlarda sitoplazmadaki zar sistemlerinde bulunur.
- **Kloroplast:** çift zar, **tilakoitler (granum)** ve **stroma**; stromada **kendi DNA'sı, RNA'sı ve ribozomları** vardır → kendini eşleyebilir, bazı proteinlerini üretebilir. Fotosentezde üretilen ATP **yalnızca kloroplast içinde** (Calvin döngüsünde) harcanır.
- **Yaprak:** Epidermis hücrelerinde kloroplast yoktur (stoma **bekçi hücreleri** hariç); en çok fotosentez **palizat parankimasında**, sonra sünger parankimasında olur.

# Işığa Bağımlı Tepkimeler (tilakoit zar)
Sıra: **FS II ve FS I'deki klorofil-a ışığı soğurur, elektron kaybeder → suyun fotolizi → ETS ve fotofosforilasyon (ATP) → NADP⁺'nin indirgenmesi (NADPH)**.
- Elektron akışı: $H_2O \to FS\,II \to ETS \to FS\,I \to NADP^+$
- **Suyun 3 işlevi:** FS II için **elektron**, NADP⁺ için **hidrojen**, atmosfer için **O₂** kaynağı.
- Sıcaklıktan çok **ışık şiddeti** etkilidir.

# Işıktan Bağımsız Tepkimeler (Calvin döngüsü, stroma)
- **CO₂**, RuBP'ye tutulur (**RuBisCO** enzimi), ATP ve NADPH ile indirgenerek **PGAL**'e dönüşür; RuBP yeniden oluşturulur.
- 1 glikoz için **6 CO₂, 18 ATP, 12 NADPH** harcanır.
- PGAL'den **glikoz, aminoasit, yağ asidi, gliserol, vitamin** vb. sentezlenir.
- Enzimatik olduğu için **sıcaklık** ve pH değişimlerine duyarlıdır; ışık doğrudan gerekmez ama ışıklı evrenin ürünlerine bağımlı olduğu için doğada **gündüz** gerçekleşir.

# Farklı Fotosentez Tipleri (karbon kaynağı hep CO₂, hidrojen kaynağı farklı)
| Canlı | Hidrojen kaynağı | Yan ürün |
|---|---|---|
| Bitki, alg, siyanobakteri | $H_2O$ | **O₂** |
| Kükürt bakterileri | $H_2S$ | **S** (kükürt) |
| Hidrojen bakterileri | $H_2$ | — |

# Engelmann Deneyi (1883)
İpliksi bir alge prizmayla farklı dalga boylarında ışık düşürülmüş; **oksijen seven (aerobik) bakteriler** en çok **mor–mavi ve kırmızı** ışık alan bölgelerde toplanmıştır → fotosentez bu dalga boylarında en hızlıdır. Hız sırası: **mor > mavi > kırmızı > turuncu > sarı > yeşil** (yeşil yansıtılır).

# Fotosentez Hızını Etkileyen Faktörler
| Çevresel | Etkisi |
|---|---|
| **Işık şiddeti** | Belli bir noktaya kadar hız artar, sonra sabit kalır (doygunluk) |
| **CO₂ derişimi** | Belli bir noktaya kadar artar, sonra sabit; çok düşükse fotosentez durur. KOH, NaOH, Ca(OH)₂ gibi CO₂ tutan maddeler hızı **düşürür** |
| **Sıcaklık** | Enzimler nedeniyle optimum **25–35 °C**; yüksek sıcaklıkta enzimler bozulur, hız düşer |
| **Işığın dalga boyu** | Mor–mavi ve kırmızıda en yüksek, yeşilde en düşük |
| **Su** | Fotoliz, stomaların açılması ve enzimler için gerekli |
| **Mineraller** | **Mg** (klorofil), **Fe** (ferredoksin, klorofil sentezi), Mn, K, Ca (kofaktör) |
| **pH** | Enzim aktivitesini etkiler |
| **Genetik** | Etkisi |
| Kloroplast–klorofil miktarı, yaprak sayısı ve yüzeyi, **stoma sayısı ve konumu**, kutikula kalınlığı, enzim miktarı | Kalın kutikula ve az stoma (kurak ortam bitkileri) hızı azaltır |

> **Minimum (sınırlayıcı faktör) yasası:** Fotosentez hızını, **en yetersiz olan** faktör belirler.
""",
  [("Bir bitkinin bulunduğu ortama KOH eklendiğinde fotosentez hızı nasıl değişir? Neden?", "**Azalır.** KOH ortamdaki **CO₂'yi tutar**; Calvin döngüsü için gerekli CO₂ azalınca ışıktan bağımsız tepkimeler yavaşlar."),
   ("Fotosentezde açığa çıkan O₂'nin kaynağı nedir ve hangi evrede oluşur?", "**Su**dur; **ışığa bağımlı tepkimelerde suyun fotolizi** sırasında tilakoit zarda açığa çıkar (CO₂'den gelmez).")],
  ["Işığa bağımlı evre: tilakoit, fotoliz, ATP + NADPH + O₂.", "Calvin döngüsü: stroma, CO₂ tutulması, 1 glikoz = 6 CO₂ + 18 ATP + 12 NADPH.", "Hız: ışık, CO₂, sıcaklık, dalga boyu, su, mineral; en yetersiz faktör belirler."]),
O("k5", "2.5", "Kemosentezin önemi ve fotosentez–kemosentez karşılaştırması", "Importance of chemosynthesis; photosynthesis vs chemosynthesis", r"""
# Kemosentez
Bazı **bakteri ve arkelerin**, ortamdaki **inorganik maddeleri oksitleyerek** elde ettikleri kimyasal enerjiyle CO₂ ve sudan organik madde üretmesidir.
$$\text{İnorganik madde} + O_2 \to \text{oksitlenmiş madde} + \text{enerji}$$
$$6CO_2 + 6H_2O + \text{enerji} \to C_6H_{12}O_6 + 6O_2$$
- Oksitlenen maddeler: **NH₃** (nitrit bakterileri), **NO₂⁻** (nitrat bakterileri), **H₂S, S** (kükürt bakterileri), **Fe²⁺** (demir bakterileri), H₂.
- Ürettikleri O₂'yi oksidasyonda kullandıkları için ekosisteme **net oksijen katkıları yoktur**.
- Okyanus tabanındaki **hidrotermal bacalar** çevresinde güneş ışığından bağımsız ekosistemlerin temelini oluştururlar.

# Kemosentezin Önemi
1. NH₃, H₂S gibi **zehirli ve kirletici** maddeleri zararsız hâle getirir.
2. Azotlu bileşikleri bitkilerin alabileceği **nitrat tuzlarına** dönüştürür (**nitrifikasyon**) → **azot döngüsü**.
3. Azotun toprakta tutulmasını ve **toprak verimliliğini** sağlar.
4. Madde döngüleri ve biyolojik dengenin korunmasında rol oynar.

# Endüstride Kullanımı
- **Biyomadencilik:** Bakır, altın, uranyum gibi metallerin cevherden bakterilerle ayrıştırılması.
- **Atık su arıtımı:** Arıtma çamurunun bakteri ve arkelerle parçalanması, gübreye dönüştürülmesi.
- **Petrol kirliliği temizliği:** Kirlenen kıyılara gübre püskürtülerek bakterilerin çoğalması ve petrolün parçalanması hızlandırılır.

# Ortak Özellikler
İnorganik maddelerden organik madde üretilir · **CO₂ özümlenir** · ATP üretilir ve harcanır · enzimatik tepkimelerdir · **ETS** görev yapar · NADP⁺ indirgenir · hidrojen kaynağı kullanılır · ototrof beslenmedir.

# Farklar
| | Fotosentez | Kemosentez |
|---|---|---|
| Yapan canlılar | Prokaryot ve ökaryot (bitki, alg, siyanobakteri…) | Yalnızca bazı **prokaryotlar** (bakteri, arke) |
| Enerji kaynağı | **Işık** | **İnorganik maddelerin oksidasyonu** (kimyasal enerji) |
| Klorofil | Gerekli | **Gerekmez** |
| ATP üretimi | **Fotofosforilasyon** | **Kemofosforilasyon** (oksidatif) |
| Zaman | Doğal ortamda **gündüz** | **Gece ve gündüz** |
| O₂ | Bitkilerde **üretilir** (atmosfere verilir) | Net katkı yok; çoğunlukla **O₂ tüketir** |
""",
  [("Kemosentetik bakterilerin toprak verimliliğine katkısı nedir?", "**Nitrifikasyon** bakterileri amonyağı (NH₃) önce nitrite, sonra **nitrata** dönüştürür; bitkiler azotu **nitrat** olarak alabildiğinden toprak verimliliği artar."),
   ("Hem fotosentezde hem kemosentezde gerçekleşen ancak oksijensiz solunumda gerçekleşmeyen bir olay nedir?", "**CO₂ özümlemesi (inorganik maddelerden organik madde sentezi).** Solunumda organik madde yıkılır; fotosentez ve kemosentezde ise CO₂'den organik madde yapılır.")],
  ["Kemosentez: inorganik madde oksidasyonuyla organik madde üretimi, yalnızca bazı prokaryotlar.", "Önemi: nitrifikasyon, zehirli maddelerin zararsızlaştırılması, biyomadencilik.", "Fotosentez ışık + klorofil; kemosentez kimyasal enerji, gece-gündüz."]),
O("k6", "2.6", "Solunumda ATP hesabı, farklı besinlerin solunuma katılımı ve oksijensiz solunum", "ATP yield, other nutrients in respiration, anaerobic respiration", r"""
# Oksijenli Solunumun Ayrıntıları
- **Glikoliz** (sitoplazma): 2 ATP harcanır, **4 ATP** üretilir (substrat düzeyinde) → **net 2 ATP**, 2 NADH; ürün 2 **pirüvat**.
- **Krebs'e hazırlık** (mitokondri matriksi): Her pirüvattan **1 CO₂** ayrılır, 1 NADH oluşur, kalan 2C'lu asetil grubu **koenzim A**'ya bağlanır → **asetil-CoA**. (Glikozun yıkımında ilk CO₂ burada çıkar.)
- **Krebs döngüsü** (matriks): İlk ürün **sitrik asit**; 1 glikoz (2 asetil-CoA = 2 tur) için **4 CO₂, 6 NADH, 2 FADH₂, 2 ATP**; 6 H₂O harcanır.
- **ETS** (mitokondri iç zarı – kristalar; prokaryotta hücre zarı): Son elektron alıcısı **O₂** → H₂O.

# ATP Hesabı (1 glikoz)
| Kaynak | Hesap | ATP |
|---|---|---|
| Substrat düzeyinde (glikoliz + Krebs) | 4 + 2 (toplam 6, glikolizde 2 harcanır) | **net 4** |
| Oksidatif: NADH | 10 NADH × 2,5 | 25 |
| Oksidatif: FADH₂ | 2 FADH₂ × 1,5 | 3 |
| **Toplam** | | **net ≈ 32 ATP** (bazı dokularda 30) |
- Farkın nedeni: sitoplazmadaki NADH'ların mitokondriye **farklı mekiklerle** taşınması (iskelet kası–beyin ≈ 30; karaciğer, böbrek, kalp ≈ 32).
- **CO₂:** 2 (hazırlık) + 4 (Krebs) = **6 CO₂**. **Su:** 12 H₂O oluşur, 6'sı Krebs'te harcanır → **net 6 H₂O**.
- Enerji verimi ≈ %40; fermantasyona göre ≈ 15 kat fazla ATP.

**Mitokondri etkinliği artan hücrede:** O₂ tüketimi, CO₂ üretimi, ATP, ısı ve su artar; glikoz azalır, **pH düşer**.

# Farklı Besinlerin Solunuma Katılması
Polimerler önce **hidrolizle** monomerlerine ayrılır. Enerji için kullanım sırası genellikle **karbonhidrat > yağ > protein**.
| Monomer | Solunuma giriş noktası |
|---|---|
| **Glikoz** | Glikoliz |
| **Gliserol** | **PGAL**'e dönüşerek glikolizin ara basamağı |
| **Yağ asitleri** | Mitokondride **beta oksidasyonu** ile **asetil-CoA** |
| **Aminoasitler** | Önce **deaminasyon** (amino grubu **NH₃** olarak ayrılır); sonra karbon sayısına göre asetil-CoA, pirüvat ya da Krebs ara ürünü |
> Solunum sonucunda **NH₃** oluşuyorsa kullanılan besin **protein (aminoasit)**tir. Aynı kütlede **yağlar** en çok enerjiyi verir.

# Oksijensiz (Anaerobik) Solunum
- Yalnızca **bazı bakterilerde**; glikoliz, Krebs ve **ETS** vardır ama son elektron alıcısı **O₂ dışında bir inorganik maddedir**: **SO₄²⁻, S, NO₃⁻, CO₂, Fe³⁺**.
- Bu alıcıların elektron çekme gücü O₂'den zayıf olduğu için **ATP verimi oksijenli solunumdan az, fermantasyondan fazladır**.
- **Denitrifikasyon:** Nitratı son elektron alıcısı olarak kullanan bakteriler NO₃⁻'ü **N₂**'ye dönüştürür → azot döngüsü.
""",
  [("Yağ asitlerinin oksijenli solunuma katılım yolu nedir?", "Yağ asitleri mitokondride **beta oksidasyonu** ile 2 karbonlu **asetil-CoA** birimlerine parçalanır ve **Krebs döngüsüne** katılır. Gliserol ise PGAL'e dönüşerek glikolize girer."),
   ("Oksijensiz solunumu fermantasyondan ayıran iki özellik yazınız.", "Oksijensiz solunumda **ETS görev yapar** ve son elektron alıcısı **inorganik** bir maddedir (SO₄²⁻, NO₃⁻ vb.); fermantasyonda ETS yoktur ve son elektron alıcısı **organiktir** (pirüvat ya da asetaldehit). Ayrıca oksijensiz solunumda Krebs döngüsü de vardır ve daha çok ATP üretilir.")],
  ["1 glikoz → net ≈ 32 ATP (4 SDF + 28 oksidatif), 6 CO₂, net 6 H₂O.", "Gliserol → PGAL; yağ asidi → beta oksidasyon → asetil-CoA; aminoasit → deaminasyon (NH₃).", "Oksijensiz solunum: ETS var, son alıcı inorganik (SO₄²⁻, NO₃⁻); denitrifikasyon."]),
O("k7", "2.7", "Fermantasyon çeşitleri ve fotosentez–solunum ilişkisi", "Types of fermentation and the photosynthesis–respiration relationship", r"""
# Fermantasyon
Oksijen kullanılmadan, **yalnızca glikolizle** ATP üretilen süreç. Glikolizden sonraki evrenin amacı ATP üretmek değil, **NADH'ı yükseltgeyip NAD⁺'yi geri kazanmak** ve böylece glikolizin sürmesini sağlamaktır.
- Net **2 ATP** (toplam 4); yalnızca **substrat düzeyinde fosforilasyon**; ETS yok; tamamen **sitoplazmada**.
- Glikoz tam yıkılamadığından enerjinin büyük kısmı **organik son üründe** kalır (verim ≈ %2).
- Son ürünün farklı olmasının nedeni, glikolizden sonraki basamaklarda görev yapan **enzimlerin farklı** olmasıdır.

| | Etil alkol fermantasyonu | Laktik asit fermantasyonu |
|---|---|---|
| Canlılar | **Maya mantarları**, bazı bakteriler, **oksijensiz kalan bitki hücreleri ve tohumlar** | **Yoğurt bakterileri**, bazı mantarlar, O₂ yetersizliğinde **çizgili kas**, insanda **olgun alyuvar** |
| Ara ürün | **Asetaldehit** (pirüvattan CO₂ ayrılır) | — |
| Son elektron (H) alıcısı | **Asetaldehit** | **Pirüvat** |
| Son ürün | **2 etil alkol (2C) + 2 CO₂** | **2 laktik asit (3C)**, CO₂ yok |
| Kapalı ortamda gaz basıncı | **Artar** | Değişmez |
| Kullanım | Ekmek hamurunun kabarması, boza, alkol, biyoetanol | **Yoğurt, kefir, peynir, turşu, salamura zeytin**, sucuk olgunlaştırma |
- İnsan ve hayvan hücrelerinde **etil alkol fermantasyonu**, bitkilerde **laktik asit fermantasyonu** görülmez.
- Kaslarda biriken laktat, oksijen yeterli hâle gelince **karaciğerde** pirüvata / glikoza dönüştürülür (kas yorgunluğu yalnızca laktata bağlanmaz).
- **Bira mayası** O₂ varken oksijenli solunum, yokken fermantasyon yapar (**fakültatif**).

# Enerji Elde Etme Yollarının Karşılaştırması
| | Oksijenli solunum | Oksijensiz solunum | Fermantasyon |
|---|---|---|---|
| O₂ | Kullanılır | Kullanılmaz | Kullanılmaz |
| ETS | Var | Var | **Yok** |
| Son elektron alıcısı | **O₂** (inorganik) | SO₄²⁻, NO₃⁻… (inorganik) | Pirüvat / asetaldehit (**organik**) |
| Fosforilasyon | SDF + oksidatif | SDF + oksidatif | **Yalnızca SDF** |
| Net ATP | ≈ 30–32 | Oksijenliden az, fermantasyondan çok | **2** |
**Ortak özellikler:** glikoliz, enzimler, ısı çıkışı (ekzergonik), NAD⁺'nin indirgenip yükseltgenmesi, organik maddeden H koparılması, **pH'nin düşmesi**, biyokütlenin azalması.

# Fotosentez–Solunum İlişkisi
Solunumun ürünleri (**CO₂, H₂O**) fotosentezin, fotosentezin ürünleri (**glikoz, O₂**) solunumun ham maddesidir; enerji kaynağı en sonunda **Güneş**'tir.
| Durum | Gaz alışverişi | Kuru ağırlık |
|---|---|---|
| **Fotosentez > solunum** (gündüz, yeterli ışık) | Atmosferden **CO₂ alır**, atmosfere **O₂ verir** | **Artar** |
| **Fotosentez = solunum** (**kompanzasyon noktası**; sabah–akşam, düşük ışık) | Dışarıyla net gaz alışverişi **yok** | Değişmez |
| **Fotosentez < solunum** (çok düşük ışık) / **gece** (yalnızca solunum) | **O₂ alır, CO₂ verir** | **Azalır** |
- **Kökler** fotosentez yapmaz; ürettikleri CO₂ gece–gündüz toprağa verilir (kök → toprak → atmosfer → yaprak).
- **Kuru tohum** canlıdır; kabuk O₂ geçişini sınırladığı için düşük düzeyde **etil alkol fermantasyonu** yapabilir. **Çimlenen tohum** oksijenli solunum yapar ve fotosentez başlayana kadar **kuru ağırlığı azalır**; fotosentez başlayınca artar.
- Gece bitkiler yalnızca solunum yaptığından kapalı ve küçük yatak odalarında çok sayıda bitki bulundurmak önerilmez.
""",
  [("Kapalı bir kapta maya hücreleri ve glikoz bulunmaktadır; O₂ bittikten sonra kaptaki basınç nasıl değişir?", "**Artar.** O₂ bitince maya **etil alkol fermantasyonu** yapar ve **CO₂** üretir; gaz miktarı arttığı için basınç yükselir. (Laktik asit fermantasyonunda CO₂ çıkmadığından basınç değişmezdi.)"),
   ("Bir bitkinin kompanzasyon noktasında olduğu nasıl anlaşılır?", "Bitki ile atmosfer arasında **net CO₂ ve O₂ alışverişi olmaz**; fotosentezde üretilen O₂ ve glikoz solunumda, solunumda üretilen CO₂ fotosentezde tamamen kullanılır. Kuru ağırlık değişmez.")],
  ["Fermantasyon: yalnızca glikoliz, net 2 ATP, NAD⁺ yenilenir.", "Etil alkol: asetaldehit, CO₂ çıkar; laktik asit: pirüvat alıcı, CO₂ yok.", "Fotosentez > solunum: ağırlık artar; eşit: kompanzasyon noktası."]),
],
}
