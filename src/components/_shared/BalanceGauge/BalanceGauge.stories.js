import React from 'react'

import BalanceGauge from './BalanceGauge'

export default {
  component: BalanceGauge,
  title: 'II Components/BalanceGauge',
  args: {
    text: ratio => `A gauge with a ratio of ${ratio}`
  }
}

const Template = (args) => <BalanceGauge {...args} />

export const MediumRatio = Template.bind({})
export const LowRatio = Template.bind({})
export const HighRatio = Template.bind({})

MediumRatio.args = { ratio: 0.3 }
LowRatio.args = { ratio: 0 }
HighRatio.args = { ratio: 1 }
