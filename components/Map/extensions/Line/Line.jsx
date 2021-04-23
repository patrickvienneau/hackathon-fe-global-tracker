import './Line.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Line as RSMLine } from 'react-simple-maps'

const ANIMATION_DURATION_MS_PER_100_LENGTH = 1800

const Line = forwardRef(({
  pathElLength = 250,
  ...rest
}, ref) => (
  <g ref={ref}>
    <RSMLine
      style={{
        strokeDasharray: pathElLength,
        strokeDashoffset: pathElLength,
        animationDuration: pathElLength / 100 * ANIMATION_DURATION_MS_PER_100_LENGTH + 'ms',
      }}
      className='Line'
      {...rest}
    />
  </g>
))

Line.propTypes = {
  pathElLength: PropTypes.number,
}

export default Line
