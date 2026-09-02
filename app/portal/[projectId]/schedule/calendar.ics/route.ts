import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { assertProjectAccess } from "@/lib/portal-auth";

// Route Handlers aren't wrapped by the parent layout's access check, so this
// asserts membership itself — same gate as every portal page.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toICSDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const access = await assertProjectAccess(projectId);
  if (!access) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const admin = getSupabase();
  const [{ data: project }, { data: milestones }] = await Promise.all([
    admin.from("projects").select("title").eq("id", projectId).single(),
    admin
      .from("schedule_milestones")
      .select("id, title, description, start_at, end_at, location")
      .eq("project_id", projectId)
      .order("start_at", { ascending: true }),
  ]);

  const events = (milestones || [])
    .map(
      (m) => `BEGIN:VEVENT
UID:${m.id}@craftedkitchenandbath.com
DTSTAMP:${toICSDate(new Date().toISOString())}
DTSTART:${toICSDate(m.start_at)}
${m.end_at ? `DTEND:${toICSDate(m.end_at)}\n` : ""}SUMMARY:${escapeICS(m.title)}
${m.description ? `DESCRIPTION:${escapeICS(m.description)}\n` : ""}${m.location ? `LOCATION:${escapeICS(m.location)}\n` : ""}END:VEVENT`
    )
    .join("\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Crafted Kitchen and Bath//Client Portal//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:${escapeICS(project?.title || "Crafted Kitchen & Bath — Project Schedule")}
${events}
END:VCALENDAR`;

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="crafted-schedule.ics"`,
    },
  });
}
