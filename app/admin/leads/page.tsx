import { getSql, type Lead } from "@/lib/db";
import LeadsTable from "@/components/admin/LeadsTable";

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
    const sql = getSql();
    leads = (await sql`
      select id, created_at, full_name, email, phone, service, city,
             description, contact_method, source, status, notes
      from leads
      order by created_at desc
    `) as Lead[];
  } catch (err) {
    console.error("[admin/leads] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <main style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Leads</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The leads database isn’t connected yet. Once the Postgres integration and
          its connection string are set, leads will appear here.
        </p>
      </main>
    );
  }

  return <LeadsTable initialLeads={leads} />;
}
