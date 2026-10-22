# -*- coding: utf-8 -*-
"""12. Sınıf Matematik detaylı notlar → js/data/content/mat-12.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Üstel ve Logaritmik Fonksiyonlar", "Unit 1: Exponential and Logarithmic Functions", [
O("k1", "1.1", "Üstel fonksiyon", "Exponential function", r"""
# Tanım
$a > 0$, $a \neq 1$ olmak üzere
$$f: \mathbb{R} \to (0, \infty), \quad f(x) = a^x$$
fonksiyonuna **üstel fonksiyon** denir ($a$: taban).

# Özellikler
- Tanım kümesi $\mathbb{R}$, görüntü kümesi $(0, \infty)$ → değerleri **her zaman pozitif**.
- $f(0) = 1$ → grafik daima $(0, 1)$ noktasından geçer (**y eksenini kesen nokta**); **x eksenini hiç kesmez**.
- $a > 1$ ise **artan**, $0 < a < 1$ ise **azalan**.
- $x$ ekseni ($y = 0$) **yatay asimptottur**.
- $a^{x_1 + x_2} = a^{x_1}\cdot a^{x_2}$, $\;a^{x_1 - x_2} = \dfrac{a^{x_1}}{a^{x_2}}$, $\;(a^x)^n = a^{nx}$.
- **Bire bir ve örten** (görüntü kümesine) → tersi vardır: **logaritma**.
- $y = a^x$ ile $y = \left(\frac1a\right)^x$ grafikleri **y eksenine göre simetriktir**.

# Doğal Üstel Fonksiyon
$e \approx 2{,}71828$ olmak üzere $f(x) = e^x$. $e = \lim\limits_{n\to\infty}\left(1 + \dfrac1n\right)^n$.

# Modelleme
$$A(t) = A_0\,a^t \quad \text{ya da} \quad A(t) = A_0\,e^{kt}$$
- **Büyüme** ($a > 1$, $k > 0$): bakteri çoğalması, nüfus, **bileşik faiz** $A = P\left(1 + \dfrac{r}{n}\right)^{nt}$.
- **Azalma** ($0 < a < 1$, $k < 0$): radyoaktif bozunma, ilacın kandan atılması, Newton'un soğuma yasası.
""",
  [(r"$f(x) = 2^x$ için $f(3)$, $f(-2)$ ve $f\left(\frac12\right)$ değerlerini bulunuz.", r"$f(3) = 8$, $f(-2) = \frac14$, $f\left(\frac12\right) = \sqrt2$."),
   (r"Her saatte iki katına çıkan 500 bakterilik bir koloni 5 saat sonra kaç bakteri olur?", r"$A(t) = 500 \cdot 2^t \Rightarrow A(5) = 500 \cdot 32 = 16\,000$.")],
  [r"$f(x)=a^x$: değerler pozitif, $(0,1)$'den geçer.", r"$a>1$ artan, $0<a<1$ azalan; $y=0$ asimptot.", r"Büyüme–azalma modelleri $A_0a^t$."]),
O("k2", "1.2", "Logaritma fonksiyonu ve özellikleri", "Logarithmic function and properties", r"""
# Tanım
$a > 0$, $a \neq 1$, $b > 0$ olmak üzere
$$\log_a b = c \iff a^c = b$$
Logaritma, üstel fonksiyonun **tersidir**: $f(x) = a^x \Rightarrow f^{-1}(x) = \log_a x$.

- Tanım kümesi $(0, \infty)$, görüntü kümesi $\mathbb{R}$.
- $\log_a 1 = 0$, $\log_a a = 1$, $\log_a a^x = x$, $a^{\log_a x} = x$.
- **Adi logaritma:** $\log x = \log_{10} x$. **Doğal logaritma:** $\ln x = \log_e x$.

# Kurallar
$$\log_a(xy) = \log_a x + \log_a y \qquad \log_a\frac{x}{y} = \log_a x - \log_a y$$
$$\log_a x^n = n\log_a x \qquad \log_{a^m} x^n = \frac{n}{m}\log_a x$$
$$\text{Taban değiştirme: } \log_a b = \frac{\log_c b}{\log_c a} = \frac{\ln b}{\ln a} \qquad \log_a b \cdot \log_b a = 1$$

# Grafik
$y = \log_a x$ ile $y = a^x$ grafikleri **$y = x$ doğrusuna göre simetriktir**.
- $(1, 0)$ noktasından geçer; **$x = 0$ düşey asimptottur**.
- $a > 1$ artan, $0 < a < 1$ azalan.

