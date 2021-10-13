import ArrowHead from './ArrowHead'

import { constructCurve } from './utils'

import _ from './BezierArrow.module.sass'

function BezierArrow({
  startCoords,
  endCoords,
  startBezierHandle,
  endBezierHandle,
  drawArrowHead = true,
  arrowHeadAnchor = 'end', // one of 'start', 'end', 'both'
  arrowHeadLength = 10,
  arrowHeadRotation = 30,
  className = ''
}) {
  const curve = constructCurve(startCoords, endCoords, startBezierHandle, endBezierHandle)
  const invertCurve = constructCurve(endCoords, startCoords, endBezierHandle, startBezierHandle)

  return (
    <g className={`${_.arrow} ${className}`}>
      {/* Bezier curve */}
      <path d={curve.join(' ')} />

      {/* Arrow heads */}
      {drawArrowHead && ['start', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          curvePath={curve.join(' ')}
          coords={startCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}
      {drawArrowHead && ['end', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          curvePath={invertCurve.join(' ')}
          coords={endCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}
    </g>
  )
}

export default BezierArrow
