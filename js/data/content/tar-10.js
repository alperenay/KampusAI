/* =========================================================
   10. Sınıf Tarih — kapsamlı ders notları ve kazanım analizi
   Kaynak: kullanıcının verdiği "10. Sınıf Tarih Kapsamlı Ders Notları ve Kazanım Analizi" (3 ünite, 1040–1683).
   Kaynaktaki bazı bilgiler düzeltildi (Büyük Selçuklu ilk merkezi Nişabur, Büyük Divan). Tablolar ve örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/tarih"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Türkistan'dan Türkiye'ye (1040–1299)",
   "en": "Unit 1: From Turkestan to Türkiye (1040–1299)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Göçler, Dandanakan, Pasinler ve Malazgirt",
     "en": "Migrations, Dandanakan, Pasinler and Manzikert"
    },
    "content": {
     "anlatim": "# Anadolu'ya Yönelik Türk Akınları\n\nMÖ VIII. yüzyılda **İskitler**le başlayan akınlar Hunlar ve Sibir Türkleriyle sürdü. XI. yüzyılda nüfusu artan **Oğuzlar (Türkmenler)**, Karahanlı ve Gazneli baskısı ve **otlak yetersizliği** nedeniyle batıya göç etti.\n\n- Türk kaynaklarında Anadolu için **\"Diyar-ı Rum\"** denildi.\n- 1148'de II. Haçlı Seferi sırasında Batılı kaynaklar bölge için ilk kez **\"Turchia\" (Türkiye)** adını kullandı.\n\n# Dandanakan Savaşı (1040)\n\nTuğrul ve Çağrı Beyler ile **Gazneliler** arasında. Gazneliler yenildi → **Büyük Selçuklu Devleti** resmen kuruldu; Tuğrul Bey sultan ilan edildi (Nişabur). Selçuklular İslam dünyasının askerî koruyuculuğunu üstlendi.\n\n# Pasinler Savaşı (1048)\n\nSelçuklular ile **Bizans**, Gürcü, Ermeni, Abaza kuvvetleri arasındaki **ilk Selçuklu–Bizans savaşı**. Bizans'la ilk barış yapıldı; İstanbul'daki cami onarılıp hutbe okutuldu.\n\n# Malazgirt Meydan Muharebesi (26 Ağustos 1071)\n\n| | |\n|---|---|\n| **Taraflar** | Sultan **Alp Arslan** – İmparator **Romen Diyojen** |\n| **Sebep** | Bizans'ın Türk akınlarını durdurup Türkleri Anadolu'dan atmak istemesi |\n| **Zafer etkenleri** | Alp Arslan'ın Cuma hutbesindeki moral hitabı, **Turan taktiği** (hilal/bozkır kapanı), Bizans ordusundaki **Peçenek ve Uz** Türklerinin Selçuklu safına geçmesi |\n| **Sonuç** | **Anadolu'nun kapıları Türklere açıldı**; Avrupa Haçlı Seferleri hazırlığına başladı |\n\n> Alp Arslan esir düşen Romen Diyojen'e **konuk hükümdar** gibi davrandı ve antlaşma imzaladı.",
     "ornekler": [
      {
       "soru": "Malazgirt Savaşı'nda Bizans ordusundaki paralı Türk askerlerinin taraf değiştirmesi neyi gösterir?",
       "cozum": "Soy birliği ve ortak kültür bağının etkisini; Bizans ordusunun yapısının **paralı ve çok uluslu** olmasının bir zayıflık yarattığını."
      }
     ],
     "ozet": [
      "Dandanakan 1040 → Büyük Selçuklu kuruldu.",
      "Pasinler 1048: ilk Selçuklu–Bizans savaşı.",
      "Malazgirt 1071: Anadolu'nun kapıları açıldı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Miryokefalon, ilk Türk beylikleri, Haçlılar ve Kösedağ",
     "en": "Myriokephalon, first Turkish principalities, Crusades and Kösedağ"
    },
    "content": {
     "anlatim": "# İlk Türk Beylikleri\n\nMalazgirt'ten sonra Alp Arslan'ın komutanlarına **\"kılıç hakkı\"** olarak verdiği bölgelerde kuruldu; Anadolu'nun Türkleşmesini hızlandırdı.\n\n| Beylik | Merkez | Eser / not |\n|---|---|---|\n| **Saltuklular** | Erzurum | **İlk Türk beyliği**; Mama Hatun Külliyesi |\n| **Danişmentliler** | Sivas, Tokat | En güçlü beylik; Yağıbasan Medresesi |\n| **Mengücekliler** | Erzincan, Divriği | **Divriği Ulu Camii ve Darüşşifası** |\n| **Artuklular** | Mardin, Hasankeyf | **Malabadi Köprüsü** |\n| **Çaka Beyliği** | İzmir | **İlk Türk donanması** (Çaka Bey) |\n\n# Haçlı Seferleri\n\nPapa'nın kışkırtması ve Doğu'nun zenginlikleri. **I. Haçlı Seferi** sonucunda Türkiye Selçukluları **İznik**'i kaybetti, **Konya** başkent oldu; Urfa, Antakya, Kudüs, Trablus'ta Haçlı devletleri kuruldu. **Selahaddin Eyyubi** 1187'de **Hittin**'de Kudüs'ü geri aldı.\n\n# Miryokefalon Zaferi (1176)\n\n**II. Kılıçarslan** – Bizans İmparatoru **Manuel Komnenos**. Bizans ordusu pusuya düşürüldü.\n- Bizans'ın Türkleri Anadolu'dan atma umudu **tamamen sona erdi**.\n- Malazgirt'le açılan vatan Miryokefalon'la **tescil edildi** (Anadolu'nun \"tapusu\").\n\n# Kösedağ Savaşı (1243)\n\n**Babaîler İsyanı**yla zayıflayan Türkiye Selçukluları **Moğollar**a (Baycu Noyan) yenildi → Anadolu **Moğol hâkimiyetine** girdi, siyasi birlik bozuldu, **II. Beylikler Dönemi** başladı.",
     "ornekler": [
      {
       "soru": "Malazgirt ile Miryokefalon savaşlarının sonuçlarını karşılaştırın.",
       "cozum": "**Malazgirt** Anadolu'nun kapısını açtı; **Miryokefalon** Bizans'ın Türkleri çıkarma umudunu bitirip Anadolu'nun kalıcı Türk yurdu olduğunu kesinleştirdi."
      }
     ],
     "ozet": [
      "Saltuklu ilk beylik; Çaka ilk donanma.",
      "Miryokefalon 1176: Anadolu'nun tapusu.",
      "Kösedağ 1243: Moğol hâkimiyeti, II. Beylikler Dönemi."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Türk devlet ve ordu teşkilatında değişim",
     "en": "Change in Turkish state and army organization"
    },
    "content": {
     "anlatim": "# Gelenek + İslam + İran Sentezi\n\nİslamiyet öncesi Türk devlet gelenekleri (kut, kurultay, onlu sistem), Karahanlı, Gazneli ve Selçuklularda **İslami ve İran bürokrasi** gelenekleriyle birleşti.\n\n| Önce | Sonra |\n|---|---|\n| **Kut** (yönetme yetkisi Tanrı'dan) | **Zillullah fi'l-arz** (Allah'ın yeryüzündeki gölgesi) |\n| **Cihan hâkimiyeti** | **İ'lâ-yı kelimetullah** ile birleşerek **nizam-ı âlem** ideali |\n| **Kurultay** | **Divan-ı Saltanat (Büyük Divan)**; başkanı **vezir** |\n\n# Taşra ve Ordu\n\n- Eyaletler **melik** (şehzade) ya da **şıhne** (vali) tarafından yönetildi; meliklerin eğitimi için **atabey** verildi.\n- **Ordu:**\n  - **Gulâmân-ı saray / hassa askerleri**: sarayda yetiştirilen, sultana bağlı askerler\n  - **İkta askerleri**: ikta gelirleriyle beslenen, en kalabalık kısım\n  - Bağlı devlet ve beylik askerleri, Türkmenler",
     "ornekler": [
      {
       "soru": "Kurultayın yerini Büyük Divan'ın alması neyi gösterir?",
       "cozum": "Türk devlet geleneğinin **İslam ve İran bürokrasisiyle** birleşerek daha merkezî ve kurumsal bir yönetime dönüştüğünü."
      }
     ],
     "ozet": [
      "Kut → zillullah fi'l-arz.",
      "Kurultay → Büyük Divan.",
      "Ordu: gulâm (hassa) + ikta askerleri."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Selçuklularda sosyal ve ekonomik hayat",
     "en": "Social and economic life of the Seljuks"
    },
    "content": {
     "anlatim": "# Toplum\n\n**Yönetenler (askerî)** ve **yönetilenler (reaya)**. Toplumun temeli **aile**; kadınlar ticaret, binicilik gibi sosyal ve ekonomik hayatta etkindi.\n\n# Toprak Sistemi\n\n| Arazi | Geliri |\n|---|---|\n| **Has** | Hükümdar ve hazineye |\n| **İkta** | Asker ve memurlara hizmet karşılığı; sahibi devlet adına vergi toplar, **cebelü** (atlı asker) besler |\n| **Vakıf** | Cami, medrese, darüşşifa gibi hayır kurumlarına |\n| **Mülk** | Kişilerin tam mülkiyetindeki topraklar |\n\n> **İkta sistemi**: hazineye yük olmadan büyük ordu beslenir, üretim sürer, vergi toplanır.\n\n# Ahilik ve Ticaret\n\n- **Ahi Evran** öncülüğünde esnaf ve zanaatkârları örgütledi; **meslek eğitimi**, mal kalitesi ve **esnaf ahlakı** denetimi.\n- Ticaret yollarına **kervansaraylar (ribatlar)** yapıldı; tüccar malları devlet güvencesine alındı (ilk **sigorta** uygulaması).",
     "ornekler": [
      {
       "soru": "İkta sisteminin devlete üç faydasını yazın.",
       "cozum": "1) Hazineden para çıkmadan **asker beslenir**, 2) **Vergiler toplanır**, 3) Toprak **boş kalmaz**, üretim sürer."
      }
     ],
     "ozet": [
      "Has, ikta, vakıf, mülk.",
      "İkta: hizmet karşılığı gelir, asker besleme.",
      "Ahilik: esnaf örgütü; kervansaraylar ticareti güvenceye aldı."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "Türk-İslam medeniyetinde bilim, eğitim ve sanat",
     "en": "Science, education and art in Turkish-Islamic civilization"
    },
    "content": {
     "anlatim": "# Kurumlar\n\n**Küttap (sıbyan mektebi)** · **medrese** (Nizamiye Medreseleri — Nizamülmülk) · **darüşşifa** (hastane) · **darülkütüp** (kütüphane) · **tekke**\n\n# Bilim İnsanları ve Mutasavvıflar\n\n| Kişi | Katkısı |\n|---|---|\n| **Kâşgarlı Mahmud** | İlk Türk sözlüğü **Divânü Lugâti't-Türk**; ilk Türk dünya haritası |\n| **Ömer Hayyam** | Cebir, geometri; **Celâlî Takvimi** |\n| **Cezerî** | Mekanik, otomatlar; **sibernetiğin öncüsü** (*Kitâbü'l-Hiyel*) |\n| **Hoca Ahmed Yesevî** | Türk tasavvufunun piri; **Divân-ı Hikmet** |\n| **Mevlana, Hacı Bektaş Veli, Yunus Emre** | Sevgi, hoşgörü, irfan |\n\n# Mimari ve Sanat\n\nTaş işçiliği, **çini**, **minyatür**. Anıt mezar niteliğindeki **kümbetler** İslam mimarisinde ilk kez Türklerce yapıldı.",
     "ornekler": [
      {
       "soru": "Cezerî neden sibernetiğin öncüsü sayılır?",
       "cozum": "Kendi kendini kontrol eden **otomatik makineler** (su saatleri, robot benzeri düzenekler) tasarlamış ve *Kitâbü'l-Hiyel*'de anlatmıştır."
      }
     ],
     "ozet": [
      "Kâşgarlı: Divânü Lugâti't-Türk.",
      "Ömer Hayyam: Celâlî Takvimi; Cezerî: otomatlar.",
      "Kümbet: Türklerin anıt mezarı."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Beylikten Devlete Osmanlı (1299–1453)",
   "en": "Unit 2: The Ottomans from Principality to State (1299–1453)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Osmanlı Devleti'nin kuruluşuna dair görüşler",
     "en": "Views on the founding of the Ottoman State"
    },
    "content": {
     "anlatim": "# Kuruluş Tezleri\n\nKaynakların azlığı nedeniyle tarihçiler farklı görüşler ileri sürmüştür.\n\n| Tarihçi | Görüş |\n|---|---|\n| **H. A. Gibbons** | Osmanlıları **yeni bir ırk** (Türk–Bizans karışımı) olarak gördü; menkıbelere dayandı |\n| **M. Fuat Köprülü** | Kuruluşu genel **Türk tarihi** ve **Türkiye Selçuklu** devamı olarak açıkladı |\n| **Paul Wittek** | **Gaza tezi**: kuruluşun temel unsuru gazi geleneği ve gazi cemaatleri |\n| **Halil İnalcık** | Batı Anadolu uç beyliklerinin siyasi-askerî koşulları; **1302 Bafeus (Koyunhisar)** Savaşı'nı kuruluş miladı saydı |\n\n> Kuruluş tarihi genel kabulde **1299** (Karacahisar'da hutbe) ya da **1302** (Koyunhisar zaferi).",
     "ornekler": [
      {
       "soru": "Gibbons'un tezi neden eleştirilmiştir?",
       "cozum": "Osmanlı'yı Türk tarihinden kopuk \"yeni bir ırk\" olarak gösterdiği ve **belgelere değil menkıbelere** dayandığı için; Köprülü bu teze karşı çıkmıştır."
      }
     ],
     "ozet": [
      "Gibbons: yeni ırk; Köprülü: Türk tarihinin devamı.",
      "Wittek: gaza tezi; İnalcık: Koyunhisar 1302.",
      "1299 ya da 1302 kuruluş kabulü."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Beylikten devlete siyasi ve askerî gelişmeler",
     "en": "Political and military developments from principality to state"
    },
    "content": {
     "anlatim": "# Uç Beyliğinden Devlete\n\n**Söğüt ve Domaniç**'te Bizans sınırında bir **uç beyliği** olarak kuruldu; gaza faaliyetleriyle hızla büyüdü.\n\n| Tarih | Olay | Önemi |\n|---|---|---|\n| **1302** | **Koyunhisar (Bafeus)** | Bizans'la **ilk meydan savaşı** |\n| **1326** | **Bursa'nın fethi** (Orhan Bey) | Başkent oldu |\n| **1345** | **Karesioğulları**nın katılması | Osmanlı'ya katılan **ilk beylik**; donanma gücü → Rumeli'ye geçiş kolaylaştı |\n| **1352** | **Çimpe Kalesi** | Rumeli'de ilk üs; Balkan fetihlerinin kapısı |\n| **1363** | **Edirne'nin fethi** (I. Murad) | Başkent oldu; Balkanlarda ilerleme hızlandı |\n| **1389** | **I. Kosova** | Balkanlarda kalıcılık |\n| **1402** | **Ankara Savaşı** (Timur'a yenilgi) | **Fetret Devri** (1402–1413) |",
     "ornekler": [
      {
       "soru": "Karesioğulları Beyliği'nin Osmanlı'ya katılması neden önemlidir?",
       "cozum": "Osmanlı **denizcilik** gücü ve deneyimli komutanlar kazanmış, **Rumeli'ye geçiş** kolaylaşmıştır; Osmanlı'ya katılan ilk beyliktir."
      }
     ],
     "ozet": [
      "Koyunhisar 1302: ilk savaş.",
      "Bursa 1326, Edirne 1363 başkent.",
      "Ankara 1402 → Fetret Devri."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "İstanbul'un Fethi (1453)",
     "en": "The Conquest of Istanbul (1453)"
    },
    "content": {
     "anlatim": "# Fethin Sebepleri\n\nII. Mehmed, Bizans'ın Osmanlı topraklarını **ikiye bölmesini** (Anadolu–Rumeli), **şehzadeleri kışkırtmasını** ve **Haçlıları örgütlemesini** önlemek için fethi zorunlu gördü.\n\n# Hazırlıklar\n\n- Anadolu Hisarı'nın karşısına **Rumeli Hisarı (Boğazkesen)** yapıldı.\n- **Şahi** adı verilen büyük toplar döktürüldü.\n- Gemiler **karadan yürütülerek Haliç'e** indirildi.\n- **29 Mayıs 1453**'te surlar aşıldı; II. Mehmed **\"Fatih\"** unvanını aldı.\n\n# Sonuçlar\n\n- **Bizans yıkıldı**; **Orta Çağ kapandı, Yeni Çağ başladı**.\n- **İstanbul başkent** oldu; Anadolu ile Rumeli toprak bütünlüğü sağlandı.\n- Karadeniz ticaret yolu Osmanlı kontrolüne girdi.\n- Bilim insanlarının İtalya'ya göçü **Rönesans**'a katkı yaptı; topun surları yıkması **feodalitenin** zayıflamasını hızlandırdı.",
     "ornekler": [
      {
       "soru": "İstanbul'un fethi neden bir çağ kapatıp çağ açan olay sayılır?",
       "cozum": "Bin yıllık **Doğu Roma** yıkılmış, **ateşli silahların** surları aşması feodal kale düzenini sarsmış, göç eden bilginler Rönesans'ı beslemiştir."
      }
     ],
     "ozet": [
      "Rumeli Hisarı, şahi toplar, gemilerin karadan yürütülmesi.",
      "29 Mayıs 1453.",
      "Orta Çağ kapandı, Yeni Çağ başladı."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Osmanlı'da ordu, hukuk ve toprak sistemi",
     "en": "Army, law and land system of the Ottomans"
    },
    "content": {
     "anlatim": "# Ordu\n\n| Birlik | Açıklama |\n|---|---|\n| **Yaya ve müsellemler** | Orhan Bey dönemi **ilk düzenli birlikler** |\n| **Kapıkulu ocakları** | **Devşirme** sistemiyle yetiştirilen, doğrudan padişaha bağlı **daimî ordu** (yeniçeriler) |\n| **Tımarlı sipahiler** | Tımar geliriyle beslenen, hazineye yük olmayan **en kalabalık süvari** ordusu |\n| **Donanma** | Karesi ile başlayan deniz gücü |\n\n**Devşirme:** Hristiyan ailelerin çocuklarının Türk-İslam terbiyesiyle yetiştirilmesi.\n\n# Toprak\n\nToprağın büyük bölümü **mirî arazi** (devlet malı). **Tımar sistemi** ile vergi toplanır, üretim sürer ve asker yetişir.\n\n# Hukuk\n\n**Şer'î hukuk** (İslam hukuku) ve **örfî hukuk** (padişahın koyduğu kanunlar, kanunnameler). **Kadılar** adlî ve idarî işleri yürütür.",
     "ornekler": [
      {
       "soru": "Tımar sistemi ile Selçuklu ikta sistemi arasında nasıl bir ilişki vardır?",
       "cozum": "Tımar, **ikta sisteminin devamıdır**: devlet toprağının vergi geliri hizmet karşılığı verilir, karşılığında asker (cebelü) beslenir."
      }
     ],
     "ozet": [
      "Yaya-müsellem ilk düzenli ordu.",
      "Devşirme → kapıkulu; tımar → sipahi.",
      "Şer'î ve örfî hukuk; kadı."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.5",
    "title": {
     "tr": "İskân ve istimalet politikaları",
     "en": "Settlement and istimalet policies"
    },
    "content": {
     "anlatim": "# İskân (Yerleştirme)\n\nAnadolu'dan getirilen **konargöçer Türkmenlerin (Yörükler)** Rumeli'deki boş ve stratejik topraklara yerleştirilmesi.\n**Amaçlar:** bölgeyi Türkleştirmek ve İslamlaştırmak, **tarımsal üretimi** artırmak, askerî yolların **güvenliğini** sağlamak.\n\n# İstimalet (Gönül Alma)\n\nFethedilen bölgelerdeki gayrimüslimlere **din, dil, mezhep ve mülkiyet özgürlüğü** tanınması, adil davranılması. Feodal beylerin baskısından bunalan yerli halk Osmanlı yönetimini benimsedi → **kalıcılık**.\n\n> **Vakıflar** ve **kolonizatör Türk dervişleri** (Ahiler, abdallar) bu politikaların başarısında kilit rol oynadı.",
     "ornekler": [
      {
       "soru": "İstimalet politikası Balkanlarda Osmanlı'nın kalıcılığını nasıl sağladı?",
       "cozum": "Halk feodal baskıdan kurtulup **dinine ve malına dokunulmayan** adil bir yönetimle karşılaştığı için isyan yerine Osmanlı'yı benimsedi."
      }
     ],
     "ozet": [
      "İskân: Yörüklerin Rumeli'ye yerleştirilmesi.",
      "İstimalet: hoşgörü ve gönül alma.",
      "Dervişler ve vakıflar kilit rol oynadı."
     ]
    }
   },
   {
    "id": "k6",
    "code": "2.6",
    "title": {
     "tr": "Osmanlı'nın ilim ve irfan geleneği",
     "en": "Ottoman tradition of learning and spirituality"
    },
    "content": {
     "anlatim": "# Şehir ve Külliye\n\nBursa, Edirne, İstanbul gibi şehirler **cami, medrese, imaret, çarşı**dan oluşan **külliyeler** etrafında şekillendi; ilim hayatının temeli **külliye ve vakıflar**dı.\n\n| Kurum | İşlevi |\n|---|---|\n| **Sıbyan mektebi** | İlk kademe: okuma-yazma, temel din eğitimi |\n| **Medrese** | Yükseköğretim: **İznik Medresesi** (ilk), **Sahn-ı Seman** (Fatih), **Süleymaniye** |\n| **Tekke ve zaviye** | Tasavvufi eğitim ve toplumsal dayanışma |\n\n# Önemli Şahsiyetler\n\n**Şeyh Edebali** (manevi kurucu, Ahi), **Davud-i Kayserî** (ilk başmüderris), **Dursun Fakih**, **Emir Sultan**, **Hacı Bayram Veli**.",
     "ornekler": [
      {
       "soru": "Osmanlı'nın ilk medresesi nerede, kim tarafından açılmıştır? İlk müderrisi kimdir?",
       "cozum": "**İznik**'te **Orhan Bey** döneminde (1331); ilk başmüderrisi **Davud-i Kayserî**dir."
      }
     ],
     "ozet": [
      "Külliye: cami + medrese + imaret + çarşı.",
      "İznik ilk medrese; Sahn-ı Seman Fatih'in.",
      "Şeyh Edebali, Davud-i Kayserî, Hacı Bayram Veli."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Cihan Devleti Osmanlı (1453–1683)",
   "en": "Unit 3: The Ottoman World Empire (1453–1683)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Cihan devletine giden seferler",
     "en": "Campaigns toward a world empire"
    },
    "content": {
     "anlatim": "# Cihan Devleti\n\nİstanbul'un fethinden sonra Osmanlı **üç kıtaya** yayıldı; Doğu ve Batı'ya büyük seferler yapıldı.\n\n| Tarih | Olay | Sonuç |\n|---|---|---|\n| **1475** | **Kırım'ın fethi** | Karadeniz Türk gölü oldu |\n| **1514** | **Çaldıran** (Yavuz – Safeviler) | Şiilik propagandası durduruldu, Doğu Anadolu güvene alındı |\n| **1516–1517** | **Mercidabık ve Ridaniye** (Memlükler) | Memlük Devleti yıkıldı; **halifelik** Osmanlı'ya geçti; Baharat Yolu'nun önemli kısmı kontrol altına alındı |\n| **1526** | **Mohaç** (Kanuni – Macarlar) | Macaristan Osmanlı'ya bağlandı |\n| **1529** | **I. Viyana Kuşatması** | — |\n| **1538** | **Preveze** (Barbaros – Haçlı donanması) | **Akdeniz'de Türk üstünlüğü** |",
     "ornekler": [
      {
       "soru": "Mısır Seferi'nin dinî ve ekonomik sonuçları nelerdir?",
       "cozum": "Dinî: **halifelik** Osmanlı'ya geçti, kutsal yerler Osmanlı'nın oldu. Ekonomik: **Baharat Yolu** ve Mısır'ın zengin gelirleri kontrol altına alındı."
      }
     ],
     "ozet": [
      "Çaldıran 1514, Mısır 1517 (halifelik).",
      "Mohaç 1526 Macaristan.",
      "Preveze 1538: Akdeniz'de üstünlük."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Denizcilik, Hint seferleri, Kıbrıs ve doğu sınırı",
     "en": "Seafaring, Indian Ocean campaigns, Cyprus and the eastern border"
    },
    "content": {
     "anlatim": "# Hint Deniz Seferleri\n\n**Portekizlilerin Ümit Burnu**'nu bularak Baharat Yolu'nu ele geçirmesi ve Müslüman tüccarları engellemesi üzerine, Kanuni döneminde **dört Hint Deniz Seferi** yapıldı: **Hadım Süleyman Paşa, Piri Reis, Murat Reis, Seydi Ali Reis**.\n- Askerî açıdan kesin sonuç alınamadı; ama Baharat Yolu canlandı, **Yemen ve Habeşistan** alındı.\n\n# Kıbrıs'ın Fethi (1571)\n\nDoğu Akdeniz'de Türk gemilerine saldıran korsanların üssü olan Kıbrıs, **II. Selim** döneminde **Lala Mustafa Paşa** tarafından fethedildi.\n- Ardından Papa öncülüğündeki Haçlı donanması **İnebahtı'da (1571)** Osmanlı donanmasını yaktı; ancak kısa sürede **yeni donanma** yapıldı.\n\n# Doğu Sınırı\n\nSafevilerle mücadeleler sonunda **1639 Kasr-ı Şirin Antlaşması** → bugünkü **Türkiye–İran sınırının** temeli.",
     "ornekler": [
      {
       "soru": "Kasr-ı Şirin Antlaşması bugün için neden önemlidir?",
       "cozum": "Osmanlı–İran (Safevi) sınırını büyük ölçüde belirlemiş; **günümüz Türkiye–İran sınırı** bu antlaşmaya dayanır."
      }
     ],
     "ozet": [
      "Hint seferleri: Portekiz'e karşı, dört sefer.",
      "Kıbrıs 1571; İnebahtı yenilgisi.",
      "Kasr-ı Şirin 1639: Türkiye–İran sınırı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Yönetim ve ordu yapısında değişim",
     "en": "Change in administration and the army"
    },
    "content": {
     "anlatim": "# Değişimin Nedenleri\n\nİmparatorluğun büyümesi, nüfus artışı, mali krizler ve Avrupa'daki **askerî teknoloji** gelişmeleri.\n\n# Yönetimde\n\n- **Fatih Kanunnamesi**: kardeş katli yasallaştı, güç merkezde toplandı.\n- **Şehzadelerin sancağa çıkması** kaldırıldı → **kafes usulü** (sarayda gözetim).\n- **Ekber ve erşed** sistemi: tahta hanedanın **en yaşlı ve olgun** üyesi geçer (I. Ahmed).\n- Padişahlar divana katılmayıp kafes arkasından izlemeye başladı → **sadrazamların** yetkisi arttı; **valide sultanlar** saray siyasetinde etkili oldu.\n\n# Orduda\n\nAteşli silahların (tüfek, top) önemi artınca **yeniçeri** sayısı çoğaltıldı; **tımarlı sipahinin** sayısı ve önemi azaldı. Hazine yükü arttı.",
     "ornekler": [
      {
       "soru": "Ateşli silahların yaygınlaşması tımar sistemini nasıl etkiledi?",
       "cozum": "Savaşlarda tüfekli piyade önem kazandı; maaşlı **yeniçeri** sayısı arttı, **tımarlı sipahi** önem kaybetti. Bu, hazineye yük bindirdi ve tımar düzeninin bozulmasına katkı yaptı."
      }
     ],
     "ozet": [
      "Kafes usulü ve ekber-erşed.",
      "Sadrazam ve valide sultanların gücü arttı.",
      "Yeniçeri ↑, tımarlı sipahi ↓."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Coğrafi keşifler, sömürgecilik, Rönesans ve Reform",
     "en": "Geographical discoveries, colonialism, Renaissance and Reformation"
    },
    "content": {
     "anlatim": "# Coğrafi Keşifler\n\nOsmanlı'nın ticaret yollarını kontrol etmesi ve Avrupalıların **baharat ve altın** arayışı keşifleri tetikledi.\n- **Portekiz ve İspanya** öncülüğünde: **Vasco da Gama** (Hindistan), **Kolomb** (Amerika), **Macellan** (Dünya turu).\n- Amerika'da **İnka ve Aztek** uygarlıkları yıkıldı; altın ve gümüş Avrupa'ya taşındı.\n- **Atlantik köle ticareti**: Afrika'dan milyonlarca insan zorla Amerika'ya götürüldü — insanlık tarihinin en büyük trajedilerinden biri.\n\n# Rönesans\n\nBilim, sanat ve felsefede **yeniden doğuş**; **matbaa** ile düşünceler hızla yayıldı.\n\n# Reform\n\nKatolik Kilisesi'ne karşı **Martin Luther** ile başladı → mezhep savaşları (**Otuz Yıl Savaşları**) → **Vestfalya Antlaşması (1648)** ile **ulus devletler** süreci başladı.\n\n| Osmanlı'ya etkisi |\n|---|\n| Baharat Yolu önemini kaybetti, gümrük gelirleri azaldı; Amerika'dan gelen gümüş **enflasyon**a yol açtı |",
     "ornekler": [
      {
       "soru": "Coğrafi keşifler Osmanlı ekonomisini nasıl etkiledi?",
       "cozum": "Ticaret Atlantik'e kaydı, **Baharat ve İpek yolları** önemini kaybetti, gümrük gelirleri düştü; Avrupa'ya akan değerli madenler Osmanlı'da **fiyat artışına** neden oldu."
      }
     ],
     "ozet": [
      "Keşifler: Kolomb, Vasco da Gama, Macellan.",
      "Sömürgecilik ve köle ticareti.",
      "Reform → Otuz Yıl Savaşları → Vestfalya 1648."
     ]
    }
   },
   {
    "id": "k5",
    "code": "3.5",
    "title": {
     "tr": "XVII. yüzyıl isyanları ve ıslahatlar",
     "en": "17th-century revolts and reforms"
    },
    "content": {
     "anlatim": "# İsyanların Nedenleri\n\nNüfus artışı, enflasyon, **tağşiş** (paranın değerinin düşürülmesi), uzun savaşlar, **tımar sisteminin bozulması**.\n\n| İsyan | Neden / sonuç |\n|---|---|\n| **İstanbul (yeniçeri) isyanları** | Cülus bahşişi, maaşın değeri düşük akçeyle ödenmesi; **Genç Osman'ın öldürülmesi**, Çınar Vakası |\n| **Celâlî isyanları** | Anadolu'da ekonomik sıkıntı, vergiler, işsiz **levent/sekbanlar** → **Büyük Kaçgun** (köylü göçü), tarımsal çöküş |\n| **Suhte (medrese öğrencisi) isyanları** | İşsiz kalan medrese öğrencileri |\n\n# Islahatlar\n\n- **Tarhuncu Ahmed Paşa**: ilk **denk bütçe**.\n- **Köprülüler Dönemi** (Köprülü Mehmed Paşa, Fazıl Ahmed Paşa): sert ama etkili önlemlerle mali düzen ve devlet otoritesi yeniden sağlandı.",
     "ornekler": [
      {
       "soru": "Büyük Kaçgun nedir ve ekonomiye etkisi ne olmuştur?",
       "cozum": "Celâlî isyanları sırasında köylülerin güvenlik kaygısıyla **topraklarını bırakıp kaçması**; tarımsal üretim düştü, vergi gelirleri azaldı."
      }
     ],
     "ozet": [
      "Tağşiş: paranın değerinin düşürülmesi.",
      "Celâlî → Büyük Kaçgun.",
      "Tarhuncu: denk bütçe; Köprülüler: otoriteyi yeniden kurdu."
     ]
    }
   },
   {
    "id": "k6",
    "code": "3.6",
    "title": {
     "tr": "Osmanlı'da bilim, kültür ve sanat",
     "en": "Science, culture and art in the Ottoman State"
    },
    "content": {
     "anlatim": "# Bilim İnsanları ve Sanatkârlar\n\n| Kişi | Alanı |\n|---|---|\n| **Akşemseddin**, **Sabuncuoğlu Şerefeddin** | Tıp, cerrahi (*Cerrahiyyetü'l-Haniyye*) |\n| **Ali Kuşçu** | Astronomi, matematik (Fatih dönemi) |\n| **Piri Reis** | Dünya haritası, **Kitab-ı Bahriye** |\n| **Mimar Sinan** | **Süleymaniye** (kalfalık değil ustalık), **Selimiye** (ustalık eseri) |\n| **Itrî** | Klasik Türk müziği; **Segâh Tekbir** |\n| **Kâtip Çelebi** | Tarih, coğrafya, bibliyografya (*Cihannüma*, *Keşfü'z-Zünûn*) |\n| **Evliya Çelebi** | **Seyahatname** |\n\n# Sanat\n\nÇini, **tezhip**, **hat**, **minyatür**, dokumacılık. Şehirler külliyeler etrafında gelişti; **vakıflar** ekonomik ve sosyal hayatın güvencesiydi.\n\n> Mimar Sinan eserlerini \"çıraklık: Şehzade, kalfalık: Süleymaniye, ustalık: Selimiye\" diye değerlendirmiştir.",
     "ornekler": [
      {
       "soru": "Mimar Sinan'ın \"ustalık eserim\" dediği yapı hangisidir?",
       "cozum": "Edirne'deki **Selimiye Camii**."
      }
     ],
     "ozet": [
      "Piri Reis: Kitab-ı Bahriye; Ali Kuşçu: astronomi.",
      "Sinan: Şehzade, Süleymaniye, Selimiye.",
      "Itrî: Segâh Tekbir; Evliya Çelebi: Seyahatname."
     ]
    }
   }
  ]
 }
];
