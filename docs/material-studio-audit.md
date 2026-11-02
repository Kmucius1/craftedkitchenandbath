# Crafted Material Studio — Stage 1 audit

**Date:** 2026-11-02 · **Repo:** `crafted-catalog-live` (branch `catalog-popular`) · **Status:** audit only, nothing deployed

## Architecture decision: stay on Next.js, not WordPress/Elementor

The directive assumes WordPress/Elementor. The live Crafted site is a **Next.js 16 app** (this repo, remote
`Kmucius1/craftedkitchenandbath`), with Supabase for leads and the portal. There is no WordPress plugin target.
Building the Material Studio as a WP plugin would mean a second product database and a second site, which the
directive forbids. The studio is built here, inside the existing app, under `/catalog`.

## What already exists (reuse, don't rebuild)

| Piece | Where | State |
|---|---|---|
| Product model with verification-adjacent fields | `lib/designer/types.ts` — `Product` has `supplier`, `supplierSku`, `sourceUrl`, `isDemo`, `model3dStatus`, `modelUrl`, `availability`, `variants` | Real. Needs the four-way status split (below). |
| Approved supplier list | `APPROVED_SUPPLIERS` — US Cabinet Depot, MSI Surfaces, International Wholesale Tile, Top Knobs (+ Amazon, excluded from the public catalog) | Matches Tylor's four. |
| Catalog page, cards, filters | `app/catalog/page.tsx`, `components/catalog/ProductCard.tsx` | Live. |
| IWT importer | `scripts/import-iwt.py`, `iwt-catalog.generated.json` (545 products from the open WP REST API) | Real data; no discontinued-finish filter yet. |
| Supplier research | `docs/supplier-catalog-plan.md` (2026-07-30 probes) | Still accurate. |
| Quote / lead pipeline | `app/api/quote`, `app/api/contact`, `db/crm-schema.sql` | Exists; does not yet accept catalog selections. |
| Rotatable 3D cabinets | `lib/designer/cabinet-3d.ts`, `components/catalog/CabinetViewer.tsx` | Built 2026-11-02. **Procedural renderings at published dimensions, not manufacturer geometry** — see caveat. |

## Caveat on the 3D cabinets already built

The 15 USCD cabinet models are built from published width/height/depth plus an inferred door/drawer layout.
They are *not* manufacturer CAD and have not been checked against USCD documentation or a physical unit. Under
the directive's own rule (never label inferred geometry manufacturer-accurate) they must be labelled
"representative 3D rendering" and must not show as a verified 3D product until checked against USCD spec sheets.
The card badge currently reads "3D model" — change to "3D rendering" and gate on a verification status.

## What is accessible vs. missing, per supplier

| Supplier | Public data | 3D / CAD | Needed from Crafted |
|---|---|---|---|
| IWT / Tesoro | Open WP REST API (1,103 products); public catalogs | None published | Which lines Tylor actually orders; discontinued-finish list |
| MSI Surfaces | Marketing pages only; no product API | None public | Rep data feed + swatch library; written image permission |
| US Cabinet Depot | Spec sheets; per-SKU photos behind dealer login | None public | Rep export of dealer catalog; CAD/3D if USCD has any; image permission |
| Top Knobs | Magento GraphQL responds, category tree gated | Top Knobs publishes some CAD/3D for dealers (unconfirmed) | Rep product CSV; ask rep for CAD/3D downloads |

No supplier 3D/CAD files exist anywhere in this project. Nothing in the repo or on this machine can be
imported as real manufacturer geometry today.

## Gaps against the directive (build list)

1. **Four-way status split.** `Product` conflates catalog presence / Crafted-approved / orderable / stocked.
   Add `verification` record: `inSupplierCatalog`, `craftedApproved`, `orderable`, `stockedWarehouse`,
   `lastVerifiedAt`, `assetLicense`, `modelSource` (`manufacturer` | `measured` | `scan` | `representative`).
2. **Publish gate.** Only products with `craftedApproved` and a complete checklist render as verified.
3. **Discontinued handling** in the IWT importer (Krea finishes flagged by IWT).
4. **Saved project board + quote submission** carrying exact SKU/finish/size into `/api/quote` and the CRM.
5. **Admin**: lives in the Crafted CRM app (per the 2026-07-30 plan), not this repo.
6. **General 3D viewer** (zoom, reset, fullscreen, finish swap) for products with real GLB assets — blocked
   on assets, except the representative cabinets.

## Blockers needing Tylor / Crafted

- The ~10 SKUs for the pilot, confirmed against what Crafted actually orders.
- Rep contacts and written image/asset permission from each supplier.
- Dealer exports (USCD, Top Knobs) and any CAD/3D from all four.
- Write access to the CRM project for the admin pages.

## Not done / not claimed

Nothing here is tested end-to-end except: typecheck, lint and production build of the 3D cabinet viewer.
That viewer has not been seen rendering in a browser (Chrome could not reach the local dev server).
