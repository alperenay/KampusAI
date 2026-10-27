# -*- coding: utf-8 -*-
r"""9. Sınıf Almanca (ikinci yabancı dil, A1.1) → js/data/content/alm-9.js
Metinler ve örnek diyaloglar özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Hallo! — Tanışma", "Unit 1: Hallo! — Getting to Know Each Other", [
O("k1", "ALM.E1", "Selamlaşma, tanışma ve kendini tanıtma", "Greetings, introductions and talking about yourself", r"""
# Selamlaşma (Begrüßung)
| Almanca | Türkçe | Ne zaman? |
|---|---|---|
| **Hallo! / Hi!** | Merhaba! | Arkadaşlar arasında |
| **Guten Morgen!** | Günaydın! | Sabah |
| **Guten Tag!** | İyi günler! | Gün içinde, resmî |
| **Guten Abend!** | İyi akşamlar! | Akşam |
| **Gute Nacht!** | İyi geceler! | Yatarken |
| **Tschüs! / Auf Wiedersehen!** | Hoşça kal! / Görüşmek üzere! | Ayrılırken (samimi / resmî) |

# Tanışma Kalıpları
- **Wie heißt du?** — Adın ne? → **Ich heiße** Elif. / **Ich bin** Elif.
- **Woher kommst du?** — Nerelisin? → **Ich komme aus** der Türkei. (Türkiye ile artikel: *aus der Türkei*)
- **Wo wohnst du?** — Nerede oturuyorsun? → **Ich wohne in** Ankara.
- **Wie alt bist du?** — Kaç yaşındasın? → **Ich bin** fünfzehn **Jahre alt**.
- **Wie geht's?** — Nasılsın? → **Gut, danke! Und dir?** / Es geht. (İdare eder)

# du ve Sie
Almancada arkadaşlara ve gençlere **du** (sen), tanımadığımız yetişkinlere ve resmî ortamda **Sie** (siz, büyük harfle) denir: *Wie heißen **Sie**?*

# Örnek Diyalog
— Hallo! Ich heiße Can. Wie heißt du?
— Hallo Can! Ich bin Lena. Woher kommst du?
— Ich komme aus der Türkei, aus İzmir. Und du?
— Ich komme aus Deutschland. Freut mich! (Memnun oldum!)
""",
 [(r"Öğretmeninize Almanca adını nasıl sorarsınız?", r"Resmî hitapla: **Wie heißen Sie?**"),
  (r"“Ben Türkiye'denim ve Bursa'da oturuyorum.” cümlesini Almanca yazınız.", r"**Ich komme aus der Türkei und ich wohne in Bursa.**")],
 [r"Guten Morgen / Tag / Abend; ayrılırken Tschüs (samimi), Auf Wiedersehen (resmî).", r"Ich heiße… / Ich komme aus… / Ich wohne in… / Ich bin … Jahre alt.",
  r"du arkadaşa, Sie resmî hitap için kullanılır.", r"Türkiye artikelle kullanılır: aus der Türkei."]),
O("k2", "ALM.E2", "Sayılar, alfabe ve saat", "Numbers, the alphabet and telling the time", r"""
# Alfabe ve Okunuş
Almanca alfabede 26 harfe ek olarak **ä, ö, ü** ve **ß** (çift s) vardır. Önemli okunuşlar:
| Yazılış | Okunuş | Örnek |
|---|---|---|
| **ei** | ay | *drei* (dray) |
| **ie** | uzun i | *vier* (fiir) |
| **eu / äu** | oy | *neun* (noyn), *Häuser* |
| **sch** | ş | *Schule* (şule) |
| **ch** | hırıltılı h | *ich*, *acht* |
| **z** | ts | *zehn* (tseen) |
| **v** | f | *Vater* (fater) |
| **w** | v | *wie* (vii) |

# Sayılar
1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf, 6 sechs, 7 sieben, 8 acht, 9 neun, 10 zehn, 11 elf, 12 zwölf, 13 dreizehn … 20 zwanzig, 30 dreißig, 100 hundert.
- 21'den itibaren **önce birler, sonra onlar** söylenir: 21 = **einundzwanzig** ("bir ve yirmi"), 45 = fünfundvierzig.

