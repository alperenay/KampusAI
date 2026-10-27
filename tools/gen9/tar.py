# -*- coding: utf-8 -*-
"""9. Sınıf Tarih Kazanım Konu Anlatım Notları → js/data/content/tar-9.js"""
from common import O, U, write

units = []

# ---------------------------------------------------------------- 1. ÜNİTE
units.append(U("u1", "1. Ünite: Geçmişin İnşa Sürecinde Tarih", "Unit 1: History in the Construction of the Past", [
O("k1", "1.1",
  "Tarih öğrenmenin faydaları",
  "The benefits of learning history",
  r"""
# Tarih Öğrenmenin Faydaları

| Fayda | Açıklama |
|---|---|
| **Millî bilinç ve aidiyet** | Tarih bilinci milletin birliğinden, ortak duygularından ve geçmişteki mücadelelerinden beslenir; vatan ve bayrak sevgisi, bağımsızlık, cesaret ve dayanışmayı geliştirir. |
| **Toplumsal hafıza** | Bireyin hafızası ne kadar önemliyse toplumun geçmişini bilmesi de o kadar hayatidir. Geçmişini bilmeyen toplum **kimliğini kaybeder**, süreklilik sağlayamaz. |
| **Geleceğe yön verme** | Geçmiş olayların **neden ve sonuçları** incelenerek geleceğe dair öngörülerde bulunulur, benzer hataların tekrarı önlenir. |
| **Çok yönlü düşünme ve empati** | Olayları tek taraflı değerlendirmemeyi, **o günün şartlarına** (siyasi, sosyal, ekonomik) göre incelemeyi, sorgulamayı ve empati kurmayı öğretir. |
| **Kültürel mirasa sahip çıkma** | Tarihî eserlerin ve arkeolojik buluntuların korunması, yurt dışına kaçırılan eserlerin (ör. **Karun hazineleri**, **Çingene Kızı mozaiği** parçaları) geri getirilmesi ulusal bir ödevdir. |

> Atatürk: *"Türk çocuğu ecdadını tanıdıkça daha büyük işler yapmak için kendinde kuvvet bulacaktır."*

### Dikkat: "O günün şartlarına göre değerlendirme"
Geçmişteki bir olayı bugünün değer yargılarıyla yargılamak **anakronizm** (zaman yanılgısı) hatasıdır. Tarihçi olayı kendi dönemi içinde anlamaya çalışır.
""",
  [("Bir öğrenci, Orta Çağ'daki bir hükümdarın kararını \"Bugünkü insan hakları anlayışına uymuyor, o hâlde tamamen yanlıştı\" diye değerlendiriyor. Bu değerlendirmedeki hata nedir?",
    "Olayı **o günün şartlarına göre değil**, bugünün değer yargılarıyla değerlendirmiş → **anakronizm** hatası. Tarih öğrenmek olayları kendi dönemi içinde, çok yönlü değerlendirmeyi gerektirir."),
   ("Yurt dışına kaçırılan tarihî eserlerin geri getirilmesi tarih öğrenmenin hangi faydasıyla ilgilidir?",
    "**Kültürel mirasa sahip çıkma** (ve toplumsal hafızanın korunması).")],
  ["Faydalar: millî bilinç, toplumsal hafıza, geleceğe yön verme, çok yönlü düşünme/empati, kültürel mirası koruma.",
   "Olaylar o günün şartlarına göre değerlendirilir (anakronizmden kaçınılır).",
   "Geçmişini bilmeyen toplum kimliğini kaybeder."]),

O("k2", "1.2",
  "Tarihin doğası: konu, unsurlar ve temel kavramlar",
  "The nature of history: subject, elements and key concepts",
  r"""
# Tarihin Konusu

Tarihin temel konusu **insandır**: insanların geçmişteki faaliyetleri, toplumsal değişimler, ekonomik ve kültürel koşullar. Astronomi veya yanardağ püskürmesi gibi doğa olayları **insana doğrudan bağlı olmadığı sürece** tarihin alanı dışındadır.

# Tarihsel Bilginin Temel Unsurları

1. **İnsan** — geçmişten bugüne insan faaliyetleri
2. **Kaynak** — geçmiş olayların izlerini taşıyan eşya, mimari yapı, yazılı belgeler
3. **Tarihçi** — kaynakları yöntemle inceleyen, sorgulayan ve yorumlayan kişi

# Tarih ile Fen Bilimleri Arasındaki Farklar

| Fen bilimleri | Tarih |
|---|---|
| Olaylar laboratuvarda **tekrarlanabilir** | Tarihsel olaylar **tekrar gözlemlenemez**, laboratuvarda yinelenemez |
| **Kesin yasalara** dayanır (ör. kütle çekim yasası) | **Belgelere dayalı çıkarım ve yorumlara** dayanır |
| Deney ve gözlem | Kaynak inceleme ve eleştiri |
| — | Yeni belgeler bulundukça bilgi **değişebilir** |

# Temel Kavramlar

| Kavram | Tanım | Örnek |
|---|---|---|
| **Olay** | Belirli bir zamanda, **kısa sürede** meydana gelen **somut ve özel** gelişme | Malazgirt Savaşı, İstanbul'un Fethi |
| **Olgu** | Bir olaydan sonra başlayan **uzun süreli, soyut ve genel** süreç | Anadolu'nun Türkleşmesi, Sanayi Devrimi |
| **Kronoloji** | Olayların **zaman sırasına** konulması | — |
| **Değişim ve süreklilik** | Toplumların nasıl değiştiği ve neyin sürdüğü | Dil ve geleneklerin süregelmesi |
""",
  [("\"Malazgirt Savaşı\" ile \"Anadolu'nun Türkleşmesi\" arasındaki fark nedir?",
    "Malazgirt Savaşı (1071) belirli bir tarihte kısa sürede gerçekleşen **somut bir olaydır**. Anadolu'nun Türkleşmesi ise bu savaştan sonra başlayan, **uzun süreli ve soyut** bir süreçtir → **olgu**."),
   ("Tarihsel bilgi neden fen bilimlerindeki yasalar gibi kesin değildir?",
    "Tarihsel olaylar **tekrarlanamaz** ve laboratuvarda gözlemlenemez; bilgi **belgelere dayalı yorumlara** dayanır ve **yeni belgeler bulundukça değişebilir**.")],
  ["Tarihin konusu insandır.",
   "Unsurlar: insan, kaynak, tarihçi.",
   "Tarihsel olaylar tekrarlanamaz; bilgi yoruma dayanır ve değişebilir.",
   "Olay = kısa, somut, özel · Olgu = uzun, soyut, genel.",
   "Kronoloji: olayları zaman sırasına koymak."]),

O("k3", "1.3",
  "Tarihsel bilginin üretim süreci ve yardımcı bilimler",
  "How historical knowledge is produced; auxiliary sciences",
  r"""
# Tarihsel Bilginin Üretim Süreci (6 Aşama)

Tarihçi geçmişi aydınlatırken bir dedektif gibi sistematik ve aşamalı bir yöntem izler:

1. **Konu veya sorun belirleme** — konunun **zaman, mekân ve içerik** sınırları belirlenir.
2. **Kaynaklardan bilgi toplama** — kütüphane, arşiv, müze ve dijital ortamlarda **birinci el** (olay tanığı / döneme ait) ve **ikinci el** (sonradan yazılmış) kaynaklar taranır.
3. **Kaynağı inceleme** — kaynağın türü, yazarı, tarihi, dijital kimliği saptanır; çelişki veya ön yargı olup olmadığı tespit edilir.
4. **Kaynağı sorgulama (tenkit)** — kaynak **sınırlılık, geçerlilik ve güvenilirlik** açısından eleştiriye tabi tutulur.
5. **Kaynağı yorumlama** — veriler o dönemin şartları göz önünde bulundurularak eleştirel gözle anlamlandırılır.
6. **Kanıta dayalı ürün oluşturma** — bilgiler özgün bir esere (makale, kitap) dönüştürülür; bilimsel etik gereği **kaynakça/atıf** kullanılır.

### Birinci el – ikinci el kaynak
| Birinci el | İkinci el |
|---|---|
| Olayın tanığı ya da döneme ait | Olaydan sonra, başka kaynaklardan yararlanılarak yazılmış |
| Kitabe, ferman, mektup, sikke, dönemin gazetesi | Tarih kitapları, ansiklopediler, araştırma makaleleri |

# Tarihe Yardımcı Bilimler

| Bilim | Alanı |
|---|---|
| **Arkeoloji** | Kazı bilimi |
| **Paleografi** | Eski yazıları okuma |
| **Epigrafi** | Kitabe (yazıt) bilimi |
| **Nümismatik** | Para (sikke) bilimi |
| **Kronoloji** | Zaman bilimi, takvimler |
| **Filoloji** | Dil bilimi |
| **Kimya** | **Karbon-14** yöntemiyle yaş tespiti |
| **Antropoloji** | İnsanın fiziki ve kültürel özellikleri |
| **Etnografya** | Toplulukların kültürü, gelenekleri |
| **Diplomatik** | Resmî belgelerin biçimi ve özellikleri |
| **Heraldik** | Arma, bayrak, mühür bilimi |
""",
  [("Bir tarihçi, bir fermanın sahte olup olmadığını anlamak için mühür ve yazı biçimini inceliyor. Bu hangi aşamadır ve hangi yardımcı bilimlerden yararlanır?",
    "**Kaynağı sorgulama (tenkit)** aşaması — güvenilirlik kontrolü. Belgenin biçimi için **diplomatik**, yazısı için **paleografi**, mührü için **heraldik**ten yararlanır."),
   ("Bir kazıda bulunan ahşap bir eşyanın yaşı nasıl belirlenir?",
    "**Kimya** bilimindeki **karbon-14** yöntemiyle; kazı çalışması ise **arkeoloji**nin alanıdır.")],
  ["6 aşama: konu belirleme → bilgi toplama → inceleme → sorgulama (tenkit) → yorumlama → ürün (kaynakça).",
   "Birinci el: döneme ait/tanık · İkinci el: sonradan yazılmış.",
   "Epigrafi kitabe, nümismatik para, paleografi eski yazı, heraldik arma-mühür.",
   "Karbon-14 → kimya."]),

O("k4", "1.4",
  "Tarih araştırma ve yazımında dijital dönüşüm",
  "Digital transformation in historical research",
  r"""
# Dijital Tarih

Bilgi işlem teknolojilerinin gelişmesiyle arşiv belgelerinin, yazılı ve görsel kaynakların **dijital ortama aktarılması, taranması ve analiz edilmesidir**.

### Kaynak türleri
| Doğuştan dijital | Sonradan dijitalleştirilmiş |
|---|---|
| E-kitaplar, genel ağ siteleri, e-postalar | Taranarak bilgisayara aktarılan eski belgeler, fotoğraflar |

### Dijital araştırma yöntemleri
- **Büyük veri** ve **veri madenciliği**
- **Coğrafi bilgi sistemleri (CBS)** — ticaret yolları, göçler, savaş alanlarının haritalanması
- **Yapay zekâ** araçları — binlerce belgenin hızla taranması
- **Uzak okuma:** Tek tek metinleri ayrıntılı okumak (**yakın okuma**) yerine binlerce belgeyi birlikte inceleyerek geniş ölçekli **eğilimleri** ve **ilişki ağlarını** (mektup ağları, ticaret yolları) ortaya çıkarmak.

### Etik ve yasal kurallar
Dijitalleşme kolaylık sağlasa da **telif haklarına**, **veri gizliliğine** ve **bilimsel etik** kurallarına uymak zorunludur.
""",
  [("Bir tarihçi, Osmanlı dönemine ait 50.000 tüccar mektubunu yazılımla tarayarak hangi şehirlerin birbiriyle en çok yazıştığını haritalandırıyor. Hangi yöntemi kullanmaktadır?",
    "**Uzak okuma** (büyük veri / veri madenciliği ve CBS ile). Tek tek metinleri okumak yerine geniş ölçekli ilişki ağlarını ortaya çıkarıyor."),
   ("Bir müze kataloğunun web sitesi ile taranarak PDF'e aktarılmış 18. yüzyıl defteri arasındaki fark nedir?",
    "Web sitesi **doğuştan dijital**, taranmış defter ise **sonradan dijitalleştirilmiş** kaynaktır.")],
  ["Dijital tarih: kaynakların dijitale aktarılması ve analizi.",
   "Doğuştan dijital ↔ sonradan dijitalleştirilmiş.",
   "Uzak okuma: büyük ölçekli eğilim ve ağları görmek.",
   "Telif, veri gizliliği, bilimsel etik."]),
]))

