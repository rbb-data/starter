import React, { Component } from 'react'
import Map from '../../shared/components/Map/Map'
import Detail from '../Detail/Detail'
import _ from './App.module.sass'

class App extends Component {
  render () {
    const position = [52, 12]
    return <div className={_.app}>
      <Map className={_.map} center={position} style={{ height: 300 }} />
      <Detail className={_.detail} />
    </div>
  }
}

export default App
