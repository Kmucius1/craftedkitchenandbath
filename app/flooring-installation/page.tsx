import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Flooring Installation Oldsmar FL | Luxury Flooring Tampa Bay | Crafted Kitchen & Bath",
  description:
    "Premium flooring installation paired with kitchen and bathroom remodeling across Tampa Bay. LVP, hardwood, porcelain tile, and more. Licensed contractor serving Pinellas & Hillsborough County.",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Flooring Installation",
  description:
    "Professional flooring installation in Oldsmar, Clearwater, Palm Harbor, and across Pinellas County. Luxury vinyl plank, porcelain tile, hardwood, engineered wood.",
  provider: {
    "@type": "LocalBusiness",
    name: "Crafted Kitchen and Bath",
    url: "https://craftedkitchenandbath.com",
    telephone: "+17273837550",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oldsmar",
      addressRegion: "FL",
      addressCountry: "US",
    },
  },
  areaServed: [
    "Oldsmar, FL",
    "Clearwater, FL",
    "Palm Harbor, FL",
    "Safety Harbor, FL",
    "Dunedin, FL",
    "Tarpon Springs, FL",
    "Largo, FL",
    "St. Petersburg, FL",
    "Tampa, FL",
  ],
  serviceType: "Flooring Installation",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://craftedkitchenandbath.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://craftedkitchenandbath.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Flooring Installation",
      item: "https://craftedkitchenandbath.com/flooring-installation",
    },
  ],
};

const flooringTypes = [
  {
    name: "Luxury Vinyl Plank (LVP)",
    swatchColor: "#8B6F4E",
    description:
      "Waterproof, durable, and convincingly realistic. Available in wood and stone looks — ideal for kitchens, baths, and anywhere that sees moisture.",
    idealRooms: "Kitchens, Bathrooms, Basements, Laundry Rooms",
  },
  {
    name: "Porcelain & Ceramic Tile",
    swatchColor: "#D9D1C4",
    description:
      "Hard-wearing, water-resistant, and available in formats from small mosaic to large-format slabs. Great for baths, kitchens, and entryways.",
    idealRooms: "Bathrooms, Kitchens, Entryways, Mudrooms",
  },
  {
    name: "Hardwood & Engineered Wood",
    swatchColor: "#7A5C3E",
    description:
      "Warm, natural, and timeless. Engineered hardwood offers stability in Florida's climate while keeping the look of real wood.",
    idealRooms: "Living Rooms, Dining Rooms, Bedrooms, Hallways",
  },
  {
    name: "Sheet Vinyl",
    swatchColor: "#C5BDB2",
    description:
      "A budget-friendly waterproof option well-suited to utility spaces, laundry rooms, and secondary baths.",
    idealRooms: "Utility Rooms, Laundry, Secondary Baths",
  },
];

const roomScenarios = [
  {
    room: "Kitchens",
    recommendation:
      "Easy-clean tile or water-resistant LVP — both hold up to spills and daily kitchen use.",
  },
  {
    room: "Bathrooms",
    recommendation:
      "Slip-resistant tile or waterproof LVP — moisture performance is non-negotiable.",
  },
  {
    room: "Living & Dining",
    recommendation:
      "Engineered wood or luxury vinyl for warmth underfoot and wide-plank character.",
  },
  {
    room: "Bedrooms",
    recommendation:
      "Wood-look LVP or engineered hardwood — comfortable, quiet, and visually cohesive.",
  },
  {
    room: "Hallways & Entryways",
    recommendation:
      "Durable tile or hardwood — entry points need to hold up and look sharp.",
  },
];

