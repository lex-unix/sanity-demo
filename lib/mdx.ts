import { serialize } from 'next-mdx-remote/serialize'

export async function mdxToHtml(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      format: 'mdx'
    }
  })

  return mdxSource
}
