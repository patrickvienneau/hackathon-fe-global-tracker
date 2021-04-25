import React, { PureComponent, createRef } from 'react'
import PaymentMarker from './PaymentMarker'
import { LINE_ANIMATION_DURATION_MS_PER_100_LENGTH } from 'constants/mapConstants'

class PaymentMarkerC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      pathElLength: undefined,
      showEndPin: false,
    }

    this.line = createRef()
  }

  componentDidMount () {
    this.setState({ pathElLength: this.getLinePathLength() })
  }

  componentDidUpdate () {
    const animationDuration = this.getAnimationDuration()

    this.setState({ pathElLength: this.getLinePathLength() })

    if (animationDuration && !this.showEndPinTimeout) {
      this.showEndPinTimeout = setTimeout(() => { this.setState({ showEndPin: true }) }, animationDuration)
    }
  }

  getLinePath = () => {
    try {
      return this.line.current.getElementsByTagName('path')[0]
    } catch (e) {}
  }

  getLinePathLength = () => {
    try {
      const pathEl = this.getLinePath()
      return pathEl.getTotalLength()
    } catch (e) {
      return 0
    }
  }

  getAnimationDuration = () => {
    try {
      const pathLength = this.getLinePathLength()
      return pathLength / 100 * LINE_ANIMATION_DURATION_MS_PER_100_LENGTH
    } catch (e) {
      return 0
    }
  }

  render () {
    const { showEndPin, pathElLength } = this.state

    const animationDuration = this.getAnimationDuration()

    return (
      <PaymentMarker
        {...this.props}
        ref={this.line}
        showEndPin={showEndPin}
        pathElLength={pathElLength}
        animationDuration={animationDuration}
      />
    )
  }
}

export default PaymentMarkerC
