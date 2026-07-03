import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title:
    "Kitchen Remodeling Oldsmar FL | Custom Kitchens Tampa Bay | Crafted Kitchen & Bath",
  description:
    "Expert kitchen remodeling in Oldsmar, Clearwater, Palm Harbor, and across Pinellas & Hillsborough County. Custom cabinetry, quartz countertops, kitchen islands, backsplash tile, and layout redesign. Licensed contractor CRC1333143. Free quote.",
  alternates: {
    canonical: "https://craftedkitchenandbath.com/kitchen-remodeling",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kitchen Remodeling",
  keywords: "kitchen remodeling, custom kitchen cabinets, kitchen countertops, kitchen renovation, kitchen remodel Oldsmar FL",
  provider: {
    "@type": "LocalBusiness",
    name: "Crafted Kitchen and Bath",
    url: "https://craftedkitchenandbath.com",
    telephone: "(727) 383-7550",
    address: {
      "@type": "PostalAddress",
      streetAddress: "120 Commerce Blvd Suite 4",
      addressLocality: "Oldsmar",
      addressRegion: "FL",
      postalCode: "34677",
      addressCountry: "US",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Contractor License",
      identifier: "CRC1333143",
    },
  },
  areaServed: [
    { "@type": "City", name: "Oldsmar" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "Palm Harbor" },
    { "@type": "City", name: "Safety Harbor" },
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "Dunedin" },
    { "@type": "City", name: "Tarpon Springs" },
    { "@type": "City", name: "Largo" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "AdministrativeArea", name: "Pinellas County" },
    { "@type": "AdministrativeArea", name: "Hillsborough County" },
    { "@type": "AdministrativeArea", name: "Tampa Bay" },
  ],
  description:
    "Expert kitchen remodeling in Oldsmar, Clearwater, Palm Harbor, and across Pinellas & Hillsborough County. Custom cabinetry, quartz countertops, kitchen islands, backsplash tile, and layout redesign. Licensed contractor CRC1333143.",
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
      name: "Kitchen Remodeling",
      item: "https://craftedkitchenandbath.com/kitchen-remodeling",
    },
  ],
};

const servicesIncluded = [
  "Custom Cabinetry",
  "Quartz & Stone Countertops",
  "Tile Backsplash",
  "Layout Reconfiguration",
  "Kitchen Lighting",
  "Flooring",
  "Fixtures & Hardware",
  "Painting & Trim",
];

const designStyles = [
  {
    title: "Modern Minimalist",
    description:
      "Clean lines, handle-free cabinetry, waterfall stone islands.",
  },
  {
    title: "Transitional",
    description:
      "Warm wood tones, simple shaker doors, mixed metals.",
  },
  {
    title: "Contemporary",
    description:
      "Open layouts, bold backsplash, integrated appliances.",
  },
  {
    title: "Traditional",
    description:
      "Detailed millwork, deep color palettes, timeless fixtures.",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We visit your home, understand your goals, and assess the current layout.",
  },
  {
    number: "02",
    title: "Design & Material Selection",
    description:
      "We guide you through cabinet styles, countertop materials, tile options, and layout possibilities.",
  },
  {
    number: "03",
    title: "Permitting & Scheduling",
    description:
      "We handle required permits and coordinate a realistic project schedule.",
  },
  {
    number: "04",
    title: "Construction & Installation",
    description:
      "Our licensed team executes the full scope with precision and care.",
  },
  {
    number: "05",
    title: "Walkthrough & Completion",
    description:
      "We walk you through every detail and confirm your satisfaction before we close.",
  },
];

const cities = [
  "Oldsmar",
  "Clearwater",
  "Palm Harbor",
  "Safety Harbor",
  "Dunedin",
  "Tarpon Springs",
  "Largo",
  "St. Petersburg",
  "Tampa",
];

const faqs = [
  {
    question: "How long does a kitchen remodel take?",
    answer:
      "Most kitchen remodels take 4–8 weeks depending on the scope. A full gut renovation with layout changes may take longer. We'll give you a clear timeline at the start.",
  },
  {
    question:
      "Do you handle the full project or do I need to hire separate contractors?",
    answer:
      "We handle the full project — cabinetry, countertops, tile, electrical coordination, plumbing coordination, painting, and flooring. One team, one contract.",
  },
  {
    question: "Do you offer financing or promotional discounts?",
    answer:
      "Yes. We currently offer up to $3,000 off a full kitchen remodel, plus military and first responder discounts. Contact us for details.",
  },
];