**Uygulamalar:** Deprem büyüklüğü (Richter), ses şiddeti (desibel), **pH** $= -\log[H^+]$.
""",
  [(r"$\log 2 = 0{,}301$ ise $\log 40$ ve $\log_2 5$ değerlerini bulunuz.", r"$\log 40 = \log 4 + \log 10 = 2(0{,}301) + 1 = 1{,}602$. $\log_2 5 = \frac{\log 5}{\log 2} = \frac{1 - 0{,}301}{0{,}301} \approx 2{,}32$."),
   (r"$\log_3 81 + \log_2 \frac18 - \ln e^5$ işleminin sonucu nedir?", r"$4 + (-3) - 5 = -4$.")],
  [r"$\log_ab=c \iff a^c=b$; $\log_a$ üstelin tersi.", "Çarpım → toplam, bölüm → fark, kuvvet → katsayı.", r"Grafik $(1,0)$'dan geçer, $x=0$ asimptot."]),
O("k3", "1.3", "Üstel ve logaritmik denklem ve eşitsizlikler", "Exponential and logarithmic equations and inequalities", r"""
# Üstel Denklem Çözme Yolları
1. **Tabanları eşitle:** $a^{f(x)} = a^{g(x)} \Rightarrow f(x) = g(x)$.
2. **İki tarafın logaritmasını al:** $3^x = 7 \Rightarrow x = \log_3 7$.
3. **Değişken değiştir:** $4^x - 3\cdot2^x + 2 = 0$ → $t = 2^x$ → $t^2 - 3t + 2 = 0$.

# Logaritmik Denklemler
$\log_a f(x) = \log_a g(x) \Rightarrow f(x) = g(x)$. **Tanım kontrolü zorunludur:** logaritmanın içi **pozitif**, taban pozitif ve 1'den farklı olmalı; şartı sağlamayan kökler **elenir**.

# Eşitsizlikler
| Taban | Fonksiyon | Eşitsizlik yönü |
|---|---|---|
| $a > 1$ | Artan | **Korunur**: $a^{f} < a^{g} \iff f < g$ |
| $0 < a < 1$ | Azalan | **Değişir**: $a^{f} < a^{g} \iff f > g$ |

Logaritmik eşitsizlikte ayrıca **tanım aralığı** ile çözüm kümesinin **kesişimi** alınır.
""",
  [(r"$2^{x+1} = 8^{x-2}$ denklemini çözünüz.", r"$2^{x+1} = 2^{3x-6} \Rightarrow x + 1 = 3x - 6 \Rightarrow x = \frac72$."),
   (r"$\log_3(x-1) + \log_3(x+1) = 1$ denklemini çözünüz.", r"$\log_3(x^2-1) = 1 \Rightarrow x^2 - 1 = 3 \Rightarrow x = \pm2$. Tanım: $x > 1$ → çözüm **$x = 2$** ($x = -2$ elenir)."),
   (r"$\left(\frac12\right)^{x-3} > 4$ eşitsizliğini çözünüz.", r"$\left(\frac12\right)^{x-3} > \left(\frac12\right)^{-2}$; taban $<1$ olduğundan yön değişir: $x - 3 < -2 \Rightarrow x < 1$.")],
  ["Tabanları eşitle, logaritma al ya da değişken değiştir.", "Logaritmik denklemde tanım kontrolü şart.", "Taban 0 ile 1 arasında ise eşitsizlik yön değiştirir."]),
]),
U("u2", "2. Ünite: Diziler", "Unit 2: Sequences", [
O("k1", "2.1", "Gerçek sayı dizileri: aritmetik ve geometrik diziler", "Real sequences: arithmetic and geometric", r"""
# Dizi
Pozitif tam sayılar kümesinden gerçek sayılara tanımlı fonksiyon: $(a_n) = (a_1, a_2, a_3, \ldots)$. $a_n$: **genel terim**.
- **Sonlu / sonsuz** dizi; **sabit dizi** $(a_n) = (c)$.
- **Artan:** $a_{n+1} > a_n$; **azalan:** $a_{n+1} < a_n$.
- **İndirgemeli (rekürsif) tanım:** Fibonacci $a_{n+2} = a_{n+1} + a_n$.

# Aritmetik Dizi (ortak fark $d$)
$$a_{n+1} - a_n = d \qquad a_n = a_1 + (n-1)d \qquad a_n = a_m + (n-m)d$$
$$S_n = \frac{n}{2}(a_1 + a_n) = \frac{n}{2}\left[2a_1 + (n-1)d\right]$$
- Ardışık üç terimde ortadaki, diğer ikisinin **aritmetik ortalamasıdır**: $b = \dfrac{a + c}{2}$.
- Örnek: $1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$.

