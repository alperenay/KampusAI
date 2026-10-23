# -*- coding: utf-8 -*-
"""11. Sınıf Kimya konu anlatım notları → js/data/content/kim-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema: Etkileşim — Enerji ve Tepkime Hızı", "Theme 1: Interaction — Energy and Reaction Rate", [
O("k1", "1.1.1", "Tepkimelerde enerji değişimi ve enerji kaynakları", "Energy changes in reactions and energy sources", r"""
# Entalpi Değişimi
Bağların **kırılması enerji ister**, yeni bağların **oluşması enerji açığa çıkarır**. Sabit basınçta alınan/verilen ısı **entalpi değişimi** $\Delta H$ ile gösterilir.

| | Ekzotermik | Endotermik |
|---|---|---|
| $\Delta H$ | $< 0$ | $> 0$ |
| Isı | **Açığa çıkar** | **Alınır** |
| Çevre | Isınır | Soğur |
| Enerji | Ürünlerin enerjisi < tepkenlerin | Ürünlerin enerjisi > tepkenlerin |
| Örnek | Yanma, nötrleşme, donma, yoğuşma | Fotosentez, elektroliz, erime, buharlaşma, ayrışma |

# Potansiyel Enerji Diyagramı
- **Aktivasyon enerjisi ($E_a$):** Tepkimenin başlaması için aşılması gereken enerji engeli.
- **Aktifleşmiş kompleks:** Diyagramın tepesindeki kararsız ara yapı.
- $\Delta H = E_{a,ileri} - E_{a,geri}$.
- **Termokimyasal denklem:** $C(k) + O_2(g) \to CO_2(g) \quad \Delta H = -393{,}5 \text{ kJ}$ → katsayılar 2 katına çıkarsa $\Delta H$ de 2 katına çıkar; tepkime ters çevrilirse $\Delta H$'nin işareti değişir.

# Maddelerin Enerji Kaynağı Olma Potansiyeli
- **Yanma ısısı (kalorifik değer):** Birim kütle (ya da 1 mol) maddenin tamamen yanmasıyla açığa çıkan ısı.
- Fosil yakıtlar (kömür, petrol, doğal gaz), **hidrojen** (kütlece en yüksek yanma ısılarından biri), biyoyakıtlar.
- Seçim ölçütleri: **enerji verimi**, maliyet, depolama, **çevresel etki** (CO₂, SO₂ salımı), **sürdürülebilirlik**.
- Besinlerin enerji değerleri: karbonhidrat ve protein ≈ 4 kcal/g, yağ ≈ 9 kcal/g.
""",
  [(r"$2H_2(g) + O_2(g) \to 2H_2O(s)\ \ \Delta H = -572$ kJ ise 1 mol suyun ayrışma entalpisi nedir?", r"Ters çevirip ikiye bölünür: $H_2O(s) \to H_2(g) + \frac12 O_2(g)\ \ \Delta H = +286$ kJ (endotermik).")],
  [r"$\Delta H<0$ ekzotermik, $\Delta H>0$ endotermik.", r"$E_a$: enerji engeli; $\Delta H=E_{a,ileri}-E_{a,geri}$.", "Yakıt seçimi: verim, maliyet, çevre etkisi."]),
O("k2", "1.1.3", "Bağ enerjileri, standart oluşum entalpisi ve Hess yasası", "Bond energies, standard enthalpy of formation and Hess's law", r"""
# Bağ Enerjisi
Gaz hâlindeki 1 mol molekülde belirli bir bağı **kırmak** için gereken enerji (her zaman pozitif).
$$\Delta H \approx \sum(\text{kırılan bağ enerjileri}) - \sum(\text{oluşan bağ enerjileri})$$
Ortalama bağ enerjileri kullanıldığından sonuç **yaklaşıktır**.

**Örnek:** $H_2 + Cl_2 \to 2HCl$ ($H-H$: 436, $Cl-Cl$: 243, $H-Cl$: 432 kJ/mol)
$$\Delta H = (436 + 243) - (2\cdot432) = 679 - 864 = -185 \text{ kJ}$$

