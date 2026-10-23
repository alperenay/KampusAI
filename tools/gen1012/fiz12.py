# -*- coding: utf-8 -*-
"""12. Sınıf Fizik notları (genişletilmiş) → js/data/content/fiz-12.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Çembersel Hareket", "Unit 1: Circular Motion", [
O("k1", "1.1", "Düzgün çembersel hareket ve virajda emniyetli dönüş", "Uniform circular motion and safe turning", r"""
# Temel Büyüklükler
| Büyüklük | Formül |
|---|---|
| Periyot, frekans | $T$, $f = 1/T$ |
| Çizgisel hız | $v = \dfrac{2\pi r}{T} = \omega r$ |
| Açısal hız | $\omega = \dfrac{2\pi}{T} = 2\pi f$ (rad/s) |
| Merkezcil ivme | $a_m = \dfrac{v^2}{r} = \omega^2 r = \dfrac{4\pi^2 r}{T^2}$ |
| Merkezcil kuvvet | $F_m = \dfrac{mv^2}{r} = m\omega^2 r$ |

Hızın büyüklüğü sabit, **yönü sürekli değişir** → ivme **merkeze** doğrudur. Merkezcil kuvvet, cisme etki eden kuvvetlerin merkeze doğru **bileşkesidir** (gerilme, sürtünme, çekim, normal kuvvet).

# Yatay Virajda Dönüş
Merkezcil kuvveti **sürtünme** sağlar:
$$\mu mg \ge \frac{mv^2}{r} \Rightarrow v_{max} = \sqrt{\mu g r}$$
Islak ya da buzlu yolda $\mu$ küçüldüğünden güvenli hız azalır.

# Eğimli (Banketli) Virajda Dönüş
Sürtünmesiz ideal durumda normal kuvvetin yatay bileşeni merkezcil kuvveti sağlar:
$$\tan\theta = \frac{v^2}{rg}$$
Bu hızda araç sürtünmeye ihtiyaç duymadan döner.

# Düşey Düzlemde Çembersel Hareket
- İpe bağlı cisim en **tepede**: $T + mg = \dfrac{mv^2}{r}$ → ipin gergin kalması için $v_{min} = \sqrt{gr}$.
- En **altta**: $T - mg = \dfrac{mv^2}{r}$ → gerilme en büyüktür.
- Lunapark trenlerinin tepedeki en küçük hızı da $\sqrt{gr}$'dir.
""",
  [(r"Yarıçapı $80$ m olan yatay virajda sürtünme katsayısı $0{,}5$ ise araç en fazla kaç km/sa ile dönebilir?", r"$v = \sqrt{0{,}5 \cdot 10 \cdot 80} = 20$ m/s $= 72$ km/sa."),
   (r"$1$ m uzunluğundaki iple düşey düzlemde döndürülen cismin tepede ipin gevşememesi için en küçük hızı?", r"$v_{min} = \sqrt{gr} = \sqrt{10} \approx 3{,}2$ m/s.")],
  [r"$a=v^2/r=\omega^2r$; merkezcil kuvvet bileşke kuvvettir.", r"Yatay viraj $v_{max}=\sqrt{\mu gr}$; banketli $\tan\theta=v^2/rg$.", r"Düşey çember tepesi $v_{min}=\sqrt{gr}$."]),
O("k2", "1.2", "Dönerek öteleme, eylemsizlik momenti ve açısal momentum", "Rolling motion, moment of inertia and angular momentum", r"""
# Eylemsizlik Momenti
Cismin dönme hareketindeki değişime karşı gösterdiği direnç (kütlenin dönmedeki karşılığı):
$$I = \sum m_i r_i^2 \quad (\text{kg·m}^2)$$
Kütlenin dönme eksenine **ne kadar uzak** dağıldığına bağlıdır.

| Cisim (merkezden geçen eksen) | $I$ |
|---|---|
| İnce çember | $mr^2$ |
| Dolu disk / silindir | $\tfrac12 mr^2$ |
| Dolu küre | $\tfrac25 mr^2$ |
| Çubuk (orta noktadan) | $\tfrac1{12}mL^2$ |

