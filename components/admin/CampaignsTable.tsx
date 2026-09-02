"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Campaign } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";

export type CampaignWithStats = Campaign & { leadCount: number; wonCount: number };

type FormState = {
  name: string;
  channel: string;
  utm_campaign_key: string;
  start_date: string;
  end_date: string;
  budget: string;
  notes: string;
};

const emptyForm: FormState = { name: "", channel: "", utm_campaign_key: "", start_date: "", end_date: "", budget: "", notes: "" };

function toForm(c: CampaignWithStats): FormState {
  return {
    name: c.name,
    channel: c.channel || "",
    utm_campaign_key: c.utm_campaign_key || "",
    start_date: c.start_date || "",
    end_date: c.end_date || "",
    budget: c.budget != null ? String(c.budget) : "",
    notes: c.notes || "",
  };
}

function fmtMoney(n: number | null): string {
  if (n == null) return "—";
  return `$${n.toLocaleString()}`;
}

const CHANNELS = ["google_ads", "facebook", "instagram", "email", "organic", "referral", "direct", "other"];

export default function CampaignsTable({ initialCampaigns }: { initialCampaigns: CampaignWithStats[] }) {
  const router = useRouter();
  const [campaigns] = useState<CampaignWithStats[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter((c) => [c.name, c.channel, c.utm_campaign_key].filter(Boolean).some((v) => (v as string).toLowerCase().includes(q)));
  }, [campaigns, search]);

  function startEdit(c: CampaignWithStats) {
    setShowCreate(false);
    setEditingId(c.id);
    setForm(toForm(c));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowCreate(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/campaigns", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
      });
      if (res.ok) {
        setShowCreate(false);
        setEditingId(null);
        router.refresh();
      }
    } finally {
      setSaving(false);
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

  const formOpen = showCreate || !!editingId;

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      <AdminNav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: 28, fontWeight: 300, color: "#1A202C", margin: 0 }}>
            Campaigns
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>{campaigns.length} campaigns</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={formOpen ? () => { setShowCreate(false); setEditingId(null); } : startCreate} style={btnSecondary}>
            {formOpen ? "Cancel" : "New Campaign"}
          </button>
          <button onClick={logout} style={btnGhost}>Sign out</button>
        </div>
      </div>

      {formOpen && (
        <form onSubmit={save} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 16, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <input required placeholder="Campaign name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={inputStyle} />
          <select value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="">Channel…</option>
            {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="utm_campaign key" value={form.utm_campaign_key} onChange={(e) => setForm((f) => ({ ...f, utm_campaign_key: e.target.value }))} style={inputStyle} />
          <input type="date" placeholder="Start date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} style={inputStyle} />
          <input type="date" placeholder="End date" value={form.end_date} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} style={inputStyle} />
          <input type="number" step="0.01" placeholder="Budget" value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} style={inputStyle} />
          <input placeholder="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
          <button type="submit" disabled={saving} style={{ ...btnSecondary, gridColumn: "1 / -1", justifySelf: "start" }}>
            {saving ? "Saving…" : editingId ? "Save Changes" : "Create Campaign"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search name, channel, utm key…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: "1 1 260px", minWidth: 200 }}
        />
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Channel</th>
                <th style={th}>Dates</th>
                <th style={th}>Budget</th>
                <th style={th}>Leads</th>
                <th style={th}>Won</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={7}>No campaigns yet.</td></tr>
              )}
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td style={{ ...td, fontWeight: 600 }}>
                    {c.name}
                    {c.utm_campaign_key && <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "monospace" }}>{c.utm_campaign_key}</div>}
                  </td>
                  <td style={td}>{c.channel || "—"}</td>
                  <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>
                    {c.start_date || "—"}{c.end_date ? ` → ${c.end_date}` : ""}
                  </td>
                  <td style={td}>{fmtMoney(c.budget)}</td>
                  <td style={td}>{c.leadCount}</td>
                  <td style={td}>{c.wonCount}</td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button onClick={() => startEdit(c)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>Edit</button>
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
