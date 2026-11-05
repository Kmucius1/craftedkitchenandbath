import type { MetadataRoute } from 'next'
import { serviceAreas } from '@/lib/service-areas'
import { servicePages } from '@/lib/service-pages'
import { blogArticles, articleDate } from '@/lib/blog-articles'
import { getRemotePosts } from '@/lib/remote-blog'
import { DEMO_PRODUCTS } from '@/lib/designer/demo-data'

// Rebuilt hourly so posts published from DRYP Hub show up without a deploy.
export const revalidate = 3600

const BASE_URL = 'https://craftedkitchenandbath.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cityPages: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}/areas-of-service/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const newServicePages: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPosts: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(articleDate(a.slug)),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Posts published from DRYP Hub (the local guides above are listed separately).
  const localSlugs = new Set(blogArticles.map((a) => a.slug))
  const remotePosts: MetadataRoute.Sitemap = (await getRemotePosts())
    .filter((p) => !localSlugs.has(p.slug))
    .map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.published_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const productPages: MetadataRoute.Sitemap = DEMO_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/catalog/${p.id}`,
    changeFrequency: 'monthly',
    priority: 0.4,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kitchen-remodeling`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bathroom-remodeling`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/complete-interior-home-remodeling`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/painting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/flooring-installation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/areas-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/warranty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...newServicePages,
    ...blogPosts,
    ...remotePosts,
    ...cityPages,
    ...productPages,
  ]
}
