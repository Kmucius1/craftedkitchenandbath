import MessagesPanel from "@/components/portal/MessagesPanel";

export default async function PortalMessagesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1A202C", margin: "0 0 8px" }}>Messages</h2>
      <MessagesPanel projectId={projectId} />
    </div>
  );
}
