import { notFound } from "next/navigation";
import { getSupabase, type Project } from "@/lib/db";
import { assertProjectAccess } from "@/lib/portal-auth";
import PortalNav from "@/components/portal/PortalNav";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const bodyFont = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";

export default async function PortalProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const access = await assertProjectAccess(projectId);
  if (!access) notFound();

  const admin = getSupabase();
  const { data: project } = await admin.from("projects").select("*").eq("id", projectId).single();
  if (!project) notFound();
  const p = project as Project;

  const modules = p.enabled_modules || {};
  const navItems = [
    { href: "", label: "Overview" },
    ...(modules.schedule !== false ? [{ href: "/schedule", label: "Schedule" }] : []),
    ...(modules.updates !== false ? [{ href: "/updates", label: "Updates & Photos" }] : []),
    ...(modules.documents !== false ? [{ href: "/documents", label: "Documents" }] : []),
    ...(modules.messages !== false ? [{ href: "/messages", label: "Messages" }] : []),
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F7F8FA", fontFamily: bodyFont }}>
      {access.isStaffPreview && (
        <div style={{ background: "#1A202C", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 12, letterSpacing: "0.04em" }}>
          Viewing as client — staff preview
        </div>
      )}
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "20px 24px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B7280", marginBottom: 4 }}>
            Crafted Kitchen &amp; Bath — Client Portal
          </div>
          <h1 style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 24, color: "#1A202C", margin: "0 0 16px" }}>
            {p.title}
          </h1>
        </div>
      </header>
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <PortalNav projectId={projectId} items={navItems} />
        </div>
      </div>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 64px" }}>{children}</main>
    </div>
  );
}
