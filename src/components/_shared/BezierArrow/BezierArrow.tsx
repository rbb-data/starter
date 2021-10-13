import ArrowHead from './ArrowHead'

import { constructCurve } from './utils'
import { BezierCoords } from './types'

import _ from './BezierArrow.module.sass'

interface Props {
  coords: BezierCoords,
  drawArrowHead?: boolean,
  arrowHeadAnchor?: 'start' | 'end' | 'both',
  arrowHeadLength?: number,
  arrowHeadRotation?: number,
  className?: string
}

function BezierArrow({
  coords,
  drawArrowHead = true,
  arrowHeadAnchor = 'end',
  arrowHeadLength = 10,
  arrowHeadRotation = 30,
  className = ''
}: Props) {
  const curve = constructCurve(coords)
  const invertCurve = constructCurve({
    startCoords: coords.endCoords,
    endCoords: coords.startCoords,
    startBezierHandle: coords.endBezierHandle,
    endBezierHandle: coords.startBezierHandle
  })

  return (
    <g className={`${_.arrow} ${className}`}>
      {/* Bezier curve */}
      <path d={curve.join(' ')} />

      {/* Arrow heads */}
      {drawArrowHead && ['start', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          curvePath={curve.join(' ')}
          coords={coords.startCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}
      {drawArrowHead && ['end', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          curvePath={invertCurve.join(' ')}
          coords={coords.endCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}
    </g>
  )
}

export default BezierArrow