# ---------------------------------------------------------------- 2. ÜNİTE
units.append(U("u2", "2. Ünite: Eski Çağ Medeniyetleri", "Unit 2: Ancient Civilisations", [
O("k1", "2.1",
  "Tarım Devrimi ve Eski Çağ'a etkileri",
  "The Agricultural Revolution and its effects",
  r"""
# Avcı-Toplayıcı Yaşamdan Yerleşik Hayata

| Çağ | Yaşam |
|---|---|
| **Paleolitik (Eski Taş)** | Mağaralarda yaşam, avcılık ve toplayıcılık |
| **Mezolitik (Orta Taş)** | Avcı-toplayıcılık sürer; geçiş dönemi |
| **Neolitik (Yeni Taş)** | Buzulların erimesi, iklimin yumuşaması → bitki ve hayvanların **evcilleştirilmesi** → **Tarım (Neolitik) Devrimi** |

# Tarım Devrimi'nin Gerçekleştiği Bölgeler

| Bölge | Ürün |
|---|---|
| **Mezopotamya** (Fırat-Dicle arası) | **Buğday ve arpa** |
| **Doğu Asya** (Çin: Sarı Irmak ve Gök Irmak çevresi) | **Pirinç (çeltik)** |
| **Orta Amerika** | Teosinte bitkisinden **mısır** |

# Tarım Devrimi'nin Sonuçları

- Kalıcı köy ve kasabalar kuruldu — Anadolu'da **Çatalhöyük, Aşıklı Höyük, Hacılar**.
- Tarımsal üretim fazlası olan **artı ürün** ortaya çıktı.
- Ürünlerin depolanması, korunması ve nüfus artışıyla **özel mülkiyet**, **sınıflı toplum** ve **takas ekonomisi** doğdu.
- Ürünlerin ve vergilerin kayıt altına alınması ihtiyacı **yazının icadını** tetikledi (**MÖ 3200 — Sümerler**, çivi yazısı).

> Zincir: **evcilleştirme → yerleşik hayat → artı ürün → mülkiyet ve sınıflar → kayıt ihtiyacı → yazı**
""",
  [("Artı ürünün ortaya çıkması hangi sonuçlara yol açmıştır?",
    "Ürünlerin depolanıp korunması gerekti; **özel mülkiyet**, **sınıflı toplum** ve **takas ekonomisi** doğdu; kayıt ihtiyacı da **yazının icadını** hazırladı."),
   ("Çatalhöyük hangi çağın ve hangi gelişmenin Anadolu'daki örneğidir?",
    "**Neolitik (Yeni Taş) Çağ**'ın ve **Tarım Devrimi** ile başlayan **yerleşik hayatın** örneğidir.")],
  ["Neolitik Çağ: evcilleştirme → Tarım Devrimi.",
   "Mezopotamya: buğday-arpa · Çin: pirinç · Orta Amerika: mısır.",
   "Sonuçlar: yerleşik hayat, artı ürün, mülkiyet, sınıflar, takas, yazı.",
   "Yazı: MÖ 3200, Sümerler."]),

O("k2", "2.2",
  "Eski Çağ'da yönetenler ve savaşanlar",
  "Rulers and warriors in the ancient world",
  r"""
# Mezopotamya Medeniyetleri

| Medeniyet | Öne çıkan özellik |
|---|---|
| **Sümerler** | **Site** denilen şehir devletleri (Ur, Uruk, Lagaş); kral **"ensi"/"patesi"** unvanıyla başrahip, başkomutan ve başyargıçtı |
| **Akadlar** | **Sargon** ile ilk merkezî imparatorluk modeli; krallar **"tanrı-kral"** ilan edildi |
| **Asurlular** | Güçlü ordu ve sert yönetim; Anadolu'da **ticaret kolonileri** (Kültepe/Kaniş) kurarak **yazıyı Anadolu'ya getirdiler** |
| **Babilliler** | **Hammurabi** ile merkeziyetçi mutlak krallık |

# Mısır Medeniyeti
- **Nil** çevresinde kuruldu. Kral **firavun**, tanrının yeryüzündeki temsilcisi kabul edilir ve **mutlak** güce sahipti.
- Güçlü merkezî ordu; anıt mezarlar (**piramitler**).

# Anadolu Medeniyetleri

| Medeniyet | Merkez | Öne çıkan özellik |
|---|---|---|
| **Hititler** | Hattuşaş | Krallık; soylulardan oluşan **Pankuş Meclisi**; kral aynı zamanda başrahip ve başkomutan; kraliçe **Tavananna** |
| **Urartular** | Tuşpa (Van) | Güçlü kaleler, su kanalları; dağlık bölge medeniyeti |
| **Frigler** | Gordion | Tarımı ve **sabanı koruyan sert kanunlar** |
| **Lidyalılar** | Sardes | **Parayı icat ettiler**; ticaret ve Kral Yolu'nun batı ucu |

# Avrupa Medeniyetleri
- **Yunan şehir devletleri (polis):** **Atina** (demokrasi, donanma) ve **Sparta** (oligarşi, kara ordusu).
- **Roma:** **Krallık → cumhuriyet → imparatorluk**; güçlü **lejyon** orduları ve geniş yol ağıyla Akdeniz'e hâkim oldu.

# Türkistan (Orta Asya) Medeniyetleri
- **İskitler (Sakalar):** Atı evcilleştirip savaşta etkili kullanan konargöçer topluluk.
- **Asya Hun Devleti:** Türk tarihinin bilinen **ilk teşkilatlı devleti**.
  - Hükümdar unvanları: **şanyü, kağan, han**.
  - Yönetme yetkisinin Tanrı tarafından verildiğine inanılan **kut** anlayışı.
  - **Mete Han:** ordu için **onlu sistem** ve **Turan (hilal/kapan) taktiği**.
""",
  [("Asurluların Anadolu tarihi açısından en önemli katkısı nedir?",
    "Kültepe (Kaniş) gibi **ticaret kolonileri** aracılığıyla **yazıyı Anadolu'ya getirmeleri**; böylece Anadolu'da **tarih çağları** başlamıştır."),
   ("Hükümdarlık yetkisinin Tanrı tarafından verildiği inancı Türklerde hangi kavramla ifade edilir? Mısır'daki karşılığı nedir?",
    "Türklerde **kut** anlayışı. Mısır'da firavun **tanrının yeryüzündeki temsilcisi** sayılır; her ikisinde de yönetim yetkisi ilahi kaynaklı kabul edilir."),
   ("Hititlerdeki Pankuş Meclisi'nin varlığı kralın yetkileri hakkında ne söyler?",
    "Kralın yanında soylulardan oluşan bir meclis bulunması, kralın yetkilerinin **belli ölçüde sınırlandırıldığını** gösterir (mutlak monarşi değildir).")],
  ["Sümer: site, ensi/patesi · Akad: Sargon, ilk imparatorluk · Asur: Kültepe, yazı Anadolu'ya · Babil: Hammurabi.",
   "Mısır: firavun, mutlak güç, piramitler.",
   "Hitit: Hattuşaş, Pankuş · Urartu: Tuşpa · Frig: Gordion, saban kanunu · Lidya: Sardes, para.",
   "Atina demokrasi/donanma · Sparta oligarşi/kara ordusu · Roma: krallık → cumhuriyet → imparatorluk.",
   "Asya Hun: ilk teşkilatlı Türk devleti; kut; Mete Han: onlu sistem, Turan taktiği."]),

O("k3", "2.3",
  "Eski Çağ'da hukuk",
  "Law in the ancient world",
  r"""
# Eski Çağ Hukuk Sistemleri

| Hukuk | Özellik |
|---|---|
| **Urkagina Kanunları** (Lagaş, Sümer) | Bilinen **ilk yazılı kanunlar**; adalet ve hürriyeti sağlama amaçlı |
| **Hammurabi Kanunları** (Babil) | **Kısasa kısas** ilkesi; **sınıf farkına** (soylu–köle) göre değişen ağır cezalar |
| **Hitit hukuku** | İnsan ilişkilerini, tarımı ve evliliği korur; çoğu suçta ölüm yerine **para cezası (tazminat)** |
| **Roma hukuku** | **Patriciler** (soylular) ile **plebler** (halk) arasındaki mücadeleler sonucu bronz levhalara yazılan **12 Levha Kanunları**; modern Avrupa hukukunun temeli |
| **Türk töre hukuku** | **Yazısız** kurallar; kaynağı Gök Tanrı inancı ve **kurultay** kararları; **eşit suça eşit ceza**; konargöçer yaşam nedeniyle uzun süreli **hapis cezası yok**; vatana ihanet gibi ağır suçlar ölümle cezalandırılır |

### Karşılaştırma ipuçları
- **Kısas + sınıf ayrımı** → Hammurabi
- **Tazminat / para cezası** → Hititler
- **Yazısız + eşitlik + hapis yok** → Türk töresi
- **Halkın mücadelesiyle yazılı hâle gelen hukuk** → Roma (12 Levha)
""",
  [("\"Aynı suçu işleyen bir soylu ile bir köleye farklı cezalar verilir.\" Bu ilke hangi hukuk sistemine aittir? Türk töresi bu konuda nasıl farklıdır?",
    "**Hammurabi Kanunları**'na. Türk töresinde ise **eşit suça eşit ceza** ilkesi vardır; ceza kişinin sınıfına göre değişmez."),
   ("Türk töresinde uzun süreli hapis cezası olmamasının sebebi nedir?",
    "Türklerin **konargöçer (göçebe)** yaşam tarzı; sürekli yer değiştiren bir toplumda hapishane gibi kalıcı yapılar kullanışlı değildir.")],
  ["Urkagina: ilk yazılı kanunlar.",
   "Hammurabi: kısasa kısas + sınıf farkı.",
   "Hitit: para cezası (tazminat).",
   "Roma: patrici–pleb mücadelesi → 12 Levha → modern hukukun temeli.",
   "Töre: yazısız, kurultay, eşit suça eşit ceza, hapis yok."]),

O("k4", "2.4",
  "Eski Çağ'da inanç, bilim ve sanat",
  "Belief, science and art in the ancient world",
  r"""
# İnanç Anlayışları

- Eski Çağ medeniyetlerinin çoğunda (Mezopotamya, Mısır, Hitit, Yunan) **çok tanrılı** dinler hâkimdi.
- **Mısır:** Ölümden sonra yaşam inancı → **mumyalama** ve **piramitler**.
- **Hititler:** Pek çok tanrıyı kabul ettikleri için **"bin tanrılı halk"** olarak anılır.
- **Türkler:** **Gök Tanrı** inancı ve ahiret inancının izleri (**uçmağ** = cennet, **tamu** = cehennem); mezarların üzerine **balbal** taşları dikilirdi.

# Bilimsel Gelişmeler

| Medeniyet | Gelişme | Neden |
|---|---|---|
| **Mezopotamya** | Astronomi, **Ay takvimi** | **Zigguratların** gözlemevi olarak kullanılması |
| **Mısır** | Geometri ve matematik | **Nil'in taşma** zamanını hesaplama ve arazi ölçümü ihtiyacı |
| **Mısır** | Tıp ve anatomi | **Mumyalama** |
| **Mısır** | **Güneş takvimi** | Nil taşkınları ve tarım takvimi |

# Sanat ve Mimari

- Tapınaklar, saraylar, anıt mezarlar (**piramitler**)
- Kabartmalar (**steller**, Asur duvar kabartmaları), heykeller (**lamassu**)
- Türklerde halı-kilim dokumacılığı — **Pazırık halısı** (bilinen en eski düğümlü halı)
""",
  [("Mısır'da geometrinin gelişmesinin coğrafi sebebi nedir?",
    "**Nil Nehri'nin taşması.** Taşkınlardan sonra arazi sınırlarının yeniden ölçülmesi ve taşma zamanının hesaplanması ihtiyacı geometri ve matematiği geliştirmiştir."),
   ("Türklerde mezarların üzerine dikilen balbal taşları neyi gösterir?",
    "Türklerde **ölümden sonra yaşam (ahiret) inancının** varlığını gösterir.")],
  ["Çok tanrılı inançlar yaygın; Hititler \"bin tanrılı\".",
   "Mısır: mumyalama → tıp; Nil → geometri; Güneş takvimi.",
   "Mezopotamya: ziggurat → astronomi; Ay takvimi.",
   "Türkler: Gök Tanrı, uçmağ-tamu, balbal, Pazırık halısı."]),
]))

