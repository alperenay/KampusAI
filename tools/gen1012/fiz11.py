# -*- coding: utf-8 -*-
"""11. Sınıf Fizik konu anlatım notları → js/data/content/fiz-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Kuvvet ve Hareket", "Unit 1: Force and Motion", [
O("k1", "1.1", "Serbest düşme ve düşey atış", "Free fall and vertical projection", r"""
# Serbest Düşme

Yalnızca **yer çekimi** etkisinde, ilk hızsız düşme (hava direnci ihmal). İvme sabittir: $g \approx 9{,}8 \text{ m/s}^2$ (problemlerde genellikle $10 \text{ m/s}^2$).

Aşağı yön pozitif alınırsa ($v_0 = 0$):
$$v = gt \qquad h = \tfrac{1}{2}gt^2 \qquad v^2 = 2gh$$

> Hava direnci yoksa düşme süresi **kütleden bağımsızdır**: tüy ve çekiç boşlukta aynı anda düşer (Apollo 15, Ay).

**Ardışık saniyelerde alınan yollar** $5, 15, 25, 35\ldots$ m (oran $1:3:5:7$).

# Düşey Atışlar

**Yukarı atış** (yukarı pozitif, ivme $-g$):
$$v = v_0 - gt \qquad h = v_0 t - \tfrac{1}{2}gt^2 \qquad v^2 = v_0^2 - 2gh$$
- Tepe noktasında $v = 0$ → çıkış süresi $t_{\text{çıkış}} = \dfrac{v_0}{g}$, maksimum yükseklik $h_{max} = \dfrac{v_0^2}{2g}$.
- Hava direnci yoksa **çıkış ve iniş süreleri eşittir**; cisim atıldığı noktaya **aynı süratle** döner.

**Aşağı atış:** $v = v_0 + gt$, $h = v_0t + \tfrac12 gt^2$.

| Grafik | Serbest düşme (aşağı +) |
|---|---|
| $v$–$t$ | Orijinden geçen eğik doğru, eğim $= g$ |
| $h$–$t$ | Parabol |
| $a$–$t$ | Yatay doğru ($a = g$) |
""",
  [(r"Yerden $40$ m/s ile düşey yukarı atılan cisim kaç saniye havada kalır ve en fazla kaç metre yükselir? ($g=10\text{ m/s}^2$)", r"Çıkış süresi $t = \frac{40}{10} = 4$ s; toplam uçuş $2 \cdot 4 = 8$ s. $h_{max} = \frac{40^2}{2\cdot10} = 80$ m."),
   (r"$45$ m yükseklikten serbest bırakılan cisim kaç saniyede yere düşer, yere çarpma hızı nedir?", r"$45 = \frac12 \cdot 10 \cdot t^2 \Rightarrow t^2 = 9,\ t = 3$ s. $v = gt = 30$ m/s.")],
  [r"Serbest düşme: $v=gt$, $h=\frac12gt^2$, kütleden bağımsız.", r"Yukarı atış: $t_{çıkış}=v_0/g$, $h_{max}=v_0^2/2g$.", "Çıkış ve iniş süreleri eşit."]),
O("k2", "1.2", "İki boyutta hareket: yatay ve eğik atış", "Two-dimensional motion: horizontal and oblique projection", r"""
# Bağımsızlık İlkesi
Yatay ve düşey hareketler **birbirinden bağımsızdır**. Yatayda ivme **0** (hız sabit), düşeyde ivme **$g$**.

# Yatay Atış
Yükseklik $h$'den yatay $v_0$ hızla atılan cisim:
$$x = v_0 t \qquad h = \tfrac12 g t^2 \qquad v_y = gt$$
- Uçuş süresi yalnızca **yüksekliğe** bağlıdır: $t = \sqrt{2h/g}$. Aynı yükseklikten yatay atılan ve serbest bırakılan cisimler yere **aynı anda** düşer.
- Yörünge **paraboldür**. Herhangi bir andaki hız: $v = \sqrt{v_0^2 + v_y^2}$.

# Eğik Atış
Yatayla $\theta$ açısıyla $v_0$ hızıyla atılan cisim:
$$v_{0x} = v_0\cos\theta \qquad v_{0y} = v_0\sin\theta$$

| Büyüklük | Formül |
|---|---|
| Tepeye çıkış süresi | $t_{ç} = \dfrac{v_0\sin\theta}{g}$ |
| Uçuş süresi | $t_u = \dfrac{2v_0\sin\theta}{g}$ |
| Maksimum yükseklik | $h_{max} = \dfrac{v_0^2\sin^2\theta}{2g}$ |
| Menzil | $R = \dfrac{v_0^2 \sin 2\theta}{g}$ |

