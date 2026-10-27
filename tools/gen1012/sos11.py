# -*- coding: utf-8 -*-
r"""11. Sınıf Sosyoloji (AYT Felsefe grubu) → js/data/content/sos-11.js
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Sosyolojiye Giriş", "Unit 1: Introduction to Sociology", [
O("k1", "SOS.E1", "Sosyolojinin konusu, doğuşu ve öncüleri", "Subject, birth and pioneers of sociology", r"""
# Sosyoloji Nedir?
Sosyoloji, **toplumsal ilişkileri, grupları, kurumları ve toplumsal olayları** bilimsel yöntemle inceleyen bilimdir. Bireyi tek başına değil, **toplum içindeki etkileşimleriyle** ele alır. Psikoloji bireyin iç süreçlerine, sosyoloji ise toplumsal yapıya odaklanır.

# Doğuşu
Sosyoloji 19. yüzyılda **Sanayi Devrimi** ve **Fransız İhtilali**'nin yarattığı büyük toplumsal değişmelerin (kentleşme, işçi sınıfı, geleneksel bağların çözülmesi) anlaşılma ihtiyacıyla doğdu.
- **İbn Haldun** (14. yy), *Mukaddime*'de toplumları ve devletlerin yükselip çöküşünü **asabiyet** (toplumsal dayanışma) kavramıyla açıklayarak sosyolojinin öncülerinden sayılır.
- **Auguste Comte** "sosyoloji" adını koydu; **pozitivizmi** savundu (toplum da doğa gibi gözlem ve deneyle incelenmelidir). **Üç hâl yasası:** teolojik → metafizik → pozitif.

# Klasik Kuramcılar
| Düşünür | Ana fikir |
|---|---|
| **Émile Durkheim** | **Toplumsal olgular** bireyin dışında ve onu bağlayıcıdır; mekanik ve organik dayanışma; intihar araştırması |
| **Karl Marx** | Toplumsal değişmenin itici gücü ekonomik yapı ve **sınıf çatışmasıdır** |
| **Max Weber** | Toplumsal eylemi **anlamaya** çalışmak (anlayıcı sosyoloji); bürokrasi, Protestan ahlakı ve kapitalizm |
| **Ziya Gökalp** | Türk sosyolojisinin kurucusu; **hars (kültür) ve medeniyet** ayrımı |

# Yöntemler
Anket, görüşme, gözlem (katılımlı/katılımsız), örnek olay, istatistiksel veriler ve **karşılaştırmalı** yöntem. Toplumsal olaylar çok etkenli olduğundan laboratuvar deneyi sınırlıdır.
""",
 [(r"“Toplumsal olgular bireyin dışında var olur ve onu zorlayıcı bir güç uygular” görüşü hangi düşünüre aittir?",
   r"**Émile Durkheim**."),
  (r"Sosyolojinin 19. yüzyılda ayrı bir bilim olarak doğmasının temel nedeni nedir?",
   r"Sanayi Devrimi ve Fransız İhtilali'nin yol açtığı **hızlı ve köklü toplumsal değişmeleri** anlama ve açıklama ihtiyacı.")],
 [r"Sosyoloji toplumsal ilişkileri, grupları ve kurumları inceler.", r"Comte adı koydu (pozitivizm); İbn Haldun öncüdür (asabiyet).",
  r"Durkheim: toplumsal olgu; Marx: sınıf çatışması; Weber: anlayıcı sosyoloji.", r"Ziya Gökalp: hars–medeniyet ayrımı."]),
]),
U("u2", "2. Ünite: Birey ve Toplum", "Unit 2: Individual and Society", [
O("k1", "SOS.E2", "Toplumsal etkileşim, statü, rol ve gruplar", "Social interaction, status, role and groups", r"""
# Toplumsal Etkileşim ve İlişki
İnsanların karşılıklı olarak birbirini etkilemesine **toplumsal etkileşim**, bu etkileşimin belirli bir süreklilik kazanmasına **toplumsal ilişki** denir. İlişki türleri: **iş birliği**, **yarışma (rekabet)**, **çatışma**, **uyum**.

# Statü ve Rol
- **Statü:** Bireyin toplumda bulunduğu konum (öğrenci, anne, doktor).
  - **Verilmiş (doğuştan) statü:** Cinsiyet, yaş, akrabalık (kardeş, torun).
  - **Kazanılmış statü:** Bireyin çabasıyla elde edilen (öğretmen, sporcu, mezun).
- **Rol:** Statünün gerektirdiği, toplumca beklenen davranışlar.
- **Rol çatışması:** Aynı kişinin farklı statülerinin beklentileri çeliştiğinde (hem öğrenci hem kulüp sporcusu olup sınav ile maç günü aynı olan genç).

