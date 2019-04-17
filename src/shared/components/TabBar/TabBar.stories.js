import React from 'react'

import { storiesOf } from '@storybook/react'

import TabBar from './TabBar'

storiesOf('TabBar', module)
  .add('3 Tabs', () => {
    const changeHandler = value => {
      console.log(value) // 'one', 'two' or 'three'
    }

    const tabBarProps = {
      id: 'tab-bar-id',
      class: 'custom-class-name',
      title: 'Select something',
      selectedValue: 'one',
      options: [
        { value: 'one', display: 'Option number one' },
        { value: 'two', display: 'Option number two' },
        { value: 'three', display: 'Option number three' }
      ]
    }

    return <TabBar {...tabBarProps} onChange={changeHandler} />
  })
