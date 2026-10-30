// Dependency-free authoring gate. Empty drafts cannot become published lesson content.
export function validateLesson(lesson,{forPublication=false,sourceModule}={}){
  const errors=[];
  const check=(ok,message)=>{if(!ok)errors.push(message);};
  if(!lesson||typeof lesson!=='object'||Array.isArray(lesson))return ['Lesson must be an object'];
  check(lesson.schemaVersion===1,'Unsupported schema');
  check([9,10,11,12,null].includes(lesson.grade),'Invalid grade');
  check(typeof lesson.program==='string'&&/^[a-z0-9-]+$/.test(lesson.program),'Invalid programme');
  check(typeof lesson.unitId==='string'&&/^\d+$/.test(lesson.unitId),'Invalid unit ID');
  check(typeof lesson.officialCode==='string'&&lesson.officialCode.length>=3,'Missing official code');
  check(typeof lesson.source?.url==='string'&&/^https:\/\/(?:tymm|mufredat)\.meb\.gov\.tr\//.test(lesson.source.url),'Invalid source URL');
  if(lesson.source?.pages!==undefined)check(Array.isArray(lesson.source.pages)&&lesson.source.pages.length>0&&lesson.source.pages.every(p=>Number.isInteger(p)&&p>0),'Invalid PDF page references');
  check(typeof lesson.source?.sha256==='string'&&/^[a-f0-9]{64}$/.test(lesson.source.sha256),'Missing source hash');
  check(['draft','reviewed'].includes(lesson.status),'Invalid status');
  check(typeof lesson.title==='string','Title must be text');
  check(typeof lesson.content?.anlatim==='string','Lesson body must be text');
  check(Array.isArray(lesson.content?.ornekler)&&lesson.content.ornekler.every(e=>typeof e.soru==='string'&&e.soru.trim()&&typeof e.cozum==='string'&&e.cozum.trim()),'Invalid solved examples');
  check(Array.isArray(lesson.content?.ozet)&&lesson.content.ozet.every(s=>typeof s==='string'&&s.trim()),'Invalid summary');
  check(typeof lesson.review?.alignmentApproved==='boolean'&&typeof lesson.review?.contentApproved==='boolean','Missing review flags');
  check(lesson.review?.reviewer===null||typeof lesson.review?.reviewer==='string','Invalid reviewer');
  check(['unverified','original','open-licensed','permission-granted'].includes(lesson.rights?.status),'Missing rights status');
  check(lesson.rights?.licence===null||typeof lesson.rights?.licence==='string','Invalid licence');
  check(Array.isArray(lesson.rights?.sourceUrls)&&lesson.rights.sourceUrls.length>0&&lesson.rights.sourceUrls.every(s=>typeof s==='string'&&/^https?:\/\//.test(s)),'Missing source links');
  if(forPublication||lesson.status==='reviewed'){
    check(lesson.status==='reviewed','Draft cannot be published');
    check(lesson.title?.trim().length>=5,'Title is too short');
    check(lesson.content?.anlatim?.trim().length>=400,'Lesson body is too short');
    check(lesson.content?.ornekler?.length>=1,'At least one solved example is required');
    check(lesson.content?.ozet?.length>=2,'At least two summary items are required');
    check(lesson.review?.alignmentApproved===true&&lesson.review?.contentApproved===true,'Content and alignment review are required');
    check(typeof lesson.review?.reviewer==='string'&&lesson.review.reviewer.trim().length>=2,'Reviewer is required');
    check(['original','open-licensed','permission-granted'].includes(lesson.rights?.status),'Unverified rights cannot be published');
    check(typeof lesson.rights?.licence==='string'&&lesson.rights.licence.trim().length>=3,'Licence or permission record is required');
    check(!!sourceModule,'Official source module is required');
  }
  if(sourceModule){
    const unit=Array.isArray(sourceModule.units)?sourceModule.units.find(u=>u.id===lesson.unitId):undefined;
    check(lesson.program===sourceModule.slug&&lesson.grade===sourceModule.grade,'Source programme/grade mismatch');
    check(Array.isArray(unit?.codes)&&unit.codes.includes(lesson.officialCode),'Code does not exist in the source unit');
    check(unit?.url===lesson.source?.url&&unit?.sourceSha256===lesson.source?.sha256,'Source changed or mismatched; review again');
  }
  return errors;
}
