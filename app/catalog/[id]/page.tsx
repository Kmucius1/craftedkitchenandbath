import type { Metadata } from 'next'
import { fitDescription, fitTitle, pageOg } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import ProductDetail from '@/components/catalog/ProductDetail'
import RelatedProducts from '@/components/catalog/RelatedProducts'
import { pairedProducts, relatedProducts } from '@/lib/catalog/related'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'

const CATEGORY_LABELS: Record<string, string> = {
  cabinets: 'Cabinets', countertops: 'Countertops', backsplash: 'Backsplash', tile: 'Tile', flooring: 'Flooring',
  hardware: 'Hardware', sinks: 'Sinks', plumbing: 'Plumbing',
}

// Several products share a name across sizes (e.g. "Double Door Double Drawer
// Base" in 30/33/36 inch). Those get their size or SKU in the title and
// description so every product page is distinct in search results.
const NAME_COUNTS = DEMO_PRODUCTS.reduce((m, p) => m.set(p.name, (m.get(p.name) ?? 0) + 1), new Map<string, number>())
const distinctName = (p: (typeof DEMO_PRODUCTS)[number]) =>
  (NAME_COUNTS.get(p.name) ?? 0) < 2
    ? p.name
    : `${p.name} ${p.dimensions ? `${p.dimensions.widthIn}″ × ${p.dimensions.heightIn}″` : p.supplierSku}`

// Only the addresses listed below exist; anything else is a real 404.
export const dynamicParams = false

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const p = DEMO_PRODUCTS.find((x) => x.id === id)
  if (!p) return { title: 'Product not found' }
  return {
    // The supplier is dropped from the title when the name alone is already long.
    title: fitTitle(`${distinctName(p)} (${p.supplier})`.length + 25 <= 60 ? `${distinctName(p)} (${p.supplier})` : distinctName(p)),
    description: fitDescription(`${distinctName(p)} from ${p.supplier}${p.collection ? `, ${p.collection}` : ''}. See every size, color and finish, then request pricing from Crafted Kitchen & Bath.`),
    alternates: { canonical: `/catalog/${p.id}` },
    openGraph: pageOg(`/catalog/${p.id}`),
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = DEMO_PRODUCTS.find((p) => p.id === id)
  if (!product) notFound()

  return (
    <>
      <section style={{ backgroundColor: '#111822', padding: '110px 24px 18px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Breadcrumb items={[{ label: 'Catalog', href: '/catalog' }, { label: CATEGORY_LABELS[product.category] ?? product.category, href: `/catalog?category=${product.category}` }, { label: product.name }]} />
        </div>
      </section>
      <section style={{ background: '#fff', padding: '32px 24px 64px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Link href="/catalog" style={{ display: 'inline-block', marginBottom: '20px', color: '#2771B0', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>← Back to the catalog</Link>
          <ProductDetail product={product} />
          <RelatedProducts
            id="pairs-h"
            title="Pairs with this"
            note="Other things this kind of project usually needs. Fit and finish are confirmed together in your free in-home quote."
            products={pairedProducts(product, DEMO_PRODUCTS)}
          />
          <RelatedProducts
            id="related-h"
            title={`More ${(CATEGORY_LABELS[product.category] ?? product.category).toLowerCase()}`}
            note="Similar products from the catalog."
            products={relatedProducts(product, DEMO_PRODUCTS)}
          />
        </div>
      </section>
      <CTASection />
    </>
  )
}
