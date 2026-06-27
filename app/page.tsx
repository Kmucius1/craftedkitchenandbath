import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroSlideshow from "@/components/HeroSlideshow";

export const metadata: Metadata = {
  title: "Kitchen & Bathroom Remodeling Tampa Bay | Crafted Kitchen & Bath | Oldsmar FL",
  description:
    "Crafted Kitchen & Bath delivers luxury kitchen remodeling and spa-inspired bathroom renovations across Tampa Bay. Custom cabinetry, countertops, tile, and complete transformations. Licensed contractor CRC1333143. Serving Oldsmar, Clearwater, Palm Harbor, Tampa.",
  openGraph: {
    title: "Kitchen & Bathroom Remodeling Tampa Bay | Crafted Kitchen & Bath | Oldsmar FL",
    description:
      "Crafted Kitchen & Bath delivers luxury kitchen remodeling and spa-inspired bathroom renovations across Tampa Bay. Custom cabinetry, countertops, tile, and complete transformations. Licensed contractor CRC1333143. Serving Oldsmar, Clearwater, Palm Harbor, Tampa.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": "https://craftedkitchenandbath.com/#business",
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
      // NOTE: aggregateRating removed — Google requires it to reflect real,
      // on-page, verifiable reviews. Restore once genuine reviews are displayed
      // on the site (e.g. pulled from the Google Business Profile).
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://craftedkitchenandbath.com/#website",
      url: "https://craftedkitchenandbath.com",
      name: "Crafted Kitchen and Bath",
      publisher: { "@id": "https://craftedkitchenandbath.com/#business" },
    },
  ],
};

const services = [
  {
    name: "Kitchen Remodeling",
    description: "Custom cabinetry, countertops, layout, and finish — every detail considered.",
    href: "/kitchen-remodeling",
  },
  {
    name: "Bathroom Remodeling",
    description: "Spa-quality finishes, custom tile, and thoughtful storage in every bath.",
    href: "/bathroom-remodeling",
  },
  {
    name: "Complete Interior Remodeling",
    description: "Full-home transformations, one team, one seamless process.",
    href: "/complete-interior-home-remodeling",
  },
  {
    name: "Flooring & Painting",
    description: "Premium floors and expert paint finishes that complete every project.",
    href: "/flooring-installation",
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery",
    body: "We listen first. Every project begins with a conversation about how you use your space, what's missing, and what's possible.",
  },
  {
    number: "02",
    title: "Material Selection",
    body: "From custom cabinetry to stone countertops, we guide you through premium materials that match your vision and your budget.",
  },
  {
    number: "03",
    title: "Craft & Build",
    body: "Our licensed team handles every detail — framing, tile, plumbing coordination, paint, and finish — with exacting care.",
  },
  {
    number: "04",
    title: "Final Reveal",
    body: "We don't call it done until it's right. Every project closes with a full walkthrough and your complete satisfaction.",
  },
];

const trustPoints = [
  "Licensed Contractor (CRC1333143)",
  "One-Stop Remodeling",
  "Quality Materials",
  "Clear Communication",
  "Tampa Bay Local",
];

const materials = [
  {
    name: "Quartz & Stone Countertops",
    description: "Durable, beautiful surfaces built to last a lifetime.",
    bg: "#C8BFB4",
  },
  {
    name: "Custom Cabinetry",
    description: "Handcrafted cabinet solutions for kitchens and bathrooms.",
    bg: "#6B5C4E",
  },
  {
    name: "Porcelain & Ceramic Tile",
    description: "Classic and contemporary tile for floors, walls, and showers.",
    bg: "#DDD8D0",
  },
  {
    name: "Luxury Vinyl & Hardwood",
    description: "Warm, resilient flooring options for every room.",
    bg: "#A08060",
  },
  {
    name: "Fixtures & Hardware",
    description: "Polished brass, matte black, and brushed nickel finishes.",
    bg: "#B89054",
  },
  {
    name: "Paint & Interior Finishes",
    description: "Premium paints applied with clean, crisp results.",
    bg: "#B0A898",
  },
];

const testimonials = [
  {
    quote:
      "The craftsmanship was exceptional. Every little detail was handled with real pride in the work. Our kitchen feels completely transformed.",
    author: "M.R., Palm Harbor",
  },
  {
    quote:
      "Professional, efficient, and thorough. They upgraded our kitchen, three bathrooms, and all the flooring — not a single detail was missed.",
    author: "S.T., Clearwater",
  },
  {
    quote:
      "From the first conversation to the final walkthrough, communication was clear and the quality was outstanding.",
    author: "D.L., Oldsmar",
  },
];

