# -*- coding: utf-8 -*-
r"""12. Sınıf Kimya — 1.34.0 ek kazanımları (AYT organik kimya ve elektrokimya)."""
from _c import O

EK = {
"u1": [
O("k4", "1.4", "Derişim pilleri, Nernst denklemi ve pilin potansiyeline etki eden faktörler", "Concentration cells, the Nernst equation and factors affecting cell potential", r"""
# Standart Pil Potansiyeli
$$E^\circ_{pil} = E^\circ_{indirgenme(katot)} - E^\circ_{indirgenme(anot)}$$
$E^\circ_{pil} > 0$ ise pil **kendiliğinden** çalışır.

# Nernst Denklemi (25 °C)
$$E_{pil} = E^\circ_{pil} - \frac{0{,}059}{n}\log Q$$
$n$: aktarılan elektron sayısı, $Q$: tepkime oranı ([ürün]/[girdi], katı ve sıvılar yazılmaz).
- **Ürün derişimi artarsa** ($Q$ büyür) potansiyel **azalır**.
- **Girdi (katottaki iyon) derişimi artarsa** potansiyel **artar**.
- Pil çalıştıkça $Q$ artar, $E$ azalır; **dengede $E = 0$** (pil biter).
- Elektrot **yüzey alanı ve kütlesi** potansiyeli **değiştirmez** (yalnız akım süresini/miktarını etkiler).

# Derişim Pili
Aynı metal, **farklı derişimde** iyon çözeltileri: $E^\circ = 0$
$$E = \frac{0{,}059}{n}\log\frac{[\text{derişik}]}{[\text{seyreltik}]}$$
- **Derişik** çözeltideki elektrot **katot** (iyon indirgenir, derişim azalır).
- **Seyreltik** çözeltideki elektrot **anot** (metal yükseltgenir, derişim artar).
- Derişimler eşitlenince pil durur.
""",
  [(r"$Cu\,|\,Cu^{2+}(0{,}01\,M)\,||\,Cu^{2+}(1\,M)\,|\,Cu$ derişim pilinin potansiyeli kaç V'tur?", r"$E = \frac{0{,}059}{2}\log\frac{1}{0{,}01} = 0{,}0295\cdot2 = 0{,}059$ V."),
   (r"$Zn + Cu^{2+} \to Zn^{2+} + Cu$ pilinde $Zn^{2+}$ derişimi artırılırsa potansiyel nasıl değişir?", r"$Zn^{2+}$ **üründür**; derişimi artınca $Q$ artar, $E_{pil}$ **azalır**.")],
  [r"$E = E^\circ - \frac{0{,}059}{n}\log Q$.", "Ürün derişimi artınca potansiyel azalır; dengede E = 0.", "Derişim pilinde derişik taraf katottur."]),
],
"u2": [
O("k2", "2.2", "Organik bileşiklerde izomeri", "Isomerism in organic compounds", r"""
# İzomer Nedir?
**Kapalı formülü aynı**, **yapısı (ya da uzaydaki düzeni) farklı** bileşiklerdir; fiziksel/kimyasal özellikleri farklıdır.

# Yapı (Konstitüsyon) İzomerliği
| Tür | Örnek ($C_4H_{10}$, $C_2H_6O$ …) |
|---|---|
| **Zincir izomerliği** | Bütan – 2-metilpropan (izobütan) |
| **Konum izomerliği** | 1-propanol – 2-propanol; 1-büten – 2-büten |
| **Fonksiyonel grup izomerliği** | Etanol ($CH_3CH_2OH$) – dimetil eter ($CH_3OCH_3$) · aldehit – keton · karboksilik asit – ester |

- **Dallanma arttıkça** kaynama noktası **düşer** (temas yüzeyi azalır): n-pentan > izopentan > neopentan.

# Stereoizomerlik (uzay izomerliği)
- **Geometrik (cis–trans):** $C=C$ çift bağının **her iki karbonunda farklı** gruplar bulunmalı.
  - **cis:** aynı gruplar aynı tarafta (genelde polar, kaynama noktası yüksek)
  - **trans:** karşı taraflarda (simetrik, erime noktası yüksek)
  - Örnek: cis- ve trans-2-büten. 1-büten geometrik izomer **göstermez**.
- **Optik izomerlik:** Dört farklı grup taşıyan **kiral karbon**; ayna görüntüsü üst üste çakışmayan iki form (**enantiyomer**). Polarize ışığı zıt yönlerde çevirir. Örnek: laktik asit, aminoasitler (alanin).
""",
  [(r"$C_3H_8O$ formülüne sahip kaç alkol ve kaç eter yazılabilir?", r"Alkoller: 1-propanol, 2-propanol (**2**). Eter: etil metil eter $CH_3OCH_2CH_3$ (**1**). Toplam 3 yapı izomeri."),
   (r"$CH_3-CH=CH-CH_3$ ve $CH_2=CH-CH_2-CH_3$ bileşiklerinden hangisi cis–trans izomerliği gösterir?", r"**2-büten** ($CH_3CH=CHCH_3$): çift bağın her iki karbonunda farklı gruplar (H ve $CH_3$) var. 1-bütende bir karbonda iki H vardır, göstermez.")],
  ["İzomer: aynı kapalı formül, farklı yapı.", "Yapı izomerliği: zincir, konum, fonksiyonel grup.", "Cis–trans için çift bağın iki karbonunda farklı gruplar; kiral karbon optik izomerlik."]),
],
"u3": [
O("k3", "3.3", "Aromatik bileşikler: benzen ve türevleri", "Aromatic compounds: benzene and its derivatives", r"""
# Benzenin Yapısı
- Formülü $C_6H_6$; altı karbonlu **düzlemsel halka**.
- Tüm C atomları $sp^2$ hibritleşmiştir; bağ açıları $120^\circ$.
- **Rezonans (delokalize π elektronları):** Tüm C–C bağ uzunlukları **eşittir** (tekli ile çiftli arası). Kekulé yapıları arasında hızlı geçiş değil, **tek bir ortalama yapı** vardır.
- Bu kararlılık yüzünden benzen **katılma** değil **yer değiştirme (sübstitüsyon)** tepkimesi verir.

# Önemli Türevler
| Bileşik | Formül/grup | Kullanım |
|---|---|---|
| **Toluen** | $C_6H_5CH_3$ | Çözücü, TNT hammaddesi |
| **Fenol** | $C_6H_5OH$ | Zayıf asit, dezenfektan, reçine |
| **Anilin** | $C_6H_5NH_2$ | Boya sanayisi |
| **Benzoik asit** | $C_6H_5COOH$ | Gıda koruyucu (E210) |
| **Naftalin** | İki kaynaşmış halka | Güve kovucu |

# Disübstitüe Benzenlerde Konum
- **orto (o-):** 1,2 · **meta (m-):** 1,3 · **para (p-):** 1,4
- Örnek: p-diklorobenzen, o-ksilen.

# Tepkimeler
Halojenleme ($FeBr_3$ katalizör), nitrolama ($HNO_3/H_2SO_4$), alkilleme (Friedel–Crafts). Ürünlerde aromatik halka **korunur**.
""",
  [(r"Benzenin $C=C$ çift bağı içermesine rağmen bromlu suyu renksizleştirmemesinin nedeni nedir?", r"π elektronları halka üzerinde **delokalizedir** (rezonans); bu kararlılık katılma tepkimesini engeller. Benzen ancak **katalizörlü yer değiştirme** tepkimesi verir."),
   (r"Bir benzen halkasında iki $Cl$ atomu 1. ve 4. karbonlarda ise bileşiğin adı nedir?", r"1,4-diklorobenzen = **p-diklorobenzen** (para konumu).")],
  [r"Benzen: $sp^2$, düzlemsel, rezonans; bağ uzunlukları eşit.", "Benzen katılma değil yer değiştirme tepkimesi verir.", "orto 1,2 · meta 1,3 · para 1,4."]),
O("k4", "3.4", "Organik tepkime türleri", "Types of organic reactions", r"""
# Tepkime Türleri
| Tür | Açıklama | Örnek |
|---|---|---|
| **Yanma** | $O_2$ ile tam yanma → $CO_2 + H_2O$ | $CH_4 + 2O_2 \to CO_2 + 2H_2O$ |
| **Katılma (adisyon)** | Çift/üçlü bağa atom eklenir | $CH_2{=}CH_2 + H_2 \to CH_3CH_3$ |
| **Yer değiştirme (sübstitüsyon)** | Bir atom/grup başka biriyle değişir | $CH_4 + Cl_2 \xrightarrow{\text{ışık}} CH_3Cl + HCl$ |
| **Ayrılma (eliminasyon)** | Küçük molekül ayrılır, çift bağ oluşur | $CH_3CH_2OH \xrightarrow{H_2SO_4,\ 170\,^\circ C} CH_2{=}CH_2 + H_2O$ |
| **Yükseltgenme** | Alkol → aldehit/keton → asit | $CH_3CH_2OH \to CH_3CHO \to CH_3COOH$ |
| **Kondenzasyon (esterleşme)** | Asit + alkol → ester + su | $CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$ |
| **Polimerleşme** | Monomerlerden polimer | n $CH_2{=}CH_2 \to (-CH_2CH_2-)_n$ |

# Alkollerin Yükseltgenmesi
- **Primer** alkol → aldehit → karboksilik asit
- **Sekonder** alkol → **keton**
- **Tersiyer** alkol → **yükseltgenmez**

# Markovnikov Kuralı
Simetrik olmayan alkene $HX$ katılırken **H**, zaten **daha çok H taşıyan** karbona bağlanır: $CH_3CH{=}CH_2 + HBr \to CH_3CHBrCH_3$ (2-bromopropan).
""",
  [(r"2-propanol yükseltgenince hangi bileşik oluşur?", r"2-propanol **sekonder** alkoldür → **propanon (aseton)**, $CH_3COCH_3$ (keton)."),
   (r"Propene ($CH_3CH{=}CH_2$) $HCl$ katılmasının ana ürünü nedir?", r"Markovnikov kuralı: H uçtaki $CH_2$'ye, Cl ortadaki karbona → **2-kloropropan**.")],
  ["Doymamış bileşikler katılma, doymuşlar yer değiştirme verir.", "Primer alkol → aldehit → asit; sekonder → keton; tersiyer yükseltgenmez.", "Markovnikov: H, H'si çok olan karbona."]),
O("k5", "3.5", "Polimerler ve hayatımızdaki organik maddeler", "Polymers and organic substances in daily life", r"""
# Polimer Türleri
| Tür | Oluşum | Örnekler |
|---|---|---|
| **Katılma polimerleri** | Çift bağlı monomerler art arda bağlanır; yan ürün yok | **Polietilen (PE)** — poşet, **PVC** — boru, **polistiren (PS)** — köpük, **teflon (PTFE)** — tava kaplaması, **polipropilen (PP)** |
| **Kondenzasyon polimerleri** | İki fonksiyonel gruplu monomerler; **su gibi küçük molekül ayrılır** | **Naylon** (poliamit), **PET** (polyester — pet şişe), **bakalit**, proteinler, nişasta |

# Doğal Polimerler
- **Nişasta, selüloz, glikojen:** glikoz monomeri (karbonhidrat)
- **Proteinler:** aminoasitler arasında **peptit bağı** (kondenzasyon)
- **DNA/RNA:** nükleotitler
- **Doğal kauçuk:** izopren monomeri

# Plastiklerin Geri Dönüşümü
Geri dönüşüm kodları: **1 PET, 2 HDPE, 3 PVC, 4 LDPE, 5 PP, 6 PS, 7 diğer**.
- **Termoplastik:** Isıtılınca yumuşar, yeniden şekillenir (PE, PET) → geri dönüştürülebilir.
- **Termoset:** Bir kez sertleşir, ısıyla şekil almaz (bakalit).

# Sabun ve Deterjan
**Sabun:** Yağ asidi + NaOH/KOH (**sabunlaşma**). Molekülün **hidrofobik** uzun karbon zinciri yağı, **hidrofilik** $-COO^-Na^+$ ucu suyu tutar → **misel** oluşur. Sert suda $Ca^{2+}/Mg^{2+}$ ile çökelek yapar; deterjanlar bu sorunu azaltır.
""",
  [(r"PET şişeler ve naylon hangi polimerleşme türüyle elde edilir? Neden?", r"**Kondenzasyon** — monomerlerin fonksiyonel grupları (asit–alkol, asit–amin) birleşirken **su** açığa çıkar."),
   (r"Sabun molekülünün yağı temizleyebilmesini yapısıyla açıklayınız.", r"Uzun **apolar (hidrofobik)** kuyruk yağa, **iyonik (hidrofilik)** baş suya yönelir; yağ damlacığı misel içine hapsedilip suyla uzaklaştırılır.")],
  ["Katılma polimeri: PE, PVC, PS, teflon; yan ürün yok.", "Kondenzasyon polimeri: naylon, PET, proteinler; su ayrılır.", "Sabun: hidrofobik kuyruk + hidrofilik baş → misel."]),
],
}
