import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Our Workmanship Guarantee | Crafted Kitchen & Bath",
  description:
    "Crafted Kitchen & Bath stands behind its work. A licensed, insured Tampa Bay remodeler (CRC1333143) committed to craftsmanship you can count on.",
  alternates: { canonical: "https://craftedkitchenandbath.com/warranty" },
};

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

const points = [
  { title: "Licensed & Insured", body: "Crafted Kitchen & Bath is a licensed Florida contractor (CRC1333143). You're protected by working with a properly licensed, insured professional — not an unlicensed handyman." },
  { title: "Built to Last", body: "We use quality materials and proven methods, with proper waterproofing and prep behind the finishes — the work you don't see is what makes a remodel last in Florida's climate." },
  { title: "We Stand Behind It", body: "We don't consider a project finished until you're satisfied at the final walkthrough, and we stand behind the craftsmanship of what we build." },
  { title: "One Accountable Team", body: "Because we manage the whole project in-house rather than handing off to subcontractors, there's a single, accountable point of contact for your project — start to finish." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://craftedkitchenandbath.com" },
    { "@type": "ListItem", position: 2, name: "Warranty", item: "https://craftedkitchenandbath.com/warranty" },
  ],
};

export default function WarrantyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ backgroundColor: "#F7F8FA" }}>
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 56px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}><Breadcrumb items={[{ label: "Warranty" }]} /></div>
            <SectionLabel>Our Commitment</SectionLabel>
            <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 5vw, 60px)", color: "#1A202C", lineHeight: 1.15, margin: "24px 0 20px" }}>
              Craftsmanship You Can Count On
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.8, color: "#4A5568", maxWidth: "600px", margin: 0 }}>
              When you invest in your home, you deserve to know it&apos;s done right. As a licensed, insured Tampa Bay remodeler, we build to last and stand behind our work.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(40px, 8vw, 72px) 24px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
              {points.map((p) => (
                <div key={p.title} style={{ backgroundColor: "#FFFFFF", padding: "34px 30px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ width: "28px", height: "1px", backgroundColor: "#2B7CC1" }} aria-hidden="true" />
                  <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "22px", color: "#1A202C", margin: 0 }}>{p.title}</h2>
                  <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#6B7280", margin: "28px 0 0", maxWidth: "680px" }}>
              We&apos;re glad to review the specifics of our workmanship guarantee with you in writing during your consultation, so you know exactly what&apos;s covered before your project begins.
            </p>
          </div>
        </section>

        <CTASection headline="Remodel With Confidence" subtext="Work with a licensed, insured Tampa Bay team that stands behind its craftsmanship. Schedule your free in-home consultation today." />
      </div>
    </>
  );
}
