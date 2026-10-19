from playwright.sync_api import sync_playwright
import os
R = "/home/claude/ders-asistani"
BOOK = '''<path fill="url(#g)" d="M12 6.2C9.9 4.6 7 4 3.5 4.3c-.5 0-.9.5-.9 1v11.6c0 .6.5 1 1 1 3.1-.2 5.8.4 7.6 1.9.5.4 1.2.4 1.6 0 1.8-1.5 4.5-2.1 7.6-1.9.6 0 1-.4 1-1V5.3c0-.5-.4-1-.9-1C17 4 14.1 4.6 12 6.2z"/>
<path d="M12 7.6v9.6" stroke="#15161b" stroke-width="1.3" stroke-linecap="round"/>'''
GRAD = '''<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b8cff"/><stop offset=".55" stop-color="#9b72ff"/><stop offset="1" stop-color="#ff7a9a"/></linearGradient>
<radialGradient id="bg" cx=".3" cy=".2" r="1.1"><stop offset="0" stop-color="#262833"/><stop offset="1" stop-color="#121318"/></radialGradient>'''
def svg(size, glyph_frac, bg="full", radius=0.0):
    # glyph_frac: kitabın kenar uzunluğu / ikon boyu
    g = glyph_frac * size
    off = (size - g) / 2
    s = g / 24
    rect = ""
    if bg == "full": rect = f'<rect width="{size}" height="{size}" fill="url(#bg)"/>'
    elif bg == "round": rect = f'<rect width="{size}" height="{size}" rx="{size*radius}" fill="url(#bg)"/>'
    elif bg == "solid": rect = f'<rect width="{size}" height="{size}" fill="#15161b"/>'
    glyph = "" if bg == "solid" else f'<g transform="translate({off},{off + g*0.02}) scale({s})">{BOOK}</g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}"><defs>{GRAD}</defs>{rect}{glyph}</svg>'
JOBS = [
  ("assets/icons/icon-192.png", 192, 0.66, "round", 0.22),
  ("assets/icons/icon-512.png", 512, 0.66, "round", 0.22),
  ("assets/icons/maskable-512.png", 512, 0.52, "full", 0),
  ("assets/icons/apple-touch-icon.png", 180, 0.62, "full", 0),
  ("assets/icons/favicon-32.png", 32, 0.9, "none", 0),
  ("desktop/build/icon.png", 512, 0.66, "round", 0.22),
  ("mobile/assets/icon-only.png", 1024, 0.6, "full", 0),
  ("mobile/assets/icon-foreground.png", 1024, 0.5, "none", 0),
  ("mobile/assets/icon-background.png", 1024, 0, "solid", 0),
]
with sync_playwright() as p:
    b = p.chromium.launch()
    for path, size, frac, bg, rad in JOBS:
        pg = b.new_page(viewport={"width": size, "height": size})
        pg.set_content('<html><body style="margin:0;background:transparent">' + svg(size, frac, bg, rad) + "</body></html>")
        pg.screenshot(path=os.path.join(R, path), omit_background=True)
        pg.close()
    # Açılış ekranı (splash): koyu zemin, ortada logo
    for name in ("splash.png", "splash-dark.png"):
        size = 2732
        pg = b.new_page(viewport={"width": 1366, "height": 1366}, device_scale_factor=2)
        g = 360
        pg.set_content(f'''<html><body style="margin:0;width:1366px;height:1366px;background:#121318;display:grid;place-items:center">
          <svg xmlns="http://www.w3.org/2000/svg" width="{g}" height="{g}" viewBox="0 0 24 24"><defs>{GRAD}</defs>{BOOK}</svg></body></html>''')
        pg.screenshot(path=os.path.join(R, "mobile/assets", name))
        pg.close()
    b.close()
print("ok")
