"""Read-only MEB catalogue synchronizer. No textbook/lesson text is redistributed.

Python 3.10+, standard library only. Run with --refresh to refresh cached requests.
Sources are public endpoints used by tymm.meb.gov.tr itself; not a supported API.
"""
import argparse
import concurrent.futures
import hashlib
import json
import re
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urljoin, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://tymm.meb.gov.tr"
CODE = re.compile(r"(?<![\w.])(?:(?:[A-ZÇĞİÖŞÜ]{1,12}\.)*[A-ZÇĞİÖŞÜ]{2,12}\d*(?:\.[A-ZÇĞİÖŞÜ0-9]+){1,6}|[A-ZÇĞİÖŞÜ]{2,12}\s+\d+(?:\.\d+){1,4}|(?:9|10|11|12)(?:\.[A-ZÇĞİÖŞÜ0-9]+){2,6})(?![\w]|\.[\w])")


class Node:
    def __init__(self, tag="", attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def text(self):
        # Separate formatted codes from prose even when source HTML has no spaces.
        # Known split code prefixes are repaired explicitly by parse_unit().
        return " ".join(c.text() if isinstance(c, Node) else c for c in self.children)

    def all(self):
        yield self
        for child in self.children:
            if isinstance(child, Node):
                yield from child.all()


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, text):
        self.stack[-1].children.append(text)


def compact(text):
    return re.sub(r"\s+", " ", text).strip()


def parse_unit(html):
    """Codes only from the outcome section, never references in teaching activities."""
    document = Document(html).root
    codes, found, normalizations = [], False, []
    for row in document.all():
        title = next((n for n in row.children if isinstance(n, Node) and "title" in n.attrs.get("class", "").split()), None)
        content = next((n for n in row.children if isinstance(n, Node) and "content" in n.attrs.get("class", "").split()), None)
        if title and content and "Öğrenme Çıktıları" in compact(title.text()):
            found = True
            section = content.text()
            # The portal splits ENG between formatting tags and sometimes paragraphs;
            # SOS. 11.3.1 also contains a presentation-only space. Preserve the hash
            # and record these whitespace repairs instead of inventing new codes.
            for pattern, replacement, name in [(r"\bE\s+NG(?=\.)", "ENG", "split-ENG-prefix"),
                                                (r"([A-ZÇĞİÖŞÜ]{2,12})\.\s+(?=\d)", r"\1.", "space-after-code-prefix")]:
                section, count = re.subn(pattern, replacement, section)
                if count:
                    normalizations.append(name)
            codes.extend(compact(m.group(0).rstrip(".")) for m in CODE.finditer(section))
    updated = re.search(r"Güncelleme tarihi:\s*(\d{2}\.\d{2}\.\d{4})", compact(document.text()))
    return {"codes": list(dict.fromkeys(codes)), "outcomeSectionFound": found,
            "sourceUpdatedAt": updated.group(1) if updated else None,
            "normalizations": list(dict.fromkeys(normalizations))}


def write_json(file, data):
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


class Client:
    def __init__(self, cache, refresh=False):
        self.cache, self.refresh = cache, refresh
        self.history = {}
        cache.mkdir(parents=True, exist_ok=True)

    def get(self, url, params=None):
        if params:
            url += "?" + urlencode(params)
        if urlsplit(url).scheme != "https" or urlsplit(url).hostname not in {"tymm.meb.gov.tr", "mufredat.meb.gov.tr"}:
            raise ValueError("Unapproved source URL")
        key = hashlib.sha256(url.encode()).hexdigest()
        file = self.cache / (key + ".json")
        if file.exists() and not self.refresh:
            entry = json.loads(file.read_text(encoding="utf-8"))
            if entry["url"] != url:
                raise ValueError("Cache URL mismatch")
            self.history[url] = {k: entry[k] for k in ["url", "retrievedAt", "sha256"]}
            return entry
        error = None
        for attempt in range(3):
            try:
                req = Request(url, headers={"User-Agent": "KampusAI-CurriculumAudit/1.0", "Accept": "text/html,application/json"})
                with urlopen(req, timeout=35) as response:
                    if urlsplit(response.url).hostname != urlsplit(url).hostname:
                        raise ValueError("Unexpected redirect")
                    body = response.read(5_000_001)
                    if len(body) > 5_000_000:
                        raise ValueError("Source is larger than the allowed limit")
                entry = {"url": url, "retrievedAt": datetime.now(timezone.utc).isoformat(),
                         "sha256": hashlib.sha256(body).hexdigest(), "text": body.decode("utf-8-sig")}
                write_json(file, entry)
                self.history[url] = {k: entry[k] for k in ["url", "retrievedAt", "sha256"]}
                time.sleep(.15)
                return entry
            except (HTTPError, URLError, TimeoutError) as exc:
                error = exc
                time.sleep(attempt + 1)
        raise RuntimeError("Source unavailable: " + url) from error

    def json(self, url, params=None):
        return json.loads(self.get(url, params)["text"])


