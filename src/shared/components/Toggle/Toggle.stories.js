import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, text, radios } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import Toggle from './Toggle'

storiesOf('Toggle', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('basic example', () =>
    <Toggle
      options={array('options', ['Option A', 'Option B'])}
      active={text('active', 'Option A')}
      onChange={action('onChange')}
    />
  )

  .add('with custom format', () => {
    const options = [
      { firstname: 'Tina', lastname: 'Klein' },
      { firstname: 'Kim', lastname: 'Frank' }
    ]
    const activeIndex = radios('active', { Tina: 0, Kim: 1 }, 0)
    const active = options[activeIndex]

    return <Toggle
      options={options}
      active={active}
      format={option => `${option.firstname}.${option.lastname}`}
      onChange={action('onChange')}
    />
  })
