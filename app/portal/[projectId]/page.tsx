import Link from "next/link";
import { getSupabase, type Project, PROJECT_PHASES } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const card: React.CSSProperties = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 24 };
const sectionLabel: React.CSSProperties = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2B7CC1", fontWeight: 700, marginBottom: 12 };

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function PortalOverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const admin = getSupabase();

  const [{ data: project }, { data: nextMilestone }, { data: latestUpdate }] = await Promise.all([
    admin.from("projects").select("*").eq("id", projectId).single(),
    admin
      .from("schedule_milestones")
      .select("id, title, type, start_at, location")
      .eq("project_id", projectId)
      .gte("start_at", new Date().toISOString())
      .order("start_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    admin
      .from("project_updates")
      .select("id, title, completed_summary, planned_next_summary, decisions_required_summary, published_at")
      .eq("project_id", projectId)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const p = project as Project | null;
  if (!p) return null;

  const phaseIndex = PROJECT_PHASES.indexOf(p.phase);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Phase tracker */}
      <div style={card}>
        <div style={sectionLabel}>Project Phase</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PROJECT_PHASES.filter((ph) => ph !== "on_hold").map((ph, i) => {
            const active = ph === p.phase;
            const done = phaseIndex > -1 && i < phaseIndex;
            return (
              <span
                key={ph}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: active ? "#2B7CC1" : done ? "#E7F6EC" : "#F1F3F5",
                  color: active ? "#fff" : done ? "#1A7A3D" : "#6B7280",
                  textTransform: "capitalize",
                }}
              >
                {ph.replace(/_/g, " ")}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next milestone */}
        <div style={card}>
          <div style={sectionLabel}>Next Up</div>
          {nextMilestone ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A202C" }}>{nextMilestone.title}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                {fmtDate(nextMilestone.start_at)}
                {nextMilestone.location ? ` · ${nextMilestone.location}` : ""}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#6B7280" }}>Nothing scheduled yet.</div>
          )}
          <Link href={`/portal/${projectId}/schedule`} style={{ display: "inline-block", marginTop: 14, fontSize: 12, color: "#2B7CC1", fontWeight: 600, textDecoration: "none" }}>
            View full schedule →
          </Link>
        </div>

        {/* Your project manager */}
        <div style={card}>
          <div style={sectionLabel}>Your Project Manager</div>
          {p.pm_name ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A202C" }}>{p.pm_name}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                {p.pm_email && <a href={`mailto:${p.pm_email}`} style={{ color: "#2B7CC1", textDecoration: "none" }}>{p.pm_email}</a>}
                {p.pm_phone && <a href={`tel:${p.pm_phone}`} style={{ color: "#6B7280", textDecoration: "none" }}>{p.pm_phone}</a>}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#6B7280" }}>Not yet assigned.</div>
          )}
          <Link href={`/portal/${projectId}/messages`} style={{ display: "inline-block", marginTop: 14, fontSize: 12, color: "#2B7CC1", fontWeight: 600, textDecoration: "none" }}>
            Send a message →
          </Link>
        </div>
      </div>

      {/* Latest update */}
      <div style={card}>
        <div style={sectionLabel}>Latest Update</div>
        {latestUpdate ? (
          <>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{fmtDate(latestUpdate.published_at)}</div>
            {latestUpdate.completed_summary && (
              <p style={{ fontSize: 13, color: "#1A202C", lineHeight: 1.6, margin: "0 0 8px" }}>
                <strong>Completed:</strong> {latestUpdate.completed_summary}
              </p>
            )}
            {latestUpdate.planned_next_summary && (
              <p style={{ fontSize: 13, color: "#1A202C", lineHeight: 1.6, margin: "0 0 8px" }}>
                <strong>Up next:</strong> {latestUpdate.planned_next_summary}
              </p>
            )}
            {latestUpdate.decisions_required_summary && (
              <p style={{ fontSize: 13, color: "#B45309", lineHeight: 1.6, margin: 0 }}>
                <strong>Needs your input:</strong> {latestUpdate.decisions_required_summary}
              </p>
            )}
          </>
        ) : (
          <div style={{ fontSize: 13, color: "#6B7280" }}>No updates posted yet.</div>
        )}
        <Link href={`/portal/${projectId}/updates`} style={{ display: "inline-block", marginTop: 14, fontSize: 12, color: "#2B7CC1", fontWeight: 600, textDecoration: "none" }}>
          View all updates &amp; photos →
        </Link>
      </div>
    </div>
  );
}
