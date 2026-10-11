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
     "ornekler": [],
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
     "ornekler": [],
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
     "anlatim": "# Temel Mutlak Değer Fonksiyonu\n\n$$n(x) = |x| = \\begin{cases} x, & x \\geq 0 \\\\ -x, & x < 0 \\end{cases}$$\n\nGrafiği **V** şeklindedir. Tepe noktası $(0, 0)$'dır. Azalan ($x < 0$) ve artan ($x > 0$) parçalardan oluşur.\n\n# Genel Biçim\n\n$$m(x) = \\pm |ax \\pm b| \\pm c \\quad (a \\neq 0)$$\n\n# Nitel Özellikler\n\n- **Tepe (köşe) noktası:** $|ax + b| = 0 \\Rightarrow x = -\\dfrac{b}{a}$ noktasında\n- Minimum veya maksimum değeri $c$'ye göre belirlenir.\n- Parçalı doğrusal fonksiyondur (iki doğrusal parçadan oluşur).\n- $|ax + b|$ her zaman $\\geq 0$'dır.",
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
     "ornekler": [],
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
     "ornekler": [],
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
     "ornekler": [],
     "ozet": [
      "Yansıma, öteleme ve dönme **izometridir**: uzunluk, açı ve alan korunur; görüntü şekle eştir.",
      "Yansımada nokta ile görüntüsünü birleştiren doğru parçası yansıma doğrusuna diktir ve doğru onu ortalar.",
      "Ötelemede her nokta aynı vektör kadar kayar; dönmede merkeze uzaklık korunur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "",
    "title": {
     "tr": "İki üçgenin eş veya benzer olması için gerekli asgari koşullarla ilgili çıkarım yapabilme",
     "en": "Making inferences about the minimum conditions for two triangles to be congruent or similar"
    },
    "content": {
     "anlatim": "# Eşlik ($\\cong$)\n\nİki üçgenin karşılıklı kenarları ve açıları eşitse eştir.\n\n**Eşlik koşulları (yeterli):**\n\n- **KAK (Kenar-Açı-Kenar):** İki kenar ve aralarındaki açı eşit\n- **AKA (Açı-Kenar-Açı):** İki açı ve aralarındaki kenar eşit\n- **KKK (Kenar-Kenar-Kenar):** Üç kenar eşit\n- **KKA (Kenar-Kenar-Açı):** İki kenar ve büyük kenara karşı açı eşit (dikkatli kullanılmalı)\n\n# Benzerlik ($\\sim$)\n\nİki üçgenin karşılıklı açıları eşit ve kenarları orantılıysa benzerdir.\n\n**Benzerlik koşulları:**\n\n- **AA (Açı-Açı):** İki açı eşit → üçüncü de eşit → benzer\n- **KAK (Kenar-Açı-Kenar orantılı):** İki kenar orantılı ve aradaki açı eşit\n- **KKK (Kenar orantılı):** Üç kenar orantılı\n\n# Benzerlik Oranı\n\n$k$ = karşılıklı kenarların oranı.\n\n$$\\text{Çevre oranı} = k, \\qquad \\text{Alan oranı} = k^2$$",
     "ornekler": [],
     "ozet": [
      "Eşlik: KAK, AKA, KKK (KKA dikkatli kullanılır).",
      "Benzerlik: AA, KAK (orantılı), KKK (orantılı).",
      "Benzerlik oranı $k$ ise çevreler oranı $k$, alanlar oranı $k^2$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "",
    "title": {
     "tr": "Bir üçgenden hareketle ona benzer üçgenler oluşturma ile ilgili yansıtma yapabilme",
     "en": "Reflecting on constructing triangles similar to a given triangle"
    },
    "content": {
     "anlatim": "Bir üçgene benzer yeni üçgenler oluşturmak için kenarları **aynı oranda** büyüterek/küçülterek veya **açıları koruyarak** çizim yapılabilir. Bunun için homoteti (benzerlik dönüşümü) kullanılır.",
     "ornekler": [
      {
       "soru": "Bir üçgenin kenarları 2 katına çıkarılarak yeni bir üçgen çiziliyor. Benzerlik oranı ve alan nasıl değişir?",
       "cozum": "Benzer ve daha büyük bir üçgen elde edilir. Benzerlik oranı $k = 2$ olduğundan alan $k^2 = 4$ katına çıkar."
      }
     ],
     "ozet": [
      "Kenarlar aynı oranda büyütülür/küçültülürse veya açılar korunursa benzer üçgen elde edilir.",
      "Kenarlar $k$ katına çıkarsa alan $k^2$ katına çıkar."
     ]
    }
   },
   {
    "id": "k4",
    "code": "",
    "title": {
     "tr": "Tales, Öklid ve Pisagor teoremlerini ispatlayabilme",
     "en": "Proving the Thales, Euclid and Pythagorean theorems"
    },
    "content": {
     "anlatim": "# Tales Teoremi\n\nBir üçgenin iki kenarını kesen ve üçüncü kenara paralel olan doğru, diğer iki kenarı orantılı böler:\n\n$$\\frac{|AD|}{|DB|} = \\frac{|AE|}{|EC|} \\qquad (BC \\parallel DE \\text{ ise})$$\n\n*Genelleme:* Paralel doğrular, kesenler üzerinde orantılı parçalar oluşturur.\n\n# Öklid Teoremi (Dik Üçgende)\n\nDik üçgende dik kenarların karesi, hipotenüse ait izdüşüm ile hipotenüsün çarpımına eşittir:\n\n$$a^2 = p \\cdot c, \\qquad b^2 = q \\cdot c \\qquad (c \\text{ hipotenüs; } p \\text{ ve } q \\text{ izdüşümler})$$\n\nAyrıca hipotenüse ait yükseklik için:\n\n$$h^2 = p \\cdot q$$\n\n# Pisagor Teoremi\n\nDik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir:\n\n$$a^2 + b^2 = c^2$$\n\n*İspat:* Öklid teoreminden veya benzer üçgenlerden elde edilebilir.",
     "ornekler": [],
     "ozet": [
      "Tales: $BC \\parallel DE \\Rightarrow \\dfrac{|AD|}{|DB|} = \\dfrac{|AE|}{|EC|}$",
      "Öklid: $a^2 = p \\cdot c$, $\\;b^2 = q \\cdot c$, $\\;h^2 = p \\cdot q$",
      "Pisagor: $a^2 + b^2 = c^2$"
     ]
    }
   },
   {
    "id": "k5",
    "code": "",
    "title": {
     "tr": "Eşlik ve benzerlikle ilgili çıkarım ve teoremleri içeren problemleri çözebilme",
     "en": "Solving problems involving inferences and theorems on congruence and similarity"
    },
    "content": {
     "anlatim": "# Problem Çözme Adımları\n\n1. Şekli incele, bilinen açı ve kenarları işaretle.\n2. Eşlik veya benzerlik koşulunu belirle (AA, KAK, KKK vb.).\n3. Orantı yaz veya eş kenar/açıları eşitle.\n4. Tales, Öklid veya Pisagor'u uygula.\n5. Sonucu kontrol et.",
     "ornekler": [],
     "ozet": [
      "Önce koşulu belirle (AA, KAK, KKK), sonra orantı kur.",
      "Dik üçgen varsa Pisagor ve Öklid'i, paralel doğru varsa Tales'i düşün."
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
     "anlatim": "# Algoritma Nedir?\n\nBir problemi çözmek veya belirli bir amaca ulaşmak için izlenen **sonlu, sıralı ve açık** adımlar dizisidir.\n\n# Algoritma Gösterim Biçimleri\n\n- **Sözde kod (pseudocode):** Programlama diline yakın, doğal dilde yazılmış adımlar.\n- **Akış şeması:** Şekillerle (oval, dikdörtgen, elmas, ok) görsel gösterim.\n- **Çizge:** Düğüm ve kenarlarla ilişki gösterimi.\n\n# Akış Şeması Sembolleri\n\n| Sembol | Anlamı |\n|---|---|\n| Oval | Başla / Bitir |\n| Dikdörtgen | İşlem |\n| Paralelkenar | Girdi / Çıktı |\n| Elmas (baklava) | Karar (evet/hayır) |\n| Ok | Akış yönü |",
     "ornekler": [
      {
       "soru": "İki sayının en büyüğünü bulan algoritmayı yazınız.",
       "cozum": "1. Başla\n2. $a$ ve $b$ sayılarını oku\n3. Eğer $a > b$ ise $a$'yı yaz, değilse $b$'yi yaz\n4. Bitir"
      }
     ],
     "ozet": [
      "Algoritma: sonlu, sıralı ve açık adımlar dizisi.",
      "Akış şemasında oval başla/bitir, dikdörtgen işlem, paralelkenar girdi/çıktı, elmas karar."
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
     "anlatim": "Algoritmalarda **karar yapıları** (if-else) mantık bağlaçlarıyla, **döngüler** ise niceleyicilerle ilişkilendirilebilir. Örneğin \"tüm elemanlar için kontrol et\" $\\forall$ ile, \"en az bir eleman bul\" $\\exists$ ile ifade edilir.\n\nŞifreleme algoritmalarında da mantıksal işlemler (XOR vb.) kullanılır. Öğrenciler, algoritmik düşünmeyi matematiksel ispat ve problem çözmeye aktarabilir.",
     "ornekler": [],
     "ozet": [
      "Karar yapıları (if-else) ↔ mantık bağlaçları; döngüler ↔ niceleyiciler.",
      "“Hepsi için kontrol et” → $\\forall$, “en az bir tane bul” → $\\exists$"
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
     "ornekler": [],
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
     "anlatim": "Başkalarının hazırladığı grafik, tablo veya özet istatistikleri incelerken şu sorular sorulur:\n\n- Örneklem büyüklüğü yeterli mi?\n- Örneklem rastgele ve temsil edici mi?\n- Grafik yanıltıcı mı? (eksen kesme, ölçek vb.)\n- Aykırı değerler var mı ve nasıl ele alınmış?\n- Sonuçlar genellenebilir mi?\n- Alternatif yorumlar mümkün mü?",
     "ornekler": [],
     "ozet": [
      "Örneklem yeterli ve temsil edici mi? Grafik ekseni kesilmiş ya da ölçeği yanıltıcı mı?",
      "Aykırı değerler ve alternatif yorumlar sorgulanmalı."
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
     "anlatim": "# Temel Kavramlar\n\n- **Deney:** Sonucu tesadüfe bağlı gözlem veya işlem\n- **Çıktı (outcome):** Deneyin mümkün sonuçlarından her biri\n- **Örnek uzay ($S$):** Tüm mümkün çıktıların kümesi\n- **Olay ($A$):** Örnek uzayın bir alt kümesi\n\n# Deneysel (Gözlemsel) Olasılık\n\n$$P(A) \\approx \\frac{A \\text{ olayının gerçekleşme sayısı}}{\\text{Toplam deneme sayısı}}$$\n\nDeneme sayısı arttıkça deneysel olasılık, teorik olasılığa yaklaşır (**Büyük Sayılar Yasası**).",
     "ornekler": [
      {
       "soru": "Bir madeni para 100 kez atıldığında 56 yazı geldi. Yazı gelme olasılığını deneysel olarak tahmin ediniz.",
       "cozum": "$P(\\text{Yazı}) \\approx \\dfrac{56}{100} = 0{,}56$"
      }
     ],
     "ozet": [
      "Deneysel olasılık = gerçekleşme sayısı / toplam deneme sayısı",
      "Deneme sayısı arttıkça deneysel olasılık teorik olasılığa yaklaşır (Büyük Sayılar Yasası)."
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
     "anlatim": "# Teorik Olasılık\n\n$$P(A) = \\frac{A \\text{ olayının elverişli çıktı sayısı}}{\\text{Örnek uzayın eleman sayısı}} = \\frac{n(A)}{n(S)}$$\n\n$$0 \\leq P(A) \\leq 1, \\qquad P(S) = 1, \\qquad P(\\emptyset) = 0$$\n\n# Olay Türleri\n\n- **Ayrık olaylar:** Ortak çıktısı olmayan olaylar ($A \\cap B = \\emptyset$)\n- **Ayrık olmayan olaylar:** Ortak çıktısı olan olaylar\n\n# Temel Olasılık Kuralları\n\n- $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$\n- $A$ ve $B$ ayrık ise: $P(A \\cup B) = P(A) + P(B)$\n- $P(A') = 1 - P(A)$ (tümleyen)\n- $P(A \\cap B) = P(A) \\cdot P(B)$ (bağımsız olaylar için)",
     "ornekler": [
      {
       "soru": "Bir zar atıldığında tek sayı gelme olasılığı kaçtır?",
       "cozum": "$S = \\{1, 2, 3, 4, 5, 6\\}$, $A = \\{1, 3, 5\\}$, $P(A) = \\dfrac{3}{6} = \\dfrac{1}{2}$"
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
 }
];
