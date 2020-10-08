import React from 'react'
import * as colors from 'global_styles/colors'

import LineChartWithDotSwarm from './LineChartWithDotSwarm'

export default {
  title: 'II Components/LineChartWithDotSwarm',
  component: LineChartWithDotSwarm,
}

const line: [number, number][] = [
  [0, 100],
  [1, 120],
  [2, 140],
  [3, 100],
  [4, 120],
  [5, 144],
  [6, 104],
  [7, 125],
  [8, 146],
  [9, 105],
  [10, 129],
]

export const Basic = () => {
  return (
    <LineChartWithDotSwarm
      width={600}
      height={350}
      line={line}
      color={colors.blue}
      showInfoText={true}
      onYearSelect={(year) => {}}
      animationProgress={1}
    />
  )
}