# Dönme ve Öteleme Kinetik Enerjisi
$$E_k = \tfrac12 mv_{km}^2 + \tfrac12 I\omega^2 \qquad \text{kaymadan yuvarlanmada } v = \omega r$$
Eğik düzlemden **kaymadan** yuvarlanan cisimlerde potansiyel enerji hem ötelemeye hem dönmeye paylaşılır → $I$'si küçük olan (küre) **daha hızlı** iner: küre > disk > çember.

# Tork ve Açısal Momentum
- **Tork:** $\tau = rF\sin\theta$; dönmeyi değiştiren etki. $\tau_{net} = I\alpha$.
- **Açısal momentum:** $$L = I\omega = mvr$$
- $\tau = \dfrac{\Delta L}{\Delta t}$.
- **Korunum:** Dış tork sıfırsa $L$ sabittir: $I_1\omega_1 = I_2\omega_2$.
  - **Buz patencisi** kollarını kapatınca $I$ azalır, $\omega$ artar (daha hızlı döner).
  - Gezegenler Güneş'e yaklaşınca hızlanır.
  - **Jiroskop** ve dönen tekerlek yönünü korur (bisiklet dengesi).
""",
  [(r"Buz patencisi kollarını kapatarak eylemsizlik momentini yarıya indirirse açısal hızı nasıl değişir?", r"$L$ korunur: $I\omega = \frac{I}{2}\omega' \Rightarrow \omega' = 2\omega$ → **iki katına** çıkar.")],
  [r"$I=\sum mr^2$: kütle eksenden uzaksa büyük.", r"$E_k=\frac12mv^2+\frac12I\omega^2$.", r"Dış tork yoksa $L=I\omega$ korunur."]),
O("k3", "1.3", "Kütle çekimi ve Kepler kanunları", "Gravitation and Kepler's laws", r"""
# Newton'ın Evrensel Kütle Çekim Yasası
$$F = G\frac{m_1 m_2}{r^2} \qquad G = 6{,}67\times10^{-11}\ \text{N·m}^2/\text{kg}^2$$
- Çekim **alanı (ivmesi)**: $g = \dfrac{GM}{r^2}$. Yüzeyden yükseldikçe azalır.
- **Kütle çekim potansiyel enerjisi:** $U = -\dfrac{GMm}{r}$ (sonsuzda sıfır).
- **Kurtulma hızı:** $v_k = \sqrt{\dfrac{2GM}{R}}$ (Dünya için ≈ 11,2 km/s).

# Uydu Hareketi
Merkezcil kuvveti çekim sağlar: $\dfrac{GMm}{r^2} = \dfrac{mv^2}{r} \Rightarrow v = \sqrt{\dfrac{GM}{r}}$.
- Uydu hızı **kütlesinden bağımsızdır**; yörünge yarıçapı büyüdükçe hız azalır, periyot artar.
- **Yer eş zamanlı (geostatik)** uydu: periyodu 24 saat, ekvator üzerinde ~36 000 km yükseklikte.
- Uydudaki astronotun "ağırlıksız" hissetmesi: astronot ve uydu birlikte **serbest düşme** hâlindedir.

