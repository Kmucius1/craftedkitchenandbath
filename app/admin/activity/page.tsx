import { getSupabase, type ActivityLogEntry } from "@/lib/db";
import ActivityTable from "@/components/admin/ActivityTable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Activity — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminActivityPage() {
  let entries: ActivityLogEntry[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("activity_log")
      .select("id, type, title, url, channel, published_at, notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    entries = (data || []) as ActivityLogEntry[];
  } catch (err) {
    console.error("[admin/activity] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <div style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Activity</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The activity log database isn&apos;t connected yet. Run db/crm-schema.sql against Supabase, then reload.
        </p>
      </div>
    );
  }

  return <ActivityTable initialEntries={entries} />;
}
