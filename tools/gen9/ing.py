# -*- coding: utf-8 -*-
"""9. Sınıf İngilizce (WAYMARK Year 9 / B1.1) Konu Anlatım Notları → js/data/content/ing-9.js"""
from common import O, U, write


def skills(lines):
    return "\n".join("- " + l for l in lines)


units = []

# ---------------------------------------------------------------- THEME 1
units.append(U("u1", "Theme 1: School Life", "Theme 1: School Life", [
O("k1", "T1.1",
  "Can (yetenek, olasılık, fırsat) ve to be ile tanıtım",
  "Can (ability, possibility, opportunity) and 'to be' for introductions",
  r"""
# Alt temalar
Ülkeler (countries) · milliyetler (nationalities) · diller (languages) · başkentler (capitals) · turistik yerler ve aktiviteler · millî günler ve kutlamalar

# İletişim fonksiyonları
- Kendi ülkesini, milliyetini ve dilini **şimdiki zamanda tanıtma**
- **Olasılık ve fırsat** ifade etme
- **Dil yeteneğini** tanımlama

# Grammar A — *can*
*Can* üç temel işlevde kullanılır; ardından fiilin **yalın hâli (V1)** gelir ve tüm öznelerle aynı kalır (*he cans* ❌).

| İşlev | Örnek |
|---|---|
| **Ability** (yetenek) | I **can speak** Turkish, English and German. |
| **Possibility** (olasılık) | The museum **can be** closed today. |
| **Opportunity** (fırsat) | You **can visit** the Maiden Tower in İstanbul. |

| Yapı | Örnek |
|---|---|
| (+) | She **can speak** Japanese. |
| (−) | He **cannot / can't play** the piano. |
| (?) | **Can** you **speak** Azerbaijani? — Yes, I **can**. / No, I **can't**. |

# Grammar B — *to be* (am / is / are)
| Özne | to be | Örnek |
|---|---|---|
| I | **am** | I **am** from Türkiye. |
| He / She / It | **is** | She **is** Turkish. · The capital of Japan **is** Tokyo. |
| You / We / They | **are** | They **are** Polish. |

### Ülke → milliyet / dil
| Country | Nationality / Language |
|---|---|
| Azerbaijan | Azerbaijani |
| Poland | Polish |
| Hungary | Hungarian |
| Bulgaria | Bulgarian |
| Norway | Norwegian |
| South Korea | Korean |
| Chile / Peru | Chilean / Peruvian |
| Kazakhstan / Uzbekistan | Kazakh / Uzbek |
""",
  [("Boşluğu doldurun: \"___ you speak Hungarian?\" — \"No, I ___ . But I ___ speak Polish.\"",
    "**Can** you speak Hungarian? — No, I **can't**. But I **can** speak Polish."),
   ("\"You can take a fjord cruise in Norway.\" cümlesinde *can* hangi işlevdedir?",
    "**Opportunity (fırsat)** — Norveç'te yapılabilecek bir etkinlik öneriliyor."),
   ("Hatayı düzeltin: \"She cans speaks Korean.\"",
    "*Can* tüm öznelerle aynı kalır ve ardından **V1** gelir → **She can speak Korean.**")],
  ["can + V1: ability / possibility / opportunity.",
   "Olumsuz: cannot / can't · Soru: Can + özne + V1?",
   "to be: I am · he/she/it is · you/we/they are.",
   "Ülke ↔ milliyet: Poland–Polish, Norway–Norwegian, Hungary–Hungarian."]),

O("k2", "T1.2",
  "Kelime, telaffuz, sosyal dil ve beceriler (Theme 1)",
  "Vocabulary, pronunciation, social language and skills (Theme 1)",
  r"""
# Vocabulary
- **Countries:** Azerbaijan, Poland, Hungary, Bulgaria, Norway, South Korea, Chile, Peru, Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan, Thailand…
- **Tourist attractions:** castle, palace, museum, tower, ancient ruin, historical site, tourist attraction, monument, Old Town, thermal baths, rock art, fjord cruise…
- **Activities:** go sightseeing, take a trip, stroll through, explore, visit, hike around a lake…

# Pronunciation
- **"a" sesleri (uzun-kısa ünlüler):** /æ/ (travel, capital) · /eɪ/ (famous) · /ə/ (adventure, Bulgaria) · /ɑː/ (start) · /ɔː/ (warm) · /eə/ (parent)
- **Ünsüzler:** b → /b/ ya da **silent b** (climb, doubt) · c → /s/ (city) veya /k/ (capital) · d → /d/

# Social language
- Hello! / Hi! / Hi there!
- **Let me introduce myself.**
- **This is** Yasemin **from** Türkiye.
- Wow! This palace/tower is excellent/great!
- I like it here/there!
- Let's grab our trays! · Chat about…!

# Skills
""" + skills([
    "**Listening/Watching:** anahtar kelimeleri tanıma, çıkarım yapma, ayrıntı dinleme, soru sorma-cevaplama",
    "**Reading:** skimming (genel fikir için hızlı okuma), scanning (belirli bilgiyi arama), jigsaw reading",
    "**Speaking:** anlamlı ve doğru içerik üretme, ön bilgileri kullanma",
    "**Writing:** ülke tanıtım metni → **topic sentence + supporting details + conclusion**",
    "**CLIL & Culture (Roots & Routes):** Türkiye'deki siber güvenlik meslek eğitimi",
    "**E-Portfolio:** Türkiye'yi tanıtan self-recording / video",
]),
  [("Skimming ile scanning arasındaki fark nedir?",
    "**Skimming:** metnin **genel fikrini** anlamak için hızlıca göz gezdirmek. **Scanning:** metinde **belirli bir bilgiyi** (tarih, isim, sayı) aramak."),
   ("Bir ülke tanıtım paragrafının üç bölümü nedir?",
    "**Topic sentence** (ana fikir cümlesi) + **supporting details** (destekleyici ayrıntılar: başkent, dil, turistik yerler) + **conclusion** (sonuç cümlesi).")],
  ["Tourist attractions: castle, palace, museum, ancient ruin, monument…",
   "Activities: go sightseeing, stroll through, explore, hike around a lake.",
   "Silent b: climb, doubt · c: /s/ city, /k/ capital.",
   "Let me introduce myself. / This is … from …"]),
]))

