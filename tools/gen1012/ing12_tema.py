# -*- coding: utf-8 -*-
"""12. Sınıf İngilizce — MEB tema üniteleri (kullanıcının 2. ek not paketi: tema kazanımları,
dil bilgisi özetleri ve kelime çalışmaları). ing12.py bu listeyi dil bilgisi tekrar ünitelerinin
önüne ekler. Kaynak metinler kopyalanmadı; kazanım kodları, işlevler ve kelime listeleri
temel alınarak konu anlatımı, örnekler ve alıştırmalar yeniden yazıldı."""
from _c import O, U

TEMALAR = [
U("t1", "Theme 1: Music", "Theme 1: Music", [
O("k1", "E12.1", "Music: görüş bildirme, katılma–katılmama", "Music: expressing opinions, agreeing and disagreeing", r"""
# Theme 1 — Music: Functions
1. **Expressing opinion** (agreeing, disagreeing)
2. **Expressing preferences**

| Skill | Learning outcome (E12.1) |
|---|---|
| Listening | Detect the embedded information in songs / media (L1) |
| Pronunciation | Practise **intonation**: *Is this your camera?* ↗ (yes/no question rises) |
| Speaking | Exchange ideas about music preferences (S1); agree or disagree by giving opinions (S2) |
| Reading | Infer people's music preferences (R1); analyse surveys / interviews (R2) |
| Writing | Write a **survey report** on friends'/teachers' music preferences (W1) |

# Giving an Opinion
*In my opinion, … · Personally, I think … · From my point of view, … · As far as I'm concerned, … · I believe / suppose … · According to the survey, …*

**Asking for opinions:** *What do you think about …? · How do you feel about …? · Don't you think …? · Why do you think that …?*

# Agreeing and Disagreeing
| Strong agreement | Partial agreement | Polite disagreement | Strong disagreement |
|---|---|---|---|
| *I couldn't agree more.* | *I agree up to a point.* | *I'm not so sure about that.* | *I totally disagree.* |
| *You're absolutely right.* | *I tend to agree with you.* | *I'm afraid I disagree.* | *I'd say the exact opposite.* |
| *No doubt about it.* | *That's partly true, but …* | *That's not always true.* | *That's out of the question.* |

> **I couldn't agree more** = tamamen katılıyorum (olumsuz biçim ama anlamı güçlü katılma!).

# Writing a Survey Report
**Title → Introduction** (aim, who was asked) → **Findings** (*The majority of …, Half of the students …, Only a few …, A minority …*) → **Conclusion**.
*Example:* "Twenty students were asked about their favourite genres. **The majority** (60 %) prefer pop, **a quarter** listen to rock, and **only two** like opera. **To conclude**, pop is the most popular genre in our class."

# Vocabulary
| Word | Meaning | Word | Meaning |
|---|---|---|---|
| genre | tür | earworm | dilinize dolanan şarkı |
| appeal / attract | cezbetmek / ilgi çekmek | soothing | yatıştırıcı |
| raucous / deafening | gürültülü / sağır edici | shrill | tiz, cırtlak |
| eerie | ürkütücü | upbeat | hareketli, neşeli |
| mesmerizing | büyüleyici | sentimental | duygusal |
| sorrow | keder | inspiration | ilham |
| majority / minority | çoğunluk / azınlık | interviewee | röportaj yapılan kişi |
| hum | mırıldanmak | distract / disturb | dikkat dağıtmak / rahatsız etmek |

**Instruments:** *strings* (telli), *woodwind* (tahta üflemeli), *brass* (bakır üflemeli), *percussion* (vurmalı).
**Genres:** classical, country, folk, hip hop, jazz, opera, pop, rap, reggae, rock.
**Idiom:** *One man's meat is another man's poison.* — Birine yarayan diğerine zarar verebilir (zevkler farklıdır).
""",
  [("Complete with a suitable expression: A: \"Classical music helps me concentrate.\" B: \"___. I always listen to Mozart when I study.\"", "**I couldn't agree more / You're absolutely right** — B agrees strongly and gives a reason."),
   ("Which sentence shows *partial* agreement? a) No doubt about it. b) I agree up to a point. c) I totally disagree.", "**b)** *I agree up to a point* = kısmen katılıyorum.")],
  ["Opinion: In my opinion / Personally / From my point of view.", "Agree: I couldn't agree more; disagree politely: I'm afraid I disagree.", "Survey report: The majority / A minority / Only a few …"]),
O("k2", "G12.1", "Tercih bildirme: prefer, would rather, would prefer", "Expressing preferences: prefer, would rather, would prefer", r"""
# 1. PREFER (genel tercihler)
| Pattern | Example |
|---|---|
| prefer **noun** to **noun** | I prefer **tea to coffee**. |
| prefer **V-ing** to **V-ing** | She prefers **reading to watching** TV. |
| prefer **to V1** rather than **(V1)** | I prefer **to walk rather than take** the bus. |

# 2. WOULD RATHER ('d rather) — o anki / belirli tercih
| Pattern | Example |
|---|---|
| would rather **V1** | I'd rather **stay** at home tonight. |
| would rather **V1** than **V1** | I'd rather **listen** to jazz **than** (listen to) rap. |
| would rather **not V1** | I'd rather **not go** out — I'm tired. |
| would rather **+ subject + V2** (başkası için) | I'd rather **you didn't** smoke here. |

> ✘ *I'd rather ~~to go~~* → ✔ *I'd rather **go*** (would rather'dan sonra **yalın fiil**).

# 3. WOULD PREFER ('d prefer) — belirli durum, kibar
| Pattern | Example |
|---|---|
| would prefer **noun** | Would you prefer **coffee or tea**? — I'd prefer tea. |
| would prefer **to V1** (rather than V1) | I'd prefer **to cook** at home **rather than eat** out. |

# Summary Table
| | after it | comparison word |
|---|---|---|
| prefer | noun / V-ing / to V1 | **to** (noun, V-ing) · **rather than** (to V1) |
| would rather | **V1** | **than** |
| would prefer | noun / **to V1** | **rather than** |

**Practice (answers in bold):**
1. They prefer **living** in a village to **living** in a city.
2. I would rather **watch** a film than **go** to the concert.
3. We'd prefer **to travel** by train rather than **fly**.
4. He prefers rock music **to** hip hop.
""",
  [("Correct the mistake: \"I'd rather to listen to the radio than watch TV.\"", "**I'd rather listen** — *would rather* is followed by the bare infinitive (V1)."),
   ("Rewrite with *prefer*: \"I like swimming more than running.\"", "**I prefer swimming to running.** (prefer V-ing **to** V-ing)")],
  ["prefer A to B (noun / V-ing).", "would rather V1 than V1 (yalın fiil).", "would prefer to V1 rather than V1."]),
]),

U("t2", "Theme 2: Friendship", "Theme 2: Friendship", [
O("k1", "E12.2", "Friendship: kişisel özellikleri betimleme ve sebep belirtme", "Friendship: describing personal features and stating reasons", r"""
# Theme 2 — Friendship: Functions
1. **Describing personal features** (appearance and personality)
2. **Making conclusions**
3. **Stating reasons**

| Skill | Learning outcome (E12.2) |
|---|---|
| Listening | Extract specific information from a conversation (L1); infer the qualities of a good friend (L2) |
| Pronunciation | **Syllable / word stress** (*reLIable, supPORTive, GEnerous*) |
| Speaking | Ask and answer about personal features (S1); describe appearance giving reasons (S2); interpret graphs (S3) |
| Reading | Find irrelevant content (R1); identify main conclusions in argumentative texts (R2) |
| Writing | Write an **opinion essay** about the qualities of a good friend with reasons (W1) |

# Describing People
| Question | Asks about | Example answer |
|---|---|---|
| **What does she look like?** | appearance | She's tall and slim with curly blonde hair and freckles. |
| **What is he like?** / What kind of person is he? | personality | He's easy-going, honest and a bit stubborn. |
| **What does she like?** | likes / hobbies | She likes hiking. |

**Appearance:** *plump, chubby, muscular, slim; bald, receding hairline; straight / curly / wavy hair; fair-skinned; beard, moustache, scar, freckles, dimples.*
**Age:** *in his early/mid/late 30s; He can't be in his 60s — he looks much younger.*

# Comparing People
- *Kyle and Randy are **similar because** they are both generous.*
- *Claire and Vivian are **similar in that** they love animals.*
- *The twins **differ in** their attitude towards animals.*
- *She's **as** helpful **as** her sister.* / *One **similarity between** Ali and Can **is** …*

# Making Conclusions (modals of deduction)
- *She writes to him every day. She **must** be his best friend.* (%95 eminim — evet)
- *He **can't** be at school; I've just seen him at the café.* (%95 eminim — hayır)
- *They **might / may / could** be cousins.* (olasılık)

# Stating Reasons
*because + clause · because of / due to + noun · since / as + clause · That's why … · The reason why … is that …*
*A good friend is supportive **because** they stand by you in difficult times.*

# Vocabulary
| Personality (+) | Personality (−) | Other |
|---|---|---|
| honest, loyal, faithful, reliable | stubborn, jealous, mean (cimri) | rely on (güvenmek) |
| generous, thoughtful, considerate | bad-tempered, strict | look up to (hayranlık duymak) |
| supportive, patient, sincere | apathetic (duyarsız), proud | resemble / look like (benzemek) |
| easy-going, mature, sensible | violent, distracted | mutual (ortak), commonality |
| extroverted / introverted | humorous (esprili) | loyalty, fidelity (sadakat) |

**Sayings:** *A friend in need is a friend indeed.* (Dost kara günde belli olur.) · *No road is long with good company.*
""",
  [("Choose the right question: \"___?\" — \"She's quite shy but very kind.\" a) What does she look like? b) What is she like?", "**b) What is she like?** — the answer describes **personality**, not appearance."),
   ("Make a conclusion with a modal: \"His eyes are red and he keeps yawning.\"", "**He must be tired / He must have stayed up late.** — strong deduction from evidence.")],
  ["look like = appearance; be like = personality.", "must / can't = strong deduction; may/might = possibility.", "Reasons: because, since, due to, that's why."]),
O("k2", "G12.2", "Opinion essay: iyi bir arkadaşın nitelikleri", "Opinion essay: qualities of a good friend", r"""
# Opinion Essay Plan
| Part | Content | Useful language |
|---|---|---|
| **Introduction** | Topic + your **thesis** (opinion) | *In my opinion, the most important quality of a friend is …* |
| **Body 1** | Reason 1 + example | *Firstly, … because … For example, …* |
| **Body 2** | Reason 2 + example | *Secondly / Moreover / In addition, …* |
| **(Body 3)** | Opposing view + your answer | *Some people believe … However, …* |
| **Conclusion** | Restate opinion, summarise | *To sum up / In conclusion, …* |

# Model Paragraph
*In my view, **loyalty** is the most important quality of a good friend. **Firstly**, a loyal friend keeps your secrets, so you can rely on them completely. **Secondly**, loyal friends stand by you in difficult times; **for example**, when I failed an exam, my best friend studied with me every evening. **Some people claim** that being fun is more important. **However**, fun alone doesn't make a friendship last. **To sum up**, …*

# Reading Skill: Finding Irrelevant Sentences
In paragraph-completion and "irrelevant sentence" questions (YDT style), check that each sentence supports the **main idea**. A sentence that introduces a **new topic** or a detail about something else is irrelevant.

*Paragraph topic: Why friendships fade after school.* — "Many people move to different cities for work. **The Eiffel Tower is a popular destination.** Busy schedules also leave little time to meet." → The second sentence is irrelevant.

# Main Conclusion in Argumentative Texts
Look for signal words: *therefore, thus, consequently, as a result, so, this shows that, it is clear that* — the main conclusion often follows them.
""",
  [("Which linker introduces an opposing view? a) Moreover b) However c) For example", "**b) However** — contrast. *Moreover* adds; *for example* illustrates."),
   ("Write a thesis sentence for an essay on 'Can social media friends be real friends?'", "Sample: **\"In my opinion, social media can help friendships begin, but real friendship needs face-to-face trust.\"** — clear position + preview of reasons.")],
  ["Essay: thesis → reasons + examples → counter-argument → conclusion.", "Irrelevant sentence = off the main idea.", "Conclusion signals: therefore, thus, as a result."]),
]),

U("t4", "Theme 4: Coming Soon", "Theme 4: Coming Soon", [
O("k1", "E12.4", "Coming Soon: gelecek tahminleri, siber dünya ve siber suçlar", "Coming Soon: predictions, the cyber world and cyber crime", r"""
# Theme 4 — Coming Soon
The theme deals with **future predictions** (technology, environment, life in the future) and the **cyber world**: its benefits, dangers and safety measures.

# Cyber Crime Vocabulary
| Term | Meaning |
|---|---|
| **phishing** | e-dolandırıcılık: sahte e-posta/siteyle şifre ve kart bilgisi çalma |
| **identity theft** | kimlik hırsızlığı |
| **online harassment / cyber bullying** | çevrim içi taciz / sanal zorbalık |
| **invasion of privacy** | mahremiyetin ihlali |
| **malware** | kötü amaçlı yazılım (virus, worm, spyware) |
| **ransomware** | fidye yazılımı: dosyaları kilitleyip **ransom** (fidye) ister |
| **hacker, cybercrook, phisher** | siber suçlular |
| **scam / tricking** | dolandırıcılık / kandırma |
| **anti-spyware, filter, backup** | önlemler: casus yazılım engelleyici, filtre, yedek |

**Other useful words:** *accessible (ulaşılabilir), addiction (bağımlılık), beneficial / harmful, crucial (çok önemli), culprit (suçlu), embedded (gömülü), emission, extinct, futurist, gain access, immediately, innocuous (zararsız), insecurely, legitimate (meşru), log in, malicious (kötü niyetli), precaution / safety measure, predictable, prediction, preventable, suspicious, undermine (zayıflatmak, baltalamak), undergo (geçirmek, maruz kalmak), virtual reality, witness.*

# Staying Safe Online
- Use **strong, different passwords**; never share your *banking password* or *citizenship number*.
- Don't click **suspicious** links; check the sender (anti-phishing).
- Keep software and **anti-virus / anti-spyware** updated; make regular **backups**.
- Think before you post: personal information stays online.
- Report **cyber bullying**; don't respond to harassers.

# Talking About the Future
*I predict that … · In the next decade, … · By 2050, … · There's a good chance that … · It's likely / unlikely that … · I doubt that …*

**Proverb:** *There's no rose without a thorn.* — Gülü seven dikenine katlanır (teknolojinin yararları ve zararları birlikte gelir).
""",
  [("Match: 'a copy of a file made in case the original is lost' → ?", "**backup** (yedek)."),
   ("Which word means 'to weaken or lessen the effectiveness of something'? a) undergo b) undermine c) trick", "**b) undermine** — *undergo* = experience/be subjected to; *trick* = deceive.")],
  ["Cyber crimes: phishing, identity theft, harassment, invasion of privacy.", "Malware / ransomware; precautions: passwords, backup, anti-spyware.", "Prediction language: likely, I predict, by 2050."]),
O("k2", "G12.4", "Gelecek zaman: will ve be going to", "Future tenses: will vs be going to", r"""
# BE GOING TO
| Use | Example |
|---|---|
| **Plans / intentions** decided before speaking | I'**m going to** visit my grandparents this weekend. |
| **Predictions based on present evidence** | Look at those clouds — it'**s going to** rain. / Watch out! The vase **is going to** fall. |

# WILL
| Use | Example |
|---|---|
| **Instant decisions** (at the moment of speaking) | The phone is ringing. — I'**ll** answer it. |
| **Predictions / opinions** (often with *think, believe, hope, expect, suppose, be sure, be afraid, probably*) | I **think** robots **will** teach some lessons in the future. |
| **Offers** | Your bag looks heavy. I'**ll** help you. |
| **Promises** | I promise I **won't** tell anyone. |
| **Requests** | **Will** you pass me the salt, please? |
| **Facts about the future** | I **will be** 18 next month. |
| **Threats / warnings** | Stop it, or I'**ll** call the teacher! |

# will vs going to — Key Contrast
| Situation | Correct |
|---|---|
| "Why are you filling the bucket?" | I'**m going to** wash the car. (plan already made) |
| "I've forgotten my wallet!" | Don't worry, I'**ll** lend you some money. (instant offer) |
| "She looks very pale." | She'**s going to** faint. (evidence) |
| "Who do you think will win?" | I think Türkiye **will** win. (opinion) |

# Conditionals and time clauses
*If my parents give me some money, I **will** buy a new pair of shoes.* (First conditional)
After **when, as soon as, before, after, until** → present tense: *I'll call you **when** I **arrive**.*

**Practice (answers in bold):**
1. A: Have you done your homework? B: Not yet. I **am going to do** it tonight.
2. Jim is ill. He **won't go** to school tomorrow.
3. Hurry up! The bus is at the stop — we **are going to miss** it.
4. I don't think she **will pass** the exam; she hasn't studied at all.
""",
  [("Choose: \"Oh no, I've left the window open!\" — \"Don't worry, I ___ close it.\" (will / am going to)", "**will** — an **instant decision / offer** made at the moment of speaking."),
   ("Choose: \"We ___ spend two weeks in Bodrum; we booked the hotel last month.\"", "**are going to** — a **plan** decided before speaking.")],
  ["going to: plans, evidence-based predictions.", "will: instant decisions, opinions, offers, promises, requests.", "Time clauses (when, as soon as) take present tense."]),
]),

U("t5", "Theme 5: Psychology", "Theme 5: Psychology", [
O("k1", "E12.5", "Psychology: ruh hâlini anlatma, öneri ve talimat", "Psychology: describing mood, suggestions and instructions", r"""
# Theme 5 — Psychology: Functions
1. **Describing mood**
2. **Making suggestions** to change a negative mood
3. **Following and giving instructions**

| Skill | Learning outcome (E12.5) |
|---|---|
| Listening | List suggestions given by a psychologist/friend (L1); identify the speaker's mood and tone (L2) |
| Pronunciation | Sentence **intonation and stress** |
| Speaking | Role-play a counsellor and a client (S1); comment on moods from flashcards (S2); give instructions with different voice levels (S3) |
| Reading | Read a poem aloud reflecting its tone (R1); identify specific information in a real-life text (R2) |
| Writing | Describe a mood (yours or in a song/painting/photo) through **creative writing** (W1) |

# Mood Vocabulary
| Positive | Negative |
|---|---|
| cheerful, delighted, relaxed, calm | exhausted, stressed, anxious, nervous |
| optimistic, content, thrilled | depressed, gloomy, frustrated, irritated |
| energetic, confident | bored, lonely, upset, overwhelmed |

*I feel **exhausted** and I can't concentrate. · She's been **in a bad mood** all day. · He's **on cloud nine** (çok mutlu). · I'm **feeling down** (moralim bozuk).*

# Giving Instructions (imperatives)
**Relaxation exercise:** *Sit comfortably. **Close** your eyes. **Breathe** in deeply through your nose … hold it … and **breathe out** slowly. **Don't** think about your worries. **Relax** your shoulders.*
- Instructions use the **imperative** (V1 / Don't + V1).
- Sequencers: *first, then, next, after that, finally.*
- A calm instruction uses a **low, slow** voice; an urgent one is **loud and quick**.

# Counsellor–Client Role-Play
Client: *I've been feeling really stressed about the exams.*
Counsellor: *I understand. **Why don't you** make a realistic study plan? **I suggest** taking short breaks every hour. **How about** going for a walk after dinner?*
Client: *That sounds like a good idea. I'll try it.*

**Responding to suggestions:** *That's a good idea. · Sounds great! · Why not? · I'd rather not, … · I'm not sure that would help.*
""",
  [("Which reply is an *instruction*? a) Why don't you rest? b) Breathe deeply and relax. c) I'd rather stay home.", "**b)** — an **imperative** (instruction). (a) is a suggestion; (c) a preference."),
   ("A friend says: \"I feel so lonely since I moved here.\" Give a suggestion.", "Sample: **\"Why don't you join a club at school? You'll meet new people.\"** / **\"How about inviting your classmates to a picnic?\"**")],
  ["Mood adjectives: exhausted, anxious, cheerful, content.", "Instructions = imperative + sequencers.", "Respond: That's a good idea / I'd rather not."]),
O("k2", "G12.5", "Öneride bulunma kalıpları (suggestions)", "Making suggestions", r"""
# Suggestion Structures
| Structure | Form | Example |
|---|---|---|
| **Let's** | Let's + V1 / Let's not + V1 | **Let's take** a break. / **Let's not study** tonight. |
| **Shall we / I** | Shall we/I + V1? | **Shall we go** on a picnic? / **Shall I help** you? |
| **Why don't** | Why don't you/we + V1? | **Why don't you go** to bed early? |
| **Why doesn't** | Why doesn't he/she + V1? | Brian has a toothache. **Why doesn't he see** a dentist? |
| **Would you like** | Would you like **to V1**? | **Would you like to go** to the cinema? |
| **Do you fancy** | Do you fancy **V-ing**? | **Do you fancy going** swimming? |
| **What / How about** | What about / How about **V-ing / noun**? | **How about going** for a walk? **What about** a pizza? |
| **I suggest** | I suggest **V-ing** | **I suggest visiting** your grandparents. |
| **I suggest (that)** | I suggest (that) + subject + **V1** (no -s!) | **I suggest (that) Ali go** abroad to learn a language. |
| **You'd better / should** | had better / should + V1 | You'd **better** rest. You **should** talk to a counsellor. |
| **If I were you** | If I were you, I would + V1 | **If I were you, I would** take a nap. |

> **Dikkat:** *suggest* fiilinden sonra **to V1 gelmez**: ✘ *I suggest you to go* → ✔ *I suggest **you go*** / *I suggest **going***.
> *How about / What about / Do you fancy* → **V-ing**; *Why don't you / Let's / Shall we* → **V1**.

**Practice (answers in bold):**
1. Do you fancy **going** (go) to the concert tonight?
2. Why **don't** you join a music club?
3. I suggest **taking** a short nap.
4. How about **watching** a comedy to cheer up?
5. **Shall** we meet at 7?
""",
  [("Correct the mistake: \"I suggest you to talk to your teacher.\"", "**I suggest (that) you talk** to your teacher / **I suggest talking** to your teacher. *Suggest* doesn't take *object + to V1*."),
   ("Fill in: \"What about ___ (play) chess this evening?\"", "**playing** — *what/how about* is followed by **V-ing**.")],
  ["V1: Let's, Shall we, Why don't you.", "V-ing: How/What about, Do you fancy, I suggest V-ing.", "I suggest (that) + subject + V1 (no -s)."]),
]),

U("t6", "Theme 6: Favors", "Theme 6: Favors", [
O("k1", "E12.6", "Favors: rica etme, kabul ve ret, yardım isteme", "Favors: making requests, accepting and declining", r"""
# Theme 6 — Favors: Functions
1. **Making requests**
2. **Accepting and declining requests**
3. **Asking for and responding to favours**

| Skill | Learning outcome (E12.6) |
|---|---|
| Listening | Identify request phrases and high-frequency vocabulary (L1); complete a conversation about favours (L2) |
| Pronunciation | **Yod coalescence:** *would you* /wʊdʒu/, *could you* /kʊdʒu/ |
| Speaking | Distinguish **formal / informal** language when accepting and declining (S1); act out a dialogue (S2) |
| Reading | Scan a text about a **charity** organisation (R1) |
| Writing | Write an **announcement** inviting people to a charity event (W1); write a **scholarship application letter** (W2) |

# Formality Scale of Requests
| Informal → | Neutral | → Very formal |
|---|---|---|
| *Can I borrow your pen?* | *Could you open the window, please?* | *I was wondering if you could help me with my application.* |
| *Is it OK if I sit here?* | *Do you think I could use your phone?* | *Would it be possible to change my appointment?* |
| *Pass me the salt, will you?* | *Would you mind closing the door?* | *I'd be grateful if you could send me the form.* |

# Accepting and Declining
| Accepting | Declining (polite) |
|---|---|
| *Sure! / Of course. / No problem.* | *I'm sorry, but I can't.* |
| *I'd be happy / glad to.* | *I'm afraid I can't — I need it myself.* |
| *My pleasure. / Help yourself!* | *I'd love to, but …* |
| *Go ahead.* (permission) | *I'd rather you didn't, if you don't mind.* |

# Writing: Charity Announcement
**Headline** (*Help Us Help Them!*) → **what** (event) → **when / where** → **why** (cause) → **how to join** (contact) → call to action (*Every donation counts!*).

# Writing: Scholarship Application Letter
*Dear Sir/Madam,* → reason for writing (*I am writing to apply for …*) → your achievements and needs → how the scholarship will help → *I would be grateful if you could consider my application.* → *I look forward to hearing from you. Yours faithfully,*

# Vocabulary
*borrow (ödünç almak) ≠ lend (ödünç vermek), charity (hayır kurumu), donate / donation, volunteer, foundation (vakıf), scholarship (burs), favour (iyilik), do sb a favour, owe sb (borçlu olmak), grateful, generous, spare (ayırmak: Can you spare a minute?).*
""",
  [("Which request is the most formal? a) Can I use your laptop? b) I was wondering if I could use your laptop. c) Give me your laptop.", "**b)** — *I was wondering if …* is very polite/formal."),
   ("Respond to \"Would you mind lending me your bike?\" by accepting.", "**\"Not at all. Here you are.\"** — with *Would you mind…?*, \"No / Not at all\" means **yes, I'll do it**.")],
  ["Requests: Can I…? → Could you…? → I was wondering if…", "Accept: Sure, I'd be glad to; decline: I'm afraid I can't.", "borrow ≠ lend; charity announcement & scholarship letter."]),
O("k2", "G12.6", "Rica kalıplarının dil bilgisi: would you mind, do you mind if", "Grammar of requests: would you mind, do you mind if", r"""
# Request Structures and Their Forms
| Structure | Followed by | Example |
|---|---|---|
| Can / Could / Will / Would **you** … ? | **V1** | **Could you** possibly **help** me? |
| Can / Could / May **I** … ? | **V1** | **May I** leave early? |
| **Would you mind** … ? | **V-ing** | **Would you mind turning** down the music? |
| **Would you mind if I** … ? | **V2** (past) | **Would you mind if I opened** the window? |
| **Do you mind if I** … ? | **V1** (present) | **Do you mind if I sit** here? |
| **Is it OK / all right if I** … ? | **V1** | **Is it all right if I park** here? |
| **Do you think I could** … ? | **V1** | **Do you think I could borrow** your car? |
| **Would it be possible to** … ? | **V1** | **Would it be possible to move** that table? |
| **I was wondering if you could** … | **V1** | **I was wondering if you could** check my essay. |
| **Do you happen to have** … ? | noun | **Do you happen to have** change for 50 liras? |

# Answering "mind" Questions ⚠
*Mind* = rahatsız olmak, sakıncası olmak. So:
- **"No, not at all / Of course not / Go ahead."** → İzin veriyorum, sorun yok ✔
- **"Yes, I do mind / I'd rather you didn't."** → Sakıncası var ✘

*Jack: Does anyone mind if I open the window? — Susan: Well, **I'd rather you didn't**. I'm a bit cold.* (ret)

# Pronunciation — Yod Coalescence
*would you* → /wʊdʒu/, *could you* → /kʊdʒu/, *did you* → /dɪdʒu/: the /d/ + /j/ sounds merge into /dʒ/ in fast speech.
""",
  [("Fill in: \"Would you mind ___ (wait) a few minutes?\"", "**waiting** — *Would you mind* + **V-ing**."),
   ("Fill in: \"Would you mind if I ___ (use) your phone?\"", "**used** — *Would you mind if I* + **V2**. (*Do you mind if I **use**…* with present.)")],
  ["Would you mind + V-ing.", "Would you mind if I + V2; Do you mind if I + V1.", "'No, not at all' = permission granted."]),
]),

U("t7", "Theme 7: News Stories", "Theme 7: News Stories", [
O("k1", "E12.7", "News Stories: geçmiş olayları anlatma ve sıralama", "News Stories: narrating past events and sequencing", r"""
# Theme 7 — News Stories: Functions
1. **Narrating a past event / experience**
2. **Talking about sequential actions**

| Skill | Learning outcome (E12.7) |
|---|---|
| Listening | List the sequence of past events (L1); complete a text using **cohesive devices** (L2) |
| Pronunciation | **Sentence stress** (*I MISSED the LAST EPisode.*) |
| Speaking | Narrate past events (S1); present unusual / odd news stories (S2) |
| Reading | List vocabulary for narrating events (R1); **reorder** the events of a news story (R2) |
| Writing | **Paraphrase** news / stories (W1); write a news story, past experience or imaginary story (W2) |

# Structure of a News Story
| Part | Answers | Example |
|---|---|---|
| **Headline** | short, present tense, no articles | *Farmer Survives Three Days in Snow* |
| **Lead** (1st paragraph) | **Who? What? Where? When?** | *A 60-year-old farmer was rescued on Monday after …* |
| **Body** | **Why? How?** details, quotes | *"I never lost hope," he told reporters.* |
| **Ending** | result / current situation | *He is now recovering in hospital.* |

# Sequencing and Cohesive Devices
*First / At first · Then / Next · After that / Afterwards · Meanwhile (bu arada) · Following this event … · Eventually / Finally / In the end · Suddenly · Fortunately / Unfortunately · As soon as · By the time*

# Reading Strategy — Reordering Events
1. Find the **trigger** (the first event) — often in the past perfect in the text.
2. Look for time expressions (*a couple of days later, just as, from that moment on*).
3. Remember: *When the ambulance arrived, he **had** already **called** for help* → calling came **first**.

**Example order:** She fell in the garden → her husband found her and called the emergency services → the ambulance arrived → neighbours gathered in the square → doctors gave little hope → just as the machine was unplugged she moved her eyelids → she recovered.

# Vocabulary
*incident, witness, survive (hayatta kalmak), injure / injured, rescue, collapse, recover / recovery, miraculous, intensive care, emergency, struck (çarpılmak), without a scratch (burnu bile kanamadan), headline, reporter, episode (bölüm), odd / unusual.*
*Responding to news:* *You're kidding! · That's incredible! · What a relief! · That reminds me of …*
""",
  [("Which part of a news story answers who, what, where and when?", "**The lead** (first paragraph). The body gives *why* and *how*."),
   ("Order: (a) The thief ran away. (b) The police arrived. — sentence: 'By the time the police arrived, the thief had run away.'", "**a → b** — the **past perfect** (*had run away*) shows the earlier action.")],
  ["News story: headline → lead (5W) → body → ending.", "Sequencers: first, then, meanwhile, eventually.", "Past perfect = the earlier event."]),
O("k2", "G12.7", "Past simple, past continuous ve past perfect birlikte kullanımı", "Past simple, past continuous and past perfect together", r"""
# Past Continuous + Past Simple
- **Longer, background action** → *past continuous*; **short, interrupting action** → *past simple*.
- **while / as** + past continuous; **when** + past simple (usually).

| Pattern | Example |
|---|---|
| **While/As** + past cont., past simple | **While** I **was cooking**, the doorbell **rang**. |
| Past simple **while** past cont. | Someone **knocked** **while** the teacher **was checking** our papers. |
| **When** + past simple, past cont. | **When** I **saw** Sue, she **was waiting** for the bus. |
| Two actions in progress at the same time | My mother **was chopping** the onions **while** I **was peeling** the potatoes. |
| One action **after** another | **When** my father **arrived**, we **had** dinner. (önce geldi, sonra yedik) |

> **Stative verbs** (know, want, love, believe, belong, own) are **not** used in the continuous: ✘ *They were knowing* → ✔ *They **knew** each other well.*

# Past Perfect + Past Simple
**Past perfect (had + V3)** = the **earlier** of two past actions.

| Conjunction | Pattern | Example |
|---|---|---|
| **when** | past simple, **past perfect** | **When** our guests **came**, my mother **had** already **laid** the table. |
| **because** | past simple, because **past perfect** | I went to bed early **because** I **had worked** all day. |
| **after** | **after** + past perfect, past simple | **After** she **had had** breakfast, she **left** for school. |
| **before** | **before** + past simple, past perfect | **Before** the police **arrived**, the thief **had run** away. |
| **as soon as** | as soon as + past perfect, past simple | **As soon as** he **had opened** the door, he **ran** to the kitchen. |
| **by the time** | by the time + past simple, **past perfect** | **By the time** the firefighters **arrived**, the building **had burnt** down. |

**Compare:** *When I arrived, the film **started**.* (geldim, sonra başladı) vs. *When I arrived, the film **had started**.* (ben gelmeden başlamıştı).

**Practice (answers in bold):**
1. While I **was working** (work), Ethan **came** (come).
2. When the electricity **went off** (go off), I **was reading** (read).
3. By the time she **turned** twenty, she **had visited** most European capitals.
4. After Martin **had taken off** his jacket, he **phoned** his friend.
""",
  [("Fill in: \"While they ___ (walk) by the lake, they ___ (see) a swan.\"", "**were walking / saw** — background action (past continuous) interrupted by a short action (past simple)."),
   ("Fill in: \"When she arrived, the match ___ (already / start).\"", "**had already started** — the match began **before** she arrived (past perfect).")],
  ["While/as + past continuous; short action = past simple.", "Past perfect = earlier action (after, before, by the time).", "No continuous with stative verbs."]),
]),

U("t8", "Theme 8: Alternative Energy", "Theme 8: Alternative Energy", [
O("k1", "E12.8", "Alternative Energy: sorunları anlatma, şikâyet ve çözüm önerisi", "Alternative Energy: describing problems, complaining, offering solutions", r"""
# Theme 8 — Alternative Energy: Functions
1. **Describing problems**
2. **Making complaints**
3. **Offering solutions**

| Skill | Learning outcome (E12.8) |
|---|---|
| Listening | Note down solutions to excessive energy consumption (L1) |
| Pronunciation | Use **intonation** appropriately |
| Speaking | Make complaints and offer solutions to environmental/energy problems (S1); take part in an informal **debate** on alternative energy (S2) |
| Reading | **Summarise** a text about alternative energy (R1); find solutions to environmental problems in a text (R2) |
| Writing | Write a **letter / e-mail of complaint** to a local authority suggesting solutions (W1); write opinions on using alternative energy (W2) |

# Energy Sources
| Renewable (yenilenebilir) | Non-renewable |
|---|---|
| **solar** (güneş), **wind** (rüzgâr), **hydroelectric** (dam = baraj), **geothermal** (jeotermal), **biomass / biofuel**, **wave & tidal** (dalga, gelgit) | coal, oil, natural gas (fossil fuels), nuclear (uranium) |

**Problems:** *global warming, emissions, air/water pollution, deforestation (ormansızlaşma), erosion, overpopulation, waste disposal (atık bertarafı), excessive consumption, energy leakage (enerji kaçağı), pesticides.*
**Solutions:** *conservation (koruma), recycling, insulation (yalıtım), switching to renewables, reducing consumption, raising awareness (farkındalık), banning, curbing (kontrol altına almak).*

# Useful Language
| Describing / complaining | Offering solutions |
|---|---|
| *Sorry to bother you, but there's a problem that requires an urgent solution.* | *The solution to this problem is …* |
| *I'm sorry to have to say this, but …* | *In order to solve this problem, we must first …* |
| *There seems to be a mistake on my bill.* | *I think we should …* / *We'd like you to …* |
| *I think you may have forgotten to …* | *Another way of looking at this problem is …* |
| *This is unacceptable / It's unfair that …* | *Don't get me wrong, but I think we should …* |

# Vocabulary
| Word | Meaning | Word | Meaning |
|---|---|---|---|
| waste of energy | enerji israfı | affordable | uygun fiyatlı |
| drain | tüketmek, sömürmek | renewable | yenilenebilir |
| trap | tutmak, hapsetmek | reside | ikamet etmek |
| switch | değiştirmek, geçmek | deal with | üstesinden gelmek |
| contribution | katkı | inhale | solumak |
| prompt | acil, hızlı | vital | hayati |
| average | ortalama | awareness | farkındalık |
| dedicate | adamak | futile | boş, faydasız |
| refund | para iadesi | complaint | şikâyet |
| intermittent | kesintili | accumulate | birikmek |
""",
  [("Which is a polite way to start a complaint? a) You broke my phone! b) I'm sorry to bother you, but I think there's a problem with my phone.", "**b)** — polite, **indirect** language is more effective."),
   ("Name two renewable energy sources that are common in Türkiye.", "**Solar** (especially the south and southeast) and **wind** (Aegean and Marmara coasts); also **hydroelectric** and **geothermal** (Denizli, Aydın).")],
  ["Renewable: solar, wind, hydro, geothermal, biomass.", "Complaint language is polite and indirect.", "Solutions: The solution is…, We must first…, I think we should…"]),
O("k2", "G12.8", "Etkili şikâyet: problem, duygu, eylem talebi", "How to complain effectively", r"""
# The Three Steps of an Effective Complaint
| Step | Purpose | Language |
|---|---|---|
| **1. Explain the problem** (politely, indirectly) | Describe what is wrong without attacking | *I think you may have …* · *I'm sorry to have to say this, but …* · *I just noticed …* · *I'm sorry to bother you, but …* · *There seems to be a mistake …* |
| **2. State your feelings** (only if needed — serious or continuing problems) | Show how serious it is | *This is unacceptable.* · *It's very disappointing that …* · *This has been going on for three months.* |
| **3. Ask for action** | Request a solution | *Could I speak to the manager?* · *Would it be possible to reimburse me / give me a refund?* · *Is there any chance you could …?* · *I'd like it replaced.* |

> Direct: *"You didn't bring my drink."* ✘ (sounds critical)
> Indirect: *"I think you may have forgotten my drink."* ✔

# Model Dialogue
**Customer:** *Excuse me, I'm sorry to bother you, but I just noticed a hole in the shirt you cleaned.* (step 1)
**Assistant:** *Oh, I'm terribly sorry about that.*
**Customer:** *It's brand new and I've only worn it once, so I'm quite upset.* (step 2)
**Customer:** *Is there any chance you could replace it or refund me?* (step 3)
**Assistant:** *Of course. **Allow me** to check with the manager. **We can offer** you a full refund.*

# Typical Complaints and Responses
| Complaint | Solution offered |
|---|---|
| The hamburger is cold. | *I'll bring you a hot one right away.* |
| You overcharged me for this bag. | *I'm sorry — let me give you a refund.* |
| There's no hot water in our room. | *We'll move you to another room.* |
| The Internet isn't working. | *We'll credit you for the lost hours.* |

# Letter of Complaint to a Local Authority
*Dear Sir/Madam, I am writing to complain about the waste that the factory near our neighbourhood dumps into the stream. **This has caused** a terrible smell and dead fish. **It is unacceptable that** no action has been taken. **I would suggest** regular inspections and fines. **I look forward to** your prompt reply. Yours faithfully, …*
""",
  [("Put in order (1–3): (a) Could I have a refund? (b) I'm sorry to bother you, but this kettle doesn't work. (c) I'm really disappointed because it's brand new.", "**b → c → a** — explain the problem, state feelings, ask for action."),
   ("Make this complaint indirect: \"You charged me twice!\"", "**\"I think there may be a mistake on my bill — I seem to have been charged twice.\"**")],
  ["Complain in 3 steps: problem → feelings → action.", "Use indirect language: I think you may have…", "Ask: Would it be possible to…? Is there any chance…?"]),
]),

U("t9", "Theme 9: Technology", "Theme 9: Technology", [
O("k1", "E12.9", "Technology: yapılması gerekenler, röportaj ve teknoloji terimleri", "Technology: things to be done, interviews and tech vocabulary", r"""
# Theme 9 — Technology: Functions
1. **Talking about things needed to be done**
2. **Asking and answering questions in interviews**

| Skill | Learning outcome (E12.9) |
|---|---|
| Listening | List the things to be done (L1); find the main idea of a video on technology (L2) |
| Pronunciation | **Word stress** (*TECHnology → techNOlogy, COMputer, deVElop*) |
| Speaking | Express surprise, happiness, interest, indifference about devices (S1); interview a friend on technology and social life (S2) |
| Reading | Identify web-page lexis and jargon (R1); categorise information in websites, brochures, magazines (R2) |
| Writing | Write a note asking someone to **have something done** (W1); write a **for and against essay** (W2); describe a hi-tech product with linking words (W3) |

# Web-Page Vocabulary
| Term | Meaning |
|---|---|
| browser | tarayıcı |
| search box | arama kutusu |
| navigation bar | gezinme çubuğu |
| breadcrumb | sayfa işaretleri yolu (Ana sayfa > Ürünler > …) |
| footer / header | alt bilgi / üst bilgi |
| advertisement banner | reklam afişi |
| social sharing links | sosyal paylaşım bağlantıları |

# Computer Parts
| Input | Output | Processing | Storage |
|---|---|---|---|
| keyboard, mouse, microphone, scanner, motion sensor | monitor, speakers, printer, projector | **CPU**, control unit, logic unit, sound/graphics card, RAM | hard disk, SSD, cache, ROM, USB drive |

- **CPU:** interprets and executes most commands. **Control unit:** tells the logic unit, memory and I/O devices how to respond. **Logic unit (ALU):** arithmetic and bitwise operations. **Cache:** a small high-speed memory area.

# For and Against Essay
**Introduction** (topic, neutral) → **Arguments for** (*One advantage is …, Moreover …*) → **Arguments against** (*On the other hand, … A major drawback is …*) → **Conclusion** (balanced opinion: *All things considered, …*).

# Other Vocabulary
*accessible, out of order (bozuk), malfunction (arıza), repair / replace, maintenance (bakım), portable (taşınabilir), cordless, infrared, emit (yaymak), storage, overuse (aşırı kullanım), expenditure (gider), warranty (garanti), skim (göz gezdirmek), exaggerate (abartmak), contrast, delivery (teslimat), faucet (musluk), drawer (çekmece).*

**Reacting:** *Wow, that's amazing! (surprise) · I'm really into it. (interest) · I'm not bothered either way. (indifference)*
""",
  [("Classify: CPU, printer, keyboard, hard disk.", "**CPU** → processing; **printer** → output; **keyboard** → input; **hard disk** → storage."),
   ("Which part of a web page shows 'Home > Phones > Accessories'?", "The **breadcrumb** (sayfa işaretleri yolu).")],
  ["Input / output / processing / storage devices.", "Web lexis: browser, navigation bar, breadcrumb, footer.", "For & against essay: both sides + balanced conclusion."]),
O("k2", "G12.9", "Ettirgen yapı (causative): have/get sth done, make/have/get sb do", "Causatives: have/get something done; make/have/get someone do", r"""
# What Is a Causative?
Bir işi **kendimiz yapmadığımızda, başkasına yaptırdığımızda** kullanılır (ettirgen çatı): *saçımı kestirdim, arabamı tamir ettirdim.*

# Causative 1 — The doer is not important
| Form | Example |
|---|---|
| **have + object + V3** | Mary **had her hair cut**. |
| **get + object + V3** (more informal) | We're **getting our house painted**. |

All tenses are possible by changing *have/get*:
*I **have** my car serviced every year. · I **am having** my car serviced. · I **had** it serviced last week. · I **will have** it serviced. · I need to **have** it serviced. · You should **have** your eyes tested.*

Also for unpleasant events: *He **had his phone stolen** on the bus.*

# Causative 2 — The doer is mentioned
| Form | Meaning | Example |
|---|---|---|
| **have + person + V1** | arrange / ask | I **had the dentist clean** my teeth. |
| **get + person + to V1** | persuade | I **got the waiter to bring** some water. |
| **make + person + V1** | force (zorla) | She **made her kids tidy** their rooms. Don't **make** your sister **cry**! |
| **let + person + V1** | allow (izin) | The teacher doesn't **let** us **use** phones in class. |

> **get** sb **to V1** — diğerleri yalın fiil (**V1**). Passive *make*: *We **were made to wait** for an hour.*

**Practice (answers in bold):**
1. Your coat is dirty. You must **have it dry-cleaned**.
2. This jacket is too long. You should **have it shortened**.
3. The roof is leaking. We must **get it repaired**.
4. The mechanic fixed my brakes. → I **had the mechanic fix** my brakes.
5. The shop assistant gave me a discount. → I **got the shop assistant to give** me a discount.
6. I'm going to order food online and **have it delivered** to my house.
""",
  [("Rewrite as a causative: \"A designer in Italy is making Linda's wedding dress.\"", "**Linda is having her wedding dress made** by a designer in Italy."),
   ("Choose: \"My mum made me ___ (clean / to clean / cleaned) my room.\"", "**clean** — *make + person + V1* (bare infinitive).")],
  ["have/get + object + V3 (doer not important).", "have sb V1 · get sb to V1 · make sb V1 · let sb V1.", "Tense is carried by have/get."]),
]),
]
