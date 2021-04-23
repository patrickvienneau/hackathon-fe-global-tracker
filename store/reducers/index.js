import { combineReducers } from 'redux'
import testR from './testR'
import websocketR from './websocketR'

const computedReducers = {
  testR,
  websocketR,
}

const combinedReducers = combineReducers(computedReducers)

export default combinedReducers
