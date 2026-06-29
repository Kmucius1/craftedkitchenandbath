'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

export type CarouselItem = {
  src: string
  alt: string
  category: string
  title: string
}

const headingFont = "var(--font-display), 'Montserrat', system-ui, sans-serif"

export default function PortfolioCarousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + items.length) % items.length),
    [items.length]
  )

  // Keep the active thumbnail scrolled into view in the filmstrip
  useEffect(() => {
    const el = thumbRefs.current[active]
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  // Keyboard arrows
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  const current = items[active]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project photo slideshow"
      tabIndex={0}
      onKeyDown={onKey}
      style={{ outline: 'none' }}
    >
      {/* ── MAIN STAGE ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          backgroundColor: '#E8ECF0',
          borderRadius: '2px',
        }}
      >
        {/* Slides stacked; only active is opaque (crossfade) */}
        {items.map((item, i) => (
          <Image
            key={item.src + i}
            src={item.src}
            alt={item.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 1100px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}

        {/* Gradient for caption legibility */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 38%, transparent 62%)',
            pointerEvents: 'none',
          }}
        />

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(26,32,44,0.6)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            fontSize: '11px',
            letterSpacing: '0.1em',
            padding: '6px 12px',
            fontFamily: headingFont,
          }}
        >
          {active + 1} / {items.length}
        </div>

        {/* Caption */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 'clamp(20px, 4vw, 36px)', maxWidth: '640px' }}>
          <p style={{ color: '#7FB8E6', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, margin: '0 0 8px' }}>
            {current.category}
          </p>
          <p style={{ fontFamily: headingFont, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(18px, 2.6vw, 26px)', color: '#FFFFFF', lineHeight: 1.25, margin: 0 }}>
            {current.title}
          </p>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous project"
          style={{ ...arrowStyle, left: '16px' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2B7CC1')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(26,32,44,0.55)')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next project"
          style={{ ...arrowStyle, right: '16px' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2B7CC1')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(26,32,44,0.55)')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.5 3.5L12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* ── THUMBNAIL FILMSTRIP ── */}
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '14px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'thin',
        }}
      >
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <button
              key={item.src + i}
              ref={(el) => { thumbRefs.current[i] = el }}
              onClick={() => setActive(i)}
              aria-label={`View ${item.title}`}
              aria-current={isActive}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: 'clamp(96px, 13vw, 132px)',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                border: isActive ? '2px solid #2B7CC1' : '2px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                padding: 0,
                background: 'none',
                opacity: isActive ? 1 : 0.55,
                transition: 'opacity 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = '0.55' }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="132px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

const arrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'rgba(26,32,44,0.55)',
  backdropFilter: 'blur(6px)',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
}
