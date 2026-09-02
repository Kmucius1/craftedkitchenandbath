import { getSupabase, LEAD_STATUSES } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Reports — Admin",
  robots: { index: false, follow: false },
};

const sectionTitle: React.CSSProperties = { fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "#2B7CC1", marginBottom: 14, fontWeight: 600 };
const card: React.CSSProperties = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, marginBottom: 20 };
const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 };
const tile: React.CSSProperties = { border: "1px solid #E5E7EB", borderRadius: 8, padding: 16 };
const tileValue: React.CSSProperties = { fontSize: 28, fontWeight: 300, color: "#1A202C", fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif" };
const tileLabel: React.CSSProperties = { fontSize: 11, color: "#6B7280", marginTop: 4 };

function count<T extends string>(rows: { [k: string]: unknown }[] | null, key: string, value: T): number {
  return (rows || []).filter((r) => r[key] === value).length;
}

function label(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function safeSection<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error("[admin/reports] section failed:", err);
    return null;
  }
}

export default async function AdminReportsPage() {
  const supabase = getSupabase();

  const leadRows = await safeSection(async () => {
    const { data, error } = await supabase.from("leads").select("status, channel, created_at");
    if (error) throw error;
    return data || [];
  });

  const reviewRows = await safeSection(async () => {
    const { data, error } = await supabase.from("review_requests").select("status");
    if (error) throw error;
    return data || [];
  });

  const referralRows = await safeSection(async () => {
    const { data, error } = await supabase.from("referrals").select("status");
    if (error) throw error;
    return data || [];
  });

  const projectRows = await safeSection(async () => {
    const { data, error } = await supabase.from("projects").select("status, project_value");
    if (error) throw error;
    return data || [];
  });

  const activityRows = await safeSection(async () => {
    const { data, error } = await supabase
      .from("activity_log")
      .select("id, title, type, published_at")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(10);
    if (error) throw error;
    return data || [];
  });

  const now = Date.now();
  const daysAgo = (n: number) => now - n * 24 * 60 * 60 * 1000;
  const volumeSince = (rows: typeof leadRows, n: number) =>
    (rows || []).filter((r) => r.created_at && new Date(r.created_at as string).getTime() >= daysAgo(n)).length;

  const wonCount = leadRows ? count(leadRows, "status", "Won") : 0;
  const totalLeads = leadRows?.length ?? 0;
  const conversionPct = totalLeads > 0 ? ((wonCount / totalLeads) * 100).toFixed(1) : null;

  const channelCounts = leadRows
    ? Object.entries(
        leadRows.reduce<Record<string, number>>((acc, r) => {
          const ch = (r.channel as string) || "unattributed";
          acc[ch] = (acc[ch] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])
    : null;

  const completedProjects = projectRows ? projectRows.filter((p) => p.status === "completed") : null;
  const completedValue = completedProjects
    ? completedProjects.reduce((sum, p) => sum + (Number(p.project_value) || 0), 0)
    : null;

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 40px)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
      <AdminNav />
      <h1 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: 28, fontWeight: 300, color: "#1A202C", margin: "0 0 20px" }}>
        Performance Reports
      </h1>

      <div style={card}>
        <div style={sectionTitle}>Lead funnel</div>
        {leadRows ? (
          <>
            <div style={grid}>
              {LEAD_STATUSES.map((s) => (
                <div key={s} style={tile}>
                  <div style={tileValue}>{count(leadRows, "status", s)}</div>
                  <div style={tileLabel}>{s}</div>
                </div>
              ))}
            </div>
            {conversionPct && (
              <p style={{ fontSize: 13, color: "#6B7280", marginTop: 14 }}>
                {wonCount} of {totalLeads} leads won — <strong style={{ color: "#1A202C" }}>{conversionPct}%</strong> conversion.
              </p>
            )}
          </>
        ) : (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
        )}
      </div>

      <div style={card}>
        <div style={sectionTitle}>Lead volume</div>
        {leadRows ? (
          <div style={grid}>
            <div style={tile}><div style={tileValue}>{volumeSince(leadRows, 7)}</div><div style={tileLabel}>Last 7 days</div></div>
            <div style={tile}><div style={tileValue}>{volumeSince(leadRows, 30)}</div><div style={tileLabel}>Last 30 days</div></div>
            <div style={tile}><div style={tileValue}>{volumeSince(leadRows, 90)}</div><div style={tileLabel}>Last 90 days</div></div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
        )}
      </div>

      <div style={card}>
        <div style={sectionTitle}>Leads by channel</div>
        {channelCounts ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {channelCounts.map(([ch, n]) => (
                <tr key={ch} style={{ borderBottom: "1px solid #F1F3F5" }}>
                  <td style={{ padding: "8px 0" }}>{label(ch)}</td>
                  <td style={{ padding: "8px 0", textAlign: "right" }}>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={card}>
          <div style={sectionTitle}>Review requests</div>
          {reviewRows ? (
            <div style={grid}>
              {["pending", "sent", "completed", "declined"].map((s) => (
                <div key={s} style={tile}>
                  <div style={tileValue}>{count(reviewRows, "status", s)}</div>
                  <div style={tileLabel}>{label(s)}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
          )}
        </div>

        <div style={card}>
          <div style={sectionTitle}>Referrals</div>
          {referralRows ? (
            <div style={grid}>
              {["sent", "pending", "converted"].map((s) => (
                <div key={s} style={tile}>
                  <div style={tileValue}>{count(referralRows, "status", s)}</div>
                  <div style={tileLabel}>{label(s)}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
          )}
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Completed projects</div>
        {completedProjects ? (
          <div style={grid}>
            <div style={tile}><div style={tileValue}>{completedProjects.length}</div><div style={tileLabel}>Completed</div></div>
            <div style={tile}><div style={tileValue}>${(completedValue || 0).toLocaleString()}</div><div style={tileLabel}>Total value</div></div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
        )}
      </div>

      <div style={card}>
        <div style={sectionTitle}>Recent publishing activity</div>
        {activityRows ? (
          activityRows.length === 0 ? (
            <p style={{ fontSize: 13, color: "#6B7280" }}>Nothing logged yet.</p>
          ) : (
            <ul style={{ fontSize: 13, color: "#1F2937", lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
              {activityRows.map((a) => (
                <li key={a.id as string}>
                  <strong>{a.title as string}</strong> — {label((a.type as string) || "")}
                  {a.published_at ? ` · ${new Date(a.published_at as string).toLocaleDateString()}` : ""}
                </li>
              ))}
            </ul>
          )
        ) : (
          <p style={{ fontSize: 13, color: "#6B7280" }}>Not available.</p>
        )}
      </div>
    </div>
  );
}
