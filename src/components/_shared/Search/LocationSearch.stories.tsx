import React from 'react'
import { Story, Meta } from '@storybook/react'
import { SimpleSearch, LocationSearch } from './Search'
import { LocationSearchProps } from './examples/LocationSearch'

export default {
  title: 'II Components/Search/Examples/LocationSearch',
  component: SimpleSearch,
} as Meta

const list = [
  { color: 'red', label: 'Apple' },
  { color: 'yellow', label: 'Banana' },
  { color: 'red', label: 'Strawbery' },
  { color: 'green', label: 'Avocado' },
  { color: 'blue', label: 'Blueberry' },
  { color: 'red', label: 'Cherry' },
  { color: 'green', label: 'Grapes' },
]

export const Basic: Story = <T extends unknown>(
  args: LocationSearchProps<T>
) => {
  return <LocationSearch {...args} />
}
Basic.args = {
  placeholder: 'nach Ort suchern',
}
