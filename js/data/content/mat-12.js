/* =========================================================
   12. Sınıf Matematik — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Matematik 12 Detaylı Konu Anlatım Notları" (7 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Düzeltme: üstel fonksiyonun grafiği y eksenini (0,1)'de keser, x eksenini hiç kesmez. Her konuya çözümlü örnekler, işlem tabloları ve uygulamalar eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/matematik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Üstel ve Logaritmik Fonksiyonlar",
   "en": "Unit 1: Exponential and Logarithmic Functions"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Üstel fonksiyon",
     "en": "Exponential function"
    },
    "content": {
     "anlatim": "# Tanım\n\n$a > 0$, $a \\neq 1$ olmak üzere\n$$f: \\mathbb{R} \\to (0, \\infty), \\quad f(x) = a^x$$\nfonksiyonuna **üstel fonksiyon** denir ($a$: taban).\n\n# Özellikler\n\n- Tanım kümesi $\\mathbb{R}$, görüntü kümesi $(0, \\infty)$ → değerleri **her zaman pozitif**.\n- $f(0) = 1$ → grafik daima $(0, 1)$ noktasından geçer (**y eksenini kesen nokta**); **x eksenini hiç kesmez**.\n- $a > 1$ ise **artan**, $0 < a < 1$ ise **azalan**.\n- $x$ ekseni ($y = 0$) **yatay asimptottur**.\n- $a^{x_1 + x_2} = a^{x_1}\\cdot a^{x_2}$, $\\;a^{x_1 - x_2} = \\dfrac{a^{x_1}}{a^{x_2}}$, $\\;(a^x)^n = a^{nx}$.\n- **Bire bir ve örten** (görüntü kümesine) → tersi vardır: **logaritma**.\n- $y = a^x$ ile $y = \\left(\\frac1a\\right)^x$ grafikleri **y eksenine göre simetriktir**.\n\n# Doğal Üstel Fonksiyon\n\n$e \\approx 2{,}71828$ olmak üzere $f(x) = e^x$. $e = \\lim\\limits_{n\\to\\infty}\\left(1 + \\dfrac1n\\right)^n$.\n\n# Modelleme\n\n$$A(t) = A_0\\,a^t \\quad \\text{ya da} \\quad A(t) = A_0\\,e^{kt}$$\n- **Büyüme** ($a > 1$, $k > 0$): bakteri çoğalması, nüfus, **bileşik faiz** $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$.\n- **Azalma** ($0 < a < 1$, $k < 0$): radyoaktif bozunma, ilacın kandan atılması, Newton'un soğuma yasası.",
     "ornekler": [
      {
       "soru": "$f(x) = 2^x$ için $f(3)$, $f(-2)$ ve $f\\left(\\frac12\\right)$ değerlerini bulunuz.",
       "cozum": "$f(3) = 8$, $f(-2) = \\frac14$, $f\\left(\\frac12\\right) = \\sqrt2$."
      },
      {
       "soru": "Her saatte iki katına çıkan 500 bakterilik bir koloni 5 saat sonra kaç bakteri olur?",
       "cozum": "$A(t) = 500 \\cdot 2^t \\Rightarrow A(5) = 500 \\cdot 32 = 16\\,000$."
      }
     ],
     "ozet": [
      "$f(x)=a^x$: değerler pozitif, $(0,1)$'den geçer.",
      "$a>1$ artan, $0<a<1$ azalan; $y=0$ asimptot.",
      "Büyüme–azalma modelleri $A_0a^t$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Logaritma fonksiyonu ve özellikleri",
     "en": "Logarithmic function and properties"
    },
    "content": {
     "anlatim": "# Tanım\n\n$a > 0$, $a \\neq 1$, $b > 0$ olmak üzere\n$$\\log_a b = c \\iff a^c = b$$\nLogaritma, üstel fonksiyonun **tersidir**: $f(x) = a^x \\Rightarrow f^{-1}(x) = \\log_a x$.\n\n- Tanım kümesi $(0, \\infty)$, görüntü kümesi $\\mathbb{R}$.\n- $\\log_a 1 = 0$, $\\log_a a = 1$, $\\log_a a^x = x$, $a^{\\log_a x} = x$.\n- **Adi logaritma:** $\\log x = \\log_{10} x$. **Doğal logaritma:** $\\ln x = \\log_e x$.\n\n# Kurallar\n\n$$\\log_a(xy) = \\log_a x + \\log_a y \\qquad \\log_a\\frac{x}{y} = \\log_a x - \\log_a y$$\n$$\\log_a x^n = n\\log_a x \\qquad \\log_{a^m} x^n = \\frac{n}{m}\\log_a x$$\n$$\\text{Taban değiştirme: } \\log_a b = \\frac{\\log_c b}{\\log_c a} = \\frac{\\ln b}{\\ln a} \\qquad \\log_a b \\cdot \\log_b a = 1$$\n\n# Grafik\n\n$y = \\log_a x$ ile $y = a^x$ grafikleri **$y = x$ doğrusuna göre simetriktir**.\n- $(1, 0)$ noktasından geçer; **$x = 0$ düşey asimptottur**.\n- $a > 1$ artan, $0 < a < 1$ azalan.\n\n**Uygulamalar:** Deprem büyüklüğü (Richter), ses şiddeti (desibel), **pH** $= -\\log[H^+]$.",
     "ornekler": [
      {
       "soru": "$\\log 2 = 0{,}301$ ise $\\log 40$ ve $\\log_2 5$ değerlerini bulunuz.",
       "cozum": "$\\log 40 = \\log 4 + \\log 10 = 2(0{,}301) + 1 = 1{,}602$. $\\log_2 5 = \\frac{\\log 5}{\\log 2} = \\frac{1 - 0{,}301}{0{,}301} \\approx 2{,}32$."
      },
      {
       "soru": "$\\log_3 81 + \\log_2 \\frac18 - \\ln e^5$ işleminin sonucu nedir?",
       "cozum": "$4 + (-3) - 5 = -4$."
      }
     ],
     "ozet": [
      "$\\log_ab=c \\iff a^c=b$; $\\log_a$ üstelin tersi.",
      "Çarpım → toplam, bölüm → fark, kuvvet → katsayı.",
      "Grafik $(1,0)$'dan geçer, $x=0$ asimptot."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Üstel ve logaritmik denklem ve eşitsizlikler",
     "en": "Exponential and logarithmic equations and inequalities"
    },
    "content": {
     "anlatim": "# Üstel Denklem Çözme Yolları\n\n1. **Tabanları eşitle:** $a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)$.\n2. **İki tarafın logaritmasını al:** $3^x = 7 \\Rightarrow x = \\log_3 7$.\n3. **Değişken değiştir:** $4^x - 3\\cdot2^x + 2 = 0$ → $t = 2^x$ → $t^2 - 3t + 2 = 0$.\n\n# Logaritmik Denklemler\n\n$\\log_a f(x) = \\log_a g(x) \\Rightarrow f(x) = g(x)$. **Tanım kontrolü zorunludur:** logaritmanın içi **pozitif**, taban pozitif ve 1'den farklı olmalı; şartı sağlamayan kökler **elenir**.\n\n# Eşitsizlikler\n\n| Taban | Fonksiyon | Eşitsizlik yönü |\n|---|---|---|\n| $a > 1$ | Artan | **Korunur**: $a^{f} < a^{g} \\iff f < g$ |\n| $0 < a < 1$ | Azalan | **Değişir**: $a^{f} < a^{g} \\iff f > g$ |\n\nLogaritmik eşitsizlikte ayrıca **tanım aralığı** ile çözüm kümesinin **kesişimi** alınır.",
     "ornekler": [
      {
       "soru": "$2^{x+1} = 8^{x-2}$ denklemini çözünüz.",
       "cozum": "$2^{x+1} = 2^{3x-6} \\Rightarrow x + 1 = 3x - 6 \\Rightarrow x = \\frac72$."
      },
      {
       "soru": "$\\log_3(x-1) + \\log_3(x+1) = 1$ denklemini çözünüz.",
       "cozum": "$\\log_3(x^2-1) = 1 \\Rightarrow x^2 - 1 = 3 \\Rightarrow x = \\pm2$. Tanım: $x > 1$ → çözüm **$x = 2$** ($x = -2$ elenir)."
      },
      {
       "soru": "$\\left(\\frac12\\right)^{x-3} > 4$ eşitsizliğini çözünüz.",
       "cozum": "$\\left(\\frac12\\right)^{x-3} > \\left(\\frac12\\right)^{-2}$; taban $<1$ olduğundan yön değişir: $x - 3 < -2 \\Rightarrow x < 1$."
      }
     ],
     "ozet": [
      "Tabanları eşitle, logaritma al ya da değişken değiştir.",
      "Logaritmik denklemde tanım kontrolü şart.",
      "Taban 0 ile 1 arasında ise eşitsizlik yön değiştirir."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Diziler",
   "en": "Unit 2: Sequences"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Gerçek sayı dizileri: aritmetik ve geometrik diziler",
     "en": "Real sequences: arithmetic and geometric"
    },
    "content": {
     "anlatim": "# Dizi\n\nPozitif tam sayılar kümesinden gerçek sayılara tanımlı fonksiyon: $(a_n) = (a_1, a_2, a_3, \\ldots)$. $a_n$: **genel terim**.\n- **Sonlu / sonsuz** dizi; **sabit dizi** $(a_n) = (c)$.\n- **Artan:** $a_{n+1} > a_n$; **azalan:** $a_{n+1} < a_n$.\n- **İndirgemeli (rekürsif) tanım:** Fibonacci $a_{n+2} = a_{n+1} + a_n$.\n\n# Aritmetik Dizi (ortak fark $d$)\n\n$$a_{n+1} - a_n = d \\qquad a_n = a_1 + (n-1)d \\qquad a_n = a_m + (n-m)d$$\n$$S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}\\left[2a_1 + (n-1)d\\right]$$\n- Ardışık üç terimde ortadaki, diğer ikisinin **aritmetik ortalamasıdır**: $b = \\dfrac{a + c}{2}$.\n- Örnek: $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$.\n\n# Geometrik Dizi (ortak oran $r$)\n\n$$\\frac{a_{n+1}}{a_n} = r \\qquad a_n = a_1\\,r^{n-1}$$\n$$S_n = a_1\\frac{r^n - 1}{r - 1}\\ (r \\neq 1) \\qquad r = 1 \\Rightarrow S_n = n\\,a_1$$\n- Ardışık üç terimde ortadakinin karesi diğer ikisinin çarpımıdır: $b^2 = ac$ (**geometrik ortalama**).\n- **Sonsuz geometrik seri** ($|r| < 1$): $$S = \\frac{a_1}{1 - r}$$\n\n# Dizi Limitine Giriş\n\n$n \\to \\infty$ iken $a_n$ bir $L$ sayısına yaklaşıyorsa dizi **yakınsaktır**: $\\lim a_n = L$. Aksi hâlde **ıraksaktır**.\n- $\\lim \\dfrac1n = 0$; $|r| < 1$ ise $\\lim r^n = 0$.\n- $0{,}\\overline{3} = \\dfrac{3}{10} + \\dfrac{3}{100} + \\cdots = \\dfrac{3/10}{1 - 1/10} = \\dfrac13$.\n\n**Gerçek hayat:** Kira ve maaş artışları (aritmetik), bileşik faiz ve nüfus (geometrik), zıplayan topun toplam yolu (sonsuz geometrik seri).",
     "ornekler": [
      {
       "soru": "Bir aritmetik dizide $a_3 = 11$, $a_8 = 26$ ise $a_1$, $d$ ve $S_{10}$ nedir?",
       "cozum": "$5d = 15 \\Rightarrow d = 3$, $a_1 = 11 - 6 = 5$. $a_{10} = 5 + 27 = 32$, $S_{10} = \\frac{10}{2}(5 + 32) = 185$."
      },
      {
       "soru": "$2 + 1 + \\frac12 + \\frac14 + \\cdots$ sonsuz toplamı nedir?",
       "cozum": "$a_1 = 2$, $r = \\frac12$: $S = \\frac{2}{1 - 1/2} = 4$."
      }
     ],
     "ozet": [
      "Aritmetik: $a_n=a_1+(n-1)d$, $S_n=\\frac n2(a_1+a_n)$.",
      "Geometrik: $a_n=a_1r^{n-1}$; $|r|<1$ ise $S=\\frac{a_1}{1-r}$.",
      "Yakınsak dizi: $\\lim a_n=L$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Toplam sembolü, seriler ve dizilerin uygulamaları",
     "en": "Summation notation, series and applications of sequences"
    },
    "content": {
     "anlatim": "# Toplam Sembolü\n\n$$\\sum_{k=1}^{n} a_k = a_1 + a_2 + \\dots + a_n$$\n**Özellikler:**\n- $\\sum_{k=1}^{n} c = n\\cdot c$ · $\\sum (a_k \\pm b_k) = \\sum a_k \\pm \\sum b_k$ · $\\sum c\\,a_k = c\\sum a_k$\n\n**Bilinen toplamlar:**\n- $\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$ · $\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$ · $\\displaystyle\\sum_{k=1}^{n} k^3 = \\left[\\frac{n(n+1)}{2}\\right]^2$\n\n# Aritmetik ve Geometrik Seri\n\n| | Aritmetik ($d$ ortak fark) | Geometrik ($r$ ortak çarpan) |\n|---|---|---|\n| Genel terim | $a_n = a_1 + (n-1)d$ | $a_n = a_1 r^{n-1}$ |\n| İlk $n$ terim toplamı | $S_n = \\dfrac{n(a_1 + a_n)}{2}$ | $S_n = a_1\\dfrac{r^n - 1}{r - 1}$ |\n| Sonsuz toplam | — | $\\lvert r\\rvert < 1$ ise $S = \\dfrac{a_1}{1 - r}$ |\n\n# Uygulamalar\n\n- **Bileşik faiz:** $A = P(1 + i)^n$ (geometrik dizi)\n- **Nüfus/bakteri artışı**, **ilaç yarılanması** (geometrik); **eşit taksitle birikim** (aritmetik)\n- $0{,}\\overline{3} = \\dfrac{3}{10} + \\dfrac{3}{100} + \\dots = \\dfrac{0{,}3}{1 - 0{,}1} = \\dfrac13$",
     "ornekler": [
      {
       "soru": "$\\displaystyle\\sum_{k=1}^{20} (2k + 1)$ toplamı kaçtır?",
       "cozum": "$2\\cdot\\frac{20\\cdot21}{2} + 20 = 420 + 20 = 440$."
      },
      {
       "soru": "İlk terimi $8$, ortak çarpanı $\\frac12$ olan sonsuz geometrik serinin toplamı kaçtır?",
       "cozum": "$S = \\frac{8}{1 - \\frac12} = 16$."
      }
     ],
     "ozet": [
      "$\\sum k = n(n+1)/2$, $\\sum k^2 = n(n+1)(2n+1)/6$.",
      "Geometrik toplam $a_1(r^n - 1)/(r - 1)$.",
      "Sonsuz geometrik seri $\\lvert r\\rvert<1$ ise $a_1/(1-r)$."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Trigonometri",
   "en": "Unit 3: Trigonometry"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Toplam–fark, iki kat açı ve dönüşüm formülleri",
     "en": "Sum–difference, double-angle and transformation formulas"
    },
    "content": {
     "anlatim": "# Toplam–Fark Formülleri\n\n$$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B$$\n$$\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B$$\n$$\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}$$\n\n**Örnek:** $\\sin 75° = \\sin(45° + 30°) = \\dfrac{\\sqrt2}{2}\\cdot\\dfrac{\\sqrt3}{2} + \\dfrac{\\sqrt2}{2}\\cdot\\dfrac12 = \\dfrac{\\sqrt6 + \\sqrt2}{4}$.\n\n# İki Kat Açı Formülleri\n\n$$\\sin 2A = 2\\sin A\\cos A$$\n$$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$$\n$$\\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}$$\n\n# Yarım Açı (Kuvvet Azaltma)\n\n$$\\sin^2 A = \\frac{1 - \\cos 2A}{2} \\qquad \\cos^2 A = \\frac{1 + \\cos 2A}{2}$$\n\n# Ters Dönüşüm (Çarpım → Toplam)\n\n$$\\sin A\\cos B = \\tfrac12[\\sin(A+B) + \\sin(A-B)]$$\n$$\\cos A\\cos B = \\tfrac12[\\cos(A+B) + \\cos(A-B)] \\qquad \\sin A\\sin B = \\tfrac12[\\cos(A-B) - \\cos(A+B)]$$\n\n**Temel özdeşlikler (hatırlatma):** $\\sin^2x + \\cos^2x = 1$, $\\tan x = \\dfrac{\\sin x}{\\cos x}$, $1 + \\tan^2 x = \\dfrac{1}{\\cos^2 x}$.",
     "ornekler": [
      {
       "soru": "$\\sin A = \\frac35$ ve $A$ dar açı ise $\\sin 2A$ ve $\\cos 2A$ nedir?",
       "cozum": "$\\cos A = \\frac45$. $\\sin 2A = 2\\cdot\\frac35\\cdot\\frac45 = \\frac{24}{25}$; $\\cos 2A = 1 - 2\\cdot\\frac{9}{25} = \\frac{7}{25}$."
      },
      {
       "soru": "$\\cos 15°$ değerini bulunuz.",
       "cozum": "$\\cos(45° - 30°) = \\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2} + \\frac{\\sqrt2}{2}\\cdot\\frac12 = \\frac{\\sqrt6 + \\sqrt2}{4}$."
      }
     ],
     "ozet": [
      "$\\sin(A\\pm B)$, $\\cos(A\\pm B)$, $\\tan(A\\pm B)$.",
      "$\\sin2A=2\\sin A\\cos A$; $\\cos2A$ üç biçim.",
      "Yarım açı ve çarpım–toplam formülleri."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Trigonometrik denklemler",
     "en": "Trigonometric equations"
    },
    "content": {
     "anlatim": "# Temel Denklemlerin Genel Çözümleri ($k \\in \\mathbb{Z}$)\n\n| Denklem | Genel çözüm |\n|---|---|\n| $\\sin x = \\sin\\alpha$ | $x = \\alpha + 2k\\pi$ **veya** $x = \\pi - \\alpha + 2k\\pi$ |\n| $\\cos x = \\cos\\alpha$ | $x = \\alpha + 2k\\pi$ **veya** $x = -\\alpha + 2k\\pi$ |\n| $\\tan x = \\tan\\alpha$ | $x = \\alpha + k\\pi$ |\n| $\\cot x = \\cot\\alpha$ | $x = \\alpha + k\\pi$ |\n\n- $\\sin x = a$ ve $\\cos x = a$ için **$|a| \\le 1$** olmalı; aksi hâlde çözüm yoktur.\n- Özel durumlar: $\\sin x = 0 \\Rightarrow x = k\\pi$; $\\cos x = 0 \\Rightarrow x = \\dfrac\\pi2 + k\\pi$; $\\sin x = 1 \\Rightarrow x = \\dfrac\\pi2 + 2k\\pi$.\n\n# Yöntemler\n\n- **Çarpanlara ayırma:** $\\sin x\\cos x - \\sin x = 0 \\Rightarrow \\sin x(\\cos x - 1) = 0$.\n- **Değişken değiştirme:** $2\\sin^2 x - 3\\sin x + 1 = 0 \\Rightarrow t = \\sin x$.\n- **Özdeşlik kullanma:** $\\cos 2x$ ifadesini $1 - 2\\sin^2x$ ile yazmak.\n- Belirli bir aralık sorulursa (ör. $[0, 2\\pi)$) yalnızca o aralıktaki kökler yazılır.",
     "ornekler": [
      {
       "soru": "$[0, 2\\pi)$ aralığında $2\\sin^2 x - 3\\sin x + 1 = 0$ denklemini çözünüz.",
       "cozum": "$t = \\sin x$: $2t^2 - 3t + 1 = 0 \\Rightarrow t = 1$ ya da $t = \\frac12$. $\\sin x = 1 \\Rightarrow x = \\frac\\pi2$; $\\sin x = \\frac12 \\Rightarrow x = \\frac\\pi6, \\frac{5\\pi}{6}$. Çözüm: $\\left\\{\\frac\\pi6, \\frac\\pi2, \\frac{5\\pi}6\\right\\}$."
      },
      {
       "soru": "$\\cos 2x = \\frac12$ denkleminin genel çözümü nedir?",
       "cozum": "$2x = \\pm\\frac\\pi3 + 2k\\pi \\Rightarrow x = \\pm\\frac\\pi6 + k\\pi$."
      }
     ],
     "ozet": [
      "$\\sin x=\\sin\\alpha$: $\\alpha+2k\\pi$ ya da $\\pi-\\alpha+2k\\pi$.",
      "$\\cos x=\\cos\\alpha$: $\\pm\\alpha+2k\\pi$; $\\tan$: $\\alpha+k\\pi$.",
      "Çarpanlara ayırma, değişken değiştirme, aralık kontrolü."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Ters trigonometrik fonksiyonlar ve trigonometrik fonksiyonların grafikleri",
     "en": "Inverse trigonometric functions and graphs of trigonometric functions"
    },
    "content": {
     "anlatim": "# Grafikler ve Periyot\n\n| Fonksiyon | Periyot | Görüntü kümesi |\n|---|---|---|\n| $\\sin x$, $\\cos x$ | $2\\pi$ | $[-1, 1]$ |\n| $\\tan x$, $\\cot x$ | $\\pi$ | $\\mathbb{R}$ |\n\n$f(x) = a\\sin(bx + c) + d$ için: **genlik** $\\lvert a\\rvert$, **periyot** $\\dfrac{2\\pi}{\\lvert b\\rvert}$, **en büyük değer** $\\lvert a\\rvert + d$, **en küçük değer** $-\\lvert a\\rvert + d$.\n- $\\tan(bx)$'in periyodu $\\dfrac{\\pi}{\\lvert b\\rvert}$.\n- $\\sin^n$ ve $\\cos^n$: $n$ **çift** ise periyot $\\pi$, **tek** ise $2\\pi$.\n\n# Ters Fonksiyonlar (tanım aralıkları kısıtlanarak)\n\n| Fonksiyon | Tanım kümesi | Görüntü kümesi |\n|---|---|---|\n| $\\arcsin x$ | $[-1, 1]$ | $\\left[-\\dfrac\\pi2, \\dfrac\\pi2\\right]$ |\n| $\\arccos x$ | $[-1, 1]$ | $[0, \\pi]$ |\n| $\\arctan x$ | $\\mathbb{R}$ | $\\left(-\\dfrac\\pi2, \\dfrac\\pi2\\right)$ |\n\n- $\\arcsin\\dfrac12 = \\dfrac\\pi6$, $\\arccos\\left(-\\dfrac12\\right) = \\dfrac{2\\pi}{3}$, $\\arctan 1 = \\dfrac\\pi4$\n- $\\arcsin x + \\arccos x = \\dfrac\\pi2$\n- $\\sin(\\arcsin x) = x$, ama $\\arcsin(\\sin x) = x$ yalnızca $x \\in \\left[-\\frac\\pi2, \\frac\\pi2\\right]$ için.",
     "ornekler": [
      {
       "soru": "$f(x) = 3\\cos(2x) - 1$ fonksiyonunun periyodunu, en büyük ve en küçük değerini bulunuz.",
       "cozum": "Periyot $\\frac{2\\pi}{2} = \\pi$; en büyük $3 - 1 = 2$, en küçük $-3 - 1 = -4$."
      },
      {
       "soru": "$\\cos\\left(\\arcsin\\dfrac35\\right)$ değeri kaçtır?",
       "cozum": "$\\arcsin\\frac35 = \\theta$ ise $\\sin\\theta = \\frac35$, $\\theta \\in [-\\frac\\pi2, \\frac\\pi2]$ → $\\cos\\theta = \\frac45$ (pozitif)."
      }
     ],
     "ozet": [
      "$a\\sin(bx+c)+d$: genlik $\\lvert a\\rvert$, periyot $2\\pi/\\lvert b\\rvert$.",
      "arcsin görüntüsü $[-\\pi/2, \\pi/2]$, arccos görüntüsü $[0, \\pi]$.",
      "$\\arcsin x + \\arccos x = \\pi/2$."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Dönüşümler",
   "en": "Unit 4: Transformations"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Analitik düzlemde öteleme, yansıma, dönme ve ölçekleme",
     "en": "Translation, reflection, rotation and dilation"
    },
    "content": {
     "anlatim": "# Öteleme\n\n$$(x, y) \\to (x + a,\\ y + b)$$\nŞekil kaymaz, boyut ve yönü değişmez. **Fonksiyonlarda:** $y = f(x - a) + b$ → grafik **sağa $a$, yukarı $b$** ötelenir.\n\n# Yansıma (Simetri)\n\n| Eksene / doğruya göre | Görüntü |\n|---|---|\n| $x$ ekseni | $(x, -y)$ |\n| $y$ ekseni | $(-x, y)$ |\n| Orijin | $(-x, -y)$ |\n| $y = x$ doğrusu | $(y, x)$ |\n| $y = -x$ doğrusu | $(-y, -x)$ |\n| $x = k$ doğrusu | $(2k - x, y)$ |\n| $y = k$ doğrusu | $(x, 2k - y)$ |\n\n**Fonksiyonlarda:** $y = -f(x)$ → $x$ eksenine göre; $y = f(-x)$ → $y$ eksenine göre yansıma.\n\n# Dönme (Orijin etrafında, saat yönünün tersine $\\theta$)\n\n$$x' = x\\cos\\theta - y\\sin\\theta \\qquad y' = x\\sin\\theta + y\\cos\\theta$$\n| Açı | Görüntü |\n|---|---|\n| $90°$ | $(-y, x)$ |\n| $180°$ | $(-x, -y)$ |\n| $270°$ | $(y, -x)$ |\n\n# Ölçekleme (Orijin merkezli homoteti)\n\n$$(x, y) \\to (kx,\\ ky)$$\n- $|k| > 1$ **büyütme**, $0 < |k| < 1$ **küçültme**; $k < 0$ ise ayrıca orijine göre yansıma.\n- Uzunluklar $|k|$, alanlar $k^2$ katına çıkar.\n\n**İzometri:** Öteleme, yansıma ve dönme uzunlukları ve açıları **korur**; ölçekleme yalnızca açıları korur (benzer şekil).",
     "ornekler": [
      {
       "soru": "$A(3, -2)$ noktasının orijin etrafında $90°$ döndürülmesiyle ve $y = x$ doğrusuna göre yansımasıyla elde edilen görüntüler nedir?",
       "cozum": "$90°$ dönme: $(-y, x) = (2, 3)$. $y = x$ yansıması: $(y, x) = (-2, 3)$."
      },
      {
       "soru": "$y = x^2$ parabolü 2 birim sağa, 3 birim aşağı ötelenirse denklem ne olur?",
       "cozum": "$y = (x - 2)^2 - 3$."
      }
     ],
     "ozet": [
      "Öteleme $(x+a,y+b)$; $f(x-a)+b$ sağa ve yukarı.",
      "Yansıma: $x$ ekseni $(x,-y)$, $y=x$ $(y,x)$.",
      "Dönme $90°$: $(-y,x)$; ölçekleme $(kx,ky)$."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Türev",
   "en": "Unit 5: Derivatives"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Limit ve süreklilik",
     "en": "Limits and continuity"
    },
    "content": {
     "anlatim": "# Limit\n\n$x$, $a$'ya yaklaşırken $f(x)$ değerleri $L$'ye yaklaşıyorsa $\\lim\\limits_{x\\to a} f(x) = L$. $f(a)$'nın tanımlı olması **gerekmez**.\n\n**Sağdan ve soldan limit:** $\\lim\\limits_{x\\to a^+} f(x)$, $\\lim\\limits_{x\\to a^-} f(x)$. Limitin var olması için **ikisi de var ve eşit** olmalıdır.\n\n# Limit Özellikleri\n\nLimitler toplama, çıkarma, çarpma, bölmeye (payda limiti ≠ 0) dağılır. Polinomlarda $\\lim\\limits_{x\\to a} p(x) = p(a)$.\n\n# Belirsizlikler\n\n$\\dfrac00$, $\\dfrac\\infty\\infty$, $0\\cdot\\infty$, $\\infty - \\infty$ vb.\n- **Çarpanlara ayırıp sadeleştirme:** $\\lim\\limits_{x\\to2}\\dfrac{x^2-4}{x-2} = \\lim\\limits_{x\\to2}(x+2) = 4$.\n- **Eşlenikle çarpma:** köklü ifadelerde.\n- **Sonsuzda limit:** En büyük dereceli terimlere bakılır: $\\lim\\limits_{x\\to\\infty}\\dfrac{3x^2+1}{x^2-5} = 3$.\n- **Özel limit:** $\\lim\\limits_{x\\to0}\\dfrac{\\sin x}{x} = 1$.\n- **L'Hospital kuralı** (ileri düzey): $\\dfrac00$ ya da $\\dfrac\\infty\\infty$ ise $\\lim\\dfrac{f}{g} = \\lim\\dfrac{f'}{g'}$.\n\n# Süreklilik\n\n$f$, $x = a$'da süreklidir ⟺\n1. $f(a)$ tanımlı,\n2. $\\lim\\limits_{x\\to a} f(x)$ var,\n3. $\\lim\\limits_{x\\to a} f(x) = f(a)$.\n\nPolinom, üstel, sinüs ve kosinüs fonksiyonları her yerde süreklidir; rasyonel fonksiyonlar paydayı sıfır yapan noktalarda süreksizdir. Grafikte **kopukluk, sıçrama, boşluk** süreksizliği gösterir.",
     "ornekler": [
      {
       "soru": "$f(x) = \\begin{cases} x^2 + a, & x < 1 \\\\ 3x - 1, & x \\ge 1 \\end{cases}$ fonksiyonu $x = 1$'de sürekli ise $a$ nedir?",
       "cozum": "Soldan limit $1 + a$, sağdan limit ve $f(1) = 2$. Süreklilik için $1 + a = 2 \\Rightarrow a = 1$."
      },
      {
       "soru": "$\\lim\\limits_{x\\to3}\\dfrac{x^2 - 9}{x^2 - 3x}$ limitini hesaplayınız.",
       "cozum": "$\\frac{(x-3)(x+3)}{x(x-3)} = \\frac{x+3}{x} \\to \\frac{6}{3} = 2$."
      }
     ],
     "ozet": [
      "Limit için sağdan ve soldan limit eşit olmalı.",
      "$\\frac00$ belirsizliği: çarpanlara ayır, sadeleştir.",
      "Süreklilik: f(a) tanımlı, limit var ve f(a)'ya eşit."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Anlık değişim oranı, türev tanımı ve türev kuralları",
     "en": "Instantaneous rate of change and differentiation rules"
    },
    "content": {
     "anlatim": "# Türevin Tanımı\n\n$$f'(a) = \\lim_{h\\to0}\\frac{f(a+h) - f(a)}{h}$$\n- **Anlık değişim oranı**; grafiğin $x = a$ noktasındaki **teğetinin eğimi**.\n- Fizikte: konumun türevi **hız**, hızın türevi **ivme**.\n- **Teğet doğrusu:** $y - f(a) = f'(a)(x - a)$.\n- Türevli fonksiyon süreklidir; ancak sürekli her fonksiyon türevli değildir ($|x|$, $x = 0$'da **kırılma** noktası).\n\n# Türev Kuralları\n\n| Fonksiyon | Türev |\n|---|---|\n| $c$ | $0$ |\n| $x^n$ | $nx^{n-1}$ |\n| $e^x$ | $e^x$ |\n| $a^x$ | $a^x\\ln a$ |\n| $\\ln x$ | $\\dfrac1x$ |\n| $\\log_a x$ | $\\dfrac{1}{x\\ln a}$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $\\tan x$ | $1 + \\tan^2 x = \\dfrac{1}{\\cos^2x}$ |\n\n**İşlem kuralları:**\n$$(u \\pm v)' = u' \\pm v' \\qquad (uv)' = u'v + uv' \\qquad \\left(\\frac uv\\right)' = \\frac{u'v - uv'}{v^2}$$\n$$\\text{Zincir kuralı: } [f(g(x))]' = f'(g(x))\\cdot g'(x)$$",
     "ornekler": [
      {
       "soru": "$f(x) = (x^2 + 1)^5$ ise $f'(x)$ nedir?",
       "cozum": "Zincir kuralı: $f'(x) = 5(x^2+1)^4 \\cdot 2x = 10x(x^2+1)^4$."
      },
      {
       "soru": "$f(x) = x^3 - 2x$ eğrisine $x = 1$ noktasında çizilen teğetin denklemi nedir?",
       "cozum": "$f(1) = -1$, $f'(x) = 3x^2 - 2 \\Rightarrow f'(1) = 1$. Teğet: $y + 1 = 1(x - 1) \\Rightarrow y = x - 2$."
      }
     ],
     "ozet": [
      "$f'(a)$ = teğetin eğimi = anlık değişim oranı.",
      "$(x^n)'=nx^{n-1}$, $(e^x)'=e^x$, $(\\ln x)'=1/x$.",
      "Çarpım, bölüm ve zincir kuralı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "5.3",
    "title": {
     "tr": "Türevin uygulamaları: artan–azalan, ekstremum, optimizasyon",
     "en": "Applications of derivatives"
    },
    "content": {
     "anlatim": "# Artanlık ve Azalanlık\n\n- $f'(x) > 0$ olan aralıkta $f$ **artan**, $f'(x) < 0$ olan aralıkta **azalandır**.\n- $f'(c) = 0$ ya da $f'(c)$ tanımsız olan noktalar **kritik noktalardır**.\n\n# Ekstremum Noktaları\n\n**Birinci türev testi:** Kritik noktada $f'$ işareti\n- $+ \\to -$ değişiyorsa **yerel maksimum**,\n- $- \\to +$ değişiyorsa **yerel minimum**,\n- değişmiyorsa ekstremum yok.\n\n**İkinci türev testi:** $f'(c) = 0$ ve\n- $f''(c) < 0$ → **yerel maksimum**, $f''(c) > 0$ → **yerel minimum**.\n\n**Büküm (dönüm) noktası:** $f''$'nün işaret değiştirdiği nokta; $f'' > 0$ → **konveks (çukur yukarı)**, $f'' < 0$ → **konkav**.\n\n**Kapalı aralıkta mutlak ekstremum:** Kritik noktalardaki ve **uç noktalardaki** değerler karşılaştırılır.\n\n# Grafik Çizimi Adımları\n\nTanım kümesi → eksenleri kesim noktaları → asimptotlar → $f'$ ile artan–azalan ve ekstremumlar → $f''$ ile büküm → değişim tablosu → grafik.\n\n# Optimizasyon (En Büyük / En Küçük Değer Problemleri)\n\n1. Optimize edilecek büyüklüğü tek değişkenli fonksiyon olarak yaz.\n2. Türevini sıfıra eşitle, kritik noktaları bul.\n3. Uç noktaları ve fiziksel koşulları kontrol et.\n\n**İlgili oranlar:** Zamana göre değişen büyüklükler arasındaki türev ilişkileri (balon şişirme, merdiven kayması).",
     "ornekler": [
      {
       "soru": "$f(x) = x^3 - 3x^2 - 9x + 5$ fonksiyonunun yerel ekstremumlarını bulunuz.",
       "cozum": "$f'(x) = 3x^2 - 6x - 9 = 3(x-3)(x+1) = 0 \\Rightarrow x = -1, 3$. $f''(x) = 6x - 6$: $f''(-1) = -12 < 0$ → **yerel max** $f(-1) = 10$; $f''(3) = 12 > 0$ → **yerel min** $f(3) = -22$."
      },
      {
       "soru": "Kenar uzunluğu 12 cm olan kare kartonun köşelerinden $x$ cm'lik kareler kesilip üstü açık kutu yapılıyor. Hacim en fazla kaç cm³ olur?",
       "cozum": "$V(x) = x(12-2x)^2$, $0<x<6$. $V'(x) = (12-2x)(12-6x) = 0 \\Rightarrow x = 2$. $V(2) = 2 \\cdot 64 = 128$ cm³."
      }
     ],
     "ozet": [
      "f' > 0 artan, f' < 0 azalan.",
      "f'' < 0 yerel max, f'' > 0 yerel min.",
      "Optimizasyon: fonksiyon kur, türevi sıfırla, uç noktaları kontrol et."
     ]
    }
   },
   {
    "id": "k4",
    "code": "5.4",
    "title": {
     "tr": "Türev ile grafik çizimi ve asimptotlar",
     "en": "Curve sketching with derivatives and asymptotes"
    },
    "content": {
     "anlatim": "# Grafik Çizim Adımları\n\n1. **Tanım kümesi** ve eksenleri kestiği noktalar.\n2. **Asimptotlar:**\n   - **Düşey:** paydayı sıfır yapan (payı yapmayan) $x = a$.\n   - **Yatay:** $\\displaystyle\\lim_{x\\to\\pm\\infty} f(x) = L$ ise $y = L$.\n   - **Eğik:** pay derecesi paydanınkinden **bir fazla** ise bölme yapılır; bölüm eğik asimptottur.\n3. **$f'(x)$:** işaret tablosu → artan/azalan aralıklar, **yerel ekstremumlar**.\n4. **$f''(x)$:** işaret tablosu → **konkavlık** (çukurluk) ve **dönüm noktaları**.\n5. Tablo birleştirilip grafik çizilir.\n\n# İkinci Türevin Yorumu\n\n| $f''(x)$ | Grafik |\n|---|---|\n| $> 0$ | **Yukarı bükey** (konveks, ∪) |\n| $< 0$ | **Aşağı bükey** (konkav, ∩) |\n| İşaret değiştirir | **Dönüm (büküm) noktası** |\n\n- **İkinci türev testi:** $f'(a) = 0$ ve $f''(a) > 0$ → **yerel minimum**; $f''(a) < 0$ → **yerel maksimum**.\n\n# Rasyonel Fonksiyonlarda Yatay Asimptot\n\n$\\dfrac{P(x)}{Q(x)}$: der$P <$ der$Q$ → $y = 0$; dereceler eşit → $y = \\dfrac{\\text{baş katsayı}_P}{\\text{baş katsayı}_Q}$.",
     "ornekler": [
      {
       "soru": "$f(x) = \\dfrac{2x + 3}{x - 1}$ fonksiyonunun asimptotlarını bulunuz.",
       "cozum": "Düşey: $x = 1$; dereceler eşit → yatay: $y = \\frac21 = 2$."
      },
      {
       "soru": "$f(x) = x^3 - 3x^2 + 2$ fonksiyonunun dönüm noktasının apsisi kaçtır?",
       "cozum": "$f'(x) = 3x^2 - 6x$, $f''(x) = 6x - 6 = 0 \\Rightarrow x = 1$; $f''$ burada işaret değiştirir → dönüm noktası $x = 1$."
      }
     ],
     "ozet": [
      "Düşey asimptot: paydanın kökü; yatay: sonsuzdaki limit.",
      "$f''>0$ yukarı bükey, $f''<0$ aşağı bükey.",
      "$f'(a)=0$, $f''(a)>0$ → yerel minimum."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: İntegral",
   "en": "Unit 6: Integrals"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1",
    "title": {
     "tr": "Belirsiz integral ve integral alma yöntemleri",
     "en": "Indefinite integrals and integration techniques"
    },
    "content": {
     "anlatim": "# Tanım\n\n$F'(x) = f(x)$ ise\n$$\\int f(x)\\,dx = F(x) + C$$\nİntegral, **türevin tersi** işlemidir; $C$ **integral sabitidir** (sonsuz sayıda ilkel fonksiyon).\n\n# Temel Formüller\n\n| İntegral | Sonuç |\n|---|---|\n| $\\int x^n\\,dx$ | $\\dfrac{x^{n+1}}{n+1} + C\\ (n \\neq -1)$ |\n| $\\int \\dfrac1x\\,dx$ | $\\ln\\lvert x \\rvert + C$ |\n| $\\int e^x\\,dx$ | $e^x + C$ |\n| $\\int a^x\\,dx$ | $\\dfrac{a^x}{\\ln a} + C$ |\n| $\\int \\sin x\\,dx$ | $-\\cos x + C$ |\n| $\\int \\cos x\\,dx$ | $\\sin x + C$ |\n| $\\int \\dfrac{1}{\\cos^2x}\\,dx$ | $\\tan x + C$ |\n\n**Özellikler:** $\\int[f \\pm g]\\,dx = \\int f\\,dx \\pm \\int g\\,dx$; $\\int k\\,f(x)\\,dx = k\\int f(x)\\,dx$.\n\n# Değişken Değiştirme\n\nİntegrand içinde bir fonksiyon ve onun türevi varsa: $u = g(x)$, $du = g'(x)\\,dx$.\n$$\\int 2x\\,(x^2+1)^3\\,dx \\xrightarrow{u = x^2+1} \\int u^3\\,du = \\frac{(x^2+1)^4}{4} + C$$\n\n# Kısmi İntegrasyon (ileri düzey)\n\n$$\\int u\\,dv = uv - \\int v\\,du$$\n**Örnek:** $\\int x e^x\\,dx = xe^x - e^x + C$.",
     "ornekler": [
      {
       "soru": "$\\int (3x^2 - 4x + 5)\\,dx$ integralini hesaplayınız.",
       "cozum": "$x^3 - 2x^2 + 5x + C$."
      },
      {
       "soru": "$\\int \\cos x \\cdot e^{\\sin x}\\,dx$ integralini bulunuz.",
       "cozum": "$u = \\sin x$, $du = \\cos x\\,dx$: $\\int e^u\\,du = e^{\\sin x} + C$."
      }
     ],
     "ozet": [
      "$\\int f\\,dx=F+C$, $F'=f$.",
      "$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$; $\\int\\frac1x\\,dx=\\ln|x|+C$.",
      "Değişken değiştirme: fonksiyon ve türevi birlikte."
     ]
    }
   },
   {
    "id": "k2",
    "code": "6.2",
    "title": {
     "tr": "Belirli integral, alan ve hacim",
     "en": "Definite integrals, area and volume"
    },
    "content": {
     "anlatim": "# Riemann Toplamı ve Belirli İntegral\n\nEğri altındaki alan, ince dikdörtgenlerin alanları toplamının limiti olarak bulunur. Bu limit **belirli integraldir**.\n\n# Analizin Temel Teoremi (Newton–Leibniz)\n\n$$\\int_a^b f(x)\\,dx = F(b) - F(a) = \\Big[F(x)\\Big]_a^b$$\n\n**Özellikler:**\n- $\\int_a^a f\\,dx = 0$, $\\;\\int_a^b f\\,dx = -\\int_b^a f\\,dx$\n- $\\int_a^b f\\,dx = \\int_a^c f\\,dx + \\int_c^b f\\,dx$\n- $f(x) \\ge 0$ ise $\\int_a^b f\\,dx \\ge 0$.\n\n# Alan Hesabı\n\n- $f(x) \\ge 0$ ise eğri ile $x$ ekseni arasındaki alan $\\int_a^b f(x)\\,dx$.\n- Eğri $x$ ekseninin **altında** ise integral **negatif** çıkar; alan için **mutlak değer** alınır, işaret değiştiren aralıklar ayrı hesaplanır.\n- **İki eğri arasındaki alan:** $$A = \\int_a^b |f(x) - g(x)|\\,dx \\quad (\\text{üstteki} - \\text{alttaki})$$\n\n# Ortalama Değer\n\n$[a, b]$ aralığında $f$'nin ortalama değeri: $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,dx$.\n\n# Dönel Cisim Hacmi\n\n$y = f(x)$ eğrisinin $[a, b]$'de $x$ ekseni etrafında döndürülmesiyle oluşan cismin hacmi (**disk yöntemi**):\n$$V = \\pi\\int_a^b [f(x)]^2\\,dx$$\nİki eğri arasındaki bölge döndürülürse (**pul yöntemi**): $V = \\pi\\int_a^b \\left(R^2 - r^2\\right)dx$.",
     "ornekler": [
      {
       "soru": "$\\int_0^2 (3x^2 + 1)\\,dx$ değerini hesaplayınız.",
       "cozum": "$\\big[x^3 + x\\big]_0^2 = 8 + 2 = 10$."
      },
      {
       "soru": "$y = x^2$ ve $y = 2x$ eğrileri arasında kalan alan nedir?",
       "cozum": "Kesişim: $x^2 = 2x \\Rightarrow x = 0, 2$. $[0,2]$'de $2x \\ge x^2$: $A = \\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 4 - \\frac83 = \\frac43$."
      },
      {
       "soru": "$y = \\sqrt{x}$, $0 \\le x \\le 4$ eğrisinin $x$ ekseni etrafında döndürülmesiyle oluşan cismin hacmi?",
       "cozum": "$V = \\pi\\int_0^4 x\\,dx = \\pi\\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi$."
      }
     ],
     "ozet": [
      "$\\int_a^bf\\,dx=F(b)-F(a)$.",
      "Alan: üstteki − alttaki; eksen altı için mutlak değer.",
      "Dönel hacim $V=\\pi\\int_a^b f^2\\,dx$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "6.3",
    "title": {
     "tr": "Riemann toplamı ve belirli integralin özellikleri",
     "en": "Riemann sums and properties of the definite integral"
    },
    "content": {
     "anlatim": "# Riemann Toplamı\n\n$[a, b]$ aralığı $n$ eşit parçaya bölünür ($\\Delta x = \\dfrac{b-a}{n}$); her parçada bir dikdörtgen çizilir:\n$$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty} \\sum_{k=1}^{n} f(x_k)\\,\\Delta x$$\n- **Alt toplam** (en küçük yükseklikler) $\\le$ integral $\\le$ **üst toplam**.\n- $n$ arttıkça dikdörtgenlerin toplam alanı eğri altındaki alana **yaklaşır**.\n\n# İntegral Hesabının Temel Teoremi\n\n$F' = f$ ise: $\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$\n- $\\dfrac{d}{dx}\\displaystyle\\int_a^{x} f(t)\\,dt = f(x)$ · $\\dfrac{d}{dx}\\displaystyle\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)$\n\n# Özellikler\n\n- $\\int_a^a f = 0$ · $\\int_a^b f = -\\int_b^a f$\n- $\\int_a^b f + \\int_b^c f = \\int_a^c f$ (aralık birleştirme)\n- $\\int_a^b (f \\pm g) = \\int_a^b f \\pm \\int_a^b g$ · $\\int_a^b k\\,f = k\\int_a^b f$\n- **Tek fonksiyon:** $\\int_{-a}^{a} f = 0$ · **Çift fonksiyon:** $\\int_{-a}^{a} f = 2\\int_0^a f$\n- Parçalı ve **mutlak değerli** fonksiyonlarda integral, kırılma noktalarından bölünerek alınır.",
     "ornekler": [
      {
       "soru": "$\\displaystyle\\int_{-2}^{2} (x^3 + 3x^2)\\,dx$ kaçtır?",
       "cozum": "$x^3$ tek → katkısı 0. $3x^2$ çift: $2\\int_0^2 3x^2\\,dx = 2\\cdot[x^3]_0^2 = 16$."
      },
      {
       "soru": "$F(x) = \\displaystyle\\int_1^{x^2} \\sqrt{t}\\,dt$ ise $F'(2)$ kaçtır?",
       "cozum": "$F'(x) = \\sqrt{x^2}\\cdot2x = 2x\\lvert x\\rvert$; $F'(2) = 8$."
      }
     ],
     "ozet": [
      "Riemann toplamının limiti belirli integraldir.",
      "$\\frac{d}{dx}\\int_a^{g(x)} f = f(g(x))g'(x)$.",
      "Tek fonksiyonda $\\int_{-a}^a f = 0$."
     ]
    }
   }
  ]
 },
 {
  "id": "u7",
  "name": {
   "tr": "7. Ünite: Analitik Geometri — Çember",
   "en": "Unit 7: Analytic Geometry — Circle"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "7.1",
    "title": {
     "tr": "Çemberin analitik incelemesi",
     "en": "Analytic study of the circle"
    },
    "content": {
     "anlatim": "# Standart Denklem\n\nMerkezi $M(a, b)$, yarıçapı $r$ olan çember:\n$$(x - a)^2 + (y - b)^2 = r^2$$\nOrijin merkezli: $x^2 + y^2 = r^2$.\n\n# Genel Denklem\n\n$$x^2 + y^2 + Dx + Ey + F = 0$$\n$$M\\left(-\\frac D2,\\ -\\frac E2\\right) \\qquad r = \\frac12\\sqrt{D^2 + E^2 - 4F}$$\n- $D^2 + E^2 - 4F > 0$ → **gerçek çember**, $= 0$ → **nokta çember**, $< 0$ → çember **belirtmez**.\n- $x^2$ ve $y^2$ katsayıları **eşit** olmalı, $xy$ terimi **olmamalı**.\n\n**Özel durumlar:** $x$ eksenine teğet → $r = |b|$; $y$ eksenine teğet → $r = |a|$; iki eksene teğet → $|a| = |b| = r$.\n\n# Nokta ile Çemberin Durumu\n\n$|PM|$ ile $r$ karşılaştırılır: $|PM| < r$ içte, $= r$ üzerinde, $> r$ dışta.\n\n# Doğru ile Çemberin Durumu\n\nMerkezin doğruya uzaklığı $d = \\dfrac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$:\n| Durum | Ölçüt | Kesişim denkleminde $\\Delta$ |\n|---|---|---|\n| İki noktada keser | $d < r$ | $\\Delta > 0$ |\n| **Teğet** | $d = r$ | $\\Delta = 0$ |\n| Kesişmez | $d > r$ | $\\Delta < 0$ |\n\nTeğet, değme noktasındaki yarıçapa **diktir**.\n\n# İki Çemberin Durumu ($d$: merkezler arası uzaklık)\n\n| Durum | Ölçüt |\n|---|---|\n| Ayrık (dışta) | $d > r_1 + r_2$ |\n| Dıştan teğet | $d = r_1 + r_2$ |\n| İki noktada kesişir | $\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$ |\n| İçten teğet | $d = \\lvert r_1 - r_2\\rvert$ |\n| Biri diğerinin içinde | $d < \\lvert r_1 - r_2\\rvert$ |",
     "ornekler": [
      {
       "soru": "$x^2 + y^2 - 6x + 4y - 12 = 0$ çemberinin merkezi ve yarıçapı nedir?",
       "cozum": "$M(3, -2)$; $r = \\frac12\\sqrt{36 + 16 + 48} = \\frac12\\sqrt{100} = 5$."
      },
      {
       "soru": "Merkezi $(1, 2)$ olan ve $3x + 4y + 9 = 0$ doğrusuna teğet olan çemberin denklemi nedir?",
       "cozum": "$r = d = \\frac{|3 + 8 + 9|}{5} = 4$. Denklem: $(x-1)^2 + (y-2)^2 = 16$."
      }
     ],
     "ozet": [
      "$(x-a)^2+(y-b)^2=r^2$.",
      "Genel denklem: $M(-D/2,-E/2)$.",
      "Doğru: d<r keser, d=r teğet; iki çember: d ile r₁±r₂ karşılaştır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "7.2",
    "title": {
     "tr": "Çemberin doğruyla durumu, teğet ve kiriş denklemleri",
     "en": "Circle–line position, tangent and chord equations"
    },
    "content": {
     "anlatim": "# Çember Denklemi (hatırlatma)\n\nMerkez $M(a, b)$, yarıçap $r$: $(x - a)^2 + (y - b)^2 = r^2$\nGenel: $x^2 + y^2 + Dx + Ey + F = 0$ → $M\\left(-\\dfrac D2, -\\dfrac E2\\right)$, $r = \\dfrac12\\sqrt{D^2 + E^2 - 4F}$\n\n# Doğru ile Çemberin Durumu\n\nMerkezin doğruya uzaklığı $d$ olsun:\n| Durum | Koşul | Ortak nokta |\n|---|---|---|\n| **Keser** | $d < r$ | 2 |\n| **Teğet** | $d = r$ | 1 |\n| **Ayrık** | $d > r$ | 0 |\n(Alternatif: denklemler ortak çözülür; elde edilen ikinci derece denklemin $\\Delta$'sına bakılır.)\n\n# Teğet Denklemi\n\n- Çember üzerindeki $T(x_1, y_1)$ noktasındaki teğet, **yarıçapa diktir**: $m_{teğet} = -\\dfrac{1}{m_{MT}}$\n- Merkezi orijinde olan çember için: $x_1 x + y_1 y = r^2$\n\n# İki Çemberin Durumu ($d$: merkezler arası uzaklık)\n\n- $d > r_1 + r_2$: ayrık · $d = r_1 + r_2$: dıştan teğet · $\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$: iki noktada keser · $d = \\lvert r_1 - r_2\\rvert$: içten teğet",
     "ornekler": [
      {
       "soru": "$x^2 + y^2 = 25$ çemberine $(3, 4)$ noktasında çizilen teğetin denklemini bulunuz.",
       "cozum": "$x_1x + y_1y = r^2 \\Rightarrow 3x + 4y = 25$."
      },
      {
       "soru": "Merkezi $(2, -1)$ olan ve $3x - 4y + 5 = 0$ doğrusuna teğet olan çemberin yarıçapı kaçtır?",
       "cozum": "$r = d = \\frac{\\lvert 6 + 4 + 5\\rvert}{5} = 3$."
      }
     ],
     "ozet": [
      "$d < r$ keser, $d = r$ teğet, $d > r$ ayrık.",
      "Teğet, değme noktasındaki yarıçapa diktir.",
      "Orijin merkezli çemberde teğet: $x_1x + y_1y = r^2$."
     ]
    }
   }
  ]
 }
];
