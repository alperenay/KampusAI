/* =========================================================
   12. Sınıf Biyoloji — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Biyoloji 12 Detaylı Konu Anlatım Notları" (4 ünite).
   Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (keşif tarihçesi, replikasyon ve translasyon basamakları, solunum tablosu, çift döllenme, madde döngüleri, çözümlü sorular).
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/biyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Genden Proteine",
   "en": "Unit 1: From Gene to Protein"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Nükleik asitlerin keşfi, yapısı ve DNA eşlenmesi",
     "en": "Discovery and structure of nucleic acids; DNA replication"
    },
    "content": {
     "anlatim": "# Keşif Süreci\n\n| Bilim insanı | Katkı |\n|---|---|\n| **Friedrich Miescher** (1869) | Çekirdekten \"nüklein\"i (nükleik asit) izole etti |\n| **Griffith** (1928) | Bakterilerde **transformasyon**: kalıtım maddesi aktarılabilir |\n| **Avery, MacLeod, McCarty** (1944) | Transformasyon maddesinin **DNA** olduğunu gösterdi |\n| **Chargaff** | DNA'da **A = T**, **G = C** |\n| **Rosalind Franklin, Wilkins** | X-ışını kırınımı: sarmal yapı |\n| **Watson ve Crick** (1953) | **Çift sarmal** DNA modeli |\n| **Meselson–Stahl** (1958) | **Yarı korunumlu** eşlenme |\n\n# DNA ve RNA\n\n**Nükleotit** = azotlu baz + **5 karbonlu şeker** + **fosfat**.\n\n| | DNA | RNA |\n|---|---|---|\n| Şeker | **Deoksiriboz** | **Riboz** |\n| Bazlar | A, **T**, G, C | A, **U**, G, C |\n| Yapı | **Çift** zincir (sarmal) | **Tek** zincir |\n| Görev | Kalıtım bilgisini depolar | Protein sentezinde görev |\n| Bulunduğu yer | Çekirdek, mitokondri, kloroplast | Çekirdek, sitoplazma, ribozom |\n\n- İki zincir **zıt yönlü (antiparalel)**: 5'→3' ve 3'→5'.\n- **A–T arasında 2**, **G–C arasında 3** hidrojen bağı.\n- Pürinler (A, G) çift halkalı; pirimidinler (C, T, U) tek halkalı.\n\n# DNA Eşlenmesi (Replikasyon)\n\nHücre bölünmesinden önce (**S evresi**) gerçekleşir. **Yarı korunumlu:** Her yeni DNA'da bir eski, bir yeni zincir.\n1. **Helikaz** hidrojen bağlarını koparır, zincirleri açar.\n2. **Primaz** kısa RNA öncülü (primer) yapar.\n3. **DNA polimeraz** yeni nükleotitleri **5'→3' yönünde** ekler; **öncü zincir** kesintisiz, **geri kalan zincir** parçalar (**Okazaki**) hâlinde sentezlenir.\n4. **DNA ligaz** parçaları birleştirir.\n5. DNA polimeraz hataları **onarır** (düzeltme okuması).",
     "ornekler": [
      {
       "soru": "Bir DNA molekülünde %30 adenin varsa sitozin oranı nedir?",
       "cozum": "A = T = %30 → A + T = %60. G + C = %40 → **C = %20**."
      },
      {
       "soru": "Meselson–Stahl deneyi neyi kanıtlamıştır?",
       "cozum": "DNA eşlenmesinin **yarı korunumlu** olduğunu: ağır azot (¹⁵N) içeren DNA hafif ortamda bir kez eşlendiğinde tüm DNA'ların **ara yoğunlukta** (yarı ağır, yarı hafif) çıktığı görülmüştür."
      }
     ],
     "ozet": [
      "Nükleotit: baz + şeker + fosfat; A=T (2 bağ), G≡C (3 bağ).",
      "DNA çift zincir deoksiriboz; RNA tek zincir riboz, U.",
      "Replikasyon yarı korunumlu: helikaz, polimeraz, ligaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Protein sentezi ve genetik kod",
     "en": "Protein synthesis and the genetic code"
    },
    "content": {
     "anlatim": "# Merkezî Dogma\n\n$$\\text{DNA} \\xrightarrow{\\text{replikasyon}} \\text{DNA} \\qquad \\text{DNA} \\xrightarrow{\\text{transkripsiyon}} \\text{RNA} \\xrightarrow{\\text{translasyon}} \\text{Protein}$$\n(Retrovirüslerde **ters transkripsiyon**: RNA → DNA.)\n\n# RNA Çeşitleri\n\n| RNA | Görev |\n|---|---|\n| **mRNA** (haberci) | DNA'daki şifreyi ribozoma taşır; **kodon** içerir |\n| **tRNA** (taşıyıcı) | Aminoasitleri ribozoma getirir; **antikodon** içerir |\n| **rRNA** (ribozomal) | Proteinlerle birlikte **ribozomu** oluşturur; peptit bağı oluşumunu katalizler |\n\n# Transkripsiyon (Yazılma)\n\n- Ökaryotlarda **çekirdekte**; **RNA polimeraz**, DNA'nın **kalıp** zincirini okuyarak mRNA üretir.\n- **Promotor** bölgede başlar, **sonlandırıcı** bölgede biter.\n- Ökaryotlarda öncül mRNA işlenir: **intronlar** çıkarılır, **ekzonlar** birleştirilir (**kırpma**); 5' başlık ve poli-A kuyruğu eklenir.\n\n# Translasyon (Çevrilme)\n\nSitoplazmada **ribozomda**.\n1. **Başlama:** mRNA'daki **AUG** (başlama kodonu, **metiyonin**) bulunur.\n2. **Uzama:** tRNA antikodonları kodonlarla eşleşir; aminoasitler arasında **peptit bağı** kurulur (su açığa çıkar).\n3. **Bitiş:** **UAA, UAG, UGA** (durdurma kodonları) → polipeptit serbest kalır.\n\n# Genetik Kod\n\n- **Üçlü** kod: 3 nükleotit = 1 **kodon** → $4^3 = 64$ kodon (61 anlamlı, 3 durdurma).\n- **Evrenseldir** (neredeyse tüm canlılarda aynı), **dejeneredir** (bir aminoasidi birden çok kodon belirleyebilir), **örtüşmez**.\n\n# Gen İfadesinin Düzenlenmesi\n\nHer hücre aynı DNA'ya sahiptir ama **farklı genleri** ifade eder → hücre farklılaşması.\n- Prokaryotlarda **operon** modeli (lac operonu: laktoz varsa genler açılır).\n- Ökaryotlarda kromatin yapısı, **transkripsiyon faktörleri**, RNA işlenmesi, **epigenetik** (DNA metilasyonu) düzeyinde kontrol.",
     "ornekler": [
      {
       "soru": "DNA kalıp zinciri 3'–TAC GGA TTC ATT–5' ise mRNA ve oluşacak aminoasit sayısı nedir?",
       "cozum": "mRNA: 5'–**AUG CCU AAG UAA**–3'. AUG başlama, UAA durdurma → **3 aminoasit** (Met–Pro–Lys)."
      },
      {
       "soru": "Genetik kodun 'dejenere' olması mutasyonların etkisini nasıl azaltır?",
       "cozum": "Bir aminoasit birden fazla kodonla şifrelendiği için kodonun özellikle **üçüncü bazındaki** bir değişiklik çoğu zaman **aynı aminoasidi** belirler; protein değişmez (**sessiz mutasyon**)."
      }
     ],
     "ozet": [
      "DNA → mRNA (transkripsiyon, çekirdek) → protein (translasyon, ribozom).",
      "AUG başlama; UAA, UAG, UGA durdurma; 64 kodon.",
      "Kod evrensel, dejenere; gen ifadesi düzenlenir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Mutasyonlar, biyoteknoloji ve genetik mühendisliği",
     "en": "Mutations, biotechnology and genetic engineering"
    },
    "content": {
     "anlatim": "# Mutasyonlar\n\nDNA dizisinde kalıcı değişiklik. **Mutajenler:** UV, X ışını, radyasyon, bazı kimyasallar (sigara katranı), bazı virüsler.\n\n| Tür | Açıklama | Sonuç |\n|---|---|---|\n| **Nokta (yer değiştirme)** | Tek baz değişir | Sessiz, yanlış anlamlı (**orak hücre anemisi**: GAG→GTG, Glu→Val) ya da anlamsız (erken durdurma) |\n| **Ekleme / silinme** | Baz eklenir ya da çıkar | **Çerçeve kayması** → sonraki tüm kodonlar değişir |\n| **Kromozom mutasyonu** | Parça kaybı, tekrar, ters dönme, yer değiştirme | Kedi miyavlaması sendromu vb. |\n| **Kromozom sayısı** | Ayrılmama sonucu | **Down sendromu** (21. kromozom trizomisi), Turner (X0), Klinefelter (XXY) |\n\n- **Üreme hücrelerindeki** mutasyonlar kalıtsaldır; **vücut hücrelerindekiler** kalıtılmaz (kanser gibi).\n- Mutasyonlar **çeşitliliğin** ve **evrimin** ham maddesidir.\n\n# Biyoteknoloji ve Genetik Mühendisliği\n\n| Teknik | Açıklama |\n|---|---|\n| **Rekombinant DNA** | **Restriksiyon enzimiyle** kesilen gen, **ligazla** vektöre (**plazmit**) eklenir |\n| **Gen klonlama** | Rekombinant plazmit bakteriye aktarılır, bakteri çoğaldıkça gen de çoğalır (insan **insülini** üretimi) |\n| **PCR** | DNA'nın test tüpünde **milyonlarca kez** kopyalanması (ısıya dayanıklı Taq polimeraz) — tanı, adli tıp |\n| **Jel elektroforezi** | DNA parçalarını boyutlarına göre ayırma → **DNA parmak izi** |\n| **Gen tedavisi** | Hatalı genin yerine sağlamının aktarılması |\n| **CRISPR-Cas9** | Genomda belirli bir bölgeyi **kesip düzenleme** (\"gen makası\") |\n| **GDO** | Gen aktarılmış organizmalar (zararlıya dayanıklı mısır, altın pirinç) |\n| **Klonlama** | Genetik olarak aynı birey (Dolly koyunu, 1996) |\n| **Kök hücre** | Farklılaşmamış hücrelerden doku/organ elde etme |\n\n# Biyoetik\n\nGenetik bilgilerin gizliliği, **tasarım bebek** tartışmaları, GDO'ların ekosistem ve sağlık etkileri, klonlamanın etik sınırları. Türkiye'de GDO'lu ürünlerin üretimi **yasaktır**; ithalat ve kullanım izne bağlıdır.",
     "ornekler": [
      {
       "soru": "Bir gende tek bir nükleotit eklenmesi neden tek baz değişiminden genellikle daha zararlıdır?",
       "cozum": "Kodonlar üçer üçer okunduğundan ekleme **okuma çerçevesini kaydırır**; eklenen noktadan sonraki **tüm kodonlar** ve dolayısıyla aminoasitler değişir. Tek baz değişimi ise yalnızca bir kodonu etkiler."
      }
     ],
     "ozet": [
      "Nokta mutasyon, çerçeve kayması, kromozom mutasyonları.",
      "Rekombinant DNA: restriksiyon enzimi + ligaz + plazmit.",
      "PCR, elektroforez, CRISPR, GDO; biyoetik."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Canlılarda Enerji Dönüşümleri",
   "en": "Unit 2: Energy Transformations in Living Things"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Fotosentez ve kemosentez",
     "en": "Photosynthesis and chemosynthesis"
    },
    "content": {
     "anlatim": "# ATP\n\n**Adenin + riboz + 3 fosfat**. Fosfatlar arasındaki bağların kopmasıyla enerji açığa çıkar: $ATP \\to ADP + P_i + \\text{enerji}$.\nATP üretim yolları: **substrat düzeyinde fosforilasyon**, **oksidatif fosforilasyon** (solunum ETS), **fotofosforilasyon** (fotosentez).\n\n# Fotosentez\n\n$$6CO_2 + 12H_2O \\xrightarrow[\\text{klorofil}]{\\text{ışık}} C_6H_{12}O_6 + 6O_2 + 6H_2O$$\n(Sadeleştirilmiş: $6CO_2 + 6H_2O \\to C_6H_{12}O_6 + 6O_2$)\n\n**Kloroplast:** dış ve iç zar, **tilakoit** (granalar) ve **stroma**.\n\n| | Işığa bağımlı tepkimeler | Işıktan bağımsız tepkimeler (Calvin döngüsü) |\n|---|---|---|\n| Yer | **Tilakoit zar** | **Stroma** |\n| Girdi | Işık, su, ADP, NADP⁺ | CO₂, ATP, NADPH |\n| Olaylar | **Suyun fotolizi** → O₂ açığa çıkar; elektron taşıma; **fotofosforilasyon** | **CO₂ tutulması** (RuBisCO enzimi, RuBP), indirgenme, RuBP'nin yenilenmesi |\n| Ürün | **ATP, NADPH, O₂** | **Glikoz** (PGAL üzerinden), ADP, NADP⁺ |\n\n> Açığa çıkan **O₂ sudan** gelir (izotop deneyleri).\n\n**Fotosentez hızını etkileyen faktörler:** ışık şiddeti ve dalga boyu (en etkili **mor-mavi ve kırmızı**, en az yeşil), CO₂ derişimi, sıcaklık (enzim), su, klorofil miktarı, mineral (Mg, N). **Sınırlayıcı faktör ilkesi:** Hızı en az bulunan faktör belirler.\n\n# Kemosentez\n\nIşık yerine **inorganik maddelerin oksidasyonundan** elde edilen enerjiyle organik madde üretimi. Yalnızca bazı **bakteri ve arkelerde**.\n- **Nitrifikasyon bakterileri:** $NH_3 \\to NO_2^- \\to NO_3^-$ (azot döngüsü).\n- Kükürt, demir bakterileri; okyanus tabanındaki **hidrotermal bacalarda** ekosistemlerin üreticileri.",
     "ornekler": [
      {
       "soru": "Fotosentezde açığa çıkan oksijenin kaynağı nedir? Nasıl kanıtlanmıştır?",
       "cozum": "Kaynak **su**dur. Ağır oksijen izotopu (¹⁸O) içeren su verilen bitkilerde açığa çıkan O₂'nin ¹⁸O içerdiği, işaretli CO₂ verildiğinde ise O₂'nin işaretsiz olduğu gösterilmiştir."
      }
     ],
     "ozet": [
      "Işık tepkimeleri tilakoitte: fotoliz, ATP, NADPH, O₂.",
      "Calvin döngüsü stromada: CO₂ tutulur, glikoz üretilir.",
      "Kemosentez: inorganik madde oksidasyonu (nitrifikasyon)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Hücresel solunum ve fermantasyon",
     "en": "Cellular respiration and fermentation"
    },
    "content": {
     "anlatim": "# Oksijenli Solunum\n\n$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{enerji (ATP + ısı)}$$\n\n| Evre | Yer | Olay | Net kazanç (1 glikoz) |\n|---|---|---|---|\n| **Glikoliz** | **Sitoplazma** | Glikoz → 2 **pirüvat**; O₂ gerekmez | 2 ATP, 2 NADH |\n| **Pirüvat oksidasyonu** | Mitokondri matriksi | Pirüvat → **asetil-CoA** + CO₂ | 2 NADH |\n| **Krebs döngüsü** | **Matriks** | Asetil-CoA tamamen yıkılır, **CO₂** çıkar | 2 ATP, 6 NADH, 2 FADH₂ |\n| **ETS ve oksidatif fosforilasyon** | **Mitokondri iç zarı (kristalar)** | NADH ve FADH₂'nin elektronları zincirden geçer; son elektron alıcısı **O₂** → **H₂O**; ATP sentaz | ~26–28 ATP |\n| **Toplam** | | | **~30–32 ATP** |\n\n**Kemiozmoz:** ETS'de matriksten zarlar arası boşluğa pompalanan H⁺ iyonları **ATP sentaz** üzerinden geri akarken ATP üretilir.\n\n# Oksijensiz Solunum ve Fermantasyon\n\nO₂ yoksa yalnızca **glikoliz** çalışır; NAD⁺'nin yenilenmesi için fermantasyon yapılır. **Net 2 ATP**.\n\n| Fermantasyon | Ürün | Örnek |\n|---|---|---|\n| **Etil alkol** | Etanol + **CO₂** | Maya: ekmeğin kabarması, sirke ve alkol üretimi |\n| **Laktik asit** | **Laktik asit** (CO₂ yok) | Yoğurt bakterileri; yorgun **çizgili kas** hücreleri |\n\n# Karşılaştırma\n\n| | Oksijenli solunum | Fermantasyon |\n|---|---|---|\n| O₂ | Gerekli | Gerekmez |\n| Son ürün | CO₂ + H₂O (inorganik) | Etanol/laktik asit (organik — hâlâ enerji içerir) |\n| ATP | ~30–32 | 2 |\n| Yer | Sitoplazma + mitokondri | Sitoplazma |\n\n> **Fotosentez ↔ solunum:** Birinin ürünleri diğerinin girdileridir; enerji **ışık → kimyasal → ATP → ısı** olarak akar, madde (C, O, H) döngüdedir.",
     "ornekler": [
      {
       "soru": "Ağır egzersizden sonra kaslarda yorgunluk ve kramp hissedilmesinin nedeni nedir?",
       "cozum": "Kaslara yeterli **O₂** ulaşamayınca hücreler **laktik asit fermantasyonu** yapar; biriken laktik asit ve iyon dengesindeki değişiklikler yorgunluk hissine katkıda bulunur. Dinlenince laktat karaciğerde geri dönüştürülür."
      }
     ],
     "ozet": [
      "Glikoliz sitoplazma; Krebs matriks; ETS iç zar.",
      "Son elektron alıcısı O₂; ~30–32 ATP.",
      "Fermantasyon net 2 ATP: etil alkol ve laktik asit."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Bitki Biyolojisi",
   "en": "Unit 3: Plant Biology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Bitkinin yapısı: dokular ve organlar",
     "en": "Plant structure: tissues and organs"
    },
    "content": {
     "anlatim": "# Bitki Dokuları\n\n| Doku | Özellik ve görev |\n|---|---|\n| **Meristem (bölünür doku)** | Sürekli bölünür. **Uç (apikal) meristem** → boyca büyüme; **yanal meristem (kambiyum)** → enine büyüme (odunsu bitkiler, yıllık halkalar) |\n| **Örtü doku** | **Epidermis** (kütikula, stoma, tüyler); yaşlı gövdede **mantar (periderm)** |\n| **Temel doku – parankima** | Fotosentez (**palizat ve sünger parankiması**), depolama, havalandırma |\n| **Destek – kollenkima** | Canlı, köşeleri kalınlaşmış hücreler; genç gövde ve yaprak sapı |\n| **Destek – sklerenkima** | Ölü, **lignin**li hücreler; sert kabuk ve lifler (keten, ceviz kabuğu) |\n| **İletim – ksilem (odun borusu)** | **Su ve mineralleri** kökten yukarı taşır; trake ve trakeitler **ölü** hücreler |\n| **İletim – floem (soymuk borusu)** | **Organik besinleri** (sakaroz) her yöne taşır; kalburlu borular ve arkadaş hücreleri **canlı** |\n\n# Organlar\n\n- **Kök:** Tutunma, **su-mineral emilimi** (emici tüyler), depolama (havuç). **Kazık kök** (dikotiller) ve **saçak kök** (monokotiller).\n- **Gövde:** Destek, iletim, depolama (patates yumrusu). Monokotillerde iletim demetleri **dağınık**, dikotillerde **halka** şeklinde.\n- **Yaprak:** Fotosentez, gaz alışverişi, **terleme**. Ayası, sapı; damarlanma monokotillerde **paralel**, dikotillerde **ağsı**.\n\n| | Monokotil | Dikotil |\n|---|---|---|\n| Çenek | 1 | 2 |\n| Kök | Saçak | Kazık |\n| Yaprak damarı | Paralel | Ağsı |\n| Gövdede iletim demetleri | Dağınık | Halkasal |\n| Kambiyum | Genellikle yok | Var |\n| Örnek | Buğday, mısır, lale | Fasulye, gül, meşe |",
     "ornekler": [
      {
       "soru": "Ağaçlarda yıllık halkaların oluşmasını sağlayan doku hangisidir?",
       "cozum": "**Kambiyum (yanal meristem)**; ilkbaharda geniş, yaz sonunda dar hücreler üreterek her yıl bir **halka** oluşturur. Halka sayısı ağacın yaşını verir."
      }
     ],
     "ozet": [
      "Meristem büyür; parankima fotosentez/depo; kollenkima ve sklerenkima destek.",
      "Ksilem su-mineral (ölü); floem organik besin (canlı).",
      "Monokotil–dikotil farkları."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Bitkilerde taşıma, beslenme, hormon ve hareket",
     "en": "Transport, nutrition, hormones and movement in plants"
    },
    "content": {
     "anlatim": "# Su ve Mineral Taşınması (Ksilem)\n\n1. **Emilim:** Emici tüyler suyu **osmozla**, mineralleri **aktif taşıma** ve difüzyonla alır.\n2. **Kök basıncı:** Mineral birikimiyle kökte oluşan basınç suyu yukarı iter (gece **gutasyon**).\n3. **Kohezyon–gerilim (terleme–çekim) teorisi:** Yapraklardaki **terleme** su moleküllerini yukarı çeker; su molekülleri arasındaki **kohezyon** ve damar çeperine **adezyon** su sütununu koparmadan taşır. **Uzun ağaçlarda temel mekanizma**.\n\n**Stomaların açılıp kapanması:** Bekçi hücrelerine K⁺ girişi → su girer → turgor ↑ → stoma **açılır**. Kuraklıkta **absisik asit** stomaları kapatır.\n\n# Organik Madde Taşınması (Floem)\n\n**Basınç–akış (kütle akışı) hipotezi:** Şeker **kaynakta** (yaprak) floeme yüklenir → su girer, basınç artar → şekerli su basıncın düşük olduğu **havuza** (kök, meyve) akar. Taşıma **her iki yönde** olabilir.\n\n# Bitkilerde Beslenme\n\n**Makro elementler:** N, P, K, Ca, Mg, S. **Mikro elementler:** Fe, Mn, Zn, Cu, B, Mo, Cl.\n- **N** eksikliği → yaşlı yapraklarda sararma; **Mg** klorofilin yapısında.\n- **Azot bağlayıcı bakteriler** (baklagil köklerindeki *Rhizobium*), **mikoriza** mantarları.\n- Böcekçil bitkiler (Venüs sinekkapan) azot eksikliğini böceklerden karşılar.\n\n# Hormonlar ve Hareketler (Özet)\n\n| Hormon | Etki |\n|---|---|\n| Oksin | Hücre uzaması, fototropizma, tepe baskınlığı |\n| Giberellin | Çimlenme, gövde uzaması |\n| Sitokinin | Hücre bölünmesi, yaşlanmayı geciktirme |\n| Absisik asit | Stoma kapanması, dormansi |\n| Etilen | Meyve olgunlaşması, yaprak dökümü |\n\n**Tropizma** (yöne bağlı, büyümeyle): foto-, gravi-, hidro-, tigmotropizma. **Nasti** (yönden bağımsız, turgorla): sismonasti (küstüm otu), fotonasti, termonasti.",
     "ornekler": [
      {
       "soru": "Çok sıcak ve kuru bir günde bitkide su taşınması nasıl etkilenir?",
       "cozum": "Terleme artar, su kaybı hızlanır; su yetersizse **absisik asit** stomaları **kapatır**. Bu su kaybını azaltır ama **CO₂ alımını** ve dolayısıyla **fotosentezi** de düşürür."
      }
     ],
     "ozet": [
      "Ksilemde taşıma: kök basıncı + kohezyon–gerilim (terleme).",
      "Floemde basınç–akış: kaynaktan havuza.",
      "Makro (N, P, K…) ve mikro elementler; hormonlar ve hareketler."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Bitkilerde eşeysiz ve eşeyli üreme",
     "en": "Asexual and sexual reproduction in plants"
    },
    "content": {
     "anlatim": "# Eşeysiz Üreme\n\n- **Sporla üreme:** Eğrelti, kara yosunları.\n- **Vejetatif üreme:** Gövde, kök ya da yapraktan yeni birey.\n  - **Yumru** (patates), **soğan** (lale), **rizom** (zencefil, ayrık otu), **stolon** (çilek), **çelik** (söğüt, gül), **daldırma**, **aşılama** (meyve ağaçları).\n- Yeni bireyler **genetik olarak aynıdır** → istenen özellikler korunur; ama çevre değişimine karşı çeşitlilik azdır.\n\n# Çiçekli Bitkilerde Eşeyli Üreme\n\n**Çiçeğin kısımları:** çanak yaprak, taç yaprak, **erkek organ (stamen: başçık + sapçık)**, **dişi organ (pistil: tepecik, dişicik borusu, yumurtalık)**.\n\n1. **Başçıkta** mayozla **polen** oluşur (içinde **generatif** ve **vejetatif (tüp)** çekirdekler).\n2. **Tozlaşma:** Polen tepeciğe taşınır (rüzgâr, böcek, su).\n3. **Polen tüpü** dişicik borusundan yumurtalığa ilerler; generatif çekirdek mitozla **iki sperm** çekirdeği oluşturur.\n4. **Çift döllenme** (kapalı tohumlulara özgü):\n   - 1 sperm + **yumurta** → **zigot (2n)** → **embriyo**\n   - 1 sperm + **iki kutup çekirdeği** → **endosperm (3n)** → besin dokusu\n5. **Tohum** tohum taslağından, **meyve** yumurtalık duvarından gelişir.\n\n# Tohum ve Çimlenme\n\n- Tohum: **embriyo**, **endosperm/çenekler** (besin), **tohum kabuğu**.\n- Çimlenme için: **su** (şişme), **uygun sıcaklık**, **O₂**; bazı tohumlarda ışık. **Giberellin** çimlenmeyi başlatır, **ABA** dormansiyi sürdürür.\n- **Partenokarpi:** Döllenme olmadan meyve oluşumu (çekirdeksiz muz, oksin/giberellin uygulamaları).",
     "ornekler": [
      {
       "soru": "Kapalı tohumlularda 'çift döllenme' neden adını almıştır?",
       "cozum": "İki sperm çekirdeği **iki ayrı döllenme** yapar: biri yumurtayla birleşip **zigotu (2n)**, diğeri iki kutup çekirdeğiyle birleşip **endospermi (3n)** oluşturur."
      }
     ],
     "ozet": [
      "Vejetatif üreme: yumru, soğan, stolon, çelik, aşı.",
      "Çift döllenme: zigot 2n, endosperm 3n.",
      "Tohum taslaktan, meyve yumurtalıktan; çimlenmede su, sıcaklık, O₂."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Canlılar ve Çevre",
   "en": "Unit 4: Living Things and the Environment"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Popülasyon ve komünite ekolojisi",
     "en": "Population and community ecology"
    },
    "content": {
     "anlatim": "# Ekolojinin Düzeyleri\n\nbirey → **popülasyon** (aynı türün belirli alandaki bireyleri) → **komünite** (farklı popülasyonlar) → **ekosistem** (komünite + cansız çevre) → biyom → **biyosfer**.\n\n# Popülasyon\n\n- **Popülasyon yoğunluğu** = birey sayısı / alan.\n- **Büyüme:** (doğum + göçle gelen) − (ölüm + göçle giden).\n- **Üstel (J) büyüme:** Sınırsız kaynakta hızlı artış.\n- **Lojistik (S) büyüme:** Kaynaklar sınırlıdır; popülasyon **taşıma kapasitesine (K)** yaklaşınca büyüme yavaşlar.\n- **Sınırlayıcı faktörler:** Yoğunluğa bağlı (besin, rekabet, hastalık, avcı) ve yoğunluktan bağımsız (sel, yangın, iklim).\n- **Yaş piramitleri:** Geniş tabanlı → hızlı büyüyen; dikdörtgen → durağan; dar tabanlı → küçülen popülasyon.\n\n# Komünitede Türler Arası İlişkiler\n\n| İlişki | Tür 1 | Tür 2 | Örnek |\n|---|---|---|---|\n| **Rekabet** | − | − | Aynı besine yönelen türler (**rekabetle dışlama**) |\n| **Av–avcı (predatörlük)** | + | − | Vaşak–tavşan (döngüsel popülasyonlar) |\n| **Mutualizm** | + | + | Liken (mantar + alg), mikoriza, baklagil–*Rhizobium* |\n| **Kommensalizm** | + | 0 | Köpek balığı–vantuz balığı |\n| **Parazitlik** | + | − | Tenya, bit, küsüt bitkisi |\n\n**Ekolojik niş:** Bir türün komünitedeki \"mesleği\" (beslenme, yaşam alanı, etkinlik zamanı). **Habitat:** \"adresi\".\n**Süksesyon:** Komünitenin zamanla değişimi — **birincil** (çıplak kaya, öncü tür liken) ve **ikincil** (yangın sonrası).",
     "ornekler": [
      {
       "soru": "Bir adaya getirilen tavşan popülasyonunun önce hızlı artıp sonra sabitlenmesi nasıl açıklanır?",
       "cozum": "Başta kaynaklar bol olduğu için **üstel** artış olur; birey sayısı arttıkça besin ve alan **sınırlanır**, rekabet ve hastalık artar; popülasyon **taşıma kapasitesine** ulaşınca büyüme durur (**S eğrisi**)."
      }
     ],
     "ozet": [
      "Popülasyon → komünite → ekosistem.",
      "J (üstel) ve S (lojistik) büyüme; taşıma kapasitesi.",
      "Rekabet, av–avcı, mutualizm, kommensalizm, parazitlik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Ekosistemde enerji akışı ve madde döngüleri",
     "en": "Energy flow and nutrient cycles in ecosystems"
    },
    "content": {
     "anlatim": "# Ekosistemin Bileşenleri\n\n- **Üreticiler (ototroflar):** Fotosentetik bitkiler, algler, kemosentetik bakteriler.\n- **Tüketiciler (heterotroflar):** Otçul (birincil), etçil (ikincil, üçüncül), hepçil.\n- **Ayrıştırıcılar:** Bakteri ve mantarlar; ölü organik maddeyi inorganiğe çevirir → **madde döngüsünü** tamamlar.\n\n# Enerji Akışı\n\n- Enerji **tek yönlü** akar: Güneş → üretici → tüketiciler → ısı olarak kaybolur.\n- **%10 kuralı:** Bir trofik düzeyden sonrakine enerjinin yaklaşık **%10'u** aktarılır; geri kalanı solunum ve ısıyla kaybolur. Bu yüzden besin zincirleri genellikle 4–5 halkayı geçmez.\n- **Besin zinciri:** Ot → çekirge → kurbağa → yılan → kartal. **Besin ağı:** Birbirine bağlı zincirler.\n- **Ekolojik piramitler:** Enerji piramidi her zaman düzdür; sayı ve biyokütle piramitleri ters olabilir.\n- **Biyolojik birikim:** DDT, cıva gibi parçalanmayan maddeler üst trofik düzeylerde **birikerek** artar.\n\n# Madde Döngüleri\n\n| Döngü | Ana süreçler |\n|---|---|\n| **Su** | Buharlaşma, terleme, yoğuşma, yağış, sızma, yüzey akışı |\n| **Karbon** | Fotosentez (CO₂ tutulur) ↔ solunum, ayrışma, **fosil yakıt yakma** (CO₂ salınır); okyanuslar ve kireçtaşı depo |\n| **Azot** | **Azot bağlama** (N₂ → NH₃: *Rhizobium*, siyanobakteri, yıldırım) → **nitrifikasyon** (NH₃ → NO₂⁻ → NO₃⁻) → bitkilerce alım → **amonifikasyon** (ölü maddeden NH₃) → **denitrifikasyon** (NO₃⁻ → N₂) |\n| **Fosfor** | Atmosfer evresi yok; kayaçların aşınması → toprak/su → canlılar → çökelme |\n\n> Madde **döngüsel**, enerji **tek yönlü**dür.",
     "ornekler": [
      {
       "soru": "Bir besin zincirinde üreticilerde 10 000 kJ enerji varsa üçüncül tüketiciye ne kadar ulaşır?",
       "cozum": "Her basamakta ~%10: birincil tüketici 1000, ikincil 100, **üçüncül tüketici ~10 kJ**."
      },
      {
       "soru": "Azot döngüsünde ayrıştırıcıların rolü nedir?",
       "cozum": "Ölü organizma ve atıklardaki organik azotu **amonyağa** dönüştürürler (**amonifikasyon**); böylece azot yeniden **nitrifikasyonla** bitkilerin kullanabileceği nitrata dönüşebilir."
      }
     ],
     "ozet": [
      "Enerji tek yönlü, %10 kuralı; madde döngüsel.",
      "Biyolojik birikim üst düzeylerde artar.",
      "Azot: bağlama, nitrifikasyon, amonifikasyon, denitrifikasyon."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Çevre sorunları ve koruma",
     "en": "Environmental problems and conservation"
    },
    "content": {
     "anlatim": "# Başlıca Çevre Sorunları\n\n| Sorun | Neden | Sonuç |\n|---|---|---|\n| **Küresel ısınma** | Sera gazları (CO₂, CH₄, N₂O) | İklim değişikliği, buzul erimesi, kuraklık |\n| **Hava kirliliği** | Fosil yakıt, sanayi, trafik | Solunum hastalıkları, **asit yağmuru** (SO₂, NOₓ) |\n| **Ozon incelmesi** | **CFC**'ler | UV artışı, cilt kanseri — Montreal Protokolü (1987) ile iyileşme |\n| **Su kirliliği** | Atık su, gübre | **Ötrofikasyon**: aşırı alg çoğalması → O₂ azalır → canlı ölümleri |\n| **Toprak kirliliği ve erozyon** | Pestisit, ağır metal, yanlış tarım | Verim kaybı, çölleşme |\n| **Habitat kaybı** | Ormansızlaşma, kentleşme | **Biyoçeşitlilik kaybı**, tür yok oluşu |\n| **İstilacı türler** | İnsanla taşınan yabancı türler | Yerli türlerin baskılanması (aslan balığı) |\n| **Plastik ve mikroplastik** | Tek kullanımlık plastikler | Besin zincirinde birikim |\n\n# Biyoçeşitlilik ve Koruma\n\n- **Biyoçeşitlilik:** Genetik, tür ve ekosistem çeşitliliği. Türkiye, Avrupa ve Orta Doğu'da **endemik** tür bakımından en zengin ülkelerdendir (yaklaşık 3000'den fazla endemik bitki türü).\n- **Koruma stratejileri:** **Millî parklar**, tabiat parkları, **Ramsar** alanları, **gen bankaları** (Türkiye Tohum Gen Bankası), yerinde (in situ) ve yer dışında (ex situ) koruma, **CITES** (nesli tehlikedeki türlerin ticareti).\n- **Sürdürülebilirlik:** Yenilenebilir enerji, geri dönüşüm, ekolojik ayak izini azaltma, organik tarım, bilinçli tüketim.",
     "ornekler": [
      {
       "soru": "Tarlalarda aşırı gübre kullanımı göllerde canlı ölümlerine nasıl yol açar?",
       "cozum": "Yıkanan azot ve fosfor göle ulaşır, **alg patlaması** olur (**ötrofikasyon**). Algler ölünce ayrıştırıcılar onları parçalarken **oksijeni tüketir**; O₂ azalınca balık ve diğer canlılar ölür."
      }
     ],
     "ozet": [
      "Küresel ısınma, asit yağmuru, ozon incelmesi, ötrofikasyon.",
      "Biyoçeşitlilik: genetik, tür, ekosistem; Türkiye endemik türce zengin.",
      "Koruma: millî park, gen bankası, CITES, sürdürülebilirlik."
     ]
    }
   }
  ]
 }
];
