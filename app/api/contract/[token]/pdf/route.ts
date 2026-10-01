import { getSupabase } from "@/lib/db";
import { FILES_BUCKET, contractByToken } from "@/lib/contract/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The sealed, signed PDF — available to whoever holds the contract link. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const contract = await contractByToken(token);
  if (!contract || contract.status !== "signed" || !contract.signed_pdf_path) {
    return new Response("Not found", { status: 404 });
  }

  const { data, error } = await getSupabase().storage.from(FILES_BUCKET).download(contract.signed_pdf_path);
  if (error || !data) return new Response("Not found", { status: 404 });

  return new Response(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${contract.contract_number}-signed.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
