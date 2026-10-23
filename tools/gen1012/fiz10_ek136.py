# -*- coding: utf-8 -*-
r"""10. Sınıf Fizik — 1.36.0: Maarif kodları (FİZ.10.1.1–FİZ.10.4.7), kısa anlatımların genişletilmesi, eksik
örnekler ve FİZ.10.4.7 (depreme ilişkin bilimsel model). Kaynak: tymm.meb.gov.tr Fizik Dersi 10. Sınıf ünite sayfaları."""
from common import O

KOD = {
    "u1/k1": "FİZ.10.1.1", "u1/k2": "FİZ.10.1.1", "u1/k3": "FİZ.10.1.2", "u1/k4": "FİZ.10.1.3",
    "u2/k1": "FİZ.10.2.1", "u2/k2": "FİZ.10.2.2", "u2/k3": "FİZ.10.2.3", "u2/k4": "FİZ.10.2.4", "u2/k5": "FİZ.10.2.5",
    "u3/k1": "FİZ.10.3.1", "u3/k2": "FİZ.10.3.2", "u3/k3": "FİZ.10.3.3", "u3/k4": "FİZ.10.3.4", "u3/k5": "FİZ.10.3.5",
    "u3/k6": "FİZ.10.3.6–7",
    "u4/k1": "FİZ.10.4.1", "u4/k2": "FİZ.10.4.2", "u4/k3": "FİZ.10.4.3", "u4/k4": "FİZ.10.4.4", "u4/k5": "FİZ.10.4.5",
    "u4/k6": "FİZ.10.4.6",
}

