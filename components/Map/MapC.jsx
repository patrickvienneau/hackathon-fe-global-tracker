import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from './Map'

class MapC extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      xOffset: 70,
      yOffset: 0,
    }
  }

  componentDidMount () {
    const { isGlobe } = this.props

    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)

    isGlobe && this.startRotation()
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.handleMouseDown)
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)

    this.stopRotation()
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
      xOffset: prevXOffset + (movementX / 2),
      yOffset: prevYOffset - (movementY / 2),
    }))
  }

  startRotation = () => {
    this.stopRotation()

    this.rotationInterval = setInterval(() => {
      this.setState(({ xOffset: prevXOffset }) => ({
        xOffset: prevXOffset - 0.1,
      }))
    }, 50)
  }

  stopRotation = () => {
    clearInterval(this.rotationInterval)
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
