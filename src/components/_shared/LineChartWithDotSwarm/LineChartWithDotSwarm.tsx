import React, { useRef, useMemo } from 'react'
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

interface Props {
  width?: number
  height?: number
  values: number[]
  color?: string
  animationProgress?: number
  showInfoText: boolean
  onYearSelect: (year: number) => void
  formatX?: (idx: number) => string
  limit?: (maxY: number) => number
}
const LineChartWithDotSwarm: React.FC<Props> = ({
  width = 600,
  height = 350,
  values,
  color = colors.blue,
  animationProgress = 1,
  limit = (max) => max + 30,
  formatX = (idx) => `${idx}`,
  ...props
}) => {
  const svgLineRef = useRef(null)
  const padding = { top: 60, right: 75, bottom: 40, left: 75, legend: 20 }

  // setup scales
  const max = getMax(values)
  const x = useMemo(
    () =>
      scaleLinear()
        .domain([0, values.length])
        .range([padding.left, width - padding.right]),
    [values, padding.left, padding.right, width]
  )
  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, limit(max)])
        .range([height - padding.bottom, padding.top]),
    [max, limit, padding.bottom, padding.top, height]
  )

  // setup line generator
  const historyLine = lineGenerator<Point>()
    .curve(curveMonotoneX)
    .x((d) => x(d[0]) || 0)
    .y((d) => y(d[1]) || 0)

  const currentIndex = Math.round((values.length - 1) * animationProgress)
  const currentValue = values[currentIndex]
  const firstValue = values[0]

  const linePath = svgLineRef.current as any
  const lineLength = linePath
    ? linePath.getTotalLength()
    : Number.MAX_SAFE_INTEGER
  const lineEndPoint = linePath
    ? linePath.getPointAtLength(lineLength * animationProgress)
    : { x: x(currentIndex), y: y(currentValue) }

  const firstTextOffset = Math.sqrt(firstValue) * 2.8 + 15
  const lastTextOffset = Math.sqrt(currentValue) * 2.8 + 15

  return (
    <svg className={_.svg} viewBox={`0 0 ${width} ${height}`}>
      <path
        d={historyLine(values.map((value, idx) => [idx, value])) || ''}
        ref={svgLineRef}
        stroke={color}
        // hack to aniname line drawing:
        strokeDasharray={`${lineLength} ${lineLength}`}
        strokeDashoffset={lineLength - lineLength * animationProgress}
      />

      {animationProgress === 1 && (
        <RawDotSwarm
          count={firstValue}
          position={{ x: x(0) || 0, y: y(firstValue) || 0 }}
          dotProps={() => ({ r: 1, fill: color })}
        />
      )}
      <RawDotSwarm
        count={currentValue}
        position={{ x: lineEndPoint.x, y: lineEndPoint.y }}
        dotProps={() => ({ r: 1, fill: color })}
      />

      {animationProgress === 1 && (
        <text
          className={_.fadeText}
          x={(x(0) || 0) - 15}
          y={(y(firstValue) || 0) + firstTextOffset}
          textAnchor='middle'
        >
          {firstValue}
        </text>
      )}
      <text
        x={lineEndPoint.x + 15}
        y={lineEndPoint.y + lastTextOffset}
        textAnchor='middle'
      >
        {currentValue}
      </text>

      <line
        x1={x(0) || 0 - 30}
        y1={y(0)}
        x2={x(values.length) || 0 + 30}
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
                props.onYearSelect(idx)
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
            durch die Jahre um die
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
