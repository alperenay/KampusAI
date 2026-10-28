/* =========================================================
   languages-ext.js — İngilizce ve Almanca pratik içeriği genişletmesi (v1.51)

   İki dil aynı yapıyı paylaşır (language-practice.js ikisini de aynı akışla çalıştırır):
     vocab[seviye]     [sözcük, Türkçe anlamı]
     grammar[seviye]   [kural adı, kısa açıklama, boşluklu cümle (___), seçenekler, doğru seçenek]
     dialogs[seviye]   [karşı tarafın sözü, yanıt seçenekleri, doğru yanıt, açıklama]
     roleplays[seviye] { id, title: [tr, en], setting: [tr, en], steps: [[karşı taraf, seçenekler, doğru, ipucu]] }
     dictation[seviye] [dinlenip yazılacak cümle, Türkçe anlamı]
   İçerik bu uygulama için yazılmıştır; seviye etiketleri çalışma rehberidir, sertifikalı yerleştirme değildir.
   ========================================================= */
(function () {
  const L = App.data.languages;
  if (!L) return;

  /* ---------------- İngilizce ---------------- */
  const en = {
    vocab: {
      A1: [["school", "okul"], ["teacher", "öğretmen"], ["friend", "arkadaş"], ["family", "aile"], ["breakfast", "kahvaltı"], ["homework", "ödev"], ["library", "kütüphane"], ["weekend", "hafta sonu"], ["morning", "sabah"], ["tired", "yorgun"],
        ["hungry", "aç"], ["happy", "mutlu"], ["cheap", "ucuz"], ["expensive", "pahalı"], ["always", "her zaman"], ["never", "asla"], ["to wake up", "uyanmak"], ["to buy", "satın almak"], ["to help", "yardım etmek"], ["to understand", "anlamak"]],
      A2: [["appointment", "randevu"], ["ticket", "bilet"], ["neighbour", "komşu"], ["journey", "yolculuk"], ["experience", "deneyim"], ["healthy", "sağlıklı"], ["dangerous", "tehlikeli"], ["polite", "kibar"], ["crowded", "kalabalık"], ["recently", "son zamanlarda"],
        ["already", "zaten / çoktan"], ["yet", "henüz"], ["to borrow", "ödünç almak"], ["to arrive", "varmak"], ["to compare", "karşılaştırmak"], ["to forget", "unutmak"], ["to look for", "aramak"], ["to save money", "para biriktirmek"], ["to prefer", "tercih etmek"], ["to recommend", "tavsiye etmek"]],
      B1: [["opportunity", "fırsat"], ["environment", "çevre"], ["challenge", "zorluk"], ["advantage", "avantaj"], ["disadvantage", "dezavantaj"], ["research", "araştırma"], ["solution", "çözüm"], ["skill", "beceri"], ["reliable", "güvenilir"], ["confident", "kendinden emin"],
        ["although", "-e rağmen"], ["however", "ancak"], ["therefore", "bu nedenle"], ["to improve", "geliştirmek"], ["to reduce", "azaltmak"], ["to achieve", "başarmak"], ["to avoid", "kaçınmak"], ["to depend on", "-e bağlı olmak"], ["to take part in", "katılmak"], ["to get used to", "alışmak"]],
      B2: [["consequence", "sonuç / etki"], ["evidence", "kanıt"], ["assumption", "varsayım"], ["approach", "yaklaşım"], ["sustainable", "sürdürülebilir"], ["significant", "önemli / anlamlı"], ["controversial", "tartışmalı"], ["inevitable", "kaçınılmaz"], ["nevertheless", "yine de"], ["whereas", "oysa"],
        ["to emphasise", "vurgulamak"], ["to acknowledge", "kabul etmek"], ["to undermine", "zayıflatmak"], ["to raise awareness", "farkındalık yaratmak"], ["to bring about", "neden olmak"], ["to cope with", "başa çıkmak"], ["to account for", "açıklamak"], ["to point out", "belirtmek"], ["to be likely to", "muhtemelen …mek"], ["to draw a conclusion", "sonuç çıkarmak"]]
    },
    grammar: {
      A1: [["To be", "I am, you are, he/she/it is.", "She ___ my sister.", ["am", "is", "are"], 1],
        ["Present simple · üçüncü tekil", "He/she/it ile fiile -s gelir.", "He ___ football every day.", ["play", "plays", "playing"], 1],
        ["Present simple · olumsuz", "Do not / does not + fiil yalın hâli.", "They ___ like fish.", ["doesn't", "don't", "aren't"], 1],
        ["There is / there are", "Tekil için is, çoğul için are.", "There ___ two books on the desk.", ["is", "are", "be"], 1],
        ["Can · yetenek", "Can + fiil yalın hâli; to gelmez.", "I can ___ English.", ["speak", "to speak", "speaks"], 0]],
      A2: [["Past simple · düzenli", "Düzenli fiillere -ed eklenir.", "We ___ a film yesterday.", ["watch", "watched", "watching"], 1],
        ["Past simple · düzensiz", "go → went, see → saw.", "Last summer I ___ to Izmir.", ["goed", "went", "go"], 1],
        ["Present perfect · already/yet", "Have/has + V3; yet olumsuz ve soruda.", "Have you finished your homework ___?", ["already", "yet", "ago"], 1],
        ["Karşılaştırma", "Kısa sıfatlar -er, uzun sıfatlar more.", "This book is ___ than that one.", ["more interesting", "interestinger", "most interesting"], 0],
        ["Going to · plan", "Önceden verilmiş karar: be going to + fiil.", "I'm ___ visit my grandparents tomorrow.", ["go", "going to", "will to"], 1]],
      B1: [["First conditional", "If + present, will + fiil.", "If it rains, we ___ at home.", ["stay", "will stay", "would stay"], 1],
        ["Present perfect continuous", "Süregelen eylem: have been + -ing.", "She has been ___ for two hours.", ["study", "studying", "studied"], 1],
        ["Relative clauses", "İnsan için who, nesne için which.", "The teacher ___ helped me is kind.", ["which", "who", "where"], 1],
        ["Passive · present", "am/is/are + V3.", "English ___ in many countries.", ["speaks", "is spoken", "is speaking"], 1],
        ["Used to", "Geçmişteki alışkanlık: used to + fiil.", "I ___ walk to school when I was a child.", ["use to", "used to", "am used to"], 1]],
      B2: [["Second conditional", "Gerçek dışı durum: if + past, would + fiil.", "If I ___ more time, I would learn Japanese.", ["have", "had", "will have"], 1],
        ["Third conditional", "Geçmişe pişmanlık: if + had V3, would have V3.", "If we had left earlier, we ___ the train.", ["would catch", "would have caught", "caught"], 1],
        ["Reported speech", "Zaman bir geri kayar: is → was.", "She said that she ___ tired.", ["is", "was", "has"], 1],
        ["Wish + past perfect", "Geçmişe dair dilek.", "I wish I ___ harder for the exam.", ["studied", "had studied", "would study"], 1],
        ["Inversion · vurgu", "Olumsuz zarf başa gelince yardımcı fiil özneden önce gelir.", "Never ___ such a beautiful sunset.", ["I have seen", "have I seen", "I saw"], 1]]
    },
    dialogs: {
      A1: [["Hi! What's your name?", ["I'm Deniz.", "It's raining.", "Five pounds."], 0, "İsim sorusuna I'm … ile yanıt verilir."],
        ["How old are you?", ["I'm fine, thanks.", "I'm fifteen.", "At seven o'clock."], 1, "How old: yaş sorar; I'm + sayı."],
        ["Where are you from?", ["I'm from Turkey.", "I'm a student.", "On Monday."], 0, "Where … from: nereli olduğunu sorar."],
        ["Can I help you?", ["Yes, I'm looking for a pen.", "I'm sixteen.", "It's blue."], 0, "Mağazada yardım teklifi: ne aradığını söyle."]],
      A2: [["What did you do last weekend?", ["I visit my aunt.", "I visited my aunt.", "I'm visiting my aunt."], 1, "Geçmişteki eylem için past simple."],
        ["How do I get to the station?", ["Go straight and turn left.", "It costs ten lira.", "I'm going tomorrow."], 0, "Yol tarifi: go straight, turn left/right."],
        ["Would you like something to drink?", ["Yes, some water, please.", "I like football.", "No, I'm not."], 0, "Kibar teklife please ile yanıt."],
        ["Have you ever been to Ankara?", ["Yes, I went there last year.", "Yes, I go there.", "No, I'm not been."], 0, "Deneyim sorusu; ayrıntı past simple ile verilir."]],
      B1: [["What do you think about online lessons?", ["They are flexible, but I miss my classmates.", "I think at nine.", "Yes, I do online."], 0, "Görüş + gerekçe + karşıt yön."],
        ["Could you explain why you were late?", ["Because the bus broke down.", "I'm late tomorrow.", "Yes, I could."], 0, "Neden sorusuna because + gerekçe."],
        ["What would you do if you won a competition?", ["I would buy a telescope.", "I will won.", "I did it yesterday."], 0, "Varsayıma would + fiil ile yanıt."],
        ["How long have you been learning English?", ["For five years.", "Five years ago.", "Since five years."], 0, "How long + present perfect → for + süre."]],
      B2: [["Some say social media harms teenagers. Do you agree?", ["To some extent, although it also connects people.", "Yes, I agree tomorrow.", "Social media is a website."], 0, "Dengeli görüş: to some extent + although."],
        ["What evidence supports your argument?", ["A recent survey showed that 60% of students sleep less.", "Because I said so.", "Evidence is important."], 0, "İddiayı somut veriyle destekle."],
        ["What might be a drawback of your solution?", ["It could be costly to implement at first.", "There are no drawbacks ever.", "My solution is good."], 0, "Sınırlılığı kabul etmek ikna gücünü artırır."],
        ["How would you summarise the discussion?", ["Overall, both sides agree that balance is essential.", "The discussion was long.", "I summarise yesterday."], 0, "Overall / to sum up ile özet."]]
    },
    roleplays: {
      A1: [{ id: "cafe", title: ["Kafede sipariş", "Ordering at a café"], setting: ["Bir kafedesin; garson masana geliyor.", "You are at a café; the waiter comes over."], steps: [
          ["Hello! What would you like?", ["A cheese sandwich, please.", "I'm a sandwich.", "Goodbye!"], 0, "Sipariş: … , please."],
          ["Anything to drink?", ["Orange juice, please.", "I'm thirsty yesterday.", "No, I'm from Izmir."], 0, "İçecek adı + please."],
          ["That's eight pounds.", ["Here you are.", "I'm eight.", "Where are you?"], 0, "Para verirken: Here you are."]] },
        { id: "school", title: ["Okulda ilk gün", "First day at school"], setting: ["Yeni okulunda bir öğrenciyle tanışıyorsun.", "You meet a student at your new school."], steps: [
          ["Hi, are you new here?", ["Yes, I'm new. I'm Ece.", "No, I'm a book.", "It's Monday."], 0, "Kendini tanıt."],
          ["Which class are you in?", ["I'm in 9-B.", "I'm happy.", "In the morning."], 0, "Sınıfını söyle."],
          ["Do you want to sit with us at lunch?", ["Yes, thank you!", "I'm lunch.", "No, I'm not."], 0, "Teşekkür ederek kabul et."]] }],
      A2: [{ id: "station", title: ["Tren istasyonunda", "At the station"], setting: ["İstanbul'a bilet alıyorsun.", "You are buying a ticket to Istanbul."], steps: [
          ["Good morning. Where are you travelling to?", ["To Istanbul, please. A return ticket.", "I travelled yesterday.", "I'm a ticket."], 0, "Varış yeri + bilet türü."],
          ["When would you like to leave?", ["On the 10 o'clock train, if possible.", "I left last week.", "At the station."], 0, "Saat ve if possible ile kibar istek."],
          ["The train leaves from platform 4.", ["Thanks. How long does the journey take?", "Platform is nice.", "I'm four."], 0, "Teşekkür + ek soru."]] },
        { id: "doctor", title: ["Doktorda", "At the doctor's"], setting: ["Birkaç gündür hastasın ve doktora gittin.", "You have felt ill for a few days."], steps: [
          ["What seems to be the problem?", ["I've had a headache since Monday.", "I'm a headache.", "The problem is Monday."], 0, "Since + başlangıç zamanı."],
          ["Have you taken any medicine?", ["Yes, I took some painkillers yesterday.", "Yes, I take tomorrow.", "Medicine is expensive."], 0, "Dün → past simple."],
          ["Drink plenty of water and rest for two days.", ["OK, thank you, doctor.", "I'm two days.", "Water is wet."], 0, "Tavsiyeye teşekkür."]] }],
      B1: [{ id: "project", title: ["Grup projesi planı", "Planning a group project"], setting: ["Arkadaşınla bilim fuarı projesini planlıyorsun.", "You plan a science-fair project with a friend."], steps: [
          ["What topic should we choose?", ["How about measuring noise around our school?", "Topic is a word.", "I chose yesterday."], 0, "Öneri: How about + -ing / isim."],
          ["Good idea, but how will we measure it?", ["We could use a phone app and record it at different times.", "We measured it tomorrow.", "It's loud."], 0, "Yöntem önerisi: we could …"],
          ["What if the results are unreliable?", ["Then we'll repeat each measurement three times.", "Results are results.", "If unreliable, yesterday."], 0, "First conditional ile plan B."]] },
        { id: "complaint", title: ["Kibar şikâyet", "A polite complaint"], setting: ["İnternetten aldığın kulaklık bozuk geldi.", "Headphones you bought online arrived broken."], steps: [
          ["Customer service, how can I help?", ["I'm calling because the headphones I ordered don't work.", "Help is good.", "I order yesterday headphones."], 0, "Amaç + relative clause."],
          ["I'm sorry to hear that. When did you receive them?", ["They arrived on Tuesday.", "They arrive Tuesday every.", "I'm Tuesday."], 0, "Past simple ile tarih."],
          ["We can send a replacement or refund you.", ["I'd prefer a replacement, please.", "I prefer yesterday.", "Refund is a word."], 0, "Tercih: I'd prefer …"]] }],
      B2: [{ id: "debate", title: ["Münazara", "A debate"], setting: ["\"Okullarda telefon yasaklanmalı mı?\" konulu münazaradasın.", "Debate: should phones be banned in schools?"], steps: [
          ["What is your position on the ban?", ["I'm against a complete ban, although limits are reasonable.", "Phones are black.", "Position is standing."], 0, "Tutum + taviz (although)."],
          ["But don't phones distract students?", ["They can, but research suggests clear rules reduce misuse.", "No, phones never ring.", "Students are students."], 0, "Karşı görüşü kabul et, kanıtla yanıtla."],
          ["Can you give a concrete alternative?", ["For instance, phones could be stored during lessons and used for set activities.", "Alternative is another.", "I gave it yesterday."], 0, "For instance + somut öneri."],
          ["Please sum up your argument.", ["In short, guided use teaches responsibility better than a ban.", "Summing is maths.", "My argument is long."], 0, "In short ile toparla."]] },
        { id: "interview", title: ["Burs mülakatı", "Scholarship interview"], setting: ["Bir yaz okulu bursu için mülakattasın.", "You are interviewing for a summer-school scholarship."], steps: [
          ["Why should we choose you?", ["I've led a robotics club for two years, which taught me teamwork.", "Because I want.", "Choose is a verb."], 0, "Somut deneyim + ne öğrendiğin."],
          ["Tell me about a failure.", ["Our first robot failed, so we analysed the data and redesigned it.", "I never fail.", "Failure is bad."], 0, "Başarısızlık + ders + eylem."],
          ["Where do you see yourself in five years?", ["Hopefully studying engineering and mentoring younger students.", "In five years, yesterday.", "I see with my eyes."], 0, "Gelecek hedefi; hopefully ile ölçülü."]] }]
    },
    dictation: {
      A1: [["I have breakfast at seven.", "Yedide kahvaltı yaparım."], ["My brother is twelve years old.", "Erkek kardeşim on iki yaşında."], ["We go to school by bus.", "Okula otobüsle gideriz."], ["She likes music and books.", "O, müzik ve kitapları sever."]],
      A2: [["I visited my grandparents last weekend.", "Geçen hafta sonu büyükanne ve büyükbabamı ziyaret ettim."], ["The train leaves at half past nine.", "Tren dokuz buçukta kalkar."], ["Have you ever eaten Japanese food?", "Hiç Japon yemeği yedin mi?"], ["It is colder than yesterday.", "Dünden daha soğuk."]],
      B1: [["If we leave now, we will catch the bus.", "Şimdi çıkarsak otobüse yetişiriz."], ["She has been studying for the exam all week.", "Bütün hafta sınava çalışıyor."], ["The book that you lent me was fascinating.", "Bana ödünç verdiğin kitap büyüleyiciydi."], ["Although it was raining, we went for a walk.", "Yağmur yağmasına rağmen yürüyüşe çıktık."]],
      B2: [["If I had known, I would have helped you.", "Bilseydim sana yardım ederdim."], ["The results were significant, nevertheless more research is needed.", "Sonuçlar anlamlıydı, yine de daha fazla araştırma gerekiyor."], ["Never have I seen such a crowded stadium.", "Hiç bu kadar kalabalık bir stadyum görmedim."], ["She pointed out that the evidence was incomplete.", "Kanıtların eksik olduğunu belirtti."]]
    }
  };

  /* ---------------- Almanca (mevcut içeriğe ek; aynı yapı) ---------------- */
  const deMore = {
    vocab: {
      A1: [["der Freund", "arkadaş (erkek)"], ["die Lehrerin", "öğretmen (kadın)"], ["das Frühstück", "kahvaltı"], ["die Hausaufgabe", "ödev"], ["das Wochenende", "hafta sonu"], ["müde", "yorgun"], ["kaufen", "satın almak"], ["verstehen", "anlamak"]],
      A2: [["die Reise", "yolculuk"], ["der Nachbar", "komşu"], ["gesund", "sağlıklı"], ["gefährlich", "tehlikeli"], ["höflich", "kibar"], ["voll", "kalabalık / dolu"], ["leihen", "ödünç vermek/almak"], ["empfehlen", "tavsiye etmek"]],
      B1: [["die Gelegenheit", "fırsat"], ["die Forschung", "araştırma"], ["die Herausforderung", "zorluk"], ["der Vorteil", "avantaj"], ["die Lösung", "çözüm"], ["die Fähigkeit", "beceri"], ["verbessern", "geliştirmek"], ["erreichen", "başarmak / ulaşmak"]],
      B2: [["die Folge", "sonuç / etki"], ["der Beweis", "kanıt"], ["die Annahme", "varsayım"], ["nachhaltig", "sürdürülebilir"], ["umstritten", "tartışmalı"], ["unvermeidlich", "kaçınılmaz"], ["betonen", "vurgulamak"], ["hinweisen auf", "belirtmek"]]
    },
    grammar: {
      A1: [["Modalverb können", "können + mastar (sonda).", "Ich ___ gut schwimmen.", ["kann", "kannst", "können"], 0],
        ["Olumsuzluk: nicht / kein", "İsmi kein, fiili nicht olumsuzlar.", "Ich habe ___ Zeit.", ["nicht", "keine", "kein"], 1]],
      A2: [["Dativ · mit", "mit her zaman Dativ ister.", "Ich fahre mit ___ Bus.", ["der", "dem", "den"], 1],
        ["Karşılaştırma (Komparativ)", "Sıfat + -er; als ile karşılaştırma.", "Berlin ist größer ___ Hamburg.", ["wie", "als", "dann"], 1]],
      B1: [["Wenn · koşul", "Wenn yan cümlesinde çekimli fiil sonda.", "Wenn es regnet, ___ ich zu Hause.", ["bleibe", "ich bleibe", "bleiben"], 0],
        ["Präteritum · modal", "konnte, musste, wollte.", "Gestern ___ ich nicht kommen.", ["kann", "konnte", "gekonnt"], 1]],
      B2: [["Konjunktiv II · geçmiş", "hätte/wäre + Partizip II.", "Wenn ich Zeit gehabt hätte, ___ ich dir geholfen.", ["habe", "hätte", "würde"], 1],
        ["Nominalisierung", "Fiilden isim: entscheiden → die Entscheidung.", "Die ___ fiel uns schwer.", ["Entscheiden", "Entscheidung", "entschieden"], 1]]
    },
    dialogs: {
      A1: [["Kann ich Ihnen helfen?", ["Ja, ich suche einen Stift.", "Ich bin sechzehn.", "Es ist blau."], 0, "Mağazada yardım teklifine ne aradığını söyle."]],
      A2: [["Hast du schon einmal Berlin besucht?", ["Ja, letztes Jahr.", "Ja, ich besuche morgen gestern.", "Berlin ist ein Buch."], 0, "Deneyim sorusuna zaman bilgisiyle yanıt."]],
      B1: [["Was würdest du machen, wenn du einen Preis gewinnst?", ["Ich würde ein Teleskop kaufen.", "Ich gewinne gestern.", "Ein Preis ist teuer."], 0, "Varsayım: würde + mastar."]],
      B2: [["Wie würden Sie die Diskussion zusammenfassen?", ["Insgesamt sind sich beide Seiten einig, dass ein Gleichgewicht wichtig ist.", "Die Diskussion war lang.", "Ich fasse gestern."], 0, "Insgesamt ile özet."]]
    },
    roleplays: {
      A1: [{ id: "cafe", title: ["Kafede sipariş", "Ordering at a café"], setting: ["Berlin'de bir kafedesin.", "You are at a café in Berlin."], steps: [
          ["Hallo! Was möchten Sie?", ["Ein Käsebrot, bitte.", "Ich bin ein Brot.", "Tschüss!"], 0, "Sipariş: …, bitte."],
          ["Und zu trinken?", ["Einen Orangensaft, bitte.", "Ich trinke gestern.", "Nein, ich komme aus Izmir."], 0, "Akkusativ: einen Saft."],
          ["Das macht acht Euro.", ["Hier, bitte.", "Ich bin acht.", "Wo sind Sie?"], 0, "Para verirken: Hier, bitte."]] },
        { id: "school", title: ["Okulda ilk gün", "First day at school"], setting: ["Yeni okulunda bir öğrenciyle tanışıyorsun.", "You meet a student at your new school."], steps: [
          ["Hallo, bist du neu hier?", ["Ja, ich bin neu. Ich heiße Ece.", "Nein, ich bin ein Buch.", "Es ist Montag."], 0, "Kendini tanıt."],
          ["In welche Klasse gehst du?", ["Ich gehe in die 9B.", "Ich bin glücklich.", "Am Morgen."], 0, "Sınıfını söyle."],
          ["Möchtest du in der Pause mit uns essen?", ["Ja, gern! Danke.", "Ich bin die Pause.", "Nein, ich bin nicht."], 0, "Gern ile kabul et."]] }],
      A2: [{ id: "station", title: ["Tren istasyonunda", "At the station"], setting: ["Münih'e bilet alıyorsun.", "You are buying a ticket to Munich."], steps: [
          ["Guten Morgen. Wohin möchten Sie fahren?", ["Nach München, bitte. Hin und zurück.", "Ich fuhr gestern.", "Ich bin eine Fahrkarte."], 0, "Nach + şehir; gidiş-dönüş: hin und zurück."],
          ["Wann möchten Sie fahren?", ["Mit dem Zug um zehn Uhr, wenn möglich.", "Ich bin letzte Woche gefahren.", "Am Bahnhof."], 0, "Saat + wenn möglich."],
          ["Der Zug fährt von Gleis 4.", ["Danke. Wie lange dauert die Fahrt?", "Gleis ist schön.", "Ich bin vier."], 0, "Teşekkür + süre sorusu."]] },
        { id: "doctor", title: ["Doktorda", "At the doctor's"], setting: ["Birkaç gündür hastasın.", "You have felt ill for a few days."], steps: [
          ["Was fehlt Ihnen denn?", ["Ich habe seit Montag Kopfschmerzen.", "Mir fehlt Montag.", "Ich bin Kopf."], 0, "Seit + Dativ ile başlangıç."],
          ["Haben Sie schon Medikamente genommen?", ["Ja, gestern habe ich eine Tablette genommen.", "Ja, ich nehme gestern.", "Medikamente sind teuer."], 0, "Perfekt ile geçmiş."],
          ["Trinken Sie viel Wasser und ruhen Sie sich zwei Tage aus.", ["Gut, vielen Dank, Frau Doktor.", "Ich bin zwei Tage.", "Wasser ist nass."], 0, "Tavsiyeye teşekkür."]] }],
      B1: [{ id: "project", title: ["Grup projesi planı", "Planning a group project"], setting: ["Arkadaşınla bilim fuarı projesini planlıyorsun.", "You plan a science-fair project."], steps: [
          ["Welches Thema sollen wir wählen?", ["Wie wäre es, den Lärm rund um unsere Schule zu messen?", "Thema ist ein Wort.", "Ich wählte gestern."], 0, "Öneri: Wie wäre es, … zu …?"],
          ["Gute Idee, aber wie messen wir das?", ["Wir könnten eine App benutzen und zu verschiedenen Zeiten messen.", "Wir messen gestern.", "Es ist laut."], 0, "Yöntem: wir könnten …"],
          ["Und wenn die Ergebnisse unzuverlässig sind?", ["Dann wiederholen wir jede Messung dreimal.", "Ergebnisse sind Ergebnisse.", "Wenn gestern."], 0, "Wenn-koşulu ile plan B."]] },
        { id: "complaint", title: ["Kibar şikâyet", "A polite complaint"], setting: ["Aldığın kulaklık bozuk geldi.", "Your headphones arrived broken."], steps: [
          ["Kundenservice, wie kann ich helfen?", ["Ich rufe an, weil die Kopfhörer, die ich bestellt habe, nicht funktionieren.", "Hilfe ist gut.", "Ich bestelle gestern."], 0, "weil + ilgi cümlesi."],
          ["Das tut mir leid. Wann haben Sie sie bekommen?", ["Sie sind am Dienstag angekommen.", "Sie kommen Dienstag jeden.", "Ich bin Dienstag."], 0, "Perfekt (sein) ile tarih."],
          ["Wir können Ersatz schicken oder das Geld erstatten.", ["Ich hätte lieber Ersatz, bitte.", "Ich bevorzuge gestern.", "Geld ist ein Wort."], 0, "Tercih: Ich hätte lieber …"]] }],
      B2: [{ id: "debate", title: ["Münazara", "A debate"], setting: ["\"Okullarda telefon yasaklanmalı mı?\" münazarası.", "Debate: should phones be banned in schools?"], steps: [
          ["Wie stehen Sie zu einem Handyverbot?", ["Ich bin gegen ein komplettes Verbot, obwohl Regeln sinnvoll sind.", "Handys sind schwarz.", "Ich stehe."], 0, "Tutum + obwohl."],
          ["Aber lenken Handys nicht ab?", ["Das kann sein, aber Studien zeigen, dass klare Regeln helfen.", "Nein, Handys klingeln nie.", "Schüler sind Schüler."], 0, "Kabul + kanıt."],
          ["Können Sie eine konkrete Alternative nennen?", ["Zum Beispiel könnten Handys im Unterricht eingesammelt werden.", "Alternative ist anders.", "Ich nannte gestern."], 0, "Zum Beispiel + Passiv."],
          ["Bitte fassen Sie Ihr Argument zusammen.", ["Kurz gesagt: begleitete Nutzung lehrt mehr Verantwortung als ein Verbot.", "Zusammenfassen ist Mathe.", "Mein Argument ist lang."], 0, "Kurz gesagt ile toparla."]] },
        { id: "interview", title: ["Burs mülakatı", "Scholarship interview"], setting: ["Yaz okulu bursu mülakatı.", "Summer-school scholarship interview."], steps: [
          ["Warum sollten wir Sie auswählen?", ["Ich leite seit zwei Jahren eine Robotik-AG, was mir Teamarbeit beigebracht hat.", "Weil ich will.", "Auswählen ist ein Verb."], 0, "Somut deneyim + kazanım."],
          ["Erzählen Sie von einem Misserfolg.", ["Unser erster Roboter ist gescheitert, also haben wir die Daten analysiert und ihn neu gebaut.", "Ich scheitere nie.", "Misserfolg ist schlecht."], 0, "Başarısızlık + ders."],
          ["Wo sehen Sie sich in fünf Jahren?", ["Hoffentlich im Ingenieurstudium und als Mentorin für Jüngere.", "In fünf Jahren gestern.", "Ich sehe mit den Augen."], 0, "Hoffentlich ile ölçülü hedef."]] }]
    },
    dictation: {
      A1: [["Ich frühstücke um sieben Uhr.", "Saat yedide kahvaltı yaparım."], ["Mein Bruder ist zwölf Jahre alt.", "Erkek kardeşim on iki yaşında."], ["Wir fahren mit dem Bus zur Schule.", "Okula otobüsle gideriz."], ["Sie mag Musik und Bücher.", "O, müzik ve kitapları sever."]],
      A2: [["Ich habe letztes Wochenende meine Großeltern besucht.", "Geçen hafta sonu büyükanne ve büyükbabamı ziyaret ettim."], ["Der Zug fährt um halb zehn ab.", "Tren dokuz buçukta kalkar."], ["Hast du schon einmal japanisch gegessen?", "Hiç Japon yemeği yedin mi?"], ["Heute ist es kälter als gestern.", "Bugün dünden daha soğuk."]],
      B1: [["Wenn wir jetzt gehen, erreichen wir den Bus.", "Şimdi çıkarsak otobüse yetişiriz."], ["Sie lernt schon die ganze Woche für die Prüfung.", "Bütün hafta sınava çalışıyor."], ["Das Buch, das du mir geliehen hast, war spannend.", "Bana ödünç verdiğin kitap sürükleyiciydi."], ["Obwohl es regnete, gingen wir spazieren.", "Yağmur yağmasına rağmen yürüyüşe çıktık."]],
      B2: [["Wenn ich das gewusst hätte, hätte ich dir geholfen.", "Bilseydim sana yardım ederdim."], ["Die Ergebnisse waren deutlich, dennoch ist mehr Forschung nötig.", "Sonuçlar belirgindi, yine de daha fazla araştırma gerekiyor."], ["Sie wies darauf hin, dass die Beweise unvollständig waren.", "Kanıtların eksik olduğunu belirtti."], ["Nachhaltige Lösungen erfordern langfristiges Denken.", "Sürdürülebilir çözümler uzun vadeli düşünme gerektirir."]]
    }
  };

  const de = L.profiles.de;
  L.levels.forEach((lv) => {
    ["vocab", "grammar", "dialogs"].forEach((k) => { de[k][lv] = de[k][lv].concat(deMore[k][lv]); });
  });
  de.roleplays = deMore.roleplays;
  de.dictation = deMore.dictation;
  Object.assign(L.profiles.en, en, { practiceRoute: "konusma/pratik" });
  de.practiceRoute = "konusma/de";
})();
