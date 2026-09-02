import { NextRequest, NextResponse } from "next/server";
import { getSupabase, REVIEW_REQUEST_STATUSES, type ReviewRequestStatus } from "@/lib/db";

// Create + update review requests. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { customer_name?: string; customer_email?: string; customer_phone?: string; lead_id?: string; project_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const customer_name = (body.customer_name || "").trim();
  if (!customer_name) {
    return NextResponse.json({ ok: false, error: "Customer name is required." }, { status: 422 });
  }

  const row = {
    customer_name,
    customer_email: (body.customer_email || "").trim() || null,
    customer_phone: (body.customer_phone || "").trim() || null,
    lead_id: (body.lead_id || "").trim() || null,
    project_id: (body.project_id || "").trim() || null,
    status: "pending",
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("review_requests").insert(row);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/reviews] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Could not create review request" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  let body: { id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });
  if (!body.status || !REVIEW_REQUEST_STATUSES.includes(body.status as ReviewRequestStatus)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("review_requests").update({ status: body.status }).eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/reviews] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
