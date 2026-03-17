import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

type PostLike = CoreContent<Blog> & {
  startYear?: number
  _raw?: { flattenedPath?: string }
}

export function getPostPath(post: PostLike): { path: string; year: string; slug: string } {
  const year = String(post.startYear ?? new Date(post.date).getFullYear())
  const raw = String(post.slug ?? post.path ?? post._raw?.flattenedPath ?? '')
  const slug = raw.includes('/') ? raw.split('/').pop()! : raw
  return { path: `/stories/${year}/${slug}`, year, slug }
}
