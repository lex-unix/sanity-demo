import Link from 'next/link'

export default async function Home() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl text-center">
        Welcome to Next.js 13 and Sanity demo
      </h1>
      <Link href="/posts" className="text-center mt-10">
        Go to posts
      </Link>
    </div>
  )
}
