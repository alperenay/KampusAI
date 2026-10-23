/* =========================================================
   10. Sınıf Din Kültürü ve Ahlak Bilgisi — konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Din Kültürü ve Ahlak Bilgisi Konu Anlatım Notları" (5 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Mezhep tablolarına yaygınlık bölgeleri ve örnek sorular eklendi; Eş'arîliğin yayılım alanı düzeltildi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/din"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: İslam'da Varlık ve Bilgi",
   "en": "Unit 1: Being and Knowledge in Islam"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "DKAB.10.1.1",
    "title": {
     "tr": "İslam'da bilgi ve bilginin kaynakları",
     "en": "Knowledge and its sources in Islam"
    },
    "content": {
     "anlatim": "# Bilgi\n\n**Sözlükte:** Araştırma ya da gözlem yoluyla elde edilen gerçek, malumat; insan zihninin ürünü.\n**Terim olarak:** Öznenin (bilenin) bir şeyi **mahiyetine (gerçek niteliğine) uygun** olarak kavraması.\n\nİslam'da ilim büyük değer taşır: ilk inen ayet **\"Oku!\"** (Alak, 1) emriyle başlar; \"Hiç bilenlerle bilmeyenler bir olur mu?\" (Zümer, 9).\n\n# Temel Bilgi Kaynakları\n\n| Kaynak | Açıklama |\n|---|---|\n| **Salim (sağlam) duyular** | Görme, işitme, tatma, koklama, dokunma. Dış dünyayı algılamanın ilk basamağı. |\n| **Selim akıl** | Önyargıdan uzak, yaratılıştaki temizliğini koruyan, doğru karara ulaştıran akıl. **Dini sorumluluğun temel şartı**dır. |\n| **Sadık (doğru) haber** | (1) **Mütevatir haber:** Yalan üzerinde birleşmeleri aklen mümkün olmayan toplulukların aktardığı haber. (2) **Haber-i resul / vahiy:** Peygamberlerin Allah'tan alıp ilettiği bilgi. Kesin bilgi kaynağıdır. |\n\n# Bilgi Türleri\n\nGündelik, dinî, teknik, sanatsal, bilimsel ve felsefi bilgi.\n- **Dinî bilginin kaynağı vahiydir** (Kur'an ve sünnet).\n- **Evrene ilişkin bilgi** akıl ve duyularla elde edilir.\n- İslam'a göre bu kaynaklar birbiriyle çelişmez, birbirini tamamlar.",
     "ornekler": [
      {
       "soru": "Akıl hastası birinin namaz kılmakla yükümlü olmaması hangi bilgi kaynağının önemini gösterir?",
       "cozum": "**Selim aklın**: dinî sorumluluğun temel şartı akıldır; akıl sağlığı yerinde olmayan kişi dinen sorumlu tutulmaz."
      },
      {
       "soru": "Bir öğrenci \"Dinî bilgiler yalnızca vahye dayanır; akıl ve duyuların dinde yeri yoktur.\" diyor. Bu görüşü İslam'daki bilgi kaynakları açısından değerlendiriniz.",
       "cozum": "Görüş eksiktir. İslam'da bilginin kaynakları **duyular, akıl ve vahiy**dir; sağlıklı **sezgi (ilham)** de bireysel bir bilgi yolu kabul edilir. Kur'an insanı sık sık **düşünmeye, akletmeye, gözlem yapmaya** çağırır; vahyin anlaşılması da akılla olur. Bu yüzden akıl, dinî sorumluluğun ön şartıdır."
      }
     ],
     "ozet": [
      "Bilgi kaynakları: salim duyular, selim akıl, sadık haber.",
      "Sadık haber: mütevatir haber + vahiy.",
      "Akıl dinî sorumluluğun şartıdır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "DKAB.10.1.2",
    "title": {
     "tr": "Allah–âlem ilişkisi",
     "en": "The relationship between God and the universe"
    },
    "content": {
     "anlatim": "# Âlem\n\n**Âlem:** Allah'ın dışındaki bütün varlıklar (kâinat, evren).\n\n| Şehadet âlemi | Gayb âlemi |\n|---|---|\n| Duyularla algılanabilen, gözlemlenebilen **görünen** âlem (mülk âlemi). | Duyu ve akılla doğrudan algılanamayan, bilgisine **vahiy** yoluyla ulaşılan âlem (melekler, cin, ahiret, kader). |\n\n# İslam'da Varlık ve İnsan\n\n- Allah evreni **bir amaç ve hikmete** dayalı olarak yaratmıştır; evrende rastlantı yoktur.\n- İnsan **yeryüzünün halifesi**dir. Görevleri: Allah'ı tanımak, O'na **kulluk** etmek ve evreni **imar** etmek (güzelleştirmek).\n- Kâinattaki her şey Allah'a muhtaçtır; Allah ise hiçbir şeye muhtaç değildir (**Samed**).\n- Evrendeki düzen, değişmeyen yasalar (**sünnetullah**) ile işler; bu yasaları keşfetmek bilimin konusudur.",
     "ornekler": [
      {
       "soru": "Meleklerin varlığına ilişkin bilgiyi hangi yolla ediniriz? Neden?",
       "cozum": "Melekler **gayb âlemine** aittir; duyu ve akılla doğrudan algılanamaz. Bu yüzden bilgimiz **vahiy** (sadık haber) yoluyla gelir."
      },
      {
       "soru": "İslam düşüncesinde âlemin \"yaratılmış\" (hâdis) olması ile Allah'ın \"ezelî\" (kadîm) olması arasındaki ilişkiyi açıklayınız.",
       "cozum": "Allah'ın dışındaki her şey (**âlem**) sonradan var edilmiştir; bir başlangıcı vardır ve varlığını sürdürmek için Allah'a **muhtaçtır**. Allah ise başlangıcı olmayan (**kıdem**), varlığı kendinden olan yaratıcıdır. Bu ilişki, âlemdeki düzenin ve varlığın **Allah'ın yaratması ve koruması** ile devam ettiğini anlatır."
      }
     ],
     "ozet": [
      "Şehadet âlemi görünen, gayb âlemi görünmeyen.",
      "İnsan yeryüzünün halifesi: tanımak, kulluk, imar.",
      "Allah Samed'dir; her şey O'na muhtaç."
     ]
    }
   },
   {
    "id": "k3",
    "code": "DKAB.10.1.3",
    "title": {
     "tr": "Kur'an'dan mesajlar: İsra 36, Mülk 23",
     "en": "Messages from the Qur'an: Isra 36, Mulk 23"
    },
    "content": {
     "anlatim": "# İsra Suresi 36. Ayet\n\n> \"Hakkında kesin bilgi sahibi olmadığın şeyin peşine düşme. Çünkü kulak, göz ve kalp, bunların hepsi ondan sorumludur.\"\n\n**Mesajlar:**\n- **Doğru bilgi** önemlidir; zanla ve delilsiz hareket edilmemelidir.\n- **Tecessüs** (başkalarının gizli hâllerini araştırmak) yasaklanır.\n- İnsan bilgi araçlarından (duyular ve kalp/akıl) **sorumludur**.\n- Günümüz için: doğrulanmamış haberi paylaşmamak, **dezenformasyona** karşı dikkatli olmak.\n\n# Mülk Suresi 23. Ayet\n\n> \"De ki: O, sizi yaratan, size kulaklar, gözler ve kalpler verendir. Ne kadar az şükrediyorsunuz!\"\n\n**Mesajlar:** Bilgi edinme araçlarını (duyular ve akıl) veren Allah'a **şükretmek**; bu nimetleri doğru bilgiye ulaşmak için kullanmak.",
     "ornekler": [
      {
       "soru": "Sosyal medyada kaynağı belirsiz bir haberi paylaşmak İsra 36 açısından nasıl değerlendirilir?",
       "cozum": "Ayet, **kesin bilgi olmadan** bir şeyin peşine düşmeyi yasaklar; doğrulanmamış haberi yaymak bu ilkeye aykırıdır ve kişi bundan **sorumludur**."
      },
      {
       "soru": "Mülk suresi 23. ayette insana verilen işitme, görme ve gönüllerin (kalplerin) hatırlatılmasının amacı nedir?",
       "cozum": "Bu yetiler **bilgi edinme araçlarıdır**; ayet, insanın bu nimetler için **şükretmesi** ve onları doğru kullanması gerektiğini hatırlatır. Ayetin \"Ne kadar az şükrediyorsunuz!\" uyarısı, nimetleri hakikati aramak yerine boşa harcamanın bir **nankörlük** olduğunu vurgular."
      }
     ],
     "ozet": [
      "İsra 36: bilmediğin şeyin peşine düşme.",
      "Kulak, göz, kalp sorumludur.",
      "Mülk 23: bilgi araçları için şükür."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Allah'ı Tanımak",
   "en": "Unit 2: Knowing God"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "DKAB.10.2.1",
    "title": {
     "tr": "Allah'ın varlığının delilleri",
     "en": "Evidence for God's existence"
    },
    "content": {
     "anlatim": "# Allah'ın Varlığının Delilleri\n\nİslam düşüncesinde Allah'ın varlığı hem **fıtrat** (insanın yaratılıştan gelen inanma eğilimi) hem de **akli deliller** ile temellendirilir.\n\n| Delil | Hareket noktası | Açıklama |\n|---|---|---|\n| **Hudûs (kozmolojik) delili** | Evrenin sonradan var olması | Değişen ve sonradan var olan her şey bir yaratıcıya muhtaçtır. Evren de **hâdis** (sonradan var olmuş) olduğundan onu yoktan var eden bir yaratıcı vardır. |\n| **Gaye ve nizam (teleolojik) delili** | Evrendeki düzen ve amaç | Kâinattaki denge, ölçü ve uyum tesadüfle açıklanamaz; **bilinçli ve iradeli** bir yaratıcıyı gösterir. |\n| **Ontolojik delil** | Zihindeki \"en mükemmel varlık\" fikri | Sonlu insan zihnindeki **sonsuz ve mükemmel** varlık düşüncesi, ancak mükemmel bir varlıktan gelmiş olabilir. |\n| **Dinî tecrübe delili** | İç dünyadaki manevi yaşantı | Dua, ibadet sırasında hissedilen huzur ve Yaratıcı ile bağ kurma tecrübesi. |\n| **Fıtrat delili** | İnanma ihtiyacı | Tarihte inançsız bir topluma rastlanmaması, insanın yaratılıştan inanmaya yatkın olduğunu gösterir. |",
     "ornekler": [
      {
       "soru": "'Bir saati gören kişi onun bir ustası olduğunu düşünür; evrendeki düzen de bir düzenleyiciyi gösterir.' Bu hangi delildir?",
       "cozum": "**Gaye ve nizam (teleolojik) delili**dir."
      },
      {
       "soru": "\"Evrendeki her şey sebep–sonuç ilişkisine göre işler; her sebebin de bir sebebi vardır. Bu zincir sonsuza kadar gidemez.\" Bu akıl yürütme hangi delile örnektir? Delilin sonucu nedir?",
       "cozum": "Bu, **hudûs (sonradan olma) / illiyet** deliline örnektir. Sonsuz bir sebepler zinciri olamayacağına göre, kendisi bir sebebe muhtaç olmayan **ilk sebep**, yani her şeyi var eden **Allah** vardır."
      }
     ],
     "ozet": [
      "Hudûs: evren sonradan var oldu → yaratıcı.",
      "Gaye ve nizam: düzen → bilinçli yaratıcı.",
      "Ontolojik ve dinî tecrübe delilleri; fıtrat."
     ]
    }
   },
   {
    "id": "k2",
    "code": "DKAB.10.2.2",
    "title": {
     "tr": "Allah'ı isim ve sıfatlarıyla tanımak",
     "en": "Knowing God by His names and attributes"
    },
    "content": {
     "anlatim": "# Allah'ın Sıfatları\n\n**Zatî sıfatlar** (yalnız Allah'a özgü, başka hiçbir varlıkta bulunmaz):\n1. **Vücut:** Var olmak.\n2. **Kıdem:** Varlığının başlangıcı olmamak.\n3. **Beka:** Varlığının sonu olmamak.\n4. **Vahdaniyet:** Zatında, sıfatlarında ve fiillerinde bir olmak.\n5. **Muhâlefetün li'l-havâdis:** Yaratılmışlara benzememek.\n6. **Kıyam bi-nefsihî:** Varlığı kendinden olmak, hiçbir şeye muhtaç olmamak.\n\n**Subûtî sıfatlar** (insanda sınırlı ölçüde bulunan, Allah'ta mutlak olan): **Hayat** (diri olmak), **İlim** (bilmek), **Semi** (işitmek), **Basar** (görmek), **İrade** (dilemek), **Kudret** (gücü yetmek), **Kelam** (konuşmak), **Tekvin** (yaratmak).\n\n**Fiilî sıfatlar:** Yaratma, rızık verme, diriltme, öldürme gibi Allah'ın âlemle ilişkisini gösteren sıfatlar.\n**Haberî sıfatlar:** Ayet ve hadislerde geçen \"el (yed), yüz (vech)\" gibi ifadeler; bunlar Allah'ı yaratılmışlara benzetmeden, mecazi olarak anlaşılır.\n\n# Esmâ-i Hüsnâ (Güzel İsimler)\n\n| Grup | Örnekler |\n|---|---|\n| Zatıyla ilgili | Evvel, Âhir, Bâkî, Ehad, Samed |\n| Kâinatla ilgili | Hâlık (yaratan), Rezzâk (rızık veren), Melik, Rahmân, Rahîm |\n| İnsanla ilgili | Şekûr (şükrün karşılığını veren), Tevvâb (tövbeleri kabul eden), Vedûd (seven), Afüv (affeden), Settâr (ayıpları örten) |\n\n> İnsan bu isimlerin anlamlarını **ahlak edinerek** hayatına yansıtmalıdır: Rahîm'i bilen merhametli, Afüv'ü bilen affedici olur.",
     "ornekler": [
      {
       "soru": "Kıdem ve Beka sıfatları arasındaki fark nedir?",
       "cozum": "**Kıdem**, Allah'ın varlığının **başlangıcı olmadığını**; **Beka** ise varlığının **sonu olmadığını** ifade eder."
      },
      {
       "soru": "\"Rahmân\" ve \"Rahîm\" isimlerinin anlamını ve bu isimleri tanıyan bir insanın davranışlarına nasıl yansıyabileceğini açıklayınız.",
       "cozum": "**Rahmân:** Rahmeti dünyada inanan–inanmayan ayırt etmeksizin **tüm varlıkları** kuşatan; **Rahîm:** Özellikle inananlara ahirette de **merhamet eden**. Bu isimleri tanıyan kişi, insanlara ve diğer canlılara **merhametli** davranmaya, affetmeye ve yardımlaşmaya özen gösterir."
      }
     ],
     "ozet": [
      "Zatî sıfatlar: vücut, kıdem, beka, vahdaniyet, muhalefetün li'l-havadis, kıyam bi-nefsihî.",
      "Subûtî sıfatlar: hayat, ilim, semi, basar, irade, kudret, kelam, tekvin.",
      "Esmâ-i Hüsnâ ahlak edinilmelidir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "DKAB.10.2.3",
    "title": {
     "tr": "Kur'an'dan mesajlar: Haşr 22–24",
     "en": "Messages from the Qur'an: Hashr 22–24"
    },
    "content": {
     "anlatim": "# Haşr Suresi 22–24. Ayetler\n\n> \"O, kendisinden başka ilah olmayan Allah'tır; gaybı da şehadeti de bilendir. O, Rahmân'dır, Rahîm'dir. O, kendisinden başka ilah olmayan Allah'tır; Melik'tir, Kuddûs'tür, Selâm'dır, Mü'min'dir, Müheymin'dir, Azîz'dir, Cebbâr'dır, Mütekebbir'dir... O, yaratan, var eden, şekil verendir. En güzel isimler O'nundur...\"\n\n| İsim | Anlamı |\n|---|---|\n| Melik | Mülkün gerçek sahibi |\n| Kuddûs | Her türlü eksiklikten uzak, tertemiz |\n| Selâm | Esenlik veren |\n| Mü'min | Güven veren |\n| Müheymin | Gözetip koruyan |\n| Azîz | Mutlak güç sahibi, yenilmez |\n| Hâlık, Bârî, Musavvir | Yaratan, var eden, şekil veren |\n\n**Mesajlar:** Allah'ın eşsizliği ve kusursuzluğu; hem görünen hem görünmeyen her şeyi bilmesi; kâinatın tek yöneticisi olması.",
     "ornekler": [
      {
       "soru": "Haşr suresinde Allah'ın 'gaybı ve şehadeti bilen' olarak nitelenmesi ne anlama gelir?",
       "cozum": "Allah'ın ilmi **sınırsızdır**; duyularla algılanan âlemi de, algılanamayan âlemi de eksiksiz bilir."
      },
      {
       "soru": "Haşr suresi 22–24. ayetlerde geçen \"el-Melik\", \"el-Kuddûs\" ve \"es-Selâm\" isimlerinin anlamlarını yazınız.",
       "cozum": "**el-Melik:** Mülkün ve her şeyin gerçek sahibi, hükümdarı. **el-Kuddûs:** Her türlü eksiklikten uzak, tertemiz. **es-Selâm:** Esenlik veren, her türlü kusurdan salim. Bu isimler, Allah'ın mutlak **egemenliğini ve yüceliğini** anlatır."
      }
     ],
     "ozet": [
      "Haşr 22–24: Esmâ-i Hüsnâ'dan örnekler.",
      "Kuddûs: kusursuz; Müheymin: gözetip koruyan.",
      "Allah gaybı ve şehadeti bilir."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: İslam'ın Evrensel Mesajları",
   "en": "Unit 3: Universal Messages of Islam"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "DKAB.10.3.1",
    "title": {
     "tr": "Tevhit ilkesi",
     "en": "The principle of tawhid"
    },
    "content": {
     "anlatim": "# Tevhit\n\n**Sözlükte:** Birlemek, bir kılmak.\n**Terim olarak:** Allah'ın **zatında, sıfatlarında, isimlerinde ve fiillerinde** bir ve tek olduğuna, ortağı ve dengi bulunmadığına inanmak. İslam'ın **en temel** ilkesidir; \"Lâ ilâhe illallah\" (Allah'tan başka ilah yoktur) cümlesiyle ifade edilir. **İhlas suresi** tevhidi en özlü biçimde anlatır.\n\n**Zıddı – Şirk:** Allah'a ortak koşmak. Nisa suresi 116. ayette **bağışlanmayacak** büyük günah olarak bildirilir.\n\n**Tevhidin boyutları:**\n- **Bireysel:** İnsanı yalnızca Allah'a kul yapar; onu her türlü sahte otoriteye boyun eğmekten kurtarır, özgürleştirir.\n- **Toplumsal:** \"**Çoklukta birlik**\" anlayışı kazandırır; kardeşlik, eşitlik ve sosyal adaleti güçlendirir.\n- **Peygamberlerin ortak çağrısı:** Hz. Nuh, Hz. İbrahim, Hz. Musa, Hz. İsa ve Hz. Muhammed'in temel mesajı tevhittir.",
     "ornekler": [
      {
       "soru": "Tevhit inancı insanı nasıl özgürleştirir?",
       "cozum": "Yalnızca Allah'a kulluk eden insan; **para, makam, güç** gibi dünyevi otoritelere tapınırcasına bağlanmaz, onurunu korur."
      },
      {
       "soru": "Tevhit inancının toplumsal hayata yansımalarına iki örnek veriniz.",
       "cozum": "1) İnsanlar tek bir yaratıcının kulları olarak **eşit** görülür; ırk, renk ve servet üstünlük sebebi olmaz. 2) İnsan Allah'tan başka hiçbir varlığa (güç, para, şöhret) **kulluk etmez**; bu, onu batıl inanç ve sömürüye karşı **özgür** kılar ve sorumluluk bilinci kazandırır."
      }
     ],
     "ozet": [
      "Tevhit: Allah'ın her yönden bir ve tek olması.",
      "Zıddı şirk; bağışlanmayan günah (Nisa 116).",
      "Tüm peygamberlerin ortak çağrısı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "DKAB.10.3.2",
    "title": {
     "tr": "İslam'da adalet ve eşitlik",
     "en": "Justice and equality in Islam"
    },
    "content": {
     "anlatim": "# Adalet\n\n**Tanım:** Doğruluk, denklik; **hak sahibine hakkını vermek** ve **işleri yerli yerine koymak**. Adalet İslam'da **evrensel** bir ilkedir; Allah'ın isimlerinden biri **Adl**'dir.\n\n**Adaletin temel ilkeleri:**\n- **Eşitlik:** Kanun önünde herkes eşittir.\n- **Tarafsızlık:** Akraba ya da düşman gözetmeden hükmetmek (Maide, 8).\n- **Liyakat:** Görevi **ehline** vermek.\n- **Emanet:** Sorumlulukları güvenilir kişilere teslim etmek.\n- **Şeffaflık ve hesap verebilirlik.**\n- **Dürüstlük, hakkaniyet ve ahde vefa** (sözünde durmak).\n\n# Eşitlik\n\nAllah katında üstünlük **ırk, renk, cinsiyet, servet** ile değil, yalnızca **takva** (Allah'a karşı sorumluluk bilinci) iledir. Veda Hutbesi: \"Arabın Arap olmayana, Arap olmayanın Araba üstünlüğü yoktur; üstünlük takva iledir.\"",
     "ornekler": [
      {
       "soru": "Bir yöneticinin bir göreve yakın akrabasını, daha yetenekli adaylar varken ataması hangi ilkeye aykırıdır?",
       "cozum": "**Liyakat** ilkesine (görevi ehline verme) ve dolayısıyla **adalete** aykırıdır."
      },
      {
       "soru": "Hz. Ömer'in, bir Kıpti gence haksızlık yapan valinin oğlunu cezalandırması rivayeti İslam'daki hangi ilkeyi yansıtır?",
       "cozum": "**Hukuk önünde eşitlik ve adalet** ilkesini. Yöneticinin yakını olmak, ayrıcalık sebebi değildir; Müslüman olsun olmasın her insanın hakkı korunur. Adalet, Kur'an'da kişi kendi aleyhine ya da yakınlarının aleyhine olsa bile gözetilmesi istenen bir ilkedir (Nisa, 135)."
      }
     ],
     "ozet": [
      "Adalet: hak sahibine hakkını vermek.",
      "İlkeler: eşitlik, tarafsızlık, liyakat, emanet, ahde vefa.",
      "Üstünlük yalnızca takva iledir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "DKAB.10.3.3",
    "title": {
     "tr": "İslam ve barış",
     "en": "Islam and peace"
    },
    "content": {
     "anlatim": "# İslam ve Barış\n\n\"İslam\" kelimesi **s-l-m** kökünden gelir: kurtuluş, esenlik, güven, **barış (sulh)**. **Müslüman**, çevresine güven veren ve barışı savunan kişidir. Hz. Muhammed: \"Müslüman, elinden ve dilinden diğer insanların emin olduğu kimsedir.\"\n\n**Birlikte yaşama modeli – Medine Vesikası (622):** Hz. Muhammed hicretten sonra Müslümanlar, Yahudiler ve diğer Medine toplulukları arasında bir sözleşme yaptı. **Din ve vicdan özgürlüğü**, ortak savunma ve **eşit vatandaşlık** esasları belirlendi.\n\n# Cihat Kavramı\n\n- **Cihat:** Allah yolunda **her türlü çaba**; iyiliği yaymak, kötülüğü engellemek için güç sarf etmek.\n- İslam'da **barış esastır.** Savaş (**kıtal**), ancak **saldırı karşısında meşru müdafaa** (vatan, can, mal, din ve namusun korunması) amacıyla caizdir.\n- **Nefisle mücadele** \"büyük cihat\" (cihad-ı ekber) olarak adlandırılır.\n- Savaşta bile kadınlara, çocuklara, yaşlılara, din adamlarına dokunulmaması; ağaçların kesilmemesi emredilmiştir.",
     "ornekler": [
      {
       "soru": "Medine Vesikası'nın günümüz için önemi nedir?",
       "cozum": "Farklı inançlardan insanların **hukuk güvencesi altında, eşit haklarla** bir arada yaşayabileceğini gösteren erken bir **çoğulcu toplum sözleşmesi** örneğidir."
      },
      {
       "soru": "\"Selâm\" kelimesinin İslam ile ilişkisini ve günlük hayattaki karşılığını açıklayınız.",
       "cozum": "**İslam** kelimesi \"barış, esenlik ve teslimiyet\" anlamlarına gelen **s-l-m** kökünden türemiştir. Müslümanların birbirine \"**Esselâmü aleyküm**\" (Allah'ın esenliği üzerinize olsun) diyerek selamlaşması, barışın günlük hayatta yaşanmasının bir ifadesidir; cennetin bir adı da **Dârüsselâm**'dır (esenlik yurdu)."
      }
     ],
     "ozet": [
      "İslam: s-l-m kökü, barış ve esenlik.",
      "Medine Vesikası: birlikte yaşama modeli.",
      "Cihat her türlü çabadır; savaş yalnızca meşru müdafaa."
     ]
    }
   },
   {
    "id": "k4",
    "code": "DKAB.10.3.4",
    "title": {
     "tr": "Kur'an'dan mesajlar: Nahl 90, Nisa 58, Bakara 208",
     "en": "Messages: Nahl 90, Nisa 58, Baqarah 208"
    },
    "content": {
     "anlatim": "# Nahl Suresi 90. Ayet\n\n> \"Şüphesiz Allah, adaletli davranmayı, iyilik yapmayı, akrabaya yardım etmeyi emreder; hayâsızlığı, fenalığı ve azgınlığı yasaklar. O, düşünüp tutasınız diye size öğüt veriyor.\"\n\n**Mesaj:** Üç emir (adalet, ihsan/iyilik, akrabaya yardım) ve üç yasak (hayâsızlık, kötülük, zulüm/azgınlık). Bu ayet hutbelerin sonunda okunur.\n\n# Nisa Suresi 58. Ayet\n\n> \"Şüphesiz Allah size emanetleri ehline vermenizi ve insanlar arasında hükmettiğiniz zaman adaletle hükmetmenizi emreder...\"\n\n**Mesaj:** **Liyakat** (emaneti ehline verme) ve **adaletle hükmetme**.\n\n# Bakara Suresi 208. Ayet\n\n> \"Ey iman edenler! Hep birden barışa (İslam'a) girin, şeytanın adımlarına uymayın. Çünkü o, sizin için apaçık bir düşmandır.\"\n\n**Mesaj:** **Barış ve esenlik** içinde yaşamak, bölücülükten uzak durmak.",
     "ornekler": [
      {
       "soru": "Nahl 90. ayette emredilen ve yasaklanan davranışları yazınız.",
       "cozum": "Emredilenler: **adalet, iyilik (ihsan), akrabaya yardım**. Yasaklananlar: **hayâsızlık, fenalık (münker), azgınlık (zulüm)**."
      },
      {
       "soru": "Nisa 58. ayette \"emanetleri ehline verin\" buyrulur. Bu ilke okul hayatında nasıl uygulanabilir?",
       "cozum": "Sınıf başkanlığı, kulüp görevleri ve takım kaptanlığı gibi sorumluluklar **liyakate** (yetenek ve dürüstlüğe) göre verilmelidir; arkadaşlık ya da yakınlık belirleyici olmamalıdır. Ayrıca ödünç alınan eşyaları korumak ve zamanında iade etmek de **emanete riayet**tir."
      }
     ],
     "ozet": [
      "Nahl 90: üç emir, üç yasak.",
      "Nisa 58: emaneti ehline ver, adaletle hükmet.",
      "Bakara 208: hep birlikte barışa girin."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Din, Çevre ve Teknoloji",
   "en": "Unit 4: Religion, Environment and Technology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "DKAB.10.4.1",
    "title": {
     "tr": "İnsan, çevre ve ahlak",
     "en": "Humans, environment and ethics"
    },
    "content": {
     "anlatim": "# Çevre Ahlakı\n\n**Çevre:** Canlıların yaşamını sürdürdüğü doğal ve yapay ortam.\n\nİslam ahlakına göre insan doğanın **sahibi değil, emanetçisidir**. Asıl sahip Allah'tır; insan bu emaneti korumakla yükümlüdür.\n\n**Çevre ahlakının ilkeleri:**\n- Evrende kusursuz bir **ölçü, denge (mîzan)** ve **fıtrat** vardır; insan bu dengeyi bozmamalıdır (Rahman, 7–8).\n- **İsraf yasaktır**: \"Yiyin, için fakat israf etmeyin.\" (A'raf, 31)\n- Tüm canlıların hakkı gözetilmelidir.\n\n**Çevre sorunları:** Bilinçsiz tüketim, plansız sanayileşme ve fosil yakıt kullanımı sonucu **küresel ısınma**, hava–su–toprak kirliliği, ormansızlaşma ve **biyoçeşitliliğin azalması**.\n\n# Hz. Peygamber'in Örnekliği\n\n- **Ağaç dikmek:** \"Kıyamet kopmak üzereyken birinizin elinde bir fidan bulunsa, onu dikebiliyorsa diksin.\" hadisi, doğaya katkının her koşulda değerli olduğunu anlatır.\n- **Hayvan hakları:** Susuz bir köpeğe su veren kişinin bağışlandığını bildiren hadis, canlılara merhametin ibadet değeri taşıdığını gösterir.\n- **Koruma alanları:** Hz. Peygamber, Medine çevresinde ağaçların kesilmesinin ve hayvanların avlanmasının yasak olduğu **hima** (koruma) alanları belirlemiştir.\n\nÇevre ahlakı yalnızca bir bilgi değil; **israf etmemek, atığı azaltmak, canlılara merhamet etmek** gibi günlük davranışlarla yaşanan bir sorumluluktur.",
     "ornekler": [
      {
       "soru": "İnsanın doğanın 'emanetçisi' olması ne anlama gelir?",
       "cozum": "Doğa insana **sınırsızca tüketmesi için değil**, korunup gelecek nesillere aktarılması için verilmiştir; insan ondan **hesap verecektir**."
      },
      {
       "soru": "İsrafın yalnızca para harcamakla sınırlı olmadığını, günlük hayattan üç örnekle gösteriniz.",
       "cozum": "1) Abdest alırken ya da diş fırçalarken **suyu boşa akıtmak**. 2) Tabağa yenmeyecek kadar yemek alıp **çöpe atmak**. 3) Kullanılmayan odada **ışığı açık bırakmak**, gereksiz yere elektronik cihaz değiştirmek. Hepsi kaynakların ölçüsüzce tüketilmesidir; A'raf 31'deki israf yasağı kapsamındadır."
      }
     ],
     "ozet": [
      "İnsan doğanın emanetçisidir.",
      "Evrende ölçü ve denge (mîzan) vardır.",
      "İsraf yasaktır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "DKAB.10.4.2",
    "title": {
     "tr": "Teknoloji ve ahlak",
     "en": "Technology and ethics"
    },
    "content": {
     "anlatim": "# Teknoloji\n\n**Teknoloji:** İnsanın doğayı ve çevresini kontrol etmek, hayatını kolaylaştırmak için geliştirdiği araç-gereç ve bilgi birikimi.\n\nTeknoloji **tek başına iyi ya da kötü değildir**; onu nasıl kullandığımız belirleyicidir. Ahlaki süzgeçten geçirilmezse felaketlere yol açar: **nükleer silahlar, siber suçlar, kişisel veri hırsızlığı**.\n\n# Mahremiyet ve Veri Güvenliği\n\n- İslam'da **özel hayatın gizliliği** dokunulmazdır (Nur, 27: izin almadan başkasının evine girmeyin).\n- Sanal ortamda:\n  - Başkasının **verilerini, fotoğraflarını izinsiz** kullanmak,\n  - **Gıybet**, iftira, yalan haber yaymak,\n  - **Dijital (siber) zorbalık** yapmak\n  ahlaken ve dinen yasaktır.\n- **Tecessüs** (gizli hâlleri araştırmak) yasaktır (Hucurat, 12).\n\n**Dijital ahlak önerileri:** Doğrulanmış bilgiyi paylaşmak, başkalarının haklarına saygı, ekran süresini dengelemek, ölçülü kullanım.",
     "ornekler": [
      {
       "soru": "Bir arkadaşının izni olmadan fotoğrafını paylaşmak hangi ilkeye aykırıdır?",
       "cozum": "**Mahremiyet** ve kişisel haklara saygı ilkesine; İslam'ın özel hayatın gizliliği ve kul hakkı anlayışına aykırıdır."
      },
      {
       "soru": "Yapay zekâ ile ödev hazırlayıp kendi emeğiymiş gibi teslim etmek ahlaki açıdan nasıl değerlendirilir?",
       "cozum": "Başkasının ya da bir aracın ürettiğini kendi emeği gibi sunmak **dürüstlük** ilkesine aykırıdır ve bir tür **aldatmadır**. Teknoloji öğrenmeyi destekleyen bir araç olarak kullanılabilir; ancak kaynak belirtilmeli, öğretmenin kurallarına uyulmalı ve **sorumluluk** kişide kalmalıdır."
      }
     ],
     "ozet": [
      "Teknoloji kullanıma göre iyi ya da kötüdür.",
      "Mahremiyet dokunulmazdır.",
      "Dijital zorbalık, gıybet, izinsiz veri kullanımı yasaktır."
     ]
    }
   },
   {
    "id": "k3",
    "code": "DKAB.10.4.3",
    "title": {
     "tr": "Çevre ve teknoloji ilişkisi",
     "en": "Environment and technology"
    },
    "content": {
     "anlatim": "# Teknolojinin Çevreye Etkileri\n\n| Olumsuz | Olumlu |\n|---|---|\n| Fabrika atıkları, hava–su kirliliği | **Yenilenebilir enerji** (güneş, rüzgâr) |\n| Plastik ve elektronik atık | Geri dönüşüm teknolojileri |\n| Aşırı kaynak tüketimi | Arıtma tesisleri, akıllı tarım, su tasarrufu |\n\n# İslam'ın Çevre Yaklaşımı (Hz. Muhammed'in örnekliği)\n\n- **Ağaç dikmeyi teşvik**: \"Kıyamet kopuyor olsa bile elinizdeki fidanı dikin.\"\n- **Su israfını yasaklama:** Akan bir nehirden abdest alırken bile israf etmemek.\n- **Hayvan hakları:** Susuz köpeğe su veren kişinin bağışlandığını, kediyi aç bırakan kişinin cezalandırıldığını bildirmiştir.\n- **Temizlik:** \"Temizlik imanın yarısıdır.\"\n\n> Çevreyi korumak **ibadet bilinciyle** ele alınmalıdır.",
     "ornekler": [
      {
       "soru": "'Akan nehirde bile suyu israf etme' tavsiyesi bugünkü hangi soruna ışık tutar?",
       "cozum": "**Su kaynaklarının azalması ve kuraklık** sorununa; bol görünen kaynakların bile ölçülü kullanılması gerektiğini öğretir."
      },
      {
       "soru": "Elektronik atıkların (eski telefon, pil) gelişigüzel atılması çevreye nasıl zarar verir? Dinî ve ahlaki sorumluluk açısından ne yapılmalıdır?",
       "cozum": "İçlerindeki **ağır metaller** (kurşun, cıva, kadmiyum) toprağa ve suya karışarak canlılara zarar verir. İnsan çevreye karşı **emanetçi** olduğu için atıklar **ayrı toplanmalı**, cihazlar mümkün olduğunca **onarılıp uzun kullanılmalı**, gereksiz tüketimden kaçınılmalıdır."
      }
     ],
     "ozet": [
      "Teknolojinin çevreye etkisi çift yönlü.",
      "Hz. Muhammed: ağaç dikme, su israfı yasağı, hayvan hakları.",
      "Çevreyi korumak ibadet bilinciyle."
     ]
    }
   },
   {
    "id": "k4",
    "code": "DKAB.10.4.4",
    "title": {
     "tr": "Kur'an'dan mesajlar: Rum 41",
     "en": "Message from the Qur'an: Rum 41"
    },
    "content": {
     "anlatim": "# Rum Suresi 41. Ayet\n\n> \"İnsanların kendi elleriyle yaptıkları yüzünden karada ve denizde fesat (düzensizlik) ortaya çıktı. Belki dönerler diye Allah, yaptıklarının bir kısmını onlara tattıracaktır.\"\n\n**Mesajlar:**\n- Ekolojik krizlerin (kirlilik, iklim değişikliği, türlerin yok olması) temelinde **insanın yanlış eylemleri** vardır.\n- İnsan, yaptıklarının **sonuçlarıyla** karşılaşır.\n- Ayet bir **uyarı ve çağrı**dır: hatalardan dönmek, dengeyi yeniden kurmak.\n\n# Ayetin Bağlamı ve Günümüze Bakan Yönü\n\nAyetteki **fesat**, toplumsal ve ahlaki bozulmanın yanında doğadaki dengenin bozulmasını da kapsayan geniş bir kavramdır. Ayet insanı **suçlamakla yetinmez**, bir **dönüş (tövbe ve ıslah)** imkânı sunar: *\"Belki dönerler.\"* ifadesi, hatadan dönüldüğünde dengenin yeniden kurulabileceğini hatırlatır.\n\nGünümüzde orman yangınları, plastik kirliliği, aşırı avlanma ve iklim değişikliği bu ayetin uyarısını somutlaştıran örneklerdir. Bireysel düzeyde **tüketimi azaltmak**, toplumsal düzeyde **çevre dostu politikaları desteklemek** ayetin çağrısına uygun davranışlardır.",
     "ornekler": [
      {
       "soru": "Rum 41. ayet ile küresel ısınma arasında nasıl bir ilişki kurulabilir?",
       "cozum": "Ayet, karada ve denizdeki bozulmanın **insan eliyle** olduğunu bildirir; fosil yakıt kullanımı ve aşırı tüketim kaynaklı küresel ısınma bunun güncel bir örneğidir."
      },
      {
       "soru": "Rum 41. ayetteki \"Belki dönerler\" ifadesi insana nasıl bir mesaj verir?",
       "cozum": "Ayet insana **umut ve sorumluluk** mesajı verir: Yaşanan bozulmalar insanın kendi eylemlerinin sonucudur ve yine insan **hatasından dönerek** (israfı bırakmak, doğayı korumak) düzeni yeniden kurabilir. Ayet, karamsarlığa değil **ıslaha** çağırır."
      }
     ],
     "ozet": [
      "Rum 41: fesat insan eliyle çıktı.",
      "İnsan eylemlerinin sonuçlarıyla karşılaşır.",
      "Ayet dönüş ve düzeltme çağrısıdır."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: İslam Düşüncesinde İtikadi, Siyasi ve Fıkhi Yorumlar",
   "en": "Unit 5: Theological, Political and Legal Interpretations in Islamic Thought"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "DKAB.10.5.1",
    "title": {
     "tr": "Dinî yorum farklılıklarının sebepleri",
     "en": "Causes of differing religious interpretations"
    },
    "content": {
     "anlatim": "# Mezhep ve Yorum Farklılıkları\n\nİslam dini **tek ve evrensel**dir; ancak insanların onu anlama ve yorumlama biçimleri çeşitlilik gösterir. Bu çeşitlilik **mezhep** olgusunu doğurmuştur.\n\n**Mezhep:** Gidilen yol; dinin anlaşılmasına yönelik **düşünce ekolleri**. Mezhepler dinin kendisi değil, **dinin yorumlarıdır**.\n\n| Sebep türü | Açıklama |\n|---|---|\n| **İnsan kaynaklı** | Zekâ, bilgi düzeyi, psikolojik yapı ve yeteneklerin farklı olması. |\n| **Siyasi** | Hz. Peygamber sonrası **halifelik** tartışmaları; Hz. Ali–Muaviye dönemi, **Cemel ve Sıffin** savaşları. |\n| **Metin kaynaklı** | Bazı ayet ve hadislerin birden fazla anlama gelebilmesi (**müteşabih** ayetler, mecazlı ifadeler). |\n| **Coğrafi ve kültürel** | İslam'ın farklı milletlerle karşılaşması; örf ve yaşam biçimlerinin etkisi. |\n\n> Bu farklılıklar **çatışma sebebi değil**, İslam düşüncesinin **zenginliği** ve farklı zaman ve mekânlara uyum sağlama esnekliğidir.",
     "ornekler": [
      {
       "soru": "Sıffin Savaşı yorum farklılıklarının hangi sebebine örnektir?",
       "cozum": "**Siyasi sebeplere** örnektir; halifelik tartışmaları Haricilik ve Şia gibi grupların ortaya çıkmasında etkili olmuştur."
      },
      {
       "soru": "Kur'an'daki bazı kelimelerin birden fazla anlama gelmesi yorum farklılıklarına nasıl yol açar? Bir örnek veriniz.",
       "cozum": "Arapçada bazı kelimeler **çok anlamlıdır**; âlimler bağlama göre farklı anlamları tercih edebilir. Örneğin Bakara 228. ayetteki **\"kurû\"** kelimesi hem \"temizlik dönemi\" hem \"hayız dönemi\" anlamına gelir; bu yüzden boşanmış kadının bekleme süresinin hesaplanması mezheplerde farklı yorumlanmıştır. **Dilin yapısı**, yorum farklılıklarının sebeplerinden biridir."
      }
     ],
     "ozet": [
      "Mezhep: dinin yorumu, dinin kendisi değil.",
      "Sebepler: insan, siyaset, metin, coğrafya-kültür.",
      "Farklılıklar zenginliktir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "DKAB.10.5.2",
    "title": {
     "tr": "İtikadi ve fıkhi mezhepler",
     "en": "Theological and legal schools"
    },
    "content": {
     "anlatim": "# İtikadi (İnançla İlgili) Mezhepler — Ehl-i Sünnet\n\n| Mezhep | Kurucu | Özellik | Yaygın olduğu yer |\n|---|---|---|---|\n| **Mâtürîdîlik** | Ebû Mansûr el-Mâtürîdî | Akla daha geniş yer verir; insanın **cüzî iradesini** vurgular. | Türk dünyası, Orta Asya, Türkiye, Balkanlar |\n| **Eş'arîlik** | Ebü'l-Hasen el-Eş'arî | Akıl ile nakli uzlaştırır; **ilahi irade ve kudreti** ön plana çıkarır. | Arap dünyası, Kuzey Afrika, Şafiî ve Mâlikî çevreler |\n\nHer ikisi de **Ehl-i Sünnet** dairesindedir.\n\n# Fıkhi (Ameli) Mezhepler\n\n| Mezhep | Kurucu | Yöntem | Yaygın olduğu yer |\n|---|---|---|---|\n| **Hanefîlik** | İmam-ı Âzam Ebû Hanîfe | **Kıyas ve re'y** (akıl yürütme), istihsan; en yaygın mezhep | Türkiye, Orta Asya, Balkanlar, Pakistan |\n| **Mâlikîlik** | İmam Mâlik | **Medine halkının uygulamasını** delil kabul eder | Kuzey ve Batı Afrika |\n| **Şâfiîlik** | İmam Şâfiî | Hadis ve **icmaya** sıkı bağlı; fıkıh usulünü sistemleştirmiştir | Türkiye'nin doğu ve güneydoğusu, Mısır, Endonezya |\n| **Hanbelîlik** | Ahmed bin Hanbel | Nakilci (hadis ağırlıklı); **kıyası en az** kullanır | Arap Yarımadası |\n\n# Şîa ve Câferîlik\n\n- **Şîa:** Hz. Ali'nin halifeliği **ilk hak eden** olduğunu ve imametin onun soyundan devam ettiğini savunan siyasi-itikadi kol.\n- **Câferîlik:** Şîa'nın fıkhi mezhebi; **İmam Câfer es-Sâdık**'a dayanır (İran, Irak, Azerbaycan).\n\n> Tüm bu mezhepler **İslam üst kimliğinde** birleşir: Allah'a, Hz. Muhammed'in peygamberliğine ve Kur'an'a inanma ortaktır.",
     "ornekler": [
      {
       "soru": "Türkiye'de yaygın olan itikadi ve fıkhi mezhepler hangileridir?",
       "cozum": "İtikatta ağırlıklı olarak **Mâtürîdîlik**; fıkıhta ağırlıklı olarak **Hanefîlik**, doğu ve güneydoğuda ise **Şâfiîlik** yaygındır."
      },
      {
       "soru": "Mâtürîdîlik ve Eş'arîlik arasındaki farklılığın akla yaklaşım bakımından bir örneğini veriniz.",
       "cozum": "**Mâtürîdîlere** göre akıl, vahiy gelmeden de Allah'ın varlığını ve iyi–kötünün bir kısmını **bilebilir**; bu yüzden peygamber ulaşmamış kişi de Allah'ı aklıyla bilmekle sorumludur. **Eş'arîlere** göre ise dinî sorumluluk **vahiyle** başlar. İki mezhep de **Ehl-i Sünnet** içindedir; farklılık temel inançta değil, yorumdadır."
      }
     ],
     "ozet": [
      "İtikadi: Mâtürîdîlik ve Eş'arîlik (Ehl-i Sünnet).",
      "Fıkhi: Hanefî, Mâlikî, Şâfiî, Hanbelî; Şîa'da Câferî.",
      "Mezhepler İslam üst kimliğinde birleşir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "DKAB.10.5.3",
    "title": {
     "tr": "Kur'an'dan mesajlar: Hucurat 13",
     "en": "Message from the Qur'an: Hujurat 13"
    },
    "content": {
     "anlatim": "# Hucurat Suresi 13. Ayet\n\n> \"Ey insanlar! Şüphesiz sizi bir erkek ile bir dişiden yarattık. Birbirinizle tanışmanız için sizi kavimlere ve kabilelere ayırdık. Allah katında en değerliniz, O'na karşı gelmekten en çok sakınanınızdır. Şüphesiz Allah her şeyi bilendir, her şeyden haberdardır.\"\n\n**Mesajlar:**\n- İnsanlar **yaratılışta eşittir**; hepsi aynı anne-babadan gelir.\n- **Irk, dil, renk, cinsiyet, soy** üstünlük sebebi değildir.\n- Kavim ve kabilelere ayrılmanın amacı çatışmak değil, **tanışmak (teâruf)** ve yardımlaşmaktır.\n- Üstünlüğün tek ölçütü **takvadır**.\n\n**Genel değerlendirme:** Ünite boyunca işlenen bilgi kaynakları, ilahi düzen, evrensel ahlak ilkeleri ve mezheplerin çoğulcu yapısı; **eleştirel düşünme, hoşgörü, adalet ve çevre bilinci** kazandırmayı amaçlar.",
     "ornekler": [
      {
       "soru": "Hucurat 13'e göre farklı milletlerden olmanın amacı nedir?",
       "cozum": "Birbirini **tanımak (teâruf)**, kaynaşmak ve yardımlaşmak; üstünlük taslamak ya da çatışmak değil."
      },
      {
       "soru": "Hucurat suresi 13. ayetine göre insanlar arasında üstünlük ölçüsü nedir? Bu ölçü ırkçılığa nasıl bir cevap verir?",
       "cozum": "Ayete göre Allah katında en üstün olan, **takvası** (Allah'a saygısı ve sorumluluk bilinci) en fazla olandır. Soy, renk, millet ve zenginlik üstünlük sebebi değildir; farklılıklar **tanışmak** içindir. Bu ölçü, insanları doğuştan gelen özelliklere göre değerlendiren **ırkçılığı** kesin olarak reddeder."
      }
     ],
     "ozet": [
      "İnsanlar yaratılışta eşittir.",
      "Farklılıkların amacı tanışmaktır.",
      "Üstünlük ölçütü takvadır."
     ]
    }
   }
  ]
 }
];
