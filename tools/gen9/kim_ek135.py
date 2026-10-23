# -*- coding: utf-8 -*-
r"""9. Sınıf Kimya — 1.35.0 tamamlama: Maarif programındaki KİM.9.2.10–9.2.13 ve KİM.9.3.1 (deney) kazanımları,
anlatım ekleri, çözümlü örnekler, özet maddeleri."""
from common import O

KOD = {"u2/k9": "KİM.9.2.9", "u3/k1": "KİM.9.3.1", "u3/k2": "KİM.9.3.2", "u3/k3": "KİM.9.3.2"}

ANLATIM = {
"u1/k4": r"""
# Orbitallerin Bağıl Enerjisini Tahmin Etme: $n + \ell$ Kuralı
Her orbital türünün bir **açısal kuantum sayısı** vardır: $s \to \ell = 0$, $p \to 1$, $d \to 2$, $f \to 3$. Baş kuantum sayısı $n$ (enerji düzeyi) ile toplanır:
- $n + \ell$ değeri **küçük olan** orbitalin enerjisi düşüktür.
- $n + \ell$ eşitse **$n$'si küçük olan** önce gelir.

| Orbital | $n$ | $\ell$ | $n + \ell$ |
|---|---|---|---|
| 3d | 3 | 2 | 5 |
| 4s | 4 | 0 | 4 → **4s önce dolar** |
| 4p | 4 | 1 | 5 → 3d ile eşit, $n$'si büyük olduğu için 3d'den sonra |

- Her enerji düzeyindeki orbital sayısı $n^2$, en fazla elektron sayısı $2n^2$'dir (1. düzey 2, 2. düzey 8, 3. düzey 18 elektron).
- **Veri:** Hidrojen atomunun emisyon spektrumundaki çizgiler, elektronların belirli enerji düzeyleri arasında geçiş yaptığını gösteren deneysel kanıttır.
""",
"u1/k5": r"""
# Kısa Gösterim ve Küresel Simetri
- **Soy gaz kısaltması:** Na: $[\text{Ne}]\ 3s^1$ · Cl: $[\text{Ne}]\ 3s^2 3p^5$ · K: $[\text{Ar}]\ 4s^1$.
- **Küresel simetri:** Dizilimi $s^1$, $s^2$, $p^3$, $p^6$, $d^5$, $d^{10}$ ile biten atomlar daha kararlıdır.
- **İstisna:** Cr ve Cu'da bir elektron 4s'ten 3d'ye geçer: Cr: $[\text{Ar}]\ 4s^1 3d^5$, Cu: $[\text{Ar}]\ 4s^1 3d^{10}$ (yarı dolu/tam dolu d daha kararlıdır).
""",
"u1/k6": r"""
# Dizilimden Yer, Yerden Dizilim
- **Son orbital $s$ veya $p$ ise A grubu:** grup numarası = son katmandaki elektron sayısı. ($3s^2 3p^4$ → 6A, kükürt)
- **Son orbital $d$ ise B grubu** (geçiş metalleri, 4. periyottan itibaren).
- **Blok:** dizilim $s$ ile bitiyorsa s bloku (1A, 2A, He), $p$ ile bitiyorsa p bloku (3A–8A), $d$ ile bitiyorsa d bloku.
- **Mendeleyev** elementleri artan atom kütlesine göre dizip boş yerler bırakmış ve henüz bulunmamış elementlerin özelliklerini tahmin etmiştir; **Moseley** düzenin atom numarasına göre olması gerektiğini göstermiştir. (Bilimsel bilginin gelişmesine bir örnek.)
""",
"u1/k7": r"""
# İyon Yarıçapı ve Yük
- **Katyon** kendi atomundan **küçüktür** (dış katman boşalır, kalan elektronlar çekirdeğe daha sıkı çekilir): $r(\text{Na}^+) < r(\text{Na})$.
- **Anyon** kendi atomundan **büyüktür** (elektronlar arası itme artar): $r(\text{Cl}^-) > r(\text{Cl})$.
- **İzoelektronik taneciklerde** proton sayısı arttıkça yarıçap küçülür: $\text{O}^{2-} > \text{F}^- > \text{Na}^+ > \text{Mg}^{2+}$ (hepsi 10 elektronlu).

| Grup | Oluşturduğu iyon | Örnek |
|---|---|---|
| 1A | $+1$ | $\text{K}^+$ |
| 2A | $+2$ | $\text{Ca}^{2+}$ |
| 3A | $+3$ | $\text{Al}^{3+}$ |
| 6A | $-2$ | $\text{S}^{2-}$ |
| 7A | $-1$ | $\text{F}^-$ |
""",
"u1/k8": r"""
# Neden Böyle Değişiyor?
- **Periyotta soldan sağa:** Proton sayısı artar, elektronlar **aynı katmana** eklenir → çekirdeğin dış elektronları çekmesi güçlenir → yarıçap küçülür, elektron koparmak zorlaşır.
- **Grupta yukarıdan aşağı:** Yeni katman eklenir, dış elektronlar çekirdekten uzaklaşır ve iç elektronlar çekimi **perdeler** → yarıçap büyür, elektron koparmak kolaylaşır.
- **Ardışık iyonlaşma enerjileri:** Her elektron bir öncekinden zor kopar ($IE_1 < IE_2 < IE_3$). Soy gaz düzenine ulaşıldıktan sonraki sıçrama **grup numarasını** gösterir: Mg'de $IE_3$, $IE_2$'nin çok üstündedir → 2 değerlik elektronu, **2A**.
- **Metalik/ametalik karakter:** Periyotta metalik özellik azalır, grupta artar; en aktif metaller sol altta (Cs, Fr), en aktif ametal sağ üstte (F).
""",
"u2/k1": r"""
# Metalik Bağın Gücü Neye Bağlı?
- **Değerlik elektronu sayısı** arttıkça elektron denizi yoğunlaşır, bağ güçlenir: $\text{Na} (1e^-) < \text{Mg} (2e^-) < \text{Al} (3e^-)$ → erime noktaları da bu sırayla artar (98 °C, 650 °C, 660 °C).
- **İyon yarıçapı** küçüldükçe çekim artar: 1A grubunda aşağı inildikçe erime noktası düşer (Li 181 °C > Na 98 °C > K 63 °C).
- **Alaşımlar:** Bir metale başka element katılarak (çelik: Fe + C; bronz: Cu + Sn; pirinç: Cu + Zn) sertlik, dayanıklılık ve korozyon direnci artırılır.

> Cıva (Hg) oda sıcaklığında sıvı olan tek metaldir; metalik bağı zayıftır.
""",
"u2/k2": r"""
# Lewis Yapısıyla İyonik Bileşik Formülü
1. Metal ve ametalin iyon yüklerini bul (grup numarasından).
2. Toplam yük **sıfır** olacak şekilde iyon sayılarını eşitle (çapraz kuralı).

| İyonlar | Formül | Ad |
|---|---|---|
| $\text{Na}^+$, $\text{Cl}^-$ | NaCl | Sodyum klorür |
| $\text{Mg}^{2+}$, $\text{Cl}^-$ | MgCl₂ | Magnezyum klorür |
| $\text{Al}^{3+}$, $\text{O}^{2-}$ | Al₂O₃ | Alüminyum oksit |
| $\text{Ca}^{2+}$, $\text{O}^{2-}$ | CaO | Kalsiyum oksit |

- **Kırılganlık nedeni:** Kristal bir darbe ile kaydığında aynı yüklü iyonlar karşı karşıya gelir ve birbirini iter; kristal kırılır.
""",
"u2/k3": r"""
# Bağ Sayısı ve Bağ Gücü
- Atomlar oktete ulaşmak için **eksik elektron sayısı kadar** bağ yapar: H (1), O (2), N (3), C (4).
- **Bağ çeşidi:** H₂ → H–H (tekli), O₂ → O=O (ikili), N₂ → N≡N (üçlü). Üçlü bağ en kısa ve en güçlüdür; bu yüzden N₂ çok kararlıdır.
- **Elektronegatiflik farkına göre bağ türü (yaklaşık):** fark 0 → apolar kovalent · küçük/orta fark → polar kovalent · büyük fark (≈1,7 üzeri, genellikle metal–ametal) → iyonik karakter baskın.

| Özellik | Kovalent (moleküler) | İyonik |
|---|---|---|
| Oluşan tanecik | Molekül | İyon örgüsü |
| Erime noktası | Genellikle düşük | Yüksek |
| Elektrik iletkenliği | İletmez (saf hâlde) | Eriyik/çözeltide iletir |
""",
"u2/k4": r"""
# Lewis Yapısı Çizme Adımları
1. Toplam **valans elektron** sayısını bul (CO₂: $4 + 2 \cdot 6 = 16$).
2. Genellikle elektronegatifliği **en düşük** atomu (H hariç) merkeze koy.
3. Merkez ile çevre atomlar arasında **tekli bağ** çiz (her bağ 2 elektron).
4. Kalan elektronları önce **çevre atomlara**, sonra merkeze **ortaklanmamış çift** olarak yerleştir.
5. Merkez atomun okteti eksikse çevredeki ortaklanmamış çiftlerden **ikili/üçlü bağ** oluştur.

| Molekül | Bağ yapısı | Merkez atomdaki ortaklanmamış çift |
|---|---|---|
| H₂O | 2 tekli bağ | 2 |
| NH₃ | 3 tekli bağ | 1 |
| CH₄ | 4 tekli bağ | 0 |
| CO₂ | 2 ikili bağ | 0 |
""",
"u2/k5": r"""
# Geometri Nasıl Belirlenir? (Elektron Çifti İtmesi)
Merkez atom çevresindeki **bağlı ve ortaklanmamış elektron çiftleri** birbirini iter ve olabildiğince uzaklaşır:

| Molekül | Bağlı çift | Ortaklanmamış çift | Şekil | Polarlık |
|---|---|---|---|---|
| CO₂ | 2 | 0 | Doğrusal | Apolar |
| BF₃ | 3 | 0 | Düzlem üçgen | Apolar |
| CH₄ | 4 | 0 | Düzgün dörtyüzlü | Apolar |
| NH₃ | 3 | 1 | Üçgen piramit | Polar |
| H₂O | 2 | 2 | Kırık doğru (açısal) | Polar |

- **Kısa kural:** Merkez atomda **ortaklanmamış çift varsa** ya da çevre atomlar **farklıysa** molekül genellikle polardır.
- **Deney:** Yüklü bir çubuk ince su akıntısına yaklaştırılırsa su **sapar** (polar); hekzan gibi apolar sıvının akıntısı sapmaz.
""",
"u2/k6": r"""
# Sık Kullanılan Çok Atomlu İyonlar
| İyon | Ad | Örnek bileşik |
|---|---|---|
| $\text{OH}^-$ | Hidroksit | NaOH — sodyum hidroksit |
| $\text{NO}_3^-$ | Nitrat | KNO₃ — potasyum nitrat |
| $\text{SO}_4^{2-}$ | Sülfat | CaSO₄ — kalsiyum sülfat |
| $\text{CO}_3^{2-}$ | Karbonat | CaCO₃ — kalsiyum karbonat |
| $\text{PO}_4^{3-}$ | Fosfat | Ca₃(PO₄)₂ — kalsiyum fosfat |
| $\text{NH}_4^+$ | Amonyum | NH₄Cl — amonyum klorür |

- **Yaygın adlar:** H₂O su, NH₃ amonyak, CH₄ metan (sistematik ad yerine kullanılır).
- Değişken değerlikli metaller: Fe ($+2$, $+3$), Cu ($+1$, $+2$) → FeO demir(II) oksit, Fe₂O₃ demir(III) oksit.
""",
"u2/k8": r"""
# Katı Türleri ve Özellikleri
| Kristal türü | Tanecikler arası etkileşim | Özellikler | Örnek |
|---|---|---|---|
| **İyonik** | İyonik bağ | Sert, kırılgan, yüksek erime noktası; katıyken iletmez | NaCl, MgO |
| **Metalik** | Metalik bağ | İletken, dövülebilir, parlak | Fe, Cu, Al |
| **Moleküler** | Moleküller arası etkileşim | Yumuşak, düşük erime noktası, iletmez | Buz, şeker, iyot |
| **Kovalent ağ** | Kovalent bağ (dev yapı) | Çok sert, çok yüksek erime noktası | Elmas, kuvars (SiO₂) |

- **Grafit ve elmas** ikisi de karbondur (allotrop): elmasta her C dört C'ye bağlı (çok sert); grafitte katmanlar arasında zayıf etkileşim vardır (kurşun kalemde kâğıda geçer, elektriği iletir).
- **Camın** belirli bir erime noktası yoktur; ısıtıldıkça **yumuşar** (amorf).
""",
"u3/k1": r"""
# Neden "Nano" Farklı?
1 cm küplük altın parçası sarıdır; aynı altın 20 nm'lik parçacıklara bölünürse çözeltisi **kırmızı** görünür. Küp ne kadar küçük parçaya bölünürse toplam yüzey o kadar büyür:

| Küp kenarı | Toplam yüzey (aynı toplam hacim 1 cm³) |
|---|---|
| 1 cm | 6 cm² |
| 1 mm | 60 cm² |
| 1 µm | 6 m² |
| 10 nm | 600 m² |

Yüzeydeki atomlar daha **etkin** olduğundan nanoparçacıklar iyi **katalizör** ve **antibakteriyel** maddelerdir.

- **Ekolojik sürdürülebilirlik açısından:** Faydaları (az malzemeyle çok iş, enerji tasarrufu) ile riskleri (sudaki canlılara geçiş, birikme) birlikte değerlendirilir.
""",
"u3/k2": r"""
# Atık Önlemenin Ölçülmesi
- **Atom ekonomisi:** İstenen ürüne dönüşen atomların oranı. $\text{Atom ekonomisi} = \dfrac{\text{istenen ürünün kütlesi}}{\text{tüm ürünlerin kütlesi}} \cdot 100$. Değer yüksekse atık azdır.
- **Kimyasal ayak izi:** Bir ürünün yaşam döngüsü boyunca çevreye saldığı zararlı kimyasalların toplam etkisi. **Ekolojik ayak izi:** Tüketimimizi karşılamak için gereken doğa alanı.

**Günlük hayatta atık önleme:** Gereğinden fazla deterjan kullanmamak, tek kullanımlık ürünler yerine yeniden kullanılabilirleri tercih etmek, laboratuvarda **mikro ölçekli** deney yaparak az kimyasal harcamak, ilaç ve pilleri ayrı toplamak.
""",
}

