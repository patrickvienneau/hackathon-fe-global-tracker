import './PaymentMarker.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Line from 'components/Map/extensions/Line/Line'
import PinC from 'components/Map/extensions/Pin/PinC'

const PaymentMarker = forwardRef(({
  color = '#007fe0',
  pathElLength = 250,
  animationDuration,
  showEndPin = false,
  fromCoordinates = [],
  toCoordinates = [],
}, ref) => (
  <g className='PaymentMarker'>
    <PinC
      coordinates={fromCoordinates}
      color={color}
    />

    <Line
      ref={ref}
      from={fromCoordinates}
      to={toCoordinates}
      color={color}
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
          color={color}
        />
      )
    }
  </g>
))

PaymentMarker.propTypes = {
  color: PropTypes.string,
  pathElLength: PropTypes.number,
  animationDuration: PropTypes.number,
  showEndPin: PropTypes.bool,
  fromCoordinates: PropTypes.array,
  toCoordinates: PropTypes.array,
}

export default PaymentMarker
