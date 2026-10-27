# -*- coding: utf-8 -*-
r"""9. Sınıf Beden Eğitimi ve Spor, Görsel Sanatlar, Müzik → beden-9.js, gorsel-9.js, muzik-9.js
Uygulamalı derslerin kuramsal konu anlatımları. Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni
kopyalanmamıştır."""
from _c import O, U, write

beden = [
U("u1", "1. Ünite: Sağlıklı Yaşam ve Hareket", "Unit 1: Healthy Living and Movement", [
O("k1", "BES.E1", "Fiziksel uygunluk bileşenleri ve antrenman ilkeleri", "Components of fitness and training principles", r"""
# Fiziksel Uygunluk
Günlük işleri yorulmadan yapabilme ve boş zamanı etkin değerlendirebilme kapasitesidir.
| Sağlıkla ilgili bileşen | Anlamı | Geliştiren etkinlik |
|---|---|---|
| **Kalp-solunum dayanıklılığı** | Uzun süre orta şiddette çalışabilme | Yürüyüş, koşu, yüzme, bisiklet |
| **Kas kuvveti** | Bir kasın üretebildiği en büyük kuvvet | Ağırlık çalışmaları |
| **Kas dayanıklılığı** | Kasın uzun süre tekrar yapabilmesi | Şınav, mekik, plank |
| **Esneklik** | Eklemlerin hareket açıklığı | Germe (streç) çalışmaları |
| **Vücut kompozisyonu** | Yağ ve yağsız doku oranı | Düzenli hareket + dengeli beslenme |
Beceriyle ilgili bileşenler: **sürat, çeviklik, denge, koordinasyon, reaksiyon zamanı, güç**.

# Antrenman İlkeleri
- **Aşamalılık:** Yük kolaydan zora, azdan çoğa artırılır.
- **Aşırı yükleme:** Gelişme için vücuda alışık olduğundan biraz fazla yük verilir.
- **Süreklilik:** Düzenli yapılmayan çalışmanın kazanımları kaybolur.
- **Bireysellik:** Her bireyin yaşı, düzeyi ve hedefi farklıdır.
- **Dinlenme:** Toparlanma olmadan gelişme olmaz; aşırı yüklenme sakatlığa yol açar.

# Isınma ve Soğuma
Her etkinlikten önce 10–15 dakikalık **ısınma** (hafif koşu, eklem çevirmeleri, dinamik germe) kas ve eklemleri hazırlar, sakatlık riskini azaltır. Bitişte **soğuma** (yavaş yürüyüş, statik germe) nabzın kademeli düşmesini sağlar.
""",
 [(r"Koşu performansını artırmak isteyen bir öğrenci her hafta koşu süresini biraz uzatıyor. Hangi antrenman ilkelerini uygulamaktadır?", r"**Aşamalılık** ve **aşırı yükleme** ilkelerini; düzenli koşuyorsa **süreklilik** ilkesini de uygular."),
  (r"Esnekliği geliştirmek için hangi tür çalışma yapılır?", r"**Germe (streç)** çalışmaları; ısınmada dinamik, soğumada statik germe tercih edilir.")],
 [r"Sağlıkla ilgili bileşenler: kalp-solunum dayanıklılığı, kas kuvveti ve dayanıklılığı, esneklik, vücut kompozisyonu.", r"Antrenman ilkeleri: aşamalılık, aşırı yükleme, süreklilik, bireysellik, dinlenme.",
  r"Isınma sakatlığı önler; soğuma nabzı kademeli düşürür."]),
O("k2", "BES.E2", "Spor sakatlıkları, güvenlik ve fair play", "Sports injuries, safety and fair play", r"""
# Sık Görülen Sakatlıklar
- **Burkulma** (bağ zorlanması, ör. ayak bileği) ve **kas zorlanması**: İlk 48 saatte **RICE** yöntemi: **R**est (dinlenme), **I**ce (buz, 15–20 dk, bez üzerinden), **C**ompression (bandajla baskı), **E**levation (yükseltme).
- **Kas krampı:** Kası nazikçe germe ve sıvı alımı.
- **Burun kanaması:** Baş hafif **öne** eğilir, burun kanatları 10 dakika sıkılır (baş arkaya atılmaz).
- Baş darbesi sonrası baş dönmesi, bulantı ya da bilinç bulanıklığı varsa etkinlik bırakılır ve sağlık kuruluşuna başvurulur.

# Güvenli Spor
Uygun ayakkabı ve kıyafet, yeterli sıvı alımı (özellikle sıcak havada), koruyucu ekipman (kask, dizlik), uygun zemin ve öğretmen gözetimi.

# Fair Play (Dürüst Oyun)
Kurallara uymak, rakibe, hakeme ve seyirciye **saygı** göstermek, kazanırken alçakgönüllü, kaybederken olgun olmak, **doping** gibi haksız yollara başvurmamaktır. Sporun karakter eğitimi ve **takım çalışması** boyutu, sonucu kadar önemlidir.

# Türklerde Spor
Atlı okçuluk, cirit, güreş ve **yağlı güreş** (Kırkpınar, dünyanın en eski düzenli spor organizasyonlarından), okçuluk (Okmeydanı) geleneksel Türk sporlarıdır. Türkiye ilk kez **1912 Stockholm** Olimpiyatlarına (Osmanlı) katıldı.
""",
 [(r"Basketbolda ayak bileğini burkan bir arkadaşınıza hemen ne uygularsınız?", r"**RICE**: oyunu bırakıp dinlendirir, bez üzerinden **buz** uygular, **bandajla** hafif baskı yapar ve ayağı **yukarı kaldırırım**; ağrı ve şişlik artarsa sağlık kuruluşuna başvurulur."),
  (r"Fair play neden yalnızca kurallara uymaktan daha geniş bir kavramdır?", r"Kurallara uymanın yanında **rakibe, hakeme ve seyirciye saygıyı**, haksız avantajdan kaçınmayı ve kazanma–kaybetme olgunluğunu da kapsar.")],
 [r"Burkulma ve zorlanmalarda ilk 48 saat RICE uygulanır.", r"Burun kanamasında baş öne eğilir.", r"Fair play: kurallara uyma + saygı + dürüstlük.", r"Yağlı güreş (Kırkpınar) köklü bir Türk sporudur."]),
]),
]

