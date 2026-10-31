import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const App={};vm.runInNewContext(fs.readFileSync('js/modules/ph-model.js','utf8'),{App});const M=App.phModel,near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
assert.equal(M.read(M.empty()).ph,null);
near(M.read(M.pour(M.empty(),'water',100)).ph,7);
let acid=M.pour(M.empty(),'acid2',100);near(M.read(acid).ph,2);acid=M.pour(acid,'water',900);near(M.read(acid).ph,3);
let base=M.pour(M.empty(),'base12',100);near(M.read(base).ph,12);base=M.pour(base,'water',900);near(M.read(base).ph,11);
const neutral=M.pour(M.pour(M.empty(),'acid2',100),'base12',100);near(M.read(neutral).ph,7);
near(M.read(M.drain(acid,100)).ph,M.read(acid).ph);assert.equal(M.read(M.drain(acid,2000)).ph,null);
let full=M.pour(M.empty(),'water',10000);near(full.volume,1.2);near(M.pour(full,'acid2',100).moles,0);
for(const value of [NaN,Infinity,-1,0,'100',null])assert.throws(()=>M.pour(M.empty(),'water',value));assert.throws(()=>M.pour(M.empty(),'unknown',100));assert.throws(()=>M.read({volume:1,moles:999}));
for(const id of ['acid2','acid3','base12','base11']){let s=M.pour(M.empty(),id,25),last=M.read(s).ph;for(let i=0;i<40;i++){s=M.pour(s,'water',25);const p=M.read(s).ph;assert.ok(Number.isFinite(p)&&p>=0&&p<=14);assert.ok(Math.abs(p-7)<=Math.abs(last-7)+1e-9);last=p;}}
console.log('Virtual pH: water autoionisation, log dilution, acid/base neutralisation, mixed drain, capacity, empty/invalid states and monotonic dilution passed.');