- Tepe noktasında hız **yataydır** ve $v_0\cos\theta$'ya eşittir (sıfır değil!).
- Maksimum menzil $\theta = 45°$'de; **tümler açılarda** (ör. $30°$ ve $60°$) menziller **eşittir**.
""",
  [(r"$80$ m yükseklikten yatay $20$ m/s hızla atılan cisim atıldığı yerden ne kadar uzağa düşer?", r"$t = \sqrt{2\cdot80/10} = 4$ s. $x = 20 \cdot 4 = 80$ m."),
   (r"$v_0 = 50$ m/s, $\theta = 37°$ ($\sin37=0{,}6$, $\cos37=0{,}8$) ile atılan cismin menzili ve maksimum yüksekliği?", r"$v_{0x}=40$, $v_{0y}=30$ m/s. $t_u = 2\cdot30/10 = 6$ s. $R = 40\cdot6 = 240$ m. $h_{max} = 30^2/20 = 45$ m.")],
  ["Yatayda sabit hız, düşeyde serbest düşme.", r"Yatay atışta süre yalnızca $h$'ye bağlı.", r"Menzil $R=v_0^2\sin2\theta/g$; en büyük $45°$'de."]),
O("k3", "1.3", "Newton'ın hareket yasaları", "Newton's laws of motion", r"""
# Üç Yasa
1. **Eylemsizlik:** Net kuvvet sıfırsa cisim durumunu korur (duruyorsa durur, sabit hızla gidiyorsa öyle gider). Otobüs aniden fren yapınca yolcuların öne savrulması.
2. **Temel yasa:** $$\vec{F}_{net} = m\vec{a}$$ İvme net kuvvetle **aynı yönlü** ve doğru orantılı, kütleyle ters orantılıdır. Birim: $1\text{ N} = 1 \text{ kg}\cdot\text{m/s}^2$.
3. **Etki–tepki:** A cismi B'ye $\vec F$ uygularsa B de A'ya $-\vec F$ uygular. Kuvvetler **farklı cisimlere** etki ettiği için birbirini yok etmez.

# Serbest Cisim Diyagramı ve Sık Kullanılan Kuvvetler
- **Ağırlık:** $G = mg$, Dünya'nın merkezine doğru.
- **Normal kuvvet $N$:** Yüzeye dik, yüzeyin tepkisi.
- **Gerilme $T$:** İp boyunca.
- **Sürtünme:** Harekete (ya da hareket eğilimine) zıt.

**Çözüm adımları:** Kuvvetleri çiz → bileşenlere ayır → hareket yönünde $\sum F = ma$, dik yönde $\sum F = 0$.

# Örnek Durumlar
- **Eğik düzlem (sürtünmesiz):** $a = g\sin\theta$; $N = mg\cos\theta$.
- **Asansör:** Yukarı ivmelenirken $N = m(g + a)$ (daha ağır hissedilir); aşağı ivmelenirken $N = m(g - a)$.
- **Makara ile bağlı cisimler:** Sistem için $a = \dfrac{F_{net,dış}}{m_{toplam}}$.
""",
  [(r"Kütleleri $2$ kg ve $3$ kg olan iki blok sürtünmesiz yatay düzlemde birbirine dokunuyor. $2$ kg'lık bloğa $20$ N yatay kuvvet uygulanıyor. İvme ve bloklar arasındaki kuvvet nedir?", r"$a = \frac{20}{2+3} = 4\text{ m/s}^2$. $3$ kg'lık bloğu iten kuvvet $F = 3 \cdot 4 = 12$ N."),
   (r"$60$ kg'lık bir kişi $2\text{ m/s}^2$ ivmeyle yukarı hızlanan asansördeki tartıda kaç N gösterir?", r"$N = m(g+a) = 60(10+2) = 720$ N.")],
  ["Eylemsizlik: net kuvvet yoksa durum değişmez.", r"$F_{net}=ma$; ivme net kuvvetle aynı yönde.", "Etki–tepki farklı cisimlere etki eder."]),
O("k4", "1.4", "Sürtünme kuvveti", "Friction", r"""
# Sürtünme Türleri
- **Statik sürtünme:** Cisim **henüz hareket etmezken**; uygulanan kuvvete eşit ve zıttır, en büyük değeri: $$f_{s,max} = \mu_s N$$
- **Kinetik sürtünme:** Cisim **kayarken**: $$f_k = \mu_k N$$
- Genellikle $\mu_s > \mu_k$ → harekete başlatmak, hareketi sürdürmekten zordur.

# Sürtünmeyi Etkileyen ve Etkilemeyen Etkenler
| Etkiler | Etkilemez (ideal model) |
|---|---|
| Yüzeylerin cinsi ($\mu$) | Temas yüzeyinin **alanı** |
| **Normal kuvvet** | Hız (düşük hızlarda) |

