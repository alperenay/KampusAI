/* =========================================================
   12. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük — konu anlatım notları
   Kaynak: kullanıcının verdiği "İnkılap Tarihi 12 Detaylı Konu Anlatım Notları" (6 ünite).
   Kaynak notlar yalnızca ünite başlıklarını ve kazanımları içerdiği için her ünite ders kitabı düzeyinde genişletildi (ilkelerin uygulamaları, inkılap kronolojisi, Lozan'dan kalan sorunlar tablosu, II. Dünya Savaşı ve Soğuk Savaş dönemi). 21. yüzyıl bölümü 2026 ortasına kadarki gelişmeleri kapsar; güncel dış politika konuları tarafsız biçimde özetlenmiştir.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/inkilap"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Atatürkçülük ve Atatürk İlkeleri",
   "en": "Unit 1: Kemalism and Atatürk's Principles"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Atatürkçülük ve temel ilkeler: Cumhuriyetçilik, Milliyetçilik, Halkçılık",
     "en": "Kemalism; republicanism, nationalism, populism"
    },
    "content": {
     "anlatim": "# Atatürkçülük\n\nTürk milletinin **tam bağımsızlığını**, refahını, devletin millet egemenliğine dayanmasını, aklın ve bilimin rehberliğinde **çağdaş uygarlık seviyesinin üstüne** çıkarılmasını amaçlayan; devlet hayatına, fikir hayatına, ekonomik ve toplumsal hayata ilişkin **temel fikirler bütünü**.\n\n**Kaynakları:** Türk milletinin tarihî ve kültürel değerleri, Atatürk'ün kişiliği ve deneyimleri, **akıl ve bilim**, dönemin dünya gelişmeleri.\n**Temel ilkeler (altı ok):** 1937'de Anayasa'ya girdi.\n\n# Cumhuriyetçilik\n\n- Devlet yönetiminde **millet egemenliği**; yöneticilerin seçimle belirlenmesi.\n- \"**Egemenlik kayıtsız şartsız milletindir.**\"\n- Uygulamalar: TBMM'nin açılışı (1920), saltanatın kaldırılması (1922), **Cumhuriyet'in ilanı (29 Ekim 1923)**, halifeliğin kaldırılması (1924), çok partili hayat denemeleri.\n- Bağlantılı olduğu ilkeler: halkçılık, laiklik, milliyetçilik.\n\n# Milliyetçilik\n\n- **Birleştirici, bütünleştirici**, ırkçılığa ve bölücülüğe karşı; **dil, kültür, tarih birliği** ve ortak ülkü temelinde.\n- \"Ne mutlu Türk'üm diyene!\" — Türkiye Cumhuriyeti'ni kuran Türk halkı **millettir**.\n- Saldırgan ve yayılmacı değil; **barışçı**, insanlığın bir parçası olma bilinciyle.\n- Uygulamalar: **Türk Tarih Kurumu** (1931), **Türk Dil Kurumu** (1932), soyadı kanunu, kapitülasyonların kaldırılması, millî ekonomi, Hatay'ın katılımı.\n\n# Halkçılık\n\n- Toplumda **sınıf ayrıcalıklarının reddi**; kanun önünde eşitlik; devletin halkın yararına çalışması.\n- \"Türkiye Cumhuriyeti halkı **sınıflardan oluşmuş değil**, meslek gruplarından oluşmuş bir toplumdur.\"\n- Uygulamalar: Aşar vergisinin kaldırılması (1925), unvan ve lakapların kaldırılması (1934), **kadınlara seçme-seçilme hakkı** (1930, 1934), **Medeni Kanun** (1926), Halkevleri (1932), Millet Mektepleri.",
     "ornekler": [
      {
       "soru": "Aşar vergisinin kaldırılması hangi ilkelerle ilişkilendirilebilir?",
       "cozum": "**Halkçılık** (nüfusun büyük çoğunluğu olan köylünün yükünü hafifletme) ve **devletçilik** (ekonomide devletin halk yararına düzenleme yapması)."
      }
     ],
     "ozet": [
      "Atatürkçülük: tam bağımsızlık, millet egemenliği, çağdaşlaşma.",
      "Cumhuriyetçilik: egemenlik milletin; milliyetçilik: birleştirici, kültür temelli.",
      "Halkçılık: sınıf ayrıcalığına karşı, kanun önünde eşitlik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Devletçilik, Laiklik, İnkılapçılık ve bütünleyici ilkeler",
     "en": "Statism, secularism, revolutionism and complementary principles"
    },
    "content": {
     "anlatim": "# Devletçilik\n\n- Özel girişimin yetersiz kaldığı alanlarda **devletin ekonomiye yatırımcı olarak girmesi**; özel teşebbüsü dışlamayan karma ekonomi.\n- 1929 **Dünya Ekonomik Bunalımı** ve özel sermaye yetersizliği nedeniyle 1930'larda ağırlık kazandı.\n- Uygulamalar: **Sümerbank** (1933), **Etibank** (1935), **I. Beş Yıllık Sanayi Planı** (1934), Kayseri ve Nazilli bez fabrikaları, Karabük Demir-Çelik (1937 temeli), demir yollarının millîleştirilmesi.\n\n# Laiklik\n\n- **Din ve devlet işlerinin ayrılması**; devletin tüm inançlara **eşit mesafede** olması, **din ve vicdan özgürlüğü**; hukuk düzeninin akıl ve bilime dayanması.\n- Uygulamalar: Saltanat (1922) ve **halifeliğin kaldırılması** (1924), **Tevhid-i Tedrisat** (1924), Şeriye ve Evkaf Vekâleti'nin kaldırılıp **Diyanet İşleri Başkanlığı**'nın kurulması (1924), tekke ve zaviyelerin kapatılması (1925), **Medeni Kanun** (1926), \"Devletin dini İslam'dır\" ibaresinin Anayasa'dan çıkarılması (1928), **laikliğin Anayasa'ya girmesi** (1937).\n\n# İnkılapçılık\n\n- Yapılan inkılapları **korumak** ve çağın gereklerine göre **ileri götürmek**; durağanlığa karşı akılcı ve bilimsel gelişme.\n- Atatürk ilkelerinin **dinamizmini** sağlar; diğer ilkeleri koruyan ilkedir.\n\n# Bütünleyici İlkeler\n\n**Millî egemenlik, millî bağımsızlık, millî birlik ve beraberlik, yurtta sulh cihanda sulh, çağdaşlaşma, bilimsellik ve akılcılık, insan ve insanlık sevgisi**.\n\n> İlkeler birbirini **tamamlar** ve bir bütün olarak ele alınmalıdır; ortak hedef Türk milletinin **çağdaşlaşmasıdır**.",
     "ornekler": [
      {
       "soru": "Tevhid-i Tedrisat Kanunu hangi ilkelerle doğrudan ilişkilidir?",
       "cozum": "**Laiklik** (eğitimin dinî kurumlardan ayrılıp devlet denetimine alınması), **milliyetçilik** ve **halkçılık** (millî ve tek tip eğitim), **inkılapçılık** (eğitimde çağdaşlaşma)."
      }
     ],
     "ozet": [
      "Devletçilik: 1929 bunalımı, Sümerbank, Etibank, I. Beş Yıllık Plan.",
      "Laiklik: halifeliğin kaldırılması, Tevhid-i Tedrisat, 1937 Anayasa.",
      "İnkılapçılık ilkeleri korur ve geliştirir; bütünleyici ilkeler."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Türk İnkılabı",
   "en": "Unit 2: The Turkish Revolution"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Siyasi, hukuki, eğitim-kültür, toplumsal ve ekonomik inkılaplar",
     "en": "Political, legal, educational, social and economic reforms"
    },
    "content": {
     "anlatim": "# İnkılap Kavramı ve Niteliği\n\n**İnkılap:** Bir toplumun yönetim, hukuk, eğitim ve sosyal yapısında köklü ve kalıcı değişim. Türk İnkılabı **akılcı, millî, halkçı, çağdaş** ve **bağımsızlıkçı**dır; dış baskıyla değil **millet iradesiyle** gerçekleşmiştir.\n\n# Siyasi Alan\n\n| İnkılap | Tarih |\n|---|---|\n| TBMM'nin açılması | 23 Nisan 1920 |\n| Saltanatın kaldırılması | 1 Kasım 1922 |\n| Ankara'nın başkent olması | 13 Ekim 1923 |\n| **Cumhuriyet'in ilanı** | 29 Ekim 1923 |\n| **Halifeliğin kaldırılması** | 3 Mart 1924 |\n| 1924 Anayasası | 20 Nisan 1924 |\n| Çok partili hayat denemeleri | Terakkiperver Cumhuriyet Fırkası (1924), Serbest Cumhuriyet Fırkası (1930) |\n\n# Hukuk Alanında\n\n**Türk Medeni Kanunu (17 Şubat 1926)** — İsviçre'den uyarlandı: **tek eşlilik**, resmî nikâh, kadın-erkek eşitliği (miras, boşanma, tanıklık). Ayrıca Ceza, Borçlar, Ticaret kanunları; **hukuk birliği** sağlandı.\n\n# Eğitim ve Kültür\n\n- **Tevhid-i Tedrisat** (1924), **Harf İnkılabı** (1 Kasım 1928) ve **Millet Mektepleri**.\n- **Türk Tarih Kurumu** (1931), **Türk Dil Kurumu** (1932), **Üniversite Reformu** (1933 — Darülfünun yerine İstanbul Üniversitesi), Ankara'da Hukuk Mektebi, DTCF (1936).\n- Halkevleri (1932), konservatuvar, güzel sanatlar.\n\n# Toplumsal Hayat\n\nŞapka Kanunu (1925), **tekke ve zaviyelerin kapatılması** (1925), **uluslararası takvim, saat ve ölçüler** (1925–1931), **Soyadı Kanunu** (1934), lakap ve unvanların kaldırılması (1934), **kadın hakları**: belediye seçimleri (1930), muhtarlık (1933), **milletvekili seçme-seçilme** (5 Aralık 1934), hafta tatilinin pazar günü olması (1935).\n\n# Ekonomi\n\n**İzmir İktisat Kongresi** (1923), **Aşar vergisinin kaldırılması** (1925), **Kabotaj Kanunu** (1926), **Teşvik-i Sanayi Kanunu** (1927), **Türkiye Cumhuriyet Merkez Bankası** (1930), Türkiye İş Bankası (1924), **I. Beş Yıllık Sanayi Planı** (1934).\n\n# Dirençler\n\nŞeyh Said İsyanı (1925), Menemen Olayı (1930) gibi karşı tepkiler; **Takrir-i Sükûn Kanunu** ve İstiklal Mahkemeleriyle karşılık verildi.",
     "ornekler": [
      {
       "soru": "Medeni Kanun'un toplumsal hayata etkileri nelerdir?",
       "cozum": "**Kadın-erkek eşitliği** (miras, boşanma, tanıklık), **tek eşlilik** ve resmî nikâh zorunluluğu getirdi; aile yapısını çağdaş hukuka dayandırdı ve **hukuk birliğini** sağladı."
      }
     ],
     "ozet": [
      "Siyasi: saltanat 1922, Cumhuriyet 1923, halifelik 1924.",
      "Hukuk: Medeni Kanun 1926; eğitim: Tevhid-i Tedrisat 1924, Harf İnkılabı 1928.",
      "Kadın hakları 1930–1934; ekonomi: İzmir İktisat Kongresi, Aşar'ın kaldırılması."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Atatürk dönemi ekonomisi: İzmir İktisat Kongresi'nden devletçiliğe",
     "en": "The economy in Atatürk's era: from the İzmir Economic Congress to statism"
    },
    "content": {
     "anlatim": "# Devralınan Ekonomi\n\nSavaşlarla yıkılmış tarım, sermaye ve yetişmiş insan eksikliği; **kapitülasyonların** yarattığı bağımlılık (Lozan'da kaldırıldı); **Osmanlı borçları** (Lozan'da paylaştırıldı, Türkiye'nin payı 1954'te ödenip bitti).\n\n# İzmir İktisat Kongresi (17 Şubat – 4 Mart 1923)\n\n- Çiftçi, tüccar, sanayici ve işçi temsilcileri katıldı; **Misak-ı İktisadi** (ekonomik and) kabul edildi.\n- İlkeler: **yerli malı** kullanımı, **millî sanayinin** kurulması, yabancı sermayeye **millî çıkarlar gözetilerek** izin, tekelciliğe karşı çıkma.\n- Siyasi bağımsızlığın **ekonomik bağımsızlıkla** tamamlanması fikri.\n\n# Liberal Dönem (1923–1929)\n\n- **Türkiye İş Bankası** (1924), **Sanayi ve Maadin Bankası** (1925), **Teşvik-i Sanayi Kanunu** (1927).\n- **Aşar vergisinin kaldırılması** (1925): Köylü üzerindeki ağır yük kalktı.\n- **Kabotaj Kanunu** (1 Temmuz 1926): Türk karasularında taşımacılık hakkı **Türk gemilerine** verildi (Denizcilik ve Kabotaj Bayramı).\n\n# Devletçilik Dönemi (1930–1939)\n\n**1929 Dünya Ekonomik Bunalımı** ve özel sermayenin yetersizliği nedeniyle devlet ekonomiye **doğrudan** girdi.\n- **Merkez Bankası** (1930), **Sümerbank** ve **Etibank** (1933, 1935).\n- **I. Beş Yıllık Sanayi Planı** (1934): Kayseri ve Nazilli bez fabrikaları, Paşabahçe şişe, Karabük demir–çelik (1939'da temeli).\n- Demiryolu yapımı ve yabancı şirketlerin elindeki demiryollarının **millîleştirilmesi** (\"Demir ağlarla ördük anayurdu\").",
     "ornekler": [
      {
       "soru": "Kabotaj Kanunu'nun ekonomik ve siyasi önemi nedir?",
       "cozum": "Lozan'da kaldırılan kapitülasyonların bir kalıntısı olan yabancı gemilerin Türk limanları arasında taşımacılık hakkı sona erdi; **ekonomik bağımsızlık** pekişti ve Türk denizciliği gelişti."
      },
      {
       "soru": "Türkiye'nin 1930'larda devletçilik politikasına geçmesinin iki temel nedeni nedir?",
       "cozum": "**1929 Dünya Ekonomik Bunalımı** ve **özel sektörün sermaye ve tecrübe yetersizliği** nedeniyle beklenen sanayileşmenin gerçekleşmemesi."
      }
     ],
     "ozet": [
      "İzmir İktisat Kongresi (1923): Misak-ı İktisadi, yerli malı, millî sanayi.",
      "Aşar kaldırıldı (1925); Kabotaj Kanunu (1926).",
      "1929 bunalımı → devletçilik; Sümerbank, Etibank, I. Beş Yıllık Plan (1934)."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Atatürk Dönemi Türk Dış Politikası (1923–1938)",
   "en": "Unit 3: Turkish Foreign Policy in Atatürk's Era"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Lozan'dan kalan sorunlar ve barışçı dış politika",
     "en": "Issues left from Lausanne and peaceful foreign policy"
    },
    "content": {
     "anlatim": "# İlkeler\n\n\"**Yurtta sulh, cihanda sulh.**\" Gerçekçi, **barışçı**, dengeli, tam bağımsızlıkçı, uluslararası hukuka dayalı dış politika; antlaşmalara bağlılık, statükonun korunması.\n\n# Lozan'dan Kalan Sorunlar\n\n| Sorun | Çözüm |\n|---|---|\n| **Nüfus mübadelesi** (Türk–Yunan) | 1923 sözleşmesi; \"**etabli**\" (yerleşik) anlaşmazlığı **1930 Ankara Antlaşması** ile çözüldü |\n| **Yabancı okullar** | Türk kanunlarına bağlandı; Türkçe, tarih ve coğrafya derslerinin Türk öğretmenlerce okutulması |\n| **Osmanlı borçları** | Paris'te 1928 anlaşmasıyla taksitlendirildi; ilk taksit 1929 |\n| **Musul sorunu** | Milletler Cemiyeti kararı; **1926 Ankara Antlaşması** ile Musul **Irak'a (İngiliz mandası)** bırakıldı; petrol gelirinin %10'u 25 yıl Türkiye'ye |\n| **Boğazlar** | **Montrö Boğazlar Sözleşmesi (1936)** — Boğazlar üzerinde tam **Türk egemenliği** |\n| **Hatay** | 1938 Hatay Devleti; **1939**'da Türkiye'ye katıldı (Atatürk'ün vefatından sonra) |\n\n# Bölgesel İş Birlikleri\n\n- **Milletler Cemiyeti**'ne üyelik (1932).\n- **Balkan Antantı (1934):** Türkiye, Yunanistan, Romanya, Yugoslavya — İtalya'nın yayılmacılığına karşı Balkan sınırlarının korunması.\n- **Sadabat Paktı (1937):** Türkiye, İran, Irak, Afganistan — doğu sınırlarının güvenliği.\n- SSCB ile dostluk ve tarafsızlık antlaşması (1925).",
     "ornekler": [
      {
       "soru": "Montrö Boğazlar Sözleşmesi Lozan'a göre Türkiye'ye ne kazandırdı?",
       "cozum": "Lozan'da Boğazlar uluslararası bir komisyonun denetiminde ve **askerden arındırılmıştı**. Montrö ile komisyon kaldırıldı, Türkiye Boğazları **silahlandırma** ve geçişleri **denetleme** hakkını kazanarak tam egemenlik sağladı."
      }
     ],
     "ozet": [
      "Yurtta sulh, cihanda sulh.",
      "Lozan sorunları: mübadele, Musul (1926), borçlar, yabancı okullar.",
      "Balkan Antantı 1934, Sadabat 1937, Montrö 1936, Hatay 1939."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Montrö, Balkan Antantı, Sadabat Paktı ve Hatay'ın anavatana katılması",
     "en": "Montreux, the Balkan Pact, the Saadabad Pact and Hatay joining the homeland"
    },
    "content": {
     "anlatim": "# Dönemin Ortamı\n\n1930'larda **İtalya** (Akdeniz'de yayılmacılık) ve **Almanya**'nın saldırgan politikaları; Türkiye **güvenlik ve bölgesel işbirliği** arar. Türkiye **Milletler Cemiyeti**'ne **1932**'de katıldı.\n\n# Balkan Antantı (9 Şubat 1934)\n\n**Türkiye, Yunanistan, Romanya, Yugoslavya** → Balkan sınırlarının korunması, İtalya'ya karşı ortak güvenlik. (Bulgaristan ve Arnavutluk katılmadı.)\n\n# Montrö Boğazlar Sözleşmesi (20 Temmuz 1936)\n\n- Lozan'da Boğazlar **uluslararası komisyona** bırakılmış, kıyılar silahsızlandırılmıştı.\n- Montrö ile **komisyon kaldırıldı**, Boğazların yönetimi ve güvenliği **Türkiye'ye** geçti; kıyılar **silahlandırılabildi**.\n- Barışta ticaret gemileri serbest; savaş gemilerine **tonaj ve süre sınırlaması**; Türkiye savaşta ya da savaş tehdidinde Boğazları **istediği gibi** kapatabilir.\n- **Lozan'ın eksik kalan maddelerinden biri barışçı yolla** düzeltildi.\n\n# Sadabat Paktı (8 Temmuz 1937)\n\n**Türkiye, İran, Irak, Afganistan** → doğu sınırlarının güvenliği, saldırmazlık, iç işlerine karışmama.\n\n# Hatay Meselesi\n\n- 1921 **Ankara Antlaşması** ile Fransa'ya bırakılan İskenderun Sancağı'na özel yönetim tanınmıştı.\n- Fransa'nın Suriye'den çekilme kararı (1936) → Atatürk meseleyi **Milletler Cemiyeti**'ne taşıdı.\n- **1937:** Hatay iç işlerinde bağımsız, dış işlerinde Suriye'ye bağlı → **1938 Hatay Devleti** (cumhurbaşkanı Tayfur Sökmen) → **29 Haziran 1939** Hatay Meclisi kararıyla **Türkiye'ye katıldı**.\n- Misak-ı Millî sınırları içinde olup Atatürk döneminde başlayan son mesele; Atatürk'ün vefatından sonra tamamlandı.",
     "ornekler": [
      {
       "soru": "Montrö Boğazlar Sözleşmesi'nin Lozan Antlaşması'ndaki hangi düzenlemeyi değiştirdiğini açıklayınız.",
       "cozum": "Lozan'da Boğazlar **uluslararası bir komisyona** bırakılmış ve kıyılar **silahsızlandırılmıştı**. Montrö ile komisyon kaldırıldı, Boğazlar üzerinde **tam Türk egemenliği** sağlandı ve kıyılar silahlandırılabildi."
      },
      {
       "soru": "Balkan Antantı ve Sadabat Paktı'nın ortak amacı nedir?",
       "cozum": "Türkiye'nin **batı (Balkan)** ve **doğu** sınırlarını güvence altına almak; bölgesel barış ve işbirliğiyle **saldırgan devletlere** karşı güvenlik sağlamak."
      }
     ],
     "ozet": [
      "Türkiye 1932'de Milletler Cemiyeti'ne katıldı.",
      "Balkan Antantı 1934, Montrö 1936, Sadabat 1937.",
      "Hatay: 1938 Hatay Devleti, 29 Haziran 1939 anavatana katılım."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: İkinci Dünya Savaşı ve Türkiye",
   "en": "Unit 4: World War II and Türkiye"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "II. Dünya Savaşı'nda Türkiye ve savaş sonrası çok partili hayat",
     "en": "Türkiye in WWII and post-war multi-party politics"
    },
    "content": {
     "anlatim": "# Savaşın Nedenleri ve Seyri (1939–1945)\n\n- I. Dünya Savaşı sonrası antlaşmaların yarattığı memnuniyetsizlik, **1929 ekonomik bunalımı**, totaliter rejimlerin (Almanya, İtalya, Japonya) yayılmacılığı, Milletler Cemiyeti'nin etkisizliği.\n- **Almanya'nın Polonya'yı işgali (1 Eylül 1939)** ile başladı. **Mihver** (Almanya, İtalya, Japonya) – **Müttefikler** (İngiltere, Fransa, SSCB, ABD).\n- Japonya'ya atılan **atom bombaları** (Ağustos 1945) ile sona erdi; **Birleşmiş Milletler** kuruldu (1945).\n\n# Türkiye'nin Politikası — İsmet İnönü Dönemi\n\n- **Aktif tarafsızlık ve denge politikası:** Ülkeyi savaşın dışında tutmak.\n- **İngiltere–Fransa–Türkiye Üçlü İttifakı** (1939) ve **Almanya ile saldırmazlık paktı** (1941).\n- Müttefiklerin baskısı: **Adana Görüşmesi** (1943), **Kahire Konferansı** (1943).\n- **23 Şubat 1945**'te Almanya ve Japonya'ya **sembolik** savaş ilanı → BM kurucu konferansına katılım.\n\n# Savaşın Türkiye'ye Etkileri\n\n- Ordu seferber edildi; savunma harcamaları arttı.\n- **Millî Korunma Kanunu** (1940), **ekmek karnesi**, karaborsa ve enflasyon.\n- **Varlık Vergisi** (1942): Savaş zenginlerinden olağanüstü vergi; uygulamada özellikle gayrimüslimlere yüksek vergi biçilmesi nedeniyle eleştirilmiştir.\n- **Toprak Mahsulleri Vergisi** (1943).\n- Köy Enstitüleri (1940), Tercüme Bürosu gibi eğitim-kültür atılımları.\n\n# Savaş Sonrası Çok Partili Hayat\n\n- Demokratik ülkelerin zaferi ve BM'ye katılım iç siyaseti etkiledi.\n- **Dörtlü Takrir** (1945) → **Demokrat Parti** kuruldu (7 Ocak 1946).\n- **1946 seçimleri** (açık oy, gizli tasnif) — CHP kazandı.\n- **14 Mayıs 1950 seçimleri** — **Demokrat Parti iktidara geldi**; Adnan Menderes başbakan, Celâl Bayar cumhurbaşkanı → demokratik bir iktidar değişimi.",
     "ornekler": [
      {
       "soru": "Türkiye'nin 1945'te Almanya'ya savaş ilan etmesinin nedeni nedir?",
       "cozum": "Yalta Konferansı'nda **1 Mart 1945'e kadar Mihver'e savaş ilan eden** devletlerin Birleşmiş Milletler kurucu konferansına katılabileceği kararlaştırılmıştı. Türkiye **savaş sonrası düzende yer almak** için sembolik olarak savaş ilan etti."
      }
     ],
     "ozet": [
      "Türkiye: aktif tarafsızlık ve denge politikası.",
      "Etkiler: Millî Korunma Kanunu, karne, Varlık Vergisi.",
      "Çok partili hayat: DP 1946; 1950'de iktidar değişimi."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Demokrat Parti dönemi (1950–1960)",
     "en": "The Democrat Party era (1950–1960)"
    },
    "content": {
     "anlatim": "# Çok Partili Hayata Geçiş\n\n- **1945:** Nuri Demirağ'ın **Millî Kalkınma Partisi** (ilk başarılı muhalefet partisi denemesi).\n- **7 Ocak 1946:** **Demokrat Parti** (Celal Bayar, Adnan Menderes, Fuat Köprülü, Refik Koraltan — **Dörtlü Takrir**).\n- **1946 seçimleri:** **açık oy – gizli tasnif** → CHP kazandı.\n- **1950 seçimleri:** **gizli oy – açık tasnif** ile yapıldı; **14 Mayıs 1950**'de DP iktidara geldi; Celal Bayar cumhurbaşkanı, Adnan Menderes başbakan oldu.\n\n# İç Politika\n\n- **Ezanın yeniden Arapça okunmasına** izin (1950).\n- Tarımda **makineleşme** (Marshall yardımlarıyla traktör), karayolu yapımı, köyden kente **göç** ve **gecekondulaşma**.\n- 1954'ten sonra enflasyon, dış borç, döviz sıkıntısı; muhalefete yönelik kısıtlamalar (**Tahkikat Komisyonu**, basına baskı) gerginliği artırdı.\n- **27 Mayıs 1960 askerî darbesi:** DP iktidarı devrildi; **Yassıada** yargılamaları sonunda Menderes, Zorlu ve Polatkan idam edildi.\n\n# Dış Politika\n\n- **Kore Savaşı'na asker gönderilmesi** (1950) → **NATO üyeliği** (18 Şubat **1952**).\n- **Balkan Paktı** (1953–54: Türkiye, Yunanistan, Yugoslavya), **Bağdat Paktı** (1955; Irak çekilince **CENTO**).\n- Batı bloğuyla yakın ilişki; ABD ile ikili anlaşmalar.",
     "ornekler": [
      {
       "soru": "1946 ve 1950 seçimlerinin yapılış biçimi arasındaki fark nedir?",
       "cozum": "1946: **açık oy, gizli tasnif** (oylar açık verilip gizli sayıldı) — demokratik bulunmadı. 1950: **gizli oy, açık tasnif** → daha adil seçim; DP iktidara geldi."
      },
      {
       "soru": "Türkiye'nin NATO'ya girişini kolaylaştıran gelişme nedir?",
       "cozum": "**Kore Savaşı**'na (1950) BM kuvvetleri içinde asker göndermesi; Türkiye **1952**'de NATO üyesi oldu."
      }
     ],
     "ozet": [
      "DP 1946'da kuruldu; 14 Mayıs 1950'de iktidar.",
      "Kore Savaşı → NATO (1952); Bağdat Paktı (1955).",
      "27 Mayıs 1960 darbesi; Yassıada yargılamaları."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Soğuk Savaş Dönemi ve Türkiye",
   "en": "Unit 5: The Cold War and Türkiye"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Soğuk Savaş'ın başlaması, NATO ve Kıbrıs meselesi",
     "en": "Start of the Cold War, NATO and the Cyprus issue"
    },
    "content": {
     "anlatim": "# Soğuk Savaş\n\nII. Dünya Savaşı sonrası **ABD liderliğindeki Batı Bloku** ile **SSCB liderliğindeki Doğu Bloku** arasındaki, doğrudan sıcak savaşa dönüşmeyen siyasi, ideolojik, ekonomik ve askerî rekabet (1947–1991).\n\n# Türkiye'nin Batı Blokuna Yönelişi\n\n- SSCB'nin **Boğazlar'da üs** ve **Kars-Ardahan** talepleri (1945) Türkiye'yi Batı'ya yöneltti.\n- **Truman Doktrini** (1947): Türkiye ve Yunanistan'a askerî ve ekonomik yardım.\n- **Marshall Planı** (1948): Avrupa'nın ekonomik kalkınması; Türkiye'ye tarım makineleri ve kara yolu yatırımları.\n- **Avrupa Konseyi** üyeliği (1949).\n- **Kore Savaşı** (1950–1953): BM kararıyla Türk tugayı gönderildi (Kunuri, Taegu).\n- **NATO** üyeliği: **18 Şubat 1952**.\n- **Balkan Paktı** (1953–54), **Bağdat Paktı** (1955) → CENTO.\n\n# Kıbrıs Meselesi\n\n- 1878'den beri İngiliz yönetiminde; Rumların **Enosis** (Yunanistan'a bağlanma) amacı ve EOKA saldırıları.\n- **Zürih ve Londra Antlaşmaları (1959)** → **Kıbrıs Cumhuriyeti (1960)**: Türkiye, Yunanistan, İngiltere **garantör**.\n- 1963 **Kanlı Noel** ve Türklere yönelik saldırılar; **Johnson Mektubu** (1964) ilişkileri gerdi.\n- Yunanistan destekli darbe sonrası (1974) Türkiye garantörlük hakkına dayanarak **Kıbrıs Barış Harekâtı**'nı başlattı (20 Temmuz 1974).\n- **Kıbrıs Türk Federe Devleti** (1975) → **Kuzey Kıbrıs Türk Cumhuriyeti** (15 Kasım 1983; yalnızca Türkiye tarafından tanınmaktadır).",
     "ornekler": [
      {
       "soru": "SSCB'nin 1945'teki talepleri Türkiye'nin dış politikasını nasıl etkiledi?",
       "cozum": "Boğazlarda üs ve doğu illerinde toprak talepleri Türkiye'yi **güvenlik kaygısıyla** Batı Bloku'na yöneltti; Truman Doktrini, Marshall Planı ve 1952'de **NATO üyeliği** bu yönelimin sonuçlarıdır."
      }
     ],
     "ozet": [
      "Soğuk Savaş: ABD–SSCB rekabeti (1947–1991).",
      "Truman 1947, Marshall 1948, Kore, NATO 1952.",
      "Kıbrıs: 1960 Cumhuriyeti, 1974 Barış Harekâtı, 1983 KKTC."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "1960–1990 iç ve dış gelişmeler; Avrupa ile ilişkiler",
     "en": "Domestic and foreign developments 1960–1990; relations with Europe"
    },
    "content": {
     "anlatim": "# İç Gelişmeler\n\n| Olay | Sonuç |\n|---|---|\n| **27 Mayıs 1960 askerî darbesi** | DP iktidarı devrildi; **1961 Anayasası** (geniş temel haklar, Anayasa Mahkemesi, iki meclisli parlamento) |\n| Planlı kalkınma dönemi | **Devlet Planlama Teşkilatı** (1960); beş yıllık kalkınma planları |\n| **12 Mart 1971 muhtırası** | Hükümet istifa etti; anayasada değişiklikler |\n| 1970'lerde siyasi istikrarsızlık | Koalisyonlar, ekonomik kriz, toplumsal çatışmalar |\n| **12 Eylül 1980 askerî darbesi** | **1982 Anayasası**; 1983'te sivil yönetime dönüş |\n| **24 Ocak 1980 kararları** | Dışa açık, **serbest piyasa** ekonomisine geçiş; 1980'lerde Turgut Özal dönemi |\n\n# Dış Gelişmeler\n\n- **Johnson Mektubu** (1964) ve Kıbrıs meselesi → **çok yönlü dış politika** arayışı, SSCB ve Bağlantısızlarla ilişkilerin gelişmesi.\n- **Haşhaş krizi**, 1974 sonrası **ABD silah ambargosu** (1975–1978).\n- **Ege sorunları:** Kıta sahanlığı, kara suları, hava sahası, adaların silahlandırılması.\n- **ASALA** terör örgütünün Türk diplomatlarına saldırıları (1970–80'ler).\n- **İran–Irak Savaşı** (1980–1988) ve bölgesel gelişmeler.\n\n# Avrupa ile İlişkiler\n\n- **Ankara Antlaşması** (1963): Avrupa Ekonomik Topluluğu ile **ortaklık**.\n- **Katma Protokol** (1970).\n- **Tam üyelik başvurusu** (1987).\n- **Gümrük Birliği** (1 Ocak 1996).\n- **Helsinki Zirvesi** (1999): adaylık statüsü; **2005**'te katılım müzakereleri başladı.\n\n# Soğuk Savaş'ın Sonu\n\n**Berlin Duvarı'nın yıkılması** (1989), **SSCB'nin dağılması** (1991) → Türkiye için **Türk cumhuriyetleriyle** yeni ilişkiler (bağımsızlıklarını ilk tanıyan ülke Türkiye).",
     "ornekler": [
      {
       "soru": "24 Ocak 1980 kararları Türkiye ekonomisinde nasıl bir dönüşüm başlattı?",
       "cozum": "**İthal ikameci, devlet ağırlıklı** modelden **ihracata dayalı, dışa açık serbest piyasa** ekonomisine geçiş başladı; döviz kuru serbestleşti, ihracat teşvik edildi, özelleştirme gündeme geldi."
      }
     ],
     "ozet": [
      "1960 darbesi ve 1961 Anayasası; 1971 muhtırası; 1980 darbesi ve 1982 Anayasası.",
      "24 Ocak 1980: serbest piyasaya geçiş.",
      "AB yolu: Ankara Antlaşması 1963, Gümrük Birliği 1996, adaylık 1999."
     ]
    }
   },
   {
    "id": "k3",
    "code": "5.3",
    "title": {
     "tr": "1960–1980 askerî müdahaleleri ve anayasalar",
     "en": "Military interventions and constitutions of 1960–1980"
    },
    "content": {
     "anlatim": "# 1961 Anayasası\n\n27 Mayıs sonrası **Kurucu Meclis** hazırladı; **halkoylamasıyla** kabul edilen **ilk** anayasa.\n- **İki meclisli** yapı: Millet Meclisi + **Cumhuriyet Senatosu**.\n- **Anayasa Mahkemesi** kuruldu; **Millî Güvenlik Kurulu** (MGK) anayasaya girdi.\n- Geniş **temel hak ve özgürlükler** (sendika, grev, toplu sözleşme), üniversite ve TRT'ye **özerklik**.\n- **Devlet Planlama Teşkilatı** (1960) → **Beş Yıllık Kalkınma Planları** (1963'ten itibaren).\n\n# 12 Mart 1971 Muhtırası\n\nSiyasi istikrarsızlık, öğrenci olayları ve şiddet ortamında Genelkurmay'ın **muhtıra** vermesiyle **Demirel hükûmeti çekildi**; \"partiler üstü\" hükûmetler kuruldu, anayasada özgürlükleri kısıtlayan değişiklikler yapıldı.\n\n# 12 Eylül 1980 Askerî Darbesi\n\n1970'lerde **sağ–sol çatışmaları**, ekonomik kriz (karaborsa, kuyruklar), **cumhurbaşkanı seçilememesi** (1980'de aylarca) → Kenan Evren başkanlığında **Millî Güvenlik Konseyi** yönetime el koydu; partiler kapatıldı.\n\n# 1982 Anayasası\n\n- **7 Kasım 1982** halkoylamasıyla kabul edildi (hâlen yürürlükte, birçok kez değiştirildi).\n- **Tek meclisli** yapı; **güçlendirilmiş cumhurbaşkanı**, Yükseköğretim Kurulu (**YÖK**), Devlet Güvenlik Mahkemeleri.\n- **1983 seçimleri** → **Turgut Özal** (ANAP) hükûmeti; **24 Ocak 1980 kararları** ile başlayan serbest piyasa ekonomisine geçiş hızlandı.",
     "ornekler": [
      {
       "soru": "1961 Anayasası'nı daha önceki anayasalardan ayıran iki özellik nedir?",
       "cozum": "**Halkoylamasıyla kabul edilen ilk anayasa**dır; **Anayasa Mahkemesi** ve **Cumhuriyet Senatosu** (iki meclisli yapı) gibi kurumlar getirmiş, temel hak ve özgürlükleri genişletmiştir."
      },
      {
       "soru": "24 Ocak 1980 kararlarının amacı nedir?",
       "cozum": "İthal ikamesine dayalı korumacı ekonomiden **dışa açık, serbest piyasa ekonomisine** geçiş; ihracatı teşvik, kur ayarlaması, fiyat serbestisi."
      }
     ],
     "ozet": [
      "1961 Anayasası: halkoylaması, Anayasa Mahkemesi, iki meclis.",
      "12 Mart 1971 muhtırası; 12 Eylül 1980 darbesi.",
      "1982 Anayasası: tek meclis, YÖK; Özal ve serbest piyasa."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: 21. Yüzyılın Eşiğinde ve 21. Yüzyılda Türkiye",
   "en": "Unit 6: Türkiye in the 21st Century"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1",
    "title": {
     "tr": "Küreselleşme, uluslararası örgütler ve Türkiye'nin konumu",
     "en": "Globalization, international organizations and Türkiye's position"
    },
    "content": {
     "anlatim": "# Küreselleşme\n\nEkonomik, kültürel, siyasi ve teknolojik etkileşimin dünya ölçeğinde yoğunlaşması.\n- **Olumlu:** Ticaretin ve bilgiye erişimin artması, teknolojik gelişme, iletişim.\n- **Olumsuz:** Gelir eşitsizlikleri, kültürel yozlaşma kaygısı, küresel krizlerin hızla yayılması (2008 finans krizi), salgınlar (**COVID-19**, 2020), **iklim değişikliği**.\n- **Bilgi toplumu** ve dijital dönüşüm, **yapay zekâ**, siber güvenlik.\n\n# 1990 Sonrası Bölgesel Gelişmeler\n\n- **Körfez Savaşı** (1990–91), **Yugoslavya'nın dağılması** ve Bosna Savaşı (1992–95), Kosova.\n- **Karabağ** sorunu; **2020**'de Azerbaycan topraklarının önemli bölümünü geri aldı.\n- **11 Eylül 2001** saldırıları ve terörle mücadele; Afganistan ve **Irak** (2003) müdahaleleri.\n- **Arap Baharı** (2010 sonrası), **Suriye iç savaşı** ve Türkiye'ye yönelen büyük **göç**.\n- **Rusya–Ukrayna Savaşı** (2022) ve Karadeniz güvenliği; Türkiye'nin **Montrö**'yü uygulaması ve arabuluculuk girişimleri (Tahıl Koridoru).\n- Doğu Akdeniz ve Ege'de deniz yetki alanları tartışmaları (**Mavi Vatan**).\n\n# Türkiye ve Uluslararası Örgütler\n\n| Örgüt | Türkiye |\n|---|---|\n| **BM** | Kurucu üye (1945) |\n| **NATO** | 1952'den beri üye |\n| **Avrupa Konseyi** | 1949 |\n| **AB** | Aday ülke (1999), Gümrük Birliği |\n| **İİT** (İslam İşbirliği Teşkilatı) | Üye |\n| **Türk Devletleri Teşkilatı** | Kurucu üye (Türk Konseyi 2009 → TDT 2021) |\n| **G20** | Üye |\n| **KEİ** (Karadeniz Ekonomik İşbirliği) | Kurucu (1992) |\n| **D-8**, **EİT**, **AGİT**, **OECD** | Üye |\n\n# Atatürk İlke ve İnkılaplarının Güncelliği\n\n- **Millî egemenlik ve demokrasi**, hukukun üstünlüğü, **laiklik**, **bilim ve akılcılık**, kadın-erkek eşitliği, tam bağımsızlık ve \"**yurtta sulh, cihanda sulh**\" ilkesi günümüzde de yol göstericidir.\n- **İnkılapçılık** ilkesi, değişen dünyaya akıl ve bilimle uyum sağlamayı gerektirir.",
     "ornekler": [
      {
       "soru": "Atatürk'ün 'Hayatta en hakiki mürşit ilimdir' sözü günümüzdeki küresel sorunlarla nasıl ilişkilendirilebilir?",
       "cozum": "Salgın hastalıklar, iklim değişikliği ve teknolojik dönüşüm gibi küresel sorunların çözümünde **bilimsel bilgi ve akılcılığın** rehber alınması gerektiğini vurgular; bu, Atatürkçülüğün **bilimsellik** ilkesinin güncelliğini gösterir."
      }
     ],
     "ozet": [
      "Küreselleşme: fırsatlar ve riskler (kriz, salgın, iklim).",
      "Bölgesel gelişmeler: Balkanlar, Kafkasya, Orta Doğu, Rusya–Ukrayna.",
      "Türkiye: BM, NATO, TDT, G20; AB adaylığı; Atatürk ilkelerinin güncelliği."
     ]
    }
   },
   {
    "id": "k2",
    "code": "6.2",
    "title": {
     "tr": "Türkiye'nin güncel dış politika meseleleri: Ege, Kıbrıs, Kafkasya ve Orta Doğu",
     "en": "Current foreign policy issues of Türkiye: Aegean, Cyprus, Caucasus and Middle East"
    },
    "content": {
     "anlatim": "# Ege Sorunları (Yunanistan ile)\n\n- **Karasuları:** Türkiye 6 mil uygular; Yunanistan'ın 12 mile çıkarma girişimini Türkiye **savaş sebebi (casus belli)** sayar (TBMM, 1995).\n- **Kıta sahanlığı**, **hava sahası** (10 mil iddiası), **adaların silahlandırılması** (Lozan ve Paris antlaşmalarına aykırı), **egemenliği belirsiz ada ve kayalıklar** (Kardak krizi, 1996).\n\n# Kıbrıs Meselesi\n\n- 1960 **Kıbrıs Cumhuriyeti** (Türkiye, Yunanistan, İngiltere garantör) → 1963 **Kanlı Noel** saldırıları.\n- **1974:** Yunan cuntası destekli darbe (Enosis girişimi) üzerine Türkiye garantörlük hakkıyla **Kıbrıs Barış Harekâtı** düzenledi.\n- **1983:** **Kuzey Kıbrıs Türk Cumhuriyeti (KKTC)**; Rauf Denktaş. **2004 Annan Planı**: Türkler \"evet\", Rumlar \"hayır\" dedi; Rum kesimi AB'ye üye oldu.\n- Doğu Akdeniz'de **enerji kaynakları ve deniz yetki alanları** tartışması.\n\n# Kafkasya ve Türk Dünyası\n\n- SSCB'nin dağılmasıyla (1991) bağımsızlığını kazanan Türk cumhuriyetlerini **ilk tanıyan** Türkiye oldu; **TİKA** (1992), **Türk Devletleri Teşkilatı** (2021).\n- **Karabağ:** Ermenistan işgali (1990'lar) → **2020'de Azerbaycan** topraklarının büyük bölümünü geri aldı.\n- Bakü–Tiflis–Ceyhan petrol boru hattı (2006), TANAP.\n\n# Orta Doğu\n\nKörfez Savaşı (1991), Irak'ın işgali (2003), **Suriye iç savaşı** (2011 sonrası) ve **göç** meselesi; terörle mücadele.",
     "ornekler": [
      {
       "soru": "Türkiye 1974'te Kıbrıs'a hangi hukuki dayanakla müdahale etmiştir?",
       "cozum": "**1960 Garanti Antlaşması**'ndan doğan **garantörlük hakkı**; Yunanistan destekli darbe adayı Yunanistan'a bağlama (Enosis) amacı taşıyordu."
      },
      {
       "soru": "Türkiye'nin Ege'de karasularının 12 mile çıkarılmasına karşı çıkmasının nedeni nedir?",
       "cozum": "Ege'nin yarı kapalı bir deniz olması ve çok sayıda Yunan adası nedeniyle 12 mil uygulaması Türkiye'nin **açık denize çıkışını** ve uluslararası sularını büyük ölçüde engeller; TBMM bunu **savaş sebebi** saymıştır."
      }
     ],
     "ozet": [
      "Ege: karasuları, kıta sahanlığı, hava sahası, adaların silahlandırılması.",
      "Kıbrıs: 1974 Barış Harekâtı, 1983 KKTC, 2004 Annan Planı.",
      "Türk cumhuriyetlerini ilk tanıyan Türkiye; Karabağ 2020."
     ]
    }
   }
  ]
 }
];
