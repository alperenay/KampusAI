# -*- coding: utf-8 -*-
r"""10. Sınıf Biyoloji — 1.42 eki: Hücre bölünmeleri, üreme ve kalıtım (AYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U

YENI = [U("u3", "3. Tema (Ek): Hücre Bölünmeleri, Üreme ve Kalıtım", "Theme 3 (Extra): Cell Division, Reproduction and Heredity", [

O("k1", "BİY.10.E1", "Hücre döngüsü ve mitoz", "The cell cycle and mitosis", r"""
# Hücreler Neden Bölünür?
Çok hücreli bir canlı **büyümek**, **yıpranan dokuları yenilemek** ve **yaraları onarmak** için yeni hücrelere ihtiyaç duyar. Tek hücreliler ise bölünerek **çoğalır**. Hücre büyüdükçe hacmi yüzey alanından hızlı arttığı için madde alışverişi zorlaşır; bölünme bu dengeyi yeniden kurar.

# Hücre Döngüsü
Bir hücrenin oluşmasından bölünüp iki hücre vermesine kadar geçen süreçtir. İki ana kısımdan oluşur:
- **İnterfaz (hazırlık evresi):** Döngünün en uzun bölümüdür.
  - **G1:** Hücre büyür, organel ve enzim sayısı artar.
  - **S:** **DNA eşlenir**; her kromozom iki **kardeş kromatitli** hâle gelir.
  - **G2:** Bölünmede kullanılacak proteinler üretilir, son kontroller yapılır.
- **Mitoz (çekirdek bölünmesi) + sitokinez (sitoplazma bölünmesi)**

> Döngüde **kontrol noktaları** vardır. DNA hasarlıysa döngü durdurulur; bu denetim bozulursa hücreler kontrolsüz çoğalabilir (**kanser**).

# Mitozun Evreleri
| Evre | Olaylar |
|---|---|
| **Profaz** | Kromatin kısalıp kalınlaşarak kromozom hâline gelir, çekirdek zarı ve çekirdekçik kaybolur, iğ iplikleri oluşmaya başlar. |
| **Metafaz** | Kromozomlar hücrenin ortasında (ekvatoral düzlem) tek sıra dizilir. Kromozomlar en belirgin bu evrede görülür. |
| **Anafaz** | Kardeş kromatitler birbirinden ayrılıp zıt kutuplara çekilir. |
| **Telofaz** | Kutuplarda yeni çekirdek zarları oluşur, kromozomlar tekrar gevşer. |

# Sitokinez
- **Hayvan hücresinde:** Hücre zarı ortadan içe doğru **boğumlanır**.
- **Bitki hücresinde:** Çeper sert olduğu için ortada **ara lamel (hücre plağı)** oluşur.

# Mitozun Sonucu
Bir **2n** hücreden kalıtsal yapısı **aynı** iki **2n** hücre oluşur. Mitoz; büyüme, onarım ve **eşeysiz üremenin** temelidir.
""",
  [(r"Kromozom sayısı $2n = 46$ olan bir insan vücut hücresi mitozla bölünüyor. S evresinden sonra ve bölünme sonunda her hücrede kaç kromozom ve kaç kromatit bulunur?",
    r"S evresinden sonra kromozom sayısı yine **46**'dır ama her kromozom iki kromatitli olduğu için kromatit sayısı **92** olur. Bölünme sonunda oluşan iki hücrenin her birinde **46** kromozom (tek kromatitli) bulunur."),
   (r"Bir hücrede kromozomların sayılması için hangi evre en uygundur? Neden?",
    r"**Metafaz.** Kromozomlar en yoğun (kısa ve kalın) hâldedir ve ekvatoral düzlemde tek sıra dizildikleri için ayrı ayrı görülüp sayılabilir.")],
  [r"Hücre döngüsü: interfaz (G1, S, G2) + mitoz + sitokinez.", r"DNA eşlenmesi interfazın S evresinde olur.",
   r"Mitoz evreleri: profaz → metafaz → anafaz → telofaz.", r"Mitoz sonunda 2n hücreden kalıtsal olarak aynı iki 2n hücre oluşur.",
   r"Kontrol noktalarının bozulması kanserleşmeye yol açabilir."]),

O("k2", "BİY.10.E2", "Mayoz ve genetik çeşitlilik", "Meiosis and genetic variation", r"""
# Mayoz Nedir?
**Üreme ana hücrelerinde** görülen, kromozom sayısını **yarıya indiren** bölünmedir. Bir **2n** hücreden dört **n** hücre (gamet ya da spor) oluşur. Böylece döllenmeyle birleşen iki gamet yeniden **2n** sayısını verir ve türün kromozom sayısı kuşaktan kuşağa sabit kalır.

