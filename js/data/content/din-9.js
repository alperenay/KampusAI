/* =========================================================
   9. Sınıf Din Kültürü ve Ahlak Bilgisi — kazanım konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Din Kültürü ve Ahlak Bilgisi Ders Kitabı Ayrıntılı Kazanım Konu Anlatım Notları" (5 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Kaynaktaki yazım hataları düzeltildi; bazı tablolar ve örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/din"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Allah-İnsan İlişkisi",
   "en": "Unit 1: The Relationship Between God and Humans"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "İnsan ve insanın yaratılışı",
     "en": "Humans and the creation of humans"
    },
    "content": {
     "anlatim": "# Evrendeki Düzen ve Amaç\n\nYüce Allah evreni ve içindeki her şeyi **belli bir ölçü ve amaç** doğrultusunda yaratmıştır. Gök cisimlerinin düzenli hareketi, gece ile gündüzün ardı ardına gelmesi bu düzenin göstergeleridir.\n\n# İnsanın Yaratılış Aşamaları\n\nKur'an-ı Kerim'de insanın yaratılışı aşamalar hâlinde anlatılır:\n\n**toprak → süzülmüş bir öz → nutfe → alaka → bir parça et (mudga) → kemiklerin etle kaplanması → \"başka bir yaratılış\"la insan**\n\n- **Nutfe:** döllenmiş hücre (zigot) aşaması\n- **Alaka:** rahim duvarına tutunan, aşılanmış yumurta aşaması\n\n# İnsanın Üstün Özellikleri\n\n- Allah insana **akıl, ilim (bilgi edinme) ve irade** gibi nimetler vermiş, onu pek çok varlıktan üstün kılmıştır.\n- İnsan yeryüzünde **halife** olarak görevlendirilmiştir.\n- İnsana ilahi bir **emanet** (sorumluluk bilinci) yüklenmiştir.\n\n# Sosyal ve Öğrenen Bir Varlık\n\n- İnsan **sosyal ilişkiler** kurabilen ve **öğrenebilen** bir varlıktır; Hz. Âdem'e varlıkların **isimleri öğretilmiştir**.\n- İnsanın temel yaratılış amacı: **Rabbini tanımak, O'na kulluk etmek ve salih ameller işlemek**.",
     "ornekler": [
      {
       "soru": "İnsanın yeryüzünde \"halife\" olarak görevlendirilmesi ne anlama gelir?",
       "cozum": "İnsanın akıl ve irade sahibi bir varlık olarak yeryüzünde **sorumluluk** taşıması; dünyayı imar etmesi, adaletle davranması ve kendisine verilen **emanete** (sorumluluğa) sahip çıkması demektir."
      },
      {
       "soru": "İnsanı diğer varlıklardan ayıran özellikler nelerdir?",
       "cozum": "**Akıl, irade, bilgi edinme (öğrenme)** yeteneği; sorumluluk (emanet) taşıması, sosyal bir varlık olması ve Rabbini tanıyıp O'na kulluk edebilmesi."
      }
     ],
     "ozet": [
      "Evren bir ölçü ve amaç doğrultusunda yaratılmıştır.",
      "Yaratılış: toprak → süzülmüş öz → nutfe → alaka → mudga → kemik/et → insan.",
      "İnsan: akıl, ilim, irade sahibi; **halife** ve **emanet** taşıyıcısı.",
      "Yaratılış amacı: Rabbini tanımak, kulluk etmek, salih amel işlemek."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Doğruyu arayan bir varlık olarak insan",
     "en": "Humans as seekers of truth"
    },
    "content": {
     "anlatim": "# Tefekkür\n\nVarlıkların anlamını kavramak için **aklı işletmek, derin düşünmektir**. İnsan çevresini gözlemleyerek ve akıl yürüterek bir **Yaratıcı**'nın varlığına ulaşabilir.\n\n# Bilgi Kaynakları\n\n| Kaynak | Açıklama |\n|---|---|\n| **Selim akıl** | Sağlıklı düşünen, doğru akıl yürüten akıl |\n| **Salim duyu organları** | Sağlıklı duyular (görme, işitme vb.) |\n| **Doğru haber (vahiy)** | Peygamberler aracılığıyla gelen ilahi bilgi |\n\n> Akıl ve duyular her şeyi tek başına kuşatamaz; bu yüzden Allah insanlara **peygamberler ve ilahi kitaplar** göndermiştir.\n\n# Fıtrat ve Mükellefiyet\n\n- **Fıtrat:** İnsanın doğuştan sahip olduğu, **inanmaya ve hakikate yönelmeye yatkın** iç yetenek.\n- **Mükellef:** **Akli dengesi yerinde**, **ergenlik çağına ulaşmış** ve dinin emir ve yasaklarından sorumlu tutulan kişi.",
     "ornekler": [
      {
       "soru": "Bir kişinin dinî açıdan mükellef sayılması için hangi şartlar gerekir?",
       "cozum": "**Akıllı (akli dengesi yerinde)** ve **ergenlik çağına (buluğ)** ulaşmış olması. Bu şartları taşıyan kişi dinin emir ve yasaklarından sorumludur."
      },
      {
       "soru": "Akıl ve duyular varken vahye neden ihtiyaç duyulur?",
       "cozum": "Çünkü akıl ve duyular **sınırlıdır**; ahiret, varlığın amacı gibi pek çok konuyu tek başına kuşatamaz. Vahiy bu konularda insana **doğru haber** olarak yol gösterir."
      }
     ],
     "ozet": [
      "Tefekkür: aklı işleterek varlıkların anlamını kavramak.",
      "Bilgi kaynakları: selim akıl, salim duyular, vahiy (doğru haber).",
      "Fıtrat: inanmaya ve hakikate yatkın doğuştan yetenek.",
      "Mükellef = akıllı + ergen."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "İbadet ve dua eden bir varlık olarak insan",
     "en": "Humans as beings who worship and pray"
    },
    "content": {
     "anlatim": "# İbadet\n\n**Boyun eğme, itaat etme** ve Allah'ın rızasına uygun davranma bilincidir. İbadet insana Allah'a en yakın olma (**secde** hâli) ve O'nu **hamd** ile anma imkânı sunar.\n\n# Dua\n\nKulun **bütün benliğiyle** Allah'a yönelerek istekte bulunması, O'nunla iletişim kurmasıdır.\n> \"Dua, ibadetin özüdür.\" (Hadis-i şerif)\n\n# Tövbe ve Esmaülhüsna\n\n- **Tövbe:** Kulun hatasından **pişman olup** Allah'a dönmesi ve o hatayı tekrarlamamaya karar vermesidir.\n- Dualarda Allah'ın güzel isimleri (**esmaülhüsna**) anılarak bağışlanma dilenir:\n\n| İsim | Anlamı |\n|---|---|\n| **Mücîb** | Duaları kabul eden |\n| **Tevvâb** | Tövbeleri kabul eden |\n| **Settâr** | Kusurları örten |\n| **Gaffâr** | Günahları çokça bağışlayan |\n| **Afüvv** | Affeden, günahları silen |",
     "ornekler": [
      {
       "soru": "\"Dua, ibadetin özüdür\" sözünü açıklayın.",
       "cozum": "Dua, kulun Allah'a muhtaç olduğunu kabul edip **bütün benliğiyle O'na yönelmesidir**. Her ibadette bu yöneliş ve teslimiyet bulunduğu için dua, ibadetin **özü** sayılır."
      },
      {
       "soru": "Tövbelerin kabul edilmesini dileyen biri Allah'ın hangi ismini anar?",
       "cozum": "**Tevvâb** (tövbeleri kabul eden). Kusurlarının örtülmesini isterse **Settâr**, bağışlanmayı isterse **Gaffâr** ismini anar."
      }
     ],
     "ozet": [
      "İbadet: boyun eğme, itaat, Allah rızasına uygun davranma.",
      "Dua: Allah'a bütün benlikle yönelip istekte bulunmak; ibadetin özü.",
      "Tövbe: pişmanlık + Allah'a dönüş.",
      "Mücîb, Tevvâb, Settâr, Gaffâr, Afüvv."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Kur'an'dan mesajlar: Rûm suresi 17-27. ayetler",
     "en": "Messages from the Qur'an: Surah ar-Rum 17-27"
    },
    "content": {
     "anlatim": "# Rûm Suresi 17-27. Ayetlerin Mesajları\n\n- **Namaz vakitlerine** ve Allah'ı **tespih etmeye** işaret edilir.\n- **Ölüden dirinin çıkarılması** ve ölü toprağın yağmurla **canlandırılması**, **ahiret hayatının ve yeniden dirilişin** kanıtı olarak gösterilir.\n- Eşler arasında **huzur, sevgi ve merhamet** var edilmesi Allah'ın ayetlerindendir.\n- **Dillerin ve renklerin farklı** olması Allah'ın kudretinin delillerindendir.\n\n> Farklılıklar **üstünlük sebebi değil**, **tanışma vesilesidir**.",
     "ornekler": [
      {
       "soru": "Rûm suresinde yeryüzünün ölümünden sonra canlandırılması hangi inanç esasına kanıt olarak gösterilir?",
       "cozum": "**Ahiret ve yeniden diriliş** (baas). Kurumuş toprak nasıl yağmurla canlanıyorsa, insanlar da öldükten sonra yeniden diriltilecektir."
      },
      {
       "soru": "Ayetlerde dillerin ve renklerin farklılığına nasıl bakılır?",
       "cozum": "Bu farklılıklar **Allah'ın kudretinin delilleridir**; bir insanı diğerinden üstün kılmaz, insanların birbirini **tanıması** için bir vesiledir."
      }
     ],
     "ozet": [
      "Namaz vakitleri ve tespih vurgusu.",
      "Ölüden diri çıkarma, toprağın canlanması → ahiretin kanıtı.",
      "Eşler arasındaki sevgi ve merhamet Allah'ın ayetlerindendir.",
      "Dil ve renk farklılığı: üstünlük değil, tanışma vesilesi."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: İslam'da İnanç Esasları",
   "en": "Unit 2: Principles of Faith in Islam"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "İman ve imanın mahiyeti",
     "en": "Faith and its nature"
    },
    "content": {
     "anlatim": "# İman\n\nAllah'ın varlığına, birliğine ve dinin **kesin olarak bildirdiği** esaslara **kalben inanmak ve tasdik etmektir**. İnanan kişiye **mümin** denir.\n\n| Kavram | Anlamı |\n|---|---|\n| **Tasdik** | Kalp ile doğrulamak — **imanın aslıdır** |\n| **İkrar** | İnancın **dille** söylenmesi |\n| **Amel** | İnancın davranışa yansıması (salih ameller) |\n\n- **İman–amel ilişkisi:** İman kalpte başlar, **salih amellerle** (iyi işlerle) desteklenerek güçlenir.\n\n# Taklidî ve Tahkikî İman\n\n| Taklidî iman | Tahkikî iman |\n|---|---|\n| Çevrenin etkisiyle, **sorgulamadan** benimsenen iman | **Delillere, bilgiye ve araştırmaya** dayanan iman |\n| Şüphelere karşı daha kırılgandır | Bilinçli ve sağlamdır |",
     "ornekler": [
      {
       "soru": "Bir kişi inancını ailesinden gördüğü gibi, hiç araştırmadan sürdürüyor. Bu iman türü nedir?",
       "cozum": "**Taklidî iman.** Bilgi, delil ve araştırmaya dayanan iman ise **tahkikî iman**dır; İslam, inancın bilinçli ve araştırmaya dayalı olmasını teşvik eder."
      },
      {
       "soru": "İmanın aslı nedir? İkrar ne demektir?",
       "cozum": "İmanın aslı kalp ile **tasdik**tir. **İkrar** ise bu inancın dille ifade edilmesidir."
      }
     ],
     "ozet": [
      "İman: kalp ile tasdik; inanan kişi mümin.",
      "Tasdik (kalp) imanın aslı; ikrar dil ile söyleme.",
      "İman salih amellerle güçlenir.",
      "Taklidî: sorgulamadan · Tahkikî: delil ve araştırmaya dayalı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "İslam'da iman esasları",
     "en": "The articles of faith in Islam"
    },
    "content": {
     "anlatim": "# İman Esasları Bir Bütündür\n\nİslam'ın inanç esasları **bir bütündür**; kısımlara ayrılamaz ve **hepsinin** tasdik edilmesi gerekir.\n\n| # | Esas | Temel bilgi |\n|---|---|---|\n| 1 | **Allah'a iman (tevhit)** | Allah'ın **zatında, sıfatlarında ve fiillerinde bir** olması; O'na ortak koşmak **şirk**tir |\n| 2 | **Meleklere iman** | **Nurani** varlıklardır; iradeleri yoktur, sürekli Allah'a itaat ederler. Dört büyük melek: **Cebrail, Mikail, İsrafil, Azrail** |\n| 3 | **Kitaplara iman** | İnsanlığa rehber olarak gönderilen ilahi kitaplar: **Tevrat, Zebur, İncil, Kur'an-ı Kerim** |\n| 4 | **Peygamberlere iman** | İnsanlar arasından seçilen elçiler; son peygamber **Hz. Muhammed** |\n| 5 | **Ahirete iman** | Dünya hayatı geçici, ahiret ebedîdir; insan yaptıklarının hesabını verecektir |\n| 6 | **Kader ve kazaya iman** | **Kader:** evrendeki yasa ve ölçülerin Allah tarafından takdir edilmesi · **Kaza:** vakti gelince gerçekleşmesi |\n\n### Peygamberlerin ortak sıfatları\n\n| Sıfat | Anlamı |\n|---|---|\n| **Sıdk** | Doğruluk |\n| **Emanet** | Güvenilirlik |\n| **Fetanet** | Akıllılık, zekâ |\n| **İsmet** | Günah işlemekten korunmuşluk |\n| **Tebliğ** | İlahi mesajı eksiksiz iletme |\n\n### Ahiret hayatının aşamaları\n\n**ölüm → kabir → kıyamet → baas (yeniden diriliş) → haşir (toplanma) → hesap → mizan → sırat → cennet / cehennem**",
     "ornekler": [
      {
       "soru": "Peygamberlerin \"fetanet\" ve \"ismet\" sıfatları ne anlama gelir?",
       "cozum": "**Fetanet:** üstün akıl ve zekâya sahip olmak. **İsmet:** Allah tarafından günah işlemekten korunmuş olmak."
      },
      {
       "soru": "Kader ile kaza arasındaki fark nedir?",
       "cozum": "**Kader**, Allah'ın olacak her şeyi ölçü ve yasalarla **önceden takdir etmesi**; **kaza** ise bu takdirin **zamanı gelince gerçekleşmesidir**."
      },
      {
       "soru": "İman esaslarından birine inanıp diğerine inanmamak mümkün müdür?",
       "cozum": "Hayır. İman esasları **bir bütündür**; parçalara ayrılamaz, hepsinin birlikte tasdik edilmesi gerekir."
      }
     ],
     "ozet": [
      "6 iman esası: Allah, melekler, kitaplar, peygamberler, ahiret, kader-kaza.",
      "Tevhit: zat, sıfat ve fiillerde birlik; zıddı şirk.",
      "Dört büyük melek: Cebrail, Mikail, İsrafil, Azrail.",
      "Peygamber sıfatları: sıdk, emanet, fetanet, ismet, tebliğ.",
      "Kader = takdir; kaza = gerçekleşme."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "İmanın bireye ve topluma kazandırdıkları",
     "en": "What faith brings to individuals and society"
    },
    "content": {
     "anlatim": "# İmanın Kazandırdıkları\n\n| Bireye | Topluma |\n|---|---|\n| **İç huzur** ve güven | **Sevgi ve merhamet** |\n| **Sabır** ve zorluklara dayanma gücü | **Adalet** |\n| **Cesaret** ve umut | **Yardımlaşma ve dayanışma** |\n| Hayata anlam ve amaç | Toplumsal bağların güçlenmesi |\n\n> İman bireyin iç dünyasından başlayıp davranışlarına, oradan da topluma yansır.",
     "ornekler": [
      {
       "soru": "İmanın toplumsal hayata etkilerine iki örnek verin.",
       "cozum": "İnanan insanlar arasında **yardımlaşma ve dayanışma** artar; **adalet** ve **merhamet** bilinci toplumda güveni güçlendirir."
      },
      {
       "soru": "İman, zor bir durumla karşılaşan bir kişiye nasıl destek olur?",
       "cozum": "Kişiye **sabır**, **umut** ve **iç huzuru** kazandırır; Allah'a güvenmek (tevekkül) zorluklar karşısında direnç sağlar."
      }
     ],
     "ozet": [
      "Bireye: iç huzur, güven, sabır, cesaret.",
      "Topluma: sevgi, merhamet, adalet, yardımlaşma, dayanışma."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Kur'an'dan mesajlar: Bakara suresi 177. ayet",
     "en": "Messages from the Qur'an: Surah al-Baqarah 177"
    },
    "content": {
     "anlatim": "# Bakara Suresi 177. Ayet — \"Birr\" (İyilik)\n\nAyete göre iyilik (**birr**) yalnızca yüzü doğuya veya batıya çevirmek (şekilden ibaret bir dindarlık) **değildir**. Gerçek iyilik:\n\n1. **İman esaslarına** (Allah'a, ahiret gününe, meleklere, kitaplara, peygamberlere) inanmak,\n2. Sevdiği maldan **yakınlara, yetimlere, yoksullara**, yolda kalmışlara ve muhtaçlara harcamak,\n3. **Namaz kılmak** ve **zekât vermek**,\n4. **Sözünde durmak**,\n5. Darlık, hastalık ve zorluklar karşısında **sabretmektir**.\n\n> Ayet; **iman, ibadet, ahlak ve sosyal sorumluluğu** bir bütün olarak sunar.",
     "ornekler": [
      {
       "soru": "Bakara 177'ye göre \"iyilik\" (birr) yalnızca ibadetlerin şekline mi bağlıdır?",
       "cozum": "Hayır. Ayet iyiliğin **iman**, **ibadet** (namaz, zekât), **sosyal yardım** (yetim, yoksul, yakınlara harcama), **ahde vefa** ve **sabır**ın bir bütünü olduğunu bildirir."
      }
     ],
     "ozet": [
      "Birr = iyilik; şekilden ibaret değildir.",
      "İman + ibadet + infak + ahde vefa + sabır = gerçek iyilik."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: İslam'da İbadetler",
   "en": "Unit 3: Worship in Islam"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "İslam'da ibadetin kapsamı ve ilkeleri",
     "en": "The scope and principles of worship in Islam"
    },
    "content": {
     "anlatim": "# İbadetin Kapsamı\n\n| Genel anlamda ibadet | Özel anlamda ibadet |\n|---|---|\n| Müslümanın Allah'ın rızasına uygun **her güzel, faydalı ve ahlaki davranışı** | Din tarafından **şekli, zamanı ve kuralları** belirlenmiş fiiller |\n| Örnek: anne-babaya iyilik, birine yardım etmek, dürüst çalışmak | Örnek: **namaz, oruç, zekât, hac** |\n\n# İbadetin Temel İlkeleri\n\n| İlke | Açıklama |\n|---|---|\n| **Kur'an ve Sünnete uygunluk** | İbadetler Kur'an ve Hz. Peygamber'in uygulamasına göre yapılır |\n| **Niyet** | Yalnızca **Allah rızası** için yapılmalıdır |\n| **İhlas** | Samimiyet; gösterişten (**riya**) uzak durmak |\n| **Süreklilik** | Az da olsa **devamlı** olması |\n| **İtidal** | Ölçülü ve dengeli olmak, **aşırılıktan kaçınmak** |",
     "ornekler": [
      {
       "soru": "Bir öğrencinin yaşlı komşusunun alışverişini taşıması hangi anlamda ibadettir?",
       "cozum": "**Genel anlamda ibadet.** Allah rızasına uygun, faydalı ve ahlaki bir davranıştır; şekli ve zamanı din tarafından belirlenmiş bir ibadet değildir."
      },
      {
       "soru": "Bir kişi ibadetlerini başkaları görsün diye yapıyorsa hangi ilkeye aykırı davranmış olur?",
       "cozum": "**İhlas** ilkesine. Gösteriş amacıyla ibadet etmeye **riya** denir."
      }
     ],
     "ozet": [
      "Genel ibadet: Allah rızasına uygun her iyi davranış.",
      "Özel ibadet: şekli ve zamanı belirli (namaz, oruç, zekât, hac).",
      "İlkeler: Kur'an-Sünnet'e uygunluk, niyet, ihlas, süreklilik, itidal."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "İslam'da temel ibadetler",
     "en": "Basic acts of worship in Islam"
    },
    "content": {
     "anlatim": "# Hükümlerine Göre İbadetler\n\n| Hüküm | Açıklama |\n|---|---|\n| **Farz** | Yapılması kesin delillerle emredilen (beş vakit namaz, ramazan orucu) |\n| **Vacip** | Farz kadar kesin olmamakla birlikte yapılması gerekli (vitir namazı, kurban — Hanefi mezhebine göre) |\n| **Sünnet** | Hz. Peygamber'in yaptığı ve yapılmasını tavsiye ettiği |\n| **Mendup** | Yapılması güzel görülen, sevap kazandıran davranışlar |\n\n# Yapılış Şekline Göre İbadetler\n\n| Şekil | Örnekler |\n|---|---|\n| **Bedenle** yapılanlar | Namaz, oruç |\n| **Malla** yapılanlar | Zekât, kurban |\n| **Hem mal hem bedenle** yapılanlar | **Hac** |\n\n# Temizlik ve Namaz\n\n- Temizlik kuralları: **abdest, gusül** ve su bulunamadığında **teyemmüm**.\n- Namazın **hazırlık şartları** (namazdan önce: hadesten ve necasetten taharet, setr-i avret, istikbal-i kıble, vakit, niyet) ve **kılınış şartları** (namaz içinde: iftitah tekbiri, kıyam, kıraat, rükû, secde, ka'de-i ahîre) vardır.",
     "ornekler": [
      {
       "soru": "Hac neden \"hem mal hem bedenle\" yapılan ibadetler arasındadır?",
       "cozum": "Hac için hem **maddi imkân** (yolculuk ve konaklama masrafları) hem de **bedenî çaba** (tavaf, sa'y, vakfe) gerekir."
      },
      {
       "soru": "Su bulunamadığında veya kullanılamadığında abdest yerine ne yapılır?",
       "cozum": "**Teyemmüm** yapılır: temiz toprakla belirli şekilde yüz ve kollar meshedilir."
      }
     ],
     "ozet": [
      "Hükümlerine göre: farz, vacip, sünnet, mendup.",
      "Bedenle: namaz, oruç · Malla: zekât, kurban · İkisiyle: hac.",
      "Temizlik: abdest, gusül, teyemmüm.",
      "Namazın hazırlık (dış) ve kılınış (iç) şartları vardır."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "İnsan ve ibadet",
     "en": "Humans and worship"
    },
    "content": {
     "anlatim": "# İbadet Fıtri Bir İhtiyaçtır\n\n- İbadet insanın **ruhsal boşluğunu dolduran** ve kalbi **huzura** kavuşturan **fıtri** (doğuştan) bir ihtiyaçtır.\n- İbadetler insanda şu bilinçleri geliştirir:\n\n| Kavram | Anlamı |\n|---|---|\n| **Takva** | Allah'a saygıyla kötülüklerden sakınma |\n| **Tevazu** | Alçakgönüllülük |\n| **İhsan** | Allah'ı görüyormuş gibi kulluk etme bilinci |\n\n# İbadetlerin Hikmetleri\n\n| İbadet | Bireysel hikmet | Toplumsal hikmet |\n|---|---|---|\n| **Namaz** | Disiplin, huzur, kötülükten alıkoyma | Cemaatle birlik ve kaynaşma |\n| **Oruç** | Sabır, irade terbiyesi | Yoksulun hâlini anlama, paylaşma |\n| **Zekât** | Cimrilikten arınma | Zengin-yoksul arasında köprü, sosyal adalet |\n| **Hac** | Manevi arınma | Farklı milletlerden Müslümanların kardeşliği, eşitlik |",
     "ornekler": [
      {
       "soru": "Orucun toplumsal hikmetine bir örnek verin.",
       "cozum": "Açlığı bizzat yaşayan kişi **yoksulların hâlini anlar**; bu da paylaşmayı ve yardımlaşmayı artırır."
      },
      {
       "soru": "\"İhsan\" kavramını açıklayın.",
       "cozum": "Allah'ı görüyormuş gibi ibadet etmek; O'nu göremesek de **O'nun bizi gördüğü bilinciyle** davranmaktır."
      }
     ],
     "ozet": [
      "İbadet fıtri bir ihtiyaçtır; kalbe huzur verir.",
      "Takva: sakınma · Tevazu: alçakgönüllülük · İhsan: Allah'ı görüyormuş gibi kulluk.",
      "Her ibadetin hem bireysel hem toplumsal hikmeti vardır."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Kur'an'dan mesajlar: Bakara 21, Zâriyât 56, Hicr 99",
     "en": "Messages from the Qur'an: al-Baqarah 21, adh-Dhariyat 56, al-Hijr 99"
    },
    "content": {
     "anlatim": "# Ayetlerin Mesajları\n\n| Ayet | Anlam | Mesaj |\n|---|---|---|\n| **Bakara 21** | İnsanlar, sizi ve sizden öncekileri yaratan Rabbinize kulluk edin ki korunasınız. | Kulluk **bütün insanlara** yöneltilmiş bir çağrıdır; ibadet takvaya götürür |\n| **Zâriyât 56** | \"Ben cinleri ve insanları ancak bana kulluk etsinler diye yarattım.\" | İnsanın **varoluş amacı** kulluktur |\n| **Hicr 99** | \"Sana ölüm gelinceye kadar Rabbine ibadet et.\" | İbadette **süreklilik** esastır |",
     "ornekler": [
      {
       "soru": "İbadette sürekliliğin önemini vurgulayan ayet hangisidir?",
       "cozum": "**Hicr 99**: \"Sana ölüm gelinceye kadar Rabbine ibadet et.\""
      },
      {
       "soru": "Zâriyât 56. ayet insanın hangi özelliğine vurgu yapar?",
       "cozum": "İnsanın **yaratılış amacına**: Allah'a **kulluk** etmek."
      }
     ],
     "ozet": [
      "Bakara 21: kulluk çağrısı, takva.",
      "Zâriyât 56: yaratılış amacı kulluk.",
      "Hicr 99: ibadette süreklilik."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: İslam'da Ahlak İlkeleri",
   "en": "Unit 4: Moral Principles in Islam"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "İslam'da ahlakın mahiyeti",
     "en": "The nature of morality in Islam"
    },
    "content": {
     "anlatim": "# Ahlak Nedir?\n\nİnsanın **iyi veya kötü** olarak nitelendirilmesine yol açan **manevi nitelikleri ve iradi davranışlarıdır**.\n\n- İslam ahlakının kaynağı **Yüce Allah**'tır (Kur'an ve Sünnet).\n- Ahlakın temel unsurları: **akıl, irade, vicdan, nefs**.\n\n| Unsur | Rolü |\n|---|---|\n| **Akıl** | İyiyi kötüden ayırt eder |\n| **İrade** | Seçme ve karar verme gücü — sorumluluğun temeli |\n| **Vicdan** | İç ses; iyiyi yapınca huzur, kötüyü yapınca rahatsızlık duyma |\n| **Nefs** | İnsanın arzu ve istekleri; terbiye edilmesi gerekir |\n\n- **İdeal örnek: Hz. Muhammed (s.a.v.)** — \"Sen elbette yüce bir ahlak üzeresin.\" (Kalem, 4)",
     "ornekler": [
      {
       "soru": "Ahlaki sorumluluğun temeli neden \"irade\"dir?",
       "cozum": "Çünkü insan ancak **kendi isteği ve seçimiyle** yaptığı davranışlardan sorumlu tutulabilir. İradesi olmayan bir davranış ahlaki olarak değerlendirilmez."
      },
      {
       "soru": "Kalem suresi 4. ayet Hz. Muhammed'in hangi yönünü vurgular?",
       "cozum": "**Yüce ahlakını**; onun Müslümanlar için ahlakta **ideal örnek** olduğunu."
      }
     ],
     "ozet": [
      "Ahlak: iyi/kötü diye nitelenen manevi nitelikler ve iradi davranışlar.",
      "Kaynak: Allah (Kur'an ve Sünnet).",
      "Unsurlar: akıl, irade, vicdan, nefs.",
      "İdeal örnek: Hz. Muhammed (Kalem, 4)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Ahlakın temel erdemleri: adalet, şecaat, iffet, hikmet",
     "en": "The core virtues: justice, courage, chastity, wisdom"
    },
    "content": {
     "anlatim": "# İslam Ahlakının Dört Temel Erdemi\n\n| Erdem | Anlamı | Eksikliği ↔ Aşırılığı |\n|---|---|---|\n| **Adalet** | Ölçülü, dengeli ve **hakkaniyetli** olmak; herkese hakkını vermek | Zulüm |\n| **Şecaat** | Cesaret ve yiğitlik | **Korkaklık** ↔ **saldırganlık** (orta yol şecaattir) |\n| **İffet** | Bedenî ve maddi hazlar karşısında **ölçülü** olmak; namusu ve onuru korumak | Hazlara karşı ilgisizlik ↔ hazlara düşkünlük |\n| **Hikmet** | Aklın iman nuruyla aydınlanması; **bilgelik**, hakikati kavrama | Ahmaklık ↔ kurnazlık |\n\n> Erdem, iki aşırı uç arasındaki **orta yoldur** (itidal).",
     "ornekler": [
      {
       "soru": "Şecaat neden \"orta yol\" olarak tanımlanır?",
       "cozum": "Çünkü cesaretin **eksikliği korkaklık**, **aşırılığı saldırganlık**tır. Şecaat bu iki uç arasındaki dengeli tutumdur."
      },
      {
       "soru": "Bir hakemin her iki takıma da kurallara uygun ve eşit davranması hangi erdemle ilgilidir?",
       "cozum": "**Adalet** — ölçülü, dengeli ve hakkaniyetli davranıp herkese hakkını vermek."
      }
     ],
     "ozet": [
      "4 erdem: adalet, şecaat, iffet, hikmet.",
      "Şecaat = korkaklık ile saldırganlık arasındaki orta yol.",
      "Erdem iki uç arasındaki dengedir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Ahlaki tutum ve davranışlar",
     "en": "Moral attitudes and behaviours"
    },
    "content": {
     "anlatim": "# Ahlaki Tutum ve Davranışlar\n\nİslam ahlakı **bireysel erdemleri toplumsal huzurla** taçlandırır. Öngördüğü temel tutumlar:\n\n| Tutum | Günlük hayattan örnek |\n|---|---|\n| **Doğruluk** | Yalan söylememek, kopya çekmemek |\n| **Güvenilirlik (emanet)** | Sözünde durmak, emanete ihanet etmemek |\n| **Merhamet** | Yaşlılara, hayvanlara, zayıflara şefkat göstermek |\n| **Sorumluluk bilinci** | Görevini aksatmamak; çevreyi, kamu malını korumak |\n| **Saygı ve hoşgörü** | Farklı düşüncelere saygı, kırıcı olmamak |\n| **Yardımlaşma** | İhtiyaç sahibine destek olmak |",
     "ornekler": [
      {
       "soru": "Okulda kimse görmediği hâlde sınavda kopya çekmeyen bir öğrenci hangi ahlaki tutumları sergiler?",
       "cozum": "**Doğruluk** ve **sorumluluk bilinci**; ayrıca davranışlarını gözetim değil **vicdan** belirlediği için ihsan bilinci."
      }
     ],
     "ozet": [
      "Doğruluk, güvenilirlik, merhamet, sorumluluk, saygı, yardımlaşma.",
      "Bireysel erdemler toplumsal huzuru sağlar."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Kur'an'a Göre Hz. Muhammed",
   "en": "Unit 5: Prophet Muhammad According to the Qur'an"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Hz. Muhammed'in beşerî ve peygamberlik yönü",
     "en": "The human and prophetic aspects of Prophet Muhammad"
    },
    "content": {
     "anlatim": "# Ünitenin Kapsamı\n\nBu ünite Hz. Muhammed'in **beşerî yönünü**, **peygamberlik sıfatlarını**, **örnek ahlakını**, **sünnetini** ve kültürümüzdeki **Ehl-i beyt sevgisini** kapsar.\n\n# Beşerî Yönü\n\n- Hz. Muhammed bir **insan**dır: yer, içer, evlenir, çocukları olur, sevinir, üzülür, hastalanır.\n- Onu diğer insanlardan ayıran özellik **vahiy almasıdır**.\n\n# Peygamberlik Yönü\n\n- Vahyi **tebliğ eden** (insanlara ileten),\n- Vahyi **açıklayan** (beyan) ve uygulayarak gösteren,\n- İnsanlara **rehberlik eden** **son peygamberdir** (Hâtemü'l-enbiya).\n\n| Yönü | Özellik |\n|---|---|\n| **Beşerî** | İnsani ihtiyaç ve duygulara sahip |\n| **Peygamberlik** | Vahiy alır, tebliğ eder, açıklar, örnek olur |",
     "ornekler": [
      {
       "soru": "Hz. Muhammed'in beşerî yönünü vurgulamak neden önemlidir?",
       "cozum": "Bir insan olarak yaşadığı için hayatı **örnek alınabilir** ve uygulanabilirdir; onu insanüstü bir varlık gibi görmek bu örnekliği ortadan kaldırır. Onu diğer insanlardan ayıran **vahiy almasıdır**."
      }
     ],
     "ozet": [
      "Beşerî yön: insani özelliklere sahip; farkı vahiy alması.",
      "Peygamberlik yönü: tebliğ eden, açıklayan, rehberlik eden son peygamber."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Hz. Muhammed'in örnekliği (Üsve-i hasene)",
     "en": "Prophet Muhammad as the best example (Uswa hasana)"
    },
    "content": {
     "anlatim": "# Üsve-i Hasene (En Güzel Örnek)\n\nHz. Muhammed'in **hayatı, ibadetleri, insanlarla ilişkileri (muameleleri) ve ahlakı** Müslümanlar için en güzel örnektir (Ahzâb, 21).\n\n### Hayatından örneklik alanları\n\n- **Aile hayatı:** eşlerine ve çocuklarına sevgi ve şefkat\n- **Sosyal hayat:** yetimi, yoksulu, komşuyu gözetmek; güvenilirlik (**Muhammedü'l-Emin**)\n- **İbadet:** ibadetlerde süreklilik ve itidal\n- **Ahlak:** doğruluk, merhamet, tevazu, affedicilik\n\n# Sünnet\n\nHz. Peygamber'in **söz, fiil ve onaylarının** bütünüdür; Kur'an'dan sonra İslam'ın ikinci temel kaynağıdır.\n\n# Ehl-i Beyt Sevgisi\n\nHz. Peygamber'in **ev halkı ve soyu** (Ehl-i beyt) kültürümüzde derin bir sevgi ve saygıyla anılır.",
     "ornekler": [
      {
       "soru": "Sünnetin üç unsuru nedir?",
       "cozum": "Hz. Peygamber'in **sözleri** (kavlî), **davranışları** (fiilî) ve **onayları** (takrirî)."
      },
      {
       "soru": "\"Üsve-i hasene\" ne demektir?",
       "cozum": "**En güzel örnek** demektir; Hz. Muhammed'in hayatının her alanda Müslümanlar için örnek alınacak model olduğunu ifade eder."
      }
     ],
     "ozet": [
      "Üsve-i hasene = en güzel örnek (Ahzâb, 21).",
      "Sünnet: Hz. Peygamber'in söz, fiil ve onayları.",
      "Ehl-i beyt: Hz. Peygamber'in ev halkı ve soyu."
     ]
    }
   }
  ]
 }
];
