import { notFound } from "next/navigation";
import { getSupabase, type Project } from "@/lib/db";
import { assertProjectAccess } from "@/lib/portal-auth";
import PortalShell from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

  const base = `/portal/${projectId}`;
  const modules = p.enabled_modules || {};
  const navItems = [
    { href: base, label: "Overview", icon: "⌂" },
    ...(modules.schedule !== false ? [{ href: `${base}/schedule`, label: "Schedule", icon: "▤" }] : []),
    ...(modules.updates !== false ? [{ href: `${base}/updates`, label: "Updates & Photos", icon: "◔" }] : []),
    ...(modules.documents !== false ? [{ href: `${base}/documents`, label: "Documents", icon: "▯" }] : []),
    ...(modules.messages !== false ? [{ href: `${base}/messages`, label: "Messages", icon: "✉" }] : []),
  ];

  return (
    <PortalShell projectTitle={p.title} navItems={navItems} isStaffPreview={access.isStaffPreview}>
      {children}
    </PortalShell>
  );
}
