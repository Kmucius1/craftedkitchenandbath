// Maps this site's form answers onto the structured columns the CRM reads.
//
// The quote wizard already asks for budget, timeline, ownership and scope, but
// flattens every answer into a bulleted `description` string. That reads fine
// in an email and is useless for sorting, scoring or reporting. These helpers
// give the same answers somewhere structured to land, without changing a single
// question the visitor sees.
//
// The columns written here were added by CRM migration 0007 and are all
// nullable — an older deploy of this site that does not send them keeps working.

export type QuoteResponse = { question?: string; answer?: string };

/** CRM `budget_range` option values. Deliberately identical to the wizard's own
 *  brackets so no answer has to be squeezed into a neighbouring bucket. */
export function mapBudget(answer: string | null | undefined): string | null {
  if (!answer) return null;
  const a = answer.toLowerCase();
  if (a.includes("100,000") || a.includes("100k")) return "100k_plus";
  if (a.includes("60,000")) return "60k_100k";
  if (a.includes("30,000") && a.includes("60,000")) return "30k_60k";
  if (a.includes("30,000")) return "15k_30k";
  if (a.includes("15,000")) return "under_15k";
  if (a.includes("not sure")) return "unsure";
  return null;
}

/** CRM `desired_timeline` option values. */
export function mapTimeline(answer: string | null | undefined): string | null {
  if (!answer) return null;
  const a = answer.toLowerCase();
  if (a.includes("as soon")) return "asap";
  if (a.includes("1") && a.includes("3")) return "1_3_months";
  if (a.includes("3") && a.includes("6")) return "3_6_months";
  if (a.includes("6+")) return "6_plus";
  if (a.includes("exploring")) return "researching";
  return null;
}

/** CRM `project_type` option values. */
export function mapProjectType(answer: string | null | undefined): string | null {
  if (!answer) return null;
  const a = answer.toLowerCase();

  // The wizard's project-type question is multi-select, so the answer arrives
  // comma-joined. Someone picking two or more rooms is describing a whole-home
  // job whether or not they ticked that box.
  const picks = a
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const rooms = picks.filter((p) => /kitchen|bathroom|whole-home/.test(p));
  if (a.includes("whole-home") || rooms.length > 1) return "whole_home";

  if (a.includes("kitchen")) return "kitchen";
  if (a.includes("bathroom")) return "bathroom";
  if (a.includes("cabinets & countertops") || a.includes("countertop")) return "countertops";
  if (a.includes("flooring")) return "flooring";
  if (a.includes("painting")) return "painting";
  return null;
}

/**
 * "Under contract / closing soon" counts as owning: they will be the homeowner
 * by the time work starts, which is what the question is really asking.
 */
export function mapOwnership(answer: string | null | undefined): boolean | null {
  if (!answer) return null;
  const a = answer.toLowerCase();
  if (a.includes("yes") || a.includes("under contract") || a.includes("closing")) return true;
  if (a.includes("rent")) return false;
  return null;
}

/** Whether the homeowner already has a design direction to work from. */
export function mapHasPlans(answer: string | null | undefined): boolean | null {
  if (!answer) return null;
  const a = answer.toLowerCase();
  if (a.includes("photos") || a.includes("inspiration ready")) return true;
  if (a.includes("full design help")) return false;
  return null;
}

function answerFor(responses: QuoteResponse[], question: string): string | null {
  const match = responses.find(
    (r) => (r.question ?? "").trim().toLowerCase() === question.toLowerCase()
  );
  const value = (match?.answer ?? "").trim();
  return value || null;
}

/** Derives every CRM column the quote wizard can populate. */
export function crmFieldsFromQuote(responses: QuoteResponse[], bestTime?: string) {
  return {
    project_type: mapProjectType(answerFor(responses, "Project type")),
    budget_range: mapBudget(answerFor(responses, "Investment range")),
    desired_timeline: mapTimeline(answerFor(responses, "Timeline")),
    owns_home: mapOwnership(answerFor(responses, "Ownership")),
    has_plans: mapHasPlans(answerFor(responses, "Where you're at")),
    preferred_contact_time: (bestTime ?? "").trim() || null,
  };
}

/**
 * The contact form asks far less, so only the service dropdown is mappable.
 * Everything else stays null and the CRM infers what it can from the text.
 */
export function crmFieldsFromContact(service: string | null | undefined) {
  return { project_type: mapProjectType(service) };
}
