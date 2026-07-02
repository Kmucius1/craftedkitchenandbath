import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

// Newsletter signup endpoint. Stores the subscriber in the same `leads` table
// (tagged source "Newsletter") so it's visible in /admin/leads — the only admin
// surface — without a separate schema or dashboard. Low-friction: email only.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = { email?: string; name?: string; company?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const name = (body.name || "").trim();
  const lead = {
    full_name: name || "Newsletter Subscriber",
    email,
    service: "Newsletter",
    description: "Subscribed to the newsletter via the site popup.",
    source: "Newsletter Popup · craftedkitchenandbath.com",
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
  } catch (err) {
    console.error("[subscribe] Failed to save subscriber:", err);
    return NextResponse.json(
      { ok: false, error: "Could not subscribe right now. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
