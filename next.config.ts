import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ],
  },
};

export default nextConfig;
