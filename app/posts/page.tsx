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
    <div className="">
      <h1 className="text-3xl">All posts available</h1>
      <div className="flex flex-col gap-6 mt-12 mx-auto w-full max-w-[424px]">
        {posts.map(post => (
          <div key={post._id} className="border px-6 py-4 rounded-md">
            <Link href={`/posts/${post.slug}`}>
              <h1 className="text-xl font-bold">{post.title}</h1>
            </Link>
            <p className="text-right mt-2">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
