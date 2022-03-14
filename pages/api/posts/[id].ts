import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../lib'

import { query } from '../../../lib'

type PostByIDResponse = Post

export default async (
  req: NextApiRequest,
  res: NextApiResponse<PostByIDResponse>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  if (!req.query.id) return res.status(422).end('Unprocessable entity')

  try {
    const data: any = await query({
      query: 'SELECT * FROM data.posts WHERE id=?',
      values: [req.query.id],
    })
    return res.status(200).json(data[0])
  } catch (e: any) {
    return res.status(500).end(e)
  }
}
