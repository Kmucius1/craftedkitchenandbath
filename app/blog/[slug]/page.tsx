import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import { blogArticles, getArticle, articleDate, articleDisplayDate } from "@/lib/blog-articles";

const SITE = "https://craftedkitchenandbath.com";
const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticle(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      title: `${post.metaTitle} | Crafted Kitchen & Bath`,
      description: post.metaDescription,
      url: `${SITE}/blog/${post.slug}`,
      type: "article",
      publishedTime: articleDate(post.slug),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getArticle(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: articleDate(post.slug),
    articleSection: post.category,
    author: { "@type": "Organization", name: "Crafted Kitchen and Bath", url: SITE },
    publisher: { "@type": "Organization", name: "Crafted Kitchen and Bath", url: SITE },
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    url: `${SITE}/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#F7F8FA", padding: "120px 24px 64px" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
            <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/" style={crumbLink}>Home</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/blog" style={crumbLink}>Blog</Link>
                <span style={{ color: "#2B7CC1", fontSize: "10px" }} aria-hidden="true">/</span>
              </li>
              <li><span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A202C" }}>{post.category}</span></li>
            </ol>
          </nav>

          <SectionLabel>{post.category}</SectionLabel>
          <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A202C", margin: "20px 0 16px", letterSpacing: "0.01em" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", margin: 0 }}>
            {articleDisplayDate(post.slug)} · {post.readMinutes} min read
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <article style={{ backgroundColor: "#FFFFFF", padding: "56px 24px 80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} style={{ fontFamily: headingFont, fontWeight: 400, fontSize: "clamp(24px, 3vw, 32px)", color: "#1A202C", lineHeight: 1.25, margin: "40px 0 16px" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} style={{ margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {block.items.map((it, j) => (
                    <li key={j} style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
                      <span style={{ color: "#2B7CC1", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ fontSize: "16px", lineHeight: 1.85, color: "#374151", margin: "0 0 20px" }}>
                {block.text}
              </p>
            );
          })}

          {/* Related */}
          {post.related.length > 0 && (
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7280", fontWeight: 600, margin: "0 0 16px" }}>Related</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {post.related.map((r) => (
                  <Link key={r.href} href={r.href} style={{ display: "inline-block", border: "1px solid rgba(43,124,193,0.35)", color: "#2B7CC1", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, padding: "8px 16px", textDecoration: "none" }}>
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection
        headline="Ready to Start Your Project?"
        subtext="Schedule a complimentary in-home consultation. We bring the design conversation to you — no showroom visit required."
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
