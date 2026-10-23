# -*- coding: utf-8 -*-
r"""10. Sınıf İngilizce (B1.2) — 1.36.0: Maarif programındaki 8 temanın dilbilgisi yapılarıyla karşılaştırma sonucu
eksik kalan yapılar (adverbs of frequency, wh-questions, object pronouns, ought to, can/might requests, possessive 's,
present tenses for future, can/could ability, as…as/same as/like/alike, past & present perfect question tags) ve her
tema için okuma–yazma, sesletim ve performans görevi kazanımı. Kaynak: tymm.meb.gov.tr İngilizce Dersi (9–12)
10. sınıf tema sayfaları (unite/541–548)."""
from common import O

KOD = {
    "u1/k1": "ENG.10.1.G1–V1", "u1/k2": "ENG.10.1.G2",
    "u2/k1": "ENG.10.2.G1", "u2/k2": "ENG.10.2.G2", "u2/k3": "ENG.10.2.G3–V1",
    "u3/k1": "ENG.10.3.V1–G1", "u3/k2": "ENG.10.3.G2–V2",
    "u4/k1": "ENG.10.4.G1", "u4/k2": "ENG.10.4.V1",
    "u5/k1": "ENG.10.5.G1", "u5/k2": "ENG.10.5.V1",
    "u6/k1": "ENG.10.6.G1", "u6/k2": "ENG.10.6.G2–V1",
    "u7/k1": "ENG.10.7.G1", "u7/k2": "ENG.10.7.V1",
    "u8/k1": "ENG.10.8.G1", "u8/k2": "ENG.10.8.V1",
}

