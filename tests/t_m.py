exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = newctx(b, False, 1280, 900)
    print(pg.evaluate("""() => { const C = App.data.curriculum; const g = C.grades[0], s = g.subjects[0], u = s.units[0], o = u.outcomes[0]; return [Object.keys(u), Object.keys(o), typeof C.key, ['Türev','Paragrafta anlam','Hücre zarından madde geçişi','Limit ve süreklilik','Fiilimsiler'].map(App.exams.matchTopic)]; }"""))
    print(pg.evaluate("""() => { const C = App.data.curriculum; const out=[]; C.grades.forEach(g=>g.subjects.forEach(s=>s.units.forEach(u=>u.outcomes.forEach(o=>{ const t=App.L(o.title); if(/türev|paragraf|hücre zar/i.test(t)) out.push(t);})))); return out.slice(0,10); }"""))
    b.close()
finally:
    for pr in procs: pr.terminate()
