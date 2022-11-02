'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

interface ProfileProps {
  name: string
  email: string
  age: number
}

const Profile = ({ name, email, age }: ProfileProps) => (
  <div className="border px-4 py-2 rounded-md w-full max-w-[424px] mx-auto mb-[16px]">
    <h2 className="text-xl font-bold mb-5">
      {name} <span className="text-base font-normal">{age}</span>
    </h2>

    <a href={`mailto:${email}`} className="hover:text-blue-300">
      {email}
    </a>
  </div>
)

const components = {
  Profile
}

export default function MDXRemoteWrapper(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={components} />
}
