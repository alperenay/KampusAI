import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { uiHarness, navigate } from "./ui-harness.mjs";
const require = createRequire(import.meta.url),
  fflate = require("../assets/vendor/fflate/fflate.js");
const h = await uiHarness();
const source =
  "Photosynthesis uses light energy to make sugars from carbon dioxide and water. Oxygen is released. Plants use sugars for growth. ";
const pack = {
  title: "Source Study",
  summary: Array.from({ length: 4 }, (_, i) => ({
    text: "Summary " + i,
    refs: [1],
  })),
  concepts: Array.from({ length: 3 }, (_, i) => ({
    name: "Concept " + i,
    explain: "Explanation",
    refs: [1],
  })),
  cards: Array.from({ length: 4 }, (_, i) => ({
    front: "Recall " + i,
    back: "Answer " + i,
    refs: [1],
  })),
  quiz: Array.from({ length: 4 }, (_, i) => ({
    q: "Question " + i,
    options: ["Correct", "Wrong B", "Wrong C", "Wrong D"],
    answer: 0,
    explain: "Supported by source.",
    refs: [1],
  })),
};
const questions = {
  questions: Array.from({ length: 3 }, (_, i) => ({
    q: "Explain energy " + i,
    expected: "Light energy",
    criteria: ["Concept", "Explanation", "Example"],
  })),
};
const feedback = {
  criteria: [
    { score: 2, note: "Concept supported" },
    { score: 1, note: "More detail" },
    { score: 0, note: "Missing example" },
  ],
  feedback: "Add an example.",
  followup: "Where is this used?",
};
function pdf() {
  const stream = "BT /F1 12 Tf 50 700 Td (" + source + ") Tj ET",
    objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 900 800] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      "<< /Length " +
        Buffer.byteLength(stream) +
        " >>\nstream\n" +
        stream +
        "\nendstream",
    ];
  let body = "%PDF-1.4\n",
    offsets = [0];
  objects.forEach((o, i) => {
    offsets.push(Buffer.byteLength(body));
    body += i + 1 + " 0 obj\n" + o + "\nendobj\n";
  });
  const x = Buffer.byteLength(body);
  body +=
    "xref\n0 6\n0000000000 65535 f \n" +
    offsets
      .slice(1)
      .map((n) => String(n).padStart(10, "0") + " 00000 n \n")
      .join("") +
    "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" +
    x +
    "\n%%EOF";
  return Buffer.from(body);
}
try {
  const { page } = await h.device("belge-paketi");
  await page.waitForSelector("#swSource");
  await page.evaluate(() => App.startup.dismiss());
  // Real local parsing; AI/vision/speech below are controlled fixtures, not accuracy claims.
  for (const [name, type, buffer] of [
    ["notes.txt", "text/plain", Buffer.from(source)],
    [
      "notes.docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      Buffer.from(
        fflate.zipSync({
          "word/document.xml": fflate.strToU8(
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>' +
              source +
              "</w:t></w:r></w:p></w:body></w:document>",
          ),
        }),
      ),
    ],
    ["notes.odt", "application/vnd.oasis.opendocument.text", Buffer.from(fflate.zipSync({ 'content.xml': fflate.strToU8('<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"><office:body><text:p>' + source + '</text:p></office:body></office:document-content>') }))],
    ["notes.pdf", "application/pdf", pdf()],
  ]) {
    await page.setInputFiles("#swDoc", { name, mimeType: type, buffer });
    await page.click("#swRead");
    await page.waitForFunction(
      () => !document.querySelector(".sw-page").hasAttribute("aria-busy"),
    );
    assert.match(
      await page.locator("#swSource").inputValue(),
      /Photosynthesis/,
      "Real " + name + " text extraction",
    );
  }
  await page.setInputFiles("#swDoc", {
    name: "bad.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("not a pdf"),
  });
  await page.click("#swRead");
  await page.waitForFunction(
    () => !document.querySelector(".sw-page").hasAttribute("aria-busy"),
  );
  assert.ok(await page.locator(".sw-status").textContent());
  await page.evaluate(
    ({ pack, questions, feedback }) => {
      window.__ws = { calls: [], pack, questions, feedback };
      App.ai.generate = async (o) => {
        window.__ws.calls.push(o);
        if (o.image)
          return {
            data: o.prompt.includes("assignment")
              ? {
                  title: "Math homework",
                  subject: "Math",
                  due: "2026-11-12",
                  steps: ["Read", "Solve"],
                }
              : { text: "Notebook transcription [??]" },
          };
        if (o.prompt.includes("studentAnswer"))
          return { data: window.__ws.feedback };
        if (o.prompt.includes("Exactly 3 questions"))
          return { data: window.__ws.questions };
        return { data: window.__ws.pack };
      };
    },
    { pack, questions, feedback },
  );
  await page.fill("#swSource", source);
  await page.click("#swPack");
  await page.waitForSelector("#swGrade");
  await page.click("#swGrade");
  assert.match(await page.locator(".sw-status").textContent(), /tüm|every/);
  for (let i = 0; i < 4; i++)
    await page.check("input[name=swQ" + i + '][value="0"]');
  await page.click("#swGrade");
  assert.match(await page.locator("#swScore").textContent(), /4\/4/);
  await page.locator(".sw-card summary").first().click();
  assert.match(await page.locator(".sw-card").first().textContent(), /Answer/);
  await page.click("#swPackNote");
  await page.waitForFunction(async () =>
    (await App.db.getAll("notes")).some((n) => n.title === "Source Study"),
  );
  // Reject invalid source refs without saving a second pack.
  await page.evaluate(() => (window.__ws.pack.summary[0].refs = [999]));
  await page.click("#swPack");
  await page.waitForFunction(
    () => !document.querySelector(".sw-page").hasAttribute("aria-busy"),
  );
  assert.equal(
    await page.evaluate(
      async () =>
        (await App.db.getAll("meta")).filter((x) =>
          x.id.startsWith("studyPack:"),
        ).length,
    ),
    1,
  );
  await page.evaluate(() => (window.__ws.pack.summary[0].refs = [1]));
  const go = async (r) => {
    await navigate(page, r);
    await page.waitForSelector(".sw-page");
  };
  await go("odevler");
  await page.fill("#hwTitle", "Manual homework");
  await page.fill("#hwSubject", "Biology");
  await page.fill("#hwDue", "2026-11-10");
  await page.fill("#hwSteps", "Read chapter\nAnswer questions");
  await page.click("#hwSave");
  await page.waitForSelector("[data-hw-edit]");
  await page.check('[data-hw-step][data-index="0"]');
  await page.waitForFunction(
    () => !document.querySelector(".sw-page").hasAttribute("aria-busy"),
  );
  await page.click("[data-hw-edit]");
  assert.equal(await page.locator("#hwTitle").inputValue(), "Manual homework");
  await page.fill("#hwTitle", "Edited homework");
  await page.click("#hwSave");
  await page.waitForFunction(() =>
    document.querySelector("#hwList").textContent.includes("Edited homework"),
  );
  assert.equal(
    await page.locator('[data-hw-step][data-index="0"]').isChecked(),
    true,
  );
  await page.click("[data-hw-done]");
  await page.waitForFunction(async () =>
    (await App.db.getAll("meta")).some(
      (x) => x.id.startsWith("homework:") && x.done,
    ),
  );
  const png = Buffer.from(
    await page.evaluate(() => {
      const c = document.createElement("canvas");
      c.width = 320;
      c.height = 180;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 320, 180);
      ctx.fillStyle = "black";
      ctx.fillText("Homework notes", 20, 40);
      return c.toDataURL("image/png").split(",")[1];
    }),
    "base64",
  );
  await page.setInputFiles("#hwPhoto", {
    name: "homework.png",
    mimeType: "image/png",
    buffer: png,
  });
  await page.click("#hwExtract");
  await page.waitForFunction(
    () => !document.querySelector(".sw-page").hasAttribute("aria-busy"),
  );
  assert.equal(
    await page.locator("#hwTitle").inputValue(),
    "Math homework",
    await page.locator(".sw-status").textContent(),
  );
  assert.equal(
    await page.locator("[data-hw-edit]").count(),
    1,
    "Photo extraction stays a draft",
  );
  await page.click("#hwSave");
  await page.waitForFunction(
    () => document.querySelectorAll("[data-hw-edit]").length === 2,
  );
  await go("notlar");
  await page.setInputFiles("#ntPhoto", {
    name: "notebook.png",
    mimeType: "image/png",
    buffer: png,
  });
  await page.click("#ntRead");
  await page.waitForFunction(() =>
    document.querySelector("#ntText").value.includes("transcription"),
  );
  await page.fill("#ntText", "Corrected notebook text");
  await page.fill("#ntTitle", "My notebook");
  await page.click("#ntSave");
  await page.waitForFunction(async () =>
    (await App.db.getAll("notes")).some((n) => n.title === "My notebook"),
  );
  const topic = await page
    .locator("#ntTarget option")
    .nth(1)
    .getAttribute("value");
  await page.evaluate(
    async (key) =>
      App.db.put("notes", { id: key, text: "Existing topic note" }),
    topic,
  );
  await page.selectOption("#ntTarget", topic);
  await page.fill("#ntText", "Appended handwritten note");
  await page.click("#ntSave");
  await page.waitForFunction(
    async (key) => (await App.db.get("notes", key)).text.includes("Appended"),
    topic,
  );
  assert.equal(
    await page.evaluate(
      async (key) => (await App.db.get("notes", key)).text,
      topic,
    ),
    "Existing topic note\n\nAppended handwritten note",
  );
  await page.evaluate((topic) => App.router.go("konular/" + topic), topic);
  await page.waitForSelector("#myNote");
  assert.match(
    await page.locator("#myNote").inputValue(),
    /Appended handwritten/,
  );
  // A pending lesson autosave must flush before a fast notebook append reads the same record.
  await page.fill('#myNote', 'Draft before notebook transfer');
  await navigate(page, 'notlar/' + topic);
  await page.fill('#ntText', 'Fast notebook appendix');await page.click('#ntSave');
  await page.waitForFunction(async key => (await App.db.get('notes', key)).text.includes('Fast notebook appendix'), topic);
  await page.waitForTimeout(750);
  assert.equal(await page.evaluate(async key => (await App.db.get('notes', key)).text, topic), 'Draft before notebook transfer\n\nFast notebook appendix');
  await go("sozlu-prova");
  await page.fill("#orSource", source);
  await page.click("#orStart");
  await page.waitForSelector("#orAnswer");
  await page.evaluate(() => {
    App.speech.sttMode = () => null;
  });
  await page.click("#orMic");
  assert.match(await page.locator(".sw-status").textContent(), /yazılı|type/);
  await page.evaluate(() => {
    App.speech.sttMode = () => "web";
    App.speech.listen = (o) => {
      window.__speech = o;
      o.onFinal("First", "First");
      o.onPartial("second");
      return { stop: async () => ({ text: "First second" }) };
    };
  });
  await page.click("#orMic");
  assert.match(await page.locator("#orAnswer").inputValue(), /First second/);
  assert.equal(await page.locator("#orReview").isDisabled(), true);
  await page.click("#orStop");
  await page.waitForFunction(
    () => !document.querySelector("#orReview").disabled,
  );
  await page.fill("#orAnswer", "Light energy supports photosynthesis.");
  await page.click("#orReview");
  await page.waitForSelector("#orNext");
  assert.match(await page.locator("#orFeedback").textContent(), /3\/6/);
  await page.click("#orNext");
  await page.waitForSelector("#orAnswer");
  // Abort the pending next review on navigation; no saved answer contamination.
  await page.evaluate(() => {
    App.ai.generate = (o) =>
      new Promise((res, rej) => {
        o.signal.addEventListener("abort", () => {
          window.__aborted = true;
          rej(new DOMException("Cancelled", "AbortError"));
        });
      });
  });
  await page.fill("#orAnswer", "Pending answer");
  await page.click("#orReview");
  await page.evaluate(() => App.router.go("odevler"));
  await page.waitForSelector("#hwTitle");
  assert.equal(await page.evaluate(() => window.__aborted), true);
  assert.equal(
    await page.evaluate(
      async () =>
        (await App.db.getAll("meta")).find((x) =>
          x.id.startsWith("oralPractice:"),
        ).results.length,
    ),
    1,
  );
  await page.reload();
  await page.waitForSelector("#hwList [data-hw-edit]");
  assert.equal(await page.locator("[data-hw-edit]").count(), 2);
  for (const theme of ["light", "dark"])
    for (const width of [320, 768, 1440])
      for (const route of [
        "belge-paketi",
        "odevler",
        "notlar",
        "sozlu-prova",
      ]) {
        await go(route);
        await page.evaluate((t) => App.theme.set(t), theme);
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(100);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          true,
          route + " " + theme + " " + width,
        );
        assert.ok((await page.locator(".sw-notice").textContent()).length > 30);
      }
  for (const retired of ["canli", "cevre"]) {
    await page.evaluate((r) => App.router.go(r), retired);
    await page.waitForSelector("#hubQ");
    assert.equal(
      await page.locator('a[data-route="' + retired + '"]').count(),
      0,
    );
  }
  assert.equal(await page.evaluate(() => typeof App.cevre), "undefined");
  await page.evaluate(async () => {
    const backup = await App.db.exportAll();
    await App.db.importAll(backup);
    if (!(await App.db.getAll('notes')).some(n => n.title === 'My notebook')) throw new Error('Notebook lost in backup');
    if (!(await App.db.getAll('meta')).some(n => n.id.startsWith('oralPractice:'))) throw new Error('Practice lost in backup');
    await App.db.put('meta', {id:'homework:corrupt',title:'',due:'not a date'});
    await App.db.put('meta', {id:'oralPractice:corrupt',questions:null,results:null});
  });
  await go('odevler');await page.waitForFunction(()=>document.querySelector('#hwList').textContent.includes('Edited homework'));assert.equal(await page.locator('[data-hw-edit]').count(),2);
  await go('sozlu-prova');await page.waitForFunction(()=>document.querySelector('#orHistory').textContent.includes('3/6') || document.querySelector('#orHistory').textContent.includes('Add an example'));
  assert.equal(await page.evaluate(async()=>!!(await App.db.get('meta','oralPractice:corrupt'))),true,'Invalid record preserved');
  await page.evaluate(()=>App.i18n.setLang('en'));await go('notlar');assert.match(await page.locator('.sw-page h1').textContent(),/My Notes/);
  assert.match(await page.locator('#sidebar a[data-route="notlar"] .sidebar__label').textContent(), /My Notes/);
  assert.deepEqual(h.errors, []);
  await go("notlar");
  await page.waitForTimeout(650);await page.screenshot({ path: path.join(h.qa, "workspace-notes.png") });
  fs.writeFileSync(
    path.join(h.qa, "workspace160.json"),
    JSON.stringify(
      {
        engine: h.engineName,
        realParsers: ["TXT", "DOCX", "ODF", "PDF"],
        fixtures: ["vision", "AI", "speech"],
        flows: [
          "pack+grade+invalid refs",
          "tasks+edit+steps+complete+photo draft",
          "notes+topic append",
          "oral+rubric+transcript+cancel",
          "reload persistence",
          "24 theme/viewport/route layouts",
          "retired routes",
        ],
        errors: h.errors,
      },
      null,
      2,
    ),
  );
  console.log(
    h.engineName +
      ": real TXT/DOCX/PDF parsing, packs, tasks, photo-to-notes, topic append, oral rubric, speech/cancel fixtures, persistence, 24 layouts and removed entry points passed.",
  );
} finally {
  await h.close();
}
