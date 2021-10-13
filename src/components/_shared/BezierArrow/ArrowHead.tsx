import React from 'react'

import { Coords } from './types'

const LARGE_VALUE = 100000

interface Props {
  curvePath: string,
  coords: Coords,
  rotation?: number,
  length?: number
}

function ArrowHead({
  curvePath,
  coords,
  rotation = 30,
  length = 10
}: Props) {
  return (
    <g>
      {[1, -1].map((direction) => (
        <path
          key={direction}
          transform={`rotate(${direction * rotation} ${coords.join(' ')})`}
          style={{ strokeDasharray: [length, LARGE_VALUE].join(' ') }}
          d={curvePath}
        />
      ))}
    </g>
  )
}

export default ArrowHead
