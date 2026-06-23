import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title:
    "Free Kitchen & Bathroom Remodeling Quote | Crafted Kitchen & Bath | Oldsmar FL",
  description:
    "Request a free kitchen or bathroom remodeling consultation in Tampa Bay. We serve Oldsmar, Clearwater, Palm Harbor, Tampa, and all of Pinellas County. Licensed CRC1333143.",
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Crafted Kitchen and Bath",
  url: "https://craftedkitchenandbath.com/contact",
  description:
    "Contact page for Crafted Kitchen and Bath, a licensed remodeling contractor serving Pinellas County and Hillsborough County, FL.",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Crafted Kitchen and Bath",
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
    openingHours: "Mo-Fr 08:00-18:00",
    areaServed: ["Pinellas County, FL", "Hillsborough County, FL"],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 58px)",
              color: "#1A202C",
              lineHeight: 1.18,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Get Your Free Kitchen &amp; Bath Remodeling Quote
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: 0,
              maxWidth: "520px",
            }}
          >
            Tell us about your kitchen or bathroom project &mdash; we&apos;ll respond within 24 hours with a personalized consultation.
          </p>
        </div>
      </section>

      {/* ── CONTACT SPLIT ────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Heading */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                  color: "#1A202C",
                  margin: "0 0 16px",
                  lineHeight: 1.25,
                }}
              >
                Get in Touch
              </h2>
              {/* Accent line */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: "#2B7CC1",
                }}
              />
            </div>

            {/* Contact items */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path
                    d="M3.5 2C3.5 2 2 2 2 3.5C2 5 2.5 8.5 6 12C9.5 15.5 13 16 14.5 16C16 16 16 14.5 16 14.5L14.5 11.5C14.5 11.5 13.5 11 13 11.5L11.5 13C11.5 13 9.5 12 7.5 10C5.5 8 4.5 6 4.5 6L6 4.5C6.5 4 6 3 6 3L3.5 2Z"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="tel:7273837550"
                  style={{
                    color: "#2B7CC1",
                    textDecoration: "none",
                    fontSize: "17px",
                    letterSpacing: "0.02em",
                    fontWeight: 500,
                  }}
                >
                  (727) 383-7550
                </a>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <rect
                    x="2"
                    y="4"
                    width="14"
                    height="10"
                    rx="1.5"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M2 5.5L9 10.5L16 5.5"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
                <a
                  href="mailto:info@craftedkitchenandbath.com"
                  style={{
                    color: "#4A5568",
                    textDecoration: "none",
                    fontSize: "14px",
                    letterSpacing: "0.01em",
                    wordBreak: "break-all",
                  }}
                >
                  info@craftedkitchenandbath.com
                </a>
              </div>

              {/* Address */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path
                    d="M9 2C6.239 2 4 4.239 4 7C4 10.5 9 16 9 16C9 16 14 10.5 14 7C14 4.239 11.761 2 9 2Z"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="7" r="1.5" stroke="#2B7CC1" strokeWidth="1.25" />
                </svg>
                <address
                  style={{
                    fontStyle: "normal",
                    color: "#4A5568",
                    fontSize: "14px",
                    lineHeight: 1.75,
                  }}
                >
                  120 Commerce Blvd Suite 4
                  <br />
                  Oldsmar, FL 34677
                </address>
              </div>

              {/* License */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path
                    d="M9 2L3 5V9C3 12.314 5.686 15.314 9 16C12.314 15.314 15 12.314 15 9V5L9 2Z"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.5 9L8.5 11L11.5 7"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ color: "#4A5568", fontSize: "14px" }}>
                  License: CRC1333143
                </span>
              </div>

              {/* Areas */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <circle cx="9" cy="9" r="7" stroke="#2B7CC1" strokeWidth="1.25" />
                  <path
                    d="M2 9H16M9 2C9 2 6.5 5 6.5 9C6.5 13 9 16 9 16C9 16 11.5 13 11.5 9C11.5 5 9 2 9 2Z"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ color: "#4A5568", fontSize: "14px" }}>
                  Pinellas County · Hillsborough County
                </span>
              </div>

              {/* Hours */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <circle cx="9" cy="9" r="7" stroke="#2B7CC1" strokeWidth="1.25" />
                  <path
                    d="M9 5V9L11.5 11"
                    stroke="#2B7CC1"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <span
                    style={{
                      color: "#4A5568",
                      fontSize: "14px",
                      display: "block",
                    }}
                  >
                    Monday – Friday, 8am – 6pm
                  </span>
                  <span
                    style={{
                      color: "#9CA3AF",
                      fontSize: "13px",
                      fontStyle: "italic",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    We typically respond within 24 hours.
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps card */}
            <div
              style={{
                backgroundColor: "#F7F8FA",
                border: "1px solid rgba(0,0,0,0.08)",
                padding: "24px",
                marginTop: "8px",
              }}
            >
              <address
                style={{
                  fontStyle: "normal",
                  color: "#4A5568",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  marginBottom: "16px",
                  display: "block",
                }}
              >
                <strong
                  style={{
                    color: "#1A202C",
                    fontWeight: 500,
                    display: "block",
                  }}
                >
                  Crafted Kitchen and Bath
                </strong>
                120 Commerce Blvd Suite 4
                <br />
                Oldsmar, FL 34677
              </address>
              <a
                href="https://maps.google.com/?q=120+Commerce+Blvd+Suite+4+Oldsmar+FL+34677"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#2B7CC1",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.5vw, 30px)",
                color: "#1A202C",
                margin: "0 0 16px",
                lineHeight: 1.25,
              }}
            >
              Send a Message
            </h2>
            {/* Accent line */}
            <div
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#2B7CC1",
                marginBottom: "36px",
              }}
            />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── TRUST ROW ────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#EEF0F4",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {[
            "Licensed Contractor · CRC1333143",
            "250+ Homes Transformed",
            "5-Star Rated · Tampa Bay",
          ].map((item) => (
            <p
              key={item}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9CA3AF",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Transform Your Space?"
        subtext="Our team serves homeowners across Pinellas County and Hillsborough County with white-glove remodeling service from consultation to completion."
        primaryCTA="Call (727) 383-7550"
        primaryHref="tel:7273837550"
        secondaryCTA="Explore Our Work"
        secondaryHref="/our-work"
      />
    </>
  );
}
