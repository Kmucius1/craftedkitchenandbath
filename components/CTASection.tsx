interface CTASectionProps {
  headline?: string;
  subtext?: string;
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
}

export default function CTASection({
  headline = "Ready to Begin Your Remodel?",
  subtext = "Schedule a complimentary consultation with our team. We serve homeowners across Pinellas and Hillsborough County.",
  primaryCTA = "Get a Free Quote",
  primaryHref = "/contact",
  secondaryCTA = "Call (727) 383-7550",
  secondaryHref = "tel:+17273837550",
}: CTASectionProps) {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        padding: "112px 24px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "580px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        {/* Blue accent line above heading */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "#2B7CC1",
          }}
          aria-hidden="true"
        />

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: "#1A202C",
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#4A5568",
            margin: 0,
            maxWidth: "480px",
          }}
        >
          {subtext}
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ marginTop: "8px" }}
        >
          {/* Primary blue button */}
          <a
            href={primaryHref}
            className="
              inline-block
              text-[11px] font-medium uppercase tracking-[0.18em]
              px-9 py-4
              no-underline
              transition-colors duration-200
              bg-[#2B7CC1] text-white
              hover:bg-[#1E5C96]
            "
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
            }}
          >
            {primaryCTA}
          </a>

          {/* Secondary ghost outline button */}
          <a
            href={secondaryHref}
            className="
              inline-block
              text-[11px] font-medium uppercase tracking-[0.18em]
              px-9 py-4
              no-underline
              transition-colors duration-200
              bg-transparent text-[#1A202C]
              border border-[rgba(0,0,0,0.25)]
              hover:border-[#2B7CC1] hover:text-[#2B7CC1]
            "
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
            }}
          >
            {secondaryCTA}
          </a>
        </div>
      </div>
    </section>
  );
}
