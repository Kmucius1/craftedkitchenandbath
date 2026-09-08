import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Gate the homeowner portal. /portal/login and /portal/auth/callback are
// public; everything else under /portal requires a live Supabase Auth
// session.
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
  return proxyPortal(request);
}

export const config = {
  matcher: ["/portal", "/portal/:path*"],
};
