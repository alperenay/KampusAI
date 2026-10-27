// Native desktop downloader integration: real HTTP range requests and binary files, no inference fixtures.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url),{olustur,STEM_VARIANT}=require('../desktop/device.js');
const manifest=JSON.parse(fs.readFileSync('stem-model-manifest.json','utf8'));
const real=STEM_VARIANT.stem.dosyalar[0];
assert.equal(real.sha256,manifest.sha256);assert.deepEqual(real.parts,manifest.parts);
const native=fs.readFileSync('mobile/native/DeviceAi.java','utf8');
for(const part of manifest.parts)for(const value of [part.sha256,part.url,String(part.size)])assert(native.includes(value));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const parts=[Buffer.from([0,255,10,13,45,0,191]),Buffer.from('Çözüm α x=4','utf8')],joined=Buffer.concat(parts);
let corrupt=false,requests=0,ranges=0;
const server=http.createServer((req,res)=>{requests++;const index=Number(req.url.slice(-1)),data=corrupt?Buffer.alloc(parts[index].length,42):parts[index];const start=Number((req.headers.range||'').match(/bytes=(\d+)/)?.[1]||0);if(start)ranges++;res.writeHead(start?206:200,{'Content-Length':data.length-start,'Content-Range':`bytes ${start}-${data.length-1}/${data.length}`});res.end(data.subarray(start));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
fs.mkdirSync('dist/qa',{recursive:true});const dir=fs.mkdtempSync(path.resolve('dist/qa/stem-device-contract-'));
process.resourcesPath=path.join(dir,'resources');fs.mkdirSync(path.join(process.resourcesPath,'llama'),{recursive:true});fs.writeFileSync(path.join(process.resourcesPath,'llama','llama-server.exe'),'existence fixture, never executed');
const profile={id:'sohbet',ad:'fixture.gguf',boyut:joined.length,sha256:hash(joined),parts:parts.map((b,i)=>({name:`fixture.part0${i}`,size:b.length,sha256:hash(b),url:`http://127.0.0.1:${server.address().port}/part${i}`}))};
STEM_VARIANT.stem.dosyalar=[profile];
try{
 const home=path.join(dir,'success');fs.mkdirSync(path.join(home,'sayisal-model/modeller'),{recursive:true});
 fs.writeFileSync(path.join(home,'sayisal-model/modeller/fixture.part00.part'),parts[0].subarray(0,3));
 const states=[],manager=olustur({userData:home,stem:true,bildir:s=>states.push(s),log:()=>{}});
 assert.equal(manager.bilgi().kurulu,false);await manager.indir('stem');assert.equal(manager.bilgi().kurulu,true);assert.equal(manager.bilgi().asama,'kurulu');
 assert.deepEqual(fs.readFileSync(path.join(home,'sayisal-model/modeller/fixture.gguf')),joined);assert.equal(ranges,1);
 const count=requests;await manager.indir('stem');assert.equal(requests,count,'Verified installed model must not download again');
 const ordinary=path.join(home,'yapay-zeka');fs.mkdirSync(ordinary,{recursive:true});fs.writeFileSync(path.join(ordinary,'keep'),'user Gemma');manager.sil();assert(fs.existsSync(path.join(ordinary,'keep')),'STEM removal must preserve Gemma');
 corrupt=true;const broken=olustur({userData:path.join(dir,'corrupt'),stem:true,bildir:()=>{},log:()=>{}});await broken.indir('stem');assert.equal(broken.bilgi().asama,'hata');assert.equal(broken.bilgi().kurulu,false);assert.match(broken.bilgi().hata,/SHA256/);
 assert(states.some(x=>x.asama==='iniyor'));
 console.log('STEM device: manifest/native parity, resumable binary download, per-part and full SHA256, idempotence, corrupt rejection and separate Gemma storage passed.');
}finally{STEM_VARIANT.stem.dosyalar=[real];await new Promise(r=>server.close(r));}
