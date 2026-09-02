import { NextRequest, NextResponse } from "next/server";
import { getSupabase, LEAD_STATUSES, type LeadStatus } from "@/lib/db";

// Create/update leads. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Staff-logged inbound call — no telephony vendor integration, just a manual
// record so calls show up in the same pipeline as web leads.
export async function POST(req: NextRequest) {
  let body: { fullName?: string; phone?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const fullName = (body.fullName || "").trim();
  if (!fullName) return NextResponse.json({ ok: false, error: "Name is required" }, { status: 422 });

  const lead = {
    full_name: fullName,
    email: "",
    phone: (body.phone || "").trim() || null,
    notes: (body.notes || "").trim() || null,
    source: "Phone call (logged)",
    channel: "phone_call",
  };

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("leads").insert(lead).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, lead: data });
  } catch (err) {
    console.error("[admin/leads] log call failed:", err);
    return NextResponse.json({ ok: false, error: "Could not log call" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  let body: { id?: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });

  const hasStatus = typeof body.status === "string";
  const hasNotes = typeof body.notes === "string";
  if (!hasStatus && !hasNotes) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 422 });
  }
  if (hasStatus && !LEAD_STATUSES.includes(body.status as LeadStatus)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
  }

  try {
    const supabase = getSupabase();
    const patch: { status?: string; notes?: string } = {};
    if (hasStatus) patch.status = body.status;
    if (hasNotes) patch.notes = body.notes;
    const { error } = await supabase.from("leads").update(patch).eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/leads] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
