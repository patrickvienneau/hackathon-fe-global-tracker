import './Pin.scss'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Marker } from 'react-simple-maps'

const Pin = ({
  radius = 3,
  coordinates = [],
  isHidden = false,
}) => (
  <Marker
    className={classNames('Marker', { hidden: isHidden })}
    coordinates={coordinates}
  >
    <circle className='noAnimate' r={radius} />

    <circle className='animate' r={radius} />
  </Marker>
)

Pin.propTypes = {
  radius: PropTypes.number,
  coordinates: PropTypes.array,
  isHidden: PropTypes.bool,
}

export default Pin
