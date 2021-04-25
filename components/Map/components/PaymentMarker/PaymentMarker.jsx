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
}, ref) => (
  <g className='PaymentMarker'>
    <PinC
      coordinates={[2.3522, 48.8566]}
      color={color}
    />

    <Line
      ref={ref}
      from={[2.3522, 48.8566]}
      to={[-74.006, 40.7128]}
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
          coordinates={[-74.006, 40.7128]}
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
}

export default PaymentMarker
