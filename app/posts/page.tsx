import Link from 'next/link'
import { getClient } from '@/lib/sanity-server'
import { indexQuery } from '@/lib/queries'
import type { Post } from '@/lib/types'

const getPosts = async (preview = false) => {
  const posts: Post[] = await getClient(preview).fetch(indexQuery)
  return posts
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <Link href={`/posts/${post.slug}`}>
            <h1 className="text-2xl">{post.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  )
}
