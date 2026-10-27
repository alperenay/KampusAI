"""Convert completed merged weights to F16 and Q4_K_M; register separate Ollama names."""
import argparse, hashlib, json, os, subprocess
from pathlib import Path
def run(cmd):
    print('Running:', ' '.join(map(str,cmd)),flush=True);subprocess.run(list(map(str,cmd)),check=True)
def main(a):
    out=Path(a.out).resolve();out.mkdir(parents=True,exist_ok=True)
    f16=out/'KampusAI-STEM-3B-v2-F16.gguf';q4=out/'KampusAI-STEM-3B-v2-Q4_K_M.gguf'
    run([os.sys.executable,Path(a.llama)/'convert_hf_to_gguf.py',Path(a.model).resolve(),'--outfile',f16,'--outtype','f16','--model-name','KampusAI-STEM-3B-v2'])
    # Older Windows builds accept narrow paths. Use ASCII relative filenames in the
    # output directory so a profile path such as Masaüstü is not corrupted.
    subprocess.run([str(Path(a.quantize).resolve()),f16.name,q4.name,'Q4_K_M','4'],cwd=out,check=True)
    for path,name in [(f16,a.name+'-f16'),(q4,a.name)]:
        mod=out/('Modelfile-'+('F16' if path==f16 else 'Q4_K_M'))
        mod.write_text('FROM "'+path.as_posix()+'"\nPARAMETER temperature 0.1\nPARAMETER num_ctx 4096\nPARAMETER num_predict 768\n',encoding='utf8')
        run(['ollama','create',name,'-f',mod])
    manifest=dict(model=a.name,architecture='Qwen2.5-3B-Instruct',license='qwen-research',use='Non-commercial research/evaluation only',
        modified=True,notice='Built with Qwen. Continued fine-tuning, verified curriculum and quantization by KampüsAI.',
        file=q4.name,size=q4.stat().st_size,sha256=hashlib.file_digest(q4.open('rb'),'sha256').hexdigest())
    (out/'model-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8');print(json.dumps(manifest),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--model',required=True);p.add_argument('--llama',required=True);p.add_argument('--quantize',required=True);p.add_argument('--out',required=True);p.add_argument('--name',default='kampusai-stem-v2');main(p.parse_args())
