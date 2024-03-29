import useChartDimensions from 'lib/hooks/useChartDimensions';

function Chart() {
  const [ref, dms] = useChartDimensions({
    marginTop: 40,
    marginLeft: 10,
    marginRight: 50,
  });

  return (
    <>
      <div ref={ref} style={{ height: '200px' }}>
        <svg width={dms.width} height={dms.height}>
          <rect width={dms.width} height={dms.height} fill="khaki" />
          <text x="0" y="0" dy="1em">
            SVG (width={dms.width}/height={dms.height})
          </text>
          <g transform={`translate(${dms.marginLeft},${dms.marginTop})`}>
            <rect
              width={dms.boundedWidth}
              height={dms.boundedHeight}
              fill="lavender"
            />
            <text x="0" y="0" dy="1em">
              Chart (boundedWidth={dms.boundedWidth}/boundedHeight=
              {dms.boundedHeight})
            </text>
          </g>
        </svg>
      </div>
      <div
        style={{ width: '100%', border: '1px solid black', marginTop: '5px' }}
      >
        {Object.entries(dms)
          .filter(([key]) => key.startsWith('margin'))
          .map(([key, value]) => (
            <span key={key}>
              {key}={value}
              <br />
            </span>
          ))}
      </div>
    </>
  );
}

export default Chart;
