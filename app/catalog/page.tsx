import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/SectionLabel'
import CTASection from '@/components/CTASection'
import DemoBadge from '@/components/designer/DemoBadge'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'

export const metadata: Metadata = {
  title: 'Product Catalog — Cabinets, Tile, Countertops & More | Crafted Kitchen & Bath',
  description:
    'Browse the cabinets, countertops, tile, flooring, hardware, sinks and fixtures Crafted Kitchen & Bath sources for Tampa Bay remodels.',
}

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

  return (
    <main>
      <section className="bg-[#1a2a4a] px-4 pb-14 pt-32 text-center text-white">
        <SectionLabel>Product Catalog</SectionLabel>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Browse Our Materials</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Every product we source from our supplier partners. Pricing is confirmed with your free in-home quote.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <form action="/catalog" className="mb-6 flex gap-2">
          {cat && <input type="hidden" name="cat" value={cat} />}
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Search by name, SKU or collection"
            className="w-full max-w-md rounded border border-gray-300 px-4 py-2"
          />
          <button className="rounded bg-[#2b6cb0] px-5 py-2 font-semibold text-white">Search</button>
        </form>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link href={href({ cat: null })} className={`rounded-full border px-4 py-1.5 text-sm ${!cat ? 'bg-[#1a2a4a] text-white' : ''}`}>
            All ({DEMO_PRODUCTS.length})
          </Link>
          {categories.map((c) => (
            <Link key={c} href={href({ cat: c })} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? 'bg-[#1a2a4a] text-white' : ''}`}>
              {CATEGORY_LABELS[c] ?? c} ({counts.get(c)})
            </Link>
          ))}
        </div>

        <p className="mb-4 text-sm text-gray-600">
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((p) => (
            <article key={p.id} className="overflow-hidden rounded border border-gray-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt={`${p.name} — ${p.supplier}`} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-3">
                <h2 className="text-sm font-semibold leading-tight">{p.name}</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {p.supplier} · {p.supplierSku}
                </p>
                {p.dimensions && (
                  <p className="text-xs text-gray-500">
                    {p.dimensions.widthIn}″ × {p.dimensions.heightIn}″
                  </p>
                )}
                <div className="mt-2">
                  <DemoBadge product={p} compact />
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && <p className="py-16 text-center text-gray-500">No products match that search.</p>}

        {pages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-4 text-sm">
            {current > 1 && <Link href={href({ page: current - 1 })}>← Previous</Link>}
            <span>
              Page {current} of {pages}
            </span>
            {current < pages && <Link href={href({ page: current + 1 })}>Next →</Link>}
          </nav>
        )}
      </section>

      <CTASection />
    </main>
  )
}
