import { postBySlugQuery } from '@/lib/queries'
import { previewClient } from '@/lib/sanity-server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const post = await previewClient.fetch(postBySlugQuery, {
    slug: req.query.slug
  })

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({})
  res.writeHead(307, { Location: `/posts/${post.slug}` })
  res.end()
}
