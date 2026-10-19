exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for m,w,h in ((True,390,844),(False,1366,860)):
      ctx, pg = newctx(b, m, w, h)
      go(pg, "#/kontrol", 900)
      pg.evaluate("() => { App.ai.generate = async (o) => { window.__req = o; return { model: 't', data: { steps: [{text: '$x^2-4=0$', status: 'ok'}, {text: '$x=2$', status: 'wrong', note: '-2 unutuldu'}], firstWrong: 2, verdict: 'wrong', summary: 'ok' } }; }; }")
      pg.click("#chkDraw"); pg.wait_for_timeout(500)
      box = pg.locator(".dp__cv").bounding_box()
      x0, y0 = box["x"] + 30, box["y"] + 40
      for row in range(3):
        pg.mouse.move(x0, y0 + row * 50); pg.mouse.down()
        for i in range(20): pg.mouse.move(x0 + i * 9, y0 + row * 50 + (8 if i % 2 else -8))
        pg.mouse.up()
      pg.wait_for_timeout(200)
      pg.screenshot(path="dp_%d.png" % w)
      n = pg.evaluate("() => App.drawpad._last.strokes().length")
      pg.click('[data-act="undo"]'); n2 = pg.evaluate("() => App.drawpad._last.strokes().length")
      pg.click('[data-act="redo"]')
      print(w, "strokes", n, n2)
      pg.click('[data-act="done"]'); pg.wait_for_timeout(800)
      print("prev", pg.locator("#chkPrev").is_visible(), pg.evaluate("() => !document.querySelector('#chkGo').disabled"), pg.locator(".dp").count())
      pg.click("#chkGo"); pg.wait_for_timeout(1500)
      print("req images", pg.evaluate("() => window.__req && window.__req.images.length"))
      pg.screenshot(path="dp_after_%d.png" % w, full_page=True)
    b.close()
finally:
    for pr in procs: pr.terminate()
print(errs)
