"""Güvenli hesap makinesi — yapay zekanın "hesapla" aracı (uygulamadaki js/ai/calc.js ile aynı kurallar).

Model işlemi kafadan yapmak yerine bir ifade gönderir, sonucu biz hesaplarız:
  hesapla("(3/4 + 2/3) * 12")  →  "17"
  hesapla("sqrt(2)^2 + log(1000)") → "5"
  hesapla("sin(30) + comb(5,2)")   → "10.5"     (açılar derece)
Kod çalıştırılmaz: ifade ayrıştırılıp yalnızca izin verilen işlemler uygulanır.
"""
import ast
import math
import operator
from fractions import Fraction

ISLEM = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul, ast.Div: operator.truediv,
         ast.Pow: operator.pow, ast.Mod: operator.mod, ast.FloorDiv: operator.floordiv}
TEKLI = {ast.UAdd: operator.pos, ast.USub: operator.neg}
SABIT = {"pi": math.pi, "π": math.pi, "e": math.e}


def _derece(f):
    return lambda x: f(math.radians(x))


FONK = {
    "sqrt": math.sqrt, "kok": math.sqrt, "cbrt": lambda x: math.copysign(abs(x) ** (1 / 3), x),
    "abs": abs, "round": round, "floor": math.floor, "ceil": math.ceil,
    "sin": _derece(math.sin), "cos": _derece(math.cos), "tan": _derece(math.tan),
    "asin": lambda x: math.degrees(math.asin(x)), "acos": lambda x: math.degrees(math.acos(x)),
    "atan": lambda x: math.degrees(math.atan(x)),
    "log": lambda x, b=10: math.log(x, b), "ln": math.log, "log2": math.log2,
    "factorial": math.factorial, "fakt": math.factorial, "comb": math.comb, "perm": math.perm,
    "gcd": math.gcd, "lcm": math.lcm, "ebob": math.gcd, "ekok": math.lcm,
    "min": min, "max": max,
}


def _deger(n):
    if isinstance(n, ast.Expression):
        return _deger(n.body)
    if isinstance(n, ast.Constant) and isinstance(n.value, (int, float)):
        return Fraction(n.value) if isinstance(n.value, int) else n.value
    if isinstance(n, ast.Name) and n.id in SABIT:
        return SABIT[n.id]
    if isinstance(n, ast.BinOp) and type(n.op) in ISLEM:
        a, b = _deger(n.left), _deger(n.right)
        if isinstance(n.op, ast.Pow):
            if abs(float(b)) > 1000 or abs(float(a)) > 1e100:
                raise ValueError("üs çok büyük")
            if isinstance(b, Fraction) and b.denominator != 1:
                b = float(b)
            if isinstance(a, Fraction) and isinstance(b, Fraction):
                return a ** int(b)
            if float(a) < 0 and not float(b).is_integer():
                raise ValueError("negatif sayının kesirli kuvveti gerçek sayı değil (küp kök için cbrt kullan)")
            return float(a) ** float(b)
        return ISLEM[type(n.op)](a, b)
    if isinstance(n, ast.UnaryOp) and type(n.op) in TEKLI:
        return TEKLI[type(n.op)](_deger(n.operand))
    if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id in FONK and not n.keywords:
        args = [_deger(a) for a in n.args]
        if n.func.id in ("factorial", "fakt", "comb", "perm", "gcd", "lcm", "ebob", "ekok"):
            args = [int(a) for a in args]
            if any(a > 500 for a in args):
                raise ValueError("sayı çok büyük")
        else:
            args = [float(a) if isinstance(a, Fraction) else a for a in args]
        return FONK[n.func.id](*args)
    raise ValueError("izin verilmeyen ifade")


def yaz(x):
    if isinstance(x, Fraction):
        return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator} (≈ {float(x):.6g})"
    if isinstance(x, float):
        if x.is_integer() and abs(x) < 1e15:
            return str(int(x))
        return f"{x:.10g}"
    return str(x)


def hesapla(ifade):
    """Sonucu metin olarak döndürür; hata olursa açıklamasını döndürür (model düzeltip tekrar dener)."""
    s = str(ifade).strip().replace("^", "**").replace("×", "*").replace("÷", "/").replace("√", "sqrt").replace(",", ",")
    if len(s) > 300:
        return "Hata: ifade çok uzun"
    try:
        return yaz(_deger(ast.parse(s, mode="eval")))
    except ZeroDivisionError:
        return "Hata: sıfıra bölme"
    except Exception as e:  # noqa: BLE001 — her hata modele açıklama olarak döner
        return f"Hata: {e}"


ARAC = {"type": "function", "function": {
    "name": "hesapla",
    "description": ("Bir matematik ifadesini kesin olarak hesaplar. Toplama, çarpma, kesir, üs, kök gibi her sayısal "
                    "işlemde kafadan hesaplamak yerine bunu kullan. Desteklenenler: + - * / ^ % ( ), sqrt, cbrt, abs, "
                    "sin/cos/tan (derece), log(x) (10 tabanı), log(x, b), ln, factorial, comb(n,r), perm(n,r), gcd, lcm, pi, e."),
    "parameters": {"type": "object", "properties": {"ifade": {"type": "string", "description": "Ör. (3/4 + 2/3) * 12"}},
                   "required": ["ifade"]}}}

if __name__ == "__main__":
    for t in ["(3/4 + 2/3) * 12", "sqrt(2)^2 + log(1000)", "sin(30) + comb(5,2)", "2^10", "1/3 + 1/6", "10/0", "__import__('os')",
              "log(8, 2)", "factorial(6)/perm(5,2)", "-3^2", "(-8)^(1/3)"]:
        print(t, "→", hesapla(t))
