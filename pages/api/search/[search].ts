import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../lib'

import { query } from '../../../lib'

type PostByIDResponse = Post

export default async (
  req: NextApiRequest,
  res: NextApiResponse<PostByIDResponse>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')
console.log(req.query.search)
  if (!req.query.search) return res.status(422).end('Unprocessable entity')
  req.query.search = '%'+req.query.search+'%';
  try {
    
    const data: any = await query({
      query: 'SELECT * FROM data.posts WHERE title LIKE ?;',
      values: [req.query.search],
    })
    console.log(data);
    return res.status(200).json(data)
  } catch (e: any) {
    return res.status(500).end(e)
  }
  
}



//query: 'SELECT * FROM data.posts WHERE CONTAINS (*, ?)',