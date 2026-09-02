"use client";

import { useState } from "react";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const bodyFont = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !email.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/portal/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F8FA",
        padding: "24px",
        fontFamily: bodyFont,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400, backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "40px 32px" }}>
        <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 26, color: "#1A202C", margin: "0 0 8px" }}>
          Client Portal
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 28px", lineHeight: 1.6 }}>
          Crafted Kitchen &amp; Bath — sign in to view your project.
        </p>

        {sent ? (
          <p style={{ fontSize: 14, color: "#1A202C", lineHeight: 1.7 }}>
            If <strong>{email.trim()}</strong> has portal access, a sign-in link is on its way — check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label htmlFor="email" style={{ display: "block", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", marginBottom: 6, fontWeight: 600 }}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "11px 12px", fontSize: 14, color: "#1A202C", outline: "none", fontFamily: "inherit" }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "#7FA9CB" : "#2B7CC1",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: submitting ? "default" : "pointer",
              }}
            >
              {submitting ? "Sending…" : "Email me a sign-in link"}
            </button>
          </form>
        )}

        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 24, lineHeight: 1.6 }}>
          Don&apos;t have portal access yet? Ask your project manager to send you an invite, or call us at{" "}
          <a href="tel:+17273837550" style={{ color: "#2B7CC1" }}>
            (727) 383-7550
          </a>
          .
        </p>
      </div>
    </div>
  );
}
