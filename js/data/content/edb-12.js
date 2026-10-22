/* =========================================================
   12. Sınıf Türk Dili ve Edebiyatı — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "TDE 12 Detaylı Konu Anlatım Notları" (7 ünite).
   Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (akım–felsefe tablosu, sözlükler, hikâye ve şiir akımlarının temsilcileri, roman dönemleri, epik ve absürt tiyatro, deneme–makale–sohbet karşılaştırması, söylev geleneği).
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/edebiyat"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Giriş",
   "en": "Unit 1: Introduction"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Edebiyat; felsefe, düşünce akımları ve psikolojiyle ilişkisi; dil ve sözlükler",
     "en": "Literature, philosophy, psychology; language change and dictionaries"
    },
    "content": {
     "anlatim": "# Edebiyat ve Felsefe / Düşünce Akımları\n\n- İkisi de **insanı** konu alır ve **dili** araç olarak kullanır; felsefe **kavram ve akıl yürütmeyle**, edebiyat **imge ve kurguyla** düşünür.\n- Edebiyat akımları felsefi akımlardan beslenir:\n\n| Felsefi / düşünsel akım | Edebî yansıma |\n|---|---|\n| **Rasyonalizm** (Descartes) | **Klasisizm**: akıl, sağduyu, ölçülülük |\n| Aydınlanma, Rousseau | **Romantizm**: duygu, hayal, doğa |\n| **Pozitivizm** (Comte) | **Realizm** ve **natüralizm**: gözlem, deney |\n| İdealizm, sezgicilik (Bergson) | **Sembolizm**, empresyonizm |\n| **Varoluşçuluk** (Sartre, Camus) | Varoluşçu roman ve tiyatro, absürt tiyatro |\n| Psikanaliz (Freud) | **Bilinç akışı**, iç monolog, sürrealizm |\n| Marksizm | **Toplumcu gerçekçilik** |\n| Postmodernizm | Üstkurmaca, metinlerarasılık, çoğulculuk |\n\n# Edebiyat ve Psikoloji–Psikiyatri\n\nYazarlar karakter yaratırken **bilinçaltı, travma, rüya, iç çatışma** gibi psikolojik verilerden yararlanır; **psikolojik roman** (Peyami Safa — *Dokuzuncu Hariciye Koğuşu*), **bilinç akışı** tekniği (Virginia Woolf, James Joyce; Türk edebiyatında Oğuz Atay, Tanpınar). Edebî eserler de psikolojiye vaka ve kavram sunmuştur (Oidipus kompleksi).\n\n# Dilin Tarihî Süreçteki Değişimi\n\n**Sebepler:** Göçler, **kültür teması** ve din değiştirme (Arapça-Farsça etkisi), yönetim ve siyaset (Dil Devrimi), bilim ve **teknoloji** (yeni kavramlar), **sosyal medya** ve kitle iletişim (kısaltmalar, yabancı kelimeler), toplumsal değişim.\n\n**Türkçenin tarihî dönemleri:** Eski Türkçe (Göktürk, Uygur) → Orta Türkçe (Karahanlı, Harezm, Kıpçak) → Yeni Türkçe (Eski Anadolu Türkçesi, Osmanlı Türkçesi, **Türkiye Türkçesi**).\n\n# Türkçenin Önemli Sözlükleri\n\n| Sözlük | Özellik |\n|---|---|\n| **Dîvânu Lugâti't-Türk** (Kâşgarlı Mahmud, 1072–74) | İlk Türkçe sözlük (Türkçe–Arapça) |\n| **Kitâbü'l-İdrâk**, Codex Cumanicus | Kıpçak Türkçesi |\n| **Kâmûs-ı Türkî** (Şemseddin Sâmî, 1901) | Türkçe–Türkçe ilk kapsamlı sözlük |\n| **Tarama Sözlüğü** (TDK) | 13.–19. yy eserlerinden derlenmiş eski Türkçe kelimeler |\n| **Derleme Sözlüğü** (TDK) | Anadolu **ağızlarındaki** kelimeler |\n| **Türkçe Sözlük** (TDK, ilk baskı 1945) | Günümüz Türkiye Türkçesinin standart sözlüğü |",
     "ornekler": [
      {
       "soru": "Pozitivizm ile realizm arasındaki ilişkiyi açıklayınız.",
       "cozum": "Pozitivizm bilgiyi **gözlem ve deneye** dayandırır; realist yazarlar da bu anlayışla toplumu ve insanı **gözleme dayalı, nesnel ve gerçekçi** biçimde yansıtmayı amaçlamıştır (Balzac, Flaubert)."
      }
     ],
     "ozet": [
      "Akımlar felsefeden beslenir: rasyonalizm–klasisizm, pozitivizm–realizm.",
      "Psikoloji: bilinç akışı, psikolojik roman.",
      "Sözlükler: DLT, Kâmûs-ı Türkî, Tarama, Derleme, Türkçe Sözlük."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Anlatım biçimleri ve düşünceyi geliştirme yolları",
     "en": "Modes of expression and ways of developing ideas"
    },
    "content": {
     "anlatim": "# Anlatım Biçimleri\n\n| Biçim | Amaç | İpucu |\n|---|---|---|\n| **Öyküleme (anlatma)** | Olayı zaman içinde aktarmak | Eylem, kişi, zaman, mekân; hareket var |\n| **Betimleme (tasvir)** | Görüntüyü sözle çizmek | Sıfatlar, duyular; durağan |\n| **Açıklama** | Bilgi vermek, öğretmek | Nesnel, öğretici dil |\n| **Tartışma** | Görüşü savunup karşıtını çürütmek | \"Kimilerine göre… oysa…\", karşı görüş |\n\n# Düşünceyi Geliştirme Yolları\n\n| Yol | Tanım | Örnek ipucu |\n|---|---|---|\n| **Tanımlama** | \"Nedir?\" sorusunun cevabı | \"… -dır.\" \"… denir.\" |\n| **Örneklendirme** | Somut örnek verme | \"örneğin, mesela\" |\n| **Karşılaştırma** | Benzerlik/farklılık ortaya koyma | \"… göre daha, oysa\" |\n| **Tanık gösterme** | Ünlü birinin sözüne başvurma | \"Yunus Emre'nin dediği gibi…\" |\n| **Sayısal verilerden yararlanma** | İstatistik, rakam | \"%40'ı …\" |\n| **Benzetme** | Soyutu somutla anlatma | \"… gibi\" |\n\n# Paragraf Soruları İçin\n\n- **Ana düşünce** genellikle giriş ya da sonuç cümlesindedir.\n- Bir paragrafta birden fazla anlatım biçimi ve düşünce geliştirme yolu bulunabilir; soru **baskın** olanı sorar.",
     "ornekler": [
      {
       "soru": "“Kitap okuyan gençlerin oranı 2010'da %25 iken bugün %38'e yükselmiştir.” cümlesinde hangi düşünceyi geliştirme yolu kullanılmıştır?",
       "cozum": "**Sayısal verilerden yararlanma** (ayrıca iki dönemi karşılaştırdığı için **karşılaştırma** da vardır; baskın olan sayısal veridir)."
      },
      {
       "soru": "Yaşlı adamın kırış kırış ellerini, nasırlı parmaklarını anlatan bir paragrafın anlatım biçimi nedir?",
       "cozum": "**Betimleme** — görüntü sözcüklerle çiziliyor, olay ilerlemiyor."
      }
     ],
     "ozet": [
      "Öyküleme olay, betimleme görüntü, açıklama bilgi, tartışma savunma.",
      "Tanık gösterme: ünlü kişinin sözü.",
      "Paragrafta baskın yolu bul."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Hikâye",
   "en": "Unit 2: Short Story"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Cumhuriyet dönemi ve 1960 sonrası Türk hikâyesi; küçürek hikâye",
     "en": "Republican and post-1960 Turkish short story; flash fiction"
    },
    "content": {
     "anlatim": "# Hikâyede İki Gelenek\n\n- **Olay (Maupassant) tarzı:** Serim–düğüm–çözüm planlı, merak unsuru, belirgin son (Ömer Seyfettin, Refik Halit, Kemal Tahir).\n- **Durum (kesit / Çehov) tarzı:** Hayattan bir kesit, olaydan çok atmosfer, belirgin bir son yok (**Sait Faik Abasıyanık**, Memduh Şevket Esendal).\n\n# Cumhuriyet Dönemi Hikâyesi (1923–1960)\n\n| Eğilim | Temsilciler |\n|---|---|\n| Millî-dinî duyarlılık, Anadolu | Ömer Seyfettin'in izleyicileri, Refik Halit Karay (*Memleket Hikâyeleri*) |\n| Toplumcu gerçekçi | Sabahattin Ali, Sadri Ertem, Orhan Kemal |\n| Köy hikâyesi | Mahmut Makal (*Bizim Köy*), Fakir Baykurt, Talip Apaydın |\n| Bireyin iç dünyası, modernist | **Sait Faik**, Tarık Buğra, Mustafa Kutlu (sonraki dönem) |\n\n# 1960 Sonrası Türk Hikâyesi\n\n- **Bireyin iç dünyası, yalnızlık, yabancılaşma, varoluş** sorunları.\n- **Toplumcu gerçekçilik** sürer: kentleşme, göç, gecekondu, yurt dışına işçi göçü.\n- **Modernist teknikler:** bilinç akışı, iç monolog, zaman kırılmaları, çoğul bakış açısı.\n- **1980 sonrası postmodern eğilimler:** üstkurmaca, parodi, metinlerarasılık, gerçek–kurmaca sınırının bulanıklaşması.\n- Temsilciler: **Bilge Karasu**, **Ferit Edgü**, **Sevim Burak**, **Füruzan**, **Selim İleri**, **Rasim Özdenören**, **Mustafa Kutlu**, **Tomris Uyar**, **Necati Tosuner**, **Nazlı Eray**, Sait Faik geleneği.\n\n# Küçürek (Minimal) Hikâye\n\n- **Çok kısa**, yoğun, **çarpıcı ya da açık uçlu** son, **az karakter**.\n- Her sözcük işlevseldir; **ima ve boşluklar** okurun yorumuna bırakılır.\n- Türk edebiyatında: **Necati Tosuner**, Ferit Edgü, Haydar Ergülen; dünya edebiyatında Augusto Monterroso (\"Uyandığında dinozor hâlâ oradaydı.\").\n\n# Hikâye Çözümlemesi\n\n**Yapı** (olay örgüsü, çatışma), **tema**, **anlatıcı ve bakış açısı** (kahraman, gözlemci, hâkim/ilahi), **kişiler**, **zaman ve mekân**, **dil ve üslup**, **anlatım teknikleri** (iç monolog, geriye dönüş, diyalog, özetleme).",
     "ornekler": [
      {
       "soru": "Durum hikâyesi ile olay hikâyesi arasındaki farkı birer temsilciyle açıklayınız.",
       "cozum": "**Olay hikâyesi** (Ömer Seyfettin) serim–düğüm–çözüm planlı, merak ve belirgin sonla biter. **Durum hikâyesi** (Sait Faik) hayattan bir **kesit** sunar, atmosfere ve insan ilişkilerine odaklanır, sonu çoğu zaman belirsizdir."
      }
     ],
     "ozet": [
      "Olay (Maupassant) vs durum (Çehov) tarzı.",
      "1960 sonrası: birey, yabancılaşma, modernist ve postmodern teknikler.",
      "Küçürek hikâye: çok kısa, imalı, açık uçlu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Cumhuriyet dönemi hikâyesinde iki çizgi: Sait Faik ve Sabahattin Ali",
     "en": "Two lines in Republican-era short stories: Sait Faik and Sabahattin Ali"
    },
    "content": {
     "anlatim": "# Klasik (Olay) Hikâye — Maupassant Tarzı\n\n**Serim–düğüm–çözüm** planı; olay ön planda; merak unsuru; sonuç genelde bellidir.\n- **Ömer Seyfettin** (Millî Edebiyat): *Kaşağı, Forsa, Pembe İncili Kaftan, Diyet*\n- **Refik Halit Karay:** *Memleket Hikâyeleri* (Anadolu'yu konu alan ilk hikâyelerden)\n- **Sabahattin Ali** (toplumcu gerçekçi): *Değirmen, Kağnı, Ses, Yeni Dünya* — köylünün ezilmişliği, adaletsizlik. Romanları: *Kuyucaklı Yusuf, İçimizdeki Şeytan, Kürk Mantolu Madonna*.\n\n# Durum (Kesit) Hikâyesi — Çehov Tarzı\n\nBelirgin bir olay örgüsü yoktur; **hayattan bir kesit**, atmosfer ve **insan** öne çıkar; sonuç okura bırakılır.\n- **Memduh Şevket Esendal:** Türk edebiyatında durum hikâyesinin öncüsü — *Otlakçı, Hikâyeler*\n- **Sait Faik Abasıyanık:** İstanbul, Burgazada, balıkçılar, kimsesizler; **insan sevgisi**, şiirsel dil. *Semaver, Sarnıç, Lüzumsuz Adam, Alemdağ'da Var Bir Yılan, Mahalle Kahvesi*.\n\n| | Sait Faik | Sabahattin Ali |\n|---|---|---|\n| Teknik | Durum (Çehov) | Olay (Maupassant) |\n| Mekân | İstanbul, adalar, deniz | Anadolu kasabası ve köyü |\n| Bakış | Bireysel, lirik insan sevgisi | Toplumsal eleştiri, gerçekçilik |",
     "ornekler": [
      {
       "soru": "Sait Faik'in hikâyelerinin “durum hikâyesi” sayılmasının nedeni nedir?",
       "cozum": "Belirgin bir **serim–düğüm–çözüm** yoktur; sıradan insanların hayatından bir **kesit**, bir atmosfer ve duygu verilir, son okura bırakılır."
      },
      {
       "soru": "Kürk Mantolu Madonna ve Kuyucaklı Yusuf hangi yazarındır?",
       "cozum": "**Sabahattin Ali**'nin."
      }
     ],
     "ozet": [
      "Olay hikâyesi Maupassant (Ömer Seyfettin, Sabahattin Ali).",
      "Durum hikâyesi Çehov (Memduh Şevket Esendal, Sait Faik).",
      "Sait Faik: Semaver, Lüzumsuz Adam; Sabahattin Ali: Değirmen, Kağnı."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Şiir",
   "en": "Unit 3: Poetry"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Millî Edebiyat ve Cumhuriyet dönemi şiir akımları (1923–1960)",
     "en": "National Literature and Republican poetry movements"
    },
    "content": {
     "anlatim": "# Millî Edebiyat Zevk ve Anlayışını Sürdüren Şiir\n\n- **Hece ölçüsü**, sade Türkçe, **Anadolu, millî değerler, memleket** sevgisi.\n- **Beş Hececiler:** Faruk Nafiz Çamlıbel (*Han Duvarları*), Enis Behiç Koryürek, Halit Fahri Ozansoy, Yusuf Ziya Ortaç, Orhan Seyfi Orhon.\n- Kemalettin Kamu, Ömer Bedrettin Uşaklı (**Memleketçi** şiir), Ahmet Kutsi Tecer (*Orda Bir Köy Var Uzakta*).\n\n# Saf (Öz) Şiir\n\n- Şiirin amacı **güzelliktir**; **müzikalite**, imge, ses uyumu; anlam ikinci planda; toplumsal mesaja kapalı.\n- Kökeni **Ahmet Haşim** ve **Yahya Kemal** (Fecr-i Âti ve sonrası); Cumhuriyet döneminde **Ahmet Hamdi Tanpınar**, Cahit Sıtkı Tarancı, Ahmet Muhip Dıranas, Ziya Osman Saba.\n- Ölçü ve uyağa önem; **sembolizm** etkisi.\n\n# Toplumcu Şiir\n\n- Şiir **toplumsal değişimin aracıdır**; işçi, köylü, sınıf mücadelesi; Marksist düşünce.\n- **Nazım Hikmet** (serbest vezin, **merdiven** biçimi, Mayakovski etkisi — *Memleketimden İnsan Manzaraları*), Rıfat Ilgaz, Hasan İzzettin Dinamo, Ahmed Arif (*Hasretinden Prangalar Eskittim*), Enver Gökçe.\n\n# Garip (I. Yeni) Akımı (1941)\n\n- **Orhan Veli Kanık, Oktay Rifat, Melih Cevdet Anday** — *Garip* (1941) kitabının önsözü manifestodur.\n- **Ölçü ve uyağa karşı**, söz sanatlarına, şairaneliğe karşı; **sıradan insan** ve **günlük hayat**; **sade, konuşma dili**; mizah ve ironi.\n\n# Hisarcılar ve Bireysel Şairler\n\n- **Hisar dergisi** (1950): Millî kültüre bağlı, ölçülü, ılımlı modernlik — Mehmet Çınarlı, Munis Faik Ozansoy, Yahya Kemal hayranlığı.\n- **Mistik / dinî şiir:** **Necip Fazıl Kısakürek** (*Çile*), Sezai Karakoç, Arif Nihat Asya.\n- Bağımsızlar: **Fazıl Hüsnü Dağlarca** (*Çocuk ve Allah*), Cahit Külebi, Behçet Necatigil.",
     "ornekler": [
      {
       "soru": "Garip şiirinin 'şairaneliğe karşı' olması ne anlama gelir?",
       "cozum": "Şiirde **söz sanatlarını, süslü dili, ölçü ve uyağı** reddeder; **sıradan insanın günlük hayatını** sade konuşma diliyle anlatır. Ör. Orhan Veli'nin *Kitabe-i Seng-i Mezar*'ında sıradan bir insan (Süleyman Efendi) ve nasırı konu edilir."
      }
     ],
     "ozet": [
      "Beş Hececiler: hece ölçüsü, memleket.",
      "Saf şiir: müzikalite (Haşim, Yahya Kemal, Tanpınar); toplumcu şiir: Nazım Hikmet.",
      "Garip 1941: Orhan Veli, Oktay Rifat, Melih Cevdet; ölçü-uyak karşıtlığı."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "İkinci Yeni, 1980 sonrası şiir ve Cumhuriyet dönemi halk şiiri",
     "en": "Second New, post-1980 poetry and folk poetry"
    },
    "content": {
     "anlatim": "# İkinci Yeni (1950'ler)\n\n- Garip'e **tepki** olarak doğdu; şiiri sıradanlıktan kurtarmak.\n- **İmgeci**, **kapalı**, **soyut** anlatım; anlamdan çok **çağrışım**; dilde alışılmamış söz dizimleri.\n- **Bireyin iç dünyası**, yalnızlık, yabancılaşma; **sürrealizm** etkisi.\n- Temsilciler: **Cemal Süreya** (*Üvercinka*), **Edip Cansever**, **İlhan Berk**, **Turgut Uyar**, **Ece Ayhan**, **Sezai Karakoç** (dinî-mistik yönüyle), Ülkü Tamer.\n\n# 1960 Sonrası ve 1980 Sonrası Şiir\n\n- **1960–1980:** Toplumcu şiirin yeniden yükselişi (Ataol Behramoğlu, İsmet Özel'in ilk dönemi, Hasan Hüseyin Korkmazgil); **Diriliş** şiiri (Sezai Karakoç) — İslami duyarlılık.\n- **1980 sonrası:** **Çoğulculuk**; belirli bir akım egemen değil; bireysellik, gelenekle yeniden bağ kurma, postmodern eğilimler, kent ve yalnızlık. Temsilciler: Haydar Ergülen, Hilmi Yavuz, Küçük İskender, Lale Müldür, Ahmet Erhan, Arif Ay.\n\n# Cumhuriyet Dönemi Halk Şiiri (Âşık Tarzı)\n\n- Saz eşliğinde, **hece ölçüsü**, **koşma, semai, destan** biçimleri; geleneğin sürdürülmesi.\n- **Âşık Veysel** (*Uzun İnce Bir Yoldayım*), **Âşık Mahzuni Şerif**, **Âşık Murat Çobanoğlu**, **Âşık Şeref Taşlıova**, Âşık Ali İzzet, Neşet Ertaş.\n- Temalar: insan sevgisi, doğa, gurbet, toplumsal eleştiri, ölüm.\n\n# Şiir Çözümleme Ölçütleri\n\n**Tema**, **nazım birimi** (dörtlük, bent, serbest), **ölçü** (hece, aruz, serbest), **uyak ve redif**, **ahenk unsurları** (aliterasyon, asonans, tekrir), **söz sanatları** (teşbih, istiare, kinaye…), **imge**, şairin **akımla ilişkisi**.",
     "ornekler": [
      {
       "soru": "İkinci Yeni şiirinin 'anlamsızlık' eleştirisine maruz kalmasının nedeni nedir?",
       "cozum": "İkinci Yeni şairleri anlamı açıkça vermek yerine **imge ve çağrışıma** dayalı, alışılmamış söz dizimleriyle **kapalı** bir şiir kurdu; okurun şiiri sezgi ve yorumla tamamlaması beklendiği için 'anlaşılmaz' bulundu."
      }
     ],
     "ozet": [
      "İkinci Yeni: imgeci, kapalı, soyut (Cemal Süreya, Edip Cansever).",
      "1980 sonrası: çoğulculuk.",
      "Halk şiiri: Âşık Veysel, Mahzuni Şerif, Neşet Ertaş."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Roman",
   "en": "Unit 4: Novel"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Cumhuriyet dönemi Türk romanı ve karşılaştırmalı okuma",
     "en": "Republican Turkish novel and comparative reading"
    },
    "content": {
     "anlatim": "# 1923–1950: Millî Mücadele, Toplum ve Köy\n\n- **Millî Mücadele romanı:** Halide Edib Adıvar (*Ateşten Gömlek*), Yakup Kadri Karaosmanoğlu (*Yaban*, *Sodom ve Gomore*), Reşat Nuri Güntekin (*Çalıkuşu*, *Yeşil Gece*).\n- **Toplumcu gerçekçi:** **Sabahattin Ali** (*Kuyucaklı Yusuf*, *İçimizdeki Şeytan*, *Kürk Mantolu Madonna*), Sadri Ertem.\n- **Bireyin iç dünyası, psikolojik roman:** **Peyami Safa** (*Dokuzuncu Hariciye Koğuşu*, *Fatih-Harbiye* — Doğu–Batı), **Ahmet Hamdi Tanpınar** (*Huzur*, *Saatleri Ayarlama Enstitüsü*).\n- **Tarihî:** Kemal Tahir'in ilk dönemi; Tarık Buğra (*Küçük Ağa*, 1963).\n\n# 1950–1980: Köy, Birey, Modernizm\n\n- **Köy romanı:** **Yaşar Kemal** (*İnce Memed*), **Orhan Kemal** (*Bereketli Topraklar Üzerinde*), Fakir Baykurt, Kemal Tahir (*Devlet Ana*).\n- **Modernist / bireyci:** **Oğuz Atay** (*Tutunamayanlar*, 1972 — ironi, bilinç akışı, üstkurmaca öncülü), **Yusuf Atılgan** (*Anayurt Oteli*), **Ferit Edgü**, **Adalet Ağaoğlu** (*Ölmeye Yatmak*).\n- **Millî ve dinî değerleri işleyen:** Tarık Buğra, **Mustafa Necati Sepetçioğlu**, Sevinç Çokum.\n\n# 1980 Sonrası: Postmodernizm ve Çok Seslilik\n\n- **Postmodern teknikler:** **Üstkurmaca**, **metinlerarasılık**, parodi, pastiş, çoğul bakış açısı, tarih ile kurmacanın karışımı.\n- **Orhan Pamuk** (*Kara Kitap*, *Benim Adım Kırmızı*; **2006 Nobel**), **Latife Tekin** (*Sevgili Arsız Ölüm*), **İhsan Oktay Anar** (*Puslu Kıtalar Atlası*), Elif Şafak, Hasan Ali Toptaş.\n\n# Türk Dünyası ve Dünya Edebiyatından Örnekler\n\n| Edebiyat | Yazar ve eser |\n|---|---|\n| Kırgız | **Cengiz Aytmatov** — *Gün Olur Asra Bedel* (mankurtlaşma), *Cemile* |\n| Azerbaycan | Elçin Efendiyev, Anar |\n| Rus | **Dostoyevski** (*Suç ve Ceza*), Tolstoy (*Savaş ve Barış*) |\n| Fransız | Flaubert (*Madam Bovary*), Victor Hugo (*Sefiller*), Camus (*Yabancı*) |\n| İngiliz | Charles Dickens, Virginia Woolf (*Mrs. Dalloway*) |\n| Latin Amerika | **Gabriel García Márquez** (*Yüzyıllık Yalnızlık* — büyülü gerçekçilik) |\n\n**Karşılaştırma ölçütleri:** tema, kişiler, anlatıcı, anlatım teknikleri, dönemin toplumsal yapısı, akım.",
     "ornekler": [
      {
       "soru": "Postmodern romanda 'üstkurmaca' tekniği nedir? Bir örnek veriniz.",
       "cozum": "Yazarın romanın **kurgu olduğunu okura hissettirmesi**, romanın yazılış sürecini metnin içinde tartışmasıdır; anlatı kendi üzerine düşünür. Oğuz Atay'ın *Tutunamayanlar*'ı ve Orhan Pamuk'un romanları örnektir."
      }
     ],
     "ozet": [
      "1923–1950: Millî Mücadele, toplumcu, psikolojik roman (Peyami Safa, Tanpınar).",
      "1950–1980: köy romanı (Yaşar Kemal), modernizm (Oğuz Atay, Yusuf Atılgan).",
      "1980 sonrası: postmodernizm (Orhan Pamuk); Aytmatov, Dostoyevski, Márquez."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Toplumcu gerçekçi roman ve köy romanı",
     "en": "Socialist-realist novel and the village novel"
    },
    "content": {
     "anlatim": "# Toplumcu Gerçekçilik\n\nEdebiyatı **toplumsal değişimin aracı** sayar; sınıf çatışması, sömürü, emekçilerin sorunları işlenir.\n- **Sadri Ertem** (*Çıkrıklar Durunca*), **Sabahattin Ali**, **Orhan Kemal** (*Bereketli Topraklar Üzerinde, Murtaza, Cemile*), **Kemal Tahir** (*Devlet Ana, Esir Şehrin İnsanları*).\n\n# Köy Romanı (1950 sonrası)\n\n**Köy Enstitüleri**'nden yetişen yazarlar köyü **içeriden** anlatır: ağa–köylü çatışması, toprak sorunu, yoksulluk, eğitimsizlik.\n| Yazar | Eserler |\n|---|---|\n| **Mahmut Makal** | *Bizim Köy* (1950) — köy edebiyatını başlatan gözlemler |\n| **Fakir Baykurt** | *Yılanların Öcü, Tırpan* |\n| **Talip Apaydın** | *Sarı Traktör* |\n| **Yaşar Kemal** | *İnce Memed* (Çukurova, eşkıya, destansı anlatım), *Ağrıdağı Efsanesi* |\n| **Kemal Tahir** | *Göl İnsanları* (köy hikâyeleri) |\n\n**Not:** Köyü ilk ele alan romanlar daha önce yazılmıştır: Nabizade Nâzım — *Karabibik* (ilk köy romanı, 1890); Reşat Nuri — *Yeşil Gece*; Yakup Kadri — *Yaban* (köye **dışarıdan** bakış).\n\n# Ortak Özellikler\n\nSade, yöresel kelimeler içeren dil; **gerçekçi** gözlem; tipler (ağa, imam, muhtar, öğretmen); toplumsal mesaj.",
     "ornekler": [
      {
       "soru": "Yakup Kadri'nin Yaban'ı ile Mahmut Makal'ın Bizim Köy'ü köye bakış açısı bakımından nasıl ayrılır?",
       "cozum": "*Yaban*'da köy, oraya sonradan gelen bir aydının (Ahmet Celal) **dışarıdan** gözüyle anlatılır; *Bizim Köy*'de ise köy, köyde yetişip öğretmenlik yapan yazar tarafından **içeriden** gözlemlenir."
      },
      {
       "soru": "İnce Memed'in konusu ve mekânı nedir?",
       "cozum": "**Çukurova** ve Toros dağlarında, ağaların zulmüne başkaldırıp **eşkıya** olan Memed'in destansı hikâyesi (Yaşar Kemal)."
      }
     ],
     "ozet": [
      "Toplumcu gerçekçilik: sınıf çatışması, Orhan Kemal, Kemal Tahir.",
      "Köy romanı: Köy Enstitüleri kuşağı (Makal, Baykurt, Apaydın).",
      "Karabibik ilk köy romanı; Yaban dışarıdan bakış."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Modernist ve postmodernist Türk romanı",
     "en": "Modernist and postmodernist Turkish novel"
    },
    "content": {
     "anlatim": "# Modernist Roman\n\nBireyin **iç dünyası**, yabancılaşma, bunalım; **geleneksel olay örgüsü kırılır**.\n**Teknikler:** **bilinç akışı**, **iç monolog**, geriye dönüş, zaman kırılmaları, çoklu bakış açısı.\n| Yazar | Eserler |\n|---|---|\n| **Oğuz Atay** | **Tutunamayanlar** (1972), *Tehlikeli Oyunlar*; ironi, parodi |\n| **Yusuf Atılgan** | **Anayurt Oteli**, *Aylak Adam* — yalnızlık, yabancılaşma |\n| **Ferit Edgü** | *O / Hakkâri'de Bir Mevsim* |\n| **Bilge Karasu** | *Gece* |\n| **Leyla Erbil** | *Tuhaf Bir Kadın* |\n| **Tanpınar** (öncü) | *Huzur*, *Saatleri Ayarlama Enstitüsü* — zaman, medeniyet değişimi |\n\n# Postmodernist Roman (1980 sonrası)\n\n**Üstkurmaca** (romanın kendi yazılışını konu etmesi), **metinlerarasılık**, tarih ve kurgunun iç içeliği, **çoğulculuk**, ironi, yazar–okur oyunu.\n- **Orhan Pamuk:** *Beyaz Kale, Kara Kitap, Benim Adım Kırmızı, Kar, Masumiyet Müzesi* — **2006 Nobel Edebiyat Ödülü**.\n- **İhsan Oktay Anar:** *Puslu Kıtalar Atlası, Efrâsiyâb'ın Hikâyeleri*\n- **Latife Tekin:** *Sevgili Arsız Ölüm* (büyülü gerçekçilik)\n- **Nazlı Eray**, **Hasan Ali Toptaş** (*Gölgesizler*)\n\n| | Modernizm | Postmodernizm |\n|---|---|---|\n| Odak | Bireyin bilinci | Metnin kendisi, kurgu |\n| Gerçeklik | Öznel | Çoğul, belirsiz |",
     "ornekler": [
      {
       "soru": "Tutunamayanlar ve Anayurt Oteli hangi roman anlayışının örnekleridir; ortak teknikleri nedir?",
       "cozum": "**Modernist** romanın; **bilinç akışı, iç monolog** ve zaman kırılmalarıyla bireyin yalnızlığını ve yabancılaşmasını işlerler."
      },
      {
       "soru": "Bir romanda yazarın, okura romanı nasıl yazdığını anlattığı bölümler varsa hangi teknik kullanılmıştır?",
       "cozum": "**Üstkurmaca** — postmodernist romanın temel tekniklerinden biridir."
      }
     ],
     "ozet": [
      "Modernist roman: bilinç akışı, iç monolog (Oğuz Atay, Yusuf Atılgan).",
      "Postmodernist roman: üstkurmaca, metinlerarasılık (Orhan Pamuk, İ. O. Anar).",
      "Orhan Pamuk 2006 Nobel."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Tiyatro",
   "en": "Unit 5: Theatre"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "1950 sonrası Türk tiyatrosu: epik, absürt ve geleneksel etkiler",
     "en": "Post-1950 Turkish theatre: epic, absurd and traditional influences"
    },
    "content": {
     "anlatim": "# 1950 Sonrası Türk Tiyatrosunun Özellikleri\n\n- Tiyatro **yazar sayısı ve çeşitlilik** arttı; özel tiyatrolar, Devlet ve Şehir Tiyatroları güçlendi.\n- **Bireysel ve toplumsal** sorunlar, **göç ve kentleşme**, yabancılaşma, kimlik.\n- Batı'daki **epik** ve **absürt** tiyatronun etkileri.\n- **Geleneksel Türk tiyatrosundan** (Karagöz, ortaoyunu, meddah) yararlanma.\n\n# Epik Tiyatro (Bertolt Brecht)\n\n- Seyircinin oyuna **duygusal olarak kapılmasını** değil, **eleştirel düşünmesini** amaçlar → **yabancılaştırma efekti**.\n- Anlatıcı, şarkılar, pankartlar, sahnelerin bağımsızlığı; toplumsal eleştiri.\n- Türk tiyatrosunda: **Haldun Taner** (*Keşanlı Ali Destanı* — epik + ortaoyunu ve kabare unsurları), Vasıf Öngören (*Asiye Nasıl Kurtulur*).\n\n# Absürt (Uyumsuz) Tiyatro\n\n- **Varoluşçu** felsefeden beslenir; hayatın **anlamsızlığı**, iletişimsizlik, yalnızlık.\n- Mantıksız diyaloglar, döngüsel yapı, belirsiz zaman ve mekân.\n- Dünya: **Samuel Beckett** (*Godot'yu Beklerken*), **Eugène Ionesco** (*Kel Şarkıcı*).\n- Türk tiyatrosunda: **Ferhan Şensoy**, Aziz Nesin, Sermet Çağan (*Ayak Bacak Fabrikası*), Güngör Dilmen'in bazı eserleri.\n\n# Geleneksel Tiyatronun Etkileri\n\n| Yazar | Eser | Özellik |\n|---|---|---|\n| **Haldun Taner** | *Keşanlı Ali Destanı* | Epik + ortaoyunu, meddah |\n| **Turan Oflazoğlu** | *IV. Murat*, *Deli İbrahim* | Tarihî trajedi |\n| **Necati Cumalı** | *Nalınlar*, *Boş Beşik* | Ege köy yaşamı |\n| **Recep Bilginer** | *İsyancılar* | Toplumsal |\n| **Orhan Asena** | *Hürrem Sultan*, *Korkut Ata* | Tarihî, mitolojik |\n| **Güngör Dilmen** | *Midas'ın Kulakları* | Mitoloji, epik |\n| **Oktay Arayıcı** | *Bir Şehnaz Oyun* | Geleneksel tiyatro unsurları |\n| **Turgut Özakman** | *Ocak* | Aile, yoksulluk |\n| **Cahit Atay** | *Pusuda* | Köy, töre |\n\n# Tiyatro Çözümlemesi\n\n**Dramatik yapı** (serim–düğüm–çözüm), **çatışma**, **kişiler**, **perde-sahne-tablo**, **diyalog ve monolog**, **dekor, kostüm, ışık**, **yan metin (parantez içi açıklamalar)**, akımla ilişkisi.",
     "ornekler": [
      {
       "soru": "Brecht'in 'yabancılaştırma efekti' seyirci üzerinde nasıl bir etki amaçlar?",
       "cozum": "Seyircinin kendini karakterlerle özdeşleştirip oyuna **duygusal olarak kapılmasını** engeller; oyunun bir **temsil** olduğunu hatırlatarak seyircinin olaylara **eleştirel bir mesafeden** bakmasını ve toplumsal sorunlar üzerine düşünmesini sağlar."
      }
     ],
     "ozet": [
      "Epik tiyatro: Brecht, yabancılaştırma; Haldun Taner.",
      "Absürt tiyatro: Beckett, Ionesco; anlamsızlık, iletişimsizlik.",
      "Geleneksel etkiler: ortaoyunu, Karagöz, meddah."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: Deneme",
   "en": "Unit 6: Essay"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1",
    "title": {
     "tr": "Deneme türü; dünya ve Cumhuriyet dönemi denemeciler",
     "en": "The essay; world and Republican essayists"
    },
    "content": {
     "anlatim": "# Deneme\n\nYazarın herhangi bir konudaki **kişisel görüş ve düşüncelerini**, kesin yargılara varmadan, **samimi bir dille**, adeta **kendi kendisiyle konuşuyormuş** gibi anlattığı yazı türü.\n\n**Özellikler:**\n- **Öznel**dir; yazar düşüncelerini **kanıtlama zorunluluğu** taşımaz.\n- **Her konu** işlenebilir; konular arasında serbestçe geçiş yapılabilir.\n- Samimi, içten, **sohbet havasında** ama sohbetten daha **ciddi ve düşünsel**.\n- Okuru düşündürmeyi amaçlar; **kesin hüküm** vermez.\n\n| Deneme | Makale | Sohbet (söyleşi) |\n|---|---|---|\n| Öznel, kişisel görüş | **Nesnel**, kanıtlı, belgeli | Öznel |\n| Kanıtlama zorunluluğu yok | Kanıtlamak **zorunda** | Kanıt yok |\n| Kendi kendine konuşur gibi | Ciddi, bilimsel dil | Okurla **karşılıklı konuşur** gibi, daha senli benli |\n\n# Dünya Edebiyatında Deneme\n\n- **Montaigne** (Fransız, 16. yy) — türün kurucusu; *Denemeler* (*Essais*) — \"Kendi kendimi anlatıyorum.\"\n- **Francis Bacon** (İngiliz) — *Denemeler*; daha öğretici.\n- Charles Lamb, Ralph Waldo Emerson, Virginia Woolf.\n\n# Türk Edebiyatında Deneme\n\n- Tanzimat'ta ilk örnekler; **Cumhuriyet döneminde** gelişti.\n- **Nurullah Ataç** — türün en önemli temsilcisi; dil devrimi yanlısı, öz Türkçe, kısa cümleler (*Günlerin Getirdiği*, *Söz Arasında*).\n- **Ahmet Haşim** (*Bize Göre*, *Gurabahane-i Laklakan*), **Ahmet Hamdi Tanpınar** (*Beş Şehir* — İstanbul, Bursa, Konya, Erzurum, Ankara üzerine; geçmiş ve kültür).\n- **Suut Kemal Yetkin**, **Sabahattin Eyüboğlu** (*Mavi ve Kara*), **Nurettin Topçu**, **Cemil Meriç** (*Bu Ülke*, *Mağaradakiler*), **Mehmet Kaplan**, **Salâh Birsel** (*Kahveler Kitabı*), **Melih Cevdet Anday**, **Bedrettin Cömert**, Nermi Uygur, Beşir Ayvazoğlu.",
     "ornekler": [
      {
       "soru": "Bir yazının deneme mi makale mi olduğunu nasıl ayırt edersiniz?",
       "cozum": "Yazar düşüncelerini **kanıtlarla, belgelerle ve nesnel bir dille** savunuyorsa **makale**; **kişisel görüşlerini** kanıtlama kaygısı taşımadan, **samimi ve öznel** bir dille, kesin yargılara varmadan anlatıyorsa **deneme**dir."
      }
     ],
     "ozet": [
      "Deneme: öznel, samimi, kanıtlama zorunluluğu yok.",
      "Montaigne kurucu; Bacon.",
      "Türk edebiyatı: Nurullah Ataç, Tanpınar (Beş Şehir), Cemil Meriç, Sabahattin Eyüboğlu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "6.2",
    "title": {
     "tr": "Öğretici metin türleri: makale, fıkra, söyleşi, eleştiri, gezi, anı",
     "en": "Expository text types: article, column, interview, criticism, travel writing, memoir"
    },
    "content": {
     "anlatim": "# Türlerin Karşılaştırması\n\n| Tür | Özellik | Üslup | Türk edebiyatında örnek |\n|---|---|---|---|\n| **Makale** | Bir düşünceyi **kanıtlarla** savunur | Ciddi, nesnel, bilimsel | İlk makale: **Şinasi**, *Tercüman-ı Ahvâl Mukaddimesi* |\n| **Deneme** | Kişisel görüş, **kanıtlama kaygısı yok** | Samimi, öznel | Nurullah Ataç, Suut Kemal Yetkin |\n| **Fıkra (köşe yazısı)** | Güncel konuda kısa yorum | Akıcı, esprili | Ahmet Rasim, Falih Rıfkı Atay |\n| **Söyleşi (sohbet)** | Konuşur gibi, okurla diyalog | Samimi, sorulu | Ahmet Rasim, Şevket Rado |\n| **Eleştiri** | Eser hakkında değerlendirme | Nesnel ya da öznel | Namık Kemal (*Tahrib-i Harabat*), Nurullah Ataç |\n| **Röportaj** | Gözlem + görüşme ile yerinde inceleme | Canlı | Yaşar Kemal (*Bu Diyar Baştan Başa*) |\n| **Mülakat** | Soru–cevap ile bir kişinin görüşleri | Belgesel | — |\n| **Gezi yazısı** | Gezip görülen yerler | Betimleyici | Evliya Çelebi (*Seyahatname*), Ahmet Hamdi Tanpınar (*Beş Şehir*) |\n| **Anı (hatıra)** | Yazarın kendi yaşadıkları, geçmiş | Öznel | Halit Ziya (*Kırk Yıl*) |\n| **Günlük** | Günü gününe, tarihli kayıt | İçten | Nurullah Ataç, Salah Birsel |\n| **Biyografi / otobiyografi** | Başkasının / kendi hayatı | Belgesel | Tezkireler; Mehmet Âkif biyografisi |\n\n# Sık Karıştırılanlar\n\n- **Makale** kanıtlar, **deneme** kanıtlamaz.\n- **Anı** geçmişte yaşananlar (tarih verilmeyebilir); **günlük** tarih atılarak, o gün yazılır.\n- **Söyleşi**de sohbet havası, **mülakat**ta soru–cevap vardır.",
     "ornekler": [
      {
       "soru": "Bir yazar “Bence mutluluk küçük şeylerde saklıdır” düşüncesini kanıt aramadan, samimi bir dille işliyorsa bu metin hangi türdedir?",
       "cozum": "**Deneme** — kişisel görüş, kanıtlama zorunluluğu yok, samimi üslup."
      },
      {
       "soru": "Beş Şehir hangi türdedir ve kime aittir?",
       "cozum": "Ahmet Hamdi **Tanpınar**'ın **gezi yazısı** (deneme özellikleri de taşır) türündeki eseridir: Ankara, Erzurum, Konya, Bursa, İstanbul."
      }
     ],
     "ozet": [
      "Makale kanıtlar; deneme kanıtlama kaygısı taşımaz.",
      "Anı geçmişte yaşanan; günlük tarihli, o gün yazılır.",
      "Gezi: Seyahatname, Beş Şehir; röportaj: yerinde gözlem."
     ]
    }
   }
  ]
 },
 {
  "id": "u7",
  "name": {
   "tr": "7. Ünite: Söylev (Nutuk)",
   "en": "Unit 7: Oration (Nutuk)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "7.1",
    "title": {
     "tr": "Söylev türü; İslamiyet öncesi, sonrası ve Cumhuriyet dönemi söylevleri",
     "en": "Oratory in Turkish tradition"
    },
    "content": {
     "anlatim": "# Söylev (Hitabet, Nutuk)\n\nBir topluluğu belirli bir **düşünce ya da eyleme yöneltmek**, **coşturmak ve ikna etmek** amacıyla yapılan etkili konuşma.\n\n**Özellikler:**\n- **Topluluğa** hitap edilir; **hitap** ifadeleriyle başlar (\"Ey Türk gençliği!\", \"Arkadaşlar!\").\n- **Coşkulu, etkileyici ve inandırıcı** dil; **ünlem, soru, tekrar** ve vurgular.\n- Söyleyen kişinin **kişiliği, inandırıcılığı ve ses tonu**, beden dili etkilidir.\n- **Kısa, açık ve akılda kalıcı** cümleler; özlü sözler.\n- **Tarihî ve ideolojik bağlam** (savaş, kuruluş, kriz) söylevin gücünü belirler.\n\n**Söylev türleri:** Siyasi, askerî, hukuki, dinî (hutbe, vaaz), akademik, sosyal (açılış, tören).\n\n**İkna teknikleri:** Akla seslenme (**kanıt**, örnek, mantık), duygulara seslenme (**pathos** — vatan, millet, fedakârlık), konuşmacının güvenilirliği (**ethos**).\n\n# Türk Söylev Geleneği\n\n| Dönem | Örnek |\n|---|---|\n| **İslamiyet öncesi** | **Orhun Abideleri** — Bilge Kağan ve Kül Tigin yazıtlarında millete hitap (\"Türk Oğuz beyleri, millet, işitin!\"); **Mete Han**'ın \"Toprak devletin temelidir\" sözü; **Dede Korkut** soylamaları |\n| **İslamiyet sonrası** | **Hutbe** ve **vaaz** geleneği; **Veda Hutbesi** (Hz. Muhammed); Alparslan'ın **Malazgirt** öncesi askerlerine hitabı; Osmanlı padişah ve komutanlarının savaş öncesi konuşmaları |\n| **Cumhuriyet dönemi** | **Atatürk – *Nutuk* (*Söylev*, 15–20 Ekim 1927)**: 1919–1927 arasını anlatır; **Gençliğe Hitabe** ile biter. **Onuncu Yıl Nutku** (29 Ekim 1933): \"Ne mutlu Türk'üm diyene!\" |\n\n# Atatürk'ün Söylevlerinin Özellikleri\n\n- **Belgelere dayalı** (Nutuk'un belgeler cildi), tarihî bilinç.\n- **Sade, açık ve etkili** dil; kısa ve vurucu cümleler.\n- **Gençliğe ve geleceğe** seslenme; **tam bağımsızlık**, Cumhuriyet ve çağdaşlaşma vurgusu.\n- **Gençliğe Hitabe**: \"Ey Türk gençliği! Birinci vazifen, Türk istiklâlini, Türk Cumhuriyeti'ni, ilelebet muhafaza ve müdafaa etmektir.\"",
     "ornekler": [
      {
       "soru": "Söylevi diğer sözlü anlatım türlerinden (sohbet, konferans) ayıran temel özellik nedir?",
       "cozum": "Söylevin temel amacı topluluğu bir düşünce ya da eyleme **yönlendirmek, coşturmak ve ikna etmektir**; bu yüzden **duygulara da seslenen**, hitaplı, coşkulu bir dil kullanır. Konferans ise bilgi vermeyi amaçlar ve daha nesneldir."
      }
     ],
     "ozet": [
      "Söylev: ikna etmek, coşturmak; hitap, ünlem, tekrar.",
      "İslamiyet öncesi: Orhun Abideleri; sonrası: hutbe, Veda Hutbesi.",
      "Atatürk: Nutuk (1927), Gençliğe Hitabe, Onuncu Yıl Nutku (1933)."
     ]
    }
   }
  ]
 }
];
