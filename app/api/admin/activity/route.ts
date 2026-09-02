import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

// Create + delete publishing-activity log entries. Access is gated by
// proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ActivityPayload = {
  type?: string;
  title?: string;
  url?: string;
  channel?: string;
  published_at?: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  let body: ActivityPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const type = (body.type || "").trim();
  const title = (body.title || "").trim();
  if (!type || !title) {
    return NextResponse.json({ ok: false, error: "Type and title are required." }, { status: 422 });
  }

  const row = {
    type,
    title,
    url: (body.url || "").trim() || null,
    channel: (body.channel || "").trim() || null,
    published_at: (body.published_at || "").trim() || null,
    notes: (body.notes || "").trim() || null,
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("activity_log").insert(row);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/activity] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Could not log activity" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("activity_log").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/activity] delete failed:", err);
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
