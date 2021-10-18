import React from 'react';
import Chroma from 'chroma-js';
import ValueOnGradientBar from './ValueOnGradientBar';

export default {
  title: 'II Components/ValueOnGradientBar',
  component: ValueOnGradientBar,
};

const Template = (args) => <ValueOnGradientBar {...args} />;

export const Basic = Template.bind({});
export const WithHighlightedValue = Template.bind({});
export const WithNo2Gradient = Template.bind({});

WithHighlightedValue.args = {
  highlightedValue: 10,
  unit: 'km/h',
};

WithNo2Gradient.args = {
  threshold: 40,
  highlightedValue: 43,
  unit: 'µg/m³',
  colorScale: Chroma.bezier(['#B6D61B', '70B50F', '#E2430D', 'E30F04', '000'])
    .scale()
    .domain([0, 100])
    .correctLightness(),
};
