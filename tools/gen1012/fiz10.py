# -*- coding: utf-8 -*-
"""10. Sınıf Fizik Konu Anlatım Notları → js/data/content/fiz-10.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Kuvvet ve Hareket", "Unit 1: Force and Motion", [
O("k1", "1.1", "Sabit hızlı hareket: temel kavramlar ve grafikler", "Uniform motion: basic concepts and graphs", r"""
# Temel Kavramlar

Hareket, bir cismin konumunun bir **referans noktasına göre** zamanla değişmesidir.

| Kavram | Tanım | Tür |
|---|---|---|
| **Konum** $\vec{x}$ | Referans noktasından cisme çizilen vektör (m) | Vektörel |
| **Yer değiştirme** $\Delta\vec{x}$ | $\vec{x}_{son} - \vec{x}_{ilk}$; ilk ve son konum arasındaki en kısa yönlü uzaklık | Vektörel |
| **Alınan yol** $x$ | Yörüngenin toplam uzunluğu | Skaler |
| **Sürat** | $\dfrac{\text{alınan yol}}{\text{zaman}}$ | Skaler |
| **Hız** $\vec{\vartheta}$ | $\dfrac{\Delta\vec{x}}{\Delta t}$ | Vektörel |

# Sabit Hızlı (Düzgün Doğrusal) Hareket

Eşit zaman aralıklarında **eşit yer değiştirme** yapılan harekettir. Hızın büyüklüğü ve yönü değişmez, **ivme sıfırdır** ($a = 0$).
$$\Delta x = \vartheta \cdot t$$

# Grafikler

| Grafik | Şekli | Ne verir? |
|---|---|---|
| **Konum–zaman** ($x$–$t$) | Eğik doğru | **Eğim = hız**. Yukarı eğim pozitif yön, aşağı eğim negatif yön |
| **Hız–zaman** ($\vartheta$–$t$) | Yatay doğru | **Alan = yer değiştirme**. Eksenin üstü pozitif, altı negatif yer değiştirme |
| **İvme–zaman** | $a = 0$ çizgisi | — |
""",
  [("Bir araç 4 s'de doğu yönünde 80 m, sonraki 2 s'de batı yönünde 20 m gidiyor. Alınan yol, yer değiştirme ve ortalama hız nedir?",
    "Alınan yol $80+20=100$ m. Yer değiştirme $80-20=60$ m doğu. Ortalama hız $\\frac{60}{6}=10$ m/s doğu; ortalama sürat $\\frac{100}{6}\\approx16{,}7$ m/s."),
   ("Konum–zaman grafiği $(0\\,s, 10\\,m)$ ve $(5\\,s, 40\\,m)$ noktalarından geçen bir doğrudur. Hız kaçtır?",
    "Eğim $= \\frac{40-10}{5-0} = 6$ m/s (pozitif yönde).")],
  ["Hız ve yer değiştirme vektörel; sürat ve yol skaler.", "$x$–$t$ eğimi = hız; $\\vartheta$–$t$ alanı = yer değiştirme.",
   "Sabit hızlı harekette $a=0$, $\\Delta x=\\vartheta t$."]),

O("k2", "1.2", "Bağıl hareket, karşılaşma ve yetişme", "Relative motion, meeting and catching up", r"""
# Bağıl Hareket

Bir cismin **başka bir hareketli gözlemciye göre** hızına bağıl hız denir:
$$\vec{\vartheta}_{bağıl} = \vec{\vartheta}_{cisim} - \vec{\vartheta}_{gözlemci}$$

- Aynı yönde giden iki araçta bağıl hız = hızlar **farkı**.
- Zıt yönde giden iki araçta bağıl hız = hızlar **toplamı**.

# Karşılaşma ve Yetişme

| Durum | Süre |
|---|---|
| **Birbirine doğru** (zıt yön) | $t_{karşılaşma} = \dfrac{x_{toplam}}{\vartheta_1 + \vartheta_2}$ |
| **Aynı yönde, arkadaki yetişiyor** | $t_{yetişme} = \dfrac{x_{arada}}{\vartheta_1 - \vartheta_2}$ ($\vartheta_1 > \vartheta_2$) |
""",
  [("Aralarında 300 km olan iki araç 70 km/h ve 80 km/h hızlarla birbirine doğru hareket ediyor. Kaç saat sonra karşılaşırlar?",
    "$t = \\frac{300}{70+80} = 2$ saat."),
   ("Aynı yönde giden iki araçtan öndeki 60 km/h, arkadaki 90 km/h hızla gidiyor; aralarında 15 km var. Arkadaki kaç dakikada yetişir?",
    "$t = \\frac{15}{90-60} = 0{,}5$ saat $= 30$ dakika.")],
  ["Aynı yön → fark; zıt yön → toplam.", "Karşılaşma: toplam mesafe / hızlar toplamı.", "Yetişme: aradaki mesafe / hızlar farkı."]),

O("k3", "1.3", "İvme: hızlanma ve yavaşlama", "Acceleration: speeding up and slowing down", r"""
# İvme

