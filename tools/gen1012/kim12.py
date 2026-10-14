# -*- coding: utf-8 -*-
"""12. Sınıf Kimya notları (genişletilmiş) → js/data/content/kim-12.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Kimya ve Elektrik", "Unit 1: Chemistry and Electricity", [
O("k1", "1.1", "Redoks tepkimeleri ve denkleştirme", "Redox reactions and balancing", r"""
# Temel Kavramlar
| Kavram | Tanım |
|---|---|
| **Yükseltgenme** | **Elektron kaybı**; yükseltgenme basamağı **artar** |
| **İndirgenme** | **Elektron kazanma**; basamak **azalır** |
| **İndirgen** | Kendisi **yükseltgenen**, karşısındakini indirgeyen madde |
| **Yükseltgen** | Kendisi **indirgenen**, karşısındakini yükseltgeyen madde |

> Elektron alışverişi aynı anda olur: verilen elektron sayısı = alınan elektron sayısı.

# Yükseltgenme Basamağı Kuralları
- Element hâlinde: **0** ($Na$, $O_2$, $Fe$).
- Tek atomlu iyonda iyon yükü ($Na^+$: +1).
- Bileşikte: **H +1** (metal hidrürlerde −1), **O −2** (peroksitlerde −1), **1A +1**, **2A +2**, **F −1**.
- Nötr bileşikte toplam **0**, çok atomlu iyonda toplam **iyon yükü**.

**Örnek:** $KMnO_4$ → $+1 + x + 4(-2) = 0 \Rightarrow Mn = +7$.

# Denkleştirme (Yarı Tepkime Yöntemi)
1. Yükseltgenme ve indirgenme yarı tepkimelerini yaz.
2. O ve H dışındaki atomları denkleştir.
3. **Asidik ortamda:** O için **H₂O**, H için **H⁺** ekle. **Bazik ortamda:** önce asidik gibi denkleştir, sonra H⁺ sayısı kadar **OH⁻** ekleyerek H₂O'ya çevir.
4. Yükleri **elektron** ile eşitle.
5. Verilen ve alınan elektron sayılarını eşitleyip yarı tepkimeleri topla.

**Örnek (asidik):** $MnO_4^- + Fe^{2+} \to Mn^{2+} + Fe^{3+}$
- İndirgenme: $MnO_4^- + 8H^+ + 5e^- \to Mn^{2+} + 4H_2O$
- Yükseltgenme: $5Fe^{2+} \to 5Fe^{3+} + 5e^-$
- Toplam: $MnO_4^- + 8H^+ + 5Fe^{2+} \to Mn^{2+} + 5Fe^{3+} + 4H_2O$
""",
  [(r"$Zn + Cu^{2+} \to Zn^{2+} + Cu$ tepkimesinde indirgen ve yükseltgen hangisidir?", r"$Zn$ elektron verir (0 → +2): **yükseltgenir, indirgendir**. $Cu^{2+}$ elektron alır (+2 → 0): **indirgenir, yükseltgendir**.")],
  ["Yükseltgenme e⁻ kaybı, indirgenme e⁻ kazancı.", "İndirgen kendisi yükseltgenir.", "Asidik ortamda H₂O ve H⁺ ile denkleştir."]),
O("k2", "1.2", "Elektrokimyasal hücreler ve elektrot potansiyelleri", "Electrochemical cells and electrode potentials", r"""
# Galvanik (Volta) Hücre
**Kendiliğinden** yürüyen redoks tepkimesiyle **kimyasal enerji → elektrik enerjisi**.
- **Anot:** **Yükseltgenme**, **(−)** kutup, kütlesi azalır.
- **Katot:** **İndirgenme**, **(+)** kutup, kütlesi artar.
- Elektronlar dış devrede **anottan katoda** akar.
- **Tuz köprüsü:** İyon akışıyla yük dengesini sağlar; anyonlar anoda, katyonlar katoda gider.

**Daniell pili:** $Zn | Zn^{2+} || Cu^{2+} | Cu$ — $Zn$ anot, $Cu$ katot, $E^\circ = 1{,}10$ V.

