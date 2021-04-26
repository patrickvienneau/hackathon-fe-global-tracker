import './Line.scss'
import React, { forwardRef } from 'react'
import { Line as RSMLine } from 'react-simple-maps'

const Line = forwardRef(({
  ...rest
}, ref) => (
  <g ref={ref}>
    <RSMLine
      {...rest}
      className='Line'
    />
  </g>
))

export default Line
