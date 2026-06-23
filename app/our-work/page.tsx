import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionLabel from '@/components/SectionLabel'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Kitchen & Bathroom Remodeling Portfolio | Tampa Bay Projects | Crafted Kitchen & Bath',
  description:
    'Browse completed kitchen remodeling and bathroom renovation projects across Oldsmar, Clearwater, Palm Harbor, Tampa, and Pinellas County. See the Crafted Kitchen & Bath difference.',
}

const projects = [
  {
    id: 1,
    name: 'Kitchen Remodel — Oldsmar',
    category: 'Kitchen',
    caption: 'Open-concept layout with custom cabinetry, quartz countertops, and wine cooler.',
    orientation: 'landscape',
    photo: '/images/HUNTER-KITCHEN-scaled-e1749228160387-rmoy5v31s7ks5mfa39k77eoxtj9ob0g9p8e51b89qw.png',
    photoAlt: 'Custom kitchen remodel — Oldsmar, FL',
  },
  {
    id: 2,
    name: 'Master Bath Retreat — Clearwater',
    category: 'Bathroom',
    caption: 'Marble double vanity, frameless glass shower, freestanding tub, and heated tile floors.',
    orientation: 'landscape',
    photo: '/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png',
    photoAlt: 'Luxury spa bathroom remodel — Clearwater, FL',
  },
  {
    id: 3,
    name: 'Full Interior — Safety Harbor',
    category: 'Interior',
    caption: 'Complete kitchen, two baths, and whole-home flooring replacement.',
    orientation: 'landscape',
    photo: '/images/hero-kitchen.jpg',
    photoAlt: 'Full interior remodel — Safety Harbor, FL',
  },
  {
    id: 4,
    name: 'Bathroom Renovation — Palm Harbor',
    category: 'Bathroom',
    caption: 'Walk-in tile shower, double vanity, and updated lighting throughout.',
    orientation: 'portrait',
    photo: '/images/hero-bathroom.jpg',
    photoAlt: 'Luxury bathroom renovation — Palm Harbor, FL',
  },
  {
    id: 5,
    name: 'Kitchen Remodel — Dunedin',
    category: 'Kitchen',
    caption: 'Marble waterfall island, custom cabinetry, and gold pendant lighting.',
    orientation: 'landscape',
    photo: '/images/7538a222-6dd1-43e7-8c45-55880dacb434.png',
    photoAlt: 'Luxury kitchen remodel — Dunedin, FL',
  },
  {
    id: 6,
    name: 'LVP Flooring — Tarpon Springs',
    category: 'Flooring',
    caption: 'Whole-home luxury vinyl plank installation, 1,800 sq ft.',
    orientation: 'landscape',
    photo: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=90',
    photoAlt: 'Luxury bathroom and flooring — Tarpon Springs, FL',
  },
  {
    id: 7,
    name: 'Interior Painting — St. Petersburg',
    category: 'Painting',
    caption: 'Full interior repaint including trim, doors, and accent walls.',
    orientation: 'portrait',
    photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=90',
    photoAlt: 'Interior remodel — St. Petersburg, FL',
  },
  {
    id: 8,
    name: 'Kitchen Remodel — Tampa',
    category: 'Kitchen',
    caption: 'Open-concept layout, custom cabinetry, and stone countertops.',
    orientation: 'landscape',
    photo: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=90',
    photoAlt: 'Kitchen remodel — Tampa, FL',
  },
  {
    id: 9,
    name: 'Bathroom Refresh — Largo',
    category: 'Bathroom',
    caption: 'Vanity replacement, tile surround, and updated fixtures.',
    orientation: 'landscape',
    photo: '/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png',
    photoAlt: 'Bathroom refresh — Largo, FL',
  },
]

