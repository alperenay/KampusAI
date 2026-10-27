# -*- coding: utf-8 -*-
r"""11. Sınıf Matematik — 1.42 eki: Çember–daire ve katı cisimler (AYT geometri kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U

YENI = [U("u6", "6. Tema (Ek): Çember, Daire ve Katı Cisimler", "Theme 6 (Extra): Circle, Disc and Solids", [

O("k1", "MAT.11.E1", "Çemberde teğet, daire alanı, yay uzunluğu ve daire dilimi", "Tangents, area of a disc, arc length and sectors", r"""
# Temel Tanımlar
- **Çember:** Bir merkeze eşit uzaklıktaki noktaların kümesi (yalnızca sınır çizgisi). **Daire:** Çember ile iç bölgesinin birleşimi.
- **Yarıçap** $r$, **çap** $2r$; çapı gören çevre açı $90°$'dir.

# Çemberde Teğet
- Teğet, değme noktasındaki **yarıçapa diktir**.
- Dışarıdaki bir noktadan çembere çizilen iki teğet parçasının uzunlukları **eşittir**.
- Merkezi $O$, dış nokta $P$ ve teğet uzunluğu $t$ ise: $t^2 = |PO|^2 - r^2$ (Pisagor).

# Uzunluk ve Alan
$$\text{Çevre} = 2\pi r, \qquad \text{Daire alanı} = \pi r^2$$
Merkez açısı $\alpha$ (derece) olan:
$$\text{Yay uzunluğu} = 2\pi r\cdot\frac{\alpha}{360°}, \qquad \text{Daire dilimi alanı} = \pi r^2\cdot\frac{\alpha}{360°} = \frac{\text{yay}\cdot r}{2}$$
- **Daire halkası** (yarıçaplar $R > r$): $\pi(R^2 - r^2)$
- **Daire parçası** (kiriş ile yay arası) = dilim alanı − üçgen alanı

# Çemberin Kuvveti (kesişen kirişler)
İki kiriş bir iç noktada kesişirse parçaların çarpımları eşittir: $|AP|\cdot|PB| = |CP|\cdot|PD|$.
""",
  [(r"Yarıçapı 6 cm olan bir dairede $120°$'lik daire diliminin alanını ve yay uzunluğunu bulunuz ($\pi$ cinsinden).",
    r"Alan $= \pi\cdot36\cdot\frac{120}{360} = $ **$12\pi$ cm²**. Yay $= 2\pi\cdot6\cdot\frac13 = $ **$4\pi$ cm**. Kontrol: $\frac{4\pi\cdot6}{2} = 12\pi$ ✓"),
   (r"Merkezi $O$ ve yarıçapı 5 olan çembere, $|PO| = 13$ olan $P$ noktasından çizilen teğet parçasının uzunluğu kaçtır?",
    r"$t^2 = 13^2 - 5^2 = 144$ → $t = $ **12**.")],
  [r"Teğet, değme noktasındaki yarıçapa diktir; dış noktadan çizilen iki teğet eşit uzunluktadır.", r"Çevre $2\pi r$, alan $\pi r^2$.",
   r"Yay ve dilim: tam çemberin $\alpha/360$'ı kadarı.", r"Dilim alanı $= \frac{\text{yay}\cdot r}{2}$."]),

O("k2", "MAT.11.E2", "Prizmalar ve küp: hacim ve yüzey alanı", "Prisms and cubes: volume and surface area", r"""
# Prizma
İki **eş ve paralel** tabanı olan, yan yüzleri paralelkenar (dik prizmada dikdörtgen) olan cisimdir. Adını tabanından alır: üçgen prizma, kare prizma, altıgen prizma…
$$V = \text{Taban alanı}\times h, \qquad A = 2\cdot\text{Taban alanı} + \text{Taban çevresi}\times h$$
($h$: iki taban arasındaki dik uzaklık; yanal alan dik prizmada **taban çevresi × yükseklik**tir.)

# Dikdörtgenler Prizması ve Küp
Ayrıtları $a, b, c$ olan dikdörtgenler prizması:
- $V = abc$, $A = 2(ab + ac + bc)$
- Cisim köşegeni: $\sqrt{a^2 + b^2 + c^2}$

Ayrıtı $a$ olan küp:
- $V = a^3$, $A = 6a^2$, yüz köşegeni $a\sqrt2$, cisim köşegeni $a\sqrt3$.

# Ölçek Etkisi
Bir cismin bütün uzunlukları $k$ katına çıkarsa **alanları $k^2$**, **hacmi $k^3$** katına çıkar.
""",
  [(r"Ayrıtları 3, 4 ve 12 cm olan dikdörtgenler prizmasının hacmini, yüzey alanını ve cisim köşegenini bulunuz.",
    r"$V = 3\cdot4\cdot12 = $ **144 cm³**. $A = 2(12 + 36 + 48) = $ **192 cm²**. Köşegen $= \sqrt{9 + 16 + 144} = \sqrt{169} = $ **13 cm**."),
   (r"Bir küpün ayrıtı 2 katına çıkarılırsa yüzey alanı ve hacmi kaç katına çıkar?",
    r"Alan $2^2 = $ **4** katına, hacim $2^3 = $ **8** katına çıkar.")],
  [r"Prizma: $V = $ taban alanı × yükseklik.", r"Dikdörtgenler prizması: $V = abc$, $A = 2(ab+ac+bc)$, köşegen $\sqrt{a^2+b^2+c^2}$.",
   r"Küp: $V = a^3$, $A = 6a^2$, cisim köşegeni $a\sqrt3$.", r"Uzunluk $k$ katı → alan $k^2$, hacim $k^3$ katı."]),

O("k3", "MAT.11.E3", "Piramitler: hacim, yüzey alanı ve yan yüz yüksekliği", "Pyramids: volume, surface area and slant height", r"""
# Piramit
Bir çokgen taban ile tabanın dışındaki bir **tepe noktasının** taban köşelerine birleştirilmesiyle oluşan cisimdir. Yan yüzleri üçgendir.
$$V = \frac{\text{Taban alanı}\times h}{3}$$
Aynı taban ve yükseklikteki prizmanın hacminin **üçte biri** kadardır.