# Toplumsal Gruplar
Ortak amaç ve kimlik duygusuyla, belirli bir süreklilik içinde etkileşen insan topluluğudur.
| Birincil grup | İkincil grup |
|---|---|
| Küçük, yüz yüze, samimi ve duygusal ilişkiler | Büyük, resmî, amaca yönelik ilişkiler |
| Aile, yakın arkadaş grubu | Okul yönetimi, şirket, sendika |
- **Kalabalık (topluluk)** grup değildir: maç seyircisi, otobüs bekleyenler; aralarında kalıcı ilişki yoktur.
- **Referans grubu:** Bireyin üyesi olmasa bile kendini kıyasladığı ve örnek aldığı grup.
""",
 [(r"“Doktor” statüsü verilmiş mi kazanılmış mı bir statüdür? “Torun” statüsü nedir?",
   r"Doktorluk eğitim ve çabayla elde edildiği için **kazanılmış**, torunluk doğuştan geldiği için **verilmiş** statüdür."),
  (r"Hem anne hem hemşire olan bir kadının, çocuğu hastalandığı gün nöbete çağrılması hangi kavramı örnekler?",
   r"**Rol çatışması**: farklı statülerin (anne ve hemşire) beklentileri aynı anda çelişiyor.")],
 [r"Statü toplumsal konum, rol o konumdan beklenen davranıştır.", r"Verilmiş statü doğuştan, kazanılmış statü çabayla edinilir.",
  r"Birincil gruplar samimi ve yüz yüze, ikincil gruplar resmî ve amaca yöneliktir.", r"Kalabalık bir toplumsal grup değildir."]),
O("k2", "SOS.E3", "Sosyalleşme, toplumsal kontrol ve sapma", "Socialisation, social control and deviance", r"""
# Sosyalleşme
Bireyin içinde yaşadığı toplumun değerlerini, normlarını ve rollerini **öğrenerek** toplumun bir üyesi hâline gelmesi sürecidir; ömür boyu sürer.
- **Birincil sosyalleşme:** Çocuklukta, ağırlıklı olarak **ailede**; dil, temel değerler.
- **İkincil sosyalleşme:** Okul, arkadaş grubu, iş yeri ve kitle iletişim araçlarıyla.
- **Sosyalleşme araçları:** Aile, okul, akran grubu, medya ve sosyal medya, din kurumları.
- **Yeniden sosyalleşme:** Yeni bir ortama (askerlik, göç, emeklilik) uyum için eski davranışların değiştirilmesi.

# Toplumsal Normlar ve Kontrol
- **Norm:** Toplumun beklediği davranış kuralları. Gelenek, görenek, örf, âdet, ahlak, hukuk, moda.
- **Toplumsal kontrol:** Bireylerin normlara uymasını sağlayan mekanizmalar.
  - **Resmî (formal) kontrol:** Yazılı hukuk kuralları, polis, mahkeme, okul yönetmeliği.
  - **Gayriresmî (informal) kontrol:** Ayıplama, dışlama, övgü, dedikodu.
- **Yaptırım:** Normlara uyanı ödüllendirme, uymayanı cezalandırma.

# Toplumsal Sapma
Toplumun normlarından ayrılan davranıştır. Sapmanın tanımı zamana ve topluma göre değişir; her sapma suç değildir (ör. aşırı farklı giyinmek). Durkheim'a göre makul düzeyde sapma, normların sınırlarını belirginleştirerek toplumsal değişmeye katkı da sağlayabilir.
""",
 [(r"Toplu taşımada yaşlıya yer vermeyen gence diğer yolcuların ayıplayarak bakması hangi kontrol türüdür?",
   r"**Gayriresmî toplumsal kontrol** (yazılı olmayan, kınama yoluyla yaptırım)."),
  (r"Başka bir ülkeye göç eden ailenin yeni ülkenin dilini ve kurallarını öğrenmesi hangi süreçtir?",
   r"**Yeniden sosyalleşme**.")],
 [r"Sosyalleşme: toplumun değer ve normlarını öğrenme; ömür boyu sürer.", r"Birincil sosyalleşme ailede, ikincil sosyalleşme okul ve diğer kurumlarda.",
  r"Resmî kontrol hukuk ve kurumlarla, gayriresmî kontrol ayıplama ve övgüyle sağlanır.", r"Her sapma suç değildir; sapmanın tanımı topluma göre değişir."]),
]),
U("u3", "3. Ünite: Toplumsal Yapı ve Kurumlar", "Unit 3: Social Structure and Institutions", [
O("k1", "SOS.E4", "Toplumsal yapı ve temel toplumsal kurumlar", "Social structure and basic social institutions", r"""
# Toplumsal Yapı
Bir toplumu oluşturan statüler, roller, gruplar ve kurumların birbirine bağlı **görece kalıcı düzenidir**. Bir öğedeki değişme diğerlerini de etkiler.

