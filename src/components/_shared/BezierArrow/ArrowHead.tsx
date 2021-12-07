import { number } from 'prop-types';
import React from 'react';

const LARGE_VALUE = 100000;

interface Props {
  curvePath: string;
  coordsforArrow: [number, number][];
  rotation?: number;
  length?: number;
}
let x_coord_plus: number;
let y_coord_plus: number;
let new_curvepath: string;

function ArrowHead({ curvePath, coordsforArrow, rotation = 30, length = 10 }: Props) {
  /*we calculate the inclination between bezierhandle and end of arrow to get for any x also y*/
  const inclination=((coordsforArrow[1][1]-coordsforArrow[0][1])/(coordsforArrow[1][0]-coordsforArrow[0][0]))
  if(!isFinite(inclination)){
    x_coord_plus=0
    y_coord_plus=length
}else{
   x_coord_plus = inclination === 0 ? length : Math.sqrt(Math.pow(length, 2)/(1+Math.pow(inclination, 2)));
   y_coord_plus = inclination === 0 ? 0 : x_coord_plus*inclination
}
  /* as the above calculation involves a sqrt we have to add negative and positive inclination as possibilities*/
if (coordsforArrow[0][0]<coordsforArrow[1][0]){
  x_coord_plus=x_coord_plus*-1
  y_coord_plus=y_coord_plus*-1
}

if (coordsforArrow[0][0]===coordsforArrow[1][0]&&coordsforArrow[0][1]<coordsforArrow[1][1]){
  x_coord_plus=x_coord_plus*-1
  y_coord_plus=y_coord_plus*-1
  };

new_curvepath=("M "+String(coordsforArrow[0][0]-x_coord_plus)+","+String(coordsforArrow[0][1]-y_coord_plus)+" L "+String(coordsforArrow[0][0])+","+String(coordsforArrow[0][1]));


  return (
    <g>
      {[-1,0,1].map((direction) => (
        <path
          key={direction}
          transform={`rotate(${direction * rotation} ${coordsforArrow[0].join(' ')})`}
          //style={{ stroke:"green"}}
        
          d={new_curvepath}
        />
      ))}
    </g>
  );
}

export default ArrowHead;
