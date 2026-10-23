# -*- coding: utf-8 -*-
r"""9. Sınıf Fizik — 1.35.0 tamamlama: resmî Maarif kodları (FİZ.9.x.y), anlatım ekleri, çözümlü örnekler, özet maddeleri."""

KOD = {
    "u1/k1": "FİZ.9.1.1", "u1/k2": "FİZ.9.1.2", "u1/k3": "FİZ.9.1.3", "u1/k4": "FİZ.9.1.4",
    "u2/k1": "FİZ.9.2.1", "u2/k2": "FİZ.9.2.2", "u2/k3": "FİZ.9.2.3", "u2/k4": "FİZ.9.2.4",
    "u2/k5": "FİZ.9.2.5", "u2/k6": "FİZ.9.2.6", "u2/k7": "FİZ.9.2.7",
    "u3/k1": "FİZ.9.3.1", "u3/k2": "FİZ.9.3.2", "u3/k3": "FİZ.9.3.3", "u3/k4": "FİZ.9.3.4",
    "u3/k5": "FİZ.9.3.5", "u3/k6": "FİZ.9.3.6", "u3/k7": "FİZ.9.3.7",
    "u4/k1": "FİZ.9.4.1", "u4/k2": "FİZ.9.4.1", "u4/k3": "FİZ.9.4.2", "u4/k4": "FİZ.9.4.3",
    "u4/k5": "FİZ.9.4.4", "u4/k6": "FİZ.9.4.5", "u4/k7": "FİZ.9.4.6",
}

