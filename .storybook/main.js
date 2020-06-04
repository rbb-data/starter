// import { configure, addParameters, addDecorator } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
// import { themes } from '@storybook/theming'
// import rbb24Theme from './rbb24Theme'

// const req = require.context('../src/components/_shared', true, /\.stories\.js$/)

// const loadStories = () => {
//   req.keys().forEach(filename => req(filename));
// }

// addParameters({
//   options: {
//     theme: rbb24Theme,
//   },
// })

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
};
// addDecorator(withInfo({ inline: true, header: false }))
// configure(loadStories, module)
