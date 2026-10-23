# -*- coding: utf-8 -*-
r"""9. Sınıf Biyoloji — 1.35.0 tamamlama: resmî Maarif kodları (BİY.9.x.y), BİY.9.2.7 (difüzyon–ozmoz deneyi) ve
BİY.9.2.8 (hücreden sisteme organizasyon) kazanımları, anlatım ekleri, çözümlü örnekler, özet maddeleri."""
from common import O

KOD = {
    "u1/k1": "BİY.9.1.1", "u1/k2": "BİY.9.1.2", "u1/k3": "BİY.9.1.3", "u1/k4": "BİY.9.1.4",
    "u1/k5": "BİY.9.2.1", "u1/k6": "BİY.9.2.2", "u1/k7": "BİY.9.2.2", "u1/k8": "BİY.9.2.2",
    "u1/k9": "BİY.9.2.4", "u1/k10": "BİY.9.2.2", "u1/k11": "BİY.9.2.3",
    "u2/k1": "BİY.9.2.5", "u2/k2": "BİY.9.2.6", "u2/k3": "BİY.9.1.5", "u2/k4": "BİY.9.1.6", "u2/k5": "BİY.9.1.7",
}

ANLATIM = {
"u1/k3": r"""
# Etik Dışı Davranışlar ve Örnek Olaylar
| Davranış | Anlamı | Örnek |
|---|---|---|
| **Fabrikasyon** | Hiç yapılmamış deneyin verisini uydurmak | Ölçülmemiş bitki boylarını tabloya yazmak |
| **Falsifikasyon** | Verileri ya da sonuçları çarpıtmak | Hipotezi desteklemeyen ölçümleri raporlamamak |
| **İntihal** | Başkasının fikir, metin ya da görselini kaynak göstermeden kullanmak | İnternetteki bir projeyi kendi çalışması gibi sunmak |
| **Çıkar çatışması** | Sonucu etkileyebilecek ilişkiyi gizlemek | İlacı üreten firmanın desteğiyle yapılan çalışmada bunu belirtmemek |

- **Etik kurullar:** İnsan ve hayvan üzerinde yapılacak araştırmalar önce etik kurulun onayından geçer.
- **Hayvan deneylerinde 3R ilkesi:** **Replacement** (yerine başka yöntem kullan), **Reduction** (hayvan sayısını azalt), **Refinement** (acıyı en aza indir).
- **Bilgiyi doğrulama:** Bilgi hakemli dergi, resmî kurum ya da üniversite kaynaklarından doğrulanır; tarih, yazar ve kaynak kaydedilir.
""",
"u1/k11": r"""
# Deney Tasarımı: Besin Tayini ve Katalaz
**Besin tayini için kontrollü deney:**
1. Deney tüplerine aynı miktarda farklı besin örneği (ekmek, süt, yumurta akı, yağ) konur.
2. Her besin için **kontrol tüpü** olarak saf su kullanılır (ayıracın kendi rengini görmek için).
3. Ayıraçlar eşit damla sayısında eklenir; Benedict tüpleri sıcak su banyosunda ısıtılır.
4. Renkler tabloya kaydedilir ve kontrol tüpüyle karşılaştırılır.

**Katalaz deneyi (patates/karaciğer + H₂O₂):**
- Bağımsız değişken: sıcaklık (ör. 0 °C, 37 °C, 100 °C'de bekletilmiş karaciğer) ya da pH.
- Bağımlı değişken: köpük yüksekliği / kabarcık sayısı.
- Kontrol değişkenleri: H₂O₂ hacmi ve derişimi, doku miktarı, süre.
- **Beklenen sonuç:** 37 °C'de en çok köpük; haşlanmış (100 °C) dokuda köpük oluşmaz çünkü enzim **denatüre** olmuştur.
""",
"u2/k3": r"""
# Sınıflandırma Ölçütleri Nasıl Seçilir?
- **Yapay sınıflandırma:** Göze çarpan dış özelliklere göre yapılır (yarasa ve kuşu “uçanlar” grubuna koymak). Akrabalığı yansıtmaz.
- **Doğal sınıflandırma:** Hücre yapısı, embriyonik gelişim, **DNA ve protein benzerliği** gibi akrabalık gösteren ölçütler kullanılır (yarasa memelidir).
- **Homolog organlar:** Kökeni aynı, görevi farklı olabilir (insan kolu, yarasa kanadı) → akrabalık kanıtı. **Analog organlar:** Görevi aynı, kökeni farklı (kuş kanadı–kelebek kanadı) → akrabalık göstermez.
- **Tür:** Ortak atadan gelen, yapı ve görev bakımından benzeyen, **çiftleştiğinde verimli döller** oluşturabilen bireyler topluluğu. At ile eşeğin yavrusu katır **kısırdır** → at ve eşek ayrı türdür.
""",
"u2/k5": r"""
# Biyoçeşitliliği Tehdit Eden Etkenler ve Koruma
| Tehdit | Örnek |
|---|---|
| Habitat kaybı | Sulak alanların kurutulması, orman yangınları, plansız kentleşme |
| Aşırı avlanma | Balıkların üreme döneminde avlanması |
| İstilacı yabancı türler | Balast suyuyla taşınan canlılar, Akdeniz'e Süveyş Kanalı'ndan gelen balon balığı |
| Kirlilik ve iklim değişikliği | Tarım ilaçları, sıcaklık artışı |

**Koruma yolları:** Milli parklar ve koruma alanları, **tohum ve gen bankaları**, avlanma yasakları, ekolojik koridorlar, bilinçli tüketim.
- Türkiye'deki bitki türlerinin yaklaşık **üçte biri endemiktir**; bu oran Avrupa ülkelerinin çoğundan yüksektir.
""",
}