# ---------------------------------------------------------------- THEME 2
units.append(U("u2", "Theme 2: Classroom Life", "Theme 2: Classroom Life", [
O("k1", "T2.1",
  "Simple Present Tense: rutinler ve alışkanlıklar",
  "Simple Present Tense: routines and habits",
  r"""
# Alt temalar
Sınıf arkadaşları · arkadaşlıklar · günlük ve ders rutinleri, alışkanlıklar ve aktiviteler

# Simple Present — kullanım
| Kullanım | Örnek |
|---|---|
| **Habits** (alışkanlıklar) | I always **make** my bed. |
| **Routines** (rutinler) | She **wakes up** at 7 a.m. every day. |
| **General truths / facts** | School **starts** at 8 o'clock. |

# Yapı
| | I / You / We / They | He / She / It |
|---|---|---|
| (+) | I **play** | She **plays** (V1 + **-s/-es**) |
| (−) | I **don't play** | She **doesn't play** |
| (?) | **Do** you **play**? | **Does** she **play**? |

### -s / -es / -ies kuralı
- Çoğu fiil: work → work**s**
- -s, -sh, -ch, -x, -o ile bitenler: watch → watch**es**, go → go**es**
- Ünsüz + y: study → stud**ies** (ünlü + y: play → play**s**)
- **doesn't / does** kullanıldığında fiil yalın kalır: She doesn't **play**s ❌ → She doesn't **play** ✅

# Time expressions
every day · often · always · usually · sometimes · rarely · never · at weekends · on weekdays · twice a week · in the mornings

**Sıklık zarflarının yeri:** asıl fiilden **önce**, *to be*'den **sonra** → *She **usually** walks to school.* / *He **is always** late.*

# Adverbs of manner (tarz zarfları)
carefully · slowly · quickly · neatly → genellikle fiil/nesneden sonra: *She writes **neatly**.*
""",
  [("Doğru biçimi yazın: \"My brother (study) ___ every evening, but he (not / watch) ___ TV.\"",
    "My brother **studies** every evening, but he **doesn't watch** TV."),
   ("Sıklık zarfını doğru yere koyun: \"Jacob takes the bus to school. (usually)\"",
    "Jacob **usually takes** the bus to school. (Sıklık zarfı asıl fiilden önce gelir.)"),
   ("Soru cümlesine çevirin: \"Akio has breakfast at 6:30.\"",
    "**Does** Akio **have** breakfast at 6:30? (*does* ile fiil yalın: has → have)")],
  ["Simple Present: habits, routines, facts.",
   "He/She/It → V1 + -s/-es/-ies.",
   "don't/doesn't + V1 · Do/Does + özne + V1?",
   "Sıklık zarfı: asıl fiilden önce, to be'den sonra.",
   "Adverbs of manner: carefully, slowly, quickly, neatly."]),

O("k2", "T2.2",
  "Kelime, telaffuz, sosyal dil ve beceriler (Theme 2)",
  "Vocabulary, pronunciation, social language and skills (Theme 2)",
  r"""
# Vocabulary
- **Daily routines:** wake up, make the bed, comb hair, get dressed, have breakfast, leave home, walk / take the bus to school, attend classes, take notes, have a break, leave school, return home, watch TV, work on tasks, go shopping, read a book, go to bed…
- **Study routines:** plan, repeat, set goals, manage time, highlight information, participate in activities…

# Pronunciation
- **e** → /e/ (bed, get) · /æ/ (relax)
- **f** → /f/ · **g** → /g/ (get) veya /dʒ/ (generally) · **h** → /h/ (home)

# Social language
| İfade | Anlamı |
|---|---|
| **Bright and early!** | Sabah erkenden! |
| **I call it a day!** | Bugünlük bu kadar! |
| **Hit the books!** | Sıkı çalışmak, kitaplara gömülmek |
| **I learn by heart!** | Ezberlerim! |
| **Work hard, play later!** | Önce çalış, sonra eğlen! |

# Skills
""" + skills([
    "**Listening:** *A Typical Day for Jacob* — ayrıntı ve genel fikir dinleme",
    "**Reading:** *Cultural Differences in Daily Routines* (Akio – Japonya, Lilja – Finlandiya) — skimming, scanning, jigsaw, karşılaştırma",
    "**Writing:** bir kişinin **hafta içi ve hafta sonu** rutinini karşılaştıran metin (*on weekdays… but at weekends…*)",
    "**CLIL:** teknoloji destekli eğitim ve çalışma rutinlerine etkisi",
    "**E-Portfolio:** kendi günlük programını kaydetme",
]),
  [("\"I've finished all my homework. I call it a day!\" ifadesi ne anlama gelir?",
    "\"Bugünlük bu kadar, işi bırakıyorum.\" — Günün çalışmasını bitirmek."),
   ("Hafta içi ve hafta sonu rutinini karşılaştıran iki cümle yazın.",
    "Örnek: *On weekdays, I wake up at 6:30 and take the bus to school. **But** at weekends, I get up late and go shopping with my family.*")],
  ["Routines: wake up, get dressed, attend classes, take notes, go to bed.",
   "Study routines: set goals, manage time, highlight information.",
   "g: /g/ get · /dʒ/ generally.",
   "Hit the books! · I call it a day! · Bright and early!"]),
]))

