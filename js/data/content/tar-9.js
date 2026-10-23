/* =========================================================
   9. Sınıf Tarih — kazanım konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Tarih Ders Kitabı Ayrıntılı Kazanım Konu Anlatım Notları" (3 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Kaynaktaki yazım ve küçük bilgi hataları düzeltildi; tablolar ve örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/tarih"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Geçmişin İnşa Sürecinde Tarih",
   "en": "Unit 1: History in the Construction of the Past"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "TAR.9.1.1",
    "title": {
     "tr": "Tarih öğrenmenin faydaları",
     "en": "The benefits of learning history"
    },
    "content": {
     "anlatim": "# Tarih Öğrenmenin Faydaları\n\n| Fayda | Açıklama |\n|---|---|\n| **Millî bilinç ve aidiyet** | Tarih bilinci milletin birliğinden, ortak duygularından ve geçmişteki mücadelelerinden beslenir; vatan ve bayrak sevgisi, bağımsızlık, cesaret ve dayanışmayı geliştirir. |\n| **Toplumsal hafıza** | Bireyin hafızası ne kadar önemliyse toplumun geçmişini bilmesi de o kadar hayatidir. Geçmişini bilmeyen toplum **kimliğini kaybeder**, süreklilik sağlayamaz. |\n| **Geleceğe yön verme** | Geçmiş olayların **neden ve sonuçları** incelenerek geleceğe dair öngörülerde bulunulur, benzer hataların tekrarı önlenir. |\n| **Çok yönlü düşünme ve empati** | Olayları tek taraflı değerlendirmemeyi, **o günün şartlarına** (siyasi, sosyal, ekonomik) göre incelemeyi, sorgulamayı ve empati kurmayı öğretir. |\n| **Kültürel mirasa sahip çıkma** | Tarihî eserlerin ve arkeolojik buluntuların korunması, yurt dışına kaçırılan eserlerin (ör. **Karun hazineleri**, **Çingene Kızı mozaiği** parçaları) geri getirilmesi ulusal bir ödevdir. |\n\n> Atatürk: *\"Türk çocuğu ecdadını tanıdıkça daha büyük işler yapmak için kendinde kuvvet bulacaktır.\"*\n\n### Dikkat: \"O günün şartlarına göre değerlendirme\"\n\nGeçmişteki bir olayı bugünün değer yargılarıyla yargılamak **anakronizm** (zaman yanılgısı) hatasıdır. Tarihçi olayı kendi dönemi içinde anlamaya çalışır.",
     "ornekler": [
      {
       "soru": "Bir öğrenci, Orta Çağ'daki bir hükümdarın kararını \"Bugünkü insan hakları anlayışına uymuyor, o hâlde tamamen yanlıştı\" diye değerlendiriyor. Bu değerlendirmedeki hata nedir?",
       "cozum": "Olayı **o günün şartlarına göre değil**, bugünün değer yargılarıyla değerlendirmiş → **anakronizm** hatası. Tarih öğrenmek olayları kendi dönemi içinde, çok yönlü değerlendirmeyi gerektirir."
      },
      {
       "soru": "Yurt dışına kaçırılan tarihî eserlerin geri getirilmesi tarih öğrenmenin hangi faydasıyla ilgilidir?",
       "cozum": "**Kültürel mirasa sahip çıkma** (ve toplumsal hafızanın korunması)."
      }
     ],
     "ozet": [
      "Faydalar: millî bilinç, toplumsal hafıza, geleceğe yön verme, çok yönlü düşünme/empati, kültürel mirası koruma.",
      "Olaylar o günün şartlarına göre değerlendirilir (anakronizmden kaçınılır).",
      "Geçmişini bilmeyen toplum kimliğini kaybeder."
     ]
    }
   },
   {
    "id": "k2",
    "code": "TAR.9.1.2",
    "title": {
     "tr": "Tarihin doğası: konu, unsurlar ve temel kavramlar",
     "en": "The nature of history: subject, elements and key concepts"
    },
    "content": {
     "anlatim": "# Tarihin Konusu\n\nTarihin temel konusu **insandır**: insanların geçmişteki faaliyetleri, toplumsal değişimler, ekonomik ve kültürel koşullar. Astronomi veya yanardağ püskürmesi gibi doğa olayları **insana doğrudan bağlı olmadığı sürece** tarihin alanı dışındadır.\n\n# Tarihsel Bilginin Temel Unsurları\n\n1. **İnsan** — geçmişten bugüne insan faaliyetleri\n2. **Kaynak** — geçmiş olayların izlerini taşıyan eşya, mimari yapı, yazılı belgeler\n3. **Tarihçi** — kaynakları yöntemle inceleyen, sorgulayan ve yorumlayan kişi\n\n# Tarih ile Fen Bilimleri Arasındaki Farklar\n\n| Fen bilimleri | Tarih |\n|---|---|\n| Olaylar laboratuvarda **tekrarlanabilir** | Tarihsel olaylar **tekrar gözlemlenemez**, laboratuvarda yinelenemez |\n| **Kesin yasalara** dayanır (ör. kütle çekim yasası) | **Belgelere dayalı çıkarım ve yorumlara** dayanır |\n| Deney ve gözlem | Kaynak inceleme ve eleştiri |\n| — | Yeni belgeler bulundukça bilgi **değişebilir** |\n\n# Temel Kavramlar\n\n| Kavram | Tanım | Örnek |\n|---|---|---|\n| **Olay** | Belirli bir zamanda, **kısa sürede** meydana gelen **somut ve özel** gelişme | Malazgirt Savaşı, İstanbul'un Fethi |\n| **Olgu** | Bir olaydan sonra başlayan **uzun süreli, soyut ve genel** süreç | Anadolu'nun Türkleşmesi, Sanayi Devrimi |\n| **Kronoloji** | Olayların **zaman sırasına** konulması | — |\n| **Değişim ve süreklilik** | Toplumların nasıl değiştiği ve neyin sürdüğü | Dil ve geleneklerin süregelmesi |",
     "ornekler": [
      {
       "soru": "\"Malazgirt Savaşı\" ile \"Anadolu'nun Türkleşmesi\" arasındaki fark nedir?",
       "cozum": "Malazgirt Savaşı (1071) belirli bir tarihte kısa sürede gerçekleşen **somut bir olaydır**. Anadolu'nun Türkleşmesi ise bu savaştan sonra başlayan, **uzun süreli ve soyut** bir süreçtir → **olgu**."
      },
      {
       "soru": "Tarihsel bilgi neden fen bilimlerindeki yasalar gibi kesin değildir?",
       "cozum": "Tarihsel olaylar **tekrarlanamaz** ve laboratuvarda gözlemlenemez; bilgi **belgelere dayalı yorumlara** dayanır ve **yeni belgeler bulundukça değişebilir**."
      }
     ],
     "ozet": [
      "Tarihin konusu insandır.",
      "Unsurlar: insan, kaynak, tarihçi.",
      "Tarihsel olaylar tekrarlanamaz; bilgi yoruma dayanır ve değişebilir.",
      "Olay = kısa, somut, özel · Olgu = uzun, soyut, genel.",
      "Kronoloji: olayları zaman sırasına koymak."
     ]
    }
   },
   {
    "id": "k3",
    "code": "TAR.9.1.3",
    "title": {
     "tr": "Tarihsel bilginin üretim süreci ve yardımcı bilimler",
     "en": "How historical knowledge is produced; auxiliary sciences"
    },
    "content": {
     "anlatim": "# Tarihsel Bilginin Üretim Süreci (6 Aşama)\n\nTarihçi geçmişi aydınlatırken bir dedektif gibi sistematik ve aşamalı bir yöntem izler:\n\n1. **Konu veya sorun belirleme** — konunun **zaman, mekân ve içerik** sınırları belirlenir.\n2. **Kaynaklardan bilgi toplama** — kütüphane, arşiv, müze ve dijital ortamlarda **birinci el** (olay tanığı / döneme ait) ve **ikinci el** (sonradan yazılmış) kaynaklar taranır.\n3. **Kaynağı inceleme** — kaynağın türü, yazarı, tarihi, dijital kimliği saptanır; çelişki veya ön yargı olup olmadığı tespit edilir.\n4. **Kaynağı sorgulama (tenkit)** — kaynak **sınırlılık, geçerlilik ve güvenilirlik** açısından eleştiriye tabi tutulur.\n5. **Kaynağı yorumlama** — veriler o dönemin şartları göz önünde bulundurularak eleştirel gözle anlamlandırılır.\n6. **Kanıta dayalı ürün oluşturma** — bilgiler özgün bir esere (makale, kitap) dönüştürülür; bilimsel etik gereği **kaynakça/atıf** kullanılır.\n\n### Birinci el – ikinci el kaynak\n\n| Birinci el | İkinci el |\n|---|---|\n| Olayın tanığı ya da döneme ait | Olaydan sonra, başka kaynaklardan yararlanılarak yazılmış |\n| Kitabe, ferman, mektup, sikke, dönemin gazetesi | Tarih kitapları, ansiklopediler, araştırma makaleleri |\n\n# Tarihe Yardımcı Bilimler\n\n| Bilim | Alanı |\n|---|---|\n| **Arkeoloji** | Kazı bilimi |\n| **Paleografi** | Eski yazıları okuma |\n| **Epigrafi** | Kitabe (yazıt) bilimi |\n| **Nümismatik** | Para (sikke) bilimi |\n| **Kronoloji** | Zaman bilimi, takvimler |\n| **Filoloji** | Dil bilimi |\n| **Kimya** | **Karbon-14** yöntemiyle yaş tespiti |\n| **Antropoloji** | İnsanın fiziki ve kültürel özellikleri |\n| **Etnografya** | Toplulukların kültürü, gelenekleri |\n| **Diplomatik** | Resmî belgelerin biçimi ve özellikleri |\n| **Heraldik** | Arma, bayrak, mühür bilimi |",
     "ornekler": [
      {
       "soru": "Bir tarihçi, bir fermanın sahte olup olmadığını anlamak için mühür ve yazı biçimini inceliyor. Bu hangi aşamadır ve hangi yardımcı bilimlerden yararlanır?",
       "cozum": "**Kaynağı sorgulama (tenkit)** aşaması — güvenilirlik kontrolü. Belgenin biçimi için **diplomatik**, yazısı için **paleografi**, mührü için **heraldik**ten yararlanır."
      },
      {
       "soru": "Bir kazıda bulunan ahşap bir eşyanın yaşı nasıl belirlenir?",
       "cozum": "**Kimya** bilimindeki **karbon-14** yöntemiyle; kazı çalışması ise **arkeoloji**nin alanıdır."
      }
     ],
     "ozet": [
      "6 aşama: konu belirleme → bilgi toplama → inceleme → sorgulama (tenkit) → yorumlama → ürün (kaynakça).",
      "Birinci el: döneme ait/tanık · İkinci el: sonradan yazılmış.",
      "Epigrafi kitabe, nümismatik para, paleografi eski yazı, heraldik arma-mühür.",
      "Karbon-14 → kimya."
     ]
    }
   },
   {
    "id": "k4",
    "code": "TAR.9.1.4",
    "title": {
     "tr": "Tarih araştırma ve yazımında dijital dönüşüm",
     "en": "Digital transformation in historical research"
    },
    "content": {
     "anlatim": "# Dijital Tarih\n\nBilgi işlem teknolojilerinin gelişmesiyle arşiv belgelerinin, yazılı ve görsel kaynakların **dijital ortama aktarılması, taranması ve analiz edilmesidir**.\n\n### Kaynak türleri\n\n| Doğuştan dijital | Sonradan dijitalleştirilmiş |\n|---|---|\n| E-kitaplar, genel ağ siteleri, e-postalar | Taranarak bilgisayara aktarılan eski belgeler, fotoğraflar |\n\n### Dijital araştırma yöntemleri\n\n- **Büyük veri** ve **veri madenciliği**\n- **Coğrafi bilgi sistemleri (CBS)** — ticaret yolları, göçler, savaş alanlarının haritalanması\n- **Yapay zekâ** araçları — binlerce belgenin hızla taranması\n- **Uzak okuma:** Tek tek metinleri ayrıntılı okumak (**yakın okuma**) yerine binlerce belgeyi birlikte inceleyerek geniş ölçekli **eğilimleri** ve **ilişki ağlarını** (mektup ağları, ticaret yolları) ortaya çıkarmak.\n\n### Etik ve yasal kurallar\n\nDijitalleşme kolaylık sağlasa da **telif haklarına**, **veri gizliliğine** ve **bilimsel etik** kurallarına uymak zorunludur.",
     "ornekler": [
      {
       "soru": "Bir tarihçi, Osmanlı dönemine ait 50.000 tüccar mektubunu yazılımla tarayarak hangi şehirlerin birbiriyle en çok yazıştığını haritalandırıyor. Hangi yöntemi kullanmaktadır?",
       "cozum": "**Uzak okuma** (büyük veri / veri madenciliği ve CBS ile). Tek tek metinleri okumak yerine geniş ölçekli ilişki ağlarını ortaya çıkarıyor."
      },
      {
       "soru": "Bir müze kataloğunun web sitesi ile taranarak PDF'e aktarılmış 18. yüzyıl defteri arasındaki fark nedir?",
       "cozum": "Web sitesi **doğuştan dijital**, taranmış defter ise **sonradan dijitalleştirilmiş** kaynaktır."
      }
     ],
     "ozet": [
      "Dijital tarih: kaynakların dijitale aktarılması ve analizi.",
      "Doğuştan dijital ↔ sonradan dijitalleştirilmiş.",
      "Uzak okuma: büyük ölçekli eğilim ve ağları görmek.",
      "Telif, veri gizliliği, bilimsel etik."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Eski Çağ Medeniyetleri",
   "en": "Unit 2: Ancient Civilisations"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "TAR.9.2.1",
    "title": {
     "tr": "Tarım Devrimi ve Eski Çağ'a etkileri",
     "en": "The Agricultural Revolution and its effects"
    },
    "content": {
     "anlatim": "# Avcı-Toplayıcı Yaşamdan Yerleşik Hayata\n\n| Çağ | Yaşam |\n|---|---|\n| **Paleolitik (Eski Taş)** | Mağaralarda yaşam, avcılık ve toplayıcılık |\n| **Mezolitik (Orta Taş)** | Avcı-toplayıcılık sürer; geçiş dönemi |\n| **Neolitik (Yeni Taş)** | Buzulların erimesi, iklimin yumuşaması → bitki ve hayvanların **evcilleştirilmesi** → **Tarım (Neolitik) Devrimi** |\n\n# Tarım Devrimi'nin Gerçekleştiği Bölgeler\n\n| Bölge | Ürün |\n|---|---|\n| **Mezopotamya** (Fırat-Dicle arası) | **Buğday ve arpa** |\n| **Doğu Asya** (Çin: Sarı Irmak ve Gök Irmak çevresi) | **Pirinç (çeltik)** |\n| **Orta Amerika** | Teosinte bitkisinden **mısır** |\n\n# Tarım Devrimi'nin Sonuçları\n\n- Kalıcı köy ve kasabalar kuruldu — Anadolu'da **Çatalhöyük, Aşıklı Höyük, Hacılar**.\n- Tarımsal üretim fazlası olan **artı ürün** ortaya çıktı.\n- Ürünlerin depolanması, korunması ve nüfus artışıyla **özel mülkiyet**, **sınıflı toplum** ve **takas ekonomisi** doğdu.\n- Ürünlerin ve vergilerin kayıt altına alınması ihtiyacı **yazının icadını** tetikledi (**MÖ 3200 — Sümerler**, çivi yazısı).\n\n> Zincir: **evcilleştirme → yerleşik hayat → artı ürün → mülkiyet ve sınıflar → kayıt ihtiyacı → yazı**",
     "ornekler": [
      {
       "soru": "Artı ürünün ortaya çıkması hangi sonuçlara yol açmıştır?",
       "cozum": "Ürünlerin depolanıp korunması gerekti; **özel mülkiyet**, **sınıflı toplum** ve **takas ekonomisi** doğdu; kayıt ihtiyacı da **yazının icadını** hazırladı."
      },
      {
       "soru": "Çatalhöyük hangi çağın ve hangi gelişmenin Anadolu'daki örneğidir?",
       "cozum": "**Neolitik (Yeni Taş) Çağ**'ın ve **Tarım Devrimi** ile başlayan **yerleşik hayatın** örneğidir."
      }
     ],
     "ozet": [
      "Neolitik Çağ: evcilleştirme → Tarım Devrimi.",
      "Mezopotamya: buğday-arpa · Çin: pirinç · Orta Amerika: mısır.",
      "Sonuçlar: yerleşik hayat, artı ürün, mülkiyet, sınıflar, takas, yazı.",
      "Yazı: MÖ 3200, Sümerler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "TAR.9.2.2",
    "title": {
     "tr": "Eski Çağ'da yönetenler ve savaşanlar",
     "en": "Rulers and warriors in the ancient world"
    },
    "content": {
     "anlatim": "# Mezopotamya Medeniyetleri\n\n| Medeniyet | Öne çıkan özellik |\n|---|---|\n| **Sümerler** | **Site** denilen şehir devletleri (Ur, Uruk, Lagaş); kral **\"ensi\"/\"patesi\"** unvanıyla başrahip, başkomutan ve başyargıçtı |\n| **Akadlar** | **Sargon** ile ilk merkezî imparatorluk modeli; krallar **\"tanrı-kral\"** ilan edildi |\n| **Asurlular** | Güçlü ordu ve sert yönetim; Anadolu'da **ticaret kolonileri** (Kültepe/Kaniş) kurarak **yazıyı Anadolu'ya getirdiler** |\n| **Babilliler** | **Hammurabi** ile merkeziyetçi mutlak krallık |\n\n# Mısır Medeniyeti\n\n- **Nil** çevresinde kuruldu. Kral **firavun**, tanrının yeryüzündeki temsilcisi kabul edilir ve **mutlak** güce sahipti.\n- Güçlü merkezî ordu; anıt mezarlar (**piramitler**).\n\n# Anadolu Medeniyetleri\n\n| Medeniyet | Merkez | Öne çıkan özellik |\n|---|---|---|\n| **Hititler** | Hattuşaş | Krallık; soylulardan oluşan **Pankuş Meclisi**; kral aynı zamanda başrahip ve başkomutan; kraliçe **Tavananna** |\n| **Urartular** | Tuşpa (Van) | Güçlü kaleler, su kanalları; dağlık bölge medeniyeti |\n| **Frigler** | Gordion | Tarımı ve **sabanı koruyan sert kanunlar** |\n| **Lidyalılar** | Sardes | **Parayı icat ettiler**; ticaret ve Kral Yolu'nun batı ucu |\n\n# Avrupa Medeniyetleri\n\n- **Yunan şehir devletleri (polis):** **Atina** (demokrasi, donanma) ve **Sparta** (oligarşi, kara ordusu).\n- **Roma:** **Krallık → cumhuriyet → imparatorluk**; güçlü **lejyon** orduları ve geniş yol ağıyla Akdeniz'e hâkim oldu.\n\n# Türkistan (Orta Asya) Medeniyetleri\n\n- **İskitler (Sakalar):** Atı evcilleştirip savaşta etkili kullanan konargöçer topluluk.\n- **Asya Hun Devleti:** Türk tarihinin bilinen **ilk teşkilatlı devleti**.\n  - Hükümdar unvanları: **şanyü, kağan, han**.\n  - Yönetme yetkisinin Tanrı tarafından verildiğine inanılan **kut** anlayışı.\n  - **Mete Han:** ordu için **onlu sistem** ve **Turan (hilal/kapan) taktiği**.",
     "ornekler": [
      {
       "soru": "Asurluların Anadolu tarihi açısından en önemli katkısı nedir?",
       "cozum": "Kültepe (Kaniş) gibi **ticaret kolonileri** aracılığıyla **yazıyı Anadolu'ya getirmeleri**; böylece Anadolu'da **tarih çağları** başlamıştır."
      },
      {
       "soru": "Hükümdarlık yetkisinin Tanrı tarafından verildiği inancı Türklerde hangi kavramla ifade edilir? Mısır'daki karşılığı nedir?",
       "cozum": "Türklerde **kut** anlayışı. Mısır'da firavun **tanrının yeryüzündeki temsilcisi** sayılır; her ikisinde de yönetim yetkisi ilahi kaynaklı kabul edilir."
      },
      {
       "soru": "Hititlerdeki Pankuş Meclisi'nin varlığı kralın yetkileri hakkında ne söyler?",
       "cozum": "Kralın yanında soylulardan oluşan bir meclis bulunması, kralın yetkilerinin **belli ölçüde sınırlandırıldığını** gösterir (mutlak monarşi değildir)."
      }
     ],
     "ozet": [
      "Sümer: site, ensi/patesi · Akad: Sargon, ilk imparatorluk · Asur: Kültepe, yazı Anadolu'ya · Babil: Hammurabi.",
      "Mısır: firavun, mutlak güç, piramitler.",
      "Hitit: Hattuşaş, Pankuş · Urartu: Tuşpa · Frig: Gordion, saban kanunu · Lidya: Sardes, para.",
      "Atina demokrasi/donanma · Sparta oligarşi/kara ordusu · Roma: krallık → cumhuriyet → imparatorluk.",
      "Asya Hun: ilk teşkilatlı Türk devleti; kut; Mete Han: onlu sistem, Turan taktiği."
     ]
    }
   },
   {
    "id": "k3",
    "code": "TAR.9.2.3",
    "title": {
     "tr": "Eski Çağ'da hukuk",
     "en": "Law in the ancient world"
    },
    "content": {
     "anlatim": "# Eski Çağ Hukuk Sistemleri\n\n| Hukuk | Özellik |\n|---|---|\n| **Urkagina Kanunları** (Lagaş, Sümer) | Bilinen **ilk yazılı kanunlar**; adalet ve hürriyeti sağlama amaçlı |\n| **Hammurabi Kanunları** (Babil) | **Kısasa kısas** ilkesi; **sınıf farkına** (soylu–köle) göre değişen ağır cezalar |\n| **Hitit hukuku** | İnsan ilişkilerini, tarımı ve evliliği korur; çoğu suçta ölüm yerine **para cezası (tazminat)** |\n| **Roma hukuku** | **Patriciler** (soylular) ile **plebler** (halk) arasındaki mücadeleler sonucu bronz levhalara yazılan **12 Levha Kanunları**; modern Avrupa hukukunun temeli |\n| **Türk töre hukuku** | **Yazısız** kurallar; kaynağı Gök Tanrı inancı ve **kurultay** kararları; **eşit suça eşit ceza**; konargöçer yaşam nedeniyle uzun süreli **hapis cezası yok**; vatana ihanet gibi ağır suçlar ölümle cezalandırılır |\n\n### Karşılaştırma ipuçları\n\n- **Kısas + sınıf ayrımı** → Hammurabi\n- **Tazminat / para cezası** → Hititler\n- **Yazısız + eşitlik + hapis yok** → Türk töresi\n- **Halkın mücadelesiyle yazılı hâle gelen hukuk** → Roma (12 Levha)",
     "ornekler": [
      {
       "soru": "\"Aynı suçu işleyen bir soylu ile bir köleye farklı cezalar verilir.\" Bu ilke hangi hukuk sistemine aittir? Türk töresi bu konuda nasıl farklıdır?",
       "cozum": "**Hammurabi Kanunları**'na. Türk töresinde ise **eşit suça eşit ceza** ilkesi vardır; ceza kişinin sınıfına göre değişmez."
      },
      {
       "soru": "Türk töresinde uzun süreli hapis cezası olmamasının sebebi nedir?",
       "cozum": "Türklerin **konargöçer (göçebe)** yaşam tarzı; sürekli yer değiştiren bir toplumda hapishane gibi kalıcı yapılar kullanışlı değildir."
      }
     ],
     "ozet": [
      "Urkagina: ilk yazılı kanunlar.",
      "Hammurabi: kısasa kısas + sınıf farkı.",
      "Hitit: para cezası (tazminat).",
      "Roma: patrici–pleb mücadelesi → 12 Levha → modern hukukun temeli.",
      "Töre: yazısız, kurultay, eşit suça eşit ceza, hapis yok."
     ]
    }
   },
   {
    "id": "k4",
    "code": "TAR.9.2.4",
    "title": {
     "tr": "Eski Çağ'da inanç, bilim ve sanat",
     "en": "Belief, science and art in the ancient world"
    },
    "content": {
     "anlatim": "# İnanç Anlayışları\n\n- Eski Çağ medeniyetlerinin çoğunda (Mezopotamya, Mısır, Hitit, Yunan) **çok tanrılı** dinler hâkimdi.\n- **Mısır:** Ölümden sonra yaşam inancı → **mumyalama** ve **piramitler**.\n- **Hititler:** Pek çok tanrıyı kabul ettikleri için **\"bin tanrılı halk\"** olarak anılır.\n- **Türkler:** **Gök Tanrı** inancı ve ahiret inancının izleri (**uçmağ** = cennet, **tamu** = cehennem); mezarların üzerine **balbal** taşları dikilirdi.\n\n# Bilimsel Gelişmeler\n\n| Medeniyet | Gelişme | Neden |\n|---|---|---|\n| **Mezopotamya** | Astronomi, **Ay takvimi** | **Zigguratların** gözlemevi olarak kullanılması |\n| **Mısır** | Geometri ve matematik | **Nil'in taşma** zamanını hesaplama ve arazi ölçümü ihtiyacı |\n| **Mısır** | Tıp ve anatomi | **Mumyalama** |\n| **Mısır** | **Güneş takvimi** | Nil taşkınları ve tarım takvimi |\n\n# Sanat ve Mimari\n\n- Tapınaklar, saraylar, anıt mezarlar (**piramitler**)\n- Kabartmalar (**steller**, Asur duvar kabartmaları), heykeller (**lamassu**)\n- Türklerde halı-kilim dokumacılığı — **Pazırık halısı** (bilinen en eski düğümlü halı)",
     "ornekler": [
      {
       "soru": "Mısır'da geometrinin gelişmesinin coğrafi sebebi nedir?",
       "cozum": "**Nil Nehri'nin taşması.** Taşkınlardan sonra arazi sınırlarının yeniden ölçülmesi ve taşma zamanının hesaplanması ihtiyacı geometri ve matematiği geliştirmiştir."
      },
      {
       "soru": "Türklerde mezarların üzerine dikilen balbal taşları neyi gösterir?",
       "cozum": "Türklerde **ölümden sonra yaşam (ahiret) inancının** varlığını gösterir."
      }
     ],
     "ozet": [
      "Çok tanrılı inançlar yaygın; Hititler \"bin tanrılı\".",
      "Mısır: mumyalama → tıp; Nil → geometri; Güneş takvimi.",
      "Mezopotamya: ziggurat → astronomi; Ay takvimi.",
      "Türkler: Gök Tanrı, uçmağ-tamu, balbal, Pazırık halısı."
     ]
    }
   },
   {
    "id": "k5",
    "code": "TAR.9.2.5",
    "title": {
     "tr": "Türklerde konargöçer yaşam",
     "en": "Nomadic pastoral life among the Turks"
    },
    "content": {
     "anlatim": "# Konargöçer Yaşam Nedir?\n\n**Konargöçer** (göçebe) yaşam; hayvan sürülerine **otlak ve su** bulmak için mevsimlere göre yer değiştiren, ama rastgele değil **belirli yaylak–kışlak düzeni** içinde hareket eden yaşam biçimidir. Orta Asya bozkırlarında iklimin **karasal**, tarıma uygun alanların sınırlı olması bu yaşamı belirlemiştir.\n\n- **Yaylak:** Yazın çıkılan serin ve otu bol yüksek alanlar.\n- **Kışlak:** Kışın korunaklı vadilerde ve nehir kenarlarında kalınan yerler.\n- **Ekonomi:** At, koyun, keçi, sığır ve deve yetiştiriciliği; et, süt, yün, deri. Gerektiğinde avcılık, sınırlı tarım ve yerleşik toplumlarla **ticaret** (İpek Yolu).\n\n# Konargöçer Yaşamın İzleri\n\n| Alan | Özellikler |\n|---|---|\n| **Konut** | Kolay sökülüp taşınabilen **otağ / çadır (yurt)**; keçeden yapılır |\n| **Ulaşım ve savaş** | **At** hayatın merkezidir; atlı okçuluk, hızlı hareket; **Turan taktiği** (sahte geri çekilme) |\n| **Teknoloji** | Üzengi, eyer, **demir işçiliği** (Göktürklerin Altay'da demircilik yapması), keçecilik, dokumacılık |\n| **Beslenme** | Kımız, ayran, yoğurt, kurut, kavurma, pastırma gibi **saklanabilir** yiyecekler |\n| **Giyim** | Ata binmeye uygun **pantolon, çizme, kaftan**; deri ve yün |\n| **Sanat** | Taşınabilir eşyalara uygulanan **hayvan üslubu** süslemeler, halı-kilim, kemer tokaları |\n| **Toplum** | Aile (oguş) → boy → budun → il (devlet); **kurultay**, töre |\n| **Hukuk** | Yazılı olmayan **töre**; sürekli göç edilen toplumda hapis yerine para ve bedensel cezalar |\n\n# Arkeolojik Kanıtlar\n\n- **Pazırık kurganı** (Altaylar, MÖ IV.–III. yüzyıl): Bilinen **en eski düğümlü halı**, at koşum takımları, keçe süslemeler.\n- **Esik kurganı** (Kazakistan): **Altın Elbiseli Adam**; binlerce altın süslemeli giysi.\n- **Kurganlar:** Konargöçer liderler için yapılan mezar tümsekleri; eşyaları ve atlarıyla gömülmeleri ölümden sonraki hayata inancı gösterir.\n\n# Dünü ve Bugünü Karşılaştırma\n\n| Geçmişte | Günümüzde |\n|---|---|\n| Orta Asya bozkırlarında yaylak–kışlak göçü | Anadolu'da **Yörükler** ve yayla geleneği; Kırgızistan ve Moğolistan'da yaylacılık |\n| Keçe çadır | Yayla evleri, karavanlar, yazın kurulan çadırlar |\n| At ile ulaşım | Kamyonlarla sürü taşımacılığı |\n| Sözlü kültür, destanlar | Âşıklık geleneği, **Dünya Göçebe Oyunları** |\n\n**Türk kültüründeki yeri:** Misafirperverlik, dayanışma, ata ve doğaya verilen değer, **töre** anlayışı, kadının toplumsal hayattaki etkin rolü (hatun), bugün de Türk kültürünün önemli öğeleri arasındadır.",
     "ornekler": [
      {
       "soru": "Konargöçer Türk toplumlarında hapis cezası yerine para ve bedensel cezaların uygulanmasının nedeni nedir?",
       "cozum": "Sürekli yer değiştiren bir toplumda **kalıcı hapishane** kurmak ve mahkûmu taşımak mümkün değildi. Cezalar bu yüzden **hızlı uygulanabilir** nitelikteydi; bu durum yaşam biçiminin hukuku nasıl etkilediğini gösterir."
      },
      {
       "soru": "Pazırık kurganında bulunan halı ve at koşum takımları konargöçer yaşam hakkında hangi çıkarımları yapmamızı sağlar?",
       "cozum": "Düğümlü halının varlığı **dokumacılığın** ileri düzeyde olduğunu; at koşum takımları ve atların birlikte gömülmesi **atın** hayatın merkezinde yer aldığını ve **ölümden sonra hayata** inanıldığını gösterir. Yazılı kaynakların az olduğu bu toplumları anlamada **arkeolojik buluntular** birincil kaynaktır."
      }
     ],
     "ozet": [
      "Konargöçer yaşam: hayvancılığa dayalı, yaylak–kışlak düzeninde mevsimlik göç.",
      "İzleri: otağ (keçe çadır), at kültürü, demircilik, kımız, pantolon, hayvan üslubu, töre ve kurultay.",
      "Kanıtlar: Pazırık (en eski düğümlü halı), Esik (Altın Elbiseli Adam); bugünkü izi Yörükler ve yayla geleneği."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Orta Çağ Medeniyetleri",
   "en": "Unit 3: Medieval Civilisations"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "TAR.9.3.1",
    "title": {
     "tr": "Orta Çağ'daki kitlesel göçler",
     "en": "Mass migrations in the Middle Ages"
    },
    "content": {
     "anlatim": "# Orta Çağ'ın Zaman Aralığı\n\nOrta Çağ, **Kavimler Göçü (375)** / **Batı Roma'nın yıkılışı (476)** ile **İstanbul'un Fethi (1453)** arasındaki dönemi kapsar.\n\n# Kavimler Göçü (375)\n\nAsya içlerinden batıya ilerleyen **Hunların** önünden kaçan **Germen kavimleri** (Ostrogotlar, Vizigotlar, Vandallar vb.) Avrupa içlerine göç etti; büyük bir kitlesel hareket yaşandı.\n\n### Sonuçları\n\n- **Roma İmparatorluğu 395**'te **Doğu** ve **Batı** olarak ikiye ayrıldı.\n- **Batı Roma** barbar saldırılarına dayanamayarak **476**'da yıkıldı.\n- Avrupa'nın **etnik, siyasi ve demografik** yapısı değişti; günümüz Avrupa milletlerinin temelleri atıldı.\n- Merkezî krallıkların zayıflamasıyla **feodalite (derebeylik)** ortaya çıktı.\n- **İlk Çağ kapandı, Orta Çağ başladı.**\n\n> Neden–sonuç zinciri: **Hun baskısı → Germen göçü → Roma'nın bölünmesi ve Batı Roma'nın yıkılışı → feodalite**",
     "ornekler": [
      {
       "soru": "Kavimler Göçü'nün Avrupa'da feodaliteyi ortaya çıkarmasının nedeni nedir?",
       "cozum": "Göçler ve saldırılar **merkezî krallıkları zayıflattı**; halk korunmak için güçlü toprak sahiplerinin (senyör/derebeyi) yanına sığındı. Böylece yönetim yerel beylere geçti → **feodalite**."
      },
      {
       "soru": "Orta Çağ'ın başlangıcı için hangi tarihler kullanılır?",
       "cozum": "**375** (Kavimler Göçü) veya **476** (Batı Roma'nın yıkılışı). Bitişi **1453** (İstanbul'un Fethi) kabul edilir."
      }
     ],
     "ozet": [
      "Orta Çağ: 375/476 – 1453.",
      "Kavimler Göçü (375): Hun baskısı → Germen kavimlerinin göçü.",
      "395: Roma ikiye ayrıldı · 476: Batı Roma yıkıldı.",
      "Sonuç: Avrupa'nın etnik yapısı değişti, feodalite doğdu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "TAR.9.3.2",
    "title": {
     "tr": "Orta Çağ'daki siyasi ve askerî gelişmeler",
     "en": "Political and military developments in the Middle Ages"
    },
    "content": {
     "anlatim": "# Bizans İmparatorluğu (Doğu Roma)\n\n- **İstanbul** merkezli, **Ortodoks** mezhebini benimseyen güçlü bir imparatorluk.\n- Orta Çağ boyunca Doğu Avrupa ve Balkanlar'da etkili oldu; Sasaniler, İslam orduları ve Türklerle mücadele etti.\n\n# İslamiyet'in Doğuşu ve Yayılışı (7. yüzyıl)\n\n- **Hz. Muhammed** döneminde Arap Yarımadası'nda doğdu.\n- **Dört Halife, Emeviler ve Abbasiler** döneminde Asya, Afrika ve **Endülüs** üzerinden İspanya'ya kadar yayıldı.\n- Yeni bir **medeniyet havzası** ve siyasi güç oluştu.\n\n# Türklerin Orta Çağ Siyasetindeki Rolü\n\n- Avrasya bozkırlarındaki Türk devletleri (**Göktürkler, Uygurlar** vb.) Çin ve komşularıyla siyasi, askerî ve ekonomik ilişkiler yürüttü.\n- **Uygurlar** yerleşik hayata geçerek kendine özgü **kültür, sanat ve hukuk** yapısı oluşturdu.\n\n# Haçlı Seferleri (11.–13. yüzyıl)\n\n- **Papa**'nın çağrısıyla Avrupalıların **Kudüs**'ü almak ve Doğu'nun zenginliklerini ele geçirmek amacıyla Türkler ve İslam dünyası üzerine düzenledikleri seferler.\n- **Siyasi olarak başarısız** oldular.\n- Ancak Doğu ile Batı arasında **kültürel, ekonomik ve teknik** etkileşime yol açtılar (kâğıt, pusula, barut gibi buluşların Avrupa'ya ulaşması).",
     "ornekler": [
      {
       "soru": "Haçlı Seferleri siyasi amaçlarına ulaşamadığı hâlde Avrupa için neden önemlidir?",
       "cozum": "Doğu ile Batı arasında **kültürel, ekonomik ve teknik etkileşim** sağladı; kâğıt, pusula, barut gibi buluşlar ve Doğu'nun ticaret ürünleri Avrupa'ya ulaştı."
      },
      {
       "soru": "Uygurları diğer Orta Asya Türk devletlerinden ayıran özellik nedir?",
       "cozum": "**Yerleşik hayata geçmeleri** ve buna bağlı olarak kendine özgü **kültür, sanat ve hukuk** yapısı geliştirmeleri."
      }
     ],
     "ozet": [
      "Bizans: İstanbul merkezli, Ortodoks.",
      "İslamiyet 7. yüzyılda doğdu; Endülüs'e kadar yayıldı.",
      "Uygurlar yerleşik hayata geçti.",
      "Haçlı Seferleri: siyasi başarısızlık, kültürel-teknik etkileşim."
     ]
    }
   },
   {
    "id": "k3",
    "code": "TAR.9.3.3",
    "title": {
     "tr": "Orta Çağ'da ticaret yolları",
     "en": "Trade routes in the Middle Ages"
    },
    "content": {
     "anlatim": "# Ticaret Yolları\n\nOrta Çağ'da devletlerin ekonomisini ve siyasi gücünü belirleyen en önemli unsurlardan biri **uluslararası ticaret yollarıydı**. Bu yollar mal alışverişinin yanında **kültürler arası etkileşimi** de sağladı.\n\n| Yol | Güzergâh | Taşınan ürünler |\n|---|---|---|\n| **İpek Yolu** | Çin → Orta Asya → Hazar'ın kuzeyi ve güneyi → Anadolu → Avrupa (**kara yolu**) | İpek, porselen, değerli kumaşlar |\n| **Kürk Yolu** | Kuzey orman kuşağı; Sibirya – Doğu Avrupa | Kürk |\n| **Baharat Yolu** | Hindistan → (deniz yoluyla) Basra Körfezi / Kızıldeniz → Akdeniz limanları → Avrupa | Baharat, aromatik ürünler |\n\n# Kervansaraylar\n\nTicaret yolları üzerinde tüccarların **güvenle konaklaması**, hayvanlarının bakımı ve mallarının korunması için yapılan yapılardır; ticareti canlandırmışlardır.\n\n> Ticaret yollarını kontrol eden devletler **zenginleşir**; bu nedenle yollar üzerinde sık sık **mücadeleler** yaşanmıştır.",
     "ornekler": [
      {
       "soru": "İpek Yolu'nun yalnızca ekonomik değil kültürel bir öneme de sahip olmasının nedeni nedir?",
       "cozum": "Yol boyunca tüccarlarla birlikte **dinler, diller, buluşlar ve sanat anlayışları** da taşındı; farklı medeniyetler birbirini tanıyıp etkiledi."
      },
      {
       "soru": "Kervansarayların ticarete katkısı nedir?",
       "cozum": "Tüccarlara **güvenli konaklama**, hayvanlara bakım ve mallara koruma sağlayarak ticaretin **güvenli ve sürekli** olmasını sağladılar."
      }
     ],
     "ozet": [
      "İpek Yolu: Çin → Avrupa, kara yolu, ipek-porselen.",
      "Kürk Yolu: Sibirya – Doğu Avrupa.",
      "Baharat Yolu: Hindistan → Basra/Kızıldeniz → Akdeniz.",
      "Kervansaray: güvenli konaklama, ticareti canlandırma."
     ]
    }
   },
   {
    "id": "k4",
    "code": "TAR.9.3.4",
    "title": {
     "tr": "Orta Çağ'da bilim, kültür ve sanat",
     "en": "Science, culture and art in the Middle Ages"
    },
    "content": {
     "anlatim": "# İslam Bilim Medeniyeti (Altın Çağ)\n\n- **Abbasiler** döneminde, özellikle **Beytü'l-Hikme**'nin kuruluşuyla Yunan, Hint ve Pers eserleri **Arapçaya tercüme** edildi.\n- Çığır açan bilginler:\n\n| Bilgin | Alan |\n|---|---|\n| **İbn Sina** | Tıp, felsefe |\n| **Harezmî** | Matematik (cebir), astronomi |\n| **Bîrûnî** | Astronomi, coğrafya |\n| **Fârâbî** | Felsefe, müzik |\n| **İbn Rüşd** | Felsefe, tıp |\n\n# Avrupa'da Skolastik Düşünce\n\nOrta Çağ Avrupa'sında **kilisenin baskısı** altında akıl ve bilimin geri plana itildiği, her bilginin **dinî dogmalarla** açıklandığı dönemdir. Bilimsel gelişmeler yavaşlamıştır.\n\n# Sanat ve Mimari\n\n| İslam sanatı | Avrupa sanatı |\n|---|---|\n| Geometrik desenler, **hat**, **çini**, **minyatür** | Kilise merkezli **Romanesk** ve **Gotik** katedraller |\n| Cami mimarisi (kubbe, minare) | Dinsel resimler, **vitraylar** |\n\n> Aynı dönemde İslam dünyasında bilim gelişirken Avrupa'da skolastik düşünce hâkimdi; İslam dünyasındaki tercümeler daha sonra Avrupa'nın **Rönesans**'ına da katkı sağladı.",
     "ornekler": [
      {
       "soru": "Beytü'l-Hikme'nin bilim tarihindeki önemi nedir?",
       "cozum": "Yunan, Hint ve Pers eserlerinin **Arapçaya tercüme edildiği** merkezdir; eski bilgi birikimini korumuş ve İslam bilginlerinin özgün çalışmalarına zemin hazırlamıştır."
      },
      {
       "soru": "Skolastik düşüncenin bilimsel gelişmeye etkisi ne olmuştur?",
       "cozum": "Bilgiyi **dinî dogmalarla** sınırladığı ve akıl-deneyi geri plana ittiği için Avrupa'da bilimsel gelişmeyi **yavaşlatmıştır**."
      }
     ],
     "ozet": [
      "Abbasiler, Beytü'l-Hikme: tercüme hareketi.",
      "İbn Sina tıp, Harezmî cebir, Bîrûnî astronomi-coğrafya, Fârâbî felsefe, İbn Rüşd felsefe.",
      "Avrupa: skolastik düşünce, bilim yavaşladı.",
      "İslam sanatı: hat, çini, minyatür · Avrupa: Gotik/Romanesk, vitray."
     ]
    }
   }
  ]
 }
];
