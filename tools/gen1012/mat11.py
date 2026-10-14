# -*- coding: utf-8 -*-
"""11. Sınıf Temel Matematik konu anlatım notları → js/data/content/mat-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema: Nicelikler ve Değişimler", "Theme 1: Quantities and Change", [
O("k1", "1.1", "Doğru orantılı değişimler ve doğrusal fonksiyonlar", "Direct proportion and linear functions", r"""
# Doğru Orantı
İki nicelik **doğru orantılı** ise biri kaç katına çıkarsa diğeri de o kadar katına çıkar; oranları sabittir:
$$\frac{y}{x} = a \quad\Rightarrow\quad y = ax$$
Grafik **orijinden geçen** bir doğrudur. Örnek: yol $=$ hız $\times$ zaman (sabit hızda), toplam fiyat $=$ birim fiyat $\times$ miktar.

# Doğrusal Fonksiyon
$$f(x) = ax + b$$
- $a$: **eğim** (değişim oranı) $= \dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$
- $b$: **y-eksenini kestiği nokta** (başlangıç değeri)
- $a > 0$ → **artan**, $a < 0$ → **azalan**, $a = 0$ → **sabit** fonksiyon.
- $b \neq 0$ ise ilişki doğrusal ama **doğru orantı değildir**.

# İki Noktası Bilinen Doğru
$(x_1, y_1)$ ve $(x_2, y_2)$'den geçen doğru: önce eğim $a$ bulunur, sonra $y - y_1 = a(x - x_1)$.

**Modelleme:** Bir taksi açılışta $30$ TL, kilometre başına $15$ TL alıyorsa ücret $f(x) = 15x + 30$.
""",
  [(r"Bir su deposunda $200$ L su var ve her dakika $8$ L su boşaltılıyor. Kalan suyu veren fonksiyonu yazınız; depo kaç dakikada boşalır?", r"$f(t) = 200 - 8t$ (eğim $-8$, azalan). $200 - 8t = 0 \Rightarrow t = 25$ dakika."),
   (r"$(2, 7)$ ve $(5, 16)$ noktalarından geçen doğrusal fonksiyonu bulunuz.", r"$a = \frac{16-7}{5-2} = 3$. $y - 7 = 3(x - 2) \Rightarrow f(x) = 3x + 1$.")],
  [r"Doğru orantı: $y=ax$, grafik orijinden geçer.", r"Doğrusal fonksiyon $f(x)=ax+b$; $a$ eğim, $b$ başlangıç değeri.", r"Eğim $=\Delta y/\Delta x$."]),
O("k2", "1.2", "Ters orantılı değişimler ve rasyonel fonksiyonlar", "Inverse proportion and rational functions", r"""
# Ters Orantı
Biri kaç katına çıkarsa diğeri o kadar katına **iner**; **çarpımları sabittir**:
$$x \cdot y = k \quad\Rightarrow\quad y = \frac{k}{x} \quad (k \neq 0)$$

**Örnekler:**
- Sabit yolda **hız ve zaman** ($v \cdot t = \text{yol}$)
- Bir işi bitiren **işçi sayısı ve süre**
- Sabit sıcaklıkta gazın **basıncı ve hacmi** (Boyle yasası: $P\cdot V = k$)
- Sabit bütçede **birim fiyat ve alınan miktar**

# $f(x) = \dfrac{k}{x}$ Fonksiyonunun Özellikleri
- $x = 0$'da **tanımsızdır**; tanım kümesi $\mathbb{R}\setminus\{0\}$.
- Grafik **hiperboldür**; eksenlere yaklaşır ama onları kesmez (eksenler **asimptot**).
- $k > 0$ ise kollar **I. ve III. bölgede**, $k < 0$ ise **II. ve IV. bölgede**.
- $k > 0$ iken pozitif $x$ değerlerinde fonksiyon **azalandır**.

