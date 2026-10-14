# -*- coding: utf-8 -*-
"""11. Sınıf Felsefe konu anlatım notları → js/data/content/fel-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Çevre Sorunları ve Felsefe", "Unit 1: Environmental Problems and Philosophy", [
O("k1", "1.1", "Çevre ve insan ilişkisi", "The relationship between humans and the environment", r"""
# İnsan–Doğa İlişkisinin Tarihsel Değişimi

| Dönem | Doğa anlayışı |
|---|---|
| **Antik dönem** | Doğa canlı, düzenli bir bütün (**kosmos**); insan onun **parçası**. Stoacılar: "Doğaya uygun yaşa." |
| **Orta Çağ** | Doğa Tanrı'nın yarattığı ve insana **emanet** ettiği düzen |
| **Modern dönem** | **Bacon** ("Bilgi güçtür" — doğaya hükmetmek), **Descartes** (insan doğanın "efendisi ve sahibi"); doğa **mekanik** ve **kaynak** olarak görülür |
| **Sanayi Devrimi sonrası** | Kirlilik, iklim değişikliği, biyoçeşitlilik kaybı → çevre **felsefi bir problem** hâline gelir |

# Temel Felsefi Sorular
- İnsan doğanın **sahibi** mi, yoksa **parçası** mı?
- **Gelecek nesillere** karşı sorumluluğumuz var mıdır? (Hans Jonas: **sorumluluk ilkesi** — "Eylemlerinin etkileri yeryüzünde gerçek insan yaşamının sürekliliğiyle bağdaşacak şekilde davran.")
- Doğanın yalnızca **araçsal değeri** mi (insana faydası) vardır, yoksa **içkin (kendinde) değeri** de var mı?

**Araçsal değer:** Bir şeyin başka bir amaç için değerli olması (orman → kereste).
**İçkin değer:** Bir şeyin kendisi için değerli olması (ormanın kendisi değerlidir).
""",
  [("'Yağmur ormanları ilaç hammaddesi olduğu için korunmalıdır' görüşü doğaya hangi değeri yükler?", "**Araçsal değer**: orman, insan için sağladığı yarar (ilaç) nedeniyle değerli görülür. İçkin değer savunucusu ise ormanın **yarardan bağımsız** olarak kendi başına değerli olduğunu söyler.")],
  ["Antik: insan doğanın parçası; modern: doğa kaynak (Bacon, Descartes).", "Araçsal değer vs içkin değer.", "Jonas: gelecek kuşaklara sorumluluk."]),
O("k2", "1.2", "Çevre etiği yaklaşımları", "Approaches in environmental ethics", r"""
# Çevre Etiği
İnsanın doğayla ilişkisinde **doğru ve yanlış** davranışları inceleyen uygulamalı etik alanı.

| Yaklaşım | Ahlaki değerin merkezi | Temsilci | Ana fikir |
|---|---|---|---|
| **Antroposentrik (insan merkezli)** | Yalnızca **insan** | Kant (dolaylı ödev), modern geleneğin çoğu | Doğa insan için **araçtır**; korunmalıdır çünkü insanlar ona muhtaçtır |
| **Patosentrik / hayvan hakları** | **Acı çekebilen** canlılar | Peter Singer, Tom Regan | Acı çekebilen her canlının çıkarı dikkate alınmalı; "türcülük" eleştirisi |
| **Biyosentrik (canlı merkezli)** | **Tüm canlılar** | **Albert Schweitzer** — "**yaşama saygı**"; Paul Taylor | Her canlı kendi başına değerlidir |
| **Ekosentrik (ekosistem merkezli)** | **Ekosistemin bütünü** (canlı + cansız) | **Aldo Leopold** — "**toprak etiği**" | "Bir şey biyotik topluluğun bütünlüğünü, istikrarını ve güzelliğini korumaya yöneliyorsa doğrudur." |
| **Derin ekoloji** | Bütün doğa | **Arne Naess** | İnsan doğayla **özdeşleşmeli**; "sığ ekoloji" (yalnızca insan yararı için kirlilikle mücadele) yetersizdir |

