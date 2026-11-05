import type { Metadata, Viewport } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import CampaignCapture from "@/components/CampaignCapture";
import { BASE_OG, organizationJsonLd } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://craftedkitchenandbath.com"),
  // Google Search Console ownership (URL-prefix property https://craftedkitchenandbath.com/)
  verification: { google: "nKKIqgILPZe4Cokza2AI8j3Sxo1baLw_gTffoawgDQY" },
  title: {
    default: "Crafted Kitchen & Bath | Kitchen & Bathroom Remodeling Tampa Bay | Oldsmar FL",
    template: "%s | Crafted Kitchen & Bath",
  },
  description:
    "Tampa Bay's premier kitchen and bathroom remodeling contractor. Custom kitchens, spa-inspired bathrooms, luxury countertops, and complete interior renovations across Pinellas & Hillsborough County. Licensed CGC1541816. Free consultations.",
  openGraph: BASE_OG,
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Force light mode everywhere — this is a brand marketing site, not an app,
// so it should never be auto-inverted/darkened by a visitor's OS/browser
// dark-mode setting.
export const viewport: Viewport = {
  colorScheme: "light",
};

// DRYP-owned GA4 property; env var overrides. Only loads on production deploys so
// preview/test traffic stays out of reports.
const GA_MEASUREMENT_ID =
  process.env.VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3G9J9CY6R9"
    : undefined;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable}`}
    >
      <body className="bg-white text-[#1A202C] antialiased flex flex-col min-h-screen">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CampaignCapture />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