const cities = [
  "Oldsmar",
  "Clearwater",
  "Palm Harbor",
  "Safety Harbor",
  "Tampa",
  "Dunedin",
  "St. Petersburg",
  "Tarpon Springs",
  "Largo",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}

      {/* Nav spacer — pushes content below the fixed 92px header */}
      <div style={{ height: "92px" }} />

      {/* Full-width hero slideshow */}
      <HeroSlideshow />

      {/* Overlapping white content panel */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1240px", margin: "-115px auto 0", padding: "0 24px" }}>
        <div style={{ background: "#fff", padding: "56px 72px 48px", boxShadow: "0 24px 60px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>

          {/* Eyebrow */}
          <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#2c7fc0", fontWeight: 600, margin: "0 0 18px" }}>
            Premium Remodeling, Personalized for You.
          </p>

          {/* Main headline */}
          <h1 style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: "clamp(48px,5vw,68px)", lineHeight: 1.08, letterSpacing: "0.01em", color: "#121820", maxWidth: "820px", margin: 0, fontWeight: 400 }}>
            Beautiful Spaces. Expertly Crafted.<br />Built Around <em>You</em>.
          </h1>

          {/* Gold accent line */}
          <div style={{ width: "60px", height: "1px", background: "#c8a45d", margin: "24px 0" }} />

          {/* Body copy */}
          <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", maxWidth: "620px", fontSize: "15px", lineHeight: 1.8, color: "#2f3540", marginBottom: "26px" }}>
            At Crafted Kitchen &amp; Bath, we specialize in high-end kitchen and bathroom remodels designed around your lifestyle. From concept to completion, we deliver timeless quality, thoughtful design, and an exceptional experience.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "52px", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{ background: "#2B7CC1", color: "#fff", padding: "15px 32px", fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}
              className="transition-colors duration-200 hover:bg-[#1E5C96]"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+17273837550"
              style={{ background: "transparent", color: "#111722", padding: "15px 30px", border: "1px solid rgba(0,0,0,0.25)", fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}
              className="transition-colors duration-200 hover:border-[#2B7CC1] hover:text-[#2B7CC1]"
            >
              Call (727) 383-7550
            </a>
            <Link
              href="/our-work"
              style={{ color: "#111722", fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
              className="transition-colors duration-200 hover:text-[#2B7CC1]"
            >
              View Our Work <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Feature row — inside panel, separated by border-top */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "34px" }} className="grid-cols-2 md:grid-cols-4">
            {([
              { title: "Custom Design",       body: "Personalized layouts and finishes that reflect your style and needs.",
                icon: <svg className="hero-feature-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#111722" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="11" height="11"/><rect x="20" y="3" width="11" height="11"/><rect x="3" y="20" width="11" height="11"/><rect x="20" y="20" width="11" height="11"/></svg> },
              { title: "Expert Craftsmanship", body: "Skilled professionals and premium materials for lasting results.",
                icon: <svg className="hero-feature-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#111722" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 28L20 14"/><path d="M20 14l4-9 5 5-9 4z"/><path d="M6 23l5 5"/></svg> },
              { title: "On Time & On Point",   body: "We respect your time and stay on schedule, every step of the way.",
                icon: <svg className="hero-feature-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#111722" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="6" width="24" height="24" rx="1"/><path d="M11 4v4M23 4v4M5 14h24"/><path d="M11 20h3M18 20h3M11 25h3"/></svg> },
              { title: "Built to Last",        body: "Timeless design and quality construction that adds lasting value.",
                icon: <svg className="hero-feature-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#111722" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3l11 5v9c0 6-5 11-11 13C11 28 6 23 6 17V8l11-5z"/><path d="M12 17l4 4 6-6"/></svg> },
            ] as Array<{ title: string; body: string; icon: React.ReactNode }>).map((f, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "46px 1fr", gap: "18px", padding: i === 0 ? "0 28px 0 0" : i === 3 ? "0 0 0 28px" : "0 28px", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                {f.icon}
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#111722", marginBottom: "8px", fontWeight: 600 }}>{f.title}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "13px", lineHeight: 1.6, color: "#4c535c", margin: 0 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ─── KITCHEN & BATH SPOTLIGHT ────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="grid-cols-1 md:grid-cols-2">
        {/* Kitchen side */}
        <div style={{ position: 'relative', height: '560px', overflow: 'hidden' }} className="group">
          <Image
            src="/images/7538a222-6dd1-43e7-8c45-55880dacb434.png"
            alt="Custom kitchen remodeling Tampa Bay"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
            className="group-hover:scale-105"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '40px 36px' }}>
            <p style={{ color: '#2B7CC1', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 500 }}>Our Specialty</p>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 16px' }}>Kitchen<br />Remodeling</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '320px' }}>Custom cabinetry, quartz countertops, kitchen islands, and complete kitchen transformations.</p>
            <Link href="/kitchen-remodeling" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.7)', color: '#FFFFFF', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', padding: '12px 28px', textDecoration: 'none' }} className="hover:bg-white hover:text-[#1A202C] transition-colors duration-300">Explore Kitchens →</Link>
          </div>
        </div>
        {/* Bathroom side */}
        <div style={{ position: 'relative', height: '560px', overflow: 'hidden' }} className="group">
          <Image
            src="/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png"
            alt="Luxury bathroom remodeling Tampa Bay"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
            className="group-hover:scale-105"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '40px 36px' }}>
            <p style={{ color: '#2B7CC1', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 500 }}>Our Specialty</p>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 16px' }}>Bathroom<br />Remodeling</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '320px' }}>Spa-inspired finishes, custom tile showers, freestanding tubs, and luxury vanities.</p>
            <Link href="/bathroom-remodeling" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.7)', color: '#FFFFFF', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', padding: '12px 28px', textDecoration: 'none' }} className="hover:bg-white hover:text-[#1A202C] transition-colors duration-300">Explore Bathrooms →</Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: SIGNATURE SERVICES ──────────────────────────── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "96px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Our Specialties
            </p>
            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem,4vw,4rem)",
                color: "#1A202C",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Every Room.<br />Every Detail.
            </h2>
          </div>

          <div
            className="grid grid-cols-2 xl:grid-cols-4"
            style={{ gap: "1px", backgroundColor: "rgba(0,0,0,0.08)" }}
          >
            {/* Kitchen Remodeling */}
            <AnimateOnScroll delay={0}>
              <Link
                href="/kitchen-remodeling"
                style={{ textDecoration: "none" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                    <Image
                      src="/images/hero-kitchen.jpg"
                      alt="Kitchen Remodeling"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "1.25rem",
                        color: "#1A202C",
                      }}
                    >
                      {services[0].name}
                    </h3>
                    <div
                      className="group-hover:w-10 transition-all duration-500"
                      style={{
                        width: "24px",
                        height: "1px",
                        backgroundColor: "#2B7CC1",
                        marginTop: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        marginTop: "8px",
                        lineHeight: 1.6,
                      }}
                    >
                      {services[0].description}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Bathroom Remodeling */}
            <AnimateOnScroll delay={100}>
              <Link
                href="/bathroom-remodeling"
                style={{ textDecoration: "none" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                    <Image
                      src="/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png"
                      alt="Bathroom Remodeling"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "1.25rem",
                        color: "#1A202C",
                      }}
                    >
                      {services[1].name}
                    </h3>
                    <div
                      className="group-hover:w-10 transition-all duration-500"
                      style={{
                        width: "24px",
                        height: "1px",
                        backgroundColor: "#2B7CC1",
                        marginTop: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        marginTop: "8px",
                        lineHeight: 1.6,
                      }}
                    >
                      {services[1].description}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Complete Interior Remodeling */}
            <AnimateOnScroll delay={200}>
              <Link
                href="/complete-interior-home-remodeling"
                style={{ textDecoration: "none" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '208px', overflow: 'hidden' }}>
                    <Image
                      src="/images/hero-bathroom.jpg"
                      alt="Complete Interior Remodeling"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "1.25rem",
                        color: "#1A202C",
                      }}
                    >
                      {services[2].name}
                    </h3>
                    <div
                      className="group-hover:w-10 transition-all duration-500"
                      style={{
                        width: "24px",
                        height: "1px",
                        backgroundColor: "#2B7CC1",
                        marginTop: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        marginTop: "8px",
                        lineHeight: 1.6,
                      }}
                    >
                      {services[2].description}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Flooring & Painting */}
            <AnimateOnScroll delay={300}>
              <Link
                href="/flooring-installation"
                style={{ textDecoration: "none" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '208px', overflow: 'hidden' }}>
                    <Image
                      src="/images/hero-kitchen.jpg"
                      alt="Flooring & Painting"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "1.25rem",
                        color: "#1A202C",
                      }}
                    >
                      {services[3].name}
                    </h3>
                    <div
                      className="group-hover:w-10 transition-all duration-500"
                      style={{
                        width: "24px",
                        height: "1px",
                        backgroundColor: "#2B7CC1",
                        marginTop: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        marginTop: "8px",
                        lineHeight: 1.6,
                      }}
                    >
                      {services[3].description}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── WHY CRAFTED FOR KITCHEN & BATH ─────────────────────────── */}
      <section style={{ backgroundColor: '#1A202C', padding: '96px 0' }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#2B7CC1', fontWeight: 500 }}>The Crafted Difference</p>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2.5rem,4vw,4rem)', color: '#FFFFFF', lineHeight: 1.1, marginTop: '24px', letterSpacing: '-0.01em' }}>Built for Kitchen &amp;<br />Bathroom Excellence</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '◇', title: 'Kitchen Specialists', body: 'From custom cabinetry to quartz islands — we have completed 150+ kitchen transformations across Tampa Bay.' },
              { icon: '◇', title: 'Bath Renovation Experts', body: 'Spa-inspired bathroom design with precision tile work, luxury vanities, and frameless glass showers.' },
              { icon: '◇', title: 'One-Stop Shop', body: 'Kitchen, bath, flooring, and paint — one licensed team, one seamless project, zero coordination headaches.' },
              { icon: '◇', title: 'Licensed & Insured', body: 'Florida licensed contractor CRC1333143. Fully insured. Your home is protected every step of the way.' },
              { icon: '◇', title: 'Premium Materials', body: 'We source quartz, marble, custom cabinetry, and designer fixtures from trusted suppliers.' },
              { icon: '◇', title: '5-Star Track Record', body: '250+ homes transformed. Every project ends with a full walkthrough and your complete satisfaction.' },
            ].map((f, i) => (
              <div
                key={f.title}
                className="glow-card"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(43,124,193,0.25)',
                  padding: '36px 28px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <p style={{ color: '#2B7CC1', fontSize: '20px', marginBottom: '16px' }}>{f.icon}</p>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PROCESS ──────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "96px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Our Approach
            </p>
            <h2
              className="mt-6 max-w-xl"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem,4vw,4rem)",
                color: "#1A202C",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Designed Around<br />the Way You Live
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "24px",
                  alignItems: "flex-start",
                  paddingBottom: idx < steps.length - 1 ? "32px" : "0",
                  marginBottom: idx < steps.length - 1 ? "32px" : "0",
                  borderBottom: idx < steps.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  paddingRight: "48px",
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    flexShrink: 0,
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 200,
                    fontSize: "4.5rem",
                    color: "rgba(43,124,193,0.18)",
                    lineHeight: 1,
                    marginTop: "-8px",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                      color: "#1A202C",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#4A5568",
                      lineHeight: 1.8,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: TRUST STATS ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#EEF0F4",
          padding: "64px 0",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <AnimateOnScroll direction="up">
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { stat: "250+", label: "Homes Transformed" },
                { stat: "100%", label: "Satisfaction" },
                { stat: "5★", label: "Rating" },
              ].map((item, idx) => (
                <div
                  key={item.stat}
                  style={{
                    textAlign: "center",
                    padding: "32px 24px",
                    borderLeft: idx > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontWeight: 300,
                      fontSize: "3.75rem",
                      color: "#2B7CC1",
                      lineHeight: 1,
                    }}
                  >
                    {item.stat}
                  </div>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "#4A5568",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust pills */}
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              {trustPoints.map((point) => (
                <span
                  key={point}
                  style={{
                    display: "inline-block",
                    border: "1px solid rgba(0,0,0,0.14)",
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#4A5568",
                    padding: "8px 16px",
                  }}
                >
                  {point}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── SECTION 5: FEATURED WORK ────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "96px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Our Work
            </p>
            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem,4vw,4rem)",
                color: "#1A202C",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Spaces Worth<br />Living In
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Tall card — spans 2 rows on lg */}
            <div
              className="lg:row-span-2 relative overflow-hidden"
              style={{ height: "480px" }}
            >
              <Image
                src="/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png"
                alt="Luxury bathroom remodel — Clearwater, FL"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  padding: "12px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#2B7CC1",
                  }}
                >
                  Bathroom Remodel
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Master Bath Retreat — Clearwater
                </p>
              </div>
            </div>

            {/* Medium card 1 */}
            <div
              className="relative overflow-hidden"
              style={{ height: "288px" }}
            >
              <Image
                src="/images/7538a222-6dd1-43e7-8c45-55880dacb434.png"
                alt="Luxury kitchen remodel — Palm Harbor, FL"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  padding: "12px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#2B7CC1",
                  }}
                >
                  Kitchen Remodel
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Kitchen Remodel — Palm Harbor
                </p>
              </div>
            </div>

            {/* Medium card 2 */}
            <div
              className="relative overflow-hidden"
              style={{ height: "288px" }}
            >
              <Image
                src="/images/hero-bathroom.jpg"
                alt="Bathroom Renovation — Safety Harbor, FL"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  padding: "12px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#2B7CC1",
                  }}
                >
                  Full Interior
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Full Interior — Safety Harbor
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/our-work"
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#2B7CC1",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: MATERIALS BOARD ──────────────────────────────── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "96px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#2B7CC1",
                fontWeight: 500,
              }}
            >
              Finishes &amp; Materials
            </p>
            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem,4vw,4rem)",
                color: "#1A202C",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Premium Materials.<br />Lasting Results.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {materials.map((mat) => (
              <div key={mat.name}>
                <div
                  style={{
                    backgroundColor: mat.bg,
                    height: "80px",
                    width: "100%",
                  }}
                />
                <p
                  className="mt-3"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#1A202C",
                  }}
                >
                  {mat.name}
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    lineHeight: 1.6,
                  }}
                >
                  {mat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "96px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16 text-center">
            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#2B7CC1", fontWeight: 500 }}>
              Client Stories
            </p>
            <h2 className="mt-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2.5rem,4vw,4rem)", color: "#1A202C", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              What Our Clients Say
            </h2>
            {/* Google rating badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginTop: "24px", padding: "12px 20px", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F8FA" }}>
              <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google" role="img">
                <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: "14px" }}>★</span>)}
              </div>
              <span style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "13px", color: "#1A202C", fontWeight: 500 }}>5.0</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>· Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <AnimateOnScroll key={t.author} delay={idx * 150}>
                <div style={{ backgroundColor: "#F7F8FA", padding: "32px", borderTop: "2px solid #F59E0B" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: "14px" }}>★</span>)}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 48 48" style={{ flexShrink: 0, opacity: 0.6 }}>
                      <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "1.25rem", color: "#1A202C", lineHeight: 1.6, margin: 0 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#9CA3AF" }}>
                    — {t.author}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Google Reviews CTA */}
          <div className="mt-12 text-center">
            <Link
              href="https://www.google.com/maps/search/crafted+home+improvements+oldsmar+fl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "14px 28px", textDecoration: "none", fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1A202C", fontWeight: 500 }}
              className="hover:bg-[#F7F8FA] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Read Our Google Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: SERVICE AREAS ────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "64px 0",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p
                style={{
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#2B7CC1",
                  fontWeight: 500,
                }}
              >
                Where We Work
              </p>
              <h2
                className="mt-6 mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem,4vw,4rem)",
                  color: "#1A202C",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Proudly Serving Tampa Bay
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  color: "#4A5568",
                  maxWidth: "32rem",
                  marginBottom: "24px",
                }}
              >
                We serve homeowners across Pinellas and Hillsborough County —
                from Oldsmar to St. Petersburg, Palm Harbor to Tampa.
              </p>
              <Link
                href="/areas-of-service"
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#2B7CC1",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                See All Service Areas →
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignContent: "flex-start",
              }}
            >
              {cities.map((city) => (
                <span
                  key={city}
                  style={{
                    display: "inline-block",
                    border: "1px solid rgba(0,0,0,0.14)",
                    fontSize: "10px",
                    color: "#4A5568",
                    padding: "8px 16px",
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA ────────────────────────────────────── */}
      <CTASection
        headline="Let's Remodel Something Beautiful."
        subtext="From a single bathroom to a full interior transformation — our team is ready. Serving Pinellas and Hillsborough County."
        primaryCTA="Book a Free Consultation"
        primaryHref="/contact"
        secondaryCTA="Call (727) 383-7550"
        secondaryHref="tel:+17273837550"
      />
    </>
  );
}
