import React from 'react'
import BezierArrow from './BezierArrow'

export default {
  title: 'II Components/BezierArrow',
  component: BezierArrow,
  args: {
    coords: {
      startCoords: [10, 10],
      endCoords: [60, 60],
      startBezierHandle: [10, 40],
      endBezierHandle: [20, 60]
    }
  }
}

const Template = (args) => (
  <svg width={80} height={80}>
    <BezierArrow {...args} />
  </svg>
)

export const Basic = Template.bind({})
export const DoubleHeadedArrow = Template.bind({})
export const WithWideArrowHead = Template.bind({})

DoubleHeadedArrow.args = { arrowHeadAnchor: 'both' }
WithWideArrowHead.args = { arrowHeadRotation: 50 }
