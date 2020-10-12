import React, { useState } from 'react'
import _ from './ColorBoxes.module.sass'
import { ColorBox } from './ColorBox'
import { Scale } from 'chroma-js'

interface ColorList {
  [name: string]: string
}
interface Palletes {
  [pallete: string]: { colors: ColorList; description?: string }
}

interface Props {
  title: string
  description: string
  scale: Scale
  diverging?: boolean
}
const GradientBoxes = (props: Props) => {
  const initalSteps = props.diverging ? 3 : 7
  const [steps, setSteps] = useState(initalSteps)
  const colors = props.scale.colors(props.diverging ? steps * 2 + 1 : steps)

  return (
    <figure className={_.colorBoxes}>
      <figcaption>
        <strong>{props.title}</strong>
        <p>{props.description}</p>
      </figcaption>

      <div>
        <input
          type='number'
          value={steps}
          onChange={(e) => {
            setSteps(parseInt(e.target.value))
          }}
        />
      </div>
      <ul className={_.colorList}>
        {colors.map((color) => (
          <li>
            <ColorBox color={color} />
          </li>
        ))}
      </ul>
      <label>
        copy for datwarpper import:{' '}
        <input
          readOnly
          style={{
            fontFamily: 'monospace',
            width: '100%',
          }}
          value={colors.join(' ')}
        ></input>
      </label>
    </figure>
  )
}

export default GradientBoxes
