"""Supplement the HTML catalogue with PDF-only / legacy programme references.

Requires pypdf (read-only extraction). PDFs and full extracted text stay in tmp/;
JSON contains code candidates, source hashes and PDF page references only.
These candidates do not establish licence, semantic coverage or current applicability.
"""
import concurrent.futures
import hashlib
import importlib.util
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("sync_meb", Path(__file__).with_name("sync-meb-curriculum.py"))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)
OUTPUT = ROOT / "curriculum/pdf-index"
CACHE = ROOT / "tmp/meb-pdf-cache"
# Exact programme IDs, not guessed download filenames. Upper-secondary source catalogue.
PROGRAMS = [(343, "matematik", "legacy"), (351, "fizik", "legacy"), (350, "kimya", "legacy"),
            (361, "biyoloji", "legacy"), (336, "cografya", "legacy"), (353, "edebiyat", "legacy"),
            (342, "ingilizce", "legacy"), (355, "inkilap", "legacy"), (338, "felsefe", "legacy"),
            (319, "din", "legacy"), (2153, "din", "tymm-2026"), (333, "almanca", "legacy"),
            (2217, "saglik", "tymm-2026")]
PATTERN = re.compile(r"(?<![\w.])(?:(?:[A-ZÇĞİÖŞÜ]{1,12}\.)*[A-ZÇĞİÖŞÜ]{1,12}\d*(?:\.[A-ZÇĞİÖŞÜ0-9]+){1,6}|(?:9|10|11|12)(?:\.[A-ZÇĞİÖŞÜ0-9]+){2,6})(?![\w]|\.[\w])")


def run():
    CACHE.mkdir(parents=True, exist_ok=True)
    client = sync.Client(ROOT / "tmp/meb-curriculum-cache")
    catalogue = json.loads((ROOT / "curriculum/official/program-catalogue.json").read_text(encoding="utf-8"))

    def fetch(task):
        pid, subject, edition = task
        source = "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=" + str(pid)
        base = {"schemaVersion": 1, "programmeId": pid, "subjectId": subject, "edition": edition,
                "name": next(p["name"] for p in catalogue["programs"] if p["url"] == source),
                "sourceUrl": source, "applicability": "confirm-school-year-and-school-type",
                "status": "machine-extracted-candidates-require-review", "licenceVerified": False}
        try:
            doc = sync.Document(client.get(source)["text"]).root
            links = [urljoin(source, n.attrs["href"]) for n in doc.all()
                     if n.tag == "a" and ".pdf" in n.attrs.get("href", "").lower()]
            if len(set(links)) != 1:
                raise ValueError("Expected exactly one official PDF")
            pdf_url = links[0]
            parts = urlsplit(pdf_url)
            if parts.scheme != "https" or parts.hostname != "mufredat.meb.gov.tr":
                raise ValueError("Unexpected PDF host")
            encoded = urlunsplit((parts.scheme, parts.netloc, quote(parts.path, safe="/%"), parts.query, ""))
            file = CACHE / (str(pid) + ".pdf")
            if not file.exists():
                with urlopen(Request(encoded, headers={"User-Agent": "KampusAI-CurriculumAudit/1.0"}), timeout=60) as response:
                    body = response.read(20_000_001)
                if not body.startswith(b"%PDF-") or len(body) > 20_000_000:
                    raise ValueError("Invalid PDF response")
                file.write_bytes(body)
            reader = PdfReader(file)
            codes = {}
            for index, page in enumerate(reader.pages, 1):
                text = page.extract_text() or ""
                for match in PATTERN.finditer(text):
                    code = match.group(0)
                    # General skill/value codes are not programme learning outcomes.
                    if re.match(r"^(?:KB|OB|SDB|SBAB|MAB|D|E)\d?\.", code) and not re.match(r"E(?:9|10|11|12)\.", code):
                        continue
                    codes.setdefault(code, []).append(index)
            refs = []
            for code, pages in codes.items():
                grade = re.search(r"(?:^|\.)(9|10|11|12)\.", code) or re.match(r"E(9|10|11|12)\.", code)
                refs.append({"code": code, "gradeCandidate": int(grade.group(1)) if grade else None,
                             "pages": sorted(set(pages)), "status": "candidate-requires-review"})
            base.update({"pdfUrl": pdf_url, "pdfSha256": hashlib.sha256(file.read_bytes()).hexdigest(),
                         "pageCount": len(reader.pages), "codeCandidates": refs,
                         "indexedAt": datetime.now(timezone.utc).isoformat(), "fullTextRedistributed": False})
        except Exception as exc:
            base.update({"status": "source-unavailable", "error": type(exc).__name__ + ": " + str(exc), "codeCandidates": []})
        filename = str(pid) + ".json"
        sync.write_json(OUTPUT / filename, base)
        print(str(pid), base["status"], len(base["codeCandidates"]), "candidates", flush=True)
        return {"file": filename, "subjectId": subject, "edition": edition, "status": base["status"],
                "codeCandidates": len(base["codeCandidates"])}

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        modules = list(pool.map(fetch, PROGRAMS))
    sync.write_json(OUTPUT / "manifest.json", {"schemaVersion": 1, "modules": modules,
                    "purpose": "PDF-only and legacy source references; machine candidates, not verified lesson coverage",
                    "allMebLessonsComplete": False})


if __name__ == "__main__":
    run()
