import os, sys, subprocess, time, json
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, "content"); os.makedirs(OUT, exist_ok=True)
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1); errs = []
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type in ("error", "warning") and "11434" not in m.text and "Failed to load resource" not in m.text else None)
    pg.goto("http://localhost:8765/#/konular/9/matematik"); pg.wait_for_timeout(700)
    units = pg.locator(".unit").count(); outs = pg.locator(".outcome").count()
    print("üniteler:", units, "kazanımlar:", outs)
    pg.screenshot(path=f"{OUT}/units.png", full_page=True)
    tree = pg.evaluate("App.data.curriculum.findSubject('9','matematik').units.map(u => ({u: u.id, k: u.outcomes.map(o => o.id)}))")
    problems = []; total_katex = 0
    for u in tree:
        for k in u["k"]:
            pg.goto(f"http://localhost:8765/#/konular/9/matematik/{u['u']}/{k}"); pg.wait_for_timeout(250)
            r = pg.evaluate("""() => {
              const body = [...document.querySelectorAll('.lesson__body')];
              const txt = body.map(b => b.innerText).join('\\n');
              return { katex: document.querySelectorAll('.lesson .katex').length,
                       errors: [...document.querySelectorAll('.lesson .katex-error')].map(e => e.title || e.textContent).slice(0,3),
                       raw: (txt.match(/\\$[^$\\s]|\\\\\\(|\\\\\\[|\\\\frac|\\\\mathbb|\\\\sqrt/g) || []).slice(0,5),
                       placeholder: document.querySelectorAll('.lesson .placeholder').length,
                       sections: [...document.querySelectorAll('.lesson__section h2')].map(h => h.innerText),
                       title: document.querySelector('.page-head h1').innerText }; }""")
            total_katex += r["katex"]
            if r["errors"] or r["raw"] or r["placeholder"]:
                problems.append((u["u"], k, r["errors"], r["raw"], r["placeholder"]))
    print("toplam formül:", total_katex)
    print("sorunlu sayfa:", problems or "yok")
    for path, name in [("t1/k1", "t1k1"), ("t4/k4", "t4k4"), ("t5/k2", "t5k2"), ("t7/k2", "t7k2")]:
        pg.goto(f"http://localhost:8765/#/konular/9/matematik/{path}"); pg.wait_for_timeout(400)
        pg.screenshot(path=f"{OUT}/{name}-dark.png", full_page=True)
    pg.eval_on_selector('#themeSwitch [data-theme-set="light"]', 'e => e.click()'); pg.wait_for_timeout(300)
    pg.goto("http://localhost:8765/#/konular/9/matematik/t2/k2"); pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/t2k2-light.png", full_page=True)
    pg.set_viewport_size({"width": 390, "height": 844}); pg.goto("http://localhost:8765/#/konular/9/matematik/t1/k1"); pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/t1k1-mobile.png")
    # Hafıza parçaları
    chunks = pg.evaluate("App.rag.buildChunks().then(cs => ({ lesson: cs.filter(c => c.kind === 'lesson').length, sample: cs.filter(c => c.kind==='lesson').slice(0,1).map(c => c.text.slice(0, 300)) }))")
    print("hafıza (konu anlatımı) parçaları:", chunks["lesson"]); print(chunks["sample"][0])
    b.close()
finally:
  srv.terminate()
print("HATALAR:", errs or "yok")
