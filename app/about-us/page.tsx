import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BuildTogetherCTA from "@/components/BuildTogetherCTA";
import CountUp from "@/components/CountUp";
import MissionVision from "@/components/MissionVision";

export const metadata: Metadata = {
  title: "About Crafted Kitchen & Bath | Kitchen & Bathroom Remodeling Experts | Oldsmar FL",
  description:
    "Crafted Kitchen & Bath is Oldsmar's trusted kitchen and bathroom remodeling contractor. Licensed CRC1333143, serving Pinellas and Hillsborough County with 250+ completed home transformations.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Crafted Kitchen and Bath",
  url: "https://craftedkitchenandbath.com",
  telephone: "+17273837550",
  email: "info@craftedkitchenandbath.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "120 Commerce Blvd Suite 4",
    addressLocality: "Oldsmar",
    addressRegion: "FL",
    postalCode: "34677",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.0345,
    longitude: -82.6654,
  },
  description:
    "Licensed remodeling contractor serving Pinellas and Hillsborough County. Specializing in kitchen remodeling, bathroom renovations, flooring, and painting.",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Contractor License",
    identifier: "CRC1333143",
    recognizedBy: {
      "@type": "Organization",
      name: "State of Florida",
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
  priceRange: "$$",
  // NOTE: aggregateRating removed — it conflicted with the homepage count and was
  // not backed by real on-page reviews (Google rich-results policy risk). Restore
  // with genuine, displayed reviews and a count consistent across all pages.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

const differentiators = [
  {
    title: "One-Stop Process",
    body: "From design to final finish, we handle it. No managing multiple contractors, no scheduling confusion.",
  },
  {
    title: "Premium Materials",
    body: "We source quality materials and work with trusted vendors so every result is built to last.",
  },
  {
    title: "Clear Communication",
    body: "We stay in contact through every phase. You always know where your project stands.",
  },
  {
    title: "Satisfaction-Focused",
    body: "We don't close a project until you're fully satisfied with every detail.",
  },
];

const pillars = [
  {
    word: "Craft",
    body: "We approach every project with the precision of artisans and the accountability of professionals.",
  },
  {
    word: "Integrity",
    body: "Fair pricing, transparent timelines, and honest communication — every time.",
  },
  {
    word: "Home",
    body: "Every space we touch belongs to someone who lives there. We never forget that.",
  },
];

const promotions = [
  {
    amount: "Up to $3,000 Off",
    service: "Full Kitchen Remodel",
    detail: "Applied to complete kitchen renovation projects. Ask about eligibility.",
  },
  {
    amount: "Up to $2,000 Off",
    service: "Full Bathroom Remodel",
    detail: "Applied to complete bathroom renovation projects. Ask about eligibility.",
  },
  {
    amount: "Military & First Responder",
    service: "Discounts Available",
    detail: "We proudly offer discounts for active duty, veterans, and first responders.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          paddingTop: "128px",
          paddingBottom: "0",
          minHeight: "70vh",
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
            alignItems: "center",
          }}
          className="lg:!grid-cols-[1fr_520px]"
        >
        {/* Text column */}
        <div
          style={{
            paddingBottom: "96px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Small label */}
          <span
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#2B7CC1",
              fontWeight: 500,
            }}
          >
            About Crafted Kitchen and Bath
          </span>

          {/* Thin accent line */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              margin: "24px 0",
            }}
            aria-hidden="true"
          />

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(44px, 7vw, 80px)",
              lineHeight: 1.1,
              color: "#1A202C",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Built on Craft.
            <br />
            Driven by Care.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.75,
              color: "#4A5568",
              margin: "28px 0 0",
              maxWidth: "560px",
              letterSpacing: "0.01em",
            }}
          >
            We&rsquo;re a licensed remodeling team based in Oldsmar, Florida —
            and we treat every home as if it were our own.
          </p>

          {/* Trust chip */}
          <span
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              marginTop: "32px",
              border: "1px solid rgba(43,124,193,0.4)",
              color: "#2B7CC1",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              padding: "8px 16px",
              fontWeight: 500,
              backgroundColor: "transparent",
            }}
          >
            Licensed &middot; CRC1333143
          </span>
        </div>{/* end text column */}

        {/* Showroom photo column — flush to section bottom/right */}
        <div
          className="hidden lg:block"
          style={{ position: "relative", minHeight: "520px", alignSelf: "stretch" }}
        >
          <Image
            src="/images/wp/IMG_0887-1-scaled.jpg"
            alt="Crafted Kitchen and Bath showroom in Oldsmar FL"
            fill
          sizes="50vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Subtle gradient to blend into section background on left edge */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #F7F8FA 0%, transparent 18%)",
            }}
          />
        </div>
        </div>{/* end grid */}
      </section>

      {/* ── 2. WHO WE ARE ────────────────────────────────────────────── */}
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
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
          }}
          className="lg:!grid-cols-[1fr_320px]"
        >
          {/* Left: copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            {/* Label */}
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Our Story
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              A Complete Solution for Tampa Bay Homeowners
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              Crafted Kitchen and Bath was founded with one goal: to give Tampa
              Bay homeowners a remodeling experience that feels as refined as
              the results. We began as a kitchen and bath specialty team and
              grew into a full-service interior remodeling studio — trusted by
              hundreds of homeowners across Pinellas and Hillsborough County.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              What sets us apart isn&rsquo;t just the craftsmanship — it&rsquo;s
              the approach. We manage the entire project from concept to
              completion, supplying high-quality materials, coordinating every
              trade, and staying in close communication throughout. No hidden
              surprises. Just honest work, done well.
            </p>
          </div>

          {/* Right: stat block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "start",
            }}
          >
            {/* Stat: 250+ */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                padding: "28px 0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(52px, 7vw, 76px)",
                  color: "#2B7CC1",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <CountUp end={250} suffix="+" />
              </div>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#4A5568",
                  marginTop: "10px",
                }}
              >
                Homes Transformed
              </div>
            </div>

            {/* Stat: 100% */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                padding: "28px 0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(52px, 7vw, 76px)",
                  color: "#2B7CC1",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <CountUp end={100} suffix="%" />
              </div>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#4A5568",
                  marginTop: "10px",
                }}
              >
                Client Satisfaction
              </div>
            </div>

            {/* Stat: 5★ */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                padding: "28px 0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(52px, 7vw, 76px)",
                  color: "#2B7CC1",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                <CountUp end={5} suffix={"★"} />
              </div>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#4A5568",
                  marginTop: "10px",
                }}
              >
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LET'S BUILD TOGETHER (moved up for prominence) ──────────── */}
      <BuildTogetherCTA />

      {/* ── MISSION & VISION ────────────────────────────────────────── */}
      <MissionVision />

      {/* ── PROJECT PHOTO STRIP ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            backgroundColor: "rgba(0,0,0,0.06)",
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {[
            { src: "/images/wp/IMG_6133-scaled.jpeg", alt: "Walnut kitchen with quartz waterfall island — Tampa Bay", label: "Kitchen Remodel" },
            { src: "/images/wp/IMG_6061-1-scaled.jpg", alt: "Modern master bathroom with vessel sink and marble shower — Tampa Bay", label: "Bathroom Remodel" },
            { src: "/images/wp/IMG_2580-scaled.jpeg", alt: "Two-tone kitchen with brass pendants — Oldsmar FL", label: "Kitchen Remodel" },
          ].map(({ src, alt, label }) => (
            <div key={src} style={{ position: "relative", height: "320px", overflow: "hidden" }} className="group">
              <Image
                src={src}
                alt={alt}
                fill
          sizes="(max-width: 640px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.7s ease" }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px 14px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.16em", margin: 0 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. WHAT MAKES US DIFFERENT ───────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#EEF0F4",
          padding: "clamp(54px, 11vw, 96px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "56px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "520px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Our Difference
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              What We Do Differently
            </h2>
          </div>

          {/* 4-col grid (2 on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" data-stagger style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
            {differentiators.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                    marginBottom: "24px",
                  }}
                  aria-hidden="true"
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#1A202C",
                    margin: "0 0 16px",
                    lineHeight: 1.3,
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
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MISSION / VALUES ──────────────────────────────────────── */}
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
            gap: "56px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              What We Stand For
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Craft. Integrity. Home.
            </h2>
          </div>

          {/* 3 pillars in a row with vertical dividers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
            className="grid-cols-1 md:!grid-cols-3"
          >
            {pillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "40px 40px",
                  borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 3vw, 28px)",
                    color: "#2B7CC1",
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {pillar.word}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.85,
                    color: "#4A5568",
                    margin: 0,
                    maxWidth: "280px",
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LICENSED & LOCAL ──────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(36px, 7vw, 64px) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="lg:!grid-cols-2"
        >
          {/* Left: copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Licensed, Insured, and Locally Trusted
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              We hold contractor license CRC1333143, are fully insured, and are
              proud members of the Oldsmar community. When you work with Crafted
              Kitchen and Bath, you work with a team that&rsquo;s accountable,
              local, and invested in the quality of work we leave behind.
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

          {/* Right: official-looking license badge card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#EEF0F4",
                border: "1px solid rgba(0,0,0,0.14)",
                padding: "56px 48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                maxWidth: "380px",
                width: "100%",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Corner accents */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  width: "20px",
                  height: "20px",
                  borderTop: "1px solid rgba(43,124,193,0.5)",
                  borderLeft: "1px solid rgba(43,124,193,0.5)",
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "20px",
                  height: "20px",
                  borderTop: "1px solid rgba(43,124,193,0.5)",
                  borderRight: "1px solid rgba(43,124,193,0.5)",
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  width: "20px",
                  height: "20px",
                  borderBottom: "1px solid rgba(43,124,193,0.5)",
                  borderLeft: "1px solid rgba(43,124,193,0.5)",
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "20px",
                  height: "20px",
                  borderBottom: "1px solid rgba(43,124,193,0.5)",
                  borderRight: "1px solid rgba(43,124,193,0.5)",
                }}
                aria-hidden="true"
              />

              {/* Top rule */}
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "#2B7CC1",
                  marginBottom: "12px",
                }}
                aria-hidden="true"
              />

              {/* State label */}
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  margin: 0,
                  fontVariant: "small-caps",
                }}
              >
                State of Florida
              </p>

              {/* License number */}
              <div
                style={{
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 5vw, 44px)",
                  color: "#2B7CC1",
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  margin: "12px 0",
                }}
              >
                CRC1333143
              </div>

              {/* Bottom rule */}
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "#2B7CC1",
                  marginBottom: "12px",
                }}
                aria-hidden="true"
              />

              {/* Caption */}
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  margin: 0,
                }}
              >
                Licensed Remodeling Contractor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROMOTIONS ────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(36px, 7vw, 64px) 24px",
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
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Current Offers
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Special Offers for Tampa Bay Homeowners
            </h2>
          </div>

          {/* Offer cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F7F8FA",
                  borderTop: "2px solid #2B7CC1",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(20px, 3vw, 28px)",
                    color: "#2B7CC1",
                    lineHeight: 1.1,
                    letterSpacing: "0.01em",
                  }}
                >
                  {promo.amount}
                </div>

                <h3
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#1A202C",
                    margin: 0,
                  }}
                >
                  {promo.service}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.75,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {promo.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: "12px",
              color: "#6B7280",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            *Promotions are subject to eligibility requirements and cannot be
            combined with other offers. Contact us for full details.
          </p>
        </div>
      </section>
    </>
  );
}
