# -*- coding: utf-8 -*-
"""12. Sınıf Biyoloji notları (genişletilmiş) → js/data/content/biy-12.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Genden Proteine", "Unit 1: From Gene to Protein", [
O("k1", "1.1", "Nükleik asitlerin keşfi, yapısı ve DNA eşlenmesi", "Discovery and structure of nucleic acids; DNA replication", r"""
# Keşif Süreci
| Bilim insanı | Katkı |
|---|---|
| **Friedrich Miescher** (1869) | Çekirdekten "nüklein"i (nükleik asit) izole etti |
| **Griffith** (1928) | Bakterilerde **transformasyon**: kalıtım maddesi aktarılabilir |
| **Avery, MacLeod, McCarty** (1944) | Transformasyon maddesinin **DNA** olduğunu gösterdi |
| **Chargaff** | DNA'da **A = T**, **G = C** |
| **Rosalind Franklin, Wilkins** | X-ışını kırınımı: sarmal yapı |
| **Watson ve Crick** (1953) | **Çift sarmal** DNA modeli |
| **Meselson–Stahl** (1958) | **Yarı korunumlu** eşlenme |

# DNA ve RNA
**Nükleotit** = azotlu baz + **5 karbonlu şeker** + **fosfat**.

| | DNA | RNA |
|---|---|---|
| Şeker | **Deoksiriboz** | **Riboz** |
| Bazlar | A, **T**, G, C | A, **U**, G, C |
| Yapı | **Çift** zincir (sarmal) | **Tek** zincir |
| Görev | Kalıtım bilgisini depolar | Protein sentezinde görev |
| Bulunduğu yer | Çekirdek, mitokondri, kloroplast | Çekirdek, sitoplazma, ribozom |

- İki zincir **zıt yönlü (antiparalel)**: 5'→3' ve 3'→5'.
- **A–T arasında 2**, **G–C arasında 3** hidrojen bağı.
- Pürinler (A, G) çift halkalı; pirimidinler (C, T, U) tek halkalı.

# DNA Eşlenmesi (Replikasyon)
Hücre bölünmesinden önce (**S evresi**) gerçekleşir. **Yarı korunumlu:** Her yeni DNA'da bir eski, bir yeni zincir.
1. **Helikaz** hidrojen bağlarını koparır, zincirleri açar.
2. **Primaz** kısa RNA öncülü (primer) yapar.
3. **DNA polimeraz** yeni nükleotitleri **5'→3' yönünde** ekler; **öncü zincir** kesintisiz, **geri kalan zincir** parçalar (**Okazaki**) hâlinde sentezlenir.
4. **DNA ligaz** parçaları birleştirir.
5. DNA polimeraz hataları **onarır** (düzeltme okuması).
""",
  [(r"Bir DNA molekülünde %30 adenin varsa sitozin oranı nedir?", r"A = T = %30 → A + T = %60. G + C = %40 → **C = %20**."),
   ("Meselson–Stahl deneyi neyi kanıtlamıştır?", "DNA eşlenmesinin **yarı korunumlu** olduğunu: ağır azot (¹⁵N) içeren DNA hafif ortamda bir kez eşlendiğinde tüm DNA'ların **ara yoğunlukta** (yarı ağır, yarı hafif) çıktığı görülmüştür.")],
  ["Nükleotit: baz + şeker + fosfat; A=T (2 bağ), G≡C (3 bağ).", "DNA çift zincir deoksiriboz; RNA tek zincir riboz, U.", "Replikasyon yarı korunumlu: helikaz, polimeraz, ligaz."]),
O("k2", "1.2", "Protein sentezi ve genetik kod", "Protein synthesis and the genetic code", r"""
# Merkezî Dogma
$$\text{DNA} \xrightarrow{\text{replikasyon}} \text{DNA} \qquad \text{DNA} \xrightarrow{\text{transkripsiyon}} \text{RNA} \xrightarrow{\text{translasyon}} \text{Protein}$$
(Retrovirüslerde **ters transkripsiyon**: RNA → DNA.)

# RNA Çeşitleri
| RNA | Görev |
|---|---|
| **mRNA** (haberci) | DNA'daki şifreyi ribozoma taşır; **kodon** içerir |
| **tRNA** (taşıyıcı) | Aminoasitleri ribozoma getirir; **antikodon** içerir |
| **rRNA** (ribozomal) | Proteinlerle birlikte **ribozomu** oluşturur; peptit bağı oluşumunu katalizler |

