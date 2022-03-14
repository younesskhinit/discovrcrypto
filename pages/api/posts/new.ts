import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../lib'

import { query } from '../../../lib'

type NewPostResponse = Post

export default async (
  req: NextApiRequest,
  res: NextApiResponse<NewPostResponse>
) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')

  const { title, url, description, category } = req.body
  console.log(req.body)

  if (!title || !description || !category)
    return res.status(422).end('Unprocessable entity')

  try {
    const request: any = await query({
      query:
        'INSERT INTO data.posts (title, url, description, category, likes) VALUES (?,?,?,?, "")',
      values: [title, url || '', description, category],
    })
    try {
      const data: any = await query({
        query: 'SELECT * FROM data.posts WHERE id=?',
        values: [request.insertId],
      })
      return res.status(200).json(data[0])
    } catch (e: any) {
      return res.status(500).end(e)
    }
  } catch (e: any) {
    return res.status(500).end(e)
  }
}
