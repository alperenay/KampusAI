/* =========================================================
   9. Sınıf Türk Dili ve Edebiyatı — konu anlatım ve kazanım rehberi
   Kaynak: kullanıcının verdiği "9. Sınıf Türk Dili ve Edebiyatı Kapsamlı Konu Anlatım ve Kazanım Analiz Rehberi" (4 tema).
   Kazanım kodları tema.sıra biçimindedir. Örnek soruların bir kısmı ve bazı karşılaştırma tabloları kazanımı uygulamak için eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/edebiyat"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Sözün İnceliği",
   "en": "Theme 1: The Subtlety of Words"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Edebiyat ve güzel sanatlar — \"San'at\" (Faruk Nafiz Çamlıbel)",
     "en": "Literature and the fine arts — \"San'at\" (Faruk Nafiz Çamlıbel)"
    },
    "content": {
     "anlatim": "# Temaya Giriş\n\nBu tema; **estetik değer, yaratıcılık, hayal gücü ve imge** gibi temel kavramlar üzerinden edebiyatın dünyasına giriş yapar. Edebî eserlerde her sözün özenle seçildiğini ve seçilen sözlerin anlamı doğrudan etkilediğini fark etmek amaçlanır.\n\n**Temel kavramlar:** açık ve örtük ileti · günlük dil · söz varlığı · hayal gücü · imge · sembol · çağrışım · edebî söyleyiş\n\n# Okuma: \"San'at\" — Faruk Nafiz Çamlıbel\n\n- **Beş Hececiler** anlayışıyla yazılmış, **memleket edebiyatının manifestosu** sayılan bir şiirdir.\n- Şiirde iki sanat anlayışı karşılaştırılır:\n\n| \"Sen\" (Batı hayranı sanat anlayışı) | \"Biz\" (yerli ve millî sanat anlayışı) |\n|---|---|\n| Mabetlerdeki ince mozaikler | Sülüs yazılar, yeşil çiniler |\n| Batı müziği, bale | Zeybek oyunu, halkın acıklı nefesleri |\n| Yabancı şehirlerdeki heykeller | Anadolu, köylünün kıvrılmayan beli |\n\n- Şair yerli olanı üstün tutar; şiir **millî estetiğin ve yerli sanat anlayışının savunusudur**.\n- İncelenecekler: tür özellikleri, **ahenk**, **imge** ve anlam katmanları.\n\n# Güzel Sanatların Sınıflandırılması\n\nGüzel sanatlar kullanılan **malzemeye** ve hitap ettiği **duyu organına** göre üçe ayrılır:\n\n| Grup | Dallar | Özellik |\n|---|---|---|\n| **Plastik (görsel)** | Resim, mimari, heykel, hat, tezhip, ebru, fotoğrafçılık | Maddeye biçim verir, **göze** hitap eder |\n| **Fonetik (işitsel)** | **Edebiyat**, müzik | Malzemesi kelime ve sestir; **kulağa ve zihne** hitap eder |\n| **Ritmik (dramatik)** | Tiyatro, bale, dans, opera, sinema | **Hareket ve ritme** dayanır |\n\n> Edebiyat hiçbir maddi alete bağlı değildir; malzemesi **dil**dir ve bütünüyle zihinseldir.\n\n# Edebiyatın Diğer Disiplinlerle İlişkisi\n\nEdebiyat en çok **tarih, sosyoloji ve psikoloji** ile ilişkilidir:\n- **Tarih:** Tarihî olaylar romanda kurgulanırken tarihten yararlanılır.\n- **Psikoloji:** Kahramanların ruhsal tahlillerinde.\n- **Sosyoloji:** Toplumsal değişimlerin işlenmesinde.",
     "ornekler": [
      {
       "soru": "Edebiyat güzel sanatların hangi grubunda yer alır? Neden?",
       "cozum": "**Fonetik (işitsel) sanatlar.** Malzemesi kelime ve sestir; kulağa ve zihne hitap eder. Maddeye biçim vermediği için plastik, harekete dayanmadığı için ritmik sanatlar grubunda değildir."
      },
      {
       "soru": "Bir romancı, Kurtuluş Savaşı yıllarını anlatırken kahramanının iç çatışmalarını ayrıntılı biçimde çözümlüyor. Yazar hangi disiplinlerden yararlanmıştır?",
       "cozum": "Olayların arka planı için **tarih**ten, kahramanın iç dünyasını çözümlemek için **psikoloji**den yararlanmıştır. Savaşın toplumu nasıl değiştirdiği de işleniyorsa **sosyoloji** de devreye girer."
      }
     ],
     "ozet": [
      "Güzel sanatlar: **plastik** (göz), **fonetik** (kulak/zihin), **ritmik** (hareket).",
      "Edebiyatın malzemesi **dil**dir; fonetik sanatlardandır.",
      "\"San'at\": Beş Hececiler, memleket edebiyatı; \"Sen\" (Batı) ↔ \"Biz\" (yerli/millî).",
      "En yakın disiplinler: tarih, sosyoloji, psikoloji."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Söz sanatları, gerçeklik ve kurmaca",
     "en": "Figures of speech, reality and fiction"
    },
    "content": {
     "anlatim": "# Şiirde Söz Sanatları\n\nŞairler anlatımı zenginleştirmek, estetik haz uyandırmak ve **örtük iletileri** aktarmak için söz sanatlarından yararlanır.\n\n| Sanat | Tanım | Örnek / ipucu |\n|---|---|---|\n| **Teşbih (benzetme)** | Aralarında ilgi bulunan iki unsurdan zayıf olanın güçlü olana benzetilmesi | \"**Dağ gibi** bir zeybek\" |\n| **İstiare (eğretileme)** | Benzetmenin temel ögelerinden **yalnızca biriyle** yapılan sanat | Yalnız benzeyen → **kapalı**; yalnız benzetilen → **açık** istiare |\n| **Teşhis (kişileştirme)** | İnsan dışı varlıklara insan özellikleri verme | \"Ağaçlar **ağladı**\" |\n| **İntak (konuşturma)** | İnsan dışı varlıkları konuşturma | İntak varsa teşhis de vardır |\n| **Mübalağa (abartma)** | Bir durumu olduğundan çok/az gösterme | \"Bir ton ödev verdi\" |\n| **Tezat (zıtlık)** | Zıt kavramları bir arada kullanma | \"Gülerken ağlamak\" |\n| **Mecazımürsel (ad aktarması)** | Benzetme amacı gütmeden bir sözü başka bir söz yerine kullanma | \"**Bayrağım**\" diyerek Türk bayrağını kastetmek; \"Ankara açıklama yaptı\" |\n\n### Benzetmenin ögeleri\n\n1. **Benzeyen** (zayıf unsur) 2. **Kendisine benzetilen** (güçlü unsur) 3. **Benzetme yönü** 4. **Benzetme edatı** (gibi, kadar, sanki…)\n- Teşbihte en az benzeyen + benzetilen bulunur; **istiarede bunlardan yalnızca biri** vardır.\n\n# Gerçeklik ve Kurmaca\n\n| Öğretici metinler | Edebî (sanatsal) metinler |\n|---|---|\n| Dış dünyadaki gerçekliği **nesnel** biçimde aktarır | **Kurmacadır**; yazar gerçekliği kendi süzgecinden geçirir |\n| Dil **göndergesel** işlevdedir, amaç bilgi vermektir | Dil **şiirsel** işlevdedir, amaç estetik hazdır |\n| Örnek: makale, gezi yazısı, anı, biyografi | Örnek: şiir, hikâye, roman, tiyatro |",
     "ornekler": [
      {
       "soru": "\"Rüzgâr kapıyı çaldı, sabırsızdı.\" cümlesindeki söz sanatını belirleyin.",
       "cozum": "Rüzgâra insana özgü **kapı çalma** ve **sabırsızlık** özellikleri verilmiştir → **teşhis (kişileştirme)**. Konuşturma olmadığı için intak yoktur."
      },
      {
       "soru": "\"Aslanım, sınavı kazandın!\" sözünde hangi sanat vardır?",
       "cozum": "Benzeyen (sen/öğrenci) söylenmemiş, yalnızca **kendisine benzetilen (aslan)** kullanılmıştır → **açık istiare**."
      },
      {
       "soru": "\"Bütün sınıf seni bekliyor.\" cümlesinde \"sınıf\" sözcüğü hangi anlamda kullanılmıştır?",
       "cozum": "Sınıf (mekân) söylenip içindeki **öğrenciler** kastedilmiştir; benzetme amacı yoktur → **mecazımürsel (ad aktarması)**."
      }
     ],
     "ozet": [
      "Teşbih: benzeyen + benzetilen birlikte · istiare: yalnızca biri.",
      "Yalnız benzetilen varsa **açık**, yalnız benzeyen varsa **kapalı** istiare.",
      "İntak olan yerde teşhis de vardır.",
      "Mecazımürsel: benzetmesiz ad aktarması (parça-bütün, yer-insan vb.).",
      "Öğretici metin = nesnel gerçeklik; edebî metin = kurmaca, öznel."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Deneme — \"Picasso'nun Hatları\" (Rasim Özdenören)",
     "en": "The essay — \"Picasso's Lines\" (Rasim Özdenören)"
    },
    "content": {
     "anlatim": "# Okuma: \"Picasso'nun Hatları\" — Rasim Özdenören\n\n- Yazar, **Pablo Picasso**'nun İslami **hat sanatına** benzer resimler yapmasını ele alır.\n- Picasso'nun İslami bir niyetle hareket etmediğini; hat sanatını yalnızca kendi niyetini gerçekleştirmek için bir **\"malzeme\"** olarak kullandığını vurgular.\n- **Gelenek ve ruh ilişkisi:** Gelenekten yararlanmak basit bir şema veya malzeme aktarımı değildir; asıl önemli olan o malzemeyi var eden **\"ruh\"**u kavramaktır.\n- Kazanım: deneme türünü tanıma, **ana fikir ve yardımcı fikirleri** bulma, gelenek-sanat ilişkisini irdeleme.\n\n# Deneme Türünün Özellikleri\n\n- Yazar seçtiği herhangi bir konuda **kesin sonuçlara varmadan** kişisel görüşlerini özgürce aktarır.\n- Anlatım **içten, samimi**dir; yazar **kendi kendine konuşur gibi** yazar (sohbet havası).\n- Konu yelpazesi geniştir: sanat, edebiyat, yaşam, felsefe…\n- Kanıtlama ve ispat kaygısı yoktur; **öznel** bir türdür.\n\n| | Temsilciler |\n|---|---|\n| Dünya edebiyatında ilk | **Montaigne** |\n| Türk edebiyatı | **Nurullah Ataç, Sabahattin Eyuboğlu, Suut Kemal Yetkin** |\n\n### Denemeyi benzer türlerden ayırma\n\n| Tür | Fark |\n|---|---|\n| **Deneme** | Kendi kendine konuşma havası, kanıtlama yok |\n| **Sohbet (söyleşi)** | Okurla karşılıklı konuşuyormuş gibi, daha az derin konular |\n| **Makale** | Bir düşünceyi **kanıtlamak** amacıyla, nesnel ve ciddi bir dille |",
     "ornekler": [
      {
       "soru": "Bir yazar \"Belki de mutluluk, aradığımızı bulmak değil aramayı sürdürmektir; bilmiyorum, bu konuda kesin bir şey söyleyemem.\" diyor. Bu ifadeler hangi türe uygundur? Neden?",
       "cozum": "**Deneme.** Yazar kişisel düşüncesini **kesin bir sonuca bağlamadan** ve samimi, kendi kendine konuşur gibi bir üslupla dile getiriyor. Makale olsaydı görüşünü kanıtlarla ispatlamaya çalışırdı."
      },
      {
       "soru": "\"Picasso'nun Hatları\" metninin ana fikri nedir?",
       "cozum": "Gelenekten yararlanmak yalnızca biçimi/malzemeyi almak değildir; o biçimi var eden **ruhu** kavramak gerekir. Picasso hattı yalnızca malzeme olarak kullanmıştır."
      }
     ],
     "ozet": [
      "Deneme: kesin sonuç yok, samimi, kendi kendine konuşur gibi.",
      "İlk temsilci Montaigne; Türk edebiyatında Nurullah Ataç, S. Eyuboğlu, S. K. Yetkin.",
      "Makale kanıtlar, deneme kanıtlamaz; sohbette okurla konuşma havası vardır.",
      "Özdenören: geleneğin malzemesi değil **ruhu** önemlidir."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Anlam Arayışı",
   "en": "Theme 2: The Search for Meaning"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Hikâyenin yapı unsurları — \"Bir Kavak ve İnsanlar\" (Haldun Taner)",
     "en": "Elements of the short story — \"A Poplar and People\" (Haldun Taner)"
    },
    "content": {
     "anlatim": "# Okuma: \"Bir Kavak ve İnsanlar\" — Haldun Taner\n\n- Sahildeki bir kavağın altında huzur bulan bir ihtiyar, vasiyeti üzerine oraya gömülür; sonrasında ağaç adeta **ihtiyarın kimliğini kazanır**. Hikâyede **fantastik ve gerçekçi** ögeler bir aradadır.\n- Sahile fabrika kurmak isteyen zihniyetin doğayı ve kavağı yok etmesi **eleştirilir**.\n- **Doğa ve medeniyet çatışması:** doğaya değer veren ihtiyar ve köylüler ↔ kâr hırsıyla doğayı yok eden fabrikatör.\n\n# Hikâyenin Yapı Unsurları\n\n| Unsur | Açıklama |\n|---|---|\n| **Olay örgüsü** | Yaşanmış veya yaşanabilir olayların **sebep-sonuç** ilişkisiyle sıralanması |\n| **Kişi kadrosu** | Olayı yaşayan **başkarakter** ve **yardımcı karakterler** |\n| **Mekân** | Olayın geçtiği çevre veya yer |\n| **Zaman** | Olayın gerçekleştiği mevsim, yıl veya gün dilimi |\n| **Anlatıcı ve bakış açısı** | Hikâyeyi kimin, hangi açıdan anlattığı (bkz. 3. tema) |\n\n### Tema ve konu\n\n- **Konu:** Metinde anlatılan olay ya da durum (ör. bir kavağın ve onu sevenlerin başına gelenler).\n- **Tema:** Konunun dayandığı **soyut ana duygu/düşünce** (ör. doğa sevgisi, doğa-insan çatışması). Tema tek kelime/sözcük grubuyla ifade edilebilir.",
     "ornekler": [
      {
       "soru": "\"Bir Kavak ve İnsanlar\" hikâyesinin teması ve çatışması nedir?",
       "cozum": "**Tema:** doğa sevgisi / doğanın korunması. **Çatışma:** doğaya değer veren ihtiyar ve köylüler ile kâr hırsıyla doğayı yok eden fabrikatör arasında; yani **doğa ↔ medeniyet (sanayi)**."
      },
      {
       "soru": "Konu ile tema arasındaki fark nedir? Bir örnekle açıklayın.",
       "cozum": "Konu **somut** olarak anlatılan olaydır (bir çocuğun gurbette susması), tema ise bu olayın dayandığı **soyut** duygu/düşüncedir (gurbet, dil sevgisi)."
      }
     ],
     "ozet": [
      "Hikâyenin yapı unsurları: olay örgüsü, kişiler, mekân, zaman (+ anlatıcı).",
      "Olay örgüsü sebep-sonuç ilişkisine dayanır.",
      "Konu somut olay; tema soyut ana duygu/düşünce.",
      "Haldun Taner: doğa-medeniyet çatışması; fantastik + gerçekçi ögeler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Hikâye türleri, açık ve örtük ileti — \"Hişt Hişt!\" (Sait Faik)",
     "en": "Story types, explicit and implicit messages — \"Hişt Hişt!\" (Sait Faik)"
    },
    "content": {
     "anlatim": "# Okuma: \"Hişt, Hişt!\" — Sait Faik Abasıyanık\n\n- Sait Faik, Türk edebiyatında **durum hikâyeciliğinin (Çehov tarzı)** en büyük temsilcilerindendir.\n- Hikâyede yazar doğayla, böceklerle, denizle kurduğu **dostane bağı** ve **iç sesini** sorgular.\n- İnsanın doğadaki sesleri duymasının ve **yaşam sevinciyle** dolmasının önemi işlenir.\n- Kazanım: açık ve örtük iletileri ayırt etme, yazarın bakış açısını kavrama.\n\n# Hikâye Türleri\n\n| | **Olay hikâyesi** (Maupassant tarzı) | **Durum hikâyesi** (Çehov tarzı) |\n|---|---|---|\n| Odak | Bir **olay** | Hayatın bir **kesiti**, an veya durum |\n| Plan | **Serim – düğüm – çözüm** vardır | Bu bölümler zorunlu değildir |\n| Merak | Merak ögesi canlıdır, sonuç önemlidir | Merak geri plandadır, atmosfer ve duygu önemlidir |\n| Türk edebiyatı | **Ömer Seyfettin**, Refik Halit Karay | **Sait Faik**, Memduh Şevket Esendal |\n\n# Açık ve Örtük İleti\n\n- **Açık ileti:** Metinde **doğrudan**, yorum gerektirmeden verilen mesaj.\n- **Örtük ileti:** **İmge, sembol ve çağrışımlar** yoluyla okurun sezmesine bırakılan derin anlam katmanı.\n\n> Edebî metinler çoğunlukla **örtük** iletiler taşır; okur metni yorumlayarak bu anlamı kendisi kurar.",
     "ornekler": [
      {
       "soru": "Bir hikâyede belirgin bir olay yok; yazar bir sabah iskelede balıkçıları izlerken hissettiklerini anlatıyor ve hikâye bir sonuca bağlanmıyor. Bu hangi tür hikâyedir?",
       "cozum": "**Durum (Çehov tarzı) hikâyesi.** Olaydan çok bir **an/kesit** ve duygular anlatılıyor; serim-düğüm-çözüm planı yok."
      },
      {
       "soru": "\"Hişt, Hişt!\" hikâyesinde \"doğadaki seslere kulak vermek\" ifadesinin örtük iletisi ne olabilir?",
       "cozum": "Yalnızca sesleri duymak değil; insanın **doğayla bağ kurması**, kendi iç sesini fark etmesi ve **yaşam sevincini** yeniden bulması gerektiği. Bu anlam doğrudan söylenmez, okurun sezmesine bırakılır."
      }
     ],
     "ozet": [
      "Olay hikâyesi = Maupassant tarzı, serim-düğüm-çözüm, Ömer Seyfettin.",
      "Durum hikâyesi = Çehov tarzı, hayattan kesit, Sait Faik ve Memduh Şevket.",
      "Açık ileti doğrudan; örtük ileti imge, sembol ve çağrışımla verilir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Anı — \"Nihayet Beklediğimiz Büyük Gün\" (Halide Nusret Zorlutuna)",
     "en": "The memoir — \"The Great Day We Had Been Waiting For\" (Halide Nusret Zorlutuna)"
    },
    "content": {
     "anlatim": "# Okuma: \"Nihayet Beklediğimiz Büyük Gün\" — Halide Nusret Zorlutuna\n\n- Yazarın **\"Bir Devrin Romanı\"** adlı anı kitabından alınmıştır.\n- Osmanlı Devleti'nin yıkılış süreci, **mütareke yıllarının acıları** ve **6 Ekim 1923**'te İstanbul'un işgalden kurtuluşunun yarattığı büyük coşku anlatılır.\n- **Millî Mücadele ruhu:** Dönemin toplumsal ruh hâli, halkın vatan sevgisi ve bağımsızlık inancı **lirik** bir üslupla aktarılır.\n- Kazanım: anı türünü tanıma, **tarihî olaylar ile bireysel deneyimler** arasında bağ kurma.\n\n# Anı (Hatıra) Türünün Özellikleri\n\n- Kişilerin yaşadıkları veya **tanık oldukları** olayları, **üzerinden zaman geçtikten sonra** kendi bakış açılarıyla yazdıkları türdür.\n- **Gerçeğe bağlılık** esastır; ancak yazarın **öznel** duygu ve izlenimlerini de barındırır.\n- Genellikle **birinci tekil kişi** ağzından yazılır; tarihî dönemlere ışık tutan **belge değeri** taşır.\n- Türk edebiyatında ilk anı örneği: Babür Şah'ın **\"Babürname\"**si. **Kök Türk Kitabeleri** de anı-söylev özelliği taşır.\n\n### Anı – günlük farkı\n\n| Anı | Günlük |\n|---|---|\n| Olaylar **aradan zaman geçtikten sonra** yazılır | Olaylar **yaşandığı gün** yazılır |\n| Tarih atılması zorunlu değildir | Her yazının başında **tarih** bulunur |",
     "ornekler": [
      {
       "soru": "Anı ile günlük arasındaki temel fark nedir?",
       "cozum": "Anıda olaylar **üzerinden zaman geçtikten sonra** hatırlanarak yazılır; günlükte ise olaylar **yaşandığı gün** ve **tarih** atılarak yazılır."
      },
      {
       "soru": "Bir metnin anı türünde yazıldığını hangi özelliklerden anlarsınız?",
       "cozum": "Yazarın **kendi yaşadığı/tanık olduğu** gerçek olayları, **birinci kişi** ağzından ve **geriye dönüp hatırlayarak** anlatması; gerçek kişi, yer ve tarihlerin yer alması."
      }
     ],
     "ozet": [
      "Anı: yaşanan/tanık olunan olaylar, zaman geçtikten sonra yazılır.",
      "Gerçeğe bağlıdır ama yazarın öznel izlenimlerini taşır.",
      "İlk örnek Babürname; Kök Türk Kitabeleri anı-söylev özelliği taşır.",
      "Zorlutuna, İstanbul'un kurtuluşunu (6 Ekim 1923) lirik bir üslupla anlatır."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Anlamın Yapı Taşları",
   "en": "Theme 3: The Building Blocks of Meaning"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Anlatıcı ve bakış açıları — \"Eskici\" (Refik Halit Karay)",
     "en": "Narrator and point of view — \"The Junk Dealer\" (Refik Halit Karay)"
    },
    "content": {
     "anlatim": "# Okuma: \"Eskici\" — Refik Halit Karay\n\n- **\"Gurbet Hikâyeleri\"** arasında yer alır.\n- Annesini ve babasını kaybettikten sonra **Filistin**'deki halasının yanına gönderilen küçük **Hasan**'ın gurbet acısı ve **ana diline özlemi** işlenir.\n- **Gurbet ve dil:** Hasan'ın aylarca susması ve **İzmitli bir eskiciyle Türkçe konuşunca** çözülmesi, dilin insan ruhundaki birleştirici gücünü gösterir.\n\n# Anlatıcı ve Bakış Açıları\n\n| Bakış açısı | Özellik | Kişi |\n|---|---|---|\n| **Hâkim (ilahi)** | Anlatıcı **her şeyi bilir**; kahramanların iç dünyasını ve düşüncelerini okur | 3. tekil kişi |\n| **Gözlemci** | Anlatıcı yalnızca **gördüklerini** bir kamera tarafsızlığıyla aktarır; zihin okuyamaz | 3. tekil kişi |\n| **Kahraman anlatıcı** | Anlatıcı olayın içindeki karakterlerden biridir | **1. tekil kişi** |\n\n### İpuçları\n\n- \"…**diye düşündü**, içinden … **geçirdi**\" → kahramanın zihni okunuyor → **hâkim** bakış açısı.\n- Yalnızca dış görünüş, hareket ve konuşmalar → **gözlemci**.\n- \"Ben…\", \"…dım, …dik\" → **kahraman anlatıcı**.",
     "ornekler": [
      {
       "soru": "\"Hasan pencerenin önünde oturuyordu. Kimseyle konuşmuyor, sokaktan geçenlere bakıyordu.\" Bu parçada hangi bakış açısı kullanılmıştır?",
       "cozum": "Anlatıcı yalnızca **görüleni** (oturma, bakma, konuşmama) aktarıyor, Hasan'ın düşüncelerini söylemiyor → **gözlemci bakış açısı**."
      },
      {
       "soru": "\"Hasan, bu yabancı dilin içinde kaybolduğunu, kimsenin onu anlamayacağını düşünüyordu.\" Bakış açısı nedir?",
       "cozum": "Anlatıcı kahramanın **zihninden geçenleri** biliyor → **hâkim (ilahi) bakış açısı**."
      }
     ],
     "ozet": [
      "Hâkim: her şeyi bilir, zihin okur (3. kişi).",
      "Gözlemci: yalnız görüleni aktarır (3. kişi).",
      "Kahraman anlatıcı: olayın içinde, 1. kişi.",
      "\"Eskici\": gurbet ve ana dilinin birleştirici gücü."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Şiirde yapı, ahenk ve ölçü; şiir türleri",
     "en": "Structure, harmony and meter in poetry; types of poems"
    },
    "content": {
     "anlatim": "# Şiirde Yapı ve Ahenk Unsurları\n\nŞiirde anlamı ve duygu coşkusunu pekiştiren en önemli unsurlar **ahenk** ve **yapı** ögeleridir.\n\n### Nazım birimi\n\n**Dize** (tek satır) · **beyit** (iki dize) · **dörtlük** (dört dize) · **bent** (dörtten fazla dizeden oluşan birim).\n\n### Kafiye (uyak) ve redif\n\n- **Redif:** Uyaklardan sonra gelen, **yazılışı ve görevi aynı** olan ek veya kelimeler. Kafiye bulunurken **önce redif ayrılır**.\n- **Kafiye:** Dize sonlarındaki ses benzerlikleri (görevleri ya da anlamları farklı).\n\n| Kafiye türü | Ses benzerliği | Örnek |\n|---|---|---|\n| **Yarım** | Tek ses | ağa**ç** – kılı**ç** |\n| **Tam** | İki ses (ünlü + ünsüz) | y**ar** – b**ar** |\n| **Zengin** | Üç veya daha fazla ses | **anı**r – y**anı**r |\n| **Cinaslı** | Yazılışı aynı, anlamı farklı kelimeler | **yüz** (surat) – **yüz** (sayı) |\n\n### Kafiye örgüsü (uyak şeması)\n\n| Örgü | Şema |\n|---|---|\n| **Düz** | aaab, cccb / aa, bb |\n| **Çapraz** | abab |\n| **Sarmal** | abba |\n| **Mani tipi** | aaxa |\n| **Örüşük** | aba, bcb, cdc… |\n\n### Ölçü (vezin)\n\n- **Hece ölçüsü:** Dizelerdeki **hece sayılarının** eşitliğine dayanır (ör. 7'li, 8'li, 11'li); **durak** önemlidir.\n- **Aruz ölçüsü:** Hecelerin **uzunluk-kısalığına** (ses değerlerine) dayanır; Divan edebiyatında kullanılır.\n- **Serbest şiir:** Belirli bir ölçüye bağlı değildir.\n\n# Şiir Türleri (konusuna göre)\n\n| Tür | Konu |\n|---|---|\n| **Lirik** | Coşkulu duygular (aşk, ayrılık, özlem) |\n| **Epik** | Kahramanlık, yiğitlik, savaş |\n| **Pastoral** | Doğa ve çoban hayatı |\n| **Didaktik** | Öğretici, bilgi ve öğüt veren |\n| **Satirik** | Eleştirel, iğneleyici (hiciv) |",
     "ornekler": [
      {
       "soru": "\"Gönlüm hep seni arıyor / Ellerim seni sarıyor\" dizelerinde redif ve kafiyeyi bulun.",
       "cozum": "Önce redif ayrılır: her iki dizedeki **-ıyor** eki aynı görevlidir → **redif**. Geriye kalan *ar* / *sar* sözcüklerinde **\"ar\"** ses benzerliği (iki ses) → **tam kafiye**."
      },
      {
       "soru": "Kafiye şeması **abba** olan bir dörtlükte hangi uyak örgüsü vardır?",
       "cozum": "1. ile 4., 2. ile 3. dizeler uyaklıdır → **sarmal uyak**."
      },
      {
       "soru": "Kahramanlık ve savaşı anlatan şiirler hangi türdendir?",
       "cozum": "**Epik şiir.** (Aşk ve özlem → lirik; doğa ve çoban hayatı → pastoral; öğüt → didaktik; eleştiri → satirik.)"
      }
     ],
     "ozet": [
      "Nazım birimi: dize, beyit, dörtlük, bent.",
      "Önce **redif** ayrılır, sonra kafiye bulunur.",
      "Kafiye: yarım (1 ses), tam (2), zengin (3+), cinaslı (sesteş).",
      "Uyak örgüsü: düz, çapraz (abab), sarmal (abba), mani tipi (aaxa), örüşük.",
      "Hece ölçüsü sayıya, aruz uzunluk-kısalığa dayanır.",
      "Şiir türleri: lirik, epik, pastoral, didaktik, satirik."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Gezi yazısı — \"Bizim Akdeniz\" (Falih Rıfkı Atay)",
     "en": "The travel essay — \"Our Mediterranean\" (Falih Rıfkı Atay)"
    },
    "content": {
     "anlatim": "# Okuma: \"Bizim Akdeniz\" — Falih Rıfkı Atay\n\n- Türk gezi edebiyatının başyapıtlarındandır.\n- Yazar **Antalya**'nın doğasını, **Toros** dağlarını, sahil ovasını, zeytin ve portakal bahçelerini güçlü bir **gözlem** yeteneği ve akıcı bir Türkçe ile **betimler**.\n\n# Gezi Yazısının Özellikleri\n\n- Yazarın **gezip gördüğü yerlerin** doğal, tarihî, sosyal ve kültürel özelliklerini ilgi çekici bir üslupla anlattığı türdür (**seyahatname**).\n- **Gözlem, betimleme ve açıklama** anlatım biçimleri yoğun olarak kullanılır.\n- Gerçeğe bağlıdır; ama yazarın kişisel izlenimlerini de taşır. **Öğretici** metinler arasında yer alır.\n- Türk edebiyatında ilk örnek: **Seydi Ali Reis — \"Mir'âtü'l-Memâlik\"**. Türün zirvesi: **Evliya Çelebi — \"Seyahatname\"**.\n\n### Anı ile gezi yazısı farkı\n\n| Anı | Gezi yazısı |\n|---|---|\n| Geçmişteki **yaşam deneyimlerine** odaklanır | **Yeni coğrafyaların ve mekânların** tanıtımını amaçlar |\n| Merkezde **olaylar ve kişiler** vardır | Merkezde **yer** vardır |",
     "ornekler": [
      {
       "soru": "Bir metinde yazar, gittiği bir kasabanın taş evlerini, pazarını ve yöresel yemeklerini ayrıntılı biçimde anlatıyor. Bu metin hangi türe girer ve en çok hangi anlatım biçimi kullanılmıştır?",
       "cozum": "**Gezi yazısı.** Yazar gezip gördüğü yeri tanıtıyor; ağırlıklı anlatım biçimi **betimleme**dir (gözlem ve açıklamayla birlikte)."
      },
      {
       "soru": "Türk edebiyatında gezi türünün ilk örneği ve zirvesi hangi eserlerdir?",
       "cozum": "İlk örnek: Seydi Ali Reis'in **Mir'âtü'l-Memâlik**'i. Zirve: Evliya Çelebi'nin **Seyahatname**'si."
      }
     ],
     "ozet": [
      "Gezi yazısı = gezilip görülen yerin tanıtılması; betimleme ağırlıklı.",
      "İlk örnek Mir'âtü'l-Memâlik (Seydi Ali Reis); zirve Seyahatname (Evliya Çelebi).",
      "Anı olaya/kişiye, gezi yazısı yere odaklanır.",
      "Falih Rıfkı Atay — \"Bizim Akdeniz\": Antalya ve Toroslar."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Tema: Dilin Zenginliği",
   "en": "Theme 4: The Richness of Language"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Roman — \"Çalıkuşu\" (Reşat Nuri Güntekin)",
     "en": "The novel — \"The Wren\" (Reşat Nuri Güntekin)"
    },
    "content": {
     "anlatim": "# Okuma: \"Çalıkuşu\" — Reşat Nuri Güntekin\n\n- Türk edebiyatının en sevilen **sosyal romanlarından** biridir.\n- İstanbul'da neşeli, ele avuca sığmaz bir öğretmen adayı olan **Feride**'nin **Kâmran**'ın ihanetiyle yıkılması ve **Anadolu**'nun çeşitli köylerinde öğretmenlik yaparken geçirdiği büyük **ruhsal dönüşüm** anlatılır.\n- **Millî Edebiyat ve Anadolu:** Roman, İstanbul merkezli aydın ile **Anadolu gerçeğini** buluşturarak dönemin ideallerini yansıtır.\n- Roman büyük ölçüde **günlük/anı** biçiminde yazıldığı için üslubu içten ve samimidir.\n\n# Roman Türünün Özellikleri\n\n- İnsan ve toplum ilişkilerini, olayları **geniş bir zaman diliminde**, ayrıntılı mekân tasvirleriyle ele alan **uzun** anlatı türüdür.\n- Hikâyeye göre kişi kadrosu daha **kalabalık**, olay örgüsü daha **karmaşık**tır.\n\n| | İlk örnekler |\n|---|---|\n| Dünyada ilk modern roman | **Cervantes — \"Don Kişot\"** |\n| Türk edebiyatında ilk yerli roman | **Şemsettin Sami — \"Taaşşuk-ı Talat ve Fitnat\"** |\n| Türk edebiyatında ilk edebî roman | **Namık Kemal — \"İntibah\"** |\n\n### Roman – hikâye karşılaştırması\n\n| Roman | Hikâye |\n|---|---|\n| Uzun, geniş zaman dilimi | Kısa, dar zaman dilimi |\n| Kalabalık kişi kadrosu | Az sayıda kişi |\n| Ayrıntılı tasvirler | Ayrıntıya az yer verilir |",
     "ornekler": [
      {
       "soru": "\"Çalıkuşu\" romanı Millî Edebiyat anlayışını hangi yönüyle yansıtır?",
       "cozum": "İstanbullu bir aydının (Feride) **Anadolu'ya gidip** oranın gerçekleriyle tanışmasını anlatarak **Anadolu'yu edebiyatın merkezine** taşır; sade bir dil kullanır."
      },
      {
       "soru": "Türk edebiyatında ilk yerli roman ile ilk edebî romanı eşleştirin.",
       "cozum": "İlk yerli roman: **Taaşşuk-ı Talat ve Fitnat** (Şemsettin Sami). İlk edebî roman: **İntibah** (Namık Kemal)."
      }
     ],
     "ozet": [
      "Roman: uzun, geniş zaman, kalabalık kadro, ayrıntılı tasvir.",
      "İlk modern roman Don Kişot (Cervantes).",
      "İlk yerli roman Taaşşuk-ı Talat ve Fitnat; ilk edebî roman İntibah.",
      "Çalıkuşu: Feride'nin Anadolu'daki dönüşümü; günlük/anı formu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Romanda anlatım teknikleri ve üslup",
     "en": "Narrative techniques and style in the novel"
    },
    "content": {
     "anlatim": "# Başlıca Anlatım Teknikleri\n\nNitelikli romanlarda yazar kurguyu güçlendirmek ve okurun dikkatini canlı tutmak için çeşitli tekniklere başvurur.\n\n| Teknik | Açıklama | İpucu |\n|---|---|---|\n| **Özetleme** | Uzun olayları veya zaman geçişlerini kısa paragraflarla aktarma | \"Aradan üç yıl geçti…\" |\n| **Diyalog** | Kahramanların karşılıklı konuşmalarına yer verme | Tırnak / konuşma çizgisi |\n| **İç çözümleme** | Anlatıcının araya girerek kahramanın zihninden geçenleri **okura aktarması** | 3. kişi: \"…diye düşünüyordu\" |\n| **Bilinç akışı** | Kahramanın düşüncelerinin **mantıksal bir sıra olmadan**, zihninden aktığı gibi verilmesi | Kopuk, çağrışımlı, noktalamasız cümleler |\n| **Geriye dönüş** | Şimdiki zamandan geçmişteki olaylara/hatıralara geçiş | \"Birden çocukluğu aklına geldi…\" |\n\n> **İç çözümleme ↔ bilinç akışı:** İç çözümlemede anlatıcı düşünceleri **düzenleyerek** aktarır; bilinç akışında düşünceler **düzensiz ve doğrudan** verilir.\n\n# Üslup (Biçem)\n\n- Sanatçının dili kullanırken gösterdiği **kişisel beceri ve seçimlerin bütünü**dür.\n- Üslubun temel ilkeleri: **açıklık, duruluk, yalınlık, özgünlük**.\n- Çalıkuşu günlük/anı formunda yazıldığı için **içten ve samimi** bir üsluba sahiptir.",
     "ornekler": [
      {
       "soru": "\"Feride o gece uyuyamadı; Kâmran'ın sözlerini, teyzesinin bakışlarını, okulun soğuk koridorlarını düşündü durdu.\" Bu cümlede hangi anlatım tekniği vardır?",
       "cozum": "Anlatıcı (3. kişi) kahramanın zihninden geçenleri **düzenli bir biçimde** okura aktarıyor → **iç çözümleme**."
      },
      {
       "soru": "\"Yağmur… annem… o mavi kapı, neden kapattılar, belki de hiç açık değildi…\" Bu ifadede hangi teknik kullanılmıştır?",
       "cozum": "Düşünceler **mantıksal sıra olmadan**, çağrışımlarla ve kopuk biçimde aktığı gibi verilmiş → **bilinç akışı**."
      }
     ],
     "ozet": [
      "Özetleme: zaman atlama; diyalog: karşılıklı konuşma.",
      "İç çözümleme: anlatıcı düşünceleri düzenleyerek aktarır.",
      "Bilinç akışı: düşünceler sırasız, aktığı gibi.",
      "Geriye dönüş: geçmişe dönüş.",
      "Üslubun ilkeleri: açıklık, duruluk, yalınlık, özgünlük."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Eleştiri — \"Parasız Yatılı\" (Mehmet Kaplan)",
     "en": "Criticism — \"Parasız Yatılı\" (Mehmet Kaplan)"
    },
    "content": {
     "anlatim": "# Okuma: \"Parasız Yatılı\" — Mehmet Kaplan\n\n- Mehmet Kaplan, **Füruzan**'ın \"Parasız Yatılı\" hikâyesini tahlil eder; edebî eser incelemesinin güzel örneklerindendir.\n- Eleştirmen, hikâyedeki **basit olayın** ve **yoksulluk** temasının sanatsal bir derinliğe nasıl kavuşturulduğunu inceler.\n- **Yaşantı hikâyesi:** Kaplan, Füruzan'ın hikâyesini klasik olay hikâyesinden ayırarak bir **\"yaşantı hikâyesi\"** olarak niteler.\n- Kazanım: eleştiri türünü tanıma; bir eseri **yapı, içerik ve üslup** yönünden değerlendirme.\n\n# Eleştiri (Tenkit) Türünün Özellikleri\n\n- Bir edebî eserin veya sanatçının **olumlu ve olumsuz** yönlerini, gerçek değerini **bilimsel ve estetik** ölçütlerle ortaya koyan yazı türüdür.\n- Batı edebiyatında **\"kritik\"** adıyla bilinir.\n- Türk edebiyatında **Tanzimat** Dönemi'nde **Namık Kemal**'in **\"Mukaddime-i Celâl\"** ve **\"Tahrib-i Harabat\"** gibi yazılarıyla önem kazanmıştır.\n- **Yapıcı** eleştiri eserin ve sanatçının gelişmesine katkı sağlar; eleştirmen kişisel kırgınlıklarla değil **ölçütlerle** hareket etmelidir.\n\n### Bir eseri değerlendirme ölçütleri\n\n1. **Yapı:** olay örgüsü, kişiler, zaman-mekân, bakış açısı\n2. **İçerik:** konu, tema, iletiler\n3. **Üslup:** dil, anlatım teknikleri, söz sanatları",
     "ornekler": [
      {
       "soru": "Eleştiri yazısının \"tanıtma yazısı\"ndan farkı nedir?",
       "cozum": "Tanıtma yazısı eseri yalnızca **tanıtıp okura önerir**; eleştiri ise eserin **olumlu ve olumsuz** yönlerini bilimsel ve estetik ölçütlerle **değerlendirir**."
      },
      {
       "soru": "Mehmet Kaplan \"Parasız Yatılı\"yı neden \"yaşantı hikâyesi\" olarak nitelendirir?",
       "cozum": "Hikâyede klasik olay hikâyesindeki gibi merak uyandıran bir olay örgüsü yerine, bir kişinin **iç yaşantısı** ve yoksulluk deneyimi öne çıkar; değer olaydan değil **yaşantının derinliğinden** gelir."
      }
     ],
     "ozet": [
      "Eleştiri: olumlu + olumsuz yönler, bilimsel ve estetik ölçüt.",
      "Batıda \"kritik\"; bizde Tanzimat'ta Namık Kemal ile önem kazandı.",
      "Değerlendirme: yapı, içerik, üslup.",
      "Kaplan: Füruzan'ın hikâyesi bir \"yaşantı hikâyesi\"dir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.4",
    "title": {
     "tr": "Otobiyografi — \"Âşık Veysel\" belgeseli",
     "en": "Autobiography — the \"Âşık Veysel\" documentary"
    },
    "content": {
     "anlatim": "# Dinleme/İzleme: \"Âşık Veysel\" Belgeseli\n\n- Âşık Veysel'in kendi ağzından hayat hikâyesini anlattığı belgesel/otobiyografik anlatıdır.\n- **Halk ozanlığının** derinliği; **yedi yaşında çiçek hastalığı** nedeniyle gözlerini kaybetmesi ve **babasının hediye ettiği sazla** başlayan sanat yolculuğu anlatılır.\n\n# Otobiyografi Türünün Özellikleri\n\n- Bir kişinin **kendi yaşam öyküsünü** (hayatını, deneyimlerini, başarılarını) **birinci tekil kişi** ağzından anlattığı türdür.\n- **Gerçeğe bağlılık** esastır ancak anlatılanlar yazarın **kendi süzgecinden** geçer (öznel).\n\n### Biyografi – otobiyografi – anı\n\n| | Biyografi | Otobiyografi | Anı |\n|---|---|---|---|\n| Kimin hayatı? | **Başkasının** | **Kendisinin** | Yazarın yaşadığı/tanık olduğu **olaylar** |\n| Anlatım kişisi | 3. kişi | 1. kişi | 1. kişi |\n| Bakış | Tarafsızlık amaçlanır | Öznel | Öznel |\n| Odak | Hayatın bütünü | Hayatın bütünü | Belirli olaylar ve dönem |",
     "ornekler": [
      {
       "soru": "Bir yazar, ünlü bir bilim insanının doğumundan ölümüne kadar hayatını belgelere dayanarak anlatıyor. Bu metin hangi türdür?",
       "cozum": "Başkasının hayatı, 3. kişi ağzından ve belgelere dayanarak anlatılıyor → **biyografi**."
      },
      {
       "soru": "Otobiyografi ile anı arasındaki fark nedir?",
       "cozum": "Otobiyografi kişinin **hayatının bütününü** merkeze alır; anı ise yazarın yaşadığı veya tanık olduğu **belirli olayları ve dönemi** anlatır, yazar kadar çevresindeki olaylar da önemlidir."
      }
     ],
     "ozet": [
      "Otobiyografi: kişi kendi hayatını 1. kişi ağzından anlatır.",
      "Biyografi: başkasının hayatı, 3. kişi, tarafsızlık.",
      "Anı belirli olaylara, otobiyografi hayatın bütününe odaklanır.",
      "Âşık Veysel: 7 yaşında çiçek hastalığıyla görme kaybı, babasının hediye ettiği saz."
     ]
    }
   },
   {
    "id": "k5",
    "code": "4.5",
    "title": {
     "tr": "Yıl sonu genel değerlendirme",
     "en": "End-of-year general review"
    },
    "content": {
     "anlatim": "# Yıl Sonu Genel Değerlendirme\n\n9. sınıf boyunca dört tema işlendi: **Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği**. Edebiyatın güzel sanatlar içindeki yerinden başlanarak şiir tahlili ile **sanatsal** ve **öğretici** metin türleri yapı ve üslup özellikleriyle incelendi.\n\n### Türlerin genel haritası\n\n| Tür | Grup | Okunan metin |\n|---|---|---|\n| Şiir | Sanatsal (kurmaca) | \"San'at\" — Faruk Nafiz Çamlıbel |\n| Hikâye | Sanatsal (kurmaca) | \"Bir Kavak ve İnsanlar\", \"Hişt Hişt!\", \"Eskici\" |\n| Roman | Sanatsal (kurmaca) | \"Çalıkuşu\" — Reşat Nuri Güntekin |\n| Deneme | Öğretici | \"Picasso'nun Hatları\" — Rasim Özdenören |\n| Anı | Öğretici | \"Nihayet Beklediğimiz Büyük Gün\" — H. N. Zorlutuna |\n| Gezi yazısı | Öğretici | \"Bizim Akdeniz\" — Falih Rıfkı Atay |\n| Eleştiri | Öğretici | \"Parasız Yatılı\" — Mehmet Kaplan |\n| Otobiyografi | Öğretici | \"Âşık Veysel\" belgeseli |\n\n### Temel kazanımlar\n\n- Türkçenin zengin **söz varlığını**, yapım eklerini ve ses olaylarını kavrama.\n- Metinler arası karşılaştırmalar yaparak **açık ve örtük iletileri** çözme.\n- Yazılı ve sözlü anlatım kurallarına uygun olarak **sunum, bilgi görseli ve otobiyografi** hazırlama.",
     "ornekler": [
      {
       "soru": "Aşağıdaki türleri sanatsal ve öğretici olarak ayırın: roman, anı, şiir, gezi yazısı, eleştiri, hikâye.",
       "cozum": "**Sanatsal (kurmaca):** roman, şiir, hikâye. **Öğretici:** anı, gezi yazısı, eleştiri."
      },
      {
       "soru": "Hangi okuma metni hangi türün örneğidir: \"Eskici\", \"Bizim Akdeniz\", \"Parasız Yatılı\" (Mehmet Kaplan)?",
       "cozum": "\"Eskici\" → **hikâye**; \"Bizim Akdeniz\" → **gezi yazısı**; Mehmet Kaplan'ın \"Parasız Yatılı\" yazısı → **eleştiri**."
      }
     ],
     "ozet": [
      "4 tema: Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği.",
      "Sanatsal: şiir, hikâye, roman · Öğretici: deneme, anı, gezi, eleştiri, otobiyografi.",
      "Her metinde açık ve örtük iletileri ayırt etmeyi unutma."
     ]
    }
   }
  ]
 }
];
