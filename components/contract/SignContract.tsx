"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContractStatus, ContractTerms } from "@/lib/contract/types";
import { ESIGN_CONSENT, fullAddress, longDate, money, optionsTotal, renderContract, type Block } from "@/lib/contract/template";

type Props = {
  token: string;
  contract: {
    contract_number: string;
    status: ContractStatus;
    amount: number;
    terms: ContractTerms;
    contractor_signed_at: string | null;
    selected_options: string[];
    has_pdf: boolean;
  };
  signatures: {
    signer_index: number;
    signer_name: string;
    signature_type: "drawn" | "typed";
    signature_data: string;
    created_at: string;
    selected_options: string[];
  }[];
};

const BLUE = "#1F5FAC";
const ACCENT = "#2B7CC1";
const INK = "#1A202C";
const MUTED = "#4A5568";
const LINE = "#E5E7EB";

/**
 * What the homeowner sees: a plain-English summary up top, the add-ons they
 * can choose, the full contract and estimate, and a signature line for each
 * homeowner. Designed for a phone first — that is where the email gets opened.
 */
export default function SignContract({ token, contract, signatures }: Props) {
  const { terms } = contract;
  const router = useRouter();

  const optional = useMemo(
    () => (terms.estimate?.sections ?? []).flatMap((s) => s.lines.filter((l) => l.optional).map((l) => ({ ...l, section: s.name }))),
    [terms.estimate],
  );

  // Once anyone has signed, the add-ons are part of what was signed.
  const locked = contract.status !== "sent" || signatures.length > 0;
  const initialSelected =
    contract.status === "signed" ? contract.selected_options : signatures[0]?.selected_options ?? [];
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const addOns = optionsTotal(terms, selected);
  const total = contract.amount + addOns;
  const blocks = useMemo(() => renderContract(terms, { amount: contract.amount, selected }), [terms, contract.amount, selected]);

  const unsigned = terms.homeowners.map((_, i) => i).filter((i) => !signatures.some((s) => s.signer_index === i));
  const [activeSigner, setActiveSigner] = useState<number | null>(unsigned.length === 1 ? unsigned[0] : null);

  const signable = contract.status === "sent";

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", color: INK }}>
      <header style={{ background: BLUE, padding: "14px 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Crafted Kitchen & Bath" style={{ height: 34, width: "auto", filter: "brightness(0) invert(1)" }} />
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
            Contract {contract.contract_number}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 80px" }}>
        {contract.status === "draft" && (
          <Banner tone="amber">
            <strong>Preview.</strong> This is exactly what the homeowner will see. Signing turns on once the contract is sent from the CRM.
          </Banner>
        )}
        {contract.status === "void" && (
          <Banner tone="rose">
            This contract was cancelled by Crafted Kitchen and Bath. If you have questions, call (727) 383-7550.
          </Banner>
        )}
        {contract.status === "signed" && (
          <Banner tone="green">
            <strong>Signed — thank you!</strong> A copy has been emailed to you.{" "}
            {contract.has_pdf && (
              <a href={`/api/contract/${token}/pdf`} target="_blank" rel="noopener" style={{ color: "#065F46", fontWeight: 700 }}>
                Download the signed PDF
              </a>
            )}
          </Banner>
        )}

        {/* At a glance */}
        <section style={card}>
          <p style={eyebrow}>Your contract at a glance</p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", margin: "4px 0 6px", lineHeight: 1.15 }}>{terms.title}</h1>
          <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>
            {terms.homeowners.map((h) => h.name).join(" and ")} · {fullAddress(terms.property)}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 18 }}>
            <Stat label="Total price" value={money(total)} strong />
            <Stat label="Deposit at signing" value={money(Number(terms.draws[0]?.amount ?? 0))} />
            <Stat label="Work starts about" value={longDate(terms.start_date)} />
            <Stat label="Substantially complete by" value={longDate(terms.completion_date)} />
          </div>
          {signable && (
            <p style={{ margin: "16px 0 0", fontSize: 13.5, color: MUTED, lineHeight: 1.6 }}>
              Read through the contract and estimate below, {optional.length ? "choose any add-ons you want, " : ""}then sign at the bottom. Questions first? Call or text Tylor at <a href="tel:+17273837550" style={{ color: ACCENT }}>(727) 383-7550</a>.
            </p>
          )}
        </section>

        {/* Add-ons */}
        {optional.length > 0 && (
          <section style={card}>
            <h2 style={h2}>Optional add-ons</h2>
            <p style={{ margin: "0 0 12px", color: MUTED, fontSize: 14 }}>
              {locked
                ? "These are the add-ons included in this contract."
                : "Tick anything you'd like included. The total and final payment update as you go."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {optional.map((line) => {
                const on = selected.includes(line.id);
                return (
                  <label
                    key={line.id}
                    style={{
                      display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 8,
                      border: `1px solid ${on ? ACCENT : LINE}`, background: on ? "#EEF5FB" : "#fff",
                      cursor: locked ? "default" : "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={locked}
                      onChange={() => setSelected((cur) => (on ? cur.filter((id) => id !== line.id) : [...cur, line.id]))}
                      style={{ width: 18, height: 18, marginTop: 2, accentColor: ACCENT }}
                    />
                    <span style={{ flex: 1, fontSize: 14.5, lineHeight: 1.5 }}>
                      {line.description}
                      <span style={{ display: "block", fontSize: 12, color: MUTED }}>{line.section}</span>
                    </span>
                    <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>+{money(line.amount)}</span>
                  </label>
                );
              })}
            </div>
            {addOns > 0 && (
              <p style={{ margin: "12px 0 0", fontSize: 14 }}>
                Add-ons: <strong>{money(addOns)}</strong> · New total: <strong>{money(total)}</strong> (added to the final payment)
              </p>
            )}
          </section>
        )}

        {/* The contract */}
        <section style={{ ...card, padding: "28px clamp(18px, 4vw, 40px)" }}>
          <ContractBlocks blocks={blocks} />
        </section>

        {/* Attachment A */}
        {terms.estimate && (
          <section style={card}>
            <p style={eyebrow}>Attachment A</p>
            <h2 style={{ ...h2, marginTop: 4 }}>Estimate {terms.estimate.number}</h2>
            {terms.estimate.scope_summary && <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{terms.estimate.scope_summary}</p>}
            {terms.estimate.sections.map((section) => (
              <div key={section.name} style={{ borderTop: `1px solid ${LINE}`, padding: "16px 0 4px" }}>
                <h3 style={{ fontSize: 16, margin: "0 0 8px", color: BLUE }}>{section.name}</h3>
                <ul style={{ margin: "0 0 10px", paddingLeft: 20, fontSize: 14, lineHeight: 1.65, color: INK }}>
                  {section.lines.filter((l) => !l.optional).map((line) => (
                    <li key={line.id}>{line.description}</li>
                  ))}
                </ul>
                <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14 }}>
                  {section.name} budget: {money(section.subtotal)}
                </p>
              </div>
            ))}
            <p style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14, margin: 0, fontWeight: 800, fontSize: 16 }}>
              Estimate total: {money(terms.estimate.total)}
              {addOns > 0 && <span style={{ fontWeight: 600, color: MUTED }}> · with add-ons {money(terms.estimate.total + addOns)}</span>}
            </p>
          </section>
        )}

        {/* Signatures */}
        <section style={card} id="sign">
          <h2 style={h2}>Signatures</h2>

          {terms.homeowners.map((homeowner, index) => {
            const signature = signatures.find((s) => s.signer_index === index);
            if (signature) {
              return (
                <SignedLine
                  key={index}
                  label={`Homeowner — ${homeowner.name}`}
                  type={signature.signature_type}
                  data={signature.signature_data}
                  at={signature.created_at}
                />
              );
            }
            if (!signable) {
              return <SignedLine key={index} label={`Homeowner — ${homeowner.name}`} pending />;
            }
            if (activeSigner === index) {
              return (
                <SignPad
                  key={index}
                  token={token}
                  index={index}
                  name={homeowner.name}
                  selected={selected}
                  onSigned={() => {
                    setActiveSigner(null);
                    router.refresh();
                  }}
                  onCancel={terms.homeowners.length > 1 ? () => setActiveSigner(null) : undefined}
                />
              );
            }
            return (
              <div key={index} style={{ border: `1px dashed ${LINE}`, borderRadius: 8, padding: 16, marginBottom: 12, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14.5 }}>Homeowner — <strong>{homeowner.name}</strong></span>
                <button type="button" onClick={() => setActiveSigner(index)} style={primaryButton}>
                  Sign as {homeowner.name.split(" ")[0]}
                </button>
              </div>
            );
          })}

          {terms.contractor && (
            <SignedLine
              label={`Contractor — ${terms.contractor.legal_name}`}
              type="typed"
              data={`${terms.contractor.signer}, ${terms.contractor.signer_title}`}
              at={contract.contractor_signed_at}
            />
          )}
        </section>
      </main>
    </div>
  );
}

function ContractBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ fontSize: 15, lineHeight: 1.75, color: INK }}>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "title":
            return <h2 key={i} style={{ fontSize: "clamp(18px, 3vw, 22px)", margin: "0 0 14px", letterSpacing: 0.5 }}>{block.text}</h2>;
          case "heading":
            return <h3 key={i} style={{ fontSize: 16.5, margin: "26px 0 8px" }}>{block.text}</h3>;
          case "paragraph":
            return <p key={i} style={{ margin: "0 0 12px", fontWeight: block.bold ? 800 : 400, fontSize: block.bold ? 17 : 15 }}>{block.text}</p>;
          case "list":
            return (
              <ul key={i} style={{ margin: "0 0 14px", paddingLeft: 22 }}>
                {block.items.map((item, j) => <li key={j} style={{ marginBottom: 4 }}>{item}</li>)}
              </ul>
            );
          case "parties":
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, margin: "6px 0 10px" }}>
                {block.rows.map((row) => (
                  <div key={row.label} style={{ background: "#F7F8FA", borderRadius: 8, padding: "12px 14px", fontSize: 14, lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>{row.label}</div>
                    {row.lines.map((line) => <div key={line} style={{ overflowWrap: "anywhere" }}>{line}</div>)}
                  </div>
                ))}
              </div>
            );
          case "notice":
            return (
              <div key={i} style={{ border: `2px solid ${INK}`, borderRadius: 6, padding: "12px 14px", margin: "10px 0 14px" }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{block.title.toUpperCase()}</div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, lineHeight: 1.6 }}>{block.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}

function SignedLine({ label, type, data, at, pending }: { label: string; type?: "drawn" | "typed"; data?: string; at?: string | null; pending?: boolean }) {
  return (
    <div style={{ borderBottom: `1px solid ${LINE}`, padding: "14px 0", marginBottom: 6 }}>
      <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>{label}</div>
      {pending ? (
        <div style={{ color: MUTED, fontStyle: "italic", fontSize: 14 }}>Not yet signed</div>
      ) : type === "drawn" && data ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data} alt={`Signature: ${label}`} style={{ height: 56, width: "auto", maxWidth: "100%" }} />
      ) : (
        <div style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontSize: 30, color: "#14335F", lineHeight: 1.2 }}>{data}</div>
      )}
      {at && (
        <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>
          Signed electronically {new Date(at).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
        </div>
      )}
    </div>
  );
}