const filters = ['All', 'Kitchens', 'Bathrooms', 'Interiors', 'Flooring', 'Painting']

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Crafted Kitchen and Bath Portfolio',
  description:
    'Kitchen remodeling, bathroom renovation, flooring, and painting project portfolio for Crafted Kitchen and Bath — serving Pinellas and Hillsborough County, FL.',
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
  associatedMedia: projects.map((p) => ({
    '@type': 'ImageObject',
    name: p.name,
    description: p.caption,
    keywords: p.category,
  })),
}

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ backgroundColor: '#F7F8FA' }}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: '#F7F8FA',
            padding: '80px 24px 64px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '40px' }}>
              <Breadcrumb items={[{ label: 'Our Work' }]} />
            </div>

            <div style={{ maxWidth: '720px' }}>
              <SectionLabel>Portfolio</SectionLabel>

              <h1
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  color: '#1A202C',
                  lineHeight: 1.15,
                  letterSpacing: '0.01em',
                  margin: '24px 0 20px',
                }}
              >
                Spaces We&apos;ve Transformed
              </h1>

              <p
                style={{
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  lineHeight: 1.8,
                  color: '#4A5568',
                  maxWidth: '560px',
                  margin: 0,
                }}
              >
                Every project in our portfolio represents a real family&apos;s home — and the trust they placed in us to get it right.
              </p>
            </div>
          </div>
        </section>

        {/* ── FILTERS (static display) ──────────────────────────────────── */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            padding: '40px 24px 0',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                paddingBottom: '32px',
              }}
            >
              {/* Label */}
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#9CA3AF',
                  marginRight: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                Browse by Type
              </span>

              {filters.map((filter, idx) => (
                <span
                  key={filter}
                  style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    cursor: 'default',
                    border: '1px solid #2B7CC1',
                    backgroundColor: idx === 0 ? '#2B7CC1' : 'transparent',
                    color: idx === 0 ? '#FFFFFF' : '#2B7CC1',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO GRID ────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: '#F7F8FA',
            padding: '56px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project) => {
                const isPortrait = project.orientation === 'portrait'
                return (
                  <div
                    key={project.id}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: isPortrait ? '320px' : '240px',
                      cursor: 'default',
                    }}
                    className="group"
                  >
                    {/* Real photo for every card */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <Image
                        src={project.photo!}
                        alt={project.photoAlt!}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>

                    {/* Subtle texture overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                          'radial-gradient(ellipse at 30% 20%, rgba(43, 124, 193, 0.06) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Hover overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0)',
                        transition: 'background-color 0.3s ease',
                      }}
                      className="group-hover:bg-[rgba(0,0,0,0.08)]"
                    />

                    {/* Top blue accent line — appears on hover */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#2B7CC1',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      className="group-hover:opacity-100"
                    />

                    {/* Project info — always visible at bottom */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 'auto 0 0 0',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.50) 70%, transparent 100%)',
                        padding: '32px 24px 24px',
                        backdropFilter: 'blur(2px)',
                      }}
                    >
                      {/* Category tag */}
                      <p
                        style={{
                          fontSize: '9px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.18em',
                          color: '#2B7CC1',
                          margin: '0 0 8px',
                          fontWeight: 500,
                        }}
                      >
                        {project.category}
                      </p>

                      {/* Project title */}
                      <p
                        style={{
                          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                          fontWeight: 400,
                          fontStyle: 'italic',
                          fontSize: '17px',
                          color: '#1A202C',
                          margin: '0 0 8px',
                          lineHeight: 1.3,
                        }}
                      >
                        {project.name}
                      </p>

                      {/* Caption */}
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#4A5568',
                          margin: 0,
                          lineHeight: 1.6,
                          opacity: 0,
                          transform: 'translateY(4px)',
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                        className="group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        {project.caption}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: '#F7F8FA',
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Blue line above */}
            <div
              style={{
                width: '40px',
                height: '1px',
                backgroundColor: '#2B7CC1',
              }}
            />

            {/* Stars */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  style={{ color: '#2B7CC1', fontSize: '18px' }}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(20px, 3vw, 28px)',
                color: '#1A202C',
                lineHeight: 1.55,
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              &ldquo;The quality of the craftsmanship was exceptional. Every little touch made it clear this team takes real pride in their work.&rdquo;
            </blockquote>

            {/* Attribution */}
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                margin: 0,
              }}
            >
              — M.R., Palm Harbor
            </p>

            {/* Blue line below */}
            <div
              style={{
                width: '40px',
                height: '1px',
                backgroundColor: '#2B7CC1',
                opacity: 0.4,
              }}
            />
          </div>
        </section>

        {/* ── EDITORIAL NOTE ────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            padding: '40px 24px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}
          >
            {/* Blue bullet */}
            <span
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                backgroundColor: '#2B7CC1',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '7px',
              }}
              aria-hidden="true"
            />
            <p
              style={{
                fontSize: '13px',
                fontStyle: 'italic',
                lineHeight: 1.75,
                color: '#9CA3AF',
                margin: 0,
              }}
            >
              Photographs of completed projects available upon request. Contact us to see examples from your specific area or project type.{' '}
              <Link
                href="/contact"
                style={{
                  color: '#2B7CC1',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                Reach out here.
              </Link>
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <CTASection
          headline="Ready to Add Your Project to This List?"
          primaryCTA="Start My Remodel"
          primaryHref="/contact"
        />

      </main>
    </>
  )
}
