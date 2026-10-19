exec(open("hdr.py").read())
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
    ctx, pg = newctx(b, False, 1366, 860)
    pg.on("pageerror", lambda e: print("PE", str(e)[:300]))
    pg.evaluate("""() => { App.speech.sttMode = () => 'web'; App.speech.listen = (o) => { window.__lis = o; return { stop: async () => ({ text: '' }) }; };
        App.speech.say = (txt, o) => { setTimeout(() => o.onEnd && o.onEnd('done'), 500); return 'x'; };
        App.ai.run = async (q) => ({ text: 'Basit sarkaçta periyot $T = 2\\\\pi\\\\sqrt{L/g}$ ile bulunur. **Periyot** kütleye bağlı değildir; **ip uzunluğu** arttıkça artar.', models: ['test'], engine: 'test' }); }""")
    pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(500)
    pg.click("#vHoloBtn"); pg.wait_for_timeout(3000)
    pg.evaluate("() => { window.__lis.onFinal('sarkaç periyot', 'sarkaç periyot'); }"); pg.wait_for_timeout(3000)
    for i in range(8):
      print(pg.evaluate("() => { const a = document.querySelector('#vPano a'); const r = a.getBoundingClientRect(); const c = document.querySelector('#vHolo canvas').getBoundingClientRect(); const bd = document.querySelector('.voice-body'); return [Math.round(r.top), Math.round(c.width), Math.round(c.height), bd.scrollTop, bd.scrollHeight, bd.clientHeight]; }"))
      pg.wait_for_timeout(150)
    pg.screenshot(path="v32/dbg-teacher.png")
finally:
  for pr in procs: pr.terminate()