# Standart Oluşum Entalpisi ($\Delta H^\circ_f$)
1 mol bileşiğin **elementlerinden** standart koşullarda (**25 °C, 1 atm**) oluşmasındaki entalpi değişimi.
- Elementlerin en kararlı hâllerinin $\Delta H^\circ_f$ değeri **sıfırdır** ($O_2(g)$, $C(\text{grafit})$, $H_2(g)$…).
$$\Delta H^\circ_{tep} = \sum n\,\Delta H^\circ_f(\text{ürünler}) - \sum n\,\Delta H^\circ_f(\text{tepkenler})$$

# Hess Yasası
Bir tepkimenin entalpi değişimi **izlenen yoldan bağımsızdır**; yalnızca başlangıç ve son hâllere bağlıdır. Ara tepkimeler toplanarak istenen tepkimeye ulaşılır; $\Delta H$'ler de aynı işlemlerle toplanır.

| İşlem | $\Delta H$'ye etkisi |
|---|---|
| Tepkimeyi ters çevirmek | İşaret değişir |
| Katsayıları $n$ ile çarpmak | $\Delta H \times n$ |
| Tepkimeleri toplamak | $\Delta H$'ler toplanır |
""",
  [(r"$\Delta H^\circ_f$: $CH_4 = -75$, $CO_2 = -394$, $H_2O(s) = -286$ kJ/mol. $CH_4 + 2O_2 \to CO_2 + 2H_2O(s)$ tepkimesinin $\Delta H$'si?", r"$\Delta H = [-394 + 2(-286)] - [-75 + 0] = -966 + 75 = -891$ kJ.")],
  ["Bağ enerjisi: kırılan − oluşan.", r"Elementlerin $\Delta H^\circ_f = 0$; ürünler − tepkenler.", "Hess: entalpi yoldan bağımsız."]),
O("k3", "1.2.1", "Çarpışma teorisi ve ortalama tepkime hızı", "Collision theory and average reaction rate", r"""
# Çarpışma Teorisi
Tepkime için tanecikler:
1. **Çarpışmalı**,
2. Çarpışma **yeterli enerjiyle** ($\ge E_a$) olmalı,
3. **Uygun geometride (doğrultuda)** olmalı.
Bu şartları sağlayan çarpışmalar **etkin çarpışma**dır; etkin çarpışma sayısı arttıkça hız artar.

- $E_a$ **yüksekse** tepkime **yavaş**, düşükse hızlıdır.
- Zıt yüklü iyonlar arasındaki tepkimeler (ör. $Ag^+ + Cl^- \to AgCl$) **çok hızlıdır**; bağ kırılması gereken tepkimeler daha yavaştır.

# Ortalama Tepkime Hızı
Birim zamanda derişimde (ya da miktar, basınç, hacim, renk, iletkenlik) meydana gelen değişim:
$$v = -\frac{\Delta[\text{tepken}]}{\Delta t} = +\frac{\Delta[\text{ürün}]}{\Delta t} \quad (\text{mol/L·s})$$
Hız her zaman **pozitiftir**; tepken için eksi işaret kullanılır.

**Katsayılara göre:** $aA + bB \to cC$ için
$$v = -\frac{1}{a}\frac{\Delta[A]}{\Delta t} = -\frac1b\frac{\Delta[B]}{\Delta t} = \frac1c\frac{\Delta[C]}{\Delta t}$$