def synchronize(output, cache, refresh=False):
    client = Client(cache, refresh)
    courses = []
    page = 1
    while True:
        data = client.json(BASE + "/Ders/GetProgramList", {"kademe": "ortaogretim", "page": page})
        courses.extend(data["items"])
        if not data["hasMore"]:
            break
        page += 1
        if page > 50:
            raise ValueError("Unexpected catalogue pagination")
    if len({c["id"] for c in courses}) != data["totalCount"]:
        raise ValueError("Catalogue pagination lost or duplicated courses")
    by_grade = {}
    for grade, api_id in [(9, 11), (10, 12), (11, 13), (12, 14), (None, 17)]:
        rows = client.json(BASE + "/Ders/GetDerslerBySinif", {"sinifId": api_id, "kademe": 3, "programListedOnly": "true"})
        by_grade[api_id] = (grade, {row["id"] for row in rows})
    tasks = []
    for course in courses:
        for api_id, (grade, ids) in by_grade.items():
            if course["id"] in ids:
                tasks.append((course, grade, api_id))
    print(f"MEB: {len(courses)} courses; {len(tasks)} course/grade or elective modules", flush=True)

    def fetch_module(task):
        course, grade, api_id = task
        rows = client.json(BASE + "/Unite/GetUnitelerByDersId", {"dersId": course["id"], "sinifId": api_id})
        units = []
        for row in rows:
            url = BASE + "/" + row["url"] + "/unite/" + str(row["id"])
            try:
                entry = client.get(url)
                parsed = parse_unit(entry["text"])
                explicit_grades = [int(m.group(1)) for code in parsed["codes"]
                                   if (m := re.search(r"(?:^|\.)(9|10|11|12)\.", code))]
                if grade and any(g != grade for g in explicit_grades):
                    raise ValueError("Outcome code grade mismatch: " + url)
                status = "codes-indexed" if parsed["codes"] else "manual-review-required"
                units.append({"id": str(row["id"]), "title": row["title"], "level": row.get("duzeyAd"),
                              "url": url, "retrievedAt": entry["retrievedAt"], "sourceSha256": entry["sha256"],
                              "status": status, **parsed})
            except (RuntimeError, ValueError) as exc:
                units.append({"id": str(row["id"]), "title": row["title"], "level": row.get("duzeyAd"),
                              "url": url, "status": "source-unavailable", "codes": [], "error": str(exc)})
        module = {"schemaVersion": 1, "grade": grade, "apiGradeId": api_id, "courseId": course["id"],
                  "slug": course["url"], "name": course["dersAdi"], "programFamily": "tymm-portal-snapshot",
                  "applicability": "reference-only-confirm-school-year-and-school-type",
                  "sourceUrl": BASE + "/ogretim-programlari/ders/" + course["url"],
                  "rights": "factual-index-only-no-textbook-or-lesson-copy", "units": units,
                  "status": "indexed" if units else "no-html-units-pdf-review-required"}
        relative = str(grade or "electives") + "/" + course["url"] + ".json"
        return relative, module

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for relative, module in pool.map(fetch_module, tasks):
            write_json(output / relative, module)
            results.append({"file": relative, "grade": module["grade"], "courseId": module["courseId"],
                            "slug": module["slug"], "name": module["name"], "units": len(module["units"]),
                            "codes": sum(len(u["codes"]) for u in module["units"]),
                            "unresolvedUnits": sum(u["status"] != "codes-indexed" for u in module["units"]),
                            "status": module["status"]})
            print(relative, results[-1]["codes"], "codes", flush=True)

    # The legacy catalogue is kept separately. Its programmes must not be treated as
    # the same edition as TYMM or automatically applied to every school/grade.
    legacy_entry = client.get("https://mufredat.meb.gov.tr/Programlar.aspx")
    document = Document(legacy_entry["text"]).root
    legacy = []
    for anchor in document.all():
        href = anchor.attrs.get("href", "")
        if anchor.tag == "a" and re.search(r"ProgramDetay\.aspx\?PID=\d+", href):
            legacy.append({"name": compact(anchor.text()), "url": urljoin(legacy_entry["url"], href)})
    write_json(output / "program-catalogue.json", {"sourceUrl": legacy_entry["url"],
               "retrievedAt": legacy_entry["retrievedAt"], "sourceSha256": legacy_entry["sha256"], "programs": legacy})
    source_index = sorted(client.history.values(), key=lambda entry: entry["url"])
    dates = sorted(entry["retrievedAt"] for entry in source_index)
    write_json(output / "source-index.json", {"schemaVersion": 1, "sources": source_index})
    manifest = {"schemaVersion": 1, "snapshotDate": dates[-1][:10],
                "sourceWindow": {"oldestRetrievedAt": dates[0], "newestRetrievedAt": dates[-1]},
                "sourceIndex": "source-index.json",
                "scope": "TYMM public general-secondary catalogue; grades 9-12; ungraded electives separate; not all school-specific programmes",
                "sourceUrl": BASE + "/ogretim-programlari/ortaogretim", "courseCount": len(courses),
                "modules": results, "catalogueComplete": len({m["courseId"] for m in results}) == len(courses),
                "allUnitCodesResolved": all(m["unresolvedUnits"] == 0 and m["units"] > 0 for m in results),
                "allLessonsComplete": False, "openLicenceVerified": False}
    write_json(output / "manifest.json", manifest)
    print(json.dumps({"courses": len(courses), "modules": len(results), "units": sum(m["units"] for m in results),
                      "codes": sum(m["codes"] for m in results), "unresolvedUnits": sum(m["unresolvedUnits"] for m in results)}, ensure_ascii=True))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--output", type=Path, default=ROOT / "curriculum/official")
    parser.add_argument("--cache", type=Path, default=ROOT / "tmp/meb-curriculum-cache")
    args = parser.parse_args()
    synchronize(args.output, args.cache, args.refresh)
