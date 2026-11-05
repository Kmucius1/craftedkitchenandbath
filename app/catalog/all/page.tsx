import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'
import { pageOg } from '@/lib/seo'

// Every product on one plain page, grouped by category. The catalog reaches
// most products only through filter and page links (?page=2), which search
// engines treat as copies of /catalog, so without this page those products
// have no ordinary link pointing at them.

export const metadata: Metadata = {
  title: 'All Products A to Z',
  description:
    'Every cabinet, countertop, tile, flooring, sink, hardware and plumbing product in the Crafted Kitchen & Bath catalog, grouped by category.',
  alternates: { canonical: '/catalog/all' },
  openGraph: pageOg('/catalog/all'),
}

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

export default function AllProductsPage() {
  const groups = new Map<string, typeof DEMO_PRODUCTS>()
  for (const p of DEMO_PRODUCTS) groups.set(p.category, [...(groups.get(p.category) ?? []), p])
  const categories = [...groups.keys()].sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b))

  return (
    <>
      <section style={{ backgroundColor: '#F7F8FA', padding: '112px 24px 32px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Breadcrumb tone="light" items={[{ label: 'Catalog', href: '/catalog' }, { label: 'All products' }]} />
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 4vw, 44px)', color: '#111822', margin: '20px 0 12px' }}>
            All products A to Z
          </h1>
          <p style={{ color: '#4A5568', fontSize: '16px', lineHeight: 1.7, margin: 0, maxWidth: '680px' }}>
            {DEMO_PRODUCTS.length} products from our supplier partners. Pick one to see its sizes, colors and finishes, or{' '}
            <Link href="/catalog" style={{ color: '#2771B0', textDecoration: 'underline' }}>browse the catalog with photos</Link>.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '40px 24px 72px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {categories.map((c) => (
              <a key={c} href={`#${c}`} style={{ color: '#2771B0', fontWeight: 600 }}>
                {CATEGORY_LABELS[c] ?? c} ({groups.get(c)!.length})
              </a>
            ))}
          </nav>
          {categories.map((c) => (
            <div key={c} id={c} style={{ marginBottom: '40px', scrollMarginTop: '110px' }}>
              <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 700, fontSize: '22px', color: '#111822', margin: '0 0 14px' }}>
                {CATEGORY_LABELS[c] ?? c}
              </h2>
              <ul className="grid gap-x-8 gap-y-1.5 text-[14px] sm:grid-cols-2 lg:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[...groups.get(c)!]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((p) => (
                    <li key={p.id}>
                      <Link href={`/catalog/${p.id}`} style={{ color: '#1A202C' }} className="hover:text-[#2771B0] hover:underline">
                        {p.name}
                      </Link>{' '}
                      <span style={{ color: '#4A5568' }}>· {p.supplier}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
