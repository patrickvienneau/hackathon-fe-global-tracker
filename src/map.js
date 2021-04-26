import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import MapC from 'components/Map/MapC'

ReactDom.render((
  <Provider store={store}>
      <MapC />
  </Provider>
), document.getElementById('Map'))
