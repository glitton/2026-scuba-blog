import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

type Params = { year: string; slug: string }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const { year, slug } = (await params) as Params
  const slugDec = decodeURI(slug)
  const post = allBlogs.find(
    (p) => String(p.startYear ?? new Date(p.date).getFullYear()) === year && p.slug === slugDec
  )
  if (!post) {
    return
  }

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const slugOnly = String(post.slug).includes('/') ? post.slug.split('/').pop() : post.slug
  const canonical = `https://blog.glcodeworks.com/stories/${year}/${slugOnly}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: canonical,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
    alternates: {
      canonical,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => {
    const year = String(p.startYear ?? new Date(p.date).getFullYear())
    const rawSlug = String(p.slug)
    const slug = rawSlug.includes('/') ? rawSlug.split('/').pop()! : rawSlug
    return { year, slug }
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: { params: any }) {
  const { year, slug } = (await params) as Params
  const slugDec = decodeURI(slug)

  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))

  const normalizeSlug = (raw: string) => (raw.includes('/') ? raw.split('/').pop()! : raw)

  const postIndex = sortedCoreContents.findIndex((p) => {
    const pYear = String(p.startYear ?? new Date(p.date).getFullYear())
    const pSlug = normalizeSlug(String(p.slug))
    return pYear === year && pSlug === slugDec
  })

  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]

  const post = allBlogs.find((p) => {
    const pYear = String(p.startYear ?? new Date(p.date).getFullYear())
    const pSlug = normalizeSlug(String(p.slug))
    return pYear === year && pSlug === slugDec
  }) as Blog

  if (!post) return notFound()

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData || {}
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  console.log('post debug', {
    title: post.title,
    slug: post.slug,
    hasBody: !!post.body,
    bodyKeys: Object.keys(post.body || {}),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
