import React, { useState } from 'react'
import * as colors from 'global_styles/colors'
import { linear } from 'global_styles/gradients'

import DotSwarm from './DotSwarm'
import useAutoStepper from 'lib/hooks/useAutoStepper'

export default {
  title: 'II Components/DotSwarm',
  component: DotSwarm,
}

export const Basic = () => {
  return (
    <div style={{ width: '200px' }}>
      <DotSwarm
        width={200}
        height={200}
        count={500}
        dotProps={() => ({ r: 2, fill: colors.blue })}
      />
    </div>
  )
}

export const ColoredByIndex = () => {
  return (
    <div style={{ width: '200px' }}>
      <DotSwarm
        width={200}
        height={200}
        count={500}
        dotProps={(dot, idx) => ({
          r: 2,
          fill: linear.yellowGreen
            .domain([0, 500])(idx)
            .hex(),
        })}
      />
    </div>
  )
}

export const Animated = () => {
  const step = 200
  const [count, setCount] = useState(0)
  const maxCount = 5000

  useAutoStepper(true, () => {
    setCount((c) => (c < maxCount - step ? c + step : 0))
    return 600
  })

  return (
    <div style={{ width: '500px' }}>
      <DotSwarm
        width={500}
        height={500}
        count={maxCount}
        dotProps={(dot, idx) => ({
          r: 2,
          color: colors.blue,
          style: { transition: 'fill 0.7s linear' },
          fill: idx < count ? colors.blue : '#fff',
        })}
      />
    </div>
  )
}
