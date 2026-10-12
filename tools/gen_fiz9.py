# -*- coding: utf-8 -*-
"""9. Sınıf Fizik Hap Bilgiler (PDF) → js/data/content/fiz-9.js
Metinler Markdown + LaTeX; biçim mat-9.js ile aynı."""
import json, pathlib, re
NL = lambda t: re.sub(r"\\n(?![a-z])", "\n", t)     # örneklerdeki "\n" → satır sonu (LaTeX \neq vb. korunur)

def O(id, code, tr, en, anlatim, ornekler=(), ozet=()):
    return {"id": id, "code": code, "title": {"tr": tr, "en": en},
            "content": {"anlatim": anlatim.strip(),
                        "ornekler": [{"soru": NL(q.strip()), "cozum": NL(a.strip())} for q, a in ornekler],
                        "ozet": [s.strip() for s in ozet]}}

units = []

# ---------------------------------------------------------------- 1. ÜNİTE
units.append({"id": "u1", "name": {"tr": "1. Ünite: Fizik Bilimi ve Kariyer Keşfi", "en": "Unit 1: Physics and Career Exploration"}, "outcomes": [
O("k1", "1.1",
  "Fizik biliminin diğer disiplinlerle ilişkisini belirleyerek fizik bilimini tanımlar.",
  "Defines physics by identifying its relationship with other disciplines.",
  r"""
# Fizik Bilimi

- **Fizik:** Evreni madde, enerji, kuvvet, uzay ve zaman ilişkileri çerçevesinde matematik ve gözlemle inceleyen yasa ve teoriler bütünü.
- **Amacı:** Evreni ve olayları açıklamak. **Yöntemi:** deney + gözlem; **dili:** matematik.
- Atom altı parçacıklardan galaksilere kadar her ölçeği inceler.
- Eski Çağ'da fizik doğa felsefesi içindeydi (Aristo – *Physica*).
- **Disiplinler iç içedir:** fotosentez (fizik + kimya + biyoloji), müzik (ses dalgaları), spor (kuvvet, hareket), coğrafya (tsunami, iklim), sanat (ışık, renk, denge).
- **Örnekler:** gökkuşağı → ışığın kırılması · kaykay → enerji dönüşümü · GPS, LED → elektrik ve manyetizma.
""",
  (),
  ["Fizik = evreni **matematik ve gözlemle** açıklayan bilim.",
   "Fizik diğer bilimlerle iç içedir (fotosentez: fizik + kimya + biyoloji)."]),
O("k2", "1.2",
  "Fizik biliminin alt dallarını belirler ve sınıflandırır.",
  "Identifies and classifies the branches of physics.",
  r"""
# Fizik Biliminin Alt Dalları

| Alt dal | Konusu | Hap örnek |
|---|---|---|
| **Mekanik** | Kuvvet, hareket, enerji, denge | Bisiklet, yaprağın düşmesi, kuşun uçması |
| **Elektromanyetizma** | Elektrik + manyetizma | Pusula, yıldırım, mıknatıs, dokunmatik ekran |
| **Termodinamik** | Isı, sıcaklık, hâl değişimi | Isı yalıtımı, yemek pişirme, kombi |
| **Optik** | Işık: yansıma, kırılma, renk | Gözlük, dürbün, fiber optik, gökkuşağı, serap |
| **Katı hâl fiziği** | Kristal yapılı katılar, yarı iletkenler | LCD, nanoteknoloji, maglev tren, şarjlı pil |
| **Atom fiziği** | Atomun yapısı, elektron dizilimi, enerji seviyeleri | Lazer, elektron mikroskobu, 3D yazıcı |
| **Nükleer fizik** | Çekirdek ve çekirdek tepkimeleri | Nükleer santral, BT, C‑14 yaş tayini |
| **Yüksek enerji ve plazma** | Atom altı parçacıklar, plazma (4. hâl) | Neon/floresan lamba, kutup ışıkları |

> ⚠ Bir olay birden fazla alt dalla ilgili olabilir (ABS fren → mekanik + elektromanyetizma).
""",
  (),
  ["8 alt dal: mekanik, elektromanyetizma, termodinamik, optik, katı hâl, atom, nükleer, yüksek enerji ve plazma.",
   "⚠ Bir olay birden çok alt dalla ilgili olabilir (ABS fren)."]),
O("k3", "1.3",
  "Fizik bilimine katkıda bulunan bilim insanlarının çalışmalarını ve deneyimlerini değerlendirir.",
  "Evaluates the work and experiences of scientists who contributed to physics.",
  r"""
# Fizik Bilimine Yön Verenler

- **İbnülheysem:** Şüphecilik ve eleştirel düşünce; görme = ışığın cisimden göze gelmesi → optik.
- **Hazini:** Yoğunluk ölçümleri; hassas terazinin ilk örnekleri.
- **Newton:** Hareketin 3 yasası + kütle çekim yasası ("devlerin omuzları" → önceki bilgiden yararlanma).
- **Einstein:** Özel (1905) ve Genel (1915) Görelilik, $E = m \cdot c^2$; merak ve azim.
- **Marie Curie:** Radyoaktivite, radyum–polonyum; fizik + kimya Nobel. **M. Goeppert Mayer:** çekirdek kabuk modeli.
- **Faraday** (kendini yetiştirdi, deneyci) + **Maxwell** (matematiksel ifade) → iş birliği. **Hawking:** ALS'ye rağmen çalıştı.
- **Türk bilim insanları:** Feza Gürsey, Asım Orhan Barut, Behram Kurşunoğlu.
- **Bilim insanının özellikleri:** meraklı, sorgulayıcı, sabırlı, kararlı, azimli, açık fikirli, eleştiriye açık, objektif.
""",
  (),
  ["İbnülheysem → optik (görme = ışık cisimden göze gelir).",
   "Newton → hareket yasaları + kütle çekim; Einstein → görelilik, $E = mc^2$.",
   "Faraday (deney) + Maxwell (matematik) → iş birliğinin önemi."]),
O("k4", "1.4",
  "Bilim ve teknoloji kurumlarında fizikle ilişkili kariyer olanaklarını sorgular.",
  "Questions physics-related career opportunities in science and technology institutions.",
  r"""
# Fizik Bilimi ile İlgili Kariyer Keşfi

- **TÜBİTAK:** AR‑GE desteği · **TENMAK:** nükleer, enerji, radyasyon · **MTA:** maden, jeoloji · **TUA:** uzay (Alper Gezeravcı) · **ASELSAN:** savunma elektroniği, MR cihazı.
- **CERN (1954):** Büyük Hadron Çarpıştırıcısı – 27 km, yerin 100 m altında; WWW burada doğdu. **NASA / ESA:** uzay araştırmaları.
- **Fizikle kariyer:** akademisyen, fizik öğretmeni, medikal fizik (radyoterapi, nükleer tıp), AR‑GE (savunma, enerji), bilgi teknolojileri (yazılım, yapay zekâ).
- Kurumlarda farklı disiplinler birlikte çalışır.
""",
  (),
  ["CERN: 27 km'lik Büyük Hadron Çarpıştırıcısı; WWW burada doğdu.",
   "Fizikçiler; akademi, öğretmenlik, medikal fizik, AR‑GE ve bilişimde çalışır."]),
]})

