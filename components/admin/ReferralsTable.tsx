"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { REFERRAL_STATUSES, type Referral, type ReferralStatus } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";

const STATUS_COLORS: Record<ReferralStatus, { bg: string; fg: string }> = {
  sent: { bg: "#FEF6E7", fg: "#92670B" },
  pending: { bg: "#EBF4FF", fg: "#1E5C96" },
  converted: { bg: "#E7F6EC", fg: "#1A7A3D" },
};

function referralLink(code: string): string {
  return `https://craftedkitchenandbath.com/quote?ref=${code}`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function exportCSV(referrals: Referral[]) {
  const headers = ["Created", "Referrer", "Email", "Code", "Link", "Status", "Reward Notes"];
  const rows = referrals.map((r) => [
    r.created_at, r.referrer_name, r.referrer_email || "", r.referral_code, referralLink(r.referral_code), r.status, r.reward_notes || "",
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crafted-referrals-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const emptyForm = { referrer_name: "", referrer_email: "", referrer_lead_id: "", reward_notes: "" };

export default function ReferralsTable({ initialReferrals }: { initialReferrals: Referral[] }) {
  const router = useRouter();
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return referrals.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (!q) return true;
      return [r.referrer_name, r.referrer_email, r.referral_code].filter(Boolean).some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [referrals, search, statusFilter]);

  async function patchStatus(id: string, status: ReferralStatus) {
    setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await fetch("/api/admin/referrals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      router.refresh();
    }
  }

  async function copyLink(id: string, code: string) {
    try {
      await navigator.clipboard.writeText(referralLink(code));
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      // clipboard unavailable — nothing to fall back to here.
    }
  }

  async function createReferral(e: React.FormEvent) {
    e.preventDefault();
    if (!form.referrer_name.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(emptyForm);
        setShowForm(false);
        router.refresh();
      }
    } finally {
      setCreating(false);
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
            Referrals
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
            {filtered.length} of {referrals.length} {referrals.length === 1 ? "referral" : "referrals"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowForm((s) => !s)} style={btnSecondary}>{showForm ? "Cancel" : "Create Referral"}</button>
          <button onClick={() => exportCSV(filtered)} style={btnGhost}>Export CSV</button>
          <button onClick={logout} style={btnGhost}>Sign out</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={createReferral} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 16, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <input required placeholder="Referrer name *" value={form.referrer_name} onChange={(e) => setForm((f) => ({ ...f, referrer_name: e.target.value }))} style={inputStyle} />
          <input type="email" placeholder="Referrer email" value={form.referrer_email} onChange={(e) => setForm((f) => ({ ...f, referrer_email: e.target.value }))} style={inputStyle} />
          <input placeholder="Referrer Lead ID (optional)" value={form.referrer_lead_id} onChange={(e) => setForm((f) => ({ ...f, referrer_lead_id: e.target.value }))} style={inputStyle} />
          <input placeholder="Reward notes (optional)" value={form.reward_notes} onChange={(e) => setForm((f) => ({ ...f, reward_notes: e.target.value }))} style={inputStyle} />
          <button type="submit" disabled={creating} style={{ ...btnSecondary, gridColumn: "1 / -1", justifySelf: "start" }}>
            {creating ? "Creating…" : "Create Referral"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search name, email, code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: "1 1 260px", minWidth: 200 }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value="">All statuses</option>
          {REFERRAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Created</th>
                <th style={th}>Referrer</th>
                <th style={th}>Code</th>
                <th style={th}>Status</th>
                <th style={th}>Reward Notes</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={6}>No referrals yet.</td></tr>
              )}
              {filtered.map((r) => {
                const c = STATUS_COLORS[r.status] || STATUS_COLORS.sent;
                return (
                  <tr key={r.id}>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>{fmtDate(r.created_at)}</td>
                    <td style={td}>
                      <div style={{ fontWeight: 600 }}>{r.referrer_name}</div>
                      {r.referrer_email && <div style={{ fontSize: 12, color: "#6B7280" }}>{r.referrer_email}</div>}
                    </td>
                    <td style={{ ...td, fontFamily: "monospace", fontSize: 12 }}>{r.referral_code}</td>
                    <td style={td}>
                      <select
                        value={r.status}
                        onChange={(e) => patchStatus(r.id, e.target.value as ReferralStatus)}
                        style={{ background: c.bg, color: c.fg, border: "none", borderRadius: 999, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", appearance: "none" }}
                      >
                        {REFERRAL_STATUSES.map((s) => <option key={s} value={s} style={{ background: "#fff", color: "#1F2937" }}>{s}</option>)}
                      </select>
                    </td>
                    <td style={td}>{r.reward_notes || "—"}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button onClick={() => copyLink(r.id, r.referral_code)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>
                        {copiedId === r.id ? "Copied!" : "Copy link"}
                      </button>
                    </td>
                  </tr>
                );
              })}
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