# Saat (Uhrzeit)
- **Wie spät ist es? / Wie viel Uhr ist es?** — Saat kaç?
- 8.00 → *Es ist **acht Uhr***. 8.15 → *Viertel **nach** acht*. 8.45 → *Viertel **vor** neun*.
- **8.30 → *halb neun*** (dikkat: "dokuzun yarısı" = 8.30!).
""",
 [(r"34 sayısını Almanca yazınız.", r"**vierunddreißig** (önce dört, sonra otuz)."),
  (r"“Es ist halb sieben.” saat kaçtır?", r"**6.30** (halb sieben = yediye yarım kala).")],
 [r"ei = ay, ie = uzun i, eu = oy, sch = ş, z = ts, v = f, w = v.", r"21'den sonra önce birler sonra onlar: einundzwanzig.",
  r"halb + sonraki saat = buçuk: halb neun = 8.30.", r"Viertel nach (çeyrek geçe), Viertel vor (çeyrek kala)."]),
]),
U("u2", "2. Ünite: Meine Familie und meine Schule", "Unit 2: My Family and My School", [
O("k1", "ALM.E3", "Artikeller, isimler ve temel fiil çekimi", "Articles, nouns and basic verb conjugation", r"""
# Artikeller
Almancada her isim büyük harfle yazılır ve bir **artikel** (tanımlık) alır; artikel ismin cinsiyetini gösterir ve ezberlenmelidir.
| Cinsiyet | Belirli | Belirsiz | Örnek |
|---|---|---|---|
| Eril (maskulin) | **der** | ein | der Vater (baba), der Tisch (masa) |
| Dişil (feminin) | **die** | eine | die Mutter (anne), die Schule (okul) |
| Nötr (neutrum) | **das** | ein | das Kind (çocuk), das Buch (kitap) |
| Çoğul | **die** | — | die Kinder, die Bücher |
- Olumsuz: **kein / keine** (*Das ist **kein** Buch.*). İyelik: *mein Vater, meine Mutter, mein Buch*.

# Fiil Çekimi (Präsens)
Fiil kökü + kişi eki. Örnek: **wohnen** (oturmak) → wohn-
| Kişi | Ek | wohnen | sein (olmak) | haben (sahip olmak) |
|---|---|---|---|---|
| ich | -e | wohne | **bin** | habe |
| du | -st | wohnst | **bist** | **hast** |
| er/sie/es | -t | wohnt | **ist** | **hat** |
| wir | -en | wohnen | **sind** | haben |
| ihr | -t | wohnt | **seid** | habt |
| sie/Sie | -en | wohnen | **sind** | haben |

# Cümle Yapısı
Düz cümlede **fiil ikinci sıradadır**: *Ich **spiele** Fußball. Heute **spiele** ich Fußball.* Evet–hayır sorularında fiil başa gelir: ***Spielst** du Fußball?* — *Ja / Nein.*
""",
 [(r"“Benim bir erkek kardeşim var.” cümlesini Almanca yazınız (der Bruder).", r"**Ich habe einen Bruder.** (Haben fiilinin nesnesi eril olduğu için ein → **einen**.)"),
  (r"“Bu bir okul.” ve “Bu bir okul değil.” cümlelerini yazınız.", r"**Das ist eine Schule.** / **Das ist keine Schule.**")],
 [r"der (eril), die (dişil), das (nötr), çoğulda die; isimler büyük harfle yazılır.", r"Düzenli fiil ekleri: -e, -st, -t, -en, -t, -en.",
  r"sein: bin, bist, ist, sind, seid, sind; haben: habe, hast, hat, haben, habt, haben.", r"Düz cümlede fiil ikinci sırada, evet–hayır sorusunda başta."]),
]),
]

write("alm-9.js", "9/almanca", "9. Sınıf Almanca (ikinci yabancı dil, A1.1) — konu anlatım notları",
      "KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.", units)
