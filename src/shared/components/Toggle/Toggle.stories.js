import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, radios } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import Toggle from './Toggle'

storiesOf('Toggle', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('toggle', () =>
    <Toggle
      a={{ value: 'a', label: 'Option A' }}
      b={{ value: 'b', label: 'Option B' }}
      active={radios('active', { a: 'a', b: 'b' }, 'a')}
      onChange={action('onChange')}
    />
  )
