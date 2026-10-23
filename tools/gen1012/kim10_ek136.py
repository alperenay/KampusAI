# -*- coding: utf-8 -*-
r"""10. Sınıf Kimya — 1.36.0: Maarif kodları (KİM.10.1.1–KİM.10.3.2), eksik KİM.10.1.2 (kimyasal tepkimelerin
oluşumu için bilimsel model) ve KİM.10.3.2 (atmosferdeki tepkimeler ve küresel sorunlar), kısa anlatımların
genişletilmesi, eksik örnekler. Kaynak: tymm.meb.gov.tr Kimya Dersi 10. Sınıf tema sayfaları (21 öğrenme çıktısı)."""
from common import O

KOD = {
    "u1/k1": "KİM.10.1.1", "u1/k2": "KİM.10.1.3", "u1/k3": "KİM.10.1.4–5", "u1/k4": "KİM.10.1.6", "u1/k5": "KİM.10.1.7",
    "u2/k1": "KİM.10.1.8", "u2/k2": "KİM.10.1.9", "u2/k3": "KİM.10.1.10", "u2/k4": "KİM.10.1.11",
    "u3/k1": "KİM.10.2.1–2", "u3/k2": "KİM.10.2.3", "u3/k3": "KİM.10.2.4–5", "u3/k4": "KİM.10.2.6", "u3/k5": "KİM.10.2.7",
    "u3/k6": "KİM.10.2.8", "u4/k1": "KİM.10.3.1",
}

