import React from 'react'
import Chroma from 'chroma-js'
import ValueOnGradientBar from './ValueOnGradientBar'

export default {
  title: 'II Components/ValueOnGradientBar',
  component: ValueOnGradientBar,
}

export const Basic = () => <ValueOnGradientBar />

export const WithHighlightedValue = () => (
  <ValueOnGradientBar highlightedValue={10} unit='km/h' />
)

export const WithNo2Gradient = () => {
  const no2ColorScale = Chroma.bezier([
    '#B6D61B',
    '70B50F',
    '#E2430D',
    'E30F04',
    '000',
  ])
    .scale()
    .domain([0, 100])
    .correctLightness()

  return (
    <ValueOnGradientBar
      threshold={40}
      highlightedValue={43}
      unit='µg/m³'
      colorScale={no2ColorScale}
    />
  )
}
