import React, { useRef, useMemo, useEffect, useState } from 'react'
import { scaleLinear } from 'd3-scale'
import { line as lineGenerator, curveMonotoneX } from 'd3-shape'
import * as colors from 'global_styles/colors'
import * as breakpoints from 'global_styles/breakpoints'
import { RawDotSwarm } from '../DotSwarm/DotSwarm'
import _ from './_LineChartWithDotSwarm.module.sass'

type Point = [number, number]
export type Line = Point[]

function getMax(array: number[]): number {
  return array.reduce((max, next) => {
    if (next > max) return next
    return max
  }, Number.MIN_VALUE)
}

var getAnimationProgress = function (
  x: number,
  path: SVGPathElement | null,
  error = 0.01
): { animationProgress: number; lineLength: number } {
  if (!path) {
    return { animationProgress: 0, lineLength: Number.MAX_SAFE_INTEGER }
  }

  const lineLength = path.getTotalLength()
  const bisection_iterations_max = 50

  let length_end = lineLength
  let length_start = 0
  let point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
  let bisection_iterations = 0

  while (x < point.x - error || x > point.x + error) {
    // get the middle point
    point = path.getPointAtLength((length_end + length_start) / 2)

    if (x < point.x) {
      length_end = (length_start + length_end) / 2
    } else {
      length_start = (length_start + length_end) / 2
    }

    // Increase iteration
    if (bisection_iterations_max < ++bisection_iterations) break
  }

  let animationProgress = (length_end + length_start) / 2 / lineLength
  if (animationProgress > 1 - error) animationProgress = 1
  return { animationProgress, lineLength }
}

interface Props {
  width?: number
  height?: number
  values: number[]
  /** The index of the selected x value *this does dot need to be an integer and can be interpolated* */
  selected?: number
  color?: string
  showInfoText: boolean
  formatX?: (idx: number) => string
  limit?: (maxY: number) => number
  onSelect?: (index: number) => void
}
const LineChartWithDotSwarm: React.FC<Props> = ({
  width = 600,
  height = 350,
  values,
  selected = values.length - 1,
  color = colors.blue,
  limit = (max) => max + 30,
  formatX = (idx) => `${idx}`,
  onSelect = () => {},
  ...props
}) => {
  const [isInitialRender, setIsInitialRender] = useState(true)
  const svgLineRef = useRef<SVGPathElement>(null)
  const padding = { top: 60, right: 75, bottom: 40, left: 75, legend: 20 }
  const maxIndex = values.length - 1
  const currentIndex = Math.round(selected)

  // render twice initally so we are shure to have a ref to our svg path
  useEffect(() => {
    setIsInitialRender(false)
  }, [isInitialRender])

  // setup scales
  const max = getMax(values)
  const x = useMemo(
    () =>
      scaleLinear()
        .domain([0, maxIndex])
        .range([padding.left, width - padding.right]),
    [maxIndex, padding.left, padding.right, width]
  )
  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, limit(max)])
        .range([height - padding.bottom, padding.top]),
    [max, limit, padding.bottom, padding.top, height]
  )

  // setup line generator
  const historyLine = lineGenerator<number>()
    .curve(curveMonotoneX)
    .x((d, idx) => x(idx)!)
    .y((d) => y(d)!)

  const currentValue = values[currentIndex]
  const firstValue = values[0]

  const linePath = svgLineRef.current
  const { animationProgress, lineLength } = getAnimationProgress(
    x(selected)!,
    svgLineRef.current
  )

  const lineEndPoint = linePath
    ? linePath.getPointAtLength(lineLength * animationProgress)
    : { x: x(currentIndex), y: y(currentValue) }

  const firstTextOffset = Math.sqrt(firstValue) * 2.8 + 15
  const lastTextOffset = Math.sqrt(currentValue) * 2.8 + 15

  return (
    <svg className={_.svg} viewBox={`0 0 ${width} ${height}`}>
      <path
        d={historyLine(values) || ''}
        ref={svgLineRef}
        stroke={color}
        // hack to aniname line drawing:
        strokeDasharray={`${lineLength} ${lineLength}`}
        strokeDashoffset={lineLength - lineLength * animationProgress}
      />

      {animationProgress === 1 && (
        <RawDotSwarm
          count={firstValue}
          position={{ x: x(0)!, y: y(firstValue)! }}
          dotProps={() => ({ r: 1, fill: color })}
        />
      )}
      <RawDotSwarm
        count={currentValue}
        position={{ x: lineEndPoint.x!, y: lineEndPoint.y! }}
        dotProps={() => ({ r: 1, fill: color })}
      />

      {animationProgress === 1 && (
        <text
          className={_.fadeText}
          x={x(0)! - 15}
          y={y(firstValue)! + firstTextOffset}
          textAnchor='middle'
        >
          {firstValue}
        </text>
      )}
      <text
        x={lineEndPoint.x! + 15}
        y={lineEndPoint.y! + lastTextOffset}
        textAnchor='middle'
      >
        {currentValue}
      </text>

      <line
        x1={x(0)! - 30}
        y1={y(0)}
        x2={x(maxIndex)! + 30}
        y2={y(0)}
        stroke={colors.darkGrey}
        strokeWidth='1'
      />

      {values.map((value, idx) => {
        const xPos = x(idx)
        const yPos = height - 20
        const rotate = width < breakpoints.small ? 45 : 0
        const textAnchor = width < breakpoints.small ? 'start' : 'middle'
        const isCurrentValue = idx === currentIndex

        return (
          <g key={idx}>
            <circle
              cx={xPos}
              cy={y(0)}
              r={2}
              fill={isCurrentValue ? colors.red : colors.grey}
            />
            <text
              className={_.legend}
              fill={colors.grey}
              x={xPos}
              y={yPos}
              style={{
                fontWeight: isCurrentValue ? 'bold' : 'normal',
                fill: isCurrentValue ? colors.red : colors.darkGrey,
              }}
              transform={`rotate(${rotate} ${xPos} ${yPos})`}
              textAnchor={textAnchor}
              onClick={() => {
                onSelect(idx)
              }}
            >
              {formatX(idx)}
            </text>
          </g>
        )
      })}
      {props.showInfoText && animationProgress === 1 && (
        <text y={height - 115} className={_.infoText} textAnchor='end'>
          <tspan x={width - 55} dy='1.2em'>
            Klicken Sie sich
          </tspan>
          <tspan x={width - 55} dy='1.2em'>
            durch die x Achse um die
          </tspan>
          <tspan x={width - 55} dy='1.2em'>
            einzelnen Werte zu sehen.
          </tspan>
        </text>
      )}
    </svg>
  )
}

export default LineChartWithDotSwarm
