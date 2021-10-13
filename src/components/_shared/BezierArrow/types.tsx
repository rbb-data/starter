export type Coords = [number, number]

export interface BezierCoords {
  startCoords: Coords,
  endCoords: Coords,
  startBezierHandle: Coords,
  endBezierHandle: Coords
}
