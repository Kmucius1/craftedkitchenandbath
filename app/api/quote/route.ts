import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";

// In-depth quote questionnaire endpoint. Captures the structured qualification
// answers, folds them into a readable `description` block, and stores the result
// in the same `leads` table as the contact form (viewable at /admin/leads).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Response = { question?: string; answer?: string };

type QuotePayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  contactMethod?: string;
  bestTime?: string;
  notes?: string;
  responses?: Response[];
  company?: string; // honeypot — real users leave this empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: QuotePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  if (!fullName || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  // Build a readable description from the questionnaire answers + free-text notes.
  const responses = Array.isArray(body.responses) ? body.responses : [];
  const lines = responses
    .filter((r) => r && r.question && r.answer && String(r.answer).trim() !== "")
    .map((r) => `• ${String(r.question).trim()}: ${String(r.answer).trim()}`);

  const bestTime = (body.bestTime || "").trim();
  if (bestTime) lines.push(`• Best time to reach: ${bestTime}`);

  const notes = (body.notes || "").trim();
  const description =
    lines.join("\n") + (notes ? `\n\nNotes from homeowner:\n${notes}` : "");

  const lead = {
    full_name: fullName,
    email,
    phone: (body.phone || "").trim() || null,
    service: (body.service || "").trim() || "Remodeling Consultation",
    city: (body.city || "").trim() || null,
    description: description.trim() || null,
    contact_method: (body.contactMethod || "").trim() || null,
    source: "Quote Questionnaire · craftedkitchenandbath.com",
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
  } catch (err) {
    console.error("[quote] Failed to save lead:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us at (727) 383-7550." },
      { status: 503 }
    );
  }

  await notifyNewLead(lead);

  return NextResponse.json({ ok: true });
}
