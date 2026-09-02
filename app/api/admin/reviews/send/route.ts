import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { notifyReviewRequest } from "@/lib/notify";

// Marks a review request "sent" and emails the customer the real Google
// write-review link. Access is gated by proxy.ts (admin cookie).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PLACE_ID = "ChIJBX3Sf3ThwogRfasm-zec18Y";

export async function POST(req: NextRequest) {
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const id = (body.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 422 });

  const supabase = getSupabase();
  const { data: review, error: fetchError } = await supabase
    .from("review_requests")
    .select("id, customer_name, customer_email, review_link")
    .eq("id", id)
    .single();
  if (fetchError || !review) {
    return NextResponse.json({ ok: false, error: "Review request not found" }, { status: 404 });
  }

  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;
  const review_link: string = review.review_link || `https://search.google.com/local/writereview?placeid=${placeId}`;

  try {
    const { error } = await supabase
      .from("review_requests")
      .update({ status: "sent", sent_at: new Date().toISOString(), review_link })
      .eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error("[admin/reviews/send] update failed:", err);
    return NextResponse.json({ ok: false, error: "Could not mark as sent" }, { status: 500 });
  }

  await notifyReviewRequest({ customer_name: review.customer_name, customer_email: review.customer_email, review_link });

  return NextResponse.json({ ok: true });
}
