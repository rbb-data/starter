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
let arrowrotation: number;

function ArrowHead({ curvePath, coordsforArrow, rotation = 30, length = 10 }: Props) {
  console.log(coordsforArrow) 
  const inclination=((coordsforArrow[1][1]-coordsforArrow[0][1])/(coordsforArrow[1][0]-coordsforArrow[0][0]))
  if(!isFinite(inclination)){
    x_coord_plus=0
    y_coord_plus=length
}else{
   x_coord_plus = inclination === 0 ? length : Math.sqrt(Math.pow(length, 2)*Math.pow(inclination, 2)/2);
   y_coord_plus = inclination === 0 ? 0 : x_coord_plus*inclination
}
console.log(coordsforArrow[0],coordsforArrow[1]);
if (coordsforArrow[0][0]>=coordsforArrow[1][0]){
}
if (coordsforArrow[0][0]<coordsforArrow[1][0]){
  //rotation=180-rotation;
}
console.log(arrowrotation)
new_curvepath=("M "+String(coordsforArrow[0][0]-x_coord_plus)+","+String(coordsforArrow[0][1]-y_coord_plus)+" L "+String(coordsforArrow[0][0])+","+String(coordsforArrow[0][1]));


  return (
    <g>
      {[0].map((direction) => (
        <path
          key={direction}
          transform={`rotate(${direction * rotation} ${coordsforArrow[0].join(' ')})`}
          style={{ stroke:"green", //strokeDasharray: [length, LARGE_VALUE].join(' ')
        }
        }
          d={new_curvepath}
        />
      ))}
    </g>
  );
}

export default ArrowHead;
