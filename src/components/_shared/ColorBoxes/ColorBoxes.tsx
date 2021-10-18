import React, { useState } from 'react';
import TabBar from 'components/_shared/TabBar/TabBar';
import _ from './ColorBoxes.module.sass';
import { ColorBox } from './ColorBox';

type ColorList =
  | {
      [name: string]: string;
    }
  | [string];
interface Palettes {
  [palette: string]: { colors: ColorList; description?: string };
}

const isColorList = (value: ColorList | Palettes): value is ColorList => {
  return typeof Object.values(value)[0] === 'string';
};

interface Props {
  title: string;
  description: string;
  limit?: string;
  colors: ColorList | Palettes;
}
const ColorBoxes = (props: Props) => {
  const palettes: Palettes = isColorList(props.colors)
    ? { default: { colors: props.colors } }
    : props.colors;
  const palletNames = Object.keys(palettes);
  const [paletteName, setPaletteName] = useState(palletNames[0]);
  const currentPalette = palettes[paletteName];
  const [limit, setLimit] = useState(Object.keys(currentPalette.colors).length);
  const colorArray: { color: string; info?: string }[] =
    currentPalette.colors instanceof Array
      ? currentPalette.colors.map((color) => ({ color }))
      : Object.entries(currentPalette.colors).map(([info, color]) => ({
          info,
          color,
        }));
  const currentColors =
    props.limit === undefined ? colorArray : colorArray.slice(0, limit);

  return (
    <figure className={_.colorBoxes}>
      <figcaption>
        <strong>{props.title}</strong>
        <p>{props.description}</p>
      </figcaption>
      {palletNames.length > 1 && (
        <TabBar
          title="select palette"
          selectedTab={paletteName}
          tabs={palletNames}
          onChange={setPaletteName}
        />
      )}
      {props.limit && (
        <div>
          {props.limit}
          <input
            type="number"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
            }}
          />
        </div>
      )}
      <ul className={_.colorList}>
        {currentColors.map((color) => (
          <li key={color.color + color.info}>
            <ColorBox color={color.color} info={color.info} />
          </li>
        ))}
      </ul>
      <p>{currentPalette.description}</p>
      <label>
        copy for datawrapper import:{' '}
        <input
          readOnly
          style={{
            fontFamily: 'monospace',
            width: '100%',
          }}
          value={currentColors.map((color) => color.color).join(',')}
        ></input>
      </label>
    </figure>
  );
};

export default ColorBoxes;
