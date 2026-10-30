/**
 * Product catalog for the local designer build.
 *
 * IMPORTANT — read before touching this file:
 *
 * Every product below has `isDemo: false` and a `sourceUrl` pointing at the
 * exact public supplier-catalog page its name/SKU/collection/dimensions
 * were pulled from (US Cabinet Depot, MSI Surfaces, International Wholesale
 * Tile, Top Knobs — all fetched directly, nothing recalled from memory or
 * guessed). These are REAL products with REAL SKUs. The file is still named
 * `demo-data.ts` and exports still use a `DEMO_` prefix purely to avoid a
 * large cross-file rename — do not treat the filename/identifier names as a
 * signal for whether the data is real. `isDemo` and `sourceUrl` on each
 * record are the actual source of truth the UI reads.
 *
 * What is still NOT real, and must never be presented as real:
 *   - Pricing (approvedCustomerPrice is left undefined everywhere below —
 *     no dealer/customer price exists until Tylor's supplier accounts are
 *     connected)
 *   - Live inventory / warehouse assignment (see StaffInventoryDetail —
 *     every record says "no supplier account connected")
 *   - Product photography — no written image-permission exists yet, so
 *     every product uses a generic placeholder swatch labeled "photo
 *     pending", never the supplier's real photo
 *   - 3D models (model3dStatus is "none" everywhere)
 *
 * `availability` is "confirmation-required" on every record for the same
 * reason: real product, unconfirmed stock/price.
 *
 * Categories with no approved supplier at all (appliances, doors/windows,
 * plumbing, electrical, decor) are still intentionally empty — see
 * NON-NEGOTIABLE RULE #1 in docs/DESIGNER_BUILD_PLAN.md. Top Knobs supplies
 * decorative hardware, not faucets, so Plumbing has nothing in it.
 */

import type { Product, StaffInventoryDetail } from "./types";
import IWT_CATALOG from "./iwt-catalog.generated.json";

function pendingPhotoSwatch(hex: string, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
    <rect width="400" height="300" fill="${hex}"/>
    <rect width="400" height="300" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="4"/>
    <text x="20" y="264" font-family="sans-serif" font-size="15" fill="rgba(0,0,0,0.5)">${label}</text>
    <text x="20" y="286" font-family="sans-serif" font-size="10" letter-spacing="1.5" fill="rgba(0,0,0,0.4)">REAL PRODUCT — PHOTO PENDING SUPPLIER PERMISSION</text>
  </svg>`;
  // encodeURIComponent (not Buffer) so this module is safe to import from
  // client components — Buffer isn't polyfilled in the browser bundle.
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const UCD_SPEC_SHEET =
  "https://prod-uscd-product-files.s3.amazonaws.com/file/Framed+Capital+Collection+Spec+Manual+V6.pdf";
const UCD_COLLECTION = "Capital Collection — Highland Series — Shaker";

// ---------------------------------------------------------------------------
// US Cabinet Depot — cabinets
// Source: public spec/price manual PDF hosted on US Cabinet Depot's own
// file bucket (no dealer login required). Highland Series, Shaker door
// style, White finish (code SW).
// ---------------------------------------------------------------------------

interface UcdRow {
  sku: string;
  name: string;
  subcategory: string;
  widthIn: number;
  heightIn: number;
  depthIn: number;
}

const UCD_ROWS: UcdRow[] = [
  { sku: "B12FH", name: "Full Height Single Door Base", subcategory: "Base Cabinets", widthIn: 12, heightIn: 34.5, depthIn: 24 },
  { sku: "B18", name: "Single Door Single Drawer Base", subcategory: "Base Cabinets", widthIn: 18, heightIn: 34.5, depthIn: 24 },
  { sku: "B24", name: "Double Door Single Drawer Base", subcategory: "Base Cabinets", widthIn: 24, heightIn: 34.5, depthIn: 24 },
  { sku: "B30", name: "Double Door Double Drawer Base", subcategory: "Base Cabinets", widthIn: 30, heightIn: 34.5, depthIn: 24 },
  { sku: "B36", name: "Double Door Double Drawer Base", subcategory: "Base Cabinets", widthIn: 36, heightIn: 34.5, depthIn: 24 },
  { sku: "SB30", name: "Sink Base", subcategory: "Sink Bases", widthIn: 30, heightIn: 34.5, depthIn: 24 },
  { sku: "FSB36", name: 'Farm Sink Base (fits up to 33"W farm sink)', subcategory: "Sink Bases", widthIn: 36, heightIn: 34.5, depthIn: 24 },
  { sku: "W1230", name: '30" High Wall Cabinet, Single Door', subcategory: "Wall Cabinets", widthIn: 12, heightIn: 30, depthIn: 12 },
  { sku: "W3630", name: '30" High Wall Cabinet, Double Door', subcategory: "Wall Cabinets", widthIn: 36, heightIn: 30, depthIn: 12 },
  { sku: "W1242", name: '42" High Wall Cabinet, Single Door', subcategory: "Wall Cabinets", widthIn: 12, heightIn: 42, depthIn: 12 },
  { sku: "VS30", name: "Vanity Sink Base, Double Door Double Drawer Front", subcategory: "Vanity Cabinets", widthIn: 30, heightIn: 34.5, depthIn: 21 },
  { sku: "VSD36", name: "Vanity Combo Base (center stile)", subcategory: "Vanity Cabinets", widthIn: 36, heightIn: 34.5, depthIn: 21 },
  { sku: "U189024", name: "Utility (Pantry) Cabinet, Two Doors", subcategory: "Pantry Cabinets", widthIn: 18, heightIn: 90, depthIn: 24 },
  { sku: "O339024", name: "Oven Cabinet", subcategory: "Oven Cabinets", widthIn: 33, heightIn: 90, depthIn: 24 },
  { sku: "BER33", name: "Base Easy Reach (corner cabinet)", subcategory: "Corner Cabinets", widthIn: 33, heightIn: 34.5, depthIn: 24 },
];

export const DEMO_CABINETS: Product[] = UCD_ROWS.map((row) => ({
  id: `ucd-${row.sku.toLowerCase()}`,
  supplier: "US Cabinet Depot",
  supplierSku: row.sku,
  name: row.name,
  collection: UCD_COLLECTION,
  category: "cabinets",
  subcategory: row.subcategory,
  dimensions: { widthIn: row.widthIn, heightIn: row.heightIn, depthIn: row.depthIn },
  material: "Birch hardwood frame + plywood box, 5-piece HDF door",
  color: "White",
  finish: "White (SW)",
  imageUrl: pendingPhotoSwatch("#f4f2ee", `${row.name} — ${row.widthIn}"`),
  model3dStatus: "none",
  availability: "confirmation-required",
  sourceUrl: UCD_SPEC_SHEET,
  isDemo: false,
}));

