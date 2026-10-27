"""Split selected weights under GitHub's per-asset limit; ship a small installer bundle."""
import argparse,hashlib,json,shutil,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main(a):
    source=Path(a.model);out=Path(a.out);out.mkdir(parents=True,exist_ok=True);parts=[];full=hashlib.sha256()
    with source.open('rb') as f:
        i=0
        while True:
            first=f.read(4*1024*1024)
            if not first:break
            i+=1;name=source.name+f'.part{i:02d}';h=hashlib.sha256();size=0
            with (out/name).open('wb') as dest:
                chunk=first
                while chunk:
                    dest.write(chunk);h.update(chunk);full.update(chunk);size+=len(chunk)
                    if size==1_700_000_000:break
                    chunk=f.read(min(4*1024*1024,1_700_000_000-size))
            parts.append(dict(name=name,size=size,sha256=h.hexdigest(),url='https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/'+name))
    manifest=dict(version=1,release='v1.39.0',model='kampusai-stem-v2',file=source.name,size=source.stat().st_size,sha256=full.hexdigest(),
        quantization='Q8_0',adapter_strength=.2,base='Qwen/Qwen2.5-3B-Instruct',base_revision='aa8e72537993ba99e69dfaafa59ed015b17504d1',
        license='qwen-research',usage='Non-commercial research and evaluation only',parts=parts)
    (ROOT/'stem-model-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8')
    bundle=out/'KampusAI-STEM-Kurulum-1.39.0.zip'
    with zipfile.ZipFile(bundle,'w',compression=zipfile.ZIP_DEFLATED) as z:
        for src,name in [('server/stem_service.py','stem_service.py'),('server/requirements-stem.txt','requirements-stem.txt'),
            ('tools/install-stem-model.py','install-stem-model.py'),('stem-model-manifest.json','model-manifest.json'),
            ('MODEL_LICENSE_QWEN.txt','MODEL_LICENSE_QWEN.txt'),('MODEL_NOTICE.txt','MODEL_NOTICE.txt'),('STEM_MODEL.md','KURULUM.md'),
            ('STEM_MODEL.md','STEM_MODEL.md'),('STEM_DATASET.md','STEM_DATASET.md'),('STEM_MODEL_CARD.md','STEM_MODEL_CARD.md'),
            ('STEM_MODEL_REPORT.json','STEM_MODEL_REPORT.json'),('stem-model-manifest.json','stem-model-manifest.json')]:z.write(ROOT/src,name)
    print(json.dumps(manifest,indent=2));print('Installer:',bundle)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--model',required=True);p.add_argument('--out',required=True);main(p.parse_args())
