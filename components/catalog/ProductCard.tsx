import Link from 'next/link'
import type { Product } from '@/lib/designer/types'

const BLUE = '#2B7CC1'
const INK = '#111822'

/** Categories whose photos are cut-outs on white (fixtures) rather than full-bleed material shots. */
const CONTAIN = new Set(['sinks', 'hardware', 'cabinets', 'plumbing'])

const CATEGORY_LABELS: Record<string, string> = {
  cabinets: 'Cabinets',
  countertops: 'Countertops',
  backsplash: 'Backsplash',
  tile: 'Tile',
  flooring: 'Flooring',
  hardware: 'Hardware',
  sinks: 'Sinks',
  plumbing: 'Plumbing',
}

/** A stand-in drawing rather than a photograph of the product. */
export const isPlaceholderImage = (product: Pick<Product, 'imageUrl'>) => product.imageUrl.startsWith('data:')

export default function ProductCard({ product }: { product: Product }) {
  const placeholder = isPlaceholderImage(product)
  const contain = CONTAIN.has(product.category)
  const size = product.dimensions ? `${product.dimensions.widthIn}″ × ${product.dimensions.heightIn}″` : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_18px_40px_-18px_rgba(17,24,34,0.35)] focus-within:ring-2 focus-within:ring-[#2B7CC1]">
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${contain ? 'bg-white' : 'bg-[#EEF0F4]'}`}>
        <span aria-hidden className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-black/[0.06]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={`${product.name}, ${product.supplier}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${contain ? 'object-contain p-5' : 'object-cover'}`}
        />
        {placeholder && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#4A5568] shadow-sm backdrop-blur">
            Photo coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[17px] font-bold leading-[1.3]" style={{ color: INK }}>
          {product.name}
        </h3>
        <p className="mt-1 text-[13px] text-[#4A5568]">{product.supplier}</p>
        <p className="mt-0.5 break-all text-[12px] text-[#6B7280]">
          SKU {product.supplierSku}
          {size ? ` · ${size}` : ''}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href="/quote"
            className="inline-flex items-center whitespace-nowrap rounded-md px-4 py-2 text-[13px] font-bold text-white transition-colors hover:brightness-110"
            style={{ background: BLUE }}
          >
            Request pricing
          </Link>
          {product.sourceUrl && (
            <a
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${product.name} on the ${product.supplier} website`}
              className="whitespace-nowrap text-[13px] font-semibold text-[#4A5568] underline-offset-4 transition-colors hover:text-[#2B7CC1] hover:underline"
            >
              Supplier ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