# Geometrik Dizi (ortak oran $r$)
$$\frac{a_{n+1}}{a_n} = r \qquad a_n = a_1\,r^{n-1}$$
$$S_n = a_1\frac{r^n - 1}{r - 1}\ (r \neq 1) \qquad r = 1 \Rightarrow S_n = n\,a_1$$
- Ardışık üç terimde ortadakinin karesi diğer ikisinin çarpımıdır: $b^2 = ac$ (**geometrik ortalama**).
- **Sonsuz geometrik seri** ($|r| < 1$): $$S = \frac{a_1}{1 - r}$$

# Dizi Limitine Giriş
$n \to \infty$ iken $a_n$ bir $L$ sayısına yaklaşıyorsa dizi **yakınsaktır**: $\lim a_n = L$. Aksi hâlde **ıraksaktır**.
- $\lim \dfrac1n = 0$; $|r| < 1$ ise $\lim r^n = 0$.
- $0{,}\overline{3} = \dfrac{3}{10} + \dfrac{3}{100} + \cdots = \dfrac{3/10}{1 - 1/10} = \dfrac13$.

**Gerçek hayat:** Kira ve maaş artışları (aritmetik), bileşik faiz ve nüfus (geometrik), zıplayan topun toplam yolu (sonsuz geometrik seri).
""",
  [(r"Bir aritmetik dizide $a_3 = 11$, $a_8 = 26$ ise $a_1$, $d$ ve $S_{10}$ nedir?", r"$5d = 15 \Rightarrow d = 3$, $a_1 = 11 - 6 = 5$. $a_{10} = 5 + 27 = 32$, $S_{10} = \frac{10}{2}(5 + 32) = 185$."),
   (r"$2 + 1 + \frac12 + \frac14 + \cdots$ sonsuz toplamı nedir?", r"$a_1 = 2$, $r = \frac12$: $S = \frac{2}{1 - 1/2} = 4$.")],
  [r"Aritmetik: $a_n=a_1+(n-1)d$, $S_n=\frac n2(a_1+a_n)$.", r"Geometrik: $a_n=a_1r^{n-1}$; $|r|<1$ ise $S=\frac{a_1}{1-r}$.", r"Yakınsak dizi: $\lim a_n=L$."]),
]),
U("u3", "3. Ünite: Trigonometri", "Unit 3: Trigonometry", [
O("k1", "3.1", "Toplam–fark, iki kat açı ve dönüşüm formülleri", "Sum–difference, double-angle and transformation formulas", r"""
# Toplam–Fark Formülleri
$$\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B$$
$$\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B$$
$$\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$$

**Örnek:** $\sin 75° = \sin(45° + 30°) = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2} + \dfrac{\sqrt2}{2}\cdot\dfrac12 = \dfrac{\sqrt6 + \sqrt2}{4}$.

# İki Kat Açı Formülleri
$$\sin 2A = 2\sin A\cos A$$
$$\cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$$
$$\tan 2A = \frac{2\tan A}{1 - \tan^2 A}$$

# Yarım Açı (Kuvvet Azaltma)
$$\sin^2 A = \frac{1 - \cos 2A}{2} \qquad \cos^2 A = \frac{1 + \cos 2A}{2}$$

# Ters Dönüşüm (Çarpım → Toplam)
$$\sin A\cos B = \tfrac12[\sin(A+B) + \sin(A-B)]$$
$$\cos A\cos B = \tfrac12[\cos(A+B) + \cos(A-B)] \qquad \sin A\sin B = \tfrac12[\cos(A-B) - \cos(A+B)]$$

**Temel özdeşlikler (hatırlatma):** $\sin^2x + \cos^2x = 1$, $\tan x = \dfrac{\sin x}{\cos x}$, $1 + \tan^2 x = \dfrac{1}{\cos^2 x}$.
""",
  [(r"$\sin A = \frac35$ ve $A$ dar açı ise $\sin 2A$ ve $\cos 2A$ nedir?", r"$\cos A = \frac45$. $\sin 2A = 2\cdot\frac35\cdot\frac45 = \frac{24}{25}$; $\cos 2A = 1 - 2\cdot\frac{9}{25} = \frac{7}{25}$."),
   (r"$\cos 15°$ değerini bulunuz.", r"$\cos(45° - 30°) = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6 + \sqrt2}{4}$.")],
  [r"$\sin(A\pm B)$, $\cos(A\pm B)$, $\tan(A\pm B)$.", r"$\sin2A=2\sin A\cos A$; $\cos2A$ üç biçim.", "Yarım açı ve çarpım–toplam formülleri."]),
O("k2", "3.2", "Trigonometrik denklemler", "Trigonometric equations", r"""
# Temel Denklemlerin Genel Çözümleri ($k \in \mathbb{Z}$)
| Denklem | Genel çözüm |
|---|---|
| $\sin x = \sin\alpha$ | $x = \alpha + 2k\pi$ **veya** $x = \pi - \alpha + 2k\pi$ |
| $\cos x = \cos\alpha$ | $x = \alpha + 2k\pi$ **veya** $x = -\alpha + 2k\pi$ |
| $\tan x = \tan\alpha$ | $x = \alpha + k\pi$ |
| $\cot x = \cot\alpha$ | $x = \alpha + k\pi$ |

