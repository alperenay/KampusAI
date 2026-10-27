# -*- coding: utf-8 -*-
"""10. Sınıf Türk Dili ve Edebiyatı Ders Notları → js/data/content/edb-10.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema: Sözün Ezgisi", "Theme 1: The Melody of Words", [
O("k1", "1.1", "Şiir ve ahenk unsurları", "Poetry and elements of harmony", r"""
# Temanın Odağı

Sözlü kültür ürünlerinden hareketle dilin **zenginliği ve ahengini** keşfetmek; **söz ile müzik** arasındaki ilişkiyi kavramak.

**Anahtar kavramlar:** ahenk, sözlü kültür, kurmaca, ritim, anonim, ezgi, gelenek, varyant, masal anlatıcısı, olağanüstülük, yapı unsurları.

# Şiir

Semboller, çağrışımlar, ritimli sözler ve seslerin ahenkli kullanımıyla oluşan edebî tür; günlük dilden farklı, **imge ve çağrışım** yüklü bir dil kullanır.

# Ahenk Unsurları

| Unsur | Açıklama |
|---|---|
| **Ahenk** | Dize, kelime, hece ve seslerin belirli düzen içinde uyumu |
| **Kafiye (uyak)** | Dize sonlarında benzeşen sesler: yarım (1 ses), tam (2), zengin (3+), cinaslı |
| **Redif** | Dize sonlarında tekrarlanan, **görevi ve anlamı aynı** ek ya da sözcük |
| **Ölçü** | **Hece ölçüsü** (hece sayısı denkliği), **aruz ölçüsü** (hece değeri: açık–kapalı hece denkliği) |
| **Diğer** | Ses tekrarları (aliterasyon, asonans), söz tekrarları, ritim |
""",
  [("\"Gönül ne çıkarsın yüce dağlara / Yol vermez ki karlı dağlar\" gibi bir dizede ahengi sağlayan unsurları nasıl bulursunuz?",
    "Önce dize sonlarındaki tekrar eden ek/sözcükleri (**redif**) ayırırsınız; kalan ses benzerliği **kafiye**dir. Hece sayılarını sayarak **ölçüyü** (ör. 11'li hece), varsa ses tekrarlarını belirlersiniz.")],
  ["Ahenk: kafiye, redif, ölçü, ses ve söz tekrarları.", "Önce redif ayrılır, sonra kafiye bulunur.", "Hece: sayı; aruz: açık-kapalı hece."]),

O("k2", "1.2", "Koşuk ve Türkçenin tarihî seyri", "The koşuk and the historical development of Turkish", r"""
# Koşuk (İslamiyet Öncesi Dönem)

**Toylarda** (şenlik, ziyafet) ya da savaş sonrası eğlencelerde **ozan, kam, baksı** adı verilen şairlerin **kopuz** eşliğinde söylediği şiirlerdir.

