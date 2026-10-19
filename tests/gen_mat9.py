# -*- coding: utf-8 -*-
"""9. Sınıf Matematik konu anlatım notlarını (PDF) sitenin içerik biçimine çevirir.
Metinler Markdown + LaTeX; çıktı: js/data/content/mat-9.js"""
import json, pathlib

def O(id, code, tr, en, anlatim, ornekler=(), ozet=()):
    o = {"id": id, "code": code, "title": {"tr": tr, "en": en},
         "content": {"anlatim": anlatim.strip(), "ornekler": [{"soru": q.strip(), "cozum": a.strip()} for q, a in ornekler],
                     "ozet": [s.strip() for s in ozet]}}
    return o

units = []

# ---------------------------------------------------------------- 1. TEMA
units.append({"id": "t1", "name": {"tr": "1. Tema: Sayılar", "en": "Theme 1: Numbers"}, "outcomes": [
O("k1", "MAT.9.1.1",
  "Gerçek sayıların üslü ve köklü gösterimleriyle yapılan işlemlere dair muhakeme yapabilme",
  "Reasoning about operations with exponential and radical forms of real numbers",
  r"""
Bu temada gerçek sayıların üslü ve köklü gösterimleri, aralıklar, sayı kümeleri ve işlem özelliklerinin cebirsel ifadesi ele alınır. Öğrencilerden matematiksel muhakeme, küme sembollerini kullanma ve analojik akıl yürütme becerileri beklenir.

# 1. Üslü Gösterim (Kuvvet)

$a$ bir gerçek sayı, $n$ pozitif tam sayı olmak üzere $n$ tane $a$'nın çarpımı $a$'nın $n$. kuvveti olarak adlandırılır:

$$a^n = \underbrace{a \cdot a \cdot a \cdots a}_{n \text{ tane}}$$

$a$ **taban**, $n$ **üs (kuvvet)** olarak isimlendirilir.

**Temel özellikler:**

- $a^0 = 1 \quad (a \neq 0)$
- $a^{-n} = \dfrac{1}{a^n} \quad (a \neq 0)$
- $a^m \cdot a^n = a^{m+n}$
- $\dfrac{a^m}{a^n} = a^{m-n} \quad (a \neq 0)$
- $(a^m)^n = a^{mn}$
- $(a \cdot b)^n = a^n \cdot b^n$
- $\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n} \quad (b \neq 0)$
- $0^b = 0 \quad (b > 0)$

**Üslü gösterimlerle toplama-çıkarma:** Aynı tabanlı ve aynı üslü terimler ortak çarpan parantezine alınır:

$$a \cdot x^n + b \cdot x^n = (a + b) \cdot x^n$$

$$a \cdot x^n - b \cdot x^n = (a - b) \cdot x^n$$

**Bilimsel (standart) gösterim:** Çok büyük veya çok küçük sayılar $a \cdot 10^n$ biçiminde yazılır ($1 \leq |a| < 10,\ n \in \mathbb{Z}$).

- Uranüs-Dünya uzaklığı: $2{,}57 \cdot 10^{9}$ km
- Nötron kütlesi: $1{,}675 \cdot 10^{-24}$ g

# 2. Köklü Gösterim

$n \in \mathbb{N}$, $a \geq 0$ için $\sqrt[n]{a} = b \iff b^n = a$ ve $b \geq 0$ ($n$ çift ise). $n$ tek ise $a$ negatif olabilir.

**Temel özellikler:**

- $\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{a \cdot b}$
- $\dfrac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\dfrac{a}{b}} \quad (b \neq 0)$
- $\sqrt[n]{a^m} = a^{m/n}$ (uygun koşullarda)
- $\sqrt[m]{\sqrt[n]{a}} = \sqrt[m \cdot n]{a}$
- $\left(\sqrt[n]{a}\right)^n = a$

**Eşlenik ile çarpma (paydayı rasyonelleştirme):**

$$\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a} \qquad \frac{1}{\sqrt{a} + \sqrt{b}} = \frac{\sqrt{a} - \sqrt{b}}{a - b}$$
""",
  [(r"Aşağıdaki üslü ifadelerin değerlerini bulunuz: $\left(\tfrac{1}{2}\right)^4$, $(-2)^5$, $(-1)^6$, $-3^4$",
    r"$\left(\tfrac{1}{2}\right)^4 = \tfrac{1}{16}$, $(-2)^5 = -32$, $(-1)^6 = 1$, $-3^4 = -81$ (önce kuvvet alınır, sonra işaret uygulanır)."),
   (r"Negatif üslü ifadeleri hesaplayınız: $4^{-1}$, $3^{-2}$, $(-5)^{-3}$, $\left(\tfrac{1}{3}\right)^{-2}$",
    r"$4^{-1} = \tfrac{1}{4}$, $3^{-2} = \tfrac{1}{9}$, $(-5)^{-3} = -\tfrac{1}{125}$, $\left(\tfrac{1}{3}\right)^{-2} = 9$"),
   (r"İşlemleri yapınız: $3 \cdot 5^{10} + 5^{10}$ ve $5 \cdot 7^{12} - 2 \cdot 7^{12}$",
    r"Ortak çarpan parantezine alınır: $3 \cdot 5^{10} + 5^{10} = (3+1) \cdot 5^{10} = 4 \cdot 5^{10}$ ve $5 \cdot 7^{12} - 2 \cdot 7^{12} = (5-2) \cdot 7^{12} = 3 \cdot 7^{12}$"),
   (r"Kökleri sadeleştiriniz: $\sqrt{49}$, $\sqrt{1{,}69}$, $-\sqrt{\tfrac{64}{81}}$, $\sqrt{8}$, $\sqrt{12}$, $\sqrt{50}$",
    r"$\sqrt{49} = 7$ (rasyonel), $\sqrt{1{,}69} = 1{,}3$ (rasyonel), $-\sqrt{\tfrac{64}{81}} = -\tfrac{8}{9}$ (rasyonel), $\sqrt{8} = 2\sqrt{2}$, $\sqrt{12} = 2\sqrt{3}$, $\sqrt{50} = 5\sqrt{2}$ (irrasyonel)")],
  [r"$a^m \cdot a^n = a^{m+n}$, $\;\dfrac{a^m}{a^n} = a^{m-n}$, $\;(a^m)^n = a^{mn}$",
   r"$a^0 = 1$ ve $a^{-n} = \dfrac{1}{a^n}$ $(a \neq 0)$",
   r"$-3^4 = -81$ ama $(-3)^4 = 81$: önce kuvvet, sonra işaret.",
   r"Bilimsel gösterim: $a \cdot 10^n$, $1 \leq |a| < 10$",
   r"$\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{ab}$ ve $\sqrt[n]{a^m} = a^{m/n}$",
   r"$\dfrac{1}{\sqrt{a} + \sqrt{b}} = \dfrac{\sqrt{a} - \sqrt{b}}{a - b}$ (eşlenikle çarpma)"]),

O("k2", "MAT.9.1.2",
  "Gerçek sayı aralıklarının gösteriminde ve aralıklarla ilgili işlemlerde küme sembol ve işlemlerinden yararlanabilme",
  "Using set symbols and operations to represent real-number intervals and operate on them",
  r"""
# Aralık Türleri

- **Açık aralık:** $(a, b) = \{x \in \mathbb{R} \mid a < x < b\}$
- **Kapalı aralık:** $[a, b] = \{x \in \mathbb{R} \mid a \leq x \leq b\}$
- **Yarı açık:** $[a, b) = \{x \in \mathbb{R} \mid a \leq x < b\}$
- **Yarı açık:** $(a, b] = \{x \in \mathbb{R} \mid a < x \leq b\}$
- **Sonsuz aralıklar:** $(-\infty, a)$, $(-\infty, a]$, $(a, \infty)$, $[a, \infty)$, $(-\infty, \infty) = \mathbb{R}$

# Küme Sembolleri

- $\in$ : elemanıdır, $\notin$ : elemanı değildir
- $\emptyset$ : boş küme
- $\subset$ : alt küme, $\subsetneq$ : öz alt küme
- $\cup$ : birleşim, $\cap$ : kesişim, $\setminus$ : fark
- $A'$ veya $A^c$ : tümleyen
- $s(A)$ veya $|A|$ : eleman sayısı

# Sayı Doğrusu Gösterimi

Açık uçlar boş daire (○), kapalı uçlar dolu daire (●) ile gösterilir. Sonsuz aralıklar ok ile devam eder.
""",
  [(r"$(-2, 5) \cap [0, 8)$ aralığını bulunuz.", r"İki aralığın ortak kısmı $[0, 5)$'tir. $0$ ikinci aralıkta dahil olduğu için kapalı, $5$ birinci aralıkta dahil olmadığı için açık uçtur."),
   (r"$(-\infty, 3) \cup [1, \infty)$ aralığını bulunuz.", r"İki aralık birlikte tüm sayı doğrusunu kaplar: $(-\infty, 3) \cup [1, \infty) = \mathbb{R}$"),
   (r"$[-1, 4) \setminus (0, 2]$ aralığını bulunuz.", r"$[-1, 4)$ aralığından $(0, 2]$ çıkarılır: $[-1, 0] \cup (2, 4)$")],
  [r"Açık uç $( \;)$ → sayı dahil değil (○); kapalı uç $[ \;]$ → sayı dahil (●).",
   r"$\infty$ ve $-\infty$ her zaman açık parantezle yazılır.",
   r"Kesişim $\cap$ ortak kısım, birleşim $\cup$ tümü, fark $\setminus$ ilkinden ikincisini çıkarır."]),

O("k3", "MAT.9.1.3",
  "Farklı sayı kümelerinin özellikleri hakkında muhakeme yapabilme",
  "Reasoning about the properties of different number sets",
  r"""
# Temel Sayı Kümeleri

- $\mathbb{N} = \{1, 2, 3, \ldots\}$ (Doğal sayılar – bazı kaynaklarda 0 dahil)
- $\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$ (Tam sayılar)
- $\mathbb{Q} = \left\{\dfrac{p}{q} \;\middle|\; p \in \mathbb{Z},\ q \in \mathbb{Z},\ q \neq 0\right\}$ (Rasyonel sayılar)
- $\mathbb{Q}' = \mathbb{R} \setminus \mathbb{Q}$ (İrrasyonel sayılar: $\sqrt{2}$, $\pi$, $e$, …)
- $\mathbb{R} = \mathbb{Q} \cup \mathbb{Q}'$ (Gerçek sayılar)

# İlişkiler

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$$

$$\mathbb{Q} \cap \mathbb{Q}' = \emptyset \quad \text{ve} \quad \mathbb{Q} \cup \mathbb{Q}' = \mathbb{R}$$

# Kapalılık Özellikleri

- $\mathbb{N}$ toplama ve çarpmaya göre kapalıdır, çıkarma ve bölmeye göre değildir.
- $\mathbb{Z}$ toplama, çıkarma ve çarpmaya göre kapalıdır, bölmeye göre değildir.
- $\mathbb{Q}$ dört işleme göre (bölmede sıfır hariç) kapalıdır.
- $\mathbb{R}$ dört işleme göre (bölmede sıfır hariç) kapalıdır.

# Mutlak Değer

$$|a| = \begin{cases} a, & a \geq 0 \\ -a, & a < 0 \end{cases}$$

**Özellikler:** $|a| \geq 0$, $\;|a| = |-a|$, $\;|a \cdot b| = |a| \cdot |b|$, $\;\left|\dfrac{a}{b}\right| = \dfrac{|a|}{|b|}$
""",
  [],
  [r"$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$",
   r"$\mathbb{Q} \cap \mathbb{Q}' = \emptyset$, $\;\mathbb{Q} \cup \mathbb{Q}' = \mathbb{R}$",
   r"$\mathbb{Z}$ bölmeye göre kapalı değildir; $\mathbb{Q}$ ve $\mathbb{R}$ dört işleme göre (sıfıra bölme hariç) kapalıdır.",
   r"$|a| \geq 0$ ve $|a \cdot b| = |a| \cdot |b|$"]),

O("k4", "MAT.9.1.4",
  "Gerçek sayıların işlem özelliklerini cebirsel olarak ifade etmede analojik akıl yürütebilme",
  "Using analogical reasoning to express the properties of real-number operations algebraically",
  r"""
# Temel Özdeşlikler

$$(a + b)^2 = a^2 + 2ab + b^2$$

$$(a - b)^2 = a^2 - 2ab + b^2$$

$$a^2 - b^2 = (a - b)(a + b) \quad \text{(İki kare farkı)}$$

$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$

$$(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$

$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$

$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$

# İşlem Özellikleri (Cebirsel İfade)

- **Değişme (komütatif):** $a + b = b + a$, $\;a \cdot b = b \cdot a$
- **Birleşme (asosiyatif):** $(a + b) + c = a + (b + c)$
- **Dağılma (distribütif):** $a \cdot (b + c) = a \cdot b + a \cdot c$
- **Birim eleman:** $a + 0 = a$, $\;a \cdot 1 = a$
- **Ters eleman:** $a + (-a) = 0$, $\;a \cdot \dfrac{1}{a} = 1 \quad (a \neq 0)$

# Önerme ve Mantık Bağlaçları (Bu temada giriş)

- $\land$ (ve), $\lor$ (veya), $\neg$ (değil), $\Rightarrow$ (ise), $\Leftrightarrow$ (ancak ve ancak)
- $\forall$ (her), $\exists$ (bazı / vardır)
""",
  [],
  [r"$(a \pm b)^2 = a^2 \pm 2ab + b^2$",
   r"$a^2 - b^2 = (a - b)(a + b)$",
   r"$a^3 \mp b^3 = (a \mp b)(a^2 \pm ab + b^2)$",
   r"Dağılma: $a(b + c) = ab + ac$"]),
]})

