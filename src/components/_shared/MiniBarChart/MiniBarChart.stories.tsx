import React from 'react'
import MiniBarChart from './MiniBarChart'

// prettier-ignore
const values = [20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14, 20, 20, 26, 12, 10, 5, 18, 30, 12, 14]

export default {
  title: 'II Components/MiniBarChart',
  component: MiniBarChart,
  args: {
    values,
    onClick: () => {}
  }
}

const Template = (args) => <MiniBarChart {...args} />

export const Basic = Template.bind({})
export const WithExplicitMaxValue = Template.bind({})
export const WithFormattedUnits = Template.bind({})

Basic.args = { highlight: 7 }
WithExplicitMaxValue.args = { maxValue: 100 }
WithFormattedUnits.args = { unit: 'KW:', formatText: (idx) => `${idx + 10}` }
