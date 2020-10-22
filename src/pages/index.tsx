import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const App = dynamic(() => import('../components/App/App'), { ssr: false })

const Index: NextPage = () => {
  return <App />
}

export default Index