# İki Ardışık Bölünme
**Mayoz I (indirgeme bölünmesi)**
- **Profaz I:** **Homolog kromozomlar** yan yana gelir (sinapsis) ve dört kromatitli **tetratlar** oluşur. Homologların kromatitleri arasında parça değişimi olabilir: **krossing over**.
- **Metafaz I:** Homolog çiftler ekvatoral düzlemde **karşılıklı** dizilir.
- **Anafaz I:** **Homolog kromozomlar** ayrılır (kardeş kromatitler ayrılmaz). Kromozom sayısı burada yarıya iner.
- **Telofaz I:** İki **n** hücre oluşur; kromozomlar hâlâ çift kromatitlidir.

**Mayoz II** mitoza benzer: Anafaz II'de **kardeş kromatitler** ayrılır ve sonuçta dört **n** hücre oluşur. Mayoz I ile II arasında DNA eşlenmesi **olmaz**.

# Genetik Çeşitliliğin Kaynakları
1. **Krossing over:** Homolog kromozomlar arasında gen değişimi yeni gen kombinasyonları oluşturur.
2. **Bağımsız dağılım:** Metafaz I'de homolog çiftlerin hangi kutba gideceği rastgeledir. $n$ çift kromozomlu bir canlıda $2^n$ farklı gamet çeşidi oluşabilir (insanda $2^{23}$ ≈ 8 milyon).
3. **Rastgele döllenme:** Hangi spermin hangi yumurtayı dölleyeceği şansa bağlıdır.

# Mitoz ile Mayozun Karşılaştırılması
| | Mitoz | Mayoz |
|---|---|---|
| Görüldüğü hücre | Vücut hücreleri | Üreme ana hücreleri |
| Bölünme sayısı | 1 | 2 |
| Oluşan hücre | 2 tane, 2n | 4 tane, n |
| Kalıtsal yapı | Ana hücreyle aynı | Birbirinden farklı |
| Tetrat / krossing over | Yok | Var (Profaz I) |
""",
  [(r"$2n = 8$ olan bir canlıda krossing over olmadığı varsayılırsa bağımsız dağılımla en fazla kaç çeşit gamet oluşabilir?",
    r"Kromozom çifti sayısı $n = 4$ olduğundan gamet çeşidi $2^4 = $ **16** olur."),
   (r"Mayozda kromozom sayısı hangi evrede yarıya iner? Mayoz II'de neden yeniden yarılanmaz?",
    r"**Anafaz I**'de homolog kromozomlar ayrılınca sayı yarıya iner. Mayoz II'de ayrılan yapılar kardeş kromatitlerdir; kromozom sayısı değişmez, yalnızca kromatit sayısı yarıya iner.")],
  [r"Mayoz: 2n → dört tane n hücre; üreme ana hücrelerinde olur.", r"Krossing over Profaz I'de homolog kromozomlar arasında olur.",
   r"Anafaz I'de homologlar, Anafaz II'de kardeş kromatitler ayrılır.", r"Çeşitlilik: krossing over + bağımsız dağılım ($2^n$) + rastgele döllenme."]),

O("k3", "BİY.10.E3", "Eşeysiz ve eşeyli üreme", "Asexual and sexual reproduction", r"""
# Eşeysiz Üreme
Tek bir atadan, **mitoz** temelinde, kalıtsal olarak ataya **benzer** bireyler oluşur. Hızlıdır ve eş bulmaya gerek yoktur; ancak çeşitlilik düşük olduğu için değişen çevreye uyum sınırlıdır.
| Çeşit | Örnek |
|---|---|
| **İkiye bölünme** | Bakteri, amip, öglena |
| **Tomurcuklanma** | Bira mayası, hidra |
| **Rejenerasyon** (yenilenme ile çoğalma) | Planarya, deniz yıldızı |
| **Sporla üreme** | Küf mantarı, eğreltiotu (yaşam döngüsünün bir evresinde) |
| **Vejetatif üreme** | Patates yumrusu, çilek stolonu, çelikle söğüt |
| **Partenogenez** (döllenmemiş yumurtadan gelişme) | Arı erkekleri (yumurta n olduğu için erkek arı n kromozomludur) |

