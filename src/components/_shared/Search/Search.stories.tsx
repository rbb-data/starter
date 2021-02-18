import React from 'react'
import PropTypes from 'prop-types'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  SimpleSearch,
  SimpleSearchProps,
  DropdownSearch,
  DropdownSearchWithReactNodes,
  LocationSearch,
} from './Search'

export default {
  title: 'II Components/Search/Search',
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

const Circle = ({ color }) => (
  <div
    style={{
      display: 'inline-block',
      marginRight: '5px',
      backgroundColor: color,
      width: '10px',
      height: '10px',
      borderRadius: '10px',
    }}
  />
)

Circle.propTypes = { color: PropTypes.string }

export const WithSimpleSearch: Story = <T extends unknown>(
  args: SimpleSearchProps<T>
) => <SimpleSearch {...args} />
WithSimpleSearch.args = {
  list: list,
  fuseOptions: { keys: ['label'] },
  format: (suggestion) => suggestion.label,
  onResult: action('onResult'),
  onReset: action('onReset'),
}

export const WithDropdownSearch = () => (
  <DropdownSearch
    list={list}
    fuseOptions={{ keys: ['label'] }}
    format={(suggestion) => suggestion.label}
    onResult={action('onResult')}
  />
)

export const WithDropdownSearchWithReactNodes = () => (
  <DropdownSearchWithReactNodes
    list={list}
    fuseOptions={{ keys: ['label'] }}
    formatString={(suggestion) => suggestion.label}
    formatNode={(suggestion) => (
      <div>
        <Circle color={suggestion.color} />
        {suggestion.label}
      </div>
    )}
    onResult={action('onResult')}
  />
)

export const WithLocationSearch = () => {
  return <LocationSearch onReset={() => {}} onResult={action('onResult')} />
}
