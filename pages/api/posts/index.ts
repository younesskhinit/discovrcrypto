import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../lib'

import { query, db } from '../../../lib'

type PostsResponse = Post[]

export default async (
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  try {
    switch (!!req.query.category) {
      case true:
        const dataWithCategory: any = await query({
          query: `SELECT * FROM data.posts WHERE category=? ORDER BY id DESC`,
          values: [req.query.category],
        })
        console.log(dataWithCategory)
        return res.status(200).json(dataWithCategory)
      case false:
        const data: any = await query({
          query: `SELECT * FROM data.posts ORDER BY id DESC`,
        })
        console.log(data)
        return res.status(200).json(data)
    }
  } catch (e: any) {
    console.log(e)
    return res.status(500).end(e)
  }
}
