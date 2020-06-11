import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import Map from './Map'

storiesOf('II Components/Map/Map', module)
  .addDecorator(withKnobs)
  .add('Berlin Map', () => {
    return <Map />
  })
