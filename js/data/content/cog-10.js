/* =========================================================
   10. Sınıf Coğrafya — kapsamlı ders notları
   Kaynak: kullanıcının verdiği "10. Sınıf Coğrafya Kapsamlı Konu Anlatım Notları ve Kazanım Analizi" (7 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır (3. ünite alt konulara bölündü). Güncel istihdam oranları yaklaşık verildi; örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/cografya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Coğrafyanın Doğası",
   "en": "Unit 1: The Nature of Geography"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "COĞ.10.1.1",
    "title": {
     "tr": "Coğrafi bakış ve örnek olaylar",
     "en": "The geographical perspective and case studies"
    },
    "content": {
     "anlatim": "# Coğrafi Bakış\n\nOlay ve olguları **mekânsal bağlamda** ele almak; dağılışını, nedenlerini ve sonuçlarını **yerel, bölgesel ve küresel** ölçeklerde değerlendirmek. Coğrafya dünyayı **\"nerede, neden orada, nasıl\"** sorularıyla anlamaya çalışır.\n\n**Temel kavramlar:** konum, zaman, mekân, hareket, bölge, sürdürülebilirlik.\n\n# Örnek: 1854 Londra Kolera Salgını\n\nSoho bölgesindeki vakalar haritaya işlendi; vakaların **bir su pompası** çevresinde toplandığı görüldü. Kuyunun kullanımı durdurulunca salgın yayılmayı kesti → **mekânsal analizin** hayat kurtarıcı gücü.\n\n# Örnek: Marmara Gölü'nün Kuruması (Manisa)\n\nAlüvyal set gölü olan Marmara Gölü, Aşağı Gediz Projesi'nin önemli bir rezervuarıydı.\n- **Nedenler:** besleyen kanalların (Kumçayı, Adala) sularının azalması, **sulama için aşırı su çekimi**, kuraklık, yer altı sularının bilinçsiz kullanımı.\n- **Sonuçlar:** göl 2022'de tamamen kurudu; balıkçılık bitti, biyoçeşitlilik yok oldu, toplumsal gerginlikler yaşandı.\n\n> Ders: doğayı koruma, kaynakların **sürdürülebilir** kullanımı ve **mekân okuryazarlığı**.",
     "ornekler": [
      {
       "soru": "Bir hastalığın yayılışını incelerken coğrafi bakış açısı hangi soruları sorar?",
       "cozum": "Vakalar **nerede** yoğunlaşıyor? **Neden orada** (su kaynağı, nüfus yoğunluğu, iklim)? **Nasıl** yayılıyor (ulaşım, göç)? Bunlar haritalanarak önlem alınır."
      },
      {
       "soru": "Bir şehirde yaz aylarında bazı mahallelerin diğerlerinden 3–4 °C daha sıcak olduğu tespit ediliyor. Coğrafi bakış açısıyla bu durumu hangi sorularla incelersiniz?",
       "cozum": "**Nerede?** Sıcak mahalleler haritada nerede yoğunlaşıyor? **Neden orada?** Bina yoğunluğu, asfalt–beton yüzeyler, yeşil alan azlığı, rüzgâr koridorlarının kapanması (**kentsel ısı adası**). **Nasıl bir etkileşim?** İnsan faaliyetleri doğal ortamı nasıl değiştirmiş? **Ne yapılmalı?** Ağaçlandırma, yeşil çatılar, açık renkli yüzeyler. Coğrafya olayı **mekân, insan–doğa etkileşimi ve çözüm** açısından ele alır."
      }
     ],
     "ozet": [
      "Coğrafya: nerede, neden orada, nasıl.",
      "Londra kolera: haritayla kaynağı bulma.",
      "Marmara Gölü: aşırı su kullanımıyla kuruma."
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
    "code": "COĞ.10.2.1",
    "title": {
     "tr": "CBS ve uzaktan algılamanın uygulama alanları",
     "en": "Applications of GIS and remote sensing"
    },
    "content": {
     "anlatim": "# CBS ve Uzaktan Algılama\n\nMekânsal verilerin **toplanması, depolanması, analizi, sorgulanması ve görüntülenmesini** sağlayan teknolojiler.\n- **Uzaktan algılama:** uydu, uçak, İHA ile yeryüzüne dokunmadan veri toplama.\n- **CBS:** konuma bağlı verileri katmanlar hâlinde birleştirip analiz etme.\n\n| Alan | Kullanım |\n|---|---|\n| **Çevre** | Doğal kaynak yönetimi, ormansızlaşma ve çölleşme takibi, afet riski |\n| **Tarım** | Ekili alan izleme, **rekolte tahmini**, sulama optimizasyonu |\n| **Şehir** | Kentsel büyüme, altyapı, ulaşım, akıllı şehir |\n| **Su** | Su kalitesi, havza haritalama, su arzı planlama |\n| **Afet** | Anlık izleme, zarar tespiti, acil durum koordinasyonu |\n\n### AYDES\n\nAFAD'ın **Afet Yönetim ve Karar Destek Sistemi**: Olay Komuta Sistemi, Mekânsal Bilgi Sistemi ve İyileştirme Sistemi bileşenleriyle afet süreçlerini dijital ortamda yönetir.",
     "ornekler": [
      {
       "soru": "Bir ilde buğday rekoltesini hasattan önce tahmin etmek için hangi teknoloji kullanılır?",
       "cozum": "**Uzaktan algılama** (uydu görüntüleriyle bitki sağlığı ve ekili alan) ve **CBS** analizi."
      },
      {
       "soru": "Bir orman yangınından sonra yanan alanın büyüklüğünü ve yeniden ağaçlandırma ihtiyacını belirlemek için uzaktan algılama ve CBS birlikte nasıl kullanılır?",
       "cozum": "**Uzaktan algılama:** Yangın öncesi ve sonrası uydu görüntüleri karşılaştırılarak yanan alan tespit edilir (bitki örtüsü indeksindeki düşüş). **CBS:** Yanan alan haritası eğim, toprak, yerleşme ve yol katmanlarıyla **çakıştırılır**; erozyon riski yüksek ve öncelikli ağaçlandırma alanları belirlenir."
      }
     ],
     "ozet": [
      "UA: dokunmadan veri toplama; CBS: katmanlı analiz.",
      "Tarım, çevre, şehir, su, afet uygulamaları.",
      "AYDES: AFAD'ın afet karar destek sistemi."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.10.2.2",
    "title": {
     "tr": "Mekânsal verilerin haritalara aktarılması",
     "en": "Transferring spatial data to maps"
    },
    "content": {
     "anlatim": "# Mekânsal ve Mekânsal Olmayan Veri\n\n- **Mekânsal veri:** bir özelliğin **nerede** olduğu (koordinat).\n- **Mekânsal olmayan (öznitelik) veri:** o konuma ait nitel/nicel bilgi (okulun adı, öğrenci sayısı).\n\n# Vektör Semboller\n\n| Sembol | Ne için? | Örnek |\n|---|---|---|\n| **Nokta** | Alanı küçük ya da ölçekte nokta gibi görünen unsurlar | Okul, hastane, çeşme |\n| **Çizgi** | Çizgisel uzanan unsurlar | Yol, akarsu, demir yolu, enerji hattı |\n| **Alan (poligon)** | Sınırı ve alanı olan unsurlar | Göl, orman, il sınırı, tarla |\n\n### Uygulama\n\nYakın çevredeki park, konut, iş yeri ve ulaşım ağları dijital harita araçlarıyla (OGM Materyal CBS Platformu vb.) **katmanlar** hâlinde haritalanır. Toplanma alanı haritaları acil durum planlaması ve rota seçimi sağlar.",
     "ornekler": [
      {
       "soru": "Küçük ölçekli bir Türkiye haritasında Ankara nasıl gösterilir? Büyük ölçekli bir şehir planında?",
       "cozum": "Küçük ölçekte **nokta**, büyük ölçekte şehir sınırları **alan (poligon)** sembolüyle gösterilir; sembol türü ölçeğe göre değişir."
      },
      {
       "soru": "Bir ilçedeki okullar, hastaneler, ana yollar ve park alanları CBS ile haritaya aktarılacaktır. Her biri hangi vektör sembolle gösterilmelidir?",
       "cozum": "**Nokta:** Okullar ve hastaneler (konumu tek bir noktayla ifade edilebilen nesneler). **Çizgi:** Ana yollar (uzunluğu olan doğrusal nesneler). **Alan (poligon):** Park alanları (yüzölçümü olan nesneler). Okulun adı, öğrenci sayısı gibi bilgiler **öznitelik (mekânsal olmayan) veri** olarak tabloya eklenir."
      }
     ],
     "ozet": [
      "Mekânsal veri = konum; öznitelik = bilgi.",
      "Nokta, çizgi, alan sembolleri.",
      "Haritalar katmanlarla üretilir."
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
    "code": "COĞ.10.3.1",
    "title": {
     "tr": "Yer'in iç yapısı ve levha tektoniği",
     "en": "Earth's interior and plate tectonics"
    },
    "content": {
     "anlatim": "# Yer'in İç Yapısı\n\n**Yer kabuğu** (litosferin üst kısmı) → **manto** (üst kısmındaki akışkan **astenosfer**) → **çekirdek** (dış: sıvı, iç: katı).\n\n# Kuramlar\n\n- **Alfred Wegener (1915):** **Kıtaların Kayması Kuramı** (Pangea).\n- 1960'lardan sonra: **Levha Tektoniği Kuramı** — litosfer levhaları astenosferdeki **konveksiyon akımlarıyla** hareket eder.\n\n# Levha Sınırları\n\n| Sınır | Hareket | Oluşan şekiller | Örnek |\n|---|---|---|---|\n| **Ayrılma (uzaklaşma)** | Levhalar birbirinden uzaklaşır, magma yükselir | **Okyanus ortası sırtları**, rift vadileri | Doğu Afrika Rifti, Kızıldeniz |\n| **Yaklaşma (çarpışma)** | Levhalar çarpışır, biri diğerinin altına dalar | **Dalma-batma**, okyanus hendekleri, volkanik ada yayları, **kıvrım dağları** | Himalayalar |\n| **Yanal kayma (transform)** | Levhalar yatay olarak ters yönde kayar | Büyük **fay hatları** ve depremler | San Andreas, **Kuzey Anadolu Fayı** |",
     "ornekler": [
      {
       "soru": "Kızıldeniz zamanla genişliyor. Bu hangi levha hareketiyle açıklanır?",
       "cozum": "**Ayrılma (uzaklaşma) sınırı** — Afrika ve Arabistan levhaları birbirinden uzaklaşıyor."
      },
      {
       "soru": "Yer kabuğunun kalınlığı karalarda ve okyanus tabanında neden farklıdır? Hangi kabuk daha yoğundur?",
       "cozum": "**Kıtasal kabuk** daha kalındır (30–70 km) ve granit benzeri (sial) daha hafif kayaçlardan oluşur. **Okyanusal kabuk** incedir (5–10 km), bazalt (sima) gibi **daha yoğun** kayaçlardan oluşur. Bu yüzden iki levha çarpıştığında yoğun okyanusal levha kıtasal levhanın altına **dalar** (dalma–batma)."
      }
     ],
     "ozet": [
      "Wegener: kıtaların kayması; sonra levha tektoniği.",
      "Ayrılma: sırt/rift; yaklaşma: dağ/hendek; yanal: fay.",
      "KAF bir yanal kayma (transform) fayıdır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.10.3.1",
    "title": {
     "tr": "Orojenez, volkanizma ve deprem",
     "en": "Orogeny, volcanism and earthquakes"
    },
    "content": {
     "anlatim": "# Orojenez (Dağ Oluşumu)\n\nLevhaların yaklaşması sonucu tabakalar sıkışır:\n- **Esnek tortullar kıvrılır** → **kıvrım dağları**: **antiklinal** (yüksekte kalan kubbe) ve **senklinal** (alçakta kalan çanak).\n- **Sert tabakalar kırılır** → **horst** (yüksekte kalan blok) ve **graben** (çöküntü). Örnek: **Ege'deki kırıklı dağlar ve ovalar** (Bozdağlar–Gediz Grabeni).\n\n# Volkanizma\n\n| Tür | Şekiller |\n|---|---|\n| **Yüzey (dış) volkanizma** | **Merkezî püskürme**: tabakalı (strato), kalkan volkanlar, tüf konileri · **Çizgisel (fisür)**: lav platoları |\n| **Derinlik (iç) volkanizma** | Yüzeye çıkamayıp soğuyan magma: **batolit, lakolit, sill, dayk** |\n\n**Pasifik Ateş Çemberi** dünyanın en yoğun volkanizma ve deprem kuşağıdır.\n\n# Deprem\n\nFay hatlarında biriken enerjinin **ani boşalmasıyla** yayılan dalgalar.\n- **İç merkez (odak, hiposantr):** depremin başladığı yer altındaki nokta.\n- **Dış merkez (episantr):** yeryüzünde en çok hissedilen nokta.",
     "ornekler": [
      {
       "soru": "Ege Bölgesi'nde dağların ve ovaların birbirine paralel uzanması nasıl açıklanır?",
       "cozum": "Sert tabakaların **kırılmasıyla** yükselen **horstlar** (dağlar) ve çöken **grabenler** (ovalar) oluşmuştur."
      },
      {
       "soru": "Türkiye'de yaşanan depremlerin büyük çoğunluğu hangi fay hatları boyunca görülür? Neden?",
       "cozum": "**Kuzey Anadolu Fay Hattı**, **Doğu Anadolu Fay Hattı** ve **Batı Anadolu (Ege) graben sistemi**. Anadolu levhası, Arap levhasının kuzeye itmesiyle **batıya doğru** kaçmakta, bu hareket fay hatlarında gerilme biriktirip depremlere yol açmaktadır."
      }
     ],
     "ozet": [
      "Kıvrılma: antiklinal-senklinal; kırılma: horst-graben.",
      "Derinlik volkanizması: batolit, lakolit, sill, dayk.",
      "Odak yer altında, dış merkez yüzeyde."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.10.3.1",
    "title": {
     "tr": "Türkiye'nin tektonik yapısı ve jeolojik zamanlar",
     "en": "Türkiye's tectonics and geological time"
    },
    "content": {
     "anlatim": "# Türkiye'nin Tektonik Yapısı\n\n**Anadolu Levhası**; kuzeyde **Avrasya**, güneyde **Afrika**, güneydoğuda **Arabistan** levhalarının sıkıştırması altındadır.\n- Bu sıkışmayla **Kuzey Anadolu Dağları** ve **Toroslar** yükseldi.\n- Anadolu batıya doğru yılda yaklaşık **2–3 cm** kaymaktadır.\n- Üç büyük diri fay sistemi: **Kuzey Anadolu (KAF)**, **Doğu Anadolu (DAF)**, **Batı Anadolu fay zonu**.\n\n# Jeolojik Zamanlar\n\n| Zaman | Önemli olaylar |\n|---|---|\n| **Prekambriyen** | İlk kıta çekirdekleri (kalkanlar), ilk canlılar (alg, bakteri) |\n| **Paleozoyik** | **Pangea**, **taş kömürü** yatakları (Zonguldak), Kaledoniyen ve Hersiniyen kıvrımları |\n| **Mezozoyik** | Pangea'nın parçalanması, **Tetis Denizi**, **dinozorlar** |\n| **Senozoyik** (Paleojen–Neojen–Kuaterner) | **Alp-Himalaya orojenezi**, Türkiye'nin dağları ve **boğazlar**, linyit-petrol-**bor** yatakları, insanın ortaya çıkışı |",
     "ornekler": [
      {
       "soru": "Türkiye'nin dağlarının büyük bölümü hangi jeolojik zamanda oluşmuştur?",
       "cozum": "**Senozoyik** (III. zaman) — Alp-Himalaya orojenezi sırasında."
      },
      {
       "soru": "Zonguldak'taki taş kömürü yatakları ile Türkiye'nin linyit yatakları hangi jeolojik zamanlarda oluşmuştur?",
       "cozum": "Zonguldak taş kömürü **I. Zaman (Paleozoik)**, özellikle Karbonifer döneminin bataklık ormanlarından oluşmuştur. Linyitler (Afşin–Elbistan, Soma, Tunçbilek) daha genç olup **III. Zaman (Tersiyer)** göl ve bataklık ortamlarında oluşmuştur."
      }
     ],
     "ozet": [
      "Anadolu: Avrasya, Afrika ve Arabistan arasında sıkışır.",
      "KAF, DAF, Batı Anadolu fay zonu.",
      "Paleozoyik taş kömürü; Senozoyik dağlar, boğazlar, bor."
     ]
    }
   },
   {
    "id": "k4",
    "code": "COĞ.10.3.2",
    "title": {
     "tr": "Ayrışma: iklim ve kayaç yapısının etkisi",
     "en": "Weathering: effects of climate and rock type"
    },
    "content": {
     "anlatim": "# Ayrışma\n\nDış kuvvetlerin yeryüzünü şekillendirmesi **kayaçların ayrışmasıyla** başlar.\n\n| Tür | Nasıl? | Nerede baskın? |\n|---|---|---|\n| **Fiziksel (mekanik)** | Kimyasal yapı bozulmadan parçalanma: **sıcaklık farkı**, **donma çözülme**, **tuz kristalleşmesi**, **kavlama** | **Kurak, yarı kurak ve soğuk** iklimler (günlük sıcaklık farkı büyük) |\n| **Kimyasal** | Su, $CO_2$ ve $O_2$ ile minerallerin çözünüp yeni minerallere dönüşmesi | **Sıcak ve nemli** iklimler (ekvatoral, muson) |\n| **Biyolojik** | Kökler, canlıların etkisi | Bitki örtüsü gür yerler |\n\n# Kayaç Direnci\n\n- **Magmatik** (granit, bazalt): dirençli.\n- **Tortul** (kalker, jips, kiltaşı) ve bazı **başkalaşım** kayaçları: çözünme ve aşınmaya karşı **daha az dirençli**.",
     "ornekler": [
      {
       "soru": "Çöllerde kayaçların parçalanmasında hangi ayrışma etkindir? Neden?",
       "cozum": "**Fiziksel ayrışma** — gece-gündüz sıcaklık farkı çok büyüktür; kayaçlar genleşip büzülerek çatlar."
      },
      {
       "soru": "Karadeniz kıyılarında toprak örtüsünün kalın, Güneydoğu Anadolu'nun kurak kesimlerinde ise ince olmasının nedenini ayrışma türleriyle açıklayınız.",
       "cozum": "Karadeniz'de **nemli ve ılık** iklim nedeniyle **kimyasal ayrışma** güçlüdür; kayaçlar derinlemesine çözülür, kalın toprak oluşur ve bitki örtüsü toprağı korur. Kurak alanlarda kimyasal ayrışma zayıf, **mekanik (fiziksel) ayrışma** baskındır; toprak oluşumu yavaştır ve ince kalır."
      }
     ],
     "ozet": [
      "Fiziksel ayrışma: kurak ve soğuk iklim.",
      "Kimyasal ayrışma: sıcak ve nemli iklim.",
      "Kalker ve jips kolay çözünür."
     ]
    }
   },
   {
    "id": "k5",
    "code": "COĞ.10.3.3",
    "title": {
     "tr": "Akarsu ve karstik şekiller",
     "en": "Fluvial and karst landforms"
    },
    "content": {
     "anlatim": "# Akarsular\n\nYeryüzünü şekillendiren **en etkili dış kuvvet**. Akarsu yatağını derinleştirerek **denge profiline** ulaşmaya çalışır (taban seviyesi: deniz).\n\n| Aşınım şekilleri | Birikim şekilleri |\n|---|---|\n| Çentik (V) vadi, **boğaz (yarma)** vadi, **kanyon**, asimetrik vadi, dev kazanı, **peneplen** | **Birikinti konisi/yelpazesi**, **taşkın (alüvyal) ovası**, ırmak adası, **delta** (Çukurova, Bafra, Çarşamba) |\n\n- Taban seviyesi değişirse: **gömük menderesler**, **taraçalar (sekiler)**.\n\n# Karst Topoğrafyası\n\n**Kalker, jips, kaya tuzu** gibi kolay çözünen kayaçlarda gelişir.\n\n| Aşınım | Birikim |\n|---|---|\n| **Lapya** (en küçük oluk), **dolin**, **uvala**, **polye** (en geniş karstik ova), **düden**, kör vadi, **mağara**, **obruk** | Mağarada **sarkıt, dikit, sütun**; yeryüzünde **traverten** (Pamukkale) |\n\n> Dolinler birleşince uvala, uvalalar birleşince polye oluşur.",
     "ornekler": [
      {
       "soru": "Pamukkale travertenleri nasıl oluşmuştur?",
       "cozum": "Kalkerli araziden geçen **kalsiyum bikarbonatlı** kaynak suları yeryüzüne çıkınca $CO_2$ kaybeder ve kireç **çökelir**; basamak şeklinde birikinti oluşur."
      },
      {
       "soru": "Bir akarsuyun yukarı, orta ve aşağı çığırındaki baskın aşındırma–biriktirme süreçlerini ve oluşan şekilleri karşılaştırınız.",
       "cozum": "**Yukarı çığır:** Eğim fazla → **derine aşındırma**; çentik (V) vadiler, şelaleler. **Orta çığır:** Yana aşındırma artar → geniş tabanlı vadiler, **menderesler**. **Aşağı çığır:** Eğim azalır → **biriktirme**; taşkın ovası, **delta** (Çukurova, Bafra, Çarşamba). Aynı akarsuda enerji azaldıkça aşındırma yerini biriktirmeye bırakır."
      }
     ],
     "ozet": [
      "Akarsu en etkili dış kuvvet; delta = kıyıda birikim.",
      "Lapya < dolin < uvala < polye.",
      "Sarkıt, dikit, sütun, traverten karstik birikimdir."
     ]
    }
   },
   {
    "id": "k6",
    "code": "COĞ.10.3.3",
    "title": {
     "tr": "Rüzgâr, buzul ve kıyı şekilleri",
     "en": "Wind, glacial and coastal landforms"
    },
    "content": {
     "anlatim": "# Rüzgâr (Kurak ve Yarı Kurak Alanlar)\n\n| Aşınım | Birikim |\n|---|---|\n| **Deflasyon** (süpürme) → çöl kaldırımı, tava · **Korazyon** (aşındırma) → **mantar kaya**, yardang | **Kumul** (kum tepesi), **lös** (ince toz örtüsü) |\n\n# Buzullar\n\nKalıcı kar sınırının üstünde buzulların hareketiyle oluşur.\n| Aşınım | Birikim |\n|---|---|\n| **Sirk**, **U vadi**, hörgüç kaya, buzul çizikleri | **Moren**, drumlin |\n\nYüksek enlemlerde deniz suyunun istila ettiği buzul vadileri **fiyort** kıyılarını oluşturur.\n\n# Kıyı Şekilleri ve Kıyı Tipleri\n\n**Dalga şekilleri:** **falez** (yalıyar), dalga aşınım platformu, deniz kemeri, kumsal, kıyı oku, **tombolo** (adayı karaya bağlar), **lagün** (deniz kulağı).\n\n| Kıyı tipi | Özellik | Örnek |\n|---|---|---|\n| **Boyuna** | Dağlar kıyıya **paralel**, girinti-çıkıntı az | Karadeniz, Akdeniz |\n| **Enine** | Dağlar kıyıya **dik**, girintili-çıkıntılı | Ege |\n| **Ria** | Akarsu vadilerinin sular altında kalması | İstanbul ve Çanakkale boğazları |\n| **Dalmaçya** | Paralel dağların tepeleri ada olmuş | Hırvatistan, Kaş |\n| **Fiyort / skyer** | Buzul vadileri / buzulla aşınmış alçak kıyılar | Norveç / İskandinavya |",
     "ornekler": [
      {
       "soru": "Ege kıyılarının girintili-çıkıntılı olmasının nedeni nedir?",
       "cozum": "Dağların kıyıya **dik** uzandığı **enine kıyı** tipidir; dağlar arasındaki ovalar ve koylar denize açılır."
      },
      {
       "soru": "Peribacaları ile mantarkaya arasındaki fark nedir? Hangi dış kuvvetler bu şekillerin oluşumunda etkilidir?",
       "cozum": "**Peribacaları** (Kapadokya) volkanik tüflerin **sel suları ve yağış** ile aşındırılmasıyla, sert bir başlık kayacın altındaki yumuşak tüfü koruması sonucu oluşur. **Mantarkaya** ise kurak alanlarda **rüzgârın** taşıdığı kumların kayaçların alt kısmını daha çok aşındırmasıyla oluşur (Karapınar). Her ikisinde de **farklı direnç gösteren kayaçlar** belirleyicidir."
      }
     ],
     "ozet": [
      "Rüzgâr: mantar kaya, kumul, lös.",
      "Buzul: sirk, U vadi, moren; fiyort.",
      "Boyuna (Karadeniz), enine (Ege), ria (boğazlar)."
     ]
    }
   },
   {
    "id": "k7",
    "code": "COĞ.10.3.4–5",
    "title": {
     "tr": "Saha çalışması ve yer şekillerinin beşerî faaliyetlerle etkileşimi",
     "en": "Fieldwork and human interaction with landforms"
    },
    "content": {
     "anlatim": "# Saha Çalışması\n\n**Coğrafyanın laboratuvarı arazidir.** Saha çalışmaları yer şekillerini yerinde incelemeyi, doğal zenginlikleri fark etmeyi ve korumayı sağlar.\n\n# Yer Şekilleri ve İnsan\n\n| Alan | Etkileşim |\n|---|---|\n| **Nüfus ve yerleşme** | Verimli ovalar ve nehir vadileri (Nil, Çukurova, Büyük Menderes) yoğun; dağlık alanlar seyrek nüfuslu |\n| **Ulaşım** | Düzlükte yol yapımı ucuz; dağlık alanda **tünel ve viyadük** (Landwasser Viyadüğü) gerekir |\n| **İnsanın yer şekillerini değiştirmesi** | Maden ocakları, barajlar, dolgu alanları (**Hollanda polderleri**) — **Antroposen** |\n| **Canlılar** | Karınca, köstebek gibi canlılar küçük ölçekte şekillendirir |\n\n# Saha Çalışması Nasıl Yapılır?\n\n1. **Hazırlık:** Amaç ve soru belirlenir (*\"Bu vadide yerleşmeler neden yamaçta?\"*); harita, uydu görüntüsü ve kaynaklar incelenir.\n2. **Arazide gözlem:** Yer şekilleri fotoğraflanır, kroki çizilir, GPS ile konum alınır; yerel halkla görüşülür.\n3. **Değerlendirme:** Veriler haritaya ve tabloya aktarılır, sonuçlar rapor ya da sunumla paylaşılır.\n\nGidilemeyen yerler için **sanal saha çalışması** (Google Earth, 3B arazi modelleri, sanal turlar) yapılabilir. Yer şekillerinin insan faaliyetlerine etkisine **teraslama** (eğimli arazide tarım), **taşkın ovalarında yerleşme riski** ve **karstik alanlarda baraj sızıntısı** da örnek verilebilir.",
     "ornekler": [
      {
       "soru": "Hollanda'nın polderleri insan–doğa etkileşimine nasıl bir örnektir?",
       "cozum": "Deniz seviyesinin altındaki alanlar **setlerle kurutulup** tarım ve yerleşmeye açılmıştır; insan yer şekillerini doğrudan değiştirmiştir."
      },
      {
       "soru": "Bir öğrenci okulunun yakınındaki dere yatağında saha çalışması yapacaktır. Hangi gözlemleri yapmalı ve hangi soruları sormalıdır?",
       "cozum": "Gözlemler: Vadinin şekli (V ya da geniş tabanlı), yataktaki çakıl–kum boyutu, eğim, kıyıdaki yerleşmeler ve tarım alanları, taşkın izleri. Sorular: *\"Dere taşkın riski taşıyor mu? Yataktaki yapılaşma doğru mu? Dere hangi aşındırma–biriktirme şekillerini oluşturmuş?\"* Sonuçlar kroki, fotoğraf ve haritayla raporlanır."
      }
     ],
     "ozet": [
      "Coğrafyanın laboratuvarı arazidir.",
      "Ovalar yoğun, dağlar seyrek nüfuslu.",
      "Antroposen: insan topoğrafyayı değiştirir."
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
    "code": "COĞ.10.4.1",
    "title": {
     "tr": "Yerleşmelerin kuruluşu, gelişimi ve türleri",
     "en": "Founding, development and types of settlements"
    },
    "content": {
     "anlatim": "# Yerleşme\n\nİnsanların **barınma, korunma** ve sosyoekonomik faaliyetlerini sürdürdükleri alanlar. Paleolitik'te mağaralarda göçebe yaşam; Neolitik'te tarım ve hayvancılıkla **yerleşik hayat** (Çatalhöyük, Göbeklitepe).\n\n# Yerleşme Yerini Etkileyen Faktörler\n\n| Doğal | Beşerî |\n|---|---|\n| Elverişli **iklim**, yeterli **su**, verimli **toprak**, elverişli **yer şekilleri** | **Ekonomik faaliyetler**, **ulaşım**, göçler, bilim-teknoloji (denizlerin doldurulması) |\n\n- Karaların fazla olduğu **Kuzey Yarım Küre** yerleşmeye daha uygundur.\n- **Sanayi Devrimi** ile şehirler hızla büyüdü, metropoller doğdu.\n\n# Kır ve Şehir Yerleşmeleri\n\n| Kır yerleşmeleri | Şehir yerleşmeleri |\n|---|---|\n| Genelde nüfusu **10 binden az**, geçim **tarım-hayvancılık** | Nüfusu 10 binin üzerinde, **sanayi, ticaret, hizmet** baskın |\n| Kasaba, köy, **köy altı yerleşmeleri** | Küçük, orta, büyükşehir, metropol |\n\n### Köy altı yerleşmeleri\n\n| Devamlı | Geçici |\n|---|---|\n| **Mahalle**, **mezra** | **Yayla**, **oba**, **kom** |\n\n> **Salda Gölü** gibi hassas alanlarda (stromatolitler) planlı yerleşme ve koruma imar planları önemlidir.",
     "ornekler": [
      {
       "soru": "Yaz aylarında hayvancılık amacıyla kullanılan geçici yerleşme hangisidir?",
       "cozum": "**Yayla** (ayrıca konargöçerlerin çadırlarından oluşan **oba**, Doğu Anadolu'daki **kom**)."
      },
      {
       "soru": "İstanbul, Ankara ve Erzurum şehirlerinin kuruluş yerini etkileyen coğrafi faktörleri karşılaştırınız.",
       "cozum": "**İstanbul:** Boğazın iki yakasında; **ulaşım ve ticaret yollarının kesişimi**, savunmaya elverişli yarımada, liman. **Ankara:** Savunmaya uygun kale tepesi, su kaynakları, İç Anadolu'nun **merkezî konumu**; başkent olunca hızla büyüdü. **Erzurum:** Yüksek ovada, **İpek Yolu** güzergâhında, stratejik askerî konum."
      }
     ],
     "ozet": [
      "Yerleşme: doğal (iklim, su, toprak) + beşerî faktörler.",
      "Kır: tarım; şehir: sanayi-ticaret-hizmet.",
      "Devamlı: mahalle, mezra; geçici: yayla, oba, kom."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.10.4.2",
    "title": {
     "tr": "Yerleşmelerin fonksiyonları",
     "en": "Functions of settlements"
    },
    "content": {
     "anlatim": "# Fonksiyon\n\nBir yerleşmenin varlığını sürdürmesini sağlayan **ekonomik, idarî, sosyal ve kültürel** faaliyetler. Şehirlerde fonksiyon çeşitliliği kırsala göre çok fazladır.\n\n| Fonksiyon | Örnek |\n|---|---|\n| **Tarım** | Çarşamba, Söke, Salihli |\n| **Madencilik** | Zonguldak (kömür), Batman (petrol), Elazığ-Maden (bakır) |\n| **Sanayi** | Manchester, İzmit, Bursa, Gaziantep |\n| **Ticaret ve yönetim** | İstanbul (finans), Ankara (başkent), New York |\n| **Turizm** | Bodrum, Antalya |\n| **Ulaşım** | Frankfurt (havalimanı), Rotterdam (liman) |\n| **Eğitim, sağlık, dinî** | Üniversite şehirleri, Mekke |\n\n> Fonksiyonlar zamanla **değişebilir** ya da yeni fonksiyon eklenebilir (üniversite açılan bir kente eğitim fonksiyonu).",
     "ornekler": [
      {
       "soru": "Zonguldak hangi fonksiyonuyla öne çıkar?",
       "cozum": "**Madencilik** (taş kömürü)."
      },
      {
       "soru": "Bir şehrin birden fazla fonksiyonu olabilir mi? Antalya örneğiyle açıklayınız.",
       "cozum": "Evet. **Antalya** başta **turizm** olmak üzere **tarım** (seracılık, narenciye), **ticaret** (liman, serbest bölge) ve **yönetim** (il merkezi) fonksiyonlarına sahiptir. Şehirler genellikle **baskın bir fonksiyonla** (Antalya: turizm) öne çıkar ama birden çok fonksiyon taşır."
      }
     ],
     "ozet": [
      "Fonksiyon: yerleşmeyi yaşatan faaliyetler.",
      "Şehirde çok, kırda az fonksiyon.",
      "Fonksiyonlar zamanla değişebilir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.10.4.Ek",
    "title": {
     "tr": "Nüfusun dağılışı, nüfus piramitleri ve Türkiye'nin nüfus özellikleri",
     "en": "Population distribution, population pyramids and Türkiye's population"
    },
    "content": {
     "anlatim": "# Nüfusun Dağılışını Etkileyen Faktörler\n\n| Doğal | Beşerî |\n|---|---|\n| İklim (ılıman bölgeler kalabalık), yer şekilleri (ovalar), su kaynakları, toprak verimliliği | Sanayi, ticaret, ulaşım, tarih, turizm, siyasi kararlar |\nDünyanın en kalabalık bölgeleri: **Güney ve Doğu Asya**, **Batı Avrupa**, **ABD'nin kuzeydoğusu**. En seyrek: kutuplar, çöller, yüksek dağlar, Amazon ve Kongo ormanları.\n\n# Nüfus Yoğunlukları\n\n- **Aritmetik yoğunluk** $= \\dfrac{\\text{nüfus}}{\\text{toplam alan}}$\n- **Fizyolojik yoğunluk** $= \\dfrac{\\text{nüfus}}{\\text{tarım alanı}}$ (tarım alanı azsa çok yüksek: Mısır)\n- **Tarımsal yoğunluk** $= \\dfrac{\\text{tarımla uğraşan nüfus}}{\\text{tarım alanı}}$\n\n# Nüfus Piramitleri\n\n| Piramit | Görünüm | Ülke tipi |\n|---|---|---|\n| **Genişleyen (geniş tabanlı)** | Taban geniş, tepe dar | Doğum oranı yüksek, ortalama ömür kısa (Nijer) |\n| **Durağan** | Kenarlar dik, düzgün | Doğum ve ölüm oranları dengeli |\n| **Daralan (tabanı dar)** | Taban dar, orta ve üst geniş | Gelişmiş, yaşlanan nüfus (Japonya, Almanya) |\n\n# Türkiye'nin Nüfusu\n\n- **İlk nüfus sayımı 1927** (13,6 milyon); 2007'den beri **adrese dayalı** kayıt sistemi. Nüfus 85 milyonu aştı.\n- Nüfus artış hızı **azalmaktadır**; toplam doğurganlık hızı yenilenme düzeyinin (2,1) **altına** düştü → nüfus **yaşlanıyor**.\n- En kalabalık iller: İstanbul, Ankara, İzmir; en yoğun kıyı ve sanayi bölgeleri (Marmara); en seyrek: Doğu Anadolu'nun yüksek kesimleri, Tuz Gölü çevresi, Menteşe yöresi.",
     "ornekler": [
      {
       "soru": "Bir ülkenin nüfus piramidinin tabanı daralıp orta kısmı genişliyorsa bu ülke hakkında ne söylenebilir?",
       "cozum": "**Doğum oranı azalmış**, nüfus **yaşlanmaya** başlamıştır; ileride çalışan nüfus azalabilir, emeklilik ve sağlık giderleri artabilir."
      },
      {
       "soru": "Mısır'ın aritmetik yoğunluğu orta düzeyde iken fizyolojik yoğunluğunun çok yüksek olmasının nedeni nedir?",
       "cozum": "Ülkenin büyük kısmı **çöldür**; tarım alanı yalnızca **Nil vadisi ve deltası** ile sınırlıdır, bu küçük alana çok fazla nüfus düşer."
      }
     ],
     "ozet": [
      "Aritmetik yoğunluk nüfus/alan; fizyolojik nüfus/tarım alanı.",
      "Geniş tabanlı piramit genç nüfus; dar tabanlı yaşlanan nüfus.",
      "Türkiye: ilk sayım 1927; doğurganlık 2,1'in altında, nüfus yaşlanıyor."
     ]
    }
   },
   {
    "id": "k4",
    "code": "COĞ.10.4.Ek",
    "title": {
     "tr": "Göç: nedenleri, türleri ve sonuçları",
     "en": "Migration: causes, types and consequences"
    },
    "content": {
     "anlatim": "# Göçün Nedenleri (itici ve çekici faktörler)\n\n| İtici (çıkılan yer) | Çekici (gidilen yer) |\n|---|---|\n| İşsizlik, yoksulluk, toprağın miras yoluyla bölünmesi, makineleşme | İş imkânı, yüksek ücret |\n| Eğitim ve sağlık hizmetlerinin yetersizliği | Eğitim, sağlık, kültürel imkânlar |\n| Savaş, terör, siyasi baskı | Güvenlik, özgürlük |\n| Doğal afetler, kuraklık, iklim değişikliği | Elverişli iklim, turizm |\n\n# Göç Türleri\n\n- **İç göç:** Ülke içinde (köyden kente — Türkiye'de 1950 sonrası hızlandı), **mevsimlik göç** (fındık, pamuk hasadı; turizm).\n- **Dış göç:** Ülkeler arası. Türkiye'den **Almanya'ya işçi göçü** (1961 anlaşması), **beyin göçü** (nitelikli insan gücü).\n- **Zorunlu göç:** Savaş, mübadele (**1923 Türk–Yunan nüfus mübadelesi**), afet. **Mülteci** ve **sığınmacı** kavramları.\n- **Gönüllü göç:** Ekonomik ve kişisel tercihlerle.\n\n# Sonuçları\n\n| Göç veren yer | Göç alan yer |\n|---|---|\n| Nüfus azalır ve **yaşlanır**, tarımsal üretim düşebilir, boşalan köyler | **Gecekondulaşma**, altyapı ve konut sorunu, trafik, işsizlik, çevre kirliliği |\n| Gönderilen dövizle ekonomik katkı | Kültürel çeşitlilik, iş gücü artışı |\n\n# Türkiye ve Göç\n\nTürkiye hem **göç veren**, hem **göç alan** (Suriye iç savaşı sonrası dünyada en çok mülteci barındıran ülkelerden), hem de **transit** (Avrupa'ya geçiş) ülkesidir.",
     "ornekler": [
      {
       "soru": "Doğu Karadeniz'de dağınık yerleşme ve tarım alanlarının küçüklüğü göçü nasıl etkiler?",
       "cozum": "Miras yoluyla bölünen **küçük tarım arazileri** aileyi geçindiremez; bu durum **itici** bir faktördür ve büyük şehirlere ve mevsimlik işlere göçü artırır."
      },
      {
       "soru": "Hızlı göç alan büyük şehirlerde ortaya çıkan iki sorunu yazınız.",
       "cozum": "**Gecekondulaşma ve çarpık kentleşme**; altyapı (su, kanalizasyon, ulaşım) **yetersizliği**, işsizlik ve trafik sorunu."
      }
     ],
     "ozet": [
      "Göç itici (işsizlik, savaş) ve çekici (iş, eğitim) faktörlerle olur.",
      "İç göç, dış göç, mevsimlik göç, beyin göçü, zorunlu göç (mübadele).",
      "Göç alan yerde gecekondu ve altyapı sorunu; göç veren yerde yaşlanma."
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
    "code": "COĞ.10.5.1",
    "title": {
     "tr": "Ekonomik sektörler",
     "en": "Economic sectors"
    },
    "content": {
     "anlatim": "# Beş Ekonomik Sektör\n\n| Sektör | Kapsam |\n|---|---|\n| **Birincil** | Doğadan doğrudan üretim: tarım, hayvancılık, balıkçılık, ormancılık, madencilik |\n| **İkincil** | Ham maddenin işlenmesi: sanayi, inşaat, enerji üretimi |\n| **Üçüncül** | Hizmet: ticaret, eğitim, sağlık, ulaşım, turizm, finans, iletişim |\n| **Dördüncül** | Bilgi ve enformasyon: **AR-GE**, yazılım, tasarım, CBS uzmanlığı |\n| **Beşincil** | Üst düzey **karar verme**: yöneticiler, stratejik planlamacılar, hükümet yetkilileri |\n\n# Sektörlerin Birbirine Bağlılığı\n\nBir ürün, sektörler arasında bir **değer zinciri** oluşturur: Pamuk tarlada yetiştirilir (birincil) → iplik ve kumaş fabrikasında işlenir (ikincil) → mağazada satılır ve nakliye edilir (üçüncül) → yeni kumaş teknolojisi laboratuvarda geliştirilir (dördüncül) → şirketin ihracat stratejisine yönetim kurulu karar verir (beşincil).\n\nTeknoloji ilerledikçe birincil sektörde çalışan sayısı **makineleşme** nedeniyle azalır; bilgi ve hizmet sektörlerinin payı artar.",
     "ornekler": [
      {
       "soru": "Bir yazılım şirketinde yapay zekâ geliştiren mühendis hangi sektörde çalışır?",
       "cozum": "**Dördüncül sektör** (bilgi, AR-GE, yazılım)."
      },
      {
       "soru": "Aşağıdaki meslekleri ekonomik sektörlere ayırınız: madenci, öğretmen, otomobil fabrikası işçisi, bir bankanın genel müdürü, ilaç araştırmacısı.",
       "cozum": "Madenci → **birincil**; otomobil fabrikası işçisi → **ikincil**; öğretmen → **üçüncül**; ilaç araştırmacısı (AR-GE) → **dördüncül**; bankanın genel müdürü (üst düzey karar) → **beşincil**."
      }
     ],
     "ozet": [
      "Birincil: doğadan; ikincil: işleme; üçüncül: hizmet.",
      "Dördüncül: bilgi, AR-GE.",
      "Beşincil: üst düzey karar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.10.5.2",
    "title": {
     "tr": "Ekonomik sektörler ve gelişmişlik düzeyi",
     "en": "Economic sectors and level of development"
    },
    "content": {
     "anlatim": "# Sektörler ve Gelişmişlik\n\nÇalışan nüfusun sektörlere dağılımı ile gelişmişlik arasında **doğrudan ilişki** vardır. GSYİH ve istihdam oranları analizin temelidir.\n\n| | Gelişmiş ülkeler (Kanada, Almanya, İtalya) | Az gelişmiş ülkeler (Çad, Zambiya, Mozambik) |\n|---|---|---|\n| **Tarımda çalışan** | Çok düşük (%1–3) | Çok yüksek (%50–70+) |\n| **Sanayi ve hizmet** | Yüksek | Zayıf |\n| **Kişi başı gelir** | Yüksek | Düşük |\n| **Enerji tüketimi, okuryazarlık, yaşam süresi** | Yüksek | Düşük |\n| **Dış ticaret** | Katma değeri yüksek sanayi ve teknoloji ürünleri | Ham madde satar, işlenmiş ürün alır |\n\n# Gelişmişliği Ölçen Göstergeler\n\n- **Kişi başı GSYİH:** Bir ülkede bir yılda üretilen mal ve hizmetlerin değerinin nüfusa oranı.\n- **İnsani Gelişme Endeksi (İGE):** Gelirin yanı sıra **eğitim** ve **sağlık (beklenen yaşam süresi)** göstergelerini birleştirir; tek başına gelirden daha kapsamlı bir ölçüdür.\n- **Sektörel dağılım:** Gelişmiş ekonomilerde hizmet sektörü istihdamın **%70'inden fazlasını** oluşturur.\n\nHam madde ihracatına dayanan ülkeler fiyat dalgalanmalarına karşı **kırılgandır**; katma değeri yüksek ürün üreten ülkelerin ekonomisi daha **dirençlidir**.",
     "ornekler": [
      {
       "soru": "Bir ülkede çalışanların %65'i tarımda ise bu ülkenin gelişmişlik düzeyi hakkında ne söylenebilir?",
       "cozum": "Büyük olasılıkla **az gelişmiş** bir ülkedir: sanayi ve hizmet zayıf, kişi başı gelir düşük, ham madde ihracatına bağımlıdır."
      },
      {
       "soru": "A ülkesinde istihdamın %3'ü tarımda, %22'si sanayide, %75'i hizmette; B ülkesinde %60'ı tarımda, %10'u sanayide, %30'u hizmettedir. Hangi ülke daha gelişmiştir? İki gösterge daha belirtiniz.",
       "cozum": "**A ülkesi** daha gelişmiştir: Tarımda çalışan payının düşük, hizmet payının yüksek olması **makineleşmiş tarım** ve gelişmiş hizmet ekonomisini gösterir. A ülkesinde **kişi başı gelirin**, **okuryazarlık oranının** ve **ortalama yaşam süresinin** de yüksek olması beklenir."
      }
     ],
     "ozet": [
      "Tarımda çalışan oranı ↑ → gelişmişlik ↓.",
      "Gelişmiş: hizmet ve sanayi ağırlıklı.",
      "Az gelişmiş: ham madde satar."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.10.5.3",
    "title": {
     "tr": "Türkiye ekonomisinin sektörel dağılımı",
     "en": "Sectoral distribution of Türkiye's economy"
    },
    "content": {
     "anlatim": "# Türkiye'de Ekonomik Dönüşüm\n\n- **İzmir İktisat Kongresi (1923)** ile temeller atıldı; sonra **devletçilik** dönemi ve **1980 sonrası ihracata dayalı** büyüme modeli.\n- Cumhuriyet'in ilk yıllarında nüfusun büyük kısmı **tarımda** çalışıyordu; sanayileşme ve şehirleşmeyle tarımın payı azaldı, **hizmet ve sanayi** arttı.\n\n| Yıl | Tarım | Sanayi | Hizmet |\n|---|---|---|---|\n| **1990** | %46,8 | %20,3 | %32,9 |\n| **2018** | %18,4 | %26,7 | %54,9 |\n| **Günümüz** | ≈ %15 | ≈ %27 | ≈ %57 |\n\n*(İstihdamın sektörlere dağılımı; günümüz değerleri yaklaşıktır.)*\n\n> Türkiye **tarım toplumundan sanayi ve hizmet ağırlıklı** bir ekonomiye dönüşmüştür.\n\n# Bölgesel Farklar ve Güncel Eğilimler\n\nTürkiye'de sanayi ve hizmetler **Marmara** (İstanbul, Kocaeli, Bursa), **İç Anadolu** (Ankara, Konya, Kayseri) ve **Ege** (İzmir, Manisa, Denizli) çevresinde yoğunlaşır. Doğu Anadolu ve Karadeniz'in bazı bölgelerinde tarım ve hayvancılık hâlâ önemli bir istihdam alanıdır.\n- **Organize sanayi bölgeleri** ve **teknoparklar**, sanayi ve dördüncül sektörü güçlendirir.\n- Turizm (Antalya, Muğla) hizmet sektörünün önemli bir kaynağıdır.\n- Savunma sanayii, otomotiv, beyaz eşya ve tekstil ihracatta öne çıkar.",
     "ornekler": [
      {
       "soru": "1990'dan günümüze Türkiye'de istihdamın sektörel dağılımı nasıl değişmiştir?",
       "cozum": "Tarımın payı yaklaşık %47'den %15'e **düşmüş**; hizmetin payı %33'ten %57'ye **yükselmiş**, sanayi de artmıştır."
      },
      {
       "soru": "Türkiye'de tarımda çalışanların oranı azalırken tarımsal üretim neden düşmemiştir?",
       "cozum": "Tarımda **makineleşme**, sulama, sertifikalı tohum, gübre ve **verimlilik** artışı sayesinde daha az kişiyle daha çok ürün elde edilmektedir. Tarımdan ayrılan iş gücü sanayi ve hizmet sektörüne (**kente göç**) geçmiştir."
      }
     ],
     "ozet": [
      "İzmir İktisat Kongresi 1923.",
      "Tarım payı azaldı, hizmet arttı.",
      "Türkiye hizmet ağırlıklı ekonomiye geçti."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: Afetler ve Sürdürülebilir Çevre",
   "en": "Unit 6: Disasters and Sustainable Environment"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "COĞ.10.6.1–2",
    "title": {
     "tr": "Afetlerle mücadele ve dirençli yaşam alanları",
     "en": "Disaster management and resilient living spaces"
    },
    "content": {
     "anlatim": "# Afet\n\nCan ve mal kaybına yol açan **doğa ya da insan kaynaklı** olaylar. Şili, Japonya, Brezilya gibi ülkeler coğrafi koşullarına göre farklı stratejiler geliştirmiştir.\n\n# Afete Dirençli Şehirlerin Özellikleri (OECD)\n\n| Özellik | Açıklama |\n|---|---|\n| **Sağlamlık** | Yapıların şok ve stres karşısında işlevini sürdürmesi |\n| **Uyum sağlama** | Olayın gereklerine göre hızlı karar ve yönetim |\n| **Yedeklilik** | Acil durum kaynaklarının devreye alınabilmesi |\n| **Esneklik ve kapsayıcılık** | Toplumun tüm paydaşlarının katılımı |\n\n**İyi uygulama örnekleri:** **Gaziantep Risk Haritası**, İtalya **Potenza** bölgesi (#weResilient) — çok paydaşlı afet yönetimi.\n\n# Afetlerden Korunma ve Afet Bilinci\n\nAfet yönetiminin en önemli ayağı **risk ve zarar azaltma**dır:\n- **Erken uyarı** sistemleri\n- **Dere ıslahı**, **zemin etüdü**, **kentsel dönüşüm**\n- Yapısal olmayan riskleri azaltma: **eşyaların sabitlenmesi**\n- Afet çantası, toplanma alanlarını bilme, tatbikat",
     "ornekler": [
      {
       "soru": "Evdeki dolapları duvara sabitlemek hangi tür risk azaltma önlemidir?",
       "cozum": "**Yapısal olmayan** risklerin azaltılması (deprem sırasında devrilen eşyalardan kaynaklanan yaralanmaları önler)."
      },
      {
       "soru": "Japonya'da deprem bilincinin yüksek olmasını sağlayan iyi uygulama örneklerini sıralayınız. Türkiye'de benzer hangi çalışmalar vardır?",
       "cozum": "Japonya: Okullarda düzenli **tatbikatlar**, sıkı **yapı denetimi** ve depreme dayanıklı mühendislik, **erken uyarı sistemi**, 1 Eylül Afet Önleme Günü. Türkiye: **AFAD** eğitimleri ve **Afet Gönüllüsü** programı, **kentsel dönüşüm**, okullarda tatbikat, **e-Devlet afet ve acil durum bilgileri**, **zorunlu deprem sigortası (DASK)**."
      }
     ],
     "ozet": [
      "Dirençli şehir: sağlamlık, uyum, yedeklilik, kapsayıcılık.",
      "Risk azaltma: erken uyarı, zemin etüdü, kentsel dönüşüm.",
      "Eşya sabitleme yapısal olmayan önlemdir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "COĞ.10.6.2",
    "title": {
     "tr": "Afet türleri: deprem, sel, heyelan, çığ ve erozyon",
     "en": "Types of disasters: earthquake, flood, landslide, avalanche and erosion"
    },
    "content": {
     "anlatim": "# Afet ve Tehlike\n\n**Tehlike** doğal olayın kendisidir (deprem); **afet**, bu olayın can ve mal kaybına yol açarak toplumun normal hayatını durdurmasıdır. Afetin etkisi **hazırlıkla** azaltılabilir.\n\n# Başlıca Afetler ve Türkiye'de Görüldüğü Yerler\n\n| Afet | Neden | Türkiye'de yaygın olduğu yer | Önlem |\n|---|---|---|---|\n| **Deprem** | Fay hatlarında enerji boşalması (tektonik) | **Kuzey Anadolu, Doğu Anadolu ve Batı Anadolu fay hatları** | Depreme dayanıklı yapı, zemin etüdü, deprem çantası, tatbikat |\n| **Sel / taşkın** | Şiddetli yağış, kar erimesi, dere yatağına yapılaşma | **Karadeniz**, Akdeniz ve Ege kıyıları | Dere yataklarına yapı yapmamak, ağaçlandırma, bent |\n| **Heyelan** | Eğimli arazi + kil + aşırı yağış, yol yarmaları | **Doğu Karadeniz** (en fazla) | Yamaç teraslama, drenaj, bitki örtüsü |\n| **Çığ** | Eğimli yamaçta kalın kar örtüsü | **Doğu Anadolu**, Doğu Karadeniz dağları | Çığ bariyerleri, ağaçlandırma |\n| **Erozyon** | Bitki örtüsünün tahribi, yanlış tarım, eğim | **İç Anadolu, Güneydoğu** (kurak alanlar) | Ağaçlandırma, teraslama, nadas yerine münavebe |\n| **Orman yangını** | Kuraklık, sıcak, insan kaynaklı | **Akdeniz ve Ege** kıyıları | Yangın şeritleri, erken uyarı |\n| **Kuraklık** | Yağış azlığı, iklim değişikliği | İç Anadolu, Güneydoğu | Su tasarrufu, damla sulama |\n\n# Kurumlar ve Bilinç\n\n**AFAD** (Afet ve Acil Durum Yönetimi Başkanlığı), **DASK** (zorunlu deprem sigortası), **112 Acil Çağrı**. \"Çök–kapan–tutun\" hareketi; aile afet planı ve toplanma alanları.",
     "ornekler": [
      {
       "soru": "Doğu Karadeniz'de heyelanın sık görülmesinin iki nedeni nedir?",
       "cozum": "**Eğimin fazla olması** ve **yıl boyu bol yağış**; ayrıca killi zemin ve yamaçlarda yapılan yol–bina yapılaşması."
      },
      {
       "soru": "Tehlike ile afet arasındaki fark nedir? Bir örnekle açıklayınız.",
       "cozum": "Issız bir bölgede olan deprem bir **tehlikedir**; aynı deprem yerleşim yerinde can ve mal kaybına yol açarsa **afete** dönüşür. Hazırlık ve dayanıklı yapılar afet riskini azaltır."
      }
     ],
     "ozet": [
      "Tehlike doğal olay; afet toplumu etkileyen kayıplı olay.",
      "Heyelan Doğu Karadeniz, erozyon İç Anadolu, çığ Doğu Anadolu, yangın Akdeniz–Ege.",
      "AFAD, DASK; çök–kapan–tutun."
     ]
    }
   },
   {
    "id": "k3",
    "code": "COĞ.10.6.3",
    "title": {
     "tr": "Mekânın özelliklerine göre afetlerden korunma uygulamaları",
     "en": "Choosing disaster protection practices according to the characteristics of a place"
    },
    "content": {
     "anlatim": "# Her Yer Aynı Afete Hazırlanmaz\n\nAfetlerden korunma kararları **mekânın özelliklerine** (yer şekilleri, zemin, iklim, akarsu ağı, nüfus yoğunluğu, yapı stoku) göre verilir. Önce bölgenin **tehlike haritası** çıkarılır, sonra seçenekler oluşturulup karşılaştırılır.\n\n| Mekânın özelliği | Başlıca tehlike | Korunma uygulamaları |\n|---|---|---|\n| **Fay hattı üzerinde, alüvyal zemin** (Marmara, Ege grabenleri) | Deprem, zemin sıvılaşması | Zemin etüdü, sağlam zemine yerleşme, depreme dayanıklı yapı, kentsel dönüşüm, toplanma alanları |\n| **Dik yamaç, killi zemin, bol yağış** (Doğu Karadeniz) | Heyelan, sel | Yamaçlarda yapılaşmayı sınırlamak, **ağaçlandırma**, istinat duvarı, drenaj, dere yataklarını boşaltmak |\n| **Dar vadi, ani sağanak** | Taşkın, sel | Dere yatağına yapı yapmamak, **taşkın kanalları ve set**, erken uyarı |\n| **Yüksek dağlık, kar birikimi** (Doğu Anadolu) | Çığ | Çığ önleme çitleri, ağaçlandırma, riskli yamaçlarda yol kapatma ve uyarı |\n| **Kurak, seyrek bitki örtüsü** (İç Anadolu) | Erozyon, kuraklık, toz fırtınası | Rüzgâr perdeleri, nadas yerine **ekim nöbeti**, damla sulama |\n| **Kıyı, alçak delta** | Fırtına, kıyı taşkını, deniz seviyesi yükselmesi | Kıyı yapılaşma sınırı, dalgakıran, sulak alanları korumak |\n\n# Karar Verme Adımları\n\n1. **Amaç:** *\"Bu yerleşmeyi hangi afete karşı nasıl korumalıyız?\"*\n2. **Bilgi toplama:** Afet geçmişi, AFAD risk haritaları, jeolojik etüt, iklim verileri, yerel halkla görüşme.\n3. **Seçenek oluşturma:** Yapısal (set, istinat duvarı, güçlendirme) ve yapısal olmayan (planlama, eğitim, sigorta, erken uyarı) önlemler.\n4. **Karşılaştırma:** Maliyet, uygulanabilirlik, çevreye etkisi, kaç kişiyi koruduğu.\n5. **Seçim ve uygulama:** En uygun önlem seçilir.\n6. **Değerlendirme:** Önlemin işe yarayıp yaramadığı izlenir, gerekirse plan güncellenir.\n\n# Yeşil Vatan\n\nAğaçlandırma, erozyon ve heyelanı azaltan, sel suyunu yavaşlatan, karbon tutan **doğa temelli bir çözümdür**. Bitki örtüsü, birçok afetin etkisini azaltan en ucuz ve kalıcı \"yapı\" olarak düşünülebilir.",
     "ornekler": [
      {
       "soru": "Doğu Karadeniz'de dik yamaçlı bir vadide kurulu bir köyde sık sık heyelan ve sel yaşanıyor. Mekânın özelliklerine göre iki yapısal ve iki yapısal olmayan korunma önlemi öneriniz.",
       "cozum": "**Yapısal:** Yamaçlarda **istinat duvarı** ve **yüzey–yeraltı drenajı** (killi zemindeki suyu uzaklaştırmak); dere yatağında **taşkın duvarı ve ıslah**. **Yapısal olmayan:** Riskli yamaç ve dere yataklarında **yapılaşma yasağı** (imar planı), ağaçlandırma, yağış eşiğine bağlı **erken uyarı** ve tahliye planı."
      },
      {
       "soru": "Bir belediye, alüvyal zemin üzerinde ve aktif bir faya yakın kurulmuş bir ilçede yeni bir hastane yapmak istiyor. Hangi alternatifleri değerlendirmeli, hangisini seçmelidir?",
       "cozum": "Alternatifler: (1) Aynı yere sıradan yapı, (2) aynı yere **zemin iyileştirme + sismik izolatörlü** yapı, (3) ilçede **sağlam (kaya) zeminli** başka bir arsa. Hastaneler afet sonrası **kesintisiz çalışması** gereken kritik yapılardır; en uygun seçim sağlam zemindeki bir alana sismik izolatörlü inşa etmektir (2 ve 3'ün birleşimi). 1. seçenek risk nedeniyle reddedilir."
      }
     ],
     "ozet": [
      "Korunma kararı mekânın özelliklerine (zemin, eğim, iklim, akarsu, nüfus) göre verilir.",
      "Deprem: zemin etüdü ve dayanıklı yapı; heyelan: drenaj, istinat duvarı, ağaçlandırma; sel: dere yatağını boşaltma, set, erken uyarı.",
      "Önlemler yapısal ve yapısal olmayan olarak ikiye ayrılır.",
      "Karar: amaç → bilgi → seçenekler → karşılaştırma → seçim → değerlendirme."
     ]
    }
   },
   {
    "id": "k4",
    "code": "COĞ.10.6.4",
    "title": {
     "tr": "Afet bilinci oluşturmanın faydaları",
     "en": "Benefits of building disaster awareness"
    },
    "content": {
     "anlatim": "# Afet Bilinci Nedir?\n\n**Afet bilinci**; bireyin yaşadığı yerin **tehlikelerini bilmesi**, afet öncesinde **hazırlık yapması**, afet anında **doğru davranması** ve afet sonrasında **topluma destek olmasıdır**. Afete dirençli bir toplum, ancak bilinçli bireylerle mümkündür.\n\n# Afet Döngüsünde Bilinçli Birey\n\n| Aşama | Ne yapar? |\n|---|---|\n| **Önce (zarar azaltma ve hazırlık)** | Evinin depreme dayanıklılığını yaptırır, eşyaları sabitler, **afet ve acil durum çantası** hazırlar, aile **afet planı** yapar, toplanma alanını öğrenir, DASK yaptırır |\n| **Sırasında (müdahale)** | **Çök–Kapan–Tutun**; asansör ve merdiven kullanmaz; selde yüksek yere çıkar, araçla suya girmez |\n| **Sonra (iyileştirme)** | Gaz–elektriği kontrol eder, resmî kaynakları takip eder, gönüllü destek verir, yeniden yapılanmaya katılır |\n\n# Bilincin Faydaları\n\n- **Can kayıpları azalır:** Tatbikat yapan okullarda tahliye süresi kısalır, panik azalır.\n- **Ekonomik kayıplar azalır:** Zarar azaltmaya harcanan her lira, afet sonrası çok daha büyük harcamaları önler.\n- **Toplumsal dayanışma artar:** Mahalle afet gönüllüleri ilk müdahalede kritik rol oynar; ilk 72 saat çoğu zaman yerel halkın kendi kaynaklarıyla geçer.\n- **Psikolojik dayanıklılık:** Ne yapacağını bilen kişi travmayı daha kolay atlatır.\n- **Doğru karar verme:** Bilinçli vatandaş, riskli yerde ev almaz, kaçak yapıya karşı çıkar.\n\n# Kendi Deneyimini Yansıt\n\nOkulunuzda yapılan bir deprem ya da yangın tatbikatını düşünün: *Ne öğrendim? Neyi iyi yaptık, neyi geliştirmeliyiz? Ailemle afet planımız var mı?* Bu soruların cevapları, afet bilincinin **bireyden topluma** nasıl yayıldığını gösterir.\n\n**Kurumlar:** AFAD, Kızılay, AKUT ve yerel yönetimler eğitim, tatbikat ve gönüllülük programları düzenler. **112** tek acil çağrı numarasıdır.",
     "ornekler": [
      {
       "soru": "Bir ailenin deprem için hazırladığı afet ve acil durum çantasında neler bulunmalıdır? Çanta nerede durmalıdır?",
       "cozum": "Su (kişi başı en az 3 günlük), bozulmayan yiyecekler, ilk yardım malzemeleri ve düzenli kullanılan ilaçlar, el feneri, pilli radyo ve yedek pil, düdük, battaniye, yedek kıyafet, kimlik ve önemli belgelerin kopyaları, bir miktar nakit, powerbank. Çanta **kolay ulaşılabilir**, çıkışa yakın bir yerde durmalı ve içeriği yılda bir kontrol edilmelidir."
      },
      {
       "soru": "İki okuldan biri yılda iki kez deprem tatbikatı yapıyor, diğeri hiç yapmıyor. Gerçek bir depremde iki okul arasında ne gibi farklar beklenir?",
       "cozum": "Tatbikat yapan okulda öğrenciler **Çök–Kapan–Tutun** hareketini refleks olarak yapar, **tahliye yolları ve toplanma alanı** bilinir, görevli öğretmenler sayım ve ilk yardımı organize eder; **panik ve izdiham** riski azalır. Tatbikat yapmayan okulda merdivenlerde yığılma, yanlış davranışlar ve kayıp kişilerin geç fark edilmesi gibi sorunlar beklenir. Bu, afet bilincinin **can kaybını azaltan** faydasını gösterir."
      }
     ],
     "ozet": [
      "Afet bilinci: tehlikeyi bilmek, hazırlanmak, doğru davranmak ve sonrasında destek olmak.",
      "Hazırlık: sabitleme, afet çantası, aile afet planı, toplanma alanı, DASK.",
      "Faydaları: can ve mal kaybının azalması, dayanışma, psikolojik dayanıklılık, doğru kararlar.",
      "AFAD, Kızılay, AKUT eğitim ve gönüllülük programları düzenler; acil çağrı 112."
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
    "code": "COĞ.10.7.1",
    "title": {
     "tr": "Türk kültürünün mekânsal özellikleri",
     "en": "Spatial characteristics of Turkish culture"
    },
    "content": {
     "anlatim": "# Kültür Ocağı: Türkistan\n\nTürk kültürünün doğduğu ve yayıldığı **Orta Asya**; **Altay Dağları, Ural, Hazar ve Sibirya** arasındaki bozkır coğrafyası.\n\n# Göçler ve Yayılım\n\n**Kuraklık, nüfus artışı** ve siyasi nedenlerle Kafkasya, Karadeniz'in kuzeyi, Balkanlar ve **Anadolu**'ya kitlesel göçler (Kavimler Göçü vb.).\n\n# Konargöçer ve Türk-İslam Kültürü\n\n| İslamiyet öncesi | İslamiyet sonrası |\n|---|---|\n| **Gök Tanrı** inancı, **kurgan** ve **balbal**, **yaylak–kışlak** geleneği | **Medrese, külliye, ahilik** teşkilatı ile zenginleşme |\n\n# Ortak Miras\n\n**Orhun Yazıtları**, **Dede Korkut**, **Nevruz**, ortak Türkçe ve **Türk Devletleri Teşkilatı (TDT)** kültürel birliği güçlendirir.\n\n# Türk Kültürünün Mekâna Yansıması\n\nTürk kültürü gittiği coğrafyalara **mimari, yer adları, mutfak ve gelenekler** yoluyla iz bırakmıştır:\n- **Mimari:** Kervansaraylar, kümbetler, camiler ve köprüler (Mostar Köprüsü, Bosna-Hersek).\n- **Yer adları:** Balkanlar'dan Orta Asya'ya Türkçe kökenli şehir, dağ ve nehir adları.\n- **Gelenek ve mutfak:** Nevruz kutlamaları, at kültürü, ayran–kımız, mantı ve pilav çeşitleri geniş bir alana yayılmıştır.\n\nBu ortak öğeler, Türk dünyası ile **kültürel, ekonomik ve siyasi bağların** güçlenmesine zemin hazırlar.",
     "ornekler": [
      {
       "soru": "Yaylak–kışlak geleneği hangi coğrafi koşulun sonucudur?",
       "cozum": "Bozkırın **iklim ve otlak** koşulları: yazın serin yaylalara, kışın daha ılık ovalara hayvanlarla göç edilir (konargöçer yaşam)."
      },
      {
       "soru": "Türk Devletleri Teşkilatı'nın üyesi ülkeleri yazınız. Bu ülkeleri birbirine bağlayan coğrafi ve kültürel öğeler nelerdir?",
       "cozum": "Üyeler: **Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan** (gözlemciler: Macaristan, Türkmenistan, KKTC). Bağlayan öğeler: Ortak **Türkçe** ve kökeni, Orta Asya'dan gelen tarihî miras, **Nevruz** gibi ortak bayramlar, İpek Yolu ve **Orta Koridor** ulaşım bağlantıları."
      }
     ],
     "ozet": [
      "Kültür ocağı: Orta Asya bozkırları.",
      "Göç nedenleri: kuraklık, nüfus artışı.",
      "Ortak miras: Orhun, Dede Korkut, Nevruz, TDT."
     ]
    }
   }
  ]
 }
];
