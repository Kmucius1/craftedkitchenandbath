import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";

// Lead-capture endpoint. Validates the contact form, blocks spam, stores the
// lead in Postgres, and (optionally) emails a notification. Leads are viewable
// in the in-site admin at /admin/leads.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  city?: string;
  description?: string;
  contactMethod?: string;
  company?: string; // honeypot — real users leave this empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation (don't trust the client).
  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const service = (body.service || "").trim();
  if (!fullName || !email || !service) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and service are required." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const lead = {
    full_name: fullName,
    email,
    phone: (body.phone || "").trim() || null,
    service,
    city: (body.city || "").trim() || null,
    description: (body.description || "").trim() || null,
    contact_method: (body.contactMethod || "").trim() || null,
    source: "craftedkitchenandbath.com",
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
  } catch (err) {
    // Never silently lose a lead — log loudly and tell the visitor to call.
    console.error("[contact] Failed to save lead:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us at (727) 383-7550." },
      { status: 503 }
    );
  }

  // Fire-and-forget notification; failure here must not fail the request.
  await notifyNewLead(lead);

  return NextResponse.json({ ok: true });
}
