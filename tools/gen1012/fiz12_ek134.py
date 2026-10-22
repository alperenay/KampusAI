# -*- coding: utf-8 -*-
r"""12. Sınıf Fizik — 1.34.0 ek kazanımları (AYT)."""
from _c import O

EK = {
"u1": [
O("k4", "1.4", "Kütle çekim potansiyel enerjisi, kaçış hızı ve uydular", "Gravitational potential energy, escape velocity and satellites", r"""
# Kütle Çekim Kuvveti ve Alanı
$$F = G\frac{m_1m_2}{r^2}, \qquad g = G\frac{M}{r^2}, \qquad G = 6{,}67\times10^{-11}\ \text{N·m}^2/\text{kg}^2$$
Yerden yükseldikçe ($r = R + h$) çekim ivmesi azalır.

# Kütle Çekim Potansiyel Enerjisi
Sonsuzdaki potansiyel enerji **sıfır** kabul edilir:
$$E_p = -G\frac{Mm}{r}$$
- Negatif işaret, cismin **bağlı** olduğunu gösterir. $mgh$ ifadesi yalnızca yeryüzüne yakın yüksekliklerde geçerlidir.

# Uydu Hareketi
Çekim kuvveti merkezcil kuvveti sağlar:
$$\frac{GMm}{r^2} = \frac{mv^2}{r} \Rightarrow v_{yörünge} = \sqrt{\frac{GM}{r}}$$
- Periyot: $T = 2\pi\sqrt{\dfrac{r^3}{GM}}$ (Kepler'in 3. yasası: $T^2 \propto r^3$)
- Yörünge **büyüdükçe** hız **azalır**, periyot **artar**; uydunun kütlesinden **bağımsızdır**.
- Toplam enerji: $E = -\dfrac{GMm}{2r}$
- **Yer eşzamanlı (geostatik) uydu:** $T = 24$ saat, ekvator düzleminde ~$36\,000$ km yükseklik (Türksat).

# Kaçış Hızı
Cismin gezegenin çekiminden kurtulması için gereken en küçük hız:
$$v_{kaçış} = \sqrt{\frac{2GM}{R}} = \sqrt2\,v_{yörünge(yüzey)}$$
Dünya için ≈ **11,2 km/s**.
""",
  [(r"Bir uydunun yörünge yarıçapı 4 katına çıkarılırsa hızı ve periyodu nasıl değişir?", r"$v \propto \frac{1}{\sqrt r}$ → hız **yarıya** iner. $T \propto r^{3/2}$ → periyot $4^{3/2} = 8$ **katına** çıkar."),
   (r"Kütlesi Dünya'nın 2 katı, yarıçapı Dünya'nınkiyle aynı olan gezegende kaçış hızı Dünya'nın kaç katıdır?", r"$v \propto \sqrt{M/R}$ → $\sqrt2$ katı (≈ 15,8 km/s).")],
  [r"$E_p = -GMm/r$ (sonsuzda sıfır).", r"$v_{yörünge} = \sqrt{GM/r}$; $T^2 \propto r^3$.", r"$v_{kaçış} = \sqrt{2GM/R}$ ≈ 11,2 km/s (Dünya)."]),
],
"u2": [
O("k2", "2.2", "Basit harmonik harekette enerji ve grafikler", "Energy and graphs in simple harmonic motion", r"""
# Konum, Hız ve İvme
Genlik $A$, açısal frekans $\omega = \dfrac{2\pi}{T}$:
$$x = A\cos(\omega t), \quad v = -A\omega\sin(\omega t), \quad a = -\omega^2 x$$
| Konum | Hız | İvme / geri çağırıcı kuvvet |
|---|---|---|
| **Denge noktası** ($x = 0$) | **En büyük**: $v_{maks} = A\omega$ | **Sıfır** |
| **Uç noktalar** ($x = \pm A$) | **Sıfır** | **En büyük**: $a_{maks} = A\omega^2$ |

- İvme her zaman **denge noktasına** yöneliktir ve **uzanımla orantılıdır**.

# Enerji
Sürtünmesiz ortamda toplam mekanik enerji **sabittir**:
$$E = \frac12 kA^2 = \frac12 kx^2 + \frac12 mv^2$$
- Denge noktasında enerjinin tamamı **kinetik**, uçlarda tamamı **potansiyeldir**.
- $x = \dfrac{A}{\sqrt2}$ konumunda kinetik ve potansiyel enerji **eşittir**.

# Periyotlar (hatırlatma)
- Yay–kütle: $T = 2\pi\sqrt{\dfrac mk}$ (genlikten ve $g$'den bağımsız)
- Basit sarkaç: $T = 2\pi\sqrt{\dfrac Lg}$ (kütleden ve küçük genlikte genlikten bağımsız)

# Sönümlü Hareket ve Rezonans
Sürtünmeyle genlik azalır (**sönüm**). Dış kuvvetin frekansı sistemin **doğal frekansına** eşit olunca genlik büyür → **rezonans** (salıncak itme, köprü titreşimleri, mikrodalga fırın).
""",
  [(r"Yay sabiti $200$ N/m olan yaya bağlı cisim $0{,}1$ m genlikle titreşiyor. Toplam enerji ve $x = 0{,}05$ m'deki kinetik enerji nedir?", r"$E = \frac12\cdot200\cdot0{,}01 = 1$ J. $E_p = \frac12\cdot200\cdot0{,}0025 = 0{,}25$ J → $E_k = 0{,}75$ J."),
   (r"Bir basit sarkacın boyu 4 katına çıkarılırsa periyodu nasıl değişir?", r"$T \propto \sqrt L$ → periyot **2 katına** çıkar.")],
  [r"Dengede hız maksimum, ivme sıfır; uçlarda tersi.", r"$E = \frac12 kA^2$ sabit.", "Dış frekans = doğal frekans → rezonans."]),
],
"u3": [
O("k3", "3.3", "Tek yarıkta kırınım, ince zarlarda girişim ve polarizasyon", "Single-slit diffraction, thin-film interference and polarisation", r"""
# Tek Yarıkta Kırınım
Genişliği $a$ olan yarıktan geçen ışık perdede **geniş merkezî aydınlık saçak** ve iki yanında daha dar saçaklar oluşturur.
- **Karanlık saçaklar:** $a\sin\theta = n\lambda$ ($n = 1, 2, \dots$)
- Merkezî aydınlığın genişliği, yan saçakların **2 katıdır**.
- Yarık **daraldıkça** ya da dalga boyu **büyüdükçe** kırınım **artar** (saçaklar genişler).
- Young deneyinden farkı: Young'da tüm aydınlık saçaklar **eşit genişlikte**, tek yarıkta merkez **geniştir**.

# İnce Zarlarda Girişim
Sabun köpüğü, su üstündeki yağ tabakası, gözlük camlarındaki yansıtmasız kaplama: Zarın **üst ve alt yüzeylerinden** yansıyan ışınlar girişim yapar.
- Zar kalınlığı değiştikçe farklı dalga boylarında güçlendirme olur → **renkli şeritler**.
- **Yansıtmasız kaplama:** kalınlık $\dfrac{\lambda}{4n}$ seçilerek yansıyan ışınlar birbirini söndürür.

# Polarizasyon
Elektromanyetik dalgalar **enine** olduğu için polarize edilebilir (ses dalgaları boyuna olduğundan **polarize edilemez**).
- Polarizör, ışığın titreşimlerini **tek düzleme** indirger.
- **Malus yasası:** $I = I_0\cos^2\theta$
- Uygulamalar: polarize güneş gözlükleri (yansıma parlamasını keser), LCD ekranlar, 3B sinema gözlükleri.
""",
  [(r"Tek yarıkta kırınım deneyinde yarık genişliği yarıya indirilirse merkezî aydınlık saçağın genişliği nasıl değişir?", r"$\sin\theta \approx \frac{\lambda}{a}$; $a$ yarıya inince açı ve dolayısıyla merkezî saçak genişliği **2 katına** çıkar."),
   (r"Polarize ışık, polarizasyon düzlemiyle $60^\circ$ açı yapan polarizörden geçiyor. Geçen ışık şiddeti başlangıcın kaçta kaçıdır?", r"$I = I_0\cos^2 60^\circ = I_0\cdot\frac14$ → **1/4**.")],
  [r"Tek yarık karanlık saçak: $a\sin\theta = n\lambda$; merkez saçak 2 kat geniş.", "İnce zar girişimi sabun köpüğündeki renkleri açıklar.", r"Yalnızca enine dalgalar polarize olur; $I = I_0\cos^2\theta$."]),
],
"u4": [
O("k3", "4.3", "Kütle–enerji eşdeğerliği ve çekirdek bağlanma enerjisi", "Mass–energy equivalence and nuclear binding energy", r"""
# Kütle–Enerji Eşdeğerliği
Einstein: kütle ve enerji birbirine dönüşebilir:
$$E = mc^2, \qquad c = 3\times10^8 \text{ m/s}$$
- $1$ u (atomik kütle birimi) $\approx 931{,}5$ MeV enerjiye karşılık gelir.

# Kütle Eksikliği ve Bağlanma Enerjisi
Çekirdeğin kütlesi, onu oluşturan **serbest proton ve nötronların** kütleleri toplamından **küçüktür**:
$$\Delta m = [Z\,m_p + (A - Z)\,m_n] - m_{çekirdek}$$
$$E_{bağlanma} = \Delta m\cdot c^2$$
- Bu enerji, çekirdeği **parçalamak için verilmesi gereken** enerjidir.
- **Nükleon başına bağlanma enerjisi** $\dfrac{E_b}{A}$ ne kadar büyükse çekirdek o kadar **kararlıdır**.

# Bağlanma Enerjisi Eğrisi
- En kararlı çekirdek **demir-56** civarı (~8,8 MeV/nükleon).
- **Ağır çekirdekler** (uranyum) bölündüğünde (**fisyon**) ve **hafif çekirdekler** (hidrojen izotopları) birleştiğinde (**füzyon**) ürünlerin nükleon başına bağlanma enerjisi **artar** → aradaki fark **enerji** olarak açığa çıkar.
- Güneş füzyonla, nükleer santraller fisyonla enerji üretir.

# Nükleer Kuvvet
Protonların elektriksel itmesini yenen **güçlü çekirdek kuvveti**; çok kısa menzilli (~$10^{-15}$ m), yükten bağımsızdır.
""",
  [(r"Bir tepkimede $0{,}002$ u kütle enerjiye dönüşüyor. Açığa çıkan enerji kaç MeV'dir?", r"$E = 0{,}002\cdot931{,}5 \approx 1{,}86$ MeV."),
   (r"Neden hem çok ağır çekirdeklerin bölünmesi hem de hafif çekirdeklerin birleşmesi enerji açığa çıkarır?", r"Her iki süreçte de ürün çekirdekler, eğrinin tepesine (demir civarı) **daha yakındır**; nükleon başına bağlanma enerjisi artar, kütle eksikliği farkı enerji olarak salınır.")],
  [r"$E = mc^2$; 1 u ≈ 931,5 MeV.", "Bağlanma enerjisi = kütle eksikliği × c².", "Fe-56 en kararlı; fisyon ve füzyon enerjiyi bu eğriden alır."]),
],
}
