import './Pin.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-simple-maps'

const Pin = ({
  radius = 3,
  ...props
}) => (
  <Marker {...props}>
    <circle className='noAnimate' r={radius} />

    <circle className='animate' r={radius} />
  </Marker>
)

Pin.propTypes = {
  radius: PropTypes.number,
}

export default Pin
