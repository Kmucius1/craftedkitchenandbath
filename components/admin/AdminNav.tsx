"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/referrals", label: "Referrals" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/activity", label: "Activity" },
  { href: "/admin/reports", label: "Reports" },
];

// Minimal shared nav for the admin area — mounted at the top of each admin
// page (there's no shared app/admin/layout.tsx today, so this is opt-in per
// page rather than a layout wrapper).
export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        marginBottom: 20,
        borderBottom: "1px solid #E5E7EB",
        paddingBottom: 12,
      }}
    >
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname?.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "7px 12px",
              borderRadius: 6,
              textDecoration: "none",
              color: active ? "#fff" : "#374151",
              background: active ? "#2B7CC1" : "transparent",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
