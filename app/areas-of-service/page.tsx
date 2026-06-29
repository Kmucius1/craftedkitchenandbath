import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Kitchen & Bath Remodeling Service Areas | Pinellas & Hillsborough County FL",
  description:
    "Crafted Kitchen & Bath serves kitchen and bathroom remodeling clients across Oldsmar, Clearwater, Tampa, Palm Harbor, Safety Harbor, Dunedin, St. Petersburg, Tarpon Springs, and all of Tampa Bay.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Crafted Kitchen and Bath",
  url: "https://craftedkitchenandbath.com",
  telephone: "+17273837550",
  email: "info@craftedkitchenandbath.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "120 Commerce Blvd Suite 4",
    addressLocality: "Oldsmar",
    addressRegion: "FL",
    postalCode: "34677",
    addressCountry: "US",
  },
  description:
    "Licensed remodeling contractor serving Pinellas and Hillsborough County. Specializing in kitchen remodeling, bathroom renovations, flooring, and painting.",
  areaServed: [
    { "@type": "City", name: "Oldsmar", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Clearwater", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Palm Harbor", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Safety Harbor", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Dunedin", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Tarpon Springs", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Largo", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "St. Petersburg", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Tampa", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Brandon", containedIn: { "@type": "State", name: "Florida" } },
    { "@type": "AdministrativeArea", name: "Pinellas County" },
    { "@type": "AdministrativeArea", name: "Hillsborough County" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://craftedkitchenandbath.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Areas of Service",
      item: "https://craftedkitchenandbath.com/areas-of-service",
    },
  ],
};

const pinellasCities = [
  {
    name: "Oldsmar",
    slug: "oldsmar",
    copy: "Our home base. We're a short drive from most Oldsmar neighborhoods and know the home styles here well.",
  },
  {
    name: "Clearwater",
    slug: "clearwater",
    copy: "Clearwater homeowners trust us for kitchen and bathroom renovations that match the Gulf Coast lifestyle.",
  },
  {
    name: "Palm Harbor",
    slug: "palm-harbor",
    copy: "From master bath upgrades to full kitchen remodels, Palm Harbor is one of our most active service areas.",
  },
  {
    name: "Safety Harbor",
    slug: "safety-harbor",
    copy: "Safety Harbor's character-rich homes often benefit from custom cabinetry and thoughtful layout updates.",
  },
  {
    name: "Dunedin",
    slug: "dunedin",
    copy: "Dunedin's charming bungalows and coastal properties are a joy to work in — we respect the character while updating the function.",
  },
  {
    name: "Tarpon Springs",
    slug: "tarpon-springs",
    copy: "We serve Tarpon Springs homeowners with full remodeling services, from sponge-dock neighborhoods to inland communities.",
  },
  {
    name: "Largo",
    slug: "largo",
    copy: "Largo homeowners get the same quality and care as every other community we serve.",
  },
  {
    name: "St. Petersburg",
    slug: "st-petersburg",
    copy: "From historic homes to modern condos, St. Petersburg's variety means we're always solving interesting design challenges.",
  },
];

const hillsboroughCities = [
  {
    name: "Tampa",
    slug: "tampa",
    copy: "Tampa's diverse neighborhoods — from Hyde Park to Seminole Heights — keep us busy with kitchen and bath renovations.",
  },
  {
    name: "Westchase",
    slug: "westchase",
    copy: "Westchase's master-planned villages are reaching the age where original kitchens and baths are ready for a refresh.",
  },
  {
    name: "Carrollwood",
    slug: "carrollwood",
    copy: "From Original Carrollwood's oak-shaded ranches to Carrollwood Village, we update these homes with care.",
  },
  {
    name: "Brandon",
    slug: "brandon",
    copy: "We extend our services to Brandon and surrounding Hillsborough County communities.",
  },
];