**Genel rasyonel fonksiyon:** $f(x) = \dfrac{p(x)}{q(x)}$; paydayı sıfır yapan değerlerde tanımsızdır.
""",
  [(r"6 işçi bir işi 10 günde bitiriyor. Aynı hızda çalışan 15 işçi işi kaç günde bitirir?", r"İşçi sayısı ve süre ters orantılı: $6\cdot10 = 15\cdot t \Rightarrow t = 4$ gün."),
   (r"$f(x) = \frac{12}{x}$ için $f(3)$ ve $f(-4)$ değerlerini bulunuz; grafik hangi bölgelerdedir?", r"$f(3) = 4$, $f(-4) = -3$. $k = 12 > 0$ olduğundan grafik **I. ve III.** bölgelerdedir.")],
  [r"Ters orantı: $xy=k$, $y=k/x$.", "Grafik hiperbol; $x=0$'da tanımsız.", "Örnekler: hız–zaman, işçi–gün, Boyle yasası."]),
O("k3", "1.3", "Doğrusal ve rasyonel denklem–eşitsizlik problemleri", "Problems with linear and rational equations and inequalities", r"""
# Modelleme Adımları
1. **Bilinmeyeni** belirle ve harfle göster.
2. Verilenleri kullanarak **denklem ya da eşitsizlik** kur.
3. **Çöz.**
4. Sonucu **gerçek duruma uygunluk** açısından kontrol et (negatif süre, kesirli kişi sayısı olamaz).

# Problem Türleri
| Tür | Temel ilişki |
|---|---|
| **Maliyet–kâr** | Gelir $=$ fiyat $\times$ adet; kâr $=$ gelir $-$ maliyet |
| **Hareket** | yol $=$ hız $\times$ zaman |
| **İş** | Bir işi $a$ günde bitiren kişi 1 günde işin $\frac1a$'ini yapar; birlikte: $\frac1a + \frac1b = \frac1t$ |
| **Karışım** | Saf madde $=$ yüzde $\times$ toplam miktar |

# Doğrusal Eşitsizlikler
Çözümde negatif bir sayıyla çarpar ya da bölersen **eşitsizlik yön değiştirir**.

**Örnek:** Bir firma ürün başına $40$ TL maliyetle üretip $65$ TL'ye satıyor; sabit gideri $5000$ TL. Kâr etmek için en az kaç ürün satılmalı?
$$65x - (40x + 5000) > 0 \Rightarrow 25x > 5000 \Rightarrow x > 200$$
En az **201** ürün.
""",
  [(r"Bir musluk havuzu 6 saatte, ikinci musluk 3 saatte dolduruyor. İkisi birlikte kaç saatte doldurur?", r"$\frac16 + \frac13 = \frac16 + \frac26 = \frac36 = \frac12$ → birlikte **2 saatte** doldururlar."),
   (r"$\frac{x+2}{x-1} = 3$ denklemini çözünüz.", r"$x \neq 1$. $x + 2 = 3x - 3 \Rightarrow 2x = 5 \Rightarrow x = \frac52$.")],
  ["Bilinmeyen → denklem → çözüm → gerçekliğe uygunluk.", r"İş problemi: $\frac1a+\frac1b=\frac1t$.", "Negatifle çarpınca eşitsizlik yön değiştirir."]),
]),
U("u2", "2. Tema: Geometrik Şekiller — Dörtgenler", "Theme 2: Geometric Shapes — Quadrilaterals", [
O("k1", "2.1", "Dörtgenler ve özel dörtgenlerin özellikleri", "Quadrilaterals and their properties", r"""
# Dörtgen
Dört kenarlı çokgen. **İç açıları toplamı $360°$**, dış açıları toplamı $360°$. Bir dörtgenin **2 köşegeni** vardır.

| Dörtgen | Kenarlar | Açılar | Köşegenler | Alan |
|---|---|---|---|---|
| **Yamuk** | **Yalnız bir çift** kenar paralel | Paralel kenarlara komşu açılar toplamı $180°$ | — | $\dfrac{(a+c)}{2}\cdot h$ |
| **İkizkenar yamuk** | Paralel olmayan kenarlar eşit | Taban açıları eşit | **Eşit** | $\dfrac{(a+c)}{2}\cdot h$ |
| **Paralelkenar** | Karşılıklı kenarlar **paralel ve eşit** | Karşılıklı açılar eşit, komşu açılar toplamı $180°$ | Birbirini **ortalar** | taban $\times$ yükseklik |
| **Dikdörtgen** | Karşılıklı kenarlar eşit | Hepsi $90°$ | **Eşit** ve birbirini ortalar | $a \cdot b$ |
| **Eşkenar dörtgen** | **Tüm kenarlar eşit** | Karşılıklı açılar eşit | Birbirini **dik** ortalar, açıortaydır | $\dfrac{e \cdot f}{2}$ |
| **Kare** | Tüm kenarlar eşit | Hepsi $90°$ | Eşit, dik, birbirini ortalar | $a^2 = \dfrac{e^2}{2}$ |
| **Deltoid** | İki çift **komşu** kenar eşit | Eşit kenarlar arasındaki açılar dışındaki açılar eşit | **Dik**; biri diğerini ortalar | $\dfrac{e \cdot f}{2}$ |

