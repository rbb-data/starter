import React from 'react'
import * as colors from 'global_styles/colors'
import * as gradients from 'global_styles/gradients'
import useAutoStepper from 'lib/hooks/useAutoStepper'

import MiniBarChart from './MiniBarChart'

export default {
  title: 'II Components/MiniBarChart',
  component: MiniBarChart,
}

// prettier-ignore
const values = [20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14]

export const Basic = () => {
  return <MiniBarChart values={values} highlight={7} onClick={() => {}} />
}

export const WithExplicitMaxValue = () => {
  return <MiniBarChart values={values} maxValue={100} onClick={() => {}} />
}

export const WithFormatedUnits = () => {
  return (
    <MiniBarChart
      values={values}
      unit={'KW:'}
      formatText={(idx) => `${idx + 10}`}
      onClick={() => {}}
    />
  )
}
