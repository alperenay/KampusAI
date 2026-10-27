/* =========================================================
   9. Sınıf Almanca (ikinci yabancı dil, A1.1) — konu anlatım notları
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/almanca"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Hallo! — Tanışma",
   "en": "Unit 1: Hallo! — Getting to Know Each Other"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ALM.E1",
    "title": {
     "tr": "Selamlaşma, tanışma ve kendini tanıtma",
     "en": "Greetings, introductions and talking about yourself"
    },
    "content": {
     "anlatim": "# Selamlaşma (Begrüßung)\n\n| Almanca | Türkçe | Ne zaman? |\n|---|---|---|\n| **Hallo! / Hi!** | Merhaba! | Arkadaşlar arasında |\n| **Guten Morgen!** | Günaydın! | Sabah |\n| **Guten Tag!** | İyi günler! | Gün içinde, resmî |\n| **Guten Abend!** | İyi akşamlar! | Akşam |\n| **Gute Nacht!** | İyi geceler! | Yatarken |\n| **Tschüs! / Auf Wiedersehen!** | Hoşça kal! / Görüşmek üzere! | Ayrılırken (samimi / resmî) |\n\n# Tanışma Kalıpları\n\n- **Wie heißt du?** — Adın ne? → **Ich heiße** Elif. / **Ich bin** Elif.\n- **Woher kommst du?** — Nerelisin? → **Ich komme aus** der Türkei. (Türkiye ile artikel: *aus der Türkei*)\n- **Wo wohnst du?** — Nerede oturuyorsun? → **Ich wohne in** Ankara.\n- **Wie alt bist du?** — Kaç yaşındasın? → **Ich bin** fünfzehn **Jahre alt**.\n- **Wie geht's?** — Nasılsın? → **Gut, danke! Und dir?** / Es geht. (İdare eder)\n\n# du ve Sie\n\nAlmancada arkadaşlara ve gençlere **du** (sen), tanımadığımız yetişkinlere ve resmî ortamda **Sie** (siz, büyük harfle) denir: *Wie heißen **Sie**?*\n\n# Örnek Diyalog\n\n— Hallo! Ich heiße Can. Wie heißt du?\n— Hallo Can! Ich bin Lena. Woher kommst du?\n— Ich komme aus der Türkei, aus İzmir. Und du?\n— Ich komme aus Deutschland. Freut mich! (Memnun oldum!)",
     "ornekler": [
      {
       "soru": "Öğretmeninize Almanca adını nasıl sorarsınız?",
       "cozum": "Resmî hitapla: **Wie heißen Sie?**"
      },
      {
       "soru": "“Ben Türkiye'denim ve Bursa'da oturuyorum.” cümlesini Almanca yazınız.",
       "cozum": "**Ich komme aus der Türkei und ich wohne in Bursa.**"
      }
     ],
     "ozet": [
      "Guten Morgen / Tag / Abend; ayrılırken Tschüs (samimi), Auf Wiedersehen (resmî).",
      "Ich heiße… / Ich komme aus… / Ich wohne in… / Ich bin … Jahre alt.",
      "du arkadaşa, Sie resmî hitap için kullanılır.",
      "Türkiye artikelle kullanılır: aus der Türkei."
     ]
    }
   },
   {
    "id": "k2",
    "code": "ALM.E2",
    "title": {
     "tr": "Sayılar, alfabe ve saat",
     "en": "Numbers, the alphabet and telling the time"
    },
    "content": {
     "anlatim": "# Alfabe ve Okunuş\n\nAlmanca alfabede 26 harfe ek olarak **ä, ö, ü** ve **ß** (çift s) vardır. Önemli okunuşlar:\n| Yazılış | Okunuş | Örnek |\n|---|---|---|\n| **ei** | ay | *drei* (dray) |\n| **ie** | uzun i | *vier* (fiir) |\n| **eu / äu** | oy | *neun* (noyn), *Häuser* |\n| **sch** | ş | *Schule* (şule) |\n| **ch** | hırıltılı h | *ich*, *acht* |\n| **z** | ts | *zehn* (tseen) |\n| **v** | f | *Vater* (fater) |\n| **w** | v | *wie* (vii) |\n\n# Sayılar\n\n1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf, 6 sechs, 7 sieben, 8 acht, 9 neun, 10 zehn, 11 elf, 12 zwölf, 13 dreizehn … 20 zwanzig, 30 dreißig, 100 hundert.\n- 21'den itibaren **önce birler, sonra onlar** söylenir: 21 = **einundzwanzig** (\"bir ve yirmi\"), 45 = fünfundvierzig.\n\n# Saat (Uhrzeit)\n\n- **Wie spät ist es? / Wie viel Uhr ist es?** — Saat kaç?\n- 8.00 → *Es ist **acht Uhr***. 8.15 → *Viertel **nach** acht*. 8.45 → *Viertel **vor** neun*.\n- **8.30 → *halb neun*** (dikkat: \"dokuzun yarısı\" = 8.30!).",
     "ornekler": [
      {
       "soru": "34 sayısını Almanca yazınız.",
       "cozum": "**vierunddreißig** (önce dört, sonra otuz)."
      },
      {
       "soru": "“Es ist halb sieben.” saat kaçtır?",
       "cozum": "**6.30** (halb sieben = yediye yarım kala)."
      }
     ],
     "ozet": [
      "ei = ay, ie = uzun i, eu = oy, sch = ş, z = ts, v = f, w = v.",
      "21'den sonra önce birler sonra onlar: einundzwanzig.",
      "halb + sonraki saat = buçuk: halb neun = 8.30.",
      "Viertel nach (çeyrek geçe), Viertel vor (çeyrek kala)."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Meine Familie und meine Schule",
   "en": "Unit 2: My Family and My School"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "ALM.E3",
    "title": {
     "tr": "Artikeller, isimler ve temel fiil çekimi",
     "en": "Articles, nouns and basic verb conjugation"
    },
    "content": {
     "anlatim": "# Artikeller\n\nAlmancada her isim büyük harfle yazılır ve bir **artikel** (tanımlık) alır; artikel ismin cinsiyetini gösterir ve ezberlenmelidir.\n| Cinsiyet | Belirli | Belirsiz | Örnek |\n|---|---|---|---|\n| Eril (maskulin) | **der** | ein | der Vater (baba), der Tisch (masa) |\n| Dişil (feminin) | **die** | eine | die Mutter (anne), die Schule (okul) |\n| Nötr (neutrum) | **das** | ein | das Kind (çocuk), das Buch (kitap) |\n| Çoğul | **die** | — | die Kinder, die Bücher |\n- Olumsuz: **kein / keine** (*Das ist **kein** Buch.*). İyelik: *mein Vater, meine Mutter, mein Buch*.\n\n# Fiil Çekimi (Präsens)\n\nFiil kökü + kişi eki. Örnek: **wohnen** (oturmak) → wohn-\n| Kişi | Ek | wohnen | sein (olmak) | haben (sahip olmak) |\n|---|---|---|---|---|\n| ich | -e | wohne | **bin** | habe |\n| du | -st | wohnst | **bist** | **hast** |\n| er/sie/es | -t | wohnt | **ist** | **hat** |\n| wir | -en | wohnen | **sind** | haben |\n| ihr | -t | wohnt | **seid** | habt |\n| sie/Sie | -en | wohnen | **sind** | haben |\n\n# Cümle Yapısı\n\nDüz cümlede **fiil ikinci sıradadır**: *Ich **spiele** Fußball. Heute **spiele** ich Fußball.* Evet–hayır sorularında fiil başa gelir: ***Spielst** du Fußball?* — *Ja / Nein.*",
     "ornekler": [
      {
       "soru": "“Benim bir erkek kardeşim var.” cümlesini Almanca yazınız (der Bruder).",
       "cozum": "**Ich habe einen Bruder.** (Haben fiilinin nesnesi eril olduğu için ein → **einen**.)"
      },
      {
       "soru": "“Bu bir okul.” ve “Bu bir okul değil.” cümlelerini yazınız.",
       "cozum": "**Das ist eine Schule.** / **Das ist keine Schule.**"
      }
     ],
     "ozet": [
      "der (eril), die (dişil), das (nötr), çoğulda die; isimler büyük harfle yazılır.",
      "Düzenli fiil ekleri: -e, -st, -t, -en, -t, -en.",
      "sein: bin, bist, ist, sind, seid, sind; haben: habe, hast, hat, haben, habt, haben.",
      "Düz cümlede fiil ikinci sırada, evet–hayır sorusunda başta."
     ]
    }
   }
  ]
 }
];
