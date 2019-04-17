import React, { Component } from  'react'
import Chroma from 'chroma-js'
import rbbColors from '@shared/styles/colors.sass'
import _ from './ValueOnGradientBar.sass'

export default class ValueOnGradientBar extends Component {
  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    unit: '',
    canvasHeight: 15,
    barHeight: 12,
    colorScale: Chroma.scale(['white', 'black']),
    greyOutBelowThreshold: false,
    threshold: 50
  }

  drawGradientBar = () => {
    const highlightedValue = this.props.highlightedValue
    const threshold = this.props.threshold
    const colorScale = this.props.colorScale
    const greyOutBelowThreshold = this.props.greyOutAfterThreshold
    const maxValue = this.props.maxValue
    const canvasHeight = this.props.canvasHeight * 2
    const barHeight = this.props.barHeight * 2
    const barTopOffset = canvasHeight - barHeight

    const ctx = this.canvas.getContext('2d')
    const width = this.canvas.clientWidth * 2

    const normalizedThreshold = threshold / maxValue * width
    const hasHighlightedValue = highlightedValue !== undefined
    const normalizedHighligedValue = highlightedValue !== undefined &&
      parseInt(highlightedValue / maxValue * width)

    ctx.canvas.width = width
    ctx.canvas.height = canvasHeight

    // draw gradient bar
    colorScale.colors(width).forEach((color, i) => {
      const isAboveThreshold = i >= parseInt(normalizedThreshold)
      const isColored = !greyOutBelowThreshold || isAboveThreshold

      ctx.fillStyle = isColored ? color : rbbColors.lightGrey
      ctx.fillRect(i, barTopOffset, 1, barHeight) // (x, y, width, height)
    })

    // draw threshold indicator
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.moveTo(normalizedThreshold, barTopOffset)
    ctx.lineTo(normalizedThreshold, canvasHeight)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'

    // draw station indicator
    if (!hasHighlightedValue) return

    ctx.beginPath()
    ctx.fillColor = 'black'
    ctx.moveTo(normalizedHighligedValue, 0)
    ctx.lineTo(normalizedHighligedValue, canvasHeight)
    ctx.lineWidth = 2
    ctx.stroke()
  }

  componentDidMount () { this.drawGradientBar() }
  componentDidUpdate () { this.drawGradientBar() }

  render (props) {
    const { highlightedValue, maxValue, threshold } = props
    const thresholdPosition = threshold / maxValue * 100
    const valuePosition = highlightedValue / maxValue * 100

    return <div class={`${_.gradientBar} ${props.class}`}>
      { highlightedValue &&
        <output class={_.highlightedValue} style={{ left: `${valuePosition}%` }}>
          {highlightedValue} {this.props.unit}
        </output>
      }

      <canvas ref={ref => { this.canvas = ref }} id='gradientBar' class={_.canvas} />
      <div class={_.ticks}>
        <p for='gradientBar' class={`${_.tick} ${_.first}`} style={{ left: 0 }}>
          0
        </p>
        <p for='gradientBar' class={_.tick} style={{ left: `${thresholdPosition}%` }}>
          { threshold }
          <span class={_.moreInfo}>(Grenzwert)</span>
        </p>
        <p for='gradientBar' class={`${_.tick} ${_.last}`} style={{ left: '100%' }}>
          { maxValue }
        </p>
      </div>
    </div>
  }
}