# ---------------------------------------------------------------- THEME 3
units.append(U("u3", "Theme 3: Personal Life", "Theme 3: Personal Life", [
O("k1", "T3.1",
  "Görünüm ve kişilik tanımlama; too & enough",
  "Describing appearance and personality; too & enough",
  r"""
# Alt temalar
Fiziksel görünüm · fiziksel özellikler · kişilik · kişisel özellikler · karakter

# Grammar A — Simple Present ile tanımlama
| Yapı | Örnek |
|---|---|
| **be + adjective** | She **is** medium-height. · He **is** well-built. |
| **have/has + adjective + noun** | She **has** blond hair. · He **has** blue eyes. |
| **look / seem / appear + adjective** | He **looks** handsome. · She **seems** cheerful. |
| **look like + noun** | He **looks like** his father. |

> Soru kalıpları: **What does she look like?** → görünüş · **What is she like?** → kişilik

# Grammar B — too & enough
| Yapı | Anlam | Örnek |
|---|---|---|
| **too + adjective** | aşırı, fazla (olumsuz sonuç) | He is **too tall** for this uniform. |
| **adjective + enough** | yeterince | She is **old enough** to drive. |
| **enough + noun** | yeterli miktarda | We have **enough time**. |
| **not + adjective + enough** | yeterince değil | He isn't **tall enough** to play basketball. |
""",
  [("Boşluğa *too* veya *enough* yazın: \"This box is ___ heavy for me. I'm not strong ___ to carry it.\"",
    "This box is **too** heavy for me. I'm not strong **enough** to carry it. (*too* sıfattan önce, *enough* sıfattan sonra.)"),
   ("\"What is your best friend like?\" sorusuna uygun cevap hangisidir: (a) She has long brown hair. (b) She is honest and outgoing.",
    "**(b)** — *What is … like?* **kişiliği** sorar. (a) şıkkı *What does she look like?* sorusunun cevabıdır."),
   ("Tek cümlede birleştirin: \"We have time. We can finish the project.\" (enough)",
    "We have **enough time** to finish the project. (*enough* isimden **önce** gelir.)")],
  ["What does he look like? → görünüş · What is he like? → kişilik.",
   "look / seem / appear + sıfat · look like + isim.",
   "too + adj (fazla) · adj + enough (yeterli) · enough + noun."]),

O("k2", "T3.2",
  "Kelime, telaffuz ve beceriler (Theme 3)",
  "Vocabulary, pronunciation and skills (Theme 3)",
  r"""
# Vocabulary
| Physical features | Personality |
|---|---|
| medium-height, plump, slim, well-built | cheerful, honest, friendly, responsible |
| blond, brunette | creative, outgoing |
| attractive, handsome | shy, moody |

- **Appearance verbs:** look (like), seem, appear

### Zıt anlamlılar
shy ↔ **outgoing** · slim ↔ **plump** · cheerful ↔ **moody**

# Pronunciation
- **i** → /iː/ (see, meet) · /ɪ/ (slim, hip) · /aɪ/ (shy, kind)
- **j** → /dʒ/ (just) · **k** → /k/ (kind) · **l** → /l/ (look)

# Skills
""" + skills([
    "**Reading:** *Charming Personalities, Soft Furs* — skimming, scanning, specific information, gist",
    "**Writing:** iki tanıdık hayvanı (veya kişiyi) karşılaştırma — *Describing & Comparing* (*Both… / …but… / …while…*)",
    "**E-Portfolio:** favori kişilerin kişilik ve fiziksel özelliklerini anlatan dijital poster",
]),
  [("\"outgoing\" kelimesinin zıt anlamlısı nedir?",
    "**shy** (utangaç). Outgoing = dışa dönük, sosyal."),
   ("İki kediyi karşılaştıran bir cümle yazın.",
    "Örnek: *Tom is **plump** and lazy, **while** Luna is **slim** and very playful. **Both** of them are friendly.*")],
  ["Physical: medium-height, plump, slim, blond, brunette, well-built.",
   "Personality: cheerful, honest, moody, responsible, creative, shy, outgoing.",
   "i: /iː/ – /ɪ/ – /aɪ/."]),
]))

