/**
 * The online contract's terms — a copy of the shape the Crafted CRM writes to
 * `contracts.terms` (crafted-crm: lib/contract-terms.ts). The CRM owns it;
 * change both files together.
 */

export interface ContractSigner {
  name: string;
  email: string | null;
  phone: string | null;
}

export interface ContractDraw {
  label: string;
  amount: number;
}

export interface EstimateSnapshotLine {
  id: string;
  description: string;
  amount: number;
  optional: boolean;
}

export interface EstimateSnapshotSection {
  name: string;
  lines: EstimateSnapshotLine[];
  subtotal: number;
}

export interface EstimateSnapshot {
  number: string;
  date: string | null;
  scope_summary: string | null;
  sections: EstimateSnapshotSection[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export interface ContractorBlock {
  legal_name: string;
  license: string;
  address: string;
  phone: string;
  email: string;
  signer: string;
  signer_title: string;
}

export interface ContractTerms {
  version: number;
  title: string;
  project_kind: string;
  contract_date: string;
  homeowners: ContractSigner[];
  property: { address: string; city: string; state: string; zip: string };
  scope_items: string[];
  start_date: string;
  completion_date: string;
  draws: ContractDraw[];
  payment_terms: "card_fee" | "draw_notice";
  change_orders: "signed" | "text_email";
  additional_terms: string | null;
  estimate: EstimateSnapshot | null;
  contractor: ContractorBlock | null;
}

export type ContractStatus = "draft" | "sent" | "signed" | "void";

export interface ContractRow {
  id: string;
  project_id: string;
  contract_number: string;
  title: string;
  status: ContractStatus;
  amount: number | null;
  sign_token: string;
  terms: ContractTerms;
  template_version: number;
  sent_at: string | null;
  signed_at: string | null;
  contractor_signed_name: string | null;
  contractor_signed_at: string | null;
  first_viewed_at: string | null;
  selected_options: string[];
  signed_pdf_path: string | null;
  void_reason: string | null;
}

export interface SignatureRow {
  id: string;
  created_at: string;
  signer_index: number;
  signer_name: string;
  signer_email: string | null;
  signature_type: "drawn" | "typed";
  signature_data: string;
  ip_address: string | null;
  user_agent: string | null;
  document_hash: string;
  selected_options: string[];
}
