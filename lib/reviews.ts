// ─────────────────────────────────────────────────────────────────────────────
// Google reviews feed (auto-synced via Featurable).
//
// How it works:
//   • Featurable connects to Crafted's Google Business Profile (public Place ID —
//     no Google login required) and re-syncs new reviews every ~48h.
//   • We pull its free JSON API here, keep only 4★+ reviews (MIN_RATING), and the
//     site renders them in Crafted's own styling.
//   • New 5★ reviews on Google appear on the site automatically; 1–3★ never show.
//
// Setup: set FEATURABLE_WIDGET_ID in the Vercel env (optional FEATURABLE_API_KEY).
// Until that's set — or if the feed is ever unreachable — we fall back to the
// hand-verified real reviews below, so this section never breaks or goes empty.
// ─────────────────────────────────────────────────────────────────────────────

export type Review = {
  quote: string;
  author: string;
  rating: number;
  avatarUrl?: string;
  date?: string;
};

export type ReviewsResult = {
  reviews: Review[];
  aggregateRating: number;
  totalCount: number;
  source: "featurable" | "fallback";
};

// Only show reviews at or above this star rating.
export const MIN_RATING = 4;

// Real, verified 5★ Google reviews from Crafted's Google Business Profile.
// Used until the live Featurable feed is wired up, and as a safety net if it fails.
export const FALLBACK_REVIEWS: Review[] = [
  {
    author: "Myranda Falk",
    rating: 5,
    quote:
      "Crafted renovated our kitchen, flooring, and the interior of our home — incredible work. Tylor and Jim were both awesome. Communication was great, timing was as planned, and quality of work was amazing. Our home is beautiful now!",
  },
  {
    author: "Darrell Smith",
    rating: 5,
    quote:
      "They took our outdated kitchen and made it bright, open, and modern. The whole crew did a great job and were very professional. They completed the project within the timeline promised — the quality of their work and materials is excellent. We love our new kitchen!",
  },
  {
    author: "Kathy Paro",
    rating: 5,
    quote:
      "Tylor and crew did a great job on our kitchen and bath. He communicates all the way through the job and makes sure you are happy till the last piece is done. We LOVE our kitchen and would most definitely use them again and refer them to friends.",
  },
];

// Featurable exposes two shapes across its plans; normalize both defensively.
function toRating(r: unknown): number {
  if (typeof r === "number") return r;
  if (r && typeof r === "object" && typeof (r as { value?: number }).value === "number") {
    return (r as { value: number }).value;
  }
  const words: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  if (typeof r === "string") {
    if (words[r]) return words[r];
    const n = Number(r);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

type RawReview = Record<string, any>;

function normalize(raw: RawReview): Review | null {
  const author =
    raw?.reviewer?.displayName ??
    raw?.author?.name ??
    (typeof raw?.author === "string" ? raw.author : undefined) ??
    "Google Reviewer";
  const quote = String(raw?.comment ?? raw?.text ?? "").trim();
  const rating = toRating(raw?.starRating ?? raw?.rating);
  const avatarUrl = raw?.reviewer?.profilePhotoUrl ?? raw?.author?.avatarUrl;
  const date = raw?.createTime ?? raw?.publishedAt ?? raw?.createdAt;
  if (!quote) return null;
  return { author, quote, rating, avatarUrl, date };
}

function fallbackResult(limit?: number): ReviewsResult {
  return {
    reviews: limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS,
    aggregateRating: 4.9,
    totalCount: 41,
    source: "fallback",
  };
}

/**
 * Fetch Crafted's Google reviews (4★+), newest-first as Featurable orders them.
 * Refreshes daily. Never throws — always returns a usable result.
 */
export async function getGoogleReviews(limit?: number): Promise<ReviewsResult> {
  const widgetId = process.env.FEATURABLE_WIDGET_ID;
  if (!widgetId) return fallbackResult(limit);

  try {
    const res = await fetch(`https://featurable.com/api/v1/widgets/${widgetId}`, {
      next: { revalidate: 86400 }, // refresh once a day (Featurable itself syncs Google ~48h)
      headers: process.env.FEATURABLE_API_KEY
        ? { "X-API-Key": process.env.FEATURABLE_API_KEY }
        : {},
    });
    if (!res.ok) return fallbackResult(limit);

    const data = await res.json();
    const rawReviews: RawReview[] = data?.reviews ?? data?.widget?.reviews ?? [];
    const reviews = rawReviews
      .map(normalize)
      .filter((r): r is Review => r !== null && r.rating >= MIN_RATING);

    if (reviews.length === 0) return fallbackResult(limit);

    const aggregateRating = Number(
      data?.averageRating ?? data?.widget?.gbpLocationSummary?.rating ?? 4.9,
    );
    const totalCount = Number(
      data?.totalReviewCount ?? data?.widget?.gbpLocationSummary?.reviewsCount ?? reviews.length,
    );

    return {
      reviews: limit ? reviews.slice(0, limit) : reviews,
      aggregateRating: Number.isFinite(aggregateRating) ? aggregateRating : 4.9,
      totalCount: Number.isFinite(totalCount) ? totalCount : reviews.length,
      source: "featurable",
    };
  } catch {
    return fallbackResult(limit);
  }
}
