# -*- coding: utf-8 -*-
"""10. Sınıf Kimya Kazanım Odaklı Ders Notları → js/data/content/kim-10.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema: Etkileşim — Kimyasal Tepkimeler ve Mol", "Theme 1: Interaction — Reactions and the Mole", [
O("k1", "1.1", "Kimyasal tepkimeler, göstergeleri ve gösterim düzeyleri", "Chemical reactions, their signs and levels of representation", r"""
# Kimyasal Değişim ve Tepkime

Maddelerin iç yapısında, **bağ düzenlerinde** meydana gelen kalıcı değişime **kimyasal değişim**, bu değişimin gerçekleştiği sürece **kimyasal tepkime** denir. Yemek pişirme, pillerin çalışması, paslanma, hamurun mayalanması, fotosentez örnektir.

### Kimyasal değişimin göstergeleri
**Renk değişimi** · **gaz çıkışı** · **çökelme** (katı oluşumu) · **ısı/ışık oluşumu** · **koku değişimi** · **iletkenlik ve pH değişimi**

### Tepkime denklemi
$$\underbrace{\text{tepkenler (girenler)}}_{\text{sol}} \rightarrow \underbrace{\text{ürünler}}_{\text{sağ}}$$
Fiziksel hâller: (k) katı, (s) sıvı, (g) gaz, (suda) suda çözünmüş.

# Gösterim Düzeyleri

| Düzey | Açıklama |
|---|---|
| **Makroskobik** | Duyularla algılanan, ölçülebilen özellikler (renk, sıcaklık) |
| **Alt mikroskobik** | Atom, molekül, iyon, elektron hareketleri; bağ kopma/oluşma |
| **Sembolik** | Formül, denklem, grafik ile ilişkilendirme |

### Tanecik modelleri
**Lewis nokta yapısı** (değerlik elektronları) · **çizgi bağ gösterimi** · **top–çubuk modeli** (H beyaz, O kırmızı, C siyah) · **uzay-dolgu modeli** (atom yarıçapları oransal)

> Tepkimede bağlar kırılır, atomlar yeniden düzenlenir, yeni bağlar oluşur. **Toplam kütle, atom cinsi ve sayısı, proton ve nötron sayısı korunur.**
""",
  [("Bir deneyde iki renksiz çözelti karıştırıldığında sarı bir katı dibe çöküyor. Bu bir kimyasal değişim midir? Hangi gösterge?",
    "Evet; yeni bir madde oluşmuştur. Gösterge: **çökelme** (katı oluşumu) ve **renk değişimi**.")],
  ["Kimyasal değişim = bağ düzeninin değişmesi.", "Göstergeler: renk, gaz, çökelme, ısı/ışık, koku, pH.",
   "Tepkimede kütle, atom cinsi ve sayısı korunur."]),

O("k2", "1.2", "Kimyasal tepkime türleri", "Types of chemical reactions", r"""
# 1. Çökelme Tepkimeleri

İki çözelti karıştırılınca iyonların birleşip **suda çözünmeyen bir katı (çökelek)** oluşturmasıdır.
$$AgNO_3(suda) + NaCl(suda) \rightarrow AgCl(k) + NaNO_3(suda)$$
**Net iyon denklemi:** $Ag^+(suda) + Cl^-(suda) \rightarrow AgCl(k)$. Değişmeden kalan $Na^+$ ve $NO_3^-$ **seyirci iyonlar**dır.

# 2. İndirgenme–Yükseltgenme (Redoks)

**Elektron alışverişi** ile gerçekleşir.
- Elektron **veren** yükseltgenir, elektron **alan** indirgenir.
- İkisi aynı anda olur; verilen ve alınan elektron sayısı eşittir.
- Örnek: yanma, pillerin çalışması, metal + asit, paslanma.

# 3. Asit–Baz Tepkimeleri

**Arrhenius:** suda $H^+$ ($H_3O^+$) veren → **asit**; $OH^-$ veren → **baz**.
- **Nötralleşme:** sulu ortamda asit + baz → **tuz + su**.
- Kuvvetli asit + kuvvetli baz net iyon denklemi: $H^+(suda) + OH^-(suda) \rightarrow H_2O(s)$
- Her asit–baz tepkimesi nötralleşme değildir: $NH_3(g) + HCl(g) \rightarrow NH_4Cl(k)$ (sulu ortam yok).
- Karbonatlar asitlerle $CO_2$ gazı çıkarır.

