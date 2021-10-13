export const constructCurve = (
  startCoords,
  endCoords,
  startBezierHandle,
  endBezierHandle
) => [
  'M',
  `${startCoords}`,
  'C',
  `${startBezierHandle}`,
  `${endBezierHandle}`,
  `${endCoords}`
]
