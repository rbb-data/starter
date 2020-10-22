import React, { useState } from 'react'
import _ from './ColorBoxes.module.sass'
import { ColorBox } from './ColorBox'
import { Scale } from 'chroma-js'

interface Props {
  title: string
  description: string
  scale: Scale
}
const GradientBoxes = (props: Props) => {
  const initalSteps = 7
  const [steps, setSteps] = useState(initalSteps)
  const colors = props.scale.colors(steps)

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
          <li key={color}>
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