ORNEK = {
"u1/k1": [
 (r"Penisilinin keşfi insan hayatını nasıl etkilemiştir? Bu keşif biyolojinin hangi alanlarla ilişkisine örnektir?",
  r"Bakteriyel enfeksiyonlardan ölümleri büyük ölçüde azaltmış, cerrahi işlemleri güvenli hâle getirmiştir. **Biyoloji–tıp–kimya–eczacılık** iş birliğine örnektir; ilacın üretimi kimya ve teknolojiyi de gerektirmiştir."),
 (r"mRNA aşılarının hızla geliştirilebilmesi hangi bilimsel birikime dayanır?",
  r"DNA yapısının (1953) ve genetik şifrenin çözülmesi, protein sentezinde **mRNA'nın** görevinin anlaşılması ve gen teknolojilerinin gelişmesi. Bilimsel bilgi **birikimli** ilerler; yeni teknolojiler önceki dönüm noktalarının üzerine kurulur."),
],
"u1/k2": [
 (r"Bir öğrenci “Gübre bitki büyümesini artırır.” hipotezini sınıyor. Kontrol grubunu nasıl oluşturmalıdır?",
  r"Aynı tür, aynı boyda bitkiler, aynı toprak, ışık ve su ile iki gruba ayrılır. **Deney grubuna gübre** verilir, **kontrol grubuna verilmez**. Tek fark gübre olduğu için büyüme farkı gübreye bağlanabilir."),
],
"u1/k3": [
 (r"Bir öğrenci deneyinde ölçmediği iki bitkinin boyunu, “diğerlerine benzer olur” diye tahminle tabloya yazıyor. Bu hangi etik ihlaldir?",
  r"**Fabrikasyon** (veri uydurma). Ölçülmeyen veri kaydedilemez; eksik veri olduğu açıkça belirtilmelidir."),
 (r"Yeni bir ilacın insanlarda denenmesinden önce hangi etik ilkeler sağlanmalıdır?",
  r"Araştırma **etik kurul onayı** almalı; katılımcılar riskler hakkında bilgilendirilip **gönüllü onam** vermeli; kimlik bilgileri **gizli** tutulmalı; katılımcı istediği an çalışmadan çekilebilmelidir."),
],
"u1/k4": [
 (r"Öglena hangi beslenme şekline sahiptir? Bu özellik onu hangi canlılarla benzer kılar?",
  r"Işıkta kloroplastıyla **fotosentez** yapar (ototrof), karanlıkta besinini hazır alır (heterotrof). Fotosentez yönüyle bitkilere, hazır beslenme yönüyle hayvanlara benzer."),
 (r"Virüsler neden canlı ile cansız arasında kabul edilir?",
  r"Hücresel yapıları ve kendi metabolizmaları **yoktur**, dışarıda kristalleşebilirler (cansız özelliği). Ancak **kalıtım materyali** taşırlar ve **canlı hücre içinde çoğalabilirler** (canlı özelliği)."),
],
"u1/k5": [
 (r"Göllerin kışın yüzeyden donması, içindeki canlılar için neden önemlidir?",
  r"Buzun yoğunluğu sudan küçüktür, **yüzeyde kalır** ve alttaki suyu yalıtır. Göl tabandan donmaz; su canlıları 4 °C civarındaki alt katmanlarda yaşamını sürdürür."),
 (r"Kansızlık şikâyeti olan bir kişiye hangi minerali içeren besinler önerilir? Neden?",
  r"**Demir** (kırmızı et, baklagiller, yeşil yapraklı sebzeler). Demir **hemoglobinin** yapısına katılır; eksikliğinde kan yeterli oksijen taşıyamaz (**anemi**)."),
],
"u1/k6": [
 (r"Ekmek uzun süre çiğnendiğinde ağızda tatlı bir tat hissedilir. Neden?",
  r"Ekmekteki **nişasta**, tükürükteki amilaz enzimiyle hidroliz edilerek **maltoza** (ve glikoza) parçalanır; disakkarit ve monosakkaritler tatlıdır."),
],
"u1/k7": [
 (r"Kış uykusuna yatan hayvanlar ve kutup hayvanları için yağ dokusu neden önemlidir?",
  r"Yağlar (trigliseritler) birim kütlede karbohidratlardan **daha fazla enerji** depolar; ayrıca deri altında **ısı yalıtımı** sağlar. Hayvan beslenmediği dönemde bu enerjiyi kullanır."),
 (r"Fosfolipitler neden hücre zarında çift katman oluşturur?",
  r"Fosfolipitin **hidrofilik başı** suya, **hidrofobik kuyruğu** sudan kaçar. Hücrenin içi ve dışı sulu olduğundan başlar dışa (iki yüze), kuyruklar içe dönük dizilir ve **çift katman** oluşur."),
],
"u1/k8": [
 (r"Yumurta pişirildiğinde neden çiğ hâline geri dönmez?",
  r"Yüksek sıcaklık yumurta akındaki proteinlerin **üç boyutlu yapısını bozar** (denatürasyon). Bu değişim kalıcıdır; protein eski şeklini ve özelliklerini geri kazanamaz."),
],
"u1/k9": [
 (r"Tükürük amilazı mideye geçince neden çalışmaz?",
  r"Amilaz **nötr–hafif bazik** pH'ta çalışır. Midenin **pH'ı 2** civarında (çok asidik) olduğu için enzimin yapısı bozulur ve aktivitesi durur."),
 (r"Bir enzimin farklı sıcaklıklardaki tepkime hızı ölçülüyor: 20 °C'de düşük, 37 °C'de en yüksek, 60 °C'de sıfır. Bu grafiği yorumlayınız.",
  r"37 °C enzimin **optimum sıcaklığıdır**. Sıcaklık artarken taneciklerin çarpışması arttığından hız yükselir; optimumun üstünde enzim **denatüre** olur ve 60 °C'de tamamen çalışmaz. Düşük sıcaklıkta enzim bozulmaz, yalnızca yavaşlar."),
],
"u1/k10": [
 (r"Bir DNA molekülünde adenin bazlarının oranı %30 ise sitozin oranı yüzde kaçtır?",
  r"DNA'da A = T olduğundan T de %30'dur; A + T = %60. Kalan %40, G ve C'ye eşit bölünür (G ≡ C): **sitozin %20**."),
 (r"Uzun süre sebze ve meyve yemeyen gemicilerde görülen skorbüt hastalığı hangi vitaminin eksikliğinden olur? Bu vitamin neden her gün alınmalıdır?",
  r"**C vitamini** eksikliği. C vitamini **suda çözünür**, vücutta depolanmaz ve fazlası idrarla atılır; bu yüzden düzenli alınmalıdır."),
],
"u2/k1": [
 (r"Pankreas hücrelerinde (sindirim enzimi salgılar) hangi organeller daha çok bulunur? Neden?",
  r"Protein yapılı enzimleri üretmek için **ribozom ve granüllü ER**, salgılamak için **Golgi aygıtı**, gereken enerji için **mitokondri** sayısı fazladır."),
 (r"Kas hücrelerinde mitokondri sayısının deri hücrelerinden fazla olmasının nedeni nedir?",
  r"Kas hücreleri kasılmak için çok **ATP** harcar. Mitokondri oksijenli solunumla ATP ürettiğinden enerji ihtiyacı fazla olan hücrelerde sayısı daha fazladır."),
],
"u2/k2": [
 (r"Kırmızı kan hücresi saf suya konursa ne olur? Bitki hücresinde aynı durum neden görülmez?",
  r"Saf su **hipotonik** ortamdır; kan hücresi ozmozla su alır, şişer ve **patlar (hemoliz)**. Bitki hücresinin **hücre duvarı** aşırı şişmeyi önler; hücre patlamaz, **turgor** hâline gelir."),
],
"u2/k3": [
 (r"*Quercus robur*, *Quercus cerris* ve *Fagus orientalis* türlerinden hangileri birbirine daha yakın akrabadır?",
  r"İlk iki türün cins adı aynıdır (*Quercus*, meşe) → **aynı cinste**, daha yakın akrabadırlar. *Fagus* (kayın) farklı cinstedir."),
],
"u2/k4": [
 (r"Bir mikroorganizmanın hücresinde çekirdek zarı yok, hücre duvarında peptidoglikan bulunmuyor ve 80 °C'lik kaplıca suyunda yaşıyor. Bu canlı hangi üst âleme aittir?",
  r"Çekirdek zarı yok → **prokaryot**; peptidoglikan yok ve ekstrem ortamda yaşıyor → **Arkeler**."),
 (r"Mantarların bitkilerden ayrı bir âlemde sınıflandırılmasının nedenleri nelerdir?",
  r"Mantarlar **fotosentez yapmaz**, heterotroftur (çürükçül); hücre duvarı selüloz değil **kitindir**; depo karbohidratı nişasta değil **glikojendir**."),
],
"u2/k5": [
 (r"Bir ekosistemde tür sayısının fazla olması o ekosistemi nasıl etkiler?",
  r"Besin ağı daha **karmaşık ve dayanıklı** olur. Bir tür azaldığında başka türler onun yerini doldurabilir; ekosistem bozulmalara karşı daha **kararlıdır**."),
 (r"Ankara çiğdemi ve Van ters lalesi için “endemik” ifadesi ne anlama gelir? Bu türlerin korunması neden ayrıca önemlidir?",
  r"Dünyada **yalnızca Türkiye'nin o bölgesinde** doğal olarak yetişirler. Yaşam alanları yok olursa türün **tamamen yok olma** riski vardır; başka yerde doğal populasyonu bulunmaz."),
],
"u1/k11": [
 (r"Haşlanmış ve çiğ patates dilimlerine hidrojen peroksit damlatılıyor. Hangisinde köpürme gözlenir? Neden?",
  r"**Çiğ patateste** köpürme (O₂ kabarcığı) gözlenir. Haşlama sırasında yüksek sıcaklık **katalaz enzimini denatüre** ettiği için haşlanmış patateste tepkime gerçekleşmez."),
],
}