# Kuvvet–Sürtünme Grafiği
Uygulanan kuvvet artarken sürtünme önce kuvvete **eşit** artar (statik), $f_{s,max}$'a ulaşınca cisim harekete geçer ve sürtünme **sabit** $f_k$ değerine düşer.

# Eğik Düzlemde Sürtünme
$$a = g(\sin\theta - \mu_k\cos\theta)$$
Cisim sabit hızla kayıyorsa $\mu_k = \tan\theta$.
""",
  [(r"$5$ kg'lık kutu yatay düzlemde ($\mu_k = 0{,}2$) $30$ N yatay kuvvetle çekiliyor. İvmesi nedir?", r"$N = mg = 50$ N, $f_k = 0{,}2 \cdot 50 = 10$ N. $F_{net} = 30 - 10 = 20$ N, $a = 20/5 = 4\text{ m/s}^2$.")],
  [r"$f_{s,max}=\mu_sN$, $f_k=\mu_kN$, genellikle $\mu_s>\mu_k$.", "Sürtünme yüzey alanına bağlı değildir.", r"Eğik düzlemde $a=g(\sin\theta-\mu\cos\theta)$."]),
O("k5", "1.5", "Hava direnci ve limit hız", "Air resistance and terminal velocity", r"""
# Hava Direnci
Akışkan içinde hareket eden cisme etki eden, hıza bağlı direnç kuvveti:
$$F_d \approx k A v^2$$
($A$: kesit alanı, $v$: hız, $k$: şekle ve havanın yoğunluğuna bağlı sabit)

# Limit (Son) Hız
Düşen cisimde hız arttıkça hava direnci artar. **Hava direnci ağırlığa eşit** olduğunda net kuvvet, dolayısıyla **ivme sıfır** olur; cisim **sabit hızla** düşer:
$$mg = kAv_L^2 \Rightarrow v_L = \sqrt{\frac{mg}{kA}}$$

- **Kesit alanı büyükse** limit hız **küçüktür** → paraşüt açılınca hız büyük ölçüde azalır.
- **Kütle büyükse** limit hız büyüktür.

| Aşama | Hız | İvme |
|---|---|---|
| Düşme başı | Küçük | $\approx g$ |
| Hız artarken | Artar | Azalır |
| Limit hıza ulaşınca | Sabit | 0 |

$v$–$t$ grafiği önce eğimli, sonra yatay bir eğridir.
""",
  [("Paraşütçü paraşütünü açtığında hızı ve ivmesi nasıl değişir?", r"Kesit alanı büyüdüğü için hava direnci ağırlıktan **büyük** olur, net kuvvet **yukarı** yönlüdür; paraşütçü **yavaşlar**. Hız azaldıkça direnç azalır ve yeni, **daha küçük** limit hıza ulaşılır.")],
  ["Hava direnci hız ve kesit alanıyla artar.", "Direnç = ağırlık → ivme 0 → limit hız.", "Paraşüt limit hızı küçültür."]),
O("k6", "1.6", "Düzgün çembersel hareket", "Uniform circular motion", r"""
# Temel Kavramlar
Hızın **büyüklüğü sabit**, **yönü sürekli değişir** → ivme vardır (merkezcil ivme).

| Büyüklük | Formül |
|---|---|
| Periyot $T$ | Bir tam turun süresi (s) |
| Frekans $f$ | $f = 1/T$ (Hz) |
| Çizgisel hız | $v = \dfrac{2\pi r}{T} = 2\pi r f$ |
| Açısal hız | $\omega = \dfrac{2\pi}{T}$, $v = \omega r$ |
| Merkezcil ivme | $a_m = \dfrac{v^2}{r} = \omega^2 r$ (merkeze doğru) |
| Merkezcil kuvvet | $F_m = \dfrac{mv^2}{r}$ |

> Merkezcil kuvvet **ayrı bir kuvvet türü değildir**; merkeze yönelen kuvvetlerin bileşkesidir: ipteki gerilme, sürtünme, kütle çekimi, normal kuvvet…

