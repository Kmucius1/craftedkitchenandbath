import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Gate the admin area. The login page (/admin) and the login/logout endpoints
// are public; everything else under /admin or /api/admin requires the session
// cookie set on successful login (value must equal ADMIN_SESSION_SECRET).
function proxyAdmin(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

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

// Gate the homeowner portal. /portal/login and /portal/auth/callback are
// public; everything else under /portal requires a live Supabase Auth
// session. This is a separate identity system from the admin's ck_admin
// cookie — staff previewing a project as a client is handled inside the
// page itself (lib/portal-auth.ts's assertProjectAccess), not here.
async function proxyPortal(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isPublic = pathname === "/portal/login" || pathname.startsWith("/portal/auth/callback");

  let response = NextResponse.next({ request });

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    // Portal isn't configured yet — don't block the rest of the site.
    if (isPublic) return response;
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // getUser() (not getSession()) revalidates the token against Supabase Auth
  // on every request — the correct, non-spoofable check to run in proxy.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPublic) return response;
  if (!user) return NextResponse.redirect(new URL("/portal/login", request.url));
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/portal")) {
    return proxyPortal(request);
  }

  const isAdminPublic =
    pathname === "/admin" ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout");
  if (isAdminPublic) return NextResponse.next();

  return proxyAdmin(request);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*", "/portal", "/portal/:path*"],
};
