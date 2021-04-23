import React from 'react'
import PropTypes from 'prop-types'
import { ZoomableGroup as RSMZoomableGroup } from 'react-simple-maps'

const ZoomableGroup = ({
  windowHeight,
  windowWidth,
  ...props
}) => (
  <RSMZoomableGroup
    {...props}
    zoom={1}
    center={[0, 0]}
    translateExtent={[
      [0, -windowHeight],
      [windowWidth, windowHeight],
    ]}
  />
)

ZoomableGroup.propTypes = {
  windowHeight: PropTypes.number,
  windowWidth: PropTypes.number,
}

export default ZoomableGroup
