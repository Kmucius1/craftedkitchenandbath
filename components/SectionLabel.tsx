import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Thin 1px blue line to the left */}
      <span
        style={{
          display: "inline-block",
          width: "32px",
          height: "1px",
          backgroundColor: "#2B7CC1",
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: light ? "#1A202C" : "#2B7CC1",
          fontFamily: "inherit",
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </div>
  );
}