| Tür | Göstergesi | Örnek |
|---|---|---|
| Çökelme | Az çözünen katı oluşur | Gümüş, karbonat tuzları |
| Redoks | Elektron aktarımı | Mg'nin yanması |
| Asit–baz | Tuz + su, pH değişimi | $HCl + NaOH \rightarrow NaCl + H_2O$ |
""",
  [("$Pb(NO_3)_2(suda) + 2KI(suda) \\rightarrow PbI_2(k) + 2KNO_3(suda)$ tepkimesinin net iyon denklemini yazın; seyirci iyonlar hangileridir?",
    "$Pb^{2+}(suda) + 2I^-(suda) \\rightarrow PbI_2(k)$. Seyirci iyonlar: $K^+$ ve $NO_3^-$."),
   ("$Zn + 2HCl \\rightarrow ZnCl_2 + H_2$ tepkimesinde yükseltgenen ve indirgenen nedir?",
    "Zn elektron verir ($Zn \\rightarrow Zn^{2+}$) → **yükseltgenir**. $H^+$ elektron alır ($H^+ \\rightarrow H_2$) → **indirgenir**.")],
  ["Çökelme: net iyon denklemi, seyirci iyonlar.", "Redoks: e⁻ veren yükseltgenir, alan indirgenir.",
   "Nötralleşme: sulu ortamda asit + baz → tuz + su."]),

O("k3", "1.3", "Mol kavramı ve mol hesaplamaları", "The mole concept and mole calculations", r"""
# Mol

Tanecikleri tek tek saymak imkânsız olduğu için **mol** birimi kullanılır (1 düzine = 12 gibi).
$$1 \text{ mol} = 6{,}02\times10^{23} \text{ tanecik} \quad (N_A, \text{ Avogadro sayısı})$$

- **akb (Dalton):** 1 tane $^{12}C$ atomunun kütlesinin $\frac{1}{12}$'si.
- **Mol kütlesi** $M_A$: 1 mol taneciğin gram cinsinden kütlesi (g/mol).
- **İzotoplar:** proton sayısı aynı, nötron sayısı farklı atomlar ($^{12}C$, $^{14}C$). Periyodik tablodaki kütleler, izotopların doğadaki yüzdelerine göre **ortalama** değerlerdir.

# Temel Bağıntılar

$$n = \frac{m}{M_A} \qquad n = \frac{N}{N_A} \qquad n = \frac{V}{22{,}4} \ (\text{NŞA: } 0^\circ C, 1 \text{ atm})$$

### Bileşikte atom sayısı
1 mol $CH_4$ → 1 mol C + 4 mol H = **5 mol atom** ($5 \times 6{,}02\times10^{23}$ atom).

| Verilen | İşlem | Sonuç |
|---|---|---|
| Kütle $m$ | $\div M_A$ | Mol $n$ |
| Tanecik sayısı $N$ | $\div N_A$ | Mol $n$ |
| Mol $n$ | $\times M_A$ | Kütle $m$ |
""",
  [("36 g su ($H_2O$, $M_A = 18$ g/mol) kaç moldür, kaç tane molekül ve kaç mol atom içerir?",
    "$n = \\frac{36}{18} = 2$ mol. Molekül: $2 \\times 6{,}02\\times10^{23} = 1{,}204\\times10^{24}$. Her molekülde 3 atom → **6 mol atom**."),
   ("NŞA'da 11,2 L $O_2$ gazı kaç gramdır? ($O = 16$)",
    "$n = \\frac{11{,}2}{22{,}4} = 0{,}5$ mol; $m = 0{,}5 \\times 32 = 16$ g.")],
  ["1 mol = $6{,}02\\times10^{23}$ tanecik.", "$n=m/M_A=N/N_A=V/22{,}4$ (NŞA).", "Ortalama atom kütlesi izotop yüzdelerinden hesaplanır."]),

O("k4", "1.4", "Tepkime denklemlerinin denkleştirilmesi", "Balancing chemical equations", r"""
# Kütlenin Korunumu

**Lavoisier (1789):** Kapalı kapta gerçekleşen tepkimede girenlerin kütleleri toplamı = ürünlerin kütleleri toplamı. Bu yüzden her atom cinsinin sayısı iki tarafta **eşit** olmalıdır.

