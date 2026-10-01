import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/db";
import { contractByToken, signaturesFor } from "@/lib/contract/data";
import { finalizeIfComplete } from "@/lib/contract/finalize";
import { optionsTotal } from "@/lib/contract/template";
import SignContract from "@/components/contract/SignContract";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Review and sign your contract | Crafted Kitchen & Bath",
  robots: { index: false, follow: false },
};

export default async function ContractPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { token } = await params;
  const { from } = await searchParams;
  let contract = await contractByToken(token);
  if (!contract) notFound();

  let signatures = await signaturesFor(contract.id);

  // A finished signing whose last step was cut short (the CRM was briefly
  // unreachable) completes itself the next time anyone opens the link.
  if (
    contract.status === "sent" &&
    contract.terms.homeowners.every((_, i) => signatures.some((s) => s.signer_index === i))
  ) {
    await finalizeIfComplete(contract);
    contract = (await contractByToken(token)) ?? contract;
    signatures = await signaturesFor(contract.id);
  }

  // "Opened" is for Tylor's benefit — his own clicks from the CRM don't count.
  if (contract.status === "sent" && from !== "crm") {
    const now = new Date().toISOString();
    await getSupabase()
      .from("contracts")
      .update({ last_viewed_at: now, ...(contract.first_viewed_at ? {} : { first_viewed_at: now }) })
      .eq("id", contract.id);
  }

  return (
    <SignContract
      token={token}
      contract={{
        contract_number: contract.contract_number,
        status: contract.status,
        // Once signed, the CRM has added the chosen add-ons into `amount`; the
        // page always works from the base price and adds them itself.
        amount:
          contract.status === "signed"
            ? Number(contract.amount ?? 0) - optionsTotal(contract.terms, contract.selected_options ?? [])
            : Number(contract.amount ?? 0),
        terms: contract.terms,
        contractor_signed_at: contract.contractor_signed_at,
        selected_options: contract.selected_options ?? [],
        has_pdf: !!contract.signed_pdf_path,
      }}
      signatures={signatures.map((s) => ({
        signer_index: s.signer_index,
        signer_name: s.signer_name,
        signature_type: s.signature_type,
        signature_data: s.signature_data,
        created_at: s.created_at,
        selected_options: s.selected_options ?? [],
      }))}
    />
  );
}
