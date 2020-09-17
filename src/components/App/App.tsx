import DotSwarm from 'components/DotSwarm/DotSwarm'
import PlayButton from 'components/_shared/PlayButton/PlayButton'
/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import { csvParse } from 'd3-dsv'
import _ from './App.module.sass'

// this is the blue from the new styleguide it is not yet in the starter
const defaultBlue = '#0c5382'

interface Count {
  month: string
  count: number
}
function App() {
  const [counts, setCounts] = useState<Array<Count>>([])
  const [currentMonthIndex] = useState(0)

  useEffect(() => {
    async function fetchCounts() {
      const res = await fetch(`${window.location}/counts.csv`)
      const str = await res.text()
      const arr = (csvParse(str) as unknown) as Count[]
      setCounts(arr)
    }

    fetchCounts()
  }, [])
  // ⬆️ the second parameter to useEffect are its dependencies
  //  if the array is empty it runs only once otherwise it runs when depencies change

  const currentCount = counts[currentMonthIndex]
  if (currentCount === undefined) return null

  return (
    <article className={_.app}>
      <h2>{currentCount.month}</h2>
      <DotSwarm
        width={200}
        height={200}
        count={Math.trunc(currentCount.count / 10)}
        radius={1}
        color={defaultBlue}
      />
      <PlayButton />
    </article>
  )
}

export default App
