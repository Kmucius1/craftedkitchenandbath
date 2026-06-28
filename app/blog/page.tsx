import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import { blogArticles, articleDate, articleDisplayDate } from "@/lib/blog-articles";

export const metadata: Metadata = {
  title: "Remodeling Blog | Tips, Guides & Inspiration",
  description:
    "Remodeling tips, cost guides, and material comparisons from the Crafted Kitchen and Bath team. Serving Oldsmar, Pinellas County, and the Tampa Bay area.",
};

// Newest first
const posts = [...blogArticles].sort((a, b) => (articleDate(a.slug) < articleDate(b.slug) ? 1 : -1));
const featured = posts[0];
const rest = posts.slice(1);

const headingFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Crafted Kitchen and Bath Blog",
  url: "https://craftedkitchenandbath.com/blog",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: articleDate(p.slug),
    url: `https://craftedkitchenandbath.com/blog/${p.slug}`,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <div style={{ backgroundColor: "#F7F8FA" }}>
        {/* ─── HERO ─── */}
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 56px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <Breadcrumb items={[{ label: "Blog" }]} />
            </div>
            <SectionLabel>Crafted Insights</SectionLabel>
            <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 5.5vw, 64px)", color: "#1A202C", lineHeight: 1.1, letterSpacing: "-0.01em", margin: "24px 0 20px", maxWidth: "820px" }}>
              Remodeling Insights from the Crafted Team
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: "#4A5568", maxWidth: "600px", margin: 0 }}>
              Cost guides, material comparisons, and practical advice on kitchen and bath remodeling — from the people who do this every day in Tampa Bay.
            </p>
          </div>
        </section>

        {/* ─── FEATURED ─── */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "56px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <SectionLabel>Featured Article</SectionLabel>
            <Link
              href={`/blog/${featured.slug}`}
              style={{ marginTop: "28px", backgroundColor: "#F7F8FA", border: "1px solid rgba(0,0,0,0.08)", display: "grid", gridTemplateColumns: "1fr", overflow: "hidden", textDecoration: "none" }}
              className="lg:grid-cols-[1fr_1fr]"
            >
              <div style={{ background: "linear-gradient(135deg, #1A202C 0%, #2B7CC1 120%)", minHeight: "320px", position: "relative" }}>
                <span style={{ position: "absolute", bottom: "28px", left: "32px", fontFamily: headingFont, fontWeight: 300, fontSize: "26px", color: "rgba(255,255,255,0.92)", maxWidth: "80%", lineHeight: 1.2 }}>
                  {featured.category}
                </span>
              </div>
              <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2B7CC1", fontWeight: 500 }}>{featured.category}</span>
                <h2 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(22px, 3vw, 32px)", color: "#1A202C", lineHeight: 1.25, margin: 0 }}>{featured.title}</h2>
                <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", margin: 0 }}>{articleDisplayDate(featured.slug)} · {featured.readMinutes} min read</p>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{featured.excerpt}</p>
                <span style={{ color: "#2B7CC1", fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "8px" }}>Read More →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ─── GRID ─── */}
        <section style={{ backgroundColor: "#F7F8FA", padding: "56px 24px 80px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}><SectionLabel>All Articles</SectionLabel></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: "1px", backgroundColor: "rgba(0,0,0,0.08)" }}>
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", overflow: "hidden", textDecoration: "none" }}>
                  <div style={{ background: "linear-gradient(135deg, #EEF0F4 0%, #cdd6e2 100%)", height: "160px", flexShrink: 0, position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", backgroundColor: "#2B7CC1", opacity: 0.5 }} />
                    <span style={{ position: "absolute", bottom: "16px", left: "24px", fontFamily: headingFont, fontWeight: 300, fontSize: "18px", color: "#1A202C" }}>{post.category}</span>
                  </div>
                  <div style={{ padding: "26px 28px 30px", display: "flex", flexDirection: "column", flexGrow: 1, gap: "10px" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2B7CC1", fontWeight: 500 }}>{post.category}</span>
                    <h3 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "19px", color: "#1A202C", lineHeight: 1.35, margin: 0 }}>{post.title}</h3>
                    <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", margin: 0 }}>{articleDisplayDate(post.slug)} · {post.readMinutes} min</p>
                    <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#4A5568", margin: 0, flexGrow: 1 }}>{post.excerpt}</p>
                    <span style={{ color: "#2B7CC1", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "4px" }}>Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          headline="Ready to Start Your Remodel?"
          subtext="Contact us for a free in-home consultation — we serve Pinellas and Hillsborough County."
        />
      </div>
    </>
  );
}
