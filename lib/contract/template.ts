import type { ContractTerms } from "./types";

/**
 * Crafted Kitchen and Bath's residential remodel contract.
 *
 * The wording is Tylor's own, taken from his signed contracts (Anderson,
 * Kamis, Morton — May 2026). Sections 5–10 were word-for-word identical on all
 * three and are fixed here. Everything that varied comes from `terms`, which
 * Tylor fills in from the CRM.
 *
 * Rendered to a list of blocks so the signing page and the signed PDF are
 * built from the very same text — what the homeowner reads is what they get.
 *
 * Bump TEMPLATE_VERSION whenever the fixed wording changes. Contracts record
 * the version they were signed under.
 */
export const TEMPLATE_VERSION = 1;

export type Block =
  | { kind: "title"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string; bold?: boolean }
  | { kind: "list"; items: string[] }
  | { kind: "parties"; rows: { label: string; lines: string[] }[] }
  | { kind: "notice"; title: string; text: string };

export function money(value: number, cents = false): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents || value % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function longDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  const day = date.getUTCDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${date.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })} ${day}${suffix}, ${date.getUTCFullYear()}`;
}

function article(noun: string): string {
  return /^[aeiou]/i.test(noun.trim()) ? "an" : "a";
}

export function fullAddress(p: ContractTerms["property"]): string {
  return [p.address, [p.city, [p.state, p.zip].filter(Boolean).join(" ")].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(", ");
}

/** Sum of the optional estimate lines the homeowner ticked. */
export function optionsTotal(terms: ContractTerms, selected: string[]): number {
  const ids = new Set(selected);
  let total = 0;
  for (const section of terms.estimate?.sections ?? []) {
    for (const line of section.lines) if (line.optional && ids.has(line.id)) total += Number(line.amount) || 0;
  }
  return Math.round(total * 100) / 100;
}

export function selectedLines(terms: ContractTerms, selected: string[]) {
  const ids = new Set(selected);
  return (terms.estimate?.sections ?? []).flatMap((s) => s.lines.filter((l) => l.optional && ids.has(l.id)));
}

export const LIEN_LAW_NOTICE =
  "ACCORDING TO FLORIDA'S CONSTRUCTION LIEN LAW (SECTIONS 713.001-713.37, FLORIDA STATUTES), THOSE WHO WORK ON YOUR PROPERTY OR PROVIDE MATERIALS AND SERVICES AND ARE NOT PAID IN FULL HAVE A RIGHT TO ENFORCE THEIR CLAIM FOR PAYMENT AGAINST YOUR PROPERTY. THIS CLAIM IS KNOWN AS A CONSTRUCTION LIEN. IF YOUR CONTRACTOR OR A SUBCONTRACTOR FAILS TO PAY SUBCONTRACTORS, SUB-SUBCONTRACTORS, OR MATERIAL SUPPLIERS, THOSE PEOPLE WHO ARE OWED MONEY MAY LOOK TO YOUR PROPERTY FOR PAYMENT, EVEN IF YOU HAVE ALREADY PAID YOUR CONTRACTOR IN FULL. IF YOU FAIL TO PAY YOUR CONTRACTOR, YOUR CONTRACTOR MAY ALSO HAVE A LIEN ON YOUR PROPERTY. THIS MEANS IF A LIEN IS FILED YOUR PROPERTY COULD BE SOLD AGAINST YOUR WILL TO PAY FOR LABOR, MATERIALS, OR OTHER SERVICES THAT YOUR CONTRACTOR OR A SUBCONTRACTOR MAY HAVE FAILED TO PAY. TO PROTECT YOURSELF, YOU SHOULD STIPULATE IN THIS CONTRACT THAT BEFORE ANY PAYMENT IS MADE, YOUR CONTRACTOR IS REQUIRED TO PROVIDE YOU WITH A WRITTEN RELEASE OF LIEN FROM ANY PERSON OR COMPANY THAT HAS PROVIDED TO YOU A \"NOTICE TO OWNER.\" FLORIDA'S CONSTRUCTION LIEN LAW IS COMPLEX, AND IT IS RECOMMENDED THAT YOU CONSULT AN ATTORNEY.";

export const RECOVERY_FUND_NOTICE =
  "PAYMENT, UP TO A LIMITED AMOUNT, MAY BE AVAILABLE FROM THE FLORIDA HOMEOWNERS' CONSTRUCTION RECOVERY FUND IF YOU LOSE MONEY ON A PROJECT PERFORMED UNDER CONTRACT, WHERE THE LOSS RESULTS FROM SPECIFIED VIOLATIONS OF FLORIDA LAW BY A LICENSED CONTRACTOR. FOR INFORMATION ABOUT THE RECOVERY FUND AND FILING A CLAIM, CONTACT THE FLORIDA CONSTRUCTION INDUSTRY LICENSING BOARD AT THE FOLLOWING TELEPHONE NUMBER AND ADDRESS: (850) 487-1395, 2601 BLAIR STONE ROAD, TALLAHASSEE, FL 32399-0783.";

export const ESIGN_CONSENT =
  "I agree to sign this contract electronically. My electronic signature has the same legal effect as a handwritten signature, and I have been able to review the full contract and the attached estimate before signing.";

export function renderContract(
  terms: ContractTerms,
  opts: { amount: number; selected: string[] },
): Block[] {
  const c = terms.contractor;
  const address = fullAddress(terms.property);
  const addOns = optionsTotal(terms, opts.selected);
  const total = Math.round((opts.amount + addOns) * 100) / 100;
  const homeowners = terms.homeowners;

  const draws = terms.draws.map((d, i) =>
    i === terms.draws.length - 1 ? { ...d, amount: Math.round((Number(d.amount) + addOns) * 100) / 100 } : d,
  );

  const blocks: Block[] = [
    { kind: "title", text: terms.title.toUpperCase() },
    { kind: "paragraph", text: `This Contract is entered into on ${longDate(terms.contract_date)}, between:` },
    {
      kind: "parties",
      rows: [
        {
          label: homeowners.length > 1 ? "Homeowners" : "Homeowner",
          lines: [
            `Name: ${homeowners.map((h) => h.name).join(" and ")}`,
            `Address: ${address}`,
            ...(homeowners.some((h) => h.phone) ? [`Phone: ${homeowners.map((h) => h.phone).filter(Boolean).join(", ")}`] : []),
            ...(homeowners.some((h) => h.email) ? [`Email: ${homeowners.map((h) => h.email).filter(Boolean).join(", ")}`] : []),
          ],
        },
        {
          label: "Contractor",
          lines: c
            ? [
                `Name: ${c.legal_name} – ${c.signer}`,
                ...(c.license ? [`License Number: ${c.license}`] : []),
                `Address: ${c.address}`,
                `Phone: ${c.phone}`,
                `Email: ${c.email}`,
              ]
            : ["Crafted Kitchen and Bath (details are added when the contract is sent)"],
        },
      ],
    },

    { kind: "heading", text: "1. Scope of Work" },
    {
      kind: "paragraph",
      text: `Contractor agrees to provide all labor, materials, and equipment necessary to complete ${article(terms.project_kind)} ${terms.project_kind} at the homeowner’s property located at ${terms.property.address}, including but not limited to:`,
    },
    { kind: "list", items: terms.scope_items.filter((s) => s.trim()) },
    ...(terms.estimate
      ? [{ kind: "paragraph" as const, text: `A more detailed description is provided in the attached Estimate ${terms.estimate.number} (Attachment A), which is part of this contract.` }]
      : []),
    ...(addOns > 0
      ? [{
          kind: "paragraph" as const,
          text: `The homeowner has also selected the following optional items, which are included in this contract: ${selectedLines(terms, opts.selected).map((l) => `${l.description} (${money(l.amount)})`).join("; ")}.`,
        }]
      : []),

    { kind: "heading", text: "2. Project Timeline" },
    {
      kind: "paragraph",
      text: `Work is estimated to commence on or about ${longDate(terms.start_date)}, and is expected to be substantially completed by ${longDate(terms.completion_date)}, subject to unforeseen delays.`,
    },

    { kind: "heading", text: "3. Contract Price and Payment Terms" },
    { kind: "paragraph", text: `Total contract price: ${money(total)}`, bold: true },
    { kind: "paragraph", text: "Payment schedule:" },
    { kind: "list", items: draws.map((d) => `${money(Number(d.amount))} – ${d.label}`) },
    {
      kind: "paragraph",
      text:
        terms.payment_terms === "draw_notice"
          ? "All payments are to be made via cash or check and are due within 48 hours of draw notice."
          : "All payments are to be made via cash or check. A 3.5% processing fee applies to credit card payments.",
    },

    { kind: "heading", text: "4. Change Orders" },
    {
      kind: "paragraph",
      text:
        terms.change_orders === "text_email"
          ? "Any changes to the scope of work or materials must be agreed to in writing via a Change Order and may affect the total price and timeline. A text message/email will be sent with the change requested and the price associated with that change, and a written approval response will be necessary to apply the change order to this contract."
          : "Any changes to the scope of work or materials must be agreed to in writing via a Change Order signed by both parties and may affect the total price and timeline.",
    },

    { kind: "heading", text: "5. Permits and Approvals" },
    {
      kind: "paragraph",
      text: "The contractor will obtain all necessary permits unless otherwise agreed. The homeowner agrees to cooperate with the contractor in securing such approvals and signing necessary paperwork to keep the permitting process moving in a timely manner.",
    },

    { kind: "heading", text: "6. Warranties" },
    {
      kind: "paragraph",
      text: "The contractor warrants that all work will be completed in a professional manner and in compliance with applicable building codes. The contractor provides a 5-year warranty on labor from the date of completion. Manufacturer warranties apply to all materials used.",
    },

    { kind: "heading", text: "7. Insurance" },
    {
      kind: "paragraph",
      text: `The contractor affirms that ${c?.legal_name ?? "Crafted Kitchen and Bath"} carries adequate general liability insurance and worker’s compensation coverage and will provide proof upon request.`,
    },

    { kind: "heading", text: "8. Termination" },
    {
      kind: "paragraph",
      text: "Either party may terminate this contract if the other party fails to uphold its obligations. In the event of termination, the homeowner will pay for work completed to date.",
    },

    { kind: "heading", text: "9. Dispute Resolution" },
    {
      kind: "paragraph",
      text: "Any disputes shall first be attempted to be resolved through mediation. If unresolved, disputes may be submitted to binding arbitration in Oldsmar, FL.",
    },

    { kind: "heading", text: "10. Entire Agreement" },
    {
      kind: "paragraph",
      text: "This document and its attachments represent the entire agreement between the parties. Any modifications must be in writing and signed by both parties.",
    },
  ];

  if (terms.additional_terms?.trim()) {
    blocks.push({ kind: "heading", text: "11. Additional Terms" });
    for (const para of terms.additional_terms.split(/\n{2,}/)) {
      if (para.trim()) blocks.push({ kind: "paragraph", text: para.trim() });
    }
  }

  blocks.push(
    { kind: "heading", text: "Notices Required by Florida Law" },
    { kind: "notice", title: "Florida Construction Lien Law", text: LIEN_LAW_NOTICE },
    { kind: "notice", title: "Florida Homeowners’ Construction Recovery Fund", text: RECOVERY_FUND_NOTICE },
  );

  return blocks;
}

/**
 * The canonical text a signature is made on: the contract as rendered for
 * this homeowner's choices, plus the attached estimate. Hashing it ties each
 * signature to exactly one version of the document.
 */
export function canonicalDocument(
  contract: { contract_number: string; template_version: number },
  terms: ContractTerms,
  opts: { amount: number; selected: string[] },
): string {
  return JSON.stringify({
    contract: contract.contract_number,
    template: contract.template_version,
    blocks: renderContract(terms, opts),
    estimate: terms.estimate,
    selected: [...opts.selected].sort(),
  });
}
