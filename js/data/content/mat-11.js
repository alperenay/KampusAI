/* =========================================================
   11. Sınıf Temel Matematik — konu anlatım notları
   Kaynak: kullanıcının verdiği "11. Sınıf Temel Matematik Konu Anlatım Notları" (5 tema).
   Kaynak notlar kısa olduğu için her tema ders kitabı düzeyinde genişletildi (çözümlü örnekler, tablolar). Dörtgen tablosuna deltoit, benzerlik ünitesine özel dik üçgenler, olasılık ünitesine olay işlemleri eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/matematik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Nicelikler ve Değişimler",
   "en": "Theme 1: Quantities and Change"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Doğru orantılı değişimler ve doğrusal fonksiyonlar",
     "en": "Direct proportion and linear functions"
    },
    "content": {
     "anlatim": "# Doğru Orantı\n\nİki nicelik **doğru orantılı** ise biri kaç katına çıkarsa diğeri de o kadar katına çıkar; oranları sabittir:\n$$\\frac{y}{x} = a \\quad\\Rightarrow\\quad y = ax$$\nGrafik **orijinden geçen** bir doğrudur. Örnek: yol $=$ hız $\\times$ zaman (sabit hızda), toplam fiyat $=$ birim fiyat $\\times$ miktar.\n\n# Doğrusal Fonksiyon\n\n$$f(x) = ax + b$$\n- $a$: **eğim** (değişim oranı) $= \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{y_2 - y_1}{x_2 - x_1}$\n- $b$: **y-eksenini kestiği nokta** (başlangıç değeri)\n- $a > 0$ → **artan**, $a < 0$ → **azalan**, $a = 0$ → **sabit** fonksiyon.\n- $b \\neq 0$ ise ilişki doğrusal ama **doğru orantı değildir**.\n\n# İki Noktası Bilinen Doğru\n\n$(x_1, y_1)$ ve $(x_2, y_2)$'den geçen doğru: önce eğim $a$ bulunur, sonra $y - y_1 = a(x - x_1)$.\n\n**Modelleme:** Bir taksi açılışta $30$ TL, kilometre başına $15$ TL alıyorsa ücret $f(x) = 15x + 30$.",
     "ornekler": [
      {
       "soru": "Bir su deposunda $200$ L su var ve her dakika $8$ L su boşaltılıyor. Kalan suyu veren fonksiyonu yazınız; depo kaç dakikada boşalır?",
       "cozum": "$f(t) = 200 - 8t$ (eğim $-8$, azalan). $200 - 8t = 0 \\Rightarrow t = 25$ dakika."
      },
      {
       "soru": "$(2, 7)$ ve $(5, 16)$ noktalarından geçen doğrusal fonksiyonu bulunuz.",
       "cozum": "$a = \\frac{16-7}{5-2} = 3$. $y - 7 = 3(x - 2) \\Rightarrow f(x) = 3x + 1$."
      }
     ],
     "ozet": [
      "Doğru orantı: $y=ax$, grafik orijinden geçer.",
      "Doğrusal fonksiyon $f(x)=ax+b$; $a$ eğim, $b$ başlangıç değeri.",
      "Eğim $=\\Delta y/\\Delta x$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Ters orantılı değişimler ve rasyonel fonksiyonlar",
     "en": "Inverse proportion and rational functions"
    },
    "content": {
     "anlatim": "# Ters Orantı\n\nBiri kaç katına çıkarsa diğeri o kadar katına **iner**; **çarpımları sabittir**:\n$$x \\cdot y = k \\quad\\Rightarrow\\quad y = \\frac{k}{x} \\quad (k \\neq 0)$$\n\n**Örnekler:**\n- Sabit yolda **hız ve zaman** ($v \\cdot t = \\text{yol}$)\n- Bir işi bitiren **işçi sayısı ve süre**\n- Sabit sıcaklıkta gazın **basıncı ve hacmi** (Boyle yasası: $P\\cdot V = k$)\n- Sabit bütçede **birim fiyat ve alınan miktar**\n\n# $f(x) = \\dfrac{k}{x}$ Fonksiyonunun Özellikleri\n\n- $x = 0$'da **tanımsızdır**; tanım kümesi $\\mathbb{R}\\setminus\\{0\\}$.\n- Grafik **hiperboldür**; eksenlere yaklaşır ama onları kesmez (eksenler **asimptot**).\n- $k > 0$ ise kollar **I. ve III. bölgede**, $k < 0$ ise **II. ve IV. bölgede**.\n- $k > 0$ iken pozitif $x$ değerlerinde fonksiyon **azalandır**.\n\n**Genel rasyonel fonksiyon:** $f(x) = \\dfrac{p(x)}{q(x)}$; paydayı sıfır yapan değerlerde tanımsızdır.",
     "ornekler": [
      {
       "soru": "6 işçi bir işi 10 günde bitiriyor. Aynı hızda çalışan 15 işçi işi kaç günde bitirir?",
       "cozum": "İşçi sayısı ve süre ters orantılı: $6\\cdot10 = 15\\cdot t \\Rightarrow t = 4$ gün."
      },
      {
       "soru": "$f(x) = \\frac{12}{x}$ için $f(3)$ ve $f(-4)$ değerlerini bulunuz; grafik hangi bölgelerdedir?",
       "cozum": "$f(3) = 4$, $f(-4) = -3$. $k = 12 > 0$ olduğundan grafik **I. ve III.** bölgelerdedir."
      }
     ],
     "ozet": [
      "Ters orantı: $xy=k$, $y=k/x$.",
      "Grafik hiperbol; $x=0$'da tanımsız.",
      "Örnekler: hız–zaman, işçi–gün, Boyle yasası."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Doğrusal ve rasyonel denklem–eşitsizlik problemleri",
     "en": "Problems with linear and rational equations and inequalities"
    },
    "content": {
     "anlatim": "# Modelleme Adımları\n\n1. **Bilinmeyeni** belirle ve harfle göster.\n2. Verilenleri kullanarak **denklem ya da eşitsizlik** kur.\n3. **Çöz.**\n4. Sonucu **gerçek duruma uygunluk** açısından kontrol et (negatif süre, kesirli kişi sayısı olamaz).\n\n# Problem Türleri\n\n| Tür | Temel ilişki |\n|---|---|\n| **Maliyet–kâr** | Gelir $=$ fiyat $\\times$ adet; kâr $=$ gelir $-$ maliyet |\n| **Hareket** | yol $=$ hız $\\times$ zaman |\n| **İş** | Bir işi $a$ günde bitiren kişi 1 günde işin $\\frac1a$'ini yapar; birlikte: $\\frac1a + \\frac1b = \\frac1t$ |\n| **Karışım** | Saf madde $=$ yüzde $\\times$ toplam miktar |\n\n# Doğrusal Eşitsizlikler\n\nÇözümde negatif bir sayıyla çarpar ya da bölersen **eşitsizlik yön değiştirir**.\n\n**Örnek:** Bir firma ürün başına $40$ TL maliyetle üretip $65$ TL'ye satıyor; sabit gideri $5000$ TL. Kâr etmek için en az kaç ürün satılmalı?\n$$65x - (40x + 5000) > 0 \\Rightarrow 25x > 5000 \\Rightarrow x > 200$$\nEn az **201** ürün.",
     "ornekler": [
      {
       "soru": "Bir musluk havuzu 6 saatte, ikinci musluk 3 saatte dolduruyor. İkisi birlikte kaç saatte doldurur?",
       "cozum": "$\\frac16 + \\frac13 = \\frac16 + \\frac26 = \\frac36 = \\frac12$ → birlikte **2 saatte** doldururlar."
      },
      {
       "soru": "$\\frac{x+2}{x-1} = 3$ denklemini çözünüz.",
       "cozum": "$x \\neq 1$. $x + 2 = 3x - 3 \\Rightarrow 2x = 5 \\Rightarrow x = \\frac52$."
      }
     ],
     "ozet": [
      "Bilinmeyen → denklem → çözüm → gerçekliğe uygunluk.",
      "İş problemi: $\\frac1a+\\frac1b=\\frac1t$.",
      "Negatifle çarpınca eşitsizlik yön değiştirir."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Geometrik Şekiller — Dörtgenler",
   "en": "Theme 2: Geometric Shapes — Quadrilaterals"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Dörtgenler ve özel dörtgenlerin özellikleri",
     "en": "Quadrilaterals and their properties"
    },
    "content": {
     "anlatim": "# Dörtgen\n\nDört kenarlı çokgen. **İç açıları toplamı $360°$**, dış açıları toplamı $360°$. Bir dörtgenin **2 köşegeni** vardır.\n\n| Dörtgen | Kenarlar | Açılar | Köşegenler | Alan |\n|---|---|---|---|---|\n| **Yamuk** | **Yalnız bir çift** kenar paralel | Paralel kenarlara komşu açılar toplamı $180°$ | — | $\\dfrac{(a+c)}{2}\\cdot h$ |\n| **İkizkenar yamuk** | Paralel olmayan kenarlar eşit | Taban açıları eşit | **Eşit** | $\\dfrac{(a+c)}{2}\\cdot h$ |\n| **Paralelkenar** | Karşılıklı kenarlar **paralel ve eşit** | Karşılıklı açılar eşit, komşu açılar toplamı $180°$ | Birbirini **ortalar** | taban $\\times$ yükseklik |\n| **Dikdörtgen** | Karşılıklı kenarlar eşit | Hepsi $90°$ | **Eşit** ve birbirini ortalar | $a \\cdot b$ |\n| **Eşkenar dörtgen** | **Tüm kenarlar eşit** | Karşılıklı açılar eşit | Birbirini **dik** ortalar, açıortaydır | $\\dfrac{e \\cdot f}{2}$ |\n| **Kare** | Tüm kenarlar eşit | Hepsi $90°$ | Eşit, dik, birbirini ortalar | $a^2 = \\dfrac{e^2}{2}$ |\n| **Deltoid** | İki çift **komşu** kenar eşit | Eşit kenarlar arasındaki açılar dışındaki açılar eşit | **Dik**; biri diğerini ortalar | $\\dfrac{e \\cdot f}{2}$ |\n\n> Hiyerarşi: Kare hem dikdörtgen hem eşkenar dörtgendir; dikdörtgen ve eşkenar dörtgen birer paralelkenardır.\n\n**Yamukta orta taban:** $\\dfrac{a + c}{2}$. **Dikdörtgende köşegen:** $\\sqrt{a^2 + b^2}$.",
     "ornekler": [
      {
       "soru": "Köşegen uzunlukları $10$ cm ve $24$ cm olan eşkenar dörtgenin alanı ve bir kenar uzunluğu nedir?",
       "cozum": "Alan $= \\frac{10\\cdot24}{2} = 120$ cm². Köşegenler birbirini dik ortaladığından kenar $= \\sqrt{5^2 + 12^2} = 13$ cm."
      },
      {
       "soru": "Tabanları $8$ ve $14$ cm, yüksekliği $5$ cm olan yamuğun alanı nedir?",
       "cozum": "$A = \\frac{8+14}{2}\\cdot5 = 55$ cm²."
      }
     ],
     "ozet": [
      "Dörtgende iç açılar toplamı $360°$.",
      "Paralelkenarda köşegenler ortalar; dikdörtgende eşit; eşkenar dörtgende dik.",
      "Alanlar: yamuk $\\frac{a+c}2h$, eşkenar dörtgen $\\frac{ef}2$."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Üçgenler ve Benzerlik",
   "en": "Theme 3: Triangles and Similarity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Üçgen eşitsizliği, açı–kenar ilişkisi ve Pisagor",
     "en": "Triangle inequality, angle–side relation, Pythagoras"
    },
    "content": {
     "anlatim": "# Üçgen Eşitsizliği\n\nKenarları $a, b, c$ olan bir üçgen için:\n$$|b - c| < a < b + c$$\nBir kenar, diğer ikisinin **farkından büyük, toplamından küçük** olmalıdır.\n\n# Açı–Kenar İlişkisi\n\nBüyük açı karşısında **büyük kenar**, küçük açı karşısında **küçük kenar** bulunur. İç açıların toplamı $180°$; bir dış açı kendisine komşu olmayan iki iç açının toplamına eşittir.\n\n# Pisagor Bağıntısı\n\nDik üçgende:\n$$a^2 + b^2 = c^2 \\quad (c: \\text{hipotenüs})$$\n**Pisagor üçlüleri:** $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$ ve katları.\n\n**Özel dik üçgenler:**\n- $30°$–$60°$–$90°$: kenarlar $1 : \\sqrt3 : 2$\n- $45°$–$45°$–$90°$: kenarlar $1 : 1 : \\sqrt2$",
     "ornekler": [
      {
       "soru": "Kenarları $5$ ve $9$ cm olan bir üçgenin üçüncü kenarı tam sayı ise kaç farklı değer alabilir?",
       "cozum": "$9 - 5 < x < 9 + 5 \\Rightarrow 4 < x < 14$ → $x \\in \\{5, 6, \\ldots, 13\\}$: **9** değer."
      }
     ],
     "ozet": [
      "$|b-c|<a<b+c$.",
      "Büyük açı karşısında büyük kenar.",
      "Pisagor $a^2+b^2=c^2$; 3-4-5, 5-12-13."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Benzer üçgenler ve Thales teoremi",
     "en": "Similar triangles and Thales' theorem"
    },
    "content": {
     "anlatim": "# Benzerlik\n\nKarşılıklı açıları eşit, karşılıklı kenarları **orantılı** üçgenler benzerdir. Benzerlik oranı $k$:\n$$\\frac{a'}{a} = \\frac{b'}{b} = \\frac{c'}{c} = k$$\n\n**Benzerlik kuralları:**\n- **AA:** İki açı eşit\n- **KAK (SAS):** İki kenar orantılı ve aralarındaki açı eşit\n- **KKK (SSS):** Üç kenar orantılı\n\n**Oranlar:** Çevreler oranı $= k$, **alanlar oranı $= k^2$**, (hacimler oranı $= k^3$). Yükseklik, kenarortay ve açıortay uzunlukları da $k$ oranındadır.\n\n# Thales (Temel Orantı) Teoremi\n\nBir üçgende bir kenara **paralel** çizilen doğru, diğer iki kenarı **orantılı** parçalara ayırır:\n$$DE \\parallel BC \\Rightarrow \\frac{AD}{DB} = \\frac{AE}{EC} \\quad\\text{ve}\\quad \\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC}$$\n\n**Uygulama:** Bir ağacın gölgesi $12$ m, aynı anda $1{,}5$ m'lik çubuğun gölgesi $2$ m ise ağacın boyu: $\\dfrac{h}{12} = \\dfrac{1{,}5}{2} \\Rightarrow h = 9$ m.",
     "ornekler": [
      {
       "soru": "Benzerlik oranı $\\frac{2}{3}$ olan iki üçgenden küçüğünün alanı $20$ cm² ise büyüğünün alanı nedir?",
       "cozum": "Alanlar oranı $k^2 = \\frac{4}{9}$. $\\frac{20}{A} = \\frac{4}{9} \\Rightarrow A = 45$ cm²."
      }
     ],
     "ozet": [
      "Benzerlik: AA, KAK, KKK.",
      "Alan oranı $k^2$.",
      "Thales: paralel doğru kenarları orantılı böler."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Tema: Veri, Sayma ve Olasılık",
   "en": "Theme 4: Data, Counting and Probability"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Sayma: temel ilke, permütasyon, kombinasyon",
     "en": "Counting: fundamental principle, permutations, combinations"
    },
    "content": {
     "anlatim": "# Toplama ve Çarpma İlkesi\n\n- **Toplama ilkesi:** Ayrık seçenekler (\"ya … ya …\") → sayılar **toplanır**.\n- **Çarpma ilkesi:** Art arda yapılan seçimler (\"… ve …\") → sayılar **çarpılır**.\n\n# Faktöriyel\n\n$$n! = n\\cdot(n-1)\\cdots2\\cdot1 \\qquad 0! = 1$$\n\n# Permütasyon (Sıralama — sıra önemli)\n\n$$P(n, r) = \\frac{n!}{(n-r)!}$$\n$n$ farklı nesnenin tümünün dizilişi: $n!$. Tekrarlı nesneler: $\\dfrac{n!}{n_1!\\,n_2!\\cdots}$.\n\n# Kombinasyon (Seçme — sıra önemsiz)\n\n$$C(n, r) = \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}$$\nÖzellikler: $\\binom{n}{0} = \\binom{n}{n} = 1$, $\\binom{n}{r} = \\binom{n}{n-r}$.\n\n> **Sıra önemli mi?** Başkan–yardımcı seçmek → permütasyon; 3 kişilik komisyon seçmek → kombinasyon.",
     "ornekler": [
      {
       "soru": "8 kişilik bir sınıftan bir başkan ve bir başkan yardımcısı kaç farklı şekilde seçilir? 3 kişilik bir ekip kaç farklı şekilde seçilir?",
       "cozum": "Başkan–yardımcı (sıra önemli): $P(8,2) = 8\\cdot7 = 56$. Ekip (sıra önemsiz): $\\binom83 = \\frac{8\\cdot7\\cdot6}{3\\cdot2\\cdot1} = 56$."
      },
      {
       "soru": "KALEM kelimesinin harfleriyle anlamlı ya da anlamsız kaç farklı 5 harfli kelime yazılır? ANANAS için?",
       "cozum": "KALEM: 5 farklı harf → $5! = 120$. ANANAS: A üç, N iki tekrar → $\\frac{6!}{3!\\,2!} = 60$."
      }
     ],
     "ozet": [
      "Ya-ya → topla; ve → çarp.",
      "Permütasyon $\\frac{n!}{(n-r)!}$ sıra önemli.",
      "Kombinasyon $\\frac{n!}{r!(n-r)!}$ sıra önemsiz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Olasılık ve veri analizi",
     "en": "Probability and data analysis"
    },
    "content": {
     "anlatim": "# Olasılık\n\n**Örnek uzay** $E$: Tüm olası sonuçlar. **Olay** $A$: Örnek uzayın alt kümesi.\n$$P(A) = \\frac{s(A)}{s(E)} \\qquad 0 \\le P(A) \\le 1$$\n- $P(E) = 1$ (kesin olay), $P(\\varnothing) = 0$ (imkânsız olay).\n- **Tümleyen:** $P(A') = 1 - P(A)$.\n- **Birleşim:** $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$; **ayrık** olaylarda $P(A\\cap B) = 0$.\n- **Bağımsız** olaylar: $P(A \\cap B) = P(A)\\cdot P(B)$.\n\n# Veri Analizi\n\n| Ölçü | Tanım |\n|---|---|\n| **Aritmetik ortalama** | Değerler toplamı ÷ değer sayısı |\n| **Medyan (ortanca)** | Sıralı verinin ortasındaki değer (çift sayıda veride ortadaki iki değerin ortalaması) |\n| **Mod (tepe değer)** | En sık tekrar eden değer |\n| **Açıklık** | En büyük − en küçük |\n| **Standart sapma** | Verilerin ortalamaya göre yayılımı; küçükse veriler **ortalamaya yakın** |\n\n$$s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$\n\n> **Uç değerler** ortalamayı çok etkiler, medyanı az etkiler.",
     "ornekler": [
      {
       "soru": "İki zar atılıyor. Toplamın 7 olma olasılığı nedir?",
       "cozum": "Örnek uzay $36$. Toplamı 7 olanlar: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → $6$. $P = \\frac{6}{36} = \\frac16$."
      },
      {
       "soru": "$3, 5, 5, 7, 20$ verisinin ortalaması, medyanı ve modu nedir?",
       "cozum": "Ortalama $\\frac{40}{5} = 8$; medyan $5$; mod $5$. Uç değer $20$ ortalamayı yukarı çekmiştir."
      }
     ],
     "ozet": [
      "$P(A)=s(A)/s(E)$; $P(A')=1-P(A)$.",
      "Bağımsız olaylarda $P(A\\cap B)=P(A)P(B)$.",
      "Ortalama, medyan, mod; standart sapma yayılımı ölçer."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Tema: Fonksiyonlar ve Grafikler",
   "en": "Theme 5: Functions and Graphs"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Fonksiyon kavramı, ikinci dereceden fonksiyonlar ve grafik yorumu",
     "en": "Functions, quadratic functions and graph interpretation"
    },
    "content": {
     "anlatim": "# Fonksiyon\n\n$A$ kümesinin **her elemanını** $B$ kümesinin **yalnız bir** elemanına eşleyen bağıntı: $f: A \\to B$.\n- **Tanım kümesi** $A$, **değer kümesi** $B$, **görüntü kümesi** $f(A) \\subseteq B$.\n- **Düşey doğru testi:** Grafiği her düşey doğru en fazla bir noktada kesiyorsa fonksiyondur.\n\n# Fonksiyon Türlerinin Karşılaştırılması\n\n| Tür | Genel biçim | Grafik |\n|---|---|---|\n| Doğrusal | $f(x) = ax + b$ | Doğru |\n| İkinci dereceden | $f(x) = ax^2 + bx + c$ | **Parabol** |\n| Rasyonel (ters orantı) | $f(x) = \\dfrac{k}{x}$ | Hiperbol |\n\n# Parabol $f(x) = ax^2 + bx + c$\n\n- $a > 0$ → kollar **yukarı**, tepe noktası **minimum**; $a < 0$ → kollar **aşağı**, tepe **maksimum**.\n- **Tepe noktası:** $r = -\\dfrac{b}{2a}$, $k = f(r)$. Simetri ekseni $x = r$.\n- **y-kesişimi:** $(0, c)$.\n- **x-kesişimleri (kökler):** $\\Delta = b^2 - 4ac$; $\\Delta > 0$ iki kök, $\\Delta = 0$ tek (çakışık) kök, $\\Delta < 0$ kesişim yok.\n\n# Artanlık–Azalanlık ve Ekstremum\n\n- Bir aralıkta $x$ artarken $f(x)$ artıyorsa **artan**, azalıyorsa **azalan**.\n- Parabolde $a > 0$ ise $x < r$ için azalan, $x > r$ için artan.\n- **Maksimum/minimum problemleri:** Ör. çevresi sabit dikdörtgenin en büyük alanı.",
     "ornekler": [
      {
       "soru": "$f(x) = x^2 - 6x + 5$ parabolünün tepe noktasını, köklerini ve en küçük değerini bulunuz.",
       "cozum": "$r = \\frac{6}{2} = 3$, $f(3) = 9 - 18 + 5 = -4$ → tepe $(3, -4)$, en küçük değer $-4$. Kökler: $x^2 - 6x + 5 = (x-1)(x-5) = 0 \\Rightarrow x = 1, 5$."
      },
      {
       "soru": "Çevresi $40$ m olan dikdörtgen bir bahçenin alanı en fazla kaç m² olur?",
       "cozum": "Kenarlar $x$ ve $20 - x$: $A(x) = x(20-x) = -x^2 + 20x$. Tepe $x = 10$ → $A = 100$ m² (kare)."
      }
     ],
     "ozet": [
      "Fonksiyon: her elemanın tek görüntüsü; düşey doğru testi.",
      "Parabol: $a>0$ yukarı, tepe $r=-b/2a$.",
      "$\\Delta=b^2-4ac$ kök sayısını belirler."
     ]
    }
   }
  ]
 }
];
