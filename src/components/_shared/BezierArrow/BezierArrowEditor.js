import { useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'

import BezierArrow from './BezierArrow'

import _ from './BezierArrowEditor.module.sass'

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
  arrowHeadRotation = 30,
  className = '',
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

      {/* Bezier Curve with arrow heads */}
      <BezierArrow
        className={className}
        startCoords={startCoords}
        endCoords={endCoords}
        startBezierHandle={startBezierHandle}
        endBezierHandle={endBezierHandle}
        drawArrowHead={drawArrowHead}
        arrowHeadAnchor={arrowHeadAnchor}
        arrowHeadLength={arrowHeadLength}
        arrowHeadRotation={arrowHeadRotation}
      />

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
