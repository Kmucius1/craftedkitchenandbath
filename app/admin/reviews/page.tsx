import { getSupabase, type ReviewRequest } from "@/lib/db";
import ReviewsTable from "@/components/admin/ReviewsTable";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Reviews — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReviewsPage() {
  let reviews: ReviewRequest[] = [];
  let dbError = false;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("review_requests")
      .select("id, lead_id, project_id, customer_name, customer_email, customer_phone, status, sent_at, review_link, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    reviews = (data || []) as ReviewRequest[];
  } catch (err) {
    console.error("[admin/reviews] query failed:", err);
    dbError = true;
  }

  if (dbError) {
    return (
      <div style={{ padding: 48, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 22, color: "#1A202C" }}>Reviews</h1>
        <p style={{ color: "#B91C1C", marginTop: 12 }}>
          The reviews database isn&apos;t connected yet. Run db/crm-schema.sql against Supabase, then reload.
        </p>
      </div>
    );
  }

  return <ReviewsTable initialReviews={reviews} />;
}
