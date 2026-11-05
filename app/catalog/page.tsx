import type { Metadata } from 'next'
import { pageOg } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import ProductCard from '@/components/catalog/ProductCard'
import { isPlaceholderImage } from '@/lib/catalog/placeholder'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'
import type { Product } from '@/lib/designer/types'
import { byLead } from '@/lib/catalog/featured'

export const metadata: Metadata = {
  title: 'Cabinet, Tile & Countertop Catalog',
  description:
    'Browse the cabinets, countertops, tile, flooring, hardware, sinks and fixtures Crafted Kitchen & Bath sources for Tampa Bay remodels.',
  alternates: { canonical: '/catalog' },
  openGraph: pageOg('/catalog'),
}

const INK = '#111822'
const BLUE = '#2771B0'
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

/** The order categories lead with when everything is shown together. */
const FEATURED_ORDER = ['countertops', 'sinks', 'tile', 'flooring', 'hardware', 'backsplash', 'cabinets']

type Sort = 'featured' | 'name' | 'supplier'
const SORTS: { key: Sort; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'name', label: 'A to Z' },
  { key: 'supplier', label: 'Supplier' },
]

/**
 * "Featured": products with a real photo first, one category at a time in
 * turn so the first page shows the range (a countertop, a sink, a tile, a
 * faucet) instead of one category's long run. Stand-in drawings go last.
 */
function featured(products: Product[]): Product[] {
  const real = byLead(products.filter((p) => !isPlaceholderImage(p)))
  const stand = products.filter(isPlaceholderImage)
  const lanes = new Map<string, Product[]>()
  for (const p of real) lanes.set(p.category, [...(lanes.get(p.category) ?? []), p])
  const order = [...FEATURED_ORDER.filter((c) => lanes.has(c)), ...[...lanes.keys()].filter((c) => !FEATURED_ORDER.includes(c))]
  const mixed: Product[] = []
  for (let i = 0; mixed.length < real.length; i++) {
    for (const c of order) {
      const item = lanes.get(c)?.[i]
      if (item) mixed.push(item)
    }
  }
  return [...mixed, ...stand]
}

