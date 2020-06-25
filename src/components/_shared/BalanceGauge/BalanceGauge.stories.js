import React from 'react'

import BalanceGauge from './BalanceGauge'

export default {
  component: BalanceGauge,
  title: 'II Components/BalanceGauge'
}

export const MediumRatio = () =>
  <BalanceGauge
    ratio={0.3}
    text={ratio => `A gauge with a ratio of ${ratio}`} />

export const lowRatio = () =>
  <BalanceGauge
    ratio={0}
    text={ratio => `A gauge with a ratio of ${ratio}`} />

export const highRatio = () =>
  <BalanceGauge
    ratio={1}
    text={ratio => `A gauge with a ratio of ${ratio}`} />