# ---------------------------------------------------------------- 2. ÜNİTE
units.append({"id": "u2", "name": {"tr": "2. Ünite: Kuvvet ve Hareket", "en": "Unit 2: Force and Motion"}, "outcomes": [
O("k1", "2.1",
  "Temel ve türetilmiş nicelikleri sınıflandırır.",
  "Classifies fundamental and derived quantities.",
  r"""
# Temel ve Türetilmiş Nicelikler

- **SI** 1960'ta Paris'te kabul edildi → **7 temel nicelik**.
- **Temel:** doğrudan ölçülür, kendi başına ifade edilir. **Türetilmiş:** temel niceliklerden matematiksel olarak elde edilir.

| Temel nicelik | Birim | Ölçüm aleti |
|---|---|---|
| Uzunluk | m | cetvel |
| Kütle | kg | terazi |
| Zaman | s | kronometre |
| Elektrik akımı | A | ampermetre |
| Sıcaklık | K | termometre |
| Işık şiddeti | cd | fotometre |
| Madde miktarı | mol | – |

**Hafıza:** "U‑K‑Z‑E‑S‑I‑M"

- **Türetilmiş:** alan (m²), hacim (m³), hız (m/s), ivme (m/s²), yoğunluk (kg/m³), kuvvet ($\text{N} = \text{kg} \cdot \text{m/s}^2$), enerji (J), basınç (Pa), güç (W).

> ⚠ Kütle temel, ağırlık türetilmiş (ağırlık bir kuvvettir, N). Sıcaklık temel, ısı türetilmiş.
""",
  (),
  ["7 temel nicelik: **U‑K‑Z‑E‑S‑I‑M** (uzunluk, kütle, zaman, elektrik akımı, sıcaklık, ışık şiddeti, madde miktarı).",
   "⚠ Kütle temel, ağırlık türetilmiş · sıcaklık temel, ısı türetilmiş.",
   r"$1\ \text{N} = 1\ \text{kg} \cdot \text{m/s}^2$"]),
O("k2", "2.2",
  "Skaler ve vektörel nicelikleri karşılaştırır.",
  "Compares scalar and vector quantities.",
  r"""
# Skaler ve Vektörel Nicelikler

- **Skaler:** sayı + birim yeter → kütle, zaman, uzunluk, alınan yol, hacim, sıcaklık, yoğunluk, enerji, sürat, basınç.
- **Vektörel:** sayı + birim + **yön** → kuvvet, ağırlık, hız, konum, yer değiştirme, ivme.
- Skalerler aritmetik toplanır (3 kg + 2 kg = 5 kg); vektörlerde sonuç yöne bağlıdır (60 N ve 40 N → aynı yön **100 N**, zıt yön **20 N**).

> ⚠ İki sınıflandırma bağımsızdır: enerji = türetilmiş + skaler, kuvvet = türetilmiş + vektörel.
""",
  [(r"Bir cisme 60 N ve 40 N büyüklüğünde iki kuvvet uygulanıyor. Kuvvetler (a) aynı yönde, (b) zıt yönde olduğunda bileşke kuvvet kaç N olur?",
    r"(a) Aynı yönde kuvvetler toplanır: $R = 60 + 40 = 100\ \text{N}$ (kuvvetlerin yönünde).\n(b) Zıt yönde büyükten küçük çıkarılır: $R = 60 - 40 = 20\ \text{N}$ (60 N'lik kuvvetin yönünde).")],
  ["Skaler: sayı + birim · Vektörel: sayı + birim + yön.",
   "Hız, kuvvet, ağırlık, yer değiştirme, ivme, konum → **vektörel**.",
   "⚠ Enerji türetilmiş + skaler; kuvvet türetilmiş + vektörel."]),
O("k3", "2.3",
  "Farklı doğrultulardaki vektörlerin yön ve büyüklüklerine yönelik çıkarım yapar.",
  "Makes inferences about the direction and magnitude of vectors in different directions.",
  r"""
# Vektörler – Özellikleri

- **Vektör** = yönlü doğru parçası (başlangıç, yön, büyüklük). Sembolde üstte ok: $\vec{F}$.
- **Eşit vektör:** yön ve büyüklük aynı → vektör paralel kaydırılabilir.
- **Zıt vektör:** büyüklük aynı, yön ters → $\vec{A} = -\vec{B}$
- **Sayıyla çarpım:** pozitif sayı → yön aynı · negatif sayı → yön ters · $|k| > 1$ büyür, $|k| < 1$ küçülür, $k = -1$ yalnızca yönü çevirir.
""",
  (),
  ["Vektör: başlangıç + yön + büyüklük.",
   r"Zıt vektör: $\vec{A} = -\vec{B}$ (büyüklük aynı, yön ters).",
   "Negatif sayıyla çarpım yönü çevirir."]),
O("k4", "2.3",
  "Vektörleri toplar ve bileşenlerine ayırır.",
  "Adds vectors and resolves them into components.",
  r"""
# Vektörler – Toplama ve Bileşenlere Ayırma

- Yalnızca **aynı cins** nicelikler toplanır (hız + kuvvet ✗). Etkiyi tek başına yapan vektör = **bileşke** ($\vec{R}$).
- **Uç uca ekleme:** 2. vektörün başlangıcı 1.nin bitişine → ilk başlangıçtan son bitişe çizilen vektör = $\vec{R}$. Çok sayıda vektör için uygundur. Kapalı şekil → $R = 0$.
- **Paralelkenar:** iki vektörün başlangıçları birleştirilir → uçlardan paraleller çizilir → köşegen = $\vec{R}$.
- **Bileşenlere ayırma:** vektör orijine taşınır, uçtan eksenlere paralel çizilir → $\vec{A} = \vec{A}_x + \vec{A}_y$. x'ler kendi, y'ler kendi arasında toplanır.
- Toplamanın sırası önemsiz: $\vec{A} + \vec{B} = \vec{B} + \vec{A}$. Üç yöntem de aynı sonucu verir.
- **Çıkarma:** $\vec{K} - \vec{L} = \vec{K} + (-\vec{L})$
""",
  (),
  ["Uç uca ekleme · paralelkenar · bileşenler → hepsi aynı bileşkeyi verir.",
   "Kapalı şekil oluşturan vektörlerin bileşkesi sıfırdır.",
   r"$\vec{K} - \vec{L} = \vec{K} + (-\vec{L})$"]),
O("k5", "2.4",
  "Doğadaki temel kuvvetleri karşılaştırır.",
  "Compares the fundamental forces of nature.",
  r"""
# Doğadaki Temel Kuvvetler

| Kuvvet | Görevi | Menzil | Örnek |
|---|---|---|---|
| **Güçlü nükleer** (en güçlü) | Proton–nötronu bir arada tutar | Çekirdek içi | Çekirdeğin dağılmaması, Güneş'te H → He |
| **Elektromanyetik** | Yükler ve mıknatıslar arası itme–çekme | Sonsuz | Pusula, şimşek, tarağın kâğıdı çekmesi |
| **Zayıf nükleer** | Çekirdeği kararsız yapar, parçacık dönüşümü | Çok kısa | Radyoaktif bozunma, C‑14 → N, uranyumun parçalanması |
| **Kütle çekim** (en zayıf) | Kütleler arası çekme; ağırlığın sebebi | Sonsuz | Gezegen yörüngeleri, gelgit, elmanın düşmesi |

- **Kuvvet:** harekete geçiren, hızlandıran, yavaşlatan, yön veya şekil değiştiren etki (N).
- **Abdüsselam:** zayıf + elektromanyetik kuvvetin birleşimi (1979 Nobel).
""",
  (),
  ["Güç sırası: güçlü nükleer > elektromanyetik > zayıf nükleer > kütle çekim.",
   "Sonsuz menzilli: elektromanyetik ve kütle çekim.",
   "Radyoaktif bozunma → zayıf nükleer kuvvet."]),
O("k6", "2.5.1",
  "Hareketin temel kavramlarını tanımlar, bunlarla ilgili akıl yürütür.",
  "Defines the basic concepts of motion and reasons about them.",
  r"""
# Hareketin Temel Kavramları

| Kavram | Hap tanım | Tür |
|---|---|---|
| Referans noktası | Hareketsiz kabul edilen başlangıç noktası | – |
| Konum ($\vec{x}$) | Referansa göre bulunulan yer | Vektörel |
| Alınan yol | Gidilen yörüngenin uzunluğu | Skaler |
| Yer değiştirme ($\Delta\vec{x}$) | İlk konumdan son konuma yönlü uzaklık: $\Delta\vec{x} = \vec{x}_{son} - \vec{x}_{ilk}$ | Vektörel |
| Sürat / ortalama sürat | alınan yol ÷ süre · anlık sürat = anlık hızın büyüklüğü | Skaler |
| Hız / ortalama hız | yer değiştirme ÷ süre · anlık hız = o andaki hız | Vektörel |
| İvme ($\vec{a}$) | $a = \Delta\upsilon / \Delta t$ (m/s²) | Vektörel |

$$\text{ortalama sürat} = \frac{\text{alınan yol}}{\Delta t} \qquad \vec{\upsilon}_{ort} = \frac{\Delta\vec{x}}{\Delta t} \qquad a = \frac{\Delta \upsilon}{\Delta t}$$

- Başladığı yere dönen cisim: yer değiştirme = 0, ortalama hız = 0, ama alınan yol ≠ 0.
- Doğrusal ve yön değiştirmeyen harekette: yol = yer değiştirmenin büyüklüğü, sürat = hızın büyüklüğü.
- **Hızlanan:** $\vec{a}$ ile $\vec{\upsilon}$ aynı yönde · **Yavaşlayan:** zıt yönde.
""",
  [(r"Bir öğrenci önce 80 m doğuya, sonra 60 m kuzeye yürüyor ve bu yolu toplam 40 s'de alıyor. Alınan yolu, yer değiştirmeyi, ortalama sürati ve ortalama hızın büyüklüğünü bulunuz.",
    r"Alınan yol: $80 + 60 = 140\ \text{m}$.\nYer değiştirme dik üçgenin hipotenüsüdür: $\sqrt{80^2 + 60^2} = \sqrt{10000} = 100\ \text{m}$ (kuzeydoğu yönünde).\nOrtalama sürat: $\dfrac{140}{40} = 3{,}5\ \text{m/s}$.\nOrtalama hız: $\dfrac{100}{40} = 2{,}5\ \text{m/s}$.\n⚠ Yol ve sürat skaler; yer değiştirme ve hız vektöreldir, bu yüzden değerleri farklı çıkar.")],
  [r"Ortalama hız $= \dfrac{\text{yer değiştirme}}{t}$, ortalama sürat $= \dfrac{\text{alınan yol}}{t}$",
   r"$a = \dfrac{\Delta\upsilon}{\Delta t}$ (m/s²)",
   "Başladığı yere dönen cisim: yer değiştirme ve ortalama hız sıfır, yol sıfır değil.",
   "Hızlanan: ivme ve hız aynı yönde; yavaşlayan: zıt yönde."]),
O("k7", "2.5.2",
  "Hareketleri türlerine göre sınıflandırır.",
  "Classifies motions by type.",
  r"""
# Hareket Türleri

- **Öteleme:** tüm parçalar aynı yönde eşit yer değiştirir → tren, düşen saksı, patenci, ok.
- **Dönme:** sabit bir eksen etrafında çember çizme → fan, dönme dolap, saat akrebi, pervane.
- **Titreşim:** denge noktası etrafında gidip gelme → gitar teli, salıncak, diyapazon, metronom.
- **Birleşik:** öteleme + dönme → bisiklet tekerleği, yuvarlanan top, vida · öteleme + titreşim → zıplama çubuğu · dönme + titreşim → atlıkarınca.
""",
  (),
  ["3 temel hareket: öteleme, dönme, titreşim.",
   "Yuvarlanan top / bisiklet tekerleği → öteleme + dönme (birleşik)."]),
]})

