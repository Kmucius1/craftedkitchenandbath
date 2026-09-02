import { getSupabase, type Lead } from "@/lib/db";
import LeadsTable from "@/components/admin/LeadsTable";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Leads — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, created_at, full_name, email, phone, service, city, description, contact_method, source, status, notes, " +
          "project_type, budget_range, desired_timeline, owns_home, has_plans, preferred_contact_time, intake_payload, " +
          "utm_source, utm_medium, utm_campaign, utm_term, utm_content, referral_code, landing_page, campaign_id, channel"
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    leads = (data || []) as unknown as Lead[];
  } catch (err) {
    console.error("[admin/leads] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <div style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <AdminNav />
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Leads</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The leads database isn’t connected yet. Once the Postgres integration and
          its connection string are set, leads will appear here.
        </p>
      </div>
    );
  }

  return <LeadsTable initialLeads={leads} />;
}
