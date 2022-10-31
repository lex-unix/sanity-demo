'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

const Test = ({ name }: { name: string }) => <div>Hello {name}</div>

const components = {
  Test
}

export default function MDXRemoteWrapper(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={components} />
}
