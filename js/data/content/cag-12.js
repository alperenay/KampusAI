/* =========================================================
   12. Sınıf Çağdaş Türk ve Dünya Tarihi — konu anlatım notları (AYT Tarih-2)
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/cagdas"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: 20. Yüzyıl Başlarında Dünya ve İki Savaş Arası Dönem",
   "en": "Unit 1: The World in the Early 20th Century and the Interwar Years"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ÇTD.E1",
    "title": {
     "tr": "Yüzyıl başında dünya ve I. Dünya Savaşı sonrası düzen",
     "en": "The world at the turn of the century and the post-WWI order"
    },
    "content": {
     "anlatim": "# 20. Yüzyıl Başında Dünya\n\n- **Sanayileşmiş Avrupa devletleri** ham madde ve pazar için yarışıyordu (**sömürgecilik / emperyalizm**). İngiltere ve Fransa geniş sömürge imparatorluklarına sahipti; geç birleşen **Almanya ve İtalya** paylaşımda geride kalmıştı.\n- Bloklaşma: **İtilaf** (İngiltere, Fransa, Rusya) ve **İttifak** (Almanya, Avusturya-Macaristan, İtalya) devletleri. Silahlanma yarışı ve milliyetçilik I. Dünya Savaşı'na zemin hazırladı.\n\n# I. Dünya Savaşı'nın Sonuçları (Dünya Ölçeğinde)\n\n- **Osmanlı, Avusturya-Macaristan, Alman ve Rus imparatorlukları** yıkıldı; Orta ve Doğu Avrupa'da yeni ulus devletler kuruldu.\n- **1917 Bolşevik İhtilali** ile Rusya'da sosyalist rejim kuruldu, 1922'de **SSCB** oluştu.\n- Barışı korumak için **Milletler Cemiyeti** (1920) kuruldu; ancak ABD katılmadı, yaptırım gücü zayıftı.\n- Almanya'ya ağır şartlar içeren **Versay Antlaşması** imzalatıldı; bu durum ileride intikam duygusunu ve yeni bir savaşı besledi.\n- Orta Doğu'da **manda yönetimleri** kuruldu (Suriye ve Lübnan Fransa'ya; Irak, Ürdün ve Filistin İngiltere'ye).",
     "ornekler": [
      {
       "soru": "Versay Antlaşması'nın II. Dünya Savaşı'na giden süreçteki etkisi nedir?",
       "cozum": "Almanya'ya ağır toprak kaybı, savaş tazminatı ve ordu sınırlaması getirdiği için Alman toplumunda **intikam duygusu** ve ekonomik sıkıntı doğdu; bu ortam **Nazizmin** yükselmesini kolaylaştırdı."
      },
      {
       "soru": "Milletler Cemiyeti barışı korumada neden başarısız oldu?",
       "cozum": "**ABD'nin katılmaması**, büyük devletlerin çekilmesi ve kararlarını uygulatacak **askerî yaptırım gücünün olmaması** nedeniyle."
      }
     ],
     "ozet": [
      "Emperyalist rekabet ve bloklaşma I. Dünya Savaşı'na yol açtı.",
      "Savaş sonunda dört imparatorluk yıkıldı; 1917 Bolşevik İhtilali ile SSCB doğdu.",
      "Milletler Cemiyeti 1920'de kuruldu ama yaptırım gücü zayıftı.",
      "Versay'ın ağır şartları yeni bir savaşın zeminini hazırladı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "ÇTD.E2",
    "title": {
     "tr": "1929 Dünya Ekonomik Buhranı ve totaliter rejimler",
     "en": "The 1929 Great Depression and totalitarian regimes"
    },
    "content": {
     "anlatim": "# 1929 Dünya Ekonomik Buhranı\n\n- **Ekim 1929**'da New York Borsası'nın çöküşüyle başladı. Aşırı üretim, kredili spekülasyon ve tüketimin daralması nedenlerdir.\n- Sonuçlar: iflaslar, kitlesel **işsizlik**, dünya ticaretinin daralması, korumacılık. ABD'de devletin ekonomiye müdahalesini öngören **New Deal** politikası uygulandı (Roosevelt; Keynes'in görüşleri).\n- **Türkiye'ye etkisi:** Tarım ürünleri fiyatları düştü; Türkiye **devletçilik** ilkesini benimseyerek planlı sanayileşmeye geçti (**Birinci Beş Yıllık Sanayi Planı**, 1934).\n\n# Totaliter Rejimler\n\nBuhran ve savaş sonrası hayal kırıklığı demokrasilere güveni sarstı; tek partili, lider merkezli ve baskıcı rejimler güç kazandı.\n| Ülke | Rejim | Lider |\n|---|---|---|\n| İtalya | **Faşizm** (1922'den itibaren) | Mussolini |\n| Almanya | **Nazizm** (Nasyonal Sosyalizm, 1933'ten itibaren) | Hitler |\n| SSCB | **Komünist** tek parti diktatörlüğü | Stalin |\n| Japonya | **Militarizm** (yayılmacı askerî yönetim) | — |\n\n# Yayılmacı Hareketler\n\nJaponya'nın **Mançurya**'yı işgali (1931), İtalya'nın **Habeşistan**'ı işgali (1935) ve Almanya'nın Avusturya'yı ilhakı, Milletler Cemiyeti'nin zayıflığını gösterdi. İngiltere ve Fransa'nın savaşı önlemek için Almanya'ya verdiği tavizler (**yatıştırma politikası**, Münih Konferansı 1938) sonuçsuz kaldı.",
     "ornekler": [
      {
       "soru": "1929 Buhranı Türkiye'nin ekonomi politikasını nasıl etkiledi?",
       "cozum": "Özel sermayenin yetersiz kaldığı görülünce **devletçilik** benimsendi; devlet eliyle fabrikalar kuruldu ve **Birinci Beş Yıllık Sanayi Planı** (1934) uygulandı."
      },
      {
       "soru": "Japonya'nın Mançurya'yı ve İtalya'nın Habeşistan'ı işgal etmesi neyi göstermiştir?",
       "cozum": "**Milletler Cemiyeti'nin** saldırganlığı durdurmakta **etkisiz** kaldığını ve yayılmacı devletlerin cesaretlendiğini."
      }
     ],
     "ozet": [
      "1929 Buhranı New York Borsası'nın çöküşüyle başladı; işsizlik ve korumacılık arttı.",
      "Türkiye buhrana devletçilik ve planlı sanayileşmeyle karşılık verdi.",
      "İtalya'da faşizm, Almanya'da Nazizm, SSCB'de Stalin rejimi, Japonya'da militarizm.",
      "Yatıştırma politikası (Münih 1938) savaşı önleyemedi."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: II. Dünya Savaşı",
   "en": "Unit 2: World War II"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ÇTD.E3",
    "title": {
     "tr": "II. Dünya Savaşı: nedenleri, gelişimi ve sonuçları",
     "en": "World War II: causes, course and consequences"
    },
    "content": {
     "anlatim": "# Nedenleri\n\nVersay'ın ağır koşulları, 1929 Buhranı, totaliter rejimlerin yayılmacılığı ve Milletler Cemiyeti'nin etkisizliği. Savaşı başlatan olay Almanya'nın **1 Eylül 1939**'da **Polonya**'ya saldırmasıdır (önce SSCB ile saldırmazlık paktı imzalamıştı).\n\n# Cepheler ve Gelişmeler\n\n- **Mihver devletleri:** Almanya, İtalya, Japonya. **Müttefikler:** İngiltere, Fransa, sonra SSCB ve ABD.\n- Almanya 1940'ta Fransa'yı işgal etti; 1941'de **SSCB'ye saldırdı**.\n- Japonya'nın **Pearl Harbor** baskını (Aralık 1941) ABD'yi savaşa soktu.\n- Dönüm noktaları: **Stalingrad** (Alman ilerleyişinin durdurulması), **Normandiya çıkarması** (6 Haziran 1944).\n- Almanya Mayıs 1945'te teslim oldu. ABD'nin **Hiroşima ve Nagazaki**'ye atom bombası atmasıyla Japonya Ağustos 1945'te teslim oldu.\n- **Holokost:** Nazi Almanyası'nın milyonlarca Yahudiyi ve diğer grupları sistemli olarak yok etmesi; insanlık tarihinin en büyük soykırımlarından biridir.\n\n# Sonuçları\n\n- Tarihin en çok can kaybına yol açan savaşı oldu.\n- **Birleşmiş Milletler** (1945) kuruldu; Güvenlik Konseyi'nde ABD, SSCB, İngiltere, Fransa ve Çin **veto** hakkı aldı. **İnsan Hakları Evrensel Beyannamesi** (1948) kabul edildi.\n- Almanya dört işgal bölgesine ayrıldı, ardından ikiye bölündü. Avrupa'nın gücü azaldı; **ABD ve SSCB** iki süper güç olarak öne çıktı → **Soğuk Savaş**.\n- Sömürgelerde bağımsızlık hareketleri hızlandı.",
     "ornekler": [
      {
       "soru": "II. Dünya Savaşı sonrasında kurulan uluslararası örgüt hangisidir? Milletler Cemiyeti'nden önemli bir farkı nedir?",
       "cozum": "**Birleşmiş Milletler (BM, 1945)**. Güvenlik Konseyi'nin bağlayıcı kararları ve süper güçlerin üyeliği sayesinde daha güçlü bir yapıya sahiptir (ancak daimi üyelerin **veto** hakkı kararları kilitleyebilir)."
      },
      {
       "soru": "ABD'yi savaşa sokan olay nedir?",
       "cozum": "Japonya'nın **Pearl Harbor** baskını (7 Aralık 1941)."
      }
     ],
     "ozet": [
      "Savaş 1 Eylül 1939'da Almanya'nın Polonya'ya saldırmasıyla başladı.",
      "Pearl Harbor ABD'yi savaşa soktu; Stalingrad ve Normandiya dönüm noktalarıdır.",
      "Savaş 1945'te Almanya'nın ve atom bombalarının ardından Japonya'nın teslimiyetiyle bitti.",
      "BM kuruldu; ABD ve SSCB süper güç oldu, Soğuk Savaş başladı."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Soğuk Savaş ve Yumuşama Dönemi (1945–1990)",
   "en": "Unit 3: The Cold War and Détente (1945–1990)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ÇTD.E4",
    "title": {
     "tr": "Soğuk Savaş: bloklar, krizler ve dekolonizasyon",
     "en": "The Cold War: blocs, crises and decolonisation"
    },
    "content": {
     "anlatim": "# Soğuk Savaş Nedir?\n\nABD liderliğindeki **Batı (kapitalist) blok** ile SSCB liderliğindeki **Doğu (sosyalist) blok** arasında, doğrudan savaşa dönüşmeyen; ideolojik, ekonomik, askerî ve teknolojik rekabettir.\n\n# Bloklaşma\n\n| Batı Bloku | Doğu Bloku |\n|---|---|\n| **Truman Doktrini** (1947), **Marshall Planı** (Avrupa'ya ekonomik yardım) | **Molotov Planı**, **COMECON** (ekonomik iş birliği) |\n| **NATO** (1949) — Türkiye 1952'de üye oldu | **Varşova Paktı** (1955) |\n- **Berlin Duvarı** (1961) iki bloğun bölünmüşlüğünün simgesi oldu.\n\n# Başlıca Krizler ve Çatışmalar\n\n- **Kore Savaşı** (1950–1953): Türkiye BM kararıyla asker gönderdi; bu, NATO üyeliğini kolaylaştırdı.\n- **Küba Füze Krizi** (1962): Dünya nükleer savaşın eşiğine geldi; çözümde ABD'nin Türkiye'deki **Jüpiter füzelerini** de çekmesi gündeme geldi.\n- **Vietnam Savaşı** (1955–1975), uzay ve silahlanma yarışı (**Sputnik** 1957, Ay'a iniş 1969).\n\n# Dekolonizasyon ve Bağlantısızlar\n\nSavaştan sonra Asya ve Afrika'daki sömürgeler bağımsızlıklarını kazandı (Hindistan 1947, Cezayir 1962 vb.). İki bloğa da katılmayan ülkeler **Bağlantısızlar Hareketi**'ni kurdu (Bandung 1955).\n\n# Yumuşama (Detant) Dönemi\n\n1960'ların sonundan itibaren nükleer felaket korkusuyla gerginlik azaltıldı: **SALT** silah sınırlama antlaşmaları, **Helsinki Nihai Senedi** (1975). 1979'da SSCB'nin Afganistan'ı işgaliyle gerginlik yeniden arttı.",
     "ornekler": [
      {
       "soru": "Türkiye'nin Kore Savaşı'na asker göndermesinin dış politikadaki sonucu nedir?",
       "cozum": "Batı blokuna bağlılığını göstermiş ve **1952'de NATO'ya** üye olmasını kolaylaştırmıştır."
      },
      {
       "soru": "Marshall Planı'nın amacı neydi?",
       "cozum": "Savaşın yıktığı Avrupa ekonomilerini ABD yardımıyla kalkındırarak bu ülkelerde **komünizmin yayılmasını önlemek**."
      }
     ],
     "ozet": [
      "Soğuk Savaş: ABD ve SSCB blokları arasındaki doğrudan savaşa dönüşmeyen rekabet.",
      "Batı: Truman Doktrini, Marshall Planı, NATO; Doğu: COMECON, Varşova Paktı.",
      "Kore Savaşı, Küba Füze Krizi, Vietnam ve uzay yarışı başlıca olaylardır.",
      "Dekolonizasyonla yeni devletler doğdu; Bağlantısızlar Hareketi kuruldu.",
      "Yumuşama: SALT ve Helsinki Nihai Senedi."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Küreselleşen Dünya",
   "en": "Unit 4: A Globalising World"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ÇTD.E5",
    "title": {
     "tr": "Soğuk Savaş'ın sonu ve küreselleşen dünya",
     "en": "The end of the Cold War and a globalising world"
    },
    "content": {
     "anlatim": "# Soğuk Savaş'ın Sona Ermesi\n\n- SSCB'de **Gorbaçov**'un **glasnost** (açıklık) ve **perestroyka** (yeniden yapılanma) politikaları ekonomik ve siyasi dönüşümü başlattı.\n- **Berlin Duvarı 1989**'da yıkıldı; Almanya **1990**'da birleşti.\n- **SSCB 1991**'de dağıldı; Orta Asya ve Kafkasya'da bağımsız Türk cumhuriyetleri doğdu (Azerbaycan, Kazakistan, Kırgızistan, Özbekistan, Türkmenistan). Türkiye bu devletleri ilk tanıyan ülke oldu.\n- **Yugoslavya'nın dağılması** sürecinde **Bosna-Hersek** savaşı (1992–1995) ve **Srebrenitsa soykırımı** yaşandı.\n\n# Yeni Dünya Düzeni ve Bölgesel Sorunlar\n\n- **Körfez Savaşı** (1991), Kafkasya'daki çatışmalar ve Orta Doğu sorunları.\n- **11 Eylül 2001** saldırıları ve sonrasında Afganistan ve Irak müdahaleleri, küresel terörle mücadele kavramını öne çıkardı.\n\n# Küreselleşme ve Bölgesel Birlikler\n\n- **Avrupa Birliği** (1993, Maastricht) ekonomik ve siyasi bütünleşmeyi derinleştirdi; Türkiye 1999'da aday ülke oldu.\n- **Dünya Ticaret Örgütü** (1995), **İslam İşbirliği Teşkilatı**, **Türk Devletleri Teşkilatı** gibi örgütler.\n- İnternet ve bilgi teknolojileri iletişimi ve ekonomiyi dönüştürdü; küresel ekonomik krizler (2008) ve **küresel ısınma**, salgın hastalıklar gibi sorunlar ortak çözüm ihtiyacını artırdı.",
     "ornekler": [
      {
       "soru": "SSCB'nin dağılması Türkiye'nin dış politikasına hangi yeni alanı açtı?",
       "cozum": "Orta Asya ve Kafkasya'da kurulan **bağımsız Türk cumhuriyetleriyle** siyasi, ekonomik ve kültürel iş birliği alanı açıldı."
      },
      {
       "soru": "Glasnost ve perestroyka hangi ülkede, kimin döneminde uygulandı?",
       "cozum": "**SSCB**'de, **Mihail Gorbaçov** döneminde."
      }
     ],
     "ozet": [
      "Gorbaçov'un reformları, Berlin Duvarı'nın yıkılışı (1989) ve SSCB'nin dağılması (1991) Soğuk Savaş'ı bitirdi.",
      "Bağımsız Türk cumhuriyetleri kuruldu; Türkiye ilk tanıyan ülke oldu.",
      "Yugoslavya'nın dağılmasında Bosna savaşı ve Srebrenitsa soykırımı yaşandı.",
      "AB, DTÖ gibi örgütler ve internet küreselleşmeyi hızlandırdı."
     ]
    }
   }
  ]
 }
];
