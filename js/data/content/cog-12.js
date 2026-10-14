/* =========================================================
   12. Sınıf Coğrafya — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Coğrafya 12 Detaylı Konu Anlatım Notları" (4 ünite).
   Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (afet yönetimi döngüsü, kalkınma projeleri tablosu, gelişmişlik göstergeleri, çevre anlaşmaları kronolojisi, örnek sorular). İstatistikler yaklaşık verilmiştir.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/cografya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Doğal Sistemler — Ekstrem Doğa Olayları",
   "en": "Unit 1: Natural Systems — Extreme Natural Events"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Ekstrem doğa olaylarının sınıflandırılması ve etkileri",
     "en": "Classification and effects of extreme natural events"
    },
    "content": {
     "anlatim": "# Ekstrem Doğa Olayı ve Afet\n\n- **Ekstrem doğa olayı:** Ortalama koşullardan çok sapan, nadir ve şiddetli doğal olay.\n- **Afet:** Doğa olayının **insan hayatını ve faaliyetlerini** etkileyerek toplumun baş etme kapasitesini aşan kayıplara yol açması. **Her doğa olayı afet değildir**; ıssız bir alandaki deprem afet sayılmaz.\n\n# Sınıflandırma\n\n| Köken | Olaylar |\n|---|---|\n| **Jeolojik–jeomorfolojik** | **Deprem**, volkanizma, **tsunami**, **heyelan**, kaya düşmesi, çığ, obruk |\n| **Meteorolojik–hidrometeorolojik** | **Sel ve taşkın**, **kuraklık**, tropikal siklon (**kasırga/tayfun**), **hortum**, sıcak ve soğuk hava dalgaları, dolu, fırtına, orman yangınları |\n| **Biyolojik** | Salgın hastalıklar, istilacı türler, çekirge istilası |\n\n# Birincil ve İkincil Etkiler\n\n| Olay | Birincil etki | İkincil etki |\n|---|---|---|\n| Deprem | Binaların yıkılması, can kaybı | Yangın, tsunami, heyelan, salgın, ekonomik kayıp, göç |\n| Volkanizma | Lav, kül, gaz | İklim soğuması, hava ulaşımının durması, tarım kaybı |\n| Sel | Su baskını | Salgın, içme suyu kirliliği, tarım kaybı |\n| Kuraklık | Su azlığı | Kıtlık, göç, orman yangını |\n\n# Türkiye'de Ekstrem Olaylar\n\n- **Deprem:** Kuzey Anadolu, Doğu Anadolu ve Batı Anadolu fay hatları — 1999 Marmara, **2023 Kahramanmaraş** depremleri.\n- **Heyelan:** Özellikle **Karadeniz** (eğim + bol yağış + killi yapı).\n- **Sel:** Karadeniz ve Akdeniz kıyıları, ani sağanaklar (2021 Batı Karadeniz selleri).\n- **Kuraklık ve orman yangınları:** Akdeniz ve Ege (2021 yangınları).\n- **Çığ:** Doğu Anadolu.\n\n# İklim Değişikliğinin Etkisi\n\nKüresel ısınma atmosferdeki enerjiyi ve nem miktarını artırır → **aşırı sıcaklar, şiddetli sağanaklar, kuraklıklar, orman yangınları ve güçlü siklonların** sıklığı ve şiddeti artmaktadır.",
     "ornekler": [
      {
       "soru": "Aynı büyüklükteki iki depremden birinin afete dönüşüp diğerinin dönüşmemesi nasıl açıklanır?",
       "cozum": "Afete dönüşüp dönüşmemesi **zarar görebilirliğe** bağlıdır: nüfus yoğunluğu, yapı kalitesi, zemin, hazırlık ve müdahale kapasitesi. Seyrek nüfuslu ya da dayanıklı yapılı bölgede deprem afete dönüşmeyebilir."
      }
     ],
     "ozet": [
      "Afet: toplumun baş etme kapasitesini aşan olay.",
      "Jeolojik (deprem, heyelan) ve meteorolojik (sel, kuraklık) olaylar.",
      "İklim değişikliği ekstrem olayların sıklığını artırır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Risk, zarar görebilirlik ve afet yönetimi",
     "en": "Risk, vulnerability and disaster management"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **Tehlike:** Zarar verme potansiyeli olan olay (fay hattı).\n- **Zarar görebilirlik (kırılganlık):** Toplumun olaydan etkilenme derecesi (çürük yapı, yoksulluk, bilinçsizlik).\n- **Risk:** $$\\text{Risk} = \\text{Tehlike} \\times \\text{Zarar görebilirlik}$$\n- **Dayanıklılık (direnç):** Toplumun etkiye karşı koyma ve toparlanma kapasitesi.\n\n# Bütünleşik Afet Yönetimi Döngüsü\n\n| Aşama | Zaman | Çalışmalar |\n|---|---|---|\n| **Zarar azaltma** | Afet öncesi | Risk haritaları, **mikrobölgeleme**, depreme dayanıklı yapı, yapı denetimi, taşkın setleri, ağaçlandırma |\n| **Hazırlık** | Afet öncesi | Tatbikat, afet çantası, toplanma alanları, **erken uyarı sistemleri**, eğitim |\n| **Müdahale** | Afet anı | Arama-kurtarma, ilk yardım, barınma, beslenme |\n| **İyileştirme** | Afet sonrası | Geçici ve kalıcı konut, altyapının onarımı, psikososyal destek |\n\n**Türkiye'de:** **AFAD** (2009) afet yönetiminin koordinatörü; **TAMP** (Türkiye Afet Müdahale Planı); zorunlu deprem sigortası (**DASK**); **AFAD Acil** mobil uygulaması.\n\n**Mekânsal teknolojilerin rolü:** CBS ve uzaktan algılama ile risk haritaları, hasar tespiti, tahliye planlaması.",
     "ornekler": [
      {
       "soru": "Yapı denetimi ve mikrobölgeleme hangi afet yönetimi aşamasına aittir? Neden en önemli aşama kabul edilir?",
       "cozum": "**Zarar azaltma** aşamasına aittir. Afet olmadan önce kayıpların kaynağını (zayıf yapı, riskli zemin) ortadan kaldırdığı için **en etkili ve en ucuz** aşamadır."
      }
     ],
     "ozet": [
      "Risk = tehlike × zarar görebilirlik.",
      "Döngü: zarar azaltma, hazırlık, müdahale, iyileştirme.",
      "Türkiye: AFAD, DASK, TAMP."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Beşerî Sistemler",
   "en": "Unit 2: Human Systems"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Ekonomi, şehirleşme ve göç ilişkisi",
     "en": "Economy, urbanization and migration"
    },
    "content": {
     "anlatim": "# Şehirleşme\n\nKırsal nüfusun şehirlere göç etmesi ve şehirlerin büyümesi. Türkiye'de nüfusun **yaklaşık %93'ü** il ve ilçe merkezlerinde yaşamaktadır (TÜİK).\n\n**Şehirleşmenin nedenleri:**\n| İtici (kırsal) | Çekici (kent) |\n|---|---|\n| Tarımda makineleşme, toprakların miras yoluyla bölünmesi, iş olanaklarının azlığı | Sanayi ve hizmet sektöründe iş, **eğitim ve sağlık** olanakları, sosyal yaşam |\n\n**Sorunlar:** Plansız yapılaşma (**gecekondu**), altyapı yetersizliği, trafik, hava ve su kirliliği, tarım alanlarının yapılaşması, işsizlik, kentsel dönüşüm ihtiyacı.\n\n# Göç\n\n- **İç göç:** Kırdan kente, doğudan batıya; **mevsimlik tarım işçiliği** göçü.\n- **Dış göç:** **1961**'den itibaren Almanya başta olmak üzere Avrupa'ya **iş gücü göçü**; günümüzde **beyin göçü**; Türkiye'ye yönelen **sığınmacı** göçleri (Suriye).\n- **Etkiler:** Göç veren yerde nüfus yaşlanması, tarımsal üretimin azalması; göç alan yerde konut, istihdam ve hizmet baskısı, **kültürel çeşitlilik**; döviz girdisi (dış göç).\n\n# Ekonomi–Şehirleşme–Göç Döngüsü\n\nSanayi ve hizmet yatırımları → istihdam → göç → şehirleşme → pazar büyümesi → yeni yatırımlar. Bölgesel eşitsizlik göçü artırır.",
     "ornekler": [
      {
       "soru": "Doğu Anadolu'dan batıdaki büyük kentlere yönelen göçün iki bölge üzerindeki etkileri nelerdir?",
       "cozum": "**Göç veren bölgede:** genç nüfus azalır, nüfus yaşlanır, tarım ve hayvancılık zayıflar. **Göç alan kentlerde:** konut ve altyapı yetersizliği, gecekondulaşma, işsizlik ve trafik sorunları artar; aynı zamanda iş gücü ve tüketim artar."
      }
     ],
     "ozet": [
      "Türkiye'de nüfusun büyük çoğunluğu kentlerde.",
      "İtici–çekici faktörler; plansız kentleşme sorunları.",
      "İç göç, dış göç (1961 Almanya), beyin göçü, sığınmacılar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Türkiye'nin işlevsel bölgeleri ve kalkınma projeleri",
     "en": "Türkiye's functional regions and development projects"
    },
    "content": {
     "anlatim": "# İşlevsel Bölge\n\nBir merkezin (şehir, liman) çevresiyle kurduğu **ekonomik ve sosyal ilişkilerle** belirlenen bölge (hinterland). Ör. İstanbul'un ticaret etki alanı, bir limanın art bölgesi.\n\n# Bölgesel Kalkınma Projeleri\n\n| Proje | Kapsam | Hedefler |\n|---|---|---|\n| **GAP** (Güneydoğu Anadolu Projesi) | Fırat ve Dicle havzası, 9 il | **Sulama** (Harran Ovası), **enerji** (Atatürk, Karakaya, Ilısu barajları), tarım-sanayi, sosyal kalkınma |\n| **DAP** (Doğu Anadolu Projesi) | Doğu Anadolu illeri | Hayvancılık, tarım, turizm, sınır ticareti |\n| **KOP** (Konya Ovası Projesi) | Konya, Karaman, Aksaray, Niğde | Kuraklıkla mücadele, **Mavi Tünel** ile su aktarımı, sulama |\n| **DOKAP** (Doğu Karadeniz Projesi) | Doğu Karadeniz illeri | Turizm (yayla), ulaşım, tarım (çay, fındık), göçün önlenmesi |\n| **ZBK** (Zonguldak–Bartın–Karabük) | Batı Karadeniz | Taş kömürü ve demir-çelik sanayisine bağlı ekonominin çeşitlendirilmesi |\n\n**Kalkınma ajansları** (26 bölge) yerel projeleri destekler.",
     "ornekler": [
      {
       "soru": "GAP'ın bölgede sulu tarıma geçişle ortaya çıkardığı ekonomik ve çevresel etkiler nelerdir?",
       "cozum": "**Ekonomik:** Pamuk, mısır gibi ürünlerde verim ve gelir artışı, tarıma dayalı sanayi, istihdam. **Çevresel:** Yanlış sulama ile **tuzlanma**, yer altı suyu düşüşü, baraj göllerinin iklimi nemlendirmesi ve tarihî alanların sular altında kalması (Hasankeyf)."
      }
     ],
     "ozet": [
      "İşlevsel bölge: merkez ve etki alanı.",
      "GAP sulama ve enerji; KOP kuraklık (Mavi Tünel); DOKAP; DAP; ZBK.",
      "Amaç: bölgesel eşitsizliği azaltmak."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Hizmet sektörü, ulaşım, ticaret ve turizm",
     "en": "Services, transport, trade and tourism"
    },
    "content": {
     "anlatim": "# Hizmet Sektörü\n\nEğitim, sağlık, ticaret, ulaşım, bankacılık, turizm gibi **üretim dışı** faaliyetler. Gelişmiş ülkelerde istihdamın büyük bölümü hizmet sektöründedir. Türkiye'de de istihdamın yarıdan fazlası hizmetlerdedir.\n\n# Ulaşım\n\n| Tür | Avantaj | Dezavantaj |\n|---|---|---|\n| **Kara yolu** | Kapıdan kapıya, esnek | Pahalı yakıt, kaza, kirlilik |\n| **Demir yolu** | Ucuz, yüksek kapasite, çevre dostu | Yatırım maliyeti, güzergâh sınırlı |\n| **Deniz yolu** | **En ucuz**, en yüksek kapasite | Yavaş |\n| **Hava yolu** | **En hızlı** | En pahalı, düşük kapasite |\n| **Boru hattı** | Kesintisiz akışkan taşıma | Yalnızca sıvı/gaz |\n\nTürkiye'de yük ve yolcu taşımacılığında **kara yolu** baskındır. Önemli projeler: **Marmaray**, **Avrasya Tüneli**, **Osmangazi** ve **1915 Çanakkale** köprüleri, **hızlı tren** hatları, **İstanbul Havalimanı**, **Orta Koridor** (Bakü–Tiflis–Kars demir yolu).\n\n# Küresel Ticaret ve Türkiye\n\n- **Dünya Ticaret Örgütü (DTÖ)**, gümrük birlikleri, serbest ticaret anlaşmaları.\n- Türkiye'nin dış ticaretinde en büyük pazar **Avrupa Birliği** (1996 **Gümrük Birliği**).\n- **İhracat:** Motorlu taşıtlar, makine, demir-çelik, tekstil-hazır giyim, elektrikli cihazlar, tarım ürünleri (fındık).\n- **İthalat:** Enerji (**petrol, doğal gaz**), ara mallar, makine, kimyasallar.\n- **Serbest bölgeler** ve lojistik merkezler.\n\n# Türkiye'de Turizm\n\n- **Doğal potansiyel:** Uzun kıyılar (deniz-kum-güneş), termal kaynaklar, yaylalar, kış sporları (Palandöken, Uludağ, Erciyes), mağaralar.\n- **Kültürel potansiyel:** **UNESCO Dünya Mirası** alanları (Göbeklitepe, Efes, Kapadokya, Truva, Safranbolu, İstanbul Tarihî Alanları…), inanç turizmi.\n- **Ekonomik katkı:** Döviz girdisi, istihdam, hizmet sektörünün canlanması.\n- **Sorunlar:** Mevsimsellik (yaz yoğunluğu), kıyıların yapılaşması, çevre kirliliği. **Alternatif turizm** (kültür, sağlık, gastronomi, eko-turizm) mevsimselliği azaltır.",
     "ornekler": [
      {
       "soru": "Türkiye'de turizm gelirlerinin yaz aylarında yoğunlaşmasının nedeni ve çözüm önerisi nedir?",
       "cozum": "Turizmin büyük ölçüde **deniz-kum-güneş** türüne dayanması. Çözüm: **kış, termal, kültür, inanç, sağlık ve gastronomi turizmi** gibi alternatif türleri geliştirerek turizmi **dört mevsime** yaymak."
      }
     ],
     "ozet": [
      "Hizmet sektörü istihdamda en büyük pay.",
      "Deniz yolu en ucuz, hava yolu en hızlı; Türkiye'de kara yolu baskın.",
      "Türkiye: AB en büyük pazar; enerji ithalatı; turizmde mevsimsellik."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Küresel Ortam — Bölgeler ve Ülkeler",
   "en": "Unit 3: Global Environment — Regions and Countries"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Türkiye'nin jeopolitik konumu ve güç dengeleri",
     "en": "Türkiye's geopolitical position and power balances"
    },
    "content": {
     "anlatim": "# Jeopolitik Konum\n\n**Jeopolitik:** Coğrafi koşulların devletlerin siyasetine ve güç ilişkilerine etkisi.\n\n**Türkiye'nin jeopolitik önemi:**\n- **Asya–Avrupa–Afrika** arasında **köprü** konumu.\n- **Türk Boğazları** (İstanbul ve Çanakkale): Karadeniz'in dünya denizlerine tek çıkışı; **Montrö Boğazlar Sözleşmesi (1936)** ile geçiş düzenlenir.\n- **Enerji koridoru:** Hazar ve Orta Doğu kaynaklarını Avrupa'ya ulaştıran boru hatları (BTC, TANAP, Türk Akım).\n- **Su kaynakları:** Fırat ve Dicle'nin kaynak ülkesi.\n- **Kültür havzası:** Balkanlar, Kafkasya, Orta Asya, Orta Doğu ile tarihî ve kültürel bağlar.\n- Üç tarafı denizlerle çevrili → **Mavi Vatan** ve deniz yetki alanları.\n- **NATO** üyesi; Türk Devletleri Teşkilatı, G20 üyeliği.\n\n# Küresel ve Bölgesel Güç Dengeleri\n\n- Küresel güçler (ABD, Çin, Rusya, AB) ekonomik, askerî ve teknolojik rekabet içindedir.\n- **Uluslararası örgütler:** BM, NATO, AB, G20, İİT, ŞİÖ, OPEC.\n- Bölgesel güçler stratejik geçitler, kaynaklar ve pazarlar üzerinde etki arar.",
     "ornekler": [
      {
       "soru": "Montrö Boğazlar Sözleşmesi'nin Türkiye'ye sağladığı hak nedir?",
       "cozum": "Boğazlar üzerindeki **egemenlik** hakkını tanır; Türkiye Boğazları **askerî olarak kontrol** edebilir, savaş zamanında savaş gemilerinin geçişini düzenleyebilir. Barış zamanında ticaret gemileri serbestçe geçer."
      }
     ],
     "ozet": [
      "Türkiye: kıtalar arası köprü, Boğazlar, enerji koridoru.",
      "Montrö 1936: Boğazlarda Türk egemenliği.",
      "Küresel güçler ve uluslararası örgütler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Gelişmişlik göstergeleri, enerji güzergâhları ve çatışma bölgeleri",
     "en": "Development indicators, energy routes and conflict zones"
    },
    "content": {
     "anlatim": "# Gelişmişlik Göstergeleri\n\n| Gösterge | Gelişmiş ülke | Gelişmekte olan ülke |\n|---|---|---|\n| Kişi başına milli gelir | Yüksek | Düşük |\n| **İnsani Gelişme Endeksi (İGE)** | Yüksek (gelir + eğitim + yaşam süresi) | Düşük |\n| Ekonomide baskın sektör | **Hizmet** ve sanayi | Tarım |\n| Doğum oranı / nüfus artışı | Düşük | Yüksek |\n| Ortalama yaşam süresi | Uzun | Kısa |\n| Bebek ölüm oranı | Düşük | Yüksek |\n| Okuryazarlık | Yüksek | Düşük |\n| Şehirleşme | Planlı, yüksek | Hızlı, plansız |\n| Enerji tüketimi (kişi başı) | Yüksek | Düşük |\n| Dış ticaret | Mamul ve teknoloji ihracatı | Ham madde ihracatı |\n\n# Enerji Güzergâhları ve Jeopolitik\n\n- **Stratejik geçitler (darboğazlar):** **Hürmüz Boğazı** (Basra Körfezi petrolünün çıkışı), **Süveyş Kanalı**, **Babülmendep**, **Malakka Boğazı**, **Türk Boğazları**, Panama Kanalı.\n- Enerji güzergâhlarının kesilmesi küresel fiyatları ve ekonomiyi etkiler (ör. 2022 sonrası Avrupa'nın doğal gaz arayışı).\n- Boru hatları ülkeler arasında **karşılıklı bağımlılık** ve siyasi etki yaratır.\n\n# Çatışma Bölgelerinin Coğrafi Analizi\n\nÇatışmaların coğrafi nedenleri:\n- **Kaynak rekabeti:** Petrol, doğal gaz, **su** (sınıraşan nehirler), maden.\n- **Stratejik konum:** Geçitler, boğazlar, limanlar.\n- **Sınır anlaşmazlıkları**, etnik ve dinî çeşitlilik, sömürgecilikten kalan yapay sınırlar.\n- Örnek bölgeler: **Orta Doğu**, Kafkasya, Sahra Altı Afrika, Keşmir, Doğu Avrupa (Ukrayna).\n- Sonuçları: **göç ve mülteci** akımları, ekonomik çöküş, çevresel tahribat, küresel enerji ve gıda fiyatlarında artış.",
     "ornekler": [
      {
       "soru": "Hürmüz Boğazı'nın kapanması dünya ekonomisini neden etkiler?",
       "cozum": "Basra Körfezi ülkelerinin petrol ve LNG ihracatının büyük bölümü buradan geçer; geçişin kesilmesi **enerji arzını azaltır**, petrol fiyatlarını yükseltir ve buna bağlı olarak ulaşım ve üretim maliyetlerini artırır."
      }
     ],
     "ozet": [
      "Gelişmişlik: İGE, sektörler, nüfus göstergeleri.",
      "Stratejik geçitler: Hürmüz, Süveyş, Malakka, Türk Boğazları.",
      "Çatışma nedenleri: kaynak, konum, sınır, etnik yapı."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Çevre ve Toplum",
   "en": "Unit 4: Environment and Society"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Sürdürülebilir kalkınma ve uluslararası çevre anlaşmaları",
     "en": "Sustainable development and international environmental agreements"
    },
    "content": {
     "anlatim": "# Doğal Çevrenin Sınırlılığı\n\nKaynaklar sınırlıdır; doğanın yenilenme kapasitesi aşıldığında **ekolojik açık** oluşur (limit aşım günü). **Ekolojik ayak izi:** Bir kişinin ya da toplumun tüketimini karşılamak için gereken biyolojik verimli alan.\n\n# Sürdürülebilir Kalkınma\n\n**Brundtland Raporu (1987):** \"Bugünün ihtiyaçlarını, gelecek kuşakların kendi ihtiyaçlarını karşılama imkânından ödün vermeden karşılamak.\"\n- Üç boyut: **çevresel, ekonomik, sosyal**.\n- **BM Sürdürülebilir Kalkınma Amaçları (2015, 17 amaç, 2030 hedefi):** yoksulluğa son, açlığa son, temiz su, erişilebilir ve temiz enerji, iklim eylemi, sudaki ve karadaki yaşam…\n\n# Uluslararası Anlaşmalar ve Konferanslar\n\n| Anlaşma | Yıl | Konu |\n|---|---|---|\n| **Ramsar Sözleşmesi** | 1971 | Sulak alanların korunması |\n| **Stockholm Konferansı** | 1972 | İlk BM çevre konferansı; **UNEP** kuruldu |\n| **Dünya Mirası Sözleşmesi (UNESCO)** | 1972 | Doğal ve kültürel mirasın korunması |\n| **CITES** | 1973 | Nesli tehlikedeki türlerin ticareti |\n| **Bern Sözleşmesi** | 1979 | Avrupa'nın yaban hayatı ve habitatları |\n| **Barselona Sözleşmesi** | 1976 | Akdeniz'in kirliliğe karşı korunması |\n| **Montreal Protokolü** | 1987 | **Ozon** tabakasını incelten maddeler (CFC) |\n| **Rio Zirvesi** | 1992 | İklim Değişikliği Çerçeve Sözleşmesi, **Biyolojik Çeşitlilik Sözleşmesi**, Gündem 21 |\n| **Kyoto Protokolü** | 1997 | Sera gazı azaltımında bağlayıcı hedefler |\n| **Paris Anlaşması** | 2015 | Isınmayı 2 °C'nin altında, mümkünse 1,5 °C'de tutmak |\n\nTürkiye Paris Anlaşması'nı **2021**'de onaylamış, **2053 net sıfır emisyon** hedefini açıklamıştır. **Sıfır Atık** projesi (2017) atıkların kaynağında ayrıştırılmasını hedefler.",
     "ornekler": [
      {
       "soru": "Montreal Protokolü neden en başarılı çevre anlaşmalarından biri sayılır?",
       "cozum": "Ozon tabakasını incelten CFC gibi maddelerin üretimi neredeyse tüm ülkelerce **aşamalı olarak durdurulmuş** ve ozon tabakasının **iyileşmeye** başladığı ölçümlerle gösterilmiştir."
      }
     ],
     "ozet": [
      "Sürdürülebilir kalkınma: Brundtland 1987; çevre-ekonomi-toplum.",
      "Montreal (ozon), Rio (iklim, biyoçeşitlilik), Kyoto, Paris.",
      "Türkiye: 2053 net sıfır, Sıfır Atık."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Ortak doğal ve kültürel mirasın korunması; STK'lar ve bireysel sorumluluk",
     "en": "Protecting shared heritage; NGOs and individual responsibility"
    },
    "content": {
     "anlatim": "# Ortak Miras\n\n**UNESCO Dünya Mirası Listesi:** İnsanlık için olağanüstü evrensel değere sahip doğal ve kültürel alanlar.\n- **Türkiye'den örnekler:** İstanbul Tarihî Alanları, **Göreme Millî Parkı ve Kapadokya**, **Hierapolis–Pamukkale**, Divriği Ulu Camii ve Darüşşifası, Hattuşa, Nemrut Dağı, Safranbolu, Truva, Selimiye Camii, Çatalhöyük, Bergama, Bursa ve Cumalıkızık, Efes, Ani, Afrodisias, Diyarbakır Kalesi ve Hevsel Bahçeleri, **Göbeklitepe**, Arslantepe, Gordion.\n- Ayrıca **Somut Olmayan Kültürel Miras** listesi: Karagöz, âşıklık, Nevruz, kahve kültürü, ebru, Mevlevi sema töreni.\n\n# Tehditler\n\n- Plansız kentleşme ve turizm baskısı\n- **İklim değişikliği** (deniz seviyesi yükselmesi, aşırı sıcaklar)\n- Doğal afetler (deprem), savaşlar ve **yağma**\n- Hava kirliliği ve asit yağmurlarının tarihî yapıları aşındırması\n- Barajların tarihî alanları su altında bırakması\n\n# Koruma Çabaları\n\n- Ulusal mevzuat: **Millî parklar**, tabiat parkları, **sit alanları**, Kültür ve Turizm Bakanlığı ile Tarım ve Orman Bakanlığı.\n- **Sivil toplum kuruluşları (STK):** TEMA Vakfı (erozyon, ağaçlandırma), WWF-Türkiye, Doğa Derneği, TÜRÇEV, Greenpeace — farkındalık, kampanya, gönüllü çalışma, politika önerisi.\n- **Bireysel sorumluluk:** Su ve enerji tasarrufu, geri dönüşüm, toplu taşıma, tek kullanımlık plastiklerden kaçınma, doğaya ve tarihî alanlara saygı, bilinçli tüketim, gönüllülük.",
     "ornekler": [
      {
       "soru": "Bir lise öğrencisinin çevre sorunlarının çözümüne bireysel olarak katkı sağlayabileceği üç davranış yazınız.",
       "cozum": "Örnek: **Atıkları kaynağında ayrıştırmak** (Sıfır Atık), **su ve elektriği tasarruflu kullanmak**, mümkün olduğunca **toplu taşıma ve bisiklet** kullanmak; ayrıca bir STK'nın ağaçlandırma veya temizlik etkinliğine gönüllü katılmak."
      }
     ],
     "ozet": [
      "UNESCO Dünya Mirası: Türkiye'den Göbeklitepe, Kapadokya, Efes…",
      "Tehditler: kentleşme, iklim, savaş, kirlilik.",
      "Koruma: mevzuat, STK'lar (TEMA, WWF), bireysel sorumluluk."
     ]
    }
   }
  ]
 }
];
