from pathlib import Path
import re
import urllib.request

url = "https://mestidelivery.com/"
html = urllib.request.urlopen(url, timeout=20).read().decode("utf-8", "ignore")
print("len", len(html))
for pat in ["eval(", "atob(", "document.write", "coinhive", "cryptonight", "seed phrase"]:
    print(pat, pat.lower() in html.lower())
print("iframes", html.lower().count("iframe"))
print("scripts", len(re.findall(r"<script", html, re.I)))
print("ext", re.findall(r"src=[\"'](https?://[^\"']+)[\"']", html)[:20])

assets = Path(r"C:\MestiDelivery\Frontend\public\Assets")
if assets.exists():
    for p in sorted(assets.iterdir()):
        if re.search(r"icon|logo|apple|touch|mesti", p.name, re.I):
            print("asset", p.name, p.stat().st_size)
