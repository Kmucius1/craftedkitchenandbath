"""Mirror International Wholesale Tile's public WP REST catalog into
lib/designer/iwt-catalog.generated.json. Real names/SKUs/sizes/photos only;
no prices (IWT does not publish them). Re-run to refresh."""
import json, re, html, urllib.request, sys
B = "https://internationalwholesaletile.com/wp-json/wp/v2"
def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "CraftedCatalogSync/1.0"}), timeout=60)
    return json.load(r)
prods, page = [], 1
while True:
    try: d = get(f"{B}/product?per_page=100&page={page}&_fields=id,slug,link,title,content,featured_media,product_cat")
    except Exception: break
    if not d: break
    prods += d; page += 1
LIFESTYLE = re.compile(r"room|scene|lifestyle|shutterstock|cam[_-]?\d|install|render|bath|kitchen|living|patio|pool|outdoor|sizes|logo|icon|banner|deck|lobby|hotel|terrace|balcony|office|lounge|hall|entry|restaurant|spa|setting|mood|ambient|vignette|home|house|cafe|store|gym|wall[_-]?room|floor[_-]?room|exterior|interior|hero", re.I)
def pick_url(m):
    sizes = (m.get("media_details") or {}).get("sizes") or {}
    return (sizes.get("large") or {}).get("source_url") or m["source_url"]
by_parent = {}
pids = [p["id"] for p in prods]
for i in range(0, len(pids), 40):
    pg = 1
    while True:
        try: d = get(f"{B}/media?parent={','.join(map(str, pids[i:i+40]))}&per_page=100&page={pg}&_fields=id,post,source_url,media_details")
        except Exception: break
        if not d: break
        for m in d: by_parent.setdefault(m["post"], []).append(m)
        if len(d) < 100: break
        pg += 1
feat = {}
fids = sorted({p["featured_media"] for p in prods if p["featured_media"]})
for i in range(0, len(fids), 100):
    for m in get(f"{B}/media?per_page=100&include={','.join(map(str, fids[i:i+100]))}&_fields=id,source_url,media_details"):
        feat[m["id"]] = m
def best_image(p):
    cands = {m["id"]: m for m in by_parent.get(p["id"], [])}
    if p["featured_media"] in feat: cands[p["featured_media"]] = feat[p["featured_media"]]
    best, best_score = None, -1e9
    for mid, m in cands.items():
        w = (m.get("media_details") or {}).get("width") or 0
        h = (m.get("media_details") or {}).get("height") or 1
        name = m["source_url"].rsplit("/", 1)[-1]
        sc = 0
        if LIFESTYLE.search(name): sc -= 100
        if re.search(r'(?:^|[_-])(?:RS|IP|MO|Face|Swatch|Sheet|Polished|Honed|Matte|Glossy|Tile)(?:[_.-]|\d|$)', name): sc += 25
        if 0.85 <= w / h <= 1.15: sc += 20
        if w >= 900: sc += 10
        if w < 400: sc -= 50
        if mid == p["featured_media"]: sc += 5
        if sc > best_score: best, best_score = m, sc
    return pick_url(best) if best else None
media = {p["id"]: best_image(p) for p in prods}
SKIP = {1596, 104, 1613}  # discontinued, pool & spa, swatch card
FLOOR = {1753, 1598, 1600, 119}
WALL = {26, 1587, 1611, 1588}
out = []
for p in prods:
    cats = set(p["product_cat"])
    if cats & SKIP or not cats: continue
    cat = "flooring" if cats & FLOOR else "backsplash" if cats & WALL else "tile"
    txt = html.unescape(re.sub(r"<[^>]+>", " ", p["content"]["rendered"]))
    txt = re.sub(r"\s+", " ", txt).strip()
    name = html.unescape(p["title"]["rendered"]).strip().title()
    sku = next((t for t in reversed(txt.split()) if re.fullmatch(r"[A-Z0-9\-]{6,}", t) and re.search(r"\d", t) and re.search(r"[A-Z]", t)), "")
    sz = re.search(r"(\d+(?:\.\d+)?)\s*[″\"x×]\s*(\d+(?:\.\d+)?)", txt)
    out.append({"id": f"iwt-{p['id']}", "name": name, "sku": sku or p["slug"], "category": cat,
                "sizeIn": [float(sz.group(1)), float(sz.group(2))] if sz else None,
                "desc": txt, "image": media.get(p["id"]), "url": p["link"],
                "special": 1585 in cats or 1595 in cats, "stone": 102 in cats, "glass": 1587 in cats})
json.dump(out, open("lib/designer/iwt-catalog.generated.json", "w"), separators=(",", ":"))
from collections import Counter
print(len(prods), "fetched ->", len(out), dict(Counter(o["category"] for o in out)), "with image:", sum(1 for o in out if o["image"]))
