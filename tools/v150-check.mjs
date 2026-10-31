import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
const p = new Map(),
  App = {
    utils: { esc: String },
    prefs: {
      get: (k, d) => (p.has(k) ? p.get(k) : d),
      set: (k, v) => p.set(k, v),
    },
    i18n: { lang: "tr" },
  };
const c = vm.createContext({ App, Date, Math, Set, window:{dispatchEvent(){}}, CustomEvent:class{} });
for (const f of ["js/data/tool-categories.js", "js/core/workspace-navigation.js", "js/modules/ai-favorites.js"])
  vm.runInContext(fs.readFileSync(f, "utf8"), c);
assert.equal(App.toolCategories.groups.length, 8);
const routes = App.toolCategories.groups.flatMap((g) => g.routes);
assert.equal(new Set(routes).size, routes.length);
assert.equal(App.toolCategories.groupFor("ph/session").id, "science");
assert.equal(App.toolCategories.groupFor("duello").id, "practice");
const F = App.aiFavorites;
assert.equal(F.tools.length, 12);
assert.deepEqual(Array.from(F.pins()), ["solve", "coach", "summary"]);
assert.equal(F.saveCustom({ title: "", prompt: "x" }), null);
assert.equal(F.saveCustom({ title: "a", prompt: "x".repeat(3001) }), null);
const id = F.saveCustom({
  title: "Kendi çalışmam",
  prompt: "Kaynak uydurma: ",
  coach: true,
});
assert.ok(id.startsWith("custom:"));
F.toggle(id);
assert.ok(F.pins().includes(id));
assert.equal(F.move(id, -1), true);
assert.equal(F.saveCustom({ id, title: "Yeni ad", prompt: "Yeni içerik" }), id);
assert.equal(F.customTools()[0].tr, "Yeni ad");
assert.equal(
  F.saveCustom({ id: "solve", title: "Overwrite", prompt: "bad" }),
  null,
);
F.removeCustom(id);
assert.ok(!F.pins().includes(id));
p.set("aiCustomTools", [
  null,
  { id: "solve", tr: "bad", prompt: "bad" },
  { id: "custom:ok", tr: "a", prompt: "b" },
  { id: "custom:ok", tr: "dupe", prompt: "b" },
]);
assert.equal(F.customTools().length, 1);
p.set("favoritesV2", F.tools.map(x=>"ai:"+x.id));
assert.equal(F.toggle("custom:ok"), true);
assert.equal(F.pins().length,13);
p.set("favoritesV2", [null, "ai:unknown", "ai:solve", "ai:solve"]);
assert.deepEqual(Array.from(F.pins()),["solve"]);
// Shared list validates all persisted keys and enforces one combined limit.
App.hub={TOOLS:Array.from({length:40},(_,i)=>['page'+i,'note',['Page '+i,'Page '+i]])};
p.set('favoritesV2',[]);
for(let i=0;i<32;i++)assert.equal(App.favorites.toggle('tool:page'+i),true);
assert.equal(App.favorites.toggle('tool:page32'),false);
assert.equal(App.favorites.toggle('ai:solve'),false);
assert.equal(App.favorites.list().length,32);
assert.equal(App.favorites.toggle('tool:page0'),false);
assert.equal(App.favorites.toggle('ai:solve'),true);
p.set('favoritesV2',[null,{},'tool:missing','ai:solve','ai:solve']);
assert.deepEqual(Array.from(App.favorites.list()),['ai:solve']);
assert.equal(App.workspaceNavigation.visible('kariyer'),false);
assert.equal(App.workspaceNavigation.visible('hedefim'),true);
assert.equal(App.workspaceNavigation.permitted('arastirma'),false);
App.workspaceNavigation.setMode('educator');assert.equal(App.workspaceNavigation.permitted('arastirma'),true);
console.log(
  "v150: taxonomy, migration, personal templates, validation, limits and ordering passed.",
);