# Toplumsal Kurumlar
Toplumun temel ihtiyaçlarını karşılamak için oluşmuş, kuralları belirli, **süreklilik gösteren** yapılardır.
| Kurum | Temel işlevi |
|---|---|
| **Aile** | Neslin devamı, çocuğun bakımı ve birincil sosyalleşme, duygusal destek |
| **Eğitim** | Bilgi ve kültürün aktarılması, meslek kazandırma, toplumsal hareketlilik |
| **Ekonomi** | Üretim, dağıtım ve tüketimin düzenlenmesi |
| **Siyaset (devlet)** | Düzen ve güvenlik, kuralların konulması ve uygulanması |
| **Din** | Anlam ve değer sistemi sunma, toplumsal bütünleşme |

# Aile Türleri ve Değişim
- **Geniş aile:** Birden çok kuşağın bir arada yaşadığı, tarım toplumlarında yaygın aile.
- **Çekirdek aile:** Anne, baba ve evlenmemiş çocuklar; sanayileşme ve kentleşmeyle yaygınlaşmıştır.
- Sanayileşmeyle ailenin bazı işlevleri (eğitim, üretim, sağlık) **başka kurumlara** devredilmiştir.

# Toplumsal Tabakalaşma ve Hareketlilik
Toplumun gelir, eğitim, meslek ve saygınlık bakımından katmanlara ayrılmasıdır. **Dikey hareketlilik** statünün yükselmesi ya da düşmesi (eğitim yoluyla yükselme), **yatay hareketlilik** aynı düzeyde yer değiştirmedir.
""",
 [(r"Sanayileşmeyle ailenin hangi işlevleri başka kurumlara geçmiştir?",
   r"Eğitim (okullar), üretim (fabrikalar, iş yerleri), sağlık ve yaşlı bakımı (hastaneler, bakım kurumları) gibi işlevler büyük ölçüde başka kurumlara devredilmiştir."),
  (r"Köyde çiftçilik yapan bir ailenin çocuğunun üniversiteyi bitirip mühendis olması hangi kavramı örnekler?",
   r"**Dikey (yukarı doğru) toplumsal hareketlilik**; eğitim kurumu bu hareketliliğin başlıca aracıdır.")],
 [r"Toplumsal yapı: statü, rol, grup ve kurumların görece kalıcı düzeni.", r"Temel kurumlar: aile, eğitim, ekonomi, siyaset, din.",
  r"Kentleşmeyle geniş aileden çekirdek aileye geçiş hızlanmıştır.", r"Dikey hareketlilik statünün değişmesi, yatay hareketlilik aynı düzeyde yer değiştirmedir."]),
]),
U("u4", "4. Ünite: Kültür ve Toplumsal Değişme", "Unit 4: Culture and Social Change", [
O("k1", "SOS.E5", "Kültür: öğeleri, özellikleri ve kültürel süreçler", "Culture: elements, features and cultural processes", r"""
# Kültür
Bir toplumun yaşayış biçimi; tarihsel süreçte oluşturduğu **maddi ve manevi** değerlerin bütünüdür.
- **Maddi kültür:** Araç gereç, yapı, giysi, teknoloji.
- **Manevi kültür:** Dil, din, gelenek, değer, sanat, inanç.

# Özellikleri
Kültür **öğrenilir** (doğuştan gelmez), **toplumsaldır**, kuşaktan kuşağa **aktarılır**, **değişir**, ihtiyaçları karşılar ve toplumu bütünleştirir.

# Kültürel Süreçler
| Kavram | Anlamı |
|---|---|
| **Kültürleşme** | Kültürlerin karşılıklı etkileşimle değişmesi |
| **Kültürel yayılma** | Bir kültür öğesinin başka toplumlara geçmesi |
| **Kültürlenme** | Bireyin kendi kültürünü öğrenmesi |
| **Kültür şoku** | Farklı bir kültürle karşılaşınca yaşanan uyumsuzluk ve şaşkınlık |
| **Kültürel gecikme (Ogburn)** | Maddi kültürün manevi kültürden **hızlı** değişmesiyle oluşan uyumsuzluk (teknoloji hızlı değişir, kurallar geride kalır) |
| **Asimilasyon** | Bir kültürün başka bir kültür içinde kendi özelliklerini yitirerek erimesi |
| **Etnosentrizm** | Kendi kültürünü üstün görüp diğerlerini onun ölçütleriyle değerlendirme |
| **Kültürel görecelik** | Her kültürü kendi koşulları içinde anlamaya çalışmak |

