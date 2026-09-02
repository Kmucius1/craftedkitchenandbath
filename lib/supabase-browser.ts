import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client for the homeowner portal. Used only on the
// auth callback page: creating it here runs Supabase's own URL-hash
// detection (magic-link / invite tokens arrive as a `#access_token=...`
// fragment, which only the browser ever sees), then persists the resulting
// session into cookies that lib/supabase-server.ts's server client can read.
export function createPortalBrowserClient() {
  // NEXT_PUBLIC_SUPABASE_URL isn't set in Vercel (only the server-only
  // SUPABASE_URL is) — a bare SUPABASE_URL reference would be undefined in
  // client bundles, since Next.js only inlines NEXT_PUBLIC_-prefixed vars.
  // The project URL isn't secret, so fall back to it directly.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ilijwatkzumuywzsmqvy.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, anonKey);
}
