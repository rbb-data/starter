import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Slider from './Slider'

storiesOf('Slider', module)
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
