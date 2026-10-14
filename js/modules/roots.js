/* =========================================================
   roots.js — Kök eksik bulma   (#/kok, #/kok/<sınıf>/<ders>)

   Fikir: Öğrenci bir konuda zorlanıyorsa sorun çoğu zaman o konunun
   kendisinde değil, onun dayandığı daha temel bir konudadır (türevde
   zorlanan öğrencinin asıl eksiği fonksiyonlarda olabilir).

   1. Ön koşul haritası: hangi kazanım hangisine dayanıyor
        • 9. sınıf: elle hazırlandı (data/prereq-9.js, dersler arası bağlar dahil)
        • diğer dersler: yapay zekâ konu listesinden çıkarır, "meta" deposuna
          kaydedilir (id "prereq:<sınıf>/<ders>") ve cihazlar arasında eşitlenir
   2. Hâkimiyet puanı (0–100), her kazanım için öğrencinin kendi verisinden:
        konu sonu testleri (son testler daha ağır), Feynman puanı,
        çözüm kontrolleri (check.js), çözülmemiş yanlışlar (ceza)
   3. Teşhis: zayıf bir kazanımın ön koşullarında (3 adım geriye kadar) zayıf
      olan en temel konu = "kök eksik". Zayıf yoksa: yarım bilinenler, hiç
      denenmemiş ön koşullar ya da "ön koşullar sağlam, sorun konunun kendisinde".
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t, L = App.L;
  const C = () => App.data.curriculum;
  const WEAK = 55, OK = 75;
  const META = "prereq:";

  /* ---------------- Harita ---------------- */
  let aiMaps = {};           // "10/kimya" → { "u1/k2": ["u1/k1", …] }
  let aiSigs = {};           // "10/kimya" → haritanın çıkarıldığı kazanım listesinin imzası
  async function load() {
    const rows = (await App.db.getAll("meta")).filter((r) => String(r.id).indexOf(META) === 0);
    aiMaps = {}; aiSigs = {};
    rows.forEach((r) => { if (r.map) { const sk = r.id.slice(META.length); aiMaps[sk] = r.map; aiSigs[sk] = r.sig || null; } });
    return aiMaps;
  }

  /** Dersin güncel kazanım listesinin kısa imzası (kimlik + başlık). Kazanımlar değişince
   *  (ör. yapay zekâ müfredatı yerine hazır notlar gelince) eski yapay zekâ haritası geçersiz sayılır. */
  function sigOf(sk) {
    const [g, s] = sk.split("/");
    const subj = C() && C().findSubject(g, s);
    if (!subj) return "";
    const str = subj.units.map((u) => u.id + ":" + u.outcomes.map((o) => o.id + "=" + (o.title && (o.title.tr || o.title.en) || "")).join(",")).join("|");
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36) + "." + str.length;
  }
  /** Yapay zekâ haritası hâlâ geçerli mi? İmzası varsa eşleşmeli; imzasızsa (eski sürüm)
   *  yalnızca ders hazır notlara geçmemişse kullanılır. */
  function aiValid(sk) {
    if (!aiMaps[sk]) return false;
    if (aiSigs[sk]) return aiSigs[sk] === sigOf(sk);
    return !((App.data.content || {})[sk]);
  }

  const subjKey = (key) => String(key).split("/").slice(0, 2).join("/");
  const full = (sk, x) => (String(x).split("/").length === 4 ? x : sk + "/" + x);

  /** Bir dersin haritası: { tamAnahtar: [tamAnahtar…] }; source: "curated" | "ai" | null */
  function subjectMap(sk) {
    const raw = (App.data.prereq || {})[sk] || (aiValid(sk) ? aiMaps[sk] : null);
    if (!raw) return { map: {}, source: null };
    const map = {};
    Object.entries(raw).forEach(([k, pre]) => { map[full(sk, k)] = (pre || []).map((x) => full(sk, x)).filter((x) => App.lessons.find(x)); });
    return { map, source: (App.data.prereq || {})[sk] ? "curated" : "ai" };
  }

  /** Bir kazanımın ön koşulları (tam anahtarlar) */
  const prereqOf = (key) => subjectMap(subjKey(key)).map[key] || [];

  /** Bu kazanıma dayanan kazanımlar (aynı ders + diğer dersler) */
  function unlocksOf(key) {
    const out = [];
    const sks = new Set(Object.keys(App.data.prereq || {}).concat(Object.keys(aiMaps)));
    sks.forEach((sk) => { const m = subjectMap(sk).map; Object.entries(m).forEach(([k, pre]) => { if (pre.includes(key)) out.push(k); }); });
    return out;
  }

  /* ---------------- Hâkimiyet ---------------- */
  /** Map: anahtar → { score, status, parts: { quiz, fey, chk, mis } } */
  async function mastery() {
    const [quizzes, explains, mistakes, checks, progress] = await Promise.all(["quizzes", "explains", "mistakes", "checks", "progress"].map((s) => App.db.getAll(s).catch(() => [])));
    const by = {};
    const slot = (k) => (by[k] = by[k] || { quiz: [], fey: [], chk: [], mis: 0, done: false, lastQuiz: "" });
    quizzes.forEach((q) => { if (q.key && q.total) { slot(q.key).quiz.push(q); } });
    explains.forEach((x) => { if (x.key) slot(x.key).fey.push(x); });
    checks.forEach((c) => { if (c.key && c.verdict) slot(c.key).chk.push(c); });
    progress.forEach((p) => { if (p.done) slot(p.id).done = true; });
    Object.values(by).forEach((s) => { s.quiz.sort((a, b) => String(b.date).localeCompare(String(a.date))); s.lastQuiz = s.quiz[0] ? String(s.quiz[0].date) : ""; });
    mistakes.forEach((m) => {
      if (!m.key || m.mastered) return;
      const s = slot(m.key);
      // Testteki yanlışlar zaten test puanında var; yalnızca sonradan eklenenler ceza
      if (m.source !== "quiz" || String(m.createdAt) > s.lastQuiz) s.mis++;
    });
    const out = new Map();
    Object.entries(by).forEach(([k, s]) => {
      const parts = {};
      let sum = 0, w = 0;
      if (s.quiz.length) {
        const recent = s.quiz.slice(0, 3);
        const ws = [3, 1.5, 1];
        let qs = 0, qw = 0;
        recent.forEach((q, i) => { qs += (q.correct / q.total) * ws[i]; qw += ws[i]; });
        parts.quiz = Math.round((qs / qw) * 100);
        parts.quizLast = s.quiz[0];
        sum += parts.quiz * 3; w += 3;
      }
      if (s.fey.length) {
        const last = s.fey.sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
        parts.fey = last.score; sum += last.score * 2; w += 2;
      }
      if (s.chk.length) {
        const recent = s.chk.sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 4);
        parts.chk = Math.round(recent.filter((c) => c.verdict === "correct").length / recent.length * 100);
        parts.chkN = recent.length;
        sum += parts.chk * 1.5; w += 1.5;
      }
      parts.mis = s.mis;
      let score = null;
      if (w) score = Math.round(sum / w - Math.min(24, s.mis * 6));
      else if (s.mis) score = Math.max(20, 65 - s.mis * 10);
      if (score != null) score = Math.max(0, Math.min(100, score));
      out.set(k, { score, status: score == null ? (s.done ? "studied" : "unknown") : score < WEAK ? "weak" : score < OK ? "mid" : "strong", parts, done: s.done });
    });
    return out;
  }
  const stat = (M, k) => M.get(k) || { score: null, status: "unknown", parts: {} };

  /* ---------------- Teşhis ---------------- */
  /** { type: "root"|"shaky"|"untested"|"self"|"base", items: [{ key, path:[kök…hedef], depth, m }] } */
  function diagnose(key, M) {
    const seen = new Map();             // anahtar → { depth, via }
    let frontier = [key];
    for (let d = 1; d <= 3 && frontier.length; d++) {
      const next = [];
      frontier.forEach((k) => prereqOf(k).forEach((p) => { if (p !== key && !seen.has(p)) { seen.set(p, { depth: d, via: k }); next.push(p); } }));
      frontier = next;
    }
    const pathTo = (p) => { const path = [p]; let cur = p; while (seen.has(cur)) { cur = seen.get(cur).via; path.push(cur); } return path; };
    const anc = Array.from(seen.keys()).map((k) => ({ key: k, depth: seen.get(k).depth, m: stat(M, k), path: pathTo(k) }));
    if (!prereqOf(key).length) return { type: "base", items: [] };
    const weak = anc.filter((a) => a.m.status === "weak");
    if (weak.length) {
      // En temel zayıf konular: kendi ön koşullarında zayıf olmayanlar
      const roots = weak.filter((a) => !weak.some((b) => b !== a && b.path.includes(a.key) && b.depth > a.depth));
      roots.sort((a, b) => b.depth - a.depth || a.m.score - b.m.score);
      return { type: "root", items: roots.slice(0, 2) };
    }
    const mid = anc.filter((a) => a.m.status === "mid").sort((a, b) => a.m.score - b.m.score);
    if (mid.length) return { type: "shaky", items: mid.slice(0, 2) };
    const untested = anc.filter((a) => a.m.status === "unknown" || a.m.status === "studied").sort((a, b) => a.depth - b.depth);
    if (untested.length) return { type: "untested", items: untested.slice(0, 3) };
    return { type: "self", items: [] };
  }

  /** Zayıf kazanımların tümü için teşhis (zayıftan güçlüye) */
  async function analyzeAll() {
    await load();
    const M = await mastery();
    const weak = Array.from(M.entries()).filter(([k, m]) => m.status === "weak" && App.lessons.find(k)).sort((a, b) => a[1].score - b[1].score);
    return { M, list: weak.map(([k, m]) => ({ key: k, m, d: diagnose(k, M) })) };
  }

  /** Bugün ekranı ve önerilerde: zayıf bir konunun kökü varsa onu öner */
  async function rootFor(key) {
    await load();
    const M = await mastery();
    const d = diagnose(key, M);
    return d.type === "root" && d.items[0] ? { key: d.items[0].key, m: d.items[0].m } : null;
  }

  /* ---------------- Görünüm yardımcıları ---------------- */
  function titleOf(key) { const f = App.lessons.find(key); return f ? L(f.outcome.title) : key; }
  function shortTitle(key, n) { const s = titleOf(key); return s.length > (n || 60) ? s.slice(0, (n || 60) - 1).trim() + "…" : s; }
  function subjOf(key) { const f = App.lessons.find(key); return f ? L(f.subject.name) : ""; }
  const lessonHref = (key) => "#/konular/" + key;

  function chip(m) {
    const st = m.status;
    const txt = m.score == null ? t(st === "studied" ? "root.studied" : "root.untested") : "%" + m.score;
    return '<span class="root-chip root--' + st + '" title="' + esc(t("root.st." + st)) + '">' + esc(txt) + "</span>";
  }

  function evidence(m) {
    const p = m.parts || {};
    const bits = [];
    if (p.quiz != null) bits.push(t("root.evQuiz", { pct: p.quiz }));
    if (p.fey != null) bits.push(t("root.evFey", { s: p.fey }));
    if (p.chk != null) bits.push(t("root.evChk", { pct: p.chk, n: p.chkN }));
    if (p.mis) bits.push(t("root.evMis", { n: p.mis }));
    return bits.join(" · ");
  }

  function pathHtml(path, M) {
    return '<ol class="root-path">' + path.map((k, i) => '<li class="' + (i === 0 ? "is-root" : i === path.length - 1 ? "is-target" : "") + '"><a href="' + lessonHref(k) + '">' +
      (subjKey(k) !== subjKey(path[path.length - 1]) ? '<small class="root-path__subj">' + esc(subjOf(k)) + "</small>" : "") +
      '<span>' + esc(shortTitle(k, 70)) + "</span></a>" + chip(stat(M, k)) + "</li>").join("") + "</ol>";
  }

  function diagCardHtml(x, M) {
    const d = x.d;
    const head = '<div class="root-card__head"><span class="hint">' + esc(t("root.struggling")) + '</span><a class="root-card__title" href="' + lessonHref(x.key) + '">' + esc(titleOf(x.key)) + "</a>" +
      '<span class="root-card__meta">' + esc(subjOf(x.key)) + " · " + esc(evidence(x.m)) + "</span>" + chip(x.m) + "</div>";
    let body = "";
    if (d.type === "root") {
      const r = d.items[0];
      body = '<div class="root-verdict root-verdict--root">' + App.icon("roots") + "<div><b>" + esc(t("root.vRoot", { topic: titleOf(r.key) })) + "</b><p>" + esc(t("root.vRootWhy", { steps: r.depth })) + "</p></div></div>" +
        pathHtml(r.path, M) +
        (d.items[1] ? '<p class="hint">' + esc(t("root.alsoWeak", { topic: shortTitle(d.items[1].key, 80) })) + "</p>" : "") +
        actions(r.key, x.key);
    } else if (d.type === "shaky") {
      const r = d.items[0];
      body = '<div class="root-verdict root-verdict--mid">' + App.icon("target") + "<div><b>" + esc(t("root.vShaky", { topic: titleOf(r.key) })) + "</b><p>" + esc(t("root.vShakyWhy")) + "</p></div></div>" +
        pathHtml(r.path, M) + actions(r.key, x.key);
    } else if (d.type === "untested") {
      body = '<div class="root-verdict root-verdict--unknown">' + App.icon("search") + "<div><b>" + esc(t("root.vUntested")) + "</b><p>" + esc(t("root.vUntestedWhy")) + "</p></div></div>" +
        '<ul class="root-checklist">' + d.items.map((i) => '<li><a href="' + lessonHref(i.key) + '">' + esc(shortTitle(i.key, 80)) + "</a>" + chip(i.m) +
          '<a class="btn btn--sm" href="#/test/' + i.key + '">' + App.icon("quiz") + esc(t("root.quickTest")) + "</a></li>").join("") + "</ul>";
    } else if (d.type === "self") {
      body = '<div class="root-verdict root-verdict--good">' + App.icon("checkCircle") + "<div><b>" + esc(t("root.vSelf")) + "</b><p>" + esc(t("root.vSelfWhy")) + "</p></div></div>" +
        '<div class="mis__actions"><a class="btn btn--primary" href="#/anlat/' + x.key + '">' + App.icon("mic") + esc(t("fey.title")) + '</a><a class="btn" href="' + lessonHref(x.key) + '">' + App.icon("book") + esc(t("today.read")) + "</a></div>";
    } else {
      body = '<div class="root-verdict root-verdict--good">' + App.icon("layers") + "<div><b>" + esc(t("root.vBase")) + "</b><p>" + esc(t("root.vBaseWhy")) + "</p></div></div>" +
        '<div class="mis__actions"><a class="btn btn--primary" href="' + lessonHref(x.key) + '">' + App.icon("book") + esc(t("today.read")) + '</a><a class="btn" href="#/anlat/' + x.key + '">' + App.icon("mic") + esc(t("fey.title")) + "</a></div>";
    }
    return '<section class="card root-card">' + head + body + "</section>";
  }

  function actions(rootKey, targetKey) {
    return '<div class="mis__actions">' +
      '<a class="btn btn--primary" href="' + lessonHref(rootKey) + '">' + App.icon("book") + esc(t("root.studyRoot")) + "</a>" +
      '<a class="btn" href="#/test/' + rootKey + '">' + App.icon("quiz") + esc(t("root.testRoot")) + "</a>" +
      '<button class="btn btn--ghost" type="button" data-root-ask="' + esc(rootKey) + '" data-target="' + esc(targetKey) + '">' + App.icon("sparkle") + esc(t("root.ask")) + "</button></div>";
  }

  /* ---------------- Ön koşul haritası (SVG) ---------------- */
  function graphSvg(sk, M) {
    const { map } = subjectMap(sk);
    const [g, s] = sk.split("/");
    const subject = C().findSubject(g, s);
    if (!subject) return "";
    const own = [];
    subject.units.forEach((u) => u.outcomes.forEach((o) => own.push(C().key(g, s, u.id, o.id))));
    const ext = [];
    own.forEach((k) => (map[k] || []).forEach((p) => { if (!own.includes(p) && !ext.includes(p)) ext.push(p); }));
    const nodes = ext.concat(own);
    // Katman = en uzun ön koşul zinciri
    const depth = {};
    const dep = (k, stack) => {
      if (depth[k] != null) return depth[k];
      if (stack.has(k)) return 0;
      stack.add(k);
      const pre = (map[k] || []).filter((p) => nodes.includes(p));
      const d = pre.length ? 1 + Math.max(...pre.map((p) => dep(p, stack))) : 0;
      stack.delete(k);
      return (depth[k] = d);
    };
    nodes.forEach((k) => dep(k, new Set()));
    const cols = [];
    nodes.forEach((k) => { (cols[depth[k]] = cols[depth[k]] || []).push(k); });
    // Kesişmeleri azalt: her sütunu, bağlı olduğu kutuların ortalama sırasına göre diz (ileri-geri birkaç tur)
    const succ = {};
    nodes.forEach((k) => (map[k] || []).forEach((p) => { if (nodes.includes(p)) (succ[p] = succ[p] || []).push(k); }));
    const rowOf = () => { const r = {}; cols.forEach((col) => col.forEach((k, i) => { r[k] = i; })); return r; };
    for (let pass = 0; pass < 4; pass++) {
      const fwd = pass % 2 === 0;
      const order = fwd ? cols.map((_, i) => i).slice(1) : cols.map((_, i) => i).slice(0, -1).reverse();
      order.forEach((ci) => {
        const r = rowOf();
        const nb = (k) => (fwd ? (map[k] || []).filter((p) => nodes.includes(p)) : succ[k] || []);
        const bary = (k) => { const ns = nb(k); return ns.length ? ns.reduce((a, n) => a + r[n], 0) / ns.length : r[k]; };
        cols[ci] = cols[ci].map((k, i) => ({ k, b: bary(k), i })).sort((a, b) => a.b - b.b || a.i - b.i).map((x) => x.k);
      });
    }
    const NW = 186, NH = 58, GX = 54, GY = 14, PAD = 12;
    const pos = {};
    let maxRows = 0;
    cols.forEach((col, ci) => { col.forEach((k, ri) => { pos[k] = { x: PAD + ci * (NW + GX), y: PAD + ri * (NH + GY) }; }); maxRows = Math.max(maxRows, col.length); });
    const W = PAD * 2 + cols.length * NW + (cols.length - 1) * GX;
    const H = PAD * 2 + maxRows * NH + (maxRows - 1) * GY;
    const wrap = (str, n) => {
      const words = str.split(/\s+/); const lines = [""];
      words.forEach((w) => { const cur = lines[lines.length - 1]; if ((cur + " " + w).trim().length > n && cur) { if (lines.length === 2) { lines[1] = (lines[1] + " " + w).trim(); return; } lines.push(w); } else lines[lines.length - 1] = (cur + " " + w).trim(); });
      if (lines[1] && lines[1].length > n) lines[1] = lines[1].slice(0, n - 1).trim() + "…";
      return lines;
    };
    let edges = "";
    nodes.forEach((k) => (map[k] || []).forEach((p) => {
      if (!pos[p] || !pos[k]) return;
      const a = pos[p], b = pos[k];
      const x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x, y2 = b.y + NH / 2, mx = (x1 + x2) / 2;
      const weakEdge = stat(M, p).status === "weak" && ["weak", "mid"].includes(stat(M, k).status);
      edges += '<path class="rg-edge' + (weakEdge ? " is-hot" : "") + '" d="M' + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + (x2 - 4) + "," + y2 + '" marker-end="url(#rgArrow' + (weakEdge ? "Hot" : "") + ')"/>';
    }));
    let boxes = "";
    nodes.forEach((k) => {
      const p = pos[k], m = stat(M, k);
      const f = App.lessons.find(k);
      const isExt = ext.includes(k);
      const code = f ? (f.outcome.code || f.unit.id.toUpperCase() + "·" + f.outcome.id) : "";
      const lines = wrap(L(f ? f.outcome.title : k), 27);
      boxes += '<a href="' + lessonHref(k) + '" class="rg-node rg--' + m.status + (isExt ? " is-ext" : "") + '" data-key="' + esc(k) + '">' +
        "<title>" + esc((isExt ? subjOf(k) + " · " : "") + titleOf(k) + (m.score != null ? " · %" + m.score : "")) + "</title>" +
        '<rect x="' + p.x + '" y="' + p.y + '" width="' + NW + '" height="' + NH + '" rx="10"/>' +
        '<text x="' + (p.x + 10) + '" y="' + (p.y + 16) + '" class="rg-code">' + esc(isExt ? subjOf(k) : code) + (m.score != null ? "  ·  %" + m.score : "") + "</text>" +
        lines.map((ln, i) => '<text x="' + (p.x + 10) + '" y="' + (p.y + 32 + i * 14) + '" class="rg-title">' + esc(ln) + "</text>").join("") + "</a>";
    });
    return '<div class="rg-wrap"><svg class="rg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(t("root.mapAria", { subject: L(subject.name) })) + '">' +
      '<defs><marker id="rgArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" class="rg-arrow"/></marker>' +
      '<marker id="rgArrowHot" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8z" class="rg-arrow is-hot"/></marker></defs>' +
      edges + boxes + "</svg></div>";
  }

  /* ---------------- Yapay zekâyla harita çıkarma ---------------- */
  async function generateMap(gradeId, subjectId, opts) {
    const subject = C().findSubject(gradeId, subjectId);
    if (!subject || !subject.units.length) throw new Error("no-units");
    const tr = App.i18n.lang === "tr";
    const list = [];
    subject.units.forEach((u) => u.outcomes.forEach((o) => list.push(u.id + "/" + o.id + " — " + L(o.title))));
    // Bir önceki sınıfın aynı dersi (varsa) dersler arası bağ için
    const prevGrade = String(Number(gradeId) - 1);
    const prev = C().findSubject(prevGrade, subjectId);
    const prevList = [];
    if (prev && prev.units.length) prev.units.forEach((u) => u.outcomes.forEach((o) => prevList.push(prevGrade + "/" + subjectId + "/" + u.id + "/" + o.id + " — " + L(o.title))));
    const system = tr ? "Sen deneyimli bir müfredat uzmanı ve lise öğretmenisin. Yalnızca geçerli JSON döndür." : "You are an experienced curriculum designer and high-school teacher. Return only valid JSON.";
    const prompt = (tr ? [
      "Aşağıda " + C().gradeName(C().findGrade(gradeId)) + " " + L(subject.name) + " dersinin kazanımları var. Her kazanım için, onu anlamadan ÖNCE bilinmesi gereken ön koşul kazanımları belirle.",
      "Kurallar: yalnızca gerçekten gerekli olan, doğrudan ön koşulları yaz (her kazanım için en fazla 3). Döngü oluşturma. Temel (ön koşulu olmayan) kazanımları listeye koyma.",
      "Kimlikleri listedeki gibi aynen kullan.",
      "Biçim: {\"links\":[{\"k\":\"u2/k1\",\"pre\":[\"u1/k3\"]}]}"
    ] : [
      "Below are the learning outcomes of " + L(subject.name) + " (grade " + gradeId + "). For each outcome, list the prerequisite outcomes that must be understood BEFORE it.",
      "Rules: only truly necessary, direct prerequisites (at most 3 each). No cycles. Leave out foundational outcomes with no prerequisites.",
      "Use the ids exactly as listed.",
      "Format: {\"links\":[{\"k\":\"u2/k1\",\"pre\":[\"u1/k3\"]}]}"
    ]).join("\n") + "\n\n" + list.join("\n") +
      (prevList.length ? "\n\n" + (tr ? "Bir önceki sınıfın aynı dersinden ön koşul gösterebilirsin (tam kimliğiyle):\n" : "You may also use prerequisites from the previous grade (with their full ids):\n") + prevList.join("\n") : "");
    const res = await App.ai.generate({ system, prompt, temperature: 0.2, signal: opts && opts.signal, onStage: opts && opts.onStage });
    const links = Array.isArray(res.data && res.data.links) ? res.data.links : [];
    const sk = gradeId + "/" + subjectId;
    const map = {};
    links.forEach((l) => {
      const k = String(l && l.k || "").trim();
      if (!App.lessons.find(full(sk, k))) return;
      const pre = (Array.isArray(l.pre) ? l.pre : []).map((x) => String(x).trim()).filter((x) => x !== k && App.lessons.find(full(sk, x))).slice(0, 3);
      if (pre.length) map[k] = pre;
    });
    // Döngüleri kır (yapay zekâ bazen A→B→A yazar). Bağlar sırayla yeniden eklenir: önce müfredatta
    // öndeki konudan sonrakine giden "ileri" bağlar, sonra geri bağlar; döngü kuracak bağ eklenmez.
    const order = {};
    list.forEach((line, i) => { order[full(sk, line.split(" — ")[0])] = i; });
    const idx = (x) => (order[full(sk, x)] != null ? order[full(sk, x)] : -1);   // önceki sınıf: her zaman önde
    const edges = [];
    Object.entries(map).forEach(([k, pre]) => pre.forEach((x) => edges.push({ k, x, fwd: idx(x) < idx(k) })));
    edges.sort((a, b) => (b.fwd - a.fwd) || idx(a.k) - idx(b.k));
    const clean = {};
    const reach = (from, target) => {          // clean haritasında from'dan geriye giderek target'a ulaşılıyor mu
      const seen = new Set(); const stack = [full(sk, from)];
      while (stack.length) {
        const c = stack.pop();
        if (c === target) return true;
        if (seen.has(c)) continue;
        seen.add(c);
        if (subjKey(c) === sk) (clean[c.split("/").slice(2).join("/")] || []).forEach((n) => stack.push(full(sk, n)));
      }
      return false;
    };
    edges.forEach((e) => { if (!reach(e.x, full(sk, e.k))) (clean[e.k] = clean[e.k] || []).push(e.x); });
    Object.keys(map).forEach((k) => delete map[k]);
    Object.assign(map, clean);
    if (!Object.keys(map).length) throw new Error("json");
    await App.db.put("meta", { id: META + sk, map, sig: sigOf(sk), at: new Date().toISOString(), model: res.model });
    await load();
    return map;
  }

  /* ---------------- Sayfa ---------------- */
  async function render(view, p) {
    App.setTitle(t("root.title"));
    const { M, list } = await analyzeAll();
    // Harita için ders: adresteki, yoksa en zayıf konunun dersi, yoksa 9. sınıf matematik
    let sk = p[0] && p[1] ? p[0] + "/" + p[1] : list[0] ? subjKey(list[0].key) : "9/matematik";
    if (!C().findSubject(...sk.split("/"))) sk = "9/matematik";
    const subjects = [];
    C().grades.forEach((g) => g.subjects.forEach((s) => subjects.push({ key: g.id + "/" + s.id, label: C().gradeName(g) + " · " + L(s.name), has: !!subjectMap(g.id + "/" + s.id).source })));
    const tested = Array.from(M.values()).filter((m) => m.score != null).length;
    const { source } = subjectMap(sk);
    const [gId, sId] = sk.split("/");
    const subject = C().findSubject(gId, sId);

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(t("root.title")) + "</h1><p>" + esc(t("root.sub")) + "</p></div></div>" +
        '<section class="card root-how"><div class="root-how__steps">' +
          ["root.how1", "root.how2", "root.how3"].map((k, i) => '<div><span class="root-how__n">' + (i + 1) + "</span><p>" + esc(t(k)) + "</p></div>").join("") + "</div>" +
          '<p class="hint">' + esc(t("root.dataNote", { n: tested })) + "</p></section>" +
        (list.length
          ? '<h2 class="section-title root-title">' + App.icon("roots") + esc(t("root.found", { n: list.length })) + "</h2>" + list.slice(0, 8).map((x) => diagCardHtml(x, M)).join("")
          : '<section class="card">' + App.ui.empty("roots", t(tested ? "root.noneWeak" : "root.noData"), t(tested ? "root.noneWeakText" : "root.noDataText"),
              '<a class="btn btn--primary" href="#/konular">' + App.icon("book") + esc(t("nav.topics")) + "</a>") + "</section>") +
        '<section class="card root-map" id="rootMap"><div class="root-map__head"><h2>' + App.icon("layers") + esc(t("root.mapTitle")) + "</h2>" +
          '<select class="select" id="rootSubj" aria-label="' + esc(t("root.pickSubject")) + '">' + subjects.map((s) => '<option value="' + s.key + '"' + (s.key === sk ? " selected" : "") + ">" + esc(s.label) + (s.has ? "" : " ·") + "</option>").join("") + "</select></div>" +
          '<p class="hint">' + esc(t("root.mapHint")) + "</p>" +
          '<div class="root-legend">' + ["weak", "mid", "strong", "unknown"].map((s) => '<span><i class="rg--' + s + '"></i>' + esc(t("root.st." + s)) + "</span>").join("") + "</div>" +
          (source ? graphSvg(sk, M) + (source === "ai" ? '<p class="hint">' + App.icon("sparkle") + esc(t("root.aiMap")) + ' <button class="btn btn--sm btn--ghost" type="button" id="rootGen">' + App.icon("refresh") + esc(t("cur.aiRegen")) + "</button></p>" : "")
            : '<div class="root-nomap">' + (subject && subject.units.length
                ? "<p>" + esc(t("root.noMap")) + '</p><button class="btn btn--primary btn--ai" type="button" id="rootGen">' + App.icon("sparkle") + esc(t("root.genMap")) + "</button>"
                : "<p>" + esc(t("root.noUnits")) + '</p><a class="btn" href="#/konular/' + sk + '">' + App.icon("book") + esc(t("root.openSubject")) + "</a>") + '<div id="rootGenOut"></div></div>') +
        "</section>" +
      "</div>";
    App.hydrateIcons(view);

    view.querySelector("#rootSubj").addEventListener("change", (e) => App.router.go("kok/" + e.target.value));
    const gen = view.querySelector("#rootGen");
    if (gen) gen.addEventListener("click", async () => {
      gen.disabled = true;
      const out = view.querySelector("#rootGenOut") || gen.parentElement;
      const status = document.createElement("div");
      status.className = "stage";
      status.innerHTML = '<span class="spinner"></span><span>' + esc(t("root.generating")) + "</span>";
      out.appendChild(status);
      try {
        await generateMap(gId, sId, {});
        App.ui.toast(t("root.mapSaved"));
        App.router.refresh();
      } catch (e) {
        status.innerHTML = '<span class="msg__error">' + esc(t("root.genFailed")) + " " + esc(App.quiz.errorText(e)) + "</span>";
        gen.disabled = false;
      }
    });
    const onClick = (e) => {
      const b = e.target.closest("[data-root-ask]");
      if (!b) return;
      const root = b.dataset.rootAsk, target = b.dataset.target;
      App.modules.assistant.startWith(t("root.askPrompt", { target: titleOf(target), root: titleOf(root) }), null);
    };
    view.addEventListener("click", onClick);
    if (p[0] && p[1]) setTimeout(() => { const m = view.querySelector("#rootMap"); if (m) m.scrollIntoView({ block: "start" }); }, 50);
    return () => view.removeEventListener("click", onClick);
  }

  /** Kazanım sayfasındaki "Ön koşullar" kartı */
  async function cardHtml(key) {
    await load();
    const pre = prereqOf(key);
    const unl = unlocksOf(key).filter((k) => subjKey(k) === subjKey(key)).slice(0, 4);
    const sk = subjKey(key);
    if (!pre.length && !unl.length) return "";
    const M = await mastery();
    const me = stat(M, key);
    const d = me.status === "weak" || me.status === "mid" ? diagnose(key, M) : null;
    const alert = d && d.type === "root" && d.items[0]
      ? '<div class="root-verdict root-verdict--root">' + App.icon("roots") + "<div><b>" + esc(t("root.vRoot", { topic: titleOf(d.items[0].key) })) + "</b><p>" + esc(t("root.cardWhy", { score: me.score })) + "</p>" +
        '<a class="btn btn--sm btn--primary" href="' + lessonHref(d.items[0].key) + '">' + esc(t("root.studyRoot")) + "</a></div></div>" : "";
    const row = (k) => '<li><a href="' + lessonHref(k) + '">' + (subjKey(k) !== sk ? '<small class="root-path__subj">' + esc(subjOf(k)) + "</small> " : "") + esc(shortTitle(k, 90)) + "</a>" + chip(stat(M, k)) + "</li>";
    return '<section class="card lesson__section root-lesson"><h2>' + App.icon("roots") + esc(t("root.cardTitle")) + "</h2>" + alert +
      (pre.length ? '<p class="hint">' + esc(t("root.needs")) + '</p><ul class="root-list">' + pre.map(row).join("") + "</ul>" : '<p class="hint">' + esc(t("root.isBase")) + "</p>") +
      (unl.length ? '<p class="hint">' + esc(t("root.unlocks")) + '</p><ul class="root-list root-list--next">' + unl.map(row).join("") + "</ul>" : "") +
      '<a class="btn btn--sm btn--ghost" href="#/kok/' + sk + '">' + App.icon("layers") + esc(t("root.seeMap")) + "</a></section>";
  }

  /** Test sonucunda: düşük puan alındıysa kök eksik ipucu */
  async function quizHintHtml(key) {
    await load();
    if (!prereqOf(key).length) return "";
    const M = await mastery();
    const d = diagnose(key, M);
    if (d.type === "root" && d.items[0]) {
      const r = d.items[0];
      return '<div class="root-verdict root-verdict--root">' + App.icon("roots") + "<div><b>" + esc(t("root.vRoot", { topic: titleOf(r.key) })) + "</b><p>" + esc(t("root.quizWhy")) + "</p>" +
        '<div class="mis__actions"><a class="btn btn--sm btn--primary" href="' + lessonHref(r.key) + '">' + esc(t("root.studyRoot")) + '</a><a class="btn btn--sm" href="#/kok">' + esc(t("root.title")) + "</a></div></div></div>";
    }
    if (d.type === "untested") {
      return '<div class="root-verdict root-verdict--unknown">' + App.icon("search") + "<div><b>" + esc(t("root.quizUntested")) + "</b><p>" + esc(d.items.map((i) => shortTitle(i.key, 60)).join(" · ")) + "</p>" +
        '<a class="btn btn--sm" href="#/test/' + d.items[0].key + '">' + esc(t("root.quickTest")) + "</a></div></div>";
    }
    return "";
  }

  App.router.register("kok", render);
  App.roots = { load, mastery, diagnose, analyzeAll, rootFor, prereqOf, unlocksOf, subjectMap, generateMap, cardHtml, quizHintHtml, graphSvg };
})();
