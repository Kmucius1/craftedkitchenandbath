'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Mascot = 'crafty' | 'chip' | 'ty' | 'keyton';

const CREW: Record<Mascot, { name: string; role: string; img: string }> = {
  crafty: { name: 'Crafty', role: 'Blueprint Builder', img: '/images/mascots/crafty.jpg' },
  chip: { name: 'Chip', role: 'Cabinet Craftsman', img: '/images/mascots/chip.jpg' },
  ty: { name: 'Ty', role: 'Remodel Pro', img: '/images/mascots/ty.jpg' },
  keyton: { name: 'Keyton', role: 'Home Upgrade Helper', img: '/images/mascots/keyton.jpg' },
};

type Msg = {
  role: 'user' | 'assistant';
  content: string;
  mascot?: Mascot;
  navigate?: { path: string; label: string } | null;
  note?: string; // system confirmation (e.g. lead sent)
};

const BLUE = '#1F5FAC';
const ACCENT = '#2B7CC1';
const sans = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
const display = "var(--font-display), 'Montserrat', system-ui, sans-serif";

const SUGGESTIONS = ['Kitchen remodel', 'Bathroom remodel', 'See your work', 'Get a free quote'];

function Avatar({ mascot, size }: { mascot: Mascot; size: number }) {
  return (
    <span
      role="img"
      aria-label={CREW[mascot].name}
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#EAF1FB',
        border: '1px solid rgba(255,255,255,0.5)',
        display: 'inline-block',
        backgroundImage: `url(${CREW[mascot].img})`,
        backgroundSize: '150%',
        backgroundPosition: 'center 24%',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}

export default function MascotChat() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      mascot: 'crafty',
      content:
        "Hi there — I'm Crafty, your guide here at Crafted Kitchen & Bath. Tell me what you're dreaming up and I'll point you in the right direction, answer questions, or set up your free quote.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, []);

  useEffect(() => { if (open) scrollToBottom(); }, [messages, open, busy, scrollToBottom]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Any element on the site can open the chat by dispatching this event.
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener('open-mascot-chat', openChat);
    return () => window.removeEventListener('open-mascot-chat', openChat);
  }, []);

  async function submitLead(lead: Record<string, string>) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: lead.fullName || '',
          email: lead.email || '',
          phone: lead.phone || '',
          service: lead.service || 'General inquiry',
          city: lead.city || '',
          description: lead.description || 'Submitted via website chat assistant.',
          contactMethod: 'Either',
        }),
      });
      const data = await res.json().catch(() => ({}));
      return res.ok && data?.ok;
    } catch {
      return false;
    }
  }

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      const next: Msg[] = [...messages, { role: 'user', content: clean }];
      setMessages(next);
      setInput('');
      setBusy(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
        });
        const data = await res.json();
        const mascot: Mascot = (data?.mascot as Mascot) in CREW ? data.mascot : 'crafty';
        const assistant: Msg = {
          role: 'assistant',
          content: String(data?.reply || "Sorry, I didn't catch that."),
          mascot,
          navigate: data?.navigate || null,
        };

        // Handle an expedited contact request
        const lead = data?.lead;
        if (lead && lead.ready && !leadSent && lead.email && lead.fullName) {
          const ok = await submitLead(lead);
          if (ok) {
            setLeadSent(true);
            assistant.note = "✓ Request sent — the team will reach out within 24 hours.";
          } else {
            assistant.note = "I couldn't send that automatically — please call (727) 383-7550 and we'll take care of you.";
          }
        }

        setMessages((m) => [...m, assistant]);
      } catch {
        setMessages((m) => [
          ...m,
          { role: 'assistant', mascot: 'crafty', content: "I'm having trouble connecting. Please call us at (727) 383-7550 and we'll help right away." },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [messages, busy, leadSent]
  );

  function goTo(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <>
      {/* ── LAUNCHER ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Crafty"
          className="mascot-launcher"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 70,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 18px 6px 6px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '999px',
            boxShadow: '0 8px 30px rgba(26,32,44,0.18)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(26,32,44,0.24)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(26,32,44,0.18)'; }}
        >
          <Avatar mascot="crafty" size={44} />
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', color: '#1A202C' }}>Ask Crafty</span>
            <span style={{ fontFamily: sans, fontSize: '10px', letterSpacing: '0.04em', color: ACCENT }}>How can we help?</span>
          </span>
        </button>
      )}

      {/* ── PANEL ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Crafted Kitchen and Bath chat assistant"
          className="mascot-panel"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 71,
            width: 'min(390px, calc(100vw - 32px))',
            height: 'min(620px, calc(100vh - 48px))',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 70px rgba(26,32,44,0.30)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: BLUE, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Avatar mascot="crafty" size={42} />
            <div style={{ flex: 1, lineHeight: 1.2 }}>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>Crafty &amp; the Crew</div>
              <div style={{ fontFamily: sans, fontSize: '11px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
                Crafted Kitchen &amp; Bath · usually replies instantly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{ background: 'rgba(255,255,255,0.14)', border: 'none', color: '#FFFFFF', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 16px', backgroundColor: '#F7F8FA', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: '9px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                  {m.role === 'assistant' && <Avatar mascot={m.mascot || 'crafty'} size={30} />}
                  <div
                    style={{
                      maxWidth: '78%',
                      padding: '10px 13px',
                      borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      backgroundColor: m.role === 'user' ? ACCENT : '#FFFFFF',
                      color: m.role === 'user' ? '#FFFFFF' : '#1A202C',
                      fontFamily: sans,
                      fontSize: '13.5px',
                      lineHeight: 1.55,
                      border: m.role === 'user' ? 'none' : '1px solid rgba(0,0,0,0.06)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.role === 'assistant' && m.mascot && m.mascot !== 'crafty' && (
                      <div style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: ACCENT, marginBottom: '3px' }}>
                        {CREW[m.mascot].name} · {CREW[m.mascot].role}
                      </div>
                    )}
                    {m.content}
                  </div>
                </div>

                {/* Navigate button */}
                {m.navigate && (
                  <div style={{ marginLeft: '39px', marginTop: '8px' }}>
                    <button
                      onClick={() => goTo(m.navigate!.path)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', backgroundColor: '#FFFFFF', border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: sans, fontWeight: 600, fontSize: '12.5px', padding: '9px 15px', borderRadius: '999px', cursor: 'pointer', transition: 'background-color 0.15s ease, color 0.15s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = ACCENT; }}
                    >
                      {m.navigate.label} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}

                {/* Lead confirmation note */}
                {m.note && (
                  <div style={{ marginLeft: '39px', marginTop: '8px', fontFamily: sans, fontSize: '12px', color: '#15803D', backgroundColor: '#F0FDF4', border: '1px solid rgba(21,128,61,0.2)', padding: '8px 12px', borderRadius: '8px' }}>
                    {m.note}
                  </div>
                )}
              </div>
            ))}

            {busy && (
              <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-end' }}>
                <Avatar mascot="crafty" size={30} />
                <div style={{ padding: '12px 14px', borderRadius: '14px 14px 14px 4px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '4px' }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8D2E0', display: 'inline-block', animation: `mascotDot 1.2s ${d * 0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions (only before first user message) */}
            {messages.length === 1 && !busy && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '39px', marginTop: '2px' }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', color: '#4A5568', fontFamily: sans, fontSize: '12px', padding: '7px 12px', borderRadius: '999px', cursor: 'pointer' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderTop: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF', flexShrink: 0 }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your project…"
              aria-label="Type your message"
              style={{ flex: 1, border: '1px solid rgba(0,0,0,0.14)', borderRadius: '999px', padding: '11px 16px', fontFamily: sans, fontSize: '13.5px', color: '#1A202C', outline: 'none' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)')}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', border: 'none', backgroundColor: busy || !input.trim() ? '#A9C4E0' : ACCENT, color: '#FFFFFF', cursor: busy || !input.trim() ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes mascotDot { 0%,60%,100%{opacity:0.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }
        @media (max-width: 480px) {
          .mascot-panel { bottom: 0 !important; right: 0 !important; width: 100vw !important; height: 100dvh !important; border-radius: 0 !important; }
          .mascot-launcher { bottom: 68px !important; right: 16px !important; }
        }
      `}</style>
    </>
  );
}
