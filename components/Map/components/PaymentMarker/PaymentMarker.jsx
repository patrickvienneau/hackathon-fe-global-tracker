import './PaymentMarker.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Line from 'components/Map/extensions/Line/Line'
import PinC from 'components/Map/extensions/Pin/PinC'

const PaymentMarker = forwardRef(({
  pathElLength = 250,
  animationDuration,
  showEndPin = false,
  fromCoordinates = [],
  toCoordinates = [],
}, ref) => (
  <g className='PaymentMarker'>
    <PinC
      coordinates={fromCoordinates}
    />

    <Line
      ref={ref}
      from={fromCoordinates}
      to={toCoordinates}
      strokeWidth={1}
      strokeLinecap='round'
      style={{
        strokeDasharray: pathElLength,
        strokeDashoffset: pathElLength,
        animationDuration: `${animationDuration}ms`,
      }}
    />

    {
      showEndPin && (
        <PinC
          coordinates={toCoordinates}
        />
      )
    }
  </g>
))

PaymentMarker.propTypes = {
  pathElLength: PropTypes.number,
  animationDuration: PropTypes.number,
  showEndPin: PropTypes.bool,
  fromCoordinates: PropTypes.array,
  toCoordinates: PropTypes.array,
}

export default PaymentMarker
