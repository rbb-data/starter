import React from 'react';
import { action } from '@storybook/addon-actions';
import Slider from './Slider';

export default {
  title: 'II Components/Slider',
  component: Slider,
  args: {
    onForwardNavigation: action('onForwardNavigation'),
    onBackwardNavigation: action('onBackwardNavigation'),
  },
};

const Template = (args) => (
  <Slider {...args}>
    {() => <p>prev</p>}
    {() => <p>slide content</p>}
    {() => <p>next</p>}
  </Slider>
);

export const WithPrevNextButtons = Template.bind({});
export const WithoutPrevNextButtons = Template.bind({});
export const WithPrevNextButtonLabels = Template.bind({});

WithoutPrevNextButtons.args = { showSlideButtons: false };
WithPrevNextButtonLabels.args = { labelSlideButtons: true };