> Hiyerarşi: Kare hem dikdörtgen hem eşkenar dörtgendir; dikdörtgen ve eşkenar dörtgen birer paralelkenardır.

**Yamukta orta taban:** $\dfrac{a + c}{2}$. **Dikdörtgende köşegen:** $\sqrt{a^2 + b^2}$.
""",
  [(r"Köşegen uzunlukları $10$ cm ve $24$ cm olan eşkenar dörtgenin alanı ve bir kenar uzunluğu nedir?", r"Alan $= \frac{10\cdot24}{2} = 120$ cm². Köşegenler birbirini dik ortaladığından kenar $= \sqrt{5^2 + 12^2} = 13$ cm."),
   (r"Tabanları $8$ ve $14$ cm, yüksekliği $5$ cm olan yamuğun alanı nedir?", r"$A = \frac{8+14}{2}\cdot5 = 55$ cm².")],
  [r"Dörtgende iç açılar toplamı $360°$.", "Paralelkenarda köşegenler ortalar; dikdörtgende eşit; eşkenar dörtgende dik.", r"Alanlar: yamuk $\frac{a+c}2h$, eşkenar dörtgen $\frac{ef}2$."]),
]),
U("u3", "3. Tema: Üçgenler ve Benzerlik", "Theme 3: Triangles and Similarity", [
O("k1", "3.1", "Üçgen eşitsizliği, açı–kenar ilişkisi ve Pisagor", "Triangle inequality, angle–side relation, Pythagoras", r"""
# Üçgen Eşitsizliği
Kenarları $a, b, c$ olan bir üçgen için:
$$|b - c| < a < b + c$$
Bir kenar, diğer ikisinin **farkından büyük, toplamından küçük** olmalıdır.

# Açı–Kenar İlişkisi
Büyük açı karşısında **büyük kenar**, küçük açı karşısında **küçük kenar** bulunur. İç açıların toplamı $180°$; bir dış açı kendisine komşu olmayan iki iç açının toplamına eşittir.

# Pisagor Bağıntısı
Dik üçgende:
$$a^2 + b^2 = c^2 \quad (c: \text{hipotenüs})$$
**Pisagor üçlüleri:** $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$ ve katları.

**Özel dik üçgenler:**
- $30°$–$60°$–$90°$: kenarlar $1 : \sqrt3 : 2$
- $45°$–$45°$–$90°$: kenarlar $1 : 1 : \sqrt2$
""",
  [(r"Kenarları $5$ ve $9$ cm olan bir üçgenin üçüncü kenarı tam sayı ise kaç farklı değer alabilir?", r"$9 - 5 < x < 9 + 5 \Rightarrow 4 < x < 14$ → $x \in \{5, 6, \ldots, 13\}$: **9** değer.")],
  [r"$|b-c|<a<b+c$.", "Büyük açı karşısında büyük kenar.", r"Pisagor $a^2+b^2=c^2$; 3-4-5, 5-12-13."]),
O("k2", "3.2", "Benzer üçgenler ve Thales teoremi", "Similar triangles and Thales' theorem", r"""
# Benzerlik
Karşılıklı açıları eşit, karşılıklı kenarları **orantılı** üçgenler benzerdir. Benzerlik oranı $k$:
$$\frac{a'}{a} = \frac{b'}{b} = \frac{c'}{c} = k$$

**Benzerlik kuralları:**
- **AA:** İki açı eşit
- **KAK (SAS):** İki kenar orantılı ve aralarındaki açı eşit
- **KKK (SSS):** Üç kenar orantılı

**Oranlar:** Çevreler oranı $= k$, **alanlar oranı $= k^2$**, (hacimler oranı $= k^3$). Yükseklik, kenarortay ve açıortay uzunlukları da $k$ oranındadır.

# Thales (Temel Orantı) Teoremi
Bir üçgende bir kenara **paralel** çizilen doğru, diğer iki kenarı **orantılı** parçalara ayırır:
$$DE \parallel BC \Rightarrow \frac{AD}{DB} = \frac{AE}{EC} \quad\text{ve}\quad \frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}$$