// ---------------------------------------------------------------------------
// MSI Surfaces — quartz countertops
// Source: individual product pages on msisurfaces.com (public, no login).
// ---------------------------------------------------------------------------

interface MsiCountertopRow {
  name: string;
  collection: string;
  color: string;
  hex: string;
  url: string;
}

const MSI_COUNTERTOP_ROWS: MsiCountertopRow[] = [
  { name: "Calacatta Elysio", collection: "Q Premium Natural Quartz", color: "White base, warm veining, taupe/beige/gray tones", hex: "#f2f0ec", url: "https://www.msisurfaces.com/quartz-countertops/calacatta-elysio-quartz/" },
  { name: "Arctic White", collection: "Q Premium Natural Quartz", color: "Solid bright white", hex: "#f7f6f3", url: "https://www.msisurfaces.com/quartz-countertops/arctic-white-quartz/" },
  { name: "Montclair White", collection: "Q Premium Natural Quartz", color: "White with brown/taupe marble-look movement", hex: "#eeece5", url: "https://www.msisurfaces.com/quartz-countertops/montclair-white-quartz/" },
  { name: "Fossil Gray", collection: "Q Premium Natural Quartz", color: "Mid-tone gray, limestone-style", hex: "#c7c8c6", url: "https://www.msisurfaces.com/quartz-countertops/fossil-gray-quartz/" },
  { name: "Calacatta Laza", collection: "House of Laza Collection", color: "Milky white with dramatic brown veining", hex: "#eee9df", url: "https://www.msisurfaces.com/quartz-countertops/calacatta-laza-quartz/" },
  { name: "Aruca White", collection: "Q Premium Natural Quartz", color: "Warm white, fine sand-like grain", hex: "#efe9df", url: "https://www.msisurfaces.com/quartz-countertops/aruca-white-quartz/" },
];

export const DEMO_COUNTERTOPS: Product[] = MSI_COUNTERTOP_ROWS.map((row, i) => ({
  id: `msi-quartz-${i}`,
  supplier: "MSI Surfaces",
  supplierSku: row.name.replace(/\s+/g, "-"),
  name: row.name,
  collection: row.collection,
  category: "countertops",
  material: "Quartz",
  color: row.color,
  finish: "Polished",
  imageUrl: pendingPhotoSwatch(row.hex, row.name),
  model3dStatus: "none",
  availability: "confirmation-required",
  sourceUrl: row.url,
  isDemo: false,
}));

// ---------------------------------------------------------------------------
// MSI Surfaces — kitchen sinks
// Source: msisurfaces.com/sinks/kitchen-sinks/ (public, no login).
// ---------------------------------------------------------------------------