/** 1 … 4 5 6 … 25: the first, the last, and the neighbours of the current page. */
function pageList(current: number, total: number): (number | 'gap')[] {
  const wanted = new Set([1, total, current - 1, current, current + 1].filter((n) => n >= 1 && n <= total))
  const out: (number | 'gap')[] = []
  let previous = 0
  for (const n of [...wanted].sort((a, b) => a - b)) {
    if (n - previous > 1) out.push('gap')
    out.push(n)
    previous = n
  }
  return out
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string; page?: string; supplier?: string; sort?: string }>
}) {
  const { cat, q, page, supplier, sort: sortParam } = await searchParams
  const query = (q ?? '').trim().toLowerCase()
  const sort: Sort = SORTS.some((s) => s.key === sortParam) ? (sortParam as Sort) : 'featured'

  const counts = new Map<string, number>()
  for (const p of DEMO_PRODUCTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  const categories = [...counts.keys()].sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b))

  const supplierCounts = new Map<string, number>()
  for (const p of DEMO_PRODUCTS) supplierCounts.set(p.supplier, (supplierCounts.get(p.supplier) ?? 0) + 1)
  const suppliers = [...supplierCounts.keys()].sort((a, b) => a.localeCompare(b))

  const filtered = DEMO_PRODUCTS.filter(
    (p) =>
      (!cat || p.category === cat) &&
      (!supplier || p.supplier === supplier) &&
      (!query || `${p.name} ${p.supplierSku} ${p.collection} ${p.supplier}`.toLowerCase().includes(query)),
  )
  const sorted =
    sort === 'name'
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : sort === 'supplier'
        ? [...filtered].sort((a, b) => a.supplier.localeCompare(b.supplier) || a.name.localeCompare(b.name))
        : cat || supplier || query
          ? [...byLead(filtered.filter((p) => !isPlaceholderImage(p))), ...filtered.filter(isPlaceholderImage)]
          : featured(filtered)

  const pages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const current = Math.min(Math.max(1, Number(page) || 1), pages)
  const items = sorted.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const first = sorted.length ? (current - 1) * PER_PAGE + 1 : 0
  const last = Math.min(current * PER_PAGE, sorted.length)

  const href = (over: { cat?: string | null; supplier?: string | null; q?: null; sort?: Sort; page?: number }) => {
    const sp = new URLSearchParams()
    const c = over.cat === undefined ? cat : over.cat
    const s = over.supplier === undefined ? supplier : over.supplier
    const o = over.sort ?? sort
    if (c) sp.set('cat', c)
    if (s) sp.set('supplier', s)
    if (query && over.q !== null) sp.set('q', q!.trim())
    if (o !== 'featured') sp.set('sort', o)
    if (over.page && over.page > 1) sp.set('page', String(over.page))
    const text = sp.toString()
    return `/catalog${text ? `?${text}` : ''}`
  }

  const heading = cat ? CATEGORY_LABELS[cat] ?? cat : 'All Materials'
  const filtersOn = !!(cat || supplier || query)

  const filterGroups = (
    <>
<div>
            <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Category</h2>
            <nav aria-label="Categories" className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
              {[{ key: null as string | null, label: 'All Materials', n: DEMO_PRODUCTS.length }, ...categories.map((c) => ({ key: c as string | null, label: CATEGORY_LABELS[c] ?? c, n: counts.get(c)! }))].map((c) => {
                const active = (cat ?? null) === c.key
                return (
                  <Link
                    key={c.label}
                    href={href({ cat: c.key, page: 1 })}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[14px] transition-colors ${active ? 'bg-[#EBF4FF] font-semibold text-[#1E5C96]' : 'text-[#4A5568] hover:bg-black/[0.04] hover:text-[#111822]'}`}
                  >
                    <span>{c.label}</span>
                    <span className="text-[12px] text-[#4A5568]">{c.n}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div>
            <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Supplier</h2>
            <nav aria-label="Suppliers" className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
              {suppliers.map((name) => {
                const active = supplier === name
                return (
                  <Link
                    key={name}
                    href={href({ supplier: active ? null : name, page: 1 })}
                    aria-current={active ? 'true' : undefined}
                    className={`flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-[13px] transition-colors ${active ? 'bg-[#EBF4FF] font-semibold text-[#1E5C96]' : 'text-[#4A5568] hover:bg-black/[0.04] hover:text-[#111822]'}`}
                  >
                    <span>{name}</span>
                    <span className="text-[12px] text-[#4A5568]">{supplierCounts.get(name)}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
    </>
  )

  return (
    <main style={{ background: '#F7F8FA' }}>
      {/* Hero: photo under a dark wash, same treatment as every other page */}
      <section style={{ position: 'relative', backgroundColor: INK, padding: '120px 24px 0', overflow: 'hidden' }}>
        <Image src="/images/hero-kitchen.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(17,24,34,0.95) 0%, rgba(17,24,34,0.86) 50%, rgba(17,24,34,0.6) 100%)' }}
        />
        <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <Breadcrumb items={[{ label: 'Catalog' }]} />
          </div>
          <span style={{ display: 'block', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7FB4E4', fontWeight: 700, marginBottom: '14px' }}>
            Product Catalog
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.6vw, 52px)', color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 16px', maxWidth: '780px' }}>
            Browse the Materials We Install
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', maxWidth: '620px', margin: '0 0 28px' }}>
            Cabinets, tile, countertops, fixtures and more from our supplier partners. Pricing is confirmed in your free in-home quote.
          </p>
          <form action="/catalog" style={{ display: 'flex', maxWidth: '580px', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.28)' }}>
            {cat && <input type="hidden" name="cat" value={cat} />}
            {supplier && <input type="hidden" name="supplier" value={supplier} />}
            <input
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search products or SKU"
              aria-label="Search the catalog"
              style={{ flex: 1, padding: '16px 18px', border: 0, outline: 0, fontSize: '15px', minWidth: 0 }}
            />
            <button style={{ background: BLUE, color: '#fff', border: 0, padding: '0 28px', fontWeight: 700, letterSpacing: '0.08em', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Search
            </button>
          </form>

          {/* The facts that earn trust, straight from the data, under the search */}
          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-white/15 text-white sm:max-w-[640px]">
            {[
              [String(DEMO_PRODUCTS.length), 'products'],
              [String(suppliers.length), 'supplier partners'],
              ['Free', 'in-home quote'],
            ].map(([value, label]) => (
              <div key={label} className="bg-[rgba(17,24,34,0.55)] px-4 py-4 backdrop-blur-sm">
                <dt className="sr-only">{label}</dt>
                <dd className="m-0">
                  <span className="block text-[22px] font-extrabold leading-none">{value}</span>
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.1em] text-white/70">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gap: '40px', gridTemplateColumns: 'minmax(0,1fr)' }} className="lg:!grid-cols-[240px_minmax(0,1fr)]">
        {/* Filters: always open beside the results on a wide screen, behind a button on a phone so the products come first */}
        <aside>
          <details className="group rounded-xl border border-black/[0.08] bg-white lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[14px] font-bold" style={{ color: INK }}>
              <span>Filter by category or supplier{filtersOn ? ' · on' : ''}</span>
              <span aria-hidden className="text-[#6B7280] transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="space-y-6 border-t border-black/[0.08] p-4">
              {filterGroups}
            </div>
          </details>
          <div className="hidden space-y-8 lg:block">
            {filterGroups}
          <div className="hidden rounded-xl border border-black/[0.08] bg-white p-5 lg:block">
            <p className="mb-1.5 text-[15px] font-bold" style={{ color: INK }}>See something you like?</p>
            <p className="mb-4 text-[13px] leading-relaxed text-[#4A5568]">Tell us the SKU and we&apos;ll price it in your free in-home quote.</p>
            <Link href="/quote" className="block rounded-md py-2.5 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:brightness-110" style={{ background: BLUE }}>
              Get a Free Quote
            </Link>
          </div>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-black/[0.08] pb-5">
            <div>
              <h2 className="m-0 text-[28px]" style={{ color: INK }}>{heading}</h2>
              <p className="mt-1 text-[14px] text-[#6B7280]">
                {sorted.length === 0 ? 'No products' : `Showing ${first}–${last} of ${sorted.length} products`}
                {query ? ` for “${q!.trim()}”` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2" role="group" aria-label="Sort products">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">Sort</span>
              <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white text-[13px] font-semibold">
                {SORTS.map((s) => (
                  <Link
                    key={s.key}
                    href={href({ sort: s.key, page: 1 })}
                    aria-current={sort === s.key ? 'true' : undefined}
                    className={`px-3.5 py-2 transition-colors ${sort === s.key ? 'bg-[#EBF4FF] text-[#1E5C96]' : 'text-[#4A5568] hover:bg-[#F1F3F6]'}`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {filtersOn && (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-[13px]">
              <span className="text-[#6B7280]">Filtered by</span>
              {cat && <Chip label={CATEGORY_LABELS[cat] ?? cat} clear={href({ cat: null, page: 1 })} />}
              {supplier && <Chip label={supplier} clear={href({ supplier: null, page: 1 })} />}
              {query && <Chip label={`“${q!.trim()}”`} clear={href({ q: null, page: 1 })} />}
              <Link href="/catalog" className="ml-1 font-semibold text-[#2771B0] hover:underline">Clear all</Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {items.length === 0 && (
            <div className="rounded-xl border border-dashed border-black/20 bg-white px-6 py-16 text-center">
              <p className="m-0 text-[18px] font-bold" style={{ color: INK }}>No products match those filters.</p>
              <p className="mt-2 text-[14px] text-[#6B7280]">Try a different search, or tell us what you need and we&apos;ll find it.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/catalog" className="rounded-md border border-black/15 bg-white px-5 py-2.5 text-[13px] font-semibold hover:border-[#2771B0] hover:text-[#2771B0]">Clear filters</Link>
                <Link href="/quote" className="rounded-md px-5 py-2.5 text-[13px] font-bold text-white" style={{ background: BLUE }}>Ask for a quote</Link>
              </div>
            </div>
          )}

          {pages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2 text-[14px]" aria-label="Pagination">
              {current > 1 ? (
                <Link href={href({ page: current - 1 })} rel="prev" className="rounded-lg border border-black/[0.14] bg-white px-4 py-2.5 font-semibold transition-colors hover:border-[#2771B0] hover:text-[#2771B0]">← Previous</Link>
              ) : null}
              {pageList(current, pages).map((n, i) =>
                n === 'gap' ? (
                  <span key={`gap-${i}`} className="px-1.5 text-[#6B7280]" aria-hidden>…</span>
                ) : (
                  <Link
                    key={n}
                    href={href({ page: n })}
                    aria-current={n === current ? 'page' : undefined}
                    aria-label={`Page ${n}`}
                    className={`min-w-[42px] rounded-lg border px-3 py-2.5 text-center font-semibold transition-colors ${n === current ? 'border-transparent text-white' : 'border-black/[0.14] bg-white hover:border-[#2771B0] hover:text-[#2771B0]'}`}
                    style={n === current ? { background: INK } : undefined}
                  >
                    {n}
                  </Link>
                ),
              )}
              {current < pages ? (
                <Link href={href({ page: current + 1 })} rel="next" className="rounded-lg px-4 py-2.5 font-semibold text-white transition-colors hover:brightness-125" style={{ background: INK }}>Next →</Link>
              ) : null}
            </nav>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  )
}

function Chip({ label, clear }: { label: string; clear: string }) {
  return (
    <Link
      href={clear}
      aria-label={`Remove filter ${label}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#2771B0]/30 bg-[#EBF4FF] px-3 py-1 font-semibold text-[#1E5C96] transition-colors hover:bg-[#dcebfb]"
    >
      {label}
      <span aria-hidden className="text-[15px] leading-none">×</span>
    </Link>
  )
}
