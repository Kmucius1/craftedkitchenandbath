// ─────────────────────────────────────────────────────────────────────────────
// Google reviews feed — pulled straight from the Google Places API (Place Details).
//
// How it works:
//   • We call Google Place Details for Crafted's Google Business Profile
//     (PLACE_ID below) once a day and read its rating, total count, and reviews
//     (sorted newest-first).
//   • We keep only 4★+ reviews (MIN_RATING); the site renders them in Crafted's
//     own styling. New reviews Google surfaces show up automatically; low ones
//     never appear.
//   • Google returns up to 5 individual reviews per call (an API limitation) plus
//     the true aggregate rating + total count (e.g. 4.9 · 41 reviews).
//   • Uses the same API key EHM Strategies uses (enabled for the legacy Places API).
//
// Setup: set GOOGLE_PLACES_API_KEY in the Vercel env (server-side only — the key
//   is never sent to the browser). Optionally override GOOGLE_PLACE_ID.
// Until the key is set — or if the API is ever unreachable — we fall back to the
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
  source: "google" | "fallback";
};

// Only show reviews at or above this star rating.
export const MIN_RATING = 4;

// Crafted Kitchen and Bath — verified Google Place ID (Oldsmar, FL).
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJBX3Sf3ThwogRfasm-zec18Y";

// Real, verified 5★ Google reviews from Crafted's Google Business Profile.
// Used until the live API key is wired up, and as a safety net if it fails.
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

type GooglePlaceReview = {
  rating?: number;
  text?: string;
  author_name?: string;
  profile_photo_url?: string;
  relative_time_description?: string;
};

function normalize(raw: GooglePlaceReview): Review | null {
  const quote = String(raw?.text ?? "").trim();
  if (!quote) return null;
  return {
    quote,
    author: raw?.author_name ?? "Google Reviewer",
    rating: typeof raw?.rating === "number" ? raw.rating : 0,
    avatarUrl: raw?.profile_photo_url,
    date: raw?.relative_time_description,
  };
}

function fallbackResult(limit?: number, aggregateRating = 4.9, totalCount = 41): ReviewsResult {
  return {
    reviews: limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS,
    aggregateRating,
    totalCount,
    source: "fallback",
  };
}

/**
 * Fetch Crafted's Google reviews (4★+) via the Google Places API (New).
 * Refreshes daily. Never throws — always returns a usable result. When the API
 * returns the aggregate but no usable individual reviews, we keep the real
 * aggregate (rating + count) and fall back to curated review cards.
 */
export async function getGoogleReviews(limit?: number): Promise<ReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return fallbackResult(limit);

  try {
    const params = new URLSearchParams({
      place_id: PLACE_ID,
      fields: "rating,user_ratings_total,reviews",
      reviews_sort: "newest",
      key: apiKey,
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      { next: { revalidate: 86400 } }, // refresh once a day
    );
    if (!res.ok) return fallbackResult(limit);

    const data = await res.json();
    if (data?.status !== "OK") return fallbackResult(limit);
    const result = data.result ?? {};
    const aggregateRating = Number(result?.rating);
    const totalCount = Number(result?.user_ratings_total);
    const safeAgg = Number.isFinite(aggregateRating) ? aggregateRating : 4.9;
    const safeCount = Number.isFinite(totalCount) ? totalCount : 41;

    const reviews = (Array.isArray(result?.reviews) ? result.reviews : [])
      .map(normalize)
      .filter((r: Review | null): r is Review => r !== null && r.rating >= MIN_RATING);

    // No usable individual reviews came back, but the aggregate is real — keep it.
    if (reviews.length === 0) return fallbackResult(limit, safeAgg, safeCount);

    return {
      reviews: limit ? reviews.slice(0, limit) : reviews,
      aggregateRating: safeAgg,
      totalCount: safeCount,
      source: "google",
    };
  } catch {
    return fallbackResult(limit);
  }
}
