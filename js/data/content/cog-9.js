/* =========================================================
   9. Sınıf Coğrafya — konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Coğrafya Ders Kitabı – Konu Anlatım Notları" (7 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Örnek soruların bir kısmı kazanımı uygulamak için eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/cografya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Coğrafyanın Doğası",
   "en": "Unit 1: The Nature of Geography"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1.1",
    "title": {
     "tr": "Coğrafya biliminin konusu ve bölümleri",
     "en": "The subject and branches of geography"
    },
    "content": {
     "anlatim": "# Coğrafya Biliminin Konusu\n\n- **Doğal ortam:** İnsan etkisi olmadan oluşmuş, insan ve insani unsurların dışında kalan yer. Beş temel ortamdan oluşur: **taş küre (litosfer), hava küre (atmosfer), su küre (hidrosfer), buz küre (kriyosfer) ve yaşam küre (biyosfer)**. Bu ortamlar etkileşim hâlindedir; doğal ortamdaki değişimlere **doğa olayı** denir.\n- **Beşerî ortam:** İnsanın sosyal, kültürel ve ekonomik faaliyetleri sonucunda doğal ortam üzerine inşa ettiği yaşam alanı.\n- **Coğrafi ortam:** Doğal ve beşerî ortamın birlikteliğinden oluşan **en geniş yaşam alanı**; doğa ile insan arasında sürekli etkileşim vardır.\n- **Coğrafya:** Doğa olayları ile insan faaliyetleri arasındaki **etkileşimi** inceleyen bilimdir. Kelime Yunanca **\"geo\" (yer)** ve **\"graphein\" (tasvir etmek)** kelimelerinden gelir.\n\n# Coğrafyanın Bölümleri\n\n### Fiziki Coğrafya — doğal olay ve süreçler\n\n| Alt dal | İnceleme alanı |\n|---|---|\n| **Jeomorfoloji** | Yer şekilleri, oluşum süreçleri ve dağılışı (jeoloji, jeofizik vb. ile etkileşimli) |\n| **Klimatoloji** | Atmosfer, hava olayları, iklim tipleri ve dağılışı (meteoroloji ile etkileşimli) |\n| **Hidrografya** | Denizler, göller, akarsular; akıntı, dalga vb. |\n| **Biyocoğrafya** | Bitki ve hayvan topluluklarının özellikleri ve dağılışı |\n| **Toprak coğrafyası** | Toprakların oluşumu, özellikleri ve dağılışı (pedoloji, mineraloji) |\n\n### Beşerî Coğrafya — insan faaliyetlerinin mekândaki dağılımı\n\n| Alt dal | İnceleme alanı |\n|---|---|\n| **Nüfus coğrafyası** | Nüfusun özellikleri, dağılışı, hareketleri, nüfus politikaları |\n| **Yerleşme coğrafyası** | Yerleşmelerin gelişimi, tipleri, mesken tipleri |\n| **Siyasi coğrafya** | Siyasi olayların mekâna bağlı değişiklikleri |\n| **Sosyal coğrafya** | Sosyal ilişkiler, kimlikler ve eşitsizlikler |\n| **Kültürel coğrafya** | Dil, din, giyim, yemek, müzik, mimari |\n| **Ekonomik coğrafya** | Sanayi, ticaret, tarım, hayvancılık, turizm, madencilik |\n\n**Coğrafyada kullanılan teknikler:** haritalama, uzaktan algılama, niceleme (istatistik) yöntemleri, **Coğrafi Bilgi Sistemleri (CBS)**.",
     "ornekler": [],
     "ozet": [
      "Doğal ortamın 5 küresi: **litosfer, atmosfer, hidrosfer, kriyosfer, biyosfer**.",
      "Coğrafi ortam = doğal ortam + beşerî ortam.",
      "Geo = yer, graphein = tasvir etmek.",
      "Fiziki: jeomorfoloji, klimatoloji, hidrografya, biyocoğrafya, toprak · Beşerî: nüfus, yerleşme, siyasi, sosyal, kültürel, ekonomik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.1.2",
    "title": {
     "tr": "Niçin coğrafya öğrenmeliyiz?",
     "en": "Why should we learn geography?"
    },
    "content": {
     "anlatim": "# Niçin Coğrafya Öğrenmeliyiz?\n\nGünümüzde doğal kaynakların yıllık tüketimi, Dünya ekosisteminin bir yılda ürettiği kaynaklardan **daha fazladır**. Bu durum insanlık ve Dünya için büyük bir tehdittir.\n\nCoğrafya bilgisine sahip insanlar doğal ortamdaki unsurları, doğa olaylarını ve insan faaliyetleriyle etkileşimini **bütünsel** görebilir. Coğrafi bakış açısına sahip insan:\n- Risk ve fırsatları **analiz eder**,\n- Doğal ortamın **sınırlılıklarını** görür,\n- **Haritaları** kullanır,\n- Olayları **yerel, bölgesel ve küresel** ölçekte kavrar.\n\nCoğrafya bilgisi **sürdürülebilir bir Dünya** için gereklidir ve **vatanseverlik bilincinin** oluşmasında rol oynar.\n\n### Coğrafyanın Cevap Aradığı Sorular\n\n**Ne? Nerede? Ne zaman? Neden orada? Neden önemli?** Bulunduğu ortamın özellikleri neler? Doğal ve beşerî ortamlarla nasıl bir ilişkisi var?",
     "ornekler": [],
     "ozet": [
      "Kaynak tüketimi, ekosistemin yıllık üretimini **aşıyor**.",
      "Coğrafi bakış: risk-fırsat analizi, harita kullanımı, yerel-küresel ölçek.",
      "Temel sorular: **Ne? Nerede? Ne zaman? Neden orada? Neden önemli?**"
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.1.3",
    "title": {
     "tr": "Coğrafya biliminin gelişimi",
     "en": "The development of geography"
    },
    "content": {
     "anlatim": "# Coğrafya Biliminin Gelişimi\n\nCoğrafya dünyanın en eski bilimlerinden biridir. Kavram ilk kez **Eratosthenes** tarafından kullanılmıştır.\n\n| Dönem | Etkili gelişmeler | Önemli isimler |\n|---|---|---|\n| **Eski Çağ** | Gezilen yerlerin tasviri ve haritalanması; kentlerin kurulması, ticaret, yazının icadı. Dünya'nın şekli, boyutları, koordinat sistemi ve yönler ele alındı. | Tales, Herodot, Aristoteles, Eratosthenes, Strabon, Batlamyus |\n| **Orta Çağ** | İpek Yolu ve Baharat Yolu ticareti, büyük göçler. Namaz vakitleri, hac yolları gibi ihtiyaçlar coğrafyaya ilgiyi artırdı. | Harizmi, Biruni, İbni Haldun, Muhammed İdrisi, İbni Battuta, Mesudi |\n| **Yeni Çağ** | Rönesans, reform ve sömürgecilik hareketleri | Kristof Kolomb, Macellan, Piri Reis, Ortelius, Kâtip Çelebi, Evliya Çelebi |\n| **Yakın Çağ** | Fransız İhtilali, Sanayi Devrimi, bilim ve teknoloji. Sebep-sonuç ilişkileri ele alındı; coğrafyanın yöntemleri ve bölümleri bugünkü şeklini aldı. | Von Humboldt, Carl Ritter, Friedrich Ratzel |\n| **Cumhuriyet Dönemi** | Türkiye'de modern coğrafya çalışmaları | Besim Darkot, Faik Sabri Duran, Reşat İzbırak, Sırrı Erinç |\n\nGünümüzde coğrafya; doğal ve beşerî sistemlerdeki unsurları, işleyişi ve etkileşimi inceleyen, **mekânsal dağılışı** ortaya koyan, **neden-sonuç** ilişkilerini sorgulayan ve birçok alt dalı olan bir bilimdir.",
     "ornekler": [],
     "ozet": [
      "Coğrafya kavramını ilk kullanan: **Eratosthenes**.",
      "Orta Çağ: Müslüman bilginler (Biruni, İbni Haldun, İdrisi…).",
      "Yeni Çağ: **Piri Reis**, Kâtip Çelebi, Evliya Çelebi · Yakın Çağ: Humboldt, Ritter, Ratzel."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Mekânsal Bilgi Teknolojileri",
   "en": "Unit 2: Spatial Information Technologies"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1.1",
    "title": {
     "tr": "Mekânın sembolik dili: harita, harita elemanları ve harita türleri",
     "en": "The symbolic language of space: maps, map elements and map types"
    },
    "content": {
     "anlatim": "# Harita\n\n**Harita:** Dünya'nın veya başka bir gök cisminin tamamına ya da bir bölümüne ait coğrafi unsurların **belirli bir oranda küçültülerek**, **kuş bakışı** görünümle **düzlem** üzerine çizilmesidir.\n\n### Bir Çizimin Harita Sayılması İçin\n\n- **Kuş bakışı** (dik açı) görünümle çizilmeli,\n- **Ölçek** kullanılmalı (ölçeksiz çizimlere **kroki** denir),\n- **Düzlem** üzerine çizilmeli (kâğıt, kabartma yüzey veya ekran).\n\n**Harita elemanları:** başlık, çerçeve, coğrafi koordinatlar, harita işaretleri (**lejant**), yön oku ve **ölçek**.\n\n### Harita Türleri (Kullanım Amacına Göre)\n\n- **Genel haritalar:** fiziki, siyasi, topoğrafya haritaları vb.\n- **Tematik haritalar:** jeoloji, jeomorfoloji, iklim, toprak, bitki örtüsü, nüfus, ulaşım, turizm, ekonomi haritaları vb.",
     "ornekler": [],
     "ozet": [
      "Harita: **küçültülmüş, kuş bakışı, düzlem** üzerine çizim; ölçeksizse **kroki**.",
      "Lejant = harita işaretlerinin açıklaması.",
      "Genel haritalar (fiziki, siyasi) · tematik haritalar (iklim, nüfus…)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.1.1",
    "title": {
     "tr": "Coğrafi koordinatlar, yerel saat ve saat dilimleri",
     "en": "Geographic coordinates, local time and time zones"
    },
    "content": {
     "anlatim": "# Coğrafi Koordinatlar\n\n- **Enlem:** Bir noktanın **Ekvator'a** uzaklığının yerin merkeziyle yaptığı açı değeri. Derece (°), dakika (′), saniye (″) ile ifade edilir.\n- **Boylam:** Bir noktanın **başlangıç meridyenine** uzaklığının yerin merkeziyle yaptığı açı değeri.\n- **GPS (Küresel Konumlandırma Sistemi):** Uydular aracılığıyla bir yerin coğrafi koordinatlarını belirleyen sistem.\n\n# Yerel Saat, Ulusal Saat, Saat Dilimleri\n\n- **Yerel saat:** Güneş'in ufuk düzleminde en yüksek noktaya ulaştığı öğle vaktine (**12.00**) göre ayarlanan saat.\n- **Ulusal (ortak) saat:** Ülke sınırları içindeki bir meridyenin yerel saatinin ortak saat olarak kullanılması. **Türkiye'de 45° doğu meridyeninin** yerel saati kullanılır (**+3 saat dilimi**).\n- **Uluslararası saat dilimleri:** Dünya **15'er derecelik** aralıklarla **24 saat dilimine** ayrılmıştır. **Tarih değiştirme çizgisi 180° meridyenidir.**",
     "ornekler": [
      {
       "soru": "Türkiye neden +3 saat dilimini kullanır?",
       "cozum": "Her saat dilimi 15° genişliktedir. Türkiye ortak saat olarak **45° doğu meridyeninin** yerel saatini kullanır: 45 ÷ 15 = **3** → başlangıç meridyeninden **3 saat ileri**."
      }
     ],
     "ozet": [
      "Enlem → **Ekvator'a** uzaklık; boylam → **başlangıç meridyenine** uzaklık.",
      "24 saat dilimi, her biri **15°**.",
      "Türkiye: **45° doğu** meridyeni, **+3**; tarih değiştirme çizgisi **180°**."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.1.1",
    "title": {
     "tr": "Projeksiyon yöntemleri, ölçek ve haritalama teknikleri",
     "en": "Projection methods, scale and mapping techniques"
    },
    "content": {
     "anlatim": "# Projeksiyon Yöntemleri\n\nKüre şeklindeki Dünya'nın düzleme aktarılırken oluşan **bozulmaları** en aza indirmek için kullanılır.\n- **Silindirik projeksiyon:** **Ekvator** çevresinde bozulma az, kutuplara doğru artar.\n- **Konik projeksiyon:** **Orta kuşakta** bozulma azdır.\n- **Düzlem projeksiyon:** Özellikle **kutup** bölgelerinin gösteriminde kullanılır.\n\n# Ölçek\n\nHarita çiziminde kullanılan **küçültme oranıdır**.\n- **Kesir ölçek:** 1/100.000 gibi gösterilir; **pay her zaman 1**, birim **cm**'dir.\n- **Çizgi ölçek:** Grafik olarak gösterilir; harita büyütülüp küçültüldüğünde ölçek de değiştiği için tercih edilir.\n\n| | **Büyük ölçekli harita** | **Küçük ölçekli harita** |\n|---|---|---|\n| Küçültme oranı | Az | Fazla |\n| Ayrıntı | Fazla | Az |\n| Gösterilen alan | Dar | Geniş |\n\n# Haritalama Teknikleri\n\n- **Korokromatik:** renk/desenle alan gösterimi\n- **Koroplet:** sayısal değerlere göre dereceli renklendirme\n- **İzoplet (izometrik):** eşit değer hatları (izohips, izoterm, izobar vb.)\n- **Noktalama:** nokta sembollerle miktar gösterimi\n- **Oransal sembol:** boyutu değere göre değişen semboller\n- **Akış haritaları:** hareketin miktarı ve yönü\n- **Kartogram**",
     "ornekler": [
      {
       "soru": "1/100.000 ölçekli bir haritada iki şehir arası 5 cm ölçülüyor. Gerçek uzaklık kaç km'dir?",
       "cozum": "Haritada 1 cm = 100.000 cm = **1 km**. 5 cm × 1 km = **5 km**."
      }
     ],
     "ozet": [
      "Silindirik → Ekvator'da az bozulma; konik → orta kuşak; düzlem → **kutuplar**.",
      "Büyük ölçek: **dar alan, çok ayrıntı**; küçük ölçek: **geniş alan, az ayrıntı**.",
      "İzoplet = **eşit değer hatları** (izohips, izoterm, izobar)."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.1.2",
    "title": {
     "tr": "Türkiye'nin coğrafi konumu",
     "en": "Türkiye's geographic location"
    },
    "content": {
     "anlatim": "# Türkiye'nin Coğrafi Konumu\n\n- Türkiye, **36°–42° kuzey enlemleri** ile **26°–45° doğu boylamları** arasında yer alır.\n- **Asya ve Avrupa** kıtalarının kesişim noktasındadır.\n- **Üç tarafı denizlerle** çevrilidir: Karadeniz, Akdeniz, Ege.\n- **Boğazlar** (İstanbul ve Çanakkale) stratejik önem taşır.\n- **Jeopolitik konumu** nedeniyle tarih boyunca önemli bir geçiş noktası olmuştur.",
     "ornekler": [],
     "ozet": [
      "Türkiye: **36°–42° K enlemleri**, **26°–45° D boylamları**.",
      "Asya-Avrupa kesişimi; üç tarafı deniz; boğazlar stratejik."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.1.3",
    "title": {
     "tr": "Mekânsal bilgi teknolojilerinin bileşenleri",
     "en": "Components of spatial information technologies"
    },
    "content": {
     "anlatim": "# Mekânsal Bilgi Teknolojileri\n\nCoğrafi verilerin **toplanması, depolanması, analiz edilmesi ve görselleştirilmesi** için kullanılan teknolojilerdir.\n\n### Temel Bileşenler\n\n- **Coğrafi Bilgi Sistemleri (CBS)**\n- **Uzaktan algılama** (uydu ve hava fotoğrafları)\n- **GPS**\n- **Mekânsal veri tabanları**\n- **Dijital haritalama** sistemleri",
     "ornekler": [],
     "ozet": [
      "Mekânsal bilgi teknolojileri: veri **toplama, depolama, analiz, görselleştirme**.",
      "Bileşenler: **CBS, uzaktan algılama, GPS**, mekânsal veri tabanı, dijital haritalama."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Doğal Sistemler ve Süreçler",
   "en": "Unit 3: Natural Systems and Processes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1.1",
    "title": {
     "tr": "Hava olayları ve hava elemanları",
     "en": "Weather events and weather elements"
    },
    "content": {
     "anlatim": "# Hava Olayları\n\n**Hava olayları:** Belirli bir yer ve zamanda gerçekleşen sıcaklık, rüzgâr, nem, sis, yağış gibi hava koşullarıdır.\n- **Meteoroloji:** Hava olaylarını ve bunları oluşturan süreçleri inceler; **meteorolog** hava tahmini yapar.\n- **Klimatoloji:** Fiziki coğrafyanın alt dalı; iklim sistemini inceler. **Klimatolog** iklim özelliklerini ve dağılışını açıklar.\n- **İklim:** Bir bölgedeki hava olaylarının **uzun süreli ortalamalarının** ve uç değerlerinin genel durumudur.\n\n### Atmosfer\n\nHava olaylarının gerçekleştiği gaz karışımıdır: **azot (%78)**, **oksijen (%21)** ve diğer gazlar. Zararlı ışınları emer, meteorları engeller, aşırı ısınma/soğumayı önler, yaşam için uygun koşullar sağlar.\n\n| Hava elemanı | Tanım | Ölçüm aracı (birim) |\n|---|---|---|\n| **Sıcaklık** | Taneciklerin ortalama kinetik enerjisinin ölçüsü; Güneş'e doğrudan maruz kalmayan, yerden **1,5–2 m** yükseklikte ölçülür | Termometre (°C) |\n| **Basınç** | Atmosfer gazlarının birim yüzeye uyguladığı kuvvet. Standart: 45° enlemi, deniz seviyesi, 15 °C'ta **1013 mb** | Barometre (mb, hPa) |\n| **Rüzgâr** | **Yüksek basınçtan alçak basınca** doğru yatay hava hareketi | Anemometre (m/sn, km/sa) |\n| **Nem** | Atmosferdeki su buharı | Higrometre |\n| **Yağış** | Doyma noktasında yoğuşma → sis, bulut, yağış | Plüviyometre (mm) |",
     "ornekler": [],
     "ozet": [
      "Hava durumu **kısa süreli**, iklim **uzun süreli ortalama**.",
      "Atmosfer: **%78 azot, %21 oksijen**.",
      "Rüzgâr **yüksekten alçak basınca** eser; standart basınç **1013 mb**.",
      "Barometre-basınç · anemometre-rüzgâr · higrometre-nem · plüviyometre-yağış."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.1.2",
    "title": {
     "tr": "İklim sistemi ve iklimi etkileyen faktörler",
     "en": "The climate system and factors affecting climate"
    },
    "content": {
     "anlatim": "# İklim Sistemi\n\nİklim sistemi; **atmosfer, hidrosfer, litosfer, biyosfer ve kriyosfer** arasındaki karmaşık etkileşimlerden oluşur.\n\n- **Güneş enerjisi** sistemin temel enerji kaynağıdır.\n- **Dünya'nın şekli (geoit), eksen eğikliği, dönme ve dolanma** hareketleri iklim sistemini etkiler.\n- **Yerel iklim özelliklerini belirleyen faktörler:** karasallık-denizellik, okyanus akıntıları, topoğrafik faktörler (yükselti, **bakı**, dağların uzanışı).",
     "ornekler": [],
     "ozet": [
      "İklim sistemi = atmosfer + hidrosfer + litosfer + biyosfer + kriyosfer.",
      "Temel enerji kaynağı: **Güneş**.",
      "Yerel iklim: karasallık-denizellik, okyanus akıntıları, yükselti, bakı, dağların uzanışı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.1.3",
    "title": {
     "tr": "İklim türleri",
     "en": "Climate types"
    },
    "content": {
     "anlatim": "# İklim Türleri\n\nİklim türleri **sıcaklık ve yağış** özelliklerine göre sınıflandırılır. Her iklim tipinin kendine özgü sıcaklık, **yağış rejimi**, **bitki örtüsü** ve toprak özellikleri vardır.\n\n**Başlıca iklim tipleri:** Ekvatoral, savan (tropikal), muson, çöl, Akdeniz, okyanus, karasal, step (bozkır), tundra ve kutup iklimleri.",
     "ornekler": [],
     "ozet": [
      "İklim tipleri **sıcaklık ve yağışa** göre ayrılır.",
      "Ekvatoral, savan, muson, çöl, Akdeniz, okyanus, karasal, step, tundra, kutup."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.1.4",
    "title": {
     "tr": "İklim sisteminde yaşanan değişiklikler",
     "en": "Changes in the climate system"
    },
    "content": {
     "anlatim": "# Küresel İklim Değişikliği\n\nİnsan faaliyetleri (**fosil yakıt** kullanımı, **ormansızlaşma**, sanayi) sonucu **sera gazlarının** artmasıyla atmosferin ısınmasıdır.\n\n### Sonuçları\n\n- Sıcaklık artışı\n- Buzulların erimesi ve **deniz seviyesinin yükselmesi**\n- **Ekstrem hava olaylarının** artması\n- Biyoçeşitlilik kaybı\n- Tarımsal verimde değişiklikler\n\n**Kentsel ısı adası etkisi** de yerel sıcaklık artışına neden olur.",
     "ornekler": [],
     "ozet": [
      "Neden: fosil yakıt, ormansızlaşma, sanayi → **sera gazı artışı**.",
      "Sonuç: buzul erimesi, deniz seviyesi yükselmesi, ekstrem hava olayları, biyoçeşitlilik kaybı.",
      "Kentlerde **ısı adası** etkisi."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Beşerî Sistemler ve Süreçler",
   "en": "Unit 4: Human Systems and Processes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1.1",
    "title": {
     "tr": "Nüfusun tarihsel değişimi ve geleceği",
     "en": "Historical change and future of population"
    },
    "content": {
     "anlatim": "# Nüfus Dinamikleri\n\n**Nüfus dinamiği:** Nüfus özelliklerinin zaman içindeki değişimi, mekândaki dağılışı ve nüfus hareketleridir. Sağlık, eğitim, ekonomik büyüme, gıda güvenliği, kentleşme ve doğal kaynak yönetimi üzerinde belirleyicidir.\n\n# Nüfusun Tarihsel Değişimi\n\n| Sıçrama | Ne zaman? | Nedeni ve sonuçları |\n|---|---|---|\n| **Birinci** | Yaklaşık 1 milyon yıl önce | **Alet yapımı**; beslenme iyileşti, vahşi hayvanlarla mücadele kolaylaştı. |\n| **İkinci (Neolitik dönem)** | Yaklaşık 10 bin yıl önce | **Tarım ve yerleşik hayat**; gıdaya erişim kolaylaştı, ilk şehirler kuruldu. Nüfus 150–300 milyona ulaştı. |\n| **Üçüncü** | Sanayi Devrimi ve sonrası | Tıp, beslenme ve sağlık koşulları iyileşti; ölüm oranları düştü, ortalama ömür uzadı. 1800'lerde **1 milyar**, 1927'de **2 milyar**; 1950'den sonra hızlı artış. |\n\n**Nüfus projeksiyonu:** Mevcut eğilimlere göre yapılan nüfus tahminleridir. UNFPA'ya göre **2100** yılında dünya nüfusunun **9–13 milyar** arasında olması beklenmektedir.",
     "ornekler": [],
     "ozet": [
      "1. sıçrama **alet yapımı**, 2. sıçrama **tarım** (Neolitik), 3. sıçrama **Sanayi Devrimi**.",
      "1800'ler 1 milyar, 1927 2 milyar.",
      "2100 tahmini: **9–13 milyar** (UNFPA)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.1.2",
    "title": {
     "tr": "Nüfusun dağılışı ve hareketleri",
     "en": "Population distribution and movements"
    },
    "content": {
     "anlatim": "# Nüfusun Dağılışı\n\nNüfus yeryüzünde **eşit dağılmamıştır**.\n- **Doğal faktörler:** iklim, yer şekilleri, su kaynakları, toprak verimliliği.\n- **Beşerî faktörler:** sanayi, ulaşım, tarihsel süreçler, ekonomik fırsatlar.\n- **Nüfus yoğunluğu:** Birim alana (km²) düşen kişi sayısı.\n\n# Göç\n\nİnsanların **sürekli veya geçici** olarak yer değiştirmesidir.\n- **İtici faktörler:** savaş, işsizlik, afet.\n- **Çekici faktörler:** iş imkânı, eğitim, güvenlik.",
     "ornekler": [
      {
       "soru": "Yüzölçümü 800 km², nüfusu 40.000 olan bir ilçenin nüfus yoğunluğu nedir?",
       "cozum": "Nüfus yoğunluğu = nüfus ÷ alan = 40.000 ÷ 800 = **50 kişi/km²**."
      }
     ],
     "ozet": [
      "Dağılışı doğal (iklim, yer şekli, su, toprak) ve beşerî (sanayi, ulaşım) faktörler belirler.",
      "Nüfus yoğunluğu = **nüfus ÷ alan**.",
      "Göç: **itici** (savaş, işsizlik, afet) ve **çekici** (iş, eğitim, güvenlik) faktörler."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.1.3",
    "title": {
     "tr": "Demografik dönüşüm süreci ve nüfus piramitleri",
     "en": "The demographic transition and population pyramids"
    },
    "content": {
     "anlatim": "# Demografik Dönüşüm\n\nYüksek doğum ve ölüm oranlarından **düşük doğum ve ölüm oranlarına** geçiş sürecidir.\n\n1. Yüksek doğum – yüksek ölüm\n2. Yüksek doğum – düşük ölüm → **hızlı nüfus artışı**\n3. Düşük doğum – düşük ölüm → **yavaş artış / durağanlık**\n\n# Nüfus Piramidi\n\nNüfusun **yaş ve cinsiyet** yapısını gösteren grafiktir.\n- **Geniş tabanlı** piramit → **genç ve hızlı artan** nüfus.\n- **Dar tabanlı, üst kısmı geniş** piramit → **yaşlı** nüfus.\n\n**Önemli göstergeler:** bağımlı nüfus (**0–14 ve 65+ yaş**), ortanca yaş, genç ve yaşlı nüfus oranları.",
     "ornekler": [],
     "ozet": [
      "Demografik dönüşüm: yüksek doğum-ölüm → **düşük doğum-ölüm**.",
      "Geniş taban = **genç** nüfus; dar taban = **yaşlı** nüfus.",
      "Bağımlı nüfus: **0–14** ve **65+** yaş."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.1.4",
    "title": {
     "tr": "Nüfus politikaları",
     "en": "Population policies"
    },
    "content": {
     "anlatim": "# Nüfus Politikaları\n\nDevletlerin nüfusun **miktarı, yapısı ve dağılışı** üzerinde etki yaratmak amacıyla uyguladığı politikalardır.\n\n- Nüfus artışını **teşvik eden (pronatalist)** veya **sınırlayan (antinatalist)** politikalar uygulanabilir.\n- Eğitim, sağlık, aile planlaması, göç yönetimi ve yaşlılık politikaları bu kapsamdadır.\n- **Türkiye'de** nüfus artış hızının yavaşlaması ve yaşlı nüfus oranının artması nedeniyle **aktif yaşlanma** ve **nitelikli nüfus** politikaları önem kazanmıştır.",
     "ornekler": [],
     "ozet": [
      "Pronatalist = **artışı teşvik**; antinatalist = **artışı sınırlama**.",
      "Türkiye: artış hızı yavaşlıyor, yaşlı oranı artıyor → aktif yaşlanma, nitelikli nüfus."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Ekonomik Faaliyetler ve Etkileri",
   "en": "Unit 5: Economic Activities and Their Effects"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1.1",
    "title": {
     "tr": "Ekonomik faaliyetleri etkileyen doğal faktörler",
     "en": "Natural factors affecting economic activities"
    },
    "content": {
     "anlatim": "# Ekonomik Faaliyetler\n\n**Ekonomik faaliyet:** İnsanların hayatlarını sürdürmek, gelir elde etmek ve refah seviyelerini yükseltmek için yaptıkları çalışmalardır; **üretim, dağıtım ve tüketim** süreçlerini kapsar.\n\n# Doğal Faktörler\n\n| Faktör | Etkisi |\n|---|---|\n| **Coğrafi konum** | Ticaret yollarına, doğal kaynaklara ve pazarlara yakınlık avantaj sağlar. Türkiye'nin boğazlara ve kıtalar arası konumu **enerji taşımacılığında** stratejik önemdedir. |\n| **İklim** | Tarım ürünlerinin türü ve verimi, turizm, enerji üretimi (güneş, rüzgâr, hidroelektrik) |\n| **Topoğrafya** | Tarım arazilerinin dağılışı, ulaşım güzergâhları, liman ve havalimanı yer seçimi, turizm potansiyeli |\n| **Su kaynakları** | Balıkçılık, hidroelektrik, sulama, deniz ulaşımı, bazı sanayi tesisleri |\n| **Toprak** | Tarımın temeli; seramik, kiremit, tuğla için ham madde |\n| **Bitki örtüsü** | Hayvancılık; kereste, kâğıt, mobilya ham maddesi; turizm ve rekreasyon |\n| **Madenler ve enerji kaynakları** | Sanayi tesislerinin kuruluş yeri (ör. demir-çelik tesislerinin **kömür yataklarına yakın** kurulması) |",
     "ornekler": [],
     "ozet": [
      "Ekonomik faaliyet: **üretim, dağıtım, tüketim**.",
      "Doğal faktörler: konum, iklim, topoğrafya, su, toprak, bitki örtüsü, madenler.",
      "Demir-çelik tesisleri **kömür yataklarına** yakın kurulur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.1.2",
    "title": {
     "tr": "Ekonomik faaliyetleri etkileyen beşerî faktörler",
     "en": "Human factors affecting economic activities"
    },
    "content": {
     "anlatim": "# Beşerî Faktörler\n\n- **Nüfus:** Miktar, artış hızı, yaş yapısı ve eğitim düzeyi. Ekonomik büyüme ile nüfus artışı **dengeli** olmalıdır.\n- **İş gücü:** Varlığı ve maliyeti önemlidir. Gelişmiş ülkeler üretimin bir kısmını **iş gücü maliyetinin düşük** olduğu ülkelere kaydırır.\n- **Sermaye:** Tesislerin kuruluşu, devamlılığı ve gelişmesi için gereklidir. **Çok uluslu şirketler** sermaye hareketliliğini artırır.\n- **Teknoloji:** Üretim, dağıtım ve tüketimi hızlandırır. **Dört sanayi devrimi** (buhar, elektrik, elektronik, dijital) maliyetleri düşürmüş, hız ve kaliteyi artırmıştır.\n- **Ulaşım:** Ham maddenin fabrikaya, ürünün pazara ulaşmasında kritik rol oynar. Gelişmiş limanlar sanayi ve ticaret merkezleriyle örtüşür.\n- **Devlet politikaları:** Ekonomiye müdahale düzeyi, teşvikler, hukuki ve siyasi istikrar **yabancı sermaye** girişini etkiler.",
     "ornekler": [],
     "ozet": [
      "Beşerî faktörler: **nüfus, iş gücü, sermaye, teknoloji, ulaşım, devlet politikaları**.",
      "Dört sanayi devrimi: **buhar, elektrik, elektronik, dijital**.",
      "Düşük iş gücü maliyeti üretimi çeker; istikrar yabancı sermayeyi çeker."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: Afetler ve Sürdürülebilir Çevre",
   "en": "Unit 6: Disasters and a Sustainable Environment"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1.1",
    "title": {
     "tr": "Tehlike, risk ve afet kavramları",
     "en": "Hazard, risk and disaster"
    },
    "content": {
     "anlatim": "# Tehlike, Risk ve Afet\n\n- **Tehlike:** Belirli bir zaman ve yerde ortaya çıkarak insan hayatını, mal varlığını, beşerî faaliyetleri ve doğal çevreyi **olumsuz etkileme potansiyeli** olan olaylar (deprem, sel, volkan, yangın, salgın vb.).\n- **Risk:** Bir olayın belirli koşullarda meydana gelme **ihtimali** ile doğurabileceği can, mal, ekonomik ve çevresel **kayıp olasılığı**.\n  - **Risk = Tehlike × Maruziyet × Güvenlik açığı**\n- **Afet:** Tehlikeli olaylara maruz kalınmasıyla olağan hayatı bozan, can ve mal kaybına yol açan, **insanların baş etme kapasitesini aşarak dış yardım gerektiren** olaylar.\n- **Ekstrem doğa olayı:** Doğanın akışı içindeki bir olayın aşırı veya sıra dışı şekilde gerçekleşmesi (ör. **1960 Şili depremi, 9,5** büyüklüğünde).\n\n### Örnek İlişki\n\nAşırı yağış → **sel tehlikesi** · Vadi tabanına yerleşme → **risk artışı** · Taşkın + zayıf yapı + tahliye planı eksikliği → **afet**",
     "ornekler": [
      {
       "soru": "Aynı büyüklükteki deprem, A şehrinde az, B şehrinde çok hasara yol açıyor. Bunun nedeni ne olabilir?",
       "cozum": "Tehlike (deprem) aynıdır; fark **riskin** diğer bileşenlerindedir. B şehrinde **maruziyet** (yoğun nüfus, fay hattına yakınlık) ve **güvenlik açığı** (dayanıksız yapılar, hazırlık eksikliği) daha yüksektir."
      }
     ],
     "ozet": [
      "**Risk = Tehlike × Maruziyet × Güvenlik açığı**.",
      "Afet: baş etme kapasitesini aşar, **dış yardım** gerektirir.",
      "Tehlike her zaman afete dönüşmez; hazırlık riski azaltır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "6.1.2",
    "title": {
     "tr": "Afet türleri",
     "en": "Types of disasters"
    },
    "content": {
     "anlatim": "# Afet Türleri\n\nAfetler oluşum nedenine, hızına ve etki alanına göre sınıflandırılır:\n\n| Tür | Örnekler |\n|---|---|\n| **Doğa kaynaklı** | Deprem, sel, taşkın, heyelan, çığ, volkanik patlama, tsunami, fırtına, tayfun, orman yangını, kuraklık |\n| **İnsan kaynaklı (teknoloji kökenli)** | Maden kazaları, ulaşım kazaları, endüstriyel kazalar, nükleer kazalar |\n| **Karma / sosyal** | Savaş, salgın hastalık, kitlesel göç |\n\nSon yıllarda **küresel iklim değişikliği**, doğal kaynakların aşırı kullanımı ve nüfus hareketleri nedeniyle afetlerin **sıklığı ve şiddeti artmaktadır**.",
     "ornekler": [],
     "ozet": [
      "Doğa kaynaklı (deprem, sel, heyelan…), insan kaynaklı (endüstriyel, nükleer kaza…), karma (savaş, salgın, göç).",
      "İklim değişikliği afetlerin sıklığını ve şiddetini artırıyor."
     ]
    }
   },
   {
    "id": "k3",
    "code": "6.1.3",
    "title": {
     "tr": "Bütüncül afet yönetimi",
     "en": "Integrated disaster management"
    },
    "content": {
     "anlatim": "# Bütüncül Afet Yönetimi\n\nAfet **öncesi, sırası ve sonrasını** kapsayan planlı ve koordineli süreçtir.\n\n### Bileşenleri\n\n- Risk analizi\n- **Erken uyarı** sistemleri\n- Hazırlık ve müdahale yetenekleri\n- **Zarar azaltma**\n- İyileştirme ve yeniden yapılandırma\n\n**Çoklu tehlike erken uyarı sistemleri**, afet eğitimleri, **acil durum çantası** hazırlığı ve **mekânsal planlama** riski azaltmada kritik öneme sahiptir.\n\n**\"Yeşil Vatan\"** yaklaşımı, orman yangınları gibi afetlere karşı bütüncül koruma anlayışını ifade eder.",
     "ornekler": [],
     "ozet": [
      "Afet yönetimi: **öncesi, sırası, sonrası**.",
      "Erken uyarı, afet eğitimi, acil durum çantası, mekânsal planlama riski azaltır.",
      "Yeşil Vatan: orman yangınlarına karşı bütüncül koruma."
     ]
    }
   }
  ]
 },
 {
  "id": "u7",
  "name": {
   "tr": "7. Ünite: Bölgeler, Ülkeler ve Küresel Bağlantılar",
   "en": "Unit 7: Regions, Countries and Global Connections"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "7.1.1",
    "title": {
     "tr": "Bölge belirleme kriterleri ve bölge türleri",
     "en": "Criteria for defining regions and types of regions"
    },
    "content": {
     "anlatim": "# Bölge\n\n**Bölge:** Yeryüzünün doğal ve beşerî unsurlar bakımından **kendi içinde benzerlik gösteren** parçalarıdır. Bölge belirleme kriterleri **fiziki** (yer şekilleri, iklim, bitki örtüsü vb.) veya **beşerî** (nüfus, yerleşme, sanayi, tarım, turizm vb.) olabilir.\n\n### Şekilsel Bölge\n\nDoğal veya beşerî özellikleriyle diğer alanlardan ayrılan bölgelerdir. **Belirli bir merkezi yoktur**; bölgedeki her yer aynı özelliğe sahiptir.\n- **Doğal şekilsel bölge:** yer şekilleri, iklim, su, toprak, bitki ve afet bölgeleri (Akdeniz iklim bölgesi, Orta Toroslar dağlık bölgesi).\n- **Beşerî şekilsel bölge:** ham madde, üretim, sanayi, nüfus, yerleşme, kültür bölgeleri (Türkiye'nin pamuk üretim bölgeleri, Türk kültür bölgesi).\n\n### İşlevsel (Fonksiyonel) Bölge\n\nBir **çekirdek (merkez)** ve onu çevreleyen alandan oluşur; ekonomik ve kültürel yönden etkileşim gösterir. Etkileşim yoğunluğu **merkezden uzaklaştıkça azalır**.\n- Örnekler: **metropoliten alanlar**, liman hinterlandları (**Rotterdam Limanı**), gazete tiraj alanları.",
     "ornekler": [],
     "ozet": [
      "Şekilsel bölge: **merkezi yok**, her yer aynı özellikte.",
      "İşlevsel bölge: **merkez + çevre**; etkileşim merkezden uzaklaştıkça azalır.",
      "Örnek: Akdeniz iklim bölgesi (doğal şekilsel), Rotterdam hinterlandı (işlevsel)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "7.1.2",
    "title": {
     "tr": "Kriterlere göre bölge sınırları",
     "en": "Region boundaries according to criteria"
    },
    "content": {
     "anlatim": "# Kriterlere Göre Bölge Sınırları\n\n- Bölge sınırı **kullanılan kritere** göre belirlenir; kriterin özelliği bölgenin dağılış alanını ve sınır **netliğini** etkiler.\n- **Net sınırlar:** siyasi sınırlar, büyükşehir belediye sınırları.\n- **Geçişli, belirsiz sınırlar:** iklim bölgeleri, bitki örtüsü geçişleri.\n- Doğal kriterlere göre oluşturulan bölgelerde genellikle **geçiş alanları** bulunur; beşerî kriterlere göre oluşturulan bazı bölgelerde sınırlar daha nettir.",
     "ornekler": [],
     "ozet": [
      "Siyasi ve idari sınırlar **net**; iklim ve bitki örtüsü sınırları **geçişli**.",
      "Doğal kriterli bölgelerde **geçiş alanları** bulunur."
     ]
    }
   },
   {
    "id": "k3",
    "code": "7.1.3",
    "title": {
     "tr": "Bölge sınırlarında değişim",
     "en": "Changes in regional boundaries"
    },
    "content": {
     "anlatim": "# Bölge Sınırlarında Değişim\n\nBölge sınırları **sabit değildir**. Şu faktörler sınırları değiştirebilir:\n- İklim değişikliği\n- Teknolojik gelişmeler\n- Ekonomik dönüşümler\n- Siyasi kararlar\n- Göç ve kentleşme\n\n**Örnekler:** sanayi bölgelerinin kayması, tarım alanlarının daralması, yeni turizm bölgelerinin ortaya çıkması, siyasi sınır değişiklikleri.\n\nBu nedenle bölgeler **dinamik** yapılardır ve zaman içinde yeniden tanımlanabilir.",
     "ornekler": [],
     "ozet": [
      "Bölge sınırları **dinamiktir**, zamanla değişir.",
      "Etkenler: iklim değişikliği, teknoloji, ekonomi, siyasi kararlar, göç ve kentleşme."
     ]
    }
   }
  ]
 }
];