# ---------------------------------------------------------------- 2. TEMA
units.append({"id": "t2", "name": {"tr": "2. Tema: Nicelikler ve Değişimler", "en": "Theme 2: Quantities and Change"}, "outcomes": [
O("k1", "MAT.9.2.1",
  "Doğrusal referans fonksiyon ve türetilen doğrusal fonksiyonların nitel özelliklerine ilişkin matematiksel muhakeme yapabilme",
  "Reasoning about the qualitative properties of the linear reference function and linear functions derived from it",
  r"""
Bu temada doğrusal fonksiyonlar, mutlak değer fonksiyonu ve bunların nitel özellikleri ile denklem-eşitsizlik problemleri incelenir.

# Referans Fonksiyon

$$f : \mathbb{R} \to \mathbb{R}, \quad f(x) = x$$

Bu fonksiyon orijinden geçen, eğimi 1 olan doğrudur. Artan, bire bir ve örten bir fonksiyondur.

# Genel Doğrusal Fonksiyon

$$h(x) = ax + b \quad (a \neq 0)$$

veya dönüşümlerle:

$$g(x) = a \cdot f(x \pm r) \pm k = a(x \pm r) \pm k$$

# Nitel Özellikler

- **Eğim ($a$):** Doğrunun eğimini belirler. $a > 0$ ise artan, $a < 0$ ise azalan.
- **Sabit terim ($b$):** $y$-eksenini kestiği nokta $(0, b)$.
- **Sıfır (kök):** $f(x) = 0$ sağlayan $x$ değeri: $x = -\dfrac{b}{a}$
- **Artanlık-azalanlık:** $a > 0 \Rightarrow$ artan; $a < 0 \Rightarrow$ azalan
- **Bire birlik:** Doğrusal fonksiyonlar ($a \neq 0$) bire birdir.
- **İşaret:** $a > 0$ iken $x > -\dfrac{b}{a}$ için pozitif, $x < -\dfrac{b}{a}$ için negatif.

# Dönüşümler

- $f(x) + k$ : dikey öteleme (yukarı/aşağı)
- $f(x - r)$ : yatay öteleme (sağa/sola)
- $a \cdot f(x)$ : dikey genişleme/daralma ve yansıma ($a < 0$)
""",
  [(r"$f(x) = 2x - 4$ fonksiyonunun eğimini, $y$-kesişimini, kökünü ve işaretini inceleyiniz.",
    r"Eğim $= 2$ (artan), $y$-kesişimi $= -4$, kök: $2x - 4 = 0 \Rightarrow x = 2$. İşaret: $x > 2$ için pozitif, $x < 2$ için negatif.")],
  [r"$h(x) = ax + b$: $a$ eğim, $b$ $y$-kesişimi, kök $x = -\dfrac{b}{a}$",
   r"$a > 0$ → artan, $a < 0$ → azalan",
   r"$f(x) + k$ dikey, $f(x - r)$ yatay öteleme; $a \cdot f(x)$'te $a < 0$ ise yansıma"]),

O("k2", "MAT.9.2.2",
  "Mutlak değer fonksiyonlarının nitel özelliklerini incelemek için doğrusal fonksiyonlara bağlı analojik akıl yürütebilme",
  "Using analogical reasoning based on linear functions to study the qualitative properties of absolute value functions",
  r"""
# Temel Mutlak Değer Fonksiyonu

$$n(x) = |x| = \begin{cases} x, & x \geq 0 \\ -x, & x < 0 \end{cases}$$

Grafiği **V** şeklindedir. Tepe noktası $(0, 0)$'dır. Azalan ($x < 0$) ve artan ($x > 0$) parçalardan oluşur.

# Genel Biçim

$$m(x) = \pm |ax \pm b| \pm c \quad (a \neq 0)$$

# Nitel Özellikler

- **Tepe (köşe) noktası:** $|ax + b| = 0 \Rightarrow x = -\dfrac{b}{a}$ noktasında
- Minimum veya maksimum değeri $c$'ye göre belirlenir.
- Parçalı doğrusal fonksiyondur (iki doğrusal parçadan oluşur).
- $|ax + b|$ her zaman $\geq 0$'dır.
""",
  [(r"$f(x) = |x - 3| + 2$ fonksiyonunun tepe noktasını ve en küçük değerini bulunuz.",
    r"$x - 3 = 0 \Rightarrow x = 3$; tepe noktası $(3, 2)$. Minimum değer $2$'dir; her iki tarafta eğim $\pm 1$'dir."),
   (r"$g(x) = -|2x + 4| + 1$ fonksiyonunun tepe noktasını ve en büyük değerini bulunuz.",
    r"$2x + 4 = 0 \Rightarrow x = -2$; tepe noktası $(-2, 1)$. Önünde eksi olduğu için grafik aşağı doğru açılır; maksimum değer $1$'dir.")],
  [r"$|x|$ grafiği V şeklindedir; tepe noktası $(0, 0)$.",
   r"$|ax + b| + c$ için tepe noktası $\left(-\dfrac{b}{a},\ c\right)$",
   r"Önünde $+$ varsa en küçük değer, $-$ varsa en büyük değer $c$'dir."]),

O("k3", "MAT.9.2.3",
  "Doğrusal fonksiyonlarla ifade edilebilen denklem ve eşitsizlikler içeren problemleri çözebilme",
  "Solving problems with equations and inequalities expressible by linear functions",
  r"""
# Doğrusal Denklem

$$ax + b = 0 \;\Rightarrow\; x = -\frac{b}{a}$$

$$ax + b = cx + d \;\Rightarrow\; (a - c)x = d - b \;\Rightarrow\; x = \frac{d - b}{a - c}$$

# Doğrusal Eşitsizlik

$ax + b > 0$ (veya $<$, $\geq$, $\leq$)

Çözüm kümesi bir aralıktır. **Eşitsizlik yönü, her iki taraf negatif sayı ile çarpıldığında değişir.**

# Mutlak Değerli Denklem / Eşitsizlik

$$|ax + b| = c \;(c \geq 0) \;\Rightarrow\; ax + b = c \;\text{ veya }\; ax + b = -c$$

$$|ax + b| < c \;\Rightarrow\; -c < ax + b < c$$

$$|ax + b| > c \;\Rightarrow\; ax + b < -c \;\text{ veya }\; ax + b > c$$

# Problem Çözme Stratejisi

1. Problemi matematiksel dile çevir (fonksiyon veya denklem/eşitsizlik kur).
2. Bilinmeyenleri ve verilenleri belirle.
3. Denklemi/eşitsizliği çöz.
4. Çözümü problem bağlamında yorumla (birim, anlamlılık vb.).
""",
  [],
  [r"$ax + b = 0 \Rightarrow x = -\dfrac{b}{a}$",
   r"Negatif sayıyla çarpınca/bölünce eşitsizlik yön değiştirir.",
   r"$|ax + b| < c \Leftrightarrow -c < ax + b < c$",
   r"$|ax + b| > c \Leftrightarrow ax + b < -c$ veya $ax + b > c$"]),
]})