# Transkripsiyon (Yazılma)
- Ökaryotlarda **çekirdekte**; **RNA polimeraz**, DNA'nın **kalıp** zincirini okuyarak mRNA üretir.
- **Promotor** bölgede başlar, **sonlandırıcı** bölgede biter.
- Ökaryotlarda öncül mRNA işlenir: **intronlar** çıkarılır, **ekzonlar** birleştirilir (**kırpma**); 5' başlık ve poli-A kuyruğu eklenir.

# Translasyon (Çevrilme)
Sitoplazmada **ribozomda**.
1. **Başlama:** mRNA'daki **AUG** (başlama kodonu, **metiyonin**) bulunur.
2. **Uzama:** tRNA antikodonları kodonlarla eşleşir; aminoasitler arasında **peptit bağı** kurulur (su açığa çıkar).
3. **Bitiş:** **UAA, UAG, UGA** (durdurma kodonları) → polipeptit serbest kalır.

# Genetik Kod
- **Üçlü** kod: 3 nükleotit = 1 **kodon** → $4^3 = 64$ kodon (61 anlamlı, 3 durdurma).
- **Evrenseldir** (neredeyse tüm canlılarda aynı), **dejeneredir** (bir aminoasidi birden çok kodon belirleyebilir), **örtüşmez**.

# Gen İfadesinin Düzenlenmesi
Her hücre aynı DNA'ya sahiptir ama **farklı genleri** ifade eder → hücre farklılaşması.
- Prokaryotlarda **operon** modeli (lac operonu: laktoz varsa genler açılır).
- Ökaryotlarda kromatin yapısı, **transkripsiyon faktörleri**, RNA işlenmesi, **epigenetik** (DNA metilasyonu) düzeyinde kontrol.
""",
  [(r"DNA kalıp zinciri 3'–TAC GGA TTC ATT–5' ise mRNA ve oluşacak aminoasit sayısı nedir?", r"mRNA: 5'–**AUG CCU AAG UAA**–3'. AUG başlama, UAA durdurma → **3 aminoasit** (Met–Pro–Lys)."),
   ("Genetik kodun 'dejenere' olması mutasyonların etkisini nasıl azaltır?", "Bir aminoasit birden fazla kodonla şifrelendiği için kodonun özellikle **üçüncü bazındaki** bir değişiklik çoğu zaman **aynı aminoasidi** belirler; protein değişmez (**sessiz mutasyon**).")],
  ["DNA → mRNA (transkripsiyon, çekirdek) → protein (translasyon, ribozom).", "AUG başlama; UAA, UAG, UGA durdurma; 64 kodon.", "Kod evrensel, dejenere; gen ifadesi düzenlenir."]),
O("k3", "1.3", "Mutasyonlar, biyoteknoloji ve genetik mühendisliği", "Mutations, biotechnology and genetic engineering", r"""
# Mutasyonlar
DNA dizisinde kalıcı değişiklik. **Mutajenler:** UV, X ışını, radyasyon, bazı kimyasallar (sigara katranı), bazı virüsler.

| Tür | Açıklama | Sonuç |
|---|---|---|
| **Nokta (yer değiştirme)** | Tek baz değişir | Sessiz, yanlış anlamlı (**orak hücre anemisi**: GAG→GTG, Glu→Val) ya da anlamsız (erken durdurma) |
| **Ekleme / silinme** | Baz eklenir ya da çıkar | **Çerçeve kayması** → sonraki tüm kodonlar değişir |
| **Kromozom mutasyonu** | Parça kaybı, tekrar, ters dönme, yer değiştirme | Kedi miyavlaması sendromu vb. |
| **Kromozom sayısı** | Ayrılmama sonucu | **Down sendromu** (21. kromozom trizomisi), Turner (X0), Klinefelter (XXY) |

- **Üreme hücrelerindeki** mutasyonlar kalıtsaldır; **vücut hücrelerindekiler** kalıtılmaz (kanser gibi).
- Mutasyonlar **çeşitliliğin** ve **evrimin** ham maddesidir.

