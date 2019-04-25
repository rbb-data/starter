import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { SimpleSearch, DropdownSearch } from './Search'

const list = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'strawbery', label: 'Strawbery' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grapes', label: 'Grapes' }
]

storiesOf('Search', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('SimpleSearch', () =>
    <SimpleSearch list={list} onResult={action('onResult')} onReset={action('onReset')} />
  )
  .add('DropdownSearch', () =>
    <DropdownSearch list={list} onResult={action('onResult')} />
  )
