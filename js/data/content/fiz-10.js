/* =========================================================
   10. Sınıf Fizik — kapsamlı konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Fizik Ders Kitabı – Kapsamlı Konu Anlatım Notları" (4 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Tablolar ve örnek soruların bir kısmı eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/fizik"] = [
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
     "tr": "Sabit hızlı hareket: temel kavramlar ve grafikler",
     "en": "Uniform motion: basic concepts and graphs"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\nHareket, bir cismin konumunun bir **referans noktasına göre** zamanla değişmesidir.\n\n| Kavram | Tanım | Tür |\n|---|---|---|\n| **Konum** $\\vec{x}$ | Referans noktasından cisme çizilen vektör (m) | Vektörel |\n| **Yer değiştirme** $\\Delta\\vec{x}$ | $\\vec{x}_{son} - \\vec{x}_{ilk}$; ilk ve son konum arasındaki en kısa yönlü uzaklık | Vektörel |\n| **Alınan yol** $x$ | Yörüngenin toplam uzunluğu | Skaler |\n| **Sürat** | $\\dfrac{\\text{alınan yol}}{\\text{zaman}}$ | Skaler |\n| **Hız** $\\vec{\\vartheta}$ | $\\dfrac{\\Delta\\vec{x}}{\\Delta t}$ | Vektörel |\n\n# Sabit Hızlı (Düzgün Doğrusal) Hareket\n\nEşit zaman aralıklarında **eşit yer değiştirme** yapılan harekettir. Hızın büyüklüğü ve yönü değişmez, **ivme sıfırdır** ($a = 0$).\n$$\\Delta x = \\vartheta \\cdot t$$\n\n# Grafikler\n\n| Grafik | Şekli | Ne verir? |\n|---|---|---|\n| **Konum–zaman** ($x$–$t$) | Eğik doğru | **Eğim = hız**. Yukarı eğim pozitif yön, aşağı eğim negatif yön |\n| **Hız–zaman** ($\\vartheta$–$t$) | Yatay doğru | **Alan = yer değiştirme**. Eksenin üstü pozitif, altı negatif yer değiştirme |\n| **İvme–zaman** | $a = 0$ çizgisi | — |",
     "ornekler": [
      {
       "soru": "Bir araç 4 s'de doğu yönünde 80 m, sonraki 2 s'de batı yönünde 20 m gidiyor. Alınan yol, yer değiştirme ve ortalama hız nedir?",
       "cozum": "Alınan yol $80+20=100$ m. Yer değiştirme $80-20=60$ m doğu. Ortalama hız $\\frac{60}{6}=10$ m/s doğu; ortalama sürat $\\frac{100}{6}\\approx16{,}7$ m/s."
      },
      {
       "soru": "Konum–zaman grafiği $(0\\,s, 10\\,m)$ ve $(5\\,s, 40\\,m)$ noktalarından geçen bir doğrudur. Hız kaçtır?",
       "cozum": "Eğim $= \\frac{40-10}{5-0} = 6$ m/s (pozitif yönde)."
      }
     ],
     "ozet": [
      "Hız ve yer değiştirme vektörel; sürat ve yol skaler.",
      "$x$–$t$ eğimi = hız; $\\vartheta$–$t$ alanı = yer değiştirme.",
      "Sabit hızlı harekette $a=0$, $\\Delta x=\\vartheta t$."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Bağıl hareket, karşılaşma ve yetişme",
     "en": "Relative motion, meeting and catching up"
    },
    "content": {
     "anlatim": "# Bağıl Hareket\n\nBir cismin **başka bir hareketli gözlemciye göre** hızına bağıl hız denir:\n$$\\vec{\\vartheta}_{bağıl} = \\vec{\\vartheta}_{cisim} - \\vec{\\vartheta}_{gözlemci}$$\n\n- Aynı yönde giden iki araçta bağıl hız = hızlar **farkı**.\n- Zıt yönde giden iki araçta bağıl hız = hızlar **toplamı**.\n\n# Karşılaşma ve Yetişme\n\n| Durum | Süre |\n|---|---|\n| **Birbirine doğru** (zıt yön) | $t_{karşılaşma} = \\dfrac{x_{toplam}}{\\vartheta_1 + \\vartheta_2}$ |\n| **Aynı yönde, arkadaki yetişiyor** | $t_{yetişme} = \\dfrac{x_{arada}}{\\vartheta_1 - \\vartheta_2}$ ($\\vartheta_1 > \\vartheta_2$) |",
     "ornekler": [
      {
       "soru": "Aralarında 300 km olan iki araç 70 km/h ve 80 km/h hızlarla birbirine doğru hareket ediyor. Kaç saat sonra karşılaşırlar?",
       "cozum": "$t = \\frac{300}{70+80} = 2$ saat."
      },
      {
       "soru": "Aynı yönde giden iki araçtan öndeki 60 km/h, arkadaki 90 km/h hızla gidiyor; aralarında 15 km var. Arkadaki kaç dakikada yetişir?",
       "cozum": "$t = \\frac{15}{90-60} = 0{,}5$ saat $= 30$ dakika."
      }
     ],
     "ozet": [
      "Aynı yön → fark; zıt yön → toplam.",
      "Karşılaşma: toplam mesafe / hızlar toplamı.",
      "Yetişme: aradaki mesafe / hızlar farkı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "İvme: hızlanma ve yavaşlama",
     "en": "Acceleration: speeding up and slowing down"
    },
    "content": {
     "anlatim": "# İvme\n\nHızdaki değişimin, bu değişimin gerçekleştiği zaman aralığına oranıdır:\n$$\\vec{a} = \\frac{\\Delta\\vec{\\vartheta}}{\\Delta t} = \\frac{\\vec{\\vartheta}_{son} - \\vec{\\vartheta}_{ilk}}{t_{son} - t_{ilk}}$$\n\n- Birimi $m/s^2$; **vektörel** bir niceliktir.\n- Yönü her zaman **hız değişimi** ve **net kuvvet** ile aynıdır.\n\n| Hız ve ivme | Hareket |\n|---|---|\n| **Aynı yönlü** | Düzgün **hızlanan** (hızın büyüklüğü artar) |\n| **Zıt yönlü** | Düzgün **yavaşlayan** (hızın büyüklüğü azalır) |\n| $a = 0$ | Sabit hızlı ya da duran |\n\n> Negatif ivme her zaman \"yavaşlama\" demek değildir; cisim negatif yönde gidiyorsa negatif ivme onu **hızlandırır**.",
     "ornekler": [
      {
       "soru": "Durgun hâlden harekete geçen bir araç 5 s'de 20 m/s hıza ulaşıyor. İvmesi kaçtır?",
       "cozum": "$a = \\frac{20 - 0}{5} = 4\\ m/s^2$."
      },
      {
       "soru": "Bir cismin hızı $-10$ m/s, ivmesi $-2\\ m/s^2$ ise cisim hızlanıyor mu, yavaşlıyor mu?",
       "cozum": "Hız ve ivme **aynı yönlü** (ikisi de negatif) → cisim **hızlanıyor**."
      }
     ],
     "ozet": [
      "$a = \\Delta\\vartheta/\\Delta t$, birim $m/s^2$.",
      "Aynı yön → hızlanma; zıt yön → yavaşlama.",
      "İvmenin yönü = net kuvvetin yönü."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Bir boyutta sabit ivmeli hareket: denklemler ve grafikler",
     "en": "Uniformly accelerated motion: equations and graphs"
    },
    "content": {
     "anlatim": "# Kinematik Denklemler\n\nİlk hızı $\\vartheta_0$, ivmesi $a$ olan cisim için (hızlanan $+$, yavaşlayan $-$):\n\n| Denklem | Kullanım |\n|---|---|\n| $\\vartheta = \\vartheta_0 \\pm a\\,t$ | Son hız |\n| $\\Delta x = \\vartheta_0\\,t \\pm \\tfrac{1}{2}a\\,t^2$ | Yer değiştirme |\n| $\\vartheta^2 = \\vartheta_0^2 \\pm 2a\\,\\Delta x$ | Zaman verilmediğinde |\n| $\\Delta x = \\dfrac{\\vartheta_0 + \\vartheta}{2}\\cdot t$ | Ortalama hızla |\n\n# Grafikler\n\n| Grafik | Şekli | Eğim | Alan |\n|---|---|---|---|\n| **İvme–zaman** | Yatay doğru | — | **Hız değişimi** $\\Delta\\vartheta = a\\,t$ |\n| **Hız–zaman** | Eğik doğru | **İvme** | **Yer değiştirme** |\n| **Konum–zaman** | **Parabol** | Teğetin eğimi = **anlık hız** | — |",
     "ornekler": [
      {
       "soru": "8 m/s hızla giden bir bisiklet $2\\ m/s^2$ ivmeyle 3 s hızlanıyor. Son hızı ve aldığı yol nedir?",
       "cozum": "$\\vartheta = 8 + 2\\cdot3 = 14$ m/s. $\\Delta x = 8\\cdot3 + \\frac12\\cdot2\\cdot9 = 24 + 9 = 33$ m."
      },
      {
       "soru": "20 m/s hızla giden araç fren yapıp $4\\ m/s^2$ ivmeyle yavaşlıyor. Durana kadar kaç m yol alır?",
       "cozum": "$0 = 20^2 - 2\\cdot4\\cdot\\Delta x \\Rightarrow \\Delta x = \\frac{400}{8} = 50$ m."
      }
     ],
     "ozet": [
      "$\\vartheta=\\vartheta_0\\pm at$; $\\Delta x=\\vartheta_0t\\pm\\frac12at^2$; $\\vartheta^2=\\vartheta_0^2\\pm2a\\Delta x$.",
      "$\\vartheta$–$t$: eğim = ivme, alan = yer değiştirme.",
      "$a$–$t$ alanı = hız değişimi; $x$–$t$ parabol."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Enerji",
   "en": "Unit 2: Energy"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "İş ve kuvvet–yer değiştirme grafiği",
     "en": "Work and the force–displacement graph"
    },
    "content": {
     "anlatim": "# İş\n\nFiziksel anlamda iş, kuvvet ile cismin **kuvvet doğrultusundaki** yer değiştirmesinin çarpımıdır:\n$$W = F \\cdot \\Delta x \\qquad (W = F\\,\\Delta x\\cos\\theta)$$\n\n- Birimi **joule** ($J = N\\cdot m$); **skaler**dir.\n- İş yapılması için: kuvvet uygulanmalı **ve** cisim kuvvet doğrultusunda yer değiştirmelidir.\n- **Kuvvete dik hareket iş yapmaz** (ör. çantayı taşıyarak yatay yürümek — yer çekimine karşı iş yok).\n- Kuvvet yer değiştirmeye zıtsa iş **negatif**tir (sürtünme).\n\n# Kuvvet–Yer Değiştirme ($F$–$x$) Grafiği\n\nGrafik ile yatay eksen arasındaki **alan = yapılan iş**.\n- Eksenin **üstündeki** alan: pozitif iş (cisim enerji kazanır).\n- **Altındaki** alan: negatif iş (enerji kaybı).",
     "ornekler": [
      {
       "soru": "20 N'luk yatay kuvvetle bir kutu 5 m itiliyor. Yapılan iş kaç J'dir?",
       "cozum": "$W = 20\\cdot5 = 100$ J."
      },
      {
       "soru": "$F$–$x$ grafiğinde kuvvet 0'dan 10 N'a doğrusal artarken cisim 4 m ilerliyor. İş kaçtır?",
       "cozum": "Üçgen alanı: $\\frac{10\\cdot4}{2} = 20$ J."
      }
     ],
     "ozet": [
      "$W = F\\cdot\\Delta x$, birim J, skaler.",
      "Kuvvete dik hareket iş yapmaz.",
      "$F$–$x$ grafiğinin alanı = iş."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "İş, enerji ve güç ilişkisi",
     "en": "Work, energy and power"
    },
    "content": {
     "anlatim": "# Enerji ve İş–Kinetik Enerji Teoremi\n\n**Enerji**, iş yapabilme yeteneğidir; iş ile aynı birime (J) sahiptir.\n\nNet kuvvetin yaptığı iş, kinetik enerjideki değişime eşittir:\n$$W_{net} = \\Delta E_k = E_{k,son} - E_{k,ilk}$$\n\n# Güç\n\nBirim zamanda yapılan iş (ya da harcanan enerji):\n$$P = \\frac{W}{t} = \\frac{E}{t} \\qquad \\text{birim: watt } (W = J/s)$$\n\n# Elektrik Faturası\n\n$$W = P \\cdot t$$\nFaturalarda birim **kilowattsaat** (kWh): $1\\ kWh = 1000\\ W \\times 3600\\ s = 3{,}6\\times10^6\\ J$.",
     "ornekler": [
      {
       "soru": "2000 W'lık bir ısıtıcı günde 3 saat çalışıyor. 30 günde kaç kWh enerji harcar?",
       "cozum": "Günlük $2\\ kW \\times 3\\ h = 6$ kWh; 30 günde $180$ kWh."
      },
      {
       "soru": "Bir vinç 500 N'luk yükü 10 s'de 6 m yükseltiyor. Gücü kaç W'tır?",
       "cozum": "$W = 500\\cdot6 = 3000$ J, $P = \\frac{3000}{10} = 300$ W."
      }
     ],
     "ozet": [
      "$W_{net} = \\Delta E_k$.",
      "$P = W/t$, birim watt.",
      "Elektrik enerjisi $W = P\\cdot t$, kWh."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Enerji biçimleri ve dönüşümleri",
     "en": "Forms of energy and conversions"
    },
    "content": {
     "anlatim": "# Enerji Biçimleri\n\n| Biçim | Açıklama / örnek |\n|---|---|\n| **Mekanik** | Kinetik + potansiyel enerji |\n| **Kimyasal** | Molekül bağlarında depolanır (pil, besin, yakıt) |\n| **Nükleer** | Atom çekirdeğinden **fisyon** (bölünme) ya da **füzyon** (birleşme) ile |\n| **Isı (termal)** | Taneciklerin hareket enerjisi |\n| **Işık** | Elektromanyetik tayf |\n| **Ses** | Mekanik titreşimler |\n| **Elektrik** | Yük hareketi |\n\n# Enerjinin Korunumu\n\nEnerji yoktan var edilemez, var olan yok edilemez; yalnızca **bir biçimden diğerine dönüşür**.\n\n| Araç | Dönüşüm |\n|---|---|\n| Pil | Kimyasal → elektrik |\n| Elektrik motoru | Elektrik → mekanik |\n| Hidroelektrik santral | Potansiyel → kinetik → elektrik |\n| Güneş paneli | Işık → elektrik |",
     "ornekler": [
      {
       "soru": "Bir el feneri pille çalışıyor. Enerji dönüşüm zincirini yazın.",
       "cozum": "Kimyasal (pil) → elektrik → ışık (+ bir miktar ısı)."
      },
      {
       "soru": "Füzyon ile fisyon arasındaki fark nedir?",
       "cozum": "**Fisyon:** ağır çekirdeğin bölünmesi (nükleer santraller). **Füzyon:** hafif çekirdeklerin birleşmesi (Güneş)."
      }
     ],
     "ozet": [
      "Enerji korunur, biçim değiştirir.",
      "Fisyon bölünme, füzyon birleşme.",
      "Her dönüşümde bir kısım ısıya gider."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Mekanik enerji ve korunumu",
     "en": "Mechanical energy and its conservation"
    },
    "content": {
     "anlatim": "# Mekanik Enerji\n\n$$E_m = E_k + E_p$$\n\n| Enerji | Formül |\n|---|---|\n| **Öteleme kinetik enerjisi** | $E_k = \\frac{1}{2}m\\vartheta^2$ |\n| **Yer çekimi potansiyel enerjisi** | $E_p = m\\,g\\,h$ (referans noktasına göre) |\n| **Esneklik potansiyel enerjisi** | $E_{yay} = \\frac{1}{2}k\\,x^2$ ($k$: yay sabiti, $x$: sıkışma/uzama) |\n\n# Mekanik Enerjinin Korunumu\n\n- **Sürtünmesiz** ortamda: $E_{m,ilk} = E_{m,son}$.\n- **Sürtünmeli** ortamda bir kısmı ısıya dönüşür: $E_{m,ilk} = E_{m,son} + E_{ısı}$.\n\n> Serbest düşen cisimde potansiyel enerji azalırken kinetik enerji artar; toplam sabit kalır.",
     "ornekler": [
      {
       "soru": "2 kg'lık cisim 20 m yükseklikten serbest bırakılıyor ($g=10$). Yere çarpma hızı kaçtır?",
       "cozum": "$mgh = \\frac12m\\vartheta^2 \\Rightarrow 10\\cdot20 = \\frac{\\vartheta^2}{2} \\Rightarrow \\vartheta = 20$ m/s."
      },
      {
       "soru": "Yay sabiti 200 N/m olan yay 0,1 m sıkıştırılıyor. Depolanan enerji kaç J'dir?",
       "cozum": "$E = \\frac12\\cdot200\\cdot0{,}01 = 1$ J."
      }
     ],
     "ozet": [
      "$E_k=\\frac12m\\vartheta^2$, $E_p=mgh$, $E_{yay}=\\frac12kx^2$.",
      "Sürtünmesiz: mekanik enerji korunur.",
      "Sürtünmeli: kayıp ısıya dönüşür."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.5",
    "title": {
     "tr": "Enerji kaynakları ve verimlilik",
     "en": "Energy sources and efficiency"
    },
    "content": {
     "anlatim": "# Enerji Kaynakları\n\n| Yenilenebilir | Yenilenemez |\n|---|---|\n| Güneş, rüzgâr, jeotermal, hidrolik, biyokütle, dalga, hidrojen | Fosil yakıtlar (kömür, petrol, doğal gaz), nükleer (uranyum) |\n| Kısa sürede kendini yeniler, çevre dostu | Tükenince yerine konması milyonlarca yıl sürer |\n\n# Çevresel ve Ekonomik Etkiler\n\n- Fosil yakıtlar **sera gazı** ($CO_2$) salarak **küresel ısınma** ve iklim değişikliğine yol açar.\n- Nükleer enerji az yakıtla çok enerji üretir ama **radyoaktif atık** riski taşır.\n\n# Enerji Verimliliği\n\n- **A sınıfı** cihazlar ve **LED** lambalar kullanmak\n- Fişte takılı bırakılan **\"vampir\" cihazları** kapatmak\n- Isı yalıtımı yapmak",
     "ornekler": [
      {
       "soru": "Rüzgâr enerjisinin bir avantajını ve bir dezavantajını yazın.",
       "cozum": "Avantaj: yenilenebilir, sera gazı salmaz. Dezavantaj: rüzgâra bağlı, sürekli değil; görüntü/gürültü etkisi."
      }
     ],
     "ozet": [
      "Yenilenebilir: güneş, rüzgâr, jeotermal, hidrolik, biyokütle.",
      "Fosil yakıt → sera gazı; nükleer → radyoaktif atık.",
      "Verimlilik: A sınıfı, LED, vampir cihazları kapatma."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Elektrik",
   "en": "Unit 3: Electricity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Basit elektrik devreleri ve direnç",
     "en": "Simple circuits and resistance"
    },
    "content": {
     "anlatim": "# Basit Elektrik Devresi\n\n| Eleman | Görevi |\n|---|---|\n| **Üreteç** (pil, akü) | Potansiyel farkı (gerilim) oluşturur, birimi **volt** (V) |\n| **İletken tel** | Akımı iletir |\n| **Anahtar** | Devreyi açar/kapatır; kapalıyken akım geçer |\n| **Direnç / alıcı** | Elektrik enerjisini başka biçime dönüştürür |\n\n# Direnç\n\nİletkenin akıma gösterdiği zorluktur; birimi **ohm** ($\\Omega$):\n$$R = \\rho\\,\\frac{\\ell}{A}$$\n$\\rho$: öz direnç (maddenin cinsi), $\\ell$: boy, $A$: kesit alanı. Uzun ve ince tel → büyük direnç.\n\n### Su tesisatı benzetmesi\n\nPompa = üreteç · boru = iletken · vana = anahtar · daralma/kireçlenme = direnç · su akışı = akım.",
     "ornekler": [
      {
       "soru": "Aynı maddeden yapılmış iki telden birinin boyu 2 katı, kesiti yarısıdır. Dirençleri oranı nedir?",
       "cozum": "$R \\propto \\frac{\\ell}{A}$ → ikinci telin direnci $\\frac{2}{1/2} = 4$ katıdır."
      }
     ],
     "ozet": [
      "Devre: üreteç, iletken, anahtar, direnç.",
      "$R = \\rho\\,\\ell/A$.",
      "Uzun-ince tel direnci büyük."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Elektrik akımı",
     "en": "Electric current"
    },
    "content": {
     "anlatim": "# Elektrik Akımı\n\nİletkenin kesitinden **birim zamanda geçen net yük** miktarıdır:\n$$I = \\frac{q}{t} \\qquad \\text{birim: amper (A)}$$\n\n- Elektronlar **(−) kutuptan (+) kutba** hareket eder.\n- **Geleneksel akım yönü**: (+) kutuptan (−) kutba.\n\n# Farklı Ortamlarda Akım\n\n| Ortam | Yük taşıyıcılar |\n|---|---|\n| **Katılar (metaller)** | Serbest elektronlar |\n| **Sıvılar (elektrolitler)** | Pozitif ve negatif iyonlar (zıt kutuplara göç eder; ör. tuzlu su) |\n| **Gazlar** | Düşük basınç ve yüksek gerilimde iyonlaşan gaz (neon lamba) |",
     "ornekler": [
      {
       "soru": "Bir telden 4 saniyede 12 C yük geçiyor. Akım şiddeti kaç amperdir?",
       "cozum": "$I = \\frac{12}{4} = 3$ A."
      }
     ],
     "ozet": [
      "$I = q/t$, birim amper.",
      "Geleneksel akım + → −; elektronlar − → +.",
      "Metal: elektron; elektrolit: iyon; gaz: iyonlaşma."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Ohm yasası ve ölçü aletleri",
     "en": "Ohm's law and measuring instruments"
    },
    "content": {
     "anlatim": "# Ohm Yasası\n\nSabit sıcaklıkta iletkenin uçları arasındaki potansiyel farkın akıma oranı **sabittir**:\n$$R = \\frac{V}{I} \\qquad V = I\\cdot R$$\n\n- $V$–$I$ grafiği orijinden geçen doğrudur; **eğimi = direnç**.\n- **Reosta:** sürgüsü kaydırılarak direnci değiştirilen ve akımı ayarlayan eleman.\n\n# Ölçü Aletleri\n\n| Alet | Ölçtüğü | İç direnci | Bağlanma |\n|---|---|---|---|\n| **Ampermetre** | Akım | Sıfıra yakın | **Seri** (paralel bağlanırsa kısa devre) |\n| **Voltmetre** | Potansiyel fark | Çok büyük | **Paralel** (seri bağlanırsa akımı engeller) |",
     "ornekler": [
      {
       "soru": "12 V'luk üretece bağlı 4 Ω'luk dirençten geçen akım kaçtır?",
       "cozum": "$I = \\frac{V}{R} = \\frac{12}{4} = 3$ A."
      },
      {
       "soru": "$V$–$I$ grafiğinde 6 V'ta akım 2 A ise direnç kaç ohm'dur?",
       "cozum": "Eğim $= \\frac{6}{2} = 3\\ \\Omega$."
      }
     ],
     "ozet": [
      "$V = IR$.",
      "$V$–$I$ eğimi = $R$.",
      "Ampermetre seri, voltmetre paralel."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Dirençlerin bağlanması",
     "en": "Connecting resistors"
    },
    "content": {
     "anlatim": "# Eşdeğer Direnç\n\nBirden çok direncin yaptığı etkiyi tek başına yapan dirence **eşdeğer direnç** denir.\n\n| | **Seri** | **Paralel** |\n|---|---|---|\n| Akım | Hepsinde aynı: $I = I_1 = I_2$ | Kollara bölünür: $I = I_1 + I_2$ |\n| Gerilim | Paylaşılır: $V = V_1 + V_2$ | Hepsinde aynı: $V = V_1 = V_2$ |\n| Eşdeğer | $R_{eş} = R_1 + R_2 + \\dots$ | $\\dfrac{1}{R_{eş}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$ |\n| Sonuç | $R_{eş}$ en büyükten büyük | $R_{eş}$ en küçükten küçük |\n\n- İki paralel direnç için kısa yol: $R_{eş} = \\dfrac{R_1 R_2}{R_1 + R_2}$.\n- **Birleşik bağlama:** sadeleştirme içten dışa yapılır.\n- **Kısa devre:** Direncin uçlarına direnci ihmal edilebilen bir tel bağlanırsa akım teli tercih eder; o dirençten akım geçmez.",
     "ornekler": [
      {
       "soru": "3 Ω ve 6 Ω'luk dirençler paralel, bunlara 4 Ω seri bağlı. Eşdeğer direnç nedir?",
       "cozum": "Paralel kısım $\\frac{3\\cdot6}{3+6} = 2\\ \\Omega$; toplam $2 + 4 = 6\\ \\Omega$."
      },
      {
       "soru": "Özdeş üç direnç (her biri 9 Ω) paralel bağlanıyor. $R_{eş}$ kaçtır?",
       "cozum": "$\\frac{9}{3} = 3\\ \\Omega$."
      }
     ],
     "ozet": [
      "Seri: akım aynı, $R$ toplanır.",
      "Paralel: gerilim aynı, $1/R$ toplanır.",
      "Kısa devre edilen dirençten akım geçmez."
     ]
    }
   },
   {
    "id": "k5",
    "code": "3.5",
    "title": {
     "tr": "Üreteçlerin bağlanması",
     "en": "Connecting cells"
    },
    "content": {
     "anlatim": "# Üreteçlerin Bağlanması\n\n| Bağlama | Nasıl? | Toplam gerilim | Sonuç |\n|---|---|---|---|\n| **Düz seri** | Zıt kutuplar uç uca (+ → −) | $V_1 + V_2$ | Yüksek gerilim; akım artar, piller çabuk biter |\n| **Ters seri** | Aynı kutuplar birbirine | $V_1 - V_2$ | Gerilimler birbirini azaltır |\n| **Paralel** (özdeş piller) | Aynı kutuplar kendi aralarında | $V$ (tek pil kadar) | Pillerin ömrü uzar |\n\n> **Seri** bağlama yüksek gerilim, **paralel** bağlama uzun ömür sağlar.",
     "ornekler": [
      {
       "soru": "1,5 V'luk 4 pil düz seri bağlanıyor. Toplam gerilim kaçtır? Paralel bağlansaydı?",
       "cozum": "Düz seri: $4\\cdot1{,}5 = 6$ V. Paralel: $1{,}5$ V (ama piller daha uzun süre dayanır)."
      }
     ],
     "ozet": [
      "Düz seri: gerilimler toplanır.",
      "Ters seri: farkı alınır.",
      "Paralel: gerilim aynı, ömür uzun."
     ]
    }
   },
   {
    "id": "k6",
    "code": "3.6",
    "title": {
     "tr": "Akımın tehlikeleri ve topraklama",
     "en": "Dangers of current and earthing"
    },
    "content": {
     "anlatim": "# Elektrik Akımının Tehlikeleri\n\nBilinçsiz kullanımda çarpılma, yanık ve yangın tehlikesi vardır.\n\n- **Vücut direnci:** Kuru deride yüksek (≈ 100 000 – 500 000 Ω), **ıslak/terli** deride çok düşük (≈ 500 – 1000 Ω). Islakken aynı gerilimde geçen akım kat kat artar → tehlike büyür.\n\n# Koruma Yöntemleri\n\n| Yöntem | Görevi |\n|---|---|\n| **Sigorta** | Güvenli sınırın üstünde akımda eriyerek ya da mandal atarak devreyi keser |\n| **Topraklama** | Cihaz gövdesindeki kaçak akımı kablo ve toprak çubuğuyla toprağa aktarır, çarpılmayı önler |\n| **Paratoner (yıldırımsavar)** | Yıldırımın yükünü binaya zarar vermeden toprağa iletir |\n\n### Güvenlik kuralları\n\nIslak elle prize dokunma · çok sayıda cihazı tek prize bağlama · hasarlı kabloyu kullanma · çocuk kilitli priz kullan.",
     "ornekler": [
      {
       "soru": "220 V'a ıslak elle (500 Ω) ve kuru elle (100 000 Ω) dokunulduğunda geçen akımları karşılaştırın.",
       "cozum": "Islak: $\\frac{220}{500} = 0{,}44$ A (öldürücü olabilir). Kuru: $\\frac{220}{100000} = 0{,}0022$ A. Islak elde akım 200 kat büyük."
      }
     ],
     "ozet": [
      "Islak deride direnç düşük → tehlike büyük.",
      "Sigorta aşırı akımda devreyi keser.",
      "Topraklama kaçak akımı toprağa verir."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Dalgalar",
   "en": "Unit 4: Waves"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Periyodik hareketler: sarkaçlar, periyot ve frekans",
     "en": "Periodic motion: pendulums, period and frequency"
    },
    "content": {
     "anlatim": "# Periyodik Hareket\n\nEşit zaman aralıklarında kendini tekrarlayan harekettir.\n\n| Sarkaç | Periyodu neye bağlı? |\n|---|---|\n| **Basit sarkaç** (ipe bağlı kütle) | İpin **uzunluğu** ve **yer çekimi ivmesi** — kütleye bağlı **değil** |\n| **Yay sarkacı** | **Kütle** ve **yay sabiti** |\n\n# Periyot ve Frekans\n\n- **Periyot** $T$: bir tam salınım için geçen süre (s).\n- **Frekans** $f$: bir saniyedeki salınım sayısı (Hz).\n$$T\\cdot f = 1$$",
     "ornekler": [
      {
       "soru": "Bir sarkaç 10 saniyede 40 tam salınım yapıyor. Periyodu ve frekansı nedir?",
       "cozum": "$f = \\frac{40}{10} = 4$ Hz, $T = \\frac14 = 0{,}25$ s."
      },
      {
       "soru": "Basit sarkacın kütlesi iki katına çıkarılırsa periyodu ne olur?",
       "cozum": "Değişmez; basit sarkacın periyodu kütleye bağlı değildir."
      }
     ],
     "ozet": [
      "$T\\cdot f = 1$.",
      "Basit sarkaç: boy ve $g$'ye bağlı.",
      "Yay sarkacı: kütle ve yay sabitine bağlı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Dalgaların temel kavramları",
     "en": "Basic wave concepts"
    },
    "content": {
     "anlatim": "# Dalga\n\nEsnek bir ortamda oluşan titreşimin **enerjiyi** bir noktadan diğerine taşımasıdır (madde taşınmaz).\n\n| Kavram | Tanım |\n|---|---|\n| **Tepe / çukur** | Denge konumunun üstündeki en yüksek / altındaki en alçak nokta |\n| **Dalga boyu** $\\lambda$ | Ardışık iki tepe (ya da çukur) arası uzaklık (m) |\n| **Genlik** $A$ | Denge konumundan en büyük uzaklık; **enerjinin** ölçüsü |\n| **Dalga sürati** $\\vartheta$ | Birim zamanda alınan yol |\n\n$$\\vartheta = \\lambda\\cdot f$$\n\n> **Frekans yalnızca kaynağa**, **sürat yalnızca ortama** bağlıdır. Dalga ortam değiştirince frekans aynı kalır; sürat ve dalga boyu değişir.",
     "ornekler": [
      {
       "soru": "Frekansı 5 Hz, dalga boyu 2 m olan dalganın sürati kaçtır?",
       "cozum": "$\\vartheta = 2\\cdot5 = 10$ m/s."
      },
      {
       "soru": "Ses havadan suya geçerken hangisi değişmez: frekans, sürat, dalga boyu?",
       "cozum": "**Frekans** değişmez (kaynağa bağlı); sürat ve dalga boyu artar."
      }
     ],
     "ozet": [
      "$\\vartheta = \\lambda f$.",
      "Frekans kaynağa, sürat ortama bağlı.",
      "Genlik enerjinin ölçüsü."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Dalgaların sınıflandırılması",
     "en": "Classification of waves"
    },
    "content": {
     "anlatim": "# Taşıdığı Enerjiye Göre\n\n| Mekanik dalgalar | Elektromanyetik dalgalar |\n|---|---|\n| Yayılmak için **maddesel ortam** gerekir | Yüklü parçacıkların ivmeli hareketiyle oluşur |\n| **Boşlukta yayılamaz** | Boşlukta da yayılır |\n| Ses, yay, su, deprem dalgaları | Radyo, mikrodalga, kızılötesi, görünür ışık, morötesi, X, gama |\n\n# Titreşim Doğrultusuna Göre\n\n| Enine | Boyuna |\n|---|---|\n| Titreşim, yayılma doğrultusuna **dik** | Titreşim, yayılma doğrultusuna **paralel** |\n| Işık (tüm EM dalgalar), çırpılan ip | Ses, sıkıştırılıp bırakılan yay |\n\n> Su ve deprem dalgaları hem enine hem boyuna özellik gösterebilir.",
     "ornekler": [
      {
       "soru": "Ses uzay boşluğunda neden duyulmaz?",
       "cozum": "Ses **mekanik** bir dalgadır; yayılmak için madde gerekir, boşlukta yayılamaz."
      }
     ],
     "ozet": [
      "Mekanik: ortam gerekir; EM: boşlukta da yayılır.",
      "Enine: dik; boyuna: paralel.",
      "Ses boyuna, ışık enine."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.4",
    "title": {
     "tr": "Dalgaların yayılma süratini etkileyen etmenler",
     "en": "Factors affecting wave speed"
    },
    "content": {
     "anlatim": "# Yayılma Sürati\n\nDalganın sürati **ortamın** özelliklerine (esneklik, yoğunluk, sıcaklık) bağlıdır.\n\n| Dalga | Sürat |\n|---|---|\n| **Ses** | $\\vartheta_{katı} > \\vartheta_{sıvı} > \\vartheta_{gaz}$; sıcaklık artınca artar (havada ≈ 340 m/s) |\n| **Su dalgası** | Derinlik arttıkça sürat ve dalga boyu artar ($\\vartheta_{derin} > \\vartheta_{sığ}$) |\n| **Elektromanyetik** | Boşlukta en büyük: $c \\approx 3\\cdot10^8$ m/s; yoğun ortamda azalır |",
     "ornekler": [
      {
       "soru": "Şimşeği gördükten 3 s sonra gök gürültüsü duyuluyor. Şimşek yaklaşık kaç m uzakta çakmıştır? (ses 340 m/s)",
       "cozum": "Işık neredeyse anında gelir; $340\\cdot3 = 1020$ m."
      }
     ],
     "ozet": [
      "Ses: katı > sıvı > gaz.",
      "Su dalgası: derin > sığ.",
      "EM dalga boşlukta en hızlı ($3\\cdot10^8$ m/s)."
     ]
    }
   },
   {
    "id": "k5",
    "code": "4.5",
    "title": {
     "tr": "Su dalgalarında yansıma ve kırılma",
     "en": "Reflection and refraction of water waves"
    },
    "content": {
     "anlatim": "# Yansıma\n\nDalganın engele çarpıp **aynı ortama** geri dönmesi.\n- **Gelme açısı = yansıma açısı** ($i = r$, normale göre).\n- Yansımada frekans, sürat ve dalga boyu **değişmez**.\n- Düz engelden yansıma; çukur engel dalgayı **odakta toplar**, tümsek engel **dağıtır**.\n\n# Kırılma\n\nDalganın derin–sığ ortam değiştirirken **hız ve doğrultu** değiştirmesi.\n\n| Derinden sığa | Sığdan derine |\n|---|---|\n| Sürat azalır | Sürat artar |\n| Dalga boyu küçülür ($\\lambda_{derin} > \\lambda_{sığ}$) | Dalga boyu büyür |\n| **Normale yaklaşır** | Normalden uzaklaşır |\n\nFrekans **değişmez**.",
     "ornekler": [
      {
       "soru": "Derin ortamda dalga boyu 4 cm olan dalga sığ ortama geçince 2 cm oluyor. Sürat nasıl değişir?",
       "cozum": "Frekans sabit, $\\vartheta = \\lambda f$ → dalga boyu yarıya indiğine göre sürat de **yarıya** iner."
      }
     ],
     "ozet": [
      "Yansıma: $i = r$, frekans/sürat/dalga boyu aynı.",
      "Derinden sığa: yavaşlar, $\\lambda$ küçülür, normale yaklaşır.",
      "Kırılmada frekans değişmez."
     ]
    }
   },
   {
    "id": "k6",
    "code": "4.6",
    "title": {
     "tr": "Rezonans ve deprem",
     "en": "Resonance and earthquakes"
    },
    "content": {
     "anlatim": "# Rezonans\n\nDışarıdan uygulanan titreşimin frekansı sistemin **doğal frekansına eşit** olduğunda salınım genliğinin **en büyük** değere ulaşmasıdır.\n- Örnekler: salıncağı doğru anda itmek, kadehin sesle kırılması, askerlerin köprüde uygun adım yürümemesi.\n- Deprem dalgalarının frekansı binanın doğal frekansıyla eşleşirse **rezonans yıkıma** yol açabilir.\n\n# Deprem\n\nYer kabuğundaki kırılmalarla oluşan **sismik dalgalar**dır.\n\n| Kavram | Tanım |\n|---|---|\n| **Odak noktası (hiposantr)** | Kırılmanın başladığı yer altındaki nokta |\n| **Merkez üssü (episantr)** | Odak noktasının yeryüzündeki izdüşümü |\n| **Büyüklük** | Açığa çıkan enerjinin ölçüsü; **tek** bir değerdir (Richter / moment büyüklüğü) |\n| **Şiddet** | Yapılara ve çevreye verilen zararın derecesi; **yere göre değişir** (Mercalli) |",
     "ornekler": [
      {
       "soru": "Aynı depremin farklı şehirlerde farklı hasar vermesi büyüklükle mi şiddetle mi ilgilidir?",
       "cozum": "**Şiddet**le. Büyüklük tektir; şiddet uzaklığa, zemine ve yapıya göre değişir."
      }
     ],
     "ozet": [
      "Rezonans: dış frekans = doğal frekans → en büyük genlik.",
      "Hiposantr yer altında, episantr yüzeyde.",
      "Büyüklük tek, şiddet yere göre değişir."
     ]
    }
   }
  ]
 }
];
