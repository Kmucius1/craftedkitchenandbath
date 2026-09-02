// First-touch lead-source/campaign attribution, captured client-side and
// carried through to whichever form a visitor eventually submits.
//
// `components/CampaignCapture.tsx` (mounted once in app/layout.tsx) stashes
// this on first page load; ContactForm/QuoteWizard/ConsultationForm read it
// via getStoredAttribution() and include it in their POST body so it survives
// navigation to /quote or /contact without the query params still being present.

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referral_code: string | null;
  landing_page: string | null;
};

export const ATTRIBUTION_STORAGE_KEY = "ck_attribution";

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  referral_code: null,
  landing_page: null,
};

/** Captures UTM/referral params from the current URL, if any are present. */
export function captureAttributionFromLocation(): Attribution | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referral_code: params.get("ref"),
    landing_page: window.location.pathname,
  };
  const hasAny = Object.values(attribution).some((v, i) => i < 6 && v);
  return hasAny ? attribution : null;
}

/** Stores first-touch attribution — never overwrites an existing record. */
export function storeAttributionIfAbsent(attribution: Attribution): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)) return;
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — attribution is
    // best-effort, never blocks the visit.
  }
}

/** Reads whatever attribution was captured earlier in this session, if any. */
export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return EMPTY_ATTRIBUTION;
    return { ...EMPTY_ATTRIBUTION, ...JSON.parse(raw) };
  } catch {
    return EMPTY_ATTRIBUTION;
  }
}

/** Best-guess `leads.channel` from whatever attribution came through — the
 *  admin "Log a call" action and the chat widget set a more specific channel
 *  themselves; this is only the fallback for the two public web forms. */
export function deriveChannel(attribution: Partial<Attribution> | null | undefined): string {
  if (!attribution) return "organic_web";
  if (attribution.referral_code) return "referral";
  if (attribution.utm_source) return "paid";
  return "organic_web";
}

/** Trims an Attribution payload from a form POST into insert-ready `leads`
 *  columns (server-side; safe against a client sending garbage/missing data). */
export function attributionColumns(attribution: Partial<Attribution> | null | undefined) {
  const a = attribution || {};
  const clean = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
  return {
    utm_source: clean(a.utm_source),
    utm_medium: clean(a.utm_medium),
    utm_campaign: clean(a.utm_campaign),
    utm_term: clean(a.utm_term),
    utm_content: clean(a.utm_content),
    referral_code: clean(a.referral_code),
    landing_page: clean(a.landing_page),
    channel: deriveChannel(a),
  };
}
