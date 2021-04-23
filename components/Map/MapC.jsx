import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map'

class MapC extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      xOffset: 0,
      yOffset: 0,
    }
  }

  componentDidMount () {
    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.handleMouseDown)
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseDown = () => {
    this.setState({
      mouseDown: true,
    })
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false,
    })
  }

  handleMouseMove = (e) => {
    const { isGlobe } = this.props
    const { mouseDown } = this.state
    const { movementX, movementY } = e

    const shouldCaptureMouseMove = isGlobe && mouseDown
    shouldCaptureMouseMove && this.setState(({ xOffset: prevXOffset, yOffset: prevYOffset }) => ({
      xOffset: prevXOffset + movementX,
      yOffset: prevYOffset - movementY,
    }))
  }

  render () {
    const { xOffset, yOffset } = this.state

    return (
      <Map
        {...this.props}
        xOffset={xOffset}
        yOffset={yOffset}
      />
    )
  }
}

MapC.propTypes = {
  isGlobe: PropTypes.bool,
}

export default MapC
