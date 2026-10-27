// Upgrade cleanup must remove only the retired optional model's separate cache.
import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{olustur,VARYANT}=require('../desktop/device.js');
fs.mkdirSync('dist/qa',{recursive:true});const root=fs.mkdtempSync(path.resolve('dist/qa/retired-model-'));
const retired=path.join(root,'sayisal-model'),gemma=path.join(root,'yapay-zeka/modeller');
fs.mkdirSync(path.join(retired,'modeller'),{recursive:true});fs.mkdirSync(gemma,{recursive:true});
fs.writeFileSync(path.join(retired,'modeller','old-model.gguf'),'retired model');fs.writeFileSync(path.join(gemma,'keep.gguf'),'existing Gemma');fs.writeFileSync(path.join(root,'user-notes.txt'),'keep');
olustur({userData:root,bildir:()=>{},log:()=>{}});
assert.equal(fs.existsSync(retired),false);assert.equal(fs.readFileSync(path.join(gemma,'keep.gguf'),'utf8'),'existing Gemma');assert.equal(fs.readFileSync(path.join(root,'user-notes.txt'),'utf8'),'keep');
assert.deepEqual(Object.keys(VARYANT),['tam','hafif','guclu']);
console.log('Retired model cleanup removes only its own cache; Gemma variants, model files and user files are preserved.');