# Alt Kültür
Toplumun genel kültürü içinde yer alan ama kendine özgü özellikleri olan kültür (gençlik kültürü, bölgesel yemek kültürleri).
""",
 [(r"Sosyal medyanın çok hızlı yaygınlaşmasına karşın kişisel verilerin korunmasına yönelik kuralların geç oluşması hangi kavramla açıklanır?",
   r"**Kültürel gecikme**: maddi kültür (teknoloji) manevi kültürden (kurallar, değerler) hızlı değişmiştir."),
  (r"Yurt dışına öğrenim için giden bir gencin ilk aylarda yeni ülkenin yaşam biçimine uyum sağlamakta zorlanması nedir?",
   r"**Kültür şoku**.")],
 [r"Kültür maddi ve manevi öğelerden oluşur; öğrenilir ve aktarılır.", r"Kültürleşme etkileşimle değişme, kültürlenme bireyin kendi kültürünü öğrenmesidir.",
  r"Kültürel gecikme: maddi kültürün manevi kültürden hızlı değişmesi.", r"Etnosentrizm kendi kültürünü üstün görmek, kültürel görecelik her kültürü kendi bağlamında anlamaktır."]),
O("k2", "SOS.E6", "Toplumsal değişme, kentleşme ve küreselleşme", "Social change, urbanisation and globalisation", r"""
# Toplumsal Değişme
Toplumsal yapıda, kurumlarda ve ilişkilerde zaman içinde oluşan farklılaşmadır.
**Etkenleri:** Teknolojik gelişmeler, ekonomik değişmeler, nüfus hareketleri (göç), eğitim, savaşlar ve doğal afetler, iletişim ve kültürel etkileşim, siyasi kararlar ve reformlar.

# Değişmeyi Açıklayan Yaklaşımlar
- **Evrimci yaklaşım** (Comte, Spencer): Toplumlar basitten karmaşığa doğru aşamalarla gelişir.
- **Döngüsel yaklaşım** (İbn Haldun): Toplumlar doğar, gelişir, çöker; süreç tekrar eder.
- **Çatışmacı yaklaşım** (Marx): Değişmenin kaynağı çıkar çatışmalarıdır.
- **İşlevselci yaklaşım** (Durkheim, Parsons): Toplum dengeye yönelir; değişme yeni dengeye ulaşma sürecidir.

# Kentleşme
Sanayileşmeyle kırdan kente göç ve kent nüfusunun artmasıdır. Sonuçları: çekirdek ailenin yaygınlaşması, ikincil ilişkilerin artması, iş bölümü ve uzmanlaşma; plansız kentleşmede gecekondulaşma, altyapı ve trafik sorunları.

# Küreselleşme
Ekonomik, kültürel, siyasi ve teknolojik ilişkilerin dünya ölçeğinde yoğunlaşmasıdır. **İnternet, uluslararası ticaret ve ulaşım** hızlandırıcıdır.
- Olumlu yanları: bilgiye erişim, bilimsel iş birliği, kültürel tanışma.
- Tartışılan yanları: yerel kültürlerin tek tipleşme (**kültürel homojenleşme**) tehlikesi, gelir eşitsizliği, çevre sorunları. Buna karşılık yerel kimliklere ilgi de artabilir (**yerelleşme**).
""",
 [(r"“Toplumlar insanlar gibi doğar, büyür, yaşlanır ve ölür” görüşü hangi değişme yaklaşımına aittir? Temsilcisi kimdir?",
   r"**Döngüsel yaklaşım**; temsilcisi **İbn Haldun**."),
  (r"Dünyanın farklı ülkelerinde aynı dizilerin izlenmesi ve aynı moda akımlarının yaygınlaşması hangi kavramla ilgilidir?",
   r"**Küreselleşme** (ve onun sonucu olarak kültürel homojenleşme eğilimi).")],
 [r"Değişme etkenleri: teknoloji, ekonomi, göç, eğitim, iletişim, savaş ve afetler.", r"Yaklaşımlar: evrimci, döngüsel (İbn Haldun), çatışmacı (Marx), işlevselci.",
  r"Kentleşme çekirdek aileyi ve ikincil ilişkileri yaygınlaştırır.", r"Küreselleşme hem etkileşimi hem tek tipleşme tartışmalarını beraberinde getirir."]),
]),
]

write("sos-11.js", "11/sosyoloji", "11. Sınıf Sosyoloji — konu anlatım notları (AYT Felsefe grubu)",
      "KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.", units)