**Hız ölçme yöntemleri:** gaz hacmi/basıncı değişimi, renk değişimi, iletkenlik, çökelek oluşumu, kütle kaybı.
""",
  [(r"$N_2 + 3H_2 \to 2NH_3$ tepkimesinde $NH_3$ oluşma hızı $0{,}4$ mol/L·s ise $H_2$ harcanma hızı nedir?", r"$\frac{v_{H_2}}{3} = \frac{v_{NH_3}}{2} \Rightarrow v_{H_2} = \frac32 \cdot 0{,}4 = 0{,}6$ mol/L·s.")],
  ["Etkin çarpışma: yeterli enerji + uygun geometri.", r"$E_a$ büyükse tepkime yavaş.", "Ortalama hız katsayılara bölünerek eşitlenir."]),
O("k4", "1.2.3", "Hıza etki eden faktörler, hız denklemi ve mekanizma", "Factors affecting rate, rate law and mechanism", r"""
# Hıza Etki Eden Faktörler
| Faktör | Etki | Neden |
|---|---|---|
| **Madde cinsi** | Farklı | Bağ türü ve $E_a$ farkı |
| **Fiziksel hâl** | Gaz, çözelti > sıvı > katı | Taneciklerin hareketliliği ve temas |
| **Derişim** | ↑ → hız ↑ | Birim hacimde çarpışma sayısı artar |
| **Sıcaklık** | ↑ → hız ↑ (≈ her 10 °C'de yaklaşık 2 kat) | Kinetik enerji ↑, $E_a$'yı aşan tanecik **sayısı** ↑; hız sabiti $k$ artar |
| **Katalizör** | Hız ↑ | **Farklı mekanizma** ile $E_a$'yı **düşürür**; tükenmez; $\Delta H$'yi **değiştirmez** |
| **Temas yüzeyi** | ↑ → hız ↑ | Toz şeker, parçalanmış katı daha hızlı tepkir |

> Sıcaklık artışı ile katalizör farkı: sıcaklık $E_a$'yı değiştirmez, eşiği aşan tanecik sayısını artırır; katalizör $E_a$'yı düşürür. **Enzimler** biyolojik katalizördür; inhibitörler hızı düşürür.

# Hız Denklemi
$$v = k[A]^m[B]^n$$
- $m, n$: **tepkime mertebeleri** — **deneysel** olarak bulunur; toplam mertebe $m + n$.
- $k$: **hız sabiti**; sıcaklık ve katalizöre bağlıdır, derişime bağlı değildir.
- **Deneysel veriden mertebe bulma:** Bir maddenin derişimi 2 katına çıkınca hız 4 katına çıkıyorsa o maddeye göre mertebe 2'dir.
- Katı ve saf sıvılar hız denklemine **yazılmaz**.

# Çok Basamaklı Tepkimeler
- **En yavaş basamak hızı belirler** (hız belirleyen basamak); hız denklemi bu basamağa göre yazılır.
- Basamaklarda oluşup sonra harcanan türler **ara ürün**; başta harcanıp sonda geri oluşan türler **katalizör**dür.
""",
  [(r"$2NO + O_2 \to 2NO_2$ için deneyler: $[NO]$ iki katına çıkınca hız 4 katına, $[O_2]$ iki katına çıkınca hız 2 katına çıkıyor. Hız denklemi ve mertebe nedir?", r"$NO$'ya göre 2., $O_2$'ye göre 1. mertebe: $v = k[NO]^2[O_2]$; toplam mertebe **3**.")],
  ["Derişim, sıcaklık, yüzey, katalizör hızı artırır.", r"Katalizör $E_a$'yı düşürür, $\Delta H$'yi değiştirmez.", r"$v=k[A]^m[B]^n$; yavaş basamak hızı belirler."]),
]),
U("u2", "2. Tema: Çeşitlilik — Kimyasal Denge", "Theme 2: Diversity — Chemical Equilibrium", [
O("k1", "2.1.1", "Tersinir tepkimeler, denge sabiti ve tepkime oranı", "Reversible reactions, equilibrium constant and reaction quotient", r"""
# Tersinir Tepkimeler ve Dinamik Denge
- İleri ve geri tepkimeler **aynı anda** yürür.
- Denge anında **ileri hız = geri hız**; derişimler **sabit** kalır (eşit değil!). Tepkimeler durmaz → **dinamik denge**.
- Denge ancak **kapalı sistemde** ve **sabit sıcaklıkta** kurulur.
- Dengeye gelirken ileri hız **azalır**, geri hız **artar**.

**Fiziksel denge:** Kapalı kapta sıvı–buhar dengesi, doymuş çözeltide çözünme–çökelme.
**Kimyasal denge:** $N_2 + 3H_2 \rightleftharpoons 2NH_3$.

# Denge Sabiti
$aA + bB \rightleftharpoons cC + dD$ için:
$$K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b} \qquad K_p = \frac{P_C^c\,P_D^d}{P_A^a\,P_B^b}$$
- **Katılar ve saf sıvılar yazılmaz.**
- $K_p = K_c(RT)^{\Delta n}$ ($\Delta n$: gaz ürün molü − gaz tepken molü).
- $K$ **yalnızca sıcaklıkla** değişir.
- $K \gg 1$ → **ürünler** lehine; $K \ll 1$ → **tepkenler** lehine.
- Tepkime ters çevrilirse $K' = 1/K$; katsayılar $n$ ile çarpılırsa $K' = K^n$.

