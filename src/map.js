import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import Marketing from 'components/Marketing/Marketing'

ReactDom.render((
  <Provider store={store}>
      <Marketing />
  </Provider>
), document.getElementById('Map'))
