import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Sends a sign-in magic link to an EXISTING portal user only — no self-service
// signup. A homeowner only gets an account when staff invite them from
// /admin/projects/[id] (see app/api/admin/projects/[id]/invite/route.ts).
// This route is for a returning homeowner whose session has expired.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json(
      { ok: false, error: "The client portal isn't configured yet." },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(url, anonKey);
    const origin = req.nextUrl.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // only staff-invited homeowners can sign in
        emailRedirectTo: `${origin}/portal/auth/callback`,
      },
    });
    // Never reveal whether the email is a real portal account — same response
    // either way, matching this app's "don't confirm what exists" convention.
    if (error) console.error("[portal/request-link] signInWithOtp error:", error.message);
  } catch (err) {
    console.error("[portal/request-link] failed:", err);
  }

  return NextResponse.json({ ok: true });
}
