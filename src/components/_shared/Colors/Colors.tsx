import { string } from 'prop-types'

import React from 'react'

const Color = (props: { name: string; color: string }) => {
  return <div style={{ backgroundColor: props.color }}>{props.name}</div>
}
