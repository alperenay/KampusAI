/* =========================================================
   motivasyon.js — Günün notu (her gün değişen kısa motivasyon notları)
   Notların hepsi bu uygulama için yazılmıştır. [tr, en]
   App.motivation.today() → { tr, en, text, index }
   ========================================================= */
(function () {
  const NOTES = [
    ["Bugün tek bir konuyu gerçekten anlamak, on konuya göz gezdirmekten değerlidir.", "Truly understanding one topic today is worth more than skimming ten."],
    ["Yanlış yaptığın her soru, sınavda bir daha yapmayacağın bir hatadır. Defterine yaz, geç.", "Every question you miss now is a mistake you won't make on exam day. Note it and move on."],
    ["Motivasyon gelip gider; alışkanlık kalır. Bugün sadece masaya otur, gerisi gelir.", "Motivation comes and goes; habits stay. Just sit down today, the rest will follow."],
    ["Kimseyle yarışmıyorsun; dünkü kendinden bir adım önde olman yeterli.", "You're not racing anyone; one step ahead of yesterday's you is enough."],
    ["Zor gelen konu, henüz yeterince tekrar etmediğin konudur. Bir tur daha.", "A hard topic is just one you haven't repeated enough yet. One more round."],
    ["25 dakika odaklan, 5 dakika nefes al. Büyük işler küçük turlardan oluşur.", "Focus for 25 minutes, breathe for 5. Big things are made of small rounds."],
    ["Bir denemenin netleri seni tanımlamaz; ondan ne öğrendiğin tanımlar.", "One mock exam's score doesn't define you; what you learn from it does."],
    ["Bugün yorgunsan hafif çalış ama bırakma. Zinciri koparmamak, hızdan önemlidir.", "If you're tired, study lightly but don't stop. Keeping the chain matters more than speed."],
    ["Anlamadığın yeri sormak cesarettir. Asistana, öğretmenine, arkadaşına sor.", "Asking about what you don't get is courage. Ask the assistant, a teacher, a friend."],
    ["Uyku da çalışmanın parçası: beyin öğrendiklerini gece yerine koyar.", "Sleep is part of studying: your brain files what you learned at night."],
    ["Paragraf sorularında acele değil, ritim kazandırır. Her gün birkaç tane yeter.", "In reading questions rhythm beats rushing. A few every day is enough."],
    ["Kendine \"yapamam\" değil, \"henüz yapamıyorum\" de. Aradaki fark bir kelime ve çok emek.", "Say \"I can't yet\", not \"I can't\". The difference is one word and a lot of work."],
    ["Telefonu başka odaya bırakmak, en ucuz odaklanma yöntemidir.", "Leaving your phone in another room is the cheapest focus trick there is."],
    ["Bugün bir formülü ezberleme; nereden geldiğini anla. Unutsan bile yeniden kurarsın.", "Don't just memorise a formula today; understand where it comes from. You can rebuild it if you forget."],
    ["Küçük bir ilerleme de ilerlemedir. Bugün 10 soru, yarın 12.", "Small progress is still progress. Ten questions today, twelve tomorrow."],
    ["Planın bozulduysa planı suçlama; yeniden kur ve devam et.", "If the plan broke, don't blame it; rebuild it and carry on."],
    ["Tekrar, öğrenmenin sıkıcı ama en sadık arkadaşıdır.", "Review is learning's most boring and most loyal friend."],
    ["Sınav bir maraton; bugün sadece önündeki kilometreyi koş.", "The exam is a marathon; today, just run the kilometre in front of you."],
    ["Mükemmel bir gün bekleme. Ortalama bir günde yapılan iş de sayılır.", "Don't wait for a perfect day. Work done on an average day counts too."],
    ["Bir soruda takıldıysan işaretle ve geç; sonra döndüğünde gözün açılmış olur.", "Stuck on a question? Mark it and move on; you'll see it fresh when you come back."],
    ["Bugün zayıf olduğun bir konudan başla. En büyük net artışı oradan gelir.", "Start with a weak topic today. That's where the biggest gains are."],
    ["Su iç, biraz yürü, sonra masaya dön. Beden de beyin kadar çalışıyor.", "Drink water, take a short walk, then come back. Your body works as hard as your brain."],
    ["Başkalarının ne kadar çalıştığını değil, senin ne kadar anladığını ölç.", "Measure how much you understood, not how much others studied."],
    ["Konuyu birine anlatabiliyorsan gerçekten öğrenmişsin. Bugün bir konuyu yüksek sesle anlat.", "If you can explain it to someone, you've learned it. Explain a topic out loud today."],
    ["Hata yapmaktan korkma; hata yapmadan çalışmak, sadece okumaktır.", "Don't fear mistakes; studying without them is just reading."],
    ["Bugünün hedefi büyük olmak zorunda değil, net olmak zorunda.", "Today's goal doesn't have to be big, it has to be clear."],
    ["Dinlenmek pes etmek değildir; yeniden başlamak için güç toplamaktır.", "Resting isn't quitting; it's gathering strength to start again."],
    ["Her çözdüğün soru, sınav salonundaki sakinliğine yapılmış bir yatırımdır.", "Every question you solve is an investment in your calm on exam day."],
    ["Bugün kendine bir küçük ödül sözü ver: hedefi bitirince en sevdiğin şarkı.", "Promise yourself a small reward today: your favourite song when you hit the goal."],
    ["Zihnin dağıldıysa son öğrendiğin üç şeyi kâğıda yaz. Odak geri gelir.", "Mind wandering? Write down the last three things you learned. Focus comes back."],
    ["Çalışma masanı topla; düzenli bir masa, düzenli bir zihne kapı açar.", "Tidy your desk; a clear desk opens the door to a clear mind."],
    ["Bir konuyu bitirmek değil, bir konuyu oturtmak hedefin olsun.", "Aim to settle a topic, not just to finish it."],
    ["Sınav kaygısı, önemsediğinin işaretidir. Onu hazırlığa çevir.", "Exam anxiety means you care. Turn it into preparation."],
    ["Dün kötü geçtiyse bugün yeni bir sayfa. Takvim her sabah sıfırlanır.", "If yesterday went badly, today is a new page. The calendar resets every morning."],
    ["Yavaş ama düzenli giden, hızlı ama düzensiz gidenden önce varır.", "Slow and steady arrives before fast and erratic."],
    ["Bugün bir hap kart destesini bitir; küçük tekrarlar büyük farklar yaratır.", "Finish one flashcard deck today; small reviews make big differences."],
    ["Soruyu okurken altını çiz: ne veriliyor, ne isteniyor? Yarısı orada çözülür.", "Underline as you read: what's given, what's asked? Half the solving happens there."],
    ["Başarı bir gecede gelmez ama her gece biraz yaklaşır.", "Success doesn't come overnight, but it gets a little closer every night."],
    ["Hayal ettiğin bölümü bir kâğıda yaz ve masana as. Neden çalıştığını unutma.", "Write your dream programme on paper and pin it to your desk. Remember why you study."],
    ["En verimli saatini bul ve en zor dersi oraya koy.", "Find your most productive hour and put your hardest subject there."],
    ["Bir deneme kötü geçtiyse analiz et, üzülme. Veri, duygudan daha çok şey öğretir.", "If a mock went badly, analyse it, don't mourn it. Data teaches more than feelings."],
    ["Bugün sadece 20 dakika bile çalışsan zincir devam eder.", "Even 20 minutes today keeps the chain going."],
    ["Anladığını sanmak ile anlamak arasındaki fark, bir test sorusudur.", "The gap between thinking you understand and understanding is one test question."],
    ["Kendine nazik ol; yorgun bir zihin eleştiriyle değil, molayla toparlanır.", "Be kind to yourself; a tired mind recovers with rest, not criticism."],
    ["Her ders bir yapboz parçası; bugün bir parçayı yerine oturt.", "Every subject is a puzzle piece; fit one in place today."],
    ["Soruların cevabını hemen okuma; önce iki dakika gerçekten dene.", "Don't peek at the answer right away; try for two honest minutes first."],
    ["Bugün öğrendiğin bir şeyi akşam yatmadan önce bir kez hatırla.", "Recall one thing you learned today right before bed."],
    ["Hedefin uzak görünüyorsa bugünkü adımına bak; o kadar da uzak değil.", "If the goal looks far, look at today's step; it's not that far."],
    ["Yanlış defterini açmak cesaret ister, kapatmak ise kazanç getirir.", "Opening your mistake notebook takes courage; closing it brings points."],
    ["Bir saat telefonsuz çalışma, üç saat dağınık çalışmaya bedeldir.", "One phone-free hour is worth three scattered ones."],
    ["Bugün bir arkadaşına soru sor ya da birine soru çöz. Paylaşınca öğrenme ikiye katlanır.", "Ask a friend a question or solve one for someone. Sharing doubles learning."],
    ["Matematikte hız, çok soru çözmekten değil, doğru yöntemden gelir.", "Speed in maths comes from the right method, not just more questions."],
    ["Her sabah \"bugün neyi öğreneceğim?\" diye sor. Akşam cevabını kontrol et.", "Each morning ask \"what will I learn today?\" Check the answer at night."],
    ["Zor bir gün mü? Kolay bir konuyla başla, ivme kazan, sonra zora geç.", "Tough day? Start with something easy, build momentum, then tackle the hard part."],
    ["Bugünkü sen, yarınki sınavdaki sana bir hediye hazırlıyor.", "Today's you is preparing a gift for exam-day you."],
    ["Kıyaslama sosyal medyada güzel görünür ama masanda işe yaramaz.", "Comparison looks good on social media but doesn't work at your desk."],
    ["Okuduğun her paragrafta \"yazar ne demek istiyor?\" diye sor.", "In every paragraph you read, ask \"what is the author really saying?\""],
    ["Konu tekrarı sıkıcıysa yerini değiştir: kartla, oyunla, anlatarak tekrar et.", "If review feels dull, switch it up: cards, games, explaining aloud."],
    ["Çalıştığın saatleri değil, çözdüğün sorunları say.", "Count the problems you solved, not the hours you sat."],
    ["Sınav günü bildiğin her şeyi hatırlamak için bugün hatırlama pratiği yap.", "To remember everything on exam day, practise recalling today."],
    ["Gece geç saatte bir saat daha çalışmak, sabah bir saat kaybettirebilir. Uyu.", "One more hour late at night can cost you an hour in the morning. Sleep."],
    ["Tek bir mükemmel deneme değil, istikrarlı yükselen bir çizgi hedefle.", "Aim for a steadily rising line, not one perfect mock."],
    ["Takıldığın soruyu not et; yarın ilk iş ona bak.", "Note the question you got stuck on; look at it first thing tomorrow."],
    ["İyi bir çalışma günü, iyi bir plandan önce iyi bir kahvaltıyla başlar.", "A good study day starts with a good breakfast, before a good plan."],
    ["Bugün bir haritaya, bir deneye ya da bir grafiğe bak; görsel öğrenme kalıcıdır.", "Look at a map, a lab or a graph today; visual learning sticks."],
    ["Başladığın işi bitirmenin verdiği his, en iyi motivasyondur. Küçük bir işi bitir.", "Finishing what you started is the best motivation. Finish one small task."],
    ["Zor bir soruyu çözdüğünde kendini kutla. Beyin ödülü hatırlar.", "Celebrate when you crack a hard problem. Your brain remembers the reward."],
    ["Bir konu için üç farklı kaynak değil, bir kaynağı üç kez çalış.", "Rather than three sources for one topic, study one source three times."],
    ["Odak bir kas gibidir; her gün biraz daha uzun tutabilirsin.", "Focus is like a muscle; you can hold it a little longer each day."],
    ["Hedefini yüksek tut ama bugünkü adımını küçük ve kesin yap.", "Keep the goal high, but make today's step small and certain."],
    ["Pes etmek istediğinde sadece beş dakika daha dene. Çoğu zaman o beş dakika yeter.", "When you want to quit, try five more minutes. Often that's all it takes."],
    ["Soru çözerken süre tut; sınavda zaman da bir rakiptir.", "Time yourself when solving; on exam day the clock is an opponent too."],
    ["Dün öğrendiğin bir konudan bugün tek bir soru çöz. Aralıklı tekrar böyle başlar.", "Solve one question from yesterday's topic today. That's how spaced review begins."],
    ["Kendi hızında ilerle; herkesin sınavı aynı gün, ama yolu farklı.", "Go at your own pace; everyone's exam is on the same day, but the roads differ."],
    ["Bugün en çok yanlış yaptığın konuyu seç ve ona bir şans daha ver.", "Pick the topic you miss most and give it another chance today."],
    ["Bir sayfa özet, on sayfa okumadan daha çok şey kalıcı kılar.", "One page of summary makes more stick than ten pages of reading."],
    ["Merak et: \"neden böyle?\" diye soran, ezberleyenden daha uzun hatırlar.", "Be curious: those who ask \"why?\" remember longer than those who memorise."],
    ["Bugün kendine güven; buraya kadar geldiysen devam edebilirsin.", "Trust yourself today; if you got this far, you can keep going."],
    ["Uzun bir çalışmadan sonra ekrana değil, uzağa bak. Gözlerin de dinlensin.", "After a long session, look into the distance, not at a screen. Rest your eyes too."],
    ["Net artışı bazen gecikir; emek boşa gitmez, sadece birikir.", "Score gains sometimes lag; effort isn't wasted, it accumulates."],
    ["Bugün bir konunun özetini kendi cümlelerinle yaz.", "Write a summary of one topic in your own words today."],
    ["Çalışma ortamını sessizleştir, hedefini sesli söyle.", "Quiet your surroundings, say your goal out loud."],
    ["Her yeni gün, geçen haftadan biraz daha hazırlıklı olduğun bir gündür.", "Every new day is one where you're a bit more prepared than last week."],
    ["Bir soruyu yanlış yapmak, onu hiç görmemekten iyidir.", "Getting a question wrong beats never having seen it."],
    ["Bugünkü çalışmanı yarın bir arkadaşına anlatacakmış gibi yap.", "Study today as if you'll explain it to a friend tomorrow."],
    ["Hayaller plan olunca hedefe, hedefler adım olunca gerçeğe dönüşür.", "Dreams become goals with a plan, and goals become real with steps."],
    ["Bugün tek bir şeyi iyi yap; çoklu görev odağın düşmanıdır.", "Do one thing well today; multitasking is focus's enemy."],
    ["Zorlandığın an, öğrenmenin tam gerçekleştiği andır.", "The moment you struggle is exactly when learning happens."],
    ["Programına mola koymayı unutma; mola da planın bir parçası.", "Don't forget to schedule breaks; breaks are part of the plan."],
    ["Bugün yanlışlarını kategorilere ayır: bilgi mi, dikkat mi, süre mi?", "Sort your mistakes today: knowledge, attention, or time?"],
    ["Her gün aynı saatte başlamak, başlamayı kolaylaştırır.", "Starting at the same time each day makes starting easier."],
    ["İlerlemeni görmek için geriye bak: bir ay önce bilmediğin ne kadar çok şey var.", "Look back to see progress: so much you didn't know a month ago."],
    ["Bugün en az bir soruyu hiç bakmadan, sadece kendin çöz.", "Solve at least one question today entirely on your own."],
    ["Kendi rekorunu kır: dünkü odak süreni bugün biraz aş.", "Beat your own record: go a little past yesterday's focus time."],
    ["Bir konuyu çalışmadan önce ondan ne bildiğini yaz; sonra farkı gör.", "Before studying a topic, write what you already know; then see the difference."],
    ["Sınav senin için bir kapı; arkasındaki hayatı düşün ve bugün bir adım at.", "The exam is a door; picture the life behind it and take a step today."],
    ["Sakin bir zihin hızlı bir zihinden daha çok soru çözer.", "A calm mind solves more questions than a hurried one."],
    ["Bugün öğrendiğin en ilginç şeyi birine anlat.", "Tell someone the most interesting thing you learned today."],
    ["Düzenli çalışan öğrencinin en büyük avantajı, son haftada panik yapmamasıdır.", "The steady student's biggest advantage is not panicking in the final week."],
    ["Yeter ki başla; ilk adım her zaman en ağır olanıdır.", "Just start; the first step is always the heaviest."]
  ];

  /** Yerel takvim günü sayısı (gece yarısı değişir) */
  function dayNumber(d) {
    d = d || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }
  /** Gün → not: ardışık günlerde aynı not gelmesin diye 37 adımla dolaş (37, 100 ile aralarında asal) */
  function forDay(n) {
    const i = ((n * 37) % NOTES.length + NOTES.length) % NOTES.length;
    const [tr, en] = NOTES[i];
    return { tr, en, index: i, text: App.i18n && App.i18n.lang === "en" ? en : tr };
  }
  const today = () => forDay(dayNumber());

  App.motivation = { NOTES, today, forDay, dayNumber };
})();
