/* =========================================================
   11. Sınıf Türk Dili ve Edebiyatı — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Türk Dili ve Edebiyatı 11. Sınıf Detaylı Konu Anlatım Notları" (4 tema).
   Kazanım kodları kaynaktaki bölüm numaralarıdır; yakın bölümler birleştirildi. Edebî mektup örneği Cahit Sıtkı Tarancı'nın Ziya'ya Mektuplar'ı ile değiştirildi; DLT'deki söz "kitapta hadis olarak aktarılan" biçiminde verildi. Âkif'in biyografisi, ilk tezkireler, lebdeğmez ve Huzur'un bölüm yapısı eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/edebiyat"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Bir Diyeceğim Var!",
   "en": "Theme 1: I Have Something to Say!"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Geleneksel Türk tiyatrosu ve Karagöz (Yazıcı)",
     "en": "Traditional Turkish theatre and Karagöz"
    },
    "content": {
     "anlatim": "# Geleneksel Türk Tiyatrosu (Seyirlik Halk Oyunları)\n\n**Türler:** meddah, kukla, **Karagöz (gölge oyunu)**, ortaoyunu, tuluat tiyatrosu, köylü oyunları.\n\n**Ortak özellikler:**\n- **Seyirlik**tir: bir yanda seyirci, bir yanda (canlı ya da cansız) aktör.\n- **Taklit** en önemli öğedir; bu gelenekte \"temsil\" anlamını alır (Metin And). Ağız ve tip taklitleri: Acem, Kastamonulu, Tiryaki, Çelebi, Frenk…\n- **Yazılı metin yoktur**; basit bir olay çizgisi üzerinde **doğaçlama (irticalen)** oynanır.\n- Söz, müzik, dans gibi sanatları birleştirir; amaç **güldürürken düşündürmek**.\n\n# Karagöz Oyununun Bölümleri\n\n| Bölüm | İçerik |\n|---|---|\n| **Mukaddime (giriş)** | Hacivat semai okuyarak perdeye gelir, \"Yâr bana bir eğlence, medet!\" der; **perde gazeli** okunur |\n| **Muhavere (söyleşme)** | Asıl konuyla ilgisiz; Karagöz'ün Hacivat'ın sözlerini **yanlış anlaması** ya da çarpıtması → **mizahın** asıl kaynağı |\n| **Fasıl (asıl oyun)** | Asıl olay; diğer tipler (Hanım, Laz, Tiryaki, Çelebi…) oyuna katılır |\n| **Bitiş** | Kısa konuşma; Karagöz \"Her ne kadar sürç-i lisan ettikse affola!\" der, sonraki oyunu haber verir |\n\n# Karagöz ve Hacivat\n\n| Karagöz | Hacivat |\n|---|---|\n| **Halk adamı**, okumamış, dışa dönük | **Okumuş** (yüzeysel bilgili), kibar, esnek |\n| Sözü özü bir, düşündüğünü çekinmeden söyler | Herkesin huyuna göre konuşur, arabulucu, yüze gülücü |\n| Halk sağduyusunun temsilcisi | Görgü kurallarına uyar, ağdalı ve dolambaçlı konuşur |\n| Geçim derdinde, cesur, saf | Çıkarcı, iyimser, öğüt verici |\n\n# Yazıcı Metni (Cevdet Kudret)\n\nKaragöz'ün **yazıcılık (arzuhalcilik) dükkânı** açması ve müşterilerin isteklerini yanlış anlaması. Yanlış anlamalar: *Yahnikapan → Dolmayutan*, *kırk dirhem havlıcan → kırk kere havlıyacağım*.\n- **Açık iletiler:** geçim derdi, meslek, yanlış anlaşılmanın komik sonuçları.\n- **Örtük iletiler:** eğitim eksikliği, aydın–halk arasındaki dil uçurumu, toplumsal eleştiri, iletişimde dikkatin önemi.\n\n**Cevdet Kudret (Solok, 1907–1992):** Karagöz ve ortaoyunu derlemeleri; *Süleyman'ın Dünyası* roman üçlemesi; antolojiler.",
     "ornekler": [
      {
       "soru": "Karagöz oyununda mizahın temel kaynağı nedir? Neden?",
       "cozum": "**Muhavere** bölümündeki **yanlış anlamalar**: Karagöz'ün halk dili ile Hacivat'ın ağdalı Osmanlıcası arasındaki **dil ve eğitim farkı** kelime oyunları ve komik durumlar doğurur."
      },
      {
       "soru": "Karagöz ile Hacivat neden birbirini tamamlayan zıt tipler olarak değerlendirilir?",
       "cozum": "Karagöz **halkı ve sağduyuyu**, Hacivat **okumuş ama yüzeysel aydın kesimi** temsil eder. Bu zıtlık hem çatışma hem de toplumsal eleştiri imkânı yaratır."
      }
     ],
     "ozet": [
      "Seyirlik oyunlar: meddah, kukla, Karagöz, ortaoyunu; doğaçlama ve taklit.",
      "Karagöz bölümleri: mukaddime, muhavere, fasıl, bitiş.",
      "Karagöz halk adamı; Hacivat okumuş, arabulucu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Mektup, iletişim engelleri ve e-posta",
     "en": "Letters, communication barriers and e-mail"
    },
    "content": {
     "anlatim": "# Mektup\n\nBir kimsenin başka birine **duygu, düşünce, istek ve haberlerini** bildirmek için yazdığı yazı. Nurullah Ataç: \"**Her yazı bir mektuptur.**\"\n- **Özel mektup:** Aile, dost, aşk mektupları — **samimi**, konuşma diline yakın.\n- **Resmî (iş) mektup:** Kurum ve makamlara — **ölçülü, nezaket kurallarına** uygun.\n- **Edebî mektuplar** eser olarak yayımlanabilir: Cahit Sıtkı Tarancı'nın *Ziya'ya Mektuplar*'ı gibi.\n\n**Yapı:** hitap → giriş → gelişme → sonuç → kapanış (selam, imza, tarih, ekler).\n\n# Sözlü İletişim Engelleri\n\n- Yetersiz ya da seçici dinleme, **söz kesme**\n- **Önyargı** ve kalıp yargılar, varsayımlar\n- Küçümseyici, belirsiz ya da ağır dil\n- Duygusal engeller (öfke, korku, utanç)\n- Fiziksel engeller (gürültü, mesafe)\n- Kültürel farklılıklar\n\n**Sağlıklı iletişim:** aktif ve **empatik dinleme**, açık ifade, beden diline dikkat, **geri bildirim**, saygı, doğru zamanlama. Atölye: engelleri konu alan bir **drama** sergilenir.\n\n# Değişen İletişim Araçları ve E-posta\n\nmektup → telgraf → telefon → faks → **e-posta** → anlık mesajlaşma → sosyal medya.\n\n| E-postanın avantajları | Dezavantajları |\n|---|---|\n| Hızlı ve ücretsiz | Ses tonu ve jest olmadığı için **yanlış anlaşılma** |\n| **Yazılı kayıt** oluşturur | Resmiyet kaybı |\n| Ek dosya gönderilebilir | Kısaltmalarla dil bozulması (slm, tmm, ksk) |\n| Aynı anda çok kişiye ulaşır | İnternete bağımlılık |\n\n**E-posta yazım kuralları:** net bir **konu satırı**; alıcıya uygun hitap ve kapanış; dil düzeyinin (resmî/özel) belirlenmesi; kısa paragraflar; eklerin belirtilmesi; imla ve noktalamaya dikkat; resmî yazışmada kısaltma ve emoji kullanılmaması.",
     "ornekler": [
      {
       "soru": "Bir öğretmene ödev teslimi için e-posta yazarken konu satırı nasıl olmalıdır?",
       "cozum": "Kısa, açık ve içeriği özetleyen bir konu satırı: ör. **\"11-A Edebiyat Ödevi – Ayşe Yılmaz\"**. Alıcı e-postayı açmadan konusunu anlayabilmelidir."
      }
     ],
     "ozet": [
      "Mektup: özel (samimi) ve resmî (ölçülü).",
      "İletişim engelleri: seçici dinleme, önyargı, söz kesme.",
      "E-posta: konu satırı, hitap, ekler, imla."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Dilekçe yazımı",
     "en": "Writing a petition"
    },
    "content": {
     "anlatim": "# Dilekçe\n\nVatandaşların kendileriyle ya da kamuyla ilgili **dilek veya şikâyetlerini** resmî makamlara bildirmek için sunduğu **imzalı ve adresli** yazı.\n- **Anayasa'nın 74. maddesi** dilekçe hakkını güvence altına alır.\n- **3071 sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun (1984):** Başvurulara en geç **30 gün** içinde cevap verilmelidir.\n\n# Yazım Kuralları\n\n- Düz, beyaz, **çizgisiz** kâğıda; el yazısı ya da bilgisayarla.\n- Dilekçenin verildiği **makam** üstte ortaya **büyük harfle** yazılır; altına il/ilçe yazılır.\n- **Açık, kısa, resmî** bir anlatım; gereksiz ayrıntı yok.\n- **Üst makama \"arz ederim\"**, **alt makama \"rica ederim\"** ile bitirilir.\n- **Sağ altta:** tarih, **imza**, ad-soyad.\n- **Sol altta:** adres, iletişim bilgileri (gerekirse T.C. kimlik no).\n- Varsa **ekler** adresin altında listelenir (\"Ek: 1. Öğrenci belgesi\").\n\n**Şema:**\n```\n              ... LİSESİ MÜDÜRLÜĞÜNE\n                                  ANKARA\n   (Dilek / şikâyet metni) ... Gereğini arz ederim.\n                                            Tarih\n                                            İmza\n                                            Ad Soyad\n   Adres:\n   Ek:\n```",
     "ornekler": [
      {
       "soru": "Okul müdürlüğüne yazılan bir dilekçe 'rica ederim' ile mi 'arz ederim' ile mi bitirilir?",
       "cozum": "Öğrenci için okul müdürlüğü **üst makamdır**; dilekçe **\"arz ederim\"** ile bitirilir."
      }
     ],
     "ozet": [
      "Dilekçe hakkı: Anayasa 74; 3071 sayılı Kanun, 30 gün.",
      "Üst makama arz, alt makama rica.",
      "Sağ alt: tarih-imza-ad; sol alt: adres ve ekler."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Kültür Yolculuğu",
   "en": "Theme 2: A Cultural Journey"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Hikâye (Oğulla Buluşma) ve anı (Eski İstanbul'dan Çizgiler)",
     "en": "Short story and memoir"
    },
    "content": {
     "anlatim": "# Oğulla Buluşma — Cengiz Aytmatov\n\nKırgız yazar Aytmatov'un hikâyesinde yaşlı **Çordon**, yıllar önce savaşta kaybettiği oğlunun yaşadığına inanır ve onu aramaya karar verir.\n\n| Unsur | Özellik |\n|---|---|\n| **Tema** | Savaşın aile üzerindeki yıkıcılığı, **umut ve inanç**, baba–oğul bağı, fedakârlık |\n| **Anlatıcı** | Üçüncü kişi, **hâkim (ilahi) bakış açısı** |\n| **Olay örgüsü** | Kronolojik + **geriye dönüşler** |\n| **Kişiler** | Çordon (fedakâr, kararlı baba), eşi, oğul (anılarda) |\n| **Mekân / zaman** | Kırsal çevre, savaş sonrası |\n\n**Türk dünyası ortak kültür unsurları:** aile bağları, vatan sevgisi, fedakârlık, misafirperverlik. Hikâye **tarih** (savaş), **coğrafya** (Kırgızistan) ve **sosyoloji** (aile yapısı) ile ilişkilendirilebilir.\n\n# Anı (Hatıra)\n\nYazarın **kendi yaşadığı** ya da tanık olduğu olayları anlatması.\n- **Birinci kişi** ağzından, **öznel** ama **belgesel** değer taşır.\n- Samimi, içten bir dil.\n- Günlükten farkı: olaylar **üzerinden zaman geçtikten** sonra yazılır.\n\n**Eski İstanbul'dan Çizgiler:** Kapalıçarşı esnafı, Kalpakçılar Caddesi, esnaf–müşteri ilişkisi; \"Bereket versin, sağlıkla kullanın, safâ geldiniz\" gibi sözler. **Dürüstlük, misafirperverlik, bereket** gibi millî kültür değerleri anı yoluyla sonraki kuşaklara aktarılır.",
     "ornekler": [
      {
       "soru": "Anı ile hikâye arasındaki temel fark nedir?",
       "cozum": "**Anı** yazarın **gerçekten yaşadığı** olaylara dayanır, birinci kişi anlatımıyla ve belgesel değer taşır (öğretici). **Hikâye** ise **kurmacadır**; olay ve kişiler hayal ürünü olabilir."
      }
     ],
     "ozet": [
      "Aytmatov: umut, savaş, baba–oğul; hâkim anlatıcı, geriye dönüş.",
      "Anı: yaşanmış, birinci kişi, belgesel değer.",
      "Türk dünyası ortak değerleri: aile, vatan, fedakârlık."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Orhun Abideleri ve Dîvânu Lugâti't-Türk",
     "en": "The Orkhon Inscriptions and Dīwān Lughāt al-Turk"
    },
    "content": {
     "anlatim": "# Orhun Abideleri (Göktürk Yazıtları)\n\n- VIII. yüzyıl: **Tonyukuk** (yaklaşık 720–725), **Kül Tigin** (732), **Bilge Kağan** (735).\n- **Göktürk (Orhun) alfabesiyle** yazılmış, tarihi kesin olarak bilinen **en eski Türkçe metinler**; Moğolistan'da Orhun Vadisi'nde.\n- \"**Bengü taş**\" (ebedî taş); kaplumbağa kaideler sonsuzluğu simgeler. Kül Tigin yazıtının bir yüzü **Çince**dir (kültürel ve diplomatik etkileşim).\n- Yazıtları **Yollığ Tigin** yazmıştır; 1893'te **Vilhelm Thomsen** çözmüştür.\n\n**İçerik:** Türk milletinin bağımsızlık mücadelesi, **töre**, kağanlık anlayışı, **Çin'e karşı uyarılar**, millete öğütler.\n> \"Üstte mavi gök, altta yağız yer kılındıkta ikisi arasında insanoğlu kılınmış.\"\n> \"Türk milleti için gece uyumadım, gündüz oturmadım.\"\n> \"Aç milleti doyurdum, çıplak milleti giydirdim, az milleti çok kıldım.\"\n\n**Önemi:** Türk dili, tarihi, devlet anlayışı ve **millî bilinç** için temel kaynak; söylev (hitabet) türünün ilk örneği; dilin bir kavmi **millet** yapmadaki rolünü gösterir.\n\n# Dîvânu Lugâti't-Türk\n\n- **Kâşgarlı Mahmud**, 1072–1074, Bağdat'ta yazdı; Abbasi halifesine sundu.\n- **Amaç:** **Araplara Türkçeyi öğretmek**, Türkçenin Arapça kadar zengin olduğunu göstermek.\n- **İlk Türkçe sözlük** ve dil bilgisi kitabı (Türkçe–Arapça); **Türk lehçelerini** (Oğuz, Türkmen, Çiğil, Yağma, Kırgız…) karşılaştırır; Türk illerini gösteren **ilk dünya haritası** bulunur.\n- İçinde **sav (atasözü)**, **koşuk** (şiir), sagu, destan parçaları, gelenek ve coğrafya bilgileri vardır.\n- Kitapta hadis olarak aktarılan söz: \"Türk dilini öğreniniz; çünkü onların uzun sürecek saltanatları vardır.\"\n\n**Önemi:** Türk dil bilimi, söz varlığı, kültür tarihi ve **Türk dünyası ortaklığı** için eşsiz hazine.",
     "ornekler": [
      {
       "soru": "Orhun Abideleri'nin 'bir kavmi millet yapan belge' olarak nitelendirilmesinin nedeni nedir?",
       "cozum": "Yazıtlarda Türk adı bir **millet adı** olarak geçer; ortak tarih, **töre**, bağımsızlık ve devlet bilinci **Türkçe** olarak kayda geçirilir ve millete seslenilir. Bu, ortak dilin **millî kimlik** oluşturmadaki rolünü gösterir."
      }
     ],
     "ozet": [
      "Orhun: 8. yy, Göktürk alfabesi, Tonyukuk–Kül Tigin–Bilge Kağan.",
      "Orhun: millî bilinç, töre, söylev türü.",
      "DLT: Kâşgarlı, 1072–74, Araplara Türkçe öğretmek."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Âşık atışması, ozanlık geleneği; konuşma ve yansıtıcı yazı",
     "en": "Minstrel contests; speaking and reflective writing"
    },
    "content": {
     "anlatim": "# Ozanlık ve Âşıklık Geleneği\n\n- İslamiyet öncesinde **kam, baksı, ozan**; sonra **âşık**.\n- **Saz** eşliğinde **doğaçlama** şiir söyleme geleneği; Anadolu, Azerbaycan ve Orta Asya'da ortak kültür unsuru (Dede Korkut bir ozan figürüdür).\n- **Usta–çırak** ilişkisiyle yetişme, **mahlas** alma, **badeli rüya** motifi.\n\n# Âşık Atışması (Karşılaşma)\n\nİki âşığın aynı **ayak (uyak ve redif)** üzerinde **karşılıklı** ve **doğaçlama** şiirlerle yarışması.\n- **Gerekenler:** hazırcevaplık, güçlü söz varlığı, uyak bilgisi, kültürel birikim, mizah.\n- **Türleri:** ayak açma, muamma, **lebdeğmez** (dudak harfleri b, p, m, f, v kullanılmadan söyleme), taşlama.\n- Örnek: **Murat Çobanoğlu – Şeref Taşlıova** atışmaları.\n\n# Konuşma: Türk Kültürünü Tanıtma\n\n- **Plan:** giriş – gelişme – sonuç.\n- Örneklerle destek (Orhun, âşık geleneği, anı, hikâye).\n- Millî değerleri (dil, töre, birlik, misafirperverlik) vurgulama; **beden dili**, göz teması, ses tonu.\n\n# Yansıtıcı Yazı (Çevrim İçi Müze Gezisi)\n\nDört boyut: **Gözlem** (ne gördüm?) – **Duygu** (ne hissettim?) – **Bilgi** (ne öğrendim?) – **Değerlendirme** (ne düşünüyorum?).\nBirinci kişi, samimi üslup, somut örnekler.",
     "ornekler": [
      {
       "soru": "Lebdeğmez nedir ve âşığın hangi yeteneğini ölçer?",
       "cozum": "Söylerken dudakların birbirine **değmediği**, yani **b, p, m, f, v** harflerinin kullanılmadığı şiirlerdir. Âşığın **söz varlığını** ve **doğaçlama ustalığını** ölçer."
      }
     ],
     "ozet": [
      "Ozan → âşık; saz eşliğinde doğaçlama.",
      "Atışma: aynı ayakta karşılıklı şiir; lebdeğmez.",
      "Yansıtıcı yazı: gözlem, duygu, bilgi, değerlendirme."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Yaşamın İzinde",
   "en": "Theme 3: In the Footsteps of Life"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Roman: Huzur (Ahmet Hamdi Tanpınar) ve hayalî mülakat",
     "en": "Novel: Huzur and an imaginary interview"
    },
    "content": {
     "anlatim": "# Huzur (1949)\n\nAhmet Hamdi Tanpınar'ın, Türk edebiyatının en önemli **modern romanlarından** biri. II. Dünya Savaşı arifesinde İstanbul'da geçer.\n\n| Unsur | Açıklama |\n|---|---|\n| **Kişiler** | **Mümtaz** (ana kişi), **Nuran** (sevgili), **İhsan** (Mümtaz'ın amcazadesi, düşünce rehberi), **Suat** (karanlık, yıkıcı karakter) |\n| **Bölümler** | İhsan – Nuran – Suat – Mümtaz |\n| **Temalar** | **Doğu–Batı** çatışması ve sentez arayışı, **zaman** (geçmiş–şimdi), **musiki** (klasik Türk müziği, Ferahfeza peşrevi), aşk, ölüm, huzur arayışı |\n| **Mekân** | **İstanbul** (Boğaziçi) bir karakter gibi işlenir |\n| **Teknikler** | **İç monolog**, **bilinç akışı**, geriye dönüş, çağrışım |\n| **Üslup** | Şiirsel, imge yüklü, kültürlü |\n\n**Yazar–eser ilişkisi:** Tanpınar'ın İstanbul sevgisi, musiki tutkusu, Doğu–Batı sentezi arayışı ve *Beş Şehir*'deki geçmişle bağ kurma düşüncesi romana doğrudan yansır. Diğer eserleri: *Saatleri Ayarlama Enstitüsü*, *Sahnenin Dışındakiler*, *Mahur Beste*, *Beş Şehir*.\n\n**Kişi tanıtımı:** Doğrudan (anlatıcının nitelemesi) ve **dolaylı** (davranış, konuşma, düşüncelerle) tanıtım.\n\n# Hayalî Mülakat\n\nRomandaki bir kişiyle **romanın bağlamına uygun** soru–cevap biçiminde hayalî konuşma.\n- Kişinin karakteri, yaşadıkları, duyguları ve düşünce dünyası dikkate alınır.\n- Sorular **açık uçlu** olmalı; cevaplar metne dayanmalı.\n- Mülakat sorusu örneği: \"Mümtaz Bey, sizin için huzur nedir? Nuran'la tanışmanız bu duyguyu nasıl değiştirdi?\"",
     "ornekler": [
      {
       "soru": "Huzur romanında İstanbul'un 'bir karakter gibi' işlenmesi ne demektir?",
       "cozum": "İstanbul yalnızca olayların geçtiği bir **dekor** değildir; Boğaz, semtler, mevsimler ve kültürel geçmişiyle kişilerin **ruh hâllerini**, Doğu–Batı sentezini ve zaman temasını taşıyan **canlı bir unsur** olarak anlatılır."
      }
     ],
     "ozet": [
      "Huzur: Mümtaz, Nuran, İhsan, Suat; İstanbul ve musiki.",
      "Temalar: Doğu–Batı, zaman, aşk, huzur.",
      "Teknik: iç monolog, bilinç akışı; şiirsel üslup."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Biyografi (Mehmet Âkif Ersoy) ve tezkire",
     "en": "Biography and tezkire"
    },
    "content": {
     "anlatim": "# Biyografi (Yaşam Öyküsü)\n\nBir kişinin hayatını, eserlerini ve düşünce dünyasını **belgelere ve tanıklıklara** dayanarak anlatan **öğretici** metin.\n- **Nesnel** olmaya çalışır; yazarın seçimleri ve bakış açısı metni etkiler.\n- **Otobiyografi:** Kişinin kendi hayatını anlatması.\n\n| Biyografi | Roman |\n|---|---|\n| **Gerçek** kişi ve olaylar | **Kurmaca** kişi ve olaylar |\n| Belgeye dayanır, nesnellik iddiası | Hayal gücüne dayanır, öznellik |\n| Öğretici | Sanatsal |\n\n# Mehmet Âkif Ersoy (1873–1936)\n\n- İstanbul'da doğdu; **Halkalı Ziraat ve Baytar Mektebi**'ni bitirip veteriner olarak çalıştı.\n- **Millî Mücadele**'de Anadolu'da halkı direnişe çağıran vaazlar verdi; **Burdur mebusu** olarak I. TBMM'ye katıldı.\n- **İstiklal Marşı** (1921) — TBMM tarafından kabul edildi; Âkif ödül parasını bağışladı.\n- 1925'ten sonra **Mısır**'da yaşadı; hastalanınca İstanbul'a döndü ve öldü.\n- **Safahat** (7 kitap): manzum hikâyeler, toplumsal sorunlara duyarlılık, **aruz**u konuşma diline yaklaştırması, **İslamcı** düşünce, gerçekçi gözlem.\n\n# Tezkire\n\nDivan edebiyatında şairlerin **kısa hayat hikâyelerini**, edebî kişiliklerini ve şiirlerinden **örnekleri** içeren biyografik-antolojik eser.\n- İlk Türkçe tezkire: **Ali Şîr Nevâî – *Mecâlisü'n-Nefâis***; Anadolu'da ilk: **Sehî Bey – *Heşt Behişt***. Latîfî, Âşık Çelebi, Kınalızâde Hasan Çelebi diğer önemli tezkirecilerdir.\n- İçerik: şairin adı, **mahlası**, mesleği, hocaları, dostları, ölüm tarihi, **seçme beyitler**.\n- Divan şairi **Usûlî**'yi tanıtan tezkire metni üzerinden kişi tanıtım teknikleri ve dönemin süslü üslubu incelenir.\n- Tezkireler **edebiyat tarihimizin birincil kaynaklarıdır**.",
     "ornekler": [
      {
       "soru": "Tezkire ile biyografi arasındaki benzerlik ve fark nedir?",
       "cozum": "İkisi de **gerçek kişilerin** hayatını anlatır. **Tezkire** divan edebiyatına özgüdür; **çok sayıda şairi** kısa biçimde tanıtır ve şiir örnekleriyle **antoloji** işlevi görür, üslubu genellikle **süslüdür**. **Biyografi** tek kişiye odaklanır, daha ayrıntılı ve sade bir anlatım kullanır."
      }
     ],
     "ozet": [
      "Biyografi gerçek ve öğretici; roman kurmaca.",
      "Âkif: İstiklal Marşı, Safahat, Burdur mebusu, Mısır yılları.",
      "Tezkire: şair biyografileri + seçme şiirler; ilk Türkçe Nevâî."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Radyo tiyatrosu ve diyalog dönüştürme",
     "en": "Radio drama and converting dialogue"
    },
    "content": {
     "anlatim": "# Radyo Tiyatrosu\n\nYalnızca **işitsel** unsurlarla (diyalog, ses tonu, **müzik, efekt, sessizlik**) anlatılan tiyatro türü. Görsellik olmadığından **dinleyici sahneyi zihninde kurar**.\n\n**Çözümlemede dikkat edilecekler:**\n- Diyalogların yapısı ve **ritmi**\n- **Ses efektlerinin işlevi** (mekân: dalga sesi; zaman: saat tıkırtısı; duygu: gerilim müziği)\n- **Gerilim** yaratma teknikleri\n- Karakterin **ses tonu, üslup ve söz varlığıyla** kurulması\n- **Anlatıcının** varlığı ya da yokluğu\n\n**Örnek metin:** *Direnişin Ustaları*.\n\n# Diyalog Dönüştürme\n\nRadyo tiyatrosu ya da romandan seçilen bir diyaloğu **başka bir türe** (öykü, mektup, günlük, şiir, haber metni) çevirme.\n- **Bağlam ve temel anlam korunur.**\n- Hedef türün **yapı, dil ve üslup** kurallarına uyulur (ör. mektupta hitap ve kapanış, haberde 5N1K).\n- Diyalogdaki söylenmeyen duygular, hedef türde **anlatıcı** aracılığıyla görünür hâle getirilebilir.",
     "ornekler": [
      {
       "soru": "Radyo tiyatrosunda ses efektleri neden sahne tiyatrosundan daha önemlidir?",
       "cozum": "Radyo tiyatrosunda **dekor, kostüm ve görüntü yoktur**; mekânı, zamanı ve atmosferi dinleyiciye yalnızca **ses, müzik ve efektler** aktarır."
      }
     ],
     "ozet": [
      "Radyo tiyatrosu: yalnızca işitsel; dinleyici sahneyi hayal eder.",
      "Efektler mekân, zaman ve duygu yaratır.",
      "Diyalog dönüştürmede bağlam korunur, hedef türün kurallarına uyulur."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Tanzimat dönemi Türk edebiyatı (1860–1896)",
     "en": "Turkish literature of the Tanzimat period (1860–1896)"
    },
    "content": {
     "anlatim": "# Dönemin Özellikleri\n\n- Başlangıç: **Tercüman-ı Ahvâl** gazetesi (**1860**, Şinasi – Agâh Efendi). Batı etkisinde **ilk** edebî dönem.\n- Edebiyat **halkı eğitmek** için bir araçtır (**sanat toplum içindir** — I. kuşak).\n- Batı'dan alınan türler: **roman, hikâye, tiyatro, makale, eleştiri, gazete**.\n- Dil sadeleşmesi savunulur ama uygulamada tam başarılamaz.\n\n# İki Kuşak\n\n| | I. Kuşak (toplum için sanat) | II. Kuşak (sanat için sanat) |\n|---|---|---|\n| Temsilciler | **Şinasi, Namık Kemal, Ziya Paşa, Ahmet Mithat** | **Recaizade Mahmut Ekrem, Abdülhak Hâmit Tarhan, Sami Paşazade Sezai** |\n| Konular | Vatan, hürriyet, adalet, eşitlik | Aşk, ölüm, doğa, karamsarlık |\n| Dil | Görece sade | Ağırlaşır |\n\n# İlkler\n\n| Eser | Yazar | İlk |\n|---|---|---|\n| **Şair Evlenmesi** (1860) | Şinasi | İlk yerli tiyatro |\n| **Tercüme-i Manzume** | Şinasi | İlk şiir çevirisi |\n| **Telemak** çevirisi | Yusuf Kâmil Paşa | İlk roman çevirisi |\n| **Letâif-i Rivâyât** | Ahmet Mithat | İlk hikâye denemeleri |\n| **Taaşşuk-ı Talat ve Fitnat** | Şemsettin Sami | İlk yerli roman |\n| **İntibah** | Namık Kemal | İlk edebî roman |\n| **Araba Sevdası** | Recaizade M. Ekrem | İlk realist roman |\n| **Sergüzeşt** | Sami Paşazade Sezai | Esaret konulu romantik roman |\n| **Vatan yahut Silistre** | Namık Kemal | Sahnelenen ünlü vatan oyunu |",
     "ornekler": [
      {
       "soru": "Tanzimat I. kuşak sanatçılarının edebiyatı bir araç olarak görmelerinin nedeni nedir?",
       "cozum": "Halkı **bilgilendirmek ve eğitmek**, Batı'dan gelen **hürriyet, vatan, eşitlik** düşüncelerini yaymak istemeleri (**toplum için sanat** anlayışı)."
      },
      {
       "soru": "Araba Sevdası'nın Türk edebiyatındaki önemi nedir?",
       "cozum": "**Recaizade Mahmut Ekrem**'in bu romanı Batılılaşmayı yanlış anlayan züppe tipini (Bihruz Bey) işleyen **ilk realist roman** kabul edilir."
      }
     ],
     "ozet": [
      "Başlangıç: Tercüman-ı Ahvâl (1860).",
      "I. kuşak toplum için sanat (Namık Kemal); II. kuşak sanat için sanat (R. M. Ekrem).",
      "İntibah ilk edebî roman, Araba Sevdası ilk realist roman."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Tema: Hayatın Aynası",
   "en": "Theme 4: The Mirror of Life"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Modern tiyatro: Ben, Mimar Sinan",
     "en": "Modern theatre: Ben, Mimar Sinan"
    },
    "content": {
     "anlatim": "# Modern Türk Tiyatrosu\n\n*Ben, Mimar Sinan*: Mimar Sinan'ın hayatı, sanat anlayışı, eserleri ve dönemin toplumsal-siyasal arka planı.\n\n**Dramatik örgü:** **Serim** (kişiler ve durum tanıtılır) → **Düğüm** (çatışma) → **Çözüm**.\n**Gösterme tekniği (showing):** Olaylar **anlatılmaz**, sahnede **canlandırılarak gösterilir**.\n\n| Unsur | Açıklama |\n|---|---|\n| **Sahne** | Oyunun oynandığı yer |\n| **Perde / tablo** | Oyunun bölümleri |\n| **Dekor** | Sahne düzeni ve eşyalar |\n| **Kostüm** | Oyuncu giysileri |\n| **Diyalog** | Karşılıklı konuşma |\n| **Monolog** | Tek kişinin kendi kendine konuşması |\n| **Yan tümce (parantez içi açıklama)** | Yazarın oyuncu ve yönetmene yönergeleri |\n| Jest, mimik, ışık, ses | Anlamı güçlendiren sahne öğeleri |\n\n# Geleneksel ve Modern Tiyatro\n\n| Geleneksel (Karagöz, ortaoyunu) | Modern |\n|---|---|\n| Doğaçlama, yazılı metin yok | **Yazılı metin** |\n| Gölge figürleri / meydan | Canlı oyuncular, sahne |\n| Mizah, taklit, toplumsal eleştiri | Dramatik gerilim, **psikolojik derinlik** |\n| Kalıp tipler | Bireysel, karmaşık karakterler |\n\n**Tiyatronun katkısı:** **Empati**, tarih ve kültür bilinci, sanat sevgisi, kimlik ve aidiyet, ahlaki düşünme.\n\n**Canlandırma:** rol dağılımı; ses tonu, vurgu ve tonlama; jest ve mimik; basit dekor; metne sadık kalarak doğaçlama eklemek → konuşma becerisi, özgüven, iş birliği.",
     "ornekler": [
      {
       "soru": "'Gösterme tekniği' ile 'anlatma tekniği' arasındaki fark nedir?",
       "cozum": "**Anlatma** (roman, hikâye) olayları bir **anlatıcı** aracılığıyla aktarır. **Gösterme** (tiyatro) olayları anlatıcı olmadan, kişilerin **konuşma ve eylemleriyle sahnede** doğrudan sunar."
      }
     ],
     "ozet": [
      "Dramatik örgü: serim, düğüm, çözüm.",
      "Unsurlar: sahne, perde, dekor, kostüm, diyalog, monolog.",
      "Geleneksel doğaçlama ve tip; modern yazılı metin ve birey."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Küçürek hikâye: Merdiven",
     "en": "Flash fiction: Merdiven"
    },
    "content": {
     "anlatim": "# Küçürek Hikâye (Minimal Öykü, Flash Fiction)\n\n- **Çok kısa** (birkaç satırdan birkaç paragrafa), **yoğun**; her kelime anlam yükü taşır.\n- **Gereksiz söz yoktur**; ima, çağrışım ve **boşluklar** güçlüdür.\n- Genellikle **sürpriz** ya da **düşündürücü, açık uçlu** son.\n- Okur metindeki boşlukları kendi deneyimleriyle doldurur → **okur–yazar iş birliği**.\n- **Dilin anlam oluşturma gücü** en belirgin biçimde bu türde görülür.\n- Temalar: insan durumu, yalnızlık, **ironi**, gündelik hayatın absürtlüğü, ölüm, zaman.\n\n**'Merdiven' örneği:** Kısa anlatım, yoğun imgeler, **açık uçlu** yapı. \"Merdiven\" hem somut bir nesne hem de **yükselme–düşme, hayatın basamakları** gibi sembolik anlamlar taşıyabilir.\n\n# Kurmaca Anlatı Türlerinin Karşılaştırılması\n\n| Roman | Hikâye | Küçürek hikâye |\n|---|---|---|\n| Uzun | Orta uzunlukta | **Çok kısa** |\n| Çok kişi, çok olay | Tek olay ya da hayattan **kesit** | Tek an ya da imge |\n| Geniş zaman ve mekân | Sınırlı | En dar |\n| Ayrıntılı tasvir | Daha az ayrıntı | **İma ve boşluk** |",
     "ornekler": [
      {
       "soru": "Küçürek hikâyede 'boşluk' neden önemlidir?",
       "cozum": "Metin kısa olduğundan yazar her şeyi söylemez; söylenmeyenler (**boşluklar**) okurun hayal gücü ve deneyimiyle doldurulur. Böylece anlam **okurla birlikte** kurulur ve metin çok anlamlı hâle gelir."
      }
     ],
     "ozet": [
      "Küçürek hikâye: çok kısa, yoğun, imalı, açık uçlu.",
      "Okur boşlukları doldurur.",
      "Roman > hikâye > küçürek hikâye: uzunluk ve kapsam."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Belgesel, afiş hazırlama ve genel karşılaştırmalar",
     "en": "Documentaries, poster design and overall comparisons"
    },
    "content": {
     "anlatim": "# Belgesel\n\nGerçek olay, kişi ya da olguyu **belgeleyen**, bilgi vermeyi ve farkındalık yaratmayı amaçlayan **görsel-işitsel** tür.\n**'Anadolu İnsanı / Fedakârlık'** belgeseli: fedakârlık, sabır, dayanışma, misafirperverlik, çalışkanlık; edebî eserlerle birlikte okunarak \"hayatın aynası\" teması güçlendirilir.\n\n# Özgün Afiş Hazırlama\n\n| Ölçüt | Açıklama |\n|---|---|\n| **Slogan** | Kısa, vurucu, akılda kalıcı |\n| **Renk** | Mesajın duygusuna uygun |\n| **Tipografi** | Okunaklı ve karakterli yazı |\n| **Görsel** | Fotoğraf, çizim ya da sembol |\n| **Düzen** | Dengeli, **görsel hiyerarşi** (önemli bilgi öne) |\n| **Özgünlük** | Taklit olmayan, estetik tasarım |\n\n# Genel Karşılaştırmalar (Sınav Notları)\n\n- **Öğretici metin** (mektup, dilekçe, biyografi, tezkire, anı, belgesel): gerçek bilgi, **nesnellik**, açıklık.\n- **Kurmaca metin** (hikâye, roman, tiyatro, küçürek hikâye): hayal ürünü, **öznellik**, sanat kaygısı, çok katmanlı anlam.\n- **Sözlü gelenek** (âşık atışması, Karagöz): canlılık, doğaçlama ↔ **yazılı gelenek** (Orhun, DLT, roman): kalıcılık, standartlaşma.\n\n**Metin–yazar eşleştirmeleri:** Tanpınar – *Huzur* · Âkif – *Safahat*, İstiklal Marşı · Aytmatov – *Oğulla Buluşma* · Cevdet Kudret – Karagöz derlemeleri · Kâşgarlı Mahmud – DLT.",
     "ornekler": [
      {
       "soru": "Bir belgesel için hazırlanan afişte 'görsel hiyerarşi' ne demektir?",
       "cozum": "En önemli bilginin (başlık, slogan) **en büyük ve en dikkat çekici** biçimde, ikincil bilgilerin (tarih, yer, ayrıntılar) daha küçük yerleştirilmesidir; göz önce ana mesaja yönelir."
      }
     ],
     "ozet": [
      "Belgesel: gerçeği belgeleyen görsel-işitsel tür.",
      "Afiş: slogan, renk, tipografi, görsel, düzen.",
      "Öğretici vs kurmaca; sözlü vs yazılı gelenek."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.4",
    "title": {
     "tr": "Servet-i Fünûn ve Fecr-i Âtî edebiyatı",
     "en": "Servet-i Fünûn and Fecr-i Âtî literature"
    },
    "content": {
     "anlatim": "# Servet-i Fünûn (Edebiyat-ı Cedîde, 1896–1901)\n\n- **Recaizade Mahmut Ekrem**'in yönetiminde **Servet-i Fünûn** dergisi çevresinde toplandılar; 1901'de dergi kapatılınca dağıldılar.\n- **Sanat için sanat**; **bireysel** konular (aşk, hayal kırıklığı, kaçış, karamsarlık). **II. Abdülhamit baskısı** nedeniyle siyasete girilmez; **\"Hayal–hakikat çatışması\"** ve **\"kaçış\" (firar)** temaları.\n- Dil **ağır**: Arapça–Farsça kelimeler, tamlamalar. **Aruz** ölçüsü, **serbest müstezat**, **sone** ve **terzarima** gibi Batı nazım şekilleri.\n- Şiirde **parnasizm** ve **sembolizm**; düzyazıda **realizm–natüralizm**. **Anlam bir beyitte tamamlanmaz** (bütün güzelliği).\n\n| Sanatçı | Tür | Önemli eserler |\n|---|---|---|\n| **Tevfik Fikret** | Şiir | Rübab-ı Şikeste, Haluk'un Defteri, **Sis**, Tarih-i Kadîm |\n| **Cenap Şahabettin** | Şiir | Tâmât; **sembolist**; \"Elhân-ı Şitâ\" |\n| **Halit Ziya Uşaklıgil** | Roman | **Mai ve Siyah**, **Aşk-ı Memnu** (Batılı teknikte ilk başarılı romanlar) |\n| **Mehmet Rauf** | Roman | **Eylül** (ilk psikolojik roman) |\n| **Hüseyin Cahit Yalçın** | Hikâye, roman | Hayat-ı Muhayyel |\n\n# Fecr-i Âtî (1909–1912)\n\n- \"Geleceğin şafağı\"; **Ahmet Haşim**, **Emin Bülend**, **Refik Halit**. Beyannamesi: \"**Sanat şahsî ve muhteremdir.**\"\n- Servet-i Fünûn'un devamı niteliğinde; kısa ömürlü olur.\n- **Ahmet Haşim** (sembolist): *Göl Saatleri*, *Piyâle*; \"O Belde\", \"Merdiven\". Şiirde **müzikalite** ve **telkin**.",
     "ornekler": [
      {
       "soru": "Servet-i Fünûn sanatçılarının toplumsal konulardan uzak durmasının temel nedeni nedir?",
       "cozum": "**II. Abdülhamit dönemi sansür ve baskısı**; sanatçılar bireysel konulara yönelmiş, hayal–hakikat çatışması ve **kaçış** temasını işlemiştir."
      },
      {
       "soru": "“Sanat şahsî ve muhteremdir” sözü hangi topluluğun ilkesidir ve topluluğun en önemli şairi kimdir?",
       "cozum": "**Fecr-i Âtî** topluluğunun; en önemli şairi sembolist **Ahmet Haşim**'dir."
      }
     ],
     "ozet": [
      "Servet-i Fünûn: sanat için sanat, ağır dil, sone–terzarima, karamsarlık.",
      "Halit Ziya: Mai ve Siyah, Aşk-ı Memnu; Mehmet Rauf: Eylül.",
      "Fecr-i Âtî: 'Sanat şahsî ve muhteremdir' — Ahmet Haşim."
     ]
    }
   }
  ]
 }
];