# Standart Elektrot Potansiyeli
- Referans: **Standart hidrojen elektrodu (SHE)** → $E^\circ = 0{,}00$ V (25 °C, 1 M, 1 atm).
- **İndirgenme potansiyeli** büyük olan **katot** olur.
$$E^\circ_{hücre} = E^\circ_{katot} - E^\circ_{anot} \quad (\text{indirgenme potansiyelleriyle})$$
- $E^\circ_{hücre} > 0$ → tepkime **istemli** (kendiliğinden).
- Aktif metaller (Li, K, Na, Zn) kolay yükseltgenir; soy metaller (Cu, Ag, Au) zor.

# Nernst Denklemi (Derişimin Etkisi)
$$E = E^\circ - \frac{0{,}0592}{n}\log Q$$
**Derişim pili:** Aynı elektrotlar, farklı derişimler; seyreltik taraf **anot**. Derişimler eşitlenince pil biter.

# Elektrolitik Hücre
**Dış akımla** istemsiz tepkimenin yürütülmesi: **elektrik → kimyasal enerji**.
- **Anot (+):** yükseltgenme. **Katot (−):** indirgenme.
- Örnekler: suyun elektrolizi, eriyik NaCl'den Na eldesi, **metal kaplama**, alüminyum üretimi, bakır saflaştırma.
""",
  [(r"$E^\circ(Ag^+/Ag) = +0{,}80$ V, $E^\circ(Zn^{2+}/Zn) = -0{,}76$ V. Bu iki yarı hücreden oluşan pilin anodu, katodu ve potansiyeli nedir?", r"İndirgenme potansiyeli büyük olan $Ag$ **katot**, $Zn$ **anot**. $E^\circ = 0{,}80 - (-0{,}76) = 1{,}56$ V.")],
  ["Galvanik: istemli, anot (−) yükseltgenme.", r"$E^\circ_{hücre}=E^\circ_{katot}-E^\circ_{anot}$; pozitifse istemli.", "Elektrolitik: dış akım, anot (+)."]),
O("k3", "1.3", "Piller, elektroliz ve Faraday yasaları; korozyon", "Batteries, electrolysis, Faraday's laws; corrosion", r"""
# Günlük Hayatta Piller
| Pil | Özellik |
|---|---|
| **Kuru (Leclanché) pil** | Zn anot, MnO₂/C katot; şarj edilemez |
| **Alkali pil** | Bazik elektrolit, daha uzun ömür |
| **Kurşun–asit akü** | Araçlarda; **şarj edilebilir** (Pb, PbO₂, H₂SO₄) |
| **Lityum-iyon** | Telefon, bilgisayar, elektrikli araç; hafif, yüksek enerji yoğunluğu |
| **Yakıt pili** | $H_2 + O_2 \to H_2O$; sürekli yakıt beslemesi, atığı yalnızca su |

# Faraday Yasaları
1 mol elektronun yükü: **1 Faraday ≈ 96 500 C**.
$$Q = I \cdot t \qquad n_e = \frac{Q}{F} \qquad m = \frac{I\,t\,M_A}{n\,F}$$
($n$: iyonun yükü / aktarılan elektron sayısı, $M_A$: mol kütlesi)
- Seri bağlı kaplarda **her kaptan geçen elektron sayısı aynıdır**.

**Örnek:** $Cu^{2+}$ çözeltisinden 2 A akım 9650 s geçerse:
$n_e = \dfrac{2 \cdot 9650}{96500} = 0{,}2$ mol e⁻ → $Cu$: $0{,}1$ mol $= 6{,}4$ g.

# Korozyon
Metallerin çevreyle (O₂, su) **elektrokimyasal** tepkimesiyle aşınması. Demirin paslanması:
- Anot bölgede: $Fe \to Fe^{2+} + 2e^-$
- Katot bölgede: $O_2 + 2H_2O + 4e^- \to 4OH^-$
- Sonuç: $Fe_2O_3 \cdot xH_2O$ (pas). Tuzlu su ve nem paslanmayı **hızlandırır**.

