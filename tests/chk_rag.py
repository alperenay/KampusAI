exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); ctx, pg = newctx(b, False, 1280, 800)
    print(pg.evaluate("async () => { if (!App.rag || !App.rag.buildChunks) return Object.keys(App.rag || {}); const cs = await App.rag.buildChunks(); const k = {}; cs.forEach(c => k[c.kind] = (k[c.kind]||0)+1); return k; }"))
finally:
  for pr in procs: pr.terminate()