# Örnekler
- **Virajda dönen araç:** Merkezcil kuvveti **sürtünme** sağlar: $\mu mg \ge \dfrac{mv^2}{r} \Rightarrow v_{max} = \sqrt{\mu g r}$.
- **Uydu:** Merkezcil kuvveti **kütle çekimi** sağlar.
- **Düşey çemberin tepesi:** Cismin düşmeden dönebilmesi için $v_{min} = \sqrt{gr}$.
- İp koparsa cisim çembere **teğet** doğrultuda gider (eylemsizlik).
""",
  [(r"$0{,}5$ kg'lık cisim $2$ m uzunluğundaki iple yatay düzlemde $4$ m/s hızla döndürülüyor. İpteki gerilme nedir?", r"$T = \frac{mv^2}{r} = \frac{0{,}5 \cdot 16}{2} = 4$ N."),
   (r"Yarıçapı $50$ m olan düz virajda $\mu = 0{,}5$ ise araç en fazla kaç m/s hızla dönebilir?", r"$v_{max} = \sqrt{\mu g r} = \sqrt{0{,}5\cdot10\cdot50} = \sqrt{250} \approx 15{,}8$ m/s.")],
  ["Sürat sabit, yön değişir → merkezcil ivme.", r"$a=v^2/r=\omega^2r$, $F=mv^2/r$.", "Merkezcil kuvveti gerilme, sürtünme ya da çekim sağlar."]),
]),
U("u2", "2. Ünite: Enerji ve Momentum", "Unit 2: Energy and Momentum", [
O("k1", "2.1", "İş, enerji, güç ve enerjinin korunumu", "Work, energy, power and conservation", r"""
# İş
$$W = F\,x\cos\theta$$
Kuvvet yer değiştirmeye **dik** ise iş yapılmaz ($\cos 90° = 0$); zıt ise iş **negatiftir** (sürtünme). Birim: joule (J).

# Enerji Türleri
- **Kinetik:** $E_k = \tfrac12 mv^2$
- **Çekim potansiyel:** $E_p = mgh$
- **Esneklik potansiyel:** $E_{yay} = \tfrac12 kx^2$ (Hooke: $F = kx$)

# İş–Enerji Teoremi
$$W_{net} = \Delta E_k$$

# Mekanik Enerjinin Korunumu
Sürtünme yoksa: $E_k + E_p = \text{sabit}$ → $\tfrac12 mv_1^2 + mgh_1 = \tfrac12 mv_2^2 + mgh_2$.
Sürtünme varsa: $E_{mek,ilk} - |W_{sürt}| = E_{mek,son}$; kayıp enerji **ısıya** dönüşür.

# Güç ve Verim
$$P = \frac{W}{t} = F\,v \qquad \text{Verim} = \frac{\text{yararlı enerji}}{\text{harcanan enerji}}\times100$$
""",
  [(r"Sürtünmesiz bir rampada $20$ m yükseklikten durgun bırakılan cismin yere ulaştığındaki hızı?", r"$mgh = \frac12 mv^2 \Rightarrow v = \sqrt{2gh} = \sqrt{400} = 20$ m/s.")],
  [r"$W=Fx\cos\theta$; dik kuvvet iş yapmaz.", r"$W_{net}=\Delta E_k$.", "Sürtünmesiz ortamda mekanik enerji korunur."]),
O("k2", "2.2", "İtme ve çizgisel momentum", "Impulse and linear momentum", r"""
# Momentum ve İtme
$$\vec p = m\vec v \qquad \vec I = \vec F\,\Delta t = \Delta\vec p$$
- Momentum **vektöreldir**, birimi kg·m/s.
- **İtme = momentum değişimi.** Aynı momentum değişimi **daha uzun sürede** olursa kuvvet **küçülür** → hava yastığı, emniyet kemeri, kumda düşme, eldivenle top tutma.
- $F$–$t$ grafiğinin altındaki alan **itmeyi** verir.

# Momentumun Korunumu
Dış kuvvet yoksa sistemin toplam momentumu sabittir:
$$m_1\vec v_1 + m_2\vec v_2 = m_1\vec v_1\,' + m_2\vec v_2\,'$$

| Çarpışma | Momentum | Kinetik enerji |
|---|---|---|
| **Esnek** | Korunur | Korunur |
| **Esnek olmayan** | Korunur | Korunmaz |
| **Tam esnek olmayan** (yapışarak) | Korunur | En fazla kayıp |

**Patlama / tepki:** Başlangıçta duran sistem için $m_1 v_1 = m_2 v_2$ (zıt yönde) — tüfeğin geri tepmesi, roket.
""",
  [(r"$2$ kg ve $6$ m/s hızlı araba, duran $1$ kg'lık arabaya çarpıp yapışıyor. Ortak hız nedir?", r"$2\cdot6 = (2+1)v' \Rightarrow v' = 4$ m/s.")],
  [r"$p=mv$; itme $F\Delta t=\Delta p$.", "Dış kuvvet yoksa momentum korunur.", "Esnek çarpışmada kinetik enerji de korunur."]),
]),
U("u3", "3. Ünite: Elektrik ve Manyetizma", "Unit 3: Electricity and Magnetism", [
O("k1", "3.1", "Elektriksel kuvvet, alan, potansiyel ve sığaç", "Electric force, field, potential and capacitors", r"""
# Coulomb Yasası
$$F = k\frac{q_1 q_2}{d^2} \qquad k = 9\times10^9\ \text{N·m}^2/\text{C}^2$$
Aynı işaretli yükler **iter**, zıt işaretliler **çeker**. Kuvvet uzaklığın **karesiyle ters** orantılı.