**Korunma yöntemleri:**
- **Boya, yağ, plastik kaplama** (yüzeyi yalıtma)
- **Galvanizleme** (çinko kaplama) ve **katodik koruma (kurban anot)**: daha aktif metal (Zn, Mg) yükseltgenir, demiri korur — gemi gövdeleri, boru hatları.
- **Alaşım** (paslanmaz çelik: Cr, Ni)
- **Pasivasyon** (alüminyumun oksit tabakası)
""",
  [("Gemi gövdelerine magnezyum ya da çinko blokların bağlanmasının nedeni nedir?", "**Katodik koruma (kurban anot):** Mg ve Zn demirden **daha aktif** olduğu için onlar **yükseltgenir** (aşınır); demir katot olur ve paslanmaz. Bloklar zamanla yenilenir.")],
  ["Lityum-iyon, kurşun-asit şarj edilebilir; yakıt pili su üretir.", r"Faraday: $m=\frac{ItM_A}{nF}$, 1 F ≈ 96 500 C.", "Korozyon elektrokimyasal; galvanizleme ve kurban anot."]),
]),
U("u2", "2. Ünite: Karbon Kimyasına Giriş", "Unit 2: Introduction to Carbon Chemistry", [
O("k1", "2.1", "Organik bileşikler, hibritleşme ve molekül geometrisi", "Organic compounds, hybridization and molecular geometry", r"""
# Organik ve İnorganik Bileşikler
**Wöhler (1828)** inorganik maddeden **üre** sentezleyerek "yaşam gücü" kuramını çürüttü. **Organik bileşik:** Karbonun genellikle H, O, N, S, halojenlerle oluşturduğu bileşikler (CO, CO₂, karbonatlar, siyanürler hariç).

| Organik | İnorganik |
|---|---|
| Kovalent bağlı | Çoğu iyonik |
| Erime-kaynama noktası düşük | Yüksek |
| Çoğu suda az çözünür, organik çözücülerde çözünür | Çoğu suda çözünür |
| Yanıcıdır | Genellikle yanmaz |
| İzomeri yaygın | İzomeri az |

# Karbonun Özellikleri
- 4 değerlik elektronu → **4 kovalent bağ**.
- **Katenasyon:** Karbon atomlarının birbirine bağlanarak düz, dallı ve halkalı uzun zincirler oluşturması.
- Tekli, ikili, üçlü bağ yapabilmesi; **allotroplar**: elmas, grafit, grafen, fulleren.

# Hibritleşme
| Hibrit | Bağ durumu | Geometri | Bağ açısı | Örnek |
|---|---|---|---|---|
| **sp³** | 4 tekli bağ | **Düzgün dörtyüzlü** | 109,5° | $CH_4$ |
| **sp²** | 1 ikili + 2 tekli | **Düzlem üçgen** | 120° | $C_2H_4$ |
| **sp** | 1 üçlü + 1 tekli ya da 2 ikili | **Doğrusal** | 180° | $C_2H_2$ |

**σ (sigma) bağı:** Uç uca örtüşme; her bağda **bir** tane. **π (pi) bağı:** Yan yana örtüşme; ikili bağda 1, üçlü bağda 2.

# Lewis Yapıları ve VSEPR
**VSEPR:** Merkez atom çevresindeki elektron grupları (bağ ve **ortaklanmamış çift**) birbirini **iterek** en uzak konumlara yerleşir.
| Molekül | Bağ / ortaklanmamış çift | Geometri |
|---|---|---|
| $CH_4$ | 4 / 0 | Düzgün dörtyüzlü |
| $NH_3$ | 3 / 1 | **Üçgen piramit** (107°) |
| $H_2O$ | 2 / 2 | **Kırık doğru (açısal)** (104,5°) |
| $BF_3$ | 3 / 0 | Düzlem üçgen |
| $CO_2$ | 2 (ikili) / 0 | Doğrusal |

