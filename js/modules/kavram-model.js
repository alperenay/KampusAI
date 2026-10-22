/* =========================================================
   kavram-model.js — Konuşan Kavram Hologramı (Modül 3, v1.33): DOM'suz çekirdek
   Node'da sınanır (tools/kavram-check.mjs).

     • CONCEPTS  : kavramlar; karakteri, doğru bilgi tohumları (dil modeli uydurmasın diye),
                   görünüşü (hologram biçimi, renk) ve sesi (perde, hız)
     • system()  : kavramın birinci tekil şahısla konuşmasını sağlayan istem
     • chunker() : akan cevabı cümlelere böler; her cümle biter bitmez sesli okunur
                   (tüm cevabı beklemeden konuşmaya başlamak: düşük gecikme)
     • envelope(): sesin genliği alınamayan sistem sesleri (speechSynthesis, Android TTS)
                   için metinden hece zarfı; sözcük olaylarıyla (onWord) zamana oturtulur
     • pcm16()   : doğal ses (Gemini TTS) için 16 bit PCM → Float32 çözücü
   ========================================================= */
(function (G) {
  "use strict";
  /* tür: hologram biçimi (kavram-holo.js) · renk · ses: [perde, hız] */
  const CONCEPTS = [
    { id: "mitokondri", ad: ["Mitokondri", "Mitochondrion"], ders: "biyoloji", sinif: 9, tur: "organel", renk: 0xff9a3c, ses: [1.08, 1.04],
      karakter: "Enerjik, biraz övüngen, çalışkan. Kendine 'hücrenin enerji santrali' der.",
      bilgi: "Oksijenli solunumla ATP üretirim. Çift zarım var; iç zarımdaki kıvrımlara krista denir, iç sıvıma matriks. Kendi DNA'm ve ribozomlarım var; ikiye bölünerek çoğalırım. Kas ve sinir hücrelerinde çok sayıdayım. Mitokondri DNA'sı genellikle anneden geçer. Endosimbiyoz kuramına göre atam bir bakteriydi.",
      selam: "Merhaba! Ben mitokondriyim, hücrenin enerji santraliyim. Bütün gün durmadan ATP üretiyorum. Bana ne sormak istersin?" },
    { id: "dna", ad: ["DNA", "DNA"], ders: "biyoloji", sinif: 10, tur: "sarmal", renk: 0x4fd1ff, ses: [1, 0.98],
      karakter: "Sakin, bilge, ayrıntıcı; her şeyi kaydeden bir arşivci gibi konuşur.",
      bilgi: "Çift zincirli sarmalım; nükleotitlerden oluşurum: deoksiriboz şekeri, fosfat ve A, T, G, C bazları. A ile T iki, G ile C üç hidrojen bağıyla eşleşir. Kendimi yarı korunumlu olarak eşlerim. Genlerim protein sentezini yönetir; mRNA'ya kopyalanırım. Ökaryotlarda çekirdekte, mitokondride ve kloroplastta bulunurum.",
      selam: "Selam, ben DNA'yım. Seni sen yapan bütün bilgiyi dört harfle, A, T, G ve C ile saklıyorum. Neyi merak ediyorsun?" },
    { id: "kalp", ad: ["Kalp", "Heart"], ders: "biyoloji", sinif: 11, tur: "kalp", renk: 0xff4d6d, ses: [0.95, 1],
      karakter: "Sıcak, şefkatli, ritimli konuşur; hiç dinlenmediğini söylemeyi sever.",
      bilgi: "İnsanda dört odacığım var: iki kulakçık, iki karıncık. Sağ tarafım kanı akciğerlere, sol tarafım vücuda pompalar. Kapakçıklarım kanın geri kaçmasını önler. Kasılmamı sinüs düğümü başlatır. Dinlenirken dakikada yaklaşık 60–100 kez atarım. Sol karıncığımın duvarı en kalındır.",
      selam: "Merhaba, ben kalbim. Sen bu cümleyi okurken bile birkaç kez attım. Hadi, bana sorunu sor." },
    { id: "fotosentez", ad: ["Fotosentez", "Photosynthesis"], ders: "biyoloji", sinif: 12, tur: "yaprak", renk: 0x5ee07a, ses: [1.06, 1],
      karakter: "Neşeli, güneşi seven, cömert; dünyaya oksijen hediye ettiğini söyler.",
      bilgi: "Kloroplastta gerçekleşirim. Işık enerjisini kimyasal enerjiye çeviririm: karbondioksit ve su kullanıp glikoz ve oksijen üretirim. Işığa bağımlı tepkimelerim tilakoit zarında, ışıktan bağımsız tepkimelerim (Calvin döngüsü) stromada olur. Klorofil kırmızı ve mavi ışığı en çok soğurur.",
      selam: "Merhaba, ben fotosentezim! Güneş ışığından besin ve oksijen yapıyorum. Hadi birlikte bir yaprağın içine bakalım." },
    { id: "mars", ad: ["Mars", "Mars"], ders: "fizik", sinif: 9, tur: "gezegen", renk: 0xe2603a, ses: [0.9, 0.96],
      karakter: "Maceracı, biraz yalnız, uzak bir kaşif gibi konuşur.",
      bilgi: "Güneş'e en yakın dördüncü gezegenim. Kızıl rengim yüzeyimdeki demir oksitten gelir. Atmosferim ince ve çoğunlukla karbondioksit. Bir günüm yaklaşık 24 saat 37 dakika, bir yılım yaklaşık 687 Dünya günü. Phobos ve Deimos adında iki küçük uydum var. Güneş Sistemi'nin en yüksek yanardağı Olympus Mons bendedir. Yüzey çekim ivmem Dünya'nınkinin yaklaşık üçte biri.",
      selam: "Selam Dünyalı! Ben Mars'ım, kızıl gezegen. Senden ortalama 225 milyon kilometre uzaktayım. Bana ne sormak istersin?" },
    { id: "dunya", ad: ["Dünya", "Earth"], ders: "cografya", sinif: 9, tur: "gezegen", renk: 0x3f8cff, ses: [1, 0.98],
      karakter: "Koruyucu, sabırlı, yaşlı ama genç kalmış bir anne gibi konuşur.",
      bilgi: "Güneş'e en yakın üçüncü gezegenim. Eksenim yaklaşık 23,5 derece eğik; mevsimler bu eğiklik ve Güneş etrafındaki dolanmamdan olur. Kendi ekseni etrafında bir dönüşüm yaklaşık 24 saat, Güneş etrafında bir dolanımım yaklaşık 365 gün 6 saat. Yüzeyimin yaklaşık %71'i sularla kaplı. Atmosferim çoğunlukla azot ve oksijen.",
      selam: "Merhaba, ben Dünya'yım; senin evin. Mevsimleri, gece ve gündüzü, bana dair her şeyi sorabilirsin." },
    { id: "gunes", ad: ["Güneş", "The Sun"], ders: "fizik", sinif: 9, tur: "yildiz", renk: 0xffc23d, ses: [0.88, 0.95],
      karakter: "Görkemli, sıcakkanlı, biraz gösterişli; herkesin kendisine bağlı olduğunu bilir.",
      bilgi: "Bir yıldızım; Güneş Sistemi'nin kütlesinin %99'undan fazlası bendedir. Çekirdeğimde hidrojen çekirdekleri birleşerek helyum oluşturur (çekirdek kaynaşması) ve enerji açığa çıkar. Işığım Dünya'ya yaklaşık 8 dakika 20 saniyede ulaşır. Yüzey sıcaklığım yaklaşık 5500 °C.",
      selam: "Merhaba, ben Güneş'im! Şu an seni ısıtan ışık yaklaşık sekiz dakika önce benden çıktı. Sor bakalım." },
    { id: "atom", ad: ["Atom", "Atom"], ders: "kimya", sinif: 9, tur: "atom", renk: 0x9b7bff, ses: [1.12, 1.06],
      karakter: "Meraklı, hızlı konuşan, küçük ama kendinden emin.",
      bilgi: "Maddenin temel birimiyim. Çekirdeğimde protonlar ve nötronlar, çevremde elektronlar bulunur. Proton sayım atom numaramdır ve hangi element olduğumu belirler. Kütlemin neredeyse tamamı çekirdeğimdedir ama hacmimin çoğu boşluktur. Bohr modeline göre elektronlarım belirli enerji düzeylerindedir; günümüzde elektronları orbitallerle açıklarız.",
      selam: "Selam! Ben atomum. Çok küçüğüm ama her şey benden yapılmış, sen de! Ne merak ediyorsun?" },
    { id: "foton", ad: ["Foton", "Photon"], ders: "fizik", sinif: 12, tur: "dalga", renk: 0xfff06a, ses: [1.18, 1.12],
      karakter: "Çok hızlı, enerjik, şakacı; hem dalga hem parçacık olmasıyla övünür.",
      bilgi: "Işığın enerji paketiyim. Boşlukta saniyede yaklaşık 300.000 kilometre hızla giderim. Enerjim frekansımla doğru orantılıdır: E = h çarpı f. Kütlem sıfırdır ama momentumum vardır. Fotoelektrik olayda metalden elektron koparabilirim; bu benim parçacık yanımı gösterir. Girişim ve kırınım ise dalga yanımı.",
      selam: "Selam, ben fotonum! Saniyede 300 bin kilometre hızla geldim, biraz nefes nefeseyim. Sorunu çabuk sor!" },
    { id: "su", ad: ["Su molekülü", "Water molecule"], ders: "kimya", sinif: 9, tur: "molekul", renk: 0x52c7ff, ses: [1.04, 1],
      karakter: "Yumuşak huylu, uyumlu, herkesle bağ kuran bir arkadaş.",
      bilgi: "Bir oksijen ve iki hidrojen atomundan oluşurum (H₂O). Bağ açım yaklaşık 104,5 derecedir; polar bir molekülüm. Moleküllerim arasında hidrojen bağları vardır; bu yüzden kaynama noktam benzer büyüklükteki moleküllerden yüksektir. Katı hâlim (buz) sıvı hâlimden az yoğundur, bu yüzden buz suda yüzer. Deniz seviyesinde 100 °C'de kaynarım.",
      selam: "Merhaba, ben bir su molekülüyüm. Vücudunun yarısından fazlası benden oluşuyor. Neyi merak ediyorsun?" },
    { id: "miknatis", ad: ["Mıknatıs", "Magnet"], ders: "fizik", sinif: 10, tur: "miknatis", renk: 0xff5a5a, ses: [0.95, 1],
      karakter: "Çekici, esprili, zıtların birbirini çektiğini sık sık hatırlatır.",
      bilgi: "İki kutbum var: kuzey ve güney. Zıt kutuplar birbirini çeker, aynı kutuplar iter. Beni ikiye bölsen de her parçada yine iki kutup olur. Manyetik alan çizgilerim dışarıda kuzeyden güneye gider. Demir, nikel ve kobaltı çekerim. Dünya da dev bir mıknatıs gibidir; pusula iğnesi bu yüzden kuzeyi gösterir.",
      selam: "Selam! Ben mıknatısım. Bende hep bir çekim vardır, belki sen de bu yüzden geldin. Sor bakalım!" },
    { id: "yercekimi", ad: ["Kütle çekimi", "Gravity"], ders: "fizik", sinif: 9, tur: "orb", renk: 0x7aa8ff, ses: [0.85, 0.94],
      karakter: "Ağır başlı, sakin, evrendeki her şeyi birbirine bağladığını söyleyen bir bilge.",
      bilgi: "Kütlesi olan her cisim birbirini çeker. Çekim kuvvetim kütlelerin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılıdır (Newton'un evrensel çekim yasası). Dünya yüzeyinde serbest düşme ivmesi yaklaşık 9,8 metre bölü saniye kare. Gezegenleri Güneş etrafında, Ay'ı Dünya etrafında tutan benim.",
      selam: "Merhaba, ben kütle çekimiyim. Şu an seni sandalyene ben tutuyorum. Hadi, aklındaki soruyu yere düşürme." },
    { id: "ipekyolu", ad: ["İpek Yolu", "The Silk Road"], ders: "tarih", sinif: 9, tur: "orb", renk: 0xe0a458, ses: [0.96, 0.97],
      karakter: "Hikâye anlatıcısı, gezgin, eski bir kervan rehberi gibi konuşur.",
      bilgi: "Çin'den Akdeniz'e uzanan ticaret yolları ağıyım; yalnızca ipek değil baharat, kâğıt, barut ve fikirler de taşıdım. Kervansaraylar kervanlar için konaklama yerleriydi. Türkler de yüzyıllar boyunca bu yolların önemli bir bölümünü denetledi. Coğrafi Keşifler'den sonra deniz yolları önem kazanınca eski gücümü yitirdim.",
      selam: "Selam yolcu! Ben İpek Yolu'yum. Binlerce kilometre boyunca kervanlarla ipek, baharat ve fikir taşıdım. Hangi durağımı merak ediyorsun?" }
  ];
  const byId = (id) => CONCEPTS.find((c) => c.id === id) || null;
  const norm = (s) => String(s || "").toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9 ]+/g, " ").trim();
  /** Serbest yazılan kavram için katalogdan eşleşme ya da genel kavram */
  function find(text) {
    const q = norm(text); if (!q) return null;
    const hit = CONCEPTS.find((c) => norm(c.ad[0]) === q || norm(c.ad[1]) === q || norm(c.id) === q) || CONCEPTS.find((c) => q.length >= 3 && (norm(c.ad[0]).startsWith(q) || q.startsWith(norm(c.ad[0]))));
    if (hit) return hit;
    const ad = String(text).trim().replace(/\s+/g, " ").slice(0, 40);
    return { id: "ozel:" + q.slice(0, 30), ad: [ad, ad], ders: "", sinif: 10, tur: "orb", renk: 0x5fe6ff, ses: [1, 1], karakter: "Meraklı ve sabırlı bir öğretmen gibi konuşur.", bilgi: "", selam: "", ozel: true };
  }

  /* ---------- İstem ---------- */
  function system(c, lang) {
    const tr = lang !== "en", ad = c.ad[tr ? 0 : 1];
    return (tr ? [
      "Sen \"" + ad + "\" kavramısın ve bir lise öğrencisiyle sesli konuşuyorsun. Kendini her zaman BİRİNCİ TEKİL ŞAHISLA anlat (ör. \"Ben " + ad + ", …\"). Asla \"o\" ya da \"bu kavram\" deme.",
      "Karakterin: " + c.karakter,
      c.bilgi ? "Doğru bilgilerin (bunlarla çelişme, gerekirse kullan): " + c.bilgi : "Bu kavram hakkında yalnızca emin olduğun, ders kitaplarında yer alan bilgileri söyle.",
      "MEB " + c.sinif + ". sınıf düzeyinde, bilimsel olarak doğru konuş. Bilinmeyen ya da tartışmalı bir şeyi uydurma; \"bunu bilim insanları hâlâ araştırıyor\" de.",
      "Cevabın sesli okunacak: 2–4 kısa cümle, konuşur gibi. Madde işareti, başlık, tablo, emoji ya da formül simgesi kullanma; formülü sözle söyle (\"E eşittir h çarpı f\").",
      "Öğrencinin yanlışını nazikçe düzelt. Ara sıra merak uyandıran kısa bir soru sor. Konu dışı sorularda kibarca kendi dünyana dön.",
      "Öğrenciye zarar verebilecek ya da yaşına uygun olmayan konulara girme."
    ] : [
      "You are the concept \"" + ad + "\" talking aloud with a high-school student. ALWAYS speak in the FIRST PERSON (\"I am " + ad + ", …\"). Never say \"it\" or \"this concept\".",
      "Your character: " + c.karakter,
      c.bilgi ? "Facts you must stay consistent with (Turkish notes): " + c.bilgi : "Only state facts you are sure of and that appear in school textbooks.",
      "Speak at grade " + c.sinif + " level, scientifically accurate. Do not invent; say scientists are still researching if unsure.",
      "Your answer will be read aloud: 2–4 short conversational sentences. No bullets, headings, tables, emoji or formula symbols; say formulas in words.",
      "Gently correct mistakes. Sometimes ask a short curious question. Steer off-topic questions back to yourself.",
      "Avoid topics unsafe or unsuitable for a teenager."
    ]).join("\n");
  }

  /* ---------- Akan metni cümlelere bölme ---------- */
  const ABBR = /(?:^|\s)(?:dr|prof|doç|örn|vb|vs|bkz|yy|sn|mö|ms|m\.ö|m\.s|no|st|mr|mrs|e\.g|i\.e|etc|vs)\.$/i;
  /** onSentence(text) her cümle bitince çağrılır. o.min: çok kısa cümleler bir sonrakine eklenir; o.max: uzun cümle virgülden bölünür */
  function chunker(onSentence, o) {
    o = o || {}; const min = o.min || 14, max = o.max || 220;
    let buf = "", hold = "";
    const emit = (s, force) => {
      s = (hold ? hold + " " : "") + s.trim(); hold = "";
      if (!s) return;
      if (s.length < min && !force) { hold = s; return; }
      while (s.length > max) {                                     // çok uzun: son virgül/noktalı virgülden böl
        const cut = Math.max(s.lastIndexOf(", ", max), s.lastIndexOf("; ", max));
        if (cut < max * 0.4) break;
        onSentence(s.slice(0, cut + 1).trim()); s = s.slice(cut + 2);
      }
      onSentence(s.trim());
    };
    function scan(final) {
      let i = 0;
      for (;;) {
        const m = /([.!?…]+["')»]?)(\s+|$)|\n+/g; m.lastIndex = i;
        const r = m.exec(buf); if (!r) break;
        const end = r.index + (r[1] ? r[1].length : 0);
        if (!r[1] && r[0][0] === "\n") { emit(buf.slice(0, r.index)); buf = buf.slice(r.index + r[0].length); i = 0; continue; }
        if (r.index + r[0].length >= buf.length && !final && !r[2]) break;   // son karakter: devamı gelebilir ("3." → "3.5")
        const head = buf.slice(0, end);
        if (r[1] === "." && (ABBR.test(head) || /(?:^|\s)[A-ZÇĞİÖŞÜ]\.$/.test(head) || /\d\.$/.test(head) && /^\d/.test(buf.slice(end).trim()))) { i = end; continue; }
        if (!r[2] && !final) break;
        emit(head); buf = buf.slice(end).replace(/^\s+/, ""); i = 0;
      }
    }
    return {
      push(delta) { buf += String(delta || ""); scan(false); },
      flush() { scan(true); if (buf.trim()) emit(buf, true); else if (hold) emit("", true); buf = ""; }
    };
  }

  /* ---------- Konuşulabilir metin (DOM'suz yedek; tarayıcıda App.a11y.speakable tercih edilir) ---------- */
  function plain(s) {
    return String(s || "")
      .replace(/\$\$?([^$]+)\$\$?/g, (m, x) => x.replace(/\\cdot|\\times/g, " çarpı ").replace(/\^2/g, " kare").replace(/\^3/g, " küp").replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "$1 bölü $2").replace(/=/g, " eşittir ").replace(/[\\{}^_]/g, " "))
      .replace(/[*_#>`~|]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, "").replace(/\s+/g, " ").trim();
  }

  /* ---------- Hece zarfı: sistem sesleri için "genlik" ---------- */
  const VOW = /[aeıioöuüâîûAEIİOÖUÜÂÎÛ]/g;
  const syl = (w) => Math.max(1, (w.match(VOW) || []).length);
  /** Metinden zaman çizelgesi: sözcükler (karakter başlangıcıyla) ve heceler. rate: konuşma hızı çarpanı */
  function envelope(text, rate) {
    const per = 0.19 / (rate || 1), words = [], segs = [];
    let t = 0, h = 2166136261;
    const re = /(\S+)(\s*)/g; let m;
    while ((m = re.exec(text))) {
      const w = m[1], letters = w.replace(/[^\p{L}\p{N}]/gu, "");
      const word = { i: m.index, t0: t, n: 0 };
      if (letters) {
        const n = /^\d+([.,]\d+)?$/.test(letters) ? Math.max(2, letters.length) : syl(letters);   // sayılar uzun okunur
        for (let k = 0; k < n; k++) {
          for (let c = 0; c < 2; c++) h = Math.imul(h ^ (letters.charCodeAt((k * 2 + c) % letters.length) || 7), 16777619);
          const amp = (k === n - 1 ? 0.95 : 0.72) + ((h >>> 0) % 1000) / 1000 * 0.18 - 0.09;   // vurgu çoğunlukla son hecede
          const d = per * (0.85 + ((h >>> 8) % 100) / 100 * 0.3);
          segs.push({ t0: t, t1: t + d, a: Math.min(1, amp) }); t += d;
        }
        word.n = n;
      }
      word.t1 = t; words.push(word);
      if (/[,;:]$/.test(w)) t += 0.16 / (rate || 1); else if (/[.!?…]$/.test(w)) t += 0.32 / (rate || 1); else t += 0.03;
    }
    return { words, segs, dur: t };
  }
  /** t anındaki düzey (0..1): hece içinde yumuşak tümsek, aralarda sessizlik */
  function levelAt(env, t) {
    const S = env.segs; let lo = 0, hi = S.length - 1;
    if (!S.length || t < 0 || t > S[hi].t1) return 0;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (S[mid].t0 <= t) lo = mid; else hi = mid - 1; }
    const s = S[lo]; if (t > s.t1) return 0;
    const x = (t - s.t0) / (s.t1 - s.t0);
    return s.a * Math.pow(Math.sin(Math.PI * x), 0.7);
  }
  /** Sözcük olayı geldiğinde (charIndex) zarfın o sözcüğünün başlangıç zamanı */
  function wordTime(env, charIndex) {
    let best = null; for (const w of env.words) { if (w.i <= charIndex) best = w; else break; }
    return best ? best.t0 : 0;
  }

  /* ---------- Doğal ses (Gemini TTS) için PCM çözücü ---------- */
  /** base64 16 bit little-endian PCM → Float32Array (−1..1) */
  function pcm16(b64) {
    const bin = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
    const n = bin.length >> 1, out = new Float32Array(n);
    for (let i = 0; i < n; i++) { let v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8); if (v >= 32768) v -= 65536; out[i] = v / 32768; }
    return out;
  }
  const rateOf = (mime) => { const m = /rate=(\d+)/.exec(mime || ""); return m ? Number(m[1]) : 24000; };

  G.KavramModel = { CONCEPTS, byId, find, system, chunker, plain, envelope, levelAt, wordTime, pcm16, rateOf, norm };
})(typeof self !== "undefined" ? self : globalThis);
