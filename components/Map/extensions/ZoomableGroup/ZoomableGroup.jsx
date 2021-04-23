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
