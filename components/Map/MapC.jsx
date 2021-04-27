import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import converter from 'convert-string-to-number'
import Map from './Map'
import now from 'lodash/now'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import mapValues from 'lodash/mapValues'

const mapStateToProps = (state) => {
  const payments = get(state, 'paymentR', [])

  return {
    payments,
  }
}

class MapC extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      xOffset: 120,
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

    this.lastAnimationTimestamp = now()
    this.rotationAnimationFrame = requestAnimationFrame(this.rotate)
  }

  rotate = () => {
    const interval = now() - this.lastAnimationTimestamp

    if (interval > 1000 / 60) {
      this.lastAnimationTimestamp = now()

      this.setState(({ xOffset: prevXOffset }) => ({
        xOffset: prevXOffset - 0.1,
      }))
    }

    this.rotationAnimationFrame = requestAnimationFrame(this.rotate)
  }

  stopRotation = () => {
    cancelAnimationFrame(this.rotationAnimationFrame)
  }

  getGDVRatioByCountryCode = () => {
    const { payments } = this.props

    const gdvByCountryCode = reduce(payments, (acc, payment) => {
      const senderCountryCode = get(payment, 'data.payer.isoCountryCode')
      const receiverCountryCode = get(payment, 'data.payee.isoCountryCode')
      const usdAmount = get(payment, 'data.usdAmount')

      if (!acc[senderCountryCode]) acc[senderCountryCode] = 0
      if (!acc[receiverCountryCode]) acc[receiverCountryCode] = 0

      acc[senderCountryCode] = acc[senderCountryCode] + converter(usdAmount)
      acc[receiverCountryCode] = acc[receiverCountryCode] + converter(usdAmount)

      return acc
    }, {})

    const highestGDV = reduce(gdvByCountryCode, (acc, amount) => {
      if (amount > acc) acc = amount

      return acc
    }, 0)

    return mapValues(gdvByCountryCode, gdv => gdv / highestGDV)
  }

  render () {
    const { xOffset, yOffset } = this.state

    const gdvByCountryCode = this.getGDVRatioByCountryCode()

    return (
      <Map
        {...this.props}
        gdvByCountryCode={gdvByCountryCode}
        xOffset={xOffset}
        yOffset={yOffset}
      />
    )
  }
}

MapC.defaultProps = {
  isGlobe: true,
}

MapC.propTypes = {
  isGlobe: PropTypes.bool,
  payments: PropTypes.array,
}

export default connect(mapStateToProps)(MapC)
