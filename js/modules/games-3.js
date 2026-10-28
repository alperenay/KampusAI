/* =========================================================
   games-3.js — Yeni oyun türleri (v1.51)
     Matematik: Sayı Doğrusu Avcısı — √10, π, log₂ 20 gibi değerleri sayı doğrusunda tahmin et; yakınlık puanı
     Fizik:     Birim Avcısı — büyüklüğü SI birimiyle eşleştir; art arda doğrular seri çarpanı verir
     Her ders:  Sırala! — özkütle, gezegen çapı, pH, tarih… dört öğeyi küçükten büyüğe diz
   Ortak altyapı games.js'tedir (startScreen, countdown, endScreen, rekorlar).
   ========================================================= */
(function () {
  const G = App.games;
  if (!G) return;
  const { esc } = App.utils;
  const { shuffle, pick, inline, startScreen, endScreen, countdown, alive, T } = G.util;

  /* ---------------- Sayı Doğrusu Avcısı ---------------- */
  const LINE = [["\\sqrt{2}", Math.SQRT2], ["\\sqrt{10}", Math.sqrt(10)], ["\\pi", Math.PI], ["e", Math.E], ["\\tfrac{7}{3}", 7 / 3], ["\\log_2 8", 3], ["\\log_2 20", Math.log2(20)],
    ["2^{3/2}", Math.pow(2, 1.5)], ["10 \\sin 30^\\circ", 5], ["|-4{,}5|", 4.5], ["\\tfrac{3!}{2}", 3], ["\\sqrt{50}", Math.sqrt(50)], ["0{,}75 \\cdot 8", 6], ["\\tfrac{22}{7}", 22 / 7],
    ["\\sqrt[3]{100}", Math.cbrt(100)], ["1{,}5^2", 2.25], ["\\log_{10} 1000", 3], ["\\tfrac{17}{2}", 8.5], ["\\sqrt{80}", Math.sqrt(80)], ["2\\pi", 2 * Math.PI], ["\\tfrac{9}{4}", 2.25], ["\\ln 100", Math.log(100)]];
  /** Tahmin hatasından puan: tam isabet 100, 2 birim ve ötesi 0 */
  const linePoints = (guess, value) => Math.max(0, Math.round(100 * (1 - Math.abs(guess - value) / 2)));
  G.add("sayidogrusu", {
    subj: "matematik", icon: "sMath",
    title: () => T("Sayı Doğrusu Avcısı", "Number Line Hunter"),
    desc: () => T("√10, π, log₂ 20… Değeri hesaplamadan tahmin et ve sayı doğrusunda yerine dokun. Ne kadar yakınsa o kadar puan.", "Estimate √10, π, log₂ 20… and tap its place on the number line."),
    play(area) {
      const rounds = shuffle(LINE).slice(0, 8);
      let r = 0, score = 0, streak = 0, near = 0;
      startScreen(area, '<p class="hint">' + esc(T("8 tur. 0 ile 10 arasındaki doğruya dokun. 0,2'den yakın tahminler seri yapar ve puanı katlar.", "8 rounds on a 0–10 line. Guesses within 0.2 build a streak multiplier.")) + "</p>", () => next());
      const next = () => {
        if (!alive(area)) return;
        if (r >= rounds.length) return endScreen(area, "sayidogrusu", score, '<p class="hint">' + esc(T(near + " tahmin 0,2'den yakın", near + " guesses within 0.2")) + "</p>", () => G.GAMES.sayidogrusu.play(area));
        const [tex, value] = rounds[r];
        area.innerHTML = '<div class="nl"><div class="dy__hud"><span>' + esc(T("Tur", "Round")) + " " + (r + 1) + "/" + rounds.length + "</span><span>" + esc(T("Seri", "Streak")) + " <b>×" + (1 + Math.min(streak, 4) * 0.25).toFixed(2).replace(".", ",") + "</b></span><span>" + esc(T("Puan", "Score")) + " <b>" + score + "</b></span></div>" +
          '<p class="nl-q md">' + inline("$" + tex + "$") + "</p>" +
          '<div class="nl-line" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="10" aria-valuenow="5" aria-label="' + esc(T("Sayı doğrusu: ok tuşlarıyla seç, Enter ile onayla", "Number line: arrows to move, Enter to confirm")) + '"><i class="nl-track"></i>' +
          Array.from({ length: 11 }, (_, k) => '<span class="nl-tick" style="left:' + k * 10 + '%">' + k + "</span>").join("") + '<i class="nl-cursor" hidden></i><i class="nl-true" hidden></i></div><p class="nl-msg" aria-live="polite"></p></div>';
        const line = area.querySelector(".nl-line"), cur = area.querySelector(".nl-cursor");
        let kb = 5, done = false;
        const place = (v) => { cur.hidden = false; cur.style.left = v * 10 + "%"; line.setAttribute("aria-valuenow", v.toFixed(1)); };
        const answer = (guess) => {
          if (done) return; done = true;
          const pts = linePoints(guess, value), mult = 1 + Math.min(streak, 4) * 0.25;
          if (Math.abs(guess - value) <= 0.2) { streak++; near++; } else streak = 0;
          score += Math.round(pts * mult);
          place(guess);
          const tr = area.querySelector(".nl-true"); tr.hidden = false; tr.style.left = value * 10 + "%";
          area.querySelector(".nl-msg").textContent = T("Gerçek değer ≈ ", "Actual ≈ ") + value.toFixed(2).replace(".", App.i18n.lang === "en" ? "." : ",") + " · +" + Math.round(pts * mult);
          r++; setTimeout(next, 1500);
        };
        line.addEventListener("pointerdown", (e) => { const b = line.getBoundingClientRect(); answer(Math.max(0, Math.min(10, ((e.clientX - b.left) / b.width) * 10))); });
        line.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") { kb = Math.max(0, Math.min(10, kb + (e.key === "ArrowRight" ? 0.1 : -0.1))); place(kb); e.preventDefault(); }
          else if (e.key === "Enter" || e.key === " ") { answer(kb); e.preventDefault(); }
        });
        line.focus({ preventScroll: true });
      };
    }
  });

  /* ---------------- Birim Avcısı ---------------- */
  const UNITS = () => [[T("Kuvvet", "Force"), "N"], [T("Enerji", "Energy"), "J"], [T("Güç", "Power"), "W"], [T("Basınç", "Pressure"), "Pa"], [T("İvme", "Acceleration"), "m/s²"], [T("Momentum", "Momentum"), "kg·m/s"],
    [T("Frekans", "Frequency"), "Hz"], [T("Elektrik yükü", "Electric charge"), "C"], [T("Direnç", "Resistance"), "Ω"], [T("Potansiyel fark", "Voltage"), "V"], [T("Akım", "Current"), "A"], [T("Özkütle", "Density"), "kg/m³"],
    [T("Manyetik alan", "Magnetic field"), "T"], [T("Öz ısı", "Specific heat"), "J/(kg·K)"], [T("Tork", "Torque"), "N·m"], [T("Açısal hız", "Angular velocity"), "rad/s"], [T("Madde miktarı", "Amount of substance"), "mol"], [T("Sığa", "Capacitance"), "F"]];
  G.add("birim", {
    subj: "fizik", icon: "sPhys",
    title: () => T("Birim Avcısı", "Unit Hunter"),
    desc: () => T("45 saniyede büyüklükleri SI birimleriyle eşleştir. Art arda doğrular seri çarpanını büyütür; yanlış seriyi sıfırlar.", "Match quantities to SI units in 45 seconds; streaks multiply your score."),
    play(area) {
      let score = 0, streak = 0, ok = 0, bad = 0, over = false, timer = null;
      startScreen(area, '<p class="hint">' + esc(T("Her doğru 10 puan × seri çarpanı (en çok ×3).", "Each hit is 10 points × streak (up to ×3).")) + "</p>", () => {
        area.innerHTML = '<div class="qz bu"></div>';
        timer = countdown(area.querySelector(".bu"), 45, null, () => { over = true; endScreen(area, "birim", score, '<p class="hint">' + esc(T(ok + " doğru · " + bad + " yanlış", ok + " correct · " + bad + " wrong")) + "</p>", () => G.GAMES.birim.play(area)); });
        round();
      });
      const round = () => {
        if (over || !alive(area)) return;
        const all = UNITS(), q = pick(all), opts = shuffle([q[1]].concat(shuffle(all.filter((x) => x[1] !== q[1])).slice(0, 3).map((x) => x[1])));
        const box = area.querySelector(".bu"), mult = Math.min(3, 1 + streak * 0.25);
        let body = box.querySelector(".bu-body"); if (!body) { body = document.createElement("div"); body.className = "bu-body"; box.appendChild(body); }
        body.innerHTML = '<div class="dy__hud"><span>' + esc(T("Seri", "Streak")) + " <b>" + streak + "</b> (×" + mult.toFixed(2).replace(".", ",") + ")</span><span>" + esc(T("Puan", "Score")) + " <b>" + score + "</b></span></div>" +
          '<p class="bu-q">' + esc(q[0]) + '</p><div class="qz__opts">' + opts.map((o) => '<button class="qz__opt" type="button" data-u="' + esc(o) + '">' + esc(o) + "</button>").join("") + "</div>";
        body.querySelectorAll("[data-u]").forEach((b) => b.addEventListener("click", () => {
          if (over) return;
          const good = b.dataset.u === q[1];
          if (good) { ok++; score += Math.round(10 * mult); streak++; } else { bad++; streak = 0; }
          b.classList.add(good ? "is-ok" : "is-bad");
          body.querySelectorAll("[data-u]").forEach((x) => { x.disabled = true; if (x.dataset.u === q[1]) x.classList.add("is-ok"); });
          setTimeout(round, good ? 250 : 900);
        }));
      };
      return () => timer && timer.stop();
    }
  });

  /* ---------------- Sırala! ---------------- */
  const SETS = () => [
    [T("Özkütle (g/cm³)", "Density (g/cm³)"), [[T("Mantar", "Cork"), 0.24], [T("Su", "Water"), 1], [T("Alüminyum", "Aluminium"), 2.7], [T("Demir", "Iron"), 7.9]]],
    [T("Gezegen çapı (km)", "Planet diameter (km)"), [[T("Merkür", "Mercury"), 4879], ["Mars", 6779], [T("Dünya", "Earth"), 12742], [T("Jüpiter", "Jupiter"), 139820]]],
    [T("Dalga boyu", "Wavelength"), [[T("Gama ışını", "Gamma ray"), 1e-12], [T("X ışını", "X-ray"), 1e-10], [T("Görünür ışık", "Visible light"), 5e-7], [T("Radyo dalgası", "Radio wave"), 1]]],
    [T("Tarih (yıl)", "Date (year)"), [[T("İstanbul'un Fethi", "Conquest of Istanbul"), 1453], [T("Mohaç Savaşı", "Battle of Mohács"), 1526], [T("Lale Devri başlangıcı", "Tulip Era begins"), 1718], [T("Tanzimat Fermanı", "Tanzimat Edict"), 1839]]],
    [T("Büyüklük (µm)", "Size (µm)"), [[T("Virüs", "Virus"), 0.1], [T("Bakteri", "Bacterium"), 2], [T("İnsan yumurta hücresi", "Human egg cell"), 120], [T("Kurbağa yumurtası", "Frog egg"), 1500]]],
    ["pH", [[T("Mide öz suyu", "Gastric juice"), 1.5], [T("Sirke", "Vinegar"), 2.8], [T("Saf su", "Pure water"), 7], [T("Çamaşır suyu", "Bleach"), 12.5]]],
    [T("Ses hızı (m/s)", "Speed of sound (m/s)"), [[T("Hava", "Air"), 343], [T("Hidrojen gazı", "Hydrogen gas"), 1270], [T("Su", "Water"), 1480], [T("Çelik", "Steel"), 5960]]],
    [T("Değer", "Value"), [["1/3", 1 / 3], ["3/8", 0.375], ["0,4", 0.4], ["5/11", 5 / 11]]],
    [T("Yükseklik (m)", "Height (m)"), [[T("Uludağ", "Uludağ"), 2543], [T("Erciyes", "Erciyes"), 3917], [T("Ağrı Dağı", "Mount Ararat"), 5137], ["Everest", 8849]]],
    [T("Elektronegatiflik", "Electronegativity"), [["Na", 0.93], ["C", 2.55], ["O", 3.44], ["F", 3.98]]]
  ];
  /** Doğru sıradaki öğe sayısı (yerinde olanlar) */
  const inPlace = (order, items) => { const sorted = items.slice().sort((a, b) => a[1] - b[1]); return order.filter((it, i) => it === sorted[i]).length; };
  const fmtV = (v) => (v < 0.01 || v >= 1e5 ? v.toExponential(0).replace("e", "·10^").replace("+", "") : String(+v.toFixed(3)).replace(".", App.i18n.lang === "en" ? "." : ","));
  G.add("sirala", {
    subj: "genel", icon: "list",
    title: () => T("Sırala!", "Sort It!"),
    desc: () => T("Fizik, kimya, biyoloji, coğrafya ve tarihten dört öğeyi küçükten büyüğe diz. Sıra tamamen doğruysa bonus.", "Put four items from science, geography and history in ascending order."),
    play(area) {
      const sets = shuffle(SETS()).slice(0, 6);
      let r = 0, score = 0, perfect = 0;
      startScreen(area, '<p class="hint">' + esc(T("6 tur. Öğelere küçükten büyüğe sırayla dokun. Her doğru yer 10 puan, tam doğru sıra +20.", "6 rounds. Tap items from smallest to largest; each right place 10 points, perfect order +20.")) + "</p>", () => next());
      const next = () => {
        if (!alive(area)) return;
        if (r >= sets.length) return endScreen(area, "sirala", score, '<p class="hint">' + esc(T(perfect + " tur tam doğru", perfect + " perfect rounds")) + "</p>", () => G.GAMES.sirala.play(area));
        const [label, items] = sets[r], shown = shuffle(items), chosen = [];
        area.innerHTML = '<div class="so"><div class="dy__hud"><span>' + esc(T("Tur", "Round")) + " " + (r + 1) + "/" + sets.length + "</span><span>" + esc(T("Puan", "Score")) + " <b>" + score + "</b></span></div>" +
          '<p class="so-q">' + esc(T("Küçükten büyüğe: ", "Smallest to largest: ")) + "<b>" + esc(label) + "</b></p>" +
          '<ol class="so-picked" aria-label="' + esc(T("Senin sıran", "Your order")) + '"></ol><div class="so-items">' + shown.map((it, i) => '<button class="btn so-item" type="button" data-i="' + i + '">' + esc(it[0]) + "</button>").join("") + "</div>" +
          '<div class="game-dock"><button class="btn btn--ghost" type="button" id="soUndo">' + esc(T("Geri al", "Undo")) + "</button></div><p class=\"so-msg\" aria-live=\"polite\"></p></div>";
        const paint = () => {
          area.querySelector(".so-picked").innerHTML = chosen.map((it) => "<li>" + esc(it[0]) + "</li>").join("");
          area.querySelectorAll(".so-item").forEach((b) => { b.disabled = chosen.includes(shown[Number(b.dataset.i)]); });
        };
        area.querySelectorAll(".so-item").forEach((b) => b.addEventListener("click", () => {
          chosen.push(shown[Number(b.dataset.i)]); paint();
          if (chosen.length < items.length) return;
          const n = inPlace(chosen, items), full = n === items.length;
          score += n * 10 + (full ? 20 : 0); if (full) perfect++;
          const sorted = items.slice().sort((a, b2) => a[1] - b2[1]);
          area.querySelector(".so-picked").innerHTML = chosen.map((it, i) => '<li class="' + (it === sorted[i] ? "is-ok" : "is-bad") + '">' + esc(it[0]) + " <small>" + esc(fmtV(it[1])) + "</small></li>").join("");
          area.querySelector(".so-msg").textContent = full ? T("Kusursuz sıra! +20", "Perfect order! +20") : T("Doğru sıra: ", "Correct order: ") + sorted.map((x) => x[0]).join(" < ");
          area.querySelector("#soUndo").disabled = true;
          r++; setTimeout(next, full ? 1300 : 2600);
        }));
        area.querySelector("#soUndo").addEventListener("click", () => { chosen.pop(); paint(); });
      };
    }
  });

  App.games3 = { linePoints, inPlace, LINE, SETS, UNITS };
})();
