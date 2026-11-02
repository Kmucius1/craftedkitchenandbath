import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import ProductDetail from '@/components/catalog/ProductDetail'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'

const CATEGORY_LABELS: Record<string, string> = {
  cabinets: 'Cabinets', countertops: 'Countertops', backsplash: 'Backsplash', tile: 'Tile', flooring: 'Flooring',
  hardware: 'Hardware', sinks: 'Sinks', plumbing: 'Plumbing',
}

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const p = DEMO_PRODUCTS.find((x) => x.id === id)
  if (!p) return { title: 'Product not found | Crafted Kitchen & Bath' }
  return {
    title: `${p.name} (${p.supplier}) | Crafted Kitchen & Bath`,
    description: `${p.name} from ${p.supplier}${p.collection ? `, ${p.collection}` : ''}. See every size, color and finish, then request pricing from Crafted Kitchen & Bath.`,
    alternates: { canonical: `https://craftedkitchenandbath.com/catalog/${p.id}` },
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
          <Link href="/catalog" style={{ display: 'inline-block', marginBottom: '20px', color: '#2B7CC1', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>← Back to the catalog</Link>
          <ProductDetail product={product} />
        </div>
      </section>
      <CTASection />
    </>
  )
}
