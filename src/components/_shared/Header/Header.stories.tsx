import React from 'react'
import Header from './Header'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'II Components/Header',
  component: Header,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta

export const Basic: Story = (args) => {
  return <Header>{{ title: args.title, subtitle: args.subtitle }}</Header>
}
Basic.args = {
  title: 'Wegen des guten Wetters ziehen Schwaben nach Berlin',
  subtitle:
    'Die blaue linie zeigt die Anzahl der Zugezogenen Personen, die gelbe die Temperatur in ° Celsius ',
}
