# -*- coding: utf-8 -*-
"""9. Sınıf Türk Dili ve Edebiyatı Konu Anlatım Notları → js/data/content/edb-9.js"""
from common import O, U, write

units = []

# ---------------------------------------------------------------- 1. TEMA
units.append(U("u1", "1. Tema: Sözün İnceliği", "Theme 1: The Subtlety of Words", [
O("k1", "1.1",
  "Edebiyat ve güzel sanatlar — \"San'at\" (Faruk Nafiz Çamlıbel)",
  "Literature and the fine arts — \"San'at\" (Faruk Nafiz Çamlıbel)",
  r"""
# Temaya Giriş

Bu tema; **estetik değer, yaratıcılık, hayal gücü ve imge** gibi temel kavramlar üzerinden edebiyatın dünyasına giriş yapar. Edebî eserlerde her sözün özenle seçildiğini ve seçilen sözlerin anlamı doğrudan etkilediğini fark etmek amaçlanır.

**Temel kavramlar:** açık ve örtük ileti · günlük dil · söz varlığı · hayal gücü · imge · sembol · çağrışım · edebî söyleyiş

# Okuma: "San'at" — Faruk Nafiz Çamlıbel

- **Beş Hececiler** anlayışıyla yazılmış, **memleket edebiyatının manifestosu** sayılan bir şiirdir.
- Şiirde iki sanat anlayışı karşılaştırılır:

| "Sen" (Batı hayranı sanat anlayışı) | "Biz" (yerli ve millî sanat anlayışı) |
|---|---|
| Mabetlerdeki ince mozaikler | Sülüs yazılar, yeşil çiniler |
| Batı müziği, bale | Zeybek oyunu, halkın acıklı nefesleri |
| Yabancı şehirlerdeki heykeller | Anadolu, köylünün kıvrılmayan beli |

- Şair yerli olanı üstün tutar; şiir **millî estetiğin ve yerli sanat anlayışının savunusudur**.
- İncelenecekler: tür özellikleri, **ahenk**, **imge** ve anlam katmanları.

# Güzel Sanatların Sınıflandırılması

Güzel sanatlar kullanılan **malzemeye** ve hitap ettiği **duyu organına** göre üçe ayrılır:

| Grup | Dallar | Özellik |
|---|---|---|
| **Plastik (görsel)** | Resim, mimari, heykel, hat, tezhip, ebru, fotoğrafçılık | Maddeye biçim verir, **göze** hitap eder |
| **Fonetik (işitsel)** | **Edebiyat**, müzik | Malzemesi kelime ve sestir; **kulağa ve zihne** hitap eder |
| **Ritmik (dramatik)** | Tiyatro, bale, dans, opera, sinema | **Hareket ve ritme** dayanır |

> Edebiyat hiçbir maddi alete bağlı değildir; malzemesi **dil**dir ve bütünüyle zihinseldir.

# Edebiyatın Diğer Disiplinlerle İlişkisi

Edebiyat en çok **tarih, sosyoloji ve psikoloji** ile ilişkilidir:
- **Tarih:** Tarihî olaylar romanda kurgulanırken tarihten yararlanılır.
- **Psikoloji:** Kahramanların ruhsal tahlillerinde.
- **Sosyoloji:** Toplumsal değişimlerin işlenmesinde.
""",
  [("Edebiyat güzel sanatların hangi grubunda yer alır? Neden?",
    "**Fonetik (işitsel) sanatlar.** Malzemesi kelime ve sestir; kulağa ve zihne hitap eder. Maddeye biçim vermediği için plastik, harekete dayanmadığı için ritmik sanatlar grubunda değildir."),
   ("Bir romancı, Kurtuluş Savaşı yıllarını anlatırken kahramanının iç çatışmalarını ayrıntılı biçimde çözümlüyor. Yazar hangi disiplinlerden yararlanmıştır?",
    "Olayların arka planı için **tarih**ten, kahramanın iç dünyasını çözümlemek için **psikoloji**den yararlanmıştır. Savaşın toplumu nasıl değiştirdiği de işleniyorsa **sosyoloji** de devreye girer.")],
  ["Güzel sanatlar: **plastik** (göz), **fonetik** (kulak/zihin), **ritmik** (hareket).",
   "Edebiyatın malzemesi **dil**dir; fonetik sanatlardandır.",
   "\"San'at\": Beş Hececiler, memleket edebiyatı; \"Sen\" (Batı) ↔ \"Biz\" (yerli/millî).",
   "En yakın disiplinler: tarih, sosyoloji, psikoloji."]),

O("k2", "1.2",
  "Söz sanatları, gerçeklik ve kurmaca",
  "Figures of speech, reality and fiction",
  r"""
# Şiirde Söz Sanatları

Şairler anlatımı zenginleştirmek, estetik haz uyandırmak ve **örtük iletileri** aktarmak için söz sanatlarından yararlanır.

| Sanat | Tanım | Örnek / ipucu |
|---|---|---|
| **Teşbih (benzetme)** | Aralarında ilgi bulunan iki unsurdan zayıf olanın güçlü olana benzetilmesi | "**Dağ gibi** bir zeybek" |
| **İstiare (eğretileme)** | Benzetmenin temel ögelerinden **yalnızca biriyle** yapılan sanat | Yalnız benzeyen → **kapalı**; yalnız benzetilen → **açık** istiare |
| **Teşhis (kişileştirme)** | İnsan dışı varlıklara insan özellikleri verme | "Ağaçlar **ağladı**" |
| **İntak (konuşturma)** | İnsan dışı varlıkları konuşturma | İntak varsa teşhis de vardır |
| **Mübalağa (abartma)** | Bir durumu olduğundan çok/az gösterme | "Bir ton ödev verdi" |
| **Tezat (zıtlık)** | Zıt kavramları bir arada kullanma | "Gülerken ağlamak" |
| **Mecazımürsel (ad aktarması)** | Benzetme amacı gütmeden bir sözü başka bir söz yerine kullanma | "**Bayrağım**" diyerek Türk bayrağını kastetmek; "Ankara açıklama yaptı" |

### Benzetmenin ögeleri
1. **Benzeyen** (zayıf unsur) 2. **Kendisine benzetilen** (güçlü unsur) 3. **Benzetme yönü** 4. **Benzetme edatı** (gibi, kadar, sanki…)
- Teşbihte en az benzeyen + benzetilen bulunur; **istiarede bunlardan yalnızca biri** vardır.

# Gerçeklik ve Kurmaca

| Öğretici metinler | Edebî (sanatsal) metinler |
|---|---|
| Dış dünyadaki gerçekliği **nesnel** biçimde aktarır | **Kurmacadır**; yazar gerçekliği kendi süzgecinden geçirir |
| Dil **göndergesel** işlevdedir, amaç bilgi vermektir | Dil **şiirsel** işlevdedir, amaç estetik hazdır |
| Örnek: makale, gezi yazısı, anı, biyografi | Örnek: şiir, hikâye, roman, tiyatro |
""",
  [("\"Rüzgâr kapıyı çaldı, sabırsızdı.\" cümlesindeki söz sanatını belirleyin.",
    "Rüzgâra insana özgü **kapı çalma** ve **sabırsızlık** özellikleri verilmiştir → **teşhis (kişileştirme)**. Konuşturma olmadığı için intak yoktur."),
   ("\"Aslanım, sınavı kazandın!\" sözünde hangi sanat vardır?",
    "Benzeyen (sen/öğrenci) söylenmemiş, yalnızca **kendisine benzetilen (aslan)** kullanılmıştır → **açık istiare**."),
   ("\"Bütün sınıf seni bekliyor.\" cümlesinde \"sınıf\" sözcüğü hangi anlamda kullanılmıştır?",
    "Sınıf (mekân) söylenip içindeki **öğrenciler** kastedilmiştir; benzetme amacı yoktur → **mecazımürsel (ad aktarması)**.")],
  ["Teşbih: benzeyen + benzetilen birlikte · istiare: yalnızca biri.",
   "Yalnız benzetilen varsa **açık**, yalnız benzeyen varsa **kapalı** istiare.",
   "İntak olan yerde teşhis de vardır.",
   "Mecazımürsel: benzetmesiz ad aktarması (parça-bütün, yer-insan vb.).",
   "Öğretici metin = nesnel gerçeklik; edebî metin = kurmaca, öznel."]),

O("k3", "1.3",
  "Deneme — \"Picasso'nun Hatları\" (Rasim Özdenören)",
  "The essay — \"Picasso's Lines\" (Rasim Özdenören)",
  r"""
# Okuma: "Picasso'nun Hatları" — Rasim Özdenören

- Yazar, **Pablo Picasso**'nun İslami **hat sanatına** benzer resimler yapmasını ele alır.
- Picasso'nun İslami bir niyetle hareket etmediğini; hat sanatını yalnızca kendi niyetini gerçekleştirmek için bir **"malzeme"** olarak kullandığını vurgular.
- **Gelenek ve ruh ilişkisi:** Gelenekten yararlanmak basit bir şema veya malzeme aktarımı değildir; asıl önemli olan o malzemeyi var eden **"ruh"**u kavramaktır.
- Kazanım: deneme türünü tanıma, **ana fikir ve yardımcı fikirleri** bulma, gelenek-sanat ilişkisini irdeleme.

# Deneme Türünün Özellikleri

- Yazar seçtiği herhangi bir konuda **kesin sonuçlara varmadan** kişisel görüşlerini özgürce aktarır.
- Anlatım **içten, samimi**dir; yazar **kendi kendine konuşur gibi** yazar (sohbet havası).
- Konu yelpazesi geniştir: sanat, edebiyat, yaşam, felsefe…
- Kanıtlama ve ispat kaygısı yoktur; **öznel** bir türdür.

| | Temsilciler |
|---|---|
| Dünya edebiyatında ilk | **Montaigne** |
| Türk edebiyatı | **Nurullah Ataç, Sabahattin Eyuboğlu, Suut Kemal Yetkin** |

### Denemeyi benzer türlerden ayırma
| Tür | Fark |
|---|---|
| **Deneme** | Kendi kendine konuşma havası, kanıtlama yok |
| **Sohbet (söyleşi)** | Okurla karşılıklı konuşuyormuş gibi, daha az derin konular |
| **Makale** | Bir düşünceyi **kanıtlamak** amacıyla, nesnel ve ciddi bir dille |
""",
  [("Bir yazar \"Belki de mutluluk, aradığımızı bulmak değil aramayı sürdürmektir; bilmiyorum, bu konuda kesin bir şey söyleyemem.\" diyor. Bu ifadeler hangi türe uygundur? Neden?",
    "**Deneme.** Yazar kişisel düşüncesini **kesin bir sonuca bağlamadan** ve samimi, kendi kendine konuşur gibi bir üslupla dile getiriyor. Makale olsaydı görüşünü kanıtlarla ispatlamaya çalışırdı."),
   ("\"Picasso'nun Hatları\" metninin ana fikri nedir?",
    "Gelenekten yararlanmak yalnızca biçimi/malzemeyi almak değildir; o biçimi var eden **ruhu** kavramak gerekir. Picasso hattı yalnızca malzeme olarak kullanmıştır.")],
  ["Deneme: kesin sonuç yok, samimi, kendi kendine konuşur gibi.",
   "İlk temsilci Montaigne; Türk edebiyatında Nurullah Ataç, S. Eyuboğlu, S. K. Yetkin.",
   "Makale kanıtlar, deneme kanıtlamaz; sohbette okurla konuşma havası vardır.",
   "Özdenören: geleneğin malzemesi değil **ruhu** önemlidir."]),
]))