# ---------------------------------------------------------------- 3. TEMA
units.append({"id": "t3", "name": {"tr": "3. Tema: Geometrik Şekiller", "en": "Theme 3: Geometric Shapes"}, "outcomes": [
O("k1", "MAT.9.3.1",
  "Üçgende açı ve kenarla ilgili özellikleri, üçgenin açı ve kenarları arasındaki ilişkileri doğrulayabilme veya ispatlayabilme",
  "Verifying or proving angle and side properties of triangles and the relations between them",
  r"""
# Temel Kavramlar

- **İç açılar:** Üçgenin kenarları arasında kalan açılar. Toplamları $180^\circ$'dir.
- **Dış açı:** Bir kenarın uzantısı ile komşu kenar arasındaki açı. Dış açı = komşu olmayan iki iç açının toplamı.
- **Kenar:** İki köşeyi birleştiren doğru parçası. $|AB|$, $|BC|$, $|CA|$ ile gösterilir.

# Açı Özellikleri

1. Üçgenin iç açıları toplamı $180^\circ$'dir: $m(\widehat{A}) + m(\widehat{B}) + m(\widehat{C}) = 180^\circ$
2. Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir.
3. Üçgenin bir dış açısı, komşu iç açısından büyüktür.

# Kenar-Açı İlişkileri

- Bir üçgende büyük kenarın karşısındaki açı büyüktür (ve tersi).
- Eşit kenarların karşısındaki açılar eşittir (ikizkenar üçgen).
- Eşkenar üçgende tüm açılar $60^\circ$'dir.

# Üçgen Eşitsizliği

Herhangi bir üçgende iki kenarın toplamı üçüncü kenardan büyüktür:

$$|AB| + |BC| > |AC|, \quad |AB| + |AC| > |BC|, \quad |BC| + |AC| > |AB|$$

Ayrıca:

$$\big||AB| - |BC|\big| < |AC|$$

# Özel Üçgenler

- **İkizkenar:** İki kenar eşit → taban açıları eşit
- **Eşkenar:** Üç kenar eşit → üç açı $60^\circ$
- **Dik üçgen:** Bir açı $90^\circ$ → Pisagor bağıntısı geçerli

# İspat Örneği (İç Açılar Toplamı)

Bir köşeden karşı kenara paralel çizilerek veya dış açı kullanılarak ispatlanabilir. Paralel doğrular arasında kalan iç ters açılar eşitliğinden yararlanılır.
""",
  [],
  [r"İç açılar toplamı $180^\circ$; dış açı = komşu olmayan iki iç açının toplamı",
   r"Büyük kenarın karşısında büyük açı bulunur.",
   r"Üçgen eşitsizliği: $\big|a - b\big| < c < a + b$"]),
]})

