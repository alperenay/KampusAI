# -*- coding: utf-8 -*-
r"""Elle yazılmış 9. sınıf dosyaları (mat-9.js, fiz-9.js) için üretici: base/<dosya>.json (1.34 hâli) + <ders>_ek135.py
Kullanım: python tabanli.py mat   |   python tabanli.py fiz"""
import json, sys, pathlib
from _ek135 import uygula135
ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
ders = sys.argv[1]
b = json.loads((pathlib.Path(__file__).parent / "base" / (ders + "-9.json")).read_text(encoding="utf-8"))
units = uygula135(b["units"], ders)
out = ROOT / "js/data/content" / (ders + "-9.js")
out.write_text(b["header"] + "App.data.content = App.data.content || {};\nApp.data.content[\"" + b["key"] + "\"] = " + json.dumps(units, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print(out.name, "kazanımlar", sum(len(u["outcomes"]) for u in units))
