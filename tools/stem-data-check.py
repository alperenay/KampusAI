"""Independent reference cases and leakage tests for the authored curriculum."""
import importlib.util, json, math, tempfile
from pathlib import Path
spec=importlib.util.spec_from_file_location('stem_dataset',Path(__file__).parents[1]/'egitim/scripts/stem_dataset.py')
d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
families={f['id']:f for f in d.FAMILIES}
# Expected values are independently worked examples, not obtained by invoking the generator's formula.
cases=[('m_fraction',dict(a=1,b=2,c=1,d=3),5/6),('m_ratio',dict(a=4,b=12,c=3,d=2),4),
 ('m_derivative',dict(a=2,b=3,c=1,d=1),27),('m_integral',dict(a=4,b=3,c=1,d=1),18),
 ('p_parallel',dict(a=6,b=3,c=1,d=1),2),('p_buoyancy',dict(a=2,b=1000,c=1,d=1),20000),
 ('p_spring',dict(a=8,b=3,c=1,d=1),36),('c_water',dict(a=7,b=2,c=1,d=1),4),
 ('c_gas',dict(a=2,b=300,c=2,d=1),24.6),('c_electrons',dict(a=17,b=2,c=1,d=1),15),
 ('b_dna',dict(a=100,b=200,c=1,d=1),800),('b_gc',dict(a=20,b=1,c=1,d=1),30),
 ('b_sister',dict(a=23,b=1,c=1,d=1),92),('b_peptide',dict(a=100,b=1,c=1,d=1),99),
 ('b_hardy',dict(a=3,b=1,c=1,d=1),9),('b_codons',dict(a=120,b=1,c=1,d=1),120)]
for family,args,expected in cases:
 r=d.record(families[family],args,0);assert math.isclose(r['expected'],expected,rel_tol=1e-9),family
assert 'TAMAMINDA' in families['b_dna']['question']
assert 'Dur kodonu' not in families['b_codons']['question'] or 'önce' in families['b_codons']['question']
assert not(d.TEST&d.VALID)
assert '2n=2*{a}' in families['b_sister']['question'],'Diploid validation cases must have even chromosome counts'
if Path('egitim/veri/stem-v2/train.jsonl').exists():d.verify('egitim/veri/stem-v2')
print(f'{len(cases)} independent reference cases, explicit biological assumptions and family leakage checks passed.')
