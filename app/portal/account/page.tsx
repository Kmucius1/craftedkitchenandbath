"use client";

import { useEffect, useState } from "react";
import { createPortalBrowserClient } from "@/lib/supabase-browser";
import PortalShell from "@/components/portal/PortalShell";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

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

export default function PortalAccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createPortalBrowserClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    const supabase = createPortalBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSuccess(true);
    setPassword("");
    setConfirm("");
  }

  return (
    <PortalShell>
      <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 28, color: "#1A202C", margin: "0 0 24px" }}>
        Account
      </h1>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px", maxWidth: 420 }}>
        {email && (
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Email address</div>
            <div style={{ fontSize: 14, color: "#1A202C" }}>{email}</div>
          </div>
        )}

        <div style={{ fontSize: 13, fontWeight: 700, color: "#1A202C", marginBottom: 4 }}>Set a Password</div>
        <p style={{ fontSize: 12.5, color: "#6B7280", margin: "0 0 16px", lineHeight: 1.6 }}>
          Set a password so you can sign in directly next time, instead of waiting on an email link.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label htmlFor="password" style={labelStyle}>New password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="confirm" style={labelStyle}>Confirm password</label>
            <input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" style={inputStyle} />
          </div>
          {error && <p style={{ fontSize: 12.5, color: "#B91C1C", margin: 0 }}>{error}</p>}
          {success && <p style={{ fontSize: 12.5, color: "#15803D", margin: 0 }}>Password updated — you can now sign in with it directly.</p>}
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
              alignSelf: "flex-start",
            }}
          >
            {submitting ? "Saving…" : "Save Password"}
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