ANLATIM = {
"u1/k1": r"""
# Adverbs of Frequency (Sıklık Zarfları)
**always (100%) > usually > often > sometimes > rarely / seldom > never (0%)**
- Genellikle **asıl fiilden önce**, *be* fiilinden **sonra** gelir: *She **often** joins the chess club.* · *He is **never** late.*
- *How often…?* sorusuna cevap verir: *How often do you have lab work? — Twice a week.*

# Wh-Questions (Bilgi Toplama Soruları)
| Soru | Sorduğu | Örnek |
|---|---|---|
| **Who** | Kişi | *Who teaches PE?* |
| **Where / When** | Yer / zaman | *Where is the staffroom? When does the club meet?* |
| **Why / How** | Neden / nasıl | *Why are you anxious? How do you manage your time?* |
| **What kind of** | Tür | *What kind of school is it? — A boarding school.* |
| **What … like?** | Nasıl bir şey (özellik) | *What is your school like? — It's big and modern.* |

# Object Pronouns (Nesne Zamirleri)
| Özne | I | you | he | she | it | we | they |
|---|---|---|---|---|---|---|---|
| **Nesne** | me | you | him | her | it | us | them |

*Our coding teacher is great. Everyone likes **him**.* · *The canteen is small, but we love **it**.*

# Vocabulary — National Days
**29 October** Republic Day · **23 April** National Sovereignty and Children's Day · **19 May** Commemoration of Atatürk, Youth and Sports Day · **15 July** Democracy and National Unity Day · **30 August** Victory Day · **Eid al-Fitr** (Ramazan Bayramı) · **Eid al-Adha** (Kurban Bayramı)
""",
"u2/k1": r"""
# Simple Future vs. be going to — Özet
| | will | be going to |
|---|---|---|
| Karar | **Konuşma anında** verilen | **Önceden** verilmiş (plan) |
| Tahmin | Fikre dayalı (*I think…*) | **Kanıta** dayalı (*Look at…*) |
| Teklif / söz | ✓ *I'll carry it for you.* / *I won't be late.* | — |

# Question Tags with Future Forms
- *You **will** help me with the project, **won't you**?*
- *They **are going to** upload the file, **aren't they**?*
- *She **won't** forget, **will she**?*
Olumlu cümleye **olumsuz**, olumsuz cümleye **olumlu** tag eklenir; *will not* → **won't**.
""",
"u2/k2": r"""
# should vs. ought to
İkisi de **tavsiye** bildirir; *ought to* biraz daha resmîdir ve **to** ile kullanılır:
- *You **should** summarise each unit.* = *You **ought to** summarise each unit.*
- Olumsuz: *You **shouldn't** / **ought not to** study all night.*

# can / might — Polite Requests, Permission, Possibility
| Kullanım | Örnek |
|---|---|
| **İzin isteme** | ***Can** I use your charger?* — *Sure, go ahead.* |
| **Rica** | ***Can** you switch on the projector, please?* |
| **İzin verme / vermeme** | *You **can** log in with your school ID.* · *You **can't** delete these files.* |
| **Olasılık** (can — genel) | *Online quizzes **can** be stressful.* |
| **Kibar, dolaylı rica** (might) | *I was wondering if I **might** borrow your notes.* |
| **Olasılık** (might — zayıf) | *The connection **might** be slow today.* |
""",
"u2/k3": r"""
# Possessive 's and s' (İyelik)
| Durum | Kural | Örnek |
|---|---|---|
| Tekil isim | **'s** | *the **teacher's** laptop* |
| -s ile biten çoğul | yalnızca **'** | *the **students'** projects* |
| Düzensiz çoğul | **'s** | *the **children's** books* |
| İki kişinin ortak malı | son isme **'s** | *Ali and **Ece's** presentation* |
| Cansız nesneler | genellikle **of** | *the screen **of** the computer* |
""",
"u3/k1": r"""
# Can / Could for Ability
- **Şimdiki yetenek:** *I **can** breathe more easily after the treatment.*
- **Geçmişteki yetenek:** *When I had the flu, I **couldn't** get out of bed.*
- **Gelecekteki yetenek:** *I **will be able to** run again next week.* (*can*'in gelecek zamanı yoktur)

# Mixed Future Forms
| Yapı | Kullanım | Örnek |
|---|---|---|
| **will** | Kesinlik/tahmin, ani karar | *People **will** live longer in the future.* |
| **be going to** | Niyet, kanıta dayalı tahmin | *I'm **going to** start a digital detox.* |
| **Present Continuous** | Ayarlanmış **randevu/düzenleme** | *I'**m seeing** the doctor at 5 tomorrow.* |
| **Simple Present** | **Tarife/program** | *The yoga class **starts** at 9 a.m.* |
| **may / might** | Olasılık | *Robots **might** take care of patients.* |

# Vocabulary — Well-Being
*empathy, self-care, digital detox, mindfulness, balanced diet, sustainability, global citizenship* · Hastalık fiilleri: *vomit, sneeze, cough, breathe*.
""",
"u3/k2": r"""
# Expressing Similarity — as … as, the same as, like, alike
| Yapı | Örnek |
|---|---|
| **as + sıfat + as** (eşitlik) | *This jacket is **as warm as** that coat.* |
| **not as … as** (eşit değil) | *Cotton is **not as expensive as** silk.* |
| **the same (+ isim) as** | *My bag is **the same colour as** yours.* |
| **like** + isim (benzer) | *Your scarf looks **like** my grandmother's.* |
| **alike** (cümle sonunda) | *The twins dress **alike**.* · *Our styles are **alike**.* |
""",
"u4/k1": r"""
# Question Tags with Simple Past
- *You **visited** your grandparents, **didn't you**?*
- *They **didn't use to** live in a flat, **did they**?*
- *She **was** at home, **wasn't she**?* · *There **were** many siblings, **weren't there**?*
Simple Past olumlu cümlede yardımcı fiil olmadığı için tag'de **did / didn't** kullanılır.
""",
"u4/k2": r"""
# Vocabulary — Family Hobbies: Sports & Films
- **Sports:** *cycling, rafting, archery, skiing, hiking, horse riding* — *go* + -ing (go cycling), *do* + bireysel etkinlik (do archery), *play* + toplu top oyunları (play basketball).
- **Film genres:** *sci-fi, thriller, documentary, romantic comedy, sitcom, animation, historical drama*.
- *My family **used to go** rafting every summer.* · *We often **watch** documentaries together on Friday nights.*
""",
"u5/k1": r"""
# Question Tags with Past Continuous
- *You **were waiting** for the bus, **weren't you**?*
- *They **weren't using** public transport, **were they**?*
Past Continuous'ta yardımcı fiil **was/were** olduğu için tag de **was/were** ile yapılır.
""",
"u6/k1": r"""
# Present Perfect: already, just, yet + Question Tags
- **just:** az önce — *I've **just** bought some baklava.*
- **already:** beklenenden önce, çoktan — *We've **already** booked a table.*
- **yet:** olumsuz ve soru cümlelerinde sonda — *Have you tried sushi **yet**? — No, not **yet**.*
- **Question tags:** *You **have** been to Egypt, **haven't you**?* · *She **hasn't** tasted falafel, **has she**?*
""",
}