Ortaklanmamış çiftler daha fazla iter → bağ açıları küçülür.
""",
  [(r"$CH_2 = CH - C \equiv CH$ molekülündeki karbonların hibritleşmesi ve toplam σ, π bağ sayısı nedir?", r"İkili bağlı iki C: **sp²**; üçlü bağlı iki C: **sp**. Bağlar: C=C (1σ+1π), C–C (1σ), C≡C (1σ+2π), 4 C–H (4σ) → **7 σ, 3 π**.")],
  ["Wöhler üre sentezi; karbon 4 bağ ve katenasyon.", "sp³ 109,5°, sp² 120°, sp 180°.", "VSEPR: NH₃ üçgen piramit, H₂O kırık doğru."]),
]),
U("u3", "3. Ünite: Organik Bileşikler", "Unit 3: Organic Compounds", [
O("k1", "3.1", "Hidrokarbonlar ve IUPAC adlandırma", "Hydrocarbons and IUPAC nomenclature", r"""
# Hidrokarbonlar (yalnızca C ve H)
| Sınıf | Genel formül | Bağ | Hibrit | Örnek |
|---|---|---|---|---|
| **Alkanlar** | $C_nH_{2n+2}$ | Tekli | sp³ | Metan, propan, bütan (LPG) |
| **Alkenler** | $C_nH_{2n}$ | Bir ikili | sp² | Eten (etilen) — polietilen, meyve olgunlaştırma |
| **Alkinler** | $C_nH_{2n-2}$ | Bir üçlü | sp | Etin (asetilen) — kaynak alevi |
| **Sikloalkanlar** | $C_nH_{2n}$ | Halkalı, tekli | sp³ | Siklohekzan |
| **Aromatikler** | — | Benzen halkası (rezonans) | sp² | Benzen, toluen, naftalin |

**Kök adları:** 1 met, 2 et, 3 prop, 4 büt, 5 pent, 6 heks, 7 hept, 8 okt, 9 non, 10 dek.

# IUPAC Adlandırma Kuralları
1. **En uzun karbon zincirini** (ana zincir) bul; alken/alkinde ikili/üçlü bağı içermeli.
2. Zinciri, **dallanma** (ya da çoklu bağ) **en küçük numarayı** alacak uçtan numaralandır.
3. Dalların yerini ve adını yaz (**metil, etil**…); aynı daldan birden fazlaysa **di-, tri-**.
4. Dalları **alfabetik** sıraya koy, ana zincir adıyla bitir.

**Örnek:** $CH_3-CH(CH_3)-CH_2-CH_3$ → **2-metilbütan**. $CH_2=CH-CH_2-CH_3$ → **1-büten**.

# İzomeri
Aynı kapalı formül, farklı yapı:
- **Yapı izomerleri:** Zincir (bütan / 2-metilpropan), konum (1-büten / 2-büten), fonksiyonel grup izomerleri (etanol / dimetil eter).
- **Geometrik (cis–trans) izomeri:** İkili bağın iki karbonunda farklı gruplar varsa.

# Özellikler ve Tepkimeler
- Alkanlar: **yanma**, **halojenlenme** (yer değiştirme); doymuş, az aktif.
- Alkenler ve alkinler: **katılma** tepkimeleri (H₂, Br₂, HCl); **polimerleşme** (eten → polietilen). Brom suyunu renksizleştirir.
- Karbon sayısı arttıkça kaynama noktası **artar**; dallanma kaynama noktasını **düşürür**.
""",
  [(r"$C_5H_{12}$ formülüne sahip kaç yapı izomeri vardır? Adlandırınız.", r"**3** izomer: n-pentan, **2-metilbütan**, **2,2-dimetilpropan**.")],
  [r"Alkan $C_nH_{2n+2}$, alken $C_nH_{2n}$, alkin $C_nH_{2n-2}$.", "IUPAC: en uzun zincir, en küçük numara, alfabetik dallar.", "Doymamışlar katılma ve polimerleşme yapar."]),
O("k2", "3.2", "Fonksiyonel gruplar: alkol, eter, aldehit, keton, karboksilik asit, ester", "Functional groups", r"""
# Fonksiyonel Gruplar
| Sınıf | Grup | Genel yapı | Ad eki | Örnek ve kullanım |
|---|---|---|---|---|
| **Alkol** | –OH | R–OH | **-ol** | **Etanol** (dezenfektan, yakıt), metanol (zehirli), gliserol |
| **Eter** | –O– | R–O–R' | **eter** | Dietil eter (çözücü, eski anestezik) |
| **Aldehit** | –CHO | R–CHO | **-al** | **Metanal (formaldehit)** – formalin, etanal |
| **Keton** | –CO– | R–CO–R' | **-on** | **Propanon (aseton)** – çözücü, oje çıkarıcı |
| **Karboksilik asit** | –COOH | R–COOH | **-oik asit** | **Etanoik asit (asetik asit)** – sirke; metanoik asit (karınca asidi) |
| **Ester** | –COO– | R–COO–R' | **-oat** | Meyve kokuları, parfüm, yağlar |
| **Amin** | –NH₂ | R–NH₂ | **-amin** | Metilamin |

