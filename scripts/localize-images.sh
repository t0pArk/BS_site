#!/usr/bin/env bash
# Optional: download every Squarespace-hosted image into assets/img/ and point
# the HTML at the local copies (run this before you cancel the Squarespace plan).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/img
grep -ohE 'https://images\.squarespace-cdn\.com/content/v1/[^"? ,]+' index.html contact.html | sort -u | while read -r url; do
  name="$(basename "$(dirname "$url")")-$(basename "$url" | sed 's/%[0-9A-Fa-f][0-9A-Fa-f]//g; s/+/-/g')"
  [ -f "assets/img/$name" ] || curl -fsSL "$url?format=2500w" -o "assets/img/$name"
  for f in index.html contact.html; do
    python3 - "$f" "$url" "assets/img/$name" <<'PY'
import re, sys
f, url, local = sys.argv[1:]
s = open(f).read()
s = re.sub(re.escape(url) + r'\?format=\d+w( \d+w)?', lambda m: local + (m.group(1) or ''), s)
s = re.sub(r'srcset="(' + re.escape(local) + r' \d+w(, )?)+"', '', s)
open(f, 'w').write(s)
PY
  done
  echo "saved $name"
done
