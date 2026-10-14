# -*- coding: utf-8 -*-
"""9. sınıf ders notları (kullanıcının PDF/Word notları) → js/data/content/<ders>-9.js
Ortak yardımcılar. Biçim fiz-9.js / mat-9.js ile aynı:
  ünite   { id, name: {tr, en}, outcomes: [...] }
  kazanım { id, code, title: {tr, en}, content: { anlatim, ornekler: [{soru, cozum}], ozet: [...] } }
Metinler Markdown (+ gerektiğinde LaTeX)."""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent


def O(id, code, tr, en, anlatim, ornekler=(), ozet=()):
    return {"id": id, "code": code, "title": {"tr": tr, "en": en},
            "content": {"anlatim": re.sub(r"^(#{1,6} [^\n]+)\n(?!\n)", r"\1\n\n", anlatim.strip(), flags=re.M),
                        "ornekler": [{"soru": q.strip(), "cozum": a.strip()} for q, a in ornekler],
                        "ozet": [s.strip() for s in ozet]}}


def U(id, tr, en, outcomes):
    return {"id": id, "name": {"tr": tr, "en": en}, "outcomes": outcomes}


def write(fname, key, title, source, units, note=""):
    out = ROOT / "js/data/content" / fname
    header = ("/* =========================================================\n"
              "   " + title + "\n"
              "   Kaynak: " + source + "\n"
              + ("   " + note + "\n" if note else "") +
              "   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).\n\n"
              "   Biçim (curriculum-data.js ile aynı):\n"
              "     ünite   { id, name, outcomes: [...] }\n"
              "     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }\n"
              "   ========================================================= */\n"
              "App.data.content = App.data.content || {};\n"
              "App.data.content[\"" + key + "\"] = ")
    out.write_text(header + json.dumps(units, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    n = sum(len(u["outcomes"]) for u in units)
    print(fname, "üniteler", len(units), "kazanımlar", n, "bayt", out.stat().st_size)
