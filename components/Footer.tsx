import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F7F8FA" }}>
      {/* Blue top line */}
      <div style={{ height: "1px", backgroundColor: "#2B7CC1" }} />

      {/* Main footer grid */}
      <div className="px-6 pt-16 pb-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            {/* Logo mark */}
            <Link href="/" style={{ display: "inline-flex", textDecoration: "none" }}>
              <Image
                src="/logo.png"
                alt="Crafted Kitchen and Bath"
                width={160}
                height={52}
                style={{ objectFit: "contain", height: "48px", width: "auto" }}
              />
            </Link>

            {/* Tagline */}
            <p
              style={{
                color: "#4A5568",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              One destination for exceptional home remodeling in Tampa Bay.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-3">
              {/* Phone */}
              <li>
                <a
                  href="tel:7273837550"
                  style={{ color: "#4A5568", textDecoration: "none" }}
                  className="text-sm flex items-start gap-2 transition-colors duration-200 hover:text-[#1A202C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2B7CC1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.07 6.07l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  (727) 383-7550
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@craftedkitchenandbath.com"
                  style={{ color: "#4A5568", textDecoration: "none" }}
                  className="text-sm flex items-start gap-2 transition-colors duration-200 hover:text-[#1A202C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2B7CC1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  info@craftedkitchenandbath.com
                </a>
              </li>

              {/* Address */}
              <li>
                <div
                  style={{ color: "#4A5568" }}
                  className="text-sm flex items-start gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2B7CC1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    120 Commerce Blvd Suite 4<br />
                    Oldsmar, FL 34677
                  </span>
                </div>
              </li>
            </ul>

            {/* License */}
            <p style={{ color: "#9CA3AF", fontSize: "11px" }}>
              License: CRC1333143
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/craftedkitchenandbath"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "#9CA3AF" }}
                className="transition-colors duration-200 hover:text-[#1A202C]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/craftedkitchenandbath"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "#9CA3AF" }}
                className="transition-colors duration-200 hover:text-[#1A202C]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <h3
              style={{
                color: "#2B7CC1",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Our Work", href: "/our-work" },
                { label: "FAQs", href: "/faqs" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{ color: "#4A5568", textDecoration: "none" }}
                    className="text-sm transition-colors duration-200 hover:text-[#1A202C] flex items-center gap-2 group"
                  >
                    <span
                      style={{ backgroundColor: "#2B7CC1" }}
                      className="inline-block w-3 h-px group-hover:w-4 transition-all duration-200 shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-5">
            <h3
              style={{
                color: "#2B7CC1",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Kitchen Remodeling", href: "/kitchen-remodeling" },
                { label: "Bathroom Remodeling", href: "/bathroom-remodeling" },
                { label: "Complete Interior Remodeling", href: "/complete-interior-home-remodeling" },
                { label: "Flooring Installation", href: "/flooring-installation" },
                { label: "Painting", href: "/painting" },
                { label: "Countertops & Cabinetry", href: "/services" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{ color: "#4A5568", textDecoration: "none" }}
                    className="text-sm transition-colors duration-200 hover:text-[#1A202C] flex items-center gap-2 group"
                  >
                    <span
                      style={{ backgroundColor: "#2B7CC1" }}
                      className="inline-block w-3 h-px group-hover:w-4 transition-all duration-200 shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Service Areas */}
          <div className="flex flex-col gap-5">
            <h3
              style={{
                color: "#2B7CC1",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Service Areas
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                "Oldsmar, FL",
                "Clearwater",
                "Palm Harbor",
                "Safety Harbor",
                "Tampa",
                "Dunedin",
                "St. Petersburg",
                "Tarpon Springs",
                "Largo",
                "Pinellas County",
                "Hillsborough County",
              ].map((area) => (
                <li
                  key={area}
                  style={{ color: "#4A5568" }}
                  className="text-sm flex items-center gap-2"
                >
                  <span
                    style={{ backgroundColor: "#2B7CC1" }}
                    className="inline-block w-1 h-1 rounded-full shrink-0"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#EEF0F4" }} className="px-6 py-5 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left: copyright */}
          <p style={{ color: "#9CA3AF", fontSize: "11px" }}>
            &copy; 2025 Crafted Kitchen and Bath. All rights reserved.
          </p>

          {/* Center: legal links */}
          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              style={{ color: "#9CA3AF", fontSize: "11px", textDecoration: "none" }}
              className="transition-colors duration-200 hover:text-[#1A202C]"
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(0,0,0,0.2)", fontSize: "11px" }}>|</span>
            <Link
              href="/terms-and-conditions"
              style={{ color: "#9CA3AF", fontSize: "11px", textDecoration: "none" }}
              className="transition-colors duration-200 hover:text-[#1A202C]"
            >
              Terms and Conditions
            </Link>
          </div>

          {/* Right: license note */}
          <p style={{ color: "#9CA3AF", fontSize: "11px" }}>
            Licensed Contractor CRC1333143 &nbsp;|&nbsp; Serving Pinellas &amp; Hillsborough County
          </p>
        </div>
      </div>
    </footer>
  );
}
