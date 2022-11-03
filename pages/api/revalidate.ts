import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { sanityClient } from '@/lib/sanity-server'
import { postUpdatedQuery } from '@/lib/queries'

export const config = {
  api: {
    bodyParser: false
  }
}

async function readBody(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Revalidating...')
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string
  const body = await readBody(req) // Read the body into a string
  console.log('body', body)
  console.log('signature', signature)
  console.log('env', process.env.SANITY_STUDIO_REVALIDATE_SECRET)
  if (
    !isValidSignature(
      body,
      signature,
      process.env.SANITY_STUDIO_REVALIDATE_SECRET as string
    )
  ) {
    res.status(401).json({ message: 'Invalid signature' })
    return
  }

  const { _id: id } = JSON.parse(body)
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ message: 'Invalid _id' })
  }

  try {
    const slug = await sanityClient.fetch(postUpdatedQuery, { id })
    await Promise.all([
      res.revalidate('/posts'),
      res.revalidate(`/posts/${slug}`)
    ])
    return res.status(200).json({ message: `Updated ${slug}` })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
