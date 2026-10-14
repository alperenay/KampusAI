/* =========================================================
   10. Sınıf Matematik — konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Matematik Ders Kitabı – Ayrıntılı Konu Anlatım Notları" (4 tema).
   Kaynak not kısa olduğu için anlatımlar ders kitabı kapsamında genişletildi; örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/matematik"] = [
 {
  "id": "t1",
  "name": {
   "tr": "1. Tema: Geometrik Şekiller",
   "en": "Theme 1: Geometric Shapes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Dik üçgende trigonometrik oranlar, özdeşlikler ve birim çember",
     "en": "Trigonometric ratios in a right triangle, identities and the unit circle"
    },
    "content": {
     "anlatim": "# Dik Üçgende Trigonometrik Oranlar\n\nBir dik üçgende dar açının trigonometrik oranları **kenar uzunluklarının oranlarıyla** tanımlanır. $\\alpha$ dar açısı için:\n\n| Oran | Tanım |\n|---|---|\n| $\\sin\\alpha$ | $\\dfrac{\\text{karşı dik kenar}}{\\text{hipotenüs}}$ |\n| $\\cos\\alpha$ | $\\dfrac{\\text{komşu dik kenar}}{\\text{hipotenüs}}$ |\n| $\\tan\\alpha$ | $\\dfrac{\\text{karşı}}{\\text{komşu}} = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$ |\n| $\\cot\\alpha$ | $\\dfrac{\\text{komşu}}{\\text{karşı}} = \\dfrac{\\cos\\alpha}{\\sin\\alpha}$ |\n\n> Oranlar üçgenin büyüklüğüne değil, yalnızca **açıya** bağlıdır (benzer üçgenlerde oranlar aynıdır).\n\n# Temel Özdeşlikler\n\n$$\\sin^2\\alpha + \\cos^2\\alpha = 1 \\qquad \\tan\\alpha \\cdot \\cot\\alpha = 1$$\n\n**Tümler açılar:** $\\alpha + \\beta = 90^\\circ$ ise $\\sin\\alpha = \\cos\\beta$ ve $\\tan\\alpha = \\cot\\beta$. Yani $\\sin\\alpha = \\cos(90^\\circ - \\alpha)$.\n\n### Özel açıların değerleri\n\n| | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ |\n|---|---|---|---|\n| $\\sin$ | $\\frac{1}{2}$ | $\\frac{\\sqrt2}{2}$ | $\\frac{\\sqrt3}{2}$ |\n| $\\cos$ | $\\frac{\\sqrt3}{2}$ | $\\frac{\\sqrt2}{2}$ | $\\frac{1}{2}$ |\n| $\\tan$ | $\\frac{\\sqrt3}{3}$ | $1$ | $\\sqrt3$ |\n\n# Birim Çember ve Yönlü Açılar\n\n- Analitik düzlemde **merkezi orijin $(0,0)$, yarıçapı 1** olan çembere **birim çember** denir.\n- **Saat yönünün tersi pozitif**, saat yönü **negatif** yöndür.\n- Birim çember üzerindeki $P(x, y)$ noktası, pozitif $x$ ekseniyle $\\alpha$ açısı yapıyorsa: $x = \\cos\\alpha$, $y = \\sin\\alpha$.",
     "ornekler": [
      {
       "soru": "Bir dik üçgende $\\sin\\alpha = \\frac{3}{5}$ ise $\\cos\\alpha$ ve $\\tan\\alpha$ kaçtır?",
       "cozum": "Karşı dik kenar 3, hipotenüs 5 alınırsa Pisagor'dan komşu dik kenar $\\sqrt{25-9}=4$. Buna göre $\\cos\\alpha=\\frac45$, $\\tan\\alpha=\\frac34$. (Kontrol: $\\frac{9}{25}+\\frac{16}{25}=1$ ✓)"
      },
      {
       "soru": "$\\sin 20^\\circ = a$ ise $\\cos 70^\\circ$ kaçtır?",
       "cozum": "$20^\\circ + 70^\\circ = 90^\\circ$ (tümler açılar) olduğu için $\\cos 70^\\circ = \\sin 20^\\circ = a$."
      }
     ],
     "ozet": [
      "$\\sin=$ karşı/hipotenüs, $\\cos=$ komşu/hipotenüs, $\\tan=$ karşı/komşu.",
      "$\\sin^2\\alpha+\\cos^2\\alpha=1$, $\\tan\\alpha\\cdot\\cot\\alpha=1$.",
      "Tümler açılarda $\\sin\\alpha=\\cos(90^\\circ-\\alpha)$.",
      "Birim çember: merkez $(0,0)$, $r=1$; saat yönünün tersi pozitif."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Üçgende yardımcı elemanlar",
     "en": "Special segments of a triangle"
    },
    "content": {
     "anlatim": "# Üçgende Yardımcı Elemanlar\n\nÜçgenin temel yardımcı elemanları **açıortay, kenarortay, kenar orta dikme ve yükseklik**tir.\n\n| Eleman | Kesim noktası | Özellik |\n|---|---|---|\n| **İç açıortaylar** | İç teğet çemberin merkezi | Kenarlara uzaklığı eşittir ($r$) |\n| **Kenarortaylar** | Ağırlık merkezi $G$ | Kenarortayı köşeden itibaren $2k$ ve $k$ olarak böler |\n| **Kenar orta dikmeler** | Çevrel çemberin merkezi | Köşelere uzaklığı eşittir ($R$) |\n| **Yükseklikler** | Diklik merkezi | — |\n\n### İç açıortay teoremi\n\n$[AD]$, $A$ açısının iç açıortayı ise karşı kenarı **diğer iki kenarın oranında** böler:\n$$\\frac{|AB|}{|AC|} = \\frac{|BD|}{|DC|}$$\n\n### Ağırlık merkezi\n\nKenarortay uzunluğu $V_a$ ise $|AG| = \\frac{2}{3}V_a$, $|GD| = \\frac{1}{3}V_a$.\n\n> Dik üçgende hipotenüse ait kenarortay, hipotenüsün yarısına eşittir.",
     "ornekler": [
      {
       "soru": "$ABC$ üçgeninde $|AB|=6$, $|AC|=9$, $[AD]$ iç açıortay ve $|BC|=10$ ise $|BD|$ kaçtır?",
       "cozum": "$\\frac{|BD|}{|DC|}=\\frac{6}{9}=\\frac{2}{3}$. $|BD|=2k$, $|DC|=3k$, $5k=10 \\Rightarrow k=2$. Buna göre $|BD|=4$."
      },
      {
       "soru": "Bir kenarortayın uzunluğu 12 cm ise ağırlık merkezinin köşeye uzaklığı kaç cm'dir?",
       "cozum": "Ağırlık merkezi kenarortayı $2:1$ böler: $|AG| = \\frac{2}{3}\\cdot 12 = 8$ cm."
      }
     ],
     "ozet": [
      "İç açıortaylar → iç teğet çember merkezi; orta dikmeler → çevrel çember merkezi.",
      "Kenarortaylar ağırlık merkezinde $2:1$ oranında kesişir.",
      "İç açıortay teoremi: $|AB|/|AC| = |BD|/|DC|$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Üçgenin alanı",
     "en": "Area of a triangle"
    },
    "content": {
     "anlatim": "# Üçgenin Alanı\n\n### Taban × yükseklik\n\nBir kenar ile o kenara ait yüksekliğin çarpımının yarısı:\n$$A(ABC) = \\frac{a \\cdot h_a}{2}$$\n\n### Sinüs alan teoremi\n\nİki kenarı ve **aralarındaki açı** bilinen üçgenin alanı:\n$$A(ABC) = \\frac{1}{2}\\, b \\cdot c \\cdot \\sin A$$\n\n### Sonuçlar\n\n- Yükseklikleri eşit üçgenlerin alanları **tabanlarıyla** orantılıdır.\n- Kenarortay üçgeni **iki eşit alanlı** üçgene ayırır; üç kenarortay üçgeni **6 eşit alanlı** parçaya böler.\n- Eşkenar üçgenin alanı: $A = \\dfrac{a^2\\sqrt3}{4}$.",
     "ornekler": [
      {
       "soru": "İki kenarı 6 cm ve 8 cm, aralarındaki açı $30^\\circ$ olan üçgenin alanı kaç cm²'dir?",
       "cozum": "$A = \\frac12 \\cdot 6 \\cdot 8 \\cdot \\sin 30^\\circ = 24 \\cdot \\frac12 = 12$ cm²."
      },
      {
       "soru": "Bir kenarı 4 birim olan eşkenar üçgenin alanı nedir?",
       "cozum": "$A = \\frac{4^2\\sqrt3}{4} = 4\\sqrt3$ birimkare."
      }
     ],
     "ozet": [
      "$A = \\frac{a\\cdot h_a}{2}$.",
      "$A = \\frac12 bc\\sin A$ (iki kenar ve arasındaki açı).",
      "Kenarortay alanı ikiye böler.",
      "Eşkenar üçgen: $\\frac{a^2\\sqrt3}{4}$."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Sinüs ve kosinüs teoremleri",
     "en": "The laws of sines and cosines"
    },
    "content": {
     "anlatim": "# Sinüs Teoremi\n\nHerhangi bir üçgende kenar uzunluklarının karşı açılarının sinüslerine oranı **sabittir** ve **çevrel çemberin çapına** eşittir:\n$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$\n\n- **Ne zaman?** İki açı + bir kenar ya da iki kenar + birinin karşısındaki açı bilindiğinde.\n\n# Kosinüs Teoremi\n\nÜç kenar ile bir açı arasındaki bağıntı (Pisagor teoreminin genellemesi):\n$$a^2 = b^2 + c^2 - 2bc\\cos A$$\n\n- **Ne zaman?** İki kenar + aradaki açı bilindiğinde üçüncü kenarı ya da üç kenar bilindiğinde bir açıyı bulmak için.\n- $A = 90^\\circ$ ise $\\cos A = 0$ ve teorem **Pisagor**'a dönüşür.\n\n| Bilinenler | Kullanılacak teorem |\n|---|---|\n| 2 açı + 1 kenar | Sinüs |\n| 2 kenar + aradaki açı | Kosinüs |\n| 3 kenar | Kosinüs |",
     "ornekler": [
      {
       "soru": "$ABC$ üçgeninde $b=5$, $c=8$, $m(\\hat A)=60^\\circ$ ise $a$ kaçtır?",
       "cozum": "$a^2 = 25 + 64 - 2\\cdot5\\cdot8\\cdot\\cos60^\\circ = 89 - 40 = 49$, $a = 7$."
      },
      {
       "soru": "$a = 10$ ve $m(\\hat A) = 30^\\circ$ ise çevrel çemberin yarıçapı kaçtır?",
       "cozum": "$\\frac{a}{\\sin A} = 2R \\Rightarrow \\frac{10}{1/2} = 20 = 2R$, $R = 10$."
      }
     ],
     "ozet": [
      "Sinüs teoremi: $\\frac{a}{\\sin A}=2R$.",
      "Kosinüs teoremi: $a^2=b^2+c^2-2bc\\cos A$.",
      "$A=90^\\circ$ iken kosinüs teoremi Pisagor olur."
     ]
    }
   }
  ]
 },
 {
  "id": "t2",
  "name": {
   "tr": "2. Tema: İstatistiksel Araştırma Süreci",
   "en": "Theme 2: Statistical Investigation"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "İki kategorik değişkenli veriler",
     "en": "Data with two categorical variables"
    },
    "content": {
     "anlatim": "# İki Kategorik Değişkenli Veriler\n\n**Kategorik değişken:** Değerleri sayı değil, sınıf/grup olan değişken (cinsiyet, okul türü, tercih edilen spor…).\n\nİki kategorik değişken arasındaki ilişkiyi incelemek için:\n1. Uygun bir **istatistiksel araştırma sorusu** oluşturulur (ör. \"Lise türü ile kitap okuma alışkanlığı arasında bir ilişki var mı?\").\n2. Veriler **iki yönlü (çapraz) tabloda** özetlenir.\n3. **Kümeli sütun grafiği** ile görselleştirilir.\n4. **Koşullu göreli sıklıklar** hesaplanarak eğilimler yorumlanır.\n\n### Örnek çapraz tablo\n\n| | Kitap okur | Okumaz | Toplam |\n|---|---|---|---|\n| Fen lisesi | 30 | 10 | 40 |\n| Anadolu lisesi | 36 | 24 | 60 |\n| **Toplam** | 66 | 34 | 100 |\n\n**Koşullu göreli sıklık:** Fen lisesi öğrencilerinin okuma oranı $\\frac{30}{40} = 0{,}75$; Anadolu lisesi öğrencilerininki $\\frac{36}{60} = 0{,}60$.\n\n> Gözlenen ilişki **nedensellik** anlamına gelmez; yalnızca bir **eğilim** gösterir.",
     "ornekler": [
      {
       "soru": "Yukarıdaki tabloya göre kitap okuyanların yüzde kaçı Anadolu lisesindendir?",
       "cozum": "Koşul \"kitap okuyanlar\": $\\frac{36}{66} \\approx 0{,}545$ → yaklaşık %55. Hangi gruba göre oran alındığına (koşula) dikkat edilmeli."
      },
      {
       "soru": "\"Spor yapan öğrencilerin notları daha yüksek; demek ki spor notları yükseltiyor.\" Bu çıkarım doğru mudur?",
       "cozum": "Hayır. Veriler yalnızca bir **ilişki/eğilim** gösterir; nedensellik için deneysel çalışma gerekir (başka değişkenler de etkili olabilir)."
      }
     ],
     "ozet": [
      "Çapraz tablo + kümeli sütun grafiği.",
      "Koşullu göreli sıklık = hücre / koşul satırının (sütununun) toplamı.",
      "İlişki ≠ nedensellik."
     ]
    }
   }
  ]
 },
 {
  "id": "t3",
  "name": {
   "tr": "3. Tema: Sayılar",
   "en": "Theme 3: Numbers"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Asal çarpanlar, pozitif bölen sayısı, EBOB ve EKOK",
     "en": "Prime factors, number of divisors, GCD and LCM"
    },
    "content": {
     "anlatim": "# Asal Çarpanlara Ayırma\n\nHer pozitif tam sayı $A = p_1^{a}\\cdot p_2^{b}\\cdot p_3^{c}\\cdots$ biçiminde asal çarpanlarına **tek türlü** ayrılır.\n\n# Pozitif Bölen Sayısı (PBS)\n\n$$\\text{PBS}(A) = (a+1)(b+1)(c+1)\\cdots$$\n\n- Tam sayı bölen sayısı $= 2 \\cdot \\text{PBS}$.\n- Asal olmayan bölen sayısı $= \\text{PBS} - (\\text{asal bölen sayısı})$.\n\n# EBOB ve EKOK\n\n- **EBOB:** Ortak asal çarpanların **en küçük** üslüleri çarpılır.\n- **EKOK:** Tüm asal çarpanların **en büyük** üslüleri çarpılır.\n- İki pozitif tam sayı için:\n$$A \\cdot B = \\text{EBOB}(A,B)\\cdot \\text{EKOK}(A,B)$$\n- **Aralarında asal** sayılar: EBOB = 1, EKOK = $A\\cdot B$.\n\n### Problem tipleri\n\n| İpucu | Kullan |\n|---|---|\n| \"En büyük parçalara ayırma, eşit kutulara bölme\" | EBOB |\n| \"Tekrar aynı anda, en az kaç gün sonra\" | EKOK |",
     "ornekler": [
      {
       "soru": "$360$ sayısının pozitif bölen sayısı kaçtır?",
       "cozum": "$360 = 2^3 \\cdot 3^2 \\cdot 5$ → PBS $= (3+1)(2+1)(1+1) = 24$."
      },
      {
       "soru": "İki sayının EBOB'u 6, EKOK'u 72'dir. Sayılardan biri 24 ise diğeri kaçtır?",
       "cozum": "$A\\cdot B = 6 \\cdot 72 = 432$ → $B = 432 / 24 = 18$."
      },
      {
       "soru": "Bir zil 12 dakikada, diğeri 18 dakikada bir çalıyor. Birlikte çaldıktan en az kaç dakika sonra yine birlikte çalarlar?",
       "cozum": "EKOK$(12, 18) = 36$ dakika."
      }
     ],
     "ozet": [
      "PBS $= (a+1)(b+1)\\cdots$",
      "$A\\cdot B = \\text{EBOB}\\cdot\\text{EKOK}$",
      "Bölme/parçalama → EBOB; yeniden buluşma → EKOK."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Bölünebilme kuralları",
     "en": "Divisibility rules"
    },
    "content": {
     "anlatim": "# Bölünebilme Kuralları\n\nBölünebilme kuralları **basamak çözümlemesine** ve **kalan aritmetiğine** dayanır. $abcd = 1000a + 100b + 10c + d$.\n\n| Bölen | Kural | Kalan nasıl bulunur? |\n|---|---|---|\n| **2** | Son basamak çift | Son basamağın 2'ye bölümünden kalan |\n| **3** | Rakamlar toplamı 3'ün katı | Rakamlar toplamının 3'e bölümünden kalan |\n| **4** | Son iki basamak 4'ün katı | Son iki basamağın 4'e bölümünden kalan |\n| **5** | Son basamak 0 ya da 5 | Son basamağın 5'e bölümünden kalan |\n| **8** | Son üç basamak 8'in katı | Son üç basamağın 8'e bölümünden kalan |\n| **9** | Rakamlar toplamı 9'un katı | Rakamlar toplamının 9'a bölümünden kalan |\n| **10** | Son basamak 0 | Son basamak |\n| **11** | Sağdan başlayarak $+ - + -$ işaretli toplam 11'in katı | Bu toplamın 11'e bölümünden kalan |\n\n### Neden işe yarar?\n\n$10 \\equiv 1 \\pmod 9$ olduğundan $10^n \\equiv 1$; bu yüzden sayı, rakamlar toplamıyla aynı kalanı verir (3 için de aynı).\n\n### Birleşik bölünebilme\n\nAralarında asal sayıların çarpımına bölünebilme: **6** → 2 ve 3; **12** → 3 ve 4; **15** → 3 ve 5; **36** → 4 ve 9.",
     "ornekler": [
      {
       "soru": "$5a72$ dört basamaklı sayısı 9 ile tam bölünebiliyorsa $a$ kaçtır?",
       "cozum": "Rakamlar toplamı $5+a+7+2 = 14+a$ 9'un katı olmalı → $a = 4$."
      },
      {
       "soru": "$7348$ sayısının 8 ile bölümünden kalan kaçtır?",
       "cozum": "Son üç basamak $348 = 8\\cdot43 + 4$ → kalan **4**."
      }
     ],
     "ozet": [
      "3 ve 9: rakamlar toplamı; 4: son iki basamak; 8: son üç basamak.",
      "11: sağdan $+,-,+,-$ ile toplam.",
      "Aralarında asal çarpanlara ayrı ayrı bölünebilmeye bak."
     ]
    }
   }
  ]
 },
 {
  "id": "t4",
  "name": {
   "tr": "4. Tema: Nicelikler ve Değişimler",
   "en": "Theme 4: Quantities and Change"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Karesel fonksiyon ve parabol",
     "en": "The quadratic function and the parabola"
    },
    "content": {
     "anlatim": "# Karesel (İkinci Dereceden) Fonksiyon\n\n$$f(x) = ax^2 + bx + c \\qquad (a \\neq 0)$$\n\nGrafiği bir **parabol**dür. Referans fonksiyon: $f(x) = x^2$.\n\n### Nitel özellikler\n\n| Özellik | Bilgi |\n|---|---|\n| **Kollar** | $a > 0$ yukarı (en küçük değer), $a < 0$ aşağı (en büyük değer) |\n| **Tepe noktası** $T(r, k)$ | $r = -\\dfrac{b}{2a}$, $k = f(r)$ |\n| **Simetri ekseni** | $x = r$ doğrusu |\n| **$y$ eksenini kestiği nokta** | $(0, c)$ |\n| **$x$ eksenini kestiği noktalar** | $ax^2+bx+c=0$ denkleminin kökleri; $\\Delta = b^2 - 4ac$ |\n\n- $\\Delta > 0$: iki noktada keser · $\\Delta = 0$: teğet · $\\Delta < 0$: kesmez.\n\n### Dönüşümler\n\n$f(x) = a(x - r)^2 + k$ biçimi, $y = x^2$ grafiğinin $r$ birim sağa, $k$ birim yukarı ötelenmesi ve $a$ ile genişletilip/daraltılmasıdır.",
     "ornekler": [
      {
       "soru": "$f(x) = x^2 - 6x + 5$ parabolünün tepe noktası nedir?",
       "cozum": "$r = -\\frac{-6}{2} = 3$, $k = f(3) = 9 - 18 + 5 = -4$ → $T(3, -4)$. Kollar yukarı; en küçük değer $-4$."
      },
      {
       "soru": "$f(x) = -2x^2 + 4x + 1$ fonksiyonunun en büyük değeri kaçtır?",
       "cozum": "$r = -\\frac{4}{2\\cdot(-2)} = 1$, $f(1) = -2 + 4 + 1 = 3$."
      }
     ],
     "ozet": [
      "Tepe: $r=-\\frac{b}{2a}$.",
      "$a>0$ kollar yukarı, $a<0$ aşağı.",
      "$\\Delta=b^2-4ac$ ile $x$ eksenini kesme durumu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Karekök ve rasyonel referans fonksiyonlar",
     "en": "Square-root and reciprocal reference functions"
    },
    "content": {
     "anlatim": "# Referans Fonksiyonlar\n\n| Fonksiyon | Tanım kümesi | Görüntü kümesi | Grafik |\n|---|---|---|---|\n| **Karekök** $f(x) = \\sqrt{x}$ | $x \\ge 0$ | $y \\ge 0$ | Orijinden başlayıp artarak yavaşlayan eğri |\n| **Rasyonel** $f(x) = \\dfrac{1}{x}$ | $x \\neq 0$ | $y \\neq 0$ | I. ve III. bölgede iki kol (hiperbol) |\n\n### Karekök fonksiyonu\n\n- $(0,0)$, $(1,1)$, $(4,2)$, $(9,3)$ noktalarından geçer.\n- Tanım kümesinde **artandır**; $y = x^2$'nin ($x\\ge0$) tersidir.\n- $f(x) = \\sqrt{x - h} + k$: grafik $h$ sağa, $k$ yukarı ötelenir; tanım kümesi $x \\ge h$.\n\n### $f(x) = \\frac{1}{x}$\n\n- $x = 0$ **düşey asimptot**, $y = 0$ **yatay asimptot**tur.\n- $x$ büyüdükçe $f(x)$ sıfıra yaklaşır ama sıfır olmaz.\n- Her iki aralıkta da ($x<0$ ve $x>0$) **azalandır**.\n- $f(x) = \\frac{1}{x-h} + k$: asimptotlar $x = h$ ve $y = k$ olur.",
     "ornekler": [
      {
       "soru": "$f(x) = \\sqrt{x - 2} + 1$ fonksiyonunun tanım ve görüntü kümesi nedir?",
       "cozum": "$x - 2 \\ge 0 \\Rightarrow x \\ge 2$; $\\sqrt{\\;} \\ge 0$ olduğundan $f(x) \\ge 1$."
      },
      {
       "soru": "$f(x) = \\frac{1}{x+3} - 2$ grafiğinin asimptotları nelerdir?",
       "cozum": "Düşey asimptot $x = -3$, yatay asimptot $y = -2$."
      }
     ],
     "ozet": [
      "$\\sqrt x$: $x\\ge0$, artan.",
      "$\\frac1x$: $x\\neq0$, asimptotlar $x=0$ ve $y=0$.",
      "Öteleme: $(x-h)$ sağa $h$, $+k$ yukarı $k$."
     ]
    }
   }
  ]
 }
];
