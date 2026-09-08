import { getSupabase } from "@/lib/db";
import { createPortalServerClient } from "@/lib/supabase-server";

export type PortalUser = { id: string; email: string; full_name: string | null };

/** The signed-in homeowner for this request, or null if not authenticated. */
export async function getPortalUser(): Promise<PortalUser | null> {
  const supabase = await createPortalServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Service-role lookup for the profile row — RLS on portal_users only lets a
  // user read their own row anyway, but every other DB read in this repo goes
  // through the service-role client, so this stays consistent with that.
  const admin = getSupabase();
  const { data } = await admin.from("portal_users").select("id, email, full_name").eq("id", user.id).single();

  return { id: user.id, email: user.email ?? data?.email ?? "", full_name: data?.full_name ?? null };
}

/**
 * The single authorization gate for every portal page/route: the signed-in
 * homeowner must be a member of this project. Returns null on failure
 * (never throws) so callers can respond with notFound() instead of a 403 —
 * a rejected project id shouldn't confirm whether that project exists.
 */
export async function assertProjectAccess(projectId: string): Promise<{ portalUser: PortalUser } | null> {
  const portalUser = await getPortalUser();
  if (!portalUser) return null;

  const admin = getSupabase();
  const { data, error } = await admin
    .from("project_members")
    .select("id")
    .eq("project_id", projectId)
    .eq("portal_user_id", portalUser.id)
    .maybeSingle();
  if (error || !data) return null;

  return { portalUser };
}