# Düzgün Piramit
Tabanı düzgün çokgen ve tepe noktası tabanın merkezinin tam üstünde olan piramittir. Yan yüzler eş ikizkenar üçgenlerdir.
- **Yan yüz yüksekliği (apotem) $h'$:** Tepeden taban kenarına inen dikme. Kare tabanlı (kenar $a$) düzgün piramitte:
$$h'^2 = h^2 + \left(\frac a2\right)^2$$
- Yanal alan $= \frac{\text{Taban çevresi}\times h'}{2}$, Yüzey alanı = taban alanı + yanal alan.

# Düzgün Dörtyüzlü
Bütün yüzleri eşkenar üçgen olan piramittir (ayrıt $a$): $A = a^2\sqrt3$, $V = \dfrac{a^3\sqrt2}{12}$.
""",
  [(r"Taban kenarı 6 cm, yüksekliği 4 cm olan kare dik piramidin hacmini ve yüzey alanını bulunuz.",
    r"$V = \frac{36\cdot4}{3} = $ **48 cm³**. Yan yüz yüksekliği $h' = \sqrt{4^2 + 3^2} = 5$. Yanal alan $= \frac{24\cdot5}{2} = 60$; yüzey alanı $= 36 + 60 = $ **96 cm²**."),
   (r"Bir prizma ile aynı taban ve yükseklikteki piramidin hacimleri oranı nedir?",
    r"$V_{piramit} : V_{prizma} = \frac13 : 1 = $ **1 : 3**.")],
  [r"Piramit hacmi: $\frac13\cdot$ taban alanı · yükseklik.", r"Yan yüz yüksekliği: $h'^2 = h^2 + (a/2)^2$ (kare tabanlı).",
   r"Yanal alan = taban çevresi · $h'$ / 2.", r"Düzgün dörtyüzlü: $V = a^3\sqrt2/12$."]),

O("k4", "MAT.11.E4", "Silindir, koni ve küre", "Cylinder, cone and sphere", r"""
# Silindir (dik dairesel)
$$V = \pi r^2 h, \qquad A = 2\pi r^2 + 2\pi r h$$
Yanal yüzey açıldığında kenarları $2\pi r$ ve $h$ olan bir **dikdörtgen** elde edilir.

# Koni (dik dairesel)
Ana doğru (yan yüz uzunluğu) $l$: $l^2 = r^2 + h^2$
$$V = \frac{\pi r^2 h}{3}, \qquad A = \pi r^2 + \pi r l$$
Yanal yüzey açıldığında yarıçapı $l$ olan bir **daire dilimi** oluşur; dilimin merkez açısı $\alpha = 360°\cdot\dfrac{r}{l}$.

# Küre
$$V = \frac43\pi r^3, \qquad A = 4\pi r^2$$
- Küreyi tam içine alan silindirin (yarıçap $r$, yükseklik $2r$) hacmi $2\pi r^3$'tür; küre bunun **üçte ikisi**dir (Arşimet'in mezar taşına kazıttığı sonuç).
- Küre bir düzlemle kesilirse kesit **daire** olur; merkezden $d$ uzaklıktaki kesitin yarıçapı $\sqrt{r^2 - d^2}$.

# Dönel Cisimler
Bir dikdörtgen kenarı etrafında döndürülürse **silindir**, dik üçgen bir dik kenarı etrafında döndürülürse **koni**, yarım daire çapı etrafında döndürülürse **küre** oluşur.
""",
  [(r"Yarıçapı 3 cm, yüksekliği 4 cm olan dik koninin hacmini ve yüzey alanını bulunuz.",
    r"$l = \sqrt{9 + 16} = 5$. $V = \frac{\pi\cdot9\cdot4}{3} = $ **$12\pi$ cm³**. $A = 9\pi + \pi\cdot3\cdot5 = $ **$24\pi$ cm²**."),
   (r"Yarıçapı 6 cm olan metal bir küre eritilerek yarıçapı 2 cm olan kürecikler yapılıyor. Kaç kürecik elde edilir?",
    r"Hacimler oranı $\left(\frac62\right)^3 = 27$ → **27** kürecik.")],
  [r"Silindir: $V = \pi r^2h$, $A = 2\pi r^2 + 2\pi rh$.", r"Koni: $V = \frac13\pi r^2h$, $A = \pi r^2 + \pi rl$, $l^2 = r^2 + h^2$.",
   r"Küre: $V = \frac43\pi r^3$, $A = 4\pi r^2$.", r"Koni hacmi aynı taban/yükseklikteki silindirin $\frac13$'ü; küre çevreleyen silindirin $\frac23$'ü."]),
])]
