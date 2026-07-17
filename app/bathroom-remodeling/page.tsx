import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Bathroom Remodeling Oldsmar FL | Spa Bathrooms Tampa Bay | Crafted Kitchen & Bath",
  description:
    "Luxury bathroom remodeling in Oldsmar, Clearwater, Palm Harbor, and across Pinellas County. Custom tile showers, vanities, freestanding tubs, and spa-inspired finishes. Licensed contractor CRC1333143. Free quote.",
  alternates: {
    canonical: "https://craftedkitchenandbath.com/bathroom-remodeling",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bathroom Remodeling",
  keywords: "bathroom remodeling, spa bathroom, custom tile shower, bathroom vanity, bathroom renovation Oldsmar FL",
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
    "Luxury bathroom remodeling in Oldsmar, Clearwater, Palm Harbor, and across Pinellas County. Custom tile showers, vanities, freestanding tubs, and spa-inspired finishes. Licensed contractor CRC1333143.",
  serviceType: "Bathroom Remodeling",
  url: "https://craftedkitchenandbath.com/bathroom-remodeling",
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
      name: "Bathroom Remodeling",
      item: "https://craftedkitchenandbath.com/bathroom-remodeling",
    },
  ],
};

const servicesIncluded = [
  {
    name: "Custom Vanities",
    detail:
      "Built to fit your space — single or double, floating or floor-mounted, with integrated storage and premium hardware.",
  },
  {
    name: "Tile Floors & Walls",
    detail:
      "Precision-set porcelain, ceramic, and natural stone tile in any layout — herringbone, large-format, mosaic, and beyond.",
  },
  {
    name: "Walk-in Showers",
    detail:
      "Custom-built walk-in showers with frameless glass, niche shelving, bench seating, and premium rain or handheld fixtures.",
  },
  {
    name: "Soaking Tubs & Freestanding Tubs",
    detail:
      "Freestanding soaking tubs, alcove installations, and drop-in designs — placed and plumbed to anchor your bathroom.",
  },
  {
    name: "Fixtures & Hardware",
    detail:
      "Coordinated faucets, shower systems, towel bars, and cabinet pulls in matte black, brushed nickel, brass, and chrome.",
  },
  {
    name: "Lighting & Ventilation",
    detail:
      "Vanity lighting, recessed fixtures, and properly spec'd ventilation fans — installed clean and up to code.",
  },
  {
    name: "Flooring",
    detail:
      "Moisture-rated tile, luxury vinyl plank, and stone flooring options installed with precision and long-term durability.",
  },
  {
    name: "Storage & Built-ins",
    detail:
      "Medicine cabinets, linen towers, built-in niche shelving, and custom millwork that keeps every bathroom organized.",
  },
];

const materials = [
  {
    label: "Moisture-Resistant Tile",
    detail: "Porcelain, ceramic, and natural stone rated for wet environments.",
  },
  {
    label: "Quartz & Stone Vanity Tops",
    detail:
      "Durable, non-porous countertop surfaces that hold up in high-use bathrooms.",
  },
  {
    label: "Frameless Shower Glass",
    detail: "Heavy-duty tempered glass panels for a clean, open-format look.",
  },
  {
    label: "Matte & Brushed Fixture Finishes",
    detail:
      "Matte black, brushed nickel, brushed gold, and oil-rubbed bronze available across all fixture lines.",
  },
  {
    label: "Niche Shelving & Custom Storage",
    detail:
      "Recessed wall niches, built-in cabinetry, and floating shelves designed to fit your layout.",
  },
];

