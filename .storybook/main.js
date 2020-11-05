module.exports = {
  stories: [
    '../styleguide/**/*.stories.@(js|mdx)',
    '../src/components/**/*.stories.@(js|mdx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/preset-create-react-app',
  ],
}
