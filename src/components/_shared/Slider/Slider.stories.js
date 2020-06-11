import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Slider from './Slider'

storiesOf('II Components/Slider', module)
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