# Elektrik Alan
Birim pozitif yüke etki eden kuvvet: $$E = \frac{F}{q} = k\frac{q}{d^2}$$ Alan çizgileri **pozitiften çıkar, negatife girer**. Paralel levhalar arasında alan **düzgündür**: $E = \dfrac{V}{d}$.

# Elektriksel Potansiyel ve Potansiyel Fark
- Potansiyel: $V = k\dfrac{q}{d}$ (skaler).
- Yükü A'dan B'ye taşırken yapılan iş: $W = q\,(V_B - V_A)$.
- Paralel levhalar arasında hızlanan yük: $qV = \tfrac12 mv^2$.

# Sığaç (Kondansatör)
Yük depolayan devre elemanı:
$$C = \frac{q}{V} \qquad C = \varepsilon\frac{A}{d} \qquad E_{depolanan} = \tfrac12 qV = \tfrac12 CV^2$$
- Levha alanı ↑ → $C$ ↑; levhalar arası uzaklık ↑ → $C$ ↓; araya yalıtkan (dielektrik) → $C$ ↑.
- **Paralel bağlı:** $C_{eş} = C_1 + C_2$. **Seri bağlı:** $\dfrac{1}{C_{eş}} = \dfrac1{C_1} + \dfrac1{C_2}$.
""",
  [(r"İki nokta yük arasındaki uzaklık 2 katına çıkarılırsa aralarındaki kuvvet nasıl değişir?", r"$F \propto \frac{1}{d^2}$ → kuvvet $\frac{1}{4}$'üne iner.")],
  [r"Coulomb: $F=kq_1q_2/d^2$.", r"Alan $E=kq/d^2$; levhalar arası $E=V/d$.", r"Sığa $C=q/V=\varepsilon A/d$."]),
O("k2", "3.2", "Elektrik akımı, Ohm yasası ve devreler", "Electric current, Ohm's law and circuits", r"""
# Temel Büyüklükler
- **Akım:** $I = \dfrac{q}{t}$ (amper)
- **Ohm yasası:** $V = I\,R$
- **Direnç:** $R = \rho\dfrac{L}{A}$ (uzunlukla doğru, kesitle ters orantılı)
- **Elektriksel güç:** $P = VI = I^2R = \dfrac{V^2}{R}$; enerji $E = Pt$

# Direnç Bağlama
| | Seri | Paralel |
|---|---|---|
| Eşdeğer | $R_{eş} = R_1 + R_2 + \ldots$ | $\dfrac1{R_{eş}} = \dfrac1{R_1} + \dfrac1{R_2} + \ldots$ |
| Ortak olan | **Akım** | **Gerilim** |
| Paylaşılan | Gerilim (dirençle orantılı) | Akım (dirençle ters orantılı) |

İki paralel direnç için: $R_{eş} = \dfrac{R_1R_2}{R_1+R_2}$.

# Üreteç
$\varepsilon$: emk, $r$: iç direnç → $I = \dfrac{\varepsilon}{R + r}$; uç gerilimi $V = \varepsilon - Ir$.
- Üreteçler **seri** → emk'ler toplanır; **paralel** (özdeş) → emk aynı, ömür uzar.

**Ampermetre** devreye **seri**, **voltmetre** **paralel** bağlanır.
""",
  [(r"$6\,\Omega$ ve $3\,\Omega$ dirençler paralel bağlanıp $12$ V'luk iç dirençsiz üretece bağlanıyor. Ana koldaki akım?", r"$R_{eş} = \frac{6\cdot3}{9} = 2\,\Omega$. $I = 12/2 = 6$ A.")],
  [r"$V=IR$, $R=\rho L/A$, $P=VI$.", "Seride akım ortak, paralelde gerilim ortak.", r"$I=\varepsilon/(R+r)$."]),
O("k3", "3.3", "Manyetizma, manyetik kuvvet ve indüksiyon", "Magnetism, magnetic force and induction", r"""
# Manyetik Alan
- Mıknatısta alan çizgileri **N'den çıkar, S'ye girer**.
- Akım taşıyan **düz telin** çevresinde dairesel alan oluşur (**sağ el kuralı**: başparmak akım, parmaklar alan): $B = \dfrac{\mu_0 I}{2\pi d}$.
- **Akım makarası (selenoid):** İçinde düzgün alan: $B = \mu_0\dfrac{N}{L}I$.

