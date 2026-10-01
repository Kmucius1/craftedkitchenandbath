import { getSupabase } from "@/lib/db";
import type { ContractRow } from "./types";
import { FILES_BUCKET, contractById, crmUrl, signaturesFor, signedPdfPath, siteOrigin } from "./data";
import { buildSignedPdf } from "./pdf";
import { sendSignedCopy } from "./email";
import { optionsTotal } from "./template";

/**
 * Runs once every homeowner has signed: seals the PDF, files it where the
 * homeowner's portal shows documents, tells the CRM the contract is signed,
 * and emails the signed copy.
 *
 * Safe to call repeatedly — the sign route calls it after the last signature,
 * and the signing page calls it again on load if a previous run was cut short
 * (CRM unreachable, a timeout). Only the run that actually flips the contract
 * to signed sends the emails.
 */
export async function finalizeIfComplete(contract: ContractRow): Promise<"waiting" | "signed" | "pending"> {
  if (contract.status === "signed") return "signed";
  if (contract.status !== "sent") return "waiting";

  const signatures = await signaturesFor(contract.id);
  const done = contract.terms.homeowners.every((_, i) => signatures.some((s) => s.signer_index === i));
  if (!done) return "waiting";

  const last = signatures[signatures.length - 1];
  const selected = last.selected_options ?? [];
  const admin = getSupabase();

  const sealed = { ...contract, selected_options: selected };
  const pdf = await buildSignedPdf(sealed, signatures, last.document_hash);
  const pdfPath = signedPdfPath(contract);

  const upload = await admin.storage
    .from(FILES_BUCKET)
    .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: true });
  if (upload.error) console.error("[contract.finalize] upload failed", upload.error);

  const response = await fetch(`${crmUrl()}/api/contract-signing/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-contract-secret": process.env.CONTRACT_SIGNING_SECRET ?? "",
    },
    body: JSON.stringify({ contract_id: contract.id, signed_pdf_path: upload.error ? null : pdfPath }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  }).catch((error) => {
    console.error("[contract.finalize] CRM unreachable", error);
    return null;
  });

  const body = (await response?.json().catch(() => ({}))) as { ok?: boolean; already?: boolean } | undefined;
  if (!response?.ok || !body?.ok) {
    console.error("[contract.finalize] CRM did not complete the signing", response?.status, body);
    return "pending";
  }
  if (body.already) return "signed";

  const link = `${siteOrigin()}/contract/${contract.sign_token}`;

  // Show it in the homeowner's portal Documents tab, next to permits and plans.
  if (!upload.error) {
    await admin.from("project_documents").insert({
      project_id: contract.project_id,
      category: "contract",
      title: `${contract.terms.title} — signed (${contract.contract_number})`,
      url: `${link}/pdf`,
      uploaded_by_staff_name: "Signed online",
    });
  }

  const finalTotal = Number(contract.amount ?? 0) + optionsTotal(contract.terms, selected);
  await sendSignedCopy(sealed, Buffer.from(pdf).toString("base64"), link, finalTotal);
  return "signed";
}

/** Re-reads the contract so callers act on the current status, not a stale copy. */
export async function refreshAndFinalize(contractId: string) {
  const fresh = await contractById(contractId);
  return fresh ? finalizeIfComplete(fresh) : "waiting";
}
