import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/SectionLabel'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy | Crafted Kitchen and Bath',
  description:
    'Privacy policy for Crafted Kitchen and Bath. Learn how we collect, use, and protect your personal information.',
}

// ─── shared heading style ───────────────────────────────────────────────────
const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(20px, 2.5vw, 24px)',
  color: '#1A202C',
  margin: '0 0 16px',
  letterSpacing: '0.01em',
  lineHeight: 1.25,
}

const bodyTextStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.85,
  color: '#4A5568',
  margin: 0,
}

const dividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(0,0,0,0.08)',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#F7F8FA' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#F7F8FA',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
          </div>

          {/* Section label */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <SectionLabel>Legal</SectionLabel>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#1A202C',
              lineHeight: 1.15,
              margin: '0 0 20px',
              letterSpacing: '0.01em',
            }}
          >
            Privacy Policy
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: '#6B7280',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Last Updated: January 1, 2024
          </p>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '72px 24px 96px' }}>
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '44px',
          }}
        >

          {/* ── 1. Introduction ─────────────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>01</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Introduction</h2>
            <p style={bodyTextStyle}>
              Crafted Kitchen and Bath (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a
              licensed remodeling contractor based in Oldsmar, Florida, serving homeowners throughout
              Pinellas and Hillsborough County. We operate the website{' '}
              <span style={{ color: '#1A202C' }}>craftedkitchenandbath.com</span> (the
              &ldquo;Site&rdquo;).
            </p>
            <p style={{ ...bodyTextStyle, marginTop: '14px' }}>
              This Privacy Policy describes what information we collect when you visit our Site, how we
              use it, and the choices you have regarding your information. By using our Site, you agree
              to the collection and use of information in accordance with this policy. If you have any
              questions or concerns, please contact us using the information in the{' '}
              <a
                href="#privacy-contact"
                style={{ color: '#2B7CC1', textDecoration: 'none' }}
              >
                Contact for Privacy Matters
              </a>{' '}
              section below.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── 2. Information We Collect ────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>02</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Information We Collect</h2>

            <p style={{ ...bodyTextStyle, marginBottom: '18px' }}>
              We collect information in two ways — directly from you and automatically through standard
              web technologies.
            </p>

            {/* Sub-block: directly provided */}
            <div
              style={{
                borderLeft: '2px solid #2B7CC1',
                paddingLeft: '20px',
                marginBottom: '24px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2B7CC1',
                  margin: '0 0 8px',
                }}
              >
                Information You Provide
              </p>
              <p style={bodyTextStyle}>
                When you submit our contact form or request a free consultation, we collect your{' '}
                <span style={{ color: '#1A202C' }}>name</span>,{' '}
                <span style={{ color: '#1A202C' }}>email address</span>, and{' '}
                <span style={{ color: '#1A202C' }}>phone number</span>. You may also include a
                message describing your project. This information is used only to respond to your
                inquiry and coordinate services you have requested.
              </p>
            </div>

            {/* Sub-block: automatically collected */}
            <div
              style={{
                borderLeft: '2px solid rgba(43,124,193,0.35)',
                paddingLeft: '20px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2B7CC1',
                  margin: '0 0 8px',
                  opacity: 0.85,
                }}
              >
                Automatically Collected Data
              </p>
              <p style={bodyTextStyle}>
                Like most websites, our hosting and analytics infrastructure may automatically collect
                standard log and usage data, including your IP address, browser type and version,
                referring URLs, pages visited, and the time and date of your visit. This information
                is collected in aggregate and is used only to understand how visitors interact with
                our Site so we can improve it. It is not used to personally identify you.
              </p>
            </div>
          </div>

          <div style={dividerStyle} />

          {/* ── 3. How We Use Your Information ──────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>03</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>How We Use Your Information</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '16px' }}>
              We use the information we collect only for purposes directly related to the operation of
              our business and this Site:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Respond promptly to your contact form submissions and consultation requests',
                'Schedule and coordinate remodeling services you have requested',
                'Send project-related updates and follow-ups during an active engagement',
                'Improve the performance, content, and usability of our website',
                'Diagnose technical issues and maintain the security of the Site',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: '#4A5568',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2B7CC1',
                      flexShrink: 0,
                      marginTop: '8px',
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p style={bodyTextStyle}>
              We do not use your contact information for mass marketing campaigns, advertising, or any
              purpose unrelated to a service you have initiated. You will only hear from us in
              connection with your inquiry or an active project.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── 4. Information Sharing ───────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>04</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Information Sharing</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '14px' }}>
              <span style={{ color: '#1A202C', fontWeight: 500 }}>
                We do not sell, rent, trade, or otherwise transfer your personal information to any
                third party for their own marketing or commercial purposes.
              </span>{' '}
              Your information is not a product.
            </p>
            <p style={bodyTextStyle}>
              We may share limited information with trusted service providers who help us operate our
              Site and business — for example, our web hosting provider, email delivery service, and
              website analytics platform. These providers receive only the information necessary to
              perform their specific function, are prohibited from using your data for any other
              purpose, and are required to maintain appropriate confidentiality.
            </p>
            <p style={{ ...bodyTextStyle, marginTop: '14px' }}>
              We may also disclose information if required to do so by law or in response to a valid
              legal process (such as a court order or subpoena).
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── 5. Cookies ──────────────────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>05</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Cookies</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '14px' }}>
              Our Site may use cookies — small text files stored on your device by your browser — to
              support basic analytics and improve Site performance. These cookies collect anonymized,
              aggregate information about how visitors navigate the Site and do not contain any
              personally identifiable information.
            </p>
            <p style={{ ...bodyTextStyle, marginBottom: '14px' }}>
              The types of cookies we may use include:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                {
                  label: 'Analytics cookies',
                  detail:
                    'Help us understand page traffic, popular content, and how users move through the Site.',
                },
                {
                  label: 'Functional cookies',
                  detail:
                    'Support basic website functionality and remember preferences during your session.',
                },
              ].map(({ label, detail }) => (
                <li
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: '#4A5568',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2B7CC1',
                      flexShrink: 0,
                      marginTop: '8px',
                    }}
                  />
                  <span>
                    <span style={{ color: '#1A202C', fontWeight: 500 }}>{label} —</span> {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p style={bodyTextStyle}>
              You can control or disable cookies through your browser settings. Most browsers allow
              you to refuse all cookies, accept only certain types, or be alerted when a cookie is
              set. Please note that disabling cookies may limit some functionality on our Site. For
              instructions specific to your browser, refer to its help documentation or visit{' '}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2B7CC1', textDecoration: 'none' }}
              >
                allaboutcookies.org
              </a>
              .
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── 6. Your Rights ──────────────────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>06</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Your Rights</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '16px' }}>
              Depending on applicable law and the nature of the information we hold, you may have the
              right to:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                {
                  label: 'Access',
                  detail: 'Request a copy of the personal information we hold about you.',
                },
                {
                  label: 'Correction',
                  detail:
                    'Request that we correct any inaccurate or incomplete personal information.',
                },
                {
                  label: 'Deletion',
                  detail:
                    'Request that we delete your personal data, subject to any legal retention obligations.',
                },
                {
                  label: 'Opt-out',
                  detail:
                    'Opt out of any future non-transactional communications from us at any time.',
                },
              ].map(({ label, detail }) => (
                <li
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: '#4A5568',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2B7CC1',
                      flexShrink: 0,
                      marginTop: '8px',
                    }}
                  />
                  <span>
                    <span style={{ color: '#1A202C', fontWeight: 500 }}>{label} —</span> {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p style={bodyTextStyle}>
              To exercise any of these rights, please send a request to{' '}
              <a
                href="mailto:info@craftedkitchenandbath.com"
                style={{ color: '#2B7CC1', textDecoration: 'none' }}
              >
                info@craftedkitchenandbath.com
              </a>
              . We will acknowledge your request promptly and respond within a reasonable timeframe,
              typically within 30 days.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── 7. Contact for Privacy Matters ──────────────────────────── */}
          <div id="privacy-contact">
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>07</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Contact for Privacy Matters</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '20px' }}>
              If you have questions, concerns, or requests related to this Privacy Policy or the
              personal information we hold, please reach out to us directly. We are committed to
              addressing your concerns transparently and in good faith.
            </p>

            <div
              style={{
                backgroundColor: '#F7F8FA',
                border: '1px solid rgba(43,124,193,0.2)',
                borderRadius: '4px',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2B7CC1',
                  margin: 0,
                }}
              >
                Crafted Kitchen and Bath
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#4A5568', margin: 0 }}>
                <span style={{ color: '#1A202C' }}>Email: </span>
                <a
                  href="mailto:info@craftedkitchenandbath.com"
                  style={{ color: '#2B7CC1', textDecoration: 'none' }}
                >
                  info@craftedkitchenandbath.com
                </a>
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#4A5568', margin: 0 }}>
                <span style={{ color: '#1A202C' }}>Phone: </span>
                <a href="tel:+17273837550" style={{ color: '#2B7CC1', textDecoration: 'none' }}>
                  (727) 383-7550
                </a>
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#4A5568', margin: 0 }}>
                <span style={{ color: '#1A202C' }}>Address: </span>
                120 Commerce Blvd Suite 4, Oldsmar, FL 34677
              </p>
            </div>
          </div>

          <div style={dividerStyle} />

          {/* ── 8. Changes to This Policy ───────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <SectionLabel>08</SectionLabel>
            </div>
            <h2 style={sectionHeadingStyle}>Changes to This Policy</h2>
            <p style={{ ...bodyTextStyle, marginBottom: '14px' }}>
              We may update this Privacy Policy from time to time to reflect changes in our
              information practices, applicable law, or the features of our Site. When we make
              material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this
              page.
            </p>
            <p style={bodyTextStyle}>
              We encourage you to review this policy periodically to stay informed about how we are
              protecting your information. Your continued use of the Site following the posting of any
              changes constitutes acceptance of those changes. If a change materially reduces your
              rights, we will make reasonable efforts to notify you directly.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* ── Back link ────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              paddingTop: '8px',
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#2B7CC1',
                textDecoration: 'none',
              }}
            >
              &larr; Back to Home
            </Link>
            <span style={{ color: 'rgba(0,0,0,0.14)' }}>|</span>
            <Link
              href="/terms-and-conditions"
              style={{
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6B7280',
                textDecoration: 'none',
              }}
            >
              Terms &amp; Conditions &rarr;
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
