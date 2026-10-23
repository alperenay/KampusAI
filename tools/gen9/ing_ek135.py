# -*- coding: utf-8 -*-
r"""9. Sınıf İngilizce — 1.35.0 tamamlama: Maarif program kodları (ENG.9.x), her tema için okuma–yazma uygulaması
(özgün okuma metni, anlama soruları, yazma modeli ve performans görevi), eksik örnek ve özet maddeleri."""
from common import O

KOD = {}
for t in range(1, 9):
    KOD["u%d/k1" % t] = "ENG.9.%d.G1" % t
    KOD["u%d/k2" % t] = "ENG.9.%d.V1–P1" % t

ORNEK = {
"u5/k2": [
 (r"“I'm making my bed in my bedroom now.” cümlesindeki aktivite ve oda kelimelerini bulunuz; *sh* sesini içeren iki ev kelimesi yazınız.",
  r"Aktivite: **make the bed**; oda: **bedroom**. *sh* /ʃ/ sesi: **shower**, **wash** (the dishes), **dishwasher**."),
],
"u7/k2": [
 (r"*First, …  Second, …  Finally, …* kalıbıyla yaban hayatını korumanın üç yolunu yazınız.",
  r"*First, we should protect animal habitats like forests and oceans. Second, we should stop illegal hunting. Finally, we should reduce plastic pollution.* — Her madde **should** ile öneri bildirir; sıralama sözcükleri metni düzenler."),
],
"u9/k2": [
 (r"“Tourists can visit the Blue Mosque. Robots will help people in the future. Leopards were in danger 50 years ago.” cümlelerinin hangi temalara ve dilbilgisi yapılarına ait olduğunu belirleyiniz.",
  r"1) **Theme 1** – *can* (possibility/opportunity). 2) **Theme 8** – *will* (Simple Future, prediction). 3) **Theme 7** – *was/were* (Simple Past of *to be*)."),
],
}

OZET = {"u9/k2": ["Kontrol için her temanın dilbilgisi yapısıyla birer cümle kur ve e-portfolyona ekle."]}


def RW(t, theme_tr, theme_en, passage, questions, writing, task, tips):
    """Bir temanın okuma–yazma uygulaması kazanımı."""
    anl = ("# Reading: " + passage[0] + "\n\n" + passage[1].strip() + "\n\n"
           "## Okuma Stratejisi\n"
           "1. **Before reading:** Başlığa ve ilk cümleye bak, konuyu tahmin et.\n"
           "2. **Skimming:** Metne hızlıca göz gezdir, ana fikri bul.\n"
           "3. **Scanning:** Sorulardaki anahtar kelimeleri (isim, sayı, yer) metinde ara.\n"
           "4. **After reading:** Tahminini kontrol et; bilmediğin kelimelerin anlamını **bağlamdan** çıkar.\n\n"
           "# Writing Model\n\n" + writing.strip() + "\n\n"
           "# Performance Task\n\n" + task.strip() + "\n")
    return O("k3", "ENG.9.%d.R1–W7" % t, "Okuma–yazma uygulaması ve performans görevi (" + theme_tr + ")",
             "Reading–writing practice and performance task (" + theme_en + ")", anl, questions, tips)


