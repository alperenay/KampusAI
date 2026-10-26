/* research-ui.js — çevrimdışı deney oluşturma/katılma, QR-kod-dosya aktarımı ve özet. */
(function () {
  const { esc, downloadText } = App.utils;
  const t = App.t, R = () => App.research;
  let epoch = 0;
  function error(e) { App.ui.toast(e.message || String(e), "error"); }
  async function transfer(payload) {
    const frames = R().pack(payload);
    const m = App.ui.modal({ title: t("research.transfer"), body:
      '<p class="hint">' + esc(t("research.transferNote")) + '</p><div class="research-qr" id="researchQr"></div>' +
      '<div class="research-controls"><button class="btn" id="rPrev" type="button">' + esc(t("research.previous")) + '</button><span id="rFrame" role="status"></span><button class="btn" id="rNext" type="button">' + esc(t("research.next")) + '</button></div>' +
      '<label class="field"><span>' + esc(t("research.allCodes")) + '</span><textarea class="input research-code" id="rCodes" readonly rows="3"></textarea></label>',
      actions: '<button class="btn" type="button" id="rDownload">' + esc(t("research.download")) + '</button><button class="btn btn--ghost" type="button" data-close>' + esc(t("close")) + '</button>' });
    let index = 0, revision = 0;
    m.el.querySelector("#rCodes").value = frames.join("\n");
    async function show() {
      const rev = ++revision, el = m.el.querySelector("#researchQr");
      m.el.querySelector("#rPrev").disabled = index === 0;
      m.el.querySelector("#rNext").disabled = index === frames.length - 1;
      m.el.querySelector("#rFrame").textContent = (index + 1) + "/" + frames.length;
      // Çizimi kopuk öğede hazırla; hızlı ileri/geri tıklamaları eski kareyi gösteremez.
      const holder = document.createElement("div");
      try { await App.pairing.renderQR(holder, frames[index]); if (rev === revision && el.isConnected) el.innerHTML = holder.innerHTML; }
      catch (e) { if (rev === revision && el.isConnected) el.textContent = t("research.qrFallback"); }
    }
    m.el.querySelector("#rPrev").onclick = () => { if (index > 0) { index--; show(); } };
    m.el.querySelector("#rNext").onclick = () => { if (index < frames.length - 1) { index++; show(); } };
    m.el.querySelector("#rDownload").onclick = () => downloadText("kampusai-research-" + payload.type + ".json", JSON.stringify({ v: 1, frames }));
    show();
  }
  async function importText(text) {
    if (typeof text !== "string" || text.length > 150000) throw new Error(t("research.error.size"));
    let frames;
    if (text.trim().startsWith("{")) {
      const file = JSON.parse(text);
      if (!file || file.v !== 1 || !Array.isArray(file.frames)) throw new Error(t("research.error.packet"));
      frames = file.frames;
    } else frames = text.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
    if (!frames.length || frames.length > 200 || frames.some((f) => !R().frame(f))) throw new Error(t("research.error.packet"));
    let result;
    for (const frame of frames) result = await R().receive(frame);
    return result;
  }
  function importDialog(done) {
    const m = App.ui.modal({ title: t("research.import"), body:
      '<p class="hint">' + esc(t("research.importNote")) + '</p><textarea class="input research-code" id="rImportText" rows="5" maxlength="150000" aria-label="' + esc(t("research.allCodes")) + '"></textarea>' +
      '<label class="field"><span>' + esc(t("research.file")) + '</span><input type="file" id="rImportFile" accept=".json,application/json,text/plain"></label>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" id="rImportGo" type="button">' + esc(t("research.import")) + '</button>' });
    m.el.querySelector("#rImportGo").onclick = async () => {
      const b = m.el.querySelector("#rImportGo"); b.disabled = true;
      try {
        const file = m.el.querySelector("#rImportFile").files[0];
        if (file && file.size > 150000) throw new Error(t("research.error.size"));
        const result = await importText(file ? await file.text() : m.el.querySelector("#rImportText").value);
        App.ui.toast(result.kind === "partial" ? t("research.partial", { n: result.received, total: result.total }) : t("research.imported"));
        m.close(); done();
      } catch (e) { error(e); } finally { b.disabled = false; }
    };
  }
  function createDialog(done) {
    const all = App.learnmap.allOutcomes().filter((x) => x.outcome.content);
    const m = App.ui.modal({ title: t("research.create"), body:
      '<div class="research-form"><label class="field"><span>' + esc(t("research.titleField")) + '</span><input class="input" id="rTitle" maxlength="100"></label>' +
      '<label class="field"><span>' + esc(t("research.topic")) + '</span><select class="select" id="rTopic">' + all.map((it) => '<option value="' + esc(it.key) + '">' + esc(it.grade.id + " · " + App.L(it.subject.name) + " · " + App.L(it.outcome.title)) + '</option>').join("") + '</select></label>' +
      '<label class="field"><span>' + esc(t("research.variable")) + '</span><select class="select" id="rVariable"><option value="hints">' + esc(t("research.variable.hints")) + '</option><option value="adaptive">' + esc(t("research.variable.adaptive")) + '</option></select></label>' +
      '<p class="hint">' + esc(t("research.controlsNote")) + '</p><button class="btn" type="button" id="rGenerate">' + App.icon("sparkle") + esc(t("research.generate")) + '</button>' +
      '<label class="field"><span>' + esc(t("research.bank")) + '</span><textarea class="input research-code" id="rBank" rows="7" maxlength="100000"></textarea></label>' +
      '<label class="meta-reason"><input type="checkbox" id="rReviewed"><span>' + esc(t("research.reviewed")) + '</span></label><p id="rCreateStatus" class="hint" role="status"></p></div>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" type="button" id="rCreateGo">' + esc(t("research.create")) + '</button>',
      onClose: () => ctrl.abort() });
    const ctrl = new AbortController();
    const q = (s) => m.el.querySelector(s);
    q("#rGenerate").onclick = async () => {
      const found = App.lessons.find(q("#rTopic").value);
      q("#rGenerate").disabled = true; q("#rCreateGo").disabled = true; q("#rCreateStatus").textContent = t("research.generating");
      try {
        const result = await App.quiz.generatePool(found.grade, found.subject, found.unit, found.outcome, { temperature: 0.5, signal: ctrl.signal });
        if (!m.el.isConnected) return;
        q("#rBank").value = JSON.stringify({ questions: App.quiz.normalize(result.data, true) }, null, 2);
        q("#rReviewed").checked = false;
        q("#rCreateStatus").textContent = t("research.generated");
      } catch (e) { if (m.el.isConnected) { error(e); q("#rCreateStatus").textContent = e.message; } }
      finally { if (m.el.isConnected) { q("#rGenerate").disabled = false; q("#rCreateGo").disabled = false; } }
    };
    q("#rBank").oninput = () => { q("#rReviewed").checked = false; };
    q("#rTopic").onchange = () => { q("#rBank").value = ""; q("#rReviewed").checked = false; };
    q("#rCreateGo").onclick = async () => {
      q("#rCreateGo").disabled = true;
      try {
        const data = JSON.parse(q("#rBank").value);
        const session = await R().create({ title: q("#rTitle").value.trim(), key: q("#rTopic").value,
          variable: q("#rVariable").value, reviewed: q("#rReviewed").checked, bank: data.questions || data });
        m.close(); done(); transfer({ type: "session", data: session });
      } catch (e) { error(e); } finally { if (m.el.isConnected) q("#rCreateGo").disabled = false; }
    };
  }
  async function render(view) {
    const mine = ++epoch, rows = await App.db.getAll("research");
    if (mine !== epoch || App.router.current().name !== "arastirma") return;
    App.setTitle(t("research.title"));
    const sessions = rows.filter((r) => r.kind === "session");
    const percent = (n) => n === null ? "—" : Math.round(n * 100) + "%";
    view.innerHTML = '<div class="page research-page"><div class="page-head"><div><h1>' + esc(t("research.title")) + '</h1><p>' + esc(t("research.intro")) + '</p></div><a class="btn" href="#/sinif">' + esc(t("research.classroom")) + '</a></div>' +
      '<div class="research-controls"><button class="btn btn--primary" id="rCreate" type="button">' + esc(t("research.create")) + '</button><button class="btn" id="rImport" type="button">' + esc(t("research.import")) + '</button>' +
      '<button class="btn" id="rScan" type="button">' + App.icon("scan") + esc(t("research.scan")) + '</button><button class="btn btn--ghost" id="rExport" type="button">' + esc(t("research.export")) + '</button>' +
      (rows.length ? '<button class="btn btn--ghost" id="rClear" type="button">' + esc(t("research.clear")) + '</button>' : '') + '</div><p class="hint">' + esc(t("research.privacy")) + '</p><div class="research-sessions">' +
      (!sessions.length ? '<section class="card research-session"><p>' + esc(t("research.empty")) + '</p></section>' : sessions.map((row) => {
        const s = row.session, c = R().compare(rows, s.id), resultRows = rows.filter((r) => r.kind === "result" && r.sessionId === s.id);
        return '<section class="card research-session" data-session="' + esc(s.id) + '"><h2>' + esc(s.title) + '</h2><p class="hint">' + esc(t("research.variable." + s.variable)) + ' · ' + esc(s.key) + '</p>' +
          '<div class="research-controls"><button class="btn" data-share="' + esc(s.id) + '" type="button">' + esc(t("research.shareSession")) + '</button><button class="btn" data-join="' + esc(s.id) + '" type="button">' + esc(t("research.join")) + '</button></div>' +
          '<div class="research-table-wrap"><table><caption>' + esc(t("research.comparison")) + '</caption><thead><tr><th>' + esc(t("research.group")) + '</th><th>n</th><th>' + esc(t("research.accuracy")) + '</th><th>' + esc(t("research.independent")) + '</th><th>' + esc(t("research.score")) + '</th></tr></thead><tbody>' +
          ["A", "B"].map((g) => '<tr><th>' + g + '</th><td>' + c[g].n + '</td><td>' + percent(c[g].accuracy) + '</td><td>' + percent(c[g].independent) + '</td><td>' + (c[g].score === null ? "—" : c[g].score.toFixed(1)) + '</td></tr>').join("") + '</tbody></table></div>' +
          '<p class="hint">' + esc(t("research.difference", { n: c.difference === null ? "—" : (c.difference * 100).toFixed(1) })) + '</p>' +
          resultRows.map((r) => '<details><summary>' + esc(r.participant + " · " + r.group) + '</summary>' + App.metacognition.summaryHtml(r.metrics) + '<button class="btn" data-result="' + esc(r.id) + '" type="button">' + esc(t("research.shareResult")) + '</button></details>').join("") + '</section>';
      }).join("")) + '</div></div>';
    App.hydrateIcons(view);
    const rerender = () => { if (mine === epoch) App.router.refresh(); };
    const onClick = async (e) => {
      const button = e.target.closest("button");
      if (!button || button.disabled) return;
      try {
        if (button.id === "rCreate") createDialog(rerender);
        else if (button.id === "rImport") importDialog(rerender);
        else if (button.id === "rScan") {
          const text = await App.pairing.scan((value) => R().frame(value) ? value : null, { title: t("research.scan"), hint: t("research.transferNote") });
          if (text) {
            const result = await R().receive(text);
            App.ui.toast(result.kind === "partial" ? t("research.partial", { n: result.received, total: result.total }) : t("research.imported")); rerender();
          }
        } else if (button.dataset.share) {
          const s = sessions.find((r) => r.session.id === button.dataset.share).session;
          await transfer({ type: "session", data: s });
        } else if (button.dataset.result) await transfer(R().resultPacket(rows.find((r) => r.id === button.dataset.result)));
        else if (button.dataset.join) {
          const sessionId = button.dataset.join;
          const m = App.ui.modal({ title: t("research.join"), body: '<label class="field"><span>' + esc(t("research.participant")) + '</span><input class="input" id="rParticipant" maxlength="48" value="' + R().newId() + '"></label><p class="hint">' + esc(t("research.participantNote")) + '</p>',
            actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" id="rJoinGo" type="button">' + esc(t("research.start")) + '</button>' });
          m.el.querySelector("#rJoinGo").onclick = async () => {
            const b = m.el.querySelector("#rJoinGo"); b.disabled = true;
            try {
              const joined = await R().join(sessionId, m.el.querySelector("#rParticipant").value.trim());
              const s = sessions.find((r) => r.session.id === sessionId).session;
              await R().context(joined.id, s.key);
              m.close(); App.router.go("test/" + s.key + "/arastirma/" + encodeURIComponent(joined.id));
            } catch (err) { error(err); } finally { b.disabled = false; }
          };
        } else if (button.id === "rExport") {
          const results = rows.filter((r) => r.kind === "result").map((r) => ({ sessionId: r.sessionId, participant: r.participant, group: r.group, metrics: r.metrics, data: R().resultPacket(r).data }));
          downloadText("kampusai-research-results.json", JSON.stringify({ v: 1, results }, null, 2));
        } else if (button.id === "rClear" && await App.ui.confirm(t("research.clearConfirm"), t("research.clear"), true)) {
          await App.db.clear("research"); rerender();
        }
      } catch (err) { error(err); }
    };
    view.addEventListener("click", onClick);
    return () => { epoch++; view.removeEventListener("click", onClick); };
  }
  App.router.register("arastirma", render);
  App.researchUi = { transfer, importText, createDialog };
})();
