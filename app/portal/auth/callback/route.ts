import { NextRequest, NextResponse } from "next/server";
import { createPortalServerClient } from "@/lib/supabase-server";

// Supabase Auth redirects here after a homeowner clicks their magic link
// (either the invite email staff triggered, or a re-sent sign-in link from
// /portal/login). Exchanges the code for a session, sets the session cookies,
// then forwards to /portal (or wherever they were headed).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const next = req.nextUrl.searchParams.get("next") || "/portal";

  if (code) {
    const supabase = await createPortalServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[portal/callback] exchangeCodeForSession failed:", error.message);
      return NextResponse.redirect(new URL("/portal/login?error=1", req.url));
    }
  }

  return NextResponse.redirect(new URL(next, req.url));
}
