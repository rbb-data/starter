import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import Chroma from 'chroma-js'
// import colors
import c from './StemAndLeafPlot.module.sass'

const StemAndLeafPlot = props => {
  const {
    items, highlightedItem,
    maxValue, threshold, numberOfSteps,
    className,
    colorScale,
    height, tickHeight, scaleHeight, scaleOffset, offset,
    selectOnMouseover,
    getValue, onSelectDot
  } = props

  const plot = items.sort((a, b) => getValue(a) - getValue(b))
    .reduce((plot, item) => {
      const normalizedPosition = getValue(item) / maxValue * numberOfSteps
      const pos = parseInt(normalizedPosition)
      if (!plot[pos]) plot[pos] = []
      plot[pos].push(item)
      return plot
    }, Array(numberOfSteps))

  const maxLeafCount = plot.reduce((max, curr) => curr.length > max ? curr.length : max, 0)

  const relativeScaleOffset = scaleOffset + tickHeight

  const graphWidth = 100
  const circleDiameter = graphWidth / numberOfSteps
  const circleRadius = circleDiameter / 2
  const plotHeight = maxLeafCount * circleDiameter
  const graphHeight = height || plotHeight + offset + relativeScaleOffset + scaleHeight
  const topOffset = graphHeight - relativeScaleOffset - scaleHeight

  const normalizedThreshold = threshold / maxValue * graphWidth - circleRadius
  const hasHighlightedValue = highlightedItem !== null

  let elements = []
  let highlightedValue = null

  plot.forEach((leafs, i) => {
    const currentLineHeight = plot[i].length * circleDiameter
    const lineTopOffset = topOffset - currentLineHeight + circleRadius

    leafs.forEach((item, j) => {
      const isHighlightedValue = hasHighlightedValue && highlightedItem === item
      const x = i * circleDiameter
      const y = j * circleDiameter + lineTopOffset
      const selectHandler = () => { onSelectDot({ item }) }

      const element = {
        type: 'circle',
        props: {
          cx: x,
          cy: y,
          r: isHighlightedValue ? circleRadius * 1.6 : circleRadius,
          stroke: isHighlightedValue ? 'black' : false,
          'stroke-width': 0.2,
          fill: colorScale(getValue(item)),
          onMouseEnter: (e) => {
            if (!selectOnMouseover) return e.preventDefault()
            selectHandler()
          },
          onClick: (e) => {
            if (selectOnMouseover) return e.preventDefault()
            selectHandler()
          }
        }
      }

      if (isHighlightedValue) {
        highlightedValue = element
      } else {
        elements.push(element)
      }
    })
  })

  // threshold indicator
  elements.push({
    type: 'line',
    props: {
      x1: normalizedThreshold,
      x2: normalizedThreshold,
      y1: 0,
      y2: graphHeight - tickHeight,
      stroke: 'black',
      'stroke-width': 0.2
    }
  })

  // highlighted value
  if (highlightedValue !== null) {
    elements.push({
      type: 'line',
      props: {
        x1: 50,
        y1: graphHeight + 0.3,
        x2: highlightedValue.props.cx,
        y2: highlightedValue.props.cy,
        stroke: 'white',
        'stroke-width': 0.6
      }
    })
    elements.push({
      type: 'line',
      props: {
        x1: 50,
        y1: graphHeight + 0.3,
        x2: highlightedValue.props.cx,
        y2: highlightedValue.props.cy,
        stroke: highlightedValue.props.fill,
        'stroke-width': 0.3
      }
    })
    elements.push(highlightedValue)
  }

  // ticks
  elements.push({
    type: 'text',
    value: 0,
    props: {
      x: 0,
      y: graphHeight - 1.1,
      'font-size': 1.7,
      'font-family': 'Interstate'
    }
  })

  elements.push({
    type: 'text',
    value: '40 (Grenzwert)',
    props: {
      style: { textAnchor: 'middle' },
      x: normalizedThreshold,
      y: graphHeight - 1.1,
      'font-size': 1.7,
      'font-family': 'Interstate'
    }
  })

  elements.push({
    type: 'text',
    value: 80,
    props: {
      style: { textAnchor: 'end' },
      x: 100,
      y: graphHeight - 1.1,
      'font-size': 1.7,
      'font-family': 'Interstate'
    }
  })

  const canvas = useRef(null)

  useEffect(() => {
    const drawGradient = () => {
      const scaleFactor = canvas.current.clientWidth / 100 * 2
      const offset = (relativeScaleOffset + tickHeight) * scaleFactor
      const relativeScaleHeight = scaleHeight * scaleFactor

      const ctx = canvas.current.getContext('2d')
      const height = relativeScaleHeight + offset
      const width = canvas.current.clientWidth * 2

      ctx.canvas.width = width
      ctx.canvas.height = height

      // draw gradient scale
      colorScale.colors(width).forEach((color, i) => {
        ctx.fillStyle = color
        ctx.fillRect(i, 0, 1, relativeScaleHeight)
      })
    }

    drawGradient()
  })

  return <div className={`${c.salPlot} ${className}`}>
    <div className={c.graph}>
      <svg className={c.svg} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
        { elements.map((element, i) => {
          switch (element.type) {
            case 'circle': return <circle key={i} {...element.props} />
            case 'line': return <line key={i} {...element.props} />
            case 'text': return <text key={i} {...element.props}>{element.value}</text>
          }
        }) }
      </svg>
      <canvas ref={canvas} id='sal-plot' className={c.canvas} />
    </div>
  </div>
}

StemAndLeafPlot.propTypes = {
  items: PropTypes.array.isRequired,
  highlightedItem: PropTypes.any,
  /** used to set the max Value of the scale */
  maxValue: PropTypes.number.isRequired,
  /** on how many branches are the values grouped
   *  set to same as maxValue to group to real numbers
   */
  numberOfSteps: PropTypes.number.isRequired,
  /** when set a line at that value will be drawn to indicate a threshold */
  threshold: PropTypes.number,
  className: PropTypes.string,
  /** Chromajs colorScale */
  colorScale: PropTypes.func,
  /** you can set a custom height for the graph */
  height: PropTypes.number,
  tickHeight: PropTypes.number,
  scaleHeight: PropTypes.number,
  /** offset from bottom of grpah to scale */
  scaleOffset: PropTypes.number,
  /** offset from top of graph to scale */
  offset: PropTypes.number,
  /** if set onSelectDot will be called when hovering over circle
   * otherwise onClick is used
   */
  selectOnMouseover: PropTypes.bool,
  /** get the value used to determine the position in the graph from the item */
  getValue: PropTypes.func,
  /** called when dot is "selected" see `selectOnMouseover` */
  onSelectDot: PropTypes.func
}

StemAndLeafPlot.defaultProps = {
  colorScale: Chroma.scale('OrRd'),
  maxValue: 100,
  numberOfSteps: 100,
  threshold: 50,
  height: undefined,
  offset: 1,
  tickHeight: 3,
  scaleOffset: 0.5,
  scaleHeight: 0.5,
  onSelectDot: () => {}
}

export default StemAndLeafPlot