| Özellik | Bilgi |
|---|---|
| **Konu** | Aşk, doğa, yiğitlik |
| **Nazım birimi** | Dörtlük |
| **Ölçü** | Hece (genellikle 7'li, 8'li, 11'li) |
| **Kafiye düzeni** | aaab, cccb, dddb… |
| **Karşılığı** | Halk edebiyatında **koşma** |

> İslamiyet öncesi diğer türler: **sagu** (yas şiiri, ağıt), **sav** (atasözü).

# Dilin Tarihî Seyri

Kelimeler zamanla **şekil ve anlam** yönünden değişir:
- **yaşıl → yeşil** (ses değişimi, anlam korunmuş)
- **edgü** (Orhun) → **eygü** (XIV. yy.) → **eyü** (XVIII. yy.) → **iyi** (XX. yy.)

Bu değişimler göçler, inanç değişiklikleri ve kültürlerarası etkileşimle ilişkilidir.
""",
  [("Koşuk ile koşma arasındaki ilişki nedir?", "İkisi de dörtlüklerle, hece ölçüsüyle yazılır ve aşk, doğa, yiğitlik işler. Koşuk İslamiyet öncesi dönemin, **koşma** ise halk edebiyatının (âşık tarzı) karşılığıdır."),],
  ["Koşuk: toy, kopuz, dörtlük, aaab cccb.", "Sagu ağıt, sav atasözüdür.", "edgü → iyi: ses yapısı sadeleşmiş."]),

O("k3", "1.3", "Türkü ve varyantlaşma", "The türkü and variants", r"""
# Türkü

Hece ölçüsünün genellikle **7, 8 ve 11'li** kalıplarıyla, bir **ezgi** eşliğinde söylenen **anonim** halk edebiyatı nazım biçimi. Günümüzde söyleyeni bilinen türküler de vardır. Okuma metni: **"Turnalar"**.

| Bölüm | Açıklama |
|---|---|
| **Bent** | Asıl konunun işlendiği bölüm |
| **Kavuştak (bağlama)** | Bentlerin sonunda tekrarlanan dize(ler) |

### Türkü türleri (konuya göre)
Ağıt, kına türküsü, iş türküsü, askerlik türküsü, ninni…

# Yayılma ve Varyant

Türküler kervanlar, gezgin âşıklar, askerler, savaş ve göçlerle taşınır. Ağızdan ağıza yayılırken anlatıcıya göre değişir.
- **Varyant:** Aslına göre farklılık gösteren benzer metinler. Masal, destan, mâni ve türkülerde görülür.
""",
  [("Aynı türkünün farklı yörelerde farklı sözlerle söylenmesi nasıl açıklanır?", "Türkü **anonimdir** ve **sözlü** aktarılır; her anlatıcı ve yöre küçük değişiklikler yapar. Bu farklı biçimlere **varyant** denir.")],
  ["Türkü: anonim, ezgili, hece ölçülü.", "Bent + kavuştak (bağlama).", "Varyant: sözlü aktarımda oluşan farklı biçim."]),

O("k4", "1.4", "Masal; edebî ve öğretici metinler", "The folk tale; literary and informative texts", r"""
# Masal

Kahramanları **insan, hayvan ve olağanüstü varlıklar** olan; olayları **hayalî**; **zaman ve mekânı belirsiz**; dinleyeni eğlendirirken eğitmeyi amaçlayan tür.

| Bölüm | İşlevi |
|---|---|
| **Döşeme** | Dinleyiciyi hazırlayan kalıplaşmış **tekerleme** ("Evvel zaman içinde…") |
| **Serim** | Olay, kişi, zaman ve mekânın tanıtılması |
| **Düğüm** | Olay ve çatışmaların derinleşmesi |
| **Çözüm** | Olayların sonuca ulaşması |
| **Dilek** | Kapanış tekerlemesi ("Onlar ermiş muradına…") |

# Edebî ve Öğretici Metin

| Edebî (sanatsal) | Öğretici |
|---|---|
| Kurmaca; estetik zevk verir | Gerçekliğe dayanır; bilgi verir |
| Masal, şiir, hikâye, roman | Gezi yazısı, makale, rapor |
""",
  [("Masallar hangi metin grubuna girer, neden?", "**Edebî (sanatsal) metin.** Tamamen kurmacadır, olağanüstü ögeler içerir ve estetik zevk vermeyi amaçlar.")],
  ["Masal: zaman-mekân belirsiz, olağanüstü kahramanlar.", "Döşeme → serim → düğüm → çözüm → dilek.", "Edebî metin kurmaca, öğretici metin gerçek."]),
]),
U("u2", "2. Tema: Kelimelerin Ritmi", "Theme 2: The Rhythm of Words", [
O("k1", "2.1", "Gazel ve aruz ölçüsü — Necâtî Bey", "The gazel and aruz meter — Necâtî Bey", r"""
# Gazel

Divan edebiyatının en yaygın nazım biçimi.

| Özellik | Bilgi |
|---|---|
| **Nazım birimi** | Beyit (genellikle 5–15 beyit) |
| **Kafiye düzeni** | aa, ba, ca, da… |
| **Matla** | İlk beyit |
| **Makta** | Son beyit (şairin **mahlası** geçer) |
| **Beytülgazel** | En güzel beyit |
| **Konu** | Aşk, sevgilinin güzelliği, tabiat, tasavvuf |

# Aruz Ölçüsü

Hecelerin **uzunluk–kısalık** (açık–kapalı hece) değerine dayanan ölçü; şiire musiki kazandırır.

# Necâtî Bey (XV. yy.)

- Zengin kelime hazinesi, özgün imgeler, **yerli söyleyişler**.
- **Sade Türkçe** kullanmaya özen; **atasözü ve deyimleri** divan şiirine başarıyla uyarlar.
- **"Döne döne" redifli gazeli** millîleşme eğiliminin ilk güçlü örneklerindendir; pek çok şaire **nazire** yazdırmıştır.

# Divan Şiirinde Aşk

Beşerî aşktan **ilahî aşka** uzanır. **Âşık** çile çeker, cefaya katlanır; **maşuk** (sevgili) ulaşılmaz ve mağrurdur.
""",
  [("Bir gazelde şairin mahlasının geçtiği beyit hangisidir?", "Son beyit olan **makta**."),
   ("Nazire ne demektir?", "Bir şairin, beğendiği bir şiire **aynı ölçü, kafiye ve redifle** benzer bir şiir yazmasıdır.")],
  ["Gazel: aa ba ca, 5–15 beyit.", "Matla ilk, makta son (mahlas), beytülgazel en güzel beyit.", "Necâtî: sade Türkçe, atasözü; \"döne döne\" redifli gazel."]),

O("k2", "2.2", "Kaside ve Su Kasîdesi — Fuzûlî", "The kaside and the Water Kaside — Fuzûlî", r"""
# Kaside

Din ya da devlet büyüklerini övmek ve dinî konuları işlemek için yazılan nazım biçimi. Kafiye düzeni gazel gibidir (aa, ba, ca…); beyit sayısı genellikle **33–99** arasındadır.

| Bölüm | İçerik |
|---|---|
| **Nesib / Teşbib** | Giriş, tasvir |
| **Girizgâh** | Asıl konuya geçiş beyti |
| **Medhiye** | Övgü |
| **Fahriye** | Şairin kendini övmesi |
| **Dua** | Övülen için iyi dilekler |

### Konuya göre kasideler
**Tevhid** (Allah'ın birliği), **münacat** (Allah'a yakarış), **naat** (Hz. Muhammed'e övgü), **methiye** (büyüklere övgü), **hicviye** (yerme).

# Fuzûlî ve Su Kasîdesi

- XVI. yüzyılın en büyük **lirik** şairi; **Azeri Türkçesiyle** yazdı; aşkı **dert ve ıstırap** kaynağı olarak işledi.
- **Su Kasîdesi** bir **naat**tır: Hz. Muhammed'e duyulan sevgiyi anlatır; **"su" redifi** gözyaşı, susuzluğa derman ve aşkın sembolüdür.
""",
  [("Su Kasîdesi konusu bakımından hangi kaside türüdür?", "**Naat** — Hz. Muhammed'i övmek için yazılmıştır."),],
  ["Kaside: övgü, 33–99 beyit; nesib-girizgâh-medhiye-fahriye-dua.", "Tevhid, münacat, naat, methiye, hicviye.", "Fuzûlî: lirizm, aşk ıstırabı; Su Kasîdesi naat."]),

O("k3", "2.3", "Saf şiir — Necip Fazıl ve \"Kaldırımlar\"", "Pure poetry — Necip Fazıl and \"Kaldırımlar\"", r"""
# Saf (Öz) Şiir Anlayışı

Okura **estetik zevk** vermek; **musiki ve biçim güzelliğini** öne çıkarmak. Şiir anlaşılmak için değil, **duyulmak ve hissedilmek** için yazılır.

# Necip Fazıl Kısakürek (1904–1983)

- **"Kaldırımlar Şairi"**.
- Şiirlerinde **metafizik gerilim, yalnızlık, yabancılaşma** ve mistik ögeler hâkimdir.
- **"Kaldırımlar":** şehir insanının yalnızlığı, sokağın karanlığı, ruhsal bunalım; kaldırımlar **kişileştirilmiştir** (çilekeş yalnızların annesi).

# İmge ve Çağrışım

**İmge:** şairin kelimelere yüklediği yeni anlam ve zihinsel görüntüler. "Kaldırımlar"da **"gözüne mil çekilmiş âmâ evler"**, **"kül rengi bulutlar"** güçlü imgelerdir.
""",
  [("\"Kaldırımlar, çilekeş yalnızların annesi\" ifadesinde hangi söz sanatı vardır?", "Kaldırımlara insana ait \"annelik\" özelliği verilmiştir → **teşhis (kişileştirme)**; aynı zamanda bir benzetme (istiare) içerir.")],
  ["Saf şiir: musiki ve biçim güzelliği.", "Necip Fazıl: metafizik, yalnızlık; \"Kaldırımlar Şairi\".", "İmge: zihinde canlanan yeni anlam."]),

O("k4", "2.4", "Söyleşi (sohbet)", "The causerie (chat essay)", r"""
# Söyleşi (Sohbet)

Yazarın gündelik olayları ya da kültür-sanat konularını **derinlemesine incelemeden**, okurla **karşılıklı konuşuyormuş gibi** samimi bir dille yazdığı gazete/dergi yazılarıdır.

- Doğal ve akıcı anlatım; üslup kaygısından uzak.
- Düşünceleri **kanıtlama zorunluluğu yoktur**; sorular sorarak okuru düşündürür.
- Temsilciler: **Ahmet Rasim**, **Nurullah Ataç**.

| Söyleşi | Deneme | Makale |
|---|---|---|
| Okurla konuşur gibi | Kendi kendine konuşur gibi | Kanıtlamaya çalışır |
| Gündelik konular | Her konu | Bilimsel/ciddi konu |

### Dinleme metni
Divan edebiyatının "donuk ve hayattan kopuk" olduğu ön yargısı tartışılır; divan şiirinin sosyal hayatı, sokakları ve esnafı da yansıttığı gösterilir.
""",
  [("\"Siz hiç sabah ezanıyla uyanıp boğaza karşı çay içtiniz mi? İçmediyseniz bir deneyin derim.\" Bu ifade hangi türe uygundur?", "**Söyleşi** — okurla doğrudan konuşma, samimi ve gündelik anlatım.")],
  ["Söyleşi: okurla sohbet havası, kanıtlama yok.", "Ahmet Rasim, Nurullah Ataç.", "Deneme kendiyle, söyleşi okurla konuşur."]),
]),
U("u3", "3. Tema: Dünden Bugüne", "Theme 3: From Past to Present", [
O("k1", "3.1", "Destan geleneği ve motif", "The epic tradition and motifs", r"""
# Destan

Milletleri derinden etkileyen olayların (savaş, göç, kıtlık, kahramanlık) anlatıldığı, **sözlü kültürün en eski** ürünleri.

| Doğal destan | Yapma destan |
|---|---|
| **Anonim**; halkın ortak hafızasında oluşur, sonra derlenir | Tarihî bir olayın bir **şair** tarafından destan kurallarına göre yazılması |
| Oğuz Kağan, Manas, Ergenekon | **Üç Şehitler Destanı** (F. N. Çamlıbel), **Kurtuluş Savaşı Destanı** (Nâzım Hikmet) |

# Motif

Olayların gelişimine yön veren **simgesel ögeler**: ışık, **kurt**, ağaç, su, kement… Oğuz Kağan Destanı'nda **gök yeleli kurt** orduya yol gösterir.

# Destan Oluşum Evreleri
1. Çıkış (olay) → 2. Yayılma → 3. Derleme (yazıya geçirilme)
""",
  [("Üç Şehitler Destanı doğal destan mıdır?", "Hayır. Bilinen bir şair (Faruk Nafiz) tarafından yazıldığı için **yapma destandır**.")],
  ["Doğal destan anonim, yapma destan şaire ait.", "Motif: kurt, ışık, ağaç gibi simgesel ögeler.", "Destan: çıkış → yayılma → derleme."]),

O("k2", "3.2", "Oğuz Kağan Destanı", "The Oğuz Kağan Epic", r"""
# Oğuz Kağan Destanı

Türk milletinin kökenini, **boy teşkilatını** ve kahramanlık anlayışını yansıtan en önemli ulusal destanlardan biri.

**Konusu:** Oğuz Kağan'ın olağanüstü doğumu ve büyümesi, halkı korkutan **gergedanı** öldürmesi, gök yeleli kurdun rehberliğinde seferleri ve ülkeyi **oğulları arasında paylaştırması**.

| Özellik | Açıklama |
|---|---|
| **Alp tipi** | Yiğit, cesur, halkını koruyan, adaletli lider |
| **Yaşam** | Atlı-göçebe yaşam, doğayla mücadele, boylar arası ilişkiler |
| **Ad verme** | **Karluk, Kıpçak, Kalaç** gibi boy adlarının nasıl ortaya çıktığı efsanelerle açıklanır |
| **Olağanüstülük** | Doğumu, hızlı büyümesi, kurt motifi |

# Gerçeklik ve Kurmaca
Destanlar tarihî olaylardan izler taşır ama **olağanüstü ve mitolojik ögelerle kurgulanır** → kurmaca metinlerdir.
""",
  [("Oğuz Kağan Destanı'nda \"kurt\" motifinin işlevi nedir?", "Gök yeleli kurt, Oğuz Kağan'ın ordusuna **yol gösterir**; Türk kültüründe kılavuzluk ve kutsallık sembolüdür.")],
  ["Alp tipi: yiğit, adaletli lider.", "Gergedan mücadelesi, kurt rehberliği, ülkenin paylaştırılması.", "Boy adları efsanelerle açıklanır."]),

O("k3", "3.3", "Mesnevi ve Harnâme — Şeyhî", "The mesnevi and Harnâme — Şeyhî", r"""
# Mesnevi

Divan edebiyatında **her beyti kendi içinde kafiyeli** (aa, bb, cc…) nazım biçimi. Beyit sayısı **sınırsız** olduğu için uzun hikâyeler, destanlar ve felsefi eserler mesneviyle yazılır.

**Bölümleri:** Dibace (önsöz), tevhid, münacat, naat, miraciye, methiye, **âğâz-ı dâstân** (asıl hikâye), hâtime (son söz).

# Şeyhî ve Harnâme (Eşeknâme)

- XV. yüzyıl divan şairi Şeyhî'nin eseri; Türk edebiyatının ilk ve en güçlü **hiciv** örneklerinden biri.
- **Konusu:** Çalışmaktan zayıf düşmüş bir eşek, öküzlerin rahat yaşamına özenerek **boynuz** ister; tarlaya girer, **kulaklarından ve kuyruğundan** olur.
- "**Boynuz umarken kulaktan olmak**" deyiminin hikâyesidir.
- Hayvanlar aracılığıyla eleştiri yapıldığı için **fabl** özelliği de taşır.
""",
  [("Harnâme'nin ders verici yönü nedir?", "Elindekinin değerini bilmeden başkasının durumuna özenmenin insana zarar verebileceği; **açgözlülük** eleştirisi (boynuz umarken kulaktan olmak).")],
  ["Mesnevi: aa bb cc, beyit sayısı sınırsız.", "Harnâme: Şeyhî, hiciv, eşek hikâyesi.", "\"Boynuz umarken kulaktan olmak.\""]),

O("k4", "3.4", "Fabl — Mevlana", "The fable — Rumi", r"""
# Fabl

Kahramanları çoğunlukla **hayvanlar** olan (**teşhis ve intak** sanatıyla), sonunda **ahlaki ders** veren manzum ya da mensur hikâyeler.

| Bölüm | |
|---|---|
| Serim | Kişiler ve durum |
| Düğüm | Olayın gelişmesi |
| Çözüm | Sonuç |
| **Ders (öğüt)** | Ahlaki sonuç |

- **Mevlana Celâleddin-i Rûmî**'nin **Mesnevî**'si pek çok hayvan hikâyesiyle Doğu fabl geleneğinin en önemli örneğidir ("Aslan ve Av Hayvanları").
- Batı'da **Ezop** ve **La Fontaine**; Doğu'da **Kelile ve Dimne**.
- Fabllarda açgözlülük, kibir, adalet, hırs, yardımlaşma gibi **evrensel** değerler işlenir.
""",
  [("Fabllarda hayvanların konuşturulması hangi söz sanatlarıyla açıklanır?", "Hayvanlara insan özellikleri verme **teşhis**, konuşturma **intak**tır.")],
  ["Fabl: hayvan kahramanlar + ahlaki ders.", "Mevlana Mesnevî; La Fontaine; Kelile ve Dimne.", "Teşhis ve intak sanatı."]),
]),
U("u4", "4. Tema: Nesillerin Mirası", "Theme 4: The Legacy of Generations", [
O("k1", "4.1", "Dede Korkut Hikâyeleri", "The Book of Dede Korkut", r"""
# Dede Korkut Hikâyeleri

**Destan geleneğinden halk hikâyeciliğine geçişin köprüsü** sayılır.

| Özellik | Bilgi |
|---|---|
| **Yapı** | Bir **giriş (mukaddime)** ve **12 hikâye (boy)** (Dresden nüshası) |
| **Konu** | Oğuzların kendi iç mücadeleleri ve Rum, Abaza, Gürcülerle savaşları |
| **Anlatım** | **Nazım ve nesir iç içe**; soylama denen şiirli bölümler |
| **Dede Korkut** | Hikâyenin sonunda ortaya çıkar, **dua eder**, kopuz çalar, kahramana **ad koyar** |

### Okuma metni: Salur Kazan'ın Yedi Başlı Ejderhayı Öldürdüğü Boy
Salur Kazan'ın **olağanüstü bir varlıkla** mücadelesi; Türk inanç dünyasındaki kahramanlık erdemleri.

### Değerler
Ad koyma geleneği, aile ve büyüklere saygı, misafirperverlik, vatan sevgisi, kadının toplumdaki saygın yeri.
""",
  [("Dede Korkut Hikâyeleri neden destan ile halk hikâyesi arasında köprü sayılır?", "Destanın olağanüstülük ve kahramanlık ögelerini taşırken **nazım-nesir karışık** anlatımı ve daha **gerçekçi** toplumsal yaşamıyla halk hikâyesine yaklaşır.")],
  ["Giriş + 12 hikâye (Dresden).", "Nazım-nesir karışık; Dede Korkut dua eder, ad koyar.", "Destandan halk hikâyesine geçiş."]),

O("k2", "4.2", "Tanzimat şiiri — Namık Kemal ve Hürriyet Kasîdesi", "Tanzimat poetry — Namık Kemal's Ode to Liberty", r"""
# Tanzimat Dönemi (1839 sonrası)

**Tanzimat Fermanı** ile edebiyatta **Batı etkisi** başladı; **vatan, hürriyet, adalet, eşitlik** gibi yeni kavramlar edebiyata girdi. 1. dönem sanatçıları **"toplum için sanat"** anlayışını benimsedi.

# Namık Kemal ve Hürriyet Kasîdesi

- **"Vatan ve Hürriyet Şairi"**.
- **Kaside** nazım biçimini (eski şekil) kullanarak **hürriyet, adalet, millet** gibi yeni toplumsal-siyasi fikirleri (yeni içerik) işledi.
- Geleneksel kasideler padişah ve devlet büyüklerine yazılırken bu kaside doğrudan **"hürriyet"** kavramına yazılmıştır.

> **Eski şekil – yeni muhteva:** Tanzimat 1. dönem şairleri gazel, kaside gibi eski biçimleri korumuş ama içlerini yeni Batılı fikirlerle doldurmuştur.
""",
  [("\"Eski şekil – yeni muhteva\" ifadesini Hürriyet Kasîdesi üzerinden açıklayın.", "Şekil olarak divan edebiyatının **kaside** biçimi (aruz, beyit, aa-ba kafiye) kullanılmış; içerik olarak ise övgü yerine **hürriyet, adalet** gibi Tanzimat'la gelen yeni kavramlar işlenmiştir.")],
  ["Tanzimat: Batı etkisi, toplum için sanat.", "Namık Kemal: vatan ve hürriyet şairi.", "Eski şekil (kaside) – yeni içerik (hürriyet)."]),

O("k3", "4.3", "Millî Edebiyat hikâyesi — Ömer Seyfettin", "National Literature short story — Ömer Seyfettin", r"""
# Millî Edebiyat Dönemi (1911–1923)

1911'de **Genç Kalemler** dergisinde yayımlanan **"Yeni Lisan"** makalesiyle başlar.
- **Dilde sadeleşme**; **İstanbul Türkçesi** esas alınır.
- Konular **Anadolu**dan ve **millî tarihten** seçilir; **hece ölçüsü** benimsenir.

# Ömer Seyfettin ve "Kaç Yerinden"

- **Olay (Maupassant tarzı) hikâyesinin** Türk edebiyatındaki kurucusu.
- **"Kaç Yerinden":** Millî Mücadele dönemindeki vatan sevgisi ve **gazilik** kavramı; eski destan kahramanları ile yeni dönemin fedakâr subayları karşılaştırılır.
- Mekân, zaman ve kişiler **gerçekçi** bir zemindedir.

| Olay hikâyesi | Durum hikâyesi |
|---|---|
| Giriş–gelişme–sonuç, merak unsuru | Hayattan kesit, serim-düğüm-çözüm zorunlu değil |
| Ömer Seyfettin | Sait Faik, Memduh Şevket Esendal |
""",
  [("Millî Edebiyat döneminin dil anlayışı nedir?", "**Sade Türkçe**; yabancı dil kurallarını ve tamlamaları atmak, **İstanbul Türkçesini** esas almak (\"Yeni Lisan\").")],
  ["Millî Edebiyat: 1911, Yeni Lisan, Genç Kalemler.", "Dilde sadeleşme, Anadolu ve millî konular.", "Ömer Seyfettin: olay hikâyesinin ustası."]),

O("k4", "4.4", "Fiillerin yapısı ve metin karşılaştırma; atölyeler", "Verb structure, comparing texts; workshops", r"""
# Fiillerin Yapısı

| Yapı | Açıklama | Örnek |
|---|---|---|
| **Basit fiil** | Yapım eki almamış kök | gel-di, bak-tı |
| **Türemiş fiil** | Yapım eki almış | başla-dı (baş+la), sula-dı (su+la) |
| **Birleşik fiil** | Birden çok sözcüğün birleşmesi | hisset-ti, kaybol-du, affet-mek, yardım et-mek |

# Dönemler Arası Karşılaştırma

Dede Korkut ile bir Servet-i Fünun romanı (Mai ve Siyah) ya da Hürriyet Kasîdesi ile Cumhuriyet şiiri karşılaştırıldığında **zihniyet ve dil değişimi** açıkça görülür.

> Tüm edebî metinler kurmacadır; ama tarihî romanlar ve Millî Mücadele hikâyeleri gerçek toplumsal olaylarla sıkı bağ kurar.

# Atölye ve Performans Görevleri

- **Şiir dinletisi** hazırlama (tema, şiir seçimi, fon müziği, prova)
- **Öğretici metni edebî metne dönüştürme**
- **Podcast** ile edebiyat şahsiyetlerini tanıtma
- **Dede Korkut canlandırma** ve **fabl yazma**
- Dereceli puanlama anahtarı, kontrol listesi, akran değerlendirmesi
""",
  [("\"Kalbim sevinçle doldu, birden hisler beni yoklayıp kayboldu.\" cümlesindeki fiillerin yapısını belirleyin.",
    "**dol-du**: basit; **yokla-yıp** (yok+la): türemiş; **kaybol-du** (kayıp + ol): birleşik.")],
  ["Basit: kök; türemiş: yapım eki; birleşik: birden çok sözcük.", "Dönemler arası karşılaştırmada zihniyet ve dil değişir.", "Atölyeler: dinleti, podcast, fabl yazma."]),
]),
]

from _ek136 import uygula136; uygula136(units, "edb10")

from ek_genel import uygula; uygula(units, "edb10_ek142")  # 1.43: TYT Türkçe anlam ve dil bilgisi

write("edb-10.js", "10/edebiyat", "10. Sınıf Türk Dili ve Edebiyatı — ders notları ve kazanım analizi",
      "kullanıcının verdiği \"10. Sınıf Türk Dili ve Edebiyatı Kapsamlı Ders Notları ve Kazanım Analizi\" (4 tema).",
      units, "Kaynaktaki bazı bilgiler düzeltildi (Dede Korkut: giriş + 12 hikâye; kaside 33–99 beyit). Tablolar ve örnek sorular eklendi.")
