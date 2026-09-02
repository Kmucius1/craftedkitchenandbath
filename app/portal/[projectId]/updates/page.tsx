import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Update = {
  id: string;
  title: string | null;
  completed_summary: string | null;
  planned_next_summary: string | null;
  decisions_required_summary: string | null;
  published_at: string;
};

type Photo = { id: string; update_id: string | null; room: string | null; category: string; url: string; caption: string | null };

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function PortalUpdatesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const admin = getSupabase();

  const [{ data: updatesData }, { data: photosData }] = await Promise.all([
    admin
      .from("project_updates")
      .select("id, title, completed_summary, planned_next_summary, decisions_required_summary, published_at")
      .eq("project_id", projectId)
      .order("published_at", { ascending: false }),
    admin
      .from("project_photos")
      .select("id, update_id, room, category, url, caption")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
  ]);

  const updates = (updatesData || []) as Update[];
  const photos = (photosData || []) as Photo[];
  const photosByUpdate = new Map<string, Photo[]>();
  const generalPhotos: Photo[] = [];
  for (const photo of photos) {
    if (photo.update_id) {
      const list = photosByUpdate.get(photo.update_id) || [];
      list.push(photo);
      photosByUpdate.set(photo.update_id, list);
    } else {
      generalPhotos.push(photo);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1A202C", margin: 0 }}>Updates &amp; Photos</h2>

      {updates.length === 0 && generalPhotos.length === 0 && (
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 24, fontSize: 13, color: "#6B7280" }}>
          No updates posted yet.
        </div>
      )}

      {updates.map((u) => {
        const photosForUpdate = photosByUpdate.get(u.id) || [];
        return (
          <div key={u.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{fmt(u.published_at)}</div>
            {u.title && <div style={{ fontSize: 15, fontWeight: 700, color: "#1A202C", marginBottom: 10 }}>{u.title}</div>}
            {u.completed_summary && (
              <p style={{ fontSize: 13, color: "#1A202C", lineHeight: 1.6, margin: "0 0 8px" }}>
                <strong>Completed this week:</strong> {u.completed_summary}
              </p>
            )}
            {u.planned_next_summary && (
              <p style={{ fontSize: 13, color: "#1A202C", lineHeight: 1.6, margin: "0 0 8px" }}>
                <strong>Looking ahead:</strong> {u.planned_next_summary}
              </p>
            )}
            {u.decisions_required_summary && (
              <p style={{ fontSize: 13, color: "#B45309", lineHeight: 1.6, margin: "0 0 12px" }}>
                <strong>Decisions needed:</strong> {u.decisions_required_summary}
              </p>
            )}
            {photosForUpdate.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" style={{ marginTop: 12 }}>
                {photosForUpdate.map((photo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={photo.id} src={photo.url} alt={photo.caption || ""} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 6 }} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {generalPhotos.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 24px" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2B7CC1", fontWeight: 700, marginBottom: 12 }}>
            Photo Gallery
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {generalPhotos.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={photo.id} src={photo.url} alt={photo.caption || ""} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 6 }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
