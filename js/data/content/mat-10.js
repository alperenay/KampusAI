/* =========================================================
   10. Sınıf Matematik — konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Matematik Ders Kitabı – Ayrıntılı Konu Anlatım Notları" (4 tema).
   Kaynak not kısa olduğu için anlatımlar ders kitabı kapsamında genişletildi; örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/matematik"] = [
 {
  "id": "t1",
  "name": {
   "tr": "1. Tema: Geometrik Şekiller",
   "en": "Theme 1: Geometric Shapes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.1.1",
    "title": {
     "tr": "Dik üçgende trigonometrik oranlar, özdeşlikler ve birim çember",
     "en": "Trigonometric ratios in a right triangle, identities and the unit circle"
    },
    "content": {
     "anlatim": "# Dik Üçgende Trigonometrik Oranlar\n\nBir dik üçgende dar açının trigonometrik oranları **kenar uzunluklarının oranlarıyla** tanımlanır. $\\alpha$ dar açısı için:\n\n| Oran | Tanım |\n|---|---|\n| $\\sin\\alpha$ | $\\dfrac{\\text{karşı dik kenar}}{\\text{hipotenüs}}$ |\n| $\\cos\\alpha$ | $\\dfrac{\\text{komşu dik kenar}}{\\text{hipotenüs}}$ |\n| $\\tan\\alpha$ | $\\dfrac{\\text{karşı}}{\\text{komşu}} = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$ |\n| $\\cot\\alpha$ | $\\dfrac{\\text{komşu}}{\\text{karşı}} = \\dfrac{\\cos\\alpha}{\\sin\\alpha}$ |\n\n> Oranlar üçgenin büyüklüğüne değil, yalnızca **açıya** bağlıdır (benzer üçgenlerde oranlar aynıdır).\n\n# Temel Özdeşlikler\n\n$$\\sin^2\\alpha + \\cos^2\\alpha = 1 \\qquad \\tan\\alpha \\cdot \\cot\\alpha = 1$$\n\n**Tümler açılar:** $\\alpha + \\beta = 90^\\circ$ ise $\\sin\\alpha = \\cos\\beta$ ve $\\tan\\alpha = \\cot\\beta$. Yani $\\sin\\alpha = \\cos(90^\\circ - \\alpha)$.\n\n### Özel açıların değerleri\n\n| | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ |\n|---|---|---|---|\n| $\\sin$ | $\\frac{1}{2}$ | $\\frac{\\sqrt2}{2}$ | $\\frac{\\sqrt3}{2}$ |\n| $\\cos$ | $\\frac{\\sqrt3}{2}$ | $\\frac{\\sqrt2}{2}$ | $\\frac{1}{2}$ |\n| $\\tan$ | $\\frac{\\sqrt3}{3}$ | $1$ | $\\sqrt3$ |\n\n# Birim Çember ve Yönlü Açılar\n\n- Analitik düzlemde **merkezi orijin $(0,0)$, yarıçapı 1** olan çembere **birim çember** denir.\n- **Saat yönünün tersi pozitif**, saat yönü **negatif** yöndür.\n- Birim çember üzerindeki $P(x, y)$ noktası, pozitif $x$ ekseniyle $\\alpha$ açısı yapıyorsa: $x = \\cos\\alpha$, $y = \\sin\\alpha$.",
     "ornekler": [
      {
       "soru": "Bir dik üçgende $\\sin\\alpha = \\frac{3}{5}$ ise $\\cos\\alpha$ ve $\\tan\\alpha$ kaçtır?",
       "cozum": "Karşı dik kenar 3, hipotenüs 5 alınırsa Pisagor'dan komşu dik kenar $\\sqrt{25-9}=4$. Buna göre $\\cos\\alpha=\\frac45$, $\\tan\\alpha=\\frac34$. (Kontrol: $\\frac{9}{25}+\\frac{16}{25}=1$ ✓)"
      },
      {
       "soru": "$\\sin 20^\\circ = a$ ise $\\cos 70^\\circ$ kaçtır?",
       "cozum": "$20^\\circ + 70^\\circ = 90^\\circ$ (tümler açılar) olduğu için $\\cos 70^\\circ = \\sin 20^\\circ = a$."
      }
     ],
     "ozet": [
      "$\\sin=$ karşı/hipotenüs, $\\cos=$ komşu/hipotenüs, $\\tan=$ karşı/komşu.",
      "$\\sin^2\\alpha+\\cos^2\\alpha=1$, $\\tan\\alpha\\cdot\\cot\\alpha=1$.",
      "Tümler açılarda $\\sin\\alpha=\\cos(90^\\circ-\\alpha)$.",
      "Birim çember: merkez $(0,0)$, $r=1$; saat yönünün tersi pozitif."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.1.2",
    "title": {
     "tr": "Üçgende yardımcı elemanlar",
     "en": "Special segments of a triangle"
    },
    "content": {
     "anlatim": "# Üçgende Yardımcı Elemanlar\n\nÜçgenin temel yardımcı elemanları **açıortay, kenarortay, kenar orta dikme ve yükseklik**tir.\n\n| Eleman | Kesim noktası | Özellik |\n|---|---|---|\n| **İç açıortaylar** | İç teğet çemberin merkezi | Kenarlara uzaklığı eşittir ($r$) |\n| **Kenarortaylar** | Ağırlık merkezi $G$ | Kenarortayı köşeden itibaren $2k$ ve $k$ olarak böler |\n| **Kenar orta dikmeler** | Çevrel çemberin merkezi | Köşelere uzaklığı eşittir ($R$) |\n| **Yükseklikler** | Diklik merkezi | — |\n\n### İç açıortay teoremi\n\n$[AD]$, $A$ açısının iç açıortayı ise karşı kenarı **diğer iki kenarın oranında** böler:\n$$\\frac{|AB|}{|AC|} = \\frac{|BD|}{|DC|}$$\n\n### Ağırlık merkezi\n\nKenarortay uzunluğu $V_a$ ise $|AG| = \\frac{2}{3}V_a$, $|GD| = \\frac{1}{3}V_a$.\n\n> Dik üçgende hipotenüse ait kenarortay, hipotenüsün yarısına eşittir.",
     "ornekler": [
      {
       "soru": "$ABC$ üçgeninde $|AB|=6$, $|AC|=9$, $[AD]$ iç açıortay ve $|BC|=10$ ise $|BD|$ kaçtır?",
       "cozum": "$\\frac{|BD|}{|DC|}=\\frac{6}{9}=\\frac{2}{3}$. $|BD|=2k$, $|DC|=3k$, $5k=10 \\Rightarrow k=2$. Buna göre $|BD|=4$."
      },
      {
       "soru": "Bir kenarortayın uzunluğu 12 cm ise ağırlık merkezinin köşeye uzaklığı kaç cm'dir?",
       "cozum": "Ağırlık merkezi kenarortayı $2:1$ böler: $|AG| = \\frac{2}{3}\\cdot 12 = 8$ cm."
      }
     ],
     "ozet": [
      "İç açıortaylar → iç teğet çember merkezi; orta dikmeler → çevrel çember merkezi.",
      "Kenarortaylar ağırlık merkezinde $2:1$ oranında kesişir.",
      "İç açıortay teoremi: $|AB|/|AC| = |BD|/|DC|$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.10.1.3",
    "title": {
     "tr": "Üçgenin alanı",
     "en": "Area of a triangle"
    },
    "content": {
     "anlatim": "# Üçgenin Alanı\n\n### Taban × yükseklik\n\nBir kenar ile o kenara ait yüksekliğin çarpımının yarısı:\n$$A(ABC) = \\frac{a \\cdot h_a}{2}$$\n\n### Sinüs alan teoremi\n\nİki kenarı ve **aralarındaki açı** bilinen üçgenin alanı:\n$$A(ABC) = \\frac{1}{2}\\, b \\cdot c \\cdot \\sin A$$\n\n### Sonuçlar\n\n- Yükseklikleri eşit üçgenlerin alanları **tabanlarıyla** orantılıdır.\n- Kenarortay üçgeni **iki eşit alanlı** üçgene ayırır; üç kenarortay üçgeni **6 eşit alanlı** parçaya böler.\n- Eşkenar üçgenin alanı: $A = \\dfrac{a^2\\sqrt3}{4}$.\n\n# Bir Kenar ve Yükseklik Değişince Alan Nasıl Değişir?\n\nAlan formülü $A = \\dfrac{a\\cdot h_a}{2}$ olduğundan alan, taban ve yükseklikle **doğru orantılıdır**:\n\n| Değişim | Yeni alan |\n|---|---|\n| Taban $k$ katına çıkar, yükseklik aynı | $k \\cdot A$ |\n| Yükseklik $k$ katına çıkar, taban aynı | $k \\cdot A$ |\n| Taban ve yükseklik birlikte $k$ katına çıkar | $k^2 \\cdot A$ |\n| Taban $k$ katına çıkar, yükseklik $\\frac1k$ katına iner | $A$ (değişmez) |\n\n- **Benzer üçgenlerde** benzerlik oranı $k$ ise alanlar oranı $k^2$'dir.\n- Tepe noktası tabana **paralel bir doğru üzerinde** hareket eden üçgenlerin yüksekliği değişmediği için alanları **eşittir**.",
     "ornekler": [
      {
       "soru": "İki kenarı 6 cm ve 8 cm, aralarındaki açı $30^\\circ$ olan üçgenin alanı kaç cm²'dir?",
       "cozum": "$A = \\frac12 \\cdot 6 \\cdot 8 \\cdot \\sin 30^\\circ = 24 \\cdot \\frac12 = 12$ cm²."
      },
      {
       "soru": "Bir kenarı 4 birim olan eşkenar üçgenin alanı nedir?",
       "cozum": "$A = \\frac{4^2\\sqrt3}{4} = 4\\sqrt3$ birimkare."
      },
      {
       "soru": "Tabanı 10 cm, yüksekliği 6 cm olan bir üçgenin tabanı %20 artırılıp yüksekliği %20 azaltılırsa alan nasıl değişir?",
       "cozum": "Yeni alan $= \\dfrac{(1{,}2\\cdot 10)(0{,}8\\cdot 6)}{2} = \\dfrac{12\\cdot 4{,}8}{2} = 28{,}8$ cm². İlk alan $30$ cm² idi; alan $1{,}2\\cdot 0{,}8 = 0{,}96$ katına iner, yani **%4 azalır**."
      }
     ],
     "ozet": [
      "$A = \\frac{a\\cdot h_a}{2}$.",
      "$A = \\frac12 bc\\sin A$ (iki kenar ve arasındaki açı).",
      "Kenarortay alanı ikiye böler.",
      "Eşkenar üçgen: $\\frac{a^2\\sqrt3}{4}$.",
      "Taban ve yükseklik birlikte k katına çıkarsa alan k² katına çıkar."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.10.1.4",
    "title": {
     "tr": "Sinüs ve kosinüs teoremleri",
     "en": "The laws of sines and cosines"
    },
    "content": {
     "anlatim": "# Sinüs Teoremi\n\nHerhangi bir üçgende kenar uzunluklarının karşı açılarının sinüslerine oranı **sabittir** ve **çevrel çemberin çapına** eşittir:\n$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$\n\n- **Ne zaman?** İki açı + bir kenar ya da iki kenar + birinin karşısındaki açı bilindiğinde.\n\n# Kosinüs Teoremi\n\nÜç kenar ile bir açı arasındaki bağıntı (Pisagor teoreminin genellemesi):\n$$a^2 = b^2 + c^2 - 2bc\\cos A$$\n\n- **Ne zaman?** İki kenar + aradaki açı bilindiğinde üçüncü kenarı ya da üç kenar bilindiğinde bir açıyı bulmak için.\n- $A = 90^\\circ$ ise $\\cos A = 0$ ve teorem **Pisagor**'a dönüşür.\n\n| Bilinenler | Kullanılacak teorem |\n|---|---|\n| 2 açı + 1 kenar | Sinüs |\n| 2 kenar + aradaki açı | Kosinüs |\n| 3 kenar | Kosinüs |",
     "ornekler": [
      {
       "soru": "$ABC$ üçgeninde $b=5$, $c=8$, $m(\\hat A)=60^\\circ$ ise $a$ kaçtır?",
       "cozum": "$a^2 = 25 + 64 - 2\\cdot5\\cdot8\\cdot\\cos60^\\circ = 89 - 40 = 49$, $a = 7$."
      },
      {
       "soru": "$a = 10$ ve $m(\\hat A) = 30^\\circ$ ise çevrel çemberin yarıçapı kaçtır?",
       "cozum": "$\\frac{a}{\\sin A} = 2R \\Rightarrow \\frac{10}{1/2} = 20 = 2R$, $R = 10$."
      }
     ],
     "ozet": [
      "Sinüs teoremi: $\\frac{a}{\\sin A}=2R$.",
      "Kosinüs teoremi: $a^2=b^2+c^2-2bc\\cos A$.",
      "$A=90^\\circ$ iken kosinüs teoremi Pisagor olur."
     ]
    }
   },
   {
    "id": "k5",
    "code": "MAT.10.1.Ek",
    "title": {
     "tr": "Çemberde açılar, yay ve kiriş",
     "en": "Angles, arcs and chords in a circle"
    },
    "content": {
     "anlatim": "# Çemberin Temel Elemanları\n\n- **Yarıçap** $r$, **çap** $2r$, **kiriş** (çember üzerindeki iki noktayı birleştiren doğru parçası), **yay**, **teğet**.\n- Çevre $= 2\\pi r$, daire alanı $= \\pi r^2$.\n- **Yay uzunluğu:** $\\ell = 2\\pi r \\cdot \\dfrac{\\alpha}{360^\\circ}$ · **Daire dilimi alanı:** $A = \\pi r^2 \\cdot \\dfrac{\\alpha}{360^\\circ}$\n\n# Çemberde Açılar\n\n| Açı | Köşesi | Ölçüsü |\n|---|---|---|\n| **Merkez açı** | Merkezde | Gördüğü yayın ölçüsüne **eşit** |\n| **Çevre açı** | Çember üzerinde | Gördüğü yayın **yarısı** |\n| **Teğet–kiriş açı** | Çember üzerinde (teğet + kiriş) | Gördüğü yayın **yarısı** |\n| **İç açı** | Çemberin içinde | Gördüğü yayların **toplamının yarısı** |\n| **Dış açı** | Çemberin dışında | Gördüğü yayların **farkının yarısı** |\n\n# Önemli Sonuçlar\n\n- **Çapı gören çevre açı** $90^\\circ$'dir (Thales).\n- **Aynı yayı gören** çevre açılar eşittir.\n- Merkezden kirişe inen dikme kirişi **ortalar**.\n- Dış noktadan çizilen iki teğet parçasının uzunlukları **eşittir**.\n- **Kirişler dörtgeninde** karşılıklı açıların toplamı $180^\\circ$'dir.",
     "ornekler": [
      {
       "soru": "Bir çemberde $100^\\circ$'lik yayı gören çevre açı ile merkez açının ölçüleri nedir?",
       "cozum": "Merkez açı yayın ölçüsüne eşit: $100^\\circ$. Çevre açı yarısı: $50^\\circ$."
      },
      {
       "soru": "Yarıçapı $6$ cm olan bir çemberde $60^\\circ$'lik merkez açının gördüğü yayın uzunluğu kaç cm'dir? ($\\pi = 3$)",
       "cozum": "$\\ell = 2\\pi r\\cdot\\frac{60}{360} = 2\\cdot3\\cdot6\\cdot\\frac16 = 6$ cm."
      }
     ],
     "ozet": [
      "Merkez açı = yay; çevre açı = yay/2.",
      "Çapı gören çevre açı $90^\\circ$.",
      "Yay uzunluğu $2\\pi r\\cdot\\alpha/360$."
     ]
    }
   }
  ]
 },
 {
  "id": "t2",
  "name": {
   "tr": "2. Tema: İstatistiksel Araştırma Süreci",
   "en": "Theme 2: Statistical Investigation"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.2.1",
    "title": {
     "tr": "İki kategorik değişkenli veriler",
     "en": "Data with two categorical variables"
    },
    "content": {
     "anlatim": "# İki Kategorik Değişkenli Veriler\n\n**Kategorik değişken:** Değerleri sayı değil, sınıf/grup olan değişken (cinsiyet, okul türü, tercih edilen spor…).\n\nİki kategorik değişken arasındaki ilişkiyi incelemek için:\n1. Uygun bir **istatistiksel araştırma sorusu** oluşturulur (ör. \"Lise türü ile kitap okuma alışkanlığı arasında bir ilişki var mı?\").\n2. Veriler **iki yönlü (çapraz) tabloda** özetlenir.\n3. **Kümeli sütun grafiği** ile görselleştirilir.\n4. **Koşullu göreli sıklıklar** hesaplanarak eğilimler yorumlanır.\n\n### Örnek çapraz tablo\n\n| | Kitap okur | Okumaz | Toplam |\n|---|---|---|---|\n| Fen lisesi | 30 | 10 | 40 |\n| Anadolu lisesi | 36 | 24 | 60 |\n| **Toplam** | 66 | 34 | 100 |\n\n**Koşullu göreli sıklık:** Fen lisesi öğrencilerinin okuma oranı $\\frac{30}{40} = 0{,}75$; Anadolu lisesi öğrencilerininki $\\frac{36}{60} = 0{,}60$.\n\n> Gözlenen ilişki **nedensellik** anlamına gelmez; yalnızca bir **eğilim** gösterir.",
     "ornekler": [
      {
       "soru": "Yukarıdaki tabloya göre kitap okuyanların yüzde kaçı Anadolu lisesindendir?",
       "cozum": "Koşul \"kitap okuyanlar\": $\\frac{36}{66} \\approx 0{,}545$ → yaklaşık %55. Hangi gruba göre oran alındığına (koşula) dikkat edilmeli."
      },
      {
       "soru": "\"Spor yapan öğrencilerin notları daha yüksek; demek ki spor notları yükseltiyor.\" Bu çıkarım doğru mudur?",
       "cozum": "Hayır. Veriler yalnızca bir **ilişki/eğilim** gösterir; nedensellik için deneysel çalışma gerekir (başka değişkenler de etkili olabilir)."
      }
     ],
     "ozet": [
      "Çapraz tablo + kümeli sütun grafiği.",
      "Koşullu göreli sıklık = hücre / koşul satırının (sütununun) toplamı.",
      "İlişki ≠ nedensellik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.2.1",
    "title": {
     "tr": "Merkezî eğilim ve yayılım ölçüleri",
     "en": "Measures of central tendency and spread"
    },
    "content": {
     "anlatim": "# Merkezî Eğilim Ölçüleri\n\n| Ölçü | Tanım | Özellik |\n|---|---|---|\n| **Aritmetik ortalama** | $\\bar x = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}$ | **Uç değerlerden** çok etkilenir |\n| **Medyan (ortanca)** | Sıralı verinin **ortasındaki** değer; $n$ çiftse ortadaki iki değerin ortalaması | Uç değerlerden etkilenmez |\n| **Mod (tepe değer)** | **En çok tekrar eden** değer | Birden fazla ya da hiç olmayabilir |\n\n# Yayılım Ölçüleri\n\n- **Açıklık (ranj):** en büyük − en küçük.\n- **Çeyrekler açıklığı:** $Q_3 - Q_1$ (verinin ortadaki %50'sinin yayılımı).\n- **Standart sapma:** Verilerin ortalamadan ortalama uzaklığı.\n$$s = \\sqrt{\\frac{\\sum (x_i - \\bar x)^2}{n-1}}$$\n- Standart sapma **küçükse** veriler ortalama etrafında **toplu**, büyükse **dağınıktır**.\n\n# Dönüşümlerin Etkisi\n\nHer veriye **sabit eklenirse** ortalama, medyan, mod o kadar artar; **açıklık ve standart sapma değişmez**. Her veri $k$ ile **çarpılırsa** hepsi $k$ katına çıkar.",
     "ornekler": [
      {
       "soru": "$3, 7, 7, 9, 14$ verisinin ortalama, medyan, mod ve açıklığını bulunuz.",
       "cozum": "Ortalama $= 40/5 = 8$; medyan $= 7$; mod $= 7$; açıklık $= 14 - 3 = 11$."
      },
      {
       "soru": "İki sınıfın matematik ortalamaları $70$; A sınıfının standart sapması $5$, B'ninki $15$. Hangisi daha homojendir?",
       "cozum": "Standart sapması **küçük olan A sınıfı** daha homojendir; notlar ortalamaya daha yakındır."
      }
     ],
     "ozet": [
      "Ortalama uç değerden etkilenir; medyan etkilenmez.",
      "Açıklık = maks − min; çeyrekler açıklığı $Q_3 - Q_1$.",
      "Sabit eklemek standart sapmayı değiştirmez."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.10.2.1",
    "title": {
     "tr": "Veri gösterimi: histogram ve kutu grafiği",
     "en": "Data displays: histograms and box plots"
    },
    "content": {
     "anlatim": "# Grafik Seçimi\n\n| Grafik | Uygun veri |\n|---|---|\n| **Sütun / çubuk** | Kategorik veriler karşılaştırması |\n| **Daire** | Bütünün parçaları (yüzdeler) |\n| **Çizgi** | Zamana bağlı değişim |\n| **Histogram** | Sürekli sayısal verinin **gruplanmış** dağılımı |\n| **Kutu grafiği** | Beş sayı özeti ve **aykırı değerler** |\n| **Serpme (saçılım)** | İki sayısal değişken arasındaki **ilişki** |\n\n# Histogram Hazırlama\n\n1. Açıklık bulunur. 2. **Grup sayısı** seçilir. 3. **Grup genişliği** $\\ge \\dfrac{\\text{açıklık}}{\\text{grup sayısı}}$ (tam sayıya yuvarlanır). 4. Frekanslar sayılır; sütunlar **bitişik** çizilir.\n\n# Kutu Grafiği (Beş Sayı Özeti)\n\n**En küçük – $Q_1$ – medyan – $Q_3$ – en büyük**\n- Kutu $Q_1$'den $Q_3$'e uzanır; içindeki çizgi **medyandır**.\n- **Aykırı değer:** $Q_1 - 1{,}5\\cdot \\text{ÇA}$'dan küçük ya da $Q_3 + 1{,}5\\cdot \\text{ÇA}$'dan büyük değer ($\\text{ÇA} = Q_3 - Q_1$).\n- Medyan kutunun **sol tarafına yakınsa** dağılım sağa çarpıktır.\n\n# Daire Grafiği Açısı\n\n$$\\text{Merkez açı} = \\frac{\\text{kategori frekansı}}{\\text{toplam}} \\times 360^\\circ$$",
     "ornekler": [
      {
       "soru": "$40$ öğrencinin $10$'u bisikletle okula geliyor. Daire grafiğinde bu dilimin merkez açısı kaç derecedir?",
       "cozum": "$\\frac{10}{40}\\cdot360^\\circ = 90^\\circ$."
      },
      {
       "soru": "Beş sayı özeti $12, 20, 25, 30, 58$ olan veride $58$ aykırı değer midir?",
       "cozum": "$\\text{ÇA} = 30 - 20 = 10$; üst sınır $30 + 1{,}5\\cdot10 = 45$. $58 > 45$ olduğundan **aykırı değerdir**."
      }
     ],
     "ozet": [
      "Histogram: sürekli veri, bitişik sütunlar.",
      "Kutu grafiği: min, $Q_1$, medyan, $Q_3$, maks.",
      "Aykırı değer: $Q_3 + 1{,}5\\,\\text{ÇA}$ üstü ya da $Q_1 - 1{,}5\\,\\text{ÇA}$ altı."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.10.2.2",
    "title": {
     "tr": "Başkalarının iki kategorik değişkenli veri yorumlarını tartışma",
     "en": "Discussing others' conclusions about two-categorical-variable data"
    },
    "content": {
     "anlatim": "# Başkalarının Yorumlarını Eleştirel Değerlendirme\n\nHaberlerde, reklamlarda ve sosyal medyada **iki kategorik değişken** arasındaki ilişkiye dayanan pek çok iddia görürüz: *\"Kahvaltı yapan öğrencilerin başarısı daha yüksek.\"* Bu iddiaları **istatistiksel gerekçeyle kabul ya da reddetmek** gerekir.\n\n# Kontrol Listesi\n\n1. **Veri nasıl toplandı?** Örneklem **yeterince büyük** ve **temsil edici** mi? (Sadece bir okulun öğrencileri tüm Türkiye'yi temsil etmez.)\n2. **Doğru oranlar mı karşılaştırılıyor?** Ham sayılar değil, **satır ya da sütun yüzdeleri** (koşullu göreli sıklıklar) karşılaştırılmalıdır.\n3. **Grafik yanıltıcı mı?** Eksenin sıfırdan başlamaması, farklı ölçekler, 3B pasta grafikler farkları büyütebilir.\n4. **İlişki = neden mi?** İki değişken birlikte değişse de biri diğerinin **nedeni olmayabilir**; üçüncü bir değişken (ör. aile geliri, uyku düzeni) ikisini birden etkileyebilir.\n5. **Genelleme sınırı aşılıyor mu?** Sonuç yalnızca verinin toplandığı **bağlam** için geçerlidir.\n\n# Yaygın Hatalar ve Yanlılıklar\n\n| Hata | Açıklama |\n|---|---|\n| **Ham sayı yanılgısı** | Grup büyüklükleri farklıyken sayıları karşılaştırmak |\n| **Seçim yanlılığı** | Yalnızca gönüllülerden ya da belirli bir gruptan veri almak |\n| **Nedensellik yanılgısı** | Birliktelikten neden–sonuç çıkarmak |\n| **Simpson paradoksu** | Alt gruplarda görülen eğilimin gruplar birleştirilince **tersine dönmesi** |\n| **Yanlış ölçek** | Sütun grafikte eksenin kırpılmasıyla farkın abartılması |\n\n# Kabul mü, Ret mi?\n\nBir yorumu **kabul ederken** hangi oranların onu desteklediğini, **reddederken** hangi hatayı içerdiğini **verilerle** gösteririz. Gerekirse tabloyu yeniden düzenleyip doğru oranları hesaplarız.",
     "ornekler": [
      {
       "soru": "Bir anket şirketi: “Okul kantininden alışveriş yapan 300 öğrenciden 180'i, yapmayan 100 öğrenciden 40'ı spor yapıyor. Demek ki kantin alışverişi spor yapmayı artırıyor.” diyor. Bu yorumu değerlendiriniz.",
       "cozum": "Koşullu oranlar: kantin kullananlarda $\\frac{180}{300} = \\%60$, kullanmayanlarda $\\frac{40}{100} = \\%40$. Oranlar arasında bir **ilişki** var; ancak bu **nedensellik** göstermez. Örneğin spor yapan öğrenciler okulda daha uzun kaldıkları için kantini daha çok kullanıyor olabilir. Yorum, *“artırıyor”* ifadesi nedeniyle **reddedilir**."
      },
      {
       "soru": "Bir haberde iki ilçedeki “kitap okuyan öğrenci sayısı” karşılaştırılıyor: A ilçesinde 900, B ilçesinde 600 öğrenci kitap okuyor ve “A ilçesindeki öğrenciler daha çok kitap okuyor” deniyor. A'da 3000, B'de 1200 öğrenci varsa yorum doğru mudur?",
       "cozum": "Ham sayılar yanıltıcıdır. Oranlar: A'da $\\frac{900}{3000} = \\%30$, B'de $\\frac{600}{1200} = \\%50$. Kitap okuyan öğrenci **oranı B ilçesinde daha yüksektir**; yorum **ham sayı yanılgısı** içerdiği için reddedilir."
      }
     ],
     "ozet": [
      "Başkalarının yorumları satır/sütun yüzdeleriyle (koşullu oranlarla) kontrol edilir.",
      "Örneklem büyüklüğü, temsil ediciliği ve grafik ölçeği sorgulanır.",
      "İki değişken arasındaki ilişki, birinin diğerine neden olduğunu göstermez.",
      "Yorum, gerekçesi verilerle gösterilerek kabul ya da reddedilir."
     ]
    }
   }
  ]
 },
 {
  "id": "t3",
  "name": {
   "tr": "3. Tema: Sayılar",
   "en": "Theme 3: Numbers"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.3.1–2",
    "title": {
     "tr": "Asal çarpanlar, pozitif bölen sayısı, EBOB ve EKOK",
     "en": "Prime factors, number of divisors, GCD and LCM"
    },
    "content": {
     "anlatim": "# Asal Çarpanlara Ayırma\n\nHer pozitif tam sayı $A = p_1^{a}\\cdot p_2^{b}\\cdot p_3^{c}\\cdots$ biçiminde asal çarpanlarına **tek türlü** ayrılır.\n\n# Pozitif Bölen Sayısı (PBS)\n\n$$\\text{PBS}(A) = (a+1)(b+1)(c+1)\\cdots$$\n\n- Tam sayı bölen sayısı $= 2 \\cdot \\text{PBS}$.\n- Asal olmayan bölen sayısı $= \\text{PBS} - (\\text{asal bölen sayısı})$.\n\n# EBOB ve EKOK\n\n- **EBOB:** Ortak asal çarpanların **en küçük** üslüleri çarpılır.\n- **EKOK:** Tüm asal çarpanların **en büyük** üslüleri çarpılır.\n- İki pozitif tam sayı için:\n$$A \\cdot B = \\text{EBOB}(A,B)\\cdot \\text{EKOK}(A,B)$$\n- **Aralarında asal** sayılar: EBOB = 1, EKOK = $A\\cdot B$.\n\n### Problem tipleri\n\n| İpucu | Kullan |\n|---|---|\n| \"En büyük parçalara ayırma, eşit kutulara bölme\" | EBOB |\n| \"Tekrar aynı anda, en az kaç gün sonra\" | EKOK |",
     "ornekler": [
      {
       "soru": "$360$ sayısının pozitif bölen sayısı kaçtır?",
       "cozum": "$360 = 2^3 \\cdot 3^2 \\cdot 5$ → PBS $= (3+1)(2+1)(1+1) = 24$."
      },
      {
       "soru": "İki sayının EBOB'u 6, EKOK'u 72'dir. Sayılardan biri 24 ise diğeri kaçtır?",
       "cozum": "$A\\cdot B = 6 \\cdot 72 = 432$ → $B = 432 / 24 = 18$."
      },
      {
       "soru": "Bir zil 12 dakikada, diğeri 18 dakikada bir çalıyor. Birlikte çaldıktan en az kaç dakika sonra yine birlikte çalarlar?",
       "cozum": "$\\text{EKOK}(12, 18) = 36$ dakika."
      }
     ],
     "ozet": [
      "PBS $= (a+1)(b+1)\\cdots$",
      "$A\\cdot B = \\text{EBOB}\\cdot\\text{EKOK}$",
      "Bölme/parçalama → EBOB; yeniden buluşma → EKOK."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.3.3",
    "title": {
     "tr": "Bölünebilme kuralları",
     "en": "Divisibility rules"
    },
    "content": {
     "anlatim": "# Bölünebilme Kuralları\n\nBölünebilme kuralları **basamak çözümlemesine** ve **kalan aritmetiğine** dayanır. $abcd = 1000a + 100b + 10c + d$.\n\n| Bölen | Kural | Kalan nasıl bulunur? |\n|---|---|---|\n| **2** | Son basamak çift | Son basamağın 2'ye bölümünden kalan |\n| **3** | Rakamlar toplamı 3'ün katı | Rakamlar toplamının 3'e bölümünden kalan |\n| **4** | Son iki basamak 4'ün katı | Son iki basamağın 4'e bölümünden kalan |\n| **5** | Son basamak 0 ya da 5 | Son basamağın 5'e bölümünden kalan |\n| **8** | Son üç basamak 8'in katı | Son üç basamağın 8'e bölümünden kalan |\n| **9** | Rakamlar toplamı 9'un katı | Rakamlar toplamının 9'a bölümünden kalan |\n| **10** | Son basamak 0 | Son basamak |\n| **11** | Sağdan başlayarak $+ - + -$ işaretli toplam 11'in katı | Bu toplamın 11'e bölümünden kalan |\n\n### Neden işe yarar?\n\n$10 \\equiv 1 \\pmod 9$ olduğundan $10^n \\equiv 1$; bu yüzden sayı, rakamlar toplamıyla aynı kalanı verir (3 için de aynı).\n\n### Birleşik bölünebilme\n\nAralarında asal sayıların çarpımına bölünebilme: **6** → 2 ve 3; **12** → 3 ve 4; **15** → 3 ve 5; **36** → 4 ve 9.",
     "ornekler": [
      {
       "soru": "$5a72$ dört basamaklı sayısı 9 ile tam bölünebiliyorsa $a$ kaçtır?",
       "cozum": "Rakamlar toplamı $5+a+7+2 = 14+a$ 9'un katı olmalı → $a = 4$."
      },
      {
       "soru": "$7348$ sayısının 8 ile bölümünden kalan kaçtır?",
       "cozum": "Son üç basamak $348 = 8\\cdot43 + 4$ → kalan **4**."
      }
     ],
     "ozet": [
      "3 ve 9: rakamlar toplamı; 4: son iki basamak; 8: son üç basamak.",
      "11: sağdan $+,-,+,-$ ile toplam.",
      "Aralarında asal çarpanlara ayrı ayrı bölünebilmeye bak."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.10.3.Ek",
    "title": {
     "tr": "Üslü ve köklü ifadeler",
     "en": "Exponents and radicals"
    },
    "content": {
     "anlatim": "# Üs Kuralları ($a, b \\neq 0$)\n\n| Kural | Örnek |\n|---|---|\n| $a^m \\cdot a^n = a^{m+n}$ | $2^3\\cdot2^4 = 2^7$ |\n| $\\dfrac{a^m}{a^n} = a^{m-n}$ | $\\dfrac{5^6}{5^2} = 5^4$ |\n| $(a^m)^n = a^{mn}$ | $(3^2)^3 = 3^6$ |\n| $(ab)^n = a^n b^n$ | $(2x)^3 = 8x^3$ |\n| $a^0 = 1$, $a^{-n} = \\dfrac{1}{a^n}$ | $4^{-2} = \\dfrac{1}{16}$ |\n| $(-a)^{\\text{çift}} > 0$, $(-a)^{\\text{tek}} < 0$ | $(-2)^4 = 16$, $(-2)^3 = -8$ |\n\n**Dikkat:** $-2^4 = -16$ ama $(-2)^4 = 16$.\n\n# Köklü İfadeler\n\n- $\\sqrt[n]{a^m} = a^{m/n}$ · $\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{ab}$ · $\\dfrac{\\sqrt a}{\\sqrt b} = \\sqrt{\\dfrac ab}$\n- **Kök dışına çıkarma:** $\\sqrt{72} = \\sqrt{36\\cdot2} = 6\\sqrt2$\n- **Toplama:** Yalnızca **kök içleri aynı** terimler toplanır: $3\\sqrt5 + 2\\sqrt5 = 5\\sqrt5$\n- $\\sqrt{x^2} = |x|$\n- **Paydayı rasyonel yapma:** $\\dfrac{1}{\\sqrt3} = \\dfrac{\\sqrt3}{3}$ · $\\dfrac{1}{\\sqrt5 - \\sqrt2} = \\dfrac{\\sqrt5+\\sqrt2}{3}$ (eşleniğiyle çarp)\n\n# Bilimsel Gösterim\n\n$a \\times 10^n$, $1 \\le |a| < 10$: $0{,}00042 = 4{,}2\\times10^{-4}$",
     "ornekler": [
      {
       "soru": "$\\dfrac{2^{10} \\cdot 4^3}{8^5}$ ifadesinin değerini bulunuz.",
       "cozum": "Hepsini 2 tabanına yazalım: $\\frac{2^{10}\\cdot2^6}{2^{15}} = 2^{1} = 2$."
      },
      {
       "soru": "$\\sqrt{50} + \\sqrt{18} - \\sqrt{8}$ işleminin sonucu nedir?",
       "cozum": "$5\\sqrt2 + 3\\sqrt2 - 2\\sqrt2 = 6\\sqrt2$."
      }
     ],
     "ozet": [
      "Aynı tabanda çarpımda üsler toplanır, bölümde çıkarılır.",
      "$\\sqrt[n]{a^m} = a^{m/n}$; $\\sqrt{x^2} = |x|$.",
      "Payda eşleniğiyle çarpılarak rasyonel yapılır."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.10.3.3",
    "title": {
     "tr": "Modüler aritmetik",
     "en": "Modular arithmetic"
    },
    "content": {
     "anlatim": "# Denklik\n\n$a$ ile $b$'nin $m$'ye bölümünden kalanlar eşitse:\n$$a \\equiv b \\pmod m \\iff m \\mid (a - b)$$\nÖrnek: $17 \\equiv 2 \\pmod 5$ çünkü $17 - 2 = 15$, 5'e bölünür.\n\n# İşlem Özellikleri\n\n$a \\equiv b$ ve $c \\equiv d \\pmod m$ ise:\n- $a + c \\equiv b + d$ · $a - c \\equiv b - d$ · $a\\cdot c \\equiv b\\cdot d$ · $a^n \\equiv b^n \\pmod m$\n- **Bölme serbest değildir!**\n\n# Büyük Üslerin Kalanı\n\nKuvvetlerin kalanları **periyodik** tekrar eder; periyot bulunur.\n- $3^n \\pmod 5$: $3, 4, 2, 1, 3, 4, \\dots$ → periyot **4**\n- $3^{2026}$: $2026 = 4\\cdot506 + 2$ → $3^{2026} \\equiv 3^2 \\equiv 4 \\pmod 5$\n\n# Günlük Hayatta\n\n- **Haftanın günleri** (mod 7): Bugün çarşamba ise 100 gün sonra? $100 \\equiv 2 \\pmod 7$ → **cuma**.\n- **Saat** (mod 12 / mod 24), **ISBN ve TC kimlik no** kontrol basamakları.",
     "ornekler": [
      {
       "soru": "$7^{83}$ sayısının $10$ ile bölümünden kalan (birler basamağı) kaçtır?",
       "cozum": "$7^n$ birler basamağı: $7, 9, 3, 1$ (periyot 4). $83 = 4\\cdot20 + 3$ → $7^3$'ün birler basamağı **3**."
      },
      {
       "soru": "Bugün pazartesi ise $45$ gün sonra hangi gündür?",
       "cozum": "$45 \\equiv 3 \\pmod 7$ → pazartesiden 3 gün sonra: **perşembe**."
      }
     ],
     "ozet": [
      "$a \\equiv b \\pmod m \\iff m \\mid (a-b)$.",
      "Toplama, çıkarma, çarpma ve üs alma denkliği korur; bölme korumaz.",
      "Büyük üslerde kalanların periyodu bulunur."
     ]
    }
   }
  ]
 },
 {
  "id": "t4",
  "name": {
   "tr": "4. Tema: Nicelikler ve Değişimler",
   "en": "Theme 4: Quantities and Change"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.4.2",
    "title": {
     "tr": "Karesel fonksiyon ve parabol",
     "en": "The quadratic function and the parabola"
    },
    "content": {
     "anlatim": "# Karesel (İkinci Dereceden) Fonksiyon\n\n$$f(x) = ax^2 + bx + c \\qquad (a \\neq 0)$$\n\nGrafiği bir **parabol**dür. Referans fonksiyon: $f(x) = x^2$.\n\n### Nitel özellikler\n\n| Özellik | Bilgi |\n|---|---|\n| **Kollar** | $a > 0$ yukarı (en küçük değer), $a < 0$ aşağı (en büyük değer) |\n| **Tepe noktası** $T(r, k)$ | $r = -\\dfrac{b}{2a}$, $k = f(r)$ |\n| **Simetri ekseni** | $x = r$ doğrusu |\n| **$y$ eksenini kestiği nokta** | $(0, c)$ |\n| **$x$ eksenini kestiği noktalar** | $ax^2+bx+c=0$ denkleminin kökleri; $\\Delta = b^2 - 4ac$ |\n\n- $\\Delta > 0$: iki noktada keser · $\\Delta = 0$: teğet · $\\Delta < 0$: kesmez.\n\n### Dönüşümler\n\n$f(x) = a(x - r)^2 + k$ biçimi, $y = x^2$ grafiğinin $r$ birim sağa, $k$ birim yukarı ötelenmesi ve $a$ ile genişletilip/daraltılmasıdır.",
     "ornekler": [
      {
       "soru": "$f(x) = x^2 - 6x + 5$ parabolünün tepe noktası nedir?",
       "cozum": "$r = -\\frac{-6}{2} = 3$, $k = f(3) = 9 - 18 + 5 = -4$ → $T(3, -4)$. Kollar yukarı; en küçük değer $-4$."
      },
      {
       "soru": "$f(x) = -2x^2 + 4x + 1$ fonksiyonunun en büyük değeri kaçtır?",
       "cozum": "$r = -\\frac{4}{2\\cdot(-2)} = 1$, $f(1) = -2 + 4 + 1 = 3$."
      }
     ],
     "ozet": [
      "Tepe: $r=-\\frac{b}{2a}$.",
      "$a>0$ kollar yukarı, $a<0$ aşağı.",
      "$\\Delta=b^2-4ac$ ile $x$ eksenini kesme durumu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.4.3–4",
    "title": {
     "tr": "Karekök ve rasyonel referans fonksiyonlar",
     "en": "Square-root and reciprocal reference functions"
    },
    "content": {
     "anlatim": "# Referans Fonksiyonlar\n\n| Fonksiyon | Tanım kümesi | Görüntü kümesi | Grafik |\n|---|---|---|---|\n| **Karekök** $f(x) = \\sqrt{x}$ | $x \\ge 0$ | $y \\ge 0$ | Orijinden başlayıp artarak yavaşlayan eğri |\n| **Rasyonel** $f(x) = \\dfrac{1}{x}$ | $x \\neq 0$ | $y \\neq 0$ | I. ve III. bölgede iki kol (hiperbol) |\n\n### Karekök fonksiyonu\n\n- $(0,0)$, $(1,1)$, $(4,2)$, $(9,3)$ noktalarından geçer.\n- Tanım kümesinde **artandır**; $y = x^2$'nin ($x\\ge0$) tersidir.\n- $f(x) = \\sqrt{x - h} + k$: grafik $h$ sağa, $k$ yukarı ötelenir; tanım kümesi $x \\ge h$.\n\n### $f(x) = \\frac{1}{x}$\n\n- $x = 0$ **düşey asimptot**, $y = 0$ **yatay asimptot**tur.\n- $x$ büyüdükçe $f(x)$ sıfıra yaklaşır ama sıfır olmaz.\n- Her iki aralıkta da ($x<0$ ve $x>0$) **azalandır**.\n- $f(x) = \\frac{1}{x-h} + k$: asimptotlar $x = h$ ve $y = k$ olur.",
     "ornekler": [
      {
       "soru": "$f(x) = \\sqrt{x - 2} + 1$ fonksiyonunun tanım ve görüntü kümesi nedir?",
       "cozum": "$x - 2 \\ge 0 \\Rightarrow x \\ge 2$; $\\sqrt{\\;} \\ge 0$ olduğundan $f(x) \\ge 1$."
      },
      {
       "soru": "$f(x) = \\frac{1}{x+3} - 2$ grafiğinin asimptotları nelerdir?",
       "cozum": "Düşey asimptot $x = -3$, yatay asimptot $y = -2$."
      }
     ],
     "ozet": [
      "$\\sqrt x$: $x\\ge0$, artan.",
      "$\\frac1x$: $x\\neq0$, asimptotlar $x=0$ ve $y=0$.",
      "Öteleme: $(x-h)$ sağa $h$, $+k$ yukarı $k$."
     ]
    }
   },
   {
    "id": "k3",
    "code": "MAT.10.4.6",
    "title": {
     "tr": "İkinci dereceden denklemler ve kök–katsayı ilişkileri",
     "en": "Quadratic equations and relations between roots and coefficients"
    },
    "content": {
     "anlatim": "# Genel Biçim ve Çözüm Yolları\n\n$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$\n1. **Çarpanlara ayırma:** $x^2 - 5x + 6 = (x-2)(x-3) = 0 \\Rightarrow x = 2,\\ 3$\n2. **Tam kareye tamamlama**\n3. **Diskriminant:** $\\Delta = b^2 - 4ac$, $\\quad x_{1,2} = \\dfrac{-b \\pm \\sqrt\\Delta}{2a}$\n\n| $\\Delta$ | Kökler |\n|---|---|\n| $\\Delta > 0$ | İki farklı gerçek kök |\n| $\\Delta = 0$ | Çakışık (eşit) iki kök: $x = -\\dfrac{b}{2a}$ |\n| $\\Delta < 0$ | Gerçek kök yok |\n\n# Kök–Katsayı (Vieta) Bağıntıları\n\n$$x_1 + x_2 = -\\frac{b}{a} \\qquad x_1\\cdot x_2 = \\frac{c}{a}$$\n- $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2$\n- $\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{x_1 + x_2}{x_1x_2}$\n- Kökleri $x_1, x_2$ olan denklem: $x^2 - (x_1 + x_2)x + x_1x_2 = 0$",
     "ornekler": [
      {
       "soru": "$2x^2 - 6x + 1 = 0$ denkleminin kökleri $x_1, x_2$ ise $x_1^2 + x_2^2$ kaçtır?",
       "cozum": "$x_1 + x_2 = 3$, $x_1x_2 = \\frac12$. $x_1^2 + x_2^2 = 9 - 1 = 8$."
      },
      {
       "soru": "$x^2 + 4x + m = 0$ denkleminin çakışık iki kökü varsa $m$ kaçtır?",
       "cozum": "$\\Delta = 16 - 4m = 0 \\Rightarrow m = 4$ (kök $x = -2$)."
      }
     ],
     "ozet": [
      "$\\Delta = b^2 - 4ac$ kök sayısını belirler.",
      "$x_1 + x_2 = -b/a$, $x_1x_2 = c/a$.",
      "Kökleri bilinen denklem: $x^2 - Sx + P = 0$."
     ]
    }
   },
   {
    "id": "k4",
    "code": "MAT.10.4.6",
    "title": {
     "tr": "Mutlak değer ve birinci dereceden eşitsizlikler",
     "en": "Absolute value and linear inequalities"
    },
    "content": {
     "anlatim": "# Mutlak Değer\n\n$$|x| = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases}$$\nSayı doğrusunda $x$'in **0'a uzaklığıdır**; $|a - b|$ ise $a$ ile $b$ arasındaki uzaklıktır.\n- $|x| \\ge 0$, $|-x| = |x|$, $|xy| = |x||y|$, $|x + y| \\le |x| + |y|$\n\n# Mutlak Değerli Denklem ve Eşitsizlikler ($a > 0$)\n\n| İfade | Çözüm |\n|---|---|\n| $\\lvert x\\rvert = a$ | $x = a$ veya $x = -a$ |\n| $\\lvert x\\rvert < a$ | $-a < x < a$ |\n| $\\lvert x\\rvert > a$ | $x < -a$ veya $x > a$ |\n| $\\lvert x - c\\rvert \\le a$ | $c - a \\le x \\le c + a$ (c'ye uzaklığı en çok a) |\n\n# Birinci Dereceden Eşitsizlik\n\n- Her iki tarafa aynı sayı eklenebilir/çıkarılabilir.\n- **Negatif** sayıyla çarpınca/bölünce **yön değişir:** $-2x < 6 \\Rightarrow x > -3$\n- **Aralık gösterimi:** $[2, 5)$ = $2 \\le x < 5$",
     "ornekler": [
      {
       "soru": "$|2x - 3| \\le 7$ eşitsizliğini sağlayan tam sayıların toplamı kaçtır?",
       "cozum": "$-7 \\le 2x - 3 \\le 7 \\Rightarrow -2 \\le x \\le 5$. Tam sayılar $-2, \\dots, 5$; toplam $= 12$."
      },
      {
       "soru": "$3 - 2x > 11$ eşitsizliğinin çözüm kümesini bulunuz.",
       "cozum": "$-2x > 8 \\Rightarrow x < -4$ (negatife bölünce yön değişti) → $(-\\infty, -4)$."
      }
     ],
     "ozet": [
      "$|x|$: sıfıra uzaklık; $|x - c| \\le a$ → $c - a \\le x \\le c + a$.",
      "Negatifle çarpma/bölmede eşitsizlik yönü değişir.",
      "$|x| > a$ → $x < -a$ veya $x > a$."
     ]
    }
   },
   {
    "id": "k5",
    "code": "MAT.10.4.5",
    "title": {
     "tr": "Bileşke ve ters fonksiyon",
     "en": "Composite and inverse functions"
    },
    "content": {
     "anlatim": "# Bileşke Fonksiyon\n\n$$(f \\circ g)(x) = f(g(x))$$\nÖnce **g**, sonra **f** uygulanır. Genelde $f \\circ g \\neq g \\circ f$ (değişme özelliği yok), ama **birleşme** özelliği vardır.\n\n**Örnek:** $f(x) = 2x + 1$, $g(x) = x^2$ → $(f\\circ g)(x) = 2x^2 + 1$, $(g\\circ f)(x) = (2x+1)^2$\n\n# Ters Fonksiyon\n\n$f$ **bire bir ve örten** ise tersi vardır: $f(a) = b \\iff f^{-1}(b) = a$.\n**Bulma adımları:** $y = f(x)$ yaz → $x$'i yalnız bırak → $x$ ile $y$'nin yerini değiştir.\n- $f(x) = 3x - 6 \\Rightarrow x = \\dfrac{y + 6}{3} \\Rightarrow f^{-1}(x) = \\dfrac{x + 6}{3}$\n- $f(x) = \\dfrac{ax + b}{cx + d} \\Rightarrow f^{-1}(x) = \\dfrac{-dx + b}{cx - a}$ (a ile d yer ve işaret değiştirir)\n\n# Özellikler\n\n- $(f \\circ f^{-1})(x) = x$ (**birim fonksiyon**)\n- $(f \\circ g)^{-1} = g^{-1} \\circ f^{-1}$\n- $f$ ve $f^{-1}$ grafikleri $y = x$ doğrusuna göre **simetriktir**.",
     "ornekler": [
      {
       "soru": "$f(x) = x + 3$ ve $g(x) = 2x - 1$ ise $(f \\circ g)(4)$ ve $(g \\circ f)(4)$ değerlerini bulunuz.",
       "cozum": "$g(4) = 7 \\Rightarrow f(7) = 10$. $f(4) = 7 \\Rightarrow g(7) = 13$. Sonuçlar farklı: bileşkede sıra önemlidir."
      },
      {
       "soru": "$f(x) = \\dfrac{2x + 1}{x - 3}$ ise $f^{-1}(x)$ nedir?",
       "cozum": "$a = 2, d = -3$: $f^{-1}(x) = \\frac{3x + 1}{x - 2}$."
      }
     ],
     "ozet": [
      "$(f\\circ g)(x) = f(g(x))$; önce g.",
      "Ters fonksiyon için f bire bir ve örten olmalı.",
      "f ile $f^{-1}$ grafikleri $y = x$'e göre simetrik."
     ]
    }
   },
   {
    "id": "k6",
    "code": "MAT.10.4.1",
    "title": {
     "tr": "Fonksiyon olma koşulları ve fonksiyonların nitel özellikleri",
     "en": "Conditions for being a function and qualitative properties of functions"
    },
    "content": {
     "anlatim": "# Bağıntı Ne Zaman Fonksiyondur?\n\n$A$'dan $B$'ye bir bağıntının **fonksiyon** olması için:\n1. $A$'daki (tanım kümesi) **her eleman** eşlenmelidir — **açıkta eleman kalmamalı**.\n2. Her eleman **yalnız bir** elemanla eşlenmelidir.\n\n**Düşey doğru testi:** Grafiği verilen bir bağıntıda tanım kümesindeki her $x$ için çizilen düşey doğru grafiği **yalnız bir noktada** kesiyorsa bağıntı fonksiyondur. Örneğin $x^2 + y^2 = 1$ çemberi fonksiyon **değildir**.\n\n# Nitel Özellikler\n\n| Özellik | Grafikte nasıl görülür? |\n|---|---|\n| **Tanım kümesi** | Grafiğin $x$ ekseni üzerindeki izdüşümü |\n| **Görüntü kümesi** | Grafiğin $y$ ekseni üzerindeki izdüşümü |\n| **Sıfırlar (kökler)** | Grafiğin $x$ eksenini kestiği noktalar |\n| **İşaret** | $x$ ekseninin üstü: $f(x)>0$; altı: $f(x)<0$ |\n| **Artan / azalan** | Soldan sağa yükselen / alçalan aralıklar |\n| **Maksimum / minimum** | En yüksek / en alçak noktalar (yerel ve mutlak) |\n| **Bire bir** | Yatay doğru testi: her yatay doğru grafiği en çok bir noktada keser |\n| **Örten** | Görüntü kümesi değer kümesine eşittir |\n| **Tek / çift** | Çift: $f(-x)=f(x)$, $y$ eksenine göre simetrik; tek: $f(-x)=-f(x)$, orijine göre simetrik |\n\n# Farklı Gösterimler\n\nBir fonksiyon **sözel**, **tablo**, **cebirsel** (formül) ve **grafik** gösterimle ifade edilebilir. Cebirsel gösterim kesin değer hesaplamayı; grafik gösterim artan–azalan aralıkları, sıfırları ve ekstremumları **bir bakışta** görmeyi sağlar.",
     "ornekler": [
      {
       "soru": "$f(x) = x^3 - 4x$ fonksiyonu tek mi, çift mi? Sıfırlarını bulunuz.",
       "cozum": "$f(-x) = (-x)^3 - 4(-x) = -x^3 + 4x = -f(x)$ olduğundan **tek** fonksiyondur (orijine göre simetrik). Sıfırlar: $x(x^2-4) = 0 \\Rightarrow x \\in \\{-2, 0, 2\\}$."
      },
      {
       "soru": "$f:\\mathbb{R}\\to\\mathbb{R}$, $f(x) = x^2$ fonksiyonu bire bir ve örten midir? Nasıl kısıtlanırsa bire bir ve örten olur?",
       "cozum": "$f(-2) = f(2) = 4$ olduğundan **bire bir değildir**; negatif sayılar görüntü olmadığından **örten değildir**. Tanım kümesi $[0, \\infty)$, değer kümesi $[0, \\infty)$ alınırsa $f$ **bire bir ve örten** olur (bu yüzden tersi $\\sqrt{x}$ tanımlanabilir)."
      }
     ],
     "ozet": [
      "Fonksiyon: tanım kümesindeki her eleman yalnız bir elemanla eşlenir (düşey doğru testi).",
      "Nitel özellikler: tanım–görüntü kümesi, sıfırlar, işaret, artan–azalan, ekstremum, bire bir, örten, tek–çift.",
      "Bire birlik yatay doğru testiyle; tek–çiftlik f(−x) ile kontrol edilir.",
      "Sözel, tablo, cebirsel ve grafik gösterimler birbirini tamamlar."
     ]
    }
   },
   {
    "id": "k7",
    "code": "MAT.10.4.6",
    "title": {
     "tr": "Fonksiyonlarla ifade edilen denklem ve eşitsizlik problemleri",
     "en": "Equation and inequality problems expressed with functions"
    },
    "content": {
     "anlatim": "# Denklem = İki Grafiğin Kesişimi\n\n$f(x) = g(x)$ denkleminin çözümleri, $y=f(x)$ ve $y=g(x)$ grafiklerinin **kesişim noktalarının apsisleridir**. $f(x) > g(x)$ eşitsizliğinin çözümü ise $f$ grafiğinin $g$ grafiğinin **üstünde** kaldığı $x$ değerleridir.\n\n# İkinci Dereceden Eşitsizlikler (İşaret Tablosu)\n\n$ax^2 + bx + c$ ifadesinin işareti kökler dışında $a$ ile **aynı**, kökler arasında $a$ ile **ters**tir.\n1. Kökleri bul ($\\Delta$ ile ya da çarpanlara ayırarak).\n2. Kökleri sayı doğrusuna yerleştir; en sağdan $a$'nın işaretiyle başlayıp çift katlı olmayan kökte işaret değiştir.\n3. İstenen işaretli aralıkları seç.\n\n# Karekök ve Rasyonel Denklemler\n\n- $\\sqrt{f(x)} = g(x)$: Önce **tanım koşulu** $f(x)\\ge 0$ ve $g(x) \\ge 0$; sonra kare alınır. Kare alma **yabancı kök** üretebilir, sonuç mutlaka **denetlenir**.\n- $\\dfrac{p(x)}{q(x)} = 0 \\iff p(x) = 0$ ve $q(x) \\ne 0$.\n- $\\dfrac{p(x)}{q(x)} \\ge 0$ türü eşitsizliklerde payın ve paydanın kökleri birlikte işaret tablosuna yazılır; paydanın kökleri **asla** çözüme dahil edilmez.\n\n# Problem Çözme Adımları\n\n1. Problemdeki nicelikleri değişkenlerle **modelle** (ör. kâr = gelir − maliyet).\n2. Uygun **gösterimi** seç: grafik, tablo ya da cebir.\n3. Çözümü bul ve **bağlama göre yorumla** (negatif uzunluk, kesirli kişi sayısı gibi anlamsız değerler atılır).\n4. Sonucu **başka bir yolla** (grafik ↔ cebir) doğrula.",
     "ornekler": [
      {
       "soru": "$x^2 - x - 6 < 0$ eşitsizliğinin çözüm kümesini bulunuz.",
       "cozum": "$x^2 - x - 6 = (x-3)(x+2)$; kökler $-2$ ve $3$. $a = 1 > 0$ olduğundan ifade kökler **arasında negatiftir**. Çözüm kümesi: $(-2, 3)$."
      },
      {
       "soru": "$\\sqrt{x + 6} = x$ denklemini çözünüz.",
       "cozum": "Koşullar: $x + 6 \\ge 0$ ve $x \\ge 0$. Kare alınırsa $x + 6 = x^2 \\Rightarrow x^2 - x - 6 = 0 \\Rightarrow x = 3$ ya da $x = -2$. $x = -2$, $x \\ge 0$ koşulunu sağlamadığı için **yabancı köktür**. Çözüm: $x = 3$ (denetim: $\\sqrt9 = 3$ ✓)."
      },
      {
       "soru": "Bir firma $x$ adet ürün sattığında kârı $K(x) = -x^2 + 40x - 300$ (bin TL) oluyor. Firma hangi satış aralığında kâr eder?",
       "cozum": "$K(x) > 0 \\iff x^2 - 40x + 300 < 0 \\iff (x-10)(x-30) < 0 \\iff 10 < x < 30$. Firma **11 ile 29 adet** arasında satış yaptığında kâr eder; en büyük kâr tepe noktasında, $x = 20$ adette $K(20) = 100$ bin TL'dir."
      }
     ],
     "ozet": [
      "f(x) = g(x) denkleminin çözümleri grafiklerin kesişim noktalarının apsisleridir.",
      "İkinci dereceden ifade kökler dışında a ile aynı, kökler arasında ters işaretlidir.",
      "Karekök denklemlerinde kare almadan önce tanım koşulu yazılır, yabancı kökler denetlenir.",
      "Rasyonel eşitsizliklerde paydanın kökleri çözüme alınmaz."
     ]
    }
   }
  ]
 },
 {
  "id": "t5",
  "name": {
   "tr": "5. Tema: Sayma, Algoritma ve Bilişim",
   "en": "Theme 5: Counting, Algorithms and Informatics"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.5.1",
    "title": {
     "tr": "Sayma stratejileriyle problem çözme: toplama–çarpma yolu, permütasyon, kombinasyon",
     "en": "Solving problems with counting strategies: sum and product rules, permutations, combinations"
    },
    "content": {
     "anlatim": "# Sayma Problemine Nasıl Başlanır?\n\n1. **Neyi sayıyoruz?** (şifre, sıralama, ekip, yol…)\n2. **Sıra önemli mi?** Önemliyse *sıralama (permütasyon)*, değilse *seçme (kombinasyon)*.\n3. **Tekrar var mı?** Aynı eleman birden fazla kullanılabiliyor mu?\n4. Gerekirse problemi **ağaç şeması, tablo ya da kutu (yuva) modeli** ile görselleştir.\n\n# Temel İlkeler\n\n- **Toplama yolu:** Ayrık durumlardan biri seçilecekse durum sayıları **toplanır** ($m$ yol **veya** $n$ yol → $m+n$).\n- **Çarpma yolu:** Ardışık ve bağımsız adımlar yapılacaksa **çarpılır** ($m$ yol **ve** $n$ yol → $m\\cdot n$).\n\n# Faktöriyel\n\n$$n! = n\\cdot(n-1)\\cdots 2\\cdot 1, \\qquad 0! = 1$$\n$n$ farklı nesne bir sıraya $n!$ farklı biçimde dizilir.\n\n# Sıralama (Permütasyon)\n\n$n$ farklı nesneden $r$ tanesinin **sıralı** dizilişleri:\n$$P(n,r) = \\frac{n!}{(n-r)!}$$\n- **Tekrarlı elemanlı** sıralama: $n$ nesnede $n_1, n_2, \\dots$ tane özdeş varsa $\\dfrac{n!}{n_1!\\,n_2!\\cdots}$\n- **Dairesel** sıralama: $n$ farklı nesne bir daire etrafına $(n-1)!$ biçimde dizilir.\n\n# Seçme (Kombinasyon)\n\n$n$ farklı nesneden **sırasız** $r$ tanesinin seçilmesi:\n$$C(n,r) = \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}$$\nÖzellikler: $\\binom{n}{r} = \\binom{n}{n-r}$, $\\binom{n}{0} = \\binom{n}{n} = 1$, $\\binom{n}{1} = n$.\n\n# Strateji Seçimi\n\n| Durum | Strateji |\n|---|---|\n| \"En az bir\" | **Tümleme:** Tüm durumlar $-$ hiç olmayan durumlar |\n| \"Yan yana olsun\" | Birlikte olacakları **tek blok** say, sonra blok içini sırala |\n| \"Yan yana olmasın\" | Tüm durumlar $-$ yan yana olanlar |\n| Ekip/komite | Kombinasyon; koşullu gruplar ayrı ayrı seçilip çarpılır |",
     "ornekler": [
      {
       "soru": "5 kız ve 4 erkek öğrenci arasından 2 kız ve 2 erkekten oluşan 4 kişilik bir ekip kaç farklı şekilde seçilebilir?",
       "cozum": "Sıra önemli değil → kombinasyon. Kızlar $\\binom52 = 10$, erkekler $\\binom42 = 6$; çarpma yolu ile $10 \\cdot 6 = 60$ farklı ekip."
      },
      {
       "soru": "KALEM kelimesinin harfleri yer değiştirilerek anlamlı ya da anlamsız 5 harfli kaç kelime yazılabilir? Bunların kaçında A ile E yan yanadır?",
       "cozum": "5 farklı harf: $5! = 120$ kelime. A ile E'yi tek blok sayarsak 4 nesne: $4! = 24$; blok içi $2! = 2$. Yan yana olanlar $24\\cdot 2 = 48$."
      },
      {
       "soru": "Rakamları farklı, 4 basamaklı kaç tane çift doğal sayı yazılabilir?",
       "cozum": "**Durumlara ayır** (0'ın birler basamağında olup olmamasına göre). Birler basamağı 0 ise: kalan 3 basamak $9\\cdot8\\cdot7 = 504$. Birler basamağı 2, 4, 6 ya da 8 ise (4 yol): binler basamağı 0 olamaz ve birlerdekinden farklı → 8 yol, sonra $8 \\cdot 7$: $4\\cdot 8\\cdot 8\\cdot 7 = 1792$. Toplam: $504 + 1792 = 2296$."
      }
     ],
     "ozet": [
      "Sıra önemliyse permütasyon P(n,r) = n!/(n−r)!, önemli değilse kombinasyon C(n,r) = n!/(r!(n−r)!).",
      "Ayrık durumlar toplanır, ardışık adımlar çarpılır.",
      "“En az bir” sorularında tümleme; “yan yana” sorularında blok yöntemi kullanılır.",
      "Özdeş elemanlı sıralamada n! özdeşlerin faktöriyellerine bölünür; dairesel sıralama (n−1)!'dir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.5.2",
    "title": {
     "tr": "Cebirsel ve fonksiyonel işlemlerin algoritmik yapısı",
     "en": "Algorithmic structure of algebraic and functional operations"
    },
    "content": {
     "anlatim": "# Algoritma Nedir?\n\n**Algoritma**, bir problemi çözmek için izlenen **sonlu, sıralı ve açık** adımlar dizisidir. Her adım kesin olmalı, belirli bir **girdi** ile başlayıp belirli bir **çıktı** ile bitmelidir.\n\n# Temel Yapılar\n\n| Yapı | Anlamı | Örnek |\n|---|---|---|\n| **Sıralı (ardışık)** | Adımlar sırayla yapılır | Oku $x$ → $y = 2x+1$ hesapla → yaz $y$ |\n| **Karar (koşul)** | Bir koşula göre farklı yol izlenir | **Eğer** $\\Delta < 0$ **ise** \"reel kök yok\" yaz |\n| **Döngü (tekrar)** | Bir koşul sağlanana kadar adımlar tekrarlanır | $i = 1$'den $n$'ye kadar topla |\n\nAlgoritmalar **sözde kod** (adım adım yazı) ya da **akış şeması** ile gösterilir: oval = başla/bitir, paralelkenar = girdi/çıktı, dikdörtgen = işlem, eşkenar dörtgen = karar.\n\n# Cebirsel İşlemlerin Algoritması: İkinci Dereceden Denklem\n\n```\n1. Başla; a, b, c değerlerini oku (a ≠ 0)\n2. D ← b·b − 4·a·c\n3. Eğer D < 0 ise \"Reel kök yok\" yaz, 6'ya git\n4. Eğer D = 0 ise x ← −b / (2a) yaz \"çakışık kök\", 6'ya git\n5. x1 ← (−b − √D)/(2a); x2 ← (−b + √D)/(2a); x1, x2 yaz\n6. Bitir\n```\n\n# Fonksiyonel İşlemlerin Algoritması\n\n- **Fonksiyon değeri:** Bir fonksiyon, girdi alıp çıktı üreten bir **alt algoritma** gibidir: `f(x): döndür 3·x − 2`.\n- **Bileşke:** $(f\\circ g)(x)$ hesaplanırken önce `g` çalıştırılır, çıktısı `f`'ye girdi olur.\n- **Faktöriyel (döngü):** `s ← 1; i = 1'den n'ye kadar: s ← s·i`.\n- **Özyineleme:** $n! = n\\cdot(n-1)!$; $0! = 1$ durma koşuludur.\n\n# Bilişimle Bağlantı\n\nHesap makineleri, elektronik tablolar ve programlama dilleri bu yapıları kullanır. Bir algoritmayı **test etmek** için farklı girdilerle (sınır durumları dahil: $a = 0$, $\\Delta = 0$) adım adım **iz sürme** yapılır.",
     "ornekler": [
      {
       "soru": "Girilen bir $n$ doğal sayısı için $1 + 2 + \\dots + n$ toplamını hesaplayan bir algoritma yazınız. $n = 5$ için iz sürünüz.",
       "cozum": "```\n1. Oku n\n2. t ← 0, i ← 1\n3. i ≤ n olduğu sürece: t ← t + i; i ← i + 1\n4. Yaz t\n```\n\nİz: $i=1, t=1$; $i=2, t=3$; $i=3, t=6$; $i=4, t=10$; $i=5, t=15$ → çıktı **15**. Kontrol: $\\frac{n(n+1)}{2} = \\frac{5\\cdot6}{2} = 15$ ✓"
      },
      {
       "soru": "Aşağıdaki algoritmanın $x = -3$ ve $x = 4$ girdileri için çıktılarını bulunuz; algoritma hangi fonksiyonu hesaplar? `1. Oku x  2. Eğer x < 0 ise y ← −x değilse y ← x  3. Yaz y`",
       "cozum": "$x = -3 \\Rightarrow y = 3$; $x = 4 \\Rightarrow y = 4$. Algoritma **mutlak değer fonksiyonunu** $f(x) = \\lvert x \\rvert$ hesaplar: karar yapısı, parçalı tanımlı fonksiyonun iki parçasına karşılık gelir."
      }
     ],
     "ozet": [
      "Algoritma: sonlu, sıralı ve açık adımlar; girdi → işlem → çıktı.",
      "Üç temel yapı: sıralı, karar (eğer–ise), döngü (tekrar).",
      "Parçalı fonksiyonlar karar yapısıyla, toplam ve faktöriyel döngüyle ifade edilir.",
      "Algoritma farklı ve sınır girdilerle iz sürülerek test edilir."
     ]
    }
   }
  ]
 },
 {
  "id": "t6",
  "name": {
   "tr": "6. Tema: Analitik İnceleme",
   "en": "Theme 6: Analytical Examination"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.6.1",
    "title": {
     "tr": "İki nokta arasındaki uzaklık ve doğru parçasını belli oranda bölen nokta",
     "en": "Distance between two points and the point dividing a segment in a given ratio"
    },
    "content": {
     "anlatim": "# Dik Koordinat Sisteminde Uzaklık\n\n$A(x_1, y_1)$ ve $B(x_2, y_2)$ noktaları arasındaki uzaklık, yatay ve düşey farklarla oluşan **dik üçgende Pisagor bağıntısından** elde edilir:\n$$\\lvert AB \\rvert = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n- Noktalar aynı yatay doğrudaysa uzaklık $\\lvert x_2 - x_1 \\rvert$, aynı düşey doğrudaysa $\\lvert y_2 - y_1 \\rvert$ olur.\n- Orijine uzaklık: $\\sqrt{x^2 + y^2}$.\n\n# Orta Nokta\n\n$[AB]$'nin orta noktası:\n$$M\\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$$\n\n# Belli Oranda Bölen Nokta\n\n$C$ noktası $[AB]$'yi $\\dfrac{\\lvert AC \\rvert}{\\lvert CB \\rvert} = \\dfrac{m}{n}$ oranında **içten** bölüyorsa:\n$$C\\left(\\frac{n\\,x_1 + m\\,x_2}{m+n},\\ \\frac{n\\,y_1 + m\\,y_2}{m+n}\\right)$$\n**Dikkat:** Koordinatlarda $A$'ya $n$, $B$'ye $m$ ağırlığı verilir — $C$, **daha büyük ağırlıklı** uca yakındır.\n\n# Üçgenin Ağırlık Merkezi\n\nKöşeleri $A, B, C$ olan üçgenin ağırlık merkezi (kenarortayları $2:1$ oranında böler):\n$$G\\left(\\frac{x_1+x_2+x_3}{3},\\ \\frac{y_1+y_2+y_3}{3}\\right)$$\n\n# Gerçek Hayatta\n\nHaritada iki şehir arasındaki kuş uçuşu uzaklık, bir dronun konumu, iki istasyon arasında belli oranda kurulacak bir aktarma noktası bu bağıntılarla hesaplanır.",
     "ornekler": [
      {
       "soru": "$A(1, 2)$ ve $B(7, 10)$ noktaları arasındaki uzaklığı ve $[AB]$'nin orta noktasını bulunuz.",
       "cozum": "$\\lvert AB \\rvert = \\sqrt{(7-1)^2 + (10-2)^2} = \\sqrt{36 + 64} = 10$ birim. Orta nokta $M\\left(\\frac{1+7}{2}, \\frac{2+10}{2}\\right) = (4, 6)$."
      },
      {
       "soru": "$A(-2, 1)$ ve $B(8, 6)$ veriliyor. $[AB]$ üzerinde $\\lvert AC \\rvert : \\lvert CB \\rvert = 2 : 3$ olacak biçimde alınan $C$ noktasının koordinatları nedir?",
       "cozum": "$m = 2$, $n = 3$: $x_C = \\dfrac{3\\cdot(-2) + 2\\cdot 8}{5} = \\dfrac{10}{5} = 2$, $y_C = \\dfrac{3\\cdot 1 + 2\\cdot 6}{5} = 3$. $C(2, 3)$; $C$, $A$'ya daha yakındır ($\\frac25$ yol)."
      },
      {
       "soru": "Bir haritada okul $O(0,0)$, kütüphane $K(6,8)$ noktasındadır (1 birim = 100 m). Okuldan kütüphaneye giden bir öğrenci yolun $\\frac14$'ünü yürüdüğünde hangi noktadadır ve kaç metre yürümüştür?",
       "cozum": "$\\lvert OK \\rvert = \\sqrt{36+64} = 10$ birim $= 1000$ m. Yolun $\\frac14$'ü: oran $1:3$ → $P\\left(\\frac{3\\cdot0 + 1\\cdot6}{4}, \\frac{3\\cdot0+1\\cdot8}{4}\\right) = (1{,}5;\\ 2)$. Yürünen yol $250$ m."
      }
     ],
     "ozet": [
      "İki nokta arası uzaklık: √((x₂−x₁)² + (y₂−y₁)²) — Pisagor bağıntısından gelir.",
      "Orta nokta koordinatları uç noktaların ortalamasıdır.",
      "m:n oranında içten bölen nokta: ((n·x₁ + m·x₂)/(m+n), (n·y₁ + m·y₂)/(m+n)).",
      "Ağırlık merkezi üç köşe koordinatının ortalamasıdır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.6.2",
    "title": {
     "tr": "Doğrunun eğim açısı, eğimi, denklemi ve iki doğrunun durumu",
     "en": "Inclination angle, slope and equation of a line; relative positions of two lines"
    },
    "content": {
     "anlatim": "# Eğim Açısı ve Eğim\n\nBir doğrunun $x$ ekseninin **pozitif yönüyle** yaptığı açıya **eğim açısı** ($\\alpha$, $0^\\circ \\le \\alpha < 180^\\circ$), bu açının tanjantına **eğim** denir:\n$$m = \\tan\\alpha = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{düşey değişim}}{\\text{yatay değişim}}$$\n| Eğim açısı | Eğim | Doğru |\n|---|---|---|\n| $0^\\circ$ | $m = 0$ | Yatay ($y = b$) |\n| $0^\\circ < \\alpha < 90^\\circ$ | $m > 0$ | Artan (sağa yatık) |\n| $90^\\circ$ | tanımsız | Düşey ($x = a$) |\n| $90^\\circ < \\alpha < 180^\\circ$ | $m < 0$ | Azalan (sola yatık) |\n\n# Doğru Denklemleri\n\n- **Eğim–kesen biçimi:** $y = mx + n$ ($n$: $y$ eksenini kestiği nokta)\n- **Bir noktası ve eğimi bilinen:** $y - y_1 = m(x - x_1)$\n- **İki noktası bilinen:** önce $m$ bulunur, sonra yukarıdaki biçim kullanılır.\n- **Genel biçim:** $ax + by + c = 0$ → $m = -\\dfrac{a}{b}$\n- **Eksenleri kestiği noktalar** $(a, 0)$ ve $(0, b)$ ise: $\\dfrac{x}{a} + \\dfrac{y}{b} = 1$\n\n# İki Doğrunun Birbirine Göre Durumu\n\n$d_1: y = m_1x + n_1$ ve $d_2: y = m_2x + n_2$ için:\n| Durum | Koşul |\n|---|---|\n| **Paralel** | $m_1 = m_2$ ve $n_1 \\ne n_2$ (kesişmez) |\n| **Çakışık** | $m_1 = m_2$ ve $n_1 = n_2$ (sonsuz ortak nokta) |\n| **Kesişen** | $m_1 \\ne m_2$ (tek ortak nokta; denklem sistemi çözülür) |\n| **Dik kesişen** | $m_1 \\cdot m_2 = -1$ |\n\n# Analitik Yaklaşımın Gücü\n\nDik koordinat sistemi, geometrik özellikleri (paralellik, diklik, orta nokta) **cebirsel olarak** kanıtlamayı sağlar. Örneğin bir dörtgenin karşılıklı kenarlarının eğimleri eşitse dörtgen **paralelkenardır**.",
     "ornekler": [
      {
       "soru": "$A(1, 3)$ ve $B(4, 9)$ noktalarından geçen doğrunun eğimini ve denklemini bulunuz.",
       "cozum": "$m = \\dfrac{9-3}{4-1} = 2$. $y - 3 = 2(x - 1) \\Rightarrow y = 2x + 1$."
      },
      {
       "soru": "$d_1: 2x - y + 5 = 0$ ve $d_2: x + 2y - 4 = 0$ doğrularının birbirine göre durumunu belirleyiniz.",
       "cozum": "$m_1 = -\\frac{2}{-1} = 2$, $m_2 = -\\frac12$. $m_1 \\cdot m_2 = 2\\cdot\\left(-\\frac12\\right) = -1$ olduğundan doğrular **dik kesişir**. Kesişim: $y = 2x+5$ ikinci denklemde: $x + 4x + 10 - 4 = 0 \\Rightarrow x = -\\frac65$, $y = \\frac{13}{5}$."
      },
      {
       "soru": "Bir rampa yatayda 12 m ilerlerken 1 m yükseliyor. Rampanın eğimi nedir? Eğim açısı yaklaşık kaç derecedir? ($\\tan 4{,}8^\\circ \\approx 0{,}083$)",
       "cozum": "$m = \\dfrac{1}{12} \\approx 0{,}083$; eğim açısı $\\alpha \\approx 4{,}8^\\circ$. Engelli rampalarında eğimin **%8,33'ü (1/12)** aşmaması bu yüzden önerilir."
      }
     ],
     "ozet": [
      "Eğim m = tan α = (y₂ − y₁)/(x₂ − x₁); yatay doğruda 0, düşey doğruda tanımsız.",
      "Doğru denklemi: y − y₁ = m(x − x₁) ya da y = mx + n; ax + by + c = 0 ise m = −a/b.",
      "Paralel: eğimler eşit; çakışık: denklemler denk; dik: m₁·m₂ = −1.",
      "Koordinat sistemi geometrik özelliklerin cebirsel incelenmesini sağlar."
     ]
    }
   }
  ]
 },
 {
  "id": "t7",
  "name": {
   "tr": "7. Tema: Veriden Olasılığa",
   "en": "Theme 7: From Data to Probability"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "MAT.10.7.1",
    "title": {
     "tr": "Koşullu olasılık, bağımlı ve bağımsız olaylar",
     "en": "Conditional probability, dependent and independent events"
    },
    "content": {
     "anlatim": "# Koşullu Olasılık\n\n$B$ olayının gerçekleştiği **bilindiğinde** $A$ olayının olasılığına **koşullu olasılık** denir ve $P(A \\mid B)$ ile gösterilir (“$B$ verilmişken $A$”):\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0$$\nEş olasılıklı örnek uzayda: $P(A \\mid B) = \\dfrac{s(A \\cap B)}{s(B)}$ — yani **örnek uzay $B$'ye daralır**.\n\n# Çarpma Kuralı\n\n$$P(A \\cap B) = P(B)\\cdot P(A \\mid B) = P(A)\\cdot P(B \\mid A)$$\nArdışık çekilişlerde (ör. **geri koymadan** top çekme) her adımda kalan duruma göre olasılık güncellenir; **olasılık ağacı** bu hesabı düzenler: dallar boyunca **çarp**, sonuçlar arasında **topla**.\n\n# Bağımlı ve Bağımsız Olaylar\n\n- $A$ ve $B$ **bağımsızdır** $\\iff P(A \\mid B) = P(A) \\iff P(A \\cap B) = P(A)\\cdot P(B)$.\n- Birinin gerçekleşmesi diğerinin olasılığını değiştiriyorsa olaylar **bağımlıdır**.\n- **Geri koyarak** çekilişler bağımsız, **geri koymadan** çekilişler bağımlıdır.\n- **Ayrık** (aynı anda olamayan) olaylar, olasılıkları sıfırdan büyükse **bağımsız değildir**.\n\n# İki Yönlü Tablo ile Koşullu Olasılık\n\n| | Gözlüklü | Gözlüksüz | Toplam |\n|---|---|---|---|\n| Kız | 12 | 18 | 30 |\n| Erkek | 8 | 22 | 30 |\n| Toplam | 20 | 40 | 60 |\n\n$P(\\text{Gözlüklü} \\mid \\text{Kız}) = \\dfrac{12}{30} = 0{,}4$; $P(\\text{Kız} \\mid \\text{Gözlüklü}) = \\dfrac{12}{20} = 0{,}6$. **Dikkat:** $P(A \\mid B)$ ile $P(B \\mid A)$ genellikle **farklıdır**.",
     "ornekler": [
      {
       "soru": "Bir torbada 4 kırmızı ve 6 mavi top var. Geri konmadan art arda iki top çekiliyor. İkisinin de kırmızı olma olasılığı nedir?",
       "cozum": "$P(K_1) = \\frac{4}{10}$; ilk top kırmızıysa torbada 3 kırmızı, 9 top kalır: $P(K_2 \\mid K_1) = \\frac39$. Çarpma kuralı: $P = \\frac{4}{10}\\cdot\\frac{3}{9} = \\frac{12}{90} = \\frac{2}{15}$."
      },
      {
       "soru": "Bir zar atılıyor. Gelen sayının **çift** olduğu biliniyorsa **4'ten büyük** olma olasılığı nedir? “Çift gelme” ile “4'ten büyük gelme” olayları bağımsız mıdır?",
       "cozum": "$B = \\{2,4,6\\}$, $A = \\{5,6\\}$, $A\\cap B = \\{6\\}$. $P(A \\mid B) = \\frac{1}{3}$. $P(A) = \\frac26 = \\frac13$. $P(A\\mid B) = P(A)$ olduğundan olaylar **bağımsızdır** — çift olduğunu bilmek “4'ten büyük” olma olasılığını değiştirmez."
      },
      {
       "soru": "Bir sınıfta öğrencilerin %60'ı İngilizce, %30'u hem İngilizce hem Almanca kursuna gidiyor. İngilizce kursuna giden bir öğrencinin Almanca kursuna da gitme olasılığı nedir?",
       "cozum": "$P(A \\mid İ) = \\dfrac{P(A \\cap İ)}{P(İ)} = \\dfrac{0{,}30}{0{,}60} = 0{,}5$."
      }
     ],
     "ozet": [
      "P(A|B) = P(A∩B)/P(B): B bilindiğinde örnek uzay B'ye daralır.",
      "Çarpma kuralı: P(A∩B) = P(B)·P(A|B); olasılık ağacında dallar boyunca çarpılır.",
      "Bağımsızlık: P(A|B) = P(A) ya da P(A∩B) = P(A)·P(B).",
      "Geri koymadan çekilişler bağımlıdır; P(A|B) ile P(B|A) genellikle farklıdır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "MAT.10.7.2",
    "title": {
     "tr": "Bayes teoremi ve veriye dayalı olasılık tahmini",
     "en": "Bayes' theorem and data-based probability prediction"
    },
    "content": {
     "anlatim": "# Toplam Olasılık\n\nÖrnek uzay ayrık ve hepsini kapsayan $B_1, B_2, \\dots, B_n$ parçalarına ayrılırsa:\n$$P(A) = P(B_1)P(A\\mid B_1) + P(B_2)P(A\\mid B_2) + \\dots + P(B_n)P(A\\mid B_n)$$\n\n# Bayes Teoremi\n\n$A$ olayının gözlendiği bilindiğinde, bunun $B_i$ **nedeninden** kaynaklanma olasılığı:\n$$P(B_i \\mid A) = \\frac{P(B_i)\\cdot P(A \\mid B_i)}{P(A)}$$\n- $P(B_i)$: **önsel** (ön bilgi) olasılık\n- $P(B_i \\mid A)$: **sonsal** (yeni veriyle güncellenmiş) olasılık\n\nBayes teoremi, **yeni bir bilgi geldiğinde inancımızı güncellemenin** matematiksel yoludur.\n\n# Neden Önemli? — Tıbbi Test Örneği\n\nBir hastalık toplumda **%1** oranında görülsün. Test, hastaların **%95**'inde pozitif; sağlıklı kişilerin **%10**'unda da yanlışlıkla pozitif sonuç versin.\n- $P(+) = 0{,}01\\cdot0{,}95 + 0{,}99\\cdot0{,}10 = 0{,}0095 + 0{,}099 = 0{,}1085$\n- $P(\\text{Hasta} \\mid +) = \\dfrac{0{,}0095}{0{,}1085} \\approx 0{,}088$\n\nPozitif sonuç alan birinin gerçekten hasta olma olasılığı yalnızca **yaklaşık %9**'dur! Hastalık nadir olduğu için **yanlış pozitifler** gerçek pozitiflerden çok daha fazladır. Bu yüzden doktorlar ikinci bir test ister.\n\n# Uygulama Alanları\n\nSpam e-posta filtreleri, hava durumu tahmini, kalite kontrol (hangi makinenin hatalı ürettiği), yapay zekâ ve tıbbi tanı Bayes yaklaşımını kullanır.\n\n# Olasılık Ağacıyla Çözüm Adımları\n\n1. İlk dallara **nedenleri** ve önsel olasılıklarını yaz.\n2. İkinci dallara her nedene göre **gözlemin** koşullu olasılıklarını yaz.\n3. Gözlemi içeren yolların çarpımlarını topla → $P(A)$.\n4. İstenen yolun çarpımını $P(A)$'ya böl.",
     "ornekler": [
      {
       "soru": "Bir fabrikada ürünlerin %60'ı A makinesinde, %40'ı B makinesinde üretiliyor. A'nın ürünlerinin %2'si, B'nin ürünlerinin %5'i kusurlu. Rastgele seçilen bir ürün kusurlu çıkarsa B makinesinde üretilmiş olma olasılığı nedir?",
       "cozum": "$P(K) = 0{,}6\\cdot0{,}02 + 0{,}4\\cdot0{,}05 = 0{,}012 + 0{,}020 = 0{,}032$. $P(B \\mid K) = \\dfrac{0{,}020}{0{,}032} = 0{,}625$. Ürünlerin yalnız %40'ını üretmesine rağmen kusurlu bir ürünün **%62,5** olasılıkla B'den geldiği anlaşılır."
      },
      {
       "soru": "Bir e-posta filtresine göre gelen e-postaların %30'u spam. “Ücretsiz” kelimesi spam e-postaların %40'ında, normal e-postaların %5'inde geçiyor. İçinde “ücretsiz” geçen bir e-postanın spam olma olasılığı nedir?",
       "cozum": "$P(Ü) = 0{,}3\\cdot0{,}4 + 0{,}7\\cdot0{,}05 = 0{,}12 + 0{,}035 = 0{,}155$. $P(S \\mid Ü) = \\dfrac{0{,}12}{0{,}155} \\approx 0{,}77$. Kelimeyi görmek, spam olasılığını **%30'dan yaklaşık %77'ye** günceller."
      }
     ],
     "ozet": [
      "Toplam olasılık: P(A) = Σ P(Bᵢ)·P(A|Bᵢ).",
      "Bayes: P(Bᵢ|A) = P(Bᵢ)·P(A|Bᵢ) / P(A) — yeni veriyle önsel olasılık güncellenir.",
      "Nadir durumlarda yanlış pozitifler sonucu büyük ölçüde etkiler (tıbbi test örneği).",
      "Olasılık ağacında gözlemi içeren yollar toplanır, istenen yol bu toplama bölünür."
     ]
    }
   }
  ]
 }
];

/* KAMPUSAI ENRICHMENT 1.64 — generated by tools/apply-enrichment.mjs */
(function(){ const additions=[
  {
    "key": "10/matematik",
    "unit": "t2",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-005",
      "code": "EK.10.005",
      "title": {
        "tr": "Grup ortalamalarını ağırlıklandırma",
        "en": "Weighted group means"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=343",
        "programmeEdition": "supplement-check-current-TYMM",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Grup ortalamalarını ağırlıklandırma\n\nGrupların büyüklükleri farklıysa ortalamalarını doğrudan toplamak yanıltır. Ortalamayı eleman sayısıyla çarp, toplam puanı toplam eleman sayısına böl. Ortalama uç değerlere duyarlıdır; ortanca ve yayılımı da incele. İki grubun birleşik ortalaması grup ortalamalarının arasında kalır; bu kontrol işlem hatalarını yakalar.\n\n### Kontrol ederek öğren\n\n10 kişinin ortalaması 60, 30 kişinin 80. Birleşik ortalama?\n\n**Çözüm yolu:** (10 × 60 + 30 × 80)/40 = 75.\n\n### Dikkat noktaları\n\n- Grup büyüklüğünü ağırlık yap.\n- Ortanca uç değerlere daha dayanıklı.\n- Sonuç iki ortalamanın arasında.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=343)",
        "ornekler": [
          {
            "soru": "10 kişinin ortalaması 60, 30 kişinin 80. Birleşik ortalama?",
            "cozum": "(10 × 60 + 30 × 80)/40 = 75."
          }
        ],
        "ozet": [
          "Grup büyüklüğünü ağırlık yap.",
          "Ortanca uç değerlere daha dayanıklı.",
          "Sonuç iki ortalamanın arasında."
        ]
      }
    }
  }
]; additions.forEach(({key,unit,unitName,lesson})=>{const units=App.data.content[key];let u=units.find(x=>x.id===unit);if(!u){u={id:unit,name:{tr:unitName,en:unitName},outcomes:[]};const at=units.findIndex(x=>/^u/.test(x.id)||(/^t/.test(x.id)&&Number(x.id.slice(1))>Number(unit.slice(1))));if(at<0)units.push(u);else units.splice(at,0,u);}u.outcomes.push(lesson);}); })();
