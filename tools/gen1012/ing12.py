# -*- coding: utf-8 -*-
"""12. Sınıf İngilizce notları (dil bilgisi + beceri stratejileri) → js/data/content/ing-12.js"""
from _c import O, U, write
from ing12_tema import TEMALAR

units = [
U("u1", "Dil Bilgisi Tekrarı 1: Tenses Review", "Grammar Review 1: Tenses Review", [
O("k1", "G1.1", "Present ve past zamanlar (tüm görünümler)", "Present and past tenses (all aspects)", r"""
# Present Tenses
| Tense | Form | Use | Example |
|---|---|---|---|
| **Simple Present** | V1 / V1-s | Habits, facts, timetables | Water **boils** at 100 °C. |
| **Present Continuous** | am/is/are + V-ing | Now, temporary, fixed future plans | I **am meeting** Ayşe tomorrow. |
| **Present Perfect** | have/has + V3 | Experience, result now, unfinished time | She **has** already **finished** her project. |
| **Present Perfect Continuous** | have/has been + V-ing | Duration up to now | They **have been waiting** for two hours. |

# Past Tenses
| Tense | Form | Use | Example |
|---|---|---|---|
| **Simple Past** | V2 | Finished action at a definite time | We **visited** Efes last summer. |
| **Past Continuous** | was/were + V-ing | In progress at a past moment; background | It **was raining** when I **left**. |
| **Past Perfect** | had + V3 | Earlier of two past actions | The film **had started** before we **arrived**. |
| **Past Perfect Continuous** | had been + V-ing | Duration before a past point | He was tired because he **had been running**. |
| **used to / would** | used to + V1 | Past habits/states (would: only actions) | I **used to** live in Konya. |

**Signal words:** *already, yet, just, ever, never, since, for* (Present Perfect) · *ago, last, in 2019, yesterday* (Simple Past) · *by the time, before, after, when* (Past Perfect).
""",
  [("Choose: \"I (have lived / lived) in İzmir since 2018.\"", "**have lived** — *since* shows an action continuing up to now (Present Perfect)."),
   ("Fill in: \"When I got to the station, the train ___ (already / leave).\"", "**had already left** — the earlier past action (Past Perfect).")],
  ["Present Perfect: past action, present relevance; since/for.", "Past Perfect: the earlier of two past actions.", "used to: past habits no longer true."]),
O("k2", "G1.2", "Future forms", "Future forms", r"""
# Future Forms
| Form | Use | Example |
|---|---|---|
| **will + V1** | Predictions (opinion), instant decisions, promises, offers | I think robots **will** do most jobs. / I'**ll** help you. |
| **be going to + V1** | Plans/intentions; predictions with present evidence | I'**m going to** study medicine. / Look at the sky — it'**s going to** rain. |
| **Present Continuous** | Fixed arrangements | We'**re flying** to Baku on Monday. |
| **Simple Present** | Timetables | The exam **starts** at 9:30. |
| **Future Continuous** (will be + V-ing) | In progress at a future time | This time tomorrow I'**ll be taking** the exam. |
| **Future Perfect** (will have + V3) | Completed before a future time | By 2030, scientists **will have found** a cure. |

**Time clauses:** After *when, as soon as, before, after, until, by the time* we use a **present** tense, not *will*:
*I'll call you **when** I **arrive**.* (✘ when I will arrive)
""",
  [("Complete: \"By the end of June, we ___ (finish) all the units.\"", "**will have finished** — completed before a future time (Future Perfect).")],
  ["will: prediction, decision, promise.", "going to: plan, evidence-based prediction.", "Future Perfect: will have + V3 (by…)."]),
]),
U("u2", "Dil Bilgisi Tekrarı 2: Modals", "Grammar Review 2: Modals", [
O("k1", "G2.1", "Modals and semi-modals: obligation, ability, possibility, advice, deduction", "Modals and semi-modals", r"""
# Functions of Modals
| Function | Present / future | Past |
|---|---|---|
| **Obligation** | must, have to, need to | had to |
| **No obligation** | don't have to, needn't | didn't have to / **needn't have + V3** (did it unnecessarily) |
| **Prohibition** | mustn't, can't | couldn't, wasn't allowed to |
| **Ability** | can, be able to | could, was able to (a specific success) |
| **Advice** | should, ought to, had better | **should have + V3** (criticism / regret) |
| **Possibility** | may, might, could | **may/might/could have + V3** |
| **Certainty (deduction)** | **must** (sure: yes), **can't** (sure: no) | **must have + V3**, **can't/couldn't have + V3** |
| **Permission / request** | can, could, may | — |

# Perfect Modals (past deductions and regrets)
- *The ground is wet. It **must have rained** last night.* (strong positive deduction)
- *She **can't have seen** us; she was in Ankara.* (impossible)
- *You **should have studied** harder.* (criticism — you didn't)
- *I **needn't have taken** an umbrella; it didn't rain.* (did it, but unnecessary)
- *He **might have missed** the bus.* (possibility)
""",
  [("Rewrite with a perfect modal: \"I'm sure he forgot the meeting.\"", "He **must have forgotten** the meeting."),
   ("What's the difference? \"You didn't need to buy bread.\" vs \"You needn't have bought bread.\"", "**didn't need to**: it wasn't necessary (we don't know if you bought it). **needn't have bought**: you **did buy** it, but it was unnecessary.")],
  ["must/can't for present deduction; must have/can't have for past.", "should have + V3 = criticism of the past.", "needn't have + V3 = did something unnecessary."]),
]),
U("u3", "Dil Bilgisi Tekrarı 3: Conditionals and Wishes", "Grammar Review 3: Conditionals and Wishes", [
O("k1", "G3.1", "Zero, first, second, third and mixed conditionals; wish / if only", "Conditionals; wish clauses", r"""
# Conditionals
| Type | If-clause | Main clause | Use | Example |
|---|---|---|---|---|
| **Zero** | Present | Present | General truths | If you **heat** ice, it **melts**. |
| **First** | Present | will + V1 | Real/likely future | If it **rains**, we **will stay** in. |
| **Second** | Past (were) | would + V1 | Unreal present / unlikely future | If I **were** you, I **would apologise**. |
| **Third** | Past Perfect | would have + V3 | Unreal past (regret) | If she **had studied**, she **would have passed**. |
| **Mixed** | Past Perfect | would + V1 | Past cause → present result | If I **had taken** the job, I **would be** rich now. |

**Alternatives to *if*:** *unless* (= if not), *provided/providing that, as long as, in case, otherwise, suppose*.
**Inversion (formal):** *Had I known* = If I had known · *Were I you* = If I were you · *Should you need help* = If you need help.

# Wish / If only
| Wish about | Form | Example |
|---|---|---|
| **Present** (unreal) | wish + **Past Simple** | I **wish** I **had** more free time. |
| **Past** (regret) | wish + **Past Perfect** | I **wish** I **had listened** to my teacher. |
| **Annoying behaviour / future change** | wish + **would** | I **wish** you **would stop** talking. |
| **Ability** | wish + **could** | I **wish** I **could** speak Japanese. |

*If only* is a stronger form of *wish*: *If only I hadn't lost my phone!*
""",
  [("Combine using a third conditional: \"He didn't set an alarm. He missed the exam.\"", "If he **had set** an alarm, he **wouldn't have missed** the exam."),
   ("Express regret: \"I didn't save any money last year.\"", "I **wish I had saved** some money last year.")],
  ["0: facts; 1: real future; 2: unreal present; 3: unreal past.", "Mixed: past condition → present result.", "wish + past (present), + past perfect (past), + would (annoyance)."]),
]),
U("u4", "Dil Bilgisi Tekrarı 4: Relative Clauses, Passive and Causative", "Grammar Review 4: Relative Clauses, Passive and Causative", [
O("k1", "G4.1", "Defining and non-defining relative clauses", "Defining and non-defining relative clauses", r"""
# Relative Pronouns
| Pronoun | For | Example |
|---|---|---|
| **who** | people (subject/object) | The scientist **who** discovered penicillin was Fleming. |
| **which** | things, animals | The book **which** I borrowed is great. |
| **that** | people/things (**defining only**) | The phone **that** I bought is broken. |
| **whose** | possession | The girl **whose** bike was stolen called the police. |
| **whom** | people (object, formal) | The man **to whom** I spoke was polite. |
| **where / when / why** | place / time / reason | The town **where** I was born… |

# Defining vs Non-defining
| Defining | Non-defining |
|---|---|
| Essential information | **Extra** information |
| **No commas** | **Commas** |
| *that* can be used; object pronoun can be omitted | **No *that***; pronoun **cannot** be omitted |
| *Students **who** study regularly succeed.* | *My brother, **who** lives in Bursa, is a doctor.* |

**Reduced relative clauses:** *The man **sitting** next to me* (= who was sitting) · *The bridge **built** in 1973* (= which was built).
**Which** referring to a whole clause: *He passed the exam, **which** surprised everyone.*
""",
  [("Combine with a non-defining clause: \"Göbeklitepe is about 12,000 years old. It is in Şanlıurfa.\"", "Göbeklitepe, **which** is in Şanlıurfa, is about 12,000 years old.")],
  ["who/which/that/whose/where.", "Non-defining: commas, no *that*.", "Reduced clauses: V-ing (active), V3 (passive)."]),
O("k2", "G4.2", "Passive voice (all tenses) and causatives", "Passive voice and causatives", r"""
# Passive Voice: be + V3
| Tense | Active | Passive |
|---|---|---|
| Simple Present | They **build** houses. | Houses **are built**. |
| Present Continuous | They **are building** a bridge. | A bridge **is being built**. |
| Present Perfect | They **have built** a school. | A school **has been built**. |
| Simple Past | They **built** the mosque in 1575. | The mosque **was built** in 1575. |
| Past Continuous | They **were repairing** the road. | The road **was being repaired**. |
| Past Perfect | They **had sold** the tickets. | The tickets **had been sold**. |
| Future | They **will open** the museum. | The museum **will be opened**. |
| Modals | You **must wear** a mask. | A mask **must be worn**. |

- Use passive when the **action** is more important than the doer, or the doer is unknown: *My wallet **was stolen**.*
- Agent with **by**: *Hamlet **was written by** Shakespeare.*
- **Impersonal passive:** *It **is said** that… / He **is believed to** be…*

# Causatives (have / get something done)
| Structure | Meaning | Example |
|---|---|---|
| **have + object + V3** | Someone does it for you | I **had my hair cut**. |
| **get + object + V3** | Same (more informal) | She **got her car repaired**. |
| **have + person + V1** | Ask someone to do | I **had the mechanic check** the brakes. |
| **get + person + to V1** | Persuade someone | I **got my brother to help** me. |
| **make + person + V1** | Force | The teacher **made us rewrite** the essay. |
| **let + person + V1** | Allow | My parents **let me go** to the concert. |
""",
  [("Make passive: \"Engineers are testing the new metro line.\"", "The new metro line **is being tested** (by engineers)."),
   ("Causative: \"A technician repaired my laptop.\" (I…)", "I **had/got my laptop repaired** (by a technician).")],
  ["Passive: be + V3 in every tense.", "It is said that… / He is believed to…", "Causative: have/get something done; make/let + V1."]),
]),
U("u5", "Dil Bilgisi Tekrarı 5: Reported Speech, Gerunds & Infinitives, Inversion", "Grammar Review 5: Reported Speech, Gerunds & Infinitives, Inversion", [
O("k1", "G5.1", "Reported speech: statements, questions, commands", "Reported speech", r"""
# Tense Backshift (when the reporting verb is past)
| Direct | Reported |
|---|---|
| Present Simple | Past Simple |
| Present Continuous | Past Continuous |
| Present Perfect / Past Simple | **Past Perfect** |
| will | would |
| can / may / must | could / might / had to |

**Time & place changes:** now → then · today → that day · tomorrow → the next day · yesterday → the day before · here → there · this → that · ago → before.

# Statements
*"I **am** tired," she said.* → She said (that) she **was** tired.

# Questions (no question word order!)
- Yes/No: *"Do you like jazz?"* → He asked **if/whether** I **liked** jazz.
- Wh-: *"Where **do you live**?"* → She asked me where **I lived**.

# Commands & Requests
*"Close the door."* → He **told me to close** the door. · *"Don't be late."* → She **told us not to be** late.

# Reporting Verbs
*advise, suggest, warn, promise, refuse, admit, deny, apologise, offer, remind, insist*
- *suggest + V-ing / that…should*: He **suggested going** to the museum.
- *deny + V-ing*: She **denied breaking** the vase.
- *promise / refuse / offer + to V1*: He **promised to call**.
""",
  [("Report: \"Have you finished your homework?\" the teacher asked me.", "The teacher asked me **if/whether I had finished** my homework."),
   ("Report: \"Don't touch the painting,\" the guide said to us.", "The guide **told us not to touch** the painting.")],
  ["Backshift tenses; change time words.", "Questions: if/whether, statement word order.", "Commands: tell/ask + (not) to V1; reporting verbs."]),
O("k2", "G5.2", "Gerunds and infinitives; inversion and emphasis", "Gerunds, infinitives and inversion", r"""
# Gerund (V-ing)
- As **subject**: ***Swimming** is good for your health.*
- After **prepositions**: *She is good **at drawing**. I'm interested **in learning** Korean.*
- After verbs: *enjoy, avoid, mind, finish, keep, consider, suggest, deny, admit, miss, practise, can't stand, look forward to, be used to*.

# Infinitive (to + V1)
- **Purpose**: *I went to the library **to study**.*
- After verbs: *want, decide, hope, plan, refuse, promise, agree, manage, afford, learn, offer, seem, would like*.
- After adjectives: *It's difficult **to understand**.* · *too/enough*: *He's too young **to drive**.*

# Bare Infinitive (V1)
After modals, *make, let*, *had better, would rather*: *You'd better **leave** now.*

# Meaning Changes
| Verb | + V-ing | + to V1 |
|---|---|---|
| **remember / forget** | memory of a past action | not forget a duty |
| **stop** | quit the action | stop in order to do something else |
| **try** | experiment | make an effort |
| **regret** | sorry about the past | sorry to announce |

*I **stopped smoking**.* (quit) vs *I **stopped to smoke**.* (paused in order to smoke)

# Inversion for Emphasis (formal)
After negative/limiting adverbials, use **question word order**:
- ***Never have I seen** such a beautiful view.*
- ***Not only did** she win, **but** she **also** broke the record.*
- ***Hardly had** I arrived **when** it started raining.* / ***No sooner had** … **than** …*
- ***Only after** the exam **did** I relax.* · ***Little did** he know…*
""",
  [("Choose: \"Please remember (to lock / locking) the door when you leave.\"", "**to lock** — a duty to do in the future."),
   ("Rewrite with inversion: \"I had never heard such a strange story.\"", "**Never had I heard** such a strange story.")],
  ["Gerund after prepositions and enjoy/avoid/mind…", "Infinitive for purpose and after want/decide/hope…", "remember/stop/try change meaning; inversion after negative adverbs."]),
]),
U("u6", "Dil Bilgisi Tekrarı 6: Skills Strategies", "Grammar Review 6: Skills Strategies", [
O("k1", "S6.1", "Reading, listening, writing and speaking strategies", "Reading, listening, writing and speaking strategies", r"""
# Reading
| Strategy | How |
|---|---|
| **Skimming** | Read quickly for the **main idea** (title, first/last sentences of paragraphs) |
| **Scanning** | Search for **specific information** (names, numbers, dates) |
| **Inference** | Understand what is **implied**, not stated |
| **Main idea vs supporting details** | Topic sentence → examples, reasons, facts |
| **Guessing meaning from context** | Use surrounding words, prefixes/suffixes |

# Listening
**Gist** (general idea) → **specific information** → **note-taking** (key words, abbreviations, symbols). Predict content from the task before listening.

# Writing
| Text type | Key features |
|---|---|
| **Opinion paragraph / essay** | Clear thesis → reasons with examples → conclusion. Linkers: *firstly, moreover, however, on the other hand, in conclusion* |
| **Formal letter / e-mail** | *Dear Sir/Madam* … *Yours faithfully*; formal language, no contractions |
| **Informal letter / e-mail** | *Hi …* … *Best wishes*; contractions, friendly tone |
| **Report** | Headings, factual, passive voice, recommendations |
| **Story** | Past tenses, time linkers (*suddenly, eventually*), descriptive adjectives |

**Process:** plan → draft → revise (content, organisation) → edit (grammar, spelling).

# Speaking
- **Discussion & debate:** *In my opinion…, I see your point, but…, I couldn't agree more, That's not entirely true…*
- **Presentation:** introduction (*Today I'm going to talk about…*), signposting (*Firstly…, Moving on to…*), conclusion (*To sum up…*).
- **Role-play:** functions — asking for/giving advice, complaining, making suggestions, agreeing/disagreeing.

# Study Tips
1. Keep a **vocabulary notebook** (word families, collocations, example sentences).
2. Practise each grammar box with **your own sentences**.
3. Read with a strategy; write–check–rewrite.
4. Prepare speaking notes; record yourself.
5. Reinforce with workbook exercises and practice tests.
""",
  [("Which reading strategy would you use to find the year a museum opened in a long article?", "**Scanning** — searching quickly for specific information (a date) without reading every sentence.")],
  ["Skimming = main idea; scanning = specific info; inference = implied meaning.", "Essay: thesis → reasons → conclusion with linkers.", "Formal vs informal letters; presentation signposting."]),
]),
]


# MEB tema üniteleri (Theme 1–9) önce, dil bilgisi tekrar üniteleri sonra.
units = TEMALAR + units

write("ing-12.js", "12/ingilizce", "12. Sınıf İngilizce — tema üniteleri, dil bilgisi ve beceri notları",
      "kullanıcının verdiği \"İngilizce 12 Detaylı Konu Anlatım Notları\" (dil bilgisi, beceriler) ve ek not paketi (Theme 1, 2, 4, 5, 6, 7, 8, 9 kazanımları, dil bilgisi özetleri, kelime çalışmaları).",
      units, "Tema üniteleri (t1–t9) ek not paketindeki kazanım kodları, işlevler ve kelimelere göre yazıldı; Theme 3 (Human Rights) ve Theme 10 (Manners) için not verilmediğinden eklenmedi. Dil bilgisi tekrar üniteleri (u1–u6) ilk notlardan gelir; kimlikleri öğrenci verisini korumak için değiştirilmedi.")