# Güncel Tartışmalar
- **Sürdürülebilirlik:** Bugünün ihtiyaçlarını gelecek kuşakların imkânlarını tüketmeden karşılamak (Brundtland Raporu, 1987).
- **İklim adaleti:** Emisyonların çoğunu gelişmiş ülkeler üretirken etkilerini en çok yoksul ülkelerin yaşaması.
- **Hayvan hakları**, fabrika çiftçiliği, türlerin korunması.
- **Kuşaklar arası adalet.**
""",
  [("Leopold'un toprak etiği ile Schweitzer'in yaşama saygı etiği arasındaki fark nedir?", "Schweitzer **tek tek canlıların** değerini öne çıkarır (biyosentrik). Leopold ise **ekosistemin bütünlüğünü** (toprak, su, bitkiler, hayvanlar) ahlaki değerin merkezi yapar (ekosentrik); bireyin değil bütünün iyiliğini gözetir.")],
  ["Antroposentrik: insan; biyosentrik: tüm canlılar (Schweitzer).", "Ekosentrik: ekosistem (Leopold); derin ekoloji (Naess).", "Güncel: sürdürülebilirlik, iklim adaleti, hayvan hakları."]),
]),
U("u2", "2. Ünite: Teknoloji ve Hayat", "Unit 2: Technology and Life", [
O("k1", "2.1", "Teknoloji ve insan hayatı", "Technology and human life", r"""
# Teknoloji Nötr müdür?

**Teknoloji:** İnsanın doğayı dönüştürmek ve hayatını kolaylaştırmak için geliştirdiği bilgi, araç ve yöntemler.

| Görüş | İddia |
|---|---|
| **Araçsalcı (nötr) görüş** | Teknoloji bir araçtır; iyi ya da kötü olması **kullanana** bağlıdır |
| **Değer yüklü görüş** | Teknoloji, belirli değerleri ve yaşam biçimlerini **içinde taşır** ve dayatır |
| **Teknolojik determinizm** | Toplumsal değişimi teknoloji **belirler** |
| **Sosyal inşacılık** | Teknolojiyi toplumsal tercihler ve ilişkiler biçimlendirir |

**Heidegger:** Modern teknoloji, doğayı ve insanı **"hazır kaynak/stok"** olarak gören bir **çerçeveleme (Gestell)** biçimidir. Nehir artık bir manzara değil, hidroelektrik enerji deposudur.

