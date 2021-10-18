import React from 'react';
import _ from './ColorBox.module.sass';
import { meetsContrastGuidelines } from 'polished';
import * as colors from 'global_styles/colors';

export const ColorBox = (props: { color: string; info?: string }) => {
  const { AA } = meetsContrastGuidelines('black', props.color);
  const colorArray = Object.entries(colors);
  const namedColor = colorArray.find(([, color]) => color === props.color);

  return (
    <div className={_.colorBoxWrapper}>
      <div
        className={_.colorBox}
        style={{ backgroundColor: props.color, color: AA ? 'black' : 'white' }}
      >
        <output>{props.color}</output>
        {namedColor && <span>{namedColor[0]}</span>}
      </div>
      {props.info && <p className={_.infoText}>{props.info}</p>}
    </div>
  );
};