# Tepkime Oranı ($Q$)
Herhangi bir andaki derişimlerle yazılan ifade.
| Durum | Sonuç |
|---|---|
| $Q = K$ | Sistem dengededir |
| $Q < K$ | **İleri** yönde ilerler |
| $Q > K$ | **Geri** yönde ilerler |
""",
  [(r"$H_2 + I_2 \rightleftharpoons 2HI$ tepkimesi dengede iken $[H_2] = 0{,}1$, $[I_2] = 0{,}1$, $[HI] = 0{,}8$ M ise $K_c$ nedir?", r"$K_c = \frac{0{,}8^2}{0{,}1 \cdot 0{,}1} = \frac{0{,}64}{0{,}01} = 64$.")],
  ["Dengede ileri hız = geri hız; derişimler sabit.", "Katı ve saf sıvı K ifadesine yazılmaz; K yalnız sıcaklıkla değişir.", "Q<K ileri, Q>K geri."]),
O("k2", "2.1.5", "Dengeyi etkileyen faktörler: Le Chatelier", "Factors affecting equilibrium: Le Chatelier's principle", r"""
# Le Chatelier İlkesi
Dengedeki bir sisteme dışarıdan etki yapılırsa sistem bu etkiyi **azaltacak yönde** kayar.

| Etki | Dengenin kayma yönü | K değişir mi? |
|---|---|---|
| Madde **eklemek** | O maddeyi **harcayan** yöne | Hayır |
| Madde **çekmek** | O maddeyi **üreten** yöne | Hayır |
| **Hacmi azaltmak** (basıncı artırmak) | Gaz **mol sayısı az** olan yöne | Hayır |
| Hacmi artırmak | Gaz mol sayısı **çok** olan yöne | Hayır |
| **Sıcaklığı artırmak** | **Endotermik** yöne | **Evet** |
| Sıcaklığı azaltmak | Ekzotermik yöne | Evet |
| **Katalizör** | **Kaymaz**; dengeye daha çabuk ulaşılır | Hayır |
| Soy gaz eklemek (sabit hacimde) | Kaymaz | Hayır |

> Gaz mol sayıları eşitse ($\Delta n = 0$) hacim/basınç değişimi dengeyi kaydırmaz.

**Endüstriyel örnek — Haber–Bosch:** $N_2 + 3H_2 \rightleftharpoons 2NH_3\ \ \Delta H < 0$
- **Yüksek basınç** → mol sayısı az olan ürün tarafı (verim ↑).
- Düşük sıcaklık verimi artırır ama **hızı düşürür** → orta sıcaklık (~450 °C) ve **demir katalizör** kullanılır.
- $NH_3$ ortamdan **sürekli çekilir**.
""",
  [(r"$2SO_2(g) + O_2(g) \rightleftharpoons 2SO_3(g)\ \ \Delta H < 0$ dengesinde sıcaklık artırılırsa ve hacim küçültülürse ne olur?", r"Sıcaklık artışı → **endotermik (geri)** yöne kayar, $K$ **küçülür**. Hacim küçülmesi → gaz mol sayısı az olan **ürün (ileri)** yönüne kayar, $K$ değişmez.")],
  ["Sistem etkiyi azaltacak yöne kayar.", "Basınç ↑ → az mollü tarafa; sıcaklık ↑ → endotermik yöne.", "Yalnızca sıcaklık K'yı değiştirir; katalizör kaydırmaz."]),
O("k3", "2.2.1", "Suyun otoiyonizasyonu, asit-baz teorileri ve pH", "Autoionization of water, acid-base theories and pH", r"""
# Suyun Otoiyonizasyonu
$$H_2O(s) \rightleftharpoons H^+(suda) + OH^-(suda) \qquad K_w = [H^+][OH^-] = 1{,}0\times10^{-14}\ (25\,°C)$$
Saf suda $[H^+] = [OH^-] = 10^{-7}$ M → **nötr**. Sıcaklık artarsa $K_w$ artar (endotermik).

# pH ve pOH
$$pH = -\log[H^+] \qquad pOH = -\log[OH^-] \qquad pH + pOH = 14\ (25\,°C)$$
| pH | Çözelti |
|---|---|
| $< 7$ | Asidik |
| $= 7$ | Nötr |
| $> 7$ | Bazik |
pH 1 birim azalırsa $[H^+]$ **10 kat** artar.

