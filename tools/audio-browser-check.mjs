// Real browser audio encoding/analysis fed only a generated signal, never a physical microphone.
import assert from 'node:assert/strict';
import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try{
 const {page}=await h.device();
 await page.evaluate(async()=>{
   const ac=new AudioContext();await ac.resume();const osc=ac.createOscillator(),gain=ac.createGain(),dest=ac.createMediaStreamDestination();osc.frequency.value=440;gain.gain.value=.2;osc.connect(gain);gain.connect(dest);osc.start();
   window.__audioReal={ac,osc,stream:dest.stream,captures:0,encoded:[],level:0};
   Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:async()=>{window.__audioReal.captures++;return dest.stream;}}});
   Object.defineProperty(window,'SpeechRecognition',{configurable:true,value:undefined});Object.defineProperty(window,'webkitSpeechRecognition',{configurable:true,value:undefined});
   App.engine.cloud=()=>({configured:()=>true,toContents:()=>{}});App.ai.transcribe=async blob=>{window.__audioReal.encoded.push({size:blob.size,type:blob.type});return 'sentetik ses testi';};
 });
 await page.addScriptTag({url:h.baseUrl+'/js/core/speech.js'});
 await page.evaluate(()=>window.__listenReal=App.speech.listen({onLevel:v=>window.__audioReal.level=Math.max(v,window.__audioReal.level),onError:c=>window.__audioReal.error=c}));
 await page.waitForFunction(()=>window.__audioReal.level>0);
 await page.waitForTimeout(1400);
 const result=await page.evaluate(async()=>{const result=await window.__listenReal.stop();window.__audioReal.osc.stop();await window.__audioReal.ac.close();return {result,captures:window.__audioReal.captures,encoded:window.__audioReal.encoded,error:window.__audioReal.error};});
 assert.equal(result.captures,1);assert.equal(result.encoded.length,1);assert.ok(result.encoded[0].size>2000);assert.match(result.encoded[0].type,/^audio\//);assert.equal(result.result.text,'sentetik ses testi');assert.equal(result.error,undefined);assert.deepEqual(h.errors,[]);
 console.log('Browser audio: one generated stream → real resumed AudioContext/meter → real MediaRecorder blob → controlled transcription adapter; no physical input or network transcription.');
}finally{await h.close();}
