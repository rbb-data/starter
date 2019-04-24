import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

const req = require.context('../src/shared/components', true, /\.stories\.js$/)

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo({ inline: true, header: false }))
configure(loadStories, module)
