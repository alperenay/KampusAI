exec(open("hdr.py").read())
with sync_playwright() as p:
  b = p.chromium.launch()
  ctx, pg = newctx(b, False, 1366, 860)
  go(pg, "#/yazili", 1500)
  keys = pg.evaluate("async () => Object.keys(await App.yazili.loadIndex())")
  bad = []
  for k in keys:
    for ex in pg.evaluate("async (k) => (await App.yazili.loadSet(k)).exams.map(e => e.id)", k):
      go(pg, "#/yazili/%s/%s/anahtar" % (k, ex), 900)
      r = pg.evaluate("() => ({ err: Array.from(document.querySelectorAll('.katex-error')).map(e => e.textContent.slice(0, 80)), dollars: Array.from(document.querySelectorAll('.yz-q')).map(q => q.innerText).filter(t => /\\$[^$\\n]{1,40}\\$/.test(t) || /\\\\(frac|sqrt|text|cdot)/.test(t)).map(t => t.slice(0, 100)), n: document.querySelectorAll('.yz-q').length })")
      if r["err"] or r["dollars"] or r["n"] != 7: bad.append((k, ex, r))
  print("set", len(keys)); print("\n".join(map(str, bad)) or "temiz"); print("errs", errs)
  b.close()
for pr in procs: pr.terminate()
