import type { MetadataRoute } from 'next'

const defaultMetadataBase =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

const baseUrl = new URL(defaultMetadataBase)

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/projects', '/contact', '/storm-shelter']

  return routes.map((route) => ({
    url: new URL(route || '/', baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
