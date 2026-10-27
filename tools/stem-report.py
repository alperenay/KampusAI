"""Publish synthetic measurement evidence, excluding secrets, private datasets and local paths."""
import json,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];R=ROOT/'egitim/rapor/stem-v2';out=ROOT/'egitim/dagitim/stem-release-1.39.0';out.mkdir(parents=True,exist_ok=True)
load=lambda p:json.loads(Path(p).read_text(encoding='utf8'))
original=load(R/'protocol3-original-final-test.json');selected=load(R/'protocol3-selected-final-test.json');base=load(R/'protocol3-base-reference-test.json')
assert original['benchmark_sha256']==selected['benchmark_sha256']==base['benchmark_sha256']
assert original['count']==selected['count']==base['count']==48
validation={}
candidate_ids={'soru-asistani':'original-user-f16','qwen2.5-3b':'clean-base-q4',
    'kampusai-stem-continued-f16':'continued-two-phase-f16','kampusai-stem-continued-q4':'continued-two-phase-q4',
    'kampusai-stem-v2-f16':'clean-full-strength-f16','kampusai-stem-v2':'clean-full-strength-q4',
    'kampusai-stem-scaled-f16':'clean-strength-0.2-f16','kampusai-stem-scaled':'clean-strength-0.2-q4',
    'kampusai-stem-scaled-q8':'selected-clean-strength-0.2-q8'}
for p in R.glob('protocol3-*-validation.json'):
    d=load(p)
    candidate=candidate_ids[p.stem.removeprefix('protocol3-').removesuffix('-validation')]
    if d['count']==32:validation[candidate]={'alias_at_measurement':d['model'],'correct':d['correct'],'count':d['count'],'by_subject':d['by_subject'],'benchmark_sha256':d['benchmark_sha256']}
report=dict(started_at='2026-10-27T02:25:32+03:00',experimental=True,license='qwen-research',
    dataset=load(ROOT/'egitim/veri/stem-v2-final/quality-report.json'),model=load(ROOT/'stem-model-manifest.json'),
    selection={'source':'clean Qwen base + actually trained LoRA, strength 0.2, Q8_0','selected_using':'32 validation questions only, before final test',
               'reason':'Full-strength continuation and Q4 generalisation was worse; original model preserved.'},
    test={name:{k:d[k] for k in ['model','count','correct','accuracy','median_seconds','by_subject','benchmark_sha256','metric','protocol']} for name,d in [('original',original),('selected',selected),('clean_base_control',base)]},
    validation=validation,base_superiority_not_overcome=True,
    limitations=['Small synthetic numeric/protocol benchmark; not expert-validated exam accuracy.',
                 'Clean base control scored higher than the trained selected model on final test.',
                 'Units and every reasoning step are not automatically certified.',
                 'Physical camera, Safari and on-device Android/iOS model inference not verified.'])
(ROOT/'STEM_MODEL_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
with zipfile.ZipFile(out/'KampusAI-STEM-Olcumler-1.39.0.zip','w',compression=zipfile.ZIP_DEFLATED) as z:
    z.write(ROOT/'STEM_MODEL_REPORT.json','STEM_MODEL_REPORT.json')
    for file in ['protocol3-original-final-test.json','protocol3-selected-final-test.json','protocol3-base-reference-test.json']:
        z.writestr(file,json.dumps(load(R/file),ensure_ascii=False,indent=2))
    for p in R.glob('protocol3-*-validation.json'):
        d=load(p);candidate=candidate_ids[p.stem.removeprefix('protocol3-').removesuffix('-validation')]
        d['candidate_id']=candidate;d['alias_at_measurement']=d.pop('model')
        z.writestr(candidate+'-validation.json',json.dumps(d,ensure_ascii=False,indent=2))
    for name in ['stem-v2','stem-v2-final','stem-v2-cleanbase']:
        d=load(ROOT/f'egitim/cikti/{name}/training-report.json');d['base']='local preserved base; see model card';d['best_checkpoint']=Path(d['best_checkpoint']).name
        z.writestr(name+'-training.json',json.dumps(d,ensure_ascii=False,indent=2))
    for file,name in [('dist/stem-live-report.json','real-gateway-smoke.json'),('dist/stem-ocr/report.json','real-ocr.json'),('MODEL_LICENSE_QWEN.txt','MODEL_LICENSE_QWEN.txt'),('MODEL_NOTICE.txt','MODEL_NOTICE.txt')]:z.write(ROOT/file,name)
print('Evidence written. Test original/selected/clean base:',original['correct'],selected['correct'],base['correct'])
