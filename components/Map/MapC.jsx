import React, { Component } from 'react'
import Map from './Map'

class MapC extends Component {
  render () {
    return (
      <Map {...this.props} />
    )
  }
}

export default MapC
