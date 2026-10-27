"""Shrink a trained LoRA update to preserve base generalisation; never relabel base weights as trained."""
import argparse,json
from pathlib import Path
import torch
from transformers import AutoModelForCausalLM,AutoTokenizer
from peft import PeftModel
def main(a):
    torch.set_num_threads(6)
    base=AutoModelForCausalLM.from_pretrained(a.base,local_files_only=True,dtype=torch.bfloat16,device_map={'':'cpu'})
    model=PeftModel.from_pretrained(base,a.adapter,local_files_only=True)
    changed=0
    for module in model.modules():
        if hasattr(module,'set_scale') and hasattr(module,'scaling') and 'default' in module.scaling:
            module.set_scale('default',a.scale);changed+=1
    assert changed==144,changed
    out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
    merged=model.merge_and_unload();merged.config.use_cache=True
    merged.save_pretrained(out,safe_serialization=True,max_shard_size='4GB')
    AutoTokenizer.from_pretrained(a.adapter,local_files_only=True).save_pretrained(out)
    (out/'adapter-strength.json').write_text(json.dumps({'adapter':str(Path(a.adapter).resolve()),'scale':a.scale,'modules':changed,'training_completed':True}),encoding='utf8')
    print('Scaled trained adapter merged:',a.scale,changed,flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--adapter',required=True);p.add_argument('--out',required=True);p.add_argument('--scale',type=float,default=.2);main(p.parse_args())
