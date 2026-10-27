/* =========================================================
   10. Sınıf Türk Dili ve Edebiyatı — ders notları ve kazanım analizi
   Kaynak: kullanıcının verdiği "10. Sınıf Türk Dili ve Edebiyatı Kapsamlı Ders Notları ve Kazanım Analizi" (4 tema).
   Kaynaktaki bazı bilgiler düzeltildi (Dede Korkut: giriş + 12 hikâye; kaside 33–99 beyit). Tablolar ve örnek sorular eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/edebiyat"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Sözün Ezgisi",
   "en": "Theme 1: The Melody of Words"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Şiir ve ahenk unsurları",
     "en": "Poetry and elements of harmony"
    },
    "content": {
     "anlatim": "# Temanın Odağı\n\nSözlü kültür ürünlerinden hareketle dilin **zenginliği ve ahengini** keşfetmek; **söz ile müzik** arasındaki ilişkiyi kavramak.\n\n**Anahtar kavramlar:** ahenk, sözlü kültür, kurmaca, ritim, anonim, ezgi, gelenek, varyant, masal anlatıcısı, olağanüstülük, yapı unsurları.\n\n# Şiir\n\nSemboller, çağrışımlar, ritimli sözler ve seslerin ahenkli kullanımıyla oluşan edebî tür; günlük dilden farklı, **imge ve çağrışım** yüklü bir dil kullanır.\n\n# Ahenk Unsurları\n\n| Unsur | Açıklama |\n|---|---|\n| **Ahenk** | Dize, kelime, hece ve seslerin belirli düzen içinde uyumu |\n| **Kafiye (uyak)** | Dize sonlarında benzeşen sesler: yarım (1 ses), tam (2), zengin (3+), cinaslı |\n| **Redif** | Dize sonlarında tekrarlanan, **görevi ve anlamı aynı** ek ya da sözcük |\n| **Ölçü** | **Hece ölçüsü** (hece sayısı denkliği), **aruz ölçüsü** (hece değeri: açık–kapalı hece denkliği) |\n| **Diğer** | Ses tekrarları (aliterasyon, asonans), söz tekrarları, ritim |",
     "ornekler": [
      {
       "soru": "\"Gönül ne çıkarsın yüce dağlara / Yol vermez ki karlı dağlar\" gibi bir dizede ahengi sağlayan unsurları nasıl bulursunuz?",
       "cozum": "Önce dize sonlarındaki tekrar eden ek/sözcükleri (**redif**) ayırırsınız; kalan ses benzerliği **kafiye**dir. Hece sayılarını sayarak **ölçüyü** (ör. 11'li hece), varsa ses tekrarlarını belirlersiniz."
      },
      {
       "soru": "Aşağıdaki dizelerde ahengi sağlayan kafiye ve redifi bulunuz:\\n\"Bahar geldi, dağlar yeşil giyindi / Dereler coşup ovaya indi\" (özgün örnek)",
       "cozum": "Dize sonlarında **giyin-di / in-di**. \"-di\" **ek hâlindeki redif**tir (aynı görevli ek). Redifin önündeki **\"-in\"** sesleri **yarım kafiye** değil, iki ses benzerliği olduğundan **tam kafiye**dir. Ayrıca \"d\" sesinin tekrarı (**aliterasyon**) ahengi güçlendirir."
      }
     ],
     "ozet": [
      "Ahenk: kafiye, redif, ölçü, ses ve söz tekrarları.",
      "Önce redif ayrılır, sonra kafiye bulunur.",
      "Hece: sayı; aruz: açık-kapalı hece."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Koşuk ve Türkçenin tarihî seyri",
     "en": "The koşuk and the historical development of Turkish"
    },
    "content": {
     "anlatim": "# Koşuk (İslamiyet Öncesi Dönem)\n\n**Toylarda** (şenlik, ziyafet) ya da savaş sonrası eğlencelerde **ozan, kam, baksı** adı verilen şairlerin **kopuz** eşliğinde söylediği şiirlerdir.\n\n| Özellik | Bilgi |\n|---|---|\n| **Konu** | Aşk, doğa, yiğitlik |\n| **Nazım birimi** | Dörtlük |\n| **Ölçü** | Hece (genellikle 7'li, 8'li, 11'li) |\n| **Kafiye düzeni** | aaab, cccb, dddb… |\n| **Karşılığı** | Halk edebiyatında **koşma** |\n\n> İslamiyet öncesi diğer türler: **sagu** (yas şiiri, ağıt), **sav** (atasözü).\n\n# Dilin Tarihî Seyri\n\nKelimeler zamanla **şekil ve anlam** yönünden değişir:\n- **yaşıl → yeşil** (ses değişimi, anlam korunmuş)\n- **edgü** (Orhun) → **eygü** (XIV. yy.) → **eyü** (XVIII. yy.) → **iyi** (XX. yy.)\n\nBu değişimler göçler, inanç değişiklikleri ve kültürlerarası etkileşimle ilişkilidir.",
     "ornekler": [
      {
       "soru": "Koşuk ile koşma arasındaki ilişki nedir?",
       "cozum": "İkisi de dörtlüklerle, hece ölçüsüyle yazılır ve aşk, doğa, yiğitlik işler. Koşuk İslamiyet öncesi dönemin, **koşma** ise halk edebiyatının (âşık tarzı) karşılığıdır."
      },
      {
       "soru": "Türk dilinin tarihî dönemlerini sırasıyla yazınız. Koşuklar hangi dönemin ürünüdür?",
       "cozum": "**Altay Dönemi → En Eski Türkçe → İlk Türkçe → Eski Türkçe** (Göktürk ve Uygur) → **Orta Türkçe** (Karahanlı, Harezm, Kıpçak) → **Yeni Türkçe** (Eski Anadolu Türkçesi, Osmanlı Türkçesi, Türkiye Türkçesi). Koşuklar **İslamiyet öncesi** sözlü geleneğin ürünüdür; örnekleri **Divanü Lügati't-Türk**'te (Karahanlı Türkçesi) yazıya geçirilmiştir."
      }
     ],
     "ozet": [
      "Koşuk: toy, kopuz, dörtlük, aaab cccb.",
      "Sagu ağıt, sav atasözüdür.",
      "edgü → iyi: ses yapısı sadeleşmiş."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Türkü ve varyantlaşma",
     "en": "The türkü and variants"
    },
    "content": {
     "anlatim": "# Türkü\n\nHece ölçüsünün genellikle **7, 8 ve 11'li** kalıplarıyla, bir **ezgi** eşliğinde söylenen **anonim** halk edebiyatı nazım biçimi. Günümüzde söyleyeni bilinen türküler de vardır. Okuma metni: **\"Turnalar\"**.\n\n| Bölüm | Açıklama |\n|---|---|\n| **Bent** | Asıl konunun işlendiği bölüm |\n| **Kavuştak (bağlama)** | Bentlerin sonunda tekrarlanan dize(ler) |\n\n### Türkü türleri (konuya göre)\n\nAğıt, kına türküsü, iş türküsü, askerlik türküsü, ninni…\n\n# Yayılma ve Varyant\n\nTürküler kervanlar, gezgin âşıklar, askerler, savaş ve göçlerle taşınır. Ağızdan ağıza yayılırken anlatıcıya göre değişir.\n- **Varyant:** Aslına göre farklılık gösteren benzer metinler. Masal, destan, mâni ve türkülerde görülür.",
     "ornekler": [
      {
       "soru": "Aynı türkünün farklı yörelerde farklı sözlerle söylenmesi nasıl açıklanır?",
       "cozum": "Türkü **anonimdir** ve **sözlü** aktarılır; her anlatıcı ve yöre küçük değişiklikler yapar. Bu farklı biçimlere **varyant** denir."
      },
      {
       "soru": "Türkülerin \"bağlama\" ve \"kavuştak\" bölümleri nedir? Türkü ile mani arasındaki temel farkı yazınız.",
       "cozum": "Türkü **bent** (asıl söz bölümü) ve **bağlama/kavuştak** (her bentten sonra tekrarlanan nakarat) bölümlerinden oluşur. Türküler **bir ezgiyle** söylenmek için yazılır ve anonimdir; **mani** ise genellikle 7 heceli **dört dizelik** tek bir birimdir, söyleyeni çoğu zaman bilinmez ve kendi başına tamamlanmış bir duygu ya da düşünce aktarır."
      }
     ],
     "ozet": [
      "Türkü: anonim, ezgili, hece ölçülü.",
      "Bent + kavuştak (bağlama).",
      "Varyant: sözlü aktarımda oluşan farklı biçim."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Masal; edebî ve öğretici metinler",
     "en": "The folk tale; literary and informative texts"
    },
    "content": {
     "anlatim": "# Masal\n\nKahramanları **insan, hayvan ve olağanüstü varlıklar** olan; olayları **hayalî**; **zaman ve mekânı belirsiz**; dinleyeni eğlendirirken eğitmeyi amaçlayan tür.\n\n| Bölüm | İşlevi |\n|---|---|\n| **Döşeme** | Dinleyiciyi hazırlayan kalıplaşmış **tekerleme** (\"Evvel zaman içinde…\") |\n| **Serim** | Olay, kişi, zaman ve mekânın tanıtılması |\n| **Düğüm** | Olay ve çatışmaların derinleşmesi |\n| **Çözüm** | Olayların sonuca ulaşması |\n| **Dilek** | Kapanış tekerlemesi (\"Onlar ermiş muradına…\") |\n\n# Edebî ve Öğretici Metin\n\n| Edebî (sanatsal) | Öğretici |\n|---|---|\n| Kurmaca; estetik zevk verir | Gerçekliğe dayanır; bilgi verir |\n| Masal, şiir, hikâye, roman | Gezi yazısı, makale, rapor |\n\n# Masalı Okurken Dikkat Edilecekler\n\n- **Olağanüstülük:** Konuşan hayvanlar, devler, periler, sihirli nesneler; masal dünyasında **inandırıcılık** aranmaz.\n- **Kalıp ifadeler ve sayılar:** \"Üç\", \"yedi\", \"kırk\" gibi sayılar ve tekrar eden tekerlemeler sözlü geleneğin izleridir.\n- **İyi–kötü çatışması:** Masallarda iyiler ödüllendirilir, kötüler cezalandırılır; **mutlu son** yaygındır.\n- **Derleyiciler:** Türk masallarını Pertev Naili Boratav ve Eflatun Cem Güney derlemiş; Batı'da Grimm Kardeşler ve Andersen öne çıkmıştır.",
     "ornekler": [
      {
       "soru": "Masallar hangi metin grubuna girer, neden?",
       "cozum": "**Edebî (sanatsal) metin.** Tamamen kurmacadır, olağanüstü ögeler içerir ve estetik zevk vermeyi amaçlar."
      },
      {
       "soru": "Bir masalın giriş tekerlemesinde \"Evvel zaman içinde, kalbur saman içinde...\" denmesinin işlevi nedir?",
       "cozum": "Bu bölüm **döşeme**dir: Dinleyiciyi **masal dünyasına hazırlar**, olayların gerçek bir zamanda değil, **belirsiz ve hayalî** bir zamanda geçtiğini sezdirir. Kalıplaşmış, ses oyunlarına dayalı söyleyişi dinleyicinin ilgisini çeker."
      }
     ],
     "ozet": [
      "Masal: zaman-mekân belirsiz, olağanüstü kahramanlar.",
      "Döşeme → serim → düğüm → çözüm → dilek.",
      "Edebî metin kurmaca, öğretici metin gerçek."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "İsim, sıfat ve tamlamalar (isim ve sıfat tamlaması)",
     "en": "Nouns, adjectives and noun/adjective phrases"
    },
    "content": {
     "anlatim": "# İsim (Ad)\n\nVarlıkları, kavramları karşılayan kelimelerdir.\n| Ölçüt | Türler | Örnek |\n|---|---|---|\n| Varlıklara verilişi | **Özel / cins** | Ankara, Kızılırmak / şehir, ırmak |\n| Varlıkların niteliği | **Somut / soyut** | kalem, rüzgâr / sevgi, özlem |\n| Sayısı | **Tekil / çoğul / topluluk** | ağaç / ağaçlar / orman, ordu |\n| Yapısı | **Basit / türemiş / birleşik** | göz / gözlük / Kuşadası |\n\n# Sıfat (Ön Ad)\n\nİsimlerden önce gelerek onları **niteleyen** ya da **belirten** kelimelerdir.\n- **Niteleme sıfatı:** *kırmızı* elma, *yorgun* yolcu (\"nasıl?\" sorusuna cevap)\n- **Belirtme sıfatları:** **İşaret** (*bu* ev), **sayı** (*üç* kitap, *ikinci* sıra, *yarım* ekmek, *üçer* elma), **belgisiz** (*bazı* insanlar, *her* gün), **soru** (*hangi* yol?)\n- Sıfat, isimden sonra gelirse **sıfat olmaktan çıkar**: \"Elma *kırmızı*.\" (yüklem)\n- Sıfatlar **isim yerine** kullanılırsa **adlaşmış sıfat** olur: \"*Gençler* geldi.\"\n\n# İsim Tamlaması\n\nİki ya da daha çok ismin anlam ilgisi kurarak oluşturduğu kelime grubu (**tamlayan + tamlanan**):\n| Tür | Yapı | Örnek |\n|---|---|---|\n| **Belirtili** | -ın + -ı | *kapının* kolu |\n| **Belirtisiz** | Ø + -ı | *kapı* kolu |\n| **Takısız** | Ø + Ø | *demir* kapı (malzeme) |\n| **Zincirleme** | En az üç isim | *evin bahçe kapısı* |\n\n# Sıfat Tamlaması\n\nSıfat + isim: *uzun* yol, *bu* şehir, *beş* kardeş. Sıfat tamlaması, isim tamlamasının unsuru olabilir: \"*eski evin* kapısı\".\n\n# Edebî Metinde İşlevi\n\nNiteleme sıfatları ve tamlamalar şiirde **imge** ve **betimleme** kurmanın temel araçlarıdır: \"*mavi* deniz\" yerine \"*denizin* hüzünlü *maviliği*\" ifadesi anlatımı derinleştirir.",
     "ornekler": [
      {
       "soru": "\"Köyün eski çeşmesinden akan buz gibi su, yorgun yolculara can verdi.\" cümlesindeki tamlamaları ve türlerini bulunuz.",
       "cozum": "**\"köyün çeşmesi\"** → belirtili isim tamlaması (araya sıfat girmiş: köyün **eski** çeşmesi). **\"eski çeşme\"** → sıfat tamlaması. **\"buz gibi su\"** → sıfat tamlaması (buz gibi: niteleme sıfatı görevli söz öbeği). **\"yorgun yolcular\"** → sıfat tamlaması."
      },
      {
       "soru": "\"Bazı öğrenciler ikinci sınavda üçer soru çözdü.\" cümlesindeki sıfatları türleriyle belirtiniz.",
       "cozum": "**bazı** → belgisiz sıfat; **ikinci** → sıra sayı sıfatı; **üçer** → üleştirme sayı sıfatı. Cümlede niteleme sıfatı yoktur; tümü **belirtme sıfatıdır**."
      }
     ],
     "ozet": [
      "İsimler özel–cins, somut–soyut, tekil–çoğul–topluluk ve yapıca basit–türemiş–birleşik olarak ayrılır.",
      "Sıfatlar niteleme ve belirtme (işaret, sayı, belgisiz, soru) sıfatlarıdır.",
      "İsim tamlaması: belirtili, belirtisiz, takısız, zincirleme; sıfat tamlaması: sıfat + isim.",
      "Sıfat ve tamlamalar edebî metinlerde betimleme ve imge oluşturur."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "Dinleme/izleme ve sözlü sunum: şiir dinletisi ve film şeridi",
     "en": "Listening/viewing and oral presentation: poetry recital and filmstrip"
    },
    "content": {
     "anlatim": "# Şiir Dinletisi\n\nŞiirin **sesli ve etkili okunarak** dinleyiciye ulaştırıldığı etkinliktir. Şiir, ahenk unsurlarıyla yazıldığı için ancak **sesli okununca** tam etkisini gösterir.\n\n**Hazırlık ve sunum:**\n1. Şiiri birkaç kez oku; **anlamını ve duygusunu** kavra.\n2. **Vurgu, tonlama ve duraklama** yerlerini işaretle (dize sonu her zaman durak değildir!).\n3. Sesin **hızını ve şiddetini** şiirin duygusuna göre ayarla: coşkulu bir şiir yüksek ve hızlı, hüzünlü bir şiir yavaş ve alçak tonda okunur.\n4. **Beden dili:** Dik duruş, göz teması, doğal jest ve mimikler.\n5. Gerekirse şiirin ruhuna uygun **fon müziği** kullan; müzik sesi bastırmamalıdır.\n\n# Film Şeridi (Kısa Film/Video) İzleme\n\nFilm şeridi, görüntü, ses, müzik ve yazının birlikte kullanıldığı **çok modlu** bir metindir. İzlerken:\n- **Konu ve ana fikri** belirle; görüntülerin hangi duyguyu uyandırdığını düşün.\n- **Kamera açıları** (yakın plan duyguyu, geniş plan mekânı öne çıkarır), **renk ve ışık**, **müzik** anlamı nasıl destekliyor?\n- Not al; izledikten sonra **özet** çıkar ve görüşünü gerekçeleriyle paylaş.\n\n# Kendi Film Şeridini Hazırla\n\nBir şiir ya da türkünün anlattığı duyguyu **görsellerle** anlatan 1–2 dakikalık bir video tasarla: **senaryo (sahne listesi) → görsel ve ses seçimi → kurgu → altyazı → paylaşım**. Kullanılan görsel ve müziklerin **telif ve kaynak** bilgisine dikkat et; mümkünse kendi çektiğin görüntüleri kullan.",
     "ornekler": [
      {
       "soru": "Bir arkadaşınız şiiri her dize sonunda durarak ve tek düze bir sesle okuyor. Ona hangi önerilerde bulunursunuz?",
       "cozum": "1) Anlam dize sonunda bitmiyorsa **durmadan bir sonraki dizeye geçmesini** (anlam bütünlüğüne göre duraklama), 2) önemli kelimeleri **vurgulamasını**, 3) şiirin duygusuna göre sesini **yükseltip alçaltmasını** ve hızını değiştirmesini (tonlama), 4) göz teması ve doğal jestlerle **dinleyiciyle bağ kurmasını** öneririm."
      },
      {
       "soru": "Bir kısa filmde kahramanın yüzü yakın planda, gri ve soluk renklerle gösteriliyor; arka planda yavaş bir piyano ezgisi çalıyor. Bu tercihler izleyicide nasıl bir etki bırakır?",
       "cozum": "**Yakın plan** izleyicinin kahramanın **duygusuna odaklanmasını** sağlar; **gri–soluk renkler** ve **yavaş ezgi** hüzün, yalnızlık ya da kayıp duygusu uyandırır. Çok modlu metinde görüntü, renk ve müzik **aynı anlamı birlikte** kurar."
      }
     ],
     "ozet": [
      "Şiir dinletisinde vurgu, tonlama, duraklama, ses hızı ve beden dili şiirin duygusuna göre ayarlanır.",
      "Dize sonu her zaman durak değildir; anlam bütünlüğüne göre durulur.",
      "Film şeridi çok modlu bir metindir: görüntü, kamera açısı, renk, müzik ve yazı anlamı birlikte kurar.",
      "Kendi videonu hazırlarken senaryo–görsel–kurgu–altyazı adımlarını izle, telif ve kaynağa dikkat et."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Kelimelerin Ritmi",
   "en": "Theme 2: The Rhythm of Words"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Gazel ve aruz ölçüsü — Necâtî Bey",
     "en": "The gazel and aruz meter — Necâtî Bey"
    },
    "content": {
     "anlatim": "# Gazel\n\nDivan edebiyatının en yaygın nazım biçimi.\n\n| Özellik | Bilgi |\n|---|---|\n| **Nazım birimi** | Beyit (genellikle 5–15 beyit) |\n| **Kafiye düzeni** | aa, ba, ca, da… |\n| **Matla** | İlk beyit |\n| **Makta** | Son beyit (şairin **mahlası** geçer) |\n| **Beytülgazel** | En güzel beyit |\n| **Konu** | Aşk, sevgilinin güzelliği, tabiat, tasavvuf |\n\n# Aruz Ölçüsü\n\nHecelerin **uzunluk–kısalık** (açık–kapalı hece) değerine dayanan ölçü; şiire musiki kazandırır.\n\n# Necâtî Bey (XV. yy.)\n\n- Zengin kelime hazinesi, özgün imgeler, **yerli söyleyişler**.\n- **Sade Türkçe** kullanmaya özen; **atasözü ve deyimleri** divan şiirine başarıyla uyarlar.\n- **\"Döne döne\" redifli gazeli** millîleşme eğiliminin ilk güçlü örneklerindendir; pek çok şaire **nazire** yazdırmıştır.\n\n# Divan Şiirinde Aşk\n\nBeşerî aşktan **ilahî aşka** uzanır. **Âşık** çile çeker, cefaya katlanır; **maşuk** (sevgili) ulaşılmaz ve mağrurdur.",
     "ornekler": [
      {
       "soru": "Bir gazelde şairin mahlasının geçtiği beyit hangisidir?",
       "cozum": "Son beyit olan **makta**."
      },
      {
       "soru": "Nazire ne demektir?",
       "cozum": "Bir şairin, beğendiği bir şiire **aynı ölçü, kafiye ve redifle** benzer bir şiir yazmasıdır."
      }
     ],
     "ozet": [
      "Gazel: aa ba ca, 5–15 beyit.",
      "Matla ilk, makta son (mahlas), beytülgazel en güzel beyit.",
      "Necâtî: sade Türkçe, atasözü; \"döne döne\" redifli gazel."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Kaside ve Su Kasîdesi — Fuzûlî",
     "en": "The kaside and the Water Kaside — Fuzûlî"
    },
    "content": {
     "anlatim": "# Kaside\n\nDin ya da devlet büyüklerini övmek ve dinî konuları işlemek için yazılan nazım biçimi. Kafiye düzeni gazel gibidir (aa, ba, ca…); beyit sayısı genellikle **33–99** arasındadır.\n\n| Bölüm | İçerik |\n|---|---|\n| **Nesib / Teşbib** | Giriş, tasvir |\n| **Girizgâh** | Asıl konuya geçiş beyti |\n| **Medhiye** | Övgü |\n| **Fahriye** | Şairin kendini övmesi |\n| **Dua** | Övülen için iyi dilekler |\n\n### Konuya göre kasideler\n\n**Tevhid** (Allah'ın birliği), **münacat** (Allah'a yakarış), **naat** (Hz. Muhammed'e övgü), **methiye** (büyüklere övgü), **hicviye** (yerme).\n\n# Fuzûlî ve Su Kasîdesi\n\n- XVI. yüzyılın en büyük **lirik** şairi; **Azeri Türkçesiyle** yazdı; aşkı **dert ve ıstırap** kaynağı olarak işledi.\n- **Su Kasîdesi** bir **naat**tır: Hz. Muhammed'e duyulan sevgiyi anlatır; **\"su\" redifi** gözyaşı, susuzluğa derman ve aşkın sembolüdür.",
     "ornekler": [
      {
       "soru": "Su Kasîdesi konusu bakımından hangi kaside türüdür?",
       "cozum": "**Naat** — Hz. Muhammed'i övmek için yazılmıştır."
      },
      {
       "soru": "Bir kasidenin bölümlerini sırasıyla yazınız. Su Kasîdesi'nde nesib (teşbib) bölümünün işlevi nedir?",
       "cozum": "**Nesib (teşbib) → girizgâh → methiye → fahriye → tegazzül → dua.** Su Kasîdesi bir **na't** (Hz. Peygamber'e övgü) olduğundan nesib bölümünde **su** redifi etrafında hazırlayıcı bir tablo çizilir; şair gözyaşı, özlem ve su imgeleriyle övgü bölümüne **geçişi hazırlar**."
      }
     ],
     "ozet": [
      "Kaside: övgü, 33–99 beyit; nesib-girizgâh-medhiye-fahriye-dua.",
      "Tevhid, münacat, naat, methiye, hicviye.",
      "Fuzûlî: lirizm, aşk ıstırabı; Su Kasîdesi naat."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Saf şiir — Necip Fazıl ve \"Kaldırımlar\"",
     "en": "Pure poetry — Necip Fazıl and \"Kaldırımlar\""
    },
    "content": {
     "anlatim": "# Saf (Öz) Şiir Anlayışı\n\nOkura **estetik zevk** vermek; **musiki ve biçim güzelliğini** öne çıkarmak. Şiir anlaşılmak için değil, **duyulmak ve hissedilmek** için yazılır.\n\n# Necip Fazıl Kısakürek (1904–1983)\n\n- **\"Kaldırımlar Şairi\"**.\n- Şiirlerinde **metafizik gerilim, yalnızlık, yabancılaşma** ve mistik ögeler hâkimdir.\n- **\"Kaldırımlar\":** şehir insanının yalnızlığı, sokağın karanlığı, ruhsal bunalım; kaldırımlar **kişileştirilmiştir** (çilekeş yalnızların annesi).\n\n# İmge ve Çağrışım\n\n**İmge:** şairin kelimelere yüklediği yeni anlam ve zihinsel görüntüler. \"Kaldırımlar\"da **\"gözüne mil çekilmiş âmâ evler\"**, **\"kül rengi bulutlar\"** güçlü imgelerdir.\n\n# Saf Şiirin Ses ve Biçim Özellikleri\n\nSaf şiirde anlamdan çok **ses uyumu**, **iç ahenk**, **imge** ve **kapalı anlatım** önemlidir. Kelimeler, sözlük anlamlarının ötesinde okurda **çağrışımlar** uyandırmak için seçilir. Bu anlayış Fransız sembolistlerinden (Mallarmé, Valéry) etkilenmiş; Türk şiirinde **Ahmet Haşim**, **Yahya Kemal**, **Ahmet Hamdi Tanpınar** ve **Necip Fazıl** gibi şairlerde farklı biçimlerde görülmüştür.\n\n**Şiir çözümlerken sorulacak sorular:** Şiirin ahengini hangi ses tekrarları sağlıyor? Hangi imgeler okurda hangi duyguyu uyandırıyor? Şiirdeki \"ben\" (şiir kişisi) nasıl bir ruh hâli içinde?",
     "ornekler": [
      {
       "soru": "\"Kaldırımlar, çilekeş yalnızların annesi\" ifadesinde hangi söz sanatı vardır?",
       "cozum": "Kaldırımlara insana ait \"annelik\" özelliği verilmiştir → **teşhis (kişileştirme)**; aynı zamanda bir benzetme (istiare) içerir."
      },
      {
       "soru": "\"Gece, şehri karanlık bir pelerinle örttü.\" (özgün cümle) ifadesindeki imgeyi ve söz sanatını açıklayınız. Bu kullanım saf şiir anlayışına nasıl uyar?",
       "cozum": "Gece **kişileştirilmiş** (teşhis) ve **pelerin** benzetmesiyle (istiare) karanlığın şehri sarışı somut bir görüntüye dönüştürülmüştür. Saf şiir, düşünceyi açıkça söylemek yerine bu tür **imge ve çağrışımlarla** duygu uyandırmayı amaçlar."
      }
     ],
     "ozet": [
      "Saf şiir: musiki ve biçim güzelliği.",
      "Necip Fazıl: metafizik, yalnızlık; \"Kaldırımlar Şairi\".",
      "İmge: zihinde canlanan yeni anlam."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Söyleşi (sohbet)",
     "en": "The causerie (chat essay)"
    },
    "content": {
     "anlatim": "# Söyleşi (Sohbet)\n\nYazarın gündelik olayları ya da kültür-sanat konularını **derinlemesine incelemeden**, okurla **karşılıklı konuşuyormuş gibi** samimi bir dille yazdığı gazete/dergi yazılarıdır.\n\n- Doğal ve akıcı anlatım; üslup kaygısından uzak.\n- Düşünceleri **kanıtlama zorunluluğu yoktur**; sorular sorarak okuru düşündürür.\n- Temsilciler: **Ahmet Rasim**, **Nurullah Ataç**.\n\n| Söyleşi | Deneme | Makale |\n|---|---|---|\n| Okurla konuşur gibi | Kendi kendine konuşur gibi | Kanıtlamaya çalışır |\n| Gündelik konular | Her konu | Bilimsel/ciddi konu |\n\n### Dinleme metni\n\nDivan edebiyatının \"donuk ve hayattan kopuk\" olduğu ön yargısı tartışılır; divan şiirinin sosyal hayatı, sokakları ve esnafı da yansıttığı gösterilir.",
     "ornekler": [
      {
       "soru": "\"Siz hiç sabah ezanıyla uyanıp boğaza karşı çay içtiniz mi? İçmediyseniz bir deneyin derim.\" Bu ifade hangi türe uygundur?",
       "cozum": "**Söyleşi** — okurla doğrudan konuşma, samimi ve gündelik anlatım."
      },
      {
       "soru": "Söyleşi ile deneme arasındaki benzerlik ve farkları yazınız.",
       "cozum": "**Benzerlik:** İkisi de yazarın kişisel görüşlerini **kesin hükümlere varmadan** anlatır; kanıtlama amacı yoktur. **Fark:** Söyleşide yazar okurla **karşısındaymış gibi konuşur**; soru sorar, \"siz\" diye seslenir, dil **daha samimi ve konuşma diline yakındır**. Denemede ise yazar daha çok **kendi kendine düşünür**, üslup daha derli topludur."
      }
     ],
     "ozet": [
      "Söyleşi: okurla sohbet havası, kanıtlama yok.",
      "Ahmet Rasim, Nurullah Ataç.",
      "Deneme kendiyle, söyleşi okurla konuşur."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.5",
    "title": {
     "tr": "Zamir, edat, bağlaç ve ünlem",
     "en": "Pronouns, postpositions, conjunctions and interjections"
    },
    "content": {
     "anlatim": "# Zamir (Adıl)\n\nİsimlerin **yerini tutan** kelimelerdir.\n| Tür | Örnek |\n|---|---|\n| **Kişi zamiri** | ben, sen, o, biz, siz, onlar; **dönüşlülük:** kendi |\n| **İşaret zamiri** | bu, şu, o, bunlar, öteki, beriki |\n| **Belgisiz zamir** | biri, kimi, hepsi, birkaçı, herkes, bazısı |\n| **Soru zamiri** | kim, ne, hangisi, kaçı, nere(si) |\n| **İlgi zamiri** | -ki: \"Benim kalemim kırık, *seninki* sağlam.\" |\n| **İyelik zamiri** | -ım, -ın, -ı… ekleri: kitab*ım* |\n\n**Dikkat:** \"*Bu* kitap\" → işaret **sıfatı** (isimden önce gelir); \"*Bu* benim.\" → işaret **zamiri** (ismin yerini tutar).\n\n# Edat (İlgeç)\n\nTek başına anlamı olmayan, kelimeler arasında **anlam ilgisi** kuran kelimelerdir: *gibi, kadar, için, ile, göre, karşı, doğru, sonra, önce, beri, dolayı, rağmen, üzere, yalnız, ancak*.\n- \"Kar *gibi* beyaz\" (benzetme), \"Sabaha *kadar* çalıştı\" (sınır), \"Senin *için* geldim\" (amaç).\n\n# Bağlaç\n\nKelimeleri, kelime gruplarını ve cümleleri **anlamca birbirine bağlayan** kelimelerdir: *ve, veya, ile, ama, fakat, çünkü, ki, de/da, ya da, hem…hem, ne…ne, ya…ya, ise, oysa, yoksa, ancak, yalnız, madem*.\n- **\"de/da\" bağlacı ayrı yazılır**: \"Sen *de* gel.\" (Ek olan \"-de/-da\" bitişik yazılır: \"Okul*da*.\")\n- **\"ki\" bağlacı ayrı yazılır**: \"Öyle yorgunum *ki*...\"\n\n**ile:** Yerine \"ve\" getirilebiliyorsa **bağlaç**, \"birlikte/aracılığıyla\" anlamındaysa **edat**tır: \"Ali *ile* Ayşe geldi.\" (bağlaç) / \"Trenle geldi.\" (edat).\n\n# Ünlem\n\nSevinç, korku, şaşkınlık, acı gibi **duyguları** ya da seslenmeleri ifade eden kelimelerdir: *Ah! Eyvah! Hey! Aman! Of! Vay! Yaşasın! Ey!*\n- Ünlemden sonra genellikle **ünlem işareti (!)** konur.\n\n# Metindeki İşlevleri\n\nZamirler **tekrarı önler**, bağlaçlar ve edatlar cümleler arasında **neden–sonuç, karşıtlık, amaç** gibi anlam ilişkileri kurarak metnin **bağdaşıklığını** sağlar; ünlemler anlatıma **duygu ve canlılık** katar.",
     "ornekler": [
      {
       "soru": "\"Ah, ben de seninle gelmek isterdim ama annem izin vermedi.\" cümlesindeki zamir, edat, bağlaç ve ünlemleri bulunuz.",
       "cozum": "**Ünlem:** Ah. **Zamir:** ben, (sen-in-le: \"sen\" kişi zamiri). **Bağlaç:** de (ayrı yazılmış), ama. **Edat:** ile (\"seninle\" — \"birlikte\" anlamında). \"annem\" isim, \"izin\" isimdir."
      },
      {
       "soru": "\"Kitabını bana ver, benimki evde kaldı.\" ve \"Bu kitabı okudun mu?\" cümlelerindeki altı çizili sözcükler (benimki, bu) hangi türdendir?",
       "cozum": "**benimki** → ilgi zamiri \"-ki\" ile oluşmuş zamir (\"benim kitabım\" yerine). **bu** → işaret **sıfatı**; çünkü \"kitap\" isminden önce gelerek onu belirtmektedir. \"Bunu okudun mu?\" deseydik **işaret zamiri** olurdu."
      }
     ],
     "ozet": [
      "Zamirler ismin yerini tutar: kişi, işaret, belgisiz, soru, ilgi (-ki), iyelik.",
      "Edatlar tek başına anlamsızdır; kelimeler arasında ilgi kurar (gibi, kadar, için, ile…).",
      "Bağlaçlar kelime ve cümleleri bağlar; \"de/da\" ve \"ki\" bağlaçları ayrı yazılır.",
      "Ünlemler duygu ve seslenme bildirir; metne canlılık katar."
     ]
    }
   },
   {
    "id": "k6",
    "code": "2.6",
    "title": {
     "tr": "Sesli yayın (podcast) hazırlama ve bilgilendirici metni edebî metne dönüştürme",
     "en": "Preparing a podcast and turning an informative text into a literary one"
    },
    "content": {
     "anlatim": "# Podcast (Sesli Yayın)\n\nİnternet üzerinden dinlenen, belirli bir konuda hazırlanan **ses kaydıdır**. Söyleşi, haber, hikâye anlatımı ya da kitap tanıtımı biçiminde olabilir. Dinleyici yalnızca sese odaklandığı için **açık, akıcı ve ilgi çekici** bir dil gerekir.\n\n**Hazırlık basamakları:**\n1. **Konu ve hedef kitle:** Ör. \"Divan şiirinde su imgesi\" — lise öğrencilerine yönelik 5 dakikalık bölüm.\n2. **Metin/akış planı:** Giriş (kendini ve konuyu tanıt) → gelişme (bilgiler, örnekler, varsa konukla söyleşi) → sonuç (özet ve dinleyiciye soru).\n3. **Kayıt:** Sessiz bir ortam, telefon ya da mikrofon; doğal ve canlı bir ses tonu.\n4. **Düzenleme:** Gereksiz duraklamaları kes, giriş–çıkış müziği ekle (telifsiz).\n5. **Yayın ve geri bildirim.**\n\n# Bilgilendirici Metinden Edebî Metne\n\nAynı konu farklı amaçlarla farklı metin türlerinde yazılabilir:\n| | Bilgilendirici metin | Edebî metin |\n|---|---|---|\n| Amaç | Bilgi vermek | Estetik zevk, duygu uyandırmak |\n| Dil | **Göndergesel**, açık, tek anlamlı | **Şiirsel/sanatsal**, imgeli, çok anlamlı |\n| Gerçeklik | Gerçek bilgiler | Kurmaca dünya |\n| Anlatım | Tanımlama, örnekleme, sayısal veriler | Betimleme, öyküleme, söz sanatları |\n\n**Dönüştürme adımları:** Bilgilendirici metnin **temel bilgisini** koru → bir **bakış açısı ve anlatıcı** seç (ör. suyun ağzından) → bilgileri **duyulara hitap eden betimlemelere** dönüştür → **kişileştirme, benzetme** gibi söz sanatları ekle → bir **duygu ya da düşünceyle** bitir.",
     "ornekler": [
      {
       "soru": "\"Su, 100 °C'de kaynar ve buhar olarak atmosfere yükselir; burada yoğunlaşarak bulutları oluşturur.\" bilgilendirici cümlesini edebî bir anlatıma dönüştürünüz.",
       "cozum": "Örnek dönüşüm: *\"Kazanın dibinde sabırsızca kaynayan su, bir gün gökyüzüne kavuşmak için hafifledi; incecik bir buhar olup göğe süzüldü, orada başka damlalarla el ele verip yağmuru bekleyen bembeyaz bir bulut oldu.\"* Bilgi korunmuş; **kişileştirme**, **betimleme** ve duygu katılarak anlatım edebîleştirilmiştir."
      },
      {
       "soru": "Okulunuzun podcast kanalı için \"Dede Korkut'tan Bugüne Değerler\" konulu 5 dakikalık bir bölümün akış planını yazınız.",
       "cozum": "**0:00–0:30** Giriş müziği, kendini ve konuyu tanıtma. **0:30–1:30** Dede Korkut Hikâyeleri'nin kısa tanıtımı. **1:30–3:30** Bir boydan (ör. Salur Kazan) özetlenmiş sahne ve öne çıkan değerler (cesaret, misafirperverlik, aile). **3:30–4:30** Bu değerlerin bugünkü karşılıkları; bir arkadaşla kısa söyleşi. **4:30–5:00** Özet, dinleyiciye soru ve kapanış müziği."
      }
     ],
     "ozet": [
      "Podcast: konu ve hedef kitle → akış planı → kayıt → düzenleme → yayın.",
      "Sesli yayında dil açık, akıcı ve canlı olmalıdır.",
      "Bilgilendirici metin göndergesel dille bilgi verir; edebî metin imgeli dille duygu uyandırır.",
      "Dönüştürmede bilgi korunur; anlatıcı, betimleme ve söz sanatları eklenir."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Dünden Bugüne",
   "en": "Theme 3: From Past to Present"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Destan geleneği ve motif",
     "en": "The epic tradition and motifs"
    },
    "content": {
     "anlatim": "# Destan\n\nMilletleri derinden etkileyen olayların (savaş, göç, kıtlık, kahramanlık) anlatıldığı, **sözlü kültürün en eski** ürünleri.\n\n| Doğal destan | Yapma destan |\n|---|---|\n| **Anonim**; halkın ortak hafızasında oluşur, sonra derlenir | Tarihî bir olayın bir **şair** tarafından destan kurallarına göre yazılması |\n| Oğuz Kağan, Manas, Ergenekon | **Üç Şehitler Destanı** (F. N. Çamlıbel), **Kurtuluş Savaşı Destanı** (Nâzım Hikmet) |\n\n# Motif\n\nOlayların gelişimine yön veren **simgesel ögeler**: ışık, **kurt**, ağaç, su, kement… Oğuz Kağan Destanı'nda **gök yeleli kurt** orduya yol gösterir.\n\n# Destan Oluşum Evreleri\n\n1. Çıkış (olay) → 2. Yayılma → 3. Derleme (yazıya geçirilme)\n\n# Türk Destanları ve Dönemleri\n\n| Dönem | Destanlar |\n|---|---|\n| **İslamiyet öncesi** | Alp Er Tunga, Şu, Oğuz Kağan, Göktürk (Bozkurt ve Ergenekon), Uygur (Türeyiş ve Göç) |\n| **İslamiyet sonrası** | Satuk Buğra Han, Manas (Kırgız), Cengiz, Battal Gazi, Danişmend, Köroğlu |\n\nDestanlarda **olağanüstü doğum**, **göğe yükselme**, **kutsal hayvan** (kurt, geyik), **ışık ve ağaç** motifleri sık görülür. Bu motifler milletin **ortak hafızasını** ve değerlerini yansıtır.",
     "ornekler": [
      {
       "soru": "Üç Şehitler Destanı doğal destan mıdır?",
       "cozum": "Hayır. Bilinen bir şair (Faruk Nafiz) tarafından yazıldığı için **yapma destandır**."
      },
      {
       "soru": "Destan, efsane ve masal türlerini kahraman, gerçeklik ve işlev bakımından karşılaştırınız.",
       "cozum": "**Destan:** Toplumu ilgilendiren olağanüstü kahramanlar, tarihî bir olay çekirdeği, millî bilinci güçlendirme işlevi. **Efsane:** Bir yerin, varlığın ya da olayın oluşumunu olağanüstü yolla açıklar; anlatılanların gerçek olduğuna **inanılır**. **Masal:** Tamamen **hayalî**, zaman–mekân belirsiz, eğlendirip eğitme amaçlı; gerçek olduğuna inanılmaz."
      }
     ],
     "ozet": [
      "Doğal destan anonim, yapma destan şaire ait.",
      "Motif: kurt, ışık, ağaç gibi simgesel ögeler.",
      "Destan: çıkış → yayılma → derleme."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Oğuz Kağan Destanı",
     "en": "The Oğuz Kağan Epic"
    },
    "content": {
     "anlatim": "# Oğuz Kağan Destanı\n\nTürk milletinin kökenini, **boy teşkilatını** ve kahramanlık anlayışını yansıtan en önemli ulusal destanlardan biri.\n\n**Konusu:** Oğuz Kağan'ın olağanüstü doğumu ve büyümesi, halkı korkutan **gergedanı** öldürmesi, gök yeleli kurdun rehberliğinde seferleri ve ülkeyi **oğulları arasında paylaştırması**.\n\n| Özellik | Açıklama |\n|---|---|\n| **Alp tipi** | Yiğit, cesur, halkını koruyan, adaletli lider |\n| **Yaşam** | Atlı-göçebe yaşam, doğayla mücadele, boylar arası ilişkiler |\n| **Ad verme** | **Karluk, Kıpçak, Kalaç** gibi boy adlarının nasıl ortaya çıktığı efsanelerle açıklanır |\n| **Olağanüstülük** | Doğumu, hızlı büyümesi, kurt motifi |\n\n# Gerçeklik ve Kurmaca\n\nDestanlar tarihî olaylardan izler taşır ama **olağanüstü ve mitolojik ögelerle kurgulanır** → kurmaca metinlerdir.",
     "ornekler": [
      {
       "soru": "Oğuz Kağan Destanı'nda \"kurt\" motifinin işlevi nedir?",
       "cozum": "Gök yeleli kurt, Oğuz Kağan'ın ordusuna **yol gösterir**; Türk kültüründe kılavuzluk ve kutsallık sembolüdür."
      },
      {
       "soru": "Oğuz Kağan Destanı'nda Oğuz'un çocuklarına verdiği adlar (Gün, Ay, Yıldız, Gök, Dağ, Deniz) neyi simgeler?",
       "cozum": "Bu adlar Türklerin **doğa ve gökle ilgili** eski inançlarını yansıtır. Ayrıca destanda oğullar **Bozoklar** (Gün, Ay, Yıldız — büyükler, sağ kol) ve **Üçoklar** (Gök, Dağ, Deniz — küçükler, sol kol) olarak ikiye ayrılır; bu, **Oğuz boylarının teşkilatı** ve devlet düzeninin destana yansımasıdır."
      }
     ],
     "ozet": [
      "Alp tipi: yiğit, adaletli lider.",
      "Gergedan mücadelesi, kurt rehberliği, ülkenin paylaştırılması.",
      "Boy adları efsanelerle açıklanır."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Mesnevi ve Harnâme — Şeyhî",
     "en": "The mesnevi and Harnâme — Şeyhî"
    },
    "content": {
     "anlatim": "# Mesnevi\n\nDivan edebiyatında **her beyti kendi içinde kafiyeli** (aa, bb, cc…) nazım biçimi. Beyit sayısı **sınırsız** olduğu için uzun hikâyeler, destanlar ve felsefi eserler mesneviyle yazılır.\n\n**Bölümleri:** Dibace (önsöz), tevhid, münacat, naat, miraciye, methiye, **âğâz-ı dâstân** (asıl hikâye), hâtime (son söz).\n\n# Şeyhî ve Harnâme (Eşeknâme)\n\n- XV. yüzyıl divan şairi Şeyhî'nin eseri; Türk edebiyatının ilk ve en güçlü **hiciv** örneklerinden biri.\n- **Konusu:** Çalışmaktan zayıf düşmüş bir eşek, öküzlerin rahat yaşamına özenerek **boynuz** ister; tarlaya girer, **kulaklarından ve kuyruğundan** olur.\n- \"**Boynuz umarken kulaktan olmak**\" deyiminin hikâyesidir.\n- Hayvanlar aracılığıyla eleştiri yapıldığı için **fabl** özelliği de taşır.",
     "ornekler": [
      {
       "soru": "Harnâme'nin ders verici yönü nedir?",
       "cozum": "Elindekinin değerini bilmeden başkasının durumuna özenmenin insana zarar verebileceği; **açgözlülük** eleştirisi (boynuz umarken kulaktan olmak)."
      },
      {
       "soru": "Mesnevi nazım biçiminin uzun hikâyeleri anlatmaya neden uygun olduğunu açıklayınız.",
       "cozum": "Mesnevide her beyit **kendi içinde kafiyelidir** (aa, bb, cc…). Şair her beyitte yeni bir kafiye kullanabildiği için **beyit sayısı sınırı yoktur**; bu da uzun olay örgülerinin, aşk hikâyelerinin ve öğretici konuların anlatılmasını kolaylaştırır. Harnâme ve Mesnevî bu biçimle yazılmıştır."
      }
     ],
     "ozet": [
      "Mesnevi: aa bb cc, beyit sayısı sınırsız.",
      "Harnâme: Şeyhî, hiciv, eşek hikâyesi.",
      "\"Boynuz umarken kulaktan olmak.\""
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Fabl — Mevlana",
     "en": "The fable — Rumi"
    },
    "content": {
     "anlatim": "# Fabl\n\nKahramanları çoğunlukla **hayvanlar** olan (**teşhis ve intak** sanatıyla), sonunda **ahlaki ders** veren manzum ya da mensur hikâyeler.\n\n| Bölüm | |\n|---|---|\n| Serim | Kişiler ve durum |\n| Düğüm | Olayın gelişmesi |\n| Çözüm | Sonuç |\n| **Ders (öğüt)** | Ahlaki sonuç |\n\n- **Mevlana Celâleddin-i Rûmî**'nin **Mesnevî**'si pek çok hayvan hikâyesiyle Doğu fabl geleneğinin en önemli örneğidir (\"Aslan ve Av Hayvanları\").\n- Batı'da **Ezop** ve **La Fontaine**; Doğu'da **Kelile ve Dimne**.\n- Fabllarda açgözlülük, kibir, adalet, hırs, yardımlaşma gibi **evrensel** değerler işlenir.\n\n# Fabl Yazarken\n\n1. **Ders (öğüt) belirle:** Örneğin *\"Acele işe şeytan karışır.\"*\n2. **Kişileri seç:** Değere uygun özellikleri temsil eden hayvanlar (sabırlı kaplumbağa, kurnaz tilki).\n3. **Olay örgüsü kur:** Serim–düğüm–çözüm; diyaloglarla hayvanları **konuştur** (intak).\n4. **Dersi sezdir ya da açıkça yaz:** Fablın sonunda kıssadan hisse verilir.\n\n**La Fontaine** fablları manzum, sade ve diyaloglu; **Kelile ve Dimne** ise iç içe geçen hikâyelerle (çerçeve hikâye) yazılmıştır.",
     "ornekler": [
      {
       "soru": "Fabllarda hayvanların konuşturulması hangi söz sanatlarıyla açıklanır?",
       "cozum": "Hayvanlara insan özellikleri verme **teşhis**, konuşturma **intak**tır."
      },
      {
       "soru": "\"Tilki ile Üzüm\" fablında üzümlere ulaşamayan tilkinin \"Zaten ekşiydi.\" demesi hangi insan davranışını eleştirir?",
       "cozum": "Ulaşamadığı şeyi **küçümseyerek** başarısızlığını örtme, kendini kandırma davranışını eleştirir (psikolojide \"ekşi üzüm\" savunması). Fabl hayvan kahraman üzerinden **evrensel bir insan zaafını** gösterir."
      }
     ],
     "ozet": [
      "Fabl: hayvan kahramanlar + ahlaki ders.",
      "Mevlana Mesnevî; La Fontaine; Kelile ve Dimne.",
      "Teşhis ve intak sanatı."
     ]
    }
   },
   {
    "id": "k5",
    "code": "3.5",
    "title": {
     "tr": "Zarflar ve cümlede neden–sonuç, amaç–sonuç, koşul ilişkileri",
     "en": "Adverbs and cause–effect, purpose and condition relations in sentences"
    },
    "content": {
     "anlatim": "# Zarf (Belirteç)\n\nFiilleri, fiilimsileri, sıfatları ya da başka zarfları **zaman, durum, miktar, yer–yön ve soru** bakımından niteleyen kelimelerdir.\n| Tür | Soru | Örnek |\n|---|---|---|\n| **Zaman** | Ne zaman? | *Yarın* gelecek. *Akşam* döndü. |\n| **Durum (hâl)** | Nasıl? | *Hızlı* koştu. *Usulca* kapıyı açtı. |\n| **Miktar (azlık–çokluk)** | Ne kadar? | *Çok* çalıştı. *En* güzel çiçek. |\n| **Yer–yön** | Nereye? | *Aşağı* indi. *İçeri* girdi. (Yalnızca ek almamış yön kelimeleri) |\n| **Soru** | — | *Niçin* gelmedin? *Nasıl* yaptın? |\n\n**Dikkat:** \"*Güzel* kız\" → sıfat (ismi niteler); \"*Güzel* konuştu\" → zarf (fiili niteler).\n\n# Cümlede Anlam İlişkileri\n\n| İlişki | Tanım | Örnek |\n|---|---|---|\n| **Neden–sonuç** | Yargının **gerçekleşme nedeni** belirtilir | \"Yağmur yağdığı *için* maç ertelendi.\" |\n| **Amaç–sonuç** | Yargının **hangi amaçla** yapıldığı belirtilir | \"Sınavı kazanmak *için* çok çalıştı.\" |\n| **Koşul–sonuç** | Yargı bir **şarta** bağlanır | \"Erken kalk*arsan* otobüsü yakalarsın.\" |\n\n**Neden mi, amaç mı?** \"…için\" ifadesinin önüne **\"-mek amacıyla\"** konabiliyorsa amaç–sonuç, **\"-dığı için / yüzünden\"** anlamı varsa neden–sonuç vardır. Neden–sonuçta eylem **gerçekleşmiştir**; amaç–sonuçta amaç henüz **hedeftir**.\n\n**Neden–sonuç bildiren yapılar:** -dığı için, -dan dolayı, -dan, -ınca, çünkü, bu yüzden, -mesi sonucunda.\n**Koşul bildiren yapılar:** -se/-sa, -dıkça, -madıkça, -mesi hâlinde, yeter ki, mademki, şayet.\n\n# Metinde İşlevi\n\nBu ilişkiler, özellikle **tartışmacı ve açıklayıcı** metinlerde düşüncelerin **gerekçelendirilmesini** ve paragrafların mantıklı biçimde birbirine bağlanmasını sağlar.",
     "ornekler": [
      {
       "soru": "\"Hava çok soğuk olduğundan çocuklar dışarı çıkmadı; yarın hava ısınırsa parka gidecekler.\" cümlesindeki zarfları ve anlam ilişkilerini bulunuz.",
       "cozum": "**Zarflar:** *çok* (miktar zarfı, \"soğuk\" sıfatını niteler), *dışarı* (yer–yön zarfı), *yarın* (zaman zarfı). **Anlam ilişkileri:** \"soğuk olduğundan\" → **neden–sonuç**; \"ısınırsa\" → **koşul–sonuç**."
      },
      {
       "soru": "\"Ödevini bitirmek için erken kalktı.\" ve \"Ödevini bitirdiği için rahatladı.\" cümlelerini anlam ilişkisi bakımından karşılaştırınız.",
       "cozum": "İlk cümlede ödevi bitirmek **hedeftir**, henüz gerçekleşmemiştir → **amaç–sonuç** (\"bitirmek amacıyla\"). İkinci cümlede ödev **bitmiştir** ve rahatlamanın **nedenidir** → **neden–sonuç** (\"bitirdiği için / bitirdiğinden\")."
      }
     ],
     "ozet": [
      "Zarflar fiil, sıfat ve zarfları zaman, durum, miktar, yer–yön ve soru bakımından niteler.",
      "Aynı kelime ismi niteliyorsa sıfat, fiili niteliyorsa zarftır.",
      "Neden–sonuçta eylem gerçekleşmiştir; amaç–sonuçta amaç hedeftir; koşul–sonuçta yargı şarta bağlıdır.",
      "Bu ilişkiler tartışmacı metinlerde düşünceyi gerekçelendirir."
     ]
    }
   },
   {
    "id": "k6",
    "code": "3.6",
    "title": {
     "tr": "Yazma atölyesi: özgün fabl yazma ve Türk destanları üzerine sunum",
     "en": "Writing workshop: an original fable and a presentation on Turkish epics"
    },
    "content": {
     "anlatim": "# Özgün Fabl Yazma\n\n**1. Planlama:** Vermek istediğin **dersi** (öğüt) bir cümleyle yaz. Bu dersi temsil edecek **hayvan karakterleri** ve onların baskın özelliklerini seç.\n**2. Taslak:**\n- **Serim:** Kişileri ve ortamı kısaca tanıt.\n- **Düğüm:** Karakterlerin özelliklerinden doğan bir **çatışma** kur (açgözlülük, kibir, tembellik…).\n- **Çözüm:** Olayı, karakterin davranışının **doğal sonucu** olarak bitir.\n- **Ders:** Kıssadan hisse; açıkça yaz ya da okura sezdir.\n**3. Dil ve anlatım:** Diyaloglar (**intak**), kişileştirmeler (**teşhis**); kısa ve sade cümleler.\n**4. Gözden geçirme:** Ders olay örgüsünden **kendiliğinden** çıkıyor mu? Yazım ve noktalama doğru mu?\n\n# Türk Destanları Üzerine Sunum\n\n1. **Konu seç:** Bir destan (Ergenekon, Manas, Göç) ya da bir motif (kurt, ağaç, ışık).\n2. **Araştır:** Güvenilir kaynaklardan (ders kitabı, akademik makaleler, Kültür Bakanlığı yayınları) bilgi topla; **kaynakları not et**.\n3. **Sunuyu tasarla:** Giriş (merak uyandıran bir soru) → destanın özeti → motifler ve değerler → günümüze yansımaları (film, çizgi roman, oyun) → sonuç. Slaytlarda **az yazı, çok görsel**.\n4. **Sun:** Dinleyiciyle göz teması, akıcı ve anlaşılır dil, süre yönetimi; sonunda soru–cevap.",
     "ornekler": [
      {
       "soru": "\"Birlikten kuvvet doğar.\" dersini veren kısa bir fablın serim–düğüm–çözüm planını yazınız.",
       "cozum": "**Serim:** Ormanda karıncalar ve kibirli bir ayı yaşar. **Düğüm:** Sağanak yağmurda dere taşar; ayı tek başına yuvasını kurtarmaya çalışır ama başaramaz. Karıncalar ise sıra olup yuvalarının girişini kum ve yapraklarla kapatır. **Çözüm:** Ayı, minicik karıncaların yuvasının kurtulduğunu görür ve yardım ister; birlikte bir set yaparlar. **Ders:** *\"Birlikten kuvvet doğar.\"*"
      },
      {
       "soru": "\"Ergenekon Destanı\" konulu bir sunumda hangi bölümlere yer verirsiniz? Günümüzle nasıl bağ kurarsınız?",
       "cozum": "**Giriş:** \"Bir millet dağları eritip nasıl yeniden doğar?\" sorusu. **Özet:** Türklerin yenilgiden sonra Ergenekon'a sığınması, çoğalmaları, demir dağı eriterek **bozkurt** rehberliğinde çıkış. **Motifler:** demir, bozkurt, kutlu çıkış. **Değerler:** dayanışma, umut, bağımsızlık. **Günümüz:** **Nevruz–Ergenekon** kutlamaları, demirin dövülmesi geleneği."
      }
     ],
     "ozet": [
      "Fabl planı: ders → hayvan karakterler → serim, düğüm, çözüm → kıssadan hisse.",
      "Fablda intak ve teşhis kullanılır; ders olay örgüsünden doğmalıdır.",
      "Destan sunumu: güvenilir kaynak, motifler ve değerler, günümüze yansımalar.",
      "Sunumda az yazı–çok görsel, göz teması ve süre yönetimi önemlidir."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Tema: Nesillerin Mirası",
   "en": "Theme 4: The Legacy of Generations"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Dede Korkut Hikâyeleri",
     "en": "The Book of Dede Korkut"
    },
    "content": {
     "anlatim": "# Dede Korkut Hikâyeleri\n\n**Destan geleneğinden halk hikâyeciliğine geçişin köprüsü** sayılır.\n\n| Özellik | Bilgi |\n|---|---|\n| **Yapı** | Bir **giriş (mukaddime)** ve **12 hikâye (boy)** (Dresden nüshası) |\n| **Konu** | Oğuzların kendi iç mücadeleleri ve Rum, Abaza, Gürcülerle savaşları |\n| **Anlatım** | **Nazım ve nesir iç içe**; soylama denen şiirli bölümler |\n| **Dede Korkut** | Hikâyenin sonunda ortaya çıkar, **dua eder**, kopuz çalar, kahramana **ad koyar** |\n\n### Okuma metni: Salur Kazan'ın Yedi Başlı Ejderhayı Öldürdüğü Boy\n\nSalur Kazan'ın **olağanüstü bir varlıkla** mücadelesi; Türk inanç dünyasındaki kahramanlık erdemleri.\n\n### Değerler\n\nAd koyma geleneği, aile ve büyüklere saygı, misafirperverlik, vatan sevgisi, kadının toplumdaki saygın yeri.",
     "ornekler": [
      {
       "soru": "Dede Korkut Hikâyeleri neden destan ile halk hikâyesi arasında köprü sayılır?",
       "cozum": "Destanın olağanüstülük ve kahramanlık ögelerini taşırken **nazım-nesir karışık** anlatımı ve daha **gerçekçi** toplumsal yaşamıyla halk hikâyesine yaklaşır."
      },
      {
       "soru": "Dede Korkut Hikâyelerinde \"soylama\" bölümlerinin işlevi nedir?",
       "cozum": "Soylamalar, olayın **heyecanlı ya da duygusal** anlarında söylenen, **ahenkli, ritmik ve süslü** söz bölümleridir. Kahramanın övülmesi, yakarışlar ve meydan okumalar soylamalarla anlatılır; sözlü anlatım geleneğinin **ozan üslubunu** yansıtır."
      }
     ],
     "ozet": [
      "Giriş + 12 hikâye (Dresden).",
      "Nazım-nesir karışık; Dede Korkut dua eder, ad koyar.",
      "Destandan halk hikâyesine geçiş."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Tanzimat şiiri — Namık Kemal ve Hürriyet Kasîdesi",
     "en": "Tanzimat poetry — Namık Kemal's Ode to Liberty"
    },
    "content": {
     "anlatim": "# Tanzimat Dönemi (1839 sonrası)\n\n**Tanzimat Fermanı** ile edebiyatta **Batı etkisi** başladı; **vatan, hürriyet, adalet, eşitlik** gibi yeni kavramlar edebiyata girdi. 1. dönem sanatçıları **\"toplum için sanat\"** anlayışını benimsedi.\n\n# Namık Kemal ve Hürriyet Kasîdesi\n\n- **\"Vatan ve Hürriyet Şairi\"**.\n- **Kaside** nazım biçimini (eski şekil) kullanarak **hürriyet, adalet, millet** gibi yeni toplumsal-siyasi fikirleri (yeni içerik) işledi.\n- Geleneksel kasideler padişah ve devlet büyüklerine yazılırken bu kaside doğrudan **\"hürriyet\"** kavramına yazılmıştır.\n\n> **Eski şekil – yeni muhteva:** Tanzimat 1. dönem şairleri gazel, kaside gibi eski biçimleri korumuş ama içlerini yeni Batılı fikirlerle doldurmuştur.",
     "ornekler": [
      {
       "soru": "\"Eski şekil – yeni muhteva\" ifadesini Hürriyet Kasîdesi üzerinden açıklayın.",
       "cozum": "Şekil olarak divan edebiyatının **kaside** biçimi (aruz, beyit, aa-ba kafiye) kullanılmış; içerik olarak ise övgü yerine **hürriyet, adalet** gibi Tanzimat'la gelen yeni kavramlar işlenmiştir."
      },
      {
       "soru": "Tanzimat şiirinin Divan şiirinden ayrıldığı yönleri konu ve dil bakımından açıklayınız.",
       "cozum": "**Konu:** Divan şiirinin soyut aşk ve tasavvuf temaları yerine **hürriyet, vatan, adalet, kanun, millet** gibi toplumsal konular işlenmiştir. **Dil:** Şinasi ve Namık Kemal'de sadeleşme çabası başlasa da dil hâlâ **ağırdır**; biçim çoğu zaman Divan nazım şekilleriyle (gazel, kaside) sürmüştür. Bu yüzden Tanzimat şiiri için **\"eski şekil, yeni muhteva\"** denir."
      }
     ],
     "ozet": [
      "Tanzimat: Batı etkisi, toplum için sanat.",
      "Namık Kemal: vatan ve hürriyet şairi.",
      "Eski şekil (kaside) – yeni içerik (hürriyet)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Millî Edebiyat hikâyesi — Ömer Seyfettin",
     "en": "National Literature short story — Ömer Seyfettin"
    },
    "content": {
     "anlatim": "# Millî Edebiyat Dönemi (1911–1923)\n\n1911'de **Genç Kalemler** dergisinde yayımlanan **\"Yeni Lisan\"** makalesiyle başlar.\n- **Dilde sadeleşme**; **İstanbul Türkçesi** esas alınır.\n- Konular **Anadolu**dan ve **millî tarihten** seçilir; **hece ölçüsü** benimsenir.\n\n# Ömer Seyfettin ve \"Kaç Yerinden\"\n\n- **Olay (Maupassant tarzı) hikâyesinin** Türk edebiyatındaki kurucusu.\n- **\"Kaç Yerinden\":** Millî Mücadele dönemindeki vatan sevgisi ve **gazilik** kavramı; eski destan kahramanları ile yeni dönemin fedakâr subayları karşılaştırılır.\n- Mekân, zaman ve kişiler **gerçekçi** bir zemindedir.\n\n| Olay hikâyesi | Durum hikâyesi |\n|---|---|\n| Giriş–gelişme–sonuç, merak unsuru | Hayattan kesit, serim-düğüm-çözüm zorunlu değil |\n| Ömer Seyfettin | Sait Faik, Memduh Şevket Esendal |",
     "ornekler": [
      {
       "soru": "Millî Edebiyat döneminin dil anlayışı nedir?",
       "cozum": "**Sade Türkçe**; yabancı dil kurallarını ve tamlamaları atmak, **İstanbul Türkçesini** esas almak (\"Yeni Lisan\")."
      },
      {
       "soru": "Ömer Seyfettin'in hikâyeciliğinin Türk edebiyatına katkılarını yazınız.",
       "cozum": "**Sade, konuşma diline yakın** Türkçesiyle \"Yeni Lisan\" hareketinin öncüsüdür. Olay hikâyesi (Maupassant tarzı) türünün **ustası**dır; **millî duyguları** işleyen tarihî hikâyelerin yanı sıra çocukluk anıları ve mizahi hikâyeler yazmıştır. Hikâyeleri sürükleyici kurgusu ve **beklenmedik sonlarıyla** geniş okur kitlesine ulaşmıştır."
      }
     ],
     "ozet": [
      "Millî Edebiyat: 1911, Yeni Lisan, Genç Kalemler.",
      "Dilde sadeleşme, Anadolu ve millî konular.",
      "Ömer Seyfettin: olay hikâyesinin ustası."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.4",
    "title": {
     "tr": "Fiillerin yapısı ve metin karşılaştırma; atölyeler",
     "en": "Verb structure, comparing texts; workshops"
    },
    "content": {
     "anlatim": "# Fiillerin Yapısı\n\n| Yapı | Açıklama | Örnek |\n|---|---|---|\n| **Basit fiil** | Yapım eki almamış kök | gel-di, bak-tı |\n| **Türemiş fiil** | Yapım eki almış | başla-dı (baş+la), sula-dı (su+la) |\n| **Birleşik fiil** | Birden çok sözcüğün birleşmesi | hisset-ti, kaybol-du, affet-mek, yardım et-mek |\n\n# Dönemler Arası Karşılaştırma\n\nDede Korkut ile bir Servet-i Fünun romanı (Mai ve Siyah) ya da Hürriyet Kasîdesi ile Cumhuriyet şiiri karşılaştırıldığında **zihniyet ve dil değişimi** açıkça görülür.\n\n> Tüm edebî metinler kurmacadır; ama tarihî romanlar ve Millî Mücadele hikâyeleri gerçek toplumsal olaylarla sıkı bağ kurar.\n\n# Atölye ve Performans Görevleri\n\n- **Şiir dinletisi** hazırlama (tema, şiir seçimi, fon müziği, prova)\n- **Öğretici metni edebî metne dönüştürme**\n- **Podcast** ile edebiyat şahsiyetlerini tanıtma\n- **Dede Korkut canlandırma** ve **fabl yazma**\n- Dereceli puanlama anahtarı, kontrol listesi, akran değerlendirmesi",
     "ornekler": [
      {
       "soru": "\"Kalbim sevinçle doldu, birden hisler beni yoklayıp kayboldu.\" cümlesindeki fiillerin yapısını belirleyin.",
       "cozum": "**dol-du**: basit; **yokla-yıp** (yok+la): türemiş; **kaybol-du** (kayıp + ol): birleşik."
      },
      {
       "soru": "\"Yazıp sildi, sonra pencereden dışarı baktı.\" cümlesindeki fiilleri yapı bakımından inceleyiniz.",
       "cozum": "**yaz-ıp sil-di:** \"sil-\" **basit** fiil (kök + çekim eki). \"yazıp\" zarf-fiildir. **bak-tı:** basit fiil. Cümlede **türemiş** (yapım eki almış) ya da **birleşik** fiil yoktur. Karşılaştırma için: \"temiz-le-di\" türemiş, \"yardım et-ti\" birleşik fiildir."
      }
     ],
     "ozet": [
      "Basit: kök; türemiş: yapım eki; birleşik: birden çok sözcük.",
      "Dönemler arası karşılaştırmada zihniyet ve dil değişir.",
      "Atölyeler: dinleti, podcast, fabl yazma."
     ]
    }
   },
   {
    "id": "k5",
    "code": "4.5",
    "title": {
     "tr": "Ara metinler: Servetifünun romanı ve Fecriati şiiri",
     "en": "Intermediate texts: the Servet-i Fünun novel and Fecr-i Âti poetry"
    },
    "content": {
     "anlatim": "# Servetifünun (Edebiyat-ı Cedide) Dönemi (1896–1901)\n\n**Servetifünun dergisi** etrafında toplanan sanatçıların oluşturduğu topluluk; **Recaizade Mahmut Ekrem**'in \"sanat için sanat\" anlayışını benimsemiştir. 1901'de dergi kapatılınca dağıldılar.\n\n**Özellikleri:**\n- **Sanat için sanat**; toplumsal konular yerine **bireysel** duygular (karamsarlık, **hayal–gerçek çatışması**, kaçış isteği).\n- **Ağır ve süslü dil:** Arapça–Farsça kelime ve tamlamalar çoktur.\n- Şiirde **serbest müstezat**, sone, terza-rima gibi Batılı biçimler; **anlam bir dizede bitmeyebilir** (anjambman).\n- Roman ve hikâyede **realizm ve natüralizm** etkisi; olaylar çoğunlukla **İstanbul** ve aydın kesim çevresinde geçer.\n\n# Halit Ziya Uşaklıgil ve Servetifünun Romanı\n\nTürk romanını **Batılı anlamda** teknik olarak olgunlaştıran yazardır.\n- **Mai ve Siyah (1897):** Şair olmak isteyen **Ahmet Cemil**'in hayalleri (mavi) ile acı gerçeklerin (siyah) çatışması; dönemin **hayal kırıklığını** yansıtır.\n- **Aşk-ı Memnu (1900):** Bir konakta geçen aile içi çatışmalar; **psikolojik tahliller** ve ayrıntılı betimlemelerle Türk edebiyatının en önemli romanlarından biri.\n- Özellikleri: Ayrıntılı **mekân ve kişi betimlemeleri**, **iç çözümleme**, gözlem; yazar olaylara karışmaz (Tanzimat'tan farklı olarak).\n\n# Fecriati (1909–1912)\n\n**\"Geleceğin şafağı\"** anlamına gelen topluluk, II. Meşrutiyet'ten sonra kuruldu; beyannamesinde **\"Sanat şahsi ve muhteremdir.\"** ilkesini savundu.\n- Servetifünun'un **devamı** niteliğindedir; sanat için sanat, ağır dil ve bireysel konular sürdü.\n- **Sembolizm** etkisi: Şiirde **müzikalite**, **telkin (sezdirme)**, belirsizlik ve izlenimler.\n- **Ahmet Haşim** topluluğun en önemli şairidir: Şiirlerinde **akşam, gurup, havuz, yalnızlık** temaları; renk ve ışık oyunlarıyla izlenimci tablolar çizer. **\"Şiir Hakkında Bazı Mülahazalar\"** yazısında şiirin **anlaşılmak için değil, hissedilmek için** yazıldığını savunur (saf şiir anlayışının kaynaklarından).\n\n# Dönemleri Karşılaştırma\n\n| | Tanzimat | Servetifünun | Fecriati | Millî Edebiyat |\n|---|---|---|---|---|\n| Sanat anlayışı | Toplum için sanat | Sanat için sanat | Sanat şahsi ve muhteremdir | Toplum için sanat |\n| Dil | Sadeleşme çabası | Ağır, süslü | Ağır | **Sade**, konuşma dili |\n| Konu | Hürriyet, vatan, eski–yeni | Bireysel bunalım, kaçış | Bireysel, doğa | Millî değerler, Anadolu |",
     "ornekler": [
      {
       "soru": "Mai ve Siyah romanının adındaki \"mavi\" ve \"siyah\" renkleri neyi simgeler? Bu tema Servetifünun sanatçılarının ruh hâliyle nasıl ilişkilidir?",
       "cozum": "**Mavi**, Ahmet Cemil'in büyük bir şair olma ve mutlu bir hayat kurma **hayallerini**; **siyah** ise yoksulluk, aile felaketleri ve başarısızlıkla gelen **acı gerçeği** simgeler. II. Abdülhamit döneminin baskı ortamında toplumsal konulara yönelemeyen Servetifünun sanatçıları **hayal–gerçek çatışmasını, karamsarlığı ve kaçış isteğini** eserlerine yansıtmıştır."
      },
      {
       "soru": "Fecriati'nin \"Sanat şahsi ve muhteremdir.\" ilkesini açıklayınız. Bu ilke Millî Edebiyat anlayışından nasıl ayrılır?",
       "cozum": "İlke, sanatın sanatçının **kişisel duygu ve zevkinin** ürünü olduğunu ve **saygı duyulması** gerektiğini; sanatın bir amaca (toplumu eğitmek vb.) hizmet etmek zorunda olmadığını anlatır. **Millî Edebiyat** ise **toplum için sanat** anlayışıyla millî değerleri, Anadolu'yu ve halkı konu edinmiş, **sade dili** benimsemiştir."
      }
     ],
     "ozet": [
      "Servetifünun: sanat için sanat, bireysel konular, ağır dil, Batılı biçimler, realist–natüralist roman.",
      "Halit Ziya: Mai ve Siyah (hayal–gerçek çatışması), Aşk-ı Memnu; ayrıntılı betimleme, iç çözümleme.",
      "Fecriati: \"Sanat şahsi ve muhteremdir\"; sembolizm, müzikalite, telkin; Ahmet Haşim.",
      "Millî Edebiyat sade dil ve toplum için sanatla bu iki topluluktan ayrılır."
     ]
    }
   },
   {
    "id": "k6",
    "code": "4.6",
    "title": {
     "tr": "Metin dönüştürme ve canlandırma: hikâyeden şiire, dramatizasyon",
     "en": "Text transformation and performance: from story to poem, dramatization"
    },
    "content": {
     "anlatim": "# Hikâyeden Şiire Dönüştürme\n\nBir hikâyenin **olay örgüsü, kişileri ve duygusu** şiirin yoğun ve ahenkli diline aktarılabilir. Örneğin Millî Edebiyat döneminden bir hikâyedeki fedakârlık duygusu birkaç kıtalık bir şiire dönüştürülebilir.\n\n**Adımlar:**\n1. Hikâyenin **ana duygusunu ve temasını** belirle (vatan sevgisi, fedakârlık, özlem…).\n2. Şiirde öne çıkacak **anahtar sahneleri** seç (her şeyi anlatmaya çalışma, **yoğunlaştır**).\n3. Bir **nazım biçimi ve ölçü** seç: hece ölçüsüyle dörtlükler ya da serbest şiir.\n4. **İmge, benzetme, kişileştirme** ile sahneleri görselleştir; **kafiye, redif, ses tekrarları** ile ahenk kur.\n5. Hikâyenin sonunu şiirin **son dizelerinde** etkili bir vurguyla ver.\n\n# Dramatizasyon (Canlandırma)\n\nBir metindeki olayın **sahne üzerinde, diyalog ve hareketle** canlandırılmasıdır.\n1. **Metni seç ve sahnelere ayır** (giriş, çatışma, doruk, çözüm).\n2. **Kişileri belirle**; her kişinin ruh hâlini ve konuşma üslubunu tartış.\n3. **Diyalogları yaz**: Anlatıcının aktardığı bilgileri konuşmalara ve **sahne yönergelerine** (parantez içinde hareket ve duygu notları) dönüştür.\n4. **Prova**: Ses tonu, vurgu, jest–mimik, sahnede konumlanma; basit dekor, kostüm ve ışık.\n5. **Sergileme ve değerlendirme**: İzleyicilerden geri bildirim al; metnin canlandırmada nasıl **yeniden yorumlandığını** tartış.\n\n**Neden önemli?** Metin dönüştürme ve canlandırma, metni **derinlemesine anlamayı**, türlerin farklı anlatım imkânlarını görmeyi ve **iş birliği ile yaratıcılığı** geliştirir.",
     "ornekler": [
      {
       "soru": "Bir hikâyedeki şu bölümü sahne yönergeleriyle birlikte kısa bir diyaloğa dönüştürünüz: \"Yaşlı adam torununa, dedesinden kalan saati uzattı. Çocuk saati alırken gözleri doldu.\"",
       "cozum": "*(Akşam. Eski bir evin salonu. Dede, cebinden bir köstekli saat çıkarır.)*\n**DEDE** *(titrek bir sesle)*: Bu saat babamdan bana kaldı. Şimdi senin.\n**TORUN** *(saati iki eliyle alır, gözleri dolar)*: Dede… Hep saklayacağım, söz.\n**DEDE** *(gülümseyerek)*: Saat değil önemli olan evlat, zamanı iyi kullanmak.\n*(Işık yavaşça kararır.)*"
      },
      {
       "soru": "Bir hikâyeyi şiire dönüştürürken neden \"her şeyi anlatmaya çalışmamak\" gerekir?",
       "cozum": "Şiir **yoğun ve özlü** bir türdür; hikâyedeki tüm ayrıntılar aktarılırsa şiir **anlatımsal ve düz** bir metne dönüşür. Şiirde en etkili sahneler seçilir, duygu **imge ve çağrışımlarla** sezdirilir; okurun boşlukları kendi hayal gücüyle doldurması sağlanır."
      }
     ],
     "ozet": [
      "Hikâyeden şiire: tema ve duygu → anahtar sahneler → nazım biçimi ve ölçü → imge ve ahenk → etkili son.",
      "Şiir yoğunlaştırır; hikâyenin tüm ayrıntılarını aktarmaz.",
      "Dramatizasyon: sahnelere ayırma, kişiler, diyalog ve sahne yönergeleri, prova, sergileme.",
      "Metin dönüştürme ve canlandırma metni derinlemesine anlamayı ve iş birliğini geliştirir."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Tema (Ek): TYT Türkçe — Anlam ve Dil Bilgisi",
   "en": "Theme 5 (Extra): Turkish for the Exam — Meaning and Grammar"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "TDE.10.E1",
    "title": {
     "tr": "Sözcükte anlam",
     "en": "Word meaning"
    },
    "content": {
     "anlatim": "# Anlam Türleri\n\n- **Gerçek (temel) anlam:** Sözcüğün akla ilk gelen anlamı. *Kapıyı kapattı.*\n- **Yan anlam:** Temel anlamla bağını koruyarak kazanılan yeni anlam. *Masanın ayağı*, *dağın eteği*.\n- **Mecaz anlam:** Temel anlamdan tamamen uzaklaşan anlam. *Bu konuda çok **soğuk** davrandı.*\n- **Terim anlam:** Bir bilim, sanat ya da meslek alanına özgü anlam. *Üçgenin **açısı***.\n\n# Sözcükler Arası İlişkiler\n\n- **Eş anlamlı:** yanıt–cevap, kırmızı–al. **Zıt anlamlı:** uzun–kısa.\n- **Eş sesli (sesteş):** Yazılışı aynı, anlamı farklı: *yüz* (sayı / surat / yüzmek).\n- **Somut–soyut:** Beş duyuyla algılanan (masa) / algılanamayan (sevgi).\n- **Genel–özel**, **nitel–nicel** anlam.\n\n# Söz Öbekleri\n\n- **Deyim:** Genellikle mecaz anlamlı, kalıplaşmış söz öbeği: *gözden düşmek*, *kulak vermek*.\n- **Atasözü:** Uzun deneyimlerden çıkmış, öğüt veren kalıp söz: *Damlaya damlaya göl olur.*\n- **İkileme:** Anlamı güçlendirmek için sözcük tekrarı: *yavaş yavaş*, *eğri büğrü*.\n- **Ad aktarması (mecaz-ı mürsel):** Bir sözü benzetme amacı gütmeden başka söz yerine kullanma: *Bütün **sınıf** güldü* (sınıftakiler).\n- **Dolaylama:** Bir kavramı birden çok sözcükle anlatma: *Kara elmas* (kömür).",
     "ornekler": [
      {
       "soru": "“Sınavdan sonra yüzü **kızardı**.” ve “Tavada balık **kızardı**.” cümlelerinde altı çizili sözcükler hangi anlamlarda kullanılmıştır?",
       "cozum": "İlkinde utanma/heyecan nedeniyle **yan (ya da mecaz) anlam**, ikincisinde pişme sonucu renk değiştirme olarak **gerçek anlam**."
      },
      {
       "soru": "“Bütün **İstanbul** bu maçı izledi.” cümlesindeki söz sanatı nedir?",
       "cozum": "**Ad aktarması (mecaz-ı mürsel)**: İstanbul sözüyle İstanbul'da yaşayanlar kastediliyor."
      }
     ],
     "ozet": [
      "Gerçek, yan, mecaz ve terim anlam ayırt edilmelidir.",
      "Deyim kalıplaşmış ve çoğu zaman mecazlıdır; atasözü öğüt verir.",
      "Ad aktarması benzetme olmadan bir sözü başka söz yerine kullanmaktır."
     ]
    }
   },
   {
    "id": "k2",
    "code": "TDE.10.E2",
    "title": {
     "tr": "Cümlede anlam",
     "en": "Sentence meaning"
    },
    "content": {
     "anlatim": "# Cümle Yorumu Türleri\n\n| Tür | İpucu | Örnek |\n|---|---|---|\n| **Neden–sonuç** | çünkü, için, -den dolayı | *Yağmur yağdığı **için** maç ertelendi.* |\n| **Amaç–sonuç** | amacıyla, için (henüz gerçekleşmemiş) | *Sınavı kazanmak **için** çalışıyor.* |\n| **Koşul** | -sa/-se, -dıkça | *Erken kalkarsan otobüse yetişirsin.* |\n| **Karşılaştırma** | -den daha, gibi, kadar | *Bu kitap öncekinden **daha** sürükleyici.* |\n| **Öznel yargı** | Kişiden kişiye değişir, kanıtlanamaz | *Bu film çok etkileyici.* |\n| **Nesnel yargı** | Kanıtlanabilir, herkese göre aynı | *Kitap 320 sayfadır.* |\n| **Varsayım** | diyelim, farz edelim | *Diyelim ki yarın tatil oldu…* |\n| **Ön yargı** | Denemeden peşin hüküm | *Bu yazarın kitapları okunmaz.* |\n| **Örtülü anlam** | Söylenmeden sezdirilen | *Ali **de** sınavı kazandı.* (başkaları da kazandı) |\n\n# Dikkat\n\n- **Amaç–sonuç** ile **neden–sonuç** ayrımı: eylem **gerçekleşmeden** önceki hedef ise amaç, gerçekleşmiş bir durumun gerekçesi ise neden.\n- **Kesinlik** (\"kesinlikle\", \"mutlaka\") ve **olasılık** (\"belki\", \"sanırım\") bildiren anlatımlar soru kökünde sık sorulur.",
     "ornekler": [
      {
       "soru": "“Bu yaz tatile gidemedik çünkü babamın izni çıkmadı.” cümlesinde hangi anlam ilişkisi vardır?",
       "cozum": "**Neden–sonuç** (izin çıkmaması, tatile gidememenin nedeni)."
      },
      {
       "soru": "“Bu şarkı geçen yılın en güzel şarkısıydı.” cümlesi öznel mi nesnel mi?",
       "cozum": "**Öznel**: \"en güzel\" kişiden kişiye değişen bir değerlendirmedir."
      }
     ],
     "ozet": [
      "Amaç–sonuç gerçekleşmemiş hedefi, neden–sonuç gerçekleşmiş bir durumun gerekçesini bildirir.",
      "Öznel yargı kanıtlanamaz, nesnel yargı kanıtlanabilir.",
      "\"de\" bağlacı ve \"bile\" gibi sözcükler örtülü anlam taşıyabilir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "TDE.10.E3",
    "title": {
     "tr": "Paragraf: ana düşünce, yardımcı düşünce ve anlatım biçimleri",
     "en": "Paragraph: main idea, supporting ideas and modes"
    },
    "content": {
     "anlatim": "# Paragrafın Bölümleri\n\n- **Giriş cümlesi:** Bağlaçla başlamaz, kendinden önceki cümleye gönderme yapmaz, genel bir yargı içerir.\n- **Gelişme:** Ana düşünceyi açıklar ve örnekler.\n- **Sonuç:** Çoğu zaman ana düşüncenin söylendiği yerdir (\"Kısacası\", \"Bu yüzden\").\n\n# Ana Düşünce ve Yardımcı Düşünce\n\n- **Ana düşünce:** Yazarın okura vermek istediği temel mesaj; paragrafın tamamını kapsar. Sorusu: *\"Yazar ne demek istiyor?\"*\n- **Konu:** Paragrafta neden söz edildiği (ör. *okuma alışkanlığı*).\n- **Yardımcı düşünceler:** Ana düşünceyi destekleyen ayrıntılar. \"Değinilmemiştir\" sorularında paragrafta **olmayan** bilgi aranır.\n- **Akışı bozan cümle:** Konudan ya da düşünceden sapan cümle.\n\n# Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları\n\n| Anlatım biçimi | Özelliği |\n|---|---|\n| **Açıklayıcı** | Bilgi verir, öğretir |\n| **Tartışmacı** | Bir düşünceyi savunur, karşıt görüşü çürütür |\n| **Öyküleyici** | Olay, kişi, zaman, mekân vardır |\n| **Betimleyici** | Sözcüklerle resim çizer; duyulara seslenir |\n| Düşünceyi geliştirme yolu | İpucu |\n|---|---|\n| **Tanımlama** | \"… nedir?\" sorusuna cevap |\n| **Örnekleme** | \"örneğin, mesela\" |\n| **Karşılaştırma** | İki varlığın benzer ve farklı yanları |\n| **Tanık gösterme** | Ünlü birinin sözüne başvurma |\n| **Sayısal verilerden yararlanma** | İstatistik, yüzde |\n| **Benzetme** | Bir varlığı başka bir varlığa benzetme |",
     "ornekler": [
      {
       "soru": "Bir paragrafta \"Ünlü bilim insanı Einstein'ın dediği gibi hayal gücü bilgiden önemlidir\" cümlesi kullanılmıştır. Hangi düşünceyi geliştirme yolu kullanılmıştır?",
       "cozum": "**Tanık gösterme** (ünlü birinin sözüne başvurma)."
      },
      {
       "soru": "Paragrafın ilk cümlesi neden \"Bu nedenle\" ile başlayamaz?",
       "cozum": "Giriş cümlesi kendinden önceki bir düşünceye bağlanamaz; \"bu nedenle\" önceki bir cümleye **gönderme** yaptığı için giriş cümlesi olamaz."
      }
     ],
     "ozet": [
      "Ana düşünce paragrafın tamamını kapsayan temel mesajdır; çoğu zaman sonuç cümlesindedir.",
      "Giriş cümlesi bağlaçla başlamaz ve önceki cümleye gönderme yapmaz.",
      "Anlatım biçimleri: açıklayıcı, tartışmacı, öyküleyici, betimleyici.",
      "Düşünceyi geliştirme yolları: tanımlama, örnekleme, karşılaştırma, tanık gösterme, sayısal veri, benzetme."
     ]
    }
   },
   {
    "id": "k4",
    "code": "TDE.10.E4",
    "title": {
     "tr": "Fiiller, ek fiil ve fiilimsiler",
     "en": "Verbs, the copula and verbals"
    },
    "content": {
     "anlatim": "# Fiil (Eylem)\n\nİş, oluş ya da durum bildirir; **-mek/-mak** eki alabilir.\n- **Anlamına göre:** İş (kesmek — nesne alır), durum (uyumak — nesne almaz), oluş (sararmak — kendiliğinden değişim).\n- **Kip:** *Haber kipleri:* görülen geçmiş (-dı), öğrenilen geçmiş (-mış), şimdiki (-yor), gelecek (-acak), geniş (-r). *Dilek kipleri:* gereklilik (-malı), istek (-a), dilek–şart (-sa), emir.\n- **Ek fiil (i-):** İsim soylu sözcükleri yüklem yapar (*öğrenci-y-di*) ya da fiillerde birleşik zaman kurar (*gel-iyor-du*).\n\n# Fiilimsiler (Eylemsiler)\n\nFiillerden türeyip cümlede isim, sıfat ya da zarf görevinde kullanılan sözcüklerdir; **yüklem olmazlar**, olumsuzu -ma/-me ile yapılır.\n| Tür | Ekler | Örnek |\n|---|---|---|\n| **İsim-fiil** | -ma, -ış, -mak | *Okuma**k** güzeldir.* |\n| **Sıfat-fiil** | -an, -ası, -mez, -ar, -dık, -acak, -mış | *Koş**an** çocuk düştü.* |\n| **Zarf-fiil** | -ıp, -arak, -ınca, -ken, -dıkça, -madan, -alı | *Eve gel**ince** aradı.* |\n\n> Kalıcı ad olmuş sözcükler fiilimsi sayılmaz: *dondurma*, *dolma*, *çakmak* (bir nesnenin adı oldukları için).",
     "ornekler": [
      {
       "soru": "“Gülerek içeri giren arkadaşı, okumayı çok sevdiğini söyledi.” cümlesindeki fiilimsileri türleriyle bulunuz.",
       "cozum": "*Gülerek* → **zarf-fiil**; *giren* → **sıfat-fiil**; *okumayı* → **isim-fiil**; *sevdiğini* → **sıfat-fiil** (-dık, adlaşmış)."
      },
      {
       "soru": "“Annem bize dolma yaptı.” cümlesindeki \"dolma\" fiilimsi midir?",
       "cozum": "Hayır; bir yemeğin **kalıcı adı** olduğu için fiilimsi sayılmaz."
      }
     ],
     "ozet": [
      "Haber kipleri: -dı, -mış, -yor, -acak, -r; dilek kipleri: -malı, -a, -sa, emir.",
      "Ek fiil isim soylu sözcükleri yüklem yapar.",
      "İsim-fiil: -ma, -ış, -mak; sıfat-fiil: -an, -ası, -mez, -ar, -dık, -acak, -mış; zarf-fiil: -ıp, -arak, -ınca, -ken…",
      "Kalıcı ad olmuş sözcükler fiilimsi değildir."
     ]
    }
   },
   {
    "id": "k5",
    "code": "TDE.10.E5",
    "title": {
     "tr": "Cümlenin ögeleri ve cümle türleri",
     "en": "Sentence elements and sentence types"
    },
    "content": {
     "anlatim": "# Cümlenin Ögeleri\n\nÖnce **yüklem** bulunur; diğer ögeler yükleme soru sorularak bulunur.\n| Öge | Soru | Örnek: *Ali dün akşam kütüphanede arkadaşına kitabı verdi.* |\n|---|---|---|\n| **Yüklem** | — | *verdi* |\n| **Özne** | Kim? Ne? (yüklemi yapan) | *Ali* |\n| **Belirtili nesne** | Neyi? Kimi? | *kitabı* |\n| **Dolaylı tümleç** | Nereye, nerede, nereden, kime? (-e, -de, -den) | *kütüphanede, arkadaşına* |\n| **Zarf tümleci** | Ne zaman, nasıl, niçin, ne kadar? | *dün akşam* |\n- Belirtisiz nesne yalın hâldedir: *Kitap okudu.* Söz öbekleri bölünmeden tek öge sayılır.\n\n# Cümle Türleri\n\n- **Yüklemin türüne göre:** Fiil cümlesi (*geldi*) / isim cümlesi (*öğrencidir*).\n- **Yüklemin yerine göre:** Kurallı (yüklem sonda) / devrik.\n- **Anlamına göre:** Olumlu–olumsuz, soru, ünlem.\n- **Yapısına göre:** **Basit** (tek yüklem), **birleşik** (fiilimsi ya da yan cümle içerir, ör. *Eve gelince yemek yedi.*), **sıralı** (virgül/noktalı virgülle bağlı bağımsız cümleler), **bağlı** (bağlaçla bağlanan cümleler).",
     "ornekler": [
      {
       "soru": "“Yarın sabah erkenden okula gideceğiz.” cümlesinin ögelerini bulunuz.",
       "cozum": "*gideceğiz* yüklem; özne gizli (**biz**); *yarın sabah erkenden* **zarf tümleci**; *okula* **dolaylı tümleç**."
      },
      {
       "soru": "“Kitabı bitirince arkadaşına verdi.” cümlesi yapısına göre nasıl bir cümledir?",
       "cozum": "Zarf-fiil (*bitirince*) içerdiği için **birleşik cümle**."
      }
     ],
     "ozet": [
      "Ögeler bulunurken önce yüklem bulunur, sorular yükleme sorulur.",
      "Belirtili nesne -ı hâli alır; dolaylı tümleç -e, -de, -den ekli.",
      "Yapısına göre: basit, birleşik (fiilimsi/yan cümle), sıralı, bağlı."
     ]
    }
   },
   {
    "id": "k6",
    "code": "TDE.10.E6",
    "title": {
     "tr": "Anlatım bozuklukları",
     "en": "Errors of expression"
    },
    "content": {
     "anlatim": "# Anlamsal Bozukluklar\n\n- **Gereksiz sözcük:** *Geri **iade** etti* (iade zaten geri vermek), *yaklaşık **olarak** on kişi*.\n- **Sözcüğün yanlış anlamda kullanılması:** *Fiyatlar **ucuzladı**.* (fiyat ucuzlamaz, **düşer**; ürün ucuzlar) · *Bu yarışmada **ilk** iki sırayı aldı.* (doğrusu: ilk iki sıraya girdi)\n- **Mantık hatası ve çelişki:** *Kesinlikle gelebilir.* (kesinlik ile olasılık çelişir)\n- **Anlam belirsizliği:** *Yaşlı adamın oğluyla konuştum.* (kim yaşlı? virgülle ya da sıralamayla giderilir)\n- **Deyim yanlışlığı:** Deyimin sözcüklerinin değiştirilmesi.\n\n# Yapısal (Dil Bilgisi) Bozukluklar\n\n- **Özne–yüklem uyumsuzluğu:** *Bu konuda ben de, siz de çok çalıştınız* — kişi uyumuna dikkat; sayı uyumu (*Öğrenciler sınıfa girdiler/girdi*).\n- **Ortak öge eksikliği:** Farklı hâl eki isteyen yüklemlerde ortak öge eksik bırakılmamalıdır: *Ona güveniyor ve seviyordu* → *Ona güveniyor ve **onu** seviyordu*.\n- **Ek eksikliği / yanlışlığı:** *Okula ve eve gitti* doğru; *Annesine ve babasını aradı* yanlış.\n- **Tamlama yanlışlığı**, **çatı uyumsuzluğu** (*Sorunlar konuşuldu ve çözüme kavuşturdu* → *kavuşturuldu*).",
     "ornekler": [
      {
       "soru": "“Ona saygı duyuyor ve çok seviyordu.” cümlesindeki anlatım bozukluğunu açıklayınız.",
       "cozum": "\"Saygı duyuyor\" **ona** (yönelme), \"seviyordu\" ise **onu** (belirtme) ister; ortak kullanılan öge uygun değildir → **nesne eksikliği**. Doğrusu: *Ona saygı duyuyor ve onu çok seviyordu.*"
      },
      {
       "soru": "“Bu soruyu kesinlikle çözebilir.” cümlesinde nasıl bir bozukluk vardır?",
       "cozum": "\"Kesinlikle\" kesinlik, \"çözebilir\" olasılık bildirir → **anlamca çelişki**."
      }
     ],
     "ozet": [
      "Anlamsal bozukluklar: gereksiz sözcük, yanlış anlam, çelişki, belirsizlik.",
      "Yapısal bozukluklar: özne–yüklem uyumsuzluğu, öge eksikliği, ek yanlışlığı, çatı uyumsuzluğu.",
      "Ortak öge farklı hâl eki istiyorsa ayrıca yazılmalıdır."
     ]
    }
   }
  ]
 }
];
