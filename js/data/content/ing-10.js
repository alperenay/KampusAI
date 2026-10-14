/* =========================================================
   10. Sınıf İngilizce (Stepwise B1.2) — kazanım rehberi
   Kaynak: kullanıcının verdiği "10. Sınıf İngilizce (Stepwise B1.2) Kapsamlı Konu Anlatım ve Kazanım Rehberi" (8 tema).
   Kazanım kodları tema numaralarıdır. Question tag özel durumları, mustn't/don't have to farkı, since/for ve alıştırma soruları eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["10/ingilizce"] = [
 {
  "id": "u1",
  "name": {
   "tr": "Theme 1: School Life & Education",
   "en": "Theme 1: School Life & Education"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T1.1",
    "title": {
     "tr": "Okul türleri; Simple Present vs Present Continuous",
     "en": "Types of schools; Simple Present vs Present Continuous"
    },
    "content": {
     "anlatim": "# Vocabulary — Types of Schools\n\n| English | Türkçe |\n|---|---|\n| Nursery / Preschool | Anaokulu |\n| Primary School | İlkokul |\n| Lower Secondary School | Ortaokul |\n| Upper Secondary School | Lise |\n| Boarding School | Yatılı okul |\n| Vocational School | Meslek lisesi |\n| Fine Arts School | Güzel sanatlar lisesi |\n| STEM School | Fen-teknoloji-mühendislik-matematik odaklı okul |\n\n# Grammar — Simple Present vs Present Continuous\n\n| | Simple Present | Present Continuous |\n|---|---|---|\n| Yapı | V1 / V1**-s** (he/she/it) | **am/is/are + V-ing** |\n| Kullanım | Rutin, alışkanlık, genel gerçek | Konuşma anı, geçici durum |\n| Zaman zarfları | usually, always, every day, often, never | now, at the moment, today, these days, currently |\n| Örnek | Ali **usually plays** football after school. | Today, he **is practising** the guitar for the concert. |\n\n**Durum fiilleri (stative verbs)** — *know, like, love, want, believe, understand, need* — genellikle **-ing almaz**: I **know** the answer (✔), I am knowing (✘).",
     "ornekler": [
      {
       "soru": "Boşlukları doldurun: \"She ___ (study) at a boarding school, but this week she ___ (stay) at home.\"",
       "cozum": "She **studies** at a boarding school (genel durum), but this week she **is staying** at home (geçici durum)."
      },
      {
       "soru": "Hatayı düzeltin: \"I am understanding the topic now.\"",
       "cozum": "*understand* durum fiilidir → \"I **understand** the topic now.\""
      }
     ],
     "ozet": [
      "Simple Present: rutin ve genel gerçek.",
      "Present Continuous: şu an ve geçici durum.",
      "Durum fiilleri -ing almaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T1.2",
    "title": {
     "tr": "Question tags; must/can't (çıkarım); belgisiz zamirler",
     "en": "Question tags; must/can't for deductions; indefinite pronouns"
    },
    "content": {
     "anlatim": "# Question Tags (Soru Ekleri)\n\nOnay almak için cümle sonuna eklenir. **Kural:** Cümle olumluysa tag olumsuz; cümle olumsuzsa tag olumlu. Tag'de cümledeki **yardımcı fiil** ve **özne zamiri** kullanılır.\n\n| Cümle | Tag |\n|---|---|\n| You usually play football, | **don't you?** |\n| The pupils aren't using computers, | **are they?** |\n| Your teachers support you, | **don't they?** |\n| She can swim, | **can't she?** |\n| He went to school, | **didn't he?** |\n| I am right, | **aren't I?** (özel durum) |\n| Let's go, | **shall we?** (özel durum) |\n\n# Logical Deductions — must / can't\n\nKanıta dayalı tahmin:\n- **must + V1** → \"kesin ... olmalı\" (güçlü olumlu çıkarım): *Her bag is here. She **must be** in the locker room.*\n- **can't + V1** → \"... olamaz\" (imkânsızlık): *The headmaster **can't be** at school; he is attending a conference.*\n\n# Indefinite Pronouns (Belgisiz Zamirler)\n\n| some- | any- | no- | every- |\n|---|---|---|---|\n| someone / somebody (biri) | anyone (herhangi biri / kimse) | no one / nobody (hiç kimse) | everyone (herkes) |\n| something (bir şey) | anything (herhangi bir şey) | nothing (hiçbir şey) | everything (her şey) |\n| somewhere (bir yer) | anywhere | nowhere | everywhere |\n\n*some-* olumlu cümlede, *any-* olumsuz ve soru cümlesinde; *no-* zaten olumsuz anlam taşır, fiil olumlu kalır: *I know **nothing**.* (✔) / *I don't know nothing.* (✘)",
     "ornekler": [
      {
       "soru": "Tag ekleyin: \"Mert hasn't finished his project, ___?\"",
       "cozum": "**has he?** — cümle olumsuz, tag olumlu; yardımcı fiil *has*."
      },
      {
       "soru": "\"The lights are off and nobody answers. They ___ be at home.\" must mi can't mi?",
       "cozum": "**can't** — kanıtlar evde olmalarının imkânsız olduğunu gösteriyor."
      }
     ],
     "ozet": [
      "Olumlu cümle → olumsuz tag; olumsuz → olumlu.",
      "must = kesin öyle olmalı; can't = olamaz.",
      "some- olumlu, any- olumsuz/soru, no- olumlu fiille."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "Theme 2: Classroom Life & Learning",
   "en": "Theme 2: Classroom Life & Learning"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T2.1",
    "title": {
     "tr": "Gelecek: will, be going to, may/might/could",
     "en": "Future: will, be going to, may/might/could"
    },
    "content": {
     "anlatim": "# Future Forms\n\n| Yapı | Kullanım | Örnek |\n|---|---|---|\n| **will + V1** | Ani karar, teklif, söz, genel tahmin | Wait, **I'll help** you with the computer. |\n| **be going to + V1** | Önceden planlanmış niyet; kanıta dayalı tahmin | Robert and I **are going to do** the Potato Battery project. · Look at the clouds! It **is going to rain**. |\n| **may / might / could + V1** | Olasılık (kesin değil) | The tablet **might run out** of battery. |\n\n**İpucu:** \"I think / probably / I'm sure\" ile genelde **will**; \"Look!\", \"planlıyorum\" bağlamında **going to**.",
     "ornekler": [
      {
       "soru": "Uygun yapıyı seçin: \"I've already bought the tickets. We ___ (watch) the play on Friday.\"",
       "cozum": "**are going to watch** — önceden planlanmış bir niyet (biletler alınmış)."
      },
      {
       "soru": "\"The phone is ringing.\" — \"I ___ (answer) it!\"",
       "cozum": "**I'll answer** it — konuşma anında verilen ani karar."
      }
     ],
     "ozet": [
      "will: ani karar, söz, tahmin.",
      "be going to: plan ve kanıta dayalı tahmin.",
      "may/might/could: olasılık."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T2.2",
    "title": {
     "tr": "Zorunluluk, yasak, tavsiye: must, have to, mustn't, should",
     "en": "Obligation, prohibition, advice"
    },
    "content": {
     "anlatim": "# Modals of Obligation & Advice\n\n| Modal | Anlam | Örnek |\n|---|---|---|\n| **must** | Güçlü zorunluluk (konuşanın/kuralın) | You **must** submit your work by 1 December. |\n| **have to** | Dış kaynaklı zorunluluk | I **have to** wear a uniform at school. |\n| **mustn't** | **Yasak** | You **mustn't** delete your friends' files. |\n| **don't have to** | **Gereklilik yok** (yasak değil!) | You **don't have to** come early; the class starts at 9. |\n| **should / ought to** | Tavsiye | You **ought to** organise your notes more carefully. |\n| **shouldn't** | Olumsuz tavsiye | You **shouldn't** stay up late before exams. |\n\n> Dikkat: **mustn't** (yapmamalısın — yasak) ≠ **don't have to** (yapmak zorunda değilsin).",
     "ornekler": [
      {
       "soru": "Farkı açıklayın: \"You mustn't use your phone.\" / \"You don't have to use your phone.\"",
       "cozum": "İlki **yasak** bildirir (telefon kullanmak yasak). İkincisi **gereklilik olmadığını** bildirir (kullanmak zorunda değilsin, istersen kullanabilirsin)."
      }
     ],
     "ozet": [
      "must/have to: zorunluluk.",
      "mustn't: yasak; don't have to: gerek yok.",
      "should/ought to: tavsiye."
     ]
    }
   },
   {
    "id": "k3",
    "code": "T2.3",
    "title": {
     "tr": "Dönüşlü ve iyelik zamirleri; VAK öğrenme stilleri",
     "en": "Reflexive & possessive pronouns; VAK learning styles"
    },
    "content": {
     "anlatim": "# Reflexive Pronouns\n\nEylemi yapan ile etkilenen **aynı** kişi olduğunda: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.\n- I sometimes talk to **myself** when I have a problem.\n- **by + reflexive** = tek başına: She did the project **by herself**.\n\n# Possessive Adjectives vs Pronouns\n\n| Possessive adjective (isimden önce) | Possessive pronoun (isim yerine) |\n|---|---|\n| my book | **mine** |\n| your laptop | **yours** |\n| his / her bag | **his / hers** |\n| our class | **ours** |\n| their notes | **theirs** |\n\n*The laptop on the table is **mine**, but the one on the sofa is **yours**.*\n\n# Learning Styles — VAK Model\n\n| Stil | Nasıl öğrenir? |\n|---|---|\n| **Visual** (görsel) | Görme, okuma, renkli notlar, **mind mapping**, çizelgeler |\n| **Auditory** (işitsel) | Dinleme, sesli tekrar, grup tartışması, **brainstorming** |\n| **Kinaesthetic** (kinestetik) | Hareket, **role-play**, proje, **hands-on** etkinlikler |",
     "ornekler": [
      {
       "soru": "Boşluğu doldurun: \"This isn't my pencil case. ___ is blue.\"",
       "cozum": "**Mine** is blue — isim yerine kullanıldığı için possessive pronoun."
      },
      {
       "soru": "Rol yaparak ve deney yaparak en iyi öğrenen öğrenci hangi stildedir?",
       "cozum": "**Kinaesthetic** (kinestetik) öğrenen."
      }
     ],
     "ozet": [
      "Reflexive: özne ve nesne aynı kişi.",
      "mine/yours… isim yerine kullanılır.",
      "VAK: visual, auditory, kinaesthetic."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "Theme 3: Personal Life & Well-Being",
   "en": "Theme 3: Personal Life & Well-Being"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T3.1",
    "title": {
     "tr": "Vücut, hastalıklar ve tavsiye",
     "en": "Body parts, illnesses and advice"
    },
    "content": {
     "anlatim": "# Vocabulary — Body Parts\n\nforehead (alın), eyebrow (kaş), eyelash (kirpik), tongue (dil), chin (çene), shoulders (omuzlar), chest (göğüs), elbow (dirsek), knee (diz), ankle (ayak bileği), wrist (el bileği).\n\n# Illnesses & Symptoms\n\n| Illness / symptom | Türkçe |\n|---|---|\n| a cold / flu | soğuk algınlığı / grip |\n| fever | ateş |\n| chickenpox / measles | su çiçeği / kızamık |\n| malaria | sıtma |\n| toothache / stomach ache / earache / backache | diş / mide / kulak / sırt ağrısı |\n| sore throat | boğaz ağrısı |\n| allergy | alerji |\n| dizziness | baş dönmesi |\n\n# Giving Advice\n\n- You **should** rest properly and drink tea with lemon.\n- You **ought to** see a doctor.\n- You **shouldn't** go out in cold weather.\n- **Why don't you** take a painkiller? / **If I were you, I would** stay in bed.\n\n**Asking about health:** What's the matter? / What's wrong with you? — I've got a sore throat. I feel dizzy.",
     "ornekler": [
      {
       "soru": "Bir arkadaşınız \"I've got a terrible toothache.\" diyor. İki tavsiye verin.",
       "cozum": "You **should see** a dentist. / You **shouldn't eat** sweets for a while."
      }
     ],
     "ozet": [
      "Ağrılar: -ache (toothache, headache).",
      "Tavsiye: should / ought to / Why don't you…?",
      "What's the matter? ile sağlık sorulur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T3.2",
    "title": {
     "tr": "Sıfatlarla karşılaştırma; moda kelimeleri; -ed/-ing sıfatlar",
     "en": "Comparisons; fashion vocabulary; -ed/-ing adjectives"
    },
    "content": {
     "anlatim": "# Comparisons with Adjectives\n\n| Sıfat | Comparative | Örnek |\n|---|---|---|\n| Kısa (tek heceli) | **-er than** | Modern life is **harder than** before. |\n| -y ile biten | **-ier than** | Today is **busier than** yesterday. |\n| Uzun (2+ hece) | **more … than** | Sustainable fashion is **more environmentally friendly than** fast fashion. · Carol is **more ambitious than** many students. |\n| Düzensiz | good → **better**, bad → **worse**, far → **further** | |\n| Eşitlik | **as … as** / **not as … as** | Mental health is **as important as** physical health. |\n\n# Vocabulary — Fashion\n\n| Kategori | Kelimeler |\n|---|---|\n| Accessories | necklace (kolye), bracelet (bilezik), handbag, scarf (atkı/eşarp), belt (kemer), bow tie (papyon), gloves (eldiven), hairband (saç bandı) |\n| Styles | elegant (zarif), stylish, trendy (modaya uygun), vintage (nostaljik), neat (düzenli), smart casual (günlük şık) |\n| Materials & patterns | cotton (pamuk), leather (deri), denim (kot), floral (çiçekli), striped (çizgili), plain (düz), checked (kareli) |\n\n# -ed / -ing Adjectives\n\n- **-ed:** kişinin **hissettiği** duygu → I am **bored**. She feels **excited**. They are **anxious**.\n- **-ing:** duyguya **sebep olan** şey → The film is **boring**. The trip was **exciting**.",
     "ornekler": [
      {
       "soru": "Doğru seçeneği yazın: \"The lesson was so (interested / interesting) that I wasn't (bored / boring) at all.\"",
       "cozum": "The lesson was so **interesting** (dersin özelliği) that I wasn't **bored** (benim hissim) at all."
      },
      {
       "soru": "Karşılaştırın: \"A leather jacket / a cotton T-shirt (expensive)\"",
       "cozum": "A leather jacket is **more expensive than** a cotton T-shirt."
      }
     ],
     "ozet": [
      "Kısa sıfat -er than; uzun sıfat more … than.",
      "as … as eşitlik bildirir.",
      "-ed hissedilen, -ing hissettiren."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "Theme 4: Family Life & Home",
   "en": "Theme 4: Family Life & Home"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T4.1",
    "title": {
     "tr": "Simple Past, used to, could (geçmiş)",
     "en": "Simple Past, used to, could (past ability)"
    },
    "content": {
     "anlatim": "# Simple Past (V2)\n\nGeçmişte belirli bir zamanda **tamamlanmış** eylemler. Düzenli fiiller **-ed** alır; düzensizler ezberlenir (go–went, have–had, see–saw).\n| (+) | Alp **visited** his friend's grandfather's farmhouse yesterday. |\n|---|---|\n| (−) | He **didn't visit** … (didn't + V1) |\n| (?) | **Did** you **have** any hobbies when you were a teenager? |\n\nZaman ifadeleri: yesterday, last week, two years ago, in 2010, when I was a child.\n\n# Used to — Geçmişteki Alışkanlıklar\n\nGeçmişte düzenli yapılan ama **artık devam etmeyen** alışkanlık ve durumlar.\n| (+) | My grandmother **used to wake up** before sunrise. |\n|---|---|\n| (−) | They **didn't use to have** modern hobbies. |\n| (?) | **Did** people **use to live** in simple cottages? |\n\n> Olumsuz ve soruda **use to** (d'siz) yazılır.\n\n# Could — Geçmişteki Yetenek\n\n- He **could work** long hours outside. / She **could ride** a horse.\n- Olumsuz: I **couldn't swim** when I was five.",
     "ornekler": [
      {
       "soru": "\"My grandfather smoked a lot, but he doesn't smoke now.\" cümlesini used to ile yeniden yazın.",
       "cozum": "My grandfather **used to smoke** a lot."
      },
      {
       "soru": "Hatayı düzeltin: \"Did you used to play outside?\"",
       "cozum": "\"Did you **use to** play outside?\" — soru cümlesinde *use to*."
      }
     ],
     "ozet": [
      "Simple Past: did/didn't + V1, olumluda V2.",
      "used to: artık sürmeyen alışkanlık.",
      "could: geçmişteki yetenek."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T4.2",
    "title": {
     "tr": "Ev tipleri, aile yapıları, ev işleri",
     "en": "House types, family structures, household chores"
    },
    "content": {
     "anlatim": "# House Types\n\n| English | Türkçe |\n|---|---|\n| detached house | müstakil ev |\n| semi-detached house | ikiz ev |\n| terraced house | sıra ev |\n| cottage | köy evi / kulübe |\n| farmhouse | çiftlik evi |\n| treehouse | ağaç ev |\n| houseboat | tekne ev |\n| igloo | kardan ev |\n| hut | kulübe |\n\n# Family Structures\n\n- **Nuclear family:** anne, baba ve çocuklardan oluşan çekirdek aile.\n- **Immediate family:** en yakın aile üyeleri (anne-baba, kardeşler, eş, çocuklar).\n- **Extended family:** büyükanne-büyükbaba, amca, teyze gibi akrabaları da içeren geniş aile.\n- **Blended family:** üvey ebeveyn ve/veya üvey kardeşlerin bulunduğu aile.\n\n# Household Chores\n\nset the table (sofrayı kurmak), do the dusting (toz almak), do the laundry (çamaşır yıkamak), do the ironing (ütü yapmak), run errands (ufak işleri halletmek), do the washing-up (bulaşık yıkamak), make the bed (yatağı toplamak), take out the rubbish (çöpü çıkarmak).\n\n> **do** ile: the laundry, the ironing, the dusting, the washing-up · **make** ile: the bed, dinner.",
     "ornekler": [
      {
       "soru": "\"My grandparents, aunts and cousins all live with us.\" Bu hangi aile tipidir?",
       "cozum": "**Extended family** (geniş aile)."
      }
     ],
     "ozet": [
      "Ev tipleri: detached, semi-detached, terraced…",
      "Aile: nuclear, extended, blended.",
      "Ev işleri: do the laundry, make the bed."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "Theme 5: Neighbourhood, City & Social Life",
   "en": "Theme 5: Neighbourhood, City & Social Life"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T5.1",
    "title": {
     "tr": "Past Continuous; when / while",
     "en": "Past Continuous; when / while"
    },
    "content": {
     "anlatim": "# Past Continuous\n\n**was / were + V-ing** → geçmişte belli bir anda **devam etmekte olan** eylem.\n- What **were** you **doing** at 8 p.m. yesterday? — I **was watching** a film.\n- **While** I **was cycling** to school, I dreamt about travelling long distances.\n\n# Past Continuous + Simple Past\n\nUzun süren eylem (**Past Continuous**) devam ederken kısa bir eylem (**Simple Past**) araya girer.\n| Bağlaç | Ardından genelde | Örnek |\n|---|---|---|\n| **while** | Past Continuous | **While** she **was getting** out of the taxi, it **started** raining heavily. |\n| **when** | Simple Past | We **were waiting** for a taxi **when** the rain **started**. |\n\nİki eylem aynı anda sürüyorsa ikisi de Past Continuous: *While I **was studying**, my brother **was playing** games.*",
     "ornekler": [
      {
       "soru": "Fiilleri çekimleyin: \"I ___ (walk) home when I ___ (see) an old friend.\"",
       "cozum": "I **was walking** home when I **saw** an old friend."
      }
     ],
     "ozet": [
      "was/were + V-ing: geçmişte devam eden eylem.",
      "while + Past Continuous; when + Simple Past.",
      "Uzun eylem kesintiye uğrar."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T5.2",
    "title": {
     "tr": "Mahalle, hizmetler ve ulaşım",
     "en": "Neighbourhood, services and transport"
    },
    "content": {
     "anlatim": "# Recreational Places\n\ncafé, cinema, gym, sports club, park, library, shopping mall, theatre.\n\n# Community Services\n\n| Place | What can you do there? |\n|---|---|\n| **pharmacy** (eczane) | buy medicine, have your blood pressure checked, get first-aid bandages |\n| hospital | see a doctor |\n| bank | withdraw / deposit money |\n| police station | report a crime |\n| post office | send a parcel |\n| veterinary clinic | take your pet for a check-up |\n\n# Transportation\n\ntram, bus, **the Underground** (metro), ferry (vapur), e-scooter, taxi, bicycle, train.\n\n| Pros (+) | Cons (−) |\n|---|---|\n| reliable (güvenilir), affordable (uygun fiyatlı), eco-friendly (çevre dostu), time-saving, convenient | overcrowded (aşırı kalabalık), time-consuming, expensive, polluting, unreliable |\n\n**Örnek karşılaştırma:** *The ferry is more relaxing than the bus, but it is more time-consuming.*",
     "ornekler": [
      {
       "soru": "Metro (the Underground) için bir artı, bir eksi yazın.",
       "cozum": "Pro: It is **time-saving** and **reliable**. Con: It can be **overcrowded** during rush hour."
      }
     ],
     "ozet": [
      "Hizmetler: pharmacy, bank, vet clinic…",
      "Ulaşım: tram, ferry, the Underground…",
      "Pros & cons: reliable, affordable vs overcrowded."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "Theme 6: Life in the World & Culture",
   "en": "Theme 6: Life in the World & Culture"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T6.1",
    "title": {
     "tr": "Present Perfect; be able to",
     "en": "Present Perfect; be able to"
    },
    "content": {
     "anlatim": "# Present Perfect\n\n**have / has + V3** → geçmişte başlayıp **etkisi süren** ya da zamanı belirtilmeyen eylemler, deneyimler.\n- People **have celebrated** World Food Day **since** 1979.\n- I **haven't visited** any supermarkets **for** six months.\n- **Have** you **ever tried** sushi?\n\n| Zarf | Kullanım |\n|---|---|\n| **since** | başlangıç noktası (since 2020, since Monday) |\n| **for** | süre (for two years, for ages) |\n| ever / never | deneyim |\n| already / just / yet | yakın geçmiş; **yet** olumsuz ve soruda |\n\n> Belirli geçmiş zaman (yesterday, last year) varsa **Simple Past** kullanılır: *I **visited** Rome last year.*\n\n# Be Able To\n\n*can*'in kullanılamadığı zamanlarda:\n- Past: She **was able to** finish on time.\n- Future: You **will be able to** cook it yourself.\n- Present Perfect: Over the past years, we **have been able to** try many different foods.",
     "ornekler": [
      {
       "soru": "since mi for mu? \"She has lived in Japan ___ 2019.\" / \"___ five years.\"",
       "cozum": "**since** 2019 (başlangıç noktası) / **for** five years (süre)."
      },
      {
       "soru": "Hatayı düzeltin: \"I have visited Paris last summer.\"",
       "cozum": "Belirli geçmiş zaman var → \"I **visited** Paris last summer.\""
      }
     ],
     "ozet": [
      "have/has + V3: etkisi süren eylem, deneyim.",
      "since başlangıç, for süre.",
      "be able to: can'in diğer zamanları."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T6.2",
    "title": {
     "tr": "Quantifiers; need/needn't; dünya mutfağı",
     "en": "Quantifiers; need/needn't; world cuisine"
    },
    "content": {
     "anlatim": "# Quantifiers\n\n| | Countable (sayılabilen) | Uncountable (sayılamayan) |\n|---|---|---|\n| Olumlu | some, many, a lot of, a few | some, much (resmî), a lot of, a little |\n| Olumsuz / soru | any, many | any, much |\n| Soru kalıbı | **How many** students? | **How much** time / sugar? |\n\n- **some:** olumlu cümle ve **teklif/rica**: *We need to buy **some** vegetables. Would you like **some** tea?*\n- **any:** olumsuz ve soru: *Do you have **any** gluten-free food?*\n\n# Need / Needn't\n\n- We **need to** buy vegetables, but we **needn't** hurry up. (needn't = gerek yok)\n- = We **don't need to** hurry.\n\n# Vocabulary — World Cuisine & Shopping\n\n- Nationalities: Belgian, Croatian, Japanese, Mexican, Italian, Indian…\n- Food preferences: **gluten-free, dairy-free, vegan, vegetarian, halal, sugar-free**\n- Shopping: cashier (kasiyer), shelf (raf), trolley (alışveriş arabası), receipt (fiş), discount (indirim), aisle (reyon arası)",
     "ornekler": [
      {
       "soru": "Doldurun: \"How ___ apples do we need?\" / \"How ___ flour is left?\"",
       "cozum": "How **many** apples (sayılabilir) / How **much** flour (sayılamaz)."
      }
     ],
     "ozet": [
      "many sayılabilen, much sayılamayan.",
      "some olumlu/teklif, any olumsuz/soru.",
      "needn't = gerek yok."
     ]
    }
   }
  ]
 },
 {
  "id": "u7",
  "name": {
   "tr": "Theme 7: Life in Nature & Global Problems",
   "en": "Theme 7: Life in Nature & Global Problems"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T7.1",
    "title": {
     "tr": "Relative clauses; so / because",
     "en": "Relative clauses; so / because"
    },
    "content": {
     "anlatim": "# Relative Clauses\n\nBir ismi tanımlamak ve ek bilgi vermek için:\n| Zamir | Kim/ne için | Örnek |\n|---|---|---|\n| **who / that** | insanlar | Environmental issues affect communities **who/that** rely on natural resources. |\n| **which / that** | nesne, hayvan | Forests provide habitats for species **which/that** need clean water. |\n| **where** | yer | This is the lake **where** we went fishing. |\n| **whose** | sahiplik | She is the scientist **whose** research saved the bees. |\n\n# Cause & Effect\n\n- **because** + **sebep**: Many forests are facing serious threats **because** industrial activities release harmful chemicals.\n- **so** + **sonuç**: Chemicals cause soil pollution, **so** plants cannot grow naturally anymore.\n- **because of** + isim: The river dried up **because of** the drought.",
     "ornekler": [
      {
       "soru": "İki cümleyi birleştirin: \"Bees are important insects. They pollinate plants.\"",
       "cozum": "Bees are important insects **which/that** pollinate plants."
      },
      {
       "soru": "so mu because mu? \"People cut down trees, ___ animals lose their habitats.\"",
       "cozum": "**so** — ardından sonuç geliyor."
      }
     ],
     "ozet": [
      "who insan, which nesne/hayvan, that ikisi için.",
      "because + sebep; so + sonuç.",
      "because of + isim."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T7.2",
    "title": {
     "tr": "Doğal kaynaklar ve küresel sorunlar",
     "en": "Natural resources and global issues"
    },
    "content": {
     "anlatim": "# Natural Resources\n\nsolar energy (güneş enerjisi), wind energy (rüzgâr enerjisi), groundwater (yer altı suyu), freshwater (tatlı su), fossil fuels (fosil yakıtlar), minerals.\n\n# Global Problems\n\n| English | Türkçe |\n|---|---|\n| deforestation | orman tahribatı |\n| habitat destruction | yaşam alanı yıkımı |\n| loss of biodiversity | biyoçeşitlilik kaybı |\n| soil / air / water pollution | toprak / hava / su kirliliği |\n| water shortage | su kıtlığı |\n| global warming | küresel ısınma |\n| greenhouse gases | sera gazları |\n| energy crisis | enerji krizi |\n\n# Protecting Nature\n\n**reduce** consumption, **reuse**, **recycle**, use energy efficiently, take precautions, plant trees, save water.\n\n*If we **recycle** paper, we **will save** trees.* (first conditional ile çözüm önerisi)",
     "ornekler": [
      {
       "soru": "\"Deforestation\" sorununa iki çözüm önerisini İngilizce yazın.",
       "cozum": "We should **plant more trees**. We should **reduce paper consumption** and **recycle** paper."
      }
     ],
     "ozet": [
      "Sorunlar: deforestation, global warming, water shortage.",
      "Çözümler: reduce, reuse, recycle.",
      "Yenilenebilir kaynaklar: solar, wind."
     ]
    }
   }
  ]
 },
 {
  "id": "u8",
  "name": {
   "tr": "Theme 8: Life in the Universe & The Future",
   "en": "Theme 8: Life in the Universe & The Future"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "T8.1",
    "title": {
     "tr": "Zero ve First Conditional",
     "en": "Zero and First Conditionals"
    },
    "content": {
     "anlatim": "# Zero Conditional — Genel Gerçekler\n\n**If + Simple Present, Simple Present** → bilimsel gerçekler, doğa yasaları, her zaman doğru olan durumlar.\n- If bones **do not feel** gravity's pull, they **lose** strength and density.\n- If a meteor **enters** the atmosphere, it **burns**.\n- If you **heat** ice, it **melts**.\n\n# First Conditional — Olası Gelecek\n\n**If + Simple Present, will + V1** → gelecekte gerçekleşmesi **muhtemel** durumlar ve sonuçları.\n- If engineers **develop** artificial gravity, astronauts **will not lose** their muscle strength.\n- If it **rains** tomorrow, we **will stay** at home.\n\n> If cümlesi sonda da olabilir; o zaman virgül kullanılmaz: *Astronauts will be safer **if** they wear special suits.*\n> **unless** = if … not: *Unless we protect the planet, life will be difficult.*",
     "ornekler": [
      {
       "soru": "Zero mı first mı? \"If you mix blue and yellow, you get green.\"",
       "cozum": "**Zero conditional** — her zaman doğru olan bir gerçek."
      },
      {
       "soru": "Tamamlayın: \"If scientists ___ (find) water on Mars, people ___ (build) a colony.\"",
       "cozum": "If scientists **find** water on Mars, people **will build** a colony."
      }
     ],
     "ozet": [
      "Zero: if + present, present (gerçekler).",
      "First: if + present, will + V1 (olası gelecek).",
      "unless = if not."
     ]
    }
   },
   {
    "id": "k2",
    "code": "T8.2",
    "title": {
     "tr": "Uzay ve uzay araştırmaları; çalışma stratejileri",
     "en": "Space and exploration; study strategies"
    },
    "content": {
     "anlatim": "# Planets & Space\n\nMercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune · **Milky Way** (Samanyolu) · asteroid, comet (kuyruklu yıldız), meteor · **orbit** (yörünge), **revolve** (bir şeyin etrafında dönmek), rotate (kendi ekseninde dönmek).\n\n# Life in the Universe\n\nspace colony, creature, alien, artificial atmosphere, artificial gravity, habitable planet.\n\n# Space Exploration\n\nspacecraft, rocket, space mission, **launch** (fırlatmak), **land** (iniş yapmak), **collect data**, **conduct experiments**, **space junk** (uzay çöpü), astronaut, space station.\n\n# Study Strategies (B1.2)\n\n- **Personal dictionary:** yeni kelimeleri eş/zıt anlamları ve örnek cümleleriyle kaydedin.\n- **Grammar in context:** kuralları kendi hayatınızla ilgili cümlelerle pratik edin.\n- **Reading:** **skimming** (genel fikir için göz gezdirme) ve **scanning** (belirli bilgi için tarama).\n- **Self-reflection:** ünite sonu değerlendirmeleriyle eksiklerinizi belirleyin.",
     "ornekler": [
      {
       "soru": "\"Revolve\" ile \"rotate\" arasındaki fark nedir?",
       "cozum": "**Revolve:** bir cismin başka bir cismin etrafında dolanması (Earth revolves around the Sun). **Rotate:** kendi ekseni etrafında dönmesi (Earth rotates once a day)."
      }
     ],
     "ozet": [
      "Gezegenler, Milky Way, orbit, comet.",
      "launch, land, conduct experiments, space junk.",
      "Skimming genel fikir, scanning belirli bilgi."
     ]
    }
   }
  ]
 }
];
