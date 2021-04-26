import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import AppC from 'components/App/AppC'

ReactDom.render((
  <Provider store={store}>
      <AppC />
  </Provider>
), document.getElementById('Globe'))
