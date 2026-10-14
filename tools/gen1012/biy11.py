# -*- coding: utf-8 -*-
"""11. Sınıf Biyoloji kapsamlı notlar → js/data/content/biy-11.js"""
from _c import O, U, write

units = [
U("u1", "1. Tema (A): Canlılarda ve Bitkilerde Tepki", "Theme 1 (A): Responses in Organisms and Plants", [
O("k1", "1.1", "Canlıların uyaranlara tepki mekanizmaları", "How organisms respond to stimuli", r"""
# Tepki Sürecinin Evrensel Basamakları

Canlılar iç ve dış ortamdaki fiziksel ya da kimyasal değişimleri (**uyaran**: ışık, sıcaklık, basınç, su, kimyasallar) algılayıp yanıt verir; bu, hayatta kalmayı ve **adaptasyonu** kolaylaştırır.

1. **Uyarının alınması:** Hücre ya da özel yapılar (**reseptörler**) değişimi algılar.
2. **Uyarının işlenmesi:** Bilgi değerlendirilir (sinir sistemi, kimyasal haberleşme).
3. **Tepki (yanıt):** Uygun hücre, doku ya da organ etkinleşir.

- **Hayvanlarda:** Sinir sistemi + hormonlar → hızlı tepki.
- **Bitkilerde:** Sinir sistemi yok → **elektriksel sinyaller, turgor basıncı değişimi, hormonlar**.

**Hormon:** Düşük derişimde üretilen, hedef hücrelere ulaşıp **özgül** yanıt oluşturan kimyasal haberci.

# Tepki Örnekleri

| Canlı | Tepki |
|---|---|
| **Öglena** | **Göz lekesi** ile ışığı algılar, fotosentez için ışığa yönelir |
| **Amip** | Işıktan uzaklaşır, loş ortamı tercih eder |
| **Venüs sinekkapan, güneşgülü** | Tüylere dokunulunca **sismonasti** ve turgor değişimiyle kapanır; böceği sindirerek **azot** gibi mineralleri karşılar |
| **Uyku çiçeği** | Yapraklarını gündüz açar, gece kapatır |
| **Denizşakayığı** | Dokunulunca gövdesini büzer, tentaküllerini çeker |
| **Elektrikli yılan balığı** | Tehlikede elektrik boşaltır |
| **Baykuş** | Az ışıkta göz bebeği genişler |
| **Köpek** | Koku reseptörleriyle iz sürer, tükürük salgılar |
""",
  [("Böcekçil bitkilerin böcek yakalamasının adaptif değeri nedir?", "Bu bitkiler genellikle **azotça fakir** topraklarda yaşar. Fotosentezle besin üretebilirler ama protein sentezi için gereken **azot ve mineralleri** böceklerden sağlarlar.")],
  ["Tepki: alma → işleme → yanıt.", "Hayvan: sinir + hormon; bitki: elektriksel sinyal, turgor, hormon.", "Öglena ışığa yönelir, amip kaçar."]),
O("k2", "1.2", "Bitkisel hormonlar", "Plant hormones", r"""
# Bitkisel Hormonlar

Aktif büyüyen **kök ve gövde uçlarında**, tomurcuk, tohum, meyve ve genç yapraklarda üretilir; **iletim demetleri** ya da **difüzyon** ile taşınır.

| Hormon | Üretim yeri | Etkileri | Tarımsal kullanım |
|---|---|---|---|
| **Oksin** | Sürgün ucu, genç yapraklar | Hücre **boyca uzaması**, fototropizma (gölgede birikir), **yan kök** oluşumu, meyve gelişimi (çilekte akenler); **tepe baskınlığı** (yan tomurcukları baskılar) | Çeliklerin köklendirilmesi, **çekirdeksiz meyve** |
| **Sitokinin** | Kök, aktif büyüyen dokular | **Sitokinez**, yan tomurcukların gelişmesi (**dallanma**), klorofil sentezi, **yaşlanmayı geciktirme** | Kesme çiçek ve sebzelerin raf ömrünü uzatma |
| **Giberellin** | Genç yaprak, tohum | **Tohum çimlenmesi**, dormansinin kırılması, **gövde uzaması** (eksikliğinde cücelik), çiçeklenme | Üzüm tanelerinin irileşmesi ve seyreltilmesi |
| **Absisik asit (ABA)** | Yaprak, tohum | **Stres hormonu**: kuraklıkta **stomaları kapatır**; tomurcuk ve tohum **dormansisini** sağlar; büyümeyi engeller | — |
| **Etilen** | Tüm organlar; en çok **olgunlaşan meyve** ve yaşlı doku | **Gaz** hâlinde tek hormon; meyve **olgunlaşması** (nişasta → şeker, yumuşama), yaprak ve meyve **dökümü** | Ham meyvelerin yapay olgunlaştırılması |

> **Etkileşim:** Oksin/sitokinin oranı kök ve sürgün gelişimini belirler (oksin ↑ → kök; sitokinin ↑ → sürgün). Giberellin ile ABA çimlenmede **zıt** etki gösterir.

**Bitki gelişim düzenleyicileri (BGD):** Doğal ya da sentetik; yanlış ve aşırı kullanımı insan sağlığına ve ekosisteme zarar verebilir.
""",
  [("Bir torbaya olgun bir muzla birlikte ham avokado konulursa ne olur? Neden?", "Avokado **daha hızlı olgunlaşır**. Olgun muz **etilen** gazı yayar; gaz difüzyonla avokadoya ulaşarak olgunlaşmayı hızlandırır."),
   ("Kurak bir günde yapraklardaki stomaların kapanmasını hangi hormon sağlar?", "**Absisik asit (ABA)**; su kaybını azaltır.")],
  ["Oksin uzama ve yönelim; sitokinin bölünme ve dallanma.", "Giberellin çimlenme ve boy; ABA stres ve dormansi.", "Etilen gaz hâlinde; olgunlaşma ve döküm."]),
O("k3", "1.3", "Bitkilerde hareket: tropizma, nasti ve koleoptil deneyleri", "Plant movements: tropisms, nastic movements and coleoptile experiments", r"""
# Tropizma (Yönelim)
Uyaranın **yönüne bağlı** büyüme hareketleri; **oksin** kontrolünde, **geri dönüşümsüz**. Uyarana doğru **(+)**, ters yönde **(−)**.

| Tür | Uyaran | Örnek |
|---|---|---|
| **Fototropizma** | Işık | Gövde (+), kök (−) |
| **Geotropizma (gravitropizma)** | Yer çekimi | Kök (+), gövde (−) |
| **Hidrotropizma** | Su | Kök suya doğru (+); çoğu durumda geotropizmaya baskın gelir |
| **Kemotropizma** | Kimyasal | Kök gübreye (+), tuz ve kireçten uzak (−); polen tüpünün yumurtalığa yönelmesi |
| **Tigmotropizma (haptotropizma)** | Dokunma | Sarmaşık ve asma dallarının desteğe sarılması |

# Nasti (Irganım)
Uyaranın **yönünden bağımsız**; çoğunlukla **turgor basıncı** değişimiyle, hızlı ve **geri dönüşümlü**. (+)/(−) yoktur.

| Tür | Uyaran | Örnek |
|---|---|---|
| **Fotonasti** | Işık şiddeti | Akşamsefası çiçeklerinin loşlukta açılması |
| **Sismonasti** | Dokunma, sarsıntı | **Küstüm otu**, Venüs sinekkapan |
| **Termonasti** | Sıcaklık | **Lale** çiçeklerinin ılıkta açılıp soğukta kapanması |

# Koleoptil Deneyleri ve Oksinin Keşfi
**Koleoptil:** Tahıl fidelerinin ilk yaprağını saran kılıf.

| Deney | Yapılan | Sonuç |
|---|---|---|
| **Darwin'ler (1880)** | Uç kesildi ya da opak başlıkla kapatıldı → yönelim **yok**; saydam başlık ya da tabanı örten opak kılıf → yönelim **var** | Işığı **koleoptil ucu** algılar |
| **Boysen-Jensen (1913)** | Uç ile gövde arasına **mika** → yönelim yok; **jelatin** → yönelim var | Sinyal **hareketli bir kimyasal**dır |
| **Paal (1918)** | Kesilen uç gövdenin bir yanına konuldu (karanlıkta) | Kimyasalın biriktiği **karşı** yöne bükülme |
| **Went (1926)** | Uçlar **agar** üzerinde bekletildi, agar gövdenin bir yanına kondu | Karanlıkta bile bükülme → maddeye **oksin** adı verildi |

**Mekanizma:** Tek yönlü ışıkta oksin **gölge tarafa** taşınır → gölge taraftaki hücreler daha çok uzar → gövde **ışığa doğru** bükülür.

> Kökte yüksek oksin derişimi büyümeyi **yavaşlatır**; bu yüzden kök ve gövde aynı uyarana zıt yönelir.
""",
  [("Pencere kenarındaki bir saksı bitkisinin gövdesi pencereye doğru eğilmişse, gövdenin hangi tarafındaki hücreler daha uzundur? Neden?", "**Pencereye uzak (gölge) taraftaki** hücreler daha uzundur. Oksin gölge tarafta birikir ve orada hücre uzamasını artırır, gövde ışığa doğru bükülür."),
   ("Küstüm otunun yapraklarını kapatması neden tropizma değil nastidir?", "Hareket uyaranın **yönüne bağlı değildir**, **turgor basıncındaki** ani değişimle olur ve **geri dönüşümlüdür**; büyümeye dayalı değildir.")],
  ["Tropizma: yöne bağlı, büyüme, oksin, (+)/(−).", "Nasti: yönden bağımsız, turgor, geri dönüşümlü.", "Darwin uç, Boysen-Jensen kimyasal, Went oksin."]),
]),
U("u2", "1. Tema (B): Hayvanlarda Tepki — Sinir Sistemi ve Duyular", "Theme 1 (B): Animal Responses — Nervous System and Senses", [
O("k1", "1.5a", "Duyu reseptörleri, nöron yapısı, impuls ve sinaps", "Sensory receptors, neurons, impulses and synapses", r"""
# Duyu Reseptörleri
| Reseptör | Algıladığı | Yer |
|---|---|---|
| **Mekanoreseptör** | Dokunma, basınç, gerilme, ses | Deri, kulak |
| **Kemoreseptör** | Kimyasallar, koku, tat | Burun, dil, damarlar |
| **Termoreseptör** | Sıcaklık | Deri, hipotalamus |
| **Nosiseptör (ağrı)** | Doku hasarı, aşırı sıcak, kimyasal | **Beyin dokusu hariç** tüm vücut |
| **Elektromanyetik / fotoreseptör** | Işık, elektrik, manyetizma | Gözde **çubuk ve koni** hücreleri |

Hayvanlarda örnekler: **yayın balığı** tüm vücuduyla tat alır; **yusufçuk** ~30 bin gözcüklü bileşik gözüyle hareketi çok iyi algılar; **yunuslar** ekolokasyon kullanır; **çukur engerekler** pit organlarıyla avın ısısını algılar.

# Nöronun Yapısı
- **Hücre gövdesi:** Çekirdek, mitokondri, nörofibriller.
- **Dendrit:** Uyartıyı gövdeye taşıyan kısa, çok sayıda uzantı.
- **Akson:** Uyartıyı diğer hücreye ileten uzun uzantı.
- **Miyelin kılıf:** Çevresel sinir sisteminde **Schwann**, merkezî sinir sisteminde **oligodendrosit** hücrelerince oluşturulan yalıtkan örtü.
- **Ranvier boğumu:** Miyelinin kesintili olduğu yer → **sıçrayarak (atlamalı) iletim** → hız artar.
- İletim yönü: **Dendrit → hücre gövdesi → akson ucu**.

# Uyartı İletimi (Elektrokimyasal)
| Evre | Olay | Zar |
|---|---|---|
| **Polarizasyon (dinlenme)** | Na⁺-K⁺ pompası (ATP) 3 Na⁺ dışarı, 2 K⁺ içeri | Dış (+), iç (−) ≈ −70 mV |
| **Depolarizasyon** | Na⁺ kanalları açılır, **Na⁺ içeri** girer | İç (+) — aksiyon potansiyeli |
| **Repolarizasyon** | K⁺ kanalları açılır, **K⁺ dışarı** çıkar | İç tekrar (−) |
| Dinlenmeye dönüş | Na⁺-K⁺ pompası iyon dağılımını eski hâline getirir | ATP harcanır |

**Ya hep ya hiç:** Tek nöron ya da kas teli **eşik altı** uyarana yanıt vermez; eşik ve üzeri uyaranlara **aynı şiddette** yanıt verir. Sinir demetinde eşikleri farklı aksonlar olduğu için **merdiven etkisi** görülür.

# Sinaps
1. Akson ucuna gelen uyartı, keseciklerdeki **nörotransmitterleri** (asetilkolin, dopamin, serotonin…) **ekzositozla** sinaps boşluğuna bırakır.
2. Nörotransmitter karşı hücrenin **reseptörlerine** bağlanır.
3. Karşı hücrede yeni aksiyon potansiyeli başlar (**uyarıcı** sinaps) ya da baskılanır (**engelleyici** sinaps).
4. Nörotransmitter **enzimle parçalanır** ya da geri alınır.

Sinapslar iletimi **tek yönlü** kılar ve bir miktar **yavaşlatır**.
""",
  [("Miyelinli nöronlarda iletimin daha hızlı olmasının nedeni nedir?", "Miyelin **yalıtkandır**; aksiyon potansiyeli yalnızca **Ranvier boğumlarında** oluşur ve uyartı boğumdan boğuma **sıçrayarak** ilerler."),
   ("Bir nöronda dinlenme hâlinde ATP üretimi durursa ne olur?", "**Na⁺-K⁺ pompası** çalışamaz; iyon dağılımı zamanla eşitlenir, dinlenme potansiyeli kaybolur ve nöron yeni uyartı iletemez hâle gelir.")],
  ["Reseptörler: mekano, kemo, termo, nosi, foto.", "Depolarizasyon Na⁺ içeri; repolarizasyon K⁺ dışarı; pompa ATP harcar.", "Sinaps: nörotransmitter, tek yönlü iletim."]),
O("k2", "1.5b", "İnsanda duyu organları: göz, kulak, burun, dil, deri", "Human sense organs", r"""
# Göz
| Tabaka | Yapılar |
|---|---|
| **Sert tabaka (sklera)** | Dışta beyaz bağ doku; önde saydam **kornea** (ışığı ilk kıran yer) |
| **Damar tabaka (koroid)** | Kan damarları ve pigment (yansımayı önler); önde renkli **iris** ve **göz bebeği**; arkasında **göz merceği** (yakınsak) |
| **Ağ tabaka (retina)** | **Çubuk** (loş ışık, siyah-beyaz, **rodopsin** – A vitamini) ve **koni** (renkli görme) hücreleri; **sarı benek** (net görüntü), **kör nokta** (optik sinirin çıktığı yer, reseptör yok) |

**Görme yolu:** Işık → kornea → göz bebeği → mercek → camsı cisim → **retinada ters ve küçük görüntü** → optik sinir → **talamus** → beyin kabuğunun görme merkezi (**düz** algılanır).

**Uyum:** Uzağa bakarken kirpiksi kaslar gevşer, mercek **incelir**; yakına bakarken kaslar kasılır, mercek **kalınlaşır**.

# Kulak
- **Dış kulak:** Kulak kepçesi, kulak yolu, **kulak zarı**.
- **Orta kulak:** **Çekiç–örs–üzengi** (titreşimi güçlendirir); **östaki borusu** yutağa açılır, zarın iki yüzündeki basıncı dengeler.
- **İç kulak:** **Salyangoz** (kohlea; vestibüler, kohlear, timpanik kanal; **Corti organı**), **dalız** (tulumcuk + kesecik, **otolitler**) ve **yarım daire kanalları** (denge).

**İşitme yolu:** Ses → kepçe → kulak yolu → kulak zarı → çekiç–örs–üzengi → **oval pencere** → salyangoz sıvısı → **temel zar** titreşimi → Corti organı tüylü hücreleri (tüyler örtü zarına sürtünür) → işitme siniri → talamus → işitme merkezi.

# Burun ve Dil
- **Burun:** Üst kısımdaki **sarı bölgede** koku reseptörleri; moleküller **mukusta çözünür**. Koku uyartıları **talamusa uğramadan** koku merkezine gider; reseptörler **çabuk adapte** olur.
- **Dil:** **Tat tomurcukları** (papillalarda); beş temel tat: **tatlı, tuzlu, ekşi, acı, umami**. Moleküller **sıvıda çözünmelidir**.

# Deri
- **Üst deri (epidermis):** Korun (ölü, keratinli) ve **Malpighi** tabakası (canlı, bölünen, **melanin**).
- **Alt deri (dermis):** Kan damarları, ter ve yağ bezleri, kıl kökü, reseptörler.
- Reseptörler: **Meissner** (dokunma), **Merkel** (hafif dokunma), **Pacini** (basınç), **Ruffini** (sıcak), **Krause** (soğuk), **serbest sinir uçları** (ağrı).
""",
  [("Kör noktaya düşen görüntü neden algılanmaz?", "Kör nokta, optik sinirin gözü terk ettiği yerdir; burada **çubuk ve koni hücreleri bulunmaz**, ışık reseptörle algılanamaz."),
   ("Uçak inerken kulakta tıkanma hissi olmasının nedeni ve çözümü nedir?", "Dış ortam basıncı hızla değişir, kulak zarının iki yanındaki basınç eşitsizleşir. **Yutkunmak ya da esnemek östaki borusunu açar** ve basınç dengelenir.")],
  ["Göz: sklera-kornea, koroid-iris-mercek, retina (çubuk, koni).", "Kulak: çekiç-örs-üzengi, Corti organı işitme; yarım daire kanalları denge.", "Koku talamusa uğramaz; 5 temel tat."]),
O("k3", "1.6", "Hayvanlarda ve insanda sinir sistemi, refleks", "Nervous systems in animals and humans; reflexes", r"""
# Omurgasızlarda Sinir Sistemi
| Grup | Sistem |
|---|---|
| **Süngerler** | Sinir hücresi **yok** |
| **Sölenterler** (denizanası, hidra) | **Ağ (sinir ağı)** sinir sistemi; uyartı her yöne yayılır |
| **Yassı solucan, halkalı solucan, eklembacaklılar** | Başta **gangliyonlar** (ilkel beyin) + **ip merdiven** sinir sistemi; daha hızlı, yönlendirilmiş tepki |

# Omurgalılar
Sinir şeridi **sırt (dorsal)** tarafta. **Merkezî** (beyin + omurilik) ve **çevresel** sinir sistemi. Balıklardan memelilere beyin büyür ve kıvrımlaşır; memelilerde **beyin kabuğu çok kıvrımlı** → öğrenme, hafıza, problem çözme.

# İnsan Beyni
Beyin **meninges** zarlarıyla (sert zar, örümceksi zar, ince zar) korunur; aralarındaki **beyin-omurilik sıvısı (BOS)** besler ve darbelere karşı korur.

| Bölüm | Görevler |
|---|---|
| **Uç beyin** (ön beyin) | İki yarım küre (**nasırlı cisim** ile bağlı); dışta **gri madde (korteks)**, içte ak madde. Düşünme, bilinç, öğrenme, hafıza, istemli hareket, duyuların değerlendirilmesi |
| **Talamus** (ara beyin) | **Koku hariç** duyuların korteks öncesi aktarma merkezi |
| **Hipotalamus** (ara beyin) | **Homeostazi**: vücut sıcaklığı, açlık-tokluk, su dengesi, uyku; **hipofizi** kontrol eder |
| **Orta beyin** | Kas tonusu, duruş, **göz bebeği** refleksi, sese yönelme |
| **Beyincik** | **Denge** ve hareketlerin **koordinasyonu** |
| **Pons** | Beyincik yarım kürelerini bağlar; **solunum ritmi** |
| **Omurilik soğanı** | **Hayati merkezler**: solunum, kalp atışı, kan basıncı; yutma, öksürme, hapşırma refleksleri; sinirler burada **çaprazlaşır** |

# Omurilik
Kesitte **içte gri madde** (kelebek şeklinde), **dışta ak madde** (beynin tersi). **Sırt kökü** duyu girişi, **karın kökü** motor çıkışı. Görev: **refleks merkezi** ve beyin–vücut iletimi.

# Çevresel Sinir Sistemi
**12 çift kafa** siniri, **31 çift omurilik** siniri.
- **Somatik:** İstemli, **iskelet kasları** (koşmak, yazmak).
- **Otonom:** İstemsiz; iç organlar, düz kas, kalp, bezler.
  - **Sempatik:** "Savaş ya da kaç" — kalp hızlanır, göz bebeği büyür, sindirim yavaşlar.
  - **Parasempatik:** "Dinlen ve sindir" — kalp yavaşlar, sindirim hızlanır.

# Refleks
Hızlı, otomatik, istemsiz yanıt. **Refleks yayı:** reseptör → duyu nöronu → (ara nöron) → motor nöron → efektör (kas/bez).
- **Diz kapağı refleksi:** **2 nöronlu** (ara nöron yok).
- **Sıcağa dokununca eli çekme:** **3 nöronlu**; merkez omurilik, sonra beyne bilgi gider (acıyı sonradan hissederiz).
- **Şartlı (öğrenilmiş) refleks:** Pavlov'un köpeği — zil sesiyle tükürük salgılama.
""",
  [("Bir trafik kazasında beyinciği zarar gören kişide hangi belirtiler görülür?", "**Denge kaybı** ve **hareketlerin koordinasyonunda bozukluk** (sendeleyerek yürüme, ince hareketleri yapamama) görülür."),
   ("Sıcak ütüye dokunduğumuzda elimizi çektikten sonra acıyı hissetmemizin nedeni nedir?", "Refleks merkezi **omurilik**tir; el çekme yanıtı beyne gitmeden oluşur. Bilgi ayrıca **beyin kabuğuna** iletilir ve acı bu yüzden biraz sonra algılanır.")],
  ["Sünger yok, sölenter ağ, solucan-eklembacaklı ip merdiven.", "Uç beyin düşünme; talamus aktarma; hipotalamus homeostazi; beyincik denge; omurilik soğanı hayati merkez.", "Otonom: sempatik vs parasempatik; refleks yayı."]),
]),
U("u3", "1. Tema (C): Destek-Hareket ve Bağışıklık", "Theme 1 (C): Support, Movement and Immunity", [
O("k1", "1.9", "Destek ve hareket sistemi: kemik, kıkırdak, eklem, kas dokusu", "Skeletal system: bone, cartilage, joints, muscle tissue", r"""
# Görevler
Vücudu destekleme, organları koruma, hareket, **mineral depolama** (Ca, P), **kan hücresi üretimi** (kırmızı kemik iliği).

# Kemik Doku
- Ara madde **osein** (kolajen + kalsiyum tuzları); hücreleri **osteosit**.
- **Periost:** Dış bağ doku zarı; kemiğin **enine büyümesi** ve **onarımı**.
- **Sıkı (sert) kemik:** **Osteon** birimleri; merkezde **Havers kanalı** (damar, sinir), bunları birbirine bağlayan **Volkmann kanalları**.
- **Süngerimsi kemik:** Gözenekli, **kırmızı kemik iliği** içerir.
- Kemiğin **boyca uzaması**: epifiz (büyüme) plağındaki kıkırdağın kemikleşmesiyle; ergenlik sonrası durur.
- Şekillerine göre: **uzun** (uyluk, pazu), **kısa** (bilek), **yassı** (kafatası, kürek), **düzensiz** (omur).

# Kıkırdak Doku
**Kondrosit** hücreleri, **kondrin** ara maddesi; **kan damarı ve sinir içermez** (difüzyonla beslenir, geç onarılır).
- **Hiyalin:** Burun ucu, eklem yüzeyleri, soluk borusu
- **Elastik:** Kulak kepçesi, gırtlak kapağı
- **Fibröz (lifli):** Omurlar arası disk

# Eklemler
Kemikler birbirine **ligamentlerle (bağ)** bağlanır.
| Tür | Özellik | Örnek |
|---|---|---|
| **Oynar** | Eklem kapsülü, **sinovyal sıvı** | Diz, omuz, dirsek |
| **Yarı oynar** | Arada kıkırdak disk, sınırlı hareket | Omurlar |
| **Oynamaz** | Testere dişli sıkı bağlantı | Kafatası |

# Kas Dokusu
Hücre zarı **sarkolemma**, sitoplazma **sarkoplazma**; kasılan telcikler **miyofibril** (**aktin** ve **miyozin**).

| | İskelet (çizgili) | Düz | Kalp |
|---|---|---|---|
| Bantlaşma | Var | Yok | Var |
| Çekirdek | **Çok** | Tek | 1–2 |
| Kontrol | **İstemli** (somatik) | İstemsiz (otonom) | İstemsiz (otonom) |
| Kasılma | Hızlı, çabuk yorulur | Yavaş, uzun süreli | Hızlı, ritmik, yorulmaz |
| Yer | İskelete bağlı | İç organlar, damarlar | Kalp |
""",
  [("Kıkırdak doku yaralanmalarının kemik yaralanmalarından daha geç iyileşmesinin nedeni nedir?", "Kıkırdakta **kan damarı yoktur**; besin ve oksijen difüzyonla yavaş ulaşır, bu yüzden onarım yavaştır.")],
  ["Kemik: osein, osteosit, Havers–Volkmann, periost.", "Kıkırdak damarsız: hiyalin, elastik, fibröz.", "Kas: iskelet (istemli, çok çekirdek), düz, kalp."]),
O("k2", "1.10", "Kasların çalışması ve kasılma mekanizması", "Muscle action and contraction mechanism", r"""
# Kasların Birlikte Çalışması
- İskelet kasları kemiklere **tendonlarla (kiriş)** bağlanır.
- **Antagonist kaslar:** Biri kasılırken diğeri gevşer — **biseps** (kolu büker) ve **triseps** (kolu açar).
- **Sinerjist kaslar:** Aynı anda kasılıp gevşer — karın kasları.
- Vücut bir **kaldıraç** sistemidir: destek noktası **eklem**, yük **ağırlık**, kuvvet **kas**.

# Kas Sarsısı ve Tetanoz
- **Eşik şiddeti:** Kas telini kasıltan en küçük uyartı (**ya hep ya hiç**).
- **Kas sarsısı:** Tek uyarıyla bir kez kasılıp gevşeme — **gizli evre → kasılma evresi → gevşeme evresi**.
- **Fizyolojik tetanoz:** Kas çok sık uyarılırsa gevşeyemez, **sürekli kasılı** kalır.
- **Kas tonusu:** Bilinç açıkken kasların hafif kasılı durması (duruşu sağlar).

# Kayan İplikler Modeli (Huxley)
**Sarkomer:** İki **Z çizgisi** arası; kasılma birimi.

**Kasılma basamakları:**
1. Motor nörondan gelen uyartı → **asetilkolin** → kas zarında aksiyon potansiyeli.
2. **Sarkoplazmik retikulumdan Ca²⁺** salınır.
3. Ca²⁺ aktin üzerindeki bağlanma bölgelerini açar; **miyozin başları** aktine bağlanır.
4. **ATP** enerjisiyle miyozin başları aktini sarkomer ortasına çeker.

| Kasılmada | Değişim |
|---|---|
| Z çizgileri | Birbirine **yaklaşır** |
| Sarkomer | **Kısalır** |
| **I bandı** ve **H bandı** | **Daralır** |
| **A bandı** | **Değişmez** |
| Aktin ve miyozin ipliklerinin boyu | **Değişmez** |

Gevşemede Ca²⁺ geri pompalanır (ATP harcanır); tersi olur.

**Enerji kaynakları:** ATP → **kreatin fosfat** → glikoliz / laktik asit fermantasyonu → oksijenli solunum.
""",
  [("Kasılma sırasında A bandının boyu neden değişmez?", "A bandı **miyozin ipliklerinin uzunluğuna** karşılık gelir; kasılmada iplikler **kısalmaz**, yalnızca aktin miyozin üzerinde **kayar**. Bu yüzden A bandı sabit kalır, I ve H bantları daralır.")],
  ["Antagonist: biseps–triseps.", "Sarsı: gizli, kasılma, gevşeme; tetanoz.", "Kasılmada I ve H daralır, A sabit; Ca²⁺ ve ATP gerekir."]),
O("k3", "1.11", "Bağışıklık sistemi, aşı-serum ve alerji", "Immune system, vaccines and allergies", r"""
# Temel Kavramlar
- **Antijen:** Bağışıklık yanıtı başlatan yabancı madde.
- **Antikor:** B lenfositlerden gelişen plazma hücrelerinin ürettiği, antijene **özgül** savunma proteini.

# Doğal (Doğuştan, Özgül Olmayan) Bağışıklık
Tüm patojenlere karşı; **hafızası yoktur**.
- **Birinci savunma hattı (dış):** Deri, mukus, **mide asidi**, tükürük ve gözyaşındaki **lizozim**.
- **İkinci savunma hattı (iç):** **Fagositler** (nötrofil, makrofaj), **doğal katil (NK)** hücreler, **interferon** ve **kompleman** proteinleri, **ateş**.
- **Yangısal tepki (iltihap):** Hasarlı dokuda **mast hücreleri histamin** salgılar → damarlar genişler, geçirgenlik artar (kızarıklık, ısı, şişlik, ağrı) → fagositler bölgeye gelir.

# Kazanılmış (Özgül) Bağışıklık
**B ve T lenfositler**; patojene **özgüdür** ve **bellek hücreleri** sayesinde hafızası vardır.
- **Humoral (sıvısal):** B lenfositler → plazma hücreleri → **antikor**.
- **Hücresel:** **T lenfositler** enfekte ve kanserli hücreleri doğrudan yok eder; **yardımcı T** hücreler yanıtı düzenler.

| | Aktif | Pasif |
|---|---|---|
| Doğal | **Hastalığı geçirme** | **Anneden** plasenta ve sütle antikor |
| Yapay | **Aşı** | **Serum** |

# Aşı ve Serum
| Aşı | Serum |
|---|---|
| Zayıflatılmış/ölü patojen ya da parçası (**antijen**) | Hazır **antikor** |
| **Koruyucu** — sağlıklı kişiye | **Tedavi** amaçlı — hastaya |
| Vücut kendi antikorunu ve **bellek hücresini** üretir → **aktif** | Bellek hücresi oluşmaz → **pasif** |
| Etkisi geç başlar, **uzun** sürer | Hemen etki eder, **kısa** sürer |

# Alerji
Bağışıklık sisteminin zararsız maddelere (**alerjen**: polen, toz akarı, bazı besinler) **aşırı** tepki vermesi.
1. **İlk karşılaşma:** B lenfositler antikor üretir; antikorlar **mast hücrelerinin** zarına bağlanır (duyarlılaşma).
2. **İkinci karşılaşma:** Alerjen bu antikorlara bağlanır → mast hücreleri **histamin** salgılar.
3. Hapşırma, kaşıntı, göz yaşarması, burun akıntısı.
4. Şiddetli durumda **anafilaktik şok** (kan basıncının ani düşüşü, solunum güçlüğü) → acil **adrenalin** uygulanır.
""",
  [("Yılan sokmasında aşı yerine serum uygulanmasının nedeni nedir?", "Zehrin etkisi **hemen** başlar; aşı ile vücudun antikor üretmesi günler sürer. **Serum hazır antikor** içerdiğinden zehri hemen etkisiz hâle getirir (pasif bağışıklık).")],
  ["Doğal bağışıklık: özgül değil, hafızasız (deri, fagosit, iltihap).", "Kazanılmış: B (antikor) ve T lenfosit, bellek hücresi.", "Aşı aktif-koruyucu; serum pasif-tedavi; alerjide histamin."]),
]),
U("u4", "2. Tema: Homeostazi", "Theme 2: Homeostasis", [
O("k1", "2.1", "Homeostazi, geri bildirim ve düzenleyici sistemler", "Homeostasis, feedback and regulatory systems", r"""
# Homeostazi
Değişen dış koşullara rağmen iç ortamın (**su, sıcaklık, pH, iyon, enerji**) **dar bir aralıkta sabit** tutulması. Enzimlerin çalışması ve hücrelerin yaşaması için hayati önemdedir.
- **Claude Bernard:** "İç ortam" kavramı. **Walter Cannon:** "Homeostazi" terimi.
- İslam bilginleri **İbn Sina, İbnü'n-Nefis** (küçük dolaşım) ve **Ebu Bekir er-Razi** fizyoloji ve tıpta öncü çalışmalar yaptı.

| Canlı | Homeostatik yapı |
|---|---|
| **Paramesyum** (tatlı su) | Hipotonik ortamda sürekli su alır; **kontraktil koful** fazla suyu ATP harcayarak atar |
| **Balıklar** | **Solungaçlar**: gaz alışverişi, iyon ve su dengesi, **amonyak** atımı |
| **Bitkiler** | **Stomalar** terlemeyi ve gaz alışverişini düzenler; **hidatotlarla gutasyon**; kaktüste diken yapraklar |

**Düzenlenen değerler:** su–elektrolit, enerji (bazal metabolizma), toksinlerin uzaklaştırılması (karaciğer, böbrek), vücut sıcaklığı (~**36,8 ± 0,4 °C**), kan basıncı, kan şekeri.

# Geri Bildirim
- **Negatif geri bildirim:** Sapmaya **zıt** yönde yanıt, değer normale döner. **En yaygın** mekanizma. Ör. kan şekeri yükselince **insülin**; vücut ısınınca terleme; CO₂ artınca (pH düşünce) solunumun hızlanması.
- **Pozitif geri bildirim:** Etki kendini **güçlendirir**, süreç tamamlanana kadar artar. Ör. **doğumda oksitosin**, **kan pıhtılaşması**, emzirmede süt salgısı.

# Sinir ve Endokrin Sistem
- **Sinir sistemi:** Hızlı, kısa süreli (hipotalamus, pons, omurilik soğanı).
- **Endokrin sistem:** Daha yavaş ama **uzun süreli** düzenleme.

| Bez | Hormon | Görev |
|---|---|---|
| **Hipotalamus** | Salgılatıcı hormonlar, ADH ve oksitosin üretimi | Hipofizi yönetir |
| **Hipofiz** | GH, TSH, ACTH, FSH, LH, prolaktin; arka lobdan ADH, oksitosin | "Ana bez" |
| **Tiroit** | Tiroksin; kalsitonin | Metabolizma hızı; kan Ca²⁺ ↓ |
| **Paratiroit** | Parathormon | Kan Ca²⁺ ↑ |
| **Pankreas** | **İnsülin** (β), **glukagon** (α) | Kan şekeri ↓ / ↑ |
| **Böbrek üstü** | Adrenalin (öz), kortizol ve aldosteron (kabuk) | Stres yanıtı; Na⁺ ve su dengesi |
""",
  [("Kan şekerinin düzenlenmesi neden negatif geri bildirime örnektir?", "Kan şekeri **yükselince** pankreas **insülin** salgılar ve şeker düşer; **düşünce** **glukagon** salgılanır ve şeker yükselir. Yanıt her zaman sapmanın **tersi** yöndedir."),
   ("Doğum sırasındaki oksitosin salgısı neden pozitif geri bildirimdir?", "Bebeğin rahim ağzına baskısı oksitosin salgısını artırır; oksitosin kasılmaları güçlendirir, bu da daha fazla baskı ve **daha çok oksitosin** demektir. Döngü doğumla sona erer.")],
  ["Homeostazi: iç ortamın sabit tutulması (Cannon).", "Negatif geri bildirim yaygın (insülin-glukagon); pozitif: doğum, pıhtılaşma.", "Sinir hızlı-kısa; endokrin yavaş-uzun süreli."]),
O("k2", "2.6", "Dolaşım, solunum ve boşaltım sistemlerinin homeostazideki rolü; bozukluklar", "Circulatory, respiratory and excretory roles in homeostasis; disorders", r"""
# Dolaşım Sistemi
Kalp, damarlar, kan. O₂, besin, hormon ve antikorları taşır; atıkları uzaklaştırır; ısıyı dağıtır.
- **Kılcal damarlarda madde alışverişi (Starling hipotezi):** Atardamar ucunda **kan basıncı > ozmotik basınç** → sıvı dokuya çıkar; toplardamar ucunda **ozmotik basınç > kan basıncı** → sıvı damara döner.
- Doku sıvısının fazlası **lenf sistemiyle** kana döner.

# Solunum Sistemi
- **Dış solunum:** Alveollerde kan ile hava arasında gaz alışverişi.
- **İç solunum:** Dokularda kan ile hücreler arasında gaz alışverişi.
- CO₂ atımı ile **kan pH'sı** düzenlenir: $CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-$. CO₂ artınca pH düşer; omurilik soğanı solunumu hızlandırır.

# Boşaltım Sistemi
Böbreklerde **nefronlar**: **süzülme** (glomerulus) → **geri emilim** (glikoz, aminoasit, su, iyonlar) → **salgılama** (H⁺, K⁺, bazı ilaçlar). **Üre** gibi azotlu atıkları atar; **su, elektrolit ve pH** dengesini sağlar. **ADH** suyun geri emilimini artırır, **aldosteron** Na⁺ geri emilimini artırır.

# Homeostazi Bozuklukları
| Bozukluk | Neden |
|---|---|
| **Tip 1 diyabet** | Pankreasın **insülin üretememesi** (otoimmün) |
| **Tip 2 diyabet** | Hücrelerin insüline **duyarsızlaşması** (obezite, hareketsizlik) |
| **Diabetes insipidus** | **ADH eksikliği** → çok fazla seyreltik idrar |
| **Hipertansiyon / hipotansiyon** | Yüksek / düşük kan basıncı |
| **Obezite** | Enerji alımı > harcama |
| **Hipotermi / hipertermi** | Vücut sıcaklığının normalin altına / üstüne çıkması |

> Sağlıklı beslenme, düzenli egzersiz ve yeterli uyku homeostazinin korunmasının temelidir.
""",
  [("Çok terleyen bir kişinin idrar miktarı nasıl değişir? Neden?", "Terlemeyle su kaybedilir, kanın ozmotik basıncı artar; hipotalamus bunu algılar ve hipofizden **ADH** salgılanır. ADH böbrekte **suyun geri emilimini** artırır, idrar **azalır ve koyulaşır**.")],
  ["Starling: kan basıncı vs ozmotik basınç.", "Solunum CO₂ ile pH'yı düzenler.", "Nefron: süzülme, geri emilim, salgılama; ADH ve aldosteron."]),
]),
]

write("biy-11.js", "11/biyoloji", "11. Sınıf Biyoloji — kapsamlı ders notları",
      "kullanıcının verdiği \"11. Sınıf Biyoloji Ders Kitabı Kapsamlı Notlar\" (2 tema: Tepki, Homeostazi).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır; Tepki teması üç üniteye bölündü. Eklenenler: oligodendrosit, Na⁺-K⁺ pompası, sempatik/parasempatik, kasılmada Ca²⁺ ve ATP rolü, endokrin bezler tablosu, nefron işleyişi. Koleoptil deneylerine araştırmacı adları eklendi.")