> **Klonlama** da eşeysiz üremeye dayanır: Vücut hücresinin çekirdeği, çekirdeği çıkarılmış bir yumurtaya aktarılır (Dolly koyunu).

# Eşeyli Üreme
İki farklı bireyden gelen **gametlerin** (n) **döllenmeyle** birleşip **zigotu** (2n) oluşturmasıdır. Mayoz ve döllenme sayesinde **genetik çeşitlilik** yüksektir; tür değişen koşullara daha kolay uyum sağlar.
- **Dış döllenme:** Suda yaşayan balık ve kurbağalarda; çok sayıda gamet bırakılır.
- **İç döllenme:** Karada yaşayan sürüngen, kuş ve memelilerde; gametler kurumaktan korunur.

# Karşılaştırma
| | Eşeysiz | Eşeyli |
|---|---|---|
| Birey sayısı | 1 | Genellikle 2 |
| Temel bölünme | Mitoz | Mayoz + döllenme |
| Çeşitlilik | Düşük (mutasyon dışında) | Yüksek |
| Hız / enerji | Hızlı, az enerji | Yavaş, çok enerji |
""",
  [(r"Bir patates tarlasının tamamı aynı bitkiden alınan yumrularla dikilmiştir. Yeni bir bitki hastalığı ortaya çıktığında bu tarla neden risk altındadır?",
    r"Yumruyla üreme **vejetatif (eşeysiz)** üremedir; bütün bitkiler kalıtsal olarak aynıdır. Hastalığa dayanıklı bir birey yoksa hastalık **tüm tarlayı** etkileyebilir. Eşeyli üremedeki çeşitlilik bu riski azaltır."),
   (r"Arılarda erkek bireyler kaç kromozomludur, neden?",
    r"Erkek arılar **döllenmemiş yumurtadan** (partenogenez) gelişir; yumurta mayozla oluştuğu için **n** kromozomludurlar.")],
  [r"Eşeysiz üreme mitoza dayanır; yavrular ataya benzer.", r"Eşeyli üreme mayoz + döllenme ile genetik çeşitlilik sağlar.",
   r"Eşeysiz üreme çeşitleri: bölünme, tomurcuklanma, rejenerasyon, spor, vejetatif üreme, partenogenez."]),

O("k4", "BİY.10.E4", "Mendel ilkeleri: monohibrit ve dihibrit çaprazlama", "Mendel's principles: monohybrid and dihybrid crosses", r"""
# Temel Kavramlar
- **Gen:** Bir özelliği belirleyen DNA parçası. **Alel:** Aynı genin farklı biçimleri (ör. sarı **Y**, yeşil **y**).
- **Genotip:** Alellerin bileşimi (YY, Yy, yy). **Fenotip:** Gözlenen özellik (sarı, yeşil). Fenotip = genotip + çevre etkisi.
- **Homozigot (saf döl):** Aynı aleller (YY, yy). **Heterozigot (melez):** Farklı aleller (Yy).
- **Baskın (dominant)** alel heterozigotta etkisini gösterir; **çekinik (resesif)** alel yalnızca homozigotken (yy) görünür.

# Mendel'in Bezelye Deneyleri
Mendel, kolay yetişen, kısa sürede çok döl veren ve belirgin karşıt özellikleri olan bezelyeyle çalıştı; sonuçları **sayılarla** değerlendirdi.
- **Ayrılma ilkesi:** Her birey bir özellik için iki alel taşır; gamet oluşurken bunlar ayrılır ve her gamete **yalnızca biri** geçer.
- **Bağımsız dağılım ilkesi:** Farklı kromozomlardaki genler gametlere birbirinden bağımsız dağılır.

