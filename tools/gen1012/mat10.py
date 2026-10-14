# -*- coding: utf-8 -*-
"""10. Sınıf Matematik Konu Anlatım Notları → js/data/content/mat-10.js"""
from _c import O, U, write

units = [
U("t1", "1. Tema: Geometrik Şekiller", "Theme 1: Geometric Shapes", [
O("k1", "1.1", "Dik üçgende trigonometrik oranlar, özdeşlikler ve birim çember",
  "Trigonometric ratios in a right triangle, identities and the unit circle", r"""
# Dik Üçgende Trigonometrik Oranlar

Bir dik üçgende dar açının trigonometrik oranları **kenar uzunluklarının oranlarıyla** tanımlanır. $\alpha$ dar açısı için:

| Oran | Tanım |
|---|---|
| $\sin\alpha$ | $\dfrac{\text{karşı dik kenar}}{\text{hipotenüs}}$ |
| $\cos\alpha$ | $\dfrac{\text{komşu dik kenar}}{\text{hipotenüs}}$ |
| $\tan\alpha$ | $\dfrac{\text{karşı}}{\text{komşu}} = \dfrac{\sin\alpha}{\cos\alpha}$ |
| $\cot\alpha$ | $\dfrac{\text{komşu}}{\text{karşı}} = \dfrac{\cos\alpha}{\sin\alpha}$ |

> Oranlar üçgenin büyüklüğüne değil, yalnızca **açıya** bağlıdır (benzer üçgenlerde oranlar aynıdır).

# Temel Özdeşlikler

$$\sin^2\alpha + \cos^2\alpha = 1 \qquad \tan\alpha \cdot \cot\alpha = 1$$

**Tümler açılar:** $\alpha + \beta = 90^\circ$ ise $\sin\alpha = \cos\beta$ ve $\tan\alpha = \cot\beta$. Yani $\sin\alpha = \cos(90^\circ - \alpha)$.

### Özel açıların değerleri
| | $30^\circ$ | $45^\circ$ | $60^\circ$ |
|---|---|---|---|
| $\sin$ | $\frac{1}{2}$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ |
| $\cos$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac{1}{2}$ |
| $\tan$ | $\frac{\sqrt3}{3}$ | $1$ | $\sqrt3$ |

# Birim Çember ve Yönlü Açılar

- Analitik düzlemde **merkezi orijin $(0,0)$, yarıçapı 1** olan çembere **birim çember** denir.
- **Saat yönünün tersi pozitif**, saat yönü **negatif** yöndür.
- Birim çember üzerindeki $P(x, y)$ noktası, pozitif $x$ ekseniyle $\alpha$ açısı yapıyorsa: $x = \cos\alpha$, $y = \sin\alpha$.
""",
  [("Bir dik üçgende $\\sin\\alpha = \\frac{3}{5}$ ise $\\cos\\alpha$ ve $\\tan\\alpha$ kaçtır?",
    "Karşı dik kenar 3, hipotenüs 5 alınırsa Pisagor'dan komşu dik kenar $\\sqrt{25-9}=4$. Buna göre $\\cos\\alpha=\\frac45$, $\\tan\\alpha=\\frac34$. (Kontrol: $\\frac{9}{25}+\\frac{16}{25}=1$ ✓)"),
   ("$\\sin 20^\\circ = a$ ise $\\cos 70^\\circ$ kaçtır?",
    "$20^\\circ + 70^\\circ = 90^\\circ$ (tümler açılar) olduğu için $\\cos 70^\\circ = \\sin 20^\\circ = a$.")],
  ["$\\sin=$ karşı/hipotenüs, $\\cos=$ komşu/hipotenüs, $\\tan=$ karşı/komşu.",
   "$\\sin^2\\alpha+\\cos^2\\alpha=1$, $\\tan\\alpha\\cdot\\cot\\alpha=1$.",
   "Tümler açılarda $\\sin\\alpha=\\cos(90^\\circ-\\alpha)$.",
   "Birim çember: merkez $(0,0)$, $r=1$; saat yönünün tersi pozitif."]),

O("k2", "1.2", "Üçgende yardımcı elemanlar", "Special segments of a triangle", r"""
# Üçgende Yardımcı Elemanlar

Üçgenin temel yardımcı elemanları **açıortay, kenarortay, kenar orta dikme ve yükseklik**tir.

| Eleman | Kesim noktası | Özellik |
|---|---|---|
| **İç açıortaylar** | İç teğet çemberin merkezi | Kenarlara uzaklığı eşittir ($r$) |
| **Kenarortaylar** | Ağırlık merkezi $G$ | Kenarortayı köşeden itibaren $2k$ ve $k$ olarak böler |
| **Kenar orta dikmeler** | Çevrel çemberin merkezi | Köşelere uzaklığı eşittir ($R$) |
| **Yükseklikler** | Diklik merkezi | — |

### İç açıortay teoremi
$[AD]$, $A$ açısının iç açıortayı ise karşı kenarı **diğer iki kenarın oranında** böler:
$$\frac{|AB|}{|AC|} = \frac{|BD|}{|DC|}$$

### Ağırlık merkezi
Kenarortay uzunluğu $V_a$ ise $|AG| = \frac{2}{3}V_a$, $|GD| = \frac{1}{3}V_a$.

> Dik üçgende hipotenüse ait kenarortay, hipotenüsün yarısına eşittir.
""",
  [("$ABC$ üçgeninde $|AB|=6$, $|AC|=9$, $[AD]$ iç açıortay ve $|BC|=10$ ise $|BD|$ kaçtır?",
    "$\\frac{|BD|}{|DC|}=\\frac{6}{9}=\\frac{2}{3}$. $|BD|=2k$, $|DC|=3k$, $5k=10 \\Rightarrow k=2$. Buna göre $|BD|=4$."),
   ("Bir kenarortayın uzunluğu 12 cm ise ağırlık merkezinin köşeye uzaklığı kaç cm'dir?",
    "Ağırlık merkezi kenarortayı $2:1$ böler: $|AG| = \\frac{2}{3}\\cdot 12 = 8$ cm.")],
  ["İç açıortaylar → iç teğet çember merkezi; orta dikmeler → çevrel çember merkezi.",
   "Kenarortaylar ağırlık merkezinde $2:1$ oranında kesişir.",
   "İç açıortay teoremi: $|AB|/|AC| = |BD|/|DC|$."]),

O("k3", "1.3", "Üçgenin alanı", "Area of a triangle", r"""
# Üçgenin Alanı

### Taban × yükseklik
Bir kenar ile o kenara ait yüksekliğin çarpımının yarısı:
$$A(ABC) = \frac{a \cdot h_a}{2}$$

### Sinüs alan teoremi
İki kenarı ve **aralarındaki açı** bilinen üçgenin alanı:
$$A(ABC) = \frac{1}{2}\, b \cdot c \cdot \sin A$$

### Sonuçlar
- Yükseklikleri eşit üçgenlerin alanları **tabanlarıyla** orantılıdır.
- Kenarortay üçgeni **iki eşit alanlı** üçgene ayırır; üç kenarortay üçgeni **6 eşit alanlı** parçaya böler.
- Eşkenar üçgenin alanı: $A = \dfrac{a^2\sqrt3}{4}$.
""",
  [("İki kenarı 6 cm ve 8 cm, aralarındaki açı $30^\\circ$ olan üçgenin alanı kaç cm²'dir?",
    "$A = \\frac12 \\cdot 6 \\cdot 8 \\cdot \\sin 30^\\circ = 24 \\cdot \\frac12 = 12$ cm²."),
   ("Bir kenarı 4 birim olan eşkenar üçgenin alanı nedir?",
    "$A = \\frac{4^2\\sqrt3}{4} = 4\\sqrt3$ birimkare.")],
  ["$A = \\frac{a\\cdot h_a}{2}$.", "$A = \\frac12 bc\\sin A$ (iki kenar ve arasındaki açı).",
   "Kenarortay alanı ikiye böler.", "Eşkenar üçgen: $\\frac{a^2\\sqrt3}{4}$."]),

O("k4", "1.4", "Sinüs ve kosinüs teoremleri", "The laws of sines and cosines", r"""
# Sinüs Teoremi

Herhangi bir üçgende kenar uzunluklarının karşı açılarının sinüslerine oranı **sabittir** ve **çevrel çemberin çapına** eşittir:
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$

- **Ne zaman?** İki açı + bir kenar ya da iki kenar + birinin karşısındaki açı bilindiğinde.

# Kosinüs Teoremi

Üç kenar ile bir açı arasındaki bağıntı (Pisagor teoreminin genellemesi):
$$a^2 = b^2 + c^2 - 2bc\cos A$$

- **Ne zaman?** İki kenar + aradaki açı bilindiğinde üçüncü kenarı ya da üç kenar bilindiğinde bir açıyı bulmak için.
- $A = 90^\circ$ ise $\cos A = 0$ ve teorem **Pisagor**'a dönüşür.

| Bilinenler | Kullanılacak teorem |
|---|---|
| 2 açı + 1 kenar | Sinüs |
| 2 kenar + aradaki açı | Kosinüs |
| 3 kenar | Kosinüs |
""",
  [("$ABC$ üçgeninde $b=5$, $c=8$, $m(\\hat A)=60^\\circ$ ise $a$ kaçtır?",
    "$a^2 = 25 + 64 - 2\\cdot5\\cdot8\\cdot\\cos60^\\circ = 89 - 40 = 49$, $a = 7$."),
   ("$a = 10$ ve $m(\\hat A) = 30^\\circ$ ise çevrel çemberin yarıçapı kaçtır?",
    "$\\frac{a}{\\sin A} = 2R \\Rightarrow \\frac{10}{1/2} = 20 = 2R$, $R = 10$.")],
  ["Sinüs teoremi: $\\frac{a}{\\sin A}=2R$.", "Kosinüs teoremi: $a^2=b^2+c^2-2bc\\cos A$.",
   "$A=90^\\circ$ iken kosinüs teoremi Pisagor olur."]),
]),
U("t2", "2. Tema: İstatistiksel Araştırma Süreci", "Theme 2: Statistical Investigation", [
O("k1", "2.1", "İki kategorik değişkenli veriler", "Data with two categorical variables", r"""
# İki Kategorik Değişkenli Veriler

**Kategorik değişken:** Değerleri sayı değil, sınıf/grup olan değişken (cinsiyet, okul türü, tercih edilen spor…).

İki kategorik değişken arasındaki ilişkiyi incelemek için:
1. Uygun bir **istatistiksel araştırma sorusu** oluşturulur (ör. "Lise türü ile kitap okuma alışkanlığı arasında bir ilişki var mı?").
2. Veriler **iki yönlü (çapraz) tabloda** özetlenir.
3. **Kümeli sütun grafiği** ile görselleştirilir.
4. **Koşullu göreli sıklıklar** hesaplanarak eğilimler yorumlanır.

### Örnek çapraz tablo
| | Kitap okur | Okumaz | Toplam |
|---|---|---|---|
| Fen lisesi | 30 | 10 | 40 |
| Anadolu lisesi | 36 | 24 | 60 |
| **Toplam** | 66 | 34 | 100 |

**Koşullu göreli sıklık:** Fen lisesi öğrencilerinin okuma oranı $\frac{30}{40} = 0{,}75$; Anadolu lisesi öğrencilerininki $\frac{36}{60} = 0{,}60$.

> Gözlenen ilişki **nedensellik** anlamına gelmez; yalnızca bir **eğilim** gösterir.
""",
  [("Yukarıdaki tabloya göre kitap okuyanların yüzde kaçı Anadolu lisesindendir?",
    "Koşul \"kitap okuyanlar\": $\\frac{36}{66} \\approx 0{,}545$ → yaklaşık %55. Hangi gruba göre oran alındığına (koşula) dikkat edilmeli."),
   ("\"Spor yapan öğrencilerin notları daha yüksek; demek ki spor notları yükseltiyor.\" Bu çıkarım doğru mudur?",
    "Hayır. Veriler yalnızca bir **ilişki/eğilim** gösterir; nedensellik için deneysel çalışma gerekir (başka değişkenler de etkili olabilir).")],
  ["Çapraz tablo + kümeli sütun grafiği.", "Koşullu göreli sıklık = hücre / koşul satırının (sütununun) toplamı.",
   "İlişki ≠ nedensellik."]),
]),
U("t3", "3. Tema: Sayılar", "Theme 3: Numbers", [
O("k1", "3.1", "Asal çarpanlar, pozitif bölen sayısı, EBOB ve EKOK", "Prime factors, number of divisors, GCD and LCM", r"""
# Asal Çarpanlara Ayırma

Her pozitif tam sayı $A = p_1^{a}\cdot p_2^{b}\cdot p_3^{c}\cdots$ biçiminde asal çarpanlarına **tek türlü** ayrılır.

# Pozitif Bölen Sayısı (PBS)

$$\text{PBS}(A) = (a+1)(b+1)(c+1)\cdots$$

- Tam sayı bölen sayısı $= 2 \cdot \text{PBS}$.
- Asal olmayan bölen sayısı $= \text{PBS} - (\text{asal bölen sayısı})$.

# EBOB ve EKOK

- **EBOB:** Ortak asal çarpanların **en küçük** üslüleri çarpılır.
- **EKOK:** Tüm asal çarpanların **en büyük** üslüleri çarpılır.
- İki pozitif tam sayı için:
$$A \cdot B = \text{EBOB}(A,B)\cdot \text{EKOK}(A,B)$$
- **Aralarında asal** sayılar: EBOB = 1, EKOK = $A\cdot B$.

### Problem tipleri
| İpucu | Kullan |
|---|---|
| "En büyük parçalara ayırma, eşit kutulara bölme" | EBOB |
| "Tekrar aynı anda, en az kaç gün sonra" | EKOK |
""",
  [("$360$ sayısının pozitif bölen sayısı kaçtır?",
    "$360 = 2^3 \\cdot 3^2 \\cdot 5$ → PBS $= (3+1)(2+1)(1+1) = 24$."),
   ("İki sayının EBOB'u 6, EKOK'u 72'dir. Sayılardan biri 24 ise diğeri kaçtır?",
    "$A\\cdot B = 6 \\cdot 72 = 432$ → $B = 432 / 24 = 18$."),
   ("Bir zil 12 dakikada, diğeri 18 dakikada bir çalıyor. Birlikte çaldıktan en az kaç dakika sonra yine birlikte çalarlar?",
    "EKOK$(12, 18) = 36$ dakika.")],
  ["PBS $= (a+1)(b+1)\\cdots$", "$A\\cdot B = \\text{EBOB}\\cdot\\text{EKOK}$", "Bölme/parçalama → EBOB; yeniden buluşma → EKOK."]),

O("k2", "3.2", "Bölünebilme kuralları", "Divisibility rules", r"""
# Bölünebilme Kuralları

Bölünebilme kuralları **basamak çözümlemesine** ve **kalan aritmetiğine** dayanır. $abcd = 1000a + 100b + 10c + d$.

| Bölen | Kural | Kalan nasıl bulunur? |
|---|---|---|
| **2** | Son basamak çift | Son basamağın 2'ye bölümünden kalan |
| **3** | Rakamlar toplamı 3'ün katı | Rakamlar toplamının 3'e bölümünden kalan |
| **4** | Son iki basamak 4'ün katı | Son iki basamağın 4'e bölümünden kalan |
| **5** | Son basamak 0 ya da 5 | Son basamağın 5'e bölümünden kalan |
| **8** | Son üç basamak 8'in katı | Son üç basamağın 8'e bölümünden kalan |
| **9** | Rakamlar toplamı 9'un katı | Rakamlar toplamının 9'a bölümünden kalan |
| **10** | Son basamak 0 | Son basamak |
| **11** | Sağdan başlayarak $+ - + -$ işaretli toplam 11'in katı | Bu toplamın 11'e bölümünden kalan |

### Neden işe yarar?
$10 \equiv 1 \pmod 9$ olduğundan $10^n \equiv 1$; bu yüzden sayı, rakamlar toplamıyla aynı kalanı verir (3 için de aynı).

### Birleşik bölünebilme
Aralarında asal sayıların çarpımına bölünebilme: **6** → 2 ve 3; **12** → 3 ve 4; **15** → 3 ve 5; **36** → 4 ve 9.
""",
  [("$5a72$ dört basamaklı sayısı 9 ile tam bölünebiliyorsa $a$ kaçtır?",
    "Rakamlar toplamı $5+a+7+2 = 14+a$ 9'un katı olmalı → $a = 4$."),
   ("$7348$ sayısının 8 ile bölümünden kalan kaçtır?",
    "Son üç basamak $348 = 8\\cdot43 + 4$ → kalan **4**.")],
  ["3 ve 9: rakamlar toplamı; 4: son iki basamak; 8: son üç basamak.",
   "11: sağdan $+,-,+,-$ ile toplam.", "Aralarında asal çarpanlara ayrı ayrı bölünebilmeye bak."]),
]),
U("t4", "4. Tema: Nicelikler ve Değişimler", "Theme 4: Quantities and Change", [
O("k1", "4.1", "Karesel fonksiyon ve parabol", "The quadratic function and the parabola", r"""
# Karesel (İkinci Dereceden) Fonksiyon

$$f(x) = ax^2 + bx + c \qquad (a \neq 0)$$

Grafiği bir **parabol**dür. Referans fonksiyon: $f(x) = x^2$.

### Nitel özellikler
| Özellik | Bilgi |
|---|---|
| **Kollar** | $a > 0$ yukarı (en küçük değer), $a < 0$ aşağı (en büyük değer) |
| **Tepe noktası** $T(r, k)$ | $r = -\dfrac{b}{2a}$, $k = f(r)$ |
| **Simetri ekseni** | $x = r$ doğrusu |
| **$y$ eksenini kestiği nokta** | $(0, c)$ |
| **$x$ eksenini kestiği noktalar** | $ax^2+bx+c=0$ denkleminin kökleri; $\Delta = b^2 - 4ac$ |

- $\Delta > 0$: iki noktada keser · $\Delta = 0$: teğet · $\Delta < 0$: kesmez.

### Dönüşümler
$f(x) = a(x - r)^2 + k$ biçimi, $y = x^2$ grafiğinin $r$ birim sağa, $k$ birim yukarı ötelenmesi ve $a$ ile genişletilip/daraltılmasıdır.
""",
  [("$f(x) = x^2 - 6x + 5$ parabolünün tepe noktası nedir?",
    "$r = -\\frac{-6}{2} = 3$, $k = f(3) = 9 - 18 + 5 = -4$ → $T(3, -4)$. Kollar yukarı; en küçük değer $-4$."),
   ("$f(x) = -2x^2 + 4x + 1$ fonksiyonunun en büyük değeri kaçtır?",
    "$r = -\\frac{4}{2\\cdot(-2)} = 1$, $f(1) = -2 + 4 + 1 = 3$.")],
  ["Tepe: $r=-\\frac{b}{2a}$.", "$a>0$ kollar yukarı, $a<0$ aşağı.", "$\\Delta=b^2-4ac$ ile $x$ eksenini kesme durumu."]),

O("k2", "4.2", "Karekök ve rasyonel referans fonksiyonlar", "Square-root and reciprocal reference functions", r"""
# Referans Fonksiyonlar

| Fonksiyon | Tanım kümesi | Görüntü kümesi | Grafik |
|---|---|---|---|
| **Karekök** $f(x) = \sqrt{x}$ | $x \ge 0$ | $y \ge 0$ | Orijinden başlayıp artarak yavaşlayan eğri |
| **Rasyonel** $f(x) = \dfrac{1}{x}$ | $x \neq 0$ | $y \neq 0$ | I. ve III. bölgede iki kol (hiperbol) |

### Karekök fonksiyonu
- $(0,0)$, $(1,1)$, $(4,2)$, $(9,3)$ noktalarından geçer.
- Tanım kümesinde **artandır**; $y = x^2$'nin ($x\ge0$) tersidir.
- $f(x) = \sqrt{x - h} + k$: grafik $h$ sağa, $k$ yukarı ötelenir; tanım kümesi $x \ge h$.

### $f(x) = \frac{1}{x}$
- $x = 0$ **düşey asimptot**, $y = 0$ **yatay asimptot**tur.
- $x$ büyüdükçe $f(x)$ sıfıra yaklaşır ama sıfır olmaz.
- Her iki aralıkta da ($x<0$ ve $x>0$) **azalandır**.
- $f(x) = \frac{1}{x-h} + k$: asimptotlar $x = h$ ve $y = k$ olur.
""",
  [("$f(x) = \\sqrt{x - 2} + 1$ fonksiyonunun tanım ve görüntü kümesi nedir?",
    "$x - 2 \\ge 0 \\Rightarrow x \\ge 2$; $\\sqrt{\\;} \\ge 0$ olduğundan $f(x) \\ge 1$."),
   ("$f(x) = \\frac{1}{x+3} - 2$ grafiğinin asimptotları nelerdir?",
    "Düşey asimptot $x = -3$, yatay asimptot $y = -2$.")],
  ["$\\sqrt x$: $x\\ge0$, artan.", "$\\frac1x$: $x\\neq0$, asimptotlar $x=0$ ve $y=0$.",
   "Öteleme: $(x-h)$ sağa $h$, $+k$ yukarı $k$."]),
]),
]

write("mat-10.js", "10/matematik", "10. Sınıf Matematik — konu anlatım notları",
      "kullanıcının verdiği \"10. Sınıf Matematik Ders Kitabı – Ayrıntılı Konu Anlatım Notları\" (4 tema).",
      units, "Kaynak not kısa olduğu için anlatımlar ders kitabı kapsamında genişletildi; örnek sorular eklendi.")
