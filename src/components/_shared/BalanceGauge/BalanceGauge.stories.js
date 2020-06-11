import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import BalanceGauge from './BalanceGauge'

storiesOf('II Components/BalanceGauge', module)
  .addDecorator(withKnobs)
  .add('Low ratio', () =>
    <BalanceGauge
      ratio={0}
      text={ratio => `A gauge with a ratio of ${ratio}`} />
  )
  .add('Medium ratio', () =>
    <BalanceGauge
      ratio={0.3}
      text={ratio => `A gauge with a ratio of ${ratio}`} />
  )
  .add('High ratio', () =>
    <BalanceGauge
      ratio={1}
      text={ratio => `A gauge with a ratio of ${ratio}`} />
  )
