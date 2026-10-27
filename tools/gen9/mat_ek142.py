# -*- coding: utf-8 -*-
r"""9. Sınıf Matematik — 1.43 eki: TYT temel kavramlar, kümeler ve problemler.
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from common import O, U

YENI = [U("t8", "8. Tema (Ek): TYT Temel Kavramlar, Kümeler ve Problemler", "Theme 8 (Extra): Core Concepts, Sets and Word Problems", [

O("k1", "MAT.9.E1", "Kümeler: gösterim, alt küme ve işlemler", "Sets: notation, subsets and operations", r"""
# Küme Kavramı
İyi tanımlanmış nesneler topluluğuna **küme**, her bir nesneye **eleman** denir. Gösterimler: liste ($A = \{1, 2, 3\}$), ortak özellik ($A = \{x \mid x < 4,\ x \in \mathbb{Z}^+\}$) ve **Venn şeması**. Eleman sayısı $s(A)$ ile gösterilir; boş küme $\emptyset$.

# Alt Küme
$A$'nın her elemanı $B$'de de varsa $A \subseteq B$.
- $n$ elemanlı bir kümenin alt küme sayısı $2^n$, **öz alt küme** sayısı $2^n - 1$'dir.
- $r$ elemanlı alt küme sayısı $\binom{n}{r}$'dir.

# İşlemler
| İşlem | Gösterim | Anlamı |
|---|---|---|
| Birleşim | $A \cup B$ | En az birinde olanlar |
| Kesişim | $A \cap B$ | Her ikisinde olanlar |
| Fark | $A \setminus B$ | $A$'da olup $B$'de olmayanlar |
| Tümleyen | $A'$ | Evrensel kümede olup $A$'da olmayanlar |
$$s(A \cup B) = s(A) + s(B) - s(A \cap B)$$
Üç küme için: $s(A\cup B\cup C) = s(A)+s(B)+s(C) - s(A\cap B) - s(A\cap C) - s(B\cap C) + s(A\cap B\cap C)$.
- **De Morgan:** $(A \cup B)' = A' \cap B'$, $(A \cap B)' = A' \cup B'$.
""",
 [(r"Bir sınıfta 18 kişi basketbol, 12 kişi voleybol oynuyor; 5 kişi ikisini de oynuyor. En az bir oyunu oynayan kaç kişi vardır?",
   r"$s(B \cup V) = 18 + 12 - 5 = $ **25**."),
  (r"5 elemanlı bir kümenin kaç alt kümesi ve kaç öz alt kümesi vardır? 2 elemanlı alt kümesi kaç tanedir?",
   r"Alt küme $2^5 = 32$, öz alt küme $31$, 2 elemanlı alt küme $\binom52 = 10$.")],
 [r"$n$ elemanlı kümenin $2^n$ alt kümesi vardır.", r"$s(A\cup B) = s(A) + s(B) - s(A\cap B)$.", r"De Morgan: $(A\cup B)' = A'\cap B'$."]),

O("k2", "MAT.9.E2", "Basamak analizi, rasyonel ve ondalık sayılar", "Place value, rational and decimal numbers", r"""
# Basamak Analizi
İki basamaklı $\overline{ab} = 10a + b$, üç basamaklı $\overline{abc} = 100a + 10b + c$. ($a \neq 0$)
- $\overline{ab} + \overline{ba} = 11(a + b)$, $\overline{ab} - \overline{ba} = 9(a - b)$.
- Rakamları farklı en büyük üç basamaklı sayı 987, en küçüğü 102'dir.

# Rasyonel Sayılar
$\dfrac{a}{b}$ ($b \neq 0$) biçiminde yazılabilen sayılardır.
- Toplama/çıkarmada paydalar eşitlenir; çarpmada paylar ve paydalar çarpılır; bölmede ikinci kesir ters çevrilip çarpılır.
- Sıralama: paydalar eşitse payı büyük olan büyüktür; paylar eşitse paydası küçük olan büyüktür.

# Ondalık Sayılar ve Devirli Sayılar
- $0{,}25 = \dfrac{25}{100} = \dfrac14$.
- **Devirli sayı:** $0{,}\overline{3} = \dfrac{3}{9} = \dfrac13$. Genel kural: $\dfrac{\text{sayının tamamı} - \text{devretmeyen kısım}}{\text{devreden basamak kadar 9, devretmeyen kadar 0}}$. Örneğin $1{,}2\overline{3} = \dfrac{123 - 12}{90} = \dfrac{111}{90}$.
""",
 [(r"İki basamaklı $\overline{ab}$ sayısı ile rakamlarının yer değiştirmesiyle oluşan sayının toplamı 121'dir. $a + b$ kaçtır?",
   r"$11(a + b) = 121$ → $a + b = $ **11**."),
  (r"$0{,}1\overline{6}$ sayısını kesir olarak yazınız.", r"$\dfrac{16 - 1}{90} = \dfrac{15}{90} = $ **$\dfrac16$**.")],
 [r"$\overline{abc} = 100a + 10b + c$.", r"$\overline{ab}+\overline{ba} = 11(a+b)$, $\overline{ab}-\overline{ba} = 9(a-b)$.", r"Devirli sayı: (tamamı − devretmeyen) / (9'lar ve 0'lar)."]),

O("k3", "MAT.9.E3", "Oran–orantı, yüzde, kâr–zarar ve faiz", "Ratio and proportion, percentages, profit–loss and interest", r"""
# Oran ve Orantı
- **Doğru orantı:** Biri artarken diğeri aynı oranda artar: $\dfrac{x}{y} = k$.
- **Ters orantı:** Biri artarken diğeri aynı oranda azalır: $x\cdot y = k$.
- $\dfrac ab = \dfrac cd$ ise $a\cdot d = b\cdot c$ (içler–dışlar çarpımı).
- $a : b : c = 2 : 3 : 5$ ise $a = 2k$, $b = 3k$, $c = 5k$ yazılır.

