import sys
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
    for vw,vh in [(1440,900),(1920,1080),(390,844)]:
        pg=b.new_page(viewport={"width":vw,"height":vh})
        pg.goto("file:///home/claude/ders-asistani/index.html#/denemeler"); pg.wait_for_timeout(400)
        for th in ["light","dark"]:
            pg.evaluate(f"App.theme.set('{th}')"); pg.wait_for_timeout(200)
            pg.add_style_tag(content=".view,.topbar{visibility:hidden}.sidebar{visibility:hidden}")
            pg.screenshot(path=f"bg-{th}-{vw}.png")
            im=Image.open(f"bg-{th}-{vw}.png").convert("RGB")
            x0=300 if vw>860 else 0
            px=[im.getpixel((x,y)) for x in range(x0,vw,12) for y in range(0,vh,12)]
            txt=pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--text').trim()")
            mut=pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--on-bg-muted').trim()")
            print(vw,th,"text min %.2f"%min(cr(hx(txt),c) for c in px),"| muted min %.2f"%min(cr(hx(mut),c) for c in px), "| muted p10 %.2f"%sorted(cr(hx(mut),c) for c in px)[len(px)//10])
            pg.reload(); pg.wait_for_timeout(300)
    b.close()
