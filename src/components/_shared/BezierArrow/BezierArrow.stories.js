import React from 'react'
import BezierArrow from './BezierArrow'

export default {
  title: 'II Components/BezierArrow',
  component: BezierArrow,
}

export const Basic = () => {  
  const WIDTH = 80
  const HEIGHT = 80

  const COORDS = {
    startCoords: [10, 10],
    endCoords: [60, 60],
    startBezierHandle: [10, 40],
    endBezierHandle: [20, 60]
  }

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <BezierArrow coords={COORDS} />
    </svg>
  )
}

export const DoubleHeadedArrow = () => {
  const WIDTH = 80
  const HEIGHT = 80

  const COORDS = {
    startCoords: [10, 10],
    endCoords: [60, 60],
    startBezierHandle: [10, 40],
    endBezierHandle: [20, 60]
  }

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <BezierArrow
        coords={COORDS}
        arrowHeadAnchor="both"
      />
    </svg>
  )
}

export const WithWideArrowHead = () => {
  const WIDTH = 80
  const HEIGHT = 80

  const COORDS = {
    startCoords: [10, 10],
    endCoords: [60, 60],
    startBezierHandle: [10, 40],
    endBezierHandle: [20, 60]
  }

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <BezierArrow
        coords={COORDS}
        arrowHeadRotation="50"
      />
    </svg>
  )
}

