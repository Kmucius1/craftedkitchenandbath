import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Our Remodeling Process | What to Expect",
  description:
    "What to expect when you remodel with Crafted Kitchen & Bath in Tampa Bay — from your free in-home consultation through design, build, and final walkthrough.",
  alternates: { canonical: "https://craftedkitchenandbath.com/process" },
};

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

const steps = [
  { n: "01", title: "Free In-Home Consultation", body: "We come to you — no showroom visit required. We measure your space, learn how you live and use it, and talk through your goals, timeline, and budget. You get honest guidance from the start." },
  { n: "02", title: "Design & Material Selection", body: "We help you choose layouts, cabinetry, countertops, tile, flooring, and finishes, bringing samples to your home so every decision makes sense in your own light. You approve the plan before anything begins." },
  { n: "03", title: "Clear Proposal & Scheduling", body: "You receive a detailed scope and a clear timeline so you know exactly what's included and what to expect. We coordinate permits where required and schedule the work around your life." },
  { n: "04", title: "Craft & Build", body: "Our licensed team handles the whole project in-house — demolition, plumbing and electrical coordination, tile, cabinetry, and finish work — with care for your home and tidy, respectful job sites." },
  { n: "05", title: "Final Walkthrough", body: "We don't call it done until it's right. We walk the finished space with you, address every detail, and make sure you're completely satisfied with the result." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://craftedkitchenandbath.com" },
    { "@type": "ListItem", position: 2, name: "Our Process", item: "https://craftedkitchenandbath.com/process" },
  ],
};

export default function ProcessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ backgroundColor: "#F7F8FA" }}>
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 56px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}><Breadcrumb items={[{ label: "Our Process" }]} /></div>
            <SectionLabel>What to Expect</SectionLabel>
            <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 5vw, 60px)", color: "#1A202C", lineHeight: 1.15, margin: "24px 0 20px" }}>
              Our Remodeling Process
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.8, color: "#4A5568", maxWidth: "600px", margin: 0 }}>
              A remodel should feel exciting, not stressful. Here&apos;s exactly how we work — one team from first conversation to final walkthrough, with clear communication at every step.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(40px, 8vw, 72px) 24px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8px" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "20px", padding: "28px 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <span style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "40px", color: "rgba(43,124,193,0.3)", lineHeight: 1 }}>{s.n}</span>
                <div>
                  <h2 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: "24px", color: "#1A202C", margin: "0 0 10px", lineHeight: 1.25 }}>{s.title}</h2>
                  <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "32px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <Link href="/financing" style={textLink}>Financing options →</Link>
              <Link href="/warranty" style={textLink}>Our workmanship guarantee →</Link>
            </div>
          </div>
        </section>

        <CTASection headline="Ready for Step One?" subtext="Schedule your free in-home consultation. We'll measure, listen, and give you honest guidance — no pressure, no showroom visit required." />
      </div>
    </>
  );
}

const textLink: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "#2B7CC1",
  textDecoration: "none",
  borderBottom: "1px solid rgba(43,124,193,0.4)",
  paddingBottom: "2px",
};
