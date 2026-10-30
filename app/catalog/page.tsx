import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import DemoBadge from '@/components/designer/DemoBadge'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'

export const metadata: Metadata = {
  title: 'Product Catalog — Cabinets, Tile, Countertops & More | Crafted Kitchen & Bath',
  description:
    'Browse the cabinets, countertops, tile, flooring, hardware, sinks and fixtures Crafted Kitchen & Bath sources for Tampa Bay remodels.',
}

const INK = '#111822'
const BLUE = '#2B7CC1'
const PER_PAGE = 24

const CATEGORY_LABELS: Record<string, string> = {
  cabinets: 'Cabinets',
  countertops: 'Countertops',
  backsplash: 'Backsplash',
  tile: 'Tile',
  flooring: 'Flooring',
  hardware: 'Hardware',
  sinks: 'Sinks',
  plumbing: 'Plumbing',
  paint: 'Paint',
  'doors-windows': 'Doors & Windows',
}

function ProductLink({ product, children }: { product: { sourceUrl?: string; name: string; supplier: string }; children: React.ReactNode }) {
  if (!product.sourceUrl) return <>{children}</>
  return (
    <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${product.name} at ${product.supplier}`} style={{ display: 'block' }}>
      {children}
    </a>
  )
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string; page?: string }>
}) {
  const { cat, q, page } = await searchParams
  const query = (q ?? '').trim().toLowerCase()

  const counts = new Map<string, number>()
  for (const p of DEMO_PRODUCTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  const categories = [...counts.keys()].sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b))

  const filtered = DEMO_PRODUCTS.filter(
    (p) =>
      (!cat || p.category === cat) &&
      (!query || `${p.name} ${p.supplierSku} ${p.collection} ${p.supplier}`.toLowerCase().includes(query)),
  )
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(Math.max(1, Number(page) || 1), pages)
  const items = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const href = (over: { cat?: string | null; page?: number }) => {
    const sp = new URLSearchParams()
    const c = over.cat === undefined ? cat : over.cat
    if (c) sp.set('cat', c)
    if (query) sp.set('q', q!.trim())
    if (over.page && over.page > 1) sp.set('page', String(over.page))
    const s = sp.toString()
    return `/catalog${s ? `?${s}` : ''}`
  }

  const heading = cat ? CATEGORY_LABELS[cat] ?? cat : 'All Materials'

  return (
    <main style={{ background: '#F7F8FA' }}>
      {/* Hero — photo under a dark wash, same treatment as every other page */}
      <section style={{ position: 'relative', backgroundColor: INK, padding: '128px 24px 72px', overflow: 'hidden' }}>
        <Image src="/images/hero-kitchen.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(17,24,34,0.94) 0%, rgba(17,24,34,0.84) 50%, rgba(17,24,34,0.55) 100%)' }}
        />
        <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <Breadcrumb items={[{ label: 'Catalog' }]} />
          </div>
          <span style={{ display: 'block', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7FB4E4', fontWeight: 700, marginBottom: '18px' }}>
            Product Catalog
          </span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 58px)', color: '#fff', lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 18px', maxWidth: '760px' }}>
            Browse the Materials We Install
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', maxWidth: '600px', margin: '0 0 30px' }}>
            {DEMO_PRODUCTS.length} cabinets, tiles, countertops, fixtures and more from our supplier partners. Pricing is confirmed in your free in-home quote.
          </p>
          <form action="/catalog" style={{ display: 'flex', maxWidth: '560px', background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
            {cat && <input type="hidden" name="cat" value={cat} />}
            <input
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search by name, SKU or collection"
              aria-label="Search the catalog"
              style={{ flex: 1, padding: '16px 18px', border: 0, outline: 0, fontSize: '15px', minWidth: 0 }}
            />
            <button style={{ background: BLUE, color: '#fff', border: 0, padding: '0 26px', fontWeight: 700, letterSpacing: '0.08em', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Search
            </button>
          </form>
        </div>
      </section>

      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 72px', display: 'grid', gap: '36px', gridTemplateColumns: 'minmax(0,1fr)' }} className="lg:!grid-cols-[230px_minmax(0,1fr)]">
        {/* Category filters */}
        <aside>
          <h2 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, margin: '0 0 14px' }}>Categories</h2>
          <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {[{ key: null as string | null, label: 'All Materials', n: DEMO_PRODUCTS.length }, ...categories.map((c) => ({ key: c as string | null, label: CATEGORY_LABELS[c] ?? c, n: counts.get(c)! }))].map((c) => {
              const active = (cat ?? null) === c.key
              return (
                <Link
                  key={c.label}
                  href={href({ cat: c.key })}
                  className="flex items-center justify-between gap-3 rounded-md px-3.5 py-2.5 text-sm transition-colors"
                  style={active ? { background: INK, color: '#fff', fontWeight: 600 } : { background: '#fff', color: '#1A202C', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  <span>{c.label}</span>
                  <span style={{ fontSize: '12px', opacity: 0.65 }}>{c.n}</span>
                </Link>
              )
            })}
          </nav>
          <div style={{ marginTop: '28px', padding: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }} className="hidden lg:block">
            <p style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px', color: INK }}>Found something you like?</p>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4A5568', margin: '0 0 14px' }}>Tell us the SKU and we&apos;ll price it in your free quote.</p>
            <Link href="/quote" style={{ display: 'block', textAlign: 'center', background: BLUE, color: '#fff', padding: '11px', borderRadius: '5px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Get a Free Quote
            </Link>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '22px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '26px', margin: 0, color: INK }}>{heading}</h2>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              {filtered.length} product{filtered.length === 1 ? '' : 's'}
              {query ? ` for “${q!.trim()}”` : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <ProductLink product={p}>
                  <div className={`relative aspect-square w-full overflow-hidden ${p.category === 'hardware' ? 'bg-white' : 'bg-gray-100'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={`${p.name} — ${p.supplier}`}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${p.category === 'hardware' ? 'object-contain p-6' : 'object-cover'}`}
                    />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(17,24,34,0.82)', color: '#fff', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, padding: '5px 9px', borderRadius: '3px' }}>
                      {CATEGORY_LABELS[p.category] ?? p.category}
                    </span>
                  </div>
                </ProductLink>
                <div style={{ padding: '16px 18px 18px' }}>
                  <h3 style={{ fontSize: '16px', lineHeight: 1.3, margin: '0 0 6px', color: INK, fontWeight: 700 }}>{p.name}</h3>
                  <p style={{ fontSize: '13px', color: '#4A5568', margin: '0 0 2px' }}>{p.supplier}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, wordBreak: 'break-all' }}>
                    SKU {p.supplierSku}
                    {p.dimensions ? ` · ${p.dimensions.widthIn}″ × ${p.dimensions.heightIn}″` : ''}
                  </p>
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                    <DemoBadge product={p} compact />
                    {p.sourceUrl && (
                      <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', fontWeight: 600, color: BLUE }}>
                        View at {p.supplier.split(' ')[0]} ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {items.length === 0 && (
            <div style={{ padding: '72px 0', textAlign: 'center', color: '#6B7280' }}>
              <p style={{ fontSize: '18px', margin: '0 0 8px', color: INK }}>No products match that search.</p>
              <Link href="/catalog" style={{ color: BLUE, fontWeight: 600 }}>Clear filters</Link>
            </div>
          )}

          {pages > 1 && (
            <nav style={{ marginTop: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px' }} aria-label="Pagination">
              {current > 1 ? (
                <Link href={href({ page: current - 1 })} style={{ padding: '10px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.14)', borderRadius: '5px', fontWeight: 600 }}>← Previous</Link>
              ) : <span />}
              <span style={{ color: '#6B7280', padding: '0 8px' }}>Page {current} of {pages}</span>
              {current < pages ? (
                <Link href={href({ page: current + 1 })} style={{ padding: '10px 18px', background: INK, color: '#fff', borderRadius: '5px', fontWeight: 600 }}>Next →</Link>
              ) : <span />}
            </nav>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  )
}
