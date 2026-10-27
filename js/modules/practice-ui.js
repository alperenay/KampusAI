(function () {
  const { esc } = App.utils, E = App.practice, B = App.practiceBank;
  const T = (tr, en) => App.i18n.lang === "en" ? en : tr, L = (s) => typeof s === "string" ? s : T(s.tr, s.en);
  const route = (mode) => mode === "transfer" ? "aktarim" : "hata-avcisi";
  const name = (mode) => mode === "transfer" ? T("Bilgiyi Başka Yerde Kullan", "Apply It Elsewhere") : T("Çözümdeki Hatayı Bul", "Find the Solution Error");
  const contexts = { symbol: ["Denklem", "Equation"], visual: ["Grafik / tablo", "Graph / table"], life: ["Günlük yaşam", "Everyday context"] };
  const ctx = (k) => contexts[k] ? T.apply(null, contexts[k]) : T("Hata analizi", "Error analysis");
  const header = (mode, back) => '<div class="page-head"><div>' + (back ? '<a class="pr-back" href="#/' + route(mode) + '">← ' + esc(name(mode)) + '</a>' : '') + '<h1>' + esc(name(mode)) + '</h1><p>' + esc(mode === "transfer" ? T("Aynı kavramı denklem, görsel veri ve yaşam problemiyle uygula.", "Apply one concept to equations, visual data and everyday problems.") : T("Kasıtlı hata içeren örnek çözümde ilk yanlış adımı bul ve nedenini seç.", "Find the first incorrect step in an intentionally flawed example and select its reason.")) + '</p></div></div>';
  function visual(q) {
    if (q.table) { const rows = q.table.map(L); return '<div class="pr-table"><table><caption>' + esc(T("Sorunun verileri", "Question data")) + '</caption><thead><tr>' + rows[0].map((v) => '<th scope="col">' + esc(v) + '</th>').join('') + '</tr></thead><tbody>' + rows.slice(1).map((r) => '<tr>' + r.map((v) => '<td>' + esc(v) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>'; }
    if (!q.plot) return '';
    const axes = L(q.axes), maxX = Math.max.apply(null, q.plot.map((p) => p[0])), maxY = Math.max.apply(null, q.plot.map((p) => p[1]));
    const x = (v) => 58 + v / maxX * 280, y = (v) => 200 - v / maxY * 150;
    return '<figure class="pr-plot"><svg viewBox="0 0 400 260" role="img" aria-label="' + esc(T("Veri grafiği; eşdeğer tablo hemen altında.", "Data plot; an equivalent table follows.")) + '"><path d="M58 30V200H355" fill="none" stroke="currentColor"/>' +
      '<polyline points="' + q.plot.map((p) => x(p[0]) + ',' + y(p[1])).join(' ') + '" fill="none" stroke="var(--accent-text)" stroke-width="3"/>' + q.plot.map((p) => '<circle cx="' + x(p[0]) + '" cy="' + y(p[1]) + '" r="4" fill="currentColor"/><text x="' + x(p[0]) + '" y="220" text-anchor="middle">' + p[0] + '</text><text x="45" y="' + (y(p[1]) + 5) + '" text-anchor="end">' + p[1] + '</text>').join('') + '<text x="200" y="250" text-anchor="middle">' + esc(axes[0]) + '</text><text x="60" y="22">' + esc(axes[1]) + '</text></svg><details><summary>' + esc(T("Grafiği tablo olarak oku", "Read the graph as a table")) + '</summary><table><thead><tr><th scope="col">' + esc(axes[0]) + '</th><th scope="col">' + esc(axes[1]) + '</th></tr></thead><tbody>' + q.plot.map((p) => '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td></tr>').join('') + '</tbody></table></details></figure>';
  }
  async function render(mode, view, p) {
    App.setTitle(name(mode));
    const base = route(mode), alive = () => App.router.current().name === base && document.contains(body);
    view.innerHTML = '<div class="page pr-page">' + header(mode, !!p[0]) + '<div id="prBody" aria-live="polite"></div></div>';
    const body = view.querySelector('#prBody');
    function error(text) { let box = body.querySelector('.pr-error'); if (!box) { box = document.createElement('p'); box.className = 'pr-error'; box.setAttribute('role', 'alert'); body.appendChild(box); } box.textContent = text; }
    if (p[0] !== 'calis') {
      const history = await E.history(mode); if (!alive()) return;
      const topics = mode === 'transfer' ? B.families.map((f) => ({ id: f.id, title: L(f.title), sub: L(f.subject) })) : ['all', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji'].map((id, i) => ({ id, title: T(['Karışık pratik', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji'][i], ['Mixed practice', 'Mathematics', 'Physics', 'Chemistry', 'Biology'][i]), sub: T('3 örnek çözüm', '3 example solutions') }));
      body.innerHTML = '<section class="pr-intro card"><b>' + esc(T("Çevrimdışı · 3 görev · Kendi hızında", "Offline · 3 tasks · At your pace")) + '</b><ol><li>' + esc(mode === 'transfer' ? T('Bir kavram seç ve üç farklı bağlamda yanıtla.', 'Choose a concept and answer in three contexts.') : T('Bir ders seç; ilk yanlış adımı ve açıklamasını işaretle.', 'Choose a subject, the first incorrect step and its reason.')) + '</li><li>' + esc(T('Her yanıttan sonra açıklamayı incele.', 'Read the explanation after each answer.')) + '</li><li>' + esc(T('Sonuçlarını bağlam veya hata türüne göre gör.', 'Review your results by context or error type.')) + '</li></ol><p class="hint">' + esc(T('Bu üç alıştırma pratik içindir. Sonuçlar yalnız bu çalışmayı gösterir; genel test puanını değiştirmez.', 'These three exercises are for practice. Results describe this activity and do not change your general test score.')) + '</p></section><div class="pr-grid">' + topics.map((f) => '<section class="card pr-topic"><span class="pr-eyebrow">' + esc(f.sub) + '</span><h2>' + esc(f.title) + '</h2><a class="btn btn--primary" href="#/' + base + '/calis/' + encodeURIComponent(f.id) + '">' + esc(T('Başla / devam et', 'Start / resume')) + '</a></section>').join('') + '</div><section class="card pr-history"><h2>' + esc(T('Son çalışmaların', 'Recent practice')) + '</h2>' + (history.length ? history.slice(0, 8).map((r) => '<p><b>' + esc(new Date(r.at).toLocaleDateString(App.i18n.locale)) + '</b> · ' + esc(mode === 'transfer' ? L(B.families.find((f) => f.id === r.topic).title) : topics.find((f) => f.id === r.topic).title) + ' · ' + r.metrics.complete + '/' + r.metrics.total + ' ' + esc(T('tam doğru', 'fully correct')) + '</p>').join('') : '<p>' + esc(T('Henüz çalışma yok. Yukarıdan bir alan seçerek ilk üç görevi tamamla.', 'No practice yet. Choose a topic above to complete your first three tasks.')) + '</p>') + '</section>';
      return;
    }
    let s;
    try { const topic = decodeURIComponent(p[1] || ''); E.items(mode, topic); s = await E.load(mode, topic) || E.create(mode, topic); await E.save(s); }
    catch (e) { if (alive()) { error(T('Bu çalışma açılamadı. Ana listeye dönerek yeniden deneyebilirsin.', 'This practice could not be opened. Return to the list and retry.')); } return; }
    if (!alive()) return;
    let busy = false, started = Date.now();
    async function result() {
      if (busy) return; busy = true;
      try {
        const r = await E.finish(s); if (!alive()) return;
        body.innerHTML = '<section class="card pr-result"><span class="pr-eyebrow">' + esc(T('Çalışma tamamlandı', 'Practice completed')) + '</span><h2>' + r.metrics.complete + '/3 ' + esc(T('tam doğru', 'fully correct')) + '</h2><p>' + esc(T('Bu sonuç üç alıştırmadaki ilk yanıtlarına aittir. Tüm konuyu öğrendiğin anlamına gelmez.', 'This describes your first responses to these three exercises. It does not mean you have mastered the whole topic.')) + '</p><ul>' + r.metrics.rows.map((x, i) => '<li><b>' + esc(mode === 'transfer' ? ctx(x.context) : L(E.question(s, i).title)) + '</b>: ' + esc(x.complete ? T('Doğru', 'Correct') : T('Tekrar çalış', 'Review')) + '</li>').join('') + '</ul>' + (mode === 'error' ? '<p>' + esc(T('İlk hata: ', 'First error: ')) + r.metrics.correct + '/3 · ' + esc(T('Gerekçe: ', 'Reason: ')) + r.metrics.reasonCorrect + '/3</p>' : '') + '<div class="pr-actions"><a class="btn btn--primary" href="#/' + base + '">' + esc(T('Yeni çalışma seç', 'Choose new practice')) + '</a><a class="btn btn--ghost" href="#/konular">' + esc(T('Konu anlatımlarına git', 'Go to lessons')) + '</a></div></section>';
        body.querySelector('h2').tabIndex = -1; body.querySelector('h2').focus({ preventScroll: true });
      } catch (e) { if (alive()) { error(T('Sonuç kaydedilemedi. Yeniden dene; aynı çalışma iki kez sayılmaz.', 'Could not save the result. Retry; the session will not be counted twice.')); const retry = document.createElement('button'); retry.className = 'btn'; retry.textContent = T('Kaydetmeyi yeniden dene', 'Retry saving'); retry.onclick = () => { retry.remove(); result(); }; body.appendChild(retry); } }
      finally { busy = false; }
    }
    function draw() {
      if (!alive()) return;
      if (s.responses.length === 3) { result(); return; }
      const i = s.responses.length, q = E.question(s, i); started = Date.now();
      body.innerHTML = '<section class="card pr-question"><div class="pr-progress"><span>' + (i + 1) + '/3 · ' + esc(mode === 'transfer' ? ctx(q.context) : L(q.title)) + '</span><progress max="3" value="' + i + '" aria-label="' + esc(T('Tamamlanan görev', 'Completed tasks')) + '"></progress></div><form id="prForm"><fieldset><legend>' + esc(mode === 'transfer' ? L(q.q) : T('İlk hatalı adım hangisi?', 'Which is the first incorrect step?')) + '</legend>' + (mode === 'transfer' ? visual(q) : '<p class="hint">' + esc(T('Bu çözüm öğrenme amacıyla kasıtlı olarak hatalı yazılmıştır; canlı AI yanıtı değildir.', 'This intentionally flawed authored example is not a live AI response.')) + '</p>') + (mode === 'transfer' ? E.order(s, q, q.options.length) : q.steps.map((_, n) => n)).map((n) => '<label class="pr-option"><input type="radio" name="choice" value="' + n + '" required><span>' + (mode === 'transfer' ? esc(q.options[n] + (q.unit ? ' ' + q.unit : '')) : '<b>' + (n + 1) + '.</b> ' + esc(L(q.steps[n]))) + '</span></label>').join('') + '</fieldset>' + (mode === 'error' ? '<fieldset><legend>' + esc(T('Hatanın nedeni nedir?', 'What causes the error?')) + '</legend>' + E.order(s, q, q.reasons.length).map((n) => '<label class="pr-option"><input type="radio" name="reason" value="' + n + '" required><span>' + esc(L(q.reasons[n])) + '</span></label>').join('') + '</fieldset>' : '') + '<button class="btn btn--primary pr-submit" type="submit">' + esc(T('Yanıtımı kontrol et', 'Check my answer')) + '</button></form><div class="pr-feedback" role="status" hidden></div></section>';
      const form = body.querySelector('#prForm');
      const legend = form.querySelector('legend');
      legend.tabIndex = -1;
      legend.focus({ preventScroll: true });
      form.scrollIntoView({ block: 'start', behavior: 'auto' });
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); if (busy || !form.reportValidity()) return;
        busy = true; const btn = form.querySelector('.pr-submit'); btn.disabled = true;
        try {
          const choice = Number(form.querySelector('[name="choice"]:checked').value), reason = mode === 'error' ? Number(form.querySelector('[name="reason"]:checked').value) : null;
          const next = E.answer(s, choice, reason, Date.now() - started); await E.save(next); s = next;
          if (!alive()) return;
          form.querySelectorAll('input,button').forEach((x) => { x.disabled = true; });
          const m = E.summary(s).rows[i], fb = body.querySelector('.pr-feedback'); fb.hidden = false;
          fb.innerHTML = '<h3 tabindex="-1">' + esc(m.complete ? T('Doğru!', 'Correct!') : T('Birlikte inceleyelim', 'Let’s review')) + '</h3><p>' + esc(L(mode === 'transfer' ? q.why : q.fix)) + '</p>' + (mode === 'error' ? '<p><b>' + esc(T('İlk hatalı adım: ', 'First incorrect step: ')) + (q.bad + 1) + '</b> · ' + esc(L(q.reasons[q.reason])) + '</p>' : '') + '<button class="btn btn--primary" type="button" id="prNext">' + esc(i === 2 ? T('Sonuçları gör', 'View results') : T('Sonraki görev', 'Next task')) + '</button>';
          fb.querySelector('h3').focus(); fb.querySelector('#prNext').onclick = () => draw();
        } catch (e2) { if (alive()) { error(T('Yanıt kaydedilemedi. Seçimlerini koruduk; yeniden deneyebilirsin.', 'Could not save your answer. Your selections are kept; retry.')); btn.disabled = false; } }
        finally { busy = false; }
      });
    }
    draw();
  }
  App.router.register("aktarim", (v, p) => render('transfer', v, p));
  App.router.register("hata-avcisi", (v, p) => render('error', v, p));
})();
