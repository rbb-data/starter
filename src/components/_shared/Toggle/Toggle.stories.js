import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, text, radios } from '@storybook/addon-knobs'
import Toggle from './Toggle'

export default {
  title: 'II Components/Toggle',
  decorators: [withKnobs],
  component: Toggle,
}

export const Basic = () => (
  <Toggle
    name={'input1'}
    options={array('options', ['Option A', 'Option B'])}
    active={text('active', 'Option A')}
    onChange={action('onChange')}
  />
)
export const WithCustomFormat = () => {
  const options = [
    { firstname: 'Tina', lastname: 'Klein' },
    { firstname: 'Kim', lastname: 'Frank' },
  ]
  const activeIndex = radios('active', { Tina: 0, Kim: 1 }, 0)
  const active = options[activeIndex]

  return (
    <Toggle
      name={'input2'}
      options={options}
      active={active}
      format={(option) => `${option.firstname}.${option.lastname}`}
      onChange={action('onChange')}
    />
  )
}
