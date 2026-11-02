'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/designer/types'
import { isPlaceholderImage } from '@/lib/catalog/placeholder'
import { cabinet3DSpec } from '@/lib/designer/cabinet-spec'
import CabinetViewer from './CabinetViewer'
import QuickView from './QuickView'
import { USCD_FINISHES } from '@/lib/designer/uscd-finishes'
import { getVerification, isVerified, statusLabel } from '@/lib/catalog/verification'

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
const swatchOf = (name: string) => USCD_FINISHES.find((f) => f.name.toLowerCase() === name.trim().toLowerCase())?.hex ?? SWATCH[name.trim().toLowerCase()] ?? '#E5E7EB'


export default function ProductCard({ product }: { product: Product }) {
  const variants = product.variants ?? []
  const [pickedId, setPickedId] = useState<string | null>(null)
  const [quick, setQuick] = useState(false)
  const picked = variants.find((v) => v.id === pickedId) ?? null
  // A variant's own photo when it has one, else the product's main photo.
  const imageUrl = picked?.imageUrl ?? product.imageUrl
  const showingVariantPhoto = !!picked?.imageUrl
  const roomScene = showingVariantPhoto && picked?.fit === 'cover'

  const placeholder = isPlaceholderImage(product)
  // A cabinet with a modelled layout is shown as a 3D model you can turn, until a view of the line is picked.
  const viewer3D = useMemo(
    () => (product.category === 'cabinets' && !showingVariantPhoto ? cabinet3DSpec(product.supplierSku, product.dimensions) : null),
    [product.category, product.supplierSku, product.dimensions, showingVariantPhoto],
  )
  const contain = (CONTAIN.has(product.category) || showingVariantPhoto) && !roomScene
  // A size or shape variant says its own size; a room view keeps the product's dimensions.
  const size = picked && !picked.caption && !picked.color ? picked.label : product.dimensions ? `${product.dimensions.widthIn}″ × ${product.dimensions.heightIn}″` : null
  const colors = [...new Set(variants.map((v) => v.color).filter((c): c is string => !!c))]

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_18px_40px_-18px_rgba(17,24,34,0.35)] focus-within:ring-2 focus-within:ring-[#2B7CC1]">
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${roomScene ? 'bg-[#E9ECF1]' : showingVariantPhoto ? 'bg-[#E9ECF1]' : contain ? 'bg-white' : 'bg-[#EEF0F4]'}`}>
        <span aria-hidden className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-black/[0.06]" />
        {!viewer3D && (
          <button type="button" onClick={() => setQuick(true)} aria-label={`Quick view: ${product.name}`} className="absolute inset-0 z-[2] cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2B7CC1]" />
        )}
        {viewer3D ? (
          <CabinetViewer spec={viewer3D} label={`${product.name}, ${product.supplier}`} fallbackSrc={imageUrl} color={picked?.color ? swatchOf(picked.color) : undefined} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={picked ? `${product.name}, ${picked.label}, ${product.supplier}` : `${product.name}, ${product.supplier}`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${roomScene ? 'object-cover' : showingVariantPhoto ? 'object-contain p-8' : contain ? 'object-contain p-5' : 'object-cover'}`}
          />
        )}
        <button
          type="button"
          onClick={() => setQuick(true)}
          className="absolute right-3 top-3 z-[3] rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-[#1E5C96] shadow ring-1 ring-black/10 transition hover:bg-[#EBF4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2B7CC1]"
        >
          Quick view
        </button>
        {picked?.caption ? (
          <span className="absolute bottom-3 left-3 right-3 rounded-full bg-white/90 px-3 py-1 text-center text-[11px] font-semibold tracking-wide text-[#4A5568] shadow-sm backdrop-blur">
            {picked.caption}
          </span>
        ) : (
          placeholder &&
          !viewer3D &&
          !showingVariantPhoto && (
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#4A5568] shadow-sm backdrop-blur">
              Photo coming soon
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[17px] font-bold leading-[1.3]" style={{ color: INK }}>
          <button type="button" onClick={() => setQuick(true)} className="text-left hover:underline focus-visible:underline">{product.name}</button>
        </h3>
        <p className="mt-1 text-[13px] text-[#4A5568]">{product.supplier}</p>
        <p className="mt-0.5 break-all text-[12px] text-[#6B7280]">
          SKU {product.supplierSku}
          {size ? ` · ${size}` : ''}
        </p>

        {/* Customers only ever see a status when it is a positive, confirmed one (or a discontinued warning). The
            in-between internal states ("in the supplier's catalog, Crafted availability pending") stay off the public site. */}
        {(isVerified(product) || getVerification(product).discontinued) && (
          <p
            className={`mt-1.5 text-[11px] font-semibold ${isVerified(product) ? 'text-[#1E6B3A]' : 'text-[#9A3412]'}`}
            data-verification={isVerified(product) ? 'verified' : 'discontinued'}
          >
            {statusLabel(product)}
          </p>
        )}

        {colors.length > 0 && (
          <div className="mt-3 text-[12px] text-[#4A5568]">
            <p className="mb-1.5 font-semibold text-[#6B7280]">
              {colors.length > 1 ? 'Colors' : 'Color'}
              {picked?.color ? <span className="font-bold text-[#111822]">: {picked.color}</span> : ''}
            </p>
            <ul className="flex flex-wrap items-center gap-1.5" role="group" aria-label={`Colors for ${product.name}`}>
              {colors.map((color) => {
                const v = variants.find((x) => x.color === color)
                const on = !!v && v.id === pickedId
                return (
                  <li key={color}>
                    <button
                      type="button"
                      title={color}
                      aria-label={color}
                      aria-pressed={on}
                      onClick={() => (v ? setPickedId(on ? null : v.id) : setQuick(true))}
                      className={`size-6 rounded-full border transition ${on ? 'border-[#2B7CC1] ring-2 ring-[#2B7CC1] ring-offset-1' : 'border-black/25 hover:ring-2 hover:ring-[#2B7CC1]/50'}`}
                      style={{ background: swatchOf(color) }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {variants.some((v) => !v.color) && (
          <div className="mt-3">
            <p className="mb-1.5 text-[12px] font-semibold text-[#6B7280]">{product.variantsLabel ?? 'Sizes and shapes'}</p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={`${product.variantsLabel ?? 'Sizes and shapes'} for ${product.name}`}>
              <button
                type="button"
                onClick={() => setPickedId(null)}
                aria-pressed={!picked}
                className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors ${!picked ? 'border-[#2B7CC1] bg-[#EBF4FF] text-[#1E5C96]' : 'border-black/15 bg-white text-[#4A5568] hover:border-[#2B7CC1] hover:text-[#2B7CC1]'}`}
              >
                {product.overviewLabel ?? 'Overview'}
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
          <Link href={`/catalog/${product.id}`} className="whitespace-nowrap text-[13px] font-semibold text-[#2B7CC1] underline-offset-4 hover:underline">
            {product.category === 'cabinets' ? 'All colors & details →' : 'Details & options →'}
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
      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </article>
  )
}
