# -*- coding: utf-8 -*-
r"""9. Sınıf Fizik — 1.42 eki: Madde ve özellikleri (TYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from common import O, U

YENI = [U("u5", "5. Ünite (Ek): Madde ve Özellikleri", "Unit 5 (Extra): Matter and Its Properties", [

O("k1", "FİZ.9.E1", "Kütle, hacim ve özkütle; karışımların özkütlesi", "Mass, volume and density; density of mixtures", r"""
# Madde ve Ortak Özellikler
Kütlesi ve hacmi olan her şey maddedir. **Kütle** (kg, g) madde miktarının ölçüsüdür, eşit kollu terazi ile ölçülür ve **her yerde aynıdır**; **ağırlık** ise kütleye etki eden yer çekimi kuvvetidir (N) ve bulunduğu yere göre değişir. **Hacim** maddenin kapladığı yerdir (m³, L, cm³); düzgün olmayan katıların hacmi taşırma kabıyla ölçülür.

# Özkütle (Yoğunluk)
Birim hacimdeki madde miktarıdır ve **ayırt edici** bir özelliktir:
$$d = \frac{m}{V} \qquad \left(\text{g/cm}^3 \text{ ya da kg/m}^3\right), \qquad 1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$$
- Aynı sıcaklık ve basınçta saf bir maddenin özkütlesi **sabittir**; madde miktarından bağımsızdır.
- Isıtılan maddenin genellikle hacmi artar, özkütlesi **azalır**. Su istisnadır: $+4\ °C$'de özkütlesi en büyüktür; buz sudan hafiftir (göllerin üstten donması).
- Kütle–hacim grafiğinin **eğimi** özkütleyi verir.

# Karışımların Özkütlesi
$$d_{karışım} = \frac{m_1 + m_2}{V_1 + V_2}$$
- **Eşit hacim** karıştırılırsa: $d = \dfrac{d_1 + d_2}{2}$
- **Eşit kütle** karıştırılırsa: $d = \dfrac{2d_1d_2}{d_1 + d_2}$
- Karışımın özkütlesi her zaman iki özkütlenin **arasındadır**; hangi maddeden daha çok hacim varsa ona daha yakındır.

# Dayanıklılık ve Boyut
Bir yapının dayanıklılığı, **kesit alanı / hacim** oranıyla ilişkilidir. Boyutlar $k$ katına çıkınca kesit alanı $k^2$, hacim (ve ağırlık) $k^3$ katına çıkar; bu nedenle büyük canlıların kemikleri orantısal olarak daha kalındır, karınca kendi ağırlığının katlarını taşıyabilir.
""",
  [(r"Kütlesi 270 g, hacmi 100 cm³ olan bir metal parçanın özkütlesi nedir? Bu metal hangisi olabilir? (Alüminyum 2,7; demir 7,9 g/cm³)",
    r"$d = \frac{270}{100} = $ **2,7 g/cm³** → **alüminyum** olabilir (özkütle ayırt edicidir)."),
   (r"Özkütlesi 1 g/cm³ olan sudan 200 cm³ ile özkütlesi 0,8 g/cm³ olan alkolden 200 cm³ karıştırılıyor (hacim değişmediği varsayılıyor). Karışımın özkütlesi nedir?",
    r"Eşit hacim: $d = \frac{1 + 0{,}8}{2} = $ **0,9 g/cm³**. (Kontrol: $\frac{200 + 160}{400} = 0{,}9$)")],
  [r"Kütle her yerde aynıdır; ağırlık yer çekimine bağlıdır.", r"Özkütle $d = m/V$; saf maddeler için ayırt edicidir.",
   r"Eşit hacim karışımı: $(d_1+d_2)/2$; eşit kütle karışımı: $2d_1d_2/(d_1+d_2)$.", r"Su +4 °C'de en yoğundur; buz suda yüzer.",
   r"Boyut $k$ katı → kesit $k^2$, ağırlık $k^3$ katı."]),

O("k2", "FİZ.9.E2", "Adezyon, kohezyon, yüzey gerilimi ve kılcallık", "Adhesion, cohesion, surface tension and capillarity", r"""
# Kohezyon ve Adezyon
- **Kohezyon:** Aynı cins moleküller arasındaki çekim kuvveti.
- **Adezyon:** Farklı cins moleküller arasındaki çekim kuvveti.
- Cam bardaktaki suyun yüzeyi kenarlarda **yukarı kıvrılır** (adezyon > kohezyon, iç bükey yüzey). Cıvanın yüzeyi ise **dış bükeydir** (kohezyon > adezyon).

# Yüzey Gerilimi
Sıvının yüzeyindeki moleküller yalnızca yanlardan ve alttan çekildiği için yüzey **gerilmiş bir zar** gibi davranır.
- Su örümcekleri suyun üstünde yürüyebilir; iğne dikkatle bırakılırsa yüzebilir; damlalar küresel olur.
- **Sıcaklık arttıkça** ve **deterjan/sabun** eklendikçe yüzey gerilimi **azalır** (sıcak ve sabunlu su kirleri daha kolay temizler).

# Kılcallık
Sıvının ince borularda (kılcal) yükselmesi ya da alçalmasıdır.
- Adezyon kohezyondan büyükse sıvı **yükselir** (su–cam), küçükse **alçalır** (cıva–cam).
- Boru **inceldikçe** yükselme miktarı **artar**.
- Örnekler: bitkilerde suyun gövdede taşınmasına katkı, kâğıt havlunun suyu emmesi, gaz lambasında fitil, duvarda nemin yükselmesi.
""",
  [(r"Aynı sıvıya daldırılan çapları farklı iki cam kılcal boruda sıvı hangi boruda daha çok yükselir?",
    r"**İnce olan** boruda; kılcal yükselme boru yarıçapı küçüldükçe artar."),
   (r"Sabunlu suyla iğne yüzdürülebilir mi? Neden?",
    r"Hayır, zorlaşır. Sabun **yüzey gerilimini azaltır**; iğneyi taşıyan yüzey zarı zayıflar ve iğne batar.")],
  [r"Kohezyon: aynı cins, adezyon: farklı cins moleküller arası çekim.", r"Su–cam: adezyon > kohezyon → iç bükey yüzey, kılcalda yükselme.",
   r"Yüzey gerilimi sıcaklık ve sabunla azalır.", r"Kılcal yükselme ince boruda daha fazladır."]),
])]
