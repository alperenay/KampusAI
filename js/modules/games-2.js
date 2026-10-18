/* =========================================================
   games-2.js — Hedef Atış · Denklem Denkleştirme · Periyodik Tablo
                Tarih Şeridi · Kelime Kaydırma
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const G = App.games, { rnd, shuffle, pick, endScreen, countdown, startScreen, alive, T } = G.util;
  const sub = (s) => String(s).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[d]);

  /* ======================= 4. Hedef Atış ======================= */
  const LEVELS = [
    { d: 20 }, { d: 35 }, { d: 50 }, { d: 30, h: 10 }, { d: 40, wind: 2 }, { d: 45, wall: [22, 14] },
    { d: 25, h: -12 }, { d: 55, wind: -3 }, { d: 40, h: 15, wall: [20, 22] }, { d: 60, wind: 3, wall: [30, 18] }
  ];
  G.add("hedef", {
    subj: "fizik", icon: "target",
    title: () => T("Hedef Atış", "Target Shot"),
    desc: () => T("Hızı ve açıyı ayarla, hedefi vur. 10 bölüm: yükseltiler, duvarlar ve rüzgâr. Az denemeyle vurursan çok yıldız.", "Set speed and angle to hit the target. 10 levels with heights, walls and wind."),
    play(area) {
      const prog = Object.assign({ stars: [] }, App.prefs.get("gameHedef", {}));
      const total = () => prog.stars.reduce((a, b) => a + (b || 0), 0);
      const pickLevel = () => {
        area.innerHTML = '<div class="hd-levels">' + LEVELS.map((L0, i) => { const st = prog.stars[i] || 0, open = i === 0 || prog.stars[i - 1];
          return '<button class="hd-lv' + (st ? " is-done" : "") + '" type="button" data-lv="' + i + '"' + (open ? "" : " disabled") + "><b>" + (i + 1) + '</b><span class="hd-stars">' + "★".repeat(st) + "☆".repeat(3 - st) + "</span></button>"; }).join("") +
          '</div><p class="hint">' + esc(T("Toplam yıldız: ", "Total stars: ") + total() + " / 30") + "</p>";
        area.querySelectorAll("[data-lv]").forEach((b) => b.addEventListener("click", () => level(Number(b.dataset.lv))));
      };
      const level = (li) => {
        const Lv = LEVELS[li], g = 9.8; let tries = 0, anim = 0;
        area.innerHTML = '<div class="hd"><div class="dy__hud"><span>' + esc(T("Bölüm", "Level")) + " " + (li + 1) + '</span><span id="hdInfo">' + (Lv.wind ? esc(T("Rüzgâr ", "Wind ")) + (Lv.wind > 0 ? "→ " : "← ") + Math.abs(Lv.wind) + " m/s²" : "") + '</span><span>' + esc(T("Deneme", "Tries")) + ' <b id="hdT">0</b></span></div>' +
          '<canvas class="gr__cv hd__cv"></canvas>' +
          '<div class="hd__ctl"><label class="lab-ctl"><span class="lab-ctl__top"><span>' + esc(T("Açı", "Angle")) + '</span><output id="oA">45°</output></span><input type="range" id="hA" min="5" max="85" value="45"></label>' +
          '<label class="lab-ctl"><span class="lab-ctl__top"><span>' + esc(T("Hız", "Speed")) + '</span><output id="oV">15 m/s</output></span><input type="range" id="hV" min="5" max="40" step="0.5" value="15"></label></div>' +
          '<div class="game-dock"><button class="btn" type="button" id="hdBack">' + App.icon("chevronL") + esc(T("Bölümler", "Levels")) + '</button><button class="btn btn--primary" type="button" id="hdGo">' + App.icon("target") + esc(T("Fırlat", "Launch")) + "</button></div>" +
          '<p class="hint" id="hdHint"></p></div>';
        App.hydrateIcons(area);
        const cv = area.querySelector("canvas"), W = cv.parentElement.clientWidth, H = Math.round(Math.min(W * 0.6, 340)), dpr = Math.min(2, window.devicePixelRatio || 1);
        cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px"; const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const U = App.labs.util, c = U.colors(), y0 = Math.max(0, -(Lv.h || 0)), top = Math.max(30, (Lv.h || 0) + 25, Lv.wall ? Lv.wall[1] + 8 : 0);
        const xmax = Lv.d + 12, sc = Math.min((W - 30) / xmax, (H - 30) / (top + y0)), X = (x) => 15 + x * sc, Y = (y) => H - 12 - (y + y0) * sc;
        const ty = Lv.h || 0, paths = [];
        const scene = () => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = c.grid; ctx.fillRect(0, Y(0), X(4), H - Y(0));
          ctx.fillRect(X(Lv.d - 4), Y(ty), X(Lv.d + 12) - X(Lv.d - 4), H - Y(ty));
          ctx.strokeStyle = c.border; ctx.beginPath(); ctx.moveTo(X(4), Y(Math.min(0, ty))); ctx.lineTo(X(Lv.d - 4), Y(Math.min(0, ty))); ctx.stroke();
          if (Lv.wall) { ctx.fillStyle = "#8a6a55"; ctx.fillRect(X(Lv.wall[0]) - 4, Y(Lv.wall[1]), 8, Y(Math.min(0, ty)) - Y(Lv.wall[1])); }
          ctx.fillStyle = c.bad; ctx.fillRect(X(Lv.d - 1.5), Y(ty) - 4, X(Lv.d + 1.5) - X(Lv.d - 1.5), 6); ctx.fillStyle = "#fff"; ctx.fillRect(X(Lv.d - 0.5), Y(ty) - 4, X(Lv.d + 0.5) - X(Lv.d - 0.5), 6);
          paths.forEach((pp, i) => { ctx.strokeStyle = i === paths.length - 1 ? c.accent : c.muted + "66"; ctx.lineWidth = i === paths.length - 1 ? 2.2 : 1.2; ctx.beginPath(); pp.forEach((q, k) => (k ? ctx.lineTo(X(q[0]), Y(q[1])) : ctx.moveTo(X(q[0]), Y(q[1])))); ctx.stroke(); });
          const a = Number(area.querySelector("#hA").value) * Math.PI / 180; U.arrow(ctx, X(0), Y(0), X(0) + Math.cos(a) * 34, Y(0) - Math.sin(a) * 34, c.warn, 2.4);
          if (Lv.wind) U.label(ctx, (Lv.wind > 0 ? "→ " : "← ") + T("rüzgâr", "wind"), W - 10, 14, c.muted, "right", 11);
        };
        const sync = () => { area.querySelector("#oA").textContent = area.querySelector("#hA").value + "°"; area.querySelector("#oV").textContent = String(area.querySelector("#hV").value).replace(".", ",") + " m/s"; scene(); };
        area.querySelectorAll("input[type=range]").forEach((r) => r.addEventListener("input", sync)); sync();
        area.querySelector("#hdBack").addEventListener("click", () => { cancelAnimationFrame(anim); pickLevel(); });
        area.querySelector("#hdGo").addEventListener("click", () => {
          if (anim) return;
          tries++; area.querySelector("#hdT").textContent = tries;
          const a = Number(area.querySelector("#hA").value) * Math.PI / 180, v = Number(area.querySelector("#hV").value);
          let x = 0, y = 0, vx = v * Math.cos(a), vy = v * Math.sin(a); const pth = [[0, 0]]; paths.push(pth); let res = null;
          const step = () => {
            if (!alive(cv)) return;
            for (let k = 0; k < 6; k++) {
              const dt = 0.01, px = x, py = y; vx += (Lv.wind || 0) * dt; vy -= g * dt; x += vx * dt; y += vy * dt; pth.push([x, y]);
              if (Lv.wall && px < Lv.wall[0] && x >= Lv.wall[0] && y < Lv.wall[1]) { res = "wall"; break; }
              const floor = x <= 4 ? 0 : x >= Lv.d - 4 ? ty : Math.min(0, ty);
              if (ty > 0 && px < Lv.d - 4 && x >= Lv.d - 4 && y < ty) { res = "miss"; break; }      // platformun yan yüzüne çarptı
              if (vy < 0 && y <= floor) { res = Math.abs(x - Lv.d) <= 1.5 ? "hit" : "miss"; break; }
              if (x > xmax + 5 || y < -y0 - 5) { res = "miss"; break; }
            }
            scene();
            if (!res) { anim = requestAnimationFrame(step); return; }
            anim = 0;
            const hint = area.querySelector("#hdHint");
            if (res === "hit") {
              const st = tries === 1 ? 3 : tries === 2 ? 2 : 1; prog.stars[li] = Math.max(prog.stars[li] || 0, st); App.prefs.set("gameHedef", prog);
              G.util.saveBest("hedef", total());
              hint.innerHTML = "<b>" + esc(T("Vurdun! ", "Hit! ")) + "★".repeat(st) + "</b>";
              setTimeout(() => { if (!alive(cv)) return; if (li + 1 < LEVELS.length) level(li + 1); else endScreen(area, "hedef", total(), '<p class="hint">' + esc(T("Bütün bölümler bitti.", "All levels done.")) + "</p>", () => pickLevel()); }, 1100);
            } else {
              const dx = x - Lv.d;
              hint.textContent = res === "wall" ? T("Duvara çarptı. Açıyı büyüt.", "Hit the wall. Aim higher.") : (dx < 0 ? T("Kısa kaldı (", "Short by (") + Math.abs(dx).toFixed(1) + " m)" : T("Uzun gitti (", "Too long (") + dx.toFixed(1) + " m)");
              if (tries >= 2 && !Lv.wind && !Lv.h && !Lv.wall) { const need = Math.sqrt(Lv.d * g / Math.sin(2 * a)); hint.textContent += " · " + T("İpucu: R = v²·sin2θ / g → bu açı için v ≈ ", "Hint: R = v²·sin2θ/g → v ≈ ") + need.toFixed(1) + " m/s"; }
            }
          };
          step();
        });
      };
      pickLevel();
    }
  });

  /* ======================= 5. Denklem Denkleştirme ======================= */
  function parseF(f) {
    const st = [{}]; let i = 0;
    while (i < f.length) {
      const ch = f[i];
      if (ch === "(") { st.push({}); i++; }
      else if (ch === ")") { i++; let n = ""; while (/\d/.test(f[i] || "")) n += f[i++]; const g = st.pop(), k = n ? +n : 1; for (const e in g) st[st.length - 1][e] = (st[st.length - 1][e] || 0) + g[e] * k; }
      else { let e = f[i++]; while (/[a-z]/.test(f[i] || "")) e += f[i++]; let n = ""; while (/\d/.test(f[i] || "")) n += f[i++]; st[st.length - 1][e] = (st[st.length - 1][e] || 0) + (n ? +n : 1); }
    }
    return st[0];
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  G.add("denklem", {
    subj: "kimya", icon: "sChem",
    title: () => T("Denklem Denkleştirme", "Balance the Equation"),
    desc: () => T("Katsayıları artırıp azaltarak tepkimeyi denkleştir. Atom sayıları iki tarafta eşitlenince sonraki tepkimeye geçersin.", "Adjust coefficients until atoms balance on both sides."),
    play(area) {
      const list = App.data.reactions.slice().sort((a, b) => a[2] - b[2]);
      let idx = 0, moves = 0, t0 = performance.now(), solved = 0;
      startScreen(area, '<p class="hint">' + esc(T(list.length + " tepkime, kolaydan zora. Az hamle ve kısa sürede bitirirsen puanın yüksek olur.", list.length + " reactions, easy to hard.")) + "</p>", () => { t0 = performance.now(); show(); });
      const show = () => {
        if (idx >= list.length) return finish();
        const [R, P] = list[idx], sp = R.concat(P), A = sp.map(parseF), co = sp.map(() => 1), els = Array.from(new Set(A.flatMap((o) => Object.keys(o))));
        const draw = () => {
          const side = (from, to) => sp.slice(from, to).map((f, j) => { const k = from + j; return '<span class="eq-sp"><span class="eq-step"><button type="button" data-d="-1" data-k="' + k + '" aria-label="−">−</button><b>' + co[k] + '</b><button type="button" data-d="1" data-k="' + k + '" aria-label="+">+</button></span><span class="eq-f">' + esc(sub(f)) + "</span></span>"; }).join('<span class="eq-plus">+</span>');
          const cnt = (from, to, e) => sp.slice(from, to).reduce((s, f, j) => s + (A[from + j][e] || 0) * co[from + j], 0);
          const rows = els.map((e) => { const l = cnt(0, R.length, e), r = cnt(R.length, sp.length, e); return '<tr class="' + (l === r ? "is-ok" : "") + '"><th>' + e + "</th><td>" + l + "</td><td>" + r + "</td></tr>"; }).join("");
          const ok = els.every((e) => cnt(0, R.length, e) === cnt(R.length, sp.length, e)) && co.reduce(gcd) === 1;
          area.innerHTML = '<div class="eq"><div class="dy__hud"><span>' + esc(T("Tepkime", "Reaction")) + " " + (idx + 1) + "/" + list.length + "</span><span>" + esc(T("Hamle", "Moves")) + " <b>" + moves + "</b></span></div>" +
            '<div class="eq-line">' + side(0, R.length) + '<span class="eq-arrow">→</span>' + side(R.length, sp.length) + "</div>" +
            '<table class="eq-tab"><thead><tr><th>' + esc(T("Atom", "Atom")) + "</th><th>" + esc(T("Sol", "Left")) + "</th><th>" + esc(T("Sağ", "Right")) + "</th></tr></thead><tbody>" + rows + "</tbody></table>" +
            (ok ? '<p class="eq-done">' + App.icon("checkCircle") + esc(T("Denkleşti!", "Balanced!")) + "</p>" : '<div class="game-dock"><button class="btn btn--ghost" type="button" id="eqSkip">' + esc(T("Geç", "Skip")) + "</button></div>") + "</div>";
          App.hydrateIcons(area);
          area.querySelectorAll("[data-d]").forEach((b) => b.addEventListener("click", () => { const k = Number(b.dataset.k); co[k] = Math.max(1, Math.min(15, co[k] + Number(b.dataset.d))); moves++; draw(); }));
          const sk = area.querySelector("#eqSkip"); if (sk) sk.addEventListener("click", () => { idx++; show(); });
          if (ok) { solved++; setTimeout(() => { if (alive(area)) { idx++; show(); } }, 900); }
        };
        draw();
      };
      const finish = () => { const secs = Math.round((performance.now() - t0) / 1000), score = Math.max(0, solved * 100 - Math.max(0, moves - solved * 6) * 2 - Math.floor(secs / 5));
        endScreen(area, "denklem", score, '<p class="hint">' + esc(T(solved + " tepkime · " + moves + " hamle · " + secs + " sn", solved + " reactions · " + moves + " moves · " + secs + " s")) + "</p>", () => G.GAMES.denklem.play(area)); };
    }
  });

  /* ======================= 6. Periyodik Tablo ======================= */
  G.add("periyodik", {
    subj: "kimya", icon: "list",
    title: () => T("Periyodik Tablo Yapbozu", "Periodic Table Puzzle"),
    desc: () => T("Elementleri tablodaki yerlerine yerleştir ya da 60 saniyelik hızlı sorularla (yarıçap, iyonlaşma enerjisi, grup) yarış.", "Place elements in the table, or race through 60 s of quick trend questions."),
    play(area) {
      const EL = App.data.elements;
      area.innerHTML = '<div class="game-start"><div class="pt-modes"><button class="btn btn--primary" type="button" data-m="yer">' + App.icon("list") + esc(T("Yerleştir (ilk 20)", "Place (first 20)")) + '</button>' +
        '<button class="btn" type="button" data-m="yer36">' + App.icon("list") + esc(T("Yerleştir (ilk 36)", "Place (first 36)")) + '</button><button class="btn" type="button" data-m="soru">' + App.icon("timer") + esc(T("60 sn hızlı soru", "60 s quick quiz")) + "</button></div></div>";
      App.hydrateIcons(area);
      area.querySelectorAll("[data-m]").forEach((b) => b.addEventListener("click", () => (b.dataset.m === "soru" ? quiz() : place(b.dataset.m === "yer" ? 20 : 36))));
      const place = (n) => {
        const queue = shuffle(EL.list.slice(0, n)), placed = new Set(); let miss = 0; const t0 = performance.now();
        const rows = n <= 20 ? 4 : 4;
        area.innerHTML = '<div class="pt"><div class="dy__hud"><span>' + esc(T("Kalan", "Left")) + ' <b id="ptL">' + queue.length + "</b></span><span>" + esc(T("Hata", "Misses")) + ' <b id="ptM">0</b></span></div>' +
          '<div class="pt-card" id="ptC"></div><div class="pt-wrap"><div class="pt-grid">' +
          Array.from({ length: rows * 18 }, (_, i) => { const gr = (i % 18) + 1, pe = Math.floor(i / 18) + 1; const exists = EL.list.slice(0, n).some((e) => e.group === gr && e.period === pe);
            return '<button type="button" class="pt-cell' + (exists ? "" : " is-void") + '" data-g="' + gr + '" data-p="' + pe + '"' + (exists ? "" : " disabled") + "></button>"; }).join("") + "</div></div></div>";
        const cur = () => queue[0];
        const showCard = () => { const e = cur(); area.querySelector("#ptC").innerHTML = '<b style="--c:' + EL.CAT[e.cat].color + '">' + e.sym + "</b><span>" + esc(App.L(e.name)) + " · Z = " + e.z + "</span>"; };
        showCard();
        area.querySelectorAll(".pt-cell:not(.is-void)").forEach((cell) => cell.addEventListener("click", () => {
          const e = cur(); if (!e || cell.classList.contains("is-on")) return;
          if (Number(cell.dataset.g) === e.group && Number(cell.dataset.p) === e.period) {
            cell.classList.add("is-on"); cell.style.setProperty("--c", EL.CAT[e.cat].color); cell.textContent = e.sym; placed.add(e.z); queue.shift();
            area.querySelector("#ptL").textContent = queue.length;
            if (!queue.length) { const secs = Math.round((performance.now() - t0) / 1000), score = Math.max(0, n * 20 - miss * 15 - secs);
              setTimeout(() => endScreen(area, "periyodik", score, '<p class="hint">' + esc(T(secs + " sn · " + miss + " hata", secs + " s · " + miss + " misses")) + "</p>", () => G.GAMES.periyodik.play(area)), 500); }
            else showCard();
          } else { miss++; area.querySelector("#ptM").textContent = miss; cell.classList.add("is-bad"); setTimeout(() => cell.classList.remove("is-bad"), 400); if (navigator.vibrate) navigator.vibrate(40); }
        }));
      };
      const quiz = () => {
        let score = 0, ok = 0, bad = 0;
        area.innerHTML = '<div class="qz"><div class="dy__hud"><span>' + esc(T("Puan", "Score")) + ' <b id="qS">0</b></span></div><div class="qz__q" id="qQ"></div><div class="qz__opts" id="qO"></div><p class="hint" id="qWhy"></p></div>';
        const mk = () => {
          const kind = rnd(0, 3), L36 = EL.list;
          if (kind === 0) { // yarıçap / iyonlaşma karşılaştırma (aynı grup ya da periyot)
            const a = pick(L36.filter((e) => e.cat !== "soygaz" && e.cat !== "gecis")); const same = L36.filter((e) => e !== a && e.cat !== "gecis" && e.cat !== "soygaz" && (e.group === a.group || e.period === a.period)); const b = pick(same);
            const prop = pick(["r", "ie"]); const ans = prop === "r" ? (a.r > b.r ? a : b) : (a.ie > b.ie ? a : b);
            return { q: prop === "r" ? T("Hangisinin atom yarıçapı daha büyük?", "Which has the larger atomic radius?") : T("Hangisinin 1. iyonlaşma enerjisi daha büyük?", "Which has the higher 1st ionisation energy?"), opts: [a.sym, b.sym], ans: ans.sym, why: a.sym + ": " + (prop === "r" ? a.r + " pm" : a.ie + " kJ/mol") + " · " + b.sym + ": " + (prop === "r" ? b.r + " pm" : b.ie + " kJ/mol") };
          }
          if (kind === 1) { const e = pick(L36); const opts = shuffle(Array.from(new Set([e.group, ...shuffle([1, 2, 13, 14, 15, 16, 17, 18, 3, 8, 11]).slice(0, 5)]))).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 4); if (!opts.includes(e.group)) opts[0] = e.group;
            return { q: e.sym + " (" + App.L(e.name) + ") " + T("kaçıncı grupta?", "is in which group?"), opts: shuffle(opts).map(String), ans: String(e.group), why: e.sym + ": " + T("grup ", "group ") + e.group + ", " + T("periyot ", "period ") + e.period }; }
          if (kind === 2) { const cat = pick(["alkali", "halojen", "soygaz", "toprak"]); const e = pick(L36.filter((x) => x.cat === cat)); const others = shuffle(L36.filter((x) => x.cat !== cat && x.cat !== "gecis")).slice(0, 3);
            return { q: T("Hangisi bir ", "Which is a ") + App.L(EL.CAT[cat]).toLocaleLowerCase("tr") + "?", opts: shuffle([e, ...others]).map((x) => x.sym), ans: e.sym, why: e.sym + " = " + App.L(e.name) }; }
          const e = pick(L36.slice(0, 20)); const opts = shuffle(Array.from(new Set([e.z, e.z + 1, e.z - 1 || e.z + 2, e.z + 2]))).slice(0, 4);
          return { q: e.sym + T(" elementinin atom numarası?", " atomic number?"), opts: opts.map(String), ans: String(e.z), why: App.L(e.name) + ": Z = " + e.z };
        };
        const next = () => { const Q = mk(); area.querySelector("#qQ").textContent = Q.q; area.querySelector("#qO").innerHTML = Q.opts.map((o) => '<button class="qz__opt" type="button" data-v="' + esc(o) + '">' + esc(o) + "</button>").join("");
          area.querySelectorAll(".qz__opt").forEach((b) => b.addEventListener("click", () => { const good = b.dataset.v === Q.ans; if (good) { ok++; score += 10; } else { bad++; area.querySelector("#qWhy").textContent = Q.why; }
            b.classList.add(good ? "is-ok" : "is-bad"); area.querySelectorAll(".qz__opt").forEach((x) => { x.disabled = true; if (x.dataset.v === Q.ans) x.classList.add("is-ok"); }); area.querySelector("#qS").textContent = score;
            setTimeout(() => { if (alive(b)) { area.querySelector("#qWhy").textContent = ""; next(); } }, good ? 250 : 1300); })); };
        next();
        countdown(area.querySelector(".qz"), 60, null, () => endScreen(area, "periyodik", score, '<p class="hint">' + esc(T(ok + " doğru · " + bad + " yanlış", ok + " correct · " + bad + " wrong")) + "</p>", () => G.GAMES.periyodik.play(area)));
      };
    }
  });

  /* ======================= 10. Tarih Şeridi ======================= */
  const ERAS = () => [["all", T("Hepsi", "All")], ["ilk", T("İlk ve Orta Çağ", "Early & medieval")], ["osm", T("Osmanlı", "Ottoman")], ["kur", T("Kurtuluş ve Cumhuriyet", "Independence & Republic")], ["dun", T("Dünya tarihi", "World history")]];
  G.add("tarih", {
    subj: "tarih", icon: "sHist",
    title: () => T("Tarih Şeridi", "Timeline"),
    desc: () => T("Olayları en eskiden en yeniye doğru dokunarak sırala. 5 tur, her turda 5 olay; yerini doğru bildiğin her olay puan.", "Tap events from oldest to newest. Five rounds of five events."),
    play(area) {
      const era = App.prefs.get("gameEra", "all");
      startScreen(area, '<label class="field"><span class="field__label">' + esc(T("Dönem", "Period")) + '</span><select class="select" id="trEra">' + ERAS().map(([k, v]) => '<option value="' + k + '"' + (k === era ? " selected" : "") + ">" + esc(v) + "</option>").join("") + "</select></label>", () => {
        const e = area.querySelector("#trEra").value; App.prefs.set("gameEra", e);
        const pool = App.data.historyEvents.filter((x) => e === "all" || x[2] === e || (e === "kur" && x[2] === "kur"));
        let r = 0, score = 0;
        const round = () => {
          if (r >= 5) return endScreen(area, "tarih", score, '<p class="hint">' + esc(T(score + " / 25 olay doğru yerde", score + " / 25 in place")) + "</p>", () => G.GAMES.tarih.play(area));
          const years = new Set(), set = []; shuffle(pool).forEach((x) => { if (set.length < 5 && !years.has(x[0])) { years.add(x[0]); set.push(x); } });
          const order = [];
          const draw = (checked) => {
            area.innerHTML = '<div class="tl"><div class="dy__hud"><span>' + esc(T("Tur", "Round")) + " " + (r + 1) + '/5</span><span>' + esc(T("Puan", "Score")) + " <b>" + score + "</b></span></div>" +
              '<p class="hint">' + esc(checked ? T("Doğru sıra yıllarıyla:", "Correct order:") : T("En eski olaydan başlayarak dokun. Yanlış dokunduysan sıradaki olaya tekrar dokunarak geri al.", "Tap from oldest. Tap a placed item to undo.")) + "</p>" +
              '<ol class="tl-list">' + (checked ? set.slice().sort((a, b) => a[0] - b[0]).map((x, i) => '<li class="' + (order[i] === x ? "is-ok" : "is-bad") + '"><b>' + x[0] + "</b> " + esc(x[1]) + "</li>").join("")
                : set.map((x) => { const i = order.indexOf(x); return '<li><button type="button" class="tl-ev' + (i >= 0 ? " is-on" : "") + '" data-e="' + esc(x[1]) + '">' + (i >= 0 ? '<span class="tl-n">' + (i + 1) + "</span>" : '<span class="tl-n tl-n--empty"></span>') + esc(x[1]) + "</button></li>"; }).join("")) + "</ol>" +
              '<div class="game-dock">' + (checked ? '<button class="btn btn--primary" type="button" id="tlNext">' + esc(T("Sonraki tur", "Next round")) + "</button>" : '<button class="btn btn--primary" type="button" id="tlCheck"' + (order.length < 5 ? " disabled" : "") + ">" + App.icon("check") + esc(T("Kontrol et", "Check")) + "</button>") + "</div></div>";
            App.hydrateIcons(area);
            area.querySelectorAll(".tl-ev").forEach((b) => b.addEventListener("click", () => { const x = set.find((y) => y[1] === b.dataset.e), i = order.indexOf(x); if (i >= 0) order.splice(i); else order.push(x); draw(false); }));
            const ck = area.querySelector("#tlCheck"); if (ck) ck.addEventListener("click", () => { const sorted = set.slice().sort((a, b) => a[0] - b[0]); score += sorted.filter((x, i) => order[i] === x).length; draw(true); });
            const nx = area.querySelector("#tlNext"); if (nx) nx.addEventListener("click", () => { r++; round(); });
          };
          draw(false);
        };
        round();
      });
    }
  });

  /* ======================= 12. Kelime Kaydırma ======================= */
  G.add("kelime", {
    subj: "ingilizce", icon: "sLang",
    title: () => T("Kelime Kaydırma", "Word Swipe"),
    desc: () => T("YDT kelimeleri kart kart gelir. Anlamını düşün, kartı çevir; bildiklerini sağa, bilmediklerini sola kaydır. Bilmediklerin ayrı destede birikir.", "YDT words one by one. Flip, then swipe right if you knew it, left if not."),
    play(area) {
      const known = new Set(App.prefs.get("vocabKnown", [])), learn = new Set(App.prefs.get("vocabLearn", []));
      const V = App.data.vocab;
      startScreen(area, '<p class="hint">' + esc(T("Toplam " + V.length + " kelime · bildiğin " + known.size + " · öğreneceğin " + learn.size, V.length + " words · known " + known.size + " · to learn " + learn.size)) + "</p>" +
        '<label class="field"><span class="field__label">' + esc(T("Deste", "Deck")) + '</span><select class="select" id="kwDeck"><option value="new">' + esc(T("Yeni kelimeler", "New words")) + '</option><option value="learn"' + (learn.size ? "" : " disabled") + ">" + esc(T("Öğreneceklerim (", "To learn (") + learn.size + ")") + '</option><option value="all">' + esc(T("Hepsi karışık", "All, shuffled")) + "</option></select></label>", () => {
        const deck = area.querySelector("#kwDeck").value;
        let pool = deck === "learn" ? V.filter((w) => learn.has(w[0])) : deck === "new" ? V.filter((w) => !known.has(w[0]) && !learn.has(w[0])) : V.slice();
        if (!pool.length) pool = V.slice();
        const cards = shuffle(pool).slice(0, 20); let i = 0, yes = 0, no = 0, flipped = false;
        area.innerHTML = '<div class="kw"><div class="dy__hud"><span id="kwN"></span><span>✓ <b id="kwY">0</b> · ✗ <b id="kwX">0</b></span></div><button class="kw-card" type="button" id="kwC"></button>' +
          '<div class="game-dock"><button class="btn dy__btn dy__btn--no" type="button" data-k="0">' + App.icon("close") + esc(T("Bilmiyorum", "Don't know")) + '</button><button class="btn dy__btn dy__btn--yes" type="button" data-k="1">' + App.icon("check") + esc(T("Biliyorum", "Know it")) + "</button></div></div>";
        App.hydrateIcons(area);
        const card = area.querySelector("#kwC");
        const show = () => { flipped = false; const w = cards[i]; card.style.transform = ""; card.className = "kw-card"; card.innerHTML = "<b>" + esc(w[0]) + '</b><span class="kw-tap">' + esc(T("anlamı için dokun", "tap for meaning")) + "</span>"; area.querySelector("#kwN").textContent = (i + 1) + " / " + cards.length; };
        const flip = () => { if (flipped) return; flipped = true; const w = cards[i]; card.classList.add("is-flipped"); card.innerHTML = "<b>" + esc(w[0]) + '</b><span class="kw-mean">' + esc(w[1]) + "</span>"; };
        const rate = (k) => {
          const w = cards[i]; if (k) { yes++; known.add(w[0]); learn.delete(w[0]); } else { no++; learn.add(w[0]); known.delete(w[0]); }
          App.prefs.set("vocabKnown", Array.from(known)); App.prefs.set("vocabLearn", Array.from(learn));
          area.querySelector("#kwY").textContent = yes; area.querySelector("#kwX").textContent = no;
          if (!flipped) flip();
          card.classList.add(k ? "is-ok" : "is-bad");
          setTimeout(() => { if (!alive(card)) return; i++; if (i >= cards.length) return endScreen(area, "kelime", yes * 5, '<p class="hint">' + esc(T(yes + " biliyorum · " + no + " öğrenilecek (Öğreneceklerim destesinde)", yes + " known · " + no + " to learn")) + "</p>", () => G.GAMES.kelime.play(area)); show(); }, 650);
        };
        card.addEventListener("click", flip);
        area.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => rate(Number(b.dataset.k))));
        let x0 = null;
        card.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
        card.addEventListener("touchmove", (e) => { if (x0 == null) return; const dx = e.touches[0].clientX - x0; card.style.transform = "translateX(" + dx + "px) rotate(" + dx / 25 + "deg)"; }, { passive: true });
        card.addEventListener("touchend", (e) => { if (x0 == null) return; const dx = (e.changedTouches[0] || {}).clientX - x0; x0 = null; if (Math.abs(dx) > 80) rate(dx > 0 ? 1 : 0); else card.style.transform = ""; });
        const onKey = (e) => { if (!alive(card)) return document.removeEventListener("keydown", onKey); if (e.key === " ") { e.preventDefault(); flip(); } if (e.key === "ArrowLeft") rate(0); if (e.key === "ArrowRight") rate(1); };
        document.addEventListener("keydown", onKey);
        show();
      });
    }
  });
})();