# Denkleştirme Basamakları

1. **En karmaşık formüle** 1 katsayısı ver.
2. H ve O dışındaki atomları önce denkleştir; **H ve O'yu sona** bırak.
3. **Serbest elementleri** ($Fe$, $O_2$, $H_2$) en son denkleştir. Kesirli katsayı ($\frac{13}{2}O_2$) çıkarsa tüm denklemi uygun sayıyla genişlet.

### Örnek: metanın yanması
$$CH_4(g) + 2O_2(g) \rightarrow CO_2(g) + 2H_2O(s)$$
Sol: 1 C, 4 H, 4 O · Sağ: 1 C, 4 H, 4 O ✓

> Denkleştirirken **alt indisler değiştirilmez**, yalnızca katsayılar değişir.
""",
  [("$C_3H_8 + O_2 \\rightarrow CO_2 + H_2O$ denklemini denkleştirin.",
    "$C_3H_8$'e 1 → 3 $CO_2$, 4 $H_2O$. Sağda O: $6 + 4 = 10$ → 5 $O_2$. Sonuç: $C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O$."),
   ("$C_2H_6 + O_2 \\rightarrow CO_2 + H_2O$ denkleminde kesirli katsayı nasıl giderilir?",
    "$C_2H_6 + \\frac72O_2 \\rightarrow 2CO_2 + 3H_2O$ → 2 ile genişlet: $2C_2H_6 + 7O_2 \\rightarrow 4CO_2 + 6H_2O$.")],
  ["Kütle ve atom sayısı korunur.", "Karmaşık formüle 1; H ve O sona; serbest elementler en son.", "İndis değil katsayı değişir."]),

O("k5", "1.5", "Stokiyometri: sınırlayıcı bileşen ve yüzde verim", "Stoichiometry: limiting reactant and percent yield", r"""
# Stokiyometrik Hesaplama

Denkleştirilmiş denklemde **katsayılar = mol oranları**.

1. Verilen kütle/hacmi **mole** çevir.
2. Katsayı oranıyla istenen maddenin **molünü** bul.
3. Molü gram, litre ya da tanecik sayısına çevir.

# Sınırlayıcı Bileşen

Tamamen tükenip tepkimeyi durduran maddedir. Her girenin **mol sayısı / katsayısı** hesaplanır; **en küçük** sonucu veren sınırlayıcıdır. Diğeri **artar**.

# Yüzde Verim

$$\%\text{ verim} = \frac{\text{gerçek verim}}{\text{teorik verim}}\times100$$
""",
  [("4 mol $H_2$ ile 3 mol $O_2$ tepkimeye giriyor: $2H_2 + O_2 \\rightarrow 2H_2O$. Sınırlayıcı bileşen hangisidir? Kaç mol su oluşur, ne artar?",
    "$H_2$: $\\frac42 = 2$; $O_2$: $\\frac31 = 3$ → sınırlayıcı **$H_2$**. 4 mol $H_2$, 2 mol $O_2$ harcar → **4 mol su** oluşur, **1 mol $O_2$** artar."),
   ("Teorik olarak 50 g ürün beklenen tepkimede 40 g elde ediliyor. Verim yüzde kaçtır?", "$\\frac{40}{50}\\times100 = \\%80$.")],
  ["Katsayılar mol oranıdır.", "Sınırlayıcı: mol/katsayı en küçük olan.", "% verim = gerçek / teorik × 100."]),
]),
U("u2", "1. Tema: Etkileşim — Gazlar", "Theme 1: Interaction — Gases", [
O("k1", "1.6", "Gazların özellikleri ve kinetik moleküler teori", "Properties of gases and kinetic molecular theory", r"""
# Gazların Özellikleri

Maddenin en düzensiz hâlidir: belirli **şekli ve hacmi yoktur**, kabın her yönüne **eşit basınç** uygular, **sıkıştırılabilir**, diğer gazlarla her oranda **homojen** karışır.

# Kinetik Moleküler Teori (varsayımlar)