# ---------------------------------------------------------------- 3. ÜNİTE
units.append(U("u3", "3. Ünite: Orta Çağ Medeniyetleri", "Unit 3: Medieval Civilisations", [
O("k1", "3.1",
  "Orta Çağ'daki kitlesel göçler",
  "Mass migrations in the Middle Ages",
  r"""
# Orta Çağ'ın Zaman Aralığı

Orta Çağ, **Kavimler Göçü (375)** / **Batı Roma'nın yıkılışı (476)** ile **İstanbul'un Fethi (1453)** arasındaki dönemi kapsar.

# Kavimler Göçü (375)

Asya içlerinden batıya ilerleyen **Hunların** önünden kaçan **Germen kavimleri** (Ostrogotlar, Vizigotlar, Vandallar vb.) Avrupa içlerine göç etti; büyük bir kitlesel hareket yaşandı.

### Sonuçları
- **Roma İmparatorluğu 395**'te **Doğu** ve **Batı** olarak ikiye ayrıldı.
- **Batı Roma** barbar saldırılarına dayanamayarak **476**'da yıkıldı.
- Avrupa'nın **etnik, siyasi ve demografik** yapısı değişti; günümüz Avrupa milletlerinin temelleri atıldı.
- Merkezî krallıkların zayıflamasıyla **feodalite (derebeylik)** ortaya çıktı.
- **İlk Çağ kapandı, Orta Çağ başladı.**

> Neden–sonuç zinciri: **Hun baskısı → Germen göçü → Roma'nın bölünmesi ve Batı Roma'nın yıkılışı → feodalite**
""",
  [("Kavimler Göçü'nün Avrupa'da feodaliteyi ortaya çıkarmasının nedeni nedir?",
    "Göçler ve saldırılar **merkezî krallıkları zayıflattı**; halk korunmak için güçlü toprak sahiplerinin (senyör/derebeyi) yanına sığındı. Böylece yönetim yerel beylere geçti → **feodalite**."),
   ("Orta Çağ'ın başlangıcı için hangi tarihler kullanılır?",
    "**375** (Kavimler Göçü) veya **476** (Batı Roma'nın yıkılışı). Bitişi **1453** (İstanbul'un Fethi) kabul edilir.")],
  ["Orta Çağ: 375/476 – 1453.",
   "Kavimler Göçü (375): Hun baskısı → Germen kavimlerinin göçü.",
   "395: Roma ikiye ayrıldı · 476: Batı Roma yıkıldı.",
   "Sonuç: Avrupa'nın etnik yapısı değişti, feodalite doğdu."]),

O("k2", "3.2",
  "Orta Çağ'daki siyasi ve askerî gelişmeler",
  "Political and military developments in the Middle Ages",
  r"""
# Bizans İmparatorluğu (Doğu Roma)
- **İstanbul** merkezli, **Ortodoks** mezhebini benimseyen güçlü bir imparatorluk.
- Orta Çağ boyunca Doğu Avrupa ve Balkanlar'da etkili oldu; Sasaniler, İslam orduları ve Türklerle mücadele etti.

# İslamiyet'in Doğuşu ve Yayılışı (7. yüzyıl)
- **Hz. Muhammed** döneminde Arap Yarımadası'nda doğdu.
- **Dört Halife, Emeviler ve Abbasiler** döneminde Asya, Afrika ve **Endülüs** üzerinden İspanya'ya kadar yayıldı.
- Yeni bir **medeniyet havzası** ve siyasi güç oluştu.

# Türklerin Orta Çağ Siyasetindeki Rolü
- Avrasya bozkırlarındaki Türk devletleri (**Göktürkler, Uygurlar** vb.) Çin ve komşularıyla siyasi, askerî ve ekonomik ilişkiler yürüttü.
- **Uygurlar** yerleşik hayata geçerek kendine özgü **kültür, sanat ve hukuk** yapısı oluşturdu.

# Haçlı Seferleri (11.–13. yüzyıl)
- **Papa**'nın çağrısıyla Avrupalıların **Kudüs**'ü almak ve Doğu'nun zenginliklerini ele geçirmek amacıyla Türkler ve İslam dünyası üzerine düzenledikleri seferler.
- **Siyasi olarak başarısız** oldular.
- Ancak Doğu ile Batı arasında **kültürel, ekonomik ve teknik** etkileşime yol açtılar (kâğıt, pusula, barut gibi buluşların Avrupa'ya ulaşması).
""",
  [("Haçlı Seferleri siyasi amaçlarına ulaşamadığı hâlde Avrupa için neden önemlidir?",
    "Doğu ile Batı arasında **kültürel, ekonomik ve teknik etkileşim** sağladı; kâğıt, pusula, barut gibi buluşlar ve Doğu'nun ticaret ürünleri Avrupa'ya ulaştı."),
   ("Uygurları diğer Orta Asya Türk devletlerinden ayıran özellik nedir?",
    "**Yerleşik hayata geçmeleri** ve buna bağlı olarak kendine özgü **kültür, sanat ve hukuk** yapısı geliştirmeleri.")],
  ["Bizans: İstanbul merkezli, Ortodoks.",
   "İslamiyet 7. yüzyılda doğdu; Endülüs'e kadar yayıldı.",
   "Uygurlar yerleşik hayata geçti.",
   "Haçlı Seferleri: siyasi başarısızlık, kültürel-teknik etkileşim."]),

O("k3", "3.3",
  "Orta Çağ'da ticaret yolları",
  "Trade routes in the Middle Ages",
  r"""
# Ticaret Yolları

Orta Çağ'da devletlerin ekonomisini ve siyasi gücünü belirleyen en önemli unsurlardan biri **uluslararası ticaret yollarıydı**. Bu yollar mal alışverişinin yanında **kültürler arası etkileşimi** de sağladı.

| Yol | Güzergâh | Taşınan ürünler |
|---|---|---|
| **İpek Yolu** | Çin → Orta Asya → Hazar'ın kuzeyi ve güneyi → Anadolu → Avrupa (**kara yolu**) | İpek, porselen, değerli kumaşlar |
| **Kürk Yolu** | Kuzey orman kuşağı; Sibirya – Doğu Avrupa | Kürk |
| **Baharat Yolu** | Hindistan → (deniz yoluyla) Basra Körfezi / Kızıldeniz → Akdeniz limanları → Avrupa | Baharat, aromatik ürünler |

# Kervansaraylar

Ticaret yolları üzerinde tüccarların **güvenle konaklaması**, hayvanlarının bakımı ve mallarının korunması için yapılan yapılardır; ticareti canlandırmışlardır.

> Ticaret yollarını kontrol eden devletler **zenginleşir**; bu nedenle yollar üzerinde sık sık **mücadeleler** yaşanmıştır.
""",
  [("İpek Yolu'nun yalnızca ekonomik değil kültürel bir öneme de sahip olmasının nedeni nedir?",
    "Yol boyunca tüccarlarla birlikte **dinler, diller, buluşlar ve sanat anlayışları** da taşındı; farklı medeniyetler birbirini tanıyıp etkiledi."),
   ("Kervansarayların ticarete katkısı nedir?",
    "Tüccarlara **güvenli konaklama**, hayvanlara bakım ve mallara koruma sağlayarak ticaretin **güvenli ve sürekli** olmasını sağladılar.")],
  ["İpek Yolu: Çin → Avrupa, kara yolu, ipek-porselen.",
   "Kürk Yolu: Sibirya – Doğu Avrupa.",
   "Baharat Yolu: Hindistan → Basra/Kızıldeniz → Akdeniz.",
   "Kervansaray: güvenli konaklama, ticareti canlandırma."]),

O("k4", "3.4",
  "Orta Çağ'da bilim, kültür ve sanat",
  "Science, culture and art in the Middle Ages",
  r"""
# İslam Bilim Medeniyeti (Altın Çağ)

- **Abbasiler** döneminde, özellikle **Beytü'l-Hikme**'nin kuruluşuyla Yunan, Hint ve Pers eserleri **Arapçaya tercüme** edildi.
- Çığır açan bilginler:

| Bilgin | Alan |
|---|---|
| **İbn Sina** | Tıp, felsefe |
| **Harezmî** | Matematik (cebir), astronomi |
| **Bîrûnî** | Astronomi, coğrafya |
| **Fârâbî** | Felsefe, müzik |
| **İbn Rüşd** | Felsefe, tıp |

# Avrupa'da Skolastik Düşünce

Orta Çağ Avrupa'sında **kilisenin baskısı** altında akıl ve bilimin geri plana itildiği, her bilginin **dinî dogmalarla** açıklandığı dönemdir. Bilimsel gelişmeler yavaşlamıştır.

# Sanat ve Mimari

| İslam sanatı | Avrupa sanatı |
|---|---|
| Geometrik desenler, **hat**, **çini**, **minyatür** | Kilise merkezli **Romanesk** ve **Gotik** katedraller |
| Cami mimarisi (kubbe, minare) | Dinsel resimler, **vitraylar** |

> Aynı dönemde İslam dünyasında bilim gelişirken Avrupa'da skolastik düşünce hâkimdi; İslam dünyasındaki tercümeler daha sonra Avrupa'nın **Rönesans**'ına da katkı sağladı.
""",
  [("Beytü'l-Hikme'nin bilim tarihindeki önemi nedir?",
    "Yunan, Hint ve Pers eserlerinin **Arapçaya tercüme edildiği** merkezdir; eski bilgi birikimini korumuş ve İslam bilginlerinin özgün çalışmalarına zemin hazırlamıştır."),
   ("Skolastik düşüncenin bilimsel gelişmeye etkisi ne olmuştur?",
    "Bilgiyi **dinî dogmalarla** sınırladığı ve akıl-deneyi geri plana ittiği için Avrupa'da bilimsel gelişmeyi **yavaşlatmıştır**.")],
  ["Abbasiler, Beytü'l-Hikme: tercüme hareketi.",
   "İbn Sina tıp, Harezmî cebir, Bîrûnî astronomi-coğrafya, Fârâbî felsefe, İbn Rüşd felsefe.",
   "Avrupa: skolastik düşünce, bilim yavaşladı.",
   "İslam sanatı: hat, çini, minyatür · Avrupa: Gotik/Romanesk, vitray."]),
]))

from _ek135 import uygula135  # noqa: E402
uygula135(units, "tar")

from ek_genel import uygula; uygula(units, "tar_ek142")  # 1.43: ilk Türk ve Türk-İslam devletleri

write("tar-9.js", "9/tarih", "9. Sınıf Tarih — kazanım konu anlatım notları",
      "kullanıcının verdiği \"9. Sınıf Tarih Ders Kitabı Ayrıntılı Kazanım Konu Anlatım Notları\" (3 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır. Kaynaktaki yazım ve küçük bilgi hataları düzeltildi; tablolar ve örnek sorular eklendi.")
