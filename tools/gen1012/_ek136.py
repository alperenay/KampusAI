# -*- coding: utf-8 -*-
r"""1.36+: 10–12. sınıfların MEB programına göre tamamlanması. <ders><sınıf>_ek136.py dosyasındaki yamaları
üreticinin çıktısına uygular. Mevcut ünite/kazanım kimlikleri değişmez (ilerleme, not ve test kayıtları korunur):
  KOD     {"u1/k1": "BİY.10.1.1"}          kazanım kodu (resmî program kodu)
  ANLATIM {"u1/k1": "markdown"}            anlatımın sonuna eklenen bölüm(ler)
  ORNEK   {"u1/k1": [(soru, cozum), …]}    örneklerin sonuna eklenen çözümlü örnekler
  OZET    {"u1/k1": ["…", …]}              özetin sonuna eklenen maddeler
  EK      {"u2": [O(...), …]}              ünitenin sonuna eklenen yeni kazanımlar
  YENI    [U(...), …]                      dersin sonuna eklenen yeni üniteler/temalar
  ONCE    [U(...), …]                      dersin başına eklenen yeni üniteler (ör. yeni programın temaları)
  AD      {"u1": ("ad", "name")}           ünite adının değiştirilmesi (kimlik aynı kalır)
Kullanım (üreticide write()'tan hemen önce):  from _ek136 import uygula136; uygula136(units, "mat10")"""
import importlib, re


def _fmt(md):
    return re.sub(r"^(#{1,6} [^\n]+)\n(?!\n)", r"\1\n\n", md.strip(), flags=re.M)


def uygula136(units, ders):
    try:
        m = importlib.import_module(ders + "_ek136")
    except ModuleNotFoundError:
        return units
    ids = {u["id"]: u for u in units}
    for uid, lst in getattr(m, "EK", {}).items():
        assert uid in ids, "%s_ek136: bilinmeyen ünite %s" % (ders, uid)
        var = {o["id"] for o in ids[uid]["outcomes"]}
        for o in lst:
            assert o["id"] not in var, "%s_ek136: %s/%s zaten var" % (ders, uid, o["id"])
            var.add(o["id"]); ids[uid]["outcomes"].append(o)
    for u in getattr(m, "YENI", []):
        assert u["id"] not in ids, "%s_ek136: ünite %s zaten var" % (ders, u["id"])
        units.append(u); ids[u["id"]] = u
    for u in reversed(getattr(m, "ONCE", [])):
        assert u["id"] not in ids, "%s_ek136: ünite %s zaten var" % (ders, u["id"])
        units.insert(0, u); ids[u["id"]] = u
    for uid, (tr, en) in getattr(m, "AD", {}).items():
        assert uid in ids, "%s_ek136: bilinmeyen ünite %s" % (ders, uid)
        ids[uid]["name"] = {"tr": tr, "en": en}
    by = {}
    for u in units:
        for o in u["outcomes"]:
            by[u["id"] + "/" + o["id"]] = o
    def get(k):
        assert k in by, "%s_ek136: bilinmeyen kazanım %s" % (ders, k)
        return by[k]
    for k, v in getattr(m, "KOD", {}).items():
        get(k)["code"] = v
    for k, v in getattr(m, "ANLATIM", {}).items():
        c = get(k)["content"]; c["anlatim"] = c["anlatim"].rstrip() + "\n\n" + _fmt(v)
    for k, v in getattr(m, "ORNEK", {}).items():
        get(k)["content"]["ornekler"] += [{"soru": q.strip(), "cozum": a.strip()} for q, a in v]
    for k, v in getattr(m, "OZET", {}).items():
        get(k)["content"]["ozet"] += [s.strip() for s in v]
    _temiz(units)
    return units


def _temiz(x):
    """Ham (r"…") dizelerde kalan ters eğik çizgili tırnakları düz tırnağa çevirir."""
    it = x.items() if isinstance(x, dict) else enumerate(x) if isinstance(x, list) else ()
    for k, v in list(it):
        if isinstance(v, str):
            x[k] = v.replace(chr(92) + '"', '"')
        else:
            _temiz(v)
