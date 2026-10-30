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
media = {}
ids = sorted({p["featured_media"] for p in prods if p["featured_media"]})
for i in range(0, len(ids), 100):
    for m in get(f"{B}/media?per_page=100&include={','.join(map(str, ids[i:i+100]))}&_fields=id,source_url,media_details"):
        sizes = (m.get("media_details") or {}).get("sizes") or {}
        media[m["id"]] = (sizes.get("large") or sizes.get("medium_large") or {}).get("source_url") or m["source_url"]
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
                "desc": txt, "image": media.get(p["featured_media"]), "url": p["link"],
                "special": 1585 in cats or 1595 in cats, "stone": 102 in cats, "glass": 1587 in cats})
json.dump(out, open("lib/designer/iwt-catalog.generated.json", "w"), separators=(",", ":"))
from collections import Counter
print(len(prods), "fetched ->", len(out), dict(Counter(o["category"] for o in out)), "with image:", sum(1 for o in out if o["image"]))