# ---------------------------------------------------------------- THEME 4
units.append(U("u4", "Theme 4: Family Life", "Theme 4: Family Life", [
O("k1", "T4.1",
  "Meslekler ve iş tarifleri; prepositions of place",
  "Jobs and work descriptions; prepositions of place",
  r"""
# Alt temalar
Aile üyelerinin meslekleri · iş rutinleri · iş aktiviteleri · iş yerleri

# Grammar A — Simple Present ile meslek sorma/anlatma
| Soru | Cevap |
|---|---|
| **What does your mother do?** | She **is a** pharmacist. |
| **What does your father do?** | He **works as a** bank clerk. He **serves** customers and **checks** IDs. |
| **Where does he work?** | He works **in a** bank. |

> Meslek söylerken **a / an** kullanılır: *She is **an** accountant.* / *He is **a** nurse.*

# Grammar B — Prepositions of place
| Edat | Kullanım | Örnek |
|---|---|---|
| **in** | Kapalı alanın **içinde** | in a bank, in a hospital, in an office |
| **at** | Bir **nokta / kurum** olarak | at school, at a shopping centre, at work |
| **on** | Yüzey, geniş açık alan | on the farm, on a ship |
""",
  [("Boşlukları doldurun: \"My uncle is ___ accountant. He works ___ an office. My aunt works ___ a farm.\"",
    "My uncle is **an** accountant. He works **in** an office. My aunt works **on** a farm."),
   ("\"What does your sister do?\" sorusunun anlamı nedir ve nasıl cevaplanır?",
    "\"Kız kardeşin ne iş yapar?\" — **mesleği** sorar. Cevap: *She is a nurse. She works in a hospital.*")],
  ["What does … do? → meslek sorusu.",
   "works as a … / is a(n) …",
   "in a bank/hospital · at school/work · on the farm."]),

O("k2", "T4.2",
  "Kelime, telaffuz ve beceriler (Theme 4)",
  "Vocabulary, pronunciation and skills (Theme 4)",
  r"""
# Vocabulary
| Jobs | Workplaces | Work activities |
|---|---|---|
| bank clerk | bank | serve customers, check IDs |
| security guard | shopping centre | check bags, guard the building |
| pharmacist | pharmacy | prepare medicine |
| accountant | office | keep accounts |
| doctor / nurse | hospital | examine / take care of patients |
| teacher | school | teach students |

- **Family members:** cousin (kuzen), nephew (erkek yeğen), niece (kız yeğen), aunt (teyze/hala), uncle (amca/dayı), grandfather…

# Pronunciation
- **o** → /ɒ/ (job, doctor) · /ɔː/ (morning) · /əʊ/ (home, go)
- **m** → /m/ · **n** → /n/ (nurse) ve /ŋ/ (-ing: working) · **p** → /p/

# Skills
""" + skills([
    "**Reading:** *Divided by Routines, United by Ties* — skimming, scanning, jigsaw, karşılaştırma, çıkarım",
    "**Writing:** iki aileyi meslek, iş yeri ve aktiviteler açısından karşılaştıran metin",
    "**CLIL:** *Love Through Traditions* — Türk kültürü, gelenekleri ve değerleri",
    "**E-Portfolio:** bir aile üyesinin işini konu alan kısa film",
]),
  [("\"My sister's son is my ___. My brother's daughter is my ___.\"",
    "My sister's son is my **nephew**. My brother's daughter is my **niece**."),
   ("\"He keeps accounts and works in an office.\" Bu kişinin mesleği nedir?",
    "**Accountant** (muhasebeci).")],
  ["nephew = erkek yeğen · niece = kız yeğen · cousin = kuzen.",
   "pharmacist → pharmacy · accountant → office · bank clerk → bank.",
   "-ing sesi /ŋ/."]),
]))

