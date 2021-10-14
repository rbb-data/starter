import React, { useRef } from 'react'
import BezierArrowEditor from './BezierArrowEditor'

export default {
  title: 'II Components/BezierArrowEditor',
  component: BezierArrowEditor,
}

export const Basic = () => {  
  const WIDTH = 400
  const HEIGHT = 120

  const canvasRef = useRef()

  return (
    <svg
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      overflow="visible"
    >
      <rect width={WIDTH} height={HEIGHT} fill="whitesmoke" />
      <BezierArrowEditor canvasRef={canvasRef} />
    </svg>
  )
}
