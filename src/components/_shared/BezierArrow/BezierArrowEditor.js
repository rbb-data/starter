import { useRef, useState } from 'react'

import { useDrag } from '@use-gesture/react'

import _ from './BezierArrowEditor.module.sass'

const LARGE_VALUE = 100000

function DraggableCircle({ coords, handleDrag, className = '', ...rest }) {
  const ref = useRef()
  useDrag(handleDrag, { target: ref })
  return (
    <circle
      className={className}
      ref={ref}
      cx={coords[0]}
      cy={coords[1]}
      {...rest}
    />
  )
}

function ArrowHead({ className, curvePath, coords, rotation, length }) {
  return (
    <g>
      {[1, -1].map((direction) => (
        <path
          className={className}
          transform={`rotate(${direction * rotation} ${coords.join(' ')})`}
          style={{ strokeDasharray: [length, LARGE_VALUE].join(' ') }}
          d={curvePath}
        />
      ))}
    </g>
  )
}

const constructCurve = (
  startCoords,
  endCoords,
  startBezierHandle,
  endBezierHandle
) => [
  'M',
  `${startCoords}`,
  'C',
  `${startBezierHandle}`,
  `${endBezierHandle}`,
  `${endCoords}`
]

function BezierArrowEditor({
  initialStartCoords = [0, 0],
  initialEndCoords = [60, 60],
  initialStartBezierHandle = [0, 40],
  initialEndBezierHandle = [20, 60],
  translateX = 0,
  translateY = 0,
  drawArrowHead = true,
  arrowHeadAnchor = 'end', // one of 'start', 'end', 'both'
  arrowHeadLength = 10,
  arrowHeadRotation = 30
}) {
  const [startCoords, setStartCoords] = useState(initialStartCoords)
  const [endCoords, setEndCoords] = useState(initialEndCoords)
  const [startBezierHandle, setStartBezierHandle] = useState(initialStartBezierHandle)
  const [endBezierHandle, setEndBezierHandle] = useState(initialEndBezierHandle)

  function handleDrag(setCoords) {
    return ({ event, active, last }) => {
      if (active) setCoords([event.clientX - translateX, event.clientY - translateY])
      if (last) console.log(startCoords, startBezierHandle, endBezierHandle, endCoords)
    }
  }

  const curve = constructCurve(startCoords, endCoords, startBezierHandle, endBezierHandle)
  const invertCurve = constructCurve(endCoords, startCoords, endBezierHandle, startBezierHandle)

  return (
    <g className={_.editor}>
      {/* Connect start/end points with bezier curve handles */}
      <line
        className={_.connector}
        x1={startCoords[0]}
        y1={startCoords[1]}
        x2={startBezierHandle[0]}
        y2={startBezierHandle[1]}
      />
      <line
        className={_.connector}
        x1={endCoords[0]}
        y1={endCoords[1]}
        x2={endBezierHandle[0]}
        y2={endBezierHandle[1]}
      />

      {/* Bezier curve */}
      <path
        className={_.curve}
        d={curve.join(' ')}
      />

      {/* Arrow heads */}
      {drawArrowHead && ['start', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          className={_.curve}
          curvePath={curve.join(' ')}
          coords={startCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}
      {drawArrowHead && ['end', 'both'].includes(arrowHeadAnchor) && (
        <ArrowHead
          className={_.curve}
          curvePath={invertCurve.join(' ')}
          coords={endCoords}
          rotation={arrowHeadRotation}
          length={arrowHeadLength}
        />
      )}

      {/* Start and end points */}
      <DraggableCircle
        className={_.startEnd}
        coords={startCoords}
        handleDrag={handleDrag(setStartCoords)}
        r="8"
      />
      <DraggableCircle
        className={_.startEnd}
        coords={endCoords}
        handleDrag={handleDrag(setEndCoords)}
        r="8"
      />

      {/* Bezier curve handles for start and end point */}
      <DraggableCircle
        className={_.handle}
        coords={startBezierHandle}
        handleDrag={handleDrag(setStartBezierHandle)}
        r="6"
      />
      <DraggableCircle
        className={_.handle}
        coords={endBezierHandle}
        handleDrag={handleDrag(setEndBezierHandle)}
        r="6"
      />
    </g>
  )
}

export default BezierArrowEditor
