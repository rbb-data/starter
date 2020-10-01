import React, { useState } from 'react'
import TabBar from 'components/_shared/TabBar/TabBar'
import _ from './ColorBoxes.module.sass'
import { ColorBox } from './ColorBox'

type ColorList =
  | {
      [name: string]: string
    }
  | [string]
interface Palletes {
  [pallete: string]: { colors: ColorList; description?: string }
}

const isColorList = (value: ColorList | Palletes): value is ColorList => {
  return typeof Object.values(value)[0] === 'string'
}

interface Props {
  title: string
  description: string
  limit?: string
  colors: ColorList | Palletes
}
const ColorBoxes = (props: Props) => {
  const palletes: Palletes = isColorList(props.colors)
    ? { default: { colors: props.colors } }
    : props.colors
  const palletNames = Object.keys(palletes)
  const [paletteName, setPalleteName] = useState(palletNames[0])
  const currentPallete = palletes[paletteName]
  const [limit, setLimit] = useState(Object.keys(currentPallete.colors).length)
  const colorArray: { color: string; info?: string }[] =
    currentPallete.colors instanceof Array
      ? currentPallete.colors.map((color) => ({ color }))
      : Object.entries(currentPallete.colors).map(([info, color]) => ({
          info,
          color,
        }))
  const currentColors =
    props.limit === undefined ? colorArray : colorArray.slice(0, limit)

  return (
    <figure className={_.colorBoxes}>
      <figcaption>
        <strong>{props.title}</strong>
        <p>{props.description}</p>
      </figcaption>
      {palletNames.length > 1 && (
        <TabBar
          id={props.title}
          title='select pallete'
          selectedTab={paletteName}
          tabs={palletNames}
          onChange={setPalleteName}
        />
      )}
      {props.limit && (
        <div>
          {props.limit}
          <input
            type='number'
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value))
            }}
          />
        </div>
      )}
      <ul className={_.colorList}>
        {currentColors.map((color) => (
          <li>
            <ColorBox color={color.color} info={color.info} />
          </li>
        ))}
      </ul>
      <p>{currentPallete.description}</p>
    </figure>
  )
}

export default ColorBoxes