# Monohibrit Çaprazlama (tek özellik)
$Yy \times Yy$ → Punnett karesi:
| | **Y** | **y** |
|---|---|---|
| **Y** | YY | Yy |
| **y** | Yy | yy |
- Genotip oranı **1 YY : 2 Yy : 1 yy**, fenotip oranı **3 sarı : 1 yeşil**.

**Test çaprazlaması:** Baskın fenotipli bireyin genotipini bulmak için **homozigot çekinikle** (yy) çaprazlanır. Döllerin hepsi baskınsa birey YY, yarısı çekinikse Yy'dir.

# Dihibrit Çaprazlama (iki özellik)
Tohum rengi (Y/y) ve şekli (R düzgün / r buruşuk): $YyRr \times YyRr$
- Her ebeveyn **4** çeşit gamet verir: YR, Yr, yR, yr.
- Fenotip oranı **9 : 3 : 3 : 1** (9 sarı-düzgün, 3 sarı-buruşuk, 3 yeşil-düzgün, 1 yeşil-buruşuk).

# Olasılıkla Hızlı Çözüm
Bağımsız özellikler için olasılıklar **çarpılır**. Bir bireyin oluşturabileceği gamet çeşidi $2^{h}$ ($h$: heterozigot gen çifti sayısı).
""",
  [(r"$AaBbCc$ genotipli bir birey kaç çeşit gamet oluşturur? $AaBb \times AaBb$ çaprazlamasında $aabb$ olasılığı nedir?",
    r"Heterozigot çift sayısı 3 → $2^3 = $ **8** çeşit gamet. $P(aa) = \frac14$, $P(bb) = \frac14$ → $P(aabb) = \frac14\cdot\frac14 = $ **$\frac{1}{16}$**."),
   (r"Sarı tohumlu bir bezelye yeşil tohumluyla çaprazlanınca döllerin yarısı sarı, yarısı yeşil oluyor. Sarı bireyin genotipi nedir?",
    r"Döllerde yeşil (yy) çıktığına göre sarı ebeveyn de $y$ aleli vermiştir: genotip **Yy**. ($Yy \times yy$ → 1 Yy : 1 yy)")],
  [r"Ayrılma ilkesi: her gamete bir alel geçer.", r"$Yy \times Yy$ → fenotip 3 : 1, genotip 1 : 2 : 1.",
   r"$YyRr \times YyRr$ → fenotip 9 : 3 : 3 : 1.", r"Gamet çeşidi $= 2^{h}$; bağımsız olasılıklar çarpılır.", r"Test çaprazlaması homozigot çekinikle yapılır."]),

O("k5", "BİY.10.E5", "Eksik ve eş baskınlık, çok alellilik ve kan grupları", "Incomplete and codominance, multiple alleles and blood groups", r"""
# Eksik Baskınlık
Heterozigot birey, iki homozigotun **arasında** bir fenotip gösterir. Örnek: Aslanağzı çiçeğinde kırmızı (KK) × beyaz (BB) → **pembe** (KB).
- $KB \times KB$ → kırmızı : pembe : beyaz = **1 : 2 : 1** (fenotip oranı genotip oranına eşittir).

# Eş Baskınlık (Kodominantlık)
Heterozigotta **iki alel de** etkisini tam olarak gösterir. Örnek: **AB** kan grubunda hem A hem B antijeni bulunur.

# Çok Alellilik
Bir gen için popülasyonda **ikiden fazla** alel bulunmasıdır; ama bir birey yine **en fazla iki** alel taşır.
- ABO kan grubu: $I^A$, $I^B$, $i$ (0) alelleri. $I^A$ ve $I^B$ birbirine **eş baskın**, $i$'ye karşı **baskındır**.

| Fenotip | Olası genotipler | Alyuvarda antijen | Plazmada antikor |
|---|---|---|---|
| A | AA, A0 | A | anti-B |
| B | BB, B0 | B | anti-A |
| AB | AB | A ve B | yok |
| 0 | 00 | yok | anti-A, anti-B |

