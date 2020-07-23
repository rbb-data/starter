import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import ShareButtons from './ShareButtons'

export default {
  title: 'II Components/ShareButtons',
  decorators: [withKnobs],
  component: ShareButtons
}

export const Basic = () => (
  <ShareButtons
    title={text('title', 'Diese Karte teilen')}
    url={text(
      'url',
      'https://rbb-s0.w3.rbb-online.de/app/rdat-first-names-sharing/?type=map&name=noah&gender=m'
    )}
    description={text(
      'description',
      'So beliebt war der Name Noah 2019 in den verschiedenen Berliner Bezirken.'
    )}
  />
)