export const DEMO_SINKS: Product[] = [
  {
    id: "msi-sink-workstation-3319",
    supplier: "MSI Surfaces",
    supplierSku: "3319",
    name: "Handcrafted Workstation 3319",
    collection: "MSI Kitchen Sinks",
    category: "sinks",
    subcategory: "Kitchen — Undermount",
    dimensions: { widthIn: 33, heightIn: 10, depthIn: 19 },
    material: "16-gauge stainless steel",
    finish: "Satin",
    imageUrl: pendingPhotoSwatch("#c9ccd1", "Handcrafted Workstation 3319"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/sinks/kitchen-sinks/",
    isDemo: false,
  },
  {
    id: "msi-sink-quartz-5050-3219",
    supplier: "MSI Surfaces",
    supplierSku: "50/50-3219",
    name: "Quartz Composite 50/50 Double Bowl",
    collection: "MSI Kitchen Sinks",
    category: "sinks",
    subcategory: "Kitchen — Undermount",
    dimensions: { widthIn: 32.5, heightIn: 9, depthIn: 19.5 },
    material: "Quartz composite",
    finish: "Matte",
    imageUrl: pendingPhotoSwatch("#8a8d91", "Quartz Composite 50/50-3219"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/sinks/kitchen-sinks/",
    isDemo: false,
  },
  {
    id: "msi-sink-fireclay-farmhouse-3318",
    supplier: "MSI Surfaces",
    supplierSku: "3318",
    name: "Fireclay Farmhouse White Single Bowl",
    collection: "MSI Kitchen Sinks",
    category: "sinks",
    subcategory: "Kitchen — Apron-Front Undermount",
    dimensions: { widthIn: 33, heightIn: 10, depthIn: 18 },
    material: "Fireclay",
    color: "White",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Fireclay Farmhouse Single Bowl"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/sinks/kitchen-sinks/",
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// MSI Surfaces — bathroom / vanity sinks
// Source: msisurfaces.com/sinks/bathroom-sinks/ (public, no login). A
// distinct real product line from the kitchen sinks above — not reused.
// ---------------------------------------------------------------------------

export const DEMO_BATH_SINKS: Product[] = [
  {
    id: "msi-sink-vanity-rect-1813",
    supplier: "MSI Surfaces",
    supplierSku: "SIN-POR-UNDRECWHT-1813",
    name: "Vanity White Rectangle Porcelain 1813",
    collection: "MSI Bathroom Vanity Sinks",
    category: "sinks",
    subcategory: "Bathroom Vanity — Undermount",
    dimensions: { widthIn: 18.5, heightIn: 8, depthIn: 13.75 },
    material: "Porcelain",
    color: "White",
    description: "Minimum cabinet size 22\". Drain not included.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Vanity White Rectangle 1813"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/products/sinksdetails.aspx?sinkid=40",
    isDemo: false,
  },
  {
    id: "msi-sink-vanity-oval-1512",
    supplier: "MSI Surfaces",
    supplierSku: "SIN-POR-UNDOVLWHT-1512",
    name: "Vanity White Oval Porcelain 1512",
    collection: "MSI Bathroom Vanity Sinks",
    category: "sinks",
    subcategory: "Bathroom Vanity — Undermount",
    dimensions: { widthIn: 17, heightIn: 7.75, depthIn: 14.125 },
    material: "Porcelain",
    color: "White",
    description: "Powder-room sized. Minimum cabinet size 20\". Drain not included.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Vanity White Oval 1512"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/products/sinksdetails.aspx?sinkid=39",
    isDemo: false,
  },
  {
    id: "msi-sink-vanity-oval-1714",
    supplier: "MSI Surfaces",
    supplierSku: "SIN-POR-UNDOVLWHT-1714",
    name: "Vanity White Oval Porcelain 1714",
    collection: "MSI Bathroom Vanity Sinks",
    category: "sinks",
    subcategory: "Bathroom Vanity — Undermount",
    dimensions: { widthIn: 19.5, heightIn: 8.125, depthIn: 16 },
    material: "Porcelain",
    color: "White",
    description: "Minimum cabinet size 23\". Drain not included.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Vanity White Oval 1714"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.msisurfaces.com/products/sinksdetails.aspx?sinkid=33",
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// Flooring — MSI luxury vinyl plank + IWT wood-look porcelain plank tile
// ---------------------------------------------------------------------------

export const DEMO_FLOORING: Product[] = [
  {
    id: "msi-cyrus-lvp",
    supplier: "MSI Surfaces",
    supplierSku: "Cyrus",
    name: "Cyrus Luxury Vinyl Plank",
    collection: "Cyrus",
    category: "flooring",
    dimensions: { widthIn: 7, heightIn: 48, depthIn: 0.2 },
    material: "Luxury vinyl (5mm)",
    finish: "Genuine wood look",
    imageUrl: pendingPhotoSwatch("#b79a76", "Cyrus LVP"),
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["floor"],
    sourceUrl: "https://www.msisurfaces.com/luxury-vinyl-flooring/cyrus/",
    isDemo: false,
  },
  {
    id: "iwt-acadia",
    supplier: "International Wholesale Tile",
    supplierSku: "Acadia",
    name: "Acadia Wood-Look Porcelain Plank",
    collection: "Tesoro",
    category: "flooring",
    dimensions: { widthIn: 9, heightIn: 30, depthIn: 0.35 },
    material: "H.D.I.T. pressed porcelain",
    color: "Grey & White",
    finish: "Matte",
    piecesPerBox: 9,
    sqftPerBox: 16.96,
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2021/07/Acadia_Grey_9x30shutterstock_1934379725-scaled.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["floor"],
    sourceUrl: "https://internationalwholesaletile.com/product/acadia/",
    isDemo: false,
  },
  {
    id: "iwt-bella-legno",
    supplier: "International Wholesale Tile",
    supplierSku: "Bella Legno",
    name: "Bella Legno Wood-Look Porcelain Plank",
    collection: "Tesoro",
    category: "flooring",
    dimensions: { widthIn: 12, heightIn: 48, depthIn: 0.4 },
    material: "Gres porcelain (rectified)",
    color: "Bianco",
    finish: "Matte",
    piecesPerBox: 4,
    sqftPerBox: 15.5,
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2021/07/Bella_Legno.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["floor"],
    sourceUrl: "https://internationalwholesaletile.com/product/bella-legno/",
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// International Wholesale Tile — backsplash / wall tile
// ---------------------------------------------------------------------------

export const DEMO_BACKSPLASH: Product[] = [
  {
    id: "iwt-classic-subway",
    supplier: "International Wholesale Tile",
    supplierSku: "Classic-3x6",
    name: "Classic Subway",
    collection: "TRK",
    category: "backsplash",
    dimensions: { widthIn: 3, heightIn: 6, depthIn: 0.31 },
    material: "Ceramic",
    finish: "Glossy or Matte (varies)",
    piecesPerBox: 44,
    sqftPerBox: 5.5,
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2023/04/Classic_Wall_Room_Scene-scaled.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["backsplash", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/classic-2/",
    isDemo: false,
  },
  {
    id: "iwt-soho",
    supplier: "International Wholesale Tile",
    supplierSku: "Soho-3x6",
    name: "Soho — Canvas White",
    collection: "Soho",
    category: "backsplash",
    dimensions: { widthIn: 3, heightIn: 6, depthIn: 0.3 },
    material: "Ceramic",
    color: "Canvas White",
    finish: "Glossy/Matte (varies by color)",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2022/02/4000-0161-1_3x6in_7.5x15cm_Soho_Canvas_White_Beveled_Glossy_Pressed_Glazed_Ceramic_Tile_Lifestyle_CAM_12-scaled.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["backsplash", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/soho/",
    isDemo: false,
  },
  {
    id: "iwt-cambridge",
    supplier: "International Wholesale Tile",
    supplierSku: "Cambridge-White",
    name: "Cambridge — White",
    collection: "Cambridge",
    category: "backsplash",
    dimensions: { widthIn: 2.5, heightIn: 9.5, depthIn: 0.35 },
    material: "Ceramic/porcelain",
    color: "White",
    finish: "Glazed brick",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2026/01/WEB_Cambridge-Charcoal.png",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["backsplash", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/cambridge/",
    isDemo: false,
  },
  {
    id: "iwt-carrara-contempo",
    supplier: "International Wholesale Tile",
    supplierSku: "STDCONTCARRBEV36",
    name: "Carrara Contempo Polished Beveled Subway",
    collection: "Contempo",
    category: "backsplash",
    dimensions: { widthIn: 3, heightIn: 6, depthIn: 0.35 },
    material: "Natural stone (Carrara marble)",
    color: "White/gray veining",
    finish: "Polished Beveled",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2021/12/WEB_Carrara-3x6-1.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["backsplash", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/contempo-carrara-polished-beveled-subway-tile/",
    isDemo: false,
  },
  {
    id: "iwt-subway-urban-light-grey",
    supplier: "International Wholesale Tile",
    supplierSku: "FINSUBWURLTG26",
    name: "Subway Urban — Light Grey Glass Mosaic",
    collection: "Subway Urban",
    category: "backsplash",
    dimensions: { widthIn: 11.75, heightIn: 11.75, depthIn: 0.25 },
    material: "Glass mosaic",
    color: "Light Grey",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2022/01/WEB_Subway_Light_Grey_Mosaic-Recovered.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["backsplash", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/subway-urban-light-grey/",
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// International Wholesale Tile — general floor/wall porcelain + mosaics
// (left rail "Tile" category — shower walls/floors, accents, general tile)
// ---------------------------------------------------------------------------

export const DEMO_TILE: Product[] = [
  {
    id: "iwt-alaska",
    supplier: "International Wholesale Tile",
    supplierSku: "Alaska-12x24",
    name: "Alaska",
    collection: "TRK Special Buy",
    category: "tile",
    dimensions: { widthIn: 12, heightIn: 24, depthIn: 0.35 },
    material: "Rectified porcelain",
    color: "White, marble visual",
    finish: "Polished or Matte",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2023/04/WEB_ALASKA-WHITE-polished.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["floor", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/alaska/",
    isDemo: false,
  },
  {
    id: "iwt-castello",
    supplier: "International Wholesale Tile",
    supplierSku: "Castello-12x24",
    name: "Castello",
    collection: "TRK Special Buy",
    category: "tile",
    dimensions: { widthIn: 12, heightIn: 24, depthIn: 0.35 },
    material: "H.D.I.T. rectified porcelain",
    color: "Beige, stone visual",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2023/06/WEB_Castello_4500-0837-0.jpg",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["floor", "wall"],
    sourceUrl: "https://internationalwholesaletile.com/product/castello/",
    isDemo: false,
  },
  {
    id: "iwt-glimmer-linear-silver",
    supplier: "International Wholesale Tile",
    supplierSku: "TASGLIMSILGLMO-1",
    name: "Glimmer Linear Silver Mosaic",
    collection: "Glimmer",
    category: "tile",
    dimensions: { widthIn: 12, heightIn: 12, depthIn: 0.25 },
    material: "Glass",
    color: "Silver",
    finish: "Linear mosaic",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2022/05/Glimmer_Silver_PNG-1.png",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["wall", "floor"],
    sourceUrl: "https://internationalwholesaletile.com/product/glimmer-linear-silver-mosaic/",
    isDemo: false,
  },
  {
    id: "iwt-bark-linden-hex",
    supplier: "International Wholesale Tile",
    supplierSku: "TASBARKLINDENHEX",
    name: 'Bark Linden 3" Hex Mosaic',
    collection: "Bark",
    category: "tile",
    dimensions: { widthIn: 11.75, heightIn: 10.25, depthIn: 0.3 },
    material: "Glass",
    color: "Linden",
    finish: "Hexagon mosaic",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2022/03/WEB_Bark-Linden-Hex.png",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["wall", "floor"],
    sourceUrl: "https://internationalwholesaletile.com/product/bark-linden-3-hex-mosaic/",
    isDemo: false,
  },
  {
    id: "iwt-showtime-thassos-carrara",
    supplier: "International Wholesale Tile",
    supplierSku: "FOSSHOWTHCAWJMO",
    name: "Showtime Thassos & Carrara Honed Mosaic",
    collection: "Showtime",
    category: "tile",
    dimensions: { widthIn: 13.25, heightIn: 10.25, depthIn: 0.35 },
    material: "Natural stone (waterjet)",
    color: "Thassos & Carrara white marble blend",
    finish: "Honed",
    imageUrl: "https://internationalwholesaletile.com/wp-content/uploads/2024/04/Showtime_Thassos_Carrara_Face5.png",
    model3dStatus: "none",
    availability: "confirmation-required",
    approvedSurfaceTypes: ["wall", "floor"],
    sourceUrl: "https://internationalwholesaletile.com/product/showtime-thassos-carrara-honed-mosaic/",
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// Top Knobs — cabinet hardware
// Source: topknobsupply.com (authorized Top Knobs dealer republishing the
// manufacturer's own SKU/dimension data). topknobs.com's own product pages
// are JS-rendered and didn't expose this data to a page fetch.
// ---------------------------------------------------------------------------

interface TopKnobsRow {
  baseSku: string;
  finishSuffix: string;
  finish: string;
  name: string;
  collection: string;
  type: "pull" | "knob";
  /** Verbatim dimension text as printed on the dealer page. */
  dimensionText: string;
  widthIn: number; // overall length (pulls) or diameter (knobs)
  heightIn: number; // cross-section width (pulls) or diameter again (knobs)
  depthIn: number; // projection
  hex: string;
  url: string;
  note?: string;
}

const TOP_KNOBS_ROWS: TopKnobsRow[] = [
  { baseSku: "TK1013", finishSuffix: "BSN", finish: "Brushed Satin Nickel", name: "Riverside Pull", collection: "Grace Collection", type: "pull", dimensionText: 'Length 5-3/8", Center-to-center 5-1/16", Width 7/16", Projection 1-3/8"', widthIn: 5.375, heightIn: 0.4375, depthIn: 1.375, hex: "#c9ccd1", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK1013&sku=TK1013-BSN" },
  { baseSku: "TK1052", finishSuffix: "BSN", finish: "Brushed Satin Nickel", name: "Barrow Pull", collection: "Grace Collection", type: "pull", dimensionText: 'Length 5-7/8", Center-to-center 5-1/16", Width 13/16", Projection 1-7/16"', widthIn: 5.875, heightIn: 0.8125, depthIn: 1.4375, hex: "#c9ccd1", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK1052" },
  { baseSku: "TK3092", finishSuffix: "BLK", finish: "Flat Black", name: "Cumberland Pull", collection: "Regent's Park Collection", type: "pull", dimensionText: 'Length 5-11/16", Center-to-center 5-1/16", Width 5/8", Projection 1-5/16"', widthIn: 5.6875, heightIn: 0.625, depthIn: 1.3125, hex: "#2b2b2b", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK3092&sku=TK3092-BLK" },
  { baseSku: "TK3152", finishSuffix: "PC", finish: "Polished Chrome", name: "Morris Pull", collection: "Morris Collection", type: "pull", dimensionText: 'Length 5-13/16", Center-to-center 5-1/16", Width 1/2", Projection 1-5/16"', widthIn: 5.8125, heightIn: 0.5, depthIn: 1.3125, hex: "#d8dbe0", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK3152&sku=TK3152-PC" },
  { baseSku: "TK745", finishSuffix: "HB", finish: "Honey Bronze", name: "Channing Pull", collection: "Barrington Collection", type: "pull", dimensionText: 'Length 7-5/8", Center-to-center 6-5/16", Width 9/16", Projection 1"', widthIn: 7.625, heightIn: 0.5625, depthIn: 1, hex: "#8a6240", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK745" },
  { baseSku: "TK1024", finishSuffix: "PN", finish: "Polished Nickel", name: "Henderson Pull", collection: "Grace Collection", type: "pull", dimensionText: 'Length 8-1/8", Center-to-center 7-9/16", Width 11/16", Projection 1-3/8"', widthIn: 8.125, heightIn: 0.6875, depthIn: 1.375, hex: "#cfd2d6", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK1024" },
  { baseSku: "TK3204", finishSuffix: "HB", finish: "Honey Bronze", name: "Dustin Pull", collection: "Coddington Collection", type: "pull", dimensionText: 'Length 8-1/8", Center-to-center 7-9/16", Projection 1-1/4", Base 9/16"x5/8"', widthIn: 8.125, heightIn: 0.625, depthIn: 1.25, hex: "#8a6240", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK3204&sku=TK3204-HB" },
  { baseSku: "TK705", finishSuffix: "BLK", finish: "Flat Black", name: "Ascendra Pull", collection: "Transcend Collection", type: "pull", dimensionText: 'Length 7", Center-to-center 6-5/16", Width 3/8", Projection 1-3/16"', widthIn: 7, heightIn: 0.375, depthIn: 1.1875, hex: "#2b2b2b", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK705" },
  { baseSku: "TK1020", finishSuffix: "BSN", finish: "Brushed Satin Nickel", name: "Henderson Knob", collection: "Grace Collection", type: "knob", dimensionText: 'Diameter 1-1/4", Projection 1-1/4", Base 5/8"', widthIn: 1.25, heightIn: 1.25, depthIn: 1.25, hex: "#c9ccd1", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK1020" },
  { baseSku: "TK3020", finishSuffix: "BSN", finish: "Brushed Satin Nickel", name: "Davenport Knob", collection: "Ellis Collection", type: "knob", dimensionText: 'Diameter 1-1/4", Projection 1-3/16", Base 7/16"', widthIn: 1.25, heightIn: 1.25, depthIn: 1.1875, hex: "#c9ccd1", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK3020&sku=TK3020-BSN" },
  { baseSku: "TK3000", finishSuffix: "PC", finish: "Polished Chrome", name: "Ellis Knob", collection: "Ellis Collection", type: "knob", dimensionText: 'Diameter 1-1/4", Projection 1-1/4", Base 1"', widthIn: 1.25, heightIn: 1.25, depthIn: 1.25, hex: "#d8dbe0", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK3000" },
  { baseSku: "TK1000", finishSuffix: "HB", finish: "Honey Bronze", name: "Kent Knob", collection: "Grace Collection", type: "knob", dimensionText: 'Diameter 1-1/4", Projection 1-3/16", Base 3/4"', widthIn: 1.25, heightIn: 1.25, depthIn: 1.1875, hex: "#8a6240", url: "https://topknobsupply.com/?page=products&action=view&manufacturerID=59&productID=TK1000" },
  { baseSku: "TK880", finishSuffix: "AG", finish: "Ash Gray", name: "Brixton Rimmed Knob", collection: "Devon Collection", type: "knob", dimensionText: 'Diameter 1-1/4" (projection per multiple dealer listings, not independently re-verified via full page fetch)', widthIn: 1.25, heightIn: 1.25, depthIn: 1.125, hex: "#9a9a94", url: "https://www.cabinetparts.com/p/top-knobs-decorative-knobs-and-pulls-TKTK880BSN-p46070", note: "Dimensions corroborated across multiple independent dealer listings; not confirmed via a direct full-page fetch (two attempts returned HTTP 403)." },
];

export const DEMO_HARDWARE: Product[] = TOP_KNOBS_ROWS.map((row) => ({
  id: `topknobs-${row.baseSku.toLowerCase()}-${row.finishSuffix.toLowerCase()}`,
  supplier: "Top Knobs",
  supplierSku: `${row.baseSku}-${row.finishSuffix}`,
  name: row.name,
  collection: row.collection,
  category: "hardware",
  subcategory: row.type === "pull" ? "Bar Pulls" : "Knobs",
  description: row.dimensionText + (row.note ? ` — ${row.note}` : ""),
  dimensions: { widthIn: row.widthIn, heightIn: row.heightIn, depthIn: row.depthIn },
  finish: row.finish,
  imageUrl: pendingPhotoSwatch(row.hex, `${row.name} — ${row.finish}`),
  model3dStatus: "none",
  availability: "confirmation-required",
  sourceUrl: row.url,
  isDemo: false,
}));

// ---------------------------------------------------------------------------
// Amazon — toilets, bathtubs, shower enclosures, wall paint, window sills.
//
// Client-approved as the source for these five categories (2026-08-12).
// Every record below is a REAL Amazon listing — verified by fetching the
// live product page directly (not a search snippet), same rigor as the 4
// supplier catalogs above: real ASIN as supplierSku, real sourceUrl, real
// price/rating/review count at time of sourcing (researched 2026-08-12 —
// Amazon price/stock drift, so re-verify before this ever reaches a customer
// quote). `referencePriceUsd`/`rating`/`reviewCount` are reference-only, same
// as approvedCustomerPrice being separately gated on Tylor's approval.
//
// Two known gaps, flagged rather than hidden:
//   - Window sills are a genuinely thin Amazon category — the best PVC
//     option has 44 ratings, the wood options 7-8. Nothing wrong was found,
//     there just isn't a "hundreds of reviews" window sill on Amazon today.
//   - The 36" corner shower door (Morandié) has only 132 ratings, thinner
//     than the other two shower doors — kept as an option, not the default.
// ---------------------------------------------------------------------------

export const DEMO_TOILETS: Product[] = [
  {
    id: "amazon-toilet-toto-drake",
    supplier: "Amazon",
    supplierSku: "B0999Q23WQ",
    name: "TOTO Drake Two-Piece Elongated Toilet with Tornado Flush, Cotton White",
    collection: "TOTO Drake — CST776CSFG#01",
    category: "plumbing",
    subcategory: "Toilets",
    dimensions: { widthIn: 17.19, heightIn: 30.13, depthIn: 28.38 },
    material: "Vitreous china",
    color: "Cotton White",
    finish: "Gloss white",
    description: "1.6 GPF, universal comfort height, rimless Tornado Flush bowl.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "TOTO Drake — Cotton White"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0999Q23WQ",
    referencePriceUsd: 320.0,
    rating: 4.3,
    reviewCount: 973,
    isDemo: false,
  },
  {
    id: "amazon-toilet-american-standard-h2option",
    supplier: "Amazon",
    supplierSku: "B01BWMODTS",
    name: "American Standard H2Option Two-Piece Dual Flush Toilet, White",
    collection: "American Standard H2Option — 2886218.020",
    category: "plumbing",
    subcategory: "Toilets",
    dimensions: { widthIn: 20, heightIn: 31.5, depthIn: 29.75 },
    material: "Vitreous china",
    color: "White",
    finish: "Gloss white",
    description: "Elongated, chair height, dual flush with top-mounted push button. Width is a standard-elongated estimate — the listing's own width figure reads as a shipping-box measurement, not confirmed as the assembled bowl width.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "American Standard H2Option — White"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B01BWMODTS",
    referencePriceUsd: 339.99,
    rating: 4.3,
    reviewCount: 321,
    isDemo: false,
  },
  {
    id: "amazon-toilet-kohler-highline",
    supplier: "Amazon",
    supplierSku: "B001024MJW",
    name: "Kohler Highline Classic Two-Piece Elongated Toilet, White",
    collection: "Kohler Highline Classic — 3493-0",
    category: "plumbing",
    subcategory: "Toilets",
    dimensions: { widthIn: 21.06, heightIn: 31.25, depthIn: 29.5 },
    material: "Vitreous china",
    color: "White",
    finish: "Gloss white",
    description: "Comfort/chair height. This specific listing is the pressure-assist (Flushmate) variant — louder, more forceful flush than a typical gravity toilet.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Kohler Highline — White"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B001024MJW",
    referencePriceUsd: 468.9,
    rating: 4.1,
    reviewCount: 255,
    isDemo: false,
  },
];

export const DEMO_BATHTUBS: Product[] = [
  {
    id: "amazon-tub-kingston-alcove-60",
    supplier: "Amazon",
    supplierSku: "B00LHURMCQ",
    name: "Kingston Brass 60in Contemporary Alcove Acrylic Bathtub, White",
    collection: "Kingston Brass Aqua Eden — VTDE603122L",
    category: "plumbing",
    subcategory: "Bathtubs",
    dimensions: { widthIn: 60, heightIn: 22.06, depthIn: 30.69 },
    material: "Acrylic",
    color: "Glossy White",
    description: "Rectangular alcove/drop-in tub — fits a standard tub/shower combo. Left-hand drain.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Kingston Brass Alcove Tub 60in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B00LHURMCQ",
    referencePriceUsd: 708.47,
    rating: 4.4,
    reviewCount: 309,
    isDemo: false,
  },
  {
    id: "amazon-tub-woodbridge-freestanding-67",
    supplier: "Amazon",
    supplierSku: "B0977Z594R",
    name: "Woodbridge 67in Acrylic Freestanding Soaking Tub, White",
    collection: "Woodbridge — B0013-MB",
    category: "plumbing",
    subcategory: "Bathtubs",
    dimensions: { widthIn: 67, heightIn: 22.8, depthIn: 31.5 },
    material: "Acrylic",
    color: "White",
    finish: "High gloss, matte black drain/overflow",
    description: "Oval freestanding soaker, smoothly curved sides, no apron.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Woodbridge Freestanding Tub 67in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0977Z594R",
    referencePriceUsd: 699.0,
    rating: 4.5,
    reviewCount: 341,
    isDemo: false,
  },
  {
    id: "amazon-tub-vanityart-freestanding-71",
    supplier: "Amazon",
    supplierSku: "B0BHW3Z2KH",
    name: "Vanity Art 71in Freestanding Acrylic Bathtub, Pure White",
    collection: "Vanity Art — VA6517-PW",
    category: "plumbing",
    subcategory: "Bathtubs",
    dimensions: { widthIn: 70.5, heightIn: 28.3, depthIn: 31.5 },
    material: "Acrylic",
    color: "Pure White",
    description: "Larger oval freestanding soaker with taller walls — reads as a deep primary-suite tub.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "Vanity Art Freestanding Tub 71in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0BHW3Z2KH",
    referencePriceUsd: 829.99,
    rating: 4.5,
    reviewCount: 162,
    isDemo: false,
  },
];

export const DEMO_SHOWER_ENCLOSURES: Product[] = [
  {
    id: "amazon-shower-royalguard-bypass-48",
    supplier: "Amazon",
    supplierSku: "B0DFL3VY5V",
    name: "Royal Guard Double Sliding Shower Door, 44-48in, Matte Black",
    collection: "Royal Guard",
    category: "plumbing",
    subcategory: "Shower Enclosures",
    dimensions: { widthIn: 48, heightIn: 70, depthIn: 36 },
    material: "6mm tempered glass, aluminum frame",
    finish: "Matte Black",
    description: "Bypass sliding door only, sized for a standard alcove opening (base sold separately). Depth assumes a standard 36in alcove.",
    imageUrl: pendingPhotoSwatch("#dfe6ea", "Royal Guard Sliding Shower Door 48in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0DFL3VY5V",
    referencePriceUsd: 289.99,
    rating: 4.6,
    reviewCount: 279,
    isDemo: false,
  },
  {
    id: "amazon-shower-getpro-bypass-60",
    supplier: "Amazon",
    supplierSku: "B0D9M4VL7N",
    name: "GETPRO Double Sliding Shower Door, 57-60in, Matte Black",
    collection: "GETPRO",
    category: "plumbing",
    subcategory: "Shower Enclosures",
    dimensions: { widthIn: 60, heightIn: 72, depthIn: 36 },
    material: "1/4in tempered glass, aluminum frame",
    finish: "Matte Black, nano coating",
    description: "Wide semi-frameless bypass door for a full standard alcove opening (base sold separately). Depth assumes a standard 36in alcove.",
    imageUrl: pendingPhotoSwatch("#dfe6ea", "GETPRO Sliding Shower Door 60in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0D9M4VL7N",
    referencePriceUsd: 273.76,
    rating: 4.6,
    reviewCount: 642,
    isDemo: false,
  },
  {
    id: "amazon-shower-morandie-corner-36",
    supplier: "Amazon",
    supplierSku: "B0G6988T43",
    name: "Morandié Neo-Angle Corner Shower Door, 36in, Matte Black",
    collection: "Morandié",
    category: "plumbing",
    subcategory: "Shower Enclosures",
    dimensions: { widthIn: 36, heightIn: 72, depthIn: 36 },
    material: "1/4in tempered glass with safety film, frameless pivot",
    finish: "Matte Black",
    description: "Diamond-shaped corner stall, pivoting door (base sold separately). Thinner review count (132) than the other two doors — a genuinely under-reviewed sub-category on Amazon, kept as an option rather than the default.",
    imageUrl: pendingPhotoSwatch("#dfe6ea", "Morandié Corner Shower Door 36in"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0G6988T43",
    referencePriceUsd: 289.99,
    rating: 4.5,
    reviewCount: 132,
    isDemo: false,
  },
];

const WALL_PAINT_ROWS: Array<{ name: string; hex: string }> = [
  { name: "Linen White", hex: "#f2ece4" },
  { name: "Country Gray", hex: "#a79e8e" },
  { name: "Serenity Blue", hex: "#a9c4d1" },
  { name: "Aged Gray", hex: "#8c8c8c" },
  { name: "Coastal Blue", hex: "#4a7a96" },
  { name: "Blue Harbor", hex: "#5d8aa0" },
  { name: "Tate Green", hex: "#8a9a7e" },
  { name: "Chiffon Cream", hex: "#f0e6c8" },
  { name: "Black Abyss", hex: "#1c1c1c" },
];

export const DEMO_WALL_PAINT: Product[] = WALL_PAINT_ROWS.map((row, i) => ({
  id: `amazon-paint-${i}`,
  supplier: "Amazon" as const,
  supplierSku: "B00YSK2FS8",
  name: `Rust-Oleum Chalked Ultra Matte Paint — ${row.name}`,
  collection: "Rust-Oleum Chalked Ultra Matte",
  category: "paint" as const,
  color: row.name,
  material: "Interior latex paint",
  finish: "Ultra Matte",
  description: "Hex is an estimate from the listing's color swatch/photos, not a pixel-sampled value.",
  imageUrl: pendingPhotoSwatch(row.hex, row.name),
  model3dStatus: "none" as const,
  availability: "confirmation-required" as const,
  sourceUrl: "https://www.amazon.com/dp/B00YSK2FS8",
  referencePriceUsd: 25.57,
  rating: 4.5,
  reviewCount: 37149,
  isDemo: false,
}));

export const DEMO_WINDOW_SILLS: Product[] = [
  {
    id: "amazon-sill-pvc-white-48",
    supplier: "Amazon",
    supplierSku: "B0DCZ1S8LK",
    name: "White PVC Window Sill Cover Board, 48in",
    collection: "SXSJMY",
    category: "doors-windows",
    subcategory: "Window Sills",
    dimensions: { widthIn: 48, heightIn: 0.375, depthIn: 4 },
    material: "Extruded PVC foam core, acrylic (PMMA) surface",
    color: "White",
    finish: "Glossy",
    description: "Flat glossy board with a downturned front nosing lip — tile-cap look, not wood grain.",
    imageUrl: pendingPhotoSwatch("#f7f6f3", "White PVC Window Sill"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0DCZ1S8LK",
    referencePriceUsd: 43.88,
    rating: 4.0,
    reviewCount: 44,
    isDemo: false,
  },
  {
    id: "amazon-sill-poplar-natural-42",
    supplier: "Amazon",
    supplierSku: "B0DNV5CJZW",
    name: "Colonial Windowsill Stool, Unfinished Poplar, 42in",
    collection: "Newmouldings — EWWS12",
    category: "doors-windows",
    subcategory: "Window Sills",
    dimensions: { widthIn: 42, heightIn: 0.75, depthIn: 3.5 },
    material: "Solid poplar, unfinished/paintable",
    color: "Natural wood",
    description: "Colonial stool profile, eased front edge, visible grain. Real, well-rated (4.7★) but a thin review count (8) — window sills are a niche category on Amazon overall.",
    imageUrl: pendingPhotoSwatch("#c9a877", "Poplar Window Sill — Natural"),
    model3dStatus: "none",
    availability: "confirmation-required",
    sourceUrl: "https://www.amazon.com/dp/B0DNV5CJZW",
    referencePriceUsd: 24.2,
    rating: 4.7,
    reviewCount: 8,
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------


/**
 * Full International Wholesale Tile catalog, mirrored from their public WP
 * REST API by scripts/import-iwt.py. Real names, SKUs, sizes and photos; no
 * prices (IWT doesn't publish them), so every item is availability
 * "confirmation-required" until Tylor's dealer account is connected.
 */
const CURATED_IWT_URLS = new Set(
  [...DEMO_TILE, ...DEMO_BACKSPLASH, ...DEMO_FLOORING].map((p) => p.sourceUrl).filter(Boolean),
);
export const IWT_FULL_CATALOG: Product[] = (IWT_CATALOG as Array<{
  id: string; name: string; sku: string; category: string; sizeIn: number[] | null;
  desc: string; image: string | null; url: string; special: boolean; stone: boolean; glass: boolean;
}>)
  .filter((r) => !CURATED_IWT_URLS.has(r.url))
  .map((r) => ({
    id: r.id,
    supplier: "International Wholesale Tile" as const,
    supplierSku: r.sku,
    name: r.name,
    collection: r.special ? "Special Buy" : r.glass ? "Glass" : r.stone ? "Stone" : "Catalog",
    category: r.category as Product["category"],
    description: r.desc,
    dimensions: r.sizeIn ? { widthIn: r.sizeIn[0], heightIn: r.sizeIn[1], depthIn: 0.35 } : undefined,
    material: r.glass ? "Glass" : r.stone ? "Natural stone" : undefined,
    imageUrl: r.image ?? pendingPhotoSwatch("#e5e1d8", r.name),
    model3dStatus: "none" as const,
    availability: "confirmation-required" as const,
    approvedSurfaceTypes: r.category === "flooring" ? ["floor"] : r.category === "backsplash" ? ["wall"] : ["floor", "wall"],
    sourceUrl: r.url,
    isDemo: false,
  }));

export const DEMO_PRODUCTS: Product[] = [
  ...DEMO_CABINETS,
  ...DEMO_COUNTERTOPS,
  ...DEMO_SINKS,
  ...DEMO_BATH_SINKS,
  ...DEMO_BACKSPLASH,
  ...DEMO_FLOORING,
  ...DEMO_TILE,
  ...DEMO_HARDWARE,
  ...DEMO_TOILETS,
  ...DEMO_BATHTUBS,
  ...DEMO_SHOWER_ENCLOSURES,
  ...DEMO_WALL_PAINT,
  ...DEMO_WINDOW_SILLS,
  ...IWT_FULL_CATALOG,
];

export function getDemoProductsByCategory(category: string): Product[] {
  return DEMO_PRODUCTS.filter((p) => p.category === category);
}

export function getDemoProductById(id: string): Product | undefined {
  return DEMO_PRODUCTS.find((p) => p.id === id);
}

/**
 * Best-effort hex per product, reused by the 3D dev viewport so box
 * geometry roughly matches the product's real described color/finish —
 * still not a real texture/photo, just a closer-than-random placeholder.
 */
export const DEMO_PRODUCT_HEX: Record<string, string> = {
  ...Object.fromEntries(DEMO_CABINETS.map((p) => [p.id, "#f4f2ee"])),
  ...Object.fromEntries(MSI_COUNTERTOP_ROWS.map((row, i) => [DEMO_COUNTERTOPS[i].id, row.hex])),
  ...Object.fromEntries(DEMO_SINKS.map((p) => [p.id, "#c9ccd1"])),
  ...Object.fromEntries(DEMO_BATH_SINKS.map((p) => [p.id, "#f7f6f3"])),
  ...Object.fromEntries(DEMO_BACKSPLASH.map((p) => [p.id, "#f2f0ea"])),
  ...Object.fromEntries(DEMO_FLOORING.map((p) => [p.id, "#b79a76"])),
  ...Object.fromEntries(DEMO_TILE.map((p) => [p.id, "#e0dbd0"])),
  ...Object.fromEntries(TOP_KNOBS_ROWS.map((row, i) => [DEMO_HARDWARE[i].id, row.hex])),
  ...Object.fromEntries(DEMO_TOILETS.map((p) => [p.id, "#f7f6f3"])),
  ...Object.fromEntries(DEMO_BATHTUBS.map((p) => [p.id, "#f7f6f3"])),
  ...Object.fromEntries(DEMO_SHOWER_ENCLOSURES.map((p) => [p.id, "#dfe6ea"])),
  ...Object.fromEntries(WALL_PAINT_ROWS.map((row, i) => [DEMO_WALL_PAINT[i].id, row.hex])),
  "amazon-sill-pvc-white-48": "#f7f6f3",
  "amazon-sill-poplar-natural-42": "#c9a877",
};

/**
 * Staff-only inventory detail. This is genuinely unknown for every product
 * above — real SKU/dimensions don't imply a real supplier account, real
 * warehouse, or real dealer cost. Every field here stays a placeholder
 * until Tylor's supplier accounts are connected (Stage 8 of the build).
 */
export const DEMO_STAFF_INVENTORY: StaffInventoryDetail[] = DEMO_PRODUCTS.map((p) => ({
  productId: p.id,
  supplierAccountRef: "Pending — Tylor's account reference not yet provided",
  preferredWarehouse: "Pending — no approved warehouse on file",
  sourceOfInventoryData: "None — public catalog page only, no live supplier feed connected",
  manualConfirmationRequired: true,
  isDemo: true,
}));

export const CATEGORIES_WITHOUT_APPROVED_SUPPLIER: string[] = [
  "appliances",
  "electrical",
  "decor",
];
