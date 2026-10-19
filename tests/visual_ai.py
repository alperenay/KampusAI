import subprocess, sys, time, os
from playwright.sync_api import sync_playwright
SP=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(SP,"vis"); os.makedirs(OUT,exist_ok=True)
procs=[subprocess.Popen([sys.executable, os.path.join(SP,"mock_ollama.py")]),
       subprocess.Popen([sys.executable,"-m","http.server","8765","--bind","127.0.0.1","-d","/home/claude/ders-asistani"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)]
time.sleep(1)
def done(pg, n):
    pg.wait_for_function("(n) => document.querySelectorAll('.msg--ai').length > n", arg=n)
    pg.wait_for_function("() => { const m=[...document.querySelectorAll('.msg--ai')].pop(); return m && !m.querySelector('.stage'); }")
def ask(pg, t):
    n=pg.locator(".msg--ai").count(); pg.fill("#composerInput", t); pg.keyboard.press("Enter"); done(pg, n)
try:
  with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1440,"height":900}); pg=ctx.new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(600)
    pg.evaluate("""async () => {
      const ex = [["2026-09-12",{turkce:{d:30,y:6},sosyal:{d:12,y:4},matematik:{d:22,y:8},fen:{d:9,y:5}}],
                  ["2026-10-03",{turkce:{d:34,y:4},sosyal:{d:15,y:2},matematik:{d:29,y:5},fen:{d:13,y:4}}]];
      for (let i = 0; i < ex.length; i++) await App.db.put("exams", {id:"e"+i, type:"TYT", name:"TYT Denemesi #"+(i+1), date:ex[i][0], results:ex[i][1], createdAt:ex[i][0]});
    }""")
    ask(pg, "Son denememde kaç net yaptım?")
    pg.set_input_files("#imgInput", os.path.join(SP,"soru.png")); pg.wait_for_selector("#imgPreview:not([hidden]) img")
    pg.screenshot(path=f"{OUT}/a-preview.png")
    ask(pg, "Bu soruyu çöz")
    ask(pg, "İkinci dereceden denklem formülü nedir?")
    # orta noktaya kaydır: alttaki alan mesajın üstüne binmemeli
    pg.evaluate("document.getElementById('view').scrollTop = document.getElementById('view').scrollHeight - 1300")
    pg.wait_for_timeout(200); pg.screenshot(path=f"{OUT}/b-scrolled-dark.png")
    pg.evaluate("App.prefs.set('aiVisionModel','llava:13b')")
    pg.set_input_files("#imgInput", os.path.join(SP,"soru.png")); pg.wait_for_selector("#imgPreview:not([hidden]) img")
    ask(pg, "Çöz"); pg.wait_for_timeout(2600)
    pg.screenshot(path=f"{OUT}/c-error.png")
    pg.evaluate("App.prefs.set('aiVisionModel', null)")
    pg.eval_on_selector('#themeSwitch [data-theme-set="light"]', 'e => e.click()'); pg.wait_for_timeout(300)
    pg.evaluate("document.getElementById('view').scrollTop = document.getElementById('view').scrollHeight - 1700")
    pg.wait_for_timeout(200); pg.screenshot(path=f"{OUT}/d-scrolled-light.png")
    pg.set_viewport_size({"width":390,"height":844}); pg.wait_for_timeout(400)
    pg.evaluate("document.getElementById('view').scrollTop = document.getElementById('view').scrollHeight - 1500")
    pg.wait_for_timeout(200); pg.screenshot(path=f"{OUT}/e-mobile-light.png")
    pg.eval_on_selector('#themeSwitch [data-theme-set="dark"]', 'e => e.click()'); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/f-mobile-dark.png")
    print("errors:", errs or "none")
    b.close()
finally:
  [x.terminate() for x in procs]
