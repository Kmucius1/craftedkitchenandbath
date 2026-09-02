"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PROJECT_PHASES, type Project, type ProjectPhase } from "@/lib/db";

const PHASE_COLORS: Record<ProjectPhase, { bg: string; fg: string }> = {
  discovery: { bg: "#EBF4FF", fg: "#1E5C96" },
  design: { bg: "#EDE9FE", fg: "#5B21B6" },
  selections: { bg: "#FEF6E7", fg: "#92670B" },
  preconstruction: { bg: "#FEF6E7", fg: "#92670B" },
  build: { bg: "#FFF0E5", fg: "#B45309" },
  final_walkthrough: { bg: "#E0F2FE", fg: "#0369A1" },
  completed: { bg: "#E7F6EC", fg: "#1A7A3D" },
  on_hold: { bg: "#FDECEC", fg: "#B91C1C" },
};

function phaseLabel(phase: ProjectPhase): string {
  return phase.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function exportCSV(projects: Project[]) {
  const headers = ["Created", "Title", "Category", "City", "Phase", "Status", "Contract Total", "Project Value", "Portal Enabled"];
  const rows = projects.map((p) => [
    p.created_at, p.title, p.category || "", p.city || "", phaseLabel(p.phase), p.status,
    p.contract_total ?? "", p.project_value ?? "", p.portal_enabled ? "Yes" : "No",
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crafted-projects-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [phaseFilter, setPhaseFilter] = useState<string>("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (phaseFilter && p.phase !== phaseFilter) return false;
      if (!q) return true;
      return [p.title, p.category, p.city, p.description]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [projects, search, phaseFilter]);

  const th: React.CSSProperties = {
    textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
    color: "#6B7280", fontWeight: 600, padding: "10px 12px", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap",
  };
  const td: React.CSSProperties = {
    fontSize: 13, color: "#1F2937", padding: "12px", borderBottom: "1px solid #F1F3F5", verticalAlign: "top",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: 28, fontWeight: 300, color: "#1A202C", margin: 0 }}>
            Projects
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
            {filtered.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => exportCSV(filtered)} style={btnSecondary}>Export CSV</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search title, category, city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 260px", minWidth: 200, border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", outline: "none" }}
        />
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value)}
          style={{ border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", cursor: "pointer" }}
        >
          <option value="">All phases</option>
          {PROJECT_PHASES.map((p) => <option key={p} value={p}>{phaseLabel(p)}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Title</th>
                <th style={th}>Category</th>
                <th style={th}>City</th>
                <th style={th}>Phase</th>
                <th style={th}>Completed</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td style={{ ...td, textAlign: "center", color: "#6B7280", padding: 40 }} colSpan={6}>No projects yet.</td></tr>
              )}
              {filtered.map((p) => {
                const c = PHASE_COLORS[p.phase] || PHASE_COLORS.discovery;
                return (
                  <tr key={p.id}>
                    <td style={{ ...td, fontWeight: 600 }}>{p.title}</td>
                    <td style={td}>{p.category || "—"}</td>
                    <td style={td}>{p.city || "—"}</td>
                    <td style={td}>
                      <span style={{ background: c.bg, color: c.fg, borderRadius: 999, padding: "5px 10px", fontSize: 12, fontWeight: 600 }}>
                        {phaseLabel(p.phase)}
                      </span>
                    </td>
                    <td style={{ ...td, color: "#6B7280" }}>{fmtDate(p.completed_date)}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <Link href={`/admin/projects/${p.id}`} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11, textDecoration: "none", display: "inline-block" }}>
                        Manage
                      </Link>
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