# Asit–Baz Teorileri
| Teori | Asit | Baz |
|---|---|---|
| **Arrhenius** | Suda **H⁺** veren | Suda **OH⁻** veren |
| **Brønsted–Lowry** | **Proton (H⁺) veren** | **Proton alan** |
| **Lewis** | **Elektron çifti alan** | **Elektron çifti veren** |

**Konjuge (eşlenik) asit–baz çiftleri:** $NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-$ → $NH_3/NH_4^+$ ve $H_2O/OH^-$. Su hem asit hem baz gibi davranabilir (**amfoter**).
""",
  [(r"$0{,}01$ M $HCl$ çözeltisinin pH ve pOH değerleri nedir?", r"Kuvvetli asit, tamamen iyonlaşır: $[H^+] = 10^{-2}$ → pH $= 2$, pOH $= 12$.")],
  [r"$K_w=10^{-14}$; $pH+pOH=14$.", "Arrhenius H⁺/OH⁻; Brønsted proton; Lewis elektron çifti.", "pH 1 azalırsa [H⁺] 10 kat artar."]),
O("k4", "2.2.4", "Asit-baz kuvveti, tampon, titrasyon ve uygulamalar", "Acid-base strength, buffers, titration and applications", r"""
# Kuvvetli ve Zayıf Asit–Bazlar
- **Kuvvetli:** Suda **tamamen** iyonlaşır — $HCl, HBr, HI, HNO_3, H_2SO_4, HClO_4$; $NaOH, KOH, Ca(OH)_2$.
- **Zayıf:** **Kısmen** iyonlaşır, denge kurulur — $CH_3COOH, HF, H_2CO_3$; $NH_3$.
$$HA \rightleftharpoons H^+ + A^- \qquad K_a = \frac{[H^+][A^-]}{[HA]}$$
$K_a$ (ya da $K_b$) büyükse asit (baz) **daha kuvvetli**dir. Eşlenik çift için $K_a \cdot K_b = K_w$.

Zayıf asit için yaklaşık: $[H^+] \approx \sqrt{K_a \cdot C}$.

# Nötrleşme ve Tuzların Hidrolizi
Asit + baz → tuz + su. Kuvvetli asit + kuvvetli baz tuzu **nötr**; zayıf asit + kuvvetli baz tuzu (ör. $CH_3COONa$) **bazik**; kuvvetli asit + zayıf baz tuzu ($NH_4Cl$) **asidik**.

# Tampon Çözeltiler
Zayıf asit + eşlenik bazı (ya da zayıf baz + eşlenik asidi) içeren, **az miktarda asit ya da baz eklendiğinde pH'ını korur**. Ör. $CH_3COOH/CH_3COO^-$; kanda $H_2CO_3/HCO_3^-$ tamponu (pH ≈ 7,4).

# Titrasyon
Derişimi bilinen çözeltiyle (**ayarlı çözelti**) bilinmeyen çözeltinin derişiminin bulunması.
- **Eşdeğerlik noktası:** $n_{H^+} = n_{OH^-}$ → $M_a V_a \cdot (\text{tesir değ.}) = M_b V_b \cdot (\text{tesir değ.})$
- **İndikatör** (fenolftalein, metil oranj) renk değişimiyle dönüm noktasını gösterir.
- Titrasyon eğrisinde eşdeğerlik noktası çevresinde pH **ani** değişir.

# Günlük Hayat
Mide asidi ($HCl$) ve antiasitler ($Mg(OH)_2$, $NaHCO_3$); diş macunlarının hafif bazik olması; cildin hafif asidik pH'ı (≈ 5,5) ve şampuan seçimi; asit yağmurları; toprak pH'ına göre gübreleme.
""",
  [(r"$20$ mL $0{,}1$ M $NaOH$'ı nötrleştirmek için $0{,}05$ M $HCl$'den kaç mL gerekir?", r"$n_{OH^-} = 0{,}1 \cdot 0{,}020 = 0{,}002$ mol. $V = \frac{0{,}002}{0{,}05} = 0{,}04$ L $= 40$ mL.")],
  ["Kuvvetli tamamen, zayıf kısmen iyonlaşır; Ka büyükse kuvvetli.", "Tampon pH'ı korur (kanda karbonat tamponu).", "Titrasyon: eşdeğerlik noktasında mol H⁺ = mol OH⁻."]),
O("k5", "2.3", "Çözünürlük dengesi", "Solubility equilibrium", r"""
# Çözünürlük Çarpımı ($K_{çç}$)
Az çözünen iyonik katının doymuş çözeltisinde katı ile iyonları arasında denge kurulur:
$$AgCl(k) \rightleftharpoons Ag^+(suda) + Cl^-(suda) \qquad K_{çç} = [Ag^+][Cl^-]$$
Katı, ifadeye yazılmaz.

