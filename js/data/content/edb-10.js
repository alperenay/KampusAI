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
     "anlatim": "# Masal\n\nKahramanları **insan, hayvan ve olağanüstü varlıklar** olan; olayları **hayalî**; **zaman ve mekânı belirsiz**; dinleyeni eğlendirirken eğitmeyi amaçlayan tür.\n\n| Bölüm | İşlevi |\n|---|---|\n| **Döşeme** | Dinleyiciyi hazırlayan kalıplaşmış **tekerleme** (\"Evvel zaman içinde…\") |\n| **Serim** | Olay, kişi, zaman ve mekânın tanıtılması |\n| **Düğüm** | Olay ve çatışmaların derinleşmesi |\n| **Çözüm** | Olayların sonuca ulaşması |\n| **Dilek** | Kapanış tekerlemesi (\"Onlar ermiş muradına…\") |\n\n# Edebî ve Öğretici Metin\n\n| Edebî (sanatsal) | Öğretici |\n|---|---|\n| Kurmaca; estetik zevk verir | Gerçekliğe dayanır; bilgi verir |\n| Masal, şiir, hikâye, roman | Gezi yazısı, makale, rapor |",
     "ornekler": [
      {
       "soru": "Masallar hangi metin grubuna girer, neden?",
       "cozum": "**Edebî (sanatsal) metin.** Tamamen kurmacadır, olağanüstü ögeler içerir ve estetik zevk vermeyi amaçlar."
      }
     ],
     "ozet": [
      "Masal: zaman-mekân belirsiz, olağanüstü kahramanlar.",
      "Döşeme → serim → düğüm → çözüm → dilek.",
      "Edebî metin kurmaca, öğretici metin gerçek."
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
     "anlatim": "# Saf (Öz) Şiir Anlayışı\n\nOkura **estetik zevk** vermek; **musiki ve biçim güzelliğini** öne çıkarmak. Şiir anlaşılmak için değil, **duyulmak ve hissedilmek** için yazılır.\n\n# Necip Fazıl Kısakürek (1904–1983)\n\n- **\"Kaldırımlar Şairi\"**.\n- Şiirlerinde **metafizik gerilim, yalnızlık, yabancılaşma** ve mistik ögeler hâkimdir.\n- **\"Kaldırımlar\":** şehir insanının yalnızlığı, sokağın karanlığı, ruhsal bunalım; kaldırımlar **kişileştirilmiştir** (çilekeş yalnızların annesi).\n\n# İmge ve Çağrışım\n\n**İmge:** şairin kelimelere yüklediği yeni anlam ve zihinsel görüntüler. \"Kaldırımlar\"da **\"gözüne mil çekilmiş âmâ evler\"**, **\"kül rengi bulutlar\"** güçlü imgelerdir.",
     "ornekler": [
      {
       "soru": "\"Kaldırımlar, çilekeş yalnızların annesi\" ifadesinde hangi söz sanatı vardır?",
       "cozum": "Kaldırımlara insana ait \"annelik\" özelliği verilmiştir → **teşhis (kişileştirme)**; aynı zamanda bir benzetme (istiare) içerir."
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
      }
     ],
     "ozet": [
      "Söyleşi: okurla sohbet havası, kanıtlama yok.",
      "Ahmet Rasim, Nurullah Ataç.",
      "Deneme kendiyle, söyleşi okurla konuşur."
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
     "anlatim": "# Destan\n\nMilletleri derinden etkileyen olayların (savaş, göç, kıtlık, kahramanlık) anlatıldığı, **sözlü kültürün en eski** ürünleri.\n\n| Doğal destan | Yapma destan |\n|---|---|\n| **Anonim**; halkın ortak hafızasında oluşur, sonra derlenir | Tarihî bir olayın bir **şair** tarafından destan kurallarına göre yazılması |\n| Oğuz Kağan, Manas, Ergenekon | **Üç Şehitler Destanı** (F. N. Çamlıbel), **Kurtuluş Savaşı Destanı** (Nâzım Hikmet) |\n\n# Motif\n\nOlayların gelişimine yön veren **simgesel ögeler**: ışık, **kurt**, ağaç, su, kement… Oğuz Kağan Destanı'nda **gök yeleli kurt** orduya yol gösterir.\n\n# Destan Oluşum Evreleri\n\n1. Çıkış (olay) → 2. Yayılma → 3. Derleme (yazıya geçirilme)",
     "ornekler": [
      {
       "soru": "Üç Şehitler Destanı doğal destan mıdır?",
       "cozum": "Hayır. Bilinen bir şair (Faruk Nafiz) tarafından yazıldığı için **yapma destandır**."
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
     "anlatim": "# Fabl\n\nKahramanları çoğunlukla **hayvanlar** olan (**teşhis ve intak** sanatıyla), sonunda **ahlaki ders** veren manzum ya da mensur hikâyeler.\n\n| Bölüm | |\n|---|---|\n| Serim | Kişiler ve durum |\n| Düğüm | Olayın gelişmesi |\n| Çözüm | Sonuç |\n| **Ders (öğüt)** | Ahlaki sonuç |\n\n- **Mevlana Celâleddin-i Rûmî**'nin **Mesnevî**'si pek çok hayvan hikâyesiyle Doğu fabl geleneğinin en önemli örneğidir (\"Aslan ve Av Hayvanları\").\n- Batı'da **Ezop** ve **La Fontaine**; Doğu'da **Kelile ve Dimne**.\n- Fabllarda açgözlülük, kibir, adalet, hırs, yardımlaşma gibi **evrensel** değerler işlenir.",
     "ornekler": [
      {
       "soru": "Fabllarda hayvanların konuşturulması hangi söz sanatlarıyla açıklanır?",
       "cozum": "Hayvanlara insan özellikleri verme **teşhis**, konuşturma **intak**tır."
      }
     ],
     "ozet": [
      "Fabl: hayvan kahramanlar + ahlaki ders.",
      "Mevlana Mesnevî; La Fontaine; Kelile ve Dimne.",
      "Teşhis ve intak sanatı."
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
      }
     ],
     "ozet": [
      "Basit: kök; türemiş: yapım eki; birleşik: birden çok sözcük.",
      "Dönemler arası karşılaştırmada zihniyet ve dil değişir.",
      "Atölyeler: dinleti, podcast, fabl yazma."
     ]
    }
   }
  ]
 }
];
