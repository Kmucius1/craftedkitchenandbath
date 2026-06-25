import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazily-initialized Neon/Postgres client. Reads whichever connection-string env
// var the Vercel Postgres (Neon) integration provides. Lazy so the app still
// builds when no DB is configured (e.g. before the integration is attached).
let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    throw new Error("No Postgres connection string set (DATABASE_URL / POSTGRES_URL).");
  }
  if (!_sql) _sql = neon(url);
  return _sql;
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
