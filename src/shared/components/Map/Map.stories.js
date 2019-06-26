import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import Map from './Map'

storiesOf('Map', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('Berlin Map', () => {
    return <Map />
  })
