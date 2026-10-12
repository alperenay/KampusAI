/* =========================================================
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
App.data.content["9/fizik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Fizik Bilimi ve Kariyer Keşfi",
   "en": "Unit 1: Physics and Career Exploration"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Fizik biliminin diğer disiplinlerle ilişkisini belirleyerek fizik bilimini tanımlar.",
     "en": "Defines physics by identifying its relationship with other disciplines."
    },
    "content": {
     "anlatim": "# Fizik Bilimi\n\n- **Fizik:** Evreni madde, enerji, kuvvet, uzay ve zaman ilişkileri çerçevesinde matematik ve gözlemle inceleyen yasa ve teoriler bütünü.\n- **Amacı:** Evreni ve olayları açıklamak. **Yöntemi:** deney + gözlem; **dili:** matematik.\n- Atom altı parçacıklardan galaksilere kadar her ölçeği inceler.\n- Eski Çağ'da fizik doğa felsefesi içindeydi (Aristo – *Physica*).\n- **Disiplinler iç içedir:** fotosentez (fizik + kimya + biyoloji), müzik (ses dalgaları), spor (kuvvet, hareket), coğrafya (tsunami, iklim), sanat (ışık, renk, denge).\n- **Örnekler:** gökkuşağı → ışığın kırılması · kaykay → enerji dönüşümü · GPS, LED → elektrik ve manyetizma.",
     "ornekler": [],
     "ozet": [
      "Fizik = evreni **matematik ve gözlemle** açıklayan bilim.",
      "Fizik diğer bilimlerle iç içedir (fotosentez: fizik + kimya + biyoloji)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Fizik biliminin alt dallarını belirler ve sınıflandırır.",
     "en": "Identifies and classifies the branches of physics."
    },
    "content": {
     "anlatim": "# Fizik Biliminin Alt Dalları\n\n| Alt dal | Konusu | Hap örnek |\n|---|---|---|\n| **Mekanik** | Kuvvet, hareket, enerji, denge | Bisiklet, yaprağın düşmesi, kuşun uçması |\n| **Elektromanyetizma** | Elektrik + manyetizma | Pusula, yıldırım, mıknatıs, dokunmatik ekran |\n| **Termodinamik** | Isı, sıcaklık, hâl değişimi | Isı yalıtımı, yemek pişirme, kombi |\n| **Optik** | Işık: yansıma, kırılma, renk | Gözlük, dürbün, fiber optik, gökkuşağı, serap |\n| **Katı hâl fiziği** | Kristal yapılı katılar, yarı iletkenler | LCD, nanoteknoloji, maglev tren, şarjlı pil |\n| **Atom fiziği** | Atomun yapısı, elektron dizilimi, enerji seviyeleri | Lazer, elektron mikroskobu, 3D yazıcı |\n| **Nükleer fizik** | Çekirdek ve çekirdek tepkimeleri | Nükleer santral, BT, C‑14 yaş tayini |\n| **Yüksek enerji ve plazma** | Atom altı parçacıklar, plazma (4. hâl) | Neon/floresan lamba, kutup ışıkları |\n\n> ⚠ Bir olay birden fazla alt dalla ilgili olabilir (ABS fren → mekanik + elektromanyetizma).",
     "ornekler": [],
     "ozet": [
      "8 alt dal: mekanik, elektromanyetizma, termodinamik, optik, katı hâl, atom, nükleer, yüksek enerji ve plazma.",
      "⚠ Bir olay birden çok alt dalla ilgili olabilir (ABS fren)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Fizik bilimine katkıda bulunan bilim insanlarının çalışmalarını ve deneyimlerini değerlendirir.",
     "en": "Evaluates the work and experiences of scientists who contributed to physics."
    },
    "content": {
     "anlatim": "# Fizik Bilimine Yön Verenler\n\n- **İbnülheysem:** Şüphecilik ve eleştirel düşünce; görme = ışığın cisimden göze gelmesi → optik.\n- **Hazini:** Yoğunluk ölçümleri; hassas terazinin ilk örnekleri.\n- **Newton:** Hareketin 3 yasası + kütle çekim yasası (\"devlerin omuzları\" → önceki bilgiden yararlanma).\n- **Einstein:** Özel (1905) ve Genel (1915) Görelilik, $E = m \\cdot c^2$; merak ve azim.\n- **Marie Curie:** Radyoaktivite, radyum–polonyum; fizik + kimya Nobel. **M. Goeppert Mayer:** çekirdek kabuk modeli.\n- **Faraday** (kendini yetiştirdi, deneyci) + **Maxwell** (matematiksel ifade) → iş birliği. **Hawking:** ALS'ye rağmen çalıştı.\n- **Türk bilim insanları:** Feza Gürsey, Asım Orhan Barut, Behram Kurşunoğlu.\n- **Bilim insanının özellikleri:** meraklı, sorgulayıcı, sabırlı, kararlı, azimli, açık fikirli, eleştiriye açık, objektif.",
     "ornekler": [],
     "ozet": [
      "İbnülheysem → optik (görme = ışık cisimden göze gelir).",
      "Newton → hareket yasaları + kütle çekim; Einstein → görelilik, $E = mc^2$.",
      "Faraday (deney) + Maxwell (matematik) → iş birliğinin önemi."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Bilim ve teknoloji kurumlarında fizikle ilişkili kariyer olanaklarını sorgular.",
     "en": "Questions physics-related career opportunities in science and technology institutions."
    },
    "content": {
     "anlatim": "# Fizik Bilimi ile İlgili Kariyer Keşfi\n\n- **TÜBİTAK:** AR‑GE desteği · **TENMAK:** nükleer, enerji, radyasyon · **MTA:** maden, jeoloji · **TUA:** uzay (Alper Gezeravcı) · **ASELSAN:** savunma elektroniği, MR cihazı.\n- **CERN (1954):** Büyük Hadron Çarpıştırıcısı – 27 km, yerin 100 m altında; WWW burada doğdu. **NASA / ESA:** uzay araştırmaları.\n- **Fizikle kariyer:** akademisyen, fizik öğretmeni, medikal fizik (radyoterapi, nükleer tıp), AR‑GE (savunma, enerji), bilgi teknolojileri (yazılım, yapay zekâ).\n- Kurumlarda farklı disiplinler birlikte çalışır.",
     "ornekler": [],
     "ozet": [
      "CERN: 27 km'lik Büyük Hadron Çarpıştırıcısı; WWW burada doğdu.",
      "Fizikçiler; akademi, öğretmenlik, medikal fizik, AR‑GE ve bilişimde çalışır."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Kuvvet ve Hareket",
   "en": "Unit 2: Force and Motion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Temel ve türetilmiş nicelikleri sınıflandırır.",
     "en": "Classifies fundamental and derived quantities."
    },
    "content": {
     "anlatim": "# Temel ve Türetilmiş Nicelikler\n\n- **SI** 1960'ta Paris'te kabul edildi → **7 temel nicelik**.\n- **Temel:** doğrudan ölçülür, kendi başına ifade edilir. **Türetilmiş:** temel niceliklerden matematiksel olarak elde edilir.\n\n| Temel nicelik | Birim | Ölçüm aleti |\n|---|---|---|\n| Uzunluk | m | cetvel |\n| Kütle | kg | terazi |\n| Zaman | s | kronometre |\n| Elektrik akımı | A | ampermetre |\n| Sıcaklık | K | termometre |\n| Işık şiddeti | cd | fotometre |\n| Madde miktarı | mol | – |\n\n**Hafıza:** \"U‑K‑Z‑E‑S‑I‑M\"\n\n- **Türetilmiş:** alan (m²), hacim (m³), hız (m/s), ivme (m/s²), yoğunluk (kg/m³), kuvvet ($\\text{N} = \\text{kg} \\cdot \\text{m/s}^2$), enerji (J), basınç (Pa), güç (W).\n\n> ⚠ Kütle temel, ağırlık türetilmiş (ağırlık bir kuvvettir, N). Sıcaklık temel, ısı türetilmiş.",
     "ornekler": [],
     "ozet": [
      "7 temel nicelik: **U‑K‑Z‑E‑S‑I‑M** (uzunluk, kütle, zaman, elektrik akımı, sıcaklık, ışık şiddeti, madde miktarı).",
      "⚠ Kütle temel, ağırlık türetilmiş · sıcaklık temel, ısı türetilmiş.",
      "$1\\ \\text{N} = 1\\ \\text{kg} \\cdot \\text{m/s}^2$"
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Skaler ve vektörel nicelikleri karşılaştırır.",
     "en": "Compares scalar and vector quantities."
    },
    "content": {
     "anlatim": "# Skaler ve Vektörel Nicelikler\n\n- **Skaler:** sayı + birim yeter → kütle, zaman, uzunluk, alınan yol, hacim, sıcaklık, yoğunluk, enerji, sürat, basınç.\n- **Vektörel:** sayı + birim + **yön** → kuvvet, ağırlık, hız, konum, yer değiştirme, ivme.\n- Skalerler aritmetik toplanır (3 kg + 2 kg = 5 kg); vektörlerde sonuç yöne bağlıdır (60 N ve 40 N → aynı yön **100 N**, zıt yön **20 N**).\n\n> ⚠ İki sınıflandırma bağımsızdır: enerji = türetilmiş + skaler, kuvvet = türetilmiş + vektörel.",
     "ornekler": [
      {
       "soru": "Bir cisme 60 N ve 40 N büyüklüğünde iki kuvvet uygulanıyor. Kuvvetler (a) aynı yönde, (b) zıt yönde olduğunda bileşke kuvvet kaç N olur?",
       "cozum": "(a) Aynı yönde kuvvetler toplanır: $R = 60 + 40 = 100\\ \\text{N}$ (kuvvetlerin yönünde).\n(b) Zıt yönde büyükten küçük çıkarılır: $R = 60 - 40 = 20\\ \\text{N}$ (60 N'lik kuvvetin yönünde)."
      }
     ],
     "ozet": [
      "Skaler: sayı + birim · Vektörel: sayı + birim + yön.",
      "Hız, kuvvet, ağırlık, yer değiştirme, ivme, konum → **vektörel**.",
      "⚠ Enerji türetilmiş + skaler; kuvvet türetilmiş + vektörel."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Farklı doğrultulardaki vektörlerin yön ve büyüklüklerine yönelik çıkarım yapar.",
     "en": "Makes inferences about the direction and magnitude of vectors in different directions."
    },
    "content": {
     "anlatim": "# Vektörler – Özellikleri\n\n- **Vektör** = yönlü doğru parçası (başlangıç, yön, büyüklük). Sembolde üstte ok: $\\vec{F}$.\n- **Eşit vektör:** yön ve büyüklük aynı → vektör paralel kaydırılabilir.\n- **Zıt vektör:** büyüklük aynı, yön ters → $\\vec{A} = -\\vec{B}$\n- **Sayıyla çarpım:** pozitif sayı → yön aynı · negatif sayı → yön ters · $|k| > 1$ büyür, $|k| < 1$ küçülür, $k = -1$ yalnızca yönü çevirir.",
     "ornekler": [],
     "ozet": [
      "Vektör: başlangıç + yön + büyüklük.",
      "Zıt vektör: $\\vec{A} = -\\vec{B}$ (büyüklük aynı, yön ters).",
      "Negatif sayıyla çarpım yönü çevirir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.3",
    "title": {
     "tr": "Vektörleri toplar ve bileşenlerine ayırır.",
     "en": "Adds vectors and resolves them into components."
    },
    "content": {
     "anlatim": "# Vektörler – Toplama ve Bileşenlere Ayırma\n\n- Yalnızca **aynı cins** nicelikler toplanır (hız + kuvvet ✗). Etkiyi tek başına yapan vektör = **bileşke** ($\\vec{R}$).\n- **Uç uca ekleme:** 2. vektörün başlangıcı 1.nin bitişine → ilk başlangıçtan son bitişe çizilen vektör = $\\vec{R}$. Çok sayıda vektör için uygundur. Kapalı şekil → $R = 0$.\n- **Paralelkenar:** iki vektörün başlangıçları birleştirilir → uçlardan paraleller çizilir → köşegen = $\\vec{R}$.\n- **Bileşenlere ayırma:** vektör orijine taşınır, uçtan eksenlere paralel çizilir → $\\vec{A} = \\vec{A}_x + \\vec{A}_y$. x'ler kendi, y'ler kendi arasında toplanır.\n- Toplamanın sırası önemsiz: $\\vec{A} + \\vec{B} = \\vec{B} + \\vec{A}$. Üç yöntem de aynı sonucu verir.\n- **Çıkarma:** $\\vec{K} - \\vec{L} = \\vec{K} + (-\\vec{L})$",
     "ornekler": [],
     "ozet": [
      "Uç uca ekleme · paralelkenar · bileşenler → hepsi aynı bileşkeyi verir.",
      "Kapalı şekil oluşturan vektörlerin bileşkesi sıfırdır.",
      "$\\vec{K} - \\vec{L} = \\vec{K} + (-\\vec{L})$"
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.4",
    "title": {
     "tr": "Doğadaki temel kuvvetleri karşılaştırır.",
     "en": "Compares the fundamental forces of nature."
    },
    "content": {
     "anlatim": "# Doğadaki Temel Kuvvetler\n\n| Kuvvet | Görevi | Menzil | Örnek |\n|---|---|---|---|\n| **Güçlü nükleer** (en güçlü) | Proton–nötronu bir arada tutar | Çekirdek içi | Çekirdeğin dağılmaması, Güneş'te H → He |\n| **Elektromanyetik** | Yükler ve mıknatıslar arası itme–çekme | Sonsuz | Pusula, şimşek, tarağın kâğıdı çekmesi |\n| **Zayıf nükleer** | Çekirdeği kararsız yapar, parçacık dönüşümü | Çok kısa | Radyoaktif bozunma, C‑14 → N, uranyumun parçalanması |\n| **Kütle çekim** (en zayıf) | Kütleler arası çekme; ağırlığın sebebi | Sonsuz | Gezegen yörüngeleri, gelgit, elmanın düşmesi |\n\n- **Kuvvet:** harekete geçiren, hızlandıran, yavaşlatan, yön veya şekil değiştiren etki (N).\n- **Abdüsselam:** zayıf + elektromanyetik kuvvetin birleşimi (1979 Nobel).",
     "ornekler": [],
     "ozet": [
      "Güç sırası: güçlü nükleer > elektromanyetik > zayıf nükleer > kütle çekim.",
      "Sonsuz menzilli: elektromanyetik ve kütle çekim.",
      "Radyoaktif bozunma → zayıf nükleer kuvvet."
     ]
    }
   },
   {
    "id": "k6",
    "code": "2.5.1",
    "title": {
     "tr": "Hareketin temel kavramlarını tanımlar, bunlarla ilgili akıl yürütür.",
     "en": "Defines the basic concepts of motion and reasons about them."
    },
    "content": {
     "anlatim": "# Hareketin Temel Kavramları\n\n| Kavram | Hap tanım | Tür |\n|---|---|---|\n| Referans noktası | Hareketsiz kabul edilen başlangıç noktası | – |\n| Konum ($\\vec{x}$) | Referansa göre bulunulan yer | Vektörel |\n| Alınan yol | Gidilen yörüngenin uzunluğu | Skaler |\n| Yer değiştirme ($\\Delta\\vec{x}$) | İlk konumdan son konuma yönlü uzaklık: $\\Delta\\vec{x} = \\vec{x}_{son} - \\vec{x}_{ilk}$ | Vektörel |\n| Sürat / ortalama sürat | alınan yol ÷ süre · anlık sürat = anlık hızın büyüklüğü | Skaler |\n| Hız / ortalama hız | yer değiştirme ÷ süre · anlık hız = o andaki hız | Vektörel |\n| İvme ($\\vec{a}$) | $a = \\Delta\\upsilon / \\Delta t$ (m/s²) | Vektörel |\n\n$$\\text{ortalama sürat} = \\frac{\\text{alınan yol}}{\\Delta t} \\qquad \\vec{\\upsilon}_{ort} = \\frac{\\Delta\\vec{x}}{\\Delta t} \\qquad a = \\frac{\\Delta \\upsilon}{\\Delta t}$$\n\n- Başladığı yere dönen cisim: yer değiştirme = 0, ortalama hız = 0, ama alınan yol ≠ 0.\n- Doğrusal ve yön değiştirmeyen harekette: yol = yer değiştirmenin büyüklüğü, sürat = hızın büyüklüğü.\n- **Hızlanan:** $\\vec{a}$ ile $\\vec{\\upsilon}$ aynı yönde · **Yavaşlayan:** zıt yönde.",
     "ornekler": [
      {
       "soru": "Bir öğrenci önce 80 m doğuya, sonra 60 m kuzeye yürüyor ve bu yolu toplam 40 s'de alıyor. Alınan yolu, yer değiştirmeyi, ortalama sürati ve ortalama hızın büyüklüğünü bulunuz.",
       "cozum": "Alınan yol: $80 + 60 = 140\\ \\text{m}$.\nYer değiştirme dik üçgenin hipotenüsüdür: $\\sqrt{80^2 + 60^2} = \\sqrt{10000} = 100\\ \\text{m}$ (kuzeydoğu yönünde).\nOrtalama sürat: $\\dfrac{140}{40} = 3{,}5\\ \\text{m/s}$.\nOrtalama hız: $\\dfrac{100}{40} = 2{,}5\\ \\text{m/s}$.\n⚠ Yol ve sürat skaler; yer değiştirme ve hız vektöreldir, bu yüzden değerleri farklı çıkar."
      }
     ],
     "ozet": [
      "Ortalama hız $= \\dfrac{\\text{yer değiştirme}}{t}$, ortalama sürat $= \\dfrac{\\text{alınan yol}}{t}$",
      "$a = \\dfrac{\\Delta\\upsilon}{\\Delta t}$ (m/s²)",
      "Başladığı yere dönen cisim: yer değiştirme ve ortalama hız sıfır, yol sıfır değil.",
      "Hızlanan: ivme ve hız aynı yönde; yavaşlayan: zıt yönde."
     ]
    }
   },
   {
    "id": "k7",
    "code": "2.5.2",
    "title": {
     "tr": "Hareketleri türlerine göre sınıflandırır.",
     "en": "Classifies motions by type."
    },
    "content": {
     "anlatim": "# Hareket Türleri\n\n- **Öteleme:** tüm parçalar aynı yönde eşit yer değiştirir → tren, düşen saksı, patenci, ok.\n- **Dönme:** sabit bir eksen etrafında çember çizme → fan, dönme dolap, saat akrebi, pervane.\n- **Titreşim:** denge noktası etrafında gidip gelme → gitar teli, salıncak, diyapazon, metronom.\n- **Birleşik:** öteleme + dönme → bisiklet tekerleği, yuvarlanan top, vida · öteleme + titreşim → zıplama çubuğu · dönme + titreşim → atlıkarınca.",
     "ornekler": [],
     "ozet": [
      "3 temel hareket: öteleme, dönme, titreşim.",
      "Yuvarlanan top / bisiklet tekerleği → öteleme + dönme (birleşik)."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Akışkanlar",
   "en": "Unit 3: Fluids"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Basınçla ilgili çıkarım yapar; basınca etki eden etmenleri belirler.",
     "en": "Makes inferences about pressure and identifies the factors affecting it."
    },
    "content": {
     "anlatim": "# Basınç\n\nSıvı ve gazlara **akışkan** denir.\n\n- **Basınç:** birim yüzeye dik etki eden kuvvet. Skaler, birimi $\\text{Pa} = \\text{N/m}^2$.\n\n$$P = \\frac{F}{A} \\qquad \\text{Katılar için: } P = \\frac{G}{A} = \\frac{m \\cdot g}{A}$$\n\n- Kuvvet ↑ → basınç ↑ · Yüzey alanı ↑ → basınç ↓.\n- Katılar **kuvveti** aynen iletir (çivinin ucu küçük → basınç büyük).\n- **Basıncı artır (küçük alan):** bıçak, çivi, iğne, raptiye, kazık, ekskavatör dişi.\n- **Basıncı azalt (büyük alan):** kar ayakkabısı, paletli araç, geniş lastik, fil ayağı, geniş çanta askısı.\n\n> ⚠ Cisim devrilince ağırlık (kuvvet) **değişmez**; yalnızca temas alanı ve basınç değişir.",
     "ornekler": [
      {
       "soru": "Ağırlığı 600 N olan bir kişi, toplam taban alanı $0{,}04\\ \\text{m}^2$ olan ayakkabılarla duruyor. Yere uyguladığı basınç kaç Pa'dır? Kar ayakkabısıyla temas alanı $0{,}3\\ \\text{m}^2$ olursa basınç ne olur?",
       "cozum": "$P = \\dfrac{F}{A} = \\dfrac{600}{0{,}04} = 15\\,000\\ \\text{Pa}$.\nKar ayakkabısıyla: $P = \\dfrac{600}{0{,}3} = 2\\,000\\ \\text{Pa}$. Ağırlık aynı kalır, alan büyüdüğü için basınç azalır; bu yüzden karda batmaz."
      }
     ],
     "ozet": [
      "$P = \\dfrac{F}{A}$ (Pa = N/m²)",
      "Alan küçülürse basınç artar (çivi, bıçak); alan büyürse azalır (kar ayakkabısı, palet).",
      "⚠ Devrilen cismin ağırlığı değişmez, basıncı değişir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Durgun sıvılarda basınçla ilgili çıkarım yapar.",
     "en": "Makes inferences about pressure in static liquids."
    },
    "content": {
     "anlatim": "# Sıvılarda Basınç\n\n$$P = h \\cdot d \\cdot g$$\n\n- Derinlik ($h$), sıvının yoğunluğu ($d$) ve yer çekimi ivmesi ($g$) ile **doğru orantılıdır**.\n- Sıvılar kabın tüm yüzeylerine (taban + yan) basınç uygular.\n- Basınç; kabın **şekline, taban alanına ve sıvı miktarına bağlı değildir**, yalnızca yüksekliğe bağlıdır.\n- **Basınç kuvveti:** $F = P \\cdot A = h \\cdot d \\cdot g \\cdot A$ → bu ise alana bağlıdır.\n- Barajın altı daha kalındır (derinde basınç büyük) · alttaki delikten su daha uzağa fışkırır.\n- Kutuplarda $g$ büyük → basınç büyük; Ekvator'da küçük.\n\n> ⚠ $h$ = sıvının **serbest yüzeyinden** noktaya olan **dik** uzaklıktır.",
     "ornekler": [
      {
       "soru": "Yoğunluğu $1000\\ \\text{kg/m}^3$ olan suyla dolu bir havuzun 2 m derinliğindeki bir noktada suyun basıncı kaç Pa'dır? ($g = 10\\ \\text{m/s}^2$)",
       "cozum": "$P = h \\cdot d \\cdot g = 2 \\cdot 1000 \\cdot 10 = 20\\,000\\ \\text{Pa}$.\nHavuzun genişliği ya da su miktarı sonucu değiştirmez; yalnızca derinlik önemlidir."
      }
     ],
     "ozet": [
      "$P = h \\cdot d \\cdot g$: yalnızca derinlik, yoğunluk ve $g$'ye bağlı.",
      "Basınç kuvveti $F = P \\cdot A$ alana bağlıdır.",
      "⚠ $h$, serbest yüzeyden ölçülen dik derinliktir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.2.1",
    "title": {
     "tr": "Günlük hayatta sıvı basıncının kullanımına ilişkin çıkarım yapar.",
     "en": "Makes inferences about the use of liquid pressure in daily life."
    },
    "content": {
     "anlatim": "# Sıvı Basıncının Günlük Hayatta Kullanılması\n\n- Sıvılar **sıkıştırılamaz** kabul edilir.\n- **Pascal Yasası:** Kapalı kaptaki sıvıya uygulanan basınç (değişimi) sıvının **her noktasına eşit** iletilir.\n- **Su cenderesi / hidrolik sistemler:**\n\n$$\\frac{F_1}{A_1} = \\frac{F_2}{A_2}$$\n\n  → küçük kuvvetle büyük yük kaldırılır.\n- **Örnekler:** hidrolik fren, pres, direksiyon, kriko, lift, forklift, vinç, damperli kamyon, berber koltuğu.\n- **Birleşik kaplar:** kabın şekli ne olursa olsun aynı sıvının seviyesi eşitlenir. Sıvı yüksek basınçtan alçağa akar.\n- **Su deposu:** depodan en aşağıdaki musluğun suyu en hızlı akar. Pascal'ın patlayan fıçı deneyi.",
     "ornekler": [
      {
       "soru": "Bir su cenderesinde küçük pistonun alanı $10\\ \\text{cm}^2$, büyük pistonun alanı $500\\ \\text{cm}^2$'dir. Küçük pistona 40 N kuvvet uygulanırsa büyük piston en fazla kaç N'lik yükü dengeler?",
       "cozum": "$\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2} \\Rightarrow \\dfrac{40}{10} = \\dfrac{F_2}{500} \\Rightarrow F_2 = 2000\\ \\text{N}$.\nAlan 50 kat büyük olduğu için kuvvet de 50 kat büyür."
      }
     ],
     "ozet": [
      "Pascal: kapalı kaptaki sıvıya uygulanan basınç her yere eşit iletilir.",
      "Hidrolik: $\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}$",
      "Birleşik kaplarda aynı sıvının seviyesi eşitlenir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.3",
    "title": {
     "tr": "Açık hava basıncıyla ilgili çıkarım yapar.",
     "en": "Makes inferences about atmospheric pressure."
    },
    "content": {
     "anlatim": "# Açık Hava Basıncı\n\n- Atmosferdeki gazların ağırlığından doğar ($P_0$). **Yükseldikçe azalır** (sıvının tersi: derine indikçe artar).\n- Gazlar sıkıştırılabilir, havanın yoğunluğu homojen değildir.\n- **Torricelli:** deniz seviyesi, 0 °C → cıva 76 cm.\n\n$$1\\ \\text{atm} = 76\\ \\text{cmHg} \\approx 1{,}013 \\cdot 10^5\\ \\text{Pa}$$\n\n  Borunun şekli ve eğimi sonucu değiştirmez.\n- **Sıcak hava** → genleşir, hafifler, yükselir → alçak basınç · **Soğuk hava** → yoğun, çöker → yüksek basınç. Nem ↑ → yoğunluk ↓.\n- **Rüzgâr:** yüksek basınçtan alçak basınca hava akışı.\n- **Magdeburg deneyi** (Guericke): havası boşaltılan küreleri atlar ayıramadı.\n- Yüksek dağda kulak tıkanması, nefes darlığı · yükselen balon patlar · pipetle içme.",
     "ornekler": [],
     "ozet": [
      "$1\\ \\text{atm} = 76\\ \\text{cmHg} \\approx 1{,}013 \\cdot 10^5\\ \\text{Pa}$",
      "Açık hava basıncı yükseldikçe azalır.",
      "Rüzgâr yüksek basınçtan alçak basınca eser."
     ]
    }
   },
   {
    "id": "k5",
    "code": "3.4",
    "title": {
     "tr": "Deneyle kaldırma kuvvetinin bağlı olduğu değişkenleri analiz eder.",
     "en": "Analyzes, through experiments, the variables the buoyant force depends on."
    },
    "content": {
     "anlatim": "# Kaldırma Kuvveti\n\n- Akışkanın içindeki cisme **yukarı yönde** uygulanan kuvvet. Arşimet – Kral Hiero'nun tacı (\"Eureka!\").\n\n$$F_k = V_b \\cdot d_s \\cdot g$$\n\n  → batan hacim ($V_b$), sıvının yoğunluğu ($d_s$) ve $g$ ile doğru orantılı.\n- Cismin kendi kütlesi ve yoğunluğu formülde **doğrudan yoktur**.\n- Yüklü gemi daha çok batar → daha büyük $F_k$ alır. Tuzlu suda cisim daha az batar.\n- **Denizaltı:** safra tanklarına su alır → yoğunluk ↑ → dalar; hava basar → çıkar (nautilustan esinlenme = biyomimikri).",
     "ornekler": [
      {
       "soru": "Hacminin $0{,}002\\ \\text{m}^3$'ü suya batmış bir cisme etki eden kaldırma kuvveti kaç N'dir? ($d_{su} = 1000\\ \\text{kg/m}^3$, $g = 10\\ \\text{m/s}^2$)",
       "cozum": "$F_k = V_b \\cdot d_s \\cdot g = 0{,}002 \\cdot 1000 \\cdot 10 = 20\\ \\text{N}$."
      }
     ],
     "ozet": [
      "$F_k = V_b \\cdot d_s \\cdot g$",
      "Kaldırma kuvveti batan hacme ve sıvının yoğunluğuna bağlıdır; cismin kütlesine doğrudan bağlı değildir."
     ]
    }
   },
   {
    "id": "k6",
    "code": "3.4.1",
    "title": {
     "tr": "Kaldırma kuvveti ile basıncı oluşturan kuvvet arasındaki ilişkiyi değerlendirir.",
     "en": "Evaluates the relationship between the buoyant force and the force producing pressure."
    },
    "content": {
     "anlatim": "# Kaldırma Kuvveti – Basınç Kuvveti İlişkisi\n\n- Kaldırma kuvveti = alt yüzeye etki eden basınç kuvveti − üst yüzeye etki eden basınç kuvveti:\n\n$$F_k = F_2 - F_1$$\n\n  Yan yüzeylere etki eden kuvvetler birbirini dengeler.\n- **Arşimet İlkesi:** Kaldırma kuvveti = cismin yerini değiştirdiği sıvının ağırlığı.\n\n| Durum | Yoğunluk | Kuvvet |\n|---|---|---|\n| Yüzme | $d_{cisim} < d_{sıvı}$ | $F_k = G$ |\n| Askıda kalma | $d_{cisim} = d_{sıvı}$ | $F_k = G$ |\n| Batma | $d_{cisim} > d_{sıvı}$ | $F_k < G$ |\n\n- Tamamen batmış cismin $F_k$'si **derinliğe bağlı değildir**.\n- Çelik gemi yüzer: içi hava dolu → ortalama yoğunluğu sudan küçük.\n- Derin deniz denizaltısı daha dayanıklı malzemeyle yapılır · dalgıcın hava kabarcığı yükseldikçe büyür.",
     "ornekler": [],
     "ozet": [
      "$F_k = F_{alt} - F_{üst}$",
      "Arşimet: kaldırma kuvveti = yeri değiştirilen sıvının ağırlığı.",
      "Yüzen ve askıdaki cisimde $F_k = G$; batan cisimde $F_k < G$.",
      "Tamamen batmış cismin kaldırma kuvveti derinlikle değişmez."
     ]
    }
   },
   {
    "id": "k7",
    "code": "3.5",
    "title": {
     "tr": "Akışkanın sürati ile basıncı arasındaki ilişkiyi günlük hayat örnekleriyle genelleştirir.",
     "en": "Generalizes the relationship between a fluid's speed and pressure with everyday examples."
    },
    "content": {
     "anlatim": "# Bernoulli İlkesi\n\n- **Hap:** Akışkanın sürati artarsa basıncı azalır (Daniel Bernoulli).\n- **Venturi tüpü:** kesit daralır → sürat ↑ → basınç ↓ → borudaki sıvı yüksekliği ↓.\n- Fırtınada çatı uçar · rüzgârda şemsiye ters döner · yan yana hızlı araçlar birbirini çeker · sprey/parfüm püskürür · hortum ucu sıkılınca su uzağa gider · iki kâğıt arasına üfleyince birbirine yaklaşır.\n- **Uçak kanadı:** üst yüzey bombeli → üstte hava hızlı, basınç düşük → kaldırma. Uçuşta ayrıca ağırlık, itme ve sürükleme kuvvetleri etkilidir.\n- **Yarış arabası kanadı:** ters kanat → aşağı yönlü kuvvet → yol tutuş artar.\n- Damar daralırsa kan hızlanır, basınç düşer (tansiyon = kan basıncı).",
     "ornekler": [],
     "ozet": [
      "Sürat ↑ → basınç ↓ (Bernoulli).",
      "Kesit daralırsa akışkan hızlanır, basıncı düşer (Venturi).",
      "Uçak kanadı: üstte hız büyük, basınç küçük → kaldırma."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Enerji",
   "en": "Unit 4: Energy"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "İç enerji, ısı ve sıcaklık arasındaki ilişkiyi kavrar.",
     "en": "Understands the relationship between internal energy, heat and temperature."
    },
    "content": {
     "anlatim": "# İç Enerji, Isı ve Sıcaklık\n\n- **Sıcaklık:** taneciklerin ortalama kinetik enerjisinin göstergesi · birim K · termometreyle ölçülür.\n- **Isı:** sıcaklık farkı nedeniyle aktarılan enerji · birim J (cal) · kalorimetreyle ölçülür.\n- **İç enerji:** tüm taneciklerin toplam enerjisi (kinetik + potansiyel) → madde miktarına, cinsine ve sıcaklığa bağlı.\n- **Isı akışı:** sıcaktan soğuğa. Isı alanın iç enerjisi artar, verenin azalır.\n\n> ⚠ \"Vücut ısısı 39 °C\" yanlış → **vücut sıcaklığı**. \"Maddenin ısısı\" denmez. Kovadaki suyun iç enerjisi bardaktaki sudan büyüktür (aynı sıcaklıkta).",
     "ornekler": [],
     "ozet": [
      "Sıcaklık: ortalama kinetik enerji (K) · Isı: aktarılan enerji (J) · İç enerji: toplam enerji.",
      "Isı sıcaktan soğuğa akar.",
      "⚠ \"Vücut ısısı\" değil, vücut sıcaklığı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2.1",
    "title": {
     "tr": "Kullanım amaçlarına göre termometre çeşitlerine örnek verir.",
     "en": "Gives examples of thermometer types according to their purpose."
    },
    "content": {
     "anlatim": "# Termometreler\n\n| Termometre | Çalışma ilkesi | Kullanım |\n|---|---|---|\n| Sıvılı | Sıvının genleşmesi | Vücut ve oda sıcaklığı |\n| Metal | Metalin genleşmesi | Fırın, termostat, yüksek sıcaklıklar |\n| Gazlı | Gaz basıncının değişmesi | Çok düşük sıcaklıklar (~1 K), laboratuvar |\n| Kızılötesi | Temassız ölçüm | Hastane, havalimanı, tehlikeli ortamlar |\n| Dijital | Direnç değişimi | Vücut sıcaklığı (ani değişimi geç algılar) |\n\n- Suyun donma–kaynama noktası: **0–100 °C · 32–212 °F · 273–373 K**.\n\n$$T(\\text{K}) = t(°\\text{C}) + 273$$\n\n- Fahrenheit'in bölme sayısı en fazladır (180) → hassas; bilimde Kelvin kullanılır.",
     "ornekler": [
      {
       "soru": "Sıcaklığı 27 °C olan bir odanın sıcaklığı Kelvin cinsinden kaçtır?",
       "cozum": "$T = t + 273 = 27 + 273 = 300\\ \\text{K}$."
      }
     ],
     "ozet": [
      "$T(\\text{K}) = t(°\\text{C}) + 273$",
      "Su: 0–100 °C · 32–212 °F · 273–373 K.",
      "Çok düşük sıcaklık → gazlı; temassız → kızılötesi termometre."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.2.2",
    "title": {
     "tr": "Isı, öz ısı, ısı sığası ve sıcaklık farkı arasındaki matematiksel modele ulaşır.",
     "en": "Arrives at the mathematical model relating heat, specific heat, heat capacity and temperature change."
    },
    "content": {
     "anlatim": "# Öz Isı ve Isı Sığası\n\n- **Öz ısı ($c$):** 1 kg'ın sıcaklığını 1 °C artırmak için gereken ısı → **ayırt edicidir** (cinse ve hâle bağlı).\n- **Isı sığası ($C$):** maddenin tamamının sıcaklığını 1 °C artıran ısı → $C = m \\cdot c$, ayırt edici **değildir**.\n\n$$Q = m \\cdot c \\cdot \\Delta T \\qquad (\\text{hâl değişimi yoksa})$$\n\n- Eşit kütle ve eşit ısıda **öz ısısı küçük olan daha çok ısınır** (zeytinyağı sudan hızlı ısınır).\n- $c_{su} = 1\\ \\text{cal/g·°C} \\approx 4186\\ \\text{J/kg·°C}$ (büyük) → radyatör, kalorifer; denizler geç soğur. $c_{buz} \\neq c_{su}$.",
     "ornekler": [
      {
       "soru": "Kütlesi 2 kg olan suyun sıcaklığını 20 °C'den 50 °C'ye çıkarmak için kaç J ısı gerekir? ($c_{su} = 4186\\ \\text{J/kg·°C}$)",
       "cozum": "$\\Delta T = 50 - 20 = 30\\ °\\text{C}$.\n$Q = m \\cdot c \\cdot \\Delta T = 2 \\cdot 4186 \\cdot 30 = 251\\,160\\ \\text{J} \\approx 251\\ \\text{kJ}$."
      }
     ],
     "ozet": [
      "$Q = m \\cdot c \\cdot \\Delta T$ · $C = m \\cdot c$",
      "Öz ısı ayırt edicidir; ısı sığası değildir.",
      "Öz ısısı küçük olan daha çabuk ısınır ve soğur."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.3",
    "title": {
     "tr": "Saf maddelerin hâl değişimini etkileyen nitelikler ve gereken ısının bağlı olduğu değişkenler hakkında çıkarım yapar.",
     "en": "Makes inferences about the factors affecting phase changes of pure substances and the variables the required heat depends on."
    },
    "content": {
     "anlatim": "# Hâl Değişimi\n\n- Hâl değişimi sırasında **sıcaklık sabit kalır** (grafikte yatay çizgi).\n\n$$Q = m \\cdot L$$\n\n  → gereken ısı kütleye ve maddenin cinsine ($L$) bağlıdır. $L$ ayırt edicidir.\n- $L_{erime,\\ buz} \\approx 334\\ \\text{kJ/kg}$ · $L_{buharlaşma,\\ su} \\approx 2260\\ \\text{kJ/kg}$ · erime ısısı = donma ısısı.\n- **Saflık:** buza tuz → erime sıcaklığı düşer (yollara tuz) · suya tuz → kaynama sıcaklığı yükselir.\n- **Basınç – erime:** erirken hacmi azalan (buz, bizmut, antimon): basınç ↑ → erime sıcaklığı ↓ (lastik altındaki kar, paten). Hacmi artan (demir, alüminyum): tersi.\n- **Basınç – kaynama:** basınç ↑ → tüm maddelerde kaynama sıcaklığı ↑ (düdüklü tencere ~2 atm → ~120 °C).\n- Kar yağarken hava ısınır (donan su çevreye ısı verir). Büyük buz parçası geç erir.",
     "ornekler": [
      {
       "soru": "0 °C'deki 2 kg buzu tamamen eritmek için kaç kJ ısı gerekir? ($L_{erime} = 334\\ \\text{kJ/kg}$)",
       "cozum": "Hâl değişimi sırasında sıcaklık değişmez, $Q = m \\cdot L$ kullanılır: $Q = 2 \\cdot 334 = 668\\ \\text{kJ}$."
      }
     ],
     "ozet": [
      "$Q = m \\cdot L$; hâl değişiminde sıcaklık sabittir.",
      "Basınç artarsa kaynama sıcaklığı artar (düdüklü tencere).",
      "Buza tuz → erime sıcaklığı düşer; suya tuz → kaynama sıcaklığı yükselir."
     ]
    }
   },
   {
    "id": "k5",
    "code": "4.4",
    "title": {
     "tr": "Isıl denge durumuyla ilgili araştırma ve bilimsel gözlem yapar.",
     "en": "Conducts research and scientific observation on thermal equilibrium."
    },
    "content": {
     "anlatim": "# Isıl Denge\n\n- Sıcaktan soğuğa ısı akışı, sıcaklıklar eşitlenene kadar sürer. Son ortak sıcaklık = **denge sıcaklığı**.\n\n$$Q_{verilen} = Q_{alınan} \\qquad (\\text{yalıtılmış ortamda})$$\n\n- Denge sıcaklığı iki ilk sıcaklığın **arasındadır**; ısı sığası büyük olanın sıcaklığına daha yakındır.\n- Kütle, madde cinsi ve ilk sıcaklıklar denge sıcaklığını etkiler.\n- Termometreyle ölçüm = ısıl denge örneği. Buzdolabı, klima, ısı pompası ısıyı taşır.",
     "ornekler": [
      {
       "soru": "40 °C'deki 300 g su ile 80 °C'deki 100 g su karıştırılıyor. Isı kaybı olmadığına göre denge sıcaklığı kaç °C olur?",
       "cozum": "$Q_{verilen} = Q_{alınan}$ ve öz ısılar aynı (ikisi de su):\n$100 \\cdot (80 - T) = 300 \\cdot (T - 40)$\n$8000 - 100T = 300T - 12000 \\Rightarrow 400T = 20000 \\Rightarrow T = 50\\ °\\text{C}$.\nDenge sıcaklığı, kütlesi (ısı sığası) büyük olan suyun sıcaklığına daha yakındır."
      }
     ],
     "ozet": [
      "$Q_{verilen} = Q_{alınan}$",
      "Denge sıcaklığı iki ilk sıcaklık arasındadır; ısı sığası büyük olana yakındır."
     ]
    }
   },
   {
    "id": "k6",
    "code": "4.5",
    "title": {
     "tr": "Isı aktarım yollarını sınıflandırır.",
     "en": "Classifies the ways heat is transferred."
    },
    "content": {
     "anlatim": "# Isı Aktarım Yolları\n\n- **İletim:** tanecikten taneciğe titreşimle aktarım → en çok katılarda (metal kaşığın ısınması).\n- **Konveksiyon:** akışkan taneciklerinin yer değiştirmesi (sürüklenme + yayılma) → sıvı ve gazlarda (sobanın odayı ısıtması). Isıtıcılar bu yüzden alta konur.\n- **Işıma:** elektromanyetik dalgalarla (kızılötesi) → maddesel ortam gerekmez, boşlukta da olur (Güneş, kamp ateşi). Koyu renk daha çok soğurur.\n- Mum alevinin üstü yanından daha sıcaktır (konveksiyon + ışıma).\n- **Sera etkisi:** sera gazları yerden yayılan ışınımı tutar; artış → küresel ısınma.",
     "ornekler": [],
     "ozet": [
      "İletim → katılar · Konveksiyon → sıvı ve gazlar · Işıma → boşlukta da olur.",
      "Güneş'in ısısı Dünya'ya ışımayla gelir."
     ]
    }
   },
   {
    "id": "k7",
    "code": "4.6",
    "title": {
     "tr": "Katılarda ısı iletim hızını etkileyen etmenlerle ilgili çıkarım yapar.",
     "en": "Makes inferences about the factors affecting the rate of heat conduction in solids."
    },
    "content": {
     "anlatim": "# Isı İletim Hızı\n\n- **Isı iletim hızı:** birim zamanda aktarılan ısı → birim J/s = W.\n- Yüzey alanı ↑ → hız ↑ · sıcaklık farkı ↑ → hız ↑ · kalınlık ↑ → hız ↓ · maddenin cinsine bağlı.\n- Isı iletim katsayısı büyük → **iletken** (metaller; en büyük elmas) · küçük → **yalıtkan** (hava, strafor, cam yünü, keçe, ahşap).\n- **Yalıtım:** strafor/cam yünü, kalın duvar, çift cam (arada kuru, seyrek hava), termal kumaş → enerji tasarrufu.\n- **İletim istenen yerler:** kalorifer peteği, tencere gövdesi metal; sapı yalıtkan.\n\n> ⚠ Aynı ortamdaki metal bank ve ahşap bank **aynı sıcaklıktadır**; metal ısıyı hızlı ilettiği için daha soğuk/sıcak hissedilir.",
     "ornekler": [],
     "ozet": [
      "İletim hızı: alan ve sıcaklık farkıyla artar, kalınlıkla azalır.",
      "⚠ Metal ve ahşap aynı ortamda aynı sıcaklıktadır; metal daha soğuk hissettirir."
     ]
    }
   }
  ]
 }
];
