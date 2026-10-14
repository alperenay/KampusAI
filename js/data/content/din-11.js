/* =========================================================
   11. Sınıf Din Kültürü ve Ahlak Bilgisi — konu anlatım notları
   Kaynak: kullanıcının verdiği "11. Sınıf Din Kültürü ve Ahlak Bilgisi Analiz ve Notları" (5 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Düzeltmeler: Beytülhikme Abbasîler döneminde Bağdat'ta kuruldu (Şam Emevî başkentidir); Kitab-ı Mukaddes Ahd-i Atik ile Ahd-i Cedid'den (dört İncil, Resullerin İşleri, mektuplar, Vahiy) oluşur. Yahudilik bölümü kaynaktaki tek paragraftan genişletildi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/din"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Kader, İrade ve Sorumluluk",
   "en": "Unit 1: Destiny, Will and Responsibility"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Kader, kaza ve sünnetullah",
     "en": "Destiny, decree and the laws of God"
    },
    "content": {
     "anlatim": "# Anahtar Kavramlar\n\n| Kavram | Anlamı |\n|---|---|\n| **Kader** | Allah'ın evrendeki her şeyi sonsuz **ilmi** ve kudretiyle **planlaması, ölçüyle takdir etmesi** |\n| **Kaza** | Takdir edilen planın zamanı ve yeri geldiğinde **gerçekleşmesi** |\n| **Küllî irade** | Allah'ın sınırsız iradesi |\n| **Cüz'î irade** | İnsanın sınırlı seçme gücü; insan bu yüzden **sorumludur** |\n\nİnsan; akıl ve irade sahibi, seçimlerinden sorumlu, **en güzel biçimde yaratılmış** varlıktır (Tîn, 4).\n\n# Sünnetullah — Evrensel Yasalar\n\nAllah'ın evrende koyduğu **değişmez** yasalar. Kur'an: \"Allah'ın kanununda hiçbir değişiklik bulamazsın.\" (Fetih, 23)\n\n| Yasa | Örnek |\n|---|---|\n| **Fiziksel** | Yer çekimi, gece-gündüzün oluşumu, Güneş ve Ay'ın bir hesaba göre hareketi (Rahman, 5) |\n| **Biyolojik** | Canlıların doğması, büyümesi, beslenmesi, üremesi, ölmesi |\n| **Toplumsal** | Toplumların yükselişi-çöküşü; \"**Adalet mülkün temelidir**\"; zulmün yıkıma götürmesi |\n\n# Rızık, Ömür ve Ecel\n\n- **Rızık:** Allah'ın canlılara verdiği maddi-manevi nimetler. Veren **Rezzâk** olan Allah'tır; ancak insan **helal yoldan çalışmalı**, sonra tevekkül etmelidir. Hz. Muhammed: En hayırlı kazanç **el emeğiyle** kazanılandır.\n- **Ömür:** Doğumla ölüm arasındaki süre.\n- **Ecel:** Ömrün sona erdiği an. \"Ecelleri geldiğinde ne bir an geri kalabilirler ne de öne geçebilirler.\" (A'râf, 34)",
     "ornekler": [
      {
       "soru": "Kader ile kaza arasındaki fark nedir? Bir örnekle açıklayınız.",
       "cozum": "**Kader** planlama ve takdirdir; **kaza** bu takdirin zamanı gelince gerçekleşmesidir. Ör. bir mimarın binayı projelendirmesi kadere, binanın inşa edilmesi kazaya benzetilir."
      },
      {
       "soru": "Sünnetullahın değişmez olması insana ne kazandırır?",
       "cozum": "Yasaların sabit olması evreni **öngörülebilir** kılar; insan bu yasaları keşfederek **bilim** yapar ve davranışlarının sonuçlarını hesaba katarak **sorumluluk** alır."
      }
     ],
     "ozet": [
      "Kader takdir, kaza gerçekleşme.",
      "Sünnetullah: fiziksel, biyolojik, toplumsal yasalar.",
      "Rızık için çalışmak, sonra tevekkül."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Kaderle ilgili kavramlar ve yanlış kader anlayışları",
     "en": "Concepts related to destiny and misconceptions"
    },
    "content": {
     "anlatim": "# Kaderle Bağlantılı Kavramlar\n\n- **Sabır:** Zorluklar karşısında direnç göstermek, acele etmemek. \"Sizi biraz korku, açlık, mal, can ve ürün eksilmesiyle deneriz; sabredenleri müjdele.\" (Bakara, 155). Allah'ın ismi: **es-Sabûr**.\n- **Hidayet:** Allah'ın doğru yolu göstermesi. **Dalalet:** İnsanın kendi iradesiyle bu yoldan sapması. \"Biz ona yolu gösterdik; ister şükredici olsun ister nankör.\" (İnsan, 3)\n- **Hayır ve şer:** Allah'ın rızasına uygun ve faydalı olan **hayır**; yasaklanan ve zarar veren **şer**. Görünüşte şer olan zorluklar **imtihan** vesilesi olabilir.\n- **Dua:** Kulun aczini kabul edip Allah'tan yardım istemesi. \"De ki: Duanız olmasa Rabbim size ne diye değer versin?\" (Furkan, 77)\n- **Tevekkül:** Üzerine düşeni yapıp **tedbiri aldıktan sonra** sonucu Allah'a bırakmak. Hadis: \"**Deveni bağla, sonra tevekkül et.**\"\n- **Rıza, imtihan, teslimiyet:** Başa gelene isyan etmeden razı olmak; hayatı imtihan bilinciyle karşılamak.\n\n# Yanlış Kader Anlayışları\n\n- Kaderin insanı **mecbur** kıldığını, iradenin olmadığını sanmak.\n- **Emek harcamadan** kazanç beklemek: \"Kaderimde varsa olur.\"\n- Başarısızlık ve hataları kadere yükleyip **sorumluluktan kaçmak**.\n\nKur'an: \"Başınıza gelen her musibet **kendi ellerinizle yaptıklarınız** yüzündendir; Allah çoğunu affeder.\" (Şûrâ, 30)",
     "ornekler": [
      {
       "soru": "Sınava hiç çalışmayan bir öğrencinin 'Kaderimde varsa geçerim' demesi neden yanlış bir kader anlayışıdır?",
       "cozum": "İnsan **cüz'î iradesiyle** çalışıp çalışmamayı seçer ve bundan sorumludur. Tevekkül **tedbirden sonra** gelir ('Deveni bağla, sonra tevekkül et'). Çalışmadan sonucu kadere bağlamak sorumluluktan kaçmaktır."
      }
     ],
     "ozet": [
      "Tevekkül: tedbirden sonra sonucu Allah'a bırakmak.",
      "Hidayet Allah'tan; dalalet insanın tercihi.",
      "Yanlış anlayış: emeksiz kazanç, sorumluluktan kaçış."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Akıl, irade ve sorumluluk; Bakara 284–286",
     "en": "Reason, will and responsibility; Baqarah 284–286"
    },
    "content": {
     "anlatim": "# Sorumluluk Sahibi Varlık Olarak İnsan\n\n- **Temyiz:** Söz ve davranışların sonuçlarını ayırt edebilme gücü.\n- **Tefrik:** Kavramlar arasındaki farkı ayırt edebilme yeteneği.\n- **Özgürlük:** Dış baskılardan bağımsız karar verebilmek; ancak **ahlaki ve toplumsal sınırları** vardır.\n- **Mükellef:** Dinî hükümlerle yükümlü kişi. Şartları: **akıllı olmak** ve **ergenlik çağına (bulûğ) ulaşmak**.\n\n# Bakara Suresi 284–286 (Âmenerrasûlü)\n\n285. ayet **inanç esaslarını** özetler: Allah'a, meleklere, kitaplara ve peygamberlere iman; \"İşittik ve itaat ettik.\"\n\n286. ayet:\n> \"Allah bir kimseyi ancak **gücünün yettiği** şeyle yükümlü kılar. Kazandığı iyilik kendi yararına, kötülük de kendi zararınadır. Rabbimiz! **Unutur ya da yanılırsak** bizi sorumlu tutma. Rabbimiz! Bize gücümüzün yetmeyeceği yükü yükleme; bizi affet, bağışla, bize acı...\"\n\n**Mesajlar:**\n- Sorumluluk **güç ve imkânla** sınırlıdır; İslam **kolaylık dinidir**.\n- Herkes **kendi** yaptığından sorumludur.\n- Unutma ve yanılma durumlarında sorumluluk kalkar.",
     "ornekler": [
      {
       "soru": "Bakara 286'ya göre ağır hasta birinin ayakta namaz kılamaması nasıl değerlendirilir?",
       "cozum": "Allah kimseyi **gücünün üstünde** yükümlü kılmaz; hasta oturarak ya da ima ile kılabilir. Sorumluluk imkânla sınırlıdır."
      }
     ],
     "ozet": [
      "Mükellefiyet şartları: akıl ve ergenlik.",
      "Temyiz ve tefrik sorumluluğun temeli.",
      "Bakara 286: güç yetecek kadar sorumluluk."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Din, Felsefe, Bilim ve Sanat",
   "en": "Unit 2: Religion, Philosophy, Science and Art"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Din kavramı ve farklı disiplinlerin yaklaşımı",
     "en": "The concept of religion and disciplinary approaches"
    },
    "content": {
     "anlatim": "# Din\n\n**Sözlükte:** itaat, ceza, mükâfat, kanun, yol.\n**Terim olarak:** Akıl sahiplerini **kendi özgür iradeleriyle** hayırlı olana yönelten **ilahi kurallar bütünü**. \"Din\" kelimesi Kur'an'da **90'dan fazla** yerde geçer.\n\n| Disiplin | Dine bakışı |\n|---|---|\n| **Din felsefesi** | Dinin iddialarını akılla inceler; insanın kozmik düzeni ve varoluşunu anlamlandırma çabası |\n| **Din psikolojisi** | Bireyin iç dünyasındaki inanç, duygu ve yaşantılar |\n| **Din sosyolojisi** | Dinin toplumu bir arada tutan, bütünleştirici işlevi |\n| **Din antropolojisi** | Kültürlerdeki inanç ve ritüeller; manevi varlıklara inanç |\n\n> Bu disiplinlerin hiçbiri dini **tek başına** tam olarak kuşatamaz; her biri bir boyutunu (bireysel, toplumsal, düşünsel) inceler. İslam'da din, **vahiy temelli bir hayat nizamıdır**.",
     "ornekler": [
      {
       "soru": "Bir araştırmacının ibadetlerin toplumsal dayanışmaya etkisini incelemesi hangi disiplinin konusudur?",
       "cozum": "**Din sosyolojisi**nin konusudur."
      }
     ],
     "ozet": [
      "Din: özgür iradeyle hayra yönelten ilahi kurallar.",
      "Felsefe, psikoloji, sosyoloji, antropoloji dini farklı yönlerden inceler.",
      "Hiçbiri dini tek başına kuşatamaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Din, felsefe ve bilim ilişkisi; İslam medeniyetinde bilim kurumları",
     "en": "Religion, philosophy and science; scientific institutions"
    },
    "content": {
     "anlatim": "# Üç Alan\n\n| Alan | Yöntem | Katkı |\n|---|---|---|\n| **Din** | Vahiy ve iman | Manevi ihtiyaçlar, hayatın **anlamı** |\n| **Bilim** | Deney, gözlem, test | Fiziksel yasaların açıklanması |\n| **Felsefe** | Akıl ve eleştiri | Varlık, bilgi ve değer alanlarında sistemli sorgulama |\n\nİslam düşüncesinde akıl ve bilim dinle çelişmez: \"Göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde **akıl sahipleri için deliller** vardır.\" (Âl-i İmrân, 190)\n\n# İslam Medeniyetinde Bilim ve Eğitim Kurumları\n\n| Kurum | İşlev |\n|---|---|\n| **Cami / mescit** | İbadetin yanında ilk eğitim yeri; Mescid-i Nebevi'deki **Suffe** |\n| **Medrese** | Yükseköğretim kurumu; **Nizamiye Medreseleri** (Büyük Selçuklu, Nizamülmülk) |\n| **Beytülhikme** | Bağdat'ta (Abbasiler) **tercüme** ve ileri araştırma merkezi |\n| **Rasathane** | Astronomi gözlemleri — Meraga, Semerkant (Uluğ Bey), İstanbul (Takiyüddin) |\n| **Şifahane / darüşşifa** | Hastane ve tıp eğitimi — Divriği, Edirne II. Bayezid Darüşşifası |\n| **Kütüphane, darülhadis, darülkurra** | Kitap, hadis ve Kur'an eğitimi |\n\n**Önemli bilginler:** Harezmî (cebir), İbn Sina (tıp — *el-Kanun fi't-Tıb*), Bîrûnî (astronomi), İbnü'l-Heysem (optik), Farabi (felsefe, müzik), Cezerî (mekanik).",
     "ornekler": [
      {
       "soru": "Beytülhikme'nin İslam bilim tarihindeki önemi nedir?",
       "cozum": "Abbasiler döneminde Bağdat'ta kurulan Beytülhikme, Yunan, Hint ve Fars eserlerinin **Arapçaya tercüme** edildiği ve özgün araştırmaların yapıldığı merkezdir; bilgi birikimini koruyup geliştirmiş ve sonraki dönemlerde Avrupa'ya aktarılmasını sağlamıştır."
      }
     ],
     "ozet": [
      "Din anlam, bilim yasalar, felsefe akılla sorgulama.",
      "Âl-i İmrân 190: evren akıl sahiplerine delil.",
      "Kurumlar: medrese, Beytülhikme, rasathane, darüşşifa."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Din ve sanat; Âl-i İmrân 190–191",
     "en": "Religion and art; Al-i Imran 190–191"
    },
    "content": {
     "anlatim": "# Din ve Sanat\n\n**Sanat:** Duygu ve düşünceleri estetik biçimde ortaya koyma becerisi. Allah'ın **Cemîl** (güzel) ismi ve evrendeki kusursuz uyum İslam estetiğinin kaynağıdır. Hadis: \"Allah güzeldir, güzeli sever.\"\n\n**İslam sanatları:**\n- **Hat:** Güzel yazı sanatı (Şeyh Hamdullah, Hafız Osman).\n- **Tezhip:** Altın ve boyalarla süsleme.\n- **Ebru:** Su üzerine boyalarla desen.\n- **Çini:** Sırlı seramik (İznik, Kütahya).\n- **Minyatür**, **kündekari** (geçme ahşap), **mimari** (Mimar Sinan — Selimiye), **musiki** (Itrî).\n\n# Âl-i İmrân 190–191\n\n> \"Göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelişinde akıl sahipleri için elbette ibretler vardır. Onlar ayakta dururken, otururken ve yanları üzerine yatarken Allah'ı anarlar, göklerin ve yerin yaratılışı hakkında **düşünürler**: 'Rabbimiz! Sen bunu **boş yere yaratmadın**. Seni tenzih ederiz; bizi cehennem azabından koru.'\"\n\n**Mesajlar:** Evreni gözlemlemek ve **tefekkür** etmek; evrenin bir **amaçla** yaratıldığı bilinci; zikir ile düşünmenin birlikteliği.",
     "ornekler": [
      {
       "soru": "İslam sanatında soyut motiflerin (geometrik desen, rumi) yaygın olmasının bir nedeni nedir?",
       "cozum": "İslam sanatı **tevhit** düşüncesiyle sonsuzluğu ve evrendeki düzeni simgeleyen **soyut ve geometrik** anlatımı tercih etmiştir; özellikle ibadet mekânlarında canlı tasvirinden kaçınılmıştır."
      }
     ],
     "ozet": [
      "Allah Cemîl'dir, güzeli sever.",
      "Hat, tezhip, ebru, çini, mimari, musiki.",
      "Âl-i İmrân 190–191: tefekkür; evren boşuna yaratılmadı."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: İslam Medeniyeti ve Gönül Coğrafyamız",
   "en": "Unit 3: Islamic Civilization and Our Cultural Geography"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Medeniyetin oluşumu ve İslam medeniyetinin havzaları",
     "en": "Formation of civilization and centers of Islamic civilization"
    },
    "content": {
     "anlatim": "# Medeniyet\n\nArapça **medine** (şehir) kelimesinden türemiştir. Toplumların düzenli, barış ve huzur içinde **yerleşik hayat** sürmesini sağlayan maddi ve manevi değerler bütünü.\n\n| Maddi unsurlar | Manevi unsurlar |\n|---|---|\n| Mimari, yazı, bilim, teknoloji, sanat | Din, eğitim, ahlak, adalet, toplumsal dayanışma (**vakıflar**) |\n\n**Kültür–medeniyet farkı:** Kültür daha çok **özgün ve yerel**; medeniyet **evrensel** nitelikli ve kültürlerin birikimiyle oluşur.\n\n# İslam Medeniyetinin Havzaları\n\n1. **Hicaz:** Mekke ve Medine; İslam'ın doğduğu, Kâbe'nin bulunduğu ilk merkez.\n2. **Kudüs:** Birçok peygamberin tevhit mücadelesi verdiği; **Mescid-i Aksa** ve **Kubbetü's-Sahra**.\n3. **Şam ve Bağdat:** Şam **Emevîlerin**, Bağdat **Abbasîlerin** başkenti; Bağdat'ta **Beytülhikme** kuruldu, felsefe ve pozitif bilimler zirveye ulaştı.\n4. **Horasan, Türkistan, Mâverâünnehir:** Buhara, Semerkant; **Farabi, İbn Sina, Bîrûnî, Harezmî, İmam Mâtürîdî** gibi âlimlerin yurdu.\n5. **Anadolu, Balkanlar, Hint alt kıtası, Kuzey Afrika ve Endülüs:** Kurtuba Camii, **Elhamra Sarayı** (Endülüs); Selçuklu ve Osmanlı ile Anadolu ve Balkanlar.\n\n# Horasan, Anadolu ve Rumeli Erenleri\n\n| Kişi | Katkısı |\n|---|---|\n| **Ahmed Yesevî** | \"Pîr-i Türkistan\"; *Divan-ı Hikmet*; Türk tasavvuf geleneğinin kurucusu |\n| **Hacı Bektaş Velî** | *Makâlât*; sevgi, birlik, hoşgörü |\n| **Ahi Evran** | **Ahilik** teşkilatı; meslek ahlakı ve dürüstlük |\n| **Yunus Emre** | İlahi aşk ve insan sevgisi; \"Yaratılanı severiz Yaratandan ötürü\" |\n| **Mevlânâ** | *Mesnevî*, *Divan-ı Kebîr*; evrensel hoşgörü |\n| **Hacı Bayram Velî** | Çalışma, alın teri ve toplumsal dayanışma; Bayramiyye |",
     "ornekler": [
      {
       "soru": "Ahilik teşkilatının toplumsal hayata katkısı nedir?",
       "cozum": "Esnaf ve zanaatkârları **meslek ahlakı**, dürüstlük, kaliteli üretim ve dayanışma ilkeleriyle örgütlemiş; usta-çırak ilişkisiyle meslek eğitimi vermiştir."
      }
     ],
     "ozet": [
      "Medeniyet: medine (şehir); maddi + manevi unsurlar.",
      "Havzalar: Hicaz, Kudüs, Şam-Bağdat, Horasan-Mâverâünnehir, Anadolu-Endülüs.",
      "Erenler: Yesevî, Hacı Bektaş, Ahi Evran, Yunus, Mevlânâ, Hacı Bayram."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "İslam medeniyetinin bugünü ve geleceği; Rum 9",
     "en": "Islamic civilization today and tomorrow; Rum 9"
    },
    "content": {
     "anlatim": "# Gönül Coğrafyasında Kurumlar\n\n| Kurum | Faaliyet |\n|---|---|\n| **TİKA** | Eğitim, sağlık, tarım, içme suyu projeleri; cami, türbe, köprü restorasyonları |\n| **YTB** | Soydaş ve akraba topluluklarla bağlar; **Türkiye Bursları** |\n| **Yunus Emre Enstitüsü** | Yabancılara Türkçe öğretimi; kültür ve sanat tanıtımı |\n| **Türkiye Maarif Vakfı** | Yurt dışında okul öncesinden üniversiteye eğitim kurumları |\n| **Türkiye Diyanet Vakfı** | Cami, Kur'an kursu, küresel insani yardım; \"İnsanların en hayırlısı insanlara faydalı olandır.\" |\n\n# Rum Suresi 9. Ayet\n\n> \"Yeryüzünde gezip kendilerinden öncekilerin sonunun nasıl olduğuna bakmadılar mı? Onlar bunlardan daha güçlüydüler; toprağı sürüp işlemişler, onu bunların imar ettiğinden daha çok imar etmişlerdi. Peygamberleri onlara apaçık delillerle gelmişti. Allah onlara zulmedecek değildi, fakat onlar kendilerine zulmediyorlardı.\"\n\n**Mesajlar:** Maddi güç ve teknoloji, **ahlak ve adaletle** desteklenmezse medeniyetler yıkılır; **tarihten ders çıkarmak** gerekir.",
     "ornekler": [
      {
       "soru": "Rum 9. ayetin günümüz toplumlarına mesajı nedir?",
       "cozum": "Yalnızca **maddi kalkınma** yeterli değildir; adalet, ahlak ve manevi değerlerden kopan toplumlar güçlü olsalar da çöküşe sürüklenebilir."
      }
     ],
     "ozet": [
      "TİKA, YTB, YEE, Maarif Vakfı, TDV.",
      "Gönül coğrafyası ile dayanışma.",
      "Rum 9: ahlaksız güç yıkılır; tarihten ders."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: İnançla İlgili Meseleler",
   "en": "Unit 4: Issues Related to Faith"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "İnançla ilgili felsefi yaklaşımlar",
     "en": "Philosophical approaches related to faith"
    },
    "content": {
     "anlatim": "# Felsefi Akımlar\n\n| Akım | Temel iddia |\n|---|---|\n| **Teizm** | Evreni yaratan, ona müdahale eden ve **vahiy gönderen** tek Tanrı'ya inanç |\n| **Deizm** | Tanrı evreni yaratmıştır ama **müdahale etmez**; vahiy ve peygamberliği kabul etmez |\n| **Materyalizm** | Varlık yalnızca **maddedir**; ruh ve metafizik gerçek dışıdır |\n| **Pozitivizm** | Yalnızca **deney ve gözlemle** doğrulanan bilgi geçerlidir; metafizik anlamsızdır (Comte) |\n| **Sekülarizm** | Hayatın ve toplumsal kurumların **dinden bağımsızlaşması**; dinin bireysel vicdana çekilmesi |\n| **Agnostisizm** | Tanrı'nın varlığı ya da yokluğu hakkında **kesin bilgi edinilemez** |\n| **Ateizm** | Tanrı'nın varlığını **reddeder** |\n| **Nihilizm** | Değerlerin, ahlakın ve inançların **anlamsız** olduğunu savunur |\n| **Transhümanizm** | İnsanı teknolojiyle biyolojik sınırlarından kurtarıp dönüştürmeyi, ölümsüzlüğü hedefler |\n\n> Bu akımlar kendi **tarihî ve kültürel bağlamlarında** (ör. Avrupa'da kilise–bilim çatışması) değerlendirilmelidir. **İslam inancına** göre evrenin yaratıcısı Allah'tır, evreni **başıboş bırakmamış**; vahiy ve peygamberlerle insanlığa rehberlik etmiştir. Ahiret inancı hayatı bütüncül olarak anlamlandırır.",
     "ornekler": [
      {
       "soru": "Deizm ile İslam'ın Allah anlayışı arasındaki temel fark nedir?",
       "cozum": "Deizm Tanrı'nın evrene ve insana **müdahale etmediğini**, vahyi ve peygamberleri kabul etmediğini savunur. İslam'da Allah evreni **sürekli yönetir**, vahiy gönderir ve peygamberlerle insanlara yol gösterir."
      }
     ],
     "ozet": [
      "Teizm vahiy kabul eder; deizm etmez.",
      "Materyalizm, pozitivizm metafiziği reddeder.",
      "Agnostisizm bilinemezcilik; nihilizm değer reddi."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Kötülük problemi (teodise)",
     "en": "The problem of evil (theodicy)"
    },
    "content": {
     "anlatim": "# Kötülük Problemi\n\n**Teodise** (Tanrı'nın adaleti): \"Her şeye gücü yeten ve mutlak iyi bir Tanrı varsa dünyada acı, hastalık ve kötülük neden var?\" Ateizmin önemli argümanlarından biridir.\n\n**Kötülük türleri:**\n- **Ahlaki kötülük:** İnsanın iradesiyle yaptığı (zulüm, savaş, hırsızlık).\n- **Doğal kötülük:** Deprem, sel, hastalık gibi.\n\n# İslam Düşüncesindeki Cevaplar\n\n1. **İmtihan dünyası:** \"O, hanginizin daha güzel amel yapacağını sınamak için ölümü ve hayatı yaratandır.\" (Mülk, 2)\n2. **İnsan iradesi:** Ahlaki kötülüğün kaynağı insanın yanlış tercihleridir. \"İnsanların kendi elleriyle yaptıkları yüzünden karada ve denizde fesat ortaya çıktı.\" (Rum, 41)\n3. **İlahi hikmet:** Doğal olaylar hikmetle yaratılmıştır; sınırlı insan aklı her şeyin nihai amacını hemen kavrayamaz. Deprem bir **doğa yasasıdır**; zarar büyük ölçüde **tedbirsizlik** (çürük yapı) ile ilgilidir.\n4. **Zıtlıkla anlama:** İyilik ve güzellik, zıtlarıyla daha iyi fark edilir.\n\n> Allah **mutlak adildir** ve kullarına zulmetmez (Yunus, 44).",
     "ornekler": [
      {
       "soru": "Depremde yıkılan binaların çoğunun yönetmeliğe aykırı olması kötülük problemi açısından neyi gösterir?",
       "cozum": "Deprem doğal bir **yasadır (sünnetullah)**; can kayıplarının büyük kısmı ise **insan iradesiyle** alınmayan tedbirlerden (çürük yapı, denetimsizlik) kaynaklanır. Bu, ahlaki sorumluluğun insanda olduğunu gösterir."
      }
     ],
     "ozet": [
      "Teodise: kötülük varken Tanrı'nın iyiliği.",
      "Cevaplar: imtihan, insan iradesi, ilahi hikmet.",
      "Ahlaki kötülük insandan; doğa olayları yasa gereği."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Yeni dinî hareketler, din istismarı, İslamofobi; Hadid 1–5",
     "en": "New religious movements, exploitation of religion, Islamophobia; Hadid 1–5"
    },
    "content": {
     "anlatim": "# Din İstismarı\n\nDinî kavramların ve kutsal değerlerin **kişisel, siyasi ya da ekonomik çıkar** için kötüye kullanılması. İstismarcılar **yardım, bağış, kutsal rüya, mehdilik, kurtarıcılık** gibi söylemlerle insanları aldatır.\n\n**Korunma yolları:** Dinin **sahih kaynaklarını** (Kur'an ve sünnet) doğru öğrenmek, eleştirel düşünmek, akla ve bilime aykırı iddialara şüpheyle yaklaşmak, sorgulanamaz liderlere karşı dikkatli olmak.\n\n# Yeni Dinî Hareketler\n\n20. yüzyılda geleneksel dinlerin dışında ortaya çıkan, Hristiyanlık ya da Uzak Doğu mistisizmi (reiki, meditasyon vb.) unsurlarını harmanlayan **kült ve tarikat benzeri** yapılar. Özellikleri: **karizmatik lider**, gizli ritüeller, **kıyamet** vurgusu, üyeleri toplumdan yalıtma.\n\n**Din istismarına dayalı terör örgütleri:** Ders kitabında dinî kavramları çarpıtarak çıkar ve terör ağı kuran **FETÖ** ve şiddeti İslam'a mal eden **DEAŞ** örnek olarak verilir.\n\n# İslamofobi\n\nİslam ve Müslümanlara karşı üretilen **korku, nefret ve düşmanlık**. Bazı medya organları ve siyasi söylemlerle körüklenir; ayrımcılığa yol açar ve **insan haklarına aykırıdır**.\n\n# Hadid Suresi 1–5\n\n- Göklerde ve yerde olan her şey Allah'ı **tesbih** eder.\n- 3. ayet: Allah **Evvel** (başlangıcı olmayan), **Âhir** (sonu olmayan), **Zâhir** (varlığı apaçık), **Bâtın** (mahiyeti gizli) olandır.\n- 4. ayet: \"**Nerede olursanız olun O sizinle beraberdir**; Allah yaptıklarınızı görür.\" → ilahi denetim bilinci, sorumluluk.",
     "ornekler": [
      {
       "soru": "'Bağış yaparsan tüm dertlerin biter, rüyamda gördüm' diyen birine karşı nasıl bir tutum takınılmalıdır?",
       "cozum": "Bu bir **din istismarı** göstergesidir. İslam'da kurtuluş kişinin kendi **iman ve amelleriyle**dir; rüya dinî hüküm kaynağı değildir. İddia sahih kaynaklarla karşılaştırılmalı ve **eleştirel** yaklaşılmalıdır."
      }
     ],
     "ozet": [
      "Din istismarı: kutsalı çıkar için kullanmak.",
      "Yeni dinî hareketler: karizmatik lider, kıyamet vurgusu.",
      "Hadid 3: Evvel, Âhir, Zâhir, Bâtın; Hadid 4: O sizinle beraberdir."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Yahudilik ve Hristiyanlık",
   "en": "Unit 5: Judaism and Christianity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Yahudilik",
     "en": "Judaism"
    },
    "content": {
     "anlatim": "# Yahudilik\n\n- Kökeni **Hz. İbrahim**'e dayanır; dinin temel öğretileri **Hz. Musa**'ya indirilen vahye dayanır. **Etnik ve millî kimlik** taşıyan, bilinen en eski **tek tanrılı (semavi)** dinlerdendir. Adı Hz. Yakup'un oğlu **Yahuda**'dan gelir.\n- **Kutsal metinler:** **Tanah** (Ahd-i Atik) — Tevrat (Tora, Musa'nın beş kitabı), Neviim (peygamberler), Ketuvim (yazılar). Sözlü gelenek ve yorumların yazıya geçirilmesiyle oluşan **Talmud**.\n- **İnanç esasları:** Tek Tanrı (**Yahve**), seçilmiş halk inancı, **Mesih** beklentisi, **On Emir**, ahiret inancı. Maimonides 13 inanç esasını sistemleştirmiştir.\n- **İbadet yeri:** **Sinagog** (havra). Din adamı: **haham** (rabbi).\n- **Ritüeller:** Günlük dualar, **Şabat** (cumartesi tatili), **koşer** beslenme kuralları, sünnet.\n- **Bayramlar:** **Hamursuz (Pesah)** — Mısır'dan çıkış; **Yom Kippur** — kefaret günü; Roş Haşana (yılbaşı); Haftalar Bayramı (Şavuot); Çardak Bayramı (Sukot).\n- **Mezhepler:** **Ortodoks** (geleneğe sıkı bağlı), **Reform** (modern yorum), **Muhafazakâr** (ılımlı orta yol).\n- **Sembol:** Davut Yıldızı, **menora** (yedi kollu şamdan).",
     "ornekler": [
      {
       "soru": "Yahudiliğin 'etnik' bir din olarak nitelendirilmesinin nedeni nedir?",
       "cozum": "Yahudilik büyük ölçüde **İsrailoğulları soyuna** bağlı bir kimlikle tanımlanır; **misyonerlik yapmaz** ve dine giriş genellikle doğumla (anne soyu) belirlenir."
      }
     ],
     "ozet": [
      "Hz. İbrahim ve Hz. Musa; kutsal metin Tanah ve Talmud.",
      "Sinagog, haham, Şabat, koşer.",
      "Mezhepler: Ortodoks, Reform, Muhafazakâr."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Hristiyanlık",
     "en": "Christianity"
    },
    "content": {
     "anlatim": "# Hristiyanlık\n\nHz. **İsa**'nın peygamberliği (Hristiyan inancına göre ilahlığı ve **mesihliği**) etrafında şekillenen dindir. Pavlus'un (Pavlus) misyon faaliyetleri dinin yayılmasında belirleyici olmuştur.\n\n**Kutsal kitap: Kitab-ı Mukaddes**\n- **Ahd-i Atik** (Eski Ahit — Yahudilerle ortak)\n- **Ahd-i Cedid** (Yeni Ahit): Dört İncil (**Matta, Markos, Luka, Yuhanna**), Resullerin İşleri, Mektuplar ve Vahiy.\n\n**Temel inançlar:**\n- **Teslis:** Baba, Oğul ve Kutsal Ruh — tek Tanrı'nın üç unsuru.\n- **Enkarnasyon:** Tanrı'nın İsa'da **beden alması**.\n- **Asli günah ve kefaret:** Hz. Âdem'den gelen günahın, İsa'nın çarmıhta ölmesiyle bağışlandığı inancı.\n- **Diriliş ve ikinci geliş.**\n\n> İslam'a göre Hz. İsa Allah'ın **kulu ve peygamberidir**; teslis kabul edilmez ve her insan yalnızca **kendi günahından** sorumludur.\n\n**Sakramentler (kutsal ayinler):** **Vaftiz** ve **Evharistiya (Komünyon / Aşai Rabbani)** en temelleridir; Katolik ve Ortodokslarda toplam yedi sakrament vardır.\n\n**İbadet yeri:** Kilise. **Bayramlar:** **Noel** (İsa'nın doğumu), **Paskalya** (dirilişi).\n\n**Mezhepler:**\n| Mezhep | Özellik |\n|---|---|\n| **Katoliklik** | Merkez Vatikan, **Papa**'nın otoritesi |\n| **Ortodoksluk** | Doğu kiliseleri; 1054'te Katolik kilisesinden ayrıldı; patrikler |\n| **Protestanlık** | 16. yy'da **Martin Luther** reformu; Papa otoritesini ve endüljansı reddeder, kutsal kitabı temel alır |",
     "ornekler": [
      {
       "soru": "Protestanlığın ortaya çıkmasının başlıca nedeni nedir?",
       "cozum": "16. yüzyılda Katolik kilisesinin **endüljans** (günah çıkarma belgesi) satışı ve Papa'nın mutlak otoritesine tepki olarak **Martin Luther**'in başlattığı reform hareketidir."
      }
     ],
     "ozet": [
      "Kitab-ı Mukaddes: Ahd-i Atik + Ahd-i Cedid (4 İncil…).",
      "Teslis, enkarnasyon, kefaret; vaftiz ve evharistiya.",
      "Katolik (Papa), Ortodoks (1054), Protestan (Luther)."
     ]
    }
   }
  ]
 }
];
