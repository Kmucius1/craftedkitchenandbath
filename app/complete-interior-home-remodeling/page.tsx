import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Complete Interior Remodeling Tampa Bay | Kitchen & Bath Specialists | Crafted Kitchen & Bath",
  description:
    "Full-home interior remodeling starting with kitchen and bathroom transformations. One licensed team handles kitchens, bathrooms, flooring, and paint across Pinellas & Hillsborough County. Free consultation.",
};

// ── JSON-LD ──────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Complete Interior Home Remodeling",
  description:
    "Full-home interior remodeling across Pinellas and Hillsborough County. Crafted Kitchen and Bath coordinates kitchens, bathrooms, flooring, painting, drywall, trim, and layout changes — all under one licensed team.",
  provider: {
    "@type": "LocalBusiness",
    name: "Crafted Kitchen and Bath",
    url: "https://craftedkitchenandbath.com",
    telephone: "+17273837550",
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
    "Pinellas County",
    "Hillsborough County",
    "Oldsmar",
    "Clearwater",
    "Tampa",
    "Palm Harbor",
    "Safety Harbor",
    "Dunedin",
    "St. Petersburg",
    "Tarpon Springs",
    "Largo",
  ],
  serviceType: "Interior Home Remodeling",
  url: "https://craftedkitchenandbath.com/complete-interior-home-remodeling",
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
      name: "Complete Interior Home Remodeling",
      item: "https://craftedkitchenandbath.com/complete-interior-home-remodeling",
    },
  ],
};

// ── DATA ─────────────────────────────────────────────────────────────────────

const scopes = [
  {
    num: "01",
    name: "Kitchen Renovation",
    detail:
      "Custom cabinetry, countertops, backsplash, lighting, and full layout updates.",
  },
  {
    num: "02",
    name: "Bathroom Renovations",
    detail:
      "Multiple baths handled in sequence — tile, vanities, showers, fixtures, and finishes.",
  },
  {
    num: "03",
    name: "Flooring Throughout",
    detail:
      "LVP, porcelain tile, hardwood, and engineered wood installed across every room.",
  },
  {
    num: "04",
    name: "Interior Painting",
    detail:
      "Walls, ceilings, cabinetry, and trim — properly prepped and finished to last.",
  },
  {
    num: "05",
    name: "Drywall Repair & Refinishing",
    detail:
      "Patching, skim coating, and smooth-finish prep before any paint or texture goes on.",
  },
  {
    num: "06",
    name: "Trim, Baseboards & Molding",
    detail:
      "Crown molding, base trim, door casings, and built-up profiles installed with precision.",
  },
  {
    num: "07",
    name: "Layout Changes & Space Planning",
    detail:
      "Non-structural wall moves, niche creation, and reconfigured flow across rooms.",
  },
  {
    num: "08",
    name: "Lighting Updates",
    detail:
      "Recessed lighting, fixture swaps, under-cabinet lighting, and switch relocation.",
  },
  {
    num: "09",
    name: "Interior Doors & Hardware",
    detail:
      "New door slabs, frames, hinges, handles, and locksets across the entire home.",
  },
  {
    num: "10",
    name: "Cabinetry & Built-ins",
    detail:
      "Custom and semi-custom cabinetry, pantry builds, and storage solutions in any room.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    detail:
      "We assess the full scope across every space — priorities, budget range, and timeline expectations.",
  },
  {
    step: "02",
    title: "Project Plan",
    detail:
      "We create a phased schedule that sequences trades correctly and keeps disruption minimal.",
  },
  {
    step: "03",
    title: "Execution",
    detail:
      "We coordinate all trades in the right order — no overlap, no gaps, no hand-off confusion.",
  },
  {
    step: "04",
    title: "Quality Control",
    detail:
      "Every room is reviewed in detail before we move to the next phase of the project.",
  },
  {
    step: "05",
    title: "Delivery",
    detail:
      "Full walkthrough and sign-off with you. We don't close the project until you're satisfied.",
  },
];

const livingSpaces = [
  "Living Rooms",
  "Dining Rooms",
  "Hallways",
  "Bedrooms",
  "Bonus Rooms",
];

const livingUpdates = [
  "Flooring replacement",
  "Paint refresh",
  "Drywall repair",
  "Trim updates",
  "Lighting",
];