# Biyoteknoloji ve Genetik Mühendisliği
| Teknik | Açıklama |
|---|---|
| **Rekombinant DNA** | **Restriksiyon enzimiyle** kesilen gen, **ligazla** vektöre (**plazmit**) eklenir |
| **Gen klonlama** | Rekombinant plazmit bakteriye aktarılır, bakteri çoğaldıkça gen de çoğalır (insan **insülini** üretimi) |
| **PCR** | DNA'nın test tüpünde **milyonlarca kez** kopyalanması (ısıya dayanıklı Taq polimeraz) — tanı, adli tıp |
| **Jel elektroforezi** | DNA parçalarını boyutlarına göre ayırma → **DNA parmak izi** |
| **Gen tedavisi** | Hatalı genin yerine sağlamının aktarılması |
| **CRISPR-Cas9** | Genomda belirli bir bölgeyi **kesip düzenleme** ("gen makası") |
| **GDO** | Gen aktarılmış organizmalar (zararlıya dayanıklı mısır, altın pirinç) |
| **Klonlama** | Genetik olarak aynı birey (Dolly koyunu, 1996) |
| **Kök hücre** | Farklılaşmamış hücrelerden doku/organ elde etme |

# Biyoetik
Genetik bilgilerin gizliliği, **tasarım bebek** tartışmaları, GDO'ların ekosistem ve sağlık etkileri, klonlamanın etik sınırları. Türkiye'de GDO'lu ürünlerin üretimi **yasaktır**; ithalat ve kullanım izne bağlıdır.
""",
  [("Bir gende tek bir nükleotit eklenmesi neden tek baz değişiminden genellikle daha zararlıdır?", "Kodonlar üçer üçer okunduğundan ekleme **okuma çerçevesini kaydırır**; eklenen noktadan sonraki **tüm kodonlar** ve dolayısıyla aminoasitler değişir. Tek baz değişimi ise yalnızca bir kodonu etkiler.")],
  ["Nokta mutasyon, çerçeve kayması, kromozom mutasyonları.", "Rekombinant DNA: restriksiyon enzimi + ligaz + plazmit.", "PCR, elektroforez, CRISPR, GDO; biyoetik."]),
]),
U("u2", "2. Ünite: Canlılarda Enerji Dönüşümleri", "Unit 2: Energy Transformations in Living Things", [
O("k1", "2.1", "Fotosentez ve kemosentez", "Photosynthesis and chemosynthesis", r"""
# ATP
**Adenin + riboz + 3 fosfat**. Fosfatlar arasındaki bağların kopmasıyla enerji açığa çıkar: $ATP \to ADP + P_i + \text{enerji}$.
ATP üretim yolları: **substrat düzeyinde fosforilasyon**, **oksidatif fosforilasyon** (solunum ETS), **fotofosforilasyon** (fotosentez).

# Fotosentez
$$6CO_2 + 12H_2O \xrightarrow[\text{klorofil}]{\text{ışık}} C_6H_{12}O_6 + 6O_2 + 6H_2O$$
(Sadeleştirilmiş: $6CO_2 + 6H_2O \to C_6H_{12}O_6 + 6O_2$)

**Kloroplast:** dış ve iç zar, **tilakoit** (granalar) ve **stroma**.

| | Işığa bağımlı tepkimeler | Işıktan bağımsız tepkimeler (Calvin döngüsü) |
|---|---|---|
| Yer | **Tilakoit zar** | **Stroma** |
| Girdi | Işık, su, ADP, NADP⁺ | CO₂, ATP, NADPH |
| Olaylar | **Suyun fotolizi** → O₂ açığa çıkar; elektron taşıma; **fotofosforilasyon** | **CO₂ tutulması** (RuBisCO enzimi, RuBP), indirgenme, RuBP'nin yenilenmesi |
| Ürün | **ATP, NADPH, O₂** | **Glikoz** (PGAL üzerinden), ADP, NADP⁺ |

> Açığa çıkan **O₂ sudan** gelir (izotop deneyleri).

**Fotosentez hızını etkileyen faktörler:** ışık şiddeti ve dalga boyu (en etkili **mor-mavi ve kırmızı**, en az yeşil), CO₂ derişimi, sıcaklık (enzim), su, klorofil miktarı, mineral (Mg, N). **Sınırlayıcı faktör ilkesi:** Hızı en az bulunan faktör belirler.

