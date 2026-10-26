"""Retain independently verified legacy skills; cap semantic variants and fix ambiguous assumptions."""
import argparse, collections, hashlib, json, math, re, random
from pathlib import Path
from stem_dataset import SYSTEM, verify

def inspect(row):
    messages=row.get('messages',[])
    if len(messages)!=3 or [m.get('role') for m in messages]!=['system','user','assistant']:return None
    subject=next((s for s in ['Matematik','Fizik','Kimya','Biyoloji'] if s.lower() in messages[0]['content'].lower()),None)
    q,a=messages[1]['content'],messages[2]['content'];tail=a.split('Sonuç:')[-1].strip()
    if 'Sonuç:' not in a:return None
    nums=lambda s:[int(n) for n in re.findall(r'\d+',s)]
    kind=None;args=None;expected=None;fixed=q
    if subject=='Matematik':
        m=re.search(r'(\d+)x\^(\d+)\s*\+\s*(\d+)x',q)
        if m:
            c,p,b=map(int,m.groups());wanted=(c*p,p-1,b)
            n=re.fullmatch(r'(\d+)x\^(\d+)\s*\+\s*(\d+)',tail)
            if not n or tuple(map(int,n.groups()))!=wanted:return None
            kind,args='polynomial_derivative',(c,p,b)
        elif (m:=re.search(r'x²\s*-\s*(\d+)x\s*\+\s*(\d+)\s*=\s*0',q)):
            total,product=map(int,m.groups());disc=total*total-4*product
            if disc<0 or math.isqrt(disc)**2!=disc:return None
            roots=sorted([(total-math.isqrt(disc))//2,(total+math.isqrt(disc))//2])
            if sorted(nums(tail))!=roots or sum(roots)!=total or math.prod(roots)!=product:return None
            kind,args='quadratic_roots',(total,product)
    elif subject=='Fizik':
        mass=re.search(r'(\d+)\s*kg',q);force=re.search(r'(\d+)\s*N',q)
        if mass and force:
            mass,force=int(mass[1]),int(force[1]);expected=force/mass
            kind,args='newton',(mass,force);fixed=q+' Uygulanan kuvvet net kuvvettir.'
        elif (m:=re.search(r'(\d+)\s*(?:metre|m)\b',q)):
            height=int(m[1]);expected=math.sqrt(height/5);kind,args='fall_time',(height,)
            fixed=q+' Hava direncini ihmal et; ilk hız sıfırdır.'
    elif subject=='Kimya':
        vol=re.search(r'(\d+)\s*(?:litre|L)\b',q);molar=re.search(r'(\d+)\s*M\b',q)
        if vol and molar:
            vol,molar=int(vol[1]),int(molar[1]);expected=vol*molar;kind,args='solution_moles',(vol,molar)
        elif (m:=re.search(r'(\d+)\s*mol\s*(?:N₂|azot)',q)):
            n=int(m[1]);expected=2*n;kind,args='ammonia',(n,);fixed=q+' Hidrojen fazladır ve tepkime tam verimlidir.'
    elif subject=='Biyoloji':
        ad=re.search(r'(\d+)\s*(?:Adenin|A)\b',q,re.I);gu=re.search(r'(\d+)\s*(?:Guanin|G)\b',q,re.I)
        if ad and gu:
            ad,gu=int(ad[1]),int(gu[1]);expected=2*ad+3*gu;kind,args='dna_bonds',(ad,gu)
            fixed=q+' Verilen baz sayıları çift zincirli DNA molekülünün tamamına aittir.'
        elif 'mitoz' in q and ('3 kez' in q or '3 mitoz' in q):
            chrom=re.search(r'2n\s*=\s*(\d+)',q)
            if chrom:
                expected=8;kind,args='mitotic_count',(int(chrom[1]),)
                fixed=q+' Her tur tüm yavru hücreler de bölünür; hücre ölümü yoktur.'
    if not kind:return None
    if expected is not None:
        n=re.match(r'\D*([-+]?\d+(?:[.,]\d+)?)',tail)
        if not n or not math.isclose(float(n[1].replace(',','.')),expected,rel_tol=1e-7):return None
    rid=hashlib.sha256((kind+repr(args)).encode()).hexdigest()
    out=dict(id=rid,family='legacy-'+kind,subject=subject,topic=kind,source='user-legacy-verified-and-clarified',
        verification='independent_question_parse_and_solution_check',semantic_parameters=args,
        messages=[{'role':'system','content':SYSTEM+' Branş: '+subject},{'role':'user','content':fixed},{'role':'assistant','content':a}])
    return out
def main(a):
    src=Path(a.source);raw=[json.loads(s) for s in src.read_text(encoding='utf8').splitlines() if s.strip()]
    seen=set();counts=collections.Counter();kept=[];reasons=collections.Counter()
    for row in raw:
        r=inspect(row)
        if not r:reasons['unverified_or_unsupported_pattern']+=1;continue
        if r['id'] in seen:reasons['semantic_duplicate']+=1;continue
        seen.add(r['id'])
        if counts[r['family']]>=48:reasons['family_cap_for_balance']+=1;continue
        counts[r['family']]+=1;kept.append(r)
    out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
    for split in ['train','validation','test']:
        rows=[json.loads(s) for s in (Path(a.curriculum)/(split+'.jsonl')).read_text(encoding='utf8').splitlines()]
        if split=='train':rows+=kept;random.Random(20261027).shuffle(rows)
        (out/(split+'.jsonl')).write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in rows),encoding='utf8')
    report=json.loads((Path(a.curriculum)/'quality-report.json').read_text(encoding='utf8'))
    report.update(original_source_sha256=hashlib.sha256(src.read_bytes()).hexdigest(),original_retained=len(kept),
        original_retained_families=dict(counts),legacy_filter_counts=dict(reasons),
        reason='Preserved verified polynomial, root-finding, inverse physics and original STEM skills; bounded semantic duplicates; clarified net force, double-stranded DNA and limiting reactant assumptions.')
    report['splits']['train']['rows']+=len(kept);report['splits']['train']['families']+=len(counts)
    subject_counts=collections.Counter(report['splits']['train']['subjects']);subject_counts.update(r['subject'] for r in kept)
    report['splits']['train']['subjects']=dict(subject_counts)
    (out/'quality-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--curriculum',required=True);p.add_argument('--out',required=True);main(p.parse_args())