# ---------------------------------------------------------------- 2. TEMA
units.append(U("u2", "2. Tema: Anlam Arayışı", "Theme 2: The Search for Meaning", [
O("k1", "2.1",
  "Hikâyenin yapı unsurları — \"Bir Kavak ve İnsanlar\" (Haldun Taner)",
  "Elements of the short story — \"A Poplar and People\" (Haldun Taner)",
  r"""
# Okuma: "Bir Kavak ve İnsanlar" — Haldun Taner

- Sahildeki bir kavağın altında huzur bulan bir ihtiyar, vasiyeti üzerine oraya gömülür; sonrasında ağaç adeta **ihtiyarın kimliğini kazanır**. Hikâyede **fantastik ve gerçekçi** ögeler bir aradadır.
- Sahile fabrika kurmak isteyen zihniyetin doğayı ve kavağı yok etmesi **eleştirilir**.
- **Doğa ve medeniyet çatışması:** doğaya değer veren ihtiyar ve köylüler ↔ kâr hırsıyla doğayı yok eden fabrikatör.

# Hikâyenin Yapı Unsurları

| Unsur | Açıklama |
|---|---|
| **Olay örgüsü** | Yaşanmış veya yaşanabilir olayların **sebep-sonuç** ilişkisiyle sıralanması |
| **Kişi kadrosu** | Olayı yaşayan **başkarakter** ve **yardımcı karakterler** |
| **Mekân** | Olayın geçtiği çevre veya yer |
| **Zaman** | Olayın gerçekleştiği mevsim, yıl veya gün dilimi |
| **Anlatıcı ve bakış açısı** | Hikâyeyi kimin, hangi açıdan anlattığı (bkz. 3. tema) |

### Tema ve konu
- **Konu:** Metinde anlatılan olay ya da durum (ör. bir kavağın ve onu sevenlerin başına gelenler).
- **Tema:** Konunun dayandığı **soyut ana duygu/düşünce** (ör. doğa sevgisi, doğa-insan çatışması). Tema tek kelime/sözcük grubuyla ifade edilebilir.
""",
  [("\"Bir Kavak ve İnsanlar\" hikâyesinin teması ve çatışması nedir?",
    "**Tema:** doğa sevgisi / doğanın korunması. **Çatışma:** doğaya değer veren ihtiyar ve köylüler ile kâr hırsıyla doğayı yok eden fabrikatör arasında; yani **doğa ↔ medeniyet (sanayi)**."),
   ("Konu ile tema arasındaki fark nedir? Bir örnekle açıklayın.",
    "Konu **somut** olarak anlatılan olaydır (bir çocuğun gurbette susması), tema ise bu olayın dayandığı **soyut** duygu/düşüncedir (gurbet, dil sevgisi).")],
  ["Hikâyenin yapı unsurları: olay örgüsü, kişiler, mekân, zaman (+ anlatıcı).",
   "Olay örgüsü sebep-sonuç ilişkisine dayanır.",
   "Konu somut olay; tema soyut ana duygu/düşünce.",
   "Haldun Taner: doğa-medeniyet çatışması; fantastik + gerçekçi ögeler."]),

O("k2", "2.2",
  "Hikâye türleri, açık ve örtük ileti — \"Hişt Hişt!\" (Sait Faik)",
  "Story types, explicit and implicit messages — \"Hişt Hişt!\" (Sait Faik)",
  r"""
# Okuma: "Hişt, Hişt!" — Sait Faik Abasıyanık

- Sait Faik, Türk edebiyatında **durum hikâyeciliğinin (Çehov tarzı)** en büyük temsilcilerindendir.
- Hikâyede yazar doğayla, böceklerle, denizle kurduğu **dostane bağı** ve **iç sesini** sorgular.
- İnsanın doğadaki sesleri duymasının ve **yaşam sevinciyle** dolmasının önemi işlenir.
- Kazanım: açık ve örtük iletileri ayırt etme, yazarın bakış açısını kavrama.

# Hikâye Türleri

| | **Olay hikâyesi** (Maupassant tarzı) | **Durum hikâyesi** (Çehov tarzı) |
|---|---|---|
| Odak | Bir **olay** | Hayatın bir **kesiti**, an veya durum |
| Plan | **Serim – düğüm – çözüm** vardır | Bu bölümler zorunlu değildir |
| Merak | Merak ögesi canlıdır, sonuç önemlidir | Merak geri plandadır, atmosfer ve duygu önemlidir |
| Türk edebiyatı | **Ömer Seyfettin**, Refik Halit Karay | **Sait Faik**, Memduh Şevket Esendal |

# Açık ve Örtük İleti

- **Açık ileti:** Metinde **doğrudan**, yorum gerektirmeden verilen mesaj.
- **Örtük ileti:** **İmge, sembol ve çağrışımlar** yoluyla okurun sezmesine bırakılan derin anlam katmanı.

> Edebî metinler çoğunlukla **örtük** iletiler taşır; okur metni yorumlayarak bu anlamı kendisi kurar.
""",
  [("Bir hikâyede belirgin bir olay yok; yazar bir sabah iskelede balıkçıları izlerken hissettiklerini anlatıyor ve hikâye bir sonuca bağlanmıyor. Bu hangi tür hikâyedir?",
    "**Durum (Çehov tarzı) hikâyesi.** Olaydan çok bir **an/kesit** ve duygular anlatılıyor; serim-düğüm-çözüm planı yok."),
   ("\"Hişt, Hişt!\" hikâyesinde \"doğadaki seslere kulak vermek\" ifadesinin örtük iletisi ne olabilir?",
    "Yalnızca sesleri duymak değil; insanın **doğayla bağ kurması**, kendi iç sesini fark etmesi ve **yaşam sevincini** yeniden bulması gerektiği. Bu anlam doğrudan söylenmez, okurun sezmesine bırakılır.")],
  ["Olay hikâyesi = Maupassant tarzı, serim-düğüm-çözüm, Ömer Seyfettin.",
   "Durum hikâyesi = Çehov tarzı, hayattan kesit, Sait Faik ve Memduh Şevket.",
   "Açık ileti doğrudan; örtük ileti imge, sembol ve çağrışımla verilir."]),

O("k3", "2.3",
  "Anı — \"Nihayet Beklediğimiz Büyük Gün\" (Halide Nusret Zorlutuna)",
  "The memoir — \"The Great Day We Had Been Waiting For\" (Halide Nusret Zorlutuna)",
  r"""
# Okuma: "Nihayet Beklediğimiz Büyük Gün" — Halide Nusret Zorlutuna

- Yazarın **"Bir Devrin Romanı"** adlı anı kitabından alınmıştır.
- Osmanlı Devleti'nin yıkılış süreci, **mütareke yıllarının acıları** ve **6 Ekim 1923**'te İstanbul'un işgalden kurtuluşunun yarattığı büyük coşku anlatılır.
- **Millî Mücadele ruhu:** Dönemin toplumsal ruh hâli, halkın vatan sevgisi ve bağımsızlık inancı **lirik** bir üslupla aktarılır.
- Kazanım: anı türünü tanıma, **tarihî olaylar ile bireysel deneyimler** arasında bağ kurma.

# Anı (Hatıra) Türünün Özellikleri

- Kişilerin yaşadıkları veya **tanık oldukları** olayları, **üzerinden zaman geçtikten sonra** kendi bakış açılarıyla yazdıkları türdür.
- **Gerçeğe bağlılık** esastır; ancak yazarın **öznel** duygu ve izlenimlerini de barındırır.
- Genellikle **birinci tekil kişi** ağzından yazılır; tarihî dönemlere ışık tutan **belge değeri** taşır.
- Türk edebiyatında ilk anı örneği: Babür Şah'ın **"Babürname"**si. **Kök Türk Kitabeleri** de anı-söylev özelliği taşır.

### Anı – günlük farkı
| Anı | Günlük |
|---|---|
| Olaylar **aradan zaman geçtikten sonra** yazılır | Olaylar **yaşandığı gün** yazılır |
| Tarih atılması zorunlu değildir | Her yazının başında **tarih** bulunur |
""",
  [("Anı ile günlük arasındaki temel fark nedir?",
    "Anıda olaylar **üzerinden zaman geçtikten sonra** hatırlanarak yazılır; günlükte ise olaylar **yaşandığı gün** ve **tarih** atılarak yazılır."),
   ("Bir metnin anı türünde yazıldığını hangi özelliklerden anlarsınız?",
    "Yazarın **kendi yaşadığı/tanık olduğu** gerçek olayları, **birinci kişi** ağzından ve **geriye dönüp hatırlayarak** anlatması; gerçek kişi, yer ve tarihlerin yer alması.")],
  ["Anı: yaşanan/tanık olunan olaylar, zaman geçtikten sonra yazılır.",
   "Gerçeğe bağlıdır ama yazarın öznel izlenimlerini taşır.",
   "İlk örnek Babürname; Kök Türk Kitabeleri anı-söylev özelliği taşır.",
   "Zorlutuna, İstanbul'un kurtuluşunu (6 Ekim 1923) lirik bir üslupla anlatır."]),
]))

