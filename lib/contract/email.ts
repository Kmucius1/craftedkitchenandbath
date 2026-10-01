import type { ContractRow } from "./types";
import { fullAddress, money } from "./template";

/**
 * Contract emails. Unlike the best-effort lead alerts in lib/notify.ts, these
 * report failure to the caller: Tylor needs to know a signing link did not go
 * out, so he can text it instead.
 */

const FROM = process.env.CONTRACT_FROM || "Crafted Kitchen and Bath <contracts@craftedkitchenandbath.com>";
const OFFICE = process.env.LEAD_NOTIFY_EMAIL || "info@craftedkitchenandbath.com";

type Attachment = { filename: string; content: string };

async function send(payload: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "Email is not configured on the website (RESEND_API_KEY)." };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo || OFFICE,
        ...(payload.attachments ? { attachments: payload.attachments } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      console.error("[contract-email] rejected", res.status, body);
      return { ok: false, error: body.message || `Resend returned ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contract-email] failed", err);
    return { ok: false, error: "Could not reach the email service." };
  }
}

function escape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wrap(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1A202C">
    <div style="background:#1F5FAC;padding:18px 24px;border-radius:8px 8px 0 0">
      <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:0.5px">CRAFTED</span>
      <span style="color:#fff;font-size:12px;margin-left:6px">KITCHEN &amp; BATH</span>
    </div>
    <div style="border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;padding:24px">${inner}</div>
    <p style="font-size:11px;color:#6B7280;margin-top:12px;text-align:center">Crafted Kitchen and Bath · 120 Commerce Blvd Suite 4, Oldsmar, FL 34677 · (727) 383-7550</p>
  </div>`;
}

function button(href: string, label: string): string {
  return `<p style="margin:24px 0"><a href="${href}" style="background:#2B7CC1;color:#fff;padding:13px 26px;text-decoration:none;border-radius:4px;display:inline-block;font-weight:600">${label}</a></p>`;
}

export async function sendSigningRequest(contract: ContractRow, link: string) {
  const terms = contract.terms;
  const to = terms.homeowners.map((h) => h.email?.trim()).filter((e): e is string => !!e);
  if (!to.length) return { ok: false as const, error: "No homeowner on this contract has an email address.", sentTo: [] };

  const first = terms.homeowners.map((h) => h.name.split(" ")[0]).join(" and ");
  const total = money(Number(contract.amount ?? 0));
  const signer = terms.contractor?.signer ?? "Tylor Craft";
  const twoSigners = terms.homeowners.length > 1;

  const html = wrap(`
    <p style="line-height:1.6;margin-top:0">Hi ${escape(first)},</p>
    <p style="line-height:1.6">Your contract for the ${escape(terms.project_kind)} at ${escape(terms.property.address)} is ready to review and sign. It includes the full estimate${terms.estimate?.sections.some((s) => s.lines.some((l) => l.optional)) ? " and any optional add-ons you'd like to include" : ""}.</p>
    <p style="line-height:1.6"><strong>${escape(terms.title)}</strong> · ${contract.contract_number}<br>Total: ${total}</p>
    ${button(link, "Review and sign")}
    <p style="line-height:1.6;font-size:14px;color:#4A5568">${twoSigners ? "Each homeowner signs on their own line — you can both use this same link. " : ""}It takes about two minutes on a phone or computer. If anything doesn't look right, just reply to this email or call (727) 383-7550 before signing.</p>
    <p style="line-height:1.6">Thank you,<br>${escape(signer)}<br>Crafted Kitchen and Bath</p>`);

  const text = `Hi ${first},\n\nYour contract for the ${terms.project_kind} at ${terms.property.address} is ready to review and sign.\n\n${terms.title} (${contract.contract_number}) — Total ${total}\n\nReview and sign: ${link}\n\nIf anything doesn't look right, reply to this email or call (727) 383-7550 before signing.\n\nThank you,\n${signer}\nCrafted Kitchen and Bath`;

  const result = await send({ to, subject: `Your contract is ready to sign — ${terms.title}`, html, text });
  return result.ok ? { ok: true as const, sentTo: to } : { ...result, sentTo: [] };
}

export async function sendSignedCopy(contract: ContractRow, pdfBase64: string, link: string, finalTotal: number) {
  const terms = contract.terms;
  const homeowners = terms.homeowners.map((h) => h.email?.trim()).filter((e): e is string => !!e);
  const filename = `${contract.contract_number} - ${terms.title} (signed).pdf`;
  const attachments = [{ filename, content: pdfBase64 }];
  const names = terms.homeowners.map((h) => h.name).join(" and ");

  const html = wrap(`
    <p style="line-height:1.6;margin-top:0">Thank you, ${escape(names)} — your contract is signed.</p>
    <p style="line-height:1.6">A copy of the signed contract and estimate is attached for your records. You can also open it any time from the link below.</p>
    <p style="line-height:1.6"><strong>${escape(terms.title)}</strong> · ${contract.contract_number}<br>${escape(fullAddress(terms.property))}<br>Total: ${money(finalTotal)}</p>
    ${button(link, "View signed contract")}
    <p style="line-height:1.6">We'll be in touch about next steps and scheduling.</p>`);
  const text = `Thank you, ${names} — your contract is signed. A copy is attached, and you can view it at ${link}`;

  const results = [];
  if (homeowners.length) {
    results.push(await send({ to: homeowners, subject: `Signed: ${terms.title} (${contract.contract_number})`, html, text, attachments }));
  }
  // The office copy, so Tylor hears about it the minute it happens.
  results.push(
    await send({
      to: [OFFICE],
      subject: `✅ ${names} signed ${contract.contract_number} — ${money(finalTotal)}`,
      html: wrap(`<p style="line-height:1.6;margin-top:0"><strong>${escape(names)}</strong> signed <strong>${escape(terms.title)}</strong> (${contract.contract_number}) for ${escape(fullAddress(terms.property))}.</p><p style="line-height:1.6">Final contract value: <strong>${money(finalTotal)}</strong>. The job has moved to Contract in the CRM and the payment schedule was added to its draws. The signed PDF is attached.</p>`),
      text: `${names} signed ${contract.contract_number} (${money(finalTotal)}). Signed PDF attached.`,
      attachments,
    }),
  );
  return results.every((r) => r.ok);
}