# Kepler Kanunları
1. **Yörüngeler yasası:** Gezegenler Güneş etrafında **elips** yörüngelerde döner; Güneş odaklardan birindedir.
2. **Alanlar yasası:** Gezegeni Güneş'e bağlayan doğru **eşit zamanlarda eşit alanlar** tarar → Güneş'e yakınken (**günberi**) **hızlı**, uzakken (günöte) **yavaş** (açısal momentumun korunumu).
3. **Periyotlar yasası:** $$\frac{T^2}{a^3} = \text{sabit}$$ ($a$: yörüngenin yarı büyük ekseni).
""",
  [(r"Bir gezegenin Güneş'e ortalama uzaklığı Dünya'nınkinin 4 katı ise periyodu kaç yıldır?", r"$\frac{T^2}{a^3}$ sabit: $T^2 = 4^3 = 64 \Rightarrow T = 8$ yıl."),
   (r"Yerden yüksekliği Dünya yarıçapına eşit bir noktada çekim ivmesi yüzeydekinin kaçta kaçıdır?", r"$r = 2R$ → $g' = \frac{GM}{4R^2} = \frac{g}{4}$.")],
  [r"$F=Gm_1m_2/r^2$; $U=-GMm/r$.", r"Uydu hızı $\sqrt{GM/r}$, kütleden bağımsız.", r"Kepler: elips, eşit alan, $T^2/a^3$ sabit."]),
]),
U("u2", "2. Ünite: Basit Harmonik Hareket", "Unit 2: Simple Harmonic Motion", [
O("k1", "2.1", "Basit harmonik hareket, yay ve basit sarkaç", "Simple harmonic motion, spring and pendulum", r"""
# Tanım
Denge konumundan uzaklıkla **orantılı** ve **denge konumuna doğru** (zıt yönlü) bir **geri çağırıcı kuvvet** etkisinde yapılan periyodik hareket:
$$F = -kx$$

# Konum, Hız, İvme
$$x(t) = A\cos(\omega t + \varphi) \qquad v(t) = -A\omega\sin(\omega t + \varphi) \qquad a(t) = -\omega^2 x$$

| Konum | Hız | İvme / kuvvet |
|---|---|---|
| **Denge** ($x = 0$) | **En büyük**: $v_{max} = A\omega$ | **Sıfır** |
| **Uç noktalar** ($x = \pm A$) | **Sıfır** | **En büyük**: $a_{max} = A\omega^2$ |

**Enerji:** $E = \tfrac12 kA^2$ sabittir; dengede tamamı kinetik, uçlarda tamamı potansiyel. Herhangi bir noktada $v = \omega\sqrt{A^2 - x^2}$.

# Yay Sarkacı
$$T = 2\pi\sqrt{\frac{m}{k}}$$
Periyot **genliğe ve yer çekimine bağlı değildir**; kütle artarsa artar, yay sertleşirse azalır.
- **Seri yaylar:** $\dfrac1{k_{eş}} = \dfrac1{k_1} + \dfrac1{k_2}$; **paralel:** $k_{eş} = k_1 + k_2$.

# Basit Sarkaç (küçük açılarda)
$$T = 2\pi\sqrt{\frac{L}{g}}$$
Periyot **kütleye ve genliğe bağlı değildir**; ip uzunluğu ve çekim ivmesine bağlıdır. Ay'da ($g$ küçük) sarkaçlı saat **geri kalır**; yukarı ivmelenen asansörde $g_{etkin} = g + a$ → periyot kısalır.

**BHH ile düzgün çembersel hareket:** Çembersel hareket yapan cismin bir çap üzerindeki izdüşümü BHH yapar.
""",
  [(r"Kütlesi $0{,}4$ kg olan cisim yay sabiti $40$ N/m olan yaya bağlı. Periyot ve genlik $0{,}1$ m ise en büyük hız?", r"$\omega = \sqrt{k/m} = \sqrt{100} = 10$ rad/s; $T = \frac{2\pi}{10} \approx 0{,}63$ s. $v_{max} = A\omega = 0{,}1 \cdot 10 = 1$ m/s."),
   (r"Bir basit sarkacın ip boyu 4 katına çıkarılırsa periyodu nasıl değişir?", r"$T \propto \sqrt{L}$ → periyot **2 katına** çıkar.")],
  [r"BHH: $F=-kx$, $a=-\omega^2x$.", "Dengede hız max ivme 0; uçlarda hız 0 ivme max.", r"Yay $T=2\pi\sqrt{m/k}$; sarkaç $T=2\pi\sqrt{L/g}$."]),
]),
U("u3", "3. Ünite: Dalga Mekaniği", "Unit 3: Wave Mechanics", [
O("k1", "3.1", "Su dalgalarında kırınım ve girişim; Young deneyi", "Diffraction and interference; Young's experiment", r"""
# Kırınım
Dalgaların bir **yarıktan** ya da **engel kenarından** geçerken bükülerek yayılması.
- Yarık genişliği ($w$) **dalga boyuna** ($\lambda$) yakın ya da küçükse kırınım **belirgindir**: $\lambda$ ↑ veya $w$ ↓ → kırınım ↑.
- **Tek yarıkta** merkezde geniş parlak saçak, yanlarda daha dar saçaklar.
- Ses dalgaları köşeden dolaşır (λ büyük); ışığın kırınımı için çok dar yarık gerekir.

