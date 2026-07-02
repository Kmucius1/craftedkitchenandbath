import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Single-admin login. Compares the submitted password to ADMIN_PASSWORD and, on
// success, sets an httpOnly session cookie whose value is the server-only
// ADMIN_SESSION_SECRET (verified by proxy.ts on every /admin request).
export async function POST(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json(
      { ok: false, error: "Admin login is not configured yet." },
      { status: 503 }
    );
  }

  let submitted = "";
  try {
    const body = await req.json();
    submitted = (body?.password || "").toString();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (submitted !== password) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("ck_admin", secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
