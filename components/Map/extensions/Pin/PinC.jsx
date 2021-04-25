import React, { PureComponent } from 'react'
import { MapContext } from 'react-simple-maps'
import PropTypes from 'prop-types'
import Pin from './Pin'

class PinC extends PureComponent {
  isHidden = () => {
    const { coordinates, path } = this.props

    const lineData = {
      type: 'LineString',
      coordinates: [coordinates, coordinates],
    }

    const isHidden = !path(lineData)

    return isHidden
  }

  render () {
    const isHidden = this.isHidden()

    return (
      <Pin
        {...this.props}
        isHidden={isHidden}
      />
    )
  }
}

PinC.propTypes = {
  coordinates: PropTypes.array,
  path: PropTypes.func,
}

const ContextualizedPin = (props) => (
  <MapContext.Consumer>
    {({ path }) => (
      <PinC
        {...props}
        path={path}
      />
    )}
  </MapContext.Consumer>
)

export default ContextualizedPin
