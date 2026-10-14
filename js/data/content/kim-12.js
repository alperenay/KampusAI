/* =========================================================
   12. Sınıf Kimya — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Kimya 12 Detaylı Konu Anlatım Notları" (4 ünite).
   Kaynak notlar kısa özetler hâlinde olduğu için her ünite ders kitabı düzeyinde genişletildi (yükseltgenme basamağı kuralları, yarı tepkime denkleştirme örneği, elektrot potansiyeli ve Faraday hesapları, hibritleşme ve VSEPR tabloları, IUPAC adlandırma, fonksiyonel grup tablosu).
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/kimya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Kimya ve Elektrik",
   "en": "Unit 1: Chemistry and Electricity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Redoks tepkimeleri ve denkleştirme",
     "en": "Redox reactions and balancing"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n| Kavram | Tanım |\n|---|---|\n| **Yükseltgenme** | **Elektron kaybı**; yükseltgenme basamağı **artar** |\n| **İndirgenme** | **Elektron kazanma**; basamak **azalır** |\n| **İndirgen** | Kendisi **yükseltgenen**, karşısındakini indirgeyen madde |\n| **Yükseltgen** | Kendisi **indirgenen**, karşısındakini yükseltgeyen madde |\n\n> Elektron alışverişi aynı anda olur: verilen elektron sayısı = alınan elektron sayısı.\n\n# Yükseltgenme Basamağı Kuralları\n\n- Element hâlinde: **0** ($Na$, $O_2$, $Fe$).\n- Tek atomlu iyonda iyon yükü ($Na^+$: +1).\n- Bileşikte: **H +1** (metal hidrürlerde −1), **O −2** (peroksitlerde −1), **1A +1**, **2A +2**, **F −1**.\n- Nötr bileşikte toplam **0**, çok atomlu iyonda toplam **iyon yükü**.\n\n**Örnek:** $KMnO_4$ → $+1 + x + 4(-2) = 0 \\Rightarrow Mn = +7$.\n\n# Denkleştirme (Yarı Tepkime Yöntemi)\n\n1. Yükseltgenme ve indirgenme yarı tepkimelerini yaz.\n2. O ve H dışındaki atomları denkleştir.\n3. **Asidik ortamda:** O için **H₂O**, H için **H⁺** ekle. **Bazik ortamda:** önce asidik gibi denkleştir, sonra H⁺ sayısı kadar **OH⁻** ekleyerek H₂O'ya çevir.\n4. Yükleri **elektron** ile eşitle.\n5. Verilen ve alınan elektron sayılarını eşitleyip yarı tepkimeleri topla.\n\n**Örnek (asidik):** $MnO_4^- + Fe^{2+} \\to Mn^{2+} + Fe^{3+}$\n- İndirgenme: $MnO_4^- + 8H^+ + 5e^- \\to Mn^{2+} + 4H_2O$\n- Yükseltgenme: $5Fe^{2+} \\to 5Fe^{3+} + 5e^-$\n- Toplam: $MnO_4^- + 8H^+ + 5Fe^{2+} \\to Mn^{2+} + 5Fe^{3+} + 4H_2O$",
     "ornekler": [
      {
       "soru": "$Zn + Cu^{2+} \\to Zn^{2+} + Cu$ tepkimesinde indirgen ve yükseltgen hangisidir?",
       "cozum": "$Zn$ elektron verir (0 → +2): **yükseltgenir, indirgendir**. $Cu^{2+}$ elektron alır (+2 → 0): **indirgenir, yükseltgendir**."
      }
     ],
     "ozet": [
      "Yükseltgenme e⁻ kaybı, indirgenme e⁻ kazancı.",
      "İndirgen kendisi yükseltgenir.",
      "Asidik ortamda H₂O ve H⁺ ile denkleştir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Elektrokimyasal hücreler ve elektrot potansiyelleri",
     "en": "Electrochemical cells and electrode potentials"
    },
    "content": {
     "anlatim": "# Galvanik (Volta) Hücre\n\n**Kendiliğinden** yürüyen redoks tepkimesiyle **kimyasal enerji → elektrik enerjisi**.\n- **Anot:** **Yükseltgenme**, **(−)** kutup, kütlesi azalır.\n- **Katot:** **İndirgenme**, **(+)** kutup, kütlesi artar.\n- Elektronlar dış devrede **anottan katoda** akar.\n- **Tuz köprüsü:** İyon akışıyla yük dengesini sağlar; anyonlar anoda, katyonlar katoda gider.\n\n**Daniell pili:** $Zn | Zn^{2+} || Cu^{2+} | Cu$ — $Zn$ anot, $Cu$ katot, $E^\\circ = 1{,}10$ V.\n\n# Standart Elektrot Potansiyeli\n\n- Referans: **Standart hidrojen elektrodu (SHE)** → $E^\\circ = 0{,}00$ V (25 °C, 1 M, 1 atm).\n- **İndirgenme potansiyeli** büyük olan **katot** olur.\n$$E^\\circ_{hücre} = E^\\circ_{katot} - E^\\circ_{anot} \\quad (\\text{indirgenme potansiyelleriyle})$$\n- $E^\\circ_{hücre} > 0$ → tepkime **istemli** (kendiliğinden).\n- Aktif metaller (Li, K, Na, Zn) kolay yükseltgenir; soy metaller (Cu, Ag, Au) zor.\n\n# Nernst Denklemi (Derişimin Etkisi)\n\n$$E = E^\\circ - \\frac{0{,}0592}{n}\\log Q$$\n**Derişim pili:** Aynı elektrotlar, farklı derişimler; seyreltik taraf **anot**. Derişimler eşitlenince pil biter.\n\n# Elektrolitik Hücre\n\n**Dış akımla** istemsiz tepkimenin yürütülmesi: **elektrik → kimyasal enerji**.\n- **Anot (+):** yükseltgenme. **Katot (−):** indirgenme.\n- Örnekler: suyun elektrolizi, eriyik NaCl'den Na eldesi, **metal kaplama**, alüminyum üretimi, bakır saflaştırma.",
     "ornekler": [
      {
       "soru": "$E^\\circ(Ag^+/Ag) = +0{,}80$ V, $E^\\circ(Zn^{2+}/Zn) = -0{,}76$ V. Bu iki yarı hücreden oluşan pilin anodu, katodu ve potansiyeli nedir?",
       "cozum": "İndirgenme potansiyeli büyük olan $Ag$ **katot**, $Zn$ **anot**. $E^\\circ = 0{,}80 - (-0{,}76) = 1{,}56$ V."
      }
     ],
     "ozet": [
      "Galvanik: istemli, anot (−) yükseltgenme.",
      "$E^\\circ_{hücre}=E^\\circ_{katot}-E^\\circ_{anot}$; pozitifse istemli.",
      "Elektrolitik: dış akım, anot (+)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Piller, elektroliz ve Faraday yasaları; korozyon",
     "en": "Batteries, electrolysis, Faraday's laws; corrosion"
    },
    "content": {
     "anlatim": "# Günlük Hayatta Piller\n\n| Pil | Özellik |\n|---|---|\n| **Kuru (Leclanché) pil** | Zn anot, MnO₂/C katot; şarj edilemez |\n| **Alkali pil** | Bazik elektrolit, daha uzun ömür |\n| **Kurşun–asit akü** | Araçlarda; **şarj edilebilir** (Pb, PbO₂, H₂SO₄) |\n| **Lityum-iyon** | Telefon, bilgisayar, elektrikli araç; hafif, yüksek enerji yoğunluğu |\n| **Yakıt pili** | $H_2 + O_2 \\to H_2O$; sürekli yakıt beslemesi, atığı yalnızca su |\n\n# Faraday Yasaları\n\n1 mol elektronun yükü: **1 Faraday ≈ 96 500 C**.\n$$Q = I \\cdot t \\qquad n_e = \\frac{Q}{F} \\qquad m = \\frac{I\\,t\\,M_A}{n\\,F}$$\n($n$: iyonun yükü / aktarılan elektron sayısı, $M_A$: mol kütlesi)\n- Seri bağlı kaplarda **her kaptan geçen elektron sayısı aynıdır**.\n\n**Örnek:** $Cu^{2+}$ çözeltisinden 2 A akım 9650 s geçerse:\n$n_e = \\dfrac{2 \\cdot 9650}{96500} = 0{,}2$ mol e⁻ → $Cu$: $0{,}1$ mol $= 6{,}4$ g.\n\n# Korozyon\n\nMetallerin çevreyle (O₂, su) **elektrokimyasal** tepkimesiyle aşınması. Demirin paslanması:\n- Anot bölgede: $Fe \\to Fe^{2+} + 2e^-$\n- Katot bölgede: $O_2 + 2H_2O + 4e^- \\to 4OH^-$\n- Sonuç: $Fe_2O_3 \\cdot xH_2O$ (pas). Tuzlu su ve nem paslanmayı **hızlandırır**.\n\n**Korunma yöntemleri:**\n- **Boya, yağ, plastik kaplama** (yüzeyi yalıtma)\n- **Galvanizleme** (çinko kaplama) ve **katodik koruma (kurban anot)**: daha aktif metal (Zn, Mg) yükseltgenir, demiri korur — gemi gövdeleri, boru hatları.\n- **Alaşım** (paslanmaz çelik: Cr, Ni)\n- **Pasivasyon** (alüminyumun oksit tabakası)",
     "ornekler": [
      {
       "soru": "Gemi gövdelerine magnezyum ya da çinko blokların bağlanmasının nedeni nedir?",
       "cozum": "**Katodik koruma (kurban anot):** Mg ve Zn demirden **daha aktif** olduğu için onlar **yükseltgenir** (aşınır); demir katot olur ve paslanmaz. Bloklar zamanla yenilenir."
      }
     ],
     "ozet": [
      "Lityum-iyon, kurşun-asit şarj edilebilir; yakıt pili su üretir.",
      "Faraday: $m=\\frac{ItM_A}{nF}$, 1 F ≈ 96 500 C.",
      "Korozyon elektrokimyasal; galvanizleme ve kurban anot."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Karbon Kimyasına Giriş",
   "en": "Unit 2: Introduction to Carbon Chemistry"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Organik bileşikler, hibritleşme ve molekül geometrisi",
     "en": "Organic compounds, hybridization and molecular geometry"
    },
    "content": {
     "anlatim": "# Organik ve İnorganik Bileşikler\n\n**Wöhler (1828)** inorganik maddeden **üre** sentezleyerek \"yaşam gücü\" kuramını çürüttü. **Organik bileşik:** Karbonun genellikle H, O, N, S, halojenlerle oluşturduğu bileşikler (CO, CO₂, karbonatlar, siyanürler hariç).\n\n| Organik | İnorganik |\n|---|---|\n| Kovalent bağlı | Çoğu iyonik |\n| Erime-kaynama noktası düşük | Yüksek |\n| Çoğu suda az çözünür, organik çözücülerde çözünür | Çoğu suda çözünür |\n| Yanıcıdır | Genellikle yanmaz |\n| İzomeri yaygın | İzomeri az |\n\n# Karbonun Özellikleri\n\n- 4 değerlik elektronu → **4 kovalent bağ**.\n- **Katenasyon:** Karbon atomlarının birbirine bağlanarak düz, dallı ve halkalı uzun zincirler oluşturması.\n- Tekli, ikili, üçlü bağ yapabilmesi; **allotroplar**: elmas, grafit, grafen, fulleren.\n\n# Hibritleşme\n\n| Hibrit | Bağ durumu | Geometri | Bağ açısı | Örnek |\n|---|---|---|---|---|\n| **sp³** | 4 tekli bağ | **Düzgün dörtyüzlü** | 109,5° | $CH_4$ |\n| **sp²** | 1 ikili + 2 tekli | **Düzlem üçgen** | 120° | $C_2H_4$ |\n| **sp** | 1 üçlü + 1 tekli ya da 2 ikili | **Doğrusal** | 180° | $C_2H_2$ |\n\n**σ (sigma) bağı:** Uç uca örtüşme; her bağda **bir** tane. **π (pi) bağı:** Yan yana örtüşme; ikili bağda 1, üçlü bağda 2.\n\n# Lewis Yapıları ve VSEPR\n\n**VSEPR:** Merkez atom çevresindeki elektron grupları (bağ ve **ortaklanmamış çift**) birbirini **iterek** en uzak konumlara yerleşir.\n| Molekül | Bağ / ortaklanmamış çift | Geometri |\n|---|---|---|\n| $CH_4$ | 4 / 0 | Düzgün dörtyüzlü |\n| $NH_3$ | 3 / 1 | **Üçgen piramit** (107°) |\n| $H_2O$ | 2 / 2 | **Kırık doğru (açısal)** (104,5°) |\n| $BF_3$ | 3 / 0 | Düzlem üçgen |\n| $CO_2$ | 2 (ikili) / 0 | Doğrusal |\n\nOrtaklanmamış çiftler daha fazla iter → bağ açıları küçülür.",
     "ornekler": [
      {
       "soru": "$CH_2 = CH - C \\equiv CH$ molekülündeki karbonların hibritleşmesi ve toplam σ, π bağ sayısı nedir?",
       "cozum": "İkili bağlı iki C: **sp²**; üçlü bağlı iki C: **sp**. Bağlar: C=C (1σ+1π), C–C (1σ), C≡C (1σ+2π), 4 C–H (4σ) → **7 σ, 3 π**."
      }
     ],
     "ozet": [
      "Wöhler üre sentezi; karbon 4 bağ ve katenasyon.",
      "sp³ 109,5°, sp² 120°, sp 180°.",
      "VSEPR: NH₃ üçgen piramit, H₂O kırık doğru."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Organik Bileşikler",
   "en": "Unit 3: Organic Compounds"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Hidrokarbonlar ve IUPAC adlandırma",
     "en": "Hydrocarbons and IUPAC nomenclature"
    },
    "content": {
     "anlatim": "# Hidrokarbonlar (yalnızca C ve H)\n\n| Sınıf | Genel formül | Bağ | Hibrit | Örnek |\n|---|---|---|---|---|\n| **Alkanlar** | $C_nH_{2n+2}$ | Tekli | sp³ | Metan, propan, bütan (LPG) |\n| **Alkenler** | $C_nH_{2n}$ | Bir ikili | sp² | Eten (etilen) — polietilen, meyve olgunlaştırma |\n| **Alkinler** | $C_nH_{2n-2}$ | Bir üçlü | sp | Etin (asetilen) — kaynak alevi |\n| **Sikloalkanlar** | $C_nH_{2n}$ | Halkalı, tekli | sp³ | Siklohekzan |\n| **Aromatikler** | — | Benzen halkası (rezonans) | sp² | Benzen, toluen, naftalin |\n\n**Kök adları:** 1 met, 2 et, 3 prop, 4 büt, 5 pent, 6 heks, 7 hept, 8 okt, 9 non, 10 dek.\n\n# IUPAC Adlandırma Kuralları\n\n1. **En uzun karbon zincirini** (ana zincir) bul; alken/alkinde ikili/üçlü bağı içermeli.\n2. Zinciri, **dallanma** (ya da çoklu bağ) **en küçük numarayı** alacak uçtan numaralandır.\n3. Dalların yerini ve adını yaz (**metil, etil**…); aynı daldan birden fazlaysa **di-, tri-**.\n4. Dalları **alfabetik** sıraya koy, ana zincir adıyla bitir.\n\n**Örnek:** $CH_3-CH(CH_3)-CH_2-CH_3$ → **2-metilbütan**. $CH_2=CH-CH_2-CH_3$ → **1-büten**.\n\n# İzomeri\n\nAynı kapalı formül, farklı yapı:\n- **Yapı izomerleri:** Zincir (bütan / 2-metilpropan), konum (1-büten / 2-büten), fonksiyonel grup izomerleri (etanol / dimetil eter).\n- **Geometrik (cis–trans) izomeri:** İkili bağın iki karbonunda farklı gruplar varsa.\n\n# Özellikler ve Tepkimeler\n\n- Alkanlar: **yanma**, **halojenlenme** (yer değiştirme); doymuş, az aktif.\n- Alkenler ve alkinler: **katılma** tepkimeleri (H₂, Br₂, HCl); **polimerleşme** (eten → polietilen). Brom suyunu renksizleştirir.\n- Karbon sayısı arttıkça kaynama noktası **artar**; dallanma kaynama noktasını **düşürür**.",
     "ornekler": [
      {
       "soru": "$C_5H_{12}$ formülüne sahip kaç yapı izomeri vardır? Adlandırınız.",
       "cozum": "**3** izomer: n-pentan, **2-metilbütan**, **2,2-dimetilpropan**."
      }
     ],
     "ozet": [
      "Alkan $C_nH_{2n+2}$, alken $C_nH_{2n}$, alkin $C_nH_{2n-2}$.",
      "IUPAC: en uzun zincir, en küçük numara, alfabetik dallar.",
      "Doymamışlar katılma ve polimerleşme yapar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Fonksiyonel gruplar: alkol, eter, aldehit, keton, karboksilik asit, ester",
     "en": "Functional groups"
    },
    "content": {
     "anlatim": "# Fonksiyonel Gruplar\n\n| Sınıf | Grup | Genel yapı | Ad eki | Örnek ve kullanım |\n|---|---|---|---|---|\n| **Alkol** | –OH | R–OH | **-ol** | **Etanol** (dezenfektan, yakıt), metanol (zehirli), gliserol |\n| **Eter** | –O– | R–O–R' | **eter** | Dietil eter (çözücü, eski anestezik) |\n| **Aldehit** | –CHO | R–CHO | **-al** | **Metanal (formaldehit)** – formalin, etanal |\n| **Keton** | –CO– | R–CO–R' | **-on** | **Propanon (aseton)** – çözücü, oje çıkarıcı |\n| **Karboksilik asit** | –COOH | R–COOH | **-oik asit** | **Etanoik asit (asetik asit)** – sirke; metanoik asit (karınca asidi) |\n| **Ester** | –COO– | R–COO–R' | **-oat** | Meyve kokuları, parfüm, yağlar |\n| **Amin** | –NH₂ | R–NH₂ | **-amin** | Metilamin |\n\n# Önemli Özellikler\n\n- **Alkoller:** Hidrojen bağı yaptıkları için kaynama noktaları benzer kütleli hidrokarbonlardan **yüksektir**; küçük alkoller suda iyi çözünür. Yükseltgenme: **birincil alkol → aldehit → karboksilik asit**; ikincil alkol → **keton**; üçüncül alkol yükseltgenmez.\n- **Karboksilik asitler:** **Zayıf asit**; bazlarla tuz oluşturur.\n- **Esterleşme:** $$\\text{Karboksilik asit} + \\text{alkol} \\rightleftharpoons \\text{ester} + H_2O$$ (H₂SO₄ katalizör). Örnek: asetik asit + etanol → **etil asetat**.\n- **Sabunlaşma:** Yağların (gliserol esterleri) NaOH/KOH ile hidrolizi → **sabun** + gliserol.\n\n# Kullanım Alanları\n\nYakıtlar (etanol, biyodizel), çözücüler (aseton, eter), **polimerler** (PE, PVC, PET, naylon), **ilaçlar** (aspirin: asetilsalisilik asit), gıda katkıları (aroma esterleri, sitrik asit), kozmetik.",
     "ornekler": [
      {
       "soru": "Etanol yükseltgendiğinde sırasıyla hangi bileşikler oluşur?",
       "cozum": "Etanol ($CH_3CH_2OH$, birincil alkol) → **etanal** ($CH_3CHO$, aldehit) → **etanoik asit** ($CH_3COOH$, karboksilik asit; sirke)."
      }
     ],
     "ozet": [
      "Ekler: -ol alkol, -al aldehit, -on keton, -oik asit, -oat ester.",
      "Birincil alkol → aldehit → asit; ikincil → keton.",
      "Esterleşme: asit + alkol → ester + su; sabunlaşma."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Enerji Kaynakları ve Bilimsel Gelişmeler",
   "en": "Unit 4: Energy Sources and Scientific Developments"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Fosil yakıtlar, alternatif enerji kaynakları ve sürdürülebilirlik",
     "en": "Fossil fuels, alternative energy and sustainability"
    },
    "content": {
     "anlatim": "# Fosil Yakıtlar\n\n| Yakıt | Bileşim | Not |\n|---|---|---|\n| **Kömür** | Karbonca zengin (turba → linyit → taş kömürü → antrasit) | En çok CO₂ ve SO₂ salan yakıt |\n| **Petrol** | Hidrokarbon karışımı; **ayrımsal damıtma** ile benzin, motorin, gazyağı, asfalt | Kraking ile büyük moleküller küçültülür |\n| **Doğal gaz** | Büyük ölçüde **metan** | En az kirleten fosil yakıt |\n\n**Sorunlar:** **Sınırlı** ve yenilenemez; yanınca **CO₂** (küresel ısınma), **SO₂ ve NOₓ** (asit yağmuru), partikül madde, CO salımı. Dışa bağımlılık.\n\n# Alternatif ve Yenilenebilir Kaynaklar\n\n| Kaynak | Avantaj | Dezavantaj |\n|---|---|---|\n| **Güneş** | Tükenmez, temiz | Geceleri ve bulutlu havada yok, depolama gerekir |\n| **Rüzgâr** | Temiz, ucuzlayan | Değişken, gürültü, kuşlar |\n| **Hidroelektrik** | Ucuz, depolanabilir | Ekosistem ve yerleşimlere etki |\n| **Jeotermal** | Sürekli | Bölgesel, bazı gaz salımları |\n| **Biyokütle / biyoyakıt** | Atıklardan enerji, karbon nötre yakın | Tarım alanı rekabeti |\n| **Hidrojen** | Yanma ürünü su | Üretim (yeşil H₂), depolama ve taşıma zorluğu |\n| **Nükleer** | Çok yüksek enerji, CO₂ salımı yok | Radyoaktif atık, kaza riski, maliyet |\n\n# Sürdürülebilirlik ve Yeşil Kimya\n\n- **Sürdürülebilir kalkınma:** Gelecek kuşakların ihtiyaçlarını tehlikeye atmadan kalkınma.\n- **Yeşil kimya ilkeleri:** Atık oluşturmamak, zararsız çözücüler, enerji verimliliği, **yenilenebilir ham maddeler**, katalizör kullanımı, biyobozunur ürünler.\n- **Karbon ayak izi**ni azaltma, enerji verimliliği, geri dönüşüm.",
     "ornekler": [
      {
       "soru": "Doğal gazın kömüre göre daha 'temiz' bir yakıt sayılmasının kimyasal nedeni nedir?",
       "cozum": "Doğal gaz büyük ölçüde **metandır** ($CH_4$); karbon başına daha fazla hidrojen içerdiğinden aynı enerji için **daha az CO₂** üretir ve kükürt içermediği için **SO₂** salımı yok denecek kadar azdır."
      }
     ],
     "ozet": [
      "Fosil yakıtlar sınırlı; CO₂, SO₂, NOₓ salar.",
      "Yenilenebilir: güneş, rüzgâr, HES, jeotermal, biyokütle, H₂.",
      "Yeşil kimya: atık önleme, yenilenebilir ham madde."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Nanoteknoloji ve bilimsel gelişmeler",
     "en": "Nanotechnology and scientific developments"
    },
    "content": {
     "anlatim": "# Nanoteknoloji\n\n**1–100 nanometre** ölçeğinde maddenin kontrol edilmesi ve yeni özelliklerin kullanılması. Nano ölçekte **yüzey alanı/hacim oranı** çok büyür; renk, iletkenlik, dayanıklılık, tepkime yeteneği değişir (ör. altın nanoparçacıklar kırmızı-mor görünür).\n\n**Önemli nanomalzemeler:**\n- **Grafen:** Tek atom kalınlığında karbon tabakası; çok güçlü, iletken, esnek.\n- **Karbon nanotüpler**, **fullerenler** (C₆₀).\n- Gümüş nanoparçacıklar (antibakteriyel), titanyum dioksit (fotokatalitik, güneş kremi).\n\n| Alan | Uygulama |\n|---|---|\n| **Tıp** | Hedefe yönelik **ilaç taşıma**, kanser tedavisi, tanı kitleri |\n| **Enerji** | Daha verimli **güneş pilleri**, bataryalar, yakıt pilleri |\n| **Malzeme** | Hafif ve dayanıklı kompozitler, çizilmeye dayanıklı yüzeyler, **kendini temizleyen** camlar (lotus etkisi) |\n| **Çevre** | **Su arıtma** filtreleri, kirlilik sensörleri |\n| **Elektronik** | Daha küçük ve hızlı çipler |\n| **Tekstil** | Leke tutmayan, antibakteriyel kumaşlar |\n\n**Riskler:** Nanoparçacıkların solunum yoluyla vücuda girmesi, hücrelere etkisi ve çevrede birikmesi henüz tam bilinmemektedir → **ihtiyatlılık** ve düzenleme gerekir.\n\n# Kimyadaki Diğer Bilimsel Gelişmeler\n\n- **Polimer kimyası:** Biyobozunur plastikler (PLA), akıllı malzemeler.\n- **Katalizör ve enzim teknolojileri:** Daha düşük enerjiyle üretim.\n- **Karbon yakalama ve depolama.**\n- Yapay zekâ destekli **ilaç ve malzeme keşfi**.",
     "ornekler": [
      {
       "soru": "Nano boyuttaki bir katalizörün aynı kütledeki iri taneli katalizörden daha etkili olmasının nedeni nedir?",
       "cozum": "Nano boyutta **yüzey alanı/hacim oranı** çok büyüktür; tepkimeye girecek moleküllerle temas eden **yüzey atomu sayısı** artar, bu da tepkime hızını yükseltir."
      }
     ],
     "ozet": [
      "Nano: 1–100 nm, büyük yüzey/hacim oranı.",
      "Grafen, nanotüp, fulleren; tıp, enerji, çevre uygulamaları.",
      "Sağlık ve çevre riskleri araştırılmalı."
     ]
    }
   }
  ]
 }
];
