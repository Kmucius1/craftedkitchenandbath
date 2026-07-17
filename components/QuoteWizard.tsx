"use client";

import { useState } from "react";

/* ── Questionnaire config ──────────────────────────────────────────────────
   Each step holds one or more questions. Questions are single- or multi-select
   "card" pickers. The final contact step is rendered specially. Adding/removing
   a question here is all it takes to change the questionnaire. */

type Opt = { value: string; desc?: string; icon?: IconName };
type Question = {
  id: string;
  label: string;
  type: "single" | "multi";
  options: Opt[];
  required?: boolean;
  // When set, this question's joined answer also fills the lead's `service`.
  asService?: boolean;
};
type Step = { title: string; short: string; intro?: string; questions: Question[] };

const STEPS: Step[] = [
  {
    title: "What are we remodeling?",
    short: "Project",
    intro: "Pick everything you're considering — you can choose more than one.",
    questions: [
      {
        id: "Project type",
        label: "Project type",
        type: "multi",
        required: true,
        asService: true,
        options: [
          { value: "Kitchen", desc: "Cabinets, counters, layout", icon: "kitchen" },
          { value: "Bathroom", desc: "Primary, guest, or powder", icon: "bath" },
          { value: "Whole-home interior", desc: "Multiple rooms", icon: "home" },
          { value: "Flooring", desc: "Tile, LVP, hardwood", icon: "floor" },
          { value: "Painting", desc: "Interior repaint", icon: "paint" },
          { value: "Cabinets & countertops", desc: "Refresh only", icon: "cabinet" },
          { value: "Not sure yet", desc: "Help me figure it out", icon: "help" },
        ],
      },
    ],
  },
  {
    title: "How far do you want to take it?",
    short: "Scope",
    questions: [
      {
        id: "Scope",
        label: "Project scope",
        type: "single",
        required: true,
        options: [
          { value: "Cosmetic refresh", desc: "New finishes, same layout" },
          { value: "Full remodel — same layout", desc: "Down to the studs, same footprint" },
          { value: "Full remodel + new layout", desc: "Move walls, plumbing, or fixtures" },
          { value: "Not sure yet", desc: "Open to your recommendation" },
        ],
      },
      {
        id: "What's driving the project",
        label: "What's driving the project?",
        type: "multi",
        options: [
          { value: "Outdated finishes" },
          { value: "Better function / layout" },
          { value: "Recently purchased the home" },
          { value: "Planning to sell" },
          { value: "Damage or repair" },
          { value: "Aging in place / accessibility" },
          { value: "Adding home value" },
        ],
      },
    ],
  },
  {
    title: "Tell us about the home",
    short: "Your home",
    questions: [
      {
        id: "Property type",
        label: "Property type",
        type: "single",
        options: [
          { value: "Single-family home" },
          { value: "Condo or townhome" },
          { value: "Manufactured / mobile" },
          { value: "Investment / rental" },
        ],
      },
      {
        id: "Ownership",
        label: "Do you own the home?",
        type: "single",
        options: [
          { value: "Yes, I own it" },
          { value: "Under contract / closing soon" },
          { value: "No, I rent" },
        ],
      },
    ],
  },
  {
    title: "Budget & timeline",
    short: "Budget",
    intro: "Ballpark is fine — it helps us tailor the right options for you.",
    questions: [
      {
        id: "Investment range",
        label: "Investment range",
        type: "single",
        required: true,
        options: [
          { value: "Under $15,000" },
          { value: "$15,000 – $30,000" },
          { value: "$30,000 – $60,000" },
          { value: "$60,000 – $100,000" },
          { value: "$100,000+" },
          { value: "Not sure yet" },
        ],
      },
      {
        id: "Timeline",
        label: "Ideal timeline",
        type: "single",
        required: true,
        options: [
          { value: "As soon as possible" },
          { value: "1 – 3 months" },
          { value: "3 – 6 months" },
          { value: "6+ months" },
          { value: "Just exploring" },
        ],
      },
      {
        id: "Financing",
        label: "Payment",
        type: "single",
        options: [
          { value: "Paying out of pocket" },
          { value: "Using my own financing" },
          { value: "Not sure / tell me more" },
        ],
      },
    ],
  },
  {
    title: "Your vision",
    short: "Vision",
    questions: [
      {
        id: "Design style",
        label: "Design direction",
        type: "single",
        options: [
          { value: "Modern" },
          { value: "Transitional" },
          { value: "Traditional" },
          { value: "Coastal" },
          { value: "Farmhouse" },
          { value: "Not sure / need guidance" },
        ],
      },
      {
        id: "Where you're at",
        label: "Where are you in the process?",
        type: "single",
        options: [
          { value: "I have photos & inspiration ready" },
          { value: "Some ideas, still gathering" },
          { value: "Need full design help" },
        ],
      },
    ],
  },
];

