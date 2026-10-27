import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const settings={stemToken:'test-token',stemServiceUrl:'http://127.0.0.1:8766'};
let mode='ok';
const ctx={App:{utils:{esc:s=>String(s)},i18n:{lang:'tr'},prefs:{get:(k,d)=>settings[k]??d},router:{register(){}},markdown:{render:s=>s}},URL,TextDecoder,AbortController,
 fetch:async(url,opts)=>{
  assert.equal(opts.headers.Authorization,'Bearer test-token');
  if(mode==='http')return new Response('{"detail":"Bağlantı kodu hatalı."}',{status:401});
  let body=mode==='bad'?'not-json\n':mode==='partial'?'\{"delta":"yarım"}\n':[{delta:'Adım 1: çığ şüphe değil.\n'},{delta:'Sonuç: $x=4$'},{done:true,truncated:false}].map(x=>JSON.stringify(x)).join('\n')+'\n';
  const bytes=new TextEncoder().encode(body);
  return new Response(new ReadableStream({start(c){for(let i=0;i<bytes.length;i+=2)c.enqueue(bytes.slice(i,i+2));c.close()}}));
 }};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/modules/stem.js','utf8'),ctx);
const stem=ctx.App.stem;
for(const u of ['file:///x','javascript:alert(1)','https://user:password@x.test','https://x.test/?token=secret'])assert.throws(()=>stem.endpoint(u));
assert.equal(stem.endpoint('https://example.test/stem/'),'https://example.test/stem');
assert.equal(stem.mathText('Sonuç: x = 4'),'Sonuç: $x = 4$');
assert.equal(stem.mathText('Sonuç: 4 mol'),'Sonuç: $4$ mol');
assert.equal(stem.mathText('Adım 1: Eşitliği koruyarak çıkar.'),'Adım 1: Eşitliği koruyarak çıkar.');
assert.equal(stem.mathText('Sonuç: $x=4$'),'Sonuç: $x=4$');
assert.equal(stem.mathText('2x = 8\nx = 4'),'$2x = 8$\n$x = 4$');
let last='';const answer=await stem.solve('x+3=7','Matematik',new AbortController().signal,t=>last=t);
assert.equal(answer.text,'Adım 1: çığ şüphe değil.\nSonuç: $x=4$');assert.equal(last,answer.text);
for(const state of ['http','bad','partial']){mode=state;await assert.rejects(stem.solve('x+3=7','Fizik',new AbortController().signal));}
await assert.rejects(stem.solve('x','Fizik',new AbortController().signal));
console.log('STEM client: split UTF-8 streaming, HTTP/malformed/incomplete errors, URL credentials and input validation passed.');