# Manyetik Kuvvet
- **Hareketli yüke (Lorentz):** $F = qvB\sin\theta$ → yük alana dik girerse **çembersel** hareket yapar: $r = \dfrac{mv}{qB}$.
- **Akım taşıyan tele:** $F = BIL\sin\theta$. **Elektrik motorunun** çalışma ilkesidir.
- Aynı yönde akım taşıyan paralel teller **çeker**, zıt yönde akım taşıyanlar **iter**.

# Elektromanyetik İndüksiyon
**Manyetik akı:** $\Phi = BA\cos\theta$.
**Faraday yasası:** Akı değiştiğinde emk oluşur: $$\varepsilon = -N\frac{\Delta\Phi}{\Delta t}$$
**Lenz kuralı:** İndüksiyon akımı, kendisini oluşturan **akı değişimine karşı koyacak** yöndedir (eksi işaret).
- Manyetik alanda hareket eden çubuk: $\varepsilon = BLv$.

# Uygulamalar
| Cihaz | İlke |
|---|---|
| **Jeneratör (üreteç)** | Mekanik → elektrik (indüksiyon) |
| **Elektrik motoru** | Elektrik → mekanik (akımlı tele kuvvet) |
| **Transformatör** | $\dfrac{V_1}{V_2} = \dfrac{N_1}{N_2}$; yalnızca **alternatif akımla** çalışır |
| İndüksiyon ocağı, kartlı ödeme, kablosuz şarj | Değişen manyetik alan |
""",
  [(r"Primer sargısı 200, sekonder sargısı 1000 sarımlı ideal transformatörün primerine $220$ V uygulanırsa sekonder gerilimi?", r"$\frac{220}{V_2} = \frac{200}{1000} \Rightarrow V_2 = 1100$ V (yükseltici).")],
  ["Sağ el kuralı; düz telde ve selenoidde alan.", r"$F=qvB$, $F=BIL$: motor ilkesi.", r"Faraday $\varepsilon=-N\Delta\Phi/\Delta t$, Lenz; jeneratör ve transformatör."]),
]),
U("u4", "4. Ünite: Dalgalar ve Optik", "Unit 4: Waves and Optics", [
O("k1", "4.1", "Dalga büyüklükleri, yansıma, kırılma, girişim, kırınım", "Wave quantities, reflection, refraction, interference, diffraction", r"""
# Dalga Büyüklükleri
- **Genlik** (enerjiyle ilgili), **dalga boyu** $\lambda$, **frekans** $f$, **periyot** $T = 1/f$
- **Dalga hızı:** $v = \lambda f$
- Hız **ortama** bağlıdır; frekans **kaynağa** bağlıdır ve ortam değişse de **değişmez**.
- **Enine** dalga (titreşim yayılmaya dik: ışık, ip dalgası) / **boyuna** dalga (paralel: ses, yay).

# Dalga Olayları
| Olay | Açıklama |
|---|---|
| **Yansıma** | Gelme açısı = yansıma açısı. Sabit uçtan yansımada dalga **ters döner** |
| **Kırılma** | Ortam değişince hız ve dalga boyu değişir, doğrultu değişir. Snell: $n_1\sin\theta_1 = n_2\sin\theta_2$; $n = c/v$ |
| **Tam yansıma** | Yoğun ortamdan az yoğuna geçerken gelme açısı **sınır açıyı** aşarsa (fiber optik) |
| **Girişim** | Dalgaların üst üste binmesi: aynı fazda → **yapıcı** (parlak), zıt fazda → **yıkıcı** (karanlık). Young deneyi: saçak aralığı $\Delta x = \dfrac{\lambda L}{d}$ |
| **Kırınım** | Dalganın engel ya da yarık kenarından bükülerek yayılması; yarık genişliği dalga boyuna yakınsa belirgin |
| **İnce film** | Sabun köpüğü ve yağ tabakasındaki renkler: üst ve alt yüzeyden yansıyan ışınların girişimi |
""",
  [("Işık havadan suya geçerken hangi büyüklükleri değişir, hangisi değişmez?", "**Hız** ve **dalga boyu** azalır; **frekans** (ve dolayısıyla renk) **değişmez**, çünkü frekans kaynağa bağlıdır.")],
  [r"$v=\lambda f$; frekans kaynağa, hız ortama bağlı.", "Snell yasası; tam yansıma ve fiber optik.", "Girişim (Young) ve kırınım dalga doğasını kanıtlar."]),
O("k2", "4.2", "Aynalar ve mercekler", "Mirrors and lenses", r"""
# Düz Ayna
Görüntü **sanal, düz**, cisimle **aynı boyda** ve aynaya **eşit uzaklıkta**.

# Küresel Aynalar ve İnce Mercekler
$$\frac{1}{f} = \frac{1}{d_c} + \frac{1}{d_g} \qquad \text{büyütme } m = \frac{h_g}{h_c} = -\frac{d_g}{d_c}$$