- Tanecikler arası boşluk çok büyüktür; taneciklerin **öz hacmi ihmal** edilir.
- Tanecikler sürekli, hızlı, rastgele (zikzaklı — **Brown hareketi**) hareket eder.
- Çarpışmalar **esnektir**; toplam kinetik enerji korunur.
- Tanecikler arası **çekim–itme kuvvetleri ihmal** edilir.
- **Ortalama kinetik enerji yalnızca mutlak sıcaklıkla** orantılıdır; aynı sıcaklıktaki tüm gazların ortalama kinetik enerjisi **eşittir**.
""",
  [("Aynı sıcaklıktaki $H_2$ ve $O_2$ gazlarının ortalama kinetik enerjileri ve hızları nasıldır?",
    "Ortalama kinetik enerjileri **eşittir** (yalnız sıcaklığa bağlı). $E_k = \\frac12mv^2$ olduğundan kütlesi küçük olan **$H_2$ daha hızlı** hareket eder.")],
  ["Gaz: şekil ve hacim yok, sıkıştırılabilir, homojen karışır.", "Ortalama $E_k$ yalnız mutlak sıcaklığa bağlı.", "Çarpışmalar esnek, tanecik hacmi ihmal."]),

O("k2", "1.7", "Gaz yasaları", "Gas laws", r"""
# Gaz Değişkenleri

Basınç $P$, hacim $V$, sıcaklık $T$, miktar $n$. Sıcaklık **daima Kelvin**: $T(K) = t(^\circ C) + 273$.

| Yasa | Sabit | İlişki | Formül |
|---|---|---|---|
| **Boyle** | $n, T$ | $P$ ile $V$ **ters** orantılı | $P_1V_1 = P_2V_2$ |
| **Charles** | $n, P$ | $V$ ile $T$ **doğru** orantılı | $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$ |
| **Gay-Lussac** | $n, V$ | $P$ ile $T$ **doğru** orantılı | $\dfrac{P_1}{T_1} = \dfrac{P_2}{T_2}$ |
| **Avogadro** | $P, T$ | $V$ ile $n$ **doğru** orantılı | $\dfrac{V_1}{n_1} = \dfrac{V_2}{n_2}$ |

### Birleşik gaz denklemi
$$\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}$$
""",
  [("Sabit sıcaklıkta 2 atm basınçtaki 6 L gaz 3 L'ye sıkıştırılıyor. Yeni basınç nedir?",
    "Boyle: $2\\cdot6 = P_2\\cdot3 \\Rightarrow P_2 = 4$ atm."),
   ("Sabit basınçta 27 °C'deki 4 L gaz 127 °C'ye ısıtılıyor. Hacim ne olur?",
    "$T_1 = 300$ K, $T_2 = 400$ K. $\\frac{4}{300} = \\frac{V_2}{400} \\Rightarrow V_2 = \\frac{16}{3} \\approx 5{,}33$ L.")],
  ["Boyle: $PV$ sabit.", "Charles: $V/T$ sabit; Gay-Lussac: $P/T$ sabit.", "Sıcaklık her zaman Kelvin."]),

O("k3", "1.8", "İdeal gaz denklemi", "The ideal gas equation", r"""
# İdeal Gaz Denklemi

Boyle, Charles ve Avogadro yasalarının birleşimidir:
$$P\cdot V = n\cdot R\cdot T$$

| Simge | Birim |
|---|---|
| $P$ | atm |
| $V$ | L |
| $n$ | mol |
| $R$ | $0{,}082 \ \dfrac{atm\cdot L}{mol\cdot K}$ $\left(= \dfrac{22{,}4}{273}\right)$ |
| $T$ | K |

# İdeallik

Gerçek gazlar **yüksek sıcaklık** ve **düşük basınçta** ideal davranışa en çok yaklaşır. Mol kütlesi küçük ve tanecikler arası çekimi zayıf gazlar ($He$, $H_2$) ideale daha yakındır.
""",
  [("27 °C'de 8,2 L'lik kapta 2 mol gaz var. Basınç kaç atm'dir?",
    "$P = \\frac{nRT}{V} = \\frac{2\\cdot0{,}082\\cdot300}{8{,}2} = 6$ atm.")],
  ["$PV = nRT$, $R = 0{,}082$.", "İdeale yakın: yüksek $T$, düşük $P$.", "Küçük mol kütleli gazlar daha ideal."]),

O("k4", "1.9", "Graham difüzyon ve efüzyon yasası", "Graham's law of diffusion and effusion", r"""
# Difüzyon ve Efüzyon