# Kemosentez
Işık yerine **inorganik maddelerin oksidasyonundan** elde edilen enerjiyle organik madde üretimi. Yalnızca bazı **bakteri ve arkelerde**.
- **Nitrifikasyon bakterileri:** $NH_3 \to NO_2^- \to NO_3^-$ (azot döngüsü).
- Kükürt, demir bakterileri; okyanus tabanındaki **hidrotermal bacalarda** ekosistemlerin üreticileri.
""",
  [("Fotosentezde açığa çıkan oksijenin kaynağı nedir? Nasıl kanıtlanmıştır?", "Kaynak **su**dur. Ağır oksijen izotopu (¹⁸O) içeren su verilen bitkilerde açığa çıkan O₂'nin ¹⁸O içerdiği, işaretli CO₂ verildiğinde ise O₂'nin işaretsiz olduğu gösterilmiştir.")],
  ["Işık tepkimeleri tilakoitte: fotoliz, ATP, NADPH, O₂.", "Calvin döngüsü stromada: CO₂ tutulur, glikoz üretilir.", "Kemosentez: inorganik madde oksidasyonu (nitrifikasyon)."]),
O("k2", "2.2", "Hücresel solunum ve fermantasyon", "Cellular respiration and fermentation", r"""
# Oksijenli Solunum
$$C_6H_{12}O_6 + 6O_2 \to 6CO_2 + 6H_2O + \text{enerji (ATP + ısı)}$$

| Evre | Yer | Olay | Net kazanç (1 glikoz) |
|---|---|---|---|
| **Glikoliz** | **Sitoplazma** | Glikoz → 2 **pirüvat**; O₂ gerekmez | 2 ATP, 2 NADH |
| **Pirüvat oksidasyonu** | Mitokondri matriksi | Pirüvat → **asetil-CoA** + CO₂ | 2 NADH |
| **Krebs döngüsü** | **Matriks** | Asetil-CoA tamamen yıkılır, **CO₂** çıkar | 2 ATP, 6 NADH, 2 FADH₂ |
| **ETS ve oksidatif fosforilasyon** | **Mitokondri iç zarı (kristalar)** | NADH ve FADH₂'nin elektronları zincirden geçer; son elektron alıcısı **O₂** → **H₂O**; ATP sentaz | ~26–28 ATP |
| **Toplam** | | | **~30–32 ATP** |

**Kemiozmoz:** ETS'de matriksten zarlar arası boşluğa pompalanan H⁺ iyonları **ATP sentaz** üzerinden geri akarken ATP üretilir.

# Oksijensiz Solunum ve Fermantasyon
O₂ yoksa yalnızca **glikoliz** çalışır; NAD⁺'nin yenilenmesi için fermantasyon yapılır. **Net 2 ATP**.

| Fermantasyon | Ürün | Örnek |
|---|---|---|
| **Etil alkol** | Etanol + **CO₂** | Maya: ekmeğin kabarması, sirke ve alkol üretimi |
| **Laktik asit** | **Laktik asit** (CO₂ yok) | Yoğurt bakterileri; yorgun **çizgili kas** hücreleri |

# Karşılaştırma
| | Oksijenli solunum | Fermantasyon |
|---|---|---|
| O₂ | Gerekli | Gerekmez |
| Son ürün | CO₂ + H₂O (inorganik) | Etanol/laktik asit (organik — hâlâ enerji içerir) |
| ATP | ~30–32 | 2 |
| Yer | Sitoplazma + mitokondri | Sitoplazma |

> **Fotosentez ↔ solunum:** Birinin ürünleri diğerinin girdileridir; enerji **ışık → kimyasal → ATP → ısı** olarak akar, madde (C, O, H) döngüdedir.
""",
  [("Ağır egzersizden sonra kaslarda yorgunluk ve kramp hissedilmesinin nedeni nedir?", "Kaslara yeterli **O₂** ulaşamayınca hücreler **laktik asit fermantasyonu** yapar; biriken laktik asit ve iyon dengesindeki değişiklikler yorgunluk hissine katkıda bulunur. Dinlenince laktat karaciğerde geri dönüştürülür.")],
  ["Glikoliz sitoplazma; Krebs matriks; ETS iç zar.", "Son elektron alıcısı O₂; ~30–32 ATP.", "Fermantasyon net 2 ATP: etil alkol ve laktik asit."]),
]),
U("u3", "3. Ünite: Bitki Biyolojisi", "Unit 3: Plant Biology", [
O("k1", "3.1", "Bitkinin yapısı: dokular ve organlar", "Plant structure: tissues and organs", r"""
# Bitki Dokuları
| Doku | Özellik ve görev |
|---|---|
| **Meristem (bölünür doku)** | Sürekli bölünür. **Uç (apikal) meristem** → boyca büyüme; **yanal meristem (kambiyum)** → enine büyüme (odunsu bitkiler, yıllık halkalar) |
| **Örtü doku** | **Epidermis** (kütikula, stoma, tüyler); yaşlı gövdede **mantar (periderm)** |
| **Temel doku – parankima** | Fotosentez (**palizat ve sünger parankiması**), depolama, havalandırma |
| **Destek – kollenkima** | Canlı, köşeleri kalınlaşmış hücreler; genç gövde ve yaprak sapı |
| **Destek – sklerenkima** | Ölü, **lignin**li hücreler; sert kabuk ve lifler (keten, ceviz kabuğu) |
| **İletim – ksilem (odun borusu)** | **Su ve mineralleri** kökten yukarı taşır; trake ve trakeitler **ölü** hücreler |
| **İletim – floem (soymuk borusu)** | **Organik besinleri** (sakaroz) her yöne taşır; kalburlu borular ve arkadaş hücreleri **canlı** |

