"use client";

import { useState } from "react";

/* ── Questionnaire config ──────────────────────────────────────────────────
   Each step holds one or more questions. Questions are single- or multi-select
   "card" pickers. The final contact step is rendered specially. Adding/removing
   a question here is all it takes to change the questionnaire. */

type Opt = { value: string; desc?: string };
type Question = {
  id: string;
  label: string;
  type: "single" | "multi";
  options: Opt[];
  required?: boolean;
  // When set, this question's joined answer also fills the lead's `service`.
  asService?: boolean;
};
type Step = { title: string; intro?: string; questions: Question[] };

const STEPS: Step[] = [
  {
    title: "What are we remodeling?",
    intro: "Pick everything you're considering — you can choose more than one.",
    questions: [
      {
        id: "Project type",
        label: "Project type",
        type: "multi",
        required: true,
        asService: true,
        options: [
          { value: "Kitchen", desc: "Cabinets, counters, layout" },
          { value: "Bathroom", desc: "Primary, guest, or powder" },
          { value: "Whole-home interior", desc: "Multiple rooms" },
          { value: "Flooring", desc: "Tile, LVP, hardwood" },
          { value: "Painting", desc: "Interior repaint" },
          { value: "Cabinets & countertops", desc: "Refresh only" },
          { value: "Not sure yet", desc: "Help me figure it out" },
        ],
      },
    ],
  },
  {
    title: "How far do you want to take it?",
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
        label: "Financing",
        type: "single",
        options: [
          { value: "Interested in financing options" },
          { value: "Paying out of pocket" },
          { value: "Not sure / tell me more" },
        ],
      },
    ],
  },
  {
    title: "Your vision",
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
  const progress = Math.round(((step + (isContact ? 1 : 0)) / totalSteps) * 100);

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
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call (727) 383-7550.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success ───────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: "#EBF4FF",
          border: "1px solid rgba(43,124,193,0.3)",
          padding: "56px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="22" r="21" stroke={ACCENT} strokeWidth="1.5" />
          <path d="M14 22.5L19.5 28L30 16" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontSize: "24px", fontWeight: 300, color: INK, margin: 0 }}>
          Thank you, {contact.fullName.split(" ")[0] || "and welcome"} — your project details are in.
        </p>
        <p style={{ fontSize: "14px", color: "#4A5568", margin: 0, lineHeight: 1.7, maxWidth: "440px" }}>
          A member of our team will review your answers and reach out within 24 hours to schedule your complimentary in-home consultation.
        </p>
        <a
          href="tel:+17273837550"
          style={{ marginTop: "8px", color: ACCENT, textDecoration: "none", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Prefer to talk now? Call (727) 383-7550 →
        </a>
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
    fontWeight: 500,
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
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT, fontWeight: 600 }}>
            Step {Math.min(step + 1, totalSteps)} of {totalSteps}
          </span>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9AA3AF" }}>{progress}% complete</span>
        </div>
        <div style={{ height: "3px", backgroundColor: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, backgroundColor: ACCENT, transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
      </div>

      {/* Step heading */}
      <h2 style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 34px)", color: INK, margin: "0 0 8px", lineHeight: 1.2 }}>
        {isContact ? "Almost there — where should we send it?" : STEPS[step].title}
      </h2>
      {(isContact ? "Tell us how to reach you and we'll follow up within 24 hours." : STEPS[step].intro) && (
        <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 32px", lineHeight: 1.7 }}>
          {isContact ? "Tell us how to reach you and we'll follow up within 24 hours." : STEPS[step].intro}
        </p>
      )}
      {!isContact && !STEPS[step].intro && <div style={{ height: "20px" }} />}

      {/* Body */}
      {isContact ? (
        <ContactStep contact={contact} setContact={setContact} labelStyle={labelStyle} inputStyle={inputStyle} focus={focus} blur={blur} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          {STEPS[step].questions.map((q) => (
            <div key={q.id}>
              <label style={labelStyle}>
                {q.label} {q.required && <span style={{ color: ACCENT }}>*</span>}
                {q.type === "multi" && <span style={{ textTransform: "none", letterSpacing: "0.02em", color: "#9AA3AF", marginLeft: "8px" }}>select all that apply</span>}
              </label>
              <div className="quote-options" style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
                {q.options.map((opt) => {
                  const active = (answers[q.id] || []).includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggle(q, opt.value)}
                      style={{
                        textAlign: "left",
                        cursor: "pointer",
                        border: `1px solid ${active ? ACCENT : "rgba(0,0,0,0.14)"}`,
                        backgroundColor: active ? "rgba(43,124,193,0.06)" : "#FFFFFF",
                        padding: "16px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        transition: "border-color 0.18s ease, background-color 0.18s ease",
                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: "18px",
                          height: "18px",
                          borderRadius: q.type === "multi" ? "3px" : "50%",
                          border: `1.5px solid ${active ? ACCENT : "rgba(0,0,0,0.25)"}`,
                          backgroundColor: active ? ACCENT : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {active && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span>
                        <span style={{ display: "block", fontSize: "15px", color: INK, fontWeight: active ? 500 : 400 }}>{opt.value}</span>
                        {opt.desc && <span style={{ display: "block", fontSize: "12px", color: "#9AA3AF", marginTop: "2px" }}>{opt.desc}</span>}
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
        <p style={{ color: "#C53030", fontSize: "13px", margin: "20px 0 0", lineHeight: 1.5 }}>{error}</p>
      )}

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px", gap: "16px" }}>
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          style={{
            fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: step === 0 ? "#C2C8D0" : INK,
            background: "transparent",
            border: "none",
            cursor: step === 0 ? "default" : "pointer",
            padding: "12px 0",
          }}
        >
          ← Back
        </button>
        {isContact ? (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            style={{
              fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#FFFFFF",
              backgroundColor: submitting ? "#7FA9CF" : ACCENT,
              border: "none",
              cursor: submitting ? "default" : "pointer",
              padding: "18px 40px",
              transition: "background-color 0.2s ease",
            }}
          >
            {submitting ? "Sending…" : "Submit My Project →"}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            style={{
              fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#FFFFFF",
              backgroundColor: INK,
              border: "none",
              cursor: "pointer",
              padding: "18px 40px",
            }}
          >
            Continue →
          </button>
        )}
      </div>
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
