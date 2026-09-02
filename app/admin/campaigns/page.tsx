import { getSupabase, type Campaign } from "@/lib/db";
import CampaignsTable, { type CampaignWithStats } from "@/components/admin/CampaignsTable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Campaigns — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCampaignsPage() {
  let campaigns: CampaignWithStats[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data: campaignRows, error } = await supabase
      .from("campaigns")
      .select("id, name, channel, utm_campaign_key, start_date, end_date, budget, notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;

    const { data: leadRows } = await supabase
      .from("leads")
      .select("campaign_id, status")
      .not("campaign_id", "is", null);

    const stats = new Map<string, { leadCount: number; wonCount: number }>();
    for (const l of leadRows || []) {
      const campaignId = (l as { campaign_id: string | null }).campaign_id;
      if (!campaignId) continue;
      const entry = stats.get(campaignId) || { leadCount: 0, wonCount: 0 };
      entry.leadCount += 1;
      if ((l as { status: string }).status === "Won") entry.wonCount += 1;
      stats.set(campaignId, entry);
    }

    campaigns = ((campaignRows || []) as Campaign[]).map((c) => ({
      ...c,
      leadCount: stats.get(c.id)?.leadCount ?? 0,
      wonCount: stats.get(c.id)?.wonCount ?? 0,
    }));
  } catch (err) {
    console.error("[admin/campaigns] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <div style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Campaigns</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The campaigns database isn&apos;t connected yet. Run db/crm-schema.sql against Supabase, then reload.
        </p>
      </div>
    );
  }

  return <CampaignsTable initialCampaigns={campaigns} />;
}
