// import { themes } from '@storybook/theming'
// import rbb24Theme from './rbb24Theme'


// addParameters({
//   options: {
//     theme: rbb24Theme,
//   },
// })

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource'
  ]
};