**Çözünürlük ($s$) ile $K_{çç}$ ilişkisi:**
| Tuz tipi | Örnek | $K_{çç}$ |
|---|---|---|
| $AB$ | $AgCl$ | $s^2$ |
| $AB_2$ / $A_2B$ | $PbI_2$, $Ag_2CrO_4$ | $4s^3$ |
| $AB_3$ | $Al(OH)_3$ | $27s^4$ |

# Çözünürlüğe Etki Eden Faktörler
- **Sıcaklık:** Çoğu katının çözünmesi endotermik → sıcaklık ↑ çözünürlük ↑ (ve $K_{çç}$ ↑). Gazların çözünürlüğü sıcaklıkla **azalır**.
- **Ortak iyon etkisi:** Çözeltide ortak iyon varsa denge çökelme yönüne kayar → çözünürlük **azalır** ($K_{çç}$ değişmez).

# Çökelme Şartı
İyon çarpımı $Q$:
- $Q < K_{çç}$ → **doymamış**, çökelme yok
- $Q = K_{çç}$ → **doymuş**
- $Q > K_{çç}$ → **çökelme** olur

**Uygulamalar:** Böbrek taşı ($CaC_2O_4$), mağara oluşumu ($CaCO_3$), suyun sertliği, diş minesi ($Ca_5(PO_4)_3OH$) ve florür.
""",
  [(r"$AgCl$ için $K_{çç} = 1{,}6\times10^{-10}$ ise saf sudaki çözünürlüğü nedir? $0{,}1$ M $NaCl$ çözeltisinde nasıl değişir?", r"$s^2 = 1{,}6\times10^{-10} \Rightarrow s = 1{,}26\times10^{-5}$ M. $NaCl$'de ortak iyon $Cl^-$: $s \cdot 0{,}1 = 1{,}6\times10^{-10} \Rightarrow s = 1{,}6\times10^{-9}$ M → çözünürlük çok **azalır**.")],
  [r"$K_{çç}$ katıyı içermez; AB tipinde $K=s^2$.", "Ortak iyon çözünürlüğü azaltır.", r"$Q>K_{çç}$ ise çökelme."]),
]),
U("u3", "3. Tema: Sürdürülebilirlik — Nanoteknoloji", "Theme 3: Sustainability — Nanotechnology", [
O("k1", "3.1.1", "Yeşil hidrojen ve nanoteknolojinin fayda–zararları", "Green hydrogen and nanotechnology's benefits and risks", r"""
# Hidrojenin "Renkleri"
| Tür | Üretim | Karbon salımı |
|---|---|---|
| **Gri hidrojen** | Doğal gazdan buhar reformasyonu | Yüksek |
| **Mavi hidrojen** | Gri + karbon yakalama ve depolama | Azaltılmış |
| **Yeşil hidrojen** | **Yenilenebilir elektrikle suyun elektrolizi** | **Yok** |

$$2H_2O(s) \xrightarrow{\text{elektroliz}} 2H_2(g) + O_2(g)$$
- Evsel ve organik atıklardan **fermantasyonla** biyohidrojen üretimi de mümkündür.
- **Avantaj:** Yanma ürünü yalnızca **su**; kütlece yüksek enerji; yakıt pillerinde elektrik üretimi.
- **Zorluklar:** **Depolama** (yüksek basınç ya da çok düşük sıcaklık), **taşıma**, yüksek üretim maliyeti, yanıcılık.

# Nanoteknoloji
**1–100 nm** boyutundaki maddelerin özel özelliklerinden yararlanma. Nano boyutta **yüzey alanı/hacim oranı** çok büyük olduğundan kimyasal, optik, elektriksel özellikler değişir.

