import React, { useMemo } from 'react'
import { forceSimulation, forceX, forceY } from 'd3-force'

type Point = [number, number]

/**
 * Creates an array of objects with x and y params positioned around a center in a phyllotaxis
 * @param width to calculate the horizontal center
 * @param height to calculate the vertical center
 * @param count number of dots to draw
 */
function createDotsCluster(
  width: number,
  height: number,
  count: number
): Point[] {
  const children: any[] = Array.from(Array(count).keys()).map(() => ({}))

  const simulation: any = forceSimulation(children)
    .stop()
    .force('x', forceX(0).strength(1.3))
    .force('y', forceY(0).strength(1.3))
    .tick(1)

  return simulation
    .nodes()
    .map((node: any) => [node.x + width / 2, node.y + height / 2])
}

export interface Props {
  width: number
  height: number
  count: number
  dotProps: (point: Point, idx: number) => React.SVGProps<SVGCircleElement>
}
const DotSwarm: React.FunctionComponent<Props> = (props) => {
  const dots = useMemo(
    () => createDotsCluster(props.width, props.height, props.count),
    [props.width, props.height, props.count]
  )

  return (
    <svg
      viewBox={`0 0 ${props.width} ${props.height}`}
      style={{ overflow: 'visible' }}
    >
      <g>
        {dots.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot[0]}
            cy={dot[1]}
            {...props.dotProps(dot, idx)}
          />
        ))}
      </g>
    </svg>
  )
}
export default DotSwarm