ANLATIM = {
"u1/k1": r"""
# Fizik Nasıl Çalışır? Bilimsel Yöntem
1. **Gözlem ve problem:** "Neden ağır cisimle hafif cisim aynı anda düşüyor?"
2. **Hipotez:** sınanabilir bir açıklama önerilir.
3. **Deney:** değişkenler belirlenir — **bağımsız** (değiştirilen), **bağımlı** (ölçülen), **kontrol** (sabit tutulan).
4. **Veri ve sonuç:** ölçümler tabloya/grafiğe dökülür, hipotez desteklenir ya da reddedilir.
5. **Yasa ve teori:** Defalarca doğrulanan **ilişki** yasa ($F = m \cdot a$), olayların **nedenini açıklayan** geniş yapı teoridir (görelilik).

> ⚠ Bilimsel bilgi **değişebilir**: yeni kanıt gelince teori düzeltilir (Aristo'nun "ağır cisim hızlı düşer" görüşü Galileo'nun deneyleriyle yıkıldı).
""",
"u1/k4": r"""
# Kariyer Planlarken Sorulacak Sorular
- **Merak ettiğim konu ne?** Uzay mı, sağlık mı, enerji mi, yazılım mı?
- **Hangi kurum bu alanda çalışıyor?** Uzay → TUA, TÜBİTAK UZAY · Enerji → TENMAK · Sağlık → hastanelerin medikal fizik birimleri · Savunma → ASELSAN, ROKETSAN, TUSAŞ.
- **Hangi bölümü okumalıyım?** Fizik, fizik mühendisliği, nükleer enerji mühendisliği, elektrik-elektronik, astronomi ve uzay bilimleri, biyomedikal mühendisliği.
- **Bilgimi doğrula:** Kurumun resmî sitesi, YÖK Atlas ve gerçek çalışanlarla görüşme güvenilir kaynaklardır; sosyal medya paylaşımları tek başına yeterli değildir.

| Meslek | Fizikle bağlantısı |
|---|---|
| Medikal fizikçi | Radyoterapide doz hesabı, MR ve BT cihazları |
| Meteorolog | Atmosfer basıncı, ısı aktarımı, akışkanlar |
| Ses mühendisi | Dalgalar, akustik |
| Veri bilimci / yazılımcı | Fizik modelleri, simülasyon |
| Uzay mühendisi | Kütle çekim, yörünge, itme kuvveti |
""",
"u2/k2": r"""
# Vektörel Niceliği Tanıma İpucu
"**Hangi yöne?**" sorusu anlamlıysa nicelik vektöreldir: "5 m/s hızla **kuzeye**" anlamlıdır, "5 kg **kuzeye**" anlamsızdır.

| Skaler | Vektörel karşılığı |
|---|---|
| Alınan yol | Yer değiştirme |
| Sürat | Hız |
| Kütle | Ağırlık |

> ⚠ Sıcaklık eksi olabilir (−5 °C) ama bu bir **yön** değildir; sıcaklık skalerdir. Vektörlerde eksi işareti **zıt yönü** gösterir.
""",
"u2/k3": r"""
# Aynı Doğrultudaki Vektörler
- Bir doğru üzerinde **sağ (+)** ve **sol (−)** yön seçilir; vektörler işaretleriyle toplanır.
- Aynı yönlü iki vektör: $R = A + B$ (bileşke en büyük). Zıt yönlü: $R = |A - B|$, yönü büyük olanın yönü (bileşke en küçük).
- Herhangi iki vektörün bileşkesi bu iki değer arasındadır:

$$|A - B| \le R \le A + B$$

- **Vektör çizimi:** ölçek seçilir (ör. 1 kare = 10 N); 30 N'lik kuvvet 3 kare uzunluğunda çizilir.
""",
"u2/k7": r"""
# Hareketleri Sınıflandırırken
- **Ölçüt 1 – yörünge:** doğrusal mı (asansör), eğrisel mi (atılan top), çembersel mi (saat ibresi)?
- **Ölçüt 2 – tekrar:** belli aralıklarla kendini tekrarlıyor mu? (sarkaç → periyodik)
- Aynı cisim, gözlemciye ve parçasına göre farklı türlerde hareket edebilir: tekerlek **merkezi** öteleme, **jantı** öteleme + dönme yapar.

| Hareket | Tür |
|---|---|
| Asansörün kalkması | Öteleme |
| Dünya'nın kendi ekseni etrafında dönmesi | Dönme |
| Dünya'nın Güneş çevresinde dolanması + ekseninde dönmesi | Birleşik (öteleme + dönme) |
| Kalbin atması, ses telinin titremesi | Titreşim |
""",
"u3/k1": r"""
# Katı Basıncı Problemlerinde Strateji
1. Cismin **ağırlığını** bul: $G = m \cdot g$.
2. Yere değen **yüzeyin alanını** belirle (dikdörtgen: $a \cdot b$).
3. $P = G/A$ ile hesapla; birimleri m² ve N'ye çevir ($1\ \text{cm}^2 = 10^{-4}\ \text{m}^2$).
- Aynı tuğla farklı yüzeyleri üzerine konursa **ağırlık sabit**, en küçük yüzeyle durduğunda basınç **en büyük** olur.
- Üst üste konan cisimlerde alttaki yüzeye etki eden kuvvet, **üstteki tüm cisimlerin toplam ağırlığıdır**.
""",
"u3/k2": r"""
# Farklı Kaplar, Aynı Taban Basıncı
Aynı yükseklikte aynı sıvıyla dolu üç kap düşünelim (geniş ağızlı, silindir, dar ağızlı): **taban basınçları eşittir** ($P = h \cdot d \cdot g$). Kaplardaki sıvıların ağırlıkları ise farklıdır.
- **Karışmayan sıvılar:** Toplam basınç katmanların basınçlarının toplamıdır: $P = h_1 d_1 g + h_2 d_2 g$. Yoğunluğu büyük olan sıvı altta toplanır.
- **Basınç–derinlik grafiği:** başlangıçtan geçen doğrudur; eğimi $d \cdot g$'ye eşittir (yoğun sıvının doğrusu daha diktir).
""",
"u3/k3": r"""
# Hidrolik Sistemlerin Bedeli
Hidrolik sistem **kuvvetten kazandırır, yoldan kaybettirir**. Sıvı sıkışmadığı için küçük pistondan itilen sıvı hacmi büyük pistona geçer:

$$A_1 \cdot h_1 = A_2 \cdot h_2$$

Küçük piston uzun yol alırken büyük piston kısa yol yükselir. Bu yüzden kriko birçok kez pompalanır.
- **Sağlıkta:** tansiyon aleti, serum (şişe yükseğe asılır → sıvı basıncı damardaki kan basıncını yener).
- **Su kuleleri:** kentlerin yüksek yerlerine kurulur; evlere suyu sıvı basıncıyla ulaştırır.
""",
"u3/k5": r"""
# Kaldırma Kuvveti Deneyi (Dinamometreyle)
1. Cisim havada dinamometreye asılır → **gerçek ağırlık** $G$ okunur.
2. Cisim suya daldırılır → **görünür ağırlık** $G'$ okunur.
3. Fark kaldırma kuvvetidir:

$$F_k = G - G'$$

| Değiştirilen (bağımsız) | Sabit tutulan (kontrol) | Gözlem |
|---|---|---|
| Batan hacim | Sıvı cinsi | Batan hacim arttıkça $F_k$ artar |
| Sıvının yoğunluğu (su → tuzlu su) | Batan hacim | Yoğunluk arttıkça $F_k$ artar |
| Cismin kütlesi (aynı hacim) | Hacim, sıvı | $F_k$ değişmez |
| Derinlik (tamamen batmışken) | Hacim, sıvı | $F_k$ değişmez |
""",
"u3/k7": r"""
# Süreklilik: Kesit Daralınca Neden Hızlanır?
Borudan birim zamanda geçen akışkan hacmi her yerde aynıdır (akışkan bir yerde birikmez):

$$A_1 \cdot \upsilon_1 = A_2 \cdot \upsilon_2$$

Kesit alanı yarıya inerse sürat iki katına çıkar ve o bölgede borunun çeperine uygulanan basınç azalır.
- **Tehlike:** Hızla geçen trenin yakınında durmak tehlikelidir; aradaki havanın sürati artar, basınç düşer ve kişi trene doğru itilir. Peron çizgisi bu yüzden vardır.
- **Futbolda falso:** dönen topun bir yanındaki hava daha hızlı akar, basınç farkı topun yolunu eğer (Magnus etkisi).
""",
"u4/k1": r"""
# Isı mı, Sıcaklık mı? Karıştırılan Durumlar
| İfade | Doğrusu |
|---|---|
| "Hava çok ısılı" | Havanın **sıcaklığı** yüksek |
| "Çayın ısısı düştü" | Çayın **sıcaklığı** düştü; çay çevreye **ısı verdi** |
| "Buzun soğuğu elime geçti" | **Elimden buza ısı** aktarıldı (soğuk aktarılmaz) |

- İki madde **aynı sıcaklıktaysa** aralarında ısı alışverişi olmaz, iç enerjileri farklı olabilir.
- Sürtünme ile ellerin ısınması: iş yapılarak iç enerji artırılabilir (yalnız ısıyla değil).
""",
"u4/k2": r"""
# Termometre Yapımı ve Ölçek Dönüşümü
Bir termometre ölçeği iki **sabit noktayla** kurulur: suyun donma ve kaynama noktaları. Aradaki aralık eşit bölmelere ayrılır.

$$\frac{C - 0}{100} = \frac{F - 32}{180} = \frac{K - 273}{100}$$

- Celsius ve Kelvin'de **1 derecelik değişim aynıdır**: $\Delta T(\text{K}) = \Delta t(°\text{C})$.
- **Mutlak sıfır** (0 K = −273 °C): taneciklerin kinetik enerjisinin en düşük olduğu, ulaşılamayan sıcaklık; Kelvin'de eksi değer yoktur.
""",
"u4/k3": r"""
# Sıcaklık–Isı Grafiği
- Isı ($Q$) yatay, sıcaklık ($T$) dikey eksende çizilirse eğim $\dfrac{\Delta T}{Q} = \dfrac{1}{m \cdot c}$ olur.
- **Eğimi küçük olan** doğru → ısı sığası ($m \cdot c$) **büyük** madde; aynı ısıyla daha az ısınır.
- **Isıtıcı ile ısıtma:** Özdeş ısıtıcılar eşit sürede eşit ısı verir: $Q = P \cdot t$ (P: güç, W). Süre–sıcaklık grafiğinde de eğim ısı sığasıyla ters orantılıdır.
""",
"u4/k5": r"""
# Isıl Dengede Hâl Değişimi Varsa
Buz ile su karıştırıldığında önce buzun erimesi için gereken ısı ($m \cdot L$) hesaplanır:
- Sıcak suyun 0 °C'ye inene kadar verebileceği ısı **yetmiyorsa** buzun bir kısmı erir, denge sıcaklığı **0 °C** olur.
- **Yetiyorsa** buzun tamamı erir, oluşan su da ısınır; denge 0 °C'nin üstünde olur.

> ⚠ Denge sıcaklığına ulaşınca ısı akışı durur; tanecikler hareket etmeye devam eder (sıcaklık 0 K değildir).
""",
"u4/k6": r"""
# Üç Yolu Birlikte Gören Örnekler
| Durum | Baskın aktarım |
|---|---|
| Tencerenin sapının ısınması | İletim |
| Denizden karaya esen meltem | Konveksiyon |
| Şömine karşısında yüzün ısınması | Işıma |
| Termos | Üçünü de azaltır: vakum (iletim + konveksiyon), gümüş kaplama (ışıma) |
| Bardaktaki çayın soğuması | Üçü birlikte (yüzeyden buharlaşma da etkili) |

- **Parlak/açık renkli** yüzeyler ışımayı yansıtır (yazın beyaz giysi), **mat/koyu** yüzeyler soğurur ve iyi yayar.
""",
"u4/k7": r"""
# Isı İletim Hızı Bağıntısı
Katı bir levhadan birim zamanda iletilen ısı:

$$\frac{Q}{t} = \frac{k \cdot A \cdot \Delta T}{d}$$

$k$: ısı iletim katsayısı (maddenin cinsi), $A$: yüzey alanı, $\Delta T$: iki yüz arasındaki sıcaklık farkı, $d$: kalınlık.
- Kalınlık iki katına çıkarsa iletim hızı **yarıya** iner; yalıtımın mantığı budur.
- Kışın evlerde ısı kaybının büyük kısmı pencere, çatı ve dış duvarlardan olur; **ısı yalıtımı** yakıt tüketimini ve hava kirliliğini azaltır.
"""
}

