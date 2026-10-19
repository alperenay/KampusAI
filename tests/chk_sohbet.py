exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); ctx, pg = newctx(b, True, 390, 844)
    cons=[]; pg.on("console", lambda m: cons.append(m.text) if m.type=="error" else None)
    go(pg, "#/sohbet", 1200); print("hash", pg.evaluate("() => location.hash"), "console", cons, "errs", errs)
finally:
  for pr in procs: pr.terminate()