ANLATIM = {
"u1/k5": r"""
# Kütle–Kütle ve Kütle–Hacim Hesapları
$N_2 + 3H_2 \rightarrow 2NH_3$ tepkimesinde katsayılar şu oranları verir:
| | $N_2$ | $H_2$ | $NH_3$ |
|---|---|---|---|
| Mol oranı | 1 | 3 | 2 |
| Kütle (g) | 28 | 6 | 34 |
| NŞA hacmi (L) | 22,4 | 67,2 | 44,8 |

Kütle **korunur** ($28 + 6 = 34$), ancak mol ve hacim **korunmak zorunda değildir** ($1 + 3 \ne 2$). Hesaplarda her zaman **mol** üzerinden ilerlemek hatayı önler.
""",
"u2/k1": r"""
# Gaz Basıncı ve Ölçülmesi
Gaz basıncı, taneciklerin kabın çeperlerine **çarpmasından** doğar. Açık hava basıncı **barometre** ile (Torricelli: deniz seviyesinde 76 cmHg = 1 atm), kapalı kaptaki gaz basıncı **manometre** ile ölçülür.
- $1\ atm = 76\ cmHg = 760\ mmHg = 101{,}3\ kPa$
- Sıcaklık artınca tanecikler daha hızlı hareket eder, daha sık ve şiddetli çarpar → **basınç artar**.
- Gazların **yoğunluğu** sıvı ve katılardan çok küçüktür; sıkıştırılabilmeleri tanecikler arası boşluğun büyüklüğünden kaynaklanır.
""",
"u2/k2": r"""
# Grafiklerle Gaz Yasaları
| Yasa | Grafik | Şekil |
|---|---|---|
| Boyle | $P$–$V$ | Hiperbol (ters orantı); $P$–$\frac1V$ doğrusal |
| Charles | $V$–$T(K)$ | Orijinden geçen doğru; $V$–$t(^\circ C)$ grafiği $-273\ ^\circ C$'yi keser |
| Gay-Lussac | $P$–$T(K)$ | Orijinden geçen doğru |
| Avogadro | $V$–$n$ | Orijinden geçen doğru |

$V$–$t(^\circ C)$ doğrularının uzatıldığında hepsinin $-273\ ^\circ C$'de kesişmesi, **mutlak sıfır** kavramına ulaşılmasını sağlamıştır.
""",
"u2/k3": r"""
# İdeal Gaz Denkleminin Türetilmesi
- Boyle: $V \propto \dfrac1P$, Charles: $V \propto T$, Avogadro: $V \propto n$
- Birleştirilirse $V \propto \dfrac{nT}{P}$; orantı sabiti $R$ ile $PV = nRT$.

**Yoğunluk ve mol kütlesi:** $n = \dfrac{m}{M_A}$ yazılırsa $P\cdot M_A = d\cdot R\cdot T$ elde edilir. Aynı koşullarda mol kütlesi büyük olan gazın yoğunluğu da büyüktür ($CO_2$ havadan ağırdır, yere çöker; $He$ hafiftir, balonları uçurur).
""",
"u2/k4": r"""
# Deney Tasarımı: Difüzyon Hızı
Bir cam borunun bir ucuna **derişik HCl**, diğer ucuna **derişik NH₃** ile ıslatılmış pamuk konur. İki gaz borunun içinde karşılaştığında beyaz **NH₄Cl** halkası oluşur.
- Halka **HCl** tarafına daha yakın oluşur; çünkü $NH_3$ ($M_A = 17$) $HCl$'den ($M_A = 36{,}5$) daha **hafiftir** ve daha hızlı yayılır.
- Hız oranı $\sqrt{36{,}5/17} \approx 1{,}47$; $NH_3$ yaklaşık **1,5 kat** daha uzun yol alır.

**Günlük hayattan:** Balonların zamanla sönmesi (helyum efüzyonu), parfümün odaya yayılması, doğal gaza eklenen kokulu maddenin kaçağı haber vermesi.
""",
"u3/k2": r"""
# Çözünme Olaylarını Gruplamak
Çözünme olayları iki **ölçüte** göre birlikte sınıflandırılabilir:
1. **Çözünenin yapısı:** İyonlarına ayrışıyor mu (iyonik), molekül olarak mı dağılıyor (moleküler)?
2. **Kimlik değişimi:** Çözünen kimlik değiştiriyor mu (kimyasal), değiştirmiyor mu (fiziksel)?

Örneğin $HCl$ gazı suda **iyonlaşır** ($HCl \rightarrow H^+ + Cl^-$); molekül yapılı olduğu hâlde çözeltisi elektrik iletir. **Etil alkol** ise suda hidrojen bağlarıyla moleküler olarak çözünür ve iletmez.
""",
"u3/k3": r"""
# Çözünürlük Eğrileri
Sıcaklık–çözünürlük grafiğinde eğrinin **tam üzerindeki** noktalar doymuş, eğrinin **yukarısındaki** noktalar aşırı doymuş, **altındaki** noktalar doymamış çözeltiyi gösterir. Bir doymuş çözelti soğutulduğunda (çözünürlük sıcaklıkla artıyorsa) fazla çözünen **kristallenir** — bu yöntemle maddeler saflaştırılır (**kristallendirme**).

Örnek: $KNO_3$'ün çözünürlüğü sıcaklıkla hızla artar; $NaCl$'ünki ise neredeyse sabittir. Bu yüzden $KNO_3$ soğutarak, $NaCl$ ise **buharlaştırarak** kristallendirilir (tuzlalar).
""",
"u3/k4": r"""
# Aşırı Doymuş Çözeltiye Örnekler
- **Bal** ve **reçel** zamanla şekerlenir: Aşırı doymuş şeker çözeltisi kararsızdır, küçük bir kristal çekirdeği oluşunca fazla şeker çöker.
- **El ısıtıcı pedler:** Aşırı doymuş sodyum asetat çözeltisinde metal plakaya basılınca kristallenme başlar ve **ısı açığa çıkar**.
""",
"u3/k5": r"""
# Kütlece Yüzde ile Molarite Arasında Geçiş
Ticari çözeltilerde derişim çoğu zaman **kütlece yüzde** ve **yoğunluk** ile verilir:
$$M = \frac{\%\cdot d\cdot 10}{M_A}$$
($d$: g/mL cinsinden yoğunluk). Örneğin kütlece %36,5'lik, $d = 1{,}2$ g/mL HCl çözeltisi: $M = \dfrac{36{,}5\cdot1{,}2\cdot10}{36{,}5} = 12$ M'dir.

**ppm'in kullanım alanları:** İçme suyundaki nitrat, florür ve ağır metal sınırları; havadaki $CO_2$ (günümüzde ≈ 420 ppm) ve kirletici gazlar.
""",
"u4/k1": r"""
# Atom Ekonomisi
Bir tepkimede **istenen ürüne** dönüşen atomların oranı:
$$\text{Atom ekonomisi} = \frac{\text{istenen ürünün kütlesi}}{\text{girenlerin toplam kütlesi}}\times100$$
Atom ekonomisi yüksek tepkimeler (ör. birleşme tepkimeleri) **daha az atık** üretir. Yeşil kimya; tehlikesiz çözücüler, oda koşullarında çalışan katalizörler ve **yenilenebilir hammaddeler** kullanmayı da önerir.

**Makro–mikro karşılaştırma örneği:** 50 mL yerine 2 mL çözeltiyle yapılan bir çökelme deneyi aynı gözlemi sağlar; kimyasal tüketimi ve atık **25 kat** azalır.
""",
}