ORNEK = {
"u1/k1": [
 (r"Gökkuşağının oluşumunu açıklamak hangi bilim dallarının iş birliğini gerektirir?",
  r"**Fizik** (ışığın su damlasında kırılması ve renklerine ayrılması) ve **coğrafya/meteoroloji** (yağmur damlalarının atmosferde oluşumu). Doğadaki olaylar genellikle birden fazla disiplinle açıklanır."),
 (r"Bir öğrenci “Sarkacın ipi uzadıkça salınım süresi uzar.” hipotezini sınamak istiyor. Bağımsız, bağımlı ve kontrol değişkenlerini yazınız.",
  r"**Bağımsız:** ip uzunluğu (öğrencinin değiştirdiği). **Bağımlı:** bir salınımın süresi (ölçülen). **Kontrol:** kütle, salınım açısı ve ortam (sabit tutulan). Yalnızca bir değişken değiştirilirse sonuç güvenilir olur."),
],
"u1/k2": [
 (r"MR (manyetik rezonans) cihazı fiziğin hangi alt dallarıyla ilgilidir?",
  r"Güçlü mıknatıslar ve radyo dalgaları kullandığı için **elektromanyetizma**, atom çekirdeklerinin sinyaline dayandığı için **atom/nükleer fizik**. Bir teknoloji birden çok alt dalla ilgili olabilir."),
 (r"Aşağıdaki olayları ilgili alt dallarla eşleştiriniz: (a) serap, (b) düdüklü tencere, (c) güneş paneli, (d) kutup ışıkları.",
  r"(a) **Optik** — ışığın sıcak hava katmanlarında kırılması. (b) **Termodinamik** — basınç ve kaynama sıcaklığı. (c) **Katı hâl fiziği** — yarı iletkenler. (d) **Yüksek enerji ve plazma fiziği** — Güneş'ten gelen yüklü parçacıkların atmosferle etkileşimi."),
],
"u1/k3": [
 (r"Faraday ve Maxwell örneği bilimin hangi özelliğini gösterir?",
  r"Bilimin **iş birliğiyle** ilerlediğini: Faraday deneylerle elektrik–manyetizma ilişkisini buldu, Maxwell bunu **matematiksel** denklemlere döktü. Deney ve kuram birbirini tamamlar."),
 (r"İbnülheysem'in “görme, gözden çıkan ışınla olur” görüşüne karşı çıkması bilim insanının hangi özelliğine örnektir?",
  r"**Şüphecilik ve eleştirel düşünce**: Otorite kabul edilen eski görüşü sorgulamış, gözlem ve deneyle ışığın cisimden göze geldiğini göstermiştir."),
],
"u1/k4": [
 (r"Kanser tedavisinde radyoterapi dozunu hesaplayan meslek hangisidir ve hangi alt dalla ilgilidir?",
  r"**Medikal fizikçi.** Radyasyonun madde ile etkileşimi **nükleer ve atom fiziğinin** konusudur; doğru doz tümörü yok ederken sağlıklı dokuyu korur."),
 (r"CERN'de çalışan bir ekipte fizikçiler dışında hangi meslekler bulunur? Neden?",
  r"Mühendisler (elektrik, makine, bilgisayar), yazılımcılar, veri bilimciler, teknisyenler. Dev deney düzenekleri **disiplinler arası** çalışma gerektirir; WWW de bu ortamda bilgi paylaşımı için geliştirilmiştir."),
],
"u2/k1": [
 (r"Hız, kütle, enerji, sıcaklık, kuvvet ve elektrik akımı niceliklerini temel ve türetilmiş olarak ayırınız.",
  r"**Temel:** kütle, sıcaklık, elektrik akımı. **Türetilmiş:** hız (m/s), enerji (J), kuvvet (N). Türetilmiş nicelikler temel niceliklerin birimlerinden oluşur."),
 (r"Kuvvetin birimi Newton'u temel birimler cinsinden yazınız ($F = m \cdot a$).",
  r"$[F] = [m] \cdot [a] = \text{kg} \cdot \dfrac{\text{m}}{\text{s}^2}$. Yani $1\ \text{N} = 1\ \text{kg·m/s}^2$: 1 kg kütleye 1 m/s² ivme kazandıran kuvvet."),
],
"u2/k2": [
 (r"Alınan yol, hız, kütle, ağırlık, ivme, zaman niceliklerini skaler ve vektörel olarak ayırınız.",
  r"**Skaler:** alınan yol, kütle, zaman. **Vektörel:** hız, ağırlık (aşağı yönlü kuvvet), ivme."),
],
"u2/k3": [
 (r"Doğrultuları aynı olan 30 N (doğuya), 50 N (batıya) ve 10 N (doğuya) kuvvetlerin bileşkesini bulunuz.",
  r"Doğu (+), batı (−): $R = 30 - 50 + 10 = -10\ \text{N}$. Bileşke **10 N, batı yönünde**."),
 (r"$\vec{A}$ vektörü 4 birim doğu yönündedir. $-2\vec{A}$ ve $\tfrac12\vec{A}$ vektörlerini tanımlayınız.",
  r"$-2\vec{A}$: büyüklüğü $2 \cdot 4 = 8$ birim, yönü **batı** (negatif sayı yönü çevirir). $\tfrac12\vec{A}$: büyüklüğü 2 birim, yönü **doğu**."),
],
"u2/k4": [
 (r"Birbirine dik 6 N ve 8 N'lik iki kuvvetin bileşkesi kaç N'dir?",
  r"Dik vektörlerde paralelkenar dikdörtgen olur; bileşke köşegendir: $R = \sqrt{6^2 + 8^2} = \sqrt{100} = 10\ \text{N}$."),
 (r"Büyüklükleri 5 N ve 12 N olan iki kuvvetin bileşkesi hangi aralıkta olabilir? 20 N olabilir mi?",
  r"$|12 - 5| \le R \le 12 + 5 \Rightarrow 7 \le R \le 17\ \text{N}$. 20 N, en büyük değer olan 17 N'yi aştığı için **olamaz**."),
],
"u2/k5": [
 (r"Atom çekirdeğindeki protonlar aynı yüklü olduğu hâlde çekirdek neden dağılmaz?",
  r"Protonlar arasında **elektromanyetik itme** vardır; ama çok kısa mesafede etkili olan **güçlü nükleer kuvvet** bu itmeden çok daha büyüktür ve proton–nötronları bir arada tutar."),
 (r"Gelgit olayında hangi temel kuvvet etkilidir? Bu kuvvetin menzili nedir?",
  r"**Kütle çekim kuvveti** (Ay ve Güneş'in Dünya'daki suları çekmesi). Menzili **sonsuzdur**, uzaklık arttıkça zayıflar; temel kuvvetlerin en zayıfıdır ama büyük kütlelerde baskındır."),
],
"u2/k6": [
 (r"Bir araç 2 s'de hızını 4 m/s'den 16 m/s'ye çıkarıyor. Ortalama ivmesi nedir? Araç hızlanıyor mu yavaşlıyor mu?",
  r"$a = \dfrac{\Delta\upsilon}{\Delta t} = \dfrac{16 - 4}{2} = 6\ \text{m/s}^2$. İvme ile hız **aynı yönde** olduğu için araç **hızlanıyor**."),
],
"u2/k7": [
 (r"Merdivenden inen yürüyen merdiven, dönme dolabın kabini ve davul zarı hangi hareketi yapar?",
  r"Yürüyen merdivenin basamağı → **öteleme**. Dönme dolap kabini → **dönme** (sabit eksen etrafında). Davul zarı → **titreşim**."),
 (r"Yuvarlanarak ilerleyen bir topun hareketi neden birleşik harekettir?",
  r"Top hem bir yerden başka yere **ötelenir** hem de kendi ekseni etrafında **döner**. İki temel hareket aynı anda gerçekleştiği için birleşik harekettir."),
],
"u3/k1": [
 (r"Kenarları 10 cm, 20 cm ve 40 cm olan 8 kg'lık bir tuğla en küçük ve en büyük yüzeyi üzerine konuyor. Bu iki durumdaki basınçları bulunuz. ($g = 10\ \text{m/s}^2$)",
  r"$G = 8 \cdot 10 = 80\ \text{N}$. En küçük yüzey: $0{,}1 \cdot 0{,}2 = 0{,}02\ \text{m}^2 \Rightarrow P = 80/0{,}02 = 4000\ \text{Pa}$. En büyük yüzey: $0{,}2 \cdot 0{,}4 = 0{,}08\ \text{m}^2 \Rightarrow P = 80/0{,}08 = 1000\ \text{Pa}$. Ağırlık aynı, alan 4 kat → basınç 4 kat küçük."),
],
"u3/k2": [
 (r"Bir kapta 20 cm su ($d = 1\ \text{g/cm}^3$) üzerinde 10 cm zeytinyağı ($d = 0{,}8\ \text{g/cm}^3$) vardır. Kabın tabanındaki sıvı basıncı kaç Pa'dır? ($g = 10\ \text{m/s}^2$)",
  r"Yoğunluklar: 1000 ve 800 kg/m³. $P = h_1 d_1 g + h_2 d_2 g = 0{,}1 \cdot 800 \cdot 10 + 0{,}2 \cdot 1000 \cdot 10 = 800 + 2000 = 2800\ \text{Pa}$."),
],
"u3/k3": [
 (r"Bir krikoda küçük piston 20 cm itildiğinde büyük piston 0,5 cm yükseliyor. Büyük pistonun alanı küçüğün kaç katıdır?",
  r"$A_1 h_1 = A_2 h_2 \Rightarrow A_1 \cdot 20 = A_2 \cdot 0{,}5 \Rightarrow \dfrac{A_2}{A_1} = 40$. Kuvvetten 40 kat kazanılır, yoldan 40 kat kaybedilir."),
],
"u3/k4": [
 (r"Torricelli deneyi deniz seviyesi yerine 2000 m yükseklikteki bir dağda yapılırsa borudaki cıva yüksekliği nasıl değişir? Neden?",
  r"**Azalır** (yaklaşık 60 cm civarına iner). Yükseldikçe üstte kalan hava sütunu kısalır ve hava seyrekleşir; açık hava basıncı küçülür, cıvayı daha az yükseltir."),
 (r"Pipetle meyve suyu içerken sıvıyı yukarı çıkaran nedir?",
  r"Pipetin içindeki havayı çektiğimizde **pipet içindeki basınç azalır**. Bardaktaki sıvı yüzeyine etki eden **açık hava basıncı** daha büyük kaldığından sıvıyı pipetten yukarı iter."),
],
"u3/k5": [
 (r"Bir taş dinamometrede havada 30 N, suya tamamen batırıldığında 20 N gösteriyor. Kaldırma kuvveti kaç N'dir? Taşın hacmi kaç m³'tür? ($d_{su} = 1000\ \text{kg/m}^3$, $g = 10\ \text{m/s}^2$)",
  r"$F_k = G - G' = 30 - 20 = 10\ \text{N}$. $F_k = V \cdot d \cdot g \Rightarrow 10 = V \cdot 1000 \cdot 10 \Rightarrow V = 0{,}001\ \text{m}^3$ (1 litre)."),
],
"u3/k6": [
 (r"Kütlesi 4 kg, hacmi $0{,}005\ \text{m}^3$ olan bir cisim suya bırakılıyor. Cisim yüzer mi, batar mı? ($d_{su} = 1000\ \text{kg/m}^3$)",
  r"Cismin yoğunluğu $d = m/V = 4/0{,}005 = 800\ \text{kg/m}^3 < 1000$ → **yüzer**. Yüzerken $F_k = G = 40\ \text{N}$ olur; batan hacim $V_b = 40/(1000 \cdot 10) = 0{,}004\ \text{m}^3$, yani hacminin $\tfrac45$'ü batar."),
 (r"Tamamen suya batmış bir küpün alt yüzeyine 50 N, üst yüzeyine 30 N basınç kuvveti etki ediyor. Kaldırma kuvveti kaç N'dir? Küp daha derine indirilirse ne değişir?",
  r"$F_k = F_{alt} - F_{üst} = 50 - 30 = 20\ \text{N}$. Derine inince iki yüzeye etki eden basınç kuvvetleri de **eşit miktarda artar**, aradaki fark (kaldırma kuvveti) **değişmez**."),
],
"u3/k7": [
 (r"Kesit alanı $8\ \text{cm}^2$ olan borudan 2 m/s ile akan su, kesiti $2\ \text{cm}^2$ olan bölüme geçiyor. Buradaki sürati ve basınçtaki değişimi açıklayınız.",
  r"$A_1 \upsilon_1 = A_2 \upsilon_2 \Rightarrow 8 \cdot 2 = 2 \cdot \upsilon_2 \Rightarrow \upsilon_2 = 8\ \text{m/s}$. Sürat arttığı için dar bölümde çepere uygulanan **basınç azalır** (Bernoulli)."),
 (r"Fırtınalı havalarda evin çatısının uçmasını Bernoulli ilkesiyle açıklayınız.",
  r"Çatının **üstünde** rüzgârın sürati büyük → basınç **düşük**; evin **içinde** hava durgun → basınç **yüksek**. Basınç farkı çatıyı aşağıdan yukarı iter ve uçurabilir."),
],
"u4/k1": [
 (r"Aynı sıcaklıktaki bir küvet su ile bir bardak suyu karşılaştırınız: sıcaklık ve iç enerji.",
  r"**Sıcaklıkları eşittir** (taneciklerin ortalama kinetik enerjisi aynı). Küvette çok daha fazla tanecik olduğu için küvetteki suyun **iç enerjisi daha büyüktür**."),
 (r"Sıcak çay odada bırakılınca ne olur? Isı ve iç enerji açısından açıklayınız.",
  r"Çay çevreye **ısı verir**, iç enerjisi ve sıcaklığı azalır; çevrenin iç enerjisi biraz artar. Çayın sıcaklığı oda sıcaklığına eşitlenince ısı akışı durur."),
],
"u4/k2": [
 (r"Sıcaklığı 50 °C olan suyun sıcaklığını Fahrenheit cinsinden bulunuz.",
  r"$\dfrac{C}{100} = \dfrac{F - 32}{180} \Rightarrow \dfrac{50}{100} = \dfrac{F - 32}{180} \Rightarrow F - 32 = 90 \Rightarrow F = 122\ °\text{F}$."),
],
"u4/k3": [
 (r"Eşit kütleli su ($c = 1\ \text{cal/g·°C}$) ve zeytinyağına ($c = 0{,}5\ \text{cal/g·°C}$) eşit ısı veriliyor. Su 10 °C ısınırsa zeytinyağı kaç °C ısınır?",
  r"$Q = m c \Delta T$ eşit ve $m$ eşit → $c \cdot \Delta T$ eşit: $1 \cdot 10 = 0{,}5 \cdot \Delta T \Rightarrow \Delta T = 20\ °\text{C}$. Öz ısısı küçük olan **iki kat** ısınır."),
],
"u4/k4": [
 (r"100 °C'deki 0,5 kg suyu tamamen buhara dönüştürmek için kaç kJ ısı gerekir? ($L_{buharlaşma} = 2260\ \text{kJ/kg}$) Bu sırada sıcaklık nasıl değişir?",
  r"$Q = m \cdot L = 0{,}5 \cdot 2260 = 1130\ \text{kJ}$. Kaynama süresince sıcaklık **100 °C'de sabit kalır**; verilen enerji tanecikler arası bağları koparmaya harcanır."),
],
"u4/k5": [
 (r"Kalorimetre kabında 20 °C'deki 200 g suya 90 °C'deki 100 g su ekleniyor. Isı kaybı yoksa denge sıcaklığı kaç °C olur?",
  r"$100 \cdot (90 - T) = 200 \cdot (T - 20) \Rightarrow 9000 - 100T = 200T - 4000 \Rightarrow 300T = 13000 \Rightarrow T \approx 43{,}3\ °\text{C}$. Sonuç, kütlesi büyük olan soğuk suyun sıcaklığına daha yakındır."),
],
"u4/k6": [
 (r"Güneş'ten gelen enerji Dünya'ya hangi yolla ulaşır? Neden diğer yollar mümkün değildir?",
  r"**Işıma** ile. Güneş ile Dünya arasında büyük ölçüde boşluk vardır; iletim ve konveksiyon **maddesel ortam** gerektirdiği için boşlukta gerçekleşemez."),
 (r"Kaloriferler odanın neden alt kısmına, klimalar ise üst kısmına yerleştirilir?",
  r"**Konveksiyon** nedeniyle: Kaloriferin ısıttığı hava genleşip yükselir, odayı dolaşarak ısıtır. Klimanın soğuttuğu hava yoğunlaşıp çöker; üstten verilirse odaya yayılır."),
],
"u4/k7": [
 (r"Bir evin duvar kalınlığı iki katına çıkarılırsa ve dış sıcaklık farkı aynı kalırsa duvardan ısı kaybı nasıl değişir?",
  r"$\dfrac{Q}{t} = \dfrac{k A \Delta T}{d}$ → kalınlık ($d$) 2 katına çıkınca iletim hızı **yarıya** iner; ısı kaybı yarıya düşer."),
 (r"Çift camlı pencerelerde iki cam arasındaki boşluk neden hava ya da argonla doldurulur?",
  r"Hava ve argon gazının **ısı iletim katsayısı çok küçüktür**; ince ve hareketsiz gaz tabakası iyi bir yalıtkandır. İçerideki ısının dışarı iletilmesi yavaşlar."),
],
}

