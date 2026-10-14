/* =========================================================
   9. Sınıf Biyoloji — kazanım odaklı konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Biyoloji Kazanım Odaklı Eksiksiz Konu Anlatım Notları" (2 tema).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Kaynaktaki küçük yazım hataları düzeltildi; örnek soruların bir kısmı eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/biyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Yaşam",
   "en": "Theme 1: Life"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Biyolojideki gelişmelerin insan hayatına katkılarını sorgular ve biyoloji biliminin tarihsel gelişimindeki dönüm noktalarını analiz eder.",
     "en": "Questions how advances in biology contribute to human life and analyses turning points in its history."
    },
    "content": {
     "anlatim": "# Biyolojinin Önemi ve Dönüm Noktaları\n\n**Biyoloji:** Canlıların yapılarını, işlevlerini, birbirleriyle ve çevreleriyle etkileşimlerini inceleyen doğa bilimidir. **Sağlık, tarım, çevre ve ekonomi** alanlarının temelini oluşturur.\n\n### Tarihsel Dönüm Noktaları\n\n| Yıl | Kişi / gelişme | Katkı |\n|---|---|---|\n| 1389–1459 | **Akşemseddin** | Hastalık etmenlerinin bulaşma yollarını (mikrop düşüncesi) öne sürdü. |\n| 1665 | **Robert Hooke** | Mikroskobun öncülünü geliştirdi; *Micrographia*'da ilk hücre gözlemini yayımladı. |\n| 1838 | **Hücre teorisi** (Schleiden & Schwann) | Organizmaların hücrelerden oluştuğunu ortaya koydu. |\n| 1865 | **Gregor Mendel** | Kalıtım kurallarını bezelyelerle belirledi. |\n| 1928 | **Alexander Fleming** | Penisilini (ilk antibiyotik) keşfetti. |\n| 1953 | **DNA çift sarmalı** (Watson, Crick, Franklin) | Genetik materyalin saklanma biçimi çözüldü. |\n| 2012 / 2021 | **CRISPR-Cas** ve **mRNA aşıları** | Gen düzenleme ve yeni nesil aşı teknolojileri. |",
     "ornekler": [],
     "ozet": [
      "Biyoloji: sağlık, tarım, çevre ve ekonominin temeli.",
      "Akşemseddin → **mikrop** düşüncesi · Hooke → ilk **hücre** gözlemi · Fleming → **penisilin**.",
      "Hücre teorisi **1838** (Schleiden & Schwann); DNA çift sarmalı **1953**."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Bilimsel araştırma süreçlerinde bilimin doğasını yorumlar ve bilimsel yöntem basamaklarını uygular.",
     "en": "Interprets the nature of science in research and applies the steps of the scientific method."
    },
    "content": {
     "anlatim": "# Bilimin Doğası ve Bilimsel Yöntem\n\n### Bilimin Doğasının Temel Özellikleri\n\n- Bilimsel bilgiler **kesin, mutlak ve değişmez değildir**; yeni kanıtlarla değişebilir.\n- Bilim **kültürel ve sosyal yapıdan bağımsız** düşünülemez.\n- **Öznellik** barındırabilir; bilim insanlarının bakış açıları süreci etkileyebilir.\n- **Teoriler** (neden açıklar) ve **kanunlar** (nasıl gerçekleştiğini söyler) farklı yapılardır; aralarında **hiyerarşik bir dönüşüm yoktur** (teori kanuna dönüşmez).\n\n### Bilimsel Yöntem Basamakları\n\n1. **Gözlem yapma:** Duyu organları ve araçlarla **nitel** veya **nicel** veri toplama.\n2. **Problemi belirleme:** \"Neden?\", \"Nasıl?\" sorularıyla durumun netleştirilmesi.\n3. **Veri toplama:** Güvenilir kaynaklardan bilgi derlenmesi.\n4. **Hipotez oluşturma:** Gözlemlere dayalı, **test edilebilir geçici çözüm**.\n5. **Tahminde bulunma:** Hipotezden çıkarılan sonuç (\"Eğer … ise …\").\n6. **Deney tasarlama:** Kontrollü deneyle **bağımsız değişkenin bağımlı değişken** üzerindeki etkisi test edilir.\n7. **Analiz ve sonuç:** Bulgular hipotezi destekliyorsa raporlanır; desteklemiyorsa hipotez değiştirilir.",
     "ornekler": [
      {
       "soru": "Bir öğrenci farklı sıcaklıklardaki suda tohumların çimlenme süresini ölçüyor. Bu deneyde bağımsız ve bağımlı değişken nedir?",
       "cozum": "**Bağımsız değişken:** suyun sıcaklığı (deneyi yapanın değiştirdiği). **Bağımlı değişken:** çimlenme süresi (ölçülen sonuç)."
      }
     ],
     "ozet": [
      "Bilimsel bilgi **değişebilir**; teori ve kanun farklıdır, teori kanuna dönüşmez.",
      "Hipotez = **test edilebilir** geçici çözüm.",
      "Kontrollü deney: **bağımsız** değişkenin **bağımlı** değişkene etkisi."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Bilimsel araştırmaların bilim etiğine uygunluğu hakkında bilgi toplar ve etik dışı davranışları yorumlar.",
     "en": "Gathers information on research ethics and interprets unethical behaviour."
    },
    "content": {
     "anlatim": "# Bilim Etiği\n\nAraştırmalarda uyulması gereken etik ilkeler:\n\n- **Gönüllü onam:** Katılımcıların bilgilendirilerek onaylarının alınması.\n- **Gizlilik:** Katılımcı bilgilerinin korunması.\n- **Hayvan haklarına saygı.**\n- **Veri uydurmama (fabrikasyon).**\n- **Sonuçları değiştirmeme (falsifikasyon).**\n- **Başkasının fikrini izinsiz kullanmama (intihal).**\n- **Kaynak göstermek zorunludur.**",
     "ornekler": [],
     "ozet": [
      "Fabrikasyon = veri **uydurma**; falsifikasyon = sonuçları **değiştirme**; intihal = **izinsiz alıntı**.",
      "Gönüllü onam, gizlilik ve kaynak gösterme zorunludur."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Çevrenizdeki canlıların özelliklerini bilimsel olarak gözlemler ve ortak özellikleri sınıflandırır.",
     "en": "Observes living things scientifically and classifies their common characteristics."
    },
    "content": {
     "anlatim": "# Canlıların Ortak Özellikleri\n\n1. **Hücresel yapı:** Tüm canlılar hücre ya da hücrelerden oluşur.\n   - **Prokaryot hücre:** Çekirdek ve zarlı organel **yoktur** (bakteriler, arkeler).\n   - **Ökaryot hücre:** Belirgin çekirdek ve zarlı organeller **vardır** (amip, öglena, bitki, hayvan, mantar).\n2. **Organizasyon:** Atom → Molekül → Organel → Hücre → Doku → Organ → Sistem → Organizma.\n3. **Beslenme:**\n   - **Ototrof (üretici):** Besinini kendi üretir (fotosentez/kemosentez; bitkiler).\n   - **Heterotrof (tüketici):** Besinini hazır alır (hayvanlar, mantarlar).\n   - **Hem ototrof hem heterotrof:** Işıkta fotosentez yapar, karanlıkta hazır beslenir (öglena).\n4. **Enerji üretimi ve metabolizma:** Enerji **ATP**'den karşılanır (hücresel solunum). Metabolizma = yapım + yıkım tepkimelerinin tümü.\n   - **Anabolizma (yapım):** Küçük moleküllerden büyük molekül sentezi (protein sentezi, fotosentez). ATP harcanır, **su açığa çıkar**.\n   - **Katabolizma (yıkım):** Büyük moleküllerin hidrolizle parçalanması (sindirim, solunum). **Su kullanılır**.\n5. **Boşaltım:** Metabolik atıkların, fazla su ve tuzların uzaklaştırılarak iç dengenin korunması.\n6. **Büyüme ve gelişme:** Tek hücrelilerde hacim/kütle artışı; çok hücrelilerde hücre bölünmesiyle hücre sayısı ve hacim artışı (büyüme). Yapıların olgunlaşması **gelişmedir**.\n7. **Üreme:** Neslin devamı için birey oluşturma (eşeyli/eşeysiz). **Bireyin yaşamı için zorunlu değildir.**\n8. **Uyarılara tepki:** Çevresel değişikliklere yanıt (ayçiçeğinin güneşe yönelmesi).\n9. **Homeostazi:** İç dengenin (sıcaklık, su, pH) kararlı tutulması.\n10. **Varyasyon ve adaptasyon:** Varyasyon tür içi genetik çeşitlilik; adaptasyon hayatta kalma avantajı sağlayan kalıtsal uyum.\n\n### Virüslerin Durumu\n\nVirüsler **hücresel yapıya sahip değildir**, metabolizmaları yoktur, dış ortamda **kristalleşirler** ve kendi başlarına enzim sentezleyemezler. Yalnızca canlı hücre içinde çoğalabildikleri için **canlı ile cansız arasında geçiş formu** kabul edilirler.",
     "ornekler": [],
     "ozet": [
      "Prokaryot: çekirdek ve zarlı organel **yok**; ökaryot: **var**.",
      "Anabolizma: yapım, ATP harcanır, **su açığa çıkar**; katabolizma: yıkım, **su kullanılır**.",
      "Üreme, birey için zorunlu değil **tür** için zorunludur.",
      "Virüs: hücresel yapı ve metabolizma yok → **canlı-cansız arası**."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "İnorganik moleküllerin (su ve mineraller) canlı yaşamı üzerindeki önemi hakkında bilimsel çıkarım yapar.",
     "en": "Makes scientific inferences about the importance of inorganic molecules (water and minerals) for life."
    },
    "content": {
     "anlatim": "# İnorganik Moleküller\n\nGenellikle **karbon (C) içermeyen**, hücre zarından doğrudan geçebilen, **sindirime uğramayan**, **enerji vermeyen** ve hücrelerin yapısına katılan moleküllerdir.\n\n### Suyun Yapısı ve Önemi\n\nSu molekülü iki hidrojen ve bir oksijenin **kovalent** bağlanmasıyla oluşur. Oksijenin elektronegatifliği yüksek olduğundan **polar** yapıdadır.\n\n- **İyi çözücüdür:** Madde taşınmasını ve metabolik tepkimeleri sağlar.\n- **Kohezyon ve adezyon:** Su moleküllerinin birbirini çekmesi **kohezyon** (yüzey gerilimi oluşturur), farklı maddelere tutunması **adezyondur**. Bitkilerde suyun yukarı taşınmasında etkilidir.\n- **Yüksek ısı kapasitesi:** Ani sıcaklık değişimlerini engeller, vücut sıcaklığını dengeler.\n- **Buzun yoğunluğu:** Su donduğunda hacmi genişler, yoğunluğu azalır; buz suyun üstünde yüzer ve **su altındaki yaşamı korur**.\n\n### Mineraller\n\nCanlılar tarafından **sentezlenemeyen**, su ve besinlerle dışarıdan alınan inorganik maddelerdir.\n\n| Mineral | Görevi | Eksikliğinde |\n|---|---|---|\n| **Demir (Fe)** | Hemoglobin yapısına katılır, oksijen taşır | **Anemi** (kansızlık) |\n| **Kalsiyum (Ca)** | Kemik ve diş yapısı, kas kasılması, kan pıhtılaşması | — |\n| **İyot (I)** | Tiroksin hormonu üretimi | **Guatr** |\n| **Sodyum (Na) ve Potasyum (K)** | Sinirsel iletim, su-elektrolit dengesi | — |\n| **Fosfor (P)** | ATP, DNA, RNA ve kemik yapısı | — |\n| **Magnezyum (Mg)** | Klorofilin yapısı, enzimlerin çalışması | — |\n| **Flor (F)** | Diş sağlığı | — |",
     "ornekler": [],
     "ozet": [
      "İnorganik moleküller: **sindirilmez, enerji vermez**, zardan doğrudan geçer.",
      "Su polardır; yüksek ısı kapasitesi vücut sıcaklığını dengeler.",
      "Buz suda yüzer → su altındaki yaşam korunur.",
      "Fe eksikliği → **anemi**; I eksikliği → **guatr**; Mg → **klorofil**."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "Karbohidratların yapısını ve çeşitlerini sınıflandırır.",
     "en": "Classifies the structure and types of carbohydrates."
    },
    "content": {
     "anlatim": "# Organik Moleküller ve Karbohidratlar\n\n**Organik moleküller** yapılarında C, H, O bulunduran bileşiklerdir. Büyük yapılı olanlar (**polimerler**), küçük birimlerin (**monomerlerin**) **dehidrasyon** sentezi ile üretilir; sindirimleri **hidroliz** ile gerçekleşir.\n\n**Karbohidratlar** C, H ve O'dan oluşur; **ilk sırada kullanılan enerji kaynağıdır** ve yapıya katılır.\n\n### 1. Monosakkaritler (Tek Şekerler) — sindirime uğramaz\n\n- **5 karbonlu (pentoz):** Riboz (RNA ve ATP yapısında), deoksiriboz (DNA yapısında). Enerji vermezler.\n- **6 karbonlu (heksoz):** Glikoz (kan şekeri, temel yakıt), fruktoz (meyve şekeri), galaktoz (süt şekeri). Kapalı formülleri aynıdır (C₆H₁₂O₆); **yapısal izomerdirler**.\n\n### 2. Disakkaritler (İkili Şekerler)\n\nİki monosakkaritin dehidrasyonuyla (**glikozit bağı** kurularak, **su açığa çıkarak**) oluşur. Hücre zarından doğrudan geçemezler.\n- Glikoz + Glikoz → **Maltoz** (arpa şekeri) + H₂O\n- Glikoz + Fruktoz → **Sükroz/Sakkaroz** (çay şekeri) + H₂O\n- Glikoz + Galaktoz → **Laktoz** (süt şekeri) + H₂O\n\n### 3. Polisakkaritler (Çoklu Şekerler)\n\nÇok sayıda glikozun glikozit bağlarıyla bağlanmasıyla oluşur.\n- **Depo:** **Nişasta** (bitkiler), **glikojen** (hayvan, mantar, bakteri).\n- **Yapısal:** **Selüloz** (bitki hücre duvarı; insan sindiremez ama lifli gıda olarak bağırsak sağlığı için önemlidir), **kitin** (eklembacaklıların dış iskeleti ve mantar çeperi; azot içerir, eriyen cerrahi ipliklerde kullanılır).",
     "ornekler": [
      {
       "soru": "Laktoz sindirildiğinde hangi monosakkaritler oluşur? Bu sırada su harcanır mı, açığa mı çıkar?",
       "cozum": "Laktoz hidrolizle **glikoz ve galaktoza** ayrılır. Hidroliz olduğu için **1 su harcanır**."
      }
     ],
     "ozet": [
      "Polimer **dehidrasyonla** oluşur (su açığa çıkar), **hidrolizle** sindirilir (su harcanır).",
      "Maltoz = G + G · Sükroz = G + **fruktoz** · Laktoz = G + **galaktoz**.",
      "Nişasta bitkide, **glikojen** hayvan ve mantarda depo; selüloz ve **kitin** yapısal."
     ]
    }
   },
   {
    "id": "k7",
    "code": "1.6",
    "title": {
     "tr": "Lipitlerin yapısını ve çeşitlerini sınıflandırır.",
     "en": "Classifies the structure and types of lipids."
    },
    "content": {
     "anlatim": "# Lipitler (Yağlar)\n\nC, H ve O içerirler; bazılarında N ve P de bulunabilir. **Suda çözünmezler**, apolar (hidrofobik) özelliktedirler. **Polimer değildirler.**\n\n- **Yağ asitleri:**\n  - **Doymuş:** C atomları arasında **tek bağ**; genellikle hayvansal, oda sıcaklığında **katı** (tereyağı).\n  - **Doymamış:** **Çift bağ** içerir; genellikle bitkisel, **sıvı** (zeytinyağı).\n  - Sıvı bitkisel yağların hidrojenle doyurulmasıyla **margarin** elde edilir.\n- **Trigliseritler (nötral yağlar):** **1 gliserol + 3 yağ asidinin** ester bağlarıyla birleşmesi (dehidrasyon). **3 su açığa çıkar.** Enerji deposudur; ısı yalıtımı ve mekanik koruma sağlar.\n- **Fosfolipitler:** Hücre zarlarının temel bileşeni. **1 gliserol + 2 yağ asidi + 1 fosfat grubu.** Baş kısmı **hidrofilik**, kuyruk kısmı **hidrofobiktir**.\n- **Steroitler:** Halkasal yapılı lipitler. **Kolesterol** zar akışkanlığını düzenler; cinsiyet hormonları ve **D vitamininin** öncülüdür.",
     "ornekler": [],
     "ozet": [
      "Lipitler suda çözünmez ve **polimer değildir**.",
      "Doymuş: tek bağ, katı, hayvansal · Doymamış: çift bağ, sıvı, bitkisel.",
      "Trigliserit = 1 gliserol + **3** yağ asidi → **3 su** açığa çıkar.",
      "Fosfolipit: hidrofilik baş, hidrofobik kuyruk → **hücre zarı**."
     ]
    }
   },
   {
    "id": "k8",
    "code": "1.6",
    "title": {
     "tr": "Proteinlerin yapısını ve görevlerini açıklar.",
     "en": "Explains the structure and functions of proteins."
    },
    "content": {
     "anlatim": "# Proteinler\n\nYapılarında **C, H, O, N** ve sıklıkla **S (kükürt)** bulunur. DNA'daki genetik şifreye göre **ribozomda** sentezlenirler.\n\n### Yapı Taşı: Amino Asit\n\nMerkezi karbona bağlı **amino grubu (–NH₂)**, **karboksil grubu (–COOH)**, bir hidrojen ve değişken **radikal grup (–R)** içerir.\n- Doğada **20 çeşit** amino asit vardır.\n- Vücutta üretilemeyip besinle alınması gerekenlere **esansiyel (zorunlu) amino asit** denir.\n\n### Peptit Bağı\n\nİki amino asit arasında **su açığa çıkarak** kurulan bağdır. **n** amino asit birleşirse **n − 1** peptit bağı kurulur ve **n − 1** su açığa çıkar.\n\n### Görevleri\n\nHücrede yapı ve onarım, **enzim** ve **hormon** yapısına katılım, bağışıklık (**antikor**), oksijen taşınması (**hemoglobin**).\n\n**Denatürasyon:** Yüksek sıcaklık, pH ve basınç gibi etkenlerle proteinin **üç boyutlu yapısının bozulmasıdır**.",
     "ornekler": [
      {
       "soru": "50 amino asitten oluşan bir polipeptit sentezlenirken kaç peptit bağı kurulur ve kaç su açığa çıkar?",
       "cozum": "n − 1 = 50 − 1 = **49 peptit bağı** kurulur ve **49 su** açığa çıkar."
      }
     ],
     "ozet": [
      "Amino asit: **–NH₂ + –COOH + H + R**; 20 çeşit.",
      "n amino asit → **n − 1** peptit bağı, **n − 1** su.",
      "Denatürasyon: sıcaklık/pH ile **üç boyutlu yapının bozulması**."
     ]
    }
   },
   {
    "id": "k9",
    "code": "1.6",
    "title": {
     "tr": "pH ve sıcaklığın enzim aktivitesine etkisini açıklar ve deney analizini yapar.",
     "en": "Explains the effect of pH and temperature on enzyme activity and analyses experiments."
    },
    "content": {
     "anlatim": "# Enzimler\n\n**Biyolojik katalizörlerdir.** Tepkimelerin **aktivasyon enerjisini düşürerek** hızlandırırlar; tepkime sonunda **harcanmazlar** ve tekrar kullanılabilirler.\n\n### Yapısı\n\n- Yalnızca proteinden oluşanlar: **basit enzim**.\n- Protein kısım (**apoenzim**) + yardımcı kısım içerenler: **bileşik enzim (holoenzim)**.\n  - Yardımcı kısım **mineralse kofaktör**, **vitaminse koenzim** adını alır.\n\n### Özellikleri\n\n- **Substrata özgüdürler.** Aktif bölgeye **anahtar-kilit** veya **indüklenmiş uyum** modeliyle bağlanırlar.\n- Takım hâlinde çalışabilirler.\n\n### Çalışmalarını Etkileyen Faktörler\n\n- **Sıcaklık:** **Optimum** sıcaklıkta hız en yüksektir; çok yüksek sıcaklıkta protein yapısı bozulur (**denatüre olur**) ve enzim çalışmaz.\n- **pH:** Her enzimin uygun pH aralığı vardır. **Pepsin** midede asidik ortamda (**pH 2**), **tripsin** bağırsakta bazik ortamda (**pH 8**) çalışır.\n- **Enzim ve substrat miktarı:** Artış, belli bir **doygunluk** noktasına kadar tepkimeyi hızlandırır.\n- **Su miktarı:** Ortamdaki su oranı **%15'in altına** düşerse enzimler çalışmaz.",
     "ornekler": [],
     "ozet": [
      "Enzim: aktivasyon enerjisini **düşürür**, tepkimede **harcanmaz**.",
      "Kofaktör = **mineral**; koenzim = **vitamin**.",
      "Pepsin **pH 2**, tripsin **pH 8**; aşırı sıcaklık → denatürasyon.",
      "Su %15'in altında → enzim çalışmaz."
     ]
    }
   },
   {
    "id": "k10",
    "code": "1.6",
    "title": {
     "tr": "Nükleik asitlerin ve vitaminlerin yapısını ve görevlerini açıklar.",
     "en": "Explains the structure and roles of nucleic acids and vitamins."
    },
    "content": {
     "anlatim": "# Nükleik Asitler\n\nGenetik bilgiyi **depolayan ve aktaran** makromoleküllerdir. Yapı taşları **nükleotittir**.\n\n**Bir nükleotit = 1 fosfat + 5 karbonlu şeker (pentoz) + azotlu organik baz**\n\n| | **DNA** | **RNA** |\n|---|---|---|\n| Zincir | **Çift sarmal** | **Tek iplik** |\n| Şeker | **Deoksiriboz** | **Riboz** |\n| Bazlar | A, **T**, G, C | A, **U**, G, C |\n| Eşleşme | A = T, G ≡ C | — |\n| Görev | Hücrenin **yönetici** molekülü | **Protein sentezi** (mRNA, tRNA, rRNA) |\n\n# Vitaminler\n\n**Düzenleyici** organik moleküllerdir. **Sindirime uğramazlar** ve **enerji vermezler**. Enzimlerin **koenzimi** olarak görev yaparlar.\n\n- **Yağda çözünenler (A, D, E, K):** Karaciğerde **depolanabilir**; eksiklikleri **geç** ortaya çıkar.\n- **Suda çözünenler (B grubu ve C):** **Depolanmaz**, fazlası idrarla atılır; **günlük alınmalıdır**.",
     "ornekler": [],
     "ozet": [
      "Nükleotit = **fosfat + pentoz + azotlu baz**.",
      "DNA: çift sarmal, deoksiriboz, **timin**; RNA: tek iplik, riboz, **urasil**.",
      "Vitaminler sindirilmez, enerji vermez; **A, D, E, K** yağda, **B ve C** suda çözünür."
     ]
    }
   },
   {
    "id": "k11",
    "code": "1.7–1.8",
    "title": {
     "tr": "Organik bileşiklerin ayıraçlarla tayinini ve sıcaklık/pH'nin katalaz aktivitesine etkisini inceler.",
     "en": "Identifies organic compounds with reagents and investigates how temperature/pH affect catalase."
    },
    "content": {
     "anlatim": "# Besinlerin Belirlenmesi\n\n| Besin | Ayıraç | Sonuç (renk) |\n|---|---|---|\n| **Nişasta** | İyot / Lugol çözeltisi | **Mavi-mor** |\n| **Glikoz** (indirgen şeker) | Benedict veya Fehling (ısıtılarak) | **Kiremit kırmızısı** |\n| **Protein** | Biüret ayıracı | **Mor** |\n| **Yağ** | Sudan III / Sudan kırmızısı | **Kırmızı-turuncu** |\n\n# Katalaz Enzimi Deneyleri\n\n**Katalaz**, zehirli **hidrojen peroksiti (H₂O₂)** **su ve oksijene** (O₂ gazı kabarcıkları) dönüştürür.\n\n- Uygun sıcaklık (yaklaşık **37 °C**) ve optimum pH koşullarında kabarcık çıkışı **en fazladır**.\n- **Aşırı ısı** enzimi bozar; kabarcık çıkışı durur.",
     "ornekler": [
      {
       "soru": "Bir besine Benedict çözeltisi eklenip ısıtıldığında kiremit kırmızısı renk oluşuyor, Biüret ile renk değişmiyor. Besin hakkında ne söylenebilir?",
       "cozum": "Kiremit kırmızısı → **indirgen şeker (glikoz)** vardır. Biüret ile mor renk oluşmadığı için **protein yoktur**."
      }
     ],
     "ozet": [
      "Nişasta + iyot → **mavi-mor**; glikoz + Benedict → **kiremit kırmızısı**.",
      "Protein + Biüret → **mor**; yağ + Sudan III → **kırmızı-turuncu**.",
      "Katalaz: **H₂O₂ → su + O₂**; 37 °C'de en hızlı."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Organizasyon",
   "en": "Theme 2: Organisation"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Hücre alt birimlerini ve bu birimlerin işlevleri arasındaki ilişkiyi çözümleyerek açıklar.",
     "en": "Analyses and explains cell components and how their functions are related."
    },
    "content": {
     "anlatim": "# Hücre ve Alt Birimleri\n\n| Yapı | Görevi |\n|---|---|\n| **Hücre zarı** | **Akıcı-mozaik** zar modeli; fosfolipit çift katman, kolesterol ve taşıma proteinleri. **Seçici geçirgendir.** |\n| **Sitoplazma** | Hücre içi tepkimelerin gerçekleştiği, organelleri barındıran yarı akışkan sıvı. |\n| **Çekirdek** | Kalıtsal materyali (**DNA**) barındırır; **nükleer porlarla** madde alışverişi. **Çekirdekçik** ribozom alt birimlerini üretir. |\n| **Endoplazmik retikulum (ER)** | Madde taşınması. **Granüllü ER** ribozom taşır, **protein** sentezler; **düz ER** **lipit** sentezi ve zehirli maddelerin etkisizleştirilmesi. |\n| **Golgi aygıtı** | **Paketleme ve salgılama** merkezi; glikoprotein, lipoprotein üretir, salgı kofulları oluşturur. |\n| **Lizozom** | **Hücre içi sindirim**; hidrolitik enzimler içerir. Gelişmiş bitkilerde **yoktur**. |\n| **Kofullar** | Besin, depo, salgı ve **kontraktil** (fazla suyu dışarı atan) kofullar. |\n| **Mitokondri** | **Oksijenli solunumla ATP** üretir. Kendi **DNA, RNA ve ribozomu** vardır, bölünebilir. |\n| **Kloroplast** | **Fotosentez** yapar; stroma, grana ve klorofil içerir. Kendi DNA'sı vardır. Diğer plastitler: **kromoplast** (renkli), **lökoplast** (renksiz, depo). |\n| **Ribozom** | **Zarsızdır**, protein sentezler. |\n| **Sentrozom** | Hayvan hücrelerinde **iğ ipliklerini** oluşturur. |",
     "ornekler": [],
     "ozet": [
      "Hücre zarı: **akıcı-mozaik**, seçici geçirgen.",
      "Granüllü ER → **protein**; düz ER → **lipit**; Golgi → **paketleme-salgı**.",
      "Mitokondri ve kloroplast: **kendi DNA'sı** var, bölünebilir.",
      "Lizozom gelişmiş bitkilerde yok; sentrozom hayvan hücresinde."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2–2.3",
    "title": {
     "tr": "Hücre zarından madde geçişlerini sınıflandırır ve pasif geçiş deneylerini yorumlar.",
     "en": "Classifies transport across the cell membrane and interprets passive transport experiments."
    },
    "content": {
     "anlatim": "# Hücre Zarından Madde Geçişleri\n\n| | **Pasif taşıma** | **Aktif taşıma** |\n|---|---|---|\n| Enerji | Harcanmaz | **ATP harcanır** |\n| Yön | **Çoktan aza** | **Azdan çoğa** |\n\n### Pasif Taşıma Çeşitleri\n\n- **Basit difüzyon:** Küçük, gaz ve yağda çözünen moleküllerin fosfolipit tabakasından doğrudan geçişi.\n- **Kolaylaştırılmış difüzyon:** Büyük veya polar moleküllerin (glikoz, amino asit) **taşıyıcı ve kanal proteinleri** yardımıyla çoktan aza geçişi (ATP harcanmaz).\n- **Ozmoz:** **Suyun** seçici geçirgen zardan **çözünen madde yoğunluğunun fazla olduğu** (suyun az olduğu) tarafa doğru geçişi.\n\n### Ortam Çeşitleri\n\n- **İzotonik:** Hücreyle aynı yoğunlukta; **net su geçişi olmaz**.\n- **Hipertonik:** Hücreden daha yoğun; hücre su kaybederek büzüşür (**plazmoliz**).\n- **Hipotonik:** Hücreden az yoğun; hücre su alarak şişer (bitki hücresi **turgor** olur, hayvan hücresi patlayabilir — **hemoliz**).\n\n### Aktif Taşıma ve Kütlesel Geçişler\n\n- Küçük moleküllerin **azdan çoğa** taşınması (ATP ve taşıyıcı protein şart).\n- Büyük moleküllerin hücre içine alınması **endositoz** (fagositoz ve pinositoz), dışarı atılması **ekzositoz**.",
     "ornekler": [
      {
       "soru": "Bir bitki hücresi tuzlu suya konulursa ne gözlenir?",
       "cozum": "Tuzlu su **hipertonik** ortamdır. Hücre ozmozla su kaybeder ve sitoplazması büzüşür → **plazmoliz**."
      }
     ],
     "ozet": [
      "Pasif: enerji yok, **çoktan aza**; aktif: **ATP**, **azdan çoğa**.",
      "Hipertonik → **plazmoliz**; hipotonik → **turgor** (hayvan hücresinde hemoliz).",
      "Büyük molekül içeri **endositoz**, dışarı **ekzositoz**."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.4",
    "title": {
     "tr": "Canlıları sınıflandırma ölçütlerine göre sınıflandırır ve ikili adlandırma kuralını uygular.",
     "en": "Classifies organisms using classification criteria and applies binomial nomenclature."
    },
    "content": {
     "anlatim": "# Sınıflandırma ve İkili Adlandırma\n\nSınıflandırma bilimine **taksonomi** denir. Günümüzde akrabalık ilişkilerini esas alan **doğal (filogenetik) sınıflandırma** kullanılır.\n\n### İkili Adlandırma (Binominal Nomenklatür)\n\nTür adları **iki kelimeden** oluşur ve **italik** yazılır. Örnek: *Pinus nigra* (karaçam).\n- **Birinci kelime cins adıdır**, ilk harfi **büyük** yazılır.\n- **İkinci kelime tamamlayıcı addır**, **küçük** harfle yazılır. İkisi birlikte tür adını belirtir.\n\n### Taksonomik Basamaklar (Genelden Özele)\n\n**Âlem → Şube → Sınıf → Takım → Aile (Familya) → Cins → Tür**\n\n- Âlemden türe gidildikçe **birey sayısı azalır**, **ortak özellik ve gen benzerliği artar**.",
     "ornekler": [
      {
       "soru": "*Felis catus* (kedi) ve *Felis silvestris* (yaban kedisi) hakkında ne söylenebilir?",
       "cozum": "İkisinin cins adı aynıdır (*Felis*) → **aynı cinste** yer alırlar; tamamlayıcı adları farklı olduğu için **farklı türlerdir**."
      }
     ],
     "ozet": [
      "Tür adı: **Cins** (büyük harf) + **tamamlayıcı ad** (küçük harf), italik.",
      "Âlem → Şube → Sınıf → Takım → Aile → Cins → **Tür**.",
      "Türe doğru: birey sayısı **azalır**, benzerlik **artar**."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.5",
    "title": {
     "tr": "Canlıların üst âlemlerde gruplandırılmasına neden olan özellikleri ile ilgili çıkarım yapar.",
     "en": "Makes inferences about the features used to group organisms into domains."
    },
    "content": {
     "anlatim": "# Üç Üst Âlem (Domain) Sistemi\n\nCanlılar hücresel yapı ve moleküler verilere göre **üç domainde** incelenir: **Bakteriler, Arkeler ve Ökaryotlar**.\n\n- **Bakteriler ve arkeler prokaryottur.**\n  - Bakterilerin hücre duvarı **peptidoglikan** içerir.\n  - **Arkeler** sıcak su kaynakları, tuzlalar gibi **ekstrem** koşullarda yaşayabilir; genetik olarak ökaryotlara yakın özellikleri vardır.\n\n### Ökaryotlar Âlemleri\n\n| Âlem | Özellikler | Örnekler |\n|---|---|---|\n| **Protista** | Tek veya çok hücreli ökaryotlar | Amip, öglena, paramesyum, algler |\n| **Mantarlar** | **Kitin** hücre duvarı, heterotrof (**çürükçül**) | Şapkalı mantar, maya mantarı |\n| **Bitkiler** | **Selüloz** hücre duvarı, kloroplast, fotosentez | Damarlı/damarsız, tohumlu/tohumsuz |\n| **Hayvanlar** | Hücre duvarı **yok**, holozoik beslenme | Omurgasızlar; omurgalılar (balık, amfibi, sürüngen, kuş, memeli) |",
     "ornekler": [],
     "ozet": [
      "Üç domain: **Bakteriler, Arkeler, Ökaryotlar**.",
      "Bakteri duvarı **peptidoglikan**; arkeler **ekstrem** ortamlarda.",
      "Mantar duvarı **kitin**, bitki duvarı **selüloz**, hayvanda hücre duvarı yok."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.6",
    "title": {
     "tr": "Biyoçeşitliliği oluşturan unsurlar hakkında bilimsel çıkarım yapar ve Türkiye'nin biyoçeşitliliğini yorumlar.",
     "en": "Makes inferences about the components of biodiversity and interprets Türkiye's biodiversity."
    },
    "content": {
     "anlatim": "# Biyoçeşitlilik\n\nBiyoçeşitlilik üç düzeyde incelenir: **genetik çeşitlilik, tür çeşitliliği ve ekosistem çeşitliliği**.\n\n- **Endemik tür:** Dünyada **yalnızca belirli bir bölgede** yaşayan/yetişen yerli türlerdir (Ankara çiğdemi, Van ters lalesi, Akdeniz foku).\n- **Türkiye'nin önemi:** Anadolu **üç farklı bitki coğrafyasının** kesişim noktasındadır. İklim çeşitliliği, yer şekilleri ve kıtalar arası köprü konumu nedeniyle bitki ve hayvan türleri bakımından çok zengindir.\n- **Nuh'un Gemisi Ulusal Biyolojik Çeşitlilik Veri Tabanı:** Ülkemizdeki bitki ve hayvan envanterinin kayıt altına alındığı ve izlendiği ulusal sistemdir.",
     "ornekler": [],
     "ozet": [
      "Biyoçeşitlilik: **genetik, tür, ekosistem** çeşitliliği.",
      "Endemik = yalnızca o bölgeye özgü (Ankara çiğdemi, Van ters lalesi).",
      "Türkiye **üç bitki coğrafyasının** kesişiminde; veri tabanı: **Nuh'un Gemisi**."
     ]
    }
   }
  ]
 }
];
