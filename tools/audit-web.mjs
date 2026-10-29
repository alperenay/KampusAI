// Multi-engine audit. Separates route opening, interactive flows and simulated hardware.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const engine=process.env.UI_ENGINE||'chromium',out=path.resolve('dist/qa',engine);fs.mkdirSync(out,{recursive:true});
const suite=process.argv.includes('--full')?['all-features-ui-check','usability-ui-check','navigation-ui-check','practice-ui-check','storage-ui-check','lifecycle-ui-check','study-ui-check','research-ui-check','teacher-review-ui-check','generation-ui-check','v145-ui-check','lab-interactions-ui-check','v147-ui-check','discovery-ui-check','v149-ui-check','audio-ui-check','v150-ui-check','motion-ui-check','appearance-ui-check','polish-ui-check','startup-ui-check']:['all-features-ui-check','storage-ui-check','lifecycle-ui-check'];
const results=[];
for(const name of suite){const t=Date.now();const r=spawnSync(process.execPath,['tools/'+name+'.mjs'],{env:process.env,encoding:'utf8',timeout:240000});const output=(r.stdout||'')+(r.stderr||'');fs.writeFileSync(path.join(out,name+'.log'),output);results.push({test:name,passed:r.status===0,exit:r.status,elapsedMs:Date.now()-t,error:r.error?String(r.error):null});console.log(engine+' '+name+': '+(r.status===0?'PASS':'FAIL'));if(r.status!==0)console.log(output.slice(-3500));}
fs.writeFileSync(path.join(out,'audit-summary.json'),JSON.stringify({engine,note:'Browser engines on this host; not physical iOS/Android certification. Sensor and AI fixtures are explicitly identified by each test.',results},null,2));
if(results.some(r=>!r.passed))process.exitCode=1;
