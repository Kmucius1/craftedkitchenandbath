import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

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
  title: {
    default: "Crafted Kitchen & Bath | Kitchen & Bathroom Remodeling Tampa Bay | Oldsmar FL",
    template: "%s | Crafted Kitchen & Bath",
  },
  description:
    "Tampa Bay's premier kitchen and bathroom remodeling contractor. Custom kitchens, spa-inspired bathrooms, luxury countertops, and complete interior renovations across Pinellas & Hillsborough County. Licensed CRC1333143. Free consultations.",
  keywords: [
    "kitchen remodeling Tampa Bay",
    "bathroom remodeling Oldsmar FL",
    "custom kitchen cabinets Clearwater",
    "bathroom renovation Palm Harbor",
    "kitchen countertops Pinellas County",
    "luxury bathroom remodel Tampa",
    "kitchen and bath contractor Oldsmar",
    "bathroom tile installation Hillsborough County",
    "kitchen renovation near me Clearwater",
    "bathroom remodeling contractor Florida",
    "kitchen remodeling Oldsmar FL",
    "bathroom remodeling Pinellas County",
    "home remodeling Hillsborough County",
    "interior remodeling Tampa Bay",
    "flooring installation Oldsmar FL",
    "painting contractor Oldsmar FL",
    "custom kitchen remodelers near me",
    "bathroom renovation Tampa Bay",
    "Crafted Kitchen and Bath",
    "licensed contractor Oldsmar",
    "kitchen countertop replacement Tampa",
    "bathroom tile installation Pinellas County",
    "luxury bathroom renovation Clearwater",
    "custom kitchen cabinets Oldsmar",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Crafted Kitchen & Bath",
    title: "Crafted Kitchen & Bath | Kitchen & Bathroom Remodeling Tampa Bay",
    description:
      "Tampa Bay's premier kitchen and bathroom remodeling contractor. Custom kitchens, spa-inspired bathrooms, luxury countertops, and complete interior renovations across Pinellas & Hillsborough County. Licensed CRC1333143.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crafted Kitchen & Bath — Luxury Kitchen and Bathroom Remodeling Tampa Bay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafted Kitchen & Bath | Kitchen & Bathroom Remodeling Tampa Bay",
    description:
      "Licensed kitchen and bathroom remodelers serving Pinellas and Hillsborough County. 250+ homes transformed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://craftedkitchenandbath.com",
  },
};

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
