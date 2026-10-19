exec(open("hdr.py").read())
import sys, json
routes = sys.argv[1:]
with sync_playwright() as p:
  b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
  ctx, pg = newctx(b, False, 1280, 720)
  pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
  for r in routes:
    go(pg, "#/" + r, 1500)
    d = pg.evaluate("""() => { const v = document.querySelector('#view');
      const els = Array.from(v.querySelectorAll('button, a, input, select, textarea, [data-tab]')).filter(e => e.getBoundingClientRect().width > 0).slice(0, 45);
      return { h: v.scrollHeight, items: els.map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + '.' + String(e.className).split(' ').slice(0,2).join('.') + Object.keys(e.dataset).map(k => '[' + k + '=' + e.dataset[k] + ']').join('') + (e.getAttribute('href') ? '@' + e.getAttribute('href') : '') + ' «' + (e.innerText || e.value || e.placeholder || '').trim().slice(0, 30).replace(/\\n/g,' ') + '»') }; }""")
    print("==", r, d["h"]); print("\n".join(d["items"]))
  ctx.close(); b.close()
for pr in procs: pr.terminate()
