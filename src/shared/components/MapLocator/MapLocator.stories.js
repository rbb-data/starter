import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Map from '../Map/Map'
import MapLocator from './MapLocator'

storiesOf('MapLocator', module)
  .addDecorator(withKnobs)
  .add('MapLocator', () => {
    return <Map>
      <MapLocator position={[52.49, 13.4]} />
    </Map>
  })
