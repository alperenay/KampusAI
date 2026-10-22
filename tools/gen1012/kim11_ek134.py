# -*- coding: utf-8 -*-
r"""11. Sınıf Kimya — 1.34.0 ek kazanımları: kalorimetre ve AYT'de 11. sınıf kapsamında sorulan
Gazlar ile Sıvı Çözeltiler konuları (yeni ünite)."""
from _c import O, U

EK = {
"u1": [
O("k5", "1.1.5", "Kalorimetre ve tepkime ısısının ölçülmesi", "Calorimetry and measuring heat of reaction", r"""
# Isı ve Sıcaklık
- **Isı (q):** Sıcaklık farkından dolayı aktarılan enerji (J, kJ, cal). **Sıcaklık:** taneciklerin ortalama kinetik enerjisinin ölçüsü.
$$q = m \cdot c \cdot \Delta T$$
$m$: kütle (g), $c$: öz ısı (J/g·°C), $\Delta T$: sıcaklık değişimi. Suyun öz ısısı $c = 4{,}18$ J/g·°C ($\approx 1$ cal/g·°C).
- **Isı sığası:** $C = m\cdot c$ (maddenin sıcaklığını 1 °C artırmak için gereken ısı).

# Kalorimetre
| Tür | Özellik | Ölçülen |
|---|---|---|
| **Kahve fincanı (sabit basınç)** | Basit, yalıtımlı kap | Çözünme, nötrleşme ısısı → $\Delta H$ |
| **Bomba kalorimetresi (sabit hacim)** | Çelik kap, oksijenli ortamda yakma | Yanma ısısı, besinlerin enerji değeri |

**İlke:** Tepkimede açığa çıkan ısı = suyun (ve kalorimetrenin) aldığı ısı:
$$q_{tepkime} = -(q_{su} + q_{kalorimetre})$$
- Su ısınıyorsa tepkime **ekzotermiktir** ($\Delta H < 0$); soğuyorsa **endotermiktir**.
- Molar entalpi: $\Delta H = \dfrac{q_{tepkime}}{n}$ (kJ/mol)

# Günlük Hayattan
Besin etiketlerindeki **kcal** değerleri bomba kalorimetresiyle ölçülür. Kendiliğinden ısınan çorba kutuları ve buz torbaları çözünme ısısına dayanır.
""",
  [(r"Kahve fincanı kalorimetresinde $0{,}05$ mol NaOH çözündüğünde $100$ g suyun sıcaklığı $5$ °C artıyor. Molar çözünme entalpisi kaç kJ/mol'dür? ($c = 4{,}2$ J/g·°C)", r"$q_{su} = 100\cdot4{,}2\cdot5 = 2100$ J $= 2{,}1$ kJ. Tepkime ısı verdi: $\Delta H = -\frac{2{,}1}{0{,}05} = -42$ kJ/mol (ekzotermik)."),
   (r"Bir maddenin çözünmesi sırasında suyun sıcaklığı düşüyorsa olay nasıl sınıflandırılır?", r"Su ısı **kaybetmiş**, çözünme olayı ısıyı **almıştır** → **endotermik** ($\Delta H > 0$); örneğin $NH_4NO_3$ ile yapılan soğuk kompresler.")],
  [r"$q = mc\Delta T$.", "Kahve fincanı: sabit basınç (ΔH); bomba: sabit hacim (yanma ısısı).", "Su ısınıyorsa tepkime ekzotermik."]),
],
}

