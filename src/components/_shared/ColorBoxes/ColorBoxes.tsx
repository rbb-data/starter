import React, { useState } from 'react'
import TabBar from 'components/_shared/TabBar/TabBar'
import _ from './ColorBoxes.module.sass'

export const ColorBox = (props: { name: string; color: string }) => {
  return (
    <div className={_.colorBox} style={{ backgroundColor: props.color }}>
      {props.name}
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
  colors: ColorList | Palletes
}
const ColorBoxes = (props: Props) => {
  const palletes: Palletes = isColorList(props.colors)
    ? { default: { colors: props.colors } }
    : props.colors
  const palletNames = Object.keys(palletes)
  const [paletteName, setPalleteName] = useState(palletNames[0])
  const currentPallete = palletes[paletteName]

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
      <ul className={_.colorList}>
        {Object.entries(currentPallete.colors).map(([name, color]) => (
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