function SignPad({
  token,
  index,
  name,
  selected,
  onSigned,
  onCancel,
}: {
  token: string;
  index: number;
  name: string;
  selected: string[];
  onSigned: () => void;
  onCancel?: () => void;
}) {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState(name);
  const [consent, setConsent] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    if (mode !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#14335F";
    setHasInk(false);
  }, [mode]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = e.currentTarget.getContext("2d")!;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.1, p.y + 0.1);
    ctx.stroke();
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    const p = point(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setHasInk(true);
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }

  async function submit() {
    setError(null);
    if (typedName.trim().length < 2) return setError("Type your full name.");
    if (mode === "draw" && !hasInk) return setError("Draw your signature in the box, or switch to typing it.");
    if (!consent) return setError("Please tick the box to agree to sign electronically.");

    setBusy(true);
    try {
      const response = await fetch(`/api/contract/${token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signer_index: index,
          typed_name: typedName.trim(),
          signature_type: mode === "draw" ? "drawn" : "typed",
          signature_data: mode === "draw" ? canvasRef.current?.toDataURL("image/png") : undefined,
          consent: true,
          selected_options: selected,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Your signature could not be saved. Please try again.");
      onSigned();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div style={{ border: `2px solid ${ACCENT}`, borderRadius: 10, padding: 16, marginBottom: 14, background: "#FBFDFF" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <strong style={{ fontSize: 15 }}>Sign as {name}</strong>
        <div style={{ display: "flex", gap: 4, background: "#EEF2F6", borderRadius: 6, padding: 3 }}>
          {(["draw", "type"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} style={{ border: 0, borderRadius: 4, padding: "6px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", background: mode === m ? "#fff" : "transparent", color: mode === m ? INK : MUTED, boxShadow: mode === m ? "0 1px 2px rgba(0,0,0,0.1)" : "none" }}>
              {m === "draw" ? "Draw" : "Type"}
            </button>
          ))}
        </div>
      </div>

      <label style={{ display: "block", fontSize: 13, color: MUTED, margin: "14px 0 6px" }}>Your full legal name</label>
      <input value={typedName} onChange={(e) => setTypedName(e.target.value)} autoComplete="name" style={{ width: "100%", height: 44, border: `1px solid #CBD5E0`, borderRadius: 6, padding: "0 12px", fontSize: 16 }} />

      {mode === "draw" ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "14px 0 6px" }}>
            <span style={{ fontSize: 13, color: MUTED }}>Draw your signature with your finger or mouse</span>
            <button type="button" onClick={clear} style={{ border: 0, background: "none", color: ACCENT, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear</button>
          </div>
          <canvas
            ref={canvasRef}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
            style={{ width: "100%", height: 150, background: "#fff", border: `1px solid #CBD5E0`, borderRadius: 6, touchAction: "none", cursor: "crosshair", display: "block" }}
            aria-label="Signature pad"
          />
        </>
      ) : (
        <div style={{ margin: "14px 0 0", background: "#fff", border: `1px solid #CBD5E0`, borderRadius: 6, padding: "18px 14px", minHeight: 70, fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontSize: 34, color: "#14335F" }}>
          {typedName || " "}
        </div>
      )}

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.55, color: INK, cursor: "pointer" }}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, accentColor: ACCENT }} />
        {ESIGN_CONSENT}
      </label>

      {error && <p style={{ color: "#B91C1C", fontSize: 13.5, margin: "12px 0 0" }}>{error}</p>}

      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        <button type="button" onClick={submit} disabled={busy} style={{ ...primaryButton, opacity: busy ? 0.6 : 1, flex: "1 1 200px", height: 48, fontSize: 15 }}>
          {busy ? "Signing…" : "Sign contract"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ ...primaryButton, background: "transparent", color: MUTED, border: `1px solid ${LINE}` }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function Banner({ tone, children }: { tone: "amber" | "rose" | "green"; children: React.ReactNode }) {
  const colors = {
    amber: { bg: "#FFFBEB", border: "#FCD34D", fg: "#78350F" },
    rose: { bg: "#FFF1F2", border: "#FDA4AF", fg: "#881337" },
    green: { bg: "#ECFDF5", border: "#6EE7B7", fg: "#065F46" },
  }[tone];
  return (
    <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.fg, borderRadius: 8, padding: "12px 16px", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div style={{ background: "#F7F8FA", borderRadius: 8, padding: "10px 12px" }}>
      <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
      <div style={{ fontSize: strong ? 22 : 15.5, fontWeight: 800, marginTop: 2 }}>{value || "—"}</div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${LINE}`,
  borderRadius: 12,
  padding: "22px clamp(16px, 4vw, 28px)",
  marginBottom: 16,
};

const eyebrow: React.CSSProperties = { margin: 0, fontSize: 11.5, letterSpacing: 1.2, textTransform: "uppercase", color: ACCENT, fontWeight: 700 };
const h2: React.CSSProperties = { fontSize: 19, margin: "0 0 10px" };
const primaryButton: React.CSSProperties = {
  background: ACCENT,
  color: "#fff",
  border: 0,
  borderRadius: 6,
  padding: "0 18px",
  height: 42,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};
