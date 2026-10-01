import { createHash } from "node:crypto";
import { getSupabase } from "@/lib/db";
import type { ContractRow, SignatureRow } from "./types";

/**
 * Online contracts live in the Crafted CRM's tables (same database). Every
 * read here is by the unguessable sign_token from the homeowner's link — the
 * token is the homeowner's access, the way a DocuSign envelope link is.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const CONTRACT_COLUMNS =
  "id, project_id, contract_number, title, status, amount, sign_token, terms, template_version, sent_at, signed_at, contractor_signed_name, contractor_signed_at, first_viewed_at, selected_options, signed_pdf_path, void_reason";

export async function contractByToken(token: string): Promise<ContractRow | null> {
  if (!UUID.test(token)) return null;
  const { data } = await getSupabase()
    .from("contracts")
    .select(CONTRACT_COLUMNS)
    .eq("sign_token", token)
    .is("deleted_at", null)
    .maybeSingle();
  // A contract with no terms was recorded by hand in the CRM and has nothing
  // to show online.
  if (!data || !data.terms || !("version" in (data.terms as object))) return null;
  return data as unknown as ContractRow;
}

export async function contractById(id: string): Promise<ContractRow | null> {
  if (!UUID.test(id)) return null;
  const { data } = await getSupabase()
    .from("contracts")
    .select(CONTRACT_COLUMNS)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();
  return (data as unknown as ContractRow) ?? null;
}

export async function signaturesFor(contractId: string): Promise<SignatureRow[]> {
  const { data } = await getSupabase()
    .from("contract_signatures")
    .select("id, created_at, signer_index, signer_name, signer_email, signature_type, signature_data, ip_address, user_agent, document_hash, selected_options")
    .eq("contract_id", contractId)
    .order("created_at", { ascending: true });
  return (data ?? []) as SignatureRow[];
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export const FILES_BUCKET = "crafted-files";

export function signedPdfPath(contract: Pick<ContractRow, "id" | "contract_number">): string {
  return `contracts/${contract.id}/${contract.contract_number}-signed.pdf`;
}

export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://craftedkitchenandbath.com").replace(/\/$/, "");
}

/** Shared secret with the CRM (CONTRACT_SIGNING_SECRET on both projects). */
export function secretMatches(provided: string | null): boolean {
  const secret = process.env.CONTRACT_SIGNING_SECRET;
  if (!secret || !provided || provided.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < secret.length; i++) diff |= secret.charCodeAt(i) ^ provided.charCodeAt(i);
  return diff === 0;
}

export function crmUrl(): string {
  return (process.env.CRM_URL || "https://crm.craftedkitchenandbath.com").replace(/\/$/, "");
}
