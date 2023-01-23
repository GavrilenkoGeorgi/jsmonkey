// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      res.status(200).json(result.slice(0, 10))
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
