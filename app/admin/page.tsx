"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Login failed");
      const next = params.get("next") || "/admin/leads";
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
            fontSize: 30,
            fontWeight: 300,
            color: "#1A202C",
            margin: 0,
          }}
        >
          Crafted — Admin
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>Sign in to view website leads.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="password" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B7280" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          style={{
            width: "100%",
            border: "1px solid rgba(0,0,0,0.18)",
            borderRadius: 2,
            padding: "12px 14px",
            fontSize: 14,
            color: "#1A202C",
            outline: "none",
          }}
        />
      </div>
      {error && <p role="alert" style={{ color: "#B91C1C", fontSize: 13, margin: 0 }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? "#7FA9CB" : "#2B7CC1",
          color: "#fff",
          border: "none",
          borderRadius: 2,
          padding: "13px 24px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#F7F8FA",
      }}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
