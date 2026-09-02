"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export default function PortalNav({ projectId, items }: { projectId: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        overflowX: "auto",
        borderBottom: "1px solid #E5E7EB",
        background: "#fff",
        padding: "0 16px",
      }}
    >
      {items.map((item) => {
        const href = `/portal/${projectId}${item.href}`;
        const active = pathname === href;
        return (
          <Link
            key={item.href}
            href={href}
            style={{
              padding: "16px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: active ? "#2B7CC1" : "#6B7280",
              borderBottom: active ? "2px solid #2B7CC1" : "2px solid transparent",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
