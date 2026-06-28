import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import { getServicePage, servicePages } from "@/lib/service-pages";

const SITE = "https://craftedkitchenandbath.com";
const headingFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServicePage(slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `${SITE}/services/${svc.slug}` },
    openGraph: {
      title: `${svc.metaTitle} | Crafted Kitchen & Bath`,
      description: svc.metaDescription,
      url: `${SITE}/services/${svc.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServicePage(slug);
  if (!svc) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    serviceType: svc.name,
    description: svc.metaDescription,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: "Crafted Kitchen and Bath",
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
      { "@type": "AdministrativeArea", name: "Pinellas County" },
      { "@type": "AdministrativeArea", name: "Hillsborough County" },
    ],
    url: `${SITE}/services/${svc.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      { "@type": "ListItem", position: 3, name: svc.name, item: `${SITE}/services/${svc.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "128px 24px 88px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "40px" }}>
            <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/" style={crumbLink}>Home</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/services" style={crumbLink}>Services</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A202C" }}>{svc.name}</span>
              </li>
            </ol>
          </nav>

          <SectionLabel>{svc.heroLabel}</SectionLabel>
          <div style={{ width: "48px", height: "1px", backgroundColor: "#2B7CC1", margin: "24px 0" }} aria-hidden="true" />
          <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.1, color: "#1A202C", margin: 0, letterSpacing: "0.01em" }}>
            {svc.name}
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.75, color: "#4A5568", margin: "28px 0 0", maxWidth: "600px" }}>
            {svc.heroIntro}
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "88px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          <SectionLabel>Overview</SectionLabel>
          {svc.overview.map((p, i) => (
            <p key={i} style={{ fontSize: "16px", lineHeight: 1.85, color: "#4A5568", margin: 0 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "88px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <SectionLabel>What Sets It Apart</SectionLabel>
            <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.2, color: "#1A202C", margin: 0 }}>
              Built Right, Down to the Detail
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
            {svc.features.map((f) => (
              <div key={f.title} style={{ backgroundColor: "#FFFFFF", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ width: "28px", height: "1px", backgroundColor: "#2B7CC1" }} aria-hidden="true" />
                <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "20px", color: "#1A202C", margin: 0, lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "88px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.2, color: "#1A202C", margin: 0 }}>
              Our Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {svc.process.map((p) => (
              <div key={p.step} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "40px", color: "rgba(43,124,193,0.22)", fontWeight: 300, lineHeight: 1, fontFamily: headingFont }}>{p.step}</span>
                <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "19px", color: "#1A202C", margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "88px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          <SectionLabel>Common Questions</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {svc.faqs.map((f, i) => (
              <details key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.1)", padding: "22px 0" }}>
                <summary style={{ cursor: "pointer", fontFamily: headingFont, fontWeight: 400, fontSize: "20px", color: "#1A202C", listStyle: "none", lineHeight: 1.35 }}>
                  {f.q}
                </summary>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: "14px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {svc.related.length > 0 && (
        <section style={{ backgroundColor: "#FFFFFF", padding: "72px 24px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
            <SectionLabel>Related Services</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
              {svc.related.map((r) => (
                <Link key={r.href} href={r.href} style={{ backgroundColor: "#FFFFFF", padding: "26px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", textDecoration: "none" }}>
                  <span style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "19px", color: "#1A202C" }}>{r.label}</span>
                  <span style={{ color: "#2B7CC1", fontSize: "16px" }} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        headline={`Interested in ${svc.name}?`}
        subtext="Schedule a complimentary in-home consultation. We bring the samples and the design conversation to you — no showroom visit required."
      />
    </>
  );
}

const crumbLink: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#6B7280",
  textDecoration: "none",
};
