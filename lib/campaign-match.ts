import { getSupabase } from "@/lib/db";

// Server-only (uses the service-role client) — kept out of lib/campaign.ts so
// that file stays safe to import from the client component CampaignCapture.
export async function resolveCampaignId(utmCampaign: string | null): Promise<string | null> {
  if (!utmCampaign) return null;
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("campaigns")
      .select("id")
      .eq("utm_campaign_key", utmCampaign)
      .maybeSingle();
    return data?.id ?? null;
  } catch {
    // Best-effort match — a lookup failure should never block lead capture.
    return null;
  }
}
