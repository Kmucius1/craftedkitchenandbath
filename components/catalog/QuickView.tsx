'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/designer/types'
import { isPlaceholderImage } from '@/lib/catalog/placeholder'
import { cabinet3DSpec } from '@/lib/designer/cabinet-spec'
import { USCD_FINISHES } from '@/lib/designer/uscd-finishes'
import { getVerification, isVerified, statusLabel } from '@/lib/catalog/verification'
import CabinetViewer from './CabinetViewer'

const BLUE = '#2B7CC1'
const INK = '#111822'

const swatchOf = (name: string) => USCD_FINISHES.find((f) => f.name.toLowerCase() === name.trim().toLowerCase())?.hex ?? '#E5E7EB'

type Media =
  | { id: string; kind: 'model'; label: string }
  | { id: string; kind: 'image'; label: string; url: string; fit: 'cover' | 'contain'; caption: string }

/**
 * A quick look at one product without leaving the catalog: photos or the 3D model, size, colors,
 * and the two things a customer does next (request pricing, open the full page).
 * Mounted only while open, so a cabinet's WebGL scene exists only while someone is looking at it.
 */
export default function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      if (dialog.open) dialog.close()
    }
  }, [])

  const spec = useMemo(() => (product.category === 'cabinets' ? cabinet3DSpec(product.supplierSku, product.dimensions) : null), [product])
  const media = useMemo<Media[]>(() => {
    const list: Media[] = []
    if (spec) list.push({ id: 'model', kind: 'model', label: '3D rendering' })
    else if (!isPlaceholderImage(product)) list.push({ id: 'main', kind: 'image', label: product.overviewLabel ?? 'Overview', url: product.imageUrl, fit: 'contain', caption: `${product.name}, ${product.supplier}` })
    for (const v of product.variants ?? []) {
      if (v.imageUrl) list.push({ id: v.id, kind: 'image', label: v.label, url: v.imageUrl, fit: v.fit ?? 'contain', caption: v.caption ?? `${product.name}, ${v.label}` })
    }
    return list
  }, [product, spec])

  const [mediaId, setMediaId] = useState(media[0]?.id ?? '')
  const [color, setColor] = useState<string | null>(null)
  const active = media.find((m) => m.id === mediaId) ?? media[0] ?? null
  const variants = product.variants ?? []
  const colors = [...new Set(variants.map((v) => v.color).filter((c): c is string => !!c))]
  const sizes = variants.filter((v) => !v.imageUrl && !v.color)
  const dims = product.dimensions ? `${product.dimensions.widthIn}″ W × ${product.dimensions.heightIn}″ H × ${product.dimensions.depthIn}″ D` : null
  const colorVariant = color ? variants.find((v) => v.color === color) ?? null : null
  const pickColor = (c: string) => {
    const next = color === c ? null : c
    setColor(next)
    const v = next ? variants.find((x) => x.color === next && x.imageUrl) : null
    if (v) setMediaId(v.id)
    else if (!next) setMediaId(media[0]?.id ?? '')
  }
  const quote = `/quote?item=${encodeURIComponent(`${product.name} (${product.supplier} ${product.supplierSku})${color ? ` in ${color}` : ''}`)}`

  const facts: [string, string | null | undefined][] = [
    ['Supplier', product.supplier], ['Item number', product.supplierSku], ['Size', dims],
    ['Material', product.material], ['Finish', product.finish], ['Color', product.color],
  ]

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Quick view: ${product.name}`}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
      className="m-auto w-[min(96vw,980px)] max-h-[92vh] overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/55"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close quick view"
        className="sticky top-3 z-10 float-right mr-3 mt-3 grid size-9 place-items-center rounded-full bg-white/95 text-xl leading-none text-[#111822] shadow ring-1 ring-black/10 hover:bg-[#EBF4FF]"
      >
        ×
      </button>
      <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-black/[0.08] bg-[#EEF0F4]">
            {active?.kind === 'model' && spec ? (
              <CabinetViewer spec={spec} label={`${product.name}, ${product.supplier}`} fallbackSrc={product.imageUrl} />
            ) : active?.kind === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={active.url} alt={active.caption} className={`absolute inset-0 h-full w-full ${active.fit === 'cover' ? 'object-cover' : 'object-contain p-5'}`} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-contain p-5" />
            )}
          </div>
          {active && (
            <p className="mt-2 text-[12px] text-[#4A5568]">
              {active.kind === 'model' ? 'A 3D rendering built from the published size. Drag to turn it. Not a photograph.' : active.caption}
            </p>
          )}
          {media.length > 1 && (
            <div role="group" aria-label="Views" className="mt-3 flex flex-wrap gap-2">
              {media.map((m) => {
                const on = active?.id === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMediaId(m.id)}
                    className={`rounded-full border px-3 py-1 text-[12px] font-semibold ${on ? 'border-[#2B7CC1] bg-[#EBF4FF] text-[#1E5C96]' : 'border-black/15 bg-white text-[#4A5568] hover:border-[#2B7CC1]'}`}
                  >
                    {m.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>{product.category}</p>
          <h2 className="mt-1 text-2xl font-bold leading-tight" style={{ color: INK }}>{product.name}</h2>
          {(isVerified(product) || getVerification(product).discontinued) && (
            <p className={`mt-1.5 text-[12px] font-semibold ${isVerified(product) ? 'text-[#1E6B3A]' : 'text-[#9A3412]'}`}>{statusLabel(product)}</p>
          )}
          {product.description && <p className="mt-3 text-[14px] leading-relaxed text-[#4A5568]">{product.description}</p>}

          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[14px]">
            {facts.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[#6B7280]">{k}</dt>
                <dd className="m-0 break-words font-semibold" style={{ color: INK }}>{v}</dd>
              </div>
            ))}
          </dl>

          {colors.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[13px] font-semibold text-[#6B7280]">
                {colors.length > 1 ? 'Colors' : 'Color'}{color ? <span className="font-bold" style={{ color: INK }}>: {color}</span> : ''}
              </p>
              <div role="group" aria-label="Colors" className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const on = color === c
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickColor(c)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold ${on ? 'border-[#2B7CC1] bg-[#EBF4FF] text-[#1E5C96]' : 'border-black/15 bg-white text-[#4A5568] hover:border-[#2B7CC1]'}`}
                    >
                      <span aria-hidden className="size-4 rounded-full border border-black/25" style={{ background: swatchOf(c) }} />
                      {c}
                    </button>
                  )
                })}
              </div>
              {color && colorVariant && !colorVariant.imageUrl && <p className="mt-2 text-[12px] text-[#6B7280]">No room photo for this color yet. Swatch is close, not exact; we confirm the finish in person.</p>}
            </div>
          )}
          {sizes.length > 0 && <p className="mt-1.5 text-[13px] text-[#4A5568]"><span className="font-semibold text-[#6B7280]">{product.variantsLabel ?? 'Sizes and shapes'}:</span> {sizes.map((s) => s.label).join(', ')}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href={quote} className="inline-flex rounded-lg px-5 py-3 text-[14px] font-bold text-white hover:brightness-110" style={{ background: BLUE }}>
              Request pricing
            </Link>
            <Link href={`/catalog/${product.id}`} className="text-[14px] font-semibold text-[#2B7CC1] underline-offset-4 hover:underline">
              {product.category === 'cabinets' ? 'All colors & details →' : 'Full details →'}
            </Link>
          </div>
          <p className="mt-3 text-[12px] text-[#6B7280]">Pricing and availability are confirmed in your free in-home quote.</p>
        </div>
      </div>
    </dialog>
  )
}