const designStyles = [
  {
    name: "Spa-Inspired Calm",
    description:
      "Freestanding tubs, warm neutrals, rain showers, and natural stone surfaces. Designed to feel like a retreat the moment you walk in.",
  },
  {
    name: "Modern & Minimal",
    description:
      "Frameless glass, floating vanities, large-format tile, and a palette of clean whites and cool grays. Zero visual clutter.",
  },
  {
    name: "Transitional",
    description:
      "Shaker-style vanities, classic subway tile, polished chrome or brass fixtures. Timeless enough to stay current for decades.",
  },
  {
    name: "Bold & Layered",
    description:
      "Patterned tile, dark cabinetry, statement lighting, and rich material combinations. For the bathroom that makes an impression.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    detail:
      "We start with a no-pressure conversation about your goals, your existing space, and what you want to feel when you walk in. No commitment required.",
  },
  {
    step: "02",
    title: "Design & Material Planning",
    detail:
      "We help you select tile, vanity style, fixtures, and finishes — guiding every choice so the final result is cohesive and intentional.",
  },
  {
    step: "03",
    title: "Demo & Prep",
    detail:
      "We handle all demolition carefully, protect surrounding areas, and prepare surfaces, plumbing, and substrate before any installation begins.",
  },
  {
    step: "04",
    title: "Installation",
    detail:
      "Tile, vanity, fixtures, shower glass, lighting, and every finish handled by our team and carefully coordinated from start to finish.",
  },
  {
    step: "05",
    title: "Final Walkthrough",
    detail:
      "We walk through every detail with you before we consider the project complete. Your satisfaction signs off on our work.",
  },
];

const citiesServed = [
  "Oldsmar",
  "Clearwater",
  "Palm Harbor",
  "Dunedin",
  "Safety Harbor",
  "Largo",
  "St. Petersburg",
  "Tampa",
  "Westchase",
  "Odessa",
];

const faqs = [
  {
    question: "How long does a bathroom remodel take?",
    answer:
      "A bathroom remodel typically takes 2–5 weeks. Larger projects with layout changes or tile-heavy designs may take longer. We give you a clear timeline before work begins and keep you updated throughout.",
  },
  {
    question: "Can you match my existing home's style?",
    answer:
      "Yes — we offer a wide range of tile, vanity, and fixture options and can help you find materials that complement your home's existing aesthetic. Bring photos, inspiration boards, or just a general direction and we'll take it from there.",
  },
  {
    question:
      "Do you handle both small updates and full gut renovations?",
    answer:
      "Both. We can replace a single vanity or demo and rebuild from the studs up. We'll scope whatever level of work is right for your goals — no project is too targeted or too comprehensive.",
  },
];

