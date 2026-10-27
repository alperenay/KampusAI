"""Download verified public model parts and import them into Ollama. Python stdlib only."""
import argparse, hashlib, json, os, re, shutil, subprocess, sys, time
from pathlib import Path
from urllib.request import urlopen,Request
PREFIX='https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/'
def digest(path):
    with Path(path).open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
def validate(m):
    safe=lambda n:isinstance(n,str) and re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]*',n)
    if m.get('model')!='kampusai-stem-v2' or not safe(m.get('file')) or not m['file'].endswith('.gguf'):raise ValueError('Geçersiz model manifesti.')
    if not re.fullmatch('[0-9a-f]{64}',m.get('sha256','')):raise ValueError('Geçersiz SHA256.')
    parts=m.get('parts',[])
    if not 1<=len(parts)<=8:raise ValueError('Geçersiz parça sayısı.')
    for p in parts:
        if not safe(p.get('name')) or p.get('url')!=PREFIX+p['name'] or not 0<p.get('size',0)<2_000_000_000 or not re.fullmatch('[0-9a-f]{64}',p.get('sha256','')):raise ValueError('Güvenilmeyen parça adresi veya boyutu.')
    if len({p['name'] for p in parts})!=len(parts) or sum(p['size'] for p in parts)!=m.get('size'):raise ValueError('Parça toplamı uyuşmuyor.')
def download(part,out):
    target=out/part['name']
    if target.exists() and target.stat().st_size==part['size'] and digest(target)==part['sha256']:return target
    temp=target.with_name(target.name+'.download')
    with urlopen(Request(part['url'],headers={'User-Agent':'KampusAI-STEM-Installer/1.39'}),timeout=120) as response,temp.open('wb') as f:
        total=0;last=0
        while chunk:=response.read(4*1024*1024):
            total+=len(chunk)
            if total>part['size']:raise ValueError('İndirme boyutu beklenenden büyük.')
            f.write(chunk)
            if time.monotonic()-last>5:print(part['name'],round(total/part['size']*100),'%',flush=True);last=time.monotonic()
    if temp.stat().st_size!=part['size'] or digest(temp)!=part['sha256']:raise ValueError('Parça doğrulaması başarısız; yeniden çalıştırın.')
    os.replace(temp,target);return target
def assemble(m,out):
    validate(m);out=Path(out);out.mkdir(parents=True,exist_ok=True);target=out/m['file']
    if target.exists():
        if target.stat().st_size==m['size'] and digest(target)==m['sha256']:return target
        raise ValueError('Aynı adlı farklı bir model var; ayrı bir kurulum klasörü seçin.')
    temp=target.with_name(target.name+'.tmp')
    with temp.open('wb') as dest:
        for part in m['parts']:
            source=out/part['name']
            if source.stat().st_size!=part['size'] or digest(source)!=part['sha256']:raise ValueError('Eksik veya bozuk parça: '+part['name'])
            with source.open('rb') as f:shutil.copyfileobj(f,dest,4*1024*1024)
    if temp.stat().st_size!=m['size'] or digest(temp)!=m['sha256']:raise ValueError('Birleştirilmiş model doğrulanamadı.')
    os.replace(temp,target);return target
def main(a):
    m=json.loads(Path(a.manifest).read_text(encoding='utf8'));validate(m);out=Path(a.directory).resolve();out.mkdir(parents=True,exist_ok=True)
    if not shutil.which('ollama'):raise ValueError('Önce Ollama kurun ve çalıştırın: https://ollama.com/')
    print('Model:',m['model'],'İndirme:',round(m['size']/1e9,2),'GB. Qwen araştırma lisansı: ticari olmayan kullanım.',flush=True)
    if not (out/m['file']).exists():
        required=sum(p['size'] for p in m['parts'] if not (out/p['name']).exists())+2*m['size']
        if shutil.disk_usage(out).free<required+500_000_000:raise ValueError('Model, parçalar ve Ollama kopyası için yaklaşık 11 GB boş alan gerekir.')
        for part in m['parts']:download(part,out)
    model=assemble(m,out)
    mod=out/'Modelfile';mod.write_text('FROM ./'+model.name+'\nPARAMETER temperature 0.1\nPARAMETER num_ctx 4096\nPARAMETER num_predict 768\n',encoding='utf8')
    subprocess.run(['ollama','create',m['model'],'-f','Modelfile'],cwd=out,check=True)
    print('Model doğrulandı ve Ollama içine kaydedildi. Yerel STEM servisini başlatabilirsiniz.',flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--manifest',default=str(Path(__file__).resolve().parent/'model-manifest.json'));p.add_argument('--directory',default='.kampusai-stem')
    try:main(p.parse_args())
    except (OSError,ValueError,subprocess.CalledProcessError) as e:print('Kurulum tamamlanmadı:',str(e),file=sys.stderr);sys.exit(1)
