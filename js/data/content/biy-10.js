/* =========================================================
   10. Sınıf Biyoloji — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Biyoloji Detaylı Konu Anlatım Notları" (Enerji ve Ekoloji temaları).
   Kazanım kodları kaynaktaki bölüm numaralarıdır (1.5–1.6 sindirim ayrı kazanımlara bölündü). Örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/biyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Enerji",
   "en": "Theme 1: Energy"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "BİY.10.1.1",
    "title": {
     "tr": "Canlılık için enerjinin önemi ve ATP",
     "en": "The importance of energy for life and ATP"
    },
    "content": {
     "anlatim": "# Enerji ve Canlılık\n\nEnerji, **iş yapabilme** ya da bir değişikliğe neden olma kapasitesidir. Hareket, üreme, büyüme, doku onarımı, vücut ısısının korunması, sinirsel iletim ve aktif taşıma gibi yaşamsal faaliyetler için **sürekli enerji** gerekir; bu enerji **besinlerden** karşılanır.\n\n- Enerji yok olmaz, **bir formdan diğerine dönüşür** (enerjinin korunumu).\n- Bitkilerde **ışık enerjisi → kimyasal enerji** (besinlerin bağları); tüketicilerde bu enerji besin zinciriyle aktarılır.\n- Tüm canlılarda besinlerdeki kimyasal enerji sonunda **ATP**'ye dönüştürülerek kullanılır.\n- Kış uykusundaki hayvanlar (ayı, yarasa, kirpi) depoladıkları besinlerin enerjisiyle hayatta kalır.\n\n# ATP (Adenozin Trifosfat)\n\n| Özellik | Açıklama |\n|---|---|\n| **Yapısı** | **Adenin** (azotlu baz) + **riboz** (şeker) + **3 fosfat** |\n| **Bağlar** | Adenin–riboz: glikozit · riboz–fosfat: ester · fosfatlar arası: **yüksek enerjili fosfat bağları** |\n| **Taşınma** | Hücre zarından **geçemez**; her hücre kendi ATP'sini üretir |\n| **Depolanma** | **Depolanmaz**; anlık üretilip tüketilir |\n\nAdenin + riboz = **adenozin** → +P = **AMP** → +P = **ADP** → +P = **ATP**\n\n$$ADP + P_i + \\text{enerji} \\rightleftharpoons ATP + H_2O$$\n- **Fosforilasyon:** ADP'ye fosfat eklenerek ATP sentezi (su açığa çıkar).\n- **Defosforilasyon (hidroliz):** ATP → ADP + $P_i$ + enerji.\n\n### ATP döngüsü\n\nYıkım tepkimeleri çoğunlukla **ekzergonik** (enerji verir), yapım tepkimeleri **endergonik** (enerji ister). ATP, enerjiyi ekzergonik tepkimelerden endergoniklere taşır; sinirsel iletim, kas kasılması, aktif taşımada kullanılır.",
     "ornekler": [
      {
       "soru": "ATP neden bir hücreden diğerine aktarılamaz ve neden depolanmaz?",
       "cozum": "ATP hücre zarından **geçemeyecek** büyüklükte ve yüklü bir moleküldür; bu yüzden her hücre kendi ATP'sini sentezler. Kararsız yüksek enerjili bağlar içerdiği için **anlık** üretilip tüketilir; uzun süreli depo yağ ve glikojen/nişastadır."
      },
      {
       "soru": "Bir koşucunun kas hücrelerinde ATP miktarı yalnızca birkaç saniyelik kasılmaya yetecek kadardır. Buna rağmen koşucu dakikalarca koşabilmektedir. Bunu nasıl açıklarsınız?",
       "cozum": "ATP **depolanmaz**, sürekli **yeniden üretilir**: ATP → ADP + P + enerji tepkimesiyle harcanan ATP, hücresel solunumda ADP + P'den yeniden sentezlenir. Kısa süreli yüksek talepte **kreatin fosfat** hızlıca ADP'ye fosfat verir, ardından glikojen ve yağların solunumu ATP üretimini sürdürür."
      }
     ],
     "ozet": [
      "ATP = adenin + riboz + 3 fosfat.",
      "Fosforilasyon: ADP + Pi → ATP (+ su); defosforilasyon tersi.",
      "ATP zardan geçmez, depolanmaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "BİY.10.1.2",
    "title": {
     "tr": "Fotosentez: pigmentler, ışıklı tepkimeler ve Calvin döngüsü",
     "en": "Photosynthesis: pigments, light reactions and the Calvin cycle"
    },
    "content": {
     "anlatim": "# Fotosentez\n\nKlorofil taşıyan canlılarda **ışık enerjisiyle inorganik maddelerden organik madde** sentezlenmesidir. Bitkiler (tam parazitler hariç), algler, öglena, siyanobakteriler, mor kükürt bakterileri fotosentez yapar (**fotoototrof**). Ekosistemlerde besin ve enerji akışının temelidir.\n\n# Işık ve Pigmentler\n\n- Işık **foton**lardan oluşur; dalga boyu kısaldıkça **enerjisi artar**. Görünür ışık 380–750 nm.\n- Bir cismin rengi **yansıttığı** dalga boyudur.\n- **Klorofil**: mor, mavi ve kırmızı ışığı çok soğurur; **yeşili yansıtır** → yapraklar yeşil.\n- **Yardımcı pigmentler** (karoten, ksantofil, likopen) farklı dalga boylarını soğurup klorofile aktarır ve klorofili fazla ışıktan korur.\n\n# 1. Işığın Kullanıldığı Tepkimeler\n\n**Yeri:** kloroplastın **granumları** (prokaryotlarda içe katlanmış zar).\n- Işık klorofili uyarır; klorofil yüksek enerjili elektron kaybeder → elektronlar **ETS**'ye geçer, enerjileriyle **ATP** sentezlenir.\n- **Fotoliz:** $H_2O \\xrightarrow{ışık} 2e^- + 2H^+ + \\frac12 O_2$\n- Klorofilin kaybettiği elektronlar sudan karşılanır; $H^+$'lar **$NADP^+$** tarafından tutularak **NADPH** oluşur; $O_2$ atmosfere verilir.\n\n# 2. Işığın Kullanılmadığı Tepkimeler (Calvin Döngüsü)\n\n**Yeri:** kloroplastın **stroması**.\n- Işık doğrudan gerekmez ama ışıklı evrenin **ATP ve NADPH**'ı gerekir; **enzimlerle** yürür (yüksek sıcaklıkta yavaşlar).\n- $CO_2$ indirgenir → 3 karbonlu **PGAL** → glikoz ve diğer organik maddeler (yağ asidi, amino asit, vitamin…).\n- Açığa çıkan $NADP^+$, ADP ve $P_i$ granuma döner. Fazla glikoz **nişasta** olarak depolanır.\n\n| | Işıklı tepkimeler | Calvin döngüsü |\n|---|---|---|\n| Yer | Granum (tilakoit) | Stroma |\n| Kullanılan | Işık, $H_2O$, ADP, $NADP^+$ | $CO_2$, ATP, NADPH |\n| Üretilen | ATP, NADPH, $O_2$ | Glikoz (PGAL), ADP, $NADP^+$ |",
     "ornekler": [
      {
       "soru": "Fotosentezde açığa çıkan oksijen hangi molekülden gelir? Nasıl kanıtlanmıştır?",
       "cozum": "**Sudan** (fotoliz). Robert Hill ve sonraki araştırmacılar ağır oksijen izotopuyla işaretlenmiş su kullanınca işaretli oksijenin açığa çıktığını göstermiştir."
      },
      {
       "soru": "Calvin döngüsü neden \"ışıktan bağımsız\" ama yine de karanlıkta uzun süre devam edemez?",
       "cozum": "Işığı doğrudan kullanmaz ama ışıklı evrede üretilen **ATP ve NADPH**'a ihtiyaç duyar; bunlar tükenince döngü durur."
      }
     ],
     "ozet": [
      "Klorofil mor-mavi-kırmızıyı soğurur, yeşili yansıtır.",
      "Işıklı evre granumda: fotoliz, ATP, NADPH, $O_2$.",
      "Calvin stromada: $CO_2$ → PGAL → glikoz."
     ]
    }
   },
   {
    "id": "k3",
    "code": "BİY.10.1.2",
    "title": {
     "tr": "Fotosentez hızını etkileyen faktörler",
     "en": "Factors affecting the rate of photosynthesis"
    },
    "content": {
     "anlatim": "# Minimum Kuralı\n\nFotosentez hızı birçok faktöre bağlıdır; **miktarı en az olan faktör** hızı belirler.\n\n| Faktör | Etkisi |\n|---|---|\n| **Işık şiddeti** | Işıksız fotosentez olmaz; şiddet arttıkça hız artar, bir noktadan sonra **sabitlenir** (başka faktör sınırlar) |\n| **Işığın dalga boyu** | Mor, mavi, kırmızıda en hızlı; **yeşilde en düşük**; kızılötesi, morötesi, X ışınında sıfır |\n| **$CO_2$ miktarı** | Havada ≈ %0,03; arttıkça hız belli bir değere kadar artar. $KOH$, $NaOH$, $Ca(OH)_2$ gibi $CO_2$ tutucular hızı düşürür |\n| **Sıcaklık** | Enzimler nedeniyle optimum ≈ 33 °C; 35 °C üstünde enzimler bozulur, hız düşer |\n| **Su** | $O_2$, elektron ve $H$ kaynağı; azalırsa hız düşer |\n| **Mineraller** | **Mg** (klorofil yapısı), **Fe** (klorofil sentezi, ETS), **P** (ATP, nükleik asit), **N** (amino asit, nükleik asit) |\n| **pH** | Enzimlerin çalıştığı aralık; asit yağmurları olumsuz etkiler |\n\n### Engelmann deneyi (1883)\n\nİpliksi alge prizmadan ışık düşürüldüğünde oksijen arayan bakteriler en çok **mor-mavi ve kırmızı** ışık alan bölgelerde kümelenmiştir → klorofil bu dalga boylarını kullanır.",
     "ornekler": [
      {
       "soru": "Işık şiddeti artırıldığı hâlde fotosentez hızı artmıyorsa sebebi ne olabilir?",
       "cozum": "Minimum kuralı: başka bir faktör (ör. **$CO_2$** ya da **sıcaklık**) sınırlayıcı olmuştur. O faktör artırılmadıkça hız artmaz."
      },
      {
       "soru": "Bir seradaki domates bitkilerinde ışık şiddeti ve sıcaklık uygun olduğu hâlde fotosentez hızı düşüktür. Seraya ne eklenmesi hızı artırabilir? Hangi kurala dayanır?",
       "cozum": "Sınırlayıcı faktör büyük olasılıkla **$CO_2$ derişimidir**; seralara $CO_2$ verilerek fotosentez hızı artırılır. **Minimum kuralı**: Fotosentez hızı, en az bulunan (sınırlayıcı) faktör tarafından belirlenir; diğer faktörleri artırmak bu durumda hızı değiştirmez."
      }
     ],
     "ozet": [
      "En az bulunan faktör hızı belirler (minimum kuralı).",
      "Yeşil ışıkta hız en düşük.",
      "Mg klorofilin yapısında; optimum sıcaklık ≈ 33 °C."
     ]
    }
   },
   {
    "id": "k4",
    "code": "BİY.10.1.3",
    "title": {
     "tr": "Fotosentezde kullanılan ve üretilen maddeler",
     "en": "Substances used and produced in photosynthesis"
    },
    "content": {
     "anlatim": "# Genel Denklem\n\n$$6CO_2 + 12H_2O \\xrightarrow{ışık,\\ klorofil} C_6H_{12}O_6 + 6O_2 + 6H_2O$$\nSadeleştirilmiş: $6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2$\n\n- **$CO_2$ tek karbon kaynağıdır.**\n- **Hidrojen kaynağı:** bitki, alg, öglena, siyanobakteride **$H_2O$**; mor kükürt bakterilerinde **$H_2S$** (yan ürün kükürt, $O_2$ çıkmaz).\n- Oksijenin kaynağı **sudur** (Hill).\n\n# Tarihsel Çalışmalar\n\n| Bilim insanı | Bulgu |\n|---|---|\n| **van Helmont** | Bitkinin kütle artışının (yanlış olarak) yalnızca sudan geldiği |\n| **Priestley** | Bitkilerin havayı \"düzelttiği\", oksijen verdiği |\n| **Ingenhousz** | Işığın ve **yeşil kısımların** gerekli olduğu |\n| **Robert Hill** | Oksijenin kaynağının **su** olduğu |\n| **Melvin Calvin** | Karbonun izlediği yol — Calvin döngüsü (1961 Nobel) |\n\n### Deney fikri\n\nYaprak ışıkta bırakılıp iyot çözeltisiyle test edilirse **nişasta** (mavi-mor renk) görülür; karanlıkta tutulan ya da alüminyumla kapatılan kısımda görülmez.",
     "ornekler": [
      {
       "soru": "Mor kükürt bakterileri fotosentez yaparken neden oksijen üretmez?",
       "cozum": "Hidrojen kaynağı olarak su yerine **$H_2S$** kullanırlar; yan ürün olarak oksijen değil **kükürt** oluşur."
      },
      {
       "soru": "Bir deneyde bitkiye $H_2^{18}O$ (ağır oksijen içeren su) verildiğinde açığa çıkan $O_2$'de $^{18}O$ bulunuyor; $C^{18}O_2$ verildiğinde bulunmuyor. Bu sonuç neyi kanıtlar?",
       "cozum": "Fotosentezde açığa çıkan oksijenin **sudan** geldiğini kanıtlar (suyun fotolizi). $CO_2$'deki oksijen ise **glikoz ve suya** katılır. Bu deney (Ruben–Kamen) işaretli atom yönteminin klasik örneğidir."
      }
     ],
     "ozet": [
      "$CO_2$ tek karbon kaynağı; $O_2$ sudan gelir.",
      "Mor kükürt bakterileri $H_2S$ kullanır.",
      "Iyot testi ile nişasta gösterilir."
     ]
    }
   },
   {
    "id": "k5",
    "code": "BİY.10.1.4",
    "title": {
     "tr": "Kemosentez",
     "en": "Chemosynthesis"
    },
    "content": {
     "anlatim": "# Işıksız Besin Sentezi\n\nBazı **prokaryotlar** inorganik maddeleri **oksitleyerek** açığa çıkan kimyasal enerjiyle $CO_2$ ve $H_2O$'dan organik madde sentezler. Bu canlılara **kemoototrof** denir.\n\n- Oksitlenen maddeler: $H_2S$, $H_2$, $NH_3$, nitrit ($NO_2^-$), $Fe^{2+}$, kükürt.\n- Yaşadıkları yerler: derin deniz **hidrotermal bacaları** (çevresinde karides, yengeç, midye ekosistemleri), bataklık dipleri, çöplükler, lağım çamuru.\n- Bulundukları ekosistemin **üreticisi**dirler.\n- Klorofil yoktur, ışık kullanmazlar → **gece-gündüz** her zaman gerçekleşebilir.\n\n| | Fotosentez | Kemosentez |\n|---|---|---|\n| Enerji kaynağı | Işık | İnorganik maddelerin oksidasyonu |\n| Klorofil | Var | Yok |\n| Canlılar | Bitki, alg, bazı bakteriler | Yalnızca bazı prokaryotlar |",
     "ornekler": [
      {
       "soru": "Güneş ışığı ulaşmayan derin okyanus tabanında nasıl bir ekosistem kurulabilir?",
       "cozum": "Hidrotermal bacalardaki **kemosentetik bakteriler** $H_2S$ gibi maddeleri oksitleyerek organik madde üretir; üretici oldukları için onlarla beslenen karides, yengeç ve midyeler yaşayabilir."
      },
      {
       "soru": "Fotosentez ve kemosentezi enerji kaynağı, gerçekleştiren canlılar ve ortak ürün bakımından karşılaştırınız.",
       "cozum": "| | Fotosentez | Kemosentez |\n|---|---|---|\n| Enerji kaynağı | Işık | İnorganik maddelerin yükseltgenmesi ($NH_3$, $H_2S$, $Fe^{2+}$) |\n| Canlılar | Bitki, alg, siyanobakteri | Bazı bakteri ve arkeler (nitrifikasyon bakterileri) |\n| Ortak ürün | **Organik madde (glikoz)** | **Organik madde (glikoz)** |\nİkisi de **ototrofik** beslenmedir; kemosentez ışığın olmadığı ortamlarda üretici görevi görür."
      }
     ],
     "ozet": [
      "Kemosentez: kimyasal enerjiyle organik madde sentezi.",
      "Yalnız prokaryotlar; ışık ve klorofil gerekmez.",
      "Hidrotermal baca ekosistemlerinin üreticisi."
     ]
    }
   },
   {
    "id": "k6",
    "code": "BİY.10.1.5",
    "title": {
     "tr": "Sindirim çeşitleri ve canlılarda sindirim yapıları",
     "en": "Types of digestion and digestive structures"
    },
    "content": {
     "anlatim": "# Sindirim\n\nBesinlerin hücrenin kullanabileceği **monomerlere** parçalanmasıdır.\n\n| Hücre içi sindirim | Hücre dışı sindirim |\n|---|---|\n| Hücre içinde, genellikle **lizozomlarda** | Hücre dışında, **sindirim kanalı/boşluğunda** enzimlerle |\n| Protistler, süngerler | Çoğu hayvan |\n\n# Beslenmeye Göre Adaptasyonlar\n\n| Yapı | Etçil | Otçul |\n|---|---|---|\n| **Dişler** | Kesici ve **köpek dişleri** gelişmiş | **Azı dişleri** geniş, öğütmeye uygun |\n| **Mide** | Tek bölmeli, genişleyebilir (köpek) | Geviş getirenlerde **4 bölmeli**: işkembe, börkenek, kırkbayır, şirden |\n| **Bağırsak** | Kısa | Uzun |\n\n> Geviş getirenlerin midesindeki **simbiyotik mikroorganizmalar** selülozu sindiren enzimleri üretir.",
     "ornekler": [
      {
       "soru": "Koyun selülozu nasıl sindirebilir?",
       "cozum": "Kendisi selüloz sindiren enzim üretmez; dört bölmeli midesindeki **mikroorganizmaların** ürettiği enzimler sayesinde (mutualizm) sindirir."
      },
      {
       "soru": "Hücre içi ve hücre dışı sindirimi tanımlayıp hangi canlılarda görüldüğüne birer örnek veriniz. Sindirim yapılarının karmaşıklaşması neyi sağlar?",
       "cozum": "**Hücre içi sindirim:** Besin hücre içine alınıp lizozom enzimleriyle sindirilir (amip, terliksi hayvan, insanda akyuvarlar). **Hücre dışı sindirim:** Enzimler hücre dışına salgılanır (mantarlar, insanın sindirim kanalı). Karmaşık sindirim sistemleri **daha büyük besinlerin** işlenmesini, bölümler arası **iş bölümünü** ve daha **verimli emilimi** sağlar."
      }
     ],
     "ozet": [
      "Hücre içi (lizozom) / hücre dışı (sindirim kanalı).",
      "Etçil: köpek dişi; otçul: geniş azı dişi.",
      "Geviş getirenlerde 4 bölmeli mide ve mikroorganizmalar."
     ]
    }
   },
   {
    "id": "k7",
    "code": "BİY.10.1.6",
    "title": {
     "tr": "İnsanda sindirim, emilim ve taşınma",
     "en": "Digestion, absorption and transport in humans"
    },
    "content": {
     "anlatim": "# İnsan Sindirim Sistemi\n\n**Sindirim kanalı:** ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs\n\n**Yardımcı organlar:**\n| Organ | Görevi |\n|---|---|\n| Tükürük bezleri | **Amilaz** (nişasta sindirimi başlar) |\n| Karaciğer | **Safra** üretir (yağları emülsiyonlaştırır, enzim değildir) |\n| Safra kesesi | Safrayı depolar |\n| Pankreas | Sindirim enzimleri + **bikarbonat** |\n\n# Bölümlere Göre Sindirim\n\n| Bölüm | Olay |\n|---|---|\n| **Ağız** | Mekanik (çiğneme) + kimyasal (amilaz → nişasta) |\n| **Mide** | Asidik ortam, **pepsin** → protein sindirimi başlar |\n| **İnce bağırsak** | Karbonhidrat, protein ve yağ sindirimi **tamamlanır**; **villus ve mikrovilluslarla** emilim |\n| **Kalın bağırsak** | **Su** ve bazı vitaminlerin emilimi, dışkı oluşumu |\n\n# Emilim ve Taşınma\n\nMonomerler (glikoz, amino asit, yağ asidi, gliserol) ince bağırsaktan **kana veya lenfe** geçer, dolaşımla hücrelere taşınır ve **hücresel solunumla** ATP'ye dönüşür.\n\n> Sindirim → emilim → taşıma → hücresel solunum zincirinin bir halkası aksarsa enerji üretimi bozulur.",
     "ornekler": [
      {
       "soru": "Safra salgısı bir enzim midir? Yağ sindirimine katkısı nedir?",
       "cozum": "Hayır, safra **enzim değildir**. Yağları küçük damlacıklara ayırır (**emülsiyon**); böylece lipaz enziminin etki yüzeyi artar."
      },
      {
       "soru": "İnce bağırsakta emilim yüzeyini artıran yapılar nelerdir? Yağların emilimi diğer besinlerden nasıl farklıdır?",
       "cozum": "**Kıvrımlar → villuslar → mikrovilluslar** emilim yüzeyini yüzlerce kat artırır. Glikoz ve amino asitler villuslardaki **kılcal kan damarlarına** geçer ve **kapı toplardamarıyla karaciğere** gider. Yağ asitleri ve gliserol ise epitel hücrelerinde yeniden yağa dönüşür ve **lenf kılcallarına (akkan damarlara)** geçer; karaciğere uğramadan kana katılır."
      }
     ],
     "ozet": [
      "Nişasta ağızda, protein midede başlar; hepsi ince bağırsakta biter.",
      "Emilim villus ve mikrovilluslarla artar.",
      "Kalın bağırsakta su emilir."
     ]
    }
   },
   {
    "id": "k8",
    "code": "BİY.10.1.7",
    "title": {
     "tr": "Hücresel solunum",
     "en": "Cellular respiration"
    },
    "content": {
     "anlatim": "# Hücresel Solunum\n\nBesinlerdeki kimyasal enerjinin **ATP**'ye dönüştürülmesi.\n\n# Oksijenli Solunum\n\n| Evre | Yeri | Ürünler |\n|---|---|---|\n| **1. Glikoliz** | Sitoplazma | Glikoz → **2 pirüvat**; net **2 ATP**, 2 NADH. Oksijen gerekmez, tüm canlılarda ortak |\n| **2. Krebs (sitrik asit) döngüsü** | Mitokondri **matriksi** | Pirüvat → asetil-CoA ($CO_2$ + NADH); döngüde $CO_2$, NADH, $FADH_2$, ATP |\n| **3. ETS** | Mitokondri **iç zarı** | NADH ve $FADH_2$'nin elektronları taşınır; **oksidatif fosforilasyon** ile çok sayıda ATP |\n\n- **Son elektron alıcısı oksijendir**: $O_2 + H^+ + e^- \\rightarrow H_2O$\n- Toplam net verim ≈ **30–32 ATP** / glikoz.\n\n$$C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\text{ATP}$$\n\n# Oksijensiz Solunum\n\nBazı prokaryotlarda son elektron alıcısı **nitrat, sülfat** gibi inorganik maddelerdir. ETS kısmen çalışır; ATP verimi oksijenliden **düşüktür**.",
     "ornekler": [
      {
       "soru": "ETS'de oksijen olmasa ne olur?",
       "cozum": "Son elektron alıcısı olmadığı için elektron akışı durur, NADH yeniden $NAD^+$'ya dönüşemez; Krebs ve ETS durur. Hücre (uygunsa) fermantasyona geçer."
      },
      {
       "soru": "Glikozdaki karbon atomları oksijenli solunumda hangi molekülle dışarı atılır?",
       "cozum": "**$CO_2$** ile (pirüvatın asetil-CoA'ya dönüşmesinde ve Krebs döngüsünde)."
      }
     ],
     "ozet": [
      "Glikoliz (sitoplazma) → Krebs (matriks) → ETS (iç zar).",
      "Son elektron alıcısı $O_2$ → su.",
      "Net ≈ 30–32 ATP."
     ]
    }
   },
   {
    "id": "k9",
    "code": "BİY.10.1.8–10",
    "title": {
     "tr": "Besinlerin solunuma katılma yolları ve enerji-metabolizma ilişkisi",
     "en": "How nutrients enter respiration; energy and metabolism"
    },
    "content": {
     "anlatim": "# Besinlerin Solunuma Katılması\n\n| Besin | Yol |\n|---|---|\n| **Karbonhidrat** | Glikoz doğrudan **glikolize**; fruktoz, galaktoz glikoliz ara ürünlerine dönüşür |\n| **Yağ** | **Gliserol** glikoliz ara ürününe dönüşür; **yağ asitleri** beta-oksidasyonla **asetil-CoA** olur → Krebs |\n| **Protein** | Amino asitler **deaminasyon** (amino grubu ayrılır) sonrası pirüvat, asetil-CoA, Krebs ara ürünlerine dönüşür |\n\n> Enerji için öncelik **karbonhidrat**, sonra **yağ**, en son **protein** (proteinlerin öncelikli görevi yapı ve işlevdir).\n\n# Enerji ve Metabolizma\n\n**Metabolizma = anabolizma (yapım, endergonik) + katabolizma (yıkım, ekzergonik)**. ATP, yıkımdan elde edilen enerjiyi yapım tepkimelerine aktarır.\n\n| Besin (1 g) | Enerji |\n|---|---|\n| Karbonhidrat | ≈ 4 kcal (17 kJ) |\n| Protein | ≈ 4 kcal (17 kJ) |\n| Yağ | ≈ **9 kcal** (38 kJ) |\n\nYağlar en yüksek enerji yoğunluğuna sahiptir → uzun süreli depo. Dengesiz beslenme obezite, diyabet, malnütrisyon gibi sorunlara yol açabilir.",
     "ornekler": [
      {
       "soru": "Bir öğrenci günde 300 g karbonhidrat, 80 g protein, 70 g yağ alıyor. Yaklaşık kaç kcal enerji alır?",
       "cozum": "$300\\cdot4 + 80\\cdot4 + 70\\cdot9 = 1200 + 320 + 630 = 2150$ kcal."
      },
      {
       "soru": "Uzun süre aç kalan bir insanda vücut, enerji için sırasıyla hangi molekülleri kullanır? Proteinlerin solunumda kullanılması neden istenmez?",
       "cozum": "Önce kan şekeri ve **karaciğer–kas glikojeni**, ardından **yağlar** (yağ asitleri asetil-KoA'ya, gliserol glikolize katılır), en son **proteinler** kullanılır. Proteinler **yapı ve enzim** molekülleridir; amino asitlerin solunumu sırasında **amonyak** gibi zararlı azotlu atıklar oluşur ve doku kaybı yaşanır."
      }
     ],
     "ozet": [
      "Yağ asitleri → asetil-CoA → Krebs.",
      "Amino asitler önce deaminasyon.",
      "Yağ 9 kcal/g; karbonhidrat ve protein 4 kcal/g."
     ]
    }
   },
   {
    "id": "k10",
    "code": "BİY.10.1.9",
    "title": {
     "tr": "Fermantasyon",
     "en": "Fermentation"
    },
    "content": {
     "anlatim": "# Fermantasyon\n\nOksijen yokluğunda glikolizden sonra pirüvatın tam oksitlenmeden dönüştürülmesidir.\n- **Krebs ve ETS çalışmaz.**\n- Amaç: **$NAD^+$'yı yenileyip glikolizin sürmesini** sağlamak.\n- Net kazanç yalnızca glikolizin **2 ATP**'si.\n\n| | Etil alkol fermantasyonu | Laktik asit fermantasyonu |\n|---|---|---|\n| **Canlılar** | Maya mantarları, bazı bitki hücreleri | Omurgalı kas hücreleri (yoğun egzersiz), *Lactobacillus* gibi bakteriler |\n| **Ürün** | Pirüvat → asetaldehit (**$CO_2$ çıkar**) → **etil alkol** | Pirüvat → **laktik asit** ($CO_2$ çıkmaz) |\n| **Kullanım** | Ekmek mayalanması (CO₂ kabartır), bira, şarap | Yoğurt, kefir, turşu, peynir |\n\n> Kaslarda biriken laktik asit yorgunluk ve ağrı hissine katkıda bulunur.",
     "ornekler": [
      {
       "soru": "Mayalı hamur sıcak ortamda neden kabarır?",
       "cozum": "Maya mantarları **etil alkol fermantasyonu** yapar; açığa çıkan **$CO_2$** gazı hamuru kabartır. Sıcaklık enzimleri hızlandırır."
      },
      {
       "soru": "Laktik asit ve etil alkol fermantasyonunu son ürün, $CO_2$ çıkışı ve örnek bakımından karşılaştırınız. Her ikisinde de net kaç ATP üretilir?",
       "cozum": "**Laktik asit fermantasyonu:** Son ürün laktik asit, $CO_2$ **çıkmaz**; yoğurt, peynir yapımı, oksijensiz kalan kas hücresi. **Etil alkol fermantasyonu:** Son ürün etil alkol ve $CO_2$; ekmek mayası, sirke ve bazı içeceklerin üretimi. Her ikisinde de ATP yalnız **glikolizde** üretilir: net **2 ATP**."
      }
     ],
     "ozet": [
      "Fermantasyon: oksijensiz, net 2 ATP.",
      "Etil alkol: maya, $CO_2$ çıkar.",
      "Laktik asit: kas ve yoğurt bakterileri, $CO_2$ çıkmaz."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Ekoloji",
   "en": "Theme 2: Ecology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "BİY.10.2.1",
    "title": {
     "tr": "Ekosistemin cansız ve canlı bileşenleri",
     "en": "Abiotic and biotic components of an ecosystem"
    },
    "content": {
     "anlatim": "# Ekoloji ve Ekosistem\n\n**Ekoloji:** canlıların birbirleri ve çevreleriyle ilişkilerini inceler. **Ekosistem:** bir bölgedeki canlıların tamamı + etkileşimde oldukları cansız çevre.\n\n# Cansız (Abiyotik) Bileşenler\n\n| Bileşen | Etkisi / örnek |\n|---|---|\n| **Işık** | Fotosentez; ışık süresi (fotoperiyot) çiçeklenme, göç, kış uykusu, üremeyi etkiler |\n| **Sıcaklık** | Enzim ve protein işleyişi; çöl tilkisi büyük kulaklı, kutup tilkisi küçük kulaklı |\n| **Su** | Taşıma, sindirim, fotosentez, ısı düzenleme; sarı sabır su depolar, kanguru sıçanı kuru tohumlarla yaşar |\n| **Toprak** | Humus, mineraller, su, hava; bitkiler tutunur, köstebek ve solucan barınır |\n| **pH** | Her canlının optimum pH'ı vardır; kirlilik ve asit yağmurları değiştirir |\n\n# Canlı (Biyotik) Bileşenler\n\n| Grup | Açıklama |\n|---|---|\n| **Üreticiler** (ototrof) | Fotosentez/kemosentezle organik madde üretir; besin zincirinin ilk halkası |\n| **Tüketiciler** (heterotrof) | Otçul, etçil, hepçil |\n| **Ayrıştırıcılar** (saprotrof) | Bakteri ve mantarlar; ölü organik maddeyi inorganik maddeye çevirir, madde döngüsünü sağlar |\n\n> Ayrıştırıcılar olmasaydı organik madde birikir, üreticiler mineral bulamaz ve ekosistem çökerdi.",
     "ornekler": [
      {
       "soru": "Bir ekosistemden tüm ayrıştırıcılar kaldırılırsa uzun vadede ne olur?",
       "cozum": "Ölü canlılar ve atıklar ayrışmaz; **mineraller toprağa dönmez**, üreticiler besin üretemez ve zincir boyunca ekosistem çöker."
      },
      {
       "soru": "Bir ormandaki sıcaklık, ışık, nem ve toprak pH'ı gibi cansız faktörlerin bitki türlerinin dağılımını nasıl etkilediğine bir örnek veriniz.",
       "cozum": "Örneğin ormanın gölgeli alt katında **ışık** az olduğu için eğrelti ve yosun gibi gölgeye dayanıklı türler yaygındır; açık alanlarda ise ışık seven otsular baskındır. Asidik topraklarda (düşük **pH**) çam ve orman gülü iyi gelişirken bazik topraklarda farklı türler görülür. Cansız faktörler, bir türün yaşayabileceği **tolerans aralığını** belirler."
      }
     ],
     "ozet": [
      "Abiyotik: ışık, sıcaklık, su, toprak, pH.",
      "Biyotik: üretici, tüketici, ayrıştırıcı.",
      "Ayrıştırıcılar madde döngüsünü sağlar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "BİY.10.2.2",
    "title": {
     "tr": "Popülasyon dinamikleri ve komünitedeki etkileşimler",
     "en": "Population dynamics and community interactions"
    },
    "content": {
     "anlatim": "# Organizasyon Düzeyleri\n\norganizma → **popülasyon** (aynı türün bir alandaki bireyleri) → **komünite** (aynı alandaki farklı popülasyonlar) → ekosistem → biyosfer\n\n# Popülasyon Dinamikleri\n\n| Kavram | Açıklama |\n|---|---|\n| **Yoğunluk** | Birim alan/hacimdeki birey sayısı |\n| **Büyüklük değişimi** | (doğum + içe göç) − (ölüm + dışa göç) |\n| **Taşıma kapasitesi** | Ortamın destekleyebileceği en fazla birey sayısı |\n| **Çevre direnci** | Artışı sınırlayan faktörler: kaynak yetersizliği, hastalık, parazit, rekabet, avcılık, iklim |\n\n# Komünitedeki Etkileşimler\n\n| Etkileşim | Taraflar | Örnek |\n|---|---|---|\n| **Rekabet** | (−/−) | Aynı besin, alan, ışık için |\n| **Av–avcı** | (+/−) | Avcı artınca av azalır, sonra avcı da azalır (salınımlı denge) |\n| **Mutualizm** | (+/+) | Baklagil–*Rhizobium*, liken |\n| **Kommensalizm** | (+/0) | Köpekbalığı–remora |\n| **Parazitizm** | (+/−) | Tenya, uyuz paraziti |\n\n# Süksesyon\n\nBir komünitenin zamanla başka bir komüniteye dönüşmesi.\n- **Primer:** Hiç canlı olmayan alanda (kaya, soğumuş lav) başlar; öncü canlılar likenlerdir.\n- **Sekonder:** Önceden canlı olan bozulmuş alanda (yangın sonrası **kızılçam ormanı**; eski biyokütleye 20–25 yılda ulaşabilir).",
     "ornekler": [
      {
       "soru": "Bir popülasyonda yılda 120 doğum, 40 içe göç, 90 ölüm ve 30 dışa göç oluyor. Popülasyon nasıl değişir?",
       "cozum": "$(120 + 40) - (90 + 30) = 40$ → **40 birey artar**."
      },
      {
       "soru": "Lav akıntısının kapladığı adada başlayan süksesyon hangi türdür?",
       "cozum": "Önceden canlı ve toprak olmadığı için **primer süksesyon**."
      }
     ],
     "ozet": [
      "Değişim = (doğum + içe göç) − (ölüm + dışa göç).",
      "Mutualizm +/+, kommensalizm +/0, parazitizm +/−.",
      "Primer süksesyon cansız alanda, sekonder bozulmuş alanda."
     ]
    }
   },
   {
    "id": "k3",
    "code": "BİY.10.2.3",
    "title": {
     "tr": "Ekosistemde madde ve enerji akışı",
     "en": "Matter and energy flow in ecosystems"
    },
    "content": {
     "anlatim": "# Enerji Tek Yönlü, Madde Döngüsel\n\n**Güneş → üreticiler → tüketiciler**; her basamakta enerji **ısı olarak kaybolur**. Madde ise ayrıştırıcılar sayesinde **geri döner**.\n\n| Kavram | Açıklama |\n|---|---|\n| **Besin zinciri** | Üreticiden tüketicilere doğrusal ilişki; her basamak bir **trofik düzey** |\n| **Besin ağı** | Kesişen zincirler; doğayı daha iyi yansıtır |\n| **Biyokütle piramidi** | Her düzeydeki toplam canlı kütlesi |\n| **Enerji piramidi** | Her basamakta ≈ **%10** enerji aktarılır, %90 ısıyla kaybolur → her zaman tepeye doğru daralır; en fazla 4–5 trofik düzey |\n\n# Biyolojik Birikim\n\n**Ağır metaller, DDT** gibi parçalanmayan zehirli maddeler besin zincirinde **üst basamaklara doğru artan** derişimde birikir. En çok **tepe avcılar** etkilenir (yumurta kabuğu incelmesi, üreme bozuklukları).",
     "ornekler": [
      {
       "soru": "Üreticilerin 10 000 kJ enerjisi varsa 3. trofik düzeye (ikincil tüketici) yaklaşık ne kadar ulaşır?",
       "cozum": "Üretici → birincil tüketici: 1000 kJ → ikincil tüketici: **100 kJ** (%10 kuralı)."
      },
      {
       "soru": "DDT'nin en yüksek derişimi neden kartallarda ölçülür?",
       "cozum": "DDT parçalanmaz ve yağ dokusunda birikir; her basamakta çok sayıda canlı tüketildiği için derişim **tepe avcıda** en yüksektir (biyolojik birikim)."
      }
     ],
     "ozet": [
      "Enerji tek yönlü akar, madde döngüseldir.",
      "Her basamakta ≈ %10 enerji aktarılır.",
      "Biyolojik birikim tepe avcıyı en çok etkiler."
     ]
    }
   },
   {
    "id": "k4",
    "code": "BİY.10.2.4",
    "title": {
     "tr": "Madde döngüleri: su, karbon, azot",
     "en": "Biogeochemical cycles: water, carbon, nitrogen"
    },
    "content": {
     "anlatim": "# Su Döngüsü\n\n**Buharlaşma** (okyanus, göl, toprak) + **terleme** (bitkiler) → **yoğuşma** (bulut) → **yağış** → yüzey akışı ve yeraltı suyu. Döngüyü **Güneş enerjisi** sürdürür.\n\n# Karbon Döngüsü\n\n- **Fotosentez:** atmosferdeki $CO_2$ organik maddeye bağlanır.\n- **Solunum, yanma, ayrışma:** $CO_2$ atmosfere döner.\n- **Okyanuslar** büyük karbon yutağıdır.\n- Fosil yakıt kullanımı ve **ormansızlaşma** atmosferik $CO_2$'yi artırır → iklim değişikliği.\n\n# Azot Döngüsü\n\n| Basamak | Ne olur? | Canlı |\n|---|---|---|\n| **Fiksasyon (bağlama)** | $N_2$ → amonyum/nitrat | *Rhizobium*, *Azotobacter*, yıldırım |\n| **Amonifikasyon** | Organik azot → amonyak | Ayrıştırıcılar |\n| **Nitrifikasyon** | Amonyum → nitrit → **nitrat** | Nitrifikasyon bakterileri |\n| **Özümleme** | Bitkiler nitrat/amonyum alır → protein, nükleik asit | Bitkiler |\n| **Denitrifikasyon** | Nitrat → $N_2$ (atmosfere) | Denitrifikasyon bakterileri |\n\n> Canlılar atmosferdeki $N_2$'yi doğrudan kullanamaz; bağlanması gerekir.",
     "ornekler": [
      {
       "soru": "Baklagiller neden toprağı azotça zenginleştirir?",
       "cozum": "Köklerindeki nodüllerde yaşayan **Rhizobium** bakterileri atmosferdeki $N_2$'yi bağlayarak bitkinin kullanabileceği forma çevirir (mutualizm)."
      },
      {
       "soru": "Karbon döngüsünde atmosfere $CO_2$ veren ve atmosferden $CO_2$ alan süreçleri yazınız. Fosil yakıt kullanımı döngüyü nasıl bozar?",
       "cozum": "**$CO_2$ verenler:** Hücresel solunum, ayrıştırıcıların faaliyeti, yanma (fosil yakıt, orman yangını), volkanizma. **$CO_2$ alanlar:** Fotosentez, okyanuslarda çözünme ve kabuklu canlıların $CaCO_3$ oluşturması. Milyonlarca yılda biriken fosil karbonun kısa sürede yakılması atmosfere **verilen $CO_2$'yi alınandan fazla** yapar → sera etkisi ve **küresel ısınma**."
      }
     ],
     "ozet": [
      "Su döngüsünü Güneş sürdürür.",
      "Karbon: fotosentezle bağlanır; solunum, yanma, ayrışmayla döner.",
      "Azot: fiksasyon → nitrifikasyon → özümleme → denitrifikasyon."
     ]
    }
   },
   {
    "id": "k5",
    "code": "BİY.10.2.5–6",
    "title": {
     "tr": "Ekolojik sürdürülebilirlik ve onu kısıtlayan durumlar",
     "en": "Ecological sustainability and threats to it"
    },
    "content": {
     "anlatim": "# Ekolojik Sürdürülebilirlik\n\nDoğal kaynakların ve **ekosistem hizmetlerinin** (temiz hava, su, toprak, iklim düzenleme, tozlaşma, besin üretimi) gelecek nesillerin de ihtiyaçlarını karşılayacak biçimde kullanılması ve korunması.\n\n# Sürdürülebilirliği Kısıtlayan Durumlar\n\n| Sorun | Neden / sonuç |\n|---|---|\n| **Habitat kaybı/parçalanması** | Orman kesimi, kentleşme, yol, baraj → popülasyonlar izole olur |\n| **Hava kirliliği** | Fosil yakıt, sanayi ($SO_2$, $NO_x$, partikül) |\n| **Ozon incelmesi** | CFC gazları → UV-B artışı, cilt kanseri, katarakt |\n| **Asit yağmurları** | $SO_2$, $NO_x$ → göl ve orman asitlenmesi |\n| **Su kirliliği** | Evsel, tarımsal, endüstriyel atık → **ötrofikasyon** (aşırı besin → alg patlaması → oksijen tükenmesi → balık ölümü) |\n| **Toprak kirliliği** | Ağır metal, pestisit, plastik |\n| **Radyoaktif kirlilik** | Nükleer kaza ve atıklar |\n| **İklim değişikliği** | Sera gazları ($CO_2$, $CH_4$, $N_2O$) → buzul erimesi, deniz seviyesi yükselmesi |\n| **Erozyon** | Toprağın su/rüzgârla taşınması |\n| **Orman yangınları** | Habitat kaybı, karbon salınımı |\n| **Biyoçeşitlilik kaybı** | Endemik türler özellikle risk altında |",
     "ornekler": [
      {
       "soru": "Bir göle tarlalardan aşırı gübre karışırsa olayların sırası nedir?",
       "cozum": "Azot-fosfor artar → **alg patlaması** → algler ölünce ayrıştırıcılar çoğalır ve **oksijeni tüketir** → balık ölümleri. Bu sürece **ötrofikasyon** denir."
      },
      {
       "soru": "Bir bölgedeki sulak alan kurutularak tarım arazisine dönüştürülüyor. Bu durumun ekolojik sürdürülebilirliğe etkilerini yazınız.",
       "cozum": "Göçmen kuşlar ve sulak alan canlıları **habitatını** kaybeder → **biyoçeşitlilik azalır**. Sulak alanın su depolama ve yeraltı suyunu besleme işlevi kaybolur; bölgede **kuraklık** ve tuzlanma artar. Kısa vadede tarım alanı kazanılsa da uzun vadede su kaynakları ve verim azalır; bu, **sürdürülemez** bir arazi kullanımıdır."
      }
     ],
     "ozet": [
      "Ekosistem hizmetleri: hava, su, toprak, tozlaşma…",
      "Ötrofikasyon: aşırı besin → alg → oksijen tükenmesi.",
      "CFC ozonu, $SO_2$/$NO_x$ asit yağmurunu oluşturur."
     ]
    }
   },
   {
    "id": "k6",
    "code": "BİY.10.2.7",
    "title": {
     "tr": "Ekolojik ayak izinin küçültülmesi",
     "en": "Reducing the ecological footprint"
    },
    "content": {
     "anlatim": "# Ekolojik Ayak İzi\n\nBir birey ya da toplumun kaynak tüketimi ve atık üretiminin, Dünya'nın bu kaynakları **yenileme kapasitesine** oranıdır. Küresel ortalama ayak izi, Dünya'nın taşıma kapasitesini **aşmıştır**.\n\n# Küçültme Yolları\n\n| Alan | Örnek |\n|---|---|\n| **Enerji** | LED, yalıtım, verimli cihaz; güneş/rüzgâr |\n| **Ulaşım** | Toplu taşıma, yürüme, bisiklet |\n| **Beslenme** | Et tüketimini azaltmak, yerel ve mevsimsel ürün |\n| **İsraf** | Gıda israfını önlemek, ambalajı azaltmak |\n| **Döngüsel kullanım** | Geri dönüşüm, yeniden kullanım |\n| **Tüketim** | Uzun ömürlü ürün, az tüketim |\n\n# Ayak İzi Nasıl Hesaplanır?\n\nAyak izi **küresel hektar (kha)** ile ölçülür: Bir kişinin tükettiği gıdayı, enerjiyi, ürünleri üretmek ve atıklarını (özellikle $CO_2$) yok etmek için gereken **biyolojik olarak verimli alan**.\n- **Karbon ayak izi:** Ayak izinin en büyük bileşeni; fosil yakıt kullanımından doğan $CO_2$'yi emecek orman alanı.\n- **Su ayak izi:** Bir ürünün üretiminde kullanılan toplam su (1 kg sığır eti ≈ 15 000 L, 1 kg buğday ≈ 1 800 L).\n- **Dünya Limit Aşım Günü:** İnsanlığın o yıl için Dünya'nın yenileyebileceği kaynakları tükettiği gün; her yıl daha erkene gelmesi kaynakların aşırı kullanıldığını gösterir.",
     "ornekler": [
      {
       "soru": "Okula özel araçla gitmek yerine bisikletle gitmek ayak izini nasıl etkiler?",
       "cozum": "Fosil yakıt tüketimi ve $CO_2$ salımı azalır → **karbon ayak izi**, dolayısıyla ekolojik ayak izi küçülür."
      },
      {
       "soru": "Bir öğrencinin haftalık alışkanlıkları: 4 kez kırmızı et, her gün 20 dk duş, her gün araba ile okul. Ayak izini en çok küçültecek üç değişikliği gerekçesiyle öneriniz.",
       "cozum": "1) **Ulaşım:** Toplu taşıma/bisiklet → karbon ayak izi en çok buradan düşer. 2) **Beslenme:** Kırmızı eti haftada 1'e indirmek → hem karbon hem su ayak izi (1 kg sığır eti ≈ 15 000 L su) azalır. 3) **Su ve enerji:** Duşu 5–7 dakikaya indirmek → sıcak su için harcanan enerji ve su tasarrufu."
      }
     ],
     "ozet": [
      "Ayak izi = tüketim ve atık / yenileme kapasitesi.",
      "Enerji, ulaşım, beslenme, israf, geri dönüşüm.",
      "Küresel ayak izi kapasiteyi aşmış durumda."
     ]
    }
   },
   {
    "id": "k7",
    "code": "BİY.10.2.8",
    "title": {
     "tr": "Doğal kaynakların ve biyoçeşitliliğin korunması",
     "en": "Conserving natural resources and biodiversity"
    },
    "content": {
     "anlatim": "# Koruma Stratejileri\n\n- **Milli parklar** ve yaban hayatı koruma alanları\n- **Ramsar Sözleşmesi** ile sulak alanların korunması (ör. **Sultan Sazlığı**)\n- Endemik ve nesli tehlikedeki türlerin izlenmesi: **Akdeniz foku**, **alageyik**\n- **Habitat restorasyonu**\n- Sürdürülebilir avcılık ve **balıkçılık kotaları**\n- Uluslararası sözleşmeler: **Biyolojik Çeşitlilik Sözleşmesi**, **CITES** (nesli tehlikedeki türlerin ticareti)\n- Eğitim ve bilinçlendirme\n\n### Türkiye'den örnekler\n\nTek Tek Dağları, Yumurtalık Lagünü gibi alanlarda **fotokapanlarla** popülasyon izleme yapılır; koruma önlemlerinin etkinliği ölçülür.\n\n# Biyoçeşitlilik Neden Önemli?\n\n**Biyoçeşitlilik**; genetik çeşitlilik, tür çeşitliliği ve ekosistem çeşitliliğinin toplamıdır. Çeşitliliği yüksek ekosistemler hastalık, kuraklık gibi değişimlere karşı daha **dirençlidir**. Besin, ilaç hammaddesi, tozlaşma, temiz su ve iklim düzenleme gibi **ekosistem hizmetleri** biyoçeşitliliğe bağlıdır.\n\nTürkiye; üç **biyocoğrafik bölgenin** (Avrupa–Sibirya, Akdeniz, İran–Turan) kesişiminde olduğu için çok zengindir ve yaklaşık **3 500'den fazla endemik bitki** türüne ev sahipliği yapar. Başlıca tehditler: **habitat kaybı**, kirlilik, istilacı türler, aşırı avlanma ve iklim değişikliğidir.",
     "ornekler": [
      {
       "soru": "Fotokapan kullanmak koruma çalışmalarına nasıl katkı sağlar?",
       "cozum": "Hayvanları rahatsız etmeden tür varlığı, birey sayısı ve davranış verisi toplanır; böylece önlemlerin işe yarayıp yaramadığı ölçülür."
      },
      {
       "soru": "Bir göle istilacı bir balık türü bırakıldığında yerli türler ve biyoçeşitlilik nasıl etkilenir?",
       "cozum": "İstilacı türün doğal **avcısı ve rakibi** yoktur; hızla çoğalır, yerli türlerle besin ve alan için **rekabet** eder ya da onları avlar. Yerli türlerin popülasyonu azalır, bazıları yok olabilir; besin ağı bozulur ve **biyoçeşitlilik azalır**. Bu yüzden canlıların bilinçsizce başka ekosistemlere taşınması yasaktır."
      }
     ],
     "ozet": [
      "Milli park, Ramsar (sulak alan), CITES.",
      "Endemik türler: Akdeniz foku, alageyik.",
      "İzleme (fotokapan) önlemlerin etkinliğini ölçer."
     ]
    }
   },
   {
    "id": "k8",
    "code": "BİY.10.2.9",
    "title": {
     "tr": "Atık yönetimi",
     "en": "Waste management"
    },
    "content": {
     "anlatim": "# Atık Yönetimi Hiyerarşisi (öncelik sırasıyla)\n\n1. **Önleme**\n2. **Azaltma**\n3. **Yeniden kullanma**\n4. **Geri dönüşüm**\n5. **Enerji geri kazanımı**\n6. **Bertaraf** (düzenli depolama)\n\n### Uygulamalar\n\n- **Kaynakta ayrıştırma:** cam, kâğıt, plastik, metal, organik, tehlikeli atık\n- **Kompost:** organik atıkları toprağa geri kazandırma\n- **Tehlikeli atıklar** (pil, elektronik, kimyasal) ayrı toplanmalı\n- **Sıfır Atık** politikaları, belediye çalışmaları ve bireysel alışkanlıklar\n\n> Doğru atık yönetimi kirliliği azaltır, kaynakları korur ve ekolojik ayak izini küçültür.\n\n# Sıfır Atık ve Döngüsel Ekonomi\n\nDoğrusal ekonomi **al–üret–kullan–at** mantığıyla çalışır. **Döngüsel ekonomide** ise ürünler onarılabilir, yeniden kullanılabilir ve sonunda hammadde olarak sisteme geri döner; atık **kaynak** olarak görülür.\n- Cam ve metaller **sonsuz kez** geri dönüştürülebilir; kâğıt lifleri birkaç döngüde kısalır.\n- Bir alüminyum kutuyu geri dönüştürmek, yeni kutu üretmeye göre yaklaşık **%95** enerji tasarrufu sağlar.\n- Düzenli depolama alanlarında organik atıklar **metan** (güçlü sera gazı) üretir; kompost bu salımı azaltır.",
     "ornekler": [
      {
       "soru": "Bir plastik şişeyi geri dönüşüme atmak ile hiç almamak arasında hangisi hiyerarşide daha önceliklidir?",
       "cozum": "**Önleme** (hiç almamak/yeniden kullanılabilir şişe kullanmak); geri dönüşüm hiyerarşide daha aşağıdadır."
      },
      {
       "soru": "Bir okul kantinindeki atıkların %40'ı organik, %30'u plastik ambalaj, %20'si kâğıt, %10'u diğer. Atık yönetimi hiyerarşisine göre bir eylem planı öneriniz.",
       "cozum": "**Önleme/azaltma:** Tek kullanımlık ambalaj yerine yeniden kullanılabilir bardak ve kaplar (plastik payı düşer). **Yeniden kullanma:** Kâğıtların arka yüzünü not için kullanmak. **Geri dönüşüm:** Plastik ve kâğıt için ayrı kutular. **Kompost:** Organik atıklar okul bahçesinde kompost yapılır. Son çare olarak kalan %10 düzenli depolamaya gönderilir."
      }
     ],
     "ozet": [
      "Önleme > azaltma > yeniden kullanma > geri dönüşüm > enerji > bertaraf.",
      "Kaynakta ayrıştırma verimi artırır.",
      "Pil ve elektronik tehlikeli atıktır."
     ]
    }
   }
  ]
 }
];
