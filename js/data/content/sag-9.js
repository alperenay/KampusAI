/* =========================================================
   9. Sınıf Sağlık Bilgisi ve Trafik Kültürü — konu anlatım notları
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı. Sağlık bilgileri genel eğitim amaçlıdır.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/saglik"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Sağlıklı Yaşam",
   "en": "Unit 1: Healthy Living"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SBT.E1",
    "title": {
     "tr": "Sağlık kavramı, dengeli beslenme ve fiziksel etkinlik",
     "en": "Health, balanced diet and physical activity"
    },
    "content": {
     "anlatim": "# Sağlık Nedir?\n\nDünya Sağlık Örgütü'ne göre sağlık yalnızca hastalık ya da sakatlığın olmaması değil; **bedensel, ruhsal ve sosyal** yönden tam bir **iyi olma** hâlidir. Sağlığı kalıtım, çevre, yaşam biçimi ve sağlık hizmetlerine erişim birlikte belirler; bunlar içinde kişinin en çok etkileyebildiği **yaşam biçimidir**.\n\n# Dengeli Beslenme\n\nVücudun ihtiyaç duyduğu besin öğelerini (karbonhidrat, protein, yağ, vitamin, mineral ve su) **yeterli ve dengeli** almaktır.\n- Her öğünde farklı besin gruplarından yiyecekler bulunmalı: tahıllar; sebze ve meyveler; süt ve süt ürünleri; et, yumurta ve baklagiller.\n- **Kahvaltı** atlanmamalı; günde yaklaşık 2–2,5 litre su içilmeli.\n- Şekerli içecekler, aşırı tuz ve işlenmiş gıdalar sınırlanmalı; **gıda etiketleri** (enerji, şeker, tuz, katkı maddeleri, son kullanma tarihi) okunmalıdır.\n- **Beden kütle indeksi:** $BKİ = \\dfrac{\\text{kütle (kg)}}{\\text{boy}^2\\ (\\text{m}^2)}$. Ergenlerde yaşa ve cinsiyete göre büyüme eğrileriyle değerlendirilir.\n\n# Fiziksel Etkinlik ve Uyku\n\n- Gençler için her gün toplam en az **60 dakika** orta–yüksek şiddette hareket önerilir; uzun süreli oturma aralıklarla bölünmelidir.\n- Ergenlikte gecede **8–10 saat** düzenli uyku büyümeyi, öğrenmeyi ve ruh sağlığını destekler; yatmadan önce ekran kullanımı uykuyu bozar.\n\n# Kişisel Hijyen\n\nEl yıkama (en az 20 saniye sabunla), ağız ve diş sağlığı (günde iki kez fırçalama), düzenli banyo; kişisel eşyaların (havlu, tıraş bıçağı) ortak kullanılmaması.",
     "ornekler": [
      {
       "soru": "Boyu 1,70 m, kütlesi 65 kg olan bir gencin beden kütle indeksi yaklaşık kaçtır?",
       "cozum": "$BKİ = \\dfrac{65}{1{,}70^2} = \\dfrac{65}{2{,}89} \\approx $ **22,5**."
      },
      {
       "soru": "Sağlığı belirleyen etkenlerden kişinin en çok değiştirebildiği hangisidir?",
       "cozum": "**Yaşam biçimi** (beslenme, hareket, uyku, zararlı alışkanlıklardan uzak durma)."
      }
     ],
     "ozet": [
      "Sağlık bedensel, ruhsal ve sosyal iyi olma hâlidir.",
      "Dengeli beslenme tüm besin gruplarını içerir; etiket okunmalıdır.",
      "Gençlere günde en az 60 dakika hareket ve 8–10 saat uyku önerilir.",
      "El hijyeni en az 20 saniye sabunla yapılır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "SBT.E2",
    "title": {
     "tr": "Bağımlılıklar ve ruh sağlığını koruma",
     "en": "Addictions and protecting mental health"
    },
    "content": {
     "anlatim": "# Bağımlılık\n\nBir madde ya da davranışa karşı, zarar verdiği bilinmesine rağmen **kontrol edilemeyen istek** ve bırakıldığında yoksunluk belirtileri görülmesidir.\n- **Madde bağımlılıkları:** Tütün ve elektronik sigara, alkol, uyuşturucu ve uyarıcı maddeler. Tütün dumanında binlerce zararlı kimyasal vardır; **pasif içicilik** de zararlıdır.\n- **Davranışsal bağımlılıklar:** Dijital oyun, internet ve sosyal medya, kumar.\n- **Risk etkenleri:** Merak, arkadaş baskısı, stresle başa çıkamama, kolay erişim. **Koruyucu etkenler:** aile desteği, hobi ve spor, sağlıklı arkadaş çevresi, **\"hayır\" diyebilme** becerisi.\n\n# Ruh Sağlığını Koruma\n\n- Duyguları tanımak ve ifade etmek, güvenilir biriyle konuşmak, düzenli uyku ve hareket, ekran süresini sınırlamak.\n- **Akran zorbalığı** ve **siber zorbalık** karşısında susmamak: kanıtları saklamak, engellemek ve öğretmen, aile ya da okul rehberlik servisine bildirmek.\n- Uzun süren mutsuzluk, umutsuzluk ya da kendine zarar verme düşüncelerinde **uzman desteği** almak önemlidir; ülkemizde acil durumlar için **112** aranabilir.",
     "ornekler": [
      {
       "soru": "Arkadaşları tarafından sigara içmeye zorlanan bir gencin kullanabileceği bir beceri nedir?",
       "cozum": "**Hayır diyebilme (reddetme) becerisi**: kararlı ve açık bir dille reddetmek, ortamdan uzaklaşmak, destekleyici arkadaşlara yönelmek."
      },
      {
       "soru": "Sosyal medyada zorbalığa uğrayan bir öğrenci ne yapmalıdır?",
       "cozum": "Kanıtları (ekran görüntüsü) saklamalı, kişiyi **engellemeli**, karşılık vermemeli ve durumu **aile, öğretmen ya da rehber öğretmene** bildirmelidir."
      }
     ],
     "ozet": [
      "Bağımlılık: zarar bilinse de kontrol edilemeyen istek ve yoksunluk.",
      "Koruyucu etkenler: aile desteği, spor, sağlıklı arkadaşlık, hayır diyebilme.",
      "Zorbalıkta susulmaz; kanıt saklanır ve yetişkine bildirilir.",
      "Uzun süren ruhsal sıkıntılarda uzman desteği alınmalıdır."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Hastalıklardan Korunma ve İlk Yardım",
   "en": "Unit 2: Disease Prevention and First Aid"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SBT.E3",
    "title": {
     "tr": "Bulaşıcı hastalıklar, aşılar ve korunma",
     "en": "Infectious diseases, vaccines and prevention"
    },
    "content": {
     "anlatim": "# Bulaşma Yolları\n\n- **Damlacık ve hava yoluyla:** Grip, kızamık, verem, COVID-19 (öksürme, hapşırma).\n- **Temas yoluyla:** Bazı deri ve göz enfeksiyonları; kirli ellerin ağız, burun ve göze götürülmesi.\n- **Su ve gıda yoluyla:** İshalli hastalıklar, hepatit A.\n- **Kan ve vücut sıvılarıyla:** Hepatit B ve C, HIV.\n- **Vektörlerle (canlı taşıyıcılar):** Sıtma (sivrisinek), Kırım-Kongo kanamalı ateşi (**kene**).\n\n# Korunma\n\n- **Aşılar** bağışıklık sistemini önceden tanıştırarak hastalığa karşı koruma sağlar; toplumun büyük bölümü aşılanınca hastalığın yayılması durur (**toplumsal bağışıklık**). Ulusal aşı takvimine uyulmalıdır.\n- El hijyeni, öksürürken ağzı mendil ya da dirsek içiyle kapatmak, gıdaları iyi pişirmek ve temiz su kullanmak.\n- **Antibiyotikler virüslere etki etmez**; gereksiz ve doktor önerisi dışında kullanım **antibiyotik direncine** yol açar.\n- Kene tutunduğunda çıplak elle koparılmamalı, en kısa sürede sağlık kuruluşuna başvurulmalıdır.",
     "ornekler": [
      {
       "soru": "Grip olan birine antibiyotik verilmesi neden doğru değildir?",
       "cozum": "Grip bir **virüs** hastalığıdır; antibiyotikler **bakterilere** etki eder. Gereksiz kullanım antibiyotik direncini artırır."
      },
      {
       "soru": "Toplumsal bağışıklık nedir?",
       "cozum": "Toplumun büyük bölümü aşılandığında hastalığın yayılamaması; aşı olamayan bebek ve hastaların da dolaylı olarak korunmasıdır."
      }
     ],
     "ozet": [
      "Bulaşma yolları: damlacık, temas, su–gıda, kan, vektörler.",
      "Aşılar bireyi ve toplumu korur.",
      "Antibiyotikler virüslere etki etmez.",
      "Kene çıplak elle koparılmaz; sağlık kuruluşuna gidilir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "SBT.E4",
    "title": {
     "tr": "Temel ilk yardım",
     "en": "Basic first aid"
    },
    "content": {
     "anlatim": "# İlk Yardımın Temel Uygulamaları (KBK)\n\n1. **Koruma:** Olay yerinde kendinin ve hastanın güvenliğini sağla (trafikte uyarı işareti, elektrik akımını kes).\n2. **Bildirme:** **112**'yi ara; olay yerini, ne olduğunu, yaralı sayısını ve durumunu açık ve sakin biçimde bildir; görevli kapatmadan telefonu kapatma.\n3. **Kurtarma:** Bilinç ve solunumu değerlendir; bildiğin ve güvenli olan müdahaleyi yap.\n\n# Sık Karşılaşılan Durumlar\n\n- **Bilinç kaybı, solunum var:** Hastayı **koma pozisyonuna** (yan yatış) getir, solunumu izle.\n- **Solunum yok:** 112'yi ara ve eğitimliysen göğüs basısına başla (göğüs kemiğinin alt yarısına, dakikada 100–120 bası).\n- **Kanama:** Temiz bir bezle yaraya **doğrudan baskı** uygula; yaralı bölgeyi mümkünse yukarı kaldır.\n- **Yanık:** Yanan bölgeyi **en az 10–20 dakika** temiz, ılık–serin akan su altında tut; buz, diş macunu, yoğurt sürme; su toplamış kabarcıkları patlatma.\n- **Yabancı cisimle hava yolu tıkanması:** Kişi öksürebiliyorsa öksürmeye teşvik et; konuşamıyor ve nefes alamıyorsa sırtına 5 kez vur, ardından karına bası (**Heimlich**) uygula.\n- **Kırık şüphesi:** Bölgeyi hareket ettirmeden sabitle.\n\n> İlk yardım bir **eğitim** konusudur; okulda ve yetkili kurumlarda uygulamalı ilk yardım kursu alınması önerilir.",
     "ornekler": [
      {
       "soru": "Elini kaynar suyla yakan bir arkadaşınıza ilk olarak ne yaparsınız?",
       "cozum": "Yanan bölgeyi **10–20 dakika ılık–serin akan su** altında tutarım; buz, diş macunu ya da yoğurt sürmem, kabarcıkları patlatmam. Yanık büyükse **112**'yi ararım."
      },
      {
       "soru": "112 aranırken hangi bilgiler verilmelidir?",
       "cozum": "**Olay yeri adresi**, ne olduğu, **yaralı sayısı** ve durumu, arayanın adı ve telefonu; görevli kapatmadan telefon kapatılmaz."
      }
     ],
     "ozet": [
      "İlk yardımın temeli Koruma–Bildirme–Kurtarma'dır.",
      "Bilinci kapalı ama soluyan hasta koma pozisyonuna alınır.",
      "Kanamada doğrudan baskı; yanıkta 10–20 dakika akan su.",
      "Hava yolu tıkanmasında sırta vurma ve Heimlich uygulanır."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Trafik Kültürü ve Güvenliği",
   "en": "Unit 3: Traffic Culture and Safety"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "SBT.E5",
    "title": {
     "tr": "Trafik kuralları, yaya ve yolcu güvenliği",
     "en": "Traffic rules, pedestrian and passenger safety"
    },
    "content": {
     "anlatim": "# Trafik ve Trafik Kültürü\n\nTrafik; yayaların, yolcuların, sürücülerin ve araçların karayolları üzerindeki hâl ve hareketleridir. **Trafik kültürü**, kurallara yalnızca ceza korkusuyla değil **saygı ve sorumluluk** bilinciyle uyulmasıdır. Kazaların büyük çoğunluğu **insan hatası** kaynaklıdır (hız, dikkatsizlik, kurallara uymama).\n\n# Yaya Güvenliği\n\n- **Yaya geçidi**, alt ve üst geçitler kullanılmalı; ışıklı geçitte yayaya yeşil yanmadan karşıya geçilmemeli.\n- Geçmeden önce **sola, sağa, tekrar sola** bakılmalı; park etmiş araçların arasından çıkılmamalı.\n- Kaldırımı olmayan yolda **taşıtların geliş yönüne karşı** (sol kenardan) yürünmeli; gece açık renkli ya da **yansıtıcı** giysiler giyilmeli.\n- Yürürken telefon ve kulaklık dikkati dağıtır.\n\n# Yolcu Güvenliği\n\n- Araçta **ön ve arka koltukta emniyet kemeri** takılmalı; 135 cm altındaki çocuklar uygun **çocuk koltuğunda** taşınmalı.\n- Okul servisinde ayakta durulmamalı, araç tam durmadan inilmemeli, araçtan **kaldırım tarafından** inilmelidir.\n\n# Bisiklet ve Scooter\n\n**Kask**, gece ışık ve yansıtıcı kullanılmalı; yolun sağından, araç trafiği yönünde gidilmeli; aynı anda iki kişi binilmemeli.\n\n# Trafik İşaretleri\n\n| Biçim | Anlam |\n|---|---|\n| Üçgen (kırmızı kenarlı) | **Tehlike uyarı** işaretleri |\n| Daire (kırmızı kenarlı) | **Yasaklama ve kısıtlama** |\n| Daire (mavi zemin) | **Mecburiyet** |\n| Dikdörtgen/kare (mavi) | **Bilgi** işaretleri |\n| Sekizgen \"DUR\" | Durup yol vermek zorunlu |",
     "ornekler": [
      {
       "soru": "Kaldırımı olmayan bir köy yolunda yaya hangi taraftan yürümelidir? Neden?",
       "cozum": "**Taşıtların geliş yönüne karşı** (sol kenardan) yürümelidir; böylece karşıdan gelen araçları görür ve tehlikeye zamanında tepki verir."
      },
      {
       "soru": "Kırmızı kenarlı üçgen biçimli trafik işaretleri ne anlama gelir?",
       "cozum": "**Tehlike uyarı** işaretleridir (keskin viraj, okul geçidi, kaygan yol gibi)."
      }
     ],
     "ozet": [
      "Trafik kazalarının çoğu insan hatası kaynaklıdır.",
      "Yaya geçidi kullanılır; geçmeden önce sol–sağ–sol bakılır.",
      "Tüm koltuklarda emniyet kemeri; çocuklar uygun koltukta.",
      "Üçgen: tehlike; kırmızı daire: yasak; mavi daire: mecburiyet; mavi dikdörtgen: bilgi."
     ]
    }
   }
  ]
 }
];
