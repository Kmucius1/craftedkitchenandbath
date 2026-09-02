"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { REVIEW_REQUEST_STATUSES, type ReviewRequest, type ReviewRequestStatus } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";

const STATUS_COLORS: Record<ReviewRequestStatus, { bg: string; fg: string }> = {
  pending: { bg: "#EBF4FF", fg: "#1E5C96" },
  sent: { bg: "#FEF6E7", fg: "#92670B" },
  completed: { bg: "#E7F6EC", fg: "#1A7A3D" },
  declined: { bg: "#FDECEC", fg: "#B91C1C" },
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function exportCSV(reviews: ReviewRequest[]) {
  const headers = ["Created", "Customer", "Email", "Phone", "Status", "Sent", "Review Link"];
  const rows = reviews.map((r) => [
    r.created_at, r.customer_name, r.customer_email || "", r.customer_phone || "",
    r.status, r.sent_at || "", r.review_link || "",
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crafted-review-requests-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const emptyForm = { customer_name: "", customer_email: "", customer_phone: "", lead_id: "" };

export default function ReviewsTable({ initialReviews }: { initialReviews: ReviewRequest[] }) {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewRequest[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reviews.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (!q) return true;
      return [r.customer_name, r.customer_email, r.customer_phone].filter(Boolean).some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [reviews, search, statusFilter]);

  async function patchStatus(id: string, status: ReviewRequestStatus) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      router.refresh();
    }
  }

  async function sendRequest(id: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/reviews/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: "sent", sent_at: new Date().toISOString() } : r)));
      } else {
        router.refresh();
      }
    } catch {
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function createReview(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customer_name.trim()) return;
    setBusyId("__create__");
    try {
      const res = await fetch("/api/admin/reviews", {
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
      setBusyId(null);
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
            Review Requests
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
            {filtered.length} of {reviews.length} {reviews.length === 1 ? "request" : "requests"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowForm((s) => !s)} style={btnSecondary}>{showForm ? "Cancel" : "New Request"}</button>
          <button onClick={() => exportCSV(filtered)} style={btnGhost}>Export CSV</button>
          <button onClick={logout} style={btnGhost}>Sign out</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={createReview} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 16, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <input required placeholder="Customer name *" value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} style={inputStyle} />
          <input type="email" placeholder="Email" value={form.customer_email} onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))} style={inputStyle} />
          <input placeholder="Phone" value={form.customer_phone} onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))} style={inputStyle} />
          <input placeholder="Lead ID (optional)" value={form.lead_id} onChange={(e) => setForm((f) => ({ ...f, lead_id: e.target.value }))} style={inputStyle} />
          <button type="submit" disabled={busyId === "__create__"} style={{ ...btnSecondary, gridColumn: "1 / -1", justifySelf: "start" }}>
            {busyId === "__create__" ? "Creating…" : "Create Request"}
          </button>
        </form>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: "1 1 260px", minWidth: 200 }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value="">All statuses</option>
          {REVIEW_REQUEST_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Created</th>
                <th style={th}>Customer</th>
                <th style={th}>Contact</th>
                <th style={th}>Status</th>
                <th style={th}>Sent</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={6}>No review requests yet.</td></tr>
              )}
              {filtered.map((r) => {
                const c = STATUS_COLORS[r.status] || STATUS_COLORS.pending;
                return (
                  <tr key={r.id}>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>{fmtDate(r.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{r.customer_name}</td>
                    <td style={td}>
                      {r.customer_email && <a href={`mailto:${r.customer_email}`} style={{ color: "#2B7CC1", textDecoration: "none", display: "block" }}>{r.customer_email}</a>}
                      {r.customer_phone && <a href={`tel:${r.customer_phone}`} style={{ color: "#6B7280", textDecoration: "none", fontSize: 12 }}>{r.customer_phone}</a>}
                    </td>
                    <td style={td}>
                      <select
                        value={r.status}
                        onChange={(e) => patchStatus(r.id, e.target.value as ReviewRequestStatus)}
                        style={{ background: c.bg, color: c.fg, border: "none", borderRadius: 999, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", appearance: "none" }}
                      >
                        {REVIEW_REQUEST_STATUSES.map((s) => <option key={s} value={s} style={{ background: "#fff", color: "#1F2937" }}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>{fmtDate(r.sent_at)}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      {r.status === "pending" && (
                        <button onClick={() => sendRequest(r.id)} disabled={busyId === r.id} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>
                          {busyId === r.id ? "Sending…" : "Send request"}
                        </button>
                      )}
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
