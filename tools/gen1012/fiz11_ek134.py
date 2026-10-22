# -*- coding: utf-8 -*-
r"""11. Sınıf Fizik — 1.34.0 ek kazanımları."""
from _c import O

EK = {
"u1": [
O("k7", "1.7", "Tork, denge ve kütle merkezi", "Torque, equilibrium and centre of mass", r"""
# Tork (Kuvvet Momenti)
Kuvvetin bir cismi **döndürme etkisidir**:
$$\tau = F \cdot d \cdot \sin\theta \quad (\text{N·m})$$
$d$: dönme noktasına uzaklık (**kuvvet kolu**), $\theta$: kuvvet ile kol arasındaki açı.
- Kuvvetin doğrultusu dönme noktasından geçerse tork **sıfırdır**.
- Saat yönünün tersi genelde **pozitif** alınır.

# Denge Şartları
Bir cismin **tam dengede** (ötelenmiyor ve dönmüyor) olması için:
1. $\sum \vec F = 0$ (öteleme dengesi)
2. $\sum \tau = 0$ (dönme dengesi) — **herhangi bir noktaya** göre.

**Kaldıraç prensibi:** $F_1 \cdot d_1 = F_2 \cdot d_2$ (tahterevalli, makas, el arabası, cımbız).

# Kütle Merkezi ve Ağırlık Merkezi
- Düzgün ve türdeş cisimlerde **geometrik merkezdedir**.
- Noktasal kütleler için:
$$x_{km} = \frac{m_1x_1 + m_2x_2 + \dots}{m_1 + m_2 + \dots}$$
- Ağırlık merkezi **destek alanının dışına** çıkarsa cisim devrilir.

# Denge Türleri
| Tür | Davranış | Örnek |
|---|---|---|
| **Kararlı** | Bırakınca eski konumuna döner | Kâse dibindeki bilye |
| **Kararsız** | Uzaklaşır | Tepe üstündeki bilye |
| **Nötr** | Yeni konumda kalır | Düz zemindeki bilye |
""",
  [(r"$4$ m uzunluğundaki türdeş tahterevallinin ortasından desteklendiği düşünülürse, $30$ kg'lık çocuk destekten $1{,}2$ m uzakta oturuyor. $40$ kg'lık çocuk dengede kalmak için destekten kaç m uzağa oturmalıdır?", r"$30\cdot1{,}2 = 40\cdot d \Rightarrow d = 0{,}9$ m (karşı tarafta)."),
   (r"$x = 0$'da $2$ kg, $x = 6$ m'de $4$ kg noktasal kütleler var. Kütle merkezinin konumu nedir?", r"$x_{km} = \frac{2\cdot0 + 4\cdot6}{6} = 4$ m.")],
  [r"$\tau = F\cdot d\cdot\sin\theta$.", r"Denge: $\sum F = 0$ ve $\sum\tau = 0$.", "Ağırlık merkezi destek alanı dışına çıkarsa devrilme."]),
],
"u2": [
O("k3", "2.3", "Çarpışmalar ve patlamalar", "Collisions and explosions", r"""
# Momentumun Korunumu
Dış kuvvet yoksa sistemin toplam momentumu korunur:
$$m_1\vec v_1 + m_2\vec v_2 = m_1\vec v_1\,' + m_2\vec v_2\,'$$

# Çarpışma Türleri
| Tür | Momentum | Kinetik enerji | Örnek |
|---|---|---|---|
| **Esnek** | Korunur | **Korunur** | Bilardo topları, gaz molekülleri |
| **Esnek olmayan** | Korunur | Kısmen ısı/ses/şekil değiştirmeye dönüşür | Araba kazaları |
| **Tamamen esnek olmayan** | Korunur | En çok kayıp; cisimler **yapışıp birlikte** hareket eder | Kurşunun bloğa saplanması |

**Yapışık çarpışma:** $m_1v_1 + m_2v_2 = (m_1 + m_2)v_{ortak}$

**Özel durum:** Eşit kütleli iki cisim **merkezî esnek** çarpışırsa **hızlarını değiş tokuş eder**.

# Patlamalar
Başlangıçta duran sistem: $0 = m_1v_1 + m_2v_2$ → parçalar **zıt yönlerde**, kütleleriyle **ters orantılı** hızlarla hareket eder.
- Tüfeğin **geri tepmesi**, roket itmesi, buz pateninde itişen iki kişi.

# İki Boyutta Çarpışma
Momentum $x$ ve $y$ bileşenlerinde **ayrı ayrı** korunur (vektörel toplama).
""",
  [(r"$2$ kg'lık ve $6$ m/s hızla giden araba, duran $4$ kg'lık arabaya çarpıp yapışıyor. Ortak hız ve kinetik enerji kaybı nedir?", r"$2\cdot6 = 6\cdot v \Rightarrow v = 2$ m/s. $E_{ilk} = \frac12\cdot2\cdot36 = 36$ J, $E_{son} = \frac12\cdot6\cdot4 = 12$ J → kayıp **24 J**."),
   (r"Duran $4$ kg'lık tüfekten $0{,}02$ kg'lık mermi $400$ m/s ile çıkıyor. Tüfeğin geri tepme hızı nedir?", r"$0 = 0{,}02\cdot400 + 4\cdot v \Rightarrow v = -2$ m/s (merminin tersi yönde 2 m/s).")],
  ["Tüm çarpışmalarda momentum korunur; kinetik enerji yalnızca esneklerde.", "Yapışık çarpışmada en büyük enerji kaybı.", "Patlamada parçaların momentumları eşit büyüklükte, zıt yönde."]),
],
"u3": [
O("k4", "3.4", "Alternatif akım, transformatörler ve elektrik enerjisinin iletimi", "Alternating current, transformers and power transmission", r"""
# Alternatif Akım (AC)
Yönü ve büyüklüğü **periyodik** değişen akım; jeneratörde manyetik alanda dönen bobinde **indüksiyonla** üretilir.
$$\varepsilon = \varepsilon_{maks}\sin(\omega t), \qquad \omega = 2\pi f$$
- Türkiye şebekesi: **220–230 V**, **50 Hz**.
- **Etkin (efektif) değer:** $V_{etkin} = \dfrac{V_{maks}}{\sqrt2}$, $I_{etkin} = \dfrac{I_{maks}}{\sqrt2}$ (prizdeki 220 V etkin değerdir; tepe değer ≈ 311 V).

# Transformatör
Ortak demir çekirdeğe sarılı iki bobin; **yalnızca AC ile çalışır** (değişen manyetik akı gerekir).
$$\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$$
- $N_s > N_p$: **yükseltici**, $N_s < N_p$: **alçaltıcı**.
- İdeal transformatörde güç korunur: $V_pI_p = V_sI_s$.
- Verim: $\eta = \dfrac{P_{çıkış}}{P_{giriş}}\times100$; kayıplar **ısı (Joule)**, **girdap (Foucault) akımları** (çekirdek ince levhalardan yapılarak azaltılır).

# Uzak Mesafeye İletim
Hattaki ısı kaybı $P_{kayıp} = I^2R$. Aynı gücü taşırken **gerilim yükseltilip akım düşürülür** → kayıp azalır. Santralden çıkışta yükseltici (154–380 kV), şehre girişte alçaltıcı trafolar kullanılır.
""",
  [(r"Primer sarımı $400$, sekonder sarımı $20$ olan ideal transformatörün primerine $220$ V uygulanıyor. Sekonder gerilim ve primer akımı $0{,}5$ A ise sekonder akımı nedir?", r"$V_s = 220\cdot\frac{20}{400} = 11$ V (alçaltıcı). $I_s = I_p\cdot\frac{N_p}{N_s} = 0{,}5\cdot20 = 10$ A."),
   (r"Elektrik iletim hatlarında neden çok yüksek gerilim kullanılır?", r"Aynı güç $P = VI$ için gerilim artınca **akım azalır**; hattaki ısı kaybı $I^2R$ akımın karesiyle orantılı olduğundan kayıp büyük ölçüde düşer.")],
  [r"$V_{etkin} = V_{maks}/\sqrt2$; şebeke 50 Hz.", r"$V_s/V_p = N_s/N_p = I_p/I_s$.", "Transformatör yalnızca AC ile çalışır; iletimde yüksek gerilim kaybı azaltır."]),
],
}