- **Difüzyon:** gaz taneciklerinin birbiri içinde **yayılması**, karışması.
- **Efüzyon:** sıkışmış gazın **küçük bir delikten** boşluğa kaçması.

# Graham Yasası

Aynı sıcaklıkta gazların yayılma hızı mol kütlelerinin **karekökü ile ters orantılıdır**:
$$\frac{\vartheta_1}{\vartheta_2} = \sqrt{\frac{M_{A2}}{M_{A1}}}$$

> Hafif gaz daha hızlı yayılır. Kokunun odaya yayılması difüzyon örneğidir.
""",
  [("Aynı koşullarda $H_2$ ($M_A=2$) ve $O_2$ ($M_A=32$) gazlarının yayılma hızları oranı nedir?",
    "$\\frac{\\vartheta_{H_2}}{\\vartheta_{O_2}} = \\sqrt{\\frac{32}{2}} = 4$ → $H_2$ 4 kat hızlıdır.")],
  ["Difüzyon: yayılma; efüzyon: delikten kaçma.", "$\\vartheta \\propto 1/\\sqrt{M_A}$.", "Hafif gaz daha hızlı."]),
]),
U("u3", "2. Tema: Çeşitlilik — Çözeltiler", "Theme 2: Diversity — Solutions", [
O("k1", "2.1", "Çözünme süreci ve \"benzer benzeri çözer\"", "The dissolving process and \"like dissolves like\"", r"""
# Çözelti

İki ya da daha fazla maddenin birbiri içinde **homojen** dağılmasıyla oluşan karışım. **Çözücü** + **çözünen**; sulu çözeltilerde çözücü sudur.

# Çözünmenin Üç Basamağı

| Basamak | Enerji |
|---|---|
| 1. Çözücü taneciklerinin birbirinden ayrılması | Alır (endotermik) |
| 2. Çözünen taneciklerinin birbirinden ayrılması | Alır (endotermik) |
| 3. Çözücü–çözünen etkileşimi (karışma) | Verir (ekzotermik) |

Toplam enerji değişimi bu üçünün toplamıdır; çözünme ısı alan ya da veren olabilir.

- Su molekülleriyle sarılma: **hidratasyon**; başka çözücüyle: **solvatasyon**.

# Benzer Benzeri Çözer

- **Polar** maddeler polar çözücüde: tuz, şeker, alkol → suda.
- **Apolar** maddeler apolar çözücüde: iyot → benzende, $CCl_4$'te.
""",
  [("İyot suda neden az, benzende neden iyi çözünür?",
    "İyot ($I_2$) **apolar**dır. Su polar, benzen apolar çözücüdür; \"benzer benzeri çözer\".")],
  ["Çözünme: ayrılma (endotermik) + karışma (ekzotermik).", "Hidratasyon = suyla sarılma.", "Polar–polar, apolar–apolar."]),

O("k2", "2.2", "Çözünme türleri: iyonik, moleküler, fiziksel, kimyasal", "Types of dissolution", r"""
# Çözünme Türleri

| Tür | Açıklama | İletkenlik |
|---|---|---|
| **İyonik çözünme** | İyonik bileşik (tuz, baz) katyon ve anyonlarına ayrışır | İletir (elektrolit) |
| **Moleküler çözünme** | Kovalent moleküller yapısını bozmadan dağılır (şeker, alkol) | İletmez |
| **Fiziksel çözünme** | Çözünen kimlik değiştirmez (tuz, şeker) | — |
| **Kimyasal çözünme** | Çözünen, çözücüyle tepkimeye girer ($CO_2$ suda asidik özellik, $NH_3$) | — |

| Madde | Çözünme | Elektrolit mi? |
|---|---|---|
| $NaCl$ | İyonik / fiziksel | Evet |
| $C_{12}H_{22}O_{11}$ (şeker) | Moleküler / fiziksel | Hayır |
| $NH_3$ | Moleküler / kimyasal | Evet |
""",
  [("Şekerli su elektriği iletir mi? Neden?", "Hayır. Şeker **moleküler** çözünür, ortamda serbest **iyon** yoktur.")],
  ["İyonik çözünme → elektrolit.", "Moleküler çözünme → genellikle iletmez.", "Kimyasal çözünmede yeni madde oluşur."]),

O("k3", "2.3", "Çözünürlük ve çözünürlüğü etkileyen faktörler", "Solubility and factors affecting it", r"""
# Çözünürlük

