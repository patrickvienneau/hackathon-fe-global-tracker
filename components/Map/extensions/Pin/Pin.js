import './Pin.scss'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Marker } from 'react-simple-maps'
import { PIN_ANIMATION_DURATION_MS } from 'constants/mapConstants'

const Pin = ({
  radius = 2,
  coordinates = [],
  isHidden = false,
}) => (
  <Marker
    className={classNames('Pin', { hidden: isHidden })}
    coordinates={coordinates}
  >
    <circle
      className='noAnimate'
      r={radius}
    />

    <circle
      className='animate'
      r={radius}
      style={{
        animationDuration: `${PIN_ANIMATION_DURATION_MS}ms`,
      }}
    />
  </Marker>
)

Pin.propTypes = {
  radius: PropTypes.number,
  coordinates: PropTypes.array,
  isHidden: PropTypes.bool,
}

export default Pin
