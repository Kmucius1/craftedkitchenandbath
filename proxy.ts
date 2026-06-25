import { NextRequest, NextResponse } from "next/server";

// Gate the admin area. The login page (/admin) and the login/logout endpoints
// are public; everything else under /admin or /api/admin requires the session
// cookie set on successful login (value must equal ADMIN_SESSION_SECRET).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname === "/admin" ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout");
  if (isPublic) return NextResponse.next();

  const cookie = request.cookies.get("ck_admin")?.value;
  const authed = !!cookie && cookie === process.env.ADMIN_SESSION_SECRET;
  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/admin";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
