import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket'
import compact from 'lodash/compact'
import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'
import reducers from './reducers'
import getGeocoding from 'utils/getGeocoding'
import getMany from 'utils/getMany'
import { WEBSOCKET_ACCCESS_TOKEN } from 'constants/sessionConstants'

const reduxWebsocketMiddleware = reduxWebsocket({
  reconnectOnClose: true,
  reconnectInterval: 100,
})

const sagaMiddleware = createSagaMiddleware()

const fetchGeocodingMiddleware = () => (next) => async (action) => {
  const { type } = action

  if (type !== 'REDUX_WEBSOCKET::MESSAGE') return next(action)

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
    payload: { data, geocoding, id: uniqueId() },
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
store.dispatch(connect(`wss://ws.qa.veem.com/?accessToken=${WEBSOCKET_ACCCESS_TOKEN}`))
// store.dispatch(connect('ws://localhost:3000'))

// Connect to QA
// To acquire accessToken, call https://api.qa.veem.com/api/customers/ws/connect/info/:accountID
// Store access token in constants/sessionConstants
// store.dispatch(connect(`wss://ws.qa.veem.com/?accessToken=${WEBSOCKET_ACCCESS_TOKEN}`))

// sagaMiddleware.run(rootFlows)

window.store = store

export default store
