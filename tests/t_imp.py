exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = newctx(b, False, 1280, 900)
    pg.evaluate("""() => { App.ai.generate = async (o) => { window.__req = o; return { model: 'test', data: { type: 'TYT', name: 'Özdebir TYT-3', date: '2026-10-11', subjects: { 'Türkçe': {d: 31, y: 5}, sosyal: {d: 14, y: 4}, matematik: {d: 22, y: 8}, fen: {d: 12, y: 30} },
      topics: [{subject:'matematik', topic:'Türev', wrong: 3, blank: 1}, {subject:'turkce', topic:'Paragrafta anlam', wrong: 2}, {subject:'fen', topic:'Hücre zarından madde geçişi', wrong: 1}], confidence: 'yüksek', notes: '' } }; }; }""")
    go(pg, "#/denemeler/yeni/tyt", 800)
    pg.set_input_files("#exImpFile", ["note_390.png"]); pg.wait_for_timeout(1500)
    vals = pg.evaluate("() => ['turkce','sosyal','matematik','fen'].map(s => [document.querySelector('[name=d_'+s+']').value, document.querySelector('[name=y_'+s+']').value])")
    print("vals", vals, pg.evaluate("() => document.querySelector('[name=name]').value"), pg.evaluate("() => document.querySelector('[name=date]').value"))
    print(pg.locator("#exImpOut").inner_text())
    print("images", pg.evaluate("() => window.__req.images.length"))
    pg.screenshot(path="imp.png", full_page=True)
    pg.click("#saveBtn"); pg.wait_for_timeout(1200)
    print(pg.evaluate("async () => (await App.db.getAll('exams')).map(e => [e.name, e.source, (e.topics||[]).length])"))
    pg.screenshot(path="imp_dash.png", full_page=True)
    print(pg.locator(".ex-topics").inner_text() if pg.locator(".ex-topics").count() else "no topics card")
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
