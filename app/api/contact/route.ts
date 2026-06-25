import { NextRequest, NextResponse } from "next/server";

// Lead-capture endpoint. Validates the contact form and forwards the lead to a
// Google Sheet via a Google Apps Script Web App (URL in SHEETS_WEBHOOK_URL).
// See docs/lead-form-setup.md for the one-time Apps Script setup.
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

  // Honeypot: bots fill the hidden "company" field. Pretend success, write nothing.
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

  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    // Misconfiguration — log loudly so a lead is never silently dropped.
    console.error("[contact] SHEETS_WEBHOOK_URL is not set — lead NOT saved:", { fullName, email });
    return NextResponse.json(
      { ok: false, error: "Form is temporarily unavailable. Please call us at (727) 383-7550." },
      { status: 503 }
    );
  }

  const lead = {
    fullName,
    email,
    phone: (body.phone || "").trim(),
    service,
    city: (body.city || "").trim(),
    description: (body.description || "").trim(),
    contactMethod: (body.contactMethod || "").trim(),
    source: "craftedkitchenandbath.com",
    secret: process.env.SHEETS_WEBHOOK_SECRET || "",
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Apps Script can be slow on cold start; don't hang the user forever.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Sheets webhook returned", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { ok: false, error: "Could not submit right now. Please call us at (727) 383-7550." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Failed to reach Sheets webhook:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us at (727) 383-7550." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
