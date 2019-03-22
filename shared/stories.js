import React, { Fragment } from 'react'

import { storiesOf } from '@storybook/react'

import BalanceGauge from './components/BalanceGauge/BalanceGauge'

storiesOf('BalanceGauge', module)
  .add('Basic', () => <Fragment>
    <div>
      <BalanceGauge
        ratio={0}
        text={ratio => `A gauge with a ratio of ${ratio}`} />
    </div>
    <div>
      <BalanceGauge
        ratio={0.3}
        text={ratio => `A gauge with a ratio of ${ratio}`} />
    </div>
    <div>
      <BalanceGauge
        ratio={1}
        text={ratio => `A gauge with a ratio of ${ratio}`} />
    </div>
  </Fragment>)
