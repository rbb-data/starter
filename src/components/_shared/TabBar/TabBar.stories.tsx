import React, { useState } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import * as colors from 'global_styles/colors'
import TabBar from './TabBar'

export default {
  title: 'II Components/TabBar',
  decorators: [withKnobs],
  component: TabBar,
}

export const Basic = () => {
  const [selectedTab, setSelectedTab] = useState('one')
  const tabs = ['one', 'two', 'three']

  return (
    <TabBar
      className='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      tabs={tabs}
      onChange={setSelectedTab}
    />
  )
}

export const WithCustomColor = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const tabs = [
    { color: 'red', display: 'Option number one' },
    { color: 'blue', display: 'Option number two' },
    { color: 'green', display: 'Option number three' },
  ]
  const selectedTab = tabs[selectedTabIndex]

  return (
    <TabBar
      className='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      tabs={tabs}
      format={(tab) => tab.display}
      color={(tab) => (tab === selectedTab ? tab.color : colors.darkGrey)}
      onChange={(tab) => {
        // for some reason setState will make a copy or something so
        // so selectedTab === tab won't work anymore inside the component
        // we can't just compare tabs but have to use the index
        const newIndex = tabs.findIndex((t) => t === tab)
        setSelectedTabIndex(newIndex)
      }}
    />
  )
}

export const WithReactComponents = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const tabs = [
    {
      value: 'one',
      display: (
        <span>
          Option <i>number one</i>
        </span>
      ),
    },
    {
      value: 'two',
      display: (
        <span>
          Option <i>number two</i>
        </span>
      ),
    },
    {
      value: 'three',
      display: (
        <span>
          Option <i>number three</i>
        </span>
      ),
    },
  ]

  const selectedTab = tabs[selectedTabIndex]

  return (
    <TabBar
      className='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      format={(tab) => tab.display}
      tabs={tabs}
      onChange={(tab) => {
        // for some reason setState will make a copy of the tab or something
        // so selectedTab === tab won't work anymore inside the component
        // so we can't just compare tabs but have to use the index
        const newIndex = tabs.findIndex((t) => t === tab)
        setSelectedTabIndex(newIndex)
      }}
    />
  )
}
