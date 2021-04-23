import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket'
import compact from 'lodash/compact'
import get from 'lodash/get'
import reducers from './reducers'
import getGeocoding from '../utils/getGeocoding'

const reduxWebsocketMiddleware = reduxWebsocket({
  reconnectOnClose: true,
  reconnectInterval: 100,
})

const sagaMiddleware = createSagaMiddleware()

const fetchGeocodingMiddleware = storeAPI => next => async action => {
  const { type } = action
  if (type === 'REDUX_WEBSOCKET::MESSAGE') {
    const message = JSON.parse(get(action, 'payload.message'))
    const geocoding = await getGeocoding(message)
    storeAPI.dispatch({ type: 'geocodingLoaded', payload: geocoding })
  }

  return next(action)
}

const middlewares = compact([
  sagaMiddleware,
  reduxWebsocketMiddleware,
  fetchGeocodingMiddleware,
])

const enhancers = compact([
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
])

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers)
const store = createStore(reducers, {}, composedEnhancers)

// Connect to mock BE
// store.dispatch(connect('ws://localhost:3000'))

// Connect to QA
// To acquire accessToken, call https://api.qa.veem.com/api/customers/ws/connect/info/:accountID
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjE1NTIxNywic3ViIjoiMTcwMTk0IiwiZXhwIjoxNjE5MjA5OTgzfQ.zpOp2bycaVDucf1tNJkWksqnz8dngsVekFzo3xdoZUI'
store.dispatch(connect(`wss://ws.qa.veem.com/?accessToken=${accessToken}`))

// sagaMiddleware.run(rootFlows)

window.store = store

export default store