const CITIES = [
  "Oldsmar",
  "Clearwater",
  "Palm Harbor",
  "Safety Harbor",
  "Tampa",
  "Dunedin",
  "St. Petersburg",
  "Tarpon Springs",
  "Largo",
  "Other / nearby",
];

const CONTACT_METHODS = ["Phone call", "Text", "Email", "Either"];
const BEST_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];

const ACCENT = "#2B7CC1";
const INK = "#1A202C";

type Answers = Record<string, string[]>;

export default function QuoteWizard() {
  const [step, setStep] = useState(0); // 0..STEPS.length-1 = questions, last = contact
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    contactMethod: "Either",
    bestTime: "Anytime",
    notes: "",
    company: "", // honeypot
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = STEPS.length + 1; // + contact step
  const isContact = step === STEPS.length;
  const currentIndex = isContact ? STEPS.length : step;
  const progress = Math.round(((currentIndex + (isContact ? 1 : 0)) / totalSteps) * 100);
  const stepLabels = [...STEPS.map((s) => s.short), "Your details"];

  function toggle(q: Question, value: string) {
    setError(null);
    setAnswers((prev) => {
      const current = prev[q.id] || [];
      if (q.type === "single") return { ...prev, [q.id]: [value] };
      return current.includes(value)
        ? { ...prev, [q.id]: current.filter((v) => v !== value) }
        : { ...prev, [q.id]: [...current, value] };
    });
  }

  function validateStep(): boolean {
    if (isContact) {
      if (!contact.fullName.trim()) return setErr("Please enter your name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))
        return setErr("Please enter a valid email.");
      return true;
    }
    for (const q of STEPS[step].questions) {
      if (q.required && !(answers[q.id]?.length)) return setErr(`Please choose an option for "${q.label}".`);
    }
    return true;
  }
  function setErr(msg: string) {
    setError(msg);
    return false;
  }

  function next() {
    if (!validateStep()) return;
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length));
    scrollUp();
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    scrollUp();
  }
  function scrollUp() {
    if (typeof document !== "undefined") {
      document.getElementById("quote-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function submit() {
    if (!validateStep() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const responses = STEPS.flatMap((s) =>
        s.questions.map((q) => ({ question: q.id, answer: (answers[q.id] || []).join(", ") }))
      ).filter((r) => r.answer);

      const serviceQ = STEPS.flatMap((s) => s.questions).find((q) => q.asService);
      const service = serviceQ ? (answers[serviceQ.id] || []).join(", ") : "";

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          city: contact.city,
          service,
          contactMethod: contact.contactMethod,
          bestTime: contact.bestTime,
          notes: contact.notes,
          responses,
          company: contact.company,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please call us at (727) 383-7550.");
      }
      setSubmitted(true);
      scrollUp();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call (727) 383-7550.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success ───────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div id="quote-top" className="quote-card" style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div
          style={{
            padding: "clamp(48px, 8vw, 72px) clamp(28px, 6vw, 56px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <span style={{ display: "inline-flex", width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "rgba(43,124,193,0.1)", alignItems: "center", justifyContent: "center" }}>
            <svg width="34" height="34" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M14 22.5L19.5 28L30 16" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 300, color: INK, margin: 0, lineHeight: 1.25 }}>
            Thank you, {contact.fullName.split(" ")[0] || "and welcome"} — your project details are in.
          </h2>
          <p style={{ fontSize: "15px", color: "#4A5568", margin: 0, lineHeight: 1.7, maxWidth: "440px" }}>
            A member of our team will review your answers and reach out within 24 hours to schedule your complimentary in-home consultation.
          </p>
          <a
            href="tel:+17273837550"
            style={{ marginTop: "8px", color: ACCENT, textDecoration: "none", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Prefer to talk now? Call (727) 383-7550 →
          </a>
        </div>
      </div>
    );
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#6B7280",
    marginBottom: "6px",
    fontWeight: 600,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 0,
    color: INK,
    fontSize: "15px",
    letterSpacing: "0.02em",
    padding: "12px 0",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease",
  };
  const focus = (e: React.FocusEvent<HTMLElement>) => ((e.currentTarget as HTMLElement).style.borderBottomColor = ACCENT);
  const blur = (e: React.FocusEvent<HTMLElement>) => ((e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(0,0,0,0.18)");

  return (
    <div id="quote-top" className="quote-card quote-shell" style={{ scrollMarginTop: "120px" }}>
      {/* ── LEFT RAIL (desktop) — stepper + reassurance ─────────────────── */}
      <aside className="quote-rail">
        <p style={{ fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, margin: "0 0 28px" }}>
          Free Project Quote
        </p>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          {stepLabels.map((label, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <li key={label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "9px 0", opacity: active || done ? 1 : 0.45, transition: "opacity 0.25s ease" }}>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    border: `1.5px solid ${active ? ACCENT : done ? ACCENT : "rgba(255,255,255,0.3)"}`,
                    backgroundColor: done ? ACCENT : active ? "rgba(43,124,193,0.2)" : "transparent",
                    color: done ? "#fff" : active ? "#fff" : "rgba(255,255,255,0.7)",
                    transition: "all 0.25s ease",
                  }}
                >
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span style={{ fontSize: "13px", color: active ? "#fff" : "rgba(255,255,255,0.85)", fontWeight: active ? 600 : 400, letterSpacing: "0.01em" }}>{label}</span>
              </li>
            );
          })}
        </ol>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.12)", margin: "28px 0" }} />

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { icon: "clock", text: "Takes about 2 minutes" },
            { icon: "shield", text: "No obligation, ever" },
            { icon: "reply", text: "Personal reply within 24 hrs" },
          ].map((r) => (
            <li key={r.text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: ACCENT, flexShrink: 0, display: "inline-flex" }}>
                <RailIcon name={r.icon as "clock" | "shield" | "reply"} />
              </span>
              <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{r.text}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "32px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: "0 0 4px", letterSpacing: "0.04em" }}>Prefer to talk?</p>
          <a href="tel:+17273837550" style={{ color: "#fff", textDecoration: "none", fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em" }}>(727) 383-7550</a>
        </div>
      </aside>

      {/* ── MAIN COLUMN ─────────────────────────────────────────────────── */}
      <div className="quote-main">
        {/* Mobile progress (rail hidden under breakpoint) */}
        <div className="quote-mobinfo" style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT, fontWeight: 700 }}>
              Step {Math.min(currentIndex + 1, totalSteps)} of {totalSteps} · {stepLabels[currentIndex]}
            </span>
            <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9AA3AF" }}>{progress}%</span>
          </div>
          <div style={{ height: "3px", backgroundColor: "rgba(0,0,0,0.08)", overflow: "hidden", borderRadius: "2px" }}>
            <div style={{ height: "100%", width: `${progress}%`, backgroundColor: ACCENT, transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
        </div>

        {/* Step heading */}
        <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 33px)", color: INK, margin: "0 0 8px", lineHeight: 1.2 }}>
          {isContact ? "Almost there — where should we send it?" : STEPS[step].title}
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 32px", lineHeight: 1.7 }}>
          {isContact ? "Tell us how to reach you and we'll follow up within 24 hours." : STEPS[step].intro || "Choose the option that fits best — you can refine details with us later."}
        </p>

        {/* Body */}
        {isContact ? (
          <ContactStep contact={contact} setContact={setContact} labelStyle={labelStyle} inputStyle={inputStyle} focus={focus} blur={blur} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {STEPS[step].questions.map((q) => (
              <div key={q.id}>
                <label style={labelStyle}>
                  {q.label} {q.required && <span style={{ color: ACCENT }}>*</span>}
                  {q.type === "multi" && <span style={{ textTransform: "none", letterSpacing: "0.02em", color: "#9AA3AF", marginLeft: "8px", fontWeight: 400 }}>select all that apply</span>}
                </label>
                <div className="quote-options" style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                  {q.options.map((opt) => {
                    const active = (answers[q.id] || []).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggle(q, opt.value)}
                        className="quote-opt"
                        data-active={active ? "1" : "0"}
                      >
                        {opt.icon && (
                          <span className="quote-opt-icon" style={{ color: active ? ACCENT : "#9AA3AF" }}>
                            <OptIcon name={opt.icon} />
                          </span>
                        )}
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontSize: "15px", color: INK, fontWeight: active ? 600 : 500 }}>{opt.value}</span>
                          {opt.desc && <span style={{ display: "block", fontSize: "12.5px", color: "#9AA3AF", marginTop: "2px" }}>{opt.desc}</span>}
                        </span>
                        <span
                          aria-hidden="true"
                          style={{
                            flexShrink: 0,
                            width: "20px",
                            height: "20px",
                            borderRadius: q.type === "multi" ? "4px" : "50%",
                            border: `1.5px solid ${active ? ACCENT : "rgba(0,0,0,0.22)"}`,
                            backgroundColor: active ? ACCENT : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.18s ease",
                          }}
                        >
                          {active && (
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#C53030", fontSize: "13px", margin: "22px 0 0", lineHeight: 1.5 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="7.5" cy="7.5" r="6.5" stroke="#C53030" strokeWidth="1.2" />
              <path d="M7.5 4.5V8" stroke="#C53030" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="7.5" cy="10.5" r="0.7" fill="#C53030" />
            </svg>
            {error}
          </div>
        )}

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px", paddingTop: "28px", borderTop: "1px solid rgba(0,0,0,0.07)", gap: "16px" }}>
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            style={{
              fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: step === 0 ? "#C2C8D0" : INK,
              background: "transparent",
              border: "none",
              cursor: step === 0 ? "default" : "pointer",
              padding: "12px 4px",
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={isContact ? submit : next}
            disabled={submitting}
            className="quote-next"
            style={{ backgroundColor: isContact ? ACCENT : INK, opacity: submitting ? 0.7 : 1 }}
          >
            {isContact ? (submitting ? "Sending…" : "Submit My Project →") : "Continue →"}
          </button>
        </div>
      </div>

      <style>{`
        .quote-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 6px;
          box-shadow: 0 30px 70px -28px rgba(26,32,44,0.28);
          overflow: hidden;
        }
        .quote-shell {
          display: grid;
          grid-template-columns: 300px 1fr;
          max-width: 1080px;
          margin: 0 auto;
        }
        .quote-rail {
          background: #111822;
          color: #fff;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
        }
        .quote-main { padding: clamp(32px, 4.5vw, 56px); }
        .quote-mobinfo { display: none; }
        @media (max-width: 860px) {
          .quote-shell { grid-template-columns: 1fr; }
          .quote-rail { display: none; }
          .quote-mobinfo { display: block; }
        }
        .quote-opt {
          text-align: left;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.13);
          background: #FFFFFF;
          border-radius: 5px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: inherit;
          transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }
        .quote-opt:hover {
          border-color: rgba(43,124,193,0.55);
          box-shadow: 0 8px 22px -12px rgba(26,32,44,0.35);
          transform: translateY(-2px);
        }
        .quote-opt[data-active="1"] {
          border-color: ${ACCENT};
          background: rgba(43,124,193,0.05);
          box-shadow: inset 0 0 0 1px ${ACCENT};
        }
        .quote-opt-icon { flex-shrink: 0; display: inline-flex; transition: color 0.18s ease; }
        .quote-next {
          font-family: var(--font-dm-sans),'DM Sans',system-ui,sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          color: #fff;
          border: none;
          cursor: pointer;
          padding: 18px 40px;
          border-radius: 4px;
          transition: opacity 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
        }
        .quote-next:hover { transform: translateY(-2px); box-shadow: 0 12px 26px -12px rgba(26,32,44,0.5); }
      `}</style>
    </div>
  );
}

/* ── Contact step ──────────────────────────────────────────────────────── */
function ContactStep({
  contact,
  setContact,
  labelStyle,
  inputStyle,
  focus,
  blur,
}: {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    contactMethod: string;
    bestTime: string;
    notes: string;
    company: string;
  };
  setContact: React.Dispatch<React.SetStateAction<typeof contact>>;
  labelStyle: React.CSSProperties;
  inputStyle: React.CSSProperties;
  focus: (e: React.FocusEvent<HTMLElement>) => void;
  blur: (e: React.FocusEvent<HTMLElement>) => void;
}) {
  const set = (k: keyof typeof contact, v: string) => setContact((p) => ({ ...p, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={contact.company} onChange={(e) => set("company", e.target.value)} />
      </div>

      <div className="quote-row-2" style={{ display: "grid", gap: "24px" }}>
        <div>
          <label htmlFor="q-name" style={labelStyle}>Full Name <span style={{ color: ACCENT }}>*</span></label>
          <input id="q-name" type="text" required autoComplete="name" placeholder="Jane Smith" value={contact.fullName} onChange={(e) => set("fullName", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label htmlFor="q-email" style={labelStyle}>Email Address <span style={{ color: ACCENT }}>*</span></label>
          <input id="q-email" type="email" required autoComplete="email" placeholder="jane@example.com" value={contact.email} onChange={(e) => set("email", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div className="quote-row-2" style={{ display: "grid", gap: "24px" }}>
        <div>
          <label htmlFor="q-phone" style={labelStyle}>Phone Number</label>
          <input id="q-phone" type="tel" autoComplete="tel" placeholder="(727) 000-0000" value={contact.phone} onChange={(e) => set("phone", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label htmlFor="q-city" style={labelStyle}>City / Area</label>
          <select id="q-city" value={contact.city} onChange={(e) => set("city", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
            <option value="">Select your area</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="quote-row-2" style={{ display: "grid", gap: "24px" }}>
        <div>
          <label htmlFor="q-method" style={labelStyle}>Preferred Contact Method</label>
          <select id="q-method" value={contact.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
            {CONTACT_METHODS.map((m) => (<option key={m} value={m}>{m}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="q-time" style={labelStyle}>Best Time to Reach You</label>
          <select id="q-time" value={contact.bestTime} onChange={(e) => set("bestTime", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
            {BEST_TIMES.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="q-notes" style={labelStyle}>Anything else we should know?</label>
        <textarea id="q-notes" rows={4} placeholder="Tell us about your space, must-haves, or anything specific to your project…" value={contact.notes} onChange={(e) => set("notes", e.target.value)} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={focus} onBlur={blur} />
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────────── */
type IconName = "kitchen" | "bath" | "home" | "floor" | "paint" | "cabinet" | "help";

function OptIcon({ name }: { name: IconName }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "kitchen":
      return (<svg {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M4 9h16" /><path d="M8 5.5h2M8 12.5v5" /></svg>);
    case "bath":
      return (<svg {...p}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" /><path d="M6 12V6a2 2 0 0 1 2-2c1 0 1.5.5 1.8 1" /><path d="M9 6.5h2" /></svg>);
    case "home":
      return (<svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 9.5V20h14V9.5" /><path d="M10 20v-5h4v5" /></svg>);
    case "floor":
      return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" /></svg>);
    case "paint":
      return (<svg {...p}><rect x="3" y="4" width="13" height="6" rx="1" /><path d="M16 7h3a1.5 1.5 0 0 1 1.5 1.5V11a1.5 1.5 0 0 1-1.5 1.5h-7V14" /><rect x="10" y="14" width="4" height="6" rx="1" /></svg>);
    case "cabinet":
      return (<svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M12 3v18M7 7.5h1M16 7.5h-1M7 14.5h1M16 14.5h-1" /></svg>);
    case "help":
      return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.25-1.2.9-1.2 1.6v.5" /><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" /></svg>);
  }
}

function RailIcon({ name }: { name: "clock" | "shield" | "reply" }) {
  const p = { width: 17, height: 17, viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "clock") return (<svg {...p}><circle cx="9" cy="9" r="7" /><path d="M9 5v4l2.5 2" /></svg>);
  if (name === "shield") return (<svg {...p}><path d="M9 2l6 3v4c0 3.3-2.7 6.3-6 7-3.3-.7-6-3.7-6-7V5l6-3Z" /><path d="M6.5 9l2 2 3-4" /></svg>);
  return (<svg {...p}><path d="M8 4L3 9l5 5" /><path d="M3 9h8a4 4 0 0 1 4 4v1" /></svg>);
}
