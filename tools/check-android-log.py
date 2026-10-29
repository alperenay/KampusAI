"""Attribute Android fatal records to the app, including restarted and WebView PIDs."""
import json
import re
import sys
from pathlib import Path


def analyse(text, package, live_pids=()):
    if not text.strip():
        raise ValueError('Android log is empty; crash verification is unavailable')
    owned = set(map(int, live_pids))
    lines = text.splitlines()
    names = {}
    def logger_pid(line):
        m = re.search(r'^\d\d-\d\d\s+[\d:.]+\s+(\d+)\s+\d+\s+[A-Z]\s+', line)
        return int(m[1]) if m else None
    for line in lines:
        start = re.search(r'Start proc (\d+):([^/\s]+)', line)
        if start:
            names[int(start[1])] = start[2]
        launcher = re.search(r'Calling main entry ([\w.]+)', line)
        if launcher and logger_pid(line) is not None:
            names[logger_pid(line)] = launcher[1]
        if start and (start[2] == package or start[2].startswith(package + ':') or
                      ('{' + package + '/') in line):
            owned.add(int(start[1]))
    app, external, unknown = [], [], []
    for i, line in enumerate(lines):
        if not re.search(r'FATAL EXCEPTION|Fatal signal \d+', line):
            continue
        header = re.search(r'^\d\d-\d\d\s+[\d:.]+\s+(\d+)\s+\d+\s+[A-Z]\s+', line)
        pid = int(header[1]) if header else None
        block = '\n'.join(lines[i:i + 12])
        process = re.search(r'Process:\s*([^,\s]+)', block)
        is_app = pid in owned or (process is not None and
                    (process[1] == package or process[1].startswith(package + ':')))
        target = app if is_app else external if (pid in names or process is not None) else unknown
        target.append({'pid': pid, 'process': names.get(pid) or (process[1] if process else None), 'header': line})
    return {'package': package, 'ownedPids': sorted(owned),
            'appFatals': app, 'externalFatals': external, 'unknownFatals': unknown}


def self_test():
    p = 'com.dersasistani.app'
    prefix = '10-29 16:28:07.765 '
    base = prefix + '559 594 I ActivityManager: Start proc 2448:' + p + '/u0a209\n'
    external = prefix + '3693 3693 D AndroidRuntime: Calling main entry com.android.commands.uiautomator.Launcher\n' + prefix + '3693 3719 E AndroidRuntime: FATAL EXCEPTION: UiAutomation\n'
    assert not analyse(base + external, p)['appFatals']
    assert len(analyse(base + external, p)['externalFatals']) == 1
    assert len(analyse(base + external.replace('3693 3719', '2448 2449'), p)['appFatals']) == 1
    restarted = base + prefix + '559 594 I ActivityManager: Start proc 3333:' + p + '/u0a209\n'
    assert analyse(restarted + external.replace('3693 3719', '3333 3334'), p, [4444])['appFatals']
    web = base + prefix + '559 594 I ActivityManager: Start proc 2566:com.google.android.webview:sandboxed/u0 for {' + p + '/org.chromium.Service}\n'
    assert analyse(web + prefix + '2566 2567 F libc: Fatal signal 11 (SIGSEGV)\n', p)['appFatals']
    assert analyse(external + prefix + '3693 3719 E AndroidRuntime: Process: ' + p + ':worker, PID: 3693', p)['appFatals']
    assert analyse(external, p, [3693])['appFatals']
    assert analyse(prefix+'9999 9999 E AndroidRuntime: FATAL EXCEPTION: unknown', p)['unknownFatals']
    try:
        analyse('', p)
    except ValueError:
        pass
    else:
        raise AssertionError('Empty logs must fail')
    print('Android crash attribution: app, restart, WebView, direct process, external automation and empty-log cases passed.')


if __name__ == '__main__':
    if sys.argv[1:] == ['--self-test']:
        self_test()
    else:
        result = analyse(Path(sys.argv[1]).read_text(encoding='utf-8', errors='replace'),
                         sys.argv[2], sys.argv[3].split() if len(sys.argv) > 3 else ())
        print(json.dumps(result, ensure_ascii=False, indent=2))
        sys.exit(1 if result['appFatals'] or result['unknownFatals'] else 0)
