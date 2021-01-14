import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const App = dynamic(() => import('../components/MapExample/MapExample'), {
  ssr: false,
})

const MapExample: NextPage = () => {
  return <App />
}

export default MapExample
