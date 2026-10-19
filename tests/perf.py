"""3B performans ölçümü: eski (port 8766) ve yeni (8765) sürüm.
Ölçülen: 5 sn içinde yapılan çizim sayısı, çizim başına ortalama süre (ms, CPU+SwiftShader),
çizim çağrısı ve üçgen sayısı, piksel oranı. Telefon (390×844, dpr 3) ve PC (1600×900, dpr 1.5)."""
import subprocess, sys, time, json, socket
from playwright.sync_api import sync_playwright
SP = "/tmp/claude-0/-home-claude/6404c6cd-770e-5990-9580-59780d6fba0b/scratchpad"
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
if not up(8766): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8766", "--bind", "127.0.0.1", "-d", SP + "/old"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1)
HOOK = """() => { const m = App.lab3d.mount; App.lab3d.mount = function () { const r = m.apply(this, arguments); window.__S3 = r;
  const R = r._S.renderer, orig = R.render.bind(R); window.__pf = { n: 0, ms: 0, calls: 0, tris: 0 };
  R.render = function (s, c) { const t = performance.now(); orig(s, c); const g = R.getContext(); g.finish(); window.__pf.ms += performance.now() - t; window.__pf.n++; window.__pf.calls = R.info.render.calls; window.__pf.tris = R.info.render.triangles; };
  return r; }; }"""
res = {}
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    for dev, vw, vh, dpr, mob in (("telefon", 390, 844, 3, True), ("pc", 1600, 900, 1.5, False)):
        for ver, port in (("eski", 8766), ("yeni", 8765)):
            ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=dpr, is_mobile=mob, has_touch=mob)
            ctx.add_init_script("Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });")
            ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); localStorage.setItem('da:pref:labMode', '\"3d\"'); localStorage.setItem('da:pref:kureL', JSON.stringify({ulke:true,ag:true,baskent:true,deprem:true,volkan:true,levha:true,tarih:true})); } catch (e) {}")
            pg = ctx.new_page(); pg.goto("http://localhost:%d/" % port); pg.wait_for_timeout(1500)
            pg.evaluate(HOOK)
            for name, h, act in (("küre (dönerken)", "#/kure", None), ("küre (durunca)", "#/kure", "nospin"), ("eğik atış 3B (oynarken)", "#/lab/atis", "play"), ("DNA modeli", "#/modeller/dna", None)):
                if act != "nospin":
                    pg.evaluate("(h) => { window.__pf = null; location.hash = h; }", h); pg.wait_for_function("() => window.__pf", timeout=60000); pg.wait_for_timeout(2500)
                if act == "nospin": pg.uncheck("#kSpin"); pg.wait_for_timeout(500)
                if act == "play":
                    try: pg.click('[data-lab="reset"]'); pg.click('[data-lab="play"]')
                    except Exception: pass
                pg.evaluate("() => { window.__pf.n = 0; window.__pf.ms = 0; }")
                pg.wait_for_timeout(5000)
                r = pg.evaluate("() => Object.assign({}, window.__pf, { pr: window.__S3._S.renderer.getPixelRatio(), w: window.__S3._S.renderer.domElement.width, h: window.__S3._S.renderer.domElement.height })")
                r["avg"] = round(r["ms"] / max(1, r["n"]), 1); r.pop("ms")
                res.setdefault(dev + " | " + name, {})[ver] = r
                print(dev, ver, name, r, flush=True)
            ctx.close()
    b.close()
for pr in procs: pr.terminate()
json.dump(res, open(SP + "/perf.json", "w"), ensure_ascii=False, indent=1)
