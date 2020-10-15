import React, { useState } from 'react'
import * as colors from 'global_styles/colors'

import LineChartWithDotSwarm from './LineChartWithDotSwarm'

export default {
  title: 'II Components/LineChartWithDotSwarm',
  component: LineChartWithDotSwarm,
}

const values = [100, 120, 140, 100, 120, 144, 104, 125, 146, 105, 129, 300]

export const Basic = () => {
  const [selectedIdx, setSelectedIdx] = useState(values.length - 1)
  const progress = selectedIdx / (values.length - 1)

  return (
    <LineChartWithDotSwarm
      values={values}
      showInfoText={true}
      onYearSelect={setSelectedIdx}
      animationProgress={progress}
    />
  )
}
