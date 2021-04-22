import React from 'react'
import { Story, Meta } from '@storybook/react'
import { SimpleSearch, SimpleSearchProps } from './Search'

export default {
  title: 'II Components/Search/Examples/SimpleSearch',
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

export const Basic: Story = <T extends unknown>(args: SimpleSearchProps<T>) => (
  <SimpleSearch {...args} />
)
Basic.args = {
  list: list,
  limit: 10,
  fuseOptions: { keys: ['label'] },
  format: (suggestion) => suggestion.label,
}
