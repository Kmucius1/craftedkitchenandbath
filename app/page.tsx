import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroSlideshow from "@/components/HeroSlideshow";
import MeetTheCrew from "@/components/MeetTheCrew";
import { getGoogleReviews } from "@/lib/reviews";

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

const cities = [
  { name: "Oldsmar", slug: "oldsmar" },
  { name: "Clearwater", slug: "clearwater" },
  { name: "Palm Harbor", slug: "palm-harbor" },
  { name: "Safety Harbor", slug: "safety-harbor" },
  { name: "Tampa", slug: "tampa" },
  { name: "Dunedin", slug: "dunedin" },
  { name: "St. Petersburg", slug: "st-petersburg" },
  { name: "Tarpon Springs", slug: "tarpon-springs" },
  { name: "Largo", slug: "largo" },
];

// Paired problem → solution rows for the "Problems We Solve" transformation section.
const problemSolutions = [
  { problem: "Outdated designs", solution: "Modern, custom upgrades tailored to you" },
  { problem: "Unreliable, no-show contractors", solution: "One accountable team, clear communication" },
  { problem: "Water damage & everyday wear", solution: "Durable, moisture-resistant materials" },
  { problem: "Cramped, closed-off spaces", solution: "Smart, open-concept layouts" },
  { problem: "Worn-out, tired interiors", solution: "Stylish finishes built to last" },
  { problem: "Budget & pricing anxiety", solution: "Clear, transparent pricing up front" },
];

