# -*- coding: utf-8 -*-
r"""1.34.0 kazanım genişletmesi: <ders><sınıf>_ek134.py dosyalarındaki EK sözlüğünü ilgili ünitelerin sonuna,
YENI listesindeki üniteleri dersin sonuna ekler. Mevcut ünite/kazanım kimlikleri değişmez; yeni kazanımlar
ünitedeki son kimliğin ardından numaralanır (ilerleme ve not kayıtları korunur).
Kullanım (üretici dosyasında write() çağrısından hemen önce):
    from _ek134 import uygula; uygula(units, "mat10_ek134")"""
import importlib


def uygula(units, modul):
    m = importlib.import_module(modul)
    ek, yeni = getattr(m, "EK", {}), getattr(m, "YENI", [])
    ids = {u["id"] for u in units}
    for k in ek:
        assert k in ids, "%s: bilinmeyen ünite %s" % (modul, k)
    for u in units:
        var = {o["id"] for o in u["outcomes"]}
        for o in ek.get(u["id"], []):
            assert o["id"] not in var, "%s: %s/%s zaten var" % (modul, u["id"], o["id"])
            var.add(o["id"])
            u["outcomes"].append(o)
    for u in yeni:
        assert u["id"] not in ids, "%s: ünite %s zaten var" % (modul, u["id"])
        units.append(u)
