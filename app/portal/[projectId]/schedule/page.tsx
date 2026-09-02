import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Milestone = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  start_at: string;
  location: string | null;
  delay_reason: string | null;
  delay_impact_days: number | null;
  status: "scheduled" | "completed" | "cancelled" | "delayed";
};

const TYPE_LABEL: Record<string, string> = {
  milestone: "Milestone",
  appointment: "Appointment",
  delivery: "Delivery",
  inspection: "Inspection",
  access_required: "Home Access Needed",
  delay_notice: "Delay Notice",
};

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function PortalSchedulePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const admin = getSupabase();
  const { data } = await admin
    .from("schedule_milestones")
    .select("id, type, title, description, start_at, location, delay_reason, delay_impact_days, status")
    .eq("project_id", projectId)
    .order("start_at", { ascending: true });

  const milestones = (data || []) as Milestone[];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1A202C", margin: 0 }}>Schedule</h2>
        <a
          href={`/portal/${projectId}/schedule/calendar.ics`}
          style={{ fontSize: 12, color: "#2B7CC1", fontWeight: 600, textDecoration: "none", border: "1px solid #E5E7EB", borderRadius: 6, padding: "6px 12px" }}
        >
          Add to Calendar
        </a>
      </div>

      {milestones.length === 0 && (
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 24, fontSize: 13, color: "#6B7280" }}>
          Nothing scheduled yet.
        </div>
      )}

      {milestones.map((m) => (
        <div key={m.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280", fontWeight: 700, marginBottom: 4 }}>
                {TYPE_LABEL[m.type] || m.type}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1A202C" }}>{m.title}</div>
              {m.description && <div style={{ fontSize: 13, color: "#4A5568", marginTop: 4 }}>{m.description}</div>}
              {m.location && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{m.location}</div>}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, color: "#1A202C", fontWeight: 500 }}>{fmt(m.start_at)}</div>
              {m.status !== "scheduled" && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: m.status === "delayed" ? "#FDECEC" : m.status === "completed" ? "#E7F6EC" : "#F1F3F5",
                    color: m.status === "delayed" ? "#B91C1C" : m.status === "completed" ? "#1A7A3D" : "#6B7280",
                    textTransform: "capitalize",
                  }}
                >
                  {m.status}
                </span>
              )}
            </div>
          </div>
          {m.delay_reason && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#B45309", background: "#FEF6E7", borderRadius: 6, padding: "8px 12px" }}>
              Delayed{m.delay_impact_days ? ` ~${m.delay_impact_days} day${m.delay_impact_days === 1 ? "" : "s"}` : ""}: {m.delay_reason}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
