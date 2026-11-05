import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The signed-contract PDF embeds the logo, read from disk at runtime. Public
  // files are not bundled into server functions unless listed here.
  outputFileTracingIncludes: {
    "/api/contract/*": ["./public/logo.png"],
    "/api/contract/**/*": ["./public/logo.png"],
    "/contract/*": ["./public/logo.png"],
  },
  async redirects() {
    return [
      // One canonical host: www serves the same pages, so send it to the apex
      // instead of letting search engines index two copies of every URL.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.craftedkitchenandbath.com' }],
        destination: 'https://craftedkitchenandbath.com/:path*',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/kitchen',
        destination: '/kitchen-remodeling',
        permanent: true,
      },
      {
        source: '/bathroom',
        destination: '/bathroom-remodeling',
        permanent: true,
      },
      {
        source: '/flooring',
        destination: '/flooring-installation',
        permanent: true,
      },
      {
        source: '/interior-remodeling',
        destination: '/complete-interior-home-remodeling',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/faqs',
        permanent: true,
      },
      {
        source: '/area-of-service',
        destination: '/areas-of-service',
        permanent: true,
      },
      {
        source: '/blog-post',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services/walk-in-showers',
        destination: '/bathroom-remodeling',
        permanent: true,
      },
      {
        source: '/services/luxury-vinyl-plank-flooring',
        destination: '/flooring-installation',
        permanent: true,
      },
      {
        source: '/financing',
        destination: '/contact',
        permanent: true,
      },
      // Old craftedhomeimprovements.com (WordPress) pages. That domain
      // forwards here, so keep its team and careers URLs from 404ing.
      {
        source: '/_team-members/:path*',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/job-position/:path*',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'craftedkitchenandbath.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Supplier product photos in the catalog. Served through the image
      // optimizer so phones get a small WebP/AVIF instead of the full-size
      // original (keep in sync with OPTIMIZED_HOSTS in ProductCard).
      ...[
        'internationalwholesaletile.com',
        'www.msisurfaces.com',
        'cdn.msisurfaces.com',
        'topknobsupply.com',
        'www.cabinetparts.com',
        'static.homebydecor.com',
        'prod-uscd-product-files.s3.amazonaws.com',
      ].map((hostname) => ({ protocol: 'https' as const, hostname })),
      {
        // Blog post covers uploaded from DRYP Hub land in Vercel Blob storage.
        // The store subdomain is random, so match any of them rather than
        // pinning one that changes if the store is ever recreated.
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