ANLATIM = {
"u1/k2": r"""
# Bağıl Hareketi Gözlemcinin Gözünden Düşünmek
Hareket **göreceli**dir: Otobüste oturan yolcu, otobüse göre **durgun**, yoldaki ağaca göre **hareketlidir**. Gözlemci kendini **durgun** kabul eder ve diğer cisimlerin hızını kendi hızını çıkararak görür.

| Gözlemci → Cisim | Bağıl hız büyüklüğü | Gözlemcinin gördüğü |
|---|---|---|
| 60 km/h → aynı yönde 80 km/h | $80 - 60 = 20$ km/h | Öne doğru yavaşça uzaklaşıyor |
| 60 km/h → aynı yönde 60 km/h | $0$ | Duruyor gibi |
| 60 km/h → zıt yönde 40 km/h | $40 + 60 = 100$ km/h | Hızla yaklaşıp geçiyor |

**Akıntılı ortam:** Akıntı hızı $\vartheta_a$ olan nehirde, suya göre $\vartheta_y$ hızlı yüzücünün yere göre hızı akıntı yönünde $\vartheta_y + \vartheta_a$, akıntıya karşı $\vartheta_y - \vartheta_a$'dır. Yürüyen merdivende yürüyen kişi de aynı şekilde düşünülür.
""",
"u1/k3": r"""
# İvmeyi Hız–Zaman Grafiğinden Okumak
Hız–zaman grafiğinde doğrunun **eğimi ivmeyi** verir: $a = \dfrac{\Delta \vartheta}{\Delta t}$. Eğim ne kadar dik ise hız o kadar hızlı değişir.
- Eğim pozitif ve hız pozitif → **hızlanma**
- Eğim negatif ve hız pozitif → **yavaşlama**
- Grafik yatay → **ivme sıfır** (sabit hız)

**Ortalama ivme**, toplam hız değişiminin toplam süreye oranıdır; araçların 0–100 km/h hızlanma süresi bu yüzden bir ivme ölçüsüdür. Örneğin 0'dan 100 km/h'e ($\approx 27{,}8$ m/s) 10 s'de çıkan bir aracın ortalama ivmesi $\approx 2{,}8\ m/s^2$'dir.
""",
"u1/k4": r"""
# Grafikler Arası Dönüşüm
| Elimizde | Bulmak için |
|---|---|
| Konum–zaman | Teğetin eğimi → **hız**; hızın değişimi → **ivme** |
| Hız–zaman | Eğim → **ivme**; alan → **yer değiştirme** |
| İvme–zaman | Alan → **hız değişimi**; ilk hız biliniyorsa hız–zaman grafiği çizilir |

**Serbest düşme**, sabit ivmeli hareketin özel bir hâlidir: hava direnci yoksa tüm cisimler kütlesinden bağımsız olarak $g \approx 10\ m/s^2$ ivmeyle düşer ($\vartheta = g\,t$, $h = \tfrac12 g t^2$).
""",
"u2/k1": r"""
# Değişken Kuvvette İş
Kuvvet sabit değilse (ör. yay kuvveti $F = k\,x$) iş, $F$–$x$ grafiğinin altındaki **alandan** hesaplanır. Yay $x$ kadar uzatılırken yapılan iş üçgen alanıdır: $W = \tfrac12 k x^2$ — bu iş yayda **esneklik potansiyel enerjisi** olarak depolanır.
""",
"u2/k2": r"""
# Güç ve Verim
Aynı işi **daha kısa sürede** yapan makine daha **güçlüdür**. Asansör, vinç ve otomobil motorları bu yüzden güçleriyle karşılaştırılır (1 beygir gücü ≈ 746 W).

Bir makineye verilen enerjinin tamamı yararlı işe dönüşmez; bir kısmı ısı ve sesle kaybolur. **Verim**:
$$\eta = \frac{\text{yararlı iş (enerji)}}{\text{harcanan enerji}}\times 100$$
Sabit hızla hareket eden bir cisim için güç $P = F\cdot\vartheta$ biçiminde de yazılabilir.
""",
"u2/k4": r"""
# Korunumla Problem Çözme Adımları
1. **Referans düzeyi** seç (genellikle en alçak nokta, $h=0$).
2. İlk ve son durumun $E_k$ ve $E_p$ değerlerini yaz.
3. Sürtünme yoksa $E_{k1} + E_{p1} = E_{k2} + E_{p2}$; varsa ısıya dönüşen enerjiyi son duruma ekle.

**Not:** Sürtünmesiz eğik düzlemde ya da sarkaçta cismin belli bir yükseklikteki hızı **yolun şekline bağlı değildir**, yalnızca yükseklik farkına bağlıdır: $\vartheta = \sqrt{2 g h}$.
""",
"u2/k5": r"""
# Türkiye'de Enerji Kaynakları
- **Hidroelektrik:** Fırat ve Dicle üzerindeki barajlar (Atatürk, Ilısu).
- **Jeotermal:** Batı Anadolu (Denizli, Aydın) — Türkiye Avrupa'da ilk sıralardadır.
- **Rüzgâr:** Ege ve Marmara kıyıları; **güneş:** Konya–Karapınar güneş enerjisi santrali.
- **Nükleer:** Mersin–Akkuyu nükleer santrali.

Bir kaynağı değerlendirirken **maliyet, süreklilik, çevresel etki, depolanabilirlik ve dışa bağımlılık** birlikte düşünülür.
""",
"u3/k1": r"""
# Su Tesisatı Benzetmesiyle Üç Kavram
| Elektrik | Su tesisatı |
|---|---|
| Potansiyel fark (V) | İki nokta arasındaki **basınç farkı** (su yüksekliği farkı) |
| Akım (I) | Birim zamanda geçen **su miktarı** |
| Direnç (R) | Borunun **daralması**, uzunluğu, iç pürüzü |

Benzetmenin sınırı: Suyun aksine elektrik yükleri **tel bitince dökülmez**; devre **kapalı** olmadıkça akım hiç oluşmaz. **Açık devrede** akım sıfırdır, **kısa devrede** direnç çok küçük olduğu için akım tehlikeli derecede büyür.
""",
"u3/k2": r"""
# Akım Neye Bağlıdır?
Bir iletkende akım, **birim hacimdeki serbest yük sayısı**, **yük taşıyıcının yükü**, **taşıyıcıların sürüklenme hızı** ve **kesit alanı** ile artar. Elektronların sürüklenme hızı çok küçüktür (mm/s düzeyinde); ancak anahtar kapatıldığında elektrik alanı devreye ışık hızına yakın bir hızla yayıldığı için lamba **hemen** yanar.

Bir elektronun yükü $e = 1{,}6\times10^{-19}$ C'dir; 1 C yük yaklaşık $6{,}25\times10^{18}$ elektrona karşılık gelir. Bu nedenle $q = n\cdot e$ bağıntısıyla geçen elektron sayısı bulunabilir.
""",
"u3/k3": r"""
# Ohm Yasasını Deneyle Keşfetmek
1. Bir direnç, reosta, ampermetre (seri) ve voltmetre (direnç uçlarına paralel) ile devre kur.
2. Reostayla gerilimi adım adım değiştir; her adımda $V$ ve $I$ değerlerini tabloya yaz.
3. $V$–$I$ grafiğini çiz: noktalar orijinden geçen bir doğru üzerindeyse direnç **sabittir** (**ohmik** iletken).
4. Doğrunun eğimini hesapla → $R$.

**Ohmik olmayan** elemanlarda (ör. ısındıkça direnci artan **akkor flamanlı lamba**, diyot) grafik doğrusal değildir.
""",
"u3/k5": r"""
# Tükenme Süresi ve Ana Kol Akımı
Bir pilin depoladığı yük (ör. 2000 mAh) sabit olduğu için **çekilen akım arttıkça pil daha çabuk biter**: $t = \dfrac{q}{I}$.
- $n$ özdeş pil **seri** bağlanırsa gerilim $n$ katına çıkar; aynı dirençten geçen akım da $n$ katına çıkar, her pilden aynı akım geçer → pillerin ömrü **kısalır** (tek pile göre $\frac1n$).
- $n$ özdeş pil **paralel** bağlanırsa gerilim tek pil kadardır; ana kol akımı pillere **paylaştırılır** → her pil $\frac{I}{n}$ akım verir ve ömür **$n$ katına** çıkar.
""",
"u4/k1": r"""
# Periyodik Hareket Örnekleri ve Formüller
Dünya'nın kendi ekseni etrafında dönmesi (1 gün), saat sarkacı, kalp atışı, salıncak, dikiş makinesi iğnesi periyodik hareketlere örnektir.

Küçük açılarda **basit sarkacın** periyodu:
$$T = 2\pi\sqrt{\frac{\ell}{g}}$$
**Yay sarkacının** periyodu:
$$T = 2\pi\sqrt{\frac{m}{k}}$$
Sarkaçlı saatler yazın ip (metal çubuk) **uzadığı** için periyot artar ve saat **geri kalır**. Ay'da $g$ küçük olduğundan aynı sarkaç **daha yavaş** salınır.
""",
"u4/k2": r"""
# Atma ve Periyodik Dalga
- **Atma:** Kaynağın tek bir titreşimiyle oluşan dalga parçası.
- **Periyodik dalga:** Kaynak düzenli titreşmeye devam ettiğinde art arda oluşan atmalar.

Bir dalga **bir periyotta bir dalga boyu** ilerler: $\vartheta = \dfrac{\lambda}{T} = \lambda f$. Dalga boyu ve frekans **ters orantılıdır** (aynı ortamda sürat sabit kaldığı için).
""",
"u4/k3": r"""
# Elektromanyetik Spektrum
Elektromanyetik dalgalar artan frekans (azalan dalga boyu) sırasıyla: **radyo → mikrodalga → kızılötesi → görünür ışık → morötesi → X ışınları → gama**. Frekans arttıkça taşınan enerji artar; morötesi, X ve gama ışınları canlı dokulara **zarar verebilir**.

| Dalga | Kullanım |
|---|---|
| Radyo | Radyo–TV yayını |
| Mikrodalga | Fırın, mobil iletişim, radar |
| Kızılötesi | Uzaktan kumanda, termal kamera |
| X ışını | Tıbbi görüntüleme, havalimanı güvenliği |
""",
"u4/k4": r"""
# Neden Ortama Bağlı?
Mekanik dalgada enerji, ortamın tanecikleri birbirini **itip çekerek** aktarılır. Tanecikler arası bağ **güçlü** (esnek) ise titreşim hızlı aktarılır; bu yüzden ses çelik rayda havadakinden yaklaşık **15 kat** hızlı yayılır. Gerilmiş bir ipte dalga sürati ipin **gerginlik kuvvetiyle artar**, birim uzunluğun kütlesiyle azalır:
$$\vartheta = \sqrt{\frac{F}{\mu}}$$
Işık ise boşlukta en hızlıdır; su ve camda yavaşlar. Bu yavaşlama ışığın **kırılmasının** nedenidir.
""",
"u4/k5": r"""
# Dalga Leğeninde Gözlem
Dalga leğeninde **doğrusal** dalgalar çubukla, **dairesel** dalgalar noktasal kaynakla oluşturulur. Leğene bir **cam levha** konarak sığ bölge yapılır.
- Dalga tepeleri **parlak**, çukurları **karanlık** çizgiler olarak görülür; ardışık iki parlak çizgi arası $\lambda$'dır.
- Sığ bölgede çizgiler **sıklaşır** (dalga boyu küçülür).
- Kıyıya eğik gelen deniz dalgalarının kıyıya **paralel** hâle gelmesi kırılmanın günlük hayattaki örneğidir.
""",
}