# ---------------------------------------------------------------- 4. TEMA
units.append({"id": "t4", "name": {"tr": "4. Tema: Eşlik ve Benzerlik", "en": "Theme 4: Congruence and Similarity"}, "outcomes": [
O("k1", "MAT.9.4.1",
  "Geometrik dönüşümlerle ilgili çıkarım yapabilme",
  "Making inferences about geometric transformations",
  r"""
# 1. Yansıma Dönüşümü (Simetri)

Bir doğruya (yansıma doğrusu) göre simetri. Nokta ile görüntüsü, yansıma doğrusuna eşit uzaklıktadır ve birleştiren doğru parçası doğruya diktir.

**Korunan özellikler:** Kenar uzunlukları, açı ölçüleri, alan, çevre, noktalar arası uzaklık. Şekil ile görüntüsü eştir ($\cong$).

# 2. Öteleme Dönüşümü

Şekil, belirli bir doğrultuda ve uzaklıkta kaydırılır. Her nokta aynı vektör kadar yer değiştirir.

**Korunan özellikler:** Tüm uzunluklar, açılar, alan, yön (oryantasyon). Şekil ile görüntüsü eştir.

# 3. Dönme Dönüşümü

Şekil, bir merkez nokta etrafında belirli bir açı kadar döndürülür. Her noktanın merkeze uzaklığı korunur.

**Korunan özellikler:** Uzunluklar, açılar, alan. Yön korunabilir veya değişebilir. Şekil ile görüntüsü eştir.

> **Önemli:** Yansıma, öteleme ve dönme uzaklık koruyan (izometri) dönüşümlerdir. Eş şekiller üretirler.
""",
  [],
  [r"Yansıma, öteleme ve dönme **izometridir**: uzunluk, açı ve alan korunur; görüntü şekle eştir.",
   r"Yansımada nokta ile görüntüsünü birleştiren doğru parçası yansıma doğrusuna diktir ve doğru onu ortalar.",
   r"Ötelemede her nokta aynı vektör kadar kayar; dönmede merkeze uzaklık korunur."]),

O("k2", "",
  "İki üçgenin eş veya benzer olması için gerekli asgari koşullarla ilgili çıkarım yapabilme",
  "Making inferences about the minimum conditions for two triangles to be congruent or similar",
  r"""
# Eşlik ($\cong$)

İki üçgenin karşılıklı kenarları ve açıları eşitse eştir.

**Eşlik koşulları (yeterli):**

- **KAK (Kenar-Açı-Kenar):** İki kenar ve aralarındaki açı eşit
- **AKA (Açı-Kenar-Açı):** İki açı ve aralarındaki kenar eşit
- **KKK (Kenar-Kenar-Kenar):** Üç kenar eşit
- **KKA (Kenar-Kenar-Açı):** İki kenar ve büyük kenara karşı açı eşit (dikkatli kullanılmalı)

# Benzerlik ($\sim$)

İki üçgenin karşılıklı açıları eşit ve kenarları orantılıysa benzerdir.

**Benzerlik koşulları:**

- **AA (Açı-Açı):** İki açı eşit → üçüncü de eşit → benzer
- **KAK (Kenar-Açı-Kenar orantılı):** İki kenar orantılı ve aradaki açı eşit
- **KKK (Kenar orantılı):** Üç kenar orantılı

# Benzerlik Oranı

$k$ = karşılıklı kenarların oranı.

$$\text{Çevre oranı} = k, \qquad \text{Alan oranı} = k^2$$
""",
  [],
  [r"Eşlik: KAK, AKA, KKK (KKA dikkatli kullanılır).",
   r"Benzerlik: AA, KAK (orantılı), KKK (orantılı).",
   r"Benzerlik oranı $k$ ise çevreler oranı $k$, alanlar oranı $k^2$."]),

O("k3", "",
  "Bir üçgenden hareketle ona benzer üçgenler oluşturma ile ilgili yansıtma yapabilme",
  "Reflecting on constructing triangles similar to a given triangle",
  r"""
Bir üçgene benzer yeni üçgenler oluşturmak için kenarları **aynı oranda** büyüterek/küçülterek veya **açıları koruyarak** çizim yapılabilir. Bunun için homoteti (benzerlik dönüşümü) kullanılır.
""",
  [(r"Bir üçgenin kenarları 2 katına çıkarılarak yeni bir üçgen çiziliyor. Benzerlik oranı ve alan nasıl değişir?",
    r"Benzer ve daha büyük bir üçgen elde edilir. Benzerlik oranı $k = 2$ olduğundan alan $k^2 = 4$ katına çıkar.")],
  [r"Kenarlar aynı oranda büyütülür/küçültülürse veya açılar korunursa benzer üçgen elde edilir.",
   r"Kenarlar $k$ katına çıkarsa alan $k^2$ katına çıkar."]),

O("k4", "",
  "Tales, Öklid ve Pisagor teoremlerini ispatlayabilme",
  "Proving the Thales, Euclid and Pythagorean theorems",
  r"""
# Tales Teoremi

Bir üçgenin iki kenarını kesen ve üçüncü kenara paralel olan doğru, diğer iki kenarı orantılı böler:

$$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|} \qquad (BC \parallel DE \text{ ise})$$

*Genelleme:* Paralel doğrular, kesenler üzerinde orantılı parçalar oluşturur.

# Öklid Teoremi (Dik Üçgende)

Dik üçgende dik kenarların karesi, hipotenüse ait izdüşüm ile hipotenüsün çarpımına eşittir:

$$a^2 = p \cdot c, \qquad b^2 = q \cdot c \qquad (c \text{ hipotenüs; } p \text{ ve } q \text{ izdüşümler})$$

Ayrıca hipotenüse ait yükseklik için:

$$h^2 = p \cdot q$$

# Pisagor Teoremi

Dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir:

$$a^2 + b^2 = c^2$$

*İspat:* Öklid teoreminden veya benzer üçgenlerden elde edilebilir.
""",
  [],
  [r"Tales: $BC \parallel DE \Rightarrow \dfrac{|AD|}{|DB|} = \dfrac{|AE|}{|EC|}$",
   r"Öklid: $a^2 = p \cdot c$, $\;b^2 = q \cdot c$, $\;h^2 = p \cdot q$",
   r"Pisagor: $a^2 + b^2 = c^2$"]),

O("k5", "",
  "Eşlik ve benzerlikle ilgili çıkarım ve teoremleri içeren problemleri çözebilme",
  "Solving problems involving inferences and theorems on congruence and similarity",
  r"""
# Problem Çözme Adımları

1. Şekli incele, bilinen açı ve kenarları işaretle.
2. Eşlik veya benzerlik koşulunu belirle (AA, KAK, KKK vb.).
3. Orantı yaz veya eş kenar/açıları eşitle.
4. Tales, Öklid veya Pisagor'u uygula.
5. Sonucu kontrol et.
""",
  [],
  [r"Önce koşulu belirle (AA, KAK, KKK), sonra orantı kur.",
   r"Dik üçgen varsa Pisagor ve Öklid'i, paralel doğru varsa Tales'i düşün."]),
]})