# ---------------------------------------------------------------- 3. ÜNİTE
units.append({"id": "u3", "name": {"tr": "3. Ünite: Akışkanlar", "en": "Unit 3: Fluids"}, "outcomes": [
O("k1", "3.1",
  "Basınçla ilgili çıkarım yapar; basınca etki eden etmenleri belirler.",
  "Makes inferences about pressure and identifies the factors affecting it.",
  r"""
# Basınç

Sıvı ve gazlara **akışkan** denir.

- **Basınç:** birim yüzeye dik etki eden kuvvet. Skaler, birimi $\text{Pa} = \text{N/m}^2$.

$$P = \frac{F}{A} \qquad \text{Katılar için: } P = \frac{G}{A} = \frac{m \cdot g}{A}$$

- Kuvvet ↑ → basınç ↑ · Yüzey alanı ↑ → basınç ↓.
- Katılar **kuvveti** aynen iletir (çivinin ucu küçük → basınç büyük).
- **Basıncı artır (küçük alan):** bıçak, çivi, iğne, raptiye, kazık, ekskavatör dişi.
- **Basıncı azalt (büyük alan):** kar ayakkabısı, paletli araç, geniş lastik, fil ayağı, geniş çanta askısı.

> ⚠ Cisim devrilince ağırlık (kuvvet) **değişmez**; yalnızca temas alanı ve basınç değişir.
""",
  [(r"Ağırlığı 600 N olan bir kişi, toplam taban alanı $0{,}04\ \text{m}^2$ olan ayakkabılarla duruyor. Yere uyguladığı basınç kaç Pa'dır? Kar ayakkabısıyla temas alanı $0{,}3\ \text{m}^2$ olursa basınç ne olur?",
    r"$P = \dfrac{F}{A} = \dfrac{600}{0{,}04} = 15\,000\ \text{Pa}$.\nKar ayakkabısıyla: $P = \dfrac{600}{0{,}3} = 2\,000\ \text{Pa}$. Ağırlık aynı kalır, alan büyüdüğü için basınç azalır; bu yüzden karda batmaz.")],
  [r"$P = \dfrac{F}{A}$ (Pa = N/m²)",
   "Alan küçülürse basınç artar (çivi, bıçak); alan büyürse azalır (kar ayakkabısı, palet).",
   "⚠ Devrilen cismin ağırlığı değişmez, basıncı değişir."]),
O("k2", "3.2",
  "Durgun sıvılarda basınçla ilgili çıkarım yapar.",
  "Makes inferences about pressure in static liquids.",
  r"""
# Sıvılarda Basınç

$$P = h \cdot d \cdot g$$

- Derinlik ($h$), sıvının yoğunluğu ($d$) ve yer çekimi ivmesi ($g$) ile **doğru orantılıdır**.
- Sıvılar kabın tüm yüzeylerine (taban + yan) basınç uygular.
- Basınç; kabın **şekline, taban alanına ve sıvı miktarına bağlı değildir**, yalnızca yüksekliğe bağlıdır.
- **Basınç kuvveti:** $F = P \cdot A = h \cdot d \cdot g \cdot A$ → bu ise alana bağlıdır.
- Barajın altı daha kalındır (derinde basınç büyük) · alttaki delikten su daha uzağa fışkırır.
- Kutuplarda $g$ büyük → basınç büyük; Ekvator'da küçük.

> ⚠ $h$ = sıvının **serbest yüzeyinden** noktaya olan **dik** uzaklıktır.
""",
  [(r"Yoğunluğu $1000\ \text{kg/m}^3$ olan suyla dolu bir havuzun 2 m derinliğindeki bir noktada suyun basıncı kaç Pa'dır? ($g = 10\ \text{m/s}^2$)",
    r"$P = h \cdot d \cdot g = 2 \cdot 1000 \cdot 10 = 20\,000\ \text{Pa}$.\nHavuzun genişliği ya da su miktarı sonucu değiştirmez; yalnızca derinlik önemlidir.")],
  [r"$P = h \cdot d \cdot g$: yalnızca derinlik, yoğunluk ve $g$'ye bağlı.",
   r"Basınç kuvveti $F = P \cdot A$ alana bağlıdır.",
   "⚠ $h$, serbest yüzeyden ölçülen dik derinliktir."]),
O("k3", "3.2.1",
  "Günlük hayatta sıvı basıncının kullanımına ilişkin çıkarım yapar.",
  "Makes inferences about the use of liquid pressure in daily life.",
  r"""
# Sıvı Basıncının Günlük Hayatta Kullanılması

- Sıvılar **sıkıştırılamaz** kabul edilir.
- **Pascal Yasası:** Kapalı kaptaki sıvıya uygulanan basınç (değişimi) sıvının **her noktasına eşit** iletilir.
- **Su cenderesi / hidrolik sistemler:**

$$\frac{F_1}{A_1} = \frac{F_2}{A_2}$$

  → küçük kuvvetle büyük yük kaldırılır.
- **Örnekler:** hidrolik fren, pres, direksiyon, kriko, lift, forklift, vinç, damperli kamyon, berber koltuğu.
- **Birleşik kaplar:** kabın şekli ne olursa olsun aynı sıvının seviyesi eşitlenir. Sıvı yüksek basınçtan alçağa akar.
- **Su deposu:** depodan en aşağıdaki musluğun suyu en hızlı akar. Pascal'ın patlayan fıçı deneyi.
""",
  [(r"Bir su cenderesinde küçük pistonun alanı $10\ \text{cm}^2$, büyük pistonun alanı $500\ \text{cm}^2$'dir. Küçük pistona 40 N kuvvet uygulanırsa büyük piston en fazla kaç N'lik yükü dengeler?",
    r"$\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2} \Rightarrow \dfrac{40}{10} = \dfrac{F_2}{500} \Rightarrow F_2 = 2000\ \text{N}$.\nAlan 50 kat büyük olduğu için kuvvet de 50 kat büyür.")],
  ["Pascal: kapalı kaptaki sıvıya uygulanan basınç her yere eşit iletilir.",
   r"Hidrolik: $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$",
   "Birleşik kaplarda aynı sıvının seviyesi eşitlenir."]),
O("k4", "3.3",
  "Açık hava basıncıyla ilgili çıkarım yapar.",
  "Makes inferences about atmospheric pressure.",
  r"""
# Açık Hava Basıncı

- Atmosferdeki gazların ağırlığından doğar ($P_0$). **Yükseldikçe azalır** (sıvının tersi: derine indikçe artar).
- Gazlar sıkıştırılabilir, havanın yoğunluğu homojen değildir.
- **Torricelli:** deniz seviyesi, 0 °C → cıva 76 cm.

$$1\ \text{atm} = 76\ \text{cmHg} \approx 1{,}013 \cdot 10^5\ \text{Pa}$$

  Borunun şekli ve eğimi sonucu değiştirmez.
- **Sıcak hava** → genleşir, hafifler, yükselir → alçak basınç · **Soğuk hava** → yoğun, çöker → yüksek basınç. Nem ↑ → yoğunluk ↓.
- **Rüzgâr:** yüksek basınçtan alçak basınca hava akışı.
- **Magdeburg deneyi** (Guericke): havası boşaltılan küreleri atlar ayıramadı.
- Yüksek dağda kulak tıkanması, nefes darlığı · yükselen balon patlar · pipetle içme.
""",
  (),
  [r"$1\ \text{atm} = 76\ \text{cmHg} \approx 1{,}013 \cdot 10^5\ \text{Pa}$",
   "Açık hava basıncı yükseldikçe azalır.",
   "Rüzgâr yüksek basınçtan alçak basınca eser."]),
O("k5", "3.4",
  "Deneyle kaldırma kuvvetinin bağlı olduğu değişkenleri analiz eder.",
  "Analyzes, through experiments, the variables the buoyant force depends on.",
  r"""
# Kaldırma Kuvveti

- Akışkanın içindeki cisme **yukarı yönde** uygulanan kuvvet. Arşimet – Kral Hiero'nun tacı ("Eureka!").

$$F_k = V_b \cdot d_s \cdot g$$

  → batan hacim ($V_b$), sıvının yoğunluğu ($d_s$) ve $g$ ile doğru orantılı.
- Cismin kendi kütlesi ve yoğunluğu formülde **doğrudan yoktur**.
- Yüklü gemi daha çok batar → daha büyük $F_k$ alır. Tuzlu suda cisim daha az batar.
- **Denizaltı:** safra tanklarına su alır → yoğunluk ↑ → dalar; hava basar → çıkar (nautilustan esinlenme = biyomimikri).
""",
  [(r"Hacminin $0{,}002\ \text{m}^3$'ü suya batmış bir cisme etki eden kaldırma kuvveti kaç N'dir? ($d_{su} = 1000\ \text{kg/m}^3$, $g = 10\ \text{m/s}^2$)",
    r"$F_k = V_b \cdot d_s \cdot g = 0{,}002 \cdot 1000 \cdot 10 = 20\ \text{N}$.")],
  [r"$F_k = V_b \cdot d_s \cdot g$",
   "Kaldırma kuvveti batan hacme ve sıvının yoğunluğuna bağlıdır; cismin kütlesine doğrudan bağlı değildir."]),
O("k6", "3.4.1",
  "Kaldırma kuvveti ile basıncı oluşturan kuvvet arasındaki ilişkiyi değerlendirir.",
  "Evaluates the relationship between the buoyant force and the force producing pressure.",
  r"""
# Kaldırma Kuvveti – Basınç Kuvveti İlişkisi

- Kaldırma kuvveti = alt yüzeye etki eden basınç kuvveti − üst yüzeye etki eden basınç kuvveti:

$$F_k = F_2 - F_1$$

  Yan yüzeylere etki eden kuvvetler birbirini dengeler.
- **Arşimet İlkesi:** Kaldırma kuvveti = cismin yerini değiştirdiği sıvının ağırlığı.

| Durum | Yoğunluk | Kuvvet |
|---|---|---|
| Yüzme | $d_{cisim} < d_{sıvı}$ | $F_k = G$ |
| Askıda kalma | $d_{cisim} = d_{sıvı}$ | $F_k = G$ |
| Batma | $d_{cisim} > d_{sıvı}$ | $F_k < G$ |

- Tamamen batmış cismin $F_k$'si **derinliğe bağlı değildir**.
- Çelik gemi yüzer: içi hava dolu → ortalama yoğunluğu sudan küçük.
- Derin deniz denizaltısı daha dayanıklı malzemeyle yapılır · dalgıcın hava kabarcığı yükseldikçe büyür.
""",
  (),
  [r"$F_k = F_{alt} - F_{üst}$",
   "Arşimet: kaldırma kuvveti = yeri değiştirilen sıvının ağırlığı.",
   r"Yüzen ve askıdaki cisimde $F_k = G$; batan cisimde $F_k < G$.",
   "Tamamen batmış cismin kaldırma kuvveti derinlikle değişmez."]),
O("k7", "3.5",
  "Akışkanın sürati ile basıncı arasındaki ilişkiyi günlük hayat örnekleriyle genelleştirir.",
  "Generalizes the relationship between a fluid's speed and pressure with everyday examples.",
  r"""
# Bernoulli İlkesi

- **Hap:** Akışkanın sürati artarsa basıncı azalır (Daniel Bernoulli).
- **Venturi tüpü:** kesit daralır → sürat ↑ → basınç ↓ → borudaki sıvı yüksekliği ↓.
- Fırtınada çatı uçar · rüzgârda şemsiye ters döner · yan yana hızlı araçlar birbirini çeker · sprey/parfüm püskürür · hortum ucu sıkılınca su uzağa gider · iki kâğıt arasına üfleyince birbirine yaklaşır.
- **Uçak kanadı:** üst yüzey bombeli → üstte hava hızlı, basınç düşük → kaldırma. Uçuşta ayrıca ağırlık, itme ve sürükleme kuvvetleri etkilidir.
- **Yarış arabası kanadı:** ters kanat → aşağı yönlü kuvvet → yol tutuş artar.
- Damar daralırsa kan hızlanır, basınç düşer (tansiyon = kan basıncı).
""",
  (),
  ["Sürat ↑ → basınç ↓ (Bernoulli).",
   "Kesit daralırsa akışkan hızlanır, basıncı düşer (Venturi).",
   "Uçak kanadı: üstte hız büyük, basınç küçük → kaldırma."]),
]})