export default function AreasOfServicePage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "128px 24px 96px",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "40px" }}>
            <ol
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link
                  href="/"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
                <span
                  style={{ color: "#2B7CC1", fontSize: "10px" }}
                  aria-hidden="true"
                >
                  /
                </span>
              </li>
              <li>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1A202C",
                  }}
                >
                  Areas of Service
                </span>
              </li>
            </ol>
          </nav>

          {/* Section label */}
          <SectionLabel>Service Areas</SectionLabel>

          {/* Thin blue line */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#2B7CC1",
              margin: "24px 0",
            }}
            aria-hidden="true"
          />

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(40px, 6.5vw, 76px)",
              lineHeight: 1.1,
              color: "#1A202C",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Serving Pinellas &amp;
            <br />
            Hillsborough County
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.75,
              color: "#4A5568",
              margin: "28px 0 0",
              maxWidth: "560px",
              letterSpacing: "0.01em",
            }}
          >
            We bring expert remodeling to homeowners across the Tampa Bay area
            &mdash; from Oldsmar to Tampa, Palm Harbor to St. Petersburg.
          </p>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <div style={{ width: "100%", height: "clamp(280px, 40vw, 460px)", position: "relative", overflow: "hidden" }}>
        <Image
          src="/images/wp/IMG_2206-scaled.jpeg"
          alt="Kitchen and bathroom remodeling across Pinellas and Hillsborough County by Crafted Kitchen and Bath"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
      </div>

      {/* ── 2. COUNTY OVERVIEW ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "96px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2px",
            backgroundColor: "rgba(43,124,193,0.12)",
          }}
          className="md:!grid-cols-2"
        >
          {/* Pinellas County */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "56px 48px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <SectionLabel>Primary Area</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Pinellas County
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              Our primary service area, Pinellas County, is home to the
              communities we know and serve best. From waterfront homes in
              Dunedin to family neighborhoods in Palm Harbor &mdash; we
              understand the homes here and what they need.
            </p>

            {/* City chips */}
            <ul
              style={{
                listStyle: "none",
                margin: "8px 0 0",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {pinellasCities.map((city) => (
                <li key={city.name}>
                  <span
                    style={{
                      display: "inline-block",
                      border: "1px solid rgba(0,0,0,0.12)",
                      color: "#4A5568",
                      backgroundColor: "#FFFFFF",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      fontWeight: 500,
                    }}
                  >
                    {city.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hillsborough County */}
          <div
            style={{
              backgroundColor: "#F7F8FA",
              padding: "56px 48px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <SectionLabel>Extended Area</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Hillsborough County
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              We extend our full range of remodeling services across
              Hillsborough County, including Tampa&rsquo;s growing neighborhoods
              and surrounding communities.
            </p>

            {/* City chips */}
            <ul
              style={{
                listStyle: "none",
                margin: "8px 0 0",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {hillsboroughCities.map((city) => (
                <li key={city.name}>
                  <span
                    style={{
                      display: "inline-block",
                      border: "1px solid rgba(0,0,0,0.12)",
                      color: "#4A5568",
                      backgroundColor: "#FFFFFF",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      fontWeight: 500,
                    }}
                  >
                    {city.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. CITY CARDS — PINELLAS ─────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F7F8FA",
          padding: "96px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "560px",
            }}
          >
            <SectionLabel>Pinellas County Cities</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Communities We Serve in Pinellas
            </h2>
          </div>

          {/* Cards grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: "rgba(43,124,193,0.1)" }}
          >
            {pinellasCities.map((city) => (
              <Link
                key={city.name}
                href={`/areas-of-service/${city.slug}`}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                  }}
                  aria-hidden="true"
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {city.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {city.copy}
                </p>

                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    fontWeight: 600,
                    marginTop: "4px",
                  }}
                >
                  View {city.name} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CITY CARDS — HILLSBOROUGH ─────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "96px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "560px",
            }}
          >
            <SectionLabel>Hillsborough County Cities</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Communities We Serve in Hillsborough
            </h2>
          </div>

          {/* Cards — narrower grid for 2 cities */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{
              backgroundColor: "rgba(43,124,193,0.1)",
              maxWidth: "640px",
            }}
          >
            {hillsboroughCities.map((city) => (
              <Link
                key={city.name}
                href={`/areas-of-service/${city.slug}`}
                style={{
                  backgroundColor: "#F7F8FA",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    backgroundColor: "#2B7CC1",
                  }}
                  aria-hidden="true"
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#1A202C",
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "0.01em",
                  }}
                >
                  {city.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#4A5568",
                    margin: 0,
                  }}
                >
                  {city.copy}
                </p>

                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#2B7CC1",
                    fontWeight: 600,
                    marginTop: "4px",
                  }}
                >
                  View {city.name} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR COMMITMENT / WE COME TO YOU ──────────────────────── */}
      <section
        style={{
          backgroundColor: "#EEF0F4",
          padding: "96px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="lg:!grid-cols-[1fr_380px]"
        >
          {/* Left: copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            <SectionLabel>Our Commitment</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.2,
                color: "#1A202C",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              We Come to You
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "#4A5568",
                margin: 0,
              }}
            >
              We don&rsquo;t require homeowners to travel to a showroom. Our
              team visits your home, assesses the space, and begins planning
              on-site. If you&rsquo;re in Pinellas or Hillsborough County, we
              can be there.
            </p>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: "10px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#2B7CC1",
                textDecoration: "none",
                borderBottom: "1px solid rgba(43,124,193,0.4)",
                paddingBottom: "2px",
              }}
            >
              Schedule a Free In-Home Consultation
            </Link>
          </div>

          {/* Right: full city list card */}
          <div
            style={{
              border: "1px solid rgba(43,124,193,0.3)",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: "#FFFFFF",
              position: "relative",
            }}
          >
            {/* Corner accents — top-left */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                width: "18px",
                height: "18px",
                borderTop: "1px solid rgba(43,124,193,0.5)",
                borderLeft: "1px solid rgba(43,124,193,0.5)",
              }}
              aria-hidden="true"
            />
            {/* top-right */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "18px",
                height: "18px",
                borderTop: "1px solid rgba(43,124,193,0.5)",
                borderRight: "1px solid rgba(43,124,193,0.5)",
              }}
              aria-hidden="true"
            />
            {/* bottom-left */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                width: "18px",
                height: "18px",
                borderBottom: "1px solid rgba(43,124,193,0.5)",
                borderLeft: "1px solid rgba(43,124,193,0.5)",
              }}
              aria-hidden="true"
            />
            {/* bottom-right */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                width: "18px",
                height: "18px",
                borderBottom: "1px solid rgba(43,124,193,0.5)",
                borderRight: "1px solid rgba(43,124,193,0.5)",
              }}
              aria-hidden="true"
            />

            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6B7280",
                margin: 0,
              }}
            >
              Full Service Coverage
            </p>

            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "#2B7CC1",
              }}
              aria-hidden="true"
            />

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[...pinellasCities, ...hillsboroughCities].map((city) => (
                <li
                  key={city.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    color: "#4A5568",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: "#2B7CC1",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {city.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. LOCAL SEO PARAGRAPH ───────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 24px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.85,
              color: "#4A5568",
              margin: 0,
              textAlign: "center",
            }}
          >
            Crafted Kitchen and Bath is a licensed Florida contractor (CRC1333143) serving homeowners
            throughout Pinellas County and Hillsborough County. Our team specializes in kitchen
            remodeling, bathroom renovations, luxury vinyl plank flooring, tile installation, and
            interior painting — all delivered with the craftsmanship and communication you deserve.
          </p>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Begin Your Remodel?"
        subtext="Schedule a complimentary in-home consultation with our team. We serve homeowners across Pinellas and Hillsborough County — no showroom visit required."
      />
    </>
  );
}
