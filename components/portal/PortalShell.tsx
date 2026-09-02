"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortalBrowserClient } from "@/lib/supabase-browser";

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const bodyFont = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";

export type PortalNavItem = { href: string; label: string; icon: string };

export default function PortalShell({
  projectTitle,
  navItems,
  isStaffPreview,
  children,
}: {
  projectTitle?: string;
  navItems?: PortalNavItem[];
  isStaffPreview?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createPortalBrowserClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F7F8FA", fontFamily: bodyFont }}>
      {isStaffPreview && (
        <div style={{ background: "#1A202C", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 12, letterSpacing: "0.04em" }}>
          Viewing as client — staff preview
        </div>
      )}

      <div className="md:flex" style={{ minHeight: isStaffPreview ? "calc(100vh - 34px)" : "100vh" }}>
        {/* Sidebar (desktop) */}
        <aside
          className="hidden md:flex"
          style={{
            width: 240,
            flexShrink: 0,
            backgroundColor: "#1A202C",
            flexDirection: "column",
            padding: "28px 16px",
          }}
        >
          <Link href="/portal" style={{ display: "block", padding: "0 8px", marginBottom: 8 }}>
            <img
              src="/logo.png"
              alt="Crafted Kitchen & Bath"
              style={{ width: "100%", maxWidth: 150, height: "auto", filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <div
            style={{
              padding: "0 8px",
              marginBottom: 28,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8B98AA",
            }}
          >
            Client Portal
          </div>

          {projectTitle && (
            <div
              style={{
                padding: "0 8px",
                marginBottom: 20,
                fontFamily: headingFont,
                fontWeight: 500,
                fontSize: 15,
                color: "#fff",
                lineHeight: 1.4,
              }}
            >
              {projectTitle}
            </div>
          )}

          {navItems && (
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 8px",
                      borderRadius: 6,
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: active ? "#fff" : "#A9B3C1",
                      backgroundColor: active ? "#2B7CC1" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div style={{ flex: 1 }} />

          <div style={{ borderTop: "1px solid #2D3748", paddingTop: 16, display: "flex", flexDirection: "column", gap: 2 }}>
            <Link
              href="/portal/account"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 8px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: pathname === "/portal/account" ? "#fff" : "#A9B3C1",
                backgroundColor: pathname === "/portal/account" ? "#2B7CC1" : "transparent",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>⚙︎</span>
              Account
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 8px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#A9B3C1",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: signingOut ? "default" : "pointer",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>⎋</span>
              {signingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div
          className="flex md:hidden"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1A202C",
            padding: "14px 16px",
          }}
        >
          <Link href="/portal" style={{ display: "block" }}>
            <img src="/logo.png" alt="Crafted Kitchen & Bath" style={{ width: 130, height: "auto", filter: "brightness(0) invert(1)" }} />
          </Link>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Menu"
            style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 4 }}
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden" style={{ backgroundColor: "#1A202C", padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems?.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 8px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? "#fff" : "#A9B3C1",
                    backgroundColor: active ? "#2B7CC1" : "transparent",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/portal/account"
              onClick={() => setMobileNavOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 6, fontSize: 14, fontWeight: 600, color: "#A9B3C1", textDecoration: "none" }}
            >
              <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>⚙︎</span>
              Account
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 6, fontSize: 14, fontWeight: 600, color: "#A9B3C1", background: "none", border: "none", textAlign: "left", fontFamily: "inherit" }}
            >
              <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>⎋</span>
              {signingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 64px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