ORNEK = {
"u1/k1": [
 (r"Analitik kimyacı bir su numunesinde “kurşun var mı?” ve “litrede kaç mg kurşun var?” sorularını cevaplıyor. Bu sorular hangi analiz türlerine örnektir?",
  r"“Var mı?” sorusu **nitel (kalitatif)** analiz, “ne kadar?” sorusu **nicel (kantitatif)** analizdir. İkisi birlikte suyun içilebilir olup olmadığına karar vermeyi sağlar."),
],
"u1/k4": [
 (r"3d, 4s ve 4p orbitallerini enerjisi artan sırada yazınız.",
  r"$n + \ell$: 4s → $4 + 0 = 4$; 3d → $3 + 2 = 5$; 4p → $4 + 1 = 5$. En küçük 4s; 3d ve 4p eşit, $n$'si küçük olan 3d önce: **4s < 3d < 4p**."),
 (r"3. enerji düzeyinde kaç orbital ve en fazla kaç elektron bulunabilir?",
  r"Orbital sayısı $n^2 = 9$ (bir 3s, üç 3p, beş 3d). En fazla elektron $2n^2 = 18$."),
],
"u1/k6": [
 (r"Elektron dizilimi $1s^2 2s^2 2p^6 3s^2 3p^4$ olan elementin periyodunu, grubunu ve bloğunu bulunuz.",
  r"En yüksek katman 3 → **3. periyot**. Son katmandaki elektron $2 + 4 = 6$ → **6A** grubu. Dizilim $p$ ile bittiği için **p bloku** (kükürt, ametal)."),
],
"u1/k7": [
 (r"$\text{S}^{2-}$, $\text{Cl}^-$, $\text{K}^+$, $\text{Ca}^{2+}$ izoelektronik taneciklerini (18 elektron) yarıçapı küçükten büyüğe sıralayınız. (Z: S 16, Cl 17, K 19, Ca 20)",
  r"Elektron sayısı aynı olduğunda **proton sayısı büyük olan** elektronları daha çok çeker, yarıçapı küçüktür: $\text{Ca}^{2+} < \text{K}^+ < \text{Cl}^- < \text{S}^{2-}$."),
],
"u1/k8": [
 (r"Bir elementin ardışık iyonlaşma enerjileri (kJ/mol): $IE_1 = 578$, $IE_2 = 1817$, $IE_3 = 2745$, $IE_4 = 11577$. Bu element hangi gruptadır?",
  r"Büyük sıçrama $IE_3$'ten $IE_4$'e geçerken görülür → 3 elektron kolay, 4.sü çok zor kopar. **3 değerlik elektronu → 3A grubu** (alüminyum)."),
],
"u2/k1": [
 (r"Bakırın elektrik kablolarında, alüminyumun uçak gövdesinde kullanılmasını metalik bağ özellikleriyle açıklayınız.",
  r"Bakır: serbest elektronları sayesinde **elektriği çok iyi iletir** ve **tel hâline getirilebilir**. Alüminyum: hafif, dövülebilir ve yüzeyinde koruyucu oksit tabakası oluştuğu için korozyona dayanıklıdır."),
 (r"Na, Mg ve Al'nin erime noktalarını karşılaştırınız. Neden?",
  r"**Na < Mg < Al.** Değerlik elektronu sayısı 1, 2, 3 olarak arttıkça elektron denizi yoğunlaşır ve iyon yükü büyür; metalik bağ güçlenir, erime noktası yükselir."),
],
"u2/k2": [
 (r"Alüminyum (3A) ile oksijen (6A) arasında oluşan bileşiğin formülünü ve adını yazınız.",
  r"$\text{Al}^{3+}$ ve $\text{O}^{2-}$: toplam yükün sıfır olması için 2 Al ($+6$) ve 3 O ($-6$) gerekir → **Al₂O₃, alüminyum oksit**."),
],
"u2/k3": [
 (r"Azot molekülünde (N₂) atomlar arasında kaç bağ vardır? N₂ neden tepkimeye zor girer?",
  r"Azotun 5 valans elektronu vardır, oktet için 3 elektron eksiktir. İki N atomu **üç çift elektronu** ortaklaşa kullanır: **N≡N (üçlü bağ)**. Üçlü bağ çok güçlü olduğu için N₂ kararlıdır ve zor tepkimeye girer."),
 (r"HF, F₂ ve NaF bileşiklerindeki bağ türlerini belirleyiniz.",
  r"F₂: aynı atomlar → **apolar kovalent**. HF: iki ametal, elektronegatiflik farkı büyük → **polar kovalent**. NaF: metal + ametal → **iyonik**."),
],
"u2/k4": [
 (r"Amonyak (NH₃) molekülünün Lewis yapısını tarif ediniz.",
  r"Toplam valans elektron: $5 + 3 \cdot 1 = 8$. N merkezde, üç H ile **üç tekli bağ** (6 elektron) yapar; kalan 2 elektron N üzerinde **bir ortaklanmamış çift** olur. N oktet, her H dublet tamamlar."),
],
"u2/k5": [
 (r"CCl₄ molekülü polar bağlar içerdiği hâlde neden apolardır?",
  r"C–Cl bağları polardır; ancak dört Cl atomu C çevresinde **düzgün dörtyüzlü** ve simetrik dizilir. Bağ dipolleri birbirini **götürür**, toplam dipol moment sıfırdır → **apolar molekül**."),
 (r"Su akıntısı yüklü bir çubukla sapıyor, hekzan akıntısı sapmıyor. Bu gözlemden ne çıkarılır?",
  r"Su molekülleri **polardır** (kırık doğru geometri, ortaklanmamış çiftler); kalıcı dipolleri yüklü çubuğun elektrik alanında yönlenir. Hekzan **apolardır**, kalıcı dipolü olmadığından sapmaz."),
],
"u2/k6": [
 (r"Fe₂O₃, NH₄NO₃ ve SO₃ bileşiklerini adlandırınız.",
  r"Fe₂O₃: oksijen $-2$ → 3 O = $-6$, 2 Fe = $+6$ → Fe $+3$: **demir(III) oksit**. NH₄NO₃: **amonyum nitrat**. SO₃ (moleküler): **kükürt trioksit**."),
],
"u2/k7": [
 (r"HF, HCl, HBr bileşiklerinden HF'nin kaynama noktası neden en yüksektir? HCl ve HBr arasında hangisininki daha yüksektir?",
  r"HF molekülleri arasında **hidrojen bağı** vardır (H, F'ye bağlı) → kaynama noktası en yüksek. HCl ile HBr arasında hidrojen bağı yoktur; HBr daha büyük molekül olduğundan **London kuvvetleri** daha güçlüdür → HBr'nin kaynama noktası HCl'ninkinden yüksektir."),
],
"u2/k8": [
 (r"Elmas ve grafit aynı elementten oluştuğu hâlde neden çok farklı özelliklere sahiptir?",
  r"İkisi de karbonun **allotropudur** ama atomların dizilişi farklıdır. Elmasta her C dört C'ye kovalent bağlı **üç boyutlu ağ** → çok sert. Grafitte katmanlar arası etkileşim **zayıf** → katmanlar kayar, yumuşaktır; serbest elektronları olduğu için elektriği iletir."),
 (r"Buz, NaCl ve demir katılarını erime noktasına göre sıralayınız (büyükten küçüğe).",
  r"Demir (metalik bağ, ~1538 °C) > NaCl (iyonik, 801 °C) > buz (moleküler, 0 °C). Moleküler katılarda tanecikleri bir arada tutan etkileşimler en zayıf olduğundan erime noktası en düşüktür."),
],
"u2/k9": [
 (r"Aynı sıcaklıkta su, etanol ve dietil eterden hangisinin buhar basıncı en yüksektir? (Su ve etanolde hidrojen bağı vardır; eterde yoktur.)",
  r"Moleküller arası etkileşim zayıfladıkça moleküller kolay buharlaşır, buhar basıncı artar. **Dietil eter** (hidrojen bağı yok) en yüksek, **su** (en çok hidrojen bağı) en düşük buhar basıncına sahiptir: su < etanol < eter."),
],
"u3/k1": [
 (r"Kenarı 1 cm olan bir küp, kenarı 1 mm olan küplere bölünüyor. Toplam yüzey alanı kaç katına çıkar?",
  r"Kenar 10 kat küçülür → $10^3 = 1000$ küp oluşur. Her biri $6 \cdot (0{,}1)^2 = 0{,}06\ \text{cm}^2$ → toplam $60\ \text{cm}^2$. İlk yüzey $6\ \text{cm}^2$ olduğundan **10 katına** çıkar. Bölünme sürdükçe yüzey artar; nanoparçacıkların etkinliğinin nedeni budur."),
 (r"Gümüş nanoparçacık içeren çorapların yıkanmasıyla ilgili olası bir çevre sorununu açıklayınız.",
  r"Yıkama sırasında gümüş nanoparçacıklar **atık suya** karışır. Arıtmada tam tutulamazsa nehir ve göllere geçer; antibakteriyel etkisi nedeniyle **yararlı mikroorganizmalara** ve su canlılarına zarar verebilir."),
],
"u3/k2": [
 (r"Bir tepkimede 100 g tepken kullanılıyor; 60 g istenen ürün ve 40 g yan ürün oluşuyor. Atom ekonomisi yüzde kaçtır? Yeşil kimya açısından yorumlayınız.",
  r"Atom ekonomisi $= \dfrac{60}{100} \cdot 100 = \%60$. Atomların %40'ı atığa gidiyor; yan ürün oluşturmayan ya da yan ürünü değerlendirilebilen bir yöntem seçmek **atık önleme** ilkesine daha uygun olur."),
 (r"Okul laboratuvarında aynı deney 50 mL yerine 2 mL çözeltiyle (mikro ölçekte) yapılıyor. Bunun yeşil kimya açısından yararları nelerdir?",
  r"Kullanılan kimyasal ve su miktarı **25 kat azalır**, oluşan atık ve atık bertaraf maliyeti düşer, kaza riski azalır. Atık oluşmadan önlenmiş olur."),
],
"u3/k3": [
 (r"Eski pillerin çöpe atılmasının çevreye zararını açıklayınız.",
  r"Pillerdeki **cıva, kadmiyum, kurşun** gibi ağır metaller toprak ve yer altı suyuna sızar. Bu metaller canlılarda **biyobirikim** yapar ve besin zinciriyle insana ulaşır. Piller ayrı toplanıp geri kazanılmalıdır."),
 (r"Bir göl kenarındaki fabrikanın atık suyunda bakır nanoparçacıklar tespit ediliyor. Sorunu çözmek için kanıta dayalı iki öneri sununuz.",
  r"1) Atık su **arıtmada nanoparçacıkları tutan filtreler** (ultrafiltrasyon, çöktürme) kullanılmalı ve çıkış suyu düzenli **ölçülmelidir**. 2) Üretimde bakır yerine daha az zararlı bir malzeme ya da **kapalı devre** su kullanımı tercih edilerek atık kaynağında önlenmelidir."),
],
}

