"""Real Ollama inference benchmark. Scores final numeric answer only, not proof validity."""
import argparse, collections, hashlib, json, math, re, statistics, time
from pathlib import Path
import requests
from fractions import Fraction

def number(answer):
    # Require an explicit final-answer line; never accept a number found anywhere in reasoning.
    matches=list(re.finditer(r'(?:sonu[çc]|nihai\s+cevap|cevap)\s*[:=]\s*([^\n]+)',answer,re.I))
    if not matches:return None
    line=matches[-1].group(1).replace('**','').replace('$','').replace(',','.').strip().split('=')[-1]
    scientific=re.search(r'([-+]?\d+(?:\.\d+)?)\s*(?:\\times|\\cdot|×|\*)\s*10\s*\^\s*\{?([-+]?\d+)\}?',line)
    if scientific:return float(scientific[1])*10**int(scientific[2])
    latex=re.search(r'\\(?:d?frac)\{([-+\d.]+)\}\{([-+\d.]+)\}',line)
    if latex:
        try:return float(latex[1])/float(latex[2])
        except (ValueError,ZeroDivisionError):return None
    m=re.search(r'(?<![a-zA-Z])([-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)(?:\s*/\s*([-+]?\d+(?:\.\d+)?))?',line)
    if not m:return None
    try:return float(m[1])/(float(m[2]) if m[2] else 1)
    except (ValueError,ZeroDivisionError):return None
def summarize(model,data,items):
    for x in items:
        x['predicted']=number(x['answer'])
        x['correct']=x['predicted'] is not None and math.isclose(x['predicted'],x['expected'],rel_tol=.001,abs_tol=.001)
    return dict(model=model,split=Path(data).stem,dataset_sha256=hashlib.sha256(Path(data).read_bytes()).hexdigest(),
        benchmark_sha256=hashlib.sha256(json.dumps([(x['id'],x['question'],x['expected']) for x in items],ensure_ascii=False).encode()).hexdigest(),
        protocol=3,parser_version=2,max_predict=512,metric='Explicit final numeric answer within 0.1% in requested units; numeric/format score, not an automatic certification of units, reasoning or exam generalisation.',count=len(items),
        correct=sum(x['correct'] for x in items),accuracy=sum(x['correct'] for x in items)/len(items),
        median_seconds=statistics.median(x['seconds'] for x in items),by_subject={s:dict(count=len(xs),correct=sum(x['correct'] for x in xs))
            for s in sorted({x['subject'] for x in items}) if (xs:=[x for x in items if x['subject']==s])},items=items)
def evaluate(model,data,out,limit=None):
    out=Path(out);out.parent.mkdir(parents=True,exist_ok=True)
    rows=[json.loads(x) for x in Path(data).read_text(encoding='utf8').splitlines()]
    if limit:rows=rows[:limit]
    previous=json.loads(out.read_text(encoding='utf8')) if out.exists() else None
    if previous and previous.get('protocol')!=3:raise ValueError('Use a new output file for protocol 3 (explicit units, 512 output tokens).')
    prior=previous['items'] if previous else []
    done={x['id']:x for x in prior};items=[]
    for i,row in enumerate(rows):
        if row['id'] in done:items.append(done[row['id']]);continue
        start=time.monotonic()
        question=row['messages'][1]['content']+'\nKısa çöz. Son satırı Sonuç: biçiminde yaz.'+((' Sayısal sonucu '+row['unit']+' cinsinden ver.') if row.get('unit') else '')
        messages=[row['messages'][0],{'role':'user','content':question}]
        payload={'model':model,'messages':messages,'stream':False,'keep_alive':'5m',
                 'options':{'temperature':0,'num_ctx':2048,'num_predict':512,'seed':42}}
        for attempt in range(3):
            r=requests.post('http://127.0.0.1:11434/api/chat',json=payload,timeout=(10,180))
            if r.status_code not in (429,500,503) or attempt==2:break
            print(f'Retrying transient Ollama HTTP {r.status_code}',flush=True)
            requests.post('http://127.0.0.1:11434/api/generate',json={'model':model,'keep_alive':0},timeout=30)
            time.sleep(1+attempt)
        r.raise_for_status();body=r.json();answer=body['message']['content'];pred=number(answer)
        item=dict(id=row['id'],subject=row['subject'],family=row['family'],question=question,expected=row['expected'],unit=row.get('unit',''),
            predicted=pred,correct=pred is not None and math.isclose(pred,row['expected'],rel_tol=.001,abs_tol=.001),
            seconds=round(time.monotonic()-start,3),answer=answer,finish=body.get('done_reason'),eval_count=body.get('eval_count'))
        items.append(item)
        summary=summarize(model,data,items)
        out.write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8')
        print(f"{model} {i+1}/{len(rows)} {item['subject']} correct={item['correct']} {item['seconds']}s",flush=True)
    summary=summarize(model,data,items);out.write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8')
    return summary
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--model',required=True);p.add_argument('--data',required=True);p.add_argument('--out',required=True);p.add_argument('--limit',type=int);a=p.parse_args()
    s=evaluate(a.model,a.data,a.out,a.limit);print(json.dumps({k:v for k,v in s.items() if k!='items'},ensure_ascii=False))
