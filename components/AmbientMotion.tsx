'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ambient, always-on motion so the page never feels frozen between scroll
 * reveals. Two effects share one rAF loop and one combined transform per
 * element (so they never fight):
 *
 *  - Breathing Ken Burns — photos in clipped frames slowly scale, so whatever
 *    you're parked on stays gently alive while idle.
 *  - Scroll parallax — the same photos drift within their frame as you scroll,
 *    in BOTH directions, so any movement reads as motion (not a one-shot reveal).
 *
 * Only targets `object-fit: cover` images whose parent clips overflow, so the
 * scale/translate over-scan is always hidden — never causes layout shift. Skips
 * anything already animated (.kenburns, [data-no-ambient]), pauses on hidden
 * tabs, and is fully disabled for `prefers-reduced-motion`.
 */
export default function AmbientMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clips = (el: Element | null) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      return cs.overflow !== 'visible' || cs.overflowY !== 'visible' || cs.overflowX !== 'visible';
    };

    // Collect cover photos sitting inside a clipping frame.
    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>('main img').forEach((img) => {
      if (img.classList.contains('kenburns') || img.closest('[data-no-ambient]')) return;
      const cs = getComputedStyle(img);
      if (cs.objectFit !== 'cover') return;
      if (!clips(img.parentElement)) return;
      img.style.willChange = 'transform';
      // Each photo gets its own phase so they don't breathe in lockstep.
      (img as HTMLElement).dataset.phase = String(targets.length * 1.7);
      targets.push(img);
    });

    if (!targets.length) return;

    const vh = window.innerHeight;
    let raf = 0;
    let paused = document.hidden;
    let t = 0;

    const frame = () => {
      t += 0.016;
      for (const img of targets) {
        const r = img.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue; // offscreen — skip the work
        const phase = parseFloat(img.dataset.phase || '0');
        // Breathing scale: 1.07 → 1.105, slow.
        const scale = 1.07 + 0.035 * (0.5 + 0.5 * Math.sin(t * 0.32 + phase));
        // Parallax: element centre vs viewport centre, clamped so over-scan hides it.
        const centre = r.top + r.height / 2;
        const p = Math.max(-12, Math.min(12, ((vh / 2 - centre) / vh) * 26));
        img.style.transform = `scale(${scale.toFixed(4)}) translate3d(0, ${p.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || paused) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => {
      paused = document.hidden;
      if (paused) stop();
      else start();
    };

    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      stop();
      targets.forEach((img) => {
        img.style.transform = '';
        img.style.willChange = '';
        delete img.dataset.phase;
      });
    };
  }, [pathname]);

  return null;
}
