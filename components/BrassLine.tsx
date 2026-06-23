interface BrassLineProps {
  className?: string;
}

export default function BrassLine({ className }: BrassLineProps) {
  return (
    <div
      className={className}
      style={{
        width: "48px",
        height: "1px",
        backgroundColor: "#B89054",
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
