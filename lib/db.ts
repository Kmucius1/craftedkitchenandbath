import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client (service role — bypasses RLS). Used only in API
// routes / server components, never shipped to the browser. Lazily created so
// the app still builds before env vars are set.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  if (!_client) {
    _client = createClient(url, key, { auth: { persistSession: false } });
  }
  return _client;
}

export type LeadStatus = "New" | "Contacted" | "Quoted" | "Won" | "Lost";

export type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: string | null;
  city: string | null;
  description: string | null;
  contact_method: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  // Qualification fields (lib/crm-fields.ts)
  project_type: string | null;
  budget_range: string | null;
  desired_timeline: string | null;
  owns_home: boolean | null;
  has_plans: boolean | null;
  preferred_contact_time: string | null;
  intake_payload: Record<string, unknown> | null;
  // Source / campaign attribution (lib/campaign.ts)
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referral_code: string | null;
  landing_page: string | null;
  campaign_id: string | null;
  channel: string | null;
};

export const LEAD_STATUSES: LeadStatus[] = ["New", "Contacted", "Quoted", "Won", "Lost"];

export type ProjectPhase =
  | "discovery"
  | "design"
  | "selections"
  | "preconstruction"
  | "build"
  | "final_walkthrough"
  | "completed"
  | "on_hold";

export const PROJECT_PHASES: ProjectPhase[] = [
  "discovery",
  "design",
  "selections",
  "preconstruction",
  "build",
  "final_walkthrough",
  "completed",
  "on_hold",
];

export type Project = {
  id: string;
  lead_id: string | null;
  title: string;
  category: string | null;
  city: string | null;
  description: string | null;
  images: string[];
  completed_date: string | null;
  project_value: number | null;
  featured: boolean;
  phase: ProjectPhase;
  status: "active" | "on_hold" | "completed" | "cancelled";
  pm_name: string | null;
  pm_email: string | null;
  pm_phone: string | null;
  address: string | null;
  contract_total: number | null;
  portal_enabled: boolean;
  enabled_modules: Record<string, boolean>;
  created_at: string;
  updated_at: string;
};

export type ReviewRequestStatus = "pending" | "sent" | "completed" | "declined";
export const REVIEW_REQUEST_STATUSES: ReviewRequestStatus[] = ["pending", "sent", "completed", "declined"];

export type ReviewRequest = {
  id: string;
  lead_id: string | null;
  project_id: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  status: ReviewRequestStatus;
  sent_at: string | null;
  review_link: string | null;
  created_at: string;
};

export type ReferralStatus = "sent" | "pending" | "converted";
export const REFERRAL_STATUSES: ReferralStatus[] = ["sent", "pending", "converted"];

export type Referral = {
  id: string;
  referrer_lead_id: string | null;
  referrer_name: string;
  referrer_email: string | null;
  referral_code: string;
  referred_lead_id: string | null;
  status: ReferralStatus;
  reward_notes: string | null;
  created_at: string;
};

export type Campaign = {
  id: string;
  name: string;
  channel: string | null;
  utm_campaign_key: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  notes: string | null;
  created_at: string;
};

export type ActivityLogEntry = {
  id: string;
  type: string;
  title: string;
  url: string | null;
  channel: string | null;
  published_at: string | null;
  notes: string | null;
  created_at: string;
};
