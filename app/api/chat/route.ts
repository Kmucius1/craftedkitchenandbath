import { NextRequest, NextResponse } from "next/server";
import { KNOWLEDGE, PAGES, CREW } from "@/lib/chat-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.CHAT_MODEL || "anthropic/claude-haiku-4.5";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

type ChatMessage = { role: "user" | "assistant"; content: string };

const VALID_PATHS = new Set<string>(PAGES.map((p) => p.path));
const VALID_MASCOTS = new Set<string>(CREW.map((c) => c.id));

const PHONE = "(727) 383-7550";

function systemPrompt(): string {
  const pageList = PAGES.map((p) => `- ${p.path} — ${p.label}: ${p.when}`).join("\n");
  const crewList = CREW.map((c) => `- ${c.id} (${c.name}, ${c.role}): ${c.focus}`).join("\n");
  return `You are "Crafty & the Crew," the friendly AI concierge for Crafted Kitchen & Bath, a Tampa Bay remodeling company. You are four mascots who help visitors on the website:
${crewList}

Speak AS the mascot whose focus best fits the topic (default to Crafty). Be warm, concise, and genuinely helpful — like a knowledgeable, down-to-earth team member. Sound mature and professional; never childish or over-the-top.

Use ONLY the knowledge base below. Never invent prices, timelines, guarantees, or facts. If you don't know, say so and offer the phone number ${PHONE}.

KNOWLEDGE BASE:
${KNOWLEDGE}

PAGES you can send visitors to (set "navigate" to one of these exact paths when it clearly helps the visitor):
${pageList}

THREE THINGS YOU DO:
1. Answer questions about the company and its services from the knowledge base.
2. Route visitors: when they're interested in a specific service/topic, set "navigate" to the matching page so we can show a button. Always still give a helpful reply.
3. Expedite contact / quote requests: if the visitor wants a quote, to book, or to be contacted, collect — conversationally, one or two questions at a time — their full name, email, and the service they need (phone, city, and project details are a bonus). Only set lead.ready=true once you have at least fullName, email, AND service. When ready, confirm you're sending it over and they'll hear back within 24 hours.

IMPORTANT — accept terse answers: visitors usually reply with just the value, not a full sentence. Treat a short message as the answer to the question you just asked and capture it into the matching lead field — never make them rephrase or "spell it out."
- A message that is just a person's name (e.g. "John Smith", "sara") IS their full name → lead.fullName. Do not ask them to say "my name is…".
- A message that is just an email address IS their email → lead.email. A message that is just a phone number IS their phone.
- If you asked for their name and they reply with anything that looks like a name, accept it and move on to the next question.
Carry information already given forward across turns — never re-ask for something the visitor already provided earlier in the conversation.

ALWAYS respond with ONLY a single JSON object, no prose outside it, in this exact shape:
{
  "reply": "your message to the visitor — plain text, 1-4 short sentences, no markdown headings or bullet characters",
  "mascot": "crafty" | "chip" | "ty" | "keyton",
  "navigate": { "path": "/exact-path", "label": "Page Label" } | null,
  "lead": { "ready": false, "fullName": "", "email": "", "phone": "", "service": "", "city": "", "description": "" } | null
}
Set "navigate" to null unless a page is clearly relevant. Set "lead" to null until the visitor is actively giving you their info for a quote/contact request.`;
}

function extractJson(text: string): Record<string, unknown> | null {
  if (!text) return null;
  let t = text.trim();
  // strip ```json ... ``` fences
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  try {
    return JSON.parse(t);
  } catch {
    const first = t.indexOf("{");
    const last = t.lastIndexOf("}");
    if (first !== -1 && last > first) {
      try {
        return JSON.parse(t.slice(first, last + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return NextResponse.json({
      reply: `I'm having trouble connecting right now — please call us at ${PHONE} and we'll help you out.`,
      mascot: "crafty",
      navigate: null,
      lead: null,
    });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  // Keep the payload bounded.
  const trimmed = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://craftedkitchenandbath.com",
        "X-Title": "Crafted Kitchen & Bath Assistant",
      },
      body: JSON.stringify({
        model: MODEL,
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 700,
        messages: [{ role: "system", content: systemPrompt() }, ...trimmed],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[chat] OpenRouter error", res.status, errText.slice(0, 300));
      throw new Error(`upstream ${res.status}`);
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(content);

    if (!parsed || typeof parsed.reply !== "string") {
      return NextResponse.json({
        reply: `Sorry, I lost my train of thought! Could you ask that again, or call us at ${PHONE}?`,
        mascot: "crafty",
        navigate: null,
        lead: null,
      });
    }

    // Sanitize navigate
    let navigate: { path: string; label: string } | null = null;
    const nav = parsed.navigate as { path?: string; label?: string } | null | undefined;
    if (nav && typeof nav.path === "string" && VALID_PATHS.has(nav.path)) {
      navigate = { path: nav.path, label: String(nav.label || PAGES.find((p) => p.path === nav.path)?.label || "View page") };
    }

    // Sanitize mascot
    const mascot = typeof parsed.mascot === "string" && VALID_MASCOTS.has(parsed.mascot) ? parsed.mascot : "crafty";

    // Pass lead through (client validates before submitting)
    const lead = parsed.lead && typeof parsed.lead === "object" ? parsed.lead : null;

    return NextResponse.json({ reply: parsed.reply, mascot, navigate, lead });
  } catch (err) {
    console.error("[chat] failure:", err);
    return NextResponse.json({
      reply: `I'm having a little trouble right now. You can reach our team directly at ${PHONE} — they'd love to help.`,
      mascot: "crafty",
      navigate: null,
      lead: null,
    });
  }
}
