"""Real localhost gateway + EasyOCR + selected Ollama model. Never prints connection codes."""
import json,os,sys,time
from pathlib import Path
import requests
sys.path.insert(0,str(Path(__file__).parents[1]/'egitim/scripts'))
from stem_evaluate import number
token=os.environ.get('STEM_API_TOKEN') or (Path.home()/'.kampusai/stem/connection-code.txt').read_text().strip()
headers={'Authorization':'Bearer '+token};base='http://127.0.0.1:8766';items=[]
health=requests.get(base+'/health',headers=headers,timeout=15);health.raise_for_status();assert health.json()['ok']
for subject,q,expected in [('Matematik','2x+3=11 denkleminde x kaçtır?',4),('Fizik','2 kg cisme 10 N yatay net kuvvet etki ediyor. İvme kaç m/s² olur?',5),
    ('Kimya','3 litre 2 M çözeltide kaç mol çözünen bulunur?',6),('Biyoloji','Bir hücre tüm yavrularıyla birlikte 3 tur mitoz geçiriyor; ölüm yok. Kaç hücre oluşur?',8)]:
    start=time.monotonic();r=requests.post(base+'/solve',headers=headers,json={'question':q,'subject':subject},stream=True,timeout=(10,180));r.raise_for_status()
    events=[json.loads(line) for line in r.iter_lines() if line];assert events[-1].get('done') and not events[-1].get('truncated'),events[-1]
    text=''.join(e.get('delta','') for e in events);assert text.strip()
    pred=number(text);items.append(dict(subject=subject,question=q,expected=expected,predicted=pred,numeric_correct=pred==expected,seconds=round(time.monotonic()-start,3),answer=text))
images=[]
for width in [480,960,1920]:
    path=Path(f'dist/stem-ocr/question-{width}.jpg')
    r=requests.post(base+'/ocr',headers=dict(headers,**{'Content-Type':'image/jpeg'}),data=path.read_bytes(),timeout=(10,90));r.raise_for_status();data=r.json()
    assert data['requires_confirmation'] and all(n in data['text'] for n in ['2','3','11'])
    images.append(dict(source_width=width,**data))
report=dict(real_gateway=True,model=health.json()['model'],transport_complete=len(items),numeric_correct=sum(i['numeric_correct'] for i in items),
    images=images,items=items,note='Four smoke examples, not a general model-quality benchmark; no physical camera or Safari test.')
Path('dist/stem-live-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in report.items() if k not in ['items','images']},ensure_ascii=False))