EK = {
"u1": [RW(1, "Theme 1", "Theme 1",
  ("An International Student in Ankara", r"""
*Hi! I'm Aiko and I'm from Japan. I'm a student at an international school in Ankara. My classmates are from different countries: Lucas is Brazilian, Dina is Kazakh and Omar is from Egypt. We can all speak English, and I can speak a little Turkish now. On weekends, we can visit many places in Türkiye. Last month we went to Anıtkabir, and next week we can take a boat ride on the Bosphorus in İstanbul. My favourite day is 29 October, Republic Day. The streets are full of flags and everyone is very happy!*
"""),
  [(r"Where is Aiko from, and what languages can she speak?", r"She is from **Japan**. She can speak **English** (and Japanese) and **a little Turkish**."),
   (r"Find the nationality words in the text and write the country for each.", r"**Brazilian** → Brazil, **Kazakh** → Kazakhstan, (Omar is from) **Egypt** → Egyptian. Nationality adjectives start with a **capital letter** in English.")],
  r"""
**Topic sentence:** *Türkiye is a country with a rich history and beautiful places.*
**Supporting details:** *Its capital is Ankara and people speak Turkish. Tourists can visit Cappadocia, Ephesus and Topkapı Palace. They can also take a boat ride in İstanbul.*
**Conclusion:** *Türkiye is a wonderful country to visit!*
""",
  r"""Bir sınıf arkadaşınla **mülakat** yap: *Where are you from? What is your capital famous for? What can tourists do there? What is your favourite national day?* Cevapları kullanarak kendi ülkeni ya da hayalî bir ülkeyi tanıtan **1 dakikalık bir self-recording** hazırla.""",
  ["Ülke tanıtım paragrafı: topic sentence + supporting details + conclusion.", "Milliyet ve dil adları büyük harfle yazılır (Turkish, Brazilian).", "can → olasılık/fırsat: Tourists can visit …"])],
"u2": [RW(2, "Theme 2", "Theme 2",
  ("Ece's Study Routine", r"""
*Ece is a ninth grader in İzmir. She always wakes up at 6.30 and takes the bus to school. She attends classes until 3.30. After school, she has a short break and then she hits the books. She usually plans her week on Sundays. She takes notes carefully in class and highlights important points. She rarely studies late at night because she needs to sleep well. On Fridays, she plays volleyball with her friends. "Work hard, play later!" is her favourite saying.*
"""),
  [(r"How often does Ece study late at night? Why?", r"She **rarely** studies late at night because she **needs to sleep well**."),
   (r"Find two adverbs of frequency and one adverb of manner in the text.", r"Frequency: **always, usually, rarely**. Manner: **carefully** (takes notes carefully).")],
  r"""
*I usually wake up at 7.00. I never skip breakfast. I take the bus to school and I attend classes until 3.30. After school, I sometimes play football, but I always do my homework first. I study carefully and I take notes neatly. On weekends, I often help my family with household chores.*
""",
  r"""Bir arkadaşının günlük ve ders çalışma rutinini sor (*What time do you…? How often do you…?*). Notlarını kullanarak arkadaşını **üçüncü tekil şahısla** anlatan bir paragraf yaz (*She gets up… He usually…*) ve sınıfa sun.""",
  ["Simple Present: rutinler; he/she/it → fiil + -s (wakes, takes, studies).", "Sıklık zarfları: always > usually > often > sometimes > rarely > never; genellikle fiilden önce.", "Adverbs of manner: carefully, neatly, quickly."])],
"u3": [RW(3, "Theme 3", "Theme 3",
  ("Who Is Mr Kaya?", r"""
*Mr Kaya is my neighbour. He is middle-aged and well-built. He has short, curly grey hair and a friendly smile. He looks serious at first, but he is very kind and generous. He helps the old people in our street and he is always polite to everyone. He is not shy; he is outgoing and he loves telling funny stories. Some people say he is too talkative, but I think he is cheerful enough to make everyone happy!*
"""),
  [(r"What does Mr Kaya look like?", r"He is **middle-aged** and **well-built**; he has **short, curly grey hair** and a **friendly smile**."),
   (r"What kind of person is he? Find four personality adjectives.", r"He is **kind, generous, polite, outgoing, cheerful** (also *talkative*).")],
  r"""
*My best friend is Zeynep. She is tall and slim. She has long, straight brown hair and big green eyes. She is clever and confident, but sometimes she is a bit forgetful. She is never rude. She is honest and brave enough to tell the truth all the time.*
""",
  r"""Ailenden, okulundan ya da tanıdığın birinin **fiziksel görünümünü ve kişiliğini** anlatan bir poster ya da **fact file** hazırla; adını yazma. Sınıfta sun, arkadaşların kişinin kim olduğunu tahmin etsin (*Who is he/she?*).""",
  ["What does she look like? → görünüm; What kind of person is she? → kişilik.", "too = gereğinden fazla (too talkative); enough = yeterince (cheerful enough).", "Sıfat sırası: görünüm (tall, slim) → saç/göz → kişilik."])],
"u4": [RW(4, "Theme 4", "Theme 4",
  ("A Family of Professionals", r"""
*My name is Kerem and my family is very busy. My father is an architect. He designs buildings and he works at an architecture office in the city centre. My mother is a pharmacist. She works at a pharmacy and she serves customers every day. My uncle is a journalist; he reports news for a TV channel. My cousin Elif is a computer programmer. She develops software at an IT company. And me? I want to be a scientist and work in a science lab!*
"""),
  [(r"What does Kerem's mother do? Where does she work?", r"She is a **pharmacist**. She **serves customers** at a **pharmacy**."),
   (r"Match the people with their workplaces: father, uncle, Elif.", r"Father → **architecture office**, uncle → **TV channel** (news agency), Elif → **IT company**.")],
  r"""
*My aunt is a psychologist. She works at a clinic. She listens to people and helps them with their problems. She starts work at 9.00 and finishes at 5.00. She doesn't work on Sundays. She loves her job because she helps people every day.*
""",
  r"""Ailenden bir kişiyle (ya da bir arkadaşının ailesinden biriyle) **mesleği, iş yeri ve iş rutini** hakkında **mülakat** yap. Sonuçları bir poster ya da kısa film olarak hazırla ve sınıfa sun.""",
  ["Meslek sormak: What does he/she do? / What's his/her job?", "Simple Present olumsuz/soru: She doesn't work… / Does he design…?", "Prepositions of place: at a bank, in an office, on a social media platform."])],
"u5": [RW(5, "Theme 5", "Theme 5",
  ("Home Sweet Home", r"""
*We live in a semi-detached house in a quiet neighbourhood. Our house has three bedrooms, a living room, a kitchen and a small garden. My favourite room is the living room because it is spacious and bright. Right now, my mother is cooking dinner in the kitchen, my father is watering the plants in the garden and my little brother is watching cartoons on the sofa. And me? I'm doing my homework at my desk in my bedroom. Home sweet home!*
"""),
  [(r"What type of house does the writer live in, and what is their favourite room?", r"A **semi-detached house**. The favourite room is the **living room** because it is **spacious and bright**."),
   (r"What is the writer's father doing at the moment? Which tense is used?", r"He **is watering the plants** in the garden. **Present Progressive** (am/is/are + verb-ing) is used for actions **happening now**.")],
  r"""
*I live in a flat on the fourth floor. Our flat has two bedrooms, a living room and a balcony. In my bedroom there is a bed, a wardrobe and a desk. At the moment, I'm sitting on my bed and I'm reading a book. My sister is tidying up her room.*
""",
  r"""Bir sınıf arkadaşınla **ev türleri, odalar, mobilyalar ve evdeki aktiviteler** hakkında konuş. Evini (ya da hayalindeki evi) tanıtan ve şu anda evde kimin ne yaptığını anlatan **bir self-recording** hazırla.""",
  ["Present Progressive: şu an olan eylemler (I'm doing, she is cooking).", "Possessive adjectives: my, your, his, her, its, our, their.", "Zaman ifadeleri: now, at the moment, at present."])],
"u6": [RW(6, "Theme 6", "Theme 6",
  ("Gaziantep Food Festival", r"""
*Every year, Gaziantep hosts an international food festival. Chefs from many countries come and cook their local dishes. This year, I'm at the festival with my family. A chef from Morocco is making couscous, and a Japanese chef is cooking noodles. Local cooks always serve delicious kebabs and baklava. "Is this dish spicy or sweet?" I ask a chef. "It's a bit spicy," he says. Right now, people are tasting dishes, taking photos and listening to music. What a great festival!*
"""),
  [(r"Which international dishes are mentioned? Which local food do cooks always serve?", r"**Couscous** (Morocco) and **noodles** (Japan). Local cooks always serve **kebabs and baklava**."),
   (r"Find one sentence for a routine and one for an action happening now.", r"Routine (Simple Present): *Every year, Gaziantep **hosts** an international food festival.* Now (Present Progressive): *Right now, people **are tasting** dishes.*")],
  r"""
*Our city has a local festival every summer. People usually sell street food and handmade souvenirs. Today, I'm at the festival. A cook is preparing gözleme and children are dancing in the square. Is the festival local or international? It's local, but many tourists visit it every year.*
""",
  r"""Bir **yemek festivali programı** tasarla (yerel ve uluslararası yemekler, saatler, etkinlikler) ve sınıfta “festival” düzenle: bazı öğrenciler aşçı/sunucu, bazıları ziyaretçi olsun; *Is it local or international? What are the ingredients?* gibi sorular sorun.""",
  ["Simple Present: rutin/gerçek (Every year, the city hosts…); Present Progressive: şu an (A chef is making…).", "Seçenek sorma: Is it spicy or sweet? / Is this a local or an international festival?", "Tat sıfatları: spicy, salty, sweet, sour, bitter, juicy, creamy."])],
"u7": [RW(7, "Theme 7", "Theme 7",
  ("The Mediterranean Monk Seal", r"""
*The Mediterranean monk seal is one of the most endangered sea animals in the world. Fifty years ago, there were monk seals along many coasts of the Mediterranean, but now there are only a few hundred. Their habitats were quiet caves near the sea, but tourism and fishing nets threaten them today. Some seals were caught in nets by accident. What should we do? We should protect their caves, we shouldn't leave plastic on the beaches and we should report any seal we see to the authorities. Every little bit helps!*
"""),
  [(r"How many monk seals were there fifty years ago compared with today?", r"Fifty years ago **there were** monk seals along many coasts; **now there are only a few hundred**."),
   (r"Write two pieces of advice from the text using *should/shouldn't*.", r"*We **should** protect their caves.* / *We **shouldn't** leave plastic on the beaches.* (also: *We should report any seal we see.*)")],
  r"""
*The sea turtle is an endangered animal. In the past, there were many sea turtles on Türkiye's beaches, like İztuzu Beach. Their main habitat was the sea and sandy beaches. Today, pollution and bright lights threaten them. We should keep beaches clean and we shouldn't disturb their nests.*
""",
  r"""Nesli tükenmekte olan bir hayvan hakkında arkadaşlarınla **mülakat** yap (geçmişte ve bugün yaşam alanı, tehditler, koruma yolları). Bir **belgesel film metni** yaz ve sınıfta “film gösterimi” düzenle; arkadaşların koruyucu, gönüllü ya da habitata zarar veren rollerini canlandırsın.""",
  ["was/were + there was/there were: geçmişteki durum (There were 700,000 leopards…).", "should / shouldn't: öneri ve tavsiye.", "Habitat, endangered, threaten, protect, survive."])],
"u8": [RW(8, "Theme 8", "Theme 8",
  ("Life in 2070: A Film Review", r"""
*"Life in 2070" is a science fiction film about the future. In the film, robots help people at home and at school, and cars fly over the cities. A young scientist invents a time machine and travels to the past. The film is exciting and optimistic. I think people will live on the Moon in the future, but I don't think cars will fly very soon. What will happen in 2070? Nobody knows, but this film is a breath of fresh air!*
"""),
  [(r"What does the young scientist invent? What genre is the film?", r"A **time machine**. It is a **science fiction** film."),
   (r"Find one prediction the writer believes and one they don't believe.", r"Believes: *People **will live** on the Moon in the future.* Doesn't believe: *I don't think cars **will fly** very soon.*")],
  r"""
*My favourite film is an adventure film. In the film, a group of friends explore a mysterious island. The film is exciting and funny. I think technology will change our lives in the future. Robots will do our homework… maybe! Students will learn with virtual reality.*
""",
  r"""Geleceği anlatan **fütüristik bir film senaryosu** yaz (karakterler, mekân, teknoloji, tahminler). Sınıfta bir “film gösterimi” düzenle; arkadaşların oyuncu ve yönetmen rollerini üstlensin.""",
  ["Simple Future (will): tahmin, inanç, beklenti — Robots will help people.", "I think … will … / I don't think … will …", "Film anlatırken Simple Present: In the film, a scientist invents…"])],
}
