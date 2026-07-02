"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mission & Vision two-panel with a coordinated entrance: the heading fades up,
 * the Mission panel slides in from the left and the Vision panel from the right
 * as the section scrolls into view. Reduced-motion safe (CSS disables the
 * transitions, so it simply appears).
 */
export default function MissionVision() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="mv-section" data-inview={inView ? "true" : "false"} style={{ backgroundColor: "#FFFFFF", padding: "clamp(40px, 9vw, 88px) 24px" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div className="mv-head" style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 52px)" }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#2B7CC1", fontWeight: 500, margin: 0 }}>Our Purpose</p>
          <h2 style={{ fontFamily: "var(--font-display),'Montserrat',system-ui,sans-serif", fontWeight: 300, fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.18, color: "#1A202C", margin: "16px 0 0", letterSpacing: "0.01em" }}>
            Mission &amp; Vision
          </h2>
        </div>

        <div className="mv-grid">
          {/* Mission */}
          <div className="mv-panel mv-mission">
            <span className="mv-ico" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 28 28" fill="none" stroke="#2B5DA8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13" cy="15" r="9" /><circle cx="13" cy="15" r="5" /><circle cx="13" cy="15" r="1.4" fill="#2B5DA8" stroke="none" /><path d="M19 9l4-4M19 9h3M19 9V6" />
              </svg>
            </span>
            <h3 className="mv-title">Mission</h3>
            <p className="mv-body">
              To transform houses into dream homes through exceptional remodeling, outstanding support, and genuine craftsmanship — built on trust, transparency, and excellence, so every project exceeds expectations.
            </p>
          </div>

          {/* Vision */}
          <div className="mv-panel mv-vision">
            <span className="mv-ico" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 28 28" fill="none" stroke="#2B5DA8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3a8 8 0 0 1 5 14.3c-.6.5-1 1.2-1 2v.7H10v-.7c0-.8-.4-1.5-1-2A8 8 0 0 1 14 3Z" /><path d="M11 23h6M12 25.5h4" />
              </svg>
            </span>
            <h3 className="mv-title">Vision</h3>
            <p className="mv-body">
              A Tampa Bay where every homeowner enjoys a beautifully designed, functional space that elevates daily life — and where Crafted is the name people trust first for reliability, creativity, and care.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 44px 90px -44px rgba(26,32,44,0.5);
        }
        @media (max-width: 760px) { .mv-grid { grid-template-columns: 1fr; } }
        .mv-panel { padding: clamp(34px, 4.6vw, 56px); }
        .mv-mission { background: linear-gradient(160deg, #2B5DA8 0%, #1B4287 100%); }
        .mv-vision { background: linear-gradient(160deg, #1A202C 0%, #0E1420 100%); }
        .mv-ico {
          display: inline-flex; width: 72px; height: 72px; border-radius: 50%;
          align-items: center; justify-content: center; margin-bottom: 26px;
          background: rgba(255,255,255,0.94);
          border: 3px solid rgba(255,255,255,0.5);
        }
        .mv-title {
          font-family: var(--font-display),'Montserrat',system-ui,sans-serif;
          font-weight: 400; font-size: clamp(26px, 3vw, 34px); color: #FFFFFF; margin: 0 0 16px;
        }
        .mv-body { font-size: 15.5px; line-height: 1.8; color: rgba(255,255,255,0.82); margin: 0; }

        /* Entrance */
        .mv-head, .mv-mission, .mv-vision {
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .mv-section[data-inview="false"] .mv-head { opacity: 0; transform: translateY(20px); }
        .mv-section[data-inview="false"] .mv-mission { opacity: 0; transform: translateX(-48px); }
        .mv-section[data-inview="false"] .mv-vision { opacity: 0; transform: translateX(48px); }
        .mv-section[data-inview="true"] .mv-head,
        .mv-section[data-inview="true"] .mv-mission,
        .mv-section[data-inview="true"] .mv-vision { opacity: 1; transform: none; }
        .mv-section[data-inview="true"] .mv-vision { transition-delay: 0.08s; }

        @media (max-width: 760px) {
          .mv-section[data-inview="false"] .mv-mission,
          .mv-section[data-inview="false"] .mv-vision { transform: translateY(40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mv-head, .mv-mission, .mv-vision { transition: none; }
        }
      `}</style>
    </section>
  );
}
