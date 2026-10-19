from playwright.sync_api import sync_playwright
from PIL import Image
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=0.03928 else (((v/255)+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
def cr(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+.05)/(lb+.05)
hx=lambda h:tuple(int(h[i:i+2],16) for i in (1,3,5))
with sync_playwright() as p:
    b=p.chromium.launch()
    for vw,vh in [(1440,900),(1920,1080),(1280,720),(768,1024),(390,844)]:
        pg=b.new_page(viewport={"width":vw,"height":vh})
        pg.goto("file:///home/claude/ders-asistani/index.html#/denemeler"); pg.wait_for_timeout(300)
        pg.evaluate("App.theme.set('dark')"); pg.wait_for_timeout(200)
        pg.add_style_tag(content=".view,.topbar,.sidebar{visibility:hidden}")
        pg.wait_for_timeout(200); pg.screenshot(path=f"bgd-{vw}.png")
        im=Image.open(f"bgd-{vw}.png").convert("RGB")
        x0=300 if vw>860 else 0
        px=[im.getpixel((x,y)) for x in range(x0,vw,10) for y in range(0,vh,10)]
        g=lambda k: pg.evaluate(f"getComputedStyle(document.documentElement).getPropertyValue('{k}').trim()")
        t=sorted(cr(hx(g('--text')),c) for c in px); m=sorted(cr(hx(g('--on-bg-muted')),c) for c in px)
        n=len(px)
        print(vw, "text min %.1f p5 %.1f"%(t[0],t[n//20]), "| muted min %.1f p5 %.1f p25 %.1f"%(m[0],m[n//20],m[n//4]))
        pg.close()
    b.close()
