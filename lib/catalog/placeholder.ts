import type { Product } from '@/lib/designer/types'

/** A stand-in drawing rather than a photograph of the product. */
export const isPlaceholderImage = (product: Pick<Product, 'imageUrl'>) => product.imageUrl.startsWith('data:')