gorsel = [
U("u1", "1. Ünite: Sanatın Dili", "Unit 1: The Language of Art", [
O("k1", "GSA.E1", "Sanatın elemanları ve tasarım ilkeleri", "Elements of art and principles of design", r"""
# Sanatın Elemanları
Bir sanat eserini oluşturan temel yapı taşlarıdır.
- **Nokta ve çizgi:** Çizgi yön, hareket ve duygu taşır (dikey: denge, yükseklik; yatay: durgunluk; eğik: hareket).
- **Biçim (şekil) ve form:** Biçim iki boyutlu, form üç boyutludur.
- **Renk:** Ana renkler (kırmızı, sarı, mavi), ara renkler (turuncu, yeşil, mor); **sıcak** (kırmızı, sarı, turuncu) ve **soğuk** renkler (mavi, yeşil, mor); **tamamlayıcı (zıt)** renkler renk çemberinde karşılıklıdır (kırmızı–yeşil, mavi–turuncu, sarı–mor).
- **Değer (ton):** Açıklık–koyuluk; ışık–gölge ile hacim etkisi verilir.
- **Doku:** Yüzeyin gerçek ya da görsel pürüzlülüğü.
- **Mekân (boşluk):** Perspektif ile derinlik yanılsaması oluşturulur.

# Tasarım İlkeleri
**Denge** (simetrik ya da asimetrik), **vurgu** (odak noktası), **ritim ve tekrar**, **oran–orantı**, **birlik (bütünlük)**, **zıtlık (kontrast)**, **çeşitlilik**. İyi bir kompozisyon, elemanların bu ilkelere göre düzenlenmesiyle oluşur.

# Perspektif
- **Tek kaçış noktalı:** Uzaklaşan paralel çizgiler ufuk çizgisindeki tek noktada birleşir (uzayan yol, koridor).
- **İki kaçış noktalı:** Köşeden görülen binalar.
- **Renk (hava) perspektifi:** Uzaktaki nesneler daha soluk ve mavimsi görünür.
""",
 [(r"Kırmızının tamamlayıcı rengi nedir? Bu iki renk yan yana kullanıldığında nasıl bir etki oluşur?", r"**Yeşil**. Yan yana kullanıldıklarında birbirini **daha canlı** gösterir ve güçlü bir **zıtlık (kontrast)** oluşturur."),
  (r"Bir resimde uzaktaki dağların soluk mavimsi çizilmesi hangi tekniktir?", r"**Renk (hava) perspektifi**.")],
 [r"Sanatın elemanları: nokta, çizgi, biçim, form, renk, değer, doku, mekân.", r"Tamamlayıcı renkler renk çemberinde karşılıklıdır.",
  r"Tasarım ilkeleri: denge, vurgu, ritim, oran, birlik, zıtlık.", r"Perspektif derinlik yanılsaması oluşturur."]),
O("k2", "GSA.E2", "Sanat akımları ve Türk sanatından örnekler", "Art movements and examples from Turkish art", r"""
# Başlıca Sanat Akımları
| Akım | Dönem | Özellik | Temsilci |
|---|---|---|---|
| **Rönesans** | 15–16. yy | İnsan merkezli, perspektif, anatomi | Leonardo da Vinci, Michelangelo |
| **Barok** | 17. yy | Hareket, ışık–gölge zıtlığı, dram | Rembrandt, Caravaggio |
| **Romantizm** | 19. yy başı | Duygu, doğa, hayal gücü | Delacroix |
| **Realizm** | 19. yy ortası | Günlük yaşam ve emekçiler, olduğu gibi | Courbet |
| **Empresyonizm** | 19. yy sonu | Işığın anlık etkisi, açık havada resim, kısa fırça darbeleri | Monet, Renoir |
| **Kübizm** | 20. yy başı | Nesneyi geometrik parçalara ayırma, çok bakış açısı | Picasso, Braque |
| **Sürrealizm** | 20. yy | Bilinçaltı, rüya | Dalí, Magritte |
| **Soyut sanat** | 20. yy | Gerçek nesneyi betimlemeden biçim ve renk | Kandinsky |

# Türk Sanatı
- **Geleneksel sanatlar:** **Hat** (güzel yazı), **tezhip** (altınla süsleme), **ebru** (su üzerinde boya ile desen; UNESCO listesinde), **minyatür** (perspektifsiz, iki boyutlu, anlatımcı resim — Matrakçı Nasuh, Levnî), **çini**, halı-kilim.
- **Türk resmi:** **Osman Hamdi Bey** (Kaplumbağa Terbiyecisi; ilk arkeoloji müzesi), **Şeker Ahmet Paşa**, **İbrahim Çallı** (Çallı Kuşağı, Türk empresyonistleri), **Fikret Mualla**, **Bedri Rahmi Eyüboğlu** (halk motifleri), **Nejad Devrim** (soyut).
""",
 [(r"Işığın gün içindeki değişimini aynı motifi farklı saatlerde resmederek yakalamaya çalışan akım hangisidir?", r"**Empresyonizm (izlenimcilik)**; örneğin Monet'nin aynı katedrali farklı saatlerde resmettiği dizi."),
  (r"Perspektif kullanılmayan, iki boyutlu ve anlatımcı geleneksel resim sanatımız hangisidir?", r"**Minyatür** (temsilcileri Matrakçı Nasuh, Levnî).")],
 [r"Rönesans insan merkezli ve perspektifli; empresyonizm ışığın anlık etkisi; kübizm geometrik parçalama; sürrealizm bilinçaltı.",
  r"Geleneksel Türk sanatları: hat, tezhip, ebru, minyatür, çini.", r"Osman Hamdi Bey, İbrahim Çallı, Bedri Rahmi Eyüboğlu Türk resminin önemli adlarıdır."]),
]),
]