ORNEK = {
"u1/k1": [(r"Demirin paslanması ve buzun erimesi olaylarını tanecik düzeyinde karşılaştırınız. Hangisi kimyasal değişimdir?",
           r"**Buzun erimesi** fiziksel değişimdir: $H_2O$ molekülleri aynı kalır, yalnızca moleküller arası düzen değişir. **Paslanma** kimyasal değişimdir: Fe atomları $O_2$ ve suyla etkileşir, atomlar **yeniden düzenlenerek** yeni bağlar kurulur ve yeni bir madde ($Fe_2O_3\cdot nH_2O$) oluşur. Renk değişimi kimyasal değişimin göstergesidir.")],
"u2/k1": [(r"Bir şırınganın ucu kapatılıp pistonu itildiğinde içindeki hava sıkışır, aynı işlem suyla yapıldığında su sıkışmaz. Bu farkı kinetik moleküler teori ile açıklayınız.",
           r"Gaz tanecikleri arasında **çok büyük boşluklar** vardır; basınç uygulanınca tanecikler birbirine yaklaşır ve hacim küçülür. Sıvılarda tanecikler **birbirine temas edecek kadar yakındır**; aradaki boşluk çok az olduğu için sıvılar pratikte sıkıştırılamaz.")],
"u2/k3": [(r"NŞA'da (0 °C, 1 atm) yoğunluğu 1,25 g/L olan gazın mol kütlesi kaçtır? Bu gaz ne olabilir?",
           r"$P\cdot M_A = d\cdot R\cdot T \Rightarrow M_A = \dfrac{1{,}25\cdot0{,}082\cdot273}{1} \approx 28$ g/mol. Gaz **$N_2$** ya da **$CO$** olabilir (ikisinin de mol kütlesi 28 g/mol).")],
"u2/k4": [(r"Aynı koşullarda bir gaz, $CH_4$ gazından ($M_A = 16$) 2 kat yavaş yayılıyor. Bu gazın mol kütlesi kaçtır?",
           r"$\dfrac{\vartheta_{CH_4}}{\vartheta_X} = \sqrt{\dfrac{M_X}{16}} = 2 \Rightarrow \dfrac{M_X}{16} = 4 \Rightarrow M_X = 64$ g/mol (ör. $SO_2$).")],
"u3/k1": [(r"Yağlı bir tavanın yalnızca suyla temizlenememesi, deterjanla ise temizlenebilmesini \"benzer benzeri çözer\" ilkesiyle açıklayınız.",
           r"Yağ **apolar**, su **polar**dır; yağ suda çözünmez. Deterjan molekülünün bir ucu **apolar** (hidrokarbon zinciri, yağı çeker), diğer ucu **polar/iyonik**tir (suyu çeker). Deterjan yağ damlacıklarını sararak (misel) suyla birlikte uzaklaşmalarını sağlar.")],
"u3/k2": [(r"$KNO_3$, etil alkol ve $SO_2$ gazının suda çözünmesini iyonik/moleküler ve fiziksel/kimyasal olarak sınıflandırınız.",
           r"$KNO_3$: **iyonik, fiziksel** ($K^+$ ve $NO_3^-$ iyonlarına ayrışır, kimlik korunur). Etil alkol: **moleküler, fiziksel**. $SO_2$: suyla tepkimeye girerek $H_2SO_3$ oluşturur → **kimyasal** çözünme; oluşan asit kısmen iyonlaştığı için çözelti zayıf iletkendir.")],
"u3/k4": [(r"Oda sıcaklığındaki bir şekerli su çözeltisinin doymuş mu doymamış mı olduğunu deneysel olarak nasıl anlarsınız?",
           r"Çözeltiye **az miktar şeker** eklenip karıştırılır: Şeker çözünürse çözelti **doymamış**tır; çözünmeden dibe çökerse **doymuş**tur. Eklenen bir kristal büyüyor ve fazla madde çöküyorsa çözelti **aşırı doymuş**tur.")],
"u3/k6": [(r"Kışın yollara tuz serpilmesinin ve araç radyatörlerine antifriz (etilen glikol) konmasının ortak nedeni nedir?",
           r"İkisi de **donma noktası alçalması** (koligatif özellik) ilkesine dayanır: Suya çözünen tanecikler eklendiğinde çözeltinin donma noktası saf sudan **düşük** olur. Böylece yollar buz tutmaz, radyatördeki su donup motoru çatlatmaz. Antifriz ayrıca kaynama noktasını **yükselterek** yazın aşırı ısınmayı önler.")],
"u4/k1": [(r"$CaCO_3 \rightarrow CaO + CO_2$ tepkimesinde istenen ürün $CaO$ ise atom ekonomisi yüzde kaçtır? ($Ca = 40$, $C = 12$, $O = 16$)",
           r"Girenin kütlesi: $CaCO_3 = 100$ g/mol. İstenen ürün $CaO = 56$ g/mol. Atom ekonomisi $= \dfrac{56}{100}\times100 = \%56$. Kalan %44 ($CO_2$) **yan ürün/atıktır** ve sera gazı olarak atmosfere karışır.")],
}

