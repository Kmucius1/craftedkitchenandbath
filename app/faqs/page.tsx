import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/SectionLabel'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Kitchen & Bathroom Remodeling FAQs | Crafted Kitchen & Bath | Tampa Bay',
  description:
    'Answers to common questions about kitchen remodeling, bathroom renovation, countertops, cabinetry, and the remodeling process. Serving Pinellas and Hillsborough County FL.',
}

// ─────────────────────────────────────────────
// FAQ DATA
// ─────────────────────────────────────────────
const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I get a quote?',
        a: 'Call us at (727) 383-7550 or fill out our online contact form. We\'ll schedule a free in-home consultation to review your space and discuss your goals. You\'ll receive a clear, detailed quote after that visit.',
      },
      {
        q: 'Do you offer free consultations?',
        a: 'Yes — all initial consultations are complimentary. We come to your home, assess the space, and talk through your vision before any commitment.',
      },
      {
        q: 'How soon can you start?',
        a: 'Timing depends on our current schedule. After your consultation, we\'ll give you a realistic start date and project timeline.',
      },
    ],
  },
  {
    category: 'Kitchen Remodeling',
    items: [
      {
        q: 'How long does a kitchen remodel take?',
        a: 'Most kitchen remodels take 4–8 weeks. Full gut renovations with layout changes may take longer. We\'ll provide a clear timeline before work begins.',
      },
      {
        q: 'Do you supply materials or do I source them?',
        a: 'We supply all materials as part of the project. This simplifies the process and ensures everything is coordinated. We\'ll guide you through selections.',
      },
      {
        q: 'Can you change the layout of my kitchen?',
        a: 'Yes. We can reconfigure layouts, move walls (with proper permits), relocate plumbing and electrical, and redesign the flow of your kitchen.',
      },
      {
        q: 'What cabinetry brands or styles do you offer?',
        a: 'We offer a range of cabinet styles — shaker, slab, inset, and more — in various finishes and colors. We\'ll show you options that fit your budget and aesthetic.',
      },
    ],
  },
  {
    category: 'Bathroom Remodeling',
    items: [
      {
        q: 'How long does a bathroom remodel take?',
        a: 'A typical bathroom renovation takes 2–5 weeks. Larger projects or those with full tile and plumbing changes may take longer.',
      },
      {
        q: 'Can you install a walk-in shower?',
        a: 'Yes — custom walk-in showers with frameless glass, tile surrounds, built-in niches, and rain heads are one of our most popular upgrades.',
      },
      {
        q: 'Do you do both small updates and full renovations?',
        a: 'Both. We can update a vanity and fixtures, retile a shower, or demo everything down to the studs and start fresh.',
      },
    ],
  },
  {
    category: 'Flooring & Painting',
    items: [
      {
        q: 'What types of flooring do you install?',
        a: 'Luxury vinyl plank, porcelain tile, ceramic tile, hardwood, and engineered wood. We\'ll recommend the right product for your space and usage.',
      },
      {
        q: 'Do you paint cabinets?',
        a: 'Yes. Cabinet painting is an efficient way to update a kitchen or bathroom without replacing cabinets. We clean, sand, prime, and apply a professional-grade finish.',
      },
    ],
  },
  {
    category: 'Licensing & Service Areas',
    items: [
      {
        q: 'Are you licensed and insured?',
        a: 'Yes. Crafted Kitchen and Bath holds Florida contractor license CRC1333143 and is fully insured.',
      },
      {
        q: 'Do you serve Pinellas County?',
        a: 'Yes — Pinellas County is our primary service area. We serve Oldsmar, Clearwater, Palm Harbor, Safety Harbor, Dunedin, Tarpon Springs, Largo, St. Petersburg, and surrounding areas.',
      },
      {
        q: 'Do you serve Hillsborough County?',
        a: 'Yes. We serve Tampa and surrounding Hillsborough County communities.',
      },
      {
        q: 'Do you help with design and material selection?',
        a: 'Absolutely. We guide you through material selection as part of every project — countertops, tile, cabinetry, flooring, fixtures, and paint.',
      },
    ],
  },
  {
    category: 'Current Promotions',
    items: [
      {
        q: 'Do you offer any discounts or promotions?',
        a: 'Yes. We currently offer up to $3,000 off a full kitchen remodel and up to $2,000 off a full bathroom remodel. Military and first responder discounts are also available. Contact us for current offer details.',
      },
    ],
  },
]

