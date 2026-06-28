"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/db";

const STATUS_COLORS: Record<LeadStatus, { bg: string; fg: string }> = {
  New: { bg: "#EBF4FF", fg: "#1E5C96" },
  Contacted: { bg: "#FEF6E7", fg: "#92670B" },
  Quoted: { bg: "#EDE9FE", fg: "#5B21B6" },
  Won: { bg: "#E7F6EC", fg: "#1A7A3D" },
  Lost: { bg: "#FDECEC", fg: "#B91C1C" },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function exportCSV(leads: Lead[]) {
  const headers = [
    "Created", "Name", "Email", "Phone", "Service", "City",
    "Preferred Contact", "Status", "Description", "Notes", "Source",
  ];
  const rows = leads.map((l) => [
    l.created_at, l.full_name, l.email, l.phone || "", l.service || "",
    l.city || "", l.contact_method || "", l.status, l.description || "",
    l.notes || "", l.source || "",
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crafted-leads-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.full_name, l.email, l.phone, l.city, l.service, l.description, l.notes]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [leads, search, statusFilter]);

  async function patchLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
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
    textAlign: "left",
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#6B7280",
    fontWeight: 600,
    padding: "10px 12px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  };
  const td: React.CSSProperties = {
    fontSize: 13,
    color: "#1F2937",
    padding: "12px",
    borderBottom: "1px solid #F1F3F5",
    verticalAlign: "top",
  };

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 300, color: "#1A202C", margin: 0 }}>
            Website Leads
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
            {filtered.length} of {leads.length} {leads.length === 1 ? "lead" : "leads"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => exportCSV(filtered)} style={btnSecondary}>Export CSV</button>
          <button onClick={logout} style={btnGhost}>Sign out</button>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search name, email, city, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 260px", minWidth: 200, border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", outline: "none" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", cursor: "pointer" }}
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Date</th>
                <th style={th}>Name</th>
                <th style={th}>Contact</th>
                <th style={th}>Service</th>
                <th style={th}>City</th>
                <th style={th}>Status</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={7}>No leads yet.</td></tr>
              )}
              {filtered.map((l) => {
                const c = STATUS_COLORS[l.status] || STATUS_COLORS.New;
                const isOpen = expanded === l.id;
                return (
                  <tr key={l.id}>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#6B7280" }}>{fmtDate(l.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{l.full_name}</td>
                    <td style={td}>
                      <a href={`mailto:${l.email}`} style={{ color: "#2B7CC1", textDecoration: "none", display: "block" }}>{l.email}</a>
                      {l.phone && <a href={`tel:${l.phone}`} style={{ color: "#6B7280", textDecoration: "none", fontSize: 12 }}>{l.phone}</a>}
                    </td>
                    <td style={td}>{l.service || "—"}</td>
                    <td style={td}>{l.city || "—"}</td>
                    <td style={td}>
                      <select
                        value={l.status}
                        onChange={(e) => patchLead(l.id, { status: e.target.value as LeadStatus })}
                        style={{ background: c.bg, color: c.fg, border: "none", borderRadius: 999, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", appearance: "none" }}
                      >
                        {LEAD_STATUSES.map((s) => <option key={s} value={s} style={{ background: "#fff", color: "#1F2937" }}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button onClick={() => setExpanded(isOpen ? null : l.id)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>
                        {isOpen ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.map((l) =>
                expanded === l.id ? (
                  <tr key={`${l.id}-detail`}>
                    <td colSpan={7} style={{ ...td, background: "#FAFBFC" }}>
                      <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
                        <div>
                          <div style={detailLabel}>Preferred contact</div>
                          <div style={{ fontSize: 13 }}>{l.contact_method || "—"}</div>
                        </div>
                        <div>
                          <div style={detailLabel}>Project description</div>
                          <div style={{ fontSize: 13, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{l.description || "—"}</div>
                        </div>
                        <div>
                          <div style={detailLabel}>Internal notes</div>
                          <textarea
                            defaultValue={l.notes || ""}
                            placeholder="Add a note…"
                            onBlur={(e) => {
                              if (e.target.value !== (l.notes || "")) patchLead(l.id, { notes: e.target.value });
                            }}
                            rows={3}
                            style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontFamily: "inherit", resize: "vertical" }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
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
const detailLabel: React.CSSProperties = {
  fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", marginBottom: 4, fontWeight: 600,
};
