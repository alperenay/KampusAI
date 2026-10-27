/* =========================================================
   sinif-modu.js — Çevrimdışı QR Sınıf Modu (v1.42)   #/sinif-modu

   İnternet ve sunucu olmadan sınıfta ödev/test dağıtıp sonuç toplamak için:
     1. Öğretmen kazanımları ve soruları seçer → ödev paketi sıkıştırılıp kodlanır → tek ya da
        (büyükse) art arda dönen çoklu QR olarak gösterilir / yazdırılır.
     2. Öğrenci QR'ı kamerayla okur (ya da kodu yapıştırır), soruları çevrimdışı çözer → öğrenci
        kimliği, kazanım bazlı puanlar ve yanıt vektörünü içeren sıkıştırılmış sonuç QR'ı üretir.
     3. Öğretmen sonuç QR'larını okutur → puanlar kendi cihazındaki ödev kopyasından yeniden
        hesaplanır (değiştirilmiş sonuç kabul edilmez) → çevrimdışı sınıf listesi + CSV.

   Paket biçimi (her QR karesi):  KAIC1;<özet 8 hex>;<sıra>;<toplam>;<gövde parçası>
     gövde = "z" + base64url(deflate-raw(JSON))   (CompressionStream varsa ve küçültüyorsa)
           | "j" + base64url(UTF-8 JSON)           (eski tarayıcı yedeği)
     özet  = FNV-1a (gövdenin tamamı) — eksik/karışık kare ve bozulma yakalanır.
   Ödev:  { v:1, t:"a", id, ti, at, m (dk, 0 = süresiz), fb (cevapları göster), ks:[kazanım anahtarları],
            q:[{ k (ks sırası), q, o:[şıklar], a (doğru şık), d (1–3), e? (açıklama) }] }
   Sonuç: { v:1, t:"r", a (ödev id), h (ödev özeti), s (öğrenci no/ad), at, du (sn), r:[seçilen şık | -1],
            c:[eminlik 25/50/75/100 | 0], sc:[[doğru, toplam] kazanım sırasıyla] }
   Kayıtlar (meta deposu): öğretmen "sm:a:<id>" ödevler, "sm:r:<id>:<öğrenci>" sonuçlar;
   öğrenci "sm:s:<id>" aldığı ödev ve sonucu. Öğrenci sonucu ayrıca "quizzes" deposuna kazanım başına
   test olarak yazılır (tekrar kuyruğu, karne ve öğrenme haritası bunu görür).
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const L = (v) => App.L(v);
  const PREFIX = "KAIC1;", CHUNK = 480, MAX = 60000;
  const LETTERS = "ABCDEFGH";

  /* ================= Kodlama ================= */
  function fnv(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(16).padStart(8, "0");
  }
  const utf8 = (s) => new TextEncoder().encode(s);
  const fromUtf8 = (b) => new TextDecoder().decode(b);
  function b64u(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function unb64u(s) {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  async function pipe(bytes, stream) {
    return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
  }
  async function encodeBody(obj) {
    const raw = utf8(JSON.stringify(obj));
    if (typeof CompressionStream === "function") {
      try {
        const z = await pipe(raw, new CompressionStream("deflate-raw"));
        if (z.length < raw.length) return "z" + b64u(z);
      } catch (e) { /* desteklenmiyor: sıkıştırmasız */ }
    }
    return "j" + b64u(raw);
  }
  async function decodeBody(body) {
    const kind = body[0], bytes = unb64u(body.slice(1));
    if (kind === "z") {
      if (typeof DecompressionStream !== "function") throw new Error(T("Bu tarayıcı sıkıştırılmış kodu açamıyor; uygulamayı güncelle.", "This browser cannot open compressed codes; please update."));
      return JSON.parse(fromUtf8(await pipe(bytes, new DecompressionStream("deflate-raw"))));
    }
    if (kind === "j") return JSON.parse(fromUtf8(bytes));
    throw new Error("packet");
  }
  /** Nesne → QR kareleri */
  async function pack(obj) {
    const body = await encodeBody(obj);
    if (body.length > MAX) throw new Error(T("Paket çok büyük: soru sayısını azalt ya da açıklamaları çıkar.", "Package too large: use fewer questions or drop explanations."));
    const digest = fnv(body), total = Math.ceil(body.length / CHUNK);
    return Array.from({ length: total }, (_, i) => PREFIX + digest + ";" + i + ";" + total + ";" + body.slice(i * CHUNK, (i + 1) * CHUNK));
  }
  function frame(text) {
    const m = /^KAIC1;([0-9a-f]{8});(\d{1,3});(\d{1,3});([A-Za-z0-9_-]+)$/.exec(String(text || "").trim());
    if (!m) return null;
    const index = Number(m[2]), total = Number(m[3]);
    return total > 0 && index < total && total <= Math.ceil(MAX / CHUNK) ? { digest: m[1], index, total, chunk: m[4] } : null;
  }
  /** Kare toplayıcı: kareler herhangi bir sırada (ve tekrar tekrar) gelebilir */
  function collector() {
    let digest = null, parts = [];
    return {
      add(text) {
        const f = frame(text);
        if (!f) return { ok: false };
        if (digest !== f.digest) { digest = f.digest; parts = new Array(f.total); }
        parts[f.index] = f.chunk;
        const have = parts.filter(Boolean).length;
        return { ok: true, have, total: f.total, done: have === f.total, digest };
      },
      body: () => parts.join(""),
      digest: () => digest,
      reset() { digest = null; parts = []; }
    };
  }
  async function unpack(frames) {
    const c = collector();
    let st = null;
    String(Array.isArray(frames) ? frames.join("\n") : frames).split(/\s+/).filter(Boolean).forEach((x) => { const r = c.add(x); if (r.ok) st = r; });
    if (!st) throw new Error(T("Kod tanınmadı (KAIC1 ile başlamalı).", "Code not recognised (must start with KAIC1)."));
    if (!st.done) throw new Error(T("Eksik kare: " + st.have + "/" + st.total, "Missing frames: " + st.have + "/" + st.total));
    const body = c.body();
    if (fnv(body) !== st.digest) throw new Error(T("Kod bozuk (özet tutmuyor).", "Corrupted code (checksum mismatch)."));
    const data = await decodeBody(body);
    return { data: validate(data), digest: st.digest };
  }

  /* ================= Doğrulama ================= */
  const str = (s, n) => typeof s === "string" && s.length <= n;
  const KEY = /^\d{1,2}\/[\w-]+\/[\w-]+\/[\w-]+$/;
  function validate(d) {
    if (!d || d.v !== 1 || !["a", "r", "d", "dr"].includes(d.t) || !str(d.id || d.a, 40)) throw new Error("packet");
    // Düello paketleri (duello.js, v1.45): "d" soru seti + başlama zamanı, "dr" oyuncunun cevapları ve süreleri
    if (d.t === "d") {
      if (!Number.isFinite(d.st) || !Number.isInteger(d.sec) || d.sec < 5 || d.sec > 120 || !str(d.hn, 40)) throw new Error("packet");
    }
    if (d.t === "dr") {
      if (!str(d.s, 40) || !d.s.trim() || !Array.isArray(d.r) || d.r.length > 15 || !d.r.every((x) => Number.isInteger(x) && x >= -1 && x < 8) ||
        !Array.isArray(d.ms) || d.ms.length !== d.r.length || !d.ms.every((x) => Number.isFinite(x) && x >= 0)) throw new Error("packet");
      return d;
    }
    if (d.t === "a" || d.t === "d") {
      if (!str(d.ti, 120) || !Array.isArray(d.ks) || !d.ks.length || d.ks.length > 20 || !d.ks.every((k) => KEY.test(k))) throw new Error("packet");
      if (!Array.isArray(d.q) || !d.q.length || d.q.length > 60) throw new Error("packet");
      d.q.forEach((q) => {
        if (!Number.isInteger(q.k) || q.k < 0 || q.k >= d.ks.length || !str(q.q, 3000) || !Array.isArray(q.o) || q.o.length < 2 || q.o.length > 6 ||
          !q.o.every((o) => str(o, 800)) || !Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) throw new Error("packet");
      });
    } else {
      if (!str(d.s, 60) || !d.s.trim() || !Array.isArray(d.r) || d.r.length > 60 || !d.r.every((x) => Number.isInteger(x) && x >= -1 && x < 8)) throw new Error("packet");
    }
    return d;
  }

  /* ================= Puanlama ================= */
  /** Yanıt vektöründen kazanım bazlı puan: sc[i] = [doğru, toplam] */
  function score(a, answers) {
    const sc = a.ks.map(() => [0, 0]);
    a.q.forEach((q, i) => { sc[q.k][1]++; if (answers[i] === q.a) sc[q.k][0]++; });
    const correct = sc.reduce((s, x) => s + x[0], 0);
    return { sc, correct, total: a.q.length, pct: a.q.length ? Math.round((correct / a.q.length) * 100) : 0 };
  }
  const pctOf = (x) => (x && x[1] ? Math.round((x[0] / x[1]) * 100) : null);
  const outcomeLabel = (key) => { const f = App.lessons && App.lessons.find(key); return f ? L(f.outcome.title) : key; };
  const outcomeCode = (key, i) => { const f = App.lessons && App.lessons.find(key); return (f && f.outcome.code) || "K" + (i + 1); };

  /* ================= Depolama ================= */
  const getMeta = (id) => App.db.get("meta", id).catch(() => null);
  const allMeta = async (prefix) => (await App.db.getAll("meta").catch(() => [])).filter((r) => r.id && r.id.indexOf(prefix) === 0);

  /* ================= QR gösterimi ================= */
  async function qrSvg(text) {
    await App.utils.loadScript("assets/vendor/qr/qrcode.js");
    const qr = window.qrcode(0, "L");
    qr.addData(text); qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }
  /** Çoklu QR oynatıcı: kareler art arda döner; durdur/ileri/geri; tüm kodları kopyala */
  async function mountPlayer(el, frames, opts) {
    opts = opts || {};
    const svgs = await Promise.all(frames.map(qrSvg));
    let i = 0, playing = frames.length > 1, timer = null, ms = 650;
    el.innerHTML =
      '<div class="sm-player">' +
        '<div class="sm-qr" role="img" aria-label="' + esc(T("QR kodu", "QR code")) + '"></div>' +
        '<div class="sm-player__bar">' +
          (frames.length > 1 ? '<button class="btn btn--sm" type="button" data-p="prev" aria-label="' + esc(T("Önceki kare", "Previous frame")) + '">' + App.icon("chevronL") + "</button>" +
            '<button class="btn btn--sm" type="button" data-p="play">' + App.icon("pause") + esc(T("Durdur", "Pause")) + "</button>" +
            '<button class="btn btn--sm" type="button" data-p="next" aria-label="' + esc(T("Sonraki kare", "Next frame")) + '">' + App.icon("chevron") + "</button>" : "") +
          '<span class="sm-player__n" aria-live="off"></span>' +
        "</div>" +
        (frames.length > 1 ? '<p class="hint">' + esc(T("Kod " + frames.length + " kareye bölündü; kareler kendiliğinden döner. Okuyan cihaz eksik kareleri bekler, sıra önemli değil.",
          "The code is split into " + frames.length + " frames that cycle automatically; the scanner waits for missing ones in any order.")) + "</p>" : "") +
        '<details class="sm-codes"><summary>' + esc(T("Kamera yoksa: kodu metin olarak paylaş", "No camera? Share the code as text")) + "</summary>" +
          '<textarea class="textarea sm-codes__t" readonly rows="4">' + esc(frames.join("\n")) + "</textarea>" +
          '<button class="btn btn--sm" type="button" data-p="copy">' + App.icon("copy") + esc(T("Kopyala", "Copy")) + "</button></details>" +
      "</div>";
    App.hydrateIcons(el);
    const box = el.querySelector(".sm-qr"), n = el.querySelector(".sm-player__n");
    const show = () => { box.innerHTML = svgs[i]; n.textContent = frames.length > 1 ? (i + 1) + " / " + frames.length : T("Tek kare", "Single frame"); };
    const loop = () => { clearTimeout(timer); if (!playing || !el.isConnected) return; timer = setTimeout(() => { i = (i + 1) % frames.length; show(); loop(); }, ms); };
    el.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-p]"); if (!b) return;
      const p = b.dataset.p;
      if (p === "copy") { try { await navigator.clipboard.writeText(frames.join("\n")); App.ui.toast(T("Kopyalandı", "Copied")); } catch (er) { el.querySelector(".sm-codes__t").select(); } return; }
      if (p === "play") { playing = !playing; b.innerHTML = App.icon(playing ? "pause" : "play") + esc(playing ? T("Durdur", "Pause") : T("Oynat", "Play")); App.hydrateIcons(b); loop(); return; }
      playing = false; const pb = el.querySelector('[data-p="play"]'); if (pb) { pb.innerHTML = App.icon("play") + esc(T("Oynat", "Play")); App.hydrateIcons(pb); }
      i = (i + (p === "next" ? 1 : frames.length - 1)) % frames.length; show();
    });
    show(); loop();
    return { stop: () => { playing = false; clearTimeout(timer); }, svgs };
  }

  /** Kamerayla (ya da yapıştırarak) çok kareli kod okuma. Çözülmüş { data, digest } ya da null döner. */
  function scan(title, expect) {
    return new Promise((resolve) => {
      let stream = null, stopped = false, detector = null, timer = null;
      const c = collector();
      const m = App.ui.modal({
        title,
        body:
          '<div class="qr-cam sm-cam"><video playsinline muted autoplay></video><span class="qr-cam__frame"></span></div>' +
          '<div class="sm-scan__prog"><div class="progress"><i style="width:0%"></i></div><p class="hint" id="smStatus">' + esc(T("Kamera açılıyor…", "Starting camera…")) + "</p></div>" +
          '<details class="sm-paste"><summary>' + esc(T("Kamera yok / açılmıyor: kodu yapıştır", "No camera: paste the code")) + "</summary>" +
            '<textarea class="textarea" id="smPaste" rows="4" placeholder="KAIC1;…"></textarea>' +
            '<button class="btn btn--sm btn--primary" type="button" id="smPasteGo">' + esc(T("Kodu aç", "Open code")) + "</button></details>",
        onClose: () => finish(null)
      });
      const video = m.el.querySelector("video"), status = m.el.querySelector("#smStatus"), bar = m.el.querySelector(".progress i");
      const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
      function finish(r) {
        if (stopped) return;
        stopped = true; clearTimeout(timer);
        if (stream) stream.getTracks().forEach((tr) => tr.stop());
        resolve(r);
      }
      async function done() {
        try {
          const res = await unpack([c.body()].map((b) => PREFIX + c.digest() + ";0;1;" + b));
          if (expect && res.data.t !== expect) throw new Error(expect === "a" ? T("Bu bir ödev kodu değil.", "This is not an assignment code.") : expect === "d" ? T("Bu bir düello kodu değil.", "This is not a duel code.") : T("Bu bir sonuç kodu değil.", "This is not a result code."));
          finish(res); m.close();
        } catch (e) { status.textContent = e.message; c.reset(); bar.style.width = "0%"; }
      }
      function onText(text) {
        const r = c.add(text);
        if (!r.ok) { status.textContent = T("Bu kod Sınıf Modu'na ait değil.", "This code is not a Class Mode code."); return false; }
        bar.style.width = Math.round((r.have / r.total) * 100) + "%";
        status.textContent = T(r.have + " / " + r.total + " kare okundu", r.have + " / " + r.total + " frames read");
        if (r.done) { done(); return true; }
        return false;
      }
      async function tick() {
        if (stopped) return;
        if (video.readyState >= 2 && video.videoWidth) {
          try {
            let text = null;
            if (detector) { const codes = await detector.detect(video); if (codes.length) text = codes[0].rawValue; }
            else if (window.jsQR) {
              const scale = Math.min(1, 900 / Math.max(video.videoWidth, video.videoHeight));
              canvas.width = Math.round(video.videoWidth * scale); canvas.height = Math.round(video.videoHeight * scale);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
              if (code) text = code.data;
            }
            if (text && onText(text)) return;
          } catch (e) { /* sonraki kare */ }
        }
        timer = setTimeout(tick, 120);
      }
      m.el.querySelector("#smPasteGo").addEventListener("click", () => {
        const parts = m.el.querySelector("#smPaste").value.split(/\s+/).filter(Boolean);
        let any = false;
        parts.forEach((p) => { if (!stopped && onText(p)) any = true; });
        if (!any && !parts.some((p) => frame(p))) status.textContent = T("Kod tanınmadı (KAIC1 ile başlamalı).", "Code not recognised (must start with KAIC1).");
      });
      (async () => {
        try {
          if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) throw new Error("cam");
          if ("BarcodeDetector" in window) {
            try { if ((await window.BarcodeDetector.getSupportedFormats()).includes("qr_code")) detector = new window.BarcodeDetector({ formats: ["qr_code"] }); } catch (e) { detector = null; }
          }
          if (!detector) await App.utils.loadScript("assets/vendor/qr/jsQR.js");
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }, audio: false });
          if (stopped) { stream.getTracks().forEach((tr) => tr.stop()); return; }
          video.srcObject = stream; await video.play().catch(() => {});
          status.textContent = T("QR'ı çerçeveye tut; çok kareli kodda kareler dönerken bekle.", "Hold the QR in the frame; for multi-frame codes keep it there while frames cycle.");
          tick();
        } catch (e) {
          status.textContent = T("Kamera açılamadı. Kodu metin olarak yapıştırabilirsin.", "Camera unavailable. You can paste the code as text.");
          const d = m.el.querySelector(".sm-paste"); if (d) d.open = true;
        }
      })();
    });
  }

  /* ================= Soru kaynakları ================= */
  /** "Soru\nA) …\nB) … *\nAçıklama: …" biçimindeki metni sorulara çevirir (boş satır = yeni soru) */
  function parseManual(text) {
    const out = [];
    String(text || "").replace(/\r/g, "").split(/\n\s*\n/).forEach((block) => {
      const lines = block.split("\n").map((s) => s.trim()).filter(Boolean);
      const q = [], o = []; let a = -1, e = "";
      lines.forEach((ln) => {
        const om = /^\*?\s*([A-Ha-h])[).]\s*(.+)$/.exec(ln);
        if (om) {
          let txt = om[2].trim(); const star = /^\*/.test(ln) || /\s\*$/.test(txt) || /\(doğru\)$/i.test(txt);
          txt = txt.replace(/\s*\*$/, "").replace(/\s*\(doğru\)$/i, "").trim();
          if (star) a = o.length; o.push(txt); return;
        }
        const em = /^(açıklama|explanation)\s*:\s*(.+)$/i.exec(ln);
        if (em) { e = em[2]; return; }
        if (!o.length) q.push(ln.replace(/^\d+\s*[).]\s*/, ""));
      });
      if (q.length && o.length >= 2 && a >= 0) out.push({ q: q.join("\n"), o, a, d: 2, e });
    });
    return out;
  }
  /** Bu cihazda daha önce çözülen testlerden, o kazanıma ait sorular (çevrimdışı çalışır) */
  async function fromSaved(key) {
    const rows = (await App.db.getAll("quizzes").catch(() => [])).filter((r) => r.key === key && Array.isArray(r.questions));
    const seen = new Set(), out = [];
    rows.forEach((r) => r.questions.forEach((q) => {
      if (!q || !q.q || !Array.isArray(q.options) || !Number.isInteger(q.answer) || seen.has(q.q)) return;
      seen.add(q.q); out.push({ q: String(q.q), o: q.options.map(String), a: q.answer, d: Number(q.difficulty) || 2, e: String(q.explain || "") });
    }));
    return out;
  }
  async function fromAI(key) {
    const f = App.lessons.find(key);
    if (!f) return [];
    if (App.content) await App.content.ensure(f.grade.id, f.subject.id);
    const res = await App.quiz.generatePool(f.grade, f.subject, f.unit, f.outcome, {});
    return ((res.data && res.data.questions) || []).map((q) => ({ q: q.q, o: q.options, a: q.answer, d: q.difficulty || 2, e: q.explain || "" }));
  }
  /** Zorluk dengeli seçim: önce farklı zorluklardan, sonra kalanlar */
  function pickBalanced(list, n) {
    const by = [1, 2, 3].map((d) => list.filter((q) => q.d === d));
    const out = [];
    while (out.length < n && by.some((x) => x.length)) by.forEach((x) => { if (out.length < n && x.length) out.push(x.shift()); });
    list.forEach((q) => { if (out.length < n && !out.includes(q)) out.push(q); });
    return out;
  }

  /* ================= Sayfalar ================= */
  function head(title, sub, actions) {
    return '<div class="page-head"><div><h1>' + esc(title) + "</h1>" + (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div>" +
      (actions ? '<div class="page-head__actions">' + actions + "</div>" : "") + "</div>";
  }
  const back = (href, label) => '<a class="btn btn--sm btn--ghost sm-back" href="' + href + '">' + App.icon("chevronL") + esc(label) + "</a>";

  async function renderHome(view) {
    App.setTitle(T("Sınıf Modu", "Class Mode"));
    const [mine, got] = await Promise.all([allMeta("sm:a:"), allMeta("sm:s:")]);
    const results = await allMeta("sm:r:");
    const nRes = (id) => results.filter((r) => r.aid === id).length;
    mine.sort((a, b) => String(b.data.at).localeCompare(String(a.data.at)));
    got.sort((a, b) => String(b.at).localeCompare(String(a.at)));
    view.innerHTML =
      '<div class="page page--narrow sm">' +
        head(T("Sınıf Modu", "Class Mode"), T("İnternetsiz sınıf: ödevi QR ile dağıt, sonuçları QR ile topla. Hiçbir veri sunucuya gitmez.",
          "Offline classroom: hand out assignments by QR and collect results by QR. No data leaves the devices.")) +
        '<div class="sm-roles">' +
          '<section class="card sm-role"><h2>' + App.icon("grad") + esc(T("Öğretmen", "Teacher")) + "</h2>" +
            "<p>" + esc(T("Kazanım ve soruları seç, ödev QR'ını tahtaya yansıt ya da yazdır; öğrencilerin sonuç QR'larını okutarak sınıf listesini doldur.",
              "Pick outcomes and questions, project or print the assignment QR, then scan students' result QRs into your class list.")) + "</p>" +
            '<a class="btn btn--primary" href="#/sinif-modu/yeni">' + App.icon("plus") + esc(T("Yeni ödev hazırla", "New assignment")) + "</a></section>" +
          '<section class="card sm-role"><h2>' + App.icon("book") + esc(T("Öğrenci", "Student")) + "</h2>" +
            "<p>" + esc(T("Öğretmeninin gösterdiği ödev QR'ını okut, soruları internetsiz çöz, çıkan sonuç QR'ını öğretmenine göster.",
              "Scan the assignment QR, solve it offline, then show the result QR to your teacher.")) + "</p>" +
            '<button class="btn btn--primary" type="button" id="smScanA">' + App.icon("scan") + esc(T("Ödev QR'ını okut", "Scan assignment QR")) + "</button></section>" +
        "</div>" +
        (mine.length ? '<h2 class="sm-h">' + esc(T("Hazırladığım ödevler", "My assignments")) + '</h2><ul class="sm-list">' + mine.map((r) =>
          '<li><a class="card sm-li" href="#/sinif-modu/odev/' + esc(r.data.id) + '"><b>' + esc(r.data.ti) + "</b><span>" +
            esc(App.utils.fmtDate(String(r.data.at).slice(0, 10)) + " · " + r.data.q.length + T(" soru · ", " questions · ") + nRes(r.data.id) + T(" sonuç", " results")) +
            "</span>" + App.icon("chevron") + "</a></li>").join("") + "</ul>" : "") +
        (got.length ? '<h2 class="sm-h">' + esc(T("Aldığım ödevler", "Assignments I received")) + '</h2><ul class="sm-list">' + got.map((r) =>
          '<li><a class="card sm-li" href="#/sinif-modu/coz/' + esc(r.data.id) + '"><b>' + esc(r.data.ti) + "</b><span>" +
            esc(r.result ? T("Tamamlandı · %", "Done · ") + r.result.pct + (App.i18n.lang === "en" ? "%" : "") : T("Çözülmedi", "Not solved yet")) + "</span>" + App.icon("chevron") + "</a></li>").join("") + "</ul>" : "") +
      "</div>";
    App.hydrateIcons(view);
    view.querySelector("#smScanA").addEventListener("click", async () => {
      const res = await scan(T("Ödev QR'ını okut", "Scan assignment QR"), "a");
      if (!res) return;
      const id = "sm:s:" + res.data.id, cur = await getMeta(id);
      if (!cur) await App.db.put("meta", { id, kind: "sm-s", at: new Date().toISOString(), digest: res.digest, data: res.data });
      location.hash = "#/sinif-modu/coz/" + encodeURIComponent(res.data.id);
    });
  }

  /* ---------- Öğretmen: yeni ödev ---------- */
  async function renderNew(view) {
    App.setTitle(T("Yeni ödev", "New assignment"));
    const C = App.data.curriculum;
    const st = { g: App.prefs.get("curGrade", "9") || "9", s: "", keys: [], qs: {}, per: 5, m: 0, fb: true, ex: true };
    const grades = C.grades;
    view.innerHTML = '<div class="page page--narrow sm">' + back("#/sinif-modu", T("Sınıf Modu", "Class Mode")) +
      head(T("Yeni ödev", "New assignment"), T("1) Kazanımları seç  2) Soruları hazırla  3) QR'ı oluştur", "1) Pick outcomes  2) Prepare questions  3) Create the QR")) +
      '<section class="card sm-step"><h2>1 · ' + esc(T("Kazanımlar", "Outcomes")) + '</h2><div class="sm-row">' +
        '<label class="field"><span class="field__label">' + esc(T("Sınıf", "Grade")) + '</span><select class="select" id="smG">' +
          grades.map((g) => '<option value="' + g.id + '"' + (g.id === String(st.g) ? " selected" : "") + ">" + esc(C.gradeName(g.id)) + "</option>").join("") + "</select></label>" +
        '<label class="field"><span class="field__label">' + esc(T("Ders", "Subject")) + '</span><select class="select" id="smS"></select></label></div>' +
        '<div id="smOut" class="sm-outs"></div></section>' +
      '<section class="card sm-step"><h2>2 · ' + esc(T("Sorular", "Questions")) + '</h2><div class="sm-row">' +
        '<label class="field"><span class="field__label">' + esc(T("Kazanım başına soru", "Questions per outcome")) + '</span><input class="input" type="number" id="smPer" min="1" max="10" value="5"></label>' +
        '<label class="field"><span class="field__label">' + esc(T("Süre (dk, 0 = süresiz)", "Time (min, 0 = none)")) + '</span><input class="input" type="number" id="smM" min="0" max="180" value="0"></label></div>' +
        '<label class="sm-check"><input type="checkbox" id="smFb" checked> ' + esc(T("Bitince öğrenciye doğru cevapları göster", "Show correct answers after submitting")) + "</label>" +
        '<label class="sm-check"><input type="checkbox" id="smEx" checked> ' + esc(T("Açıklamaları pakete ekle (QR büyür)", "Include explanations (bigger QR)")) + "</label>" +
        '<div id="smQs" class="sm-qs"></div></section>' +
      '<section class="card sm-step"><h2>3 · ' + esc(T("Paket", "Package")) + '</h2>' +
        '<label class="field"><span class="field__label">' + esc(T("Ödev adı", "Title")) + '</span><input class="input" id="smTi" maxlength="100" value="' + esc(T("Ödev", "Assignment") + " · " + App.utils.fmtDate(App.utils.todayISO())) + '"></label>' +
        '<div class="form-actions"><button class="btn btn--primary" type="button" id="smMake" disabled>' + App.icon("scan") + esc(T("QR'ı oluştur", "Create QR")) + "</button></div></section>" +
    "</div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);

    function subjOpts() {
      const g = C.findGrade($("#smG").value);
      st.g = g.id;
      if (!g.subjects.some((s) => s.id === st.s)) st.s = g.subjects[0].id;
      $("#smS").innerHTML = g.subjects.map((s) => '<option value="' + s.id + '"' + (s.id === st.s ? " selected" : "") + ">" + esc(L(s.name)) + "</option>").join("");
      outs();
    }
    function outs() {
      st.s = $("#smS").value;
      const s = C.findSubject(st.g, st.s);
      $("#smOut").innerHTML = (s.units || []).map((u) => '<details class="sm-unit"><summary>' + esc(L(u.name)) + "</summary>" + u.outcomes.map((o) => {
        const key = C.key(st.g, st.s, u.id, o.id);
        return '<label class="sm-check"><input type="checkbox" data-key="' + esc(key) + '"' + (st.keys.includes(key) ? " checked" : "") + "> <span>" +
          (o.code ? '<b class="sm-code">' + esc(o.code) + "</b> " : "") + esc(L(o.title)) + "</span></label>";
      }).join("") + "</details>").join("") || '<p class="hint">' + esc(T("Bu derste kazanım yok.", "No outcomes in this subject.")) + "</p>";
    }
    function paintQs() {
      $("#smQs").innerHTML = st.keys.length ? st.keys.map((key, i) => {
        const list = st.qs[key] || [];
        return '<div class="sm-qk" data-k="' + esc(key) + '"><div class="sm-qk__h"><b>' + esc(outcomeCode(key, i)) + "</b> " + esc(outcomeLabel(key)) +
          ' <span class="sm-qk__n">' + list.length + " / " + st.per + "</span></div>" +
          '<div class="sm-qk__btns"><button class="btn btn--sm" type="button" data-src="saved">' + App.icon("database") + esc(T("Kayıtlı testlerimden", "From my saved quizzes")) + "</button>" +
          '<button class="btn btn--sm" type="button" data-src="ai">' + App.icon("sparkle") + esc(T("Yapay zekâyla üret", "Generate with AI")) + "</button>" +
          '<button class="btn btn--sm" type="button" data-src="manual">' + App.icon("edit") + esc(T("Elle yaz", "Write manually")) + "</button></div>" +
          (list.length ? '<ol class="sm-qlist">' + list.map((q, j) => '<li><span class="md">' + App.markdown.render(q.q.slice(0, 220)).replace(/^<p>|<\/p>$/g, "") + "</span>" +
            '<button class="icon-btn icon-btn--sm" type="button" data-del="' + j + '" title="' + esc(T("Çıkar", "Remove")) + '">' + App.icon("close") + "</button></li>").join("") + "</ol>" : "") +
          "</div>";
      }).join("") : '<p class="hint">' + esc(T("Önce en az bir kazanım seç.", "Pick at least one outcome first.")) + "</p>";
      App.hydrateIcons($("#smQs"));
      const ready = st.keys.length && st.keys.every((k) => (st.qs[k] || []).length);
      $("#smMake").disabled = !ready;
    }
    $("#smG").addEventListener("change", subjOpts);
    $("#smS").addEventListener("change", outs);
    $("#smOut").addEventListener("change", (e) => {
      const cb = e.target.closest("[data-key]"); if (!cb) return;
      const k = cb.dataset.key;
      if (cb.checked) { if (st.keys.length >= 20) { cb.checked = false; App.ui.toast(T("En çok 20 kazanım", "At most 20 outcomes"), "error"); return; } st.keys.push(k); }
      else { st.keys = st.keys.filter((x) => x !== k); delete st.qs[k]; }
      paintQs();
    });
    $("#smPer").addEventListener("change", () => { st.per = Math.max(1, Math.min(10, Number($("#smPer").value) || 5)); st.keys.forEach((k) => { if (st.qs[k]) st.qs[k] = st.qs[k].slice(0, st.per); }); paintQs(); });
    $("#smQs").addEventListener("click", async (e) => {
      const box = e.target.closest("[data-k]"); if (!box) return;
      const key = box.dataset.k;
      const del = e.target.closest("[data-del]");
      if (del) { st.qs[key].splice(Number(del.dataset.del), 1); paintQs(); return; }
      const b = e.target.closest("[data-src]"); if (!b) return;
      const src = b.dataset.src;
      const add = (list) => {
        const have = st.qs[key] || [], seen = new Set(have.map((q) => q.q));
        const fresh = list.filter((q) => !seen.has(q.q));
        st.qs[key] = have.concat(pickBalanced(fresh, Math.max(0, st.per - have.length)));
        paintQs();
        return fresh.length;
      };
      if (src === "manual") {
        const m = App.ui.modal({
          title: T("Elle soru yaz", "Write questions"),
          body: '<p class="hint">' + esc(T("Her soru arasında bir boş satır bırak. Doğru şıkkın sonuna * koy. İstersen \"Açıklama:\" satırı ekle.",
            "Leave a blank line between questions. Put * after the correct option. Optionally add an \"Explanation:\" line.")) + "</p>" +
            '<textarea class="textarea" id="smMan" rows="10" placeholder="' + esc("2 + 3 kaçtır?\nA) 4\nB) 5 *\nC) 6\nAçıklama: 2 + 3 = 5") + '"></textarea>',
          actions: '<button class="btn" type="button" data-close>' + esc(T("Vazgeç", "Cancel")) + '</button><button class="btn btn--primary" type="button" id="smManGo">' + esc(T("Ekle", "Add")) + "</button>"
        });
        m.el.querySelector("#smManGo").addEventListener("click", () => {
          const list = parseManual(m.el.querySelector("#smMan").value);
          if (!list.length) { App.ui.toast(T("Soru bulunamadı: şıkları A) B) biçiminde yaz, doğru olanı * ile işaretle.", "No questions found: use A) B) options and mark the correct one with *."), "error"); return; }
          const have = st.qs[key] || [];
          st.qs[key] = have.concat(list).slice(0, Math.max(st.per, have.length + list.length));
          m.close(); paintQs();
        });
        return;
      }
      b.disabled = true; const old = b.innerHTML; b.textContent = T("Hazırlanıyor…", "Preparing…");
      try {
        const n = add(src === "saved" ? await fromSaved(key) : await fromAI(key));
        if (!n) App.ui.toast(src === "saved" ? T("Bu kazanımda bu cihazda kayıtlı test sorusu yok.", "No saved quiz questions for this outcome on this device.") : T("Yeni soru gelmedi.", "No new questions."), "error");
      } catch (er) { App.ui.toast(T("Sorular hazırlanamadı: ", "Could not prepare questions: ") + (er && er.message || er), "error"); }
      finally { if (b.isConnected) { b.disabled = false; b.innerHTML = old; } }
    });
    $("#smMake").addEventListener("click", async () => {
      const id = uid("odv").slice(0, 24);
      const ex = $("#smEx").checked;
      const a = { v: 1, t: "a", id, ti: ($("#smTi").value || T("Ödev", "Assignment")).trim().slice(0, 100), at: new Date().toISOString(),
        m: Math.max(0, Math.min(180, Number($("#smM").value) || 0)), fb: $("#smFb").checked, ks: st.keys.slice(), q: [] };
      st.keys.forEach((key, k) => (st.qs[key] || []).forEach((q) => a.q.push(Object.assign({ k, q: q.q, o: q.o, a: q.a, d: q.d || 2 }, ex && q.e ? { e: q.e } : {}))));
      try {
        validate(a);
        const frames = await pack(a);
        await App.db.put("meta", { id: "sm:a:" + id, kind: "sm-a", digest: frame(frames[0]).digest, data: a });
        location.hash = "#/sinif-modu/odev/" + id;
      } catch (er) { App.ui.toast(er.message === "packet" ? T("Soru biçimi geçersiz.", "Invalid question format.") : er.message, "error"); }
    });
    subjOpts(); paintQs();
  }

  /* ---------- Öğretmen: ödev + sınıf listesi ---------- */
  async function renderAssignment(view, id) {
    const rec = await getMeta("sm:a:" + id);
    if (!rec) { view.innerHTML = '<div class="page">' + App.ui.empty("close", T("Ödev bulunamadı", "Assignment not found"), "") + "</div>"; return; }
    const a = rec.data;
    App.setTitle(a.ti);
    const frames = await pack(a);
    let rows = (await allMeta("sm:r:" + id + ":")).sort((x, y) => String(x.sid).localeCompare(String(y.sid), "tr", { numeric: true }));

    function rosterHtml() {
      if (!rows.length) return App.ui.empty("scan", T("Henüz sonuç yok", "No results yet"), T("Öğrenciler ödevi bitirince sonuç QR'larını okut.", "When students finish, scan their result QRs."));
      const avg = a.ks.map((_, k) => { const v = rows.map((r) => pctOf(r.sc[k])).filter((x) => x !== null); return v.length ? Math.round(v.reduce((s, x) => s + x, 0) / v.length) : null; });
      const tot = Math.round(rows.reduce((s, r) => s + r.pct, 0) / rows.length);
      const cell = (p) => p === null ? "<td>–</td>" : '<td class="sm-p ' + (p < 50 ? "is-low" : p < 75 ? "is-mid" : "is-high") + '">' + p + "</td>";
      const weakest = avg.map((v, k) => ({ v, k })).filter((x) => x.v !== null).sort((x, y) => x.v - y.v)[0];
      return (weakest && weakest.v < 70 ? '<p class="sm-weak">' + App.icon("target") + esc(T("En çok zorlanılan: ", "Hardest: ") + outcomeCode(a.ks[weakest.k], weakest.k) + " · " + outcomeLabel(a.ks[weakest.k]) + " (%" + weakest.v + ")") + "</p>" : "") +
        '<div class="sm-tablewrap"><table class="sm-table"><thead><tr><th scope="col">' + esc(T("Öğrenci", "Student")) + "</th>" +
        a.ks.map((k, i) => '<th scope="col" title="' + esc(outcomeLabel(k)) + '">' + esc(outcomeCode(k, i)) + "</th>").join("") +
        '<th scope="col">' + esc(T("Toplam %", "Total %")) + '</th><th scope="col">' + esc(T("Süre", "Time")) + '</th><th scope="col"><span class="sr-only">' + esc(T("Sil", "Delete")) + "</span></th></tr></thead><tbody>" +
        rows.map((r) => "<tr><th scope=\"row\">" + esc(r.sid) + "</th>" + a.ks.map((_, k) => cell(pctOf(r.sc[k]))).join("") + cell(r.pct) +
          "<td>" + (r.du ? (r.du < 60 ? "<1" : Math.round(r.du / 60)) + T(" dk", " min") : "–") + '</td><td><button class="icon-btn icon-btn--sm" type="button" data-delr="' + esc(r.id) + '" title="' + esc(T("Sil", "Delete")) + '">' + App.icon("trash") + "</button></td></tr>").join("") +
        "</tbody><tfoot><tr><th scope=\"row\">" + esc(T("Sınıf ortalaması", "Class average")) + "</th>" + avg.map(cell).join("") + cell(tot) + "<td></td><td></td></tr></tfoot></table></div>" +
        '<p class="hint">' + esc(T("Hücreler yüzde başarıdır. Düşük (<50) koyu çizgili, orta (50–74) noktalı gösterilir; siyah-beyaz çıktıda da ayırt edilir.",
          "Cells are percent correct. Low (<50) is hatched, mid (50–74) dotted, so they stay distinct in black-and-white print.")) + "</p>";
    }
    view.innerHTML = '<div class="page sm">' + back("#/sinif-modu", T("Sınıf Modu", "Class Mode")) +
      head(a.ti, a.q.length + T(" soru · ", " questions · ") + a.ks.length + T(" kazanım", " outcomes") + (a.m ? " · " + a.m + T(" dk", " min") : ""),
        '<button class="btn btn--primary" type="button" id="smScanR">' + App.icon("scan") + esc(T("Sonuç QR'ı okut", "Scan result QR")) + "</button>") +
      '<div class="sm-grid"><section class="card sm-share"><h2>' + esc(T("Ödev QR'ı", "Assignment QR")) + "</h2><div id=\"smPlayer\"></div>" +
        '<div class="sm-share__act"><button class="btn btn--sm" type="button" id="smPrint">' + App.icon("download") + esc(T("Kareleri yazdır", "Print frames")) + "</button></div></section>" +
      '<section class="card sm-roster"><h2>' + esc(T("Sınıf listesi", "Class list")) + ' <span class="sm-count">' + rows.length + "</span></h2>" +
        '<div id="smRoster">' + rosterHtml() + "</div>" +
        '<div class="form-actions"><button class="btn btn--sm" type="button" id="smCsv"' + (rows.length ? "" : " disabled") + ">" + App.icon("download") + "CSV</button></div></section></div>" +
      '<div class="sm-print" aria-hidden="true"></div></div>';
    App.hydrateIcons(view);
    const player = await mountPlayer(view.querySelector("#smPlayer"), frames);
    const repaint = () => { view.querySelector("#smRoster").innerHTML = rosterHtml(); view.querySelector(".sm-count").textContent = rows.length; view.querySelector("#smCsv").disabled = !rows.length; App.hydrateIcons(view.querySelector("#smRoster")); };

    view.querySelector("#smScanR").addEventListener("click", async () => {
      for (;;) {
        const res = await scan(T("Sonuç QR'ı okut", "Scan result QR"), "r");
        if (!res) return;
        const r = res.data;
        if (r.a !== a.id) { App.ui.toast(T("Bu sonuç başka bir ödeve ait.", "This result belongs to another assignment."), "error"); continue; }
        if (r.h !== rec.digest || r.r.length !== a.q.length) { App.ui.toast(T("Sonuç bu ödevin farklı bir sürümüyle çözülmüş.", "This result was made with a different version of the assignment."), "error"); continue; }
        // Puan öğrencinin gönderdiğinden değil, öğretmendeki ödev kopyasından hesaplanır
        const s = score(a, r.r);
        const sid = r.s.trim().slice(0, 60);
        const row = { id: "sm:r:" + a.id + ":" + sid, kind: "sm-r", aid: a.id, sid, at: r.at, du: r.du || 0, answers: r.r, conf: r.c || [], sc: s.sc, pct: s.pct, scanned: new Date().toISOString() };
        const old = rows.find((x) => x.id === row.id);
        if (old && !(await App.ui.confirm(T(sid + " için sonuç zaten var. Yenisiyle değiştirilsin mi?", "A result for " + sid + " exists. Replace it?"), T("Değiştir", "Replace")))) continue;
        await App.db.put("meta", row);
        rows = rows.filter((x) => x.id !== row.id).concat(row).sort((x, y) => String(x.sid).localeCompare(String(y.sid), "tr", { numeric: true }));
        repaint();
        App.ui.toast(T(sid + ": %" + s.pct + " kaydedildi. Sıradaki öğrenci…", sid + ": " + s.pct + "% saved. Next student…"));
      }
    });
    view.querySelector("#smRoster").addEventListener("click", async (e) => {
      const b = e.target.closest("[data-delr]"); if (!b) return;
      if (!(await App.ui.confirm(T("Bu öğrencinin sonucu silinsin mi?", "Delete this student's result?"), T("Sil", "Delete"), true))) return;
      await App.db.remove("meta", b.dataset.delr);
      rows = rows.filter((x) => x.id !== b.dataset.delr); repaint();
    });
    view.querySelector("#smCsv").addEventListener("click", () => {
      const q = (s) => '"' + String(s).replace(/"/g, '""') + '"';
      const lines = [[T("Öğrenci", "Student")].concat(a.ks.map((k, i) => outcomeCode(k, i) + " " + outcomeLabel(k)), [T("Toplam %", "Total %"), T("Süre (dk)", "Time (min)"), T("Yanıtlar", "Answers")]).map(q).join(";")]
        .concat(rows.map((r) => [r.sid].concat(a.ks.map((_, k) => pctOf(r.sc[k]) == null ? "" : pctOf(r.sc[k])), [r.pct, r.du ? Math.round(r.du / 60) : "", r.answers.map((x) => (x < 0 ? "-" : LETTERS[x])).join("")]).map(q).join(";")));
      App.utils.downloadText("sinif-" + a.id + ".csv", "﻿" + lines.join("\r\n"), "text/csv;charset=utf-8");
    });
    view.querySelector("#smPrint").addEventListener("click", () => {
      const box = view.querySelector(".sm-print");
      box.innerHTML = '<h1>' + esc(a.ti) + "</h1><p>" + esc(T("Kareleri sırayla ya da karışık okutabilirsiniz.", "Frames can be scanned in any order.")) + '</p><div class="sm-print__grid">' +
        player.svgs.map((s, i) => '<figure>' + s + "<figcaption>" + (i + 1) + " / " + frames.length + "</figcaption></figure>").join("") + "</div>";
      document.documentElement.classList.add("print-sm");
      const done = () => { document.documentElement.classList.remove("print-sm"); window.removeEventListener("afterprint", done); };
      window.addEventListener("afterprint", done);
      window.print();
    });
    return () => player.stop();
  }

  /* ---------- Öğrenci: çöz ---------- */
  async function renderSolve(view, id) {
    const rec = await getMeta("sm:s:" + id);
    if (!rec) { view.innerHTML = '<div class="page">' + App.ui.empty("close", T("Ödev bulunamadı", "Assignment not found"), T("Ödev QR'ını yeniden okut.", "Scan the assignment QR again.")) + "</div>"; return; }
    const a = rec.data;
    App.setTitle(a.ti);
    if (rec.result) return renderResult(view, rec);
    const CONF = (App.metacognition && App.metacognition.CONFIDENCE) || [25, 50, 75, 100];
    const draft = rec.draft || { r: a.q.map(() => -1), c: a.q.map(() => 0), start: Date.now() };
    const save = App.utils.debounce(() => { rec.draft = draft; App.db.put("meta", rec); }, 400);
    view.innerHTML = '<div class="page page--narrow sm">' + back("#/sinif-modu", T("Sınıf Modu", "Class Mode")) +
      head(a.ti, a.q.length + T(" soru", " questions") + (a.m ? " · " + a.m + T(" dk", " min") : ""), a.m ? '<span class="sm-timer" id="smTimer" aria-live="off"></span>' : "") +
      '<label class="field sm-sid"><span class="field__label">' + esc(T("Öğrenci numaran ya da adın (öğretmenin tanıyacağı biçimde)", "Your student number or name (as your teacher knows you)")) + "</span>" +
        '<input class="input" id="smSid" maxlength="40" autocomplete="off" value="' + esc(App.prefs.get("smStudentId", "")) + '"></label>' +
      '<ol class="sm-solve">' + a.q.map((q, i) =>
        '<li class="card sm-sq" data-i="' + i + '"><div class="sm-sq__q md">' + App.markdown.render(q.q) + "</div>" +
          '<div class="sm-opts" role="radiogroup">' + q.o.map((o, j) => '<label class="sm-opt"><input type="radio" name="q' + i + '" value="' + j + '"' + (draft.r[i] === j ? " checked" : "") + '><span class="sm-opt__l">' + LETTERS[j] + '</span><span class="md">' +
            App.markdown.render(o).replace(/^<p>|<\/p>$/g, "") + "</span></label>").join("") + "</div>" +
          '<div class="sm-conf"><span>' + esc(T("Ne kadar eminsin?", "How sure are you?")) + "</span>" + CONF.map((c) =>
            '<label><input type="radio" name="c' + i + '" value="' + c + '"' + (draft.c[i] === c ? " checked" : "") + "><span>%" + c + "</span></label>").join("") + "</div></li>").join("") + "</ol>" +
      '<div class="form-actions"><button class="btn btn--primary" type="button" id="smSubmit">' + App.icon("check") + esc(T("Bitir ve sonuç QR'ını oluştur", "Finish and create result QR")) + "</button></div></div>";
    App.hydrateIcons(view);
    view.addEventListener("change", (e) => {
      const li = e.target.closest("[data-i]"); if (!li) return;
      const i = Number(li.dataset.i);
      if (e.target.name === "q" + i) draft.r[i] = Number(e.target.value);
      if (e.target.name === "c" + i) draft.c[i] = Number(e.target.value);
      save();
    });
    let tm = null;
    if (a.m) {
      const el = view.querySelector("#smTimer");
      const tickT = () => {
        const left = Math.max(0, a.m * 60 - Math.round((Date.now() - draft.start) / 1000));
        el.textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0");
        el.classList.toggle("is-low", left < 60);
        if (!left) { clearInterval(tm); App.ui.toast(T("Süre doldu; cevapların gönderiliyor.", "Time is up; submitting.")); submit(true); }
      };
      tickT(); tm = setInterval(tickT, 1000);
    }
    async function submit(force) {
      const sid = view.querySelector("#smSid").value.trim();
      if (!sid) { App.ui.toast(T("Önce numaranı ya da adını yaz.", "Enter your number or name first."), "error"); view.querySelector("#smSid").focus(); return; }
      const blanks = draft.r.filter((x) => x < 0).length;
      if (!force && blanks && !(await App.ui.confirm(T(blanks + " soru boş. Yine de bitirilsin mi?", blanks + " questions are blank. Finish anyway?"), T("Bitir", "Finish")))) return;
      clearInterval(tm);
      App.prefs.set("smStudentId", sid);
      const s = score(a, draft.r);
      const result = { v: 1, t: "r", a: a.id, h: rec.digest, s: sid, at: new Date().toISOString(), du: Math.round((Date.now() - draft.start) / 1000), r: draft.r.slice(), c: draft.c.slice(), sc: s.sc };
      rec.result = Object.assign({ pct: s.pct, correct: s.correct, total: s.total }, { data: result });
      delete rec.draft;
      await App.db.put("meta", rec);
      await saveLearning(a, draft, rec);
      renderResult(view, rec);
    }
    view.querySelector("#smSubmit").addEventListener("click", () => submit(false));
    return () => clearInterval(tm);
  }

  /** Sonucu öğrencinin kendi öğrenme kayıtlarına işle: kazanım başına test + yanlış defteri */
  async function saveLearning(a, draft, rec) {
    const date = new Date().toISOString();
    for (let k = 0; k < a.ks.length; k++) {
      const key = a.ks[k], idx = a.q.map((q, i) => (q.k === k ? i : -1)).filter((i) => i >= 0);
      if (!idx.length || !App.lessons.find(key)) continue;
      const qs = idx.map((i) => Object.assign({ q: a.q[i].q, options: a.q[i].o, answer: a.q[i].a, difficulty: a.q[i].d || 2, explain: a.q[i].e || "", chosen: draft.r[i] },
        draft.c[i] ? { observation: { confidence: draft.c[i] } } : {}));
      const correct = qs.filter((q) => q.chosen === q.answer).length, empty = qs.filter((q) => q.chosen < 0).length;
      await App.db.put("quizzes", { id: "sm-" + a.id + "-" + k, key, label: a.ti, date, total: qs.length, correct, wrong: qs.length - correct - empty, empty, source: "sinif", model: "", questions: qs });
      if (App.mistakes) for (const q of qs) if (q.chosen >= 0 && q.chosen !== q.answer)
        await App.mistakes.add({ source: "quiz", key, label: a.ti + " · " + outcomeLabel(key), q: q.q, options: q.options, answer: q.answer, chosen: q.chosen, explain: q.explain });
    }
  }

  async function renderResult(view, rec) {
    const a = rec.data, res = rec.result;
    const frames = await pack(res.data);
    view.innerHTML = '<div class="page page--narrow sm">' + back("#/sinif-modu", T("Sınıf Modu", "Class Mode")) +
      head(a.ti, T("Sonucun hazır: QR'ı öğretmenine göster.", "Your result is ready: show the QR to your teacher.")) +
      '<div class="sm-grid"><section class="card sm-share"><h2>' + esc(T("Sonuç QR'ı", "Result QR")) + ' · <span class="sm-sidv">' + esc(res.data.s) + "</span></h2><div id=\"smPlayer\"></div></section>" +
      '<section class="card"><h2>' + esc(T("Puanın", "Your score")) + ' <span class="sm-big">%' + res.pct + "</span></h2>" +
        '<ul class="sm-scores">' + a.ks.map((k, i) => { const p = pctOf(res.data.sc[i]); return '<li><span>' + esc(outcomeCode(k, i) + " · " + outcomeLabel(k)) + '</span><span class="sm-bar"><i style="width:' + (p || 0) + '%"></i></span><b>' + (p == null ? "–" : "%" + p) + "</b></li>"; }).join("") + "</ul>" +
        '<p class="hint">' + esc(T("Yanlışların yanlış defterine, sonuçların tekrar listene eklendi.", "Wrong answers were added to your mistake notebook and review list.")) + "</p>" +
        '<a class="btn btn--sm" href="#/tekrar">' + App.icon("refresh") + esc(T("Bugünkü tekrarlar", "Today's reviews")) + "</a></section></div>" +
      (a.fb ? '<h2 class="sm-h">' + esc(T("Cevap anahtarı", "Answer key")) + '</h2><ol class="sm-solve">' + a.q.map((q, i) => {
        const ch = res.data.r[i];
        return '<li class="card sm-sq ' + (ch === q.a ? "is-right" : "is-wrong") + '"><div class="sm-sq__q md">' + App.markdown.render(q.q) + "</div>" +
          '<p><b>' + esc(T("Doğru: ", "Correct: ")) + LETTERS[q.a] + ") </b>" + App.markdown.render(q.o[q.a]).replace(/^<p>|<\/p>$/g, "") +
          (ch !== q.a ? ' · <span class="sm-yours">' + esc(T("Senin: ", "Yours: ")) + (ch < 0 ? T("boş", "blank") : LETTERS[ch]) + "</span>" : "") + "</p>" +
          (q.e ? '<div class="hint md">' + App.markdown.render(q.e) + "</div>" : "") + "</li>";
      }).join("") + "</ol>" : "") + "</div>";
    App.hydrateIcons(view);
    const player = await mountPlayer(view.querySelector("#smPlayer"), frames);
    return () => player.stop();
  }

  async function render(view, p) {
    if (p[0] === "yeni") return renderNew(view);
    if (p[0] === "odev" && p[1]) return renderAssignment(view, p[1]);
    if (p[0] === "coz" && p[1]) return renderSolve(view, p[1]);
    return renderHome(view);
  }

  App.router.register("sinif-modu", render);
  App.sinifModu = { pack, unpack, frame, collector, validate, score, parseManual, pickBalanced, encodeBody, decodeBody, fnv, PREFIX, CHUNK, scan, mountPlayer, fromSaved, fromAI };
})();
