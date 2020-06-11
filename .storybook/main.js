module.exports = {
  stories: [
    '../styleguide/**/*.stories.(js|mdx)',
    '../src/components/**/*.stories.(js|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
  ],
}