ORNEK = {
"u1/k1": [], "u2/k1": [],
"u2/k5": [(r"Bir ailenin evinde kullandığı 100 W'lık 10 akkor lamba yerine 12 W'lık LED lambalar takılıyor. Lambalar günde 5 saat yanıyorsa ayda (30 gün) kaç kWh tasarruf edilir?",
           r"Güç farkı: $10\cdot(100-12) = 880$ W $= 0{,}88$ kW. Aylık süre: $5\cdot30 = 150$ h. Tasarruf: $0{,}88\cdot150 = 132$ kWh. Aynı aydınlatma için **yaklaşık %88** daha az enerji harcanır.")],
"u3/k1": [(r"Bir devrede anahtar açıkken lamba yanmıyor. Lambanın uçları kalın bir telle birleştirilirse ne olur? Su tesisatı benzetmesiyle açıklayınız.",
           r"Anahtar açıkken devre **açık devredir**, akım yoktur (vana kapalı). Lamba uçları kalın telle birleştirilirse akım direnci çok küçük telden geçer; lamba **söner** ve devre **kısa devre** olur. Su benzetmesinde bu, dar boruyla yan yana **çok geniş bir boru** açmak gibidir: su (akım) direnci en az olan yolu seçer.")],
"u3/k2": [(r"Bir telden 0,5 A akım 2 dakika boyunca geçiyor. Telin kesitinden kaç elektron geçmiştir? ($e = 1{,}6\times10^{-19}$ C)",
           r"$q = I\cdot t = 0{,}5\cdot120 = 60$ C. Elektron sayısı $n = \dfrac{q}{e} = \dfrac{60}{1{,}6\times10^{-19}} = 3{,}75\times10^{20}$.")],
"u3/k5": [(r"2000 mAh kapasiteli özdeş iki pil, 100 mA akım çeken bir oyuncakta önce seri, sonra paralel bağlanıyor. Oyuncağın direnci sabit kabul edilirse hangi bağlamada piller daha uzun süre dayanır?",
           r"Seri bağlamada gerilim iki katına çıkar, akım $200$ mA olur ve her pilden bu akım geçer: $t = \frac{2000}{200} = 10$ h. Paralel bağlamada gerilim tek pil kadardır, akım $100$ mA ve her pil $50$ mA verir: $t = \frac{2000}{50} = 40$ h. **Paralel** bağlama 4 kat uzun dayanır (ama oyuncak daha az güçle çalışır).")],
"u3/k6": [(r"Bir çamaşır makinesinin gövdesi topraklanmamış ve içindeki bir kablo gövdeye temas etmiştir. Makineye dokunan kişi neden çarpılır? Topraklama bu durumu nasıl önler?",
           r"Gövde gerilim altında kalır; kişi dokunduğunda akım **vücudu üzerinden toprağa** akar. Topraklama hattı varsa yükler **direnci çok küçük** olan topraklama telinden toprağa akar; ayrıca kaçak akım rölesi (RCD) bu kaçağı algılayıp devreyi **milisaniyeler içinde keser**.")],
"u4/k3": [(r"Aşağıdaki dalgaları mekanik/elektromanyetik ve enine/boyuna olarak sınıflandırınız: ipte oluşturulan dalga, ses, radyo dalgası, yayda sıkıştırma dalgası.",
           r"İpteki dalga: **mekanik, enine**. Ses: **mekanik, boyuna**. Radyo dalgası: **elektromanyetik, enine**. Yaydaki sıkıştırma dalgası: **mekanik, boyuna**.")],
"u4/k4": [(r"Gerginliği 4 katına çıkarılan bir ipte dalga sürati nasıl değişir? Frekansı aynı tutulursa dalga boyu ne olur?",
           r"$\vartheta = \sqrt{F/\mu}$ olduğundan $F$ 4 katına çıkarsa sürat $\sqrt4 = 2$ katına çıkar. Frekans kaynağa bağlı ve sabit olduğundan $\lambda = \vartheta/f$ de **2 katına** çıkar.")],
"u4/k5": [(r"Doğrusal su dalgaları derin ortamdan sığ ortama, sınırla $30^\circ$ açı yapacak şekilde geliyor. Sığ ortamda dalga normale yaklaşır mı, uzaklaşır mı? Frekans değişir mi?",
           r"Derinden sığa geçen dalganın sürati azalır, bu yüzden **normale yaklaşır** (kırılma açısı gelme açısından küçük olur). Frekans kaynağa bağlı olduğundan **değişmez**; dalga boyu küçülür.")],
"u4/k6": [(r"Bir köprünün üzerinden asker birliklerinin \"adım uydurarak\" geçmesi neden yasaklanmıştır?",
           r"Adımların frekansı köprünün **doğal frekansına** eşit olursa **rezonans** oluşur; her adım titreşimi büyütür ve genlik tehlikeli boyutlara ulaşabilir. Bu yüzden askerler köprüde adım uydurmadan geçer.")],
}
ORNEK = {k: v for k, v in ORNEK.items() if v}

