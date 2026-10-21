#!/usr/bin/env python3
"""Check the deployed artifact, including legacy media and security invariants."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
errors = []
allowed_media = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp4", ".m4v"}
for path in Path("wp-content").rglob("*"):
    if path.is_file() and path.suffix.lower() not in allowed_media:
        errors.append(f"Unexpected upload type: {path}")

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.urls.append(attrs[key])
        if attrs.get("srcset"):
            self.urls.extend(item.strip().split()[0] for item in attrs["srcset"].split(",") if item.strip())
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])

pages = list(root.rglob("*.html"))
for page in pages:
    content = page.read_text()
    relative = page.relative_to(root).as_posix()
    parser = Links()
    parser.feed(content)
    for pattern in ("jquery-3.3.1", "firebasejs/", "firebaseConfig", "amplitude.getInstance", "UA-92823-1", "youremail@email.com"):
        if pattern in content:
            errors.append(f"Removed dependency/configuration in {relative}: {pattern}")
    if not any("jquery-3.7.1.min.js" in script for script in parser.scripts):
        # Google verification HTML is intentionally independent of the theme.
        if relative != "google84356d23bcc15fd4.html":
            errors.append(f"Missing current jQuery in {relative}")
    if sum("googletagmanager.com/gtag/js" in script for script in parser.scripts) > 1:
        errors.append(f"Duplicate GA4 loader: {relative}")
    for url in parser.urls:
        parsed = urlsplit(urljoin("https://scottshapiro.com/" + relative, url))
        if parsed.scheme not in ("http", "https") or parsed.netloc not in ("scottshapiro.com", "www.scottshapiro.com"):
            continue
        target = root / unquote(parsed.path).lstrip("/")
        if not (target.is_file() or target.with_suffix(".html").is_file() or (target / "index.html").is_file()):
            errors.append(f"Missing local target in {relative}: {parsed.path}")

for required in ("_headers", "_redirects", "404.html", "feed.xml", "sitemap.xml", "google84356d23bcc15fd4.html"):
    if not (root / required).is_file():
        errors.append(f"Missing artifact: {required}")
for excluded in ("Gemfile", "Gemfile.lock", "README.md", "HOW_TO_WRITE_POSTS.md", "cloudflare-pages-setup.md", "SECURITY.md", "scripts", "docs", "tests", "wp-content/uploads/mc4wp-debug-log.php"):
    if (root / excluded).exists():
        errors.append(f"Internal or sensitive file published: {excluded}")

feed = ET.parse(root / "feed.xml").getroot()
if feed.tag != "rss" or not feed.findall("./channel/item"):
    errors.append("Existing RSS feed format/items were not preserved")
for page in root.glob("tag/*/index.html"):
    if not re.search(r"A collection of [1-9][0-9]* posts?", page.read_text()):
        errors.append(f"Missing tag pagination data: {page.relative_to(root)}")
for error in sorted(set(errors)):
    print(error)
print(f"Checked {len(pages)} HTML files, {len(feed.findall('./channel/item'))} RSS items; {len(set(errors))} errors.")
sys.exit(bool(errors))
