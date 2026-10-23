# -*- coding: utf-8 -*-
"""10. Sınıf Coğrafya Kapsamlı Ders Notları → js/data/content/cog-10.js"""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Coğrafyanın Doğası", "Unit 1: The Nature of Geography", [
O("k1", "1.1", "Coğrafi bakış ve örnek olaylar", "The geographical perspective and case studies", r"""
# Coğrafi Bakış

Olay ve olguları **mekânsal bağlamda** ele almak; dağılışını, nedenlerini ve sonuçlarını **yerel, bölgesel ve küresel** ölçeklerde değerlendirmek. Coğrafya dünyayı **"nerede, neden orada, nasıl"** sorularıyla anlamaya çalışır.

**Temel kavramlar:** konum, zaman, mekân, hareket, bölge, sürdürülebilirlik.

# Örnek: 1854 Londra Kolera Salgını

Soho bölgesindeki vakalar haritaya işlendi; vakaların **bir su pompası** çevresinde toplandığı görüldü. Kuyunun kullanımı durdurulunca salgın yayılmayı kesti → **mekânsal analizin** hayat kurtarıcı gücü.

# Örnek: Marmara Gölü'nün Kuruması (Manisa)

Alüvyal set gölü olan Marmara Gölü, Aşağı Gediz Projesi'nin önemli bir rezervuarıydı.
- **Nedenler:** besleyen kanalların (Kumçayı, Adala) sularının azalması, **sulama için aşırı su çekimi**, kuraklık, yer altı sularının bilinçsiz kullanımı.
- **Sonuçlar:** göl 2022'de tamamen kurudu; balıkçılık bitti, biyoçeşitlilik yok oldu, toplumsal gerginlikler yaşandı.

> Ders: doğayı koruma, kaynakların **sürdürülebilir** kullanımı ve **mekân okuryazarlığı**.
""",
  [("Bir hastalığın yayılışını incelerken coğrafi bakış açısı hangi soruları sorar?", "Vakalar **nerede** yoğunlaşıyor? **Neden orada** (su kaynağı, nüfus yoğunluğu, iklim)? **Nasıl** yayılıyor (ulaşım, göç)? Bunlar haritalanarak önlem alınır.")],
  ["Coğrafya: nerede, neden orada, nasıl.", "Londra kolera: haritayla kaynağı bulma.", "Marmara Gölü: aşırı su kullanımıyla kuruma."]),
]),
U("u2", "2. Ünite: Mekânsal Bilgi Teknolojileri", "Unit 2: Spatial Information Technologies", [
O("k1", "2.1", "CBS ve uzaktan algılamanın uygulama alanları", "Applications of GIS and remote sensing", r"""
# CBS ve Uzaktan Algılama

Mekânsal verilerin **toplanması, depolanması, analizi, sorgulanması ve görüntülenmesini** sağlayan teknolojiler.
- **Uzaktan algılama:** uydu, uçak, İHA ile yeryüzüne dokunmadan veri toplama.
- **CBS:** konuma bağlı verileri katmanlar hâlinde birleştirip analiz etme.

| Alan | Kullanım |
|---|---|
| **Çevre** | Doğal kaynak yönetimi, ormansızlaşma ve çölleşme takibi, afet riski |
| **Tarım** | Ekili alan izleme, **rekolte tahmini**, sulama optimizasyonu |
| **Şehir** | Kentsel büyüme, altyapı, ulaşım, akıllı şehir |
| **Su** | Su kalitesi, havza haritalama, su arzı planlama |
| **Afet** | Anlık izleme, zarar tespiti, acil durum koordinasyonu |

### AYDES
AFAD'ın **Afet Yönetim ve Karar Destek Sistemi**: Olay Komuta Sistemi, Mekânsal Bilgi Sistemi ve İyileştirme Sistemi bileşenleriyle afet süreçlerini dijital ortamda yönetir.
""",
  [("Bir ilde buğday rekoltesini hasattan önce tahmin etmek için hangi teknoloji kullanılır?", "**Uzaktan algılama** (uydu görüntüleriyle bitki sağlığı ve ekili alan) ve **CBS** analizi.")],
  ["UA: dokunmadan veri toplama; CBS: katmanlı analiz.", "Tarım, çevre, şehir, su, afet uygulamaları.", "AYDES: AFAD'ın afet karar destek sistemi."]),

O("k2", "2.2", "Mekânsal verilerin haritalara aktarılması", "Transferring spatial data to maps", r"""
# Mekânsal ve Mekânsal Olmayan Veri

- **Mekânsal veri:** bir özelliğin **nerede** olduğu (koordinat).
- **Mekânsal olmayan (öznitelik) veri:** o konuma ait nitel/nicel bilgi (okulun adı, öğrenci sayısı).

# Vektör Semboller

| Sembol | Ne için? | Örnek |
|---|---|---|
| **Nokta** | Alanı küçük ya da ölçekte nokta gibi görünen unsurlar | Okul, hastane, çeşme |
| **Çizgi** | Çizgisel uzanan unsurlar | Yol, akarsu, demir yolu, enerji hattı |
| **Alan (poligon)** | Sınırı ve alanı olan unsurlar | Göl, orman, il sınırı, tarla |

### Uygulama
Yakın çevredeki park, konut, iş yeri ve ulaşım ağları dijital harita araçlarıyla (OGM Materyal CBS Platformu vb.) **katmanlar** hâlinde haritalanır. Toplanma alanı haritaları acil durum planlaması ve rota seçimi sağlar.
""",
  [("Küçük ölçekli bir Türkiye haritasında Ankara nasıl gösterilir? Büyük ölçekli bir şehir planında?", "Küçük ölçekte **nokta**, büyük ölçekte şehir sınırları **alan (poligon)** sembolüyle gösterilir; sembol türü ölçeğe göre değişir.")],
  ["Mekânsal veri = konum; öznitelik = bilgi.", "Nokta, çizgi, alan sembolleri.", "Haritalar katmanlarla üretilir."]),
]),
U("u3", "3. Ünite: Doğal Sistemler ve Süreçler", "Unit 3: Natural Systems and Processes", [
O("k1", "3.1", "Yer'in iç yapısı ve levha tektoniği", "Earth's interior and plate tectonics", r"""
# Yer'in İç Yapısı

**Yer kabuğu** (litosferin üst kısmı) → **manto** (üst kısmındaki akışkan **astenosfer**) → **çekirdek** (dış: sıvı, iç: katı).

# Kuramlar

- **Alfred Wegener (1915):** **Kıtaların Kayması Kuramı** (Pangea).
- 1960'lardan sonra: **Levha Tektoniği Kuramı** — litosfer levhaları astenosferdeki **konveksiyon akımlarıyla** hareket eder.

# Levha Sınırları

| Sınır | Hareket | Oluşan şekiller | Örnek |
|---|---|---|---|
| **Ayrılma (uzaklaşma)** | Levhalar birbirinden uzaklaşır, magma yükselir | **Okyanus ortası sırtları**, rift vadileri | Doğu Afrika Rifti, Kızıldeniz |
| **Yaklaşma (çarpışma)** | Levhalar çarpışır, biri diğerinin altına dalar | **Dalma-batma**, okyanus hendekleri, volkanik ada yayları, **kıvrım dağları** | Himalayalar |
| **Yanal kayma (transform)** | Levhalar yatay olarak ters yönde kayar | Büyük **fay hatları** ve depremler | San Andreas, **Kuzey Anadolu Fayı** |
""",
  [("Kızıldeniz zamanla genişliyor. Bu hangi levha hareketiyle açıklanır?", "**Ayrılma (uzaklaşma) sınırı** — Afrika ve Arabistan levhaları birbirinden uzaklaşıyor.")],
  ["Wegener: kıtaların kayması; sonra levha tektoniği.", "Ayrılma: sırt/rift; yaklaşma: dağ/hendek; yanal: fay.", "KAF bir yanal kayma (transform) fayıdır."]),

O("k2", "3.2", "Orojenez, volkanizma ve deprem", "Orogeny, volcanism and earthquakes", r"""
# Orojenez (Dağ Oluşumu)

Levhaların yaklaşması sonucu tabakalar sıkışır:
- **Esnek tortullar kıvrılır** → **kıvrım dağları**: **antiklinal** (yüksekte kalan kubbe) ve **senklinal** (alçakta kalan çanak).
- **Sert tabakalar kırılır** → **horst** (yüksekte kalan blok) ve **graben** (çöküntü). Örnek: **Ege'deki kırıklı dağlar ve ovalar** (Bozdağlar–Gediz Grabeni).

# Volkanizma

| Tür | Şekiller |
|---|---|
| **Yüzey (dış) volkanizma** | **Merkezî püskürme**: tabakalı (strato), kalkan volkanlar, tüf konileri · **Çizgisel (fisür)**: lav platoları |
| **Derinlik (iç) volkanizma** | Yüzeye çıkamayıp soğuyan magma: **batolit, lakolit, sill, dayk** |

**Pasifik Ateş Çemberi** dünyanın en yoğun volkanizma ve deprem kuşağıdır.

# Deprem

Fay hatlarında biriken enerjinin **ani boşalmasıyla** yayılan dalgalar.
- **İç merkez (odak, hiposantr):** depremin başladığı yer altındaki nokta.
- **Dış merkez (episantr):** yeryüzünde en çok hissedilen nokta.
""",
  [("Ege Bölgesi'nde dağların ve ovaların birbirine paralel uzanması nasıl açıklanır?", "Sert tabakaların **kırılmasıyla** yükselen **horstlar** (dağlar) ve çöken **grabenler** (ovalar) oluşmuştur.")],
  ["Kıvrılma: antiklinal-senklinal; kırılma: horst-graben.", "Derinlik volkanizması: batolit, lakolit, sill, dayk.", "Odak yer altında, dış merkez yüzeyde."]),

O("k3", "3.3", "Türkiye'nin tektonik yapısı ve jeolojik zamanlar", "Türkiye's tectonics and geological time", r"""
# Türkiye'nin Tektonik Yapısı

**Anadolu Levhası**; kuzeyde **Avrasya**, güneyde **Afrika**, güneydoğuda **Arabistan** levhalarının sıkıştırması altındadır.
- Bu sıkışmayla **Kuzey Anadolu Dağları** ve **Toroslar** yükseldi.
- Anadolu batıya doğru yılda yaklaşık **2–3 cm** kaymaktadır.
- Üç büyük diri fay sistemi: **Kuzey Anadolu (KAF)**, **Doğu Anadolu (DAF)**, **Batı Anadolu fay zonu**.

# Jeolojik Zamanlar

| Zaman | Önemli olaylar |
|---|---|
| **Prekambriyen** | İlk kıta çekirdekleri (kalkanlar), ilk canlılar (alg, bakteri) |
| **Paleozoyik** | **Pangea**, **taş kömürü** yatakları (Zonguldak), Kaledoniyen ve Hersiniyen kıvrımları |
| **Mezozoyik** | Pangea'nın parçalanması, **Tetis Denizi**, **dinozorlar** |
| **Senozoyik** (Paleojen–Neojen–Kuaterner) | **Alp-Himalaya orojenezi**, Türkiye'nin dağları ve **boğazlar**, linyit-petrol-**bor** yatakları, insanın ortaya çıkışı |
""",
  [("Türkiye'nin dağlarının büyük bölümü hangi jeolojik zamanda oluşmuştur?", "**Senozoyik** (III. zaman) — Alp-Himalaya orojenezi sırasında.")],
  ["Anadolu: Avrasya, Afrika ve Arabistan arasında sıkışır.", "KAF, DAF, Batı Anadolu fay zonu.", "Paleozoyik taş kömürü; Senozoyik dağlar, boğazlar, bor."]),

O("k4", "3.4", "Ayrışma: iklim ve kayaç yapısının etkisi", "Weathering: effects of climate and rock type", r"""
# Ayrışma

Dış kuvvetlerin yeryüzünü şekillendirmesi **kayaçların ayrışmasıyla** başlar.

| Tür | Nasıl? | Nerede baskın? |
|---|---|---|
| **Fiziksel (mekanik)** | Kimyasal yapı bozulmadan parçalanma: **sıcaklık farkı**, **donma çözülme**, **tuz kristalleşmesi**, **kavlama** | **Kurak, yarı kurak ve soğuk** iklimler (günlük sıcaklık farkı büyük) |
| **Kimyasal** | Su, $CO_2$ ve $O_2$ ile minerallerin çözünüp yeni minerallere dönüşmesi | **Sıcak ve nemli** iklimler (ekvatoral, muson) |
| **Biyolojik** | Kökler, canlıların etkisi | Bitki örtüsü gür yerler |

# Kayaç Direnci

- **Magmatik** (granit, bazalt): dirençli.
- **Tortul** (kalker, jips, kiltaşı) ve bazı **başkalaşım** kayaçları: çözünme ve aşınmaya karşı **daha az dirençli**.
""",
  [("Çöllerde kayaçların parçalanmasında hangi ayrışma etkindir? Neden?", "**Fiziksel ayrışma** — gece-gündüz sıcaklık farkı çok büyüktür; kayaçlar genleşip büzülerek çatlar.")],
  ["Fiziksel ayrışma: kurak ve soğuk iklim.", "Kimyasal ayrışma: sıcak ve nemli iklim.", "Kalker ve jips kolay çözünür."]),

O("k5", "3.5", "Akarsu ve karstik şekiller", "Fluvial and karst landforms", r"""
# Akarsular

Yeryüzünü şekillendiren **en etkili dış kuvvet**. Akarsu yatağını derinleştirerek **denge profiline** ulaşmaya çalışır (taban seviyesi: deniz).

| Aşınım şekilleri | Birikim şekilleri |
|---|---|
| Çentik (V) vadi, **boğaz (yarma)** vadi, **kanyon**, asimetrik vadi, dev kazanı, **peneplen** | **Birikinti konisi/yelpazesi**, **taşkın (alüvyal) ovası**, ırmak adası, **delta** (Çukurova, Bafra, Çarşamba) |

- Taban seviyesi değişirse: **gömük menderesler**, **taraçalar (sekiler)**.

# Karst Topoğrafyası

**Kalker, jips, kaya tuzu** gibi kolay çözünen kayaçlarda gelişir.

| Aşınım | Birikim |
|---|---|
| **Lapya** (en küçük oluk), **dolin**, **uvala**, **polye** (en geniş karstik ova), **düden**, kör vadi, **mağara**, **obruk** | Mağarada **sarkıt, dikit, sütun**; yeryüzünde **traverten** (Pamukkale) |

> Dolinler birleşince uvala, uvalalar birleşince polye oluşur.
""",
  [("Pamukkale travertenleri nasıl oluşmuştur?", "Kalkerli araziden geçen **kalsiyum bikarbonatlı** kaynak suları yeryüzüne çıkınca $CO_2$ kaybeder ve kireç **çökelir**; basamak şeklinde birikinti oluşur.")],
  ["Akarsu en etkili dış kuvvet; delta = kıyıda birikim.", "Lapya < dolin < uvala < polye.", "Sarkıt, dikit, sütun, traverten karstik birikimdir."]),

O("k6", "3.6", "Rüzgâr, buzul ve kıyı şekilleri", "Wind, glacial and coastal landforms", r"""
# Rüzgâr (Kurak ve Yarı Kurak Alanlar)

| Aşınım | Birikim |
|---|---|
| **Deflasyon** (süpürme) → çöl kaldırımı, tava · **Korazyon** (aşındırma) → **mantar kaya**, yardang | **Kumul** (kum tepesi), **lös** (ince toz örtüsü) |

# Buzullar

Kalıcı kar sınırının üstünde buzulların hareketiyle oluşur.
| Aşınım | Birikim |
|---|---|
| **Sirk**, **U vadi**, hörgüç kaya, buzul çizikleri | **Moren**, drumlin |

Yüksek enlemlerde deniz suyunun istila ettiği buzul vadileri **fiyort** kıyılarını oluşturur.

# Kıyı Şekilleri ve Kıyı Tipleri

**Dalga şekilleri:** **falez** (yalıyar), dalga aşınım platformu, deniz kemeri, kumsal, kıyı oku, **tombolo** (adayı karaya bağlar), **lagün** (deniz kulağı).

| Kıyı tipi | Özellik | Örnek |
|---|---|---|
| **Boyuna** | Dağlar kıyıya **paralel**, girinti-çıkıntı az | Karadeniz, Akdeniz |
| **Enine** | Dağlar kıyıya **dik**, girintili-çıkıntılı | Ege |
| **Ria** | Akarsu vadilerinin sular altında kalması | İstanbul ve Çanakkale boğazları |
| **Dalmaçya** | Paralel dağların tepeleri ada olmuş | Hırvatistan, Kaş |
| **Fiyort / skyer** | Buzul vadileri / buzulla aşınmış alçak kıyılar | Norveç / İskandinavya |
""",
  [("Ege kıyılarının girintili-çıkıntılı olmasının nedeni nedir?", "Dağların kıyıya **dik** uzandığı **enine kıyı** tipidir; dağlar arasındaki ovalar ve koylar denize açılır.")],
  ["Rüzgâr: mantar kaya, kumul, lös.", "Buzul: sirk, U vadi, moren; fiyort.", "Boyuna (Karadeniz), enine (Ege), ria (boğazlar)."]),

O("k7", "3.7", "Saha çalışması ve yer şekillerinin beşerî faaliyetlerle etkileşimi", "Fieldwork and human interaction with landforms", r"""
# Saha Çalışması

**Coğrafyanın laboratuvarı arazidir.** Saha çalışmaları yer şekillerini yerinde incelemeyi, doğal zenginlikleri fark etmeyi ve korumayı sağlar.

# Yer Şekilleri ve İnsan

| Alan | Etkileşim |
|---|---|
| **Nüfus ve yerleşme** | Verimli ovalar ve nehir vadileri (Nil, Çukurova, Büyük Menderes) yoğun; dağlık alanlar seyrek nüfuslu |
| **Ulaşım** | Düzlükte yol yapımı ucuz; dağlık alanda **tünel ve viyadük** (Landwasser Viyadüğü) gerekir |
| **İnsanın yer şekillerini değiştirmesi** | Maden ocakları, barajlar, dolgu alanları (**Hollanda polderleri**) — **Antroposen** |
| **Canlılar** | Karınca, köstebek gibi canlılar küçük ölçekte şekillendirir |
""",
  [("Hollanda'nın polderleri insan–doğa etkileşimine nasıl bir örnektir?", "Deniz seviyesinin altındaki alanlar **setlerle kurutulup** tarım ve yerleşmeye açılmıştır; insan yer şekillerini doğrudan değiştirmiştir.")],
  ["Coğrafyanın laboratuvarı arazidir.", "Ovalar yoğun, dağlar seyrek nüfuslu.", "Antroposen: insan topoğrafyayı değiştirir."]),
]),
U("u4", "4. Ünite: Beşerî Sistemler ve Süreçler", "Unit 4: Human Systems and Processes", [
O("k1", "4.1", "Yerleşmelerin kuruluşu, gelişimi ve türleri", "Founding, development and types of settlements", r"""
# Yerleşme

İnsanların **barınma, korunma** ve sosyoekonomik faaliyetlerini sürdürdükleri alanlar. Paleolitik'te mağaralarda göçebe yaşam; Neolitik'te tarım ve hayvancılıkla **yerleşik hayat** (Çatalhöyük, Göbeklitepe).

# Yerleşme Yerini Etkileyen Faktörler

| Doğal | Beşerî |
|---|---|
| Elverişli **iklim**, yeterli **su**, verimli **toprak**, elverişli **yer şekilleri** | **Ekonomik faaliyetler**, **ulaşım**, göçler, bilim-teknoloji (denizlerin doldurulması) |

- Karaların fazla olduğu **Kuzey Yarım Küre** yerleşmeye daha uygundur.
- **Sanayi Devrimi** ile şehirler hızla büyüdü, metropoller doğdu.

# Kır ve Şehir Yerleşmeleri

| Kır yerleşmeleri | Şehir yerleşmeleri |
|---|---|
| Genelde nüfusu **10 binden az**, geçim **tarım-hayvancılık** | Nüfusu 10 binin üzerinde, **sanayi, ticaret, hizmet** baskın |
| Kasaba, köy, **köy altı yerleşmeleri** | Küçük, orta, büyükşehir, metropol |

### Köy altı yerleşmeleri
| Devamlı | Geçici |
|---|---|
| **Mahalle**, **mezra** | **Yayla**, **oba**, **kom** |

> **Salda Gölü** gibi hassas alanlarda (stromatolitler) planlı yerleşme ve koruma imar planları önemlidir.
""",
  [("Yaz aylarında hayvancılık amacıyla kullanılan geçici yerleşme hangisidir?", "**Yayla** (ayrıca konargöçerlerin çadırlarından oluşan **oba**, Doğu Anadolu'daki **kom**).")],
  ["Yerleşme: doğal (iklim, su, toprak) + beşerî faktörler.", "Kır: tarım; şehir: sanayi-ticaret-hizmet.", "Devamlı: mahalle, mezra; geçici: yayla, oba, kom."]),

O("k2", "4.2", "Yerleşmelerin fonksiyonları", "Functions of settlements", r"""
# Fonksiyon

Bir yerleşmenin varlığını sürdürmesini sağlayan **ekonomik, idarî, sosyal ve kültürel** faaliyetler. Şehirlerde fonksiyon çeşitliliği kırsala göre çok fazladır.

| Fonksiyon | Örnek |
|---|---|
| **Tarım** | Çarşamba, Söke, Salihli |
| **Madencilik** | Zonguldak (kömür), Batman (petrol), Elazığ-Maden (bakır) |
| **Sanayi** | Manchester, İzmit, Bursa, Gaziantep |
| **Ticaret ve yönetim** | İstanbul (finans), Ankara (başkent), New York |
| **Turizm** | Bodrum, Antalya |
| **Ulaşım** | Frankfurt (havalimanı), Rotterdam (liman) |
| **Eğitim, sağlık, dinî** | Üniversite şehirleri, Mekke |

> Fonksiyonlar zamanla **değişebilir** ya da yeni fonksiyon eklenebilir (üniversite açılan bir kente eğitim fonksiyonu).
""",
  [("Zonguldak hangi fonksiyonuyla öne çıkar?", "**Madencilik** (taş kömürü).")],
  ["Fonksiyon: yerleşmeyi yaşatan faaliyetler.", "Şehirde çok, kırda az fonksiyon.", "Fonksiyonlar zamanla değişebilir."]),
]),
U("u5", "5. Ünite: Ekonomik Faaliyetler ve Etkileri", "Unit 5: Economic Activities and Their Effects", [
O("k1", "5.1", "Ekonomik sektörler", "Economic sectors", r"""
# Beş Ekonomik Sektör

| Sektör | Kapsam |
|---|---|
| **Birincil** | Doğadan doğrudan üretim: tarım, hayvancılık, balıkçılık, ormancılık, madencilik |
| **İkincil** | Ham maddenin işlenmesi: sanayi, inşaat, enerji üretimi |
| **Üçüncül** | Hizmet: ticaret, eğitim, sağlık, ulaşım, turizm, finans, iletişim |
| **Dördüncül** | Bilgi ve enformasyon: **AR-GE**, yazılım, tasarım, CBS uzmanlığı |
| **Beşincil** | Üst düzey **karar verme**: yöneticiler, stratejik planlamacılar, hükümet yetkilileri |
""",
  [("Bir yazılım şirketinde yapay zekâ geliştiren mühendis hangi sektörde çalışır?", "**Dördüncül sektör** (bilgi, AR-GE, yazılım).")],
  ["Birincil: doğadan; ikincil: işleme; üçüncül: hizmet.", "Dördüncül: bilgi, AR-GE.", "Beşincil: üst düzey karar."]),

O("k2", "5.2", "Ekonomik sektörler ve gelişmişlik düzeyi", "Economic sectors and level of development", r"""
# Sektörler ve Gelişmişlik

Çalışan nüfusun sektörlere dağılımı ile gelişmişlik arasında **doğrudan ilişki** vardır. GSYİH ve istihdam oranları analizin temelidir.

| | Gelişmiş ülkeler (Kanada, Almanya, İtalya) | Az gelişmiş ülkeler (Çad, Zambiya, Mozambik) |
|---|---|---|
| **Tarımda çalışan** | Çok düşük (%1–3) | Çok yüksek (%50–70+) |
| **Sanayi ve hizmet** | Yüksek | Zayıf |
| **Kişi başı gelir** | Yüksek | Düşük |
| **Enerji tüketimi, okuryazarlık, yaşam süresi** | Yüksek | Düşük |
| **Dış ticaret** | Katma değeri yüksek sanayi ve teknoloji ürünleri | Ham madde satar, işlenmiş ürün alır |
""",
  [("Bir ülkede çalışanların %65'i tarımda ise bu ülkenin gelişmişlik düzeyi hakkında ne söylenebilir?", "Büyük olasılıkla **az gelişmiş** bir ülkedir: sanayi ve hizmet zayıf, kişi başı gelir düşük, ham madde ihracatına bağımlıdır.")],
  ["Tarımda çalışan oranı ↑ → gelişmişlik ↓.", "Gelişmiş: hizmet ve sanayi ağırlıklı.", "Az gelişmiş: ham madde satar."]),

O("k3", "5.3", "Türkiye ekonomisinin sektörel dağılımı", "Sectoral distribution of Türkiye's economy", r"""
# Türkiye'de Ekonomik Dönüşüm

- **İzmir İktisat Kongresi (1923)** ile temeller atıldı; sonra **devletçilik** dönemi ve **1980 sonrası ihracata dayalı** büyüme modeli.
- Cumhuriyet'in ilk yıllarında nüfusun büyük kısmı **tarımda** çalışıyordu; sanayileşme ve şehirleşmeyle tarımın payı azaldı, **hizmet ve sanayi** arttı.

| Yıl | Tarım | Sanayi | Hizmet |
|---|---|---|---|
| **1990** | %46,8 | %20,3 | %32,9 |
| **2018** | %18,4 | %26,7 | %54,9 |
| **Günümüz** | ≈ %15 | ≈ %27 | ≈ %57 |

*(İstihdamın sektörlere dağılımı; günümüz değerleri yaklaşıktır.)*

> Türkiye **tarım toplumundan sanayi ve hizmet ağırlıklı** bir ekonomiye dönüşmüştür.
""",
  [("1990'dan günümüze Türkiye'de istihdamın sektörel dağılımı nasıl değişmiştir?", "Tarımın payı yaklaşık %47'den %15'e **düşmüş**; hizmetin payı %33'ten %57'ye **yükselmiş**, sanayi de artmıştır.")],
  ["İzmir İktisat Kongresi 1923.", "Tarım payı azaldı, hizmet arttı.", "Türkiye hizmet ağırlıklı ekonomiye geçti."]),
]),
U("u6", "6. Ünite: Afetler ve Sürdürülebilir Çevre", "Unit 6: Disasters and Sustainable Environment", [
O("k1", "6.1", "Afetlerle mücadele ve dirençli yaşam alanları", "Disaster management and resilient living spaces", r"""
# Afet

Can ve mal kaybına yol açan **doğa ya da insan kaynaklı** olaylar. Şili, Japonya, Brezilya gibi ülkeler coğrafi koşullarına göre farklı stratejiler geliştirmiştir.

# Afete Dirençli Şehirlerin Özellikleri (OECD)

| Özellik | Açıklama |
|---|---|
| **Sağlamlık** | Yapıların şok ve stres karşısında işlevini sürdürmesi |
| **Uyum sağlama** | Olayın gereklerine göre hızlı karar ve yönetim |
| **Yedeklilik** | Acil durum kaynaklarının devreye alınabilmesi |
| **Esneklik ve kapsayıcılık** | Toplumun tüm paydaşlarının katılımı |

**İyi uygulama örnekleri:** **Gaziantep Risk Haritası**, İtalya **Potenza** bölgesi (#weResilient) — çok paydaşlı afet yönetimi.

# Afetlerden Korunma ve Afet Bilinci

Afet yönetiminin en önemli ayağı **risk ve zarar azaltma**dır:
- **Erken uyarı** sistemleri
- **Dere ıslahı**, **zemin etüdü**, **kentsel dönüşüm**
- Yapısal olmayan riskleri azaltma: **eşyaların sabitlenmesi**
- Afet çantası, toplanma alanlarını bilme, tatbikat
""",
  [("Evdeki dolapları duvara sabitlemek hangi tür risk azaltma önlemidir?", "**Yapısal olmayan** risklerin azaltılması (deprem sırasında devrilen eşyalardan kaynaklanan yaralanmaları önler).")],
  ["Dirençli şehir: sağlamlık, uyum, yedeklilik, kapsayıcılık.", "Risk azaltma: erken uyarı, zemin etüdü, kentsel dönüşüm.", "Eşya sabitleme yapısal olmayan önlemdir."]),
]),
U("u7", "7. Ünite: Bölgeler, Ülkeler ve Küresel Bağlantılar", "Unit 7: Regions, Countries and Global Connections", [
O("k1", "7.1", "Türk kültürünün mekânsal özellikleri", "Spatial characteristics of Turkish culture", r"""
# Kültür Ocağı: Türkistan

Türk kültürünün doğduğu ve yayıldığı **Orta Asya**; **Altay Dağları, Ural, Hazar ve Sibirya** arasındaki bozkır coğrafyası.

# Göçler ve Yayılım

**Kuraklık, nüfus artışı** ve siyasi nedenlerle Kafkasya, Karadeniz'in kuzeyi, Balkanlar ve **Anadolu**'ya kitlesel göçler (Kavimler Göçü vb.).

# Konargöçer ve Türk-İslam Kültürü

| İslamiyet öncesi | İslamiyet sonrası |
|---|---|
| **Gök Tanrı** inancı, **kurgan** ve **balbal**, **yaylak–kışlak** geleneği | **Medrese, külliye, ahilik** teşkilatı ile zenginleşme |

# Ortak Miras

**Orhun Yazıtları**, **Dede Korkut**, **Nevruz**, ortak Türkçe ve **Türk Devletleri Teşkilatı (TDT)** kültürel birliği güçlendirir.
""",
  [("Yaylak–kışlak geleneği hangi coğrafi koşulun sonucudur?", "Bozkırın **iklim ve otlak** koşulları: yazın serin yaylalara, kışın daha ılık ovalara hayvanlarla göç edilir (konargöçer yaşam).")],
  ["Kültür ocağı: Orta Asya bozkırları.", "Göç nedenleri: kuraklık, nüfus artışı.", "Ortak miras: Orhun, Dede Korkut, Nevruz, TDT."]),
]),
]


from _ek134 import uygula  # noqa: E402
uygula(units, "cog10_ek134")

from _ek136 import uygula136; uygula136(units, "cog10")

write("cog-10.js", "10/cografya", "10. Sınıf Coğrafya — kapsamlı ders notları",
      "kullanıcının verdiği \"10. Sınıf Coğrafya Kapsamlı Konu Anlatım Notları ve Kazanım Analizi\" (7 ünite).",
      units, "Kazanım kodları kaynaktaki bölüm numaralarıdır (3. ünite alt konulara bölündü). Güncel istihdam oranları yaklaşık verildi; örnek sorular eklendi.")