OZET = {
"u2/k1": ["Değerlik elektronu arttıkça metalik bağ güçlenir: Na < Mg < Al (erime noktası)."],
"u2/k3": ["Bağ sayısı = oktete eksik elektron (H 1, O 2, N 3, C 4); N≡N en güçlü bağlardandır."],
"u2/k4": ["Adımlar: valans e⁻ say → merkez seç → tekli bağ → kalan e⁻ → gerekirse çoklu bağ."],
"u3/k2": ["Atom ekonomisi = istenen ürün kütlesi / tüm ürünler × 100; yüksekse atık azdır."],
}

EK = {
"u2": [
O("k10", "KİM.9.2.10", "Sıvıların kaynama sıcaklığını etkileyen faktörlere ilişkin kanıt kullanabilme",
  "Uses evidence about the factors affecting the boiling point of liquids", r"""
# Kaynama Sıcaklığı
Bir sıvının **buhar basıncı dış basınca eşit** olduğunda sıvının her yerinde buhar kabarcıkları oluşur ve sıvı kaynar. Bu sıcaklık **kaynama sıcaklığıdır**.

## 1. Etken: Moleküller Arası Etkileşimin Türü ve Gücü
Etkileşim güçlendikçe molekülleri ayırmak için daha çok enerji gerekir → kaynama sıcaklığı **yükselir**.

| Madde | Baskın etkileşim | Kaynama sıcaklığı (1 atm) |
|---|---|---|
| Metan (CH₄) | London | −162 °C |
| Hidrojen sülfür (H₂S) | Dipol–dipol + London | −60 °C |
| Su (H₂O) | **Hidrojen bağı** | 100 °C |
| Etanol (C₂H₅OH) | Hidrojen bağı | 78 °C |

- Benzer büyüklükteki moleküllerde **hidrojen bağı** yapan madde çok daha yüksek sıcaklıkta kaynar (H₂O ile H₂S'yi karşılaştır).
- Aynı tür etkileşimde molekül **büyüdükçe** London kuvvetleri artar: F₂ < Cl₂ < Br₂ < I₂.

## 2. Etken: Dış (Atmosfer) Basıncı
- Dış basınç **azalırsa** sıvı daha düşük sıcaklıkta kaynar: Ankara'da (~900 m) su yaklaşık 97 °C'de, Everest'in tepesinde yaklaşık 70 °C'de kaynar.
- Dış basınç **artarsa** kaynama sıcaklığı yükselir: düdüklü tencerede ~120 °C → yemek hızlı pişer.

## 3. Etken: Saflık
Suya tuz ya da şeker çözülürse buhar basıncı düşer, **kaynama sıcaklığı yükselir**.

> **Kanıt kullanma:** “Hangi madde daha yüksek sıcaklıkta kaynar?” sorusunda iddiayı **etkileşim türüne** ve **ölçülmüş kaynama sıcaklıklarına** dayandır.
""",
  [(r"H₂O (18 g/mol) ve H₂S (34 g/mol) benzer yapıda moleküllerdir. H₂S daha ağır olduğu hâlde suyun kaynama sıcaklığı neden çok daha yüksektir?",
    r"Su molekülleri arasında **hidrojen bağı** vardır (H, O'ya bağlı); H₂S'de kükürdün elektronegatifliği düşük olduğundan hidrojen bağı oluşmaz. Hidrojen bağı, kütle farkından gelen London etkisinden çok daha güçlüdür: su 100 °C'de, H₂S −60 °C'de kaynar."),
   (r"Bir dağcı 4000 m yükseklikte makarna haşlıyor. Su kaynadığı hâlde makarna neden geç pişer? Çözüm önerisi veriniz.",
    r"Yükseklikte **dış basınç düşüktür**, su 100 °C'nin altında (≈ 87 °C) kaynar; daha düşük sıcaklıkta pişme yavaşlar. **Düdüklü tencere** basıncı artırıp kaynama sıcaklığını yükselterek sorunu çözer.")],
  ["Kaynama: buhar basıncı = dış basınç.", "Etkileşim güçlendikçe kaynama sıcaklığı yükselir (hidrojen bağı > dipol–dipol > London, benzer boyutta).", "Dış basınç azalırsa kaynama sıcaklığı düşer; çözünen madde ekleyince yükselir."]),
O("k11", "KİM.9.2.11", "Sıvıların viskozitesini etkileyen faktörlere ilişkin bilimsel gözlem yapabilme",
  "Makes scientific observations about factors affecting the viscosity of liquids", r"""
# Viskozite (Akmaya Karşı Direnç)
**Viskozite**, bir sıvının akmaya karşı gösterdiği dirençtir. Viskozitesi yüksek sıvı (bal) yavaş, düşük sıvı (su, kolonya) hızlı akar. Viskozitenin tersi **akışkanlıktır**.

## Viskoziteyi Etkileyen Faktörler
| Faktör | Etki | Örnek |
|---|---|---|
| **Moleküller arası etkileşim** | Güçlüyse viskozite yüksek | Gliserin (3 OH → çok hidrojen bağı) sudan çok viskozdur |
| **Molekül büyüklüğü ve şekli** | Uzun, dallanmış, birbirine dolanan moleküller → viskozite yüksek | Motor yağı, bal |
| **Sıcaklık** | Sıcaklık artınca **azalır** (moleküllerin kinetik enerjisi artar) | Isıtılan bal kolay akar |

## Gözlem Etkinliği: Bilye Düşürme
1. Aynı boyda üç dereceli silindire su, sıvı yağ ve gliserin koy.
2. Özdeş bilyeleri aynı yükseklikten bırak, dibe ulaşma **süresini** kronometreyle ölç.
3. Bağımsız değişken: sıvının türü (ya da sıcaklığı) · Bağımlı: düşme süresi · Kontrol: bilye, yükseklik, sıcaklık.
4. Süre ne kadar uzunsa sıvının viskozitesi o kadar büyüktür.

| Sıvı | Düşme süresi (örnek veri) | Viskozite sırası |
|---|---|---|
| Su | 0,4 s | En düşük |
| Ayçiçek yağı | 2,1 s | Orta |
| Gliserin | 9,5 s | En yüksek |

> ⚠ Viskozite ile **yoğunluk** farklı özelliklerdir: Sıvı yağ suyun üstünde durur (yoğunluğu küçüktür) ama sudan daha **viskozdur**.
""",
  [(r"Kışın soğuk havalarda araç motorlarında neden ince (düşük viskoziteli) yağ önerilir?",
    r"Sıcaklık düşünce yağın **viskozitesi artar**, yağ zor akar ve motor çalıştırıldığında parçalara geç ulaşır. Kışlık yağın düşük sıcaklıktaki viskozitesi küçük olduğundan motoru daha iyi korur."),
   (r"Bilye düşürme deneyinde suda 0,5 s, aynı sıcaklıkta gliserinde 10 s ölçülüyor. Gliserin ısıtılıp deney tekrarlanırsa süre nasıl değişir? Neden?",
    r"Süre **kısalır**. Isınan gliserin moleküllerinin kinetik enerjisi artar, hidrojen bağlarının molekülleri bir arada tutma etkisi azalır; **viskozite düşer** ve bilye daha hızlı iner.")],
  ["Viskozite: akmaya karşı direnç; akışkanlığın tersi.", "Güçlü etkileşim, büyük/uzun molekül → viskozite yüksek; sıcaklık artarsa viskozite azalır.", "⚠ Viskozite ≠ yoğunluk (yağ sudan hafif ama daha viskoz)."]),
O("k12", "KİM.9.2.12", "Adezyon ve kohezyon kuvvetlerinin sıvıların özelliklerine etkisine ilişkin bilimsel çıkarım yapabilme",
  "Makes inferences about how adhesion and cohesion affect the properties of liquids", r"""
# Kohezyon ve Adezyon
- **Kohezyon:** Bir sıvının **kendi tanecikleri** arasındaki çekim (su–su).
- **Adezyon:** Sıvı tanecikleri ile **temas ettiği başka maddenin** tanecikleri arasındaki çekim (su–cam).

## Menisküs (Sıvı Yüzeyinin Şekli)
| Durum | Kuvvetler | Menisküs | Örnek |
|---|---|---|---|
| Cam tüpte su | **Adezyon > kohezyon** | İçbükey (kenarlar yukarı) | Su camı ıslatır |
| Cam tüpte cıva | **Kohezyon > adezyon** | Dışbükey (ortası yukarı) | Cıva camı ıslatmaz |

## Kılcallık (Kapiler Etki)
Adezyonun kohezyondan büyük olduğu durumlarda sıvı ince borularda **yerçekimine karşı yükselir**. Boru ne kadar **ince** ise sıvı o kadar yükselir.
- Bitkilerde suyun köklerden yapraklara taşınmasına katkı sağlar.
- Kâğıt havlunun suyu emmesi, lambanın fitilinde gaz yağının yükselmesi, kuru toprağın nemi çekmesi.

## Islatma
Bir damla yüzeye yayılıyorsa adezyon baskındır (su temiz camda); boncuk gibi toplanıyorsa kohezyon baskındır (su yağlı yüzeyde, nilüfer yaprağında).
""",
  [(r"Cam bir kılcal boru suya ve cıvaya batırılıyor. İki durumda sıvı yüzeyi nasıl görünür ve sıvı boru içinde yükselir mi?",
    r"**Su:** adezyon > kohezyon → içbükey menisküs, su boruda **yükselir** (kılcallık). **Cıva:** kohezyon > adezyon → dışbükey menisküs, cıva boruda dış seviyenin **altında** kalır."),
   (r"Yağmurluk kumaşları neden su itici bir maddeyle kaplanır? Adezyon–kohezyon ile açıklayınız.",
    r"Su itici (apolar) kaplama ile su arasındaki **adezyon zayıftır**; suyun kendi molekülleri arasındaki **kohezyon** baskın kalır. Su kumaşa yayılıp emilmek yerine **damla** hâlinde toplanıp akar.")],
  ["Kohezyon: aynı tanecikler arası; adezyon: farklı tanecikler arası çekim.", "Adezyon > kohezyon → içbükey menisküs, ıslatma, kılcallıkla yükselme (su–cam).", "Kohezyon > adezyon → dışbükey menisküs (cıva–cam), damla oluşumu."]),
O("k13", "KİM.9.2.13", "Yüzey gerilimini etkileyen faktörlere ilişkin bilimsel sorgulama yapabilme",
  "Conducts scientific inquiry into factors affecting surface tension", r"""
# Yüzey Gerilimi
Sıvının içindeki bir molekül her yönden eşit çekilir; **yüzeydeki** molekül ise yalnızca yanlardan ve aşağıdan çekilir. Bu dengesiz çekim yüzeyi gerilmiş bir zar gibi davranmaya zorlar: **yüzey gerilimi**. Sıvılar bu yüzden yüzeylerini en küçük yapacak şekilde **küresel damla** oluşturur.

## Yüzey Gerilimini Etkileyen Faktörler
| Faktör | Etki |
|---|---|
| Moleküller arası etkileşim | Güçlüyse yüzey gerilimi yüksek (su, hidrojen bağı nedeniyle yüksek yüzey gerilimine sahiptir) |
| Sıcaklık | Sıcaklık artınca **azalır** |
| Yüzey aktif maddeler (sabun, deterjan) | Yüzey gerilimini **düşürür** |

## Sorgulama Etkinliği: Bozuk Paranın Üstüne Kaç Damla?
1. **Araştırma sorusu:** “Suya deterjan eklemek bozuk paranın üstünde tutulabilen damla sayısını değiştirir mi?”
2. **Hipotez:** Deterjan yüzey gerilimini azalttığı için damla sayısı azalır.
3. **Değişkenler:** Bağımsız — deterjan miktarı; bağımlı — taşmadan önceki damla sayısı; kontrol — para, damlalık, sıcaklık.
4. **Veri:** Saf su ~30 damla, az deterjanlı su ~15 damla (örnek veri) → hipotez desteklenir.
5. **Bilimsel bilgiyle karşılaştır:** Deterjan molekülleri yüzeye yerleşip su molekülleri arasındaki çekimi zayıflatır.

## Günlük Hayatta
- **Su sinekleri** su yüzeyinde yürüyebilir; iğne dikkatlice konursa suyun yüzeyinde durur.
- **Çamaşır yıkama:** Deterjan yüzey gerilimini düşürür, su kumaşın liflerine kolayca girer ve kiri uzaklaştırır.
- Sıcak su soğuk sudan daha iyi temizler (yüzey gerilimi daha düşüktür).
""",
  [(r"Su yüzeyinde duran bir iğnenin yanına bir damla deterjan bırakılırsa ne olur? Neden?",
    r"İğne **batar**. Deterjan suyun **yüzey gerilimini düşürür**; yüzeydeki “gergin zar” etkisi zayıflar ve artık iğnenin ağırlığını taşıyamaz."),
   (r"Bir öğrenci “Sıcaklık arttıkça suyun yüzey gerilimi azalır.” iddiasını bozuk para–damla deneyiyle sınamak istiyor. Deneyini nasıl tasarlamalıdır?",
    r"**Bağımsız değişken:** suyun sıcaklığı (ör. 10 °C, 25 °C, 50 °C). **Bağımlı:** para taşmadan önce eklenen damla sayısı. **Kontrol:** aynı para, aynı damlalık, aynı saf su. Her sıcaklıkta deneyi en az üç kez tekrarlayıp ortalamayı almalıdır; damla sayısı sıcaklıkla azalıyorsa iddia desteklenir.")],
  ["Yüzey gerilimi: yüzeydeki moleküllerin içe doğru dengesiz çekilmesi; damlalar küreseldir.", "Etkileşim güçlüyse yüksek; sıcaklık artınca ve sabun/deterjan eklenince azalır.", "Deterjan yüzey gerilimini düşürerek suyun lifler arasına girmesini sağlar."]),
],
"u3": [
O("k4", "KİM.9.3.1", "Ev atıklarından metal nanoparçacık elde etmeye yönelik deney yapabilme",
  "Conducts experiments to obtain metal nanoparticles from household waste", r"""
# Atıktan Nanoparçacığa (Yeşil Sentez)
Gümüş ve bakır nanoparçacıklar, metal iyonlarının **indirgenmesiyle** elde edilir:

$$\text{Ag}^+ + e^- \rightarrow \text{Ag}$$

**Yeşil sentezde** zararlı kimyasal indirgenler yerine **bitki özütlerindeki** maddeler (polifenoller, C vitamini) kullanılır. Ev atıkları bu özütlerin kaynağı olabilir: **çay posası, portakal ve muz kabuğu, soğan kabuğu, kahve telvesi**.

## Deney Planı (öğretmen gözetiminde)
1. **Özüt hazırlama:** Kurutulmuş portakal kabuğu (10 g) saf suda (100 mL) 10 dakika kaynatılır, süzülür.
2. **Sentez:** 1 mM'lık gümüş nitrat (AgNO₃) çözeltisine özüt damla damla eklenir, ılık ortamda karıştırılır.
3. **Gözlem:** Renksiz çözelti **sarı → kahverengi** olur; bu renk değişimi gümüş nanoparçacık oluştuğunun göstergesidir.
4. **Doğrulama:** Lazer ışığı çözeltiden geçirilince ışık yolu görünür (**Tyndall etkisi** → koloit boyutta tanecik var).
5. **Karşılaştırma:** Farklı atıklardan (çay posası, soğan kabuğu) elde edilen özütlerle aynı deney yapılır; renk değişiminin **hızı ve tonu** karşılaştırılır.

| Değişken | Örnek |
|---|---|
| Bağımsız | Kullanılan atığın türü |
| Bağımlı | Renk değişimine kadar geçen süre, rengin koyuluğu |
| Kontrol | AgNO₃ derişimi ve hacmi, sıcaklık, özüt miktarı |

## Güvenlik ve Atık
- Gümüş nitrat **cildi lekeler ve gözü tahriş eder**: eldiven ve gözlük zorunludur.
- Deney sonunda çözeltiler lavaboya dökülmez; **ayrı atık kabında** toplanır (metal nanoparçacıkların suya karışması önlenir).

> Bu yöntem **atık önleme** (atığın değerlendirilmesi) ve **daha az zararlı sentez** ilkelerinin birlikte uygulandığı bir yeşil kimya örneğidir.
""",
  [(r"Portakal kabuğu özütü eklenen gümüş nitrat çözeltisinin sarı-kahverengiye dönmesi neyi gösterir? Hangi tanecik indirgenmiştir?",
    r"Çözeltide **gümüş nanoparçacıklar** oluştuğunu gösterir. Özütteki maddeler $\text{Ag}^+$ iyonlarına elektron vererek onları metalik **Ag**'ye **indirger**; nano boyuttaki gümüş ışığı farklı soğurduğu için renk değişir."),
   (r"Çay posası ve soğan kabuğu özütleriyle yapılan iki deneyde renk değişimi sırasıyla 5 ve 15 dakikada gözleniyor. Bu verilerden nasıl bir sonuç çıkarılabilir? Sonucun güvenilir olması için ne yapılmalıdır?",
    r"Çay posası özütünün gümüş iyonlarını **daha hızlı indirgediği** (indirgen maddece daha zengin olduğu) söylenebilir. Güvenilirlik için **diğer değişkenler sabit** tutulmalı (aynı derişim, hacim, sıcaklık, özüt miktarı) ve deneyler **tekrarlanmalıdır**.")],
  ["Metal nanoparçacıklar metal iyonlarının indirgenmesiyle elde edilir: Ag⁺ + e⁻ → Ag.", "Yeşil sentez: ev atıklarından (çay posası, meyve kabuğu) elde edilen bitki özütleri indirgen olarak kullanılır.", "Renk değişimi ve Tyndall etkisi nanoparçacık oluşumunun kanıtıdır; atıklar ayrı toplanır."]),
],
}
