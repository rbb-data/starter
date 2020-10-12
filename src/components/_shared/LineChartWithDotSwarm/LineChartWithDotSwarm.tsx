import React, { useRef, useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { line as lineGenerator, curveMonotoneX } from 'd3-shape'
import { forceSimulation, forceX, forceY } from 'd3-force'
import * as colors from 'global_styles/colors'
import * as breakpoints from 'global_styles/breakpoints'
import _ from './_LineChartWithDotSwarm.module.sass'

type Point = [number, number]
type Line = Point[]

function createDotsCluster(count: number): Point[] {
  const children: any[] = Array.from(Array(count).keys()).map(() => ({}))

  const simulation: any = forceSimulation(children)
    .stop()
    .force('x', forceX(0).strength(1.45))
    .force('y', forceY(0).strength(1.45))
    .tick(1)

  return simulation.nodes().map((node: any) => [node.x, node.y])
}

function getMin(array: number[]): number {
  return array.reduce((min, next) => {
    if (next < min) return next
    return min
  }, Number.MAX_VALUE)
}

function getMax(array: number[]): number {
  return array.reduce((max, next) => {
    if (next > max) return next
    return max
  }, Number.MIN_VALUE)
}

interface Props {
  width: number
  height: number
  line: Line
  color: string
  animationProgress: number
  showInfoText: boolean
  onYearSelect: (year: number) => void
}
function LineChartWithDotSwarm(props: Props) {
  const svgLineRef = useRef(null)
  const padding = { top: 60, right: 75, bottom: 40, left: 75, legend: 20 }

  // setup scales
  const years = props.line.map((point) => point[0])
  const minYear = getMin(years)
  const maxYear = getMax(years)
  const maxCount = getMax(props.line.map((point) => point[1]))
  const domainPadding = 30

  const x = useMemo(
    () =>
      scaleLinear()
        .domain([minYear, maxYear])
        .range([padding.left, props.width - padding.right]),
    [minYear, maxYear, padding.left, padding.right, props.width]
  )
  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, maxCount + domainPadding])
        .range([props.height - padding.bottom, padding.top]),
    [maxCount, domainPadding, padding.bottom, padding.top, props.height]
  )

  // setup line generator
  const historyLine = lineGenerator<Point>()
    .curve(curveMonotoneX)
    .x((d) => x(d[0]) || 0)
    .y((d) => y(d[1]) || 0)

  const currentYearIndex = Math.round(
    (maxYear - minYear) * props.animationProgress
  )
  const currentYear = minYear + currentYearIndex
  const firstValue = props.line[0][1]
  const currentValue = props.line[currentYearIndex][1]
  const linePath = svgLineRef.current as any
  const lineLength = linePath ? linePath.getTotalLength() : 1000
  const lineEndPoint = linePath
    ? linePath.getPointAtLength(lineLength * props.animationProgress)
    : { x: x(10), y: y(currentValue) }

  const startDots = useMemo(() => createDotsCluster(firstValue), [firstValue])
  const endDots = useMemo(() => createDotsCluster(currentValue), [currentValue])

  const firstTextOffset = Math.sqrt(firstValue) * 2.8 + 15
  const lastTextOffset = Math.sqrt(currentValue) * 2.8 + 15

  return (
    <svg className={_.svg} viewBox={`0 0 ${props.width} ${props.height}`}>
      <path
        d={historyLine(props.line) || ''}
        ref={svgLineRef}
        stroke={props.color}
        // hack to aniname line drawing:
        strokeDasharray={`${lineLength} ${lineLength}`}
        strokeDashoffset={lineLength - lineLength * props.animationProgress}
      />

      {props.animationProgress === 1 && (
        <g
          className={_.startDots}
          style={{
            transform: `translate(${x(minYear)}px, ${y(firstValue)}px)`,
          }}
        >
          {startDots.map((dot, j) => (
            <circle key={j} cx={dot[0]} cy={dot[1]} r={1} fill={props.color} />
          ))}
        </g>
      )}
      <g
        style={{
          transform: `translate(${lineEndPoint.x}px, ${lineEndPoint.y}px)`,
        }}
      >
        {endDots.map((dot, j) => (
          <circle key={j} cx={dot[0]} cy={dot[1]} r={1} fill={props.color} />
        ))}
      </g>

      {props.animationProgress === 1 && (
        <text
          className={_.fadeText}
          x={x(minYear) || 0 - 15}
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
        x1={x(minYear) || 0 - 30}
        y1={y(0)}
        x2={x(maxYear) || 0 + 30}
        y2={y(0)}
        stroke={colors.darkGrey}
        strokeWidth='1'
      />

      {years.map((year) => {
        const xPos = x(year)
        const yPos = props.height - 20
        const rotate = props.width < breakpoints.small ? 45 : 0
        const textAnchor = props.width < breakpoints.small ? 'start' : 'middle'
        const isCurrentYear = year === currentYear
        return (
          <g key={year}>
            <circle
              cx={xPos}
              cy={y(0)}
              r={2}
              fill={isCurrentYear ? colors.red : colors.grey}
            />
            <text
              className={_.legend}
              fill={colors.grey}
              x={xPos}
              y={yPos}
              style={{
                fontWeight: isCurrentYear ? 'bold' : 'normal',
                fill: isCurrentYear ? colors.red : colors.darkGrey,
              }}
              transform={`rotate(${rotate} ${xPos} ${yPos})`}
              textAnchor={textAnchor}
              onClick={() => {
                props.onYearSelect(year)
              }}
            >
              {year}
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
