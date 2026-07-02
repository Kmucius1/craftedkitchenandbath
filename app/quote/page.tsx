import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title:
    "Get a Free Remodeling Quote | Project Questionnaire | Crafted Kitchen & Bath",
  description:
    "Answer a few quick questions about your kitchen, bathroom, or whole-home remodel and get a personalized consultation from Crafted Kitchen & Bath. Serving Tampa Bay. Licensed CRC1333143.",
  alternates: { canonical: "https://craftedkitchenandbath.com/quote" },
};

const trust = [
  "Licensed Contractor · CRC1333143",
  "250+ Homes Transformed",
  "Free In-Home Consultation",
];

export default function QuotePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(116px, 17vw, 140px) 24px clamp(40px, 8vw, 64px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2B7CC1",
              fontWeight: 600,
              margin: "0 0 18px",
            }}
          >
            Free Project Quote
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 7vw, 56px)",
              color: "#1A202C",
              lineHeight: 1.18,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Let&apos;s Scope Your Project
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#4A5568",
              margin: "24px auto 0",
              maxWidth: "540px",
            }}
          >
            Answer a few quick questions about your space and goals. It takes about two minutes and helps us prepare a tailored, no-pressure consultation — usually within 24 hours.
          </p>
        </div>
      </section>

      {/* ── WIZARD ───────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F1F3F6",
          padding: "clamp(28px, 5vw, 56px) 24px clamp(48px, 8vw, 80px)",
        }}
      >
        <QuoteWizard />
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
          className="row-3"
          style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gap: "24px", textAlign: "center" }}
        >
          {trust.map((item) => (
            <p
              key={item}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B7280",
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
        headline="Prefer to Talk It Through?"
        subtext="Skip the form and reach our team directly — we're happy to answer questions before you commit to anything."
        primaryCTA="Call (727) 383-7550"
        primaryHref="tel:+17273837550"
        secondaryCTA="Explore Our Work"
        secondaryHref="/our-work"
      />
    </>
  );
}
