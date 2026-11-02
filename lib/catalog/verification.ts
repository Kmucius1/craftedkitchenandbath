/**
 * The one place that decides what a product may be called.
 *
 * Nothing is "verified" because it was imported. A product reads as verified only when Crafted has approved
 * it AND all eight publishing checks pass. Everything else shows what is actually known, no more.
 */

import type { Product, ProductVerification } from '@/lib/designer/types'

/**
 * Check 8 is a property of the system, not of a product: quote requests must carry the exact SKU, finish and
 * size. Flip this to true only when the quote flow does it and a test proves it.
 */
export const QUOTE_PRESERVES_SKU = false

/** What can be inferred from the record alone: no Crafted confirmation of anything. */
function inferred(product: Product): ProductVerification {
  return {
    inSupplierCatalog: !product.isDemo && !!product.sourceUrl,
    craftedApproved: false,
    orderable: false,
    stockedAt: null,
  }
}

export const getVerification = (product: Product): ProductVerification => product.verification ?? inferred(product)

export interface ChecklistItem {
  id: string
  label: string
  passed: boolean
}

/** The eight publishing checks, in order. */
export function checklist(product: Product): ChecklistItem[] {
  const v = getVerification(product)
  const has3d = !!product.modelUrl || v.modelSource !== undefined
  return [
    { id: 'supplier', label: "Belongs to one of Crafted's approved supplier catalogs", passed: v.inSupplierCatalog },
    { id: 'variant', label: 'Exact manufacturer item number and variant recorded', passed: !!product.supplierSku && v.exactVariantRecorded === true },
    { id: 'dimensions', label: 'Dimensions match manufacturer documentation', passed: v.dimensionsMatchDocs === true },
    { id: 'assets', label: 'Photographs and textures are genuine and licensed', passed: v.assetLicense === 'granted' },
    // Products with no 3D have nothing to rotate; the 3D checks only bind products that show a 3D model.
    { id: 'viewer', label: '3D model rotates smoothly on desktop and mobile', passed: !has3d || v.viewerQaPassed === true },
    { id: 'model', label: '3D representation checked against the real product', passed: !has3d || (v.modelCheckedAgainstProduct === true && v.modelSource !== 'representative') },
    { id: 'status', label: 'Discontinued and unavailable items correctly labelled', passed: v.discontinued !== undefined && v.lastVerifiedAt !== undefined },
    { id: 'quote', label: 'Quote requests preserve the exact SKU, finish and size', passed: QUOTE_PRESERVES_SKU },
  ]
}

/** Fully verified: Crafted-approved, not discontinued, all eight checks pass. */
export function isVerified(product: Product): boolean {
  const v = getVerification(product)
  return v.craftedApproved && !v.discontinued && checklist(product).every((c) => c.passed)
}

/** The honest customer-facing line for a product's status. */
export function statusLabel(product: Product): string {
  const v = getVerification(product)
  if (product.isDemo) return 'Demo data'
  if (v.discontinued) return 'Discontinued by supplier'
  if (isVerified(product)) return v.stockedAt ? 'Verified · in stock' : 'Verified · Crafted-approved'
  if (v.craftedApproved) return v.orderable ? 'Crafted-approved · orderable' : 'Crafted-approved · availability to confirm'
  if (v.inSupplierCatalog) return "In supplier's catalog · Crafted availability pending"
  return 'Not yet verified'
}

/**
 * What to call a product's 3D view, or null when it has none. Inferred geometry is a "rendering", never
 * a "model": only manufacturer, measured or scanned geometry checked against the real product earns "3D model".
 */
export function threeDLabel(product: Product): '3D model' | '3D rendering' | null {
  const v = getVerification(product)
  if (!product.modelUrl && v.modelSource === undefined) return null
  const real = v.modelSource === 'manufacturer' || v.modelSource === 'measured' || v.modelSource === 'scan'
  return real && v.modelCheckedAgainstProduct === true ? '3D model' : '3D rendering'
}