ORNEK = {
"u2/k2": [(r"Uygun modal ile tamamlayınız: \"___ I borrow your notes? I missed the lesson.\" / \"You ___ (advice) use mind maps; they help you remember.\"",
           r"**Can / Could / Might** I borrow your notes? (rica–izin). You **should / ought to** use mind maps. (tavsiye)")],
"u3/k1": [(r"Present Continuous mı Simple Present mı? \"The bus to the hospital ___ (leave) at 8.15.\" / \"I ___ (meet) my doctor tomorrow afternoon.\"",
           r"The bus **leaves** at 8.15. (**tarife** → Simple Present). I **am meeting** my doctor tomorrow afternoon. (**ayarlanmış randevu** → Present Continuous)")],
"u4/k2": [(r"Doğru fiili yazınız: \"My uncle ___ archery, my sister ___ skiing and my brothers ___ basketball.\"",
           r"My uncle **does** archery, my sister **goes** skiing and my brothers **play** basketball. (*do* + bireysel etkinlik, *go* + -ing, *play* + top oyunu)")],
"u5/k1": [(r"Tag ekleyiniz: \"You were cycling to school when it started to rain, ___?\" / \"The chemist wasn't working on Sunday, ___?\"",
           r"…, **weren't you**? / …, **was he/she**? — Past Continuous'ta tag **was/were** ile kurulur; olumlu cümleye olumsuz, olumsuz cümleye olumlu tag gelir.")],
"u5/k2": [(r"Bir eczacıya (chemist) danışırken kullanabileceğiniz iki kibar soru yazınız ve \"e-scooter\" için bir artı, bir eksi belirtiniz.",
           r"*Could you recommend something for a sore throat? / How often should I take this medicine?* — E-scooter: **pro** *eco-friendly and time-saving*; **con** *unsafe in heavy traffic*.")],
"u6/k2": [(r"some / any / much / many: \"We haven't got ___ milk.\" / \"There are ___ tourists in the market.\" / \"Can I have ___ water?\"",
           r"We haven't got **any** milk. (olumsuz) · There are **many** tourists. (sayılabilir çoğul) · Can I have **some** water? (rica/teklifte *some*)")],
"u7/k2": [(r"\"Carbon footprint\" kavramını İngilizce açıklayıp küçültmek için iki öneri yazınız.",
           r"*Your carbon footprint is the amount of greenhouse gases your activities produce.* To reduce it: *use public transport instead of cars* and *save energy by switching off unused devices.*")],
"u8/k2": [(r"Uygun fiili seçiniz (launch / land / collect / orbit): \"Scientists ___ data with telescopes.\" / \"The Moon ___ the Earth.\"",
           r"Scientists **collect** data with telescopes. · The Moon **orbits** the Earth. (*launch* → roket fırlatmak, *land* → iniş yapmak)")],
"u4/k1": [],
}
ORNEK = {k: v for k, v in ORNEK.items() if v}


def RW(t, k, passage, questions, writing, pron, task, tips):
    """Bir temanın okuma–yazma, sesletim ve performans görevi kazanımı."""
    anl = ("# Reading: " + passage[0] + "\n\n" + passage[1].strip() + "\n\n"
           "## Okuma Stratejisi\n"
           "1. **Predict:** Başlık ve görsellerden konuyu tahmin et.\n"
           "2. **Skim:** Ana fikri bulmak için metni hızlıca oku.\n"
           "3. **Scan:** Sorulardaki anahtar kelimeleri metinde ara.\n"
           "4. **Guess from context:** Bilmediğin kelimenin anlamını cümleden çıkar.\n\n"
           "# Writing Model\n\n" + writing.strip() + "\n\n"
           "# Pronunciation\n\n" + pron.strip() + "\n\n"
           "# Performance Task\n\n" + task.strip() + "\n")
    return O(k, "ENG.10.%d.R1–W1–P1" % t, "Okuma–yazma, sesletim ve performans görevi (Theme %d)" % t,
             "Reading–writing, pronunciation and performance task (Theme %d)" % t, anl, questions, tips)


