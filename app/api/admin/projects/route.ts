import { NextRequest, NextResponse } from "next/server";
import { getSupabase, PROJECT_PHASES, type ProjectPhase } from "@/lib/db";

// Create/update projects. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CreatePayload = {
  lead_id?: string;
  title?: string;
  category?: string;
  city?: string;
  description?: string;
};

export async function POST(req: NextRequest) {
  let body: CreatePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const title = (body.title || "").trim();
  if (!title) return NextResponse.json({ ok: false, error: "Title is required" }, { status: 422 });

  const project = {
    lead_id: (body.lead_id || "").trim() || null,
    title,
    category: (body.category || "").trim() || null,
    city: (body.city || "").trim() || null,
    description: (body.description || "").trim() || null,
  };

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("projects").insert(project).select("id").single();
    if (error) throw error;
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("[admin/projects] create failed:", err);
    return NextResponse.json({ ok: false, error: "Could not create project" }, { status: 500 });
  }
}

type PatchPayload = { id?: string; [key: string]: unknown };

// Fields callers are allowed to update directly. Keeps this endpoint from
// becoming an arbitrary-column-write hole.
const PATCHABLE_FIELDS = [
  "title",
  "category",
  "city",
  "address",
  "description",
  "images",
  "completed_date",
  "project_value",
  "featured",
  "phase",
  "status",
  "pm_name",
  "pm_email",
  "pm_phone",
  "contract_total",
  "portal_enabled",
  "enabled_modules",
] as const;

export async function PATCH(req: NextRequest) {
  let body: PatchPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });

  if (typeof body.phase === "string" && !PROJECT_PHASES.includes(body.phase as ProjectPhase)) {
    return NextResponse.json({ ok: false, error: "Invalid phase" }, { status: 422 });
  }

  const patch: Record<string, unknown> = {};
  for (const field of PATCHABLE_FIELDS) {
    if (field in body) patch[field] = body[field];
  }
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 422 });
  }
  patch.updated_at = new Date().toISOString();

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("projects").update(patch).eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/projects] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