// ─────────────────────────────────────────────
// JSON-LD SCHEMAS
// ─────────────────────────────────────────────
const allFaqsFlat = faqs.flatMap((cat) => cat.items)

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: allFaqsFlat.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://craftedkitchenandbath.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FAQs',
          item: 'https://craftedkitchenandbath.com/faqs',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function FAQsPage() {
  return (
    <div style={{ backgroundColor: '#F7F8FA' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#F7F8FA',
          padding: '120px 24px 96px',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{ marginBottom: '48px' }}
          >
            <ol
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Link>
              </li>
              <li
                aria-hidden="true"
                style={{ color: '#2B7CC1', fontSize: '10px' }}
              >
                /
              </li>
              <li>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#1A202C',
                  }}
                >
                  FAQs
                </span>
              </li>
            </ol>
          </nav>

          {/* Label */}
          <SectionLabel>Common Questions</SectionLabel>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(40px, 6vw, 68px)',
              lineHeight: 1.1,
              color: '#1A202C',
              margin: '28px 0 0',
              letterSpacing: '0.01em',
            }}
          >
            Frequently Asked Questions
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.8,
              color: '#4A5568',
              margin: '24px 0 0',
              maxWidth: '600px',
              letterSpacing: '0.01em',
            }}
          >
            Clear answers to the questions we hear most — about our process,
            our services, our team, and how to get started.
          </p>
        </div>
      </section>

      {/* ── FAQ ACCORDION ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '80px 24px' }}>
        {/*
          Inline styles for the details/summary accordion.
          We use a global <style> block scoped via a data attribute so that:
          - summary::marker is hidden cross-browser
          - details[open] summary .faq-icon shows "−" instead of "+"
        */}
        <style>{`
          details.faq-item summary::-webkit-details-marker { display: none; }
          details.faq-item summary::marker { content: ''; display: none; }
          details.faq-item[open] .faq-icon::after { content: '−'; }
          details.faq-item:not([open]) .faq-icon::after { content: '+'; }
          details.faq-item summary:focus-visible {
            outline: 2px solid #2B7CC1;
            outline-offset: 4px;
          }
        `}</style>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((cat) => (
            <div key={cat.category} style={{ marginBottom: '56px' }}>

              {/* ── Category heading ─────────────────────────────── */}
              <div style={{ marginBottom: '20px' }}>
                <SectionLabel>{cat.category}</SectionLabel>
                <div
                  style={{
                    marginTop: '14px',
                    height: '1px',
                    backgroundColor: '#2B7CC1',
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* ── FAQ items ────────────────────────────────────── */}
              {cat.items.map((item) => (
                <details
                  key={item.q}
                  className="faq-item"
                  style={{
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <summary
                    style={{
                      listStyle: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '22px 0',
                      gap: '16px',
                    }}
                  >
                    {/* Question text */}
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#1A202C',
                        lineHeight: 1.45,
                        letterSpacing: '0.005em',
                      }}
                    >
                      {item.q}
                    </span>

                    {/* Blue +/− indicator */}
                    <span
                      className="faq-icon"
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(43,124,193,0.5)',
                        color: '#2B7CC1',
                        fontSize: '18px',
                        lineHeight: 1,
                        fontWeight: 300,
                        fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      }}
                    />
                  </summary>

                  {/* Answer */}
                  <div
                    style={{
                      fontSize: '15px',
                      color: '#4A5568',
                      lineHeight: 1.8,
                      paddingBottom: '24px',
                      paddingRight: '40px',
                      maxWidth: '680px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <CTASection
        headline="Still Have Questions?"
        subtext="Call us directly at (727) 383-7550 or send a message — we'll get back to you within 24 hours."
        primaryCTA="Send a Message"
        primaryHref="/contact"
        secondaryCTA="Call (727) 383-7550"
        secondaryHref="tel:+17273837550"
      />
    </div>
  )
}