# Yüzde
$x$'in %$p$'si $= x\cdot\dfrac{p}{100}$.
- %20 artış: $\times 1{,}2$; %20 indirim: $\times 0{,}8$.
- **Art arda değişimler çarpılır:** %20 artış sonra %20 indirim → $1{,}2 \times 0{,}8 = 0{,}96$ → **%4 kayıp** (yüzdeler toplanmaz!).

# Kâr–Zarar
Kâr ve zarar **maliyet (alış fiyatı)** üzerinden hesaplanır:
$$\text{Satış} = \text{Maliyet}\cdot\left(1 + \frac{\text{kâr \%}}{100}\right)$$

# Faiz
- **Basit faiz:** $F = A\cdot\dfrac{n}{100}\cdot t$ ($A$ ana para, $n$ yıllık faiz oranı, $t$ yıl).
- **Bileşik faiz:** $A_t = A\left(1 + \dfrac{n}{100}\right)^t$ — her dönem faiz ana paraya eklenir.
""",
 [(r"Bir ürünün fiyatı önce %25 artırılıyor, sonra %20 indiriliyor. Son fiyat ilk fiyata göre nasıl değişmiştir?",
   r"$1{,}25 \times 0{,}80 = 1{,}00$ → fiyat **değişmemiştir**."),
  (r"Maliyeti 400 TL olan ürün %35 kârla satılıyor. Satış fiyatı nedir?", r"$400 \times 1{,}35 = $ **540 TL**.")],
 [r"Doğru orantıda bölüm, ters orantıda çarpım sabittir.", r"Art arda yüzde değişimler çarpılır, toplanmaz.", r"Kâr–zarar maliyet üzerinden hesaplanır.",
  r"Bileşik faiz: $A(1 + n/100)^t$."]),

O("k4", "MAT.9.E4", "Sayı, kesir ve yaş problemleri", "Number, fraction and age problems", r"""
# Problem Çözme Adımları
1. Bilinmeyeni belirle ve bir harfle göster ($x$).
2. Verilenleri denkleme dönüştür.
3. Denklemi çöz, sonucu soruda istenen biçimde yaz ve **kontrol et**.

# Sayı Problemleri
- Ardışık tam sayılar: $x, x+1, x+2$; ardışık çift/tek sayılar: $x, x+2, x+4$.
- "Bir sayının 3 katının 5 fazlası" → $3x + 5$; "5 fazlasının 3 katı" → $3(x + 5)$. Sıraya dikkat!

# Kesir Problemleri
"Paranın $\frac13$'ünü, sonra **kalanın** $\frac14$'ünü harcadı" → kalanlar üzerinden çarp: harcamadan sonra kalan $= x\cdot\frac23\cdot\frac34 = \frac x2$. Toplam yerine çoğu zaman **paydaların EKOK'u** kadar başlangıç değeri seçmek işi kolaylaştırır.

# Yaş Problemleri
- Kişiler arasındaki **yaş farkı hiç değişmez**.
- $t$ yıl sonra her kişinin yaşı $t$ artar; $n$ kişinin yaşları toplamı $n\cdot t$ artar.
- "Ben senin yaşındayken…" tipi sorularda yaş farkını kullan.
""",
 [(r"Ardışık üç çift sayının toplamı 78'dir. En büyüğü kaçtır?", r"$x + (x+2) + (x+4) = 78$ → $3x = 72$, $x = 24$ → en büyük **28**."),
  (r"Annenin yaşı kızının yaşının 3 katıdır. 12 yıl sonra annenin yaşı kızının yaşının 2 katı olacaktır. Kızın bugünkü yaşı kaçtır?",
   r"Kız $x$, anne $3x$. $3x + 12 = 2(x + 12)$ → $x = $ **12**.")],
 [r"Ardışık çift/tek sayılar $x, x+2, x+4$.", r"\"Kalanın\" kesri ardışık çarpılarak hesaplanır.", r"Yaş farkı değişmez; $t$ yıl sonra toplam yaş $n\cdot t$ artar."]),

O("k5", "MAT.9.E5", "İşçi–havuz, hareket ve karışım problemleri", "Work, motion and mixture problems", r"""
# İşçi ve Havuz Problemleri
Bir işi tek başına $a$ saatte bitiren kişi 1 saatte işin $\frac1a$'sını yapar.
$$\frac1a + \frac1b = \frac1t \quad (t: \text{birlikte bitirme süresi})$$
- Havuzu dolduran musluk (+), boşaltan musluk (−) yazılır.