Hızdaki değişimin, bu değişimin gerçekleştiği zaman aralığına oranıdır:
$$\vec{a} = \frac{\Delta\vec{\vartheta}}{\Delta t} = \frac{\vec{\vartheta}_{son} - \vec{\vartheta}_{ilk}}{t_{son} - t_{ilk}}$$

- Birimi $m/s^2$; **vektörel** bir niceliktir.
- Yönü her zaman **hız değişimi** ve **net kuvvet** ile aynıdır.

| Hız ve ivme | Hareket |
|---|---|
| **Aynı yönlü** | Düzgün **hızlanan** (hızın büyüklüğü artar) |
| **Zıt yönlü** | Düzgün **yavaşlayan** (hızın büyüklüğü azalır) |
| $a = 0$ | Sabit hızlı ya da duran |

> Negatif ivme her zaman "yavaşlama" demek değildir; cisim negatif yönde gidiyorsa negatif ivme onu **hızlandırır**.
""",
  [("Durgun hâlden harekete geçen bir araç 5 s'de 20 m/s hıza ulaşıyor. İvmesi kaçtır?",
    "$a = \\frac{20 - 0}{5} = 4\\ m/s^2$."),
   ("Bir cismin hızı $-10$ m/s, ivmesi $-2\\ m/s^2$ ise cisim hızlanıyor mu, yavaşlıyor mu?",
    "Hız ve ivme **aynı yönlü** (ikisi de negatif) → cisim **hızlanıyor**.")],
  ["$a = \\Delta\\vartheta/\\Delta t$, birim $m/s^2$.", "Aynı yön → hızlanma; zıt yön → yavaşlama.", "İvmenin yönü = net kuvvetin yönü."]),

O("k4", "1.4", "Bir boyutta sabit ivmeli hareket: denklemler ve grafikler", "Uniformly accelerated motion: equations and graphs", r"""
# Kinematik Denklemler

İlk hızı $\vartheta_0$, ivmesi $a$ olan cisim için (hızlanan $+$, yavaşlayan $-$):

| Denklem | Kullanım |
|---|---|
| $\vartheta = \vartheta_0 \pm a\,t$ | Son hız |
| $\Delta x = \vartheta_0\,t \pm \tfrac{1}{2}a\,t^2$ | Yer değiştirme |
| $\vartheta^2 = \vartheta_0^2 \pm 2a\,\Delta x$ | Zaman verilmediğinde |
| $\Delta x = \dfrac{\vartheta_0 + \vartheta}{2}\cdot t$ | Ortalama hızla |

# Grafikler

| Grafik | Şekli | Eğim | Alan |
|---|---|---|---|
| **İvme–zaman** | Yatay doğru | — | **Hız değişimi** $\Delta\vartheta = a\,t$ |
| **Hız–zaman** | Eğik doğru | **İvme** | **Yer değiştirme** |
| **Konum–zaman** | **Parabol** | Teğetin eğimi = **anlık hız** | — |
""",
  [("8 m/s hızla giden bir bisiklet $2\\ m/s^2$ ivmeyle 3 s hızlanıyor. Son hızı ve aldığı yol nedir?",
    "$\\vartheta = 8 + 2\\cdot3 = 14$ m/s. $\\Delta x = 8\\cdot3 + \\frac12\\cdot2\\cdot9 = 24 + 9 = 33$ m."),
   ("20 m/s hızla giden araç fren yapıp $4\\ m/s^2$ ivmeyle yavaşlıyor. Durana kadar kaç m yol alır?",
    "$0 = 20^2 - 2\\cdot4\\cdot\\Delta x \\Rightarrow \\Delta x = \\frac{400}{8} = 50$ m.")],
  ["$\\vartheta=\\vartheta_0\\pm at$; $\\Delta x=\\vartheta_0t\\pm\\frac12at^2$; $\\vartheta^2=\\vartheta_0^2\\pm2a\\Delta x$.",
   "$\\vartheta$–$t$: eğim = ivme, alan = yer değiştirme.", "$a$–$t$ alanı = hız değişimi; $x$–$t$ parabol."]),
]),
U("u2", "2. Ünite: Enerji", "Unit 2: Energy", [
O("k1", "2.1", "İş ve kuvvet–yer değiştirme grafiği", "Work and the force–displacement graph", r"""
# İş

