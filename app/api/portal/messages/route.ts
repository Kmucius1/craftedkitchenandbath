import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { assertProjectAccess } from "@/lib/portal-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES = ["general", "design", "schedule", "financial", "warranty"] as const;
type Category = (typeof CATEGORIES)[number];

async function findOrCreateThread(projectId: string, category: Category): Promise<string> {
  const admin = getSupabase();
  const { data: existing } = await admin
    .from("portal_message_threads")
    .select("id")
    .eq("project_id", projectId)
    .eq("category", category)
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await admin
    .from("portal_message_threads")
    .insert({ project_id: projectId, category })
    .select("id")
    .single();
  if (error || !created) throw error || new Error("Failed to create thread");
  return created.id;
}

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId") || "";
  const category = (req.nextUrl.searchParams.get("category") || "general") as Category;
  const access = await assertProjectAccess(projectId);
  if (!access) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (!CATEGORIES.includes(category)) return NextResponse.json({ ok: false, error: "Invalid category" }, { status: 422 });

  const admin = getSupabase();
  const { data: thread } = await admin
    .from("portal_message_threads")
    .select("id")
    .eq("project_id", projectId)
    .eq("category", category)
    .maybeSingle();

  if (!thread) return NextResponse.json({ ok: true, messages: [] });

  const { data: messages, error } = await admin
    .from("portal_messages")
    .select("id, author_type, author_staff_name, body, created_at")
    .eq("thread_id", thread.id)
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: "Could not load messages" }, { status: 500 });

  return NextResponse.json({ ok: true, messages: messages || [] });
}

export async function POST(req: NextRequest) {
  let body: { projectId?: string; category?: Category; body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const projectId = body.projectId || "";
  const category = (body.category || "general") as Category;
  const text = (body.body || "").trim();
  if (!text) return NextResponse.json({ ok: false, error: "Message can't be empty." }, { status: 422 });
  if (!CATEGORIES.includes(category)) return NextResponse.json({ ok: false, error: "Invalid category" }, { status: 422 });

  const access = await assertProjectAccess(projectId);
  if (!access) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  try {
    const threadId = await findOrCreateThread(projectId, category);
    const admin = getSupabase();
    const insertPayload: {
      thread_id: string;
      author_type: "staff" | "client";
      author_staff_name: string | null;
      author_portal_user_id: string | null;
      body: string;
    } = access.isStaffPreview
      ? { thread_id: threadId, author_type: "staff", author_staff_name: "Crafted Team", author_portal_user_id: null, body: text }
      : { thread_id: threadId, author_type: "client", author_portal_user_id: access.portalUser!.id, author_staff_name: null, body: text };

    const { data, error } = await admin.from("portal_messages").insert(insertPayload).select().single();
    if (error) throw error;

    return NextResponse.json({ ok: true, message: data });
  } catch (err) {
    console.error("[portal/messages] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 500 });
  }
}
