import React, { PureComponent, createRef } from 'react'
import Line from './Line'

class LineC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      pathElLength: undefined,
    }

    this.path = createRef()
  }

  componentDidMount () {
    this.setState({ pathElLength: this.getLinePathLength() })
  }

  componentDidUpdate () {
    this.setState({ pathElLength: this.getLinePathLength() })
  }

  getLinePath = () => {
    try {
      return this.path.current.getElementsByTagName('path')[0]
    } catch (e) {}
  }

  getLinePathLength = () => {
    const pathEl = this.getLinePath()

    return pathEl.getTotalLength()
  }

  render () {
    const { pathElLength } = this.state

    return (
      <Line
        ref={this.path}
        pathElLength={pathElLength}
        {...this.props}
      />
    )
  }
}

export default LineC