Fiziksel anlamda iş, kuvvet ile cismin **kuvvet doğrultusundaki** yer değiştirmesinin çarpımıdır:
$$W = F \cdot \Delta x \qquad (W = F\,\Delta x\cos\theta)$$

- Birimi **joule** ($J = N\cdot m$); **skaler**dir.
- İş yapılması için: kuvvet uygulanmalı **ve** cisim kuvvet doğrultusunda yer değiştirmelidir.
- **Kuvvete dik hareket iş yapmaz** (ör. çantayı taşıyarak yatay yürümek — yer çekimine karşı iş yok).
- Kuvvet yer değiştirmeye zıtsa iş **negatif**tir (sürtünme).

# Kuvvet–Yer Değiştirme ($F$–$x$) Grafiği

Grafik ile yatay eksen arasındaki **alan = yapılan iş**.
- Eksenin **üstündeki** alan: pozitif iş (cisim enerji kazanır).
- **Altındaki** alan: negatif iş (enerji kaybı).
""",
  [("20 N'luk yatay kuvvetle bir kutu 5 m itiliyor. Yapılan iş kaç J'dir?", "$W = 20\\cdot5 = 100$ J."),
   ("$F$–$x$ grafiğinde kuvvet 0'dan 10 N'a doğrusal artarken cisim 4 m ilerliyor. İş kaçtır?",
    "Üçgen alanı: $\\frac{10\\cdot4}{2} = 20$ J.")],
  ["$W = F\\cdot\\Delta x$, birim J, skaler.", "Kuvvete dik hareket iş yapmaz.", "$F$–$x$ grafiğinin alanı = iş."]),

O("k2", "2.2", "İş, enerji ve güç ilişkisi", "Work, energy and power", r"""
# Enerji ve İş–Kinetik Enerji Teoremi

**Enerji**, iş yapabilme yeteneğidir; iş ile aynı birime (J) sahiptir.

Net kuvvetin yaptığı iş, kinetik enerjideki değişime eşittir:
$$W_{net} = \Delta E_k = E_{k,son} - E_{k,ilk}$$

# Güç

Birim zamanda yapılan iş (ya da harcanan enerji):
$$P = \frac{W}{t} = \frac{E}{t} \qquad \text{birim: watt } (W = J/s)$$

# Elektrik Faturası

$$W = P \cdot t$$
Faturalarda birim **kilowattsaat** (kWh): $1\ kWh = 1000\ W \times 3600\ s = 3{,}6\times10^6\ J$.
""",
  [("2000 W'lık bir ısıtıcı günde 3 saat çalışıyor. 30 günde kaç kWh enerji harcar?",
    "Günlük $2\\ kW \\times 3\\ h = 6$ kWh; 30 günde $180$ kWh."),
   ("Bir vinç 500 N'luk yükü 10 s'de 6 m yükseltiyor. Gücü kaç W'tır?",
    "$W = 500\\cdot6 = 3000$ J, $P = \\frac{3000}{10} = 300$ W.")],
  ["$W_{net} = \\Delta E_k$.", "$P = W/t$, birim watt.", "Elektrik enerjisi $W = P\\cdot t$, kWh."]),

O("k3", "2.3", "Enerji biçimleri ve dönüşümleri", "Forms of energy and conversions", r"""
# Enerji Biçimleri

| Biçim | Açıklama / örnek |
|---|---|
| **Mekanik** | Kinetik + potansiyel enerji |
| **Kimyasal** | Molekül bağlarında depolanır (pil, besin, yakıt) |
| **Nükleer** | Atom çekirdeğinden **fisyon** (bölünme) ya da **füzyon** (birleşme) ile |
| **Isı (termal)** | Taneciklerin hareket enerjisi |
| **Işık** | Elektromanyetik tayf |
| **Ses** | Mekanik titreşimler |
| **Elektrik** | Yük hareketi |

# Enerjinin Korunumu

Enerji yoktan var edilemez, var olan yok edilemez; yalnızca **bir biçimden diğerine dönüşür**.

