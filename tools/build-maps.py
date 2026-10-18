#!/usr/bin/env python3
"""
build-maps.py — Etkileşimli harita verisini üretir (js/data/harita-tr.js, js/data/harita-dunya.js)

Kaynak: Natural Earth (kamu malı) — https://www.naturalearthdata.com
  git clone --depth 1 --filter=blob:none --sparse https://github.com/nvkelso/natural-earth-vector
  git sparse-checkout set --no-cone /geojson/ne_110m_admin_0_countries.geojson \
      /geojson/ne_50m_admin_0_countries.geojson /geojson/ne_10m_admin_1_states_provinces.geojson \
      /geojson/ne_10m_rivers_lake_centerlines.geojson /geojson/ne_10m_lakes.geojson
  python3 tools/build-maps.py <natural-earth-vector/geojson>

Koordinatlar önceden projekte edilip sadeleştirilir (Douglas–Peucker), SVG yol metni olarak saklanır.
Türkiye: eşit dikdörtgen (39° enlemde ölçekli). Dünya: Equal Earth.
"""
import json, math, os, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "../nvkelso/natural-earth-vector/geojson"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "js", "data")

def load(n): return json.load(open(os.path.join(SRC, n), encoding="utf-8"))

# ---------------- Sadeleştirme ----------------
def dp(pts, eps):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy) or 1e-9
    imax, dmax = 0, -1
    for i in range(1, len(pts) - 1):
        p = pts[i]
        d = abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / L if (dx or dy) else math.hypot(p[0] - a[0], p[1] - a[1])
        if d > dmax: imax, dmax = i, d
    if dmax > eps:
        return dp(pts[: imax + 1], eps)[:-1] + dp(pts[imax:], eps)
    return [a, b]

def ring_path(ring, proj, eps, closed=True, minlen=3):
    pts = [proj(lon, lat) for lon, lat in ring]
    pts = dp(pts, eps)
    # aynı noktaları at
    out = []
    for p in pts:
        q = (round(p[0], 1), round(p[1], 1))
        if not out or out[-1] != q: out.append(q)
    if len(out) < minlen: return ""
    s = "M" + " ".join("%g %g" % q if i == 0 else "L%g %g" % q for i, q in enumerate(out))
    s = "M%g %g" % out[0] + "".join("L%g %g" % q for q in out[1:])
    return s + ("Z" if closed else "")

def polys(geom):
    if geom["type"] == "Polygon": return [geom["coordinates"]]
    if geom["type"] == "MultiPolygon": return geom["coordinates"]
    return []

def lines(geom):
    if geom["type"] == "LineString": return [geom["coordinates"]]
    if geom["type"] == "MultiLineString": return geom["coordinates"]
    return []

def area_centroid(ring):
    a = cx = cy = 0
    for i in range(len(ring) - 1):
        x0, y0 = ring[i]; x1, y1 = ring[i + 1]
        c = x0 * y1 - x1 * y0
        a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
    if abs(a) < 1e-12: return abs(a), ring[0]
    return abs(a) / 2, (cx / (3 * a), cy / (3 * a))

def geom_path(geom, proj, eps, minarea=0):
    parts, best = [], (0, None)
    for poly in polys(geom):
        outer = [proj(*p) for p in poly[0]]
        ar, c = area_centroid(outer)
        if ar < minarea: continue
        if ar > best[0]: best = (ar, c)
        for ring in poly:
            s = ring_path(ring, proj, eps)
            if s: parts.append(s)
    return "".join(parts), best[1]

# ---------------- Türkiye ----------------
LON0, LAT0, LAT1, K = 25.55, 42.25, 35.75, 66.0
CX = math.cos(math.radians(39))
def ptr(lon, lat): return ((lon - LON0) * CX * K, (LAT0 - lat) * K)
TW, TH = round((44.9 - LON0) * CX * K), round((LAT0 - LAT1) * K)

ILLER = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"]

