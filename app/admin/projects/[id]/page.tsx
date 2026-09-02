import { notFound } from "next/navigation";
import { getSupabase, type Project } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";
import ProjectDetail from "@/components/admin/ProjectDetail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Project — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, lead_id, title, category, city, description, images, completed_date, project_value, featured, phase, status, pm_name, pm_email, pm_phone, address, contract_total, portal_enabled, enabled_modules, created_at, updated_at"
    )
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      <AdminNav />
      <ProjectDetail project={data as Project} />
    </div>
  );
}