| Araç | Dönüşüm |
|---|---|
| Pil | Kimyasal → elektrik |
| Elektrik motoru | Elektrik → mekanik |
| Hidroelektrik santral | Potansiyel → kinetik → elektrik |
| Güneş paneli | Işık → elektrik |
""",
  [("Bir el feneri pille çalışıyor. Enerji dönüşüm zincirini yazın.", "Kimyasal (pil) → elektrik → ışık (+ bir miktar ısı)."),
   ("Füzyon ile fisyon arasındaki fark nedir?", "**Fisyon:** ağır çekirdeğin bölünmesi (nükleer santraller). **Füzyon:** hafif çekirdeklerin birleşmesi (Güneş).")],
  ["Enerji korunur, biçim değiştirir.", "Fisyon bölünme, füzyon birleşme.", "Her dönüşümde bir kısım ısıya gider."]),

O("k4", "2.4", "Mekanik enerji ve korunumu", "Mechanical energy and its conservation", r"""
# Mekanik Enerji

$$E_m = E_k + E_p$$

| Enerji | Formül |
|---|---|
| **Öteleme kinetik enerjisi** | $E_k = \frac{1}{2}m\vartheta^2$ |
| **Yer çekimi potansiyel enerjisi** | $E_p = m\,g\,h$ (referans noktasına göre) |
| **Esneklik potansiyel enerjisi** | $E_{yay} = \frac{1}{2}k\,x^2$ ($k$: yay sabiti, $x$: sıkışma/uzama) |

# Mekanik Enerjinin Korunumu

- **Sürtünmesiz** ortamda: $E_{m,ilk} = E_{m,son}$.
- **Sürtünmeli** ortamda bir kısmı ısıya dönüşür: $E_{m,ilk} = E_{m,son} + E_{ısı}$.

> Serbest düşen cisimde potansiyel enerji azalırken kinetik enerji artar; toplam sabit kalır.
""",
  [("2 kg'lık cisim 20 m yükseklikten serbest bırakılıyor ($g=10$). Yere çarpma hızı kaçtır?",
    "$mgh = \\frac12m\\vartheta^2 \\Rightarrow 10\\cdot20 = \\frac{\\vartheta^2}{2} \\Rightarrow \\vartheta = 20$ m/s."),
   ("Yay sabiti 200 N/m olan yay 0,1 m sıkıştırılıyor. Depolanan enerji kaç J'dir?",
    "$E = \\frac12\\cdot200\\cdot0{,}01 = 1$ J.")],
  ["$E_k=\\frac12m\\vartheta^2$, $E_p=mgh$, $E_{yay}=\\frac12kx^2$.", "Sürtünmesiz: mekanik enerji korunur.", "Sürtünmeli: kayıp ısıya dönüşür."]),

O("k5", "2.5", "Enerji kaynakları ve verimlilik", "Energy sources and efficiency", r"""
# Enerji Kaynakları

| Yenilenebilir | Yenilenemez |
|---|---|
| Güneş, rüzgâr, jeotermal, hidrolik, biyokütle, dalga, hidrojen | Fosil yakıtlar (kömür, petrol, doğal gaz), nükleer (uranyum) |
| Kısa sürede kendini yeniler, çevre dostu | Tükenince yerine konması milyonlarca yıl sürer |

# Çevresel ve Ekonomik Etkiler

- Fosil yakıtlar **sera gazı** ($CO_2$) salarak **küresel ısınma** ve iklim değişikliğine yol açar.
- Nükleer enerji az yakıtla çok enerji üretir ama **radyoaktif atık** riski taşır.

# Enerji Verimliliği

- **A sınıfı** cihazlar ve **LED** lambalar kullanmak
- Fişte takılı bırakılan **"vampir" cihazları** kapatmak
- Isı yalıtımı yapmak
""",
  [("Rüzgâr enerjisinin bir avantajını ve bir dezavantajını yazın.", "Avantaj: yenilenebilir, sera gazı salmaz. Dezavantaj: rüzgâra bağlı, sürekli değil; görüntü/gürültü etkisi."),],
  ["Yenilenebilir: güneş, rüzgâr, jeotermal, hidrolik, biyokütle.", "Fosil yakıt → sera gazı; nükleer → radyoaktif atık.", "Verimlilik: A sınıfı, LED, vampir cihazları kapatma."]),
]),
U("u3", "3. Ünite: Elektrik", "Unit 3: Electricity", [
O("k1", "3.1", "Basit elektrik devreleri ve direnç", "Simple circuits and resistance", r"""
# Basit Elektrik Devresi

