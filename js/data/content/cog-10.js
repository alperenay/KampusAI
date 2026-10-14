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
    "code": "1.1",
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
    "code": "2.1",
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
    "code": "2.2",
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
    "code": "3.1",
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
    "code": "3.2",
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
    "code": "3.3",
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
    "code": "3.4",
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
    "code": "3.5",
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
    "code": "3.6",
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
    "code": "3.7",
    "title": {
     "tr": "Saha çalışması ve yer şekillerinin beşerî faaliyetlerle etkileşimi",
     "en": "Fieldwork and human interaction with landforms"
    },
    "content": {
     "anlatim": "# Saha Çalışması\n\n**Coğrafyanın laboratuvarı arazidir.** Saha çalışmaları yer şekillerini yerinde incelemeyi, doğal zenginlikleri fark etmeyi ve korumayı sağlar.\n\n# Yer Şekilleri ve İnsan\n\n| Alan | Etkileşim |\n|---|---|\n| **Nüfus ve yerleşme** | Verimli ovalar ve nehir vadileri (Nil, Çukurova, Büyük Menderes) yoğun; dağlık alanlar seyrek nüfuslu |\n| **Ulaşım** | Düzlükte yol yapımı ucuz; dağlık alanda **tünel ve viyadük** (Landwasser Viyadüğü) gerekir |\n| **İnsanın yer şekillerini değiştirmesi** | Maden ocakları, barajlar, dolgu alanları (**Hollanda polderleri**) — **Antroposen** |\n| **Canlılar** | Karınca, köstebek gibi canlılar küçük ölçekte şekillendirir |",
     "ornekler": [
      {
       "soru": "Hollanda'nın polderleri insan–doğa etkileşimine nasıl bir örnektir?",
       "cozum": "Deniz seviyesinin altındaki alanlar **setlerle kurutulup** tarım ve yerleşmeye açılmıştır; insan yer şekillerini doğrudan değiştirmiştir."
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
    "code": "4.1",
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
    "code": "4.2",
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
      }
     ],
     "ozet": [
      "Fonksiyon: yerleşmeyi yaşatan faaliyetler.",
      "Şehirde çok, kırda az fonksiyon.",
      "Fonksiyonlar zamanla değişebilir."
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
    "code": "5.1",
    "title": {
     "tr": "Ekonomik sektörler",
     "en": "Economic sectors"
    },
    "content": {
     "anlatim": "# Beş Ekonomik Sektör\n\n| Sektör | Kapsam |\n|---|---|\n| **Birincil** | Doğadan doğrudan üretim: tarım, hayvancılık, balıkçılık, ormancılık, madencilik |\n| **İkincil** | Ham maddenin işlenmesi: sanayi, inşaat, enerji üretimi |\n| **Üçüncül** | Hizmet: ticaret, eğitim, sağlık, ulaşım, turizm, finans, iletişim |\n| **Dördüncül** | Bilgi ve enformasyon: **AR-GE**, yazılım, tasarım, CBS uzmanlığı |\n| **Beşincil** | Üst düzey **karar verme**: yöneticiler, stratejik planlamacılar, hükümet yetkilileri |",
     "ornekler": [
      {
       "soru": "Bir yazılım şirketinde yapay zekâ geliştiren mühendis hangi sektörde çalışır?",
       "cozum": "**Dördüncül sektör** (bilgi, AR-GE, yazılım)."
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
    "code": "5.2",
    "title": {
     "tr": "Ekonomik sektörler ve gelişmişlik düzeyi",
     "en": "Economic sectors and level of development"
    },
    "content": {
     "anlatim": "# Sektörler ve Gelişmişlik\n\nÇalışan nüfusun sektörlere dağılımı ile gelişmişlik arasında **doğrudan ilişki** vardır. GSYİH ve istihdam oranları analizin temelidir.\n\n| | Gelişmiş ülkeler (Kanada, Almanya, İtalya) | Az gelişmiş ülkeler (Çad, Zambiya, Mozambik) |\n|---|---|---|\n| **Tarımda çalışan** | Çok düşük (%1–3) | Çok yüksek (%50–70+) |\n| **Sanayi ve hizmet** | Yüksek | Zayıf |\n| **Kişi başı gelir** | Yüksek | Düşük |\n| **Enerji tüketimi, okuryazarlık, yaşam süresi** | Yüksek | Düşük |\n| **Dış ticaret** | Katma değeri yüksek sanayi ve teknoloji ürünleri | Ham madde satar, işlenmiş ürün alır |",
     "ornekler": [
      {
       "soru": "Bir ülkede çalışanların %65'i tarımda ise bu ülkenin gelişmişlik düzeyi hakkında ne söylenebilir?",
       "cozum": "Büyük olasılıkla **az gelişmiş** bir ülkedir: sanayi ve hizmet zayıf, kişi başı gelir düşük, ham madde ihracatına bağımlıdır."
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
    "code": "5.3",
    "title": {
     "tr": "Türkiye ekonomisinin sektörel dağılımı",
     "en": "Sectoral distribution of Türkiye's economy"
    },
    "content": {
     "anlatim": "# Türkiye'de Ekonomik Dönüşüm\n\n- **İzmir İktisat Kongresi (1923)** ile temeller atıldı; sonra **devletçilik** dönemi ve **1980 sonrası ihracata dayalı** büyüme modeli.\n- Cumhuriyet'in ilk yıllarında nüfusun büyük kısmı **tarımda** çalışıyordu; sanayileşme ve şehirleşmeyle tarımın payı azaldı, **hizmet ve sanayi** arttı.\n\n| Yıl | Tarım | Sanayi | Hizmet |\n|---|---|---|---|\n| **1990** | %46,8 | %20,3 | %32,9 |\n| **2018** | %18,4 | %26,7 | %54,9 |\n| **Günümüz** | ≈ %15 | ≈ %27 | ≈ %57 |\n\n*(İstihdamın sektörlere dağılımı; günümüz değerleri yaklaşıktır.)*\n\n> Türkiye **tarım toplumundan sanayi ve hizmet ağırlıklı** bir ekonomiye dönüşmüştür.",
     "ornekler": [
      {
       "soru": "1990'dan günümüze Türkiye'de istihdamın sektörel dağılımı nasıl değişmiştir?",
       "cozum": "Tarımın payı yaklaşık %47'den %15'e **düşmüş**; hizmetin payı %33'ten %57'ye **yükselmiş**, sanayi de artmıştır."
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
    "code": "6.1",
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
      }
     ],
     "ozet": [
      "Dirençli şehir: sağlamlık, uyum, yedeklilik, kapsayıcılık.",
      "Risk azaltma: erken uyarı, zemin etüdü, kentsel dönüşüm.",
      "Eşya sabitleme yapısal olmayan önlemdir."
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
    "code": "7.1",
    "title": {
     "tr": "Türk kültürünün mekânsal özellikleri",
     "en": "Spatial characteristics of Turkish culture"
    },
    "content": {
     "anlatim": "# Kültür Ocağı: Türkistan\n\nTürk kültürünün doğduğu ve yayıldığı **Orta Asya**; **Altay Dağları, Ural, Hazar ve Sibirya** arasındaki bozkır coğrafyası.\n\n# Göçler ve Yayılım\n\n**Kuraklık, nüfus artışı** ve siyasi nedenlerle Kafkasya, Karadeniz'in kuzeyi, Balkanlar ve **Anadolu**'ya kitlesel göçler (Kavimler Göçü vb.).\n\n# Konargöçer ve Türk-İslam Kültürü\n\n| İslamiyet öncesi | İslamiyet sonrası |\n|---|---|\n| **Gök Tanrı** inancı, **kurgan** ve **balbal**, **yaylak–kışlak** geleneği | **Medrese, külliye, ahilik** teşkilatı ile zenginleşme |\n\n# Ortak Miras\n\n**Orhun Yazıtları**, **Dede Korkut**, **Nevruz**, ortak Türkçe ve **Türk Devletleri Teşkilatı (TDT)** kültürel birliği güçlendirir.",
     "ornekler": [
      {
       "soru": "Yaylak–kışlak geleneği hangi coğrafi koşulun sonucudur?",
       "cozum": "Bozkırın **iklim ve otlak** koşulları: yazın serin yaylalara, kışın daha ılık ovalara hayvanlarla göç edilir (konargöçer yaşam)."
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
