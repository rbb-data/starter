import React from 'react'
import Chroma from 'chroma-js'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import ValueOnGradientBar from './ValueOnGradientBar'

const no2ColorScale = Chroma.bezier(['#B6D61B', '70B50F', '#E2430D', 'E30F04', '000'])
  .scale()
  .domain([0, 100])
  .correctLightness()

storiesOf('ValueOnGradientBar', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('with default props', () =>
    <ValueOnGradientBar />
  )
  .add('with highlighted value', () =>
    <ValueOnGradientBar highlightedValue={10} unit='km/h' />
  )
  .add('with no2 gradient', () =>
    <ValueOnGradientBar
      threshold={40}
      highlightedValue={43}
      unit='µg/m³'
      colorScale={no2ColorScale} />
  )