OZET = {}

EK = {
"u1": [
O("k6", "KİM.10.1.2", "Kimyasal tepkimelerin oluşumu: tanecik modeli ve çarpışma",
  "How chemical reactions happen: particle model and collisions", r"""
# Tepkime Nasıl Gerçekleşir? — Bir Model Kuralım
Bir kimyasal tepkimede **atomlar yok olmaz, yoktan da var olmaz**; yalnızca **yeniden düzenlenir**. Bu düzenlenme şu basamaklarla modellenebilir:
1. **Çarpışma:** Tepkimeye girecek tanecikler (atom, molekül, iyon) birbirleriyle **çarpışmalıdır**.
2. **Bağların kırılması:** Girenlerdeki bazı kimyasal bağlar kırılır — bu basamak **enerji gerektirir**.
3. **Yeni bağların oluşması:** Atomlar yeni düzende birleşir — bu basamakta **enerji açığa çıkar**.

$$2H_2 + O_2 \rightarrow 2H_2O$$
Tanecik modelinde: 2 tane $H\text{–}H$ bağı ve 1 tane $O\text{=}O$ bağı kırılır; 4 tane $O\text{–}H$ bağı oluşur. **4 H ve 2 O atomu** başta da sonda da vardır.

# Etkin Çarpışma
Her çarpışma tepkimeyle sonuçlanmaz. Bir çarpışmanın **etkin** olması için:
- Taneciklerin **yeterli kinetik enerjisi** olmalıdır (bağları kırabilecek kadar),
- Tanecikler **uygun doğrultuda (geometride)** çarpışmalıdır.

Sıcaklık artınca taneciklerin hızı ve etkin çarpışma sayısı artar; **derişimi artırmak** ya da katıyı **toz hâline getirmek** çarpışma sayısını artırır. Bu yüzden ince kıyılmış odun kütükten daha hızlı yanar.

# Modeli Sınamak ve Revize Etmek
| Gözlem | Model açıklıyor mu? |
|---|---|
| Kütle korunur | ✓ Atomlar yalnızca yer değiştirir |
| Bazı tepkimeler ısı verir, bazıları alır | ✓ Kırılan ve oluşan bağların enerji farkı |
| Kibrit kendiliğinden yanmaz, sürtünmeyle yanar | ✓ Başlangıçta bağ kırmak için **enerji** gerekir |
| Çözeltide tepkimeler katılara göre daha hızlıdır | ✓ İyonlar serbestçe hareket edip **daha sık çarpışır** |

Modelimiz yeni bir gözlemi açıklayamazsa (ör. katalizörün etkisi) **revize edilir**: Katalizör, tepkimenin **daha düşük enerjili bir yoldan** gerçekleşmesini sağlar ve kendisi tükenmez.
""",
  [(r"Metan yanmasında ($CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O$) hangi bağlar kırılır, hangileri oluşur? Atom sayılarının korunduğunu gösteriniz.",
    r"**Kırılan:** 4 tane $C\text{–}H$ bağı, 2 tane $O\text{=}O$ bağı. **Oluşan:** 2 tane $C\text{=}O$ (karbondioksitte), 4 tane $O\text{–}H$ (iki su molekülünde). Atomlar: Girenlerde 1 C, 4 H, 4 O; ürünlerde 1 C, 4 H, $2 + 2 = 4$ O. Atomlar korunmuş, yalnızca **yeniden düzenlenmiştir**."),
   (r"Bir avuç demir tozu alevde parlayarak yanarken demir çivi yanmaz. Bu durumu tanecik ve çarpışma modeliyle açıklayınız.",
    r"Toz hâlindeki demirin **yüzey alanı** çok büyüktür; daha fazla demir atomu oksijenle **aynı anda temas eder** ve etkin çarpışma sayısı artar. Çivide yalnızca yüzeydeki atomlar oksijenle çarpışabilir; tepkime çok yavaş (paslanma) ilerler.")],
  ["Tepkimede atomlar yeniden düzenlenir: bağlar kırılır (enerji alır), yeni bağlar oluşur (enerji verir).", "Tepkime için tanecikler yeterli enerji ve uygun doğrultuda çarpışmalıdır (etkin çarpışma).", "Sıcaklık, derişim ve yüzey alanı çarpışma sayısını artırır.", "Bilimsel model gözlemlerle sınanır, açıklayamadığı durumlarda revize edilir."]),
],
"u4": [
O("k2", "KİM.10.3.2", "Atmosferdeki tepkimeler ve küresel sorunlar: hava kirliliği, asit yağmuru, ozon, sera etkisi",
  "Reactions in the atmosphere and global problems: air pollution, acid rain, ozone, greenhouse effect", r"""
# Atmosferde Gerçekleşen Tepkimeler
İnsan faaliyetleriyle atmosfere verilen gazlar, atmosferde **kimyasal tepkimelere** girerek ekosistemi etkileyen sorunlara yol açar.

# 1. Hava Kirliliği
- Kükürtlü kömürün yanması: $S + O_2 \rightarrow SO_2$
- Araç motorlarında yüksek sıcaklık: $N_2 + O_2 \rightarrow 2NO$, $2NO + O_2 \rightarrow 2NO_2$ (kahverengi duman)
- Eksik yanma: $2C + O_2 \rightarrow 2CO$ (renksiz, kokusuz, **zehirli** — sobadan zehirlenme)
- **Partikül madde (PM)** ve güneş ışığıyla oluşan **fotokimyasal sis**; solunum yolu hastalıkları.

# 2. Asit Yağmurları
$$SO_2 + H_2O \rightarrow H_2SO_3 \qquad 2SO_2 + O_2 \rightarrow 2SO_3, \quad SO_3 + H_2O \rightarrow H_2SO_4$$
$$3NO_2 + H_2O \rightarrow 2HNO_3 + NO$$
Normal yağmur $CO_2$ nedeniyle hafif asidiktir (pH ≈ 5,6); asit yağmurunun pH'ı daha düşüktür. **Etkileri:** Göl ve akarsuların asitlenmesi (balık ölümleri), ormanların zarar görmesi, toprağın besin minerallerini kaybetmesi, **mermer ve kireç taşı** yapıların aşınması: $CaCO_3 + H_2SO_4 \rightarrow CaSO_4 + H_2O + CO_2$.

# 3. Ozon Tabakasının İncelmesi
Stratosferdeki ozon ($O_3$) Güneş'in zararlı **UV** ışınlarını soğurur. **CFC'ler** (eski buzdolabı ve spreylerdeki kloroflorokarbonlar) UV ile parçalanıp **klor atomu** açığa çıkarır:
$$Cl + O_3 \rightarrow ClO + O_2 \qquad ClO + O \rightarrow Cl + O_2$$
Klor atomu tükenmez (**katalizör** gibi davranır); tek bir Cl atomu binlerce ozon molekülünü parçalayabilir. **Montreal Protokolü (1987)** ile CFC kullanımı yasaklandı ve ozon tabakası yavaşça iyileşmektedir.

# 4. Sera Etkisi ve Küresel Isınma
$CO_2$, $CH_4$, $N_2O$ ve su buharı, yeryüzünün yaydığı **kızılötesi** ışınları tutar. Doğal sera etkisi yaşam için gereklidir; ancak fosil yakıtlar ($CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O$) ve ormansızlaşma nedeniyle artan $CO_2$ derişimi **küresel ısınmaya** yol açar: buzulların erimesi, deniz seviyesinin yükselmesi, aşırı hava olayları, okyanusların asitlenmesi.

# Çözüm Önerilerini Değerlendirme
| Sorun | Çözüm önerisi |
|---|---|
| $SO_2$ salımı | Bacalara **filtre/desülfürizasyon** ($CaO + SO_2 \rightarrow CaSO_3$), kükürtsüz yakıt |
| $NO_x$ ve $CO$ | Araçlarda **katalitik konvertör** ($2CO + 2NO \rightarrow 2CO_2 + N_2$), toplu taşıma |
| Ozon incelmesi | CFC yerine ozon dostu soğutucular |
| Küresel ısınma | Yenilenebilir enerji, enerji verimliliği, ağaçlandırma, **karbon ayak izini** azaltma |
""",
  [(r"Tarihî mermer heykellerin büyük şehirlerde kırsal alanlara göre daha hızlı aşınmasının nedenini tepkime denklemleriyle açıklayınız.",
    r"Şehirlerde kömür ve yakıt kullanımı fazla olduğundan havada daha çok $SO_2$ ve $NO_2$ bulunur; bunlar suyla **asit yağmuru** oluşturur ($SO_3 + H_2O \rightarrow H_2SO_4$). Asit, mermerin ana bileşeni $CaCO_3$ ile tepkimeye girer: $CaCO_3 + H_2SO_4 \rightarrow CaSO_4 + H_2O + CO_2$. Oluşan $CaSO_4$ suda daha çok çözünür ve yağmurla yıkanır; heykel aşınır."),
   (r"Bir şehirde kış aylarında hava kirliliği çok yüksektir. Belediyenin önerdiği çözümler: a) kömür yerine doğal gaz, b) bacalara filtre, c) yeşil alanların artırılması. Bu çözümleri veriye dayalı değerlendiriniz.",
    r"a) Doğal gaz ($CH_4$) kükürt içermediği için **$SO_2$ ve partikül** salımını büyük ölçüde azaltır, ama yine $CO_2$ üretir → kısa vadede en etkili çözüm. b) Filtreler mevcut kömür kullanımında $SO_2$ ve partikülü azaltır; maliyetlidir ve tüm evlerde uygulanması zordur. c) Yeşil alanlar partikülleri tutar ve $CO_2$ soğurur; etkisi **uzun vadeli** ve destekleyicidir. En iyi sonuç üç önlemin **birlikte** uygulanmasıyla alınır.")],
  ["Kirleticiler: SO₂ (kükürtlü yakıt), NOₓ (motorlar), CO (eksik yanma), partikül madde.", "Asit yağmuru: SO₂/NO₂ + su → H₂SO₄/HNO₃; göller, ormanlar ve mermer yapılar zarar görür.", "CFC'den çıkan Cl, ozonu katalitik olarak parçalar; Montreal Protokolü ile yasaklandı.", "Artan CO₂ ve CH₄ sera etkisini güçlendirir; çözüm: filtre, katalitik konvertör, yenilenebilir enerji."]),
],
}
