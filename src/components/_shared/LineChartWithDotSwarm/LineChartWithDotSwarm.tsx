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
  width: number
  height: number
  values: number[]
  color: string
  animationProgress: number
  showInfoText: boolean
  onYearSelect: (year: number) => void
  limit?: (maxY: number) => number
}
const LineChartWithDotSwarm: React.FC<Props> = ({
  limit = (max) => max + 30,
  ...props
}) => {
  const svgLineRef = useRef(null)
  const padding = { top: 60, right: 75, bottom: 40, left: 75, legend: 20 }

  // setup scales
  const max = getMax(props.values)
  const x = useMemo(
    () =>
      scaleLinear()
        .domain([0, props.values.length])
        .range([padding.left, props.width - padding.right]),
    [props.values, padding.left, padding.right, props.width]
  )
  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, limit(max)])
        .range([props.height - padding.bottom, padding.top]),
    [max, limit, padding.bottom, padding.top, props.height]
  )

  // setup line generator
  const historyLine = lineGenerator<Point>()
    .curve(curveMonotoneX)
    .x((d) => x(d[0]) || 0)
    .y((d) => y(d[1]) || 0)

  const currentIndex = Math.round(
    (props.values.length - 1) * props.animationProgress
  )
  console.log(props.animationProgress, currentIndex)
  const currentValue = props.values[currentIndex]
  const firstValue = props.values[0]

  const linePath = svgLineRef.current as any
  const lineLength = linePath
    ? linePath.getTotalLength()
    : Number.MAX_SAFE_INTEGER
  const lineEndPoint = linePath
    ? linePath.getPointAtLength(lineLength * props.animationProgress)
    : { x: x(currentIndex), y: y(currentValue) }

  const firstTextOffset = Math.sqrt(firstValue) * 2.8 + 15
  const lastTextOffset = Math.sqrt(currentValue) * 2.8 + 15

  return (
    <svg className={_.svg} viewBox={`0 0 ${props.width} ${props.height}`}>
      <path
        d={historyLine(props.values.map((value, idx) => [idx, value])) || ''}
        ref={svgLineRef}
        stroke={props.color}
        // hack to aniname line drawing:
        strokeDasharray={`${lineLength} ${lineLength}`}
        strokeDashoffset={lineLength - lineLength * props.animationProgress}
      />

      {props.animationProgress === 1 && (
        <RawDotSwarm
          count={firstValue}
          position={{ x: x(0) || 0, y: y(firstValue) || 0 }}
          dotProps={() => ({ r: 1, fill: props.color })}
        />
      )}
      <RawDotSwarm
        count={currentValue}
        position={{ x: lineEndPoint.x, y: lineEndPoint.y }}
        dotProps={() => ({ r: 1, fill: props.color })}
      />

      {props.animationProgress === 1 && (
        <text
          className={_.fadeText}
          x={x(0) || 0 - 15}
          y={y(firstValue) || 0 + firstTextOffset}
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
        x2={x(props.values.length) || 0 + 30}
        y2={y(0)}
        stroke={colors.darkGrey}
        strokeWidth='1'
      />

      {props.values.map((value, idx) => {
        const xPos = x(idx)
        const yPos = props.height - 20
        const rotate = props.width < breakpoints.small ? 45 : 0
        const textAnchor = props.width < breakpoints.small ? 'start' : 'middle'
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
              {idx}
            </text>
          </g>
        )
      })}
      {props.showInfoText && props.animationProgress === 1 && (
        <text y={props.height - 115} className={_.infoText} textAnchor='end'>
          <tspan x={props.width - 55} dy='1.2em'>
            Klicken Sie sich
          </tspan>
          <tspan x={props.width - 55} dy='1.2em'>
            durch die Jahre um die
          </tspan>
          <tspan x={props.width - 55} dy='1.2em'>
            einzelnen Werte zu sehen.
          </tspan>
        </text>
      )}
    </svg>
  )
}

export default LineChartWithDotSwarm
