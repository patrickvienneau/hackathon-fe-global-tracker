import './AccountMarker.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import PinC from 'components/Map/extensions/Pin/PinC'

const AccountMarker = forwardRef(({
  color = '#007fe0',
}, ref) => (
  <g className='AccountMarker'>
    <PinC
      ref={ref}
      coordinates={[2.3522, 48.8566]}
      color={color}
    />
  </g>
))

AccountMarker.propTypes = {
  color: PropTypes.string,
}

export default AccountMarker
