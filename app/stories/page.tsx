import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Stories' })

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const { page } = await searchParams
  const pageNumber = page ? parseInt(page) : 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      path={`/stories?page=${pageNumber}`}
    />
  )
}