# ---------------------------------------------------------------- 5. TEMA
units.append({"id": "t5", "name": {"tr": "5. Tema: Algoritma ve Bilişim", "en": "Theme 5: Algorithms and Informatics"}, "outcomes": [
O("k1", "MAT.9.5.1",
  "Algoritma temelli yaklaşımlarla problem çözebilme",
  "Solving problems with algorithm-based approaches",
  r"""
# Algoritma Nedir?

Bir problemi çözmek veya belirli bir amaca ulaşmak için izlenen **sonlu, sıralı ve açık** adımlar dizisidir.

# Algoritma Gösterim Biçimleri

- **Sözde kod (pseudocode):** Programlama diline yakın, doğal dilde yazılmış adımlar.
- **Akış şeması:** Şekillerle (oval, dikdörtgen, elmas, ok) görsel gösterim.
- **Çizge:** Düğüm ve kenarlarla ilişki gösterimi.

# Akış Şeması Sembolleri

| Sembol | Anlamı |
|---|---|
| Oval | Başla / Bitir |
| Dikdörtgen | İşlem |
| Paralelkenar | Girdi / Çıktı |
| Elmas (baklava) | Karar (evet/hayır) |
| Ok | Akış yönü |
""",
  [(r"İki sayının en büyüğünü bulan algoritmayı yazınız.",
    "1. Başla\n2. $a$ ve $b$ sayılarını oku\n3. Eğer $a > b$ ise $a$'yı yaz, değilse $b$'yi yaz\n4. Bitir")],
  [r"Algoritma: sonlu, sıralı ve açık adımlar dizisi.",
   r"Akış şemasında oval başla/bitir, dikdörtgen işlem, paralelkenar girdi/çıktı, elmas karar."]),

O("k2", "MAT.9.5.2",
  "Algoritmik yapılar içerisindeki mantık bağlaçları ve niceleyicileri çözümleyebilme",
  "Analysing logical connectives and quantifiers within algorithmic structures",
  r"""
# Mantık Bağlaçları

- $\land$ **(VE / AND):** Her iki önerme de doğruysa doğru
- $\lor$ **(VEYA / OR):** En az biri doğruysa doğru
- $\neg$ **(DEĞİL / NOT):** Önermenin tersi
- $\Rightarrow$ **(İSE / IMPLIES):** $p \Rightarrow q$ : $p$ doğru iken $q$ yanlışsa yanlış, diğer durumlarda doğru
- $\Leftrightarrow$ **(ANCAK VE ANCAK / IFF):** Her iki önerme aynı doğruluk değerine sahipse doğru

# Doğruluk Tablosu Örneği ($p \land q$)

| $p$ | $q$ | $p \land q$ |
|---|---|---|
| D | D | D |
| D | Y | Y |
| Y | D | Y |
| Y | Y | Y |

# Niceleyiciler

- $\forall$ **(Evrensel niceleyici – HER):** "Her $x$ için $P(x)$ doğrudur"
- $\exists$ **(Varoluşsal niceleyici – BAZI / VARDIR):** "En az bir $x$ vardır ki $P(x)$ doğrudur"
""",
  [(r"$\forall x \in \mathbb{R},\ x^2 \geq 0$ önermesini okuyup anlamını açıklayınız.",
    r"Her gerçek sayının karesi sıfırdan büyüktür veya sıfıra eşittir. Önerme doğrudur."),
   (r"$\exists x \in \mathbb{R},\ x^2 = 2$ önermesini okuyup anlamını açıklayınız.",
    r"Karesi 2 olan bir gerçek sayı vardır. Önerme doğrudur: $x = \sqrt{2}$.")],
  [r"$p \land q$ yalnızca ikisi de doğruysa doğru; $p \lor q$ en az biri doğruysa doğru.",
   r"$p \Rightarrow q$ yalnızca $p$ doğru, $q$ yanlışken yanlıştır.",
   r"$\forall$: her; $\exists$: en az bir tane vardır."]),

O("k3", "MAT.9.5.3",
  "Mantık bağlaçları ve niceleyicilerin algoritmalarda kullanımına yönelik deneyimi farklı matematiksel görevlere yansıtabilme",
  "Transferring experience with logical connectives and quantifiers in algorithms to other mathematical tasks",
  r"""
Algoritmalarda **karar yapıları** (if-else) mantık bağlaçlarıyla, **döngüler** ise niceleyicilerle ilişkilendirilebilir. Örneğin "tüm elemanlar için kontrol et" $\forall$ ile, "en az bir eleman bul" $\exists$ ile ifade edilir.

Şifreleme algoritmalarında da mantıksal işlemler (XOR vb.) kullanılır. Öğrenciler, algoritmik düşünmeyi matematiksel ispat ve problem çözmeye aktarabilir.
""",
  [],
  [r"Karar yapıları (if-else) ↔ mantık bağlaçları; döngüler ↔ niceleyiciler.",
   r"“Hepsi için kontrol et” → $\forall$, “en az bir tane bul” → $\exists$"]),
]})