Belirli sıcaklık ve basınçta **100 g çözücüde** çözünebilen **en fazla** madde miktarıdır (g/100 g su). Maddeler için **ayırt edici** özelliktir.

# Etkileyen Faktörler

| Faktör | Katılar | Gazlar |
|---|---|---|
| **Madde cinsi** | Polarite benzerliği belirleyicidir | — |
| **Sıcaklık** | Genellikle sıcaklıkla **artar** (istisna: $Ce_2(SO_4)_3$ gibi) | Sıcaklıkla **daima azalır** |
| **Basınç** | Etkisi ihmal edilir | Basınçla **artar** (gazlı içecekler) |

> Yazın sıcak suda balıkların oksijensiz kalması: sıcaklık artınca suda çözünen $O_2$ azalır.
""",
  [("Gazlı içecek açıldığında neden köpürür?", "Kapak açılınca basınç düşer; gazın çözünürlüğü basınçla azaldığı için $CO_2$ çözeltiden ayrılır."),
   ("Bir katının çözünürlüğü 40 °C'de 50 g/100 g sudur. 40 °C'de 300 g su en fazla kaç g çözer?", "$\\frac{50}{100}\\times300 = 150$ g.")],
  ["Çözünürlük: 100 g çözücüdeki en fazla çözünen.", "Gazlar: sıcaklık ↑ çözünürlük ↓, basınç ↑ çözünürlük ↑.", "Katılar genelde sıcaklıkla artar."]),

O("k4", "2.4", "Çözeltilerin sınıflandırılması", "Classifying solutions", r"""
# Çözünen Miktarına Göre

| Tür | Açıklama |
|---|---|
| **Doymamış** | Çözebileceğinden **daha az** çözünen içerir |
| **Doymuş** | Çözebileceği **en fazla** maddeyi çözmüş; katısıyla dengede |
| **Aşırı doymuş** | Çözebileceğinden **fazla** çözünen; **kararsız** (ısıtıp yavaş soğutmayla), küçük etkiyle çöker |

# Elektrik İletkenliğine Göre

| Elektrolit | Elektrolit olmayan |
|---|---|
| İyon içerir, iletir (asit, baz, tuz çözeltileri) | İyon içermez, iletmez (şekerli su, alkollü su) |

# Derişik / seyreltik
Aynı miktar çözücüde çok çözünen → **derişik**, az çözünen → **seyreltik**.
""",
  [("Doymuş tuzlu suya bir miktar daha tuz eklenip karıştırılıyor. Ne olur?", "Sıcaklık değişmezse eklenen tuz **çözünmez**, dibe çöker (çözelti zaten doymuştur).")],
  ["Doymamış < doymuş < aşırı doymuş (kararsız).", "Elektrolit = iyonlu çözelti.", "Derişik/seyreltik göreceli kavramlardır."]),

O("k5", "2.5", "Derişim birimleri: molarite ve ppm", "Concentration units: molarity and ppm", r"""
# Molarite (M)

1 litre **çözeltide** çözünen maddenin mol sayısı:
$$M = \frac{n}{V}\quad(\text{mol/L})$$

### Seyreltme / deriştirme
Su eklenir ya da buharlaştırılırsa çözünen mol sayısı değişmez:
$$M_1V_1 = M_2V_2$$

# ppm (milyonda bir kısım)

Çok seyreltik çözeltiler için (havadaki kirleticiler, sudaki mineraller):
$$\text{ppm} = \frac{\text{çözünen (mg)}}{\text{çözelti (kg)}} \approx \frac{\text{mg}}{\text{L}} \ (\text{sulu çözeltide})$$
""",
  [("0,4 mol NaOH ile hazırlanan 200 mL çözeltinin molaritesi nedir?", "$M = \\frac{0{,}4}{0{,}2} = 2$ M."),
   ("2 M 100 mL çözeltiye su eklenerek hacim 500 mL yapılıyor. Yeni derişim?", "$2\\cdot100 = M_2\\cdot500 \\Rightarrow M_2 = 0{,}4$ M."),
   ("2 kg suda 0,6 mg kurşun var. Kaç ppm?", "$\\frac{0{,}6}{2} = 0{,}3$ ppm.")],
  ["$M = n/V$ (L çözelti).", "Seyreltmede $M_1V_1 = M_2V_2$.", "ppm = mg / kg."]),

O("k6", "2.6", "Koligatif özellikler", "Colligative properties", r"""
# Koligatif Özellikler

