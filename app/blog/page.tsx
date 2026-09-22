import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import { blogArticles, articleDate, articleDisplayDate } from "@/lib/blog-articles";
import { getRemotePosts, remoteReadMinutes, remoteDisplayDate } from "@/lib/remote-blog";

export const metadata: Metadata = {
  title: "Remodeling Blog | Tips, Guides & Inspiration",
  description:
    "Remodeling tips, cost guides, and material comparisons from the Crafted Kitchen and Bath team. Serving Oldsmar, Pinellas County, and the Tampa Bay area.",
};

interface ListPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readMinutes: number;
  image: string | null;
  imageAlt: string;
}

/** Categories arrive from two places and one of them is typed by hand. */
const tidy = (value: string | null | undefined, fallback: string) =>
  (value || "").trim() || fallback;

/**
 * A card-sized preview, whatever the publisher actually sent.
 *
 * DRYP Hub currently returns the FULL article in `excerpt` — 10,000+ characters
 * of markdown — so a card that trusts the field renders the entire post. This
 * is deliberately defensive rather than a fix upstream: the site should not
 * break its own layout because a field on someone else's API changes meaning.
 */
function preview(raw: string, limit = 190): string {
  const flat = raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")      // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")   // links → their text
    .replace(/[#*_`>]/g, "")                    // emphasis, headings, code
    .replace(/\s+/g, " ")
    .trim();

  if (flat.length <= limit) return flat;

  // Cut on a word so the preview never ends mid-word.
  const cut = flat.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

async function getPosts(): Promise<ListPost[]> {
  const local: ListPost[] = blogArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: tidy(a.category, "Insights"),
    excerpt: preview(a.excerpt),
    date: articleDate(a.slug),
    displayDate: articleDisplayDate(a.slug),
    readMinutes: a.readMinutes,
    image: a.image,
    imageAlt: a.imageAlt,
  }));

  const remote: ListPost[] = (await getRemotePosts()).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: tidy(p.category, "Insights"),
    excerpt: preview(p.excerpt || p.content || ""),
    date: p.published_at,
    displayDate: remoteDisplayDate(p.published_at),
    readMinutes: remoteReadMinutes(p.content),
    image: p.featured_image_url,
    imageAlt: p.title,
  }));

  return [...local, ...remote].sort((a, b) => (a.date < b.date ? 1 : -1));
}

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const INK = "#111822";
const BLUE = "#2B7CC1";

/** A card with no photo still has to look deliberate rather than broken. */
function Media({
  image,
  alt,
  sizes,
  priority,
}: {
  image: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!image) {
    return (
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${INK} 0%, ${BLUE} 130%)` }}
      />
    );
  }
  return <Image src={image} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />;
}

function CategoryChip({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        alignSelf: "flex-start",
        fontSize: "10px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: 700,
        padding: "6px 11px",
        color: onDark ? "#FFFFFF" : BLUE,
        backgroundColor: onDark ? "rgba(43,124,193,0.92)" : "rgba(43,124,193,0.10)",
      }}
    >
      {children}
    </span>
  );
}

function Meta({ post, muted }: { post: ListPost; muted: string }) {
  return (
    <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, margin: 0, fontWeight: 600 }}>
      {post.displayDate} · {post.readMinutes} min read
    </p>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Crafted Kitchen and Bath Blog",
    url: "https://craftedkitchenandbath.com/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      image: p.image ?? undefined,
      url: `https://craftedkitchenandbath.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* ─── HERO ───
          A photograph under a dark wash rather than the pale grey panel this
          page used to open with — the same treatment every other page here
          uses, and the reason the blog read as a different website. */}
      <section style={{ position: "relative", backgroundColor: INK, padding: "128px 24px 88px", overflow: "hidden" }}>
        <Image
          src="/images/wp/IMG_6129-scaled.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(100deg, rgba(17,24,34,0.94) 0%, rgba(17,24,34,0.86) 46%, rgba(17,24,34,0.6) 100%)`,
          }}
        />

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }}>
            {/* Breadcrumb renders in cream — built for dark headers, and all
                but invisible on the pale panel this hero replaced. */}
            <Breadcrumb items={[{ label: "Blog" }]} />
          </div>

          <span style={{ display: "block", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7FB4E4", fontWeight: 700, marginBottom: "20px" }}>
            Crafted Insights
          </span>

          <h1 style={{ fontFamily: headingFont, fontSize: "clamp(34px, 5.4vw, 62px)", color: "#FFFFFF", lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 0 22px", maxWidth: "880px" }}>
            Remodeling Advice From the Crew Doing the Work
          </h1>

          <p style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.75, color: "rgba(255,255,255,0.82)", maxWidth: "620px", margin: 0 }}>
            Straight answers on what things cost, which materials hold up in Florida, and how a
            remodel actually runs — from the team building them across Tampa Bay.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "34px" }}>
            <span style={{ width: "44px", height: "3px", backgroundColor: BLUE }} />
            <span style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {posts.length} {posts.length === 1 ? "Article" : "Articles"}
            </span>
          </div>
        </div>
      </section>

      <div style={{ backgroundColor: "#F7F8FA" }}>
        {/* ─── FEATURED ─── */}
        {featured && (
          <section style={{ padding: "72px 24px 20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <SectionLabel>Latest Article</SectionLabel>

              <Link
                href={`/blog/${featured.slug}`}
                className="blog-featured blog-card"
                style={{ marginTop: "26px", borderColor: "rgba(17,24,34,0.1)" }}
              >
                <div className="blog-featured-media">
                  <Media
                    image={featured.image}
                    alt={featured.imageAlt}
                    sizes="(max-width: 900px) 100vw, 55vw"
                    priority
                  />
                </div>

                <div style={{ padding: "clamp(28px, 4vw, 52px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
                  <CategoryChip>{featured.category}</CategoryChip>

                  <h2 style={{ fontFamily: headingFont, fontSize: "clamp(23px, 2.9vw, 36px)", color: INK, lineHeight: 1.18, letterSpacing: "-0.02em", margin: 0 }}>
                    {featured.title}
                  </h2>

                  <Meta post={featured} muted="#6B7280" />

                  <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5568", margin: 0 }}>{featured.excerpt}</p>

                  <span style={{ color: BLUE, fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px" }}>
                    Read the Article <span className="blog-card-arrow">→</span>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ─── GRID ─── */}
        {rest.length > 0 && (
          <section style={{ padding: "56px 24px 88px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ marginBottom: "34px" }}>
                <SectionLabel>More Reading</SectionLabel>
              </div>

              <div className="blog-grid">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-card-media">
                      <Media
                        image={post.image}
                        alt={post.imageAlt}
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      />
                      <div style={{ position: "absolute", left: "16px", bottom: "16px" }}>
                        <CategoryChip onDark>{post.category}</CategoryChip>
                      </div>
                    </div>

                    <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", flexGrow: 1, gap: "12px" }}>
                      <Meta post={post} muted="#6B7280" />

                      <h3 style={{ fontFamily: headingFont, fontSize: "19px", color: INK, lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0 }}>
                        {post.title}
                      </h3>

                      <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: "#4A5568", margin: 0, flexGrow: 1 }}>{post.excerpt}</p>

                      <span style={{ color: BLUE, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "4px" }}>
                        Read More <span className="blog-card-arrow">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          headline="Ready to Start Your Remodel?"
          subtext="Contact us for a free in-home consultation — we serve Pinellas and Hillsborough County."
        />
      </div>
    </>
  );
}
