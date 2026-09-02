import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Session-aware Supabase client for the homeowner portal (Server Components /
// Route Handlers). Uses the anon key + the visitor's own auth cookies, so RLS
// applies — this is deliberately NOT the service-role client in lib/db.ts.
// Privileged writes (after assertProjectAccess) still go through
// getSupabase() from lib/db.ts, matching the rest of this codebase's
// service-role-only DB access pattern.
export async function createPortalServerClient() {
  const cookieStore = await cookies();
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase is not configured for the portal (NEXT_PUBLIC_SUPABASE_ANON_KEY).");
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component that can't set cookies — safe to
          // ignore since the portal's session refresh happens in proxy.ts.
        }
      },
    },
  });
}
