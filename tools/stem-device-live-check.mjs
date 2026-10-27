// Explicit real-model test. Requires the already verified local GGUF and llama-server.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import crypto from 'node:crypto';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{olustur}=require('../desktop/device.js');
const manifest=JSON.parse(fs.readFileSync('stem-model-manifest.json','utf8'));
const model=process.env.STEM_LIVE_MODEL,engine=process.env.STEM_LIVE_ENGINE;
assert(model&&engine,'Set STEM_LIVE_MODEL and STEM_LIVE_ENGINE explicitly');
const hash=crypto.createHash('sha256');for await(const chunk of fs.createReadStream(model))hash.update(chunk);assert.equal(hash.digest('hex'),manifest.sha256);
const home=path.resolve('dist/qa/stem-real-device'),folder=path.join(home,'sayisal-model/modeller');fs.mkdirSync(folder,{recursive:true});
const target=path.join(folder,manifest.file);if(!fs.existsSync(target))fs.linkSync(path.resolve(model),target);fs.writeFileSync(target+'.verified',manifest.sha256);
process.resourcesPath=path.dirname(path.dirname(path.dirname(engine)));
const manager=olustur({userData:home,stem:true,bildir:()=>{},log:()=>{}});
const started=Date.now();
try{
 const st=await manager.baslat();assert.equal(st.asama,'hazir',st.hata);const base=manager.adres('sohbet');
 const res=await fetch(base+'/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'kampusai-stem-v2',messages:[{role:'system',content:'Türkçe kısa çöz. Son satır Sonuç: olsun.'},{role:'user',content:'2x + 3 = 11 denkleminde x kaçtır?'}],temperature:.1,max_tokens:256,stream:true})});assert(res.ok);
 const body=await res.text();const events=body.split('\n').filter(x=>x.startsWith('data: {')).map(x=>JSON.parse(x.slice(6)));const answer=events.map(e=>e.choices?.[0]?.delta?.content||'').join('');assert(events.some(e=>e.choices?.[0]?.finish_reason==='stop'));assert.match(answer,/Sonuç:[^\n]*4/);
 fs.writeFileSync('dist/qa/stem-device-real-report.json',JSON.stringify({real_model:true,ollama_used:false,python_used:false,sha256:manifest.sha256,engine:'llama.cpp',elapsed_ms:Date.now()-started,answer},null,2));
 console.log('Real Q8 model loaded and streamed through desktop device manager without Ollama or Python; complete response saved.');
}finally{manager.durdur();}
