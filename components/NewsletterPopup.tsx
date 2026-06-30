"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * First-visit newsletter popup. Appears once, after a short delay, on content
 * pages only. Dismissal and successful signup are both remembered in
 * localStorage so it never nags a returning visitor. Closes on overlay click or
 * Esc. Suppressed on admin pages and on the pages where the visitor is already
 * converting (quote / contact).
 */
const STORAGE_KEY = "ckb_newsletter_v1"; // value: "dismissed" | "subscribed"
const DELAY_MS = 9000;
const ACCENT = "#2B7CC1";
const INK = "#111822";

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const suppressed =
    pathname?.startsWith("/admin") ||
    pathname === "/quote" ||
    pathname === "/contact";

  useEffect(() => {
    if (suppressed) return;
    if (typeof window === "undefined") return;
    let seen: string | null = null;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      seen = "dismissed"; // storage blocked → don't pester
    }
    if (seen) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [suppressed]);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function remember(value: "dismissed" | "subscribed") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }

  function close() {
    setOpen(false);
    if (status !== "done") remember("dismissed");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("done");
      remember("subscribed");
      window.setTimeout(() => setOpen(false), 2600);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join our newsletter"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(17,24,34,0.55)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "ckbFade 0.25s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55)",
          animation: "ckbRise 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.85)",
            color: "#6B7280",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Accent header band */}
        <div style={{ backgroundColor: INK, padding: "30px 32px 26px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, margin: "0 0 12px" }}>
            Crafted Kitchen &amp; Bath
          </p>
          <h2 style={{ fontFamily: "var(--font-display),'Montserrat',system-ui,sans-serif", fontWeight: 300, fontSize: "26px", color: "#fff", margin: 0, lineHeight: 1.25 }}>
            Remodeling Inspiration, <br />Straight to Your Inbox
          </h2>
        </div>

        <div style={{ padding: "28px 32px 34px" }}>
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "12px 0 6px" }}>
              <span style={{ display: "inline-flex", width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(43,124,193,0.1)", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
                  <path d="M14 22.5L19.5 28L30 16" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p style={{ fontFamily: "var(--font-display),'Montserrat',system-ui,sans-serif", fontSize: "20px", fontWeight: 300, color: INK, margin: "0 0 8px" }}>You&apos;re on the list!</p>
              <p style={{ fontSize: "14px", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>Thanks for joining — keep an eye out for tips, before-and-afters, and exclusive offers.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "14px", color: "#4A5568", margin: "0 0 22px", lineHeight: 1.65, textAlign: "center" }}>
                Get design tips, real Tampa Bay transformations, and the occasional exclusive offer. No spam — unsubscribe anytime.
              </p>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                  <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={name}
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.16)")}
                />
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.16)")}
                />
                {error && <p style={{ color: "#C53030", fontSize: "12.5px", margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    marginTop: "4px",
                    backgroundColor: ACCENT,
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "15px 0",
                    fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    cursor: status === "sending" ? "default" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "sending" ? "Joining…" : "Join the Newsletter"}
                </button>
              </form>
              <button
                type="button"
                onClick={close}
                style={{ display: "block", margin: "16px auto 0", background: "none", border: "none", color: "#9AA3AF", fontSize: "12px", cursor: "pointer", letterSpacing: "0.02em" }}
              >
                No thanks, maybe later
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ckbFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ckbRise { from { opacity: 0; transform: translateY(18px) scale(0.98) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) {
          [role="dialog"], [role="dialog"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.16)",
  borderRadius: "4px",
  padding: "13px 15px",
  fontSize: "15px",
  color: "#1A202C",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s ease",
};
