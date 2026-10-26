"""Reproducible assistant-only LoRA continuation; original weights never modified."""
import argparse, dataclasses, hashlib, json, os, random, time
from pathlib import Path
os.environ['TOKENIZERS_PARALLELISM']='false'
import numpy as np, torch
from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments, TrainerCallback, set_seed
from peft import LoraConfig, get_peft_model
from datasets import Dataset

def main(a):
    set_seed(42);torch.set_num_threads(6);out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
    tokenizer=AutoTokenizer.from_pretrained(a.base,local_files_only=True)
    tokenizer.pad_token=tokenizer.eos_token;tokenizer.padding_side='right'
    lengths=[]
    def load(split):
        records=[]
        for line in (Path(a.data)/(split+'.jsonl')).read_text(encoding='utf8').splitlines():
            row=json.loads(line);m=row['messages'];prefix=tokenizer.apply_chat_template(m[:2],tokenize=True,add_generation_prompt=True)
            ids=tokenizer.apply_chat_template(m,tokenize=True,add_generation_prompt=False)
            # Transformers 5 may return BatchEncoding for tokenize=True.
            if hasattr(ids,'keys'):ids=ids['input_ids']
            if hasattr(prefix,'keys'):prefix=prefix['input_ids']
            assert ids[:len(prefix)]==prefix,'Chat template prefix mismatch'
            lengths.append(len(ids))
            if len(ids)>a.max_length:raise ValueError(f'Example {row["id"]} has {len(ids)} tokens; refusing silent truncation')
            records.append(dict(input_ids=ids,attention_mask=[1]*len(ids),labels=[-100]*len(prefix)+ids[len(prefix):]))
        return Dataset.from_list(records)
    train,validation=load('train'),load('validation')
    def collate(rows):
        n=((max(len(r['input_ids']) for r in rows)+7)//8)*8
        return {k:torch.tensor([r[k]+[(-100 if k=='labels' else tokenizer.pad_token_id if k=='input_ids' else 0)]*(n-len(r[k])) for r in rows],dtype=torch.long)
                for k in ['input_ids','attention_mask','labels']}
    model=AutoModelForCausalLM.from_pretrained(a.base,local_files_only=True,dtype=torch.bfloat16,device_map={'':'cuda:0'},attn_implementation='sdpa')
    model.config.use_cache=False
    model=get_peft_model(model,LoraConfig(r=16,lora_alpha=32,target_modules=['q_proj','k_proj','v_proj','o_proj'],lora_dropout=.05,bias='none',task_type='CAUSAL_LM'))
    model.print_trainable_parameters()
    args=TrainingArguments(output_dir=str(out/'checkpoints'),per_device_train_batch_size=a.batch_size,per_device_eval_batch_size=1,
        gradient_accumulation_steps=max(1,8//a.batch_size),num_train_epochs=a.epochs,learning_rate=3e-5,warmup_steps=max(1,round(len(train)*a.epochs/8*.06)),weight_decay=.01,
        bf16=True,gradient_checkpointing=True,gradient_checkpointing_kwargs={'use_reentrant':False},
        logging_steps=10,save_strategy='epoch',eval_strategy='epoch',load_best_model_at_end=True,metric_for_best_model='eval_loss',
        save_total_limit=2,report_to='none',dataloader_num_workers=0,optim='adamw_torch',seed=42,disable_tqdm=True)
    class Progress(TrainerCallback):
        def on_log(self,args,state,control,logs=None,**kwargs):
            (out/'progress.json').write_text(json.dumps({'step':state.global_step,'epoch':state.epoch,'logs':logs},default=str),encoding='utf8')
            print('PROGRESS',state.global_step,logs,flush=True)
    trainer=Trainer(model=model,args=args,train_dataset=train,eval_dataset=validation,data_collator=collate,processing_class=tokenizer,callbacks=[Progress()])
    before=trainer.evaluate();start=time.monotonic()
    result=trainer.train(resume_from_checkpoint=a.resume or None)
    final=trainer.evaluate();adapter=out/'adapter';model.save_pretrained(adapter);tokenizer.save_pretrained(adapter)
    report=dict(base=str(Path(a.base).resolve()),gpu=torch.cuda.get_device_name(),train_examples=len(train),validation_examples=len(validation),
        token_length=dict(max=max(lengths),p95=float(np.percentile(lengths,95)),median=float(np.median(lengths))),
        epochs=a.epochs,assistant_only_loss=True,silent_truncation=False,initial=before,final=final,
        seconds=time.monotonic()-start,train_metrics=result.metrics,history=trainer.state.log_history,
        best_checkpoint=trainer.state.best_model_checkpoint,torch=torch.__version__)
    (out/'training-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    # Merge on CPU to avoid doubling GPU weight memory; retain adapter and original base.
    trainer.model.to('cpu');torch.cuda.empty_cache();merged=trainer.model.merge_and_unload();merged.config.use_cache=True
    merged.save_pretrained(out/'merged',safe_serialization=True,max_shard_size='4GB');tokenizer.save_pretrained(out/'merged')
    print('TRAINING_AND_MERGE_COMPLETED',flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--data',required=True);p.add_argument('--out',required=True)
    p.add_argument('--epochs',type=float,default=2);p.add_argument('--max-length',type=int,default=1024);p.add_argument('--batch-size',type=int,choices=[1,2,4],default=1);p.add_argument('--resume');main(p.parse_args())
