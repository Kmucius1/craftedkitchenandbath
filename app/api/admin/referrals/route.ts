import { NextRequest, NextResponse } from "next/server";
import { getSupabase, REFERRAL_STATUSES, type ReferralStatus } from "@/lib/db";

// Create + update referrals. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — easier to read aloud

function generateCode(length = 8): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export async function POST(req: NextRequest) {
  let body: { referrer_name?: string; referrer_email?: string; referrer_lead_id?: string; reward_notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const referrer_name = (body.referrer_name || "").trim();
  if (!referrer_name) {
    return NextResponse.json({ ok: false, error: "Referrer name is required." }, { status: 422 });
  }

  const supabase = getSupabase();
  const base = {
    referrer_name,
    referrer_email: (body.referrer_email || "").trim() || null,
    referrer_lead_id: (body.referrer_lead_id || "").trim() || null,
    reward_notes: (body.reward_notes || "").trim() || null,
    status: "sent",
  };

  // referral_code is unique — generate and retry on collision rather than
  // pre-checking (avoids a race between check and insert).
  for (let attempt = 0; attempt < 5; attempt++) {
    const referral_code = generateCode();
    const { error } = await supabase.from("referrals").insert({ ...base, referral_code });
    if (!error) return NextResponse.json({ ok: true, referral_code });
    if (error.code !== "23505") {
      console.error("[admin/referrals] insert failed:", error);
      return NextResponse.json({ ok: false, error: "Could not create referral" }, { status: 500 });
    }
    // 23505 = unique_violation — collided on referral_code, try again.
  }

  return NextResponse.json({ ok: false, error: "Could not generate a unique referral code" }, { status: 500 });
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
  if (!body.status || !REFERRAL_STATUSES.includes(body.status as ReferralStatus)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("referrals").update({ status: body.status }).eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/referrals] update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
