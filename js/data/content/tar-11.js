/* =========================================================
   11. Sınıf Tarih — kazanım odaklı konu anlatım notları
   Kaynak: kullanıcının verdiği "11. Sınıf Tarih Kazanım Odaklı Ayrıntılı Konu Anlatım Notları" (3 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır (uzun bölümler a/b/c olarak bölündü). Eklenenler: III. Selim ve II. Mahmud ıslahatları, Kütahya Antlaşması, Berlin Antlaşması ayrıntıları. Düzeltmeler: Yeni (Genç) Osmanlılar ile Jön Türkler ayrımı, Medine Müdafaası'nın Mondros'tan sonra da sürmesi, Lizbon depreminin büyüklük ve kayıp tahmini. Tehcir konusu ders kitabının görüşü ve uluslararası tartışma birlikte verilerek dengeli anlatıldı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/tarih"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Değişen Dünyada Osmanlı (1683–1789)",
   "en": "Unit 1: The Ottomans in a Changing World (1683–1789)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1a",
    "title": {
     "tr": "Köprülüler'den Karlofça'ya: II. Viyana ve Kutsal İttifak",
     "en": "From the Köprülüs to Karlowitz"
    },
    "content": {
     "anlatim": "# XVII. Yüzyılın İkinci Yarısında Fetihler\n\n**Köprülü Mehmed Paşa** (1656–1661) ve **Köprülü Fazıl Ahmed Paşa** (1661–1676) dönemlerindeki mali ve askerî ıslahatlarla fetihler yeniden başladı:\n- **Varad** (1660), **Uyvar** (1663), **Kamaniçe** (1672) kaleleri; **Bucaş Antlaşması** (1672) ile Podolya alındı → Osmanlı'nın **batıda en geniş sınırları**.\n- **Girit** (1669) alındı → Doğu Akdeniz hâkimiyeti pekişti.\n- **Çehrin Seferi** (1678) → **Bahçesaray Antlaşması (1681)**: Özi Nehri sınır oldu; Rusya ile ilk antlaşma.\n\n# II. Viyana Kuşatması (1683)\n\n- **Merzifonlu Kara Mustafa Paşa**, Orta Macar Krallığı meselesi (Tököli İmre'nin Osmanlı himayesi istemesi) üzerine Avusturya'ya sefer düzenledi; **14 Temmuz 1683**'te Viyana kuşatıldı.\n- Leh Kralı **III. Jan Sobieski** komutasındaki müttefik kuvvetler **12 Eylül 1683 Kahlenberg** Muharebesi'nde Osmanlı ordusunu bozguna uğrattı → **duraklamadan gerilemeye geçişin dönüm noktası**.\n\n# Kutsal İttifak Savaşları (1683–1699)\n\nPapa **XI. Innocentius** öncülüğünde **Avusturya, Venedik, Lehistan** (1684) ve **Rusya** (1686) birleşti. 16 yıl süren **dört cepheli** savaşlar Osmanlı maliyesini ve ordusunu tüketti; Balkanlar'da asayiş bozuldu. **Zenta** (1697) bozgunu barışı zorunlu kıldı.\n\n# Karlofça (1699) ve İstanbul (1700) Antlaşmaları\n\nİngiltere ve Hollanda arabuluculuğunda imzalandı. Osmanlı **ilk kez büyük çaplı ve kalıcı toprak kaybına** uğradı:\n\n| Devlet | Aldığı yerler |\n|---|---|\n| **Avusturya** | **Banat (Temeşvar) hariç** Macaristan ve **Erdel** |\n| **Venedik** | **Mora** ve Dalmaçya kıyıları |\n| **Lehistan** | **Podolya** ve Ukrayna |\n\n**İstanbul Antlaşması (1700) – Rusya:** **Azak** Ruslara bırakıldı; Rusya **İstanbul'da daimî elçi** bulundurma hakkı kazandı.",
     "ornekler": [
      {
       "soru": "Karlofça Antlaşması Osmanlı tarihinde neden bir dönüm noktasıdır?",
       "cozum": "Osmanlı Devleti **ilk kez büyük çaplı toprak kaybetti**, Orta Avrupa'daki üstünlüğünü yitirdi ve **gerileme dönemi** başladı. Ayrıca barış için arabulucu kabul edilmesi, diplomasinin önem kazandığını gösterdi."
      }
     ],
     "ozet": [
      "Köprülüler dönemi: Uyvar, Girit, Kamaniçe; en geniş sınırlar.",
      "1683 II. Viyana: Kahlenberg bozgunu.",
      "Karlofça 1699: ilk büyük toprak kaybı; İstanbul 1700: Azak Rusya'ya."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.1b",
    "title": {
     "tr": "Prut'tan Küçük Kaynarca'ya (1711–1774)",
     "en": "From Prut to Küçük Kaynarca"
    },
    "content": {
     "anlatim": "# Prut Savaşı ve Antlaşması (1711)\n\n**Nedenler:** Kayıpları geri alma isteği, Poltava yenilgisinden sonra Osmanlı'ya sığınan İsveç Kralı **XII. Karl (Demirbaş Şarl)**, Rusların Karadeniz politikası.\n- Sadrazam **Baltacı Mehmed Paşa**, **Prut** kıyısında Çar **I. Petro**'nun ordusunu kuşattı. Ordunun ikmal sorunları ve barış istekleri (rivayete göre Katerina'nın girişimleri) sonucu antlaşma imzalandı.\n- **Sonuçlar:** **Azak geri alındı**; Ruslar Lehistan'ın iç işlerine karışmamayı ve İstanbul'da daimî elçi bulundurmamayı kabul etti. Rus ordusunu yok etme fırsatı kaçsa da diplomatik bir başarıdır.\n\n# Osmanlı–Venedik–Avusturya Savaşları ve Pasarofça (1718)\n\n- 1714'te Venedik'e savaş açıldı, **Mora geri alındı**. Avusturya Venedik'in yanında savaşa girdi (1716); **Petervaradin** yenilgisi, **Belgrad**'ın Prens Eugène tarafından alınması (1717).\n- **Pasarofça Antlaşması (1718):** İngiltere ve Hollanda arabuluculuğunda. **Belgrad, Temeşvar** ve Küçük Eflak Avusturya'ya; **Mora Osmanlı'da** kaldı; Dalmaçya kıyılarındaki bazı kaleler Venedik'e.\n- Osmanlı **savunmacı (defansif) ve barışçı** politikaya geçti → **Lale Devri** başladı.\n\n# I. Mahmud Dönemi ve Belgrad Antlaşması (1739)\n\n- **Humbaracı Ahmed Paşa** (Comte de Bonneval) Humbaracı Ocağı'nı ıslah etti; **1734**'te Üsküdar'da ilk modern askerî okul **Hendesehane (Humbarahane)** açıldı.\n- **1736–1739 Osmanlı–Rus–Avusturya Savaşları:** **Hisarcık (Grocka)** zaferi, Belgrad'ın geri alınması.\n- **Belgrad Antlaşması (1739)** – **Fransa** arabuluculuğuyla: Belgrad Osmanlı'ya iade; Azak'ın surları yıkılarak Rusya'ya bırakıldı; Rusya **Karadeniz'de savaş ve ticaret gemisi bulunduramayacak**. Osmanlı'ya yaklaşık **30 yıllık barış** sağladı. (\"Son kazançlı antlaşma\")\n\n# 1768–1774 Osmanlı–Rus Savaşı ve Küçük Kaynarca (1774)\n\n- **Nedenler:** Çariçe **II. Katerina**'nın Lehistan iç işlerine müdahalesi, Rusya'nın Karadeniz politikası.\n- Rus donanması Baltık'tan gelip **Çeşme**'de Osmanlı donanmasını yaktı (1770); karada **Kartal (Kagul)** ve **Kozluca** yenilgileri.\n- **Küçük Kaynarca Antlaşması (1774):**\n  - **Kırım bağımsız** oldu (halife olarak padişaha dinî bağ) → **Müslüman nüfuslu bir toprak ilk kez elden çıktı**; 1783'te Rusya Kırım'ı ilhak etti.\n  - Ruslara **Karadeniz'de ticaret** ve İstanbul'da konsolosluk hakkı.\n  - Rusya'ya **Ortodoksların koruyuculuğu** → iç işlere karışma imkânı.\n  - Osmanlı ilk kez **savaş tazminatı** ödemeyi kabul etti.\n\n> **Genel değerlendirme (1683–1789):** Osmanlı Viyana'dan itibaren savunmaya geçti; Karlofça ile başlayan kayıplar Küçük Kaynarca ile **yapısal çözülmeye** dönüştü. Batı'nın askerî üstünlüğü kabul edildi, **diplomasi** ön plana çıktı.",
     "ornekler": [
      {
       "soru": "Küçük Kaynarca Antlaşması'nın Osmanlı için en ağır sonuçları nelerdir?",
       "cozum": "**Kırım'ın kaybı** (Müslüman toprağın ilk kez elden çıkması), Rusya'ya **Ortodoksların koruyuculuğu** ile iç işlere müdahale imkânı verilmesi, Karadeniz'in Türk gölü olmaktan çıkması ve ilk kez **savaş tazminatı** ödenmesi."
      },
      {
       "soru": "Prut ve Belgrad antlaşmalarının ortak özelliği nedir?",
       "cozum": "Her ikisi de Osmanlı'nın **lehine** sonuçlanmış, Rusya'nın **Karadeniz'e inme** politikasını geçici olarak durdurmuştur (Azak'ın geri alınması / Rusya'nın Karadeniz'de gemi bulunduramaması)."
      }
     ],
     "ozet": [
      "Prut 1711: Azak geri alındı.",
      "Pasarofça 1718: Belgrad kaybı, Lale Devri başlangıcı; Belgrad 1739: son kazançlı antlaşma.",
      "Küçük Kaynarca 1774: Kırım bağımsız, Ortodoksların koruyuculuğu."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.2",
    "title": {
     "tr": "Lale Devri (1718–1730)",
     "en": "The Tulip Era (1718–1730)"
    },
    "content": {
     "anlatim": "# Tarihsel Bağlam\n\n**Pasarofça**'dan **Patrona Halil İsyanı**'na kadar, **III. Ahmed**'in saltanatı ve **Nevşehirli Damat İbrahim Paşa**'nın sadrazamlığı dönemi. Adını sonradan **Yahya Kemal** ve **Ahmet Refik (Altınay)** koymuştur. Barış, lale merakı, zevk-eğlence ve **yenileşme arzusu** dönemidir.\n\n**Lale kültürü:** Lale zarafet ve zenginlik sembolü oldu; İstanbul'da yüzlerce lale çeşidi yetiştirildi.\n\n# Avrupa ile Diplomatik Temaslar\n\n- Avrupa'yı tanımak için ilk kez **geçici elçiler** gönderildi.\n- **Yirmisekiz Çelebi Mehmed Efendi** Paris'e gitti; askerî hastaneleri, fabrikaları, rasathaneleri, sosyal hayatı gözlemledi; **Paris Sefâretnâmesi**'ni yazdı.\n\n# İmar, Sosyal Hayat, Yenilikler\n\n| Alan | Gelişme |\n|---|---|\n| Mimari | Versailles ve Fontainebleau'dan esinlenerek Kâğıthane'de **Sadabad Kasrı**; Boğaziçi ve Haliç'te köşkler; **III. Ahmed Çeşmesi** |\n| Sosyal hayat | Çırağan eğlenceleri, helva sohbetleri, mesire yerleri; şair **Nedim**, nakkaş **Levnî** |\n| Teknik ve sağlık | Yangınlara karşı **Tulumbacı Ocağı** (ilk itfaiye); **çiçek aşısı**; kumaş (çuha) ve **çini** (Tekfur Sarayı) atölyeleri |\n| Kültür | Tercüme heyetleri, kütüphaneler |\n\n# İlk Türk Matbaası (1727)\n\n- **İbrahim Müteferrika** ve **Yirmisekizçelebizade Mehmed Said Efendi** kurdu.\n- Şeyhülislamdan **fetva**, padişahtan **ferman** alındı; **dinî kitaplar dışındaki** eserlerin basılmasına izin verildi.\n- İlk basılan eser: **Vankulu Lügati** (sözlük).\n- Gecikme nedenleri: okuryazar azlığı, kâğıt yetersizliği, hattatların geçim endişesi, el yazmasına duyulan estetik değer.\n\n# Patrona Halil İsyanı (1730)\n\nİran seferinin mali yükü, yeni vergiler, saray çevresinin israfına tepki → isyan. **III. Ahmed tahttan indirildi**, Damat İbrahim Paşa öldürüldü; Lale Devri sona erdi.",
     "ornekler": [
      {
       "soru": "Lale Devri'nin 'Batılılaşma hareketlerinin başlangıcı' sayılmasının nedenleri nelerdir?",
       "cozum": "Osmanlı ilk kez Batı'yı **örnek alarak** (geçici elçilikler, sefaretnameler) yenilikler yaptı; **matbaa** kuruldu, mimaride Avrupa etkisi görüldü. Ancak yenilikler askerî alana pek yansımadı, daha çok **sosyal ve kültürel** alanda kaldı."
      }
     ],
     "ozet": [
      "Lale Devri: 1718–1730, III. Ahmed – Damat İbrahim Paşa.",
      "Yirmisekiz Çelebi Paris Sefâretnâmesi; Sadabad.",
      "Matbaa 1727 (Müteferrika, ilk eser Vankulu); Patrona Halil ile son."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.3",
    "title": {
     "tr": "1755 Lizbon ve 1766 İstanbul depremleri",
     "en": "The 1755 Lisbon and 1766 Istanbul earthquakes"
    },
    "content": {
     "anlatim": "# Karşılaştırma\n\n| | **1755 Lizbon** | **1766 İstanbul** |\n|---|---|---|\n| Tarih | 1 Kasım 1755, Azizler Günü | 22 Mayıs 1766, Kurban Bayramı sabahı |\n| Büyüklük (tahmini) | ~8,5–9 | ~7–7,5 |\n| Etkilenen yerler | Lizbon; ardından **yangın** ve **tsunami** | İstanbul, İzmit, Bursa |\n| Kayıp | On binlerce kişi | Birkaç bin kişi |\n| Hasar | Kentin büyük kısmı yıkıldı | **Fatih Camii, Kapalıçarşı**, surlar, Eyüp Sultan Camii ağır hasar |\n| İdari tepki | Kral I. José, **Marquês de Pombal**'a geniş yetki verdi; merkeziyetçi yeniden yapılanma; şehir **ızgara planla** yeniden kuruldu | Sultan **III. Mustafa** yardım ve onarım başlattı; **Mimarbaşı** denetiminde hasar tespiti; fırınlar ve anıtsal yapılar hızla onarıldı |\n| Yapı tekniği | Depreme dayanıklı **gaiola pombalina** (ahşap kafes iskelet) zorunlu tutuldu | **Kâgir** yapılaşma teşvik edildi |\n| Düşünsel etki | **Voltaire** (*Candide*, Lizbon Felaketi Üzerine Şiir) ve **Rousseau** arasında ilahi adalet ve iyimserlik tartışması; modern **sismolojinin** başlangıcı | Yapı denetimi ve onarım bürokrasisi; kayıtların tutulması |\n\n> Ortak ders: Afetler hem **yönetim kapasitesini** sınar hem de **yapı tekniği ve şehircilik** alanında değişimi hızlandırır.",
     "ornekler": [
      {
       "soru": "Pombal'ın Lizbon'daki uygulamalarını afet yönetimi açısından değerlendiriniz.",
       "cozum": "Hızlı ve merkezî kriz yönetimi kurdu, kenti **planlı (ızgara)** biçimde yeniden inşa etti ve **depreme dayanıklı yapı tekniğini** zorunlu kıldı; bu uygulamalar modern afet planlamasının erken örneğidir."
      }
     ],
     "ozet": [
      "Lizbon 1755: deprem + yangın + tsunami; Pombal reformları.",
      "İstanbul 1766: Fatih Camii, Kapalıçarşı hasarı; III. Mustafa onarımları.",
      "Voltaire–Rousseau tartışması."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.4",
    "title": {
     "tr": "Sanayi Devrimi",
     "en": "The Industrial Revolution"
    },
    "content": {
     "anlatim": "# Tanım ve Başlangıç\n\nXVIII. yüzyılın ikinci yarısında **İngiltere**'de başlayan, üretimde **insan ve hayvan gücünden makine ve buhar gücüne** geçiş süreci.\n\n**Neden İngiltere?** Geniş **sömürgeler** (ham madde ve pazar), **kömür ve demir** kaynakları, **sermaye birikimi**, **Tarım Devrimi** ve **çitleme yasaları** ile kente göç eden ucuz iş gücü, siyasi istikrar, deniz ticareti.\n\n# Önemli İcatlar\n\n| Alan | İcat |\n|---|---|\n| Enerji ve metal | **Abraham Darby** – kok kömürüyle demir eritme (1709); **Newcomen** ve **James Watt** – buhar makinesi (Watt'ın geliştirdiği makine, 1769) |\n| Tekstil | **John Kay** – uçan mekik (1733); **Hargreaves** – Spinning Jenny (1765); **Arkwright** – su çerçevesi (1769); Cartwright – mekanik dokuma tezgâhı |\n| Ulaşım | **George Stephenson** – lokomotif (1814, ilk demir yolu 1825); buharlı gemi (Fulton) |\n\n# Sonuçlar\n\n- **Ekonomik:** Seri üretim, ham madde ve **pazar arayışı** → **sömürgecilik** ve emperyalizm; kapitalizmin güçlenmesi.\n- **Sosyal:** Köyden kente göç, **işçi sınıfı (proletarya)** ve **sanayi burjuvazisi**; kadın ve **çocuk işçiliği**; kötü konut koşulları, **kolera** salgınları; gelir uçurumu.\n- **Siyasi ve düşünsel:** **Ludizm** (makine kırıcılığı), **Çartist hareket** (seçim hakkı), **sendikalar**, **sosyalizm** ve komünizm (Marx – *Komünist Manifesto*, 1848).\n- **Osmanlı'ya etkisi:** Avrupa mallarıyla rekabet edemeyen **yerli el tezgâhları çöktü**; Osmanlı **açık pazar** ve ham madde deposu hâline geldi (1838 Balta Limanı Antlaşması bunu hızlandırdı).",
     "ornekler": [
      {
       "soru": "Sanayi Devrimi ile sömürgecilik arasında nasıl bir ilişki vardır?",
       "cozum": "Seri üretim, **daha fazla ham madde** ve üretilen malları satacak **yeni pazarlar** gerektirdi; Avrupa devletleri bu ihtiyaç için Asya ve Afrika'da sömürge yarışına girdi."
      }
     ],
     "ozet": [
      "İngiltere: sömürge, kömür-demir, sermaye, çitleme.",
      "Watt buhar makinesi; tekstilde seri üretim; Stephenson lokomotif.",
      "Sonuç: işçi sınıfı, kentleşme, sosyalizm, sömürgecilik."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.5",
    "title": {
     "tr": "Aydınlanma Çağı ve Amerikan Bağımsızlık Savaşı",
     "en": "The Age of Enlightenment and the American War of Independence"
    },
    "content": {
     "anlatim": "# Aydınlanma (XVIII. yüzyıl)\n\nAklı, bilimi ve bireyi merkeze alan; **gelenek, mutlak monarşi ve kilise otoritesini** sorgulayan düşünce hareketi.\n| Düşünür | Görüş / eser |\n|---|---|\n| **John Locke** | Doğal haklar: **yaşam, özgürlük, mülkiyet**; yönetim halkın rızasına dayanır |\n| **Montesquieu** | **Kanunların Ruhu** — **güçler ayrılığı** (yasama, yürütme, yargı) |\n| **Rousseau** | **Toplum Sözleşmesi** — egemenlik halkındır (**millî egemenlik**) |\n| **Voltaire** | Din ve düşünce özgürlüğü, hoşgörü |\n| **Diderot – d'Alembert** | **Ansiklopedi** — bilginin halka yayılması |\n\n**Etkileri:** Anayasal düzen, insan hakları, laiklik ve demokrasi düşüncesi; Amerikan ve **Fransız İhtilalleri**'ne zemin hazırladı. Bazı hükümdarlar \"**aydın despotlar**\" olarak reform yaptı (II. Frederick, II. Katerina).\n\n# Amerikan Bağımsızlık Savaşı (1775–1783)\n\n- **Nedenler:** İngiltere'nin kolonilere ağır vergiler koyması (**Damga Vergisi**, çay vergisi) → \"**Temsilsiz vergi olmaz**\" ilkesi; **Boston Çay Partisi** (1773).\n- **4 Temmuz 1776: Bağımsızlık Bildirgesi** (Thomas Jefferson) — \"Tüm insanlar eşit yaratılmıştır\"; yaşam, özgürlük ve mutluluk arama hakkı.\n- Fransa'nın desteğiyle kazanıldı; **1783 Paris Antlaşması** ile İngiltere bağımsızlığı tanıdı.\n- **1787 ABD Anayasası:** İlk **yazılı** anayasalardan; **federal** yapı, **güçler ayrılığı**, cumhuriyet. İlk başkan **George Washington**.\n\n**Önemi:** Aydınlanma fikirlerinin **ilk kez bir devlet düzenine** dönüşmesi; sömürgelere bağımsızlık örneği oldu.",
     "ornekler": [
      {
       "soru": "Montesquieu'nun güçler ayrılığı ilkesi ABD Anayasası'na nasıl yansımıştır?",
       "cozum": "Yasama (**Kongre**), yürütme (**Başkan**) ve yargı (**Yüksek Mahkeme**) birbirinden ayrılmış ve birbirini **denetleyecek** biçimde düzenlenmiştir (denge–denetim sistemi)."
      },
      {
       "soru": "“Temsilsiz vergi olmaz” sloganı hangi olayın nedenini açıklar?",
       "cozum": "**Amerikan Bağımsızlık Savaşı**'nın: İngiliz Parlamentosu'nda temsil edilmeyen koloniler, onların koyduğu vergileri meşru saymadı."
      }
     ],
     "ozet": [
      "Aydınlanma: Locke doğal haklar, Montesquieu güçler ayrılığı, Rousseau halk egemenliği.",
      "4 Temmuz 1776 Bağımsızlık Bildirgesi; 1783 Paris Antlaşması.",
      "1787 ABD Anayasası: yazılı, federal, güçler ayrılığı."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Dönüşüm Sürecinde Osmanlı (1789–1908)",
   "en": "Unit 2: The Ottomans in Transformation (1789–1908)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Fransız İhtilali ve etkileri",
     "en": "The French Revolution and its effects"
    },
    "content": {
     "anlatim": "# Fransız İhtilali (1789)\n\n**Nedenler:** Mutlak monarşi, soyluların ve din adamlarının ayrıcalıkları, vergi yükünün halkta olması, mali kriz, **Aydınlanma** düşünürleri (Montesquieu, Rousseau, Voltaire), Amerikan Bağımsızlık Savaşı'nın örnekliği.\n\n- **14 Temmuz 1789 Bastille** baskınıyla başladı.\n- İlkeler: **Özgürlük, Eşitlik, Kardeşlik**.\n- Feodal haklar ve ayrıcalıklar kaldırıldı; **İnsan ve Yurttaş Hakları Bildirgesi** ilan edildi.\n\n# Sonuçlar\n\n- **Milliyetçilik** akımı yayıldı → çok uluslu imparatorlukları (**Osmanlı**, Avusturya-Macaristan, Rusya) sarstı; **ulus-devletlere** zemin hazırladı.\n- **Demokrasi, insan hakları, laiklik, anayasacılık** fikirleri yaygınlaştı.\n- Mutlak monarşiler zayıfladı.\n- **Osmanlı'ya etkisi:** Ayrılıkçı isyanlar ilk olarak **Sırplar** (1804) ve **Rumlar** (1821) arasında başladı.",
     "ornekler": [
      {
       "soru": "Fransız İhtilali Osmanlı Devleti'ni en çok hangi akımla etkilemiştir? Neden?",
       "cozum": "**Milliyetçilik** akımıyla. Osmanlı **çok uluslu** bir yapıya sahip olduğundan, her milletin kendi devletini kurma isteği **dağılma sürecini** hızlandırdı."
      }
     ],
     "ozet": [
      "1789 Bastille: Özgürlük, Eşitlik, Kardeşlik.",
      "İnsan ve Yurttaş Hakları Bildirgesi.",
      "Milliyetçilik çok uluslu imparatorlukları sarstı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2a",
    "title": {
     "tr": "Askerî ıslahatlar, Şark Meselesi ve ayrılıkçı isyanlar",
     "en": "Military reforms, the Eastern Question and separatist revolts"
    },
    "content": {
     "anlatim": "# Islahat Hareketleri (1789–1839)\n\n- **III. Selim – Nizam-ı Cedid:** Batı tarzında yeni ordu, Nizam-ı Cedid hazinesi (İrad-ı Cedid), **Avrupa başkentlerinde daimî elçilikler**, Mühendishane-i Berrî-i Hümâyun (1795). **Kabakçı Mustafa İsyanı** (1807) ile sona erdi.\n- **Sened-i İttifak (1808):** Alemdar Mustafa Paşa ile âyanlar arasında; padişahın yetkisi ilk kez sınırlandı.\n- **II. Mahmud:** **Vaka-i Hayriye (1826)** ile Yeniçeri Ocağı kaldırıldı, **Asakir-i Mansure-i Muhammediye** kuruldu; **nazırlıklar**, **Takvim-i Vekayi** (ilk resmî gazete, 1831), ilk nüfus sayımı (1831), **Mekteb-i Tıbbiye** (1827), Harbiye (1834), fes ve pantolon.\n\n# Şark Meselesi (Doğu Sorunu)\n\nAvrupalı devletlerin Osmanlı topraklarını **paylaşma** ve Türkleri Avrupa'dan çıkarma siyaseti. Terim **1815 Viyana Kongresi**'nde Rus Çarı tarafından gündeme getirildi. Osmanlı, büyük devletlerin rekabetinden yararlanarak **denge siyaseti** izledi.\n\n# Sırp İsyanı (1804)\n\n**Kara Yorgi** önderliğinde; milliyetçilik ve **Rus** kışkırtması. **Bükreş Antlaşması (1812)** ile ayrıcalıklar, **Edirne (1829)** sonrası **özerklik**, **Berlin Antlaşması (1878)** ile **bağımsızlık**. → **Balkanlarda ilk milliyetçi isyan.**\n\n# Yunan İsyanı (1821–1829)\n\n**Etnik-i Eterya (Filiki Eterya)** cemiyetinin kışkırtması; Mora'da (Tripoliçe) Türklere yönelik katliamlar. **Kavalalı Mehmed Ali Paşa**'nın yardımıyla bastırılmak üzereyken İngiltere, Fransa ve Rusya donanması **Navarin**'de Osmanlı-Mısır donanmasını yaktı (1827). **Edirne Antlaşması (1829)** sonrası **1830**'da Yunanistan bağımsız → **Osmanlı'dan ayrılan ilk millet**.\n\n# Mısır Sorunu ve Boğazlar\n\n- **Kavalalı Mehmed Ali Paşa**, Yunan isyanındaki yardımına karşılık Suriye valiliğini isteyip reddedilince isyan etti; **Konya**'da Osmanlı ordusunu yendi, **Kütahya**'ya ilerledi.\n- **Kütahya Antlaşması (1833):** Mısır ve Suriye valiliği Kavalalı'ya bırakıldı.\n- **Hünkâr İskelesi Antlaşması (1833):** Rusya ile; Rusya'nın yardımına karşılık Boğazlar savaş zamanında Rusya'nın düşmanlarına **kapatılacak** → **Boğazlar Sorunu** uluslararası hâle geldi.\n- **1840 Londra Antlaşması:** Mısır valiliği Kavalalı ailesine **babadan oğula** bırakıldı.\n- **1841 Londra Boğazlar Sözleşmesi:** Boğazlar **barış zamanında bütün yabancı savaş gemilerine kapalı**; Boğazlar uluslararası statü kazandı.",
     "ornekler": [
      {
       "soru": "Yunanistan'ın bağımsızlığını kazanmasında büyük devletlerin rolü nedir?",
       "cozum": "İsyan Kavalalı'nın yardımıyla bastırılmak üzereyken **İngiltere, Fransa ve Rusya**, Navarin'de Osmanlı-Mısır donanmasını yakarak isyanı kurtardı ve Yunanistan'ın bağımsızlığına zemin hazırladı."
      },
      {
       "soru": "Hünkâr İskelesi Antlaşması neden Avrupa'da tepkiyle karşılandı?",
       "cozum": "Rusya'ya **Boğazlar üzerinde ayrıcalık** sağladığı için; İngiltere ve Fransa Rusya'nın Akdeniz'e inmesinden çekindi. Böylece Boğazlar meselesi **uluslararası** bir sorun hâline geldi."
      }
     ],
     "ozet": [
      "III. Selim Nizam-ı Cedid; II. Mahmud Vaka-i Hayriye 1826.",
      "Sırp isyanı ilk milliyetçi isyan; Yunanistan ilk bağımsız millet (1830).",
      "Mısır sorunu: Kütahya, Hünkâr İskelesi (1833), Londra (1840–41)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.2b",
    "title": {
     "tr": "Tanzimat, Islahat ve Kırım Savaşı",
     "en": "Tanzimat, Reform Edict and the Crimean War"
    },
    "content": {
     "anlatim": "# Tanzimat Fermanı – Gülhane Hatt-ı Hümâyûnu (1839)\n\n**Mustafa Reşid Paşa** tarafından Gülhane Parkı'nda okundu (Sultan **Abdülmecid**).\n- **Can, mal ve namus güvenliği**\n- Vergilerin herkesin gelirine göre **adil** toplanması\n- **Askerliğin** düzenli ve vatan hizmeti hâline getirilmesi\n- Yargılamaların **açık** yapılması; kanun önünde **Müslüman–gayrimüslim eşitliği**\n- **Padişah ilk kez kendi yetkilerini sınırlandırdı** → **hukuk devletine** geçişin ilk adımı.\n- Amaç: **Osmanlıcılık** fikriyle dağılmayı önlemek, Avrupa'nın iç işlere karışmasını engellemek.\n\n# Kırım Savaşı (1853–1856)\n\n- Rus Çarı I. Nikola, Osmanlı'yı \"**hasta adam**\" olarak nitelendirip İngiltere'ye paylaşma teklif etti; İngiltere reddetti.\n- Nedenler: **Kutsal Yerler** meselesi, Rusya'nın **Eflak-Boğdan**'ı işgali.\n- **İngiltere, Fransa ve Sardunya** Osmanlı yanında savaştı. Florence Nightingale yaralılara baktı.\n- İlk kez **telgraf** kullanıldı; Osmanlı **ilk dış borcunu** aldı (**1854**).\n\n# Islahat Fermanı (1856)\n\nParis Konferansı öncesi Avrupa'nın baskısıyla ilan edildi. **Gayrimüslimlere** kilise ve okul açma, devlet memuru olma, il meclislerine üye olma gibi **geniş haklar** verildi. Müslüman halk arasında tepkilere (**Kuleli Vakası**, 1859) yol açtı.\n\n# Paris Antlaşması (1856)\n\n- Osmanlı **Avrupa devleti** sayıldı; **toprak bütünlüğü** Avrupa'nın **garantisine** alındı.\n- **Karadeniz tarafsız** hâle getirildi (Osmanlı ve Rusya burada donanma bulunduramaz).\n- Islahat Fermanı antlaşmaya konuldu ama Avrupalı devletlerin bunu bahane ederek **iç işlere karışmayacağı** kabul edildi.",
     "ornekler": [
      {
       "soru": "Tanzimat ve Islahat fermanları arasındaki temel fark nedir?",
       "cozum": "**Tanzimat** büyük ölçüde **iç dinamiklerle** ve tüm halkı kapsayan haklar için ilan edildi. **Islahat** ise **Avrupa'nın baskısıyla** ve özellikle **gayrimüslimlere** yeni ayrıcalıklar tanımak amacıyla ilan edildi."
      }
     ],
     "ozet": [
      "Tanzimat 1839: can-mal güvenliği, eşitlik, padişah yetkisi sınırlandı.",
      "Kırım Savaşı: ilk dış borç 1854; telgraf.",
      "Islahat 1856: gayrimüslimlere haklar; Paris: Osmanlı Avrupa devleti."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.2c",
    "title": {
     "tr": "I. Meşrutiyet, 93 Harbi ve Düyûn-ı Umûmiyye",
     "en": "First Constitutional Era, 1877–78 War and the Public Debt Administration"
    },
    "content": {
     "anlatim": "# I. Meşrutiyet ve Kanun-ı Esasi (1876)\n\n- **Yeni (Genç) Osmanlılar** (Namık Kemal, Ziya Paşa) meşrutiyet fikrini yaydı; **Mithat Paşa** öncülüğünde **II. Abdülhamid** tahta çıkarıldı.\n- **23 Aralık 1876**'da ilk Osmanlı anayasası **Kanun-ı Esasi** ilan edildi; **Meclis-i Umumi** (seçimle gelen **Meclis-i Mebusan** + padişahın atadığı **Âyan Meclisi**).\n- **93 Harbi** gerekçesiyle meclis **1878**'de tatil edildi.\n\n# 93 Harbi (1877–1878 Osmanlı–Rus Savaşı)\n\n- **Tersane (İstanbul) Konferansı** kararlarının reddi üzerine Rusya savaş açtı.\n- Kahramanlar: **Plevne**'de **Gazi Osman Paşa**, Kafkasya'da **Gazi Ahmed Muhtar Paşa**, Erzurum'da **Nene Hatun**.\n- Ruslar **Yeşilköy (Ayastefanos)**'e kadar geldi → **Ayastefanos Antlaşması** (Büyük Bulgaristan).\n- İngiltere ve Avusturya'nın itirazıyla **Berlin Kongresi** → **Berlin Antlaşması (1878):**\n  - **Sırbistan, Karadağ, Romanya bağımsız**\n  - **Bulgaristan** üç parçaya ayrıldı, prensliğe özerklik\n  - **Bosna-Hersek** Avusturya yönetimine\n  - **Kars, Ardahan, Batum** Rusya'ya (savaş tazminatı karşılığı)\n  - Ermeni yaşanan bölgelerde **ıslahat** sözü → \"Ermeni meselesi\" uluslararası gündeme girdi\n- Ayrı bir anlaşmayla **Kıbrıs** yönetimi İngiltere'ye bırakıldı (1878).\n- Büyük **göç** dalgaları (Balkanlar ve Kafkasya'dan Anadolu'ya).\n\n# Düyûn-ı Umûmiyye (1881)\n\n- 1854'ten beri alınan dış borçların faizleri ödenemez hâle geldi; **1875**'te mali iflas (moratoryum) ilan edildi.\n- **Muharrem Kararnamesi** (1881) ile **Düyûn-ı Umûmiyye İdaresi** kuruldu; bazı vergilerin (tuz, tütün, ipek, damga, balık, alkol) toplanma yetkisi **Avrupalı alacaklılara** verildi → **ekonomik bağımsızlık zedelendi**.",
     "ornekler": [
      {
       "soru": "Berlin Antlaşması'nın Osmanlı açısından en önemli sonuçları nelerdir?",
       "cozum": "Balkanlarda büyük toprak kayıpları (Sırbistan, Karadağ, Romanya bağımsız; Bosna-Hersek Avusturya'ya), doğuda Kars-Ardahan-Batum'un Rusya'ya bırakılması ve **Ermeni meselesinin** uluslararası gündeme girmesi."
      }
     ],
     "ozet": [
      "Kanun-ı Esasi 1876: ilk anayasa, I. Meşrutiyet.",
      "93 Harbi: Plevne; Ayastefanos → Berlin 1878.",
      "Düyûn-ı Umûmiyye 1881: ekonomik bağımsızlık zedelendi."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.3",
    "title": {
     "tr": "1789–1908 arasında bilim, sanat ve teknoloji",
     "en": "Science, art and technology 1789–1908"
    },
    "content": {
     "anlatim": "# Eğitim ve Bilim\n\n| Kurum | Yıl | Not |\n|---|---|---|\n| **Mühendishane-i Bahrî-i Hümâyun** | 1773/1775 | Deniz mühendis okulu |\n| **Mühendishane-i Berrî-i Hümâyun** | 1795 | Kara mühendis okulu (III. Selim) |\n| **Mekteb-i Tıbbiye** | 1827 | Tıp okulu |\n| **Mekteb-i Harbiye** | 1834 | Harp okulu |\n| **Mekteb-i Mülkiye** | 1859 | Memur yetiştiren okul |\n| **Darülfünun** | 1863 (ilk dersler); 1900 Darülfünun-ı Şahane | İlk üniversite girişimi; bugünkü **İstanbul Üniversitesi** |\n| **Galatasaray Sultanisi (Mekteb-i Sultani)** | 1868 | Fransızca eğitim |\n| **Rasathane-i Âmire** | 1868 | Meteoroloji ve gözlem |\n| **Darülmuallimin** | 1848 | Öğretmen okulu |\n\n# Teknoloji\n\n- **Telgraf** (Kırım Savaşı'ndan itibaren), **demir yolları** (ilk hat İzmir–Aydın 1856; **Anadolu–Bağdat**, **Hicaz** demir yolu 1900–1908).\n- **Fotoğrafçılık**, buharlı gemiler (Şirket-i Hayriye vapurları, 1851), havagazı aydınlatması, Tünel (1875).\n\n# Sanat\n\n- **Batılı tarzda resim** (Osman Hamdi Bey — ilk müze müdürü, Sanayi-i Nefise Mektebi 1882), ampir ve barok etkili mimari (Dolmabahçe Sarayı).\n- **Tanzimat edebiyatı:** ilk özel gazete Tercüman-ı Ahval (1860), roman ve tiyatro türleri.",
     "ornekler": [
      {
       "soru": "Darülfünun'un kurulması Osmanlı modernleşmesi açısından neden önemlidir?",
       "cozum": "Medrese dışında **modern bilimlerin** okutulacağı ilk **üniversite** girişimidir; bugünkü İstanbul Üniversitesi'nin temelini oluşturur ve modern yükseköğretimin başlangıcıdır."
      }
     ],
     "ozet": [
      "Mühendishaneler, Tıbbiye, Harbiye, Mülkiye.",
      "Darülfünun 1863; Rasathane 1868.",
      "Telgraf, demir yolu (Hicaz), fotoğraf; Osman Hamdi."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Savaşlar Sarmalında Osmanlı (1908–1918)",
   "en": "Unit 3: The Ottomans in a Spiral of Wars (1908–1918)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1a",
    "title": {
     "tr": "II. Meşrutiyet, 31 Mart, Trablusgarp ve Balkan Savaşları",
     "en": "Second Constitutional Era, 31 March, Tripoli and Balkan Wars"
    },
    "content": {
     "anlatim": "# II. Meşrutiyet (1908)\n\n- **Reval Görüşmeleri** (İngiltere–Rusya, Osmanlı'nın paylaşılması kaygısı) sonrası **İttihat ve Terakki Cemiyeti**'nin baskısı; **Resneli Niyazi** ve **Enver Bey** dağa çıktı.\n- **II. Abdülhamid**, Kanun-ı Esasi'yi yeniden yürürlüğe koydu (23 Temmuz 1908) → **çok partili hayat** başladı.\n- Fırsattan yararlananlar: **Bulgaristan bağımsızlığını** ilan etti; **Avusturya Bosna-Hersek'i ilhak** etti; **Girit** Yunanistan'a bağlandığını ilan etti.\n\n# 31 Mart Olayı (13 Nisan 1909)\n\nMeşrutiyet karşıtı ayaklanma; Selanik'ten gelen **Mahmud Şevket Paşa** komutasındaki **Hareket Ordusu** (kurmay başkanı **Mustafa Kemal**) tarafından bastırıldı. **II. Abdülhamid tahttan indirildi**, yerine **V. Mehmed Reşad** geçti; Kanun-ı Esasi'de değişikliklerle padişahın yetkileri azaltıldı.\n\n# Trablusgarp Savaşı (1911–1912)\n\n- Siyasi birliğini geç tamamlayan **İtalya**'nın sömürge arayışı; Osmanlı'nın **Kuzey Afrika'daki son toprağı**.\n- Osmanlı **donanma gönderemediği** için gönüllü subaylar (**Mustafa Kemal** – Derne ve Tobruk; **Enver Bey**) gizlice bölgeye gitti, yerel halkı teşkilatlandırdı.\n- I. Balkan Savaşı'nın çıkması üzerine **Uşi (Ouchy) Antlaşması (1912)**: Trablusgarp ve Bingazi İtalya'ya; **On İki Ada** geçici olarak İtalya'da kaldı.\n\n# Balkan Savaşları (1912–1913)\n\n- **I. Balkan Savaşı:** **Bulgaristan, Sırbistan, Yunanistan, Karadağ** ittifakı (Rusya desteği). Osmanlı ordusunda siyasi çekişmeler ve **terhisler** nedeniyle ağır yenilgi; **Selanik**, Edirne ve tüm Rumeli'nin büyük kısmı kaybedildi. **Bâbıâli Baskını (Ocak 1913)** ile İttihatçılar iktidarı aldı. **Londra Antlaşması (1913):** Midye–Enez hattının batısı kaybedildi; **Arnavutluk** bağımsız oldu.\n- **II. Balkan Savaşı:** Paylaşımda anlaşamayan Bulgaristan'a karşı diğerleri ve Romanya savaştı; **Enver Bey** komutasındaki ordu **Edirne ve Kırklareli**'ni geri aldı. **İstanbul Antlaşması (1913)** Bulgaristan ile; **Atina Antlaşması** (1913) Yunanistan ile.",
     "ornekler": [
      {
       "soru": "Trablusgarp'ın kaybedilmesinde Osmanlı'nın coğrafi ve askerî dezavantajı neydi?",
       "cozum": "Trablusgarp'a kara bağlantısı yoktu (Mısır İngiliz denetimindeydi) ve Osmanlı **donanması İtalya'ya göre zayıftı**; bu yüzden düzenli asker gönderilemedi, yalnızca gönüllü subaylar gizlice ulaşabildi."
      }
     ],
     "ozet": [
      "II. Meşrutiyet 1908: Bulgaristan bağımsız, Bosna ilhak.",
      "31 Mart 1909: Hareket Ordusu, II. Abdülhamid tahttan indirildi.",
      "Uşi 1912; Balkan Savaşları: Rumeli kaybı, Edirne geri alındı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.1b",
    "title": {
     "tr": "I. Dünya Savaşı ve Osmanlı cepheleri",
     "en": "World War I and Ottoman fronts"
    },
    "content": {
     "anlatim": "# Nedenler\n\n- Sanayi Devrimi sonrası **ham madde ve pazar** rekabeti, **sömürgecilik**\n- **Bloklaşma:** **Üçlü İttifak** (Almanya, Avusturya-Macaristan, İtalya) – **Üçlü İtilaf** (İngiltere, Fransa, Rusya)\n- **Silahlanma yarışı**, **milliyetçilik**\n- **Kıvılcım:** **Saraybosna**'da Avusturya veliahdı Franz Ferdinand'ın bir Sırp milliyetçisince öldürülmesi (28 Haziran 1914)\n\n> İtalya savaş başlayınca tarafsız kaldı, 1915'te **İtilaf** safına geçti.\n\n# Osmanlı'nın Savaşa Girişi\n\nYalnızlıktan kurtulmak için önce İtilaf'a başvurdu, reddedilince **Almanya** ile gizli ittifak (**2 Ağustos 1914**). İngiliz donanmasından kaçan **Goeben** ve **Breslau** gemileri satın alınmış gösterilerek **Yavuz** ve **Midilli** adını aldı; Rus limanlarını bombalayınca Osmanlı fiilen savaşa girdi (**Kasım 1914**).\n\n# Cepheler\n\n| Cephe | Tür | Önemli olaylar |\n|---|---|---|\n| **Kafkas** | Taarruz | **Sarıkamış Harekâtı** (1914–15): ağır kış, lojistik eksiklik, büyük kayıp. **Mustafa Kemal Muş ve Bitlis'i** geri aldı (1916). **Brest-Litovsk (1918)** ile Kars, Ardahan, Batum geri alındı |\n| **Kanal** | Taarruz | Süveyş'i alarak İngiltere'nin **Hindistan yolunu** kesmek amaçlı; **Cemal Paşa**; başarısız |\n| **Çanakkale** | Savunma | **18 Mart 1915** deniz zaferi (**Nusret** mayın gemisi); kara savaşları: **Arıburnu, Anafartalar** — Mustafa Kemal: \"Ben size taarruzu değil, ölmeyi emrediyorum.\" |\n| **Irak** | Savunma | **Kut'ül-Amâre** (29 Nisan 1916): General Townshend ve İngiliz kuvvetleri esir; sonra **Bağdat** kaybedildi (1917) |\n| **Hicaz-Yemen** | Savunma | **Şerif Hüseyin**'in İngilizlerle iş birliği ve isyanı; **Fahreddin Paşa**'nın **Medine Müdafaası** — Mondros'tan sonra da sürdü (Ocak 1919) |\n| **Filistin-Suriye** | Savunma | Gazze ve Kudüs'ün kaybı; **Yıldırım Orduları** (Mustafa Kemal) İngiliz ilerleyişini **Halep kuzeyinde** durdurdu |\n| **Yardım cepheleri** | — | Galiçya, Makedonya, Romanya |\n\n# Çanakkale Zaferi'nin Sonuçları\n\nİstanbul'un işgali önlendi; Rusya'ya yardım ulaşamadı → **Bolşevik İhtilali**ne zemin; savaş uzadı; **Bulgaristan** İttifak safında savaşa girdi; **Mustafa Kemal** öne çıktı; Anzak ülkelerinde (Avustralya, Yeni Zelanda) millî bilinç güçlendi.\n\n# Kafkas İslam Ordusu (1918)\n\n**Nuri Paşa** komutasında; Azerbaycan ve Dağıstan'daki Türk ve Müslümanları korumak için. **15 Eylül 1918**'de **Bakü** kurtarıldı; Azerbaycan Cumhuriyeti'nin bağımsızlığı desteklendi.",
     "ornekler": [
      {
       "soru": "Çanakkale Zaferi'nin I. Dünya Savaşı'nın gidişatına etkileri nelerdir?",
       "cozum": "Boğazlar kapalı kaldığı için **Rusya'ya yardım** ulaşmadı; Rusya'da ekonomik çöküş ve **Bolşevik İhtilali** hızlandı. Savaş **uzadı**, Bulgaristan İttifak devletlerine katıldı ve İstanbul'un işgali önlendi."
      }
     ],
     "ozet": [
      "Nedenler: sömürgecilik, bloklar, milliyetçilik; kıvılcım Saraybosna.",
      "Yavuz ve Midilli ile savaşa giriş (1914).",
      "Cepheler: Kafkas, Kanal, Çanakkale, Irak, Hicaz, Filistin."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.2",
    "title": {
     "tr": "Göçler, salgınlar, Sevk ve İskân Kanunu, Mondros",
     "en": "Migrations, epidemics, Relocation Law, Armistice of Mudros"
    },
    "content": {
     "anlatim": "# Kitlesel Göçler ve Salgınlar\n\nBalkan Savaşları ve I. Dünya Savaşı sırasında kaybedilen topraklardan Anadolu'ya büyük **muhacir** göçleri yaşandı. Göç yollarında açlık ve hijyen eksikliği nedeniyle **kolera, tifüs**, dizanteri gibi salgınlar on binlerce kişinin ölümüne yol açtı.\n- **İskân-ı Aşâir ve Muhacirîn Müdüriyeti** (1913) göçmenlerin yerleştirilmesini yönetti.\n- **Hilâl-i Ahmer Cemiyeti** (Kızılay, 1868'de kuruldu) yaralı ve göçmenlere yardım etti.\n\n# Sevk ve İskân Kanunu (Tehcir – 27 Mayıs 1915)\n\n**Ders kitabındaki gerekçe:** Doğu Anadolu'da Rus ordusuyla iş birliği yapan **Ermeni komitalarının** (Hınçak, Taşnak) isyanları, köylere baskınlar ve ordunun ikmal yollarını tehdit etmesi.\n- **24 Nisan 1915:** Komita merkezleri kapatıldı, yöneticileri tutuklandı.\n- **27 Mayıs 1915:** Savaş bölgelerindeki Ermeniler **Suriye ve Musul** bölgelerine sevk edildi.\n- Kitapta, sevkiyatta güvenlik önlemleri alındığı ve suistimal edenlerin **askerî mahkemelerde** yargılandığı vurgulanır.\n\n> **Tartışmalı bir konu:** Türkiye'nin resmî görüşü ve ders kitabı, tehciri olağanüstü savaş koşullarında alınmış bir **güvenlik tedbiri** olarak değerlendirir ve \"soykırım\" nitelendirmesini reddeder; arşivlerin açılmasını ve ortak tarih komisyonu kurulmasını önerir. Buna karşılık birçok tarihçi ve bazı ülkelerin parlamento ya da hükümetleri, sevk sırasında yaşanan toplu ölümleri **soykırım** olarak nitelendirir. Sınavlarda ders kitabındaki gerekçe ve tarihler sorulur.\n\n# Mondros Ateşkes Antlaşması (30 Ekim 1918)\n\n**Neden:** Cephelerdeki yenilgiler; **Bulgaristan'ın savaştan çekilmesiyle** Almanya ile kara bağlantısının kesilmesi.\n- **7. madde:** İtilaf devletleri **güvenliklerini tehdit eden** herhangi bir stratejik noktayı işgal edebilecek.\n- **24. madde:** **Vilayet-i Sitte**'de (altı doğu ili) karışıklık çıkarsa buralar işgal edilebilecek.\n- Ordu terhis edilecek, Boğazlar açılacak, haberleşme ve demir yolları İtilaf denetimine geçecek.\n→ Osmanlı toprakları **işgallere açık** hâle geldi; Millî Mücadele'nin zemini oluştu.",
     "ornekler": [
      {
       "soru": "Mondros'un 7. maddesi neden en tehlikeli madde olarak kabul edilir?",
       "cozum": "'Güvenliği tehdit eden durum' ifadesi **belirsiz** olduğundan İtilaf devletlerine, istedikleri her yeri **gerekçe uydurarak işgal** etme imkânı verdi."
      }
     ],
     "ozet": [
      "Balkan ve I. Dünya Savaşı göçleri; kolera ve tifüs.",
      "Sevk ve İskân Kanunu 27 Mayıs 1915; konu tartışmalıdır.",
      "Mondros 30 Ekim 1918: 7. ve 24. maddeler işgallere zemin."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.3",
    "title": {
     "tr": "Osmanlı Devleti'nin insanlık tarihine katkıları",
     "en": "Ottoman contributions to human history"
    },
    "content": {
     "anlatim": "# Siyasi ve Toplumsal Miras\n\n- **Pax Ottomana (Osmanlı barışı):** Üç kıtada farklı din, dil ve etnik toplulukların **inanç özgürlüğü** içinde bir arada yaşaması; **millet sistemi**.\n- **İstimâlet politikası:** Fethedilen bölge halkının **gönlünü kazanma**, adil vergi ve hoşgörü.\n- **Hukuk ve adalet:** **Kanuni Sultan Süleyman**'ın kanunnameleri; ABD Temsilciler Meclisi salonundaki büyük kanun koyucular rölyefleri arasında yer alır.\n- **Vakıf medeniyeti:** Cami, medrese, imaret, darüşşifa, çeşme, kervansaray — sosyal devlet anlayışının erken örnekleri.\n\n# Kültür, Sanat ve Bilim\n\n- **Mehter:** Avrupa askerî bandolarını etkiledi; **Mozart** (*Rondo alla Turca*) ve **Beethoven** (*Türk Marşı*) \"alla turca\" eserler besteledi.\n- **Turquerie** modası: Avrupa saray ve aristokrasisinde Türk halıları, kemha-kadife kumaşlar, kıyafetler ve iç mekân süslemeleri.\n- **Mimari:** Mimar Sinan'ın eserleri (Süleymaniye, Selimiye); Balkanlarda köprüler (Mostar, Vişegrad).\n- **Piri Reis Haritası (1513):** Amerika kıyılarını gösteren en eski haritalardan; **UNESCO Dünya Belleği** listesinde.\n- **Mutfak ve sosyal hayat:** **Kahve ve kahvehane** kültürü Avrupa'ya yayıldı; lokum, şerbet, dolma, yoğurt.\n- **Çiçek aşısı:** İstanbul'daki aşılama uygulaması, Lady Montagu aracılığıyla İngiltere'ye tanıtıldı (1721).\n\n# Ünite Özeti\n\n| Ünite | Dönem | Temel odak |\n|---|---|---|\n| 1 | 1683–1789 | Gerileme ve antlaşmalar, Lale Devri, depremler, Sanayi Devrimi |\n| 2 | 1789–1908 | Fransız İhtilali, milliyetçilik, ıslahatlar, Meşrutiyet, Düyûn-ı Umûmiyye |\n| 3 | 1908–1918 | Trablusgarp, Balkan Savaşları, I. Dünya Savaşı, göçler, Osmanlı mirası |",
     "ornekler": [
      {
       "soru": "İstimâlet politikası Osmanlı'nın Balkanlarda uzun süre kalıcı olmasını nasıl sağlamıştır?",
       "cozum": "Fethedilen halkın **dinine, diline ve geleneklerine** dokunulmaması, adil vergi ve güvenlik sağlanması halkın **gönlünü kazandı**; bu da isyanları azaltıp yönetimi kalıcı hâle getirdi."
      }
     ],
     "ozet": [
      "Pax Ottomana, istimâlet, millet sistemi.",
      "Kanuni'nin kanunları; vakıf medeniyeti.",
      "Mehter–alla turca, Turquerie, Piri Reis haritası, kahve kültürü."
     ]
    }
   },
   {
    "id": "k5",
    "code": "3.4",
    "title": {
     "tr": "I. Dünya Savaşı'nın sonu: Wilson İlkeleri, Paris Barış Konferansı ve antlaşmalar",
     "en": "End of World War I: Wilson's Points, the Paris Peace Conference and treaties"
    },
    "content": {
     "anlatim": "# Wilson İlkeleri (Ocak 1918)\n\nABD Başkanı **Woodrow Wilson**'ın 14 maddelik barış önerisi. Önemli maddeler:\n- **Gizli antlaşmalar yapılmaması**, denizlerin serbestliği, silahsızlanma.\n- **Milletlerin kendi geleceklerini belirleme (self-determinasyon) hakkı.**\n- **12. madde:** Osmanlı'nın **Türk bölgelerine** egemenlik hakkı; diğer milletlere özerklik; **Boğazların** tüm devletlere açık olması.\n- Uluslararası barışı koruyacak bir örgüt → **Milletler Cemiyeti** (1920).\n\nOsmanlı Devleti, **Mondros Ateşkesi**'ni (30 Ekim 1918) bu ilkelere güvenerek imzaladı; ancak ilkeler İtilaf Devletleri'nce uygulanmadı.\n\n# Paris Barış Konferansı (1919)\n\nGalip devletler (İngiltere, Fransa, ABD, İtalya) yenilenlerle yapılacak antlaşmaları belirledi; **İzmir'in Yunanlara işgali** burada kararlaştırıldı; Osmanlı topraklarında **manda (yönetim) sistemi** benimsendi.\n\n# Antlaşmalar\n\n| Antlaşma | Devlet | Önemli hükümler |\n|---|---|---|\n| **Versay** (1919) | Almanya | Ağır savaş tazminatı, ordunun sınırlandırılması, sömürgelerini kaybetti → **II. Dünya Savaşı'na zemin** |\n| **Saint-Germain** (1919) | Avusturya | Avusturya–Macaristan dağıldı |\n| **Nöyyi** (1919) | Bulgaristan | Ege'ye çıkışını kaybetti |\n| **Trianon** (1920) | Macaristan | Topraklarının büyük kısmını kaybetti |\n| **Sevr** (10 Ağustos 1920) | Osmanlı | Ölü doğmuş antlaşma; **TBMM tanımadı**, hiçbir zaman uygulanmadı |\n\n# Sonuçlar\n\nDört imparatorluk yıkıldı (Osmanlı, Avusturya–Macaristan, Rus, Alman); yeni ulus devletler kuruldu; ABD ve SSCB'nin yükselişi başladı.",
     "ornekler": [
      {
       "soru": "Osmanlı Devleti Mondros Ateşkesi'ni imzalarken Wilson İlkelerinin hangi maddesine güvenmişti?",
       "cozum": "**12. maddeye**: Türklerin çoğunlukta olduğu bölgelerde Türk egemenliğinin tanınması."
      },
      {
       "soru": "Versay Antlaşması'nın II. Dünya Savaşı'na zemin hazırlamasının nedeni nedir?",
       "cozum": "Almanya'ya **ağır tazminat**, toprak kaybı ve askerî kısıtlamalar getiren **ağır ve cezalandırıcı** şartlar, Alman toplumunda öfke ve intikam duygusu doğurmuş; Hitler'in yükselişine zemin hazırlamıştır."
      }
     ],
     "ozet": [
      "Wilson İlkeleri: self-determinasyon, 12. madde Türk bölgeleri.",
      "Paris Barış Konferansı: manda sistemi, İzmir'in Yunanlara verilmesi.",
      "Versay–Almanya, Sevr–Osmanlı (uygulanmadı)."
     ]
    }
   }
  ]
 }
];