# Girişim
İki **eş fazlı (uyumlu)** kaynaktan çıkan dalgaların üst üste binmesi.
- **Yapıcı girişim (dalga katarı / parlak saçak):** Yol farkı $\Delta s = n\lambda$.
- **Yıkıcı girişim (düğüm / karanlık saçak):** $\Delta s = (n - \tfrac12)\lambda$.

# Young Çift Yarık Deneyi (1801)
Işığın **dalga** doğasını kanıtladı.
$$\Delta x = \frac{\lambda L}{d}$$
($\Delta x$: ardışık iki parlak saçak arası, $L$: perde uzaklığı, $d$: yarıklar arası uzaklık)
- **Kırmızı** ışıkta saçaklar mora göre **daha geniş** (λ büyük).
- Düzenek suya daldırılırsa $\lambda$ küçülür, saçaklar **daralır**.

# İnce Zarlarda Girişim
Sabun köpüğü, yağ tabakası, kelebek kanatlarındaki renkler: zarın üst ve alt yüzeyinden yansıyan ışınların girişimi. **Yansıma önleyici kaplamalar** (gözlük camları) bu ilkeyle çalışır.
""",
  [(r"Young deneyinde $\lambda = 600$ nm, $d = 0{,}3$ mm, $L = 1{,}5$ m ise saçak aralığı nedir?", r"$\Delta x = \frac{600\times10^{-9}\cdot1{,}5}{0{,}3\times10^{-3}} = 3\times10^{-3}$ m $= 3$ mm.")],
  [r"Kırınım: $\lambda$ yarığa yakınsa belirgin.", r"Yapıcı $\Delta s=n\lambda$, yıkıcı $(n-\frac12)\lambda$.", r"Young: $\Delta x=\lambda L/d$; ışığın dalga doğası."]),
O("k2", "3.2", "Doppler olayı ve elektromanyetik dalgalar", "Doppler effect and electromagnetic waves", r"""
# Doppler Olayı
Kaynak ve gözlemci birbirine göre hareketliyken **algılanan frekansın** değişmesi.
- **Yaklaşırken:** dalga boyu kısalır, frekans **artar** (ses incelir; ışıkta **maviye kayma**).
- **Uzaklaşırken:** frekans **azalır** (ses kalınlaşır; ışıkta **kırmızıya kayma**).
$$f' = f\,\frac{v \pm v_g}{v \mp v_k}$$
(üst işaretler yaklaşma durumunda)

**Uygulamalar:** Hız radarları, **Doppler ultrasonografi** (kan akışı), meteoroloji radarları, astronomide **galaksilerin uzaklaşması** → **evrenin genişlemesi** (Hubble).

# Elektromanyetik Dalgalar
- **Değişen elektrik ve manyetik alanların** birbirine dik titreşimiyle oluşur (Maxwell); **ivmeli yüklerden** yayılır.
- **Enine** dalgadır, **boşlukta** da yayılır, hızı $c = 3\times10^8$ m/s.
- $c = \lambda f$; foton enerjisi $E = hf$.

