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
    "code": "COĞ.9.1.1",
    "title": {
     "tr": "Coğrafya biliminin konusu ve bölümleri",
     "en": "The subject and branches of geography"
    },
    "content": {
     "anlatim": "# Coğrafya Biliminin Konusu\n\n- **Doğal ortam:** İnsan etkisi olmadan oluşmuş, insan ve insani unsurların dışında kalan yer. Beş temel ortamdan oluşur: **taş küre (litosfer), hava küre (atmosfer), su küre (hidrosfer), buz küre (kriyosfer) ve yaşam küre (biyosfer)**. Bu ortamlar etkileşim hâlindedir; doğal ortamdaki değişimlere **doğa olayı** denir.\n- **Beşerî ortam:** İnsanın sosyal, kültürel ve ekonomik faaliyetleri sonucunda doğal ortam üzerine inşa ettiği yaşam alanı.\n- **Coğrafi ortam:** Doğal ve beşerî ortamın birlikteliğinden oluşan **en geniş yaşam alanı**; doğa ile insan arasında sürekli etkileşim vardır.\n- **Coğrafya:** Doğa olayları ile insan faaliyetleri arasındaki **etkileşimi** inceleyen bilimdir. Kelime Yunanca **\"geo\" (yer)** ve **\"graphein\" (tasvir etmek)** kelimelerinden gelir.\n\n# Coğrafyanın Bölümleri\n\n### Fiziki Coğrafya — doğal olay ve süreçler\n\n| Alt dal | İnceleme alanı |\n|---|---|\n| **Jeomorfoloji** | Yer şekilleri, oluşum süreçleri ve dağılışı (jeoloji, jeofizik vb. ile etkileşimli) |\n| **Klimatoloji** | Atmosfer, hava olayları, iklim tipleri ve dağılışı (meteoroloji ile etkileşimli) |\n| **Hidrografya** | Denizler, göller, akarsular; akıntı, dalga vb. |\n| **Biyocoğrafya** | Bitki ve hayvan topluluklarının özellikleri ve dağılışı |\n| **Toprak coğrafyası** | Toprakların oluşumu, özellikleri ve dağılışı (pedoloji, mineraloji) |\n\n### Beşerî Coğrafya — insan faaliyetlerinin mekândaki dağılımı\n\n| Alt dal | İnceleme alanı |\n|---|---|\n| **Nüfus coğrafyası** | Nüfusun özellikleri, dağılışı, hareketleri, nüfus politikaları |\n| **Yerleşme coğrafyası** | Yerleşmelerin gelişimi, tipleri, mesken tipleri |\n| **Siyasi coğrafya** | Siyasi olayların mekâna bağlı değişiklikleri |\n| **Sosyal coğrafya** | Sosyal ilişkiler, kimlikler ve eşitsizlikler |\n| **Kültürel coğrafya** | Dil, din, giyim, yemek, müzik, mimari |\n| **Ekonomik coğrafya** | Sanayi, ticaret, tarım, hayvancılık, turizm, madencilik |\n\n**Coğrafyada kullanılan teknikler:** haritalama, uzaktan algılama, niceleme (istatistik) yöntemleri, **Coğrafi Bilgi Sistemleri (CBS)**.",
     "ornekler": [
      {
       "soru": "Bir araştırmacı Doğu Karadeniz'deki heyelanların eğim, yağış ve yerleşme yerleriyle ilişkisini inceliyor. Bu çalışma coğrafyanın hangi bölümleriyle ilgilidir?",
       "cozum": "Eğim ve heyelan → **jeomorfoloji** (fiziki); yağış → **klimatoloji** (fiziki); yerleşme yerleri → **yerleşme coğrafyası** (beşerî). Coğrafya doğal ve beşerî unsurları **etkileşimiyle** birlikte inceler."
      },
      {
       "soru": "Kutup bölgelerindeki buz kütleleri doğal ortamın hangi küresinde yer alır? Bu küredeki değişim diğer küreleri nasıl etkiler?",
       "cozum": "**Kriyosfer** (buz küre). Buzulların erimesi **hidrosferde** deniz seviyesini yükseltir, **atmosferde** sıcaklık dengesini değiştirir, **biyosferde** kutup ayısı gibi canlıların yaşam alanını daraltır."
      }
     ],
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
    "code": "COĞ.9.1.2",
    "title": {
     "tr": "Niçin coğrafya öğrenmeliyiz?",
     "en": "Why should we learn geography?"
    },
    "content": {
     "anlatim": "# Niçin Coğrafya Öğrenmeliyiz?\n\nGünümüzde doğal kaynakların yıllık tüketimi, Dünya ekosisteminin bir yılda ürettiği kaynaklardan **daha fazladır**. Bu durum insanlık ve Dünya için büyük bir tehdittir.\n\nCoğrafya bilgisine sahip insanlar doğal ortamdaki unsurları, doğa olaylarını ve insan faaliyetleriyle etkileşimini **bütünsel** görebilir. Coğrafi bakış açısına sahip insan:\n- Risk ve fırsatları **analiz eder**,\n- Doğal ortamın **sınırlılıklarını** görür,\n- **Haritaları** kullanır,\n- Olayları **yerel, bölgesel ve küresel** ölçekte kavrar.\n\nCoğrafya bilgisi **sürdürülebilir bir Dünya** için gereklidir ve **vatanseverlik bilincinin** oluşmasında rol oynar.\n\n### Coğrafyanın Cevap Aradığı Sorular\n\n**Ne? Nerede? Ne zaman? Neden orada? Neden önemli?** Bulunduğu ortamın özellikleri neler? Doğal ve beşerî ortamlarla nasıl bir ilişkisi var?",
     "ornekler": [
      {
       "soru": "Bir belediye yeni bir okul için yer seçerken coğrafi bakış açısıyla hangi soruları sormalıdır?",
       "cozum": "**Nerede?** (öğrenci nüfusunun yoğun olduğu yer) · **Neden orada?** (ulaşım kolaylığı, güvenli yollar) · **Ne gibi riskler var?** (fay hattı, dere yatağı, heyelan) · **Çevreyle ilişkisi** (gürültü, sanayi tesislerine uzaklık)."
      },
      {
       "soru": "“Ekolojik borç günü” (insanlığın o yılın doğal kaynak bütçesini tükettiği gün) her yıl daha erkene geliyor. Bu durum coğrafya öğrenmenin önemini nasıl gösterir?",
       "cozum": "Doğal kaynakların yenilenme hızından **daha hızlı** tüketildiğini gösterir. Coğrafya, kaynakların mekândaki dağılışını ve sınırlılığını anlayıp **sürdürülebilir** kullanım kararları vermeyi sağlar."
      }
     ],
     "ozet": [
      "Kaynak tüketimi, ekosistemin yıllık üretimini **aşıyor**.",
      "Coğrafi bakış: risk-fırsat analizi, harita kullanımı, yerel-küresel ölçek.",
      "Temel sorular: **Ne? Nerede? Ne zaman? Neden orada? Neden önemli?**"
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.9.1.3",
    "title": {
     "tr": "Coğrafya biliminin gelişimi",
     "en": "The development of geography"
    },
    "content": {
     "anlatim": "# Coğrafya Biliminin Gelişimi\n\nCoğrafya dünyanın en eski bilimlerinden biridir. Kavram ilk kez **Eratosthenes** tarafından kullanılmıştır.\n\n| Dönem | Etkili gelişmeler | Önemli isimler |\n|---|---|---|\n| **Eski Çağ** | Gezilen yerlerin tasviri ve haritalanması; kentlerin kurulması, ticaret, yazının icadı. Dünya'nın şekli, boyutları, koordinat sistemi ve yönler ele alındı. | Tales, Herodot, Aristoteles, Eratosthenes, Strabon, Batlamyus |\n| **Orta Çağ** | İpek Yolu ve Baharat Yolu ticareti, büyük göçler. Namaz vakitleri, hac yolları gibi ihtiyaçlar coğrafyaya ilgiyi artırdı. | Harizmi, Biruni, İbni Haldun, Muhammed İdrisi, İbni Battuta, Mesudi |\n| **Yeni Çağ** | Rönesans, reform ve sömürgecilik hareketleri | Kristof Kolomb, Macellan, Piri Reis, Ortelius, Kâtip Çelebi, Evliya Çelebi |\n| **Yakın Çağ** | Fransız İhtilali, Sanayi Devrimi, bilim ve teknoloji. Sebep-sonuç ilişkileri ele alındı; coğrafyanın yöntemleri ve bölümleri bugünkü şeklini aldı. | Von Humboldt, Carl Ritter, Friedrich Ratzel |\n| **Cumhuriyet Dönemi** | Türkiye'de modern coğrafya çalışmaları | Besim Darkot, Faik Sabri Duran, Reşat İzbırak, Sırrı Erinç |\n\nGünümüzde coğrafya; doğal ve beşerî sistemlerdeki unsurları, işleyişi ve etkileşimi inceleyen, **mekânsal dağılışı** ortaya koyan, **neden-sonuç** ilişkilerini sorgulayan ve birçok alt dalı olan bir bilimdir.",
     "ornekler": [
      {
       "soru": "Eratosthenes'in Dünya'nın çevresini hesaplaması coğrafyanın hangi döneminin özelliğini yansıtır?",
       "cozum": "**Eski Çağ**: Dünya'nın şekli ve boyutlarının matematiksel yöntemlerle ele alındığı dönem. Eratosthenes, Siyene ve İskenderiye'deki gölge farkından Dünya'nın çevresini şaşırtıcı bir yakınlıkla hesaplamıştır."
      },
      {
       "soru": "Piri Reis'in Kitab-ı Bahriye'si ve dünya haritası hangi ihtiyaçla hazırlanmıştır?",
       "cozum": "Yeni Çağ'da **deniz ticareti ve keşifler** ön plandaydı. Kitab-ı Bahriye Akdeniz kıyılarını, limanlarını ve denizcilik bilgilerini; dünya haritası ise Atlas Okyanusu ve Amerika kıyılarını gösterir. Denizcilere **yön bulma ve güvenli seyir** bilgisi vermek amaçlanmıştır."
      }
     ],
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
    "code": "COĞ.9.2.1",
    "title": {
     "tr": "Mekânın sembolik dili: harita, harita elemanları ve harita türleri",
     "en": "The symbolic language of space: maps, map elements and map types"
    },
    "content": {
     "anlatim": "# Harita\n\n**Harita:** Dünya'nın veya başka bir gök cisminin tamamına ya da bir bölümüne ait coğrafi unsurların **belirli bir oranda küçültülerek**, **kuş bakışı** görünümle **düzlem** üzerine çizilmesidir.\n\n### Bir Çizimin Harita Sayılması İçin\n\n- **Kuş bakışı** (dik açı) görünümle çizilmeli,\n- **Ölçek** kullanılmalı (ölçeksiz çizimlere **kroki** denir),\n- **Düzlem** üzerine çizilmeli (kâğıt, kabartma yüzey veya ekran).\n\n**Harita elemanları:** başlık, çerçeve, coğrafi koordinatlar, harita işaretleri (**lejant**), yön oku ve **ölçek**.\n\n### Harita Türleri (Kullanım Amacına Göre)\n\n- **Genel haritalar:** fiziki, siyasi, topoğrafya haritaları vb.\n- **Tematik haritalar:** jeoloji, jeomorfoloji, iklim, toprak, bitki örtüsü, nüfus, ulaşım, turizm, ekonomi haritaları vb.",
     "ornekler": [
      {
       "soru": "Okulunuzun yerini arkadaşınıza gösteren el çizimi bir kroki neden harita sayılmaz?",
       "cozum": "Kroki **ölçeksizdir**; uzaklıklar ve alanlar belirli bir oranda küçültülmemiştir. Haritada kuş bakışı görünüm, düzlem ve **ölçek** birlikte bulunmalıdır."
      },
      {
       "soru": "Türkiye'nin yıllık yağış dağılışını göstermek için hangi tür harita kullanılır? Bu haritada hangi harita elemanı mutlaka bulunmalıdır?",
       "cozum": "**Tematik harita** (iklim/yağış haritası). Renklerin hangi yağış miktarını gösterdiğini açıklayan **lejant** mutlaka bulunmalıdır; başlık ve ölçek de gereklidir."
      }
     ],
     "ozet": [
      "Harita: **küçültülmüş, kuş bakışı, düzlem** üzerine çizim; ölçeksizse **kroki**.",
      "Lejant = harita işaretlerinin açıklaması.",
      "Genel haritalar (fiziki, siyasi) · tematik haritalar (iklim, nüfus…)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.9.2.1",
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
      },
      {
       "soru": "Edirne (26° D) ile Iğdır (44° D) arasında yerel saat farkı kaç dakikadır? Hangisinde Güneş önce doğar?",
       "cozum": "Boylam farkı $44 - 26 = 18°$; her boylam 4 dakika → $18 \\cdot 4 = 72$ dakika. Dünya batıdan doğuya döndüğü için Güneş **doğudaki Iğdır'da** önce doğar."
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
    "code": "COĞ.9.2.1",
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
      },
      {
       "soru": "1/500.000 ölçekli bir haritada 4 cm olan uzaklık gerçekte kaç km'dir? Aynı uzaklık 1/200.000 ölçekli haritada kaç cm gösterilir?",
       "cozum": "Gerçek uzaklık $= 4 \\cdot 500.000 = 2.000.000$ cm $= 20$ km. 1/200.000 ölçekte: $2.000.000 \\div 200.000 = 10$ cm. Ölçek büyüdükçe aynı uzaklık haritada daha uzun gösterilir."
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
    "code": "COĞ.9.2.2",
    "title": {
     "tr": "Türkiye'nin coğrafi konumu",
     "en": "Türkiye's geographic location"
    },
    "content": {
     "anlatim": "# Türkiye'nin Coğrafi Konumu\n\n- Türkiye, **36°–42° kuzey enlemleri** ile **26°–45° doğu boylamları** arasında yer alır.\n- **Asya ve Avrupa** kıtalarının kesişim noktasındadır.\n- **Üç tarafı denizlerle** çevrilidir: Karadeniz, Akdeniz, Ege.\n- **Boğazlar** (İstanbul ve Çanakkale) stratejik önem taşır.\n- **Jeopolitik konumu** nedeniyle tarih boyunca önemli bir geçiş noktası olmuştur.\n\n# Mutlak ve Göreceli Konum\n\n- **Mutlak (matematik) konum:** Coğrafi koordinatlarla belirlenen, değişmeyen konum (36°–42° K, 26°–45° D).\n- **Göreceli (özel) konum:** Bir yerin çevresindeki kara, deniz, boğaz, ticaret yolları ve komşu ülkelere göre konumu; zamanla önemi değişebilir.\n\n## Mutlak Konumun Sonuçları\n\n| Özellik | Sonuç |\n|---|---|\n| Kuzey yarım kürede, orta kuşakta | Dört mevsim belirgin; Güneş ışınları hiçbir yerde dik gelmez |\n| Doğu–batı arası 19 boylam | Doğu ile batı uçları arasında **76 dakika** yerel saat farkı (19 × 4 dk) |\n| Kuzey–güney arası 6 enlem | Güney kıyılarında sıcaklık daha yüksek; gölge boyu kuzeye gidildikçe uzar |\n| Kuzeyde 42° enlemi | Kış ve yaz arasındaki gün uzunluğu farkı kuzeyde daha fazla |\n\n## Göreceli Konumun Sonuçları\n\n- **Boğazlar** (İstanbul, Çanakkale) Karadeniz ile Akdeniz arasındaki tek deniz yoludur.\n- Asya, Avrupa ve Afrika'ya yakınlık → kara, hava ve boru hattı taşımacılığında **köprü ülke** (enerji koridoru).\n- Farklı iklimlerin etkisine açık olması tarım ürünü çeşitliliğini artırır.",
     "ornekler": [
      {
       "soru": "Türkiye'nin doğusu ile batısı arasında 76 dakikalık yerel saat farkı bulunmasının sonuçları nelerdir?",
       "cozum": "Güneş doğuda daha erken doğar ve batar; resmî işler ortak saatle yürütüldüğü için doğu illerinde iş günü Güneş'e göre **daha geç**, batı illerinde **daha erken** başlar. Namaz vakitleri ve gün ışığı süreleri iller arasında farklılaşır."
      },
      {
       "soru": "Türkiye'nin göreceli konumunun ekonomik önemine iki örnek veriniz.",
       "cozum": "1) Boğazlar Karadeniz ülkelerinin dünya denizlerine açılan **tek deniz yolu** üzerindedir. 2) Hazar ve Orta Doğu enerji kaynaklarını Avrupa'ya taşıyan **boru hatlarının** geçiş güzergâhındadır (enerji koridoru)."
      }
     ],
     "ozet": [
      "Türkiye: **36°–42° K enlemleri**, **26°–45° D boylamları**.",
      "Asya-Avrupa kesişimi; üç tarafı deniz; boğazlar stratejik.",
      "Mutlak konum: koordinatlar (değişmez); göreceli konum: çevreye göre konum (önemi değişebilir).",
      "Doğu–batı arası 19 boylam → 76 dakika yerel saat farkı."
     ]
    }
   },
   {
    "id": "k5",
    "code": "COĞ.9.2.3",
    "title": {
     "tr": "Mekânsal bilgi teknolojilerinin bileşenleri",
     "en": "Components of spatial information technologies"
    },
    "content": {
     "anlatim": "# Mekânsal Bilgi Teknolojileri\n\nCoğrafi verilerin **toplanması, depolanması, analiz edilmesi ve görselleştirilmesi** için kullanılan teknolojilerdir.\n\n### Temel Bileşenler\n\n- **Coğrafi Bilgi Sistemleri (CBS)**\n- **Uzaktan algılama** (uydu ve hava fotoğrafları)\n- **GPS**\n- **Mekânsal veri tabanları**\n- **Dijital haritalama** sistemleri\n\n# Bileşenler Nasıl Birlikte Çalışır?\n\n| Bileşen | Görevi | Örnek |\n|---|---|---|\n| **Donanım** | Bilgisayar, sunucu, GPS alıcısı, uydu | Akıllı telefon, drone |\n| **Yazılım** | Verileri işleyen ve haritalayan programlar | CBS programları |\n| **Veri** | Konumlu bilgi: **vektör** (nokta, çizgi, alan) ve **raster** (piksel, uydu görüntüsü) | Yol ağı, nüfus, uydu fotoğrafı |\n| **İnsan** | Verileri toplayan, analiz eden ve karar veren uzman | Şehir plancısı, coğrafyacı |\n| **Yöntem** | Verinin nasıl toplanıp analiz edileceğine dair kurallar | Katman çakıştırma, tampon analizi |\n\n- **Katman (çakıştırma) analizi:** Farklı veri katmanları (fay hattı + nüfus + okul yerleri) üst üste konarak yeni bilgi elde edilir — örneğin depremde risk altındaki okullar.\n- **Kullanım alanları:** navigasyon, afet yönetimi, tarım (uydu ile ürün takibi), orman yangını izleme, şehir planlama, kayıp aramaları.",
     "ornekler": [
      {
       "soru": "Bir orman yangınının yayılma yönünü tahmin etmek için CBS'de hangi veri katmanları birlikte kullanılabilir?",
       "cozum": "Rüzgâr yönü ve hızı, eğim ve bakı (yükselti verisi), bitki örtüsü türü ve kuruluğu, yerleşme ve yol ağı. Katmanlar çakıştırılarak riskli alanlar ve **tahliye yolları** belirlenir."
      },
      {
       "soru": "Bir uydu görüntüsü ile bir ilçenin yol ağı verisi hangi veri türlerine örnektir?",
       "cozum": "Uydu görüntüsü **raster** veridir (piksellerden oluşur). Yol ağı **vektör** veridir (çizgilerle gösterilir)."
      }
     ],
     "ozet": [
      "Mekânsal bilgi teknolojileri: veri **toplama, depolama, analiz, görselleştirme**.",
      "Bileşenler: **CBS, uzaktan algılama, GPS**, mekânsal veri tabanı, dijital haritalama.",
      "Veri türleri: vektör (nokta, çizgi, alan) ve raster (piksel); katman çakıştırma ile risk analizi yapılır."
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
    "code": "COĞ.9.3.1",
    "title": {
     "tr": "Hava olayları ve hava elemanları",
     "en": "Weather events and weather elements"
    },
    "content": {
     "anlatim": "# Hava Olayları\n\n**Hava olayları:** Belirli bir yer ve zamanda gerçekleşen sıcaklık, rüzgâr, nem, sis, yağış gibi hava koşullarıdır.\n- **Meteoroloji:** Hava olaylarını ve bunları oluşturan süreçleri inceler; **meteorolog** hava tahmini yapar.\n- **Klimatoloji:** Fiziki coğrafyanın alt dalı; iklim sistemini inceler. **Klimatolog** iklim özelliklerini ve dağılışını açıklar.\n- **İklim:** Bir bölgedeki hava olaylarının **uzun süreli ortalamalarının** ve uç değerlerinin genel durumudur.\n\n### Atmosfer\n\nHava olaylarının gerçekleştiği gaz karışımıdır: **azot (%78)**, **oksijen (%21)** ve diğer gazlar. Zararlı ışınları emer, meteorları engeller, aşırı ısınma/soğumayı önler, yaşam için uygun koşullar sağlar.\n\n| Hava elemanı | Tanım | Ölçüm aracı (birim) |\n|---|---|---|\n| **Sıcaklık** | Taneciklerin ortalama kinetik enerjisinin ölçüsü; Güneş'e doğrudan maruz kalmayan, yerden **1,5–2 m** yükseklikte ölçülür | Termometre (°C) |\n| **Basınç** | Atmosfer gazlarının birim yüzeye uyguladığı kuvvet. Standart: 45° enlemi, deniz seviyesi, 15 °C'ta **1013 mb** | Barometre (mb, hPa) |\n| **Rüzgâr** | **Yüksek basınçtan alçak basınca** doğru yatay hava hareketi | Anemometre (m/sn, km/sa) |\n| **Nem** | Atmosferdeki su buharı | Higrometre |\n| **Yağış** | Doyma noktasında yoğuşma → sis, bulut, yağış | Plüviyometre (mm) |",
     "ornekler": [
      {
       "soru": "Bir öğrenci barometrede basıncın birkaç saatte hızla düştüğünü gözlüyor. Bu gözlemden hava durumuyla ilgili nasıl bir tahmin yapılabilir?",
       "cozum": "Basıncın düşmesi **alçak basınç** alanının yaklaştığını gösterir. Alçak basınçta hava yükselir, soğur ve yoğuşur; **bulutlanma, rüzgâr ve yağış** olasılığı artar."
      },
      {
       "soru": "“Bugün İzmir'de hava 30 °C ve güneşli.” ile “İzmir'de yazlar sıcak ve kurak geçer.” ifadelerini hava durumu ve iklim açısından ayırt ediniz.",
       "cozum": "İlk ifade belirli bir gündeki **hava durumudur** (kısa süreli). İkinci ifade uzun yılların ortalamasına dayanan **iklim** özelliğidir."
      }
     ],
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
    "code": "COĞ.9.3.2",
    "title": {
     "tr": "İklim sistemi ve iklimi etkileyen faktörler",
     "en": "The climate system and factors affecting climate"
    },
    "content": {
     "anlatim": "# İklim Sistemi\n\nİklim sistemi; **atmosfer, hidrosfer, litosfer, biyosfer ve kriyosfer** arasındaki karmaşık etkileşimlerden oluşur.\n\n- **Güneş enerjisi** sistemin temel enerji kaynağıdır.\n- **Dünya'nın şekli (geoit), eksen eğikliği, dönme ve dolanma** hareketleri iklim sistemini etkiler.\n- **Yerel iklim özelliklerini belirleyen faktörler:** karasallık-denizellik, okyanus akıntıları, topoğrafik faktörler (yükselti, **bakı**, dağların uzanışı).\n\n# Değişkenlerin İklime Etkisi\n\n| Değişken | Etkisi | Örnek |\n|---|---|---|\n| **Enlem** | Ekvator'dan kutuplara sıcaklık azalır (Güneş ışınlarının geliş açısı küçülür) | Ekvator sıcak, kutuplar soğuk |\n| **Yükselti** | Her 100 m yükselişte sıcaklık yaklaşık **0,5–0,6 °C** düşer | Erzurum, Antalya'dan soğuktur |\n| **Karasallık–denizellik** | Denize uzak yerlerde sıcaklık farkı büyük, yağış azdır | İç Anadolu ile Karadeniz kıyıları |\n| **Bakı** | Kuzey yarım kürede güneye bakan yamaçlar daha çok güneş alır | Yerleşmeler güney yamaçlarda |\n| **Dağların uzanışı** | Kıyıya paralel dağlar nemli havanın içeri girmesini engeller | Karadeniz kıyısı yağışlı, iç kesimler kurak |\n| **Okyanus akıntıları** | Sıcak akıntılar kıyıyı ılıtır, soğuk akıntılar kuraklaştırır | Gulf Stream → Batı Avrupa ılıman |\n| **Bitki örtüsü ve kentleşme** | Orman nem ve serinlik sağlar; beton ısıyı tutar | Kentsel ısı adası |\n\n> İklim sistemi bir bütündür: bir bileşendeki değişim (ör. buzulların erimesi) diğerlerini de etkiler.",
     "ornekler": [
      {
       "soru": "Aynı enlemde bulunan Trabzon ve Erzurum'un iklimleri neden farklıdır?",
       "cozum": "Trabzon **kıyıda ve alçaktır**, denizin ılıtıcı etkisi ve nemli hava nedeniyle kışlar ılık, yağış boldur. Erzurum **iç kesimde ve yüksektir** (~1850 m); yükselti ve karasallık nedeniyle kışlar çok soğuk, yağış azdır. Kıyıya paralel dağlar da nemli havanın içeri girmesini engeller."
      },
      {
       "soru": "Kuzey yarım kürede bir dağın güney ve kuzey yamaçlarında orman üst sınırı ve kar örtüsü nasıl farklılaşır?",
       "cozum": "**Güneye bakan** yamaçlar daha çok güneş alır (bakı etkisi); kar daha erken erir, orman ve tarım üst sınırı **daha yüksektir**. Kuzey yamaçlarda kar daha uzun kalır."
      }
     ],
     "ozet": [
      "İklim sistemi = atmosfer + hidrosfer + litosfer + biyosfer + kriyosfer.",
      "Temel enerji kaynağı: **Güneş**.",
      "Yerel iklim: karasallık-denizellik, okyanus akıntıları, yükselti, bakı, dağların uzanışı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.9.3.3",
    "title": {
     "tr": "İklim türleri",
     "en": "Climate types"
    },
    "content": {
     "anlatim": "# İklim Türleri\n\nİklim türleri **sıcaklık ve yağış** özelliklerine göre sınıflandırılır. Her iklim tipinin kendine özgü sıcaklık, **yağış rejimi**, **bitki örtüsü** ve toprak özellikleri vardır.\n\n**Başlıca iklim tipleri:** Ekvatoral, savan (tropikal), muson, çöl, Akdeniz, okyanus, karasal, step (bozkır), tundra ve kutup iklimleri.\n\n# Başlıca İklim Tipleri ve Özellikleri\n\n| İklim | Sıcaklık | Yağış | Bitki örtüsü | Türkiye'de / dünyada |\n|---|---|---|---|---|\n| **Ekvatoral** | Her ay sıcak (~25–27 °C) | Her mevsim bol (konveksiyonel) | Yağmur ormanları | Amazon, Kongo |\n| **Savan** | Sıcak | Yazın yağışlı, kışın kurak | Uzun boylu otlar (savan) | Orta Afrika |\n| **Muson** | Sıcak | Yazın çok yağışlı (muson rüzgârları) | Muson ormanları | Hindistan, Güneydoğu Asya |\n| **Çöl** | Gece–gündüz farkı çok büyük | Çok az | Kserofit bitkiler, seyrek | Sahra |\n| **Akdeniz** | Yazlar sıcak, kışlar ılık | Kışın yağışlı, yaz kurak | **Maki** | Akdeniz ve Ege kıyıları |\n| **Karadeniz (Okyanusal)** | Yazlar serin, kışlar ılık | Her mevsim yağışlı | Gür ormanlar | Doğu Karadeniz, Batı Avrupa |\n| **Karasal** | Yazlar sıcak, kışlar soğuk | Az; ilkbahar yağışlı | **Bozkır** (step) | İç Anadolu, Doğu Anadolu |\n| **Tundra / Kutup** | Çok soğuk | Az (kar) | Yosun, liken / bitki yok | Kuzey Kanada, Antarktika |\n\n- **Yağış rejimi:** Yağışın aylara dağılışı. Akdeniz ikliminde yaz kuraklığı, Karadeniz ikliminde düzenli yağış görülür.\n- İklim tipini belirlemek için **sıcaklık–yağış grafiği (klimogram)** kullanılır.",
     "ornekler": [
      {
       "soru": "Bir istasyonda yazlar sıcak ve kurak, kışlar ılık ve yağışlı; doğal bitki örtüsü maki. Hangi iklim tipidir? Türkiye'de nerede görülür?",
       "cozum": "**Akdeniz iklimi**. Türkiye'de Akdeniz ve Ege kıyıları ile Marmara'nın güneyinde görülür."
      },
      {
       "soru": "Konya ile Rize'nin yıllık yağış ve sıcaklık özelliklerini karşılaştırarak iklim tiplerini belirleyiniz.",
       "cozum": "**Rize:** her mevsim yağışlı (yıllık 2000 mm'nin üzerinde), yazlar serin → **Karadeniz (okyanusal) iklimi**, gür ormanlar. **Konya:** yıllık yağış ~300 mm, yazlar sıcak, kışlar soğuk → **karasal iklim**, bozkır."
      }
     ],
     "ozet": [
      "İklim tipleri **sıcaklık ve yağışa** göre ayrılır.",
      "Ekvatoral, savan, muson, çöl, Akdeniz, okyanus, karasal, step, tundra, kutup.",
      "Akdeniz: yaz kurak–maki · Karadeniz: her mevsim yağışlı–orman · Karasal: kış soğuk–bozkır."
     ]
    }
   },
   {
    "id": "k4",
    "code": "COĞ.9.3.4",
    "title": {
     "tr": "İklim sisteminde yaşanan değişiklikler",
     "en": "Changes in the climate system"
    },
    "content": {
     "anlatim": "# Küresel İklim Değişikliği\n\nİnsan faaliyetleri (**fosil yakıt** kullanımı, **ormansızlaşma**, sanayi) sonucu **sera gazlarının** artmasıyla atmosferin ısınmasıdır.\n\n### Sonuçları\n\n- Sıcaklık artışı\n- Buzulların erimesi ve **deniz seviyesinin yükselmesi**\n- **Ekstrem hava olaylarının** artması\n- Biyoçeşitlilik kaybı\n- Tarımsal verimde değişiklikler\n\n**Kentsel ısı adası etkisi** de yerel sıcaklık artışına neden olur.\n\n# Kanıtlar ve Öngörüler\n\n- **Kanıtlar:** Sanayi Devrimi'nden bu yana küresel ortalama sıcaklık yaklaşık **1,1–1,2 °C** arttı (IPCC); atmosferdeki CO₂ derişimi 280 ppm'den **420 ppm'in üzerine** çıktı; buzullar ve deniz buzları geriliyor.\n- **Türkiye'ye olası etkileri:** kuraklık ve su kıtlığı, orman yangınlarının artması, sel–taşkın sıklığı, tarımda verim kaybı, kıyılarda deniz seviyesi yükselmesi.\n- **Doğal iklim değişimleri:** Jeolojik geçmişte buzul ve buzul arası dönemler yaşanmıştır (Dünya'nın yörüngesindeki değişimler, volkanik etkinlik). Bugünkü değişimi farklı kılan, **hızının** ve **insan kaynaklı** olmasıdır.\n\n**Azaltma (önleme):** yenilenebilir enerji, enerji verimliliği, toplu taşıma, ağaçlandırma. **Uyum:** damla sulama, kuraklığa dayanıklı tohum, taşkın planlaması.\n- **Paris Anlaşması (2015):** Isınmayı 2 °C'nin, mümkünse **1,5 °C'nin** altında tutma hedefi.",
     "ornekler": [
      {
       "soru": "Kentlerin çevresindeki kırsal alanlardan daha sıcak olmasının nedenleri nelerdir?",
       "cozum": "Beton ve asfalt güneş enerjisini emip depolar; yeşil alan azdır, buharlaşma ile serinleme zayıftır; araç, sanayi ve klimalar ısı yayar; yüksek binalar rüzgârı keser. Bu etkiye **kentsel ısı adası** denir."
      },
      {
       "soru": "Kuraklığın arttığı bir bölgede çiftçilere iklim değişikliğine uyum için hangi öneriler sunulabilir?",
       "cozum": "**Damla ve yağmurlama sulama** ile su tasarrufu, kuraklığa dayanıklı ürün ve tohum çeşitleri, ekim zamanının değiştirilmesi, toprak nemini koruyan yöntemler (malçlama) ve yağmur suyu hasadı."
      }
     ],
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
    "code": "COĞ.9.4.1",
    "title": {
     "tr": "Nüfusun tarihsel değişimi ve geleceği",
     "en": "Historical change and future of population"
    },
    "content": {
     "anlatim": "# Nüfus Dinamikleri\n\n**Nüfus dinamiği:** Nüfus özelliklerinin zaman içindeki değişimi, mekândaki dağılışı ve nüfus hareketleridir. Sağlık, eğitim, ekonomik büyüme, gıda güvenliği, kentleşme ve doğal kaynak yönetimi üzerinde belirleyicidir.\n\n# Nüfusun Tarihsel Değişimi\n\n| Sıçrama | Ne zaman? | Nedeni ve sonuçları |\n|---|---|---|\n| **Birinci** | Yaklaşık 1 milyon yıl önce | **Alet yapımı**; beslenme iyileşti, vahşi hayvanlarla mücadele kolaylaştı. |\n| **İkinci (Neolitik dönem)** | Yaklaşık 10 bin yıl önce | **Tarım ve yerleşik hayat**; gıdaya erişim kolaylaştı, ilk şehirler kuruldu. Nüfus 150–300 milyona ulaştı. |\n| **Üçüncü** | Sanayi Devrimi ve sonrası | Tıp, beslenme ve sağlık koşulları iyileşti; ölüm oranları düştü, ortalama ömür uzadı. 1800'lerde **1 milyar**, 1927'de **2 milyar**; 1950'den sonra hızlı artış. |\n\n**Nüfus projeksiyonu:** Mevcut eğilimlere göre yapılan nüfus tahminleridir. UNFPA'ya göre **2100** yılında dünya nüfusunun **9–13 milyar** arasında olması beklenmektedir.",
     "ornekler": [
      {
       "soru": "Neolitik dönemde nüfusun hızla artmasının nedeni nedir?",
       "cozum": "**Tarım ve hayvanların evcilleştirilmesi** ile besin üretimi düzenli ve fazla hâle geldi; yerleşik hayata geçildi. Daha fazla insan beslenebildiği için nüfus artışı hızlandı."
      },
      {
       "soru": "Sanayi Devrimi'nden sonra dünya nüfusunun hızla artması hangi etkenlerle açıklanır?",
       "cozum": "Tıptaki gelişmeler (aşılar, antibiyotikler), temiz su ve kanalizasyon, beslenme ve tarımda verim artışı **ölüm oranlarını düşürdü**, ortalama ömür uzadı. Doğum oranları bir süre yüksek kalınca nüfus hızla arttı."
      }
     ],
     "ozet": [
      "1. sıçrama **alet yapımı**, 2. sıçrama **tarım** (Neolitik), 3. sıçrama **Sanayi Devrimi**.",
      "1800'ler 1 milyar, 1927 2 milyar.",
      "2100 tahmini: **9–13 milyar** (UNFPA)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.9.4.2",
    "title": {
     "tr": "Nüfusun dağılışı ve hareketleri",
     "en": "Population distribution and movements"
    },
    "content": {
     "anlatim": "# Nüfusun Dağılışı\n\nNüfus yeryüzünde **eşit dağılmamıştır**.\n- **Doğal faktörler:** iklim, yer şekilleri, su kaynakları, toprak verimliliği.\n- **Beşerî faktörler:** sanayi, ulaşım, tarihsel süreçler, ekonomik fırsatlar.\n- **Nüfus yoğunluğu:** Birim alana (km²) düşen kişi sayısı.\n\n# Göç\n\nİnsanların **sürekli veya geçici** olarak yer değiştirmesidir.\n- **İtici faktörler:** savaş, işsizlik, afet.\n- **Çekici faktörler:** iş imkânı, eğitim, güvenlik.\n\n# Dünya ve Türkiye'de Nüfusun Dağılışı\n\n- **Yoğun alanlar:** Doğu ve Güney Asya (Çin, Hindistan), Batı Avrupa, ABD'nin doğusu → ılıman iklim, verimli ovalar, sanayi.\n- **Seyrek alanlar:** Çöller (Sahra), kutuplar, ekvatoral ormanlar (Amazon), yüksek dağlar → olumsuz doğal koşullar.\n- **Türkiye'de:** Marmara (sanayi, ticaret, ulaşım), Ege ve Akdeniz kıyıları, Karadeniz kıyıları yoğun; Doğu Anadolu'nun yüksek kesimleri, Tuz Gölü çevresi, Toroslar'ın yüksek kesimleri seyrek nüfusludur.\n\n## Göç Türleri\n\n| Ölçüt | Türler |\n|---|---|\n| Sınırlar | **İç göç** (ülke içi) · **dış göç** (ülkeler arası) |\n| İstek | **Gönüllü** (iş, eğitim) · **zorunlu** (savaş, afet, mübadele) |\n| Süre | **Sürekli** · **geçici** (mevsimlik tarım işçileri) |\n\n- **Beyin göçü:** Nitelikli iş gücünün gelişmiş ülkelere göç etmesi.\n- Türkiye'de 1950'lerden sonra kırdan kente göç hızlanmış, kentleşme oranı arttı.",
     "ornekler": [
      {
       "soru": "Yüzölçümü 800 km², nüfusu 40.000 olan bir ilçenin nüfus yoğunluğu nedir?",
       "cozum": "Nüfus yoğunluğu = nüfus ÷ alan = 40.000 ÷ 800 = **50 kişi/km²**."
      },
      {
       "soru": "Kırsal alandan büyük kentlere göçün kentlerde yol açtığı sorunlara üç örnek veriniz.",
       "cozum": "Plansız yapılaşma ve **gecekondulaşma**, altyapı (su, ulaşım, okul) yetersizliği, işsizlik ve trafik–hava kirliliği."
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
    "code": "COĞ.9.4.3",
    "title": {
     "tr": "Demografik dönüşüm süreci ve nüfus piramitleri",
     "en": "The demographic transition and population pyramids"
    },
    "content": {
     "anlatim": "# Demografik Dönüşüm\n\nYüksek doğum ve ölüm oranlarından **düşük doğum ve ölüm oranlarına** geçiş sürecidir.\n\n1. Yüksek doğum – yüksek ölüm\n2. Yüksek doğum – düşük ölüm → **hızlı nüfus artışı**\n3. Düşük doğum – düşük ölüm → **yavaş artış / durağanlık**\n\n# Nüfus Piramidi\n\nNüfusun **yaş ve cinsiyet** yapısını gösteren grafiktir.\n- **Geniş tabanlı** piramit → **genç ve hızlı artan** nüfus.\n- **Dar tabanlı, üst kısmı geniş** piramit → **yaşlı** nüfus.\n\n**Önemli göstergeler:** bağımlı nüfus (**0–14 ve 65+ yaş**), ortanca yaş, genç ve yaşlı nüfus oranları.\n\n# Piramit Okuma Rehberi\n\n| Piramit tipi | Görünüm | Ne anlatır? | Örnek ülke tipi |\n|---|---|---|---|\n| **Genişleyen (üçgen)** | Taban geniş, tepe sivri | Doğum ve ölüm yüksek, genç nüfus fazla, ortalama ömür kısa | Az gelişmiş ülkeler (Nijer) |\n| **Durağan (çan)** | Taban ve orta benzer | Doğum ve ölüm düşük, artış yavaş | Gelişmekte olan ülkeler |\n| **Daralan (ters üçgene yakın)** | Taban dar, orta ve üst geniş | Doğum çok düşük, yaşlı oranı yüksek, nüfus azalabilir | Japonya, Almanya, İtalya |\n\n- **Türkiye'nin piramidi** genişleyenden durağana geçmektedir: taban daralıyor, ortanca yaş yükseliyor (ortanca yaş 34'ü aştı).\n- **Bağımlılık oranı** = $\\dfrac{(0\\text{–}14) + (65+)}{(15\\text{–}64)} \\cdot 100$ → çalışan nüfusun bakmakla yükümlü olduğu nüfus.",
     "ornekler": [
      {
       "soru": "Bir ülkenin piramidinde 0–14 yaş grubu çok geniş, 65+ grubu çok dardır. Bu ülkenin nüfus özellikleri ve öncelikli ihtiyaçları nelerdir?",
       "cozum": "Doğum oranı yüksek, ortalama ömür kısa, **genç ve hızlı artan** nüfus. Öncelikli ihtiyaçlar: okul, öğretmen, çocuk sağlığı hizmetleri ve gelecekte gençler için **iş imkânı**."
      },
      {
       "soru": "Bir ülkede 0–14 yaş nüfus 10 milyon, 15–64 yaş 50 milyon, 65+ yaş 15 milyondur. Bağımlılık oranını hesaplayınız.",
       "cozum": "Bağımlılık oranı $= \\dfrac{10 + 15}{50} \\cdot 100 = \\%50$. Her 100 çalışma çağındaki kişiye 50 bağımlı kişi düşer."
      }
     ],
     "ozet": [
      "Demografik dönüşüm: yüksek doğum-ölüm → **düşük doğum-ölüm**.",
      "Geniş taban = **genç** nüfus; dar taban = **yaşlı** nüfus.",
      "Bağımlı nüfus: **0–14** ve **65+** yaş."
     ]
    }
   },
   {
    "id": "k4",
    "code": "COĞ.9.4.4",
    "title": {
     "tr": "Nüfus politikaları",
     "en": "Population policies"
    },
    "content": {
     "anlatim": "# Nüfus Politikaları\n\nDevletlerin nüfusun **miktarı, yapısı ve dağılışı** üzerinde etki yaratmak amacıyla uyguladığı politikalardır.\n\n- Nüfus artışını **teşvik eden (pronatalist)** veya **sınırlayan (antinatalist)** politikalar uygulanabilir.\n- Eğitim, sağlık, aile planlaması, göç yönetimi ve yaşlılık politikaları bu kapsamdadır.\n- **Türkiye'de** nüfus artış hızının yavaşlaması ve yaşlı nüfus oranının artması nedeniyle **aktif yaşlanma** ve **nitelikli nüfus** politikaları önem kazanmıştır.\n\n# Ülke Örnekleri\n\n| Ülke | Sorun | Politika |\n|---|---|---|\n| **Çin** | Hızlı nüfus artışı (1980'ler) | Tek çocuk politikası (antinatalist); sonra yaşlanma nedeniyle **2016'da iki, 2021'de üç çocuğa** izin |\n| **Fransa, İsveç** | Düşük doğurganlık | Aile yardımları, ücretli doğum izni, kreş desteği (pronatalist) |\n| **Japonya** | Hızla yaşlanan nüfus | Yaşlı bakım hizmetleri, emeklilik yaşının yükseltilmesi, robot teknolojisi |\n| **Kanada, Avustralya** | Nitelikli iş gücü ihtiyacı | Puan sistemine dayalı seçici göç politikası |\n\n## Türkiye'de Nüfus Politikalarının Seyri\n\n- **1923–1965:** Nüfus artışı teşvik edildi (savaşlarda kaybedilen nüfus, az nüfuslu ülke).\n- **1965–2000'ler:** Hızlı artış nedeniyle aile planlaması ile artış sınırlandırıldı.\n- **Günümüz:** Doğurganlık hızının **yenilenme düzeyinin (2,1) altına** inmesiyle aileyi ve doğumu destekleyen, nitelikli nüfusu ve aktif yaşlanmayı önemseyen politikalar.",
     "ornekler": [
      {
       "soru": "Doğurganlık hızı 1,3'e düşen bir Avrupa ülkesi hangi nüfus politikalarını uygulayabilir?",
       "cozum": "Yenilenme düzeyi (2,1) altında olduğu için **pronatalist** politikalar: çocuk yardımları, uzun ücretli doğum izni, ücretsiz kreş, vergi indirimi, esnek çalışma. Ayrıca iş gücü açığı için **seçici göç** politikaları."
      },
      {
       "soru": "Çin'in tek çocuk politikasını gevşetmesinin nedeni nedir?",
       "cozum": "Uzun süre düşük doğum oranı nedeniyle nüfus **hızla yaşlandı**, çalışma çağındaki nüfus azalmaya başladı ve cinsiyet dengesi bozuldu. Bu yüzden önce iki, sonra üç çocuğa izin verildi."
      }
     ],
     "ozet": [
      "Pronatalist = **artışı teşvik**; antinatalist = **artışı sınırlama**.",
      "Türkiye: artış hızı yavaşlıyor, yaşlı oranı artıyor → aktif yaşlanma, nitelikli nüfus.",
      "Türkiye: 1923–1965 artış teşviki, 1965 sonrası sınırlama, günümüzde doğurganlık 2,1'in altında → destekleyici politikalar."
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
    "code": "COĞ.9.5.1",
    "title": {
     "tr": "Ekonomik faaliyetleri etkileyen doğal faktörler",
     "en": "Natural factors affecting economic activities"
    },
    "content": {
     "anlatim": "# Ekonomik Faaliyetler\n\n**Ekonomik faaliyet:** İnsanların hayatlarını sürdürmek, gelir elde etmek ve refah seviyelerini yükseltmek için yaptıkları çalışmalardır; **üretim, dağıtım ve tüketim** süreçlerini kapsar.\n\n# Doğal Faktörler\n\n| Faktör | Etkisi |\n|---|---|\n| **Coğrafi konum** | Ticaret yollarına, doğal kaynaklara ve pazarlara yakınlık avantaj sağlar. Türkiye'nin boğazlara ve kıtalar arası konumu **enerji taşımacılığında** stratejik önemdedir. |\n| **İklim** | Tarım ürünlerinin türü ve verimi, turizm, enerji üretimi (güneş, rüzgâr, hidroelektrik) |\n| **Topoğrafya** | Tarım arazilerinin dağılışı, ulaşım güzergâhları, liman ve havalimanı yer seçimi, turizm potansiyeli |\n| **Su kaynakları** | Balıkçılık, hidroelektrik, sulama, deniz ulaşımı, bazı sanayi tesisleri |\n| **Toprak** | Tarımın temeli; seramik, kiremit, tuğla için ham madde |\n| **Bitki örtüsü** | Hayvancılık; kereste, kâğıt, mobilya ham maddesi; turizm ve rekreasyon |\n| **Madenler ve enerji kaynakları** | Sanayi tesislerinin kuruluş yeri (ör. demir-çelik tesislerinin **kömür yataklarına yakın** kurulması) |",
     "ornekler": [
      {
       "soru": "Rize'de çay, Şanlıurfa'da pamuk yetiştirilmesini doğal faktörlerle açıklayınız.",
       "cozum": "**Çay:** her mevsim yağışlı, nemli ve ılıman iklim ile asitli topraklar ister → Rize. **Pamuk:** sıcak ve uzun yaz, bol güneş ve **sulama** ister → Harran Ovası (GAP ile sulama)."
      },
      {
       "soru": "Antalya'da turizmin gelişmesinde hangi doğal faktörler etkilidir?",
       "cozum": "**Akdeniz iklimi** (uzun, güneşli ve sıcak yaz), deniz ve kumsallar, Toroslar'ın doğal güzellikleri ve kıyıya yakın tarihî alanlar."
      }
     ],
     "ozet": [
      "Ekonomik faaliyet: **üretim, dağıtım, tüketim**.",
      "Doğal faktörler: konum, iklim, topoğrafya, su, toprak, bitki örtüsü, madenler.",
      "Demir-çelik tesisleri **kömür yataklarına** yakın kurulur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.9.5.1",
    "title": {
     "tr": "Ekonomik faaliyetleri etkileyen beşerî faktörler",
     "en": "Human factors affecting economic activities"
    },
    "content": {
     "anlatim": "# Beşerî Faktörler\n\n- **Nüfus:** Miktar, artış hızı, yaş yapısı ve eğitim düzeyi. Ekonomik büyüme ile nüfus artışı **dengeli** olmalıdır.\n- **İş gücü:** Varlığı ve maliyeti önemlidir. Gelişmiş ülkeler üretimin bir kısmını **iş gücü maliyetinin düşük** olduğu ülkelere kaydırır.\n- **Sermaye:** Tesislerin kuruluşu, devamlılığı ve gelişmesi için gereklidir. **Çok uluslu şirketler** sermaye hareketliliğini artırır.\n- **Teknoloji:** Üretim, dağıtım ve tüketimi hızlandırır. **Dört sanayi devrimi** (buhar, elektrik, elektronik, dijital) maliyetleri düşürmüş, hız ve kaliteyi artırmıştır.\n- **Ulaşım:** Ham maddenin fabrikaya, ürünün pazara ulaşmasında kritik rol oynar. Gelişmiş limanlar sanayi ve ticaret merkezleriyle örtüşür.\n- **Devlet politikaları:** Ekonomiye müdahale düzeyi, teşvikler, hukuki ve siyasi istikrar **yabancı sermaye** girişini etkiler.",
     "ornekler": [
      {
       "soru": "Bir otomobil fabrikasının yer seçiminde etkili olan beşerî faktörler nelerdir?",
       "cozum": "Nitelikli ve uygun maliyetli **iş gücü**, yan sanayiye yakınlık, gelişmiş **ulaşım** (liman, otoyol, demir yolu), **pazara** yakınlık, sermaye ve devlet **teşvikleri**. Bu nedenle Türkiye'de otomotiv sanayisi Marmara'da (Bursa, Kocaeli) yoğunlaşmıştır."
      },
      {
       "soru": "Dijital teknolojilerin (4. sanayi devrimi) ekonomik faaliyetlere iki etkisini yazınız.",
       "cozum": "1) Üretimde **otomasyon ve robotlar** verimi artırır, maliyeti düşürür. 2) **E-ticaret** ile ürünler dünyanın her yerine ulaşır; fiziksel mağaza ve aracı ihtiyacı azalır."
      }
     ],
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
    "code": "COĞ.9.6.1",
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
      },
      {
       "soru": "Dere yatağına yapılmış bir mahallede şiddetli yağış sonrası sel meydana geliyor ve evler zarar görüyor. Tehlike, maruziyet ve güvenlik açığını belirleyiniz.",
       "cozum": "**Tehlike:** şiddetli yağış ve sel. **Maruziyet:** evlerin dere yatağında olması. **Güvenlik açığı:** taşkın önleme yapısı, erken uyarı ve tahliye planının olmaması. Üçü bir araya gelince olay **afete** dönüşmüştür."
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
    "code": "COĞ.9.6.2",
    "title": {
     "tr": "Afet türleri",
     "en": "Types of disasters"
    },
    "content": {
     "anlatim": "# Afet Türleri\n\nAfetler oluşum nedenine, hızına ve etki alanına göre sınıflandırılır:\n\n| Tür | Örnekler |\n|---|---|\n| **Doğa kaynaklı** | Deprem, sel, taşkın, heyelan, çığ, volkanik patlama, tsunami, fırtına, tayfun, orman yangını, kuraklık |\n| **İnsan kaynaklı (teknoloji kökenli)** | Maden kazaları, ulaşım kazaları, endüstriyel kazalar, nükleer kazalar |\n| **Karma / sosyal** | Savaş, salgın hastalık, kitlesel göç |\n\nSon yıllarda **küresel iklim değişikliği**, doğal kaynakların aşırı kullanımı ve nüfus hareketleri nedeniyle afetlerin **sıklığı ve şiddeti artmaktadır**.\n\n# Kökenine Göre Doğal Afetler\n\n| Köken | Afetler |\n|---|---|\n| **Jeolojik (yer içi kaynaklı)** | Deprem, volkanizma, tsunami |\n| **Meteorolojik / klimatolojik** | Kuraklık, fırtına, hortum, dolu, aşırı sıcak ve soğuk, orman yangını |\n| **Hidrolojik** | Sel, taşkın, çığ |\n| **Jeomorfolojik (kütle hareketi)** | Heyelan, kaya düşmesi, toprak kayması |\n| **Biyolojik** | Salgın hastalık, böcek istilası |\n\n- **Ani gelişen** (deprem, sel) ve **yavaş gelişen** (kuraklık, çölleşme) afetler ayrılır.\n- **Türkiye'de** can kaybı ve hasar bakımından en etkili afet **depremdir** (ülkenin büyük bölümü deprem bölgesi); onu sel, heyelan ve çığ izler. Karadeniz'de heyelan ve sel, Doğu Anadolu'da çığ riski yüksektir.",
     "ornekler": [
      {
       "soru": "Deprem, kuraklık, heyelan ve çığ afetlerini kökenlerine göre sınıflandırınız.",
       "cozum": "Deprem → **jeolojik**; kuraklık → **meteorolojik/klimatolojik**; heyelan → **jeomorfolojik (kütle hareketi)**; çığ → **hidrolojik** (kar örtüsünün hareketi)."
      },
      {
       "soru": "Kuraklık neden “yavaş gelişen” afet olarak adlandırılır? Etkileri nelerdir?",
       "cozum": "Yağış eksikliği aylar, hatta yıllar içinde birikerek etkisini gösterir; başlangıcı ve bitişi belirgin değildir. Tarımsal üretim düşer, su kaynakları azalır, göç ve orman yangını riski artar."
      }
     ],
     "ozet": [
      "Doğa kaynaklı (deprem, sel, heyelan…), insan kaynaklı (endüstriyel, nükleer kaza…), karma (savaş, salgın, göç).",
      "İklim değişikliği afetlerin sıklığını ve şiddetini artırıyor.",
      "Kökenine göre: jeolojik, meteorolojik, hidrolojik, jeomorfolojik, biyolojik; Türkiye'de en etkili afet deprem."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.9.6.3",
    "title": {
     "tr": "Bütüncül afet yönetimi",
     "en": "Integrated disaster management"
    },
    "content": {
     "anlatim": "# Bütüncül Afet Yönetimi\n\nAfet **öncesi, sırası ve sonrasını** kapsayan planlı ve koordineli süreçtir.\n\n### Bileşenleri\n\n- Risk analizi\n- **Erken uyarı** sistemleri\n- Hazırlık ve müdahale yetenekleri\n- **Zarar azaltma**\n- İyileştirme ve yeniden yapılandırma\n\n**Çoklu tehlike erken uyarı sistemleri**, afet eğitimleri, **acil durum çantası** hazırlığı ve **mekânsal planlama** riski azaltmada kritik öneme sahiptir.\n\n**\"Yeşil Vatan\"** yaklaşımı, orman yangınları gibi afetlere karşı bütüncül koruma anlayışını ifade eder.\n\n# Afet Yönetim Döngüsü\n\n| Evre | Zaman | Örnek çalışmalar |\n|---|---|---|\n| **Zarar azaltma** | Afetten önce | Depreme dayanıklı yapı, fay hattı ve dere yataklarına yapılaşma yasağı, ağaçlandırma |\n| **Hazırlık** | Afetten önce | Tatbikat, acil durum çantası, toplanma alanları, erken uyarı |\n| **Müdahale** | Afet sırasında / hemen sonra | Arama-kurtarma, ilk yardım, barınma, beslenme |\n| **İyileştirme** | Afetten sonra | Yeniden yapılanma, psikolojik destek, ekonomik toparlanma |\n\n- **Risk yönetimi** (zarar azaltma + hazırlık) afetten önce, **kriz yönetimi** (müdahale) afet sırasında yapılır. Bütüncül yaklaşımda ağırlık **afet öncesine** verilir.\n- **Türkiye'de** afet yönetiminden sorumlu kurum **AFAD**'dır (2009). Gönüllüler (AKUT gibi) ve yerel yönetimler de sürece katılır.\n- **Bireysel hazırlık:** “Çök–kapan–tutun”, acil durum çantası (su, yiyecek, düdük, el feneri, ilaç, belgeler), aile afet planı.",
     "ornekler": [
      {
       "soru": "Bir okulda yapılan deprem tatbikatı ve okul binasının güçlendirilmesi afet yönetiminin hangi evrelerine örnektir?",
       "cozum": "Tatbikat → **hazırlık**; binanın güçlendirilmesi → **zarar azaltma**. İkisi de afet öncesi yapılan **risk yönetimi** çalışmalarıdır."
      },
      {
       "soru": "Bir aile afet planında hangi bilgiler yer almalıdır?",
       "cozum": "Toplanma alanı ve buluşma noktası, şehir dışındaki irtibat kişisi, acil telefon numaraları (112), acil durum çantasının yeri, evde gaz–elektrik–su vanalarının kapatılması, ev içindeki güvenli noktalar ve ihtiyaç sahibi aile bireyleri için özel önlemler."
      }
     ],
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
    "code": "COĞ.9.7.1",
    "title": {
     "tr": "Bölge belirleme kriterleri ve bölge türleri",
     "en": "Criteria for defining regions and types of regions"
    },
    "content": {
     "anlatim": "# Bölge\n\n**Bölge:** Yeryüzünün doğal ve beşerî unsurlar bakımından **kendi içinde benzerlik gösteren** parçalarıdır. Bölge belirleme kriterleri **fiziki** (yer şekilleri, iklim, bitki örtüsü vb.) veya **beşerî** (nüfus, yerleşme, sanayi, tarım, turizm vb.) olabilir.\n\n### Şekilsel Bölge\n\nDoğal veya beşerî özellikleriyle diğer alanlardan ayrılan bölgelerdir. **Belirli bir merkezi yoktur**; bölgedeki her yer aynı özelliğe sahiptir.\n- **Doğal şekilsel bölge:** yer şekilleri, iklim, su, toprak, bitki ve afet bölgeleri (Akdeniz iklim bölgesi, Orta Toroslar dağlık bölgesi).\n- **Beşerî şekilsel bölge:** ham madde, üretim, sanayi, nüfus, yerleşme, kültür bölgeleri (Türkiye'nin pamuk üretim bölgeleri, Türk kültür bölgesi).\n\n### İşlevsel (Fonksiyonel) Bölge\n\nBir **çekirdek (merkez)** ve onu çevreleyen alandan oluşur; ekonomik ve kültürel yönden etkileşim gösterir. Etkileşim yoğunluğu **merkezden uzaklaştıkça azalır**.\n- Örnekler: **metropoliten alanlar**, liman hinterlandları (**Rotterdam Limanı**), gazete tiraj alanları.",
     "ornekler": [
      {
       "soru": "Ankara'nın çevresindeki ilçelerden günlük olarak işe ve okula gidip gelinen alan hangi bölge türüne örnektir? Neden?",
       "cozum": "**İşlevsel bölge.** Ankara bir **merkezdir**; çevredeki ilçelerle iş, eğitim ve ticaret bağı vardır. Etkileşim merkeze yakın ilçelerde güçlü, uzaklaştıkça zayıftır."
      },
      {
       "soru": "Karstik şekillerin yaygın olduğu Toroslar ile çay tarımı yapılan Doğu Karadeniz kıyıları hangi tür bölgelerdir?",
       "cozum": "İkisi de **şekilsel bölgedir** (belirli bir merkezi yoktur). Toroslar karstik yer şekilleri bakımından **doğal**, çay bölgesi tarım ürünü bakımından **beşerî** şekilsel bölgedir."
      }
     ],
     "ozet": [
      "Şekilsel bölge: **merkezi yok**, her yer aynı özellikte.",
      "İşlevsel bölge: **merkez + çevre**; etkileşim merkezden uzaklaştıkça azalır.",
      "Örnek: Akdeniz iklim bölgesi (doğal şekilsel), Rotterdam hinterlandı (işlevsel)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.9.7.1",
    "title": {
     "tr": "Kriterlere göre bölge sınırları",
     "en": "Region boundaries according to criteria"
    },
    "content": {
     "anlatim": "# Kriterlere Göre Bölge Sınırları\n\n- Bölge sınırı **kullanılan kritere** göre belirlenir; kriterin özelliği bölgenin dağılış alanını ve sınır **netliğini** etkiler.\n- **Net sınırlar:** siyasi sınırlar, büyükşehir belediye sınırları.\n- **Geçişli, belirsiz sınırlar:** iklim bölgeleri, bitki örtüsü geçişleri.\n- Doğal kriterlere göre oluşturulan bölgelerde genellikle **geçiş alanları** bulunur; beşerî kriterlere göre oluşturulan bazı bölgelerde sınırlar daha nettir.\n\n# Sınırı Belirlemede Ölçütün Rolü\n\nAynı alan farklı ölçütlerle farklı bölgelere ayrılabilir:\n| Ölçüt | Sonuç |\n|---|---|\n| İklim | Akdeniz iklim bölgesi kıyıdan iç kesime doğru **geçişli** sınırla sona erer |\n| Siyasi sınır | Türkiye–Yunanistan sınırı **net** bir çizgidir |\n| Tarım ürünü | Fındık bölgesi ürünün yetiştiği alanla sınırlanır; ekim alanı değiştikçe sınır da değişir |\n| İdari birim | İl sınırları kesin ve resmîdir |\n\n- **Türkiye'nin coğrafi bölgeleri** 1941'deki **I. Coğrafya Kongresi**'nde iklim, bitki örtüsü, yer şekilleri, tarım ve yerleşme gibi ölçütlerin birlikte değerlendirilmesiyle **7 bölge** olarak belirlenmiştir. Bu sınırlar il sınırlarını kesebilir.",
     "ornekler": [
      {
       "soru": "Akdeniz iklim bölgesinin sınırı ile Türkiye'nin siyasi sınırını netlik açısından karşılaştırınız.",
       "cozum": "Siyasi sınır antlaşmalarla belirlenmiş **net bir çizgidir**. Akdeniz iklim bölgesi ise kıyıdan iç kesime doğru sıcaklık ve yağış değiştikçe karasal iklime **geçiş alanıyla** sona erer; kesin bir çizgi yoktur."
      },
      {
       "soru": "Türkiye'nin coğrafi bölgeleri neden il sınırlarıyla tam olarak örtüşmez?",
       "cozum": "Coğrafi bölgeler iklim, yer şekilleri, bitki örtüsü ve ekonomik faaliyetler gibi **doğal ve beşerî ölçütlere** göre belirlenmiştir. İl sınırları ise **idari** amaçlıdır. Bu yüzden bir ilin toprakları iki farklı bölgede kalabilir (ör. Bolu, Sivas)."
      }
     ],
     "ozet": [
      "Siyasi ve idari sınırlar **net**; iklim ve bitki örtüsü sınırları **geçişli**.",
      "Doğal kriterli bölgelerde **geçiş alanları** bulunur.",
      "Türkiye'nin 7 coğrafi bölgesi 1941 I. Coğrafya Kongresi'nde birden çok ölçütle belirlendi."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.9.7.1",
    "title": {
     "tr": "Bölge sınırlarında değişim",
     "en": "Changes in regional boundaries"
    },
    "content": {
     "anlatim": "# Bölge Sınırlarında Değişim\n\nBölge sınırları **sabit değildir**. Şu faktörler sınırları değiştirebilir:\n- İklim değişikliği\n- Teknolojik gelişmeler\n- Ekonomik dönüşümler\n- Siyasi kararlar\n- Göç ve kentleşme\n\n**Örnekler:** sanayi bölgelerinin kayması, tarım alanlarının daralması, yeni turizm bölgelerinin ortaya çıkması, siyasi sınır değişiklikleri.\n\nBu nedenle bölgeler **dinamik** yapılardır ve zaman içinde yeniden tanımlanabilir.\n\n# Değişimi Gösteren Örnekler\n\n- **İklim değişikliği:** Bazı ürünlerin ekim alanı kuzeye ve yükseğe kayıyor (tropikal meyveler Türkiye'nin güney kıyılarında yetiştirilmeye başlandı).\n- **Teknoloji:** Seracılık, kışın bile sebze üretilebilen alanları genişletti (Antalya seraları).\n- **Ekonomik dönüşüm:** Eski sanayi bölgeleri (ABD'de “Pas Kuşağı”) gerileyip yeni teknoloji bölgeleri (Silikon Vadisi) yükseldi.\n- **Siyasi kararlar:** 1991'de Sovyetler Birliği'nin dağılması siyasi sınırları değiştirdi.\n- **Kentleşme:** İstanbul'un metropoliten alanı genişledikçe işlevsel bölgesi Kocaeli ve Tekirdağ'a uzandı.",
     "ornekler": [
      {
       "soru": "Antalya'da seracılığın yaygınlaşması tarım bölgelerinin sınırlarını nasıl değiştirmiştir?",
       "cozum": "Seracılık **teknolojisi** sayesinde kışın da sebze yetiştirilebilir hâle geldi; erken sebze üretim bölgesi genişledi ve yeni üretim alanları oluştu. Teknoloji bir **beşerî bölgenin sınırını** değiştirmiştir."
      },
      {
       "soru": "Büyük bir havalimanının bir kentin çevresine yapılması o kentin işlevsel bölgesini nasıl etkiler?",
       "cozum": "Havalimanı çevresinde lojistik, otel ve iş merkezleri gelişir; ulaşım ağı genişler. Kentle **etkileşimli alan büyür**, işlevsel bölgenin sınırları dışa doğru genişler."
      }
     ],
     "ozet": [
      "Bölge sınırları **dinamiktir**, zamanla değişir.",
      "Etkenler: iklim değişikliği, teknoloji, ekonomi, siyasi kararlar, göç ve kentleşme.",
      "Örnekler: seracılık (teknoloji), metropol genişlemesi (kentleşme), SSCB'nin dağılması (siyasi)."
     ]
    }
   }
  ]
 },
 {
  "id": "u8",
  "name": {
   "tr": "8. Ünite (Ek): Dünya'nın Şekli, Hareketleri ve Coğrafi Konum",
   "en": "Unit 8 (Extra): Earth's Shape, Motions and Location"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "COĞ.9.E1",
    "title": {
     "tr": "Dünya'nın şekli ve hareketleri; mevsimlerin oluşumu",
     "en": "Earth's shape and motions; why we have seasons"
    },
    "content": {
     "anlatim": "# Dünya'nın Şekli: Geoit\n\nDünya tam bir küre değildir; kutuplardan hafifçe basık, Ekvator'dan şişkindir. Bu kendine özgü şekle **geoit** denir.\n**Kanıtları:** Ay tutulmasında Dünya'nın gölgesinin hep yuvarlak olması, ufuktan yaklaşan geminin önce direğinin görünmesi, uzaydan çekilen fotoğraflar, aynı anda farklı enlemlerde Güneş'in farklı yükseklikte görülmesi.\n\n**Sonuçları:**\n- Güneş ışınlarının geliş açısı Ekvator'dan kutuplara doğru **küçülür** → sıcaklık genel olarak kutuplara doğru azalır.\n- Ekvator çevresi kutuplar çevresinden biraz uzundur; yer çekimi kutuplarda biraz **daha fazladır**.\n- Paralellerin boyu kutuplara doğru kısalır; iki meridyen arası uzaklık kutuplara doğru azalır.\n\n# Günlük Hareket (Kendi Ekseni Çevresinde Dönüş)\n\nDünya **batıdan doğuya** doğru, yaklaşık **24 saatte** bir tur atar.\n- **Gece ile gündüz** birbirini izler.\n- Güneş **doğudan doğar**, batıdan batar; doğudaki yerlerde Güneş daha erken doğar.\n- Her meridyen arasında **4 dakika** zaman farkı oluşur (yerel saat).\n- Çizgisel dönüş hızı Ekvator'da en fazladır, kutuplara doğru azalır; rüzgâr ve akıntılar Kuzey Yarım Küre'de sağa, Güney'de sola sapar (**Coriolis etkisi**).\n\n# Yıllık Hareket (Güneş Çevresinde Dolanma)\n\nDünya, Güneş çevresindeki elips biçimli yörüngesini **365 gün 6 saatte** tamamlar. Eksen, yörünge düzlemine göre **23°27′** eğiktir ve bu eğiklik yıl boyunca **aynı yönü** korur.\n**Sonuçları:** Mevsimler, gece ile gündüz sürelerinin yıl içinde değişmesi, Güneş ışınlarının dik geldiği yerin dönenceler arasında yer değiştirmesi, matematik iklim kuşakları.\n\n| Tarih | Işınların dik geldiği yer | Kuzey Yarım Küre'de |\n|---|---|---|\n| 21 Mart | Ekvator | İlkbahar başlangıcı; gece = gündüz (ekinoks) |\n| 21 Haziran | Yengeç Dönencesi (23°27′ K) | En uzun gündüz; yaz başlangıcı |\n| 23 Eylül | Ekvator | Sonbahar başlangıcı; gece = gündüz |\n| 21 Aralık | Oğlak Dönencesi (23°27′ G) | En kısa gündüz; kış başlangıcı |\n\n> Mevsimlerin nedeni Güneş'e uzaklık değil, **eksen eğikliğidir**. Dünya Güneş'e en yakın konumuna (günberi) Ocak başında gelir; o sırada Kuzey Yarım Küre'de kıştır.",
     "ornekler": [
      {
       "soru": "21 Haziran'da Güneş ışınlarının Yengeç Dönencesi'ne dik geldiği bilinmektedir. Bu tarihte 40° K enleminde öğle vakti Güneş'in ufuk düzlemiyle yaptığı açı kaç derecedir?",
       "cozum": "Geliş açısı $= 90° - (\\text{enlem farkı}) = 90° - (40° - 23°27′) = $ **73°27′** (yaklaşık 73,5°)."
      },
      {
       "soru": "Eksen eğikliği olmasaydı Türkiye'de mevsimler ve gündüz süreleri nasıl olurdu?",
       "cozum": "Işınlar yıl boyu Ekvator'a dik gelirdi; **mevsimler oluşmaz**, gece ile gündüz her yerde yıl boyunca **eşit (12 saat)** olurdu."
      }
     ],
     "ozet": [
      "Dünya'nın şekli geoittir; sıcaklık genel olarak Ekvator'dan kutuplara azalır.",
      "Günlük hareket: batıdan doğuya, 24 saat → gece-gündüz, yerel saat farkları, Coriolis.",
      "Yıllık hareket + eksen eğikliği (23°27′) → mevsimler ve gündüz süresinin değişmesi.",
      "21 Haziran Yengeç, 21 Aralık Oğlak dönencesine; 21 Mart ve 23 Eylül Ekvator'a dik ışın."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.9.E2",
    "title": {
     "tr": "Coğrafi konum: enlem, boylam ve saat hesapları",
     "en": "Geographic location: latitude, longitude and time"
    },
    "content": {
     "anlatim": "# Paraleller ve Enlem\n\n- **Paralel:** Ekvator'a paralel çizilen hayali daireler. Ekvator **0°**, kutuplar **90°**; her yarım kürede 90, toplam **180** paralel vardır.\n- **Enlem:** Bir yerin Ekvator'a olan açısal uzaklığıdır (K ya da G).\n- Enlemin etkileri: güneş ışınlarının geliş açısı, sıcaklık, gece-gündüz süre farkı, iklim kuşakları, bitki örtüsü, kalıcı kar sınırı yüksekliği. Ardışık iki paralel arası yaklaşık **111 km**'dir.\n\n# Meridyenler ve Boylam\n\n- **Meridyen:** Kutuplar arasında uzanan yarım daireler. Başlangıç meridyeni (0°) **Greenwich**'ten geçer; doğuda ve batıda 180'er, toplam **360** meridyen vardır.\n- **Boylam:** Bir yerin başlangıç meridyenine olan açısal uzaklığıdır (D ya da B).\n- İki meridyen arasında **4 dakika** zaman farkı vardır; $360° \\times 4 \\text{ dk} = 24$ saat.\n\n# Yerel Saat Hesabı\n\n1. İki yer **aynı yarım küredeyse** boylamlar **çıkarılır**, farklıysa **toplanır**.\n2. Boylam farkı × 4 dakika = zaman farkı.\n3. **Doğudaki** yerin saati **ileridir**: doğuya gidince ekle, batıya gidince çıkar.\n\n# Ortak (Ulusal) Saat\n\nÜlke içinde karışıklığı önlemek için tek bir meridyenin saati kullanılır. **Türkiye**, yıl boyunca **45° D** meridyeninin yerel saatini (UTC+3) kullanır. Doğu ile batı uçları arasında yaklaşık 19 meridyen, yani **76 dakika** yerel saat farkı vardır.\n\n# Matematik ve Özel Konum\n\n- **Matematik konum:** Enlem ve boylamla belirtilen kesin yer. Türkiye: **36°–42° K** enlemleri, **26°–45° D** boylamları arası.\n- **Özel konum:** Bir yerin yer şekilleri, denizlere ve komşulara göre durumu (ör. Türkiye'nin Asya ile Avrupa arasında köprü olması, üç tarafının denizlerle çevrili olması).",
     "ornekler": [
      {
       "soru": "30° D boylamındaki İstanbul'da yerel saat 12.00 iken 45° D boylamındaki Kars'ta yerel saat kaçtır?",
       "cozum": "Boylam farkı $45 - 30 = 15$; zaman farkı $15 \\times 4 = 60$ dk. Kars doğuda olduğundan saat **13.00**."
      },
      {
       "soru": "Bir yerin enlemi 40° K'dir. Bu yerin Ekvator'a olan kuzey-güney uzaklığı yaklaşık kaç km'dir?",
       "cozum": "$40 \\times 111 \\approx $ **4 440 km**."
      }
     ],
     "ozet": [
      "Enlem Ekvator'a, boylam başlangıç meridyenine olan açısal uzaklıktır.",
      "İki meridyen arası 4 dakika; doğudaki yerin saati ileridir.",
      "Aynı yarım kürede boylamlar çıkarılır, farklı yarım kürede toplanır.",
      "Türkiye ortak saat olarak 45° D (UTC+3) kullanır; 36–42° K, 26–45° D arasındadır."
     ]
    }
   }
  ]
 }
];