EK = {
"u1": [RW(1, "k3",
  ("A Day at a Boarding School", r"""
*Defne is a tenth grader at a boarding school in Kayseri. Students usually wake up at 6.45 and have breakfast in the canteen. Lessons start at 8.20. Defne's favourite lesson is chemistry because she loves lab work. In the afternoons, she often goes to the coding club, and on Wednesdays she plays volleyball on the school court. This month she is preparing for a spelling bee, so she is studying in the library every evening. Sometimes she feels anxious before exams, but her counsellor helps her with time management. "Boarding school is hard work, but it teaches you how to be independent," she says.*
"""),
  [(r"How often does Defne go to the coding club? What is she doing this month?", r"She **often** goes to the coding club in the afternoons. This month she **is preparing** for a spelling bee (temporary action → Present Continuous)."),
   (r"Who helps Defne when she feels anxious, and how?", r"Her **counsellor** helps her **with time management**.")],
  r"""
*My school is an Anatolian high school in Bursa. It is big and modern. We have a cooking lab, a large courtyard and a prayer room. I usually take the bus to school. I am in the photography club, and this term we are preparing an exhibition. I sometimes feel stressed before exams, so I make a study plan and take short breaks.*
""",
  r"""**Intonation:** Olumlu ve olumsuz cümlelerde ses tonu sonda **alçalır** ↘ (*I like my school.*). Evet/hayır sorularında **yükselir** ↗ (*Do you like PE?*). Wh-sorularında **alçalır** ↘ (*Where is the canteen?*). **Question tag**'lerde emin isek ↘ (bilgiyi onaylatma), emin değilsek ↗ (gerçekten soruyoruz): *It's a boarding school, isn't it?*""",
  r"""**\"School Life and Education\" projesi:** Dünyadan iki farklı okul türünü (ör. Japonya'da bir lise, Finlandiya'da bir okul) karşılaştır; düzenli ve ders dışı etkinliklerin öğrenci gelişimine katkısını ve okul kaygısıyla başa çıkma önerilerini içeren bir **poster ya da kısa video** hazırla ve sınıfta sun.""",
  ["Rutinler için Simple Present + sıklık zarfları; geçici durumlar için Present Continuous.", "Wh-questions ile bilgi topla: What kind of…? What … like?", "Tonlama: düz cümle ve Wh-sorusunda ↘, evet/hayır sorusunda ↗."])],
"u2": [RW(2, "k4",
  ("Learning with AI in the Classroom", r"""
*Next year, our school is going to try a new AI study assistant. Our teacher says it won't replace teachers, but it will help us practise at our own pace. For example, if you are a visual learner, the assistant can turn your notes into mind maps. Auditory learners can listen to short summaries. However, we must log in with our school accounts, and we mustn't upload other people's photos. "You should always check the information yourself," our teacher reminds us. "AI might make mistakes."*
"""),
  [(r"Will the AI assistant replace teachers? What will it do?", r"**No**, it won't replace teachers. It **will help students practise at their own pace** (e.g. mind maps, audio summaries)."),
   (r"Find one rule (obligation) and one prohibition in the text.", r"Obligation: *we **must** log in with our school accounts.* Prohibition: *we **mustn't** upload other people's photos.*")],
  r"""
*I am a kinaesthetic learner, so I learn best by doing. Next week I am going to build a model of a cell for biology. I think I will remember the parts better this way. My advice to other students: you should find your own learning style, and you ought to take short breaks while studying.*
""",
  r"""**Long and short vowels:** *ship /ɪ/* – *sheep /iː/*, *full /ʊ/* – *fool /uː/*. **Silent b:** clim**b**, thum**b**, dou**b**t. **c** harfi *e, i, y* önünde /s/ (**c**ity, **c**entre), diğerlerinde /k/ (**c**lass, **c**omputer). Fonetik sembolleri ezberlemek yerine kelimelerle karşılaştırarak çalış.""",
  r"""**\"Classroom Life and Learning\" projesi:** Sınıftaki öğrenme etkinliklerinin (brainstorming, role-play, lab work) öğrenmeye katkısını, kendi öğrenme stilini ve bunu destekleyen stratejileri, teknolojinin öğrenmedeki rolünü anlatan yazılı, resimli ya da dijital bir sunum hazırla.""",
  ["will: ani karar, söz, fikre dayalı tahmin; be going to: plan ve kanıta dayalı tahmin.", "must/mustn't: kural ve yasak; should/ought to: tavsiye; can/might: rica, izin, olasılık.", "Uzun–kısa ünlüler (ship–sheep), silent b, c harfinin /s/–/k/ okunuşu."])],
"u3": [RW(3, "k3",
  ("A Digital Detox Week", r"""
*Last month, Kerem couldn't sleep well and he often had headaches. His doctor said he was spending too much time on screens. So Kerem tried a digital detox week. He switched off his phone after 9 p.m. and went cycling instead. "At first it was boring, but then I felt more relaxed," he says. Now he is as active as his sister, who is a swimmer. Next Saturday, he is joining a yoga class that starts at 10 a.m. "I think people will need digital detox more in the future," he says.*
"""),
  [(r"Why did Kerem try a digital detox week?", r"Because he **couldn't sleep well** and **had headaches**; his doctor said he **was spending too much time on screens**."),
   (r"Find one example each of: a timetabled future event, an arrangement, an -ed adjective.", r"Timetable: *a yoga class that **starts** at 10 a.m.* Arrangement: *he **is joining** a yoga class.* -ed adjective: ***relaxed*** (and *boring* is an -ing adjective).")],
  r"""
*In the future, I think people will care more about well-being. Many people are going to work from home, so they might feel lonely. My advice is simple: you should spend time in nature, eat a balanced diet and be kind to yourself. I'm starting a self-care routine this week, and I'm sure I will feel healthier.*
""",
  r"""**/e/** *bed, head*; **/iː/** *see, breathe*; **/ə/** (schwa, vurgusuz hece) *doct**or**, fash**ion***. **f** harfi /f/ (fever), **g** harfi /g/ (glove) ya da /dʒ/ (allergy, gym), **h** /h/ (headache); *hour* ve *honest* kelimelerinde h **okunmaz**.""",
  r"""**\"Personal Life and Well-Being\" projesi:** Vücut bölümleri ve görevleri, yaygın hastalıklar ve korunma yolları, bugünün ve geleceğin iyi oluş (well-being) anlayışı ile modanın kimlik ve özgüvene etkisini karşılaştıran bir poster ya da dijital slayt gösterisi hazırla ve sun.""",
  ["Gelecek: will, be going to, Present Continuous (randevu), Simple Present (tarife), may/might (olasılık).", "can/could/be able to: şimdiki, geçmiş ve gelecekteki yetenek.", "Benzerlik: as…as, the same as, like, alike; -ed (hissedilen) / -ing (hissettiren) sıfatlar."])],
"u4": [RW(4, "k3",
  ("Then and Now: My Grandmother's Home", r"""
*My grandmother grew up in a big family in a village near Sivas. They lived in a detached stone house with her parents, grandparents and five siblings. She used to wake up at dawn and help her mother with the laundry by the river. There was no TV, so in the evenings the family used to tell stories. She could ride a horse when she was only eight! Today my family is a nuclear family. We live in a flat in Ankara, we have a washing machine and we watch sci-fi films together on Friday nights.*
"""),
  [(r"What did the family use to do in the evenings? Why?", r"They **used to tell stories** because **there was no TV**."),
   (r"Compare the grandmother's family and the writer's family (family type and house).", r"Grandmother: **extended** family, a **detached stone house** in a village. Writer: **nuclear** family, a **flat** in a city.")],
  r"""
*When my father was a child, his family used to live in a semi-detached house in Trabzon. He didn't use to have a computer, but he could play football very well. He used to go fishing with his uncle at weekends. Today he commutes to work by car and he does archery as a hobby.*
""",
  r"""**i** harfinin farklı sesleri: /ɪ/ *sibling*, /aɪ/ *ride, like*, /ɜː/ *bird, first*. **j** /dʒ/ (*job, enjoy*), **k** /k/ (*kitchen*) — *know, knife*'ta k **okunmaz**, **l** /l/ (*laundry*) — *walk, half*'ta l **okunmaz**.""",
  r"""**\"Family Life and Home\" projesi:** Aile büyüklerinle **röportaj** yap (*What did you use to do…? Could you…?*). Günlük rutinleri ve hobileri geçmiş–bugün karşılaştırması olarak anlat; dünyadan iki farklı ev ve aile tipini araştırıp kendi deneyiminle karşılaştır. Fotoğraf, çizim ya da video ekleyerek sun.""",
  ["Simple Past: tamamlanmış geçmiş olaylar; question tags → did/didn't, was/were.", "used to: geçmişteki (artık olmayan) alışkanlıklar; could: geçmişteki yetenek.", "Aile tipleri: nuclear, extended, single-parent; ev tipleri: detached, semi-detached, flat, cottage."])],
"u5": [RW(5, "k3",
  ("An Interview with a Bus Driver", r"""
*Reporter: How long have you been a bus driver, Mr Demir?*
*Mr Demir: For twenty years. I've seen a lot of changes in our city.*
*Reporter: What was the most interesting day of your job?*
*Mr Demir: One winter morning, I was driving to the city centre when an old man fainted on the bus. While I was calling the ambulance, two passengers were giving him first aid. Luckily, he was fine.*
*Reporter: What do you think about public transport today?*
*Mr Demir: It's more eco-friendly and affordable than cars, but buses are sometimes prone to delays in heavy traffic.*
"""),
  [(r"What was Mr Demir doing when the old man fainted?", r"He **was driving** to the city centre (Past Continuous — action in progress interrupted by *fainted*)."),
   (r"What are one advantage and one disadvantage of public transport according to Mr Demir?", r"Advantage: **eco-friendly and affordable**. Disadvantage: **prone to delays in heavy traffic**.")],
  r"""
*Last Saturday, I was waiting for the tram when I met my old neighbour. While we were talking, it started to rain, so we went into a café and chilled out. Then I went to a chemist's because I needed some medicine for my cold. The pharmacist was very helpful.*
""",
  r"""**/əʊ/** *go, phone, bus stop → no*; **m** /m/ (*medicine*), **n** /n/ (*neighbour*) — *autumn*'da n **okunmaz**; **p** /p/ (*pharmacy*) — **ph** /f/ okunur (*pharmacy, photo*), *psychology*'de p **okunmaz**.""",
  r"""**Mahalle röportajı:** Mahallenden bir kişiyle (şoför, eczacı, komşu, güvenlik görevlisi) ulaşım, hizmetler ve sosyal hayat hakkındaki geçmiş deneyimleri üzerine röportaj yap. Soruları hazırla, seç; istersen bir avatar ya da yapay zekâ karakteriyle canlandır. Grafik ya da video ekleyip sınıfta sun.""",
  ["Past Continuous: geçmişte belli bir anda devam eden eylem (was/were + V-ing).", "when + Simple Past (kesen eylem), while + Past Continuous (süren eylem).", "Ulaşımın artıları–eksileri: eco-friendly, affordable / polluting, prone to delays."])],
"u6": [RW(6, "k3",
  ("A Food Blogger in Türkiye", r"""
*Hi, I'm Lucas from Brazil. I've lived in İstanbul since 2022, and I've already tried more than a hundred Turkish dishes! I've just come back from Gaziantep, the city of baklava and kebab. I haven't been able to cook İskender at home yet, but I'm learning. In Türkiye you needn't go to expensive restaurants to eat well; street food like simit and balık ekmek is delicious and cheap. My vegan friends have found many dishes too, such as stuffed vine leaves with olive oil.*
"""),
  [(r"How long has Lucas lived in İstanbul? Write the answer with *since* and with *for* (assume it is 2026).", r"He **has lived** in İstanbul **since 2022** / **for four years**."),
   (r"What does \"you needn't go to expensive restaurants\" mean?", r"It is **not necessary** to go to expensive restaurants (lack of necessity) — street food is good and cheap.")],
  r"""
*I have always loved Japanese food. I have tried sushi many times, but I have never eaten ramen in Japan. Have you ever tasted Egyptian falafel? It is spicy and gluten-free. When I go shopping, I need some fresh vegetables, but I needn't buy much bread because we bake it at home.*
""",
  r"""**q** her zaman **qu** /kw/ (*queen, quantity*); **r** İngiliz İngilizcesinde ünlüden önce okunur (*rice*), sonda genellikle okunmaz (*butter*), Amerikan İngilizcesinde okunur; **s** /s/ (*salt*) ya da /z/ (*cheese, vegetables*); **t** /t/ (*tea*) — *listen, castle*'da t **okunmaz**.""",
  r"""**\"Global Food Culture and Preferences\" projesi:** Kıtalar ve milliyetler, alışveriş ve beslenme tercihleri (vegan, halal, gluten-free), geleneksel ve modern yemekler ile sağlıklı–sağlıksız beslenmeyi harita, grafik ya da videolarla anlatan bir sunum hazırla.""",
  ["Present Perfect: since (başlangıç noktası), for (süre), already, just, yet, ever/never.", "be able to her zamanda kullanılabilir (have been able to).", "need / needn't: gereklilik / gereksizlik; some–any–much–many: miktar."])],
"u7": [RW(7, "k3",
  ("Saving Water in Konya", r"""
*Konya is a city which produces a lot of wheat, but it has a serious water shortage. Many farmers used groundwater for many years, so the water level dropped and sinkholes appeared. Today, farmers who use drip irrigation save up to 50 percent of their water. Students at a local school started a campaign that raises awareness about water footprint. They put posters in shops, so people now take shorter showers and reuse water for plants.*
"""),
  [(r"Why did sinkholes appear in Konya?", r"Because **farmers used too much groundwater**, so **the water level dropped**."),
   (r"Find two relative clauses in the text and say what they describe.", r"*a city **which produces a lot of wheat*** (Konya); *farmers **who use drip irrigation*** (farmers); *a campaign **that raises awareness*** (the campaign).")],
  r"""
*Plastic pollution is a global problem which harms sea animals. Many people throw plastic bags away, so they end up in the oceans. We can solve this problem. People who go shopping should take reusable bags, and companies that produce plastic should recycle more.*
""",
  r"""**/juː/** *use, reuse, future*; **/ʌ/** *flood, sun, pollution → but*; **v** /v/ (*save, river*) ile **w** /w/ (*water, wind*) seslerini karıştırma: *vest – west*, *vine – wine*.""",
  r"""**Doğal kaynaklar projesi:** Doğal kaynakları korumanın zorluklarını ve çözümlerini araştır; insanın doğaya etkisini analiz et, sürdürülebilir eylemler öner. Rapor ve poster/sunum hazırla; bir koruma uzmanı, bilim insanı ya da aktivist rolüne girerek senaryo canlandır.""",
  ["Defining relative clauses: who (kişi), which (nesne/hayvan), that (her ikisi).", "so: sonuç bildirir (…, so the water level dropped).", "Küresel sorunlar: deforestation, water shortage, global warming; koruma: reduce, reuse, raise awareness."])],
"u8": [RW(8, "k3",
  ("Life in 2100: A Space Colony", r"""
*If scientists find a safe way to grow food on Mars, people will build the first space colony there before 2100. Mars is a cold planet which has a thin atmosphere, so astronauts will have to live in special domes. If you heat water, it turns into steam — the colonists will use this simple fact to make oxygen and energy. Robots will collect data and conduct experiments. If everything goes well, tourists might travel to Mars on rockets that land like planes!*
"""),
  [(r"What will happen if scientists find a safe way to grow food on Mars?", r"People **will build the first space colony** there before 2100 (First Conditional)."),
   (r"Find a Zero Conditional sentence in the text. Why is it Zero Conditional?", r"*If you heat water, it turns into steam.* — It describes a **scientific fact** (general truth): if + Present Simple, Present Simple.")],
  r"""
*In 2100, I think robots will do most of the dangerous jobs in space. If people live on the Moon, they will need new kinds of food. If a planet is too close to the Sun, life is impossible because it is too hot. I want to be an astronaut, so if I study hard, I will apply to a space agency.*
""",
  r"""**x** /ks/ (*explore, galaxy*) ya da /gz/ (*exist, example*); **y** ünsüz /j/ (*yes, young*) ya da ünlü /aɪ/ (*sky, fly*), /ɪ/ (*mystery*); **z** /z/ (*zero, Venus → planet names: Mercury, Mars*).""",
  r"""**\"Life in 2100\" posteri:** Robotlar, uzaylılar, uzay kolonileri gibi fikirleri beyin fırtınasıyla topla; zero ve first conditional cümleler yaz, görseller (Web 2.0 araçları) ekle ve posterini sunarak arkadaşlarınla ortak tahminleri bul.""",
  ["Zero Conditional: if + Present Simple, Present Simple → bilimsel gerçekler.", "First Conditional: if + Present Simple, will/can/might + V1 → olası gelecek.", "Uzay kelimeleri: orbit, galaxy, satellite, launch, land, conduct experiments."])],
}
