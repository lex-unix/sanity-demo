import { getClient, sanityClient } from '@/lib/sanity-server'
import { postQuery, postSlugsQuery } from '@/lib/queries'
import type { Post } from '@/lib/types'
import { mdxToHtml } from '@/lib/mdx'
import PostItem from './mdx-remote-wrapper'

export const generateStaticParams = async () => {
  const paths: string[] = await sanityClient.fetch(postSlugsQuery)
  return paths.map(path => ({ slug: path }))
}

const getPost = async (slug: string, preview = false) => {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug
  })

  const html = await mdxToHtml(post.content)

  return {
    ...post,
    content: html
  }
}

export default async function PostPage({ params }: any) {
  const { slug } = params
  const post: Post = await getPost(slug)

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <PostItem {...post.content} />
    </div>
  )
}
