import React from 'react'
import { action } from '@storybook/addon-actions'
import StemAndLeafPlot from './StemAndLeafPlot'

export default {
  title: 'II Components/StemAndLeafPlot',
  component: StemAndLeafPlot,
}

export const WithoutSelectedItem = () => {
  const items = [
    0, 0, 0, 2, 2, 2, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 12, 12,
    13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 18, 19, 19, 19,
    20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 24, 25, 25, 26, 26, 26,
    27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 30, 30
  ]

  return <StemAndLeafPlot
    items={items}
    onSelectDot={action('onSelectDot')}
    maxValue={30}
    numberOfSteps={30}
  />
}

export const WithSelectedItem = () => {
  const itemsWithIdentity = [
    { value: 0 },
    { value: 1 },
    { value: 1 },
    { value: 2 },
    { value: 2 },
    { value: 2 },
    { value: 3 },
    { value: 3 },
    { value: 9 },
    { value: 10 },
    { value: 50 }
  ]

  return <StemAndLeafPlot
    items={itemsWithIdentity}
    getValue={item => item.value}
    selectedItem={itemsWithIdentity[5]}
    onSelectDot={action('onSelectDot')}
  />
}