def build_tr():
    adm = load("ne_10m_admin_1_states_provinces.geojson")
    prov = []
    for f in adm["features"]:
        p = f["properties"]
        if p.get("adm0_a3") != "TUR": continue
        code = int(p["iso_3166_2"].split("-")[1])
        d, c = geom_path(f["geometry"], ptr, 0.55)
        prov.append({"n": code, "name": ILLER[code - 1], "ne": p["name"], "d": d, "c": [round(c[0], 1), round(c[1], 1)]})
    prov.sort(key=lambda x: x["n"])
    assert len(prov) == 81 and [p["n"] for p in prov] == list(range(1, 82)), "il sayısı"

    # Komşu ülkeler (arka plan)
    cn = load("ne_50m_admin_0_countries.geojson")
    nb = []
    for f in cn["features"]:
        p = f["properties"]
        if p["ADM0_A3"] == "TUR": continue
        x0, y0, x1, y1 = f["bbox"] if "bbox" in f else (None,) * 4
        keep = False
        for poly in polys(f["geometry"]):
            for lon, lat in poly[0]:
                if 24 <= lon <= 47 and 34 <= lat <= 44: keep = True; break
            if keep: break
        if not keep: continue
        # yalnızca görünür alana yakın çokgen parçaları
        g = {"type": "MultiPolygon", "coordinates": [poly for poly in polys(f["geometry"]) if any(22 <= lon <= 50 and 32 <= lat <= 46 for lon, lat in poly[0])]}
        d, c = geom_path(g, ptr, 0.8)
        nb.append({"name": p.get("NAME_TR") or p["NAME"], "d": d})

    # Akarsular (Natural Earth) — Türkçe adlar
    RN = {"Kiz?lirmak": "Kızılırmak", "Firat": "Fırat", "Al Furat": "Fırat", "Dicle": "Dicle", "Tigris": "Dicle", "Byk Menderes": "Büyük Menderes",
          "Sakarya": "Sakarya", "Ceyhan": "Ceyhan", "Kelkit": "Kelkit", "Evros": "Meriç", "Aras": "Aras", "Kura": "Kura", "Murat": "Murat", "Simav": "Simav"}
    rv = {}
    for f in load("ne_10m_rivers_lake_centerlines.geojson")["features"]:
        nm = RN.get(f["properties"].get("name"))
        if not nm or not f["geometry"]: continue
        for ln in lines(f["geometry"]):
            if not any(25 <= lon <= 45.5 and 35.5 <= lat <= 42.5 for lon, lat in ln): continue
            s = ring_path(ln, ptr, 0.5, closed=False, minlen=2)
            if s: rv.setdefault(nm, []).append(s)
    rivers = [{"name": k, "d": "".join(v), "src": "ne"} for k, v in rv.items()]

    # Göller (Natural Earth çokgenleri)
    LN = {"Lake Van": "Van Gölü", "Lake Tuz": "Tuz Gölü", "Eğirdir": "Eğirdir Gölü", "Beyşehir": "Beyşehir Gölü",
          "Ataturk Barajt": "Atatürk Baraj Gölü", "Keban Baraji": "Keban Baraj Gölü"}
    lakes = []
    for f in load("ne_10m_lakes.geojson")["features"]:
        nm = LN.get(f["properties"].get("name"))
        if not nm: continue
        d, c = geom_path(f["geometry"], ptr, 0.4)
        lakes.append({"name": nm, "d": d, "c": [round(c[0], 1), round(c[1], 1)]})
    return {"w": TW, "h": TH, "proj": [LON0, LAT0, CX * K, K], "prov": prov, "nb": nb, "rivers": rivers, "lakes": lakes}

# ---------------- Dünya (Equal Earth) ----------------
A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796
M = math.sqrt(3) / 2
WS = 160.0
def pee(lon, lat):
    lam, phi = math.radians(lon), math.radians(lat)
    th = math.asin(M * math.sin(phi))
    t2 = th * th; t6 = t2 * t2 * t2
    x = 2 * math.sqrt(3) * lam * math.cos(th) / (3 * (9 * A4 * t6 * t2 + 7 * A3 * t6 + 3 * A2 * t2 + A1))
    y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))
    return (x * WS + 2.7066 * WS, (1.3173 - y) * WS)

CONT = {"Africa": "Afrika", "Asia": "Asya", "Europe": "Avrupa", "North America": "Kuzey Amerika", "South America": "Güney Amerika", "Oceania": "Okyanusya"}

def build_world():
    cn = load("ne_110m_admin_0_countries.geojson")
    out = []
    for f in cn["features"]:
        p = f["properties"]
        if p["CONTINENT"] in ("Antarctica", "Seven seas (open ocean)"): continue
        d, c = geom_path(f["geometry"], pee, 0.35, minarea=0.4)
        if not d: continue
        out.append({"id": p["ADM0_A3"], "name": p.get("NAME_TR") or p["NAME"], "en": p["NAME"], "cont": CONT.get(p["CONTINENT"], p["CONTINENT"]),
                    "cap": None, "c": [round(c[0], 1), round(c[1], 1)], "d": d})
    out.sort(key=lambda x: x["name"])
    return {"w": round(2 * 2.7066 * WS), "h": round(2 * 1.3173 * WS * 0.86), "proj": "equalEarth", "scale": WS, "countries": out}

if __name__ == "__main__":
    tr = build_tr()
    w = build_world()
    hdr = "/* Bu dosya tools/build-maps.py ile üretildi. Kaynak: Natural Earth (kamu malı), naturalearthdata.com */\n"
    with open(os.path.join(OUT, "harita-tr.js"), "w", encoding="utf-8") as fh:
        fh.write(hdr + "(function(){App.data=App.data||{};App.data.mapTR=" + json.dumps(tr, ensure_ascii=False, separators=(",", ":")) + ";})();\n")
    with open(os.path.join(OUT, "harita-dunya.js"), "w", encoding="utf-8") as fh:
        fh.write(hdr + "(function(){App.data=App.data||{};App.data.mapWorld=" + json.dumps(w, ensure_ascii=False, separators=(",", ":")) + ";})();\n")
    print("tr", len(tr["prov"]), "il,", len(tr["nb"]), "komşu,", len(tr["rivers"]), "akarsu,", len(tr["lakes"]), "göl;", "dünya", len(w["countries"]), "ülke")