# ---------------------------------------------------------------- THEME 5
units.append(U("u5", "Theme 5: Life in the House & Neighbourhood", "Theme 5: Life in the House & Neighbourhood", [
O("k1", "T5.1",
  "Present Progressive ve possessive adjectives",
  "Present Progressive and possessive adjectives",
  r"""
# Alt temalar
Ev türleri · odalar · mobilya ve ev aletleri · evdeki aktiviteler

# Grammar A — Simple Present ile ev türleri
I **live** in a villa. · She **lives** in a block of flats.

# Grammar B — Present Progressive (Present Continuous)
**Şu anda** ya da bu günlerde süren eylemler.

| Yapı | Örnek |
|---|---|
| (+) **am / is / are + V-ing** | She **is ironing** the clothes right now. · They **are relaxing** in the garden. |
| (−) **am not / isn't / aren't + V-ing** | He **isn't cooking**. |
| (?) **Am / Is / Are + özne + V-ing?** | **Is** she **cooking**? · What **are** you **doing**? |

- Zaman ifadeleri: **now, right now, at the moment, Look!, Listen!, this week**
- -ing kuralları: make → mak**ing** (sessiz -e düşer) · swim → swi**mm**ing (kısa ünlü + ünsüz → ünsüz çiftlenir) · lie → l**ying**

# Grammar C — Possessive adjectives
| Özne | Sahiplik sıfatı | Örnek |
|---|---|---|
| I | **my** | This is **my** room. |
| you | **your** | Is this **your** sofa? |
| he | **his** | **His** bedroom is small. |
| she | **her** | **Her** fridge is new. |
| it | **its** | The cat is in **its** basket. |
| we | **our** | **Our** kitchen is large. |
| they | **their** | **Their** garden is large. |

> **its** (sahiplik) ≠ **it's** (it is)
""",
  [("Doğru biçimi yazın: \"Look! Dad (clean) ___ the windows and Mum (wash) ___ the dishes.\"",
    "Look! Dad **is cleaning** the windows and Mum **is washing** the dishes."),
   ("Boşlukları doldurun: \"Ali and Elif live in a cottage. ___ house has a big garden. Elif loves ___ bedroom.\"",
    "**Their** house has a big garden. Elif loves **her** bedroom."),
   ("Hangisi doğru: \"The dog is eating it's / its food.\"",
    "**its** — sahiplik sıfatı. *it's* = *it is*.")],
  ["Present Progressive: am/is/are + V-ing (now, right now, at the moment).",
   "-ing: make → making, swim → swimming.",
   "my, your, his, her, its, our, their.",
   "its ≠ it's."]),

O("k2", "T5.2",
  "Kelime, telaffuz ve beceriler (Theme 5)",
  "Vocabulary, pronunciation and skills (Theme 5)",
  r"""
# Vocabulary
- **Types of houses:** block (of flats), villa, cottage, apartment, detached house…
- **Rooms:** living room, bedroom, bathroom, kitchen, garden, balcony…
- **Furniture & appliances:** bathtub, oven, fridge, pillow, rug, sofa, wardrobe…
- **Activities:** iron, relax, clean, cook, wash, watch TV…

| Eşya | Oda |
|---|---|
| bathtub | bathroom |
| oven, fridge | kitchen |
| pillow, wardrobe | bedroom |
| sofa, rug | living room |

# Pronunciation
- **q** → /k/ (quick: /kw/) · **r** → /r/ · **s** → /s/ · **sh** → /ʃ/ (shower, wash)

# Skills
""" + skills([
    "**Writing:** ev türleri hakkında metin üretme",
    "**CLIL:** *Zero-energy buildings* (sıfır enerjili binalar) ve doğayı koruma",
    "**E-Portfolio:** ev türleri, odalar, mobilya ve aktiviteler hakkında self-recording",
]),
  [("\"cottage\" ile \"block of flats\" arasındaki fark nedir?",
    "**Cottage:** genellikle kırsalda küçük, müstakil ev. **Block of flats:** çok daireli apartman binası.")],
  ["Houses: block of flats, villa, cottage, detached house.",
   "bathtub → bathroom · oven/fridge → kitchen · wardrobe/pillow → bedroom.",
   "sh: /ʃ/."]),
]))

