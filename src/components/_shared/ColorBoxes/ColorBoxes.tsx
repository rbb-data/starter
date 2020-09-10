import React, { useState } from 'react'
import TabBar from 'components/_shared/TabBar/TabBar'
import _ from './ColorBoxes.module.sass'

export const ColorBox = (props: { name: string; color: string }) => {
  return (
    <div className={_.colorBox}>
      <output style={{ backgroundColor: props.color }}>{props.color}</output>
      <p>{props.name}</p>
    </div>
  )
}

interface ColorList {
  [name: string]: string
}
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
  const currentColors =
    props.limit === undefined
      ? Object.entries(currentPallete.colors)
      : Object.entries(currentPallete.colors).slice(0, limit)

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
        {currentColors.map(([name, color]) => (
          <li>
            <ColorBox name={name} color={color} />
          </li>
        ))}
      </ul>
      <p>{currentPallete.description}</p>
    </figure>
  )
}

export default ColorBoxes