# Organlar
- **Kök:** Tutunma, **su-mineral emilimi** (emici tüyler), depolama (havuç). **Kazık kök** (dikotiller) ve **saçak kök** (monokotiller).
- **Gövde:** Destek, iletim, depolama (patates yumrusu). Monokotillerde iletim demetleri **dağınık**, dikotillerde **halka** şeklinde.
- **Yaprak:** Fotosentez, gaz alışverişi, **terleme**. Ayası, sapı; damarlanma monokotillerde **paralel**, dikotillerde **ağsı**.

| | Monokotil | Dikotil |
|---|---|---|
| Çenek | 1 | 2 |
| Kök | Saçak | Kazık |
| Yaprak damarı | Paralel | Ağsı |
| Gövdede iletim demetleri | Dağınık | Halkasal |
| Kambiyum | Genellikle yok | Var |
| Örnek | Buğday, mısır, lale | Fasulye, gül, meşe |
""",
  [("Ağaçlarda yıllık halkaların oluşmasını sağlayan doku hangisidir?", "**Kambiyum (yanal meristem)**; ilkbaharda geniş, yaz sonunda dar hücreler üreterek her yıl bir **halka** oluşturur. Halka sayısı ağacın yaşını verir.")],
  ["Meristem büyür; parankima fotosentez/depo; kollenkima ve sklerenkima destek.", "Ksilem su-mineral (ölü); floem organik besin (canlı).", "Monokotil–dikotil farkları."]),
O("k2", "3.2", "Bitkilerde taşıma, beslenme, hormon ve hareket", "Transport, nutrition, hormones and movement in plants", r"""
# Su ve Mineral Taşınması (Ksilem)
1. **Emilim:** Emici tüyler suyu **osmozla**, mineralleri **aktif taşıma** ve difüzyonla alır.
2. **Kök basıncı:** Mineral birikimiyle kökte oluşan basınç suyu yukarı iter (gece **gutasyon**).
3. **Kohezyon–gerilim (terleme–çekim) teorisi:** Yapraklardaki **terleme** su moleküllerini yukarı çeker; su molekülleri arasındaki **kohezyon** ve damar çeperine **adezyon** su sütununu koparmadan taşır. **Uzun ağaçlarda temel mekanizma**.

**Stomaların açılıp kapanması:** Bekçi hücrelerine K⁺ girişi → su girer → turgor ↑ → stoma **açılır**. Kuraklıkta **absisik asit** stomaları kapatır.

# Organik Madde Taşınması (Floem)
**Basınç–akış (kütle akışı) hipotezi:** Şeker **kaynakta** (yaprak) floeme yüklenir → su girer, basınç artar → şekerli su basıncın düşük olduğu **havuza** (kök, meyve) akar. Taşıma **her iki yönde** olabilir.

# Bitkilerde Beslenme
**Makro elementler:** N, P, K, Ca, Mg, S. **Mikro elementler:** Fe, Mn, Zn, Cu, B, Mo, Cl.
- **N** eksikliği → yaşlı yapraklarda sararma; **Mg** klorofilin yapısında.
- **Azot bağlayıcı bakteriler** (baklagil köklerindeki *Rhizobium*), **mikoriza** mantarları.
- Böcekçil bitkiler (Venüs sinekkapan) azot eksikliğini böceklerden karşılar.

