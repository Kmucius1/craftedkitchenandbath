import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/SectionLabel'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import PortfolioCarousel, { type CarouselItem } from '@/components/PortfolioCarousel'

export const metadata: Metadata = {
  title: 'Kitchen & Bathroom Remodeling Portfolio | Tampa Bay Projects | Crafted Kitchen & Bath',
  description:
    'Browse real completed kitchen and bathroom remodeling projects by Crafted Kitchen & Bath across Oldsmar, Clearwater, Palm Harbor, Tampa, and Pinellas County.',
}

// Real completed-project photos pulled from Crafted Kitchen & Bath's own library,
// downloaded locally at full resolution to keep every image crisp.
const LOCAL = '/images/wp'

// ── TOP 3 FEATURED PROJECTS (spotlighted with descriptions) ──
type FeaturedProject = {
  src: string
  alt: string
  name: string
  location: string
  category: string
  description: string
}
const featured: FeaturedProject[] = [
  {
    src: `${LOCAL}/Hunter-Kitchen-hires.png`,
    alt: 'Open-concept coastal kitchen with quartz island and LED-lit glass cabinetry — Oldsmar FL',
    name: 'Open-Concept Coastal Kitchen',
    location: 'Oldsmar, FL',
    category: 'Kitchen Remodel',
    description:
      'A full open-concept transformation built for entertaining. Custom white shaker cabinetry, a quartz island with seating, glass-front display uppers with LED accent lighting, and a built-in wine fridge — finished with warm wood floors and soft coastal tones.',
  },
  {
    src: `${LOCAL}/IMG_6153-scaled.jpeg`,
    alt: 'Spa-inspired master bathroom with glass walk-in shower, dual wood vanity, and designer tile — Tampa Bay',
    name: 'Spa-Inspired Master Retreat',
    location: 'Tampa, FL',
    category: 'Bathroom Remodel',
    description:
      'A serene master bath centered on a frameless glass walk-in shower with floor-to-ceiling tile. A custom dual-sink wood vanity, quartz counters, designer accent wall, and warm sconce lighting create a true spa-like retreat.',
  },
  {
    src: `${LOCAL}/IMG_2580-scaled.jpeg`,
    alt: 'Two-tone chef’s kitchen with white uppers, walnut lowers, and brass pendants — Palm Harbor FL',
    name: 'Two-Tone Chef’s Kitchen',
    location: 'Palm Harbor, FL',
    category: 'Kitchen Remodel',
    description:
      'A warm, modern chef’s kitchen pairing white upper cabinetry with rich walnut lowers. A waterfall quartz island, custom range hood, and brass pendant lighting give the space a high-end, magazine-ready finish.',
  },
]

// ── SLIDESHOW (the wider collection) ──
const carouselItems: CarouselItem[] = [
  { src: `${LOCAL}/IMG_6133-scaled.jpeg`, category: 'Kitchen Remodel', title: 'Walnut Kitchen with Quartz Waterfall Island — Pinellas County', alt: 'Walnut kitchen remodel with quartz waterfall island — Pinellas County' },
  { src: `${LOCAL}/IMG_2206-scaled.jpeg`, category: 'Kitchen Remodel', title: 'White Kitchen Open to the Living Room — Tampa Bay', alt: 'White kitchen open to living room with granite island — Tampa Bay' },
  { src: `${LOCAL}/IMG_3266-1-scaled.jpg`, category: 'Kitchen Remodel', title: 'Kitchen with Brick Arches & Chandelier Pendants — Tampa Bay', alt: 'Kitchen remodel with brick arched doorways and chandelier pendants — Tampa Bay' },
  { src: `${LOCAL}/IMG_6137-scaled.jpeg`, category: 'Kitchen Remodel', title: 'Waterfront Kitchen with Floating Shelves — Tampa Bay', alt: 'Kitchen remodel with water views, floating wood shelves, and quartz counters — Tampa Bay' },
  { src: `${LOCAL}/IMG_2587-scaled.jpeg`, category: 'Kitchen Remodel', title: 'White & Wood Kitchen with Glass Pendants — Tampa Bay', alt: 'White and wood kitchen with glass pendant lighting and quartz island — Tampa Bay' },
  { src: `${LOCAL}/IMG_1419-scaled.jpg`, category: 'Kitchen & Flooring', title: 'White Kitchen with Wood-Look Plank Floors — Tampa Bay', alt: 'White kitchen remodel with black hardware and wood-look flooring — Tampa Bay' },
  { src: `${LOCAL}/IMG_6061-1-scaled.jpg`, category: 'Bathroom Remodel', title: 'Modern Bath with Vessel Sink & Marble Shower — Tampa Bay', alt: 'Modern bathroom with vessel sink, round mirror, and marble shower — Tampa Bay' },
  { src: `${LOCAL}/IMG_1147-1-scaled.jpg`, category: 'Bathroom Remodel', title: 'Marble Bath with Round Mirror & Walk-In Shower — Tampa Bay', alt: 'Bright marble bathroom with round black mirror and tiled walk-in shower — Tampa Bay' },
  { src: `${LOCAL}/IMG_0743-edited-1-scaled.jpg`, category: 'Bathroom Remodel', title: 'Powder Room with Vessel Sink & Designer Sconces — Tampa Bay', alt: 'Elegant powder room with stone vessel sink, designer sconces, and white vanity — Tampa Bay' },
  { src: `${LOCAL}/IMG_0801-scaled.jpg`, category: 'Bathroom Remodel', title: 'Sage Green Vanity with Brass Fixtures — Safety Harbor', alt: 'Sage green bathroom vanity with brass faucet and marble tile — Safety Harbor FL' },
  { src: `${LOCAL}/IMG_1243-scaled.jpg`, category: 'Bathroom Remodel', title: 'Walk-In Shower with Shiplap Walls — Clearwater', alt: 'Custom walk-in shower with shiplap walls and glass enclosure — Clearwater FL' },
  { src: `${LOCAL}/IMG_6140-scaled.jpeg`, category: 'Complete Interior', title: 'Open Kitchen & Dining Room Transformation — Tampa Bay', alt: 'Open kitchen and dining room remodel — complete interior transformation — Tampa Bay' },
  { src: `${LOCAL}/IMG_5983-scaled.jpeg`, category: 'Complete Interior', title: 'Custom Entertainment Wall with Slat Panels — Tampa Bay', alt: 'Custom TV entertainment wall with black slat panels and marble tile — Tampa Bay' },
]