YENI = [
U("u4", "4. Ünite: Gazlar ve Sıvı Çözeltiler (AYT)", "Unit 4: Gases and Liquid Solutions", [
O("k1", "4.1", "Gaz yasaları ve ideal gaz denklemi", "Gas laws and the ideal gas equation", r"""
# Gazları Tanımlayan Değişkenler
Basınç $P$ (atm, mmHg; $1$ atm $= 760$ mmHg), hacim $V$ (L), sıcaklık $T$ (**Kelvin**: $T = t + 273$), mol sayısı $n$.

# Gaz Yasaları
| Yasa | Sabit | İlişki | Grafik |
|---|---|---|---|
| **Boyle** | $n, T$ | $P_1V_1 = P_2V_2$ (ters orantı) | $P$–$V$ hiperbol |
| **Charles** | $n, P$ | $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$ | $V$–$T$ doğru |
| **Gay-Lussac** | $n, V$ | $\dfrac{P_1}{T_1} = \dfrac{P_2}{T_2}$ | $P$–$T$ doğru |
| **Avogadro** | $P, T$ | $\dfrac{V_1}{n_1} = \dfrac{V_2}{n_2}$ | — |

**Birleşik gaz yasası:** $\dfrac{P_1V_1}{n_1T_1} = \dfrac{P_2V_2}{n_2T_2}$

# İdeal Gaz Denklemi
$$PV = nRT, \qquad R = 0{,}082\ \frac{\text{L·atm}}{\text{mol·K}} = \frac{22{,}4}{273}$$
- **Normal koşullar (NK):** $0$ °C, $1$ atm → 1 mol gaz **22,4 L**.
- **Oda koşulları:** $25$ °C, $1$ atm → 1 mol gaz $\approx$ **24,5 L**.
- **Yoğunluk:** $d = \dfrac{P\cdot M_A}{R\cdot T}$ ($M_A$: mol kütlesi)
""",
  [(r"$27$ °C'de $4$ L hacim kaplayan gaz, sabit basınçta $127$ °C'ye ısıtılıyor. Yeni hacmi kaç L olur?", r"Kelvine çevir: $300$ K → $400$ K. $\frac{4}{300} = \frac{V_2}{400} \Rightarrow V_2 = \frac{16}{3} \approx 5{,}33$ L."),
   (r"NK'da $11{,}2$ L hacim kaplayan $CH_4$ gazı kaç gramdır? ($CH_4 = 16$ g/mol)", r"$n = \frac{11{,}2}{22{,}4} = 0{,}5$ mol; kütle $= 0{,}5\cdot16 = 8$ g.")],
  ["Gaz problemlerinde sıcaklık daima Kelvin.", r"$PV = nRT$; $R = 0{,}082$ L·atm/mol·K.", "NK'da 1 mol gaz 22,4 L."]),
O("k2", "4.2", "Kinetik teori, gaz karışımları ve gerçek gazlar", "Kinetic theory, gas mixtures and real gases", r"""
# Kinetik Molekül Teorisi (ideal gaz varsayımları)
1. Gaz tanecikleri sürekli, gelişigüzel ve doğrusal hareket eder.
2. Taneciklerin **öz hacmi** kabın hacmine göre ihmal edilir.
3. Tanecikler arasında **çekim–itme yoktur**.
4. Çarpışmalar **esnektir**.
5. Ortalama kinetik enerji **yalnızca mutlak sıcaklığa** bağlıdır: $E_k \propto T$

# Difüzyon ve Graham Yasası
Aynı sıcaklıkta hafif gazlar daha hızlıdır:
$$\frac{v_1}{v_2} = \sqrt{\frac{M_2}{M_1}}$$
Örnek: $H_2$ ($M = 2$), $O_2$'den ($M = 32$) $\sqrt{16} = 4$ kat hızlı yayılır.

# Gaz Karışımları — Dalton Kısmi Basınçlar Yasası
$$P_{toplam} = P_A + P_B + \dots, \qquad P_A = X_A \cdot P_{toplam}, \quad X_A = \frac{n_A}{n_{toplam}}$$
- **Su üstünde toplanan gaz:** $P_{gaz} = P_{atm} - P_{su\ buharı}$

# Gerçek Gazlar
Gazlar **yüksek basınç** ve **düşük sıcaklıkta** idealden sapar (tanecik hacmi ve çekim kuvvetleri önem kazanır).
- İdeale en yakın: **düşük basınç, yüksek sıcaklık**, küçük ve apolar tanecikler (He, $H_2$).
- **Kritik sıcaklık:** Bu sıcaklığın üstünde gaz, basınç ne olursa olsun sıvılaştırılamaz. Kritik sıcaklığın altındaki gaza **buhar** denir.
- **Joule–Thomson olayı:** Sıkıştırılmış gaz genleşirken soğur (buzdolabı, klima).
""",
  [(r"Bir kapta $0{,}2$ mol $N_2$ ve $0{,}3$ mol $O_2$ var; toplam basınç $2$ atm. $O_2$'nin kısmi basıncı kaçtır?", r"$X_{O_2} = \frac{0{,}3}{0{,}5} = 0{,}6$; $P_{O_2} = 0{,}6\cdot2 = 1{,}2$ atm."),
   (r"Aynı koşullarda $He$ (4 g/mol) ve $CH_4$ (16 g/mol) gazlarının yayılma hızları oranı $v_{He}/v_{CH_4}$ nedir?", r"$\sqrt{16/4} = 2$ → helyum 2 kat hızlıdır.")],
  [r"Ortalama kinetik enerji yalnızca T'ye bağlı.", r"Graham: $v_1/v_2 = \sqrt{M_2/M_1}$.", "Gerçek gaz yüksek basınç–düşük sıcaklıkta idealden sapar."]),
O("k3", "4.3", "Çözelti derişimleri ve koligatif özellikler", "Solution concentrations and colligative properties", r"""
# Derişim Birimleri
| Birim | Formül |
|---|---|
| **Kütlece yüzde** | $\dfrac{m_{çözünen}}{m_{çözelti}}\times100$ |
| **Molarite (M)** | $\dfrac{n_{çözünen}}{V_{çözelti}\,(\text{L})}$ |
| **Molalite (m)** | $\dfrac{n_{çözünen}}{m_{çözücü}\,(\text{kg})}$ |
| **Mol kesri** | $X_A = \dfrac{n_A}{n_{toplam}}$ |
| **ppm** | $\dfrac{m_{çözünen}}{m_{çözelti}}\times10^6$ (çok seyreltik çözeltiler) |

**Seyreltme/karıştırma:** $M_1V_1 = M_2V_2$ · $M_{son} = \dfrac{M_1V_1 + M_2V_2}{V_1 + V_2}$

# Koligatif Özellikler
Çözünen **taneciklerin türüne değil sayısına** bağlı özellikler:
- **Buhar basıncı düşmesi** (Raoult: $P = X_{çözücü}\cdot P^\circ$)
- **Kaynama noktası yükselmesi:** $\Delta T_k = K_k \cdot m \cdot i$
- **Donma noktası alçalması:** $\Delta T_d = K_d \cdot m \cdot i$
- **Ozmotik basınç**

$i$: **tanecik sayısı** (van't Hoff faktörü) — şeker $i = 1$, $NaCl$ $i = 2$, $CaCl_2$ $i = 3$.

**Uygulamalar:** Kışın yollara tuz serpme, antifriz, deniz suyunun daha geç donması, tuzlu suda makarnanın daha yüksek sıcaklıkta kaynaması.
""",
  [(r"$0{,}2$ mol $NaOH$ ile $500$ mL çözelti hazırlanıyor. Molarite kaçtır?", r"$M = \frac{0{,}2}{0{,}5} = 0{,}4$ M."),
   (r"Eşit molalitedeki şeker, $NaCl$ ve $CaCl_2$ çözeltilerinin donma noktalarını sıralayınız.", r"Tanecik sayıları $1 < 2 < 3$; donma noktası alçalması en çok $CaCl_2$'de: **şeker > NaCl > CaCl₂** (en düşük donma noktası CaCl₂).")],
  [r"Molarite mol/L çözelti; molalite mol/kg çözücü.", "Koligatif özellik tanecik sayısına bağlıdır.", r"$\Delta T = K\cdot m\cdot i$; NaCl için $i = 2$."]),
]),
]