# Hormonlar ve Hareketler (Özet)
| Hormon | Etki |
|---|---|
| Oksin | Hücre uzaması, fototropizma, tepe baskınlığı |
| Giberellin | Çimlenme, gövde uzaması |
| Sitokinin | Hücre bölünmesi, yaşlanmayı geciktirme |
| Absisik asit | Stoma kapanması, dormansi |
| Etilen | Meyve olgunlaşması, yaprak dökümü |

**Tropizma** (yöne bağlı, büyümeyle): foto-, gravi-, hidro-, tigmotropizma. **Nasti** (yönden bağımsız, turgorla): sismonasti (küstüm otu), fotonasti, termonasti.
""",
  [("Çok sıcak ve kuru bir günde bitkide su taşınması nasıl etkilenir?", "Terleme artar, su kaybı hızlanır; su yetersizse **absisik asit** stomaları **kapatır**. Bu su kaybını azaltır ama **CO₂ alımını** ve dolayısıyla **fotosentezi** de düşürür.")],
  ["Ksilemde taşıma: kök basıncı + kohezyon–gerilim (terleme).", "Floemde basınç–akış: kaynaktan havuza.", "Makro (N, P, K…) ve mikro elementler; hormonlar ve hareketler."]),
O("k3", "3.3", "Bitkilerde eşeysiz ve eşeyli üreme", "Asexual and sexual reproduction in plants", r"""
# Eşeysiz Üreme
- **Sporla üreme:** Eğrelti, kara yosunları.
- **Vejetatif üreme:** Gövde, kök ya da yapraktan yeni birey.
  - **Yumru** (patates), **soğan** (lale), **rizom** (zencefil, ayrık otu), **stolon** (çilek), **çelik** (söğüt, gül), **daldırma**, **aşılama** (meyve ağaçları).
- Yeni bireyler **genetik olarak aynıdır** → istenen özellikler korunur; ama çevre değişimine karşı çeşitlilik azdır.

# Çiçekli Bitkilerde Eşeyli Üreme
**Çiçeğin kısımları:** çanak yaprak, taç yaprak, **erkek organ (stamen: başçık + sapçık)**, **dişi organ (pistil: tepecik, dişicik borusu, yumurtalık)**.

1. **Başçıkta** mayozla **polen** oluşur (içinde **generatif** ve **vejetatif (tüp)** çekirdekler).
2. **Tozlaşma:** Polen tepeciğe taşınır (rüzgâr, böcek, su).
3. **Polen tüpü** dişicik borusundan yumurtalığa ilerler; generatif çekirdek mitozla **iki sperm** çekirdeği oluşturur.
4. **Çift döllenme** (kapalı tohumlulara özgü):
   - 1 sperm + **yumurta** → **zigot (2n)** → **embriyo**
   - 1 sperm + **iki kutup çekirdeği** → **endosperm (3n)** → besin dokusu
5. **Tohum** tohum taslağından, **meyve** yumurtalık duvarından gelişir.

# Tohum ve Çimlenme
- Tohum: **embriyo**, **endosperm/çenekler** (besin), **tohum kabuğu**.
- Çimlenme için: **su** (şişme), **uygun sıcaklık**, **O₂**; bazı tohumlarda ışık. **Giberellin** çimlenmeyi başlatır, **ABA** dormansiyi sürdürür.
- **Partenokarpi:** Döllenme olmadan meyve oluşumu (çekirdeksiz muz, oksin/giberellin uygulamaları).
""",
  [("Kapalı tohumlularda 'çift döllenme' neden adını almıştır?", "İki sperm çekirdeği **iki ayrı döllenme** yapar: biri yumurtayla birleşip **zigotu (2n)**, diğeri iki kutup çekirdeğiyle birleşip **endospermi (3n)** oluşturur.")],
  ["Vejetatif üreme: yumru, soğan, stolon, çelik, aşı.", "Çift döllenme: zigot 2n, endosperm 3n.", "Tohum taslaktan, meyve yumurtalıktan; çimlenmede su, sıcaklık, O₂."]),
]),
U("u4", "4. Ünite: Canlılar ve Çevre", "Unit 4: Living Things and the Environment", [
O("k1", "4.1", "Popülasyon ve komünite ekolojisi", "Population and community ecology", r"""
# Ekolojinin Düzeyleri
birey → **popülasyon** (aynı türün belirli alandaki bireyleri) → **komünite** (farklı popülasyonlar) → **ekosistem** (komünite + cansız çevre) → biyom → **biyosfer**.

