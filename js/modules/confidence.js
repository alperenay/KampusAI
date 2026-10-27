/* =========================================================
   confidence.js — Eminlik işaretleme (v1.42)

   İki parça:
   1) Öğrencinin eminliği: testlerdeki "Ne kadar eminsin?" (metacognition.js, %25/50/75/100) artık hap kartlarda
      ve birleşik tekrar listesinde de var. Kart ve tekrar işaretlemeleri meta deposunda günlük kayıtlarda
      ("conf:YYYY-MM-DD") tutulur; haftalık karne (karne.js) üstbiliş indeksini bunlarla da hesaplar.
   2) Yapay zekâ cevabının güven göstergesi: kural tabanlı, açıklanabilir bir puan (0–100). Model kendi
      doğruluğunu bilemez; gösterge cevabın nasıl üretildiğine bakar ve gerekçelerini listeler:
        + kaynak gösterildi (ders notu/web)       + hesap makinesiyle doğrulandı
        − fotoğraftan okundu (okuma hatası olabilir)  − yedek modele düşüldü
        − cevap kendi içinde çekince içeriyor      − sayısal sonuç doğrulanmadı
        − kullanıcı cevabı hatalı işaretledi
      ≥ 75 yüksek · 50–74 orta · < 50 düşük. Düşük ve ortada kontrol önerisi gösterilir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const LEVELS = [25, 50, 75, 100];
  const MAX_DAY = 400;

  /* ---------------- Öğrenci eminliği ---------------- */
  /** Eminlik seçicisi (radyo düğmeleri). name: aynı sayfada tekil ad, value: seçili değer */
  function chipsHtml(name, value, label) {
    return '<div class="conf-chips" role="radiogroup" aria-label="' + esc(label || T("Ne kadar eminsin?", "How sure are you?")) + '">' +
      '<span class="conf-chips__l">' + esc(label || T("Ne kadar eminsin?", "How sure are you?")) + "</span>" +
      LEVELS.map((c) => '<label><input type="radio" name="' + esc(name) + '" value="' + c + '"' + (value === c ? " checked" : "") + "><span>%" + c + "</span></label>").join("") + "</div>";
  }
  /** Seçili eminlik (yoksa null) */
  function read(root, name) {
    const x = root && root.querySelector('input[name="' + name + '"]:checked');
    return x ? Number(x.value) : null;
  }
  const dayKey = (d) => { const x = new Date(d || Date.now()); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
  /** Eminlik + sonuç kaydı (kart, tekrar). Eminlik seçilmediyse kaydetmez. */
  async function record(source, key, conf, correct) {
    if (!LEVELS.includes(conf)) return false;
    const id = "conf:" + dayKey();
    const cur = (await App.db.get("meta", id).catch(() => null)) || { id, kind: "conf", items: [] };
    cur.items.push({ s: source, k: key || "", c: conf, ok: !!correct, at: new Date().toISOString() });
    if (cur.items.length > MAX_DAY) cur.items = cur.items.slice(-MAX_DAY);
    await App.db.put("meta", cur);
    return true;
  }
  /** [from, to) aralığındaki kayıtlar: [{ s, k, c, ok, at }] */
  async function log(from, to) {
    const rows = (await App.db.getAll("meta").catch(() => [])).filter((r) => r.kind === "conf" && Array.isArray(r.items));
    const out = [];
    rows.forEach((r) => r.items.forEach((x) => { const t = Date.parse(x.at); if (t >= from && t < to) out.push(x); }));
    return out;
  }

  /* ---------------- Yapay zekâ cevabının güven göstergesi ---------------- */
  const HEDGE = /\b(emin değilim|sanırım|galiba|muhtemelen|tahminen|tahmin ediyorum|olabilir ki|kesin değil|yanılıyor olabilirim|not sure|i think|probably|might be|i'm not certain|perhaps)\b/gi;
  const MATHY = /(\$[^$]+\$|\d+\s*[+\-×x*/÷=]\s*\d+|=\s*-?\d)/;
  /** msg: sohbet mesajı → { score, level, reasons: [{ d (+/−), t }] } */
  function aiScore(msg) {
    if (!msg || !msg.text) return null;
    let s = 60;
    const reasons = [];
    const add = (d, tr, en) => { s += d; reasons.push({ d, t: T(tr, en) }); };
    const roles = (msg.models || []).map((m) => m.role);
    const nSrc = Array.isArray(msg.sources) ? msg.sources.length : 0;
    if (nSrc) add(Math.min(16, nSrc * 8), "Kaynak gösterildi (" + nSrc + ")", "Sources cited (" + nSrc + ")");
    if (roles.includes("calc")) add(12, "Hesaplar hesap makinesiyle doğrulandı", "Calculations checked with the calculator");
    else if (MATHY.test(msg.text)) add(-8, "Sayısal sonuç ayrıca doğrulanmadı", "Numeric result not independently checked");
    if (msg.transcription || roles.includes("vision")) add(-10, "Soru fotoğraftan okundu; okuma hatası olabilir", "Question was read from a photo; it may be misread");
    if ((msg.warnings || []).some((w) => w.code === "fallback")) add(-10, "Asıl model yerine yedek model cevapladı", "A fallback model answered");
    const hedges = (msg.text.match(HEDGE) || []).length;
    if (hedges) add(-Math.min(24, hedges * 8), "Cevap çekince ifadeleri içeriyor", "The answer hedges");
    if (msg.text.length < 80 && !nSrc) add(-6, "Çok kısa cevap", "Very short answer");
    if (msg.feedback === "down") { s = Math.min(s, 20); reasons.push({ d: -40, t: T("Sen bu cevabı hatalı işaretledin", "You marked this answer as wrong") }); }
    if (msg.feedback === "up") add(6, "Sen bu cevabı doğru buldun", "You marked this answer as helpful");
    s = Math.max(5, Math.min(95, Math.round(s)));
    return { score: s, level: s >= 75 ? "high" : s >= 50 ? "mid" : "low", reasons };
  }
  function aiBadgeHtml(msg) {
    const r = aiScore(msg);
    if (!r) return "";
    const name = { high: T("Yüksek", "High"), mid: T("Orta", "Medium"), low: T("Düşük", "Low") }[r.level];
    const tip = r.level === "high" ? T("Yine de önemli sonuçları kendin kontrol et.", "Still double-check important results.")
      : T("Bu cevabı ders notuyla ya da öğretmeninle karşılaştır.", "Compare this answer with your notes or teacher.");
    return '<details class="ai-conf ai-conf--' + r.level + '"><summary title="' + esc(T("Yapay zekâ güven göstergesi", "AI confidence indicator")) + '">' +
      '<span class="ai-conf__bar" aria-hidden="true"><i style="width:' + r.score + '%"></i></span>' + esc(T("Güven: ", "Confidence: ") + name) + "</summary>" +
      '<div class="ai-conf__pop"><b>' + esc(T("Güven puanı ", "Confidence score ") + r.score + "/100") + "</b>" +
      (r.reasons.length ? "<ul>" + r.reasons.map((x) => '<li class="' + (x.d >= 0 ? "is-plus" : "is-minus") + '">' + (x.d >= 0 ? "+ " : "− ") + esc(x.t) + "</li>").join("") + "</ul>" : "") +
      "<p>" + esc(tip) + "</p><small>" + esc(T("Kural tabanlı bir tahmindir; doğruluğu garanti etmez.", "Rule-based estimate; not a guarantee of correctness.")) + "</small></div></details>";
  }

  App.confidence = { LEVELS, chipsHtml, read, record, log, aiScore, aiBadgeHtml, dayKey };
})();