# ---------------------------------------------------------------- 4. ÜNİTE
units.append({"id": "u4", "name": {"tr": "4. Ünite: Enerji", "en": "Unit 4: Energy"}, "outcomes": [
O("k1", "4.1",
  "İç enerji, ısı ve sıcaklık arasındaki ilişkiyi kavrar.",
  "Understands the relationship between internal energy, heat and temperature.",
  r"""
# İç Enerji, Isı ve Sıcaklık

- **Sıcaklık:** taneciklerin ortalama kinetik enerjisinin göstergesi · birim K · termometreyle ölçülür.
- **Isı:** sıcaklık farkı nedeniyle aktarılan enerji · birim J (cal) · kalorimetreyle ölçülür.
- **İç enerji:** tüm taneciklerin toplam enerjisi (kinetik + potansiyel) → madde miktarına, cinsine ve sıcaklığa bağlı.
- **Isı akışı:** sıcaktan soğuğa. Isı alanın iç enerjisi artar, verenin azalır.

> ⚠ "Vücut ısısı 39 °C" yanlış → **vücut sıcaklığı**. "Maddenin ısısı" denmez. Kovadaki suyun iç enerjisi bardaktaki sudan büyüktür (aynı sıcaklıkta).
""",
  (),
  ["Sıcaklık: ortalama kinetik enerji (K) · Isı: aktarılan enerji (J) · İç enerji: toplam enerji.",
   "Isı sıcaktan soğuğa akar.",
   "⚠ \"Vücut ısısı\" değil, vücut sıcaklığı."]),
O("k2", "4.2.1",
  "Kullanım amaçlarına göre termometre çeşitlerine örnek verir.",
  "Gives examples of thermometer types according to their purpose.",
  r"""
# Termometreler

| Termometre | Çalışma ilkesi | Kullanım |
|---|---|---|
| Sıvılı | Sıvının genleşmesi | Vücut ve oda sıcaklığı |
| Metal | Metalin genleşmesi | Fırın, termostat, yüksek sıcaklıklar |
| Gazlı | Gaz basıncının değişmesi | Çok düşük sıcaklıklar (~1 K), laboratuvar |
| Kızılötesi | Temassız ölçüm | Hastane, havalimanı, tehlikeli ortamlar |
| Dijital | Direnç değişimi | Vücut sıcaklığı (ani değişimi geç algılar) |

- Suyun donma–kaynama noktası: **0–100 °C · 32–212 °F · 273–373 K**.

$$T(\text{K}) = t(°\text{C}) + 273$$

- Fahrenheit'in bölme sayısı en fazladır (180) → hassas; bilimde Kelvin kullanılır.
""",
  [(r"Sıcaklığı 27 °C olan bir odanın sıcaklığı Kelvin cinsinden kaçtır?",
    r"$T = t + 273 = 27 + 273 = 300\ \text{K}$.")],
  [r"$T(\text{K}) = t(°\text{C}) + 273$",
   "Su: 0–100 °C · 32–212 °F · 273–373 K.",
   "Çok düşük sıcaklık → gazlı; temassız → kızılötesi termometre."]),
O("k3", "4.2.2",
  "Isı, öz ısı, ısı sığası ve sıcaklık farkı arasındaki matematiksel modele ulaşır.",
  "Arrives at the mathematical model relating heat, specific heat, heat capacity and temperature change.",
  r"""
# Öz Isı ve Isı Sığası

- **Öz ısı ($c$):** 1 kg'ın sıcaklığını 1 °C artırmak için gereken ısı → **ayırt edicidir** (cinse ve hâle bağlı).
- **Isı sığası ($C$):** maddenin tamamının sıcaklığını 1 °C artıran ısı → $C = m \cdot c$, ayırt edici **değildir**.

$$Q = m \cdot c \cdot \Delta T \qquad (\text{hâl değişimi yoksa})$$

- Eşit kütle ve eşit ısıda **öz ısısı küçük olan daha çok ısınır** (zeytinyağı sudan hızlı ısınır).
- $c_{su} = 1\ \text{cal/g·°C} \approx 4186\ \text{J/kg·°C}$ (büyük) → radyatör, kalorifer; denizler geç soğur. $c_{buz} \neq c_{su}$.
""",
  [(r"Kütlesi 2 kg olan suyun sıcaklığını 20 °C'den 50 °C'ye çıkarmak için kaç J ısı gerekir? ($c_{su} = 4186\ \text{J/kg·°C}$)",
    r"$\Delta T = 50 - 20 = 30\ °\text{C}$.\n$Q = m \cdot c \cdot \Delta T = 2 \cdot 4186 \cdot 30 = 251\,160\ \text{J} \approx 251\ \text{kJ}$.")],
  [r"$Q = m \cdot c \cdot \Delta T$ · $C = m \cdot c$",
   "Öz ısı ayırt edicidir; ısı sığası değildir.",
   "Öz ısısı küçük olan daha çabuk ısınır ve soğur."]),
O("k4", "4.3",
  "Saf maddelerin hâl değişimini etkileyen nitelikler ve gereken ısının bağlı olduğu değişkenler hakkında çıkarım yapar.",
  "Makes inferences about the factors affecting phase changes of pure substances and the variables the required heat depends on.",
  r"""
# Hâl Değişimi

- Hâl değişimi sırasında **sıcaklık sabit kalır** (grafikte yatay çizgi).

$$Q = m \cdot L$$

  → gereken ısı kütleye ve maddenin cinsine ($L$) bağlıdır. $L$ ayırt edicidir.
- $L_{erime,\ buz} \approx 334\ \text{kJ/kg}$ · $L_{buharlaşma,\ su} \approx 2260\ \text{kJ/kg}$ · erime ısısı = donma ısısı.
- **Saflık:** buza tuz → erime sıcaklığı düşer (yollara tuz) · suya tuz → kaynama sıcaklığı yükselir.
- **Basınç – erime:** erirken hacmi azalan (buz, bizmut, antimon): basınç ↑ → erime sıcaklığı ↓ (lastik altındaki kar, paten). Hacmi artan (demir, alüminyum): tersi.
- **Basınç – kaynama:** basınç ↑ → tüm maddelerde kaynama sıcaklığı ↑ (düdüklü tencere ~2 atm → ~120 °C).
- Kar yağarken hava ısınır (donan su çevreye ısı verir). Büyük buz parçası geç erir.
""",
  [(r"0 °C'deki 2 kg buzu tamamen eritmek için kaç kJ ısı gerekir? ($L_{erime} = 334\ \text{kJ/kg}$)",
    r"Hâl değişimi sırasında sıcaklık değişmez, $Q = m \cdot L$ kullanılır: $Q = 2 \cdot 334 = 668\ \text{kJ}$.")],
  [r"$Q = m \cdot L$; hâl değişiminde sıcaklık sabittir.",
   "Basınç artarsa kaynama sıcaklığı artar (düdüklü tencere).",
   "Buza tuz → erime sıcaklığı düşer; suya tuz → kaynama sıcaklığı yükselir."]),
O("k5", "4.4",
  "Isıl denge durumuyla ilgili araştırma ve bilimsel gözlem yapar.",
  "Conducts research and scientific observation on thermal equilibrium.",
  r"""
# Isıl Denge

- Sıcaktan soğuğa ısı akışı, sıcaklıklar eşitlenene kadar sürer. Son ortak sıcaklık = **denge sıcaklığı**.

$$Q_{verilen} = Q_{alınan} \qquad (\text{yalıtılmış ortamda})$$

- Denge sıcaklığı iki ilk sıcaklığın **arasındadır**; ısı sığası büyük olanın sıcaklığına daha yakındır.
- Kütle, madde cinsi ve ilk sıcaklıklar denge sıcaklığını etkiler.
- Termometreyle ölçüm = ısıl denge örneği. Buzdolabı, klima, ısı pompası ısıyı taşır.
""",
  [(r"40 °C'deki 300 g su ile 80 °C'deki 100 g su karıştırılıyor. Isı kaybı olmadığına göre denge sıcaklığı kaç °C olur?",
    r"$Q_{verilen} = Q_{alınan}$ ve öz ısılar aynı (ikisi de su):\n$100 \cdot (80 - T) = 300 \cdot (T - 40)$\n$8000 - 100T = 300T - 12000 \Rightarrow 400T = 20000 \Rightarrow T = 50\ °\text{C}$.\nDenge sıcaklığı, kütlesi (ısı sığası) büyük olan suyun sıcaklığına daha yakındır.")],
  [r"$Q_{verilen} = Q_{alınan}$",
   "Denge sıcaklığı iki ilk sıcaklık arasındadır; ısı sığası büyük olana yakındır."]),
O("k6", "4.5",
  "Isı aktarım yollarını sınıflandırır.",
  "Classifies the ways heat is transferred.",
  r"""
# Isı Aktarım Yolları

- **İletim:** tanecikten taneciğe titreşimle aktarım → en çok katılarda (metal kaşığın ısınması).
- **Konveksiyon:** akışkan taneciklerinin yer değiştirmesi (sürüklenme + yayılma) → sıvı ve gazlarda (sobanın odayı ısıtması). Isıtıcılar bu yüzden alta konur.
- **Işıma:** elektromanyetik dalgalarla (kızılötesi) → maddesel ortam gerekmez, boşlukta da olur (Güneş, kamp ateşi). Koyu renk daha çok soğurur.
- Mum alevinin üstü yanından daha sıcaktır (konveksiyon + ışıma).
- **Sera etkisi:** sera gazları yerden yayılan ışınımı tutar; artış → küresel ısınma.
""",
  (),
  ["İletim → katılar · Konveksiyon → sıvı ve gazlar · Işıma → boşlukta da olur.",
   "Güneş'in ısısı Dünya'ya ışımayla gelir."]),
O("k7", "4.6",
  "Katılarda ısı iletim hızını etkileyen etmenlerle ilgili çıkarım yapar.",
  "Makes inferences about the factors affecting the rate of heat conduction in solids.",
  r"""
# Isı İletim Hızı

- **Isı iletim hızı:** birim zamanda aktarılan ısı → birim J/s = W.
- Yüzey alanı ↑ → hız ↑ · sıcaklık farkı ↑ → hız ↑ · kalınlık ↑ → hız ↓ · maddenin cinsine bağlı.
- Isı iletim katsayısı büyük → **iletken** (metaller; en büyük elmas) · küçük → **yalıtkan** (hava, strafor, cam yünü, keçe, ahşap).
- **Yalıtım:** strafor/cam yünü, kalın duvar, çift cam (arada kuru, seyrek hava), termal kumaş → enerji tasarrufu.
- **İletim istenen yerler:** kalorifer peteği, tencere gövdesi metal; sapı yalıtkan.

> ⚠ Aynı ortamdaki metal bank ve ahşap bank **aynı sıcaklıktadır**; metal ısıyı hızlı ilettiği için daha soğuk/sıcak hissedilir.
""",
  (),
  ["İletim hızı: alan ve sıcaklık farkıyla artar, kalınlıkla azalır.",
   "⚠ Metal ve ahşap aynı ortamda aynı sıcaklıktadır; metal daha soğuk hissettirir."]),
]})

# ---------------------------------------------------------------- Ezber formül kartı (son kazanımın sonuna değil, ayrı not olarak 2.5.1 ve 3. ünite özetlerinde var)

out = str(pathlib.Path(__file__).resolve().parent.parent / "js/data/content/fiz-9.js")
header = """/* =========================================================
   9. Sınıf Fizik — hap bilgiler
   Kaynak: kullanıcının verdiği "9. Sınıf Fizik Hap Bilgiler" (4 ünite · 25 kazanım).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Metinler Markdown + LaTeX.
   Örnek soruların bir kısmı kaynaktaki örneklerden, diğerleri kazanımın formülünü
   uygulamak için eklendi.

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/fizik"] = """
pathlib.Path(out).write_text(header + json.dumps(units, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
n = sum(len(u["outcomes"]) for u in units)
print("units", len(units), "outcomes", n, "bytes", pathlib.Path(out).stat().st_size)
