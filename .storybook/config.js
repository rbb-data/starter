import { configure, addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { themes } from '@storybook/theming'
import rbb24Theme from './rbb24Theme'

const req = require.context('../src/shared/components', true, /\.stories\.js$/)

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: rbb24Theme,
  },
})

addDecorator(withInfo({ inline: true, header: false }))
configure(loadStories, module)
