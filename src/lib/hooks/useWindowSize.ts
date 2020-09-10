import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const getSize = (): { width: number; height: number } => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [windowSize, setWindowSize] = useState(getSize())

  useEffect(() => {
    function onResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return windowSize
}
