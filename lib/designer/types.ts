/**
 * Crafted Kitchen & Bath — Designer domain types.
 *
 * These types intentionally separate PRODUCT data (what a supplier makes)
 * from INVENTORY/WAREHOUSE data (what's in stock where) and from PRICE data
 * (dealer cost vs. approved customer price), per the designer build rules:
 * never invent SKUs, prices, or warehouse assignments — every record below
 * that isn't real supplier data is stamped `isDemo: true` and must render
 * with a visible "DEMO DATA" badge in the UI.
 */

export const APPROVED_SUPPLIERS = [
  "US Cabinet Depot",
  "MSI Surfaces",
  "International Wholesale Tile",
  "Top Knobs",
  "Amazon",
] as const;

export type SupplierName = (typeof APPROVED_SUPPLIERS)[number];

export const DESIGNER_CATEGORIES = [
  "layout",
  "cabinets",
  "countertops",
  "backsplash",
  "tile",
  "flooring",
  "hardware",
  "sinks",
  "appliances",
  "doors-windows",
  "plumbing",
  "electrical",
  "decor",
  "paint",
] as const;

export type DesignerCategory = (typeof DESIGNER_CATEGORIES)[number];

/**
 * Public-facing availability labels only — never expose exact warehouse
 * quantity to customers. Staff-only inventory detail lives in
 * StaffInventoryDetail below.
 */
export const AVAILABILITY_STATUSES = [
  "available-through-crafted",
  "available-locally",
  "limited-availability",
  "special-order",
  "confirmation-required",
  "temporarily-unavailable",
  "discontinued",
  "similar-options-available",
] as const;

export type AvailabilityStatus = (typeof AVAILABILITY_STATUSES)[number];

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  "available-through-crafted": "Available through Crafted",
  "available-locally": "Available locally",
  "limited-availability": "Limited availability",
  "special-order": "Special order",
  "confirmation-required": "Availability confirmation required",
  "temporarily-unavailable": "Temporarily unavailable",
  discontinued: "Discontinued",
  "similar-options-available": "Similar options available",
};

export type WarningSeverity =
  | "information"
  | "review-suggested"
  | "blocking-issue"
  | "staff-confirmation-required";

export interface CompatibilityWarning {
  id: string;
  severity: WarningSeverity;
  message: string;
  relatedItemIds?: string[];
}

/** Real-world dimensions in inches. */
export interface ProductDimensions {
  widthIn: number;
  heightIn: number;
  depthIn: number;
}

export interface ProductVariant {
  id: string;
  /** Human label for this variant, e.g. finish or size name. */
  label: string;
  finish?: string;
  color?: string;
  sku: string;
}

/**
 * A product as sold by an approved supplier. Never contains dealer cost or
 * warehouse quantity — see StaffInventoryDetail for that private data.
 */
export interface Product {
  id: string;
  supplier: SupplierName;
  supplierSku: string;
  name: string;
  collection: string;
  category: DesignerCategory;
  subcategory?: string;
  description?: string;
  dimensions?: ProductDimensions;
  material?: string;
  color?: string;
  finish?: string;
  /** Pieces per box / sq ft per box — required for tile & flooring box math. */
  piecesPerBox?: number;
  sqftPerBox?: number;
  variants?: ProductVariant[];
  imageUrl: string;
  specSheetUrl?: string;
  /**
   * The exact page this product's name/SKU/dimensions were pulled from, when
   * they came from a supplier's public catalog rather than a dealer import.
   * Present alongside `isDemo: false` for real-but-unpriced products — see
   * DemoBadge.tsx, which reads this to render "public catalog, price
   * unconfirmed" instead of "demo data".
   */
  sourceUrl?: string;
  /** GLB model URL for the 3D viewport. Absent until a real asset is approved. */
  modelUrl?: string;
  /** Staff-only: whether a reviewed/approved 3D asset exists. */
  model3dStatus: "none" | "draft" | "review" | "approved" | "rejected" | "retired";
  availability: AvailabilityStatus;
  /** Customer-facing price. Only ever populated once Tylor approves customer pricing. */
  approvedCustomerPrice?: number;
  requiredCompanionSkus?: string[];
  approvedSurfaceTypes?: string[];
  /**
   * True for every record in demo-data.ts. Must always render a DEMO DATA
   * badge and must never be written into a real order or CRM record.
   */
  isDemo: boolean;
  /**
   * Real Amazon listing price at the time it was sourced — a reference price
   * only, never Crafted's approved customer price (see approvedCustomerPrice
   * above, which stays gated on Tylor's approval). Populated only for
   * supplier: "Amazon" records.
   */
  referencePriceUsd?: number;
  /** Amazon star rating (0-5) and rating count, at time of sourcing. */
  rating?: number;
  reviewCount?: number;
}

