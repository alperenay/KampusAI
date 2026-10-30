import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(new URL('../js/core/appearance-config.js',import.meta.url),'utf8'),ctx);
const c=ctx.window.KampusAppearanceConfig;
assert.equal(c.palettes.length,12);assert.equal(c.choices.style.length,5);assert.equal(c.atmospheres.length,8);
for(const raw of [null,[],false,'bad',{palette:'<script>',style:'other',font:'url(remote)',motion:'bad',intro:1,shadows:'false'}]){
  const o=c.normalize(raw);assert.equal(o.palette,'cosmic');assert.equal(o.font,'system');assert.equal(o.style,'glass');assert.equal(o.motion,'full');assert.equal(o.intro,true);assert.equal(o.shadows,true);
}
const old={v159Theme:'forest',appearanceAtmosphere:'ocean',appearanceAmbientMotion:false};
const migrated=c.read((k,f)=>k in old?old[k]:f);
assert.equal(migrated.palette,'forest');assert.equal(migrated.atmosphere,'ocean');assert.equal(migrated.ambientMotion,false);
const saved=c.read((k,f)=>k==='appearanceOptions'?{style:'paper',font:'serif',intro:false}:f);
assert.equal(saved.style,'paper');assert.equal(saved.font,'serif');assert.equal(saved.intro,false);
const lum=hex=>hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
for(const p of c.palettes)for(const theme of ['dark','light']){
  for(const color of p[theme].slice(0,2))assert.ok(ratio(color,'#ffffff')>=4.5,p.id+' '+theme+' button '+color);
  for(const surface of theme==='light'?['#edf0f5','#e6eaf2','#fcfcfe']:['#111216','#292b35','#202129'])assert.ok(ratio(p[theme][2],surface)>=4.5,p.id+' '+theme+' accent');
  const root={dataset:{},style:{setProperty(k,v){this[k]=v;}}};c.apply(root,{...saved,palette:p.id},theme);
  assert.equal(root.dataset.uiTheme,p.id);assert.equal(root.dataset.uiStyle,'paper');assert.equal(root.style['--custom-accent'],p[theme][0]);
}
console.log('Appearance: 12 dual-mode palettes, primary/hover contrast >=4.5, migration, invalid preferences and safe first-paint tokens passed.');