| Eleman | Görevi |
|---|---|
| **Üreteç** (pil, akü) | Potansiyel farkı (gerilim) oluşturur, birimi **volt** (V) |
| **İletken tel** | Akımı iletir |
| **Anahtar** | Devreyi açar/kapatır; kapalıyken akım geçer |
| **Direnç / alıcı** | Elektrik enerjisini başka biçime dönüştürür |

# Direnç

İletkenin akıma gösterdiği zorluktur; birimi **ohm** ($\Omega$):
$$R = \rho\,\frac{\ell}{A}$$
$\rho$: öz direnç (maddenin cinsi), $\ell$: boy, $A$: kesit alanı. Uzun ve ince tel → büyük direnç.

### Su tesisatı benzetmesi
Pompa = üreteç · boru = iletken · vana = anahtar · daralma/kireçlenme = direnç · su akışı = akım.
""",
  [("Aynı maddeden yapılmış iki telden birinin boyu 2 katı, kesiti yarısıdır. Dirençleri oranı nedir?",
    "$R \\propto \\frac{\\ell}{A}$ → ikinci telin direnci $\\frac{2}{1/2} = 4$ katıdır.")],
  ["Devre: üreteç, iletken, anahtar, direnç.", "$R = \\rho\\,\\ell/A$.", "Uzun-ince tel direnci büyük."]),

O("k2", "3.2", "Elektrik akımı", "Electric current", r"""
# Elektrik Akımı

İletkenin kesitinden **birim zamanda geçen net yük** miktarıdır:
$$I = \frac{q}{t} \qquad \text{birim: amper (A)}$$

- Elektronlar **(−) kutuptan (+) kutba** hareket eder.
- **Geleneksel akım yönü**: (+) kutuptan (−) kutba.

# Farklı Ortamlarda Akım

| Ortam | Yük taşıyıcılar |
|---|---|
| **Katılar (metaller)** | Serbest elektronlar |
| **Sıvılar (elektrolitler)** | Pozitif ve negatif iyonlar (zıt kutuplara göç eder; ör. tuzlu su) |
| **Gazlar** | Düşük basınç ve yüksek gerilimde iyonlaşan gaz (neon lamba) |
""",
  [("Bir telden 4 saniyede 12 C yük geçiyor. Akım şiddeti kaç amperdir?", "$I = \\frac{12}{4} = 3$ A.")],
  ["$I = q/t$, birim amper.", "Geleneksel akım + → −; elektronlar − → +.", "Metal: elektron; elektrolit: iyon; gaz: iyonlaşma."]),

O("k3", "3.3", "Ohm yasası ve ölçü aletleri", "Ohm's law and measuring instruments", r"""
# Ohm Yasası

Sabit sıcaklıkta iletkenin uçları arasındaki potansiyel farkın akıma oranı **sabittir**:
$$R = \frac{V}{I} \qquad V = I\cdot R$$

- $V$–$I$ grafiği orijinden geçen doğrudur; **eğimi = direnç**.
- **Reosta:** sürgüsü kaydırılarak direnci değiştirilen ve akımı ayarlayan eleman.

# Ölçü Aletleri

| Alet | Ölçtüğü | İç direnci | Bağlanma |
|---|---|---|---|
| **Ampermetre** | Akım | Sıfıra yakın | **Seri** (paralel bağlanırsa kısa devre) |
| **Voltmetre** | Potansiyel fark | Çok büyük | **Paralel** (seri bağlanırsa akımı engeller) |
""",
  [("12 V'luk üretece bağlı 4 Ω'luk dirençten geçen akım kaçtır?", "$I = \\frac{V}{R} = \\frac{12}{4} = 3$ A."),
   ("$V$–$I$ grafiğinde 6 V'ta akım 2 A ise direnç kaç ohm'dur?", "Eğim $= \\frac{6}{2} = 3\\ \\Omega$.")],
  ["$V = IR$.", "$V$–$I$ eğimi = $R$.", "Ampermetre seri, voltmetre paralel."]),

O("k4", "3.4", "Dirençlerin bağlanması", "Connecting resistors", r"""
# Eşdeğer Direnç

Birden çok direncin yaptığı etkiyi tek başına yapan dirence **eşdeğer direnç** denir.

