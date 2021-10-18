import React, { useState } from 'react';
import * as colors from 'global_styles/colors';
import * as gradients from 'global_styles/gradients';
import useAutoStepper from 'lib/hooks/useAutoStepper';

import DotSwarm, { RawDotSwarm } from './DotSwarm';

export default {
  title: 'II Components/DotSwarm',
  component: DotSwarm,
};

const Template = (args) => (
  <div style={{ width: '200px' }}>
    <DotSwarm {...args} />
  </div>
);

export const Basic = Template.bind({});
export const ColoredByIndex = Template.bind({});

Basic.args = { count: 500 };
ColoredByIndex.args = {
  count: 500,
  dotProps: (dot, idx) => ({
    r: 1,
    // hacky solution until fix available in @types/chroma-js
    fill: (gradients.linear.yellowGreen.domain([0, 500])(idx) as any).hex(),
  }),
};

export const Animated = () => {
  const step = 200;
  const [count, setCount] = useState(0);
  const maxCount = 5000;

  useAutoStepper(true, () => {
    setCount((c) => (c < maxCount - step ? c + step : 0));
    return 600;
  });

  return (
    <div style={{ width: '500px' }}>
      <DotSwarm
        width={500}
        height={500}
        count={maxCount}
        dotProps={(dot, idx) => ({
          r: 2,
          color: colors.blue,
          style: { transition: 'fill 0.7s linear' },
          fill: idx < count ? colors.blue : '#fff',
        })}
      />
    </div>
  );
};

export const InsideSVG = () => {
  return (
    <svg viewBox="0 0 200 200" style={{ width: '200px' }}>
      <RawDotSwarm
        position={{ x: 100, y: 100 }}
        count={500}
        dotProps={(dot, idx) => ({
          r: 2,
          fill: colors.blue,
        })}
      />
    </svg>
  );
};
