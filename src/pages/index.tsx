import Link from 'next/link';
import React from 'react';
import { useRef } from 'react';
import { args } from 'react';


import BezierArrowEditor from 'components/_shared/BezierArrow/BezierArrowEditor';
function Index() {
  const PAGES = [
    { url: '/graphic', title: 'Example of a complete graphic (Header+Chart)' },
    { url: '/chart', title: 'Minimal example of a responsive chart' },
    { url: '/map', title: 'Map example' },
  ];

  

  const WIDTH = 400;
  const HEIGHT = 120;

  const canvasRef = useRef();

  return (
    <svg ref={canvasRef} width={WIDTH} height={HEIGHT} overflow="visible">
      <rect width={WIDTH} height={HEIGHT} fill="whitesmoke" />
      <BezierArrowEditor canvasRef={canvasRef} {...args} />
    </svg>
  );
}


export default Index;
