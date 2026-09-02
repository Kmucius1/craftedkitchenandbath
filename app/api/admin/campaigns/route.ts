import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

// Create + update campaigns. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CampaignPayload = {
  id?: string;
  name?: string;
  channel?: string;
  utm_campaign_key?: string;
  start_date?: string;
  end_date?: string;
  budget?: number | string;
  notes?: string;
};

function toRow(body: CampaignPayload) {
  const budget = body.budget === "" || body.budget == null ? null : Number(body.budget);
  return {
    name: (body.name || "").trim(),
    channel: (body.channel || "").trim() || null,
    utm_campaign_key: (body.utm_campaign_key || "").trim() || null,
    start_date: (body.start_date || "").trim() || null,
    end_date: (body.end_date || "").trim() || null,
    budget: budget != null && !Number.isNaN(budget) ? budget : null,
    notes: (body.notes || "").trim() || null,
  };
}

export async function POST(req: NextRequest) {
  let body: CampaignPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const row = toRow(body);
  if (!row.name) return NextResponse.json({ ok: false, error: "Campaign name is required." }, { status: 422 });

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("campaigns").insert(row);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/campaigns] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Could not create campaign (utm key may already be in use)" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  let body: CampaignPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });

  const row = toRow(body);
  if (!row.name) return NextResponse.json({ ok: false, error: "Campaign name is required." }, { status: 422 });

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("campaigns").update(row).eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/campaigns] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
