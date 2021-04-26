import './AccountMarker.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import PinC from 'components/Map/extensions/Pin/PinC'

const AccountMarker = forwardRef(({
  color = '#007fe0',
  coordinates = [],
}, ref) => (
  <g className='AccountMarker'>
    <PinC
      ref={ref}
      coordinates={coordinates}
      color={color}
    />
  </g>
))

AccountMarker.propTypes = {
  color: PropTypes.string,
  coordinates: PropTypes.array,
}

export default AccountMarker
