import type { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/SectionLabel'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Kitchen & Bathroom Remodeling Portfolio | Tampa Bay Projects | Crafted Kitchen & Bath',
  description:
    'Browse real completed kitchen and bathroom remodeling projects by Crafted Kitchen & Bath across Oldsmar, Clearwater, Palm Harbor, Tampa, and Pinellas County.',
}

// Real completed-project photos pulled from Crafted Kitchen & Bath's own library.
// (craftedkitchenandbath.com is whitelisted in next.config images.remotePatterns.)
const BASE = 'https://craftedkitchenandbath.com/wp-content/uploads'
const photos: { src: string; alt: string }[] = [
  { src: `${BASE}/2025/06/IMG_4485.jpg`, alt: 'Completed kitchen remodel by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/04/2226.jpg`, alt: 'Finished remodeling project by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/06/IMG_1015.jpeg`, alt: 'Custom remodeling work by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/03/2023-09-10.jpg`, alt: 'Completed remodel by Crafted Kitchen & Bath — Pinellas County' },
  { src: `${BASE}/2025/06/IMG_4489.jpg`, alt: 'Kitchen remodeling detail by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/06/IMG_1017.jpeg`, alt: 'Bathroom remodeling work by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/03/2024-09-03.jpg`, alt: 'Finished remodeling project by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/06/IMG_2566-scaled.jpg`, alt: 'Custom remodel by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/03/2025-01-22.jpg`, alt: 'Completed remodel by Crafted Kitchen & Bath — Pinellas County' },
  { src: `${BASE}/2025/06/IMG_4491.jpg`, alt: 'Kitchen remodeling project by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/11/IMG_6144-scaled.jpeg`, alt: 'Recent remodeling project by Crafted Kitchen & Bath — Tampa Bay' },
  { src: `${BASE}/2025/06/IMG_1020.jpeg`, alt: 'Custom remodeling work by Crafted Kitchen & Bath — Tampa Bay' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Crafted Kitchen and Bath Portfolio',
  description:
    'Completed kitchen and bathroom remodeling projects by Crafted Kitchen and Bath — serving Pinellas and Hillsborough County, FL.',
  url: 'https://craftedkitchenandbath.com/our-work',
  author: {
    '@type': 'LocalBusiness',
    name: 'Crafted Kitchen and Bath',
    url: 'https://craftedkitchenandbath.com',
    telephone: '+17273837550',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '120 Commerce Blvd Suite 4',
      addressLocality: 'Oldsmar',
      addressRegion: 'FL',
      postalCode: '34677',
      addressCountry: 'US',
    },
  },
  associatedMedia: photos.map((p) => ({ '@type': 'ImageObject', contentUrl: p.src, description: p.alt })),
}

const headingFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"

export default function OurWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ backgroundColor: '#F7F8FA' }}>
        {/* ── HERO ── */}
        <section style={{ backgroundColor: '#F7F8FA', padding: '96px 24px 56px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <Breadcrumb items={[{ label: 'Our Work' }]} />
            </div>
            <div style={{ maxWidth: '720px' }}>
              <SectionLabel>Portfolio</SectionLabel>
              <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', color: '#1A202C', lineHeight: 1.15, letterSpacing: '0.01em', margin: '24px 0 20px' }}>
                Spaces We&apos;ve Transformed
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8, color: '#4A5568', maxWidth: '560px', margin: 0 }}>
                A look at real kitchens, baths, and interiors we&apos;ve remodeled for Tampa Bay homeowners — every one a real family&apos;s home and the trust they placed in us.
              </p>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section style={{ backgroundColor: '#F7F8FA', padding: '24px 24px 64px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {photos.map((p, i) => (
                <div key={i} className="group" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: '#E8ECF0' }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.6s ease' }}
                    className="group-hover:scale-105"
                    loading={i < 6 ? undefined : 'lazy'}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#2B7CC1', opacity: 0, transition: 'opacity 0.3s ease' }} className="group-hover:opacity-100" />
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', margin: '32px 0 0', lineHeight: 1.7 }}>
              A selection of recent projects. Want to see work similar to yours?{' '}
              <a href="/contact" style={{ color: '#2B7CC1', textDecoration: 'none' }}>Ask us for examples from your area.</a>
            </p>
          </div>
        </section>

        {/* ── PULL QUOTE ── */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#2B7CC1' }} aria-hidden="true" />
            <div style={{ display: 'flex', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map((s) => (<span key={s} style={{ color: '#2B7CC1', fontSize: '18px' }} aria-hidden="true">★</span>))}
            </div>
            <blockquote style={{ fontFamily: headingFont, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: '#1A202C', lineHeight: 1.55, margin: 0, letterSpacing: '0.01em' }}>
              &ldquo;The quality of the craftsmanship was exceptional. Every little touch made it clear this team takes real pride in their work.&rdquo;
            </blockquote>
            <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280', margin: 0 }}>— Verified Crafted Client</p>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#2B7CC1', opacity: 0.4 }} aria-hidden="true" />
          </div>
        </section>

        <CTASection
          headline="Ready to Add Your Project to This List?"
          primaryCTA="Start My Remodel"
          primaryHref="/contact"
        />
      </div>
    </>
  )
}