const installationSteps = [
  {
    num: "01",
    title: "Measure & Quote",
    detail:
      "We measure your space accurately and provide a clear, itemized quote before any work begins.",
  },
  {
    num: "02",
    title: "Material Selection",
    detail:
      "We guide you through product options suited to your room, lifestyle, and budget.",
  },
  {
    num: "03",
    title: "Subfloor Prep",
    detail:
      "The subfloor is inspected, leveled, and prepared to ensure a stable, lasting installation.",
  },
  {
    num: "04",
    title: "Installation",
    detail:
      "Flooring is installed with precision — proper layout, transitions, and expansion gaps throughout.",
  },
  {
    num: "05",
    title: "Trim & Transitions",
    detail:
      "All thresholds, transitions, and base molding are fitted and finished cleanly.",
  },
  {
    num: "06",
    title: "Final Walkthrough",
    detail:
      "We walk through the completed installation with you and address any questions before we close out.",
  },
];

const faqs = [
  {
    q: "What's the most durable flooring for kitchens?",
    a: "Luxury vinyl plank or porcelain tile. Both are waterproof and hold up to heavy use. LVP is also softer underfoot.",
  },
  {
    q: "Can you install over existing floors?",
    a: "In some cases, yes. However, we typically recommend removing existing flooring for the best result and longest lifespan.",
  },
];

export default function FlooringInstallationPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── 1. HERO ────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "128px 24px 96px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Oldsmar &amp; Pinellas County
          </p>

          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              margin: "24px 0",
            }}
          />

          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#1A202C",
              lineHeight: 1.18,
              margin: "0 0 28px",
              letterSpacing: "0.01em",
              maxWidth: "780px",
            }}
          >
            Flooring Installation in Oldsmar &amp; Pinellas County
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: "0 0 40px",
              maxWidth: "620px",
              letterSpacing: "0.01em",
            }}
          >
            The right floor unifies a space. We install luxury vinyl plank,
            porcelain tile, and engineered hardwood with precision and a clean,
            lasting finish.
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "#2B7CC1",
              color: "white",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "16px 36px",
            }}
          >
            Get a Flooring Quote
          </Link>
        </div>
      </section>

      {/* ── HERO IMAGE ─────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: '460px', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/wp/IMG_1419-scaled.jpg" alt="Premium flooring installation — white kitchen with wood-look plank floors" fill priority style={{ objectFit: 'cover', objectPosition: 'center bottom' }} />
      </div>

      {/* ── 2. FLOORING TYPES ──────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 500,
              margin: "0 0 48px",
            }}
          >
            Flooring Types
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
              gap: "2px",
            }}
          >
            {flooringTypes.map((type) => (
              <div
                key={type.name}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Color swatch — keeps material color as-is */}
                <div
                  style={{
                    width: "40px",
                    height: "8px",
                    backgroundColor: type.swatchColor,
                    borderRadius: "1px",
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "22px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.25,
                    letterSpacing: "0.01em",
                  }}
                >
                  {type.name}
                </h3>

                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {type.description}
                </p>

                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Ideal for: {type.idealRooms}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ROOM-BY-ROOM ────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "#1A202C",
              margin: "0 0 56px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            The Right Floor for Every Room
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {roomScenarios.map((scenario, i) => (
              <div
                key={i}
                className="spec-row"
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  padding: "28px 0",
                  display: "grid",
                  gap: "32px",
                  alignItems: "start",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#2B7CC1",
                    margin: 0,
                    lineHeight: 1.35,
                    letterSpacing: "0.01em",
                  }}
                >
                  {scenario.room}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {scenario.recommendation}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── 4. INSTALLATION PROCESS ────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 500,
              margin: "0 0 48px",
            }}
          >
            Installation Process
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2px",
            }}
          >
            {installationSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 300,
                    color: "rgba(43,124,193,0.18)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.num}
                </span>

                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LOCAL + FAQ ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 500,
              margin: "0 0 48px",
            }}
          >
            Common Questions
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  padding: "32px 0",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#1A202C",
                    margin: "0 0 14px",
                    lineHeight: 1.35,
                    letterSpacing: "0.01em",
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ───────────────────────────────────────────────── */}
      <CTASection
        headline="Start With the Floor."
        subtext="Professional flooring installation serving Pinellas and Hillsborough County."
      />
    </>
  );
}