// All images, for structured data
const allPhotos = [...featured, ...carouselItems]

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
  associatedMedia: allPhotos.map((p) => ({ '@type': 'ImageObject', contentUrl: p.src, description: p.alt })),
}

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif"

export default function OurWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ backgroundColor: '#F7F8FA' }}>
        {/* ── HERO (compact page header) ── */}
        <section style={{ backgroundColor: '#F7F8FA', padding: '112px 24px 36px' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <Breadcrumb items={[{ label: 'Our Work' }]} />
            </div>
            <div style={{ maxWidth: '760px' }}>
              <SectionLabel>Portfolio</SectionLabel>
              <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(30px, 4vw, 46px)', color: '#1A202C', lineHeight: 1.15, letterSpacing: '0.01em', margin: '16px 0 14px' }}>
                Spaces We&apos;ve Transformed
              </h1>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#4A5568', maxWidth: '600px', margin: 0 }}>
                Real kitchens, baths, and interiors we&apos;ve remodeled for Tampa Bay homeowners.
              </p>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS (top 3, highlighted) ── */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '56px 24px 80px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px', maxWidth: '620px' }}>
              <SectionLabel>Featured Projects</SectionLabel>
              <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#1A202C', lineHeight: 1.2, letterSpacing: '0.01em', margin: '16px 0 0' }}>
                A Few We&apos;re Especially Proud Of
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {featured.map((p, i) => (
                <div
                  key={p.src}
                  className={`featured-row${i % 2 === 1 ? ' reverse' : ''}`}
                >
                  {/* Image */}
                  <div
                    className="featured-img"
                    style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: '2px', backgroundColor: '#E8ECF0' }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  {/* Copy */}
                  <div className="featured-copy">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontFamily: headingFont, fontSize: '32px', fontWeight: 300, color: 'rgba(43,124,193,0.35)', lineHeight: 1 }}>
                        0{i + 1}
                      </span>
                      <span style={{ color: '#2B7CC1', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600 }}>
                        {p.category}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: headingFont, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 30px)', color: '#1A202C', lineHeight: 1.25, margin: '0 0 6px' }}>
                      {p.name}
                    </h3>
                    <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 18px' }}>
                      {p.location}
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#4A5568', margin: 0 }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SLIDESHOW (more transformations) ── */}
        <section style={{ backgroundColor: '#F7F8FA', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '36px', maxWidth: '620px' }}>
              <SectionLabel>The Full Collection</SectionLabel>
              <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(28px, 4vw, 44px)', color: '#1A202C', lineHeight: 1.2, letterSpacing: '0.01em', margin: '20px 0 12px' }}>
                More Transformations
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#4A5568', margin: 0 }}>
                Use the arrows or tap a thumbnail below to browse recent kitchens, baths, and interiors across Tampa Bay.
              </p>
            </div>

            <PortfolioCarousel items={carouselItems} />

            <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', margin: '36px 0 0', lineHeight: 1.7 }}>
              Want to see work similar to yours?{' '}
              <Link href="/contact" style={{ color: '#2B7CC1', textDecoration: 'none' }}>Ask us for examples from your area.</Link>
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
              &ldquo;They took our outdated kitchen and made it bright, open, and modern. The whole crew did a great job and were very professional — the quality of their work and materials is excellent. We love our new kitchen!&rdquo;
            </blockquote>
            <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280', margin: 0 }}>— Darrell Smith · 5★ Google Review</p>
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
