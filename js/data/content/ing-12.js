/* =========================================================
   12. Sınıf İngilizce — dil bilgisi ve beceri notları
   Kaynak: kullanıcının verdiği "İngilizce 12 Detaylı Konu Anlatım Notları" (dil bilgisi odakları ve beceri stratejileri).
   Kaynak notlar tema içeriklerini değil, 12. sınıf dil bilgisi başlıklarını ve beceri stratejilerini listelediği için içerik bu başlıklara göre düzenlendi; her konu tablolar, örnek cümleler ve alıştırmalarla genişletildi. Ders kitabının tema adları kaynakta bulunmadığından kullanılmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/ingilizce"] = [
 {
  "id": "u1",
  "name": {
   "tr": "Unit 1: Tenses Review",
   "en": "Unit 1: Tenses Review"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "G1.1",
    "title": {
     "tr": "Present ve past zamanlar (tüm görünümler)",
     "en": "Present and past tenses (all aspects)"
    },
    "content": {
     "anlatim": "# Present Tenses\n\n| Tense | Form | Use | Example |\n|---|---|---|---|\n| **Simple Present** | V1 / V1-s | Habits, facts, timetables | Water **boils** at 100 °C. |\n| **Present Continuous** | am/is/are + V-ing | Now, temporary, fixed future plans | I **am meeting** Ayşe tomorrow. |\n| **Present Perfect** | have/has + V3 | Experience, result now, unfinished time | She **has** already **finished** her project. |\n| **Present Perfect Continuous** | have/has been + V-ing | Duration up to now | They **have been waiting** for two hours. |\n\n# Past Tenses\n\n| Tense | Form | Use | Example |\n|---|---|---|---|\n| **Simple Past** | V2 | Finished action at a definite time | We **visited** Efes last summer. |\n| **Past Continuous** | was/were + V-ing | In progress at a past moment; background | It **was raining** when I **left**. |\n| **Past Perfect** | had + V3 | Earlier of two past actions | The film **had started** before we **arrived**. |\n| **Past Perfect Continuous** | had been + V-ing | Duration before a past point | He was tired because he **had been running**. |\n| **used to / would** | used to + V1 | Past habits/states (would: only actions) | I **used to** live in Konya. |\n\n**Signal words:** *already, yet, just, ever, never, since, for* (Present Perfect) · *ago, last, in 2019, yesterday* (Simple Past) · *by the time, before, after, when* (Past Perfect).",
     "ornekler": [
      {
       "soru": "Choose: \"I (have lived / lived) in İzmir since 2018.\"",
       "cozum": "**have lived** — *since* shows an action continuing up to now (Present Perfect)."
      },
      {
       "soru": "Fill in: \"When I got to the station, the train ___ (already / leave).\"",
       "cozum": "**had already left** — the earlier past action (Past Perfect)."
      }
     ],
     "ozet": [
      "Present Perfect: past action, present relevance; since/for.",
      "Past Perfect: the earlier of two past actions.",
      "used to: past habits no longer true."
     ]
    }
   },
   {
    "id": "k2",
    "code": "G1.2",
    "title": {
     "tr": "Future forms",
     "en": "Future forms"
    },
    "content": {
     "anlatim": "# Future Forms\n\n| Form | Use | Example |\n|---|---|---|\n| **will + V1** | Predictions (opinion), instant decisions, promises, offers | I think robots **will** do most jobs. / I'**ll** help you. |\n| **be going to + V1** | Plans/intentions; predictions with present evidence | I'**m going to** study medicine. / Look at the sky — it'**s going to** rain. |\n| **Present Continuous** | Fixed arrangements | We'**re flying** to Baku on Monday. |\n| **Simple Present** | Timetables | The exam **starts** at 9:30. |\n| **Future Continuous** (will be + V-ing) | In progress at a future time | This time tomorrow I'**ll be taking** the exam. |\n| **Future Perfect** (will have + V3) | Completed before a future time | By 2030, scientists **will have found** a cure. |\n\n**Time clauses:** After *when, as soon as, before, after, until, by the time* we use a **present** tense, not *will*:\n*I'll call you **when** I **arrive**.* (✘ when I will arrive)",
     "ornekler": [
      {
       "soru": "Complete: \"By the end of June, we ___ (finish) all the units.\"",
       "cozum": "**will have finished** — completed before a future time (Future Perfect)."
      }
     ],
     "ozet": [
      "will: prediction, decision, promise.",
      "going to: plan, evidence-based prediction.",
      "Future Perfect: will have + V3 (by…)."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "Unit 2: Modals",
   "en": "Unit 2: Modals"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "G2.1",
    "title": {
     "tr": "Modals and semi-modals: obligation, ability, possibility, advice, deduction",
     "en": "Modals and semi-modals"
    },
    "content": {
     "anlatim": "# Functions of Modals\n\n| Function | Present / future | Past |\n|---|---|---|\n| **Obligation** | must, have to, need to | had to |\n| **No obligation** | don't have to, needn't | didn't have to / **needn't have + V3** (did it unnecessarily) |\n| **Prohibition** | mustn't, can't | couldn't, wasn't allowed to |\n| **Ability** | can, be able to | could, was able to (a specific success) |\n| **Advice** | should, ought to, had better | **should have + V3** (criticism / regret) |\n| **Possibility** | may, might, could | **may/might/could have + V3** |\n| **Certainty (deduction)** | **must** (sure: yes), **can't** (sure: no) | **must have + V3**, **can't/couldn't have + V3** |\n| **Permission / request** | can, could, may | — |\n\n# Perfect Modals (past deductions and regrets)\n\n- *The ground is wet. It **must have rained** last night.* (strong positive deduction)\n- *She **can't have seen** us; she was in Ankara.* (impossible)\n- *You **should have studied** harder.* (criticism — you didn't)\n- *I **needn't have taken** an umbrella; it didn't rain.* (did it, but unnecessary)\n- *He **might have missed** the bus.* (possibility)",
     "ornekler": [
      {
       "soru": "Rewrite with a perfect modal: \"I'm sure he forgot the meeting.\"",
       "cozum": "He **must have forgotten** the meeting."
      },
      {
       "soru": "What's the difference? \"You didn't need to buy bread.\" vs \"You needn't have bought bread.\"",
       "cozum": "**didn't need to**: it wasn't necessary (we don't know if you bought it). **needn't have bought**: you **did buy** it, but it was unnecessary."
      }
     ],
     "ozet": [
      "must/can't for present deduction; must have/can't have for past.",
      "should have + V3 = criticism of the past.",
      "needn't have + V3 = did something unnecessary."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "Unit 3: Conditionals and Wishes",
   "en": "Unit 3: Conditionals and Wishes"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "G3.1",
    "title": {
     "tr": "Zero, first, second, third and mixed conditionals; wish / if only",
     "en": "Conditionals; wish clauses"
    },
    "content": {
     "anlatim": "# Conditionals\n\n| Type | If-clause | Main clause | Use | Example |\n|---|---|---|---|---|\n| **Zero** | Present | Present | General truths | If you **heat** ice, it **melts**. |\n| **First** | Present | will + V1 | Real/likely future | If it **rains**, we **will stay** in. |\n| **Second** | Past (were) | would + V1 | Unreal present / unlikely future | If I **were** you, I **would apologise**. |\n| **Third** | Past Perfect | would have + V3 | Unreal past (regret) | If she **had studied**, she **would have passed**. |\n| **Mixed** | Past Perfect | would + V1 | Past cause → present result | If I **had taken** the job, I **would be** rich now. |\n\n**Alternatives to *if*:** *unless* (= if not), *provided/providing that, as long as, in case, otherwise, suppose*.\n**Inversion (formal):** *Had I known* = If I had known · *Were I you* = If I were you · *Should you need help* = If you need help.\n\n# Wish / If only\n\n| Wish about | Form | Example |\n|---|---|---|\n| **Present** (unreal) | wish + **Past Simple** | I **wish** I **had** more free time. |\n| **Past** (regret) | wish + **Past Perfect** | I **wish** I **had listened** to my teacher. |\n| **Annoying behaviour / future change** | wish + **would** | I **wish** you **would stop** talking. |\n| **Ability** | wish + **could** | I **wish** I **could** speak Japanese. |\n\n*If only* is a stronger form of *wish*: *If only I hadn't lost my phone!*",
     "ornekler": [
      {
       "soru": "Combine using a third conditional: \"He didn't set an alarm. He missed the exam.\"",
       "cozum": "If he **had set** an alarm, he **wouldn't have missed** the exam."
      },
      {
       "soru": "Express regret: \"I didn't save any money last year.\"",
       "cozum": "I **wish I had saved** some money last year."
      }
     ],
     "ozet": [
      "0: facts; 1: real future; 2: unreal present; 3: unreal past.",
      "Mixed: past condition → present result.",
      "wish + past (present), + past perfect (past), + would (annoyance)."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "Unit 4: Relative Clauses, Passive and Causative",
   "en": "Unit 4: Relative Clauses, Passive and Causative"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "G4.1",
    "title": {
     "tr": "Defining and non-defining relative clauses",
     "en": "Defining and non-defining relative clauses"
    },
    "content": {
     "anlatim": "# Relative Pronouns\n\n| Pronoun | For | Example |\n|---|---|---|\n| **who** | people (subject/object) | The scientist **who** discovered penicillin was Fleming. |\n| **which** | things, animals | The book **which** I borrowed is great. |\n| **that** | people/things (**defining only**) | The phone **that** I bought is broken. |\n| **whose** | possession | The girl **whose** bike was stolen called the police. |\n| **whom** | people (object, formal) | The man **to whom** I spoke was polite. |\n| **where / when / why** | place / time / reason | The town **where** I was born… |\n\n# Defining vs Non-defining\n\n| Defining | Non-defining |\n|---|---|\n| Essential information | **Extra** information |\n| **No commas** | **Commas** |\n| *that* can be used; object pronoun can be omitted | **No *that***; pronoun **cannot** be omitted |\n| *Students **who** study regularly succeed.* | *My brother, **who** lives in Bursa, is a doctor.* |\n\n**Reduced relative clauses:** *The man **sitting** next to me* (= who was sitting) · *The bridge **built** in 1973* (= which was built).\n**Which** referring to a whole clause: *He passed the exam, **which** surprised everyone.*",
     "ornekler": [
      {
       "soru": "Combine with a non-defining clause: \"Göbeklitepe is about 12,000 years old. It is in Şanlıurfa.\"",
       "cozum": "Göbeklitepe, **which** is in Şanlıurfa, is about 12,000 years old."
      }
     ],
     "ozet": [
      "who/which/that/whose/where.",
      "Non-defining: commas, no *that*.",
      "Reduced clauses: V-ing (active), V3 (passive)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "G4.2",
    "title": {
     "tr": "Passive voice (all tenses) and causatives",
     "en": "Passive voice and causatives"
    },
    "content": {
     "anlatim": "# Passive Voice: be + V3\n\n| Tense | Active | Passive |\n|---|---|---|\n| Simple Present | They **build** houses. | Houses **are built**. |\n| Present Continuous | They **are building** a bridge. | A bridge **is being built**. |\n| Present Perfect | They **have built** a school. | A school **has been built**. |\n| Simple Past | They **built** the mosque in 1575. | The mosque **was built** in 1575. |\n| Past Continuous | They **were repairing** the road. | The road **was being repaired**. |\n| Past Perfect | They **had sold** the tickets. | The tickets **had been sold**. |\n| Future | They **will open** the museum. | The museum **will be opened**. |\n| Modals | You **must wear** a mask. | A mask **must be worn**. |\n\n- Use passive when the **action** is more important than the doer, or the doer is unknown: *My wallet **was stolen**.*\n- Agent with **by**: *Hamlet **was written by** Shakespeare.*\n- **Impersonal passive:** *It **is said** that… / He **is believed to** be…*\n\n# Causatives (have / get something done)\n\n| Structure | Meaning | Example |\n|---|---|---|\n| **have + object + V3** | Someone does it for you | I **had my hair cut**. |\n| **get + object + V3** | Same (more informal) | She **got her car repaired**. |\n| **have + person + V1** | Ask someone to do | I **had the mechanic check** the brakes. |\n| **get + person + to V1** | Persuade someone | I **got my brother to help** me. |\n| **make + person + V1** | Force | The teacher **made us rewrite** the essay. |\n| **let + person + V1** | Allow | My parents **let me go** to the concert. |",
     "ornekler": [
      {
       "soru": "Make passive: \"Engineers are testing the new metro line.\"",
       "cozum": "The new metro line **is being tested** (by engineers)."
      },
      {
       "soru": "Causative: \"A technician repaired my laptop.\" (I…)",
       "cozum": "I **had/got my laptop repaired** (by a technician)."
      }
     ],
     "ozet": [
      "Passive: be + V3 in every tense.",
      "It is said that… / He is believed to…",
      "Causative: have/get something done; make/let + V1."
     ]
    }
   }
  ]
 },
 {
  "id": "u5",
  "name": {
   "tr": "Unit 5: Reported Speech, Gerunds & Infinitives, Inversion",
   "en": "Unit 5: Reported Speech, Gerunds & Infinitives, Inversion"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "G5.1",
    "title": {
     "tr": "Reported speech: statements, questions, commands",
     "en": "Reported speech"
    },
    "content": {
     "anlatim": "# Tense Backshift (when the reporting verb is past)\n\n| Direct | Reported |\n|---|---|\n| Present Simple | Past Simple |\n| Present Continuous | Past Continuous |\n| Present Perfect / Past Simple | **Past Perfect** |\n| will | would |\n| can / may / must | could / might / had to |\n\n**Time & place changes:** now → then · today → that day · tomorrow → the next day · yesterday → the day before · here → there · this → that · ago → before.\n\n# Statements\n\n*\"I **am** tired,\" she said.* → She said (that) she **was** tired.\n\n# Questions (no question word order!)\n\n- Yes/No: *\"Do you like jazz?\"* → He asked **if/whether** I **liked** jazz.\n- Wh-: *\"Where **do you live**?\"* → She asked me where **I lived**.\n\n# Commands & Requests\n\n*\"Close the door.\"* → He **told me to close** the door. · *\"Don't be late.\"* → She **told us not to be** late.\n\n# Reporting Verbs\n\n*advise, suggest, warn, promise, refuse, admit, deny, apologise, offer, remind, insist*\n- *suggest + V-ing / that…should*: He **suggested going** to the museum.\n- *deny + V-ing*: She **denied breaking** the vase.\n- *promise / refuse / offer + to V1*: He **promised to call**.",
     "ornekler": [
      {
       "soru": "Report: \"Have you finished your homework?\" the teacher asked me.",
       "cozum": "The teacher asked me **if/whether I had finished** my homework."
      },
      {
       "soru": "Report: \"Don't touch the painting,\" the guide said to us.",
       "cozum": "The guide **told us not to touch** the painting."
      }
     ],
     "ozet": [
      "Backshift tenses; change time words.",
      "Questions: if/whether, statement word order.",
      "Commands: tell/ask + (not) to V1; reporting verbs."
     ]
    }
   },
   {
    "id": "k2",
    "code": "G5.2",
    "title": {
     "tr": "Gerunds and infinitives; inversion and emphasis",
     "en": "Gerunds, infinitives and inversion"
    },
    "content": {
     "anlatim": "# Gerund (V-ing)\n\n- As **subject**: ***Swimming** is good for your health.*\n- After **prepositions**: *She is good **at drawing**. I'm interested **in learning** Korean.*\n- After verbs: *enjoy, avoid, mind, finish, keep, consider, suggest, deny, admit, miss, practise, can't stand, look forward to, be used to*.\n\n# Infinitive (to + V1)\n\n- **Purpose**: *I went to the library **to study**.*\n- After verbs: *want, decide, hope, plan, refuse, promise, agree, manage, afford, learn, offer, seem, would like*.\n- After adjectives: *It's difficult **to understand**.* · *too/enough*: *He's too young **to drive**.*\n\n# Bare Infinitive (V1)\n\nAfter modals, *make, let*, *had better, would rather*: *You'd better **leave** now.*\n\n# Meaning Changes\n\n| Verb | + V-ing | + to V1 |\n|---|---|---|\n| **remember / forget** | memory of a past action | not forget a duty |\n| **stop** | quit the action | stop in order to do something else |\n| **try** | experiment | make an effort |\n| **regret** | sorry about the past | sorry to announce |\n\n*I **stopped smoking**.* (quit) vs *I **stopped to smoke**.* (paused in order to smoke)\n\n# Inversion for Emphasis (formal)\n\nAfter negative/limiting adverbials, use **question word order**:\n- ***Never have I seen** such a beautiful view.*\n- ***Not only did** she win, **but** she **also** broke the record.*\n- ***Hardly had** I arrived **when** it started raining.* / ***No sooner had** … **than** …*\n- ***Only after** the exam **did** I relax.* · ***Little did** he know…*",
     "ornekler": [
      {
       "soru": "Choose: \"Please remember (to lock / locking) the door when you leave.\"",
       "cozum": "**to lock** — a duty to do in the future."
      },
      {
       "soru": "Rewrite with inversion: \"I had never heard such a strange story.\"",
       "cozum": "**Never had I heard** such a strange story."
      }
     ],
     "ozet": [
      "Gerund after prepositions and enjoy/avoid/mind…",
      "Infinitive for purpose and after want/decide/hope…",
      "remember/stop/try change meaning; inversion after negative adverbs."
     ]
    }
   }
  ]
 },
 {
  "id": "u6",
  "name": {
   "tr": "Unit 6: Skills Strategies",
   "en": "Unit 6: Skills Strategies"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "S6.1",
    "title": {
     "tr": "Reading, listening, writing and speaking strategies",
     "en": "Reading, listening, writing and speaking strategies"
    },
    "content": {
     "anlatim": "# Reading\n\n| Strategy | How |\n|---|---|\n| **Skimming** | Read quickly for the **main idea** (title, first/last sentences of paragraphs) |\n| **Scanning** | Search for **specific information** (names, numbers, dates) |\n| **Inference** | Understand what is **implied**, not stated |\n| **Main idea vs supporting details** | Topic sentence → examples, reasons, facts |\n| **Guessing meaning from context** | Use surrounding words, prefixes/suffixes |\n\n# Listening\n\n**Gist** (general idea) → **specific information** → **note-taking** (key words, abbreviations, symbols). Predict content from the task before listening.\n\n# Writing\n\n| Text type | Key features |\n|---|---|\n| **Opinion paragraph / essay** | Clear thesis → reasons with examples → conclusion. Linkers: *firstly, moreover, however, on the other hand, in conclusion* |\n| **Formal letter / e-mail** | *Dear Sir/Madam* … *Yours faithfully*; formal language, no contractions |\n| **Informal letter / e-mail** | *Hi …* … *Best wishes*; contractions, friendly tone |\n| **Report** | Headings, factual, passive voice, recommendations |\n| **Story** | Past tenses, time linkers (*suddenly, eventually*), descriptive adjectives |\n\n**Process:** plan → draft → revise (content, organisation) → edit (grammar, spelling).\n\n# Speaking\n\n- **Discussion & debate:** *In my opinion…, I see your point, but…, I couldn't agree more, That's not entirely true…*\n- **Presentation:** introduction (*Today I'm going to talk about…*), signposting (*Firstly…, Moving on to…*), conclusion (*To sum up…*).\n- **Role-play:** functions — asking for/giving advice, complaining, making suggestions, agreeing/disagreeing.\n\n# Study Tips\n\n1. Keep a **vocabulary notebook** (word families, collocations, example sentences).\n2. Practise each grammar box with **your own sentences**.\n3. Read with a strategy; write–check–rewrite.\n4. Prepare speaking notes; record yourself.\n5. Reinforce with workbook exercises and practice tests.",
     "ornekler": [
      {
       "soru": "Which reading strategy would you use to find the year a museum opened in a long article?",
       "cozum": "**Scanning** — searching quickly for specific information (a date) without reading every sentence."
      }
     ],
     "ozet": [
      "Skimming = main idea; scanning = specific info; inference = implied meaning.",
      "Essay: thesis → reasons → conclusion with linkers.",
      "Formal vs informal letters; presentation signposting."
     ]
    }
   }
  ]
 }
];
