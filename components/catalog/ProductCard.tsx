'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/designer/types'
import { isPlaceholderImage } from '@/lib/catalog/placeholder'

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

/** Common finish names to a swatch color. Unknown names get a neutral dot, never a guess. */
const SWATCH: Record<string, string> = {
  white: '#FFFFFF', 'arctic white': '#FAFAFA', ivory: '#F3EBD8', cream: '#F1E9D6', bone: '#E8E0CF', beige: '#D9CBB0',
  gray: '#9CA3AF', grey: '#9CA3AF', 'light gray': '#D1D5DB', 'light grey': '#D1D5DB', charcoal: '#4B5563',
  black: '#16191F', brown: '#7B5B3E', tan: '#C9AE87', blue: '#4A7FB5', green: '#6B8F71', red: '#B2453C',
}
const swatchOf = (name: string) => SWATCH[name.trim().toLowerCase()] ?? '#E5E7EB'


export default function ProductCard({ product }: { product: Product }) {
  const variants = product.variants ?? []
  const [pickedId, setPickedId] = useState<string | null>(null)
  const picked = variants.find((v) => v.id === pickedId) ?? null
  // A variant's own photo when it has one, else the product's main photo.
  const imageUrl = picked?.imageUrl ?? product.imageUrl
  const showingVariantPhoto = !!picked?.imageUrl

  const placeholder = isPlaceholderImage(product)
  const contain = CONTAIN.has(product.category) || showingVariantPhoto
  const size = picked ? picked.label : product.dimensions ? `${product.dimensions.widthIn}″ × ${product.dimensions.heightIn}″` : null
  const colors = [...new Set(variants.map((v) => v.color).filter((c): c is string => !!c))]

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_18px_40px_-18px_rgba(17,24,34,0.35)] focus-within:ring-2 focus-within:ring-[#2B7CC1]">
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${showingVariantPhoto ? 'bg-[#E9ECF1]' : contain ? 'bg-white' : 'bg-[#EEF0F4]'}`}>
        <span aria-hidden className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-black/[0.06]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={picked ? `${product.name}, ${picked.label}, ${product.supplier}` : `${product.name}, ${product.supplier}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${showingVariantPhoto ? 'object-contain p-8' : contain ? 'object-contain p-5' : 'object-cover'}`}
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

        {colors.length > 0 && (
          <div className="mt-3 flex items-center gap-2 text-[12px] text-[#4A5568]">
            <span className="font-semibold text-[#6B7280]">{colors.length > 1 ? 'Colors' : 'Color'}</span>
            <ul className="flex flex-wrap items-center gap-2">
              {colors.map((color) => (
                <li key={color} className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-4 rounded-full border border-black/20" style={{ background: swatchOf(color) }} />
                  {color}
                </li>
              ))}
            </ul>
          </div>
        )}

        {variants.length > 0 && (
          <div className="mt-3">
            <p className="mb-1.5 text-[12px] font-semibold text-[#6B7280]">Sizes and shapes</p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Sizes and shapes for ${product.name}`}>
              <button
                type="button"
                onClick={() => setPickedId(null)}
                aria-pressed={!picked}
                className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors ${!picked ? 'border-[#2B7CC1] bg-[#EBF4FF] text-[#1E5C96]' : 'border-black/15 bg-white text-[#4A5568] hover:border-[#2B7CC1] hover:text-[#2B7CC1]'}`}
              >
                Overview
              </button>
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setPickedId(variant.id === pickedId ? null : variant.id)}
                  aria-pressed={variant.id === pickedId}
                  className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors ${variant.id === pickedId ? 'border-[#2B7CC1] bg-[#EBF4FF] text-[#1E5C96]' : 'border-black/15 bg-white text-[#4A5568] hover:border-[#2B7CC1] hover:text-[#2B7CC1]'}`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        )}

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
