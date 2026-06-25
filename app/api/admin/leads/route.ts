import { NextRequest, NextResponse } from "next/server";
import { getSql, LEAD_STATUSES, type LeadStatus } from "@/lib/db";

// Update a lead's status or notes. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const sql = getSql();
    if (hasStatus && hasNotes) {
      await sql`update leads set status = ${body.status}, notes = ${body.notes} where id = ${id}`;
    } else if (hasStatus) {
      await sql`update leads set status = ${body.status} where id = ${id}`;
    } else {
      await sql`update leads set notes = ${body.notes} where id = ${id}`;
    }
  } catch (err) {
    console.error("[admin/leads] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
