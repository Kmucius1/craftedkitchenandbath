"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortalBrowserClient } from "@/lib/supabase-browser";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const bodyFont = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  padding: "11px 12px",
  fontSize: 14,
  color: "#1A202C",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#6B7280",
  marginBottom: 6,
  fontWeight: 600,
};

export default function PortalLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "link">("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkSent, setLinkSent] = useState(false);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !email.trim() || !password) return;
    setSubmitting(true);
    setError(null);
    const supabase = createPortalBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (signInError) {
      setError("That email and password don't match. Try again, or email yourself a sign-in link below.");
      return;
    }
    router.push("/portal");
    router.refresh();
  }

  async function handleLinkSubmit(e: React.FormEvent) {
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
      setLinkSent(true);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A202C",
        padding: "24px",
        fontFamily: bodyFont,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Crafted Kitchen & Bath" style={{ width: 180, maxWidth: "60%", height: "auto", filter: "brightness(0) invert(1)" }} />
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "36px 32px" }}>
          <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 24, color: "#1A202C", margin: "0 0 6px" }}>
            Client Portal
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 24px", lineHeight: 1.6 }}>
            Sign in to track your project&apos;s schedule, selections, and updates.
          </p>

          <div style={{ display: "flex", gap: 4, background: "#F7F8FA", borderRadius: 8, padding: 4, marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => { setMode("password"); setError(null); }}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                border: "none",
                background: mode === "password" ? "#fff" : "transparent",
                boxShadow: mode === "password" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                fontSize: 12.5,
                fontWeight: 700,
                color: mode === "password" ? "#1A202C" : "#6B7280",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => { setMode("link"); setError(null); }}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                border: "none",
                background: mode === "link" ? "#fff" : "transparent",
                boxShadow: mode === "link" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                fontSize: 12.5,
                fontWeight: 700,
                color: mode === "link" ? "#1A202C" : "#6B7280",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Email Link
            </button>
          </div>

          {mode === "password" ? (
            <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Email address</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
              </div>
              {error && <p style={{ fontSize: 12.5, color: "#B91C1C", margin: 0, lineHeight: 1.5 }}>{error}</p>}
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
                {submitting ? "Signing in…" : "Sign In"}
              </button>
              <p style={{ fontSize: 12, color: "#6B7280", margin: 0, textAlign: "center" }}>
                Don&apos;t have a password yet?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("link"); setError(null); }}
                  style={{ color: "#2B7CC1", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textDecoration: "underline" }}
                >
                  Email me a sign-in link
                </button>
              </p>
            </form>
          ) : linkSent ? (
            <p style={{ fontSize: 14, color: "#1A202C", lineHeight: 1.7 }}>
              If <strong>{email.trim()}</strong> has portal access, a sign-in link is on its way — check your inbox.
              Once you&apos;re in, you can set a password from your Account page for faster sign-in next time.
            </p>
          ) : (
            <form onSubmit={handleLinkSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label htmlFor="linkEmail" style={labelStyle}>Email address</label>
                <input id="linkEmail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
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

          <p style={{ fontSize: 12, color: "#6B7280", marginTop: 24, marginBottom: 0, lineHeight: 1.6 }}>
            Don&apos;t have portal access yet? Ask your project manager to send you an invite, or call us at{" "}
            <a href="tel:+17273837550" style={{ color: "#2B7CC1" }}>
              (727) 383-7550
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
