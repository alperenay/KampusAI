#!/usr/bin/env python3
"""3B Dünya Küresi verisini üretir → js/data/kure.js

Kaynaklar:
  • Natural Earth 1:50m ülke sınırları ve başkentler (kamu malı) — github.com/nvkelso/natural-earth-vector
  • PB2002 levha sınırları (Bird, 2003), fraxen/tectonicplates dönüşümü (ODC-BY 1.0) — github.com/fraxen/tectonicplates
Ülke Türkçe adları, uygulamadaki dünya haritası verisiyle (js/data/harita-dunya.js) aynı tutulur.

Kullanım: python3 tools/build-globe.py <natural-earth-vector/geojson> <tectonicplates/GeoJSON>
"""
import json, os, re, sys, math

NE = sys.argv[1] if len(sys.argv) > 1 else "/home/claude/nvkelso/natural-earth-vector/geojson"
PB = sys.argv[2] if len(sys.argv) > 2 else "/home/claude/fraxen/tectonicplates/GeoJSON"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def dp(pts, eps):
    """Douglas-Peucker sadeleştirme"""
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1e-12
    imax, dmax = 0, -1
    for i in range(1, len(pts) - 1):
        p = pts[i]
        d = abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / L if L > 1e-12 else math.hypot(p[0] - a[0], p[1] - a[1])
        if d > dmax: imax, dmax = i, d
    if dmax > eps:
        return dp(pts[:imax + 1], eps)[:-1] + dp(pts[imax:], eps)
    return [a, b]

def ring(r, eps=0.1):
    s = dp([(round(x, 3), round(y, 3)) for x, y in r], eps)
    s = [[round(x, 2), round(y, 2)] for x, y in s]
    out = []
    for p in s:
        if not out or out[-1] != p: out.append(p)
    return out if len(out) >= 4 else None

def area(r):
    return abs(sum(r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1] for i in range(len(r) - 1))) / 2

# Uygulamadaki Türkçe ülke adları ve başkent adları
tr = {}
src = open(os.path.join(ROOT, "js/data/harita-dunya.js"), encoding="utf-8").read()
m = re.search(r"App\.data\.mapWorld=(\{.*\});", src, re.S)
if m:
    for c in json.loads(m.group(1))["countries"]:
        tr[c["id"]] = c

countries = []
for f in json.load(open(os.path.join(NE, "ne_50m_admin_0_countries.geojson"), encoding="utf-8"))["features"]:
    p, g = f["properties"], f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    rings = []
    for poly in polys:
        outer = poly[0]
        if area(outer) < 0.05: continue          # çok küçük adaları at
        r = ring(outer)
        if r: rings.append(r)
    if not rings: continue
    cid = p.get("ADM0_A3")
    t = tr.get(cid, {})
    countries.append({
        "id": cid, "n": t.get("name") or p.get("NAME_TR") or p.get("NAME"), "en": p.get("NAME_EN") or p.get("NAME"),
        "cap": t.get("cap"), "pop": t.get("pop") or p.get("POP_EST"), "cont": t.get("cont") or p.get("CONTINENT"),
        "r": rings
    })

caps = []
for f in json.load(open(os.path.join(NE, "ne_50m_populated_places.geojson"), encoding="utf-8"))["features"]:
    p = f["properties"]
    if p.get("FEATURECLA") != "Admin-0 capital": continue
    lon, lat = f["geometry"]["coordinates"]
    t = tr.get(p.get("ADM0_A3"), {})
    caps.append([round(lon, 2), round(lat, 2), (t.get("cap") if t.get("cap") else p.get("NAME")), p.get("ADM0_A3")])

# Levha sınırları: aynı türden ardışık adımlar tek çizgi olur
CLS = ["OSR", "OTF", "SUB", "CRB", "CTF", "CCB", "OCB"]
steps = json.load(open(os.path.join(PB, "PB2002_steps.json"), encoding="utf-8"))["features"]
lines = []
cur = None
for f in steps:
    p = f["properties"]
    c = CLS.index(p["STEPCLASS"]) if p["STEPCLASS"] in CLS else 0
    a = [round(p["STARTLONG"], 2), round(p["STARTLAT"], 2)]; b = [round(p["FINALLONG"], 2), round(p["FINALLAT"], 2)]
    v = round(p.get("VELOCITYLE") or 0)
    if cur and cur["c"] == c and cur["p"][-1] == a and abs(a[0] - b[0]) < 90:
        cur["p"].append(b); cur["v"].append(v)
    else:
        cur = {"c": c, "p": [a, b], "v": [v]}; lines.append(cur)
pb = [[l["c"], round(sum(l["v"]) / len(l["v"])), [x for pt in l["p"] for x in pt]] for l in lines]

# Levha adları (kütle merkezi yaklaşık: köşe ortalaması)
PN = {"AF": "Afrika", "AN": "Antarktika", "AR": "Arap", "AS": "Ege", "AT": "Anadolu", "AU": "Avustralya", "CA": "Karayip", "CO": "Kokos",
      "EU": "Avrasya", "IN": "Hint", "JF": "Juan de Fuca", "NA": "Kuzey Amerika", "NZ": "Nazca", "PA": "Pasifik", "PS": "Filipin",
      "SA": "Güney Amerika", "SO": "Somali", "SC": "Scotia", "OK": "Ohotsk", "AM": "Amur", "YA": "Yangtze", "SU": "Sunda"}
plates = []
for f in json.load(open(os.path.join(PB, "PB2002_plates.json"), encoding="utf-8"))["features"]:
    code = f["properties"]["Code"]
    if code not in PN: continue
    g = f["geometry"]; polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    pts = [pt for poly in polys for pt in poly[0]]
    # boylam için çember ortalaması (180°'yi geçen levhalar)
    sx = sum(math.cos(math.radians(x)) for x, y in pts); sy = sum(math.sin(math.radians(x)) for x, y in pts)
    lon = math.degrees(math.atan2(sy, sx)); lat = sum(y for x, y in pts) / len(pts)
    plates.append([round(lon, 1), round(lat, 1), PN[code], code])

out = {"countries": countries, "caps": caps, "pb": pb, "plates": plates}
js = ("/* Bu dosya tools/build-globe.py ile üretildi. Kaynaklar: Natural Earth (kamu malı); PB2002 levha sınırları, Bird (2003), "
      "fraxen/tectonicplates (ODC-BY 1.0). */\n(function(){App.data=App.data||{};App.data.globe=" + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";})();\n")
open(os.path.join(ROOT, "js/data/kure.js"), "w", encoding="utf-8").write(js)
print("ülke", len(countries), "başkent", len(caps), "levha çizgisi", len(pb), "levha", len(plates), "boyut", len(js) // 1024, "KB")