# Önemli Özellikler
- **Alkoller:** Hidrojen bağı yaptıkları için kaynama noktaları benzer kütleli hidrokarbonlardan **yüksektir**; küçük alkoller suda iyi çözünür. Yükseltgenme: **birincil alkol → aldehit → karboksilik asit**; ikincil alkol → **keton**; üçüncül alkol yükseltgenmez.
- **Karboksilik asitler:** **Zayıf asit**; bazlarla tuz oluşturur.
- **Esterleşme:** $$\text{Karboksilik asit} + \text{alkol} \rightleftharpoons \text{ester} + H_2O$$ (H₂SO₄ katalizör). Örnek: asetik asit + etanol → **etil asetat**.
- **Sabunlaşma:** Yağların (gliserol esterleri) NaOH/KOH ile hidrolizi → **sabun** + gliserol.

# Kullanım Alanları
Yakıtlar (etanol, biyodizel), çözücüler (aseton, eter), **polimerler** (PE, PVC, PET, naylon), **ilaçlar** (aspirin: asetilsalisilik asit), gıda katkıları (aroma esterleri, sitrik asit), kozmetik.
""",
  [(r"Etanol yükseltgendiğinde sırasıyla hangi bileşikler oluşur?", r"Etanol ($CH_3CH_2OH$, birincil alkol) → **etanal** ($CH_3CHO$, aldehit) → **etanoik asit** ($CH_3COOH$, karboksilik asit; sirke).")],
  ["Ekler: -ol alkol, -al aldehit, -on keton, -oik asit, -oat ester.", "Birincil alkol → aldehit → asit; ikincil → keton.", "Esterleşme: asit + alkol → ester + su; sabunlaşma."]),
]),
U("u4", "4. Ünite: Enerji Kaynakları ve Bilimsel Gelişmeler", "Unit 4: Energy Sources and Scientific Developments", [
O("k1", "4.1", "Fosil yakıtlar, alternatif enerji kaynakları ve sürdürülebilirlik", "Fossil fuels, alternative energy and sustainability", r"""
# Fosil Yakıtlar
| Yakıt | Bileşim | Not |
|---|---|---|
| **Kömür** | Karbonca zengin (turba → linyit → taş kömürü → antrasit) | En çok CO₂ ve SO₂ salan yakıt |
| **Petrol** | Hidrokarbon karışımı; **ayrımsal damıtma** ile benzin, motorin, gazyağı, asfalt | Kraking ile büyük moleküller küçültülür |
| **Doğal gaz** | Büyük ölçüde **metan** | En az kirleten fosil yakıt |

**Sorunlar:** **Sınırlı** ve yenilenemez; yanınca **CO₂** (küresel ısınma), **SO₂ ve NOₓ** (asit yağmuru), partikül madde, CO salımı. Dışa bağımlılık.

# Alternatif ve Yenilenebilir Kaynaklar
| Kaynak | Avantaj | Dezavantaj |
|---|---|---|
| **Güneş** | Tükenmez, temiz | Geceleri ve bulutlu havada yok, depolama gerekir |
| **Rüzgâr** | Temiz, ucuzlayan | Değişken, gürültü, kuşlar |
| **Hidroelektrik** | Ucuz, depolanabilir | Ekosistem ve yerleşimlere etki |
| **Jeotermal** | Sürekli | Bölgesel, bazı gaz salımları |
| **Biyokütle / biyoyakıt** | Atıklardan enerji, karbon nötre yakın | Tarım alanı rekabeti |
| **Hidrojen** | Yanma ürünü su | Üretim (yeşil H₂), depolama ve taşıma zorluğu |
| **Nükleer** | Çok yüksek enerji, CO₂ salımı yok | Radyoaktif atık, kaza riski, maliyet |

