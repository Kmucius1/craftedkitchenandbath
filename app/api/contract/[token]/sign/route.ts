import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { contractByToken, sha256, signaturesFor } from "@/lib/contract/data";
import { ESIGN_CONSENT, canonicalDocument } from "@/lib/contract/template";
import { refreshAndFinalize } from "@/lib/contract/finalize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_SIGNATURE_BYTES = 300_000;

/**
 * Records one homeowner's signature.
 *
 * The request carries only what the homeowner chose — which signature line,
 * their signature, and which add-ons they ticked. Everything else (the terms,
 * the price, the document fingerprint) is read and computed here, so nothing
 * the browser sends can change what was signed.
 */
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const contract = await contractByToken(token);
  if (!contract) return NextResponse.json({ error: "This contract link is not valid." }, { status: 404 });

  if (contract.status === "draft") {
    return NextResponse.json({ error: "This is a preview. It can be signed once Crafted sends it to you." }, { status: 409 });
  }
  if (contract.status === "void") return NextResponse.json({ error: "This contract was cancelled." }, { status: 409 });
  if (contract.status === "signed") return NextResponse.json({ error: "This contract is already signed." }, { status: 409 });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const terms = contract.terms;

  const index = Number(body.signer_index);
  if (!Number.isInteger(index) || index < 0 || index >= terms.homeowners.length) {
    return NextResponse.json({ error: "Choose whose signature this is." }, { status: 400 });
  }

  const typedName = typeof body.typed_name === "string" ? body.typed_name.trim() : "";
  if (typedName.length < 2) return NextResponse.json({ error: "Type your full name." }, { status: 400 });

  if (body.consent !== true) {
    return NextResponse.json({ error: "Please agree to sign electronically." }, { status: 400 });
  }

  const type = body.signature_type === "drawn" ? "drawn" : "typed";
  let signatureData = typedName;
  if (type === "drawn") {
    const data = typeof body.signature_data === "string" ? body.signature_data : "";
    if (!data.startsWith("data:image/png;base64,") || data.length > MAX_SIGNATURE_BYTES) {
      return NextResponse.json({ error: "Draw your signature in the box, or switch to typing it." }, { status: 400 });
    }
    signatureData = data;
  }

  // Add-ons: only real optional lines from this contract's estimate.
  const optionalIds = new Set(
    (terms.estimate?.sections ?? []).flatMap((s) => s.lines.filter((l) => l.optional).map((l) => l.id)),
  );
  const selected = Array.isArray(body.selected_options)
    ? [...new Set(body.selected_options.map(String))].filter((id) => optionalIds.has(id)).sort()
    : [];

  const existing = await signaturesFor(contract.id);
  if (existing.some((s) => s.signer_index === index)) {
    return NextResponse.json({ error: `${terms.homeowners[index].name} has already signed.` }, { status: 409 });
  }
  // Two spouses sign one agreement: the second must sign what the first did.
  if (existing.length) {
    const agreed = [...(existing[0].selected_options ?? [])].sort();
    if (JSON.stringify(agreed) !== JSON.stringify(selected)) {
      return NextResponse.json(
        { error: "The add-ons were already chosen by the first signer. Reload the page to see them." },
        { status: 409 },
      );
    }
  }

  const documentHash = sha256(
    canonicalDocument(contract, terms, { amount: Number(contract.amount ?? 0), selected }),
  );

  const forwarded = request.headers.get("x-forwarded-for");
  const { error } = await getSupabase().from("contract_signatures").insert({
    contract_id: contract.id,
    signer_index: index,
    signer_name: typedName,
    signer_email: terms.homeowners[index].email,
    signature_type: type,
    signature_data: signatureData,
    consent_text: ESIGN_CONSENT,
    ip_address: forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip"),
    user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    document_hash: documentHash,
    selected_options: selected,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: `${terms.homeowners[index].name} has already signed.` }, { status: 409 });
    }
    console.error("[contract.sign] insert failed", error);
    return NextResponse.json({ error: "Your signature could not be saved. Please try again." }, { status: 500 });
  }

  const state = await refreshAndFinalize(contract.id);
  return NextResponse.json({ ok: true, state, documentHash });
}
