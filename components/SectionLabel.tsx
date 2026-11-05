import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  /** Render as a heading when the label titles the content that follows. */
  as?: "div" | "h2";
}

export default function SectionLabel({ children, light = false, as: Tag = "div" }: SectionLabelProps) {
  return (
    <Tag
      style={{
        margin: 0,
        fontSize: "inherit",
        fontWeight: "inherit",
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
          backgroundColor: "#2771B0",
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: light ? "#1A202C" : "#2771B0",
          fontFamily: "inherit",
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </Tag>
  );
}
