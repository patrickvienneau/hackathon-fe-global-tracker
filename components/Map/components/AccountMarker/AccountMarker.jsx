import './AccountMarker.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import PinC from 'components/Map/extensions/Pin/PinC'

const AccountMarker = forwardRef(({
  coordinates = [],
}, ref) => (
  <g className='AccountMarker'>
    <PinC
      ref={ref}
      coordinates={coordinates}
    />
  </g>
))

AccountMarker.propTypes = {
  coordinates: PropTypes.array,
}

export default AccountMarker
