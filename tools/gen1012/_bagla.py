# -*- coding: utf-8 -*-
r"""Bir üretici dosyasına 1.34.0 ek kazanım kancasını ekler (bir kez). Kullanım: python _bagla.py mat11 kim12 …"""
import sys

for ad in sys.argv[1:]:
    p = ad + ".py"
    s = open(p, encoding="utf-8").read()
    kanca = '\n\nfrom _ek134 import uygula  # noqa: E402\nuygula(units, "%s_ek134")\n' % ad
    if "_ek134 import" in s:
        print(p, "zaten bağlı"); continue
    i = s.rindex("\nwrite(")
    open(p, "w", encoding="utf-8").write(s[:i] + kanca + s[i:])
    print(p, "bağlandı")
