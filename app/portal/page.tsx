import { redirect } from "next/navigation";
import Link from "next/link";
import { getSupabase, type ProjectPhase } from "@/lib/db";
import { getPortalUser } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";

const PHASE_LABEL: Record<ProjectPhase, string> = {
  discovery: "Discovery",
  design: "Design",
  selections: "Selections",
  preconstruction: "Preconstruction",
  build: "In Progress",
  final_walkthrough: "Final Walkthrough",
  completed: "Completed",
  on_hold: "On Hold",
};

export default async function PortalHomePage() {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");

  const admin = getSupabase();
  const { data } = await admin
    .from("project_members")
    .select("project_id, projects(id, title, phase, city)")
    .eq("portal_user_id", user.id);

  type Row = { project_id: string; projects: { id: string; title: string; phase: ProjectPhase; city: string | null } | null };
  const projects = ((data as unknown as Row[]) || []).map((r) => r.projects).filter((p): p is NonNullable<typeof p> => !!p);

  if (projects.length === 1) redirect(`/portal/${projects[0].id}`);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F7F8FA", padding: "56px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 30, color: "#1A202C", margin: "0 0 24px" }}>
          Your Projects
        </h1>
        {projects.length === 0 ? (
          <p style={{ fontSize: 14, color: "#6B7280" }}>No projects are linked to your account yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/portal/${p.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "20px 24px",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#1A202C" }}>{p.title}</div>
                  {p.city && <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{p.city}</div>}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#2B7CC1", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {PHASE_LABEL[p.phase] || p.phase}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
