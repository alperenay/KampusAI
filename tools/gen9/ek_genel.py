# -*- coding: utf-8 -*-
r"""1.42+: içerik üreticilerine genel yama uygulayıcı (gen9 ve gen1012 ortak).
<modül>.py dosyası şu adlardan istediklerini tanımlar (biçim _ek136.py ile aynı):
  YENI    [U(...), …]                 dersin sonuna eklenen yeni üniteler
  EK      {"u2": [O(...), …]}         ünitenin sonuna eklenen yeni kazanımlar
  KOD / ANLATIM / ORNEK / OZET / AD   _ek136.py'deki gibi
Mevcut ünite/kazanım kimlikleri değişmez (öğrencinin ilerleme, not ve test kayıtları korunur).
Kullanım (üreticide write()'tan hemen önce):  from ek_genel import uygula; uygula(units, "biy10_ek142")"""
import importlib, re, sys, pathlib

_HERE = pathlib.Path(__file__).resolve().parent
for d in (_HERE, _HERE.parent / "gen1012"):
    if str(d) not in sys.path:
        sys.path.insert(0, str(d))


def _fmt(md):
    return re.sub(r"^(#{1,6} [^\n]+)\n(?!\n)", r"\1\n\n", md.strip(), flags=re.M)


def _temiz(x):
    it = x.items() if isinstance(x, dict) else enumerate(x) if isinstance(x, list) else ()
    for k, v in list(it):
        if isinstance(v, str):
            x[k] = v.replace(chr(92) + '"', '"')
        else:
            _temiz(v)


def uygula(units, modul):
    try:
        m = importlib.import_module(modul)
    except ModuleNotFoundError:
        return units
    ids = {u["id"]: u for u in units}
    for uid, lst in getattr(m, "EK", {}).items():
        assert uid in ids, "%s: bilinmeyen ünite %s" % (modul, uid)
        var = {o["id"] for o in ids[uid]["outcomes"]}
        for o in lst:
            assert o["id"] not in var, "%s: %s/%s zaten var" % (modul, uid, o["id"])
            var.add(o["id"]); ids[uid]["outcomes"].append(o)
    for u in getattr(m, "YENI", []):
        assert u["id"] not in ids, "%s: ünite %s zaten var" % (modul, u["id"])
        units.append(u); ids[u["id"]] = u
    for uid, (tr, en) in getattr(m, "AD", {}).items():
        ids[uid]["name"] = {"tr": tr, "en": en}
    by = {u["id"] + "/" + o["id"]: o for u in units for o in u["outcomes"]}
    for k, v in getattr(m, "KOD", {}).items():
        by[k]["code"] = v
    for k, v in getattr(m, "ANLATIM", {}).items():
        c = by[k]["content"]; c["anlatim"] = c["anlatim"].rstrip() + "\n\n" + _fmt(v)
    for k, v in getattr(m, "ORNEK", {}).items():
        by[k]["content"]["ornekler"] += [{"soru": q.strip(), "cozum": a.strip()} for q, a in v]
    for k, v in getattr(m, "OZET", {}).items():
        by[k]["content"]["ozet"] += [s.strip() for s in v]
    _temiz(units)
    return units