OZET = {
"u1/k3": ["Hayvan deneylerinde 3R: yerine koy, azalt, iyileştir; araştırmalar etik kurul onayı gerektirir."],
}

EK = {
"u2": [
O("k6", "BİY.9.2.7", "Küçük moleküllerin pasif taşınmasına (difüzyon ve ozmoz) yönelik deney tasarlayabilme",
  "Designs experiments on the passive transport of small molecules (diffusion and osmosis)", r"""
# Difüzyon ve Ozmoz Deneyleri
## Deney 1: Difüzyon Hızı ve Sıcaklık
- **Soru:** Sıcaklık difüzyon hızını etkiler mi?
- **Düzenek:** Aynı hacimde soğuk (10 °C) ve sıcak (60 °C) suya birer damla mürekkep damlatılır.
- **Değişkenler:** bağımsız — su sıcaklığı · bağımlı — rengin homojen yayılma süresi · kontrol — su hacmi, mürekkep miktarı, kap.
- **Sonuç:** Sıcak suda renk daha hızlı yayılır; sıcaklık arttıkça taneciklerin **kinetik enerjisi** artar, difüzyon hızlanır.

**Difüzyon hızını artıran etkenler:** sıcaklık, derişim farkı, yüzey alanı; taneciklerin küçük olması.

## Deney 2: Patates Silindirlerinde Ozmoz
1. Eşit boy ve kütlede patates silindirleri kesilir, ilk kütleleri tartılır.
2. Farklı derişimde tuzlu su çözeltilerine (%0, %1, %3, %5) konur, 30 dakika bekletilir.
3. Silindirler kurulanıp yeniden tartılır, **kütle değişimi yüzdesi** hesaplanır.

| Çözelti | Kütle değişimi (örnek veri) | Ortam |
|---|---|---|
| Saf su (%0) | +%8 | Hipotonik → hücre su alır |
| %1 tuz | +%1 | Yaklaşık izotonik |
| %3 tuz | −%6 | Hipertonik → su kaybı |
| %5 tuz | −%12 | Daha hipertonik → daha çok su kaybı |

- Kütlenin değişmediği derişim, patates hücrelerinin iç ortamıyla **izotonik** olan derişimi gösterir.
- **Yumurta zarı deneyi:** Kabuğu sirkeyle eritilmiş yumurta saf suda şişer, derişik şurupta büzüşür.

> Deneylerde **tek bir değişken** değiştirilir; ölçümler en az üç kez tekrarlanıp ortalaması alınır.
""",
  [(r"Patates silindirleri %5'lik tuzlu suda 10 g'dan 8,8 g'a iniyor. Kütle değişimi yüzde kaçtır? Bu sırada hücrelerde ne olmuştur?",
    r"Değişim $= \dfrac{8{,}8 - 10}{10} \cdot 100 = -\%12$. Ortam **hipertoniktir**; hücreler **ozmozla su kaybetmiş**, sitoplazma büzüşmüştür (**plazmoliz**)."),
   (r"Salatanın üzerine tuz ve limon sosu erkenden dökülürse marul neden pörsür?",
    r"Sos marul hücrelerine göre **hipertonik** bir ortam oluşturur. Hücreler ozmozla **su kaybeder**, turgor basıncı azalır ve yapraklar pörsür.")],
  ["Sıcaklık, derişim farkı ve yüzey alanı arttıkça difüzyon hızlanır.", "Ozmoz deneyi: kütle artışı → hipotonik, azalış → hipertonik, değişmeme → izotonik ortam.", "Deneyde tek değişken değiştirilir, ölçümler tekrarlanır."]),
O("k7", "BİY.9.2.8", "Hücrelerin doku, organ ve sistemleri oluşturmasındaki örüntülere ilişkin tümevarımsal akıl yürütebilme",
  "Uses inductive reasoning about how cells organize into tissues, organs and systems", r"""
# Hücreden Organizmaya Organizasyon
Çok hücreli canlılarda hücreler **farklılaşarak** (özelleşerek) belirli görevleri üstlenir ve birlikte çalışır:

$$\text{Hücre} \rightarrow \text{Doku} \rightarrow \text{Organ} \rightarrow \text{Sistem} \rightarrow \text{Organizma}$$

| Düzey | Tanım | Hayvan örneği | Bitki örneği |
|---|---|---|---|
| **Hücre** | Canlılığın en küçük birimi | Kas hücresi | Yaprak hücresi |
| **Doku** | Aynı kökenli ve aynı görevi yapan hücreler | Kas dokusu | İletim dokusu (odun–soymuk) |
| **Organ** | Farklı dokuların bir görev için birleşmesi | Kalp | Yaprak, kök |
| **Sistem** | Ortak görevi olan organlar | Dolaşım sistemi | Sürgün sistemi |
| **Organizma** | Sistemlerin uyumlu çalışmasıyla bağımsız yaşayan birey | İnsan | Çınar ağacı |

## Hayvanlarda Temel Doku Tipleri
- **Epitel doku:** Vücut yüzeyini ve organ içlerini örter, salgı yapar (deri, bezler).
- **Bağ doku:** Destek ve bağlantı sağlar (kemik, kıkırdak, kan, yağ dokusu).
- **Kas doku:** Hareket sağlar (iskelet, düz, kalp kası).
- **Sinir doku:** Uyarıları iletir ve yorumlar (beyin, sinirler).

## Örüntüden Genellemeye
- Görevi farklı hücrelerin **şekli de farklıdır**: sinir hücresi uzun uzantılı (iletim), kırmızı kan hücresi çekirdeksiz ve iki yanı çukur (gaz taşıma için geniş yüzey), kas hücresi uzun ve iğ biçimli (kasılma).
- **Genelleme:** Hücrenin yapısı görevine uygundur; organizasyon düzeyi yükseldikçe yeni özellikler ortaya çıkar (tek bir kalp kası hücresi kan pompalayamaz, kalp organı pompalar).
- Tek hücrelilerde (amip, bakteri) tüm yaşamsal işlevleri **tek hücre** üstlenir; organizasyon hücre düzeyindedir.
""",
  [(r"Mide hangi organizasyon düzeyindedir? Hangi dokulardan oluşur?",
    r"Mide bir **organdır**. İç yüzeyini örten ve salgı yapan **epitel doku**, karıştırma hareketini sağlayan **düz kas dokusu**, destek veren **bağ doku** ve çalışmasını düzenleyen **sinir dokusundan** oluşur. Sindirim sisteminin bir parçasıdır."),
   (r"Sinir hücresi, kırmızı kan hücresi ve kas hücresinin şekilleri incelenince hangi genellemeye ulaşılır?",
    r"Her hücrenin **şekli görevine uygundur**: uzun uzantılı sinir hücresi uyarıyı uzak mesafeye iletir, çekirdeksiz ve çukur yüzlü kan hücresi daha çok oksijen taşır, uzun kas hücresi kasılarak hareket sağlar. **Yapı–görev uyumu** organizasyonun temel örüntüsüdür.")],
  ["Hücre → doku → organ → sistem → organizma.", "Hayvanlarda dört temel doku: epitel, bağ, kas, sinir.", "Hücrenin yapısı görevine uygundur; üst düzeyde yeni özellikler ortaya çıkar."]),
],
}
