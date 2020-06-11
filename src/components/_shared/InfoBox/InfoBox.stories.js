import React from 'react'
import InfoBox from './InfoBox'

export default {
  title: 'II Components/InfoBox',
  component: InfoBox,
}

export const Basic = () => (
  <InfoBox>
    <h1>InfoBox Content</h1>
    <p>Lorem Ipsum</p>
  </InfoBox>
)