Uçucu olmayan bir madde çözündüğünde çözeltinin bazı özellikleri saf çözücüden farklılaşır. Bu özellikler çözünenin **cinsine değil, tanecik sayısına (derişimine)** bağlıdır.

### Kaynama noktası yükselmesi
Çözünen tanecikler buharlaşmayı engeller, **buhar basıncını düşürür**. Buhar basıncını dış basınca eşitlemek için daha yüksek sıcaklık gerekir → çözeltinin kaynama noktası saf sudan **yüksektir**.

### Donma noktası alçalması
Tanecikler çözücünün düzenli kristal yapısını engeller → çözelti saf çözücüden **daha düşük sıcaklıkta donar** (kışın yol tuzlama, antifriz).

### Tanecik sayısı etkisi
| 1 mol | Oluşan tanecik | Etki |
|---|---|---|
| Şeker | 1 mol molekül | 1 kat |
| $NaCl$ | 2 mol iyon ($Na^+ + Cl^-$) | 2 kat |
| $CaCl_2$ | 3 mol iyon | 3 kat |
| $Al(NO_3)_3$ | 4 mol iyon | 4 kat |
""",
  [("Eşit derişimli şeker, NaCl ve $CaCl_2$ çözeltilerinden hangisinin donma noktası en düşüktür?",
    "Tanecik sayısı en fazla olan **$CaCl_2$** (3 iyon) → donma noktası en düşük, kaynama noktası en yüksek.")],
  ["Koligatif = tanecik sayısına bağlı.", "Çözelti: kaynama ↑, donma ↓, buhar basıncı ↓.", "İyonik bileşikler iyon sayısı kadar etki eder."]),
]),
U("u4", "3. Tema: Sürdürülebilirlik", "Theme 3: Sustainability", [
O("k1", "3.1", "Yeşil kimya ve mikro ölçekli deneyler", "Green chemistry and micro-scale experiments", r"""
# Yeşil Kimya

Çevreye duyarlı, **atığı en aza indiren**, gelecek nesillere yaşanabilir bir dünya bırakmayı amaçlayan kimya anlayışı.

# Makro ve Mikro Ölçekli Deneyler

Klasik (makro ölçekli) deneyler çok kimyasal kullanır; atık miktarını ve **su ayak izini** büyütür. **Mikro ölçekli** deneylerle:
- Kimyasal tüketimi ve **atık** en aza iner,
- **Su ve karbon ayak izi** küçülür,
- **Atom ekonomisi** artar,
- Güvenlik artar, **maliyet** düşer.

# Küresel Sorunlar

**Asit yağmurları**, **sera etkisi** ve **ozon tabakasının incelmesi**; fosil yakıtların aşırı kullanımı ve endüstriyel salınımlardan kaynaklanır. Çözüm: yenilenebilir enerji ve yeşil kimya ilkeleri.
""",
  [("Okul laboratuvarında mikro ölçekli deney yapmanın iki faydasını yazın.", "Daha az kimyasal ve atık; daha düşük maliyet ve daha güvenli çalışma (su ayak izi de küçülür).")],
  ["Yeşil kimya: atığı önle, kaynakları verimli kullan.", "Mikro ölçek: az kimyasal, az atık, düşük maliyet.", "Asit yağmuru, sera etkisi, ozon incelmesi."]),
]),
]

from _ek136 import uygula136; uygula136(units, "kim10")

from ek_genel import uygula; uygula(units, "kim10_ek142")  # 1.42: eksik TYT konuları

write("kim-10.js", "10/kimya", "10. Sınıf Kimya — kazanım odaklı konu anlatım notları",
      "kullanıcının verdiği \"Kimya 10. Sınıf Kapsamlı Kazanım Odaklı Ders Notları\" (Etkileşim, Çeşitlilik, Sürdürülebilirlik).",
      units, "Kazanım kodları sıra numarasıdır. Örnek sorular eklendi.")
