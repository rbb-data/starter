import React, { ReactElement, useEffect, useRef } from 'react'
import { Scale } from 'chroma-js'
import * as scales from 'global_styles/gradients'
// import colors
import c from './StemAndLeafPlot.module.sass'
interface StemAndLeafPlotProps<T> {
  items: T[]
  selectedItem?: T
  /** used to set the max Value of the scale */
  maxValue?: number
  /** on how many branches are the values grouped
   *  set to same as maxValue to group to real numbers
   */
  numberOfSteps?: number
  /** when set a line at that value will be drawn to indicate a threshold */
  threshold?: number
  className?: string
  /** Chromajs colorScale
   *  this compoent will set the domain of the scale from 0 to maxValue
   *  this is needed so the colors of the circles match the gradient from the canvas
   */
  colorScale?: Scale
  /** the height of the color gradient
   *  the unit of this value relative to the size of the svg
   */
  colorScaleHeight?: number
  fontSize?: number
  /** if set onSelectDot will be called when hovering over circle
   * otherwise onClick is used
   */
  selectOnMouseover?: boolean
  drawLineToSelectedItem?: boolean
  /** get the value used to determine the position in the graph from the item */
  getValue?: (item: T) => number
  /** called when dot is "selected" see `selectOnMouseover` */
  onSelectDot?: (item: T) => void
}
function StemAndLeafPlot<T>({
  colorScale: rawScale = scales.linear.cyanBlue,
  colorScaleHeight = 0.5,
  fontSize = 1,
  maxValue = 100,
  numberOfSteps = 100,
  selectOnMouseover = false,
  drawLineToSelectedItem = false,
  getValue = (item: T) =>
    typeof item === 'number' ? item : parseInt(`${item}`),
  onSelectDot = () => {},
  ...props
}: StemAndLeafPlotProps<T>): ReactElement {
  const colorScale = rawScale.domain([0, maxValue])

  const plot: T[][] = props.items
    .sort((a, b) => getValue(a) - getValue(b))
    .reduce((plot, item) => {
      const normalizedPosition = (getValue(item) / maxValue) * numberOfSteps
      const pos = Math.round(normalizedPosition)
      if (!plot[pos]) plot[pos] = []
      plot[pos].push(item)
      return plot
    }, Array(numberOfSteps))

  const maxLeafCount = plot.reduce(
    (max, curr) => (curr.length > max ? curr.length : max),
    0
  )

  // scale is drawn on canvas
  const labelsHeight = fontSize * 1.2
  const spacingBetweenScaleAndPlot = 0.5
  // canvas has labelsHeight as bottomSpacing
  // so we can just align svg and canvas on bottom line
  const canvasHeight =
    colorScaleHeight + labelsHeight + spacingBetweenScaleAndPlot

  const graphWidth = 100
  const circleDiameter = graphWidth / numberOfSteps
  const circleRadius = circleDiameter / 2
  const plotHeight = maxLeafCount * circleDiameter
  const graphHeight = plotHeight + canvasHeight
  const viewBox = { width: graphWidth + circleDiameter, height: graphHeight }

  const normalizedThreshold =
    props.threshold !== undefined
      ? (props.threshold / maxValue) * graphWidth - circleRadius
      : null
  const hasSelectedItem = props.selectedItem !== null

  interface CircleElement {
    type: 'circle'
    props: React.SVGProps<SVGCircleElement>
  }
  interface TextElement {
    type: 'text'
    value: string
    props: React.SVGProps<SVGTextElement>
  }
  interface LineElement {
    type: 'line'
    props: React.SVGProps<SVGLineElement>
  }
  type Element = CircleElement | TextElement | LineElement

  let elements: Element[] = []
  let highlightedValues: any[] = []

  plot.forEach((leafs, i) => {
    const currentLineHeight = plot[i].length * circleDiameter
    const rowStartY = plotHeight - currentLineHeight + circleRadius

    leafs.forEach((item, j) => {
      const isHighlightedValue = hasSelectedItem && props.selectedItem === item
      const x = i * circleDiameter + circleRadius
      const y = j * circleDiameter + rowStartY

      const element: CircleElement = {
        type: 'circle',
        props: {
          cx: x,
          cy: y,
          r: isHighlightedValue ? circleRadius * 1.6 : circleRadius,
          stroke: isHighlightedValue ? 'black' : undefined,
          strokeWidth: 0.2,
          fill: colorScale(getValue(item)).hex(),
          onMouseEnter: (e: { preventDefault: () => void }) => {
            if (!selectOnMouseover) return e.preventDefault()
            onSelectDot(item)
          },
          onClick: () => {
            onSelectDot(item)
          },
        },
      }

      if (isHighlightedValue) {
        highlightedValues.push(element)
      } else {
        elements.push(element)
      }
    })
  })

  if (normalizedThreshold !== null) {
    // threshold indicator
    elements.push({
      type: 'line',
      props: {
        x1: normalizedThreshold + circleRadius,
        x2: normalizedThreshold + circleRadius,
        y1: 0,
        y2: graphHeight - labelsHeight,
        stroke: 'black',
        strokeWidth: 0.2,
      },
    })
  }

  // highlighted value
  if (highlightedValues.length > 0) {
    if (drawLineToSelectedItem) {
      const dot = highlightedValues[highlightedValues.length - 1]
      elements.push({
        type: 'line',
        props: {
          x1: 50 + circleRadius,
          y1: graphHeight + 0.3,
          x2: dot.props.cx + circleRadius,
          y2: dot.props.cy,
          stroke: 'white',
          strokeWidth: 0.4,
        },
      })
      elements.push({
        type: 'line',
        props: {
          x1: 50 + circleRadius,
          y1: graphHeight + 0.3,
          x2: dot.props.cx + circleRadius,
          y2: dot.props.cy,
          stroke: dot.props.fill,
          strokeWidth: 0.2,
        },
      })
    }
    highlightedValues.forEach((dot) => elements.push(dot))
  }

  // ticks
  elements.push({
    type: 'text',
    value: '0',
    props: {
      x: 0,
      y: graphHeight,
      fontSize: fontSize,
      fontFamily: 'Interstate',
    },
  })

  if (normalizedThreshold !== null) {
    elements.push({
      type: 'text',
      value: `${props.threshold}`,
      props: {
        style: { textAnchor: 'middle' },
        x: normalizedThreshold + circleRadius,
        y: graphHeight,
        fontSize: fontSize,
        fontFamily: 'Interstate',
      },
    })
  }

  elements.push({
    type: 'text',
    value: `${maxValue}`,
    props: {
      style: { textAnchor: 'end' },
      x: 100 + circleDiameter,
      y: graphHeight,
      fontSize: fontSize,
      fontFamily: 'Interstate',
    },
  })

  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current === null) return
    const ctx = canvas.current.getContext('2d')
    if (ctx === null) return

    const scaleFactor = (canvas.current.clientWidth / viewBox.width) * 2
    const bottomSpacing = labelsHeight * scaleFactor
    const highResScaleHeight = colorScaleHeight * scaleFactor

    const height = highResScaleHeight + bottomSpacing
    const width = canvas.current.clientWidth * 2

    ctx.canvas.width = width
    ctx.canvas.height = height

    // draw gradient scale
    colorScale.colors(width).forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(i, 0, 1, highResScaleHeight)
    })
  })

  return (
    <div className={`${c.salPlot} ${props.className}`}>
      <div className={c.graph}>
        <svg
          className={c.svg}
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        >
          {elements.map((element, i) => {
            switch (element.type) {
              case 'circle':
                return <circle key={i} {...element.props} />
              case 'line':
                return <line key={i} {...element.props} />
              case 'text':
                return (
                  <text key={i} {...element.props}>
                    {element.value}
                  </text>
                )
              default:
                return null
            }
          })}
        </svg>
        <canvas ref={canvas} id='sal-plot' className={c.canvas} />
      </div>
    </div>
  )
}

export default StemAndLeafPlot
