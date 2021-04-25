import './Line.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Line as RSMLine } from 'react-simple-maps'

const Line = forwardRef(({
  color = '#F53F53',
  ...rest
}, ref) => (
  <g ref={ref}>
    <RSMLine
      {...rest}
      className='Line'
      stroke={color}
    />
  </g>
))

Line.propTypes = {
  color: PropTypes.string,
}

export default Line
