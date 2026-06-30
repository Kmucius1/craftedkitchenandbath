'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'About', href: '/about-us' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Areas of Service', href: '/areas-of-service' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

const SERVICES = [
  { label: 'Kitchen Remodeling', href: '/kitchen-remodeling' },
  { label: 'Bathroom Remodeling', href: '/bathroom-remodeling' },
  { label: 'Complete Interior Remodeling', href: '/complete-interior-home-remodeling' },
  { label: 'Flooring Installation', href: '/flooring-installation' },
  { label: 'Painting', href: '/painting' },
  { label: 'Countertops', href: '/services/countertops' },
  { label: 'Cabinet Refacing', href: '/services/cabinet-refacing' },
  { label: 'ADA & Aging-in-Place', href: '/services/ada-aging-in-place-bathrooms' },
  { label: 'Walk-In Showers', href: '/services/walk-in-showers' },
  { label: 'Luxury Vinyl Plank', href: '/services/luxury-vinyl-plank-flooring' },
  { label: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
  { label: 'Areas of Service', href: '/areas-of-service' },
];

const PHONE = '(727) 383-7550';
const PHONE_HREF = 'tel:+17273837550';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesHovered(true);
  };
  const closeServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesHovered(false), 180);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesHovered(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/services') {
      return SERVICES.some(s => pathname === s.href || pathname.startsWith(s.href + '/'));
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: '#1F5FAC',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 2px 24px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 2rem' }} className="md:px-14">
          <div style={{ display: 'flex', alignItems: 'center', height: '92px' }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ display: 'flex', flexShrink: 0, textDecoration: 'none' }}>
              <Image
                src="/logo.png"
                alt="Crafted Kitchen and Bath"
                width={168}
                height={56}
                priority
                style={{ objectFit: 'contain', height: '46px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav
              className="hidden md:flex"
              style={{ alignItems: 'center', gap: 'clamp(1.75rem, 3.2vw, 4rem)', marginLeft: '3.5rem', flex: 1 }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      style={{ position: 'relative' }}
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesHovered(false) }}
                      onKeyDown={e => { if (e.key === 'Escape') setServicesHovered(false) }}
                    >
                      <button
                        onClick={() => setServicesHovered(v => !v)}
                        onFocus={() => setServicesHovered(true)}
                        style={{
                          fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                          color: active ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                          fontSize: '11px',
                          letterSpacing: '0.13em',
                          textTransform: 'uppercase',
                          fontWeight: active ? 600 : 500,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = active ? '#FFFFFF' : 'rgba(255,255,255,0.85)'}
                        aria-haspopup="true"
                        aria-expanded={servicesHovered}
                      >
                        {link.label}
                        <svg
                          width="9" height="9" viewBox="0 0 10 10" fill="none"
                          style={{ transform: servicesHovered ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', opacity: 0.55 }}
                        >
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* ── SERVICES DROPDOWN ── */}
                      {/* Outer wrapper is transparent and includes a 14px top
                          bridge so the cursor never crosses a dead gap between
                          the trigger and the menu (which was closing it early). */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          paddingTop: '14px',
                          minWidth: '220px',
                          opacity: servicesHovered ? 1 : 0,
                          pointerEvents: servicesHovered ? 'auto' : 'none',
                          transition: 'opacity 0.2s ease',
                          zIndex: 60,
                        }}
                      >
                       <div
                         style={{
                           backgroundColor: '#FFFFFF',
                           border: '1px solid rgba(0,0,0,0.10)',
                           boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                         }}
                       >
                        <div style={{ height: '2px', backgroundColor: '#2B7CC1', width: '100%' }} />
                        {SERVICES.map(service => (
                          <Link
                            key={service.href}
                            href={service.href}
                            style={{
                              display: 'block',
                              fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                              color: pathname === service.href ? '#111822' : '#4A5568',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              padding: '12px 20px',
                              textDecoration: 'none',
                              transition: 'color 0.15s ease, background-color 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.color = '#111822';
                              (e.currentTarget as HTMLElement).style.backgroundColor = '#F7F8FA';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.color = pathname === service.href ? '#111822' : '#4A5568';
                              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            {service.label}
                          </Link>
                        ))}
                       </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                      color: active ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                      fontSize: '11px',
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      fontWeight: active ? 700 : 600,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                      borderBottom: active ? '2px solid #FFFFFF' : '2px solid transparent',
                      paddingBottom: '2px',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = active ? '#FFFFFF' : 'rgba(255,255,255,0.85)'}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── DESKTOP RIGHT: PHONE + CTA ── */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1.75rem', flexShrink: 0 }}>
              <a
                href={PHONE_HREF}
                style={{
                  fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'}
              >
                {PHONE}
              </a>
              <Link
                href="/quote"
                style={{
                  fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                  border: 'none',
                  color: '#1F5FAC',
                  backgroundColor: '#FFFFFF',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '13px 26px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#EAF1FB';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                }}
              >
                Get a Free Quote
              </Link>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginLeft: 'auto' }}
              className="md-hamburger"
            >
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#FFFFFF', transition: 'transform 0.25s ease, opacity 0.25s ease', transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#FFFFFF', transition: 'opacity 0.25s ease', opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#FFFFFF', transition: 'transform 0.25s ease, opacity 0.25s ease', transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </button>

            <style>{`
              @media (max-width: 767px) {
                .md-hamburger { display: flex !important; }
              }
            `}</style>
          </div>
        </div>
      </header>

      {/* ── MOBILE OVERLAY ── */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(26,32,44,0.35)', zIndex: 40, opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      />

      {/* ── MOBILE MENU PANEL ── */}
      <div
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(340px, 100vw)', backgroundColor: '#FFFFFF', borderLeft: '1px solid rgba(0,0,0,0.10)', zIndex: 50, display: 'flex', flexDirection: 'column', overflowY: 'auto', transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '92px', borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
          <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
            <span style={{ fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: '20px', letterSpacing: '-0.01em', color: '#111822', lineHeight: 1.1 }}>Crafted</span>
            <span style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif", fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#2B7CC1', display: 'block', marginTop: '1px' }}>Kitchen + Bath</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s ease' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#111822'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B7280'}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Tap-to-call */}
        <div style={{ padding: '20px 24px 8px', flexShrink: 0 }}>
          <a href={PHONE_HREF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FFFFFF', fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif", fontSize: '13px', letterSpacing: '0.08em', fontWeight: 500, padding: '12px 0', border: 'none', backgroundColor: '#2B7CC1', textDecoration: 'none', transition: 'background-color 0.2s ease' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#1E5C96'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#2B7CC1'}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M13 9.8v1.8a1.2 1.2 0 01-1.307 1.2 11.873 11.873 0 01-5.18-1.842A11.7 11.7 0 012.842 7.3a11.873 11.873 0 01-1.842-5.2A1.2 1.2 0 012.194 1H4a1.2 1.2 0 011.2 1.033c.076.58.217 1.15.42 1.7a1.2 1.2 0 01-.27 1.267L4.564 5.786A9.6 9.6 0 008.214 9.436l.786-.786a1.2 1.2 0 011.267-.27c.55.203 1.12.344 1.7.42A1.2 1.2 0 0113 9.8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {PHONE}
          </a>
        </div>

        {/* Mobile nav links */}
        <nav style={{ flex: 1, padding: '8px 24px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              if (link.hasDropdown) {
                return (
                  <li key={link.href} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <button onClick={() => setMobileServicesOpen(prev => !prev)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontStyle: 'italic', color: '#111822', fontSize: '24px', letterSpacing: '0em', textAlign: 'left', transition: 'color 0.2s ease' }}>
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 10 10" fill="none" style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', color: '#6B7280', flexShrink: 0 }}>
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div style={{ maxHeight: mobileServicesOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 16px 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {SERVICES.map(service => (
                          <li key={service.href}>
                            <Link href={service.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif", color: pathname === service.href ? '#111822' : '#4A5568', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '8px 0', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#111822'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = pathname === service.href ? '#111822' : '#4A5568'}>
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.href} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif", fontWeight: 300, fontStyle: 'italic', color: '#111822', fontSize: '24px', letterSpacing: '0em', padding: '20px 0', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#2B7CC1'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#111822'}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div style={{ padding: '20px 24px 36px', borderTop: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
          <Link href="/quote" onClick={() => setMobileOpen(false)} style={{ display: 'block', textAlign: 'center', fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif", border: '1px solid #111822', color: '#111822', backgroundColor: 'transparent', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, padding: '16px 0', textDecoration: 'none', transition: 'background-color 0.2s ease, color 0.2s ease' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#111822'; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#111822'; }}>
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