- $\sin x = a$ ve $\cos x = a$ için **$|a| \le 1$** olmalı; aksi hâlde çözüm yoktur.
- Özel durumlar: $\sin x = 0 \Rightarrow x = k\pi$; $\cos x = 0 \Rightarrow x = \dfrac\pi2 + k\pi$; $\sin x = 1 \Rightarrow x = \dfrac\pi2 + 2k\pi$.

# Yöntemler
- **Çarpanlara ayırma:** $\sin x\cos x - \sin x = 0 \Rightarrow \sin x(\cos x - 1) = 0$.
- **Değişken değiştirme:** $2\sin^2 x - 3\sin x + 1 = 0 \Rightarrow t = \sin x$.
- **Özdeşlik kullanma:** $\cos 2x$ ifadesini $1 - 2\sin^2x$ ile yazmak.
- Belirli bir aralık sorulursa (ör. $[0, 2\pi)$) yalnızca o aralıktaki kökler yazılır.
""",
  [(r"$[0, 2\pi)$ aralığında $2\sin^2 x - 3\sin x + 1 = 0$ denklemini çözünüz.", r"$t = \sin x$: $2t^2 - 3t + 1 = 0 \Rightarrow t = 1$ ya da $t = \frac12$. $\sin x = 1 \Rightarrow x = \frac\pi2$; $\sin x = \frac12 \Rightarrow x = \frac\pi6, \frac{5\pi}{6}$. Çözüm: $\left\{\frac\pi6, \frac\pi2, \frac{5\pi}6\right\}$."),
   (r"$\cos 2x = \frac12$ denkleminin genel çözümü nedir?", r"$2x = \pm\frac\pi3 + 2k\pi \Rightarrow x = \pm\frac\pi6 + k\pi$.")],
  [r"$\sin x=\sin\alpha$: $\alpha+2k\pi$ ya da $\pi-\alpha+2k\pi$.", r"$\cos x=\cos\alpha$: $\pm\alpha+2k\pi$; $\tan$: $\alpha+k\pi$.", "Çarpanlara ayırma, değişken değiştirme, aralık kontrolü."]),
]),
U("u4", "4. Ünite: Dönüşümler", "Unit 4: Transformations", [
O("k1", "4.1", "Analitik düzlemde öteleme, yansıma, dönme ve ölçekleme", "Translation, reflection, rotation and dilation", r"""
# Öteleme
$$(x, y) \to (x + a,\ y + b)$$
Şekil kaymaz, boyut ve yönü değişmez. **Fonksiyonlarda:** $y = f(x - a) + b$ → grafik **sağa $a$, yukarı $b$** ötelenir.

# Yansıma (Simetri)
| Eksene / doğruya göre | Görüntü |
|---|---|
| $x$ ekseni | $(x, -y)$ |
| $y$ ekseni | $(-x, y)$ |
| Orijin | $(-x, -y)$ |
| $y = x$ doğrusu | $(y, x)$ |
| $y = -x$ doğrusu | $(-y, -x)$ |
| $x = k$ doğrusu | $(2k - x, y)$ |
| $y = k$ doğrusu | $(x, 2k - y)$ |

**Fonksiyonlarda:** $y = -f(x)$ → $x$ eksenine göre; $y = f(-x)$ → $y$ eksenine göre yansıma.

# Dönme (Orijin etrafında, saat yönünün tersine $\theta$)
$$x' = x\cos\theta - y\sin\theta \qquad y' = x\sin\theta + y\cos\theta$$
| Açı | Görüntü |
|---|---|
| $90°$ | $(-y, x)$ |
| $180°$ | $(-x, -y)$ |
| $270°$ | $(y, -x)$ |

# Ölçekleme (Orijin merkezli homoteti)
$$(x, y) \to (kx,\ ky)$$
- $|k| > 1$ **büyütme**, $0 < |k| < 1$ **küçültme**; $k < 0$ ise ayrıca orijine göre yansıma.
- Uzunluklar $|k|$, alanlar $k^2$ katına çıkar.