export default function BathroomRemodelingPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "14px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ol
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontSize: "12px",
              letterSpacing: "0.06em",
              color: "#4A5568",
            }}
          >
            <li>
              <Link
                href="/"
                style={{
                  color: "#2B7CC1",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: "#6B7280" }}>
              /
            </li>
            <li>
              <Link
                href="/services"
                style={{
                  color: "#2B7CC1",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: "#6B7280" }}>
              /
            </li>
            <li
              aria-current="page"
              style={{
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Bathroom Remodeling
            </li>
          </ol>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "96px 24px 88px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <SectionLabel>Bathroom Remodeling · Pinellas County</SectionLabel>

          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300,
              color: "#1A202C",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "0.01em",
              maxWidth: "820px",
            }}
          >
            Bathroom Remodeling That Feels Like a Retreat
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: 0,
              maxWidth: "620px",
              letterSpacing: "0.01em",
            }}
          >
            We design and build bathrooms that are calm, refined, and made to
            last — custom vanities, natural tile, walk-in showers, and
            moisture-resistant finishes you&rsquo;ll love for years.
          </p>

          <div style={{ marginTop: "8px" }}>
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
              Get a Free Bathroom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <div style={{ width: '100%', height: 'clamp(300px, 56vw, 520px)', position: 'relative', overflow: 'hidden' }}>
        <Image
          src="/images/wp/IMG_6153-scaled.jpeg"
          alt="Luxury master bathroom remodel with glass walk-in shower and dual vanity in Pinellas County by Crafted Kitchen and Bath"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* ── 2. SERVICES INCLUDED ── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "56px",
            }}
          >
            <SectionLabel>What We Handle</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Every Part of Your Bathroom, Done Right
            </h2>
          </div>

          {/* 4-column grid (2 on smaller viewports via auto-fill) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2px",
            }}
          >
            {servicesIncluded.map((service, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  borderTop: "2px solid #2B7CC1",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "18px",
                    fontWeight: 300,
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATHROOM SECONDARY IMAGE ── */}
      <div style={{ width: '100%', height: 'clamp(280px, 52vw, 460px)', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/wp/IMG_6061-1-scaled.jpg" alt="Modern bathroom with vessel sink and marble shower by Crafted Kitchen and Bath" fill
          sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 58%' }} />
      </div>

      {/* ── 3. MATERIALS & FINISHES ── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "56px",
              maxWidth: "560px",
            }}
          >
            <SectionLabel>Materials & Finishes</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Materials Built for Bathrooms
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#4A5568",
                margin: 0,
              }}
            >
              Every material we use is selected for moisture resistance,
              durability, and long-term performance — without sacrificing beauty.
            </p>
          </div>

          {/* Materials list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {materials.map((material, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "32px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  borderLeft: "2px solid #2B7CC1",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "18px",
                    fontWeight: 300,
                    color: "#1A202C",
                    margin: 0,
                    letterSpacing: "0.01em",
                  }}
                >
                  {material.label}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {material.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DESIGN STYLES ── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "56px",
            }}
          >
            <SectionLabel>Design Directions</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Find Your Style
            </h2>
          </div>

          {/* Style grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2px",
            }}
          >
            {designStyles.map((style, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Blue number */}
                <span
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "#2B7CC1",
                    letterSpacing: "0.12em",
                    fontWeight: 300,
                  }}
                >
                  0{i + 1}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "20px",
                    fontWeight: 300,
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {style.name}
                </h3>

                {/* Blue rule */}
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                  }}
                  aria-hidden="true"
                />

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#4A5568",
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

      {/* ── 5. OUR PROCESS ── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "56px",
              maxWidth: "560px",
            }}
          >
            <SectionLabel>How We Work</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Our Process
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#4A5568",
                margin: 0,
              }}
            >
              A clear, managed process from first conversation to final walkthrough — so you always know what to expect.
            </p>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {processSteps.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "36px 36px 36px 44px",
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: "28px",
                  alignItems: "start",
                }}
              >
                {/* Step number */}
                <span
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 300,
                    color: "#2B7CC1",
                    lineHeight: 1,
                    opacity: 0.6,
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </span>

                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      fontSize: "20px",
                      fontWeight: 300,
                      color: "#1A202C",
                      margin: 0,
                      lineHeight: 1.3,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "#4A5568",
                      margin: 0,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LOCAL SEO PARAGRAPH ── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <SectionLabel>Where We Work</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Bathroom Remodeling Across Pinellas and Hillsborough County
            </h2>
          </div>

          {/* Copy */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.9,
              color: "#4A5568",
              margin: "0 0 28px",
              maxWidth: "820px",
              letterSpacing: "0.015em",
            }}
          >
            Crafted Kitchen and Bath serves homeowners throughout Pinellas County
            and Hillsborough County — bringing spa-quality bathroom remodeling to
            communities across Tampa Bay. Whether you&rsquo;re in Oldsmar,
            Clearwater, or Palm Harbor, our team comes to you fully equipped to
            design and build a bathroom that fits your home and your lifestyle.
            We manage every step in-house, from demo to final fixture, so
            nothing falls through the cracks.
          </p>

          {/* City chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {citiesServed.map((city) => (
              <span
                key={city}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#4A5568",
                  border: "1px solid rgba(0,0,0,0.12)",
                  padding: "8px 18px",
                  backgroundColor: "white",
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(54px, 11vw, 96px) 24px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "56px",
            }}
          >
            <SectionLabel>Common Questions</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 300,
                color: "#1A202C",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "36px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  borderLeft: "2px solid rgba(43,124,193,0.4)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontSize: "19px",
                    fontWeight: 300,
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.35,
                    letterSpacing: "0.01em",
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ── */}
      <CTASection
        headline="Your New Bathroom Starts Here."
        subtext="Serving Oldsmar, Clearwater, Palm Harbor, Tampa, and all of Tampa Bay."
      />
    </>
  );
}
