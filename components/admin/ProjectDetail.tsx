"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECT_PHASES, type Project, type ProjectPhase } from "@/lib/db";

const MODULE_KEYS = ["selections", "schedule", "budget", "approvals", "updates", "messages", "documents", "punch_list"] as const;
const STATUS_OPTIONS = ["active", "on_hold", "completed", "cancelled"] as const;

function phaseLabel(phase: string): string {
  return phase.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const label: React.CSSProperties = {
  fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", marginBottom: 6, fontWeight: 600, display: "block",
};
const input: React.CSSProperties = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1F2937", background: "#fff", outline: "none",
};
const card: React.CSSProperties = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 20 };
const sectionTitle: React.CSSProperties = { fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "#2B7CC1", marginBottom: 14, fontWeight: 600 };

export default function ProjectDetail({ project }: { project: Project }) {
  const [form, setForm] = useState({
    title: project.title,
    category: project.category || "",
    city: project.city || "",
    address: project.address || "",
    description: project.description || "",
    phase: project.phase,
    status: project.status,
    pm_name: project.pm_name || "",
    pm_email: project.pm_email || "",
    pm_phone: project.pm_phone || "",
    contract_total: project.contract_total?.toString() || "",
    featured: project.featured,
    portal_enabled: project.portal_enabled,
    enabled_modules: project.enabled_modules || {},
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [inviting, setInviting] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function toggleModule(key: string) {
    set("enabled_modules", { ...form.enabled_modules, [key]: !form.enabled_modules[key] });
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          ...form,
          contract_total: form.contract_total ? Number(form.contract_total) : null,
        }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  async function invite() {
    setInviting(true);
    setInviteStatus(null);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Could not send invite.");
      setInviteStatus({ ok: true, message: `Invited ${inviteEmail} to the portal.` });
      setInviteEmail("");
    } catch (err) {
      setInviteStatus({ ok: false, message: err instanceof Error ? err.message : "Could not send invite." });
    } finally {
      setInviting(false);
    }
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <Link href="/admin/projects" style={{ fontSize: 12, color: "#6B7280", textDecoration: "none" }}>← Projects</Link>
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: 26, fontWeight: 300, color: "#1A202C", margin: "4px 0 0" }}>
            {project.title}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ fontSize: 12, color: "#1A7A3D" }}>Saved</span>}
          <a href={`/portal/${project.id}`} target="_blank" rel="noopener noreferrer" style={btnGhost}>
            Preview as client →
          </a>
          <button onClick={save} disabled={saving} style={btnPrimary}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Project details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={label}>Title</label>
            <input style={input} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <label style={label}>Category</label>
            <input style={input} value={form.category} onChange={(e) => set("category", e.target.value)} />
          </div>
          <div>
            <label style={label}>City</label>
            <input style={input} value={form.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div>
            <label style={label}>Address</label>
            <input style={input} value={form.address} onChange={(e) => set("address", e.target.value)} />
          </div>
        </div>
        <label style={label}>Description</label>
        <textarea style={{ ...input, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div style={card}>
        <div style={sectionTitle}>Status</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={label}>Phase</label>
            <select style={input} value={form.phase} onChange={(e) => set("phase", e.target.value as ProjectPhase)}>
              {PROJECT_PHASES.map((p) => <option key={p} value={p}>{phaseLabel(p)}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Status</label>
            <select style={input} value={form.status} onChange={(e) => set("status", e.target.value as typeof form.status)}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{phaseLabel(s)}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Contract total</label>
            <input style={input} type="number" value={form.contract_total} onChange={(e) => set("contract_total", e.target.value)} />
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1F2937", cursor: "pointer" }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          Featured on /our-work
        </label>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Project manager</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div>
            <label style={label}>Name</label>
            <input style={input} value={form.pm_name} onChange={(e) => set("pm_name", e.target.value)} />
          </div>
          <div>
            <label style={label}>Email</label>
            <input style={input} value={form.pm_email} onChange={(e) => set("pm_email", e.target.value)} />
          </div>
          <div>
            <label style={label}>Phone</label>
            <input style={input} value={form.pm_phone} onChange={(e) => set("pm_phone", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Client portal</div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1F2937", cursor: "pointer", marginBottom: 16 }}>
          <input type="checkbox" checked={form.portal_enabled} onChange={(e) => set("portal_enabled", e.target.checked)} />
          Portal enabled for this project
        </label>

        <label style={label}>Enabled modules</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {MODULE_KEYS.map((key) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1F2937", cursor: "pointer" }}>
              <input type="checkbox" checked={!!form.enabled_modules[key]} onChange={() => toggleModule(key)} />
              {phaseLabel(key)}
            </label>
          ))}
        </div>

        <label style={label}>Invite homeowner</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{ ...input, flex: 1 }}
            type="email"
            placeholder="homeowner@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button onClick={invite} disabled={inviting || !inviteEmail} style={btnPrimary}>
            {inviting ? "Inviting…" : "Invite"}
          </button>
        </div>
        {inviteStatus && (
          <p style={{ fontSize: 12, marginTop: 8, color: inviteStatus.ok ? "#1A7A3D" : "#B91C1C" }}>{inviteStatus.message}</p>
        )}
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#2B7CC1", color: "#fff", border: "none", borderRadius: 6,
  padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  background: "#fff", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 6,
  padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", textDecoration: "none",
};