const faqs = [
  {
    q: "How long does a whole-home remodel take?",
    a: "This depends on scope. A multi-room project may take 8–16 weeks. We'll provide a clear timeline after our initial assessment.",
  },
  {
    q: "Can we still live in the home during the remodel?",
    a: "In most cases, yes — we sequence work to minimize disruption. For very large projects, we'll be upfront about timing.",
  },
  {
    q: "Do you handle permits?",
    a: "Yes. We handle all required permitting for your project.",
  },
];

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function CompleteInteriorRemodelingPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "16px 24px 0",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ol
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "6px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "#6B7280",
            }}
          >
            <li>
              <Link
                href="/"
                style={{ color: "#6B7280", textDecoration: "none" }}
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
                style={{ color: "#6B7280", textDecoration: "none" }}
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: "#6B7280" }}>
              /
            </li>
            <li style={{ color: "#2B7CC1" }} aria-current="page">
              Complete Interior Home Remodeling
            </li>
          </ol>
        </div>
      </nav>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "112px 24px 96px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionLabel>Pinellas County &middot; Hillsborough County</SectionLabel>

          {/* Thin blue line */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              margin: "24px 0",
            }}
            aria-hidden="true"
          />

          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5.5vw, 68px)",
              color: "#1A202C",
              lineHeight: 1.12,
              margin: "0 0 28px",
              letterSpacing: "0.01em",
              maxWidth: "800px",
            }}
          >
            Full Interior Remodeling — One Team, One Project
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: 0,
              maxWidth: "620px",
              letterSpacing: "0.01em",
            }}
          >
            When your whole home needs attention, we bring it together. From
            kitchen and bath to living spaces, flooring, painting, and trim —
            we manage every trade so you don&rsquo;t have to.
          </p>

          {/* Trust chip */}
          <span
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              marginTop: "36px",
              border: "1px solid rgba(43,124,193,0.4)",
              color: "#2B7CC1",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              padding: "8px 16px",
              fontWeight: 500,
            }}
          >
            Licensed &middot; CRC1333143
          </span>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: 'clamp(300px, 56vw, 520px)', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/wp/IMG_6140-scaled.jpeg" alt="Complete interior home remodeling — open kitchen and dining room transformation" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </div>

      {/* ── 2. SCOPE OF WORK ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "56px",
            }}
          >
            <SectionLabel>Scope of Work</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 46px)",
                color: "#1A202C",
                lineHeight: 1.18,
                margin: 0,
                letterSpacing: "0.01em",
                maxWidth: "560px",
              }}
            >
              What a Full Interior Remodel Includes
            </h2>
          </div>

          {/* Scopes grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "2px",
            }}
          >
            {scopes.map((scope) => (
              <div
                key={scope.num}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: "36px",
                    color: "rgba(43,124,193,0.18)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {scope.num}
                </span>

                {/* Blue accent */}
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                  }}
                  aria-hidden="true"
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {scope.name}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {scope.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "60px",
            }}
          >
            <SectionLabel>Our Process</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 46px)",
                color: "#1A202C",
                lineHeight: 1.18,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Whole-Home Process, Step by Step
            </h2>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "32px",
                  alignItems: "flex-start",
                  padding: "32px 0",
                  borderTop:
                    i === 0
                      ? "none"
                      : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* Step number column */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                      fontWeight: 300,
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      color: "#2B7CC1",
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  {/* Vertical connector line */}
                  {i < processSteps.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        height: "100%",
                        minHeight: "32px",
                        backgroundColor: "rgba(43,124,193,0.18)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content column */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingBottom: "8px",
                  }}
                >
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
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY ONE CONTRACTOR ────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="lg:!grid-cols-[1fr_420px]"
        >
          {/* Left: headline + copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            <SectionLabel>The Single-Team Advantage</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#1A202C",
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              No Juggling Contractors. No Gaps.
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#4A5568",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Managing multiple contractors for a whole-home project leads to
              communication gaps, scheduling conflicts, and missed details. With
              Crafted Kitchen and Bath, one team manages every trade —
              cabinetry, tile, painting, flooring — with a single point of
              contact and a clear timeline from start to finish.
            </p>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: "10px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#2B7CC1",
                textDecoration: "none",
                borderBottom: "1px solid rgba(43,124,193,0.4)",
                paddingBottom: "2px",
              }}
            >
              Schedule a Free Consultation
            </Link>
          </div>

          {/* Right: three differentiator chips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {[
              {
                title: "One Point of Contact",
                body: "You always know who to call. No passing the buck between trades.",
              },
              {
                title: "Sequenced Scheduling",
                body: "We plan every phase in the right order — no rework, no waiting on other crews.",
              },
              {
                title: "Accountability at Every Step",
                body: "Because we own the whole project, every detail is our responsibility.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  borderBottom:
                    i === 2
                      ? "1px solid rgba(0,0,0,0.08)"
                      : "none",
                  padding: "28px 0 28px 24px",
                  borderLeft: "2px solid #2B7CC1",
                  marginLeft: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
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
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LIVING SPACES ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "56px",
              alignItems: "start",
            }}
            className="lg:!grid-cols-2"
          >
            {/* Left: header + spaces list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <SectionLabel>Beyond Kitchen &amp; Bath</SectionLabel>

              <h2
                style={{
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(26px, 3.5vw, 42px)",
                  color: "#1A202C",
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                Every Room in the Home
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "#4A5568",
                  margin: 0,
                }}
              >
                A complete interior transformation doesn&rsquo;t stop at the
                kitchen and bath. We extend our work into every living space,
                delivering the same standard of craft from the entryway to the
                back bedroom.
              </p>

              {/* Spaces */}
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    fontWeight: 500,
                    margin: "0 0 16px",
                  }}
                >
                  Spaces We Update
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {livingSpaces.map((space) => (
                    <li
                      key={space}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "15px",
                        color: "#1A202C",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "1px",
                          backgroundColor: "#2B7CC1",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      {space}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: updates list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                paddingTop: "4px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    fontWeight: 500,
                    margin: "0 0 16px",
                  }}
                >
                  Delivered Through
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                  }}
                >
                  {livingUpdates.map((update, i) => (
                    <li
                      key={update}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        fontSize: "15px",
                        color: "#4A5568",
                        lineHeight: 1.5,
                        padding: "18px 0",
                        borderTop:
                          i === 0 ? "none" : "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                          fontSize: "10px",
                          color: "rgba(43,124,193,0.5)",
                          letterSpacing: "0.1em",
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {update}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. LOCAL CONTEXT ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(36px, 7vw, 64px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Top blue line */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
            }}
            aria-hidden="true"
          />

          <h2
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(22px, 3vw, 36px)",
              color: "#1A202C",
              lineHeight: 1.3,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Serving Pinellas &amp; Hillsborough County Homeowners
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.9,
              color: "#4A5568",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            We serve homeowners across the Tampa Bay area — including Clearwater,
            Palm Harbor, Dunedin, Safety Harbor, Oldsmar, Tampa, St. Petersburg,
            Tarpon Springs, and Largo. Whether you&rsquo;re in the heart of
            Pinellas County or across the bay in Hillsborough, our team brings
            the same level of craft and coordination to your complete interior
            transformation.
          </p>

          {/* Licensed chip */}
          <span
            style={{
              display: "inline-flex",
              border: "1px solid rgba(43,124,193,0.35)",
              color: "#2B7CC1",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              padding: "8px 20px",
              fontWeight: 500,
              marginTop: "8px",
            }}
          >
            Licensed &middot; Insured &middot; Local
          </span>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(44px, 9vw, 80px) 24px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "56px",
            }}
          >
            <SectionLabel>Common Questions</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#1A202C",
                lineHeight: 1.18,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  padding: "36px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "16px",
                }}
                className="md:!grid-cols-[2fr_3fr]"
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.4,
                    letterSpacing: "0.01em",
                    paddingRight: "24px",
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
            {/* Bottom border */}
            <div
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Transform Your Entire Home?"
        subtext="Schedule a complimentary consultation with our team. We serve homeowners across Pinellas and Hillsborough County — one team, one clear timeline."
        primaryCTA="Get a Free Quote"
        primaryHref="/contact"
        secondaryCTA="Call (727) 383-7550"
        secondaryHref="tel:+17273837550"
      />
    </>
  );
}
