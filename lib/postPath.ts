export function getPostPath(post: any): { path: string; year: string; slug: string } {
  const year = String(post.startYear ?? new Date(post.date).getFullYear())
  const raw = String(post.slug ?? post.path ?? post._raw?.flattenedPath ?? '')
  const slug = raw.includes('/') ? raw.split('/').pop()! : raw
  return { path: `/stories/${year}/${slug}`, year, slug }
}
