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
    "code": "ENG.10.1.G1–V1",
    "title": {
     "tr": "Okul türleri; Simple Present vs Present Continuous",
     "en": "Types of schools; Simple Present vs Present Continuous"
    },
    "content": {
     "anlatim": "# Vocabulary — Types of Schools\n\n| English | Türkçe |\n|---|---|\n| Nursery / Preschool | Anaokulu |\n| Primary School | İlkokul |\n| Lower Secondary School | Ortaokul |\n| Upper Secondary School | Lise |\n| Boarding School | Yatılı okul |\n| Vocational School | Meslek lisesi |\n| Fine Arts School | Güzel sanatlar lisesi |\n| STEM School | Fen-teknoloji-mühendislik-matematik odaklı okul |\n\n# Grammar — Simple Present vs Present Continuous\n\n| | Simple Present | Present Continuous |\n|---|---|---|\n| Yapı | V1 / V1**-s** (he/she/it) | **am/is/are + V-ing** |\n| Kullanım | Rutin, alışkanlık, genel gerçek | Konuşma anı, geçici durum |\n| Zaman zarfları | usually, always, every day, often, never | now, at the moment, today, these days, currently |\n| Örnek | Ali **usually plays** football after school. | Today, he **is practising** the guitar for the concert. |\n\n**Durum fiilleri (stative verbs)** — *know, like, love, want, believe, understand, need* — genellikle **-ing almaz**: I **know** the answer (✔), I am knowing (✘).\n\n# Adverbs of Frequency (Sıklık Zarfları)\n\n**always (100%) > usually > often > sometimes > rarely / seldom > never (0%)**\n- Genellikle **asıl fiilden önce**, *be* fiilinden **sonra** gelir: *She **often** joins the chess club.* · *He is **never** late.*\n- *How often…?* sorusuna cevap verir: *How often do you have lab work? — Twice a week.*\n\n# Wh-Questions (Bilgi Toplama Soruları)\n\n| Soru | Sorduğu | Örnek |\n|---|---|---|\n| **Who** | Kişi | *Who teaches PE?* |\n| **Where / When** | Yer / zaman | *Where is the staffroom? When does the club meet?* |\n| **Why / How** | Neden / nasıl | *Why are you anxious? How do you manage your time?* |\n| **What kind of** | Tür | *What kind of school is it? — A boarding school.* |\n| **What … like?** | Nasıl bir şey (özellik) | *What is your school like? — It's big and modern.* |\n\n# Object Pronouns (Nesne Zamirleri)\n\n| Özne | I | you | he | she | it | we | they |\n|---|---|---|---|---|---|---|---|\n| **Nesne** | me | you | him | her | it | us | them |\n\n*Our coding teacher is great. Everyone likes **him**.* · *The canteen is small, but we love **it**.*\n\n# Vocabulary — National Days\n\n**29 October** Republic Day · **23 April** National Sovereignty and Children's Day · **19 May** Commemoration of Atatürk, Youth and Sports Day · **15 July** Democracy and National Unity Day · **30 August** Victory Day · **Eid al-Fitr** (Ramazan Bayramı) · **Eid al-Adha** (Kurban Bayramı)",
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
    "code": "ENG.10.1.G2",
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
   },
   {
    "id": "k3",
    "code": "ENG.10.1.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 1)",
     "en": "Reading–writing, pronunciation and performance task (Theme 1)"
    },
    "content": {
     "anlatim": "# Reading: A Day at a Boarding School\n\n*Defne is a tenth grader at a boarding school in Kayseri. Students usually wake up at 6.45 and have breakfast in the canteen. Lessons start at 8.20. Defne's favourite lesson is chemistry because she loves lab work. In the afternoons, she often goes to the coding club, and on Wednesdays she plays volleyball on the school court. This month she is preparing for a spelling bee, so she is studying in the library every evening. Sometimes she feels anxious before exams, but her counsellor helps her with time management. \"Boarding school is hard work, but it teaches you how to be independent,\" she says.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*My school is an Anatolian high school in Bursa. It is big and modern. We have a cooking lab, a large courtyard and a prayer room. I usually take the bus to school. I am in the photography club, and this term we are preparing an exhibition. I sometimes feel stressed before exams, so I make a study plan and take short breaks.*\n\n# Pronunciation\n\n**Intonation:** Olumlu ve olumsuz cümlelerde ses tonu sonda **alçalır** ↘ (*I like my school.*). Evet/hayır sorularında **yükselir** ↗ (*Do you like PE?*). Wh-sorularında **alçalır** ↘ (*Where is the canteen?*). **Question tag**'lerde emin isek ↘ (bilgiyi onaylatma), emin değilsek ↗ (gerçekten soruyoruz): *It's a boarding school, isn't it?*\n\n# Performance Task\n\n**\"School Life and Education\" projesi:** Dünyadan iki farklı okul türünü (ör. Japonya'da bir lise, Finlandiya'da bir okul) karşılaştır; düzenli ve ders dışı etkinliklerin öğrenci gelişimine katkısını ve okul kaygısıyla başa çıkma önerilerini içeren bir **poster ya da kısa video** hazırla ve sınıfta sun.",
     "ornekler": [
      {
       "soru": "How often does Defne go to the coding club? What is she doing this month?",
       "cozum": "She **often** goes to the coding club in the afternoons. This month she **is preparing** for a spelling bee (temporary action → Present Continuous)."
      },
      {
       "soru": "Who helps Defne when she feels anxious, and how?",
       "cozum": "Her **counsellor** helps her **with time management**."
      }
     ],
     "ozet": [
      "Rutinler için Simple Present + sıklık zarfları; geçici durumlar için Present Continuous.",
      "Wh-questions ile bilgi topla: What kind of…? What … like?",
      "Tonlama: düz cümle ve Wh-sorusunda ↘, evet/hayır sorusunda ↗."
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
    "code": "ENG.10.2.G1",
    "title": {
     "tr": "Gelecek: will, be going to, may/might/could",
     "en": "Future: will, be going to, may/might/could"
    },
    "content": {
     "anlatim": "# Future Forms\n\n| Yapı | Kullanım | Örnek |\n|---|---|---|\n| **will + V1** | Ani karar, teklif, söz, genel tahmin | Wait, **I'll help** you with the computer. |\n| **be going to + V1** | Önceden planlanmış niyet; kanıta dayalı tahmin | Robert and I **are going to do** the Potato Battery project. · Look at the clouds! It **is going to rain**. |\n| **may / might / could + V1** | Olasılık (kesin değil) | The tablet **might run out** of battery. |\n\n**İpucu:** \"I think / probably / I'm sure\" ile genelde **will**; \"Look!\", \"planlıyorum\" bağlamında **going to**.\n\n# Simple Future vs. be going to — Özet\n\n| | will | be going to |\n|---|---|---|\n| Karar | **Konuşma anında** verilen | **Önceden** verilmiş (plan) |\n| Tahmin | Fikre dayalı (*I think…*) | **Kanıta** dayalı (*Look at…*) |\n| Teklif / söz | ✓ *I'll carry it for you.* / *I won't be late.* | — |\n\n# Question Tags with Future Forms\n\n- *You **will** help me with the project, **won't you**?*\n- *They **are going to** upload the file, **aren't they**?*\n- *She **won't** forget, **will she**?*\nOlumlu cümleye **olumsuz**, olumsuz cümleye **olumlu** tag eklenir; *will not* → **won't**.",
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
    "code": "ENG.10.2.G2",
    "title": {
     "tr": "Zorunluluk, yasak, tavsiye: must, have to, mustn't, should",
     "en": "Obligation, prohibition, advice"
    },
    "content": {
     "anlatim": "# Modals of Obligation & Advice\n\n| Modal | Anlam | Örnek |\n|---|---|---|\n| **must** | Güçlü zorunluluk (konuşanın/kuralın) | You **must** submit your work by 1 December. |\n| **have to** | Dış kaynaklı zorunluluk | I **have to** wear a uniform at school. |\n| **mustn't** | **Yasak** | You **mustn't** delete your friends' files. |\n| **don't have to** | **Gereklilik yok** (yasak değil!) | You **don't have to** come early; the class starts at 9. |\n| **should / ought to** | Tavsiye | You **ought to** organise your notes more carefully. |\n| **shouldn't** | Olumsuz tavsiye | You **shouldn't** stay up late before exams. |\n\n> Dikkat: **mustn't** (yapmamalısın — yasak) ≠ **don't have to** (yapmak zorunda değilsin).\n\n# should vs. ought to\n\nİkisi de **tavsiye** bildirir; *ought to* biraz daha resmîdir ve **to** ile kullanılır:\n- *You **should** summarise each unit.* = *You **ought to** summarise each unit.*\n- Olumsuz: *You **shouldn't** / **ought not to** study all night.*\n\n# can / might — Polite Requests, Permission, Possibility\n\n| Kullanım | Örnek |\n|---|---|\n| **İzin isteme** | ***Can** I use your charger?* — *Sure, go ahead.* |\n| **Rica** | ***Can** you switch on the projector, please?* |\n| **İzin verme / vermeme** | *You **can** log in with your school ID.* · *You **can't** delete these files.* |\n| **Olasılık** (can — genel) | *Online quizzes **can** be stressful.* |\n| **Kibar, dolaylı rica** (might) | *I was wondering if I **might** borrow your notes.* |\n| **Olasılık** (might — zayıf) | *The connection **might** be slow today.* |",
     "ornekler": [
      {
       "soru": "Farkı açıklayın: \"You mustn't use your phone.\" / \"You don't have to use your phone.\"",
       "cozum": "İlki **yasak** bildirir (telefon kullanmak yasak). İkincisi **gereklilik olmadığını** bildirir (kullanmak zorunda değilsin, istersen kullanabilirsin)."
      },
      {
       "soru": "Uygun modal ile tamamlayınız: \"___ I borrow your notes? I missed the lesson.\" / \"You ___ (advice) use mind maps; they help you remember.\"",
       "cozum": "**Can / Could / Might** I borrow your notes? (rica–izin). You **should / ought to** use mind maps. (tavsiye)"
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
    "code": "ENG.10.2.G3–V1",
    "title": {
     "tr": "Dönüşlü ve iyelik zamirleri; VAK öğrenme stilleri",
     "en": "Reflexive & possessive pronouns; VAK learning styles"
    },
    "content": {
     "anlatim": "# Reflexive Pronouns\n\nEylemi yapan ile etkilenen **aynı** kişi olduğunda: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.\n- I sometimes talk to **myself** when I have a problem.\n- **by + reflexive** = tek başına: She did the project **by herself**.\n\n# Possessive Adjectives vs Pronouns\n\n| Possessive adjective (isimden önce) | Possessive pronoun (isim yerine) |\n|---|---|\n| my book | **mine** |\n| your laptop | **yours** |\n| his / her bag | **his / hers** |\n| our class | **ours** |\n| their notes | **theirs** |\n\n*The laptop on the table is **mine**, but the one on the sofa is **yours**.*\n\n# Learning Styles — VAK Model\n\n| Stil | Nasıl öğrenir? |\n|---|---|\n| **Visual** (görsel) | Görme, okuma, renkli notlar, **mind mapping**, çizelgeler |\n| **Auditory** (işitsel) | Dinleme, sesli tekrar, grup tartışması, **brainstorming** |\n| **Kinaesthetic** (kinestetik) | Hareket, **role-play**, proje, **hands-on** etkinlikler |\n\n# Possessive 's and s' (İyelik)\n\n| Durum | Kural | Örnek |\n|---|---|---|\n| Tekil isim | **'s** | *the **teacher's** laptop* |\n| -s ile biten çoğul | yalnızca **'** | *the **students'** projects* |\n| Düzensiz çoğul | **'s** | *the **children's** books* |\n| İki kişinin ortak malı | son isme **'s** | *Ali and **Ece's** presentation* |\n| Cansız nesneler | genellikle **of** | *the screen **of** the computer* |",
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
   },
   {
    "id": "k4",
    "code": "ENG.10.2.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 2)",
     "en": "Reading–writing, pronunciation and performance task (Theme 2)"
    },
    "content": {
     "anlatim": "# Reading: Learning with AI in the Classroom\n\n*Next year, our school is going to try a new AI study assistant. Our teacher says it won't replace teachers, but it will help us practise at our own pace. For example, if you are a visual learner, the assistant can turn your notes into mind maps. Auditory learners can listen to short summaries. However, we must log in with our school accounts, and we mustn't upload other people's photos. \"You should always check the information yourself,\" our teacher reminds us. \"AI might make mistakes.\"*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*I am a kinaesthetic learner, so I learn best by doing. Next week I am going to build a model of a cell for biology. I think I will remember the parts better this way. My advice to other students: you should find your own learning style, and you ought to take short breaks while studying.*\n\n# Pronunciation\n\n**Long and short vowels:** *ship /ɪ/* – *sheep /iː/*, *full /ʊ/* – *fool /uː/*. **Silent b:** clim**b**, thum**b**, dou**b**t. **c** harfi *e, i, y* önünde /s/ (**c**ity, **c**entre), diğerlerinde /k/ (**c**lass, **c**omputer). Fonetik sembolleri ezberlemek yerine kelimelerle karşılaştırarak çalış.\n\n# Performance Task\n\n**\"Classroom Life and Learning\" projesi:** Sınıftaki öğrenme etkinliklerinin (brainstorming, role-play, lab work) öğrenmeye katkısını, kendi öğrenme stilini ve bunu destekleyen stratejileri, teknolojinin öğrenmedeki rolünü anlatan yazılı, resimli ya da dijital bir sunum hazırla.",
     "ornekler": [
      {
       "soru": "Will the AI assistant replace teachers? What will it do?",
       "cozum": "**No**, it won't replace teachers. It **will help students practise at their own pace** (e.g. mind maps, audio summaries)."
      },
      {
       "soru": "Find one rule (obligation) and one prohibition in the text.",
       "cozum": "Obligation: *we **must** log in with our school accounts.* Prohibition: *we **mustn't** upload other people's photos.*"
      }
     ],
     "ozet": [
      "will: ani karar, söz, fikre dayalı tahmin; be going to: plan ve kanıta dayalı tahmin.",
      "must/mustn't: kural ve yasak; should/ought to: tavsiye; can/might: rica, izin, olasılık.",
      "Uzun–kısa ünlüler (ship–sheep), silent b, c harfinin /s/–/k/ okunuşu."
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
    "code": "ENG.10.3.V1–G1",
    "title": {
     "tr": "Vücut, hastalıklar ve tavsiye",
     "en": "Body parts, illnesses and advice"
    },
    "content": {
     "anlatim": "# Vocabulary — Body Parts\n\nforehead (alın), eyebrow (kaş), eyelash (kirpik), tongue (dil), chin (çene), shoulders (omuzlar), chest (göğüs), elbow (dirsek), knee (diz), ankle (ayak bileği), wrist (el bileği).\n\n# Illnesses & Symptoms\n\n| Illness / symptom | Türkçe |\n|---|---|\n| a cold / flu | soğuk algınlığı / grip |\n| fever | ateş |\n| chickenpox / measles | su çiçeği / kızamık |\n| malaria | sıtma |\n| toothache / stomach ache / earache / backache | diş / mide / kulak / sırt ağrısı |\n| sore throat | boğaz ağrısı |\n| allergy | alerji |\n| dizziness | baş dönmesi |\n\n# Giving Advice\n\n- You **should** rest properly and drink tea with lemon.\n- You **ought to** see a doctor.\n- You **shouldn't** go out in cold weather.\n- **Why don't you** take a painkiller? / **If I were you, I would** stay in bed.\n\n**Asking about health:** What's the matter? / What's wrong with you? — I've got a sore throat. I feel dizzy.\n\n# Can / Could for Ability\n\n- **Şimdiki yetenek:** *I **can** breathe more easily after the treatment.*\n- **Geçmişteki yetenek:** *When I had the flu, I **couldn't** get out of bed.*\n- **Gelecekteki yetenek:** *I **will be able to** run again next week.* (*can*'in gelecek zamanı yoktur)\n\n# Mixed Future Forms\n\n| Yapı | Kullanım | Örnek |\n|---|---|---|\n| **will** | Kesinlik/tahmin, ani karar | *People **will** live longer in the future.* |\n| **be going to** | Niyet, kanıta dayalı tahmin | *I'm **going to** start a digital detox.* |\n| **Present Continuous** | Ayarlanmış **randevu/düzenleme** | *I'**m seeing** the doctor at 5 tomorrow.* |\n| **Simple Present** | **Tarife/program** | *The yoga class **starts** at 9 a.m.* |\n| **may / might** | Olasılık | *Robots **might** take care of patients.* |\n\n# Vocabulary — Well-Being\n\n*empathy, self-care, digital detox, mindfulness, balanced diet, sustainability, global citizenship* · Hastalık fiilleri: *vomit, sneeze, cough, breathe*.",
     "ornekler": [
      {
       "soru": "Bir arkadaşınız \"I've got a terrible toothache.\" diyor. İki tavsiye verin.",
       "cozum": "You **should see** a dentist. / You **shouldn't eat** sweets for a while."
      },
      {
       "soru": "Present Continuous mı Simple Present mı? \"The bus to the hospital ___ (leave) at 8.15.\" / \"I ___ (meet) my doctor tomorrow afternoon.\"",
       "cozum": "The bus **leaves** at 8.15. (**tarife** → Simple Present). I **am meeting** my doctor tomorrow afternoon. (**ayarlanmış randevu** → Present Continuous)"
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
    "code": "ENG.10.3.G2–V2",
    "title": {
     "tr": "Sıfatlarla karşılaştırma; moda kelimeleri; -ed/-ing sıfatlar",
     "en": "Comparisons; fashion vocabulary; -ed/-ing adjectives"
    },
    "content": {
     "anlatim": "# Comparisons with Adjectives\n\n| Sıfat | Comparative | Örnek |\n|---|---|---|\n| Kısa (tek heceli) | **-er than** | Modern life is **harder than** before. |\n| -y ile biten | **-ier than** | Today is **busier than** yesterday. |\n| Uzun (2+ hece) | **more … than** | Sustainable fashion is **more environmentally friendly than** fast fashion. · Carol is **more ambitious than** many students. |\n| Düzensiz | good → **better**, bad → **worse**, far → **further** | |\n| Eşitlik | **as … as** / **not as … as** | Mental health is **as important as** physical health. |\n\n# Vocabulary — Fashion\n\n| Kategori | Kelimeler |\n|---|---|\n| Accessories | necklace (kolye), bracelet (bilezik), handbag, scarf (atkı/eşarp), belt (kemer), bow tie (papyon), gloves (eldiven), hairband (saç bandı) |\n| Styles | elegant (zarif), stylish, trendy (modaya uygun), vintage (nostaljik), neat (düzenli), smart casual (günlük şık) |\n| Materials & patterns | cotton (pamuk), leather (deri), denim (kot), floral (çiçekli), striped (çizgili), plain (düz), checked (kareli) |\n\n# -ed / -ing Adjectives\n\n- **-ed:** kişinin **hissettiği** duygu → I am **bored**. She feels **excited**. They are **anxious**.\n- **-ing:** duyguya **sebep olan** şey → The film is **boring**. The trip was **exciting**.\n\n# Expressing Similarity — as … as, the same as, like, alike\n\n| Yapı | Örnek |\n|---|---|\n| **as + sıfat + as** (eşitlik) | *This jacket is **as warm as** that coat.* |\n| **not as … as** (eşit değil) | *Cotton is **not as expensive as** silk.* |\n| **the same (+ isim) as** | *My bag is **the same colour as** yours.* |\n| **like** + isim (benzer) | *Your scarf looks **like** my grandmother's.* |\n| **alike** (cümle sonunda) | *The twins dress **alike**.* · *Our styles are **alike**.* |",
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
   },
   {
    "id": "k3",
    "code": "ENG.10.3.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 3)",
     "en": "Reading–writing, pronunciation and performance task (Theme 3)"
    },
    "content": {
     "anlatim": "# Reading: A Digital Detox Week\n\n*Last month, Kerem couldn't sleep well and he often had headaches. His doctor said he was spending too much time on screens. So Kerem tried a digital detox week. He switched off his phone after 9 p.m. and went cycling instead. \"At first it was boring, but then I felt more relaxed,\" he says. Now he is as active as his sister, who is a swimmer. Next Saturday, he is joining a yoga class that starts at 10 a.m. \"I think people will need digital detox more in the future,\" he says.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*In the future, I think people will care more about well-being. Many people are going to work from home, so they might feel lonely. My advice is simple: you should spend time in nature, eat a balanced diet and be kind to yourself. I'm starting a self-care routine this week, and I'm sure I will feel healthier.*\n\n# Pronunciation\n\n**/e/** *bed, head*; **/iː/** *see, breathe*; **/ə/** (schwa, vurgusuz hece) *doct**or**, fash**ion***. **f** harfi /f/ (fever), **g** harfi /g/ (glove) ya da /dʒ/ (allergy, gym), **h** /h/ (headache); *hour* ve *honest* kelimelerinde h **okunmaz**.\n\n# Performance Task\n\n**\"Personal Life and Well-Being\" projesi:** Vücut bölümleri ve görevleri, yaygın hastalıklar ve korunma yolları, bugünün ve geleceğin iyi oluş (well-being) anlayışı ile modanın kimlik ve özgüvene etkisini karşılaştıran bir poster ya da dijital slayt gösterisi hazırla ve sun.",
     "ornekler": [
      {
       "soru": "Why did Kerem try a digital detox week?",
       "cozum": "Because he **couldn't sleep well** and **had headaches**; his doctor said he **was spending too much time on screens**."
      },
      {
       "soru": "Find one example each of: a timetabled future event, an arrangement, an -ed adjective.",
       "cozum": "Timetable: *a yoga class that **starts** at 10 a.m.* Arrangement: *he **is joining** a yoga class.* -ed adjective: ***relaxed*** (and *boring* is an -ing adjective)."
      }
     ],
     "ozet": [
      "Gelecek: will, be going to, Present Continuous (randevu), Simple Present (tarife), may/might (olasılık).",
      "can/could/be able to: şimdiki, geçmiş ve gelecekteki yetenek.",
      "Benzerlik: as…as, the same as, like, alike; -ed (hissedilen) / -ing (hissettiren) sıfatlar."
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
    "code": "ENG.10.4.G1",
    "title": {
     "tr": "Simple Past, used to, could (geçmiş)",
     "en": "Simple Past, used to, could (past ability)"
    },
    "content": {
     "anlatim": "# Simple Past (V2)\n\nGeçmişte belirli bir zamanda **tamamlanmış** eylemler. Düzenli fiiller **-ed** alır; düzensizler ezberlenir (go–went, have–had, see–saw).\n| (+) | Alp **visited** his friend's grandfather's farmhouse yesterday. |\n|---|---|\n| (−) | He **didn't visit** … (didn't + V1) |\n| (?) | **Did** you **have** any hobbies when you were a teenager? |\n\nZaman ifadeleri: yesterday, last week, two years ago, in 2010, when I was a child.\n\n# Used to — Geçmişteki Alışkanlıklar\n\nGeçmişte düzenli yapılan ama **artık devam etmeyen** alışkanlık ve durumlar.\n| (+) | My grandmother **used to wake up** before sunrise. |\n|---|---|\n| (−) | They **didn't use to have** modern hobbies. |\n| (?) | **Did** people **use to live** in simple cottages? |\n\n> Olumsuz ve soruda **use to** (d'siz) yazılır.\n\n# Could — Geçmişteki Yetenek\n\n- He **could work** long hours outside. / She **could ride** a horse.\n- Olumsuz: I **couldn't swim** when I was five.\n\n# Question Tags with Simple Past\n\n- *You **visited** your grandparents, **didn't you**?*\n- *They **didn't use to** live in a flat, **did they**?*\n- *She **was** at home, **wasn't she**?* · *There **were** many siblings, **weren't there**?*\nSimple Past olumlu cümlede yardımcı fiil olmadığı için tag'de **did / didn't** kullanılır.",
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
    "code": "ENG.10.4.V1",
    "title": {
     "tr": "Ev tipleri, aile yapıları, ev işleri",
     "en": "House types, family structures, household chores"
    },
    "content": {
     "anlatim": "# House Types\n\n| English | Türkçe |\n|---|---|\n| detached house | müstakil ev |\n| semi-detached house | ikiz ev |\n| terraced house | sıra ev |\n| cottage | köy evi / kulübe |\n| farmhouse | çiftlik evi |\n| treehouse | ağaç ev |\n| houseboat | tekne ev |\n| igloo | kardan ev |\n| hut | kulübe |\n\n# Family Structures\n\n- **Nuclear family:** anne, baba ve çocuklardan oluşan çekirdek aile.\n- **Immediate family:** en yakın aile üyeleri (anne-baba, kardeşler, eş, çocuklar).\n- **Extended family:** büyükanne-büyükbaba, amca, teyze gibi akrabaları da içeren geniş aile.\n- **Blended family:** üvey ebeveyn ve/veya üvey kardeşlerin bulunduğu aile.\n\n# Household Chores\n\nset the table (sofrayı kurmak), do the dusting (toz almak), do the laundry (çamaşır yıkamak), do the ironing (ütü yapmak), run errands (ufak işleri halletmek), do the washing-up (bulaşık yıkamak), make the bed (yatağı toplamak), take out the rubbish (çöpü çıkarmak).\n\n> **do** ile: the laundry, the ironing, the dusting, the washing-up · **make** ile: the bed, dinner.\n\n# Vocabulary — Family Hobbies: Sports & Films\n\n- **Sports:** *cycling, rafting, archery, skiing, hiking, horse riding* — *go* + -ing (go cycling), *do* + bireysel etkinlik (do archery), *play* + toplu top oyunları (play basketball).\n- **Film genres:** *sci-fi, thriller, documentary, romantic comedy, sitcom, animation, historical drama*.\n- *My family **used to go** rafting every summer.* · *We often **watch** documentaries together on Friday nights.*",
     "ornekler": [
      {
       "soru": "\"My grandparents, aunts and cousins all live with us.\" Bu hangi aile tipidir?",
       "cozum": "**Extended family** (geniş aile)."
      },
      {
       "soru": "Doğru fiili yazınız: \"My uncle ___ archery, my sister ___ skiing and my brothers ___ basketball.\"",
       "cozum": "My uncle **does** archery, my sister **goes** skiing and my brothers **play** basketball. (*do* + bireysel etkinlik, *go* + -ing, *play* + top oyunu)"
      }
     ],
     "ozet": [
      "Ev tipleri: detached, semi-detached, terraced…",
      "Aile: nuclear, extended, blended.",
      "Ev işleri: do the laundry, make the bed."
     ]
    }
   },
   {
    "id": "k3",
    "code": "ENG.10.4.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 4)",
     "en": "Reading–writing, pronunciation and performance task (Theme 4)"
    },
    "content": {
     "anlatim": "# Reading: Then and Now: My Grandmother's Home\n\n*My grandmother grew up in a big family in a village near Sivas. They lived in a detached stone house with her parents, grandparents and five siblings. She used to wake up at dawn and help her mother with the laundry by the river. There was no TV, so in the evenings the family used to tell stories. She could ride a horse when she was only eight! Today my family is a nuclear family. We live in a flat in Ankara, we have a washing machine and we watch sci-fi films together on Friday nights.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*When my father was a child, his family used to live in a semi-detached house in Trabzon. He didn't use to have a computer, but he could play football very well. He used to go fishing with his uncle at weekends. Today he commutes to work by car and he does archery as a hobby.*\n\n# Pronunciation\n\n**i** harfinin farklı sesleri: /ɪ/ *sibling*, /aɪ/ *ride, like*, /ɜː/ *bird, first*. **j** /dʒ/ (*job, enjoy*), **k** /k/ (*kitchen*) — *know, knife*'ta k **okunmaz**, **l** /l/ (*laundry*) — *walk, half*'ta l **okunmaz**.\n\n# Performance Task\n\n**\"Family Life and Home\" projesi:** Aile büyüklerinle **röportaj** yap (*What did you use to do…? Could you…?*). Günlük rutinleri ve hobileri geçmiş–bugün karşılaştırması olarak anlat; dünyadan iki farklı ev ve aile tipini araştırıp kendi deneyiminle karşılaştır. Fotoğraf, çizim ya da video ekleyerek sun.",
     "ornekler": [
      {
       "soru": "What did the family use to do in the evenings? Why?",
       "cozum": "They **used to tell stories** because **there was no TV**."
      },
      {
       "soru": "Compare the grandmother's family and the writer's family (family type and house).",
       "cozum": "Grandmother: **extended** family, a **detached stone house** in a village. Writer: **nuclear** family, a **flat** in a city."
      }
     ],
     "ozet": [
      "Simple Past: tamamlanmış geçmiş olaylar; question tags → did/didn't, was/were.",
      "used to: geçmişteki (artık olmayan) alışkanlıklar; could: geçmişteki yetenek.",
      "Aile tipleri: nuclear, extended, single-parent; ev tipleri: detached, semi-detached, flat, cottage."
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
    "code": "ENG.10.5.G1",
    "title": {
     "tr": "Past Continuous; when / while",
     "en": "Past Continuous; when / while"
    },
    "content": {
     "anlatim": "# Past Continuous\n\n**was / were + V-ing** → geçmişte belli bir anda **devam etmekte olan** eylem.\n- What **were** you **doing** at 8 p.m. yesterday? — I **was watching** a film.\n- **While** I **was cycling** to school, I dreamt about travelling long distances.\n\n# Past Continuous + Simple Past\n\nUzun süren eylem (**Past Continuous**) devam ederken kısa bir eylem (**Simple Past**) araya girer.\n| Bağlaç | Ardından genelde | Örnek |\n|---|---|---|\n| **while** | Past Continuous | **While** she **was getting** out of the taxi, it **started** raining heavily. |\n| **when** | Simple Past | We **were waiting** for a taxi **when** the rain **started**. |\n\nİki eylem aynı anda sürüyorsa ikisi de Past Continuous: *While I **was studying**, my brother **was playing** games.*\n\n# Question Tags with Past Continuous\n\n- *You **were waiting** for the bus, **weren't you**?*\n- *They **weren't using** public transport, **were they**?*\nPast Continuous'ta yardımcı fiil **was/were** olduğu için tag de **was/were** ile yapılır.",
     "ornekler": [
      {
       "soru": "Fiilleri çekimleyin: \"I ___ (walk) home when I ___ (see) an old friend.\"",
       "cozum": "I **was walking** home when I **saw** an old friend."
      },
      {
       "soru": "Tag ekleyiniz: \"You were cycling to school when it started to rain, ___?\" / \"The chemist wasn't working on Sunday, ___?\"",
       "cozum": "…, **weren't you**? / …, **was he/she**? — Past Continuous'ta tag **was/were** ile kurulur; olumlu cümleye olumsuz, olumsuz cümleye olumlu tag gelir."
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
    "code": "ENG.10.5.V1",
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
      },
      {
       "soru": "Bir eczacıya (chemist) danışırken kullanabileceğiniz iki kibar soru yazınız ve \"e-scooter\" için bir artı, bir eksi belirtiniz.",
       "cozum": "*Could you recommend something for a sore throat? / How often should I take this medicine?* — E-scooter: **pro** *eco-friendly and time-saving*; **con** *unsafe in heavy traffic*."
      }
     ],
     "ozet": [
      "Hizmetler: pharmacy, bank, vet clinic…",
      "Ulaşım: tram, ferry, the Underground…",
      "Pros & cons: reliable, affordable vs overcrowded."
     ]
    }
   },
   {
    "id": "k3",
    "code": "ENG.10.5.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 5)",
     "en": "Reading–writing, pronunciation and performance task (Theme 5)"
    },
    "content": {
     "anlatim": "# Reading: An Interview with a Bus Driver\n\n*Reporter: How long have you been a bus driver, Mr Demir?*\n*Mr Demir: For twenty years. I've seen a lot of changes in our city.*\n*Reporter: What was the most interesting day of your job?*\n*Mr Demir: One winter morning, I was driving to the city centre when an old man fainted on the bus. While I was calling the ambulance, two passengers were giving him first aid. Luckily, he was fine.*\n*Reporter: What do you think about public transport today?*\n*Mr Demir: It's more eco-friendly and affordable than cars, but buses are sometimes prone to delays in heavy traffic.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*Last Saturday, I was waiting for the tram when I met my old neighbour. While we were talking, it started to rain, so we went into a café and chilled out. Then I went to a chemist's because I needed some medicine for my cold. The pharmacist was very helpful.*\n\n# Pronunciation\n\n**/əʊ/** *go, phone, bus stop → no*; **m** /m/ (*medicine*), **n** /n/ (*neighbour*) — *autumn*'da n **okunmaz**; **p** /p/ (*pharmacy*) — **ph** /f/ okunur (*pharmacy, photo*), *psychology*'de p **okunmaz**.\n\n# Performance Task\n\n**Mahalle röportajı:** Mahallenden bir kişiyle (şoför, eczacı, komşu, güvenlik görevlisi) ulaşım, hizmetler ve sosyal hayat hakkındaki geçmiş deneyimleri üzerine röportaj yap. Soruları hazırla, seç; istersen bir avatar ya da yapay zekâ karakteriyle canlandır. Grafik ya da video ekleyip sınıfta sun.",
     "ornekler": [
      {
       "soru": "What was Mr Demir doing when the old man fainted?",
       "cozum": "He **was driving** to the city centre (Past Continuous — action in progress interrupted by *fainted*)."
      },
      {
       "soru": "What are one advantage and one disadvantage of public transport according to Mr Demir?",
       "cozum": "Advantage: **eco-friendly and affordable**. Disadvantage: **prone to delays in heavy traffic**."
      }
     ],
     "ozet": [
      "Past Continuous: geçmişte belli bir anda devam eden eylem (was/were + V-ing).",
      "when + Simple Past (kesen eylem), while + Past Continuous (süren eylem).",
      "Ulaşımın artıları–eksileri: eco-friendly, affordable / polluting, prone to delays."
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
    "code": "ENG.10.6.G1",
    "title": {
     "tr": "Present Perfect; be able to",
     "en": "Present Perfect; be able to"
    },
    "content": {
     "anlatim": "# Present Perfect\n\n**have / has + V3** → geçmişte başlayıp **etkisi süren** ya da zamanı belirtilmeyen eylemler, deneyimler.\n- People **have celebrated** World Food Day **since** 1979.\n- I **haven't visited** any supermarkets **for** six months.\n- **Have** you **ever tried** sushi?\n\n| Zarf | Kullanım |\n|---|---|\n| **since** | başlangıç noktası (since 2020, since Monday) |\n| **for** | süre (for two years, for ages) |\n| ever / never | deneyim |\n| already / just / yet | yakın geçmiş; **yet** olumsuz ve soruda |\n\n> Belirli geçmiş zaman (yesterday, last year) varsa **Simple Past** kullanılır: *I **visited** Rome last year.*\n\n# Be Able To\n\n*can*'in kullanılamadığı zamanlarda:\n- Past: She **was able to** finish on time.\n- Future: You **will be able to** cook it yourself.\n- Present Perfect: Over the past years, we **have been able to** try many different foods.\n\n# Present Perfect: already, just, yet + Question Tags\n\n- **just:** az önce — *I've **just** bought some baklava.*\n- **already:** beklenenden önce, çoktan — *We've **already** booked a table.*\n- **yet:** olumsuz ve soru cümlelerinde sonda — *Have you tried sushi **yet**? — No, not **yet**.*\n- **Question tags:** *You **have** been to Egypt, **haven't you**?* · *She **hasn't** tasted falafel, **has she**?*",
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
    "code": "ENG.10.6.G2–V1",
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
      },
      {
       "soru": "some / any / much / many: \"We haven't got ___ milk.\" / \"There are ___ tourists in the market.\" / \"Can I have ___ water?\"",
       "cozum": "We haven't got **any** milk. (olumsuz) · There are **many** tourists. (sayılabilir çoğul) · Can I have **some** water? (rica/teklifte *some*)"
      }
     ],
     "ozet": [
      "many sayılabilen, much sayılamayan.",
      "some olumlu/teklif, any olumsuz/soru.",
      "needn't = gerek yok."
     ]
    }
   },
   {
    "id": "k3",
    "code": "ENG.10.6.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 6)",
     "en": "Reading–writing, pronunciation and performance task (Theme 6)"
    },
    "content": {
     "anlatim": "# Reading: A Food Blogger in Türkiye\n\n*Hi, I'm Lucas from Brazil. I've lived in İstanbul since 2022, and I've already tried more than a hundred Turkish dishes! I've just come back from Gaziantep, the city of baklava and kebab. I haven't been able to cook İskender at home yet, but I'm learning. In Türkiye you needn't go to expensive restaurants to eat well; street food like simit and balık ekmek is delicious and cheap. My vegan friends have found many dishes too, such as stuffed vine leaves with olive oil.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*I have always loved Japanese food. I have tried sushi many times, but I have never eaten ramen in Japan. Have you ever tasted Egyptian falafel? It is spicy and gluten-free. When I go shopping, I need some fresh vegetables, but I needn't buy much bread because we bake it at home.*\n\n# Pronunciation\n\n**q** her zaman **qu** /kw/ (*queen, quantity*); **r** İngiliz İngilizcesinde ünlüden önce okunur (*rice*), sonda genellikle okunmaz (*butter*), Amerikan İngilizcesinde okunur; **s** /s/ (*salt*) ya da /z/ (*cheese, vegetables*); **t** /t/ (*tea*) — *listen, castle*'da t **okunmaz**.\n\n# Performance Task\n\n**\"Global Food Culture and Preferences\" projesi:** Kıtalar ve milliyetler, alışveriş ve beslenme tercihleri (vegan, halal, gluten-free), geleneksel ve modern yemekler ile sağlıklı–sağlıksız beslenmeyi harita, grafik ya da videolarla anlatan bir sunum hazırla.",
     "ornekler": [
      {
       "soru": "How long has Lucas lived in İstanbul? Write the answer with *since* and with *for* (assume it is 2026).",
       "cozum": "He **has lived** in İstanbul **since 2022** / **for four years**."
      },
      {
       "soru": "What does \"you needn't go to expensive restaurants\" mean?",
       "cozum": "It is **not necessary** to go to expensive restaurants (lack of necessity) — street food is good and cheap."
      }
     ],
     "ozet": [
      "Present Perfect: since (başlangıç noktası), for (süre), already, just, yet, ever/never.",
      "be able to her zamanda kullanılabilir (have been able to).",
      "need / needn't: gereklilik / gereksizlik; some–any–much–many: miktar."
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
    "code": "ENG.10.7.G1",
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
    "code": "ENG.10.7.V1",
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
      },
      {
       "soru": "\"Carbon footprint\" kavramını İngilizce açıklayıp küçültmek için iki öneri yazınız.",
       "cozum": "*Your carbon footprint is the amount of greenhouse gases your activities produce.* To reduce it: *use public transport instead of cars* and *save energy by switching off unused devices.*"
      }
     ],
     "ozet": [
      "Sorunlar: deforestation, global warming, water shortage.",
      "Çözümler: reduce, reuse, recycle.",
      "Yenilenebilir kaynaklar: solar, wind."
     ]
    }
   },
   {
    "id": "k3",
    "code": "ENG.10.7.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 7)",
     "en": "Reading–writing, pronunciation and performance task (Theme 7)"
    },
    "content": {
     "anlatim": "# Reading: Saving Water in Konya\n\n*Konya is a city which produces a lot of wheat, but it has a serious water shortage. Many farmers used groundwater for many years, so the water level dropped and sinkholes appeared. Today, farmers who use drip irrigation save up to 50 percent of their water. Students at a local school started a campaign that raises awareness about water footprint. They put posters in shops, so people now take shorter showers and reuse water for plants.*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*Plastic pollution is a global problem which harms sea animals. Many people throw plastic bags away, so they end up in the oceans. We can solve this problem. People who go shopping should take reusable bags, and companies that produce plastic should recycle more.*\n\n# Pronunciation\n\n**/juː/** *use, reuse, future*; **/ʌ/** *flood, sun, pollution → but*; **v** /v/ (*save, river*) ile **w** /w/ (*water, wind*) seslerini karıştırma: *vest – west*, *vine – wine*.\n\n# Performance Task\n\n**Doğal kaynaklar projesi:** Doğal kaynakları korumanın zorluklarını ve çözümlerini araştır; insanın doğaya etkisini analiz et, sürdürülebilir eylemler öner. Rapor ve poster/sunum hazırla; bir koruma uzmanı, bilim insanı ya da aktivist rolüne girerek senaryo canlandır.",
     "ornekler": [
      {
       "soru": "Why did sinkholes appear in Konya?",
       "cozum": "Because **farmers used too much groundwater**, so **the water level dropped**."
      },
      {
       "soru": "Find two relative clauses in the text and say what they describe.",
       "cozum": "*a city **which produces a lot of wheat*** (Konya); *farmers **who use drip irrigation*** (farmers); *a campaign **that raises awareness*** (the campaign)."
      }
     ],
     "ozet": [
      "Defining relative clauses: who (kişi), which (nesne/hayvan), that (her ikisi).",
      "so: sonuç bildirir (…, so the water level dropped).",
      "Küresel sorunlar: deforestation, water shortage, global warming; koruma: reduce, reuse, raise awareness."
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
    "code": "ENG.10.8.G1",
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
    "code": "ENG.10.8.V1",
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
      },
      {
       "soru": "Uygun fiili seçiniz (launch / land / collect / orbit): \"Scientists ___ data with telescopes.\" / \"The Moon ___ the Earth.\"",
       "cozum": "Scientists **collect** data with telescopes. · The Moon **orbits** the Earth. (*launch* → roket fırlatmak, *land* → iniş yapmak)"
      }
     ],
     "ozet": [
      "Gezegenler, Milky Way, orbit, comet.",
      "launch, land, conduct experiments, space junk.",
      "Skimming genel fikir, scanning belirli bilgi."
     ]
    }
   },
   {
    "id": "k3",
    "code": "ENG.10.8.R1–W1–P1",
    "title": {
     "tr": "Okuma–yazma, sesletim ve performans görevi (Theme 8)",
     "en": "Reading–writing, pronunciation and performance task (Theme 8)"
    },
    "content": {
     "anlatim": "# Reading: Life in 2100: A Space Colony\n\n*If scientists find a safe way to grow food on Mars, people will build the first space colony there before 2100. Mars is a cold planet which has a thin atmosphere, so astronauts will have to live in special domes. If you heat water, it turns into steam — the colonists will use this simple fact to make oxygen and energy. Robots will collect data and conduct experiments. If everything goes well, tourists might travel to Mars on rockets that land like planes!*\n\n## Okuma Stratejisi\n\n1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n# Writing Model\n\n*In 2100, I think robots will do most of the dangerous jobs in space. If people live on the Moon, they will need new kinds of food. If a planet is too close to the Sun, life is impossible because it is too hot. I want to be an astronaut, so if I study hard, I will apply to a space agency.*\n\n# Pronunciation\n\n**x** /ks/ (*explore, galaxy*) ya da /gz/ (*exist, example*); **y** ünsüz /j/ (*yes, young*) ya da ünlü /aɪ/ (*sky, fly*), /ɪ/ (*mystery*); **z** /z/ (*zero, Venus → planet names: Mercury, Mars*).\n\n# Performance Task\n\n**\"Life in 2100\" posteri:** Robotlar, uzaylılar, uzay kolonileri gibi fikirleri beyin fırtınasıyla topla; zero ve first conditional cümleler yaz, görseller (Web 2.0 araçları) ekle ve posterini sunarak arkadaşlarınla ortak tahminleri bul.",
     "ornekler": [
      {
       "soru": "What will happen if scientists find a safe way to grow food on Mars?",
       "cozum": "People **will build the first space colony** there before 2100 (First Conditional)."
      },
      {
       "soru": "Find a Zero Conditional sentence in the text. Why is it Zero Conditional?",
       "cozum": "*If you heat water, it turns into steam.* — It describes a **scientific fact** (general truth): if + Present Simple, Present Simple."
      }
     ],
     "ozet": [
      "Zero Conditional: if + Present Simple, Present Simple → bilimsel gerçekler.",
      "First Conditional: if + Present Simple, will/can/might + V1 → olası gelecek.",
      "Uzay kelimeleri: orbit, galaxy, satellite, launch, land, conduct experiments."
     ]
    }
   }
  ]
 }
];
