/* =========================================================
   10. Sınıf Felsefe — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "10. Sınıf Felsefe Detaylı Konu Anlatım Notları" (9 ünite).
   Kazanım kodları kaynaktaki bölüm numaralarıdır. Filozof tabloları ve örnek sorular eklendi; safsata örnekleri genişletildi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/felsefe"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Felsefenin Doğası",
   "en": "Unit 1: The Nature of Philosophy"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Felsefenin anlamı",
     "en": "The meaning of philosophy"
    },
    "content": {
     "anlatim": "# Felsefe Nedir?\n\n\"Felsefe\" kelimesi Yunanca **philia** (sevgi) ve **sophia** (bilgelik) sözcüklerinden gelir: **bilgelik sevgisi**. Terimi ilk kullananın **Pythagoras** olduğu kabul edilir; o, kendini \"bilge\" (sophos) değil, \"bilgeliği seven\" (philosophos) olarak tanımlamıştır.\n\n**Felsefe;** varlık, bilgi, değer gibi temel konular üzerine **akıl yoluyla, eleştirel, sistemli ve tutarlı** düşünme etkinliğidir.\n\n| Filozof | Felsefe tanımı |\n|---|---|\n| Platon | Var olanın bilgisine ulaşmaktır. |\n| Aristoteles | İlk ilke ve nedenleri araştıran bilimdir. |\n| Kant | İnsan aklının sınırlarını araştıran bilgidir. |\n| Farabi | Varlıkları, var olmaları bakımından bilmektir. |\n| Hegel | Kendi çağının düşüncelerde özetlenmesidir. |\n\n> Farklı tanımların olması felsefenin **dinamik ve sorgulayıcı** yapısını gösterir; her filozof felsefeyi kendi sistemine göre tanımlar.",
     "ornekler": [
      {
       "soru": "Pythagoras'ın kendini 'bilge' değil 'bilgelik seven' olarak tanımlamasının anlamı nedir?",
       "cozum": "Bilgiye **sahip olmak** değil, onu **aramak** vurgulanır. Felsefe bitmiş bir bilgi değil, süregiden bir sorgulama etkinliğidir."
      }
     ],
     "ozet": [
      "Felsefe = philia + sophia = bilgelik sevgisi.",
      "Akıl yoluyla, eleştirel ve sistemli düşünme.",
      "Tek bir tanımı yoktur; her filozof kendi sistemine göre tanımlar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Felsefi düşüncenin gelişimi",
     "en": "The development of philosophical thought"
    },
    "content": {
     "anlatim": "# Mitostan Logosa\n\nFelsefe MÖ 6. yüzyılda **Antik Yunan'da, İyonya'da (Milet)** doğdu. İnsanlar evreni **mitlerle** (tanrılar, efsaneler) açıklamaktan vazgeçip **akla (logos)** dayalı açıklamalara yöneldi.\n\n**İlk filozof: Thales** — \"Her şeyin ana maddesi (arkhe) **su**dur.\"\n- Anaksimandros: **apeiron** (sınırsız, belirsiz)\n- Anaksimenes: **hava**\n- Herakleitos: **ateş** (\"Aynı ırmakta iki kez yıkanılmaz.\")\n- Pythagoras: **sayı**\n- Empedokles: **dört öğe** (su, hava, toprak, ateş)\n- Demokritos: **atom**\n\n**Neden İyonya?** Ticaretle farklı kültürlerle tanışma, zenginlik sonucu oluşan **boş zaman**, görece özgür düşünce ortamı, yazının yaygınlaşması.\n\n# Dönemler\n\n| Dönem | Öne çıkanlar |\n|---|---|\n| İlk Çağ | Sokrates, Platon, Aristoteles |\n| Orta Çağ (din–felsefe ilişkisi) | Augustinus, Aquinalı Thomas; İslam dünyasında Farabi, İbn Sina, Gazali, İbn Rüşd |\n| Rönesans ve Yeni Çağ | Descartes, Bacon, Spinoza, Locke, Hume, Kant |\n| 19. yy | Hegel, Marx, Nietzsche, Comte |\n| 20. yy | Russell, Wittgenstein, Sartre, Heidegger, Popper, Kuhn |",
     "ornekler": [
      {
       "soru": "Thales'i 'ilk filozof' yapan şey nedir?",
       "cozum": "Evreni tanrılarla değil, **doğadaki bir ilkeyle (su)** ve **akıl yoluyla** açıklamaya çalışmasıdır; yani mitostan logosa geçiş."
      }
     ],
     "ozet": [
      "Felsefe MÖ 6. yy'da İyonya'da doğdu.",
      "Mitos → logos geçişi.",
      "Thales: arkhe su; Demokritos: atom."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Felsefenin özellikleri",
     "en": "Characteristics of philosophy"
    },
    "content": {
     "anlatim": "# Felsefi Düşüncenin Özellikleri\n\n- **Akla dayanır (rasyonel):** Kanıt ve gerekçe ister.\n- **Eleştireldir:** Hiçbir bilgiyi sorgulamadan kabul etmez.\n- **Sistemlidir ve tutarlıdır:** Düşünceler birbiriyle çelişmez, bir bütün oluşturur.\n- **Evrenseldir / genelleyicidir:** Tek tek olaylarla değil, genel ilkelerle ilgilenir.\n- **Refleksiftir:** Düşünce üzerine düşünmedir; bilgiyi kendine konu edinir.\n- **Birikimlidir ama ilerlemeci değildir:** Eski felsefeler geçersizleşmez; Platon bugün de tartışılır.\n- **Kesin yargılar sunmaz:** Sorular ve cevaplar sürekli yeniden ele alınır.\n- **Merak ve hayretle başlar:** Aristoteles: \"Felsefe hayretle başlar.\"\n\n> Bilimden farkı: bilim olguları deney ve gözlemle inceler, sonuçları **doğrulanabilir**dir; felsefe ise kavramları, ilkeleri ve değerleri **akıl yoluyla** sorgular.",
     "ornekler": [
      {
       "soru": "'Felsefede ilerleme yoktur' sözü ne anlatır?",
       "cozum": "Bilimde yeni bir teori eskisini geçersiz kılabilir; felsefede ise eski görüşler **geçerliliğini korur**, yeniden yorumlanır. Felsefe **birikimlidir** ama doğrusal bir ilerleme göstermez."
      }
     ],
     "ozet": [
      "Rasyonel, eleştirel, sistemli, tutarlı, refleksif.",
      "Birikimli ama ilerlemeci değil.",
      "Kesin cevap değil, sorgulama sunar."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Felsefi soruların özellikleri",
     "en": "Characteristics of philosophical questions"
    },
    "content": {
     "anlatim": "# Felsefi Soru\n\n**Özellikleri:**\n- **Evrensel ve genel**dir (\"Adalet nedir?\").\n- **Kesin, tek bir cevabı yoktur;** her cevap yeni sorular doğurur.\n- **Deney ve gözlemle** cevaplanamaz.\n- **Merak ve hayret** uyandırır, düşünmeye sevk eder.\n- **Kavramsal**dır; temel kavramların anlamını sorgular.\n\n| Felsefi soru | Felsefi olmayan soru |\n|---|---|\n| Doğru bilgi mümkün müdür? | Suyun kaynama noktası kaçtır? |\n| İyi ve kötünün ölçütü nedir? | İstanbul'un nüfusu kaçtır? |\n| Güzel nesnel midir? | Bu tablo hangi yılda yapıldı? |\n\n**İpucu:** Bir soru bilimsel yöntemle ya da bir kaynağa bakarak kesin olarak cevaplanabiliyorsa felsefi değildir.",
     "ornekler": [
      {
       "soru": "'Zaman nedir?' ile 'Saat kaç?' sorularını karşılaştırınız.",
       "cozum": "'Saat kaç?' gözlemle kesin olarak cevaplanır → felsefi değil. 'Zaman nedir?' kavramsal, evrensel ve tek cevabı olmayan bir sorudur → **felsefi**."
      }
     ],
     "ozet": [
      "Felsefi soru: genel, kavramsal, kesin cevapsız.",
      "Deney/gözlemle cevaplanamaz.",
      "Her cevap yeni sorular doğurur."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "Felsefe ile diğer alanlar",
     "en": "Philosophy and other fields"
    },
    "content": {
     "anlatim": "# Felsefe ve Diğer Alanlar\n\n| Alan | Felsefe ile ilişkisi |\n|---|---|\n| **Bilim** | Bilimler başlangıçta felsefenin içindeydi, zamanla ayrıldı. Felsefe bilimin yöntemini, sınırlarını sorgular (bilim felsefesi). |\n| **Din** | Her ikisi de varlık, ölüm, anlam gibi sorularla ilgilenir. Din **inanca ve vahye**, felsefe **akla** dayanır. |\n| **Sanat** | Sanat **duygu ve sezgiye**, felsefe akla dayanır; ikisi de dünyayı yorumlar. Estetik, sanatı felsefi olarak inceler. |\n| **Bilgi türleri** | Gündelik bilgi (deneyime dayalı, öznel), teknik bilgi (pratik amaçlı), dini bilgi (vahiy), sanat bilgisi (sezgi), bilimsel bilgi (yöntemli, doğrulanabilir), felsefi bilgi (akıl, eleştiri). |\n\n> Felsefe tüm alanlara **temel kavramlar ve eleştirel bakış** kazandırır; bu yüzden \"bilimlerin anası\" denir.",
     "ornekler": [
      {
       "soru": "Din ve felsefe benzer sorulara yönelir; temel fark nedir?",
       "cozum": "Din cevaplarını **inanç ve vahye** dayandırır ve sorgulanmaz kabul eder; felsefe **akıl ve eleştiri** yoluyla gerekçelendirir ve sorgulamayı sürdürür."
      }
     ],
     "ozet": [
      "Felsefe: bilimlerin anası.",
      "Din: inanç; sanat: duygu/sezgi; felsefe: akıl.",
      "Her alanın ayrı bir felsefesi vardır (bilim, sanat, din felsefesi)."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "Felsefenin bireysel ve toplumsal işlevi",
     "en": "Individual and social functions of philosophy"
    },
    "content": {
     "anlatim": "# Felsefenin İşlevleri\n\n**Bireysel:**\n- Eleştirel ve özgür düşünme becerisi kazandırır.\n- Dogmatik ve önyargılı düşünceden uzaklaştırır.\n- Kendini ve dünyayı tanımayı, hayatı anlamlandırmayı sağlar.\n- Farklı görüşlere **hoşgörü** ile yaklaşmayı öğretir.\n\n**Toplumsal:**\n- Toplumsal sorunlara akılcı çözüm önerileri sunar.\n- Demokrasi, adalet, özgürlük gibi değerlerin gelişmesine katkı verir.\n- Bilimsel ve kültürel gelişmeye zemin hazırlar.\n\n**Örnek:** Aydınlanma filozoflarının (Locke, Montesquieu, Rousseau) görüşleri **insan hakları** ve **kuvvetler ayrılığı** ilkelerine, dolayısıyla modern demokrasilere temel oluşturmuştur.\n\n> Sokrates: \"Sorgulanmamış bir hayat yaşanmaya değmez.\"",
     "ornekler": [
      {
       "soru": "Montesquieu'nün 'Kanunların Ruhu' eseri felsefenin hangi işlevine örnektir?",
       "cozum": "Kuvvetler ayrılığı fikriyle modern devlet düzenine yön vermesi, felsefenin **toplumsal işlevine** örnektir."
      }
     ],
     "ozet": [
      "Bireysel: eleştirel düşünme, hoşgörü, anlam.",
      "Toplumsal: demokrasi, insan hakları, akılcı çözüm.",
      "Sokrates: sorgulanmamış hayat yaşanmaya değmez."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Felsefe, Mantık ve Argümantasyon",
   "en": "Unit 2: Philosophy, Logic and Argumentation"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Düşünme ve dil ilişkisi",
     "en": "Thinking and language"
    },
    "content": {
     "anlatim": "# Düşünme, Dil ve Mantık\n\n**Mantık:** Doğru düşünmenin kurallarını inceleyen disiplin. Kurucusu **Aristoteles**tir; mantık eserleri **Organon** (alet) adıyla toplanmıştır. Farabi'ye \"Muallim-i Sani\" (ikinci öğretmen) denir.\n\n**Düşünce ile dil:**\n- Düşünce dil ile **ifade edilir**, dil düşünceyi **biçimlendirir**.\n- Kavram → **terim**, yargı → **önerme**, akıl yürütme → **çıkarım** olarak dile gelir.\n\n| Zihinde | Dilde |\n|---|---|\n| Kavram | Terim (sözcük) |\n| Yargı | Önerme |\n| Akıl yürütme | Kıyas/çıkarım |\n\n> Belirsiz ve çok anlamlı ifadeler düşünce hatalarına yol açar; bu yüzden felsefede **kavramların açık tanımı** önemlidir.",
     "ornekler": [
      {
       "soru": "'Kavram' ile 'terim' arasındaki fark nedir?",
       "cozum": "Kavram zihindeki **genel tasarım**dır (ör. 'insan' düşüncesi); terim ise bu kavramın dildeki **sözcük karşılığı**dır."
      }
     ],
     "ozet": [
      "Mantığın kurucusu Aristoteles (Organon).",
      "Kavram–terim, yargı–önerme, akıl yürütme–çıkarım.",
      "Dil ve düşünce birbirini etkiler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Mantığın temel kavramları ve akıl yürütme türleri",
     "en": "Basic concepts of logic and types of reasoning"
    },
    "content": {
     "anlatim": "# Temel Kavramlar\n\n- **Önerme:** Doğru ya da yanlış olabilen, hüküm bildiren cümle. (\"Kar beyazdır.\" ✔ — \"Kapıyı kapat!\" önerme değil.)\n- **Öncül:** Sonuca ulaşmak için kullanılan önermeler.\n- **Sonuç:** Öncüllerden çıkarılan önerme.\n- **Çıkarım:** Öncüllerden sonuca geçiş.\n- **Doğruluk:** Önermenin gerçeğe uygunluğu (önermelere ait).\n- **Geçerlilik:** Sonucun öncüllerden **zorunlu olarak** çıkması (akıl yürütmelere ait).\n\n> Geçerli bir akıl yürütmede öncüller doğruysa sonuç **kesinlikle** doğrudur. Ancak geçerli bir akıl yürütmenin öncülleri yanlış olabilir.\n\n# Akıl Yürütme Türleri\n\n| Tür | Yön | Kesinlik | Örnek |\n|---|---|---|---|\n| **Tümdengelim** | Genelden özele | Kesin | Bütün insanlar ölümlüdür. Sokrates insandır. → Sokrates ölümlüdür. |\n| **Tümevarım** | Özelden genele | Olası | Gözlenen tüm kuğular beyazdır → Bütün kuğular beyazdır. |\n| **Analoji** | Özelden özele (benzerlik) | Olası | Dünya'da su ve atmosfer var, yaşam var. Mars'ta da su izleri var → Mars'ta yaşam olabilir. |",
     "ornekler": [
      {
       "soru": "'Bütün kuşlar uçar. Penguen kuştur. O hâlde penguen uçar.' Bu akıl yürütme geçerli midir, sonucu doğru mudur?",
       "cozum": "**Geçerlidir**, çünkü biçimi doğrudur (öncüller doğru olsaydı sonuç zorunlu olurdu). Ancak 'Bütün kuşlar uçar' öncülü **yanlış** olduğundan sonuç da yanlıştır. Geçerlilik ≠ doğruluk."
      }
     ],
     "ozet": [
      "Önerme: doğru/yanlış olabilen hüküm.",
      "Geçerlilik akıl yürütmeye, doğruluk önermeye aittir.",
      "Tümdengelim kesin; tümevarım ve analoji olasılıklı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Argüman yapısı ve safsatalar",
     "en": "Argument structure and fallacies"
    },
    "content": {
     "anlatim": "# Argüman\n\n**Argüman:** Bir iddiayı desteklemek için ileri sürülen gerekçeler bütünü.\n- **İddia (sonuç):** Savunulan görüş.\n- **Gerekçe (öncüller):** İddiayı destekleyen nedenler.\n- **Kanıt:** Gerekçeyi destekleyen veri, örnek, istatistik.\n- **Karşı argüman** ve **çürütme:** İddiaya yöneltilen itirazlar ve bunlara cevap.\n\n**Sağlam argüman:** Geçerli ve öncülleri doğru olan argüman.\n\n# Safsatalar (Akıl Yürütme Hataları)\n\n| Safsata | Açıklama | Örnek |\n|---|---|---|\n| **Kişiye saldırı (ad hominem)** | Argüman yerine kişiyi hedef alma | \"Onun dediğine bakma, kendisi derslerinde başarısız.\" |\n| **Otoriteye başvurma** | Alanı dışındaki otoriteye dayanma | \"Ünlü şarkıcı bu ilacı öneriyor, demek ki iyi.\" |\n| **Çoğunluğa başvurma** | Çok kişi inanıyor diye doğru sayma | \"Herkes böyle düşünüyor, o hâlde doğru.\" |\n| **Korkutma (tehdit)** | Kabulü korkuyla sağlama | \"Bunu kabul etmezsen sonuçlarına katlanırsın.\" |\n| **Acındırma** | Duygulara seslenme | \"Notumu yükseltin, çok zor durumdayım.\" |\n| **Aceleci genelleme** | Az örnekten genel yargı | \"İki İstanbullu kaba davrandı, İstanbullular kaba.\" |\n| **Saman adam** | Karşı görüşü çarpıtıp çürütme | \"Ödev azalsın diyorsun, yani hiç çalışmasınlar mı?\" |\n| **Yanlış ikilem** | Sadece iki seçenek sunma | \"Ya bizdensin ya düşman.\" |\n| **Döngüsel akıl yürütme** | Sonucu öncülde varsayma | \"Bu kitap doğrudur çünkü kitapta öyle yazıyor.\" |\n| **Kaygan zemin** | Zincirleme felaket öngörüsü | \"Telefona izin verirsek ders çalışmaz, sınıfta kalır, işsiz kalır.\" |",
     "ornekler": [
      {
       "soru": "'Sigaranın zararlı olduğunu söyleyen doktor da sigara içiyor, öyleyse sigara zararlı değil.' Bu hangi safsatadır?",
       "cozum": "**Kişiye saldırı (ad hominem / sen de yapıyorsun)** safsatasıdır; doktorun davranışı, argümanın doğruluğunu etkilemez."
      }
     ],
     "ozet": [
      "Argüman = iddia + gerekçe + kanıt.",
      "Sağlam argüman: geçerli + doğru öncüller.",
      "Safsatalar: kişiye saldırı, çoğunluk, otorite, aceleci genelleme, saman adam, yanlış ikilem."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Varlık Felsefesi",
   "en": "Unit 3: Philosophy of Being (Ontology)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Varlık felsefesinin konusu ve kavramları",
     "en": "Subject and concepts of ontology"
    },
    "content": {
     "anlatim": "# Ontoloji\n\n**Varlık felsefesi (ontoloji):** Var olanı **var olması bakımından** inceleyen felsefe dalı. \"Varlık var mıdır? Varlığın mahiyeti (ne olduğu) nedir? Evrende bir düzen var mıdır?\" sorularıyla ilgilenir.\n\n**Temel kavramlar:**\n- **Varlık:** Var olan her şey.\n- **Hiçlik:** Varlığın yokluğu.\n- **Madde:** Uzayda yer kaplayan, duyularla algılanabilen.\n- **İdea:** Değişmeyen, zihinsel/düşünsel öz (Platon).\n- **Öz (mahiyet):** Bir şeyi o şey yapan temel nitelik.\n- **Oluş:** Değişim, sürekli farklılaşma.\n- **Gerçek (reel):** Zihinden bağımsız var olan.\n- **Görünüş:** Duyulara yansıyan hâl.",
     "ornekler": [
      {
       "soru": "'Masa' örneğinde öz ve görünüş nedir?",
       "cozum": "Rengi, boyutu, malzemesi **görünüş**tür (değişebilir); üzerine bir şeyler konabilen, belirli işlevi olan eşya olması ise onun **özü**dür."
      }
     ],
     "ozet": [
      "Ontoloji: varlığı var olması bakımından inceler.",
      "Kavramlar: varlık, hiçlik, öz, oluş, madde, idea.",
      "Temel soru: varlık var mı, mahiyeti ne?"
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Varlık problemine yaklaşımlar",
     "en": "Approaches to the problem of being"
    },
    "content": {
     "anlatim": "# Varlık Var mıdır?\n\n| Görüş | Savunucu | Düşünce |\n|---|---|---|\n| **Realizm** | Aristoteles | Varlık, zihinden **bağımsız** olarak gerçekten vardır. |\n| **İdealizm** | Platon, Berkeley | Gerçek varlık zihinsel/düşünseldir. Berkeley: \"Var olmak algılanmaktır.\" |\n| **Nihilizm** | Gorgias | \"Hiçbir şey yoktur; olsaydı bilinemezdi; bilinseydi başkasına aktarılamazdı.\" |\n| **Fenomenalizm** | Kant (kısmen) | Sadece görünüşleri bilebiliriz. |\n\n# Varlığın Mahiyeti\n\n| Görüş | Savunucu | İlke |\n|---|---|---|\n| **Materyalizm** (maddecilik) | Demokritos (atom), Thales (su), Marx | Varlık **maddedir**. |\n| **İdealizm** | Platon (idealar), Hegel (mutlak tin) | Varlık **düşünce/idea**dır. |\n| **Düalizm** | Descartes | Varlık **madde (yer kaplayan) + ruh (düşünen)**. |\n| **Monizm** | Spinoza (tek töz: Tanrı = doğa) | Varlık **tek** bir ilkeden oluşur. |\n| **Oluş** | Herakleitos | Her şey değişir (\"panta rhei\"). |\n| **Olan (değişmezlik)** | Parmenides | Değişim bir yanılsamadır; varlık değişmez. |\n| **Fenomenoloji** | Husserl | Varlık, bilince göründüğü hâliyle incelenir. |\n| **Varoluşçuluk** | Sartre | \"Varoluş özden önce gelir.\" |\n\n> **Herakleitos – Parmenides karşıtlığı:** Biri değişimi, diğeri değişmezliği varlığın özü sayar. Platon bunu uzlaştırır: duyular dünyası değişir, **idealar dünyası** değişmez.",
     "ornekler": [
      {
       "soru": "Descartes'ın varlık görüşü neden düalist kabul edilir?",
       "cozum": "Varlığı **iki ayrı töze** ayırır: yer kaplayan **madde** (res extensa) ve düşünen **ruh/zihin** (res cogitans)."
      }
     ],
     "ozet": [
      "Realizm: zihinden bağımsız varlık; idealizm: düşünsel varlık.",
      "Materyalizm madde, düalizm madde+ruh, monizm tek ilke.",
      "Herakleitos oluş, Parmenides değişmezlik."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Bilgi Felsefesi",
   "en": "Unit 4: Philosophy of Knowledge (Epistemology)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Bilgi felsefesinin konusu ve kavramları",
     "en": "Subject and concepts of epistemology"
    },
    "content": {
     "anlatim": "# Epistemoloji\n\n**Bilgi felsefesi (epistemoloji):** Bilginin **imkânı, kaynağı, sınırları, doğruluk ölçütü** ve değerini inceleyen felsefe dalı.\n\n**Bilginin öğeleri:**\n- **Süje (özne):** Bilen (insan).\n- **Obje (nesne):** Bilinen.\n- **Bilgi:** Süje ile obje arasındaki ilişkinin ürünü.\n\n**Temel kavramlar:**\n- **Doğruluk:** Bilginin nesnesine uygunluğu.\n- **Gerçeklik:** Zihin dışında var olan.\n- **Önsel (a priori):** Deneyimden önce, akılla bilinen (ör. \"Üçgenin iç açıları 180°\").\n- **Sonsal (a posteriori):** Deneyimle kazanılan (ör. \"Bugün hava yağmurlu\").\n- **Kesinlik:** Bilginin şüphe götürmezliği.\n- **Temellendirme:** Bilgiyi gerekçelerle destekleme.",
     "ornekler": [
      {
       "soru": "'Bütün bekârlar evli değildir.' bilgisi önsel midir, sonsal mı?",
       "cozum": "**Önsel (a priori)**dir; 'bekâr' kavramının anlamından akılla bilinir, deneyim gerektirmez."
      }
     ],
     "ozet": [
      "Epistemoloji: bilginin imkânı, kaynağı, sınırı, ölçütü.",
      "Süje bilen, obje bilinen.",
      "A priori: deneyim öncesi; a posteriori: deneyim sonrası."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Doğru bilginin imkânı ve kaynağı",
     "en": "Possibility and source of true knowledge"
    },
    "content": {
     "anlatim": "# Doğru Bilgi Mümkün müdür?\n\n**Mümkün değildir:**\n- **Sofistler (Protagoras):** \"İnsan her şeyin ölçüsüdür.\" Bilgi kişiden kişiye değişir → **görecelik (rölativizm)**.\n- **Septisizm (şüphecilik) – Pyrrhon:** Kesin bilgiye ulaşılamaz, yargıyı askıya almak gerekir.\n- **Gorgias:** Nihilizm.\n\n**Mümkündür (Dogmatizm):** Kesin bilgiye ulaşılabilir. Kaynağı konusunda ayrılırlar:\n\n| Görüş | Kaynak | Savunucu | Ana fikir |\n|---|---|---|---|\n| **Rasyonalizm** | Akıl | Platon, Descartes, Leibniz, Farabi | Doğuştan düşünceler vardır; doğru bilgi akılla elde edilir. Descartes: \"Düşünüyorum, öyleyse varım.\" |\n| **Empirizm** | Deneyim | Locke, Hume, Bacon | Zihin doğuşta **boş levha (tabula rasa)**dır; bilgi deneyimle yazılır. |\n| **Kritisizm** | Akıl + deneyim | **Kant** | \"Kavramsız görüler kör, görüsüz kavramlar boştur.\" |\n| **Pozitivizm** | Olgular (bilim) | Comte | Sadece deneyle doğrulanan bilgi geçerlidir. |\n| **Entüisyonizm (sezgicilik)** | Sezgi | Bergson, Gazali | Gerçek bilgiye sezgiyle ulaşılır. |\n| **Pragmatizm** | Fayda | James, Dewey | İşe yarayan bilgi doğrudur. |\n| **Analitik felsefe** | Dil çözümlemesi | Russell, Wittgenstein | Felsefe sorunları dilin çözümlenmesiyle açıklanır. |\n\n> Descartes **yöntemsel şüphe** kullanır: kuşku duyduğu her şeyi askıya alır, kesin bir temele (cogito) ulaşır. Bu septisizmden farklıdır; şüphe **amaç değil araç**tır.\n\n# Doğruluk Ölçütleri\n\n- **Uygunluk (karşılık):** Bilgi nesnesine uygunsa doğrudur.\n- **Tutarlılık:** Önceki doğru bilgilerle çelişmiyorsa doğrudur.\n- **Yarar (pragmatik):** İşe yarıyorsa doğrudur.\n- **Apaçıklık:** Açık ve seçik ise doğrudur (Descartes).",
     "ornekler": [
      {
       "soru": "Locke'un 'tabula rasa' kavramı hangi bilgi görüşünü temsil eder ve rasyonalizmle nasıl çelişir?",
       "cozum": "**Empirizmi** temsil eder: zihin doğuşta boştur, tüm bilgi deneyimle gelir. Rasyonalizm ise **doğuştan düşünceler** olduğunu savunur."
      }
     ],
     "ozet": [
      "Sofistler ve şüpheciler: kesin bilgi imkânsız.",
      "Rasyonalizm akıl, empirizm deneyim, Kant ikisini birleştirir.",
      "Doğruluk ölçütleri: uygunluk, tutarlılık, yarar, apaçıklık."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "5. Ünite: Ahlak Felsefesi",
   "en": "Unit 5: Moral Philosophy (Ethics)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "5.1",
    "title": {
     "tr": "Ahlak felsefesinin konusu ve kavramları",
     "en": "Subject and concepts of ethics"
    },
    "content": {
     "anlatim": "# Etik\n\n**Ahlak felsefesi (etik):** İnsan eylemlerini **iyi–kötü, doğru–yanlış** açısından inceleyen, ahlakın temellerini sorgulayan felsefe dalı.\n\n> **Ahlak** belirli bir toplumda geçerli davranış kurallarıdır; **etik** ise bu kuralların felsefi incelemesidir.\n\n**Temel kavramlar:**\n- **İyi:** Ahlaken doğru ve değerli olan.\n- **Kötü:** İyinin karşıtı, ahlaken yanlış olan.\n- **Özgürlük:** İnsanın kendi iradesiyle seçebilmesi.\n- **Sorumluluk:** Eylemlerin sonuçlarını üstlenme.\n- **Erdem:** İyiyi alışkanlık hâline getirme.\n- **Vicdan:** İç ahlaki yargı yetisi.\n- **Ödev:** Ahlak yasasına saygıdan doğan yükümlülük.\n- **Ahlak yasası:** Evrensel ahlaki ilke.",
     "ornekler": [
      {
       "soru": "Ahlak ile etik arasındaki fark nedir?",
       "cozum": "Ahlak toplumda **uygulanan kurallardır**; etik bu kuralları **sorgulayan ve temellendiren** felsefi disiplindir."
      }
     ],
     "ozet": [
      "Etik: ahlakın felsefi incelemesi.",
      "Kavramlar: iyi, kötü, erdem, vicdan, ödev, sorumluluk.",
      "Özgürlük olmadan sorumluluk olmaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "5.2",
    "title": {
     "tr": "Ahlak felsefesinin problemleri",
     "en": "Problems of moral philosophy"
    },
    "content": {
     "anlatim": "# Evrensel Ahlak Yasası Var mıdır?\n\n**Yoktur (görecelik):**\n- **Sofistler:** Ahlak kişiden kişiye, toplumdan topluma değişir.\n- **Nietzsche:** Efendi ve köle ahlakı; mevcut değerler yeniden değerlendirilmeli.\n\n**Vardır (evrenselcilik):**\n\n| Görüş | Savunucu | İlke |\n|---|---|---|\n| **Ödev etiği** | **Kant** | Ahlaki eylem **ödev bilinciyle** yapılır. **Kategorik imperatif:** \"Öyle davran ki eyleminin ilkesi evrensel bir yasa olabilsin.\" İnsana asla yalnızca araç olarak davranma. |\n| **Erdem etiği** | Sokrates, Platon, **Aristoteles** | Sokrates: \"Erdem bilgidir.\" Aristoteles: erdem **altın orta**dır (cesaret, korkaklık ile atılganlık arasında); amaç **mutluluk (eudaimonia)**. |\n| **Hazcılık (hedonizm)** | Aristippos, Epikuros | İyi olan hazdır. Epikuros: ölçülü, kalıcı haz (acıdan kurtulma, ataraksia). |\n| **Yararcılık (utilitarizm)** | Bentham, **J. S. Mill** | \"En çok sayıda insana en büyük mutluluk.\" Eylemin **sonucuna** bakılır. |\n| **Mutluluk ahlakı (İslam felsefesi)** | Farabi | Gerçek mutluluk erdemle elde edilir. |\n\n# Özgürlük ve Sorumluluk\n\n- **Determinizm (belirlenimcilik):** Her olay nedenlerle belirlenmiştir; insan özgür değildir (Spinoza).\n- **İndeterminizm / özgür irade:** İnsan özgürdür ve sorumludur. **Sartre:** \"İnsan özgür olmaya mahkûmdur.\"\n- **Otodeterminizm:** İnsan kendini belirler (Kant, Bergson).",
     "ornekler": [
      {
       "soru": "Bir doktorun beş hastayı kurtarmak için bir sağlıklı kişinin organlarını alması Kant ve yararcılık açısından nasıl değerlendirilir?",
       "cozum": "**Yararcılık** (sonuç odaklı) daha fazla kişinin mutluluğu gerekçesiyle bunu savunabilir. **Kant** ise insanın asla yalnızca **araç** olarak kullanılamayacağını söyler; eylem ahlaken **yanlıştır**."
      }
     ],
     "ozet": [
      "Kant: kategorik imperatif, ödev ahlakı.",
      "Aristoteles: altın orta, eudaimonia; Mill: en çok kişiye en çok mutluluk.",
      "Sartre: insan özgür olmaya mahkûmdur."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "6. Ünite: Sanat Felsefesi",
   "en": "Unit 6: Philosophy of Art (Aesthetics)"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "6.1",
    "title": {
     "tr": "Estetik ve sanat felsefesinin problemleri",
     "en": "Aesthetics and problems of art"
    },
    "content": {
     "anlatim": "# Estetik\n\n**Sanat felsefesi (estetik):** Güzeli, sanatı, sanat eserini ve sanatçıyı inceleyen felsefe dalı. \"Estetik\" terimini ilk kullanan **Baumgarten**'dir.\n\n**Kavramlar:** güzel, çirkin, yüce (ulvi), trajik, komik, beğeni, sanat eseri, yaratıcılık.\n\n# Güzel Nesnel mi, Öznel mi?\n\n- **Nesnel:** Güzellik nesnenin kendisindedir (Platon: güzelin ideası; Aristoteles: düzen, simetri, oran).\n- **Öznel:** Güzellik bakan kişinin beğenisine göredir (Hume).\n- **Kant:** Güzellik **\"çıkarsız beğeni\"**dir; hiçbir çıkar gözetmeden hoşa giden ve herkesin aynı şekilde beğenmesi beklenen şeydir (öznel ama evrensel iddialı).\n\n# Sanatın Amacı ve Kaynağı\n\n| Görüş | Savunucu | İçerik |\n|---|---|---|\n| **Taklit (yansıtma)** | Platon, Aristoteles | Sanat doğanın taklididir. Platon için sanat \"taklidin taklidi\"dir; Aristoteles için taklit öğretici ve arındırıcıdır (**katarsis**). |\n| **Yaratma** | Croce, Hegel | Sanat sanatçının **sezgi ve hayal gücü** ile yaratmasıdır. |\n| **Oyun** | Schiller, Kant | Sanat yararsız ama özgür bir oyundur. |\n| **İfade/duygu** | Tolstoy | Sanat duyguların aktarılmasıdır. |\n| **Sanat sanat içindir** | — | Sanatın amacı kendisidir. |\n| **Sanat toplum içindir** | — | Sanat topluma hizmet etmeli, mesaj taşımalıdır. |",
     "ornekler": [
      {
       "soru": "Kant'ın 'çıkarsız beğeni' kavramını bir örnekle açıklayınız.",
       "cozum": "Bir gün batımını izlerken ondan bir yarar (para, yiyecek) beklemeyiz; **sadece güzel olduğu için** hoşlanırız. Bu, çıkarsız beğenidir."
      }
     ],
     "ozet": [
      "Estetik: güzeli ve sanatı inceler (Baumgarten).",
      "Platon nesnel güzellik; Kant çıkarsız beğeni.",
      "Sanat: taklit, yaratma, oyun, ifade."
     ]
    }
   }
  ]
 },
 {
  "id": "u7",
  "name": {
   "tr": "7. Ünite: Siyaset Felsefesi",
   "en": "Unit 7: Political Philosophy"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "7.1",
    "title": {
     "tr": "Siyaset felsefesinin konusu ve devletin kökeni",
     "en": "Political philosophy and the origin of the state"
    },
    "content": {
     "anlatim": "# Siyaset Felsefesi\n\n**Siyaset felsefesi:** Devlet, iktidar, yönetim, adalet, özgürlük gibi kavramları **olması gereken** açısından inceleyen felsefe dalı. (Siyaset bilimi ise **olanı** inceler.)\n\n**Kavramlar:** devlet, iktidar, egemenlik, meşruiyet, hak, hukuk, adalet, özgürlük, eşitlik.\n\n# Devletin Kökeni\n\n| Görüş | Savunucu | Açıklama |\n|---|---|---|\n| **Doğal oluşum** | Aristoteles | \"İnsan **politik bir hayvandır** (zoon politikon).\" Devlet, insan doğasının sonucu olarak aileden köye, köyden şehre doğal biçimde gelişir. |\n| **Toplum sözleşmesi** | Hobbes | Doğa durumunda \"insan insanın kurdudur\" ve herkesin herkese savaşı vardır; güvenlik için haklar **mutlak bir egemene** (Leviathan) devredilir. |\n| | Locke | Doğa durumu barışçıldır ama belirsizdir; devlet **doğal hakları (yaşam, özgürlük, mülkiyet)** korumak için kurulur. Bu hakları çiğneyen yönetime karşı direnme hakkı vardır. |\n| | Rousseau | İnsan doğuştan iyidir, toplum bozar; devlet **genel irade** ile kurulmalıdır. |\n| **Güç** | Machiavelli | Devlet güçle kurulur ve korunur; \"Amaca ulaşmak için her yol mubahtır.\" |\n| **Sınıf çatışması** | Marx | Devlet egemen sınıfın baskı aracıdır. |",
     "ornekler": [
      {
       "soru": "Hobbes ve Locke'un doğa durumu anlayışları farkı devlet anlayışlarına nasıl yansır?",
       "cozum": "Hobbes doğa durumunu **savaş hâli** gördüğü için güvenliği sağlayacak **mutlak bir otorite** ister. Locke doğa durumunu daha barışçıl gördüğünden devletin görevini **doğal hakları korumakla** sınırlar → **liberal, sınırlı devlet**."
      }
     ],
     "ozet": [
      "Siyaset felsefesi: olması gereken devlet.",
      "Aristoteles: insan politik bir varlık.",
      "Toplum sözleşmesi: Hobbes, Locke, Rousseau."
     ]
    }
   },
   {
    "id": "k2",
    "code": "7.2",
    "title": {
     "tr": "Meşruiyet, ideal düzen ve adalet",
     "en": "Legitimacy, ideal order and justice"
    },
    "content": {
     "anlatim": "# İktidarın Meşruiyeti\n\nİktidarın kaynağı nedir? (Weber'e göre meşruiyet türleri)\n- **Geleneksel:** Gelenek ve göreneklere dayanan yönetim (krallık).\n- **Karizmatik:** Liderin olağanüstü kişisel özelliklerine dayanan yönetim.\n- **Yasal-akılcı:** Hukuk kurallarına ve seçime dayanan yönetim (modern demokrasiler).\n\nBazı düşünürlere göre iktidarın kaynağı **Tanrı** (teokrasi), **güç** ya da **halk** (demokrasi) olabilir.\n\n# İdeal Düzen (Ütopyalar)\n\n| Eser | Yazar | Fikir |\n|---|---|---|\n| **Devlet** | Platon | Yöneticiler **filozof krallar**dır; toplum yöneticiler, bekçiler ve üreticiler olarak ayrılır. |\n| **El-Medinetü'l-Fazıla (Erdemli Şehir)** | Farabi | Erdemli bir yöneticinin yönettiği, mutluluğu amaçlayan şehir. |\n| **Ütopya** | Thomas More | Özel mülkiyetin olmadığı eşitlikçi bir ada. |\n| **Güneş Ülkesi** | Campanella | Bilge rahiplerin yönettiği ortak mülkiyetli düzen. |\n| **Yeni Atlantis** | Francis Bacon | Bilim ve teknolojiyle yönetilen toplum. |\n\n# Adalet\n\n- **Platon:** Herkesin **kendine uygun işi** yapması.\n- **Aristoteles:** **Dağıtıcı adalet** (herkese hak ettiği) ve **düzeltici adalet** (haksızlığın giderilmesi).\n- **Rawls:** **Hakkaniyet olarak adalet**; \"**cehalet peçesi**\" arkasında, kimse toplumdaki yerini bilmeden ilkeleri seçerse adil ilkelere ulaşılır.",
     "ornekler": [
      {
       "soru": "Rawls'un 'cehalet peçesi' düşünce deneyi neyi amaçlar?",
       "cozum": "Kişilerin **zengin mi fakir mi, hangi cinsiyette, hangi yetenekte** olacaklarını bilmeden kuralları seçmeleri, kimseyi kayırmayan **tarafsız ve adil** ilkelerin ortaya çıkmasını sağlar."
      }
     ],
     "ozet": [
      "Meşruiyet: geleneksel, karizmatik, yasal-akılcı.",
      "Ütopyalar: Platon Devlet, Farabi Erdemli Şehir, More Ütopya.",
      "Adalet: Platon, Aristoteles, Rawls (cehalet peçesi)."
     ]
    }
   }
  ]
 },
 {
  "id": "u8",
  "name": {
   "tr": "8. Ünite: Din Felsefesi",
   "en": "Unit 8: Philosophy of Religion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "8.1",
    "title": {
     "tr": "Din felsefesinin konusu ve Tanrı anlayışları",
     "en": "Subject and conceptions of God"
    },
    "content": {
     "anlatim": "# Din Felsefesi\n\n**Din felsefesi:** Dinin temel iddialarını (Tanrı'nın varlığı, ruhun ölümsüzlüğü, kötülük) **akıl yoluyla** inceleyen felsefe dalı. **İlahiyat (teoloji)** ise dini inancın içinden, onu savunarak inceler; din felsefesi tarafsız ve eleştireldir.\n\n**Kavramlar:** Tanrı, vahiy, inanç, iman, ibadet, ölümsüzlük, peygamber, kötülük.\n\n| Görüş | Tanrı anlayışı |\n|---|---|\n| **Teizm** | Tanrı vardır, evreni yaratmış ve yönetmeye devam eder; vahiy gönderir. |\n| **Deizm** | Tanrı evreni yaratmış ama işleyişine **karışmaz**; vahyi kabul etmez, Tanrı'ya akılla ulaşılır. |\n| **Panteizm** | Tanrı ve evren **özdeştir** (Spinoza: \"Tanrı = doğa\"). |\n| **Ateizm** | Tanrı yoktur. |\n| **Agnostisizm** | Tanrı'nın var olup olmadığı **bilinemez**. |\n| **Fideizm** | Dini inanç akılla değil **inançla** kabul edilir. |",
     "ornekler": [
      {
       "soru": "Deizm ile teizm arasındaki temel fark nedir?",
       "cozum": "Her ikisi Tanrı'nın varlığını kabul eder. **Teizm** Tanrı'nın evrene müdahalesini ve vahyi kabul eder; **deizm** Tanrı'nın evreni yarattıktan sonra karışmadığını ve vahyin gereksiz olduğunu savunur."
      }
     ],
     "ozet": [
      "Din felsefesi: dinin iddialarını akılla inceler.",
      "Teizm, deizm, panteizm, ateizm, agnostisizm.",
      "Agnostisizm: bilinemezcilik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "8.2",
    "title": {
     "tr": "Tanrı'nın varlığına ilişkin kanıtlar ve problemler",
     "en": "Arguments for God and related problems"
    },
    "content": {
     "anlatim": "# Tanrı'nın Varlığına İlişkin Kanıtlar\n\n| Kanıt | Savunucu | Özü |\n|---|---|---|\n| **Ontolojik** | Anselmus, Descartes | Tanrı \"kendisinden daha büyüğü düşünülemeyen\" mükemmel varlıktır; mükemmelliğe varlık da dâhildir, öyleyse Tanrı vardır. |\n| **Kozmolojik** | Aristoteles (ilk hareket ettirici), Farabi, İbn Sina | Her şeyin bir nedeni vardır; neden zinciri sonsuza gidemez, bir **ilk neden** olmalıdır. İbn Sina: **zorunlu varlık**. |\n| **Teleolojik (düzen/tasarım)** | Paley (\"saatçi\"), Platon | Evrendeki **düzen ve amaçlılık** akıllı bir düzenleyiciyi gerektirir. |\n| **Ahlak kanıtı** | Kant | Ahlak yasasının anlamlı olması için erdem ile mutluluğu buluşturacak Tanrı'nın varlığı **koyut** olarak kabul edilmelidir. |\n\n# Kötülük Problemi\n\n\"Tanrı her şeye gücü yeten ve tamamen iyi ise neden kötülük vardır?\" (Epikuros'a atfedilir)\n- **Cevaplar (teodise):** Kötülük insanın **özgür iradesinin** sonucudur; kötülük iyiliğin fark edilmesini sağlar; insan sınanmaktadır.\n\n# Ruhun Ölümsüzlüğü\n\n- Platon: Ruh ölümsüzdür; bedenden önce idealar dünyasında vardı.\n- Materyalistler: Ruh bedenle birlikte yok olur.",
     "ornekler": [
      {
       "soru": "'Evrendeki düzen tesadüf olamaz, bir düzenleyicisi olmalıdır' görüşü hangi kanıta örnektir?",
       "cozum": "**Teleolojik (düzen / tasarım) kanıtı**dır."
      }
     ],
     "ozet": [
      "Ontolojik: mükemmel varlık kavramından.",
      "Kozmolojik: ilk neden / zorunlu varlık; teleolojik: düzen.",
      "Kötülük problemi ve özgür irade cevabı."
     ]
    }
   }
  ]
 },
 {
  "id": "u9",
  "name": {
   "tr": "9. Ünite: Bilim Felsefesi",
   "en": "Unit 9: Philosophy of Science"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "9.1",
    "title": {
     "tr": "Bilim felsefesinin konusu ve bilimin tanımı",
     "en": "Philosophy of science and defining science"
    },
    "content": {
     "anlatim": "# Bilim Felsefesi\n\n**Bilim felsefesi:** Bilimin **yöntemini, kavramlarını, değerini ve sınırlarını** eleştirel olarak inceleyen felsefe dalı. Bilimi yapmaz; bilim üzerine düşünür.\n\n**Kavramlar:** bilim, yöntem, hipotez, teori, yasa, paradigma, gözlem, deney, doğrulama, yanlışlama.\n\n# Bilim Nedir?\n\n| Anlayış | Açıklama |\n|---|---|\n| **Ürün olarak bilim** | Bilimsel yöntemle elde edilmiş, sistemli ve tutarlı **bilgiler bütünü**. Önerme ve teorilerin mantıksal yapısı incelenir (Viyana Çevresi, mantıkçı pozitivizm). |\n| **Etkinlik olarak bilim** | Bilim insanlarının **topluluk** içinde yürüttüğü, tarihsel ve sosyal koşullardan etkilenen bir süreç (Kuhn). |\n\n**Bilimin özellikleri:** olgusaldır, nesneldir, eleştireldir, akla dayanır, genelleyicidir, seçicidir, **yanlışlanabilir**dir.",
     "ornekler": [
      {
       "soru": "Bilimi 'etkinlik' olarak görmek ne demektir?",
       "cozum": "Bilim yalnızca hazır bilgiler değil, bilim insanlarının **toplumsal, tarihsel ve kültürel** koşullarda yürüttüğü bir süreçtir; bilim topluluğunun kabulleri de bu sürece dâhildir."
      }
     ],
     "ozet": [
      "Bilim felsefesi bilimi sorgular, yapmaz.",
      "Ürün olarak bilim vs etkinlik olarak bilim.",
      "Bilim olgusal, nesnel, yanlışlanabilir."
     ]
    }
   },
   {
    "id": "k2",
    "code": "9.2",
    "title": {
     "tr": "Bilimsel yöntem ve bilimin sınırları",
     "en": "Scientific method and limits of science"
    },
    "content": {
     "anlatim": "# Bilimin Yöntemi\n\n| Görüş | Savunucu | Yöntem |\n|---|---|---|\n| **Tümevarımcılık** | Francis Bacon | Gözlem ve deneylerden **genel yasalara** ulaşılır. \"Bilgi güçtür.\" İdoller (önyargılar) bilgiyi bozar. |\n| **Yanlışlamacılık** | **Karl Popper** | Teoriler doğrulanamaz, ancak **yanlışlanabilir**. Bilimsel bir teori yanlışlanabilir olmalıdır; yanlışlanamayan iddialar bilimsel değildir. |\n| **Paradigma** | **Thomas Kuhn** | Bilim **normal bilim → anomali → bunalım → bilimsel devrim → yeni paradigma** şeklinde ilerler. Örnek: Ptolemaios'un yer merkezli modelinden Kopernik'in güneş merkezli modeline geçiş. |\n| **Araştırma programları** | Lakatos | Teorilerin **sert çekirdeği** korunur, **koruyucu kuşak** değiştirilir; ilerleyen ve yozlaşan programlar ayrılır. |\n| **Yöntem karşıtlığı** | Feyerabend | \"Her şey uyar.\" Tek bir bilimsel yöntem yoktur. |\n\n# Bilimin Sınırları ve Değeri\n\n- Bilim **olgularla** ilgilenir; değer yargıları (iyi, güzel, anlamlı) bilimin dışında kalır.\n- Bilimsel bilgi **kesin ve mutlak değil**, düzeltilebilir ve olasılıklıdır.\n- **Bilim ve etik:** Genetik mühendisliği, yapay zekâ, nükleer enerji gibi alanlarda bilimin sonuçlarının etik açıdan sorgulanması gerekir.",
     "ornekler": [
      {
       "soru": "'Bütün kuğular beyazdır' iddiasını Popper nasıl değerlendirir?",
       "cozum": "Binlerce beyaz kuğu görmek bu iddiayı **kanıtlamaz**; ama tek bir **siyah kuğu** onu yanlışlar. İddia yanlışlanabilir olduğu için **bilimseldir**; teori, yanlışlanana kadar geçici olarak kabul edilir."
      }
     ],
     "ozet": [
      "Bacon: tümevarım; Popper: yanlışlanabilirlik.",
      "Kuhn: paradigma ve bilimsel devrim.",
      "Bilimsel bilgi kesin değil, düzeltilebilir."
     ]
    }
   }
  ]
 }
];
