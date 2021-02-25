import type { NextApiRequest, NextApiResponse } from 'next'
import ReactDOMServer from 'react-dom/server'
import sharp from 'sharp'

import { male, female, beige } from 'global_styles/colors'
import DotSwarm from 'components/_shared/DotSwarm/DotSwarm'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // the type of the query is not validated
  // so a invalid query will ressult in undefined behavior
  const { format, count } = req.query as {
    count: string
    format?: 'png' | 'svg'
  }

  const dotSwarm = <DotSwarm count={parseInt(count)} />
  const svg = Buffer.from(ReactDOMServer.renderToString(dotSwarm))

  if (format === 'svg') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(svg)
    res.end()
  } else {
    const png = await sharp(svg).flatten({ background: beige }).png().toBuffer()

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.send(png)
    res.end()
  }
}
