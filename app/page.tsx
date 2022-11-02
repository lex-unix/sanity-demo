import Link from 'next/link'

export default async function Home() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl text-center">
        Welcome to Next.js 13 and Sanity demo
      </h1>
      <button className="mt-6 md:mt-10">
        <Link
          href="/posts"
          className="text-center text-black px-4 py-2 bg-white rounded-2xl"
        >
          Go to posts
        </Link>
      </button>
    </div>
  )
}
