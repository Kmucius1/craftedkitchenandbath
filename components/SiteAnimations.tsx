'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide scroll-reveal motion. Runs after hydration and on every route
 * change. Hidden states are applied here (never in SSR markup), so content is
 * always visible without JS, and the whole system is skipped for visitors who
 * prefer reduced motion.
 *
 * Coverage:
 *  - `main section` (baseline) — each section eases in as it scrolls into view,
 *    UNLESS it already self-animates via <AnimateOnScroll> (inline opacity).
 *  - `[data-reveal]` — opt-in element reveal.
 *  - `[data-stagger]` — its direct children reveal one after another.
 * Elements already in view on load are left untouched (no flash).
 */
export default function SiteAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const vh = window.innerHeight;
    const belowFold = (el: Element) => el.getBoundingClientRect().top > vh * 0.82;

    const reveal = (el: Element) => {
      el.classList.remove('sa-hidden', 'sa-hidden-soft');
      if (el.hasAttribute('data-stagger')) {
        Array.from(el.children).forEach((c, i) => {
          (c as HTMLElement).style.transitionDelay = `${Math.min(i * 85, 510)}ms`;
          c.classList.remove('sa-hidden-soft');
        });
      }
    };

    // 0) Auto-stagger grids. Any grid / wrapped-flex container with 3+ items
    //    inside a section gets its children cascaded in (instead of the whole
    //    block fading as one). We tag it with data-stagger so the existing
    //    passes below handle it uniformly; the tag is removed on cleanup.
    const autoTagged: Element[] = [];
    const isGridLike = (el: Element) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'grid' || cs.display === 'inline-grid') return true;
      return (cs.display === 'flex' || cs.display === 'inline-flex') && cs.flexWrap === 'wrap';
    };
    document.querySelectorAll('main section *').forEach((el) => {
      if (el.childElementCount < 3) return; // leaf or layout pair — skip the style read
      if (el.hasAttribute('data-stagger') || el.hasAttribute('data-reveal')) return;
      if (el.closest('[data-stagger]')) return; // already inside a stagger container — avoid nesting
      if (el.closest('[style*="opacity"]')) return; // inside a self-animating block — don't fight it
      if (!isGridLike(el)) return;
      el.setAttribute('data-stagger', '');
      autoTagged.push(el);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    const observed: Element[] = [];

    // 1) Staggered grids — hide children, observe the container.
    document.querySelectorAll('main [data-stagger]').forEach((container) => {
      if (!belowFold(container)) return;
      Array.from(container.children).forEach((c) => c.classList.add('sa-reveal', 'sa-hidden-soft'));
      io.observe(container);
      observed.push(container);
    });

    // 2) Opt-in single elements.
    const singles = new Set<Element>();
    document.querySelectorAll('main [data-reveal]').forEach((el) => singles.add(el));

    // 3) Baseline: sections that don't already self-animate.
    document.querySelectorAll('main section').forEach((sec) => {
      if (sec.hasAttribute('data-stagger') || sec.hasAttribute('data-reveal')) return;
      // Skip if something inside already self-animates (AnimateOnScroll inline opacity,
      // or an opt-in [data-stagger]/[data-reveal] child) — avoids double motion.
      if (sec.querySelector('[style*="opacity"], [data-stagger], [data-reveal]')) return;
      singles.add(sec);
    });

    singles.forEach((el) => {
      if (!belowFold(el)) return; // already in view → leave as-is, no flash
      el.classList.add('sa-reveal', 'sa-hidden');
      io.observe(el);
      observed.push(el);
    });

    // Safety net: never leave content stuck hidden.
    const safety = window.setTimeout(() => {
      document.querySelectorAll('.sa-hidden, .sa-hidden-soft').forEach((el) => {
        if (el.getBoundingClientRect().top < vh) reveal(el);
      });
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
      // clean up any classes we added so a re-run starts fresh
      observed.forEach((el) => {
        el.classList.remove('sa-hidden', 'sa-hidden-soft', 'sa-reveal');
        Array.from(el.children).forEach((c) => c.classList.remove('sa-hidden-soft', 'sa-reveal'));
      });
      autoTagged.forEach((el) => el.removeAttribute('data-stagger'));
    };
  }, [pathname]);

  return null;
}