# ---------------------------------------------------------------- THEME 6
units.append(U("u6", "Theme 6: Life in the City & Country", "Theme 6: Life in the City & Country", [
O("k1", "T6.1",
  "Simple Present vs Present Progressive; \"or\" ile seçenek sorma",
  "Simple Present vs Present Progressive; asking about options with \"or\"",
  r"""
# Alt temalar
Yerel ve uluslararası yemek kültürü · şehirdeki yemek festivalleri

# Grammar A — Simple Present vs Present Progressive
| Simple Present | Present Progressive |
|---|---|
| **Rutin / genel gerçek** | **Şu anda** olan |
| People usually **eat** street food at festivals. | They **are trying** different dishes right now. |
| always, usually, every year, on Sundays | now, right now, at the moment, today |

> Bazı fiiller (**like, love, want, know, need**) genellikle -ing almaz: *I **want** falafel.* (I'm wanting ❌)

# Grammar B — Wh- soruları
- **What do** people **eat** at the festival? (genel)
- **What are** they **cooking** now? (şu an)
- **Where does** the festival **take** place?

# Grammar C — "or" ile seçenek sorma
- **Would you like** Turkish pizza **or** falafel? — I'd like Turkish pizza, please.
- Do you prefer sweet **or** spicy food?
""",
  [("Doğru zamanı seçin: \"Every September, people (come) ___ to Gaziantep for the festival. This year, my family (visit) ___ it too.\"",
    "Every September, people **come** (rutin → Simple Present). This year, my family **is visiting** it too (bu dönemde süren eylem → Present Progressive)."),
   ("\"or\" kullanarak bir seçenek sorusu yazın.",
    "*Would you like boiled beans **or** fried beef?* / *Do you want tea **or** coffee?*")],
  ["Simple Present = rutin/gerçek · Present Progressive = şimdi.",
   "like, want, know, need genelde -ing almaz.",
   "Would you like A or B?"]),

O("k2", "T6.2",
  "Kelime, telaffuz ve beceriler (Theme 6)",
  "Vocabulary, pronunciation and skills (Theme 6)",
  r"""
# Vocabulary
- **Food events:** cuisine, street food, food festival, regional cuisine…
- **Foods:** cream, sweetcorn, boiled beans, fried beef, Turkish kebab, Turkish pizza, falafel…
- Pişirme sıfatları: **boiled** (haşlanmış), **fried** (kızartılmış), **grilled** (ızgara), **baked** (fırında)

# Pronunciation
- **u** → /ʊ/ (put, cook) · /uː/ (food, cool)
- **t** → /t/ · **th** → /θ/ (think) ve /ð/ (the, this) · **v** → /v/

# Skills
""" + skills([
    "**Listening:** *A Feast of Flavours* — ayrıntı ve genel fikir (gist)",
    "**Writing:** bir festival hakkında yeni metin üretme",
    "**Culture:** *Experiencing Türkiye Through Festivals* — **GastroAntep** Kültür Yolu Festivali",
    "**E-Portfolio:** yerel veya uluslararası bir festival hakkında self-recording",
]),
  [("\"regional cuisine\" ne demektir?",
    "**Yöresel mutfak** — bir bölgeye özgü yemekler ve pişirme gelenekleri."),
   ("/θ/ ve /ð/ seslerine birer örnek verin.",
    "/θ/: **th**ink, **th**ree · /ð/: **th**e, **th**is, mo**th**er.")],
  ["cuisine, street food, food festival, regional cuisine.",
   "boiled, fried, grilled, baked.",
   "th: /θ/ think · /ð/ this.",
   "GastroAntep Culture Route Festival."]),
]))

# ---------------------------------------------------------------- THEME 7
units.append(U("u7", "Theme 7: Life in the World & Nature", "Theme 7: Life in the World & Nature", [
O("k1", "T7.1",
  "was / were, there was / there were ve should",
  "was / were, there was / there were and should",
  r"""
# Alt temalar
Doğa · nesli tükenen hayvanlar · hayvanların doğal yaşam alanları · nesli tükenen hayvanların korunması

# Grammar A — Verb to be (past): was / were
| Özne | Geçmiş | Örnek |
|---|---|---|
| I / He / She / It | **was** | The tiger **was** in danger. |
| You / We / They | **were** | Pandas **were** endangered. |
| (−) | **wasn't / weren't** | It **wasn't** easy. |
| (?) | **Was / Were** + özne…? | **Were** there any shelters? |

# Grammar B — There was / There were
| Tekil / sayılamayan | Çoğul |
|---|---|
| **There was** a shelter for the animals. | **There were** many tigers in the grasslands 50 years ago. |
| **Was there** a shelter? — Yes, there **was**. / No, there **wasn't**. | **Were there** any whales? — Yes, there **were**. / No, there **weren't**. |

# Grammar C — should (tavsiye, öneri, beklenti, zorunluluk)
- (+) We **should protect** wildlife.
- (−) You **should not / shouldn't hunt** illegally.
- (?) **Should** we **create** more shelters?
- *should* + **V1**; tüm öznelerle aynıdır.
""",
  [("Boşlukları doldurun: \"100 years ago, there ___ many cheetahs in Africa, and there ___ a big forest near the river.\"",
    "there **were** many cheetahs (çoğul) · there **was** a big forest (tekil)."),
   ("*Should* ile yaban hayatını korumak için iki tavsiye yazın.",
    "*People **should** create more shelters for endangered animals.* / *We **shouldn't** buy products made from wild animals.*"),
   ("Hatayı bulun: \"There was many whales in the ocean.\"",
    "*whales* çoğul → **There were** many whales in the ocean.")],
  ["was: I/he/she/it · were: you/we/they.",
   "There was + tekil · There were + çoğul.",
   "should / shouldn't + V1: tavsiye ve öneri."]),

O("k2", "T7.2",
  "Kelime, telaffuz ve beceriler (Theme 7)",
  "Vocabulary, pronunciation and skills (Theme 7)",
  r"""
# Vocabulary
- **Animals:** tiger, whale, cheetah, panda…
- **Habitats:** grasslands, oceans, deserts, forests, wildlife…
- **Other:** survive (hayatta kalmak), lessen (azaltmak), shelter (barınak), illegal (yasa dışı), protect (korumak), endangered (nesli tükenmekte olan), awareness (farkındalık)…

# Pronunciation
- **ea** → /ɪə/ (near, year) · **ee** → /iː/ (tree, see)
- **w** → /w/ (whale) · **x** → /ks/ (fox, extinct)

# Skills
""" + skills([
    "**Reading:** *Türkiye: The Noah's Ark of the World* — skimming, scanning, specific info, gist",
    "**Writing:** yaban hayatını korumak için **en az üç yol** yazma (*First,… Second,… Finally,…*)",
    "**CLIL:** doğa, nesli tükenen hayvanlar, habitatlar ve koruma",
    "**E-Portfolio:** nesli tükenen bir hayvanı tanıtan dijital poster (geçmiş, habitat, görünüm, önem)",
]),
  [("\"endangered\" ve \"awareness\" kelimelerini bir cümlede kullanın.",
    "Örnek: *We should raise **awareness** about **endangered** animals like the panda.*")],
  ["Habitats: grasslands, oceans, deserts, forests.",
   "endangered, survive, shelter, illegal, protect, awareness.",
   "ee: /iː/ · ea: /ɪə/ · x: /ks/."]),
]))

