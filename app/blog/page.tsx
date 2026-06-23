import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Remodeling Blog | Tips, Guides & Inspiration from Crafted Kitchen and Bath",
  description:
    "Remodeling tips, design inspiration, and local guides from the Crafted Kitchen and Bath team. Serving Oldsmar, Pinellas County, and the Tampa Bay area.",
};

const featuredPost = {
  title:
    "How to Plan a Kitchen Remodel in Pinellas County: What Homeowners Need to Know",
  category: "Kitchen Remodeling",
  date: "June 2024",
  excerpt:
    "Planning a kitchen remodel is one of the biggest home improvement decisions you'll make. Here's what local Pinellas County homeowners should know before they start — from budgeting and material selection to permits and timelines.",
  href: "/blog/kitchen-remodel-pinellas-county",
};

const blogPosts = [
  {
    title: "5 Bathroom Remodeling Trends Worth Considering in 2024",
    category: "Bathroom",
    date: "March 2024",
    excerpt:
      "From spa-inspired showers to floating vanities — the design moves making the biggest impact in Tampa Bay bathrooms this year.",
    href: "#",
  },
  {
    title: "LVP vs. Tile: Which Flooring Is Right for Your Florida Home?",
    category: "Flooring",
    date: "April 2024",
    excerpt:
      "Florida's humidity plays a real role in your flooring decision. Here's how to choose between luxury vinyl plank and tile for every room.",
    href: "#",
  },
  {
    title: "Cabinet Painting vs. Cabinet Replacement: Cost and Quality Compared",
    category: "Kitchen",
    date: "May 2024",
    excerpt:
      "Replacing every cabinet isn't always necessary. Here's how to decide which approach delivers the best result for your kitchen and budget.",
    href: "#",
  },
  {
    title: "What to Expect During a Bathroom Renovation Week by Week",
    category: "Bathroom",
    date: "May 2024",
    excerpt:
      "We break down a typical Crafted bathroom renovation from demo day to the final walkthrough, so there are no surprises along the way.",
    href: "#",
  },
  {
    title: "Choosing the Right Countertop Material for Your Kitchen",
    category: "Kitchen",
    date: "June 2024",
    excerpt:
      "Quartz, granite, marble, butcher block — each comes with real trade-offs. Here's how to find the right fit for your household.",
    href: "#",
  },
  {
    title: "How to Prepare Your Home for a Remodeling Project",
    category: "Interiors",
    date: "June 2024",
    excerpt:
      "A few steps before the crew arrives can make the entire project smoother for everyone. Here's what Crafted recommends to homeowners.",
    href: "#",
  },
];

const featuredPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: featuredPost.title,
  description: featuredPost.excerpt,
  datePublished: "2024-06-01",
  author: {
    "@type": "Organization",
    name: "Crafted Kitchen and Bath",
    url: "https://craftedkitchenandbath.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Crafted Kitchen and Bath",
    url: "https://craftedkitchenandbath.com",
  },
  url: `https://craftedkitchenandbath.com${featuredPost.href}`,
  articleSection: featuredPost.category,
  keywords: "kitchen remodel, Pinellas County, Tampa Bay, remodeling guide",
};

export default function BlogPage() {
  return (
    <>
      {/* JSON-LD: Featured BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredPostJsonLd) }}
      />

      <main style={{ backgroundColor: "#F7F8FA" }}>

        {/* ─── HERO ────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 64px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            {/* Breadcrumb */}
            <div style={{ marginBottom: "40px" }}>
              <Breadcrumb items={[{ label: "Blog" }]} />
            </div>

            <SectionLabel>Crafted Insights</SectionLabel>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 5.5vw, 64px)",
                color: "#1A202C",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                margin: "24px 0 20px",
                maxWidth: "820px",
              }}
            >
              Remodeling Insights from the Crafted Team
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                lineHeight: 1.8,
                color: "#4A5568",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              Tips on kitchen design, bathroom upgrades, material selection, and
              what to expect during a remodel — from the people who do this
              every day.
            </p>
          </div>
        </section>

        {/* ─── FEATURED POST ───────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "64px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            <SectionLabel>Featured Post</SectionLabel>

            <article
              style={{
                marginTop: "28px",
                backgroundColor: "#F7F8FA",
                border: "1px solid rgba(0,0,0,0.08)",
                display: "grid",
                gridTemplateColumns: "1fr",
                overflow: "hidden",
              }}
              className="lg:grid-cols-[1fr_1fr]"
            >
              {/* Image placeholder */}
              <div
                style={{
                  background:
                    "linear-gradient(to bottom right, #E8ECF0, #D5DAE2)",
                  minHeight: "360px",
                  position: "relative",
                }}
              >
                {/* Blue accent line — left edge */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    backgroundColor: "#2B7CC1",
                  }}
                />
                {/* Placeholder label */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "32px",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#9CA3AF",
                  }}
                >
                  Image placeholder
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                {/* Category */}
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    fontWeight: 500,
                  }}
                >
                  {featuredPost.category}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "clamp(22px, 3vw, 32px)",
                    color: "#1A202C",
                    lineHeight: 1.25,
                    letterSpacing: "0.01em",
                    margin: 0,
                  }}
                >
                  {featuredPost.title}
                </h2>

                {/* Date */}
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9CA3AF",
                    margin: 0,
                  }}
                >
                  {featuredPost.date}
                </p>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={featuredPost.href}
                  style={{
                    color: "#2B7CC1",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  Read More →
                </Link>

                {/* Placeholder note */}
                <p
                  style={{
                    fontSize: "11px",
                    fontStyle: "italic",
                    color: "#9CA3AF",
                    margin: "4px 0 0",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  Placeholder post — content will be published by the Crafted
                  Kitchen and Bath team.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ─── BLOG GRID ───────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F7F8FA", padding: "64px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            <div style={{ marginBottom: "40px" }}>
              <SectionLabel>All Articles</SectionLabel>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
                gap: "1px",
                backgroundColor: "rgba(0,0,0,0.08)",
              }}
            >
              {blogPosts.map((post) => (
                <article
                  key={post.title}
                  style={{
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Placeholder image area */}
                  <div
                    style={{
                      background:
                        "linear-gradient(to bottom right, #EEF0F4, #D8DDE6)",
                      height: "200px",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {/* Blue top border */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#2B7CC1",
                        opacity: 0.5,
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div
                    style={{
                      padding: "28px 28px 32px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      gap: "10px",
                    }}
                  >
                    {/* Category */}
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#2B7CC1",
                        fontWeight: 500,
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontWeight: 300,
                        fontSize: "19px",
                        color: "#1A202C",
                        lineHeight: 1.35,
                        letterSpacing: "0.01em",
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Date */}
                    <p
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#9CA3AF",
                        margin: 0,
                      }}
                    >
                      {post.date}
                    </p>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.75,
                        color: "#4A5568",
                        margin: 0,
                        flexGrow: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <Link
                      href={post.href}
                      style={{
                        color: "#2B7CC1",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Editorial note */}
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#9CA3AF",
                textAlign: "center",
                marginTop: "48px",
                lineHeight: 1.6,
              }}
            >
              Blog posts are placeholder content and will be replaced with
              published articles. Content written by the Crafted Kitchen and
              Bath team.
            </p>
          </div>
        </section>

        {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
        <CTASection
          headline="Ready to Start Your Remodel?"
          subtext="Contact us for a free consultation — we serve Pinellas and Hillsborough County."
          primaryCTA="Get a Free Quote"
          primaryHref="/contact"
          secondaryCTA="Call (727) 383-7550"
          secondaryHref="tel:7273837550"
        />
      </main>
    </>
  );
}
