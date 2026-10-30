import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const aliases = {}, prefs = new Map([['pinnedTools', ['sensor', 'lab', 'sismograf', 'konular', 'telefon-fizik']]]);
const App = { router: { alias: (a,b) => aliases[a]=b, register() {} }, utils: {}, prefs: { get: (k,d) => prefs.get(k) ?? d, set: (k,v) => prefs.set(k,v) } };
const ctx = vm.createContext({ App });
for (const file of ['science-lab-model', 'science-lab']) vm.runInContext(fs.readFileSync('js/modules/'+file+'.js','utf8'), ctx);
const M = App.scienceLabModel, near = (a,b) => assert.ok(Math.abs(a-b) < 1e-8, `${a} != ${b}`);
const base = M.evaluate('rc'); near(base.samples[0].y, 0); near(base.probe.x, 1); near(base.probe.y, 5*(1-Math.exp(-1)));
near(M.evaluate('rc', { resistance: 20 }).probe.x, 2);
near(M.evaluate('cooling').samples[0].y, 80);
near(M.evaluate('cooling').probe.y, 20 + 60/Math.E);
near(M.evaluate('cooling', { initial: 0, ambient: 20 }).probe.y, 20-20/Math.E);
near(M.evaluate('halfLife').probe.y, 50); near(M.evaluate('halfLife').samples.at(-1).y, 3.125);
for (const [angle, value] of [[0,100], [45,50], [90,0], [180,100]]) near(M.evaluate('polarization',{angle}).probe.y,value);
for (const [id, def] of Object.entries(M.experiments)) {
  for (const [key,,fallback,min,max] of def.fields) {
    for (const value of [min,fallback,max]) {
      const result = M.evaluate(id, { [key]: value });
      assert.equal(result.source, 'simulation'); assert.equal(result.samples.length,201);
      assert.ok(result.samples.every((p,i,a)=>Number.isFinite(p.t)&&Number.isFinite(p.y)&&(!i||p.t>a[i-1].t)));
    }
    for (const value of [NaN, Infinity, '', null, undefined, min-1, max+1]) assert.throws(()=>M.evaluate(id,{[key]:value}));
  }
}
for (const value of [null, [], '5', 5]) assert.throws(()=>M.evaluate('rc',value));
for (const id of ['__proto__','constructor','missing']) assert.throws(()=>M.evaluate(id));
assert.equal(aliases.sensor, 'bilim-lab/sensor'); assert.equal(aliases.lab, 'bilim-lab/deneyler');
assert.deepEqual([...prefs.get('pinnedTools')], ['bilim-lab','konular']);
for (const name of ['labs','sensor-lab','phone-physics','seismograph']) assert.doesNotMatch(fs.readFileSync('js/modules/'+name+'.js','utf8'), /App.router.register\("(?:lab|sensor|telefon-fizik|sismograf)"/);
const hub=fs.readFileSync('js/modules/hub.js','utf8'); assert.match(hub, /\["bilim-lab",/); assert.doesNotMatch(hub, /\["(?:lab|sensor)",/);
console.log('Unified science lab: model endpoints, SI conversions, boundary parameters, 201-point finite samples, source labels, legacy aliases and favourites migration passed.');
