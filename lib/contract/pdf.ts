import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { ContractRow, SignatureRow } from "./types";
import { fullAddress, longDate, money, optionsTotal, renderContract, type Block } from "./template";

/**
 * The signed contract as a PDF: the contract, every signature with its
 * evidence (time, IP, device, document fingerprint), and the estimate as
 * Attachment A. Built from the same blocks the signing page shows.
 */

const PAGE = { width: 612, height: 792, margin: 54 };
const INK = rgb(0.1, 0.13, 0.17);
const MUTED = rgb(0.42, 0.45, 0.5);
const BLUE = rgb(0.17, 0.49, 0.76);

// The standard PDF fonts only speak WinAnsi. Anything outside it would throw
// mid-render, so map the usual typography to safe equivalents first.
function safe(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "");
}

class Writer {
  page!: PDFPage;
  y = 0;
  constructor(
    private doc: PDFDocument,
    private font: PDFFont,
    private bold: PDFFont,
    private footer: string,
  ) {
    this.newPage();
  }

  newPage() {
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.y = PAGE.height - PAGE.margin;
    this.page.drawText(safe(this.footer), { x: PAGE.margin, y: 28, size: 7.5, font: this.font, color: MUTED });
  }

  ensure(height: number) {
    if (this.y - height < PAGE.margin) this.newPage();
  }

  lines(text: string, size: number, font: PDFFont, width: number): string[] {
    const out: string[] = [];
    for (const paragraph of safe(text).split("\n")) {
      let line = "";
      for (const word of paragraph.split(/\s+/)) {
        const attempt = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(attempt, size) > width && line) {
          out.push(line);
          line = word;
        } else line = attempt;
      }
      out.push(line);
    }
    return out;
  }

  text(text: string, opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; indent?: number; gap?: number } = {}) {
    const size = opts.size ?? 10;
    const font = opts.bold ? this.bold : this.font;
    const indent = opts.indent ?? 0;
    const lineHeight = size * 1.4;
    for (const line of this.lines(text, size, font, PAGE.width - PAGE.margin * 2 - indent)) {
      this.ensure(lineHeight);
      this.page.drawText(line, { x: PAGE.margin + indent, y: this.y - size, size, font, color: opts.color ?? INK });
      this.y -= lineHeight;
    }
    this.y -= opts.gap ?? 6;
  }

  bullet(text: string) {
    const size = 10;
    const lines = this.lines(text, size, this.font, PAGE.width - PAGE.margin * 2 - 16);
    lines.forEach((line, i) => {
      this.ensure(size * 1.4);
      if (i === 0) this.page.drawText("-", { x: PAGE.margin + 4, y: this.y - size, size, font: this.font, color: BLUE });
      this.page.drawText(line, { x: PAGE.margin + 16, y: this.y - size, size, font: this.font, color: INK });
      this.y -= size * 1.4;
    });
    this.y -= 2;
  }

  rule() {
    this.ensure(12);
    this.page.drawLine({
      start: { x: PAGE.margin, y: this.y - 4 },
      end: { x: PAGE.width - PAGE.margin, y: this.y - 4 },
      thickness: 0.6,
      color: rgb(0.85, 0.87, 0.9),
    });
    this.y -= 14;
  }
}

function writeBlocks(w: Writer, blocks: Block[]) {
  for (const block of blocks) {
    switch (block.kind) {
      case "title":
        w.text(block.text, { size: 15, bold: true, gap: 10 });
        break;
      case "heading":
        w.y -= 6;
        w.text(block.text, { size: 11.5, bold: true, gap: 4 });
        break;
      case "paragraph":
        w.text(block.text, { bold: block.bold });
        break;
      case "list":
        for (const item of block.items) w.bullet(item);
        w.y -= 4;
        break;
      case "parties":
        for (const row of block.rows) {
          w.text(`${row.label}:`, { bold: true, gap: 2 });
          for (const line of row.lines) w.text(line, { indent: 12, gap: 1 });
          w.y -= 6;
        }
        break;
      case "notice":
        w.text(block.title, { bold: true, size: 10, gap: 2 });
        w.text(block.text, { bold: true, size: 9, gap: 8 });
        break;
    }
  }
}