# Popülasyon
- **Popülasyon yoğunluğu** = birey sayısı / alan.
- **Büyüme:** (doğum + göçle gelen) − (ölüm + göçle giden).
- **Üstel (J) büyüme:** Sınırsız kaynakta hızlı artış.
- **Lojistik (S) büyüme:** Kaynaklar sınırlıdır; popülasyon **taşıma kapasitesine (K)** yaklaşınca büyüme yavaşlar.
- **Sınırlayıcı faktörler:** Yoğunluğa bağlı (besin, rekabet, hastalık, avcı) ve yoğunluktan bağımsız (sel, yangın, iklim).
- **Yaş piramitleri:** Geniş tabanlı → hızlı büyüyen; dikdörtgen → durağan; dar tabanlı → küçülen popülasyon.

# Komünitede Türler Arası İlişkiler
| İlişki | Tür 1 | Tür 2 | Örnek |
|---|---|---|---|
| **Rekabet** | − | − | Aynı besine yönelen türler (**rekabetle dışlama**) |
| **Av–avcı (predatörlük)** | + | − | Vaşak–tavşan (döngüsel popülasyonlar) |
| **Mutualizm** | + | + | Liken (mantar + alg), mikoriza, baklagil–*Rhizobium* |
| **Kommensalizm** | + | 0 | Köpek balığı–vantuz balığı |
| **Parazitlik** | + | − | Tenya, bit, küsüt bitkisi |

**Ekolojik niş:** Bir türün komünitedeki "mesleği" (beslenme, yaşam alanı, etkinlik zamanı). **Habitat:** "adresi".
**Süksesyon:** Komünitenin zamanla değişimi — **birincil** (çıplak kaya, öncü tür liken) ve **ikincil** (yangın sonrası).
""",
  [("Bir adaya getirilen tavşan popülasyonunun önce hızlı artıp sonra sabitlenmesi nasıl açıklanır?", "Başta kaynaklar bol olduğu için **üstel** artış olur; birey sayısı arttıkça besin ve alan **sınırlanır**, rekabet ve hastalık artar; popülasyon **taşıma kapasitesine** ulaşınca büyüme durur (**S eğrisi**).")],
  ["Popülasyon → komünite → ekosistem.", "J (üstel) ve S (lojistik) büyüme; taşıma kapasitesi.", "Rekabet, av–avcı, mutualizm, kommensalizm, parazitlik."]),
O("k2", "4.2", "Ekosistemde enerji akışı ve madde döngüleri", "Energy flow and nutrient cycles in ecosystems", r"""
# Ekosistemin Bileşenleri
- **Üreticiler (ototroflar):** Fotosentetik bitkiler, algler, kemosentetik bakteriler.
- **Tüketiciler (heterotroflar):** Otçul (birincil), etçil (ikincil, üçüncül), hepçil.
- **Ayrıştırıcılar:** Bakteri ve mantarlar; ölü organik maddeyi inorganiğe çevirir → **madde döngüsünü** tamamlar.

# Enerji Akışı
- Enerji **tek yönlü** akar: Güneş → üretici → tüketiciler → ısı olarak kaybolur.
- **%10 kuralı:** Bir trofik düzeyden sonrakine enerjinin yaklaşık **%10'u** aktarılır; geri kalanı solunum ve ısıyla kaybolur. Bu yüzden besin zincirleri genellikle 4–5 halkayı geçmez.
- **Besin zinciri:** Ot → çekirge → kurbağa → yılan → kartal. **Besin ağı:** Birbirine bağlı zincirler.
- **Ekolojik piramitler:** Enerji piramidi her zaman düzdür; sayı ve biyokütle piramitleri ters olabilir.
- **Biyolojik birikim:** DDT, cıva gibi parçalanmayan maddeler üst trofik düzeylerde **birikerek** artar.

# Madde Döngüleri
| Döngü | Ana süreçler |
|---|---|
| **Su** | Buharlaşma, terleme, yoğuşma, yağış, sızma, yüzey akışı |
| **Karbon** | Fotosentez (CO₂ tutulur) ↔ solunum, ayrışma, **fosil yakıt yakma** (CO₂ salınır); okyanuslar ve kireçtaşı depo |
| **Azot** | **Azot bağlama** (N₂ → NH₃: *Rhizobium*, siyanobakteri, yıldırım) → **nitrifikasyon** (NH₃ → NO₂⁻ → NO₃⁻) → bitkilerce alım → **amonifikasyon** (ölü maddeden NH₃) → **denitrifikasyon** (NO₃⁻ → N₂) |
| **Fosfor** | Atmosfer evresi yok; kayaçların aşınması → toprak/su → canlılar → çökelme |