# ---------------------------------------------------------------- 3. TEMA
units.append(U("u3", "3. Tema: Anlamın Yapı Taşları", "Theme 3: The Building Blocks of Meaning", [
O("k1", "3.1",
  "Anlatıcı ve bakış açıları — \"Eskici\" (Refik Halit Karay)",
  "Narrator and point of view — \"The Junk Dealer\" (Refik Halit Karay)",
  r"""
# Okuma: "Eskici" — Refik Halit Karay

- **"Gurbet Hikâyeleri"** arasında yer alır.
- Annesini ve babasını kaybettikten sonra **Filistin**'deki halasının yanına gönderilen küçük **Hasan**'ın gurbet acısı ve **ana diline özlemi** işlenir.
- **Gurbet ve dil:** Hasan'ın aylarca susması ve **İzmitli bir eskiciyle Türkçe konuşunca** çözülmesi, dilin insan ruhundaki birleştirici gücünü gösterir.

# Anlatıcı ve Bakış Açıları

| Bakış açısı | Özellik | Kişi |
|---|---|---|
| **Hâkim (ilahi)** | Anlatıcı **her şeyi bilir**; kahramanların iç dünyasını ve düşüncelerini okur | 3. tekil kişi |
| **Gözlemci** | Anlatıcı yalnızca **gördüklerini** bir kamera tarafsızlığıyla aktarır; zihin okuyamaz | 3. tekil kişi |
| **Kahraman anlatıcı** | Anlatıcı olayın içindeki karakterlerden biridir | **1. tekil kişi** |

### İpuçları
- "…**diye düşündü**, içinden … **geçirdi**" → kahramanın zihni okunuyor → **hâkim** bakış açısı.
- Yalnızca dış görünüş, hareket ve konuşmalar → **gözlemci**.
- "Ben…", "…dım, …dik" → **kahraman anlatıcı**.
""",
  [("\"Hasan pencerenin önünde oturuyordu. Kimseyle konuşmuyor, sokaktan geçenlere bakıyordu.\" Bu parçada hangi bakış açısı kullanılmıştır?",
    "Anlatıcı yalnızca **görüleni** (oturma, bakma, konuşmama) aktarıyor, Hasan'ın düşüncelerini söylemiyor → **gözlemci bakış açısı**."),
   ("\"Hasan, bu yabancı dilin içinde kaybolduğunu, kimsenin onu anlamayacağını düşünüyordu.\" Bakış açısı nedir?",
    "Anlatıcı kahramanın **zihninden geçenleri** biliyor → **hâkim (ilahi) bakış açısı**.")],
  ["Hâkim: her şeyi bilir, zihin okur (3. kişi).",
   "Gözlemci: yalnız görüleni aktarır (3. kişi).",
   "Kahraman anlatıcı: olayın içinde, 1. kişi.",
   "\"Eskici\": gurbet ve ana dilinin birleştirici gücü."]),

O("k2", "3.2",
  "Şiirde yapı, ahenk ve ölçü; şiir türleri",
  "Structure, harmony and meter in poetry; types of poems",
  r"""
# Şiirde Yapı ve Ahenk Unsurları

Şiirde anlamı ve duygu coşkusunu pekiştiren en önemli unsurlar **ahenk** ve **yapı** ögeleridir.

### Nazım birimi
**Dize** (tek satır) · **beyit** (iki dize) · **dörtlük** (dört dize) · **bent** (dörtten fazla dizeden oluşan birim).

### Kafiye (uyak) ve redif
- **Redif:** Uyaklardan sonra gelen, **yazılışı ve görevi aynı** olan ek veya kelimeler. Kafiye bulunurken **önce redif ayrılır**.
- **Kafiye:** Dize sonlarındaki ses benzerlikleri (görevleri ya da anlamları farklı).

| Kafiye türü | Ses benzerliği | Örnek |
|---|---|---|
| **Yarım** | Tek ses | ağa**ç** – kılı**ç** |
| **Tam** | İki ses (ünlü + ünsüz) | y**ar** – b**ar** |
| **Zengin** | Üç veya daha fazla ses | **anı**r – y**anı**r |
| **Cinaslı** | Yazılışı aynı, anlamı farklı kelimeler | **yüz** (surat) – **yüz** (sayı) |

### Kafiye örgüsü (uyak şeması)
| Örgü | Şema |
|---|---|
| **Düz** | aaab, cccb / aa, bb |
| **Çapraz** | abab |
| **Sarmal** | abba |
| **Mani tipi** | aaxa |
| **Örüşük** | aba, bcb, cdc… |

### Ölçü (vezin)
- **Hece ölçüsü:** Dizelerdeki **hece sayılarının** eşitliğine dayanır (ör. 7'li, 8'li, 11'li); **durak** önemlidir.
- **Aruz ölçüsü:** Hecelerin **uzunluk-kısalığına** (ses değerlerine) dayanır; Divan edebiyatında kullanılır.
- **Serbest şiir:** Belirli bir ölçüye bağlı değildir.

# Şiir Türleri (konusuna göre)

| Tür | Konu |
|---|---|
| **Lirik** | Coşkulu duygular (aşk, ayrılık, özlem) |
| **Epik** | Kahramanlık, yiğitlik, savaş |
| **Pastoral** | Doğa ve çoban hayatı |
| **Didaktik** | Öğretici, bilgi ve öğüt veren |
| **Satirik** | Eleştirel, iğneleyici (hiciv) |
""",
  [("\"Gönlüm hep seni arıyor / Ellerim seni sarıyor\" dizelerinde redif ve kafiyeyi bulun.",
    "Önce redif ayrılır: her iki dizedeki **-ıyor** eki aynı görevlidir → **redif**. Geriye kalan *ar* / *sar* sözcüklerinde **\"ar\"** ses benzerliği (iki ses) → **tam kafiye**."),
   ("Kafiye şeması **abba** olan bir dörtlükte hangi uyak örgüsü vardır?",
    "1. ile 4., 2. ile 3. dizeler uyaklıdır → **sarmal uyak**."),
   ("Kahramanlık ve savaşı anlatan şiirler hangi türdendir?",
    "**Epik şiir.** (Aşk ve özlem → lirik; doğa ve çoban hayatı → pastoral; öğüt → didaktik; eleştiri → satirik.)")],
  ["Nazım birimi: dize, beyit, dörtlük, bent.",
   "Önce **redif** ayrılır, sonra kafiye bulunur.",
   "Kafiye: yarım (1 ses), tam (2), zengin (3+), cinaslı (sesteş).",
   "Uyak örgüsü: düz, çapraz (abab), sarmal (abba), mani tipi (aaxa), örüşük.",
   "Hece ölçüsü sayıya, aruz uzunluk-kısalığa dayanır.",
   "Şiir türleri: lirik, epik, pastoral, didaktik, satirik."]),

O("k3", "3.3",
  "Gezi yazısı — \"Bizim Akdeniz\" (Falih Rıfkı Atay)",
  "The travel essay — \"Our Mediterranean\" (Falih Rıfkı Atay)",
  r"""
# Okuma: "Bizim Akdeniz" — Falih Rıfkı Atay

- Türk gezi edebiyatının başyapıtlarındandır.
- Yazar **Antalya**'nın doğasını, **Toros** dağlarını, sahil ovasını, zeytin ve portakal bahçelerini güçlü bir **gözlem** yeteneği ve akıcı bir Türkçe ile **betimler**.

# Gezi Yazısının Özellikleri

- Yazarın **gezip gördüğü yerlerin** doğal, tarihî, sosyal ve kültürel özelliklerini ilgi çekici bir üslupla anlattığı türdür (**seyahatname**).
- **Gözlem, betimleme ve açıklama** anlatım biçimleri yoğun olarak kullanılır.
- Gerçeğe bağlıdır; ama yazarın kişisel izlenimlerini de taşır. **Öğretici** metinler arasında yer alır.
- Türk edebiyatında ilk örnek: **Seydi Ali Reis — "Mir'âtü'l-Memâlik"**. Türün zirvesi: **Evliya Çelebi — "Seyahatname"**.

### Anı ile gezi yazısı farkı
| Anı | Gezi yazısı |
|---|---|
| Geçmişteki **yaşam deneyimlerine** odaklanır | **Yeni coğrafyaların ve mekânların** tanıtımını amaçlar |
| Merkezde **olaylar ve kişiler** vardır | Merkezde **yer** vardır |
""",
  [("Bir metinde yazar, gittiği bir kasabanın taş evlerini, pazarını ve yöresel yemeklerini ayrıntılı biçimde anlatıyor. Bu metin hangi türe girer ve en çok hangi anlatım biçimi kullanılmıştır?",
    "**Gezi yazısı.** Yazar gezip gördüğü yeri tanıtıyor; ağırlıklı anlatım biçimi **betimleme**dir (gözlem ve açıklamayla birlikte)."),
   ("Türk edebiyatında gezi türünün ilk örneği ve zirvesi hangi eserlerdir?",
    "İlk örnek: Seydi Ali Reis'in **Mir'âtü'l-Memâlik**'i. Zirve: Evliya Çelebi'nin **Seyahatname**'si.")],
  ["Gezi yazısı = gezilip görülen yerin tanıtılması; betimleme ağırlıklı.",
   "İlk örnek Mir'âtü'l-Memâlik (Seydi Ali Reis); zirve Seyahatname (Evliya Çelebi).",
   "Anı olaya/kişiye, gezi yazısı yere odaklanır.",
   "Falih Rıfkı Atay — \"Bizim Akdeniz\": Antalya ve Toroslar."]),
]))

