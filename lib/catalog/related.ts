import type { Product } from '@/lib/designer/types'
import { isPlaceholderImage } from './placeholder'
import { byLead } from './featured'

/**
 * Which other products to show under a product.
 *
 * "More like this" is the same kind of product (same category, same type first).
 * "Pairs with" is the other things the same remodel needs: cabinets go with a countertop, sink and hardware, and so on.
 * Both come from the catalog's own categories, so it is a starting point for a project, not a statement that two
 * specific products have been checked against each other. Fit and finish are confirmed in the quote.
 */

const PAIRS: Record<string, string[]> = {
  cabinets: ['countertops', 'hardware', 'sinks', 'backsplash', 'tile'],
  countertops: ['cabinets', 'sinks', 'backsplash', 'hardware'],
  backsplash: ['countertops', 'cabinets', 'hardware'],
  tile: ['cabinets', 'countertops', 'hardware'],
  flooring: ['cabinets', 'hardware'],
  hardware: ['cabinets', 'sinks', 'countertops'],
  sinks: ['countertops', 'cabinets', 'hardware', 'plumbing'],
  plumbing: ['sinks', 'hardware', 'countertops'],
}

const text = (p: Product) => `${p.subcategory ?? ''} ${p.name} ${p.collection ?? ''}`
const isBath = (p: Product) => /vanit|bath|shower/i.test(text(p))
const isKitchen = (p: Product) => /kitchen|farm|apron|workstation|prep|\bbar\b/i.test(text(p)) || (p.category === 'cabinets' && !isBath(p))

/** A bath product pairs with bath-friendly products and a kitchen one with kitchen-friendly ones. */
function sameRoom(base: Product, candidate: Product): boolean {
  if (isBath(base)) return !isKitchen(candidate) || isBath(candidate)
  return !isBath(candidate)
}

const ranked = (list: Product[]) => [...byLead(list.filter((p) => !isPlaceholderImage(p))), ...list.filter(isPlaceholderImage)]

export function relatedProducts(product: Product, all: Product[], limit = 4): Product[] {
  const others = all.filter((p) => p.id !== product.id && p.category === product.category)
  const sameType = others.filter((p) => p.subcategory && p.subcategory === product.subcategory)
  const rest = others.filter((p) => !sameType.includes(p))
  const out: Product[] = []
  for (const pool of [sameType, rest]) {
    for (const p of ranked(pool)) {
      if (out.length < limit) out.push(p)
    }
  }
  return out
}

export function pairedProducts(product: Product, all: Product[], limit = 4): Product[] {
  const lanes = (PAIRS[product.category] ?? []).map((cat) => ranked(all.filter((p) => p.id !== product.id && p.category === cat && sameRoom(product, p))))
  const out: Product[] = []
  for (let i = 0; out.length < limit && i < 3; i++) {
    for (const lane of lanes) {
      if (lane[i] && out.length < limit) out.push(lane[i])
    }
  }
  return out
}
