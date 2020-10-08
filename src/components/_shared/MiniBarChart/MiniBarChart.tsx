import React from 'react'
import { red, blue } from 'global_styles/colors'
import _ from './Histogram.module.sass'

interface Props {
  onClick: (e: number) => void
  values: number[]
  unit?: string
  maxValue?: number
  highlight?: number
  formatText?: (idx: number) => string
}
const MiniBarChart: React.FunctionComponent<Props> = (props) => {
  const max =
    props.maxValue ||
    props.values.reduce((max, val) => (val > max ? val : max), 0)
  const normalizedValues = props.values.map((val) => val / max)

  const textSize = 1
  const margin = 0.22
  const maxBarHeight = 5
  const height = maxBarHeight + 1.2

  const textStartIndex = props.unit ? 1 : -1

  return (
    <svg
      style={{
        height: '50px',
        width: 'auto',
        maxWidth: '100%',
      }}
      width={props.values.length}
      height={height}
      viewBox={`0 0 ${props.values.length} ${height}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {normalizedValues.map((val, i) => (
        <g key={i} onClick={() => props.onClick(i)}>
          <rect
            style={{ cursor: 'pointer' }}
            x={i + margin}
            y={maxBarHeight - val * maxBarHeight}
            width={1 - 2 * margin}
            height={val * maxBarHeight}
            fill={i === props.highlight ? red : blue}
          />
          {i > textStartIndex && i % 2 === 0 && (
            <text
              style={{ fontSize: `${textSize}px`, cursor: 'pointer' }}
              x={i + 0.5}
              y={maxBarHeight + 1.2}
              textAnchor='middle'
              fill={i === props.highlight ? red : blue}
            >
              {props.formatText!(i)}
            </text>
          )}
        </g>
      ))}
      {props.unit && (
        <text
          style={{ fontSize: `${textSize}px` }}
          x={0}
          y={maxBarHeight + 1.2}
          textAnchor='left'
          fill={blue}
        >
          {props.unit}
        </text>
      )}
    </svg>
  )
}

MiniBarChart.defaultProps = {
  formatText: (number: number) => '' + number,
}

export default MiniBarChart
