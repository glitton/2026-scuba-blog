import { MetadataRoute } from 'next'
import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '')

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post: Blog & { startYear?: number }) => {
      const year = String(post.startYear ?? new Date(post.date).getFullYear())
      return {
        url: `${siteUrl}/stories/${year}/${post.slug}`,
        lastModified: post.lastmod || post.date,
      }
    })

  const routes = ['', 'stories', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
