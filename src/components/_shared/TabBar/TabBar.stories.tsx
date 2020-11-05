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
  const [selectedTab, setSelectedTab] = useState('one')
  const tabs = ['one', 'two', 'three']
  const tabColors: Record<string, string> = {
    one: colors.blue,
    two: colors.magenta,
    three: colors.yellow,
  }

  return (
    <TabBar
      className='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      tabs={tabs}
      color={(tab) => (tab === selectedTab ? tabColors[tab] : colors.darkGrey)}
      onChange={(tab) => {
        setSelectedTab(tab)
      }}
    />
  )
}

export const WithTabObjectThatContainsColorData = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const tabs = [
    { color: colors.blue, display: 'Option number one' },
    { color: colors.magenta, display: 'Option number two' },
    { color: colors.yellow, display: 'Option number three' },
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
  const [selectedTab, setSelectedTab] = useState('one')
  const tabs = ['one', 'two', 'three']

  return (
    <TabBar
      className='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      format={(tab) => (
        <span>
          Option <i>number ${tab}</i>
        </span>
      )}
      tabs={tabs}
      onChange={(tab) => {
        setSelectedTab(tab)
      }}
    />
  )
}
