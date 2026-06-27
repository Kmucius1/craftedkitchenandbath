import Link from "next/link";

const PHONE = "(727) 383-7550";
const PHONE_HREF = "tel:+17273837550";

// Fixed bottom bar on mobile only: one-tap Call + Free Quote. The biggest
// mobile conversion lever for a phone-driven contractor. Hidden on >= md.
export default function StickyMobileCTA() {
  return (
    <>
      <div
        className="sticky-mobile-cta"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 45,
          display: "none",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -2px 16px rgba(0,0,0,0.12)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <a
          href={PHONE_HREF}
          aria-label={`Call us at ${PHONE}`}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "15px 0",
            color: "#1A202C",
            fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textDecoration: "none",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M13 9.8v1.8a1.2 1.2 0 01-1.307 1.2 11.873 11.873 0 01-5.18-1.842A11.7 11.7 0 012.842 7.3a11.873 11.873 0 01-1.842-5.2A1.2 1.2 0 012.194 1H4a1.2 1.2 0 011.2 1.033c.076.58.217 1.15.42 1.7a1.2 1.2 0 01-.27 1.267L4.564 5.786A9.6 9.6 0 008.214 9.436l.786-.786a1.2 1.2 0 011.267-.27c.55.203 1.12.344 1.7.42A1.2 1.2 0 0113 9.8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Call
        </a>
        <Link
          href="/contact"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px 0",
            backgroundColor: "#2B7CC1",
            color: "#FFFFFF",
            fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Free Quote
        </Link>
      </div>
      {/* Spacer so the fixed bar never permanently covers the footer on mobile */}
      <div className="sticky-mobile-cta-spacer" style={{ display: "none", height: "52px" }} aria-hidden="true" />
      <style>{`
        @media (max-width: 767px) {
          .sticky-mobile-cta { display: flex !important; }
          .sticky-mobile-cta-spacer { display: block !important; }
        }
      `}</style>
    </>
  );
}
