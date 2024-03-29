import React, { useRef, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { Handler, EventTypes } from '@use-gesture/core/types';
import { pointer } from 'd3-selection';

import BezierArrow from './BezierArrow';

import { constructCurve, mapCoords } from './utils';

import _ from './BezierArrowEditor.module.scss';

interface DraggableCircleProps {
  coords: [number, number];
  handleDrag: Handler<'drag', EventTypes['drag']>;
  className?: string;
  radius?: number;
}

function DraggableCircle({
  coords,
  handleDrag,
  className = '',
  radius = 5,
}: DraggableCircleProps) {
  const ref = useRef();
  useDrag(handleDrag, { target: ref });
  return (
    <circle
      className={`${_.draggable} ${className}`}
      ref={ref}
      cx={coords[0]}
      cy={coords[1]}
      r={radius}
    />
  );
}

interface Props {
  /** Reference to the element used as a reference point for position calculations */
  canvasRef?: {
    current: HTMLElement | SVGElement;
  };
  initialStartCoords?: [number, number];
  initialEndCoords?: [number, number];
  initialStartBezierHandle?: [number, number];
  initialEndBezierHandle?: [number, number];
  drawArrowHead?: boolean;
  arrowHeadAnchor?: 'start' | 'end' | 'both';
  arrowHeadLength?: number;
  arrowHeadRotation?: number;
  className?: string;
  /** Transforms x-values before writing to console
   * (e.g. if you work with a d3 scale, you might want to pass scale.invert
   * to provide domain values for the computed positions) */
  transformX?: (value: number) => number;
  /** Transforms y-values before writing to console
   * (e.g. if you work with a d3 scale, you might want to pass scale.invert
   * to provide domain values for the computed positions) */
  transformY?: (value: number) => number;
}

/**
 * This interactive editor allows to hand-craft Bezier arrows.
 *
 * To do so, add `BezierArrowEditor` to your graphic and adjust the position and
 * the shape of the curve as you like. If happy with your choices, check the console, copy the
 * provided object containing the relevant values and feed it into `BezierArrow`.
 */
function BezierArrowEditor({
  canvasRef,
  initialStartCoords = [10, 10],
  initialEndCoords = [60, 60],
  initialStartBezierHandle = [10, 40],
  initialEndBezierHandle = [20, 60],
  drawArrowHead = true,
  arrowHeadAnchor = 'end',
  arrowHeadLength = 10,
  arrowHeadRotation = 30,
  className = '',
  transformX,
  transformY,
}: Props) {
  const [startCoords, setStartCoords] = useState(initialStartCoords);
  const [endCoords, setEndCoords] = useState(initialEndCoords);
  const [startBezierHandle, setStartBezierHandle] = useState(
    initialStartBezierHandle
  );
  const [endBezierHandle, setEndBezierHandle] = useState(
    initialEndBezierHandle
  );

  const coords = { startCoords, endCoords, startBezierHandle, endBezierHandle };

  function handleDrag(setCoords) {
    return ({ event, active, last }) => {
      if (active) setCoords(pointer(event, canvasRef?.current));
      if (last) {
        // map to domain values if scales are given
        const mappedCoords = mapCoords(coords, transformX, transformY);

        console.log(
          'Copy this object by left-clicking on it and selecting "Copy Object", then paste it back into your code:',
          mappedCoords
        );
        console.log(
          [
            'Or use these values elsewhere:',
            `coords (start): ${mappedCoords.startCoords}`,
            `coords (end): ${mappedCoords.endCoords}`,
            `handle (start): ${mappedCoords.startBezierHandle}`,
            `handle (end): ${mappedCoords.endBezierHandle}`,
            `path: ${constructCurve(mappedCoords).join(' ')}`,
          ].join('\n')
        );
      }
    };
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
        coords={coords}
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
        radius={8}
      />
      <DraggableCircle
        className={_.startEnd}
        coords={endCoords}
        handleDrag={handleDrag(setEndCoords)}
        radius={8}
      />

      {/* Bezier curve handles for start and end point */}
      <DraggableCircle
        className={_.handle}
        coords={startBezierHandle}
        handleDrag={handleDrag(setStartBezierHandle)}
        radius={6}
      />
      <DraggableCircle
        className={_.handle}
        coords={endBezierHandle}
        handleDrag={handleDrag(setEndBezierHandle)}
        radius={6}
      />
    </g>
  );
}

export default BezierArrowEditor;
