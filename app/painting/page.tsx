import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Interior Painting Oldsmar FL | Whole-Home Paint Services | Crafted Kitchen & Bath",
  description:
    "Expert interior painting services to complement your kitchen or bathroom remodel. Clean, crisp finishes across Pinellas and Hillsborough County. Licensed contractor. Free quote.",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Interior Painting Services",
  description:
    "Professional interior painting in Oldsmar, Clearwater, Palm Harbor, and across Pinellas County. Walls, trim, cabinets. Expert prep and premium finishes.",
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
  serviceType: "Interior Painting",
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
      name: "Painting",
      item: "https://craftedkitchenandbath.com/painting",
    },
  ],
};

const whatWePaint = [
  {
    name: "Interior Walls & Ceilings",
    description:
      "Full room painting with careful edging, even coverage, and premium finish.",
  },
  {
    name: "Trim, Baseboards & Molding",
    description:
      "Clean, precise painting of all trim elements that frames a room properly.",
  },
  {
    name: "Cabinet Painting & Refinishing",
    description:
      "Transform kitchen or bath cabinets without replacement — prep, prime, finish.",
  },
  {
    name: "Interior Doors & Frames",
    description:
      "Often overlooked, always noticed — we paint doors and frames to a clean standard.",
  },
  {
    name: "Accent Walls",
    description:
      "Strategic color placement to define spaces and add visual depth.",
  },
  {
    name: "New Construction & Remodel Painting",
    description:
      "Full painting scopes for remodeling projects, coordinated with our build team.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Surface Prep",
    detail:
      "Sanding, filling holes, priming, taping, and protecting all surfaces.",
  },
  {
    num: "02",
    title: "Premium Materials",
    detail:
      "We use quality paints that cover evenly and wear well over time.",
  },
  {
    num: "03",
    title: "Precision Application",
    detail:
      "Edges, corners, and cuts done with care — no slop, no mess.",
  },
  {
    num: "04",
    title: "Cleanup & Review",
    detail:
      "We leave the space clean and do a full walkthrough with you.",
  },
];

const faqs = [
  {
    q: "Do you handle prep work?",
    a: "Yes — all surface prep, sanding, filling, and priming is included. We don't cut corners before we cut in edges.",
  },
  {
    q: "Can you paint cabinets without replacing them?",
    a: "Absolutely. Cabinet painting is a cost-effective way to update your kitchen or bathroom with professional results.",
  },
];

export default function PaintingPage() {
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
          padding: "clamp(112px, 16vw, 128px) 24px clamp(54px, 11vw, 96px)",
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
            Interior Painting Done Right — Oldsmar &amp; Pinellas County
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
            Paint is the finish that holds a remodel together. We deliver clean
            lines, expert prep, and coats that last — for walls, ceilings, trim,
            and cabinetry.
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
            Get a Painting Quote
          </Link>
        </div>
      </section>

      {/* ── HERO IMAGE ─────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: 'clamp(280px, 52vw, 460px)', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/wp/painting.jpg" alt="Professional interior painting services by Crafted Kitchen and Bath" fill priority style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
      </div>

      {/* ── 2. WHAT WE PAINT ───────────────────────────────────────────── */}
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
            What We Paint
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "2px",
            }}
          >
            {whatWePaint.map((item) => (
              <div
                key={item.name}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Blue dot accent */}
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#2B7CC1",
                    flexShrink: 0,
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
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. OUR PROCESS ─────────────────────────────────────────────── */}
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
            Our Process
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "32px",
            }}
          >
            {processSteps.map((step) => (
              <div
                key={step.num}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <span
                  style={{
                    fontSize: "40px",
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
                    fontSize: "14px",
                    lineHeight: 1.8,
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

      {/* ── 4. COLOR GUIDANCE ──────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "48px 24px 56px",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(24px, 3vw, 40px)",
              color: "#1A202C",
              margin: "0 0 24px",
              lineHeight: 1.25,
              letterSpacing: "0.01em",
            }}
          >
            Finding the Right Finish
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "#4A5568",
              margin: "0 0 20px",
              letterSpacing: "0.01em",
            }}
          >
            Sheen matters as much as color. Matte and flat finishes hide surface
            imperfections and suit low-traffic areas like bedrooms. Eggshell and
            satin offer a soft luster with improved washability — the right call
            for hallways and living rooms. Semi-gloss is most durable and
            moisture-resistant, which is why it belongs on trim, baseboards, and
            cabinetry.
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "#4A5568",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            In kitchens and bathrooms — where steam, grease, and cleaning
            products are constants — we always recommend a more durable finish
            that cleans easily and resists wear. We help you select the right
            sheen for each surface before a drop of paint goes on the wall.
          </p>
        </div>
      </section>

      {/* ── 5. CABINET PAINTING CALLOUT ────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              marginBottom: "32px",
            }}
          />

          <h2
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(26px, 3.5vw, 44px)",
              color: "#1A202C",
              margin: "0 0 24px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            Cabinet Painting &amp; Refinishing
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "#4A5568",
              margin: "0 0 20px",
              letterSpacing: "0.01em",
            }}
          >
            Restore or transform existing cabinets without full replacement. We
            clean, sand, prime, and apply a professional-grade finish — spray or
            brush — that holds up to kitchen and bath use.
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.85,
              color: "#1A202C",
              margin: "0 0 36px",
              letterSpacing: "0.01em",
              fontWeight: 500,
            }}
          >
            A cost-effective way to dramatically update a kitchen or bathroom.
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "#1A202C",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "14px 32px",
              border: "1px solid rgba(0,0,0,0.25)",
            }}
          >
            Ask About Cabinet Painting
          </Link>
        </div>
      </section>

      {/* ── 6. LOCAL + FAQ ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
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

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
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

      {/* ── 7. FINAL CTA ───────────────────────────────────────────────── */}
      <CTASection
        headline="A Fresh Coat Changes Everything."
        subtext="Professional painting services in Oldsmar and across Pinellas and Hillsborough County."
      />
    </>
  );
}
