import React, { PureComponent } from 'react'
import ZoomableGroup from './ZoomableGroup'

class ZoomableGroupC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      windowHeight: null,
      windowWidth: null,
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.registerWindowDimensions)

    this.registerWindowDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.registerWindowDimensions)
  }

  registerWindowDimensions = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    })
  }

  render () {
    return (
      <ZoomableGroup
        {...this.props}
        {...this.state}
      />
    )
  }
}

export default ZoomableGroupC
