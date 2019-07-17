import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import Slider from './Slider'

storiesOf('Slider', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('With prev next Buttons', () =>
    <Slider
      onForwardNavigation={action('onForwardNavigation')}
      onBackwardNavigation={action('onBackwardNavigation')}>

      {() => <p>prev</p>}
      {() => <p>slide content</p>}
      {() => <p>next</p>}
    </Slider>
  )
  .add('Without prev next Buttons', () =>
    <Slider
      onForwardNavigation={action('onForwardNavigation')}
      onBackwardNavigation={action('onBackwardNavigation')}
      showSlideButtons={false}>

      {() => <p>prev</p>}
      {() => <p>slide content</p>}
      {() => <p>next</p>}
    </Slider>
  )