# ---------------------------------------------------------------- 6. TEMA
units.append({"id": "t6", "name": {"tr": "6. Tema: İstatistiksel Araştırma Süreci", "en": "Theme 6: The Statistical Investigation Process"}, "outcomes": [
O("k1", "MAT.9.6.1",
  "Tek nicel değişkenli veri dağılımları ile çalışabilme ve tek nicel değişken içeren veriye dayalı karar verebilme",
  "Working with single quantitative variable distributions and making data-based decisions",
  r"""
# Temel Kavramlar

- **Evren (popülasyon):** İncelenen tüm birimlerin oluşturduğu küme.
- **Örneklem:** Evrenden seçilen alt küme.
- **Nicel veri:** Sayısal ölçülebilen veri (boy, ağırlık, not vb.).
- **Değişebilirlik:** Verilerin yayılımı / değişkenliği.

# Merkezî Eğilim Ölçüleri

- **Aritmetik ortalama:** Tüm verilerin toplamı / veri sayısı
- **Medyan:** Sıralı verinin ortasındaki değer
- **Mod:** En sık tekrar eden değer

# Yayılım Ölçüleri

- **Açıklık (range):** En büyük − en küçük
- **Çeyrekler açıklığı (IQR):** $Q_3 - Q_1$
- **Standart sapma:** Verilerin ortalamadan sapmalarının karekök ortalaması

# Görselleştirme

- **Histogram:** Sınıf aralıklarına göre frekans çubukları
- **Kutu grafiği (box-plot):** Min, $Q_1$, medyan, $Q_3$, max değerlerini gösterir. Aykırı değerleri ortaya çıkarır.

# Karar Verme

Veri dağılımına bakarak (simetrik, çarpık, çok tepeli vb.) ortalama mı medyan mı kullanılacağına, yayılımın fazla olup olmadığına karar verilir.
""",
  [],
  [r"Ortalama = toplam / veri sayısı; medyan = sıralı verinin ortası; mod = en sık değer",
   r"Açıklık = en büyük − en küçük; çeyrekler açıklığı = $Q_3 - Q_1$",
   r"Kutu grafiği: min, $Q_1$, medyan, $Q_3$, max; aykırı değerleri gösterir."]),

O("k2", "MAT.9.6.2",
  "Başkaları tarafından oluşturulan tek nicel değişkenli veri dağılımlarına dayalı istatistiksel sonuç veya yorumları tartışabilme",
  "Discussing statistical conclusions based on single-variable data distributions made by others",
  r"""
Başkalarının hazırladığı grafik, tablo veya özet istatistikleri incelerken şu sorular sorulur:

- Örneklem büyüklüğü yeterli mi?
- Örneklem rastgele ve temsil edici mi?
- Grafik yanıltıcı mı? (eksen kesme, ölçek vb.)
- Aykırı değerler var mı ve nasıl ele alınmış?
- Sonuçlar genellenebilir mi?
- Alternatif yorumlar mümkün mü?
""",
  [],
  [r"Örneklem yeterli ve temsil edici mi? Grafik ekseni kesilmiş ya da ölçeği yanıltıcı mı?",
   r"Aykırı değerler ve alternatif yorumlar sorgulanmalı."]),
]})

