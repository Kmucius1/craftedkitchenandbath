import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { assertProjectAccess } from "@/lib/portal-auth";
import { notifyStaffNewPortalMessage } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Client-portal messaging lives in the Crafted CRM's shared `communications`
// table (channel='portal'), not a portal-only table — that table already has
// real staff auth, a "Portal" tab on the project, and outbound email alerts
// wired up on the CRM side (crafted-crm repo, app/api/communications/route.ts).
// A single conversation per project, matching how the CRM itself has no
// per-category thread concept — there is deliberately no category filter here.
export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId") || "";
  const access = await assertProjectAccess(projectId);
  if (!access) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const admin = getSupabase();
  const { data, error } = await admin
    .from("communications")
    .select("id, direction, author_name, body, occurred_at")
    .eq("project_id", projectId)
    .eq("channel", "portal")
    .is("deleted_at", null)
    .order("occurred_at", { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: "Could not load messages" }, { status: 500 });

  const messages = (data || []).map((row) => ({
    id: row.id,
    author_type: row.direction === "inbound" ? "client" : "staff",
    author_staff_name: row.direction === "inbound" ? null : row.author_name,
    body: row.body,
    created_at: row.occurred_at,
  }));

  return NextResponse.json({ ok: true, messages });
}

export async function POST(req: NextRequest) {
  let body: { projectId?: string; body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const projectId = body.projectId || "";
  const text = (body.body || "").trim();
  if (!text) return NextResponse.json({ ok: false, error: "Message can't be empty." }, { status: 422 });

  const access = await assertProjectAccess(projectId);
  if (!access) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  try {
    const admin = getSupabase();

    // Denormalize the CRM's contact_id when the project has one, so the
    // message also shows up joined to the right homeowner record in the CRM.
    const { data: project } = await admin
      .from("projects")
      .select("title, contact_id, pm_email")
      .eq("id", projectId)
      .maybeSingle();

    const clientName = access.portalUser.full_name || access.portalUser.email;

    const { data: inserted, error } = await admin
      .from("communications")
      .insert({
        project_id: projectId,
        contact_id: project?.contact_id ?? null,
        channel: "portal",
        direction: "inbound",
        body: text,
        occurred_at: new Date().toISOString(),
        author_id: null,
        author_name: clientName,
      })
      .select("id, direction, author_name, body, occurred_at")
      .single();
    if (error) throw error;

    void notifyStaffNewPortalMessage({
      projectTitle: project?.title || "a project",
      projectId,
      pmEmail: project?.pm_email ?? null,
      clientName,
      body: text,
    });

    return NextResponse.json({
      ok: true,
      message: {
        id: inserted.id,
        author_type: "client",
        author_staff_name: null,
        body: inserted.body,
        created_at: inserted.occurred_at,
      },
    });
  } catch (err) {
    console.error("[portal/messages] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 500 });
  }
}