| | **Seri** | **Paralel** |
|---|---|---|
| Akım | Hepsinde aynı: $I = I_1 = I_2$ | Kollara bölünür: $I = I_1 + I_2$ |
| Gerilim | Paylaşılır: $V = V_1 + V_2$ | Hepsinde aynı: $V = V_1 = V_2$ |
| Eşdeğer | $R_{eş} = R_1 + R_2 + \dots$ | $\dfrac{1}{R_{eş}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots$ |
| Sonuç | $R_{eş}$ en büyükten büyük | $R_{eş}$ en küçükten küçük |

- İki paralel direnç için kısa yol: $R_{eş} = \dfrac{R_1 R_2}{R_1 + R_2}$.
- **Birleşik bağlama:** sadeleştirme içten dışa yapılır.
- **Kısa devre:** Direncin uçlarına direnci ihmal edilebilen bir tel bağlanırsa akım teli tercih eder; o dirençten akım geçmez.
""",
  [("3 Ω ve 6 Ω'luk dirençler paralel, bunlara 4 Ω seri bağlı. Eşdeğer direnç nedir?",
    "Paralel kısım $\\frac{3\\cdot6}{3+6} = 2\\ \\Omega$; toplam $2 + 4 = 6\\ \\Omega$."),
   ("Özdeş üç direnç (her biri 9 Ω) paralel bağlanıyor. $R_{eş}$ kaçtır?", "$\\frac{9}{3} = 3\\ \\Omega$.")],
  ["Seri: akım aynı, $R$ toplanır.", "Paralel: gerilim aynı, $1/R$ toplanır.", "Kısa devre edilen dirençten akım geçmez."]),

O("k5", "3.5", "Üreteçlerin bağlanması", "Connecting cells", r"""
# Üreteçlerin Bağlanması

| Bağlama | Nasıl? | Toplam gerilim | Sonuç |
|---|---|---|---|
| **Düz seri** | Zıt kutuplar uç uca (+ → −) | $V_1 + V_2$ | Yüksek gerilim; akım artar, piller çabuk biter |
| **Ters seri** | Aynı kutuplar birbirine | $V_1 - V_2$ | Gerilimler birbirini azaltır |
| **Paralel** (özdeş piller) | Aynı kutuplar kendi aralarında | $V$ (tek pil kadar) | Pillerin ömrü uzar |

> **Seri** bağlama yüksek gerilim, **paralel** bağlama uzun ömür sağlar.
""",
  [("1,5 V'luk 4 pil düz seri bağlanıyor. Toplam gerilim kaçtır? Paralel bağlansaydı?",
    "Düz seri: $4\\cdot1{,}5 = 6$ V. Paralel: $1{,}5$ V (ama piller daha uzun süre dayanır).")],
  ["Düz seri: gerilimler toplanır.", "Ters seri: farkı alınır.", "Paralel: gerilim aynı, ömür uzun."]),

O("k6", "3.6", "Akımın tehlikeleri ve topraklama", "Dangers of current and earthing", r"""
# Elektrik Akımının Tehlikeleri

Bilinçsiz kullanımda çarpılma, yanık ve yangın tehlikesi vardır.

- **Vücut direnci:** Kuru deride yüksek (≈ 100 000 – 500 000 Ω), **ıslak/terli** deride çok düşük (≈ 500 – 1000 Ω). Islakken aynı gerilimde geçen akım kat kat artar → tehlike büyür.

# Koruma Yöntemleri

| Yöntem | Görevi |
|---|---|
| **Sigorta** | Güvenli sınırın üstünde akımda eriyerek ya da mandal atarak devreyi keser |
| **Topraklama** | Cihaz gövdesindeki kaçak akımı kablo ve toprak çubuğuyla toprağa aktarır, çarpılmayı önler |
| **Paratoner (yıldırımsavar)** | Yıldırımın yükünü binaya zarar vermeden toprağa iletir |

### Güvenlik kuralları
Islak elle prize dokunma · çok sayıda cihazı tek prize bağlama · hasarlı kabloyu kullanma · çocuk kilitli priz kullan.
""",
  [("220 V'a ıslak elle (500 Ω) ve kuru elle (100 000 Ω) dokunulduğunda geçen akımları karşılaştırın.",
    "Islak: $\\frac{220}{500} = 0{,}44$ A (öldürücü olabilir). Kuru: $\\frac{220}{100000} = 0{,}0022$ A. Islak elde akım 200 kat büyük.")],
  ["Islak deride direnç düşük → tehlike büyük.", "Sigorta aşırı akımda devreyi keser.", "Topraklama kaçak akımı toprağa verir."]),
]),
U("u4", "4. Ünite: Dalgalar", "Unit 4: Waves", [
O("k1", "4.1", "Periyodik hareketler: sarkaçlar, periyot ve frekans", "Periodic motion: pendulums, period and frequency", r"""
# Periyodik Hareket

Eşit zaman aralıklarında kendini tekrarlayan harekettir.

| Sarkaç | Periyodu neye bağlı? |
|---|---|
| **Basit sarkaç** (ipe bağlı kütle) | İpin **uzunluğu** ve **yer çekimi ivmesi** — kütleye bağlı **değil** |
| **Yay sarkacı** | **Kütle** ve **yay sabiti** |

# Periyot ve Frekans

- **Periyot** $T$: bir tam salınım için geçen süre (s).
- **Frekans** $f$: bir saniyedeki salınım sayısı (Hz).
$$T\cdot f = 1$$
""",
  [("Bir sarkaç 10 saniyede 40 tam salınım yapıyor. Periyodu ve frekansı nedir?",
    "$f = \\frac{40}{10} = 4$ Hz, $T = \\frac14 = 0{,}25$ s."),
   ("Basit sarkacın kütlesi iki katına çıkarılırsa periyodu ne olur?", "Değişmez; basit sarkacın periyodu kütleye bağlı değildir.")],
  ["$T\\cdot f = 1$.", "Basit sarkaç: boy ve $g$'ye bağlı.", "Yay sarkacı: kütle ve yay sabitine bağlı."]),

O("k2", "4.2", "Dalgaların temel kavramları", "Basic wave concepts", r"""
# Dalga

Esnek bir ortamda oluşan titreşimin **enerjiyi** bir noktadan diğerine taşımasıdır (madde taşınmaz).

| Kavram | Tanım |
|---|---|
| **Tepe / çukur** | Denge konumunun üstündeki en yüksek / altındaki en alçak nokta |
| **Dalga boyu** $\lambda$ | Ardışık iki tepe (ya da çukur) arası uzaklık (m) |
| **Genlik** $A$ | Denge konumundan en büyük uzaklık; **enerjinin** ölçüsü |
| **Dalga sürati** $\vartheta$ | Birim zamanda alınan yol |

$$\vartheta = \lambda\cdot f$$

> **Frekans yalnızca kaynağa**, **sürat yalnızca ortama** bağlıdır. Dalga ortam değiştirince frekans aynı kalır; sürat ve dalga boyu değişir.
""",
  [("Frekansı 5 Hz, dalga boyu 2 m olan dalganın sürati kaçtır?", "$\\vartheta = 2\\cdot5 = 10$ m/s."),
   ("Ses havadan suya geçerken hangisi değişmez: frekans, sürat, dalga boyu?", "**Frekans** değişmez (kaynağa bağlı); sürat ve dalga boyu artar.")],
  ["$\\vartheta = \\lambda f$.", "Frekans kaynağa, sürat ortama bağlı.", "Genlik enerjinin ölçüsü."]),

O("k3", "4.3", "Dalgaların sınıflandırılması", "Classification of waves", r"""
# Taşıdığı Enerjiye Göre

| Mekanik dalgalar | Elektromanyetik dalgalar |
|---|---|
| Yayılmak için **maddesel ortam** gerekir | Yüklü parçacıkların ivmeli hareketiyle oluşur |
| **Boşlukta yayılamaz** | Boşlukta da yayılır |
| Ses, yay, su, deprem dalgaları | Radyo, mikrodalga, kızılötesi, görünür ışık, morötesi, X, gama |

# Titreşim Doğrultusuna Göre

| Enine | Boyuna |
|---|---|
| Titreşim, yayılma doğrultusuna **dik** | Titreşim, yayılma doğrultusuna **paralel** |
| Işık (tüm EM dalgalar), çırpılan ip | Ses, sıkıştırılıp bırakılan yay |

> Su ve deprem dalgaları hem enine hem boyuna özellik gösterebilir.
""",
  [("Ses uzay boşluğunda neden duyulmaz?", "Ses **mekanik** bir dalgadır; yayılmak için madde gerekir, boşlukta yayılamaz.")],
  ["Mekanik: ortam gerekir; EM: boşlukta da yayılır.", "Enine: dik; boyuna: paralel.", "Ses boyuna, ışık enine."]),

O("k4", "4.4", "Dalgaların yayılma süratini etkileyen etmenler", "Factors affecting wave speed", r"""
# Yayılma Sürati

Dalganın sürati **ortamın** özelliklerine (esneklik, yoğunluk, sıcaklık) bağlıdır.

| Dalga | Sürat |
|---|---|
| **Ses** | $\vartheta_{katı} > \vartheta_{sıvı} > \vartheta_{gaz}$; sıcaklık artınca artar (havada ≈ 340 m/s) |
| **Su dalgası** | Derinlik arttıkça sürat ve dalga boyu artar ($\vartheta_{derin} > \vartheta_{sığ}$) |
| **Elektromanyetik** | Boşlukta en büyük: $c \approx 3\cdot10^8$ m/s; yoğun ortamda azalır |
""",
  [("Şimşeği gördükten 3 s sonra gök gürültüsü duyuluyor. Şimşek yaklaşık kaç m uzakta çakmıştır? (ses 340 m/s)",
    "Işık neredeyse anında gelir; $340\\cdot3 = 1020$ m.")],
  ["Ses: katı > sıvı > gaz.", "Su dalgası: derin > sığ.", "EM dalga boşlukta en hızlı ($3\\cdot10^8$ m/s)."]),

O("k5", "4.5", "Su dalgalarında yansıma ve kırılma", "Reflection and refraction of water waves", r"""
# Yansıma

Dalganın engele çarpıp **aynı ortama** geri dönmesi.
- **Gelme açısı = yansıma açısı** ($i = r$, normale göre).
- Yansımada frekans, sürat ve dalga boyu **değişmez**.
- Düz engelden yansıma; çukur engel dalgayı **odakta toplar**, tümsek engel **dağıtır**.

# Kırılma

Dalganın derin–sığ ortam değiştirirken **hız ve doğrultu** değiştirmesi.

| Derinden sığa | Sığdan derine |
|---|---|
| Sürat azalır | Sürat artar |
| Dalga boyu küçülür ($\lambda_{derin} > \lambda_{sığ}$) | Dalga boyu büyür |
| **Normale yaklaşır** | Normalden uzaklaşır |

Frekans **değişmez**.
""",
  [("Derin ortamda dalga boyu 4 cm olan dalga sığ ortama geçince 2 cm oluyor. Sürat nasıl değişir?",
    "Frekans sabit, $\\vartheta = \\lambda f$ → dalga boyu yarıya indiğine göre sürat de **yarıya** iner.")],
  ["Yansıma: $i = r$, frekans/sürat/dalga boyu aynı.", "Derinden sığa: yavaşlar, $\\lambda$ küçülür, normale yaklaşır.", "Kırılmada frekans değişmez."]),

O("k6", "4.6", "Rezonans ve deprem", "Resonance and earthquakes", r"""
# Rezonans

Dışarıdan uygulanan titreşimin frekansı sistemin **doğal frekansına eşit** olduğunda salınım genliğinin **en büyük** değere ulaşmasıdır.
- Örnekler: salıncağı doğru anda itmek, kadehin sesle kırılması, askerlerin köprüde uygun adım yürümemesi.
- Deprem dalgalarının frekansı binanın doğal frekansıyla eşleşirse **rezonans yıkıma** yol açabilir.

# Deprem

Yer kabuğundaki kırılmalarla oluşan **sismik dalgalar**dır.

| Kavram | Tanım |
|---|---|
| **Odak noktası (hiposantr)** | Kırılmanın başladığı yer altındaki nokta |
| **Merkez üssü (episantr)** | Odak noktasının yeryüzündeki izdüşümü |
| **Büyüklük** | Açığa çıkan enerjinin ölçüsü; **tek** bir değerdir (Richter / moment büyüklüğü) |
| **Şiddet** | Yapılara ve çevreye verilen zararın derecesi; **yere göre değişir** (Mercalli) |
""",
  [("Aynı depremin farklı şehirlerde farklı hasar vermesi büyüklükle mi şiddetle mi ilgilidir?",
    "**Şiddet**le. Büyüklük tektir; şiddet uzaklığa, zemine ve yapıya göre değişir.")],
  ["Rezonans: dış frekans = doğal frekans → en büyük genlik.", "Hiposantr yer altında, episantr yüzeyde.", "Büyüklük tek, şiddet yere göre değişir."]),
]),
]

from _ek136 import uygula136; uygula136(units, "fiz10")

from ek_genel import uygula; uygula(units, "fiz10_ek142")  # 1.43: TYT optik temelleri

write("fiz-10.js", "10/fizik", "10. Sınıf Fizik — kapsamlı konu anlatım notları",
      "kullanıcının verdiği \"10. Sınıf Fizik Ders Kitabı – Kapsamlı Konu Anlatım Notları\" (4 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Tablolar ve örnek soruların bir kısmı eklendi.")
