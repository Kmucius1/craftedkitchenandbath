import type { Product } from '@/lib/designer/types'
import ProductCard from './ProductCard'

/** A titled row of product cards under a product page. Each card opens a quick view or its own page. */
export default function RelatedProducts({ id, title, note, products }: { id: string; title: string; note: string; products: Product[] }) {
  if (products.length === 0) return null
  return (
    <section aria-labelledby={id} className="mt-14 border-t border-black/10 pt-10">
      <h2 id={id} className="text-2xl font-bold text-[#111822]">{title}</h2>
      <p className="mb-6 mt-1 max-w-2xl text-[14px] text-[#4A5568]">{note}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
