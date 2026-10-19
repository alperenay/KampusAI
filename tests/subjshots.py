import subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, "subjshots"); os.makedirs(OUT, exist_ok=True)
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1); errs=[]
theme = sys.argv[1] if len(sys.argv) > 1 else "dark"
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for tag, vp, mob in [("m", (390, 844), True), ("d", (1440, 900), False)]:
        ctx = b.new_context(viewport={"width": vp[0], "height": vp[1]}, has_touch=mob, is_mobile=mob)
        ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
        pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e))); pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
        pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
        pg.evaluate(f"() => App.theme.set('{theme}')")
        for name, h in [("grades", "#/konular/11"), ("subject", "#/konular/10/matematik"), ("lesson", "#/konular/10/fizik/u4/k1"), ("today", "#/bugun"), ("lesson2", "#/konular/10/fizik/u4/k1")]:
            pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(1400)
            pg.screenshot(path=f"{OUT}/{theme}_{tag}_{name}.png")
        pg.evaluate("() => document.getElementById('view').scrollTo(0, 1600)"); pg.wait_for_timeout(600)
        pg.screenshot(path=f"{OUT}/{theme}_{tag}_lesson_scrolled.png")
        ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
print(errs)
