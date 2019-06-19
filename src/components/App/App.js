import React, { Component, Fragment } from 'react'
import './App.module.sass'

import Map from '../../shared/components/Map/Map'

class App extends Component {
  render () {
    const position = [52, 12]
    return <Fragment>
      <Map center={position} style={{ height: 300 }} />
    </Fragment>
  }
}

export default App
