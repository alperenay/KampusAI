import subprocess, sys, time, os, json, socket, urllib.request
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
SITE = "/home/claude/ders-asistani"
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")]))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", SITE], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)
res, errs = [], []
def check(n, c, info=""):
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:400]))
SHOT = os.path.join(SP, "v16"); os.makedirs(SHOT, exist_ok=True)
def log(): return json.loads(urllib.request.urlopen("http://127.0.0.1:8787/__log").read())
def reset(): urllib.request.urlopen("http://127.0.0.1:8787/__reset").read()
gens = lambda: [x for x in log() if ":streamGenerateContent" in x["url"] or ":generateContent" in x["url"]]
EXP = {"kimya": (3, 20), "biyoloji": (2, 16), "cografya": (7, 24), "edebiyat": (4, 14), "din": (5, 17), "tarih": (3, 12), "ingilizce": (9, 18), "matematik": None, "fizik": None}
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for mobile in (False, True):
            ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860})
            ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
            ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
            pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
            tag = "telefon" if mobile else "masaüstü"
            reset()
            info = pg.evaluate("""() => { const o = {}; for (const s of ['edebiyat','matematik','fizik','kimya','biyoloji','tarih','cografya','din','ingilizce']) { const x = App.data.curriculum.findSubject('9', s); o[s] = x ? [x.units.length, x.units.reduce((a,u)=>a+u.outcomes.length,0), x.units.every(u=>u.outcomes.every(k=>k.content && k.content.anlatim && k.content.ozet.length))] : null; } return o; }""")
            for s, e in EXP.items():
                if e: check(f"{tag}: 9/{s} {e[0]} ünite {e[1]} kazanım, içerik tam", info[s] and info[s][0] == e[0] and info[s][1] == e[1] and info[s][2], info[s])
            if mobile:
                for s in ["matematik", "fizik"]:
                    check(f"9/{s} değişmedi", info[s] and info[s][2], info[s])
            # Her kazanım sayfasını aç
            bad = []
            for s, e in EXP.items():
                if not e: continue
                ids = pg.evaluate("(s) => App.data.curriculum.findSubject('9', s).units.flatMap(u => u.outcomes.map(k => u.id + '/' + k.id))", s)
                if mobile: ids = ids[:2]
                go_s = "#/konular/9/" + s
                pg.evaluate("(h) => location.hash = h", go_s); pg.wait_for_timeout(500)
                txt = pg.locator("#view").inner_text()
                if "Yapay zekâyla" in txt: bad.append(s + ": AI rozeti")
                for i in ids:
                    pg.evaluate("(h) => location.hash = h", go_s + "/" + i); pg.wait_for_timeout(250)
                    v = pg.locator("#view")
                    t = v.inner_text()
                    if pg.locator(".lesson__section").count() < 2 or "$" in t.replace("$_", "") and s in ("kimya",) and False: bad.append(s + "/" + i)
                    if "\\(" in t or "**" in t: bad.append(s + "/" + i + " ham markdown")
                    if pg.locator(".katex-error").count(): bad.append(s + "/" + i + " katex hatası")
                    sw = pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
                    if mobile and sw > 2: bad.append(s + "/" + i + f" taşma {sw}")
            check(f"{tag}: tüm kazanım sayfaları düzgün", not bad, bad[:10])
            check(f"{tag}: 9. sınıf için yapay zekâ çağrısı yok", not gens(), len(gens()))
            # örnek ekran görüntüleri
            for h, n in [("#/konular/9/kimya/u1/k1", "kim"), ("#/konular/9/edebiyat/u3/k2", "edb"), ("#/konular/9/ingilizce/u1/k1", "ing"), ("#/konular/9/tarih/u2/k3", "tar"), ("#/konular/9/cografya", "cog-list")]:
                pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(500)
                pg.screenshot(path=os.path.join(SHOT, f"{tag}-{n}.png"), full_page=False)
            # test & Feynman düğmeleri
            pg.evaluate("(h) => location.hash = h", "#/konular/9/din/u2/k2"); pg.wait_for_timeout(500)
            btns = pg.locator("#view button, #view a").all_inner_texts()
            check(f"{tag}: konu sonu testi / Feynman düğmeleri var", any("test" in x.lower() for x in btns) and any("anlatmaya" in x.lower() for x in btns), btns)
            r = pg.evaluate("async () => { try { await App.lessons.generateSyllabus('9','tarih'); return 'gen'; } catch (e) { return e.message; } }")
            check(f"{tag}: hazır içerik korunur (tarih)", r == "curated", r)
            ctx.close()
        b.close()
finally:
    for pr in procs: pr.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
