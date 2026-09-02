"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortalBrowserClient } from "@/lib/supabase-browser";

// Supabase Auth redirects here after a homeowner clicks their magic link
// (either a staff invite, or a re-sent sign-in link from /portal/login).
// The token arrives as a `#access_token=...` URL fragment — browsers never
// send fragments to a server, so this has to run client-side. It's parsed
// manually and handed to setSession() rather than relying on the client's
// automatic URL detection: createBrowserClient (@supabase/ssr) defaults to
// PKCE flow, which only looks for a `?code=` query param and silently
// ignores hash-fragment tokens, so the automatic path never picks these up.
export default function PortalAuthCallbackPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");

    if (!access_token || !refresh_token) {
      setFailed(true);
      return;
    }

    const supabase = createPortalBrowserClient();
    supabase.auth.setSession({ access_token, refresh_token }).then(({ data, error }) => {
      if (error || !data.session) {
        setFailed(true);
        return;
      }
      router.replace("/portal");
    });
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F7F8FA" }}>
      <p style={{ fontSize: 14, color: "#6B7280", fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif" }}>
        {failed ? (
          <>
            That sign-in link didn&apos;t work — it may have expired.{" "}
            <a href="/portal/login" style={{ color: "#2B7CC1" }}>
              Request a new one
            </a>
            .
          </>
        ) : (
          "Signing you in…"
        )}
      </p>
    </div>
  );
}
