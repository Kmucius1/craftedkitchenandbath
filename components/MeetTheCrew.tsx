'use client';

import Image from 'next/image';

const display = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const sans = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
const ACCENT = '#2B7CC1';

const CREW = [
  { id: 'crafty', name: 'Crafty', role: 'Blueprint Builder', line: 'Guides your project from first idea to final finish.', img: '/images/mascots/crafty.jpg' },
  { id: 'chip', name: 'Chip', role: 'Cabinet Craftsman', line: 'Kitchens, cabinetry, refacing, and countertops.', img: '/images/mascots/chip.jpg' },
  { id: 'ty', name: 'Ty', role: 'Remodel Pro', line: 'Bathrooms, tile, showers, flooring, and paint.', img: '/images/mascots/ty.jpg' },
  { id: 'keyton', name: 'Keyton', role: 'Home Upgrade Helper', line: 'Quotes, financing, scheduling, and next steps.', img: '/images/mascots/keyton.jpg' },
];

function openChat() {
  window.dispatchEvent(new Event('open-mascot-chat'));
}

export default function MeetTheCrew() {
  return (
    <section style={{ backgroundColor: '#F7F8FA', padding: '96px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="max-w-[1280px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: ACCENT, fontWeight: 600, fontFamily: sans, margin: 0 }}>
            Meet the Crew
          </p>
          <h2 style={{ fontFamily: display, fontWeight: 300, fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', color: '#1A202C', lineHeight: 1.15, letterSpacing: '-0.01em', margin: '20px 0 16px' }}>
            Help at Every Step of Your Remodel
          </h2>
          <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.75, color: '#4A5568', margin: 0 }}>
            Not sure where to start? Our crew is here to point you to the right place, answer your
            questions, and get your free quote moving — any time, day or night.
          </p>
        </div>

        {/* Crew grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" data-stagger style={{ gap: '16px' }}>
          {CREW.map((m) => (
            <div
              key={m.id}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', padding: '20px 18px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ position: 'relative', width: '100%', height: '150px', marginBottom: '12px' }}>
                <Image src={m.img} alt={`${m.name} — ${m.role}`} fill sizes="220px" style={{ objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: '18px', color: '#1A202C', margin: 0 }}>{m.name}</h3>
              <p style={{ fontFamily: sans, fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: ACCENT, fontWeight: 600, margin: '6px 0 10px' }}>{m.role}</p>
              <p style={{ fontFamily: sans, fontSize: '13px', lineHeight: 1.6, color: '#6B7280', margin: 0 }}>{m.line}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={openChat}
            style={{ fontFamily: sans, border: 'none', color: '#FFFFFF', backgroundColor: ACCENT, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, padding: '15px 34px', borderRadius: '999px', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E5C96')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Chat with Crafty
          </button>
        </div>
      </div>
    </section>
  );
}
