/* =========================================================
   12. Sınıf Fizik — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Fizik 12 Detaylı Konu Anlatım Notları" (6 ünite).
   Kaynak notlar formül listesi düzeyinde olduğu için her ünite ders kitabı düzeyinde genişletildi (eylemsizlik momenti tablosu, uydu hareketi, BHH enerji ve konum tablosu, Young deneyi, radyoaktivite ve görelilik formülleri, çözümlü örnekler).
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/fizik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Çembersel Hareket",
   "en": "Unit 1: Circular Motion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Düzgün çembersel hareket ve virajda emniyetli dönüş",
     "en": "Uniform circular motion and safe turning"
    },
    "content": {
     "anlatim": "# Temel Büyüklükler\n\n| Büyüklük | Formül |\n|---|---|\n| Periyot, frekans | $T$, $f = 1/T$ |\n| Çizgisel hız | $v = \\dfrac{2\\pi r}{T} = \\omega r$ |\n| Açısal hız | $\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$ (rad/s) |\n| Merkezcil ivme | $a_m = \\dfrac{v^2}{r} = \\omega^2 r = \\dfrac{4\\pi^2 r}{T^2}$ |\n| Merkezcil kuvvet | $F_m = \\dfrac{mv^2}{r} = m\\omega^2 r$ |\n\nHızın büyüklüğü sabit, **yönü sürekli değişir** → ivme **merkeze** doğrudur. Merkezcil kuvvet, cisme etki eden kuvvetlerin merkeze doğru **bileşkesidir** (gerilme, sürtünme, çekim, normal kuvvet).\n\n# Yatay Virajda Dönüş\n\nMerkezcil kuvveti **sürtünme** sağlar:\n$$\\mu mg \\ge \\frac{mv^2}{r} \\Rightarrow v_{max} = \\sqrt{\\mu g r}$$\nIslak ya da buzlu yolda $\\mu$ küçüldüğünden güvenli hız azalır.\n\n# Eğimli (Banketli) Virajda Dönüş\n\nSürtünmesiz ideal durumda normal kuvvetin yatay bileşeni merkezcil kuvveti sağlar:\n$$\\tan\\theta = \\frac{v^2}{rg}$$\nBu hızda araç sürtünmeye ihtiyaç duymadan döner.\n\n# Düşey Düzlemde Çembersel Hareket\n\n- İpe bağlı cisim en **tepede**: $T + mg = \\dfrac{mv^2}{r}$ → ipin gergin kalması için $v_{min} = \\sqrt{gr}$.\n- En **altta**: $T - mg = \\dfrac{mv^2}{r}$ → gerilme en büyüktür.\n- Lunapark trenlerinin tepedeki en küçük hızı da $\\sqrt{gr}$'dir.",
     "ornekler": [
      {
       "soru": "Yarıçapı $80$ m olan yatay virajda sürtünme katsayısı $0{,}5$ ise araç en fazla kaç km/sa ile dönebilir?",
       "cozum": "$v = \\sqrt{0{,}5 \\cdot 10 \\cdot 80} = 20$ m/s $= 72$ km/sa."
      },
      {
       "soru": "$1$ m uzunluğundaki iple düşey düzlemde döndürülen cismin tepede ipin gevşememesi için en küçük hızı?",
       "cozum": "$v_{min} = \\sqrt{gr} = \\sqrt{10} \\approx 3{,}2$ m/s."
      }
     ],
     "ozet": [
      "$a=v^2/r=\\omega^2r$; merkezcil kuvvet bileşke kuvvettir.",
      "Yatay viraj $v_{max}=\\sqrt{\\mu gr}$; banketli $\\tan\\theta=v^2/rg$.",
      "Düşey çember tepesi $v_{min}=\\sqrt{gr}$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Dönerek öteleme, eylemsizlik momenti ve açısal momentum",
     "en": "Rolling motion, moment of inertia and angular momentum"
    },
    "content": {
     "anlatim": "# Eylemsizlik Momenti\n\nCismin dönme hareketindeki değişime karşı gösterdiği direnç (kütlenin dönmedeki karşılığı):\n$$I = \\sum m_i r_i^2 \\quad (\\text{kg·m}^2)$$\nKütlenin dönme eksenine **ne kadar uzak** dağıldığına bağlıdır.\n\n| Cisim (merkezden geçen eksen) | $I$ |\n|---|---|\n| İnce çember | $mr^2$ |\n| Dolu disk / silindir | $\\tfrac12 mr^2$ |\n| Dolu küre | $\\tfrac25 mr^2$ |\n| Çubuk (orta noktadan) | $\\tfrac1{12}mL^2$ |\n\n# Dönme ve Öteleme Kinetik Enerjisi\n\n$$E_k = \\tfrac12 mv_{km}^2 + \\tfrac12 I\\omega^2 \\qquad \\text{kaymadan yuvarlanmada } v = \\omega r$$\nEğik düzlemden **kaymadan** yuvarlanan cisimlerde potansiyel enerji hem ötelemeye hem dönmeye paylaşılır → $I$'si küçük olan (küre) **daha hızlı** iner: küre > disk > çember.\n\n# Tork ve Açısal Momentum\n\n- **Tork:** $\\tau = rF\\sin\\theta$; dönmeyi değiştiren etki. $\\tau_{net} = I\\alpha$.\n- **Açısal momentum:** $$L = I\\omega = mvr$$\n- $\\tau = \\dfrac{\\Delta L}{\\Delta t}$.\n- **Korunum:** Dış tork sıfırsa $L$ sabittir: $I_1\\omega_1 = I_2\\omega_2$.\n  - **Buz patencisi** kollarını kapatınca $I$ azalır, $\\omega$ artar (daha hızlı döner).\n  - Gezegenler Güneş'e yaklaşınca hızlanır.\n  - **Jiroskop** ve dönen tekerlek yönünü korur (bisiklet dengesi).",
     "ornekler": [
      {
       "soru": "Buz patencisi kollarını kapatarak eylemsizlik momentini yarıya indirirse açısal hızı nasıl değişir?",
       "cozum": "$L$ korunur: $I\\omega = \\frac{I}{2}\\omega' \\Rightarrow \\omega' = 2\\omega$ → **iki katına** çıkar."
      }
     ],
     "ozet": [
      "$I=\\sum mr^2$: kütle eksenden uzaksa büyük.",
      "$E_k=\\frac12mv^2+\\frac12I\\omega^2$.",
      "Dış tork yoksa $L=I\\omega$ korunur."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Kütle çekimi ve Kepler kanunları",
     "en": "Gravitation and Kepler's laws"
    },
    "content": {
     "anlatim": "# Newton'ın Evrensel Kütle Çekim Yasası\n\n$$F = G\\frac{m_1 m_2}{r^2} \\qquad G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$$\n- Çekim **alanı (ivmesi)**: $g = \\dfrac{GM}{r^2}$. Yüzeyden yükseldikçe azalır.\n- **Kütle çekim potansiyel enerjisi:** $U = -\\dfrac{GMm}{r}$ (sonsuzda sıfır).\n- **Kurtulma hızı:** $v_k = \\sqrt{\\dfrac{2GM}{R}}$ (Dünya için ≈ 11,2 km/s).\n\n# Uydu Hareketi\n\nMerkezcil kuvveti çekim sağlar: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r} \\Rightarrow v = \\sqrt{\\dfrac{GM}{r}}$.\n- Uydu hızı **kütlesinden bağımsızdır**; yörünge yarıçapı büyüdükçe hız azalır, periyot artar.\n- **Yer eş zamanlı (geostatik)** uydu: periyodu 24 saat, ekvator üzerinde ~36 000 km yükseklikte.\n- Uydudaki astronotun \"ağırlıksız\" hissetmesi: astronot ve uydu birlikte **serbest düşme** hâlindedir.\n\n# Kepler Kanunları\n\n1. **Yörüngeler yasası:** Gezegenler Güneş etrafında **elips** yörüngelerde döner; Güneş odaklardan birindedir.\n2. **Alanlar yasası:** Gezegeni Güneş'e bağlayan doğru **eşit zamanlarda eşit alanlar** tarar → Güneş'e yakınken (**günberi**) **hızlı**, uzakken (günöte) **yavaş** (açısal momentumun korunumu).\n3. **Periyotlar yasası:** $$\\frac{T^2}{a^3} = \\text{sabit}$$ ($a$: yörüngenin yarı büyük ekseni).",
     "ornekler": [
      {
       "soru": "Bir gezegenin Güneş'e ortalama uzaklığı Dünya'nınkinin 4 katı ise periyodu kaç yıldır?",
       "cozum": "$\\frac{T^2}{a^3}$ sabit: $T^2 = 4^3 = 64 \\Rightarrow T = 8$ yıl."
      },
      {
       "soru": "Yerden yüksekliği Dünya yarıçapına eşit bir noktada çekim ivmesi yüzeydekinin kaçta kaçıdır?",
       "cozum": "$r = 2R$ → $g' = \\frac{GM}{4R^2} = \\frac{g}{4}$."
      }
     ],
     "ozet": [
      "$F=Gm_1m_2/r^2$; $U=-GMm/r$.",
      "Uydu hızı $\\sqrt{GM/r}$, kütleden bağımsız.",
      "Kepler: elips, eşit alan, $T^2/a^3$ sabit."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Kütle çekim potansiyel enerjisi, kaçış hızı ve uydular",
     "en": "Gravitational potential energy, escape velocity and satellites"
    },
    "content": {
     "anlatim": "# Kütle Çekim Kuvveti ve Alanı\n\n$$F = G\\frac{m_1m_2}{r^2}, \\qquad g = G\\frac{M}{r^2}, \\qquad G = 6{,}67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$$\nYerden yükseldikçe ($r = R + h$) çekim ivmesi azalır.\n\n# Kütle Çekim Potansiyel Enerjisi\n\nSonsuzdaki potansiyel enerji **sıfır** kabul edilir:\n$$E_p = -G\\frac{Mm}{r}$$\n- Negatif işaret, cismin **bağlı** olduğunu gösterir. $mgh$ ifadesi yalnızca yeryüzüne yakın yüksekliklerde geçerlidir.\n\n# Uydu Hareketi\n\nÇekim kuvveti merkezcil kuvveti sağlar:\n$$\\frac{GMm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v_{yörünge} = \\sqrt{\\frac{GM}{r}}$$\n- Periyot: $T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}$ (Kepler'in 3. yasası: $T^2 \\propto r^3$)\n- Yörünge **büyüdükçe** hız **azalır**, periyot **artar**; uydunun kütlesinden **bağımsızdır**.\n- Toplam enerji: $E = -\\dfrac{GMm}{2r}$\n- **Yer eşzamanlı (geostatik) uydu:** $T = 24$ saat, ekvator düzleminde ~$36\\,000$ km yükseklik (Türksat).\n\n# Kaçış Hızı\n\nCismin gezegenin çekiminden kurtulması için gereken en küçük hız:\n$$v_{kaçış} = \\sqrt{\\frac{2GM}{R}} = \\sqrt2\\,v_{yörünge(yüzey)}$$\nDünya için ≈ **11,2 km/s**.",
     "ornekler": [
      {
       "soru": "Bir uydunun yörünge yarıçapı 4 katına çıkarılırsa hızı ve periyodu nasıl değişir?",
       "cozum": "$v \\propto \\frac{1}{\\sqrt r}$ → hız **yarıya** iner. $T \\propto r^{3/2}$ → periyot $4^{3/2} = 8$ **katına** çıkar."
      },
      {
       "soru": "Kütlesi Dünya'nın 2 katı, yarıçapı Dünya'nınkiyle aynı olan gezegende kaçış hızı Dünya'nın kaç katıdır?",
       "cozum": "$v \\propto \\sqrt{M/R}$ → $\\sqrt2$ katı (≈ 15,8 km/s)."
      }
     ],
     "ozet": [
      "$E_p = -GMm/r$ (sonsuzda sıfır).",
      "$v_{yörünge} = \\sqrt{GM/r}$; $T^2 \\propto r^3$.",
      "$v_{kaçış} = \\sqrt{2GM/R}$ ≈ 11,2 km/s (Dünya)."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Basit Harmonik Hareket",
   "en": "Unit 2: Simple Harmonic Motion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Basit harmonik hareket, yay ve basit sarkaç",
     "en": "Simple harmonic motion, spring and pendulum"
    },
    "content": {
     "anlatim": "# Tanım\n\nDenge konumundan uzaklıkla **orantılı** ve **denge konumuna doğru** (zıt yönlü) bir **geri çağırıcı kuvvet** etkisinde yapılan periyodik hareket:\n$$F = -kx$$\n\n# Konum, Hız, İvme\n\n$$x(t) = A\\cos(\\omega t + \\varphi) \\qquad v(t) = -A\\omega\\sin(\\omega t + \\varphi) \\qquad a(t) = -\\omega^2 x$$\n\n| Konum | Hız | İvme / kuvvet |\n|---|---|---|\n| **Denge** ($x = 0$) | **En büyük**: $v_{max} = A\\omega$ | **Sıfır** |\n| **Uç noktalar** ($x = \\pm A$) | **Sıfır** | **En büyük**: $a_{max} = A\\omega^2$ |\n\n**Enerji:** $E = \\tfrac12 kA^2$ sabittir; dengede tamamı kinetik, uçlarda tamamı potansiyel. Herhangi bir noktada $v = \\omega\\sqrt{A^2 - x^2}$.\n\n# Yay Sarkacı\n\n$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$\nPeriyot **genliğe ve yer çekimine bağlı değildir**; kütle artarsa artar, yay sertleşirse azalır.\n- **Seri yaylar:** $\\dfrac1{k_{eş}} = \\dfrac1{k_1} + \\dfrac1{k_2}$; **paralel:** $k_{eş} = k_1 + k_2$.\n\n# Basit Sarkaç (küçük açılarda)\n\n$$T = 2\\pi\\sqrt{\\frac{L}{g}}$$\nPeriyot **kütleye ve genliğe bağlı değildir**; ip uzunluğu ve çekim ivmesine bağlıdır. Ay'da ($g$ küçük) sarkaçlı saat **geri kalır**; yukarı ivmelenen asansörde $g_{etkin} = g + a$ → periyot kısalır.\n\n**BHH ile düzgün çembersel hareket:** Çembersel hareket yapan cismin bir çap üzerindeki izdüşümü BHH yapar.",
     "ornekler": [
      {
       "soru": "Kütlesi $0{,}4$ kg olan cisim yay sabiti $40$ N/m olan yaya bağlı. Periyot ve genlik $0{,}1$ m ise en büyük hız?",
       "cozum": "$\\omega = \\sqrt{k/m} = \\sqrt{100} = 10$ rad/s; $T = \\frac{2\\pi}{10} \\approx 0{,}63$ s. $v_{max} = A\\omega = 0{,}1 \\cdot 10 = 1$ m/s."
      },
      {
       "soru": "Bir basit sarkacın ip boyu 4 katına çıkarılırsa periyodu nasıl değişir?",
       "cozum": "$T \\propto \\sqrt{L}$ → periyot **2 katına** çıkar."
      }
     ],
     "ozet": [
      "BHH: $F=-kx$, $a=-\\omega^2x$.",
      "Dengede hız max ivme 0; uçlarda hız 0 ivme max.",
      "Yay $T=2\\pi\\sqrt{m/k}$; sarkaç $T=2\\pi\\sqrt{L/g}$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Basit harmonik harekette enerji ve grafikler",
     "en": "Energy and graphs in simple harmonic motion"
    },
    "content": {
     "anlatim": "# Konum, Hız ve İvme\n\nGenlik $A$, açısal frekans $\\omega = \\dfrac{2\\pi}{T}$:\n$$x = A\\cos(\\omega t), \\quad v = -A\\omega\\sin(\\omega t), \\quad a = -\\omega^2 x$$\n| Konum | Hız | İvme / geri çağırıcı kuvvet |\n|---|---|---|\n| **Denge noktası** ($x = 0$) | **En büyük**: $v_{maks} = A\\omega$ | **Sıfır** |\n| **Uç noktalar** ($x = \\pm A$) | **Sıfır** | **En büyük**: $a_{maks} = A\\omega^2$ |\n\n- İvme her zaman **denge noktasına** yöneliktir ve **uzanımla orantılıdır**.\n\n# Enerji\n\nSürtünmesiz ortamda toplam mekanik enerji **sabittir**:\n$$E = \\frac12 kA^2 = \\frac12 kx^2 + \\frac12 mv^2$$\n- Denge noktasında enerjinin tamamı **kinetik**, uçlarda tamamı **potansiyeldir**.\n- $x = \\dfrac{A}{\\sqrt2}$ konumunda kinetik ve potansiyel enerji **eşittir**.\n\n# Periyotlar (hatırlatma)\n\n- Yay–kütle: $T = 2\\pi\\sqrt{\\dfrac mk}$ (genlikten ve $g$'den bağımsız)\n- Basit sarkaç: $T = 2\\pi\\sqrt{\\dfrac Lg}$ (kütleden ve küçük genlikte genlikten bağımsız)\n\n# Sönümlü Hareket ve Rezonans\n\nSürtünmeyle genlik azalır (**sönüm**). Dış kuvvetin frekansı sistemin **doğal frekansına** eşit olunca genlik büyür → **rezonans** (salıncak itme, köprü titreşimleri, mikrodalga fırın).",
     "ornekler": [
      {
       "soru": "Yay sabiti $200$ N/m olan yaya bağlı cisim $0{,}1$ m genlikle titreşiyor. Toplam enerji ve $x = 0{,}05$ m'deki kinetik enerji nedir?",
       "cozum": "$E = \\frac12\\cdot200\\cdot0{,}01 = 1$ J. $E_p = \\frac12\\cdot200\\cdot0{,}0025 = 0{,}25$ J → $E_k = 0{,}75$ J."
      },
      {
       "soru": "Bir basit sarkacın boyu 4 katına çıkarılırsa periyodu nasıl değişir?",
       "cozum": "$T \\propto \\sqrt L$ → periyot **2 katına** çıkar."
      }
     ],
     "ozet": [
      "Dengede hız maksimum, ivme sıfır; uçlarda tersi.",
      "$E = \\frac12 kA^2$ sabit.",
      "Dış frekans = doğal frekans → rezonans."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Dalga Mekaniği",
   "en": "Unit 3: Wave Mechanics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Su dalgalarında kırınım ve girişim; Young deneyi",
     "en": "Diffraction and interference; Young's experiment"
    },
    "content": {
     "anlatim": "# Kırınım\n\nDalgaların bir **yarıktan** ya da **engel kenarından** geçerken bükülerek yayılması.\n- Yarık genişliği ($w$) **dalga boyuna** ($\\lambda$) yakın ya da küçükse kırınım **belirgindir**: $\\lambda$ ↑ veya $w$ ↓ → kırınım ↑.\n- **Tek yarıkta** merkezde geniş parlak saçak, yanlarda daha dar saçaklar.\n- Ses dalgaları köşeden dolaşır (λ büyük); ışığın kırınımı için çok dar yarık gerekir.\n\n# Girişim\n\nİki **eş fazlı (uyumlu)** kaynaktan çıkan dalgaların üst üste binmesi.\n- **Yapıcı girişim (dalga katarı / parlak saçak):** Yol farkı $\\Delta s = n\\lambda$.\n- **Yıkıcı girişim (düğüm / karanlık saçak):** $\\Delta s = (n - \\tfrac12)\\lambda$.\n\n# Young Çift Yarık Deneyi (1801)\n\nIşığın **dalga** doğasını kanıtladı.\n$$\\Delta x = \\frac{\\lambda L}{d}$$\n($\\Delta x$: ardışık iki parlak saçak arası, $L$: perde uzaklığı, $d$: yarıklar arası uzaklık)\n- **Kırmızı** ışıkta saçaklar mora göre **daha geniş** (λ büyük).\n- Düzenek suya daldırılırsa $\\lambda$ küçülür, saçaklar **daralır**.\n\n# İnce Zarlarda Girişim\n\nSabun köpüğü, yağ tabakası, kelebek kanatlarındaki renkler: zarın üst ve alt yüzeyinden yansıyan ışınların girişimi. **Yansıma önleyici kaplamalar** (gözlük camları) bu ilkeyle çalışır.",
     "ornekler": [
      {
       "soru": "Young deneyinde $\\lambda = 600$ nm, $d = 0{,}3$ mm, $L = 1{,}5$ m ise saçak aralığı nedir?",
       "cozum": "$\\Delta x = \\frac{600\\times10^{-9}\\cdot1{,}5}{0{,}3\\times10^{-3}} = 3\\times10^{-3}$ m $= 3$ mm."
      }
     ],
     "ozet": [
      "Kırınım: $\\lambda$ yarığa yakınsa belirgin.",
      "Yapıcı $\\Delta s=n\\lambda$, yıkıcı $(n-\\frac12)\\lambda$.",
      "Young: $\\Delta x=\\lambda L/d$; ışığın dalga doğası."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Doppler olayı ve elektromanyetik dalgalar",
     "en": "Doppler effect and electromagnetic waves"
    },
    "content": {
     "anlatim": "# Doppler Olayı\n\nKaynak ve gözlemci birbirine göre hareketliyken **algılanan frekansın** değişmesi.\n- **Yaklaşırken:** dalga boyu kısalır, frekans **artar** (ses incelir; ışıkta **maviye kayma**).\n- **Uzaklaşırken:** frekans **azalır** (ses kalınlaşır; ışıkta **kırmızıya kayma**).\n$$f' = f\\,\\frac{v \\pm v_g}{v \\mp v_k}$$\n(üst işaretler yaklaşma durumunda)\n\n**Uygulamalar:** Hız radarları, **Doppler ultrasonografi** (kan akışı), meteoroloji radarları, astronomide **galaksilerin uzaklaşması** → **evrenin genişlemesi** (Hubble).\n\n# Elektromanyetik Dalgalar\n\n- **Değişen elektrik ve manyetik alanların** birbirine dik titreşimiyle oluşur (Maxwell); **ivmeli yüklerden** yayılır.\n- **Enine** dalgadır, **boşlukta** da yayılır, hızı $c = 3\\times10^8$ m/s.\n- $c = \\lambda f$; foton enerjisi $E = hf$.\n\n# Elektromanyetik Spektrum (dalga boyu büyükten küçüğe → enerji küçükten büyüğe)\n\n| Tür | Kullanım |\n|---|---|\n| **Radyo dalgaları** | Radyo, TV, MR |\n| **Mikrodalga** | Mikrodalga fırın, radar, Wi-Fi, cep telefonu |\n| **Kızılötesi (IR)** | Isı kameraları, uzaktan kumanda, gece görüşü |\n| **Görünür ışık** | Görme (kırmızı → mor) |\n| **Morötesi (UV)** | Sterilizasyon, D vitamini; fazlası cilt kanseri |\n| **X ışınları** | Röntgen, havalimanı güvenlik |\n| **Gama ışınları** | Kanser tedavisi (radyoterapi), sterilizasyon |",
     "ornekler": [
      {
       "soru": "Uzak galaksilerin ışığındaki kırmızıya kayma neyi gösterir?",
       "cozum": "Işık kaynağı gözlemciden **uzaklaşırken** dalga boyu uzar (Doppler). Galaksilerin çoğunun kırmızıya kayması, onların bizden uzaklaştığını, yani **evrenin genişlediğini** gösterir."
      }
     ],
     "ozet": [
      "Doppler: yaklaşınca frekans artar (maviye kayma).",
      "EM dalgalar enine, boşlukta $c=3\\times10^8$ m/s.",
      "Spektrum: radyo → mikrodalga → IR → görünür → UV → X → gama."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Tek yarıkta kırınım, ince zarlarda girişim ve polarizasyon",
     "en": "Single-slit diffraction, thin-film interference and polarisation"
    },
    "content": {
     "anlatim": "# Tek Yarıkta Kırınım\n\nGenişliği $a$ olan yarıktan geçen ışık perdede **geniş merkezî aydınlık saçak** ve iki yanında daha dar saçaklar oluşturur.\n- **Karanlık saçaklar:** $a\\sin\\theta = n\\lambda$ ($n = 1, 2, \\dots$)\n- Merkezî aydınlığın genişliği, yan saçakların **2 katıdır**.\n- Yarık **daraldıkça** ya da dalga boyu **büyüdükçe** kırınım **artar** (saçaklar genişler).\n- Young deneyinden farkı: Young'da tüm aydınlık saçaklar **eşit genişlikte**, tek yarıkta merkez **geniştir**.\n\n# İnce Zarlarda Girişim\n\nSabun köpüğü, su üstündeki yağ tabakası, gözlük camlarındaki yansıtmasız kaplama: Zarın **üst ve alt yüzeylerinden** yansıyan ışınlar girişim yapar.\n- Zar kalınlığı değiştikçe farklı dalga boylarında güçlendirme olur → **renkli şeritler**.\n- **Yansıtmasız kaplama:** kalınlık $\\dfrac{\\lambda}{4n}$ seçilerek yansıyan ışınlar birbirini söndürür.\n\n# Polarizasyon\n\nElektromanyetik dalgalar **enine** olduğu için polarize edilebilir (ses dalgaları boyuna olduğundan **polarize edilemez**).\n- Polarizör, ışığın titreşimlerini **tek düzleme** indirger.\n- **Malus yasası:** $I = I_0\\cos^2\\theta$\n- Uygulamalar: polarize güneş gözlükleri (yansıma parlamasını keser), LCD ekranlar, 3B sinema gözlükleri.",
     "ornekler": [
      {
       "soru": "Tek yarıkta kırınım deneyinde yarık genişliği yarıya indirilirse merkezî aydınlık saçağın genişliği nasıl değişir?",
       "cozum": "$\\sin\\theta \\approx \\frac{\\lambda}{a}$; $a$ yarıya inince açı ve dolayısıyla merkezî saçak genişliği **2 katına** çıkar."
      },
      {
       "soru": "Polarize ışık, polarizasyon düzlemiyle $60^\\circ$ açı yapan polarizörden geçiyor. Geçen ışık şiddeti başlangıcın kaçta kaçıdır?",
       "cozum": "$I = I_0\\cos^2 60^\\circ = I_0\\cdot\\frac14$ → **1/4**."
      }
     ],
     "ozet": [
      "Tek yarık karanlık saçak: $a\\sin\\theta = n\\lambda$; merkez saçak 2 kat geniş.",
      "İnce zar girişimi sabun köpüğündeki renkleri açıklar.",
      "Yalnızca enine dalgalar polarize olur; $I = I_0\\cos^2\\theta$."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Atom Fiziğine Giriş ve Radyoaktivite",
   "en": "Unit 4: Introduction to Atomic Physics and Radioactivity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Atom modelleri, Büyük Patlama ve atom altı parçacıklar",
     "en": "Atomic models, Big Bang and subatomic particles"
    },
    "content": {
     "anlatim": "# Atom Modelleri\n\n| Model | Temel fikir | Sınırlılık |\n|---|---|---|\n| **Dalton** (1803) | Atom bölünemez katı küre | Elektronu açıklamaz |\n| **Thomson** (1897) | Elektron keşfi; pozitif küre içinde elektronlar | Çekirdek yok |\n| **Rutherford** (1911) | **Altın levha deneyi**: küçük, yoğun, pozitif **çekirdek**; atomun çoğu boşluk | İvmeli elektron ışıma yapıp çekirdeğe düşmeliydi |\n| **Bohr** (1913) | Elektron belirli **kararlı yörüngelerde** ışıma yapmadan döner; açısal momentum kuantumludur; seviye değişiminde foton: $hf = E_{üst} - E_{alt}$ | Çok elektronlu atomları açıklayamaz |\n| **Modern (kuantum)** | Elektronun yeri olasılıkla belirlenir (**orbital**); Schrödinger, Heisenberg | — |\n\n**Hidrojen enerji seviyeleri:** $E_n = -\\dfrac{13{,}6}{n^2}$ eV. İyonlaşma enerjisi 13,6 eV.\n\n# Büyük Patlama (Big Bang)\n\nEvren yaklaşık **13,8 milyar yıl** önce çok sıcak ve yoğun bir hâlden genişleyerek oluştu.\n**Kanıtlar:** galaksilerin **kırmızıya kayması** (genişleme), **kozmik mikrodalga arka plan ışıması** (1965, Penzias–Wilson), evrendeki hafif element (H, He) oranları.\n\n# Atom Altı Parçacıklar (Standart Model)\n\n- **Kuarklar:** yukarı (u), aşağı (d)… → proton (uud), nötron (udd).\n- **Leptonlar:** elektron, müon, nötrinolar.\n- **Kuvvet taşıyıcılar:** foton (elektromanyetik), gluon (güçlü), W ve Z (zayıf); **Higgs bozonu** (kütle, 2012).\n- Her parçacığın **karşıt parçacığı** vardır (pozitron).",
     "ornekler": [
      {
       "soru": "Hidrojen atomunda elektron $n = 3$'ten $n = 1$'e inerse yayılan fotonun enerjisi nedir?",
       "cozum": "$E = -\\frac{13{,}6}{9} - \\left(-13{,}6\\right) = 13{,}6\\left(1 - \\frac19\\right) \\approx 12{,}1$ eV."
      }
     ],
     "ozet": [
      "Rutherford: çekirdek; Bohr: kesikli enerji seviyeleri.",
      "$E_n=-13{,}6/n^2$ eV.",
      "Big Bang kanıtları: kırmızıya kayma, kozmik arka plan ışıması."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Radyoaktivite, fisyon, füzyon ve radyasyonun etkileri",
     "en": "Radioactivity, fission, fusion and effects of radiation"
    },
    "content": {
     "anlatim": "# Radyoaktif Bozunma\n\nKararsız çekirdeklerin kendiliğinden ışıma yaparak kararlı hâle geçmesi (Becquerel 1896, Curie'ler).\n\n| Işıma | Yapı | Çekirdekte değişim | Giricilik |\n|---|---|---|---|\n| **Alfa (α)** | $^4_2He$ | $A$ → 4 azalır, $Z$ → 2 azalır | En az (kâğıt durdurur) |\n| **Beta eksi (β⁻)** | Elektron | Nötron → proton; $Z$ 1 artar, $A$ değişmez | Orta (alüminyum levha) |\n| **Beta artı (β⁺)** | Pozitron | Proton → nötron; $Z$ 1 azalır | Orta |\n| **Gama (γ)** | Yüksek enerjili foton | $A$ ve $Z$ değişmez | **En fazla** (kalın kurşun/beton) |\n\n# Yarılanma Süresi\n\nRadyoaktif çekirdeklerin **yarısının** bozunması için geçen süre:\n$$N = N_0\\left(\\frac12\\right)^{t/T_{1/2}}$$\n**Aktivite:** Birim zamandaki bozunma sayısı (becquerel, Bq). **Karbon-14** ile yaş tayini ($T_{1/2}$ ≈ 5730 yıl).\n\n# Fisyon ve Füzyon\n\n| Fisyon | Füzyon |\n|---|---|\n| Ağır çekirdeğin (U-235) nötron çarpmasıyla **bölünmesi** | Hafif çekirdeklerin (H izotopları) **birleşmesi** |\n| **Zincirleme tepkime** | Çok yüksek sıcaklık ve basınç gerekir |\n| Nükleer santraller (Akkuyu), atom bombası | **Güneş ve yıldızların** enerjisi; ITER deneysel reaktörü |\n| Radyoaktif atık sorunu | Daha temiz, ama kontrolü zor |\n\nAçığa çıkan enerji **kütle kaybından** gelir: $E = \\Delta m\\,c^2$.\n\n# Radyasyonun Etkileri ve Korunma\n\n- **İyonlaştırıcı radyasyon** hücrelerde DNA hasarı, kanser, mutasyon yapabilir.\n- **Doz birimi:** sievert (Sv).\n- **Korunma ilkeleri:** **Süre** (kısa tut), **mesafe** (uzak dur), **zırh** (kurşun, beton).\n- **Faydalı kullanımlar:** Radyoterapi, tıbbi görüntüleme (PET), gıda sterilizasyonu, yaş tayini, endüstriyel kontrol.",
     "ornekler": [
      {
       "soru": "Yarılanma süresi 8 gün olan 160 g radyoaktif maddeden 24 gün sonra ne kadar kalır?",
       "cozum": "24 gün = 3 yarılanma: $160 \\to 80 \\to 40 \\to 20$ g."
      },
      {
       "soru": "$^{238}_{92}U$ bir alfa ışıması yapınca oluşan çekirdeğin kütle ve atom numarası nedir?",
       "cozum": "$A = 234$, $Z = 90$ → $^{234}_{90}Th$."
      }
     ],
     "ozet": [
      "α: A−4, Z−2; β⁻: Z+1; γ: değişim yok.",
      "$N=N_0(1/2)^{t/T}$; C-14 ile yaş tayini.",
      "Fisyon bölünme (santral), füzyon birleşme (Güneş); süre-mesafe-zırh."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Kütle–enerji eşdeğerliği ve çekirdek bağlanma enerjisi",
     "en": "Mass–energy equivalence and nuclear binding energy"
    },
    "content": {
     "anlatim": "# Kütle–Enerji Eşdeğerliği\n\nEinstein: kütle ve enerji birbirine dönüşebilir:\n$$E = mc^2, \\qquad c = 3\\times10^8 \\text{ m/s}$$\n- $1$ u (atomik kütle birimi) $\\approx 931{,}5$ MeV enerjiye karşılık gelir.\n\n# Kütle Eksikliği ve Bağlanma Enerjisi\n\nÇekirdeğin kütlesi, onu oluşturan **serbest proton ve nötronların** kütleleri toplamından **küçüktür**:\n$$\\Delta m = [Z\\,m_p + (A - Z)\\,m_n] - m_{çekirdek}$$\n$$E_{bağlanma} = \\Delta m\\cdot c^2$$\n- Bu enerji, çekirdeği **parçalamak için verilmesi gereken** enerjidir.\n- **Nükleon başına bağlanma enerjisi** $\\dfrac{E_b}{A}$ ne kadar büyükse çekirdek o kadar **kararlıdır**.\n\n# Bağlanma Enerjisi Eğrisi\n\n- En kararlı çekirdek **demir-56** civarı (~8,8 MeV/nükleon).\n- **Ağır çekirdekler** (uranyum) bölündüğünde (**fisyon**) ve **hafif çekirdekler** (hidrojen izotopları) birleştiğinde (**füzyon**) ürünlerin nükleon başına bağlanma enerjisi **artar** → aradaki fark **enerji** olarak açığa çıkar.\n- Güneş füzyonla, nükleer santraller fisyonla enerji üretir.\n\n# Nükleer Kuvvet\n\nProtonların elektriksel itmesini yenen **güçlü çekirdek kuvveti**; çok kısa menzilli (~$10^{-15}$ m), yükten bağımsızdır.",
     "ornekler": [
      {
       "soru": "Bir tepkimede $0{,}002$ u kütle enerjiye dönüşüyor. Açığa çıkan enerji kaç MeV'dir?",
       "cozum": "$E = 0{,}002\\cdot931{,}5 \\approx 1{,}86$ MeV."
      },
      {
       "soru": "Neden hem çok ağır çekirdeklerin bölünmesi hem de hafif çekirdeklerin birleşmesi enerji açığa çıkarır?",
       "cozum": "Her iki süreçte de ürün çekirdekler, eğrinin tepesine (demir civarı) **daha yakındır**; nükleon başına bağlanma enerjisi artar, kütle eksikliği farkı enerji olarak salınır."
      }
     ],
     "ozet": [
      "$E = mc^2$; 1 u ≈ 931,5 MeV.",
      "Bağlanma enerjisi = kütle eksikliği × c².",
      "Fe-56 en kararlı; fisyon ve füzyon enerjiyi bu eğriden alır."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Modern Fizik",
   "en": "Unit 5: Modern Physics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Özel görelilik",
     "en": "Special relativity"
    },
    "content": {
     "anlatim": "# Einstein'ın Özel Görelilik Postulatları (1905)\n\n1. Fizik yasaları tüm **eylemsiz (sabit hızlı)** gözlemciler için **aynıdır**.\n2. Işığın boşluktaki hızı ($c$) kaynağın ve gözlemcinin hareketinden **bağımsızdır**, herkes için aynıdır.\n\n**Michelson–Morley deneyi** (1887): \"Esir\" bulunamadı, ışık hızının yönden bağımsız olduğu görüldü.\n\n# Sonuçlar\n\n$$\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1$$\n| Etki | Formül | Anlam |\n|---|---|---|\n| **Zaman genişlemesi** | $\\Delta t = \\gamma\\,\\Delta t_0$ | Hareketli saat, durgun gözlemciye göre **yavaş** işler |\n| **Boy kısalması** | $L = \\dfrac{L_0}{\\gamma}$ | Hareket doğrultusundaki uzunluk **kısalır** |\n| **Kütle–enerji eşdeğerliği** | $E = mc^2$ | Kütle bir enerji biçimidir; durgun enerji $E_0 = m_0c^2$ |\n\n- Etkiler yalnızca **ışık hızına yakın** hızlarda belirgindir.\n- **Kanıtlar:** Atmosferde oluşan **müonların** yere ulaşabilmesi, uçaklardaki atom saatleri deneyleri, **GPS** uydularında göreli düzeltmeler.\n- **Eş zamanlılığın göreliliği:** Bir gözlemci için aynı anda olan iki olay, diğerine göre aynı anda olmayabilir.",
     "ornekler": [
      {
       "soru": "$0{,}6c$ hızla giden bir uzay gemisindeki saatte geçen 8 yıl, Dünya'daki gözlemciye göre kaç yıldır?",
       "cozum": "$\\gamma = \\frac{1}{\\sqrt{1-0{,}36}} = \\frac{1}{0{,}8} = 1{,}25$. $\\Delta t = 1{,}25 \\cdot 8 = 10$ yıl."
      }
     ],
     "ozet": [
      "Postulatlar: yasalar aynı; ışık hızı herkes için aynı.",
      "Zaman genişler $\\gamma\\Delta t_0$, boy kısalır $L_0/\\gamma$.",
      "$E=mc^2$; GPS ve müonlar kanıt."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Kuantum fiziğine giriş: siyah cisim, fotoelektrik, Compton, de Broglie",
     "en": "Introduction to quantum physics"
    },
    "content": {
     "anlatim": "# Siyah Cisim Işıması ve Planck\n\nSıcak cisimlerin ışıması klasik fizikle açıklanamadı. **Planck (1900):** Enerji **kesikli paketler (kuantum)** hâlinde yayılır: $E = nhf$. **Wien:** Sıcaklık arttıkça ışımanın en şiddetli olduğu dalga boyu kısalır (kızgın demir kırmızıdan beyaza).\n\n# Fotoelektrik Olay\n\n$$hf = W_0 + E_{k,max} \\qquad E_{k,max} = eV_k$$\n- $f < f_0$ (eşik frekansı) ise **şiddet ne olursa olsun** elektron sökülmez.\n- Işık **şiddeti** → sökülen elektron **sayısı** (akım); **frekans** → elektronların **maksimum kinetik enerjisi**.\n- $E_{k,max}$–$f$ grafiği eğimi **Planck sabitini** ($h$) verir.\n→ Işığın **tanecik (foton)** doğası (Einstein, 1905).\n\n# Compton Saçılması (1923)\n\nX ışını fotonları elektronlarla çarpışınca foton enerji ve momentum kaybeder → saçılan fotonun **dalga boyu artar**. Fotonun **momentumu** vardır: $p = \\dfrac{h}{\\lambda}$. Esnek çarpışma gibi enerji ve momentum korunur.\n\n# De Broglie Hipotezi (1924)\n\nMaddenin de **dalga** özelliği vardır:\n$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$\n**Davisson–Germer deneyi** elektronların kırınım yaptığını gösterdi → **elektron mikroskobu**.\n\n# Dalga–Parçacık İkiliği\n\nIşık ve madde koşullara göre dalga ya da parçacık gibi davranır. **Heisenberg belirsizlik ilkesi:** Bir parçacığın konumu ve momentumu aynı anda kesin olarak bilinemez.",
     "ornekler": [
      {
       "soru": "Kütlesi $9{,}1\\times10^{-31}$ kg olan elektron $10^6$ m/s hızla hareket ediyor. De Broglie dalga boyu nedir? ($h = 6{,}6\\times10^{-34}$)",
       "cozum": "$\\lambda = \\frac{6{,}6\\times10^{-34}}{9{,}1\\times10^{-31}\\cdot10^6} \\approx 7{,}3\\times10^{-10}$ m (atom boyutu mertebesinde)."
      }
     ],
     "ozet": [
      "Planck: enerji kuantumlu $E=hf$.",
      "Fotoelektrik: $hf=W_0+E_k$; Compton: foton momentumu.",
      "De Broglie $\\lambda=h/mv$; dalga–parçacık ikiliği."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: Modern Fiziğin Teknolojideki Uygulamaları",
   "en": "Unit 6: Applications of Modern Physics in Technology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1",
    "title": {
     "tr": "Görüntüleme, yarı iletken, süper iletken, nanoteknoloji ve lazer",
     "en": "Imaging, semiconductors, superconductors, nanotechnology and lasers"
    },
    "content": {
     "anlatim": "# Görüntüleme Teknolojileri\n\n| Teknoloji | İlke |\n|---|---|\n| **Röntgen (X ışını)** | Dokuların X ışınını farklı soğurması |\n| **BT (tomografi)** | Farklı açılardan X ışını görüntüleri → kesit |\n| **MR** | Güçlü manyetik alan + radyo dalgaları; hidrojen çekirdeklerinin rezonansı (iyonlaştırıcı radyasyon yok) |\n| **Ultrason** | Yüksek frekanslı ses dalgalarının yansıması |\n| **PET** | Pozitron yayan izleyici + yok olma (anihilasyon) gama ışınları |\n| **LCD** | Sıvı kristallerin elektrik alanla ışığı geçirip geçirmemesi |\n| **LED / OLED** | Yarı iletkende elektron–boşluk birleşmesiyle ışık yayılması |\n| **Plazma ekran** | İyonlaşmış gazın UV ışıması ve fosfor |\n| **Dijital kamera (CCD/CMOS)** | Fotoelektrik olay |\n\n# Yarı İletkenler\n\nİletkenlikleri iletken ile yalıtkan arasındadır (silisyum, germanyum); **katkılama** ile ayarlanır.\n- **n-tipi:** Elektron fazlası (fosfor katkısı). **p-tipi:** Boşluk fazlası (bor katkısı).\n- **Diyot (p–n eklemi):** Akımı **tek yönde** geçirir → doğrultma.\n- **Transistör:** Akımı yükseltir ve anahtarlar → **bilgisayar işlemcileri**, entegre devreler.\n- **Güneş pili:** Işıkla p–n ekleminde elektrik üretimi.\n\n# Süper İletkenler\n\nBelirli **kritik sıcaklığın** altında **direnci sıfır** olan maddeler; manyetik alanı dışlar (**Meissner etkisi** → manyetik kaldırma).\n**Uygulamalar:** MR mıknatısları, **maglev** trenler, parçacık hızlandırıcılar (CERN), kayıpsız enerji iletimi.\n\n# Nanoteknoloji\n\n1–100 nm ölçeğinde malzeme tasarımı: **grafen**, karbon nanotüpler, nano ilaç taşıyıcıları, kendini temizleyen yüzeyler, daha verimli bataryalar.\n\n# Lazer\n\n**LASER:** *Light Amplification by Stimulated Emission of Radiation* — uyarılmış ışıma ile ışığın güçlendirilmesi.\n- **Tek renkli** (monokromatik), **eş fazlı** (koherent), **paralel** ve **yoğun** ışık.\n- **Uygulamalar:** Göz ameliyatları, cerrahi, **fiber optik iletişim**, barkod okuyucu, metal kesme, ölçüm (LIDAR), CD/DVD.",
     "ornekler": [
      {
       "soru": "Diyodun bir elektrik devresindeki işlevi nedir? Hangi yapıdan oluşur?",
       "cozum": "Diyot **p-tipi ve n-tipi** yarı iletkenlerin birleşmesiyle oluşan **p–n eklemidir**; akımı yalnızca **tek yönde** geçirir. Alternatif akımı doğru akıma çevirmede (**doğrultma**) kullanılır."
      }
     ],
     "ozet": [
      "MR manyetik rezonans; BT ve röntgen X ışını; ultrason ses.",
      "Yarı iletken: n ve p tipi; diyot tek yön, transistör anahtar.",
      "Süper iletken direnç sıfır; lazer tek renkli ve eş fazlı."
     ]
    }
   }
  ]
 }
];

/* KAMPUSAI ENRICHMENT 1.64 — generated by tools/apply-enrichment.mjs */
(function(){ const additions=[
  {
    "key": "12/fizik",
    "unit": "u1",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-020",
      "code": "EK.12.020",
      "title": {
        "tr": "Yuvarlanmada enerji paylaşımı",
        "en": "Energy sharing in rolling"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Yuvarlanmada enerji paylaşımı\n\nKaymadan yuvarlanmada kinetik enerji, kütle merkezinin öteleme ve merkez etrafındaki dönme enerjilerinin toplamıdır. Kaymama koşulu v=ωR’dir. Aynı yükseklikten bırakılan cisimlerin hızı eylemsizlik momentine bağlıdır. İdeal sabit yüzeyde statik sürtünme kaymama koşulunu sağlayabilir; kaymalı sürtünme kaybını otomatik varsayma.\n\n### Kontrol ederek öğren\n\nİçi dolu silindirde I=mR²/2 ise dönme/öteleme enerji oranı?\n\n**Çözüm yolu:** (Iω²/2)/(mv²/2)=1/2; v=ωR kullanılır.\n\n### Dikkat noktaları\n\n- İki enerji birlikte sayılır.\n- Kaymama v=ωR.\n- Geometri eylemsizlik momentini değiştirir.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "İçi dolu silindirde I=mR²/2 ise dönme/öteleme enerji oranı?",
            "cozum": "(Iω²/2)/(mv²/2)=1/2; v=ωR kullanılır."
          }
        ],
        "ozet": [
          "İki enerji birlikte sayılır.",
          "Kaymama v=ωR.",
          "Geometri eylemsizlik momentini değiştirir."
        ]
      }
    }
  },
  {
    "key": "12/fizik",
    "unit": "u1",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-021",
      "code": "EK.12.021",
      "title": {
        "tr": "Yörünge hızı ve kaçış hızı",
        "en": "Orbital versus escape speed"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Yörünge hızı ve kaçış hızı\n\nDairesel yörüngede çekim merkezcil ivmeyi sağlar: hız √(GM/r). r yüzeyden yükseklik değil merkezden uzaklıktır. Direnç ve diğer cisimler ihmal edilirse sonsuza sıfır son hızla kaçış için √(2GM/r) gerekir. Ağırlıksızlık çekimin yokluğu değil ortak serbest düşmedir. Bu enerji eşiği gerçek roketin yakıt ve itki sürecinin tamamını açıklamaz.\n\n### Kontrol ederek öğren\n\nAynı r’de kaçış/yörünge hız oranı?\n\n**Çözüm yolu:** √2; GM/r ortak çarpandır.\n\n### Dikkat noktaları\n\n- r merkezden ölçülür.\n- Ağırlıksızlık çekimsizlik değildir.\n- Kaçış hızı ideal enerji eşiğidir.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "Aynı r’de kaçış/yörünge hız oranı?",
            "cozum": "√2; GM/r ortak çarpandır."
          }
        ],
        "ozet": [
          "r merkezden ölçülür.",
          "Ağırlıksızlık çekimsizlik değildir.",
          "Kaçış hızı ideal enerji eşiğidir."
        ]
      }
    }
  },
  {
    "key": "12/fizik",
    "unit": "u2",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-022",
      "code": "EK.12.022",
      "title": {
        "tr": "Harmonik harekette faz ve enerji",
        "en": "Phase and energy in SHM"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Harmonik harekette faz ve enerji\n\nİdeal yayda konum ile ivme ters işaretlidir. Dengede ivme sıfır, hız büyüklüğü en büyük; uçta hız sıfırdır. Konum grafiğinin eğimi hızı verir; en büyük konumu en büyük hız sanma. Enerji genliğin karesiyle orantılıdır. Hooke yasası ve kayıpsızlık koşullarını belirt. Gerçek düzende sönüm genliği azaltır, dış periyodik kuvvet rezonansa yol açabilir.\n\n### Kontrol ederek öğren\n\nGenlik iki katına çıkarsa toplam enerji?\n\n**Çözüm yolu:** E=kA²/2 olduğundan dört katına çıkar.\n\n### Dikkat noktaları\n\n- Dengede hız en büyük.\n- Uçta hız sıfır.\n- Enerji A² ile orantılı.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "Genlik iki katına çıkarsa toplam enerji?",
            "cozum": "E=kA²/2 olduğundan dört katına çıkar."
          }
        ],
        "ozet": [
          "Dengede hız en büyük.",
          "Uçta hız sıfır.",
          "Enerji A² ile orantılı."
        ]
      }
    }
  },
  {
    "key": "12/fizik",
    "unit": "u3",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-023",
      "code": "EK.12.023",
      "title": {
        "tr": "Girişimde yol farkı ve saçak aralığı",
        "en": "Path difference and fringes"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Girişimde yol farkı ve saçak aralığı\n\nUyumlu kaynaklarda faz ilişkisi korunur. Eş fazlı iki kaynakta yol farkı tam dalga boyu katıysa yapıcı, yarım tek katıysa yıkıcı girişim olur. Young deneyinde küçük açı ve uzak ekran yaklaşımında saçak aralığı λL/d’dir. Ortam değişiminde dalga boyu değişebilir, sınırda frekans korunur. Yol farkını boyutsuz faz farkıyla aynı nicelik sanma.\n\n### Kontrol ederek öğren\n\nYarık aralığı iki katına çıkarsa saçak aralığı?\n\n**Çözüm yolu:** λ ve L sabitse yarıya iner.\n\n### Dikkat noktaları\n\n- Faz uyumu gerekir.\n- Saçak aralığı d ile ters orantılı.\n- Yol farkı uzunluk biriminde.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "Yarık aralığı iki katına çıkarsa saçak aralığı?",
            "cozum": "λ ve L sabitse yarıya iner."
          }
        ],
        "ozet": [
          "Faz uyumu gerekir.",
          "Saçak aralığı d ile ters orantılı.",
          "Yol farkı uzunluk biriminde."
        ]
      }
    }
  },
  {
    "key": "12/fizik",
    "unit": "u5",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-024",
      "code": "EK.12.024",
      "title": {
        "tr": "Fotoelektrikte eşik ve durdurma potansiyeli",
        "en": "Photoelectric threshold and stopping potential"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Fotoelektrikte eşik ve durdurma potansiyeli\n\nFotonun enerjisi hf’dir. İş fonksiyonu aşıldığında kalan enerji en büyük kinetik enerjiye dönüşür. İdeal tek fotonlu modelde eşik altındaki ışığın şiddetini artırmak elektron koparmaz. Eşik üstünde şiddet uygun koşullarda akımı artırır, en büyük kinetik enerjiyi frekans belirler. Durdurma potansiyelinin büyüklüğüyle e|V|=Kmax olur; joule ve elektronvoltu ayır.\n\n### Kontrol ederek öğren\n\nFoton 5 eV, iş fonksiyonu 2 eV ise |Vd|?\n\n**Çözüm yolu:** Kmax=3 eV, |Vd|=3 V.\n\n### Dikkat noktaları\n\n- Frekans enerjiyi belirler.\n- Şiddet foton akısını etkiler.\n- eV enerji, V potansiyel birimidir.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "Foton 5 eV, iş fonksiyonu 2 eV ise |Vd|?",
            "cozum": "Kmax=3 eV, |Vd|=3 V."
          }
        ],
        "ozet": [
          "Frekans enerjiyi belirler.",
          "Şiddet foton akısını etkiler.",
          "eV enerji, V potansiyel birimidir."
        ]
      }
    }
  },
  {
    "key": "12/fizik",
    "unit": "u4",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-025",
      "code": "EK.12.025",
      "title": {
        "tr": "Yarı ömürde etkinlik ve kalan çekirdek",
        "en": "Activity and remaining nuclei"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Yarı ömürde etkinlik ve kalan çekirdek\n\nTek çekirdeğin bozunması rastlantısal, çok sayıda çekirdeğin davranışı istatistikseldir. Her yarı ömürde başlangıçtan sabit sayı değil kalanın yarısı bozunur. Aynı izotopta etkinlik kalan kararsız çekirdek sayısıyla orantılıdır. Etkinlik, soğurulan doz ve biyolojik etki farklı niceliklerdir; Bq doğrudan Sv’ye çevrilmez. Eğitim hesabı radyasyon güvenliği kararı vermez.\n\n### Kontrol ederek öğren\n\nÜç yarı ömür sonra başlangıç etkinliğinin hangi kesri kalır?\n\n**Çözüm yolu:** (1/2)³=1/8.\n\n### Dikkat noktaları\n\n- Her adımda kalanın yarısı.\n- Bq etkinliktir, doz değildir.\n- Tek çekirdeğin anı öngörülemez.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=351)",
        "ornekler": [
          {
            "soru": "Üç yarı ömür sonra başlangıç etkinliğinin hangi kesri kalır?",
            "cozum": "(1/2)³=1/8."
          }
        ],
        "ozet": [
          "Her adımda kalanın yarısı.",
          "Bq etkinliktir, doz değildir.",
          "Tek çekirdeğin anı öngörülemez."
        ]
      }
    }
  }
]; additions.forEach(({key,unit,unitName,lesson})=>{const units=App.data.content[key];let u=units.find(x=>x.id===unit);if(!u){u={id:unit,name:{tr:unitName,en:unitName},outcomes:[]};const at=units.findIndex(x=>/^u/.test(x.id)||(/^t/.test(x.id)&&Number(x.id.slice(1))>Number(unit.slice(1))));if(at<0)units.push(u);else units.splice(at,0,u);}u.outcomes.push(lesson);}); })();
