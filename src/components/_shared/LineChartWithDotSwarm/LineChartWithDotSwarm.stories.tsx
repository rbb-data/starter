import useAutoStepper from 'lib/hooks/useAutoStepper'
import React, { useEffect, useState } from 'react'

import LineChartWithDotSwarm from './LineChartWithDotSwarm'

export default {
  title: 'II Components/LineChartWithDotSwarm',
  component: LineChartWithDotSwarm,
}

const values = [100, 120, 300, 250, 144, 104, 20, 146, 105, 129, 300]

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

export const WithCustomLabels = () => {
  const [selected, setSelected] = useState(values.length - 1)

  return (
    <LineChartWithDotSwarm
      values={values}
      showInfoText={true}
      onSelect={setSelected}
      selected={selected}
      formatX={(idx) => `${idx + 12}h`}
    />
  )
}

export const WithAnimation = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let last = 0
    const duration = 10000
    function step(timestamp: number) {
      const elapsed = timestamp - last
      const diff = elapsed / duration
      last = timestamp
      setProgress((p) => (p + diff >= 1 ? 0 : p + diff))
      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [])

  return (
    <LineChartWithDotSwarm
      values={values}
      showInfoText={false}
      selected={progress * (values.length - 1)}
    />
  )
}
