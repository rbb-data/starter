export const constructCurve = ({
  startCoords,
  endCoords,
  startBezierHandle,
  endBezierHandle
}) => [
  'M',
  `${startCoords}`,
  'C',
  `${startBezierHandle}`,
  `${endBezierHandle}`,
  `${endCoords}`
]

export const mapCoords = (coords, xScale, yScale) => {
  if (!xScale && !yScale) return coords
  
  const mappedCoords = {}
  for (const key in coords) {
    const [x, y] = coords[key]
    mappedCoords[key] = [xScale ? xScale(x) : x, yScale ? yScale(y) : y]
  }

  return mappedCoords
}