export default async function HomePage() {
  // Live Google reviews (4★+), auto-synced via Featurable; falls back to verified
  // real reviews until the feed is configured. Show up to 3 on the homepage.
  const { reviews: testimonials, aggregateRating } = await getGoogleReviews(3);
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
        <div style={{ background: "#fff", padding: "clamp(28px, 6vw, 56px) clamp(22px, 6vw, 72px) clamp(28px, 5vw, 48px)", boxShadow: "0 24px 60px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>

          <div className="hero-top">
            <div className="hero-top-text">

          {/* Eyebrow */}
          <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#2c7fc0", fontWeight: 600, margin: "0 0 18px" }}>
            Premium Remodeling, Personalized for You.
          </p>

          {/* Main headline */}
          <h1 style={{ fontFamily: "var(--font-display),'Montserrat',system-ui,sans-serif", fontSize: "clamp(30px, 8vw, 68px)", lineHeight: 1.1, letterSpacing: "0.01em", color: "#121820", maxWidth: "820px", margin: 0, fontWeight: 400 }}>
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

            </div>{/* /hero-top-text */}

            {/* Brand logo — fills the right-hand whitespace, natural brand colors on white */}
            <aside className="hero-logo-panel">
              <div className="hero-logo-inner">
                <Image src="/logo.png" alt="Crafted Kitchen & Bath" width={300} height={122} style={{ width: "min(260px, 82%)", height: "auto" }} priority />
              </div>
            </aside>
          </div>{/* /hero-top */}

          {/* Feature row — inside panel, separated by border-top */}
          <div style={{ display: "grid", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "34px", gap: "28px 32px" }} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
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
              <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: "14px", alignItems: "start" }}>
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
      <section style={{ display: 'grid' }} className="grid-cols-1 md:grid-cols-2">
        {/* Kitchen side */}
        <div style={{ position: 'relative', height: 'clamp(380px, 74vw, 560px)', overflow: 'hidden' }} className="group">
          <Image
            src="/images/wp/IMG_3266-1-scaled.jpg"
            alt="Custom kitchen remodeling Tampa Bay"
            fill
          sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
            className="group-hover:scale-105"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '40px 36px' }}>
            <p style={{ color: '#2B7CC1', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 500 }}>Our Specialty</p>
            <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 16px' }}>Kitchen<br />Remodeling</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '320px' }}>Custom cabinetry, quartz countertops, kitchen islands, and complete kitchen transformations.</p>
            <Link href="/kitchen-remodeling" className="inline-block border border-white/70 bg-transparent text-white hover:bg-white hover:text-[#1A202C] hover:border-white transition-colors duration-300" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', padding: '12px 28px', textDecoration: 'none' }}>Explore Kitchens →</Link>
          </div>
        </div>
        {/* Bathroom side */}
        <div style={{ position: 'relative', height: 'clamp(380px, 74vw, 560px)', overflow: 'hidden' }} className="group">
          <Image
            src="/images/wp/IMG_1147-1-scaled.jpg"
            alt="Luxury bathroom remodeling Tampa Bay"
            fill
          sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
            className="group-hover:scale-105"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '40px 36px' }}>
            <p style={{ color: '#2B7CC1', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 500 }}>Our Specialty</p>
            <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 16px' }}>Bathroom<br />Remodeling</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '320px' }}>Spa-inspired finishes, custom tile showers, freestanding tubs, and luxury vanities.</p>
            <Link href="/bathroom-remodeling" className="inline-block border border-white/70 bg-transparent text-white hover:bg-white hover:text-[#1A202C] hover:border-white transition-colors duration-300" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', padding: '12px 28px', textDecoration: 'none' }}>Explore Bathrooms →</Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: SIGNATURE SERVICES ──────────────────────────── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "clamp(54px, 11vw, 96px) 0" }}>
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
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
                style={{ textDecoration: "none", display: "block", height: "100%" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 'clamp(150px, 38vw, 240px)', overflow: 'hidden' }}>
                    <Image
                      src="/images/wp/IMG_2580-scaled.jpeg"
                      alt="Kitchen Remodeling"
                      fill
          sizes="(max-width: 1280px) 50vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)",
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
                        color: "#6B7280",
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
                style={{ textDecoration: "none", display: "block", height: "100%" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 'clamp(150px, 38vw, 240px)', overflow: 'hidden' }}>
                    <Image
                      src="/images/wp/IMG_6153-scaled.jpeg"
                      alt="Bathroom Remodeling"
                      fill
          sizes="(max-width: 1280px) 50vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)",
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
                        color: "#6B7280",
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
                style={{ textDecoration: "none", display: "block", height: "100%" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 'clamp(150px, 38vw, 240px)', overflow: 'hidden' }}>
                    <Image
                      src="/images/wp/IMG_6140-scaled.jpeg"
                      alt="Complete Interior Remodeling"
                      fill
          sizes="(max-width: 1280px) 50vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)",
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
                        color: "#6B7280",
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
                style={{ textDecoration: "none", display: "block", height: "100%" }}
                className="group"
              >
                <div
                  className="overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#FFFFFF",
                    minHeight: "320px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 'clamp(150px, 38vw, 240px)', overflow: 'hidden' }}>
                    <Image
                      src="/images/wp/IMG_1419-scaled.jpg"
                      alt="Flooring & Painting"
                      fill
          sizes="(max-width: 1280px) 50vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                  <div style={{ padding: "24px", backgroundColor: "#FFFFFF", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)",
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
                        color: "#6B7280",
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

      {/* ─── PROBLEMS WE SOLVE (challenge → solution) ────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(54px, 11vw, 96px) 0" }}>
        <div className="max-w-[1200px] mx-auto px-8 md:px-16">
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#2B7CC1", fontWeight: 500 }}>
              The Problems We Solve
            </p>
            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem,4vw,3.6rem)",
                color: "#1A202C",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
              }}
            >
              From Frustration to Finished
            </h2>
            <p style={{ maxWidth: "620px", margin: "20px auto 0", fontSize: "16px", lineHeight: 1.8, color: "#4A5568" }}>
              Remodeling can feel overwhelming — outdated designs, unreliable contractors, hidden costs. We turn every one of those headaches into a reason to love your home again.
            </p>
          </div>

          <div className="ps-grid">
            {/* Challenges */}
            <div className="ps-card ps-challenges">
              <div className="ps-card-head">
                <span className="ps-tag ps-tag-x">Before</span>
                <h3 className="ps-card-title" style={{ color: "#1A202C" }}>The Challenges</h3>
              </div>
              <ul className="ps-list" data-stagger>
                {problemSolutions.map((row) => (
                  <li key={row.problem} className="ps-row">
                    <span className="ps-ico ps-ico-x" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M3 3l7 7M10 3l-7 7" stroke="#D24C46" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span style={{ color: "#4A5568", fontSize: "15px", lineHeight: 1.4 }}>{row.problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow badge */}
            <div className="ps-arrow" aria-hidden="true">
              <span className="ps-arrow-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h15M13 6l6 6-6 6" stroke="#2B7CC1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Solutions */}
            <div className="ps-card ps-solutions">
              <div className="ps-card-head">
                <span className="ps-tag ps-tag-check">After</span>
                <h3 className="ps-card-title" style={{ color: "#FFFFFF" }}>The Crafted Solution</h3>
              </div>
              <ul className="ps-list" data-stagger>
                {problemSolutions.map((row) => (
                  <li key={row.solution} className="ps-row ps-row-light">
                    <span className="ps-ico ps-ico-check" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2.5 6.8L5 9.3 10.5 3.5" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ color: "#FFFFFF", fontSize: "15px", lineHeight: 1.4, fontWeight: 500 }}>{row.solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <style>{`
          .ps-grid {
            display: grid;
            grid-template-columns: 1fr 76px 1fr;
            align-items: stretch;
            max-width: 1040px;
            margin: 0 auto;
          }
          @media (max-width: 900px) {
            .ps-grid { grid-template-columns: 1fr; }
          }
          .ps-card { border-radius: 12px; padding: clamp(26px, 3.6vw, 44px); }
          .ps-challenges {
            background: #FFFFFF;
            border: 1px solid rgba(0,0,0,0.10);
            box-shadow: 0 24px 60px -34px rgba(26,32,44,0.45);
          }
          .ps-solutions {
            background: linear-gradient(155deg, #2B5DA8 0%, #1B4287 100%);
            box-shadow: 0 34px 70px -28px rgba(27,66,135,0.6);
          }
          .ps-card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.07); }
          .ps-solutions .ps-card-head { border-bottom-color: rgba(255,255,255,0.16); }
          .ps-tag {
            font-family: var(--font-dm-sans),'DM Sans',system-ui,sans-serif;
            font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;
            padding: 5px 10px; border-radius: 4px;
          }
          .ps-tag-x { background: rgba(210,76,70,0.1); color: #C0413B; }
          .ps-tag-check { background: rgba(255,255,255,0.18); color: #FFFFFF; }
          .ps-card-title { font-family: var(--font-display),'Montserrat',system-ui,sans-serif; font-weight: 400; font-size: clamp(20px,2.4vw,24px); margin: 0; }
          .ps-list { list-style: none; margin: 0; padding: 0; }
          .ps-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; }
          .ps-row + .ps-row { border-top: 1px solid rgba(0,0,0,0.06); }
          .ps-row-light + .ps-row-light { border-top-color: rgba(255,255,255,0.12); }
          .ps-ico { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
          .ps-ico-x { background: rgba(210,76,70,0.1); }
          .ps-ico-check { background: rgba(255,255,255,0.18); }
          .ps-arrow { display: flex; align-items: center; justify-content: center; }
          .ps-arrow-badge {
            width: 54px; height: 54px; border-radius: 50%;
            background: #FFFFFF; border: 1px solid rgba(43,124,193,0.3);
            box-shadow: 0 12px 30px -12px rgba(26,32,44,0.35);
            display: flex; align-items: center; justify-content: center;
          }
          @media (max-width: 900px) {
            .ps-arrow { padding: 26px 0; }
            .ps-arrow-badge { transform: rotate(90deg); }
          }
        `}</style>
      </section>

      {/* ─── WHY CRAFTED FOR KITCHEN & BATH ─────────────────────────── */}
      <section style={{ backgroundColor: '#1A202C', padding: 'clamp(54px, 11vw, 96px) 0' }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#2B7CC1', fontWeight: 500 }}>The Crafted Difference</p>
            <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: 'clamp(2.5rem,4vw,4rem)', color: '#FFFFFF', lineHeight: 1.1, marginTop: '24px', letterSpacing: '-0.01em' }}>Built for Kitchen &amp;<br />Bathroom Excellence</h2>
          </div>
          <div style={{ display: 'grid', gap: '24px' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 9h16M8 5.5h2M8 12.5v5"/></svg>, title: 'Kitchen Specialists', body: 'From custom cabinetry to quartz islands — we have completed 150+ kitchen transformations across Tampa Bay.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V6a2 2 0 0 1 2-2c1 0 1.5.5 1.8 1M9 6.5h2"/></svg>, title: 'Bath Renovation Experts', body: 'Spa-inspired bathroom design with precision tile work, luxury vanities, and frameless glass showers.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4-8 4-8-4 8-4Z"/><path d="M4 12l8 4 8-4M4 16.5l8 4 8-4"/></svg>, title: 'One-Stop Shop', body: 'Kitchen, bath, flooring, and paint — one licensed team, one seamless project, zero coordination headaches.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3.5v5C20 17 16.4 21 12 22 7.6 21 4 17 4 11.5v-5L12 3Z"/><path d="M9 11.5l2 2 4-4.5"/></svg>, title: 'Licensed & Insured', body: 'Florida licensed contractor CRC1333143. Fully insured. Your home is protected every step of the way.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l3 5-9 13L3 8l3-5Z"/><path d="M3 8h18M9 3l3 18M15 3l-3 18"/></svg>, title: 'Premium Materials', body: 'We source quartz, marble, custom cabinetry, and designer fixtures from trusted suppliers.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 17.9 6.75 19.6l1-5.85L3.5 9.7l5.9-.9L12 3.5Z"/></svg>, title: '5-Star Track Record', body: '250+ homes transformed. Every project ends with a full walkthrough and your complete satisfaction.' },
            ] as Array<{ icon: React.ReactNode; title: string; body: string }>).map((f) => (
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
                <span style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#6BA6DC', background: 'rgba(43,124,193,0.12)', border: '1px solid rgba(43,124,193,0.4)' }}>{f.icon}</span>
                <h3 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 400, fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{f.body}</p>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div style={{ textAlign: 'center', marginTop: 'clamp(44px, 6vw, 64px)' }}>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.7 }}>
              Ready to see what Crafted can do for your home?
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
              <Link
                href="/quote"
                style={{ background: '#2B7CC1', color: '#fff', padding: '16px 36px', fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', borderRadius: '4px', display: 'inline-block' }}
                className="transition-colors duration-200 hover:bg-[#3D8BD0]"
              >
                Get a Free Quote →
              </Link>
              <a
                href="tel:+17273837550"
                style={{ color: '#FFFFFF', padding: '16px 30px', border: '1px solid rgba(255,255,255,0.3)', fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', borderRadius: '4px', display: 'inline-block' }}
                className="transition-colors duration-200 hover:border-[#2B7CC1] hover:text-[#6BA6DC]"
              >
                Call (727) 383-7550
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PROCESS ──────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(54px, 11vw, 96px) 0" }}>
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
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
          padding: "clamp(36px, 7vw, 64px) 0",
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
                      fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(54px, 11vw, 96px) 0" }}>
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
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
            {/* Card 1 */}
            <div
              className="relative overflow-hidden"
              style={{ height: "360px" }}
            >
              <Image
                src="/images/wp/IMG_2580-scaled.jpeg"
                alt="Two-tone kitchen remodel with quartz island — Tampa Bay"
                fill
          sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
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
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Two-Tone Kitchen — Palm Harbor
                </p>
              </div>
            </div>

            {/* Medium card 1 */}
            <div
              className="relative overflow-hidden"
              style={{ height: "360px" }}
            >
              <Image
                src="/images/wp/IMG_6153-scaled.jpeg"
                alt="Frameless glass walk-in shower with tile surround — Tampa Bay"
                fill
          sizes="(max-width: 1024px) 100vw, 33vw"
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
                  Bathroom Remodel
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Walk-In Shower — Tampa Bay
                </p>
              </div>
            </div>

            {/* Medium card 2 */}
            <div
              className="relative overflow-hidden"
              style={{ height: "360px" }}
            >
              <Image
                src="/images/wp/IMG_0801-scaled.jpg"
                alt="Sage green vanity with brass fixtures — Safety Harbor, FL"
                fill
          sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
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
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    color: "#1A202C",
                  }}
                >
                  Sage Vanity — Safety Harbor
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
      <section style={{ backgroundColor: "#F7F8FA", padding: "clamp(54px, 11vw, 96px) 0" }}>
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
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
                    color: "#6B7280",
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

      {/* ─── MEET THE CREW (mascots + chatbot intro) ─────────────────── */}
      <MeetTheCrew />

      {/* ─── SECTION 7: TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(54px, 11vw, 96px) 0" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-16 text-center">
            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#2B7CC1", fontWeight: 500 }}>
              Client Stories
            </p>
            <h2 className="mt-6" style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: "clamp(2.5rem,4vw,4rem)", color: "#1A202C", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
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
              <span style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "13px", color: "#1A202C", fontWeight: 500 }}>{aggregateRating.toFixed(1)}</span>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>· Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <AnimateOnScroll key={t.author} delay={idx * 150}>
                <div style={{ backgroundColor: "#F7F8FA", padding: "32px", borderTop: "2px solid #F59E0B" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: s <= Math.round(t.rating || 5) ? "#F59E0B" : "#D1D5DB", fontSize: "14px" }}>★</span>)}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 48 48" style={{ flexShrink: 0, opacity: 0.6 }}>
                      <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif", fontWeight: 400, fontSize: "13.5px", color: "#1A202C", lineHeight: 1.7, margin: 0, display: "-webkit-box", WebkitLineClamp: 8, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6B7280" }}>
                    — {t.author}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Google Reviews CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "14px 28px", textDecoration: "none", fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1A202C", fontWeight: 500 }}
              className="hover:bg-[#F7F8FA] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              See All Our Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: SERVICE AREAS ────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "clamp(36px, 7vw, 64px) 0",
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
                  fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
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
                gap: "14px",
                alignContent: "flex-start",
              }}
            >
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas-of-service/${city.slug}`}
                  className="hover:border-[#2B57A6] hover:text-[#2B57A6] hover:bg-white transition-colors duration-200"
                  style={{
                    display: "inline-block",
                    border: "1px solid rgba(0,0,0,0.16)",
                    fontSize: "15px",
                    color: "#4A5568",
                    padding: "13px 26px",
                    letterSpacing: "0.01em",
                    textDecoration: "none",
                  }}
                >
                  {city.name}
                </Link>
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
