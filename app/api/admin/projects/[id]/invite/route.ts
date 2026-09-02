import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

// Invite a homeowner to the client portal for this project. Uses the
// service-role client's Supabase Auth admin API to create/invite the user,
// then links them via portal_users + project_members (db/portal-schema.sql).
// Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const supabase = getSupabase();

  try {
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("id", projectId)
      .single();
    if (projectError || !project) {
      return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
    }

    // Invite (or, if already invited, look the user up instead — Supabase
    // Auth admin rejects a duplicate invite for an existing email).
    let userId: string | null = null;
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { project_title: project.title },
    });
    if (inviteError) {
      const { data: usersPage, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw inviteError;
      const existing = usersPage.users.find((u) => u.email?.toLowerCase() === email);
      if (!existing) throw inviteError;
      userId = existing.id;
    } else {
      userId = inviteData.user?.id ?? null;
    }
    if (!userId) throw new Error("Could not resolve a user id for the invited homeowner.");

    const { error: portalUserError } = await supabase
      .from("portal_users")
      .upsert({ id: userId, email }, { onConflict: "id" });
    if (portalUserError) throw portalUserError;

    const { error: memberError } = await supabase
      .from("project_members")
      .upsert({ project_id: projectId, portal_user_id: userId, role: "owner" }, { onConflict: "project_id,portal_user_id" });
    if (memberError) throw memberError;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/projects/invite] failed:", err);
    const message =
      err instanceof Error && /not configured|service_role|admin/i.test(err.message)
        ? "Supabase Auth admin isn't configured — check SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY."
        : "Could not invite homeowner. Check server logs for details.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
