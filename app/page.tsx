import { getClient } from '../lib/sanity-server'
import { postQuery } from '../lib/queries'

export type Post = {
  _id: string
  slug: string
  content: string
  title: string
  date: string
}

const getData = async (preview = false) => {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: 'new-post'
  })
  return post
}

export default async function Home() {
  const post: Post = await getData()
  return (
    <div className="px-5 py-10">
      <div className="text-4xl mb-3">{post.title}</div>
      <div className="text-xl">{post.content}</div>
      <div className="text-xl">{new Date(post.date).toLocaleString()}</div>
    </div>
  )
}
