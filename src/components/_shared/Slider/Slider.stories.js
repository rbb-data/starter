import React from 'react'
import { action } from '@storybook/addon-actions'
import Slider from './Slider'

export default {
  title: 'II Components/Slider',
  component: Slider,
}

export const WithPrevNextButtons = () => (
  <Slider
    onForwardNavigation={action('onForwardNavigation')}
    onBackwardNavigation={action('onBackwardNavigation')}
  >
    {() => <p>prev</p>}
    {() => <p>slide content</p>}
    {() => <p>next</p>}
  </Slider>
)

export const WithoutPrevNextButtons = () => (
  <Slider
    onForwardNavigation={action('onForwardNavigation')}
    onBackwardNavigation={action('onBackwardNavigation')}
    showSlideButtons={false}
  >
    {() => <p>prev</p>}
    {() => <p>slide content</p>}
    {() => <p>next</p>}
  </Slider>
)
