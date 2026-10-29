/* =========================================================
   konusma.js — İngilizce Konuşma Pratiği (v1.32)   #/konusma

   Hologram öğretmen İngilizce konuşur, öğrenci sesli cevap verir:
     • Sohbet: senaryoya göre (tanışma, okul, yemek siparişi, çevre…) karşılıklı
       konuşma. Her cevaptan sonra dilbilgisi düzeltmesi, telaffuz ipucu ve puan.
       Yapay zekâ yoksa cihazdaki kurallarla düzeltir, sıradaki soruyu listeden sorar.
     • Telaffuz: öğretmenin okuduğu cümleyi tekrarla; söylenen sözcükler cümleyle
       eşleştirilir, kaçan ya da yanlış anlaşılan sözcükler işaretlenir ve
       Türk öğrencilerin sık zorlandığı seslere (th, w, -ed, sessiz harfler…) göre ipucu verilir.
   Ses: App.speech (Android yerel tanıma / tarayıcı Web Speech / Windows'ta kayıt → yapay zekâ).
   Ses tanıma yoksa cevap yazılabilir. Kayıtlar yalnızca cihazda (prefs) tutulur.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const coarse = () => { try { return matchMedia("(pointer: coarse)").matches; } catch (e) { return false; } };

  /* ---------------- Senaryolar (lise İngilizce temalarıyla uyumlu) ---------------- */
  // s: [ingilizce, türkçe], lv: seviye
  const SCN = [
    { id: "tanisma", e: "👋", n: ["Tanışma", "Meeting people"], d: ["Kendini tanıt, nerelisin, ailen", "Introduce yourself"],
      open: "Hi! I'm your English teacher. What's your name, and where are you from?",
      qs: ["How old are you, and which grade are you in?", "Can you tell me about your family?", "What do you like most about your hometown?", "Who is your best friend, and what is he or she like?"],
      s: [["My name is Elif and I am from Aksaray.", "Benim adım Elif ve Aksaraylıyım.", "A2"], ["I have got two brothers and one sister.", "İki erkek kardeşim ve bir kız kardeşim var.", "A2"], ["Nice to meet you, I have heard a lot about you.", "Tanıştığımıza memnun oldum, hakkında çok şey duydum.", "B1"], ["My hometown is famous for its delicious food.", "Memleketim lezzetli yemekleriyle ünlüdür.", "B1"], ["I would describe myself as a curious and hard-working person.", "Kendimi meraklı ve çalışkan biri olarak tanımlarım.", "B2"]] },
    { id: "okul", e: "🏫", n: ["Okul hayatı", "School life"], d: ["Dersler, öğretmenler, günlük program", "Lessons, teachers, routine"],
      open: "Let's talk about school. How do you usually spend a school day?",
      qs: ["What is your favourite subject, and why?", "What time do you get up on school days?", "What do you usually do during the breaks?", "If you could change one thing about your school, what would it be?"],
      s: [["My favourite subject is physics.", "En sevdiğim ders fizik.", "A2"], ["I usually get up at seven o'clock.", "Genellikle saat yedide kalkarım.", "A2"], ["We have got a test on Thursday, so I need to study.", "Perşembe günü sınavımız var, bu yüzden çalışmam gerekiyor.", "B1"], ["Our teacher always encourages us to ask questions.", "Öğretmenimiz bizi her zaman soru sormaya teşvik eder.", "B1"], ["If I were the headmaster, I would build a bigger library.", "Müdür olsaydım daha büyük bir kütüphane yaptırırdım.", "B2"]] },
    { id: "hobi", e: "🎨", n: ["Boş zaman", "Free time"], d: ["Hobiler, spor, müzik, filmler", "Hobbies, sports, music"],
      open: "What do you like doing in your free time?",
      qs: ["How often do you do that?", "What kind of music or films do you like?", "Have you ever tried a new hobby this year?", "Would you rather spend a weekend outdoors or at home? Why?"],
      s: [["I like playing football with my friends.", "Arkadaşlarımla futbol oynamayı severim.", "A2"], ["I watch a film every weekend.", "Her hafta sonu bir film izlerim.", "A2"], ["I have been learning to play the guitar for two years.", "İki yıldır gitar çalmayı öğreniyorum.", "B1"], ["Reading helps me relax after a busy day.", "Yoğun bir günün ardından okumak rahatlamama yardım eder.", "B1"], ["I'd rather spend my weekends outdoors than stay at home.", "Hafta sonlarımı evde kalmak yerine dışarıda geçirmeyi tercih ederim.", "B2"]] },
    { id: "yemek", e: "☕", n: ["Kafede sipariş", "Ordering food"], d: ["Rol oyunu: öğretmen garson, sen müşterisin", "Role-play: you are the customer"],
      open: "Good afternoon! Welcome to our café. What would you like to order?",
      qs: ["Would you like something to drink with that?", "Do you want it for here or to take away?", "Is there anything you don't eat?", "How was your meal? Would you like the bill?"],
      s: [["Can I have a cheese sandwich, please?", "Peynirli bir sandviç alabilir miyim lütfen?", "A2"], ["I would like a glass of orange juice.", "Bir bardak portakal suyu istiyorum.", "A2"], ["Could you bring me the menu, please?", "Menüyü getirebilir misiniz lütfen?", "B1"], ["Excuse me, there is a mistake in the bill.", "Affedersiniz, hesapta bir hata var.", "B1"], ["I'm allergic to nuts, so could you check the ingredients?", "Kuruyemişe alerjim var, içindekileri kontrol edebilir misiniz?", "B2"]] },
    { id: "seyahat", e: "🧳", n: ["Seyahat ve yol tarifi", "Travel & directions"], d: ["Yurt dışında yol sorma, otel", "Asking the way, hotels"],
      open: "Imagine you are visiting London for the first time. Where would you like to go first, and why?",
      qs: ["How would you get there: by bus, by underground or on foot?", "Excuse me, can you tell me the way to the nearest station?", "What would you pack for a one-week trip?", "Which country would you most like to visit one day?"],
      s: [["Excuse me, where is the train station?", "Affedersiniz, tren istasyonu nerede?", "A2"], ["Go straight and turn left at the traffic lights.", "Düz gidin ve trafik ışıklarından sola dönün.", "A2"], ["How long does it take to get to the museum?", "Müzeye gitmek ne kadar sürer?", "B1"], ["I booked a room for three nights.", "Üç gecelik bir oda ayırttım.", "B1"], ["Travelling abroad broadens your horizons and teaches you patience.", "Yurt dışına seyahat ufkunu genişletir ve sabrı öğretir.", "B2"]] },
    { id: "cevre", e: "🌍", n: ["Çevre", "Environment"], d: ["Geri dönüşüm, iklim, doğa", "Recycling, climate, nature"],
      open: "What can teenagers do to protect the environment?",
      qs: ["Do you recycle at home or at school?", "What is the biggest environmental problem in your city?", "How can we save water in daily life?", "Do you think electric cars will solve the climate problem? Why or why not?"],
      s: [["We should recycle plastic bottles.", "Plastik şişeleri geri dönüştürmeliyiz.", "A2"], ["Turn off the lights when you leave the room.", "Odadan çıkarken ışıkları kapat.", "A2"], ["Air pollution is a serious problem in big cities.", "Hava kirliliği büyük şehirlerde ciddi bir sorundur.", "B1"], ["If everyone planted a tree, the world would be greener.", "Herkes bir ağaç dikse dünya daha yeşil olurdu.", "B1"], ["Global warming threatens wildlife all over the world.", "Küresel ısınma dünyanın her yerinde yaban hayatını tehdit ediyor.", "B2"]] },
    { id: "teknoloji", e: "📱", n: ["Teknoloji ve sosyal medya", "Technology & social media"], d: ["Telefon, internet, yapay zekâ", "Phones, internet, AI"],
      open: "How much time do you spend on your phone every day?",
      qs: ["Which apps do you use the most?", "What are the advantages and disadvantages of social media?", "How do you use technology for studying?", "Do you think artificial intelligence will change schools? How?"],
      s: [["I use my phone to talk to my friends.", "Telefonumu arkadaşlarımla konuşmak için kullanırım.", "A2"], ["I don't spend too much time on social media.", "Sosyal medyada çok fazla zaman geçirmem.", "A2"], ["Technology makes our lives easier, but it can be addictive.", "Teknoloji hayatımızı kolaylaştırır ama bağımlılık yapabilir.", "B1"], ["You should never share your password with anyone.", "Şifreni asla kimseyle paylaşmamalısın.", "B1"], ["Artificial intelligence is changing the way we learn and work.", "Yapay zekâ öğrenme ve çalışma biçimimizi değiştiriyor.", "B2"]] },
    { id: "kariyer", e: "🎓", n: ["Gelecek ve meslek", "Future & careers"], d: ["Üniversite, hayaller, iş görüşmesi", "University, dreams, interviews"],
      open: "What would you like to do after high school?",
      qs: ["Why did you choose that job?", "Which university would you like to go to?", "What skills do you need for that job?", "Where do you see yourself in ten years?"],
      s: [["I want to be a doctor in the future.", "Gelecekte doktor olmak istiyorum.", "A2"], ["I am going to study engineering at university.", "Üniversitede mühendislik okuyacağım.", "A2"], ["I'm interested in computers, so I'd like to be a software developer.", "Bilgisayarlarla ilgileniyorum, bu yüzden yazılımcı olmak isterim.", "B1"], ["Hard work and good communication skills are important in every job.", "Her işte çok çalışmak ve iyi iletişim becerileri önemlidir.", "B1"], ["In ten years, I hope I will have my own company.", "On yıl içinde kendi şirketimin olmasını umuyorum.", "B2"]] },
    { id: "saglik", e: "🏃", n: ["Sağlık ve spor", "Health & sports"], d: ["Beslenme, uyku, egzersiz", "Food, sleep, exercise"],
      open: "What do you do to stay healthy?",
      qs: ["How many hours do you sleep on school nights?", "What did you eat for breakfast this morning?", "Which sport would you like to try?", "Is fast food really that bad? What do you think?"],
      s: [["I drink eight glasses of water every day.", "Her gün sekiz bardak su içerim.", "A2"], ["I go swimming twice a week.", "Haftada iki kez yüzmeye giderim.", "A2"], ["You should eat more fruit and vegetables.", "Daha çok meyve ve sebze yemelisin.", "B1"], ["I haven't been sleeping well because of the exams.", "Sınavlar yüzünden iyi uyuyamıyorum.", "B1"], ["Regular exercise not only keeps you fit but also reduces stress.", "Düzenli egzersiz seni yalnızca formda tutmaz, stresi de azaltır.", "B2"]] },
    { id: "kultur", e: "🎉", n: ["Kutlamalar ve kültürler", "Festivals & cultures"], d: ["Bayramlar, gelenekler, davetler", "Holidays, traditions, invitations"],
      open: "Can you tell me about a festival or holiday that you celebrate?",
      qs: ["What do people usually eat during that holiday?", "How did you celebrate it last year?", "Would you like to come to my birthday party on Saturday?", "Which tradition from another country do you find interesting?"],
      s: [["We visit our grandparents during the holiday.", "Bayramda büyükanne ve büyükbabamızı ziyaret ederiz.", "A2"], ["Thank you for inviting me, I would love to come.", "Davet ettiğin için teşekkürler, gelmeyi çok isterim.", "A2"], ["Children knock on doors and collect sweets.", "Çocuklar kapıları çalıp şeker toplar.", "B1"], ["I'm afraid I can't come because I have an exam.", "Maalesef gelemeyeceğim çünkü sınavım var.", "B1"], ["Learning about other cultures helps us understand each other better.", "Başka kültürleri tanımak birbirimizi daha iyi anlamamıza yardım eder.", "B2"]] },
    { id: "serbest", e: "💬", n: ["Serbest sohbet", "Free talk"], d: ["İstediğin konuda konuş", "Talk about anything"],
      open: "Let's chat! What would you like to talk about today?",
      qs: ["That's interesting. Can you tell me more?", "How did that make you feel?", "What happened next?", "What is something you are proud of this year?"],
      s: [["How was your day?", "Günün nasıl geçti?", "A2"], ["I'm sorry, could you say that again?", "Pardon, tekrar söyleyebilir misiniz?", "A2"], ["What do you mean by that?", "Bununla ne demek istiyorsun?", "B1"], ["I totally agree with you.", "Sana tamamen katılıyorum.", "B1"], ["Although it was difficult, I didn't give up.", "Zor olmasına rağmen pes etmedim.", "B2"]] }
  ];
  const scnOf = (id) => SCN.find((x) => x.id === id) || SCN[0];

  /* ---------------- Metin karşılaştırma (telaffuz) ---------------- */
  const NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const CONTR = { "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is", "she's": "she is", "it's": "it is", "that's": "that is", "there's": "there is", "what's": "what is", "where's": "where is", "let's": "let us",
    "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not", "cannot": "can not", "won't": "will not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "shouldn't": "should not", "couldn't": "could not", "wouldn't": "would not",
    "i'd": "i would", "you'd": "you would", "we'd": "we would", "i'll": "i will", "you'll": "you will", "we'll": "we will", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have", "o'clock": "oclock", "ok": "okay" };
  function words(s) {
    const out = [];
    String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[-–—/]/g, " ").replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).forEach((w) => {
      w = w.replace(/^'+|'+$/g, "");
      if (!w) return;
      if (CONTR[w]) { CONTR[w].split(" ").forEach((x) => out.push(x)); return; }
      if (/^\d+$/.test(w) && +w <= 20) { out.push(NUM[+w]); return; }
      if (/'s$/.test(w)) { out.push(w.slice(0, -2)); return; }   // sahiplik eki: tanıma çoğu zaman düşürür
      out.push(w);
    });
    return out;
  }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 1) return 2;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const near = (a, b) => a === b ? 2 : (a.length >= 5 && b.length >= 5 && lev(a, b) <= 1) ? 1 : 0;
  /** hedef cümle ↔ söylenen: her hedef sözcük için "ok" | "near" | "miss"; puan 0..100 */
  function compare(target, said) {
    const A = words(target), B = words(said);
    const n = A.length, m = B.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
      const k = near(A[i], B[j]);
      L[i][j] = Math.max(L[i + 1][j], L[i][j + 1], k ? L[i + 1][j + 1] + k : 0);
    }
    const marks = new Array(n).fill("miss");
    let i = 0, j = 0, used = 0;
    while (i < n && j < m) {
      const k = near(A[i], B[j]);
      if (k && L[i][j] === L[i + 1][j + 1] + k) { marks[i] = k === 2 ? "ok" : "near"; i++; j++; used++; }
      else if (L[i + 1][j] >= L[i][j + 1]) i++;
      else j++;
    }
    const got = marks.reduce((s, x) => s + (x === "ok" ? 1 : x === "near" ? 0.6 : 0), 0);
    return { words: A, marks, extra: Math.max(0, m - used), score: n ? Math.round((got / n) * 100) : 0 };
  }

  /* ---------------- Telaffuz ipuçları (Türkçe konuşanların sık zorlandığı sesler) ---------------- */
  const SILENT = { hour: "h okunmaz: /aʊər/", honest: "h okunmaz", listen: "t okunmaz: /lɪsən/", castle: "t okunmaz", island: "s okunmaz: /aɪlənd/", wednesday: "ilk d okunmaz: /wenzdeɪ/", know: "k okunmaz", knock: "k okunmaz", knife: "k okunmaz", write: "w okunmaz", wrong: "w okunmaz", climb: "b okunmaz", comb: "b okunmaz", thumb: "b okunmaz", half: "l okunmaz", talk: "l okunmaz", walk: "l okunmaz", could: "l okunmaz: /kʊd/", would: "l okunmaz: /wʊd/", should: "l okunmaz", answer: "w okunmaz", often: "t çoğu zaman okunmaz", foreign: "g okunmaz", daughter: "gh okunmaz", night: "gh okunmaz: /naɪt/", light: "gh okunmaz", right: "gh okunmaz" };
  const SILENT_EN = { hour: "silent h", honest: "silent h", listen: "silent t", castle: "silent t", island: "silent s", wednesday: "first d is silent", know: "silent k", knock: "silent k", knife: "silent k", write: "silent w", wrong: "silent w", climb: "silent b", comb: "silent b", thumb: "silent b", half: "silent l", talk: "silent l", walk: "silent l", could: "silent l", would: "silent l", should: "silent l", answer: "silent w", often: "t is often silent", foreign: "silent g", daughter: "silent gh", night: "silent gh", light: "silent gh", right: "silent gh" };
  const RULES = [
    [/th/, "th: dilinin ucunu dişlerinin arasına koy ve üfle (θ/ð); 't', 'd' ya da 'z' değil.", "th: put your tongue between your teeth (θ/ð), not t, d or z."],
    [/^wh?[aeiouy]/, "w: dudaklarını yuvarla, 'v' gibi alt dudak dişe değmesin (w = 'uv' değil 'u').", "w: round your lips; don't touch your teeth like a v."],
    [/(tion|sion)$/, "-tion/-sion sonu 'şın' / 'jın' gibi okunur.", "-tion/-sion sounds like 'shun'."],
    [/[^aeiou]ed$/, "-ed sonu: p, k, s, ş, ç'den sonra /t/ (worked), t ve d'den sonra /ɪd/ (wanted), diğerlerinde /d/ (played).", "-ed ending: /t/ after voiceless sounds, /ɪd/ after t or d, /d/ elsewhere."],
    [/ng$/, "-ng sonunda 'g' duyulmaz: genizden /ŋ/ (sing = 'sin(g)').", "-ng: no hard g at the end (/ŋ/)."],
    [/(ee|ea)/, "ee/ea çoğunlukla uzun /iː/: 'iii' diye uzat.", "ee/ea is usually a long /iː/."],
    [/ough/, "ough farklı okunur: though /ðoʊ/, through /θruː/, enough /ɪnʌf/, thought /θɔːt/.", "ough varies: though, through, enough, thought."],
    [/^v/, "v: alt dudak üst dişlere değer; 'w' ile karıştırma.", "v: top teeth on bottom lip; different from w."],
    [/r/, "r: dilini titretme, geriye kıvır; kelime sonundaki r (İngiliz aksanında) neredeyse okunmaz.", "r: don't roll it; curl the tongue back."],
    [/a/, "a çoğu sözcükte /æ/ (cat) ya da /ə/ (about) okunur; Türkçe 'a' gibi değil.", "a is often /æ/ or /ə/, not like Turkish a."]
  ];
  function tipFor(w) {
    w = String(w || "").toLowerCase();
    if (SILENT[w]) return T(SILENT[w], SILENT_EN[w]);
    for (const r of RULES) if (r[0].test(w)) return T(r[1], r[2]);
    return "";
  }

  /* ---------------- Cihazda dilbilgisi kuralları (yapay zekâ yoksa ve ek olarak) ---------------- */
  const GR = [
    [/\bi am agree\b/i, "I agree", "agree bir fiildir; 'am' kullanılmaz.", "agree is a verb; no 'am'."],
    [/\b(he|she|it) (have)\b/i, (m) => m[1] + " has", "he/she/it ile have → has.", "he/she/it + has.", 1],
    [/\b(he|she|it) (do|go|like|want|play|watch|live|work|love|read|study|eat|drink|need|know|think)\b(?!\w)/i, (m) => m[1] + " " + (m[2] === "do" ? "does" : m[2] === "go" ? "goes" : m[2] === "study" ? "studies" : m[2] === "watch" ? "watches" : m[2] + "s"), "Geniş zamanda he/she/it ile fiil -s alır.", "Present simple: he/she/it + verb-s.", 1],
    [/\b(he|she|it) don't\b/i, (m) => m[1] + " doesn't", "he/she/it ile don't değil doesn't.", "he/she/it + doesn't."],
    [/\b(we|they|you) was\b/i, (m) => m[1] + " were", "we/they/you ile was değil were.", "we/they/you + were."],
    [/\bpeople is\b/i, "people are", "people çoğuldur: people are.", "people is plural."],
    [/\bpeoples\b/i, "people", "people zaten çoğul; -s almaz.", "people is already plural."],
    [/\bmore (better|worse|easier|bigger|faster|smaller|happier)\b/i, (m) => m[1], "Bu sıfat zaten karşılaştırma hâlinde; 'more' gereksiz.", "Already comparative; drop 'more'."],
    [/\bdid ?n[o']t (went|saw|came|did|had|made|took|ate|bought|wrote|got)\b/i, (m) => "didn't " + ({ went: "go", saw: "see", came: "come", did: "do", had: "have", made: "make", took: "take", ate: "eat", bought: "buy", wrote: "write", got: "get" })[m[1].toLowerCase()], "didn't'ten sonra fiilin yalın hâli gelir.", "After didn't use the base verb."],
    [/\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i, (m) => "on " + m[1][0].toUpperCase() + m[1].slice(1).toLowerCase(), "Günlerden önce in değil on.", "Use on with days."],
    [/\bmake (my |the )?homework\b/i, (m) => "do " + (m[1] || "") + "homework", "Ödev için make değil do: do homework.", "do homework, not make."],
    [/\ba (apple|orange|hour|honest|umbrella|egg|idea|elephant|interesting|old|english)\b/i, (m) => "an " + m[1], "Ünlü sesle başlayan sözcükten önce an.", "Use 'an' before a vowel sound."],
    [/\bexplain me\b/i, "explain to me", "explain + to me.", "explain to me."],
    [/\bdiscuss about\b/i, "discuss", "discuss 'about' almaz.", "discuss takes no 'about'."],
    [/\bmarried with\b/i, "married to", "married to (biriyle evli).", "married to someone."],
    [/\bi have (\d+|\w+teen) years old\b/i, (m) => "I am " + m[1] + " years old", "Yaş söylerken have değil be: I am 16 years old.", "Age uses be: I am 16."]
  ];
  const AUX = /\b(do|does|did|can|could|will|would|should|must|may|might|let|make|makes|made|help|helps|see|saw|hear|heard|watch|to)\s+$/i;
  function localGrammar(text) {
    const errors = [];
    let fixed = String(text || "");
    GR.forEach(([re, rep, tr, en, aux]) => {
      const m = fixed.match(re);
      if (!m) return;
      // "Does he like…", "let it go", "make him go": yardımcı fiilden sonra yalın hâl doğrudur
      if (aux && AUX.test(fixed.slice(0, m.index))) return;
      const right = typeof rep === "function" ? rep(m) : rep;
      errors.push({ wrong: m[0], right, note: T(tr, en) });
      fixed = fixed.replace(re, right);
    });
    return { corrected: fixed, errors };
  }

  /* ---------------- Kayıtlar (cihazda) ---------------- */
  const stats = () => Object.assign({ sessions: 0, turns: 0, scoreSum: 0, drills: 0, drillSum: 0 }, App.prefs.get("ksStats", {}) || {});
  function addStat(k, v) {
    const s = stats();
    if (k === "turn") { s.turns++; s.scoreSum += v; } else if (k === "drill") { s.drills++; s.drillSum += v; } else if (k === "session") s.sessions++;
    s.last = new Date().toISOString();
    App.prefs.set("ksStats", s);
  }
  function addMistakes(list) {
    if (!list || !list.length) return;
    const cur = App.prefs.get("ksMist", []) || [];
    list.forEach((e) => { if (e && e.wrong && e.right && !cur.some((x) => x.wrong.toLowerCase() === String(e.wrong).toLowerCase() && x.right === e.right)) cur.unshift({ wrong: String(e.wrong).slice(0, 120), right: String(e.right).slice(0, 120), note: String(e.note || "").slice(0, 200), at: Date.now() }); });
    App.prefs.set("ksMist", cur.slice(0, 40));
  }
  function addMine(sentence) {
    sentence = String(sentence || "").trim();
    if (!sentence || sentence.split(/\s+/).length < 2) return false;
    const cur = App.prefs.get("ksMine", []) || [];
    if (cur.some((x) => x[0].toLowerCase() === sentence.toLowerCase())) return false;
    cur.unshift([sentence.slice(0, 200), "", ""]);
    App.prefs.set("ksMine", cur.slice(0, 30));
    return true;
  }

  /* ---------------- Yapay zekâ değerlendirmesi ---------------- */
  function sysPrompt(scn, level) {
    const tr = App.i18n.lang !== "en";
    return "You are a warm, encouraging English speaking teacher for Turkish high-school students (CEFR level " + level + "). " +
      "You are having a spoken conversation. Topic/role-play: " + scn.n[1] + " — " + scn.d[1] + ". " +
      "The student's words were produced by speech recognition, so ignore capitalisation and punctuation. If a word does not fit the context it was probably mispronounced: add it to \"pron\" with the word the student most likely meant. " +
      "Correct only real grammar and word-choice mistakes; keep the student's meaning. Reply naturally in simple " + level + " English (max 2 short sentences) and then ask ONE follow-up question that keeps the topic going. " +
      "Return ONLY JSON: {\"reply\":\"...\",\"question\":\"...\",\"corrected\":\"the student's answer rewritten correctly (same if already correct)\",\"errors\":[{\"wrong\":\"exact wrong part\",\"right\":\"correct form\",\"note\":\"short explanation in " + (tr ? "Turkish" : "English") + "\"}],\"pron\":[{\"word\":\"word to practise\",\"tip\":\"short pronunciation tip in " + (tr ? "Turkish" : "English") + "\"}],\"score\":0-100,\"praise\":\"one short encouraging sentence in " + (tr ? "Turkish" : "English") + "\"}. " +
      "score: overall quality for level " + level + " (grammar, vocabulary, completeness). Max 3 errors and 2 pron items. No markdown.";
  }

  /* ---------------- Sayfa ---------------- */
  async function page(view, params) {
    if (params[0] === "de") return App.languagePractice.page(view, "de");
    if (params[0] === "pratik") return App.languagePractice.page(view, "en");
    App.setTitle(T("İngilizce Konuşma Pratiği", "English Speaking Practice"));
    let st = null;                       // aktif oturum
    let holo = null, holoBusy = false;   // hologram sahnesi
    let leaving = false;

    const stopAll = () => {
      if (st && st.rec) { const r = st.rec; st.rec = null; if(r.cancel)r.cancel();else r.stop().catch(() => {}); }
      if (st && st.ctrl) { try { st.ctrl.abort(); } catch (e) { /* yok */ } }
      if (st) clearTimeout(st.timer);
      try { App.speech.stopSaying(); } catch (e) { /* yok */ }
    };
    const dropHolo = () => { if (holo) { App.holoTeacher.detach(holo); holo = null; } };

    function setup() {
      stopAll(); dropHolo(); st = null;
      const s = stats();
      const mode = App.prefs.get("ksMode", "sohbet"), level = App.prefs.get("ksLevel", "A2");
      const mist = App.prefs.get("ksMist", []) || [], mine = App.prefs.get("ksMine", []) || [];
      const stt = App.speech.sttMode();
      view.innerHTML = '<div class="page ks">' + App.languagePractice.choices() + '<div class="page-head"><div><h1>' + esc(T("İngilizce Konuşma Pratiği", "English Speaking Practice")) + '</h1><p class="hint">' +
        esc(T("Hologram öğretmen İngilizce konuşur, sen sesli cevap verirsin; dilbilgisi düzeltmesi, telaffuz ipucu ve puan anında gelir.", "The hologram teacher speaks English and you answer out loud; you get grammar fixes, pronunciation tips and a score right away.")) + "</p></div></div>" +
        (stt ? "" : '<div class="notice ks-note">' + App.icon("info") + "<span>" + esc(T("Bu cihazda ses tanıma yok; cevaplarını yazarak da pratik yapabilirsin. Telaffuz için Chrome/Edge ya da Android uygulamasını kullan.", "Speech recognition isn't available here; you can type your answers. For pronunciation use Chrome/Edge or the Android app.")) + "</span></div>") +
        '<div class="card ks-setup">' +
          '<div class="ks-row"><span class="ks-lab">' + esc(T("Mod", "Mode")) + '</span><div class="yz-seg" role="radiogroup" id="ksMode">' +
            [["sohbet", T("Sohbet", "Conversation"), ""], ["telaffuz", T("Telaffuz", "Pronunciation"), T(" (tekrarla)", " (repeat)")]].map(([k, n, x]) => '<button type="button" role="radio" data-m="' + k + '" aria-checked="' + (k === mode) + '">' + esc(n) + (x ? '<span class="ks-x">' + esc(x) + "</span>" : "") + "</button>").join("") + "</div></div>" +
          '<div class="ks-row"><span class="ks-lab">' + esc(T("Seviye", "Level")) + '</span><div class="yz-seg" role="radiogroup" id="ksLevel">' +
            [["A2", T(" · temel", " · basic")], ["B1", T(" · orta", " · intermediate")], ["B2", T(" · ileri", " · upper")]].map(([k, n]) => '<button type="button" role="radio" data-l="' + k + '" aria-checked="' + (k === level) + '">' + k + '<span class="ks-x">' + esc(n) + "</span></button>").join("") + "</div></div>" +
          '<h2 class="ks-h">' + esc(T("Bir konu seç", "Pick a topic")) + "</h2>" +
          '<div class="ks-grid">' + SCN.map((x) => '<button type="button" class="ks-scn" data-scn="' + x.id + '"><span class="ks-scn__e" aria-hidden="true">' + x.e + '</span><span class="ks-scn__t"><b>' + esc(T(x.n[0], x.n[1])) + "</b><small>" + esc(T(x.d[0], x.d[1])) + "</small></span></button>").join("") +
            (mine.length ? '<button type="button" class="ks-scn ks-scn--mine" data-scn="mine"><span class="ks-scn__e" aria-hidden="true">⭐</span><span class="ks-scn__t"><b>' + esc(T("Benim cümlelerim", "My sentences")) + "</b><small>" + esc(T(mine.length + " düzeltilmiş cümle (telaffuz)", mine.length + " corrected sentences (pronunciation)")) + "</small></span></button>" : "") +
          "</div></div>" +
        '<div class="ks-stats">' +
          '<div class="stat"><b>' + s.sessions + "</b><span>" + esc(T("oturum", "sessions")) + "</span></div>" +
          '<div class="stat"><b>' + s.turns + "</b><span>" + esc(T("konuşma cevabı", "spoken answers")) + "</span></div>" +
          '<div class="stat"><b>' + (s.turns ? Math.round(s.scoreSum / s.turns) : "–") + "</b><span>" + esc(T("ort. sohbet puanı", "avg. conversation score")) + "</span></div>" +
          '<div class="stat"><b>' + (s.drills ? "%" + Math.round(s.drillSum / s.drills) : "–") + "</b><span>" + esc(T("telaffuz doğruluğu", "pronunciation accuracy")) + "</span></div>" +
        "</div>" +
        (mist.length ? '<details class="card ks-mist"><summary>' + esc(T("Son düzeltmelerim (" + mist.length + ")", "My recent corrections (" + mist.length + ")")) + "</summary><ul>" +
          mist.slice(0, 20).map((m) => '<li><s>' + esc(m.wrong) + "</s> → <b>" + esc(m.right) + "</b>" + (m.note ? ' <span class="hint">' + esc(m.note) + "</span>" : "") + "</li>").join("") +
          '</ul><button type="button" class="btn btn--sm" id="ksMistClear">' + App.icon("trash") + esc(T("Listeyi temizle", "Clear list")) + "</button></details>" : "") +
        '<p class="hint ks-privacy">' + App.icon("lock") + esc(T("Sesin cihazında yazıya çevrilir (Windows uygulamasında yapay zekâ servisine gider); kayıtlar yalnızca bu cihazda tutulur.", "Your voice is transcribed on your device (the Windows app sends it to the AI service); records stay on this device.")) + "</p>" +
        "</div>";
      App.hydrateIcons(view);
      view.querySelector("#ksMode").addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (!b) return; App.prefs.set("ksMode", b.dataset.m); view.querySelectorAll("#ksMode [data-m]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); });
      view.querySelector("#ksLevel").addEventListener("click", (e) => { const b = e.target.closest("[data-l]"); if (!b) return; App.prefs.set("ksLevel", b.dataset.l); view.querySelectorAll("#ksLevel [data-l]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); });
      view.querySelector(".ks-grid").addEventListener("click", (e) => { const b = e.target.closest("[data-scn]"); if (b) start(b.dataset.scn); });
      const mc = view.querySelector("#ksMistClear");
      if (mc) mc.addEventListener("click", async () => { if (await App.ui.confirm(T("Düzeltme listesi silinsin mi?", "Clear the corrections list?"))) { App.prefs.set("ksMist", []); setup(); } });
    }

    /* ---------- oturum ---------- */
    function start(scnId) {
      const mine = scnId === "mine";
      const mode = mine ? "telaffuz" : App.prefs.get("ksMode", "sohbet");
      const level = App.prefs.get("ksLevel", "A2");
      const scn = mine ? { id: "mine", e: "⭐", n: ["Benim cümlelerim", "My sentences"], s: App.prefs.get("ksMine", []) || [] } : scnOf(scnId);
      let drills = scn.s.slice();
      if (!mine) {                                        // seviyeye uygun cümleler önce
        const rank = { A2: 0, B1: 1, B2: 2 }[level];
        drills.sort((a, b) => Math.abs({ A2: 0, B1: 1, B2: 2 }[a[2]] - rank) - Math.abs({ A2: 0, B1: 1, B2: 2 }[b[2]] - rank));
      }
      st = { scn, mode, level, phase: "idle", history: [], turns: [], drills, di: 0, results: [], qi: 0, rec: null, timer: 0, ctrl: null, tr: App.prefs.get("ksTr", false), slow: App.prefs.get("ksSlow", false) };
      addStat("session");
      const stt = App.speech.sttMode();
      const holoOk = App.holoTeacher && App.holoTeacher.supported();
      view.innerHTML = '<div class="page ks ks--live"><div class="ks-bar">' +
          '<button type="button" class="btn btn--ghost btn--sm" id="ksBack">' + App.icon("chevronL") + esc(T("Konular", "Topics")) + "</button>" +
          '<div class="ks-bar__t"><span aria-hidden="true">' + scn.e + "</span> <b>" + esc(T(scn.n[0], scn.n[1])) + '</b> <span class="chip">' + esc(mode === "sohbet" ? T("Sohbet", "Conversation") : T("Telaffuz", "Pronunciation")) + " · " + level + "</span></div>" +
          '<div class="ks-bar__r">' +
            (holoOk ? '<button type="button" class="ks-tog" id="ksHolo" aria-pressed="false" title="' + esc(T("Hologram öğretmeni aç/kapat", "Toggle hologram teacher")) + '">✦ ' + esc(T("Hologram", "Hologram")) + "</button>" : "") +
            '<button type="button" class="ks-tog" id="ksSlow" aria-pressed="' + st.slow + '" title="' + esc(T("Öğretmen yavaş konuşsun", "Teacher speaks slowly")) + '">🐢 ' + esc(T("Yavaş", "Slow")) + "</button>" +
            '<button type="button" class="ks-tog" id="ksTr" aria-pressed="' + st.tr + '" title="' + esc(T("Türkçe çeviriyi göster", "Show Turkish translation")) + '">TR</button>' +
            '<button type="button" class="btn btn--sm" id="ksEnd">' + esc(T("Bitir", "Finish")) + "</button>" +
          "</div></div>" +
        '<div class="ks-stage">' +
          '<div class="ks-teacher"><div class="ks-holo" id="ksHoloHost" hidden></div><div class="ks-avatar" id="ksAvatar" aria-hidden="true"><span>🎓</span></div></div>' +
          '<div class="ks-say"><div class="ks-bubble" id="ksBubble" aria-live="polite"></div>' +
            '<div class="ks-say__btns"><button type="button" class="btn btn--sm" id="ksReplay">' + App.icon("volume") + esc(T("Tekrar dinle", "Listen again")) + "</button>" +
            (mode === "sohbet" ? '<button type="button" class="btn btn--sm btn--ghost" id="ksHint">' + App.icon("lightbulb") + esc(T("Ne diyebilirim?", "What can I say?")) + "</button>" : "") + "</div>" +
            '<p class="ks-trl" id="ksTrl" hidden></p></div>' +
        "</div>" +
        '<div class="ks-you">' +
          '<button type="button" class="ks-mic" id="ksMic"' + (stt ? "" : " hidden") + ' aria-label="' + esc(T("Konuş", "Speak")) + '"><span class="ks-mic__ring" aria-hidden="true"></span>' + App.icon("mic") + "</button>" +
          '<p class="ks-status" id="ksStatus" aria-live="polite"></p>' +
          '<p class="ks-heard" id="ksHeard"></p>' +
          '<form class="ks-type" id="ksType"' + (stt ? " hidden" : "") + '><input type="text" id="ksTypeIn" autocomplete="off" spellcheck="false" placeholder="' + esc(T("Cevabını İngilizce yaz…", "Type your answer in English…")) + '" aria-label="' + esc(T("Cevap", "Answer")) + '"><button class="btn btn--primary" type="submit">' + App.icon("send") + "</button></form>" +
          (stt ? '<button type="button" class="ks-typelink" id="ksTypeTog">' + esc(T("Yazarak cevap ver", "Type instead")) + "</button>" : "") +
        "</div>" +
        '<div class="ks-log" id="ksLog"></div>' +
        "</div>";
      App.hydrateIcons(view);
      const $ = (q) => view.querySelector(q);
      $("#ksBack").addEventListener("click", () => setup());
      $("#ksEnd").addEventListener("click", () => finish());
      $("#ksReplay").addEventListener("click", () => { const l = st && (st.mode === "telaffuz" ? (st.drills[st.di] || [])[0] : st.line); if (l) teacherSay(l, true); });
      if ($("#ksHint")) $("#ksHint").addEventListener("click", () => hint());
      $("#ksSlow").addEventListener("click", (e) => { st.slow = !st.slow; App.prefs.set("ksSlow", st.slow); e.currentTarget.setAttribute("aria-pressed", String(st.slow)); });
      $("#ksTr").addEventListener("click", (e) => { st.tr = !st.tr; App.prefs.set("ksTr", st.tr); e.currentTarget.setAttribute("aria-pressed", String(st.tr)); paintTr(); });
      if ($("#ksHolo")) $("#ksHolo").addEventListener("click", () => setHolo(!holo && !holoBusy));
      $("#ksMic").addEventListener("click", () => micTap());
      if ($("#ksTypeTog")) $("#ksTypeTog").addEventListener("click", () => { const f = $("#ksType"); f.hidden = !f.hidden; if (!f.hidden) $("#ksTypeIn").focus(); });
      $("#ksType").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#ksTypeIn").value.trim(); if (!v || !st || st.phase === "thinking") return; $("#ksTypeIn").value = ""; stopListening(true); handleAnswer(v, true); });
      $("#ksLog").addEventListener("click", onLogClick);
      const lowEnd = navigator.deviceMemory && navigator.deviceMemory < 4;
      if (holoOk && App.prefs.get("ksHolo", !lowEnd)) setHolo(true);
      if (mode === "sohbet") { st.line = scn.open; st.lineTr = ""; paintLine(); teacherSay(scn.open); }
      else nextDrill(0);
    }

    function phase(p, msg) {
      if (!st) return;
      st.phase = p;
      if (holo) holo.phase = p === "idle" ? "idle" : p;
      const mic = view.querySelector("#ksMic"), stat = view.querySelector("#ksStatus"), av = view.querySelector("#ksAvatar");
      if (mic) { mic.classList.toggle("is-on", p === "listening"); mic.disabled = p === "thinking"; mic.setAttribute("aria-label", p === "listening" ? T("Bitirdim", "Done") : T("Konuş", "Speak")); }
      if (av) av.className = "ks-avatar is-" + p;
      if (stat) stat.textContent = msg != null ? msg : ({ listening: T("Dinliyorum… bitirince mikrofona dokun", "Listening… tap the mic when done"), thinking: T("Değerlendiriyorum…", "Checking…"), speaking: T("Öğretmen konuşuyor…", "Teacher is speaking…"), idle: T("Cevap vermek için mikrofona dokun", "Tap the mic to answer") })[p] || "";
    }
    function paintLine() {
      const b = view.querySelector("#ksBubble");
      if (!b || !st) return;
      if (st.mode === "telaffuz") {
        const d = st.drills[st.di];
        b.innerHTML = '<span class="ks-prog">' + (st.di + 1) + " / " + st.drills.length + (d[2] ? " · " + d[2] : "") + '</span><span class="ks-target" id="ksTarget">' + esc(d[0]) + "</span>";
      } else b.textContent = st.line || "";
      paintTr();
    }
    async function paintTr() {
      const el = view.querySelector("#ksTrl");
      if (!el || !st) return;
      let txt = "";
      if (st.mode === "telaffuz") txt = (st.drills[st.di] || [])[1] || "";
      else txt = st.lineTr || "";
      el.hidden = !st.tr || App.i18n.lang === "en";
      if (el.hidden) return;
      if (!txt && st.mode === "sohbet" && st.line) {
        el.textContent = T("Çevriliyor…", "Translating…");
        const line = st.line;
        try {
          const r = await App.ai.generate({ system: "Translate the English text into natural Turkish. Return ONLY JSON: {\"tr\":\"...\"}", prompt: line, temperature: 0.2 });
          if (st && st.line === line) { st.lineTr = (r.data && r.data.tr) || ""; el.textContent = st.lineTr; }
        } catch (e) { if (st && st.line === line) el.textContent = T("Çeviri için yapay zekâ bağlantısı gerekiyor.", "Translation needs the AI connection."); }
        return;
      }
      el.textContent = txt || T("(Çeviri yok)", "(No translation)");
    }

    function teacherSay(text, manual) {
      if (!st || !text) return;
      stopListening(true);
      if (!App.speech.ttsAvailable() || !App.speech.hasVoice("en")) {
        phase("idle", App.speech.ttsAvailable() ? T("Cihazında İngilizce ses yok; metni oku ve cevap ver. (Ayarlar → Dil → İngilizce ses paketi)", "No English voice on this device; read the text and answer.") : T("Sesli okuma bu cihazda yok; metni oku ve cevap ver.", "Text-to-speech isn't available; read and answer."));
        return;
      }
      phase("speaking");
      const cur = st;
      App.speech.say(text, {
        lang: "en", rate: st.slow ? 0.75 : 0.95, natural: true,
        onWord: () => { if (holo) holo.wordAt = performance.now(); },
        onEnd: () => { if (st === cur && st.phase === "speaking") phase("idle"); },
        onError: () => { if (st === cur && st.phase === "speaking") phase("idle", T("Ses çalınamadı; metni okuyup cevap ver.", "Couldn't play audio; read and answer.")); }
      });
      if (manual) App.prefs.set("ksReplays", (App.prefs.get("ksReplays", 0) || 0) + 1);
    }

    /* ---------- dinleme ---------- */
    function micTap() {
      if (!st) return;
      if (st.phase === "listening") { finishListening(); return; }
      if (st.phase === "thinking") return;
      App.speech.stopSaying();
      listen();
    }
    function listen() {
      const cur = st;
      let finalText = "";
      st.heardNow = "";
      phase("listening");
      setHeard("");
      const arm = (ms) => { clearTimeout(cur.timer); cur.timer = setTimeout(() => { if (st === cur && st.phase === "listening") finishListening(); }, ms); };
      st.rec = App.speech.listen({
        lang: "en",
        onPartial: (p) => { if (st !== cur) return; st.heardNow = (finalText ? finalText + " " : "") + p; setHeard(st.heardNow, true); arm(2600); },
        onFinal: (piece, full) => { if (st !== cur) return; finalText = full; st.heardNow = full; setHeard(full, true); arm(1700); },
        onLevel: (v) => { if (st !== cur) return; const m = view.querySelector("#ksMic"); if (m) m.style.setProperty("--lvl", String(v)); if (holo) holo.mic = Number(v) || 0; },
        onError: (code) => {
          if (st !== cur) return;
          clearTimeout(cur.timer); st.rec = null;
          phase("idle", App.media.errorMessage(code));
          if (code !== "error") { const f = view.querySelector("#ksType"); if (f) f.hidden = false; }
        }
      });
      if (App.speech.sttMode() === "record") { arm(45000); phase("listening", T("Kaydediyorum… bitirince mikrofona dokun", "Recording… tap the mic when done")); }
      else arm(9000);                                     // hiç ses gelmezse
    }
    async function finishListening() {
      if (!st || !st.rec) return;
      const cur = st, rec = st.rec; st.rec = null; clearTimeout(cur.timer);
      phase("thinking", T("Dinlediklerimi yazıya döküyorum…", "Transcribing…"));
      const out = await rec.stop().catch(() => ({ text: "" }));
      if (st !== cur || leaving) return;
      const text = String(out.text || st.heardNow || "").trim();
      if (!text) { phase("idle", T("Bir şey duyamadım. Mikrofona dokunup tekrar dene.", "I didn't hear anything. Tap the mic and try again.")); return; }
      handleAnswer(text, false);
    }
    function stopListening(silent) {
      if (!st) return;
      clearTimeout(st.timer);
      if (st.rec) { const r = st.rec; st.rec = null; if(r.cancel)r.cancel();else r.stop().catch(() => {}); if (!silent) phase("idle"); }
    }
    function setHeard(t, live) {
      const h = view.querySelector("#ksHeard");
      if (h) { h.textContent = t ? "“" + t + "”" : ""; h.classList.toggle("is-live", !!live); }
    }

    /* ---------- cevabı değerlendir ---------- */
    async function handleAnswer(text, typed) {
      if (!st) return;
      setHeard(text);
      if (st.mode === "telaffuz" || st.inline) return drillResult(text, typed);
      const cur = st;
      phase("thinking");
      const turn = { q: st.line, a: text, typed, at: Date.now() };
      const loc = localGrammar(text);
      let r = null, ai = false;
      st.ctrl = new AbortController();
      try {
        const res = await App.ai.generate({
          system: sysPrompt(st.scn, st.level),
          prompt: "Conversation so far:\n" + st.history.slice(-6).map((h) => (h.role === "t" ? "Teacher: " : "Student: ") + h.text).join("\n") +
            "\nTeacher: " + st.line + "\nStudent" + (typed ? " (typed)" : " (spoken)") + ": " + text,
          temperature: 0.4, signal: st.ctrl.signal
        });
        r = res && res.data; ai = !!(r && (r.reply || r.question));
        turn.model = res && res.model;
      } catch (e) {
        if (st !== cur || (e && (e.code === "aborted" || e.name === "AbortError"))) return;
      }
      if (st !== cur || leaving) return;
      if (!ai) {
        const qs = st.scn.qs || [];
        r = { reply: pick(["Thank you!", "Great, thanks for telling me.", "I see.", "Nice!", "Interesting!"]), question: qs[st.qi++ % Math.max(1, qs.length)] || "Can you tell me more?", corrected: loc.corrected, errors: loc.errors, pron: [], score: null, praise: "" };
      } else {
        // cihazdaki kuralların yakaladığı ama yapay zekânın atladığı hataları da ekle
        r.errors = Array.isArray(r.errors) ? r.errors.filter((x) => x && x.wrong && x.right) : [];
        loc.errors.forEach((e) => { if (!r.errors.some((x) => String(x.wrong).toLowerCase().indexOf(e.wrong.toLowerCase()) >= 0)) r.errors.push(e); });
        r.pron = Array.isArray(r.pron) ? r.pron.filter((x) => x && x.word).slice(0, 3) : [];
        r.score = Math.max(0, Math.min(100, Math.round(Number(r.score)))) ;
        if (!isFinite(r.score)) r.score = null;
      }
      // tanıma güvenilir değilse yazılmış cümlenin sözcükleri için yerel telaffuz ipucu
      if (!typed) r.pron.forEach((p) => { if (!p.tip) p.tip = tipFor(p.word); });
      turn.r = r; turn.ai = ai;
      st.turns.push(turn);
      st.history.push({ role: "t", text: st.line }, { role: "s", text });
      if (r.score != null) addStat("turn", r.score);
      addMistakes(r.errors);
      renderTurn(turn, st.turns.length - 1);
      const next = [r.reply, r.question].filter(Boolean).join(" ").trim();
      st.line = next || "Can you tell me more?"; st.lineTr = "";
      paintLine();
      teacherSay(st.line);
      if (!ai && !st.warned) { st.warned = true; App.ui.toast(T("Yapay zekâ bağlantısı yok: düzeltmeler cihazdaki kurallarla yapılıyor, sorular listeden geliyor.", "No AI connection: corrections use on-device rules and questions come from a list.")); }
    }
    const pick = (a) => a[Math.floor(Math.random() * a.length)];

    function diffHtml(a, b) {
      // düzeltilmiş cümlede değişen sözcükleri vurgula
      const A = String(a || "").split(/\s+/), B = String(b || "").split(/\s+/);
      const na = A.map((w) => w.toLowerCase().replace(/[^a-z0-9']/g, "")), nb = B.map((w) => w.toLowerCase().replace(/[^a-z0-9']/g, ""));
      const n = na.length, m = nb.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = na[i] === nb[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      const keep = new Set(); let i = 0, j = 0;
      while (i < n && j < m) { if (na[i] === nb[j]) { keep.add(j); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
      return B.map((w, k) => keep.has(k) ? esc(w) : "<ins>" + esc(w) + "</ins>").join(" ");
    }

    function renderTurn(turn, idx) {
      const log = view.querySelector("#ksLog");
      if (!log) return;
      const r = turn.r, same = !r.corrected || r.corrected.trim().toLowerCase().replace(/[.!?,]/g, "") === turn.a.trim().toLowerCase().replace(/[.!?,]/g, "");
      const sc = r.score;
      const el = document.createElement("article");
      el.className = "card ks-turn";
      el.dataset.i = idx;
      el.innerHTML = '<div class="ks-turn__q"><span class="ks-who">' + esc(T("Öğretmen", "Teacher")) + "</span>" + esc(turn.q) + "</div>" +
        '<div class="ks-turn__a"><span class="ks-who">' + esc(T("Sen", "You")) + (turn.typed ? " ⌨" : " 🎤") + "</span>" + esc(turn.a) +
          (sc != null ? '<span class="ks-score ks-score--' + (sc >= 80 ? "ok" : sc >= 55 ? "mid" : "low") + '" title="' + esc(T("Puan", "Score")) + '">' + sc + "</span>" : "") + "</div>" +
        (same ? '<p class="ks-ok">' + App.icon("checkCircle") + esc(r.praise || T("Dilbilgisi doğru, harika!", "Grammar is correct, great!")) + "</p>"
          : '<div class="ks-fix"><span class="ks-lab">' + esc(T("Doğrusu", "Better")) + '</span><p class="ks-fix__s">' + diffHtml(turn.a, r.corrected) + "</p>" +
            '<button type="button" class="btn btn--sm" data-ks="practice">' + App.icon("mic") + esc(T("Bu cümleyi söyleyerek çalış", "Practise saying it")) + "</button></div>" +
            (r.praise ? '<p class="hint">' + esc(r.praise) + "</p>" : "")) +
        (r.errors && r.errors.length ? '<ul class="ks-errs">' + r.errors.slice(0, 4).map((e) => "<li><s>" + esc(e.wrong) + "</s> → <b>" + esc(e.right) + "</b>" + (e.note ? " <span>" + esc(e.note) + "</span>" : "") + "</li>").join("") + "</ul>" : "") +
        (r.pron && r.pron.length ? '<div class="ks-pron"><span class="ks-lab">' + esc(T("Telaffuz", "Pronunciation")) + "</span>" + r.pron.map((p) => '<button type="button" class="ks-word" data-say="' + esc(p.word) + '">' + App.icon("volume") + esc(p.word) + "</button>" + (p.tip ? '<span class="ks-tip">' + esc(p.tip) + "</span>" : "")).join("") + "</div>" : "") +
        (!turn.ai ? '<p class="hint ks-offline">' + esc(T("Cihazdaki kurallarla kontrol edildi (yapay zekâ bağlı değil).", "Checked with on-device rules (AI not connected).")) + "</p>" : "");
      App.hydrateIcons(el);
      log.prepend(el);
    }

    function onLogClick(e) {
      const say = e.target.closest("[data-say]");
      if (say) { App.speech.say(say.dataset.say, { lang: "en", rate: 0.8 }); return; }
      const b = e.target.closest("[data-ks]");
      if (!b || !st) return;
      if (b.dataset.ks === "practice") {
        const t = st.turns[+b.closest(".ks-turn").dataset.i];
        if (!t) return;
        const added = addMine(t.r.corrected);
        drillInline(t.r.corrected, b);
        if (added) App.ui.toast(T("“Benim cümlelerim” listesine eklendi.", "Added to “My sentences”."));
      } else if (b.dataset.ks === "next") nextDrill(st.di + 1);
      else if (b.dataset.ks === "retry") { const c = b.closest(".ks-turn"); if (c.dataset.inline) { st.inline = c.dataset.inline; st.prevLine = st.line; } c.remove(); App.speech.stopSaying(); listen(); }
    }

    /* ---------- sohbet içinde tek cümle telaffuz çalışması ---------- */
    function drillInline(sentence, btn) {
      if (!st) return;
      st.inline = sentence;
      st.prevLine = st.line;
      const box = btn.closest(".ks-fix");
      if (box) box.insertAdjacentHTML("beforeend", '<p class="hint ks-inline-hint">' + esc(T("Öğretmen okuyacak, sonra mikrofona dokunup aynı cümleyi söyle.", "Listen, then tap the mic and say the same sentence.")) + "</p>");
      teacherSay(sentence);
      phase(st.phase, T("Dinle, sonra mikrofona dokunup cümleyi tekrarla", "Listen, then tap the mic and repeat"));
    }

    /* ---------- telaffuz modu ---------- */
    function nextDrill(i) {
      if (!st) return;
      if (i >= st.drills.length) { finish(); return; }
      st.di = i;
      paintLine();
      setHeard("");
      const old = view.querySelector(".ks-result"); if (old) old.remove();
      teacherSay(st.drills[i][0]);
    }
    function wordsHtml(cmp, original) {
      // görünür sözcükler (noktalama korunur) ile karşılaştırma sözcüklerini eşleştir
      const vis = String(original).split(/\s+/);
      let k = 0;
      return vis.map((w) => {
        const ws = words(w);
        if (!ws.length) return esc(w);
        const ms = ws.map(() => cmp.marks[k++] || "miss");
        const m = ms.every((x) => x === "ok") ? "ok" : ms.some((x) => x !== "miss") ? "near" : "miss";
        return '<span class="ks-w ks-w--' + m + '"' + (m !== "ok" ? ' data-say="' + esc(w.replace(/[^A-Za-z'’-]/g, "")) + '" role="button" tabindex="0"' : "") + ">" + esc(w) + "</span>";
      }).join(" ");
    }
    function drillResult(text, typed) {
      const inline = st.inline;
      const target = inline || st.drills[st.di][0];
      const cmp = compare(target, text);
      st.inline = null;
      if (!typed) addStat("drill", cmp.score);
      const misses = [];
      const vis = target.split(/\s+/);
      let k = 0;
      vis.forEach((w) => { const ws = words(w); const ms = ws.map(() => cmp.marks[k++]); if (ms.some((x) => x !== "ok")) { const clean = w.replace(/[^A-Za-z'’-]/g, ""); const tip = tipFor(clean); if (clean && !misses.some((x) => x.w === clean)) misses.push({ w: clean, tip }); } });
      if (!inline) st.results.push({ s: target, said: text, score: cmp.score, typed });
      const verdict = cmp.score >= 90 ? T("Mükemmel! 🎉", "Excellent! 🎉") : cmp.score >= 70 ? T("Çok iyi, birkaç sözcüğe dikkat.", "Very good, watch a few words.") : cmp.score >= 40 ? T("Fena değil; işaretli sözcükleri dinleyip tekrar dene.", "Not bad; listen to the marked words and retry.") : T("Tekrar deneyelim: önce yavaş dinle.", "Let's try again: listen slowly first.");
      const el = document.createElement("article");
      el.className = "card ks-turn ks-result";
      if (inline) el.dataset.inline = target;
      el.innerHTML = '<div class="ks-res__head"><span class="ks-score ks-score--' + (cmp.score >= 80 ? "ok" : cmp.score >= 55 ? "mid" : "low") + '">%' + cmp.score + "</span><b>" + esc(verdict) + "</b></div>" +
        '<p class="ks-res__s">' + wordsHtml(cmp, target) + "</p>" +
        '<p class="hint">' + esc(T("Duyulan: ", "Heard: ")) + "“" + esc(text) + "”" + (typed ? " · " + esc(T("yazılarak girildi, telaffuz ölçülmedi", "typed, pronunciation not measured")) : "") + "</p>" +
        (misses.length ? '<ul class="ks-errs ks-tips">' + misses.slice(0, 4).map((m) => '<li><button type="button" class="ks-word" data-say="' + esc(m.w) + '">' + App.icon("volume") + esc(m.w) + "</button>" + (m.tip ? " <span>" + esc(m.tip) + "</span>" : "") + "</li>").join("") + "</ul>" : "") +
        '<div class="ks-res__btns"><button type="button" class="btn btn--sm" data-ks="retry">' + App.icon("refresh") + esc(T("Tekrar dene", "Try again")) + "</button>" +
          (inline ? "" : '<button type="button" class="btn btn--primary btn--sm" data-ks="next">' + esc(st.di + 1 >= st.drills.length ? T("Bitir", "Finish") : T("Sonraki cümle", "Next sentence")) + App.icon("chevron") + "</button>") + "</div>";
      App.hydrateIcons(el);
      view.querySelector("#ksLog").prepend(el);
      el.querySelectorAll(".ks-w[data-say]").forEach((w) => w.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); w.click(); } }));
      if (inline) { st.line = st.prevLine; paintLine(); phase("idle", T("Sohbete devam etmek için mikrofona dokun", "Tap the mic to continue the conversation")); }
      else phase("idle", cmp.score >= 70 ? T("Sonraki cümleye geçebilirsin", "You can go to the next sentence") : T("İşaretli sözcüklere dokunup dinle, sonra tekrar dene", "Tap the marked words to hear them, then retry"));
    }

    async function hint() {
      if (!st || st.phase === "thinking") return;
      const b = view.querySelector("#ksHint"); if (b) b.disabled = true;
      try {
        const r = await App.ai.generate({ system: "You help a Turkish high-school student (CEFR " + st.level + ") answer a question in English. Return ONLY JSON: {\"ideas\":[\"three short example answers in simple " + st.level + " English\"]}", prompt: st.line, temperature: 0.7 });
        const ideas = (r.data && Array.isArray(r.data.ideas) ? r.data.ideas : []).slice(0, 3);
        if (ideas.length) App.ui.modal({ title: T("Örnek cevaplar", "Example answers"), body: '<p class="hint">' + esc(T("Birini seç ya da kendi cümleni kur; sonra mikrofona dokunup söyle.", "Pick one or make your own, then tap the mic and say it.")) + '</p><ul class="ks-ideas">' + ideas.map((x) => '<li><button type="button" class="ks-word" data-say="' + esc(x) + '">' + App.icon("volume") + "</button> " + esc(x) + "</li>").join("") + "</ul>",
          onMount: (api) => { App.hydrateIcons(api.el); api.el.addEventListener("click", (e) => { const s = e.target.closest("[data-say]"); if (s) App.speech.say(s.dataset.say, { lang: "en", rate: 0.85 }); }); } });
      } catch (e) {
        const starters = ["I think…", "In my opinion…", "Usually, I…", "My favourite… is… because…", "I'm not sure, but…"];
        App.ui.modal({ title: T("Cümle başlangıçları", "Sentence starters"), body: '<ul class="ks-ideas">' + starters.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" });
      } finally { if (b) b.disabled = false; }
    }

    /* ---------- bitiş özeti ---------- */
    function finish() {
      if (!st) return;
      const cur = st;
      stopAll(); dropHolo();
      const conv = cur.mode === "sohbet";
      const scored = conv ? cur.turns.filter((t) => t.r.score != null) : cur.results.filter((r) => !r.typed);
      const avg = scored.length ? Math.round(scored.reduce((s, x) => s + (conv ? x.r.score : x.score), 0) / scored.length) : null;
      const errs = conv ? [].concat(...cur.turns.map((t) => t.r.errors || [])) : [];
      const prons = conv ? [].concat(...cur.turns.map((t) => t.r.pron || [])) : [];
      const weak = conv ? [] : cur.results.filter((r) => r.score < 70);
      st = null;
      view.innerHTML = '<div class="page ks"><div class="card ks-sum"><h1>' + esc(T("Oturum özeti", "Session summary")) + "</h1>" +
        '<p class="hint">' + esc(T(cur.scn.n[0], cur.scn.n[1])) + " · " + cur.level + " · " + esc(conv ? T(cur.turns.length + " cevap", cur.turns.length + " answers") : T(cur.results.length + " cümle", cur.results.length + " sentences")) + "</p>" +
        (avg != null ? '<div class="ks-sum__big"><span class="ks-score ks-score--' + (avg >= 80 ? "ok" : avg >= 55 ? "mid" : "low") + '">' + (conv ? "" : "%") + avg + "</span><span>" + esc(conv ? T("ortalama puan", "average score") : T("telaffuz doğruluğu", "pronunciation accuracy")) + "</span></div>" : "") +
        (errs.length ? "<h2>" + esc(T("Düzeltmeler", "Corrections")) + '</h2><ul class="ks-errs">' + errs.slice(0, 8).map((e) => "<li><s>" + esc(e.wrong) + "</s> → <b>" + esc(e.right) + "</b>" + (e.note ? " <span>" + esc(e.note) + "</span>" : "") + "</li>").join("") + "</ul>" : (conv && cur.turns.length ? '<p class="ks-ok">' + App.icon("checkCircle") + esc(T("Dilbilgisi hatası bulunmadı.", "No grammar mistakes found.")) + "</p>" : "")) +
        (prons.length ? "<h2>" + esc(T("Çalışılacak sözcükler", "Words to practise")) + '</h2><div class="ks-pron">' + prons.slice(0, 8).map((p) => '<button type="button" class="ks-word" data-say="' + esc(p.word) + '">' + App.icon("volume") + esc(p.word) + "</button>").join("") + "</div>" : "") +
        (weak.length ? "<h2>" + esc(T("Tekrar çalış", "Practise again")) + '</h2><ul class="ks-errs">' + weak.map((r) => '<li><button type="button" class="ks-word" data-say="' + esc(r.s) + '">' + App.icon("volume") + "</button> " + esc(r.s) + ' <span>%' + r.score + "</span></li>").join("") + "</ul>" : "") +
        '<div class="ks-res__btns"><button type="button" class="btn" id="ksAgain">' + App.icon("refresh") + esc(T("Aynı konuyu tekrarla", "Same topic again")) + '</button><button type="button" class="btn btn--primary" id="ksTopics">' + esc(T("Başka konu seç", "Pick another topic")) + "</button></div>" +
        "</div></div>";
      App.hydrateIcons(view);
      view.querySelector(".ks-sum").addEventListener("click", (e) => { const s = e.target.closest("[data-say]"); if (s) App.speech.say(s.dataset.say, { lang: "en", rate: 0.85 }); });
      view.querySelector("#ksAgain").addEventListener("click", () => { if (cur.scn.id === "mine") start("mine"); else { App.prefs.set("ksMode", cur.mode); start(cur.scn.id); } });
      view.querySelector("#ksTopics").addEventListener("click", () => setup());
    }

    /* ---------- hologram ---------- */
    async function setHolo(on) {
      const btn = view.querySelector("#ksHolo"), host = view.querySelector("#ksHoloHost"), av = view.querySelector("#ksAvatar");
      App.prefs.set("ksHolo", !!on);
      if (btn) btn.setAttribute("aria-pressed", String(!!on));
      if (!on) { dropHolo(); if (host) { host.hidden = true; host.innerHTML = ""; } if (av) av.hidden = false; return; }
      if (!host || holoBusy) return;
      holoBusy = true;
      host.hidden = false; if (av) av.hidden = true;
      try {
        const sc = await App.holoTeacher.attach(host, { src: coarse() ? "tilt" : "mouse" });
        if (!sc) return;
        if (!host.isConnected || !st || App.prefs.get("ksHolo", true) === false) { App.holoTeacher.detach(sc); return; }
        holo = sc; holo.phase = st.phase;
      } catch (e) {
        host.hidden = true; if (av) av.hidden = false;
        if (btn) btn.setAttribute("aria-pressed", "false");
      } finally { holoBusy = false; }
    }

    setup();
    const want = params && params[0];
    if (want && (want === "mine" ? (App.prefs.get("ksMine", []) || []).length : SCN.some((x) => x.id === want))) {
      if (params[1] === "sohbet" || params[1] === "telaffuz") App.prefs.set("ksMode", params[1]);
      start(want);
    }
    return () => { leaving = true; stopAll(); dropHolo(); st = null; };
  }

  /* ---------- İngilizce konu sayfası kartı: temaya uygun senaryo ---------- */
  const THEME = [[/well-?being|health|sport/i, "saglik"], [/school|classroom|education/i, "okul"], [/nature|global problem|energy|environment/i, "cevre"],
    [/culture|world|festival|celebrat/i, "kultur"], [/city|country|travel|neighbourhood|social/i, "seyahat"], [/news|technolog|media/i, "teknoloji"],
    [/universe|future|career|job/i, "kariyer"], [/music|film|movie|coming soon|free time|hobb/i, "hobi"], [/food|meal|restaurant/i, "yemek"],
    [/personal|family|home|friend|psycholog|favou?r/i, "tanisma"]];
  function scenarioFor(unitName) {
    const n = String(unitName || "");
    for (const [re, id] of THEME) if (re.test(n)) return id;
    return "serbest";
  }
  function cardHtml(unit) {
    const name = unit && unit.name ? (unit.name.en || unit.name.tr || "") : "";
    const sc = scnOf(scenarioFor(name));
    return '<section class="card lesson__section ks-lesson"><h2>' + App.icon("sLang") + esc(T("Bu temayı konuşarak çalış", "Practise this theme by speaking")) + "</h2>" +
      '<p class="hint">' + esc(T("Hologram öğretmenle İngilizce konuş; dilbilgisi ve telaffuz geri bildirimi al.", "Talk with the hologram teacher in English and get grammar and pronunciation feedback.")) + "</p>" +
      '<div class="ks-lesson__btns"><a class="btn btn--primary btn--sm" href="#/konusma/' + sc.id + '/sohbet">' + sc.e + " " + esc(T(sc.n[0], sc.n[1])) + " · " + esc(T("Sohbet", "Conversation")) + "</a>" +
      '<a class="btn btn--sm" href="#/konusma/' + sc.id + '/telaffuz">' + esc(T("Telaffuz", "Pronunciation")) + "</a>" +
      '<a class="btn btn--ghost btn--sm" href="#/konusma">' + esc(T("Tüm konular", "All topics")) + "</a></div></section>";
  }

  App.router.register("konusma", page);
  App.konusma = { compare, words, localGrammar, tipFor, scenarios: SCN, scenarioFor, cardHtml };
})();
