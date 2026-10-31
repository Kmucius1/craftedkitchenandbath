import type { Product } from '@/lib/designer/types'

/**
 * The order the catalog opens in ("Featured"): the classic, widely chosen
 * styles first, in each category, so a homeowner lands on what most people end
 * up picking rather than on whatever the supplier listed first.
 *
 * This is an editorial choice, not sales data: Crafted has no per-product
 * order history in the catalog, so nothing here says or implies "best seller".
 * It is deliberately a short list in one place. To change what leads, edit the
 * lists below (or send them to whoever maintains this file); no other code
 * needs to change.
 */

/** Exact product names, most prominent first. */
const COUNTERTOPS = ['Arctic White', 'Calacatta Laza', 'Calacatta Elysio', 'Montclair White', 'Aruca White', 'Fossil Gray']
const SINKS = ['Handcrafted Workstation 3319', 'Fireclay Farmhouse White Single Bowl', 'Quartz Composite 50/50 Double Bowl']

/** Brushed nickel and matte black are the finishes most kitchens are drawn in. */
const HARDWARE_FINISH_RANK: [RegExp, number][] = [
  [/-BSN$/, 30],
  [/-BLK$/, 20],
]

/** Tile and backsplash lean on the look: subway and white or marble first, then patterns. */
const LOOKS: [RegExp, number][] = [
  [/subway/i, 40],
  [/\b(white|carrara|thassos|calacatta|statuario|marble|ivory|canvas)\b/i, 25],
  [/herringbone|\bhex\b/i, 15],
  [/classic/i, 10],
]

const rankIn = (list: string[], name: string) => {
  const at = list.indexOf(name)
  return at < 0 ? 0 : 100 - at
}

/** Higher leads. Ties keep the catalog's own order. */
export function leadScore(product: Pick<Product, 'category' | 'name' | 'supplierSku'>): number {
  switch (product.category) {
    case 'countertops':
      return rankIn(COUNTERTOPS, product.name)
    case 'sinks':
      return rankIn(SINKS, product.name)
    case 'hardware':
      return HARDWARE_FINISH_RANK.find(([re]) => re.test(product.supplierSku))?.[1] ?? 0
    case 'flooring':
      return /vinyl|wood-look/i.test(product.name) ? 10 : 0
    case 'tile':
    case 'backsplash':
      return LOOKS.reduce((sum, [re, points]) => (re.test(product.name) ? sum + points : sum), 0)
    default:
      return 0
  }
}

/** Stable sort by lead score, highest first, ties in their original order. */
export function byLead<T extends Pick<Product, 'category' | 'name' | 'supplierSku'>>(products: T[]): T[] {
  return products
    .map((product, index) => ({ product, index, score: leadScore(product) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.product)
}
