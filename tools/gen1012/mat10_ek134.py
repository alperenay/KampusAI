# -*- coding: utf-8 -*-
r"""10. Sınıf Matematik — 1.34.0 ek kazanımları (TYT/AYT temel konuları)."""
from _c import O

EK = {
"t1": [
O("k5", "1.5", "Çemberde açılar, yay ve kiriş", "Angles, arcs and chords in a circle", r"""
# Çemberin Temel Elemanları
- **Yarıçap** $r$, **çap** $2r$, **kiriş** (çember üzerindeki iki noktayı birleştiren doğru parçası), **yay**, **teğet**.
- Çevre $= 2\pi r$, daire alanı $= \pi r^2$.
- **Yay uzunluğu:** $\ell = 2\pi r \cdot \dfrac{\alpha}{360^\circ}$ · **Daire dilimi alanı:** $A = \pi r^2 \cdot \dfrac{\alpha}{360^\circ}$

# Çemberde Açılar
| Açı | Köşesi | Ölçüsü |
|---|---|---|
| **Merkez açı** | Merkezde | Gördüğü yayın ölçüsüne **eşit** |
| **Çevre açı** | Çember üzerinde | Gördüğü yayın **yarısı** |
| **Teğet–kiriş açı** | Çember üzerinde (teğet + kiriş) | Gördüğü yayın **yarısı** |
| **İç açı** | Çemberin içinde | Gördüğü yayların **toplamının yarısı** |
| **Dış açı** | Çemberin dışında | Gördüğü yayların **farkının yarısı** |

# Önemli Sonuçlar
- **Çapı gören çevre açı** $90^\circ$'dir (Thales).
- **Aynı yayı gören** çevre açılar eşittir.
- Merkezden kirişe inen dikme kirişi **ortalar**.
- Dış noktadan çizilen iki teğet parçasının uzunlukları **eşittir**.
- **Kirişler dörtgeninde** karşılıklı açıların toplamı $180^\circ$'dir.
""",
  [(r"Bir çemberde $100^\circ$'lik yayı gören çevre açı ile merkez açının ölçüleri nedir?", r"Merkez açı yayın ölçüsüne eşit: $100^\circ$. Çevre açı yarısı: $50^\circ$."),
   (r"Yarıçapı $6$ cm olan bir çemberde $60^\circ$'lik merkez açının gördüğü yayın uzunluğu kaç cm'dir? ($\pi = 3$)", r"$\ell = 2\pi r\cdot\frac{60}{360} = 2\cdot3\cdot6\cdot\frac16 = 6$ cm.")],
  [r"Merkez açı = yay; çevre açı = yay/2.", r"Çapı gören çevre açı $90^\circ$.", r"Yay uzunluğu $2\pi r\cdot\alpha/360$."]),
],
"t2": [
O("k2", "2.2", "Merkezî eğilim ve yayılım ölçüleri", "Measures of central tendency and spread", r"""
# Merkezî Eğilim Ölçüleri
| Ölçü | Tanım | Özellik |
|---|---|---|
| **Aritmetik ortalama** | $\bar x = \dfrac{x_1 + x_2 + \dots + x_n}{n}$ | **Uç değerlerden** çok etkilenir |
| **Medyan (ortanca)** | Sıralı verinin **ortasındaki** değer; $n$ çiftse ortadaki iki değerin ortalaması | Uç değerlerden etkilenmez |
| **Mod (tepe değer)** | **En çok tekrar eden** değer | Birden fazla ya da hiç olmayabilir |

# Yayılım Ölçüleri
- **Açıklık (ranj):** en büyük − en küçük.
- **Çeyrekler açıklığı:** $Q_3 - Q_1$ (verinin ortadaki %50'sinin yayılımı).
- **Standart sapma:** Verilerin ortalamadan ortalama uzaklığı.
$$s = \sqrt{\frac{\sum (x_i - \bar x)^2}{n-1}}$$
- Standart sapma **küçükse** veriler ortalama etrafında **toplu**, büyükse **dağınıktır**.

# Dönüşümlerin Etkisi
Her veriye **sabit eklenirse** ortalama, medyan, mod o kadar artar; **açıklık ve standart sapma değişmez**. Her veri $k$ ile **çarpılırsa** hepsi $k$ katına çıkar.
""",
  [(r"$3, 7, 7, 9, 14$ verisinin ortalama, medyan, mod ve açıklığını bulunuz.", r"Ortalama $= 40/5 = 8$; medyan $= 7$; mod $= 7$; açıklık $= 14 - 3 = 11$."),
   (r"İki sınıfın matematik ortalamaları $70$; A sınıfının standart sapması $5$, B'ninki $15$. Hangisi daha homojendir?", r"Standart sapması **küçük olan A sınıfı** daha homojendir; notlar ortalamaya daha yakındır.")],
  ["Ortalama uç değerden etkilenir; medyan etkilenmez.", r"Açıklık = maks − min; çeyrekler açıklığı $Q_3 - Q_1$.", "Sabit eklemek standart sapmayı değiştirmez."]),
O("k3", "2.3", "Veri gösterimi: histogram ve kutu grafiği", "Data displays: histograms and box plots", r"""
# Grafik Seçimi
| Grafik | Uygun veri |
|---|---|
| **Sütun / çubuk** | Kategorik veriler karşılaştırması |
| **Daire** | Bütünün parçaları (yüzdeler) |
| **Çizgi** | Zamana bağlı değişim |
| **Histogram** | Sürekli sayısal verinin **gruplanmış** dağılımı |
| **Kutu grafiği** | Beş sayı özeti ve **aykırı değerler** |
| **Serpme (saçılım)** | İki sayısal değişken arasındaki **ilişki** |

# Histogram Hazırlama
1. Açıklık bulunur. 2. **Grup sayısı** seçilir. 3. **Grup genişliği** $\ge \dfrac{\text{açıklık}}{\text{grup sayısı}}$ (tam sayıya yuvarlanır). 4. Frekanslar sayılır; sütunlar **bitişik** çizilir.

# Kutu Grafiği (Beş Sayı Özeti)
**En küçük – $Q_1$ – medyan – $Q_3$ – en büyük**
- Kutu $Q_1$'den $Q_3$'e uzanır; içindeki çizgi **medyandır**.
- **Aykırı değer:** $Q_1 - 1{,}5\cdot \text{ÇA}$'dan küçük ya da $Q_3 + 1{,}5\cdot \text{ÇA}$'dan büyük değer ($\text{ÇA} = Q_3 - Q_1$).
- Medyan kutunun **sol tarafına yakınsa** dağılım sağa çarpıktır.

# Daire Grafiği Açısı
$$\text{Merkez açı} = \frac{\text{kategori frekansı}}{\text{toplam}} \times 360^\circ$$
""",
  [(r"$40$ öğrencinin $10$'u bisikletle okula geliyor. Daire grafiğinde bu dilimin merkez açısı kaç derecedir?", r"$\frac{10}{40}\cdot360^\circ = 90^\circ$."),
   (r"Beş sayı özeti $12, 20, 25, 30, 58$ olan veride $58$ aykırı değer midir?", r"$\text{ÇA} = 30 - 20 = 10$; üst sınır $30 + 1{,}5\cdot10 = 45$. $58 > 45$ olduğundan **aykırı değerdir**.")],
  ["Histogram: sürekli veri, bitişik sütunlar.", r"Kutu grafiği: min, $Q_1$, medyan, $Q_3$, maks.", r"Aykırı değer: $Q_3 + 1{,}5\,\text{ÇA}$ üstü ya da $Q_1 - 1{,}5\,\text{ÇA}$ altı."]),
],
"t3": [
O("k3", "3.3", "Üslü ve köklü ifadeler", "Exponents and radicals", r"""
# Üs Kuralları ($a, b \neq 0$)
| Kural | Örnek |
|---|---|
| $a^m \cdot a^n = a^{m+n}$ | $2^3\cdot2^4 = 2^7$ |
| $\dfrac{a^m}{a^n} = a^{m-n}$ | $\dfrac{5^6}{5^2} = 5^4$ |
| $(a^m)^n = a^{mn}$ | $(3^2)^3 = 3^6$ |
| $(ab)^n = a^n b^n$ | $(2x)^3 = 8x^3$ |
| $a^0 = 1$, $a^{-n} = \dfrac{1}{a^n}$ | $4^{-2} = \dfrac{1}{16}$ |
| $(-a)^{\text{çift}} > 0$, $(-a)^{\text{tek}} < 0$ | $(-2)^4 = 16$, $(-2)^3 = -8$ |

**Dikkat:** $-2^4 = -16$ ama $(-2)^4 = 16$.

# Köklü İfadeler
- $\sqrt[n]{a^m} = a^{m/n}$ · $\sqrt{a}\cdot\sqrt{b} = \sqrt{ab}$ · $\dfrac{\sqrt a}{\sqrt b} = \sqrt{\dfrac ab}$
- **Kök dışına çıkarma:** $\sqrt{72} = \sqrt{36\cdot2} = 6\sqrt2$
- **Toplama:** Yalnızca **kök içleri aynı** terimler toplanır: $3\sqrt5 + 2\sqrt5 = 5\sqrt5$
- $\sqrt{x^2} = |x|$
- **Paydayı rasyonel yapma:** $\dfrac{1}{\sqrt3} = \dfrac{\sqrt3}{3}$ · $\dfrac{1}{\sqrt5 - \sqrt2} = \dfrac{\sqrt5+\sqrt2}{3}$ (eşleniğiyle çarp)

# Bilimsel Gösterim
$a \times 10^n$, $1 \le |a| < 10$: $0{,}00042 = 4{,}2\times10^{-4}$
""",
  [(r"$\dfrac{2^{10} \cdot 4^3}{8^5}$ ifadesinin değerini bulunuz.", r"Hepsini 2 tabanına yazalım: $\frac{2^{10}\cdot2^6}{2^{15}} = 2^{1} = 2$."),
   (r"$\sqrt{50} + \sqrt{18} - \sqrt{8}$ işleminin sonucu nedir?", r"$5\sqrt2 + 3\sqrt2 - 2\sqrt2 = 6\sqrt2$.")],
  [r"Aynı tabanda çarpımda üsler toplanır, bölümde çıkarılır.", r"$\sqrt[n]{a^m} = a^{m/n}$; $\sqrt{x^2} = |x|$.", "Payda eşleniğiyle çarpılarak rasyonel yapılır."]),
O("k4", "3.4", "Modüler aritmetik", "Modular arithmetic", r"""
# Denklik
$a$ ile $b$'nin $m$'ye bölümünden kalanlar eşitse:
$$a \equiv b \pmod m \iff m \mid (a - b)$$
Örnek: $17 \equiv 2 \pmod 5$ çünkü $17 - 2 = 15$, 5'e bölünür.

# İşlem Özellikleri
$a \equiv b$ ve $c \equiv d \pmod m$ ise:
- $a + c \equiv b + d$ · $a - c \equiv b - d$ · $a\cdot c \equiv b\cdot d$ · $a^n \equiv b^n \pmod m$
- **Bölme serbest değildir!**

# Büyük Üslerin Kalanı
Kuvvetlerin kalanları **periyodik** tekrar eder; periyot bulunur.
- $3^n \pmod 5$: $3, 4, 2, 1, 3, 4, \dots$ → periyot **4**
- $3^{2026}$: $2026 = 4\cdot506 + 2$ → $3^{2026} \equiv 3^2 \equiv 4 \pmod 5$

# Günlük Hayatta
- **Haftanın günleri** (mod 7): Bugün çarşamba ise 100 gün sonra? $100 \equiv 2 \pmod 7$ → **cuma**.
- **Saat** (mod 12 / mod 24), **ISBN ve TC kimlik no** kontrol basamakları.
""",
  [(r"$7^{83}$ sayısının $10$ ile bölümünden kalan (birler basamağı) kaçtır?", r"$7^n$ birler basamağı: $7, 9, 3, 1$ (periyot 4). $83 = 4\cdot20 + 3$ → $7^3$'ün birler basamağı **3**."),
   (r"Bugün pazartesi ise $45$ gün sonra hangi gündür?", r"$45 \equiv 3 \pmod 7$ → pazartesiden 3 gün sonra: **perşembe**.")],
  [r"$a \equiv b \pmod m \iff m \mid (a-b)$.", "Toplama, çıkarma, çarpma ve üs alma denkliği korur; bölme korumaz.", "Büyük üslerde kalanların periyodu bulunur."]),
],
"t4": [
O("k3", "4.3", "İkinci dereceden denklemler ve kök–katsayı ilişkileri", "Quadratic equations and relations between roots and coefficients", r"""
# Genel Biçim ve Çözüm Yolları
$$ax^2 + bx + c = 0 \quad (a \neq 0)$$
1. **Çarpanlara ayırma:** $x^2 - 5x + 6 = (x-2)(x-3) = 0 \Rightarrow x = 2,\ 3$
2. **Tam kareye tamamlama**
3. **Diskriminant:** $\Delta = b^2 - 4ac$, $\quad x_{1,2} = \dfrac{-b \pm \sqrt\Delta}{2a}$

| $\Delta$ | Kökler |
|---|---|
| $\Delta > 0$ | İki farklı gerçek kök |
| $\Delta = 0$ | Çakışık (eşit) iki kök: $x = -\dfrac{b}{2a}$ |
| $\Delta < 0$ | Gerçek kök yok |

# Kök–Katsayı (Vieta) Bağıntıları
$$x_1 + x_2 = -\frac{b}{a} \qquad x_1\cdot x_2 = \frac{c}{a}$$
- $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2$
- $\dfrac{1}{x_1} + \dfrac{1}{x_2} = \dfrac{x_1 + x_2}{x_1x_2}$
- Kökleri $x_1, x_2$ olan denklem: $x^2 - (x_1 + x_2)x + x_1x_2 = 0$
""",
  [(r"$2x^2 - 6x + 1 = 0$ denkleminin kökleri $x_1, x_2$ ise $x_1^2 + x_2^2$ kaçtır?", r"$x_1 + x_2 = 3$, $x_1x_2 = \frac12$. $x_1^2 + x_2^2 = 9 - 1 = 8$."),
   (r"$x^2 + 4x + m = 0$ denkleminin çakışık iki kökü varsa $m$ kaçtır?", r"$\Delta = 16 - 4m = 0 \Rightarrow m = 4$ (kök $x = -2$).")],
  [r"$\Delta = b^2 - 4ac$ kök sayısını belirler.", r"$x_1 + x_2 = -b/a$, $x_1x_2 = c/a$.", r"Kökleri bilinen denklem: $x^2 - Sx + P = 0$."]),
O("k4", "4.4", "Mutlak değer ve birinci dereceden eşitsizlikler", "Absolute value and linear inequalities", r"""
# Mutlak Değer
$$|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}$$
Sayı doğrusunda $x$'in **0'a uzaklığıdır**; $|a - b|$ ise $a$ ile $b$ arasındaki uzaklıktır.
- $|x| \ge 0$, $|-x| = |x|$, $|xy| = |x||y|$, $|x + y| \le |x| + |y|$

# Mutlak Değerli Denklem ve Eşitsizlikler ($a > 0$)
| İfade | Çözüm |
|---|---|
| $\lvert x\rvert = a$ | $x = a$ veya $x = -a$ |
| $\lvert x\rvert < a$ | $-a < x < a$ |
| $\lvert x\rvert > a$ | $x < -a$ veya $x > a$ |
| $\lvert x - c\rvert \le a$ | $c - a \le x \le c + a$ (c'ye uzaklığı en çok a) |

# Birinci Dereceden Eşitsizlik
- Her iki tarafa aynı sayı eklenebilir/çıkarılabilir.
- **Negatif** sayıyla çarpınca/bölünce **yön değişir:** $-2x < 6 \Rightarrow x > -3$
- **Aralık gösterimi:** $[2, 5)$ = $2 \le x < 5$
""",
  [(r"$|2x - 3| \le 7$ eşitsizliğini sağlayan tam sayıların toplamı kaçtır?", r"$-7 \le 2x - 3 \le 7 \Rightarrow -2 \le x \le 5$. Tam sayılar $-2, \dots, 5$; toplam $= 12$."),
   (r"$3 - 2x > 11$ eşitsizliğinin çözüm kümesini bulunuz.", r"$-2x > 8 \Rightarrow x < -4$ (negatife bölünce yön değişti) → $(-\infty, -4)$.")],
  [r"$|x|$: sıfıra uzaklık; $|x - c| \le a$ → $c - a \le x \le c + a$.", "Negatifle çarpma/bölmede eşitsizlik yönü değişir.", r"$|x| > a$ → $x < -a$ veya $x > a$."]),
O("k5", "4.5", "Bileşke ve ters fonksiyon", "Composite and inverse functions", r"""
# Bileşke Fonksiyon
$$(f \circ g)(x) = f(g(x))$$
Önce **g**, sonra **f** uygulanır. Genelde $f \circ g \neq g \circ f$ (değişme özelliği yok), ama **birleşme** özelliği vardır.

**Örnek:** $f(x) = 2x + 1$, $g(x) = x^2$ → $(f\circ g)(x) = 2x^2 + 1$, $(g\circ f)(x) = (2x+1)^2$

# Ters Fonksiyon
$f$ **bire bir ve örten** ise tersi vardır: $f(a) = b \iff f^{-1}(b) = a$.
**Bulma adımları:** $y = f(x)$ yaz → $x$'i yalnız bırak → $x$ ile $y$'nin yerini değiştir.
- $f(x) = 3x - 6 \Rightarrow x = \dfrac{y + 6}{3} \Rightarrow f^{-1}(x) = \dfrac{x + 6}{3}$
- $f(x) = \dfrac{ax + b}{cx + d} \Rightarrow f^{-1}(x) = \dfrac{-dx + b}{cx - a}$ (a ile d yer ve işaret değiştirir)

# Özellikler
- $(f \circ f^{-1})(x) = x$ (**birim fonksiyon**)
- $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$
- $f$ ve $f^{-1}$ grafikleri $y = x$ doğrusuna göre **simetriktir**.
""",
  [(r"$f(x) = x + 3$ ve $g(x) = 2x - 1$ ise $(f \circ g)(4)$ ve $(g \circ f)(4)$ değerlerini bulunuz.", r"$g(4) = 7 \Rightarrow f(7) = 10$. $f(4) = 7 \Rightarrow g(7) = 13$. Sonuçlar farklı: bileşkede sıra önemlidir."),
   (r"$f(x) = \dfrac{2x + 1}{x - 3}$ ise $f^{-1}(x)$ nedir?", r"$a = 2, d = -3$: $f^{-1}(x) = \frac{3x + 1}{x - 2}$.")],
  [r"$(f\circ g)(x) = f(g(x))$; önce g.", "Ters fonksiyon için f bire bir ve örten olmalı.", r"f ile $f^{-1}$ grafikleri $y = x$'e göre simetrik."]),
],
}
