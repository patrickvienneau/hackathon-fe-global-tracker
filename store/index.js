import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket'
import compact from 'lodash/compact'
import get from 'lodash/get'
import reducers from './reducers'
import getGeocoding from '../utils/getGeocoding'
import getMany from '../utils/getMany'

const reduxWebsocketMiddleware = reduxWebsocket({
  reconnectOnClose: true,
  reconnectInterval: 100,
})

const sagaMiddleware = createSagaMiddleware()

const fetchGeocodingMiddleware = storeAPI => next => async action => {
  const websocketMessage = get(action, 'payload.message', '{}')
  const parsedWebsocketMessage = JSON.parse(websocketMessage)

  const [
    actionType,
    data,
  ] = getMany(parsedWebsocketMessage, [
    'type',
    'data',
  ])

  const geocoding = await getGeocoding({ data, actionType })

  const newAction = {
    type: actionType,
    payload: { data, geocoding },
  }

  return next(newAction)
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
store.dispatch(connect('ws://localhost:3000'))

// Connect to QA
// To acquire accessToken, call https://api.qa.veem.com/api/customers/ws/connect/info/:accountID
// const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjE1NTIxNywic3ViIjoiMTcwMTk0IiwiZXhwIjoxNjE5MjEwODcyfQ.IfBqhYWxsPDeOXM-Oz4H2UCycBd7G2zZp_OLa_em4wQ'
// store.dispatch(connect(`wss://ws.qa.veem.com/?accessToken=${accessToken}`))

// sagaMiddleware.run(rootFlows)

window.store = store

export default store