# Sürdürülebilirlik ve Yeşil Kimya
- **Sürdürülebilir kalkınma:** Gelecek kuşakların ihtiyaçlarını tehlikeye atmadan kalkınma.
- **Yeşil kimya ilkeleri:** Atık oluşturmamak, zararsız çözücüler, enerji verimliliği, **yenilenebilir ham maddeler**, katalizör kullanımı, biyobozunur ürünler.
- **Karbon ayak izi**ni azaltma, enerji verimliliği, geri dönüşüm.
""",
  [("Doğal gazın kömüre göre daha 'temiz' bir yakıt sayılmasının kimyasal nedeni nedir?", "Doğal gaz büyük ölçüde **metandır** ($CH_4$); karbon başına daha fazla hidrojen içerdiğinden aynı enerji için **daha az CO₂** üretir ve kükürt içermediği için **SO₂** salımı yok denecek kadar azdır.")],
  ["Fosil yakıtlar sınırlı; CO₂, SO₂, NOₓ salar.", "Yenilenebilir: güneş, rüzgâr, HES, jeotermal, biyokütle, H₂.", "Yeşil kimya: atık önleme, yenilenebilir ham madde."]),
O("k2", "4.2", "Nanoteknoloji ve bilimsel gelişmeler", "Nanotechnology and scientific developments", r"""
# Nanoteknoloji
**1–100 nanometre** ölçeğinde maddenin kontrol edilmesi ve yeni özelliklerin kullanılması. Nano ölçekte **yüzey alanı/hacim oranı** çok büyür; renk, iletkenlik, dayanıklılık, tepkime yeteneği değişir (ör. altın nanoparçacıklar kırmızı-mor görünür).

**Önemli nanomalzemeler:**
- **Grafen:** Tek atom kalınlığında karbon tabakası; çok güçlü, iletken, esnek.
- **Karbon nanotüpler**, **fullerenler** (C₆₀).
- Gümüş nanoparçacıklar (antibakteriyel), titanyum dioksit (fotokatalitik, güneş kremi).

| Alan | Uygulama |
|---|---|
| **Tıp** | Hedefe yönelik **ilaç taşıma**, kanser tedavisi, tanı kitleri |
| **Enerji** | Daha verimli **güneş pilleri**, bataryalar, yakıt pilleri |
| **Malzeme** | Hafif ve dayanıklı kompozitler, çizilmeye dayanıklı yüzeyler, **kendini temizleyen** camlar (lotus etkisi) |
| **Çevre** | **Su arıtma** filtreleri, kirlilik sensörleri |
| **Elektronik** | Daha küçük ve hızlı çipler |
| **Tekstil** | Leke tutmayan, antibakteriyel kumaşlar |

**Riskler:** Nanoparçacıkların solunum yoluyla vücuda girmesi, hücrelere etkisi ve çevrede birikmesi henüz tam bilinmemektedir → **ihtiyatlılık** ve düzenleme gerekir.

# Kimyadaki Diğer Bilimsel Gelişmeler
- **Polimer kimyası:** Biyobozunur plastikler (PLA), akıllı malzemeler.
- **Katalizör ve enzim teknolojileri:** Daha düşük enerjiyle üretim.
- **Karbon yakalama ve depolama.**
- Yapay zekâ destekli **ilaç ve malzeme keşfi**.
""",
  [("Nano boyuttaki bir katalizörün aynı kütledeki iri taneli katalizörden daha etkili olmasının nedeni nedir?", "Nano boyutta **yüzey alanı/hacim oranı** çok büyüktür; tepkimeye girecek moleküllerle temas eden **yüzey atomu sayısı** artar, bu da tepkime hızını yükseltir.")],
  ["Nano: 1–100 nm, büyük yüzey/hacim oranı.", "Grafen, nanotüp, fulleren; tıp, enerji, çevre uygulamaları.", "Sağlık ve çevre riskleri araştırılmalı."]),
]),
]

write("kim-12.js", "12/kimya", "12. Sınıf Kimya — detaylı konu anlatım notları",
      "kullanıcının verdiği \"Kimya 12 Detaylı Konu Anlatım Notları\" (4 ünite).",
      units, "Kaynak notlar kısa özetler hâlinde olduğu için her ünite ders kitabı düzeyinde genişletildi (yükseltgenme basamağı kuralları, yarı tepkime denkleştirme örneği, elektrot potansiyeli ve Faraday hesapları, hibritleşme ve VSEPR tabloları, IUPAC adlandırma, fonksiyonel grup tablosu).")