# ---------------------------------------------------------------- THEME 8
units.append(U("u8", "Theme 8: Life in the Universe & Future", "Theme 8: Life in the Universe & Future", [
O("k1", "T8.1",
  "Simple Present ile film anlatımı ve Simple Future (will)",
  "Narrating films with Simple Present; Simple Future (will)",
  r"""
# Alt temalar
Filmler · film türleri · fütüristik filmler ve fikirler · teknoloji

# Grammar A — Simple Present ile film özeti
Film ve kitap özetlerinde olaylar genellikle **Simple Present** ile anlatılır:
> In this film, a young scientist **discovers** a new planet. She **builds** a spaceship and **travels** there.

# Grammar B — Simple Future (will)
| Yapı | Örnek |
|---|---|
| (+) **will + V1** | People **will live** on Mars one day. |
| (−) **will not / won't + V1** | Robots **won't replace** all jobs. |
| (?) **Will + özne + V1?** | **Will** robots **replace** teachers? — Yes, they **will**. / No, they **won't**. |

**Kullanım:** geleceğe dair **tahminler (predictions)**, **inançlar (beliefs)**, **beklentiler (expectations)**, **görüşler (opinions)** ve **tahmini fikirler (guesses)**.

Sık kullanılan kalıplar: **I think / I believe / I'm sure / Maybe / Probably** + *will*
> *I think* people **will** travel to space more often in the future.
""",
  [("Doğru biçimi yazın: \"In 2050, cars (fly) ___ and people (not / drive) ___ them.\"",
    "In 2050, cars **will fly** and people **won't drive** them."),
   ("Bir filmin özetini anlatırken hangi zaman kullanılır? Bir örnek verin.",
    "**Simple Present.** *In the film, aliens **attack** the Earth and a group of teenagers **saves** the world.*"),
   ("\"Robots / do / our homework\" ifadesiyle bir soru ve kısa cevap oluşturun.",
    "**Will** robots **do** our homework? — No, they **won't**. / Yes, they **will**.")],
  ["Film özeti → Simple Present.",
   "will / won't + V1: tahmin, inanç, beklenti, görüş.",
   "I think / I believe / probably + will."]),

O("k2", "T8.2",
  "Kelime, telaffuz ve beceriler (Theme 8)",
  "Vocabulary, pronunciation and skills (Theme 8)",
  r"""
# Vocabulary
- **Film genres:** comedy, action, cartoon, drama, science fiction…
- **Futuristic themes:** space adventure, robots, alien invasion…
- **Other:** invention, futuristic, discover, technology, space programme…

# Pronunciation
- **/əʊ/ diftongu** farklı yazımlarla: **o** (go), **oe** (toe), **ow** (show), **oa** (boat), **ou** (soul), **eau** (plateau)
- **y** → /j/ (yes, year) veya kelime sonunda /i/ (happy, funny) · **z** → /z/ (zero)

# Skills
""" + skills([
    "**Reading:** *Türkiye's Roadmap for Growth* — skimming, scanning, jigsaw, karşılaştırma, çıkarım",
    "**Writing:** bir ülkenin film endüstrisini desteklemesi hakkında metin",
    "**Culture:** *Türkiye's Space Journey and Future Plans* — Millî Uzay Programı",
    "**E-Portfolio:** fütüristik film senaryosu yazma ve sınıf içi film gösterimi",
]),
  [("\"alien invasion\" temalı bir film hangi türe girer?",
    "**Science fiction** (bilim kurgu); çoğu zaman **action** ögeleri de taşır."),
   ("/əʊ/ sesini taşıyan farklı yazımlara üç örnek verin.",
    "g**o**, sh**ow**, b**oa**t (ayrıca t**oe**, s**ou**l).")],
  ["Genres: comedy, action, cartoon, drama, science fiction.",
   "Futuristic: space adventure, robots, alien invasion.",
   "/əʊ/: o, oe, ow, oa, ou, eau."]),
]))

