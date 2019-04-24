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
      currentSlide={<p>slide content</p>}
      previousSlide={<p>prev</p>}
      nextSlide={<p>next</p>}
      onForwardNavigation={action('onForwardNavigation')}
      onBackwardNavigation={action('onBackwardNavigation')} />
  )
  .add('Without prev next Buttons', () =>
    <Slider
      currentSlide={<p>slide content</p>}
      previousSlide={<p>prev</p>}
      nextSlide={<p>next</p>}
      onForwardNavigation={action('onForwardNavigation')}
      onBackwardNavigation={action('onBackwardNavigation')}
      showSlideButtons={false} />
  )
