/* =========================================================
   11. Sınıf Kimya — konu anlatım notları
   Kaynak: kullanıcının verdiği "11. Sınıf Kimya Konu Anlatım Notları" (3 tema).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. "Endertermik" yazımı endotermik olarak düzeltildi. Asit-baz ve çözünürlük bölümleri ders kitabı düzeyinde genişletildi (Ka, tampon, titrasyon hesabı, Kçç–çözünürlük ilişkisi); hidrojen türleri tablosu ve çözümlü örnekler eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/kimya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Etkileşim — Enerji ve Tepkime Hızı",
   "en": "Theme 1: Interaction — Energy and Reaction Rate"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1.1",
    "title": {
     "tr": "Tepkimelerde enerji değişimi ve enerji kaynakları",
     "en": "Energy changes in reactions and energy sources"
    },
    "content": {
     "anlatim": "# Entalpi Değişimi\n\nBağların **kırılması enerji ister**, yeni bağların **oluşması enerji açığa çıkarır**. Sabit basınçta alınan/verilen ısı **entalpi değişimi** $\\Delta H$ ile gösterilir.\n\n| | Ekzotermik | Endotermik |\n|---|---|---|\n| $\\Delta H$ | $< 0$ | $> 0$ |\n| Isı | **Açığa çıkar** | **Alınır** |\n| Çevre | Isınır | Soğur |\n| Enerji | Ürünlerin enerjisi < tepkenlerin | Ürünlerin enerjisi > tepkenlerin |\n| Örnek | Yanma, nötrleşme, donma, yoğuşma | Fotosentez, elektroliz, erime, buharlaşma, ayrışma |\n\n# Potansiyel Enerji Diyagramı\n\n- **Aktivasyon enerjisi ($E_a$):** Tepkimenin başlaması için aşılması gereken enerji engeli.\n- **Aktifleşmiş kompleks:** Diyagramın tepesindeki kararsız ara yapı.\n- $\\Delta H = E_{a,ileri} - E_{a,geri}$.\n- **Termokimyasal denklem:** $C(k) + O_2(g) \\to CO_2(g) \\quad \\Delta H = -393{,}5 \\text{ kJ}$ → katsayılar 2 katına çıkarsa $\\Delta H$ de 2 katına çıkar; tepkime ters çevrilirse $\\Delta H$'nin işareti değişir.\n\n# Maddelerin Enerji Kaynağı Olma Potansiyeli\n\n- **Yanma ısısı (kalorifik değer):** Birim kütle (ya da 1 mol) maddenin tamamen yanmasıyla açığa çıkan ısı.\n- Fosil yakıtlar (kömür, petrol, doğal gaz), **hidrojen** (kütlece en yüksek yanma ısılarından biri), biyoyakıtlar.\n- Seçim ölçütleri: **enerji verimi**, maliyet, depolama, **çevresel etki** (CO₂, SO₂ salımı), **sürdürülebilirlik**.\n- Besinlerin enerji değerleri: karbonhidrat ve protein ≈ 4 kcal/g, yağ ≈ 9 kcal/g.",
     "ornekler": [
      {
       "soru": "$2H_2(g) + O_2(g) \\to 2H_2O(s)\\ \\ \\Delta H = -572$ kJ ise 1 mol suyun ayrışma entalpisi nedir?",
       "cozum": "Ters çevirip ikiye bölünür: $H_2O(s) \\to H_2(g) + \\frac12 O_2(g)\\ \\ \\Delta H = +286$ kJ (endotermik)."
      }
     ],
     "ozet": [
      "$\\Delta H<0$ ekzotermik, $\\Delta H>0$ endotermik.",
      "$E_a$: enerji engeli; $\\Delta H=E_{a,ileri}-E_{a,geri}$.",
      "Yakıt seçimi: verim, maliyet, çevre etkisi."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.1.3",
    "title": {
     "tr": "Bağ enerjileri, standart oluşum entalpisi ve Hess yasası",
     "en": "Bond energies, standard enthalpy of formation and Hess's law"
    },
    "content": {
     "anlatim": "# Bağ Enerjisi\n\nGaz hâlindeki 1 mol molekülde belirli bir bağı **kırmak** için gereken enerji (her zaman pozitif).\n$$\\Delta H \\approx \\sum(\\text{kırılan bağ enerjileri}) - \\sum(\\text{oluşan bağ enerjileri})$$\nOrtalama bağ enerjileri kullanıldığından sonuç **yaklaşıktır**.\n\n**Örnek:** $H_2 + Cl_2 \\to 2HCl$ ($H-H$: 436, $Cl-Cl$: 243, $H-Cl$: 432 kJ/mol)\n$$\\Delta H = (436 + 243) - (2\\cdot432) = 679 - 864 = -185 \\text{ kJ}$$\n\n# Standart Oluşum Entalpisi ($\\Delta H^\\circ_f$)\n\n1 mol bileşiğin **elementlerinden** standart koşullarda (**25 °C, 1 atm**) oluşmasındaki entalpi değişimi.\n- Elementlerin en kararlı hâllerinin $\\Delta H^\\circ_f$ değeri **sıfırdır** ($O_2(g)$, $C(\\text{grafit})$, $H_2(g)$…).\n$$\\Delta H^\\circ_{tep} = \\sum n\\,\\Delta H^\\circ_f(\\text{ürünler}) - \\sum n\\,\\Delta H^\\circ_f(\\text{tepkenler})$$\n\n# Hess Yasası\n\nBir tepkimenin entalpi değişimi **izlenen yoldan bağımsızdır**; yalnızca başlangıç ve son hâllere bağlıdır. Ara tepkimeler toplanarak istenen tepkimeye ulaşılır; $\\Delta H$'ler de aynı işlemlerle toplanır.\n\n| İşlem | $\\Delta H$'ye etkisi |\n|---|---|\n| Tepkimeyi ters çevirmek | İşaret değişir |\n| Katsayıları $n$ ile çarpmak | $\\Delta H \\times n$ |\n| Tepkimeleri toplamak | $\\Delta H$'ler toplanır |",
     "ornekler": [
      {
       "soru": "$\\Delta H^\\circ_f$: $CH_4 = -75$, $CO_2 = -394$, $H_2O(s) = -286$ kJ/mol. $CH_4 + 2O_2 \\to CO_2 + 2H_2O(s)$ tepkimesinin $\\Delta H$'si?",
       "cozum": "$\\Delta H = [-394 + 2(-286)] - [-75 + 0] = -966 + 75 = -891$ kJ."
      }
     ],
     "ozet": [
      "Bağ enerjisi: kırılan − oluşan.",
      "Elementlerin $\\Delta H^\\circ_f = 0$; ürünler − tepkenler.",
      "Hess: entalpi yoldan bağımsız."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.2.1",
    "title": {
     "tr": "Çarpışma teorisi ve ortalama tepkime hızı",
     "en": "Collision theory and average reaction rate"
    },
    "content": {
     "anlatim": "# Çarpışma Teorisi\n\nTepkime için tanecikler:\n1. **Çarpışmalı**,\n2. Çarpışma **yeterli enerjiyle** ($\\ge E_a$) olmalı,\n3. **Uygun geometride (doğrultuda)** olmalı.\nBu şartları sağlayan çarpışmalar **etkin çarpışma**dır; etkin çarpışma sayısı arttıkça hız artar.\n\n- $E_a$ **yüksekse** tepkime **yavaş**, düşükse hızlıdır.\n- Zıt yüklü iyonlar arasındaki tepkimeler (ör. $Ag^+ + Cl^- \\to AgCl$) **çok hızlıdır**; bağ kırılması gereken tepkimeler daha yavaştır.\n\n# Ortalama Tepkime Hızı\n\nBirim zamanda derişimde (ya da miktar, basınç, hacim, renk, iletkenlik) meydana gelen değişim:\n$$v = -\\frac{\\Delta[\\text{tepken}]}{\\Delta t} = +\\frac{\\Delta[\\text{ürün}]}{\\Delta t} \\quad (\\text{mol/L·s})$$\nHız her zaman **pozitiftir**; tepken için eksi işaret kullanılır.\n\n**Katsayılara göre:** $aA + bB \\to cC$ için\n$$v = -\\frac{1}{a}\\frac{\\Delta[A]}{\\Delta t} = -\\frac1b\\frac{\\Delta[B]}{\\Delta t} = \\frac1c\\frac{\\Delta[C]}{\\Delta t}$$\n\n**Hız ölçme yöntemleri:** gaz hacmi/basıncı değişimi, renk değişimi, iletkenlik, çökelek oluşumu, kütle kaybı.",
     "ornekler": [
      {
       "soru": "$N_2 + 3H_2 \\to 2NH_3$ tepkimesinde $NH_3$ oluşma hızı $0{,}4$ mol/L·s ise $H_2$ harcanma hızı nedir?",
       "cozum": "$\\frac{v_{H_2}}{3} = \\frac{v_{NH_3}}{2} \\Rightarrow v_{H_2} = \\frac32 \\cdot 0{,}4 = 0{,}6$ mol/L·s."
      }
     ],
     "ozet": [
      "Etkin çarpışma: yeterli enerji + uygun geometri.",
      "$E_a$ büyükse tepkime yavaş.",
      "Ortalama hız katsayılara bölünerek eşitlenir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.2.3",
    "title": {
     "tr": "Hıza etki eden faktörler, hız denklemi ve mekanizma",
     "en": "Factors affecting rate, rate law and mechanism"
    },
    "content": {
     "anlatim": "# Hıza Etki Eden Faktörler\n\n| Faktör | Etki | Neden |\n|---|---|---|\n| **Madde cinsi** | Farklı | Bağ türü ve $E_a$ farkı |\n| **Fiziksel hâl** | Gaz, çözelti > sıvı > katı | Taneciklerin hareketliliği ve temas |\n| **Derişim** | ↑ → hız ↑ | Birim hacimde çarpışma sayısı artar |\n| **Sıcaklık** | ↑ → hız ↑ (≈ her 10 °C'de yaklaşık 2 kat) | Kinetik enerji ↑, $E_a$'yı aşan tanecik **sayısı** ↑; hız sabiti $k$ artar |\n| **Katalizör** | Hız ↑ | **Farklı mekanizma** ile $E_a$'yı **düşürür**; tükenmez; $\\Delta H$'yi **değiştirmez** |\n| **Temas yüzeyi** | ↑ → hız ↑ | Toz şeker, parçalanmış katı daha hızlı tepkir |\n\n> Sıcaklık artışı ile katalizör farkı: sıcaklık $E_a$'yı değiştirmez, eşiği aşan tanecik sayısını artırır; katalizör $E_a$'yı düşürür. **Enzimler** biyolojik katalizördür; inhibitörler hızı düşürür.\n\n# Hız Denklemi\n\n$$v = k[A]^m[B]^n$$\n- $m, n$: **tepkime mertebeleri** — **deneysel** olarak bulunur; toplam mertebe $m + n$.\n- $k$: **hız sabiti**; sıcaklık ve katalizöre bağlıdır, derişime bağlı değildir.\n- **Deneysel veriden mertebe bulma:** Bir maddenin derişimi 2 katına çıkınca hız 4 katına çıkıyorsa o maddeye göre mertebe 2'dir.\n- Katı ve saf sıvılar hız denklemine **yazılmaz**.\n\n# Çok Basamaklı Tepkimeler\n\n- **En yavaş basamak hızı belirler** (hız belirleyen basamak); hız denklemi bu basamağa göre yazılır.\n- Basamaklarda oluşup sonra harcanan türler **ara ürün**; başta harcanıp sonda geri oluşan türler **katalizör**dür.",
     "ornekler": [
      {
       "soru": "$2NO + O_2 \\to 2NO_2$ için deneyler: $[NO]$ iki katına çıkınca hız 4 katına, $[O_2]$ iki katına çıkınca hız 2 katına çıkıyor. Hız denklemi ve mertebe nedir?",
       "cozum": "$NO$'ya göre 2., $O_2$'ye göre 1. mertebe: $v = k[NO]^2[O_2]$; toplam mertebe **3**."
      }
     ],
     "ozet": [
      "Derişim, sıcaklık, yüzey, katalizör hızı artırır.",
      "Katalizör $E_a$'yı düşürür, $\\Delta H$'yi değiştirmez.",
      "$v=k[A]^m[B]^n$; yavaş basamak hızı belirler."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.1.5",
    "title": {
     "tr": "Kalorimetre ve tepkime ısısının ölçülmesi",
     "en": "Calorimetry and measuring heat of reaction"
    },
    "content": {
     "anlatim": "# Isı ve Sıcaklık\n\n- **Isı (q):** Sıcaklık farkından dolayı aktarılan enerji (J, kJ, cal). **Sıcaklık:** taneciklerin ortalama kinetik enerjisinin ölçüsü.\n$$q = m \\cdot c \\cdot \\Delta T$$\n$m$: kütle (g), $c$: öz ısı (J/g·°C), $\\Delta T$: sıcaklık değişimi. Suyun öz ısısı $c = 4{,}18$ J/g·°C ($\\approx 1$ cal/g·°C).\n- **Isı sığası:** $C = m\\cdot c$ (maddenin sıcaklığını 1 °C artırmak için gereken ısı).\n\n# Kalorimetre\n\n| Tür | Özellik | Ölçülen |\n|---|---|---|\n| **Kahve fincanı (sabit basınç)** | Basit, yalıtımlı kap | Çözünme, nötrleşme ısısı → $\\Delta H$ |\n| **Bomba kalorimetresi (sabit hacim)** | Çelik kap, oksijenli ortamda yakma | Yanma ısısı, besinlerin enerji değeri |\n\n**İlke:** Tepkimede açığa çıkan ısı = suyun (ve kalorimetrenin) aldığı ısı:\n$$q_{tepkime} = -(q_{su} + q_{kalorimetre})$$\n- Su ısınıyorsa tepkime **ekzotermiktir** ($\\Delta H < 0$); soğuyorsa **endotermiktir**.\n- Molar entalpi: $\\Delta H = \\dfrac{q_{tepkime}}{n}$ (kJ/mol)\n\n# Günlük Hayattan\n\nBesin etiketlerindeki **kcal** değerleri bomba kalorimetresiyle ölçülür. Kendiliğinden ısınan çorba kutuları ve buz torbaları çözünme ısısına dayanır.",
     "ornekler": [
      {
       "soru": "Kahve fincanı kalorimetresinde $0{,}05$ mol NaOH çözündüğünde $100$ g suyun sıcaklığı $5$ °C artıyor. Molar çözünme entalpisi kaç kJ/mol'dür? ($c = 4{,}2$ J/g·°C)",
       "cozum": "$q_{su} = 100\\cdot4{,}2\\cdot5 = 2100$ J $= 2{,}1$ kJ. Tepkime ısı verdi: $\\Delta H = -\\frac{2{,}1}{0{,}05} = -42$ kJ/mol (ekzotermik)."
      },
      {
       "soru": "Bir maddenin çözünmesi sırasında suyun sıcaklığı düşüyorsa olay nasıl sınıflandırılır?",
       "cozum": "Su ısı **kaybetmiş**, çözünme olayı ısıyı **almıştır** → **endotermik** ($\\Delta H > 0$); örneğin $NH_4NO_3$ ile yapılan soğuk kompresler."
      }
     ],
     "ozet": [
      "$q = mc\\Delta T$.",
      "Kahve fincanı: sabit basınç (ΔH); bomba: sabit hacim (yanma ısısı).",
      "Su ısınıyorsa tepkime ekzotermik."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Çeşitlilik — Kimyasal Denge",
   "en": "Theme 2: Diversity — Chemical Equilibrium"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1.1",
    "title": {
     "tr": "Tersinir tepkimeler, denge sabiti ve tepkime oranı",
     "en": "Reversible reactions, equilibrium constant and reaction quotient"
    },
    "content": {
     "anlatim": "# Tersinir Tepkimeler ve Dinamik Denge\n\n- İleri ve geri tepkimeler **aynı anda** yürür.\n- Denge anında **ileri hız = geri hız**; derişimler **sabit** kalır (eşit değil!). Tepkimeler durmaz → **dinamik denge**.\n- Denge ancak **kapalı sistemde** ve **sabit sıcaklıkta** kurulur.\n- Dengeye gelirken ileri hız **azalır**, geri hız **artar**.\n\n**Fiziksel denge:** Kapalı kapta sıvı–buhar dengesi, doymuş çözeltide çözünme–çökelme.\n**Kimyasal denge:** $N_2 + 3H_2 \\rightleftharpoons 2NH_3$.\n\n# Denge Sabiti\n\n$aA + bB \\rightleftharpoons cC + dD$ için:\n$$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b} \\qquad K_p = \\frac{P_C^c\\,P_D^d}{P_A^a\\,P_B^b}$$\n- **Katılar ve saf sıvılar yazılmaz.**\n- $K_p = K_c(RT)^{\\Delta n}$ ($\\Delta n$: gaz ürün molü − gaz tepken molü).\n- $K$ **yalnızca sıcaklıkla** değişir.\n- $K \\gg 1$ → **ürünler** lehine; $K \\ll 1$ → **tepkenler** lehine.\n- Tepkime ters çevrilirse $K' = 1/K$; katsayılar $n$ ile çarpılırsa $K' = K^n$.\n\n# Tepkime Oranı ($Q$)\n\nHerhangi bir andaki derişimlerle yazılan ifade.\n| Durum | Sonuç |\n|---|---|\n| $Q = K$ | Sistem dengededir |\n| $Q < K$ | **İleri** yönde ilerler |\n| $Q > K$ | **Geri** yönde ilerler |",
     "ornekler": [
      {
       "soru": "$H_2 + I_2 \\rightleftharpoons 2HI$ tepkimesi dengede iken $[H_2] = 0{,}1$, $[I_2] = 0{,}1$, $[HI] = 0{,}8$ M ise $K_c$ nedir?",
       "cozum": "$K_c = \\frac{0{,}8^2}{0{,}1 \\cdot 0{,}1} = \\frac{0{,}64}{0{,}01} = 64$."
      }
     ],
     "ozet": [
      "Dengede ileri hız = geri hız; derişimler sabit.",
      "Katı ve saf sıvı K ifadesine yazılmaz; K yalnız sıcaklıkla değişir.",
      "Q<K ileri, Q>K geri."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.1.5",
    "title": {
     "tr": "Dengeyi etkileyen faktörler: Le Chatelier",
     "en": "Factors affecting equilibrium: Le Chatelier's principle"
    },
    "content": {
     "anlatim": "# Le Chatelier İlkesi\n\nDengedeki bir sisteme dışarıdan etki yapılırsa sistem bu etkiyi **azaltacak yönde** kayar.\n\n| Etki | Dengenin kayma yönü | K değişir mi? |\n|---|---|---|\n| Madde **eklemek** | O maddeyi **harcayan** yöne | Hayır |\n| Madde **çekmek** | O maddeyi **üreten** yöne | Hayır |\n| **Hacmi azaltmak** (basıncı artırmak) | Gaz **mol sayısı az** olan yöne | Hayır |\n| Hacmi artırmak | Gaz mol sayısı **çok** olan yöne | Hayır |\n| **Sıcaklığı artırmak** | **Endotermik** yöne | **Evet** |\n| Sıcaklığı azaltmak | Ekzotermik yöne | Evet |\n| **Katalizör** | **Kaymaz**; dengeye daha çabuk ulaşılır | Hayır |\n| Soy gaz eklemek (sabit hacimde) | Kaymaz | Hayır |\n\n> Gaz mol sayıları eşitse ($\\Delta n = 0$) hacim/basınç değişimi dengeyi kaydırmaz.\n\n**Endüstriyel örnek — Haber–Bosch:** $N_2 + 3H_2 \\rightleftharpoons 2NH_3\\ \\ \\Delta H < 0$\n- **Yüksek basınç** → mol sayısı az olan ürün tarafı (verim ↑).\n- Düşük sıcaklık verimi artırır ama **hızı düşürür** → orta sıcaklık (~450 °C) ve **demir katalizör** kullanılır.\n- $NH_3$ ortamdan **sürekli çekilir**.",
     "ornekler": [
      {
       "soru": "$2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)\\ \\ \\Delta H < 0$ dengesinde sıcaklık artırılırsa ve hacim küçültülürse ne olur?",
       "cozum": "Sıcaklık artışı → **endotermik (geri)** yöne kayar, $K$ **küçülür**. Hacim küçülmesi → gaz mol sayısı az olan **ürün (ileri)** yönüne kayar, $K$ değişmez."
      }
     ],
     "ozet": [
      "Sistem etkiyi azaltacak yöne kayar.",
      "Basınç ↑ → az mollü tarafa; sıcaklık ↑ → endotermik yöne.",
      "Yalnızca sıcaklık K'yı değiştirir; katalizör kaydırmaz."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.2.1",
    "title": {
     "tr": "Suyun otoiyonizasyonu, asit-baz teorileri ve pH",
     "en": "Autoionization of water, acid-base theories and pH"
    },
    "content": {
     "anlatim": "# Suyun Otoiyonizasyonu\n\n$$H_2O(s) \\rightleftharpoons H^+(suda) + OH^-(suda) \\qquad K_w = [H^+][OH^-] = 1{,}0\\times10^{-14}\\ (25\\,°C)$$\nSaf suda $[H^+] = [OH^-] = 10^{-7}$ M → **nötr**. Sıcaklık artarsa $K_w$ artar (endotermik).\n\n# pH ve pOH\n\n$$pH = -\\log[H^+] \\qquad pOH = -\\log[OH^-] \\qquad pH + pOH = 14\\ (25\\,°C)$$\n| pH | Çözelti |\n|---|---|\n| $< 7$ | Asidik |\n| $= 7$ | Nötr |\n| $> 7$ | Bazik |\npH 1 birim azalırsa $[H^+]$ **10 kat** artar.\n\n# Asit–Baz Teorileri\n\n| Teori | Asit | Baz |\n|---|---|---|\n| **Arrhenius** | Suda **H⁺** veren | Suda **OH⁻** veren |\n| **Brønsted–Lowry** | **Proton (H⁺) veren** | **Proton alan** |\n| **Lewis** | **Elektron çifti alan** | **Elektron çifti veren** |\n\n**Konjuge (eşlenik) asit–baz çiftleri:** $NH_3 + H_2O \\rightleftharpoons NH_4^+ + OH^-$ → $NH_3/NH_4^+$ ve $H_2O/OH^-$. Su hem asit hem baz gibi davranabilir (**amfoter**).",
     "ornekler": [
      {
       "soru": "$0{,}01$ M $HCl$ çözeltisinin pH ve pOH değerleri nedir?",
       "cozum": "Kuvvetli asit, tamamen iyonlaşır: $[H^+] = 10^{-2}$ → pH $= 2$, pOH $= 12$."
      }
     ],
     "ozet": [
      "$K_w=10^{-14}$; $pH+pOH=14$.",
      "Arrhenius H⁺/OH⁻; Brønsted proton; Lewis elektron çifti.",
      "pH 1 azalırsa [H⁺] 10 kat artar."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.2.4",
    "title": {
     "tr": "Asit-baz kuvveti, tampon, titrasyon ve uygulamalar",
     "en": "Acid-base strength, buffers, titration and applications"
    },
    "content": {
     "anlatim": "# Kuvvetli ve Zayıf Asit–Bazlar\n\n- **Kuvvetli:** Suda **tamamen** iyonlaşır — $HCl, HBr, HI, HNO_3, H_2SO_4, HClO_4$; $NaOH, KOH, Ca(OH)_2$.\n- **Zayıf:** **Kısmen** iyonlaşır, denge kurulur — $CH_3COOH, HF, H_2CO_3$; $NH_3$.\n$$HA \\rightleftharpoons H^+ + A^- \\qquad K_a = \\frac{[H^+][A^-]}{[HA]}$$\n$K_a$ (ya da $K_b$) büyükse asit (baz) **daha kuvvetli**dir. Eşlenik çift için $K_a \\cdot K_b = K_w$.\n\nZayıf asit için yaklaşık: $[H^+] \\approx \\sqrt{K_a \\cdot C}$.\n\n# Nötrleşme ve Tuzların Hidrolizi\n\nAsit + baz → tuz + su. Kuvvetli asit + kuvvetli baz tuzu **nötr**; zayıf asit + kuvvetli baz tuzu (ör. $CH_3COONa$) **bazik**; kuvvetli asit + zayıf baz tuzu ($NH_4Cl$) **asidik**.\n\n# Tampon Çözeltiler\n\nZayıf asit + eşlenik bazı (ya da zayıf baz + eşlenik asidi) içeren, **az miktarda asit ya da baz eklendiğinde pH'ını korur**. Ör. $CH_3COOH/CH_3COO^-$; kanda $H_2CO_3/HCO_3^-$ tamponu (pH ≈ 7,4).\n\n# Titrasyon\n\nDerişimi bilinen çözeltiyle (**ayarlı çözelti**) bilinmeyen çözeltinin derişiminin bulunması.\n- **Eşdeğerlik noktası:** $n_{H^+} = n_{OH^-}$ → $M_a V_a \\cdot (\\text{tesir değ.}) = M_b V_b \\cdot (\\text{tesir değ.})$\n- **İndikatör** (fenolftalein, metil oranj) renk değişimiyle dönüm noktasını gösterir.\n- Titrasyon eğrisinde eşdeğerlik noktası çevresinde pH **ani** değişir.\n\n# Günlük Hayat\n\nMide asidi ($HCl$) ve antiasitler ($Mg(OH)_2$, $NaHCO_3$); diş macunlarının hafif bazik olması; cildin hafif asidik pH'ı (≈ 5,5) ve şampuan seçimi; asit yağmurları; toprak pH'ına göre gübreleme.",
     "ornekler": [
      {
       "soru": "$20$ mL $0{,}1$ M $NaOH$'ı nötrleştirmek için $0{,}05$ M $HCl$'den kaç mL gerekir?",
       "cozum": "$n_{OH^-} = 0{,}1 \\cdot 0{,}020 = 0{,}002$ mol. $V = \\frac{0{,}002}{0{,}05} = 0{,}04$ L $= 40$ mL."
      }
     ],
     "ozet": [
      "Kuvvetli tamamen, zayıf kısmen iyonlaşır; Ka büyükse kuvvetli.",
      "Tampon pH'ı korur (kanda karbonat tamponu).",
      "Titrasyon: eşdeğerlik noktasında mol H⁺ = mol OH⁻."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.3",
    "title": {
     "tr": "Çözünürlük dengesi",
     "en": "Solubility equilibrium"
    },
    "content": {
     "anlatim": "# Çözünürlük Çarpımı ($K_{çç}$)\n\nAz çözünen iyonik katının doymuş çözeltisinde katı ile iyonları arasında denge kurulur:\n$$AgCl(k) \\rightleftharpoons Ag^+(suda) + Cl^-(suda) \\qquad K_{çç} = [Ag^+][Cl^-]$$\nKatı, ifadeye yazılmaz.\n\n**Çözünürlük ($s$) ile $K_{çç}$ ilişkisi:**\n| Tuz tipi | Örnek | $K_{çç}$ |\n|---|---|---|\n| $AB$ | $AgCl$ | $s^2$ |\n| $AB_2$ / $A_2B$ | $PbI_2$, $Ag_2CrO_4$ | $4s^3$ |\n| $AB_3$ | $Al(OH)_3$ | $27s^4$ |\n\n# Çözünürlüğe Etki Eden Faktörler\n\n- **Sıcaklık:** Çoğu katının çözünmesi endotermik → sıcaklık ↑ çözünürlük ↑ (ve $K_{çç}$ ↑). Gazların çözünürlüğü sıcaklıkla **azalır**.\n- **Ortak iyon etkisi:** Çözeltide ortak iyon varsa denge çökelme yönüne kayar → çözünürlük **azalır** ($K_{çç}$ değişmez).\n\n# Çökelme Şartı\n\nİyon çarpımı $Q$:\n- $Q < K_{çç}$ → **doymamış**, çökelme yok\n- $Q = K_{çç}$ → **doymuş**\n- $Q > K_{çç}$ → **çökelme** olur\n\n**Uygulamalar:** Böbrek taşı ($CaC_2O_4$), mağara oluşumu ($CaCO_3$), suyun sertliği, diş minesi ($Ca_5(PO_4)_3OH$) ve florür.",
     "ornekler": [
      {
       "soru": "$AgCl$ için $K_{çç} = 1{,}6\\times10^{-10}$ ise saf sudaki çözünürlüğü nedir? $0{,}1$ M $NaCl$ çözeltisinde nasıl değişir?",
       "cozum": "$s^2 = 1{,}6\\times10^{-10} \\Rightarrow s = 1{,}26\\times10^{-5}$ M. $NaCl$'de ortak iyon $Cl^-$: $s \\cdot 0{,}1 = 1{,}6\\times10^{-10} \\Rightarrow s = 1{,}6\\times10^{-9}$ M → çözünürlük çok **azalır**."
      }
     ],
     "ozet": [
      "$K_{çç}$ katıyı içermez; AB tipinde $K=s^2$.",
      "Ortak iyon çözünürlüğü azaltır.",
      "$Q>K_{çç}$ ise çökelme."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Sürdürülebilirlik — Nanoteknoloji",
   "en": "Theme 3: Sustainability — Nanotechnology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1.1",
    "title": {
     "tr": "Yeşil hidrojen ve nanoteknolojinin fayda–zararları",
     "en": "Green hydrogen and nanotechnology's benefits and risks"
    },
    "content": {
     "anlatim": "# Hidrojenin \"Renkleri\"\n\n| Tür | Üretim | Karbon salımı |\n|---|---|---|\n| **Gri hidrojen** | Doğal gazdan buhar reformasyonu | Yüksek |\n| **Mavi hidrojen** | Gri + karbon yakalama ve depolama | Azaltılmış |\n| **Yeşil hidrojen** | **Yenilenebilir elektrikle suyun elektrolizi** | **Yok** |\n\n$$2H_2O(s) \\xrightarrow{\\text{elektroliz}} 2H_2(g) + O_2(g)$$\n- Evsel ve organik atıklardan **fermantasyonla** biyohidrojen üretimi de mümkündür.\n- **Avantaj:** Yanma ürünü yalnızca **su**; kütlece yüksek enerji; yakıt pillerinde elektrik üretimi.\n- **Zorluklar:** **Depolama** (yüksek basınç ya da çok düşük sıcaklık), **taşıma**, yüksek üretim maliyeti, yanıcılık.\n\n# Nanoteknoloji\n\n**1–100 nm** boyutundaki maddelerin özel özelliklerinden yararlanma. Nano boyutta **yüzey alanı/hacim oranı** çok büyük olduğundan kimyasal, optik, elektriksel özellikler değişir.\n\n| Faydalar | Olası zararlar |\n|---|---|\n| Daha verimli **güneş panelleri** ve bataryalar | Nano parçacıkların **solunum yoluyla** akciğere ulaşması |\n| Hedefe yönelik **ilaç taşıma** sistemleri | Hücre zarından geçip **hücre hasarı** |\n| Hafif ve dayanıklı malzemeler (grafen, karbon nanotüp) | Çevrede birikme, ekosisteme etkiler |\n| **Su arıtma** filtreleri, antibakteriyel yüzeyler (gümüş nanoparçacık) | Uzun vadeli etkilerin **henüz tam bilinmemesi** |\n| Kendi kendini temizleyen yüzeyler (lotus etkisi) | Düzenleme ve etiketleme eksiklikleri |\n\n> **İhtiyatlılık ilkesi:** Risk tam bilinmeden yaygın kullanımda dikkatli olunmalı, araştırmalar sürdürülmelidir.",
     "ornekler": [
      {
       "soru": "Yeşil hidrojenin 'yeşil' olmasının şartı nedir?",
       "cozum": "Elektrolizde kullanılan elektriğin **yenilenebilir kaynaklardan** (güneş, rüzgâr, hidroelektrik) gelmesi; böylece üretim sürecinde **karbon salımı olmaz**. Fosil kaynaklı elektrikle yapılan elektroliz yeşil sayılmaz."
      }
     ],
     "ozet": [
      "Yeşil hidrojen: yenilenebilir elektrikle elektroliz.",
      "Nano: 1–100 nm, büyük yüzey/hacim oranı.",
      "Faydalar: ilaç taşıma, güneş paneli; riskler: sağlık ve çevre."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.1.3",
    "title": {
     "tr": "Mikroplastikler ve nanoplastikler",
     "en": "Microplastics and nanoplastics"
    },
    "content": {
     "anlatim": "# Tanımlar\n\n- **Mikroplastik:** **5 mm'den küçük** plastik parçacıklar.\n- **Nanoplastik:** **1 μm'den** (bazı tanımlarda 100 nm'den) küçük parçacıklar.\n\n**Kaynaklar:**\n- **Birincil:** Doğrudan küçük üretilen — kozmetik mikroboncuklar, endüstriyel peletler.\n- **İkincil:** Büyük plastiklerin güneş, dalga ve aşınma ile **parçalanması** — şişeler, poşetler, sentetik kumaşların yıkanırken bıraktığı **lifler**, araç **lastik aşınması**.\n\n# Etkileri\n\n- Denizlerde, toprakta, havada ve içme suyunda birikir.\n- **Besin zincirine** girer: plankton → balık → insan (**biyobirikim**).\n- Yüzeylerine zehirli kimyasalları ve mikroorganizmaları taşıyabilir; bazı katkı maddeleri (ftalatlar, bisfenol A) **hormon bozucu** etki yapabilir.\n- İnsan kanında, akciğer ve plasenta dokusunda tespit edilmiştir; sağlık etkileri araştırılmaktadır.\n\n# Önlemler\n\n- **Azalt, yeniden kullan, geri dönüştür.**\n- Tek kullanımlık plastiklerin sınırlandırılması; kozmetiklerde mikroboncuk yasakları.\n- **Biyobozunur** plastikler (PLA gibi) geliştirmek.\n- Çamaşır makinelerinde mikrolif filtreleri; atık su arıtımının iyileştirilmesi.",
     "ornekler": [
      {
       "soru": "Mikroplastiklerin insan sağlığına ulaşma yolunu besin zinciri üzerinden açıklayınız.",
       "cozum": "Denizdeki mikroplastikleri **plankton** ve küçük canlılar yutar; bunları **balıklar** yer; parçacıklar ve taşıdıkları kimyasallar her basamakta **birikir** ve sonunda deniz ürünleri yoluyla **insana** ulaşır."
      }
     ],
     "ozet": [
      "Mikroplastik < 5 mm; nanoplastik < 1 μm.",
      "Birincil (mikroboncuk) ve ikincil (parçalanma) kaynaklar.",
      "Besin zincirinde biyobirikim; çözüm: azalt, geri dönüştür, biyobozunur."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Gazlar ve Sıvı Çözeltiler (AYT)",
   "en": "Unit 4: Gases and Liquid Solutions"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Gaz yasaları ve ideal gaz denklemi",
     "en": "Gas laws and the ideal gas equation"
    },
    "content": {
     "anlatim": "# Gazları Tanımlayan Değişkenler\n\nBasınç $P$ (atm, mmHg; $1$ atm $= 760$ mmHg), hacim $V$ (L), sıcaklık $T$ (**Kelvin**: $T = t + 273$), mol sayısı $n$.\n\n# Gaz Yasaları\n\n| Yasa | Sabit | İlişki | Grafik |\n|---|---|---|---|\n| **Boyle** | $n, T$ | $P_1V_1 = P_2V_2$ (ters orantı) | $P$–$V$ hiperbol |\n| **Charles** | $n, P$ | $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$ | $V$–$T$ doğru |\n| **Gay-Lussac** | $n, V$ | $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$ | $P$–$T$ doğru |\n| **Avogadro** | $P, T$ | $\\dfrac{V_1}{n_1} = \\dfrac{V_2}{n_2}$ | — |\n\n**Birleşik gaz yasası:** $\\dfrac{P_1V_1}{n_1T_1} = \\dfrac{P_2V_2}{n_2T_2}$\n\n# İdeal Gaz Denklemi\n\n$$PV = nRT, \\qquad R = 0{,}082\\ \\frac{\\text{L·atm}}{\\text{mol·K}} = \\frac{22{,}4}{273}$$\n- **Normal koşullar (NK):** $0$ °C, $1$ atm → 1 mol gaz **22,4 L**.\n- **Oda koşulları:** $25$ °C, $1$ atm → 1 mol gaz $\\approx$ **24,5 L**.\n- **Yoğunluk:** $d = \\dfrac{P\\cdot M_A}{R\\cdot T}$ ($M_A$: mol kütlesi)",
     "ornekler": [
      {
       "soru": "$27$ °C'de $4$ L hacim kaplayan gaz, sabit basınçta $127$ °C'ye ısıtılıyor. Yeni hacmi kaç L olur?",
       "cozum": "Kelvine çevir: $300$ K → $400$ K. $\\frac{4}{300} = \\frac{V_2}{400} \\Rightarrow V_2 = \\frac{16}{3} \\approx 5{,}33$ L."
      },
      {
       "soru": "NK'da $11{,}2$ L hacim kaplayan $CH_4$ gazı kaç gramdır? ($CH_4 = 16$ g/mol)",
       "cozum": "$n = \\frac{11{,}2}{22{,}4} = 0{,}5$ mol; kütle $= 0{,}5\\cdot16 = 8$ g."
      }
     ],
     "ozet": [
      "Gaz problemlerinde sıcaklık daima Kelvin.",
      "$PV = nRT$; $R = 0{,}082$ L·atm/mol·K.",
      "NK'da 1 mol gaz 22,4 L."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Kinetik teori, gaz karışımları ve gerçek gazlar",
     "en": "Kinetic theory, gas mixtures and real gases"
    },
    "content": {
     "anlatim": "# Kinetik Molekül Teorisi (ideal gaz varsayımları)\n\n1. Gaz tanecikleri sürekli, gelişigüzel ve doğrusal hareket eder.\n2. Taneciklerin **öz hacmi** kabın hacmine göre ihmal edilir.\n3. Tanecikler arasında **çekim–itme yoktur**.\n4. Çarpışmalar **esnektir**.\n5. Ortalama kinetik enerji **yalnızca mutlak sıcaklığa** bağlıdır: $E_k \\propto T$\n\n# Difüzyon ve Graham Yasası\n\nAynı sıcaklıkta hafif gazlar daha hızlıdır:\n$$\\frac{v_1}{v_2} = \\sqrt{\\frac{M_2}{M_1}}$$\nÖrnek: $H_2$ ($M = 2$), $O_2$'den ($M = 32$) $\\sqrt{16} = 4$ kat hızlı yayılır.\n\n# Gaz Karışımları — Dalton Kısmi Basınçlar Yasası\n\n$$P_{toplam} = P_A + P_B + \\dots, \\qquad P_A = X_A \\cdot P_{toplam}, \\quad X_A = \\frac{n_A}{n_{toplam}}$$\n- **Su üstünde toplanan gaz:** $P_{gaz} = P_{atm} - P_{su\\ buharı}$\n\n# Gerçek Gazlar\n\nGazlar **yüksek basınç** ve **düşük sıcaklıkta** idealden sapar (tanecik hacmi ve çekim kuvvetleri önem kazanır).\n- İdeale en yakın: **düşük basınç, yüksek sıcaklık**, küçük ve apolar tanecikler (He, $H_2$).\n- **Kritik sıcaklık:** Bu sıcaklığın üstünde gaz, basınç ne olursa olsun sıvılaştırılamaz. Kritik sıcaklığın altındaki gaza **buhar** denir.\n- **Joule–Thomson olayı:** Sıkıştırılmış gaz genleşirken soğur (buzdolabı, klima).",
     "ornekler": [
      {
       "soru": "Bir kapta $0{,}2$ mol $N_2$ ve $0{,}3$ mol $O_2$ var; toplam basınç $2$ atm. $O_2$'nin kısmi basıncı kaçtır?",
       "cozum": "$X_{O_2} = \\frac{0{,}3}{0{,}5} = 0{,}6$; $P_{O_2} = 0{,}6\\cdot2 = 1{,}2$ atm."
      },
      {
       "soru": "Aynı koşullarda $He$ (4 g/mol) ve $CH_4$ (16 g/mol) gazlarının yayılma hızları oranı $v_{He}/v_{CH_4}$ nedir?",
       "cozum": "$\\sqrt{16/4} = 2$ → helyum 2 kat hızlıdır."
      }
     ],
     "ozet": [
      "Ortalama kinetik enerji yalnızca T'ye bağlı.",
      "Graham: $v_1/v_2 = \\sqrt{M_2/M_1}$.",
      "Gerçek gaz yüksek basınç–düşük sıcaklıkta idealden sapar."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Çözelti derişimleri ve koligatif özellikler",
     "en": "Solution concentrations and colligative properties"
    },
    "content": {
     "anlatim": "# Derişim Birimleri\n\n| Birim | Formül |\n|---|---|\n| **Kütlece yüzde** | $\\dfrac{m_{çözünen}}{m_{çözelti}}\\times100$ |\n| **Molarite (M)** | $\\dfrac{n_{çözünen}}{V_{çözelti}\\,(\\text{L})}$ |\n| **Molalite (m)** | $\\dfrac{n_{çözünen}}{m_{çözücü}\\,(\\text{kg})}$ |\n| **Mol kesri** | $X_A = \\dfrac{n_A}{n_{toplam}}$ |\n| **ppm** | $\\dfrac{m_{çözünen}}{m_{çözelti}}\\times10^6$ (çok seyreltik çözeltiler) |\n\n**Seyreltme/karıştırma:** $M_1V_1 = M_2V_2$ · $M_{son} = \\dfrac{M_1V_1 + M_2V_2}{V_1 + V_2}$\n\n# Koligatif Özellikler\n\nÇözünen **taneciklerin türüne değil sayısına** bağlı özellikler:\n- **Buhar basıncı düşmesi** (Raoult: $P = X_{çözücü}\\cdot P^\\circ$)\n- **Kaynama noktası yükselmesi:** $\\Delta T_k = K_k \\cdot m \\cdot i$\n- **Donma noktası alçalması:** $\\Delta T_d = K_d \\cdot m \\cdot i$\n- **Ozmotik basınç**\n\n$i$: **tanecik sayısı** (van't Hoff faktörü) — şeker $i = 1$, $NaCl$ $i = 2$, $CaCl_2$ $i = 3$.\n\n**Uygulamalar:** Kışın yollara tuz serpme, antifriz, deniz suyunun daha geç donması, tuzlu suda makarnanın daha yüksek sıcaklıkta kaynaması.",
     "ornekler": [
      {
       "soru": "$0{,}2$ mol $NaOH$ ile $500$ mL çözelti hazırlanıyor. Molarite kaçtır?",
       "cozum": "$M = \\frac{0{,}2}{0{,}5} = 0{,}4$ M."
      },
      {
       "soru": "Eşit molalitedeki şeker, $NaCl$ ve $CaCl_2$ çözeltilerinin donma noktalarını sıralayınız.",
       "cozum": "Tanecik sayıları $1 < 2 < 3$; donma noktası alçalması en çok $CaCl_2$'de: **şeker > NaCl > CaCl₂** (en düşük donma noktası CaCl₂)."
      }
     ],
     "ozet": [
      "Molarite mol/L çözelti; molalite mol/kg çözücü.",
      "Koligatif özellik tanecik sayısına bağlıdır.",
      "$\\Delta T = K\\cdot m\\cdot i$; NaCl için $i = 2$."
     ]
    }
   }
  ]
 }
];