| Faydalar | Olası zararlar |
|---|---|
| Daha verimli **güneş panelleri** ve bataryalar | Nano parçacıkların **solunum yoluyla** akciğere ulaşması |
| Hedefe yönelik **ilaç taşıma** sistemleri | Hücre zarından geçip **hücre hasarı** |
| Hafif ve dayanıklı malzemeler (grafen, karbon nanotüp) | Çevrede birikme, ekosisteme etkiler |
| **Su arıtma** filtreleri, antibakteriyel yüzeyler (gümüş nanoparçacık) | Uzun vadeli etkilerin **henüz tam bilinmemesi** |
| Kendi kendini temizleyen yüzeyler (lotus etkisi) | Düzenleme ve etiketleme eksiklikleri |

> **İhtiyatlılık ilkesi:** Risk tam bilinmeden yaygın kullanımda dikkatli olunmalı, araştırmalar sürdürülmelidir.
""",
  [("Yeşil hidrojenin 'yeşil' olmasının şartı nedir?", "Elektrolizde kullanılan elektriğin **yenilenebilir kaynaklardan** (güneş, rüzgâr, hidroelektrik) gelmesi; böylece üretim sürecinde **karbon salımı olmaz**. Fosil kaynaklı elektrikle yapılan elektroliz yeşil sayılmaz.")],
  ["Yeşil hidrojen: yenilenebilir elektrikle elektroliz.", "Nano: 1–100 nm, büyük yüzey/hacim oranı.", "Faydalar: ilaç taşıma, güneş paneli; riskler: sağlık ve çevre."]),
O("k2", "3.1.3", "Mikroplastikler ve nanoplastikler", "Microplastics and nanoplastics", r"""
# Tanımlar
- **Mikroplastik:** **5 mm'den küçük** plastik parçacıklar.
- **Nanoplastik:** **1 μm'den** (bazı tanımlarda 100 nm'den) küçük parçacıklar.

**Kaynaklar:**
- **Birincil:** Doğrudan küçük üretilen — kozmetik mikroboncuklar, endüstriyel peletler.
- **İkincil:** Büyük plastiklerin güneş, dalga ve aşınma ile **parçalanması** — şişeler, poşetler, sentetik kumaşların yıkanırken bıraktığı **lifler**, araç **lastik aşınması**.

# Etkileri
- Denizlerde, toprakta, havada ve içme suyunda birikir.
- **Besin zincirine** girer: plankton → balık → insan (**biyobirikim**).
- Yüzeylerine zehirli kimyasalları ve mikroorganizmaları taşıyabilir; bazı katkı maddeleri (ftalatlar, bisfenol A) **hormon bozucu** etki yapabilir.
- İnsan kanında, akciğer ve plasenta dokusunda tespit edilmiştir; sağlık etkileri araştırılmaktadır.

# Önlemler
- **Azalt, yeniden kullan, geri dönüştür.**
- Tek kullanımlık plastiklerin sınırlandırılması; kozmetiklerde mikroboncuk yasakları.
- **Biyobozunur** plastikler (PLA gibi) geliştirmek.
- Çamaşır makinelerinde mikrolif filtreleri; atık su arıtımının iyileştirilmesi.
""",
  [("Mikroplastiklerin insan sağlığına ulaşma yolunu besin zinciri üzerinden açıklayınız.", "Denizdeki mikroplastikleri **plankton** ve küçük canlılar yutar; bunları **balıklar** yer; parçacıklar ve taşıdıkları kimyasallar her basamakta **birikir** ve sonunda deniz ürünleri yoluyla **insana** ulaşır.")],
  ["Mikroplastik < 5 mm; nanoplastik < 1 μm.", "Birincil (mikroboncuk) ve ikincil (parçalanma) kaynaklar.", "Besin zincirinde biyobirikim; çözüm: azalt, geri dönüştür, biyobozunur."]),
]),
]


from _ek134 import uygula  # noqa: E402
uygula(units, "kim11_ek134")

from _ek136 import uygula136; uygula136(units, "kim11")

write("kim-11.js", "11/kimya", "11. Sınıf Kimya — konu anlatım notları",
      "kullanıcının verdiği \"11. Sınıf Kimya Konu Anlatım Notları\" (3 tema).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. \"Endertermik\" yazımı endotermik olarak düzeltildi. Asit-baz ve çözünürlük bölümleri ders kitabı düzeyinde genişletildi (Ka, tampon, titrasyon hesabı, Kçç–çözünürlük ilişkisi); hidrojen türleri tablosu ve çözümlü örnekler eklendi.")
