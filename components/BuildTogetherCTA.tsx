"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Animated "Let's build something great" CTA. An overlapping project photo
 * breaks into a logo-blue panel, with a dotted accent behind it. On scroll into
 * view the photo slides in from the left, the panel from the right, and the dots
 * fade up — an eye-catching, coordinated entrance. Reduced-motion safe.
 */
export default function BuildTogetherCTA({
  heading = "Let's Build Something Great Together",
  text = "Your dream home starts here. Let's bring your vision to life with expert craftsmanship and a stress-free remodeling experience.",
  ctaLabel = "Get In Touch",
  ctaHref = "/quote",
  image = "/images/wp/IMG_6133-scaled.jpeg",
  imageAlt = "Custom kitchen with quartz waterfall island — Tampa Bay",
}: {
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion users still get the reveal, but CSS disables the transition
    // (see @media prefers-reduced-motion below), so it simply snaps into place.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bt-section" data-inview={inView ? "true" : "false"}>
      <div className="bt-grid">
        <div className="bt-dots" aria-hidden="true" />
        <div className="bt-image">
          <Image src={image} alt={imageAlt} fill style={{ objectFit: "cover" }} sizes="(max-width: 820px) 100vw, 45vw" />
        </div>
        <div className="bt-panel">
          <h2 className="bt-heading">{heading}</h2>
          <p className="bt-text">{text}</p>
          <Link href={ctaHref} className="bt-btn">
            {ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <style>{`
        .bt-section { background: #FFFFFF; padding: clamp(54px, 11vw, 104px) 24px; overflow: hidden; }
        .bt-grid {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          align-items: center;
        }
        .bt-dots {
          position: absolute;
          left: -14px;
          top: -18px;
          width: 170px;
          height: 62%;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(43,93,168,0.4) 1.6px, transparent 1.6px);
          background-size: 18px 18px;
        }
        .bt-image {
          position: relative;
          z-index: 2;
          height: clamp(360px, 46vw, 560px);
          margin-right: -90px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 44px 90px -34px rgba(0,0,0,0.5);
        }
        .bt-panel {
          z-index: 1;
          background: linear-gradient(155deg, #2B5DA8 0%, #1B4287 100%);
          border-radius: 6px;
          padding: clamp(44px, 5vw, 76px) clamp(32px, 4vw, 64px) clamp(44px, 5vw, 76px) clamp(72px, 8vw, 128px);
          box-shadow: 0 40px 80px -40px rgba(27,66,135,0.55);
        }
        .bt-heading {
          font-family: var(--font-display),'Montserrat',system-ui,sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0 0 20px;
          letter-spacing: 0.01em;
        }
        .bt-text {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          margin: 0 0 34px;
          max-width: 460px;
        }
        .bt-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          color: #1B4287;
          font-family: var(--font-dm-sans),'DM Sans',system-ui,sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 4px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bt-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px rgba(0,0,0,0.4); }

        /* Coordinated entrance */
        .bt-image, .bt-panel, .bt-dots {
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .bt-section[data-inview="false"] .bt-image { opacity: 0; transform: translateX(-54px); }
        .bt-section[data-inview="false"] .bt-panel { opacity: 0; transform: translateX(54px); }
        .bt-section[data-inview="false"] .bt-dots { opacity: 0; transform: translateY(16px); }
        .bt-section[data-inview="true"] .bt-image,
        .bt-section[data-inview="true"] .bt-panel { opacity: 1; transform: none; }
        .bt-section[data-inview="true"] .bt-dots { opacity: 1; transform: none; transition-delay: 0.18s; }

        @media (max-width: 820px) {
          .bt-grid { grid-template-columns: 1fr; }
          .bt-image { margin-right: 0; height: clamp(280px, 70vw, 420px); }
          .bt-panel { padding: clamp(32px, 7vw, 48px); margin-top: -28px; }
          .bt-dots { display: none; }
          .bt-section[data-inview="false"] .bt-image { transform: translateY(40px); }
          .bt-section[data-inview="false"] .bt-panel { transform: translateY(40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bt-image, .bt-panel, .bt-dots { transition: none; }
        }
      `}</style>
    </section>
  );
}
