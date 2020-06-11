import React from 'react'
import { action } from '@storybook/addon-actions'
import PlayButton from './PlayButton'

export default {
  title: 'II Components/PlayButton',
  component: PlayButton,
}

export const WithPlayIcon = () => <PlayButton onClick={action('onClick')} />

export const WithStopIcon = () => (
  <PlayButton showStopIcon onClick={action('onClick')} />
)
