import React, { useState } from 'react'

import LineChartWithDotSwarm from './LineChartWithDotSwarm'

export default {
  title: 'II Components/LineChartWithDotSwarm',
  component: LineChartWithDotSwarm,
}

const values = [100, 120, 140, 120, 144, 104, 125, 146, 105, 129, 300]

export const Basic = () => {
  const [selected, setSelected] = useState(values.length - 1)

  return (
    <LineChartWithDotSwarm
      values={values}
      showInfoText={true}
      onSelect={setSelected}
      selected={selected}
    />
  )
}