# Elektromanyetik Spektrum (dalga boyu büyükten küçüğe → enerji küçükten büyüğe)
| Tür | Kullanım |
|---|---|
| **Radyo dalgaları** | Radyo, TV, MR |
| **Mikrodalga** | Mikrodalga fırın, radar, Wi-Fi, cep telefonu |
| **Kızılötesi (IR)** | Isı kameraları, uzaktan kumanda, gece görüşü |
| **Görünür ışık** | Görme (kırmızı → mor) |
| **Morötesi (UV)** | Sterilizasyon, D vitamini; fazlası cilt kanseri |
| **X ışınları** | Röntgen, havalimanı güvenlik |
| **Gama ışınları** | Kanser tedavisi (radyoterapi), sterilizasyon |
""",
  [("Uzak galaksilerin ışığındaki kırmızıya kayma neyi gösterir?", "Işık kaynağı gözlemciden **uzaklaşırken** dalga boyu uzar (Doppler). Galaksilerin çoğunun kırmızıya kayması, onların bizden uzaklaştığını, yani **evrenin genişlediğini** gösterir.")],
  ["Doppler: yaklaşınca frekans artar (maviye kayma).", r"EM dalgalar enine, boşlukta $c=3\times10^8$ m/s.", "Spektrum: radyo → mikrodalga → IR → görünür → UV → X → gama."]),
]),
U("u4", "4. Ünite: Atom Fiziğine Giriş ve Radyoaktivite", "Unit 4: Introduction to Atomic Physics and Radioactivity", [
O("k1", "4.1", "Atom modelleri, Büyük Patlama ve atom altı parçacıklar", "Atomic models, Big Bang and subatomic particles", r"""
# Atom Modelleri
| Model | Temel fikir | Sınırlılık |
|---|---|---|
| **Dalton** (1803) | Atom bölünemez katı küre | Elektronu açıklamaz |
| **Thomson** (1897) | Elektron keşfi; pozitif küre içinde elektronlar | Çekirdek yok |
| **Rutherford** (1911) | **Altın levha deneyi**: küçük, yoğun, pozitif **çekirdek**; atomun çoğu boşluk | İvmeli elektron ışıma yapıp çekirdeğe düşmeliydi |
| **Bohr** (1913) | Elektron belirli **kararlı yörüngelerde** ışıma yapmadan döner; açısal momentum kuantumludur; seviye değişiminde foton: $hf = E_{üst} - E_{alt}$ | Çok elektronlu atomları açıklayamaz |
| **Modern (kuantum)** | Elektronun yeri olasılıkla belirlenir (**orbital**); Schrödinger, Heisenberg | — |

**Hidrojen enerji seviyeleri:** $E_n = -\dfrac{13{,}6}{n^2}$ eV. İyonlaşma enerjisi 13,6 eV.

# Büyük Patlama (Big Bang)
Evren yaklaşık **13,8 milyar yıl** önce çok sıcak ve yoğun bir hâlden genişleyerek oluştu.
**Kanıtlar:** galaksilerin **kırmızıya kayması** (genişleme), **kozmik mikrodalga arka plan ışıması** (1965, Penzias–Wilson), evrendeki hafif element (H, He) oranları.

