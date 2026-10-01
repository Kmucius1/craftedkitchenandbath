"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import StickyMobileCTA from "./StickyMobileCTA";
import MascotChat from "./MascotChat";
import SiteAnimations from "./SiteAnimations";
import AmbientMotion from "./AmbientMotion";
import NewsletterPopup from "./NewsletterPopup";

// The client portal (/portal) is its own standalone app with its own shell
// (see app/portal/layout.tsx) — it must not get the marketing site's
// header, footer, sticky CTA, chat widget, or newsletter popup around it.
// Same for a contract signing page (/contract/<token>): a homeowner signing a
// legal agreement should not have a newsletter popup or chat bubble over it.
// Everything else on the site is unaffected.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname === "/portal" || pathname?.startsWith("/portal/");
  const isContract = pathname?.startsWith("/contract/");

  if (isPortal || isContract) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <MascotChat />
      <SiteAnimations />
      <AmbientMotion />
      <NewsletterPopup />
    </>
  );
}