OZET = {}

EK = {
"u4": [
O("k7", "FİZ.10.4.7", "Depreme ilişkin bilimsel model geliştirme: deprem dalgaları ve depreme dayanıklı yapı",
  "Developing a scientific model of earthquakes: seismic waves and earthquake-resistant buildings", r"""
# Deprem Nasıl Oluşur? — Model
Yer kabuğundaki levhalar hareket ettikçe fay hattı boyunca kayaçlarda **esneklik potansiyel enerjisi** birikir (gerilmiş bir yay gibi). Kayaçların dayanımı aşıldığında fay aniden kırılır; biriken enerji **deprem dalgaları** hâlinde her yöne yayılır.
- **Odak (hiposantr):** Kırılmanın yer altında başladığı nokta.
- **Merkez üssü (episantr):** Odağın yeryüzündeki izdüşümü; hasar genellikle en çok buradadır.

# Deprem Dalgaları
| Dalga | Tür | Sürat | Ortam | Etki |
|---|---|---|---|---|
| **P (birincil)** | Boyuna | En hızlı (~6 km/s) | Katı, sıvı, gaz | İstasyona **ilk** ulaşır |
| **S (ikincil)** | Enine | Daha yavaş (~3,5 km/s) | Yalnız katı | Daha yıkıcı sarsıntı |
| **Yüzey dalgaları** | Karma | En yavaş | Yüzeyde | En çok hasar |

**Sismograf** bu dalgaları kaydeder. P ve S dalgalarının istasyona varış **zaman farkı** depremin uzaklığını verir; **üç istasyonun** verisiyle merkez üssü bulunur (üç çemberin kesişimi).

# Büyüklük ve Şiddet
- **Büyüklük (magnitüd):** Açığa çıkan **enerjinin** ölçüsü; aletsel, tek bir değerdir. Bir birim artış yaklaşık **32 kat** daha fazla enerji demektir.
- **Şiddet:** Bir yerdeki **hasarın** ölçüsü; zemine, uzaklığa ve yapı kalitesine göre yerden yere değişir.

# Rezonans ve Yapılar
Her binanın kat sayısına bağlı bir **doğal titreşim periyodu** vardır (kabaca $T \approx 0{,}1 \times$ kat sayısı saniye). Zemin titreşiminin periyodu binanınkine yakınsa **rezonans** oluşur ve salınım büyür.
- **Yumuşak zeminler** sarsıntıyı büyütür ve uzun periyotlu titreşimler üretir.
- **Sismik izolatörler** (kauçuk–kurşun yastıklar) binayı zeminden ayırarak doğal periyodu uzatır, rezonansı önler.
- **Perde duvarlar**, sünek betonarme ve düzenli taşıyıcı sistem yapıyı güçlendirir.

# Kendi Modelini Kur
Spagetti ve hamurdan ya da tahta çubuklardan farklı yükseklikte **maket binalar** yapıp bir **sarsma masası** (lastikli tabla) üzerinde farklı frekanslarda sallayın. Hangi frekansta hangi binanın en çok salındığını kaydedin, çapraz destek ekleyince sonucun nasıl değiştiğini **modelinizi revize ederek** test edin.
""",
  [(r"Bir sismograf istasyonuna P dalgası 10.00.00'da, S dalgası 10.00.20'de ulaşıyor. P dalgası 6 km/s, S dalgası 3,5 km/s hızla yayılıyorsa deprem istasyona yaklaşık kaç km uzaktadır?",
    r"Uzaklık $d$ ise $\dfrac{d}{3{,}5} - \dfrac{d}{6} = 20$. $d\left(\dfrac{6 - 3{,}5}{21}\right) = 20 \Rightarrow d\cdot\dfrac{2{,}5}{21} = 20 \Rightarrow d = 168$ km."),
   (r"Bir bölgedeki zemin depremde en çok 0,5 s periyotla titreşiyor. 5 katlı ve 20 katlı iki binadan hangisinin rezonansa girme riski daha yüksektir?",
    r"Yaklaşık doğal periyotlar: 5 katlı $\approx 0{,}5$ s, 20 katlı $\approx 2$ s. Zemin periyodu **5 katlı binanınkine eşit** olduğundan bu binada rezonans riski yüksektir. Önlem: sismik izolatör ya da yapının rijitliğini değiştirerek doğal periyodu kaydırmak.")],
  ["Deprem: fayda biriken esneklik enerjisinin kırılmayla dalgalar hâlinde yayılması.", "P dalgası boyuna ve en hızlı; S dalgası enine, yalnız katıda yayılır; yüzey dalgaları en yıkıcıdır.", "P–S varış farkı uzaklığı, üç istasyon merkez üssünü verir.", "Bina ile zemin periyodu yakınsa rezonans oluşur; sismik izolatör ve perde duvar riski azaltır."]),
],
}