# ---------------------------------------------------------------- 7. TEMA
units.append({"id": "t7", "name": {"tr": "7. Tema: Veriden Olasılığa", "en": "Theme 7: From Data to Probability"}, "outcomes": [
O("k1", "MAT.9.7.1",
  "Olayların olasılığını gözleme dayalı tahmin edebilme",
  "Estimating the probability of events based on observation",
  r"""
# Temel Kavramlar

- **Deney:** Sonucu tesadüfe bağlı gözlem veya işlem
- **Çıktı (outcome):** Deneyin mümkün sonuçlarından her biri
- **Örnek uzay ($S$):** Tüm mümkün çıktıların kümesi
- **Olay ($A$):** Örnek uzayın bir alt kümesi

# Deneysel (Gözlemsel) Olasılık

$$P(A) \approx \frac{A \text{ olayının gerçekleşme sayısı}}{\text{Toplam deneme sayısı}}$$

Deneme sayısı arttıkça deneysel olasılık, teorik olasılığa yaklaşır (**Büyük Sayılar Yasası**).
""",
  [(r"Bir madeni para 100 kez atıldığında 56 yazı geldi. Yazı gelme olasılığını deneysel olarak tahmin ediniz.",
    r"$P(\text{Yazı}) \approx \dfrac{56}{100} = 0{,}56$")],
  [r"Deneysel olasılık = gerçekleşme sayısı / toplam deneme sayısı",
   r"Deneme sayısı arttıkça deneysel olasılık teorik olasılığa yaklaşır (Büyük Sayılar Yasası)."]),

O("k2", "MAT.9.7.2",
  "Olayların olasılığına ilişkin tümevarımsal akıl yürütebilme",
  "Inductive reasoning about the probability of events",
  r"""
# Teorik Olasılık

$$P(A) = \frac{A \text{ olayının elverişli çıktı sayısı}}{\text{Örnek uzayın eleman sayısı}} = \frac{n(A)}{n(S)}$$

$$0 \leq P(A) \leq 1, \qquad P(S) = 1, \qquad P(\emptyset) = 0$$

# Olay Türleri

- **Ayrık olaylar:** Ortak çıktısı olmayan olaylar ($A \cap B = \emptyset$)
- **Ayrık olmayan olaylar:** Ortak çıktısı olan olaylar

# Temel Olasılık Kuralları

- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- $A$ ve $B$ ayrık ise: $P(A \cup B) = P(A) + P(B)$
- $P(A') = 1 - P(A)$ (tümleyen)
- $P(A \cap B) = P(A) \cdot P(B)$ (bağımsız olaylar için)
""",
  [(r"Bir zar atıldığında tek sayı gelme olasılığı kaçtır?",
    r"$S = \{1, 2, 3, 4, 5, 6\}$, $A = \{1, 3, 5\}$, $P(A) = \dfrac{3}{6} = \dfrac{1}{2}$")],
  [r"$P(A) = \dfrac{n(A)}{n(S)}$ ve $0 \leq P(A) \leq 1$",
   r"$P(A \cup B) = P(A) + P(B) - P(A \cap B)$",
   r"$P(A') = 1 - P(A)$; bağımsız olaylarda $P(A \cap B) = P(A) \cdot P(B)$"]),
]})

header = '''/* =========================================================
   9. Sınıf Matematik — konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Matematik Konu Anlatım Notları"
   (MEB Türkiye Yüzyılı Maarif Modeli, 7 tema). Metinler Markdown + LaTeX.

   Biçim (curriculum-data.js ile aynı):
     ünite   = tema          { id, name, outcomes: [...] }
     kazanım = öğrenme çıktısı { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/matematik"] = '''
out = pathlib.Path("/home/claude/ders-asistani/js/data/content/mat-9.js")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(header + json.dumps(units, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
n = sum(len(u["outcomes"]) for u in units)
print("units", len(units), "outcomes", n, "bytes", out.stat().st_size,
      "examples", sum(len(o["content"]["ornekler"]) for u in units for o in u["outcomes"]))
