const LARGE_VALUE = 100000

function ArrowHead({ curvePath, coords, rotation, length }) {
  return (
    <g>
      {[1, -1].map((direction) => (
        <path
          transform={`rotate(${direction * rotation} ${coords.join(' ')})`}
          style={{ strokeDasharray: [length, LARGE_VALUE].join(' ') }}
          d={curvePath}
        />
      ))}
    </g>
  )
}

export default ArrowHead
