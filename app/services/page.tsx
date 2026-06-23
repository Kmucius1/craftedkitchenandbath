import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Remodeling Services in Pinellas & Hillsborough County | Crafted Kitchen and Bath",
  description:
    "Crafted Kitchen and Bath offers kitchen remodeling, bathroom renovations, flooring installation, painting, and full interior transformations across Pinellas and Hillsborough County, FL.",
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
  ],
};

const services = [
  {
    num: "01",
    name: "Kitchen Remodeling",
    href: "/kitchen-remodeling",
    description:
      "Custom cabinetry, countertops, backsplash, lighting, and layout — all designed and built by our team.",
  },
  {
    num: "02",
    name: "Bathroom Remodeling",
    href: "/bathroom-remodeling",
    description:
      "Vanities, tile, showers, soaking tubs, fixtures, and spa-quality finishes that transform your daily routine.",
  },
  {
    num: "03",
    name: "Complete Interior Remodeling",
    href: "/complete-interior-home-remodeling",
    description:
      "When you're ready for a whole-home refresh, we coordinate it all — one team, one clear timeline.",
  },
  {
    num: "04",
    name: "Flooring Installation",
    href: "/flooring-installation",
    description:
      "Luxury vinyl plank, porcelain tile, hardwood, and engineered wood — installed with precision and lasting care.",
  },
  {
    num: "05",
    name: "Painting",
    href: "/painting",
    description:
      "Interior painting from walls to cabinetry. Expert prep, premium paints, and finishes that hold up to real life.",
  },
  {
    num: "06",
    name: "Countertops & Cabinetry",
    href: "/services",
    description:
      "Premium stone countertops and custom cabinetry are available across all remodeling projects.",
  },
];

const whyPoints = [
  {
    title: "No Subcontractor Chaos",
    detail: "We manage the entire project in-house — no hand-offs, no gaps.",
  },
  {
    title: "Materials Sourced and Supplied",
    detail:
      "We handle procurement so you're not chasing vendors or waiting on deliveries.",
  },
  {
    title: "One Point of Contact",
    detail: "Clear communication from your first consultation through final walkthrough.",
  },
];

const promotions = [
  {
    amount: "Up to $3,000 Off",
    service: "Full Kitchen Remodel",
  },
  {
    amount: "Up to $2,000 Off",
    service: "Full Bathroom Remodel",
  },
  {
    amount: "Military & First Responder",
    service: "Discounts Available",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "128px 24px 96px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Label */}
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
            Pinellas County · Hillsborough County
          </p>

          {/* Thin accent line */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              margin: "24px 0",
            }}
          />

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#1A202C",
              lineHeight: 1.18,
              margin: "0 0 28px",
              letterSpacing: "0.01em",
              maxWidth: "780px",
            }}
          >
            Complete Remodeling Services in Tampa Bay
          </h1>

          {/* Subtext */}
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
            From a single bathroom upgrade to a full interior transformation —
            Crafted Kitchen and Bath manages every detail, every step of the way.
          </p>
        </div>
      </section>

      {/* ── LOCAL SEO INTRO ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.9,
              color: "#4A5568",
              margin: 0,
              letterSpacing: "0.015em",
            }}
          >
            As a licensed remodeling contractor serving Pinellas County and
            Hillsborough County, we specialize in transforming kitchens,
            bathrooms, and interior living spaces for homeowners across the Tampa
            Bay area. Whether you&rsquo;re in Oldsmar, Clearwater, Palm Harbor,
            or Tampa — our team brings precision craftsmanship and premium
            materials directly to your home.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2px",
            }}
          >
            {services.map((service) => (
              <div
                key={service.num}
                style={{
                  backgroundColor: "#F7F8FA",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: "40px",
                    color: "rgba(43,124,193,0.18)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {service.num}
                </span>

                {/* Accent line */}
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                    margin: "16px 0",
                  }}
                />

                {/* Service name */}
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {service.name}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: "8px 0 0",
                    flex: 1,
                  }}
                >
                  {service.description}
                </p>

                {/* Explore link */}
                <Link
                  href={service.href}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    textDecoration: "none",
                    marginTop: "24px",
                    display: "inline-block",
                    fontWeight: 500,
                  }}
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE TEAM. EVERY TRADE. ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#EEF0F4",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "#1A202C",
              margin: "0 0 48px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            One Team. Every Trade.
          </h2>

          {/* Three border-left items */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {whyPoints.map((point) => (
              <div
                key={point.title}
                style={{
                  borderLeft: "2px solid #2B7CC1",
                  paddingLeft: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#1A202C",
                    margin: "0 0 10px",
                    lineHeight: 1.35,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMOTIONS ───────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "48px 24px 56px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Label */}
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 500,
              margin: "0 0 36px",
            }}
          >
            Current Offers
          </p>

          {/* Promo cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2px",
              marginBottom: "32px",
            }}
          >
            {promotions.map((promo) => (
              <div
                key={promo.amount}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "32px 28px",
                  borderTop: "2px solid #2B7CC1",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    color: "#2B7CC1",
                    display: "block",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                    marginBottom: "8px",
                  }}
                >
                  {promo.amount}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#4A5568",
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                  }}
                >
                  {promo.service}
                </span>
              </div>
            ))}
          </div>

          {/* Fine print / CTA note */}
          <p
            style={{
              fontSize: "13px",
              color: "#9CA3AF",
              lineHeight: 1.7,
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            Contact us for details. Offers subject to change. Cannot be combined
            with other promotions.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <CTASection />
    </>
  );
}
