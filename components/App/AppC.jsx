import React, { PureComponent } from 'react'
import App from './App'

class AppC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      shouldRender: false,
    }
  }

  componentDidMount () {
    this.shouldRenderTimeout = setTimeout(() => {
      this.setState({
        shouldRender: true,
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearTimeout(this.shouldRenderTimeout)
  }

  render () {
    return (
      <App
        {...this.props}
        {...this.state}
      />
    )
  }
}

export default AppC
