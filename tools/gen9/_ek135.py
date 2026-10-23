# -*- coding: utf-8 -*-
r"""1.35.0: 9. sınıfın tamamlanması. <ders>_ek135.py dosyasındaki yamaları üreticinin çıktısına uygular.
Mevcut ünite/kazanım kimlikleri değişmez (ilerleme, not ve test kayıtları korunur); yalnızca ekleme yapılır:
  KOD    {"u1/k1": "BİY.9.1.1"}           kazanım kodu (resmî Maarif kodu)
  ANLATIM {"u1/k1": "markdown"}           anlatımın sonuna eklenen bölüm(ler)
  ORNEK  {"u1/k1": [(soru, cozum), …]}    örneklerin sonuna eklenen çözümlü örnekler
  OZET   {"u1/k1": ["…", …]}              özetin sonuna eklenen maddeler
  EK     {"u2": [O(...), …]}              ünitenin sonuna eklenen yeni kazanımlar
Kullanım (üreticide write()'tan hemen önce):  from _ek135 import uygula135; uygula135(units, "biy")"""
import importlib, re


def _fmt(md):
    return re.sub(r"^(#{1,6} [^\n]+)\n(?!\n)", r"\1\n\n", md.strip(), flags=re.M)


def uygula135(units, ders):
    try:
        m = importlib.import_module(ders + "_ek135")
    except ModuleNotFoundError:
        return units
    by = {}
    for u in units:
        for o in u["outcomes"]:
            by[u["id"] + "/" + o["id"]] = o
    def get(k):
        assert k in by, "%s_ek135: bilinmeyen kazanım %s" % (ders, k)
        return by[k]
    for k, v in getattr(m, "KOD", {}).items():
        get(k)["code"] = v
    for k, v in getattr(m, "ANLATIM", {}).items():
        c = get(k)["content"]; c["anlatim"] = c["anlatim"].rstrip() + "\n\n" + _fmt(v)
    for k, v in getattr(m, "ORNEK", {}).items():
        get(k)["content"]["ornekler"] += [{"soru": q.strip(), "cozum": a.strip()} for q, a in v]
    for k, v in getattr(m, "OZET", {}).items():
        get(k)["content"]["ozet"] += [s.strip() for s in v]
    ids = {u["id"]: u for u in units}
    for uid, lst in getattr(m, "EK", {}).items():
        assert uid in ids, "%s_ek135: bilinmeyen ünite %s" % (ders, uid)
        var = {o["id"] for o in ids[uid]["outcomes"]}
        for o in lst:
            assert o["id"] not in var, "%s_ek135: %s/%s zaten var" % (ders, uid, o["id"])
            var.add(o["id"]); ids[uid]["outcomes"].append(o)
    return units
