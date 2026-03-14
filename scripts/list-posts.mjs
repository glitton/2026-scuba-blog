import path from 'path'
const gen = await import(path.resolve(process.cwd(), '.contentlayer', 'generated', 'index.mjs'))
const { allBlogs } = gen
console.log(
  allBlogs.map((p) => ({
    startYear: p.startYear ?? new Date(p.date).getFullYear(),
    slug: p.slug,
    flattenedPath: p._raw?.flattenedPath,
  }))
)
