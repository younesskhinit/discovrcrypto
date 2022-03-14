import type { NextApiRequest, NextApiResponse } from 'next'
import type { Category } from '../../lib'

import { query } from '../../lib'

type CategoriesResponse = Category[]

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CategoriesResponse>
) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')

  try {
    const data: any = await query({ query: `SELECT * FROM data.categories` })
    console.log(data)
    return res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    return res.status(500).end(e)
  }
}
