/** What the 3D cabinet viewer needs to know about a product. No three.js here, so cards can import it cheaply. */

import { CABINET_KIND_BY_SKU, type CabinetKind } from './cabinet-art'

export interface Cabinet3DSpec {
  kind: CabinetKind
  widthIn: number
  heightIn: number
  depthIn: number
}

/** The 3D layout for a product, or null when its SKU has no modelled layout. */
export function cabinet3DSpec(
  supplierSku: string,
  dimensions?: { widthIn: number; heightIn: number; depthIn: number },
): Cabinet3DSpec | null {
  const kind = CABINET_KIND_BY_SKU[supplierSku]
  if (!kind || !dimensions) return null
  return { kind, ...dimensions }
}
