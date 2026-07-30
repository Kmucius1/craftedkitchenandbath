# Supplier Product Catalog — "Design Studio" Plan

**Status:** Planned, not started
**Written:** 2026-07-30
**Origin:** Tylor's email listing Crafted's four suppliers + Kaleb's ask — let homeowners browse
every countertop, cabinet, tile, and hardware option *on Crafted's own site* instead of bouncing
them to supplier websites.

---

## Goal

A shopper says "I want my kitchen redone." On craftedkitchenandbath.com they can browse the real
countertop slabs, cabinet door styles, tile, and hardware Crafted actually sells — with tier
pricing — pick their favorites, and send that selection list in as a lead. No supplier websites,
no "call us to see options."

## Verdict

**Feasible — but not as a single "API in all their products."** Each supplier is a different
technical situation (verified by probing all four sites on 2026-07-30, findings below).

The right architecture is a **Crafted-owned material catalog** (our Supabase) fed by
**per-supplier importers**, rendered as a browsable Design Studio.

**Do NOT do live passthrough** (fetching supplier sites on page load). Their sites are slow and
unstable, several block automated requests, and a failed fetch would break the page and hurt SEO.
Mirror once into our DB, cache images on our own storage, refresh on a schedule.

---

## Supplier findings (probed 2026-07-30)

| Supplier | Category | Platform | Public data access | Verdict |
|---|---|---|---|---|
| International Wholesale Tile | Tile & flooring | WordPress / WP Engine | **Open WP REST API** | 🟢 Full auto-sync |
| Top Knobs | Hardware | Magento 2 | **GraphQL endpoint responds** | 🟡 Partial / needs filters or dealer CSV |
| US Cabinet Depot | Cabinets | Magento 2 | Blocked at CDN | 🔴 Dealer export or curated |
| MSI Surfaces | Countertops | ASP.NET (Kestrel) | No public API | 🔴 Rep feed or curated |

### 🟢 International Wholesale Tile — fully automatable

- WordPress on WP Engine with an **open REST API**.
- `https://internationalwholesaletile.com/wp-json/wp/v2/product?per_page=100&page=N`
- Returns **1,103 live products** (`x-wp-total: 1103`, 552 pages at 2/page).
- Payload includes title, slug, link, content (SKUs are embedded in the body HTML, e.g.
  `CSNALPSTURQ624`), and gallery shortcodes. Content is Visual-Composer markup — the importer
  must strip `[vc_row]`/`[vc_column_text]` shortcodes and parse SKUs + gallery image IDs.
- Images resolve through `wp-json/wp/v2/media`.
- **Requires zero cooperation from IWT.** Nightly cron is realistic.

### 🟡 Top Knobs — reachable but gated

- Magento 2. `POST https://www.topknobs.com/graphql` **responds with real data** (no auth needed
  for the endpoint itself).
- `{categoryList{...}}` returns only `Default Category` with no children → their public category
  tree is gated (dealer catalog).
- `products(search:"knob")` → `Internal server error` (their search/Elasticsearch backend).
- `products(filter:{name:...})` → not a valid filter on their schema; would need `sku` /
  `category_uid` filters, which means we need known SKUs first.
- **Practical path:** ask the Top Knobs rep for a product + price CSV export (standard for Magento
  dealers), then enrich via GraphQL by SKU. Tylor already orders by email with them, so the rep
  relationship exists.

### 🔴 US Cabinet Depot — no public API

- Magento 2, but fronted by **Varnish, which returns `405 Not allowed` on `/graphql`** for both
  POST and GET.
- `sitemap.xml` only lists `cms.xml` and `blog.xml` — **no product sitemap**. The SKU catalog and
  pricing live behind the dealer login.
- Public pages that ARE useful: `/our-products/`, `/framed-capital-collection/`,
  `/frameless-altaeuro-collection/`, `/decorative-hardware/`,
  `/rev-a-shelf-cabinet-accessories/`.
- **Key insight: we don't need SKU-level data for homeowners.** Shoppers choose a *door style +
  finish*, not a `B18` base cabinet. That's roughly 40–80 items, one-time curation.