muzik = [
U("u1", "1. Ünite: Müziğin Temelleri", "Unit 1: Fundamentals of Music", [
O("k1", "MÜZ.E1", "Ses, nota, ritim ve ölçü", "Sound, notation, rhythm and metre", r"""
# Müzikal Sesin Özellikleri
- **Yükseklik (perde):** Frekansla ilgilidir; ince–kalın ses.
- **Süre:** Sesin ne kadar devam ettiği.
- **Gürlük:** Genlikle ilgilidir; *p* (piyano, hafif), *f* (forte, kuvvetli), *crescendo* (giderek güçlenen).
- **Tını:** Aynı notayı farklı çalgıların farklı duyurmasını sağlayan renk.

# Nota ve Porte
Notalar **porte** üzerindeki beş çizgi ve dört araya yazılır. Sol anahtarında do'dan si'ye: **do, re, mi, fa, sol, la, si**.
| Nota | Süre (dört dörtlükte vuruş) |
|---|---|
| Birlik | 4 |
| İkilik | 2 |
| Dörtlük | 1 |
| Sekizlik | 1/2 |
| Onaltılık | 1/4 |
- Notanın yanındaki **nokta** süresini yarısı kadar uzatır. Her notanın aynı süreli **susu** işareti vardır.
- **Diyez (♯)** sesi yarım ses inceltir, **bemol (♭)** yarım ses kalınlaştırır, **natürel (♮)** etkiyi kaldırır.

# Ölçü ve Ritim
**Ölçü sayısı** (ör. 4/4) bir ölçüde kaç vuruş olduğunu ve hangi notanın bir vuruş sayıldığını gösterir. **Tempo** hızdır (*adagio* yavaş, *allegro* hızlı). Türk müziğinde ritim kalıplarına **usul** denir (ör. sofyan 4/4, aksak 9/8).
""",
 [(r"4/4'lük ölçüde bir ölçüyü tamamlamak için kaç tane sekizlik nota gerekir?", r"Bir sekizlik yarım vuruştur; 4 vuruş için **8 sekizlik** gerekir."),
  (r"Noktalı ikilik nota kaç vuruş sürer?", r"İkilik 2 vuruş + nokta (yarısı, 1 vuruş) = **3 vuruş**.")],
 [r"Sesin özellikleri: yükseklik, süre, gürlük, tını.", r"Birlik 4, ikilik 2, dörtlük 1, sekizlik ½ vuruş; nokta süreyi yarısı kadar uzatır.",
  r"Diyez inceltir, bemol kalınlaştırır.", r"Türk müziğinde ritim kalıplarına usul denir; aksak 9/8 yaygındır."]),
O("k2", "MÜZ.E2", "Türk müziği türleri, çalgılar ve önemli besteciler", "Genres of Turkish music, instruments and composers", r"""
# Türk Müziğinin Türleri
- **Türk halk müziği:** Anonim ve âşık geleneği; **türkü**, **uzun hava** (bozlak, gurbet havası — serbest ritimli), **kırık hava** (belirli ritimli, oyun havaları: zeybek, horon, halay). Çalgılar: **bağlama (saz)**, kaval, zurna, davul, kemençe (Karadeniz).
- **Türk sanat (klasik) müziği:** **Makam** (ses dizisi ve seyir kuralları: rast, hicaz, uşşak…) ve **usul** sistemine dayanır. Çalgılar: **ud, ney, kanun, tanbur, klasik kemençe**. Besteciler: **Itrî**, **Dede Efendi**, **Hacı Arif Bey**.
- **Mehter müziği:** Osmanlı askerî müziği; davul, zurna, kös, zil. Dünyanın bilinen en eski askerî bandolarından biridir ve Batı'da "alla turca" etkisini doğurmuştur (Mozart'ın Türk Marşı).
- **Çok sesli Türk müziği:** Cumhuriyet döneminde gelişti. **Türk Beşleri:** Cemal Reşit Rey, Ulvi Cemal Erkin, Ahmet Adnan Saygun (Yunus Emre Oratoryosu), Hasan Ferit Alnar, Necil Kâzım Akses.

# Batı Müziği Dönemleri (Özet)
Barok (Bach, Vivaldi), Klasik (Mozart, Haydn, erken Beethoven), Romantik (Chopin, Çaykovski). Çalgı aileleri: **yaylı**, **nefesli** (tahta ve bakır), **vurmalı**, **tuşlu**.

# İstiklâl Marşı
Sözleri **Mehmet Âkif Ersoy**'a (12 Mart 1921'de TBMM'de kabul), bugünkü bestesi **Osman Zeki Üngör**'e aittir.
""",
 [(r"Bozlak hangi tür halk müziği ezgisidir?", r"Serbest ritimli **uzun hava** türüdür; Orta ve Güney Anadolu'da yaygındır."),
  (r"Türk Beşleri kimlerdir ve hangi müzik türünde eser vermişlerdir?", r"Cemal Reşit Rey, Ulvi Cemal Erkin, Ahmet Adnan Saygun, Hasan Ferit Alnar, Necil Kâzım Akses; **çok sesli (Batı tekniğiyle) Türk müziği**.")],
 [r"Halk müziği: türkü, uzun hava (serbest ritim), kırık hava (belirli ritim); bağlama.", r"Sanat müziği makam ve usule dayanır; ud, ney, kanun, tanbur.",
  r"Mehter Osmanlı askerî müziğidir.", r"İstiklâl Marşı: söz Mehmet Âkif Ersoy, beste Osman Zeki Üngör."]),
]),
]

NOTE = "KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı."
write("beden-9.js", "9/beden", "9. Sınıf Beden Eğitimi ve Spor — kuramsal konu anlatımı", NOTE, beden)
write("gorsel-9.js", "9/gorsel", "9. Sınıf Görsel Sanatlar — kuramsal konu anlatımı", NOTE, gorsel)
write("muzik-9.js", "9/muzik", "9. Sınıf Müzik — kuramsal konu anlatımı", NOTE, muzik)
