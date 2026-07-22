import Image from "next/image";

const display = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const sans = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
const ACCENT = "#2B7CC1";

// ─────────────────────────────────────────────────────────────────────────
// PLACEHOLDER TEAM — replace each entry with the real person.
//   name : full name
//   role : title shown under the name
//   bio  : one or two short sentences
//   img  : optional path to a headshot in /public (e.g. "/images/team/tyler.jpg").
//          Leave img undefined and a clean initials avatar is shown instead,
//          so nothing looks broken until real photos are dropped in.
// ─────────────────────────────────────────────────────────────────────────
type Member = { name: string; role: string; bio: string; img?: string };

const TEAM: Member[] = [
  {
    name: "Tylor Craft",
    role: "Owner & Lead Contractor",
    bio: "Founded Crafted to bring honest, craftsmanship-first remodeling to Tampa Bay, and still walks every job site.",
  },
  {
    name: "Matt Tharp",
    role: "Project Manager",
    bio: "Keeps your remodel on schedule and on budget, and is your point of contact from first measure to final walkthrough.",
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function MeetTheTeam() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(54px, 11vw, 96px) 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-[1280px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
          <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: ACCENT, fontWeight: 600, fontFamily: sans, margin: 0 }}>
            Meet the Team
          </p>
          <h2 style={{ fontFamily: display, fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.25rem)", color: "#1A202C", lineHeight: 1.15, letterSpacing: "-0.01em", margin: "20px 0 16px" }}>
            The People Behind Crafted
          </h2>
          <p style={{ fontFamily: sans, fontSize: "15px", lineHeight: 1.75, color: "#4A5568", margin: 0 }}>
            When you hire Crafted, you get real people who answer the phone, show up on site, and
            stand behind the work — start to finish.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[720px] mx-auto" data-stagger style={{ gap: "16px" }}>
          {TEAM.map((m, i) => (
            <div
              key={`${m.name}-${i}`}
              style={{ backgroundColor: "#F7F8FA", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "4px", padding: "24px 18px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            >
              {/* Avatar: photo if provided, otherwise a clean initials circle */}
              <div style={{ position: "relative", width: "104px", height: "104px", borderRadius: "50%", overflow: "hidden", marginBottom: "16px", backgroundColor: "#E7EEF6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {m.img ? (
                  <Image src={m.img} alt={`${m.name} — ${m.role}`} fill sizes="104px" style={{ objectFit: "cover" }} />
                ) : (
                  <span style={{ fontFamily: display, fontWeight: 300, fontSize: "34px", color: ACCENT, lineHeight: 1 }}>
                    {initials(m.name)}
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "18px", color: "#1A202C", margin: 0 }}>{m.name}</h3>
              <p style={{ fontFamily: sans, fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.14em", color: ACCENT, fontWeight: 600, margin: "6px 0 10px" }}>{m.role}</p>
              <p style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.6, color: "#6B7280", margin: 0 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