| | Çukur ayna / İnce kenarlı (yakınsak) mercek | Tümsek ayna / Kalın kenarlı (ıraksak) mercek |
|---|---|---|
| Odak | Gerçek, $f > 0$ | Sanal, $f < 0$ |
| Görüntü | Cismin yerine göre **gerçek-ters** ya da (odak içinde) **sanal-düz-büyük** | Her zaman **sanal, düz, küçük** |
| Kullanım | Diş hekimi aynası, far, büyüteç, fotoğraf makinesi, göz merceği | Dikiz aynası, market güvenlik aynası; miyop gözlüğü |

**Çukur ayna / yakınsak mercekte cismin yeri:**
- $2f$'nin dışında → gerçek, ters, **küçük**
- $2f$'de → gerçek, ters, **eşit**
- $f$ ile $2f$ arası → gerçek, ters, **büyük**
- Odakta → görüntü **oluşmaz** (ışınlar paralel)
- Odak içinde → **sanal, düz, büyük** (büyüteç)

**Göz kusurları:** **Miyop** (uzağı göremez, görüntü retinanın önünde) → **kalın kenarlı** mercek. **Hipermetrop** (yakını göremez) → **ince kenarlı** mercek.
""",
  [(r"Odak uzaklığı $10$ cm olan ince kenarlı merceğin $30$ cm önüne konan cismin görüntüsü nerede oluşur, özellikleri nedir?", r"$\frac1{10} = \frac1{30} + \frac1{d_g} \Rightarrow d_g = 15$ cm. $m = -\frac{15}{30} = -\frac12$ → **gerçek, ters**, yarı boyda.")],
  ["Düz ayna: sanal, düz, eşit boy.", r"$1/f=1/d_c+1/d_g$; $m=-d_g/d_c$.", "Miyop kalın kenarlı, hipermetrop ince kenarlı mercek."]),
O("k3", "4.3", "Ses dalgaları ve Doppler olayı", "Sound waves and the Doppler effect", r"""
# Ses Dalgaları
- **Boyuna, mekanik** dalga; yayılmak için **maddesel ortam** gerekir (boşlukta yayılmaz).
- Hız: katılarda > sıvılarda > gazlarda; havada yaklaşık **340 m/s**; sıcaklık arttıkça artar.
- **Şiddet** (genlik, desibel), **yükseklik/incelik** (frekans), **tını** (kaynağın kendine özgü dalga biçimi).
- İnsan kulağı ≈ **20 Hz – 20 000 Hz** arasını duyar. Altı **infrases**, üstü **ultrases** (ultrason, sonar).
- **Yankı:** Yansıyan sesin duyulması; uzaklık ölçümü $d = \dfrac{v\,t}{2}$.
- **Rezonans:** Doğal frekansla uyarılan sistemin büyük genlikle titreşmesi.

# Doppler Olayı
Kaynak ile gözlemci birbirine **yaklaşırken** algılanan frekans **artar** (ses incelir), **uzaklaşırken azalır** (kalınlaşır). Ambulans sireninde duyulur.

**Uygulamalar:** Hız radarları, Doppler ultrason (kan akışı), astronomide **kırmızıya kayma** (galaksilerin uzaklaşması → evrenin genişlemesi).
""",
  [(r"Bir yarasa gönderdiği sesin yankısını $0{,}02$ s sonra duyuyor ($v=340$ m/s). Engel ne kadar uzaktadır?", r"$d = \frac{340\cdot0{,}02}{2} = 3{,}4$ m.")],
  ["Ses boyuna mekanik dalga, boşlukta yayılmaz.", "Frekans → incelik; genlik → şiddet; tını.", "Doppler: yaklaşınca frekans artar."]),
]),
U("u5", "5. Ünite: Modern Fiziğe Giriş", "Unit 5: Introduction to Modern Physics", [
O("k1", "5.1", "Foton kavramı ve fotoelektrik olay", "Photons and the photoelectric effect", r"""
# Foton
Işık enerjisi **paketler (kuantum)** hâlinde taşınır; her paket bir **foton**dur:
$$E = hf = \frac{hc}{\lambda} \qquad h = 6{,}63\times10^{-34}\ \text{J·s}$$
Frekans büyüdükçe (dalga boyu küçüldükçe) foton enerjisi artar: mor > mavi > … > kırmızı.