# Atom Altı Parçacıklar (Standart Model)
- **Kuarklar:** yukarı (u), aşağı (d)… → proton (uud), nötron (udd).
- **Leptonlar:** elektron, müon, nötrinolar.
- **Kuvvet taşıyıcılar:** foton (elektromanyetik), gluon (güçlü), W ve Z (zayıf); **Higgs bozonu** (kütle, 2012).
- Her parçacığın **karşıt parçacığı** vardır (pozitron).
""",
  [(r"Hidrojen atomunda elektron $n = 3$'ten $n = 1$'e inerse yayılan fotonun enerjisi nedir?", r"$E = -\frac{13{,}6}{9} - \left(-13{,}6\right) = 13{,}6\left(1 - \frac19\right) \approx 12{,}1$ eV.")],
  ["Rutherford: çekirdek; Bohr: kesikli enerji seviyeleri.", r"$E_n=-13{,}6/n^2$ eV.", "Big Bang kanıtları: kırmızıya kayma, kozmik arka plan ışıması."]),
O("k2", "4.2", "Radyoaktivite, fisyon, füzyon ve radyasyonun etkileri", "Radioactivity, fission, fusion and effects of radiation", r"""
# Radyoaktif Bozunma
Kararsız çekirdeklerin kendiliğinden ışıma yaparak kararlı hâle geçmesi (Becquerel 1896, Curie'ler).

| Işıma | Yapı | Çekirdekte değişim | Giricilik |
|---|---|---|---|
| **Alfa (α)** | $^4_2He$ | $A$ → 4 azalır, $Z$ → 2 azalır | En az (kâğıt durdurur) |
| **Beta eksi (β⁻)** | Elektron | Nötron → proton; $Z$ 1 artar, $A$ değişmez | Orta (alüminyum levha) |
| **Beta artı (β⁺)** | Pozitron | Proton → nötron; $Z$ 1 azalır | Orta |
| **Gama (γ)** | Yüksek enerjili foton | $A$ ve $Z$ değişmez | **En fazla** (kalın kurşun/beton) |

# Yarılanma Süresi
Radyoaktif çekirdeklerin **yarısının** bozunması için geçen süre:
$$N = N_0\left(\frac12\right)^{t/T_{1/2}}$$
**Aktivite:** Birim zamandaki bozunma sayısı (becquerel, Bq). **Karbon-14** ile yaş tayini ($T_{1/2}$ ≈ 5730 yıl).

# Fisyon ve Füzyon
| Fisyon | Füzyon |
|---|---|
| Ağır çekirdeğin (U-235) nötron çarpmasıyla **bölünmesi** | Hafif çekirdeklerin (H izotopları) **birleşmesi** |
| **Zincirleme tepkime** | Çok yüksek sıcaklık ve basınç gerekir |
| Nükleer santraller (Akkuyu), atom bombası | **Güneş ve yıldızların** enerjisi; ITER deneysel reaktörü |
| Radyoaktif atık sorunu | Daha temiz, ama kontrolü zor |

Açığa çıkan enerji **kütle kaybından** gelir: $E = \Delta m\,c^2$.

# Radyasyonun Etkileri ve Korunma
- **İyonlaştırıcı radyasyon** hücrelerde DNA hasarı, kanser, mutasyon yapabilir.
- **Doz birimi:** sievert (Sv).
- **Korunma ilkeleri:** **Süre** (kısa tut), **mesafe** (uzak dur), **zırh** (kurşun, beton).
- **Faydalı kullanımlar:** Radyoterapi, tıbbi görüntüleme (PET), gıda sterilizasyonu, yaş tayini, endüstriyel kontrol.
""",
  [(r"Yarılanma süresi 8 gün olan 160 g radyoaktif maddeden 24 gün sonra ne kadar kalır?", r"24 gün = 3 yarılanma: $160 \to 80 \to 40 \to 20$ g."),
   (r"$^{238}_{92}U$ bir alfa ışıması yapınca oluşan çekirdeğin kütle ve atom numarası nedir?", r"$A = 234$, $Z = 90$ → $^{234}_{90}Th$.")],
  ["α: A−4, Z−2; β⁻: Z+1; γ: değişim yok.", r"$N=N_0(1/2)^{t/T}$; C-14 ile yaş tayini.", "Fisyon bölünme (santral), füzyon birleşme (Güneş); süre-mesafe-zırh."]),
]),
U("u5", "5. Ünite: Modern Fizik", "Unit 5: Modern Physics", [
O("k1", "5.1", "Özel görelilik", "Special relativity", r"""
# Einstein'ın Özel Görelilik Postulatları (1905)
1. Fizik yasaları tüm **eylemsiz (sabit hızlı)** gözlemciler için **aynıdır**.
2. Işığın boşluktaki hızı ($c$) kaynağın ve gözlemcinin hareketinden **bağımsızdır**, herkes için aynıdır.

**Michelson–Morley deneyi** (1887): "Esir" bulunamadı, ışık hızının yönden bağımsız olduğu görüldü.

# Sonuçlar
$$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \ge 1$$
| Etki | Formül | Anlam |
|---|---|---|
| **Zaman genişlemesi** | $\Delta t = \gamma\,\Delta t_0$ | Hareketli saat, durgun gözlemciye göre **yavaş** işler |
| **Boy kısalması** | $L = \dfrac{L_0}{\gamma}$ | Hareket doğrultusundaki uzunluk **kısalır** |
| **Kütle–enerji eşdeğerliği** | $E = mc^2$ | Kütle bir enerji biçimidir; durgun enerji $E_0 = m_0c^2$ |

- Etkiler yalnızca **ışık hızına yakın** hızlarda belirgindir.
- **Kanıtlar:** Atmosferde oluşan **müonların** yere ulaşabilmesi, uçaklardaki atom saatleri deneyleri, **GPS** uydularında göreli düzeltmeler.
- **Eş zamanlılığın göreliliği:** Bir gözlemci için aynı anda olan iki olay, diğerine göre aynı anda olmayabilir.
""",
  [(r"$0{,}6c$ hızla giden bir uzay gemisindeki saatte geçen 8 yıl, Dünya'daki gözlemciye göre kaç yıldır?", r"$\gamma = \frac{1}{\sqrt{1-0{,}36}} = \frac{1}{0{,}8} = 1{,}25$. $\Delta t = 1{,}25 \cdot 8 = 10$ yıl.")],
  ["Postulatlar: yasalar aynı; ışık hızı herkes için aynı.", r"Zaman genişler $\gamma\Delta t_0$, boy kısalır $L_0/\gamma$.", r"$E=mc^2$; GPS ve müonlar kanıt."]),
O("k2", "5.2", "Kuantum fiziğine giriş: siyah cisim, fotoelektrik, Compton, de Broglie", "Introduction to quantum physics", r"""
# Siyah Cisim Işıması ve Planck
Sıcak cisimlerin ışıması klasik fizikle açıklanamadı. **Planck (1900):** Enerji **kesikli paketler (kuantum)** hâlinde yayılır: $E = nhf$. **Wien:** Sıcaklık arttıkça ışımanın en şiddetli olduğu dalga boyu kısalır (kızgın demir kırmızıdan beyaza).

# Fotoelektrik Olay
$$hf = W_0 + E_{k,max} \qquad E_{k,max} = eV_k$$
- $f < f_0$ (eşik frekansı) ise **şiddet ne olursa olsun** elektron sökülmez.
- Işık **şiddeti** → sökülen elektron **sayısı** (akım); **frekans** → elektronların **maksimum kinetik enerjisi**.
- $E_{k,max}$–$f$ grafiği eğimi **Planck sabitini** ($h$) verir.
→ Işığın **tanecik (foton)** doğası (Einstein, 1905).

# Compton Saçılması (1923)
X ışını fotonları elektronlarla çarpışınca foton enerji ve momentum kaybeder → saçılan fotonun **dalga boyu artar**. Fotonun **momentumu** vardır: $p = \dfrac{h}{\lambda}$. Esnek çarpışma gibi enerji ve momentum korunur.

# De Broglie Hipotezi (1924)
Maddenin de **dalga** özelliği vardır:
$$\lambda = \frac{h}{p} = \frac{h}{mv}$$
**Davisson–Germer deneyi** elektronların kırınım yaptığını gösterdi → **elektron mikroskobu**.

# Dalga–Parçacık İkiliği
Işık ve madde koşullara göre dalga ya da parçacık gibi davranır. **Heisenberg belirsizlik ilkesi:** Bir parçacığın konumu ve momentumu aynı anda kesin olarak bilinemez.
""",
  [(r"Kütlesi $9{,}1\times10^{-31}$ kg olan elektron $10^6$ m/s hızla hareket ediyor. De Broglie dalga boyu nedir? ($h = 6{,}6\times10^{-34}$)", r"$\lambda = \frac{6{,}6\times10^{-34}}{9{,}1\times10^{-31}\cdot10^6} \approx 7{,}3\times10^{-10}$ m (atom boyutu mertebesinde).")],
  [r"Planck: enerji kuantumlu $E=hf$.", r"Fotoelektrik: $hf=W_0+E_k$; Compton: foton momentumu.", r"De Broglie $\lambda=h/mv$; dalga–parçacık ikiliği."]),
]),
U("u6", "6. Ünite: Modern Fiziğin Teknolojideki Uygulamaları", "Unit 6: Applications of Modern Physics in Technology", [
O("k1", "6.1", "Görüntüleme, yarı iletken, süper iletken, nanoteknoloji ve lazer", "Imaging, semiconductors, superconductors, nanotechnology and lasers", r"""
# Görüntüleme Teknolojileri
| Teknoloji | İlke |
|---|---|
| **Röntgen (X ışını)** | Dokuların X ışınını farklı soğurması |
| **BT (tomografi)** | Farklı açılardan X ışını görüntüleri → kesit |
| **MR** | Güçlü manyetik alan + radyo dalgaları; hidrojen çekirdeklerinin rezonansı (iyonlaştırıcı radyasyon yok) |
| **Ultrason** | Yüksek frekanslı ses dalgalarının yansıması |
| **PET** | Pozitron yayan izleyici + yok olma (anihilasyon) gama ışınları |
| **LCD** | Sıvı kristallerin elektrik alanla ışığı geçirip geçirmemesi |
| **LED / OLED** | Yarı iletkende elektron–boşluk birleşmesiyle ışık yayılması |
| **Plazma ekran** | İyonlaşmış gazın UV ışıması ve fosfor |
| **Dijital kamera (CCD/CMOS)** | Fotoelektrik olay |

# Yarı İletkenler
İletkenlikleri iletken ile yalıtkan arasındadır (silisyum, germanyum); **katkılama** ile ayarlanır.
- **n-tipi:** Elektron fazlası (fosfor katkısı). **p-tipi:** Boşluk fazlası (bor katkısı).
- **Diyot (p–n eklemi):** Akımı **tek yönde** geçirir → doğrultma.
- **Transistör:** Akımı yükseltir ve anahtarlar → **bilgisayar işlemcileri**, entegre devreler.
- **Güneş pili:** Işıkla p–n ekleminde elektrik üretimi.

# Süper İletkenler
Belirli **kritik sıcaklığın** altında **direnci sıfır** olan maddeler; manyetik alanı dışlar (**Meissner etkisi** → manyetik kaldırma).
**Uygulamalar:** MR mıknatısları, **maglev** trenler, parçacık hızlandırıcılar (CERN), kayıpsız enerji iletimi.

# Nanoteknoloji
1–100 nm ölçeğinde malzeme tasarımı: **grafen**, karbon nanotüpler, nano ilaç taşıyıcıları, kendini temizleyen yüzeyler, daha verimli bataryalar.

# Lazer
**LASER:** *Light Amplification by Stimulated Emission of Radiation* — uyarılmış ışıma ile ışığın güçlendirilmesi.
- **Tek renkli** (monokromatik), **eş fazlı** (koherent), **paralel** ve **yoğun** ışık.
- **Uygulamalar:** Göz ameliyatları, cerrahi, **fiber optik iletişim**, barkod okuyucu, metal kesme, ölçüm (LIDAR), CD/DVD.
""",
  [("Diyodun bir elektrik devresindeki işlevi nedir? Hangi yapıdan oluşur?", "Diyot **p-tipi ve n-tipi** yarı iletkenlerin birleşmesiyle oluşan **p–n eklemidir**; akımı yalnızca **tek yönde** geçirir. Alternatif akımı doğru akıma çevirmede (**doğrultma**) kullanılır.")],
  ["MR manyetik rezonans; BT ve röntgen X ışını; ultrason ses.", "Yarı iletken: n ve p tipi; diyot tek yön, transistör anahtar.", "Süper iletken direnç sıfır; lazer tek renkli ve eş fazlı."]),
]),
]


from _ek134 import uygula  # noqa: E402
uygula(units, "fiz12_ek134")

from _ek136 import uygula136; uygula136(units, "fiz12")

write("fiz-12.js", "12/fizik", "12. Sınıf Fizik — detaylı konu anlatım notları",
      "kullanıcının verdiği \"Fizik 12 Detaylı Konu Anlatım Notları\" (6 ünite).",
      units, "Kaynak notlar formül listesi düzeyinde olduğu için her ünite ders kitabı düzeyinde genişletildi (eylemsizlik momenti tablosu, uydu hareketi, BHH enerji ve konum tablosu, Young deneyi, radyoaktivite ve görelilik formülleri, çözümlü örnekler).")
