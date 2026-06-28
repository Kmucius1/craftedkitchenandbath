import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Remodeling Financing | Crafted Kitchen & Bath",
  description:
    "Make your Tampa Bay kitchen or bath remodel affordable. Ask Crafted Kitchen & Bath about financing options when you request your free in-home estimate.",
  alternates: { canonical: "https://craftedkitchenandbath.com/financing" },
};

const headingFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const points = [
  { title: "Spread the Cost", body: "A remodel is an investment in your home and your daily life. Financing lets you move forward now and pay over time, rather than waiting or compromising on the result you really want." },
  { title: "Keep Your Savings Intact", body: "Many homeowners prefer to preserve their cash reserves and fund the project monthly instead — especially for larger kitchen, bath, or whole-interior remodels." },
  { title: "One Conversation", body: "When we meet for your free in-home consultation, we're glad to talk through options and help you find an approach that fits your budget and goals." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://craftedkitchenandbath.com" },
    { "@type": "ListItem", position: 2, name: "Financing", item: "https://craftedkitchenandbath.com/financing" },
  ],
};

export default function FinancingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ backgroundColor: "#F7F8FA" }}>
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 56px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}><Breadcrumb items={[{ label: "Financing" }]} /></div>
            <SectionLabel>Affordable Remodeling</SectionLabel>
            <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 5vw, 60px)", color: "#1A202C", lineHeight: 1.15, margin: "24px 0 20px" }}>
              Financing Your Remodel
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.8, color: "#4A5568", maxWidth: "600px", margin: 0 }}>
              The kitchen or bath you want shouldn&apos;t have to wait. We&apos;re happy to help you explore financing so you can move forward with a project you&apos;ll love for years.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "#FFFFFF", padding: "72px 24px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
              {points.map((p) => (
                <div key={p.title} style={{ backgroundColor: "#FFFFFF", padding: "32px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ width: "28px", height: "1px", backgroundColor: "#2B7CC1" }} aria-hidden="true" />
                  <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "21px", color: "#1A202C", margin: 0 }}>{p.title}</h2>
                  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#6B7280", margin: 0, maxWidth: "680px" }}>
              Ready to talk numbers? Request your free in-home estimate and we&apos;ll walk through your project and the options that make sense for you.
            </p>
          </div>
        </section>

        <CTASection headline="Let's Make It Work for Your Budget" subtext="Schedule a free in-home consultation and ask us about financing your kitchen, bath, or whole-home remodel." />
      </div>
    </>
  );
}