# Rh Faktörü
Alyuvarda Rh antijeni varsa **Rh⁺** (baskın, R), yoksa **Rh⁻** (rr). Rh⁻ anne Rh⁺ bebek taşıdığında ikinci gebeliklerde **bebeğin alyuvarlarına karşı antikor** sorunu (eritroblastoz fetalis) görülebilir; doğum sonrası yapılan iğneyle önlenir.

# Kan Nakli
Verilecek kandaki **antijen**, alıcının **antikoruyla** karşılaşmamalıdır. 0 grubu "genel verici", AB grubu "genel alıcı" olarak bilinir; ancak uygulamada aynı grup kan tercih edilir.
""",
  [(r"Anne A0, baba B0 kan grubundandır. Çocukların kan grubu olasılıkları nedir?",
    r"Gametler: anne {A, 0}, baba {B, 0}. Olası çocuklar: AB, A0, B0, 00 → **AB, A, B ve 0** gruplarının her biri $\frac14$ olasılıkla."),
   (r"Pembe çiçekli iki aslanağzı çaprazlanıyor. 160 dölde kaç kırmızı beklenir?",
    r"$KB \times KB$ → kırmızı (KK) olasılığı $\frac14$ → $160 \cdot \frac14 = $ **40**.")],
  [r"Eksik baskınlık: heterozigot ara fenotip (pembe), oran 1 : 2 : 1.", r"Eş baskınlık: iki alel de görülür (AB kan grubu).",
   r"ABO'da üç alel vardır; birey en fazla iki alel taşır.", r"Nakilde vericinin antijeni alıcının antikoruyla karşılaşmamalıdır."]),

O("k6", "BİY.10.E6", "Eşeye bağlı kalıtım ve soyağacı", "Sex-linked inheritance and pedigrees", r"""
# Cinsiyetin Belirlenmesi
İnsanda 22 çift **vücut (otozom) kromozomu** ve 1 çift **eşey kromozomu** vardır: kadın **XX**, erkek **XY**. Yumurtaların hepsi X taşır; çocuğun cinsiyetini **spermin** taşıdığı X ya da Y belirler. Her doğumda kız ya da erkek olasılığı $\frac12$'dir.

# X'e Bağlı Çekinik Kalıtım
Geni X kromozomunda bulunan ve Y'de karşılığı olmayan özelliklerdir: **renk körlüğü**, **hemofili**.
- Kadın: $X^RX^R$ sağlam, $X^RX^r$ **taşıyıcı** (fenotipi sağlam), $X^rX^r$ hasta.
- Erkek: tek X taşıdığı için $X^rY$ ise **hastadır**; taşıyıcı erkek olmaz.
- Bu yüzden bu hastalıklar **erkeklerde daha sık** görülür. Erkek, X kromozomunu **annesinden** alır.

# Y'ye Bağlı Kalıtım
Geni yalnızca Y'de olan özellikler babadan **yalnızca oğullara** geçer (ör. bazı kulak kıllılığı örnekleri).