- **Practical path:** ask the rep for the dealer catalog / price-list export. Tylor has a login
  (he offered to read the password over the phone — hold on that, Phase 1 doesn't need it, and a
  rep-provided export beats scraping a portal).

### 🔴 MSI Surfaces — no public API

- ASP.NET (`server: Kestrel`). Their only data service is `AutoFill.asmx`, an internal SOAP
  endpoint explicitly `Disallow`ed in robots.txt (`GetSearchData`, `GetProductName`,
  `DrawImage`, etc.). Not a public product API and not something to hammer.
- `sitemap.xml` is a Screaming Frog export of marketing/category pages
  (`/sinks/`, `/porcelain-ceramic-category/`, `/wood-look-tile-and-planks/`, …).
- Matches Tylor's own note: their portal "doesn't show anything besides a simple order form."
- **Practical path:** MSI supplies dealers/fabricators with high-res swatch libraries and product
  data — that's a rep conversation, not an engineering one. Fallback is a curated import of the
  quartz/granite lines Crafted actually sells.

---

## Two deliberate product decisions

### 1. Curate — do not mirror everything

1,103 IWT tiles plus MSI's full slab catalog is a *warehouse*, not a showroom. A homeowner facing
1,100 tiles bounces. Target **60–120 curated options across the four categories** — what Tylor
actually sells and can price. Better conversion, a fraction of the work, and it makes Crafted look
like a curator instead of a distributor.

### 2. Tier pricing — do not publish supplier prices

Publishing wholesale/supplier pricing leaks margin, turns the site into a comparison-shopping
tool, and goes stale constantly. Instead show **Level 1 / 2 / 3 (Good / Better / Best)** with
installed **$/sq ft ranges**. Standard remodeler practice, qualifies budget before the sales call,
never goes stale.

### Also: image rights

Get written permission (an email reply is fine) from each rep before publishing their product
imagery. As an authorized dealer it's a formality — and reps usually hand over better assets than
what's on their website.

---

## Architecture

### Data layer — Supabase

Existing project: `crafted-kitchen-bath`, ref `ilijwatkzumuywzsmqvy` (same one the leads system
uses). RLS on with no policies; server uses the service-role key.

```sql
-- db/schema.sql additions
create table materials (
  id            uuid primary key default gen_random_uuid(),
  supplier      text not null,        -- 'iwt' | 'msi' | 'uscd' | 'topknobs'
  category      text not null,        -- 'countertop' | 'cabinet' | 'tile' | 'flooring' | 'hardware'
  collection    text,                 -- 'Capital', 'AltaEuro', 'Alps II', ...
  name          text not null,
  color         text,
  finish        text,                 -- polished / honed / matte / brushed nickel ...
  size          text,                 -- '6x24', '3cm slab'
  sku           text,
  tier          int,                  -- 1 | 2 | 3  (Good / Better / Best)
  description   text,
  source_url    text,
  active        boolean default false,-- Tylor opts items IN; imports land inactive
  featured      boolean default false,
  sort_order    int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique (supplier, sku)
);

create table material_images (
  id           uuid primary key default gen_random_uuid(),
  material_id  uuid references materials(id) on delete cascade,
  url          text not null,         -- OUR storage, not the supplier CDN
  alt          text,
  is_primary   boolean default false,
  sort_order   int default 0
);

create index on materials (category, active);
create index on materials (supplier);
```

Notes:
- Imports land with `active = false`. Nothing shows publicly until Tylor turns it on. This is what
  makes "1,103 products" safe to import — we sync everything, publish a curated slice.
- **Copy images to our own storage** (Supabase Storage or Vercel Blob). Never hotlink supplier
  CDNs — they break, and it's hostile bandwidth use.

### Importers

`scripts/import-<supplier>.ts`, each idempotent and upserting on `(supplier, sku)`:

- `import-iwt.ts` — paginate `wp-json/wp/v2/product`, strip VC shortcodes, parse SKUs from body,
  resolve gallery images via `wp/v2/media`. Fully automated; nightly cron.
