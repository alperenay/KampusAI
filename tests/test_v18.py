import subprocess, sys, time, os, json, socket, urllib.request, glob, re
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
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:500]))
SHOT = os.path.join(SP, "v18"); os.makedirs(SHOT, exist_ok=True)
def log(): return json.loads(urllib.request.urlopen("http://127.0.0.1:8787/__log").read())
def reset(): urllib.request.urlopen("http://127.0.0.1:8787/__reset").read()
gens = lambda: [x for x in log() if ":streamGenerateContent" in x["url"] or ":generateContent" in x["url"]]
# beklenen sayılar: içerik dosyalarından
js = "global.App={data:{content:{}}};" + "".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(SITE + "/js/data/content/*-1[012].js"))) + \
     ";const o={};for(const k in App.data.content){const u=App.data.content[k];o[k]=[u.length,u.reduce((a,x)=>a+x.outcomes.length,0)]}console.log(JSON.stringify(o))"
open(os.path.join(SP, "_exp18.js"), "w", encoding="utf-8").write(js)
EXP = json.loads(subprocess.run(["node", os.path.join(SP, "_exp18.js")], capture_output=True, text=True).stdout)
print("içerik:", len(EXP), "ders,", sum(v[1] for v in EXP.values()), "kazanım")
check("28 ders dosyası", len(EXP) == 28, sorted(EXP))
check("AI'da kalanlar: 11/ingilizce, 12/felsefe", "11/ingilizce" not in EXP and "12/felsefe" not in EXP and "12/inkilap" in EXP and "12/tarih" not in EXP)
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
            info = pg.evaluate("""() => { const o = {}; for (const g of ['10','11','12']) for (const s of App.data.curriculum.findGrade(g).subjects) { o[g+'/'+s.id] = [s.units.length, s.units.reduce((a,u)=>a+u.outcomes.length,0), s.units.every(u=>u.outcomes.every(k=>k.content && k.content.anlatim && k.content.ozet.length && k.title && k.title.tr && k.title.en))]; } return o; }""")
            badc = [k for k, e in EXP.items() if not (info.get(k) and info[k][0] == e[0] and info[k][1] == e[1] and info[k][2])]
            check(f"{tag}: tüm 10–12 dersleri yüklendi, içerik tam", not badc, [(k, info.get(k), EXP[k]) for k in badc])
            check(f"{tag}: 9. sınıf bozulmadı", pg.evaluate("() => App.data.curriculum.findGrade('9').subjects.every(s => s.units.length > 0)"))
            bad = []
            for k in sorted(EXP):
                g, s = k.split("/")
                ids = pg.evaluate("([g,s]) => App.data.curriculum.findSubject(g, s).units.flatMap(u => u.outcomes.map(o => u.id + '/' + o.id))", [g, s])
                if mobile: ids = ids[:2]
                base = f"#/konular/{g}/{s}"
                pg.evaluate("(h) => location.hash = h", base); pg.wait_for_timeout(350)
                if "Yapay zekâyla" in pg.locator("#view").inner_text(): bad.append(k + ": AI rozeti")
                for i in ids:
                    pg.evaluate("(h) => location.hash = h", base + "/" + i); pg.wait_for_timeout(200)
                    t = pg.locator("#view").inner_text()
                    if pg.locator(".lesson__section").count() < 2: bad.append(k + "/" + i + " bölüm yok")
                    if "\\(" in t or "**" in t or "$$" in t: bad.append(k + "/" + i + " ham markdown")
                    if pg.locator(".katex-error").count(): bad.append(k + "/" + i + " katex hatası: " + pg.locator(".katex-error").first.inner_text()[:60])
                    if re.search(r"(?<![\w\\])\$[^$\s]", t): bad.append(k + "/" + i + " çözülmemiş $")
                    if mobile:
                        sw = pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
                        if sw > 2: bad.append(k + "/" + i + f" taşma {sw}")
            check(f"{tag}: tüm kazanım sayfaları düzgün", not bad, bad[:12])
            check(f"{tag}: hazır dersler için yapay zekâ çağrısı yok", not gens(), len(gens()))
            for h, n in [("#/konular/12/matematik/u6/k2", "mat12"), ("#/konular/11/kimya/u2/k1", "kim11"), ("#/konular/10/felsefe/u2/k3", "fel10"), ("#/konular/12/inkilap/u2/k1", "ink12"), ("#/konular/11/tarih", "tar11-list"), ("#/konular/12/fizik/u4/k2", "fiz12")]:
                pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(500)
                pg.screenshot(path=os.path.join(SHOT, f"{tag}-{n}.png"), full_page=False)
            if not mobile:
                r = pg.evaluate("async () => { try { await App.lessons.generateSyllabus('11','kimya'); return 'gen'; } catch (e) { return e.message; } }")
                check("hazır içerik korunur (11/kimya)", r == "curated", r)
                # Eski yapay zekâ ön koşul haritaları
                r = pg.evaluate("""async () => {
                  const put = (sk, extra) => App.db.put('meta', Object.assign({ id: 'prereq:' + sk, map: { 'u1/k2': ['u1/k1'] }, at: 'x' }, extra || {}));
                  await put('10/kimya');                       // imzasız eski harita → hazır derste yok sayılır
                  await put('11/ingilizce');                   // imzasız ama ders hâlâ YZ → kullanılır
                  await put('12/kimya', { sig: 'eski.1' });    // imza uyuşmuyor → yok sayılır
                  await App.roots.load();
                  const a = App.roots.subjectMap('10/kimya').source, b = App.roots.subjectMap('11/ingilizce').source, c = App.roots.subjectMap('12/kimya').source;
                  // doğru imzayla kaydedilen harita kullanılır
                  const sig = await (async () => { const old = App.ai.generate; App.ai.generate = async () => ({ data: { links: [{ k: 'u1/k2', pre: ['u1/k1'] }] }, model: 't' }); try { await App.roots.generateMap('10', 'kimya'); } finally { App.ai.generate = old; } return (await App.db.get('meta', 'prereq:10/kimya')).sig; })();
                  const d = App.roots.subjectMap('10/kimya').source;
                  for (const sk of ['10/kimya','11/ingilizce','12/kimya']) await App.db.remove('meta', 'prereq:' + sk);
                  await App.roots.load();
                  return [a, b, c, !!sig, d];
                }""")
                check("eski YZ haritaları: hazır derste yok sayılır, YZ dersinde kalır, yeni imzalı harita geçerli", r == [None, "ai", None, True, "ai"], r)
                pg.evaluate("(h) => location.hash = h", "#/kok/12/fizik"); pg.wait_for_timeout(800)
                check("kök eksik sayfası 12/fizik açılıyor", pg.locator("#view").inner_text().strip() != "", "")
            ctx.close()
        b.close()
finally:
    for pr in procs: pr.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
