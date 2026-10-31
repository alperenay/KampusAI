#!/usr/bin/env bash
set -euo pipefail
BASE=a6420f6fa937952a27a0ede29397f5afd934bc3a
RUN=41209551598
REPO=alperenay/KampusAI
test "$GITHUB_REPOSITORY" = "$REPO"
git fetch --no-tags --depth=1 origin "$BASE"
CHANGED=$(git diff --name-only "$BASE" HEAD)
while IFS= read -r file; do
  case "$file" in
    tools/lab-interactions-ui-check.mjs|js/modules/labs.js|js/modules/science-lab.js|.github/workflows/build.yml|tools/verify-168-resume.sh) ;;
    *) echo "Resume not allowed for changed path: $file"; exit 1 ;;
  esac
done <<< "$CHANGED"
test "$(gh api "repos/$REPO/actions/runs/$RUN" --jq .head_sha)" = "$BASE"
gh api "repos/$REPO/actions/runs/$RUN/jobs?per_page=100" > "$RUNNER_TEMP/base-jobs.json"
for job in 'Android yapay zeka motoru' 'Linux yapay zeka motoru' 'Yapay zeka sunucusu' 'Android (APK)' 'Windows (kurulum)' 'Pardus / Linux (deb + AppImage)' 'Android açılış testi' 'Pardus kurulum testi' 'Öğretmen ve tüm ekran regresyonu' 'firefox / ubuntu-latest'; do
  jq -e --arg name "$job" '[.jobs[] | select(.name == $name and .conclusion == "success")] | length == 1' "$RUNNER_TEMP/base-jobs.json" >/dev/null
done
DEST="$RUNNER_TEMP/base-webkit-$GITHUB_JOB"
mkdir -p "$DEST"
gh run download "$RUN" --repo "$REPO" --name browser-webkit --dir "$DEST"
python3 - "$DEST/audit-summary.json" <<'PY'
import json,sys
report=json.load(open(sys.argv[1]))
assert report['engine']=='webkit' and len(report['results'])==43
assert [r['test'] for r in report['results'] if not r['passed']]==['lab-interactions-ui-check']
print('Baseline verified: unchanged modules passed; only scoped lab routing/test changes are present.')
PY
