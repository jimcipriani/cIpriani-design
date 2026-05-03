#!/usr/bin/env python3
"""Download HTML pages and all linked assets from ciprianidesign.com."""

import os
import re
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path
from html.parser import HTMLParser

BASE_DIR = Path("/Users/jimcipriani/Downloads/CIpriani Design Site Backup/site")
DOMAIN = "ciprianidesign.com"
URLS = [
    "https://ciprianidesign.com/",
    "https://ciprianidesign.com/?page_id=321",
    "https://ciprianidesign.com/?page_id=430",
    "https://ciprianidesign.com/?page_id=392",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

downloaded = set()


def safe_path(url: str) -> Path:
    """Convert a URL to a local file path."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.netloc + parsed.path
    if not parsed.path or parsed.path.endswith("/"):
        if parsed.query:
            slug = parsed.query.replace("=", "_").replace("&", "_").replace("?", "_")
            path = parsed.netloc + "/" + slug + ".html"
        else:
            path = parsed.netloc + "/index.html"
    full = BASE_DIR / path.lstrip("/")
    full.parent.mkdir(parents=True, exist_ok=True)
    return full


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read()
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


class AssetParser(HTMLParser):
    """Collect all asset URLs from an HTML page."""

    def __init__(self, base_url: str):
        super().__init__()
        self.base_url = base_url
        self.assets: list[str] = []

    def _add(self, href: str):
        if not href or href.startswith("data:") or href.startswith("#") or href.startswith("javascript:"):
            return
        full = urllib.parse.urljoin(self.base_url, href)
        parsed = urllib.parse.urlparse(full)
        if parsed.netloc and DOMAIN not in parsed.netloc:
            return
        self.assets.append(full)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link":
            self._add(attrs.get("href", ""))
        elif tag in ("script", "img", "source", "video", "audio", "embed", "object"):
            self._add(attrs.get("src", ""))
            self._add(attrs.get("data-src", ""))
            self._add(attrs.get("data-lazy-src", ""))
        elif tag == "a":
            href = attrs.get("href", "")
            if href:
                full = urllib.parse.urljoin(self.base_url, href)
                parsed = urllib.parse.urlparse(full)
                if DOMAIN in parsed.netloc:
                    self._add(href)


def extract_css_urls(css_text: str, base_url: str) -> list[str]:
    urls = []
    for m in re.finditer(r'url\(["\']?([^"\')\s]+)["\']?\)', css_text):
        u = m.group(1)
        if not u.startswith("data:"):
            urls.append(urllib.parse.urljoin(base_url, u))
    return urls


def download_asset(url: str):
    if url in downloaded:
        return
    downloaded.add(url)
    dest = safe_path(url)
    if dest.exists():
        print(f"  [exists] {url}")
        return
    print(f"  [asset]  {url}")
    data = fetch(url)
    if data:
        dest.write_bytes(data)
        # If CSS, parse it for more assets
        if url.endswith(".css") or "text/css" in url:
            try:
                css_text = data.decode("utf-8", errors="ignore")
                for sub in extract_css_urls(css_text, url):
                    download_asset(sub)
            except Exception:
                pass


def download_page(url: str):
    if url in downloaded:
        return
    downloaded.add(url)
    dest = safe_path(url)
    print(f"\n[page] {url}")
    print(f"       -> {dest}")
    data = fetch(url)
    if not data:
        return
    dest.write_bytes(data)
    html = data.decode("utf-8", errors="ignore")

    parser = AssetParser(url)
    parser.feed(html)
    for asset_url in parser.assets:
        download_asset(asset_url)


if __name__ == "__main__":
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    for page_url in URLS:
        download_page(page_url)
    print(f"\nDone. Files saved to {BASE_DIR}")
    total = sum(1 for _ in BASE_DIR.rglob("*") if _.is_file())
    print(f"Total files downloaded: {total}")
