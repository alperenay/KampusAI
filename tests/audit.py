import subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, "audit"); os.makedirs(OUT, exist_ok=True)
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1)
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for tag, vp, mob in [("m", (390, 844), True), ("d", (1440, 900), False)]:
        ctx = b.new_context(viewport={"width": vp[0], "height": vp[1]}, has_touch=mob, is_mobile=mob)
        ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
        pg = ctx.new_page(); pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
        pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
        for r in ["", "bugun", "konular", "konular/11", "denemeler", "harita"]:
            pg.evaluate("(h) => location.hash = h", "#/" + r); pg.wait_for_timeout(1300)
            pg.screenshot(path=os.path.join(OUT, tag + "_" + (r.replace("/", "_") or "home") + ".png"))
        ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
