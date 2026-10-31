import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
class E extends Error{constructor(code,message='',extra={}){super(message);this.code=code;Object.assign(this,extra);}}
const prefs=new Map(),App={ollama:{OllamaError:E},prefs:{get:(k,d)=>prefs.has(k)?prefs.get(k):d,set:(k,v)=>prefs.set(k,v)},config:{serverUrl:'https://fixture.invalid'},i18n:{lang:'tr'},utils:{esc:String}};
const ctx=vm.createContext({App,console,Date,Math,Set,Map,AbortController,setTimeout,clearTimeout,performance,TextDecoder,TextEncoder,crypto,fetch,Response,ReadableStream});
for(const f of ['js/ai/request-scope.js','js/ai/cloud.js','js/ai/pipeline.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let r=App.aiRequest.scope(null,{connectMs:10,totalMs:100});await assert.rejects(r.wait(new Promise(()=>{})),e=>e.code==='timeout');r.close();
const outer=new AbortController();r=App.aiRequest.scope(outer.signal,{connectMs:100});const pending=r.wait(new Promise(()=>{}));outer.abort();await assert.rejects(pending,e=>e.code==='aborted');r.close();
r=App.aiRequest.scope(null,{connectMs:100,firstMs:10,idleMs:100,totalMs:200});r.ready();await sleep(20);assert.throws(()=>r.check('part'),e=>e.code==='timeout'&&e.partial==='part');r.close();
r=App.aiRequest.scope(null,{connectMs:100,firstMs:100,idleMs:10});r.ready();r.activity();await sleep(20);assert.throws(()=>r.check('partial'),e=>e.code==='timeout'&&e.partial==='partial');r.close();
r=App.aiRequest.scope(null,{connectMs:10});r.close();await sleep(20);assert.equal(r.signal.aborted,false);
const calls=[];ctx.fetch=async(url,init)=>{calls.push(JSON.parse(init.body));return new Response('data: '+JSON.stringify({candidates:[{content:{parts:[{text:'Merhaba!'}]}}]})+'\n\n',{headers:{'content-type':'text/event-stream'}});};
prefs.set('srvModel','gemini-3.5-flash-lite');let ans=await App.cloud.server.chat({model:'gemini-3.5-flash-lite',messages:[{role:'user',content:'Merhaba'}],options:{smallTalk:true}});assert.equal(ans.text,'Merhaba!');assert.equal(calls[0].generationConfig.thinkingConfig.thinkingLevel,'minimal');assert.equal(calls[0].generationConfig.maxOutputTokens,256);
ctx.fetch=async()=>new Response('data: {"candidates":[{"content":{"parts":[{"text":"part"}]}}]}\n\n',{headers:{'content-type':'text/event-stream'}});const abort=new AbortController();await assert.rejects(App.cloud.server.chat({model:'gemini-3.5-flash-lite',messages:[{role:'user',content:'x'}],signal:abort.signal,onDelta:()=>abort.abort()}),e=>e.code==='aborted'&&e.partial==='part');
let memory=0,system='',delta='';App.engine={resolve:async()=>({id:'test',kind:'cloud',prepare:async()=>{},config:()=>({chatModel:'fixture',direct:true}),chat:async o=>{system=o.messages[0].content;o.onDelta('Merhaba','Merhaba');return{text:'Merhaba'};}})};App.rag={retrieve:async()=>{memory++;throw new Error('Unexpected RAG');}};
ans=await App.ai.run({text:'Merhaba!',useData:true,on:{delta:t=>delta=t}});assert.equal(memory,0);assert.equal(ans.text,'Merhaba');assert.equal(delta,'Merhaba');assert.ok(system.length<500);assert.ok(!App.ai.isSmallTalk('Merhaba, integral nedir?'));assert.ok(!App.ai.isSmallTalk('Merhaba',{}));assert.ok(App.ai.isSmallTalk('Hello!'));
console.log('AI reliability: finite deadlines, ignored-promise timeout, explicit abort/partial preservation, timer cleanup, low-thinking greeting request, no RAG for exact greetings, structured pipeline retained. Synthetic transport tests, not model quality claims.');

// Model discovery is not a per-question operation, including complex requests.
prefs.delete('srvModel');prefs.set('srvSpeed','fast');prefs.delete('srvAutoModel');
let listings=0,requests=0;
ctx.fetch=async(url,init)=>{
 if(String(url).includes('/models?')){listings++;await sleep(15);return Response.json({models:[{name:'models/gemini-3.5-flash-lite',supportedGenerationMethods:['generateContent']},{name:'models/gemini-3.8-flash',supportedGenerationMethods:['generateContent']}]});}
 requests++;return new Response('data: {"candidates":[{"content":{"parts":[{"text":"4"}]}}]}\n\n',{headers:{'content-type':'text/event-stream'}});
};
await Promise.all([App.cloud.server.prepare(),App.cloud.server.prepare()]);assert.equal(listings,1,'coalesce setup');
for(const profile of ['fast','complex','default','complex']){await App.cloud.server.prepare();const c=App.cloud.server.config();assert.equal(c.chatModel,'gemini-3.5-flash-lite');await App.cloud.server.chat({model:c.chatModel,messages:[{role:'user',content:'x'}],profile});}
assert.equal(listings,1,'no rediscovery for questions');assert.equal(requests,4);
prefs.set('srvAutoAt',1);await App.cloud.server.prepare();assert.equal(listings,1,'working selection survives old TTL');
await App.cloud.server.prepare(undefined,true);assert.equal(listings,2,'explicit refresh still works');
const cancelled=new AbortController();cancelled.abort();await assert.rejects(App.cloud.server.prepare(cancelled.signal),e=>e.code==='aborted');
console.log('Stable model selection: one shared discovery, four question profiles, persisted model, explicit refresh and cancellation passed.');

// The onboarding scroll deadline must resolve even if the browser pauses rAF.
const tourSource=fs.readFileSync('js/modules/tour.js','utf8');
const settleSource=tourSource.slice(tourSource.indexOf('  function settle(target) {'),tourSource.indexOf('  function build()'));
let cancelledFrame=false;
const settleCtx=vm.createContext({Date,setTimeout,clearTimeout,requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{cancelledFrame=true;}});
vm.runInContext(settleSource,settleCtx);
const started=Date.now();await settleCtx.settle({getBoundingClientRect:()=>({top:0,left:0})});
assert.ok(Date.now()-started<3000);assert.ok(cancelledFrame);
console.log('Tour scroll settling: independent deadline and frame cleanup when rAF is paused passed.');