export default function KitchenRemodelingPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── BREADCRUMB ───────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "20px 24px 0",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ol
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link
                href="/"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
            </li>
            <li
              style={{ fontSize: "11px", color: "#6B7280" }}
              aria-hidden="true"
            >
              /
            </li>
            <li>
              <Link
                href="/services"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  textDecoration: "none",
                }}
              >
                Services
              </Link>
            </li>
            <li
              style={{ fontSize: "11px", color: "#6B7280" }}
              aria-hidden="true"
            >
              /
            </li>
            <li>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2B7CC1",
                }}
              >
                Kitchen Remodeling
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "60vh",
          backgroundColor: "#F7F8FA",
          display: "flex",
          alignItems: "center",
          padding: "80px 24px 96px",
        }}
      >
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <SectionLabel>Kitchen Remodeling &middot; Pinellas &amp; Hillsborough County</SectionLabel>

          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 1.1,
              color: "#1A202C",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Custom Kitchen Remodeling in Oldsmar &amp; Pinellas County
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 1.7vw, 18px)",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: 0,
              maxWidth: "580px",
              letterSpacing: "0.01em",
            }}
          >
            Your kitchen should work as beautifully as it looks. We design,
            source, and build complete kitchen transformations — from cabinetry
            and countertops to lighting and final finishes.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "8px",
            }}
          >
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
                border: "1px solid #2B7CC1",
              }}
            >
              Get a Free Kitchen Quote
            </Link>
            <Link
              href="tel:+17273837550"
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: "#1A202C",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "16px 36px",
                border: "1px solid rgba(0,0,0,0.25)",
              }}
            >
              Call (727) 383-7550
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: 'clamp(300px, 56vw, 520px)', position: 'relative', overflow: 'hidden' }}>
        <Image
          src="/images/wp/IMG_2580-scaled.jpeg"
          alt="Two-tone custom kitchen remodel in Pinellas County by Crafted Kitchen and Bath"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
        />
      </div>

      {/* ── 2. SERVICES INCLUDED ─────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "520px",
            }}
          >
            <SectionLabel>What We Handle</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Everything Your Kitchen Needs
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "2px",
            }}
          >
            {servicesIncluded.map((service, idx) => (
              <div
                key={service}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "28px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(43,124,193,0.4)",
                    fontWeight: 300,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    width: "1px",
                    height: "28px",
                    backgroundColor: "#2B7CC1",
                    opacity: 0.4,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontSize: "14px",
                    color: "#1A202C",
                    letterSpacing: "0.02em",
                    lineHeight: 1.4,
                  }}
                >
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KITCHEN SECONDARY IMAGE ──────────────────────────────────── */}
      <div style={{ width: '100%', height: 'clamp(280px, 52vw, 460px)', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/wp/IMG_6133-scaled.jpeg" alt="Walnut kitchen with quartz waterfall island by Crafted Kitchen and Bath" fill
          sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 60%' }} />
      </div>

      {/* ── 3. DESIGN STYLES ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(54px, 11vw, 96px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "520px",
            }}
          >
            <SectionLabel>Design Styles We Build</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Every Style. One Standard.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2px",
            }}
          >
            {designStyles.map((style) => (
              <div
                key={style.title}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "40px 32px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderTopWidth: "2px",
                  borderTopColor: "#2B7CC1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {style.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR PROCESS ───────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "520px",
            }}
          >
            <SectionLabel>Our Process</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              From First Visit to Final Walkthrough
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, idx) => (
              <div
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: "32px",
                  alignItems: "start",
                  padding: "36px 0",
                  borderTop: idx === 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* Circle step number */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    border: "1px solid #2B7CC1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      color: "#2B7CC1",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingTop: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: "20px",
                      color: "#1A202C",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color: "#4A5568",
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LOCAL SERVICE CALL-OUT ─────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="lg:grid-cols-2"
        >
          {/* Left: heading + copy */}
          <div>
            <SectionLabel>Where We Work</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(26px, 3.5vw, 40px)",
                color: "#1A202C",
                lineHeight: 1.2,
                letterSpacing: "0.01em",
                margin: "24px 0 20px",
              }}
            >
              Serving Kitchen Remodeling Clients Across Tampa Bay
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: "0 0 32px",
                maxWidth: "520px",
                letterSpacing: "0.01em",
              }}
            >
              Our team serves homeowners across Pinellas and Hillsborough
              County. If you&rsquo;re searching for kitchen remodelers near
              Clearwater, Palm Harbor, or Tampa — we&rsquo;re close by and
              ready to help.
            </p>
            <Link
              href="/areas-of-service"
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#2B7CC1",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              See All Service Areas →
            </Link>
          </div>

          {/* Right: city pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignContent: "flex-start",
            }}
          >
            {cities.map((city) => (
              <span
                key={city}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#4A5568",
                  backgroundColor: "white",
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <SectionLabel>Common Questions</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Kitchen Remodeling FAQs
            </h2>
          </div>

          <div>
            {faqs.map((faq, idx) => (
              <div
                key={faq.question}
                style={{
                  borderTop: idx === 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  padding: "36px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      width: "2px",
                      flexShrink: 0,
                      backgroundColor: "#2B7CC1",
                      alignSelf: "stretch",
                      minHeight: "24px",
                    }}
                    aria-hidden="true"
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: "18px",
                      color: "#1A202C",
                      lineHeight: 1.4,
                      letterSpacing: "0.01em",
                      margin: 0,
                    }}
                  >
                    {faq.question}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: "0 0 0 22px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────────────── */}
      <CTASection
        headline="Ready for a Kitchen That Works?"
        subtext="Licensed kitchen remodeling serving Oldsmar, Clearwater, Palm Harbor, and all of Pinellas and Hillsborough County."
        primaryCTA="Get a Free Kitchen Quote"
        primaryHref="/contact"
        secondaryCTA="Call (727) 383-7550"
        secondaryHref="tel:+17273837550"
      />
    </>
  );
}
