import type { Lead } from "./db";

const BUSINESS_NAME = "Crafted Kitchen and Bath";
const BUSINESS_PHONE = "(727) 383-7550";

// Resend resolves on 4xx/5xx just like on success — fetch() only rejects on
// network failure — so callers must check response.ok or a bad API key /
// unverified sending domain fails completely silently.
async function sendResendEmail(payload: Record<string, unknown>, apiKey: string, label: string) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[notify] ${label} rejected by Resend (${res.status}):`, body);
    }
  } catch (err) {
    console.error(`[notify] ${label} failed (non-fatal):`, err);
  }
}

// Best-effort confirmation email to the homeowner who just submitted a form.
// No-ops (and never throws) unless RESEND_API_KEY is set, so a missing config
// never blocks a lead from being saved. Sender domain must be verified in Resend.
export async function notifyLeadConfirmation(lead: Partial<Lead>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_NOTIFY_FROM || "Crafted Kitchen and Bath <leads@craftedkitchenandbath.com>";
  if (!apiKey || !lead.email) return;

  const firstName = (lead.full_name || "").trim().split(/\s+/)[0] || "there";

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#1A202C">
      <h2 style="margin:0 0 16px">Thanks, ${firstName} — we've got your project details.</h2>
      <p style="line-height:1.6">A member of our team will review your answers and reach out within 24 hours to schedule your complimentary in-home consultation.</p>
      <p style="line-height:1.6">Prefer to talk now? Call us at <a href="tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}" style="color:#2B7CC1">${BUSINESS_PHONE}</a>.</p>
      <p style="margin-top:32px;color:#6B7280;font-size:13px">— ${BUSINESS_NAME}</p>
    </div>`;

  await sendResendEmail(
    { from, to: [lead.email], subject: `We received your request — ${BUSINESS_NAME}`, html },
    apiKey,
    "lead confirmation email"
  );
}

// Best-effort new-lead notification via Resend. No-ops (and never throws) unless
// RESEND_API_KEY + LEAD_NOTIFY_EMAIL are set, so a missing config never blocks a
// lead from being saved. Sender domain must be verified in Resend.
export async function notifyNewLead(lead: Partial<Lead>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL || "info@craftedkitchenandbath.com";
  const from = process.env.LEAD_NOTIFY_FROM || "Crafted Leads <leads@craftedkitchenandbath.com>";
  if (!apiKey || !to) return;

  const rows: [string, string | null | undefined][] = [
    ["Name", lead.full_name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Service", lead.service],
    ["City", lead.city],
    ["Preferred contact", lead.contact_method],
    ["Details", lead.description],
  ];
  const html = `<h2>New website lead</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${(v || "—")
      .toString()
      .replace(/</g, "&lt;")}</td></tr>`)
    .join("")}</table><p style="color:#888">View all leads at /admin/leads</p>`;

  await sendResendEmail(
    {
      from,
      to: to.split(",").map((s) => s.trim()),
      subject: `New lead: ${lead.full_name || "Website"}${lead.service ? ` — ${lead.service}` : ""}`,
      html,
      reply_to: lead.email || undefined,
    },
    apiKey,
    "new lead notification"
  );
}