- `import-topknobs.ts` — seed from rep CSV, enrich via Magento GraphQL by SKU.
- `import-uscd.ts` — dealer export, or curated JSON of door styles + finishes.
- `import-msi.ts` — rep data feed, or curated JSON of stocked quartz/granite lines.

### Public UI — `/design-studio`

- Category tabs: **Countertops · Cabinets · Tile & Flooring · Hardware**
- Filters: color, finish, size, tier
- Grid of swatch cards → detail view (large image, specs, tier, "where this works")
- **"Add to My Selections"** — the conversion mechanic. Selections persist in localStorage.
- Selections tray → submits through the existing `/api/contact` lead flow with the picked items
  attached. **A lead that says "Calacatta quartz + white shaker + 12x24 wood-look plank" is worth
  several times a blank contact form** — and it feeds the showroom appointment Tylor wants people
  coming in for.
- Cross-link from `/services/countertops`, `/kitchen-remodeling`, `/flooring-installation`,
  `/services/cabinet-refacing`, and `/quote`.
- SEO: SSG the category pages + individual material pages; add to `app/sitemap.ts`.

### Admin — `/admin/materials`

Extends the existing password-protected `/admin` (proxy.ts + `ADMIN_PASSWORD`). Tylor can:
toggle `active`, set `tier`, mark `featured`, reorder, edit names/descriptions, and run an import.
No code changes needed to curate.

---

## Phasing

**Phase 1 — foundation + tile (no supplier cooperation required)**
1. `materials` + `material_images` schema in Supabase
2. IWT importer (real data, 1,103 products, imported inactive)
3. `/design-studio` with category tabs, filters, detail view
4. Selections tray → lead submission via `/api/contact`
5. `/admin/materials` curation UI
6. Tier pricing display (needs Tylor's numbers)
7. Curated cabinets + countertops from public pages as a starting set

**Phase 2 — supplier feeds**
- Top Knobs hardware (rep CSV + GraphQL enrichment)
- USCD dealer export → full door-style/finish matrix
- MSI rep data feed → full stocked slab lines
- Nightly cron refresh for whatever is automatable

**Phase 3 — showroom experience**
- Room visualizer / see-it-in-a-space
- Curated "looks" (pre-built palettes: Coastal White, Modern Walnut, …)
- "Book a showroom visit with your selections" → ties into the showroom push from round 1 edits

---

## Blockers — needed from Tylor

1. **Which lines he actually stocks/prefers** per category — this drives the entire curation.
2. **Three pricing tiers** with installed $/sq ft ranges.
3. **Emails to each rep** asking for (a) a product data feed / catalog export and (b) written
   permission to use product imagery on craftedkitchenandbath.com.
4. **USCD dealer login** — Phase 2 only. Ask the rep for an export first.

## Supplier contacts (from Tylor's email)

- **US Cabinet Depot** — main cabinet supplier — uscabinetdepot.com — login
  `Tylor@craftedhomeimprovements.com`, password by phone (727-641-2347). *Not stored here.*
- **Top Knobs** — hardware — topknobs.com — no login; Tylor emails orders.
- **MSI Surfaces** — main countertop supplier — msisurfaces.com — portal is order-form only.
- **International Wholesale Tile** — tile & flooring — internationalwholesaletile.com — galleries
  public on the main site.

---

## Reproducing the probes

```bash
# IWT — open WP REST API, 1103 products
curl -sI "https://internationalwholesaletile.com/wp-json/wp/v2/product?per_page=2" | grep -i x-wp-total

# Top Knobs — Magento GraphQL responds
curl -s -X POST https://www.topknobs.com/graphql -H 'Content-Type: application/json' \
  -d '{"query":"{categoryList{id name url_path children{id name}}}"}'

# USCD — CDN blocks GraphQL (405)
curl -s -X POST https://www.uscabinetdepot.com/graphql -H 'Content-Type: application/json' \
  -d '{"query":"{products(search:\"cabinet\",pageSize:1){total_count}}"}'

# MSI — internal ASMX service, robots-disallowed
curl -sL https://www.msisurfaces.com/robots.txt | head -30
```