# Soyağacı (Pedigri) Okuma
Kareler erkeği, daireler kadını; dolu şekiller özelliği gösteren bireyi gösterir.
- **Otozomal çekinik:** Sağlam iki ebeveynden hasta çocuk doğabilir; iki cinsiyette eşit sıklıktadır.
- **Otozomal baskın:** Hasta her bireyin en az bir ebeveyni hastadır; kuşak atlamaz.
- **X'e bağlı çekinik:** Çoğunlukla erkeklerde görülür; hasta kızın babası mutlaka hastadır, hasta annenin bütün oğulları hastadır.
""",
  [(r"Taşıyıcı bir anne ile renk körü olmayan bir babanın çocuklarında renk körlüğü olasılıkları nedir?",
    r"$X^RX^r \times X^RY$ → kızlar: $X^RX^R$, $X^RX^r$ (hepsi sağlam, yarısı taşıyıcı). Oğullar: $X^RY$, $X^rY$. **Oğulların yarısı** renk körü olabilir; tüm çocuklar içinde olasılık $\frac14$."),
   (r"Renk körü bir kızın babası için ne söylenebilir?",
    r"Kız $X^rX^r$ olmalıdır; X'lerinden biri babadan gelir. Babanın tek X'i $X^r$ olduğundan baba **kesinlikle renk körüdür**.")],
  [r"Kadın XX, erkek XY; cinsiyeti spermin taşıdığı kromozom belirler.", r"X'e bağlı çekinik özellikler (renk körlüğü, hemofili) erkeklerde daha sık görülür.",
   r"Erkekte taşıyıcılık olmaz; X'ini annesinden alır.", r"Soyağacında sağlam ebeveynden hasta çocuk varsa özellik çekiniktir."]),

O("k7", "BİY.10.E7", "Genetik varyasyon, mutasyon ve kalıtsal hastalıklar", "Genetic variation, mutation and inherited disorders", r"""
# Varyasyon (Çeşitlilik) Kaynakları
Aynı türün bireyleri arasındaki kalıtsal farklılıklara **varyasyon** denir. Doğal seçilimin üzerinde çalıştığı ham maddedir.
- **Mutasyon:** DNA'daki kalıcı değişmeler; yeni alellerin asıl kaynağıdır.
- **Krossing over** ve **bağımsız dağılım** (mayoz)
- **Rastgele döllenme**

**Modifikasyon** ise çevrenin fenotipi değiştirmesidir (ör. güneşte bronzlaşma, ortanca çiçeğinin toprak pH'sına göre renk değiştirmesi); DNA değişmediği için **kalıtsal değildir**.

# Mutasyon Türleri
- **Gen (nokta) mutasyonu:** Bir ya da birkaç nükleotidin değişmesi, eklenmesi ya da kaybı (ör. orak hücre anemisinde tek bir baz değişikliği).
- **Kromozom mutasyonu:** Kromozom yapısında (parça kopması, yer değiştirme) ya da sayısında değişim. Mayozda kromozomların ayrılamaması (**ayrılmama**) sayı değişikliğine yol açar: **Down sendromu** (21. kromozomdan üç tane, 47 kromozom).
- Mutasyonlar **vücut hücresinde** olursa yalnızca o bireyi, **üreme hücresinde** olursa sonraki kuşakları etkileyebilir.
- Etkenler: radyasyon (UV, X ışını), bazı kimyasallar, yüksek sıcaklık, bazı virüsler.

# Kalıtsal Hastalıklar ve Akraba Evliliği
- **Fenilketonüri (FKÜ), talasemi (Akdeniz anemisi), kistik fibrozis** otozomal çekinik hastalıklardır. Çoğu kişi bunların alelini fark etmeden **taşıyıcı** olarak taşır.
- **Akraba evliliğinde** aynı çekinik aleli taşıma olasılığı artar; bu nedenle çekinik hastalıklı çocuk olasılığı yükselir.
- **Yenidoğan topuk kanı taraması** (FKÜ vb.) ve **evlilik öncesi talasemi taraması** erken tanı ve önlem için yapılır. FKÜ'de erken tanı ve uygun beslenmeyle zihinsel gelişim geriliği önlenebilir.
""",
  [(r"İki taşıyıcının ($Aa \times Aa$) bir çekinik hastalık için hasta çocuk sahibi olma olasılığı nedir? Bu kişiler akraba olmasaydı olasılık değişir miydi?",
    r"$P(aa) = \frac14$. İki kişi zaten taşıyıcıysa olasılık **akrabalıktan bağımsız olarak** $\frac14$'tür. Akrabalık, iki eşin **aynı çekinik aleli taşıma olasılığını** artırdığı için riski yükseltir."),
   (r"Güneşte uzun süre kalan birinin derisinin koyulaşması çocuklarına geçer mi?",
    r"Hayır. Bu bir **modifikasyondur**; DNA değişmez, kalıtsal değildir.")],
  [r"Varyasyon kaynakları: mutasyon, krossing over, bağımsız dağılım, rastgele döllenme.", r"Modifikasyon çevresel değişimdir; kalıtsal değildir.",
   r"Üreme hücrelerindeki mutasyon yavrulara geçebilir.", r"Akraba evliliği çekinik hastalık riskini artırır; tarama programları erken önlem sağlar."]),
])]
