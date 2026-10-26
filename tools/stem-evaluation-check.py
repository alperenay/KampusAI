import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parents[1]/'egitim/scripts'))
from stem_evaluate import number
assert number('Adım 1: 8 / 2 = 4') is None
assert number('Adım 1: 2\nSonuç: 3/4 mol')==.75
assert number('Sonuç: -2.5 m/s')==-2.5
assert number(r'Sonuç: $\frac{3}{4}$ mol')==.75
assert number('Sonuç: v = 3e8/4 = 7.5e7 m/s')==75000000
assert number(r'Sonuç: $1.5 \times 10^{8}$ m/s')==150000000
assert number('Sonuç: 0,25')==.25
assert number('Sonuç: 7\nSonuç: 8')==8
print('8 strict final-answer parsing cases passed; intermediate numbers never count as answers.')