/** Staff-only inventory/warehouse detail — never sent to public API responses. */
export interface StaffInventoryDetail {
  productId: string;
  dealerCost?: number;
  supplierAccountRef?: string;
  preferredWarehouse?: string;
  backupWarehouse?: string;
  lastInventoryCheck?: string;
  leadTimeDays?: number;
  freightNotes?: string;
  accountRepresentative?: string;
  sourceOfInventoryData: string;
  manualConfirmationRequired: boolean;
  isDemo: boolean;
}

// ---------------------------------------------------------------------------
// Room geometry
// ---------------------------------------------------------------------------

export interface Point2D {
  x: number;
  y: number;
}

export interface Wall {
  id: string;
  start: Point2D;
  end: Point2D;
  /** Inches. */
  heightIn: number;
  thicknessIn: number;
}

export type OpeningType = "door" | "window" | "opening";

export interface Opening {
  id: string;
  wallId: string;
  type: OpeningType;
  /** Distance in inches from the wall's start point. */
  offsetIn: number;
  widthIn: number;
  heightIn: number;
  /** Windows only: height in inches from the floor to the bottom of the opening. */
  sillHeightIn?: number;
}

export type UtilityPointType = "plumbing" | "electrical";

export interface UtilityPoint {
  id: string;
  type: UtilityPointType;
  position: Point2D;
  label?: string;
}

export interface PlacedItem {
  id: string;
  productId: string;
  variantId?: string;
  category: DesignerCategory;
  position: Point2D;
  rotationDeg: number;
  quantity: number;
  /** Snapshot of dimensions at time of placement, in case the catalog changes later. */
  dimensions: ProductDimensions;
  surfaceAssignment?: "wall" | "floor" | "countertop" | "backsplash";
}

/** A flat-surface material assignment (e.g. flooring or backsplash tile applied to a run). */
export interface SurfaceAssignment {
  id: string;
  surface: "floor" | "backsplash" | "countertop" | "wall";
  productId: string;
  variantId?: string;
  areaSqft?: number;
}

export type RoomType = "kitchen" | "bathroom";

export type RoomSize = "small" | "medium" | "large";

export interface Room {
  id: string;
  type: RoomType;
  ceilingHeightIn: number;
  walls: Wall[];
  openings: Opening[];
  utilityPoints: UtilityPoint[];
}

export type ProjectStatus =
  | "draft"
  | "in-progress"
  | "saved"
  | "quote-requested";

export interface DesignerProject {
  id: string;
  name: string;
  startMethod: "designed-room" | "exact-room" | "uploaded-photos" | "continued";
  room: Room;
  placedItems: PlacedItem[];
  surfaceAssignments: SurfaceAssignment[];
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Bill of materials / review
// ---------------------------------------------------------------------------

export interface BomLineItem {
  product: Product;
  variantId?: string;
  quantity: number;
  areaSqft?: number;
  boxesRequired?: number;
  warnings: CompatibilityWarning[];
}

export interface BillOfMaterials {
  bySupplier: Record<SupplierName, BomLineItem[]>;
  warnings: CompatibilityWarning[];
}

// ---------------------------------------------------------------------------
// Quote request
// ---------------------------------------------------------------------------

export interface DesignerQuoteRequest {
  projectId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectAddress?: string;
  projectType: string;
  budgetRange?: string;
  desiredStartDate?: string;
  desiredCompletionDate?: string;
  notes?: string;
  preferredConsultationType?: "phone" | "video" | "showroom" | "in-home";
  showroomAppointmentRequest?: boolean;
  consent: boolean;
}
