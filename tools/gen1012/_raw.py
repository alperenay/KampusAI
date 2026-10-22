# -*- coding: utf-8 -*-
r"""Üretici dosyalarında ters bölü içeren ama r"…" olmayan dizgileri bulur ve düzeltir.
\r, \n, \t gibi kaçışlar \rightarrow, \neg, \times ifadelerini bozar.
Kullanım: python _raw.py dosya.py [dosya2.py …] [--fix]"""
import io, re, sys, tokenize

BS = "\\"


def bad(tok):
    m = re.match(r"([a-zA-Z]*)(\"\"\"|'''|\"|')", tok)
    if "r" in m.group(1).lower():
        return False
    i = 0
    while i < len(tok):
        if tok[i] == BS:
            nxt = tok[i + 1] if i + 1 < len(tok) else ""
            if nxt not in ('"', "'", BS):
                return True
            i += 2
        else:
            i += 1
    return False


def fix(tok):
    m = re.match(r"([a-zA-Z]*)\"(.*)\"$", tok, re.S)
    body, out, open_q, i = m.group(2), [], True, 0
    while i < len(body):
        if body[i] == BS and i + 1 < len(body) and body[i + 1] == '"':
            out.append("“" if open_q else "”"); open_q = not open_q; i += 2
        else:
            out.append(body[i]); i += 1
    return "r" + m.group(1) + '"' + "".join(out) + '"'


for path in [a for a in sys.argv[1:] if not a.startswith("--")]:
    src = open(path, encoding="utf-8").read()
    toks = list(tokenize.generate_tokens(io.StringIO(src).readline))
    lines = src.splitlines(True)
    edits = [t for t in toks if t.type == tokenize.STRING and bad(t.string)]
    print(path, "hatalı dizgi:", len(edits))
    if "--fix" in sys.argv and edits:
        for t in reversed(edits):
            (sr, sc), (er, ec) = t.start, t.end
            assert sr == er, "çok satırlı dizgi elle düzeltilmeli: satır %d" % sr
            ln = lines[sr - 1]
            lines[sr - 1] = ln[:sc] + fix(t.string) + ln[ec:]
        open(path, "w", encoding="utf-8").write("".join(lines))
