/* =========================================================
   11. Sınıf Biyoloji — kapsamlı ders notları
   Kaynak: kullanıcının verdiği "11. Sınıf Biyoloji Ders Kitabı Kapsamlı Notlar" (2 tema: Tepki, Homeostazi).
   Kazanım kodları kaynaktaki bölüm numaralarıdır; Tepki teması üç üniteye bölündü. Eklenenler: oligodendrosit, Na⁺-K⁺ pompası, sempatik/parasempatik, kasılmada Ca²⁺ ve ATP rolü, endokrin bezler tablosu, nefron işleyişi. Koleoptil deneylerine araştırmacı adları eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["11/biyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema (A): Canlılarda ve Bitkilerde Tepki",
   "en": "Theme 1 (A): Responses in Organisms and Plants"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Canlıların uyaranlara tepki mekanizmaları",
     "en": "How organisms respond to stimuli"
    },
    "content": {
     "anlatim": "# Tepki Sürecinin Evrensel Basamakları\n\nCanlılar iç ve dış ortamdaki fiziksel ya da kimyasal değişimleri (**uyaran**: ışık, sıcaklık, basınç, su, kimyasallar) algılayıp yanıt verir; bu, hayatta kalmayı ve **adaptasyonu** kolaylaştırır.\n\n1. **Uyarının alınması:** Hücre ya da özel yapılar (**reseptörler**) değişimi algılar.\n2. **Uyarının işlenmesi:** Bilgi değerlendirilir (sinir sistemi, kimyasal haberleşme).\n3. **Tepki (yanıt):** Uygun hücre, doku ya da organ etkinleşir.\n\n- **Hayvanlarda:** Sinir sistemi + hormonlar → hızlı tepki.\n- **Bitkilerde:** Sinir sistemi yok → **elektriksel sinyaller, turgor basıncı değişimi, hormonlar**.\n\n**Hormon:** Düşük derişimde üretilen, hedef hücrelere ulaşıp **özgül** yanıt oluşturan kimyasal haberci.\n\n# Tepki Örnekleri\n\n| Canlı | Tepki |\n|---|---|\n| **Öglena** | **Göz lekesi** ile ışığı algılar, fotosentez için ışığa yönelir |\n| **Amip** | Işıktan uzaklaşır, loş ortamı tercih eder |\n| **Venüs sinekkapan, güneşgülü** | Tüylere dokunulunca **sismonasti** ve turgor değişimiyle kapanır; böceği sindirerek **azot** gibi mineralleri karşılar |\n| **Uyku çiçeği** | Yapraklarını gündüz açar, gece kapatır |\n| **Denizşakayığı** | Dokunulunca gövdesini büzer, tentaküllerini çeker |\n| **Elektrikli yılan balığı** | Tehlikede elektrik boşaltır |\n| **Baykuş** | Az ışıkta göz bebeği genişler |\n| **Köpek** | Koku reseptörleriyle iz sürer, tükürük salgılar |",
     "ornekler": [
      {
       "soru": "Böcekçil bitkilerin böcek yakalamasının adaptif değeri nedir?",
       "cozum": "Bu bitkiler genellikle **azotça fakir** topraklarda yaşar. Fotosentezle besin üretebilirler ama protein sentezi için gereken **azot ve mineralleri** böceklerden sağlarlar."
      }
     ],
     "ozet": [
      "Tepki: alma → işleme → yanıt.",
      "Hayvan: sinir + hormon; bitki: elektriksel sinyal, turgor, hormon.",
      "Öglena ışığa yönelir, amip kaçar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Bitkisel hormonlar",
     "en": "Plant hormones"
    },
    "content": {
     "anlatim": "# Bitkisel Hormonlar\n\nAktif büyüyen **kök ve gövde uçlarında**, tomurcuk, tohum, meyve ve genç yapraklarda üretilir; **iletim demetleri** ya da **difüzyon** ile taşınır.\n\n| Hormon | Üretim yeri | Etkileri | Tarımsal kullanım |\n|---|---|---|---|\n| **Oksin** | Sürgün ucu, genç yapraklar | Hücre **boyca uzaması**, fototropizma (gölgede birikir), **yan kök** oluşumu, meyve gelişimi (çilekte akenler); **tepe baskınlığı** (yan tomurcukları baskılar) | Çeliklerin köklendirilmesi, **çekirdeksiz meyve** |\n| **Sitokinin** | Kök, aktif büyüyen dokular | **Sitokinez**, yan tomurcukların gelişmesi (**dallanma**), klorofil sentezi, **yaşlanmayı geciktirme** | Kesme çiçek ve sebzelerin raf ömrünü uzatma |\n| **Giberellin** | Genç yaprak, tohum | **Tohum çimlenmesi**, dormansinin kırılması, **gövde uzaması** (eksikliğinde cücelik), çiçeklenme | Üzüm tanelerinin irileşmesi ve seyreltilmesi |\n| **Absisik asit (ABA)** | Yaprak, tohum | **Stres hormonu**: kuraklıkta **stomaları kapatır**; tomurcuk ve tohum **dormansisini** sağlar; büyümeyi engeller | — |\n| **Etilen** | Tüm organlar; en çok **olgunlaşan meyve** ve yaşlı doku | **Gaz** hâlinde tek hormon; meyve **olgunlaşması** (nişasta → şeker, yumuşama), yaprak ve meyve **dökümü** | Ham meyvelerin yapay olgunlaştırılması |\n\n> **Etkileşim:** Oksin/sitokinin oranı kök ve sürgün gelişimini belirler (oksin ↑ → kök; sitokinin ↑ → sürgün). Giberellin ile ABA çimlenmede **zıt** etki gösterir.\n\n**Bitki gelişim düzenleyicileri (BGD):** Doğal ya da sentetik; yanlış ve aşırı kullanımı insan sağlığına ve ekosisteme zarar verebilir.",
     "ornekler": [
      {
       "soru": "Bir torbaya olgun bir muzla birlikte ham avokado konulursa ne olur? Neden?",
       "cozum": "Avokado **daha hızlı olgunlaşır**. Olgun muz **etilen** gazı yayar; gaz difüzyonla avokadoya ulaşarak olgunlaşmayı hızlandırır."
      },
      {
       "soru": "Kurak bir günde yapraklardaki stomaların kapanmasını hangi hormon sağlar?",
       "cozum": "**Absisik asit (ABA)**; su kaybını azaltır."
      }
     ],
     "ozet": [
      "Oksin uzama ve yönelim; sitokinin bölünme ve dallanma.",
      "Giberellin çimlenme ve boy; ABA stres ve dormansi.",
      "Etilen gaz hâlinde; olgunlaşma ve döküm."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Bitkilerde hareket: tropizma, nasti ve koleoptil deneyleri",
     "en": "Plant movements: tropisms, nastic movements and coleoptile experiments"
    },
    "content": {
     "anlatim": "# Tropizma (Yönelim)\n\nUyaranın **yönüne bağlı** büyüme hareketleri; **oksin** kontrolünde, **geri dönüşümsüz**. Uyarana doğru **(+)**, ters yönde **(−)**.\n\n| Tür | Uyaran | Örnek |\n|---|---|---|\n| **Fototropizma** | Işık | Gövde (+), kök (−) |\n| **Geotropizma (gravitropizma)** | Yer çekimi | Kök (+), gövde (−) |\n| **Hidrotropizma** | Su | Kök suya doğru (+); çoğu durumda geotropizmaya baskın gelir |\n| **Kemotropizma** | Kimyasal | Kök gübreye (+), tuz ve kireçten uzak (−); polen tüpünün yumurtalığa yönelmesi |\n| **Tigmotropizma (haptotropizma)** | Dokunma | Sarmaşık ve asma dallarının desteğe sarılması |\n\n# Nasti (Irganım)\n\nUyaranın **yönünden bağımsız**; çoğunlukla **turgor basıncı** değişimiyle, hızlı ve **geri dönüşümlü**. (+)/(−) yoktur.\n\n| Tür | Uyaran | Örnek |\n|---|---|---|\n| **Fotonasti** | Işık şiddeti | Akşamsefası çiçeklerinin loşlukta açılması |\n| **Sismonasti** | Dokunma, sarsıntı | **Küstüm otu**, Venüs sinekkapan |\n| **Termonasti** | Sıcaklık | **Lale** çiçeklerinin ılıkta açılıp soğukta kapanması |\n\n# Koleoptil Deneyleri ve Oksinin Keşfi\n\n**Koleoptil:** Tahıl fidelerinin ilk yaprağını saran kılıf.\n\n| Deney | Yapılan | Sonuç |\n|---|---|---|\n| **Darwin'ler (1880)** | Uç kesildi ya da opak başlıkla kapatıldı → yönelim **yok**; saydam başlık ya da tabanı örten opak kılıf → yönelim **var** | Işığı **koleoptil ucu** algılar |\n| **Boysen-Jensen (1913)** | Uç ile gövde arasına **mika** → yönelim yok; **jelatin** → yönelim var | Sinyal **hareketli bir kimyasal**dır |\n| **Paal (1918)** | Kesilen uç gövdenin bir yanına konuldu (karanlıkta) | Kimyasalın biriktiği **karşı** yöne bükülme |\n| **Went (1926)** | Uçlar **agar** üzerinde bekletildi, agar gövdenin bir yanına kondu | Karanlıkta bile bükülme → maddeye **oksin** adı verildi |\n\n**Mekanizma:** Tek yönlü ışıkta oksin **gölge tarafa** taşınır → gölge taraftaki hücreler daha çok uzar → gövde **ışığa doğru** bükülür.\n\n> Kökte yüksek oksin derişimi büyümeyi **yavaşlatır**; bu yüzden kök ve gövde aynı uyarana zıt yönelir.",
     "ornekler": [
      {
       "soru": "Pencere kenarındaki bir saksı bitkisinin gövdesi pencereye doğru eğilmişse, gövdenin hangi tarafındaki hücreler daha uzundur? Neden?",
       "cozum": "**Pencereye uzak (gölge) taraftaki** hücreler daha uzundur. Oksin gölge tarafta birikir ve orada hücre uzamasını artırır, gövde ışığa doğru bükülür."
      },
      {
       "soru": "Küstüm otunun yapraklarını kapatması neden tropizma değil nastidir?",
       "cozum": "Hareket uyaranın **yönüne bağlı değildir**, **turgor basıncındaki** ani değişimle olur ve **geri dönüşümlüdür**; büyümeye dayalı değildir."
      }
     ],
     "ozet": [
      "Tropizma: yöne bağlı, büyüme, oksin, (+)/(−).",
      "Nasti: yönden bağımsız, turgor, geri dönüşümlü.",
      "Darwin uç, Boysen-Jensen kimyasal, Went oksin."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "1. Tema (B): Hayvanlarda Tepki — Sinir Sistemi ve Duyular",
   "en": "Theme 1 (B): Animal Responses — Nervous System and Senses"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.5a",
    "title": {
     "tr": "Duyu reseptörleri, nöron yapısı, impuls ve sinaps",
     "en": "Sensory receptors, neurons, impulses and synapses"
    },
    "content": {
     "anlatim": "# Duyu Reseptörleri\n\n| Reseptör | Algıladığı | Yer |\n|---|---|---|\n| **Mekanoreseptör** | Dokunma, basınç, gerilme, ses | Deri, kulak |\n| **Kemoreseptör** | Kimyasallar, koku, tat | Burun, dil, damarlar |\n| **Termoreseptör** | Sıcaklık | Deri, hipotalamus |\n| **Nosiseptör (ağrı)** | Doku hasarı, aşırı sıcak, kimyasal | **Beyin dokusu hariç** tüm vücut |\n| **Elektromanyetik / fotoreseptör** | Işık, elektrik, manyetizma | Gözde **çubuk ve koni** hücreleri |\n\nHayvanlarda örnekler: **yayın balığı** tüm vücuduyla tat alır; **yusufçuk** ~30 bin gözcüklü bileşik gözüyle hareketi çok iyi algılar; **yunuslar** ekolokasyon kullanır; **çukur engerekler** pit organlarıyla avın ısısını algılar.\n\n# Nöronun Yapısı\n\n- **Hücre gövdesi:** Çekirdek, mitokondri, nörofibriller.\n- **Dendrit:** Uyartıyı gövdeye taşıyan kısa, çok sayıda uzantı.\n- **Akson:** Uyartıyı diğer hücreye ileten uzun uzantı.\n- **Miyelin kılıf:** Çevresel sinir sisteminde **Schwann**, merkezî sinir sisteminde **oligodendrosit** hücrelerince oluşturulan yalıtkan örtü.\n- **Ranvier boğumu:** Miyelinin kesintili olduğu yer → **sıçrayarak (atlamalı) iletim** → hız artar.\n- İletim yönü: **Dendrit → hücre gövdesi → akson ucu**.\n\n# Uyartı İletimi (Elektrokimyasal)\n\n| Evre | Olay | Zar |\n|---|---|---|\n| **Polarizasyon (dinlenme)** | Na⁺-K⁺ pompası (ATP) 3 Na⁺ dışarı, 2 K⁺ içeri | Dış (+), iç (−) ≈ −70 mV |\n| **Depolarizasyon** | Na⁺ kanalları açılır, **Na⁺ içeri** girer | İç (+) — aksiyon potansiyeli |\n| **Repolarizasyon** | K⁺ kanalları açılır, **K⁺ dışarı** çıkar | İç tekrar (−) |\n| Dinlenmeye dönüş | Na⁺-K⁺ pompası iyon dağılımını eski hâline getirir | ATP harcanır |\n\n**Ya hep ya hiç:** Tek nöron ya da kas teli **eşik altı** uyarana yanıt vermez; eşik ve üzeri uyaranlara **aynı şiddette** yanıt verir. Sinir demetinde eşikleri farklı aksonlar olduğu için **merdiven etkisi** görülür.\n\n# Sinaps\n\n1. Akson ucuna gelen uyartı, keseciklerdeki **nörotransmitterleri** (asetilkolin, dopamin, serotonin…) **ekzositozla** sinaps boşluğuna bırakır.\n2. Nörotransmitter karşı hücrenin **reseptörlerine** bağlanır.\n3. Karşı hücrede yeni aksiyon potansiyeli başlar (**uyarıcı** sinaps) ya da baskılanır (**engelleyici** sinaps).\n4. Nörotransmitter **enzimle parçalanır** ya da geri alınır.\n\nSinapslar iletimi **tek yönlü** kılar ve bir miktar **yavaşlatır**.",
     "ornekler": [
      {
       "soru": "Miyelinli nöronlarda iletimin daha hızlı olmasının nedeni nedir?",
       "cozum": "Miyelin **yalıtkandır**; aksiyon potansiyeli yalnızca **Ranvier boğumlarında** oluşur ve uyartı boğumdan boğuma **sıçrayarak** ilerler."
      },
      {
       "soru": "Bir nöronda dinlenme hâlinde ATP üretimi durursa ne olur?",
       "cozum": "**Na⁺-K⁺ pompası** çalışamaz; iyon dağılımı zamanla eşitlenir, dinlenme potansiyeli kaybolur ve nöron yeni uyartı iletemez hâle gelir."
      }
     ],
     "ozet": [
      "Reseptörler: mekano, kemo, termo, nosi, foto.",
      "Depolarizasyon Na⁺ içeri; repolarizasyon K⁺ dışarı; pompa ATP harcar.",
      "Sinaps: nörotransmitter, tek yönlü iletim."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.5b",
    "title": {
     "tr": "İnsanda duyu organları: göz, kulak, burun, dil, deri",
     "en": "Human sense organs"
    },
    "content": {
     "anlatim": "# Göz\n\n| Tabaka | Yapılar |\n|---|---|\n| **Sert tabaka (sklera)** | Dışta beyaz bağ doku; önde saydam **kornea** (ışığı ilk kıran yer) |\n| **Damar tabaka (koroid)** | Kan damarları ve pigment (yansımayı önler); önde renkli **iris** ve **göz bebeği**; arkasında **göz merceği** (yakınsak) |\n| **Ağ tabaka (retina)** | **Çubuk** (loş ışık, siyah-beyaz, **rodopsin** – A vitamini) ve **koni** (renkli görme) hücreleri; **sarı benek** (net görüntü), **kör nokta** (optik sinirin çıktığı yer, reseptör yok) |\n\n**Görme yolu:** Işık → kornea → göz bebeği → mercek → camsı cisim → **retinada ters ve küçük görüntü** → optik sinir → **talamus** → beyin kabuğunun görme merkezi (**düz** algılanır).\n\n**Uyum:** Uzağa bakarken kirpiksi kaslar gevşer, mercek **incelir**; yakına bakarken kaslar kasılır, mercek **kalınlaşır**.\n\n# Kulak\n\n- **Dış kulak:** Kulak kepçesi, kulak yolu, **kulak zarı**.\n- **Orta kulak:** **Çekiç–örs–üzengi** (titreşimi güçlendirir); **östaki borusu** yutağa açılır, zarın iki yüzündeki basıncı dengeler.\n- **İç kulak:** **Salyangoz** (kohlea; vestibüler, kohlear, timpanik kanal; **Corti organı**), **dalız** (tulumcuk + kesecik, **otolitler**) ve **yarım daire kanalları** (denge).\n\n**İşitme yolu:** Ses → kepçe → kulak yolu → kulak zarı → çekiç–örs–üzengi → **oval pencere** → salyangoz sıvısı → **temel zar** titreşimi → Corti organı tüylü hücreleri (tüyler örtü zarına sürtünür) → işitme siniri → talamus → işitme merkezi.\n\n# Burun ve Dil\n\n- **Burun:** Üst kısımdaki **sarı bölgede** koku reseptörleri; moleküller **mukusta çözünür**. Koku uyartıları **talamusa uğramadan** koku merkezine gider; reseptörler **çabuk adapte** olur.\n- **Dil:** **Tat tomurcukları** (papillalarda); beş temel tat: **tatlı, tuzlu, ekşi, acı, umami**. Moleküller **sıvıda çözünmelidir**.\n\n# Deri\n\n- **Üst deri (epidermis):** Korun (ölü, keratinli) ve **Malpighi** tabakası (canlı, bölünen, **melanin**).\n- **Alt deri (dermis):** Kan damarları, ter ve yağ bezleri, kıl kökü, reseptörler.\n- Reseptörler: **Meissner** (dokunma), **Merkel** (hafif dokunma), **Pacini** (basınç), **Ruffini** (sıcak), **Krause** (soğuk), **serbest sinir uçları** (ağrı).",
     "ornekler": [
      {
       "soru": "Kör noktaya düşen görüntü neden algılanmaz?",
       "cozum": "Kör nokta, optik sinirin gözü terk ettiği yerdir; burada **çubuk ve koni hücreleri bulunmaz**, ışık reseptörle algılanamaz."
      },
      {
       "soru": "Uçak inerken kulakta tıkanma hissi olmasının nedeni ve çözümü nedir?",
       "cozum": "Dış ortam basıncı hızla değişir, kulak zarının iki yanındaki basınç eşitsizleşir. **Yutkunmak ya da esnemek östaki borusunu açar** ve basınç dengelenir."
      }
     ],
     "ozet": [
      "Göz: sklera-kornea, koroid-iris-mercek, retina (çubuk, koni).",
      "Kulak: çekiç-örs-üzengi, Corti organı işitme; yarım daire kanalları denge.",
      "Koku talamusa uğramaz; 5 temel tat."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.6",
    "title": {
     "tr": "Hayvanlarda ve insanda sinir sistemi, refleks",
     "en": "Nervous systems in animals and humans; reflexes"
    },
    "content": {
     "anlatim": "# Omurgasızlarda Sinir Sistemi\n\n| Grup | Sistem |\n|---|---|\n| **Süngerler** | Sinir hücresi **yok** |\n| **Sölenterler** (denizanası, hidra) | **Ağ (sinir ağı)** sinir sistemi; uyartı her yöne yayılır |\n| **Yassı solucan, halkalı solucan, eklembacaklılar** | Başta **gangliyonlar** (ilkel beyin) + **ip merdiven** sinir sistemi; daha hızlı, yönlendirilmiş tepki |\n\n# Omurgalılar\n\nSinir şeridi **sırt (dorsal)** tarafta. **Merkezî** (beyin + omurilik) ve **çevresel** sinir sistemi. Balıklardan memelilere beyin büyür ve kıvrımlaşır; memelilerde **beyin kabuğu çok kıvrımlı** → öğrenme, hafıza, problem çözme.\n\n# İnsan Beyni\n\nBeyin **meninges** zarlarıyla (sert zar, örümceksi zar, ince zar) korunur; aralarındaki **beyin-omurilik sıvısı (BOS)** besler ve darbelere karşı korur.\n\n| Bölüm | Görevler |\n|---|---|\n| **Uç beyin** (ön beyin) | İki yarım küre (**nasırlı cisim** ile bağlı); dışta **gri madde (korteks)**, içte ak madde. Düşünme, bilinç, öğrenme, hafıza, istemli hareket, duyuların değerlendirilmesi |\n| **Talamus** (ara beyin) | **Koku hariç** duyuların korteks öncesi aktarma merkezi |\n| **Hipotalamus** (ara beyin) | **Homeostazi**: vücut sıcaklığı, açlık-tokluk, su dengesi, uyku; **hipofizi** kontrol eder |\n| **Orta beyin** | Kas tonusu, duruş, **göz bebeği** refleksi, sese yönelme |\n| **Beyincik** | **Denge** ve hareketlerin **koordinasyonu** |\n| **Pons** | Beyincik yarım kürelerini bağlar; **solunum ritmi** |\n| **Omurilik soğanı** | **Hayati merkezler**: solunum, kalp atışı, kan basıncı; yutma, öksürme, hapşırma refleksleri; sinirler burada **çaprazlaşır** |\n\n# Omurilik\n\nKesitte **içte gri madde** (kelebek şeklinde), **dışta ak madde** (beynin tersi). **Sırt kökü** duyu girişi, **karın kökü** motor çıkışı. Görev: **refleks merkezi** ve beyin–vücut iletimi.\n\n# Çevresel Sinir Sistemi\n\n**12 çift kafa** siniri, **31 çift omurilik** siniri.\n- **Somatik:** İstemli, **iskelet kasları** (koşmak, yazmak).\n- **Otonom:** İstemsiz; iç organlar, düz kas, kalp, bezler.\n  - **Sempatik:** \"Savaş ya da kaç\" — kalp hızlanır, göz bebeği büyür, sindirim yavaşlar.\n  - **Parasempatik:** \"Dinlen ve sindir\" — kalp yavaşlar, sindirim hızlanır.\n\n# Refleks\n\nHızlı, otomatik, istemsiz yanıt. **Refleks yayı:** reseptör → duyu nöronu → (ara nöron) → motor nöron → efektör (kas/bez).\n- **Diz kapağı refleksi:** **2 nöronlu** (ara nöron yok).\n- **Sıcağa dokununca eli çekme:** **3 nöronlu**; merkez omurilik, sonra beyne bilgi gider (acıyı sonradan hissederiz).\n- **Şartlı (öğrenilmiş) refleks:** Pavlov'un köpeği — zil sesiyle tükürük salgılama.",
     "ornekler": [
      {
       "soru": "Bir trafik kazasında beyinciği zarar gören kişide hangi belirtiler görülür?",
       "cozum": "**Denge kaybı** ve **hareketlerin koordinasyonunda bozukluk** (sendeleyerek yürüme, ince hareketleri yapamama) görülür."
      },
      {
       "soru": "Sıcak ütüye dokunduğumuzda elimizi çektikten sonra acıyı hissetmemizin nedeni nedir?",
       "cozum": "Refleks merkezi **omurilik**tir; el çekme yanıtı beyne gitmeden oluşur. Bilgi ayrıca **beyin kabuğuna** iletilir ve acı bu yüzden biraz sonra algılanır."
      }
     ],
     "ozet": [
      "Sünger yok, sölenter ağ, solucan-eklembacaklı ip merdiven.",
      "Uç beyin düşünme; talamus aktarma; hipotalamus homeostazi; beyincik denge; omurilik soğanı hayati merkez.",
      "Otonom: sempatik vs parasempatik; refleks yayı."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "1. Tema (C): Destek-Hareket ve Bağışıklık",
   "en": "Theme 1 (C): Support, Movement and Immunity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.9",
    "title": {
     "tr": "Destek ve hareket sistemi: kemik, kıkırdak, eklem, kas dokusu",
     "en": "Skeletal system: bone, cartilage, joints, muscle tissue"
    },
    "content": {
     "anlatim": "# Görevler\n\nVücudu destekleme, organları koruma, hareket, **mineral depolama** (Ca, P), **kan hücresi üretimi** (kırmızı kemik iliği).\n\n# Kemik Doku\n\n- Ara madde **osein** (kolajen + kalsiyum tuzları); hücreleri **osteosit**.\n- **Periost:** Dış bağ doku zarı; kemiğin **enine büyümesi** ve **onarımı**.\n- **Sıkı (sert) kemik:** **Osteon** birimleri; merkezde **Havers kanalı** (damar, sinir), bunları birbirine bağlayan **Volkmann kanalları**.\n- **Süngerimsi kemik:** Gözenekli, **kırmızı kemik iliği** içerir.\n- Kemiğin **boyca uzaması**: epifiz (büyüme) plağındaki kıkırdağın kemikleşmesiyle; ergenlik sonrası durur.\n- Şekillerine göre: **uzun** (uyluk, pazu), **kısa** (bilek), **yassı** (kafatası, kürek), **düzensiz** (omur).\n\n# Kıkırdak Doku\n\n**Kondrosit** hücreleri, **kondrin** ara maddesi; **kan damarı ve sinir içermez** (difüzyonla beslenir, geç onarılır).\n- **Hiyalin:** Burun ucu, eklem yüzeyleri, soluk borusu\n- **Elastik:** Kulak kepçesi, gırtlak kapağı\n- **Fibröz (lifli):** Omurlar arası disk\n\n# Eklemler\n\nKemikler birbirine **ligamentlerle (bağ)** bağlanır.\n| Tür | Özellik | Örnek |\n|---|---|---|\n| **Oynar** | Eklem kapsülü, **sinovyal sıvı** | Diz, omuz, dirsek |\n| **Yarı oynar** | Arada kıkırdak disk, sınırlı hareket | Omurlar |\n| **Oynamaz** | Testere dişli sıkı bağlantı | Kafatası |\n\n# Kas Dokusu\n\nHücre zarı **sarkolemma**, sitoplazma **sarkoplazma**; kasılan telcikler **miyofibril** (**aktin** ve **miyozin**).\n\n| | İskelet (çizgili) | Düz | Kalp |\n|---|---|---|---|\n| Bantlaşma | Var | Yok | Var |\n| Çekirdek | **Çok** | Tek | 1–2 |\n| Kontrol | **İstemli** (somatik) | İstemsiz (otonom) | İstemsiz (otonom) |\n| Kasılma | Hızlı, çabuk yorulur | Yavaş, uzun süreli | Hızlı, ritmik, yorulmaz |\n| Yer | İskelete bağlı | İç organlar, damarlar | Kalp |",
     "ornekler": [
      {
       "soru": "Kıkırdak doku yaralanmalarının kemik yaralanmalarından daha geç iyileşmesinin nedeni nedir?",
       "cozum": "Kıkırdakta **kan damarı yoktur**; besin ve oksijen difüzyonla yavaş ulaşır, bu yüzden onarım yavaştır."
      }
     ],
     "ozet": [
      "Kemik: osein, osteosit, Havers–Volkmann, periost.",
      "Kıkırdak damarsız: hiyalin, elastik, fibröz.",
      "Kas: iskelet (istemli, çok çekirdek), düz, kalp."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.10",
    "title": {
     "tr": "Kasların çalışması ve kasılma mekanizması",
     "en": "Muscle action and contraction mechanism"
    },
    "content": {
     "anlatim": "# Kasların Birlikte Çalışması\n\n- İskelet kasları kemiklere **tendonlarla (kiriş)** bağlanır.\n- **Antagonist kaslar:** Biri kasılırken diğeri gevşer — **biseps** (kolu büker) ve **triseps** (kolu açar).\n- **Sinerjist kaslar:** Aynı anda kasılıp gevşer — karın kasları.\n- Vücut bir **kaldıraç** sistemidir: destek noktası **eklem**, yük **ağırlık**, kuvvet **kas**.\n\n# Kas Sarsısı ve Tetanoz\n\n- **Eşik şiddeti:** Kas telini kasıltan en küçük uyartı (**ya hep ya hiç**).\n- **Kas sarsısı:** Tek uyarıyla bir kez kasılıp gevşeme — **gizli evre → kasılma evresi → gevşeme evresi**.\n- **Fizyolojik tetanoz:** Kas çok sık uyarılırsa gevşeyemez, **sürekli kasılı** kalır.\n- **Kas tonusu:** Bilinç açıkken kasların hafif kasılı durması (duruşu sağlar).\n\n# Kayan İplikler Modeli (Huxley)\n\n**Sarkomer:** İki **Z çizgisi** arası; kasılma birimi.\n\n**Kasılma basamakları:**\n1. Motor nörondan gelen uyartı → **asetilkolin** → kas zarında aksiyon potansiyeli.\n2. **Sarkoplazmik retikulumdan Ca²⁺** salınır.\n3. Ca²⁺ aktin üzerindeki bağlanma bölgelerini açar; **miyozin başları** aktine bağlanır.\n4. **ATP** enerjisiyle miyozin başları aktini sarkomer ortasına çeker.\n\n| Kasılmada | Değişim |\n|---|---|\n| Z çizgileri | Birbirine **yaklaşır** |\n| Sarkomer | **Kısalır** |\n| **I bandı** ve **H bandı** | **Daralır** |\n| **A bandı** | **Değişmez** |\n| Aktin ve miyozin ipliklerinin boyu | **Değişmez** |\n\nGevşemede Ca²⁺ geri pompalanır (ATP harcanır); tersi olur.\n\n**Enerji kaynakları:** ATP → **kreatin fosfat** → glikoliz / laktik asit fermantasyonu → oksijenli solunum.",
     "ornekler": [
      {
       "soru": "Kasılma sırasında A bandının boyu neden değişmez?",
       "cozum": "A bandı **miyozin ipliklerinin uzunluğuna** karşılık gelir; kasılmada iplikler **kısalmaz**, yalnızca aktin miyozin üzerinde **kayar**. Bu yüzden A bandı sabit kalır, I ve H bantları daralır."
      }
     ],
     "ozet": [
      "Antagonist: biseps–triseps.",
      "Sarsı: gizli, kasılma, gevşeme; tetanoz.",
      "Kasılmada I ve H daralır, A sabit; Ca²⁺ ve ATP gerekir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.11",
    "title": {
     "tr": "Bağışıklık sistemi, aşı-serum ve alerji",
     "en": "Immune system, vaccines and allergies"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **Antijen:** Bağışıklık yanıtı başlatan yabancı madde.\n- **Antikor:** B lenfositlerden gelişen plazma hücrelerinin ürettiği, antijene **özgül** savunma proteini.\n\n# Doğal (Doğuştan, Özgül Olmayan) Bağışıklık\n\nTüm patojenlere karşı; **hafızası yoktur**.\n- **Birinci savunma hattı (dış):** Deri, mukus, **mide asidi**, tükürük ve gözyaşındaki **lizozim**.\n- **İkinci savunma hattı (iç):** **Fagositler** (nötrofil, makrofaj), **doğal katil (NK)** hücreler, **interferon** ve **kompleman** proteinleri, **ateş**.\n- **Yangısal tepki (iltihap):** Hasarlı dokuda **mast hücreleri histamin** salgılar → damarlar genişler, geçirgenlik artar (kızarıklık, ısı, şişlik, ağrı) → fagositler bölgeye gelir.\n\n# Kazanılmış (Özgül) Bağışıklık\n\n**B ve T lenfositler**; patojene **özgüdür** ve **bellek hücreleri** sayesinde hafızası vardır.\n- **Humoral (sıvısal):** B lenfositler → plazma hücreleri → **antikor**.\n- **Hücresel:** **T lenfositler** enfekte ve kanserli hücreleri doğrudan yok eder; **yardımcı T** hücreler yanıtı düzenler.\n\n| | Aktif | Pasif |\n|---|---|---|\n| Doğal | **Hastalığı geçirme** | **Anneden** plasenta ve sütle antikor |\n| Yapay | **Aşı** | **Serum** |\n\n# Aşı ve Serum\n\n| Aşı | Serum |\n|---|---|\n| Zayıflatılmış/ölü patojen ya da parçası (**antijen**) | Hazır **antikor** |\n| **Koruyucu** — sağlıklı kişiye | **Tedavi** amaçlı — hastaya |\n| Vücut kendi antikorunu ve **bellek hücresini** üretir → **aktif** | Bellek hücresi oluşmaz → **pasif** |\n| Etkisi geç başlar, **uzun** sürer | Hemen etki eder, **kısa** sürer |\n\n# Alerji\n\nBağışıklık sisteminin zararsız maddelere (**alerjen**: polen, toz akarı, bazı besinler) **aşırı** tepki vermesi.\n1. **İlk karşılaşma:** B lenfositler antikor üretir; antikorlar **mast hücrelerinin** zarına bağlanır (duyarlılaşma).\n2. **İkinci karşılaşma:** Alerjen bu antikorlara bağlanır → mast hücreleri **histamin** salgılar.\n3. Hapşırma, kaşıntı, göz yaşarması, burun akıntısı.\n4. Şiddetli durumda **anafilaktik şok** (kan basıncının ani düşüşü, solunum güçlüğü) → acil **adrenalin** uygulanır.",
     "ornekler": [
      {
       "soru": "Yılan sokmasında aşı yerine serum uygulanmasının nedeni nedir?",
       "cozum": "Zehrin etkisi **hemen** başlar; aşı ile vücudun antikor üretmesi günler sürer. **Serum hazır antikor** içerdiğinden zehri hemen etkisiz hâle getirir (pasif bağışıklık)."
      }
     ],
     "ozet": [
      "Doğal bağışıklık: özgül değil, hafızasız (deri, fagosit, iltihap).",
      "Kazanılmış: B (antikor) ve T lenfosit, bellek hücresi.",
      "Aşı aktif-koruyucu; serum pasif-tedavi; alerjide histamin."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "2. Tema: Homeostazi",
   "en": "Theme 2: Homeostasis"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Homeostazi, geri bildirim ve düzenleyici sistemler",
     "en": "Homeostasis, feedback and regulatory systems"
    },
    "content": {
     "anlatim": "# Homeostazi\n\nDeğişen dış koşullara rağmen iç ortamın (**su, sıcaklık, pH, iyon, enerji**) **dar bir aralıkta sabit** tutulması. Enzimlerin çalışması ve hücrelerin yaşaması için hayati önemdedir.\n- **Claude Bernard:** \"İç ortam\" kavramı. **Walter Cannon:** \"Homeostazi\" terimi.\n- İslam bilginleri **İbn Sina, İbnü'n-Nefis** (küçük dolaşım) ve **Ebu Bekir er-Razi** fizyoloji ve tıpta öncü çalışmalar yaptı.\n\n| Canlı | Homeostatik yapı |\n|---|---|\n| **Paramesyum** (tatlı su) | Hipotonik ortamda sürekli su alır; **kontraktil koful** fazla suyu ATP harcayarak atar |\n| **Balıklar** | **Solungaçlar**: gaz alışverişi, iyon ve su dengesi, **amonyak** atımı |\n| **Bitkiler** | **Stomalar** terlemeyi ve gaz alışverişini düzenler; **hidatotlarla gutasyon**; kaktüste diken yapraklar |\n\n**Düzenlenen değerler:** su–elektrolit, enerji (bazal metabolizma), toksinlerin uzaklaştırılması (karaciğer, böbrek), vücut sıcaklığı (~**36,8 ± 0,4 °C**), kan basıncı, kan şekeri.\n\n# Geri Bildirim\n\n- **Negatif geri bildirim:** Sapmaya **zıt** yönde yanıt, değer normale döner. **En yaygın** mekanizma. Ör. kan şekeri yükselince **insülin**; vücut ısınınca terleme; CO₂ artınca (pH düşünce) solunumun hızlanması.\n- **Pozitif geri bildirim:** Etki kendini **güçlendirir**, süreç tamamlanana kadar artar. Ör. **doğumda oksitosin**, **kan pıhtılaşması**, emzirmede süt salgısı.\n\n# Sinir ve Endokrin Sistem\n\n- **Sinir sistemi:** Hızlı, kısa süreli (hipotalamus, pons, omurilik soğanı).\n- **Endokrin sistem:** Daha yavaş ama **uzun süreli** düzenleme.\n\n| Bez | Hormon | Görev |\n|---|---|---|\n| **Hipotalamus** | Salgılatıcı hormonlar, ADH ve oksitosin üretimi | Hipofizi yönetir |\n| **Hipofiz** | GH, TSH, ACTH, FSH, LH, prolaktin; arka lobdan ADH, oksitosin | \"Ana bez\" |\n| **Tiroit** | Tiroksin; kalsitonin | Metabolizma hızı; kan Ca²⁺ ↓ |\n| **Paratiroit** | Parathormon | Kan Ca²⁺ ↑ |\n| **Pankreas** | **İnsülin** (β), **glukagon** (α) | Kan şekeri ↓ / ↑ |\n| **Böbrek üstü** | Adrenalin (öz), kortizol ve aldosteron (kabuk) | Stres yanıtı; Na⁺ ve su dengesi |",
     "ornekler": [
      {
       "soru": "Kan şekerinin düzenlenmesi neden negatif geri bildirime örnektir?",
       "cozum": "Kan şekeri **yükselince** pankreas **insülin** salgılar ve şeker düşer; **düşünce** **glukagon** salgılanır ve şeker yükselir. Yanıt her zaman sapmanın **tersi** yöndedir."
      },
      {
       "soru": "Doğum sırasındaki oksitosin salgısı neden pozitif geri bildirimdir?",
       "cozum": "Bebeğin rahim ağzına baskısı oksitosin salgısını artırır; oksitosin kasılmaları güçlendirir, bu da daha fazla baskı ve **daha çok oksitosin** demektir. Döngü doğumla sona erer."
      }
     ],
     "ozet": [
      "Homeostazi: iç ortamın sabit tutulması (Cannon).",
      "Negatif geri bildirim yaygın (insülin-glukagon); pozitif: doğum, pıhtılaşma.",
      "Sinir hızlı-kısa; endokrin yavaş-uzun süreli."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.6",
    "title": {
     "tr": "Dolaşım, solunum ve boşaltım sistemlerinin homeostazideki rolü; bozukluklar",
     "en": "Circulatory, respiratory and excretory roles in homeostasis; disorders"
    },
    "content": {
     "anlatim": "# Dolaşım Sistemi\n\nKalp, damarlar, kan. O₂, besin, hormon ve antikorları taşır; atıkları uzaklaştırır; ısıyı dağıtır.\n- **Kılcal damarlarda madde alışverişi (Starling hipotezi):** Atardamar ucunda **kan basıncı > ozmotik basınç** → sıvı dokuya çıkar; toplardamar ucunda **ozmotik basınç > kan basıncı** → sıvı damara döner.\n- Doku sıvısının fazlası **lenf sistemiyle** kana döner.\n\n# Solunum Sistemi\n\n- **Dış solunum:** Alveollerde kan ile hava arasında gaz alışverişi.\n- **İç solunum:** Dokularda kan ile hücreler arasında gaz alışverişi.\n- CO₂ atımı ile **kan pH'sı** düzenlenir: $CO_2 + H_2O \\rightleftharpoons H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-$. CO₂ artınca pH düşer; omurilik soğanı solunumu hızlandırır.\n\n# Boşaltım Sistemi\n\nBöbreklerde **nefronlar**: **süzülme** (glomerulus) → **geri emilim** (glikoz, aminoasit, su, iyonlar) → **salgılama** (H⁺, K⁺, bazı ilaçlar). **Üre** gibi azotlu atıkları atar; **su, elektrolit ve pH** dengesini sağlar. **ADH** suyun geri emilimini artırır, **aldosteron** Na⁺ geri emilimini artırır.\n\n# Homeostazi Bozuklukları\n\n| Bozukluk | Neden |\n|---|---|\n| **Tip 1 diyabet** | Pankreasın **insülin üretememesi** (otoimmün) |\n| **Tip 2 diyabet** | Hücrelerin insüline **duyarsızlaşması** (obezite, hareketsizlik) |\n| **Diabetes insipidus** | **ADH eksikliği** → çok fazla seyreltik idrar |\n| **Hipertansiyon / hipotansiyon** | Yüksek / düşük kan basıncı |\n| **Obezite** | Enerji alımı > harcama |\n| **Hipotermi / hipertermi** | Vücut sıcaklığının normalin altına / üstüne çıkması |\n\n> Sağlıklı beslenme, düzenli egzersiz ve yeterli uyku homeostazinin korunmasının temelidir.",
     "ornekler": [
      {
       "soru": "Çok terleyen bir kişinin idrar miktarı nasıl değişir? Neden?",
       "cozum": "Terlemeyle su kaybedilir, kanın ozmotik basıncı artar; hipotalamus bunu algılar ve hipofizden **ADH** salgılanır. ADH böbrekte **suyun geri emilimini** artırır, idrar **azalır ve koyulaşır**."
      }
     ],
     "ozet": [
      "Starling: kan basıncı vs ozmotik basınç.",
      "Solunum CO₂ ile pH'yı düzenler.",
      "Nefron: süzülme, geri emilim, salgılama; ADH ve aldosteron."
     ]
    }
   }
  ]
 }
];
