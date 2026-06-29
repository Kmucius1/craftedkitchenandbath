'use client';

const display = "var(--font-display), 'Montserrat', system-ui, sans-serif";
const sans = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
const ACCENT = '#2B7CC1';

type Props = {
  mascot?: 'crafty' | 'chip' | 'ty' | 'keyton';
  heading?: string;
  text?: string;
  cta?: string;
};

export default function AskCrewPrompt({
  mascot = 'crafty',
  heading = "Still have a question?",
  text = "Ask Crafty — our assistant can answer questions about your project or get your free quote started in seconds.",
  cta = "Chat with Crafty",
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(43,124,193,0.25)',
        borderRadius: '6px',
        padding: '24px 28px',
      }}
    >
      <span
        role="img"
        aria-label="Crafted assistant"
        style={{
          width: 76,
          height: 76,
          flexShrink: 0,
          borderRadius: '50%',
          backgroundColor: '#EAF1FB',
          backgroundImage: `url(/images/mascots/${mascot}.jpg)`,
          backgroundSize: '150%',
          backgroundPosition: 'center 24%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div style={{ flex: 1, minWidth: '220px' }}>
        <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: '18px', color: '#1A202C', margin: '0 0 6px' }}>{heading}</h3>
        <p style={{ fontFamily: sans, fontSize: '14px', lineHeight: 1.6, color: '#4A5568', margin: 0 }}>{text}</p>
      </div>
      <button
        onClick={() => window.dispatchEvent(new Event('open-mascot-chat'))}
        style={{ flexShrink: 0, fontFamily: sans, border: 'none', color: '#FFFFFF', backgroundColor: ACCENT, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, padding: '13px 26px', borderRadius: '999px', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E5C96')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
      >
        {cta}
      </button>
    </div>
  );
}