**Uygulama:** Bir ağacın gölgesi $12$ m, aynı anda $1{,}5$ m'lik çubuğun gölgesi $2$ m ise ağacın boyu: $\dfrac{h}{12} = \dfrac{1{,}5}{2} \Rightarrow h = 9$ m.
""",
  [(r"Benzerlik oranı $\frac{2}{3}$ olan iki üçgenden küçüğünün alanı $20$ cm² ise büyüğünün alanı nedir?", r"Alanlar oranı $k^2 = \frac{4}{9}$. $\frac{20}{A} = \frac{4}{9} \Rightarrow A = 45$ cm².")],
  ["Benzerlik: AA, KAK, KKK.", r"Alan oranı $k^2$.", "Thales: paralel doğru kenarları orantılı böler."]),
]),
U("u4", "4. Tema: Veri, Sayma ve Olasılık", "Theme 4: Data, Counting and Probability", [
O("k1", "4.1", "Sayma: temel ilke, permütasyon, kombinasyon", "Counting: fundamental principle, permutations, combinations", r"""
# Toplama ve Çarpma İlkesi
- **Toplama ilkesi:** Ayrık seçenekler ("ya … ya …") → sayılar **toplanır**.
- **Çarpma ilkesi:** Art arda yapılan seçimler ("… ve …") → sayılar **çarpılır**.

# Faktöriyel
$$n! = n\cdot(n-1)\cdots2\cdot1 \qquad 0! = 1$$

# Permütasyon (Sıralama — sıra önemli)
$$P(n, r) = \frac{n!}{(n-r)!}$$
$n$ farklı nesnenin tümünün dizilişi: $n!$. Tekrarlı nesneler: $\dfrac{n!}{n_1!\,n_2!\cdots}$.

# Kombinasyon (Seçme — sıra önemsiz)
$$C(n, r) = \binom{n}{r} = \frac{n!}{r!\,(n-r)!}$$
Özellikler: $\binom{n}{0} = \binom{n}{n} = 1$, $\binom{n}{r} = \binom{n}{n-r}$.

> **Sıra önemli mi?** Başkan–yardımcı seçmek → permütasyon; 3 kişilik komisyon seçmek → kombinasyon.
""",
  [(r"8 kişilik bir sınıftan bir başkan ve bir başkan yardımcısı kaç farklı şekilde seçilir? 3 kişilik bir ekip kaç farklı şekilde seçilir?", r"Başkan–yardımcı (sıra önemli): $P(8,2) = 8\cdot7 = 56$. Ekip (sıra önemsiz): $\binom83 = \frac{8\cdot7\cdot6}{3\cdot2\cdot1} = 56$."),
   (r"KALEM kelimesinin harfleriyle anlamlı ya da anlamsız kaç farklı 5 harfli kelime yazılır? ANANAS için?", r"KALEM: 5 farklı harf → $5! = 120$. ANANAS: A üç, N iki tekrar → $\frac{6!}{3!\,2!} = 60$.")],
  ["Ya-ya → topla; ve → çarp.", r"Permütasyon $\frac{n!}{(n-r)!}$ sıra önemli.", r"Kombinasyon $\frac{n!}{r!(n-r)!}$ sıra önemsiz."]),
O("k2", "4.2", "Olasılık ve veri analizi", "Probability and data analysis", r"""
# Olasılık
**Örnek uzay** $E$: Tüm olası sonuçlar. **Olay** $A$: Örnek uzayın alt kümesi.
$$P(A) = \frac{s(A)}{s(E)} \qquad 0 \le P(A) \le 1$$
- $P(E) = 1$ (kesin olay), $P(\varnothing) = 0$ (imkânsız olay).
- **Tümleyen:** $P(A') = 1 - P(A)$.
- **Birleşim:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$; **ayrık** olaylarda $P(A\cap B) = 0$.
- **Bağımsız** olaylar: $P(A \cap B) = P(A)\cdot P(B)$.

# Veri Analizi
| Ölçü | Tanım |
|---|---|
| **Aritmetik ortalama** | Değerler toplamı ÷ değer sayısı |
| **Medyan (ortanca)** | Sıralı verinin ortasındaki değer (çift sayıda veride ortadaki iki değerin ortalaması) |
| **Mod (tepe değer)** | En sık tekrar eden değer |
| **Açıklık** | En büyük − en küçük |
| **Standart sapma** | Verilerin ortalamaya göre yayılımı; küçükse veriler **ortalamaya yakın** |

$$s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}$$

