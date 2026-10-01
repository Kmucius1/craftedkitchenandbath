import { NextResponse } from "next/server";
import { contractById, secretMatches, siteOrigin } from "@/lib/contract/data";
import { sendSigningRequest } from "@/lib/contract/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The CRM asks the website to email the signing link (the website holds the
 * Resend key). Authenticated by the shared CONTRACT_SIGNING_SECRET.
 */
export async function POST(request: Request) {
  if (!secretMatches(request.headers.get("x-contract-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { contract_id?: string };
  const contract = await contractById(body.contract_id ?? "");
  if (!contract || !contract.terms || !("version" in contract.terms)) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }
  if (contract.status !== "sent") {
    return NextResponse.json({ error: `The contract is ${contract.status}, not out for signature.` }, { status: 409 });
  }

  const result = await sendSigningRequest(contract, `${siteOrigin()}/contract/${contract.sign_token}`);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 });
  return NextResponse.json({ ok: true, sentTo: result.sentTo });
}
