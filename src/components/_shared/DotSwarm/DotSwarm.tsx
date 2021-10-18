import React, { useMemo } from 'react';
import { forceSimulation, forceX, forceY } from 'd3-force';
import { blue } from 'global_styles/colors';

export type Point = { x: number; y: number };

/**
 * Creates an array of objects with x and y params positioned around point [0, 0] in a phyllotaxis
 * @param count number of dots to draw
 */
function createDotsCluster(count: number): Point[] {
  const children: any[] = Array.from(Array(count).keys()).map(() => ({}));

  const simulation: any = forceSimulation(children)
    .stop()
    .force('x', forceX(0).strength(1.3))
    .force('y', forceY(0).strength(1.3))
    .tick(1);

  return simulation.nodes();
}

export interface RawDotSwarmProps {
  /* position of the center point inside the svg */
  position: { x: number; y: number };
  count: number;
  dotProps?: (point: Point, idx: number) => React.SVGProps<SVGCircleElement>;
}
export const RawDotSwarm: React.FC<RawDotSwarmProps> = ({
  position,
  count,
  dotProps = () => ({ fill: blue, r: 1 }),
}) => {
  const dots = useMemo(() => createDotsCluster(count), [count]);

  return (
    <g transform={`translate(${position.x} ${position.y})`}>
      {dots.map((dot, idx) => (
        <circle key={idx} cx={dot.x} cy={dot.y} {...dotProps(dot, idx)} />
      ))}
    </g>
  );
};
RawDotSwarm.defaultProps = {
  dotProps: () => ({ fill: blue }),
};

export interface Props {
  /** center dots within this width *numbers are relative to the size of the svg* */
  width?: number;
  /** center dots within this height *numbers are relative to the size of the svg* */
  height?: number;
  /** number of dots to draw */
  count: number;
  /** Calculate the properties of the svg circle based on the point and its index.
   * *You could even overwrite the position. See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
   * for what you can return as svg circle props*
   */
  dotProps?: (point: Point, idx: number) => React.SVGProps<SVGCircleElement>;
}
const DotSwarm: React.FC<Props> = ({
  width = 100,
  height = 100,
  count,
  dotProps = () => ({ fill: blue, r: 1 }),
}) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <RawDotSwarm
        count={count}
        position={{ x: width / 2, y: height / 2 }}
        dotProps={dotProps}
      />
    </svg>
  );
};

export default DotSwarm;
