"""Tüm uygulama taraması: her sayfa telefon + bilgisayar, koyu + açık tema, Türkçe + İngilizce.
Her sayfada: sayfa hatası, konsol hatası, yatay taşma, görünür 'undefined/NaN/[object Object]',
çözülmemiş çeviri anahtarı, kırık yerel görsel, boş sayfa."""
exec(open("hdr.py").read())
import json, re
SHOT = os.path.join(SP, "v33"); os.makedirs(SHOT, exist_ok=True)
problems = []
def note(tag, route, kind, info):
    problems.append((tag, route, kind, str(info)[:240]))

SCAN = r"""() => {
  const out = {};
  const de = document.documentElement;
  out.ovf = de.scrollWidth - de.clientWidth;
  const view = document.querySelector('#view, main, .main') || document.body;
  const txt = (view.innerText || '').trim();
  out.len = txt.length;
  const bad = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; while ((n = walker.nextNode())) {
    const t = n.nodeValue; if (!t || !t.trim()) continue;
    const el = n.parentElement; if (!el || el.closest('script,style,code,pre,.katex,annotation,[hidden],.md code')) continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (/\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b(?! ?hipotez)/.test(t)) bad.push(['text', t.trim().slice(0, 90)]);
    if (/^\s*[a-z]{2,10}\.[a-zA-Z]+(\.[a-zA-Z0-9]+)*\s*$/.test(t) && !/^(www|e\.g|i\.e)\./.test(t.trim()) && !/\.(js|md|com|org|tr|net|io|dev|json|png|jpg|pdf|apk|exe)$/i.test(t.trim())) bad.push(['key', t.trim()]);
  }
  out.bad = bad.slice(0, 6);
  // yerel kırık görseller
  out.img = Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0 && i.src && i.src.indexOf(location.origin) === 0 && i.getBoundingClientRect().width > 0).map(i => i.src.replace(location.origin, '')).slice(0, 4);
  // boş ikon yerleri
  out.icons = document.querySelectorAll('[data-icon]:empty').length;
  // taşan öğeler (ekranın sağından dışarı)
  const W = de.clientWidth; const wide = [];
  document.querySelectorAll('#view *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.right > W + 2 && getComputedStyle(e).position !== 'fixed') { let p = e.parentElement, clip = false; while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') { clip = true; break; } p = p.parentElement; } if (!clip) wide.push((e.className && e.className.baseVal == null ? e.className : e.tagName) + ':' + Math.round(r.right)); } });
  out.wide = wide.slice(0, 4);
  return out;
}"""

try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    for mobile, w, h, theme, lang in ((True, 390, 844, "dark", "tr"), (False, 1366, 860, "dark", "tr"), (True, 390, 844, "light", "tr"), (False, 1366, 860, "light", "en"), (True, 768, 1024, "dark", "tr"), (False, 1024, 768, "light", "tr")):
      tag = ("phone" if mobile else "pc") + "-" + theme + "-" + lang
      ctx, pg = newctx(b, mobile, w, h)
      cons = []
      pg.on("console", lambda m: cons.append(m.text[:200]) if m.type == "error" else None)
      pg.evaluate("(t) => { App.prefs.set('theme', t); document.documentElement.setAttribute('data-theme', t); }", theme)
      if lang == "en": pg.evaluate("() => App.i18n.setLang('en')"); pg.wait_for_timeout(600)
      pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1800)
      # rotaları topla
      R = pg.evaluate("""() => {
        const C = App.data.curriculum, r = new Set(['', 'bugun', 'araclar', 'konular', 'denemeler', 'denemeler/yeni', 'yanlislar', 'kartlar', 'kartlar/calis', 'kontrol', 'video', 'program', 'podcast',
          'yolculuk', 'paragraf', 'paragraf/hiz', 'zaman', 'zaman/liste', 'zaman/sinav', 'atlas', 'atlas/dunya', 'lab', 'oyunlar', 'harita', 'tercih', 'tercih/tum', 'tercih/liste', 'kariyer', 'kariyer/test', 'kariyer/meslekler',
          'puan', 'odak', 'simulasyon', 'rapor', 'sinif', 'hesap', 'hakkinda', 'kok', 'sohbet', 'modeller', 'modeller/molekul', 'kure', 'yazili', 'yazili/9/matematik', 'yazili/12/inkilap', 'yazili/10/fizik/d1', 'yazili/11/tarih/d2/anahtar', 'yazili/9/edebiyat/d1']);
        App.modeller.MODELS.forEach(m => r.add('modeller/' + m.id));
        C.grades.forEach(g => { r.add('konular/' + g.id); g.subjects.forEach(s => { r.add('konular/' + g.id + '/' + s.id); const u = s.units[0], o = u && u.outcomes.find(x => x.content); if (o) { const k = C.key(g.id, s.id, u.id, o.id); r.add('konular/' + k); if (g.id === '10') { r.add('podcast/' + k); r.add('test/' + k); r.add('anlat/' + k); r.add('kartlar/konu/' + k); } } }); });
        App.yolculuk.worlds().forEach(x => r.add('yolculuk/' + x.id));
        App.games.ORDER.forEach(x => r.add('oyunlar/' + x));
        Object.keys(App.labs.LABS).forEach(x => r.add('lab/' + x));
        App.data.meslekler.slice(0, 6).forEach(m => r.add('kariyer/m/' + m[0]));
        return Array.from(r); }""")
      print(tag, "rota:", len(R))
      for i, r in enumerate(R):
        n0, c0 = len(errs), len(cons)
        try:
          pg.evaluate("(h) => location.hash = h", "#/" + r)
          pg.wait_for_timeout(900 if not r.startswith(("lab/", "tercih", "atlas", "kariyer/m", "modeller/")) else 1600)
          s = pg.evaluate(SCAN)
        except Exception as e:
          note(tag, r, "exc", e); continue
        if len(errs) > n0: note(tag, r, "pageerror", errs[n0:])
        newc = [c for c in cons[c0:] if not re.search(r"favicon|net::ERR|Failed to load resource|i\.ytimg|ResizeObserver", c)]
        if newc: note(tag, r, "console", newc)
        if s["ovf"] > 0: note(tag, r, "overflow", (s["ovf"], s["wide"]))
        if s["bad"]: note(tag, r, "text", s["bad"])
        if s["img"]: note(tag, r, "img", s["img"])
        if s["icons"]: note(tag, r, "icon", s["icons"])
        if s["len"] < 20 and r not in ("sohbet",): note(tag, r, "empty", s["len"])
        if r in ("", "bugun", "konular", "lab", "podcast", "yolculuk", "kariyer", "tercih", "araclar"):
          pg.screenshot(path=os.path.join(SHOT, tag + "_" + (r.replace("/", "_") or "home") + ".png"))
      ctx.close()
    b.close()
finally:
  for pr in procs: pr.terminate()
from collections import Counter
print("SORUN SAYISI", len(problems), Counter(k for _, _, k, _ in problems))
seen = set()
for t, r, k, i in problems:
  key = (r, k, i[:80])
  if key in seen: continue
  seen.add(key); print(t, "|", r, "|", k, "|", i)
json.dump(problems, open(os.path.join(SHOT, "problems.json"), "w"), ensure_ascii=False, indent=1)