export async function buildSignedPdf(
  contract: ContractRow,
  signatures: SignatureRow[],
  documentHash: string,
): Promise<Uint8Array> {
  const terms = contract.terms;
  const selected = contract.selected_options?.length ? contract.selected_options : (signatures.at(-1)?.selected_options ?? []);
  const amount = Number(contract.amount ?? 0);
  // `contract.amount` is the base price until the CRM records the signing; the
  // template adds the ticked add-ons on top of whatever base it is given.
  const base = contract.status === "signed" ? amount - optionsTotal(terms, selected) : amount;

  const doc = await PDFDocument.create();
  doc.setTitle(`${contract.contract_number} - ${terms.title} (signed)`);
  doc.setAuthor(terms.contractor?.legal_name ?? "Crafted Kitchen and Bath");
  doc.setSubject(`Document fingerprint (SHA-256): ${documentHash}`);
  doc.setCreationDate(new Date());

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const w = new Writer(doc, font, bold, `${contract.contract_number} · ${terms.title} · Signed electronically · SHA-256 ${documentHash.slice(0, 16)}…`);

  try {
    const logo = await doc.embedPng(await readFile(path.join(process.cwd(), "public", "logo.png")));
    const width = 150;
    const height = (logo.height / logo.width) * width;
    w.page.drawImage(logo, { x: PAGE.margin, y: w.y - height, width, height });
    w.y -= height + 18;
  } catch {
    w.text("CRAFTED KITCHEN & BATH", { size: 16, bold: true, color: BLUE, gap: 14 });
  }

  writeBlocks(w, renderContract(terms, { amount: base, selected }));

  // Signatures
  w.y -= 8;
  w.text("SIGNATURES", { size: 11.5, bold: true, gap: 8 });
  for (const [index, homeowner] of terms.homeowners.entries()) {
    const signature = signatures.find((s) => s.signer_index === index);
    w.ensure(110);
    w.text(`Homeowner: ${homeowner.name}`, { bold: true, gap: 4 });
    if (signature?.signature_type === "drawn" && signature.signature_data.startsWith("data:image/png;base64,")) {
      const png = await doc.embedPng(Buffer.from(signature.signature_data.split(",")[1], "base64"));
      const height = 44;
      const width = Math.min((png.width / png.height) * height, 220);
      w.page.drawImage(png, { x: PAGE.margin + 12, y: w.y - height, width, height });
      w.y -= height + 4;
    } else if (signature) {
      w.text(signature.signature_data, { size: 18, bold: true, indent: 12, color: rgb(0.08, 0.2, 0.45), gap: 4 });
    }
    if (signature) {
      w.text(
        `Signed electronically ${new Date(signature.created_at).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "long", timeStyle: "short" })} ET · ${signature.signer_email ?? "no email"} · IP ${signature.ip_address ?? "unknown"}`,
        { size: 8, color: MUTED, indent: 12, gap: 1 },
      );
      w.text(`Device: ${(signature.user_agent ?? "unknown").slice(0, 140)}`, { size: 8, color: MUTED, indent: 12, gap: 10 });
    } else {
      w.text("Not yet signed", { size: 9, color: MUTED, indent: 12, gap: 10 });
    }
  }

  if (terms.contractor) {
    w.ensure(60);
    w.text(`Contractor: ${terms.contractor.legal_name}`, { bold: true, gap: 4 });
    w.text(`${terms.contractor.signer}, ${terms.contractor.signer_title}`, { size: 18, bold: true, indent: 12, color: rgb(0.08, 0.2, 0.45), gap: 4 });
    w.text(
      `Signed electronically when the contract was issued, ${contract.contractor_signed_at ? new Date(contract.contractor_signed_at).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "long", timeStyle: "short" }) + " ET" : ""}`,
      { size: 8, color: MUTED, indent: 12, gap: 10 },
    );
  }

  w.rule();
  w.text("Electronic signature record", { bold: true, size: 9, gap: 2 });
  w.text(
    `Each signer agreed: "I agree to sign this contract electronically. My electronic signature has the same legal effect as a handwritten signature." The document fingerprint below is a SHA-256 hash of the exact contract and estimate that was signed; any change to the text would produce a different fingerprint.`,
    { size: 8, color: MUTED, gap: 2 },
  );
  w.text(`SHA-256: ${documentHash}`, { size: 8, color: MUTED, gap: 4 });

  // Attachment A — the estimate
  if (terms.estimate) {
    w.newPage();
    w.text(`ATTACHMENT A — ESTIMATE ${terms.estimate.number}`, { size: 13, bold: true, gap: 4 });
    w.text(
      `${terms.homeowners.map((h) => h.name).join(" and ")} · ${fullAddress(terms.property)}${terms.estimate.date ? ` · ${longDate(terms.estimate.date)}` : ""}`,
      { size: 9, color: MUTED, gap: 10 },
    );
    if (terms.estimate.scope_summary) w.text(terms.estimate.scope_summary, { gap: 8 });
    const ids = new Set(selected);
    for (const section of terms.estimate.sections) {
      w.ensure(40);
      w.text(section.name, { size: 11.5, bold: true, color: BLUE, gap: 4 });
      for (const line of section.lines.filter((l) => !l.optional)) w.bullet(line.description);
      w.text(`${section.name} budget: ${money(section.subtotal)}`, { bold: true, gap: 6 });
      const optional = section.lines.filter((l) => l.optional);
      if (optional.length) {
        w.text("Optional add-ons:", { size: 9.5, bold: true, gap: 2 });
        for (const line of optional) {
          w.bullet(`[${ids.has(line.id) ? "X" : " "}] ${line.description} (+${money(line.amount)})${ids.has(line.id) ? " — selected" : " — not selected"}`);
        }
      }
      w.y -= 6;
    }
    if (terms.estimate.discount) w.text(`Discount: -${money(terms.estimate.discount)}`);
    if (terms.estimate.tax) w.text(`Tax: ${money(terms.estimate.tax)}`);
    w.text(`Estimate total: ${money(terms.estimate.total)}`, { bold: true, size: 11 });
  }

  return doc.save();
}
