// Real gateway/model UI smoke test. No mocked OCR or model output.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';
import { uiHarness } from './ui-harness.mjs';
const token=process.env.STEM_API_TOKEN||fs.readFileSync(path.join(os.homedir(),'.kampusai/stem/connection-code.txt'),'utf8').trim();
const h=await uiHarness();
try {
 const {page:p}=await h.device('sayisal');
 await p.evaluate(token=>{App.prefs.set('stemToken',token);App.prefs.set('stemServiceUrl','http://127.0.0.1:8766')},token);
 await p.locator('#stemQuestion').fill('2x+3=11 denkleminde x kaçtır?');await p.locator('#stemSolve').click();
 await p.locator('.stem-step--result').waitFor({timeout:180000});await p.waitForFunction(()=>!document.querySelector('#stemSolve').disabled);
 assert.ok((await p.locator('#stemAnswer').innerText()).includes('4'));
 if (!(await p.locator('#stemAnswer .katex').count())) console.log('Unformatted actual answer:',await p.locator('#stemAnswer').innerText());
 assert.ok(await p.locator('#stemAnswer .katex').count());assert.deepEqual(h.errors,[]);
 await p.locator('#stemAnswer').screenshot({path:path.join(h.qa,'stem-real-model-answer.png'),animations:'disabled'});
 console.log('Real selected Ollama model → authenticated gateway → browser KaTeX answer: passed.');
}finally{await h.close();}
