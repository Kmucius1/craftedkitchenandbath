// Permission to call and text, including with automated technology / AI voice.
//
// The FCC treats AI-generated voices as "artificial voice" under the TCPA, and
// Florida's FTSA adds its own rules, so a call from the CRM's AI assistant needs
// the person's prior express written consent. This optional checkbox captures
// it. It is never a condition of getting a quote.
//
// The CRM reads `intake_payload.contact_consent` and only lets the AI caller
// dial when `given` is true and `version` is one its legal config accepts, so
// bump CONSENT_VERSION whenever CONSENT_TEXT changes. Have an attorney review
// any change before it ships.

export const CONSENT_VERSION = "2026-10-26";

export const CONSENT_TEXT =
  "Yes, Crafted Kitchen & Bath may call and text me at the number I entered about my project, " +
  "including calls from an AI assistant and other automated technology. Consent isn’t required " +
  "to get a quote. Msg & data rates may apply; reply STOP to opt out anytime.";

export type ContactConsent = {
  given: boolean;
  version: string;
  text: string;
  phone: string | null;
  at: string;
  ip: string | null;
  user_agent: string | null;
  page: string | null;
};

/**
 * The evidence record stored with the lead. Built on the server so the
 * timestamp, wording and IP can't be supplied by the browser; only the
 * checkbox state comes from the visitor.
 */
export function consentRecord(
  req: { headers: Headers },
  given: unknown,
  phone: string | null
): ContactConsent {
  const forwarded = req.headers.get("x-forwarded-for");
  return {
    given: given === true && !!phone,
    version: CONSENT_VERSION,
    text: CONSENT_TEXT,
    phone,
    at: new Date().toISOString(),
    ip: forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip"),
    user_agent: req.headers.get("user-agent"),
    page: req.headers.get("referer"),
  };
}
