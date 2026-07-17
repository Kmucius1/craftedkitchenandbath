import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import { getServiceArea, serviceAreas } from "@/lib/service-areas";

const SITE = "https://craftedkitchenandbath.com";

const SERVICES = [
  { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
  { label: "Bathroom Remodeling", href: "/bathroom-remodeling" },
  { label: "Complete Interior Remodeling", href: "/complete-interior-home-remodeling" },
  { label: "Flooring Installation", href: "/flooring-installation" },
  { label: "Painting", href: "/painting" },
];

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return {};
  // The root layout appends " | Crafted Kitchen & Bath" via its title template,
  // so strip the short "| Crafted" suffix the data uses to avoid doubling.
  const baseTitle = area.metaTitle.replace(/\s*\|\s*Crafted\s*$/i, "");
  return {
    title: baseTitle,
    description: area.metaDescription,
    alternates: { canonical: `${SITE}/areas-of-service/${area.slug}` },
    openGraph: {
      title: `${baseTitle} | Crafted Kitchen & Bath`,
      description: area.metaDescription,
      url: `${SITE}/areas-of-service/${area.slug}`,
      type: "website",
    },
  };
}

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  const nearby = area.nearby
    .map((slug) => getServiceArea(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: "Crafted Kitchen and Bath",
    url: `${SITE}/areas-of-service/${area.slug}`,
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
    description: `Licensed kitchen and bath remodeling contractor (CRC1333143) serving ${area.name}, ${area.county}, and the greater Tampa Bay area.`,
    areaServed: { "@type": "City", name: area.name, containedIn: { "@type": "State", name: "Florida" } },
    priceRange: "$$",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Areas of Service", item: `${SITE}/areas-of-service` },
      { "@type": "ListItem", position: 3, name: area.name, item: `${SITE}/areas-of-service/${area.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "clamp(112px, 16vw, 128px) 24px clamp(48px, 10vw, 88px)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "40px" }}>
            <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/" style={crumbLink}>Home</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/areas-of-service" style={crumbLink}>Areas of Service</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A202C" }}>{area.name}</span>
              </li>
            </ol>
          </nav>

          <SectionLabel>{area.county}</SectionLabel>
          <div style={{ width: "48px", height: "1px", backgroundColor: "#2B7CC1", margin: "24px 0" }} aria-hidden="true" />

          <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.1, color: "#1A202C", margin: 0, letterSpacing: "0.01em" }}>
            Kitchen &amp; Bath Remodeling
            <br />in {area.name}, FL
          </h1>

          <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.75, color: "#4A5568", margin: "28px 0 0", maxWidth: "600px" }}>
            {area.heroIntro}
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(48px, 10vw, 88px) 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          <SectionLabel>Remodeling in {area.name}</SectionLabel>
          {area.overview.map((p, i) => (
            <p key={i} style={{ fontSize: "16px", lineHeight: 1.85, color: "#4A5568", margin: 0 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* ── NEIGHBORHOODS ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "clamp(44px, 9vw, 80px) 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "560px" }}>
            <SectionLabel>Neighborhoods We Serve</SectionLabel>
            <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.2, color: "#1A202C", margin: 0 }}>
              Across {area.name}
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{area.homeStyles}</p>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {area.neighborhoods.map((n) => (
              <li key={n}>
                <span style={{ display: "inline-block", border: "1px solid rgba(0,0,0,0.12)", color: "#4A5568", backgroundColor: "#FFFFFF", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "7px 14px", fontWeight: 500 }}>
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(48px, 10vw, 88px) 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "560px" }}>
            <SectionLabel>Our Services</SectionLabel>
            <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.2, color: "#1A202C", margin: 0 }}>
              What We Build in {area.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} style={{ backgroundColor: "#FFFFFF", padding: "28px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", textDecoration: "none" }}>
                <span style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "19px", color: "#1A202C" }}>{s.label}</span>
                <span style={{ color: "#2B7CC1", fontSize: "16px" }} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL NOTE ── */}
      <section style={{ backgroundColor: "#EEF0F4", padding: "clamp(40px, 8vw, 72px) 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          <SectionLabel>Local Know-How</SectionLabel>
          <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#4A5568", margin: 0 }}>{area.localNote}</p>
          <p style={{ fontSize: "13px", lineHeight: 1.8, color: "#6B7280", margin: 0 }}>
            Crafted Kitchen and Bath is a licensed Florida contractor (CRC1333143) serving {area.name} and the greater Tampa Bay area.
          </p>
        </div>
      </section>

      {/* ── NEARBY AREAS ── */}
      {nearby.length > 0 && (
        <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(40px, 8vw, 72px) 24px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
            <SectionLabel>Nearby Service Areas</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(43,124,193,0.1)" }}>
              {nearby.map((n) => (
                <Link key={n.slug} href={`/areas-of-service/${n.slug}`} style={{ backgroundColor: "#FFFFFF", padding: "24px 22px", display: "flex", flexDirection: "column", gap: "8px", textDecoration: "none" }}>
                  <div style={{ width: "24px", height: "1px", backgroundColor: "#2B7CC1" }} aria-hidden="true" />
                  <span style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "18px", color: "#1A202C" }}>{n.name}</span>
                  <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280" }}>{n.county}</span>
                </Link>
              ))}
            </div>
            <Link href="/areas-of-service" style={{ ...crumbLink, color: "#2B7CC1", borderBottom: "1px solid rgba(43,124,193,0.4)", paddingBottom: "2px", alignSelf: "flex-start" }}>
              View All Service Areas
            </Link>
          </div>
        </section>
      )}

      <CTASection
        headline={`Remodeling in ${area.name}? Let's Talk.`}
        subtext={`Schedule a complimentary in-home consultation. We serve ${area.name} and all of Tampa Bay.`}
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
