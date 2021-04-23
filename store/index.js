import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket'
import compact from 'lodash/compact'
import reducers from './reducers'

const reduxWebsocketMiddleware = reduxWebsocket({
  reconnectOnClose: true,
  reconnectInterval: 100,
})

const sagaMiddleware = createSagaMiddleware()

const middlewares = compact([
  sagaMiddleware,
  reduxWebsocketMiddleware,
])

const enhancers = compact([
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
])

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers)
const store = createStore(reducers, {}, composedEnhancers)

store.dispatch(connect('ws://localhost:3000'))
// sagaMiddleware.run(rootFlows)

window.store = store

export default store
