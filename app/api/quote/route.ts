import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { notifyNewLead, notifyLeadConfirmation } from "@/lib/notify";
import { crmFieldsFromQuote } from "@/lib/crm-fields";
import { attributionColumns, type Attribution } from "@/lib/campaign";
import { resolveCampaignId } from "@/lib/campaign-match";

// In-depth quote questionnaire endpoint. Captures the structured qualification
// answers, folds them into a readable `description` block, and stores the result
// in the same `leads` table as the contact form (viewable in the Crafted CRM).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Response = { question?: string; answer?: string };

type SelectedProduct = { sku?: string; name?: string; supplier?: string; url?: string };

type QuotePayload = {
  zip?: string;
  consent?: boolean; // contact-consent checkbox, when the form shows one
  selectedProducts?: SelectedProduct[]; // from the product selection list
  sourceUrl?: string;
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
  attribution?: Partial<Attribution>; // from lib/campaign.ts's getStoredAttribution()
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;
const MAX_PRODUCTS = 25;
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

// Best-effort per-instance limiter (serverless instances do not share memory, so
// this blunts bursts rather than guaranteeing a hard cap).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call us at (727) 383-7550." },
      { status: 429 }
    );
  }

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

  const zip = clip(body.zip, 10);
  if (zip && !ZIP_RE.test(zip)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid ZIP code." }, { status: 422 });
  }
  if (zip) lines.push(`• ZIP: ${zip}`);

  // Only SKUs the visitor actually selected from the catalog; never invented.
  const selectedProducts = (Array.isArray(body.selectedProducts) ? body.selectedProducts : [])
    .slice(0, MAX_PRODUCTS)
    .map((p) => ({
      sku: clip(p?.sku, 80),
      name: clip(p?.name, 160),
      supplier: clip(p?.supplier, 80),
      url: clip(p?.url, 300),
    }))
    .filter((p) => p.sku || p.name);
  if (selectedProducts.length) {
    lines.push(
      "• Selected materials:\n" +
        selectedProducts
          .map((p) => `   - ${p.name || "Unnamed"}${p.sku ? ` (SKU ${p.sku})` : ""}${p.supplier ? ` — ${p.supplier}` : ""}`)
          .join("\n")
    );
  }

  const notes = (body.notes || "").trim().slice(0, 4000);
  const description =
    lines.join("\n") + (notes ? `\n\nNotes from homeowner:\n${notes}` : "");

  const attribution = attributionColumns(body.attribution);
  const campaign_id = await resolveCampaignId(attribution.utm_campaign);

  const lead = {
    full_name: fullName,
    email,
    phone: (body.phone || "").trim() || null,
    service: (body.service || "").trim() || "Remodeling Consultation",
    city: (body.city || "").trim() || null,
    description: description.trim() || null,
    contact_method: (body.contactMethod || "").trim() || null,
    source: "Quote Questionnaire · craftedkitchenandbath.com",
    // The wizard already asks about budget, timeline, ownership and scope; this
    // lands those answers in real columns instead of only inside the bulleted
    // `description` text above.
    ...crmFieldsFromQuote(responses, bestTime),
    intake_payload: {
      ...(body as unknown as Record<string, unknown>),
      selectedProducts,
      zip: zip || null,
      consent: body.consent === true,
      sourceUrl: clip(body.sourceUrl, 300) || null,
    } as Record<string, unknown>,
    ...attribution,
    campaign_id,
  };

  try {
    const supabase = getSupabase();

    // Retry-safe: a double-click or network retry with the same email and the same
    // answers inside 10 minutes is reported as success without a second CRM record.
    const since = new Date(Date.now() - 10 * 60_000).toISOString();
    const { data: dup } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .eq("description", lead.description)
      .gte("created_at", since)
      .limit(1);
    if (dup && dup.length) return NextResponse.json({ ok: true });

    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
  } catch (err) {
    console.error("[quote] Failed to save lead:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us at (727) 383-7550." },
      { status: 503 }
    );
  }

  await Promise.all([notifyNewLead(lead), notifyLeadConfirmation(lead)]);

  return NextResponse.json({ ok: true });
}
