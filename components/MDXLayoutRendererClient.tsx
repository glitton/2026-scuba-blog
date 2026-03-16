'use client'
import dynamic from 'next/dynamic'

// dynamic loader that picks the correct export at runtime
const loader = async () => {
  const m = await import('pliny/mdx-components')
  // try named export, then fallback to a known property, otherwise null
  
  return (m as any).MDXLayoutRenderer || (m as any).render || (() => null)
}

const MDXLayoutRenderer = dynamic(() => loader(), { ssr: false })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MDXLayoutRendererClient(props: any) {
  return <MDXLayoutRenderer {...props} />
}
