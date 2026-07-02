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
};

export const LEAD_STATUSES: LeadStatus[] = ["New", "Contacted", "Quoted", "Won", "Lost"];