OZET = {
"u1/k1": ["Bilimsel yöntem: gözlem → hipotez → deney (bağımsız/bağımlı/kontrol değişken) → sonuç; bilimsel bilgi yeni kanıtla değişebilir."],
"u1/k2": ["Bir teknoloji birden fazla alt dalla ilgilidir: MR → elektromanyetizma + atom/nükleer fizik."],
"u1/k4": ["Kariyer bilgisi resmî kaynaklardan (kurum siteleri, YÖK Atlas) doğrulanmalıdır."],
"u2/k7": ["Yürüyen/öteleme · dönme dolap/dönme · davul zarı/titreşim; yuvarlanan top öteleme + dönme."],
"u3/k5": ["Deneyde $F_k = G_{hava} - G_{sıvıda}$ (gerçek ağırlık − görünür ağırlık)."],
"u4/k5": ["Buz–su karışımında ısı buzu eritmeye yetmezse denge sıcaklığı 0 °C olur."],
"u4/k6": ["Termos: vakum iletim ve konveksiyonu, parlak yüzey ışımayı azaltır."],
"u4/k7": ["$\\dfrac{Q}{t} = \\dfrac{k \\cdot A \\cdot \\Delta T}{d}$: kalınlık iki katına çıkarsa iletim hızı yarıya iner."],
}
