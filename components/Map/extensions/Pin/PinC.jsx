import React, { PureComponent } from 'react'
import Pin from './Pin'

class PinC extends PureComponent {
  render () {
    return (
      <Pin {...this.props} />
    )
  }
}

export default PinC
