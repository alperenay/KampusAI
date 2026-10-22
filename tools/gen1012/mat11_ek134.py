# -*- coding: utf-8 -*-
r"""11. Sınıf Matematik — 1.34.0 ek kazanımları."""
from _c import O

EK = {
"u1": [
O("k4", "1.4", "Doğrunun analitik incelemesi", "Analytic study of the line", r"""
# Eğim ve Doğru Denklemi
- İki nokta arası eğim: $m = \dfrac{y_2 - y_1}{x_2 - x_1}$ · Eğim açısı $\alpha$ ise $m = \tan\alpha$.
- **Eğimi m, $(x_1, y_1)$'den geçen doğru:** $y - y_1 = m(x - x_1)$
- **Genel denklem:** $ax + by + c = 0$ → eğim $m = -\dfrac{a}{b}$
- **Eksenleri kestiği noktalar** $(p, 0)$ ve $(0, q)$ ise: $\dfrac{x}{p} + \dfrac{y}{q} = 1$

# İki Doğrunun Durumu
| Durum | Koşul |
|---|---|
| **Paralel** | Eğimler eşit: $m_1 = m_2$ |
| **Dik** | $m_1 \cdot m_2 = -1$ |
| **Çakışık** | Denklemler orantılı: $\dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} = \dfrac{c_1}{c_2}$ |
| **Kesişen** | $m_1 \neq m_2$ (ortak çözüm kesişim noktasıdır) |

# Uzaklıklar
- İki nokta arası: $|AB| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
- Orta nokta: $\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$
- **Noktanın doğruya uzaklığı:** $d = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$
- Paralel iki doğru arası: $d = \dfrac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$
""",
  [(r"$A(1, 2)$ noktasından geçen ve $2x - y + 5 = 0$ doğrusuna dik olan doğrunun denklemini bulunuz.", r"Verilen doğrunun eğimi $2$; dik doğrunun eğimi $-\frac12$. $y - 2 = -\frac12(x - 1) \Rightarrow x + 2y - 5 = 0$."),
   (r"$(3, 4)$ noktasının $3x + 4y - 5 = 0$ doğrusuna uzaklığı kaçtır?", r"$d = \frac{|9 + 16 - 5|}{\sqrt{9 + 16}} = \frac{20}{5} = 4$.")],
  [r"Eğim $m = \Delta y/\Delta x = \tan\alpha$.", r"Paralel: $m_1 = m_2$; dik: $m_1m_2 = -1$.", r"Nokta–doğru uzaklığı $|ax_0+by_0+c|/\sqrt{a^2+b^2}$."]),
],
"u2": [
O("k2", "2.2", "Çokgenler: açılar, köşegenler ve alanlar", "Polygons: angles, diagonals and areas", r"""
# Çokgenlerde Açılar ($n$ kenarlı dışbükey çokgen)
- **İç açılar toplamı:** $(n - 2)\cdot180^\circ$
- **Dış açılar toplamı:** her zaman $360^\circ$
- **Düzgün çokgende** bir iç açı: $\dfrac{(n-2)\cdot180^\circ}{n}$, bir dış açı: $\dfrac{360^\circ}{n}$
- **Köşegen sayısı:** $\dfrac{n(n-3)}{2}$; bir köşeden çizilen köşegen sayısı $n - 3$

| Çokgen | $n$ | İç açılar toplamı | Düzgünse bir iç açı |
|---|---|---|---|
| Üçgen | 3 | $180^\circ$ | $60^\circ$ |
| Dörtgen | 4 | $360^\circ$ | $90^\circ$ |
| Beşgen | 5 | $540^\circ$ | $108^\circ$ |
| Altıgen | 6 | $720^\circ$ | $120^\circ$ |
| Sekizgen | 8 | $1080^\circ$ | $135^\circ$ |

# Alanlar
- **Düzgün altıgen** (kenar $a$): 6 eşkenar üçgen → $A = 6\cdot\dfrac{a^2\sqrt3}{4} = \dfrac{3a^2\sqrt3}{2}$
- **Yamuk:** $A = \dfrac{(a + c)\cdot h}{2}$ · **Paralelkenar:** $A = a\cdot h$
- **Eşkenar dörtgen / deltoid:** $A = \dfrac{e \cdot f}{2}$ (köşegenler dik)
- Herhangi bir dörtgen (köşegenler $e, f$, aradaki açı $\theta$): $A = \dfrac{e f \sin\theta}{2}$
""",
  [(r"Bir iç açısı $140^\circ$ olan düzgün çokgen kaç kenarlıdır?", r"Bir dış açı $180^\circ - 140^\circ = 40^\circ$; $n = 360/40 = 9$ kenar."),
   (r"Kenarı $4$ cm olan düzgün altıgenin alanı kaç cm²'dir?", r"$A = \frac{3\cdot16\sqrt3}{2} = 24\sqrt3$ cm².")],
  [r"İç açılar toplamı $(n-2)180^\circ$; dış açılar toplamı $360^\circ$.", r"Köşegen sayısı $n(n-3)/2$.", r"Düzgün altıgen = 6 eşkenar üçgen."]),
],
"u3": [
O("k3", "3.3", "Üçgende açıortay, kenarortay ve alan oranları", "Angle bisectors, medians and area ratios in a triangle", r"""
# Açıortay Teoremi
$A$ açısının iç açıortayı $[BC]$'yi $D$'de kesiyorsa:
$$\frac{|BD|}{|DC|} = \frac{|AB|}{|AC|}$$
- İç açıortaylar **iç teğet çemberin merkezinde** kesişir (kenarlara eşit uzaklık).

# Kenarortay
- Kenarortaylar **ağırlık merkezinde (G)** kesişir; $G$ her kenarortayı köşeden itibaren **2 : 1** oranında böler.
- **Kenarortay uzunluğu:** $V_a^2 = \dfrac{2(b^2 + c^2) - a^2}{4}$
- Dik üçgende **hipotenüse ait kenarortay** hipotenüsün yarısıdır.
- Üç kenarortay üçgeni **alanları eşit 6** üçgene böler.

# Alan Oranları
- **Yükseklikleri ortak** üçgenlerin alanları **tabanlarıyla** orantılıdır.
- Kenarortay üçgeni **iki eşit alanlı** üçgene böler.
- **Benzer** üçgenlerde benzerlik oranı $k$ ise alanlar oranı $k^2$'dir.
- **Sinüslü alan:** $A = \dfrac12\, b\, c \sin A$
""",
  [(r"$ABC$ üçgeninde $|AB| = 6$, $|AC| = 9$, $|BC| = 10$. $A$'nın açıortayı $[BC]$'yi $D$'de kesiyor. $|BD|$ kaçtır?", r"$\frac{|BD|}{|DC|} = \frac{6}{9} = \frac23$; $|BD| = 10\cdot\frac25 = 4$."),
   (r"Alanı $60$ cm² olan üçgende ağırlık merkezi $G$'dir. $GBC$ üçgeninin alanı nedir?", r"Kenarortaylar üçgeni 6 eşit parçaya böler; $GBC$ bunlardan **2** tanesidir: $60\cdot\frac{2}{6} = 20$ cm².")],
  ["Açıortay karşı kenarı komşu kenarlar oranında böler.", "Ağırlık merkezi kenarortayı 2:1 böler; 6 eşit alan.", r"Benzerlik oranı $k$ → alan oranı $k^2$."]),
],
"u4": [
O("k3", "4.3", "Koşullu olasılık ve bağımsız olaylar", "Conditional probability and independent events", r"""
# Koşullu Olasılık
$B$ olayının gerçekleştiği bilindiğinde $A$'nın olasılığı:
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$
**Çarpma kuralı:** $P(A \cap B) = P(B)\cdot P(A \mid B)$

# Bağımsız Olaylar
$A$'nın gerçekleşmesi $B$'yi etkilemiyorsa:
$$P(A \cap B) = P(A)\cdot P(B) \quad\Leftrightarrow\quad P(A \mid B) = P(A)$$
- İadeli çekiliş, zar ve para atışları **bağımsızdır**.
- İadesiz çekilişte olaylar **bağımlıdır**.
- **Ayrık** olaylar ($A \cap B = \emptyset$) olasılıkları pozitifse bağımsız **olamaz**.

# İki Yönlü Tablo
| | Gözlüklü | Gözlüksüz | Toplam |
|---|---|---|---|
| Kız | 6 | 14 | 20 |
| Erkek | 4 | 16 | 20 |
| Toplam | 10 | 30 | 40 |

$P(\text{Gözlüklü} \mid \text{Kız}) = \dfrac{6}{20} = 0{,}3$ — koşul, örnek uzayı **satır/sütuna daraltır**.

# Tümleyen
$P(A') = 1 - P(A)$ · "En az bir" sorularında tümleyen kullanılır: $P(\text{en az bir}) = 1 - P(\text{hiç})$.
""",
  [(r"Bir torbada $4$ kırmızı, $6$ mavi top var. **İadesiz** iki top çekiliyor. İkisinin de kırmızı olma olasılığı nedir?", r"$\frac{4}{10}\cdot\frac{3}{9} = \frac{12}{90} = \frac{2}{15}$."),
   (r"Bir zar 3 kez atılıyor. En az bir kez 6 gelme olasılığı nedir?", r"$1 - \left(\frac56\right)^3 = 1 - \frac{125}{216} = \frac{91}{216}$.")],
  [r"$P(A\mid B) = P(A\cap B)/P(B)$.", r"Bağımsız: $P(A\cap B) = P(A)P(B)$.", r"En az bir: $1 - P(\text{hiç})$."]),
O("k4", "4.4", "Binom açılımı ve Pascal üçgeni", "Binomial expansion and Pascal's triangle", r"""
# Binom Açılımı
$$(a + b)^n = \sum_{r=0}^{n} \binom{n}{r} a^{n-r} b^{r}$$
- Açılımda **$n + 1$ terim** vardır.
- Her terimde üsler toplamı $n$'dir.
- **Genel terim** (baştan $r+1$'inci): $T_{r+1} = \dbinom{n}{r} a^{n-r} b^{r}$
- **Katsayılar toplamı:** değişkenlere $1$ yazılır → $(1+1)^n = 2^n$
- **Sabit terim:** değişkenin üssünü sıfır yapan terim.

# Pascal Üçgeni
| $n$ | Katsayılar |
|---|---|
| 0 | 1 |
| 1 | 1 1 |
| 2 | 1 2 1 |
| 3 | 1 3 3 1 |
| 4 | 1 4 6 4 1 |
| 5 | 1 5 10 10 5 1 |
Her sayı üstündeki iki sayının toplamıdır: $\dbinom{n}{r} = \dbinom{n-1}{r-1} + \dbinom{n-1}{r}$

# Sık Kullanılanlar
- $(a + b)^2 = a^2 + 2ab + b^2$ · $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$
- $\dbinom{n}{r} = \dbinom{n}{n-r}$
""",
  [(r"$(2x - 1)^5$ açılımında $x^3$'lü terimin katsayısı kaçtır?", r"$T = \binom{5}{r}(2x)^{5-r}(-1)^r$; $5 - r = 3 \Rightarrow r = 2$: $\binom52\cdot2^3\cdot(-1)^2 = 10\cdot8 = 80$."),
   (r"$\left(x^2 + \dfrac{1}{x}\right)^6$ açılımında sabit terim kaçtır?", r"$T = \binom6r x^{2(6-r)}x^{-r} = \binom6r x^{12-3r}$; $12 - 3r = 0 \Rightarrow r = 4$: $\binom64 = 15$.")],
  [r"$(a+b)^n$ açılımında $n+1$ terim.", r"Genel terim $\binom nr a^{n-r}b^r$.", r"Katsayılar toplamı: değişkenlere 1 yaz."]),
],
"u5": [
O("k2", "5.2", "Polinomlar: işlemler ve bölme", "Polynomials: operations and division", r"""
# Tanım
$P(x) = a_nx^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0$ — üsler **doğal sayı**, katsayılar gerçek sayıdır.
- **Derece:** en büyük üs ($a_n \neq 0$) · **Baş katsayı:** $a_n$ · **Sabit terim:** $a_0 = P(0)$
- **Katsayılar toplamı:** $P(1)$
- $\sqrt x$, $\dfrac1x$, $2^x$ içeren ifadeler polinom **değildir**.

# İşlemler
- Toplama/çıkarma: **benzer terimler** birleştirilir.
- Çarpma: $\text{der}(P\cdot Q) = \text{der}P + \text{der}Q$
- $\text{der}(P(x)^k) = k\cdot\text{der}P$, $\ \text{der}(P(Q(x))) = \text{der}P \cdot \text{der}Q$

# Bölme ve Kalan Teoremi
$$P(x) = B(x)\cdot Q(x) + K(x), \quad \text{der}K < \text{der}B$$
- **Kalan teoremi:** $P(x)$'in $(x - a)$ ile bölümünden kalan $P(a)$'dır.
- $(ax + b)$ ile bölümünden kalan $P\!\left(-\dfrac ba\right)$.
- **Çarpan teoremi:** $P(a) = 0 \iff (x - a)$, $P(x)$'in çarpanıdır.
- **Horner (sentetik bölme)** ile hızlı bölme yapılır.
""",
  [(r"$P(x) = x^3 - 2x^2 + kx + 4$ polinomu $(x - 2)$ ile tam bölünüyorsa $k$ kaçtır?", r"$P(2) = 8 - 8 + 2k + 4 = 0 \Rightarrow k = -2$."),
   (r"$P(x+1) = x^2 + 3x + 5$ ise $P(x)$'in katsayılar toplamı kaçtır?", r"Katsayılar toplamı $P(1)$; $x + 1 = 1 \Rightarrow x = 0$: $P(1) = 5$.")],
  [r"Kalan teoremi: $(x-a)$'ya bölümden kalan $P(a)$.", r"$P(1)$ katsayılar toplamı, $P(0)$ sabit terim.", "Çarpımda dereceler toplanır."]),
O("k3", "5.3", "Fonksiyon grafiklerinde dönüşümler", "Transformations of function graphs", r"""
# Öteleme
| İfade | Grafikteki değişim |
|---|---|
| $y = f(x) + k$ | $k$ birim **yukarı** ($k < 0$ ise aşağı) |
| $y = f(x - h)$ | $h$ birim **sağa** ($h < 0$ ise sola) |
| $y = f(x + h)$ | $h$ birim **sola** |

> Parantez içindeki değişim **ters yönde** çalışır: $f(x - 3)$ sağa öteler.

# Yansıma
- $y = -f(x)$: **x eksenine** göre yansıma.
- $y = f(-x)$: **y eksenine** göre yansıma.
- $y = -f(-x)$: **orijine** göre yansıma.

# Ölçekleme (Germe–Sıkıştırma)
- $y = a\cdot f(x)$, $a > 1$: düşey **germe**; $0 < a < 1$: düşey **sıkıştırma**.
- $y = f(bx)$, $b > 1$: yatay **sıkıştırma** (grafik $\frac1b$ katına daralır).

# Örnek
$y = x^2$ parabolünden $y = (x - 2)^2 + 3$: **2 birim sağa, 3 birim yukarı**; tepe noktası $(2, 3)$.

# Mutlak Değer
$y = |f(x)|$: grafiğin **x ekseninin altında kalan kısmı yukarı** yansıtılır.
""",
  [(r"$f(x) = x^2$ grafiği 3 birim sola ve 4 birim aşağı ötelenirse yeni fonksiyon nedir?", r"$g(x) = (x + 3)^2 - 4$; tepe noktası $(-3, -4)$."),
   (r"$y = f(x)$ grafiği $(2, 5)$ noktasından geçiyorsa $y = -f(x - 1)$ grafiği hangi noktadan geçer?", r"Önce 1 birim sağa: $(3, 5)$; sonra x eksenine göre yansıma: $(3, -5)$.")],
  [r"$f(x) + k$ düşey, $f(x - h)$ yatay öteleme (sağa).", r"$-f(x)$ x eksenine, $f(-x)$ y eksenine göre yansıma.", r"$|f(x)|$: negatif kısım yukarı katlanır."]),
O("k4", "5.4", "İkinci dereceden eşitsizlikler ve parabol–doğru ilişkisi", "Quadratic inequalities and parabola–line relations", r"""
# İşaret Tablosu
$f(x) = ax^2 + bx + c$'nin kökleri $x_1 < x_2$ ise:
- Köklerin **dışında** $a$ ile **aynı** işaret, **arasında** **ters** işaret.

| $x$ | $-\infty$ … $x_1$ | $x_1$ … $x_2$ | $x_2$ … $+\infty$ |
|---|---|---|---|
| $a > 0$ | $+$ | $-$ | $+$ |

- $\Delta < 0$ ise $f(x)$ her yerde $a$'nın işaretindedir: $x^2 + x + 1 > 0$ **her $x$ için** doğrudur.
- **Her $x$ için $ax^2 + bx + c > 0$** olması: $a > 0$ ve $\Delta < 0$.

# Parabol ile Doğrunun Durumu
$y = ax^2 + bx + c$ ve $y = mx + n$ eşitlenir → $ax^2 + (b - m)x + (c - n) = 0$
| $\Delta$ | Durum |
|---|---|
| $> 0$ | İki noktada **keser** |
| $= 0$ | **Teğet** (bir ortak nokta) |
| $< 0$ | **Kesişmez** |

# Eşitsizlik Sistemleri
Her eşitsizlik ayrı çözülür, çözüm kümelerinin **kesişimi** alınır. Rasyonel eşitsizliklerde paydanın kökleri **çözüme dahil edilmez**.
""",
  [(r"$x^2 - x - 6 \le 0$ eşitsizliğinin çözüm kümesini bulunuz.", r"Kökler $-2$ ve $3$; $a > 0$ olduğundan kökler arası negatif: $[-2, 3]$."),
   (r"$y = x^2 + 4$ parabolü ile $y = mx$ doğrusu teğet ise $m$ nedir?", r"$x^2 - mx + 4 = 0$, $\Delta = m^2 - 16 = 0 \Rightarrow m = \pm4$.")],
  ["Kökler arası a'nın tersi, dışı a ile aynı işaret.", r"Her x için pozitif: $a > 0$, $\Delta < 0$.", r"Parabol–doğru: $\Delta$ ile kesme/teğet/ayrık."]),
],
}
