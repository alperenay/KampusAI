/* =========================================================
   11. Sınıf Sosyoloji — konu anlatım notları (AYT Felsefe grubu)
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/sosyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Sosyolojiye Giriş",
   "en": "Unit 1: Introduction to Sociology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SOS.E1",
    "title": {
     "tr": "Sosyolojinin konusu, doğuşu ve öncüleri",
     "en": "Subject, birth and pioneers of sociology"
    },
    "content": {
     "anlatim": "# Sosyoloji Nedir?\n\nSosyoloji, **toplumsal ilişkileri, grupları, kurumları ve toplumsal olayları** bilimsel yöntemle inceleyen bilimdir. Bireyi tek başına değil, **toplum içindeki etkileşimleriyle** ele alır. Psikoloji bireyin iç süreçlerine, sosyoloji ise toplumsal yapıya odaklanır.\n\n# Doğuşu\n\nSosyoloji 19. yüzyılda **Sanayi Devrimi** ve **Fransız İhtilali**'nin yarattığı büyük toplumsal değişmelerin (kentleşme, işçi sınıfı, geleneksel bağların çözülmesi) anlaşılma ihtiyacıyla doğdu.\n- **İbn Haldun** (14. yy), *Mukaddime*'de toplumları ve devletlerin yükselip çöküşünü **asabiyet** (toplumsal dayanışma) kavramıyla açıklayarak sosyolojinin öncülerinden sayılır.\n- **Auguste Comte** \"sosyoloji\" adını koydu; **pozitivizmi** savundu (toplum da doğa gibi gözlem ve deneyle incelenmelidir). **Üç hâl yasası:** teolojik → metafizik → pozitif.\n\n# Klasik Kuramcılar\n\n| Düşünür | Ana fikir |\n|---|---|\n| **Émile Durkheim** | **Toplumsal olgular** bireyin dışında ve onu bağlayıcıdır; mekanik ve organik dayanışma; intihar araştırması |\n| **Karl Marx** | Toplumsal değişmenin itici gücü ekonomik yapı ve **sınıf çatışmasıdır** |\n| **Max Weber** | Toplumsal eylemi **anlamaya** çalışmak (anlayıcı sosyoloji); bürokrasi, Protestan ahlakı ve kapitalizm |\n| **Ziya Gökalp** | Türk sosyolojisinin kurucusu; **hars (kültür) ve medeniyet** ayrımı |\n\n# Yöntemler\n\nAnket, görüşme, gözlem (katılımlı/katılımsız), örnek olay, istatistiksel veriler ve **karşılaştırmalı** yöntem. Toplumsal olaylar çok etkenli olduğundan laboratuvar deneyi sınırlıdır.",
     "ornekler": [
      {
       "soru": "“Toplumsal olgular bireyin dışında var olur ve onu zorlayıcı bir güç uygular” görüşü hangi düşünüre aittir?",
       "cozum": "**Émile Durkheim**."
      },
      {
       "soru": "Sosyolojinin 19. yüzyılda ayrı bir bilim olarak doğmasının temel nedeni nedir?",
       "cozum": "Sanayi Devrimi ve Fransız İhtilali'nin yol açtığı **hızlı ve köklü toplumsal değişmeleri** anlama ve açıklama ihtiyacı."
      }
     ],
     "ozet": [
      "Sosyoloji toplumsal ilişkileri, grupları ve kurumları inceler.",
      "Comte adı koydu (pozitivizm); İbn Haldun öncüdür (asabiyet).",
      "Durkheim: toplumsal olgu; Marx: sınıf çatışması; Weber: anlayıcı sosyoloji.",
      "Ziya Gökalp: hars–medeniyet ayrımı."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Birey ve Toplum",
   "en": "Unit 2: Individual and Society"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SOS.E2",
    "title": {
     "tr": "Toplumsal etkileşim, statü, rol ve gruplar",
     "en": "Social interaction, status, role and groups"
    },
    "content": {
     "anlatim": "# Toplumsal Etkileşim ve İlişki\n\nİnsanların karşılıklı olarak birbirini etkilemesine **toplumsal etkileşim**, bu etkileşimin belirli bir süreklilik kazanmasına **toplumsal ilişki** denir. İlişki türleri: **iş birliği**, **yarışma (rekabet)**, **çatışma**, **uyum**.\n\n# Statü ve Rol\n\n- **Statü:** Bireyin toplumda bulunduğu konum (öğrenci, anne, doktor).\n  - **Verilmiş (doğuştan) statü:** Cinsiyet, yaş, akrabalık (kardeş, torun).\n  - **Kazanılmış statü:** Bireyin çabasıyla elde edilen (öğretmen, sporcu, mezun).\n- **Rol:** Statünün gerektirdiği, toplumca beklenen davranışlar.\n- **Rol çatışması:** Aynı kişinin farklı statülerinin beklentileri çeliştiğinde (hem öğrenci hem kulüp sporcusu olup sınav ile maç günü aynı olan genç).\n\n# Toplumsal Gruplar\n\nOrtak amaç ve kimlik duygusuyla, belirli bir süreklilik içinde etkileşen insan topluluğudur.\n| Birincil grup | İkincil grup |\n|---|---|\n| Küçük, yüz yüze, samimi ve duygusal ilişkiler | Büyük, resmî, amaca yönelik ilişkiler |\n| Aile, yakın arkadaş grubu | Okul yönetimi, şirket, sendika |\n- **Kalabalık (topluluk)** grup değildir: maç seyircisi, otobüs bekleyenler; aralarında kalıcı ilişki yoktur.\n- **Referans grubu:** Bireyin üyesi olmasa bile kendini kıyasladığı ve örnek aldığı grup.",
     "ornekler": [
      {
       "soru": "“Doktor” statüsü verilmiş mi kazanılmış mı bir statüdür? “Torun” statüsü nedir?",
       "cozum": "Doktorluk eğitim ve çabayla elde edildiği için **kazanılmış**, torunluk doğuştan geldiği için **verilmiş** statüdür."
      },
      {
       "soru": "Hem anne hem hemşire olan bir kadının, çocuğu hastalandığı gün nöbete çağrılması hangi kavramı örnekler?",
       "cozum": "**Rol çatışması**: farklı statülerin (anne ve hemşire) beklentileri aynı anda çelişiyor."
      }
     ],
     "ozet": [
      "Statü toplumsal konum, rol o konumdan beklenen davranıştır.",
      "Verilmiş statü doğuştan, kazanılmış statü çabayla edinilir.",
      "Birincil gruplar samimi ve yüz yüze, ikincil gruplar resmî ve amaca yöneliktir.",
      "Kalabalık bir toplumsal grup değildir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "SOS.E3",
    "title": {
     "tr": "Sosyalleşme, toplumsal kontrol ve sapma",
     "en": "Socialisation, social control and deviance"
    },
    "content": {
     "anlatim": "# Sosyalleşme\n\nBireyin içinde yaşadığı toplumun değerlerini, normlarını ve rollerini **öğrenerek** toplumun bir üyesi hâline gelmesi sürecidir; ömür boyu sürer.\n- **Birincil sosyalleşme:** Çocuklukta, ağırlıklı olarak **ailede**; dil, temel değerler.\n- **İkincil sosyalleşme:** Okul, arkadaş grubu, iş yeri ve kitle iletişim araçlarıyla.\n- **Sosyalleşme araçları:** Aile, okul, akran grubu, medya ve sosyal medya, din kurumları.\n- **Yeniden sosyalleşme:** Yeni bir ortama (askerlik, göç, emeklilik) uyum için eski davranışların değiştirilmesi.\n\n# Toplumsal Normlar ve Kontrol\n\n- **Norm:** Toplumun beklediği davranış kuralları. Gelenek, görenek, örf, âdet, ahlak, hukuk, moda.\n- **Toplumsal kontrol:** Bireylerin normlara uymasını sağlayan mekanizmalar.\n  - **Resmî (formal) kontrol:** Yazılı hukuk kuralları, polis, mahkeme, okul yönetmeliği.\n  - **Gayriresmî (informal) kontrol:** Ayıplama, dışlama, övgü, dedikodu.\n- **Yaptırım:** Normlara uyanı ödüllendirme, uymayanı cezalandırma.\n\n# Toplumsal Sapma\n\nToplumun normlarından ayrılan davranıştır. Sapmanın tanımı zamana ve topluma göre değişir; her sapma suç değildir (ör. aşırı farklı giyinmek). Durkheim'a göre makul düzeyde sapma, normların sınırlarını belirginleştirerek toplumsal değişmeye katkı da sağlayabilir.",
     "ornekler": [
      {
       "soru": "Toplu taşımada yaşlıya yer vermeyen gence diğer yolcuların ayıplayarak bakması hangi kontrol türüdür?",
       "cozum": "**Gayriresmî toplumsal kontrol** (yazılı olmayan, kınama yoluyla yaptırım)."
      },
      {
       "soru": "Başka bir ülkeye göç eden ailenin yeni ülkenin dilini ve kurallarını öğrenmesi hangi süreçtir?",
       "cozum": "**Yeniden sosyalleşme**."
      }
     ],
     "ozet": [
      "Sosyalleşme: toplumun değer ve normlarını öğrenme; ömür boyu sürer.",
      "Birincil sosyalleşme ailede, ikincil sosyalleşme okul ve diğer kurumlarda.",
      "Resmî kontrol hukuk ve kurumlarla, gayriresmî kontrol ayıplama ve övgüyle sağlanır.",
      "Her sapma suç değildir; sapmanın tanımı topluma göre değişir."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Toplumsal Yapı ve Kurumlar",
   "en": "Unit 3: Social Structure and Institutions"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SOS.E4",
    "title": {
     "tr": "Toplumsal yapı ve temel toplumsal kurumlar",
     "en": "Social structure and basic social institutions"
    },
    "content": {
     "anlatim": "# Toplumsal Yapı\n\nBir toplumu oluşturan statüler, roller, gruplar ve kurumların birbirine bağlı **görece kalıcı düzenidir**. Bir öğedeki değişme diğerlerini de etkiler.\n\n# Toplumsal Kurumlar\n\nToplumun temel ihtiyaçlarını karşılamak için oluşmuş, kuralları belirli, **süreklilik gösteren** yapılardır.\n| Kurum | Temel işlevi |\n|---|---|\n| **Aile** | Neslin devamı, çocuğun bakımı ve birincil sosyalleşme, duygusal destek |\n| **Eğitim** | Bilgi ve kültürün aktarılması, meslek kazandırma, toplumsal hareketlilik |\n| **Ekonomi** | Üretim, dağıtım ve tüketimin düzenlenmesi |\n| **Siyaset (devlet)** | Düzen ve güvenlik, kuralların konulması ve uygulanması |\n| **Din** | Anlam ve değer sistemi sunma, toplumsal bütünleşme |\n\n# Aile Türleri ve Değişim\n\n- **Geniş aile:** Birden çok kuşağın bir arada yaşadığı, tarım toplumlarında yaygın aile.\n- **Çekirdek aile:** Anne, baba ve evlenmemiş çocuklar; sanayileşme ve kentleşmeyle yaygınlaşmıştır.\n- Sanayileşmeyle ailenin bazı işlevleri (eğitim, üretim, sağlık) **başka kurumlara** devredilmiştir.\n\n# Toplumsal Tabakalaşma ve Hareketlilik\n\nToplumun gelir, eğitim, meslek ve saygınlık bakımından katmanlara ayrılmasıdır. **Dikey hareketlilik** statünün yükselmesi ya da düşmesi (eğitim yoluyla yükselme), **yatay hareketlilik** aynı düzeyde yer değiştirmedir.",
     "ornekler": [
      {
       "soru": "Sanayileşmeyle ailenin hangi işlevleri başka kurumlara geçmiştir?",
       "cozum": "Eğitim (okullar), üretim (fabrikalar, iş yerleri), sağlık ve yaşlı bakımı (hastaneler, bakım kurumları) gibi işlevler büyük ölçüde başka kurumlara devredilmiştir."
      },
      {
       "soru": "Köyde çiftçilik yapan bir ailenin çocuğunun üniversiteyi bitirip mühendis olması hangi kavramı örnekler?",
       "cozum": "**Dikey (yukarı doğru) toplumsal hareketlilik**; eğitim kurumu bu hareketliliğin başlıca aracıdır."
      }
     ],
     "ozet": [
      "Toplumsal yapı: statü, rol, grup ve kurumların görece kalıcı düzeni.",
      "Temel kurumlar: aile, eğitim, ekonomi, siyaset, din.",
      "Kentleşmeyle geniş aileden çekirdek aileye geçiş hızlanmıştır.",
      "Dikey hareketlilik statünün değişmesi, yatay hareketlilik aynı düzeyde yer değiştirmedir."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Kültür ve Toplumsal Değişme",
   "en": "Unit 4: Culture and Social Change"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SOS.E5",
    "title": {
     "tr": "Kültür: öğeleri, özellikleri ve kültürel süreçler",
     "en": "Culture: elements, features and cultural processes"
    },
    "content": {
     "anlatim": "# Kültür\n\nBir toplumun yaşayış biçimi; tarihsel süreçte oluşturduğu **maddi ve manevi** değerlerin bütünüdür.\n- **Maddi kültür:** Araç gereç, yapı, giysi, teknoloji.\n- **Manevi kültür:** Dil, din, gelenek, değer, sanat, inanç.\n\n# Özellikleri\n\nKültür **öğrenilir** (doğuştan gelmez), **toplumsaldır**, kuşaktan kuşağa **aktarılır**, **değişir**, ihtiyaçları karşılar ve toplumu bütünleştirir.\n\n# Kültürel Süreçler\n\n| Kavram | Anlamı |\n|---|---|\n| **Kültürleşme** | Kültürlerin karşılıklı etkileşimle değişmesi |\n| **Kültürel yayılma** | Bir kültür öğesinin başka toplumlara geçmesi |\n| **Kültürlenme** | Bireyin kendi kültürünü öğrenmesi |\n| **Kültür şoku** | Farklı bir kültürle karşılaşınca yaşanan uyumsuzluk ve şaşkınlık |\n| **Kültürel gecikme (Ogburn)** | Maddi kültürün manevi kültürden **hızlı** değişmesiyle oluşan uyumsuzluk (teknoloji hızlı değişir, kurallar geride kalır) |\n| **Asimilasyon** | Bir kültürün başka bir kültür içinde kendi özelliklerini yitirerek erimesi |\n| **Etnosentrizm** | Kendi kültürünü üstün görüp diğerlerini onun ölçütleriyle değerlendirme |\n| **Kültürel görecelik** | Her kültürü kendi koşulları içinde anlamaya çalışmak |\n\n# Alt Kültür\n\nToplumun genel kültürü içinde yer alan ama kendine özgü özellikleri olan kültür (gençlik kültürü, bölgesel yemek kültürleri).",
     "ornekler": [
      {
       "soru": "Sosyal medyanın çok hızlı yaygınlaşmasına karşın kişisel verilerin korunmasına yönelik kuralların geç oluşması hangi kavramla açıklanır?",
       "cozum": "**Kültürel gecikme**: maddi kültür (teknoloji) manevi kültürden (kurallar, değerler) hızlı değişmiştir."
      },
      {
       "soru": "Yurt dışına öğrenim için giden bir gencin ilk aylarda yeni ülkenin yaşam biçimine uyum sağlamakta zorlanması nedir?",
       "cozum": "**Kültür şoku**."
      }
     ],
     "ozet": [
      "Kültür maddi ve manevi öğelerden oluşur; öğrenilir ve aktarılır.",
      "Kültürleşme etkileşimle değişme, kültürlenme bireyin kendi kültürünü öğrenmesidir.",
      "Kültürel gecikme: maddi kültürün manevi kültürden hızlı değişmesi.",
      "Etnosentrizm kendi kültürünü üstün görmek, kültürel görecelik her kültürü kendi bağlamında anlamaktır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "SOS.E6",
    "title": {
     "tr": "Toplumsal değişme, kentleşme ve küreselleşme",
     "en": "Social change, urbanisation and globalisation"
    },
    "content": {
     "anlatim": "# Toplumsal Değişme\n\nToplumsal yapıda, kurumlarda ve ilişkilerde zaman içinde oluşan farklılaşmadır.\n**Etkenleri:** Teknolojik gelişmeler, ekonomik değişmeler, nüfus hareketleri (göç), eğitim, savaşlar ve doğal afetler, iletişim ve kültürel etkileşim, siyasi kararlar ve reformlar.\n\n# Değişmeyi Açıklayan Yaklaşımlar\n\n- **Evrimci yaklaşım** (Comte, Spencer): Toplumlar basitten karmaşığa doğru aşamalarla gelişir.\n- **Döngüsel yaklaşım** (İbn Haldun): Toplumlar doğar, gelişir, çöker; süreç tekrar eder.\n- **Çatışmacı yaklaşım** (Marx): Değişmenin kaynağı çıkar çatışmalarıdır.\n- **İşlevselci yaklaşım** (Durkheim, Parsons): Toplum dengeye yönelir; değişme yeni dengeye ulaşma sürecidir.\n\n# Kentleşme\n\nSanayileşmeyle kırdan kente göç ve kent nüfusunun artmasıdır. Sonuçları: çekirdek ailenin yaygınlaşması, ikincil ilişkilerin artması, iş bölümü ve uzmanlaşma; plansız kentleşmede gecekondulaşma, altyapı ve trafik sorunları.\n\n# Küreselleşme\n\nEkonomik, kültürel, siyasi ve teknolojik ilişkilerin dünya ölçeğinde yoğunlaşmasıdır. **İnternet, uluslararası ticaret ve ulaşım** hızlandırıcıdır.\n- Olumlu yanları: bilgiye erişim, bilimsel iş birliği, kültürel tanışma.\n- Tartışılan yanları: yerel kültürlerin tek tipleşme (**kültürel homojenleşme**) tehlikesi, gelir eşitsizliği, çevre sorunları. Buna karşılık yerel kimliklere ilgi de artabilir (**yerelleşme**).",
     "ornekler": [
      {
       "soru": "“Toplumlar insanlar gibi doğar, büyür, yaşlanır ve ölür” görüşü hangi değişme yaklaşımına aittir? Temsilcisi kimdir?",
       "cozum": "**Döngüsel yaklaşım**; temsilcisi **İbn Haldun**."
      },
      {
       "soru": "Dünyanın farklı ülkelerinde aynı dizilerin izlenmesi ve aynı moda akımlarının yaygınlaşması hangi kavramla ilgilidir?",
       "cozum": "**Küreselleşme** (ve onun sonucu olarak kültürel homojenleşme eğilimi)."
      }
     ],
     "ozet": [
      "Değişme etkenleri: teknoloji, ekonomi, göç, eğitim, iletişim, savaş ve afetler.",
      "Yaklaşımlar: evrimci, döngüsel (İbn Haldun), çatışmacı (Marx), işlevselci.",
      "Kentleşme çekirdek aileyi ve ikincil ilişkileri yaygınlaştırır.",
      "Küreselleşme hem etkileşimi hem tek tipleşme tartışmalarını beraberinde getirir."
     ]
    }
   }
  ]
 }
];