# Etkiler
| Olumlu | Olumsuz |
|---|---|
| Yaşam kalitesi, tedavi, uzun ömür | **Yabancılaşma** (Marx, Frankfurt Okulu) |
| İletişim, bilgiye erişim | **Mahremiyet** kaybı, gözetim |
| Üretim kolaylığı | İşsizlik, otomasyon |
| Ulaşım | Çevresel tahribat, bağımlılık |
""",
  [("Sosyal medya algoritmalarının kullanıcıyı ekranda tutacak şekilde tasarlanması teknolojinin nötr olduğu görüşüne nasıl bir itiraz oluşturur?", "Algoritma tasarımcıların **dikkat ve kâr** gibi değerlerini içine yerleştirir; kullanıcının davranışını yönlendirir. Bu, teknolojinin yalnızca kullanıma bağlı nötr bir araç değil, **değer yüklü** olduğunu gösterir.")],
  ["Teknoloji nötr mü, değer yüklü mü?", "Heidegger: Gestell — doğa hazır kaynak.", "Olumsuz etkiler: yabancılaşma, mahremiyet, işsizlik."]),
O("k2", "2.2", "Teknolojide ontolojik ve aksiyolojik problemler", "Ontological and axiological problems of technology", r"""
# Ontolojik Problemler (varlık ve insan doğası)
- Teknoloji **insanı nasıl dönüştürüyor?** Protezler, implantlar, gen düzenleme insanın sınırlarını değiştiriyor mu?
- **Yapay zekâ:** Makineler düşünebilir mi? **Turing testi** (davranışsal ölçüt) — **Searle'ün Çin Odası** argümanı (sembolleri işlemek anlamak değildir).
- **Sanal gerçeklik:** Gerçek ile sanal arasındaki sınır nedir? (Platon'un mağara alegorisiyle karşılaştırılabilir.)
- **Transhümanizm:** İnsanın **biyolojik sınırlarını** teknolojiyle aşma (yaşlanmayı durdurma, zihinsel güçlendirme) arayışı; **posthümanizm** tartışmaları.

# Aksiyolojik Problemler (değerler)
- Teknoloji **hangi değerleri öne çıkarıyor?** Verimlilik, hız, kontrol ↔ özgürlük, mahremiyet, adalet.
- **Yapay zekâ etiği:** Önyargılı algoritmalar, sorumluluk (otonom araç kaza yaparsa kim sorumlu?), şeffaflık.
- **Biyoetik:** Klonlama, tasarım bebekler, organ nakli.
- **Değer duyarlı tasarım:** Teknolojik ürünlere mahremiyet, erişilebilirlik, adalet gibi değerlerin **baştan** yerleştirilmesi.
- **Dijital eşitsizlik:** Teknolojiye erişimdeki farklar.
""",
  [("'Otonom bir araç kaçınılmaz bir kazada yolcuyu mu, yayaları mı korumalı?' sorusu hangi tür felsefi probleme örnektir?", "**Aksiyolojik (etik)** bir problemdir; teknolojinin tasarımına hangi **değerlerin** ve önceliklerin yerleştirileceğini sorgular (tramvay problemi benzeri).")],
  ["Ontolojik: YZ düşünür mü (Turing, Çin Odası), sanal gerçeklik, transhümanizm.", "Aksiyolojik: verimlilik vs özgürlük-mahremiyet; YZ etiği.", "Değer duyarlı tasarım."]),
]),
U("u3", "3. Ünite: Akıl ve İnanç", "Unit 3: Reason and Faith", [
O("k1", "3.1", "Akıl–inanç ilişkisine yönelik görüşler", "Views on the relationship between reason and faith", r"""
# Temel Soru
Akıl ve inanç **çelişir mi**, yoksa **birbirini tamamlar mı**?

| Görüş | Düşünür | İddia |
|---|---|---|
| **İnanç akıldan üstündür** | **Tertullianus** (kendisine atfedilen: "İnanıyorum çünkü saçma") | İnanç aklın ölçütlerine bağlı değildir |
| **Akıl ve inanç uyumludur** | **Augustinus** ("Anlamak için inanıyorum"), **Anselmus**, **Thomas Aquinas** | Akıl inancı destekler; bazı dinî hakikatler akılla kanıtlanabilir, bazıları (teslis vb.) vahiyle bilinir |
| **İslam felsefesinde uzlaşma** | **Farabi, İbn Sina, İbn Rüşd** (*Faslü'l-Makâl*) | Hakikat hakikate aykırı olamaz; felsefe ve din aynı hakikate farklı yollardan ulaşır |
| **Aklın sınırları** | **Kant** ("İnanca yer açmak için bilgiyi sınırlamak zorunda kaldım"), **Hume** | Tanrı, ruh, özgürlük gibi konular **teorik aklın** sınırları dışındadır |
| **İman bir sıçramadır** | **Kierkegaard** | İman, aklın ötesinde bir **paradoks** ve kişisel bir **sıçrama**dır |
| **Fideizm** | Pascal ("Kalbin aklın bilmediği gerekçeleri vardır") | İnanç akli kanıta ihtiyaç duymaz |
| **Rasyonalist / kanıtçı yaklaşım** | Clifford | Yeterli kanıt olmadan inanmak yanlıştır |
| **Din dilinin analizi** | **Wittgenstein** (dil oyunları) | Dinî ifadeler kendi yaşam biçimi içinde anlam kazanır |

**Pascal'ın Bahsi:** Tanrı'ya inanmanın olası kazancı sonsuz, kaybı sonludur; bu yüzden inanmak akılcı bir tercihtir.
""",
  [("İbn Rüşd'ün din ile felsefe ilişkisine bakışı nedir?", "İbn Rüşd'e göre **hakikat hakikate aykırı olamaz**; felsefe (akıl) ve din (vahiy) aynı hakikati ifade eder. Görünüşteki çelişkiler, dinî metnin **yorumlanmasıyla (tevil)** giderilir.")],
  ["Tertullianus: inanç akıldan bağımsız; Aquinas: uyum.", "Kant: aklın sınırları; Kierkegaard: iman sıçraması.", "İbn Rüşd: hakikat hakikate aykırı olamaz."]),
O("k2", "3.2", "Tanrı'nın varlığına ilişkin argümanlar ve eleştirileri", "Arguments for God's existence and criticisms", r"""
# Klasik Argümanlar ve Eleştirileri

| Argüman | İçerik | Eleştiri |
|---|---|---|
| **Ontolojik** (Anselmus, Descartes) | Tanrı "kendisinden daha büyüğü düşünülemeyen" varlıktır; mükemmellik varlığı içerir | **Gaunilo** (mükemmel ada örneği); **Kant**: "Varlık bir yüklem değildir" |
| **Kozmolojik** (Aristoteles, Farabi, İbn Sina, Aquinas) | Her şeyin bir nedeni vardır; sonsuz geriye gidiş olamaz → **ilk neden / zorunlu varlık**. Kelamcıların **hudûs** delili | **Hume**: İlk nedenin Tanrı olduğu nereden bilinir? Evren kendisi zorunlu olamaz mı? |
| **Teleolojik / tasarım** (Paley — "saatçi") | Evrendeki düzen ve amaçlılık akıllı bir tasarımcıyı gerektirir | **Hume**: Analoji zayıftır; **Darwin**: Doğal seçilim düzeni açıklayabilir |
| **Ahlak** (Kant) | Ahlak yasası, erdem ile mutluluğu birleştirecek Tanrı'yı **koyut** olarak gerektirir | Ahlak Tanrı'dan bağımsız temellendirilebilir mi? |
| **Dinî tecrübe** | Kişinin yaşadığı manevi deneyim Tanrı'ya işaret eder | Öznel ve doğrulanamaz |

# Diğer Problemler
- **Kötülük problemi:** Her şeye gücü yeten ve iyi bir Tanrı varken neden kötülük var? → **Teodise** cevapları: özgür irade (Augustinus), ruhun olgunlaşması (Hick), "mümkün dünyaların en iyisi" (Leibniz).
- **Vahiy ve akıl:** Vahiy akılla denetlenebilir mi?
- **İnanç bir bilgi iddiası mı, kişisel bir tutum mu?** Kanıtçılar (bilgi iddiası) ↔ fideistler ve Wittgenstein (yaşam biçimi).
""",
  [("Kant'ın ontolojik argümana itirazı nedir?", "Kant'a göre **varlık bir yüklem (nitelik) değildir**; bir kavrama 'var' demek ona yeni bir özellik eklemez. Bu yüzden bir kavramdan (mükemmel varlık) onun **gerçekte var olduğu** sonucu çıkarılamaz.")],
  ["Ontolojik (Anselmus) — Kant: varlık yüklem değildir.", "Kozmolojik: ilk neden; teleolojik: tasarım — Hume ve Darwin eleştirisi.", "Kötülük problemi ve teodise."]),
]),
U("u4", "4. Ünite: Edebiyat ve Felsefe", "Unit 4: Literature and Philosophy", [
O("k1", "4.1", "Edebiyat ile felsefe arasındaki ilişki", "The relationship between literature and philosophy", r"""
# Benzerlik ve Farklılıklar

| Felsefe | Edebiyat |
|---|---|
| **Kavram** ve **argüman** temelli | **İmge, anlatı ve duygu** temelli |
| Genel ve soyut | Somut ve tikel (karakter, olay) |
| Akla seslenir | Akla ve duyguya birlikte seslenir |

**Ortak alan:** İnsanın varoluşu, özgürlük, ölüm, anlam, ahlak, adalet.

# Edebi Eserlerde Felsefi Problemler
| Eser | Felsefi tema |
|---|---|
| **Camus – *Yabancı***, *Sisifos Söyleni* | **Absürt**; anlamsız bir dünyada yaşamak |
| **Dostoyevski – *Suç ve Ceza*, *Karamazov Kardeşler*** | Özgürlük, sorumluluk, ahlakın kaynağı ("Tanrı yoksa her şey mubah mı?") |
| **Kafka – *Dönüşüm*, *Dava*** | **Yabancılaşma**, bürokrasi, anlamsızlık |
| **Orwell – *1984*** | İktidar, gözetim, hakikat |
| **Sartre – *Bulantı*** | Varoluşun olumsallığı |
| **Mevlânâ – *Mesnevî*, Yunus Emre** | İnsan, aşk, birlik, hakikat arayışı |
| **Oğuz Atay – *Tutunamayanlar***, **Peyami Safa – *Dokuzuncu Hariciye Koğuşu*** | Birey, yalnızlık, ölüm |

# Edebi Üslupla Yazılmış Felsefe
- **Platon'un diyalogları** (Sokrates'in konuşmaları)
- **Nietzsche – *Böyle Buyurdu Zerdüşt*** (aforizmalar, şiirsel dil)
- **Voltaire – *Candide*** (felsefi roman — Leibniz'in iyimserliğinin hicvi)
- **Farabi, İbn Tufeyl – *Hay bin Yakzan*** (felsefi hikâye)

# Katkılar
Edebiyat felsefi düşünceyi **somutlaştırır**, geniş kitlelere **yayar** ve okurda **empati** ile **eleştirel bilinç** geliştirir; felsefe ise edebiyata **kavramsal derinlik** kazandırır.
""",
  [("Bir roman felsefi bir problemi felsefi bir makaleden nasıl farklı biçimde ele alır?", "Makale problemi **kavramlar ve argümanlarla** genel olarak tartışır. Roman ise problemi **karakterlerin yaşadığı olaylar** üzerinden somutlaştırır, okurun **duygusal olarak** deneyimlemesini sağlar (ör. Raskolnikov'un vicdan azabı).")],
  ["Felsefe kavram ve argüman; edebiyat imge ve anlatı.", "Camus absürt; Dostoyevski özgürlük ve sorumluluk; Kafka yabancılaşma.", "Platon diyalogları, Nietzsche, Hay bin Yakzan: edebi felsefe."]),
]),
U("u5", "5. Ünite: Hayatın Anlamı", "Unit 5: The Meaning of Life", [
O("k1", "5.1", "Hayatın anlamına ilişkin yaklaşımlar", "Approaches to the meaning of life", r"""
# Temel Sorular
Hayatın bir anlamı var mıdır? Varsa **keşfedilir mi**, yoksa **yaratılır mı**? Anlam **nesnel** midir, **öznel** mi?

| Yaklaşım | Temsilci | Görüş |
|---|---|---|
| **Dinî (teistik) yaklaşım** | Augustinus, Gazali, Mevlânâ | Anlam **Tanrı ile ilişkide**, kulluk ve **ahiret** inancında bulunur; hayat bir imtihandır |
| **Erdem etiği** | **Aristoteles** | Anlam, aklın erdemle işlendiği **mutluluk (eudaimonia)** yaşamındadır |
| **Stoacılık** | Epiktetos, Seneca, Marcus Aurelius | **Doğaya ve akla uygun** yaşamak; kontrol edemediğimize değil, edebildiğimize odaklanmak |
| **Epikürcülük** | Epikuros | Ölçülü haz, acıdan ve korkudan kurtulmuş dinginlik (**ataraksia**); "Ölüm bizim için hiçtir." |
| **Nihilizm** | **Nietzsche** ("**Tanrı öldü**" tespiti), Schopenhauer (karamsarlık) | Hayatın **nesnel bir anlamı yoktur**. Nietzsche nihilizmi aşmak için değerlerin yeniden değerlendirilmesini ve "**üstinsan**"ı önerir |
| **Varoluşçuluk** | **Sartre** | "Varoluş özden önce gelir"; anlam önceden verilmemiştir, insan **özgürlüğüyle** kendi anlamını **yaratır** |
| **Absürdizm** | **Camus** | İnsanın anlam arayışı ile dünyanın sessizliği çatışır (**absürt**). Çözüm intihar ya da "felsefi intihar" (umuda kaçış) değil, **başkaldırı**: "Sisifos'u mutlu düşünmek gerekir." |
| **Logoterapi (anlam terapisi)** | **Viktor Frankl** (*İnsanın Anlam Arayışı*) | İnsan, toplama kampındaki acı içinde bile **anlam bulabilir**; anlam bir iş, bir sevgi ya da acıya karşı alınan tutumda bulunur |
""",
  [("Sartre ve dinî yaklaşım hayatın anlamının kaynağı konusunda nasıl ayrışır?", "Dinî yaklaşımda anlam **Tanrı tarafından verilmiştir** ve insan onu keşfeder. Sartre'a göre ise önceden belirlenmiş bir öz veya anlam yoktur; insan anlamı kendi **özgür seçimleriyle yaratır**.")],
  ["Dinî: anlam Tanrı ve ahirette; Aristoteles: eudaimonia.", "Nietzsche: Tanrı öldü, nihilizm, üstinsan; Sartre: anlamı yaratırız.", "Camus: absürt ve başkaldırı; Frankl: acıda bile anlam."]),
]),
U("u6", "6. Ünite: Hukuk ve Felsefe", "Unit 6: Law and Philosophy", [
O("k1", "6.1", "Hukukun doğası, kaynağı ve ahlakla ilişkisi", "The nature and source of law and its relation to morality", r"""
# Hukuk Felsefesi
**Hukuk:** Toplumsal düzeni sağlayan, devlet yaptırımıyla desteklenen normlar sistemi. Hukuk felsefesi hukukun **kaynağını, meşruiyetini, adaletle ilişkisini** ve özgürlükle dengesini sorgular.

**Hukukun gerekliliği:** Hukuk olmadan toplumsal yaşam mümkün müdür? **Hobbes:** Doğa durumunda "**insan insanın kurdudur**", herkesin herkese savaşı vardır; hukuk düzeni güvenlik için zorunludur.

# Hukukun Kaynağı
| | **Doğal hukuk** | **Hukuki pozitivizm** |
|---|---|---|
| Kaynak | **Akıl, insan doğası** ya da Tanrı; evrensel ve değişmez ilkeler | **Devletin koyduğu** kurallar; yetkili makam ve usul |
| Temsilciler | Stoacılar, Cicero, **Thomas Aquinas**, **Locke** (doğal haklar: yaşam, özgürlük, mülkiyet), Grotius | **Hans Kelsen** (saf hukuk teorisi), John Austin, H. L. A. Hart |
| Adaletsiz yasa | "**Adaletsiz yasa yasa değildir**" (Augustinus, Aquinas) | Usulüne uygun konmuşsa **geçerli yasadır**; ahlaki değerlendirme ayrı bir konudur |

> **Rousseau:** Yasalar **genel iradenin** ifadesidir; meşruiyet halkın ortak iradesinden gelir.
> **Radbruch formülü:** Pozitif hukuk esastır; ancak adaletsizlik **katlanılamaz** düzeye ulaşırsa yasa hukuk niteliğini kaybeder.

# Ahlak ve Hukuk
| Ahlak | Hukuk |
|---|---|
| İç denetim (**vicdan**) | Dış denetim (**devlet yaptırımı**) |
| Yaptırımı kınama, pişmanlık | Yaptırımı ceza, tazminat |
| Yazısız olabilir | Genellikle yazılı |

Her ahlaki kural hukuki değildir (yalan söylememek), her hukuki kural da ahlaki içerik taşımaz (trafikte sağdan gitmek).

# Güncel Tartışmalar
- **İnsan hakları:** Evrensel ve devredilemez haklar (1948 İnsan Hakları Evrensel Beyannamesi).
- **Hukukun üstünlüğü:** Yöneticilerin de hukuka bağlı olması.
- **Sivil itaatsizlik:** Adaletsiz bulunan yasaya **açık, şiddetsiz** ve cezayı göze alarak karşı gelmek (**Thoreau, Gandhi, Martin Luther King, Rawls**).
- Pozitivizmin eleştirisi: Nazi döneminin "yasal" uygulamaları sonrası tartışmalar.
""",
  [("Bir doğal hukukçu ile bir hukuki pozitivist, ayrımcılık içeren ama usulüne uygun çıkarılmış bir yasayı nasıl değerlendirir?", "**Doğal hukukçu**: yasa akla ve evrensel adalete aykırı olduğu için **gerçek bir yasa değildir**. **Pozitivist**: yasa yetkili makamca usulüne uygun konduğu için **geçerli hukuktur**; ancak ahlaken eleştirilebilir ve değiştirilmelidir.")],
  ["Hobbes: hukuk olmadan insan insanın kurdu.", "Doğal hukuk (Aquinas, Locke) vs pozitivizm (Kelsen, Hart).", "Ahlak iç denetim, hukuk dış yaptırım; sivil itaatsizlik."]),
]),
]

write("fel-11.js", "11/felsefe", "11. Sınıf Felsefe — konu anlatım notları",
      "kullanıcının verdiği \"11. Sınıf Felsefe Konu Anlatım Notları\" (6 ünite).",
      units, "Kaynak notlar kısa olduğu için her ünite ders kitabı düzeyinde genişletildi (tablolar, düşünürler, argüman–eleştiri eşleşmeleri, örnek sorular). Düzeltmeler: \"İnanıyorum çünkü saçma\" sözü Tertullianus'a atfedilen bir ifadedir; Kelsen doğal hukukçu değil hukuki pozitivisttir.")