**İzometri:** Öteleme, yansıma ve dönme uzunlukları ve açıları **korur**; ölçekleme yalnızca açıları korur (benzer şekil).
""",
  [(r"$A(3, -2)$ noktasının orijin etrafında $90°$ döndürülmesiyle ve $y = x$ doğrusuna göre yansımasıyla elde edilen görüntüler nedir?", r"$90°$ dönme: $(-y, x) = (2, 3)$. $y = x$ yansıması: $(y, x) = (-2, 3)$."),
   (r"$y = x^2$ parabolü 2 birim sağa, 3 birim aşağı ötelenirse denklem ne olur?", r"$y = (x - 2)^2 - 3$.")],
  [r"Öteleme $(x+a,y+b)$; $f(x-a)+b$ sağa ve yukarı.", r"Yansıma: $x$ ekseni $(x,-y)$, $y=x$ $(y,x)$.", r"Dönme $90°$: $(-y,x)$; ölçekleme $(kx,ky)$."]),
]),
U("u5", "5. Ünite: Türev", "Unit 5: Derivatives", [
O("k1", "5.1", "Limit ve süreklilik", "Limits and continuity", r"""
# Limit
$x$, $a$'ya yaklaşırken $f(x)$ değerleri $L$'ye yaklaşıyorsa $\lim\limits_{x\to a} f(x) = L$. $f(a)$'nın tanımlı olması **gerekmez**.

**Sağdan ve soldan limit:** $\lim\limits_{x\to a^+} f(x)$, $\lim\limits_{x\to a^-} f(x)$. Limitin var olması için **ikisi de var ve eşit** olmalıdır.

# Limit Özellikleri
Limitler toplama, çıkarma, çarpma, bölmeye (payda limiti ≠ 0) dağılır. Polinomlarda $\lim\limits_{x\to a} p(x) = p(a)$.

