import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Chroma from 'chroma-js'
import rbbColors from 'global_styles/colors.sass'
import _ from './ValueOnGradientBar.module.sass'

const ValueOnGradientBar = props => {
  const {
    highlightedValue, maxValue, threshold,
    showThreshold, greyOutBelowThreshold,
    className,
    colorScale, unit,
    canvasHeight: realCanvasHeight, barHeight: realBarHeight
  } = props

  const thresholdPosition = threshold / maxValue * 100
  const valuePosition = highlightedValue / maxValue * 100

  const canvas = useRef(null)

  useEffect(() => {
    function drawGradientBar () {
      const canvasHeight = realCanvasHeight * 2
      const barHeight = realBarHeight * 2
      const barTopOffset = canvasHeight - barHeight

      const ctx = canvas.current.getContext('2d')
      const width = canvas.current.clientWidth * 2

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
      if (showThreshold) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.moveTo(normalizedThreshold, barTopOffset)
        ctx.lineTo(normalizedThreshold, canvasHeight)
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.globalCompositeOperation = 'source-over'
      }

      // draw station indicator
      if (!hasHighlightedValue) return

      ctx.beginPath()
      ctx.fillColor = 'black'
      ctx.moveTo(normalizedHighligedValue, 0)
      ctx.lineTo(normalizedHighligedValue, canvasHeight)
      ctx.lineWidth = 2
      ctx.stroke()
    }

    drawGradientBar()
  })

  return <div className={`${_.gradientBar} ${className}`}>
    { highlightedValue &&
      <output className={_.highlightedValue} style={{ left: `${valuePosition}%` }}>
        {highlightedValue} {unit}
      </output>
    }

    <canvas ref={canvas} id='gradientBar' className={_.canvas} />
    <div className={_.ticks}>
      <p htmlFor='gradientBar' className={`${_.tick} ${_.first}`} style={{ left: 0 }}>
        0
      </p>
      {showThreshold &&
        <p htmlFor='gradientBar' className={_.tick} style={{ left: `${thresholdPosition}%` }}>
          { threshold }
          <span className={_.moreInfo}>(Grenzwert)</span>
        </p>
      }
      <p htmlFor='gradientBar' className={`${_.tick} ${_.last}`} style={{ left: '100%' }}>
        { maxValue }
      </p>
    </div>
  </div>
}

ValueOnGradientBar.propTypes = {
  className: PropTypes.string,
  highlightedValue: PropTypes.number,
  maxValue: PropTypes.number,
  canvasHeight: PropTypes.number,
  barHeight: PropTypes.number,
  unit: PropTypes.string,
  threshold: PropTypes.number,
  showThreshold: PropTypes.bool,
  greyOutBelowThreshold: PropTypes.bool,
  colorScale: PropTypes.func
}

ValueOnGradientBar.defaultProps = {
  maxValue: 100,
  unit: '',
  canvasHeight: 15,
  barHeight: 12,
  colorScale: Chroma.scale(['white', 'black']),
  showThreshold: true,
  greyOutBelowThreshold: false,
  threshold: 50
}

export default ValueOnGradientBar