# Fotoelektrik Olay
Metal yüzeye yeterli frekansta ışık düşünce **elektron sökülmesi** (Einstein, 1905 — Nobel 1921).
$$E_{foton} = W_0 + E_{k,max} \qquad hf = hf_0 + \tfrac12 mv_{max}^2$$
- $W_0$: **eşik enerjisi (bağlanma enerjisi)**, $f_0$: **eşik frekansı**.
- $f < f_0$ ise ışık ne kadar **şiddetli** olursa olsun elektron sökülmez.
- **Işık şiddeti** artarsa sökülen elektron **sayısı** (akım) artar; elektronların **maksimum kinetik enerjisi** değişmez.
- **Frekans** artarsa $E_{k,max}$ artar.
- **Kesme (durdurma) gerilimi:** $eV_k = E_{k,max}$.

> Bu sonuçlar ışığın yalnızca dalga modeliyle açıklanamaz → ışığın **tanecik** doğası; ışık **dalga–parçacık ikiliği** gösterir.

**Uygulamalar:** Güneş pilleri, fotosel kapılar, ışık sensörleri, dijital kameralar.
""",
  [(r"Eşik enerjisi $2$ eV olan metale $5$ eV enerjili foton düşüyor. Sökülen elektronların maksimum kinetik enerjisi ve kesme gerilimi nedir?", r"$E_{k,max} = 5 - 2 = 3$ eV; kesme gerilimi $V_k = 3$ V.")],
  [r"$E=hf=hc/\lambda$.", r"$hf=W_0+E_{k,max}$; $f<f_0$ ise elektron sökülmez.", "Şiddet sayıyı, frekans kinetik enerjiyi belirler."]),
O("k2", "5.2", "Atom modelleri, spektrum, temel parçacıklar ve çekirdek", "Atomic models, spectra, particles and the nucleus", r"""
# Atom Modelleri
| Model | Katkı | Eksik |
|---|---|---|
| **Thomson** | Pozitif küre içinde gömülü elektronlar ("üzümlü kek") | Çekirdeği açıklamaz |
| **Rutherford** | Alfa saçılması → küçük, yoğun, **pozitif çekirdek** | İvmeli elektron enerji yayıp çekirdeğe düşmeliydi |
| **Bohr** | Elektronlar belirli **enerji seviyelerinde** dolanır; seviye değiştirirken foton yayar/soğurur: $E_{foton} = E_{üst} - E_{alt}$ | Yalnızca **hidrojen** benzeri atomlar için başarılı |
| **Kuantum (modern)** | Elektron bulutu, **orbitaller**, olasılık | — |

# Spektrum
- **Sürekli spektrum:** Akkor katı (tüm renkler).
- **Yayılma (emisyon) spektrumu:** Uyarılmış gazın yaydığı **kesikli parlak çizgiler**.
- **Soğurma (absorpsiyon) spektrumu:** Sürekli spektrumda **karanlık çizgiler**.
- Her elementin çizgi spektrumu **parmak izi** gibidir → yıldızların bileşimi bu yolla belirlenir.

# Temel Parçacıklar
- **Kuarklar** (proton = uud, nötron = udd) ve **leptonlar** (elektron, nötrino).
- Dört temel kuvvet: **kütle çekimi, elektromanyetik, güçlü nükleer, zayıf nükleer**.

# Çekirdek ve Nükleer Enerji
- **Radyoaktivite:** Alfa ($^4_2\text{He}$), beta (elektron/pozitron), gama (foton) ışımaları. **Yarı ömür:** Çekirdeklerin yarısının bozunma süresi.
- **Fisyon:** Ağır çekirdeğin bölünmesi (nükleer santral, uranyum-235).
- **Füzyon:** Hafif çekirdeklerin birleşmesi (Güneş'in enerjisi).
- Açığa çıkan enerji kütle kaybından gelir: $E = mc^2$.
""",
  [("Hidrojen atomunda elektron 3. seviyeden 2. seviyeye inerse ne olur?", "İki seviye arasındaki enerji farkına eşit enerjili **bir foton yayılır**: $E = E_3 - E_2$. Bu geçiş görünür bölgede **kırmızı** çizgiyi (Balmer serisi) oluşturur.")],
  ["Bohr: kesikli enerji seviyeleri, seviye geçişinde foton.", "Emisyon ve soğurma spektrumları elementin parmak izi.", r"Fisyon ve füzyon; $E=mc^2$."]),
]),
]


from _ek134 import uygula  # noqa: E402
uygula(units, "fiz11_ek134")

from _ek136 import uygula136; uygula136(units, "fiz11")

write("fiz-11.js", "11/fizik", "11. Sınıf Fizik — konu anlatım notları",
      "kullanıcının verdiği \"11. Sınıf Fizik Konu Anlatım Notları\" (5 ünite).",
      units, "Kaynakta yalnızca Kuvvet ve Hareket ünitesi ayrıntılı, diğerleri birkaç satırlık özetti; tüm üniteler ders kitabı düzeyinde formüller, tablolar ve çözümlü örneklerle genişletildi. Enerji ünitesine itme-momentum konusu eklendi.")
