import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
path = r"C:\Users\sxclipse\.cursor\projects\c-Users-sxclipse-agency\agent-transcripts\48c5ce78-6204-4317-9b38-0687bf67b7b7\48c5ce78-6204-4317-9b38-0687bf67b7b7.jsonl"
lines = open(path, encoding="utf-8").readlines()
hits = []
for i, line in enumerate(lines):
    if "stage-zaz.png" not in line or "mcs-device--zaz" not in line:
        continue
    o = json.loads(line)
    for b in o.get("message", {}).get("content", []):
        if not (
            isinstance(b, dict)
            and b.get("type") == "tool_use"
            and b.get("name") in ("StrReplace", "Write")
        ):
            continue
        ns = (b.get("input") or {}).get("new_string") or (b.get("input") or {}).get("contents") or ""
        if "stage-zaz.png" not in ns or "mcs-device--zaz" not in ns:
            continue
        photo = re.search(r"stage-zaz\.png'\)\s*([^;]+)", ns)
        keys = re.findall(
            r"(?:max-height:\s*[^;]+|padding:\s*[^;]+|center\s+[\d.]+%\s*/\s*[^;\)]+|min\(\d+cq[wh])",
            ns,
        )
        hits.append((i, (photo.group(1)[:55] if photo else "?"), " | ".join(keys[:10])))
        open(rf"c:\Users\sxclipse\agency\scripts\_zaz_v_{i}.txt", "w", encoding="utf-8").write(ns)

for h in hits:
    print(h[0], h[1], "::", h[2])
print("total", len(hits))
