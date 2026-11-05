import type { Metadata } from "next";

export const SITE_URL = "https://craftedkitchenandbath.com";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Site-wide Open Graph defaults. A page's `openGraph` replaces the root one
 * outright (Next.js does not deep-merge it), so pages spread this in to keep
 * the share image, site name and locale, then add their own url.
 */
export const BASE_OG = {
  type: "website",
  locale: "en_US",
  siteName: "Crafted Kitchen & Bath",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Crafted Kitchen & Bath, kitchen and bathroom remodeling in Tampa Bay",
    },
  ],
} satisfies OpenGraph;

/** Open Graph for a page at `path`: the site defaults plus its own url. */
export const pageOg = (path: string, extra: Partial<OpenGraph> = {}): OpenGraph =>
  ({ ...BASE_OG, url: path, ...extra }) as OpenGraph;

/**
 * The business as one Organization entity, rendered on every page from the
 * root layout. Page-level schema links to it by @id.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "Crafted Kitchen and Bath",
  alternateName: "Crafted Kitchen & Bath",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Licensed kitchen and bathroom remodeling contractor (CGC1541816) in Oldsmar, FL, serving Pinellas and Hillsborough County.",
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
  geo: { "@type": "GeoCoordinates", latitude: 28.0345, longitude: -82.6654 },
  areaServed: [
    "Pinellas County",
    "Hillsborough County",
    "Oldsmar",
    "Clearwater",
    "Tampa",
    "Palm Harbor",
    "Safety Harbor",
    "Dunedin",
    "St. Petersburg",
    "Tarpon Springs",
    "Largo",
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+17273837550",
    email: "info@craftedkitchenandbath.com",
    contactType: "customer service",
    areaServed: "US-FL",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/craftedkitchenandbath",
    "https://www.instagram.com/craftedkitchenandbath",
  ],
};