# Hareket Problemleri
$$\text{Yol} = \text{Hız} \times \text{Zaman}$$
- **Zıt yönde (karşılaşma):** $t = \dfrac{x}{V_1 + V_2}$
- **Aynı yönde (yetişme):** $t = \dfrac{x}{V_1 - V_2}$ ($V_1 > V_2$)
- **Ortalama hız** = toplam yol / toplam zaman (hızların ortalaması değildir!). Eşit yollar $V_1$ ve $V_2$ ile gidilirse ortalama hız $\dfrac{2V_1V_2}{V_1 + V_2}$.
- Akıntıda: akıntı yönünde $V + V_a$, akıntıya karşı $V - V_a$.

# Karışım Problemleri
Çözeltideki madde miktarı = toplam miktar × yüzde oranı.
- Karıştırmada **saf madde miktarları toplanır**: $m_1\cdot\%p_1 + m_2\cdot\%p_2 = (m_1 + m_2)\cdot\%p$.
- Su eklemek: madde miktarı aynı kalır, toplam artar. Su buharlaştırmak: toplam azalır, madde aynı kalır.
""",
 [(r"Bir işi Ali 6 günde, Ayşe 3 günde bitiriyor. Birlikte kaç günde bitirirler?", r"$\frac16 + \frac13 = \frac12$ → **2 gün**."),
  (r"Bir araç A'dan B'ye 60 km/sa, dönüşte 40 km/sa hızla gidiyor. Ortalama hızı kaçtır?", r"$\dfrac{2\cdot60\cdot40}{60 + 40} = $ **48 km/sa** (50 değil!)."),
  (r"%20'lik 30 litre tuzlu suya kaç litre saf su eklenirse %12'lik olur?", r"Tuz $= 6$ L. $\dfrac{6}{30 + x} = 0{,}12$ → $30 + x = 50$ → **20 litre**.")],
 [r"Birlikte çalışma: $\frac1a + \frac1b = \frac1t$.", r"Karşılaşma $x/(V_1+V_2)$, yetişme $x/(V_1-V_2)$.",
  r"Ortalama hız = toplam yol / toplam zaman.", r"Karışımda saf madde miktarları toplanır; su eklemek maddeyi değiştirmez."]),

O("k6", "MAT.9.E6", "Özdeşlikler ve çarpanlara ayırma", "Identities and factorisation", r"""
# Temel Özdeşlikler
$$(a+b)^2 = a^2 + 2ab + b^2, \qquad (a-b)^2 = a^2 - 2ab + b^2$$
$$a^2 - b^2 = (a-b)(a+b) \quad \text{(iki kare farkı)}$$
$$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3, \qquad a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$$
Faydalı bağıntı: $a^2 + b^2 = (a+b)^2 - 2ab$.

# Çarpanlara Ayırma Yöntemleri
1. **Ortak çarpan parantezine alma:** $6x^2 + 9x = 3x(2x + 3)$
2. **Gruplandırma:** $ax + ay + bx + by = (a+b)(x+y)$
3. **Özdeşlikleri kullanma:** $x^2 - 49 = (x-7)(x+7)$, $x^2 + 6x + 9 = (x+3)^2$
4. **$x^2 + bx + c$ üç terimlisi:** Çarpımı $c$, toplamı $b$ olan iki sayı bulunur: $x^2 - 5x + 6 = (x-2)(x-3)$
5. **$ax^2 + bx + c$:** Çarpraz yöntemle: $2x^2 + 7x + 3 = (2x+1)(x+3)$

# Rasyonel İfadelerin Sadeleştirilmesi
Pay ve payda çarpanlarına ayrılır, ortak çarpanlar sadeleştirilir (paydayı sıfır yapan değerler hariç):
$$\frac{x^2 - 9}{x^2 + 3x} = \frac{(x-3)(x+3)}{x(x+3)} = \frac{x-3}{x}$$
""",
 [(r"$a + b = 7$ ve $ab = 10$ ise $a^2 + b^2$ kaçtır?", r"$a^2 + b^2 = (a+b)^2 - 2ab = 49 - 20 = $ **29**."),
  (r"$x^2 - x - 12$ ifadesini çarpanlarına ayırınız.", r"Çarpımı $-12$, toplamı $-1$ olan sayılar $-4$ ve $3$ → **$(x-4)(x+3)$**."),
  (r"$101^2 - 99^2$ işleminin sonucu kaçtır?", r"İki kare farkı: $(101-99)(101+99) = 2\cdot200 = $ **400**.")],
 [r"$(a\pm b)^2 = a^2 \pm 2ab + b^2$; $a^2 - b^2 = (a-b)(a+b)$.", r"$x^2 + bx + c$: çarpımı $c$, toplamı $b$ olan sayılar.",
  r"Sadeleştirmeden önce pay ve payda çarpanlarına ayrılır.", r"$a^2 + b^2 = (a+b)^2 - 2ab$."]),
])]
