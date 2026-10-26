"use client";

import { CONSENT_TEXT } from "@/lib/contact-consent";

// Optional permission to call/text. Unchecked by default, never required to submit.
export default function ConsentCheckbox({
  checked,
  onChange,
  id = "contact-consent",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        fontSize: 12.5,
        lineHeight: 1.55,
        color: "#4B5563",
        cursor: "pointer",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, accentColor: "#2B7CC1" }}
      />
      <span>
        {CONSENT_TEXT}{" "}
        <a href="/privacy-policy" style={{ color: "#2B7CC1", textDecoration: "underline" }}>
          Privacy Policy
        </a>
        .
      </span>
    </label>
  );
}
