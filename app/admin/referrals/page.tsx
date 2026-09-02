import { getSupabase, type Referral } from "@/lib/db";
import ReferralsTable from "@/components/admin/ReferralsTable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Referrals — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReferralsPage() {
  let referrals: Referral[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("referrals")
      .select("id, referrer_lead_id, referrer_name, referrer_email, referral_code, referred_lead_id, status, reward_notes, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    referrals = (data || []) as Referral[];
  } catch (err) {
    console.error("[admin/referrals] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <div style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Referrals</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The referrals database isn&apos;t connected yet. Run db/crm-schema.sql against Supabase, then reload.
        </p>
      </div>
    );
  }

  return <ReferralsTable initialReferrals={referrals} />;
}
