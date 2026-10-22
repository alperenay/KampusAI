/* =========================================================
   11. Sınıf Fizik — konu anlatım notları
   Kaynak: kullanıcının verdiği "11. Sınıf Fizik Konu Anlatım Notları" (5 ünite).
   Kaynakta yalnızca Kuvvet ve Hareket ünitesi ayrıntılı, diğerleri birkaç satırlık özetti; tüm üniteler ders kitabı düzeyinde formüller, tablolar ve çözümlü örneklerle genişletildi. Enerji ünitesine itme-momentum konusu eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/fizik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Kuvvet ve Hareket",
   "en": "Unit 1: Force and Motion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Serbest düşme ve düşey atış",
     "en": "Free fall and vertical projection"
    },
    "content": {
     "anlatim": "# Serbest Düşme\n\nYalnızca **yer çekimi** etkisinde, ilk hızsız düşme (hava direnci ihmal). İvme sabittir: $g \\approx 9{,}8 \\text{ m/s}^2$ (problemlerde genellikle $10 \\text{ m/s}^2$).\n\nAşağı yön pozitif alınırsa ($v_0 = 0$):\n$$v = gt \\qquad h = \\tfrac{1}{2}gt^2 \\qquad v^2 = 2gh$$\n\n> Hava direnci yoksa düşme süresi **kütleden bağımsızdır**: tüy ve çekiç boşlukta aynı anda düşer (Apollo 15, Ay).\n\n**Ardışık saniyelerde alınan yollar** $5, 15, 25, 35\\ldots$ m (oran $1:3:5:7$).\n\n# Düşey Atışlar\n\n**Yukarı atış** (yukarı pozitif, ivme $-g$):\n$$v = v_0 - gt \\qquad h = v_0 t - \\tfrac{1}{2}gt^2 \\qquad v^2 = v_0^2 - 2gh$$\n- Tepe noktasında $v = 0$ → çıkış süresi $t_{\\text{çıkış}} = \\dfrac{v_0}{g}$, maksimum yükseklik $h_{max} = \\dfrac{v_0^2}{2g}$.\n- Hava direnci yoksa **çıkış ve iniş süreleri eşittir**; cisim atıldığı noktaya **aynı süratle** döner.\n\n**Aşağı atış:** $v = v_0 + gt$, $h = v_0t + \\tfrac12 gt^2$.\n\n| Grafik | Serbest düşme (aşağı +) |\n|---|---|\n| $v$–$t$ | Orijinden geçen eğik doğru, eğim $= g$ |\n| $h$–$t$ | Parabol |\n| $a$–$t$ | Yatay doğru ($a = g$) |",
     "ornekler": [
      {
       "soru": "Yerden $40$ m/s ile düşey yukarı atılan cisim kaç saniye havada kalır ve en fazla kaç metre yükselir? ($g=10\\text{ m/s}^2$)",
       "cozum": "Çıkış süresi $t = \\frac{40}{10} = 4$ s; toplam uçuş $2 \\cdot 4 = 8$ s. $h_{max} = \\frac{40^2}{2\\cdot10} = 80$ m."
      },
      {
       "soru": "$45$ m yükseklikten serbest bırakılan cisim kaç saniyede yere düşer, yere çarpma hızı nedir?",
       "cozum": "$45 = \\frac12 \\cdot 10 \\cdot t^2 \\Rightarrow t^2 = 9,\\ t = 3$ s. $v = gt = 30$ m/s."
      }
     ],
     "ozet": [
      "Serbest düşme: $v=gt$, $h=\\frac12gt^2$, kütleden bağımsız.",
      "Yukarı atış: $t_{çıkış}=v_0/g$, $h_{max}=v_0^2/2g$.",
      "Çıkış ve iniş süreleri eşit."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "İki boyutta hareket: yatay ve eğik atış",
     "en": "Two-dimensional motion: horizontal and oblique projection"
    },
    "content": {
     "anlatim": "# Bağımsızlık İlkesi\n\nYatay ve düşey hareketler **birbirinden bağımsızdır**. Yatayda ivme **0** (hız sabit), düşeyde ivme **$g$**.\n\n# Yatay Atış\n\nYükseklik $h$'den yatay $v_0$ hızla atılan cisim:\n$$x = v_0 t \\qquad h = \\tfrac12 g t^2 \\qquad v_y = gt$$\n- Uçuş süresi yalnızca **yüksekliğe** bağlıdır: $t = \\sqrt{2h/g}$. Aynı yükseklikten yatay atılan ve serbest bırakılan cisimler yere **aynı anda** düşer.\n- Yörünge **paraboldür**. Herhangi bir andaki hız: $v = \\sqrt{v_0^2 + v_y^2}$.\n\n# Eğik Atış\n\nYatayla $\\theta$ açısıyla $v_0$ hızıyla atılan cisim:\n$$v_{0x} = v_0\\cos\\theta \\qquad v_{0y} = v_0\\sin\\theta$$\n\n| Büyüklük | Formül |\n|---|---|\n| Tepeye çıkış süresi | $t_{ç} = \\dfrac{v_0\\sin\\theta}{g}$ |\n| Uçuş süresi | $t_u = \\dfrac{2v_0\\sin\\theta}{g}$ |\n| Maksimum yükseklik | $h_{max} = \\dfrac{v_0^2\\sin^2\\theta}{2g}$ |\n| Menzil | $R = \\dfrac{v_0^2 \\sin 2\\theta}{g}$ |\n\n- Tepe noktasında hız **yataydır** ve $v_0\\cos\\theta$'ya eşittir (sıfır değil!).\n- Maksimum menzil $\\theta = 45°$'de; **tümler açılarda** (ör. $30°$ ve $60°$) menziller **eşittir**.",
     "ornekler": [
      {
       "soru": "$80$ m yükseklikten yatay $20$ m/s hızla atılan cisim atıldığı yerden ne kadar uzağa düşer?",
       "cozum": "$t = \\sqrt{2\\cdot80/10} = 4$ s. $x = 20 \\cdot 4 = 80$ m."
      },
      {
       "soru": "$v_0 = 50$ m/s, $\\theta = 37°$ ($\\sin37=0{,}6$, $\\cos37=0{,}8$) ile atılan cismin menzili ve maksimum yüksekliği?",
       "cozum": "$v_{0x}=40$, $v_{0y}=30$ m/s. $t_u = 2\\cdot30/10 = 6$ s. $R = 40\\cdot6 = 240$ m. $h_{max} = 30^2/20 = 45$ m."
      }
     ],
     "ozet": [
      "Yatayda sabit hız, düşeyde serbest düşme.",
      "Yatay atışta süre yalnızca $h$'ye bağlı.",
      "Menzil $R=v_0^2\\sin2\\theta/g$; en büyük $45°$'de."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Newton'ın hareket yasaları",
     "en": "Newton's laws of motion"
    },
    "content": {
     "anlatim": "# Üç Yasa\n\n1. **Eylemsizlik:** Net kuvvet sıfırsa cisim durumunu korur (duruyorsa durur, sabit hızla gidiyorsa öyle gider). Otobüs aniden fren yapınca yolcuların öne savrulması.\n2. **Temel yasa:** $$\\vec{F}_{net} = m\\vec{a}$$ İvme net kuvvetle **aynı yönlü** ve doğru orantılı, kütleyle ters orantılıdır. Birim: $1\\text{ N} = 1 \\text{ kg}\\cdot\\text{m/s}^2$.\n3. **Etki–tepki:** A cismi B'ye $\\vec F$ uygularsa B de A'ya $-\\vec F$ uygular. Kuvvetler **farklı cisimlere** etki ettiği için birbirini yok etmez.\n\n# Serbest Cisim Diyagramı ve Sık Kullanılan Kuvvetler\n\n- **Ağırlık:** $G = mg$, Dünya'nın merkezine doğru.\n- **Normal kuvvet $N$:** Yüzeye dik, yüzeyin tepkisi.\n- **Gerilme $T$:** İp boyunca.\n- **Sürtünme:** Harekete (ya da hareket eğilimine) zıt.\n\n**Çözüm adımları:** Kuvvetleri çiz → bileşenlere ayır → hareket yönünde $\\sum F = ma$, dik yönde $\\sum F = 0$.\n\n# Örnek Durumlar\n\n- **Eğik düzlem (sürtünmesiz):** $a = g\\sin\\theta$; $N = mg\\cos\\theta$.\n- **Asansör:** Yukarı ivmelenirken $N = m(g + a)$ (daha ağır hissedilir); aşağı ivmelenirken $N = m(g - a)$.\n- **Makara ile bağlı cisimler:** Sistem için $a = \\dfrac{F_{net,dış}}{m_{toplam}}$.",
     "ornekler": [
      {
       "soru": "Kütleleri $2$ kg ve $3$ kg olan iki blok sürtünmesiz yatay düzlemde birbirine dokunuyor. $2$ kg'lık bloğa $20$ N yatay kuvvet uygulanıyor. İvme ve bloklar arasındaki kuvvet nedir?",
       "cozum": "$a = \\frac{20}{2+3} = 4\\text{ m/s}^2$. $3$ kg'lık bloğu iten kuvvet $F = 3 \\cdot 4 = 12$ N."
      },
      {
       "soru": "$60$ kg'lık bir kişi $2\\text{ m/s}^2$ ivmeyle yukarı hızlanan asansördeki tartıda kaç N gösterir?",
       "cozum": "$N = m(g+a) = 60(10+2) = 720$ N."
      }
     ],
     "ozet": [
      "Eylemsizlik: net kuvvet yoksa durum değişmez.",
      "$F_{net}=ma$; ivme net kuvvetle aynı yönde.",
      "Etki–tepki farklı cisimlere etki eder."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Sürtünme kuvveti",
     "en": "Friction"
    },
    "content": {
     "anlatim": "# Sürtünme Türleri\n\n- **Statik sürtünme:** Cisim **henüz hareket etmezken**; uygulanan kuvvete eşit ve zıttır, en büyük değeri: $$f_{s,max} = \\mu_s N$$\n- **Kinetik sürtünme:** Cisim **kayarken**: $$f_k = \\mu_k N$$\n- Genellikle $\\mu_s > \\mu_k$ → harekete başlatmak, hareketi sürdürmekten zordur.\n\n# Sürtünmeyi Etkileyen ve Etkilemeyen Etkenler\n\n| Etkiler | Etkilemez (ideal model) |\n|---|---|\n| Yüzeylerin cinsi ($\\mu$) | Temas yüzeyinin **alanı** |\n| **Normal kuvvet** | Hız (düşük hızlarda) |\n\n# Kuvvet–Sürtünme Grafiği\n\nUygulanan kuvvet artarken sürtünme önce kuvvete **eşit** artar (statik), $f_{s,max}$'a ulaşınca cisim harekete geçer ve sürtünme **sabit** $f_k$ değerine düşer.\n\n# Eğik Düzlemde Sürtünme\n\n$$a = g(\\sin\\theta - \\mu_k\\cos\\theta)$$\nCisim sabit hızla kayıyorsa $\\mu_k = \\tan\\theta$.",
     "ornekler": [
      {
       "soru": "$5$ kg'lık kutu yatay düzlemde ($\\mu_k = 0{,}2$) $30$ N yatay kuvvetle çekiliyor. İvmesi nedir?",
       "cozum": "$N = mg = 50$ N, $f_k = 0{,}2 \\cdot 50 = 10$ N. $F_{net} = 30 - 10 = 20$ N, $a = 20/5 = 4\\text{ m/s}^2$."
      }
     ],
     "ozet": [
      "$f_{s,max}=\\mu_sN$, $f_k=\\mu_kN$, genellikle $\\mu_s>\\mu_k$.",
      "Sürtünme yüzey alanına bağlı değildir.",
      "Eğik düzlemde $a=g(\\sin\\theta-\\mu\\cos\\theta)$."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "Hava direnci ve limit hız",
     "en": "Air resistance and terminal velocity"
    },
    "content": {
     "anlatim": "# Hava Direnci\n\nAkışkan içinde hareket eden cisme etki eden, hıza bağlı direnç kuvveti:\n$$F_d \\approx k A v^2$$\n($A$: kesit alanı, $v$: hız, $k$: şekle ve havanın yoğunluğuna bağlı sabit)\n\n# Limit (Son) Hız\n\nDüşen cisimde hız arttıkça hava direnci artar. **Hava direnci ağırlığa eşit** olduğunda net kuvvet, dolayısıyla **ivme sıfır** olur; cisim **sabit hızla** düşer:\n$$mg = kAv_L^2 \\Rightarrow v_L = \\sqrt{\\frac{mg}{kA}}$$\n\n- **Kesit alanı büyükse** limit hız **küçüktür** → paraşüt açılınca hız büyük ölçüde azalır.\n- **Kütle büyükse** limit hız büyüktür.\n\n| Aşama | Hız | İvme |\n|---|---|---|\n| Düşme başı | Küçük | $\\approx g$ |\n| Hız artarken | Artar | Azalır |\n| Limit hıza ulaşınca | Sabit | 0 |\n\n$v$–$t$ grafiği önce eğimli, sonra yatay bir eğridir.",
     "ornekler": [
      {
       "soru": "Paraşütçü paraşütünü açtığında hızı ve ivmesi nasıl değişir?",
       "cozum": "Kesit alanı büyüdüğü için hava direnci ağırlıktan **büyük** olur, net kuvvet **yukarı** yönlüdür; paraşütçü **yavaşlar**. Hız azaldıkça direnç azalır ve yeni, **daha küçük** limit hıza ulaşılır."
      }
     ],
     "ozet": [
      "Hava direnci hız ve kesit alanıyla artar.",
      "Direnç = ağırlık → ivme 0 → limit hız.",
      "Paraşüt limit hızı küçültür."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "Düzgün çembersel hareket",
     "en": "Uniform circular motion"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\nHızın **büyüklüğü sabit**, **yönü sürekli değişir** → ivme vardır (merkezcil ivme).\n\n| Büyüklük | Formül |\n|---|---|\n| Periyot $T$ | Bir tam turun süresi (s) |\n| Frekans $f$ | $f = 1/T$ (Hz) |\n| Çizgisel hız | $v = \\dfrac{2\\pi r}{T} = 2\\pi r f$ |\n| Açısal hız | $\\omega = \\dfrac{2\\pi}{T}$, $v = \\omega r$ |\n| Merkezcil ivme | $a_m = \\dfrac{v^2}{r} = \\omega^2 r$ (merkeze doğru) |\n| Merkezcil kuvvet | $F_m = \\dfrac{mv^2}{r}$ |\n\n> Merkezcil kuvvet **ayrı bir kuvvet türü değildir**; merkeze yönelen kuvvetlerin bileşkesidir: ipteki gerilme, sürtünme, kütle çekimi, normal kuvvet…\n\n# Örnekler\n\n- **Virajda dönen araç:** Merkezcil kuvveti **sürtünme** sağlar: $\\mu mg \\ge \\dfrac{mv^2}{r} \\Rightarrow v_{max} = \\sqrt{\\mu g r}$.\n- **Uydu:** Merkezcil kuvveti **kütle çekimi** sağlar.\n- **Düşey çemberin tepesi:** Cismin düşmeden dönebilmesi için $v_{min} = \\sqrt{gr}$.\n- İp koparsa cisim çembere **teğet** doğrultuda gider (eylemsizlik).",
     "ornekler": [
      {
       "soru": "$0{,}5$ kg'lık cisim $2$ m uzunluğundaki iple yatay düzlemde $4$ m/s hızla döndürülüyor. İpteki gerilme nedir?",
       "cozum": "$T = \\frac{mv^2}{r} = \\frac{0{,}5 \\cdot 16}{2} = 4$ N."
      },
      {
       "soru": "Yarıçapı $50$ m olan düz virajda $\\mu = 0{,}5$ ise araç en fazla kaç m/s hızla dönebilir?",
       "cozum": "$v_{max} = \\sqrt{\\mu g r} = \\sqrt{0{,}5\\cdot10\\cdot50} = \\sqrt{250} \\approx 15{,}8$ m/s."
      }
     ],
     "ozet": [
      "Sürat sabit, yön değişir → merkezcil ivme.",
      "$a=v^2/r=\\omega^2r$, $F=mv^2/r$.",
      "Merkezcil kuvveti gerilme, sürtünme ya da çekim sağlar."
     ]
    }
   },
   {
    "id": "k7",
    "code": "1.7",
    "title": {
     "tr": "Tork, denge ve kütle merkezi",
     "en": "Torque, equilibrium and centre of mass"
    },
    "content": {
     "anlatim": "# Tork (Kuvvet Momenti)\n\nKuvvetin bir cismi **döndürme etkisidir**:\n$$\\tau = F \\cdot d \\cdot \\sin\\theta \\quad (\\text{N·m})$$\n$d$: dönme noktasına uzaklık (**kuvvet kolu**), $\\theta$: kuvvet ile kol arasındaki açı.\n- Kuvvetin doğrultusu dönme noktasından geçerse tork **sıfırdır**.\n- Saat yönünün tersi genelde **pozitif** alınır.\n\n# Denge Şartları\n\nBir cismin **tam dengede** (ötelenmiyor ve dönmüyor) olması için:\n1. $\\sum \\vec F = 0$ (öteleme dengesi)\n2. $\\sum \\tau = 0$ (dönme dengesi) — **herhangi bir noktaya** göre.\n\n**Kaldıraç prensibi:** $F_1 \\cdot d_1 = F_2 \\cdot d_2$ (tahterevalli, makas, el arabası, cımbız).\n\n# Kütle Merkezi ve Ağırlık Merkezi\n\n- Düzgün ve türdeş cisimlerde **geometrik merkezdedir**.\n- Noktasal kütleler için:\n$$x_{km} = \\frac{m_1x_1 + m_2x_2 + \\dots}{m_1 + m_2 + \\dots}$$\n- Ağırlık merkezi **destek alanının dışına** çıkarsa cisim devrilir.\n\n# Denge Türleri\n\n| Tür | Davranış | Örnek |\n|---|---|---|\n| **Kararlı** | Bırakınca eski konumuna döner | Kâse dibindeki bilye |\n| **Kararsız** | Uzaklaşır | Tepe üstündeki bilye |\n| **Nötr** | Yeni konumda kalır | Düz zemindeki bilye |",
     "ornekler": [
      {
       "soru": "$4$ m uzunluğundaki türdeş tahterevallinin ortasından desteklendiği düşünülürse, $30$ kg'lık çocuk destekten $1{,}2$ m uzakta oturuyor. $40$ kg'lık çocuk dengede kalmak için destekten kaç m uzağa oturmalıdır?",
       "cozum": "$30\\cdot1{,}2 = 40\\cdot d \\Rightarrow d = 0{,}9$ m (karşı tarafta)."
      },
      {
       "soru": "$x = 0$'da $2$ kg, $x = 6$ m'de $4$ kg noktasal kütleler var. Kütle merkezinin konumu nedir?",
       "cozum": "$x_{km} = \\frac{2\\cdot0 + 4\\cdot6}{6} = 4$ m."
      }
     ],
     "ozet": [
      "$\\tau = F\\cdot d\\cdot\\sin\\theta$.",
      "Denge: $\\sum F = 0$ ve $\\sum\\tau = 0$.",
      "Ağırlık merkezi destek alanı dışına çıkarsa devrilme."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Enerji ve Momentum",
   "en": "Unit 2: Energy and Momentum"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "İş, enerji, güç ve enerjinin korunumu",
     "en": "Work, energy, power and conservation"
    },
    "content": {
     "anlatim": "# İş\n\n$$W = F\\,x\\cos\\theta$$\nKuvvet yer değiştirmeye **dik** ise iş yapılmaz ($\\cos 90° = 0$); zıt ise iş **negatiftir** (sürtünme). Birim: joule (J).\n\n# Enerji Türleri\n\n- **Kinetik:** $E_k = \\tfrac12 mv^2$\n- **Çekim potansiyel:** $E_p = mgh$\n- **Esneklik potansiyel:** $E_{yay} = \\tfrac12 kx^2$ (Hooke: $F = kx$)\n\n# İş–Enerji Teoremi\n\n$$W_{net} = \\Delta E_k$$\n\n# Mekanik Enerjinin Korunumu\n\nSürtünme yoksa: $E_k + E_p = \\text{sabit}$ → $\\tfrac12 mv_1^2 + mgh_1 = \\tfrac12 mv_2^2 + mgh_2$.\nSürtünme varsa: $E_{mek,ilk} - |W_{sürt}| = E_{mek,son}$; kayıp enerji **ısıya** dönüşür.\n\n# Güç ve Verim\n\n$$P = \\frac{W}{t} = F\\,v \\qquad \\text{Verim} = \\frac{\\text{yararlı enerji}}{\\text{harcanan enerji}}\\times100$$",
     "ornekler": [
      {
       "soru": "Sürtünmesiz bir rampada $20$ m yükseklikten durgun bırakılan cismin yere ulaştığındaki hızı?",
       "cozum": "$mgh = \\frac12 mv^2 \\Rightarrow v = \\sqrt{2gh} = \\sqrt{400} = 20$ m/s."
      }
     ],
     "ozet": [
      "$W=Fx\\cos\\theta$; dik kuvvet iş yapmaz.",
      "$W_{net}=\\Delta E_k$.",
      "Sürtünmesiz ortamda mekanik enerji korunur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "İtme ve çizgisel momentum",
     "en": "Impulse and linear momentum"
    },
    "content": {
     "anlatim": "# Momentum ve İtme\n\n$$\\vec p = m\\vec v \\qquad \\vec I = \\vec F\\,\\Delta t = \\Delta\\vec p$$\n- Momentum **vektöreldir**, birimi kg·m/s.\n- **İtme = momentum değişimi.** Aynı momentum değişimi **daha uzun sürede** olursa kuvvet **küçülür** → hava yastığı, emniyet kemeri, kumda düşme, eldivenle top tutma.\n- $F$–$t$ grafiğinin altındaki alan **itmeyi** verir.\n\n# Momentumun Korunumu\n\nDış kuvvet yoksa sistemin toplam momentumu sabittir:\n$$m_1\\vec v_1 + m_2\\vec v_2 = m_1\\vec v_1\\,' + m_2\\vec v_2\\,'$$\n\n| Çarpışma | Momentum | Kinetik enerji |\n|---|---|---|\n| **Esnek** | Korunur | Korunur |\n| **Esnek olmayan** | Korunur | Korunmaz |\n| **Tam esnek olmayan** (yapışarak) | Korunur | En fazla kayıp |\n\n**Patlama / tepki:** Başlangıçta duran sistem için $m_1 v_1 = m_2 v_2$ (zıt yönde) — tüfeğin geri tepmesi, roket.",
     "ornekler": [
      {
       "soru": "$2$ kg ve $6$ m/s hızlı araba, duran $1$ kg'lık arabaya çarpıp yapışıyor. Ortak hız nedir?",
       "cozum": "$2\\cdot6 = (2+1)v' \\Rightarrow v' = 4$ m/s."
      }
     ],
     "ozet": [
      "$p=mv$; itme $F\\Delta t=\\Delta p$.",
      "Dış kuvvet yoksa momentum korunur.",
      "Esnek çarpışmada kinetik enerji de korunur."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Çarpışmalar ve patlamalar",
     "en": "Collisions and explosions"
    },
    "content": {
     "anlatim": "# Momentumun Korunumu\n\nDış kuvvet yoksa sistemin toplam momentumu korunur:\n$$m_1\\vec v_1 + m_2\\vec v_2 = m_1\\vec v_1\\,' + m_2\\vec v_2\\,'$$\n\n# Çarpışma Türleri\n\n| Tür | Momentum | Kinetik enerji | Örnek |\n|---|---|---|---|\n| **Esnek** | Korunur | **Korunur** | Bilardo topları, gaz molekülleri |\n| **Esnek olmayan** | Korunur | Kısmen ısı/ses/şekil değiştirmeye dönüşür | Araba kazaları |\n| **Tamamen esnek olmayan** | Korunur | En çok kayıp; cisimler **yapışıp birlikte** hareket eder | Kurşunun bloğa saplanması |\n\n**Yapışık çarpışma:** $m_1v_1 + m_2v_2 = (m_1 + m_2)v_{ortak}$\n\n**Özel durum:** Eşit kütleli iki cisim **merkezî esnek** çarpışırsa **hızlarını değiş tokuş eder**.\n\n# Patlamalar\n\nBaşlangıçta duran sistem: $0 = m_1v_1 + m_2v_2$ → parçalar **zıt yönlerde**, kütleleriyle **ters orantılı** hızlarla hareket eder.\n- Tüfeğin **geri tepmesi**, roket itmesi, buz pateninde itişen iki kişi.\n\n# İki Boyutta Çarpışma\n\nMomentum $x$ ve $y$ bileşenlerinde **ayrı ayrı** korunur (vektörel toplama).",
     "ornekler": [
      {
       "soru": "$2$ kg'lık ve $6$ m/s hızla giden araba, duran $4$ kg'lık arabaya çarpıp yapışıyor. Ortak hız ve kinetik enerji kaybı nedir?",
       "cozum": "$2\\cdot6 = 6\\cdot v \\Rightarrow v = 2$ m/s. $E_{ilk} = \\frac12\\cdot2\\cdot36 = 36$ J, $E_{son} = \\frac12\\cdot6\\cdot4 = 12$ J → kayıp **24 J**."
      },
      {
       "soru": "Duran $4$ kg'lık tüfekten $0{,}02$ kg'lık mermi $400$ m/s ile çıkıyor. Tüfeğin geri tepme hızı nedir?",
       "cozum": "$0 = 0{,}02\\cdot400 + 4\\cdot v \\Rightarrow v = -2$ m/s (merminin tersi yönde 2 m/s)."
      }
     ],
     "ozet": [
      "Tüm çarpışmalarda momentum korunur; kinetik enerji yalnızca esneklerde.",
      "Yapışık çarpışmada en büyük enerji kaybı.",
      "Patlamada parçaların momentumları eşit büyüklükte, zıt yönde."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Elektrik ve Manyetizma",
   "en": "Unit 3: Electricity and Magnetism"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Elektriksel kuvvet, alan, potansiyel ve sığaç",
     "en": "Electric force, field, potential and capacitors"
    },
    "content": {
     "anlatim": "# Coulomb Yasası\n\n$$F = k\\frac{q_1 q_2}{d^2} \\qquad k = 9\\times10^9\\ \\text{N·m}^2/\\text{C}^2$$\nAynı işaretli yükler **iter**, zıt işaretliler **çeker**. Kuvvet uzaklığın **karesiyle ters** orantılı.\n\n# Elektrik Alan\n\nBirim pozitif yüke etki eden kuvvet: $$E = \\frac{F}{q} = k\\frac{q}{d^2}$$ Alan çizgileri **pozitiften çıkar, negatife girer**. Paralel levhalar arasında alan **düzgündür**: $E = \\dfrac{V}{d}$.\n\n# Elektriksel Potansiyel ve Potansiyel Fark\n\n- Potansiyel: $V = k\\dfrac{q}{d}$ (skaler).\n- Yükü A'dan B'ye taşırken yapılan iş: $W = q\\,(V_B - V_A)$.\n- Paralel levhalar arasında hızlanan yük: $qV = \\tfrac12 mv^2$.\n\n# Sığaç (Kondansatör)\n\nYük depolayan devre elemanı:\n$$C = \\frac{q}{V} \\qquad C = \\varepsilon\\frac{A}{d} \\qquad E_{depolanan} = \\tfrac12 qV = \\tfrac12 CV^2$$\n- Levha alanı ↑ → $C$ ↑; levhalar arası uzaklık ↑ → $C$ ↓; araya yalıtkan (dielektrik) → $C$ ↑.\n- **Paralel bağlı:** $C_{eş} = C_1 + C_2$. **Seri bağlı:** $\\dfrac{1}{C_{eş}} = \\dfrac1{C_1} + \\dfrac1{C_2}$.",
     "ornekler": [
      {
       "soru": "İki nokta yük arasındaki uzaklık 2 katına çıkarılırsa aralarındaki kuvvet nasıl değişir?",
       "cozum": "$F \\propto \\frac{1}{d^2}$ → kuvvet $\\frac{1}{4}$'üne iner."
      }
     ],
     "ozet": [
      "Coulomb: $F=kq_1q_2/d^2$.",
      "Alan $E=kq/d^2$; levhalar arası $E=V/d$.",
      "Sığa $C=q/V=\\varepsilon A/d$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Elektrik akımı, Ohm yasası ve devreler",
     "en": "Electric current, Ohm's law and circuits"
    },
    "content": {
     "anlatim": "# Temel Büyüklükler\n\n- **Akım:** $I = \\dfrac{q}{t}$ (amper)\n- **Ohm yasası:** $V = I\\,R$\n- **Direnç:** $R = \\rho\\dfrac{L}{A}$ (uzunlukla doğru, kesitle ters orantılı)\n- **Elektriksel güç:** $P = VI = I^2R = \\dfrac{V^2}{R}$; enerji $E = Pt$\n\n# Direnç Bağlama\n\n| | Seri | Paralel |\n|---|---|---|\n| Eşdeğer | $R_{eş} = R_1 + R_2 + \\ldots$ | $\\dfrac1{R_{eş}} = \\dfrac1{R_1} + \\dfrac1{R_2} + \\ldots$ |\n| Ortak olan | **Akım** | **Gerilim** |\n| Paylaşılan | Gerilim (dirençle orantılı) | Akım (dirençle ters orantılı) |\n\nİki paralel direnç için: $R_{eş} = \\dfrac{R_1R_2}{R_1+R_2}$.\n\n# Üreteç\n\n$\\varepsilon$: emk, $r$: iç direnç → $I = \\dfrac{\\varepsilon}{R + r}$; uç gerilimi $V = \\varepsilon - Ir$.\n- Üreteçler **seri** → emk'ler toplanır; **paralel** (özdeş) → emk aynı, ömür uzar.\n\n**Ampermetre** devreye **seri**, **voltmetre** **paralel** bağlanır.",
     "ornekler": [
      {
       "soru": "$6\\,\\Omega$ ve $3\\,\\Omega$ dirençler paralel bağlanıp $12$ V'luk iç dirençsiz üretece bağlanıyor. Ana koldaki akım?",
       "cozum": "$R_{eş} = \\frac{6\\cdot3}{9} = 2\\,\\Omega$. $I = 12/2 = 6$ A."
      }
     ],
     "ozet": [
      "$V=IR$, $R=\\rho L/A$, $P=VI$.",
      "Seride akım ortak, paralelde gerilim ortak.",
      "$I=\\varepsilon/(R+r)$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Manyetizma, manyetik kuvvet ve indüksiyon",
     "en": "Magnetism, magnetic force and induction"
    },
    "content": {
     "anlatim": "# Manyetik Alan\n\n- Mıknatısta alan çizgileri **N'den çıkar, S'ye girer**.\n- Akım taşıyan **düz telin** çevresinde dairesel alan oluşur (**sağ el kuralı**: başparmak akım, parmaklar alan): $B = \\dfrac{\\mu_0 I}{2\\pi d}$.\n- **Akım makarası (selenoid):** İçinde düzgün alan: $B = \\mu_0\\dfrac{N}{L}I$.\n\n# Manyetik Kuvvet\n\n- **Hareketli yüke (Lorentz):** $F = qvB\\sin\\theta$ → yük alana dik girerse **çembersel** hareket yapar: $r = \\dfrac{mv}{qB}$.\n- **Akım taşıyan tele:** $F = BIL\\sin\\theta$. **Elektrik motorunun** çalışma ilkesidir.\n- Aynı yönde akım taşıyan paralel teller **çeker**, zıt yönde akım taşıyanlar **iter**.\n\n# Elektromanyetik İndüksiyon\n\n**Manyetik akı:** $\\Phi = BA\\cos\\theta$.\n**Faraday yasası:** Akı değiştiğinde emk oluşur: $$\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}$$\n**Lenz kuralı:** İndüksiyon akımı, kendisini oluşturan **akı değişimine karşı koyacak** yöndedir (eksi işaret).\n- Manyetik alanda hareket eden çubuk: $\\varepsilon = BLv$.\n\n# Uygulamalar\n\n| Cihaz | İlke |\n|---|---|\n| **Jeneratör (üreteç)** | Mekanik → elektrik (indüksiyon) |\n| **Elektrik motoru** | Elektrik → mekanik (akımlı tele kuvvet) |\n| **Transformatör** | $\\dfrac{V_1}{V_2} = \\dfrac{N_1}{N_2}$; yalnızca **alternatif akımla** çalışır |\n| İndüksiyon ocağı, kartlı ödeme, kablosuz şarj | Değişen manyetik alan |",
     "ornekler": [
      {
       "soru": "Primer sargısı 200, sekonder sargısı 1000 sarımlı ideal transformatörün primerine $220$ V uygulanırsa sekonder gerilimi?",
       "cozum": "$\\frac{220}{V_2} = \\frac{200}{1000} \\Rightarrow V_2 = 1100$ V (yükseltici)."
      }
     ],
     "ozet": [
      "Sağ el kuralı; düz telde ve selenoidde alan.",
      "$F=qvB$, $F=BIL$: motor ilkesi.",
      "Faraday $\\varepsilon=-N\\Delta\\Phi/\\Delta t$, Lenz; jeneratör ve transformatör."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Alternatif akım, transformatörler ve elektrik enerjisinin iletimi",
     "en": "Alternating current, transformers and power transmission"
    },
    "content": {
     "anlatim": "# Alternatif Akım (AC)\n\nYönü ve büyüklüğü **periyodik** değişen akım; jeneratörde manyetik alanda dönen bobinde **indüksiyonla** üretilir.\n$$\\varepsilon = \\varepsilon_{maks}\\sin(\\omega t), \\qquad \\omega = 2\\pi f$$\n- Türkiye şebekesi: **220–230 V**, **50 Hz**.\n- **Etkin (efektif) değer:** $V_{etkin} = \\dfrac{V_{maks}}{\\sqrt2}$, $I_{etkin} = \\dfrac{I_{maks}}{\\sqrt2}$ (prizdeki 220 V etkin değerdir; tepe değer ≈ 311 V).\n\n# Transformatör\n\nOrtak demir çekirdeğe sarılı iki bobin; **yalnızca AC ile çalışır** (değişen manyetik akı gerekir).\n$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$$\n- $N_s > N_p$: **yükseltici**, $N_s < N_p$: **alçaltıcı**.\n- İdeal transformatörde güç korunur: $V_pI_p = V_sI_s$.\n- Verim: $\\eta = \\dfrac{P_{çıkış}}{P_{giriş}}\\times100$; kayıplar **ısı (Joule)**, **girdap (Foucault) akımları** (çekirdek ince levhalardan yapılarak azaltılır).\n\n# Uzak Mesafeye İletim\n\nHattaki ısı kaybı $P_{kayıp} = I^2R$. Aynı gücü taşırken **gerilim yükseltilip akım düşürülür** → kayıp azalır. Santralden çıkışta yükseltici (154–380 kV), şehre girişte alçaltıcı trafolar kullanılır.",
     "ornekler": [
      {
       "soru": "Primer sarımı $400$, sekonder sarımı $20$ olan ideal transformatörün primerine $220$ V uygulanıyor. Sekonder gerilim ve primer akımı $0{,}5$ A ise sekonder akımı nedir?",
       "cozum": "$V_s = 220\\cdot\\frac{20}{400} = 11$ V (alçaltıcı). $I_s = I_p\\cdot\\frac{N_p}{N_s} = 0{,}5\\cdot20 = 10$ A."
      },
      {
       "soru": "Elektrik iletim hatlarında neden çok yüksek gerilim kullanılır?",
       "cozum": "Aynı güç $P = VI$ için gerilim artınca **akım azalır**; hattaki ısı kaybı $I^2R$ akımın karesiyle orantılı olduğundan kayıp büyük ölçüde düşer."
      }
     ],
     "ozet": [
      "$V_{etkin} = V_{maks}/\\sqrt2$; şebeke 50 Hz.",
      "$V_s/V_p = N_s/N_p = I_p/I_s$.",
      "Transformatör yalnızca AC ile çalışır; iletimde yüksek gerilim kaybı azaltır."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Dalgalar ve Optik",
   "en": "Unit 4: Waves and Optics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Dalga büyüklükleri, yansıma, kırılma, girişim, kırınım",
     "en": "Wave quantities, reflection, refraction, interference, diffraction"
    },
    "content": {
     "anlatim": "# Dalga Büyüklükleri\n\n- **Genlik** (enerjiyle ilgili), **dalga boyu** $\\lambda$, **frekans** $f$, **periyot** $T = 1/f$\n- **Dalga hızı:** $v = \\lambda f$\n- Hız **ortama** bağlıdır; frekans **kaynağa** bağlıdır ve ortam değişse de **değişmez**.\n- **Enine** dalga (titreşim yayılmaya dik: ışık, ip dalgası) / **boyuna** dalga (paralel: ses, yay).\n\n# Dalga Olayları\n\n| Olay | Açıklama |\n|---|---|\n| **Yansıma** | Gelme açısı = yansıma açısı. Sabit uçtan yansımada dalga **ters döner** |\n| **Kırılma** | Ortam değişince hız ve dalga boyu değişir, doğrultu değişir. Snell: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$; $n = c/v$ |\n| **Tam yansıma** | Yoğun ortamdan az yoğuna geçerken gelme açısı **sınır açıyı** aşarsa (fiber optik) |\n| **Girişim** | Dalgaların üst üste binmesi: aynı fazda → **yapıcı** (parlak), zıt fazda → **yıkıcı** (karanlık). Young deneyi: saçak aralığı $\\Delta x = \\dfrac{\\lambda L}{d}$ |\n| **Kırınım** | Dalganın engel ya da yarık kenarından bükülerek yayılması; yarık genişliği dalga boyuna yakınsa belirgin |\n| **İnce film** | Sabun köpüğü ve yağ tabakasındaki renkler: üst ve alt yüzeyden yansıyan ışınların girişimi |",
     "ornekler": [
      {
       "soru": "Işık havadan suya geçerken hangi büyüklükleri değişir, hangisi değişmez?",
       "cozum": "**Hız** ve **dalga boyu** azalır; **frekans** (ve dolayısıyla renk) **değişmez**, çünkü frekans kaynağa bağlıdır."
      }
     ],
     "ozet": [
      "$v=\\lambda f$; frekans kaynağa, hız ortama bağlı.",
      "Snell yasası; tam yansıma ve fiber optik.",
      "Girişim (Young) ve kırınım dalga doğasını kanıtlar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Aynalar ve mercekler",
     "en": "Mirrors and lenses"
    },
    "content": {
     "anlatim": "# Düz Ayna\n\nGörüntü **sanal, düz**, cisimle **aynı boyda** ve aynaya **eşit uzaklıkta**.\n\n# Küresel Aynalar ve İnce Mercekler\n\n$$\\frac{1}{f} = \\frac{1}{d_c} + \\frac{1}{d_g} \\qquad \\text{büyütme } m = \\frac{h_g}{h_c} = -\\frac{d_g}{d_c}$$\n\n| | Çukur ayna / İnce kenarlı (yakınsak) mercek | Tümsek ayna / Kalın kenarlı (ıraksak) mercek |\n|---|---|---|\n| Odak | Gerçek, $f > 0$ | Sanal, $f < 0$ |\n| Görüntü | Cismin yerine göre **gerçek-ters** ya da (odak içinde) **sanal-düz-büyük** | Her zaman **sanal, düz, küçük** |\n| Kullanım | Diş hekimi aynası, far, büyüteç, fotoğraf makinesi, göz merceği | Dikiz aynası, market güvenlik aynası; miyop gözlüğü |\n\n**Çukur ayna / yakınsak mercekte cismin yeri:**\n- $2f$'nin dışında → gerçek, ters, **küçük**\n- $2f$'de → gerçek, ters, **eşit**\n- $f$ ile $2f$ arası → gerçek, ters, **büyük**\n- Odakta → görüntü **oluşmaz** (ışınlar paralel)\n- Odak içinde → **sanal, düz, büyük** (büyüteç)\n\n**Göz kusurları:** **Miyop** (uzağı göremez, görüntü retinanın önünde) → **kalın kenarlı** mercek. **Hipermetrop** (yakını göremez) → **ince kenarlı** mercek.",
     "ornekler": [
      {
       "soru": "Odak uzaklığı $10$ cm olan ince kenarlı merceğin $30$ cm önüne konan cismin görüntüsü nerede oluşur, özellikleri nedir?",
       "cozum": "$\\frac1{10} = \\frac1{30} + \\frac1{d_g} \\Rightarrow d_g = 15$ cm. $m = -\\frac{15}{30} = -\\frac12$ → **gerçek, ters**, yarı boyda."
      }
     ],
     "ozet": [
      "Düz ayna: sanal, düz, eşit boy.",
      "$1/f=1/d_c+1/d_g$; $m=-d_g/d_c$.",
      "Miyop kalın kenarlı, hipermetrop ince kenarlı mercek."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Ses dalgaları ve Doppler olayı",
     "en": "Sound waves and the Doppler effect"
    },
    "content": {
     "anlatim": "# Ses Dalgaları\n\n- **Boyuna, mekanik** dalga; yayılmak için **maddesel ortam** gerekir (boşlukta yayılmaz).\n- Hız: katılarda > sıvılarda > gazlarda; havada yaklaşık **340 m/s**; sıcaklık arttıkça artar.\n- **Şiddet** (genlik, desibel), **yükseklik/incelik** (frekans), **tını** (kaynağın kendine özgü dalga biçimi).\n- İnsan kulağı ≈ **20 Hz – 20 000 Hz** arasını duyar. Altı **infrases**, üstü **ultrases** (ultrason, sonar).\n- **Yankı:** Yansıyan sesin duyulması; uzaklık ölçümü $d = \\dfrac{v\\,t}{2}$.\n- **Rezonans:** Doğal frekansla uyarılan sistemin büyük genlikle titreşmesi.\n\n# Doppler Olayı\n\nKaynak ile gözlemci birbirine **yaklaşırken** algılanan frekans **artar** (ses incelir), **uzaklaşırken azalır** (kalınlaşır). Ambulans sireninde duyulur.\n\n**Uygulamalar:** Hız radarları, Doppler ultrason (kan akışı), astronomide **kırmızıya kayma** (galaksilerin uzaklaşması → evrenin genişlemesi).",
     "ornekler": [
      {
       "soru": "Bir yarasa gönderdiği sesin yankısını $0{,}02$ s sonra duyuyor ($v=340$ m/s). Engel ne kadar uzaktadır?",
       "cozum": "$d = \\frac{340\\cdot0{,}02}{2} = 3{,}4$ m."
      }
     ],
     "ozet": [
      "Ses boyuna mekanik dalga, boşlukta yayılmaz.",
      "Frekans → incelik; genlik → şiddet; tını.",
      "Doppler: yaklaşınca frekans artar."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Modern Fiziğe Giriş",
   "en": "Unit 5: Introduction to Modern Physics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Foton kavramı ve fotoelektrik olay",
     "en": "Photons and the photoelectric effect"
    },
    "content": {
     "anlatim": "# Foton\n\nIşık enerjisi **paketler (kuantum)** hâlinde taşınır; her paket bir **foton**dur:\n$$E = hf = \\frac{hc}{\\lambda} \\qquad h = 6{,}63\\times10^{-34}\\ \\text{J·s}$$\nFrekans büyüdükçe (dalga boyu küçüldükçe) foton enerjisi artar: mor > mavi > … > kırmızı.\n\n# Fotoelektrik Olay\n\nMetal yüzeye yeterli frekansta ışık düşünce **elektron sökülmesi** (Einstein, 1905 — Nobel 1921).\n$$E_{foton} = W_0 + E_{k,max} \\qquad hf = hf_0 + \\tfrac12 mv_{max}^2$$\n- $W_0$: **eşik enerjisi (bağlanma enerjisi)**, $f_0$: **eşik frekansı**.\n- $f < f_0$ ise ışık ne kadar **şiddetli** olursa olsun elektron sökülmez.\n- **Işık şiddeti** artarsa sökülen elektron **sayısı** (akım) artar; elektronların **maksimum kinetik enerjisi** değişmez.\n- **Frekans** artarsa $E_{k,max}$ artar.\n- **Kesme (durdurma) gerilimi:** $eV_k = E_{k,max}$.\n\n> Bu sonuçlar ışığın yalnızca dalga modeliyle açıklanamaz → ışığın **tanecik** doğası; ışık **dalga–parçacık ikiliği** gösterir.\n\n**Uygulamalar:** Güneş pilleri, fotosel kapılar, ışık sensörleri, dijital kameralar.",
     "ornekler": [
      {
       "soru": "Eşik enerjisi $2$ eV olan metale $5$ eV enerjili foton düşüyor. Sökülen elektronların maksimum kinetik enerjisi ve kesme gerilimi nedir?",
       "cozum": "$E_{k,max} = 5 - 2 = 3$ eV; kesme gerilimi $V_k = 3$ V."
      }
     ],
     "ozet": [
      "$E=hf=hc/\\lambda$.",
      "$hf=W_0+E_{k,max}$; $f<f_0$ ise elektron sökülmez.",
      "Şiddet sayıyı, frekans kinetik enerjiyi belirler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Atom modelleri, spektrum, temel parçacıklar ve çekirdek",
     "en": "Atomic models, spectra, particles and the nucleus"
    },
    "content": {
     "anlatim": "# Atom Modelleri\n\n| Model | Katkı | Eksik |\n|---|---|---|\n| **Thomson** | Pozitif küre içinde gömülü elektronlar (\"üzümlü kek\") | Çekirdeği açıklamaz |\n| **Rutherford** | Alfa saçılması → küçük, yoğun, **pozitif çekirdek** | İvmeli elektron enerji yayıp çekirdeğe düşmeliydi |\n| **Bohr** | Elektronlar belirli **enerji seviyelerinde** dolanır; seviye değiştirirken foton yayar/soğurur: $E_{foton} = E_{üst} - E_{alt}$ | Yalnızca **hidrojen** benzeri atomlar için başarılı |\n| **Kuantum (modern)** | Elektron bulutu, **orbitaller**, olasılık | — |\n\n# Spektrum\n\n- **Sürekli spektrum:** Akkor katı (tüm renkler).\n- **Yayılma (emisyon) spektrumu:** Uyarılmış gazın yaydığı **kesikli parlak çizgiler**.\n- **Soğurma (absorpsiyon) spektrumu:** Sürekli spektrumda **karanlık çizgiler**.\n- Her elementin çizgi spektrumu **parmak izi** gibidir → yıldızların bileşimi bu yolla belirlenir.\n\n# Temel Parçacıklar\n\n- **Kuarklar** (proton = uud, nötron = udd) ve **leptonlar** (elektron, nötrino).\n- Dört temel kuvvet: **kütle çekimi, elektromanyetik, güçlü nükleer, zayıf nükleer**.\n\n# Çekirdek ve Nükleer Enerji\n\n- **Radyoaktivite:** Alfa ($^4_2\\text{He}$), beta (elektron/pozitron), gama (foton) ışımaları. **Yarı ömür:** Çekirdeklerin yarısının bozunma süresi.\n- **Fisyon:** Ağır çekirdeğin bölünmesi (nükleer santral, uranyum-235).\n- **Füzyon:** Hafif çekirdeklerin birleşmesi (Güneş'in enerjisi).\n- Açığa çıkan enerji kütle kaybından gelir: $E = mc^2$.",
     "ornekler": [
      {
       "soru": "Hidrojen atomunda elektron 3. seviyeden 2. seviyeye inerse ne olur?",
       "cozum": "İki seviye arasındaki enerji farkına eşit enerjili **bir foton yayılır**: $E = E_3 - E_2$. Bu geçiş görünür bölgede **kırmızı** çizgiyi (Balmer serisi) oluşturur."
      }
     ],
     "ozet": [
      "Bohr: kesikli enerji seviyeleri, seviye geçişinde foton.",
      "Emisyon ve soğurma spektrumları elementin parmak izi.",
      "Fisyon ve füzyon; $E=mc^2$."
     ]
    }
   }
  ]
 }
];
