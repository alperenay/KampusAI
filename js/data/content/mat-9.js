/* =========================================================
   9. Sınıf Matematik — konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Matematik Konu Anlatım Notları"
   (MEB Türkiye Yüzyılı Maarif Modeli, 7 tema). Metinler Markdown + LaTeX.

   Biçim (curriculum-data.js ile aynı):
     ünite   = tema          { id, name, outcomes: [...] }
     kazanım = öğrenme çıktısı { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/matematik"] = [
 {
  "id": "t1",
  "name": {
   "tr": "1. Tema: Sayılar",
   "en": "Theme 1: Numbers"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.1.1",
    "title": {
     "tr": "Gerçek sayıların üslü ve köklü gösterimleriyle yapılan işlemlere dair muhakeme yapabilme",
     "en": "Reasoning about operations with exponential and radical forms of real numbers"
    },
    "content": {
     "anlatim": "Bu temada gerçek sayıların üslü ve köklü gösterimleri, aralıklar, sayı kümeleri ve işlem özelliklerinin cebirsel ifadesi ele alınır. Öğrencilerden matematiksel muhakeme, küme sembollerini kullanma ve analojik akıl yürütme becerileri beklenir.\n\n# 1. Üslü Gösterim (Kuvvet)\n\n$a$ bir gerçek sayı, $n$ pozitif tam sayı olmak üzere $n$ tane $a$'nın çarpımı $a$'nın $n$. kuvveti olarak adlandırılır:\n\n$$a^n = \\underbrace{a \\cdot a \\cdot a \\cdots a}_{n \\text{ tane}}$$\n\n$a$ **taban**, $n$ **üs (kuvvet)** olarak isimlendirilir.\n\n**Temel özellikler:**\n\n- $a^0 = 1 \\quad (a \\neq 0)$\n- $a^{-n} = \\dfrac{1}{a^n} \\quad (a \\neq 0)$\n- $a^m \\cdot a^n = a^{m+n}$\n- $\\dfrac{a^m}{a^n} = a^{m-n} \\quad (a \\neq 0)$\n- $(a^m)^n = a^{mn}$\n- $(a \\cdot b)^n = a^n \\cdot b^n$\n- $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n} \\quad (b \\neq 0)$\n- $0^b = 0 \\quad (b > 0)$\n\n**Üslü gösterimlerle toplama-çıkarma:** Aynı tabanlı ve aynı üslü terimler ortak çarpan parantezine alınır:\n\n$$a \\cdot x^n + b \\cdot x^n = (a + b) \\cdot x^n$$\n\n$$a \\cdot x^n - b \\cdot x^n = (a - b) \\cdot x^n$$\n\n**Bilimsel (standart) gösterim:** Çok büyük veya çok küçük sayılar $a \\cdot 10^n$ biçiminde yazılır ($1 \\leq |a| < 10,\\ n \\in \\mathbb{Z}$).\n\n- Uranüs-Dünya uzaklığı: $2{,}57 \\cdot 10^{9}$ km\n- Nötron kütlesi: $1{,}675 \\cdot 10^{-24}$ g\n\n# 2. Köklü Gösterim\n\n$n \\in \\mathbb{N}$, $a \\geq 0$ için $\\sqrt[n]{a} = b \\iff b^n = a$ ve $b \\geq 0$ ($n$ çift ise). $n$ tek ise $a$ negatif olabilir.\n\n**Temel özellikler:**\n\n- $\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}$\n- $\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\dfrac{a}{b}} \\quad (b \\neq 0)$\n- $\\sqrt[n]{a^m} = a^{m/n}$ (uygun koşullarda)\n- $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}$\n- $\\left(\\sqrt[n]{a}\\right)^n = a$\n\n**Eşlenik ile çarpma (paydayı rasyonelleştirme):**\n\n$$\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a} \\qquad \\frac{1}{\\sqrt{a} + \\sqrt{b}} = \\frac{\\sqrt{a} - \\sqrt{b}}{a - b}$$",
     "ornekler": [
      {
       "soru": "Aşağıdaki üslü ifadelerin değerlerini bulunuz: $\\left(\\tfrac{1}{2}\\right)^4$, $(-2)^5$, $(-1)^6$, $-3^4$",
       "cozum": "$\\left(\\tfrac{1}{2}\\right)^4 = \\tfrac{1}{16}$, $(-2)^5 = -32$, $(-1)^6 = 1$, $-3^4 = -81$ (önce kuvvet alınır, sonra işaret uygulanır)."
      },
      {
       "soru": "Negatif üslü ifadeleri hesaplayınız: $4^{-1}$, $3^{-2}$, $(-5)^{-3}$, $\\left(\\tfrac{1}{3}\\right)^{-2}$",
       "cozum": "$4^{-1} = \\tfrac{1}{4}$, $3^{-2} = \\tfrac{1}{9}$, $(-5)^{-3} = -\\tfrac{1}{125}$, $\\left(\\tfrac{1}{3}\\right)^{-2} = 9$"
      },
      {
       "soru": "İşlemleri yapınız: $3 \\cdot 5^{10} + 5^{10}$ ve $5 \\cdot 7^{12} - 2 \\cdot 7^{12}$",
       "cozum": "Ortak çarpan parantezine alınır: $3 \\cdot 5^{10} + 5^{10} = (3+1) \\cdot 5^{10} = 4 \\cdot 5^{10}$ ve $5 \\cdot 7^{12} - 2 \\cdot 7^{12} = (5-2) \\cdot 7^{12} = 3 \\cdot 7^{12}$"
      },
      {
       "soru": "Kökleri sadeleştiriniz: $\\sqrt{49}$, $\\sqrt{1{,}69}$, $-\\sqrt{\\tfrac{64}{81}}$, $\\sqrt{8}$, $\\sqrt{12}$, $\\sqrt{50}$",
       "cozum": "$\\sqrt{49} = 7$ (rasyonel), $\\sqrt{1{,}69} = 1{,}3$ (rasyonel), $-\\sqrt{\\tfrac{64}{81}} = -\\tfrac{8}{9}$ (rasyonel), $\\sqrt{8} = 2\\sqrt{2}$, $\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{50} = 5\\sqrt{2}$ (irrasyonel)"
      }
     ],
     "ozet": [
      "$a^m \\cdot a^n = a^{m+n}$, $\\;\\dfrac{a^m}{a^n} = a^{m-n}$, $\\;(a^m)^n = a^{mn}$",
      "$a^0 = 1$ ve $a^{-n} = \\dfrac{1}{a^n}$ $(a \\neq 0)$",
      "$-3^4 = -81$ ama $(-3)^4 = 81$: önce kuvvet, sonra işaret.",
      "Bilimsel gösterim: $a \\cdot 10^n$, $1 \\leq |a| < 10$",
      "$\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$ ve $\\sqrt[n]{a^m} = a^{m/n}$",
      "$\\dfrac{1}{\\sqrt{a} + \\sqrt{b}} = \\dfrac{\\sqrt{a} - \\sqrt{b}}{a - b}$ (eşlenikle çarpma)"
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.1.2",
    "title": {
     "tr": "Gerçek sayı aralıklarının gösteriminde ve aralıklarla ilgili işlemlerde küme sembol ve işlemlerinden yararlanabilme",
     "en": "Using set symbols and operations to represent real-number intervals and operate on them"
    },
    "content": {
     "anlatim": "# Aralık Türleri\n\n- **Açık aralık:** $(a, b) = \\{x \\in \\mathbb{R} \\mid a < x < b\\}$\n- **Kapalı aralık:** $[a, b] = \\{x \\in \\mathbb{R} \\mid a \\leq x \\leq b\\}$\n- **Yarı açık:** $[a, b) = \\{x \\in \\mathbb{R} \\mid a \\leq x < b\\}$\n- **Yarı açık:** $(a, b] = \\{x \\in \\mathbb{R} \\mid a < x \\leq b\\}$\n- **Sonsuz aralıklar:** $(-\\infty, a)$, $(-\\infty, a]$, $(a, \\infty)$, $[a, \\infty)$, $(-\\infty, \\infty) = \\mathbb{R}$\n\n# Küme Sembolleri\n\n- $\\in$ : elemanıdır, $\\notin$ : elemanı değildir\n- $\\emptyset$ : boş küme\n- $\\subset$ : alt küme, $\\subsetneq$ : öz alt küme\n- $\\cup$ : birleşim, $\\cap$ : kesişim, $\\setminus$ : fark\n- $A'$ veya $A^c$ : tümleyen\n- $s(A)$ veya $|A|$ : eleman sayısı\n\n# Sayı Doğrusu Gösterimi\n\nAçık uçlar boş daire (○), kapalı uçlar dolu daire (●) ile gösterilir. Sonsuz aralıklar ok ile devam eder.",
     "ornekler": [
      {
       "soru": "$(-2, 5) \\cap [0, 8)$ aralığını bulunuz.",
       "cozum": "İki aralığın ortak kısmı $[0, 5)$'tir. $0$ ikinci aralıkta dahil olduğu için kapalı, $5$ birinci aralıkta dahil olmadığı için açık uçtur."
      },
      {
       "soru": "$(-\\infty, 3) \\cup [1, \\infty)$ aralığını bulunuz.",
       "cozum": "İki aralık birlikte tüm sayı doğrusunu kaplar: $(-\\infty, 3) \\cup [1, \\infty) = \\mathbb{R}$"
      },
      {
       "soru": "$[-1, 4) \\setminus (0, 2]$ aralığını bulunuz.",
       "cozum": "$[-1, 4)$ aralığından $(0, 2]$ çıkarılır: $[-1, 0] \\cup (2, 4)$"
      }
     ],
     "ozet": [
      "Açık uç $( \\;)$ → sayı dahil değil (○); kapalı uç $[ \\;]$ → sayı dahil (●).",
      "$\\infty$ ve $-\\infty$ her zaman açık parantezle yazılır.",
      "Kesişim $\\cap$ ortak kısım, birleşim $\\cup$ tümü, fark $\\setminus$ ilkinden ikincisini çıkarır."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.9.1.3",
    "title": {
     "tr": "Farklı sayı kümelerinin özellikleri hakkında muhakeme yapabilme",
     "en": "Reasoning about the properties of different number sets"
    },
    "content": {
     "anlatim": "# Temel Sayı Kümeleri\n\n- $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$ (Doğal sayılar – bazı kaynaklarda 0 dahil)\n- $\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$ (Tam sayılar)\n- $\\mathbb{Q} = \\left\\{\\dfrac{p}{q} \\;\\middle|\\; p \\in \\mathbb{Z},\\ q \\in \\mathbb{Z},\\ q \\neq 0\\right\\}$ (Rasyonel sayılar)\n- $\\mathbb{Q}' = \\mathbb{R} \\setminus \\mathbb{Q}$ (İrrasyonel sayılar: $\\sqrt{2}$, $\\pi$, $e$, …)\n- $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{Q}'$ (Gerçek sayılar)\n\n# İlişkiler\n\n$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$\n\n$$\\mathbb{Q} \\cap \\mathbb{Q}' = \\emptyset \\quad \\text{ve} \\quad \\mathbb{Q} \\cup \\mathbb{Q}' = \\mathbb{R}$$\n\n# Kapalılık Özellikleri\n\n- $\\mathbb{N}$ toplama ve çarpmaya göre kapalıdır, çıkarma ve bölmeye göre değildir.\n- $\\mathbb{Z}$ toplama, çıkarma ve çarpmaya göre kapalıdır, bölmeye göre değildir.\n- $\\mathbb{Q}$ dört işleme göre (bölmede sıfır hariç) kapalıdır.\n- $\\mathbb{R}$ dört işleme göre (bölmede sıfır hariç) kapalıdır.\n\n# Mutlak Değer\n\n$$|a| = \\begin{cases} a, & a \\geq 0 \\\\ -a, & a < 0 \\end{cases}$$\n\n**Özellikler:** $|a| \\geq 0$, $\\;|a| = |-a|$, $\\;|a \\cdot b| = |a| \\cdot |b|$, $\\;\\left|\\dfrac{a}{b}\\right| = \\dfrac{|a|}{|b|}$",
     "ornekler": [
      {
       "soru": "$\\sqrt{9}$, $\\sqrt{7}$, $-\\tfrac{3}{4}$, $0{,}\\overline{3}$, $\\pi$, $-5$ sayılarını en dar sayı kümesine yerleştiriniz.",
       "cozum": "$\\sqrt{9} = 3 \\in \\mathbb{N}$; $-5 \\in \\mathbb{Z}$; $-\\tfrac34$ ve $0{,}\\overline{3} = \\tfrac13 \\in \\mathbb{Q}$ (devirli ondalık sayılar rasyoneldir); $\\sqrt{7}$ ve $\\pi$ **irrasyoneldir** ($\\mathbb{Q}'$)."
      },
      {
       "soru": "“İki irrasyonel sayının toplamı her zaman irrasyoneldir.” önermesi doğru mudur? Örnekle gösteriniz.",
       "cozum": "**Yanlıştır.** $\\sqrt2$ ve $-\\sqrt2$ irrasyoneldir ama toplamları $0$ rasyoneldir. Yani irrasyonel sayılar kümesi toplamaya göre **kapalı değildir**; tek bir karşı örnek önermeyi çürütmeye yeter."
      }
     ],
     "ozet": [
      "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
      "$\\mathbb{Q} \\cap \\mathbb{Q}' = \\emptyset$, $\\;\\mathbb{Q} \\cup \\mathbb{Q}' = \\mathbb{R}$",
      "$\\mathbb{Z}$ bölmeye göre kapalı değildir; $\\mathbb{Q}$ ve $\\mathbb{R}$ dört işleme göre (sıfıra bölme hariç) kapalıdır.",
      "$|a| \\geq 0$ ve $|a \\cdot b| = |a| \\cdot |b|$"
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.9.1.4",
    "title": {
     "tr": "Gerçek sayıların işlem özelliklerini cebirsel olarak ifade etmede analojik akıl yürütebilme",
     "en": "Using analogical reasoning to express the properties of real-number operations algebraically"
    },
    "content": {
     "anlatim": "# Temel Özdeşlikler\n\n$$(a + b)^2 = a^2 + 2ab + b^2$$\n\n$$(a - b)^2 = a^2 - 2ab + b^2$$\n\n$$a^2 - b^2 = (a - b)(a + b) \\quad \\text{(İki kare farkı)}$$\n\n$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$\n\n$$(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$\n\n$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$\n\n$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$\n\n# İşlem Özellikleri (Cebirsel İfade)\n\n- **Değişme (komütatif):** $a + b = b + a$, $\\;a \\cdot b = b \\cdot a$\n- **Birleşme (asosiyatif):** $(a + b) + c = a + (b + c)$\n- **Dağılma (distribütif):** $a \\cdot (b + c) = a \\cdot b + a \\cdot c$\n- **Birim eleman:** $a + 0 = a$, $\\;a \\cdot 1 = a$\n- **Ters eleman:** $a + (-a) = 0$, $\\;a \\cdot \\dfrac{1}{a} = 1 \\quad (a \\neq 0)$\n\n# Önerme ve Mantık Bağlaçları (Bu temada giriş)\n\n- $\\land$ (ve), $\\lor$ (veya), $\\neg$ (değil), $\\Rightarrow$ (ise), $\\Leftrightarrow$ (ancak ve ancak)\n- $\\forall$ (her), $\\exists$ (bazı / vardır)",
     "ornekler": [
      {
       "soru": "$101^2 - 99^2$ işleminin sonucunu özdeşlik kullanarak bulunuz.",
       "cozum": "İki kare farkı: $a^2 - b^2 = (a - b)(a + b) = (101 - 99)(101 + 99) = 2 \\cdot 200 = 400$."
      },
      {
       "soru": "$x + y = 7$ ve $xy = 10$ ise $x^2 + y^2$ kaçtır?",
       "cozum": "$(x + y)^2 = x^2 + 2xy + y^2 \\Rightarrow 49 = x^2 + y^2 + 20 \\Rightarrow x^2 + y^2 = 29$."
      }
     ],
     "ozet": [
      "$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$",
      "$a^2 - b^2 = (a - b)(a + b)$",
      "$a^3 \\mp b^3 = (a \\mp b)(a^2 \\pm ab + b^2)$",
      "Dağılma: $a(b + c) = ab + ac$"
     ]
    }
   }
  ]
 },
 {
  "id": "t2",
  "name": {
   "tr": "2. Tema: Nicelikler ve Değişimler",
   "en": "Theme 2: Quantities and Change"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.2.1",
    "title": {
     "tr": "Doğrusal referans fonksiyon ve türetilen doğrusal fonksiyonların nitel özelliklerine ilişkin matematiksel muhakeme yapabilme",
     "en": "Reasoning about the qualitative properties of the linear reference function and linear functions derived from it"
    },
    "content": {
     "anlatim": "Bu temada doğrusal fonksiyonlar, mutlak değer fonksiyonu ve bunların nitel özellikleri ile denklem-eşitsizlik problemleri incelenir.\n\n# Referans Fonksiyon\n\n$$f : \\mathbb{R} \\to \\mathbb{R}, \\quad f(x) = x$$\n\nBu fonksiyon orijinden geçen, eğimi 1 olan doğrudur. Artan, bire bir ve örten bir fonksiyondur.\n\n# Genel Doğrusal Fonksiyon\n\n$$h(x) = ax + b \\quad (a \\neq 0)$$\n\nveya dönüşümlerle:\n\n$$g(x) = a \\cdot f(x \\pm r) \\pm k = a(x \\pm r) \\pm k$$\n\n# Nitel Özellikler\n\n- **Eğim ($a$):** Doğrunun eğimini belirler. $a > 0$ ise artan, $a < 0$ ise azalan.\n- **Sabit terim ($b$):** $y$-eksenini kestiği nokta $(0, b)$.\n- **Sıfır (kök):** $f(x) = 0$ sağlayan $x$ değeri: $x = -\\dfrac{b}{a}$\n- **Artanlık-azalanlık:** $a > 0 \\Rightarrow$ artan; $a < 0 \\Rightarrow$ azalan\n- **Bire birlik:** Doğrusal fonksiyonlar ($a \\neq 0$) bire birdir.\n- **İşaret:** $a > 0$ iken $x > -\\dfrac{b}{a}$ için pozitif, $x < -\\dfrac{b}{a}$ için negatif.\n\n# Dönüşümler\n\n- $f(x) + k$ : dikey öteleme (yukarı/aşağı)\n- $f(x - r)$ : yatay öteleme (sağa/sola)\n- $a \\cdot f(x)$ : dikey genişleme/daralma ve yansıma ($a < 0$)",
     "ornekler": [
      {
       "soru": "$f(x) = 2x - 4$ fonksiyonunun eğimini, $y$-kesişimini, kökünü ve işaretini inceleyiniz.",
       "cozum": "Eğim $= 2$ (artan), $y$-kesişimi $= -4$, kök: $2x - 4 = 0 \\Rightarrow x = 2$. İşaret: $x > 2$ için pozitif, $x < 2$ için negatif."
      },
      {
       "soru": "$f(x) = x$ referans fonksiyonundan $g(x) = -2(x - 1) + 3$ fonksiyonu nasıl elde edilir? $g$ artan mıdır?",
       "cozum": "$f$ önce **1 birim sağa** ötelenir ($x - 1$), sonra **2 katı dikey genişletilip $x$ eksenine göre yansıtılır** ($-2$), en son **3 birim yukarı** ötelenir. $g(x) = -2x + 5$; eğim $-2 < 0$ olduğu için **azalandır**."
      }
     ],
     "ozet": [
      "$h(x) = ax + b$: $a$ eğim, $b$ $y$-kesişimi, kök $x = -\\dfrac{b}{a}$",
      "$a > 0$ → artan, $a < 0$ → azalan",
      "$f(x) + k$ dikey, $f(x - r)$ yatay öteleme; $a \\cdot f(x)$'te $a < 0$ ise yansıma"
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.2.2",
    "title": {
     "tr": "Mutlak değer fonksiyonlarının nitel özelliklerini incelemek için doğrusal fonksiyonlara bağlı analojik akıl yürütebilme",
     "en": "Using analogical reasoning based on linear functions to study the qualitative properties of absolute value functions"
    },
    "content": {
     "anlatim": "# Temel Mutlak Değer Fonksiyonu\n\n$$n(x) = |x| = \\begin{cases} x, & x \\geq 0 \\\\ -x, & x < 0 \\end{cases}$$\n\nGrafiği **V** şeklindedir. Tepe noktası $(0, 0)$'dır. Azalan ($x < 0$) ve artan ($x > 0$) parçalardan oluşur.\n\n# Genel Biçim\n\n$$m(x) = \\pm |ax \\pm b| \\pm c \\quad (a \\neq 0)$$\n\n# Nitel Özellikler\n\n- **Tepe (köşe) noktası:** $|ax + b| = 0 \\Rightarrow x = -\\dfrac{b}{a}$ noktasında\n- Minimum veya maksimum değeri $c$'ye göre belirlenir.\n- Parçalı doğrusal fonksiyondur (iki doğrusal parçadan oluşur).\n- $|ax + b|$ her zaman $\\geq 0$'dır.\n\n# Mutlak Değer Fonksiyonunun Grafiğini Çizme\n\n1. **Tepe noktasını** bul: $ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}$, $y = c$.\n2. Tepenin **sağında ve solunda** birer nokta seç, değerlerini hesapla.\n3. Noktaları iki ışınla birleştir; ışınların eğimleri $a$ ve $-a$'dır.\n\n| $f(x) = \\lvert x - 1 \\rvert - 2$ | $x = -1$ | $x = 0$ | $x = 1$ | $x = 2$ | $x = 3$ |\n|---|---|---|---|---|---|\n| $f(x)$ | $0$ | $-1$ | $-2$ (tepe) | $-1$ | $0$ |\n\n- Grafik $x$ eksenini $f(x) = 0$ olan noktalarda keser: $|x - 1| = 2 \\Rightarrow x = -1$ veya $x = 3$.\n- $|x|$ grafiği **$y$ eksenine göre simetriktir**; $|x - r|$ grafiği $x = r$ doğrusuna göre simetriktir.",
     "ornekler": [
      {
       "soru": "$f(x) = |x - 3| + 2$ fonksiyonunun tepe noktasını ve en küçük değerini bulunuz.",
       "cozum": "$x - 3 = 0 \\Rightarrow x = 3$; tepe noktası $(3, 2)$. Minimum değer $2$'dir; her iki tarafta eğim $\\pm 1$'dir."
      },
      {
       "soru": "$g(x) = -|2x + 4| + 1$ fonksiyonunun tepe noktasını ve en büyük değerini bulunuz.",
       "cozum": "$2x + 4 = 0 \\Rightarrow x = -2$; tepe noktası $(-2, 1)$. Önünde eksi olduğu için grafik aşağı doğru açılır; maksimum değer $1$'dir."
      }
     ],
     "ozet": [
      "$|x|$ grafiği V şeklindedir; tepe noktası $(0, 0)$.",
      "$|ax + b| + c$ için tepe noktası $\\left(-\\dfrac{b}{a},\\ c\\right)$",
      "Önünde $+$ varsa en küçük değer, $-$ varsa en büyük değer $c$'dir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.9.2.3",
    "title": {
     "tr": "Doğrusal fonksiyonlarla ifade edilebilen denklem ve eşitsizlikler içeren problemleri çözebilme",
     "en": "Solving problems with equations and inequalities expressible by linear functions"
    },
    "content": {
     "anlatim": "# Doğrusal Denklem\n\n$$ax + b = 0 \\;\\Rightarrow\\; x = -\\frac{b}{a}$$\n\n$$ax + b = cx + d \\;\\Rightarrow\\; (a - c)x = d - b \\;\\Rightarrow\\; x = \\frac{d - b}{a - c}$$\n\n# Doğrusal Eşitsizlik\n\n$ax + b > 0$ (veya $<$, $\\geq$, $\\leq$)\n\nÇözüm kümesi bir aralıktır. **Eşitsizlik yönü, her iki taraf negatif sayı ile çarpıldığında değişir.**\n\n# Mutlak Değerli Denklem / Eşitsizlik\n\n$$|ax + b| = c \\;(c \\geq 0) \\;\\Rightarrow\\; ax + b = c \\;\\text{ veya }\\; ax + b = -c$$\n\n$$|ax + b| < c \\;\\Rightarrow\\; -c < ax + b < c$$\n\n$$|ax + b| > c \\;\\Rightarrow\\; ax + b < -c \\;\\text{ veya }\\; ax + b > c$$\n\n# Problem Çözme Stratejisi\n\n1. Problemi matematiksel dile çevir (fonksiyon veya denklem/eşitsizlik kur).\n2. Bilinmeyenleri ve verilenleri belirle.\n3. Denklemi/eşitsizliği çöz.\n4. Çözümü problem bağlamında yorumla (birim, anlamlılık vb.).",
     "ornekler": [
      {
       "soru": "Bir taksi açılışta 40 TL, her km için 25 TL alıyor. 340 TL ödeyen bir yolcu kaç km yol gitmiştir? Bütçesi en fazla 290 TL olan biri en fazla kaç km gidebilir?",
       "cozum": "Ücret $f(x) = 25x + 40$. $25x + 40 = 340 \\Rightarrow x = 12$ km. $25x + 40 \\le 290 \\Rightarrow 25x \\le 250 \\Rightarrow x \\le 10$ km."
      },
      {
       "soru": "$|2x - 3| \\le 5$ eşitsizliğinin çözüm kümesini bulunuz.",
       "cozum": "$-5 \\le 2x - 3 \\le 5 \\Rightarrow -2 \\le 2x \\le 8 \\Rightarrow -1 \\le x \\le 4$. Çözüm kümesi $[-1, 4]$."
      }
     ],
     "ozet": [
      "$ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}$",
      "Negatif sayıyla çarpınca/bölünce eşitsizlik yön değiştirir.",
      "$|ax + b| < c \\Leftrightarrow -c < ax + b < c$",
      "$|ax + b| > c \\Leftrightarrow ax + b < -c$ veya $ax + b > c$"
     ]
    }
   }
  ]
 },
 {
  "id": "t3",
  "name": {
   "tr": "3. Tema: Geometrik Şekiller",
   "en": "Theme 3: Geometric Shapes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.3.1",
    "title": {
     "tr": "Üçgende açı ve kenarla ilgili özellikleri, üçgenin açı ve kenarları arasındaki ilişkileri doğrulayabilme veya ispatlayabilme",
     "en": "Verifying or proving angle and side properties of triangles and the relations between them"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **İç açılar:** Üçgenin kenarları arasında kalan açılar. Toplamları $180^\\circ$'dir.\n- **Dış açı:** Bir kenarın uzantısı ile komşu kenar arasındaki açı. Dış açı = komşu olmayan iki iç açının toplamı.\n- **Kenar:** İki köşeyi birleştiren doğru parçası. $|AB|$, $|BC|$, $|CA|$ ile gösterilir.\n\n# Açı Özellikleri\n\n1. Üçgenin iç açıları toplamı $180^\\circ$'dir: $m(\\widehat{A}) + m(\\widehat{B}) + m(\\widehat{C}) = 180^\\circ$\n2. Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir.\n3. Üçgenin bir dış açısı, komşu iç açısından büyüktür.\n\n# Kenar-Açı İlişkileri\n\n- Bir üçgende büyük kenarın karşısındaki açı büyüktür (ve tersi).\n- Eşit kenarların karşısındaki açılar eşittir (ikizkenar üçgen).\n- Eşkenar üçgende tüm açılar $60^\\circ$'dir.\n\n# Üçgen Eşitsizliği\n\nHerhangi bir üçgende iki kenarın toplamı üçüncü kenardan büyüktür:\n\n$$|AB| + |BC| > |AC|, \\quad |AB| + |AC| > |BC|, \\quad |BC| + |AC| > |AB|$$\n\nAyrıca:\n\n$$\\big||AB| - |BC|\\big| < |AC|$$\n\n# Özel Üçgenler\n\n- **İkizkenar:** İki kenar eşit → taban açıları eşit\n- **Eşkenar:** Üç kenar eşit → üç açı $60^\\circ$\n- **Dik üçgen:** Bir açı $90^\\circ$ → Pisagor bağıntısı geçerli\n\n# İspat Örneği (İç Açılar Toplamı)\n\nBir köşeden karşı kenara paralel çizilerek veya dış açı kullanılarak ispatlanabilir. Paralel doğrular arasında kalan iç ters açılar eşitliğinden yararlanılır.",
     "ornekler": [
      {
       "soru": "Bir üçgenin iki kenarı 5 cm ve 9 cm'dir. Üçüncü kenar tam sayı olduğuna göre kaç farklı değer alabilir?",
       "cozum": "$9 - 5 < c < 9 + 5 \\Rightarrow 4 < c < 14$. Tam sayı değerler $5, 6, \\ldots, 13$ → **9 farklı** değer."
      },
      {
       "soru": "Bir üçgende $m(\\widehat{A}) = 50^\\circ$, $m(\\widehat{B}) = 70^\\circ$'dir. $C$ köşesindeki dış açıyı ve en uzun kenarı bulunuz.",
       "cozum": "$m(\\widehat{C}) = 180 - 50 - 70 = 60^\\circ$. $C$'deki dış açı $= 50 + 70 = 120^\\circ$. En büyük açı $70^\\circ$ ($\\widehat{B}$) olduğundan en uzun kenar **$B$'nin karşısındaki $[AC]$**'dir."
      }
     ],
     "ozet": [
      "İç açılar toplamı $180^\\circ$; dış açı = komşu olmayan iki iç açının toplamı",
      "Büyük kenarın karşısında büyük açı bulunur.",
      "Üçgen eşitsizliği: $\\big|a - b\\big| < c < a + b$"
     ]
    }
   }
  ]
 },
 {
  "id": "t4",
  "name": {
   "tr": "4. Tema: Eşlik ve Benzerlik",
   "en": "Theme 4: Congruence and Similarity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.4.1",
    "title": {
     "tr": "Geometrik dönüşümlerle ilgili çıkarım yapabilme",
     "en": "Making inferences about geometric transformations"
    },
    "content": {
     "anlatim": "# 1. Yansıma Dönüşümü (Simetri)\n\nBir doğruya (yansıma doğrusu) göre simetri. Nokta ile görüntüsü, yansıma doğrusuna eşit uzaklıktadır ve birleştiren doğru parçası doğruya diktir.\n\n**Korunan özellikler:** Kenar uzunlukları, açı ölçüleri, alan, çevre, noktalar arası uzaklık. Şekil ile görüntüsü eştir ($\\cong$).\n\n# 2. Öteleme Dönüşümü\n\nŞekil, belirli bir doğrultuda ve uzaklıkta kaydırılır. Her nokta aynı vektör kadar yer değiştirir.\n\n**Korunan özellikler:** Tüm uzunluklar, açılar, alan, yön (oryantasyon). Şekil ile görüntüsü eştir.\n\n# 3. Dönme Dönüşümü\n\nŞekil, bir merkez nokta etrafında belirli bir açı kadar döndürülür. Her noktanın merkeze uzaklığı korunur.\n\n**Korunan özellikler:** Uzunluklar, açılar, alan. Yön korunabilir veya değişebilir. Şekil ile görüntüsü eştir.\n\n> **Önemli:** Yansıma, öteleme ve dönme uzaklık koruyan (izometri) dönüşümlerdir. Eş şekiller üretirler.",
     "ornekler": [
      {
       "soru": "$A(2, 3)$ noktasının $x$ eksenine göre yansıması, $(4, -1)$ vektörü kadar ötelenmesi ve orijin etrafında $90^\\circ$ (saat yönünün tersine) döndürülmesiyle elde edilen noktaları bulunuz.",
       "cozum": "$x$ eksenine göre yansıma: $(2, -3)$. Öteleme: $(2 + 4,\\ 3 - 1) = (6, 2)$. Orijin etrafında $90^\\circ$ dönme $(x, y) \\to (-y, x)$: $(-3, 2)$."
      },
      {
       "soru": "Bir üçgen önce bir doğruya göre yansıtılıp sonra ötelenirse elde edilen üçgen ilk üçgene eş midir? Neden?",
       "cozum": "**Evet.** Yansıma ve öteleme uzunlukları ve açıları koruyan (izometri) dönüşümlerdir; art arda uygulanmaları da izometridir. Görüntü üçgen ilk üçgene **eştir**."
      }
     ],
     "ozet": [
      "Yansıma, öteleme ve dönme **izometridir**: uzunluk, açı ve alan korunur; görüntü şekle eştir.",
      "Yansımada nokta ile görüntüsünü birleştiren doğru parçası yansıma doğrusuna diktir ve doğru onu ortalar.",
      "Ötelemede her nokta aynı vektör kadar kayar; dönmede merkeze uzaklık korunur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.4.2",
    "title": {
     "tr": "İki üçgenin eş veya benzer olması için gerekli asgari koşullarla ilgili çıkarım yapabilme",
     "en": "Making inferences about the minimum conditions for two triangles to be congruent or similar"
    },
    "content": {
     "anlatim": "# Eşlik ($\\cong$)\n\nİki üçgenin karşılıklı kenarları ve açıları eşitse eştir.\n\n**Eşlik koşulları (yeterli):**\n\n- **KAK (Kenar-Açı-Kenar):** İki kenar ve aralarındaki açı eşit\n- **AKA (Açı-Kenar-Açı):** İki açı ve aralarındaki kenar eşit\n- **KKK (Kenar-Kenar-Kenar):** Üç kenar eşit\n- **KKA (Kenar-Kenar-Açı):** İki kenar ve büyük kenara karşı açı eşit (dikkatli kullanılmalı)\n\n# Benzerlik ($\\sim$)\n\nİki üçgenin karşılıklı açıları eşit ve kenarları orantılıysa benzerdir.\n\n**Benzerlik koşulları:**\n\n- **AA (Açı-Açı):** İki açı eşit → üçüncü de eşit → benzer\n- **KAK (Kenar-Açı-Kenar orantılı):** İki kenar orantılı ve aradaki açı eşit\n- **KKK (Kenar orantılı):** Üç kenar orantılı\n\n# Benzerlik Oranı\n\n$k$ = karşılıklı kenarların oranı.\n\n$$\\text{Çevre oranı} = k, \\qquad \\text{Alan oranı} = k^2$$",
     "ornekler": [
      {
       "soru": "$ABC$ ve $DEF$ üçgenlerinde $|AB| = |DE|$, $|AC| = |DF|$ ve $m(\\widehat{A}) = m(\\widehat{D})$'dir. Üçgenler eş midir?",
       "cozum": "**Evet, KAK** eşlik koşuluna göre: iki kenar ve **bu kenarların arasındaki** açı eşittir. Bu yüzden $|BC| = |EF|$ ve diğer açılar da eşittir."
      },
      {
       "soru": "Kenarları 4, 6, 8 cm olan üçgen ile kenarları 6, 9, 12 cm olan üçgen benzer midir? Alanlar oranı kaçtır?",
       "cozum": "$\\dfrac{4}{6} = \\dfrac{6}{9} = \\dfrac{8}{12} = \\dfrac23$ → **KKK benzerliği**, $k = \\dfrac23$. Alanlar oranı $k^2 = \\dfrac49$."
      }
     ],
     "ozet": [
      "Eşlik: KAK, AKA, KKK (KKA dikkatli kullanılır).",
      "Benzerlik: AA, KAK (orantılı), KKK (orantılı).",
      "Benzerlik oranı $k$ ise çevreler oranı $k$, alanlar oranı $k^2$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.9.4.3",
    "title": {
     "tr": "Bir üçgenden hareketle ona benzer üçgenler oluşturma ile ilgili yansıtma yapabilme",
     "en": "Reflecting on constructing triangles similar to a given triangle"
    },
    "content": {
     "anlatim": "Bir üçgene benzer yeni üçgenler oluşturmak için kenarları **aynı oranda** büyüterek/küçülterek veya **açıları koruyarak** çizim yapılabilir. Bunun için homoteti (benzerlik dönüşümü) kullanılır.\n\n# Benzer Üçgen Oluşturma Yolları\n\n1. **Paralel çizme:** Üçgenin bir kenarına paralel bir doğru çizilir; kesilen küçük üçgen büyük üçgene **benzerdir** (açılar yöndeş açılar olarak eşit kalır).\n2. **Homoteti (merkezli büyütme):** Bir $O$ noktası seçilir; her köşe $O$'dan geçen ışın üzerinde $|OA'| = k \\cdot |OA|$ olacak biçimde taşınır. $k > 1$ büyütme, $0 < k < 1$ küçültme yapar.\n3. **Kare kâğıt ve ölçek:** Harita, maket ve mimari çizimler benzerliğe dayanır (1 : 100 ölçekli çizimde her uzunluk 100 kat küçüktür).\n\n> **Yansıtma:** Benzerlikte **şekil** (açılar) korunur, **büyüklük** değişir; eşlikte ikisi de korunur. Eşlik, $k = 1$ olan özel bir benzerliktir.",
     "ornekler": [
      {
       "soru": "Bir üçgenin kenarları 2 katına çıkarılarak yeni bir üçgen çiziliyor. Benzerlik oranı ve alan nasıl değişir?",
       "cozum": "Benzer ve daha büyük bir üçgen elde edilir. Benzerlik oranı $k = 2$ olduğundan alan $k^2 = 4$ katına çıkar."
      },
      {
       "soru": "Kenarları 3, 4, 5 cm olan bir üçgene benzer, çevresi 36 cm olan üçgenin kenarlarını bulunuz.",
       "cozum": "İlk üçgenin çevresi 12 cm; $k = \\dfrac{36}{12} = 3$. Kenarlar $9$, $12$, $15$ cm."
      }
     ],
     "ozet": [
      "Kenarlar aynı oranda büyütülür/küçültülürse veya açılar korunursa benzer üçgen elde edilir.",
      "Kenarlar $k$ katına çıkarsa alan $k^2$ katına çıkar.",
      "Homoteti: merkezden geçen ışınlarda $k$ katı büyütme/küçültme; eşlik $k = 1$ olan benzerliktir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.9.4.4",
    "title": {
     "tr": "Tales, Öklid ve Pisagor teoremlerini ispatlayabilme",
     "en": "Proving the Thales, Euclid and Pythagorean theorems"
    },
    "content": {
     "anlatim": "# Tales Teoremi\n\nBir üçgenin iki kenarını kesen ve üçüncü kenara paralel olan doğru, diğer iki kenarı orantılı böler:\n\n$$\\frac{|AD|}{|DB|} = \\frac{|AE|}{|EC|} \\qquad (BC \\parallel DE \\text{ ise})$$\n\n*Genelleme:* Paralel doğrular, kesenler üzerinde orantılı parçalar oluşturur.\n\n# Öklid Teoremi (Dik Üçgende)\n\nDik üçgende dik kenarların karesi, hipotenüse ait izdüşüm ile hipotenüsün çarpımına eşittir:\n\n$$a^2 = p \\cdot c, \\qquad b^2 = q \\cdot c \\qquad (c \\text{ hipotenüs; } p \\text{ ve } q \\text{ izdüşümler})$$\n\nAyrıca hipotenüse ait yükseklik için:\n\n$$h^2 = p \\cdot q$$\n\n# Pisagor Teoremi\n\nDik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir:\n\n$$a^2 + b^2 = c^2$$\n\n*İspat:* Öklid teoreminden veya benzer üçgenlerden elde edilebilir.",
     "ornekler": [
      {
       "soru": "$ABC$ üçgeninde $DE \\parallel BC$, $|AD| = 4$, $|DB| = 6$, $|AE| = 6$ ise $|EC|$ kaçtır?",
       "cozum": "Tales: $\\dfrac{|AD|}{|DB|} = \\dfrac{|AE|}{|EC|} \\Rightarrow \\dfrac46 = \\dfrac{6}{|EC|} \\Rightarrow |EC| = 9$."
      },
      {
       "soru": "Dik üçgende hipotenüse ait yükseklik, hipotenüsü 4 cm ve 9 cm'lik parçalara ayırıyor. Yüksekliği ve dik kenarları bulunuz.",
       "cozum": "Öklid: $h^2 = p \\cdot q = 4 \\cdot 9 = 36 \\Rightarrow h = 6$. Hipotenüs $c = 13$: $a^2 = 4 \\cdot 13 = 52 \\Rightarrow a = 2\\sqrt{13}$; $b^2 = 9 \\cdot 13 = 117 \\Rightarrow b = 3\\sqrt{13}$. Kontrol (Pisagor): $52 + 117 = 169 = 13^2$ ✓."
      }
     ],
     "ozet": [
      "Tales: $BC \\parallel DE \\Rightarrow \\dfrac{|AD|}{|DB|} = \\dfrac{|AE|}{|EC|}$",
      "Öklid: $a^2 = p \\cdot c$, $\\;b^2 = q \\cdot c$, $\\;h^2 = p \\cdot q$",
      "Pisagor: $a^2 + b^2 = c^2$"
     ]
    }
   },
   {
    "id": "k5",
    "code": "MAT.9.4.5",
    "title": {
     "tr": "Eşlik ve benzerlikle ilgili çıkarım ve teoremleri içeren problemleri çözebilme",
     "en": "Solving problems involving inferences and theorems on congruence and similarity"
    },
    "content": {
     "anlatim": "# Problem Çözme Adımları\n\n1. Şekli incele, bilinen açı ve kenarları işaretle.\n2. Eşlik veya benzerlik koşulunu belirle (AA, KAK, KKK vb.).\n3. Orantı yaz veya eş kenar/açıları eşitle.\n4. Tales, Öklid veya Pisagor'u uygula.\n5. Sonucu kontrol et.\n\n# Sık Karşılaşılan Problem Türleri\n\n| Durum | Kullanılacak araç |\n|---|---|\n| Üçgende kenara paralel doğru | **Tales**: $\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC}$ |\n| Dik üçgende hipotenüse yükseklik | **Öklid**: $h^2 = p \\cdot q$, $a^2 = p \\cdot c$ |\n| Dik üçgende bilinmeyen kenar | **Pisagor**: $a^2 + b^2 = c^2$ |\n| Gölge, ağaç, bina yüksekliği | Güneş ışınları paralel → **AA benzerliği** |\n| Ortak açılı iki üçgen | **AA** ile benzerlik, sonra orantı |\n\n**Sık kullanılan Pisagor üçlüleri:** (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) ve katları (6, 8, 10)…\n\n> ⚠ Orantı yazarken **karşılıklı** kenarları eşleştir: eşit açıların karşısındaki kenarlar karşılıklıdır.",
     "ornekler": [
      {
       "soru": "Boyu 1,6 m olan bir öğrencinin gölgesi 2 m, aynı anda bir ağacın gölgesi 15 m'dir. Ağacın boyu kaç metredir?",
       "cozum": "Güneş ışınları paralel → öğrenci–gölge ve ağaç–gölge üçgenleri **AA ile benzer**: $\\dfrac{1{,}6}{2} = \\dfrac{h}{15} \\Rightarrow h = 12$ m."
      },
      {
       "soru": "Bir merdiven duvara yaslanmıştır. Merdivenin boyu 5 m, alt ucunun duvara uzaklığı 3 m ise üst ucu yerden kaç m yüksektedir?",
       "cozum": "Duvar, yer ve merdiven dik üçgen oluşturur: $3^2 + h^2 = 5^2 \\Rightarrow h^2 = 16 \\Rightarrow h = 4$ m (3-4-5 üçlüsü)."
      }
     ],
     "ozet": [
      "Önce koşulu belirle (AA, KAK, KKK), sonra orantı kur.",
      "Dik üçgen varsa Pisagor ve Öklid'i, paralel doğru varsa Tales'i düşün.",
      "Pisagor üçlüleri: (3, 4, 5), (5, 12, 13), (8, 15, 17) ve katları; gölge problemlerinde AA benzerliği."
     ]
    }
   }
  ]
 },
 {
  "id": "t5",
  "name": {
   "tr": "5. Tema: Algoritma ve Bilişim",
   "en": "Theme 5: Algorithms and Informatics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.5.1",
    "title": {
     "tr": "Algoritma temelli yaklaşımlarla problem çözebilme",
     "en": "Solving problems with algorithm-based approaches"
    },
    "content": {
     "anlatim": "# Algoritma Nedir?\n\nBir problemi çözmek veya belirli bir amaca ulaşmak için izlenen **sonlu, sıralı ve açık** adımlar dizisidir.\n\n# Algoritma Gösterim Biçimleri\n\n- **Sözde kod (pseudocode):** Programlama diline yakın, doğal dilde yazılmış adımlar.\n- **Akış şeması:** Şekillerle (oval, dikdörtgen, elmas, ok) görsel gösterim.\n- **Çizge:** Düğüm ve kenarlarla ilişki gösterimi.\n\n# Akış Şeması Sembolleri\n\n| Sembol | Anlamı |\n|---|---|\n| Oval | Başla / Bitir |\n| Dikdörtgen | İşlem |\n| Paralelkenar | Girdi / Çıktı |\n| Elmas (baklava) | Karar (evet/hayır) |\n| Ok | Akış yönü |\n\n# Algoritmada Temel Yapılar\n\n- **Sıralı yapı:** Adımlar yazıldığı sırayla bir kez çalışır.\n- **Karar (seçim) yapısı:** “Eğer … ise … değilse …” — koşula göre farklı yol izlenir.\n- **Döngü (tekrar) yapısı:** Bir koşul sağlandığı sürece adımlar tekrarlanır.\n\n**Örnek – 1'den $n$'ye kadar sayıların toplamı:**\n1. Başla. $n$'yi oku. $T \\leftarrow 0$, $i \\leftarrow 1$.\n2. $i \\le n$ olduğu sürece: $T \\leftarrow T + i$, $i \\leftarrow i + 1$.\n3. $T$'yi yaz. Bitir.\n\n> İyi bir algoritma **sonlu** olmalı (sonsuz döngüye girmemeli), her adımı **açık** olmalı ve aynı girdiye her zaman **aynı çıktıyı** vermelidir.",
     "ornekler": [
      {
       "soru": "İki sayının en büyüğünü bulan algoritmayı yazınız.",
       "cozum": "1. Başla\n2. $a$ ve $b$ sayılarını oku\n3. Eğer $a > b$ ise $a$'yı yaz, değilse $b$'yi yaz\n4. Bitir"
      },
      {
       "soru": "Girilen bir tam sayının tek mi çift mi olduğunu bulan algoritmayı yazınız.",
       "cozum": "1. Başla. 2. $n$'yi oku. 3. $n$'nin 2'ye bölümünden kalanı $k$ olarak hesapla. 4. Eğer $k = 0$ ise “çift”, değilse “tek” yaz. 5. Bitir. Karar yapısı akış şemasında **elmas** ile gösterilir."
      }
     ],
     "ozet": [
      "Algoritma: sonlu, sıralı ve açık adımlar dizisi.",
      "Akış şemasında oval başla/bitir, dikdörtgen işlem, paralelkenar girdi/çıktı, elmas karar.",
      "Temel yapılar: sıralı, karar (eğer–değilse), döngü (koşul sağlandıkça tekrar)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.5.2",
    "title": {
     "tr": "Algoritmik yapılar içerisindeki mantık bağlaçları ve niceleyicileri çözümleyebilme",
     "en": "Analysing logical connectives and quantifiers within algorithmic structures"
    },
    "content": {
     "anlatim": "# Mantık Bağlaçları\n\n- $\\land$ **(VE / AND):** Her iki önerme de doğruysa doğru\n- $\\lor$ **(VEYA / OR):** En az biri doğruysa doğru\n- $\\neg$ **(DEĞİL / NOT):** Önermenin tersi\n- $\\Rightarrow$ **(İSE / IMPLIES):** $p \\Rightarrow q$ : $p$ doğru iken $q$ yanlışsa yanlış, diğer durumlarda doğru\n- $\\Leftrightarrow$ **(ANCAK VE ANCAK / IFF):** Her iki önerme aynı doğruluk değerine sahipse doğru\n\n# Doğruluk Tablosu Örneği ($p \\land q$)\n\n| $p$ | $q$ | $p \\land q$ |\n|---|---|---|\n| D | D | D |\n| D | Y | Y |\n| Y | D | Y |\n| Y | Y | Y |\n\n# Niceleyiciler\n\n- $\\forall$ **(Evrensel niceleyici – HER):** \"Her $x$ için $P(x)$ doğrudur\"\n- $\\exists$ **(Varoluşsal niceleyici – BAZI / VARDIR):** \"En az bir $x$ vardır ki $P(x)$ doğrudur\"",
     "ornekler": [
      {
       "soru": "$\\forall x \\in \\mathbb{R},\\ x^2 \\geq 0$ önermesini okuyup anlamını açıklayınız.",
       "cozum": "Her gerçek sayının karesi sıfırdan büyüktür veya sıfıra eşittir. Önerme doğrudur."
      },
      {
       "soru": "$\\exists x \\in \\mathbb{R},\\ x^2 = 2$ önermesini okuyup anlamını açıklayınız.",
       "cozum": "Karesi 2 olan bir gerçek sayı vardır. Önerme doğrudur: $x = \\sqrt{2}$."
      }
     ],
     "ozet": [
      "$p \\land q$ yalnızca ikisi de doğruysa doğru; $p \\lor q$ en az biri doğruysa doğru.",
      "$p \\Rightarrow q$ yalnızca $p$ doğru, $q$ yanlışken yanlıştır.",
      "$\\forall$: her; $\\exists$: en az bir tane vardır."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.9.5.3",
    "title": {
     "tr": "Mantık bağlaçları ve niceleyicilerin algoritmalarda kullanımına yönelik deneyimi farklı matematiksel görevlere yansıtabilme",
     "en": "Transferring experience with logical connectives and quantifiers in algorithms to other mathematical tasks"
    },
    "content": {
     "anlatim": "Algoritmalarda **karar yapıları** (if-else) mantık bağlaçlarıyla, **döngüler** ise niceleyicilerle ilişkilendirilebilir. Örneğin \"tüm elemanlar için kontrol et\" $\\forall$ ile, \"en az bir eleman bul\" $\\exists$ ile ifade edilir.\n\nŞifreleme algoritmalarında da mantıksal işlemler (XOR vb.) kullanılır. Öğrenciler, algoritmik düşünmeyi matematiksel ispat ve problem çözmeye aktarabilir.\n\n# Niceleyicilerin Değillenmesi\n\nBir algoritmanın “her eleman için kontrol” adımı başarısızsa, bunun anlamı “**en az bir eleman koşulu sağlamıyor**” demektir:\n\n$$\\neg(\\forall x,\\ P(x)) \\equiv \\exists x,\\ \\neg P(x) \\qquad \\neg(\\exists x,\\ P(x)) \\equiv \\forall x,\\ \\neg P(x)$$\n\n| Görev | Algoritmadaki karşılığı |\n|---|---|\n| “Listedeki **tüm** sayılar pozitif mi?” | Döngü; negatif bir sayı **bulununca dur** ve “hayır” yaz ($\\forall$'ın değili $\\exists$) |\n| “Listede **en az bir** çift sayı var mı?” | Döngü; ilk çift sayıda **dur** ve “evet” yaz |\n| Şifre: “en az 8 karakter **ve** en az bir rakam” | Koşul: $(\\text{uzunluk} \\ge 8) \\land (\\exists\\ \\text{rakam})$ |\n\n- **De Morgan kuralları:** $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$ ve $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$. Bir koşulun “değilse” kolunu yazarken kullanılır.",
     "ornekler": [
      {
       "soru": "“Sınıftaki **her** öğrenci sınavdan geçti.” önermesinin değilini yazınız.",
       "cozum": "$\\neg(\\forall x,\\ P(x)) \\equiv \\exists x,\\ \\neg P(x)$: “Sınıfta sınavdan **geçemeyen en az bir** öğrenci vardır.” (“Hiçbir öğrenci geçemedi” yanlış bir değillemedir.)"
      },
      {
       "soru": "Bir uygulama şifreyi “en az 8 karakterli **ve** en az bir rakam içeren” koşuluyla kabul ediyor. Şifrenin reddedilmesi için hangi durum yeterlidir?",
       "cozum": "De Morgan: $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$. Şifre **8 karakterden kısaysa veya hiç rakam içermiyorsa** reddedilir; iki koşuldan birinin bozulması yeterlidir."
      }
     ],
     "ozet": [
      "Karar yapıları (if-else) ↔ mantık bağlaçları; döngüler ↔ niceleyiciler.",
      "“Hepsi için kontrol et” → $\\forall$, “en az bir tane bul” → $\\exists$",
      "$\\neg(\\forall x,\\ P(x)) \\equiv \\exists x,\\ \\neg P(x)$; De Morgan: $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$."
     ]
    }
   }
  ]
 },
 {
  "id": "t6",
  "name": {
   "tr": "6. Tema: İstatistiksel Araştırma Süreci",
   "en": "Theme 6: The Statistical Investigation Process"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.6.1",
    "title": {
     "tr": "Tek nicel değişkenli veri dağılımları ile çalışabilme ve tek nicel değişken içeren veriye dayalı karar verebilme",
     "en": "Working with single quantitative variable distributions and making data-based decisions"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **Evren (popülasyon):** İncelenen tüm birimlerin oluşturduğu küme.\n- **Örneklem:** Evrenden seçilen alt küme.\n- **Nicel veri:** Sayısal ölçülebilen veri (boy, ağırlık, not vb.).\n- **Değişebilirlik:** Verilerin yayılımı / değişkenliği.\n\n# Merkezî Eğilim Ölçüleri\n\n- **Aritmetik ortalama:** Tüm verilerin toplamı / veri sayısı\n- **Medyan:** Sıralı verinin ortasındaki değer\n- **Mod:** En sık tekrar eden değer\n\n# Yayılım Ölçüleri\n\n- **Açıklık (range):** En büyük − en küçük\n- **Çeyrekler açıklığı (IQR):** $Q_3 - Q_1$\n- **Standart sapma:** Verilerin ortalamadan sapmalarının karekök ortalaması\n\n# Görselleştirme\n\n- **Histogram:** Sınıf aralıklarına göre frekans çubukları\n- **Kutu grafiği (box-plot):** Min, $Q_1$, medyan, $Q_3$, max değerlerini gösterir. Aykırı değerleri ortaya çıkarır.\n\n# Karar Verme\n\nVeri dağılımına bakarak (simetrik, çarpık, çok tepeli vb.) ortalama mı medyan mı kullanılacağına, yayılımın fazla olup olmadığına karar verilir.",
     "ornekler": [
      {
       "soru": "5 öğrencinin notları: 60, 70, 70, 80, 95. Ortalama, medyan, mod ve açıklığı bulunuz.",
       "cozum": "Ortalama $= \\dfrac{60 + 70 + 70 + 80 + 95}{5} = \\dfrac{375}{5} = 75$. Medyan (ortadaki) $= 70$. Mod $= 70$. Açıklık $= 95 - 60 = 35$."
      },
      {
       "soru": "2, 4, 4, 4, 6 verilerinin standart sapmasını hesaplayınız (örneklem standart sapması).",
       "cozum": "Ortalama $\\bar{x} = 20/5 = 4$. Sapmaların kareleri: $4, 0, 0, 0, 4$ → toplam $8$. $s = \\sqrt{\\dfrac{8}{5 - 1}} = \\sqrt{2} \\approx 1{,}41$. Değerler ortalamaya yakın olduğundan yayılım küçüktür."
      }
     ],
     "ozet": [
      "Ortalama = toplam / veri sayısı; medyan = sıralı verinin ortası; mod = en sık değer",
      "Açıklık = en büyük − en küçük; çeyrekler açıklığı = $Q_3 - Q_1$",
      "Kutu grafiği: min, $Q_1$, medyan, $Q_3$, max; aykırı değerleri gösterir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.6.2",
    "title": {
     "tr": "Başkaları tarafından oluşturulan tek nicel değişkenli veri dağılımlarına dayalı istatistiksel sonuç veya yorumları tartışabilme",
     "en": "Discussing statistical conclusions based on single-variable data distributions made by others"
    },
    "content": {
     "anlatim": "Başkalarının hazırladığı grafik, tablo veya özet istatistikleri incelerken şu sorular sorulur:\n\n- Örneklem büyüklüğü yeterli mi?\n- Örneklem rastgele ve temsil edici mi?\n- Grafik yanıltıcı mı? (eksen kesme, ölçek vb.)\n- Aykırı değerler var mı ve nasıl ele alınmış?\n- Sonuçlar genellenebilir mi?\n- Alternatif yorumlar mümkün mü?\n\n# Yanıltıcı Grafikler ve Hatalı Sonuçlar\n\n- **Kesilmiş eksen:** Dikey eksen 0'dan değil 90'dan başlatılırsa 92 ile 96 arasındaki küçük fark çok büyük görünür.\n- **Seçilmiş örneklem:** Yalnızca bir okulun 30 öğrencisiyle yapılan ankete bakıp “Türkiye'deki gençler…” diye genelleme yapılamaz.\n- **Aykırı değer etkisi:** Bir sınıfın not ortalaması bir iki çok yüksek ya da düşük notla değişebilir; böyle durumlarda **medyan** daha iyi bir özettir.\n- **Korelasyon ≠ neden:** Dondurma satışı ile boğulma vakaları birlikte artar; ikisinin ortak nedeni **sıcak havadır**.\n\n> Bir istatistiksel iddiayı değerlendirirken sor: **Kim**, **kaç kişiyle**, **nasıl** ölçtü? Veri ve grafik bu sonucu gerçekten destekliyor mu?",
     "ornekler": [
      {
       "soru": "Bir reklamda “Kullanıcılarımızın %90'ı memnun!” yazıyor ve küçük harflerle “20 kişiyle yapılan ankete göre” notu var. Bu sonuca nasıl yaklaşmalısınız?",
       "cozum": "**Örneklem çok küçüktür** (20 kişi) ve kimlerin seçildiği belli değildir; şirket kendi memnun müşterilerini seçmiş olabilir. Sonuç **genellenemez**; daha büyük ve rastgele bir örneklem gerekir."
      },
      {
       "soru": "İki öğrencinin deneme netleri: Ali 30, 31, 29, 30, 30; Ece 20, 40, 25, 35, 30. Ortalamaları eşittir (30). Kimin performansı daha istikrarlıdır?",
       "cozum": "**Ali'nin.** Açıklıklar: Ali $31 - 29 = 2$, Ece $40 - 20 = 20$. Ortalamalar aynı olsa da Ece'nin verileri çok **dağınıktır**; yalnızca ortalamaya bakarak karar vermek eksik olur."
      }
     ],
     "ozet": [
      "Örneklem yeterli ve temsil edici mi? Grafik ekseni kesilmiş ya da ölçeği yanıltıcı mı?",
      "Aykırı değerler ve alternatif yorumlar sorgulanmalı.",
      "Kesilmiş eksen ve küçük örneklem yanıltır; ilişki (korelasyon) neden–sonuç anlamına gelmez."
     ]
    }
   }
  ]
 },
 {
  "id": "t7",
  "name": {
   "tr": "7. Tema: Veriden Olasılığa",
   "en": "Theme 7: From Data to Probability"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.7.1",
    "title": {
     "tr": "Olayların olasılığını gözleme dayalı tahmin edebilme",
     "en": "Estimating the probability of events based on observation"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **Deney:** Sonucu tesadüfe bağlı gözlem veya işlem\n- **Çıktı (outcome):** Deneyin mümkün sonuçlarından her biri\n- **Örnek uzay ($S$):** Tüm mümkün çıktıların kümesi\n- **Olay ($A$):** Örnek uzayın bir alt kümesi\n\n# Deneysel (Gözlemsel) Olasılık\n\n$$P(A) \\approx \\frac{A \\text{ olayının gerçekleşme sayısı}}{\\text{Toplam deneme sayısı}}$$\n\nDeneme sayısı arttıkça deneysel olasılık, teorik olasılığa yaklaşır (**Büyük Sayılar Yasası**).\n\n# Deney Sayısı Neden Önemli?\n\n| Atış sayısı | Yazı sayısı | Deneysel olasılık |\n|---|---|---|\n| 10 | 7 | 0,70 |\n| 100 | 56 | 0,56 |\n| 1000 | 509 | 0,509 |\n\nDeneme sayısı arttıkça deneysel olasılık **0,5'e** (teorik değere) yaklaşır. Az sayıda denemeyle yapılan tahmin yanıltıcı olabilir.\n- **Simülasyon:** Zar, para ya da bilgisayarın rastgele sayı üreticisiyle bir olay çok kez yapay olarak tekrarlanır ve deneysel olasılık bulunur.\n- Teorik olasılığı hesaplanamayan olaylarda (yarın yağmur yağması, raptiyenin sivri ucu yukarı düşmesi) **gözleme dayalı** tahmin kullanılır.",
     "ornekler": [
      {
       "soru": "Bir madeni para 100 kez atıldığında 56 yazı geldi. Yazı gelme olasılığını deneysel olarak tahmin ediniz.",
       "cozum": "$P(\\text{Yazı}) \\approx \\dfrac{56}{100} = 0{,}56$"
      },
      {
       "soru": "Bir raptiye 200 kez atılıyor ve 130 kez “sivri ucu yukarı” düşüyor. Raptiyenin sivri ucu yukarı düşme olasılığını tahmin ediniz. Bu olasılık teorik olarak hesaplanabilir mi?",
       "cozum": "$P \\approx \\dfrac{130}{200} = 0{,}65$. Raptiyenin iki yüzü **eş olasılıklı değildir** (şekli simetrik değil), bu yüzden teorik olasılık hesaplanamaz; ancak **gözleme dayalı** tahmin yapılır."
      }
     ],
     "ozet": [
      "Deneysel olasılık = gerçekleşme sayısı / toplam deneme sayısı",
      "Deneme sayısı arttıkça deneysel olasılık teorik olasılığa yaklaşır (Büyük Sayılar Yasası).",
      "Simülasyon ve gözlem: teorik olasılığı bilinmeyen olaylarda deneysel olasılık kullanılır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.7.2",
    "title": {
     "tr": "Olayların olasılığına ilişkin tümevarımsal akıl yürütebilme",
     "en": "Inductive reasoning about the probability of events"
    },
    "content": {
     "anlatim": "# Teorik Olasılık\n\n$$P(A) = \\frac{A \\text{ olayının elverişli çıktı sayısı}}{\\text{Örnek uzayın eleman sayısı}} = \\frac{n(A)}{n(S)}$$\n\n$$0 \\leq P(A) \\leq 1, \\qquad P(S) = 1, \\qquad P(\\emptyset) = 0$$\n\n# Olay Türleri\n\n- **Ayrık olaylar:** Ortak çıktısı olmayan olaylar ($A \\cap B = \\emptyset$)\n- **Ayrık olmayan olaylar:** Ortak çıktısı olan olaylar\n\n# Temel Olasılık Kuralları\n\n- $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$\n- $A$ ve $B$ ayrık ise: $P(A \\cup B) = P(A) + P(B)$\n- $P(A') = 1 - P(A)$ (tümleyen)\n- $P(A \\cap B) = P(A) \\cdot P(B)$ (bağımsız olaylar için)\n\n# Örnek Uzayı Listeleme (İki Olaylı Deneyler)\n\nİki zar atılınca örnek uzay $6 \\cdot 6 = 36$ elemanlıdır. Tablo ile listelemek kolaydır:\n\n| + | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| **1** | 2 | 3 | 4 | 5 | 6 | 7 |\n| **2** | 3 | 4 | 5 | 6 | 7 | 8 |\n| **3** | 4 | 5 | 6 | 7 | 8 | 9 |\n| **4** | 5 | 6 | 7 | 8 | 9 | 10 |\n| **5** | 6 | 7 | 8 | 9 | 10 | 11 |\n| **6** | 7 | 8 | 9 | 10 | 11 | 12 |\n\n- Toplamın 7 olması **6** çıktıda görülür → $P = \\dfrac{6}{36} = \\dfrac16$ (en olası toplam).\n- **Ağaç şeması:** Bir parayı iki kez atınca YY, YT, TY, TT → 4 çıktı.\n- Tümevarımsal akıl yürütme: Birkaç örnekten “$n$ para atılınca örnek uzay $2^n$ elemanlıdır” genellemesine ulaşılır.",
     "ornekler": [
      {
       "soru": "Bir zar atıldığında tek sayı gelme olasılığı kaçtır?",
       "cozum": "$S = \\{1, 2, 3, 4, 5, 6\\}$, $A = \\{1, 3, 5\\}$, $P(A) = \\dfrac{3}{6} = \\dfrac{1}{2}$"
      },
      {
       "soru": "İki zar birlikte atılıyor. Üst yüzlerdeki sayıların toplamının 10 olma olasılığı kaçtır?",
       "cozum": "Toplamı 10 olan çıktılar: (4, 6), (5, 5), (6, 4) → 3 tane. $n(S) = 36$. $P = \\dfrac{3}{36} = \\dfrac{1}{12}$."
      }
     ],
     "ozet": [
      "$P(A) = \\dfrac{n(A)}{n(S)}$ ve $0 \\leq P(A) \\leq 1$",
      "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$",
      "$P(A') = 1 - P(A)$; bağımsız olaylarda $P(A \\cap B) = P(A) \\cdot P(B)$"
     ]
    }
   }
  ]
 },
 {
  "id": "t8",
  "name": {
   "tr": "8. Tema (Ek): TYT Temel Kavramlar, Kümeler ve Problemler",
   "en": "Theme 8 (Extra): Core Concepts, Sets and Word Problems"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.9.E1",
    "title": {
     "tr": "Kümeler: gösterim, alt küme ve işlemler",
     "en": "Sets: notation, subsets and operations"
    },
    "content": {
     "anlatim": "# Küme Kavramı\n\nİyi tanımlanmış nesneler topluluğuna **küme**, her bir nesneye **eleman** denir. Gösterimler: liste ($A = \\{1, 2, 3\\}$), ortak özellik ($A = \\{x \\mid x < 4,\\ x \\in \\mathbb{Z}^+\\}$) ve **Venn şeması**. Eleman sayısı $s(A)$ ile gösterilir; boş küme $\\emptyset$.\n\n# Alt Küme\n\n$A$'nın her elemanı $B$'de de varsa $A \\subseteq B$.\n- $n$ elemanlı bir kümenin alt küme sayısı $2^n$, **öz alt küme** sayısı $2^n - 1$'dir.\n- $r$ elemanlı alt küme sayısı $\\binom{n}{r}$'dir.\n\n# İşlemler\n\n| İşlem | Gösterim | Anlamı |\n|---|---|---|\n| Birleşim | $A \\cup B$ | En az birinde olanlar |\n| Kesişim | $A \\cap B$ | Her ikisinde olanlar |\n| Fark | $A \\setminus B$ | $A$'da olup $B$'de olmayanlar |\n| Tümleyen | $A'$ | Evrensel kümede olup $A$'da olmayanlar |\n$$s(A \\cup B) = s(A) + s(B) - s(A \\cap B)$$\nÜç küme için: $s(A\\cup B\\cup C) = s(A)+s(B)+s(C) - s(A\\cap B) - s(A\\cap C) - s(B\\cap C) + s(A\\cap B\\cap C)$.\n- **De Morgan:** $(A \\cup B)' = A' \\cap B'$, $(A \\cap B)' = A' \\cup B'$.",
     "ornekler": [
      {
       "soru": "Bir sınıfta 18 kişi basketbol, 12 kişi voleybol oynuyor; 5 kişi ikisini de oynuyor. En az bir oyunu oynayan kaç kişi vardır?",
       "cozum": "$s(B \\cup V) = 18 + 12 - 5 = $ **25**."
      },
      {
       "soru": "5 elemanlı bir kümenin kaç alt kümesi ve kaç öz alt kümesi vardır? 2 elemanlı alt kümesi kaç tanedir?",
       "cozum": "Alt küme $2^5 = 32$, öz alt küme $31$, 2 elemanlı alt küme $\\binom52 = 10$."
      }
     ],
     "ozet": [
      "$n$ elemanlı kümenin $2^n$ alt kümesi vardır.",
      "$s(A\\cup B) = s(A) + s(B) - s(A\\cap B)$.",
      "De Morgan: $(A\\cup B)' = A'\\cap B'$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.9.E2",
    "title": {
     "tr": "Basamak analizi, rasyonel ve ondalık sayılar",
     "en": "Place value, rational and decimal numbers"
    },
    "content": {
     "anlatim": "# Basamak Analizi\n\nİki basamaklı $\\overline{ab} = 10a + b$, üç basamaklı $\\overline{abc} = 100a + 10b + c$. ($a \\neq 0$)\n- $\\overline{ab} + \\overline{ba} = 11(a + b)$, $\\overline{ab} - \\overline{ba} = 9(a - b)$.\n- Rakamları farklı en büyük üç basamaklı sayı 987, en küçüğü 102'dir.\n\n# Rasyonel Sayılar\n\n$\\dfrac{a}{b}$ ($b \\neq 0$) biçiminde yazılabilen sayılardır.\n- Toplama/çıkarmada paydalar eşitlenir; çarpmada paylar ve paydalar çarpılır; bölmede ikinci kesir ters çevrilip çarpılır.\n- Sıralama: paydalar eşitse payı büyük olan büyüktür; paylar eşitse paydası küçük olan büyüktür.\n\n# Ondalık Sayılar ve Devirli Sayılar\n\n- $0{,}25 = \\dfrac{25}{100} = \\dfrac14$.\n- **Devirli sayı:** $0{,}\\overline{3} = \\dfrac{3}{9} = \\dfrac13$. Genel kural: $\\dfrac{\\text{sayının tamamı} - \\text{devretmeyen kısım}}{\\text{devreden basamak kadar 9, devretmeyen kadar 0}}$. Örneğin $1{,}2\\overline{3} = \\dfrac{123 - 12}{90} = \\dfrac{111}{90}$.",
     "ornekler": [
      {
       "soru": "İki basamaklı $\\overline{ab}$ sayısı ile rakamlarının yer değiştirmesiyle oluşan sayının toplamı 121'dir. $a + b$ kaçtır?",
       "cozum": "$11(a + b) = 121$ → $a + b = $ **11**."
      },
      {
       "soru": "$0{,}1\\overline{6}$ sayısını kesir olarak yazınız.",
       "cozum": "$\\dfrac{16 - 1}{90} = \\dfrac{15}{90} = $ **$\\dfrac16$**."
      }
     ],
     "ozet": [
      "$\\overline{abc} = 100a + 10b + c$.",
      "$\\overline{ab}+\\overline{ba} = 11(a+b)$, $\\overline{ab}-\\overline{ba} = 9(a-b)$.",
      "Devirli sayı: (tamamı − devretmeyen) / (9'lar ve 0'lar)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.9.E3",
    "title": {
     "tr": "Oran–orantı, yüzde, kâr–zarar ve faiz",
     "en": "Ratio and proportion, percentages, profit–loss and interest"
    },
    "content": {
     "anlatim": "# Oran ve Orantı\n\n- **Doğru orantı:** Biri artarken diğeri aynı oranda artar: $\\dfrac{x}{y} = k$.\n- **Ters orantı:** Biri artarken diğeri aynı oranda azalır: $x\\cdot y = k$.\n- $\\dfrac ab = \\dfrac cd$ ise $a\\cdot d = b\\cdot c$ (içler–dışlar çarpımı).\n- $a : b : c = 2 : 3 : 5$ ise $a = 2k$, $b = 3k$, $c = 5k$ yazılır.\n\n# Yüzde\n\n$x$'in %$p$'si $= x\\cdot\\dfrac{p}{100}$.\n- %20 artış: $\\times 1{,}2$; %20 indirim: $\\times 0{,}8$.\n- **Art arda değişimler çarpılır:** %20 artış sonra %20 indirim → $1{,}2 \\times 0{,}8 = 0{,}96$ → **%4 kayıp** (yüzdeler toplanmaz!).\n\n# Kâr–Zarar\n\nKâr ve zarar **maliyet (alış fiyatı)** üzerinden hesaplanır:\n$$\\text{Satış} = \\text{Maliyet}\\cdot\\left(1 + \\frac{\\text{kâr \\%}}{100}\\right)$$\n\n# Faiz\n\n- **Basit faiz:** $F = A\\cdot\\dfrac{n}{100}\\cdot t$ ($A$ ana para, $n$ yıllık faiz oranı, $t$ yıl).\n- **Bileşik faiz:** $A_t = A\\left(1 + \\dfrac{n}{100}\\right)^t$ — her dönem faiz ana paraya eklenir.",
     "ornekler": [
      {
       "soru": "Bir ürünün fiyatı önce %25 artırılıyor, sonra %20 indiriliyor. Son fiyat ilk fiyata göre nasıl değişmiştir?",
       "cozum": "$1{,}25 \\times 0{,}80 = 1{,}00$ → fiyat **değişmemiştir**."
      },
      {
       "soru": "Maliyeti 400 TL olan ürün %35 kârla satılıyor. Satış fiyatı nedir?",
       "cozum": "$400 \\times 1{,}35 = $ **540 TL**."
      }
     ],
     "ozet": [
      "Doğru orantıda bölüm, ters orantıda çarpım sabittir.",
      "Art arda yüzde değişimler çarpılır, toplanmaz.",
      "Kâr–zarar maliyet üzerinden hesaplanır.",
      "Bileşik faiz: $A(1 + n/100)^t$."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.9.E4",
    "title": {
     "tr": "Sayı, kesir ve yaş problemleri",
     "en": "Number, fraction and age problems"
    },
    "content": {
     "anlatim": "# Problem Çözme Adımları\n\n1. Bilinmeyeni belirle ve bir harfle göster ($x$).\n2. Verilenleri denkleme dönüştür.\n3. Denklemi çöz, sonucu soruda istenen biçimde yaz ve **kontrol et**.\n\n# Sayı Problemleri\n\n- Ardışık tam sayılar: $x, x+1, x+2$; ardışık çift/tek sayılar: $x, x+2, x+4$.\n- \"Bir sayının 3 katının 5 fazlası\" → $3x + 5$; \"5 fazlasının 3 katı\" → $3(x + 5)$. Sıraya dikkat!\n\n# Kesir Problemleri\n\n\"Paranın $\\frac13$'ünü, sonra **kalanın** $\\frac14$'ünü harcadı\" → kalanlar üzerinden çarp: harcamadan sonra kalan $= x\\cdot\\frac23\\cdot\\frac34 = \\frac x2$. Toplam yerine çoğu zaman **paydaların EKOK'u** kadar başlangıç değeri seçmek işi kolaylaştırır.\n\n# Yaş Problemleri\n\n- Kişiler arasındaki **yaş farkı hiç değişmez**.\n- $t$ yıl sonra her kişinin yaşı $t$ artar; $n$ kişinin yaşları toplamı $n\\cdot t$ artar.\n- \"Ben senin yaşındayken…\" tipi sorularda yaş farkını kullan.",
     "ornekler": [
      {
       "soru": "Ardışık üç çift sayının toplamı 78'dir. En büyüğü kaçtır?",
       "cozum": "$x + (x+2) + (x+4) = 78$ → $3x = 72$, $x = 24$ → en büyük **28**."
      },
      {
       "soru": "Annenin yaşı kızının yaşının 3 katıdır. 12 yıl sonra annenin yaşı kızının yaşının 2 katı olacaktır. Kızın bugünkü yaşı kaçtır?",
       "cozum": "Kız $x$, anne $3x$. $3x + 12 = 2(x + 12)$ → $x = $ **12**."
      }
     ],
     "ozet": [
      "Ardışık çift/tek sayılar $x, x+2, x+4$.",
      "\"Kalanın\" kesri ardışık çarpılarak hesaplanır.",
      "Yaş farkı değişmez; $t$ yıl sonra toplam yaş $n\\cdot t$ artar."
     ]
    }
   },
   {
    "id": "k5",
    "code": "MAT.9.E5",
    "title": {
     "tr": "İşçi–havuz, hareket ve karışım problemleri",
     "en": "Work, motion and mixture problems"
    },
    "content": {
     "anlatim": "# İşçi ve Havuz Problemleri\n\nBir işi tek başına $a$ saatte bitiren kişi 1 saatte işin $\\frac1a$'sını yapar.\n$$\\frac1a + \\frac1b = \\frac1t \\quad (t: \\text{birlikte bitirme süresi})$$\n- Havuzu dolduran musluk (+), boşaltan musluk (−) yazılır.\n\n# Hareket Problemleri\n\n$$\\text{Yol} = \\text{Hız} \\times \\text{Zaman}$$\n- **Zıt yönde (karşılaşma):** $t = \\dfrac{x}{V_1 + V_2}$\n- **Aynı yönde (yetişme):** $t = \\dfrac{x}{V_1 - V_2}$ ($V_1 > V_2$)\n- **Ortalama hız** = toplam yol / toplam zaman (hızların ortalaması değildir!). Eşit yollar $V_1$ ve $V_2$ ile gidilirse ortalama hız $\\dfrac{2V_1V_2}{V_1 + V_2}$.\n- Akıntıda: akıntı yönünde $V + V_a$, akıntıya karşı $V - V_a$.\n\n# Karışım Problemleri\n\nÇözeltideki madde miktarı = toplam miktar × yüzde oranı.\n- Karıştırmada **saf madde miktarları toplanır**: $m_1\\cdot\\%p_1 + m_2\\cdot\\%p_2 = (m_1 + m_2)\\cdot\\%p$.\n- Su eklemek: madde miktarı aynı kalır, toplam artar. Su buharlaştırmak: toplam azalır, madde aynı kalır.",
     "ornekler": [
      {
       "soru": "Bir işi Ali 6 günde, Ayşe 3 günde bitiriyor. Birlikte kaç günde bitirirler?",
       "cozum": "$\\frac16 + \\frac13 = \\frac12$ → **2 gün**."
      },
      {
       "soru": "Bir araç A'dan B'ye 60 km/sa, dönüşte 40 km/sa hızla gidiyor. Ortalama hızı kaçtır?",
       "cozum": "$\\dfrac{2\\cdot60\\cdot40}{60 + 40} = $ **48 km/sa** (50 değil!)."
      },
      {
       "soru": "%20'lik 30 litre tuzlu suya kaç litre saf su eklenirse %12'lik olur?",
       "cozum": "Tuz $= 6$ L. $\\dfrac{6}{30 + x} = 0{,}12$ → $30 + x = 50$ → **20 litre**."
      }
     ],
     "ozet": [
      "Birlikte çalışma: $\\frac1a + \\frac1b = \\frac1t$.",
      "Karşılaşma $x/(V_1+V_2)$, yetişme $x/(V_1-V_2)$.",
      "Ortalama hız = toplam yol / toplam zaman.",
      "Karışımda saf madde miktarları toplanır; su eklemek maddeyi değiştirmez."
     ]
    }
   },
   {
    "id": "k6",
    "code": "MAT.9.E6",
    "title": {
     "tr": "Özdeşlikler ve çarpanlara ayırma",
     "en": "Identities and factorisation"
    },
    "content": {
     "anlatim": "# Temel Özdeşlikler\n\n$$(a+b)^2 = a^2 + 2ab + b^2, \\qquad (a-b)^2 = a^2 - 2ab + b^2$$\n$$a^2 - b^2 = (a-b)(a+b) \\quad \\text{(iki kare farkı)}$$\n$$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3, \\qquad a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$$\nFaydalı bağıntı: $a^2 + b^2 = (a+b)^2 - 2ab$.\n\n# Çarpanlara Ayırma Yöntemleri\n\n1. **Ortak çarpan parantezine alma:** $6x^2 + 9x = 3x(2x + 3)$\n2. **Gruplandırma:** $ax + ay + bx + by = (a+b)(x+y)$\n3. **Özdeşlikleri kullanma:** $x^2 - 49 = (x-7)(x+7)$, $x^2 + 6x + 9 = (x+3)^2$\n4. **$x^2 + bx + c$ üç terimlisi:** Çarpımı $c$, toplamı $b$ olan iki sayı bulunur: $x^2 - 5x + 6 = (x-2)(x-3)$\n5. **$ax^2 + bx + c$:** Çarpraz yöntemle: $2x^2 + 7x + 3 = (2x+1)(x+3)$\n\n# Rasyonel İfadelerin Sadeleştirilmesi\n\nPay ve payda çarpanlarına ayrılır, ortak çarpanlar sadeleştirilir (paydayı sıfır yapan değerler hariç):\n$$\\frac{x^2 - 9}{x^2 + 3x} = \\frac{(x-3)(x+3)}{x(x+3)} = \\frac{x-3}{x}$$",
     "ornekler": [
      {
       "soru": "$a + b = 7$ ve $ab = 10$ ise $a^2 + b^2$ kaçtır?",
       "cozum": "$a^2 + b^2 = (a+b)^2 - 2ab = 49 - 20 = $ **29**."
      },
      {
       "soru": "$x^2 - x - 12$ ifadesini çarpanlarına ayırınız.",
       "cozum": "Çarpımı $-12$, toplamı $-1$ olan sayılar $-4$ ve $3$ → **$(x-4)(x+3)$**."
      },
      {
       "soru": "$101^2 - 99^2$ işleminin sonucu kaçtır?",
       "cozum": "İki kare farkı: $(101-99)(101+99) = 2\\cdot200 = $ **400**."
      }
     ],
     "ozet": [
      "$(a\\pm b)^2 = a^2 \\pm 2ab + b^2$; $a^2 - b^2 = (a-b)(a+b)$.",
      "$x^2 + bx + c$: çarpımı $c$, toplamı $b$ olan sayılar.",
      "Sadeleştirmeden önce pay ve payda çarpanlarına ayrılır.",
      "$a^2 + b^2 = (a+b)^2 - 2ab$."
     ]
    }
   }
  ]
 }
];

/* KAMPUSAI ENRICHMENT 1.64 — generated by tools/apply-enrichment.mjs */
(function(){ const additions=[
  {
    "key": "9/matematik",
    "unit": "t2",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-001",
      "code": "EK.9.001",
      "title": {
        "tr": "Aralıkların kesişimini sayı doğrusuyla doğrulama",
        "en": "Verify interval intersections"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=343",
        "programmeEdition": "supplement-check-current-TYMM",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Aralıkların kesişimini sayı doğrusuyla doğrulama\n\nBir eşitsizlik sisteminde her koşul ayrı bir aralık verir. Ve sözcüğü kesişim, veya birleşim anlamına gelir. Açık uç eşitliği içermez. Kritik sayıları sırala ve her bölgeden bir deneme değeri seç. Sonucu başlangıçtaki bütün koşullara geri koy. Negatif sayıyla çarparken eşitsizlik yönünün değiştiğini unutma.\n\n### Kontrol ederek öğren\n\nx > −2 ve x ≤ 3 için çözüm?\n\n**Çözüm yolu:** (−2,3]. −2 ilk koşulu sağlamaz; 3 iki koşulu da sağlar.\n\n### Dikkat noktaları\n\n- Ve: kesişim.\n- Açık uç eşitliği içermez.\n- Sonucu bütün koşullarda dene.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=343)",
        "ornekler": [
          {
            "soru": "x > −2 ve x ≤ 3 için çözüm?",
            "cozum": "(−2,3]. −2 ilk koşulu sağlamaz; 3 iki koşulu da sağlar."
          }
        ],
        "ozet": [
          "Ve: kesişim.",
          "Açık uç eşitliği içermez.",
          "Sonucu bütün koşullarda dene."
        ]
      }
    }
  }
]; additions.forEach(({key,unit,unitName,lesson})=>{const units=App.data.content[key];let u=units.find(x=>x.id===unit);if(!u){u={id:unit,name:{tr:unitName,en:unitName},outcomes:[]};const at=units.findIndex(x=>/^u/.test(x.id)||(/^t/.test(x.id)&&Number(x.id.slice(1))>Number(unit.slice(1))));if(at<0)units.push(u);else units.splice(at,0,u);}u.outcomes.push(lesson);}); })();
