import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Doc = { id: string; category: string; title: string; url: string; created_at: string };

const CATEGORY_LABEL: Record<string, string> = {
  contract: "Contract",
  permit: "Permit",
  warranty: "Warranty",
  design: "Design",
  invoice: "Invoice",
  receipt: "Receipt",
  other: "Other",
};

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function PortalDocumentsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const admin = getSupabase();
  const { data } = await admin
    .from("project_documents")
    .select("id, category, title, url, created_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  const documents = (data || []) as Doc[];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1A202C", margin: "0 0 8px" }}>Documents</h2>

      {documents.length === 0 && (
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 24, fontSize: 13, color: "#6B7280" }}>
          No documents have been shared yet.
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
        {documents.map((d, i) => (
          <a
            key={d.id}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              textDecoration: "none",
              borderTop: i === 0 ? "none" : "1px solid #F1F3F5",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A202C" }}>{d.title}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                {CATEGORY_LABEL[d.category] || d.category} · {fmt(d.created_at)}
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#2B7CC1", fontWeight: 600 }}>Open →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