> Madde **döngüsel**, enerji **tek yönlü**dür.
""",
  [("Bir besin zincirinde üreticilerde 10 000 kJ enerji varsa üçüncül tüketiciye ne kadar ulaşır?", "Her basamakta ~%10: birincil tüketici 1000, ikincil 100, **üçüncül tüketici ~10 kJ**."),
   ("Azot döngüsünde ayrıştırıcıların rolü nedir?", "Ölü organizma ve atıklardaki organik azotu **amonyağa** dönüştürürler (**amonifikasyon**); böylece azot yeniden **nitrifikasyonla** bitkilerin kullanabileceği nitrata dönüşebilir.")],
  ["Enerji tek yönlü, %10 kuralı; madde döngüsel.", "Biyolojik birikim üst düzeylerde artar.", "Azot: bağlama, nitrifikasyon, amonifikasyon, denitrifikasyon."]),
O("k3", "4.3", "Çevre sorunları ve koruma", "Environmental problems and conservation", r"""
# Başlıca Çevre Sorunları
| Sorun | Neden | Sonuç |
|---|---|---|
| **Küresel ısınma** | Sera gazları (CO₂, CH₄, N₂O) | İklim değişikliği, buzul erimesi, kuraklık |
| **Hava kirliliği** | Fosil yakıt, sanayi, trafik | Solunum hastalıkları, **asit yağmuru** (SO₂, NOₓ) |
| **Ozon incelmesi** | **CFC**'ler | UV artışı, cilt kanseri — Montreal Protokolü (1987) ile iyileşme |
| **Su kirliliği** | Atık su, gübre | **Ötrofikasyon**: aşırı alg çoğalması → O₂ azalır → canlı ölümleri |
| **Toprak kirliliği ve erozyon** | Pestisit, ağır metal, yanlış tarım | Verim kaybı, çölleşme |
| **Habitat kaybı** | Ormansızlaşma, kentleşme | **Biyoçeşitlilik kaybı**, tür yok oluşu |
| **İstilacı türler** | İnsanla taşınan yabancı türler | Yerli türlerin baskılanması (aslan balığı) |
| **Plastik ve mikroplastik** | Tek kullanımlık plastikler | Besin zincirinde birikim |

# Biyoçeşitlilik ve Koruma
- **Biyoçeşitlilik:** Genetik, tür ve ekosistem çeşitliliği. Türkiye, Avrupa ve Orta Doğu'da **endemik** tür bakımından en zengin ülkelerdendir (yaklaşık 3000'den fazla endemik bitki türü).
- **Koruma stratejileri:** **Millî parklar**, tabiat parkları, **Ramsar** alanları, **gen bankaları** (Türkiye Tohum Gen Bankası), yerinde (in situ) ve yer dışında (ex situ) koruma, **CITES** (nesli tehlikedeki türlerin ticareti).
- **Sürdürülebilirlik:** Yenilenebilir enerji, geri dönüşüm, ekolojik ayak izini azaltma, organik tarım, bilinçli tüketim.
""",
  [("Tarlalarda aşırı gübre kullanımı göllerde canlı ölümlerine nasıl yol açar?", "Yıkanan azot ve fosfor göle ulaşır, **alg patlaması** olur (**ötrofikasyon**). Algler ölünce ayrıştırıcılar onları parçalarken **oksijeni tüketir**; O₂ azalınca balık ve diğer canlılar ölür.")],
  ["Küresel ısınma, asit yağmuru, ozon incelmesi, ötrofikasyon.", "Biyoçeşitlilik: genetik, tür, ekosistem; Türkiye endemik türce zengin.", "Koruma: millî park, gen bankası, CITES, sürdürülebilirlik."]),
]),
]

write("biy-12.js", "12/biyoloji", "12. Sınıf Biyoloji — detaylı konu anlatım notları",
      "kullanıcının verdiği \"Biyoloji 12 Detaylı Konu Anlatım Notları\" (4 ünite).",
      units, "Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (keşif tarihçesi, replikasyon ve translasyon basamakları, solunum tablosu, çift döllenme, madde döngüleri, çözümlü sorular).")