# ---------------------------------------------------------------- GENEL TEKRAR
units.append(U("u9", "Genel Tekrar: Dilbilgisi Özeti ve Kazanım Kontrol Listesi", "Review: Grammar Summary and Checklist", [
O("k1", "R.1",
  "Genel dilbilgisi özeti ve önemli kalıplar",
  "General grammar summary and key patterns",
  r"""
# Genel Dilbilgisi Özeti

| # | Yapı | Kullanım | Örnek |
|---|---|---|---|
| 1 | **Simple Present** | Alışkanlık, rutin, genel gerçek, film özeti, meslek tarifi, ülke tanıtımı | I wake up at 7. / She works in a bank. / The capital is Ankara. |
| 2 | **Present Progressive** | Şu anda / bu günlerde süren eylem | She is cooking dinner right now. |
| 3 | **can** | Yetenek, olasılık, fırsat | I can speak three languages. / You can go hiking there. |
| 4 | **too / enough** | Fazlalık / yeterlilik | too + adj · adj + enough · enough + noun |
| 5 | **was / were, there was / were** | Geçmişte durum ve varlık | There were many cheetahs in Africa 100 years ago. |
| 6 | **should** | Tavsiye, öneri | We should protect endangered animals. |
| 7 | **will** | Gelecek tahmini, inanç, görüş | People will travel to space more often. |
| 8 | **Possessive adjectives** | Sahiplik | my, your, his, her, its, our, their |
| 9 | **Prepositions of place** | Yer | in a bank, at school, on the farm |

### Zaman çizelgesi
**was/were (geçmiş) → Simple Present (her zaman) / Present Progressive (şimdi) → will (gelecek)**
""",
  [("Uygun zamanı kullanın: \"Last year there (be) ___ only two pandas in the zoo. Now the zookeepers (feed) ___ four pandas, and they think there (be) ___ more next year.\"",
    "there **were** (geçmiş, çoğul) · the zookeepers **are feeding** (şu an) · there **will be** (gelecek tahmini)."),
   ("Hangi cümle yanlıştır? (a) She can swims. (b) We should recycle. (c) Is he working now?",
    "**(a)** — *can*'den sonra fiil yalın gelir: *She can **swim**.*")],
  ["Simple Present = rutin · Present Progressive = şimdi · was/were = geçmiş · will = gelecek.",
   "Modal (can, should, will) + V1.",
   "too + adj / adj + enough."]),

O("k2", "R.2",
  "Kazanım kontrol listesi (tema tema)",
  "Learning outcome checklist (theme by theme)",
  r"""
# Kazanım Kontrol Listesi

| Tema | Dilbilgisi | Kelime | Telaffuz |
|---|---|---|---|
| **1 School Life** | can (ability/possibility/opportunity) + to be | ülke, milliyet, dil, başkent, turistik yer | uzun-kısa "a" sesleri; b, c, d |
| **2 Classroom Life** | Simple Present (habits/routines) + time expressions + adverbs of manner | günlük ve ders rutinleri | e; f, g, h |
| **3 Personal Life** | Simple Present (appearance/personality) + too/enough | fiziksel ve kişilik sıfatları | i; j, k, l |
| **4 Family Life** | Simple Present (jobs) + prepositions of place | meslek, iş yeri, aile | o; m, n, p |
| **5 House & Neighbourhood** | Simple Present + Present Progressive + possessive adjectives | ev, oda, mobilya | q, r, s, sh |
| **6 City & Country** | Simple Present vs Present Progressive + "or" | yemek ve festival | u; t, v |
| **7 World & Nature** | was/were + there was/were + should | nesli tükenen hayvanlar, habitat | ea, ee; w, x |
| **8 Universe & Future** | Simple Present (film) + will | film türleri, teknoloji | /əʊ/; y, z |

### Her temada tekrarlanan beceriler
- **Reading:** skimming, scanning, jigsaw, çıkarım
- **Writing:** topic sentence + supporting details + conclusion; karşılaştırma metinleri
- **E-Portfolio** projesi ve **self-reflection** (öz değerlendirme)
""",
  [("\"Present Progressive\" hangi temada ve hangi konu ile birlikte işlenir?",
    "**Theme 5 – Life in the House & Neighbourhood**; evdeki o anki aktiviteleri anlatmak için (ve Theme 6'da Simple Present ile karşılaştırmalı olarak).")],
  ["8 tema: School, Classroom, Personal, Family, House, City & Country, World & Nature, Universe & Future.",
   "Her temada: grammar + vocabulary + pronunciation + 4 beceri + E-Portfolio."]),
]))

write("ing-9.js", "9/ingilizce", "9. Sınıf İngilizce (WAYMARK Year 9 / B1.1) — konu anlatım notları",
      "kullanıcının verdiği \"WAYMARK Year 9/B1.1 Detaylı Konu Anlatım Notları\" (8 tema + genel tekrar).",
      units, "Her tema iki kazanıma ayrıldı: dilbilgisi ve fonksiyonlar / kelime, telaffuz, sosyal dil ve beceriler. Alıştırma soruları eklendi.")
