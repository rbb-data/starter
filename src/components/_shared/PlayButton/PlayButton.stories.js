import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PlayButton from './PlayButton'

storiesOf('PlayButton', module)
  .add('with play icon', () => {
    return <PlayButton onClick={action('onClick')} />
  })
  .add('with stop icon', () => {
    return <PlayButton showStopIcon onClick={action('onClick')} />
  })