# ---------------------------------------------------------------- 4. TEMA
units.append(U("u4", "4. Tema: Dilin Zenginliği", "Theme 4: The Richness of Language", [
O("k1", "4.1",
  "Roman — \"Çalıkuşu\" (Reşat Nuri Güntekin)",
  "The novel — \"The Wren\" (Reşat Nuri Güntekin)",
  r"""
# Okuma: "Çalıkuşu" — Reşat Nuri Güntekin

- Türk edebiyatının en sevilen **sosyal romanlarından** biridir.
- İstanbul'da neşeli, ele avuca sığmaz bir öğretmen adayı olan **Feride**'nin **Kâmran**'ın ihanetiyle yıkılması ve **Anadolu**'nun çeşitli köylerinde öğretmenlik yaparken geçirdiği büyük **ruhsal dönüşüm** anlatılır.
- **Millî Edebiyat ve Anadolu:** Roman, İstanbul merkezli aydın ile **Anadolu gerçeğini** buluşturarak dönemin ideallerini yansıtır.
- Roman büyük ölçüde **günlük/anı** biçiminde yazıldığı için üslubu içten ve samimidir.

# Roman Türünün Özellikleri

- İnsan ve toplum ilişkilerini, olayları **geniş bir zaman diliminde**, ayrıntılı mekân tasvirleriyle ele alan **uzun** anlatı türüdür.
- Hikâyeye göre kişi kadrosu daha **kalabalık**, olay örgüsü daha **karmaşık**tır.

| | İlk örnekler |
|---|---|
| Dünyada ilk modern roman | **Cervantes — "Don Kişot"** |
| Türk edebiyatında ilk yerli roman | **Şemsettin Sami — "Taaşşuk-ı Talat ve Fitnat"** |
| Türk edebiyatında ilk edebî roman | **Namık Kemal — "İntibah"** |

### Roman – hikâye karşılaştırması
| Roman | Hikâye |
|---|---|
| Uzun, geniş zaman dilimi | Kısa, dar zaman dilimi |
| Kalabalık kişi kadrosu | Az sayıda kişi |
| Ayrıntılı tasvirler | Ayrıntıya az yer verilir |
""",
  [("\"Çalıkuşu\" romanı Millî Edebiyat anlayışını hangi yönüyle yansıtır?",
    "İstanbullu bir aydının (Feride) **Anadolu'ya gidip** oranın gerçekleriyle tanışmasını anlatarak **Anadolu'yu edebiyatın merkezine** taşır; sade bir dil kullanır."),
   ("Türk edebiyatında ilk yerli roman ile ilk edebî romanı eşleştirin.",
    "İlk yerli roman: **Taaşşuk-ı Talat ve Fitnat** (Şemsettin Sami). İlk edebî roman: **İntibah** (Namık Kemal).")],
  ["Roman: uzun, geniş zaman, kalabalık kadro, ayrıntılı tasvir.",
   "İlk modern roman Don Kişot (Cervantes).",
   "İlk yerli roman Taaşşuk-ı Talat ve Fitnat; ilk edebî roman İntibah.",
   "Çalıkuşu: Feride'nin Anadolu'daki dönüşümü; günlük/anı formu."]),

O("k2", "4.2",
  "Romanda anlatım teknikleri ve üslup",
  "Narrative techniques and style in the novel",
  r"""
# Başlıca Anlatım Teknikleri

Nitelikli romanlarda yazar kurguyu güçlendirmek ve okurun dikkatini canlı tutmak için çeşitli tekniklere başvurur.

| Teknik | Açıklama | İpucu |
|---|---|---|
| **Özetleme** | Uzun olayları veya zaman geçişlerini kısa paragraflarla aktarma | "Aradan üç yıl geçti…" |
| **Diyalog** | Kahramanların karşılıklı konuşmalarına yer verme | Tırnak / konuşma çizgisi |
| **İç çözümleme** | Anlatıcının araya girerek kahramanın zihninden geçenleri **okura aktarması** | 3. kişi: "…diye düşünüyordu" |
| **Bilinç akışı** | Kahramanın düşüncelerinin **mantıksal bir sıra olmadan**, zihninden aktığı gibi verilmesi | Kopuk, çağrışımlı, noktalamasız cümleler |
| **Geriye dönüş** | Şimdiki zamandan geçmişteki olaylara/hatıralara geçiş | "Birden çocukluğu aklına geldi…" |

> **İç çözümleme ↔ bilinç akışı:** İç çözümlemede anlatıcı düşünceleri **düzenleyerek** aktarır; bilinç akışında düşünceler **düzensiz ve doğrudan** verilir.

# Üslup (Biçem)

- Sanatçının dili kullanırken gösterdiği **kişisel beceri ve seçimlerin bütünü**dür.
- Üslubun temel ilkeleri: **açıklık, duruluk, yalınlık, özgünlük**.
- Çalıkuşu günlük/anı formunda yazıldığı için **içten ve samimi** bir üsluba sahiptir.
""",
  [("\"Feride o gece uyuyamadı; Kâmran'ın sözlerini, teyzesinin bakışlarını, okulun soğuk koridorlarını düşündü durdu.\" Bu cümlede hangi anlatım tekniği vardır?",
    "Anlatıcı (3. kişi) kahramanın zihninden geçenleri **düzenli bir biçimde** okura aktarıyor → **iç çözümleme**."),
   ("\"Yağmur… annem… o mavi kapı, neden kapattılar, belki de hiç açık değildi…\" Bu ifadede hangi teknik kullanılmıştır?",
    "Düşünceler **mantıksal sıra olmadan**, çağrışımlarla ve kopuk biçimde aktığı gibi verilmiş → **bilinç akışı**.")],
  ["Özetleme: zaman atlama; diyalog: karşılıklı konuşma.",
   "İç çözümleme: anlatıcı düşünceleri düzenleyerek aktarır.",
   "Bilinç akışı: düşünceler sırasız, aktığı gibi.",
   "Geriye dönüş: geçmişe dönüş.",
   "Üslubun ilkeleri: açıklık, duruluk, yalınlık, özgünlük."]),

O("k3", "4.3",
  "Eleştiri — \"Parasız Yatılı\" (Mehmet Kaplan)",
  "Criticism — \"Parasız Yatılı\" (Mehmet Kaplan)",
  r"""
# Okuma: "Parasız Yatılı" — Mehmet Kaplan

- Mehmet Kaplan, **Füruzan**'ın "Parasız Yatılı" hikâyesini tahlil eder; edebî eser incelemesinin güzel örneklerindendir.
- Eleştirmen, hikâyedeki **basit olayın** ve **yoksulluk** temasının sanatsal bir derinliğe nasıl kavuşturulduğunu inceler.
- **Yaşantı hikâyesi:** Kaplan, Füruzan'ın hikâyesini klasik olay hikâyesinden ayırarak bir **"yaşantı hikâyesi"** olarak niteler.
- Kazanım: eleştiri türünü tanıma; bir eseri **yapı, içerik ve üslup** yönünden değerlendirme.

# Eleştiri (Tenkit) Türünün Özellikleri

- Bir edebî eserin veya sanatçının **olumlu ve olumsuz** yönlerini, gerçek değerini **bilimsel ve estetik** ölçütlerle ortaya koyan yazı türüdür.
- Batı edebiyatında **"kritik"** adıyla bilinir.
- Türk edebiyatında **Tanzimat** Dönemi'nde **Namık Kemal**'in **"Mukaddime-i Celâl"** ve **"Tahrib-i Harabat"** gibi yazılarıyla önem kazanmıştır.
- **Yapıcı** eleştiri eserin ve sanatçının gelişmesine katkı sağlar; eleştirmen kişisel kırgınlıklarla değil **ölçütlerle** hareket etmelidir.

### Bir eseri değerlendirme ölçütleri
1. **Yapı:** olay örgüsü, kişiler, zaman-mekân, bakış açısı
2. **İçerik:** konu, tema, iletiler
3. **Üslup:** dil, anlatım teknikleri, söz sanatları
""",
  [("Eleştiri yazısının \"tanıtma yazısı\"ndan farkı nedir?",
    "Tanıtma yazısı eseri yalnızca **tanıtıp okura önerir**; eleştiri ise eserin **olumlu ve olumsuz** yönlerini bilimsel ve estetik ölçütlerle **değerlendirir**."),
   ("Mehmet Kaplan \"Parasız Yatılı\"yı neden \"yaşantı hikâyesi\" olarak nitelendirir?",
    "Hikâyede klasik olay hikâyesindeki gibi merak uyandıran bir olay örgüsü yerine, bir kişinin **iç yaşantısı** ve yoksulluk deneyimi öne çıkar; değer olaydan değil **yaşantının derinliğinden** gelir.")],
  ["Eleştiri: olumlu + olumsuz yönler, bilimsel ve estetik ölçüt.",
   "Batıda \"kritik\"; bizde Tanzimat'ta Namık Kemal ile önem kazandı.",
   "Değerlendirme: yapı, içerik, üslup.",
   "Kaplan: Füruzan'ın hikâyesi bir \"yaşantı hikâyesi\"dir."]),

O("k4", "4.4",
  "Otobiyografi — \"Âşık Veysel\" belgeseli",
  "Autobiography — the \"Âşık Veysel\" documentary",
  r"""
# Dinleme/İzleme: "Âşık Veysel" Belgeseli

- Âşık Veysel'in kendi ağzından hayat hikâyesini anlattığı belgesel/otobiyografik anlatıdır.
- **Halk ozanlığının** derinliği; **yedi yaşında çiçek hastalığı** nedeniyle gözlerini kaybetmesi ve **babasının hediye ettiği sazla** başlayan sanat yolculuğu anlatılır.

# Otobiyografi Türünün Özellikleri

- Bir kişinin **kendi yaşam öyküsünü** (hayatını, deneyimlerini, başarılarını) **birinci tekil kişi** ağzından anlattığı türdür.
- **Gerçeğe bağlılık** esastır ancak anlatılanlar yazarın **kendi süzgecinden** geçer (öznel).

### Biyografi – otobiyografi – anı
| | Biyografi | Otobiyografi | Anı |
|---|---|---|---|
| Kimin hayatı? | **Başkasının** | **Kendisinin** | Yazarın yaşadığı/tanık olduğu **olaylar** |
| Anlatım kişisi | 3. kişi | 1. kişi | 1. kişi |
| Bakış | Tarafsızlık amaçlanır | Öznel | Öznel |
| Odak | Hayatın bütünü | Hayatın bütünü | Belirli olaylar ve dönem |
""",
  [("Bir yazar, ünlü bir bilim insanının doğumundan ölümüne kadar hayatını belgelere dayanarak anlatıyor. Bu metin hangi türdür?",
    "Başkasının hayatı, 3. kişi ağzından ve belgelere dayanarak anlatılıyor → **biyografi**."),
   ("Otobiyografi ile anı arasındaki fark nedir?",
    "Otobiyografi kişinin **hayatının bütününü** merkeze alır; anı ise yazarın yaşadığı veya tanık olduğu **belirli olayları ve dönemi** anlatır, yazar kadar çevresindeki olaylar da önemlidir.")],
  ["Otobiyografi: kişi kendi hayatını 1. kişi ağzından anlatır.",
   "Biyografi: başkasının hayatı, 3. kişi, tarafsızlık.",
   "Anı belirli olaylara, otobiyografi hayatın bütününe odaklanır.",
   "Âşık Veysel: 7 yaşında çiçek hastalığıyla görme kaybı, babasının hediye ettiği saz."]),

O("k5", "4.5",
  "Yıl sonu genel değerlendirme",
  "End-of-year general review",
  r"""
# Yıl Sonu Genel Değerlendirme

9. sınıf boyunca dört tema işlendi: **Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği**. Edebiyatın güzel sanatlar içindeki yerinden başlanarak şiir tahlili ile **sanatsal** ve **öğretici** metin türleri yapı ve üslup özellikleriyle incelendi.

### Türlerin genel haritası
| Tür | Grup | Okunan metin |
|---|---|---|
| Şiir | Sanatsal (kurmaca) | "San'at" — Faruk Nafiz Çamlıbel |
| Hikâye | Sanatsal (kurmaca) | "Bir Kavak ve İnsanlar", "Hişt Hişt!", "Eskici" |
| Roman | Sanatsal (kurmaca) | "Çalıkuşu" — Reşat Nuri Güntekin |
| Deneme | Öğretici | "Picasso'nun Hatları" — Rasim Özdenören |
| Anı | Öğretici | "Nihayet Beklediğimiz Büyük Gün" — H. N. Zorlutuna |
| Gezi yazısı | Öğretici | "Bizim Akdeniz" — Falih Rıfkı Atay |
| Eleştiri | Öğretici | "Parasız Yatılı" — Mehmet Kaplan |
| Otobiyografi | Öğretici | "Âşık Veysel" belgeseli |

### Temel kazanımlar
- Türkçenin zengin **söz varlığını**, yapım eklerini ve ses olaylarını kavrama.
- Metinler arası karşılaştırmalar yaparak **açık ve örtük iletileri** çözme.
- Yazılı ve sözlü anlatım kurallarına uygun olarak **sunum, bilgi görseli ve otobiyografi** hazırlama.
""",
  [("Aşağıdaki türleri sanatsal ve öğretici olarak ayırın: roman, anı, şiir, gezi yazısı, eleştiri, hikâye.",
    "**Sanatsal (kurmaca):** roman, şiir, hikâye. **Öğretici:** anı, gezi yazısı, eleştiri."),
   ("Hangi okuma metni hangi türün örneğidir: \"Eskici\", \"Bizim Akdeniz\", \"Parasız Yatılı\" (Mehmet Kaplan)?",
    "\"Eskici\" → **hikâye**; \"Bizim Akdeniz\" → **gezi yazısı**; Mehmet Kaplan'ın \"Parasız Yatılı\" yazısı → **eleştiri**.")],
  ["4 tema: Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği.",
   "Sanatsal: şiir, hikâye, roman · Öğretici: deneme, anı, gezi, eleştiri, otobiyografi.",
   "Her metinde açık ve örtük iletileri ayırt etmeyi unutma."]),
]))

write("edb-9.js", "9/edebiyat", "9. Sınıf Türk Dili ve Edebiyatı — konu anlatım ve kazanım rehberi",
      "kullanıcının verdiği \"9. Sınıf Türk Dili ve Edebiyatı Kapsamlı Konu Anlatım ve Kazanım Analiz Rehberi\" (4 tema).",
      units, "Kazanım kodları tema.sıra biçimindedir. Örnek soruların bir kısmı ve bazı karşılaştırma tabloları kazanımı uygulamak için eklendi.")
