import React from 'react'

import { storiesOf } from '@storybook/react'

import InfoBox from './InfoBox'

storiesOf('InfoBox', module)
  .add('InfoBox', () => {
    return <InfoBox>
      <h1>InfoBox Content</h1>
      <p>Lorem Ipsum</p>
    </InfoBox>
  })
