// Optional adapter: no automatic imports, DOM changes, route or progress-key migrations.
const id=/^[a-z0-9_-]+$/;
function requireValue(ok,message){if(!ok)throw new TypeError('Curriculum: '+message);}
function label(value){return typeof value==='string'||(value&&typeof value.tr==='string');}
export function toAppUnits(module){
  requireValue(module?.schemaVersion===1,'unsupported schema');
  requireValue([9,10,11,12].includes(module.grade),'invalid grade');
  requireValue(typeof module.subjectId==='string'&&id.test(module.subjectId),'invalid subject');
  requireValue(Array.isArray(module.units),'units must be an array');
  const seenUnits=new Set();
  return module.units.map(unit=>{
    requireValue(typeof unit.id==='string'&&id.test(unit.id)&&!seenUnits.has(unit.id),'invalid or duplicate unit id');seenUnits.add(unit.id);
    requireValue(label(unit.name)&&Array.isArray(unit.outcomes),'invalid unit');
    const seen=new Set();
    return {id:unit.id,name:structuredClone(unit.name),outcomes:unit.outcomes.map(o=>{
      requireValue(typeof o.id==='string'&&id.test(o.id)&&!seen.has(o.id),'invalid or duplicate outcome id');seen.add(o.id);
      requireValue(o.key===[module.grade,module.subjectId,unit.id,o.id].join('/'),'progress key mismatch');
      requireValue(label(o.title)&&typeof o.content?.anlatim==='string','missing lesson');
      requireValue(Array.isArray(o.content.ornekler)&&o.content.ornekler.every(e=>typeof e.soru==='string'&&typeof e.cozum==='string'),'invalid examples');
      requireValue(Array.isArray(o.content.ozet)&&o.content.ozet.every(s=>typeof s==='string'),'invalid summary');
      return {id:o.id,code:o.localCode||'',title:structuredClone(o.title),content:structuredClone(o.content),...(o.provenance?{provenance:structuredClone(o.provenance)}:{})};
    })};
  });
}
export async function loadModule(base,grade,subjectId,{fetcher=globalThis.fetch,signal}={}){
  requireValue([9,10,11,12].includes(Number(grade))&&typeof subjectId==='string'&&id.test(subjectId),'invalid module identifier');
  const file='notes/'+Number(grade)+'/'+subjectId+'.json';
  const url=new URL(file,base);
  requireValue(['https:','http:'].includes(url.protocol),'HTTP(S) base URL required');
  const response=await fetcher(url,{signal});
  if(!response.ok)throw new Error('Curriculum module could not be loaded (HTTP '+response.status+')');
  const module=await response.json();
  requireValue(module.grade===Number(grade)&&module.subjectId===subjectId,'response module mismatch');
  return toAppUnits(module);
}
