"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ActivityLogEntry } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";

const TYPES = ["blog_post", "social_post", "press", "email_campaign", "other"];

const emptyForm = { type: "blog_post", title: "", url: "", channel: "", published_at: "", notes: "" };

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ActivityTable({ initialEntries }: { initialEntries: ActivityLogEntry[] }) {
  const router = useRouter();
  const [entries, setEntries] = useState<ActivityLogEntry[]>(initialEntries);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(emptyForm);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  async function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    try {
      await fetch("/api/admin/activity", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      router.refresh();
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  }

  const th: React.CSSProperties = {
    textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
    color: "#6B7280", fontWeight: 600, padding: "10px 12px", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap",
  };
  const td: React.CSSProperties = {
    fontSize: 13, color: "#1F2937", padding: "12px", borderBottom: "1px solid #F1F3F5", verticalAlign: "top",
  };
  const inputStyle: React.CSSProperties = {
    border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      <AdminNav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: 28, fontWeight: 300, color: "#1A202C", margin: 0 }}>
            Publishing Activity
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>{entries.length} entries</p>
        </div>
        <button onClick={logout} style={btnGhost}>Sign out</button>
      </div>

      <form onSubmit={addEntry} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 16, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input required placeholder="Title *" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} style={inputStyle} />
        <input placeholder="URL" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} style={inputStyle} />
        <input placeholder="Channel" value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))} style={inputStyle} />
        <input type="date" value={form.published_at} onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))} style={inputStyle} />
        <input placeholder="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={inputStyle} />
        <button type="submit" disabled={saving} style={{ ...btnSecondary, gridColumn: "1 / -1", justifySelf: "start" }}>
          {saving ? "Logging…" : "Log Activity"}
        </button>
      </form>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Published</th>
                <th style={th}>Type</th>
                <th style={th}>Title</th>
                <th style={th}>Channel</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={5}>No activity logged yet.</td></tr>
              )}
              {entries.map((e) => (
                <tr key={e.id}>
                  <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>{fmtDate(e.published_at)}</td>
                  <td style={td}>{e.type}</td>
                  <td style={td}>
                    {e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ color: "#2B7CC1", textDecoration: "none" }}>{e.title}</a> : e.title}
                    {e.notes && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{e.notes}</div>}
                  </td>
                  <td style={td}>{e.channel || "—"}</td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button onClick={() => removeEntry(e.id)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  background: "#2B7CC1", color: "#fff", border: "none", borderRadius: 6,
  padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  background: "#fff", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 6,
  padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
};
