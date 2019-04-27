import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, optionsKnob, radios } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import StemAndLeafPlot from './StemAndLeafPlot'

const items = [
  { value: 0 },
  { value: 1 },
  { value: 1 },
  { value: 2 },
  { value: 2 },
  { value: 2 },
  { value: 3 },
  { value: 3 },
  { value: 9 }
]

storiesOf('StemAndLeafPlot', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('StemAndLeafPlot', () =>
    <StemAndLeafPlot
      items={items}
      getValue={item => item.value}
      maxValue={10}
      numberOfSteps={10}
    />
  )