# Belirsizlikler
$\dfrac00$, $\dfrac\infty\infty$, $0\cdot\infty$, $\infty - \infty$ vb.
- **Çarpanlara ayırıp sadeleştirme:** $\lim\limits_{x\to2}\dfrac{x^2-4}{x-2} = \lim\limits_{x\to2}(x+2) = 4$.
- **Eşlenikle çarpma:** köklü ifadelerde.
- **Sonsuzda limit:** En büyük dereceli terimlere bakılır: $\lim\limits_{x\to\infty}\dfrac{3x^2+1}{x^2-5} = 3$.
- **Özel limit:** $\lim\limits_{x\to0}\dfrac{\sin x}{x} = 1$.
- **L'Hospital kuralı** (ileri düzey): $\dfrac00$ ya da $\dfrac\infty\infty$ ise $\lim\dfrac{f}{g} = \lim\dfrac{f'}{g'}$.

# Süreklilik
$f$, $x = a$'da süreklidir ⟺
1. $f(a)$ tanımlı,
2. $\lim\limits_{x\to a} f(x)$ var,
3. $\lim\limits_{x\to a} f(x) = f(a)$.

Polinom, üstel, sinüs ve kosinüs fonksiyonları her yerde süreklidir; rasyonel fonksiyonlar paydayı sıfır yapan noktalarda süreksizdir. Grafikte **kopukluk, sıçrama, boşluk** süreksizliği gösterir.
""",
  [(r"$f(x) = \begin{cases} x^2 + a, & x < 1 \\ 3x - 1, & x \ge 1 \end{cases}$ fonksiyonu $x = 1$'de sürekli ise $a$ nedir?", r"Soldan limit $1 + a$, sağdan limit ve $f(1) = 2$. Süreklilik için $1 + a = 2 \Rightarrow a = 1$."),
   (r"$\lim\limits_{x\to3}\dfrac{x^2 - 9}{x^2 - 3x}$ limitini hesaplayınız.", r"$\frac{(x-3)(x+3)}{x(x-3)} = \frac{x+3}{x} \to \frac{6}{3} = 2$.")],
  ["Limit için sağdan ve soldan limit eşit olmalı.", r"$\frac00$ belirsizliği: çarpanlara ayır, sadeleştir.", "Süreklilik: f(a) tanımlı, limit var ve f(a)'ya eşit."]),
O("k2", "5.2", "Anlık değişim oranı, türev tanımı ve türev kuralları", "Instantaneous rate of change and differentiation rules", r"""
# Türevin Tanımı
$$f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}$$
- **Anlık değişim oranı**; grafiğin $x = a$ noktasındaki **teğetinin eğimi**.
- Fizikte: konumun türevi **hız**, hızın türevi **ivme**.
- **Teğet doğrusu:** $y - f(a) = f'(a)(x - a)$.
- Türevli fonksiyon süreklidir; ancak sürekli her fonksiyon türevli değildir ($|x|$, $x = 0$'da **kırılma** noktası).

# Türev Kuralları
| Fonksiyon | Türev |
|---|---|
| $c$ | $0$ |
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x\ln a$ |
| $\ln x$ | $\dfrac1x$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $1 + \tan^2 x = \dfrac{1}{\cos^2x}$ |

**İşlem kuralları:**
$$(u \pm v)' = u' \pm v' \qquad (uv)' = u'v + uv' \qquad \left(\frac uv\right)' = \frac{u'v - uv'}{v^2}$$
$$\text{Zincir kuralı: } [f(g(x))]' = f'(g(x))\cdot g'(x)$$
""",
  [(r"$f(x) = (x^2 + 1)^5$ ise $f'(x)$ nedir?", r"Zincir kuralı: $f'(x) = 5(x^2+1)^4 \cdot 2x = 10x(x^2+1)^4$."),
   (r"$f(x) = x^3 - 2x$ eğrisine $x = 1$ noktasında çizilen teğetin denklemi nedir?", r"$f(1) = -1$, $f'(x) = 3x^2 - 2 \Rightarrow f'(1) = 1$. Teğet: $y + 1 = 1(x - 1) \Rightarrow y = x - 2$.")],
  [r"$f'(a)$ = teğetin eğimi = anlık değişim oranı.", r"$(x^n)'=nx^{n-1}$, $(e^x)'=e^x$, $(\ln x)'=1/x$.", "Çarpım, bölüm ve zincir kuralı."]),
O("k3", "5.3", "Türevin uygulamaları: artan–azalan, ekstremum, optimizasyon", "Applications of derivatives", r"""
# Artanlık ve Azalanlık
- $f'(x) > 0$ olan aralıkta $f$ **artan**, $f'(x) < 0$ olan aralıkta **azalandır**.
- $f'(c) = 0$ ya da $f'(c)$ tanımsız olan noktalar **kritik noktalardır**.

# Ekstremum Noktaları
**Birinci türev testi:** Kritik noktada $f'$ işareti
- $+ \to -$ değişiyorsa **yerel maksimum**,
- $- \to +$ değişiyorsa **yerel minimum**,
- değişmiyorsa ekstremum yok.

**İkinci türev testi:** $f'(c) = 0$ ve
- $f''(c) < 0$ → **yerel maksimum**, $f''(c) > 0$ → **yerel minimum**.

**Büküm (dönüm) noktası:** $f''$'nün işaret değiştirdiği nokta; $f'' > 0$ → **konveks (çukur yukarı)**, $f'' < 0$ → **konkav**.

**Kapalı aralıkta mutlak ekstremum:** Kritik noktalardaki ve **uç noktalardaki** değerler karşılaştırılır.

# Grafik Çizimi Adımları
Tanım kümesi → eksenleri kesim noktaları → asimptotlar → $f'$ ile artan–azalan ve ekstremumlar → $f''$ ile büküm → değişim tablosu → grafik.

# Optimizasyon (En Büyük / En Küçük Değer Problemleri)
1. Optimize edilecek büyüklüğü tek değişkenli fonksiyon olarak yaz.
2. Türevini sıfıra eşitle, kritik noktaları bul.
3. Uç noktaları ve fiziksel koşulları kontrol et.

**İlgili oranlar:** Zamana göre değişen büyüklükler arasındaki türev ilişkileri (balon şişirme, merdiven kayması).
""",
  [(r"$f(x) = x^3 - 3x^2 - 9x + 5$ fonksiyonunun yerel ekstremumlarını bulunuz.", r"$f'(x) = 3x^2 - 6x - 9 = 3(x-3)(x+1) = 0 \Rightarrow x = -1, 3$. $f''(x) = 6x - 6$: $f''(-1) = -12 < 0$ → **yerel max** $f(-1) = 10$; $f''(3) = 12 > 0$ → **yerel min** $f(3) = -22$."),
   (r"Kenar uzunluğu 12 cm olan kare kartonun köşelerinden $x$ cm'lik kareler kesilip üstü açık kutu yapılıyor. Hacim en fazla kaç cm³ olur?", r"$V(x) = x(12-2x)^2$, $0<x<6$. $V'(x) = (12-2x)(12-6x) = 0 \Rightarrow x = 2$. $V(2) = 2 \cdot 64 = 128$ cm³.")],
  ["f' > 0 artan, f' < 0 azalan.", "f'' < 0 yerel max, f'' > 0 yerel min.", "Optimizasyon: fonksiyon kur, türevi sıfırla, uç noktaları kontrol et."]),
]),
U("u6", "6. Ünite: İntegral", "Unit 6: Integrals", [
O("k1", "6.1", "Belirsiz integral ve integral alma yöntemleri", "Indefinite integrals and integration techniques", r"""
# Tanım
$F'(x) = f(x)$ ise
$$\int f(x)\,dx = F(x) + C$$
İntegral, **türevin tersi** işlemidir; $C$ **integral sabitidir** (sonsuz sayıda ilkel fonksiyon).

# Temel Formüller
| İntegral | Sonuç |
|---|---|
| $\int x^n\,dx$ | $\dfrac{x^{n+1}}{n+1} + C\ (n \neq -1)$ |
| $\int \dfrac1x\,dx$ | $\ln|x| + C$ |
| $\int e^x\,dx$ | $e^x + C$ |
| $\int a^x\,dx$ | $\dfrac{a^x}{\ln a} + C$ |
| $\int \sin x\,dx$ | $-\cos x + C$ |
| $\int \cos x\,dx$ | $\sin x + C$ |
| $\int \dfrac{1}{\cos^2x}\,dx$ | $\tan x + C$ |

**Özellikler:** $\int[f \pm g]\,dx = \int f\,dx \pm \int g\,dx$; $\int k\,f(x)\,dx = k\int f(x)\,dx$.

# Değişken Değiştirme
İntegrand içinde bir fonksiyon ve onun türevi varsa: $u = g(x)$, $du = g'(x)\,dx$.
$$\int 2x\,(x^2+1)^3\,dx \xrightarrow{u = x^2+1} \int u^3\,du = \frac{(x^2+1)^4}{4} + C$$

# Kısmi İntegrasyon (ileri düzey)
$$\int u\,dv = uv - \int v\,du$$
**Örnek:** $\int x e^x\,dx = xe^x - e^x + C$.
""",
  [(r"$\int (3x^2 - 4x + 5)\,dx$ integralini hesaplayınız.", r"$x^3 - 2x^2 + 5x + C$."),
   (r"$\int \cos x \cdot e^{\sin x}\,dx$ integralini bulunuz.", r"$u = \sin x$, $du = \cos x\,dx$: $\int e^u\,du = e^{\sin x} + C$.")],
  [r"$\int f\,dx=F+C$, $F'=f$.", r"$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$; $\int\frac1x\,dx=\ln|x|+C$.", "Değişken değiştirme: fonksiyon ve türevi birlikte."]),
O("k2", "6.2", "Belirli integral, alan ve hacim", "Definite integrals, area and volume", r"""
# Riemann Toplamı ve Belirli İntegral
Eğri altındaki alan, ince dikdörtgenlerin alanları toplamının limiti olarak bulunur. Bu limit **belirli integraldir**.

# Analizin Temel Teoremi (Newton–Leibniz)
$$\int_a^b f(x)\,dx = F(b) - F(a) = \Big[F(x)\Big]_a^b$$

**Özellikler:**
- $\int_a^a f\,dx = 0$, $\;\int_a^b f\,dx = -\int_b^a f\,dx$
- $\int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$
- $f(x) \ge 0$ ise $\int_a^b f\,dx \ge 0$.

# Alan Hesabı
- $f(x) \ge 0$ ise eğri ile $x$ ekseni arasındaki alan $\int_a^b f(x)\,dx$.
- Eğri $x$ ekseninin **altında** ise integral **negatif** çıkar; alan için **mutlak değer** alınır, işaret değiştiren aralıklar ayrı hesaplanır.
- **İki eğri arasındaki alan:** $$A = \int_a^b |f(x) - g(x)|\,dx \quad (\text{üstteki} - \text{alttaki})$$

# Ortalama Değer
$[a, b]$ aralığında $f$'nin ortalama değeri: $\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$.

# Dönel Cisim Hacmi
$y = f(x)$ eğrisinin $[a, b]$'de $x$ ekseni etrafında döndürülmesiyle oluşan cismin hacmi (**disk yöntemi**):
$$V = \pi\int_a^b [f(x)]^2\,dx$$
İki eğri arasındaki bölge döndürülürse (**pul yöntemi**): $V = \pi\int_a^b \left(R^2 - r^2\right)dx$.
""",
  [(r"$\int_0^2 (3x^2 + 1)\,dx$ değerini hesaplayınız.", r"$\big[x^3 + x\big]_0^2 = 8 + 2 = 10$."),
   (r"$y = x^2$ ve $y = 2x$ eğrileri arasında kalan alan nedir?", r"Kesişim: $x^2 = 2x \Rightarrow x = 0, 2$. $[0,2]$'de $2x \ge x^2$: $A = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac83 = \frac43$."),
   (r"$y = \sqrt{x}$, $0 \le x \le 4$ eğrisinin $x$ ekseni etrafında döndürülmesiyle oluşan cismin hacmi?", r"$V = \pi\int_0^4 x\,dx = \pi\left[\frac{x^2}{2}\right]_0^4 = 8\pi$.")],
  [r"$\int_a^bf\,dx=F(b)-F(a)$.", "Alan: üstteki − alttaki; eksen altı için mutlak değer.", r"Dönel hacim $V=\pi\int_a^b f^2\,dx$."]),
]),
U("u7", "7. Ünite: Analitik Geometri — Çember", "Unit 7: Analytic Geometry — Circle", [
O("k1", "7.1", "Çemberin analitik incelemesi", "Analytic study of the circle", r"""
# Standart Denklem
Merkezi $M(a, b)$, yarıçapı $r$ olan çember:
$$(x - a)^2 + (y - b)^2 = r^2$$
Orijin merkezli: $x^2 + y^2 = r^2$.

# Genel Denklem
$$x^2 + y^2 + Dx + Ey + F = 0$$
$$M\left(-\frac D2,\ -\frac E2\right) \qquad r = \frac12\sqrt{D^2 + E^2 - 4F}$$
- $D^2 + E^2 - 4F > 0$ → **gerçek çember**, $= 0$ → **nokta çember**, $< 0$ → çember **belirtmez**.
- $x^2$ ve $y^2$ katsayıları **eşit** olmalı, $xy$ terimi **olmamalı**.

**Özel durumlar:** $x$ eksenine teğet → $r = |b|$; $y$ eksenine teğet → $r = |a|$; iki eksene teğet → $|a| = |b| = r$.

# Nokta ile Çemberin Durumu
$|PM|$ ile $r$ karşılaştırılır: $|PM| < r$ içte, $= r$ üzerinde, $> r$ dışta.

# Doğru ile Çemberin Durumu
Merkezin doğruya uzaklığı $d = \dfrac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$:
| Durum | Ölçüt | Kesişim denkleminde $\Delta$ |
|---|---|---|
| İki noktada keser | $d < r$ | $\Delta > 0$ |
| **Teğet** | $d = r$ | $\Delta = 0$ |
| Kesişmez | $d > r$ | $\Delta < 0$ |

Teğet, değme noktasındaki yarıçapa **diktir**.

# İki Çemberin Durumu ($d$: merkezler arası uzaklık)
| Durum | Ölçüt |
|---|---|
| Ayrık (dışta) | $d > r_1 + r_2$ |
| Dıştan teğet | $d = r_1 + r_2$ |
| İki noktada kesişir | $\lvert r_1 - r_2\rvert < d < r_1 + r_2$ |
| İçten teğet | $d = \lvert r_1 - r_2\rvert$ |
| Biri diğerinin içinde | $d < \lvert r_1 - r_2\rvert$ |
""",
  [(r"$x^2 + y^2 - 6x + 4y - 12 = 0$ çemberinin merkezi ve yarıçapı nedir?", r"$M(3, -2)$; $r = \frac12\sqrt{36 + 16 + 48} = \frac12\sqrt{100} = 5$."),
   (r"Merkezi $(1, 2)$ olan ve $3x + 4y + 9 = 0$ doğrusuna teğet olan çemberin denklemi nedir?", r"$r = d = \frac{|3 + 8 + 9|}{5} = 4$. Denklem: $(x-1)^2 + (y-2)^2 = 16$.")],
  [r"$(x-a)^2+(y-b)^2=r^2$.", r"Genel denklem: $M(-D/2,-E/2)$.", "Doğru: d<r keser, d=r teğet; iki çember: d ile r₁±r₂ karşılaştır."]),
]),
]


from _ek134 import uygula  # noqa: E402
uygula(units, "mat12_ek134")

write("mat-12.js", "12/matematik", "12. Sınıf Matematik — detaylı konu anlatım notları",
      "kullanıcının verdiği \"Matematik 12 Detaylı Konu Anlatım Notları\" (7 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Düzeltme: üstel fonksiyonun grafiği y eksenini (0,1)'de keser, x eksenini hiç kesmez. Her konuya çözümlü örnekler, işlem tabloları ve uygulamalar eklendi.")
