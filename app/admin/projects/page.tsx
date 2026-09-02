import { getSupabase, type Project } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";
import ProjectsTable from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Projects — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  let projects: Project[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, lead_id, title, category, city, description, images, completed_date, project_value, featured, phase, status, pm_name, pm_email, pm_phone, address, contract_total, portal_enabled, enabled_modules, created_at, updated_at"
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    projects = (data || []) as Project[];
  } catch (err) {
    console.error("[admin/projects] query failed:", err);
    dbError = true;
  }

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      <AdminNav />
      {dbError ? (
        <div>
          <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: 28, color: "#1A202C" }}>
            Projects
          </h1>
          <p style={{ color: "#B91C1C", marginTop: 12, fontSize: 13 }}>
            The projects table isn&apos;t set up yet. Run db/crm-schema.sql against the Supabase project, then reload.
          </p>
        </div>
      ) : (
        <ProjectsTable initialProjects={projects} />
      )}
    </div>
  );
}
