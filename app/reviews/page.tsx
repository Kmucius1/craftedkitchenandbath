import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import { getGoogleReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews | Crafted Kitchen & Bath | Tampa Bay Remodeling",
  description:
    "Read real 5-star Google reviews from Crafted Kitchen & Bath clients across Tampa Bay. Kitchen, bathroom, flooring, and full interior remodeling in Oldsmar, Clearwater, Palm Harbor & beyond.",
  alternates: { canonical: "https://craftedkitchenandbath.com/reviews" },
};

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const bodyFont = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";

// Direct link to the Google Business Profile reviews.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/crafted+kitchen+and+bath+oldsmar+fl";

const GoogleIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

export default async function ReviewsPage() {
  const { reviews, aggregateRating, totalCount } = await getGoogleReviews();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://craftedkitchenandbath.com" },
      { "@type": "ListItem", position: 2, name: "Reviews", item: "https://craftedkitchenandbath.com/reviews" },
    ],
  };

  // AggregateRating + a sample of reviews for rich results.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Crafted Kitchen & Bath",
    image: "https://craftedkitchenandbath.com/logo.png",
    telephone: "+1-727-383-7550",
    address: {
      "@type": "PostalAddress",
      streetAddress: "120 Commerce Blvd Suite 4",
      addressLocality: "Oldsmar",
      addressRegion: "FL",
      postalCode: "34677",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.toFixed(1),
      reviewCount: totalCount,
      bestRating: 5,
    },
    review: reviews.slice(0, 12).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.quote,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <div style={{ backgroundColor: "#F7F8FA" }}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F7F8FA", padding: "96px 24px 48px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <Breadcrumb items={[{ label: "Reviews" }]} />
            </div>
            <SectionLabel>What Our Clients Say</SectionLabel>
            <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: "clamp(36px, 5vw, 60px)", color: "#1A202C", lineHeight: 1.15, margin: "24px 0 20px" }}>
              Reviews From Real Tampa Bay Homeowners
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.8, color: "#4A5568", maxWidth: "620px", margin: 0 }}>
              We&apos;re proud of the relationships we build on every project. Here&apos;s what
              our clients have to say — straight from our Google Business Profile.
            </p>

            {/* Google rating badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginTop: "28px", padding: "12px 20px", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#FFFFFF" }}>
              <GoogleIcon size={18} />
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: s <= Math.round(aggregateRating) ? "#F59E0B" : "#D1D5DB", fontSize: "14px" }}>★</span>
                ))}
              </div>
              <span style={{ fontFamily: bodyFont, fontSize: "13px", color: "#1A202C", fontWeight: 500 }}>{aggregateRating.toFixed(1)}</span>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>· {totalCount} Google Reviews</span>
            </div>
          </div>
        </section>

        {/* ── Review grid ────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(40px, 7vw, 72px) 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, idx) => (
                <div key={`${r.author}-${idx}`} style={{ backgroundColor: "#F7F8FA", padding: "32px", borderTop: "2px solid #F59E0B", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} style={{ color: s <= Math.round(r.rating || 5) ? "#F59E0B" : "#D1D5DB", fontSize: "14px" }}>★</span>
                      ))}
                    </div>
                    <GoogleIcon size={14} />
                  </div>
                  <p style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: "13.5px", color: "#1A202C", lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <p className="mt-4" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6B7280" }}>
                    — {r.author}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <Link href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "14px 28px", textDecoration: "none", fontFamily: bodyFont, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1A202C", fontWeight: 500 }} className="hover:bg-[#F7F8FA] transition-colors duration-200">
                <GoogleIcon size={16} /> Read All Reviews on Google
              </Link>
              <Link href={`${GOOGLE_REVIEWS_URL}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "#2B7CC1", padding: "14px 28px", textDecoration: "none", fontFamily: bodyFont, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#FFFFFF", fontWeight: 500 }} className="hover:opacity-90 transition-opacity duration-200">
                Leave Us a Review
              </Link>
            </div>
          </div>
        </section>

        <CTASection headline="Ready to Love Your Home?" subtext="Join the Tampa Bay homeowners who trust Crafted with their kitchens, baths, and full interior remodels. Schedule your free in-home consultation today." />
      </div>
    </>
  );
}
