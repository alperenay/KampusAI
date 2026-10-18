#!/usr/bin/env python3
"""
build-tercih.py — Tercih sekmesi verisini üretir (js/data/tercih-2025.js)

Kaynak: cngil/turkiye-university-programs (CC BY 4.0) — YÖK Atlas ve ÖSYM verilerinden derlenmiştir.
  git clone --depth 1 https://github.com/cngil/turkiye-university-programs
  python3 tools/build-tercih.py <turkiye-university-programs/data/programs.csv>

Çıktı (sözlüklerle sıkıştırılmış):
  U: [[üniversite, tür(0 devlet, 1 vakıf, 2 KKTC/yurt dışı), şehir no]]
  C: [şehir], F: [fakülte], N: [bölüm adı]
  R: [[kod, üni, fakülte, bölüm, puan türü(0 TYT,1 SAY,2 EA,3 SÖZ,4 DİL), süre, kontenjan, yerleşen,
       taban puan ×100 | 0, başarı sırası | 0, 2024 taban ×100 | 0, 2024 sıra | 0]]
  K: puan türü başına 2025 "taban puan → başarı sırası" eğrisi [[puan, sıra], …] (azalan puan)
"""
import csv, json, os, sys, re, bisect

SRC = sys.argv[1] if len(sys.argv) > 1 else "../cngil/turkiye-university-programs/data/programs.csv"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "js", "data", "tercih-2025.js")

LOW = str.maketrans("Iİ", "ıi")
UP = {"i": "İ", "ı": "I"}
KEEP = {"TOBB", "TED", "MEF", "ODTÜ", "KTO", "OSTİM", "İTÜ", "ABD", "KKTC", "TRT"}
SMALL = {"ve", "ile", "de", "da", "için"}

def tr_title(s):
    out = []
    for i, w in enumerate(s.split(" ")):
        if not w: continue
        core = re.sub(r"[()\-,.]", "", w)
        if core in KEEP: out.append(w); continue
        lw = w.translate(LOW).lower()
        if i > 0 and lw in SMALL: out.append(lw); continue
        # parantez ya da tire sonrasındaki ilk harfi de büyüt
        res, up_next = "", True
        for ch in lw:
            if up_next and ch.isalpha():
                res += UP.get(ch, ch.upper()); up_next = False
            else:
                res += ch
                if ch in "(-/": up_next = True
        out.append(res)
    return " ".join(out)

TYPES = {"TYT": 0, "SAY": 1, "EA": 2, "SÖZ": 3, "DİL": 4}
UTYPE = {"Devlet": 0, "Vakıf": 1, "KKTC": 2}

def num(x, f=float):
    try: return f(x) if x not in ("", None) else None
    except ValueError: return None

def main():
    rows = list(csv.DictReader(open(SRC, encoding="utf-8")))
    y24 = {r["program_code"]: r for r in rows if r["year"] == "2024"}
    y25 = [r for r in rows if r["year"] == "2025" and r["score_type"] in TYPES]
    y25 = [r for r in y25 if "KKTC Uyruklu" not in r["program_name"]]
    U, C, F, N = {}, {}, {}, {}
    def idx(d, k):
        if k not in d: d[k] = len(d)
        return d[k]
    R = []
    curves = {t: [] for t in TYPES.values()}
    for r in y25:
        city = tr_title(r["city"]) if r["city"] else ""
        ci = idx(C, city)
        ut = UTYPE.get(r["university_type"], 2)
        uname = tr_title(r["university"])
        if uname not in U: U[uname] = [uname, ut, ci]
        ui = list(U).index(uname) if False else None
        sc = num(r["min_placement_score"]); rk = num(r["last_placed_rank"], lambda v: int(float(v)))
        p24 = y24.get(r["program_code"], {})
        sc24 = num(p24.get("min_placement_score")); rk24 = num(p24.get("last_placed_rank"), lambda v: int(float(v)))
        t = TYPES[r["score_type"]]
        R.append([int(r["program_code"]), uname, idx(F, r["faculty"] or ""), idx(N, r["program_name"]), t,
                  num(r["duration_years"], lambda v: int(float(v))) or (2 if t == 0 else 4),
                  num(r["quota"], lambda v: int(float(v))) or 0, num(r["placed_count"], lambda v: int(float(v))) or 0,
                  round(sc * 100) if sc else 0, rk or 0, round(sc24 * 100) if sc24 else 0, rk24 or 0])
        if sc and rk and ut != 2: curves[t].append((sc, rk))
    ulist = list(U.values())
    uidx = {u[0]: i for i, u in enumerate(ulist)}
    for row in R: row[1] = uidx[row[1]]

    # Puan → sıra eğrisi: 1 puanlık kutularda ortanca sıra, sonra tekdüzeleştir (puan düştükçe sıra artar)
    K = {}
    for t, pts in curves.items():
        if len(pts) < 50: continue
        b = {}
        for sc, rk in pts: b.setdefault(int(sc), []).append(rk)
        knots = sorted(((s, sorted(v)[len(v) // 2]) for s, v in b.items()), key=lambda x: -x[0])
        mono, best = [], 0
        for s, rk in knots:
            best = max(best, rk); mono.append([s, best])
        # seyrelt: en fazla ~160 düğüm
        step = max(1, len(mono) // 160)
        K[t] = mono[::step] + ([mono[-1]] if mono[-1] not in mono[::step] else [])
    data = {"y": 2025, "U": ulist, "C": list(C), "F": list(F), "N": list(N), "R": R, "K": K,
            "src": "cngil/turkiye-university-programs (CC BY 4.0) · YÖK Atlas, ÖSYM"}
    js = "/* tools/build-tercih.py ile üretildi. Kaynak: cngil/turkiye-university-programs (CC BY 4.0), YÖK Atlas ve ÖSYM verileri. */\n" + \
         "(function(){App.data=App.data||{};App.data.tercih=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";})();\n"
    open(OUT, "w", encoding="utf-8").write(js)
    print(len(R), "program,", len(ulist), "üniversite,", len(C), "şehir,", len(N), "bölüm adı;", {k: len(v) for k, v in K.items()}, "boyut", len(js) // 1024, "KB")

if __name__ == "__main__":
    main()
