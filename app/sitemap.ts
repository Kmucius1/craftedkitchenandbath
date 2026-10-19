import type { MetadataRoute } from 'next'
import { serviceAreas } from '@/lib/service-areas'
import { servicePages } from '@/lib/service-pages'
import { blogArticles, articleDate } from '@/lib/blog-articles'

const BASE_URL = 'https://craftedkitchenandbath.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}/areas-of-service/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const newServicePages: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPosts: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(articleDate(a.slug)),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kitchen-remodeling`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bathroom-remodeling`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/complete-interior-home-remodeling`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/painting`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/flooring-installation`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/areas-of-service`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-work`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reviews`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quote`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/process`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/warranty`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...newServicePages,
    ...blogPosts,
    ...cityPages,
  ]
}
