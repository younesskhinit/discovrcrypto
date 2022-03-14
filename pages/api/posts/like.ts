import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../lib'

import { query } from '../../../lib'

interface LikePostResponse {
  result: boolean
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<LikePostResponse>
) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')

  const { post, user } = req.body
  if (!post || !user) return res.status(422).end('Unprocessable entity')

  try {
    const postData: any = await query({
      query: 'SELECT likes FROM data.posts WHERE id=?',
      values: [post],
    })
    try {
      let likes: any[] = postData[0].likes ? postData[0].likes.split(',') : []
      console.log(likes)
      console.log(likes.includes(user))
      switch (likes.includes(user)) {
        case true:
          likes.splice(likes.indexOf(user), 1)
          break
        case false:
          likes.push(user)
          break
      }
      const data: any = await query({
        query: 'UPDATE data.posts SET likes=? WHERE id=?',
        values: [likes.join(','), post],
      })
      return res.status(200).json({ result: true })
    } catch (e: any) {
      return res.status(500).end(e)
    }
  } catch (e: any) {
    return res.status(500).end(e)
  }
}
