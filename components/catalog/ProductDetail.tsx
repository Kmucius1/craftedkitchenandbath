'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/designer/types'
import { isPlaceholderImage } from '@/lib/catalog/placeholder'
import { cabinet3DSpec } from '@/lib/designer/cabinet-spec'
import { FAMILY_BLURB, USCD_FINISHES, type FinishFamily } from '@/lib/designer/uscd-finishes'
import { getVerification, isVerified, statusLabel } from '@/lib/catalog/verification'
import CabinetViewer from './CabinetViewer'

const BLUE = '#2B7CC1'
const INK = '#111822'

type Media =
  | { id: string; kind: 'model'; label: string }
  | { id: string; kind: 'image'; label: string; url: string; fit: 'cover' | 'contain'; caption: string }

/** A full page for one product: every photo, 3D view, size, color and finish, each one selectable. */
export default function ProductDetail({ product }: { product: Product }) {
  const spec = useMemo(() => (product.category === 'cabinets' ? cabinet3DSpec(product.supplierSku, product.dimensions) : null), [product])
  const isCabinet = product.supplier === 'US Cabinet Depot' && product.category === 'cabinets'

  const media = useMemo<Media[]>(() => {
    const list: Media[] = []
    if (spec) list.push({ id: 'model', kind: 'model', label: '3D rendering' })
    else if (!isPlaceholderImage(product)) list.push({ id: 'main', kind: 'image', label: product.overviewLabel ?? 'Overview', url: product.imageUrl, fit: 'contain', caption: `${product.name}, ${product.supplier}` })
    for (const v of product.variants ?? []) {
      if (v.imageUrl) list.push({ id: v.id, kind: 'image', label: v.label, url: v.imageUrl, fit: v.fit ?? 'contain', caption: v.caption ?? `${product.name}, ${v.label}` })
    }
    return list
  }, [product, spec])

  const [mediaId, setMediaId] = useState<string>(media[0]?.id ?? '')
  const [finishCode, setFinishCode] = useState<string | null>(null)
  const [variantId, setVariantId] = useState<string | null>(null)

  const finish = USCD_FINISHES.find((f) => f.code === finishCode) ?? null
  const active: Media | null = finish?.room
    ? { id: `finish-${finish.code}`, kind: 'image', label: finish.name, url: finish.room, fit: 'cover', caption: `${finish.name} · ${finish.roomKind === 'bathroom' ? 'in a bathroom' : 'in a kitchen'} · photo from US Cabinet Depot` }
    : finish && spec ? media.find((m) => m.kind === 'model') ?? null : media.find((m) => m.id === mediaId) ?? media[0] ?? null

  const variants = product.variants ?? []
  const colors = [...new Set(variants.map((v) => v.color).filter((c): c is string => !!c))]
  const dims = product.dimensions ? `${product.dimensions.widthIn}″ W × ${product.dimensions.heightIn}″ H × ${product.dimensions.depthIn}″ D` : null
  const picked = variants.find((v) => v.id === variantId) ?? null

  const ask = `${product.name} (${product.supplier} ${product.supplierSku})${finish ? ` in ${finish.name}` : ''}${picked ? `, ${picked.label}` : ''}`
  const quote = `/quote?item=${encodeURIComponent(ask)}`
  const families = (['Shaker', 'Oxford', 'Haven', 'Edgeline', 'Casselberry'] as FinishFamily[]).map((family) => ({ family, items: USCD_FINISHES.filter((f) => f.family === family) }))

  const facts: [string, string | null | undefined][] = [
    ['Supplier', product.supplier], ['Collection', product.collection], ['Item number', product.supplierSku], ['Size', dims],
    ['Material', product.material], ['Finish', finish ? finish.name : product.finish], ['Color', finish ? null : product.color],
  ]

  return (
    <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', alignItems: 'start' }}>
      {/* Photos and 3D */}
      <div>
        <div style={{ position: 'relative', aspectRatio: '4 / 3', background: '#EEF0F4', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
          {active?.kind === 'model' && spec ? (
            <CabinetViewer spec={spec} label={`${product.name}, ${product.supplier}`} fallbackSrc={product.imageUrl} />
          ) : active?.kind === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.url} alt={active.caption} className="absolute inset-0 h-full w-full" style={{ objectFit: active.fit, padding: active.fit === 'contain' ? '24px' : 0 }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-contain p-6" />
          )}
        </div>
        <p style={{ margin: '10px 2px 0', fontSize: '12px', color: '#4A5568' }}>
          {active?.kind === 'model' ? 'A 3D rendering built from the published size. Drag to turn it. This is not a photograph.' : active?.kind === 'image' ? active.caption : ''}
        </p>
        {media.length > 1 && (
          <div role="group" aria-label="Photos" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {media.map((m) => {
              const on = !finish && active?.id === m.id
              return (
                <button key={m.id} type="button" aria-pressed={on} onClick={() => { setFinishCode(null); setMediaId(m.id) }}
                  style={{ border: `1px solid ${on ? BLUE : 'rgba(0,0,0,0.15)'}`, background: on ? '#EBF4FF' : '#fff', color: on ? '#1E5C96' : '#4A5568', borderRadius: '999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {m.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE }}>{product.category}</p>
        <h1 style={{ margin: '6px 0 4px', fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.15, color: INK }}>{product.name}</h1>
        {(isVerified(product) || getVerification(product).discontinued) && <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: isVerified(product) ? '#1E6B3A' : '#9A3412' }}>{statusLabel(product)}</p>}
        {product.description && <p style={{ margin: '0 0 16px', color: '#4A5568', lineHeight: 1.6 }}>{product.description}</p>}

        <dl style={{ margin: '0 0 20px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', fontSize: '14px' }}>
          {facts.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} style={{ display: 'contents' }}><dt style={{ color: '#6B7280' }}>{k}</dt><dd style={{ margin: 0, color: INK, fontWeight: 600 }}>{v}</dd></div>
          ))}
        </dl>

        {variants.length > 0 && !isCabinet && (
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '14px', color: INK }}>{product.variantsLabel ?? 'Sizes and shapes'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {variants.map((v) => (
                <button key={v.id} type="button" aria-pressed={variantId === v.id}
                  onClick={() => { setVariantId(variantId === v.id ? null : v.id); if (v.imageUrl && variantId !== v.id) { setFinishCode(null); setMediaId(v.id) } }}
                  style={{ border: `1px solid ${variantId === v.id ? BLUE : 'rgba(0,0,0,0.15)'}`, background: variantId === v.id ? '#EBF4FF' : '#fff', color: variantId === v.id ? '#1E5C96' : '#4A5568', borderRadius: '999px', padding: '6px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  {v.label}
                </button>
              ))}
            </div>
            {colors.length > 0 && <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#4A5568' }}>Colors: {colors.join(', ')}</p>}
          </section>
        )}

        <Link href={quote} style={{ display: 'inline-block', background: BLUE, color: '#fff', fontWeight: 700, padding: '12px 22px', borderRadius: '8px', textDecoration: 'none' }}>
          Request pricing{finish ? ` in ${finish.name}` : ''}
        </Link>
        <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#6B7280' }}>Pricing and availability are confirmed in your free in-home quote.</p>
      </div>

      {/* Every finish */}
      {isCabinet && (
        <section style={{ gridColumn: '1 / -1' }} aria-labelledby="finishes-h">
          <h2 id="finishes-h" style={{ margin: '8px 0 4px', fontSize: '22px', color: INK }}>All colors and finishes</h2>
          <p style={{ margin: '0 0 16px', color: '#4A5568', fontSize: '14px' }}>
            Every door style and finish US Cabinet Depot lists in this collection. Tap one to see it in a real room. Swatch colors are close but not exact; we confirm the finish with you in person.
          </p>
          {families.map(({ family, items }) => (
            <div key={family} style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 2px', fontSize: '15px', color: INK }}>{family}</h3>
              <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#6B7280' }}>{FAMILY_BLURB[family]}{family !== 'Shaker' ? ' Shown for comparison; this product is a Shaker cabinet.' : ''}</p>
              <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
                {items.map((f) => {
                  const on = finishCode === f.code
                  return (
                    <button key={f.code} type="button" aria-pressed={on}
                      onClick={() => { setFinishCode(on ? null : f.code); if (!on) window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${on ? BLUE : 'rgba(0,0,0,0.12)'}`, background: on ? '#EBF4FF' : '#fff', cursor: 'pointer' }}>
                      <span aria-hidden style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: f.hex, border: '1px solid rgba(0,0,0,0.25)' }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: INK, lineHeight: 1.25 }}>
                        {f.name}
                        {f.code === 'SW' && <span style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#6B7280' }}>This product, shown in 3D</span>}
                        {!f.room && f.code !== 'SW' && <span style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#6B7280' }}>No room photo</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
