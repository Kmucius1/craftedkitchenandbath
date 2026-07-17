import type { Lead } from "./db";

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

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `New lead: ${lead.full_name || "Website"}${lead.service ? ` — ${lead.service}` : ""}`,
        html,
        reply_to: lead.email || undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    console.error("[notify] lead email failed (non-fatal):", err);
  }
}
