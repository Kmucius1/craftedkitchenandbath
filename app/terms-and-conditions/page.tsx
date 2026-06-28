import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Crafted Kitchen and Bath',
  description: 'Terms and conditions for using the Crafted Kitchen and Bath website.',
}

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  fontWeight: 300,
  fontSize: '22px',
  color: '#1A202C',
  margin: '0 0 14px',
  letterSpacing: '0.01em',
}

const bodyStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#4A5568',
  margin: 0,
}

const bodySpacedStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#4A5568',
  margin: '0 0 12px',
}

const listStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 2,
  color: '#4A5568',
  margin: '0 0 12px',
  paddingLeft: '20px',
}

const dividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(0,0,0,0.08)',
}

export default function TermsAndConditionsPage() {
  return (
    <div style={{ backgroundColor: '#F7F8FA' }}>
      {/* HERO */}
      <section
        style={{
          backgroundColor: '#F7F8FA',
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <SectionLabel>Legal</SectionLabel>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: '#1A202C',
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '0.01em',
            }}
          >
            Terms and Conditions
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            Effective Date: January 1, 2024 &nbsp;&bull;&nbsp; Last Updated: January 1, 2024
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '64px 24px 80px' }}>
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >

          {/* 1. Acceptance of Terms */}
          <div>
            <h2 style={h2Style}>1. Acceptance of Terms</h2>
            <p style={bodySpacedStyle}>
              By accessing or using the website located at{' '}
              <span style={{ color: '#1A202C' }}>craftedkitchenandbath.com</span> (the
              &ldquo;Website&rdquo;), you acknowledge that you have read, understood, and agree to be
              bound by these Terms and Conditions (&ldquo;Terms&rdquo;) in their entirety. These Terms
              constitute a legally binding agreement between you and Crafted Kitchen and Bath
              (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
            </p>
            <p style={bodyStyle}>
              If you do not agree to these Terms, you must immediately discontinue your use of the
              Website. We reserve the right to modify these Terms at any time without prior notice.
              Continued use of the Website following any modification constitutes your acceptance of the
              revised Terms.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 2. Use of Website */}
          <div>
            <h2 style={h2Style}>2. Use of Website</h2>
            <p style={bodySpacedStyle}>
              This Website is provided for general informational purposes only. The content published
              here is intended to give visitors an overview of the services offered by Crafted Kitchen
              and Bath. Nothing on this Website constitutes a binding contract, warranty, or guarantee
              of any specific outcome, price, timeline, or availability of services.
            </p>
            <p style={bodySpacedStyle}>
              You agree to use this Website only for lawful purposes and in a manner consistent with all
              applicable local, state, and federal laws and regulations. You agree not to:
            </p>
            <ul style={listStyle}>
              <li>
                Use automated tools, bots, scrapers, or crawlers to extract content from this Website
                without our express written consent
              </li>
              <li>
                Reproduce, distribute, republish, or commercially exploit any portion of the
                Website&rsquo;s content without authorization
              </li>
              <li>
                Interfere with or disrupt the operation of the Website or any servers or networks
                connected to it
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the Website or its related
                systems
              </li>
              <li>
                Use the Website to transmit any unsolicited or unauthorized advertising or promotional
                material
              </li>
            </ul>
            <p style={bodyStyle}>
              We reserve the right to terminate or restrict access to the Website for any user who
              violates these Terms, without notice or liability.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 3. Intellectual Property */}
          <div>
            <h2 style={h2Style}>3. Intellectual Property</h2>
            <p style={bodySpacedStyle}>
              All content appearing on this Website — including but not limited to text, photographs,
              graphics, logos, icons, project images, design elements, page layouts, and the overall
              look and feel of the Website — is the exclusive property of Crafted Kitchen and Bath or
              its licensors and is protected by applicable United States and international intellectual
              property laws, including copyright and trademark law.
            </p>
            <p style={bodySpacedStyle}>
              You are granted a limited, non-exclusive, non-transferable license to access and view the
              content of this Website solely for your personal, non-commercial use in connection with
              evaluating our remodeling services. This license does not include the right to:
            </p>
            <ul style={listStyle}>
              <li>Modify or create derivative works based on Website content</li>
              <li>Use content for any commercial purpose or public display</li>
              <li>
                Remove, alter, or obscure any copyright, trademark, or proprietary notices
              </li>
              <li>
                Transfer, sublicense, or otherwise make content available to any third party
              </li>
            </ul>
            <p style={bodyStyle}>
              Any unauthorized use of our intellectual property is a violation of these Terms and may
              also constitute an infringement of applicable law. We actively enforce our intellectual
              property rights and will pursue all available legal remedies for unauthorized use.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 4. Disclaimer of Warranties */}
          <div>
            <h2 style={h2Style}>4. Disclaimer of Warranties</h2>
            <p style={bodySpacedStyle}>
              THIS WEBSITE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS,
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT
              PERMISSIBLE UNDER APPLICABLE LAW, CRAFTED KITCHEN AND BATH EXPRESSLY DISCLAIMS ALL
              WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p style={bodySpacedStyle}>We do not warrant or represent that:</p>
            <ul style={listStyle}>
              <li>
                The content on this Website is accurate, complete, current, or free from errors or
                omissions
              </li>
              <li>
                The Website will operate uninterrupted, without delays, or free from technical defects
              </li>
              <li>
                The Website or the server that makes it available are free of viruses or other harmful
                components
              </li>
              <li>
                Pricing, availability, or service descriptions displayed on the Website reflect current
                offerings
              </li>
            </ul>
            <p style={bodyStyle}>
              We reserve the right to correct any errors, inaccuracies, or omissions and to change or
              update information on the Website at any time without prior notice. Any reliance you place
              on the information provided through this Website is strictly at your own risk.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 5. Limitation of Liability */}
          <div>
            <h2 style={h2Style}>5. Limitation of Liability</h2>
            <p style={bodySpacedStyle}>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CRAFTED KITCHEN AND BATH, ITS OWNERS,
              EMPLOYEES, AGENTS, CONTRACTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES — INCLUDING BUT NOT
              LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, OR
              ANY OTHER INTANGIBLE LOSSES — ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE
              OF (OR INABILITY TO ACCESS OR USE) THIS WEBSITE OR ITS CONTENT.
            </p>
            <p style={bodySpacedStyle}>
              This limitation of liability applies regardless of the legal theory under which such
              damages are sought, whether in contract, tort (including negligence), strict liability, or
              otherwise, and even if we have been advised of the possibility of such damages.
            </p>
            <p style={bodyStyle}>
              In no event shall our total cumulative liability to you for all claims arising from or
              related to your use of this Website exceed one hundred dollars ($100.00). Some
              jurisdictions do not allow the exclusion or limitation of incidental or consequential
              damages, so the above limitation may not apply to you.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 6. Third-Party Links */}
          <div>
            <h2 style={h2Style}>6. Third-Party Links</h2>
            <p style={bodySpacedStyle}>
              This Website may contain links to third-party websites, resources, or services that are
              not owned or controlled by Crafted Kitchen and Bath. These links are provided solely for
              your convenience and informational purposes.
            </p>
            <p style={bodySpacedStyle}>
              We have no control over, and assume no responsibility for, the content, privacy policies,
              terms of service, or practices of any third-party websites. The inclusion of any link on
              this Website does not imply our endorsement, recommendation, or approval of the linked
              site or its content.
            </p>
            <p style={bodyStyle}>
              We strongly encourage you to review the terms and privacy policies of any third-party
              websites you visit. You access third-party websites entirely at your own risk, and we
              shall not be liable for any damages or losses arising from your use of or reliance on any
              third-party content, products, or services.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 7. Governing Law */}
          <div>
            <h2 style={h2Style}>7. Governing Law</h2>
            <p style={bodySpacedStyle}>
              These Terms and Conditions and any dispute arising out of or related to your use of this
              Website shall be governed by and construed in accordance with the laws of the{' '}
              <span style={{ color: '#1A202C' }}>State of Florida</span>, without regard to its
              conflict of law provisions.
            </p>
            <p style={bodySpacedStyle}>
              Any legal action or proceeding arising under or relating to these Terms shall be brought
              exclusively in the state or federal courts located in Pinellas County, Florida, and you
              hereby irrevocably consent to the personal jurisdiction and venue of such courts.
            </p>
            <p style={bodyStyle}>
              If any provision of these Terms is found to be unlawful, void, or unenforceable for any
              reason, that provision shall be deemed severable from these Terms and shall not affect the
              validity and enforceability of the remaining provisions.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 8. Changes to These Terms */}
          <div>
            <h2 style={h2Style}>8. Changes to These Terms</h2>
            <p style={bodySpacedStyle}>
              We reserve the right to update or revise these Terms at any time in our sole discretion.
              When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of
              this page. We may also provide notice of material changes through a prominent notice on
              the Website.
            </p>
            <p style={bodyStyle}>
              Your continued access to or use of the Website after any changes become effective
              constitutes your acceptance of the revised Terms. If you do not agree to the updated
              Terms, you must stop using the Website immediately.
            </p>
          </div>

          <div style={dividerStyle} />

          {/* 9. Contact */}
          <div>
            <h2 style={h2Style}>9. Contact Us</h2>
            <p style={bodySpacedStyle}>
              If you have any questions, concerns, or comments regarding these Terms and Conditions,
              please contact us:
            </p>
            <div
              style={{
                backgroundColor: '#F7F8FA',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '4px',
                padding: '24px 28px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2B7CC1',
                  margin: '0 0 16px',
                  fontWeight: 500,
                }}
              >
                Crafted Kitchen and Bath
              </p>
              <p style={{ fontSize: '15px', lineHeight: 2, color: '#4A5568', margin: 0 }}>
                120 Commerce Blvd Suite 4
                <br />
                Oldsmar, FL 34677
                <br />
                Email:{' '}
                <a
                  href="mailto:info@craftedkitchenandbath.com"
                  style={{ color: '#2B7CC1', textDecoration: 'none' }}
                >
                  info@craftedkitchenandbath.com
                </a>
                <br />
                Phone:{' '}
                <a href="tel:+17273837550" style={{ color: '#2B7CC1', textDecoration: 'none' }}>
                  (727) 383-7550
                </a>
              </p>
            </div>
          </div>

          {/* Back link */}
          <div style={{ paddingTop: '8px' }}>
            <Link
              href="/"
              style={{
                fontSize: '13px',
                color: '#2B7CC1',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              &larr; Back to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
