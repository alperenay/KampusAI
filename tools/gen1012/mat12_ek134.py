# -*- coding: utf-8 -*-
r"""12. Sınıf Matematik — 1.34.0 ek kazanımları (AYT)."""
from _c import O

EK = {
"u2": [
O("k2", "2.2", "Toplam sembolü, seriler ve dizilerin uygulamaları", "Summation notation, series and applications of sequences", r"""
# Toplam Sembolü
$$\sum_{k=1}^{n} a_k = a_1 + a_2 + \dots + a_n$$
**Özellikler:**
- $\sum_{k=1}^{n} c = n\cdot c$ · $\sum (a_k \pm b_k) = \sum a_k \pm \sum b_k$ · $\sum c\,a_k = c\sum a_k$

**Bilinen toplamlar:**
- $\displaystyle\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$ · $\displaystyle\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$ · $\displaystyle\sum_{k=1}^{n} k^3 = \left[\frac{n(n+1)}{2}\right]^2$

# Aritmetik ve Geometrik Seri
| | Aritmetik ($d$ ortak fark) | Geometrik ($r$ ortak çarpan) |
|---|---|---|
| Genel terim | $a_n = a_1 + (n-1)d$ | $a_n = a_1 r^{n-1}$ |
| İlk $n$ terim toplamı | $S_n = \dfrac{n(a_1 + a_n)}{2}$ | $S_n = a_1\dfrac{r^n - 1}{r - 1}$ |
| Sonsuz toplam | — | $\lvert r\rvert < 1$ ise $S = \dfrac{a_1}{1 - r}$ |

# Uygulamalar
- **Bileşik faiz:** $A = P(1 + i)^n$ (geometrik dizi)
- **Nüfus/bakteri artışı**, **ilaç yarılanması** (geometrik); **eşit taksitle birikim** (aritmetik)
- $0{,}\overline{3} = \dfrac{3}{10} + \dfrac{3}{100} + \dots = \dfrac{0{,}3}{1 - 0{,}1} = \dfrac13$
""",
  [(r"$\displaystyle\sum_{k=1}^{20} (2k + 1)$ toplamı kaçtır?", r"$2\cdot\frac{20\cdot21}{2} + 20 = 420 + 20 = 440$."),
   (r"İlk terimi $8$, ortak çarpanı $\frac12$ olan sonsuz geometrik serinin toplamı kaçtır?", r"$S = \frac{8}{1 - \frac12} = 16$.")],
  [r"$\sum k = n(n+1)/2$, $\sum k^2 = n(n+1)(2n+1)/6$.", r"Geometrik toplam $a_1(r^n - 1)/(r - 1)$.", r"Sonsuz geometrik seri $\lvert r\rvert<1$ ise $a_1/(1-r)$."]),
],
"u3": [
O("k3", "3.3", "Ters trigonometrik fonksiyonlar ve trigonometrik fonksiyonların grafikleri", "Inverse trigonometric functions and graphs of trigonometric functions", r"""
# Grafikler ve Periyot
| Fonksiyon | Periyot | Görüntü kümesi |
|---|---|---|
| $\sin x$, $\cos x$ | $2\pi$ | $[-1, 1]$ |
| $\tan x$, $\cot x$ | $\pi$ | $\mathbb{R}$ |

$f(x) = a\sin(bx + c) + d$ için: **genlik** $\lvert a\rvert$, **periyot** $\dfrac{2\pi}{\lvert b\rvert}$, **en büyük değer** $\lvert a\rvert + d$, **en küçük değer** $-\lvert a\rvert + d$.
- $\tan(bx)$'in periyodu $\dfrac{\pi}{\lvert b\rvert}$.
- $\sin^n$ ve $\cos^n$: $n$ **çift** ise periyot $\pi$, **tek** ise $2\pi$.

# Ters Fonksiyonlar (tanım aralıkları kısıtlanarak)
| Fonksiyon | Tanım kümesi | Görüntü kümesi |
|---|---|---|
| $\arcsin x$ | $[-1, 1]$ | $\left[-\dfrac\pi2, \dfrac\pi2\right]$ |
| $\arccos x$ | $[-1, 1]$ | $[0, \pi]$ |
| $\arctan x$ | $\mathbb{R}$ | $\left(-\dfrac\pi2, \dfrac\pi2\right)$ |

- $\arcsin\dfrac12 = \dfrac\pi6$, $\arccos\left(-\dfrac12\right) = \dfrac{2\pi}{3}$, $\arctan 1 = \dfrac\pi4$
- $\arcsin x + \arccos x = \dfrac\pi2$
- $\sin(\arcsin x) = x$, ama $\arcsin(\sin x) = x$ yalnızca $x \in \left[-\frac\pi2, \frac\pi2\right]$ için.
""",
  [(r"$f(x) = 3\cos(2x) - 1$ fonksiyonunun periyodunu, en büyük ve en küçük değerini bulunuz.", r"Periyot $\frac{2\pi}{2} = \pi$; en büyük $3 - 1 = 2$, en küçük $-3 - 1 = -4$."),
   (r"$\cos\left(\arcsin\dfrac35\right)$ değeri kaçtır?", r"$\arcsin\frac35 = \theta$ ise $\sin\theta = \frac35$, $\theta \in [-\frac\pi2, \frac\pi2]$ → $\cos\theta = \frac45$ (pozitif).")],
  [r"$a\sin(bx+c)+d$: genlik $\lvert a\rvert$, periyot $2\pi/\lvert b\rvert$.", r"arcsin görüntüsü $[-\pi/2, \pi/2]$, arccos görüntüsü $[0, \pi]$.", r"$\arcsin x + \arccos x = \pi/2$."]),
],
"u5": [
O("k4", "5.4", "Türev ile grafik çizimi ve asimptotlar", "Curve sketching with derivatives and asymptotes", r"""
# Grafik Çizim Adımları
1. **Tanım kümesi** ve eksenleri kestiği noktalar.
2. **Asimptotlar:**
   - **Düşey:** paydayı sıfır yapan (payı yapmayan) $x = a$.
   - **Yatay:** $\displaystyle\lim_{x\to\pm\infty} f(x) = L$ ise $y = L$.
   - **Eğik:** pay derecesi paydanınkinden **bir fazla** ise bölme yapılır; bölüm eğik asimptottur.
3. **$f'(x)$:** işaret tablosu → artan/azalan aralıklar, **yerel ekstremumlar**.
4. **$f''(x)$:** işaret tablosu → **konkavlık** (çukurluk) ve **dönüm noktaları**.
5. Tablo birleştirilip grafik çizilir.

# İkinci Türevin Yorumu
| $f''(x)$ | Grafik |
|---|---|
| $> 0$ | **Yukarı bükey** (konveks, ∪) |
| $< 0$ | **Aşağı bükey** (konkav, ∩) |
| İşaret değiştirir | **Dönüm (büküm) noktası** |

- **İkinci türev testi:** $f'(a) = 0$ ve $f''(a) > 0$ → **yerel minimum**; $f''(a) < 0$ → **yerel maksimum**.

# Rasyonel Fonksiyonlarda Yatay Asimptot
$\dfrac{P(x)}{Q(x)}$: der$P <$ der$Q$ → $y = 0$; dereceler eşit → $y = \dfrac{\text{baş katsayı}_P}{\text{baş katsayı}_Q}$.
""",
  [(r"$f(x) = \dfrac{2x + 3}{x - 1}$ fonksiyonunun asimptotlarını bulunuz.", r"Düşey: $x = 1$; dereceler eşit → yatay: $y = \frac21 = 2$."),
   (r"$f(x) = x^3 - 3x^2 + 2$ fonksiyonunun dönüm noktasının apsisi kaçtır?", r"$f'(x) = 3x^2 - 6x$, $f''(x) = 6x - 6 = 0 \Rightarrow x = 1$; $f''$ burada işaret değiştirir → dönüm noktası $x = 1$.")],
  ["Düşey asimptot: paydanın kökü; yatay: sonsuzdaki limit.", r"$f''>0$ yukarı bükey, $f''<0$ aşağı bükey.", r"$f'(a)=0$, $f''(a)>0$ → yerel minimum."]),
],
"u6": [
O("k3", "6.3", "Riemann toplamı ve belirli integralin özellikleri", "Riemann sums and properties of the definite integral", r"""
# Riemann Toplamı
$[a, b]$ aralığı $n$ eşit parçaya bölünür ($\Delta x = \dfrac{b-a}{n}$); her parçada bir dikdörtgen çizilir:
$$\int_a^b f(x)\,dx = \lim_{n\to\infty} \sum_{k=1}^{n} f(x_k)\,\Delta x$$
- **Alt toplam** (en küçük yükseklikler) $\le$ integral $\le$ **üst toplam**.
- $n$ arttıkça dikdörtgenlerin toplam alanı eğri altındaki alana **yaklaşır**.

# İntegral Hesabının Temel Teoremi
$F' = f$ ise: $\displaystyle\int_a^b f(x)\,dx = F(b) - F(a)$
- $\dfrac{d}{dx}\displaystyle\int_a^{x} f(t)\,dt = f(x)$ · $\dfrac{d}{dx}\displaystyle\int_a^{g(x)} f(t)\,dt = f(g(x))\cdot g'(x)$

# Özellikler
- $\int_a^a f = 0$ · $\int_a^b f = -\int_b^a f$
- $\int_a^b f + \int_b^c f = \int_a^c f$ (aralık birleştirme)
- $\int_a^b (f \pm g) = \int_a^b f \pm \int_a^b g$ · $\int_a^b k\,f = k\int_a^b f$
- **Tek fonksiyon:** $\int_{-a}^{a} f = 0$ · **Çift fonksiyon:** $\int_{-a}^{a} f = 2\int_0^a f$
- Parçalı ve **mutlak değerli** fonksiyonlarda integral, kırılma noktalarından bölünerek alınır.
""",
  [(r"$\displaystyle\int_{-2}^{2} (x^3 + 3x^2)\,dx$ kaçtır?", r"$x^3$ tek → katkısı 0. $3x^2$ çift: $2\int_0^2 3x^2\,dx = 2\cdot[x^3]_0^2 = 16$."),
   (r"$F(x) = \displaystyle\int_1^{x^2} \sqrt{t}\,dt$ ise $F'(2)$ kaçtır?", r"$F'(x) = \sqrt{x^2}\cdot2x = 2x\lvert x\rvert$; $F'(2) = 8$.")],
  ["Riemann toplamının limiti belirli integraldir.", r"$\frac{d}{dx}\int_a^{g(x)} f = f(g(x))g'(x)$.", r"Tek fonksiyonda $\int_{-a}^a f = 0$."]),
],
"u7": [
O("k2", "7.2", "Çemberin doğruyla durumu, teğet ve kiriş denklemleri", "Circle–line position, tangent and chord equations", r"""
# Çember Denklemi (hatırlatma)
Merkez $M(a, b)$, yarıçap $r$: $(x - a)^2 + (y - b)^2 = r^2$
Genel: $x^2 + y^2 + Dx + Ey + F = 0$ → $M\left(-\dfrac D2, -\dfrac E2\right)$, $r = \dfrac12\sqrt{D^2 + E^2 - 4F}$

# Doğru ile Çemberin Durumu
Merkezin doğruya uzaklığı $d$ olsun:
| Durum | Koşul | Ortak nokta |
|---|---|---|
| **Keser** | $d < r$ | 2 |
| **Teğet** | $d = r$ | 1 |
| **Ayrık** | $d > r$ | 0 |
(Alternatif: denklemler ortak çözülür; elde edilen ikinci derece denklemin $\Delta$'sına bakılır.)

# Teğet Denklemi
- Çember üzerindeki $T(x_1, y_1)$ noktasındaki teğet, **yarıçapa diktir**: $m_{teğet} = -\dfrac{1}{m_{MT}}$
- Merkezi orijinde olan çember için: $x_1 x + y_1 y = r^2$

# İki Çemberin Durumu ($d$: merkezler arası uzaklık)
- $d > r_1 + r_2$: ayrık · $d = r_1 + r_2$: dıştan teğet · $\lvert r_1 - r_2\rvert < d < r_1 + r_2$: iki noktada keser · $d = \lvert r_1 - r_2\rvert$: içten teğet
""",
  [(r"$x^2 + y^2 = 25$ çemberine $(3, 4)$ noktasında çizilen teğetin denklemini bulunuz.", r"$x_1x + y_1y = r^2 \Rightarrow 3x + 4y = 25$."),
   (r"Merkezi $(2, -1)$ olan ve $3x - 4y + 5 = 0$ doğrusuna teğet olan çemberin yarıçapı kaçtır?", r"$r = d = \frac{\lvert 6 + 4 + 5\rvert}{5} = 3$.")],
  [r"$d < r$ keser, $d = r$ teğet, $d > r$ ayrık.", "Teğet, değme noktasındaki yarıçapa diktir.", r"Orijin merkezli çemberde teğet: $x_1x + y_1y = r^2$."]),
],
}