> **Uç değerler** ortalamayı çok etkiler, medyanı az etkiler.
""",
  [(r"İki zar atılıyor. Toplamın 7 olma olasılığı nedir?", r"Örnek uzay $36$. Toplamı 7 olanlar: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → $6$. $P = \frac{6}{36} = \frac16$."),
   (r"$3, 5, 5, 7, 20$ verisinin ortalaması, medyanı ve modu nedir?", r"Ortalama $\frac{40}{5} = 8$; medyan $5$; mod $5$. Uç değer $20$ ortalamayı yukarı çekmiştir.")],
  [r"$P(A)=s(A)/s(E)$; $P(A')=1-P(A)$.", r"Bağımsız olaylarda $P(A\cap B)=P(A)P(B)$.", "Ortalama, medyan, mod; standart sapma yayılımı ölçer."]),
]),
U("u5", "5. Tema: Fonksiyonlar ve Grafikler", "Theme 5: Functions and Graphs", [
O("k1", "5.1", "Fonksiyon kavramı, ikinci dereceden fonksiyonlar ve grafik yorumu", "Functions, quadratic functions and graph interpretation", r"""
# Fonksiyon
$A$ kümesinin **her elemanını** $B$ kümesinin **yalnız bir** elemanına eşleyen bağıntı: $f: A \to B$.
- **Tanım kümesi** $A$, **değer kümesi** $B$, **görüntü kümesi** $f(A) \subseteq B$.
- **Düşey doğru testi:** Grafiği her düşey doğru en fazla bir noktada kesiyorsa fonksiyondur.

# Fonksiyon Türlerinin Karşılaştırılması
| Tür | Genel biçim | Grafik |
|---|---|---|
| Doğrusal | $f(x) = ax + b$ | Doğru |
| İkinci dereceden | $f(x) = ax^2 + bx + c$ | **Parabol** |
| Rasyonel (ters orantı) | $f(x) = \dfrac{k}{x}$ | Hiperbol |

# Parabol $f(x) = ax^2 + bx + c$
- $a > 0$ → kollar **yukarı**, tepe noktası **minimum**; $a < 0$ → kollar **aşağı**, tepe **maksimum**.
- **Tepe noktası:** $r = -\dfrac{b}{2a}$, $k = f(r)$. Simetri ekseni $x = r$.
- **y-kesişimi:** $(0, c)$.
- **x-kesişimleri (kökler):** $\Delta = b^2 - 4ac$; $\Delta > 0$ iki kök, $\Delta = 0$ tek (çakışık) kök, $\Delta < 0$ kesişim yok.

# Artanlık–Azalanlık ve Ekstremum
- Bir aralıkta $x$ artarken $f(x)$ artıyorsa **artan**, azalıyorsa **azalan**.
- Parabolde $a > 0$ ise $x < r$ için azalan, $x > r$ için artan.
- **Maksimum/minimum problemleri:** Ör. çevresi sabit dikdörtgenin en büyük alanı.
""",
  [(r"$f(x) = x^2 - 6x + 5$ parabolünün tepe noktasını, köklerini ve en küçük değerini bulunuz.", r"$r = \frac{6}{2} = 3$, $f(3) = 9 - 18 + 5 = -4$ → tepe $(3, -4)$, en küçük değer $-4$. Kökler: $x^2 - 6x + 5 = (x-1)(x-5) = 0 \Rightarrow x = 1, 5$."),
   (r"Çevresi $40$ m olan dikdörtgen bir bahçenin alanı en fazla kaç m² olur?", r"Kenarlar $x$ ve $20 - x$: $A(x) = x(20-x) = -x^2 + 20x$. Tepe $x = 10$ → $A = 100$ m² (kare).")],
  ["Fonksiyon: her elemanın tek görüntüsü; düşey doğru testi.", r"Parabol: $a>0$ yukarı, tepe $r=-b/2a$.", r"$\Delta=b^2-4ac$ kök sayısını belirler."]),
]),
]

write("mat-11.js", "11/matematik", "11. Sınıf Temel Matematik — konu anlatım notları",
      "kullanıcının verdiği \"11. Sınıf Temel Matematik Konu Anlatım Notları\" (5 tema).",
      units, "Kaynak notlar kısa olduğu için her tema ders kitabı düzeyinde genişletildi (çözümlü örnekler, tablolar). Dörtgen tablosuna deltoit, benzerlik ünitesine özel dik üçgenler, olasılık ünitesine olay işlemleri eklendi.")
