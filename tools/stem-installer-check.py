import importlib.util, tempfile, hashlib, json
from pathlib import Path
spec=importlib.util.spec_from_file_location('installer',Path(__file__).with_name('install-stem-model.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
qa=Path(__file__).resolve().parents[1]/'dist/qa';qa.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(dir=qa) as directory:
    out=Path(directory);chunks=[b'GGUF-reference-',b'binary\x00data\xff'];joined=b''.join(chunks)
    parts=[]
    for i,data in enumerate(chunks):
        name=f'weights.part{i+1:02}';(out/name).write_bytes(data)
        parts.append(dict(name=name,size=len(data),sha256=hashlib.sha256(data).hexdigest(),url=m.PREFIX+name))
    manifest=dict(model='kampusai-stem-v2',file='model.gguf',size=len(joined),sha256=hashlib.sha256(joined).hexdigest(),parts=parts)
    assert m.assemble(manifest,out).read_bytes()==joined
    assert m.assemble(manifest,out).read_bytes()==joined,'Idempotent verified install'
    wrong=json.loads(json.dumps(manifest));wrong['parts'][0]['name']='../outside'
    try:m.validate(wrong);raise AssertionError('Path traversal accepted')
    except ValueError:pass
    wrong=json.loads(json.dumps(manifest));wrong['parts'][0]['url']='https://unrelated.example/payload'
    try:m.validate(wrong);raise AssertionError('Untrusted host accepted')
    except ValueError:pass
    (out/'model.gguf').unlink();(out/parts[0]['name']).write_bytes(b'corruption')
    try:m.assemble(manifest,out);raise AssertionError('Corrupt part accepted')
    except ValueError:pass
print('STEM installer: binary join, full/part SHA256, idempotence, corruption, path traversal and host allow-list passed.')
